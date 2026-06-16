# Source Atlas

> **Reading Contract:** Use this atlas only after the narrative is clear. Open pinned links to verify owners, boundaries, and evidence rather than to discover the story from scratch.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/pinned-source-evidence-map-569ff6a1-v2.webp" alt="Pinned source evidence atlas mapping chapter claims to verified owners, public source anchors, and audit rules" loading="eager" decoding="async" />
  <figcaption>Use the atlas after the prose has made a claim: it maps narrative statements to subsystem owners, pinned source lines, and audit results.</figcaption>
</figure>

This atlas is the source-audit index for the book. All Codex links point to public GitHub code pinned to commit `569ff6a1c400bd514ff79f5f1050a684dc3afde3`. The chapters should be readable without opening these links; the atlas exists so a reader can verify the book's claims without hunting through the repository.

Audit rule: open an anchor only to confirm the claim class. Direct type, function, constant, workflow, or test behavior counts as **verified source**. A boundary that emerges from several anchors counts as **surrounding contract inference** and should stay abstract in prose and figures. Anything that depends on private service internals is **not visible** and is intentionally absent from this atlas.

## Chapter Anchors

### Chapter 1: The Architectural Bet: Agent as a Bounded Operating System

- Runtime vocabulary: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125)
- Operation enum: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
- Event stream: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1249)
- Session facade: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)

### Chapter 2: From Distribution Wrapper to Rust Router

- npm launch wrapper: [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L175)
- Rust command router: [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)
- App command boundary: [`codex-rs/cli/src/app_cmd.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/app_cmd.rs#L5)
- App-server daemon commands: [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L417)

### Chapter 3: Configuration, Authentication, and Managed Requirements

- Resolved permissions: [`codex-rs/core/src/config/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/mod.rs#L236)
- Permission compilation: [`codex-rs/core/src/config/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/permissions.rs#L300)
- Managed feature gates: [`codex-rs/core/src/config/managed_features.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/managed_features.rs#L25)
- Public permission profile: [`codex-rs/app-server-protocol/src/protocol/v2/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/permissions.rs#L375)

### Chapter 4: The Protocol Boundary

- Core submissions and events: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125)
- App-server JSON-RPC envelope: [`codex-rs/app-server-protocol/src/jsonrpc_lite.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/jsonrpc_lite.rs#L37)
- V2 protocol families: [`codex-rs/app-server-protocol/src/protocol/v2/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/mod.rs#L3)
- Event-to-item mapping: [`codex-rs/app-server-protocol/src/protocol/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/event_mapping.rs#L30)
- Schema export: [`codex-rs/app-server-protocol/src/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/export.rs#L54)

### Chapter 5: Threads, Sessions, and Durable State

- Thread manager boundary: [`codex-rs/core/src/thread_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L168)
- Client-facing thread handle: [`codex-rs/core/src/codex_thread.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/codex_thread.rs#L98)
- Queue-pair runtime facade: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)
- Model-visible history: [`codex-rs/core/src/context_manager/history.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/history.rs#L34)
- Accepted prompt recording: [`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L2980)

### Chapter 6: The Turn Loop: Where the Agent Becomes an Agent

- Turn loop implementation: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)
- Prompt hook ordering: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L313)
- Accepted prompt recording: [`codex-rs/core/src/session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L328)
- Model client session: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L232)
- Context manager: [`codex-rs/core/src/context_manager/history.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/history.rs#L34)

### Chapter 7: Model Providers, Streaming, and Backend Tasks

- Model client: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L215)
- Provider prompt shape: [`codex-rs/core/src/client_common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client_common.rs#L28)
- Model client session: [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L232)
- WebSocket behavior tests: [`codex-rs/core/tests/suite/agent_websocket.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/tests/suite/agent_websocket.rs#L20)
- Backend task API contrast: [`codex-rs/cloud-tasks-client/src/api.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L9)

### Chapter 8: Observability: Capture Facts Before You Interpret Them

- Trace session model: [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L33)
- Codex turn trace model: [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L104)
- Runtime trace payloads: [`codex-rs/rollout-trace/src/protocol_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/protocol_event.rs#L32)
- Core event mapping: [`codex-rs/core/src/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/event_mapping.rs#L135)

### Chapter 9: Tool Specifications, Routing, and Dispatch

- Tool spec enum: [`codex-rs/tools/src/tool_spec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tools/src/tool_spec.rs#L17)
- Public planning entry: [`codex-rs/core/src/tools/spec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec.rs#L66)
- Tool spec planner: [`codex-rs/core/src/tools/spec_plan.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L69)
- Deferred MCP handler registration: [`codex-rs/core/src/tools/spec_plan.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L425)
- Tool router: [`codex-rs/core/src/tools/router.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/router.rs#L38)
- Tool payloads and outputs: [`codex-rs/core/src/tools/context.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/context.rs#L59)
- Tool registry: [`codex-rs/core/src/tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220)
- Parallel dispatch rules: [`codex-rs/core/src/tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L28)
- Dispatch trace adapter: [`codex-rs/core/src/tools/tool_dispatch_trace.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/tool_dispatch_trace.rs#L19)

### Chapter 10: Shell, Exec Server, and Filesystem Tools

- Shell handler request shaping: [`codex-rs/core/src/tools/handlers/shell/shell_handler.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell/shell_handler.rs#L42-L63)
- Shared shell execution path: [`codex-rs/core/src/tools/handlers/shell.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell.rs#L110-L260)
- Exec policy approval conversion: [`codex-rs/core/src/exec_policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy.rs#L272-L379)
- Unmatched command fallback: [`codex-rs/core/src/exec_policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy.rs#L631-L745)
- Tool orchestrator approval and attempt flow: [`codex-rs/core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127-L260)
- Sandbox denial retry branch: [`codex-rs/core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L264-L379)
- Sandbox attempt transform: [`codex-rs/core/src/tools/sandboxing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/sandboxing.rs#L387-L421)
- Unified exec handler request binding: [`codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/unified_exec/exec_command.rs#L163-L317)
- Unified exec request shape: [`codex-rs/core/src/unified_exec/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/unified_exec/mod.rs#L90-L114)
- Unified exec process manager: [`codex-rs/core/src/unified_exec/process_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/unified_exec/process_manager.rs#L370-L737)
- Unified exec runtime adapter: [`codex-rs/core/src/tools/runtimes/unified_exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/runtimes/unified_exec.rs#L56-L76)
- Exec-server protocol methods and process output: [`codex-rs/exec-server/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/protocol.rs#L13-L124)
- Exec-server client calls: [`codex-rs/exec-server/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/client.rs#L318-L397)
- Remote process adapter: [`codex-rs/exec-server/src/remote_process.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/remote_process.rs#L34-L83)
- Executor filesystem handler: [`codex-rs/exec-server/src/server/file_system_handler.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/server/file_system_handler.rs#L33-L161)
- Remote filesystem sandbox forwarding: [`codex-rs/exec-server/src/remote_file_system.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec-server/src/remote_file_system.rs#L41-L94)

### Chapter 11: Patches as a First-Class Editing Protocol

- Patch handler struct and tool surface: [`ApplyPatchHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L55), [`ToolHandler` impl](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286-L335)
- Handler verification and orchestration: [`ApplyPatchHandler::handle`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L337-L458)
- Shell interception path: [`intercept_apply_patch`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L462-L565)
- Patch grammar and hunk model: [`codex-rs/apply-patch/src/parser.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/parser.rs#L1-L79)
- Invocation verifier: [`maybe_parse_apply_patch_verified`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/invocation.rs#L132-L224)
- Patch safety assessment: [`assess_patch_safety`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/safety.rs#L33-L116)
- Patch runtime: [`ApplyPatchRuntime::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/runtimes/apply_patch.rs#L200-L251)
- Hunk application and committed delta: [`apply_hunks_to_files`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L360-L551)
- Turn diff tracker: [`codex-rs/core/src/turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16-L107)

### Chapter 12: Hooks and Human Approval

#### Hook Surfaces

- Legacy hook payload contrast: [`codex-rs/hooks/src/types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/types.rs#L90-L97)
- Protocol hook event names and run summaries: [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1451-L1573)
- Hook list vs runnable handler model: [`codex-rs/hooks/src/engine/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/engine/mod.rs#L42-L96)
- Discovery, normalized hashes, and trust filtering: [`codex-rs/hooks/src/engine/discovery.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/engine/discovery.rs#L367-L520)

#### Runtime Hook Outcomes

- Pre-tool hook request, preview, block, and context recording: [`codex-rs/core/src/hook_runtime.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/hook_runtime.rs#L138-L186)
- Pre-tool outcome parser for block/context: [`codex-rs/hooks/src/events/pre_tool_use.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/events/pre_tool_use.rs#L67-L130)
- User-prompt hook and additional-context recording: [`codex-rs/core/src/hook_runtime.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/hook_runtime.rs#L346-L448)
- Permission-request hook contract and decision fold: [`codex-rs/hooks/src/events/permission_request.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/hooks/src/events/permission_request.rs#L1-L168)

#### Approval, Sandbox, and Guardian Boundaries

- Approval protocol inputs and requests: [`UserInput`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L662-L679), [`EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1364-L1379)
- Approval policy and decision enum: [`AskForApproval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L889-L920), [`ReviewDecision`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L3590-L3646)
- Permission hook before Guardian/user approval: [`ToolOrchestrator::request_approval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L384-L448)
- Approval requirement before first sandbox attempt: [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127-L255)
- Sandbox-denial retry branch: [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L264-L379)
- Guardian routing, fail-closed review, and constrained review session: [`codex-rs/core/src/guardian/review.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/guardian/review.rs#L142-L622)

### Chapter 13: Sandboxes, Network Policy, and Platform Boundaries

- Built-in and custom permission profile compilation: [`codex-rs/core/src/config/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/permissions.rs#L54-L80), [`compile_permission_profile`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/config/permissions.rs#L175-L234)
- Runtime filesystem and network policy vocabulary: [`codex-rs/protocol/src/permissions.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/permissions.rs#L78-L180)
- Additional permissions and effective profile merge: [`codex-rs/sandboxing/src/policy_transforms.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/policy_transforms.rs#L19-L119), [`effective_permission_profile`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/policy_transforms.rs#L493-L507)
- Sandbox attempt handoff into transform: [`codex-rs/core/src/tools/sandboxing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/sandboxing.rs#L387-L421)
- Sandbox type selection and platform choice: [`codex-rs/sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L23-L61), [`select_initial`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L139-L166)
- Platform command transform: [`SandboxManager::transform`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L168-L260)
- macOS Seatbelt generation and restricted managed-network policy: [`codex-rs/sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L257-L313), [`create_seatbelt_command_args`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L592-L727)
- Linux bwrap/seccomp execution and proxy routing: [`codex-rs/linux-sandbox/src/linux_run_main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L143-L250), [`proxy_routing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/proxy_routing.rs#L70-L156)
- Windows elevated setup, legacy limitation, and runner backend: [`setup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/setup.rs#L159-L192), [`legacy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/unified_exec/backends/legacy.rs#L282-L306), [`elevated.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/unified_exec/backends/elevated.rs#L22-L71)
- Windows identity, ACL, firewall, and WFP enforcement anchors: [`spawn_prep.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/spawn_prep.rs#L157-L330), [`acl.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/acl.rs#L54-L260), [`firewall.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/bin/setup_main/win/firewall.rs#L53-L202), [`wfp_setup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/wfp_setup.rs#L126-L174), [`wfp.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/wfp.rs#L75-L95), [`filter_specs.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/wfp/filter_specs.rs#L25-L124)
- Network proxy environment, domain rules, and limited methods: [`proxy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/network-proxy/src/proxy.rs#L472-L535), [`policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/network-proxy/src/policy.rs#L193-L212), [`limited methods`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/network-proxy/src/policy.rs#L369-L375)

### Chapter 14: The App-Server Contract

- JSON-RPC-lite envelope and request/notification/response/error decoding: [`jsonrpc_lite.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/jsonrpc_lite.rs#L1-L88)
- Transport mode parsing and connection normalization: [`transport/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/mod.rs#L53-L135), [`stdio.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/stdio.rs#L24-L100)
- Generated client request scopes and `serialization_scope()`: [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L77-L221)
- Request conversion, initialize gate, experimental gate, and scoped dispatch: [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L526-L836)
- Queue key mapping, FIFO draining, and shared-read batching: [`request_serialization.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_serialization.rs#L18-L200)
- Thread state, listener commands, and server-request resolution command routing: [`thread_state.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/thread_state.rs#L39-L170)
- Listener task select loop and event tracking before projection: [`thread_lifecycle.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/thread_lifecycle.rs#L212-L378)
- Running-thread resume order, optional history/token replay, pending request replay, and conditional goal continuation: [`thread_lifecycle.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/thread_lifecycle.rs#L511-L668)
- Stateless event-to-notification projection boundary and representative item event cases: [`event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/event_mapping.rs#L25-L34), [`event cases`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/event_mapping.rs#L345-L449)
- Generated server requests and typed response constructors, including dynamic tool call requests: [`common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1035-L1137), [`server request definitions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1277-L1315)
- Outgoing sender pending callbacks, response matching, unresolved request replay, and thread cancellation cleanup: [`outgoing_message.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/outgoing_message.rs#L93-L116), [`send_request_to_connections`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/outgoing_message.rs#L270-L355), [`pending_requests_for_thread`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/outgoing_message.rs#L424-L437), [`cancel_requests_for_thread`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/outgoing_message.rs#L439-L470)

### Chapter 15: SDKs, Daemons, and Remote Control

Use this group as a surface map, not as proof that every client exposes the same contract. Transport, Python SDK, TypeScript process wrapper, daemon lifecycle, and remote control each own a different edge of the app-server boundary.

- Transport modes, listen URL parsing, transport events, and connection origin: [`transport/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/mod.rs#L53-L173)
- Python SDK public facade, initialize metadata normalization, and generated `thread_start`: [`api.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/python/src/codex_app_server/api.py#L72-L175)
- Python SDK one-reader routing, response waiters, turn queues, pending turn replay, and `fail_all`: [`_message_router.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/python/src/codex_app_server/_message_router.py#L15-L158)
- Python SDK run-result projection from stream notifications: [`_run.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/python/src/codex_app_server/_run.py#L59-L112)
- TypeScript SDK `Codex` public API: [`codex.ts`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/typescript/src/codex.ts#L11-L38)
- TypeScript SDK event parsing and `run()` collection: [`thread.ts`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/typescript/src/thread.ts#L70-L138)
- TypeScript SDK process wrapper, `resume`, stdin input, stdout lines, and exit errors: [`exec.ts`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/sdk/typescript/src/exec.ts#L137-L215)
- Daemon constants, lifecycle commands, start/restart/stop/version, bootstrap, readiness polling, and operation lock: [`app-server-daemon/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/lib.rs#L24-L503)
- Daemon control-socket probe and app-server version extraction: [`client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/client.rs#L29-L108)
- PID backend reservation lock, process start, pid-file state reads, stale cleanup, and reservation lock acquisition: [`backend/pid.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-daemon/src/backend/pid.rs#L52-L345)
- Remote-control start config, handle, initial status, and websocket runner: [`remote_control/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/remote_control/mod.rs#L31-L130)
- Remote-control client/server envelopes, chunk events, ack cursor, and URL normalization: [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/remote_control/protocol.rs#L45-L198)
- Remote-control client tracker, stream-id fallback, remote-control connection origin, and outbound task: [`client_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/remote_control/client_tracker.rs#L37-L285)
- Remote-control websocket state, outbound buffer, connect/reconnect, writer replay, sequence assignment, chunk splitting, and sequence/segment ack handling: [`websocket.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/remote_control/websocket.rs#L67-L879)
- Remote-control segment limits, reassembly, out-of-order rejection, and invalid chunk drops: [`segment.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-transport/src/transport/remote_control/segment.rs#L17-L245)

### Chapter 16: The TUI as an Event Renderer

- TUI chat widget: [`codex-rs/tui/src/chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658)
- Bottom pane state: [`codex-rs/tui/src/bottom_pane/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/bottom_pane/mod.rs#L199)
- TUI app-server session: [`codex-rs/tui/src/app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L148)
- App events: [`codex-rs/tui/src/app_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_event.rs#L72)
- Rendering tests: [`codex-rs/tui/src/chatwidget/tests/exec_flow.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget/tests/exec_flow.rs#L34)

### Chapter 17: MCP: External Tools Without Runtime Entanglement

- MCP configuration: [`codex-rs/codex-mcp/src/mcp/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/mcp/mod.rs#L106)
- Connection manager: [`codex-rs/codex-mcp/src/connection_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/connection_manager.rs#L72)
- MCP tool info: [`codex-rs/codex-mcp/src/tools.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/tools.rs#L29)
- Core tool exposure: [`codex-rs/core/src/mcp_tool_exposure.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_exposure.rs#L18)
- Outbound Codex MCP server: [`codex-rs/mcp-server/src/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/mcp-server/src/message_processor.rs#L53)

### Chapter 18: Skills, Plugins, Connectors, and Typed Extensions

- Skills manager: [`codex-rs/core-skills/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-skills/src/manager.rs#L51)
- Skill metadata model: [`codex-rs/core-skills/src/model.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-skills/src/model.rs#L12)
- Plugin manifest: [`codex-rs/core-plugins/src/manifest.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-plugins/src/manifest.rs#L38)
- Plugin manager: [`codex-rs/core-plugins/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core-plugins/src/manager.rs#L396)
- Connector directory model: [`codex-rs/connectors/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/connectors/src/lib.rs#L66)
- Typed prompt extension API: [`codex-rs/ext/extension-api/src/contributors/prompt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/contributors/prompt.rs#L12)

### Chapter 19: External Migration and Backward Compatibility

- External config model: [`codex-rs/app-server/src/config/external_agent_config.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/config/external_agent_config.rs#L42)
- Migration request processor: [`codex-rs/app-server/src/request_processors/external_agent_config_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/external_agent_config_processor.rs#L58)
- TUI migration startup: [`codex-rs/tui/src/external_agent_config_migration_startup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/external_agent_config_migration_startup.rs#L28)
- Protocol compatibility surface: [`codex-rs/app-server-protocol/src/protocol/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/mod.rs#L4)
- Thread store: [`codex-rs/thread-store/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/thread-store/src)

### Chapter 20: Multi-Agent Coordination

- Graph edge status: [`codex-rs/agent-graph-store/src/types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-graph-store/src/types.rs#L7)
- Local graph store: [`codex-rs/agent-graph-store/src/local.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-graph-store/src/local.rs#L13)
- Agent trace reducer: [`codex-rs/rollout-trace/src/reducer/tool/agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/reducer/tool/agents.rs#L62)
- Session multi-agent integration: [`codex-rs/core/src/session/multi_agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/multi_agents.rs#L6)
- Multi-agent tool handlers: [`codex-rs/core/src/tools/handlers/multi_agents.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents.rs#L40)

### Chapter 21: Cloud Tasks, Identity, and Remote Work

- Cloud task API: [`codex-rs/cloud-tasks-client/src/api.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L22)
- HTTP backend client: [`codex-rs/cloud-tasks-client/src/http.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/http.rs#L24)
- Mock backend: [`codex-rs/cloud-tasks-mock-client/src/mock.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-mock-client/src/mock.rs#L18)
- Agent identity material: [`codex-rs/agent-identity/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/agent-identity/src/lib.rs#L40)
- Local diff discipline: [`codex-rs/core/src/turn_diff_tracker.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L18)

### Chapter 22: Memories and User-Level State

- Memory usage kinds: [`codex-rs/memories/read/src/usage.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/read/src/usage.rs#L8)
- Citation parser: [`codex-rs/memories/read/src/citations.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/read/src/citations.rs#L6)
- Read-only MCP memory service: [`codex-rs/memories/mcp/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/mcp/src)
- Stage 1 extraction: [`codex-rs/memories/write/src/phase1.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase1.rs#L70)
- Stage 2 consolidation: [`codex-rs/memories/write/src/phase2.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase2.rs#L45)

### Chapter 23: Build Systems and Generated Contracts

- Cargo workspace: [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L2)
- Bazel module: [`MODULE.bazel`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/MODULE.bazel#L3)
- Bazel crate macros: [`defs.bzl`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/defs.bzl#L66)
- Bazel release-build verification: [`.github/workflows/bazel.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/bazel.yml#L314)
- App-server schema export: [`codex-rs/app-server-protocol/src/bin/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/bin/export.rs#L23)

### Chapter 24: Packaging, Release, and Native Dependencies

- npm wrapper package: [`codex-cli/package.json`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/package.json#L2)
- npm package builder: [`codex-cli/scripts/build_npm_package.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/build_npm_package.py#L154)
- Native dependency installer: [`codex-cli/scripts/install_native_deps.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/install_native_deps.py#L161)
- Cargo release build workflow: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281)
- Release artifact staging: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L373)
- npm package staging: [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L570)
- V8 dependency release surface: [`third_party/v8/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/third_party/v8/README.md#L21)

### Chapter 25: CI, Policy, and Architectural Governance

- Main CI workflow: [`.github/workflows/rust-ci.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-ci.yml#L46)
- Full CI matrix: [`.github/workflows/rust-ci-full.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-ci-full.yml#L152)
- Bazel verification workflow: [`.github/workflows/bazel.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/bazel.yml#L314)
- Blob-size policy: [`scripts/check_blob_size.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/scripts/check_blob_size.py#L78)
- TUI/core boundary check: [`.github/scripts/verify_tui_core_boundary.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_tui_core_boundary.py#L24)
- Cargo workspace governance: [`.github/scripts/verify_cargo_workspace_manifests.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_cargo_workspace_manifests.py#L36)

### Epilogue: What to Steal

- `protocol`: [`protocol`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src)
- `core session runtime`: [`core session runtime`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session)
- `app-server`: [`app-server`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src)
- `tool execution`: [`tool execution`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools)
- `rollout trace`: [`rollout trace`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src)
- repository governance: [repository governance](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github)

## Reading Order

If you only have one hour for source audit, read in this order:

1. [`Submission`, `Op`, `Event`, and `EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125) to learn the runtime vocabulary.
2. [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366), [`CodexThread`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/codex_thread.rs#L98), and [`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L168) to understand ownership.
3. [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) to see the turn loop, hook ordering, sampling, continuation, and completion.
4. [Tool planning, routing, registry, and orchestration](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/spec_plan.rs#L69) to see why tools are governed side effects rather than callbacks.
5. [App-server message processing](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) and [TUI rendering](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658) to see how clients share the runtime.
6. [Sandbox management](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L23), [cloud tasks](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cloud-tasks-client/src/api.rs#L22), [memory write phases](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/memories/write/src/phase1.rs#L70), and [release workflows](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281) for the advanced subsystems.

## Audit Rule

When a chapter and this atlas disagree, treat it as a book bug. The atlas is not a replacement for chapter narrative; it is the compact map that lets the narrative remain source-grounded without turning every chapter into a file listing.
