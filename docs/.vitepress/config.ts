import { defineConfig } from "vitepress";

const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
const sourceBase = `https://github.com/openai/codex/blob/${sourceCommit}/`;
const siteOrigin = "https://www.wineandchord.com";
const siteBase = "/books/";

function pageUrl(relativePath: string): string {
  if (relativePath === "index.md") {
    return `${siteOrigin}${siteBase}`;
  }

  if (relativePath.endsWith("/index.md")) {
    return `${siteOrigin}${siteBase}${relativePath.replace(/index\.md$/, "")}`;
  }

  return `${siteOrigin}${siteBase}${relativePath.replace(/\.md$/, ".html")}`;
}

function pageDescription(relativePath: string): string {
  if (relativePath.startsWith("zh/")) {
    return "一本中英文双语的 OpenAI Codex CLI 源码剖析在线书。";
  }

  if (relativePath === "index.md") {
    return "Long-form online books from WineChord.";
  }

  return "A bilingual source-code reading book about OpenAI Codex CLI.";
}

const enStartItems = [
  { text: "Overview", link: "/codex-from-source/" },
  { text: "Preface", link: "/codex-from-source/preface.html" },
  { text: "Reader Map", link: "/codex-from-source/reader-map.html" },
];

const zhStartItems = [
  { text: "总览", link: "/zh/codex-from-source/" },
  { text: "前言", link: "/zh/codex-from-source/preface.html" },
  { text: "阅读地图", link: "/zh/codex-from-source/reader-map.html" },
];

const enParts = [
  {
    text: "Part I: Establish the Contract",
    items: [
      { text: "1. The Architectural Bet", link: "/codex-from-source/chapter-01.html" },
      { text: "2. Distribution Wrapper to Router", link: "/codex-from-source/chapter-02.html" },
      { text: "3. Config, Auth, Requirements", link: "/codex-from-source/chapter-03.html" },
      { text: "4. Protocol Boundary", link: "/codex-from-source/chapter-04.html" },
    ],
  },
  {
    text: "Part II: Build the Runtime",
    items: [
      { text: "5. Threads and Durable State", link: "/codex-from-source/chapter-05.html" },
      { text: "6. The Turn Loop", link: "/codex-from-source/chapter-06.html" },
      { text: "7. Model Providers and Streaming", link: "/codex-from-source/chapter-07.html" },
      { text: "8. Observability and Trace", link: "/codex-from-source/chapter-08.html" },
    ],
  },
  {
    text: "Part III: Execute Side Effects",
    items: [
      { text: "9. Tool Specs and Dispatch", link: "/codex-from-source/chapter-09.html" },
      { text: "10. Shell and Filesystem Tools", link: "/codex-from-source/chapter-10.html" },
      { text: "11. Patches as Protocol", link: "/codex-from-source/chapter-11.html" },
      { text: "12. Hooks and Approval", link: "/codex-from-source/chapter-12.html" },
      { text: "13. Sandboxes and Network Policy", link: "/codex-from-source/chapter-13.html" },
    ],
  },
  {
    text: "Part IV: Open the Runtime",
    items: [
      { text: "14. App-Server Contract", link: "/codex-from-source/chapter-14.html" },
      { text: "15. SDKs and Remote Control", link: "/codex-from-source/chapter-15.html" },
      { text: "16. TUI as Event Renderer", link: "/codex-from-source/chapter-16.html" },
    ],
  },
  {
    text: "Part V: Extend the System",
    items: [
      { text: "17. MCP Runtime Tools", link: "/codex-from-source/chapter-17.html" },
      { text: "18. Skills, Plugins, Extensions", link: "/codex-from-source/chapter-18.html" },
      { text: "19. Migration and Compatibility", link: "/codex-from-source/chapter-19.html" },
    ],
  },
  {
    text: "Part VI: Coordinate Work",
    items: [
      { text: "20. Multi-Agent Coordination", link: "/codex-from-source/chapter-20.html" },
      { text: "21. Cloud Tasks and Identity", link: "/codex-from-source/chapter-21.html" },
      { text: "22. Memories and User State", link: "/codex-from-source/chapter-22.html" },
    ],
  },
  {
    text: "Part VII: Ship and Govern",
    items: [
      { text: "23. Build Systems and Contracts", link: "/codex-from-source/chapter-23.html" },
      { text: "24. Packaging and Release", link: "/codex-from-source/chapter-24.html" },
      { text: "25. CI and Governance", link: "/codex-from-source/chapter-25.html" },
      { text: "Epilogue. What to Steal", link: "/codex-from-source/epilogue.html" },
    ],
  },
];

const zhParts = [
  {
    text: "第一部：建立契约",
    items: [
      { text: "1. 架构赌注", link: "/zh/codex-from-source/chapter-01.html" },
      { text: "2. 分发包装器到 Router", link: "/zh/codex-from-source/chapter-02.html" },
      { text: "3. 配置、认证、Requirements", link: "/zh/codex-from-source/chapter-03.html" },
      { text: "4. 协议边界", link: "/zh/codex-from-source/chapter-04.html" },
    ],
  },
  {
    text: "第二部：构建运行时",
    items: [
      { text: "5. 线程与持久状态", link: "/zh/codex-from-source/chapter-05.html" },
      { text: "6. Turn Loop", link: "/zh/codex-from-source/chapter-06.html" },
      { text: "7. 模型 Provider 与流式传输", link: "/zh/codex-from-source/chapter-07.html" },
      { text: "8. Observability 与 Trace", link: "/zh/codex-from-source/chapter-08.html" },
    ],
  },
  {
    text: "第三部：执行副作用",
    items: [
      { text: "9. 工具规格与分发", link: "/zh/codex-from-source/chapter-09.html" },
      { text: "10. Shell 与文件系统工具", link: "/zh/codex-from-source/chapter-10.html" },
      { text: "11. Patch 作为协议", link: "/zh/codex-from-source/chapter-11.html" },
      { text: "12. Hooks 与审批", link: "/zh/codex-from-source/chapter-12.html" },
      { text: "13. 沙箱与网络策略", link: "/zh/codex-from-source/chapter-13.html" },
    ],
  },
  {
    text: "第四部：开放运行时",
    items: [
      { text: "14. App-Server 契约", link: "/zh/codex-from-source/chapter-14.html" },
      { text: "15. SDK 与远程控制", link: "/zh/codex-from-source/chapter-15.html" },
      { text: "16. TUI 作为事件渲染器", link: "/zh/codex-from-source/chapter-16.html" },
    ],
  },
  {
    text: "第五部：扩展系统",
    items: [
      { text: "17. MCP 运行时工具", link: "/zh/codex-from-source/chapter-17.html" },
      { text: "18. Skills、Plugins、Extensions", link: "/zh/codex-from-source/chapter-18.html" },
      { text: "19. 迁移与兼容性", link: "/zh/codex-from-source/chapter-19.html" },
    ],
  },
  {
    text: "第六部：协调工作",
    items: [
      { text: "20. 多 Agent 协作", link: "/zh/codex-from-source/chapter-20.html" },
      { text: "21. 云任务与身份", link: "/zh/codex-from-source/chapter-21.html" },
      { text: "22. Memories 与用户状态", link: "/zh/codex-from-source/chapter-22.html" },
    ],
  },
  {
    text: "第七部：发布与治理",
    items: [
      { text: "23. 构建系统与契约", link: "/zh/codex-from-source/chapter-23.html" },
      { text: "24. 打包与发布", link: "/zh/codex-from-source/chapter-24.html" },
      { text: "25. CI 与治理", link: "/zh/codex-from-source/chapter-25.html" },
      { text: "结语：值得带走的东西", link: "/zh/codex-from-source/epilogue.html" },
    ],
  },
];

const enReferenceItems = [
  { text: "Pattern Index", link: "/codex-from-source/patterns.html" },
  { text: "Source Atlas", link: "/codex-from-source/source-atlas.html" },
  { text: "Implementation Reference", link: "/codex-from-source/implementation-reference.html" },
  { text: "Bibliography", link: "/codex-from-source/bibliography.html" },
  { text: "Production Pipeline", link: "/codex-from-source/pipeline.html" },
];

const zhReferenceItems = [
  { text: "模式索引", link: "/zh/codex-from-source/patterns.html" },
  { text: "源码索引", link: "/zh/codex-from-source/source-atlas.html" },
  { text: "实现参考", link: "/zh/codex-from-source/implementation-reference.html" },
  { text: "参考文献", link: "/zh/codex-from-source/bibliography.html" },
  { text: "写作流水线", link: "/zh/codex-from-source/pipeline.html" },
];

export default defineConfig({
  title: "Codex From Source",
  description:
    "A bilingual source-code reading book about OpenAI Codex CLI.",
  base: "/books/",
  srcExclude: [
    "codex-from-source/book-rewrite-prompt.md",
    "zh/codex-from-source/book-rewrite-prompt.md",
    "codex-from-source/rewrite/**/*.md",
    "zh/codex-from-source/rewrite/**/*.md",
  ],
  cleanUrls: false,
  lastUpdated: true,
  metaChunk: true,
  sitemap: {
    hostname: `${siteOrigin}${siteBase}`,
  },
  transformPageData(pageData) {
    const url = pageUrl(pageData.relativePath);
    const description = pageData.description
      || pageData.frontmatter.description
      || pageDescription(pageData.relativePath);
    const title = pageData.title || "Codex From Source";
    const head = pageData.frontmatter.head || [];

    pageData.frontmatter.head = [
      ...head,
      ["link", { rel: "canonical", href: url }],
      ["meta", { name: "description", content: description }],
      ["meta", { property: "og:type", content: "article" }],
      ["meta", { property: "og:site_name", content: "WineChord Books" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
    ];
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
            { text: "Start", items: enStartItems },
            ...enParts,
            {
              text: "Reference",
              items: enReferenceItems,
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
            { text: "开始", items: zhStartItems },
            ...zhParts,
            {
              text: "附录",
              items: zhReferenceItems,
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
