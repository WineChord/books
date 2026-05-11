# Chapter 1: Reading Strategy

The easiest way to get lost in Codex is to begin with the biggest file. A
better approach is to follow one ordinary user action:

> A user types a prompt into Codex and expects useful code work to happen.

That sentence already contains the whole architecture. Codex needs an entry
point to receive the prompt, a protocol to represent the request, a session
runtime to talk to a model, a tool layer to inspect or change files, and a
surface that reports progress back to the user.

## Start from the product loop

The public OpenAI Codex launch material describes a coding agent that can read
and edit files, run commands, show evidence, and ask the user to review the
result. The ReAct paper gives a useful mental model for this kind of system:
reasoning and acting are interleaved, and actions produce observations that
shape the next step. We should not claim Codex is a literal implementation of
that paper. But the conceptual loop is still helpful:

<div class="flow">
  <div><strong>User intent</strong>A task enters through CLI, TUI, exec, or app-server.</div>
  <div><strong>Agent state</strong>The session builds context and model instructions.</div>
  <div><strong>Action</strong>The model asks for tools such as shell or patch.</div>
  <div><strong>Observation</strong>Tool output returns to the model and UI.</div>
  <div><strong>Decision</strong>The loop continues, finishes, or asks for approval.</div>
</div>

Source reading becomes easier once you keep that loop in your head. You can
ask, for every file: "Is this file receiving intent, carrying state, executing
action, observing results, or enforcing a boundary?"

## The first three anchors

Codex has many crates, but the first three anchors are stable:

- The npm wrapper in
  [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15)
  selects a native binary for the current platform.
- The Rust CLI router in
  [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)
  defines the top-level commands a user can run.
- The internal protocol in
  [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
  defines operations and events that move through the system.

Those three files answer three beginner questions: how does the program
start, what modes does it expose, and what messages does it pass around?

## Read types before reading functions

Rust systems often reveal their design through types. Before reading every
branch of a long function, first inspect the enums and structs that appear at
module boundaries. In Codex, several types are especially important:

- `Subcommand` describes the user-facing modes.
- `ClientRequest` and `ServerNotification` describe app-server traffic.
- `Op`, `Submission`, `Event`, and `EventMsg` describe the core runtime API.
- `Codex` is the session facade that accepts submissions and emits events.

The pattern is simple: a type is a contract. If two modules agree on a type,
they can evolve internally without forcing every caller to know every detail.
This is why source reading should follow contracts first and implementation
second.

## What to avoid

Do not begin by memorizing all crates. Also do not treat every file as equally
important. Codex is a production codebase; it contains tests, platform
helpers, migration code, UI details, and product-specific branches. Those
matter, but they are not the spine.

The spine for a first reading is:

1. command dispatch,
2. app-server request routing,
3. core session submission,
4. turn orchestration,
5. tool execution,
6. event notification.

Once that path is clear, the surrounding systems become easier to place.

## Reading exercise

Open the source links for `Subcommand`, `Op`, and `EventMsg`. Without reading
any function bodies, write down what kinds of work the program must support.
Then read one handler for each kind of work. This trains you to derive design
from public boundaries instead of drowning in implementation detail.

