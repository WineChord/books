import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({
    base: "./docs",
    pattern: [
      "**/*.{md,mdx}",
      "!**/book-rewrite-prompt.md",
      "!**/rewrite/**",
      "!index.md",
      "!index.mdx",
      "!codex-from-source/index.md",
      "!codex-from-source/index.mdx",
      "!zh/codex-from-source/index.md",
      "!zh/codex-from-source/index.mdx",
    ],
  }),
});

export const collections = { pages };
