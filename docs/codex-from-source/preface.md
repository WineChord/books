# Preface

This book is a guided source-code reading of the open-source
[OpenAI Codex repository](https://github.com/openai/codex). It is not a
description of OpenAI's private model training stack, hosted cloud service, or
internal backend. The source snapshot used throughout the book is
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).

Codex is interesting because it is not just a chat wrapper. It is a local
software-engineering agent with a command-line interface, a terminal UI,
typed protocols, a session runtime, tool execution, sandboxing, approvals,
MCP integration, and an app-server surface for other clients. In other words,
it is a concrete example of how an LLM product becomes a system.

## How to read this book

The chapters are arranged from visible behavior to internal machinery:

<div class="flow">
  <div><strong>Command</strong>Start with what the user runs.</div>
  <div><strong>Protocol</strong>Turn UI actions into typed messages.</div>
  <div><strong>Runtime</strong>Drive model calls and tool calls.</div>
  <div><strong>Boundary</strong>Approve, sandbox, persist, and report.</div>
</div>

Every chapter tries to answer three questions:

1. What problem does this layer solve?
2. Which source files implement it?
3. What design lesson can we reuse elsewhere?

The book assumes no Rust expertise. When a Rust term matters, it is explained
from first principles before being used as a design concept.

## A careful scope note

OpenAI's launch post presents Codex as a software-engineering agent that can
work in isolated environments, run tests, and propose pull requests. The
open-source CLI repository shows the local product architecture behind a
large part of that experience: command dispatch, terminal UI, app-server
protocols, model streaming, tool execution, MCP, and local safety boundaries.
It does not reveal model weights, private service internals, or every cloud
deployment detail. The book uses wording such as "the CLI implements" or "the
open-source repository exposes" when the claim is about source code.

## Why source links are pinned

Source code moves. A link to `main` can silently point to different code next
week. This book therefore pins code links to one public commit. That makes the
explanations reproducible: if a chapter says that `Op` lives in
[`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403),
the link should show the same code every time you revisit it.

