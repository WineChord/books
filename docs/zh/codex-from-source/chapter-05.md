# 第五章：会话运行时

会话运行时是 Codex 从命令解析器变成 agent 的地方。一个 session 接收操作、维护
状态、运行模型 turn、执行工具，并发出事件。

## Session 门面

主要门面是
[`codex-rs/core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L366)
里的 `Codex`。它的公开方法形成一个紧凑模型：

- `Codex::spawn` 创建配置好的 session。
- `submit` 把工作提交给 session。
- `next_event` 读取 session 发出的下一个事件。

这个设计像队列。客户端不是直接调用“完成所有事情”，而是提交操作、监听事件。这样
交互 UI、非交互 exec 和 app-server 客户端可以共享同一种节奏。

## 从 thread 到 turn

产品语言里，thread 是持续的对话或工作区状态；turn 是这个 thread 里的单次用户请求。
[`ThreadManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/thread_manager.rs#L506)
负责 live thread、resume 和 fork。session 处理提交进来的 turn。

核心 turn 函数是
[`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)。
粗略看，它做这件事：

<div class="flow">
  <div><strong>准备</strong>收集指令、历史、配置、工具和上下文。</div>
  <div><strong>采样</strong>通过模型 client 流式接收输出。</div>
  <div><strong>行动</strong>分发模型请求的工具调用。</div>
  <div><strong>记录</strong>追加工具输出并发出事件。</div>
  <div><strong>重复</strong>直到最终回答或被中断。</div>
</div>

这就是 agent 循环的心脏。模型不是被调用一次就结束，而是处在一个可以观察工具结果并
继续行动的迭代运行时里。

## 模型流

模型边界出现在
[`core/src/client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/client.rs#L305)。
`ModelClient` 和 `ModelClientSession` 会把 Responses API 或 WebSocket 路径规范化。
这种规范化很重要，因为运行时想处理的是语义事件：response item、工具调用、delta、
错误和完成。

对初学者来说，流式输出就是模型回答分块到达。UI 可以在完整回答结束前显示进度，
运行时也可以把工具调用当成结构化 item，而不是从普通文本里猜。

## Task 编排

不是所有提交都是普通用户 turn。Codex 还支持 review task、compaction 和用户 shell
命令。
[`core/src/tasks/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tasks/mod.rs#L292)
让这些工作流仍然归在 session 伞下。

设计经验是：“agent runtime” 不应该等于“一个巨大的循环”。Codex 把循环拆成提交处理、
task 选择、turn 执行、模型流、工具分发和事件发出。每一部分都更容易测试和替换。

