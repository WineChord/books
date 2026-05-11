# Chapter 12: TUI and App Server

<div class="chapter-lede">
  <p><strong>You are here:</strong> the runtime can produce events, and users need to see or consume them.</p>
  <p><strong>Problem:</strong> an interactive terminal and a headless app-server need different presentation layers without forking the agent runtime.</p>
  <p><strong>Mental model:</strong> core events are the river; the TUI and app-server are two channels built from it.</p>
</div>

The TUI and app-server are not afterthoughts. They are proof that the runtime
boundary is doing useful work. If the core only printed text, an external app
would have to scrape terminal output. If the core only served JSON-RPC, a
terminal user would lose a rich local interaction model. Codex supports both
by making runtime progress structured.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| TUI chat surface | [`chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L1) | Module comments summarize event consumption, active cells, overlays, and bottom-pane state. |
| App-server routing | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1000) | Routes JSON-RPC requests across thread, turn, catalog, plugin, app, MCP, sandbox, and account processors. |
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
  <div><strong>Core event</strong>The runtime emits progress, output, approval, diff, or completion.</div>
  <div><strong>Surface adapter</strong>TUI or app-server converts it into local presentation state.</div>
  <div><strong>User decision</strong>The user can approve, deny, interrupt, steer, or inspect evidence.</div>
  <div><strong>Protocol response</strong>The decision flows back as typed input.</div>
  <div><strong>Turn continues</strong>The runtime resumes with the new observation or decision.</div>
</div>

That is the full loop: not model-only, not UI-only, but a typed conversation
between user, runtime, tools, and surfaces.

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

## Reading Exercise

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
