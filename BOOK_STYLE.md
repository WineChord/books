# Book Style Spec

This repository-wide style contract applies to every book under `/books/`.

## Typography

- All prose, headings, navigation labels, controls, tables, captions, callouts,
  diagrams, and ordinary UI text must default to the PingFang font stack:
  `"PingFang SC", "PingFang TC", "PingFang HK", "Hiragino Sans GB",
  "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC", -apple-system,
  BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", sans-serif`.
- Code blocks, inline code, keyboard shortcuts, terminal output, and code
  editors must default to the Cursor/LeetCode code stack:
  `Monaco, "Cascadia Code", Consolas, "Courier New", ui-monospace,
  SFMono-Regular, Menlo, monospace`. Do not force PingFang onto code editors.
- Existing and future book pages should inherit `--font-book`,
  `--font-sans`, or `--font-serif` from `src/styles/global.css` instead of
  hardcoding a separate prose font.

## Math

- Mathematical symbols, algorithm variables, numeric bounds, complexity,
  probabilities, vectors, matrices, losses, benchmark metrics, and quantitative
  constraints should use LaTeX/KaTeX whenever possible.
- Plain language remains in the PingFang text stack; rendered KaTeX math keeps
  KaTeX's own math fonts.
- Avoid unsupported KaTeX commands in page content. Prefer `\mathrm{}`,
  `\text{}`, and `\operatorname{}` for readable identifiers.
