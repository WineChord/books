# 第 10 章：沙箱与运行时边界

<div class="chapter-lede">
  <p><strong>你在这里：</strong>action 已通过策略检查，现在需要执行环境。</p>
  <p><strong>问题：</strong>文件系统、网络、平台和远程执行约束各不相同，但调用者需要可理解的一致行为。</p>
  <p><strong>心智模型：</strong>沙箱不是一堵墙，而是把执行请求收窄成更受限制的运行时转换。</p>
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

源码读者还会跟踪 sandbox preference 和 override：

| 控制项 | 含义 |
| --- | --- |
| auto preference | 策略和平台适合时使用 sandbox |
| require preference | 请求平台 sandbox path；但在这个源码快照中，平台 sandbox 不可用时会 fallback 到 `SandboxType::None` |
| forbid preference | 某些工具路径明确不能在该 sandbox 形状中运行 |
| bypass first attempt | 只有显式策略允许时，才跳过第一次 sandboxed attempt |
| effective permission profile | 把选中的 profile 转换成平台/backend 可执行的限制 |

关键产品行为是诚实描述 fallback。某些安全系统会 fail closed，但这条 selection path 不总是这样：平台 sandbox 无法选择时，manager 可以返回 `SandboxType::None`。因此后续 approval、permission、event 和 policy 层不能声称 OS sandbox enforcement 已经发生。

## 平台现实

Linux、macOS、Windows 和 remote environments 没有同一个 sandbox primitive。Codex 通过 manager 和 helper 层保持产品级想法稳定。Linux 有专门 helper path；macOS 有 seatbelt policy construction；Windows 在 app-server protocol 中有 sandbox readiness 和 setup 概念。

设计经验是：跨平台安全不能靠一句“有沙箱”带过，必须有显式 adapters 和诚实 fallback。

| 平台路径 | 实际行为 |
| --- | --- |
| macOS seatbelt | 构造 profile 来限制文件和网络，并可保护敏感根 |
| Linux Landlock/helper | 依赖 kernel/helper 支持；平台 sandbox 不可用时可能变成 `SandboxType::None`，helper launch error 仍是执行错误 |
| Windows elevated/restricted token | enforcement 随权限和 backend 支持变化 |
| WSL 或特殊 Linux host | 无法提供预期保证的 helper path 会被拒绝 |
| remote execution | sandbox/filesystem 语义属于远端环境，不只是本地进程 |

## Denial 与 Retry

Sandbox denial 不是普通进程失败，而是 policy signal。Orchestrator 可以展示 denial、请求额外审批，或只有在策略和决策路径允许时才无沙箱重试。Denial 还可能携带 network policy decision；如果失败点是网络访问，runtime 可以请求 host/network approval、取消尝试，或在 policy amendment 后重试。没有获批路径时，denial 应保持为 denial。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 10 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 正被转换成平台/backend 相关的执行尝试。 |
| 什么数据结构携带它？ | sandbox policy、permission profile、network decision、process launch config 和 platform adapter output。 |
| 谁拥有下一步决策？ | sandbox manager、platform adapter、network policy 和 orchestrator retry logic。 |
| 这里可能怎么失败？ | sandbox selection 不支持或不可用、helper launch 失败、network denial、Windows mode 不兼容，或在 `SandboxType::None` 后做出不安全假设。 |

</div>

<div class="apply-this">

## 应用到实践

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

## 自检题

不打开源码回答：`SandboxType::None` 和 sandbox denial 有什么不同？为什么只要初始 preference 要求 sandbox，并不代表客户端可以把命令描述为已经 sandboxed？

</div>

<div class="exercise-box">

## 可选源码实验

选择一个读文件命令和一个写文件命令。不要运行，只追踪哪些层会关心它们：approval policy、exec policy、filesystem sandbox、network policy、event reporting。

</div>

<div class="next-step">

## 下一章

Codex 不限于内置工具。下一章研究 MCP、apps、skills、plugins：它们如何扩大 turn 能看到和能做的事情。

</div>
