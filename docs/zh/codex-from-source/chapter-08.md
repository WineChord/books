# 第 8 章：补丁与 Turn Diff

<div class="chapter-lede">
  <p><strong>你在这里：</strong>Codex 已经能路由工具调用，现在研究编辑路径。</p>
  <p><strong>问题：</strong>让模型直接写任意文件，会很难审查、审批和解释。</p>
  <p><strong>心智模型：</strong>patch 是文件变化的收据：结构化、可检查，并绑定到某次 turn。</p>
</div>

Patch path 是 Codex 设计品味最清晰的例子之一。它把 patch grammar 和 agent-facing runtime behavior 分开，并跟踪 committed deltas，让用户接入面不用重读整个 workspace 也能展示变化。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Patch tool spec | [`create_apply_patch_freeform_tool`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L293) | 把 patch 能力作为 freeform tool 暴露。 |
| Patch handler | [`ApplyPatchHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286) | 连接 patch input、permissions、events 和 orchestration。 |
| Verified parsing | [`maybe_parse_apply_patch_verified`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L368) | 在计算变化和审批前重新解析并验证。 |
| Turn diff tracker | [`TurnDiffTracker`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16) | 从 committed patch deltas 维护内存 diff。 |

</div>

## 为什么用 Patch，而不是直接写文件？

直接写 API 对模型简单，但对用户不好。它只说“把这个文件替换成那段内容”，系统事后还要重建发生了什么。Patch 会说清楚操作类型：add、delete、update、move、带上下文的 hunks。这个结构支持审批、展示、部分失败处理和 review。

| 直接写文件 | 结构化 patch |
| --- | --- |
| 容易调用 | 生成稍难 |
| 执行前难审查 | 天然是 diff |
| 难绑定审批范围 | 文件路径和操作显式 |
| 容易隐藏大范围替换 | 上下文和 hunks 暴露意图 |
| 需要事后比较 | 编辑本身就是比较 |

## Handler 的责任

`ApplyPatchHandler` 不只是 adapter。它声明工具名、标记 mutating、发出 hook payload、消费 streamed argument diffs、提取文件路径、计算 effective permissions、启动 UI events，并委托 `ToolOrchestrator` 执行。

<div class="flow">
  <div><strong>Grammar</strong>patch crate 理解 patch 语法。</div>
  <div><strong>Handler</strong>core tool handler 理解 sessions 和 turns。</div>
  <div><strong>Policy</strong>permission 和 sandbox policy 决定是否可执行。</div>
  <div><strong>Runtime</strong>orchestrator 执行或拒绝 patch。</div>
  <div><strong>Diff</strong>turn tracker 记录 committed delta。</div>
</div>

## Turn Diff Tracking

`TurnDiffTracker` 从 committed patch mutations 跟踪当前 turn 的 net text diff。它记录 baseline content、current content、rename origins 和 invalidation state。能证明 delta 精确时，它渲染 unified diff；不能证明时，它 invalidates，而不是展示自信但误导的 diff。

这是重要安全习惯：runtime 不能产生准确证据时，应该通过状态诚实表达，而不是伪装确定。

<div class="apply-this">

## Apply This

- 用结构化 edit operation，而不是 opaque file write。
- 把 grammar parsing 与 agent runtime behavior 分开。
- 跟踪 exact delta，无法保证精确时要 invalidate。
- 让编辑证据同时对模型和用户接入面可见。

</div>

## 接下来读源码

- [`ApplyPatchHandler::handle`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L337)：跟踪 patch 从 payload 到 runtime invocation。
- [`effective_patch_permissions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L252)：看路径和权限如何派生。
- [`TurnDiffTracker::track_delta`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L49)：查看 exact-delta tracking。

<div class="exercise-box">

## 阅读练习

阅读 `ApplyPatchHandler::handle`，画出从 raw patch text 到 committed delta 的五步路径，并标出 parsing、permission calculation、approval、execution 和 diff tracking 分别发生在哪里。

</div>

<div class="next-step">

## 下一章

Patch execution 会引入风险。下一章研究审批控制面：工具何时可运行、何时必须询问、何时必须停止。

</div>
