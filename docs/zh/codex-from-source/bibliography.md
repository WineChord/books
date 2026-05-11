# 参考文献

## Codex 一手资料

- OpenAI, [Introducing Codex](https://openai.com/index/introducing-codex/),
  2025 年 5 月 16 日。用于理解 Codex 作为软件工程 agent 的公开定位，包括隔离任务
  环境、文件编辑、命令执行、证据和 review 工作流。
- OpenAI,
  [Codex is now generally available](https://openai.com/index/codex-now-generally-available/),
  2025 年 10 月 6 日。用于理解 terminal、editor、cloud、Slack、SDK 和 admin 能力
  的产品演进。
- OpenAI,
  [Introducing upgrades to Codex](https://openai.com/index/introducing-upgrades-to-codex/),
  2025 年 9 月。用于谨慎讨论 Codex 专用模型和 agentic coding 工作流。
- OpenAI, [openai/codex](https://github.com/openai/codex)。本书分析的公开源码仓库。
- OpenAI Developers,
  [Docs MCP](https://developers.openai.com/learn/docs-mcp)。用于理解 OpenAI 维护的
  Codex 连接 MCP server 示例。

## Agent 与工具使用

- Shunyu Yao 等,
  [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629),
  2022。用于解释推理、行动、观察和继续决策交替发生的概念背景。
- Google Research,
  [ReAct: Synergizing Reasoning and Acting in Language Models](https://research.google/blog/react-synergizing-reasoning-and-acting-in-language-models/),
  2022 年 11 月 8 日。用于更直观地解释 ReAct。
- Timo Schick 等,
  [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761),
  2023。用于理解模型何时、如何使用工具的更大背景。
- OpenAI,
  [Function calling and other API updates](https://openai.com/index/function-calling-and-other-api-updates/),
  2023 年 6 月 13 日。用于说明 OpenAI API 中结构化工具/函数调用的历史背景。

## MCP 与集成

- Anthropic,
  [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol),
  2024 年 11 月 25 日。用于 MCP 公开动机。
- Model Context Protocol project,
  [Specification](https://modelcontextprotocol.io/specification/2024-11-05/index)。
  用于 MCP client、server、capability 和 JSON-RPC 的协议级表述。
- Model Context Protocol project,
  [Architecture](https://modelcontextprotocol.io/docs/learn/architecture)。
  用于解释 host-client-server 结构。

## Rust、TUI 与异步背景

- Ratatui project, [Ratatui](https://ratatui.rs/)。用于终端 UI 背景。
- docs.rs, [ratatui crate documentation](https://docs.rs/ratatui/latest/index.html)。
  用于 widgets、layout、frames 和 terminal rendering 概念。
- Tokio project, [Async in depth](https://tokio.rs/tokio/tutorial/async) 和
  [Channels](https://tokio.rs/tokio/tutorial/channels)。用于异步和消息传递背景。

## 安全与发布

- OWASP,
  [Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)。
  用于 prompt injection、excessive agency 和工具相关风险词汇。
- NIST,
  [Artificial Intelligence Risk Management Framework 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10),
  2023 年 1 月 26 日。用于一般风险管理表述。
- containers/bubblewrap,
  [README](https://github.com/containers/bubblewrap/blob/f4cbeb44f293d21ef93aaf88b9bd2f4e229748ad/README.md)。用于 Linux
  沙箱背景。
- GitHub Docs,
  [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)。
  用于用户站点 custom domain 下的 project site 行为说明。
- Claude Code from Source,
  [Architecture, Patterns & Internals](https://claude-code-from-source.com/)。
  仅用于学习书籍结构上的优点：分部导航、学习目标、过程透明度、架构图和每章可迁移模式。
