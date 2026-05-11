# 第 6 章：Turn 循环与流式输出

<div class="chapter-lede">
  <p><strong>你在这里：</strong>session 已经接收用户工作，现在必须推进它。</p>
  <p><strong>问题：</strong>Agent 工作是迭代的：模型输出、工具、观察结果、pending user input、hooks 和 compaction 都会影响下一步。</p>
  <p><strong>心智模型：</strong>turn 是控制循环，不是一次 API call。</p>
</div>

Turn loop 是 Codex 的心跳。它准备模型请求，流式接收模型输出，分发工具，记录新观察，处理 pending input，运行 hooks，检查 token budget，必要时压缩上下文，并在 runtime 有明确理由时停止。

<TurnLoopStepper />

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Turn entry | [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | 一次用户工作单元的主循环。 |
| Skill collection | [`collect_explicit_skill_mentions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L222) | 展示输入如何激活 skill instructions。 |
| Plugin/app inventory | [`list_all_tools`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L184) | 把 app/plugin mentions 连接到 MCP tool inventory。 |
| Sampling request | [`run_sampling_request`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L453) | recorded history 变成 model interaction 的位置。 |

</div>

## `run_turn` 的阅读路径

`run_turn` 开头会拒绝空输入，除非已经有 pending input。然后它准备 `ModelClientSession`，检查 pre-sampling compaction，记录 context updates，加载 plugin capability summaries，在 apps 或 plugin mentions 需要时列出 MCP tools，收集显式 skill mentions，并解析 skill dependencies。

这些都属于准备阶段。模型调用前，Codex 会决定本次 turn 合法拥有哪些上下文和能力。

| 阶段 | 源码行为 | 设计理由 |
| --- | --- | --- |
| Pre-compact | 需要时在 sampling 前压缩上下文 | 避免 turn 一开始就超过预算 |
| Context recording | 把 turn context 和 user prompt 写入 history | 让模型请求可从 recorded items 复现 |
| Skills/plugins | 把显式 mentions 变成 injected context | 让扩展能力 turn-scoped 且可见 |
| Hooks | 允许配置的 pre-submit/session-start 行为 | 让策略和扩展点在采样前生效 |
| Sampling | 从 history 构建 `ResponseItem` input | 让模型输入来自同一个 history 模型 |
| Follow-up | 工具、pending input、compaction 需要时继续 | 让行动和观察成为迭代 |

## Streaming 改变产品形状

流式输出不只是 UI 优化。它改变了 runtime contract。模型输出逐步到达时，Codex 可以显示进度、识别结构化 items、累积工具参数，并把工具调用作为 runtime 事件处理，而不是把完整回复当作一段纯文本。

对初学者来说：非流式调用像收到一封写完的信；流式调用像看着信被一段段写出来，而且每段可能有结构。Codex 需要后一种形状，因为工具、进度、取消和 UI 更新都是产品的一部分。

## Compaction 是 runtime 决策

Agent 对话会超过上下文限制。Codex 在 sampling 后检查 token usage，如果模型还需要 follow-up work，就可能运行 auto-compaction。这说明 turn loop 不是简单函数；它必须决定继续、压缩后重试、处理 pending input，还是停止。

<div class="apply-this">

## Apply This

- 把 turn 当作拥有上下文、工具、hooks 和 token budget 的单位。
- 让模型输入来自 recorded history，而不是临时字符串拼接。
- 让 extension injection 显式且 turn-scoped。
- 用清晰原因驱动 continuation：tool follow-up、pending input、compaction 或 hooks。

</div>

## 接下来读源码

- [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)：标出 preparation、sampling 和 follow-up。
- [`run_auto_compact`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L494)：查看 mid-turn context-limit 分支。
- [`ModelClientSession`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305)：查看模型通信如何被 runtime 规范化。

<div class="exercise-box">

## 阅读练习

打开 `run_turn`，写下所有会 stop、continue 或 return `None` 的地方。给每个分支标注原因：user input、hooks、token budget、model output 还是 failure。

</div>

<div class="next-step">

## 下一章

Turn loop 可以请求工具，但工具执行有自己的契约。下一章研究工具如何注册、路由、并行或串行运行，并转换成模型可见输出。

</div>
