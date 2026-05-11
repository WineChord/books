# 第四章：协议层

大型 agent 应用需要共享词汇表。没有它，每一层都会传松散字符串和 JSON blob。
Codex 为核心循环定义了类型化消息，也为 app-server 客户端定义了类型化 JSON-RPC
消息。

## 内部操作和事件

核心协议位于
[`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)。
关键类型是：

- `Op`：提交给 session 的操作。
- `Submission`：带元数据的提交。
- `Event`：运行时发出的事件。
- `EventMsg`：实际事件负载。

这让 Codex 形成一种节奏：客户端提交操作，session 发出事件。

<div class="flow">
  <div><strong>提交</strong><code>Op::UserInput</code> 等操作进入。</div>
  <div><strong>运行</strong>session 推进 turn 或 task。</div>
  <div><strong>发事件</strong><code>EventMsg</code> 汇报进度或请求动作。</div>
  <div><strong>响应</strong>客户端渲染、审批、中断或 steer。</div>
</div>

对初学者来说，重点是：协议让异步系统变得可理解。UI 不需要知道模型 client 的所有
内部字段，只要知道自己可能收到哪些事件、能发送哪些操作。

## App-server 协议

Codex 还在
[`app-server-protocol/src/protocol/common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L178)
定义 app-server 协议。两个核心概念是 `ClientRequest` 和 `ServerNotification`。

这个协议比核心协议更宽，因为它是外部 API 面。它要描述 thread 创建、turn 启动、
thread 读取、模型列表、MCP resource、插件安装、权限请求等客户端可见流程。

Thread 和 turn 的请求形状在 v2 模块里，比如
[`thread.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/thread.rs#L95)
和
[`turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/turn.rs#L49)。
这层分离很重要：app 客户端看到稳定的请求和通知类型，core 则保留自己的运行时词汇。

## 为什么有两套协议

app-server 消息和 core session 消息看起来有点重复，但它们面对的读者不同。

app-server 协议是产品边界，面向客户端，必须稳定、可序列化、版本化。core 协议是
运行时边界，面向应用内部，更关注 session 实际会处理哪些操作。

可以把它想成餐厅：菜单是 app-server 协议，公开、面向顾客、相对稳定；厨房单据是
core 协议，给真正做菜的人看，精确描述接下来要做什么。

## 协议本身就是文档

协议文件是源码树里最好的文档之一。它告诉你系统认为“可能发生什么”。在 Codex 中，
事件类型暴露出系统预期会处理模型流、工具调用、审批、错误、thread 状态变化、turn
生命周期和持久化历史。

读一个新功能时，可以先问：哪个协议类型变了？如果没有边界类型变化，它可能是内部
功能。如果请求或事件变了，它就影响客户端。

