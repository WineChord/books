# Epilogue: The Context Discipline

The central lesson is not that Codex has a clever summary prompt. The lesson is
that a serious agent runtime must govern context the way a database governs
state. It needs owners, lifetimes, checkpoints, diffs, projections, and replay.

The pattern transfers well:

- Keep raw evidence separate from model-ready projection.
- Resolve a turn envelope before building prompt state.
- Render runtime facts through typed fragments.
- Give optional context explicit budgets and diagnostics.
- Treat compaction as a checkpoint installation.
- Preserve rollback as an event, not a destructive edit.
- Let clients observe context without owning it.

## A Cheat Sheet for the Whole Book

If you only memorise one diagram from this book, make it this one. It collapses
the eight chapters into one read:

```text
                +------------------------------+
                |        TurnContext           |   <- ch.2 envelope
                +------+----------+------------+
                       |          |
                       v          v
   +--------------+  fragments  +-----------+
   | History      |<-- diffs --->| Optional |   <- ch.3, ch.4, ch.5
   | ledger       |             | planes    |
   +------+-------+             +-----+-----+
          |                           |
          +------------+--------------+
                       v
              +-----------------+
              | Prompt projection|              <- ch.1 boundary
              +--------+--------+
                       |
                       v
                  Model request
                       |
                       v
              +-----------------+
              | New items + log |
              +--------+--------+
                       |
        +--------------+--------------+
        v                             v
  +-----------+                +--------------+
  | Compaction|                | Rollout      |   <- ch.6, ch.7
  | checkpoint|                | reconstruction|
  +-----------+                +------+-------+
                                      |
                                      v
                               +--------------+
                               | Client view  |   <- ch.8
                               +--------------+
```

Read top to bottom for a turn going forward. Read bottom to top for resume,
rollback, and replay. Both directions touch every owner; the difference is
whether the ledger is being read or rebuilt.

## Codex Is Not Perfect

Codex is not perfect. Some diff paths are still incomplete, estimates are
coarse, and legacy compaction support carries compatibility complexity. Those
rough edges make the design more useful to study. They show what happens when a
real product evolves from prompt concatenation pressure into a runtime that must
resume, branch, compact, and explain itself.

The right reaction to those rough edges is not "the design is wrong." It is
"the design admits where it is incomplete." That admission is itself an
architectural pattern: prefer correctness with explicit redundancy over a
clever optimization that may quietly drop required state.

## The One Thing to Steal

If you steal one idea, steal this one: do not ask "what should I put in the
prompt?" Ask "which runtime state is allowed to become model-visible, who owns
it, how long should it survive, and how will I reconstruct it later?"

The first question gets you a working demo. The second question gets you a
runtime that survives long agent work.
