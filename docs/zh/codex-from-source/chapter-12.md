# 第 12 章：TUI 与 app-server

<div class="chapter-lede">
  <p><strong>你在这里：</strong>runtime 已能产生 events，用户需要看到或消费它们。</p>
  <p><strong>问题：</strong>现代 Codex clients 需要丰富终端体验，也需要 JSON-RPC app-server 边界，但不能复制 agent runtime。</p>
  <p><strong>心智模型：</strong>app-server 适配 core session events；TUI 是 app-server-shaped protocol 的重要客户端。</p>
</div>

旧心智模型会说“TUI 和 app-server 是 core event stream 的两个平行消费者”。源码里的更准确模型是：app-server 是类型化客户端边界，负责适配 core session operations 和 events；TUI 在现代路径中大量使用 app-server session 形状。TUI 仍然有终端呈现状态，但它与外部客户端共享协议化 runtime boundary。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| TUI chat surface | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | 模块注释总结 event consumption、active cells、overlays、bottom-pane state。 |
| TUI app-server session | [`app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L1) | 展示 TUI 使用 app-server protocol machinery。 |
| App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | 把 JSON-RPC requests 路由到 thread、turn、catalog、plugin、app、MCP、sandbox、account processors。 |
| Turn processor | [`turn_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/turn_processor.rs#L315) | 把 app-server turn request 翻译成 core session operation。 |
| Server requests | [`ServerRequest`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1277) | 定义发给客户端的 approval、user input、MCP elicitation、permission、dynamic tool requests。 |
| Notifications | [`ServerNotification`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | 定义客户端可观察更新流。 |

</div>

## TUI：从 Event Stream 到屏幕

`ChatWidget` 的模块注释非常值得读。它解释 committed transcript cells、in-flight active cell、transcript overlay、bottom-pane task-running indicator、preamble handling、slash command staging 和 MCP startup state。

关键思想是：TUI 不拥有 Agent loop。它消费 events 并维护 presentation state。它决定如何渲染 streaming output、approvals、diffs、status、overlays 和 input，但 turn progress 的事实来源仍是 session runtime。

现代 TUI flow 更接近：

<div class="flow">
  <div><strong>ChatWidget/AppCommand</strong>用户输入或 UI command。</div>
  <div><strong>AppServerSession</strong>TUI 侧 client boundary。</div>
  <div><strong>ClientRequest</strong>`turn/start` 或相关 JSON-RPC method。</div>
  <div><strong>Turn processor</strong>把 request 转成 core operation。</div>
  <div><strong>Core session</strong>运行 turn 并发出 `EventMsg`。</div>
  <div><strong>Event adapter</strong>映射成 server notifications 或 requests。</div>
  <div><strong>TUI rendering</strong>更新终端 presentation state。</div>
</div>

## App-server：从 Event Stream 到 JSON-RPC

App-server 接收 JSON-RPC requests 并路由到 processors。`message_processor.rs` 里很长的 match 并不华丽，但它是外部产品接入面的地图：threads、turns、skills、hooks、marketplace、plugins、apps、models、experimental features、MCP、Windows sandbox setup、account state、remote control 等。

| Request family | 暴露什么 |
| --- | --- |
| thread and turn | create、read、steer、interrupt、compact、rollback、shell command、review |
| catalog | skills、hooks、models、collaboration modes、experimental features |
| plugin and marketplace | install、remove、list、read、share、skill read |
| apps and MCP | app lists、MCP status、resource reads、OAuth、server tool calls |
| approval and dynamic tools | 要求客户端做决定或执行的 server requests |

这种形状允许非终端客户端构建自己的 UI，而不复制 core runtime。

## App-Server Protocol Details

App-server protocol 有三个方向：

| 方向 | 例子 | 含义 |
| --- | --- | --- |
| `ClientRequest` | thread start/resume/fork、turn start/interrupt、config writes、account queries、MCP/app/plugin calls | client 请求 server 做事或报告状态 |
| `ServerRequest` | command approval、patch approval、permission request、user input request、MCP elicitation、auth refresh、dynamic tool execution | server 需要 client 或用户做决定/提供输入 |
| `ServerNotification` | thread status、turn started/completed、item updates、command output、turn diff、token usage、compaction | server 广播可观察状态 |

Requests 还有 serialization scope：有些全局，有些绑定 thread，有些可由 thread 或 path 决定。Experimental capability gates、initialization state、notification settings、auth、origin checks 和 backpressure errors 都属于边界合同。

## Presentation State 仍然很重要

强 core protocol 不会消除呈现复杂度。TUI 有 terminal dimensions、frame rendering、key events、overlays 和 live streaming cells。App-server 有 request ids、serialization scope、schema generation、client-specific responses 和 notifications。共享 runtime 的价值，是防止这些复杂度泄漏回 agent loop。

## 端到端路径

<div class="flow">
  <div><strong>Core event</strong>Session 产生 progress、output、approval、diff 或 completion。</div>
  <div><strong>App-server adapter</strong>把 core event 映射成 notification 或 bidirectional server request。</div>
  <div><strong>User decision</strong>用户 approve、deny、interrupt、steer 或 inspect evidence。</div>
  <div><strong>Protocol response</strong>决策作为类型化输入流回 runtime。</div>
  <div><strong>Turn continues</strong>Runtime 带着新 observation 或 decision 继续。</div>
</div>

这才是完整循环：不是 model-only，也不是 UI-only，而是用户、runtime、tools 和 surfaces 之间的类型化对话。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 12 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 已跨过 client surface，通常经过 app-server protocol，并作为 notifications 或 server requests 返回。 |
| 什么数据结构携带它？ | `ClientRequest`、request processors、core `Op`/`EventMsg`、bespoke event mapping、`ServerRequest` 和 `ServerNotification`。 |
| 谁拥有下一步决策？ | app-server processors、core session、client/TUI state 或响应 server request 的用户。 |
| 这里可能怎么失败？ | initialization gate、auth/origin check、experimental capability gate、backpressure、invalid scope、dropped client、UI replay mismatch 或 unresolved bidirectional request。 |

</div>

<div class="apply-this">

## 应用到实践

- 让 Agent loop 独立于 terminal rendering。
- 让外部客户端消费结构化 notifications，而不是终端文本。
- 尽量把 UI state 视为 protocol events 的派生状态。
- 把 approval 和 dynamic tool requests 设计成双向协议流。

</div>

## 接下来读源码

- [`ChatWidget` module docs](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1)：先读注释，再读方法。
- [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000)：按 JSON-RPC request family 分组。
- [`ServerNotification`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440)：查看外部客户端能观察什么。

<div class="exercise-box">

## 自检题

不打开源码回答：为什么 app-server 不只是薄 adapter？解释 TUI command 如何到达 `turn/start`，以及 core `EventMsg` 如何回到 TUI 可见更新。

</div>

<div class="exercise-box">

## 可选源码实验

选择一个 runtime event，例如 command output、file-change approval、MCP status 或 turn completion。追踪 TUI 可能如何渲染它，以及 app-server 可能如何通知外部客户端。哪些信息必须保持结构化，两个接入面才能都工作？

</div>

<div class="next-step">

## 收束

你已经走完主路径：entry、protocol、session、turn、tools、patches、approvals、sandboxes、extensions 和 user surfaces。想复用设计经验，请看 [模式索引](patterns)；想最快回到源码，请看 [源码索引](source-atlas)。

</div>
