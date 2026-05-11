# 第六章：工具与补丁

工具让 Codex 从语言模型变成编码 agent。模型可以提出文字建议，但工具可以读文件、
运行测试、应用补丁、请求审批或调用 MCP server。风险也在这里：工具会接触真实机器。
因此 Codex 把工具执行做成一个被路由、被监督的子系统。

## Registry 和路由

工具 registry 位于
[`core/src/tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220)。
它收集工具规格和 handler。规格告诉模型工具叫什么、需要什么参数；handler 在模型
请求工具时执行真实工作。

执行会经过
[`core/src/tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L64)
和
[`core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)
这样的层。它们决定工具调用能不能并发、如何取消，以及审批或沙箱重试如何包裹执行。

## Shell 不只是 shell

shell handler 从
[`core/src/tools/handlers/shell.rs#L110`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell.rs#L110)
附近开始。乍看 shell 工具很简单：运行命令并返回 stdout/stderr。Codex 里它要谨慎得多：
工作目录、环境变量、命令解析、审批需求、patch 拦截、沙箱权限、输出摘要都要考虑。

实际进程请求路径在
[`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315)。
`build_exec_request` 把工具输入变成可执行请求，后续函数再启动并观察进程。这里是
“模型想运行测试”变成真实子进程的地方。

## apply_patch 设计

文件编辑被特殊处理。独立 patch 引擎位于
[`codex-rs/apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277)。
核心工具 handler 位于
[`core/src/tools/handlers/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286)。

这个拆分很重要。patch 解析和应用是可复用引擎；面向 agent 的审批、进度和事件发出
属于 core 工具 handler。清晰边界让你可以测试 patch 正确性，而不必启动完整模型会话。

<div class="flow">
  <div><strong>工具规格</strong>把 patch 能力暴露给模型。</div>
  <div><strong>解析</strong>校验 patch grammar 和 hunk。</div>
  <div><strong>审批</strong>检查文件权限和策略。</div>
  <div><strong>应用</strong>通过 patch 引擎修改文件。</div>
  <div><strong>报告</strong>发出结构化文件变更事件。</div>
</div>

## 为什么不让模型直接写文件

直接写文件更简单，但更难审计。patch 有结构：新增文件、删除文件、更新文件、hunk、
上下文和结果 delta。这个结构让 Codex 能展示变化、做针对性审批，并从无效编辑里恢复。
它也让人类 review 更容易。

更大的经验是：工具 API 本身就是产品设计。好工具不只是暴露给模型的函数，而是一个
会塑造模型请求方式和用户理解方式的契约。

