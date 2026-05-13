# Proposed Full Outline

This page executes Phase 3 of the rewrite brief. It presents the full proposed
book structure and stops at the approval gate. Chapter titles and sequencing
are designed as if the reader were building Codex from scratch.

## Part I: Establish the Contract

_A complex agent becomes understandable when every actor speaks the same
language._

### Chapter 1: The Architectural Bet

- Introduces the thesis: Codex is an event-sourced agent runtime with typed,
  replayable, policy-gated side effects.
- Defines the vocabulary used throughout the book: thread, turn, item, event,
  operation, tool, rollout, permission profile, client surface.
- Explains why the book starts from contracts instead of UI screenshots or
  command examples.

### Chapter 2: From Distribution Wrapper to Rust Command Router

- Follows startup from npm/native package launcher into the Rust CLI command
  tree.
- Explains single-binary dispatch, install context, root command parsing,
  hidden internal commands, and why JavaScript is distribution glue.
- Shows the first reusable pattern: thin product surfaces over shared runtime
  crates.

### Chapter 3: Configuration, Auth, and Managed Requirements

- Explains layered TOML, trust-gated project config, requirements overlays,
  feature flags, and source-aware constraint failures.
- Covers API-key auth, ChatGPT OAuth, external bearer auth, refresh, keyring
  storage, and cloud requirements.
- Establishes the invariant that every later subsystem consumes resolved,
  constrained runtime settings.

### Chapter 4: Protocol as Product Boundary

- Introduces submissions, events, model items, app-server JSON-RPC, and
  generated schemas as the durable language of Codex.
- Explains compatibility: legacy aliases, v1/v2 coexistence, experimental
  gates, stable schema filtering, and app-server item reconstruction.
- Prepares the reader for the session loop by showing what can enter and leave
  the runtime.

## Part II: Build the Agent Runtime

_The runtime is not a model call. It is a scheduler for context, streaming,
tools, cancellation, and replay._

### Chapter 5: Threads, Sessions, and Durable State

- Builds the runtime stack: `ThreadManager`, `CodexThread`, `Codex`, `Session`,
  task, and tool router.
- Separates the three histories: model-visible context, rollout JSONL, and
  SQLite projections.
- Explains resume, fork, rollback, metadata extraction, and why
  `SessionConfigured` is the first client-visible event.

### Chapter 6: The Turn Loop

- Walks a user turn through pending input, hook inspection, context injection,
  model request construction, streaming, tool dispatch, compaction, and
  completion.
- Explains interruption, cancellation tokens, stop hooks that can add work, and
  goal-driven continuation.
- Uses the loop to connect model providers, tools, telemetry, and persistence.

### Chapter 7: Model Providers and Streaming Transports

- Layers transport, typed API, provider registry, runtime provider, model
  catalog, and backend task APIs.
- Compares HTTP SSE and Responses WebSocket as different transports that
  converge on one event vocabulary.
- Covers cache-plus-overlay model metadata, Bedrock body-aware signing, local
  providers, realtime sideband/media paths, and backend task separation.

### Chapter 8: Observability, Rollout Trace, and Replay

- Explains event capture, rollout persistence, `rollout-trace` raw payloads,
  reducers, graph model, and strict replay errors.
- Shows how product analytics, OTEL traces/metrics, response debug context, and
  local state logs serve different observability needs.
- Introduces the transferable pattern: observe first, interpret later.

## Part III: Execute Side Effects

_A model can suggest an action. Codex decides whether that action becomes a
side effect._

### Chapter 9: Tool Specs, Routing, and Runtime Dispatch

- Separates model-facing tool metadata from runtime handlers, dynamic tools,
  MCP tools, unavailable tools, and hosted tool specs.
- Walks the pipeline from tool spec plan to router, runtime, output shaping,
  persistence, and event emission.
- Explains why tool execution is a capability system, not a function-call
  switch statement.

### Chapter 10: Shell, Exec Server, and Filesystem Mutation

- Explains shell-command parsing, safe/dangerous heuristics, current
  execpolicy, legacy execpolicy, and rule amendments.
- Shows local vs remote `exec-server`, process/output sequencing, executor
  filesystem, HTTP capability, and environment management.
- Establishes `exec-server` as the abstraction for where work happens.

### Chapter 11: Patches as a Mutation Protocol

- Treats `apply_patch` as parse, verify, assess, approve, and mutate, not as
  text piped to a shell.
- Covers patch grammar, heredoc interception, filesystem-backed apply, git diff
  support, and turn diff tracking.
- Shows why filesystem mutation paths must verify intent before execution.

### Chapter 12: Hooks and Human Approval

- Explains hook discovery, trust hashes, managed hooks, preview/run lifecycle,
  JSON stdin/stdout contracts, and hook result semantics.
- Covers command/file/permission/MCP/dynamic-tool approvals, Guardian review,
  headless rejection, and TUI modal interruption.
- Connects policy, hooks, and user approval as separate gates with different
  failure modes.

### Chapter 13: Sandboxes and Managed Networking

- Builds the chain from permission profile to filesystem/network policy, sandbox
  transform, platform helper, and execution metadata.
- Gives separate treatments of macOS Seatbelt, Linux bwrap/seccomp/proxy
  routing, Windows identities/firewall/WFP, and shell escalation.
- Clarifies what the managed proxy is and is not: an application proxy plus
  platform forcing, not a universal firewall.

## Part IV: Open the Runtime to Clients

_A runtime becomes a platform when multiple clients can share the same thread
model._

### Chapter 14: App-Server as Local Distributed System

- Explains protocol contracts, transport normalization, request serialization,
  backpressure, message processing, and server-to-client requests.
- Covers thread listeners, history reconstruction, live notifications,
  pending approvals, replay on rejoin, and derived status.
- Shows why app-server is a concurrency boundary, not merely a web API.

### Chapter 15: Client Surfaces, Daemon Lifecycle, and Remote Control

- Distinguishes protocol schema, Rust app-server client, Python app-server SDK,
  TypeScript `codex exec` SDK, daemon lifecycle, and remote-control transport.
- Explains stdio, Unix socket WebSocket framing, local WebSocket, in-process,
  and backend-mediated remote client streams.
- Covers compatibility costs such as v1 initialize anchoring, experimental
  gates, and client-version workarounds.

### Chapter 16: The Terminal UI as Inline Runtime Client

- Explains TUI startup over app-server, event sources, app commands,
  `ChatWidget`, bottom pane, approvals, status surfaces, and active thread
  routing.
- Shows why Codex uses inline scrollback rather than a standard fullscreen
  ratatui model.
- Covers rendering: rich vs raw, source-backed markdown, mutable streaming
  tails, table holdback, committed history, and resize reflow.

## Part V: Extend the System

_Extension points are useful only when each trust boundary is explicit._

### Chapter 17: MCP as Runtime Tool Protocol

- Covers low-level RMCP client transports, OAuth, stdio/HTTP/in-process modes,
  Codex MCP orchestration, startup cache, hosted app tools, and tool
  provenance.
- Explains outbound Codex-as-MCP-server support and why it remains narrower
  than inbound MCP.
- Teaches the separation between raw MCP identity and model-visible sanitized
  names.

### Chapter 18: Skills, Plugins, Connectors, and Typed Extensions

- Explains skills as model-instruction/workflow units, plugins as packaging and
  distribution, connectors as hosted app metadata, and typed extensions as
  in-process contributors.
- Covers plugin sync, marketplace caches, remote bundles, skill budgets,
  explicit mentions, implicit invocation, app IDs, MCP configs, and hooks.
- Highlights trust validation and fail-soft behavior across extension loading.

### Chapter 19: External Agent Migration and Compatibility Bridges

- Covers conversion of external configs, hooks, commands, agents, and JSONL
  sessions into Codex-native config and rollout artifacts.
- Explains conservative migration, content-hash ledgers, skip behavior, and
  import metadata.
- Uses migration as the place to teach compatibility without making every
  chapter repeat compatibility concerns.

## Part VI: Coordinate Work Beyond One Turn

_Once actions are durable, the system can coordinate agents, tasks, memory, and
cloud workflows._

### Chapter 20: Multi-Agent Threads and Interaction Graphs

- Explains spawn edges, mailboxes, agent-control tools, collaboration events,
  graph store persistence, and open/closed descendant traversal.
- Shows how raw runtime/protocol/tool events reduce into spawn, assign, send,
  result, and close interaction edges.
- Discusses ordering races and pending queues as a trace-reduction pattern.

### Chapter 21: Cloud Tasks and Agent Identity

- Covers cloud task list/detail/create/apply flows, branch/environment
  detection, backend client contracts, task attempts, local patch preflight,
  and cloud TUI.
- Explains agent runtime keys, signed task authorization, task registration,
  encrypted task IDs, JWT decoding, and ABOM metadata.
- Separates backend task workflows from local turn execution and model
  streaming.

### Chapter 22: Memories and Long-Term Context

- Explains memory read prompt/citation helpers, read-only MCP filesystem
  service, Stage 1 extraction, Stage 2 consolidation, locks, redaction, and
  restricted internal agents.
- Shows why memory write uses a model-guided internal agent but surrounds it
  with deterministic safety rails.
- Teaches long-term context as a controlled side channel, not hidden chat
  history.

## Part VII: Ship and Govern the System

_Architecture survives only when release, tests, and governance enforce it._

### Chapter 23: Build Systems and Generated Contracts

- Explains Cargo as developer source of truth and Bazel as hermetic release and
  CI overlay.
- Covers generated config, hook, and app-server schemas as external contracts.
- Shows how workspace-root test launchers preserve Cargo-like assumptions under
  Bazel.

### Chapter 24: Packaging, Release, and Native Dependencies

- Follows artifacts from Rust builds to npm platform packages, GitHub releases,
  standalone installers, signing, checksums, and bundled helper binaries.
- Explains third-party isolation: V8, bubblewrap, patch sets, vendored native
  code, and platform-specific compatibility paths.
- Shows how delivery architecture protects product architecture from platform
  sprawl.

### Chapter 25: CI, Policy, and Architectural Governance

- Covers CI lanes, blob-size policy, dependency governance, argument-comment
  lint, TUI/core boundary checks, clippy sync, schema drift checks, and release
  workflows.
- Explains when the repo uses executable policy instead of social convention.
- Closes the book by extracting governance patterns readers can apply to their
  own agent systems.

## Epilogue: What to Steal

- Synthesizes the main transferable patterns: typed event boundary,
  event-sourced replay, capability-routed tools, policy before execution,
  declarative extension planes, client-neutral runtime, observe-first tracing,
  and CI-enforced architecture.
- Discusses where Codex intentionally carries compatibility cost.
- Frames the forward look: richer extension APIs, stronger provider cache
  identity, cleaner compatibility layers, and more explicit distributed-client
  semantics.

## Approval Gate

Per the rewrite brief, writing chapters from scratch should begin only after
this outline is approved or revised.
