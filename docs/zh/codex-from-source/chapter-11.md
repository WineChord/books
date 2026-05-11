# 第 11 章：MCP、Apps、Skills、Plugins

<div class="chapter-lede">
  <p><strong>你在这里：</strong>核心循环已经工作，现在外部能力进入 turn。</p>
  <p><strong>问题：</strong>扩展必须增加工具或指令，但不能把 runtime 变成一堆特判。</p>
  <p><strong>心智模型：</strong>扩展是进入 turn 的 imports：有的增加 context，有的增加 tools，有的增加 app-visible capability。</p>
</div>

Codex 有多种扩展概念。MCP servers 暴露外部 tools 和 resources。Apps/connectors 通过插件和可访问工具 inventory 暴露外部能力。Skills 给 turn 添加 instruction bundles。Plugins 打包能力。Subagents 和 collaboration features 能创建新的 runtime participants。它们相关，但不是同一个东西。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| MCP config type | [`McpServerConfig`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | 表示用户配置的 MCP servers。 |
| MCP CLI | [`McpCli`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39) | 让用户从 CLI 管理 MCP servers。 |
| Turn skill handling | [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L170) | 显示 explicit skill mentions 如何成为 turn-scoped context。 |
| App-server catalog | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1069) | 路由 skills、hooks、plugins、apps、MCP requests。 |

</div>

## 扩展概念对照

| 概念 | 增加什么 | 第一问题 |
| --- | --- | --- |
| MCP server | 外部 tools/resources | transport、auth、tool schemas 是什么？ |
| App/connector | app-visible capability | connector 是否可访问且在 turn 中启用？ |
| Skill | 指令和可选依赖 | skill 是否被显式 mention 或选择？ |
| Plugin | 打包 skills、hooks、apps、MCP servers | 哪些 bundled capabilities 被 config 启用？ |
| Dynamic tool | client-provided execution path | 哪个 client 拥有 execution 和 response？ |
| Subagent | 另一个 agent runtime participant | 它是新 loop、child thread 还是 collaboration tool？ |

这个表能避免常见误解：不是所有扩展都只是“工具”。有的增加 model-visible tools，有的增加 instructions，有的增加 app metadata，有的影响 hooks 或 prompts。

## Turn-Scoped Injection

Turn loop 在 sampling 前收集 explicit skill mentions 和 app/plugin mentions。Apps 启用或 plugin mentions 需要原始 inventory 时，它会列出 MCP tools。然后构造 skill 和 plugin injections 作为 conversation items。这是有纪律的形状：扩展成为本次 turn 的显式 context，而不是不可见的全局魔法。

这也帮助复现。如果 turn 使用了 skill，被注入的 instruction item 可以被记录。如果 plugin 贡献了 tools，也可以结合当时的 inventory 理解这次 turn。

## MCP 是通用工具边界

Model Context Protocol 重要，是因为它给外部 servers 一个标准方式来提供 tools 和 resources。Codex 仍然要做产品工程：configuration、OAuth、status、refresh、resource reads、tool calls、progress notifications 和 elicitation requests。

标准减少集成形状，但不会消除集成劳动。

## 术语规则

- **Skill**：可以注入 turn 的指令。
- **Plugin**：可以打包 skills、hooks、apps 和 MCP server declarations 的包。
- **App/connector**：通过 app system 暴露的外部能力。
- **MCP tool**：由 MCP server 暴露的可调用工具。

术语分清楚，源码才好读。

<div class="apply-this">

## Apply This

- 在 turn boundary 显式引入 extension capability。
- 区分 instruction extensions 和 tool extensions。
- 把标准协议当作起点，而不是完整产品。
- 术语要严格，用户才知道系统获得了什么能力。

</div>

## 接下来读源码

- [`McpServerConfig`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118)：从用户配置的 MCP 形状开始。
- [`collect_explicit_skill_mentions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L222)：看文本和结构化 skill items 如何变成 injections。
- [`ClientRequest::SkillsList`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1069)：查看 app-server catalog routing。

<div class="exercise-box">

## 阅读练习

选择一个能力：“invoke a skill”、“list MCP server status” 或 “read a plugin skill”。找到 CLI 或 app-server 入口，再追踪它如何变成 turn context、catalog data 或 tool call。

</div>

<div class="next-step">

## 下一章

最后一章研究用户接入面。同一个 runtime event stream 可以驱动终端 UI，也可以驱动 JSON-RPC app-server，但二者的呈现责任不同。

</div>
