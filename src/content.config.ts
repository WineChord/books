import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({
    base: "./docs",
    pattern: [
      "**/*.md",
      "!**/book-rewrite-prompt.md",
      "!**/rewrite/**",
      "!index.md",
      "!codex-from-source/index.md",
      "!zh/codex-from-source/index.md",
    ],
  }),
});

export const collections = { pages };
