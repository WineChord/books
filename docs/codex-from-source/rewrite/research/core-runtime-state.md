# Research Notes: Core Runtime and State

Scope: `codex-rs/core`, `codex-rs/protocol`, `codex-rs/core-api`, `codex-rs/state`, `codex-rs/rollout`, `codex-rs/message-history`, `codex-rs/thread-store`, `codex-rs/analytics`, `codex-rs/otel`, and `codex-rs/response-debug-context`.

## Module Boundaries

- `protocol` is the stable host/runtime contract: submissions, events, model
  items, permissions, rollout records, and compatibility bridges.
- `core-api` re-exports public pieces for embedders without owning runtime
  logic.
- `core` is the integration hub: thread/session lifecycle, turn loop, context,
  tools, MCP, hooks, skills, plugins, exec, sandboxing, realtime, goals, and
  telemetry wiring.
- `thread-store` abstracts thread persistence over local rollout files plus
  SQLite metadata or in-memory storage.
- `rollout` is append-only JSONL replay plus thread listing and metadata
  extraction.
- `state` is the SQLite projection and auxiliary runtime state layer.
- `message-history` is global prompt history, separate from thread transcripts.
- `analytics`, `otel`, and `response-debug-context` split product analytics,
  operational tracing/metrics, and sanitized response debugging.

## Key Abstractions

- `ThreadManager` creates, resumes, forks, tracks, and shuts down live threads.
- `CodexThread` is the external handle for submitting operations and observing
  events.
- `Codex` wraps the submission queue, event queue, and shared session.
- `Session` owns durable identity, active turn state, mailbox, realtime state,
  goals, Guardian review, and shared services.
- `SessionConfiguration`, `SessionState`, and `TurnContext` split long-lived
  settings, mutable state, and per-turn resolved execution facts.
- `SessionTask` covers regular turns, compaction, review, and user-shell tasks.
- `ContextManager` owns model-visible conversation history.
- `ToolRouter`, `ToolRegistry`, and `ToolCallRuntime` split tool specification,
  routing, execution, hooks, cancellation, and output shaping.
- `RolloutItem`, `SessionMeta`, and turn context snapshots form the durable
  replay vocabulary.

## Data Flow

1. A host builds a `ThreadManager` and shared services.
2. Start, resume, or fork creates `Codex`, loads plugins, skills, MCP config,
   model settings, instructions, and tools.
3. Session initialization opens live persistence, records metadata, emits the
   first setup event, then initializes MCP and startup prewarm.
4. Clients submit operations through the submission queue.
5. The submission loop normalizes user input, applies turn settings, builds a
   `TurnContext`, and either steers an active turn or starts a task.
6. A regular task records context, runs hooks and injections, builds the prompt,
   streams model events, dispatches tools, records outputs, and emits events.
7. Completion records metrics, flushes persistence, emits turn completion,
   clears active state, and may continue goal-driven work.
8. Rollout JSONL remains the replay source while SQLite supports queries,
   metadata, logs, goals, spawn graphs, dynamic tools, and memories.

## Design Patterns and Rationale

- Submission and event queues decouple clients from runtime scheduling.
- The setup event gives clients a deterministic point for initial session
  metadata.
- Event-sourced rollouts preserve replay, fork, and resume behavior while
  SQLite gives queryable projections.
- Compatibility is explicit through legacy aliases, event forms, sandbox-policy
  projection, and custom deserialization.
- Runtime state is layered so config, session state, turn context, task state,
  and tool runtime do not blur together.
- Cancellation is central: active turns, tools, abort paths, and model-visible
  interruption records all depend on it.
- Metadata extraction is incremental so listing threads does not require full
  replay every time.

## Integration Points

- Model clients and provider managers feed turn sampling.
- MCP, apps, plugins, skills, and hooks feed context and tool surfaces.
- Exec and sandboxing integrate through permission profiles, approval requests,
  network policy, shell snapshots, and unified exec.
- Realtime uses a side manager but shares thread events and input handling.
- Multi-agent support uses mailbox routing, collaboration events, and state
  spawn edges.
- Telemetry spans analytics facts, OTEL spans/metrics, response debug context,
  and local logs.

## Surprising Decisions

- MCP initialization happens after the setup event, so the session can become
  visible before tools are fully ready.
- A session starts with a placeholder MCP connection manager and replaces it
  during startup.
- Resume can return an already-running live thread when the rollout path
  matches.
- Context includes durable setting diffs and turn context, not just messages.
- Permission profiles are canonical, but legacy sandbox policy remains deeply
  wired for old rollouts.
- Stop hooks can inject more work and keep a turn alive.
- User shell commands can run inside an active turn or as standalone tasks.

## Book Implications

- Teach the runtime stack as `ThreadManager -> CodexThread -> Codex -> Session
  -> Task -> ToolRouter`.
- Introduce `Op` and event messages before the turn loop.
- Separate model-visible context, durable rollout, and SQLite projections.
- Explain resume and fork through rollout replay and turn context snapshots.
- Cover tools as a pipeline that starts before execution and ends after
  normalized output is persisted.
