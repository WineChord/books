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

## The Turn State Machine

For source-equivalent understanding, read `run_turn` as a state machine:

| State | Entry condition | Exit condition |
| --- | --- | --- |
| Empty-input guard | no user input and no pending continuation | return without starting fake work |
| Pre-sampling compaction | token pressure exists before the model call | compact, reset baseline, or fail visibly |
| Context baseline update | new user/context items entered the turn | history and rollout know what changed |
| Extension preparation | apps, plugins, MCP tools, or skills are mentioned or configured | tools/instructions are injected for this turn only |
| Dependency prompts | a skill or extension requires unavailable capability | prompt, install, skip, or continue with reduced context |
| User-prompt hooks | policy wants to inspect input before sampling | continue, block, or report hook failure |
| Sampling | history and active context become a model request | stream events, tool calls, errors, or final text |
| Tool follow-up | model emitted tool calls or dynamic requests | dispatch tools, collect observations, decide whether to sample again |
| Pending input drain | input arrived while the turn was active | requeue, attach, or block so input is not lost |
| Mid-turn compaction | follow-up is needed but context is too large | compact and continue with a reset model client |
| Stop hooks | model appears done | allow completion, request continuation, or report hook failure |
| After-agent hooks | turn is about to settle | run cleanup or policy reactions before completion |

This table is the practical replacement for reading the whole function. The
important lesson is that each phase has its own owner and failure behavior.

## Streaming Changes the Product

Streaming is not only a UI optimization. It changes the runtime contract.
When model output arrives incrementally, Codex can show progress, identify
structured items, accumulate tool arguments, and dispatch tool calls without
treating the response as one blob of text.

For beginners: a non-streaming model call is like receiving a completed letter.
A streaming call is like watching the letter being written, with structured
sections arriving along the way. Codex needs the second shape because tools,
progress, cancellation, and UI updates are all part of the product.

Under the hood, streaming has its own pipeline:

| Piece | Role |
| --- | --- |
| model client session | normalizes communication with the selected provider |
| transport choice | WebSocket may be preferred, but HTTPS-style streaming remains a fallback path |
| retry/recovery | authentication, disconnect, overload, and retryable stream errors are not all handled the same way |
| response-event mapping | provider events become runtime items, message deltas, reasoning deltas, tool calls, and stream errors |
| dropped consumer handling | when the receiver goes away, stream and tool work must be cancelled rather than leaked |

This is why "streaming" belongs in runtime architecture, not only UI
architecture.

## Compaction Is a Runtime Decision

Agent conversations can exceed context limits. Codex checks token usage after
sampling and can run auto-compaction when the model still needs follow-up work.
This is another reason the turn loop is not a simple function. It must decide
whether to continue with the same context, compact and retry, drain pending
input, or stop.

There are several compaction shapes:

| Shape | Meaning |
| --- | --- |
| manual compaction | user or client explicitly asks to compress thread history |
| pre-turn compaction | context is already too large before sampling starts |
| mid-turn compaction | the model still needs follow-up, but the current context cannot fit |
| model-downshift compaction | runtime changes model/session behavior after compaction constraints |
| remote compaction | compaction is delegated to a remote service path when configured |
| baseline reset | compacted history replaces prior context and requires reinjection accounting |

Compaction is therefore history surgery plus model-session management, not a
generic summary helper.

## Stop Hooks and After-Agent Hooks

Stopping is also a process. Before a completed turn becomes final, Codex runs
stop hooks and after-agent hooks. A hook can request continuation, block, or
fail in ways the runtime must report. This makes lifecycle hooks part of the
turn protocol rather than an afterthought bolted onto the UI.

## Cancellation and Error Exits

Cancellation happens at several layers: the model stream can be dropped, tool
futures can be aborted, exec sessions can time out, dynamic tools can be
cancelled by the client surface, Guardian review can time out, and pending
input can be drained or requeued. The turn loop must report a final outcome
only after it has made those in-flight paths safe.

| Exit | How to think about it |
| --- | --- |
| model stream error | may retry, refresh auth, or emit a structured stream error |
| tool cancellation | should return an aborted tool result when the model can use it |
| hook failure | may block, continue, or request another model step depending on hook kind |
| fatal runtime error | ends the task because continuing would corrupt state or mislead clients |
| user interrupt | aborts current work without necessarily destroying background terminal processes |

<div class="trace-ledger">

## Trace Ledger

| Question | Chapter 6 answer |
| --- | --- |
| Where is the user request now? | It is inside a running turn state machine. |
| What carries it? | recorded history, turn context, model client session, response items, tool futures, and pending-input queues. |
| Who decides next? | `run_turn` decides whether to sample, dispatch tools, compact, run hooks, continue, abort, or complete. |
| What can fail here? | stream transport, authentication, token budget, hook behavior, tool futures, pending input handling, compaction, and cancellation cleanup. |

</div>

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

## Self-Check

Answer without opening source: why can a turn need to sample the model more
than once? Name at least four reasons a turn can continue, stop, compact, or
abort.

</div>

<div class="exercise-box">

## Optional Source Lab

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
