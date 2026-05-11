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

## Turn State Machine

为了免读源码也理解 `run_turn`，可以把它看成状态机：

| 状态 | 进入条件 | 退出条件 |
| --- | --- | --- |
| Empty-input guard | 没有用户输入，也没有 pending continuation | 不制造假 turn，直接返回 |
| Pre-sampling compaction | sampling 前上下文已经有 token 压力 | compact、reset baseline，或显式失败 |
| Context baseline update | 新 user/context items 进入 turn | history 和 rollout 记录变化 |
| Extension preparation | apps、plugins、MCP tools 或 skills 被 mention/配置 | 本 turn 注入 tools/instructions |
| Dependency prompts | skill 或 extension 需要不可用能力 | prompt、install、skip，或降级继续 |
| User-prompt hooks | policy 要在 sampling 前检查输入 | continue、block 或报告 hook failure |
| Sampling | history 和 active context 变成模型请求 | stream events、tool calls、errors 或 final text |
| Tool follow-up | 模型发出 tool calls 或 dynamic requests | 分发工具、收集 observations，决定是否再次 sampling |
| Pending input drain | active turn 中途到达新输入 | requeue、attach 或 block，不能丢输入 |
| Mid-turn compaction | 需要 follow-up，但上下文放不下 | compact 后用 reset model client 继续 |
| Stop hooks | 模型看起来完成 | allow completion、request continuation 或报告 hook failure |
| After-agent hooks | turn 即将落定 | 完成前运行 cleanup 或 policy reactions |

## Streaming 改变产品形状

流式输出不只是 UI 优化。它改变了 runtime contract。模型输出逐步到达时，Codex 可以显示进度、识别结构化 items、累积工具参数，并把工具调用作为 runtime 事件处理，而不是把完整回复当作一段纯文本。

对初学者来说：非流式调用像收到一封写完的信；流式调用像看着信被一段段写出来，而且每段可能有结构。Codex 需要后一种形状，因为工具、进度、取消和 UI 更新都是产品的一部分。

底层 streaming 还有自己的 pipeline：

| 部件 | 角色 |
| --- | --- |
| model client session | 规范化与所选 provider 的通信 |
| transport choice | 可偏好 WebSocket，也可 fallback 到 HTTPS-style streaming |
| retry/recovery | 认证、断连、overload 和 retryable stream errors 不是同一种失败 |
| response-event mapping | provider events 变成 runtime items、message deltas、reasoning deltas、tool calls 和 stream errors |
| dropped consumer handling | receiver 消失时必须取消 stream/tool work，不能泄漏 task |

## Compaction 是 runtime 决策

Agent 对话会超过上下文限制。Codex 在 sampling 后检查 token usage，如果模型还需要 follow-up work，就可能运行 auto-compaction。这说明 turn loop 不是简单函数；它必须决定继续、压缩后重试、处理 pending input，还是停止。

Compaction 有多种形状：

| 形状 | 含义 |
| --- | --- |
| manual compaction | 用户或 client 显式要求压缩 thread history |
| pre-turn compaction | sampling 开始前上下文已经过大 |
| mid-turn compaction | 模型还要 follow-up，但当前上下文放不下 |
| model-downshift compaction | runtime 因 compaction constraints 改变 model/session behavior |
| remote compaction | 配置允许时把 compaction 委托给 remote service path |
| baseline reset | compacted history 替换旧上下文，并要求重新计算 reinjection |

## Stop Hooks 与 After-Agent Hooks

停止也不是简单 return。一次 turn 看起来完成后，Codex 还会运行 stop hooks 和 after-agent hooks。Hook 可以要求继续、阻塞、失败，或者产生需要报告的结果。因此 hooks 属于 turn protocol 的一部分，而不是 UI 结束后才附加的回调。

## 取消与错误出口

取消也有多层：模型流可以断开，tool future 可以被 abort，exec session 可以 timeout，dynamic tool 可能由客户端取消，Guardian review 可能超时，pending input 可能被 drain 或 requeue。Turn loop 只有在这些路径都被妥善收束后，才能给出最终 outcome。

| 出口 | 如何理解 |
| --- | --- |
| model stream error | 可能 retry、refresh auth，或发结构化 stream error |
| tool cancellation | 模型可用时应返回 aborted tool result |
| hook failure | 根据 hook 类型 block、continue 或要求另一次模型步骤 |
| fatal runtime error | 继续会破坏状态或误导客户端，因此结束 task |
| user interrupt | 中止当前工作，但不一定销毁后台 terminal processes |

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 6 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 在运行中的 turn state machine 中。 |
| 什么数据结构携带它？ | recorded history、turn context、model client session、response items、tool futures 和 pending-input queues。 |
| 谁拥有下一步决策？ | `run_turn` 决定 sampling、工具分发、compaction、hooks、继续、中止或完成。 |
| 这里可能怎么失败？ | stream transport、认证、token budget、hook 行为、工具 future、pending input、compaction 和 cancellation cleanup。 |

</div>

<div class="apply-this">

## 应用到实践

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

## 自检题

不打开源码回答：为什么一次 turn 可能需要多次采样模型？列出至少四种让 turn 继续、停止、压缩或中止的原因。

</div>

<div class="exercise-box">

## 可选源码实验

打开 `run_turn`，写下所有会 stop、continue 或 return `None` 的地方。给每个分支标注原因：user input、hooks、token budget、model output 还是 failure。

</div>

<div class="next-step">

## 下一章

Turn loop 可以请求工具，但工具执行有自己的契约。下一章研究工具如何注册、路由、并行或串行运行，并转换成模型可见输出。

</div>
