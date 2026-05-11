# 第一章：阅读策略

读 Codex 最容易迷路的方式，是一上来就打开最大的文件。更好的方法是跟踪一个最普通
的用户动作：

> 用户在 Codex 里输入一个任务，希望它完成一段有用的软件工程工作。

这句话已经包含了整个架构。Codex 需要一个入口接收任务，一个协议表示请求，一个
会话运行时和模型交互，一个工具层读写文件或运行命令，还需要一个界面把进度报告给
用户。

## 从产品循环开始

OpenAI 对 Codex 的公开介绍中反复出现几个动作：读文件、改文件、运行命令、展示
证据、让用户 review。ReAct 论文给了一个有用的心智模型：推理和行动交替发生，
行动产生观察，观察再影响下一步。我们不能说 Codex 严格实现了 ReAct 论文，但这个
循环很适合作为读源码的地图。

<div class="flow">
  <div><strong>用户意图</strong>任务从 CLI、TUI、exec 或 app-server 进入。</div>
  <div><strong>Agent 状态</strong>会话构造上下文和模型指令。</div>
  <div><strong>行动</strong>模型请求 shell、patch 等工具。</div>
  <div><strong>观察</strong>工具输出回到模型和 UI。</div>
  <div><strong>决策</strong>循环继续、结束，或请求审批。</div>
</div>

读每个文件时都可以问一句：这个文件是在接收意图、承载状态、执行行动、观察结果，
还是 enforcing 某种边界？

## 最先抓住三个锚点

Codex 有很多 crate，但最先应该抓住三个锚点：

- npm 包装器
  [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15)
  会选择当前平台对应的原生可执行文件。
- Rust CLI 路由器
  [`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106)
  定义用户能运行的顶层命令。
- 内部协议
  [`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)
  定义系统内部传递的操作和事件。

这三个文件分别回答三个初学者问题：程序怎么启动、暴露哪些模式、内部用什么消息
沟通。

## 先读类型，再读函数

Rust 系统常常通过类型暴露设计。不要一开始就读完每个长函数的每个分支，先看模块
边界上的 enum 和 struct。Codex 里尤其重要的类型包括：

- `Subcommand`：用户能选择的命令模式。
- `ClientRequest` 和 `ServerNotification`：app-server 的请求和通知。
- `Op`、`Submission`、`Event`、`EventMsg`：核心运行时 API。
- `Codex`：接收提交、发出事件的会话门面。

类型就是契约。两个模块只要在类型上达成一致，就可以各自演进内部实现。这就是为什么
源码阅读应该先顺着契约走，再深入实现。

## 不要一开始就做什么

不要试图背下所有 crate。也不要把所有文件看成一样重要。Codex 是生产代码库，里面
有测试、平台辅助、迁移逻辑、UI 细节和产品分支。这些都重要，但不是主干。

第一次阅读的主干是：

1. 命令分发，
2. app-server 请求路由，
3. core 会话提交，
4. turn 编排，
5. 工具执行，
6. 事件通知。

这条路径清楚之后，周围系统就容易归位。

