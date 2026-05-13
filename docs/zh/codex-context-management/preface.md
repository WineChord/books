# 前言

这本书只讲 Codex 的一个核心主题：上下文管理。很多 agent 文章会先讲工具、模型和界面，但 Codex 最值得拆开的地方在于：它没有把上下文当作不断增长的字符串，而是把上下文当作受 runtime 治理的状态。

全书固定到这个公开源码快照：
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。
你应当可以只读书先理解系统，源码链接用于审计，而不是阅读前置条件。

## 核心论点

这本书的核心论点是：

> Codex 让长时间 agent 工作保持连贯的方式，是把上下文作为运行时边界治理，而不是把它当作 prompt 拼接工具。

这个论点解释了整个子系统的形状。一次 turn 有显式 envelope。历史在采样前被归一化。运行时事实通过类型化 fragment 注入。可选上下文有预算。压缩安装 replacement history。resume 和 fork 从 rollout 证据重建 prompt 状态。客户端可以渲染上下文状态，但不能拥有它。

## 本书覆盖什么

| 层次 | 你会学到什么 |
| --- | --- |
| Turn envelope | 模型、策略、workspace、tools、hooks 和 feature gates 如何被收束到一次 turn。 |
| History ledger | response items 如何变成可发送给模型的 prompt history。 |
| Context fragments | 环境、权限、realtime、skills、plugins、hooks 和 memory 如何变成模型可见状态。 |
| Budgeting | Codex 如何避免可选上下文吞掉整个窗口。 |
| Compaction | 长线程如何被重写为 checkpointed replacement history。 |
| Replay | resume、rollback、fork 如何重建有效上下文。 |
| Client surfaces | TUI、app-server、realtime、trace 与 token usage 如何展示上下文但不拥有上下文。 |

## 阅读方式

架构读者可以重点读每章开头、图、取舍和“应用模式”。实现读者应当通读所有章节，因为真正的知识不在“摘要旧消息”，而在“如何把可变 prompt projection 绑定到可审计证据”。

本书不会复刻源码中的 prompt 模板或具体函数体。出现的代码块都是说明模式的伪代码。
