# Books Repository Instructions

## Typography

- Every existing and future book under `/books/` must default all prose,
  headings, navigation, controls, tables, captions, diagrams, and ordinary UI
  text to the PingFang font stack defined by `--font-book` in
  `src/styles/global.css`.
- Do not hardcode Source Serif, Georgia, or another prose/display font for book
  text. Use `var(--font-book)`, `var(--font-sans)`, `var(--font-serif)`, or the
  page-level variable that resolves to PingFang.
- Keep code blocks, inline code, terminal output, keyboard shortcuts, and code
  editors on the Cursor/LeetCode code stack:
  `Monaco, "Cascadia Code", Consolas, "Courier New", ui-monospace,
  SFMono-Regular, Menlo, monospace`. Do not force PingFang onto code editors.

## Math

- Use LaTeX/KaTeX for mathematical symbols, algorithm variables, numeric
  ranges, complexity, probabilities, matrices/vectors, loss functions,
  quantization formats, benchmark metrics, and other quantitative content
  whenever possible.
- Plain-language text remains PingFang; KaTeX-rendered math should keep
  KaTeX's own math fonts.
- Prefer KaTeX-safe commands such as `\mathrm{}`, `\text{}`, and
  `\operatorname{}`. Avoid unsupported commands in page content.

## Specs

- New book specs must include the typography and math contract above, or refer
  to `BOOK_STYLE.md`.
- Existing specs should preserve their local requirements while inheriting this
  repository-wide style contract.
