# 写作流水线

本书使用源码优先的多 agent 流水线完成。这样做很重要，因为源码解读很容易滑向没有
证据支撑的判断。每个角色只负责一个窄任务，并产出可检查的结果。

| 阶段 | 角色 | 产出 |
| --- | --- | --- |
| 1 | 架构探索 agent | 仓库地图、主要 crate、执行流、章节候选。 |
| 2 | 交叉引用 agent | 主题到源码的索引表，所有链接固定到公开 GitHub。 |
| 3 | 外部资料 agent | Codex、ReAct、MCP、沙箱、TUI、async Rust、GitHub Pages 等公开资料。 |
| 4 | 媒介与部署规划 agent | VitePress + GitHub Pages project site 方案，服务 `/books/codex-from-source/`。 |
| 5 | 章节写作 agent | 仓库地图、agent 循环、工具、边界、集成、UI/app-server 等章节草稿。 |
| 6 | 集成者 | 统一文风、双语镜像结构、VitePress 导航和可视化说明块。 |
| 7 | 校验者 | 构建、私有路径扫描、双语文件配对、源码链接固定和本地预览检查。 |

## 约束

写作流水线遵循三条规则：

1. 源码判断必须指向公开 `openai/codex` 链接，并固定到
   `569ff6a1c400bd514ff79f5f1050a684dc3afde3`。
2. 产品或研究判断必须链接到公开来源，例如 OpenAI、MCP、ReAct、Ratatui、Tokio、
   OWASP、NIST、GitHub Docs 或项目文档。
3. 书中不能泄露本地私有绝对路径、本地用户名或本地文件 URL。

## 校验门禁

仓库包含两个自动门禁：

- `npm run check:content` 检查双语文件是否配对、是否有私有路径泄露，以及 Codex
  源码链接是否固定到指定 commit。
- `npm run check:dist` 扫描生成后的静态产物，避免私有路径和本地文件 URL 进入发布物。

生产构建还会运行 `npm run build`，确认 VitePress 能渲染所有页面并生成 sitemap。

这条流水线刻意保持简单。目标不是制造流程感，而是让本书可复现、有源码依据、支持
双语阅读，并能安全发布到公开的 WineChord 域名下。
