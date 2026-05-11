# Reader Map

This page changes the promise of the book from "guided source reading" to
"source-equivalent understanding." You can still open the pinned source links,
but the main path is written so you can learn the system without keeping the
repository beside you.

## Two Reading Tracks

| Track | What you do | What you should know afterward |
| --- | --- | --- |
| Read without opening source | Read the chapters, trace ledgers, diagrams, implementation references, and self-checks. | The architecture, data flow, key types, lifecycle states, failure paths, and design tradeoffs a source reader would remember. |
| Optional source lab | Use the pinned links after each chapter to verify details. | The exact line-level location of the facts already explained in the book. |

The first track is the default. The source links are evidence, not homework.
When a chapter says "Read the Source Next," treat that section as optional
verification unless you are auditing a detail.

## Thirty-Minute Path

Use this path when you need a fast mental model:

1. Read the home page architecture map.
2. Read [Chapter 4](chapter-04) for the protocol vocabulary.
3. Read [Chapter 5](chapter-05) for the session facade.
4. Read [Chapter 6](chapter-06) for the turn loop.
5. Read [Chapter 9](chapter-09) and [Chapter 10](chapter-10) for approvals
   and sandboxes.
6. Read the [Implementation Reference](implementation-reference) summary
   tables.

You should be able to explain how one user request becomes a session
submission, a model stream, one or more tool calls, approval or sandbox
decisions, structured events, and client-visible output.

## Two-Hour Path

Use this path when you want source-reader knowledge without opening source:

1. Read the preface and all twelve chapters in order.
2. At the end of each chapter, answer the "Self-Check" before reading the
   optional source exercise.
3. Keep the Trace Ledger question in mind: where is the user request now,
   what data structure carries it, who owns the next decision, and what can
   fail here?
4. Finish with [Implementation Reference](implementation-reference),
   [Pattern Index](patterns), and [Source Atlas](source-atlas).

This path should teach the stable facts of the implementation, not just the
names of files.

## Source-Reader Path

Use this path only when you want to audit the book against the source:

1. Read [Source Atlas](source-atlas) once.
2. Open only the links listed in each chapter's Evidence Map.
3. Verify the chapter's Trace Ledger against those files.
4. Record any mismatch as a book bug, not as missing reader effort.

## How to Use Self-Checks

Each self-check is answerable from the book. If you cannot answer without
opening source, the chapter is under-explained. The optional source exercise
then gives you line-level confidence.

## The Recurring Trace Ledger

Every major subsystem is explained through the same four questions:

| Question | Why it matters |
| --- | --- |
| Where is the user request now? | Prevents vague architecture talk. |
| What data structure carries it? | Connects behavior to concrete Rust types. |
| Who owns the next decision? | Separates entry, protocol, runtime, tools, and clients. |
| What can fail here? | Makes denial, retry, cancellation, and error reporting visible. |

If you can answer these four questions for every chapter, you know the system
at the level a careful source reader would retain.
