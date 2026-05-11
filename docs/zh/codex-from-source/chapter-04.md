# 第 4 章：协议层

<div class="chapter-lede">
  <p><strong>你在这里：</strong>用户意图到达边界，必须变成结构化数据。</p>
  <p><strong>问题：</strong>多个客户端都要驱动 Codex，但不能依赖 runtime 私有实现。</p>
  <p><strong>心智模型：</strong>协议是产品语法；runtime 只是这个语法的一个说话者。</p>
</div>

Codex 不只有一个协议接入面。Core protocol 用 submissions 和 events 连接客户端与 agent session。App-server protocol 暴露 JSON-RPC service，包含 client requests、server requests、responses 和 notifications。它们目的有重叠，但服务不同读者。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Submission queue entry | [`Submission`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123) | 用 id 和 trace context 包装 operation。 |
| Core operations | [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | 定义 session 可以接收什么。 |
| app-server requests | [`client_request_definitions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L637) | 定义暴露给 app clients 的 JSON-RPC methods。 |
| app-server notifications | [`server_notification_definitions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | 定义 app clients 能异步观察什么。 |

</div>

## Core Protocol 与 App-Server Protocol

| 层 | 主要读者 | 形状 | 例子 |
| --- | --- | --- | --- |
| Core protocol | Rust 系统内的 runtime clients | `Submission { id, op, trace }` 和 `Event` | `Op::UserInputWithTurnContext`, `Op::ExecApproval`, `EventMsg::TurnComplete` |
| App-server protocol | 使用 JSON-RPC 的外部客户端 | method names, params, responses, notifications | `turn/start`, `item/commandExecution/requestApproval`, `turn/completed` |

Core protocol 更靠近 Agent。它谈 user input、interruptions、approvals、dynamic tool responses、MCP refresh、review requests、compaction、rollback 和 user shell commands。App-server protocol 更靠近客户端，必须描述 request serialization、method names、response payloads、notifications 和 experimental gates。

## 事件模型分类

源码读者不会把 `EventMsg` 当作巨大 enum 背诵，而会按 runtime 意义分组：

| 事件家族 | 例子 | 教什么 |
| --- | --- | --- |
| lifecycle | turn started/completed/aborted、shutdown complete | 工作有明确开始和结束。 |
| text/reasoning | agent message、content deltas、reasoning summaries、raw reasoning | 流式输出在成为 UI 文本前已经是类型化数据。 |
| item lifecycle | item started/completed、raw response item | 新 item 事件和旧 event 名称并存，以保持兼容。 |
| tools | exec begin/output/end、MCP begin/end、web/image begin/end、patch begin/update/end | 副作用在最终答案前也可被观察。 |
| approvals | exec approval、patch approval、permission request、user input request、Guardian assessment | 决策点是协议事件。 |
| context/history | context compacted、thread rolled back、token count、goal update | 状态变化对客户端可见。 |
| errors/warnings | error、warning、stream error、deprecation notice | 失败是类型化的，不只是打印文本。 |
| realtime/collab | realtime events、collab agent spawn/wait/close/resume | 同一协议家族覆盖高级工作流。 |

## App-Server Protocol Families

App-server 层有三个方向：

| 类型 | 方向 | 例子 |
| --- | --- | --- |
| `ClientRequest` | client 到 server | thread start/resume/fork、turn start、config/account/model requests、MCP/app/plugin/skill/catalog calls |
| `ServerRequest` | server 请求 client/user | command approval、patch approval、user input、permission request、MCP elicitation、auth refresh、dynamic tool execution |
| `ServerNotification` | server 广播状态 | thread status、turn started/completed、item updates、token usage、command output、turn diff、compaction |

Requests 还有 serialization scopes：有些全局，有些绑定 thread，有些取决于 thread 或 path。Experimental methods 必须被 gate；initialization、notification opt-out、auth 和 backpressure 也属于协议合同。

## Queue Pair 模式

Core 层使用 submission queue 和 event queue。这不是偶然实现细节，而是一种产品形状：客户端提交工作，并独立监听进度。

<div class="flow">
  <div><strong>Client</strong>构造 `Op`。</div>
  <div><strong>Submission</strong>加上 id 和 trace context。</div>
  <div><strong>Session</strong>消费 queued work。</div>
  <div><strong>Event</strong>发出类型化进度和结果。</div>
  <div><strong>Surface</strong>渲染或转发 event。</div>
</div>

Agent 工作不是瞬时的。一次 turn 可能流式输出 token、请求审批、运行子进程、发出局部 diff、调用 MCP tool，并且可以被中断。简单 request/response 函数会隐藏太多生命周期。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 4 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 已变成类型化协议消息。 |
| 什么数据结构携带它？ | core `Submission`/`Op`、app-server `ClientRequest`，以及 emitted `Event`/`EventMsg` 或 notifications。 |
| 谁拥有下一步决策？ | session 消费 core operations；app-server processors 路由外部 requests；clients 回答 server requests。 |
| 这里可能怎么失败？ | unsupported operation、invalid request params、experimental gate、server request 没有回应，或 event compatibility mismatch。 |

</div>

## 协议是兼容性边界

协议是兼容性最敏感的位置。内部 helper 改了，但 `Op` 和 event 行为保持一致，客户端通常还能继续工作。协议 variant 含义变化时，影响范围就大得多。

这也是 app-server protocol 里生成 schema 很重要的原因。它把 Rust 类型定义转成客户端可见契约。Web client、editor integration 或测试客户端不应该为了知道 `turn/start` 接收什么而 import 私有 Rust 模块。

<div class="apply-this">

## 应用到实践

- 用协议类型保护客户端，避免它们依赖私有 runtime 细节。
- 当工作有进度、审批或取消时，优先使用异步 event stream。
- 区分 core runtime 词汇和外部 JSON-RPC 词汇。
- 把生成 schema 当成产品接入面，而不是开发便利。

</div>

## 接下来读源码

- [`Submission`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123)：查看最小 queued unit。
- [`Op::UserInputWithTurnContext`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L445)：看 user turn 如何携带 settings。
- [`McpServerToolCall`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L843)：比较 app-server method 命名与 core operation。

<div class="exercise-box">

## 自检题

不打开源码回答：各举一个 `ClientRequest`、`ServerRequest` 和 `ServerNotification`，并解释为什么三个方向都需要。再把五个 runtime events 放进本章事件分类。

</div>

<div class="exercise-box">

## 可选源码实验

选择一个动作，例如中断 turn 或批准命令。找到它的 core `Op` variant，再找到最接近的 app-server request 或 server request。写下哪个层更靠近 Agent，哪个层更靠近外部客户端。

</div>

<div class="next-step">

## 下一章

消息清楚之后，下一章进入 core session facade：它接收 submissions 并发出 events。

</div>
