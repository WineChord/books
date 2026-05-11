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
| 5 | Submission loop | [`handlers.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/handlers.rs#L711) | 跟踪 queued `Op` 如何变成 task、steering、abort、cleanup 或 state update。 |
| 5 | Task model | [`tasks/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tasks/mod.rs#L175) | 比较 regular、compact、review 和 user shell tasks。 |
| 5 | History and rollout | [`history.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/history.rs#L32) | 区分 model-visible history 和 rollout/replay records。 |
| 6 | Turn loop | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | 跟踪 compaction、skill/plugin injection、hooks、sampling、follow-up。 |
| 6 | Model client boundary | [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305) | 查看模型通信如何被 runtime 规范化。 |
| 6 | Stream mapping | [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L1552) | 查看 provider event normalization、transport errors 和 retry。 |
| 6 | Compaction engine | [`compact.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/compact.rs#L60) | 比较 manual、automatic、local 和 remote compaction。 |
| 7 | Tool handler contract | [`tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38) | 把 `ToolHandler` 的方法当作安全工具设计清单。 |
| 7 | Tool spec planning | [`spec_plan.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L69) | 看 hosted、local、MCP、dynamic、deferred 和 unavailable tools 如何变成 specs。 |
| 7 | Tool router | [`router.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/router.rs#L29) | 跟踪模型 tool name 如何变成 typed invocation。 |
| 7 | Parallel dispatch | [`tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L27) | 看读写锁如何让安全工具并行、让不安全工具串行。 |
| 7 | Unified exec | [`exec_command.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs#L70) | 学习 PTY/session lifecycle、stdin、timeout 和 patch interception。 |
| 8 | Patch handler | [`apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286) | 观察 patch input、permissions、events、orchestration 如何相遇。 |
| 8 | Patch engine | [`apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277) | 把 edit grammar 与 agent runtime behavior 分开。 |
| 8 | Runtime patch delegation | [`runtimes/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/runtimes/apply_patch.rs#L52) | 查看 patch work 如何通过 runtime-specific filesystem 执行。 |
| 8 | Turn diff tracking | [`turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16) | 学习 committed patch delta 如何变成内存里的 unified diff。 |
| 9 | Approval control plane | [`orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127) | 阅读 approval、first attempt、denial、retry without sandbox。 |
| 9 | Approval policy enum | [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L871) | 比较 `UnlessTrusted`、`OnFailure`、`OnRequest`、`Never` 和 granular modes。 |
| 9 | Permission profiles | [`sandboxing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/sandboxing.rs#L42) | 查看 approval requirements、permission profiles 和 sandbox permissions。 |
| 9 | Network approval | [`network_approval.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/network_approval.rs#L31) | 跟踪 immediate/deferred network approval 和 host policy。 |
| 9 | Guardian review | [`approval_request.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/guardian/approval_request.rs#L13) | 比较 request kinds 和 fail-closed review behavior。 |
| 10 | Sandbox selection | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | 看平台和策略如何选择 sandbox transformation。 |
| 10 | Linux sandbox helper | [`linux_run_main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147) | 读 sandboxed process launch 如何不同于普通 exec。 |
| 10 | macOS seatbelt | [`seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602) | 学习平台相关 policy construction。 |
| 11 | MCP config | [`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | 从用户配置的 MCP server 形状开始。 |
| 11 | MCP client runtime | [`rmcp-client/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rmcp-client/src/rmcp_client.rs#L545) | 跟踪 server startup 和 client management。 |
| 11 | MCP connection manager | [`connection_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/connection_manager.rs#L72) | 理解 startup progress、tool listing、cache 和 failures。 |
| 11 | Codex as MCP server | [`mcp-server/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/mcp-server/src/message_processor.rs#L53) | 看到 Codex 作为 MCP server 暴露工具的路径。 |
| 11 | Skill loader | [`loader.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-skills/src/loader.rs#L106) | 跟踪 bundled/user/plugin skill roots 和 disabled paths。 |
| 11 | Plugin mentions | [`mentions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/plugins/mentions.rs#L41) | 区分 `$skill`、plugin 和 app mention paths。 |
| 11 | Apps processor | [`apps_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/apps_processor.rs#L39) | 查看 auth、feature、workspace、cache 和 MCP aware app listing。 |
| 11 | Turn skills | [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L170) | 看显式 skill mention 如何成为 turn-scoped injection。 |
| 12 | TUI event consumer | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | 先读模块注释，它就是 UI 架构摘要。 |
| 12 | TUI app-server session | [`app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L1) | 理解 TUI 为什么是 app-server protocol client。 |
| 12 | App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | 按 thread、turn、catalog、plugin、app、MCP、account 等 family 分组。 |
| 12 | Turn request processor | [`turn_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/turn_processor.rs#L315) | 看 app-server `turn/start` 如何到达 core session operations。 |
| 12 | Bespoke event handling | [`bespoke_event_handling.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/bespoke_event_handling.rs#L133) | 学习 core event 到 notification/request 的映射。 |
| 12 | App notifications | [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | 查看 runtime events 如何变成 app-server notifications。 |
| 附录 | 完整实现清单 | [`implementation-reference`](implementation-reference) | 用密集表格掌握 config、persistence、protocol inventory、security 和 operations。 |

## 一小时阅读顺序

1. 先读 [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
   和 `EventMsg`，掌握 runtime 词汇。
2. 再读 [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)，理解 queue-pair facade。
3. 读 [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)，理解 Agent loop。
4. 读 [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38)，理解安全工具需要声明什么。
5. 读 [`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)，理解审批、沙箱和 retry。
