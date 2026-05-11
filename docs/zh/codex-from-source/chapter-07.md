# 第七章：沙箱与审批

运行模型选择的命令很强大，也有风险。Codex 用多层机制降低风险：审批模式、执行策略、
沙箱选择、平台相关命令改写，以及用户可见事件。这些机制都不能让任意命令执行绝对
安全；它们是在降低影响范围，并让决策更可检查。

## 审批是控制平面

审批不是附加功能，而是工具执行路径的一部分。
[`core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)
里的 orchestrator 会用审批和沙箱行为包裹工具执行。
[`core/src/exec_policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy.rs#L251)
把策略决策接入 shell 命令审批。

策略解析器本身在
[`execpolicy/src/parser.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/execpolicy/src/parser.rs#L38)。
这是把策略语言和运行时 enforcement 分开的好例子。

## 沙箱选择

sandboxing crate 里有一个 manager，负责选择并变换执行请求。见
[`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134)。
manager 抽象了平台差异：Linux、macOS、Windows 和外部沙箱模式的机制并不相同。

Linux 下 Codex 有
[`linux-sandbox`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147)
辅助路径。macOS 下 seatbelt 参数构造在
[`sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602)。

抽象很重要，因为用户看到的概念很简单：“用这些权限运行这个命令”。操作系统现实并不
简单。

## 从命令到受控进程

<div class="flow">
  <div><strong>模型请求</strong>模型请求 shell 类动作。</div>
  <div><strong>策略</strong>Codex 检查审批和 exec policy。</div>
  <div><strong>沙箱</strong>请求被映射到平台约束。</div>
  <div><strong>进程</strong>子进程运行并流式输出。</div>
  <div><strong>事件</strong>结果回到模型和 UI。</div>
</div>

[`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L395)
中的进程执行路径因此不只是进程启动器。它是用户意图、模型选择、权限、环境和操作系统
约束交汇的地方。

## 安全表述要诚实

OWASP LLM Top 10 提供了很有用的风险词汇，比如 prompt injection、excessive agency、
敏感信息泄露和不安全工具设计。Codex 的架构用审批、沙箱、工具边界和日志缓解其中
一些风险。但正确的动词是“缓解”，不是“消除”。

这在工程上很重要。如果一个系统可以运行命令、读文件、改仓库，安全故事就必须分层。
沙箱限制进程能接触什么；审批给人类阻止危险操作的机会；策略文件编码可重复规则；
事件日志支持事后 review。任何一层单独都不够。

