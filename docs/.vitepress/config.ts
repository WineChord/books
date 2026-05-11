import { defineConfig } from "vitepress";

const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
const sourceBase = `https://github.com/openai/codex/blob/${sourceCommit}/`;

export default defineConfig({
  title: "Codex From Source",
  description:
    "A bilingual source-code reading book about OpenAI Codex CLI.",
  base: "/books/",
  cleanUrls: false,
  lastUpdated: true,
  metaChunk: true,
  sitemap: {
    hostname: "https://www.wineandchord.com/books/",
  },
  head: [
    ["link", { rel: "icon", href: "/books/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#111827" }],
    [
      "meta",
      {
        name: "source-commit",
        content: sourceCommit,
      },
    ],
  ],
  themeConfig: {
    logo: "/favicon.svg",
    socialLinks: [
      { icon: "github", link: "https://github.com/WineChord/books" },
    ],
    search: {
      provider: "local",
    },
    editLink: {
      pattern:
        "https://github.com/WineChord/books/edit/main/docs/:path",
      text: "Edit this page",
    },
    footer: {
      message:
        "All Codex source links point to the public openai/codex repository.",
      copyright: "Copyright 2026 WineChord",
    },
  },
  markdown: {
    config(md) {
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex("href");
        if (hrefIndex >= 0) {
          const href = token.attrs?.[hrefIndex]?.[1];
          if (href?.startsWith(sourceBase)) {
            token.attrSet("data-source-link", "codex");
          }
        }
        return self.renderToken(tokens, idx, options);
      };
    },
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/codex-from-source/",
      themeConfig: {
        nav: [
          { text: "Codex From Source", link: "/codex-from-source/" },
          { text: "Source", link: "https://github.com/openai/codex" },
        ],
        sidebar: {
          "/codex-from-source/": [
            {
              text: "Start",
              items: [
                { text: "Overview", link: "/codex-from-source/" },
                {
                  text: "Preface",
                  link: "/codex-from-source/preface",
                },
              ],
            },
            {
              text: "Part I: The Map",
              items: [
                {
                  text: "1. Reading Strategy",
                  link: "/codex-from-source/chapter-01",
                },
                {
                  text: "2. Repository Topography",
                  link: "/codex-from-source/chapter-02",
                },
                {
                  text: "3. CLI Entrypoint",
                  link: "/codex-from-source/chapter-03",
                },
              ],
            },
            {
              text: "Part II: The Agent Loop",
              items: [
                {
                  text: "4. Protocol",
                  link: "/codex-from-source/chapter-04",
                },
                {
                  text: "5. Session Runtime",
                  link: "/codex-from-source/chapter-05",
                },
                {
                  text: "6. Tools and Patches",
                  link: "/codex-from-source/chapter-06",
                },
              ],
            },
            {
              text: "Part III: Boundaries",
              items: [
                {
                  text: "7. Sandboxing and Approval",
                  link: "/codex-from-source/chapter-07",
                },
                {
                  text: "8. MCP, Apps, and Skills",
                  link: "/codex-from-source/chapter-08",
                },
                {
                  text: "9. TUI and App Server",
                  link: "/codex-from-source/chapter-09",
                },
              ],
            },
            {
              text: "Reference",
              items: [
                {
                  text: "Source Atlas",
                  link: "/codex-from-source/source-atlas",
                },
                {
                  text: "Bibliography",
                  link: "/codex-from-source/bibliography",
                },
                {
                  text: "Production Pipeline",
                  link: "/codex-from-source/pipeline",
                },
              ],
            },
          ],
        },
      },
    },
    zh: {
      label: "中文",
      lang: "zh-CN",
      link: "/zh/codex-from-source/",
      themeConfig: {
        nav: [
          { text: "Codex 源码剖析", link: "/zh/codex-from-source/" },
          { text: "源码", link: "https://github.com/openai/codex" },
        ],
        sidebar: {
          "/zh/codex-from-source/": [
            {
              text: "开始",
              items: [
                { text: "总览", link: "/zh/codex-from-source/" },
                { text: "前言", link: "/zh/codex-from-source/preface" },
              ],
            },
            {
              text: "第一部：地图",
              items: [
                {
                  text: "1. 阅读策略",
                  link: "/zh/codex-from-source/chapter-01",
                },
                {
                  text: "2. 仓库地形",
                  link: "/zh/codex-from-source/chapter-02",
                },
                {
                  text: "3. CLI 入口",
                  link: "/zh/codex-from-source/chapter-03",
                },
              ],
            },
            {
              text: "第二部：Agent 循环",
              items: [
                {
                  text: "4. 协议层",
                  link: "/zh/codex-from-source/chapter-04",
                },
                {
                  text: "5. 会话运行时",
                  link: "/zh/codex-from-source/chapter-05",
                },
                {
                  text: "6. 工具与补丁",
                  link: "/zh/codex-from-source/chapter-06",
                },
              ],
            },
            {
              text: "第三部：边界",
              items: [
                {
                  text: "7. 沙箱与审批",
                  link: "/zh/codex-from-source/chapter-07",
                },
                {
                  text: "8. MCP、Apps 与 Skills",
                  link: "/zh/codex-from-source/chapter-08",
                },
                {
                  text: "9. TUI 与 App Server",
                  link: "/zh/codex-from-source/chapter-09",
                },
              ],
            },
            {
              text: "附录",
              items: [
                {
                  text: "源码索引",
                  link: "/zh/codex-from-source/source-atlas",
                },
                {
                  text: "参考文献",
                  link: "/zh/codex-from-source/bibliography",
                },
                {
                  text: "写作流水线",
                  link: "/zh/codex-from-source/pipeline",
                },
              ],
            },
          ],
        },
      },
    },
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
