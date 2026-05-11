# Chapter 12: TUI and App Server

<div class="chapter-lede">
  <p><strong>You are here:</strong> the runtime can produce events, and users need to see or consume them.</p>
  <p><strong>Problem:</strong> modern Codex clients need a rich terminal experience and a JSON-RPC app-server boundary without duplicating the agent runtime.</p>
  <p><strong>Mental model:</strong> the app-server adapts core session events; the TUI is one serious client of that app-server-shaped protocol.</p>
</div>

The stale mental model is "TUI and app-server are two peer consumers of core
events." The source-centered model is sharper: the app-server is the typed
client boundary that adapts core session operations and events, and the TUI
uses an app-server session path for much of its modern interaction. That still
requires terminal-specific UI state, but it means the terminal and external
clients share a protocol-shaped runtime boundary.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| TUI chat surface | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | Module comments summarize event consumption, active cells, overlays, and bottom-pane state. |
| TUI app-server session | [`app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L1) | Shows the TUI using app-server protocol machinery. |
| App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | Routes JSON-RPC requests across thread, turn, catalog, plugin, app, MCP, sandbox, and account processors. |
| Turn processor | [`turn_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/turn_processor.rs#L315) | Translates app-server turn requests into core session operations. |
| Server requests | [`ServerRequest`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1277) | Defines approval, user input, MCP elicitation, permission, and dynamic tool requests sent to clients. |
| Notifications | [`ServerNotification`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440) | Defines the stream of observable client updates. |

</div>

## TUI: Event Stream to Screen

The `ChatWidget` module comments are unusually useful. They explain committed
transcript cells, an in-flight active cell, transcript overlay behavior, a
bottom-pane task-running indicator, preamble handling, slash command staging,
and MCP startup state.

For a beginner, the key idea is: the TUI does not own the agent loop. It
consumes events and maintains presentation state. It decides how to render
streaming output, approvals, diffs, status, overlays, and input, but the
session runtime remains the source of truth for turn progress.

Modern TUI flow is closer to:

<div class="flow">
  <div><strong>ChatWidget/AppCommand</strong>User input or UI command.</div>
  <div><strong>AppServerSession</strong>TUI-side client boundary.</div>
  <div><strong>ClientRequest</strong>`turn/start` or related JSON-RPC method.</div>
  <div><strong>Turn processor</strong>Converts request to core operation.</div>
  <div><strong>Core session</strong>Runs turn and emits `EventMsg` values.</div>
  <div><strong>Event adapter</strong>Maps core events into server notifications or requests.</div>
  <div><strong>TUI rendering</strong>Updates terminal presentation state.</div>
</div>

## App-Server: Event Stream to JSON-RPC

The app-server receives JSON-RPC requests and routes them to processors. The
large match in `message_processor.rs` is not glamorous, but it is a map of the
external product surface: threads, turns, skills, hooks, marketplace, plugins,
apps, models, experimental features, MCP, Windows sandbox setup, account state,
remote control, and more.

| Request family | What it exposes |
| --- | --- |
| thread and turn | create, read, steer, interrupt, compact, rollback, shell command, review |
| catalog | skills, hooks, models, collaboration modes, experimental features |
| plugin and marketplace | install, remove, list, read, share, skill read |
| apps and MCP | app lists, MCP status, resource reads, OAuth, server tool calls |
| approval and dynamic tools | server requests that ask clients to decide or execute |

This shape lets a non-terminal client build its own UI without duplicating the
core runtime.

## App-Server Protocol Details

The app-server protocol has three major directions:

| Direction | Examples | Meaning |
| --- | --- | --- |
| `ClientRequest` | thread start/resume/fork, turn start/interrupt, config writes, account queries, MCP/resource/app/plugin calls | client asks the server to do or report something |
| `ServerRequest` | command approval, patch approval, permission request, user input request, MCP elicitation, auth refresh, dynamic tool execution | server needs the client or user to decide/provide something |
| `ServerNotification` | thread status, turn started/completed, item updates, command output, turn diff, token usage, compaction | server broadcasts observable state |

Requests also have serialization scopes. Some are global; some are tied to a
thread; some can be scoped by thread or file path. Experimental capability
gates, initialization state, notification settings, auth, origin checks, and
backpressure errors are part of the boundary.

## Why Presentation State Still Matters

Even with a strong core protocol, surfaces are real engineering work. A TUI
has terminal dimensions, frame rendering, key events, overlays, and live
streaming cells. An app-server has request ids, serialization scope, schema
generation, client-specific responses, and notifications. The shared runtime
does not eliminate presentation complexity; it keeps that complexity from
leaking back into the agent loop.

## The End-to-End Path

The recurring scenario now reaches the user:

<div class="flow">
  <div><strong>Core event</strong>The session emits progress, output, approval, diff, or completion.</div>
  <div><strong>App-server adapter</strong>Maps core event into notification or bidirectional server request.</div>
  <div><strong>User decision</strong>The user can approve, deny, interrupt, steer, or inspect evidence.</div>
  <div><strong>Protocol response</strong>The decision flows back as typed input.</div>
  <div><strong>Turn continues</strong>The runtime resumes with the new observation or decision.</div>
</div>

That is the full loop: not model-only, not UI-only, but a typed conversation
between user, runtime, tools, and surfaces.

<div class="trace-ledger">

## Trace Ledger

| Question | Chapter 12 answer |
| --- | --- |
| Where is the user request now? | It has crossed a client surface, often through the app-server protocol, and returned as notifications or server requests. |
| What carries it? | `ClientRequest`, request processors, core `Op`/`EventMsg`, bespoke event mapping, `ServerRequest`, and `ServerNotification`. |
| Who decides next? | app-server processors, core session, client/TUI state, or the user responding to a server request. |
| What can fail here? | initialization gate, auth/origin check, experimental capability gate, backpressure, invalid scope, dropped client, UI replay mismatch, or unresolved bidirectional request. |

</div>

<div class="apply-this">

## Apply This

- Keep the agent loop independent from terminal rendering.
- Let external clients consume structured notifications instead of terminal text.
- Treat UI state as derived from protocol events wherever possible.
- Design approval and dynamic tool requests as bidirectional protocol flows.

</div>

## Read the Source Next

- [`ChatWidget` module docs](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1):
  read the comments before reading methods.
- [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000):
  group JSON-RPC request families.
- [`ServerNotification`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L1440):
  inspect what external clients can observe.

<div class="exercise-box">

## Self-Check

Answer without opening source: why is app-server not just a thin adapter?
Explain the path from a TUI command to `turn/start`, then back from core
`EventMsg` to a TUI-visible update.

</div>

<div class="exercise-box">

## Optional Source Lab

Pick one runtime event such as command output, file-change approval, MCP
status, or turn completion. Trace how the TUI might render it and how the
app-server might notify an external client. What information must remain
structured for both surfaces to work?

</div>

<div class="next-step">

## Closing

You have now followed the core path: entry, protocol, session, turn, tools,
patches, approvals, sandboxes, extensions, and user surfaces. Use the
[Pattern Index](patterns) when you want transferable design lessons, and use
the [Source Atlas](source-atlas) when you want the fastest route back to code.

</div>
