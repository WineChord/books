# Source Atlas

This atlas collects the source anchors used throughout the book. All Codex
links point to public GitHub code pinned to commit
`569ff6a1c400bd514ff79f5f1050a684dc3afde3`.

| Chapter | Pattern | Key source | What to read next |
| --- | --- | --- | --- |
| 1 | Read types before functions | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123) | Compare `Submission`, `Op`, `Event`, and `EventMsg` before following implementations. |
| 2 | Workspace by responsibility | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | Group crates by entry, core, protocol, UI, integration, and safety. |
| 3 | Thin entry, thick runtime | [`cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | Follow a subcommand from parsing to the crate that owns real behavior. |
| 4 | Protocol as product contract | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L398) | Read `Op::UserInputWithTurnContext`, approval ops, MCP refresh, review, rollback, and shell command ops. |
| 4 | App-server JSON-RPC surface | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L819) | Compare client requests with server requests and notifications. |
| 5 | Session facade | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | Treat `Codex` as the public queue-pair facade over the runtime. |
| 5 | Session bootstrap | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449) | Watch configuration, skills, plugins, MCP, model selection, and history become `SessionConfiguration`. |
| 6 | Turn loop | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | Follow pre-sampling compaction, skill/plugin injection, hooks, sampling, follow-up, and stop hooks. |
| 6 | Model client boundary | [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305) | Look for how streaming responses are normalized into runtime items. |
| 7 | Tool handler contract | [`tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38) | Read `ToolHandler` methods as a checklist for safe tool design. |
| 7 | Parallel dispatch | [`tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L27) | Study how read and write locks serialize unsafe work while allowing parallel-safe tools. |
| 8 | Patch handler | [`apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286) | See how patch parsing, permissions, events, and orchestration meet. |
| 8 | Patch engine | [`apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277) | Separate edit grammar from agent-facing runtime behavior. |
| 8 | Turn diff tracking | [`turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16) | Learn how committed patch deltas become an in-memory unified diff. |
| 9 | Approval control plane | [`orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127) | Read approval, first sandboxed attempt, denial handling, and retry without sandbox. |
| 9 | Approval policy enum | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L871) | Compare `UnlessTrusted`, `OnFailure`, `OnRequest`, `Never`, and granular modes. |
| 10 | Sandbox selection | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | Inspect how platform and policy choose sandbox transformations. |
| 10 | Linux sandbox helper | [`linux-sandbox/src/linux_run_main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147) | Read how sandboxed process launch differs from normal exec. |
| 10 | macOS seatbelt | [`sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602) | Study policy construction for platform-specific constraints. |
| 11 | MCP configuration | [`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | Start with user-facing server configuration types. |
| 11 | MCP client runtime | [`codex-mcp/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/rmcp_client.rs#L135) | Follow server startup and client management. |
| 11 | Skills in the turn loop | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L170) | See how explicit skill mentions become turn-scoped injections. |
| 12 | TUI event consumer | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | Read the module comments as the UI architecture summary. |
| 12 | App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | Follow request routing to thread, turn, catalog, plugin, app, MCP, and account processors. |
| 12 | App notifications | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | Inspect how runtime events become app-server notifications. |

## Reading Order

If you only have one hour, read the source in this order:

1. [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
   and `EventMsg` to understand the runtime vocabulary.
2. [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)
   to see the queue-pair facade.
3. [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)
   to see the agent loop.
4. [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38)
   to see what a safe tool must declare.
5. [`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)
   to see approval, sandbox, and retry semantics.
