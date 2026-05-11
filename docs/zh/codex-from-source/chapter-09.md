# 第 9 章：审批控制面

<div class="chapter-lede">
  <p><strong>你在这里：</strong>工具可以改变世界，所以 Codex 需要位于单个 handler 之上的决策系统。</p>
  <p><strong>问题：</strong>shell、patch、MCP、network、hooks、Guardian review 和 retry path 的审批行为必须一致。</p>
  <p><strong>心智模型：</strong>审批像空管塔；工具是飞机，但谁能起飞由塔台决定。</p>
</div>

审批不是散落在 UI 里的弹窗，而是工具执行内部的控制面。Orchestrator 会评估 approval requirement，在配置需要时咨询 hooks 或 automated review，选择 sandboxed attempt，处理 sandbox denial，并决定 without-sandbox retry 是否需要新的审批。

## 证据表

<div class="evidence-map">

| 概念 | 源码 | 为什么重要 |
| --- | --- | --- |
| Approval policy enum | [`AskForApproval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L871) | 命名高层命令审批策略。 |
| Orchestrator run | [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127) | 审批、沙箱、attempt、denial、retry 的中心序列。 |
| Permission hooks | [`request_approval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L387) | 给配置 hooks 第一机会回答 approval request。 |
| Exec policy tests | [`exec_policy_tests.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy_tests.rs#L1207) | 展示审批与沙箱行为的大量边界测试。 |

</div>

## 审批序列

| 步骤 | 含义 |
| --- | --- |
| Determine requirement | 向工具询问 approval requirement，或从 policy 派生默认要求。 |
| Request approval | 需要时由 permission hooks、Guardian review 或 user approval 决定。 |
| Select first sandbox | 为第一次 attempt 选择平台和 runtime 约束。 |
| Run attempt | 在 sandbox 和 network approval handling 下执行。 |
| Handle denial | 决定 denial 是最终结果，还是可以提供 escalation。 |
| Retry if approved | 只有 policy 和审批路径允许时，才 without sandbox 重试。 |

这就是 control plane 模式：工具拥有领域执行逻辑，共享层拥有审批和沙箱生命周期。

## Approval mode 不只是 UI mode

`AskForApproval` 包含 ask unless trusted、ask on failure、ask on request、never、granular 等策略。这些名字影响 runtime 行为，而不是只影响提示语。例如策略会影响 sandbox denial 是否能触发 escalation，或 forbidden command 是否必须立刻停止。

设计目标是一致性。Shell command 和 patch 不应该各自发明“需要审批”的含义。

## Hooks、Guardian 与用户决策

Permission request hooks 可以在正常审批路径之前 allow 或 deny。Guardian 或 strict automated review 开启时，决策来源可以是 automated reviewer。否则，用户审批是 unresolved request 的 fallback。Codex 还会通过 telemetry 记录 decision source，方便调试和审计。

这种分层设计减少硬编码特判。新工具只要声明 approval payload 和 runtime behavior，就能进入同一个 control plane。

## Permission Profiles 与 Approval Requirements

现代 Codex 审批不只是一个 yes/no prompt。工具执行还会经过 permission profiles、additional permissions、sandbox permissions、approval cache 和 request-permissions tool。

| 层 | 源码等价含义 |
| --- | --- |
| approval requirement | 立即决策：允许、拒绝、需要提示，或需要 policy amendment |
| permission profile | runtime 应执行或请求的 filesystem/network access 形状 |
| additional permissions | turn/session grant，可扩展 baseline profile |
| approval store | 记住等价请求，避免反复提示 |
| request permissions tool | 模型可见的权限申请路径，本身也受 approval policy 管理 |
| exec-policy amendment | 提议修改规则，而不是只批准一次命令 |

关键修正是：sandbox mode 不是完整权限系统，只是更丰富 policy stack 的一个投影。

## Guardian 与 Network Approval

Guardian 是 approval-like requests 的自动 review 层，可覆盖 shell、unified exec、apply patch、network access、MCP tool call 和 request-permissions flows。Reviewer timeout 或 failure 应按 fail-closed 处理，除非策略显式允许其他行为。

Network approval 也不是一个布尔值。网络访问可以 immediate 或 deferred，可能使用 managed proxy registration，依赖 host approval cache，并在 denial 时取消 command。Sandbox denial 还可能携带 network policy 信息，影响是否允许 retry。

<div class="trace-ledger">

## Trace Ledger

| 问题 | 第 9 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 位于工具执行前或执行中的 policy/control plane。 |
| 什么数据结构携带它？ | approval payloads、permission profiles、hooks、Guardian review requests、network policy decisions 和 cached approvals。 |
| 谁拥有下一步决策？ | static policy、hooks、Guardian、cache、network policy 或用户。 |
| 这里可能怎么失败？ | policy denial、hook failure、Guardian timeout、user denial、network denial、stale cache 或 unsafe escalation。 |

</div>

## 安全语言要诚实

审批不会让任意命令执行变安全。它让决策可见、可执行。Sandbox run 之后仍可能 denial。Network policy decision 可能需要特殊处理。Without-sandbox retry 是有意 escalation，不是随意 fallback。

准确动词很重要：approval **gate** actions，sandbox **limit** actions，logs **explain** actions，tests **check** expected behavior。任何一层都不能单独消除风险。

<div class="apply-this">

## 应用到实践

- 把审批语义集中到单个工具之外。
- 让 hooks 和 automated review 通过明确决策点参与。
- 把 without-sandbox retry 当作新的风险决策。
- 用边界测试验证 approval policy，而不只测 happy path。

</div>

## 接下来读源码

- [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127)：标出 approval、first attempt、denial、retry。
- [`reject_if_not_approved`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L451)：比较 user denial、Guardian denial、timeout 和 network amendment。
- [`dangerous_rm_rf_requires_approval_in_danger_full_access`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy_tests.rs#L1932)：阅读安全边界测试。

<div class="exercise-box">

## 自检题

不打开源码回答：approval policy、permission profile、network policy、Guardian 和 sandbox 为什么是五个不同层？每层各举一个它能捕获或导致的失败。

</div>

<div class="exercise-box">

## 可选源码实验

创建两列笔记：“tool 决定”和“orchestrator 决定”。阅读 `ToolOrchestrator::run`，把每个 approval 或 sandbox 决策放到对应列里。

</div>

<div class="next-step">

## 下一章

审批决定 action 是否可继续。下一章研究 action 通过审批后如何被运行时边界约束：沙箱。

</div>
