# 第 12 章：Hooks 与人工审批

第 11 章展示了文件系统变更如何在应用前被解析和验证。本章研究运行时已经理解某个动作之后，仍然可以阻止、修正或解释它的关卡：Hook、审批策略、Guardian 审查和用户审批。它们彼此相关，但不是同一层。

Hook 是配置好的程序，用来观察或影响运行时事件。审批是允许或拒绝副作用的控制面决策。Guardian 是可以回答部分审批请求的自动审查者。用户界面则是人工决策表面。Codex 把这些层分开，因此每一层失败时都能给出精确语义。

## 关卡栈

<p class="sketch-intro">这张关卡栈要从上往下读：每一层都回答谁能补充上下文、谁能停止工作，以及谁能把意图变成动作。</p>
<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-12-01-zh.svg" alt="审批栈是有序的：每个参与方都能在危险动作真实发生前补充上下文、阻断、修正或授权。" loading="lazy" />
  <figcaption>审批栈是有序的：每个参与方都能在危险动作真实发生前补充上下文、阻断、修正或授权。</figcaption>
</figure>

这个关卡栈是有顺序的，不是装饰。Hook 可以添加上下文或阻断特定事件。权限请求 Hook 可以在常规审查路径前回答审批。自动守护方或用户可以决定剩余未解决的审批。只有这些关卡产出允许决策后，工具尝试才会发生。

## 一条命令如何穿过关卡

理解这些层分离的最简单方式，是跟随一条 shell 命令。模型请求一个命令。Codex 先运行匹配的工具前 Hook；这些 Hook 可以在策略评估副作用前添加上下文、给出警告，或直接阻断。如果 Hook 没有阻断，审批策略会根据当前权限配置判断这个命令是否可以运行。如果需要决策，权限请求 Hook 可以自动回答；如果没有回答，自动守护方或面向用户的客户端会收到请求。只有允许决策到达后，shell 处理器才会进入沙箱选择和进程执行。结果返回后，工具后 Hook 可以观察输出，并把结构化反馈喂回 turn。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-12-02-zh.svg" alt="一条 shell 命令只有在 Hook 补充或阻断上下文、策略评估有效权限、审查路径返回决策后，才会变成可执行动作。" loading="lazy" />
  <figcaption>一条 shell 命令只有在 Hook 补充或阻断上下文、策略评估有效权限、审查路径返回决策后，才会变成可执行动作。</figcaption>
</figure>

重点不是命令本身，而是每一道关卡回答的问题不同：自动化观察什么，策略允许什么，审查方授权什么，沙箱包含什么，以及什么结果进入持久状态。

## Hook 发现与信任

Codex 可以从多种来源加载 Hook：系统或托管配置、用户配置、项目配置、会话标志、插件、云端要求，以及旧式托管文件。每个 Hook 都有事件身份、匹配状态、命令文本、超时、来源元数据、展示顺序和信任状态。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-12-concept-1-zh.svg" alt="Hook 发现受信任状态治理：运行时先区分可信、已修改、已禁用和正在执行的 Hook，再接受结构化结果。" loading="lazy" />
  <figcaption>Hook 发现受信任状态治理：运行时先区分可信、已修改、已禁用和正在执行的 Hook，再接受结构化结果。</figcaption>
</figure>

信任不由“文件存在”推导。托管 Hook 按策略可信。用户或项目 Hook 只有在规范化身份哈希与已保存的可信哈希匹配时才可信。如果 Hook 内容变了，它会进入已修改状态，而不是继续静默运行。被禁用的 Hook 仍能在列表中可见，但不会参与运行时。这个设计保护两类工作流：运营方可以集中管理用户不需要逐个批准的 Hook；用户也能添加自己的 Hook，但改变后的 Hook 必须重新获得信任，才能进入运行时。

## Hook 事件与结果

Hook 事件词汇不只覆盖命令执行。它包括会话启动、用户提示提交、工具前使用、权限请求、工具后使用、压缩前后和停止。这些都是架构检查点：工具变更前、工具报告输出后、上下文压缩前、turn 可能停止时，以及提示进入运行时时。

Hook 处理器通过 stdin 接收 JSON，通过 stdout 返回结构化 JSON，并在部分失败模式下通过 stderr 给模型反馈。结果不只是成功或失败。Hook 可以提供额外模型上下文、警告、阻断、停止和反馈，也可以失败但允许操作继续，具体取决于事件契约。

```text
// 伪代码 - 为清晰起见简化。
  handlers = discover_hooks(config_layers, plugins, managed_sources)
  trusted_handlers = filter_enabled_and_trusted(handlers)

  preview = build_hook_run_summaries(trusted_handlers, event)
  emit_hook_started(preview)

  results = run_matching_hooks_with_json_io(trusted_handlers, event)
  emit_hook_completed(results)

  if any result blocks or stops:
      return rejected_or_stopped_result(results.feedback)

  add_context_for_model(results.context)
  继续_to_policy_or_tool_execution()
```

预览/运行分离让客户端能在 Hook 真正完成前展示待处理工作。这对终端 UI、app-server 和无头上下文都重要，因为 hook 可能很慢，也可能阻断动作。

## 审批是另一道门

当策略认为某个工具需要人工或自动决策，或者沙箱尝试失败并允许非沙箱重试时，就会进入审批流程。不同工具携带不同审批载荷：shell 审批说明命令和当前目录，patch 审批说明文件变更，MCP 审批说明服务端和工具元数据，权限请求说明额外文件系统或网络访问。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-12-concept-2-zh.svg" alt="审批被刻意拆在 Hook 之外：策略先产生决策载荷，审查方再回答，只有部分回答会改变后续策略。" loading="lazy" />
  <figcaption>审批被刻意拆在 Hook 之外：策略先产生决策载荷，审查方再回答，只有部分回答会改变后续策略。</figcaption>
</figure>

运行时可以按审批键缓存会话审批。Shell 形式命令通常只有一个审批键。Patch 可能按每个受影响路径建立审批键，所以一次多文件 patch 如果被批准为会话范围，之后触碰其中子集的请求也可以安全跳过提示。审批决策比“是/否”更丰富：可以只批准一次、批准本会话、拒绝、中止、超时，或批准执行策略、网络策略的修正。差异很重要，因为策略修正会改变未来策略；一次性审批只授权当前动作。

## Guardian、无头模式与 UI 中断

Guardian 是审批类请求的自动审查路径。当审批路由选择自动审查时，运行时会创建一个和工具调用 ID 分开的审查 ID，并等待决策。拒绝、超时和中止是不同结果，这样用户可见消息才能说明发生了什么，而不是统一成“失败”。无头执行不能依赖交互式弹窗。如果某个请求需要人工审批，但当前没有人工审批通道，安全行为是拒绝，而不是永远等待。TUI 则可以通过弹窗决策界面打断普通流程，并在决策到达后继续 turn。

MCP 和动态工具还增加了一层审批维度。它们的工具元数据可能来自托管服务、连接器或客户端提供的来源。审批表面必须展示与信任相关的来源和参数，但不能把原始内部名称当作用户可见的信任边界。

## 应用到实践

1. **区分 Hook 和审批。** Hook 观察或影响事件；审批授权副作用。
2. **显式信任配置代码。** 对用户/项目 Hook 做哈希，并把已修改的 Hook 当作未信任。
3. **预览长耗时关卡。** 在客户端看起来卡住前，发出待处理 Hook 或审批状态。
4. **精确建模审批结果。** 区分拒绝、中止、超时、单次审批、会话审批和策略修正。
5. **没有审批通道时失败即关闭。** 无头执行应拒绝无法展示的交互式审批。第 13 章会跟随一个已批准动作进入隔离层：权限配置如何变成文件系统/网络策略，再下降成平台沙箱、托管网络和执行元数据。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| Hook event vocabulary | [`codex-rs/hooks/src/types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/types.rs#L92) |
| Hook registry | [`codex-rs/hooks/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/registry.rs#L47) |
| Prompt hook runtime | [`codex-rs/core/src/hook_runtime.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/hook_runtime.rs#L321) |
| Guardian review path | [`codex-rs/core/src/guardian/review.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/guardian/review.rs#L103) |
| Tool orchestrator gates | [`codex-rs/core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50) |

</div>
