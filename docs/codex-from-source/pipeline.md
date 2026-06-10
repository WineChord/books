# Publication Discipline

> **Reading Contract:** Use this page to understand publication discipline. Track how claims, pinned evidence, diagrams, bilingual parity, and automated checks keep a source-pinned book maintainable.

<figure class="wc-article-figure">
  <img src="/books/codex-from-source/assets/publication-discipline-pipeline.png" alt="pipeline hand-drawn architecture figure" loading="lazy" decoding="async" />
  <figcaption>Publication discipline keeps the public book maintainable: claims, pinned evidence, visual models, verification gates, and published pages reinforce each other.</figcaption>
</figure>

This page describes the public maintenance contract for the book. Source-code explanation can drift in three ways: a source link can move, a diagram can simplify too much, or a bilingual edition can quietly lose a claim. The pipeline exists to make those failures visible before publication.

| Stage | Publication check | Reader-facing output |
| --- | --- | --- |
| 1 | Claim audit | Every architecture claim is phrased so it can be checked against public source or public documentation. |
| 2 | Source anchoring | Codex source links are fixed to the same public commit and point to the owner of the behavior being explained. |
| 3 | External evidence | Product, research, protocol, Rust, TUI, security, and publishing context uses public primary or near-primary sources. |
| 4 | Visual model | Diagrams explain control flow, ownership, trust, lifecycle, or state rather than decorating the page. |
| 5 | Chapter shape | Each chapter states the problem, introduces the mental model, names the source owners, and ends with transferable patterns. |
| 6 | Bilingual parity | English and Chinese pages keep the same claims, figures, source anchors, and exercises while using natural local wording. |
| 7 | Site integration | Navigation, reference pages, image assets, metadata, and internal links match the published route structure. |
| 8 | Verification | Build, content, generated-output, private-path, and link checks run before publication. |

## Guardrails

The publication contract follows four rules:

1. Source claims must point to public `openai/codex` links pinned to
   `569ff6a1c400bd514ff79f5f1050a684dc3afde3`.
2. Product or research claims must link to public sources such as OpenAI,
   MCP, ReAct, Ratatui, Tokio, OWASP, NIST, GitHub Docs, or project
   documentation.
3. The book must not leak private local paths, local usernames, or local file
   URLs.
4. The Chinese edition must be a real edition, not a thin summary: same pages,
   same core claims, same exercises, and consistent terminology.

## Quality Rubric

Every source-reading chapter should include:

- a chapter lede that states the problem, mental model, and core files;
- an evidence map with pinned Codex source links;
- at least one concrete control-flow, data-flow, or decision table;
- one beginner exercise that sends the reader back to source;
- an `Apply This` section with transferable engineering patterns;
- a short bridge to the next chapter.

## Verification Gates

The repository includes automated gates:

- `npm run check:content` checks bilingual file pairing, config/source-commit
  consistency, sidebar coverage, private-path leaks, and pinned Codex source
  links.
- `npm run build` verifies that Astro renders every page and generates the
  sitemap index.
- `npm run check:dist` scans generated static output for private paths, local
  file URLs, required metadata, and broken generated `href`/`src` targets.
- `npm run verify` runs all of the above in the same order used by CI.

The pipeline is intentionally practical. Its goal is not ceremony; it is to keep the book reproducible, source-grounded, bilingual, visually readable, and safe to publish under the public WineChord domain.
