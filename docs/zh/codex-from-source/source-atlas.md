# 源码索引

这个索引汇总全书使用的源码锚点。所有 Codex 链接都指向公开 GitHub 代码，并固定到 commit
`569ff6a1c400bd514ff79f5f1050a684dc3afde3`。

| 章节 | 模式 | 关键源码 | 下一步看什么 |
| --- | --- | --- | --- |
| 1 | 先读类型再读函数 | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123) | 先比较 `Submission`、`Op`、`Event`、`EventMsg`。 |
| 2 | 按责任理解 workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | 把 crates 分成入口、core、protocol、UI、集成和安全。 |
| 3 | 入口薄，运行时厚 | [`cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | 跟踪一个 subcommand 从解析到真正负责的 crate。 |
| 4 | 协议即产品契约 | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L398) | 阅读用户输入、审批、MCP、review、rollback、shell command 等 operation。 |
| 4 | app-server JSON-RPC | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L819) | 比较 client requests、server requests 和 notifications。 |
| 5 | Session facade | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | 把 `Codex` 当作 runtime 的 queue-pair 门面来读。 |
| 5 | Session bootstrap | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449) | 看 config、skills、plugins、MCP、model、history 如何变成 `SessionConfiguration`。 |
| 6 | Turn loop | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | 跟踪 compaction、skill/plugin injection、hooks、sampling、follow-up。 |
| 7 | Tool handler contract | [`tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38) | 把 `ToolHandler` 的方法当作安全工具设计清单。 |
| 7 | Parallel dispatch | [`tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L27) | 看读写锁如何让安全工具并行、让不安全工具串行。 |
| 8 | Patch handler | [`apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286) | 观察 patch input、permissions、events、orchestration 如何相遇。 |
| 8 | Turn diff tracking | [`turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16) | 学习 committed patch delta 如何变成内存里的 unified diff。 |
| 9 | Approval control plane | [`orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127) | 阅读 approval、first attempt、denial、retry without sandbox。 |
| 10 | Sandbox selection | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | 看平台和策略如何选择 sandbox transformation。 |
| 11 | MCP config | [`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | 从用户配置的 MCP server 形状开始。 |
| 11 | Turn skills | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L170) | 看显式 skill mention 如何成为 turn-scoped injection。 |
| 12 | TUI event consumer | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | 先读模块注释，它就是 UI 架构摘要。 |
| 12 | App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | 按 thread、turn、catalog、plugin、app、MCP、account 等 family 分组。 |

## 一小时阅读顺序

1. 先读 [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
   和 `EventMsg`，掌握 runtime 词汇。
2. 再读 [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)，理解 queue-pair facade。
3. 读 [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)，理解 Agent loop。
4. 读 [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38)，理解安全工具需要声明什么。
5. 读 [`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)，理解审批、沙箱和 retry。
