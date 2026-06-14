# 出版纪律

> **阅读契约：** 用本页理解出版纪律。跟住论断、固定证据、图示、中英文一致性和自动校验如何让固定源码的书长期可维护。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/publication-discipline-pipeline.png" alt="出版纪律流水线：展示论断纪律、固定证据、图示检查、中英文一致性、自动验证和发布门" loading="lazy" decoding="async" />
  <figcaption>出版纪律让公开书籍可维护：论断、固定证据、视觉模型、校验门禁和发布页面彼此支撑。</figcaption>
</figure>

本页描述这本书面向公开发布的维护契约。源码解释最容易在三个地方漂移：源码链接指向了新位置，图示把边界简化过头，或双语版本悄悄丢失了论断。出版流水线的目的，是在发布前让这些失败模式可见。

| 阶段 | 出版检查 | 读者可见产物 |
| --- | --- | --- |
| 1 | 论断审计 | 每个架构论断都能被公开源码或公开文档校验。 |
| 2 | 源码锚定 | Codex 源码链接固定到同一个公开 commit，并指向被解释行为的 owner。 |
| 3 | 外部证据 | 产品、研究、协议、Rust、TUI、安全和发布背景使用公开的一手或近一手来源。 |
| 4 | 视觉模型 | 图示解释控制流、所有权、信任边界、生命周期或状态，而不是装饰页面。 |
| 5 | 章节形状 | 每章说明问题、引入心智模型、命名源码 owner，并以可迁移模式收束。 |
| 6 | 双语一致 | 中英文页面保留同样论断、图片、源码锚点和练习，同时使用自然的本地表达。 |
| 7 | 站点集成 | 导航、参考页、图片资产、metadata 和内链匹配发布路由。 |
| 8 | 自动校验 | 发布前运行 build、内容、生成产物、私有路径和链接检查。 |

## Guardrails

1. 源码论断必须链接到公开 `openai/codex`，并固定到
   `569ff6a1c400bd514ff79f5f1050a684dc3afde3`。
2. 产品或研究论断必须链接到公开来源，例如 OpenAI、MCP、ReAct、Ratatui、Tokio、OWASP、NIST、GitHub Docs 或项目文档。
3. 本书不能泄露私有本机路径、本机用户名或本地文件 URL。
4. 中文版本必须是真正的版本，不是短摘要：同页、同核心论断、同练习、术语一致。

## 质量标准

每个源码阅读章节都应该包含：

- 说明问题、心智模型和核心文件的 chapter lede；
- 包含固定源码链接的 evidence map；
- 至少一个控制流、数据流或决策表；
- 一个把读者带回源码的初学者练习；
- 一个 `Apply This`，提炼可迁移工程模式；
- 一个简短的下一章衔接。

## 自动校验

- `npm run check:content` 检查双语文件配对、config/source-commit 一致性、sidebar 覆盖、私有路径泄漏和固定 Codex 源码链接。
- `npm run build` 确认 Astro 能渲染所有页面、生成静态站点和 sitemap index。
- `npm run check:dist` 扫描生成站点中的私有路径、本地文件 URL、必要 metadata 和损坏的 generated `href`/`src` target。
- `npm run verify` 按 CI 使用的顺序运行全部检查。

目标很朴素：让本书可复现、有源码证据、中英文同步，并且可以安全发布到公开 WineChord 域名下。
