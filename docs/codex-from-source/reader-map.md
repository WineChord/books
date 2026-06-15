# Codex Source Reader Map: Follow the Turn, Not the Tree

> **Reading Contract:** This page assumes the Preface has already explained why
> Codex is best read as a governed turn. The question here is more practical:
> when one user request enters the system, which source path should you choose
> next? Track the owner, the typed carrier, the authority boundary, and the
> evidence that survives after the UI has rendered.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-routes.webp" alt="Reader route map for moving from runtime contracts through side effects, client surfaces, extensions, and governance" loading="eager" decoding="async" />
  <figcaption>The useful route is not "open every folder." Start with the request, then choose the next owner: entry, protocol, turn runtime, tool authority, client projection, extension, or governance.</figcaption>
</figure>

The Codex repository is large enough to reward almost any first guess. You can
start from the CLI and find a real product surface. You can start from the TUI
and find user-visible state. You can start from protocol types and find the
shared vocabulary. You can start from tools, MCP, sandboxing, app-server code,
memory, plugins, cloud-task clients, or release workflows and still be looking
at something important.

That is exactly why a reader map needs a route, not a directory inventory. This
page is for the moment after the Preface has supplied the mental model. Instead
of asking "what is Codex?", ask a narrower question: **given one ordinary user
turn, which source owner has the next decision?**

The source snapshot used here is
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).
Every source link is pinned to that commit so the reading route remains
auditable after `main` changes.

## File Tree Pressure

A file tree is good at showing nouns: `cli`, `core`, `protocol`, `tui`,
`app-server`, `mcp`, `exec`, `sandbox`, `plugins`, `cloud-tasks`, `release`.
It is bad at showing ownership. The same user request may pass through several
of those nouns before anything visible happens.

The pressure point is therefore not "which folder is most important?" It is
"which boundary would be wrong if I skipped it?"

| If you start here | The local truth | The route risk |
| --- | --- | --- |
| CLI or app-server | Intent enters through a concrete surface. | You may treat entry code as the runtime itself. |
| TUI | The user sees events, history, diffs, and status. | You may treat rendering state as the source of truth. |
| Protocol crate | Shared types reveal the vocabulary. | You may collect enums without knowing who acts on them. |
| Core runtime | Sessions, turns, context, and tools converge. | You may overread local runtime facts as hosted backend facts. |
| Tool files | Side effects become concrete. | You may miss approval, sandboxing, hooks, retry, and output shaping. |
| CI and release | Generated schemas and policy checks are visible. | You may treat governance as packaging instead of architecture. |

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/bounded-agent-os-map-569ff6a1-v2.webp" alt="Bounded agent operating-system map separating client surfaces, typed protocol, session runtime, authority gates, sandboxing, and rollout evidence" loading="lazy" decoding="async" />
  <figcaption>The file tree becomes useful only after each folder is tied to an owner: entry surfaces, typed protocol, session runtime, authority gates, client projections, and release evidence.</figcaption>
</figure>

Read folders as pressure points. A chapter should earn attention because it
protects one of the turn's invariants: intent must be typed, context must be
owned, model output must not become authority by itself, side effects must cross
policy, and evidence must remain reviewable.

## Follow One User Turn

Use a deliberately ordinary request:

> Change a file in this workspace, run a check if needed, and report what
> happened.

That request gives you a live routing test. At each step, stop reading the
current file as soon as you know who owns the next decision.

| Turn step | Reading question | Where the route usually points |
| --- | --- | --- |
| Entry | Which surface accepted the request, and what did it refuse to decide locally? | CLI, TUI, SDK, app-server, remote-control, or nested-agent entry code. |
| Typed carrier | Which operation or transport message now carries the intent? | Protocol types and generated schemas. |
| Session owner | Which runtime object owns context, policy, cancellation, and event correlation? | Session and turn code. |
| Model stream | Which stream item is plain assistant output, and which asks for work? | Provider client and turn-loop handling. |
| Tool authority | Which boundary can deny, sandbox, retry, transform, or cancel the side effect? | Tool routing, approval, hooks, sandboxing, patch, exec, and filesystem code. |
| Client projection | How does the user see evidence without becoming the owner of truth? | TUI, app-server, transcript, rollout, and event rendering. |
| Governance | Which checks keep the boundary stable across releases? | Generated schemas, boundary tests, workflows, packaging, and CI policy. |

This route keeps the Preface's queue-pair model in the background without
repeating it. The Preface explains why submissions and events are the smallest
runtime contract. This page uses that contract as a compass: when the request
leaves one owner, find the typed handoff to the next owner.

## The Source Mechanism: Choose The Next Owner

The source route has three common switching points. Each one is a place where a
reader should change files because the current owner has done its job.

### Entry Code Shows Surfaces, Not The Whole Architecture

At the pinned commit, the CLI's
[`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L105-L146)
enum is enough to show that Codex exposes many entry surfaces. An abridged
excerpt makes the point:

```rust
enum Subcommand {
    Exec(ExecCli),
    Review(ReviewArgs),
    // login, logout, and other local commands omitted
    Mcp(McpCli),
    Plugin(PluginCli),
    McpServer,
    AppServer(AppServerCommand),
    RemoteControl,
    Sandbox(SandboxArgs),
    Debug(DebugCommand),
}
```

Do not turn that snippet into "the CLI is the architecture." It is a route
marker. Once an entry surface has converted a command into a typed request, the
next question belongs to the protocol and runtime, not to argument parsing.

### The Turn Function Marks Runtime Ownership

The governed turn is where context, model streaming, pending input, tool calls,
compaction, cancellation, and completion start meeting in one place. The
signature of
[`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139-L146)
is a compact source anchor:

```rust
pub(crate) async fn run_turn(
    sess: Arc<Session>,
    turn_context: Arc<TurnContext>,
    input: Vec<UserInput>,
    prewarmed_client_session: Option<ModelClientSession>,
    cancellation_token: CancellationToken,
) -> Option<String> {
```

Read this as an ownership signal. The turn is not just a model call. It receives
session state, turn-scoped context, user input, optional provider session state,
and cancellation. If you are auditing a claim about what happens during a user
request, this is the point where entry-surface reading should become runtime
reading.

### Tool Code Matters Only After Authority Is In View

Tool implementation files are attractive because they are concrete: shell,
patch, filesystem, MCP, network, and sandbox behavior all look like "the action."
The map is safer if you first ask how the action is authorized and attempted.
[`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L41-L60)
shows the owner that sits before concrete execution:

```rust
pub(crate) struct ToolOrchestrator {
    sandbox: SandboxManager,
}
```

That small struct points to a larger route: approval context, sandbox selection,
permission hooks, network approval, attempts, retry behavior, and result
shaping. A source reader should open the concrete shell or patch handler only
after locating the authority path that lets the handler run.

## Common Misreadings

| Misreading | Better route |
| --- | --- |
| "The first command parser I understand is the architecture." | Treat entry code as an adapter. Follow the typed request into the runtime owner. |
| "The TUI is the truth because it is what the user sees." | Treat the TUI as a projection over runtime events, transcript state, and local UI state. |
| "The model edits files." | Follow model output into tool routing, approval, sandboxing, patch application, and emitted evidence. |
| "A cloud-facing client file proves hosted backend internals." | Keep public client contracts separate from private service topology and scheduling. |
| "Source links are homework before reading the prose." | Read the route first; use pinned links to audit the claim that matters. |
| "CI and release are delivery details." | Generated schemas, boundary checks, and release workflows are how architecture resists drift. |

These mistakes have the same shape: they stop at the first familiar surface.
The corrective move is always to ask which owner carries the request next.

## Reading Routes

The timed routes are not the argument. They are ways to spend attention after
the turn route is clear.

### 30-Minute Route

Use this path when you need the fastest reliable mental model.

| Step | Read | Keep only this |
| --- | --- | --- |
| 1 | [Preface](preface.html) | Why one turn is the unit of reading. |
| 2 | [Chapter 4](chapter-04.html) | The protocol vocabulary shared by clients and runtime. |
| 3 | [Chapter 5](chapter-05.html) | Threads and sessions own durable state and event correlation. |
| 4 | [Chapter 6](chapter-06.html) | The turn loop joins context, streaming, tools, continuation, and completion. |
| 5 | [Chapters 9](chapter-09.html), [12](chapter-12.html), and [13](chapter-13.html) | Tool calls are governed side effects, not direct model authority. |
| 6 | [Chapters 14](chapter-14.html) and [16](chapter-16.html) | App-server and TUI are client surfaces over the runtime. |
| 7 | [Epilogue](epilogue.html) | The design lessons that transfer beyond Codex. |

After this route, you should be able to narrate one request from entry surface
to typed operation, turn owner, model stream, tool authority, event evidence,
and client-visible result.

### 2-Hour Route

Use this path when you want source-grounded architecture knowledge without
opening every GitHub link.

1. Read the [Preface](preface.html), then Chapters 1-8. This gives the bounded
   runtime model, startup narrowing, configuration, protocol, session ownership,
   turn loop, provider streaming, and rollout evidence.
2. Read Chapters 9-16. This follows model-visible tool specifications into
   routing, shell, patch, hooks, human approval, sandboxing, app-server, SDKs,
   daemon control, and TUI rendering.
3. Read Chapters 17-22. This covers MCP, skills, plugins, migration, multi-agent
   coordination, cloud task boundaries, identity, and memory.
4. Read Chapters 23-25 and the epilogue. This explains why build systems,
   generated contracts, packaging, release workflows, and CI policy are part of
   the architecture rather than delivery chores.
5. Use the [Pattern Index](patterns.html), [Source Atlas](source-atlas.html),
   and [Implementation Reference](implementation-reference.html) only after the
   narrative route is stable.

The two-hour route should leave you with owner boundaries, not trivia. You
should know which facts are runtime contracts, which are client projections,
which are authority gates, and which are release-time enforcement.

### Source-Audit Route

Use this path when you want to verify claims against the pinned commit.

| Audit move | Rule |
| --- | --- |
| Start from a claim, not a filename. | A file verifies a boundary only when the claim has already named that boundary. |
| Prefer pinned links over `main`. | Moving branch links make long-lived reading non-reproducible. |
| Verify direct facts first. | Types, functions, tests, constants, workflows, and generated schemas are stronger than surrounding inference. |
| Mark inference explicitly. | If a boundary emerges from several anchors, call it surrounding contract inference. |
| Treat mismatch as a book bug. | The reader should not silently reconcile stale prose with changed source. |

For a focused audit, open only these anchors first:

1. [`Submission`, `Op`, `Event`, and `EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123) for the shared protocol vocabulary.
2. [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364), [`submit`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L688), and [`next_event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L743) for the session facade.
3. [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139) for the governed turn.
4. [`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L41) for approval, sandbox, attempt, and retry ownership.
5. [`MessageProcessor`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) and [`ChatWidget`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658) for client projection.
6. [`rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281) and [`verify_tui_core_boundary.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_tui_core_boundary.py#L24) for release and governance evidence.

## Transferable Rules

The reusable lesson is to design a reading route before you design a reading
list.

| When reading another agent system | Ask this first | What the answer protects |
| --- | --- | --- |
| Entry and protocol | Where does user intent become a typed request? | The system does not confuse UI text with runtime work. |
| Runtime ownership | Which component owns turn state, context, cancellation, and completion? | The reader can find the real control point for the request. |
| Model output | Which outputs are plain text, and which can become side-effect requests? | Generated content is separated from authority. |
| Tool authority | Where can policy, approval, sandboxing, hooks, or retries intervene? | Side effects stay reviewable and deniable. |
| Evidence | What survives after the client has rendered? | Audit, replay, diagnostics, and tests share stable facts. |
| Governance | Which generated artifacts or checks keep the boundary stable? | Architecture survives refactors, releases, and packaging changes. |

If a source tree feels too large, do not open more files. Pick one ordinary
request and follow the owners that carry it. When the owner changes, change
files. When the owner is still the same, keep reading.

## Source Map

The map below is the compact version of the whole route. It is intentionally
claim-oriented rather than folder-oriented.

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/pinned-source-evidence-map-df64b03.webp" alt="Pinned source evidence atlas mapping chapter claims to verified owners, public source anchors, and audit rules" loading="lazy" decoding="async" />
  <figcaption>Use the source map as an audit layer: start from a claim, choose the owner that can prove it, then open the pinned anchor.</figcaption>
</figure>

| Claim you want to verify | First owner to inspect | Book support |
| --- | --- | --- |
| A request has a shared typed vocabulary. | Protocol types and generated schemas. | [Chapter 4](chapter-04.html), [Implementation Reference](implementation-reference.html) |
| A session owns context, queues, cancellation, and event correlation. | Session facade and turn runtime. | [Chapter 5](chapter-05.html), [Chapter 6](chapter-06.html) |
| Model output becomes action only through runtime handling. | Provider stream handling and tool routing. | [Chapter 7](chapter-07.html), [Chapter 9](chapter-09.html) |
| File edits and shell commands are governed side effects. | Patch, exec, approval, hook, and sandbox code. | [Chapter 10](chapter-10.html), [Chapter 11](chapter-11.html), [Chapter 12](chapter-12.html), [Chapter 13](chapter-13.html) |
| UI clients render evidence rather than owning truth. | App-server and TUI projection code. | [Chapter 14](chapter-14.html), [Chapter 16](chapter-16.html) |
| Extensions stay outside the core runtime until typed in. | MCP, skills, plugins, and connector boundaries. | [Chapter 17](chapter-17.html), [Chapter 18](chapter-18.html) |
| Release policy is part of the architecture. | Generated contracts, packaging, workflows, and boundary tests. | [Chapter 23](chapter-23.html), [Chapter 24](chapter-24.html), [Chapter 25](chapter-25.html), [Pipeline](pipeline.html) |

Use the [Source Atlas](source-atlas.html) when you need denser anchors, and use
the [Implementation Reference](implementation-reference.html) when you already
know the route and need exact subsystem facts. This page's job is simpler: keep
one request moving through the right owners until the source tree becomes a
path instead of a pile.
