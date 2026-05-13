# Chapter 8: Observability and Rollout Trace

Chapter 7 showed how provider and transport differences become a normalized
stream of model events. This chapter follows those events after they enter the
runtime: which facts are persisted for replay, which are reduced into product
analytics, which become operational telemetry, and which are captured as raw
diagnostic evidence for rollout trace.

<div class="chapter-lede">
  <p><strong>Problem:</strong> an agent runtime cannot be debugged from the final assistant message alone.</p>
  <p><strong>Thesis:</strong> Codex observes runtime facts first, then derives replay, analytics, traces, logs, and graph views for different audiences.</p>
  <p><strong>Mental model:</strong> the transcript is one projection of the run, not the run itself.</p>
</div>

## The Observation Planes

Codex has several observability planes because each plane answers a different
question.

| Plane | Primary question | Typical consumer |
| --- | --- | --- |
| Rollout persistence | Can this thread resume, fork, or replay? | runtime and client history reconstruction |
| Rollout trace | What raw evidence explains this run? | local debugging and offline graph viewers |
| Product analytics | Which product events occurred? | product metrics and aggregate analysis |
| OTEL traces and metrics | How did runtime operations perform? | operators and engineering diagnostics |
| Response debug context | Which upstream request failed? | support and failure triage |
| Local state logs | What process-local logs were emitted? | local inspection and feedback bundles |

These planes intentionally overlap. A tool call can be a rollout item, a client
event, an analytics fact, an OTEL span, a trace payload, and a local log line.
The overlap is not duplication if each plane has a distinct retention,
privacy, query, and interpretation model.

## Rollout Persistence Is the Replay Spine

The rollout file is the durable record introduced in Chapter 5. It is written
as ordered items that can reconstruct thread history, session metadata, turn
context, compaction boundaries, rollback behavior, and selected event surfaces.
It is optimized for replay and compatibility, not for arbitrary debugging.

```text
// Pseudocode - illustrative pattern.
function handle_runtime_event(event):
    if event.should_be_persisted_for_replay:
        rollout.append(event.as_rollout_item)

    if event.should_update_thread_projection:
        state_database.apply(event.as_metadata_delta)

    if event.should_notify_client:
        event_stream.emit(event.as_client_event)
```

The replay spine must be conservative. It should preserve what future Codex
versions need to understand a thread, but it should not become an unbounded
dump of every internal byte. For deeper evidence, Codex uses rollout trace.

## Rollout Trace Captures Raw Evidence

Rollout trace is an opt-in diagnostic path. When enabled, runtime code records
ordered raw events and stores larger raw payloads separately. The hot path does
not try to build the final explanation graph while the session is running. It
captures facts and leaves interpretation to an offline reducer.

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-08-01-en.svg" alt="Rollout trace records ordered events and raw payload files from runtime sources, then leaves explanation graphs to an offline reducer." loading="lazy" />
  <figcaption>Rollout trace records ordered events and raw payload files from runtime sources, then leaves explanation graphs to an offline reducer.</figcaption>
</figure>

Raw trace data can include prompts, model responses, tool inputs and outputs,
terminal output, runtime payloads, and paths. It therefore belongs to local
diagnostics, not ordinary telemetry. The value of the design is that raw
payloads remain available when the reduced graph is not enough to explain a
failure.

## Raw Events and Reduced Graphs

The reduced trace graph is not a transcript. It contains semantic objects:
agent threads, Codex turns, model-visible conversation items, inference calls,
tool calls, code cells, terminal operations, compactions, and interaction
edges. Each object can retain references back to raw payloads.

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-08-02-en.svg" alt="The strict reducer turns raw model, runtime, and terminal payloads into separate model-visible items, runtime objects, and causal interaction edges without flattening them into a transcript." loading="lazy" />
  <figcaption>The strict reducer turns raw model, runtime, and terminal payloads into separate model-visible items, runtime objects, and causal interaction edges without flattening them into a transcript.</figcaption>
</figure>

This distinction prevents a common debugging mistake. Runtime output is not
automatically model-visible output. A terminal operation may produce bytes that
appear in a local process log, while the model only sees a summarized tool
result. A nested runtime call may be part of a code-mode execution object,
while the model-visible transcript contains only the surrounding tool boundary.
The trace graph preserves both views without confusing them.

## Reducers Are Strict on Purpose

The reducer replays raw events in order and builds semantic state. It is
strict where consistency matters: referenced payloads must exist, sequence
order must be respected, tool starts and completions must match, terminal
operations must attach to known runtime objects, turns must belong to known
threads, and pending edges must eventually find their source or target.


<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-08-concept-1-en.svg" alt="Strict reduction preserves the principle that Codex observes first, then derives product analytics, operational telemetry, debug context, and local logs for different audiences." loading="lazy" />
  <figcaption>Strict reduction preserves the principle that Codex observes first, then derives product analytics, operational telemetry, debug context, and local logs for different audiences.</figcaption>
</figure>

```text
// Pseudocode - illustrative pattern.
function reduce_trace_bundle(bundle):
    state = empty_graph()
    pending = empty_pending_queue()

    for raw_event in bundle.events_ordered_by_sequence:
        assert_payloads_exist(raw_event.payload_refs)

        if raw_event.references_unknown_object:
            pending.queue(raw_event)
            continue

        object = interpret_raw_event(raw_event)
        state.apply(object)
        pending.flush_items_now_unblocked_by(state)

    if pending.has_unresolved_items:
        raise strict_replay_error(pending.summary)

    write_reduced_state(state)
```

Strict replay errors are useful. They reveal that the capture stream is
internally inconsistent or that the reducer does not yet understand a new
event shape. Silently dropping those facts would make the graph easier to
produce and less trustworthy.

## Analytics Reduces Product Facts

Product analytics has a different goal. It reduces client requests, responses,
notifications, custom runtime facts, app and plugin invocations, compaction
events, Guardian review outcomes, token usage, and turn completion states into
trackable product events.

Analytics should not be the source of replay truth. It can drop events that
lack required context, aggregate values, hash identifiers, and focus on product
questions. Its job is to answer "what happened across many sessions?" rather
than "how do I reconstruct this exact thread?"

## OTEL Observes Runtime Operations

OTEL traces, logs, metrics, and trace-context propagation serve operational
debugging. They can measure request latency, stream polling behavior,
WebSocket events, retry behavior, session-scoped events, counters, histograms,
and exported spans. Trace context can propagate across boundaries so a
submission, model call, and downstream runtime operation remain correlated.


<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-08-concept-2-en.svg" alt="OTEL belongs to the operational plane, where runtime owners track latency, retries, stream behavior, and propagated trace context without turning telemetry into replay truth." loading="lazy" />
  <figcaption>OTEL belongs to the operational plane, where runtime owners track latency, retries, stream behavior, and propagated trace context without turning telemetry into replay truth.</figcaption>
</figure>

This plane is about performance and reliability. It should not be treated as
the durable transcript, and it should not require the product analytics model
to explain low-level runtime behavior.

## Response Debug Context and Local Logs

Response debug context extracts identity from upstream API failures, such as
request identifiers and status details. This is intentionally small and
support-oriented: it helps connect a user-visible failure to an upstream
request without exposing the entire runtime trace.

Local state logs capture process logs into a database-backed sink with bounded
queues and batch insertion. They support local inspection and feedback flows.
Like OTEL, logs are operational evidence; they are not the replay spine.

## Observe First, Interpret Later

The transferable architecture is the separation between capture and meaning.
Hot-path code records durable or raw facts with stable identifiers. Reducers
and projections interpret those facts for a particular audience. If a new UI
needs a graph, it should reduce from trace evidence. If a thread list needs a
title, it should read or repair a metadata projection. If a product metric
needs turn completion status, it should reduce analytics facts. No single
transcript should carry all of those responsibilities.

<div class="apply-this">

## Apply This

1. Capture raw or replayable facts before deriving summaries, graphs, or aggregate metrics.
2. Keep replay persistence separate from diagnostic tracing so durable threads do not become unbounded debug dumps.
3. Make reducers strict where evidence must be self-consistent, and let failures reveal missing event semantics.
4. Split observability by audience: replay, local debugging, product analytics, operations, support, and logs.
5. Preserve raw payload references behind reduced objects so explanations can return to original evidence.

</div>

## Closing

Part II has built the runtime core: durable threads, live sessions, the turn
loop, provider streams, backend boundaries, and observation planes. The next
part moves from scheduling and evidence to side effects: how Codex exposes
tools, executes shell commands, applies patches, asks for approval, and
contains risk.

<div class="source-equivalence">

## Source Map

| Concept | Source anchor |
| --- | --- |
| Trace session model | [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L33) |
| Codex turn trace model | [`codex-rs/rollout-trace/src/model/session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/model/session.rs#L104) |
| Runtime trace payloads | [`codex-rs/rollout-trace/src/protocol_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src/protocol_event.rs#L32) |
| Core event mapping | [`codex-rs/core/src/event_mapping.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/event_mapping.rs#L1) |

</div>
