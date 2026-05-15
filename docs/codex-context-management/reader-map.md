# Reader Map

This book is shorter and narrower than _Codex From Source_. It assumes you already know that Codex has a session runtime, tool execution, a TUI, and an app-server surface. It zooms in on the question those systems all depend on: what exactly does the model see, why does it see that, and how does Codex keep the answer stable after many turns?

## Three Reading Paths

You can read this book in three ways. Pick the path that matches your goal:

```text
  goal                          chapters in order
  ----                          -----------------
  architectural overview        1 -> 2 -> 6 -> 7 -> Epilogue
  implementation deep dive      1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
  pattern hunting               Apply This sections only, in order
```

Each path is honest about its trade-off. The overview path skips most implementation density and finishes in under an hour. The deep-dive path is the only one that reads every section. The pattern path is the fastest way to extract transferable design moves for another runtime.

## For Architecture Readers

Read chapters 1, 2, 6, 7, and the epilogue. That path gives you the central design:

- Context is an enforced boundary rather than a loose transcript.
- A turn envelope freezes the runtime facts that are allowed to affect one
  model request.
- Compaction is a checkpoint protocol, not just a summarizer.
- Replay and rollback are designed around evidence, not mutable memory.

## For Implementation Readers

Read all chapters in order. The ordering is deliberate:

1. Chapter 1 defines the problem and vocabulary.
2. Chapter 2 explains the turn envelope that gathers runtime facts.
3. Chapter 3 explains the history ledger that becomes prompt input.
4. Chapter 4 explains typed context fragments and diff injection.
5. Chapter 5 explains optional context budgets.
6. Chapter 6 explains compaction.
7. Chapter 7 explains resume, rollback, fork, and replay.
8. Chapter 8 explains how clients observe context without owning it.

## Canonical Homes

Each concept has one home:

| Concept | Canonical chapter |
| --- | --- |
| Context as runtime state | Chapter 1 |
| `TurnContext` shape | Chapter 2 |
| History normalization and token estimation | Chapter 3 |
| Runtime context diffing | Chapter 4 |
| Skills, plugins, memory, outputs, images | Chapter 5 |
| Local and remote compaction | Chapter 6 |
| Rollout reconstruction and truncation | Chapter 7 |
| TUI/app-server/realtime/token usage surfaces | Chapter 8 |

## Cross-References at a Glance

The chapters reuse a small set of vocabulary. The table below shows which chapter introduces each term and which chapters depend on it:

| Term | Introduced in | Reused in |
| --- | --- | --- |
| Prompt projection | Chapter 1 | every later chapter |
| Turn envelope (`TurnContext`) | Chapter 2 | 4, 6, 7, 8 |
| History ledger | Chapter 3 | 4, 5, 6, 7 |
| Reference baseline | Chapter 3 | 4, 6, 7 |
| Typed fragment | Chapter 4 | 5, 8 |
| Settings diff | Chapter 4 | 6, 7 |
| Optional plane | Chapter 5 | 8 |
| Replacement history | Chapter 6 | 7 |
| Rollback marker | Chapter 7 | 8 |

Later chapters reference earlier ideas instead of re-explaining them. If a section feels terse, follow its source atlas links after you finish the chapter; the book gives the narrative, the links give auditability.
