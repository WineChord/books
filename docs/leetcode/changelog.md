# LeetCode Page Changelog

This changelog tracks user-facing changes to the LeetCode practice page and
its Chrome extension workflow.

## 2026-05-18

### Added

- Local submission statistics for submissions made through the page editor.
- Per-problem counts for submit attempts, Accepted submissions, failed
  submissions, failed sample runs, latest code size, Accepted time, average
  Accepted time, and time per 10 nonblank code lines.
- A browser-local "Suggested practice" recommendation button that ranks
  problems with a practice-scheduling score. The score combines review due-ness,
  weakness, problem value, current fit, and fatigue penalty, and it supports
  high-value cold-start recommendations before local submission stats exist.
- A collapsed footer explanation for the recommendation score, including the
  five weighted components, local stability, retrievability, cold start,
  smoothing, and tie-breakers.
- Footer access to this changelog from the LeetCode page.
