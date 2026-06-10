---
name: wine-chord-image2-handdrawn
description: "Generate and maintain Wine & Chord hand-drawn technical article images with image2/imagegen."
argument-hint: "[article-or-figure topic]"
---

# Wine & Chord Image2 Hand-Drawn Figures

Use this skill for every image2/imagegen asset created for this repository.
The goal is a consistent Wine & Chord visual language for technical books and
articles: precise enough for source-code explanation, warm enough for long-form
reading.

## Living Visual Exemplar

The Prompt Cache article is the canonical, living visual style reference:

- Local article: `docs/public/prompt-cache/index.html`.
- Local reference images: `docs/public/prompt-cache/assets/*.png`.
- Public article: `https://www.wineandchord.com/books/prompt-cache/`.
- GitHub tree:
  `https://github.com/WineChord/books/tree/main/docs/public/prompt-cache`.

Before producing any new Wine & Chord article figure, inspect the local
reference images first. Local uncommitted edits to the Prompt Cache article and
assets have higher priority than the public site and GitHub `main`; they are
the latest intended visual target. If an image generation tool accepts
reference images, use the most relevant `1` to `3` Prompt Cache assets as
visual references. Do not blindly attach the whole reference pack. If the tool
does not accept reference images, explicitly translate the selected references'
style and layout roles into the prompt and deterministic post-processing
choices.

Do not clone a Prompt Cache diagram's content for a different article. Reuse
the visual system: warm paper, sketched technical diagrams, restrained color,
clear lanes/stacks/timelines/ledgers, small bottom-right `Wine & Chord` mark,
and source-accurate labels.

## Non-Negotiables

- Use Codex image generation for the visual base whenever a new editorial image
  is requested.
- The page must reference final raster images, usually PNG. Do not leave source
  diagrams as HTML, Mermaid, or SVG-only illustrations in published articles.
- Every final figure must carry a small `Wine & Chord` mark in the bottom-right
  safe area.
- Do not include production notes, prompts, private instructions, model names,
  or process explanations inside public images.
- Do not let generated text invent source facts. If exact identifiers, arrows,
  or labels matter, compose them deterministically into the final raster image
  after generating the hand-drawn base.
- A figure must faithfully teach the mechanism it represents. It may be lively
  and metaphorical, but the node order, ownership boundary, data flow, and
  failure/recovery path must match the article's verified claims.

## Visual System

Canvas:

- Default aspect ratio: `16:9`.
- Prompt Cache exemplar size: `1672 x 941`. Preferred new working size:
  `2400 x 1350`; acceptable publication size: `1672 x 941` or larger.
- Safe margin: at least `7%` on all sides.
- Background: warm off-white paper, not pure white.
- Texture: subtle paper grain; no noisy parchment, stains, or heavy shadows.

Palette:

- Ink navy: `#102a43`.
- Wine & Chord blue: `#0f4c81`.
- Codex green: `#1f7a4d` or `#15803d`.
- Slate gray: `#52606d` / `#64748b`.
- Warm amber: `#b7791f`.
- Soft paper: `#fffaf0` / `#fffffb`.
- Use red only for explicit danger or deletion semantics.

Line and shape:

- Hand-drawn ink outlines with slight wobble, but keep geometry legible.
- Rounded boxes, soft shadows, watercolor fills, and sketched arrows.
- Avoid glossy 3D, neon gradients, plastic UI cards, decorative blobs, and
  overly cute cartoons.
- Arrows must be thin-to-medium, directional, and non-crossing.
- Favor lanes, ledgers, stacks, timelines, and left-to-right pipelines.
- Use Prompt Cache-style structures when they fit the claim:
  provider-contract split panes, context-pressure ladders, model-view lanes,
  durable-ledger/replacement-history boards, snapshot/reinjection loops,
  tool-output persistence paths, and final route maps.

Brand mark:

- Place `Wine & Chord` in the bottom-right corner.
- Keep it small: roughly `8%` to `14%` of image width.
- It may be handwritten, badge-like, or accompanied by a tiny grape/chord icon,
  but must not compete with the diagram.

## Reference Image Roles

Use the Prompt Cache assets as a role library:

- `cover-claude-codex-prompt-cache.png`: cover composition with two systems,
  shared pressure line, and bottom comparison panels.
- `context-pressure-overview.png`: three-lane overview for UI, disk, and model
  view.
- `prompt-cache-provider-contracts.png`: provider/API contract comparison with
  public contract note.
- `claude-code-context-pressure-ladder.png`: stacked pressure-management
  ladder.
- `claude-code-large-result-persistence.png`: tool output to persisted artifact
  and model preview.
- `claude-code-snip-projection.png`: UI transcript vs model view vs resume
  relink.
- `claude-code-compact-boundary.png`: before/after compact boundary.
- `codex-agents-session-snapshot.png`: rules snapshot and compaction
  reinjection loop.
- `codex-context-compact-ledger.png`: replacement history and resume baseline.
- `prompt-cache-runtime-routes.png`: final two-system route map.

Pick references by role, not by filename similarity. A new article about
sandboxing might use the provider-contract and boundary-board references; an
article about memory might use the ledger, snapshot, and route-map references.

Reference selection workflow:

1. Name the figure's teaching role: cover, overview, contract comparison,
   pressure ladder, lifecycle, persistence path, projection, replacement
   ledger, or final map.
2. Select the closest `1` to `3` Prompt Cache images for that role.
3. State what each reference contributes: layout, palette, line treatment,
   density, or brand mark.
4. Do not reuse the reference's subject-specific nodes unless the new article
   is explaining the same mechanism.

## Technical Diagram Method

Before generating, write a compact figure brief:

1. Claim: the one source-level idea this figure must teach.
2. Nodes: the exact entities that may appear.
3. Edges: the exact order or relationship between nodes.
4. Uncertainties: anything that must be described as public API contract rather
   than inferred provider internals.
5. Caption role: what the surrounding prose will explain so the image can stay
   visually clean.
6. References: which Prompt Cache image roles should guide style and layout.

When a figure depicts source-code behavior, ensure the surrounding article text
or caption links to the corresponding source files, functions, and official
contracts. The image may carry short labels, but it must not be the only place
where a reader can trace a claim back to code or documentation.

For source-code diagrams, keep visible labels short:

- Prefer code identifiers only when short, for example `cache_control`,
  `prompt_cache_key`, `compact_boundary`, `replacement_history`.
- Avoid long Chinese sentences inside generated images.
- If Chinese labels are required, add them with deterministic post-processing
  and export a single PNG.
- Maximum visible labels per figure: `10`; maximum words per label: `4`.

Prompt pattern:

```text
High-resolution 16:9 hand-drawn technical article infographic for Wine & Chord.
Use the provided Prompt Cache article images as style references, especially
[reference role filenames].
Warm off-white paper, precise ink sketch lines, subtle watercolor fills.
Palette: deep navy, Wine & Chord blue, muted forest green, slate gray, small
amber highlights.
Subject: [one precise source-level idea].
Composition: [nodes and arrows in exact order].
Include a small elegant handwritten “Wine & Chord” mark in the bottom-right.
No process notes, no prompt references, no meta text.
Use only these short labels: [label list].
Keep arrows clean and non-crossing; leave generous margins.
Professional editorial diagram, not cartoonish, not glossy 3D.
```

If exact labels matter, ask the image model for the unlabeled or lightly labeled
base, then overlay final text with deterministic composition. Keep final labels
aligned with article prose and source links.

## Post-Processing

Use deterministic composition when accuracy requires it:

- Keep the image2 output as the background or illustration layer.
- Overlay exact labels, node titles, arrows, or callouts with a script or design
  renderer.
- Export one final PNG for publication.
- Keep source files near the article only when they are useful for regeneration.

Recommended final asset layout:

```text
docs/public/<article>/assets/<figure-name>.png
```

When mirroring a standalone source article, keep the same filename under both
the source package and `docs/public`.

## Figure Density

Plan figures from the article argument, not from existing assets:

- Every substantial source-heavy article should have a cover plus an early
  overview figure.
- Add figures for provider contracts, runtime ownership boundaries, lifecycle
  transitions, tool/file/network side effects, compaction/recovery paths, and
  final comparison maps.
- A long article should rarely go more than `700` to `1100` Chinese characters
  without a visual anchor unless code/table layout already carries the visual
  load.
- Prefer replacing weak legacy diagrams over preserving them for convenience.
- Keep diagrams varied: do not repeat the same lane layout for every figure.

## Quality Gate

Inspect every generated figure before publishing:

- Text is readable and not misspelled.
- Labels do not escape boxes.
- Arrows do not cross in confusing ways.
- The figure matches the article's source claims.
- The Wine & Chord mark is present and unobtrusive.
- No private instruction, prompt, TODO, or process note is visible.
- Mobile rendering keeps the image legible at article width.
- The figure fits the Prompt Cache visual family when viewed beside the
  reference assets.
- The figure is vivid enough to explain the concept visually, but not so
  decorative that it obscures the real mechanism.

Regenerate or post-process if any item fails.

For article batches, create a temporary contact sheet of new figures beside the
Prompt Cache reference images and inspect the set as one family. The batch
should look systematic, not like unrelated one-off diagrams.

## Evolution

Update this skill when a repeated image correction becomes a reusable rule.
Keep changes small, general, and independent of any one conversation. Do not
record private prompts, one-off preferences, or unpublished source details.
