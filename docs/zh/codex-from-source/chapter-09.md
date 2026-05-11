# 第九章：TUI 与 App Server

终端 UI 是许多用户最先看到的界面，但 app-server 架构让 Codex 不只服务一个客户端。
本章把可见界面和背后的 headless 协议层连起来。

## TUI 启动

TUI 从
[`codex-rs/tui/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710)
启动。它准备终端状态，连接到 app-server 方向的会话层，然后运行交互式应用。主要
应用状态在
[`tui/src/app.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app.rs#L590)。

Ratatui 是理解这里的好背景。终端 UI 不是浏览器 DOM。它通常维护应用状态、接收输入
事件，并重复绘制 frame。这种模型鼓励把状态更新和渲染分开。

## App-server 是共享界面

App server 从
[`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433)
启动。
[`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272)
里的请求路由器把 JSON-RPC 请求映射到 thread、turn、model、plugin、MCP resource、
shell command 等处理器。

这说明 app-server 不只是给单独的桌面端或 IDE 客户端用。它也是组织边界。即使是本地
流程，也可以共享请求/通知形状，而不是每个 UI 都发明一条私有路径直接进入 core。

## 从 server event 到屏幕

<div class="flow">
  <div><strong>Core 事件</strong>session 发出 <code>EventMsg</code>。</div>
  <div><strong>映射</strong>app-server 把它映射成 notification。</div>
  <div><strong>客户端</strong>TUI 或其他客户端接收。</div>
  <div><strong>状态</strong>UI 更新本地 view state。</div>
  <div><strong>Frame</strong>Ratatui 渲染下一帧终端画面。</div>
</div>

映射层很重要，因为好的 UI 不应该暴露每个内部实现细节，而应该收到语义层级合适的
事件：turn started、command running、approval needed、patch applied、message
complete。

## 为什么这个架构能扩展

如果 Codex 只有一个终端 UI 直接调用 core 内部，要支持 IDE、桌面应用、后台自动化或
测试客户端行为都会更困难。协议化 app-server 边界让新客户端复用同一个底层 agent
运行时。

这也是本书最后总结的架构模式：Codex 通过类型化边界成长。CLI 边界、app-server
边界、core protocol 边界、tool 边界、sandbox 边界、MCP 边界。每个边界都把无边界
问题变成可以测试、review 和演进的契约。

