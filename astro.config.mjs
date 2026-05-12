import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMermaidRaw from "./src/plugins/remark-mermaid-raw.mjs";

function preserveHtmlUrls(item) {
  const url = new URL(item.url);
  const landingPaths = new Set([
    "/books",
    "/books/codex-from-source",
    "/books/zh/codex-from-source",
  ]);

  if (landingPaths.has(url.pathname)) {
    url.pathname = `${url.pathname}/`;
  } else if (
    (url.pathname.startsWith("/books/codex-from-source/")
      || url.pathname.startsWith("/books/zh/codex-from-source/"))
    && !url.pathname.endsWith("/")
    && !url.pathname.endsWith(".html")
  ) {
    url.pathname = `${url.pathname}.html`;
  }

  return {
    ...item,
    url: url.href,
  };
}

export default defineConfig({
  site: "https://www.wineandchord.com",
  base: "/books",
  output: "static",
  publicDir: "./docs/public",
  integrations: [
    mdx({ remarkPlugins: [remarkMermaidRaw] }),
    react(),
    sitemap({ serialize: preserveHtmlUrls }),
  ],
  build: {
    format: "preserve",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 700,
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    remarkPlugins: [remarkMermaidRaw],
  },
});
