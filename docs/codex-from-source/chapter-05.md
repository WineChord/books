# Chapter 5: Session Runtime

The session runtime is where Codex stops being a command parser and becomes
an agent. A session accepts operations, maintains state, runs model turns,
executes tools, and emits events.

## The session facade

The main facade is `Codex` in
[`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366).
Its public methods form a compact mental model:

- `Codex::spawn` creates a configured session.
- `submit` sends work into the session.
- `next_event` reads the next event from the session.

The design is intentionally queue-like. Clients do not call "do everything"
directly. They submit operations and listen for events. That makes interactive
UIs, non-interactive exec, and app-server clients share the same rhythm.

## From thread to turn

In product language, a thread is the ongoing conversation or workspace state.
A turn is one user request inside that thread. The
[`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506)
owns live threads and resume/fork behavior. The session then handles submitted
turns.

The central turn function is
[`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139).
At a high level, it performs this cycle:

<div class="flow">
  <div><strong>Prepare</strong>Collect instructions, history, config, tools, and context.</div>
  <div><strong>Sample</strong>Stream model output through the model client.</div>
  <div><strong>Act</strong>Dispatch requested tool calls.</div>
  <div><strong>Record</strong>Append tool outputs and emit events.</div>
  <div><strong>Repeat</strong>Continue until final response or interruption.</div>
</div>

This is the heart of an agent loop. The model is not called once with a giant
prompt and forgotten. It is part of an iterative runtime that can observe
tool results and continue.

## Model streaming

The model boundary appears in
[`core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305).
`ModelClient` and `ModelClientSession` normalize communication with the
Responses API or WebSocket paths. That normalization is important because the
rest of the runtime wants semantic events: response items, tool calls, deltas,
errors, and completion.

In beginner terms, streaming means the model response arrives in pieces. A UI
can render progress before the whole response is done, and the runtime can
notice tool calls as structured items rather than scraping text.

## Task orchestration

Not every submitted operation is a normal user turn. Codex also supports
review tasks, compaction, and user shell commands. The task layer in
[`core/src/tasks/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tasks/mod.rs#L292)
keeps those workflows under the same session umbrella.

The design lesson is that "agent runtime" should not mean "one huge loop."
Codex splits the loop into submission handling, task selection, turn
execution, model streaming, tool dispatch, and event emission. That lets each
part stay testable and replaceable.

## Failure is part of the runtime

Agent systems must expect failure: network errors, model stream interruptions,
tool denials, sandbox limits, invalid tool arguments, and user interrupts.
Codex models those cases as protocol errors and events rather than merely
printing text. This matters because clients need to respond programmatically:
render an error, retry, ask approval, or stop the turn.

