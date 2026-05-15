# Research Notes: Terminal UI and Rendering

Scope: `codex-rs/tui`, `codex-rs/ansi-escape`, `codex-rs/terminal-detection`, `codex-rs/feedback`, `codex-rs/code-mode`, `codex-rs/debug-client`, and `codex-rs/async-utils`.

## Module Boundaries

- `tui` is the main terminal application: startup, app-server wiring, terminal
  control, event loop, chat surface, footer, transcript, overlays,
  notifications, and settings UI.
- `tui/src/tui*` and `custom_terminal` own raw mode, inline viewport, frame
  scheduling, event stream, keyboard enhancement, resize, and buffer diffing.
- `app*` owns orchestration: app-server sessions, active thread routing, app
  events, background work, resize reflow, transcript storage, and global keys.
- `chatwidget*` turns protocol notifications into history cells, active cells,
  stream controllers, status surfaces, and outbound commands.
- `bottom_pane*` owns composer, slash/file/skill/app mentions, approvals,
  popups, feedback, pending input preview, and modal views.
- History, markdown, rendering, streaming, and exec cells are the display core.
- Support crates isolate ANSI conversion, terminal detection, feedback capture,
  cancellation helpers, code-mode JavaScript runtime, and protocol debugging.

## Key Abstractions

- `AppEvent` is the internal UI bus.
- `AppCommand` is the typed outbound command set.
- `AppServerSession` is the JSON-RPC facade.
- `ChatWidget` owns conversation state, turn lifecycle, active cells, stream
  controllers, bottom pane, status, queues, and protocol handling.
- `BottomPane`, `BottomPaneView`, and composer separate persistent input from
  transient modal state.
- `HistoryCell` is the transcript rendering unit.
- `Renderable` is a local layout abstraction over ratatui widgets.
- Stream controllers split stable committed lines from mutable live tails.
- Feedback owns a full-fidelity in-memory log buffer and upload options.
- Code mode coordinates V8 sessions, stored values, nested tool calls, and
  long-running waits.

## Data Flow

1. Startup loads config/auth/app-server bootstrap, initializes terminal, loads
   account/model state, creates or resumes a thread, then enters `App` loop.
2. The main loop selects across app events, active-thread events, terminal
   events, and app-server events.
3. User input flows through global key handling, chat widget, bottom pane, and
   composer or an active modal view.
4. Submitted text, images, and mentions become structured user input, then an
   app command, then app-server notifications.
5. Protocol events become history cells or active cells.
6. Completed cells are stored and written into terminal scrollback.
7. Active cells and bottom pane redraw inside the live viewport.
8. Streaming deltas accumulate as markdown source, render at current width,
   drain gradually into committed history, then consolidate into source-backed
   cells.
9. Approvals and elicitations enter per-thread queues and interruptible modal
   state, then return responses to app-server.
10. Code-mode tool calls run through V8 and route nested calls back through host
    callbacks.

## Design Patterns and Rationale

- The TUI is actor-like: typed events and channels connect stateful components.
- Rendering is source-backed where possible so resize reflow can rebuild
  correct wrapping and tables.
- In-flight UI is separate from committed transcript state.
- Rich display and raw copy-friendly render modes coexist.
- Terminal behavior is capability-driven: keyboard enhancement, tmux handling,
  palette, focus, notifications, and inline viewport logic adapt to environment.
- Markdown rendering favors stable readable output over decoration.
- Support crates keep external-interface complexity out of the main TUI.

## Integration Points

- App-server v2 is the main backend boundary.
- Crossterm provides terminal events/control; ratatui provides widget buffers.
- Custom terminal behavior replaces stock assumptions where inline scrollback
  needs finer control.
- Terminal detection feeds user-agent metadata, keyboard behavior, and
  workarounds.
- Feedback integrates diagnostics and structured tags.
- Code mode integrates with model-visible tools and nested host execution.
- TUI touches IDE context, file search, clipboard/image paste, desktop
  notifications, plugins, skills, hooks, marketplace, and status rendering.

## Surprising Decisions

- The main TUI is inline by default, not a full alternate-screen app.
- Real terminal scrollback is part of product behavior.
- The crossterm event stream is dropped and recreated around external-editor
  use to avoid stdin ownership conflicts.
- Streaming markdown commits only newline-complete source; incomplete content
  remains mutable.
- Markdown tables are held back in the live tail because later rows can change
  earlier column widths.
- Feedback capture keeps a log buffer independent of normal logging filters.
- Code mode uses a fresh V8 isolate per execution while preserving host-managed
  session state.

## Book Implications

- Explain TUI as layered systems: terminal substrate, app orchestration, chat
  controller, bottom pane, transcript cells, render pipeline, support crates.
- Do not present it as a standard ratatui app.
- Give one diagram showing four event sources entering the app loop and
  splitting into commands, transcript mutation, and frame requests.
- Give streaming its own section.
- Teach approvals as interruptible modal state layered over the composer.
