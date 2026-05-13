# Preface

This book is about one part of Codex that is easy to underestimate: context
management. Most agent write-ups talk about tools, models, and user interfaces.
Codex is interesting because it treats context as governed runtime state. The
prompt sent to the model is not a string that grows until it fails. It is the
projection of a thread ledger, a turn envelope, typed context fragments, policy
diffs, optional knowledge planes, compaction checkpoints, and replay evidence.

The source snapshot used throughout this book is
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).
The book is meant to be read without opening the source first. Source links are
evidence, not homework.

## The Thesis

The architectural bet is simple:

> Codex keeps long agent work coherent by making context a runtime boundary, not
> a prompt-building convenience.

That bet explains the shape of the subsystem. A turn has an explicit envelope.
History is normalized before sampling. Runtime facts are injected as typed
fragments. Optional material is budgeted. Compaction installs replacement
history. Resume and fork rebuild the prompt from rollout evidence. Clients
render context state, but they do not own it.

## What This Book Covers

This is not a tutorial on using Codex. It is a technical publication about how
Codex carries context through a long-running software-engineering agent:

| Layer | What it teaches |
| --- | --- |
| Turn envelope | How model identity, policy, workspace, tools, hooks, and feature gates are gathered for one turn. |
| History ledger | How response items become prompt-ready history while preserving call/output invariants. |
| Context fragments | How environment, permissions, realtime, skills, plugins, hooks, and memory become model-visible state. |
| Budgeting | How Codex prevents optional context from consuming the whole window. |
| Compaction | How long threads are rewritten into checkpointed replacement history. |
| Replay | How resumed, rolled-back, and forked threads reconstruct the effective context. |
| Client surfaces | How TUI, app-server, realtime, trace, and token usage expose context without becoming the source of truth. |

## Reading Without Rust Expertise

Rust details appear only when they expose design. When the book says "struct",
read it as "a named packet of state." When it says "enum", read it as "a closed
set of runtime cases." When it says "async task", read it as "work that can
pause while waiting for the model, tools, hooks, or I/O."

The source links point to the public Codex repository. The prose intentionally
does not reproduce proprietary prompt templates or exact implementation bodies.
When pseudocode appears, it illustrates a pattern and uses generic names.

## How to Use This Book

Technical leaders can read the opening sections, diagrams, and "Apply This"
sections to understand the design rationale. Senior engineers should read every
chapter, including the deep dives, because the real lesson is not "summarize old
messages." The lesson is how to keep a mutable prompt projection tied to durable
evidence.
