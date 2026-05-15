# 受众与定位

本页执行 Phase 2：在写大纲和正文前，先明确这本书服务谁、核心论点是 什么、为什么它值得被写成一本书。

## 核心受众

本书同时服务两类读者。

**技术负责人** 已经理解分布式系统、产品边界、API 契约和工程风险。他们 关心的是：Codex 为什么采用 thread、turn、item、event、tool 这套语言； app-server 为什么存在；执行安全为什么拆成 policy、approval、sandbox、 hooks、managed networking 多层；扩展为什么分成 MCP、skills、plugins 和 typed extensions。

**资深工程师** 希望不逐文件阅读源码，也能获得实现级理解。他们需要理解： 从命令入口到 turn loop 的控制流；从 provider registry 到 Responses streaming 的模型流；从 tool spec 到 backend execution 的工具流；从 rollout JSONL 到 SQLite projection 的持久化流；从 protocol event 到 TUI/app-server/SDK 的客户端流。

## 核心论点

Codex 的核心架构赌注是：

> 把 agent 做成一个 event-sourced runtime，并且只通过 typed contracts、
> policy gates 和 replayable boundaries 暴露危险能力。

这解释了几乎所有子系统：

- CLI 很薄，因为长期行为属于共享 runtime；
- protocol 很重，因为 client、SDK、replay 和 tests 需要同一套词汇；
- session loop 是队列驱动的，因为 user input、model streaming、tool call、
  interruption 和 compaction 必须交错执行；
- tool 被拆成 spec、router、hooks、policy、approval、sandbox、backend
  execution 和 output normalization，因为模型意图不是可信副作用；
- app-server 存在，是因为 terminal UI 只是 runtime 的一个 client；
- extension 分层，是因为第三方能力必须从可验证边界进入系统；
- rollout trace、state projection、memory、cloud task 和 multi-agent graph
  存在，是因为 agent 的行为必须可重建。

## 这本书的价值

源码给事实，书给系统。

源码按 crate 拆分，但真正重要的知识跨越多个边界：一个 approval 会穿过 tool execution、core runtime、app-server JSON-RPC、TUI modal，最后在 headless `exec` 中可能被拒绝；一个 turn 同时是 model context、durable rollout、 app-server item stream、analytics fact 和 terminal rendering input。

本书的价值是：

- 叙事：先走一条主路径，再解释变体。
- 取舍：解释为什么这样拆，以及哪些方案没有选择。
- 综合：把散落在多个 crate 里的重复模式抽出来。
- 迁移：把 Codex 的设计转化为其他 agent 系统可借鉴的模式。
- 判断：指出设计哪里优雅，哪里被兼容性拖住，哪里还在演进。
