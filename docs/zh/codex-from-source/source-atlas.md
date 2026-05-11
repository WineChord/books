# 源码索引

本索引收集全书使用的源码锚点。所有链接都指向固定在
`569ff6a1c400bd514ff79f5f1050a684dc3afde3` 的公开 GitHub 代码。

| 主题 | 源码 | 为什么重要 |
| --- | --- | --- |
| npm 启动器 | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | 选择并启动原生 binary。 |
| Rust workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | 列出组成应用的 crate。 |
| CLI 命令 | [`cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | 定义用户可见的顶层模式。 |
| TUI 启动 | [`tui/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710) | 启动交互式终端应用。 |
| TUI 状态 | [`tui/src/app.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app.rs#L590) | 保存主要交互状态机。 |
| Exec 模式 | [`exec/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec/src/lib.rs#L233) | 实现非交互自动化。 |
| App-server 启动 | [`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433) | 启动 headless server 表面。 |
| App-server 路由 | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) | 把 JSON-RPC 请求路由到处理器。 |
| App 协议 | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L178) | 定义客户端请求和服务端通知。 |
| Core 协议 | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | 定义操作、提交、事件和事件消息。 |
| Thread manager | [`thread_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506) | 管理 live thread 创建、resume 和 fork。 |
| Session 门面 | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L423) | 创建 session、接收提交、发出事件。 |
| Turn 循环 | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | 构造上下文、流式接收模型输出、分发工具。 |
| 模型 client | [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305) | 规范化模型流和 response。 |
| 工具 registry | [`tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220) | 注册工具规格和 handler。 |
| 工具编排 | [`tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50) | 用审批和沙箱行为包裹工具执行。 |
| Shell handler | [`tools/handlers/shell.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell.rs#L110) | 处理 shell 类工具调用。 |
| 进程执行 | [`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315) | 构造并执行进程请求。 |
| 沙箱 manager | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | 选择平台沙箱变换。 |
| Apply patch 引擎 | [`apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277) | 解析并应用 patch。 |
| MCP 配置 | [`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | 建模用户配置的 MCP server。 |
| MCP client | [`codex-mcp/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/rmcp_client.rs#L135) | 启动并管理 MCP client。 |
| MCP tool call | [`core/src/mcp_tool_call.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_call.rs#L560) | 在 Codex 监督下调用 MCP 工具。 |
| Subagents | [`multi_agents_v2/spawn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L16) | 实现子 agent 启动。 |
| Extensions | [`extension-api/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/registry.rs#L11) | 注册 extension contribution。 |

