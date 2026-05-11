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

## 协议是兼容性边界

协议是兼容性最敏感的位置。内部 helper 改了，但 `Op` 和 event 行为保持一致，客户端通常还能继续工作。协议 variant 含义变化时，影响范围就大得多。

这也是 app-server protocol 里生成 schema 很重要的原因。它把 Rust 类型定义转成客户端可见契约。Web client、editor integration 或测试客户端不应该为了知道 `turn/start` 接收什么而 import 私有 Rust 模块。

<div class="apply-this">

## Apply This

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

## 阅读练习

选择一个动作，例如中断 turn 或批准命令。找到它的 core `Op` variant，再找到最接近的 app-server request 或 server request。写下哪个层更靠近 Agent，哪个层更靠近外部客户端。

</div>

<div class="next-step">

## 下一章

消息清楚之后，下一章进入 core session facade：它接收 submissions 并发出 events。

</div>
