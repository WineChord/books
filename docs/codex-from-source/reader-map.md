# Reader Map

This book is written for source-equivalent understanding. You can still open
the pinned source links, but the main reading path should teach the system
without requiring a source checkout beside the book.

## Two Reading Tracks

| Track | What you do | What you should know afterward |
| --- | --- | --- |
| Read without opening source | Read chapters, diagrams, source maps, and Apply This sections. | The architecture, data flow, key contracts, lifecycle states, failure paths, and design tradeoffs a careful source reader would retain. |
| Optional source audit | Use pinned links after a chapter to verify details. | The exact source locations behind facts already explained in the book. |

The first track is the default. Source links are evidence, not homework.

## Thirty-Minute Path

Use this path when you need a fast mental model:

1. Read the home page thesis and architecture map.
2. Read [Chapter 4](chapter-04.html) for protocol vocabulary.
3. Read [Chapter 5](chapter-05.html) for threads, sessions, and durable state.
4. Read [Chapter 6](chapter-06.html) for the turn loop.
5. Read [Chapter 9](chapter-09.html), [Chapter 12](chapter-12.html), and
   [Chapter 13](chapter-13.html) for tool exposure, approval, and containment.
6. Read [Chapter 14](chapter-14.html) for app-server as the multi-client boundary.
7. Finish with the [Epilogue](epilogue.html) for the transferable design lessons.

You should be able to explain how one user request becomes a protocol
operation, a scheduled turn, a model stream, one or more supervised tool calls,
approval or sandbox decisions, durable events, and client-visible output.

## Two-Hour Path

Use this path when you want source-reader knowledge without opening source:

1. Read the preface, then Chapters 1-8 in order. This gives the contract,
   runtime, model, and observability spine.
2. Read Chapters 9-16 in order. This explains side effects and the client
   surfaces that expose the runtime.
3. Read Chapters 17-22. This covers extension planes, migration,
   multi-agent coordination, cloud tasks, identity, and memory.
4. Read Chapters 23-25 and the epilogue. This explains how build, release,
   packaging, CI, and governance keep the architecture intact.
5. Use [Pattern Index](patterns.html), [Source Atlas](source-atlas.html), and
   [Implementation Reference](implementation-reference.html) as reference tables.

This path should teach stable implementation facts and design rationale, not
just file names.

## Source-Audit Path

Use this path only when you want to audit the book against the source:

1. Read [Source Atlas](source-atlas.html) once to learn the repository vocabulary.
2. Open only the links in each chapter's source map or evidence table.
3. Verify the chapter's diagrams and source-map claims against those files.
4. Treat any mismatch as a book bug, not as missing reader effort.

## The Recurring Audit Questions

When a chapter describes a subsystem, answer four questions:

| Question | Why it matters |
| --- | --- |
| Where is the user request now? | Prevents vague architecture talk. |
| What data structure carries it? | Connects behavior to concrete source concepts. |
| Who owns the next decision? | Separates entry, protocol, runtime, tools, clients, and governance. |
| What can fail here? | Makes denial, retry, cancellation, and error reporting visible. |

If you can answer these questions for the main subsystems, you understand the
system at the level this book promises.
