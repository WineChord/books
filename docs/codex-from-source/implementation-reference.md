# Implementation Reference

This appendix is the book's "read this instead of opening the source" page. It
collects the implementation facts that are too detailed for a smooth chapter
but too important to leave only in source links.

## Snapshot Rule

All facts on this page refer to Codex commit
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).
If a later Codex version changes a type or code path, this page must be
updated instead of silently relying on branch links.

## Runtime Spine

| Stage | Concrete implementation fact | What a source reader would retain |
| --- | --- | --- |
| Entry | The CLI parses a command, then routes interactive use, exec use, app-server use, login, MCP, debug, and completion commands to specialized crates. | The CLI is an entry router, not the owner of the agent loop. |
| Protocol | A queued `Submission` wraps an `Op`, an id, and trace context. An emitted `Event` wraps an id and `EventMsg`. | Correlation is explicit. Clients can match progress and outcomes to submitted work. |
| Session | `Codex` is a small facade over submission sender, event receiver, status receiver, session state, and shutdown future. | The public runtime contract is queue in, events out. |
| Submission loop | The background loop receives operations, dispatches them, starts or replaces active tasks, aborts current turns, queues follow-up input, and emits uniform completion. | Agent behavior is task-driven, not one synchronous function call. |
| Task model | Regular user turns, compact tasks, review tasks, and user shell command tasks are distinct runtime work units. | "A turn" is common, but not the only session task. |
| Turn loop | `run_turn` prepares context, injects extensions, runs hooks, samples the model, handles tool calls, checks continuation, compacts, and stops. | The model call is one phase inside a larger state machine. |
| Tool runtime | A router and registry convert model tool calls into handlers, orchestration, hooks, approvals, sandboxed execution, events, and model-visible output. | Tools are governed side effects, not arbitrary callbacks. |
| Surface | TUI and app-server consume or translate the same runtime event stream. | UI code should not own agent decisions. |

## Operation Inventory

`Op` is larger than "user input." Group the variants by what they let clients
do:

| Group | Examples | Why it matters |
| --- | --- | --- |
| Turn input | `UserInput`, `UserInputWithTurnContext`, `UserTurn` | User work can carry cwd, model, approval, sandbox, permissions, output schema, environments, and client metadata. |
| Interruption and cleanup | `Interrupt`, `CleanBackgroundTerminals` | Stopping a turn and cleaning long-lived terminals are separate operations. |
| Approval responses | exec approval, patch approval, Guardian-denied action approval | The runtime treats user or reviewer decisions as queued protocol input. |
| Dynamic tools | dynamic tool responses and cancellation paths | Some tools are executed by a client surface rather than only by the core runtime. |
| Thread control | compaction, rollback, shell command, memory mode, goal operations | A thread is persistent state, not just a transient chat. |
| MCP and extensions | refreshes, tool/resource flows, elicitation responses | External capability can change and can ask for user input. |
| Realtime | start, audio, text, close, list voices | The same protocol family covers streaming voice/text sessions. |
| Multi-agent/collab | agent spawning, messages, waiting, close/resume events | Subagents are first-class runtime interactions. |

## Event Taxonomy

`EventMsg` is the runtime's public diary. A source reader groups it this way:

| Category | Representative events | Reader takeaway |
| --- | --- | --- |
| Lifecycle | `TurnStarted`, `TurnComplete`, `TurnAborted`, `ShutdownComplete` | Clients know when work begins, finishes, aborts, or the runtime exits. |
| Text and reasoning | `AgentMessage`, deltas, reasoning summaries, raw reasoning, section breaks | Streaming output is structured; not every model token is final user text. |
| Item lifecycle | `ItemStarted`, `ItemCompleted`, raw response items | Newer item events coexist with legacy task/tool events for compatibility. |
| Tool lifecycle | exec begin/output/end, MCP begin/end, web/image begin/end, patch begin/update/end | UI can render progress before the final result exists. |
| Approval and permission | exec approval, patch approval, permission request, user input request, Guardian assessment | Human or policy decisions are visible events, not hidden prompts. |
| Context and history | context compacted, thread rolled back, token counts, goal updates | Memory pressure and persistent thread edits are protocol-visible. |
| Errors and warnings | error, warning, Guardian warning, stream error, deprecation notice | Failures carry category and meaning; they are not only console text. |
| Realtime and collab | realtime events, collab agent spawn/wait/close/resume | The protocol covers interactive and multi-agent workflows too. |

## Config, Constraints, and Security Inputs

Configuration is layered. Source readers look for four questions: who provided
the setting, which layer wins, what constraints apply, and whether the runtime
is allowed to ignore it.

| Area | Source-level behavior |
| --- | --- |
| Layering | Settings can come from defaults, user config, profiles, CLI overrides, managed/MDM-style inputs, environment, and app-server writes. |
| Origins | Runtime code often keeps provenance so clients can explain active values and distinguish user choice from managed policy. |
| Requirements | Cloud or workspace requirements can disable or constrain features rather than merely set values. |
| Feature precedence | Experimental and managed features may gate methods, transports, app/plugin availability, or UI controls. |
| Hot changes | Some settings are turn-scoped through `UserInputWithTurnContext`; others are persistent config writes or profile selections. |
| Auth storage | ChatGPT/API-key credentials, MCP OAuth credentials, and connector credentials are handled as security-sensitive state with storage fallback behavior. |
| Secret handling | Logs, events, and UI paths must avoid exposing tokens, bearer credentials, and connector secrets. |

This matters because "config" can be part of safety. A model, sandbox, approval
mode, permission profile, writable root, or network rule is not just display
state; it can decide whether a tool call runs.

## State and Persistence

| State | What persists | Why it matters |
| --- | --- | --- |
| Thread store | thread identity, archive state, metadata, goals, memory settings, and resumable work | Threads survive a single session and can be resumed, forked, listed, or archived. |
| History | model-visible conversation items and normalized prompt history | The next model request is derived from recorded state rather than reconstructed from UI text. |
| Rollout files | raw or replayable event records used for resume/fork/reconstruction | A source reader knows that "transcript" and "runtime replay" are related but not identical. |
| SQLite/log state | app/server metadata, migrations, WAL choices, retention budgets, and operational records | Operational behavior is database-backed in places, not only in memory. |
| Context baseline | turn context items track what has already been injected | Prevents repeated or missing context after compaction, resume, or dependency injection. |

## Turn State Machine

The simplified algorithm is:

1. Reject empty work unless pending input or continuation requires a turn.
2. Refresh or construct the model client session.
3. Run pre-sampling compaction if the current context is already too large.
4. Record user input, turn context, and baseline information.
5. Inject plugin, app, MCP, skill, and instruction context that applies to
   this turn.
6. Run user-prompt hooks and dependency prompts.
7. Build a sampling request from recorded history and active context.
8. Stream model events and normalize them into runtime items and deltas.
9. Dispatch tool calls, dynamic tool requests, or approval prompts.
10. Drain or requeue pending input according to the active turn state.
11. Compute whether follow-up work is required.
12. Compact mid-turn if token pressure requires it.
13. Run stop and after-agent hooks.
14. Emit completion, abort, or error events.

Important branches:

| Branch | Meaning |
| --- | --- |
| Pending input exists | The loop may continue or requeue rather than lose input that arrived mid-turn. |
| Tool futures still running | Cancellation and completion must account for in-flight side effects. |
| Stream disconnect | Some transport errors are retryable with budgets and backoff; others become structured errors. |
| Context window exceeded | The runtime may compact before retrying or stop with a clear failure. |
| Hook blocks | A hook can stop execution, replace output, ask to continue, or report failure. |
| Client session reset | Model changes, compaction, or transport recovery can force a new client session. |

## Model Streaming

Streaming goes through a client boundary before the turn loop sees useful
events.

| Piece | Source-reader fact |
| --- | --- |
| `ModelClientSession` | Owns normalized communication with the model provider for a session. |
| WebSocket vs HTTPS | The client can prefer a streaming transport and fall back depending on provider or failure. |
| Auth recovery | 401-like failures can trigger credential refresh or clearer authentication errors. |
| Retry budget | Transport retries are bounded and use backoff; not every stream error is fatal immediately. |
| Event mapping | Provider `ResponseEvent` values are mapped into internal items, text deltas, reasoning deltas, tool calls, and errors. |
| Dropped consumer | If the receiver disappears, streaming and tool work must be cancelled rather than leaking tasks. |

## Tool Inventory and Dispatch

| Layer | What it owns |
| --- | --- |
| Spec planning | Decides which hosted, local, MCP, dynamic, deferred, unavailable, and discoverable tools should appear in the model tool list. |
| Tool kind | Classifies tools so handlers and safety checks can match expected payload shape. |
| Router | Converts a model tool call into a typed invocation and sends it to the registry. |
| Registry | Stores handlers and dispatches by tool kind/name. |
| Handler | Parses arguments, declares safety metadata, runs or delegates work, and returns structured output. |
| Parallel runtime | Allows safe concurrent calls while serializing writes or nonparallel-safe behavior. |
| Orchestrator | Handles hooks, approval, sandbox attempt, retry/escalation, event emission, and model-visible results. |

Tool inventory includes more than local shell and patch: hosted web search,
image generation, MCP tools and resources, dynamic client-owned tools,
plugin-discovery helpers such as tool search, code-mode or nested tools, and
placeholders for unavailable tools that the model should not call.

## Shell and Exec Taxonomy

| Name | Meaning |
| --- | --- |
| shell / local shell | A command execution path controlled by Codex with cwd, env, approval, sandbox, timeout, and output events. |
| unified `exec_command` | A richer command tool path that can manage PTY/process ids, stdin writes, timeouts, and apply-patch interception. |
| `write_stdin` | Sends input to an already-running exec session rather than starting new work. |
| user shell command | A user-requested shell action queued through session/thread protocol, not a model tool call. |
| remote/container backend | A runtime backend may execute through a remote or container-like environment instead of the local OS directly. |

Important details: command output can be truncated for telemetry or UI, PTY
sessions have lifecycle ids, zsh-style shell startup has fallback behavior, and
`apply_patch` may be intercepted from shell-like command text so edits still go
through patch semantics.

## Patch Runtime

Patch handling has three layers:

| Layer | Responsibility |
| --- | --- |
| Patch grammar | Parses add, delete, update, move, hunk, and EOF operations. |
| Runtime handler | Turns model arguments into a patch attempt, computes effective permissions, asks approval when needed, emits patch events, and returns model-visible output. |
| Diff tracker | Records committed file deltas for the current turn so clients can show a turn diff. |

Source readers also know that patch arguments can stream, patch events can
begin/update/end before final success, shell/unified-exec can delegate to the
patch runtime, remote filesystems can alter where patching executes, and denied
or failed patches still need clear model-visible results.

## Approval, Permissions, Guardian, and Network

| Layer | Detail |
| --- | --- |
| Approval policy | `UnlessTrusted`, `OnFailure`, `OnRequest`, `Granular`, and `Never` decide whether prompts are shown, auto-rejected, or escalated. |
| Permission profile | Filesystem and network permissions are richer than legacy sandbox modes; profiles can be built in, active by name, or extended by additional permissions. |
| Approval requirement | A command may be auto-approved, require user approval, be denied by policy, or require an exec-policy amendment. |
| Approval cache | Some approvals can be cached for the turn or session so repeated equivalent requests do not prompt endlessly. |
| Request permissions | The model can request additional permissions through a tool path that is itself governed by approval policy. |
| Hooks | Permission-request hooks may decide before Guardian or user approval, and post-tool hooks can replace model-visible output. |
| Guardian | Automatic review can cover shell, unified exec, patch, network, MCP, and permissions requests. It should fail closed on timeout or reviewer failure. |
| Network approval | Network access can be immediate or deferred, involve host approval caches, managed proxy registration, cancellation on denial, and policy amendments. |

Honest security language matters: approval is a decision process, permission
profiles describe intended access, and sandboxing is enforcement only when the
chosen platform/backend actually enforces it.

## Sandbox Platform Behavior

| Platform/path | Source-reader fact |
| --- | --- |
| Preference | Tool requests can prefer sandboxing automatically, require it, or forbid it. |
| Override | Some decisions can bypass the first sandbox attempt, but only through explicit policy. |
| macOS | Seatbelt profiles enforce file and network limits and protect sensitive roots such as repository or Codex metadata where configured. |
| Linux | The runtime can choose Landlock or bubblewrap-like helpers; platform sandbox selection can fall back to `SandboxType::None`, while helper launch failures remain execution errors. |
| Windows | Elevated, unelevated, and restricted-token behavior differ; compatibility limits can force refusal rather than unsafe fallback. |
| External sandbox | The runtime may know it is already inside a sandbox and preserve only the network semantics it can reason about. |
| Remote exec | Remote execution can participate in the filesystem/sandbox story instead of using local process launch. |

Sandbox denial is a policy signal, not just a process error. It can carry a
network policy decision and may or may not be eligible for unsandboxed retry.

## MCP, Apps, Plugins, and Skills

| Extension | What source readers know |
| --- | --- |
| MCP servers | Can be stdio or streamable HTTP, have env vars, bearer-token env vars, required/disabled state, startup/tool timeouts, auth status, OAuth edge cases, and per-tool approval config. |
| MCP tools | Can be allow/deny filtered, listed from startup snapshots or cache, marked with sandbox metadata, and governed by elicitation policy. |
| Apps/connectors | Expose connector metadata and app-owned tools, may depend on auth availability, and may cache available tool lists. |
| Plugins | Have manifests, bundled skills/hooks/apps/MCP servers, marketplace caches, availability policy, install/uninstall/share flows, and plugin skill roots. |
| Skills | Are instruction bundles loaded from explicit mentions, dependencies, disabled paths, bundled collections, or plugin roots. |
| Mentions | User input can include structured mentions that affect turn-scoped context and tool availability. |
| Hooks | Session start, user prompt submit, pre/post tool use, permission request, stop, and after-agent hooks are policy extension points. |

The key design rule is that extensions enter through typed inventories,
mentions, hooks, or injected context. They should not silently rewrite the
central turn loop.

## TUI and App-Server Surface

| Surface fact | Meaning |
| --- | --- |
| TUI state | The terminal UI manages scrollback, live tool tails, bottom panes, approval popups, keymaps, editor handoff, notifications, markdown rendering, and resume replay buffering. |
| App-server transport | App-server can use stdio, websocket, Unix-domain or off/in-process style transports depending on mode. |
| Initialization gating | Clients may need handshake, auth, experimental capability, or notification settings before full use. |
| Request scope | App-server requests have serialization scopes: some are global, some are per-thread, and some can be path/thread dependent. |
| Backpressure | JSON-RPC can return server errors for overload or backpressure rather than blocking forever. |
| Security | Origin checks, bearer/capability tokens, websocket auth modes, and secret sanitization are part of the app-server contract. |
| Client APIs | The surface includes filesystem APIs/watchers, command exec, process spawn experiments, fuzzy search, accounts/rate limits, model/provider info, config writes, feedback upload, remote control, realtime audio/text, and thread operations. |
| Notification mapping | Runtime events become app-server notifications such as turn started/completed, item updates, command approval requests, turn diff updates, token usage, and compaction. |

App-server is therefore both a presentation bridge and a runtime entry surface.
Modern TUI or exec paths can interact with app-server-style boundaries rather
than always calling the old core facade directly.

## Error and Retry Taxonomy

| Failure | Runtime behavior to remember |
| --- | --- |
| Retryable transport | Retries with bounded budget and backoff before final error. |
| Auth failure | May refresh credentials, request verification, or emit explicit auth error. |
| Context window | May trigger compaction and retry; not always a fatal user-visible error. |
| Quota/rate/overload | Distinct error categories help UI choose the message. |
| Cyber/policy denial | Should be reported as policy refusal, not generic command failure. |
| Tool parse error | Usually becomes model-visible tool output so the model can correct arguments. |
| Runtime fatal error | Stops the relevant task and emits an error event. |
| Cancellation | Drains or aborts stream/tool futures and reports an aborted or cancelled outcome. |
| App-server JSON-RPC error | Encodes method-level failure such as invalid request, auth, experimental gate, or backpressure. |

## Operational and Advanced Behavior

| Area | Source-reader detail |
| --- | --- |
| Bounded queues | Runtime channels and app-server requests cannot be treated as infinite buffers. |
| Shutdown | Cancellation tokens and task joins prevent leaked background work. |
| Thread unload | App-server can unload or unsubscribe threads when clients disappear. |
| Observability | Trace context, W3C propagation, telemetry spans, and analytics decorate submissions and tool calls. |
| Generated contracts | App-server schemas, TypeScript/Python SDK contract tests, and generated types are part of compatibility. |
| Multi-agent | Spawned agents, agent job state, depth/limits, inter-agent messages, wait/close/resume, and collab events are first-class. |
| Code mode | Some tools are only available in specialized modes or nested execution contexts. |
| Goals and budgets | Thread goals can include state and accounting that outlive a single turn. |
| Review mode | Review requests enter and exit through protocol events and task flow. |
| Cloud task support | Cloud/remote task paths add requirements, auth, and operational constraints. |

## Source-Equivalent Self-Check

You should be able to answer these without opening source:

1. Why is `Submission -> Session -> Event` a better shape than one blocking
   `run(prompt)` call?
2. Which settings are turn-scoped, and which imply persistent or managed
   configuration?
3. What is the difference between a tool parse failure, sandbox denial,
   approval denial, stream disconnect, and runtime fatal error?
4. Why are approval, permission profile, network policy, Guardian, and sandbox
   separate layers?
5. Why is app-server more than a thin UI adapter?
6. What state must survive resume/fork/archive operations?

If any answer feels vague, return to the matching table above before opening
source.
