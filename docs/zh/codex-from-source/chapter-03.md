# 第三章：CLI 入口

顶层命令是程序的前台。它不负责亲自完成所有工作，而是理解用户要什么，然后把请求
交给合适的子系统。

## Clap 模型

Codex 使用 `clap` 这个 Rust 命令行解析库。核心类型是
[`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L79)
里的 `MultitoolCli`。这个名字很准确：一个 `codex` 可执行文件里包含许多工具。

`Subcommand` enum 从
[`main.rs#L106`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)
附近开始。每个 variant 都是一种用户可见模式：交互式 TUI、非交互 exec、review、
登录、MCP 管理、插件管理、app-server、沙箱辅助、调试工具等等。

enum 很适合这里。一个命令要么是 `Exec`，要么是 `Login`，要么是 `McpServer`。编译器
能帮助路由代码覆盖已知情况。

## 分发，而不是全权拥有

真正的分发逻辑在同一个文件更靠后的
[`cli_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L803)。
重要的设计点是：CLI 不拥有所有行为，它会调用其他 crate。

<div class="flow">
  <div><strong>无子命令</strong>启动交互式终端 UI。</div>
  <div><strong><code>exec</code></strong>运行非交互自动化。</div>
  <div><strong><code>app-server</code></strong>暴露 JSON-RPC 传输。</div>
  <div><strong><code>mcp</code></strong>管理 MCP server 配置。</div>
</div>

这样命令解析器不会变成应用巨石。CLI 决定去哪里，目标 crate 决定怎么工作。

## 三个主要用户界面

Codex 有三个应该分开理解的入口：

1. 交互式 TUI，通过
   [`codex_tui::run_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710)
   启动。
2. 非交互 exec，核心实现在
   [`codex_exec::run_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec/src/lib.rs#L233)
   附近。
3. app-server，通过
   [`run_main_with_transport_options`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433)
   启动。

不要把 TUI 当成“整个应用”。TUI 是一个客户端，exec 是另一个客户端，app-server 的
调用方又是一类客户端。它们都需要创建 thread、启动 turn、接收 event、回答 approval。

## 配置很早就进入系统

CLI 解析还会收集配置覆盖项。用户可能通过参数影响模型选择、沙箱行为、审批模式、
工作目录或 profile。这些参数不会自己执行 agent 循环，而是变成后续模块读取的有效
配置。

这是一种常见系统模式：入口尽快把输入规范化，然后向下传递类型化配置。否则每个模块
都要解析原始命令行字符串，耦合会迅速扩大。

