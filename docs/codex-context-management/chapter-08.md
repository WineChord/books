# Chapter 8: Client-Facing Context

Chapter 7 showed that the runtime can reconstruct effective context from rollout
evidence. The final layer is exposure. Users and clients need to see context
state: token usage, compaction warnings, realtime mode, thread history, and
replayed usage when attaching to an existing thread. Codex exposes those facts
through the TUI, app-server notifications, realtime context modules, rollout
trace, and telemetry. The key rule remains the same: clients render context;
the runtime owns it.

This separation prevents a UI from becoming an alternate context manager. The
TUI can show remaining context. The app-server can replay token usage. A trace
can explain compaction. But the live history ledger and turn envelope stay in
core.

By the end of this chapter, you should understand the client surfaces as
projections of runtime-owned context state.

<div class="source-equivalence">
This chapter maps to
<a href="https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/token_usage.rs#L1">TUI token usage formatting</a>,
<a href="https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/token_usage_replay.rs#L1">app-server token usage replay</a>,
<a href="https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/compact_remote.rs#L239">remote compaction trace installation</a>,
<a href="https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/context_manager/updates.rs#L89">realtime context updates</a>, and
<a href="https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L474">post-sampling token checks</a>.
</div>

## Token Usage Is a Context Surface

The TUI token usage model separates input, cached input, output, reasoning
output, and total tokens. It also computes a remaining percentage against a
baseline-adjusted context window. That baseline is a display choice, not the
runtime's only budget rule. The core runtime still uses model info and token
usage to trigger compaction.

```mermaid
graph LR
  A[Model usage event] --> B[ContextManager token info]
  B --> C[Core compaction decisions]
  B --> D[TUI token display]
  B --> E[App-server token notification]
  B --> F[Telemetry]
```

The same source fact feeds multiple surfaces. That is what keeps the UI honest.

## App-Server Replay

When a client attaches to an existing thread, the app-server can send a restored
token usage update to that connection. The code treats this as lifecycle replay,
not a fresh model event. It avoids duplicating persisted usage records and avoids
surprising other subscribers with historical updates.

Attribution is careful. If the latest persisted token count has an explicit turn
id that still exists in the rebuilt thread, Codex uses it. If turn ids changed
during reconstruction, it falls back to the active turn position recorded when
the token count appeared.

```text
// Pseudocode — illustrates replay attribution.
owner = findTurnActiveWhenLatestTokenCountWasPersisted(rollout)
if rebuiltThread.hasTurn(owner.id):
    notify(connection, owner.id, usage)
else:
    notify(connection, rebuiltThread.turnAt(owner.position), usage)
```

The pattern is subtle: client replay is connection-scoped because it explains
history to a new observer; it is not a new runtime event.

## Realtime Is Context, Not Just Transport

Realtime state appears in settings update logic. Starting or ending realtime can
emit model-visible guidance. That is correct because realtime changes how the
model should interact, not merely how bytes move. If a voice or realtime client
changes the interaction contract, the model needs context about that mode.

This reinforces Chapter 2's envelope idea: client metadata and realtime flags
belong in the turn context because they alter the runtime contract.

## Trace Gives Compaction Evidence

Remote compaction records an installed checkpoint payload containing input
history and replacement history. That trace boundary is different from the later
inference request. The distinction lets reducers and debuggers represent exactly
what happened: the provider compacted one history, Codex installed another live
history, and future sampling used the updated prompt projection.

Good observability does not just count tokens. It preserves semantic boundaries.

## Apply This

1. **Runtime-Owned Display** -> let clients render context facts but not own them, adapt it by deriving UI state from runtime events, and watch for UI-only context that the model never sees.
2. **Connection-Scoped Replay** -> replay historical context facts only to the attaching observer, adapt it for resumed clients, and watch for replay events that look like new live events.
3. **Attribution Fallback** -> attribute restored usage by id first and position second, adapt it to rebuilt timelines, and watch for regenerated ids breaking UI state.
4. **Mode as Context** -> treat interaction modes as model-visible context when they change behavior, adapt it by diffing mode state, and watch for transport flags hidden from the prompt.
5. **Semantic Trace Boundary** -> trace context rewrites as install events, adapt it by separating compaction input from later sampling input, and watch for observability that collapses distinct phases into one blob.
