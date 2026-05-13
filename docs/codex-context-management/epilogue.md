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

Codex is not perfect. Some diff paths are still incomplete, estimates are
coarse, and legacy compaction support carries compatibility complexity. Those
rough edges make the design more useful to study. They show what happens when a
real product evolves from prompt concatenation pressure into a runtime that must
resume, branch, compact, and explain itself.

If you steal one idea, steal this one: do not ask "what should I put in the
prompt?" Ask "which runtime state is allowed to become model-visible, who owns
it, how long should it survive, and how will I reconstruct it later?"
