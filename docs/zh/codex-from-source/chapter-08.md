# 第八章：MCP、Apps 与 Skills

Codex 能连接内置工具之外的能力时，价值会明显增加。扩展体系有几层：MCP server
暴露外部能力，apps/connectors 打包集成，skills 提供本地指令和流程，新一些的
extension API 则让一等扩展贡献运行时能力。

## 一句话理解 MCP

Model Context Protocol 是一个基于 JSON-RPC 的标准，用来把 AI 应用连接到外部工具、
资源和 prompts。在 Codex 里，MCP 不只是文档概念；它有配置类型、client 生命周期、
工具发现、审批元数据和执行路径。

面向用户的 MCP 配置建模在
[`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118)。
运行时 client 管理在
[`codex-mcp/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/rmcp_client.rs#L135)。
真正的 MCP tool call 经过
[`core/src/mcp_tool_call.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_call.rs#L560)。

## Host-client-server 结构

MCP 文档描述了 host、client 和 server。Codex 是 host 应用，会为配置好的 server
创建 client。server 暴露能力。模型请求某个工具时，Codex 再通过自己的审批和沙箱
元数据来中介调用。

<div class="flow">
  <div><strong>配置</strong>用户声明 MCP server。</div>
  <div><strong>Client</strong>Codex 启动或连接它。</div>
  <div><strong>发现</strong>工具、资源、prompt 变得可用。</div>
  <div><strong>调用</strong>模型请求某个能力。</div>
  <div><strong>中介</strong>Codex 应用审批和报告规则。</div>
</div>

这是 Codex 反复出现的设计：外部能力不是裸露接入，而是通过类型化边界进入系统。

## Skills 和本地指令

Skills 是另一种扩展。它不一定暴露运行时工具，而是描述专门的工作流、约束或本地知识，
让 Codex 加载进上下文。核心库从
[`core/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/lib.rs#L67)
导出了 skill 构建和注入函数。

这个区分很有用：

- MCP tools 增加可调用外部能力。
- Skills 增加流程性或领域知识。
- Apps/connectors 为更丰富的客户端环境打包集成。
- Extension API 在 Codex 内部贡献结构化能力。

## Subagents 和 extensions

源码里还有 subagent handler：
[`core/src/tools/handlers/multi_agents_v2/spawn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L16)，
以及 extension registry：
[`ext/extension-api/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/registry.rs#L11)。
这些功能从另一个角度说明：agent 能协调更多工作之后，平台就需要明确的注册、归属、
归因和事件流。

## 设计经验

重点不是“所有事情都用 MCP”。重点是 agent 能力需要可发现性、schema、生命周期管理
和权限边界。Codex 源码给出了这些要求在真实 CLI agent 中的具体实现样本。

