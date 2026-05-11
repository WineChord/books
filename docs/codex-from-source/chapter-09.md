# Chapter 9: TUI and App Server

The terminal UI is what many users see first, but the app-server architecture
is what makes Codex usable from more than one client. This chapter connects
the visible interface to the headless protocol surface behind it.

## TUI startup

The TUI starts in
[`codex-rs/tui/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710).
It prepares terminal state, connects to the app-server-facing session layer,
and runs the interactive application. The main application state lives in
[`tui/src/app.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app.rs#L590).

Ratatui is useful background here. A terminal UI is not a browser DOM. It
usually maintains application state, receives input events, and repeatedly
draws frames. That model encourages a clean separation between state updates
and rendering.

## App-server as a shared surface

The app server starts in
[`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433).
The request router in
[`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272)
maps JSON-RPC requests into processors for threads, turns, models, plugins,
MCP resources, shell commands, and other operations.

This means the app server is not just for a separate desktop or IDE client.
It is an organizing boundary. Even local flows can share request/notification
shapes instead of each UI inventing a private path into core.

## From server event to screen

<div class="flow">
  <div><strong>Core event</strong>The session emits <code>EventMsg</code>.</div>
  <div><strong>Mapping</strong>App-server maps it to a notification.</div>
  <div><strong>Client</strong>TUI or another client receives it.</div>
  <div><strong>State</strong>The UI updates local view state.</div>
  <div><strong>Frame</strong>Ratatui renders the next terminal frame.</div>
</div>

The mapping layer is important because a good user interface should not expose
every internal implementation detail. It should receive events at the right
semantic level: turn started, command running, approval needed, patch applied,
message complete.

## Why this architecture scales

If Codex had only one terminal UI directly calling core internals, it would be
harder to support IDEs, desktop apps, background automation, or tests that
exercise client behavior. A protocol-oriented app-server boundary lets new
clients reuse the same underlying agent runtime.

That is the final architectural pattern of this book: Codex grows by adding
typed boundaries. CLI boundary. App-server boundary. Core protocol boundary.
Tool boundary. Sandbox boundary. MCP boundary. Each boundary turns an
unbounded problem into a contract that can be tested, reviewed, and evolved.

