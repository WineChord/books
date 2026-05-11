# Chapter 5: Session Facade

<div class="chapter-lede">
  <p><strong>You are here:</strong> protocol messages now need a living runtime.</p>
  <p><strong>Problem:</strong> clients need a small interface, while the runtime needs configuration, history, models, tools, skills, plugins, MCP, and telemetry.</p>
  <p><strong>Mental model:</strong> `Codex` is the front desk; `Session` is the building behind it.</p>
</div>

The session facade is where Codex stops being command parsing and becomes an
agent runtime. A client should not need to know how models are selected, how
skills are loaded, how MCP managers are wired, or how conversation history is
stored. It needs to submit work and receive events.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| `Codex` facade | [`session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | Shows the small public shape: submission sender, event receiver, status, and session. |
| Spawn arguments | [`CodexSpawnArgs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L386) | Reveals what the runtime must know before it starts. |
| Bootstrap body | [`spawn_internal`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449) | Wires config, skills, plugins, MCP, model selection, history, and session services. |
| Submit API | [`submit_with_trace`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L693) | Converts an operation into a queued submission with a generated id. |

</div>

## The Facade Shape

`Codex` is intentionally compact. Its fields show the architecture:

| Field idea | Meaning |
| --- | --- |
| submission sender | clients push `Submission` values into the runtime |
| event receiver | clients pull `Event` values out of the runtime |
| status receiver | observers can watch high-level agent state |
| session reference | internal services and state live behind the facade |
| termination future | callers can wait for the background loop to end |

This shape is more important than any single helper. Codex is a queue-pair
runtime: submit operations on one side, observe events on the other.

## Bootstrap Is Where Dependencies Become a Runtime

`CodexSpawnArgs` is long because the runtime is real. It needs an auth manager,
model manager, environment manager, skills manager, plugins manager, MCP
manager, extension registry, thread store, conversation history, dynamic tools,
telemetry, and more. The length is not automatically bad. It is evidence that
the facade hides a large composition root.

Inside `spawn_internal`, several important decisions happen:

| Bootstrap step | Why it matters |
| --- | --- |
| Load plugins and skills | Determines turn-visible guidance and extension capability. |
| Resolve `AGENTS.md` instructions | Adds repository or user instructions before turns run. |
| Load exec policy | Establishes command approval and policy behavior early. |
| Choose model and base instructions | Makes the session's model contract explicit. |
| Build `SessionConfiguration` | Converts many inputs into one runtime configuration object. |
| Spawn submission loop | Starts the background task that consumes operations. |

Beginners often skip bootstrap code because it looks like plumbing. In agent
systems, plumbing is architecture. It decides which dependencies are session
scoped, which are inherited by subagents, which are refreshed online, and which
are frozen into the turn context.

## Session, Thread, and Turn

Three words recur throughout Codex:

- A **session** is a running runtime instance with services, configuration,
  queues, and status.
- A **thread** is the conversation/workspace continuity that can be created,
  resumed, forked, listed, or rolled back.
- A **turn** is one unit of user work inside that thread.

Do not collapse these into one idea. A session can serve a thread; a thread
contains turns; a turn may perform many model/tool cycles.

## Failure Belongs in the Runtime

The facade also makes failures programmable. Submissions have ids. Events can
describe errors, warnings, approvals, token usage, MCP startup, model reroutes,
and turn completion. This is better than printing unstructured text because
clients can respond: render an error, show an approval prompt, retry, stop the
turn, or preserve the transcript.

<div class="apply-this">

## Apply This

- Give clients a small facade even when the runtime is large.
- Treat bootstrap code as architectural evidence.
- Keep session, thread, and turn separate in your vocabulary.
- Emit structured events for failures instead of burying them in logs.

</div>

## Read the Source Next

- [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364):
  read the fields as an architecture summary.
- [`spawn_internal`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L449):
  trace which dependencies are loaded before the session exists.
- [`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506):
  inspect how live thread behavior sits above sessions.

<div class="exercise-box">

## Reading Exercise

Read `CodexSpawnArgs` and group its fields into five buckets: configuration,
identity/auth, external capability, storage/history, and runtime services.
Then compare your buckets with the bootstrap table above.

</div>

<div class="next-step">

## What Comes Next

The facade accepts work, but the agent behavior lives inside a turn. The next
chapter follows `run_turn`, the loop that prepares context, samples the model,
handles tools, and decides whether to continue.

</div>
