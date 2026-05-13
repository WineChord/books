# Chapter 4: The Protocol Boundary

Chapter 3 established that Codex starts work only after configuration,
authentication, feature state, and managed requirements have been resolved into
a constrained runtime envelope. This chapter explains the language that carries
work across that envelope. The protocol boundary is where product intent stops
being private method calls and becomes durable messages: submissions, events,
model items, app-server JSON-RPC requests, server-to-client requests, and
generated schemas.

The protocol is a product boundary, not a serialization afterthought. It tells
clients what they may ask for, tells the runtime what it must report, and tells
future versions what compatibility obligations they have inherited.

## Core Runtime Protocol

The core runtime protocol has a simple outer shape:

| Direction | Concept | Meaning |
| --- | --- | --- |
| Into runtime | Submission | A queued unit of work sent by a client or host. |
| Into runtime | Operation | The typed action inside a submission: start a turn, interrupt, approve, respond to a tool request, refresh state, and so on. |
| Out of runtime | Event | A sequenced fact emitted by the runtime. |
| Out of runtime | Event message | The typed payload of that fact: setup, progress, item delta, approval request, tool result, completion, error. |

This split lets the runtime behave like an evented kernel. Clients do not call
private session methods directly. They submit operations and observe events.
The runtime may queue, reject, transform, or serialize operations according to
active state.

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-04-01-en.svg" alt="The protocol path is a controlled crossing: operations enter, accepted facts are recorded, and only bounded requests reach models or tools." loading="lazy" />
  <figcaption>The protocol path is a controlled crossing: operations enter, accepted facts are recorded, and only bounded requests reach models or tools.</figcaption>
</figure>

The sequence is simplified, but the contract is accurate: the runtime is the
only component that converts submitted intent into durable progress.

## Items Are Not Just Messages

In a simple chat application, "message" can carry most of the system. Codex
needs a richer item vocabulary. A thread may contain user text, images, model
output, reasoning summaries, command calls, command output, file changes,
approval records, tool observations, plan updates, hook activity, realtime
transcripts, and collaboration events.

Calling all of these "messages" would hide the key distinction: different
items have different rules for streaming, persistence, display, replay, and
compatibility. A command output delta should not be treated like an assistant
paragraph. A patch update should not be treated like a model-visible instruction.
An approval request is not final history until it is resolved.

The item model is therefore an architectural vocabulary. It lets the runtime,
app-server, terminal UI, SDKs, and rollout reducers agree on what kind of fact
they are handling.

## App-Server JSON-RPC

App-server introduces a second protocol boundary. It is not a replacement for
the core runtime protocol; it is a client-facing distributed-system layer around
threads, turns, items, approvals, filesystem APIs, process APIs, MCP, plugins,
account state, and remote-control flows.

Its wire shape is JSON-RPC-like: requests expect responses, notifications do
not, errors carry structured failure information, and server-to-client requests
allow the runtime side to ask a connected client for decisions such as
approvals or input. Codex intentionally keeps the envelope lightweight, but the
request/response/notification distinction remains central.

The important word is "like." App-server is not a generic JSON-RPC server onto
which an agent was bolted. It adds protocol obligations that are specific to
long-running agent work:

| Obligation | Why plain request/response is insufficient |
| --- | --- |
| Initialize before use | Methods and experimental fields depend on connection identity and capability. |
| Connection-scoped gates | Two clients observing one thread may understand different experimental surfaces. |
| Server-to-client requests | Approvals, elicitations, dynamic tools, and auth refresh can block runtime progress. |
| Resource serialization | Requests must be ordered by thread, path, process, account, or global state. |
| Replay and rejoin | A reconnecting client needs committed history plus live updates without duplicates. |

<p class="sketch-intro">Read this board as the second half of the protocol contract: core events are not exposed until the app-server has translated them into client-safe facts.</p>
<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-04-02-en.svg" alt="App-server events are translated into thread items and deltas before clients see them, so UI surfaces observe runtime facts rather than provider-shaped messages." loading="lazy" />
  <figcaption>App-server events are translated into thread items and deltas before clients see them, so UI surfaces observe runtime facts rather than provider-shaped messages.</figcaption>
</figure>

The app-server boundary adds concerns that a local terminal UI can often hide:
connection initialization, experimental capability negotiation, request
serialization, backpressure, replay on rejoin, thread listeners, pending
approvals, and derived status. Those are protocol concerns because clients may
be separate processes with their own lifecycle.

The mapping from core events to app-server items is the most important
translation layer:

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-04-03-en.svg" alt="App-server event mapping projects core events into thread items, item deltas, derived status, and server-to-client requests before any client renders the update." loading="lazy" />
  <figcaption>App-server event mapping projects core events into thread items, item deltas, derived status, and server-to-client requests before any client renders the update.</figcaption>
</figure>

A client should not reconstruct this projection by parsing terminal text. The
server does that mapping once, exposes stable item and notification shapes,
and keeps enough request ids and pending-request state to reconnect decisions
to the turns they unblock.

## From App Request to Core Operation

The app-server model uses user-facing concepts such as thread, turn, item, and
environment selection. The core runtime uses submissions and operations. A
request to start a turn therefore has to be validated and translated.

```text
// Pseudocode - illustrative pattern.
function handle_turn_start(request, connection):
    require_initialized(connection)
    require_experimental_fields_enabled(request, connection.capabilities)

    thread = find_loaded_thread(request.thread_id)
    overrides = resolve_turn_overrides(request)
    operation = build_runtime_operation(
        kind = "user_turn",
        input = request.input_items,
        settings = overrides
    )

    turn = register_in_progress_turn(thread)
    submit_to_core(thread, operation)
    return response_with_turn(turn)

function map_core_event(event):
    item_update = reconstruct_thread_item(event)
    if item_update.exists:
        notify_client("item_updated", item_update)
    if event.requests_client_decision:
        send_server_request(event.decision_request)
```

Again, this is pseudocode. The important idea is translation with validation.
App-server is not a tunnel that blindly forwards arbitrary JSON into the core.
It owns a client contract and maps that contract onto runtime operations.

## Generated Schemas as Governance

Generated schemas make the protocol auditable outside Rust. JSON Schema and
TypeScript-facing artifacts let clients, tests, and release checks detect drift.
They also force the source types to carry enough metadata for stable and
experimental surfaces to be separated.

Schema generation is a form of architectural governance. Without it, a field
can be added to a Rust type and accidentally become a client obligation. With
it, protocol evolution has to pass through exported contracts, compatibility
filters, and tests that notice changes.

This is especially important because Codex has more than one client generation
target. A Rust app-server client, a Python SDK, generated TypeScript bindings,
and test clients all need a shared understanding of the wire model even when
they expose different ergonomics.

## Compatibility Is a Code Path

Protocol compatibility in Codex is explicit. Legacy aliases are accepted for
some values. Older request forms coexist with newer turn-context operations.
App-server v1 and v2 concepts overlap. Experimental fields are gated by
connection capability and filtered from stable schema output. Deprecated fields
may remain accepted even when ignored so older clients keep working.

This is not accidental clutter. It is the cost of a protocol boundary that
other clients can depend on. Once a field crosses the boundary, removing it is
not the same as refactoring a private helper. It may break a terminal, SDK,
daemon, extension, or persisted rollout.

The bounded-OS analogy helps here too. Operating systems carry compatibility
for old system calls because applications depend on them. Agent runtimes that
want multiple clients inherit a smaller version of the same obligation.

## What Can Enter and Leave

By the end of Part I, the architecture has four gates:

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-04-04-en.svg" alt="The entry boundary is deliberately narrow: installed commands pass through the Rust router, resolved envelopes describe allowed runtime state, and protocol events are the only durable exit." loading="lazy" />
  <figcaption>The entry boundary is deliberately narrow: installed commands pass through the Rust router, resolved envelopes describe allowed runtime state, and protocol events are the only durable exit.</figcaption>
</figure>

The runtime is powerful precisely because the boundary is narrow. A client can
start or steer work, interrupt it, answer approval requests, provide dynamic
tool outputs, refresh external state, or request thread lifecycle actions. A
client can observe setup, streaming, tool activity, approval prompts, errors,
completion, and reconstructed items. It cannot reach inside the session and
mutate private state directly.

## Apply This

1. **Make protocol nouns durable.** If clients depend on a concept, name it in
   the protocol instead of leaking private implementation state.
2. **Separate envelopes from domain payloads.** Request IDs, responses, errors,
   notifications, and tracing belong outside the agent-specific payload.
3. **Translate at boundaries.** App-facing requests should be validated and
   mapped into runtime operations, not forwarded as arbitrary JSON.
4. **Gate experimental surface area.** Experimental fields need runtime checks
   and generated-contract filtering, not just documentation labels.
5. **Treat compatibility as behavior.** Aliases, deprecated fields, and v1/v2
   bridges should be tested code paths rather than comments about history.

## Closing

Part I established the contract: distribution reaches the Rust router, the
router resolves a constrained runtime envelope, and protocol messages define
what may enter or leave the agent. Part II can now open the runtime itself,
beginning with threads, sessions, and durable state.

<div class="source-equivalence">

## Source Map

| Concept | Source anchor |
| --- | --- |
| Core submissions and events | [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L125) |
| App-server JSON-RPC envelope | [`codex-rs/app-server-protocol/src/jsonrpc_lite.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/jsonrpc_lite.rs#L37) |
| V2 protocol families | [`codex-rs/app-server-protocol/src/protocol/v2/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/mod.rs#L1) |
| Event-to-item mapping | [`codex-rs/app-server-protocol/src/protocol/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/event_mapping.rs#L30) |
| Schema export | [`codex-rs/app-server-protocol/src/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/export.rs#L1) |

</div>
