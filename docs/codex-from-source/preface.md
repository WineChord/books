# Preface

This book is a source-equivalent guide to the open-source [OpenAI Codex repository](https://github.com/openai/codex). It is not a description of OpenAI's private model training stack, hosted cloud service, or internal backend. The source snapshot used throughout the book is [`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).

The intended default is that you can read the book without opening the source and still learn the architecture, control flow, data contracts, failure paths, policy layers, and client surfaces a source reader would retain. Source links remain available as evidence and for line-level auditing.

Codex is interesting because it is not just a chat wrapper. It is a local software-engineering agent with a command-line interface, a terminal UI, typed protocols, a session runtime, tool execution, sandboxing, approvals, MCP integration, skill loading, plugin support, and an app-server surface for other clients. In other words, it is a concrete example of how an LLM product becomes a system.

## Reading Conventions

The book assumes no Rust expertise. When a Rust concept matters, it is treated as a design tool rather than as jargon:

| Term | First-principles meaning in this book |
| --- | --- |
| Crate | A separately named Rust package. In Codex, crates let CLI, core runtime, protocol, TUI, MCP, and sandbox code evolve behind clearer boundaries. |
| Enum | A type that says "this value is exactly one of these cases." Protocol enums are maps of what the product can do. |
| Struct | A named bundle of fields. Public structs often reveal what data must cross a boundary. |
| Async task | Work that can pause while waiting for I/O, model output, user approval, or a subprocess. |
| Channel | A queue for passing messages between tasks. Codex uses submission and event queues as a core architectural pattern. |
| Event | A structured fact that something happened: a turn started, a tool call began, output streamed, approval was requested, or a turn completed. |
| Facade | A small public surface hiding a larger subsystem. `Codex::spawn`, `submit`, and `next_event` are a facade over the session runtime. |
| Protocol boundary | The place where code stops sharing private implementation details and starts exchanging typed messages. |

## The Recurring Scenario

Every chapter comes back to one scenario:

> The user asks Codex to modify code, Codex reasons about the workspace, calls
> tools, receives observations, asks for permission when policy requires it,
> applies a patch, and reports the result.

The scenario is deliberately ordinary. Agent architectures are easiest to understand when you follow one useful path repeatedly instead of trying to memorize every file. The chapters ask the same questions at each layer:

1. What problem does this layer solve?
2. Which source files implement the boundary?
3. What should a beginner inspect first?
4. What pattern transfers to other agent systems?

## From Product Loop to Source Loop

The public OpenAI Codex material frames Codex as a software-engineering agent that can work in isolated environments, run commands, edit files, and provide evidence for review. The open-source repository shows the local architecture behind a large part of that experience: command dispatch, terminal UI, app-server protocols, model streaming, tool execution, MCP, and local safety boundaries.

The source loop is:

<div class="flow">
  <div><strong>Intent</strong>A prompt enters through the CLI, TUI, exec mode, or app-server.</div>
  <div><strong>Protocol</strong>The prompt becomes an operation or app-server request.</div>
  <div><strong>Runtime</strong>The session records context and starts a turn.</div>
  <div><strong>Action</strong>The model emits response items and tool calls.</div>
  <div><strong>Boundary</strong>Tools pass through approval, sandbox, hooks, and reporting.</div>
</div>

## Scope Discipline

This book uses precise wording. It says "the CLI implements" or "the public repository exposes" when a claim is grounded in the open-source code. It does not claim to describe model weights, private service internals, internal deployment topology, or all cloud-side product behavior.

## Why Source Links Are Pinned

Source code moves. A link to `main` can silently point to different code next week. This book therefore pins code links to one public commit. That makes the explanations reproducible: if a chapter says that `Op` lives in [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403), the link should show the same code every time you revisit it.

## How to Use the Evidence Tables

Each chapter separates narrative reading from source audit:

| Activity | Purpose |
| --- | --- |
| Main narrative | Read without opening source. This is the default path. |
| Source Map | Open pinned links only when you want line-level verification or audit evidence. |
| Apply This | Extract reusable patterns after the implementation model is clear. |

Start with the [Reader Map](reader-map.html). It gives a 30-minute path, a 2-hour path, and an optional source-audit path. The goal is not to force you into the repository; it is to make the repository's important knowledge available in book form.
