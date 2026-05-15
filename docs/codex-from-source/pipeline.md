# Production Pipeline

This book is produced with a source-first multi-agent workflow. The workflow matters because source-code explanation can easily drift into unsupported claims. Each role has a narrow job and a concrete artifact.

| Stage | Role | Output |
| --- | --- | --- |
| 1 | Architecture explorers | Repository map, major crates, execution flow, source-reading risks, and chapter candidates. |
| 2 | Cross-reference explorers | Topic-to-source atlas with pinned public GitHub links and key type/function anchors. |
| 3 | External research explorers | Public sources for Codex, ReAct, MCP, sandboxing, TUI, async Rust, security language, and GitHub Pages. |
| 4 | Benchmark reviewer | A reference-site study focused on transferable structure: learning outcomes, part-based TOC, diagrams, chapter endings, source policy, and process transparency. |
| 5 | Chapter writers | Drafts for the map, protocol, runtime, tools, boundaries, integrations, and client surfaces. |
| 6 | Bilingual reviewer | Chinese parity, terminology consistency, missing exercises, and beginner clarity. |
| 7 | Integrator | Unified chapter voice, bilingual mirror structure, Astro navigation, visual callouts, and verification scripts. |
| 8 | Verifier | Build, private-path scan, bilingual file pairing, pinned-source-link validation, metadata checks, internal link checks, and Pages deployment verification. |

## Guardrails

The writing pipeline follows four rules:

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

The pipeline is intentionally practical. Its goal is not ceremony; it is to keep the book reproducible, source-grounded, bilingual, and safe to publish under the public WineChord domain.
