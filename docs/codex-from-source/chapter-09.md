# Chapter 9: Approval Control Plane

<div class="chapter-lede">
  <p><strong>You are here:</strong> tools can mutate the world, so Codex needs a decision system above individual handlers.</p>
  <p><strong>Problem:</strong> approval behavior must be consistent across shell, patch, MCP, network, hooks, Guardian review, and retry paths.</p>
  <p><strong>Mental model:</strong> approval is air traffic control; tools are planes, but the control tower decides who can take off.</p>
</div>

Approval is not a modal dialog sprinkled through the UI. It is a control plane
inside tool execution. The orchestrator evaluates approval requirements,
consults hooks or automated review when configured, selects a sandboxed
attempt, handles sandbox denial, and decides whether a retry without sandbox
requires a fresh approval.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Approval policy enum | [`AskForApproval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L871) | Names the high-level command approval policies. |
| Orchestrator run | [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127) | Central sequence for approval, sandbox, attempt, denial, and retry. |
| Permission hooks | [`request_approval`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L387) | Gives configured hooks first chance to answer approval requests. |
| Exec policy tests | [`exec_policy_tests.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy_tests.rs#L1207) | Shows many expected edge cases around approval and sandbox behavior. |

</div>

## The Approval Sequence

The orchestrator has a readable high-level shape:

| Step | Meaning |
| --- | --- |
| Determine requirement | Ask the tool for its approval requirement or use the default derived from policy. |
| Request approval if needed | Permission hooks, Guardian review, or user approval can decide. |
| Select first sandbox | Choose platform/runtime constraints for the initial attempt. |
| Run attempt | Execute under sandbox and network approval handling. |
| Handle denial | Decide whether denial is final or whether escalation can be offered. |
| Retry if approved | Run without the sandbox only when policy and approval allow it. |

This is the control plane pattern: the tool owns domain-specific execution,
but a shared layer owns the approval and sandbox lifecycle.

## Approval Modes Are Not Just UI Modes

`AskForApproval` includes policies such as "ask unless trusted", "ask on
failure", "ask on request", "never", and granular policy. These names shape
runtime behavior, not just prompt wording. For example, a policy can affect
whether sandbox denial may produce an escalation path, or whether a forbidden
command must stop immediately.

The design goal is consistency. A shell command and a patch should not each
invent their own meaning of "approval required."

## Hooks, Guardian, and User Decisions

Permission request hooks can allow or deny before the normal approval path.
When Guardian or strict automated review is active, the decision source can be
an automated reviewer. Otherwise, user approval is the fallback for unresolved
requests. Codex records decision source through telemetry, which matters for
debugging and auditability.

This layered design reduces hardcoded case-by-case logic. A new tool can fit
into the same control plane by declaring its approval payload and runtime
behavior.

## Security Language Should Stay Honest

Approval does not make arbitrary command execution safe. It makes decisions
visible and enforceable. A denial can still happen after a sandbox run. A
network policy decision can require special handling. A retry without sandbox
is a deliberate escalation, not a casual fallback.

Use precise verbs: approvals **gate** actions, sandboxes **limit** actions,
logs **explain** actions, and tests **check** expected policy behavior. None of
these magically eliminates risk alone.

<div class="apply-this">

## Apply This

- Centralize approval semantics outside individual tools.
- Let hooks and automated review participate through explicit decision points.
- Treat retry without sandbox as a new risk decision.
- Test approval policy with edge cases, not only happy paths.

</div>

## Read the Source Next

- [`ToolOrchestrator::run`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L127):
  label the approval, first attempt, denial, and retry sections.
- [`reject_if_not_approved`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L451):
  compare user denial, Guardian denial, timeout, and network amendment.
- [`dangerous_rm_rf_requires_approval_in_danger_full_access`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy_tests.rs#L1932):
  inspect a safety-oriented test case.

<div class="exercise-box">

## Reading Exercise

Create a two-column note: "decision made by tool" and "decision made by
orchestrator." Read `ToolOrchestrator::run` and place each approval or sandbox
decision in the correct column.

</div>

<div class="next-step">

## What Comes Next

Approval decides whether action may proceed. The next chapter studies the
runtime boundary that constrains how a process or tool runs after approval:
sandboxing.

</div>
