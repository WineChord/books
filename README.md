# WineChord Books

This repository hosts long-form online books for
`www.wineandchord.com/books/`.

## Books

- [Codex From Source](https://www.wineandchord.com/books/codex-from-source/)
- [LeetCode Frequency 888](https://www.wineandchord.com/books/leetcode/)
- [Classic Brain Teasers](https://www.wineandchord.com/books/iq/)
- [Suffix Array Primer](https://www.wineandchord.com/books/sa/)
- [Claude Code Interview Book](https://www.wineandchord.com/books/cc/)

## Book Style

All book prose and ordinary UI text defaults to the PingFang font stack defined
by `--font-book` in `src/styles/global.css`. Code blocks and code editors use
the Cursor/LeetCode stack `Monaco, "Cascadia Code", Consolas, "Courier New",
ui-monospace, SFMono-Regular, Menlo, monospace`. Mathematical symbols, numeric constraints, algorithms,
metrics, and formulas should use LaTeX/KaTeX whenever possible; see
`BOOK_STYLE.md`.

## Development

```bash
npm ci
npm run dev
```

Build and verify the static output:

```bash
npm run verify
```

The repository intentionally does not include a `CNAME` file. GitHub Pages
project sites inherit the custom domain configured on
`WineChord/WineChord.github.io`.
