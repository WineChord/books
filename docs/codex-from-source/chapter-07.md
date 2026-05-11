# Chapter 7: Tool Registry and Dispatch

<div class="chapter-lede">
  <p><strong>You are here:</strong> the model has requested action, and Codex must decide which implementation owns it.</p>
  <p><strong>Problem:</strong> tools are powerful side effects, so they need schema, routing, mutability, hooks, cancellation, concurrency, output formatting, and telemetry.</p>
  <p><strong>Mental model:</strong> a tool is a product contract, not just a function pointer.</p>
</div>

Tools are how Codex crosses from language into the local environment. A model
can propose a shell command, a patch, an MCP call, or a dynamic client-side
tool, but the runtime decides how that request is validated, supervised,
executed, and reported.

<ToolPipeline />

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Tool handler trait | [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38) | Declares tool name, spec, mutability, hooks, diff consumer, and execution. |
| Registry | [`ToolRegistry`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220) | Maps tool names to erased handlers. |
| Dispatch accounting | [`dispatch_any`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L263) | Tracks active turn tool calls, metrics tags, MCP origin, and handler lookup. |
| Parallel runtime | [`ToolCallRuntime`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L27) | Controls concurrent versus serial tool calls with a shared lock. |

</div>

## Read the Trait as a Checklist

The `ToolHandler` trait is a checklist for safe tool design:

| Method or idea | Question it answers |
| --- | --- |
| `tool_name` | What name does the model or router use? |
| `spec` | What schema and description are exposed? |
| `supports_parallel_tool_calls` | Can this handler run alongside other tool calls? |
| `is_mutating` | Might this invocation change the user's environment? |
| `pre_tool_use_payload` | What should hooks see before execution? |
| `post_tool_use_payload` | What should hooks see after execution? |
| `create_diff_consumer` | Can streamed arguments produce live UI events? |
| `handle` | What work actually happens? |

This is why tools are product contracts. The model-facing name is only one
piece. A production tool must also describe safety, observability, extension
hooks, and output conversion.

## Registry and Erasure

Different tools return different output types, but the runtime needs to store
them in one registry. Codex solves this with an internal erased handler layer:
concrete `ToolHandler` implementations become `AnyToolHandler`, and final
results become `AnyToolResult`. This lets the router treat shell, patch, MCP,
and other tools uniformly while preserving type-specific logic inside each
handler.

For a beginner, "type erasure" simply means: keep specific behavior inside the
tool, but expose a common box to the registry.

## Tool Inventory Is Planned

The model-visible tool list is not just "all handlers in a map." Codex builds
tool specs from runtime state, feature gates, app/plugin availability, hosted
tools, local tools, deferred MCP tools, dynamic client-owned tools, and
unavailable-tool placeholders.

| Inventory source | What it contributes |
| --- | --- |
| built-in local tools | shell, patch, view image, plan updates, permission requests, and similar core capabilities |
| hosted tools | provider-hosted search or image generation specs when available |
| MCP tools | server-provided tools, sometimes direct and sometimes deferred until the runtime can expose them |
| dynamic tools | tools executed by a client surface through request/response events |
| discoverable tools | plugin or app tools the model can request to install or enable |
| unavailable placeholders | names the model might know but should not call in the current state |
| code-mode tools | specialized or nested tools that only appear in specific execution modes |

This planning step is why source readers distinguish spec planning, router,
registry, handler, and orchestrator.

## Shell and Exec Are a Family

The word "shell" hides several concrete paths:

| Path | Runtime meaning |
| --- | --- |
| local shell tool | model-requested command with cwd, env, approval, sandbox, timeout, output events |
| unified `exec_command` | richer command tool with PTY/process id, stdin, timeout, and apply-patch interception |
| `write_stdin` | input sent to an existing exec session rather than a new command |
| user shell command | user-requested shell action queued through session/thread operations |
| remote or container backend | command execution delegated to a backend rather than the local OS directly |

This distinction matters for approvals, cancellation, event rendering, and
resume behavior. A tool timeout, a user interrupt, and a `write_stdin` to a
running process are different runtime facts.

## Hooks and Dynamic Tools

Pre-tool hooks can block execution before the side effect happens. Post-tool
hooks can replace model-visible output or stop follow-up behavior. Permission
hooks can decide before Guardian or user approval. That makes hooks a policy
engine, not only lifecycle notifications.

Dynamic tools add another bridge: the core runtime can emit a
`DynamicToolCallRequest`, wait for a client-owned implementation to respond,
and then convert that response into a model-visible observation. If the client
does not answer or cancels, the runtime still needs a structured fallback
result.

## Parallel Dispatch Is Conservative

`ToolCallRuntime` asks the router whether a call supports parallel execution.
If yes, the call takes a read lock; if not, it takes a write lock. Multiple
read locks can coexist, but a write lock excludes others. This gives a simple
policy:

| Tool classification | Lock shape | Product meaning |
| --- | --- | --- |
| parallel-safe | shared read lock | can run with other safe calls |
| not parallel-safe | exclusive write lock | serialize to avoid conflicting side effects |
| cancelled | cancellation branch | return an aborted tool output instead of hanging |

The implementation is small, but the idea is powerful. Concurrency is not a
global yes/no setting. It is a property of specific tool calls.

## Failure Is Still a Tool Result

The dispatch layer distinguishes fatal runtime failures from model-visible
tool failures. If a tool call fails in a recoverable way, Codex can return a
structured failure output to the model. That lets the model observe the
failure and decide what to do next. Fatal errors become runtime errors because
continuing would be unsafe or meaningless.

<div class="trace-ledger">

## Trace Ledger

| Question | Chapter 7 answer |
| --- | --- |
| Where is the user request now? | The model has turned it into one or more tool calls. |
| What carries it? | tool specs, tool call payloads, router invocations, registry handlers, hook payloads, and tool futures. |
| Who decides next? | The router/registry selects the handler; the orchestrator and hooks decide whether and how execution proceeds. |
| What can fail here? | missing tool, invalid arguments, hook block, dynamic client timeout, cancellation, recoverable tool failure, or fatal runtime error. |

</div>

<div class="apply-this">

## Apply This

- Design tool interfaces around schema, safety, hooks, execution, and reporting.
- Keep tool-specific logic in handlers and expose a uniform registry shape.
- Serialize unknown or mutating work by default.
- Make recoverable tool failures observable to the model.

</div>

## Read the Source Next

- [`ToolHandler`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L38):
  read each method as a design requirement.
- [`AnyToolResult::into_response`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L119):
  see how tool output becomes model input.
- [`handle_tool_call_with_source`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L83):
  inspect cancellation and lock selection.

<div class="exercise-box">

## Self-Check

Answer without opening source: why does Codex need both a tool registry and a
tool orchestrator? Then classify shell, patch, MCP, dynamic tools, and hosted
tools by who executes them and who sees the result.

</div>

<div class="exercise-box">

## Optional Source Lab

Pick one tool handler and answer: What is its model-visible name? Does it
mutate state? Does it support parallel calls? What hook payloads does it
expose? If any answer is unclear, the tool contract is worth deeper review.

</div>

<div class="next-step">

## What Comes Next

One tool deserves its own chapter: `apply_patch`. It is the path where model
intent becomes concrete file changes, approval events, and turn-level diffs.

</div>
