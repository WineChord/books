# Chapter 10: Sandboxes and Runtime Boundaries

<div class="chapter-lede">
  <p><strong>You are here:</strong> an action has passed policy checks and needs an execution environment.</p>
  <p><strong>Problem:</strong> filesystem, network, platform, and remote execution constraints differ, but callers need one understandable behavior.</p>
  <p><strong>Mental model:</strong> a sandbox is not a wall; it is a runtime transformation that narrows what an attempted action can touch.</p>
</div>

Sandboxing is where product language meets operating-system reality. Users
think "let Codex run this command with limited access." Runtime code must turn
that into platform-specific process setup, filesystem policy, network policy,
and sometimes a retry path.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Sandbox manager | [`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134) | Chooses initial sandbox behavior from policy and platform. |
| Linux helper | [`linux_run_main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147) | Shows dedicated sandboxed execution path on Linux. |
| macOS seatbelt | [`seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602) | Builds platform-specific seatbelt arguments. |
| Exec request path | [`exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315) | Converts abstract command intent into process execution. |

</div>

## Enforced vs Advisory Boundaries

Safety discussions get sloppy when every mechanism is called a "sandbox." It
is better to distinguish what is enforced by the runtime or OS from what is
advisory, informational, or policy-driven.

| Boundary | What it does | What it does not promise |
| --- | --- | --- |
| Approval prompt | asks for a decision before risky work | does not constrain a process after approval |
| Exec policy | classifies commands and required approvals | does not by itself isolate the OS |
| Filesystem sandbox | restricts read/write paths where supported | does not prove model intent is harmless |
| Network policy | blocks or asks for network access under managed policy | does not replace command review |
| Event log | records what happened | does not prevent the action |

This vocabulary keeps the book aligned with OWASP and NIST-style risk
language: layered mitigations reduce risk; they do not erase it.

## Sandbox Selection

The orchestrator calls the sandbox manager to select the initial sandbox for a
tool attempt. Selection depends on filesystem policy, network policy, the
tool's sandbox preference, Windows sandbox level, and whether managed network
policy is active.

That means sandboxing is not only a boolean. A tool can prefer sandboxed
execution, a policy can demand limits, a platform can support a particular
mechanism, and a denial can trigger an approval path for a retry.

## Platform Reality

Linux, macOS, Windows, and remote environments do not share one sandbox
primitive. Codex keeps the product-level idea stable by hiding platform details
behind manager and helper layers. On Linux, a dedicated helper path handles
sandboxed execution. On macOS, seatbelt policy construction is its own concern.
On Windows, app-server protocol includes sandbox readiness and setup concepts.

The design lesson is that cross-platform safety should not be hand-waved. It
needs explicit adapters and honest fallbacks.

## Denial and Retry

A sandbox denial is not just a process failure. It can be a policy signal.
The orchestrator may surface the denial, ask for additional approval, or retry
without the sandbox only when the policy and decision path allow it. This is
why approval and sandboxing are separate chapters but connected at runtime.

<div class="apply-this">

## Apply This

- Describe safety boundaries with precise verbs: gate, restrict, record, retry.
- Hide platform details behind explicit sandbox adapters.
- Treat sandbox denial as a structured runtime outcome.
- Never turn "sandbox exists" into a blanket claim of safety.

</div>

## Read the Source Next

- [`SandboxManager`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134):
  inspect selection logic.
- [`linux-sandbox/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/README.md#L1):
  read the documented Linux boundary.
- [`WindowsSandboxSetupStart`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/common.rs#L849):
  see how sandbox readiness appears in the app-server protocol.

<div class="exercise-box">

## Reading Exercise

Pick a command that reads files and a command that writes files. Without
running anything, trace which layers would care: approval policy, exec policy,
filesystem sandbox, network policy, and event reporting.

</div>

<div class="next-step">

## What Comes Next

Codex is not limited to built-in tools. The next chapter looks at MCP, apps,
skills, and plugins: the extension surfaces that widen what a turn can see and
do.

</div>
