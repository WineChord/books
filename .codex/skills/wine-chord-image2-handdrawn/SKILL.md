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
clear lanes/stacks/timelines/ledgers, the bottom-right `Wine & Chord`
brand mark placement, and source-accurate labels.

## Non-Negotiables

- Use Codex image generation for the visual base whenever a new editorial image
  is requested.
- The page must reference final raster images, usually PNG. Do not leave source
  diagrams as HTML, Mermaid, or SVG-only illustrations in published articles.
- Every newly generated or materially regenerated final figure must carry one
  exact `Wine & Chord` raster mark selected from the approved candidate set in
  this skill's `assets/` directory. Do not rely on the image model to redraw or
  reinterpret the logo.
- Existing hand-drawn figures that already form a coherent Wine & Chord visual
  family may keep their original natural bottom-right logo treatment when a
  mechanical overlay would make the image look pasted together. Do not retrofit
  a patch solely for compliance if the figure is otherwise publication-quality.
  Apply the exact raster mark rule strictly to incremental new figures and to
  figures whose logo area is already being regenerated for visual reasons.
- Every final generated figure must be uploaded with the local PicGo CLI before
  publication. Published article markup should use the remote URL returned by
  PicGo, not a repository-relative image path.
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

Brand mark candidate set:

- Approved raster candidates live in this skill directory:
  - `assets/wine-chord-brand-mark-reference.png`: handwritten deep-navy
    cursive `Wine & Chord`, sweeping underline flourish, and small purple grape
    cluster with green leaves at the right.
  - `assets/wine-chord-brand-mark-glass-notes.png`: wine glass, flowing staff
    lines, music notes, and handwritten `Wine & Chord`.
- Treat these PNGs as authoritative brand assets, not merely style hints. The
  final published figure should composite one selected exact mark into the
  image.
- For each generated figure, choose exactly one candidate before
  post-processing. Prefer the candidate that best fits the article voice,
  figure topic, visual balance, bottom-right safe area, and surrounding color
  rhythm. For example, the grape mark often fits source-heavy and wine-themed
  essays; the glass-and-notes mark often fits lighter, musical, or composition-
  oriented visuals. If no candidate is meaningfully better, rotation or random
  selection is acceptable as a fallback. Once selected, record the chosen asset
  path in the figure brief or generation notes and keep that figure stable
  across later edits unless there is a deliberate visual reason to switch.
- Do not use a badge, box, stamp, sans-serif wordmark, generic icon, alternate
  logo treatment, or image-model imitation for newly generated or regenerated
  figures. The mark must remain visually consistent across new generated
  figures. For legacy figures with a strong integrated hand-drawn logo, prefer
  preserving the image over adding an obvious pasted overlay.
- Keep it legible but secondary: roughly `10%` to `16%` of image width, with at
  least `3%` canvas padding from the right and bottom edges.
- During image generation, ask for a clean bottom-right paper area reserved for
  the selected mark. After generation, overlay the selected PNG
  deterministically. If the model generated any competing logo or text there,
  cover it with matching paper texture before compositing the selected asset.
- Do not crop, blur, recolor, or stretch the brand elements. Preserve the
  handwritten relationship between the text and the accompanying grape cluster,
  wine glass, staff lines, or music notes.

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

For runtime and protocol figures, prefer lifecycle or before/after layouts over
generic box clusters. A good figure should make one transition visible:
request before vs after projection, UI history vs model-visible history,
durable record vs resume reconstruction, or provider contract vs client
runtime responsibility. If the article already uses JSON examples for exact
fields, the figure should show ownership, order, and consequence rather than
duplicating the whole payload.

Figures should expose the reason for a mechanism, not just its plumbing. When a
diagram depicts a runtime choice, make the protected invariant visually clear:
stable prefix, lossy projection, durable recovery point, ownership boundary, or
failure mode avoided. Avoid decorative complexity that shows more nodes without
making the tradeoff easier to understand.

When a figure depicts source-code behavior, ensure the surrounding article text
or caption links to the corresponding source files, functions, and official
contracts. The image may carry short labels, but it must not be the only place
where a reader can trace a claim back to code or documentation.

Visible figure labels must follow the same abstraction level as the prose. Use
category labels for categories, product labels for products, and source
identifier labels for exact code concepts. Do not let a broad category such as
`coding agent` visually collapse into one vendor product, and do not add
awkward translation glosses such as `代码智能体` unless they make the figure
easier to understand.

Those traceability links must follow the article skill's source-link contract:
canonical GitHub repository, immutable commit SHA, verified path, and line
anchor. Never use a moving branch or a local workspace directory name as the
public evidence URL.

For source-code diagrams, keep visible labels short:

- Prefer code identifiers only when short, for example `cache_control`,
  `prompt_cache_key`, `compact_boundary`, `replacement_history`.
- Avoid long Chinese sentences inside generated images.
- If Chinese labels are required, add them with deterministic post-processing
  and export a single PNG.
- Use font roles deliberately during deterministic post-processing: reserve
  monospace fonts for short code identifiers, function names, flags, and schema
  fields; use a CJK-capable sans font for Chinese prose labels, captions, and
  callouts. Never place Chinese explanation text in a monospace-only font that
  can render missing-glyph boxes.
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
Leave a clean warm-paper safe area in the bottom-right for the selected
Wine & Chord brand mark candidate that will be composited after generation.
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
- Always overlay one selected brand asset from the approved candidate set as the
  final bottom-right mark.
- Export one final PNG for publication.
- Keep source files near the article only when they are useful for regeneration.

Mandatory brand overlay protocol:

1. Generate the figure body with a clean bottom-right warm-paper safe area.
2. Select one approved brand mark candidate from this skill's `assets/`
   directory based on the figure brief, article voice, and visual fit. Use
   rotation or random selection only when there is no meaningful design reason
   to prefer one candidate. Record the selected path so later revisions can
   reproduce the same final figure.
3. Load the selected PNG and scale it proportionally to `10%` to `16%` of
   canvas width.
4. Place it in the bottom-right safe area with at least `3%` right and bottom
   padding.
5. If the selected PNG background differs from the target paper, softly key out
   the light paper background or blend it into a small matching-paper patch. Do
   not alter the lettering, underline, grape cluster, leaves, wine glass, staff
   lines, or music notes.
6. Save the composited result as the only image referenced by the article.

Recommended final asset layout:

```text
docs/public/<article>/assets/<figure-name>.png
```

When mirroring a standalone source article, keep the same filename under both
the source package and `docs/public`.

PicGo publication protocol:

1. Finish the image2 generation, deterministic label fixes, and selected
   `Wine & Chord` brand mark overlay first.
2. Save the final PNG locally under the article's assets directory so the source
   package remains reproducible.
3. Upload that final PNG with the local PicGo CLI, for example
   `picgo upload docs/public/<article>/assets/<figure-name>.png`.
4. Capture the remote URL printed by PicGo and use that URL in published
   Markdown, HTML, MDX, Astro image data, and `og:image` metadata.
5. Keep a small mapping in the working notes or commit context from local asset
   path to PicGo URL so future edits know which source file produced the public
   image.
6. If PicGo is unavailable or upload fails, stop and report the blocker. Do not
   silently publish generated figures with local repository paths, except for
   temporary local drafts that are not being published.

When wiring legacy local assets into Astro pages in the Books repository, do not
use a page-link helper for images and do not assume `import.meta.env.BASE_URL`
has a trailing slash. Use the repository asset URL helper, for example
`assetUrl(base, "design/assets/example.png")`, or an equivalent helper that
normalizes the base without appending `.html`. For new generated figures,
prefer the PicGo URL from the publication protocol above. Validate with
`npm run check:dist` so broken forms such as `/bookscc/...` or `.png.html` are
caught before commit.

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
- No missing-glyph boxes, clipped words, accidental line breaks inside code
  identifiers, or forced wraps such as splitting `observation` across lines.
- Labels do not escape boxes.
- Arrows do not cross in confusing ways.
- The figure matches the article's source claims.
- The Wine & Chord mark is one exact composited raster asset from the approved
  candidate set, proportionally scaled and placed in the bottom-right. No
  image-model imitation, alternate badge, generic icon, distorted crop, recolor,
  or competing generated logo is visible.
- The published article references the PicGo remote URL for each generated
  figure. The local PNG may remain in the repo as source/backing material, but
  it should not be the published `src` for generated article images.
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

For any figure with deterministic text overlays, also inspect at least the
highest-risk images at full size. Contact sheets are useful for family style,
but they can hide missing glyphs, cramped labels, and bad wrapping.

## Evolution

Update this skill when a repeated image correction becomes a reusable rule.
Keep changes small, general, and independent of any one conversation. Do not
record private prompts, one-off preferences, or unpublished source details.
