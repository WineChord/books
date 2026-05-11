# WineChord Books

This repository hosts long-form online books for
`www.wineandchord.com/books/`.

## Books

- [Codex From Source](https://www.wineandchord.com/books/codex-from-source/)

## Development

```bash
npm ci
npm run dev
```

Build and verify the static output:

```bash
npm run build
npm run check:dist
```

The repository intentionally does not include a `CNAME` file. GitHub Pages
project sites inherit the custom domain configured on
`WineChord/WineChord.github.io`.

