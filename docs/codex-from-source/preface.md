# Reading Codex From Source

> **Reading Contract:** The question is not "which file should I open first?"
> The question is how one coding-agent request becomes typed local software:
> intent enters, a turn is scheduled, model output becomes events, side effects
> cross policy, and clients receive evidence. After this article, you should be
> able to separate source-backed runtime facts from product or backend inference.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-contract.webp" alt="Reading contract that separates narrative model, pinned source evidence, claim class, and reader audit path" loading="eager" decoding="async" />
  <figcaption>The reading contract is the article's guardrail: prose carries the model, pinned source anchors carry audit evidence, and private backend behavior stays outside the claim boundary.</figcaption>
</figure>

Open the public [OpenAI Codex repository](https://github.com/openai/codex) and it is tempting to read it as a directory problem. There is a CLI, a terminal UI, a protocol crate, a core runtime, model streaming code, tool dispatch, patch application, sandboxing, approval paths, MCP support, skill and plugin loading, app-server transports, SDKs, and release governance. The tree is real, but the tree is not the architecture.

The practical pressure is sharper than "there are many files." Codex is a local agent that can inspect a workspace, run commands, edit files, and report evidence. A reader therefore needs to know where intent stops being text, where it becomes a typed operation, where model output is allowed to request a side effect, where policy can deny that request, and where durable facts remain after the interface has moved on. If those owners blur together, source reading turns into either trivia or overconfident speculation about private systems.

The thesis of this article is simple: **Codex becomes legible when you read it as a set of typed boundaries around an LLM-powered turn.** The smallest visible contract is not a prompt. It is a queue pair: callers submit operations, and the runtime emits correlated events. The rest of the architecture expands that contract through context, tools, approvals, sandboxing, client surfaces, extensions, memory, cloud task boundaries, and governance.

The source snapshot used here is [`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3). Source links are pinned to that commit so an explanation written today can still be audited after `main` has moved.

## The Pressure: A File Tree Is Not A Runtime

The first source-reading trap is to start with file names and infer architecture from nouns: `cli`, `core`, `protocol`, `tui`, `mcp`, `exec`, `app-server`. Those names are useful only after you know which boundary each one protects. A protocol type is not important because it lives in a protocol crate; it is important because other subsystems must speak through it instead of sharing private implementation detail.

The second trap is to treat public source as a window into every product behavior. The repository can show local runtime structure, typed requests, event surfaces, model-stream handling, local tool execution, approval and sandbox boundaries, persistence records, generated schemas, and release checks. It cannot prove model weights, hosted scheduling, private backend topology, internal safety systems, or every cloud product decision. Those may shape the product, but they are not visible as implementation facts in this source snapshot.

The third trap is to reduce an agent to "a prompt plus tools." That description misses the hard part. A useful coding agent must keep intent, authority, side effects, observations, transcript state, client projections, and audit evidence from collapsing into one mutable blob. Codex is worth reading because its public source exposes those separations.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/bounded-agent-os-map-df64b03.webp" alt="Bounded agent operating-system map separating client surfaces, typed protocol, session runtime, authority gates, sandboxing, and rollout evidence" loading="lazy" decoding="async" />
  <figcaption>Read Codex as a bounded operating environment: clients submit intent, the runtime owns the turn, authority gates side effects, and durable evidence outlives any one UI.</figcaption>
</figure>

## The Thesis: Follow The Turn

The recurring scenario is deliberately ordinary:

> A user asks Codex to modify code. Codex reasons about the workspace, calls
> tools, receives observations, asks for permission when policy requires it,
> applies a patch, and reports the result.

That path is better than a file tree because every layer must answer the same questions:

1. Where is the user request now?
2. Which typed value carries it?
3. Who owns the next decision?
4. What can fail, be denied, retried, cancelled, or persisted here?
5. Which part of the pattern transfers to another agent runtime?

In source-reading terms, the loop is:

1. **Intent** enters through a CLI command, TUI action, SDK call, app-server request, or nested agent instruction.
2. **Protocol** turns that intent into an operation or transport message.
3. **Runtime** schedules a governed turn with context, configuration, model selection, and policy.
4. **Model stream** produces assistant items, tool calls, control signals, and errors.
5. **Side effects** cross tool routing, sandbox, approval, hook, patch, or filesystem boundaries.
6. **Evidence** returns as events, transcript items, diffs, rollout state, logs, or client-visible output.

The central reading move is to keep those owners separate. The TUI is not the owner of truth just because a user sees it. A tool result is not automatically a durable audit record just because it was printed. A model-visible request is not the same thing as a local transcript. A source link is not a license to claim private backend behavior.

## The Smallest Mechanism: Submission In, Event Out

At the pinned commit, the request envelope in [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123-L133) is small enough to quote in full:

```rust
/// Submission Queue Entry - requests from user
#[derive(Debug, Clone, Deserialize, Serialize, JsonSchema)]
pub struct Submission {
    /// Unique id for this Submission to correlate with Events
    pub id: String,
    /// Payload
    pub op: Op,
    /// Optional W3C trace carrier propagated across async submission handoffs.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub trace: Option<W3cTraceContext>,
}
```

The response envelope in the same file is just as compact. [`Event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1247-L1254) carries the correlated fact that came back from the agent:

```rust
/// Event Queue Entry - events from agent
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Event {
    /// Submission `id` that this event is correlated with.
    pub id: String,
    /// Payload
    pub msg: EventMsg,
}
```

This pair is not Rust trivia. It tells you what the runtime promises to clients: work enters as an [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403), and visible consequences return as `EventMsg` values correlated to the submission id. A caller can be a terminal UI, an app-server bridge, an SDK wrapper, or another local surface; the boundary remains typed.

The high-level session facade makes the same shape explicit. [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364-L375) is documented as a queue pair:

```rust
/// The high-level interface to the Codex system.
/// It operates as a queue pair where you send submissions and receive events.
pub struct Codex {
    pub(crate) tx_sub: Sender<Submission>,
    pub(crate) rx_event: Receiver<Event>,
    // Last known status of the agent.
    pub(crate) agent_status: watch::Receiver<AgentStatus>,
    pub(crate) session: Arc<Session>,
    // Shared future for the background submission loop completion so multiple
    // callers can wait for shutdown.
    pub(crate) session_loop_termination: SessionLoopTermination,
}
```

The facade methods preserve that discipline. [`submit`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L688-L718) wraps an operation in a submission, assigns an id, attaches trace context when needed, and sends it through the submission channel. [`next_event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L743-L748) receives the next runtime event. The architecture visible here is not "the model is called." It is "a caller enters a governed queue and observes typed facts."

Once that shape is clear, later mechanisms have a place to attach. A user turn is not just text; [`UserInputWithTurnContext`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L445-L475) can carry turn-scoped environment selections, approval policy, sandbox policy, and working directory changes. Tool calls are not arbitrary process launches; they cross routing, policy, sandbox, approval, and output-shaping boundaries. Client views are not separate truths; they project events and state from the same runtime.

## The Evidence Boundary

This article uses three claim classes:

| Claim class | What it means | Safe wording |
| --- | --- | --- |
| Verified source | A pinned type, function, test, constant, or workflow directly shows the behavior. | `Submission` carries an `Op`; `Event` carries an `EventMsg`; `Codex` owns submission and event channels. |
| Surrounding contract inference | Several public anchors make a boundary visible, but no single line should be overread. | The app-server is a multi-client surface over the local runtime. |
| Out of scope | The behavior would require private service internals, hosted deployment details, model weights, or unpublished backend state. | Cloud-side scheduling and private safety pipelines are not implementation facts from this repository. |

That boundary is not legal caution; it is engineering hygiene. If a source reader blurs verified local runtime behavior with private backend inference, the article becomes harder to correct and harder to transfer. When the text says "the repository exposes" or "the runtime sends," it should be backed by the pinned source. When a product experience "suggests" a boundary, that statement must remain separate from source-level fact.

Pinned links are part of that discipline. A moving `main` link can silently become a different claim after a refactor. If the text says that `Op` lives in [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403), the link should keep showing the same enum months later. When Codex changes, the honest update is to move the snapshot, re-audit the claims, and revise the prose and figures together.

## Rust Terms Are Design Handles

No Rust expertise is assumed. The source uses Rust because the project uses Rust; this article uses a small vocabulary because those terms reveal boundaries:

| Term | First-principles meaning here |
| --- | --- |
| Crate | A separately named Rust package. Codex uses crates to keep CLI, core runtime, protocol, TUI, MCP, sandbox, app-server, and release code behind clearer boundaries. |
| Enum | A type that says "this value is exactly one of these cases." Protocol enums often map product capability and lifecycle state. |
| Struct | A named bundle of fields. Public structs show which data must cross a boundary. |
| Async task | Work that can pause while waiting for I/O, model output, user approval, subprocess output, or another channel. |
| Channel | A queue for passing messages between tasks. Submission and event channels are central to the runtime model. |
| Event | A structured fact that something happened: a turn started, a tool call began, output streamed, approval was requested, or a turn completed. |
| Facade | A compact public surface hiding a larger subsystem. `Codex::spawn`, `submit`, and `next_event` are a facade over session runtime work. |
| Protocol boundary | The place where code stops sharing private implementation detail and starts exchanging typed messages. |

Treat those words as handles, not jargon. A section earns its place when it helps you answer where a request is, what type carries it, who owns the next decision, and what failure mode is visible at that boundary.

## Common Misreadings

The most common misreading is to equate UI history with model-visible history. A terminal cell, app-server event, transcript entry, and Responses API input can carry related facts without being the same surface. The rest of the source walk keeps separating UI projection, durable rollout or transcript state, and model-visible request shape because each owner has different failure and recovery obligations.

Another misreading is to treat side effects as direct model actions. The source does not show "the model edits a file." It shows model output moving through tool specifications, dispatch, policy, approval, sandboxing, patch application, ordered output, and event emission. The difference matters: authority belongs to the runtime boundary, not to generated text.

A third misreading is to treat evidence tables as homework. They are audit aids, not a prerequisite for understanding the article. The main narrative should teach the system without forcing a GitHub tab beside every paragraph. Source links are there so a claim can be checked, corrected, or upgraded when the source changes.

The last misreading is to make the public repository explain what it cannot see. Local queue pairs, protocol types, context handling, tool routing, sandbox selection, and generated schemas are source-visible. Private service routing, model weights, hosted scheduling, and unpublished backend behavior are not. Good source reading becomes more useful, not less, when that line stays explicit.

## Transferable Rules

The transferable lesson is not "copy Codex." It is to preserve the owners that make an agent runtime auditable:

| Design move | What it protects |
| --- | --- |
| Put user work into explicit submissions. | Cancellation, tracing, retries, ordering, and client correlation have a concrete home. |
| Emit durable events instead of only mutating UI state. | TUI, app-server clients, transcripts, diagnostics, and tests can share the same facts. |
| Keep model-visible history separate from UI and storage history. | Context pressure, compaction, resume, and audit records can evolve without pretending they are one surface. |
| Route side effects through policy, approval, sandbox, and patch boundaries. | Generated text does not directly become filesystem or shell authority. |
| Classify claims before publishing them. | Source-backed statements stay reviewable, and private backend inference does not leak into implementation prose. |
| Pin source evidence. | Long-lived documentation remains auditable after the repository moves. |

If you remember only one sentence, remember this: Codex is easier to understand as typed boundaries around a governed turn than as a bag of commands around a model call.

## Reading Routes After The Model Is Clear

Use the route map only after the runtime model above is in place. Otherwise it becomes another table of contents instead of a reading strategy.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-routes.webp" alt="Reader route map for moving from runtime contracts through side effects, client surfaces, extensions, and governance" loading="lazy" decoding="async" />
  <figcaption>The route map is secondary: choose a fast architecture path, a full implementation path, or a source-audit path after the turn boundary is clear.</figcaption>
</figure>

Start with the [Reader Map](reader-map.html) if you need a timed path through the surrounding book. Use the [Source Atlas](source-atlas.html) when you want compact audit anchors. Use the [Implementation Reference](implementation-reference.html) when you already know the architecture and need dense facts. Those pages are useful only because the core contract is already stable: intent enters as a typed operation, the runtime owns the turn, side effects cross authority boundaries, and evidence returns as events.
