---
name: wine-chord-article
description: "Plan, revise, illustrate, and maintain Wine & Chord long-form technical articles."
argument-hint: "[article path or topic]"
---

# Wine & Chord Article

Use this skill for standalone technical articles and article-like chapters in
the Books repository. It keeps structure, source accuracy, image rhythm, and
maintenance behavior consistent.

## Living Exemplar

Treat the Prompt Cache article as the living style exemplar for Wine & Chord
technical articles:

- Primary local exemplar: `docs/public/prompt-cache/index.html`.
- Primary visual reference pack: `docs/public/prompt-cache/assets/*.png`.
- Public reference URL: `https://www.wineandchord.com/books/prompt-cache/`.
- Source reference URL:
  `https://github.com/WineChord/books/tree/main/docs/public/prompt-cache`.

When this skill is used inside the Books repository, inspect the local exemplar
first. Local uncommitted edits to the exemplar have higher priority than the
public site and GitHub `main`, because they represent the latest intended
article shape. If the local exemplar is absent, fall back to the public URL and
GitHub tree. Do not copy the exemplar's topic or prose into unrelated articles;
extract its editorial system: source-grounded narrative, dense inline links,
high figure cadence, warm hand-drawn diagrams, responsive article shell, and
clean public voice.

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

For source-comparison articles, the default long-form arc is:

```text
practical pressure
-> central thesis
-> 3 to 5 guiding questions
-> mental model
-> provider/platform contract
-> source execution chain
-> contrast table
-> common misreadings
-> transferable rules
-> references
```

The prose should read like a finished technical essay, not like an edited chat
transcript. It must not reveal the user's requests, editing plan, model
instructions, review process, local machine details, or any private rationale.
Remove phrases that imply the page was created by prompting an assistant. The
reader should only see the subject, evidence, argument, figures, and links.

For multi-page technical books or batch article passes, add a compact reading
contract before changing deep prose:

- Landing pages should expose a short reading route that tells readers which
  system layers to visit first.
- Chapters and reference pages should include a brief "Reading Contract" or
  "阅读契约" near the top, after the title and any hero visual.
- The contract should name the page's main question, the owners or boundaries
  to track, and the check a reader should be able to answer afterward.
- Keep these contracts local to the page, source-safe, and localized; do not
  include editing process notes or private rationale.

Never expose process instructions, private prompts, TODO comments, or hidden
editing rationale in public prose.

## Prompt Cache Exemplar Traits

Use the exemplar as a practical bar for new or revised articles:

- It starts from the real pressure a practitioner feels, then narrows to one
  source-level thesis.
- It defines a small set of questions that guide the whole article.
- It introduces provider or platform contracts before interpreting source code.
- It separates UI view, durable storage, and model-visible/runtime view when
  those surfaces diverge.
- It uses h2 sections as major argument turns, h3 sections as mechanisms, and
  h4 sections for local implementation steps.
- It links natural words in the body to GitHub source, official docs, papers,
  specs, or canonical references instead of hiding all sources at the end.
- It keeps code paths public and clickable; it never exposes local absolute
  paths, usernames, private branches, or private transcript details.
- It gives readers enough figures to keep the system visible: cover, overview,
  contract comparison, mechanism diagrams, recovery diagrams, and final map.
- It closes by compressing the system into transferable rules and common
  misreadings.

## Mandatory Image2 Figure Rule

MUST: Any illustrated Wine & Chord article must use
`.codex/skills/wine-chord-image2-handdrawn/SKILL.md` for every public figure.
The published page must reference final raster images generated through that
image2 workflow, usually PNG.

MUST NOT: Do not publish hand-authored HTML, inline SVG, Mermaid, canvas, CSS
shape compositions, DOM diagrams, or other code-drawn substitutes as article
figures. They may be used only as private planning scaffolds or temporary
implementation aids, and must be replaced by image2-generated final raster
assets before publication.

If exact labels, arrows, or source-code identifiers must be corrected after
generation, do it only as part of the image2 hand-drawn workflow's deterministic
post-processing step, and still export a single final raster image. Do not let
post-processing become an excuse to rebuild the figure as HTML or SVG.

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
- One figure per major conceptual turn, usually every `700` to `1100` Chinese
  characters for dense source analysis. Do not let a long mechanism section run
  past roughly `1300` Chinese characters without a figure unless the section is
  intentionally code/table-heavy and visually self-explanatory.
- Add an extra figure only when it prevents a specific misreading: boundary vs
  replacement, UI history vs model view, snapshot vs hot reload, local
  truncation vs semantic compaction.
- Avoid more than two figures without at least one dense explanatory section
  between them.
- For a substantial standalone source article, expect a cover, an early system
  overview, and several mechanism-specific figures. A 4-part source walkthrough
  often needs `7` to `12` figures. Fewer is acceptable only when the article is
  short or already has interactive visuals that do the same teaching work.
- Use figures to serve the argument, not as decoration. Every figure should
  answer a reader confusion that prose alone would make costly.

All new article images must follow the
`.codex/skills/wine-chord-image2-handdrawn/SKILL.md` skill.

Before rewriting a page, make a figure plan:

1. List the article's major conceptual turns.
2. Mark which turns already have strong visuals.
3. Add or replace figures where a mechanism, boundary, lifecycle, comparison,
   or recovery path is otherwise invisible.
4. Keep filenames stable only when the semantic role remains stable; rename
   when the figure's teaching role changes.
5. Update captions, alt text, and `og:image` when the cover changes.

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

Classify every source-level claim before making it sound certain:

- `official docs`: provider, product, API, or standards documentation states
  the behavior.
- `verified source`: the linked public source file, type, function, test, or
  constant directly shows the behavior.
- `surrounding contract inference`: visible call sites and data shapes imply a
  boundary, but the exact implementation is not public.
- `not visible`: the claim would depend on service internals, private state, or
  unpublished code.

Write only `official docs` and `verified source` claims as direct facts. Mark
`surrounding contract inference` as an inference in prose, and keep diagrams
abstract. Do not publish `not visible` claims as implementation facts.

## Links And References

Source-heavy articles should be navigable from the prose itself, not only from
a reference list at the end.

- Turn every visible source file path into a clickable GitHub link.
- Link important functions, structs, constants, request fields, and protocol
  terms at their first or most explanatory occurrence.
- Prefer exact GitHub blob URLs with line anchors when the local source has
  been verified.
- Source links must use the canonical repository name, not a temporary local
  directory name or scratch mirror. Verify the GitHub repository before linking.
- Source links must be pinned to an immutable commit SHA, not `main`, `master`,
  or another moving branch. Use the commit that matches the local source snapshot
  used for the analysis.
- Before publishing, check that representative pinned source URLs return 200 and
  that visible file paths, function names, and line anchors still point to the
  intended code.
- Prefer official docs for provider contracts, APIs, SDK behavior, and product
  features.
- Use reputable primary or canonical sources for background concepts: official
  docs, specs, standards, papers, or well-maintained reference pages.
- Keep public prose natural. Add links to existing words rather than inserting
  process notes or citation chatter.
- Keep a bottom reference list, but do not make it the only path to sources.
- If a visible path has moved in the current source tree, correct the path
  before linking; do not point a stale path at a different file.
- Link official product/docs pages where provider behavior matters, such as
  OpenAI, Anthropic, Cursor, MCP, GitHub, or relevant API documentation.
- Link papers, specs, and high-signal engineering posts at the paragraph where
  they support a claim. Prefer primary or canonical sources over summaries.
- Avoid naked URLs in prose. Link the phrase a reader would naturally click.
- Audit generated public HTML or Markdown for leaked `file://`, `/Users/`,
  local repository paths, temporary paths, private prompts, or internal process
  language before publishing.
- For long-lived source articles, prefer pinned commit URLs or record the
  source snapshot being explained. Moving `main` links are acceptable only when
  the article intentionally tracks live source and the link target is checked
  during the current edit.
- Audit representative GitHub line anchors before publishing: verify that they
  still point at the named symbol, field, or file section.

## Images, Alt Text, And Captions

Images must be useful for readers who see them and readers who rely on text:

- Every public `img` needs informative `alt` text that names the concept, not
  generic text such as "diagram" or "image".
- Use a visible caption when the figure's interpretation is not already clear
  from the surrounding paragraph.
- It is acceptable to use Prompt Cache style without explicit `figcaption` when
  the immediately adjacent prose explains the figure and the alt text is
  specific.
- The article must not rely on image text alone for source evidence; the prose
  or caption should carry the source links.
- In Astro pages under the Books repository, route images with the asset URL
  helper rather than the page URL helper. `pageUrl()` appends `.html`; images
  should use `assetUrl(base, ".../assets/name.png")` or an equivalent base
  normalizer. Never concatenate `${base}foo/...` unless the base is known to
  include a trailing slash.

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

Before committing public article changes, run the smallest relevant validation
that covers the edit:

- Check asset references exist and every public image has non-empty alt text.
- Search for private leakage: `/Users/`, `file://`, local temp paths, TODOs,
  hidden process language, prompt text, or private rationale.
- Check generated TOC, table `data-label` behavior, and mobile body
  `scrollWidth`.
- If links were added or changed, sample-check official docs and representative
  GitHub line anchors.
- Run repository content/build checks when the touched files participate in the
  Astro build.

## Evolution

When future revisions reveal a durable writing or maintenance rule, update this
skill in the same change. The rule must be reusable, verified, and phrased as a
general article practice. Do not record private conversations or transient
editing instructions.
