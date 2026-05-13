# 源码索引

这个索引用于审计全书的源码依据。所有 Codex 链接都指向公开 GitHub 代码，并固定到 commit `569ff6a1c400bd514ff79f5f1050a684dc3afde3`。正文应该可以独立阅读；源码索引用于验证，而不是要求读者自己补课。

## 章节锚点

### 第 1 章：架构赌注：作为有边界操作系统的 Agent

- 运行时词汇: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125)
- 操作枚举: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
- 事件流: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1249)
- 会话门面: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)

### 第 2 章：从分发包装器到 Rust Router

- npm 启动包装器: [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L1)
- Rust 命令路由: [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)
- App 命令边界: [`codex-rs/cli/src/app_cmd.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/app_cmd.rs#L5)
- 后台守护进程命令: [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L417)

### 第 3 章：配置、认证与 Managed Requirements

- 解析后的权限: [`codex-rs/core/src/config/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/mod.rs#L236)
- 权限编译: [`codex-rs/core/src/config/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/permissions.rs#L300)
- 托管 feature gate: [`codex-rs/core/src/config/managed_features.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/managed_features.rs#L25)
- 公开权限 profile: [`codex-rs/app-server-protocol/src/protocol/v2/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/permissions.rs#L375)

### 第 4 章：协议边界

- Core submission 与 event: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125)
- App-server JSON-RPC envelope: [`codex-rs/app-server-protocol/src/jsonrpc_lite.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/jsonrpc_lite.rs#L37)
- V2 协议族: [`codex-rs/app-server-protocol/src/protocol/v2/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/mod.rs#L1)
- Event 到 item 映射: [`codex-rs/app-server-protocol/src/protocol/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/event_mapping.rs#L30)
- Schema 导出: [`codex-rs/app-server-protocol/src/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/export.rs#L1)

### 第 5 章：线程、会话与持久状态

- Thread manager boundary: [`codex-rs/core/src/thread_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L168)
- Client-facing thread handle: [`codex-rs/core/src/codex_thread.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/codex_thread.rs#L98)
- Queue-pair runtime facade: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)
- Model-visible history: [`codex-rs/core/src/context_manager/history.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/history.rs#L34)
- Accepted prompt recording: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L2980)

### 第 6 章：Turn Loop：Agent 真正发生的地方

- Turn loop implementation: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)
- Prompt hook ordering: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L313)
- Accepted prompt recording: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L328)
- Model client session: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L232)
- Context manager: [`codex-rs/core/src/context_manager/history.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/history.rs#L34)

### 第 7 章：模型 Provider、流式传输与 Backend Task

- Model client: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L215)
- Provider prompt shape: [`codex-rs/core/src/client_common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client_common.rs#L28)
- Model client session: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L232)
- WebSocket behavior tests: [`codex-rs/core/tests/suite/agent_websocket.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/tests/suite/agent_websocket.rs#L1)
- Backend task API contrast: [`codex-rs/cloud-tasks-client/src/api.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L9)

### 第 8 章：Observability 与 Rollout Trace

- Trace session model: [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L33)
- Codex turn trace model: [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L104)
- Runtime trace payloads: [`codex-rs/rollout-trace/src/protocol_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/protocol_event.rs#L32)
- Core event mapping: [`codex-rs/core/src/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/event_mapping.rs#L1)

### 第 9 章：工具规格、路由与分发

- Tool spec planner: [`codex-rs/core/src/tools/spec_plan.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L69)
- Tool router: [`codex-rs/core/src/tools/router.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/router.rs#L38)
- Tool registry: [`codex-rs/core/src/tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220)
- Tool orchestrator: [`codex-rs/core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)
- Parallel dispatch rules: [`codex-rs/core/src/tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L1)

### 第 10 章：Shell、Exec Server 与文件系统工具

- Shell handler: [`codex-rs/core/src/tools/handlers/shell/shell_handler.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell/shell_handler.rs#L31)
- Unified exec handler: [`codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs#L48)
- Exec policy manager: [`codex-rs/core/src/exec_policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy.rs#L251)
- Exec-server RPC client: [`codex-rs/exec-server/src/rpc.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/rpc.rs#L234)
- Executor filesystem handler: [`codex-rs/exec-server/src/server/file_system_handler.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/server/file_system_handler.rs#L38)

### 第 11 章：把 Patch 作为一等编辑协议

- Patch tool handler: [`codex-rs/core/src/tools/handlers/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L55)
- Patch runtime: [`codex-rs/core/src/tools/runtimes/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/runtimes/apply_patch.rs#L50)
- Patch grammar parser: [`codex-rs/apply-patch/src/parser.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/parser.rs#L126)
- Patch safety assessment: [`codex-rs/core/src/safety.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/safety.rs#L33)
- Turn diff tracker: [`codex-rs/core/src/turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L18)

### 第 12 章：Hooks 与人工审批

- Hook event vocabulary: [`codex-rs/hooks/src/types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/types.rs#L92)
- Hook registry: [`codex-rs/hooks/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/registry.rs#L47)
- Prompt hook runtime: [`codex-rs/core/src/hook_runtime.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/hook_runtime.rs#L321)
- Guardian review path: [`codex-rs/core/src/guardian/review.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/guardian/review.rs#L103)
- Tool orchestrator gates: [`codex-rs/core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)

### 第 13 章：Sandboxes、网络策略与平台边界

- Sandbox type selection: [`codex-rs/sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L23)
- Platform sandbox choice: [`codex-rs/sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L48)
- macOS Seatbelt policy: [`codex-rs/sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L31)
- Linux helper entry: [`codex-rs/linux-sandbox/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/main.rs#L4)
- Linux proxy routing: [`codex-rs/linux-sandbox/src/proxy_routing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/proxy_routing.rs#L169)
- Windows sandbox setup: [`codex-rs/windows-sandbox-rs/src/setup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/setup.rs#L85)
- Network proxy policy: [`codex-rs/network-proxy/src/config.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/network-proxy/src/config.rs#L271)

### 第 14 章：App-Server 契约

- Protocol envelopes and schemas: [`codex-rs/app-server-protocol/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src)
- Transport normalization: [`codex-rs/app-server-transport/src/transport/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/mod.rs#L57)
- Message processor: [`codex-rs/app-server/src/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272)
- Request serialization: [`codex-rs/app-server/src/request_serialization.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_serialization.rs#L19)
- Thread state and pending requests: [`codex-rs/app-server/src/thread_state.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/thread_state.rs#L70)

### 第 15 章：客户端表面、Daemon 生命周期与远程控制

- 后台守护进程生命周期: [`codex-rs/app-server-daemon/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/lib.rs#L34)
- Remote control mode: [`codex-rs/app-server-daemon/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/lib.rs#L92)
- Transport modes: [`codex-rs/app-server-transport/src/transport/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/mod.rs#L57)
- stdio transport: [`codex-rs/app-server-transport/src/transport/stdio.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/stdio.rs#L24)
- WebSocket transport: [`codex-rs/app-server-transport/src/transport/websocket.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/websocket.rs#L82)
- Python public API: [`sdk/python/src/codex_app_server/api.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/python/src/codex_app_server/api.py#L72)
- TypeScript public API: [`sdk/typescript/src/codex.ts`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/typescript/src/codex.ts#L11)

### 第 16 章：TUI 作为事件渲染器

- TUI chat widget: [`codex-rs/tui/src/chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658)
- Bottom pane state: [`codex-rs/tui/src/bottom_pane/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/bottom_pane/mod.rs#L199)
- TUI app-server session: [`codex-rs/tui/src/app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L148)
- App events: [`codex-rs/tui/src/app_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_event.rs#L72)
- Rendering tests: [`codex-rs/tui/src/chatwidget/tests/exec_flow.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget/tests/exec_flow.rs#L34)

### 第 17 章：MCP：没有运行时耦合的外部工具

- MCP configuration: [`codex-rs/codex-mcp/src/mcp/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/mcp/mod.rs#L106)
- Connection manager: [`codex-rs/codex-mcp/src/connection_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/connection_manager.rs#L72)
- MCP tool info: [`codex-rs/codex-mcp/src/tools.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/tools.rs#L29)
- Core tool exposure: [`codex-rs/core/src/mcp_tool_exposure.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_exposure.rs#L1)
- Outbound Codex MCP server: [`codex-rs/mcp-server/src/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/mcp-server/src/message_processor.rs#L53)

### 第 18 章：Skills、Plugins、Connectors 与类型化扩展

- Skills manager: [`codex-rs/core-skills/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-skills/src/manager.rs#L51)
- Skill metadata model: [`codex-rs/core-skills/src/model.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-skills/src/model.rs#L12)
- Plugin manifest: [`codex-rs/core-plugins/src/manifest.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-plugins/src/manifest.rs#L38)
- Plugin manager: [`codex-rs/core-plugins/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-plugins/src/manager.rs#L396)
- Connector directory model: [`codex-rs/connectors/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/connectors/src/lib.rs#L66)
- Typed prompt extension API: [`codex-rs/ext/extension-api/src/contributors/prompt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/contributors/prompt.rs#L12)

### 第 19 章：外部迁移与向后兼容

- External config model: [`codex-rs/app-server/src/config/external_agent_config.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/config/external_agent_config.rs#L1)
- Migration request processor: [`codex-rs/app-server/src/request_processors/external_agent_config_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/external_agent_config_processor.rs#L1)
- TUI migration startup: [`codex-rs/tui/src/external_agent_config_migration_startup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/external_agent_config_migration_startup.rs#L1)
- Protocol compatibility surface: [`codex-rs/app-server-protocol/src/protocol/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/mod.rs#L1)
- Thread store: [`codex-rs/thread-store/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/thread-store/src)

### 第 20 章：多 Agent 协作

- Graph edge status: [`codex-rs/agent-graph-store/src/types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-graph-store/src/types.rs#L7)
- Local graph store: [`codex-rs/agent-graph-store/src/local.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-graph-store/src/local.rs#L13)
- Agent trace reducer: [`codex-rs/rollout-trace/src/reducer/tool/agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/reducer/tool/agents.rs#L1)
- Session multi-agent integration: [`codex-rs/core/src/session/multi_agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/multi_agents.rs#L1)
- Multi-agent tool handlers: [`codex-rs/core/src/tools/handlers/multi_agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents.rs#L1)

### 第 21 章：云端任务、身份与远程工作

- Cloud task API: [`codex-rs/cloud-tasks-client/src/api.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L22)
- HTTP backend client: [`codex-rs/cloud-tasks-client/src/http.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/http.rs#L24)
- Mock backend: [`codex-rs/cloud-tasks-mock-client/src/mock.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-mock-client/src/mock.rs#L1)
- Agent identity material: [`codex-rs/agent-identity/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-identity/src/lib.rs#L40)
- Local diff discipline: [`codex-rs/core/src/turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L18)

### 第 22 章：Memories 与用户级状态

- Memory usage kinds: [`codex-rs/memories/read/src/usage.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/read/src/usage.rs#L8)
- Citation parser: [`codex-rs/memories/read/src/citations.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/read/src/citations.rs#L1)
- Read-only MCP memory service: [`codex-rs/memories/mcp/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/mcp/src)
- Stage 1 extraction: [`codex-rs/memories/write/src/phase1.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase1.rs#L1)
- Stage 2 consolidation: [`codex-rs/memories/write/src/phase2.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase2.rs#L1)

### 第 23 章：构建系统与生成契约

- Cargo workspace: [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1)
- Bazel module: [`MODULE.bazel`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/MODULE.bazel#L1)
- Bazel crate macros: [`defs.bzl`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/defs.bzl#L66)
- Bazel release-build verification: [`.github/workflows/bazel.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/bazel.yml#L314)
- App-server schema export: [`codex-rs/app-server-protocol/src/bin/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/bin/export.rs#L1)

### 第 24 章：打包、发布与原生依赖

- npm wrapper package: [`codex-cli/package.json`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/package.json#L1)
- npm package builder: [`codex-cli/scripts/build_npm_package.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/build_npm_package.py#L1)
- Native dependency installer: [`codex-cli/scripts/install_native_deps.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/install_native_deps.py#L1)
- Cargo release build workflow: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281)
- Release artifact staging: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L373)
- npm package staging: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L570)
- V8 dependency release surface: [`third_party/v8/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/third_party/v8/README.md#L1)

### 第 25 章：CI、策略与架构治理

- Main CI workflow: [`.github/workflows/rust-ci.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-ci.yml#L46)
- Full CI matrix: [`.github/workflows/rust-ci-full.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-ci-full.yml#L152)
- Bazel verification workflow: [`.github/workflows/bazel.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/bazel.yml#L314)
- Blob-size policy: [`scripts/check_blob_size.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/scripts/check_blob_size.py#L1)
- TUI/core boundary check: [`.github/scripts/verify_tui_core_boundary.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_tui_core_boundary.py#L1)
- Cargo workspace governance: [`.github/scripts/verify_cargo_workspace_manifests.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_cargo_workspace_manifests.py#L1)

### 结语：真正值得带走的东西

- `protocol`: [`protocol`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src)
- `core session runtime`: [`core session runtime`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session)
- `app-server`: [`app-server`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src)
- `tool execution`: [`tool execution`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools)
- `rollout trace`: [`rollout trace`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src)
- repository governance: [repository governance](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github)

## 审计顺序

1. 先读 [`Submission`、`Op`、`Event` 和 `EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125)，理解 runtime 词汇。
2. 再读 [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)、[`CodexThread`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/codex_thread.rs#L98) 和 [`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L168)，理解 ownership。
3. 读 [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)，看 turn loop、hook 顺序、sampling、continuation 和 completion。
4. 读 [tool planning / routing / registry / orchestration](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L69)，理解为什么工具是受治理的副作用，而不是 callback。
5. 读 [app-server message processing](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) 和 [TUI rendering](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658)，理解多个客户端如何共享 runtime。
6. 最后读 [sandbox manager](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L23)、[cloud tasks](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L22)、[memory write phases](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase1.rs#L1) 和 [release workflows](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281)。

## 审计规则

当章节内容和源码索引不一致时，应该视为书稿问题。源码索引不是章节叙事的替代品，而是让叙事保持源码等价的压缩地图。
