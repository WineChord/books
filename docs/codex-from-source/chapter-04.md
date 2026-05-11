# Chapter 4: Protocol

<div class="chapter-lede">
  <p><strong>You are here:</strong> user intent has reached a boundary and must become structured data.</p>
  <p><strong>Problem:</strong> multiple clients need to drive Codex without depending on private runtime internals.</p>
  <p><strong>Mental model:</strong> protocol is the grammar of the product; runtime code is one speaker of that grammar.</p>
</div>

Codex has more than one protocol surface. The core protocol connects clients
to the agent session with submissions and events. The app-server protocol
exposes a JSON-RPC service with client requests, server requests, responses,
and notifications. These protocols overlap in purpose but serve different
audiences.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Submission queue entry | [`Submission`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123) | Wraps an operation with an id and trace context. |
| Core operations | [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | Defines what the session can receive. |
| App-server requests | [`client_request_definitions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L637) | Defines JSON-RPC methods exposed to app clients. |
| App-server notifications | [`server_notification_definitions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | Defines what app clients can observe asynchronously. |

</div>

## Core Protocol vs App-Server Protocol

| Layer | Primary audience | Shape | Example |
| --- | --- | --- | --- |
| Core protocol | Runtime clients inside the Rust system | `Submission { id, op, trace }` and `Event` | `Op::UserInputWithTurnContext`, `Op::ExecApproval`, `EventMsg::TurnComplete` |
| App-server protocol | External clients speaking JSON-RPC | method names, params, responses, notifications | `turn/start`, `item/commandExecution/requestApproval`, `turn/completed` |

The core protocol is close to the agent. It talks about operations such as
user input, interruptions, approvals, dynamic tool responses, MCP refreshes,
review requests, compaction, rollback, and user shell commands. The app-server
protocol is close to clients. It must describe request serialization, method
names, response payloads, notifications, and experimental gates.

## The Queue Pair Pattern

At the core level, Codex uses a submission queue and an event queue. That is
not an incidental implementation detail; it is a product shape. Clients submit
work and independently listen for progress.

<div class="flow">
  <div><strong>Client</strong>Builds an `Op`.</div>
  <div><strong>Submission</strong>Adds id and trace context.</div>
  <div><strong>Session</strong>Consumes queued work.</div>
  <div><strong>Event</strong>Emits typed progress and results.</div>
  <div><strong>Surface</strong>Renders or forwards the event.</div>
</div>

This shape is useful because agent work is not instantaneous. A turn can
stream tokens, ask for approval, run subprocesses, emit partial diffs, call MCP
tools, and be interrupted. A request/response function alone would hide too
much of that lifecycle.

## Protocols as Compatibility Boundaries

Protocols are where compatibility matters most. If an internal helper changes
but the same `Op` and event behavior remain, clients can keep working. If a
protocol variant changes meaning, the blast radius is much larger.

This is why generated schemas in the app-server protocol are important. They
turn Rust type definitions into client-visible contracts. A web client, editor
integration, or test client should not need to import private Rust modules to
know what `turn/start` accepts.

<div class="apply-this">

## Apply This

- Use protocol types to protect clients from private runtime churn.
- Prefer asynchronous event streams when work has progress, approvals, or cancellation.
- Keep core runtime vocabulary separate from external JSON-RPC vocabulary.
- Treat generated schemas as part of the product surface, not just developer convenience.

</div>

## Read the Source Next

- [`Submission`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123):
  inspect the smallest queued unit.
- [`Op::UserInputWithTurnContext`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L445):
  see how a user turn can carry settings with the prompt.
- [`McpServerToolCall`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L843):
  compare app-server method naming with core operations.

<div class="exercise-box">

## Reading Exercise

Pick one action, such as interrupting a turn or approving a command. Find its
core `Op` variant and then find the nearest app-server request or server
request. Write down which layer is closer to the agent and which layer is
closer to the external client.

</div>

<div class="next-step">

## What Comes Next

Now that the messages are clear, the next chapter enters the core session
facade that receives submissions and emits events.

</div>
