# 写作流水线

本书使用 source-first 的多 Agent 工作流。这样做不是为了形式感，而是为了防止源码解释漂移成没有证据的猜测。每个角色都有窄职责和明确产物。

| 阶段 | 角色 | 产物 |
| --- | --- | --- |
| 1 | 架构探索 agents | 仓库地图、主要 crates、执行流、源码阅读风险和章节候选。 |
| 2 | 交叉引用 agents | topic-to-source atlas，包含固定到公开 GitHub commit 的链接。 |
| 3 | 外部研究 agents | Codex、ReAct、MCP、sandboxing、TUI、async Rust、安全语言、GitHub Pages 的公开资料。 |
| 4 | Benchmark reviewer | 学习参考站的可迁移结构：学习目标、分部目录、图示、章节结尾、源码策略和过程透明度。 |
| 5 | 章节写作 agents | 地图、协议、runtime、tools、boundaries、integrations、client surfaces 的草稿。 |
| 6 | 双语 reviewer | 中文完整性、术语一致性、缺失练习和初学者可读性。 |
| 7 | Integrator | 统一语气、双语镜像结构、VitePress 导航、视觉 callouts 和校验脚本。 |
| 8 | Verifier | build、私有路径扫描、双语文件配对、固定源码链接、metadata、内链和 Pages 发布检查。 |

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
- `npm run build` 确认 VitePress 能渲染所有页面并生成 sitemap。
- `npm run check:dist` 扫描生成站点中的私有路径、本地文件 URL、必要 metadata 和损坏的 generated `href`/`src` target。
- `npm run verify` 按 CI 使用的顺序运行全部检查。

目标很朴素：让本书可复现、有源码证据、中英文同步，并且可以安全发布到公开 WineChord 域名下。
