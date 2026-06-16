# WineChord Books

This repository hosts long-form online books for
`www.wineandchord.com/books/`.

## Public Index

- [WineChord Books](https://www.wineandchord.com/books/) - main index.

## Books

- [Codex From Source](https://www.wineandchord.com/books/codex-from-source/) /
  [中文](https://www.wineandchord.com/books/zh/codex-from-source/)
- [Codex Context Management](https://www.wineandchord.com/books/codex-context-management/) /
  [中文](https://www.wineandchord.com/books/zh/codex-context-management/)
- [LeetCode Frequency 888](https://www.wineandchord.com/books/leetcode/) /
  [中文](https://www.wineandchord.com/books/zh/leetcode/)
- [System Design Interview Book](https://www.wineandchord.com/books/design/) /
  [中文](https://www.wineandchord.com/books/zh/design/)
- [Classic Brain Teasers](https://www.wineandchord.com/books/iq/) /
  [中文](https://www.wineandchord.com/books/zh/iq/)
- [Suffix Array Primer](https://www.wineandchord.com/books/sa/) /
  [English](https://www.wineandchord.com/books/sa/en.html)
- [LCP Array Primer](https://www.wineandchord.com/books/lcp/) /
  [English](https://www.wineandchord.com/books/lcp/en.html)
- [Claude Code Interview Book](https://www.wineandchord.com/books/cc/) /
  [中文](https://www.wineandchord.com/books/zh/cc/)

## Standalone Topics

- [后缀数组例题：统计唯一子数组数量](https://www.wineandchord.com/books/sa/unique-subarray.html) /
  [English](https://www.wineandchord.com/books/sa/unique-subarray-en.html)

## Articles and Guides

- [AI Agent Readlist](https://www.wineandchord.com/books/ai-agent-readlist/)
- [DeepSeek V4 模型技术大全](https://www.wineandchord.com/books/deepseek/)
- [Claude Code 和 Codex 的 Prompt Cache 设计](https://www.wineandchord.com/books/prompt-cache/)
- [上下文管理：从 Codex、Claude Code、OpenClaw、Hermes 到开源 Memory 生态](https://www.wineandchord.com/books/context/)

## Index Maintenance

Every new public `/books/` entry point must update this README index in the
same change. This includes new books, articles, guides, landing pages, and
standalone public subpaths. Generated chapter pages, spec pages, changelogs,
JSON data endpoints, and static assets only need README entries when they are
intended to be standalone public entry points.

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
