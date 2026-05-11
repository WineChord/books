# 第 7 章：工具注册与分发

<div class="chapter-lede">
  <p><strong>你在这里：</strong>模型已经请求行动，Codex 必须决定哪个实现拥有这个请求。</p>
  <p><strong>问题：</strong>工具是强副作用，所以需要 schema、routing、mutability、hooks、cancellation、concurrency、output formatting 和 telemetry。</p>
  <p><strong>心智模型：</strong>工具是产品契约，不只是函数指针。</p>
</div>

工具让 Codex 从语言跨入本地环境。模型可以提出 shell command、patch、MCP call 或 dynamic client-side tool，但 runtime 决定如何验证、监督、执行和报告。

<ToolPipeline />

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Tool handler trait | [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38) | 声明工具名、spec、mutability、hooks、diff consumer 和 execution。 |
| Registry | [`ToolRegistry`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220) | 把 tool names 映射到 erased handlers。 |
| Dispatch accounting | [`dispatch_any`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L263) | 跟踪 active turn tool calls、metrics tags、MCP origin 和 handler lookup。 |
| Parallel runtime | [`ToolCallRuntime`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L27) | 用共享锁控制并行与串行 tool calls。 |

</div>

## 把 Trait 当作清单

`ToolHandler` 是安全工具设计清单：

| 方法或概念 | 回答什么问题 |
| --- | --- |
| `tool_name` | 模型或 router 使用什么名字？ |
| `spec` | 暴露什么 schema 和 description？ |
| `supports_parallel_tool_calls` | 能否和其他工具一起运行？ |
| `is_mutating` | 这个 invocation 是否可能改变用户环境？ |
| `pre_tool_use_payload` | 执行前 hooks 应该看到什么？ |
| `post_tool_use_payload` | 执行后 hooks 应该看到什么？ |
| `create_diff_consumer` | streamed arguments 是否能产生 live UI events？ |
| `handle` | 真正执行什么工作？ |

这就是为什么工具是产品契约。模型可见名字只是其中一块；生产级工具还必须描述安全、观测、扩展 hooks 和输出转换。

## Registry 与 Type Erasure

不同工具返回不同输出类型，但 runtime 需要一个统一 registry。Codex 用内部 erased handler 层解决：具体 `ToolHandler` 变成 `AnyToolHandler`，最终结果变成 `AnyToolResult`。这样 router 可以统一处理 shell、patch、MCP 等工具，同时把具体逻辑保留在 handler 内。

对初学者来说，type erasure 可以理解为：具体行为留在工具里，但 registry 只看到一个共同盒子。

## 并行分发是保守的

`ToolCallRuntime` 询问 router 某个 call 是否支持 parallel execution。如果支持，拿 read lock；否则拿 write lock。多个 read lock 可以共存，而 write lock 会排除其他工作。

| 工具分类 | 锁形状 | 产品含义 |
| --- | --- | --- |
| parallel-safe | shared read lock | 可以和其他安全调用并行 |
| not parallel-safe | exclusive write lock | 串行执行以避免冲突副作用 |
| cancelled | cancellation branch | 返回 aborted tool output，而不是卡住 |

这个实现很小，但思想重要：并发不是全局开关，而是具体 tool call 的属性。

<div class="apply-this">

## Apply This

- 围绕 schema、安全、hooks、execution 和 reporting 设计工具接口。
- 把工具特定逻辑留在 handler 内，对 registry 暴露统一形状。
- 对未知或 mutating work 默认保守串行。
- 让可恢复的工具失败成为模型可观察结果。

</div>

## 接下来读源码

- [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38)：把每个方法当作设计要求。
- [`AnyToolResult::into_response`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L119)：看工具输出如何变成模型输入。
- [`handle_tool_call_with_source`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L83)：查看取消和锁选择。

<div class="exercise-box">

## 阅读练习

选择一个 tool handler，回答：模型可见名字是什么？是否会修改状态？是否支持 parallel calls？暴露哪些 hook payload？答不清的地方，就是值得深入审查的工具契约。

</div>

<div class="next-step">

## 下一章

有一个工具值得单独讲：`apply_patch`。它是模型意图变成具体文件变化、审批事件和 turn-level diff 的路径。

</div>
