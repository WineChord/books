# Chapter 1: Reading Strategy

<div class="chapter-lede">
  <p><strong>You are here:</strong> before reading individual functions, build a map of the product loop.</p>
  <p><strong>Problem:</strong> Codex is large enough that a beginner can drown in files before seeing the system shape.</p>
  <p><strong>Mental model:</strong> follow one user request as it becomes messages, model calls, tool calls, guarded side effects, and UI events.</p>
</div>

The easiest way to get lost in Codex is to begin with the biggest file. A
better approach is to follow one ordinary user action:

> A user asks Codex to change code and expects useful, reviewable work.

That sentence contains the whole architecture. Codex needs an entry point to
receive intent, a protocol to represent it, a session runtime to talk to a
model, a tool layer to inspect or change files, safety boundaries to supervise
side effects, and user surfaces that report progress.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| User-facing modes | [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | Shows how many ways a user can enter the system. |
| Runtime requests | [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | Names the operations the core runtime accepts. |
| Runtime responses | [`EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1090) | Names the facts clients can observe. |
| Session facade | [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | Gives the compact send/receive shape of the runtime. |

</div>

## Start from the Product Loop

The public Codex material describes an agent that can read files, run commands,
edit code, and show evidence for review. The ReAct paper is useful background
because it explains the broader idea of interleaving reasoning, actions, and
observations. Codex should not be described as a direct implementation of that
paper, but the mental loop transfers well:

<div class="flow">
  <div><strong>Intent</strong>The user request enters through CLI, TUI, exec, or app-server.</div>
  <div><strong>State</strong>The session collects history, configuration, instructions, and tools.</div>
  <div><strong>Action</strong>The model emits structured response items and tool calls.</div>
  <div><strong>Observation</strong>Tool output becomes protocol data and visible UI progress.</div>
  <div><strong>Decision</strong>The runtime continues, compacts, asks approval, or completes.</div>
</div>

When you read a file, ask which role it plays in that loop. Is the file
receiving intent, carrying state, executing action, recording observation, or
enforcing a boundary? This question prevents every helper from looking equally
important.

## Read Types Before Reading Functions

Rust systems often reveal their design through types. A function body explains
how work happens. A public enum explains what work is possible. That is why
this book starts with `Subcommand`, `Op`, `Submission`, `Event`, and
`EventMsg`.

`Subcommand` is the user-facing menu. It tells you Codex is not only an
interactive TUI; it also has exec mode, MCP commands, app-server mode, login
paths, cloud task support, sandbox debugging, and more. `Op` is the runtime
menu. It shows the core can receive user turns, interruptions, approvals,
dynamic tool responses, MCP refreshes, review requests, shell commands, and
thread rollback requests. `EventMsg` is the observable menu. It tells clients
what they can render or respond to.

The design lesson is simple: a type is a contract. If a request crosses a
boundary as an enum variant, readers can reason about that boundary without
knowing every private helper behind it.

## The First Reading Path

Start with this path before opening random files:

| Step | Read | Question |
| --- | --- | --- |
| 1 | `codex-cli/bin/codex.js` | How does the installed command find the native binary? |
| 2 | `cli/src/main.rs` | Which mode owns this user request? |
| 3 | `protocol/src/protocol.rs` | Which operation represents the request? |
| 4 | `core/src/session/mod.rs` | How is the operation submitted to the session? |
| 5 | `core/src/session/turn.rs` | How does a turn become model calls and tool calls? |
| 6 | `core/src/tools` | Which side effects are allowed, denied, or reported? |

Do not memorize every crate yet. The first goal is to see the spine.

<div class="apply-this">

## Apply This

- Read public boundary types before private helpers.
- Carry one realistic user scenario across the codebase.
- Separate product vocabulary from implementation vocabulary.
- Treat "what can happen" as more important than "which file is biggest."

</div>

## Read the Source Next

- [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106):
  list the user-visible modes.
- [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403):
  group runtime operations by user turn, approval, MCP, review, and control.
- [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364):
  notice the queue-pair shape.

<div class="exercise-box">

## Reading Exercise

Open `Subcommand`, `Op`, and `EventMsg`. Without reading function bodies, write
down five capabilities Codex must support. Then check whether those
capabilities appear in the sidebar chapters of this book.

</div>

<div class="next-step">

## What Comes Next

Now that you have a reading strategy, the next chapter maps the repository so
you know which crates own entry, protocol, runtime, tools, safety, and user
surfaces.

</div>
