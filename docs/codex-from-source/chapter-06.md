# Chapter 6: Turn Loop and Streaming

<div class="chapter-lede">
  <p><strong>You are here:</strong> a session has accepted user work and now must make progress.</p>
  <p><strong>Problem:</strong> agent work is iterative: model output, tools, observations, pending user input, hooks, and compaction can all affect the next step.</p>
  <p><strong>Mental model:</strong> a turn is a control loop, not a single API call.</p>
</div>

The turn loop is the heartbeat of Codex. It prepares the model request,
streams model output, dispatches tools, records new observations, handles
pending input, runs hooks, checks token budgets, compacts context when needed,
and stops only when the runtime has a clear reason to stop.

<TurnLoopStepper />

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Turn entry | [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) | Main loop for one user-facing unit of work. |
| Skill collection | [`collect_explicit_skill_mentions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L222) | Shows how turn input can activate skill instructions. |
| Plugin/app inventory | [`list_all_tools`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L184) | Connects app/plugin mentions to MCP tool inventory. |
| Sampling request | [`run_sampling_request`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L453) | The point where recorded history becomes model interaction. |

</div>

## A Guided Walk Through `run_turn`

The top of `run_turn` rejects empty work unless pending input exists. Then it
prepares a `ModelClientSession`, checks whether pre-sampling compaction is
needed, records context updates, loads plugin capability summaries, lists MCP
tools when app or plugin mentions require them, collects explicit skill
mentions, and resolves skill dependencies.

That sounds like a lot, but it is all preparation. Before the model is called,
Codex decides what context and capabilities are legitimately part of this
turn.

| Phase | Source behavior | Design reason |
| --- | --- | --- |
| Pre-compact | shrink context before sampling when needed | avoid starting a turn already over budget |
| Context recording | write turn context and user prompt into history | make the model request reproducible from recorded items |
| Skills/plugins | turn explicit mentions into injected context | keep extensions turn-scoped and visible |
| Hooks | allow configured pre-submit or session-start behavior | let policy and extension points act before model sampling |
| Sampling | build `ResponseItem` input from history | keep model input derived from a single recorded history model |
| Follow-up | continue when tools, pending input, or compaction require it | make acting and observing iterative |

## Streaming Changes the Product

Streaming is not only a UI optimization. It changes the runtime contract.
When model output arrives incrementally, Codex can show progress, identify
structured items, accumulate tool arguments, and dispatch tool calls without
treating the response as one blob of text.

For beginners: a non-streaming model call is like receiving a completed letter.
A streaming call is like watching the letter being written, with structured
sections arriving along the way. Codex needs the second shape because tools,
progress, cancellation, and UI updates are all part of the product.

## Compaction Is a Runtime Decision

Agent conversations can exceed context limits. Codex checks token usage after
sampling and can run auto-compaction when the model still needs follow-up work.
This is another reason the turn loop is not a simple function. It must decide
whether to continue with the same context, compact and retry, drain pending
input, or stop.

## Stop Hooks and After-Agent Hooks

Stopping is also a process. Before a completed turn becomes final, Codex runs
stop hooks and after-agent hooks. A hook can request continuation, block, or
fail in ways the runtime must report. This makes lifecycle hooks part of the
turn protocol rather than an afterthought bolted onto the UI.

<div class="apply-this">

## Apply This

- Treat a user turn as the unit that owns context, tools, hooks, and token budget.
- Keep model input derived from recorded history, not ad hoc strings.
- Make extension injection explicit and turn-scoped.
- Build continuation logic around clear reasons: tool follow-up, pending input, compaction, or hooks.

</div>

## Read the Source Next

- [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139):
  mark preparation, sampling, and follow-up sections.
- [`run_auto_compact`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L494):
  inspect the mid-turn context-limit branch.
- [`ModelClientSession`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305):
  look for how model communication is normalized for the runtime.

<div class="exercise-box">

## Reading Exercise

Open `run_turn` and write down every place where the loop can stop, continue,
or return `None`. For each branch, decide whether the reason is user input,
hooks, token budget, model output, or failure.

</div>

<div class="next-step">

## What Comes Next

The turn loop can ask for tools, but tool execution has its own contract. The
next chapter studies how tools are registered, routed, run in parallel or
serially, and converted back into model-visible output.

</div>
