# 第 11 章：把 Patch 作为一等编辑协议

第 10 章说明了 shell execution 如何成为受监督的进程。本章把一条常见编辑路径从 shell 中拆出来：patch application。Codex 把 `apply_patch` 当作 mutation protocol，而不是传给命令的一段文本。这个差别是架构性的。协议可以被解析、验证、评估、审批，通过正确的文件系统应用，并在模型看到最终结果前记录为 turn diff。直接写文件很诱人，因为简单。但它作为证据很差。直接写只表达“让这个文件变成这些内容”。Patch 表达的是“在这些路径上执行添加、删除、更新、移动和这些 hunk”。这个结构让 runtime 在副作用发生前有东西可检查。

## Patch 生命周期

Patch 执行的生命周期比表面看起来更长。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-11-01-zh.svg" alt="Patch 应用被当作证据链，而不是文本替换：每个被接受的 hunk 都要经过语法、路径、权限、文件系统与 diff 记录关卡，模型才会看到结果。" loading="lazy" />
  <figcaption>Patch 应用被当作证据链，而不是文本替换：每个被接受的 hunk 都要经过语法、路径、权限、文件系统与 diff 记录关卡，模型才会看到结果。</figcaption>
</figure>

解析步骤理解 patch 语法。校验步骤访问工作区文件系统，计算实际会发生的变更。评估步骤判断 patch 可自动批准、需要审批，还是需要额外权限。应用步骤通过选中的执行器文件系统写入，而不是假设本地路径就是目标。

## Grammar 只是第一道门

Patch 语法描述的是一门很小的编辑语言：开始 patch，声明一个或多个 file hunk，添加、删除、更新或移动内容，最后结束 patch。Codex 的解析器可以比用户文档中的形式更宽容，因为模型输出不总是完美包裹。宽容不等于应用模糊编辑；它只表示运行时尝试恢复出意图协议，然后再用文件系统验证。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-11-concept-1-zh.svg" alt="Patch 语法只负责恢复意图，真正的边界是校验：路径、旧内容、权限、执行器所有权和 diff 证据都成立后，变更才会被接受。" loading="lazy" />
  <figcaption>Patch 语法只负责恢复意图，真正的边界是校验：路径、旧内容、权限、执行器所有权和 diff 证据都成立后，变更才会被接受。</figcaption>
</figure>

真正的边界是校验。更新需要知道 hunk 期望替换的旧内容。删除需要读出即将删除的文件。移动需要同时考虑来源路径和目标路径。如果这些检查失败，结果应是模型可见的校验失败，而不是尽力写入。

## 拦截 Shell 形式的 Patch

模型经常学会用 shell heredoc 表达 patch。Codex 可以识别某些顶层形式，例如“运行 patch 工具并传入这段 patch 内容”，或“先切到某个相对工作目录，再运行 patch 工具”。当模式被识别出来时，runtime 会拦截它，并把它路由到 patch 协议。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-11-concept-2-zh.svg" alt="Shell 形式的 patch 文本只是兼容桥：一旦被识别，它就进入和 patch 工具相同的解析、校验、审批、应用与 diff 记录路径。" loading="lazy" />
  <figcaption>Shell 形式的 patch 文本只是兼容桥：一旦被识别，它就进入和 patch 工具相同的解析、校验、审批、应用与 diff 记录路径。</figcaption>
</figure>

这是兼容桥，不是鼓励通过 shell 文本编辑。运行时可以提醒模型直接使用 patch 工具，但仍会按 patch 协议治理这次修改：解析、校验、计算路径、执行审批、通过执行器文件系统应用、发出事件，并更新 turn diff。

```text
// 伪代码 - 为清晰起见简化。
  if tool_call is the patch tool:
      patch_body = tool_call.freeform_input
  else if command_invocation is a recognized patch heredoc:
      patch_body, effective_cwd = extract_patch_body(command_invocation)
  else:
      继续 with ordinary shell execution

  action = parse_and_verify_patch(patch_body, effective_cwd, executor_filesystem)
  permissions = compute_required_file_permissions(action.paths)
  decision = assess_patch_safety(action, permissions)

  if decision requires approval:
      approval = request_patch_approval(action.summary)
      stop_unless_approved(approval)

  delta = apply_patch_to_executor_filesystem(action, permissions)
  record_patch_events(action, delta)
  update_turn_diff_tracker(delta)
  return patch_result_for_model(delta)
```

这段伪代码不对应具体源码，但保留了关键区别：被识别出的 shell 语法会先转成 patch 动作，然后才发生变更。

## 通过文件系统抽象应用

Patch 应用使用执行器文件系统。这个细节能避免一类隐蔽错误。在本地 turn 中，执行器文件系统可能就是本地 workspace；在远程 turn 中，它可能是远端环境的 filesystem。两种情况下，patch code 都接收同类文件系统对象和可选沙箱上下文。编辑会落到拥有当前 turn 的 workspace。应用层还会跟踪实际已提交 delta。成功的 add、delete、update 或 move 会变成结构化 delta。如果某次写入在部分修改后失败，runtime 会保留已经确定 committed 的前缀，并相应标记 exactness。这样比假装操作完全成功或完全没发生更诚实。

## Diff Tracking 是证据，不是装饰

Turn diff 跟踪器为 committed patch mutations 维护净文本 diff。它记录 baseline、current content、rename origins 和 invalidation state。当 tracker 能证明 delta 时，它可以不重新读取 workspace 就渲染 unified diff。当 exactness 丢失时，它会让 diff 失效，而不是显示一个误导性的自信 diff。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-11-concept-3-zh.svg" alt="Diff tracking 是证据管理：只有基线内容、已提交 delta、重命名来源和失效状态仍然一致时，运行时才展示精确 diff。" loading="lazy" />
  <figcaption>Diff tracking 是证据管理：只有基线内容、已提交 delta、重命名来源和失效状态仍然一致时，运行时才展示精确 diff。</figcaption>
</figure>

这种行为值得复用。一个系统如果不能证明自己的证据，就应该显式降级，而不是因为 UI 需要 diff 形状就硬展示。

## Git Patch 是另一条路径

Codex 也有辅助逻辑，用 Git 应用普通 unified diff。这条路径会写临时 patch，可以用 dry run 做 preflight，调用 Git，并把输出解析成 applied、skipped 或 conflicted paths。它和一等 `apply_patch` protocol 相关，但不是同一条路径。两者共享的重要思想是 preflight：在 mutation 变成 durable 之前，先知道它会改什么。

## 应用到实践

1. **优先使用结构化编辑。** 在 mutation 前暴露 paths、operations 和 context。
2. **用文件系统验证。** Parse success 不够，还要确认预期旧状态存在。
3. **把兼容形式转回协议。** Shell 文本如果明确表示 patch，就按 patch 治理。
4. **诚实跟踪已提交 delta。** 保留 exact evidence，无法证明时就 invalidate。
5. **通过拥有者文件系统应用。** 本地与远程 workspace 应共享同一套 mutation semantics。第 12 章会解释围绕这些 mutation 的人类和自动化关卡：hooks、approval requests、Guardian review，以及等待决策时可能打断执行的客户端表面。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| Patch tool handler | [`codex-rs/core/src/tools/handlers/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L55) |
| Patch runtime | [`codex-rs/core/src/tools/runtimes/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/runtimes/apply_patch.rs#L50) |
| Patch grammar parser | [`codex-rs/apply-patch/src/parser.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/parser.rs#L126) |
| Patch safety assessment | [`codex-rs/core/src/safety.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/safety.rs#L33) |
| Turn diff 跟踪器 | [`codex-rs/core/src/turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L18) |

</div>
