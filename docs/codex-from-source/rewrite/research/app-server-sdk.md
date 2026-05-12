# Research Notes: App-Server and SDKs

Scope: `codex-rs/app-server`, `codex-rs/app-server-client`,
`codex-rs/app-server-daemon`, `codex-rs/app-server-protocol`,
`codex-rs/app-server-test-client`, `codex-rs/app-server-transport`,
`sdk/python`, `sdk/python-runtime`, and `sdk/typescript`.

## Module Boundaries

- `app-server-protocol` is the protocol source of truth: JSON-RPC envelopes,
  v1/v2 contracts, notifications, server-to-client requests, event mapping,
  history reconstruction, and schema generation.
- `app-server-transport` normalizes stdio, Unix socket, WebSocket, in-process,
  outbound queueing, overload behavior, and remote-control tunneling.
- `app-server` orchestrates config, auth, state, telemetry, transports, message
  processing, request processors, thread lifecycle, command/process managers,
  filesystem watch, and notification routing.
- `app-server-client` is a Rust facade that preserves protocol semantics.
- `app-server-daemon` manages local app-server lifecycle, pid files, operation
  locks, probing, restart, bootstrap, remote control, and update loop.
- `app-server-test-client` is a developer harness.
- Python SDK targets app-server v2 over stdio with generated Pydantic models.
- TypeScript SDK wraps `codex exec --experimental-json`; it is not an
  app-server protocol client.

## Key Abstractions

- JSON-RPC message, client request, client response, server notification,
  server request, and client notification form the protocol spine.
- Thread, turn, thread item, user input, permissions, environment selections,
  and overrides form the user-visible agent model.
- `MessageProcessor` enforces initialize-before-use, experimental gates,
  tracing, per-connection state, and request serialization.
- Serialization queues protect resources such as global state, threads, paths,
  processes, command processes, fs watches, and MCP OAuth.
- Outgoing senders track responses, notifications, pending server requests,
  cancellation, thread-targeting, and replay on rejoin.
- Thread state managers derive loaded, idle, active, system-error, approval, and
  input-pending status.
- Thread history builder reconstructs app-server turns from rollout events.
- Python router prevents multiple stdout readers by routing responses and turn
  streams to queues.

## Data Flow

1. Transport parses one JSON message per line or frame and forwards an incoming
   transport event.
2. Message processor deserializes, checks initialization and experimental
   capability, serializes by resource key when required, and calls a processor.
3. Initialization records client identity/capabilities and returns server
   metadata.
4. Thread start loads effective config, validates dynamic tools and
   permissions, starts a core thread, attaches a listener, responds, then
   broadcasts thread start.
5. Thread resume uses listener command queues when a thread is already loaded
   so replay and live subscription stay ordered.
6. Core events flow through lifecycle and bespoke handlers into app-server item
   notifications.
7. Turn start validates input and overrides, submits a core operation, records
   request-to-turn id, and returns an in-progress turn.
8. Server-to-client requests cover approvals, user input, MCP elicitation,
   dynamic tools, auth refresh, tool calls, permissions, and attestation.
9. Remote control enrolls with backend, maps remote streams to app-server
   connection ids, chunks messages, acks cursors, and replays buffered outbound
   messages after reconnect.
10. Python SDK spawns app-server and routes protocol messages; TypeScript SDK
    spawns `codex exec` and parses JSONL events.

## Design Patterns and Rationale

- Rust protocol types generate schema artifacts to reduce drift.
- Experimental support exists in runtime checks and generated-contract
  filtering.
- JSON-RPC envelopes remain at boundaries even for in-process Rust calls.
- Backpressure is explicit for ingress and outbound connections.
- Long-running work sends responses later so the central processor remains
  responsive.
- Thread state is event-sourced and reconstructed from rollout/live listener
  data rather than being a second transcript model.
- Request serialization is resource-scoped instead of global.
- Status is derived from runtime facts and watchers.

## Integration Points

- Core runtime supplies `ThreadManager`, `CodexThread`, operations, rollout,
  config, auth, sandbox, exec, and review machinery.
- Persistence spans thread store, rollout, state DB, log DB, archive state,
  memory rows, and token replay.
- Config management merges CLI overrides, request overrides, requirements,
  feature flags, and thread config.
- MCP, plugins, apps, OAuth, skills watcher, marketplace, and connector listing
  all route through app-server APIs.
- Execution includes command exec, process spawn, filesystem APIs, and fs watch.
- Remote control uses backend enrollment, account headers, installation id,
  reconnect state, cursors, and acks.

## Surprising Decisions

- The JSON-RPC envelope omits the standard `jsonrpc: "2.0"` field.
- v2 still relies on v1 initialize concepts.
- Python SDK and TypeScript SDK are architecturally different clients.
- Python default server-request handling may accept command/file-change
  approvals unless overridden.
- Experimental capability is connection-scoped, which is awkward for shared
  threads.
- Some compatibility filtering is special-case rather than a generic layer.
- Filesystem APIs at this layer need careful explanation because sandbox
  parameters are not the central abstraction here.
- Unix socket transport uses WebSocket framing over the local socket.

## Book Implications

- Teach layers: protocol contracts, transport normalization, app-server
  orchestration, core-thread integration, SDK ergonomics.
- Use Thread, Turn, Item as the app-server mental model.
- Separate protocol SDK contracts from developer SDKs.
- Make event streams primary: live notifications, replay, resume, and rejoin
  all depend on them.
- Include backpressure, request serialization, and server-to-client requests as
  distributed-systems concerns.
