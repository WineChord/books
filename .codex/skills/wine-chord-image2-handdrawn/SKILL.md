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

## Visual System

Canvas:

- Default aspect ratio: `16:9`.
- Preferred working size: `2400 x 1350`; acceptable minimum: `1600 x 900`.
- Safe margin: at least `7%` on all sides.
- Background: warm off-white paper, not pure white.
- Texture: subtle paper grain; no noisy parchment, stains, or heavy shadows.

Palette:

- Ink navy: `#102a43`.
- Claude blue: `#2563eb`.
- Codex green: `#15803d`.
- Slate gray: `#64748b`.
- Warm amber: `#b7791f`.
- Soft paper: `#fffaf0`.
- Use red only for explicit danger or deletion semantics.

Line and shape:

- Hand-drawn ink outlines with slight wobble, but keep geometry legible.
- Rounded boxes, soft shadows, watercolor fills, and sketched arrows.
- Avoid glossy 3D, neon gradients, plastic UI cards, decorative blobs, and
  overly cute cartoons.
- Arrows must be thin-to-medium, directional, and non-crossing.
- Favor lanes, ledgers, stacks, timelines, and left-to-right pipelines.

Brand mark:

- Place `Wine & Chord` in the bottom-right corner.
- Keep it small: roughly `8%` to `14%` of image width.
- It may be handwritten, badge-like, or accompanied by a tiny grape/chord icon,
  but must not compete with the diagram.

## Technical Diagram Method

Before generating, write a compact figure brief:

1. Claim: the one source-level idea this figure must teach.
2. Nodes: the exact entities that may appear.
3. Edges: the exact order or relationship between nodes.
4. Uncertainties: anything that must be described as public API contract rather
   than inferred provider internals.
5. Caption role: what the surrounding prose will explain so the image can stay
   visually clean.

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
Warm off-white paper, precise ink sketch lines, subtle watercolor fills.
Palette: deep navy, muted forest green, slate gray, small amber highlights.
Subject: [one precise source-level idea].
Composition: [nodes and arrows in exact order].
Include a small elegant handwritten “Wine & Chord” mark in the bottom-right.
No process notes, no prompt references, no meta text.
Use only these short labels: [label list].
Keep arrows clean and non-crossing; leave generous margins.
Professional editorial diagram, not cartoonish, not glossy 3D.
```

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

## Quality Gate

Inspect every generated figure before publishing:

- Text is readable and not misspelled.
- Labels do not escape boxes.
- Arrows do not cross in confusing ways.
- The figure matches the article's source claims.
- The Wine & Chord mark is present and unobtrusive.
- No private instruction, prompt, TODO, or process note is visible.
- Mobile rendering keeps the image legible at article width.

Regenerate or post-process if any item fails.

## Evolution

Update this skill when a repeated image correction becomes a reusable rule.
Keep changes small, general, and independent of any one conversation. Do not
record private prompts, one-off preferences, or unpublished source details.
