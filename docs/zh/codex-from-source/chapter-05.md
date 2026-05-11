# 第 5 章：Session Facade

<div class="chapter-lede">
  <p><strong>你在这里：</strong>协议消息已经存在，现在需要一个活的 runtime。</p>
  <p><strong>问题：</strong>客户端需要小接口，但 runtime 需要配置、历史、模型、工具、skills、plugins、MCP 和 telemetry。</p>
  <p><strong>心智模型：</strong>`Codex` 是前台；`Session` 是前台后面整栋楼。</p>
</div>

Session facade 是 Codex 从“命令解析”变成“Agent runtime”的地方。客户端不应该知道模型如何选择、skills 如何加载、MCP manager 如何接线、conversation history 如何存储。客户端只需要提交工作并接收事件。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| `Codex` facade | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | 展示 submission sender、event receiver、status 和 session。 |
| Spawn arguments | [`CodexSpawnArgs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L386) | 暴露 runtime 启动前必须知道什么。 |
| Bootstrap body | [`spawn_internal`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449) | 串起 config、skills、plugins、MCP、model、history 和 services。 |
| Submit API | [`submit_with_trace`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L693) | 把 operation 变成带 id 的 queued submission。 |

</div>

## Facade 形状

`Codex` 很小，但字段就是架构摘要：

| 字段含义 | 作用 |
| --- | --- |
| submission sender | 客户端把 `Submission` 推进 runtime |
| event receiver | 客户端从 runtime 拉取 `Event` |
| status receiver | 观察高层 agent 状态 |
| session reference | 内部 services 和 state 在 facade 后面 |
| termination future | 调用者可以等待后台 loop 结束 |

这说明 Codex 是 queue-pair runtime：一边提交 operation，另一边观察 event。

## Bootstrap 是架构证据

`CodexSpawnArgs` 很长，因为 runtime 真实存在：auth manager、model manager、environment manager、skills manager、plugins manager、MCP manager、extension registry、thread store、conversation history、dynamic tools、telemetry 都要进入系统。长不一定坏，它说明 facade 包住了一个大的 composition root。

| Bootstrap 步骤 | 为什么重要 |
| --- | --- |
| 加载 plugins 和 skills | 决定 turn-visible guidance 和 extension capability。 |
| 解析 `AGENTS.md` instructions | 在 turn 运行前注入仓库或用户指令。 |
| 加载 exec policy | 提前建立命令审批和策略行为。 |
| 选择 model 和 base instructions | 明确 session 的模型契约。 |
| 构造 `SessionConfiguration` | 把很多输入收拢成 runtime 配置对象。 |
| 启动 submission loop | 启动消费 operation 的后台任务。 |

初学者常跳过 bootstrap，因为它看起来像“管线”。在 Agent 系统里，管线就是架构。

## Session、Thread、Turn

- **Session** 是正在运行的 runtime instance，包含 services、configuration、queues 和 status。
- **Thread** 是 conversation/workspace continuity，可以创建、恢复、fork、列出或 rollback。
- **Turn** 是 thread 内的一次用户工作单元。

不要把三者混成一个概念。Session 服务 thread；thread 包含 turns；turn 里可能发生多轮 model/tool 循环。

## Submission Loop 与 Task Queue

Facade 的 queue-pair 形状会在 submission loop 中具体化。Client 提交一个 `Op`；后台循环决定它是启动新 task、steer active task、abort 当前工作、把输入排队到下一次 turn，还是更新持久 thread state。

| 运行时单元 | 表示什么 | 为什么重要 |
| --- | --- | --- |
| `Submission` | 带 id 和 trace context 的 queued protocol input | 每个外部可见动作都通过可关联 envelope 进入 |
| regular task | 普通用户 turn work | 拥有常见 model/tool loop |
| compact task | 上下文压缩工作 | 可以替换 history，而不是用户 prompt |
| review task | review-mode 工作 | 用同一套 session machinery 支撑不同产品模式 |
| user shell command task | 显式用户 shell action | 区分用户发起 shell 和模型发起 tool call |
| active turn | in-flight work 的 mutable state | 让 interrupt、auxiliary input 和 tool result 找到正在运行的 turn |
| queued next-turn items | 中途到达、不能丢失的后续工作 | 防止新输入 racing 或覆盖 active task |

这是一条关键源码读者知识：Codex 不是 CLI 调模型然后等待的同步调用，而是有明确 task replacement、abort、completion 和 queued follow-up behavior 的后台任务系统。

## History、Rollout 与 Resume

History 不只是“聊天文本”。Codex 会保留模型可见 items、raw/replayable rollout records 和 turn context baselines。记录 conversation item 可能同时意味着：加入 model history、写入足以 later reconstruct thread 的 rollout data，并 echo raw events 给客户端 replay。

| 持久化概念 | 保护什么 |
| --- | --- |
| context manager history | 模型看到 normalized prior items，而不是 UI 字符串 |
| rollout reconstruction | resume 和 fork 可以从 durable records 重建 thread |
| turn context baseline | compaction/reinjection 知道哪些上下文已经存在 |
| thread metadata | name、archive state、goals、memory mode 和 remote/control state 跨 session 保留 |

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 5 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 已跨过协议边界，位于 session submission loop 中。 |
| 什么数据结构携带它？ | `Submission`、`Op`、active task state、recorded history 和 rollout items。 |
| 谁拥有下一步决策？ | session loop 决定 start、steer、abort、compact、review 或 queue follow-up work。 |
| 这里可能怎么失败？ | bootstrap dependency loading、config/auth state、history persistence、task replacement 和 structured event delivery。 |

</div>

## 失败也是 runtime 的一部分

Facade 让失败变成可编程事件。Submissions 有 ids。Events 可以描述 errors、warnings、approvals、token usage、MCP startup、model reroute 和 turn completion。客户端因此可以渲染错误、显示审批、重试、停止 turn 或保存 transcript。

<div class="apply-this">

## 应用到实践

- 即使 runtime 很大，也给客户端一个小 facade。
- 把 bootstrap code 当作架构证据。
- 严格区分 session、thread 和 turn。
- 用结构化 events 表达失败，不要只打印文本。

</div>

## 接下来读源码

- [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)：把字段当作架构摘要。
- [`spawn_internal`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449)：跟踪 session 创建前加载了哪些依赖。
- [`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506)：看 live thread 行为如何位于 session 之上。
- [`submission_loop`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/handlers.rs#L711)：追踪 queued operations 如何变成 tasks 或 control actions。
- [`record_conversation_items`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L2418)：查看 history、rollout 和 event echo 如何绑在一起。

<div class="exercise-box">

## 自检题

不打开源码回答：Codex 为什么同时需要 session 和 thread？再解释一个 queued submission 为什么可能 start task、steer task、abort task，或成为下一个 turn 的 queued input。

</div>

<div class="exercise-box">

## 可选源码实验

阅读 `CodexSpawnArgs`，把字段分成五类：configuration、identity/auth、external capability、storage/history、runtime services。再和本章 bootstrap 表比较。

</div>

<div class="next-step">

## 下一章

Facade 接受工作，但 Agent 行为发生在 turn 里。下一章跟随 `run_turn`，阅读它如何准备上下文、采样模型、处理工具并决定是否继续。

</div>
