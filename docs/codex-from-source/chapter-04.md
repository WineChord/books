# Chapter 4: Protocol

A large agent application needs a shared vocabulary. Without one, every layer
would pass loosely structured strings and JSON blobs. Codex instead defines
typed messages for the core loop and typed JSON-RPC messages for app-server
clients.

## Internal operations and events

The core protocol lives in
[`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403).
The key types are:

- `Op`: an operation submitted to a session.
- `Submission`: a submitted operation with metadata.
- `Event`: an emitted runtime event.
- `EventMsg`: the actual event payload.

This gives Codex a half-duplex rhythm: clients submit operations, and the
session emits events.

<div class="flow">
  <div><strong>Submit</strong><code>Op::UserInput</code> or another operation enters.</div>
  <div><strong>Run</strong>The session advances the turn or task.</div>
  <div><strong>Emit</strong><code>EventMsg</code> reports progress or requests action.</div>
  <div><strong>React</strong>The client renders, approves, interrupts, or steers.</div>
</div>

For a beginner, the important insight is that protocols make asynchronous
systems understandable. A user interface does not need to know every internal
field of the model client. It only needs to understand the events it may
receive and the operations it may send.

## App-server protocol

Codex also exposes a typed app-server protocol in
[`app-server-protocol/src/protocol/common.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L178).
The two central concepts are `ClientRequest` and `ServerNotification`.

This protocol is wider than the core protocol because it is an external API
surface. It must describe thread creation, turn start, thread read, model
listing, MCP resources, plugin installation, permission requests, and many
other client-visible workflows.

Thread and turn request shapes are defined in v2 modules such as
[`thread.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/thread.rs#L95)
and
[`turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/v2/turn.rs#L49).
That separation matters: app clients see stable request and notification
types, while the core can still maintain its own runtime vocabulary.

## Why two protocols?

It may seem redundant to have both app-server messages and core session
messages. The split is useful because they face different audiences.

The app-server protocol is a product boundary. It speaks to clients and must
be stable, serialized, and versioned carefully. The core protocol is a runtime
boundary. It speaks inside the application and can focus on operations the
session actually knows how to perform.

This is like a restaurant. The menu is the app-server protocol: public,
organized for customers, and stable. The kitchen tickets are the core
protocol: precise instructions for the team doing the work.

## Protocols as documentation

Protocol files are some of the best documentation in a source tree. They tell
you what the system believes can happen. In Codex, event variants reveal that
the system expects streaming model output, tool calls, approvals, errors,
thread state changes, turn lifecycle transitions, and persisted history.

When you read a new Codex feature, ask which protocol type changed. If no
boundary type changed, the feature is probably internal. If a request or event
changed, the feature affects clients.

