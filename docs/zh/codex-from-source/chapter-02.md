# 第二章：仓库地形

Codex 的组织方式是：外层一个小的 JavaScript 包，里面包着一个大的 Rust workspace。
这个选择很现实。npm 是很多开发者熟悉的 CLI 分发渠道，而 Rust 适合实现跨平台终端
程序、进程管理、文件操作、异步流和平台沙箱。

## 外层壳

仓库根目录有用于维护 monorepo 的
[`package.json`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/package.json)，
CLI 包位于
[`codex-cli`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli)。
包装脚本
[`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L175)
负责启动原生 binary。它像启动器，不是大脑。

真正的大脑是
[`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1)
声明的 Rust workspace。workspace 里有很多 crate，因为 Codex 要处理配置、登录、
协议、TUI、app-server、模型 provider、MCP、工具、执行策略、沙箱、rollout 存储等
一系列职责。

## 按角色给 crate 分组

为了读起来不乱，可以先按角色分组：

<div class="source-grid">
  <div class="source-card">
    <h3>入口</h3>
    <p><code>cli</code>、<code>tui</code>、<code>exec</code>、<code>app-server</code>。</p>
  </div>
  <div class="source-card">
    <h3>运行时</h3>
    <p><code>core</code>、<code>protocol</code>、<code>thread-store</code>、<code>rollout</code>。</p>
  </div>
  <div class="source-card">
    <h3>外部 I/O</h3>
    <p><code>codex-api</code>、<code>model-provider</code>、<code>codex-mcp</code>、<code>connectors</code>。</p>
  </div>
  <div class="source-card">
    <h3>边界</h3>
    <p><code>exec</code>、<code>execpolicy</code>、<code>sandboxing</code>、<code>linux-sandbox</code>。</p>
  </div>
</div>

这不是官方术语，而是阅读辅助。重点是：Codex 把用户界面和核心运行时分开。终端 UI
和 headless app-server 可以共享同一套底层会话逻辑。

## 为什么有很多小 crate

初学者常常以为一个应用就应该是一个包。Rust workspace 鼓励另一种风格：按稳定职责
拆分代码。对 Codex 来说，这有几个好处。

第一，构建边界让依赖关系更明确。沙箱 crate 可以依赖进程和平台工具，但不需要拖入
UI 代码。第二，测试可以聚焦更小单元。第三，有些 crate 可以作为可复用库暴露出来，
而其他模块保持私有。

核心库入口
[`codex-rs/core/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/lib.rs#L1)
本身就是一张目录表。里面列出了 session、tools、config、MCP、skills、sandboxing、
rollout、safety、thread manager 等模块。

## 第一条架构经验

这个仓库不是按页面组织的，而是按能力和契约组织的。CLI 是一扇门。TUI 是一扇门。
App-server 是另一扇门。门后面同一套源码需要回答：

- 用户意图是什么？
- 哪些配置和权限生效？
- 当前可用的模型和工具是什么？
- 工具调用如何被监督？
- 事件如何持久化并回传？

这样看，长长的 crate 列表就不再是噪声，而是一组职责明确的系统。

