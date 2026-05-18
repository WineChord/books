# LeetCode Page Changelog

This changelog tracks user-facing changes to the LeetCode practice page and
its Chrome extension workflow.

## 2026-05-18

### Added

- Local submission statistics for submissions made through the page editor.
- Per-problem counts for submit attempts, Accepted submissions, failed
  submissions, failed sample runs, latest code size, Accepted time, average
  Accepted time, and time per 10 nonblank code lines.
- A browser-local heuristic recommendation button that ranks attempted problems
  by unfamiliarity in a hover popover and exposes a "Suggested today" problem;
  failed sample runs count separately with lower weight than failed full
  submissions.
- A collapsed footer explanation for the recommendation score, including the
  weighted score components, smoothing, forgetting curve, and tie-breakers.
- Footer access to this changelog from the LeetCode page.
