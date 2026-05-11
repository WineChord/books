# 第 10 章：沙箱与运行时边界

<div class="chapter-lede">
  <p><strong>你在这里：</strong>action 已通过策略检查，现在需要执行环境。</p>
  <p><strong>问题：</strong>文件系统、网络、平台和远程执行约束各不相同，但调用者需要可理解的一致行为。</p>
  <p><strong>心智模型：</strong>沙箱不是一堵墙，而是把 execution request 变窄的 runtime transformation。</p>
</div>

Sandboxing 是产品语言遇到操作系统现实的地方。用户理解的是“让 Codex 在有限权限下运行命令”；runtime 必须把它变成平台相关的 process setup、filesystem policy、network policy，有时还包括 retry path。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Sandbox manager | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | 从 policy 和平台选择 initial sandbox behavior。 |
| Linux helper | [`linux_run_main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147) | 展示 Linux 上独立的 sandboxed execution path。 |
| macOS seatbelt | [`seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602) | 构造平台相关 seatbelt arguments。 |
| Exec request path | [`exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315) | 把抽象 command intent 变成 process execution。 |

</div>

## Enforced 与 Advisory

安全讨论容易把所有机制都叫“sandbox”。更准确的做法，是区分 runtime/OS 强制的边界和提示性、记录性、策略性机制。

| 边界 | 做什么 | 不承诺什么 |
| --- | --- | --- |
| Approval prompt | risky work 前询问决策 | approval 后不限制进程 |
| Exec policy | 分类命令并决定是否要审批 | 本身不隔离 OS |
| Filesystem sandbox | 在支持的平台限制读写路径 | 不证明模型意图无害 |
| Network policy | 在 managed policy 下阻断或询问网络访问 | 不替代 command review |
| Event log | 记录发生了什么 | 不阻止 action |

这种词汇让本书和 OWASP/NIST 风险语言一致：分层 mitigation 降低风险，不是消除风险。

## Sandbox Selection

Orchestrator 调用 sandbox manager，为 tool attempt 选择 initial sandbox。选择取决于 filesystem policy、network policy、tool sandbox preference、Windows sandbox level，以及 managed network 是否启用。

所以 sandboxing 不是布尔值。工具可以偏好 sandboxed execution；策略可以要求限制；平台支持不同机制；denial 可以触发 approval path 来决定是否 retry。

## 平台现实

Linux、macOS、Windows 和 remote environments 没有同一个 sandbox primitive。Codex 通过 manager 和 helper 层保持产品级想法稳定。Linux 有专门 helper path；macOS 有 seatbelt policy construction；Windows 在 app-server protocol 中有 sandbox readiness 和 setup 概念。

设计经验是：跨平台安全不能靠一句“有沙箱”带过，必须有显式 adapters 和诚实 fallback。

<div class="apply-this">

## Apply This

- 用精确动词描述安全边界：gate、restrict、record、retry。
- 用明确 sandbox adapters 隐藏平台细节。
- 把 sandbox denial 当作结构化 runtime outcome。
- 不要把“存在 sandbox”等同于“绝对安全”。

</div>

## 接下来读源码

- [`SandboxManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134)：查看选择逻辑。
- [`linux-sandbox/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/README.md#L1)：阅读 Linux 边界文档。
- [`WindowsSandboxSetupStart`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L849)：看 sandbox readiness 如何出现在 app-server protocol 中。

<div class="exercise-box">

## 阅读练习

选择一个读文件命令和一个写文件命令。不要运行，只追踪哪些层会关心它们：approval policy、exec policy、filesystem sandbox、network policy、event reporting。

</div>

<div class="next-step">

## 下一章

Codex 不限于内置工具。下一章研究 MCP、apps、skills、plugins：它们如何扩大 turn 能看到和能做的事情。

</div>
