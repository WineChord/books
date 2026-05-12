# 第 17 章：MCP：没有运行时耦合的外部工具

第 16 章把终端 UI 看成共享 runtime contract 上的 inline client，说明客户端可以观察和驱动线程，却不拥有 runtime。本章继续向外走一步：如果客户端可以不接管 runtime 就参与工作，外部工具也必须能进入一次 turn，而不是变成 runtime 的一部分。

<div class="chapter-lede">
  <p><strong>你在这里：</strong>clients 已经能通过类型化 events 观察和操控 threads。</p>
  <p><strong>问题：</strong>外部工具需要暴露给模型，但 transport、authentication、命名和失败语义不能泄漏进核心 turn loop。</p>
  <p><strong>心智模型：</strong>MCP 是 runtime tool protocol：Codex 通过 clients 发现工具，把安全整理后的 tool shape 暴露给模型，再用 provenance 把调用路由回去。</p>
</div>

把 MCP 说成“更多工具”很容易误导。内置 shell tool 的 handler 在 runtime 内部，系统知道它怎么执行。MCP tool 则来自一个 server；这个 server 可能通过 stdio、HTTP、executor-backed process 或 in-process adapter 运行。模型不该关心这些差异，runtime 也不能把外部 server 当成可信内部代码。

因此 MCP 边界被分成多层。低层 MCP client 负责 transports 和 OAuth。面向 Codex 的 MCP 层把 configured servers 和 built-ins 变成 effective server definitions，管理启动、缓存 listing、整理名称，并记录 provenance。Core session 只消费 model-visible tool specs；当模型真的调用工具时，runtime 再根据 provenance 路由到正确 server。

## MCP 创造的边界

MCP 有三种身份，不能混为一谈。

| 身份 | 谁使用 | 为什么存在 |
| --- | --- | --- |
| Raw server identity | MCP client 和 connection manager | 让真实 server、transport 和 tool namespace 可寻址。 |
| Model-visible name | 模型 prompt 和 tool schema | 给模型一个安全、规范化的标识符。 |
| Provenance record | Runtime router 和审计路径 | 把模型可见调用映射回所属 server 与 raw tool。 |

这个拆分不是样式问题。外部 server 可以选择会冲突的名字，也可能使用不适合模型 tool calling 的字符；它暴露的工具来源还会影响审批、沙箱和用户解释。Codex 因而把命名视为适配步骤，而不是直接复制 server 字符串。

```mermaid
flowchart LR
    Config["MCP config and built-ins"]
    Effective["Effective server definitions"]
    Client["Managed MCP clients"]
    Listing["Tool listings"]
    Sanitize["Sanitized model names"]
    Model["Model tool call"]
    Route["Route by provenance"]
    Server["Owning MCP server"]
    Observe["Tool observation"]

    Config --> Effective
    Effective --> Client
    Client --> Listing
    Listing --> Sanitize
    Sanitize --> Model
    Model --> Route
    Route --> Server
    Server --> Observe
```

这张图说明 MCP 为什么是协议边界，而不是直接的 function registry。Discovery、naming 和 routing 是三个不同动作。

## Inbound MCP Stack

Inbound MCP 指 Codex 消费 MCP servers 提供的工具。低层 client 负责 transport：启动本地 stdio process、通过 HTTP 通信、适配 executor-backed process、使用 in-process server，以及处理 OAuth-aware HTTP flow。对 runtime 的其他部分来说，这一层应该足够无聊：它提供 client behavior，但不决定哪些工具进入模型请求。

Codex MCP orchestration 层在它上面。它规范化 configured servers 与 built-ins，异步启动 clients，记录 startup status，列出 tools 和 resources，路由 tool calls，并处理 elicitation。Elicitation 是 MCP server 在操作过程中请求更多用户或客户端输入。架构上它是 bidirectional runtime request，不是隐藏的 prompt injection。

启动过程有意偏向 cache-oriented。Tool listing 可能昂贵，也可能临时不可用；客户端界面应该能展示进度，同时普通工作继续进行。可选 server 启动失败不应让整个 runtime 崩掉，而应表现为 status、warnings 或缺失工具。

## Tool Discovery 与 Routing

Discovery 产出 model-facing tool specs，但 execution 使用 provenance。可以用这个心智模型理解：

```text
// Pseudocode - illustrative pattern.
for each effective_server:
    client = start_or_reuse_client(effective_server)
    listing = client.list_tools_from_cache_or_server()

    for each raw_tool in listing:
        public_name = sanitize(raw_tool.name, effective_server.identity)
        provenance = remember(effective_server.identity, raw_tool.name)
        expose_tool(public_name, raw_tool.schema, provenance)

when model_calls(public_name, arguments):
    provenance = lookup(public_name)
    client = client_for(provenance.server_identity)
    result = client.call_tool(provenance.raw_tool_name, arguments)
    return shape_observation(result)
```

这段是泛化 pseudocode，刻意不复刻源码。真正的不变量是：模型永远不是“哪个 server 接收调用”的权威；runtime 根据 discovery 时创建的 provenance table 解析路由。

## Hosted App Tools

Hosted app tools 在暴露给模型之后看起来类似 MCP tools，但它们的事实来源不同。它们依赖 hosted metadata、connector names、app IDs、accessible tool information 和 account authentication。因此它们需要独立的 trust 与 cache path。一个工具可以“出现在目录里”，但当前 account 没有权限；它也可能需要 auth refresh 或 elicitation 后才能调用。

从书中的架构层面看，关键是让“MCP tool”和“hosted app tool”只在 model-facing tool boundary 汇合。证明 origin 与 access 的 metadata 仍留在边界后方，不被抹平。

## Resources 与 Templates

MCP servers 不只暴露 tools，还可以暴露 resources 和 resource templates。Codex 把它们视为有独立 routing 的 read/list operations，而不是默认变成 model-visible functions。这个区别很重要：resource 可能成为 context，tool 可能产生 side effect，template 可能代表参数化读取。它们的权限和展示语义并不相同。

因此 connection manager 服务多类请求：列出 servers、列出 tools、调用 tool、读取 resource、列出 templates、处理 elicitation，以及报告 authentication status。它们共享 clients 与 provenance，但用户语义不一样。

## Outbound Codex as an MCP Server

Codex 也有 outbound 方向：把 Codex 自己暴露成 MCP server。听起来像对称能力，但它有意更窄。Inbound MCP 让 Codex 消费广泛外部工具生态；outbound MCP 让外部 MCP client 请求 Codex start 或 resume work，并以 notifications 接收 Codex events。

这种窄边界是正确倾向。成熟 runtime 已经有自己的 thread、turn、approval、event 和 rollout contracts。如果把所有概念都作为任意 MCP capability 导出，产品边界会变模糊。更有用的桥接，是把少量外部 tool calls 映射到 thread-manager operations，并流式返回可观察 events。

```text
// Pseudocode - illustrative pattern.
when external_mcp_client_calls("start_work", input):
    thread = thread_manager.start_thread(input)
    subscribe_to_events(thread.id)
    return accepted(thread.id)

for each event in subscribed_thread:
    notify_external_client(convert_event(event))
```

这是桥接，不是第二套 runtime。

## Failure Semantics

MCP failure 首先是 extension failure，然后才可能影响 agent。Server 可能启动失败，OAuth token 可能过期，tool listing 可能超时，resource read 可能被拒绝，elicitation 也可能被取消。Runtime 应保留这些差异，因为它们对应不同恢复路径。

| Failure | Runtime meaning | User-visible recovery |
| --- | --- | --- |
| Startup failure | server 没有成为可用 capability | 展示 status，并在没有这些工具的情况下继续 |
| Listing failure | server 存在，但 tools 未知或过期 | retry、refresh，或在有效时使用 cache |
| OAuth failure | account access 缺失或过期 | 请求 auth flow，或标记 tools unavailable |
| Tool call failure | 已选择的 tool 拒绝或执行失败 | 返回结构化 observation |
| Elicitation cancelled | 必需外部输入未提供 | 停止该 operation，不编造数据 |

这些区别防止 MCP 变成 runtime entanglement。Turn loop 看到 tools 与 observations；MCP orchestration 拥有 server lifecycle。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 17 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 它可以通过 sanitized model-visible tool calls 到达外部 tool servers。 |
| 什么数据结构携带它？ | Effective server definitions、managed MCP clients、tool listings、provenance records 和 shaped tool observations。 |
| 谁拥有下一步决策？ | 模型选择 visible tool，但 runtime 根据 provenance 路由，由 MCP server 执行 operation。 |
| 这里可能怎么失败？ | startup、listing、OAuth、elicitation、resource access、name collision、stale cache 或 tool-call failure。 |

</div>

<div class="apply-this">

## 应用到实践

1. **身份拆分。** 解决外部工具命名混乱 -> 分开 raw server identity、模型可见名称和 provenance record -> 风险：把模型可见字符串当成路由权威。
2. **按 provenance 路由。** 解决跨远端 server 的不安全 dispatch -> 根据保存的来源元数据路由调用 -> 风险：靠解析工具名重建来源。
3. **缓存只是可用性提示。** 解决启动慢或不稳定 -> 用缓存解释 capability 状态 -> 风险：把缓存当成 server 健康证明。
4. **显式 elicitation。** 解决外部工具需要用户输入 -> 把 OAuth 和 elicitation 建模成 runtime request -> 风险：让 server 代替用户编造决策。
5. **窄 outbound bridge。** 解决把 Codex 暴露给 MCP client -> 只发布跨协议有意义的操作 -> 风险：把整个 native runtime 镜像成远端 API。

</div>

## 接下来

MCP 是一个 extension plane，但不是唯一的 extension plane。第 18 章会把视角扩大到 skills、plugins、connectors 和 typed in-process extensions：这些 packaging 与 instruction 层决定 MCP routing 开始之前有哪些 capability 存在。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| MCP configuration | [`codex-rs/codex-mcp/src/mcp/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/mcp/mod.rs#L106) |
| Connection manager | [`codex-rs/codex-mcp/src/connection_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/connection_manager.rs#L72) |
| MCP tool info | [`codex-rs/codex-mcp/src/tools.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/tools.rs#L29) |
| Core tool exposure | [`codex-rs/core/src/mcp_tool_exposure.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_exposure.rs#L1) |
| Outbound Codex MCP server | [`codex-rs/mcp-server/src/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/mcp-server/src/message_processor.rs#L53) |

</div>
