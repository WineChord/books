---
name: wine-chord-article
description: "Plan, revise, illustrate, and maintain Wine & Chord long-form technical articles."
argument-hint: "[article path or topic]"
---

# Wine & Chord Article

Use this skill for standalone technical articles and article-like chapters in
the Books repository. It keeps structure, source accuracy, image rhythm, and
maintenance behavior consistent.

## Article Contract

An article must be self-contained. A reader should not need any prior chat,
private notes, or hidden prompt context to understand the argument.

Preferred flow:

1. Start with the practical problem and why it matters.
2. Define the mental model before naming internal mechanisms.
3. Introduce provider or platform contracts before source-code consequences.
4. Walk source mechanisms in execution order.
5. Use examples at every boundary where readers are likely to confuse concepts.
6. End with a comparison table or distilled operational rules.

Never expose process instructions, private prompts, TODO comments, or hidden
editing rationale in public prose.

## Heading Hierarchy

Use a visible hierarchy rather than one long flat sequence.

- `h1`: article title, no number.
- `h2`: major parts. For Chinese articles, prefer Chinese numerals such as
  `一、`, `二、`, `三、` when the article reads like an essay or source
  walkthrough. Use plain numeric `1.`, `2.`, `3.` only when it better matches
  an existing book series.
- `h3`: argument stages inside each major part. Use local numbering such as
  `2.1`, `2.2`, `2.3` when it helps the sidebar reveal the chapter map.
- `h4`: local mechanism steps, source-code subpaths, examples, boundary cases,
  or "why this matters" checkpoints. Add `h4` when a section has multiple
  distinct operations; do not force every paragraph into a heading.

Avoid global section numbering such as `13`, `14`, `15` after a new major part.
If a section title contains code, keep the code term but make the surrounding
phrase plain and readable.

Use the hierarchy to reveal the argument:

- `h2` answers "which large question are we solving?"
- `h3` answers "which mechanism or comparison are we in?"
- `h4` answers "which step inside this mechanism is being inspected?"

For long source-heavy articles, the table of contents should support at least
`h2` through `h4`, preferably as a nested tree rather than a flat list. The TOC
should make the article's logic visible without requiring the reader to scroll
through the body.

## Figure Rhythm

Default image/text ratio for source-heavy technical articles:

- Cover image at the top.
- One overview image in the introduction or first major section.
- One figure per major conceptual turn, usually every `900` to `1300` Chinese
  characters.
- Add an extra figure only when it prevents a specific misreading: boundary vs
  replacement, UI history vs model view, snapshot vs hot reload, local
  truncation vs semantic compaction.
- Avoid more than two figures without at least one dense explanatory section
  between them.

All new article images must follow the
`.codex/skills/wine-chord-image2-handdrawn/SKILL.md` skill.

## Source Accuracy

When explaining source code:

- Distinguish public API contract from inferred service internals.
- Name files and functions only after verifying them in the repository or in
  official documentation.
- Do not overfit a diagram to implementation details that are not visible.
- If a mechanism exists only through surrounding contracts, say so in prose and
  keep the figure abstract.
- Prefer "model-visible view" and "runtime projection" language when UI,
  storage, and API request history diverge.

## Tables And Responsive Reading

Use tables for compact comparison only when the rows are easy to scan. For
wide comparison tables in standalone HTML articles:

- Keep the desktop table dense and aligned.
- On mobile, avoid forcing page-level horizontal scrolling.
- Prefer a card-style row layout where each body cell carries the corresponding
  header via `data-label`.
- Generate `data-label` from the table headers in page script rather than
  duplicating labels by hand in prose.
- Validate the mobile viewport for body scroll width, heading overflow, image
  overflow, and table/card overflow.

## Update Protocol

For any article change:

1. Update the source article first when a source package exists.
2. Mirror the generated or static public page under `docs/public`.
3. Keep filenames stable unless the semantic role of a figure changes.
4. Update `og:image` if the cover changes.
5. Check the generated table of contents after heading changes.
6. Verify desktop and mobile widths for overflow, cramped figures, and broken
   code/table scrolling.
7. Keep the README public index current for new public entry points.

## Evolution

When future revisions reveal a durable writing or maintenance rule, update this
skill in the same change. The rule must be reusable, verified, and phrased as a
general article practice. Do not record private conversations or transient
editing instructions.
