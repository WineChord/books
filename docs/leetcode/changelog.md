# LeetCode Page Changelog

This changelog tracks user-facing changes to the LeetCode practice page and
its Chrome extension workflow.

## 2026-05-18

### Added

- Local submission statistics for submissions made through the page editor.
- Per-problem counts for submit attempts, Accepted submissions, failed
  submissions, failed sample runs, latest code size, Accepted time, average
  Accepted time, and time per 10 nonblank code lines.
- A default-off immersive practice flow toggle, available from the timing board
  or `Cmd+Option+F`. When enabled, only a full submit that returns Accepted
  advances to the next problem; passing sample runs do not trigger navigation.
- A suggested-flow action in the "Suggested practice" popover, also available
  with `Cmd+Option+Shift+F`. It opens the top recommendation first, then
  recomputes recommendations and advances after each full Accepted submit.
- A browser-local "Suggested practice" recommendation button that ranks
  problems with a practice-scheduling score. The score combines review due-ness,
  weakness, problem value, current fit, and fatigue penalty, and it supports
  high-value cold-start recommendations before local submission stats exist.
- A collapsed footer explanation for the recommendation score, including the
  five weighted components, local stability, retrievability, cold start,
  smoothing, and tie-breakers.
- Footer access to this changelog from the LeetCode page.
