# 第 17 章：MCP：没有运行时耦合的外部工具

第 16 章把终端 UI 看成共享运行时契约上的内联客户端，说明客户端可以观察和驱动线程，却不拥有运行时。本章继续向外走一步：如果客户端可以不接管运行时就参与工作，外部工具也必须能进入一次 turn，而不是变成运行时的一部分。

<div class="chapter-lede">
  <p><strong>你在这里：</strong>客户端已经能通过类型化事件观察和操控线程。</p>
  <p><strong>问题：</strong>外部工具需要暴露给模型，但传输、认证、命名和失败语义不能泄漏进核心 turn loop。</p>
  <p><strong>心智模型：</strong>MCP 是运行时工具协议：Codex 通过客户端发现工具，把安全整理后的工具形状暴露给模型，再用来源记录把调用路由回去。</p>
</div>

把 MCP 说成“更多工具”很容易误导。内置 shell 工具的处理器在运行时内部，系统知道它怎么执行。MCP 工具则来自外部服务；这个服务可能通过 stdio、HTTP、执行器托管进程或进程内适配器运行。模型不该关心这些差异，运行时也不能把外部服务当成可信内部代码。因此 MCP 边界被分成多层。低层 MCP 客户端负责传输和 OAuth。面向 Codex 的 MCP 层把配置服务和内置项变成有效服务定义，管理启动、缓存列表、整理名称，并记录来源记录。核心会话只消费模型可见的工具规格；当模型真的调用工具时，运行时再根据来源记录路由到正确服务。

## MCP 创造的边界

MCP 有三种身份，不能混为一谈。

| 身份 | 谁使用 | 为什么存在 |
| --- | --- | --- |
| 原始服务身份 | MCP 客户端和连接管理器 | 让真实服务、传输方式和工具命名空间可寻址。 |
| 模型可见名称 | 模型提示和工具 schema | 给模型一个安全、规范化的标识符。 |
| 来源记录 | 运行时路由和审计路径 | 把模型可见调用映射回所属服务与原始工具。 |

这个拆分不是样式问题。外部服务可以选择会冲突的名字，也可能使用不适合模型工具调用的字符；它暴露的工具来源还会影响审批、沙箱和用户解释。Codex 因而把命名视为适配步骤，而不是直接复制服务端字符串。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-17-01-zh.svg" alt="MCP 创建命名边界：配置服务保留原始身份，模型可见名称先被清洗，来源记录再把调用路由回所属服务。" loading="lazy" />
  <figcaption>MCP 创建命名边界：配置服务保留原始身份，模型可见名称先被清洗，来源记录再把调用路由回所属服务。</figcaption>
</figure>

这张图说明 MCP 为什么是协议边界，而不是直接的函数注册表。发现、命名和路由是三个不同动作。

## 入站 MCP 栈

入站 MCP 指 Codex 消费 MCP 服务提供的工具。低层客户端负责传输：启动本地 stdio 进程、通过 HTTP 通信、适配执行器托管进程、使用进程内服务，以及处理具备 OAuth 感知能力的 HTTP 流程。对运行时的其他部分来说，这一层应该足够无聊：它提供客户端行为，但不决定哪些工具进入模型请求。

Codex 的 MCP 编排层位于传输层之上。它规范化配置服务与内置项，异步启动客户端，记录启动状态，列出工具和资源，路由工具调用，并处理外部输入请求。外部输入请求是 MCP 服务在操作过程中向用户或客户端索取更多输入。架构上它是双向运行时请求，不是隐藏提示注入。启动过程有意偏向缓存：工具列表可能昂贵，也可能临时不可用；客户端界面应该能展示进度，同时普通工作继续进行。可选服务启动失败不应让整个运行时崩掉，而应表现为状态、警告或缺失工具。

## 工具发现与路由

发现阶段产出模型可见的工具规格，但执行阶段使用来源记录。可以用这个心智模型理解：

<p class="sketch-intro">这张路由图补上算法视角：即使模型看到的是清洗后的工具名，MCP 工具仍然和产出它的服务保持绑定。</p>
<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-17-concept-1-zh.svg" alt="发现与路由是一套算法：启动后产生工具列表，名称被清洗后暴露给模型，来源记录记住所有权，观察结果在返回时被整形。" loading="lazy" />
  <figcaption>发现与路由是一套算法：启动后产生工具列表，名称被清洗后暴露给模型，来源记录记住所有权，观察结果在返回时被整形。</figcaption>
</figure>

```text
// 伪代码 - 说明性模式。
// source_record 表示上文的来源记录。
for each effective_server:
    client = start_or_reuse_client(effective_server)
    listing = client.list_tools_from_cache_or_server()

    for each raw_tool in listing:
        public_name = sanitize(raw_tool.name, effective_server.identity)
        source_record = remember(effective_server.identity, raw_tool.name)
        expose_tool(public_name, raw_tool.schema, source_record)

when model_calls(public_name, arguments):
    source_record = lookup(public_name)
    client = client_for(source_record.server_identity)
    result = client.call_tool(source_record.raw_tool_name, arguments)
    return shape_observation(result)
```

这段是泛化伪代码，刻意不复刻源码。真正的不变量是：模型永远不是“哪个服务接收调用”的权威；运行时根据发现阶段创建的来源记录解析路由。

## 托管 App 工具

托管 App 工具在暴露给模型之后看起来类似 MCP 工具，但它们的事实来源不同。它们依赖托管元数据、连接器名称、App ID、可访问工具信息和账号认证。因此它们需要独立的信任路径与缓存路径。一个工具可以“出现在目录里”，但当前账号没有权限；它也可能需要认证刷新或外部输入之后才能调用。从架构层面看，关键是让 MCP 工具和托管 App 工具只在模型可见工具边界汇合。来源与访问元数据仍留在边界后方，不被抹平。

## 资源与模板

MCP 服务不只暴露工具，还可以暴露资源和资源模板。Codex 把它们视为有独立路由的读取/列出操作，而不是默认变成模型可见函数。这个区别很重要：资源可能成为上下文，工具可能产生副作用，模板可能代表参数化读取。它们的权限和展示语义并不相同。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-17-concept-2-zh.svg" alt="资源与模板复用同一组 MCP 客户端，但语义不同于工具：它们读取上下文、保留来源，不把所有外部能力都伪装成副作用。" loading="lazy" />
  <figcaption>资源与模板复用同一组 MCP 客户端，但语义不同于工具：它们读取上下文、保留来源，不把所有外部能力都伪装成副作用。</figcaption>
</figure>

因此，连接管理器服务多类请求：列出服务、列出工具、调用工具、读取资源、列出模板、处理外部输入请求，以及报告认证状态。它们共享客户端与来源记录，但用户语义不一样。

## 作为 MCP 服务端的出站 Codex

Codex 也有出站方向：把 Codex 自己暴露成 MCP 服务。听起来像对称能力，但它有意更窄。入站 MCP 让 Codex 消费广泛外部工具生态；出站 MCP 让外部 MCP 客户端请求 Codex 开始或恢复工作，并通过通知接收 Codex 事件。这种窄边界是正确倾向。成熟运行时已经有自己的 thread、turn、approval、event 和 rollout 契约。如果把所有概念都作为任意 MCP 能力导出，产品边界会变模糊。更有用的桥接，是把少量外部工具调用映射到线程管理器操作，并流式返回可观察事件。

```text
// 伪代码 - 说明性模式。
when external_mcp_client_calls("start_work", input):
    thread = thread_manager.start_thread(input)
    subscribe_to_events(thread.id)
    return accepted(thread.id)

for each event in subscribed_thread:
    notify_external_client(convert_event(event))
```

这是桥接，不是第二套 runtime。

## 失败语义

MCP 失败首先是扩展失败，然后才可能影响 agent。服务可能启动失败，OAuth token 可能过期，工具列表可能超时，资源读取可能被拒绝，外部输入请求也可能被取消。运行时应保留这些差异，因为它们对应不同恢复路径。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-17-concept-3-zh.svg" alt="MCP 失败被限制在边界内：可选服务可以失败，工具可以缺失，调用可以报错，但核心 turn loop 不应被拖垮。" loading="lazy" />
  <figcaption>MCP 失败被限制在边界内：可选服务可以失败，工具可以缺失，调用可以报错，但核心 turn loop 不应被拖垮。</figcaption>
</figure>

| 失败类型 | 运行时含义 | 用户可见恢复路径 |
| --- | --- | --- |
| 启动失败 | 服务没有成为可用能力 | 展示状态，并在没有这些工具的情况下继续 |
| 列表失败 | 服务存在，但工具未知或过期 | 重试、刷新，或在有效时使用缓存 |
| OAuth 失败 | 账号访问缺失或过期 | 请求认证流程，或标记工具不可用 |
| 工具调用失败 | 已选择的工具拒绝或执行失败 | 返回结构化观察结果 |
| 外部输入取消 | 必需外部输入未提供 | 停止该操作，不编造数据 |

这些区别防止 MCP 变成运行时纠缠。Turn loop 看到工具与观察结果；MCP 编排层拥有服务生命周期。

<div class="trace-ledger">

## 追踪台账

| 问题 | 第 17 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 它可以通过清洗后的模型可见工具调用到达外部工具服务。 |
| 什么数据结构携带它？ | 有效服务定义、托管 MCP 客户端、工具列表、来源记录和整形后的工具观察结果。 |
| 谁拥有下一步决策？ | 模型选择可见工具，但运行时根据来源记录路由，由 MCP 服务执行操作。 |
| 这里可能怎么失败？ | 启动、列表、OAuth、外部输入、资源访问、命名冲突、过期缓存或工具调用失败。 |

</div>

<div class="apply-this">

## 应用到实践

1. **身份拆分。** 解决外部工具命名混乱 -> 分开原始服务身份、模型可见名称和来源记录 -> 风险：把模型可见字符串当成路由权威。
2. **按来源记录路由。** 解决跨远端服务的不安全分发 -> 根据保存的来源记录路由调用 -> 风险：靠解析工具名重建来源。
3. **缓存只是可用性提示。** 解决启动慢或不稳定 -> 用缓存解释能力状态 -> 风险：把缓存当成服务健康证明。
4. **显式外部输入请求。** 解决外部工具需要用户输入 -> 把 OAuth 和外部输入请求建模成运行时请求 -> 风险：让服务代替用户编造决策。
5. **窄出站桥接。** 解决把 Codex 暴露给 MCP 客户端 -> 只发布跨协议有意义的操作 -> 风险：把整个原生运行时镜像成远端 API。

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
