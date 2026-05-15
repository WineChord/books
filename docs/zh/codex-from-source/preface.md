# 前言

本书是对公开 [OpenAI Codex 仓库](https://github.com/openai/codex) 的源码等价导读。 它不是 OpenAI 私有模型训练栈、托管云服务或内部后端的说明。全书使用的源码快照是 [`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。

默认目标是：你不打开源码，只读本书，也能掌握源码读者会保留下来的架构、控制流、数据合同、失败路径、策略层和客户端接入面。源码链接用于证据和行级审计，不是理解正文的前置条件。

Codex 值得研究，是因为它不是一个简单聊天壳。它是一个本地软件工程 Agent：有命令行入口、终端 UI、类型化协议、session runtime、工具执行、沙箱、审批、MCP 集成、Skill 加载、Plugin 支持，以及供其他客户端使用的 app-server 接入面。换句话说，它展示了一个 LLM 产品如何变成一个系统。

## 阅读约定

本书不假设你熟悉 Rust。关键术语会先按第一性原理解释：

| 术语 | 本书中的基础含义 |
| --- | --- |
| Crate | Rust 里的独立包。Codex 用 crate 把 CLI、core runtime、protocol、TUI、MCP、sandbox 等责任隔开。 |
| Enum | “这个值只能是这些情况之一”的类型。协议 enum 往往就是产品能力地图。 |
| Struct | 一组有名字的字段。公开 struct 往往说明跨边界需要携带哪些数据。 |
| Async task | 可以在等待 I/O、模型输出、用户审批或子进程时暂停的工作。 |
| Channel | 任务之间传消息的队列。Codex 的 submission queue 和 event queue 是核心模式。 |
| Event | 一个结构化事实：turn started、tool call began、output streamed、approval requested、turn completed 等。 |
| Facade | 用小接口包住大系统的门面。`Codex::spawn`、`submit`、`next_event` 就是 session runtime 的门面。 |
| 协议边界 | 代码停止共享内部实现细节、开始交换类型化消息的位置。 |

## 贯穿全书的场景

每章都会回到同一个普通场景：

> 用户要求 Codex 修改代码；Codex 理解工作区，调用工具，接收观察结果，在策略要求时请求审批，应用补丁，并报告结果。

这个场景故意保持普通。Agent 架构最好通过一条有用路径反复阅读，而不是靠死记所有文件。每章都会问：

1. 这一层解决什么问题？
2. 哪些源码文件实现了这个边界？
3. 初学者应该先看什么？
4. 哪个模式可以迁移到其他 Agent 系统？

## 从产品循环到源码循环

OpenAI 公开材料把 Codex 描述为一个可以在隔离环境里工作、运行命令、编辑文件并提供审查证据的软件工程 Agent。公开仓库展示了其中很大一部分本地架构：命令分发、终端 UI、app-server 协议、模型流式输出、工具执行、MCP，以及本地安全边界。

源码循环是：

<div class="flow">
  <div><strong>意图</strong>Prompt 从 CLI、TUI、exec mode 或 app-server 进入。</div>
  <div><strong>协议</strong>Prompt 变成 operation 或 app-server request。</div>
  <div><strong>运行时</strong>Session 记录上下文并启动 turn。</div>
  <div><strong>行动</strong>模型产生 response items 和 tool calls。</div>
  <div><strong>边界</strong>工具经过审批、沙箱、hooks 和结果上报。</div>
</div>

## 范围纪律

本书会精确措辞。基于公开源码的论断会写成“CLI 实现了”或“公开仓库暴露了”。本书不会声称描述模型权重、私有服务内部、内部部署拓扑或所有云端产品行为。

## 为什么固定源码链接

源码会变化。指向 `main` 的链接下周可能已经不是同一段代码。本书把源码链接固定到一个公开 commit，让解释可复现。如果章节说 `Op` 位于 [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)，你以后重新打开也应看到同一份代码。

## 如何使用证据表

每章都会区分叙事阅读和源码审计：

| 活动 | 目的 |
| --- | --- |
| 正文叙事 | 不打开源码也能阅读，这是默认路径。 |
| 源码地图 | 只有在需要行级验证或审计证据时，才打开固定源码链接。 |
| Apply This | 在实现模型清楚之后，提炼可迁移模式。 |

建议先读[阅读地图](reader-map.html)。它提供 30 分钟路径、2 小时路径和可选源码审计路径。本书的目标不是把你推回仓库，而是把仓库中重要的知识转成可直接阅读的书。
