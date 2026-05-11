# Chapter 7: Sandboxing and Approval

Running model-selected commands is powerful and risky. Codex reduces that risk
with several layers: approval modes, execution policy, sandbox selection,
platform-specific command rewriting, and user-visible events. None of these
make arbitrary command execution absolutely safe; they reduce blast radius and
make decisions inspectable.

## Approval is a control plane

Approval is not an afterthought. It is part of the tool execution path. The
orchestrator in
[`core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50)
wraps tool runs with approval and sandbox behavior. The exec policy manager in
[`core/src/exec_policy.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec_policy.rs#L251)
connects policy decisions to shell command approval.

The policy parser itself lives in
[`execpolicy/src/parser.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/execpolicy/src/parser.rs#L38).
This is a good example of separating policy language from runtime enforcement.

## Sandbox selection

The sandboxing crate includes a manager that chooses and transforms execution
requests. See
[`sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L134).
The manager abstracts over platform differences: Linux, macOS, Windows, and
external sandbox modes do not use identical mechanisms.

On Linux, Codex has a helper path under
[`linux-sandbox`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/linux_run_main.rs#L147).
On macOS, seatbelt argument construction appears in
[`sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L602).

The abstraction matters because the user-facing idea is simple: "run this
command with these permissions." The operating-system reality is not simple.

## From command to guarded process

<div class="flow">
  <div><strong>Model request</strong>The model asks for a shell-like action.</div>
  <div><strong>Policy</strong>Codex checks approval and exec policy.</div>
  <div><strong>Sandbox</strong>The request is mapped to platform constraints.</div>
  <div><strong>Process</strong>The child process runs and streams output.</div>
  <div><strong>Event</strong>The result returns to model and UI.</div>
</div>

The process execution path in
[`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L395)
is therefore not merely a process launcher. It is the point where user intent,
model choice, permissions, environment, and operating-system constraints meet.

## Security language should stay honest

The OWASP Top 10 for LLM Applications is useful background because it names
risks such as prompt injection, excessive agency, sensitive data disclosure,
and insecure tool design. Codex's architecture addresses some of these risks
with approvals, sandboxing, tool boundaries, and logs. But the correct verb is
"mitigate," not "eliminate."

This distinction matters in real engineering. If a system can run commands,
read files, and edit a repository, the safety story must be layered. A sandbox
limits what a process can touch. An approval prompt gives a human a chance to
stop risky work. A policy file encodes repeatable rules. Event logs make later
review possible. None is sufficient alone.

