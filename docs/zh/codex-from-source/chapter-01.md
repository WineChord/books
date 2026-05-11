# 第 1 章：阅读策略

<div class="chapter-lede">
  <p><strong>你在这里：</strong>在阅读具体函数之前，先建立产品循环地图。</p>
  <p><strong>问题：</strong>Codex 足够大，初学者很容易还没看清系统形状就被文件淹没。</p>
  <p><strong>心智模型：</strong>追踪一次用户请求如何变成消息、模型调用、工具调用、受保护的副作用和 UI 事件。</p>
</div>

阅读 Codex 最容易犯的错，是一上来找最大的文件。更稳的方法是跟随一个普通动作：

> 用户要求 Codex 修改代码，并期待得到有用、可审查的工作结果。

这一句话已经包含整个架构。Codex 需要入口接收意图，需要协议表达意图，需要 session runtime 调模型，需要工具层检查或修改文件，需要安全边界监督副作用，还需要接入面把进度报告给用户。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| 用户可见模式 | [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | 展示用户能从哪些入口进入系统。 |
| Runtime 请求 | [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) | 命名 core runtime 能接收的操作。 |
| Runtime 响应 | [`EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1090) | 命名客户端能观察到的事实。 |
| Session facade | [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | 给出 runtime 的发送/接收形状。 |

</div>

## 从产品循环开始

公开 Codex 材料描述的是一个能读文件、运行命令、编辑代码并展示审查证据的软件工程 Agent。ReAct 论文提供了一个有用背景：推理、行动、观察会交替发生。我们不应说 Codex 是那篇论文的直接实现，但这个循环对理解系统很有帮助：

<div class="flow">
  <div><strong>意图</strong>用户请求从 CLI、TUI、exec 或 app-server 进入。</div>
  <div><strong>状态</strong>Session 收集历史、配置、指令和工具。</div>
  <div><strong>行动</strong>模型产生结构化 response items 和 tool calls。</div>
  <div><strong>观察</strong>工具输出变成协议数据和 UI 进度。</div>
  <div><strong>决策</strong>Runtime 继续、压缩上下文、请求审批或完成。</div>
</div>

读任何文件时都问一句：这个文件是在接收意图、承载状态、执行行动、记录观察，还是守住边界？这个问题能避免你把每个 helper 都看得一样重要。

## 先读类型，再读函数

Rust 系统经常通过类型暴露设计。函数体说明“怎么做”，公开 enum 说明“能做什么”。所以本书从 `Subcommand`、`Op`、`Submission`、`Event`、`EventMsg` 开始。

`Subcommand` 是用户可见菜单。它告诉你 Codex 不只是 TUI，还有 exec mode、MCP commands、app-server mode、login、cloud task、sandbox debug 等路径。`Op` 是 runtime 菜单，展示 core 能接收用户 turn、中断、审批、dynamic tool response、MCP refresh、review、thread rollback 和用户 shell command。`EventMsg` 是可观察菜单，告诉客户端能渲染或响应什么。

设计经验很简单：类型就是契约。如果一个请求以 enum variant 的形式跨越边界，读者就能在不知道所有私有 helper 的情况下推理这个边界。

## 第一条阅读路径

| 步骤 | 阅读 | 问题 |
| --- | --- | --- |
| 1 | `codex-cli/bin/codex.js` | 安装后的命令如何找到 native binary？ |
| 2 | `cli/src/main.rs` | 哪个模式拥有这个用户请求？ |
| 3 | `protocol/src/protocol.rs` | 哪个 operation 表示这个请求？ |
| 4 | `core/src/session/mod.rs` | operation 如何提交给 session？ |
| 5 | `core/src/session/turn.rs` | turn 如何变成模型调用和工具调用？ |
| 6 | `core/src/tools` | 哪些副作用被允许、拒绝或上报？ |

不要先背所有 crate。第一目标是看见主干。

<div class="apply-this">

## Apply This

- 先读公开边界类型，再读私有 helper。
- 用一个真实用户场景贯穿代码库。
- 区分产品词汇和实现词汇。
- 先理解“可能发生什么”，再研究“哪个文件最大”。

</div>

## 接下来读源码

- [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)：列出用户可见模式。
- [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)：按 user turn、approval、MCP、review、control 分组。
- [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)：注意 queue-pair 形状。

<div class="exercise-box">

## 阅读练习

打开 `Subcommand`、`Op` 和 `EventMsg`。先不读函数体，写下 Codex 至少必须支持的五种能力。然后检查这些能力是否能在本书目录中找到对应章节。

</div>

<div class="next-step">

## 下一章

有了阅读策略之后，下一章会画出仓库地图，让你知道哪些 crate 负责入口、协议、runtime、工具、安全和用户接入面。

</div>
