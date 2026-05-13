# 第 15 章：客户端表面、后台守护进程生命周期与远程控制

第 14 章把 app-server 描述为围绕共享线程所有权的契约。本章沿着这份契约看它如何被使用：SDK 隐藏协议细节，后台守护进程管理本地服务生命周期，传输层保持消息语义，远程控制流把同一套运行时模型带出本地进程边界。关键区别在于协议和其上的开发者体验。协议 schema 说明有哪些消息。SDK 说明调用方如何启动会话、路由响应、消费 turn 事件、响应服务端请求，而不必成为协议工程师。后台守护进程说明本地 app-server 进程如何被发现、启动、探测、重启和更新。远程控制说明后端中介的客户端如何像另一个连接一样工作，同时不假装网络是可靠的。

## Client Taxonomy

系统中有多种客户端形态，而且它们刻意不同。

| 客户端形态 | Primary boundary | 优化目标 |
| --- | --- | --- |
| Rust app-server client | App-server protocol | 内部调用者需要 typed facade，同时保持 protocol semantics。 |
| Python SDK | App-server v2 over standard I/O | 用 generated model types 和 stream routing 做 programmatic thread/turn control。 |
| TypeScript SDK | `codex exec` JSON event stream | 面向简单的进程驱动执行，而不是完整 app-server protocol control。 |
| Daemon-managed client | Local app-server process | 稳定的 local lifecycle、probing、pid files、locks、restart 和 update behavior。 |
| Remote-control client | Backend-mediated stream | 通过 reconnect、cursor 和 replay 支持远程 app-server 会话。 |

这张 taxonomy 避免一句误导性的“SDK 调 app-server”。有些 SDK 是这样，有些刻意包的是另一条 command surface。有些客户端在进程内运行，有些通过 daemon-managed socket 连接，有些穿过 backend。架构仍然一致，是因为每个客户端都尊重清晰的边界。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-15-01-zh.svg" alt="客户端接入面并不等价：schema 驱动的 SDK、命令接入面、daemon 与远程控制桥，沿着不同的信任和传输路径收束到 app-server 运行时。" loading="lazy" />
  <figcaption>客户端接入面并不等价：schema 驱动的 SDK、命令接入面、daemon 与远程控制桥，沿着不同的信任和传输路径收束到 app-server 运行时。</figcaption>
</figure>

这张图故意是不对称的。Python SDK 和 Rust facade 是 protocol 客户端。TypeScript SDK 是进程/事件流客户端。Daemon 不是面向用户语言的 SDK，而是生命周期管理器。Remote control 是带有 protocol 后果的传输桥。

## Schema 是契约来源

App-server protocol types 会生成 schema 产物，让客户端可以在不手写复制 definitions 的情况下同意消息形状。契约演进时这点最重要。Notification 增加一个 field、新增一种服务端请求变体，或开放一个 experimental method，都应该反映在生成契约和兼容性过滤器中，而不是让客户端在 runtime 才撞上。

Schema 不能消除判断。Server 仍然要决定哪些 features 稳定，哪些 experimental，哪些按 connection gate，哪些旧客户端需要特殊处理。但生成契约会减少 drift 藏身的空间。它把问题变得具体：客户端过旧，还是 server 发出了 declared contract 之外的 shape？

## Rust Facade

Rust app-server client 最贴近 protocol。它的职责不是在 threads 和 turns 上发明一套新抽象，而是让 Rust code 可靠使用 protocol：发送 requests，等待 responses，消费 notifications，并保留 服务端请求 的语义。这种克制很重要。内部客户端很容易因为在同一个 repository，甚至同一个 process 中，就想绕过 protocol。Facade 保持边界诚实。如果 Rust 调用方要 observe thread、start turn 或 answer approval，它应该通过外部客户端也依赖的同一套概念契约完成。

## Python SDK

Python SDK 是更完整的 app-server client。它通过 standard I/O 启动或连接 app-server process，使用 generated model types，并向开发者暴露 session control 方法。它内部最重要的问题是 stream routing。

Standard I/O 给 SDK 一条输入流。请求响应、活动 turn 通知和服务端请求都从这条流进来。如果 SDK 的两个部分直接读取同一条流，就会互相抢消息。因此 SDK 使用一个 reader，再把消息路由给等待请求的队列、turn 流，或服务端请求处理器。

```text
// 伪代码 - 说明性模式。
为进程输出流启动一个 reader

对每条传入协议消息:
    如果它完成某个请求 ID:
        交给该 ID 的等待方
    否则如果它是 turn 通知:
        追加到活动线程或 turn 的流
    否则如果它请求客户端做决定:
        交给服务端请求处理器
    否则:
        报告未知或不受支持的消息
```

这不是 Python 细节，而是 app-server 契约在 client 侧的镜像。Server 承诺 typed messages；SDK 必须保留它们的 ordering 和 destination，不能让并发 user code 从同一条 stream 偷读。一个 compatibility caveat 需要明确说出：默认 server-request handling 对 automation 很方便，但 approvals 是带 policy 的事件。严肃客户端应该为 command approval、file-change approval、dynamic tool calls 和 elicitation 选择显式 handlers，而不是意外接受本应属于 application 的行为。

## TypeScript SDK

TypeScript SDK 处在另一个架构角色。它包装 execution command，并消费 experimental JSON event stream。这让它适合 scriptable execution flows，但它不是完整 app-server protocol 客户端。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-15-concept-1-zh.svg" alt="TypeScript SDK 是同一个 app-server 契约上的可达性层：生成类型、daemon 连接管理、传输适配和远程桥都必须保持协议语义。" loading="lazy" />
  <figcaption>TypeScript SDK 是同一个 app-server 契约上的可达性层：生成类型、daemon 连接管理、传输适配和远程桥都必须保持协议语义。</figcaption>
</figure>

这不是缺陷，而是产品选择。进程取向 SDK 可能更容易安装，更适合短生命周期任务，也不太耦合 app-server lifecycle。代价是它不暴露第 14 章描述的完整 thread-sharing、server-request、replay 和 daemon-managed contract。需要这些语义的代码应该使用 protocol 客户端；只需要“运行这个任务并读取结构化 events”的代码，命令包装器可能更合适。

## Daemon Lifecycle

Daemon 把 app-server startup 变成操作系统层面的关注点。它管理 pid files、operation locks、probing、bootstrap、restart、remote-control enrollment 和 update loops。这些词看起来普通，直到某个 client 在 server starting、restarting、stale，或已被另一个 process 拥有时尝试连接。

Daemon 的职责是让本地服务可发现且稳定，同时不允许两个守护进程操作破坏同一份状态。操作锁防止生命周期动作重叠。探测区分“服务健康”和“pid 文件存在”。重启行为给客户端走出过期状态的路径。更新行为让产品升级服务，而不要求每个 SDK 都发明自己的进程管理器。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-15-02-zh.svg" alt="守护进程生命周期不只是启动：陈旧服务与更新需求会进入重启、失败和带锁重试路径。" loading="lazy" />
  <figcaption>守护进程生命周期不只是启动：陈旧服务与更新需求会进入重启、失败和带锁重试路径。</figcaption>
</figure>

Daemon 不只是 convenience wrapper。它让 long-lived local contract 对 short-lived tools 和 SDK processes 变得实际可用。

## Transport Choices

存在多种 transports，是因为不同客户端需要不同 process 和 deployment shape。

| Transport | 何时有用 | 架构关注点 |
| --- | --- | --- |
| Standard I/O | Client 把 server 作为 child process 启动。 | 一个 reader 必须路由所有 inbound messages。 |
| Local socket with WebSocket-style framing | Daemon 或 local client 连接已有 server。 | Framing 与 disconnect behavior 必须符合 protocol 预期。 |
| Local WebSocket | Browser-like 或 network-capable local 客户端需要 framed messages。 | Origin、lifecycle 和 backpressure 变得可见。 |
| In-process transport | Tests 或 internal callers 需要同一契约但不想跨 process。 | 不能绕过 protocol semantics。 |
| Remote-control stream | Backend 把 remote client 连接到 local app-server。 | Reconnect、cursor ack、buffering 和 identity 都是正确性的一部分。 |

传输层的目标，是让这些选项在边界之上尽量无聊。一个 request 不应该因为来自 socket 而不是 standard I/O，就获得不同语义。可以不同的是 latency、lifecycle、authentication、framing 和 failure behavior。

## Remote Control

Remote control 通过 backend-mediated stream 延伸 app-server contract。本地侧用 backend identity 和 installation metadata enrollment。Remote streams 被映射到 app-server 连接 ID。Messages 会 chunk，cursors 会 ack，outbound messages 在合适时被 buffer，reconnect 可以 replay remote client 尚未 ack 的数据。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-15-03-zh.svg" alt="Remote control 把后端流转成可恢复的本地连接：cursor ack 与 buffered replay 让 app-server 契约在重连后仍保持一致。" loading="lazy" />
  <figcaption>Remote control 把后端流转成可恢复的本地连接：cursor ack 与 buffered replay 让 app-server 契约在重连后仍保持一致。</figcaption>
</figure>

网络会让隐藏假设暴露出来。本地 socket 常常可以说“断了就断了”；remote control 不行。它需要显式 cursor 和 replay behavior，因为 remote client 可能在本地 runtime 持续产生 notifications 的同时经历网络失败。

## Compatibility Costs

App-server protocol 有版本化概念，但演进仍然有成本。有些 v2 behavior 仍锚定在 v1 initialization ideas 上。有些 experimental support 在 runtime 检查，并在生成契约中过滤。有些旧客户端需要 response 或 notification workarounds。有些 threads 会被 capability levels 不同的 connections 共享。这些成本对活协议来说很正常。教训不是“避免兼容性”，而是“把兼容性放在边界”。Request processor 中的 client-version workaround 比散落到 core runtime state 的 workaround 更容易删除。Connection 上的 feature gate 比 SDK method 中的 silent failure 更容易推理。Schema drift check 也比 remote client 收到 未知服务端请求 后的 bug report 更便宜。

## Failure Modes

SDKs 和 daemons 会带来自己的失败面。

| Failure | Typical symptom | Boundary response |
| --- | --- | --- |
| Process launch failure | SDK 无法启动 server。 | 在任何 request 被假定 accepted 前报告 startup failure。 |
| Multiple stdout readers | Responses 消失或到达错误的等待方。 | 使用单 reader，再内部路由。 |
| Stale pid file | Client 以为 server 存在但无法连接。 | Probe health，而不是信任 pid state。 |
| Experimental mismatch | Client 调用自己不支持的 method。 | 按 capability gate，并返回 protocol error。 |
| Remote reconnect gap | 网络丢失后 client 漏掉 notifications。 | 使用 cursor ack 并 replay buffered outbound messages。 |

目标不是隐藏所有失败，而是让失败落在正确边界，使 caller 能决定 retry、restart、询问用户或 abort。

## 追踪台账

| 问题 | 第 15 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 它可能在 SDK call、daemon-managed server connection、execution wrapper 或 remote-control stream 中。 |
| 什么数据结构携带它？ | 生成 schema model、SDK 队列、进程流、daemon 探测、socket frames、远程分片、cursors 和 app-server 连接 ID。 |
| 谁拥有下一步决策？ | SDK router、daemon 生命周期管理器、transport adapter、远程桥，或 app-server connection gate。 |
| 这里可能怎么失败？ | 启动失败、过期 daemon 状态、流路由竞争、不受支持的客户端能力、传输背压、远程 cursor 丢失，或 replay 不匹配。 |

## 应用到实践

1. **区分 protocol 与 ergonomics。** 让 schema 定义契约，让 SDKs 定义安全好用的使用方式。
2. **每条 stream 只设一个 reader。** 内部路由 messages，不要让并发代码竞争 protocol bytes。
3. **显式监督 lifecycle。** 把 pid files、probes、locks、restarts 和 updates 视为 client reliability 的一部分。
4. **跨 transport 保持语义。** Transport 可以机制不同，但 protocol message 的含义不能不同。
5. **把兼容性放在边界。** 在 connection 和 SDK boundary 管理 experimental 与 version-sensitive behavior。

## 收束

SDKs、daemons 和 remote control 让 app-server 契约进入真实程序。它们也说明：有了 message types，并不代表 protocol 已经可用。只有 lifecycle、routing、transport 和 compatibility 被像 runtime 一样认真工程化，protocol 才真正可用。第 16 章转向这份契约最可见的 client：terminal UI。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| 后台守护进程生命周期 | [`codex-rs/app-server-daemon/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/lib.rs#L34) |
| Remote control mode | [`codex-rs/app-server-daemon/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/lib.rs#L92) |
| Transport modes | [`codex-rs/app-server-transport/src/transport/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/mod.rs#L57) |
| stdio transport | [`codex-rs/app-server-transport/src/transport/stdio.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/stdio.rs#L24) |
| WebSocket transport | [`codex-rs/app-server-transport/src/transport/websocket.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/websocket.rs#L82) |
| Python public API | [`sdk/python/src/codex_app_server/api.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/python/src/codex_app_server/api.py#L72) |
| TypeScript public API | [`sdk/typescript/src/codex.ts`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/typescript/src/codex.ts#L11) |

</div>
