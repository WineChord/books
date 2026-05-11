# Chapter 8: Patches and Turn Diffs

<div class="chapter-lede">
  <p><strong>You are here:</strong> Codex can route tool calls; now study the edit path.</p>
  <p><strong>Problem:</strong> letting a model write arbitrary files directly would be hard to review, approve, and explain.</p>
  <p><strong>Mental model:</strong> a patch is a receipt for a file change: structured, inspectable, and tied to a turn.</p>
</div>

The patch path is one of the clearest examples of Codex's design taste. It
separates patch grammar from agent-facing runtime behavior, and it tracks
committed deltas so user surfaces can show what changed without rereading the
whole workspace.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Patch tool spec | [`create_apply_patch_freeform_tool`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L293) | Exposes patch capability as a freeform tool. |
| Patch handler | [`ApplyPatchHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286) | Bridges patch input, permissions, events, and orchestration. |
| Verified parsing | [`maybe_parse_apply_patch_verified`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L368) | Re-parses and verifies before computing changes and approval. |
| Turn diff tracker | [`TurnDiffTracker`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L16) | Maintains an in-memory diff from committed patch deltas. |

</div>

## Why Patch Instead of Direct Write?

A direct write API is simple for the model but poor for the user. It says
"replace this file with that content" and leaves the system to reconstruct
what happened. A patch says what operation is intended: add, delete, update,
move, and modify hunks with context. That structure enables approval,
display, partial failure handling, and review.

| Direct write | Structured patch |
| --- | --- |
| Easy to call | Slightly harder to generate |
| Harder to review before execution | Naturally reviewable as a diff |
| Harder to bind to approval scope | File paths and operations are explicit |
| Can hide accidental large replacements | Context and hunks expose intent |
| Requires after-the-fact comparison | The edit itself is the comparison |

## Handler Responsibilities

`ApplyPatchHandler` is more than an adapter. It declares the tool name, marks
the tool as mutating, emits hook payloads, consumes streamed argument diffs,
extracts file paths, computes effective permissions, starts UI events, and
delegates execution to `ToolOrchestrator`.

That split is important:

<div class="flow">
  <div><strong>Grammar</strong>The patch crate understands patch syntax.</div>
  <div><strong>Handler</strong>The core tool handler understands sessions and turns.</div>
  <div><strong>Policy</strong>Permission and sandbox policy decide whether execution can proceed.</div>
  <div><strong>Runtime</strong>The orchestrator executes or rejects the patch.</div>
  <div><strong>Diff</strong>The turn tracker records the committed delta.</div>
</div>

## Turn Diff Tracking

`TurnDiffTracker` tracks net text diffs for the current turn from committed
patch mutations. It records baseline content, current content, rename origins,
and invalidation state. When it can prove the delta is exact, it renders a
unified diff. If a change is not exact, it invalidates rather than pretending
to know.

This is a subtle but important safety habit: when the runtime cannot produce
accurate evidence, it should say so through state rather than showing a
confident but misleading diff.

## Patch Events as UI Contract

The patch path emits events before, during, and after execution. That matters
because users do not only care whether the model produced a final answer. They
care which files changed, whether approval was required, what content was
applied, and how the final turn differs from the starting point.

<div class="apply-this">

## Apply This

- Prefer structured edit operations over opaque file writes.
- Keep grammar parsing reusable and separate from agent runtime behavior.
- Track exact deltas and invalidate when exactness cannot be guaranteed.
- Make edit evidence visible to both the model and the user surface.

</div>

## Read the Source Next

- [`ApplyPatchHandler::handle`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L337):
  follow one patch from payload to runtime invocation.
- [`effective_patch_permissions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L252):
  see how paths and permissions are derived.
- [`TurnDiffTracker::track_delta`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/turn_diff_tracker.rs#L49):
  inspect exact-delta tracking.

<div class="exercise-box">

## Reading Exercise

Read `ApplyPatchHandler::handle` and draw a five-step path from raw patch text
to committed delta. Mark where parsing, permission calculation, approval,
execution, and diff tracking happen.

</div>

<div class="next-step">

## What Comes Next

Patch execution introduces risk. The next chapter studies the approval control
plane that decides when a tool may run, when it must ask, and when it must
stop.

</div>
