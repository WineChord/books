# Production Pipeline

This book was produced with a source-first multi-agent workflow. The workflow
matters because source-code explanation can easily drift into unsupported
claims. Each role had a narrow job and a concrete artifact.

| Stage | Role | Output |
| --- | --- | --- |
| 1 | Architecture explorer | Repository map, major crates, execution flow, chapter candidates. |
| 2 | Cross-reference explorer | Topic-to-source atlas with pinned public GitHub links. |
| 3 | External research explorer | Public sources for Codex, ReAct, MCP, sandboxing, TUI, async Rust, and GitHub Pages. |
| 4 | Medium and deployment planner | VitePress + GitHub Pages project-site architecture for `/books/codex-from-source/`. |
| 5 | Chapter writers | Drafts for the map, agent loop, tools, boundaries, integrations, and UI/app-server layers. |
| 6 | Integrator | Unified chapter voice, bilingual mirror structure, VitePress navigation, and visual callouts. |
| 7 | Verifier | Build, private-path scan, bilingual file pairing, pinned-source-link validation, and local preview checks. |

## Guardrails

The writing pipeline follows three rules:

1. Source claims must point to public `openai/codex` links pinned to
   `569ff6a1c400bd514ff79f5f1050a684dc3afde3`.
2. Product or research claims must link to public sources such as OpenAI,
   MCP, ReAct, Ratatui, Tokio, OWASP, NIST, GitHub Docs, or project
   documentation.
3. The book must not leak private local paths, local usernames, or local file
   URLs.

## Verification Gates

The repository includes two automated gates:

- `npm run check:content` checks bilingual file pairing, private-path leaks,
  and pinned Codex source links.
- `npm run check:dist` scans the generated static output for private paths
  and local file URLs.

The production build also runs through `npm run build`, which verifies that
VitePress can render every page and generate the sitemap.

This pipeline is intentionally simple. The goal is not to create ceremony; it
is to keep the book reproducible, source-grounded, bilingual, and safe to
publish under the public WineChord domain.
