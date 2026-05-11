# 第 3 章：CLI 入口

<div class="chapter-lede">
  <p><strong>你在这里：</strong>用户已经输入命令，但 Agent loop 还没有开始。</p>
  <p><strong>问题：</strong>入口代码要把复杂命令行现实转换成干净的 runtime 选择。</p>
  <p><strong>心智模型：</strong>CLI 像火车站：卖票、查站台、把乘客送到正确线路。</p>
</div>

入口应该薄，但不等于简单。它处理平台选择、参数、配置覆盖、认证命令、沙箱调试工具、MCP 管理、app-server mode 和普通交互使用。它的职责不是实现整个 Agent，而是选对真正的 owner。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Native binary selection | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | npm package 启动平台相关 binary，而不是用 JavaScript 实现 Agent。 |
| 顶层 CLI 模式 | [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | 定义主要用户入口。 |
| app-server route | [`Subcommand::AppServer`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L130) | 说明 Codex 不只是 TUI，也能作为 headless service 运行。 |
| MCP CLI | [`mcp_cmd.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39) | 展示外部 MCP servers 的管理命令。 |

</div>

## 命令分发表

| 用户路径 | CLI 表示 | 目标 |
| --- | --- | --- |
| `codex` 无子命令 | 解析后的默认分支 | 启动交互式终端体验。 |
| `codex exec ...` | exec-style subcommand | 为自动化运行非交互 turn。 |
| `codex app-server` | `Subcommand::AppServer` | 启动 JSON-RPC service 接入面。 |
| `codex mcp-server` | MCP-server subcommand | 把 Codex 自身作为 MCP server 暴露给外部 MCP clients。 |
| `codex mcp ...` | `Subcommand::Mcp` | 管理 MCP server 配置和认证。 |
| login/logout/auth | auth subcommands | 在运行时使用前更新账号状态。 |
| sandbox/debug | debug subcommands | 诊断执行边界。 |

这个表是一种阅读技巧。知道哪个分支拥有哪个模式之后，就可以停止阅读无关分支。初学者不应该在读 login 行为时顺手陷入 app-server routing。

## 配置也是输入

用户文字不是唯一输入。Codex 还接收工作目录、模型选择、approval policy、sandbox policy、feature flags、profiles、环境选择和持久配置层。这些设置会塑造后续 session 能做什么。

| 设置 | 后续影响 |
| --- | --- |
| `cwd` | 决定工具检查哪个仓库，也决定沙箱规则如何解释路径。 |
| Model | 影响模型指令、流式行为和 reasoning 设置。 |
| Approval policy | 控制 shell 或改文件工具何时请求权限。 |
| Sandbox policy | 控制文件系统、网络和平台执行约束。 |
| MCP config | 决定 turn 里可能出现哪些外部工具。 |

配置还有层级和来源。源码读者会追问一个值来自默认值、用户 config、profile、CLI override、managed requirement、environment variable，还是 app-server config write。Auth 也类似：login state、API keys、connector credentials、MCP OAuth credentials 和 account/rate-limit requests 都会影响后续 runtime。

| 入口相关关注点 | 为什么影响后续行为 |
| --- | --- |
| config loader | 把 defaults、profiles、overrides 和 requirements 合并成类型化设置 |
| login/auth library | 在模型调用或 app-server 请求前提供账号状态 |
| app-server config writes | 可改变持久设置，并要求 runtime cache reload |
| MCP OAuth | 决定配置的 MCP/app tools 是否可用 |
| managed constraints | 可能强制或禁用行为，覆盖本地用户偏好 |

## 薄不等于笨

好入口会避免深业务逻辑，但仍然要完成干净交接。Codex CLI 知道如何解析模式和准备 runtime 参数；core session 知道如何运行 turn；app-server 知道如何路由 JSON-RPC 请求。这个分离避免 CLI 变成所有产品行为唯一可演进的位置。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 3 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 已通过安装后的命令或 Rust CLI mode 进入。 |
| 什么数据结构携带它？ | Subcommand parsing、config layers、auth state、cwd、model、approval、sandbox 和 app/MCP settings。 |
| 谁拥有下一步决策？ | CLI routing 选择 TUI、exec、app-server、MCP server/client management、login 或 debug owner。 |
| 这里可能怎么失败？ | config 无效、auth 缺失、managed constraints、mode 不支持、cwd 错误，或路由到错误 owner。 |

</div>

<div class="apply-this">

## 应用到实践

- 让入口成为 router，而不是隐藏 runtime。
- 把配置视为一等输入。
- 阅读大型 CLI 时建立 command dispatch table。
- 让专门 crate 拥有专门行为。

</div>

## 接下来读源码

- [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15)：查看 native-binary handoff。
- [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)：给用户模式分类。
- [`McpCli`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39)：观察一个 subcommand family 如何独立成模块。

<div class="exercise-box">

## 自检题

不打开源码回答：为什么 `codex exec` 不是“没有图形的 TUI”？列出五个会改变后续 turn 的非 prompt 输入。

</div>

<div class="exercise-box">

## 可选源码实验

选择三个 `Subcommand` variants。分别找到处理它们的 match branch，并写下真正拥有行为的 crate 或 module。这个练习训练你区分“路由”和“实现”。

</div>

<div class="next-step">

## 下一章

入口代码选好路径后，Codex 需要稳定消息。下一章会研究协议层：产品行为如何变成类型化 operation、event、request 和 notification。

</div>
