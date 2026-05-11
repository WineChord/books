# 第 2 章：仓库地形

<div class="chapter-lede">
  <p><strong>你在这里：</strong>产品循环需要落到实际目录和 crate 上。</p>
  <p><strong>问题：</strong>Rust workspace 如果不按责任分组，看起来就是一堆平铺的 crates。</p>
  <p><strong>心智模型：</strong>Codex 像一座城市：入口、道路、调度中心、工坊、守卫岗和公共服务台。</p>
</div>

Codex 不是一个巨大二进制里塞满所有逻辑，而是一个 Rust workspace。workspace 边界很重要，因为它们暴露所有权。CLI 不应该知道 patch application 的每个细节；TUI 不应该拥有模型循环；protocol crate 不应该依赖终端渲染。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Rust workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | 列出 crate 级所有权单元。 |
| npm launcher | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | 展示 JavaScript 安装壳如何启动 native binary。 |
| app-server crate | [`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433) | 暴露供其他客户端使用的 headless service 接入面。 |
| core runtime | [`core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | 拥有主要 Agent runtime。 |

</div>

## 主要家族

| 家族 | 代表路径 | 责任 |
| --- | --- | --- |
| 安装与入口 | `codex-cli`, `codex-rs/cli` | 启动正确二进制、解析命令、路由用户模式。 |
| 协议 | `protocol`, `app-server-protocol` | 定义 operation、event、app-server request、response 和 schema。 |
| 运行时 | `core`, `exec`, `apply-patch` | 管理 sessions、turns、model calls、tools、subprocesses 和 edits。 |
| 用户接入面 | `tui`, `app-server`, `app-server-client` | 渲染交互终端状态或服务外部客户端。 |
| 集成 | `codex-mcp`, `config`, `plugin`, `core-skills` | 加载 MCP servers、plugins、skills 和配置。 |
| 安全与执行 | `sandboxing`, `linux-sandbox`, `execpolicy`, `cloud-requirements` | 约束文件系统、网络、审批和环境行为。 |
| 观测与存储 | `analytics`, `rollout-trace`, `agent-graph-store` | 记录调试、telemetry 和 trace 分析所需信息。 |

这个表比字母顺序的 crate 列表更有用，因为它给每个文件一个问题：“这个责任应该属于哪个家族？”如果某个文件跨越了多个家族，就应该慢下来读，它往往是关键设计点。

## Inbound / Outbound 阅读法

对每个 crate 问两个问题：

1. 谁会调用这个 crate？
2. 这个 crate 又调用谁？

Protocol crates 多数是 inbound contract：很多层使用它们，但它们应该保持轻和稳定。Core crate 是枢纽：接收 operations、调用 model clients、分发 tools、连接 MCP、发出 events、请求安全层做决定。TUI 是 protocol events 的客户端：它应该渲染状态，而不是拥有 Agent loop。

## 场景在地图上的路径

当用户要求改代码时，大致路径是：

<div class="flow">
  <div><strong>CLI/TUI</strong>接收 prompt 和当前设置。</div>
  <div><strong>Protocol</strong>把请求表达成类型化数据。</div>
  <div><strong>Core</strong>创建或复用 session 并运行 turn。</div>
  <div><strong>Tools</strong>读文件、运行命令、应用补丁或调用 MCP。</div>
  <div><strong>Surface</strong>渲染进度、审批、diff 和完成状态。</div>
</div>

重点不是每次请求都会用到每个 crate，而是每个 crate 家族都有存在理由。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 2 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 正被放进仓库 ownership 地图。 |
| 什么数据结构携带它？ | crate boundaries、dependency direction 和公开 protocol surfaces。 |
| 谁拥有下一步决策？ | ownership boundaries 决定入口、协议、runtime、工具、安全或呈现分别由哪个 crate 处理。 |
| 这里可能怎么失败？ | 读者可能把行为归给错误 crate，尤其把 UI presentation 和 agent runtime ownership 混在一起。 |

</div>

<div class="apply-this">

## 应用到实践

- 先按责任给大型仓库分组。
- 关注所有权边界，不只看模块名。
- 用 inbound/outbound 问题识别架构枢纽。
- 期待安全和 UI 是分离关注点，即使它们会在运行时相遇。

</div>

## 接下来读源码

- [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1)：识别 crate 家族。
- [`app-server/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/README.md#L1)：查看外部 API 接入面。
- [`linux-sandbox/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/README.md#L1)：看一个安全组件如何描述边界。

<div class="exercise-box">

## 自检题

不打开源码回答：为什么 UI crate 应该消费 protocol events，而不是拥有 agent loop？用一句话解释 inbound dependency 和 outbound dependency。

</div>

<div class="exercise-box">

## 可选源码实验

从 `codex-rs/Cargo.toml` 里选五个 crate。给每个 crate 写一句责任说明，并把它归入上表的一个家族。归不进去的 crate，往往值得更仔细阅读。

</div>

<div class="next-step">

## 下一章

下一章从最可见的入口开始：安装后的命令和 Rust CLI 如何把用户路由进系统其他部分。

</div>
