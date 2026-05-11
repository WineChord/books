# Source Atlas

This atlas collects the source anchors used throughout the book. All links
point to public GitHub code pinned to commit
`569ff6a1c400bd514ff79f5f1050a684dc3afde3`.

| Topic | Source | Why it matters |
| --- | --- | --- |
| npm launcher | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | Selects and launches the native binary. |
| Rust workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | Lists the crates that make up the application. |
| CLI commands | [`cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | Defines top-level user-facing modes. |
| TUI startup | [`tui/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710) | Starts the interactive terminal app. |
| TUI state | [`tui/src/app.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app.rs#L590) | Holds the main interactive state machine. |
| Exec mode | [`exec/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec/src/lib.rs#L233) | Implements non-interactive automation. |
| App-server bootstrap | [`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433) | Starts the headless server surface. |
| App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) | Routes JSON-RPC requests to processors. |
| App protocol | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L178) | Defines client requests and server notifications. |
| Core protocol | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | Defines operations, submissions, events, and event messages. |
| Thread manager | [`thread_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506) | Owns live thread creation, resume, and fork. |
| Session facade | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L423) | Spawns sessions, accepts submissions, emits events. |
| Turn loop | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | Builds context, streams model output, dispatches tools. |
| Model client | [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305) | Normalizes model streaming and responses. |
| Tool registry | [`tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220) | Registers tool specs and handlers. |
| Tool orchestration | [`tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50) | Wraps tool execution with approval and sandbox behavior. |
| Shell handler | [`tools/handlers/shell.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell.rs#L110) | Handles shell-like tool calls. |
| Process execution | [`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315) | Builds and executes process requests. |
| Sandbox manager | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | Selects platform sandbox transformations. |
| Apply patch engine | [`apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277) | Parses and applies patch edits. |
| MCP config | [`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | Models user-configured MCP servers. |
| MCP client | [`codex-mcp/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/rmcp_client.rs#L135) | Starts and manages MCP clients. |
| MCP tool calls | [`core/src/mcp_tool_call.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_call.rs#L560) | Invokes MCP tools through Codex supervision. |
| Subagents | [`multi_agents_v2/spawn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L16) | Implements child-agent spawning. |
| Extensions | [`extension-api/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/registry.rs#L11) | Registers extension contributions. |

