# Research Notes: Tool Execution and Mutation Paths

Scope: `codex-rs/tools`, `codex-rs/exec`, `codex-rs/exec-server`,
`codex-rs/shell-command`, `codex-rs/apply-patch`, `codex-rs/git-utils`,
`codex-rs/hooks`, `codex-rs/file-search`, `codex-rs/file-system`,
`codex-rs/file-watcher`, `codex-rs/execpolicy`, and
`codex-rs/execpolicy-legacy`.

## Module Boundaries

- `tools` owns model-facing tool metadata only. It avoids execution, approval,
  and session orchestration.
- `shell-command` parses, lowers, summarizes, and classifies commands.
- `execpolicy` is the current rule engine for prefix, network, and host
  executable decisions.
- `execpolicy-legacy` remains as historical compatibility.
- `exec-server` owns local/remote execution, filesystem RPC, HTTP transport,
  sandbox helper execution, and environment selection.
- `file-system` provides shared async filesystem traits.
- `apply-patch` owns patch grammar, invocation detection, verification, and
  filesystem-backed application.
- `git-utils` supports branch/root detection, patch application, baselines, and
  diff generation.
- `hooks` owns hook discovery, trust, event schemas, handler execution, and
  output parsing.
- `file-search`, `file-watcher`, and `exec` provide fuzzy search, watch
  subscriptions, and the headless app-server facade.

## Key Abstractions

- Tool contract: `ToolSpec`, configured specs, tool definitions, dynamic/MCP
  spec adapters.
- Policy: policy, rule, match, evaluation, decision, and rule amendments.
- Execution: backend, process, executor filesystem, HTTP client, environment,
  environment manager.
- Patch: patch action, file change, applied delta, verified intent.
- Hooks: configured handlers, event request/response, preview/run lifecycle.
- Search/watch: session reporter, search snapshots, watch registrations.

## Data Flow

1. Tool exposure starts with config and model capabilities producing tool specs.
2. MCP and dynamic schemas are normalized before model exposure.
3. Shell execution passes through parsing, policy, hooks, approval, sandbox
   selection, and finally environment execution.
4. Explicit policy rules run first. Fallback uses command heuristics, approval
   policy, sandbox mode, and sandbox override requests.
5. Process execution goes through local or remote `exec-server` backends.
6. Output is sequenced, retained, and emitted through reads and notifications.
7. Filesystem mutation goes through executor filesystem traits.
8. `apply_patch` invocations can be intercepted before shell execution,
   verified, assessed, approved, and applied through the selected backend.
9. Hooks run as JSON-stdin command handlers and return structured allow, block,
   or context decisions.
10. Headless `codex exec` drives app-server APIs rather than executing tools
    directly.

## Design Patterns and Rationale

- Tool specs are separate from tool handlers, so model-visible capability is
  not the same as execution authority.
- Local and remote execution share traits so orchestration code does not depend
  on where work happens.
- Explicit policy can bypass sandbox; heuristic allows still rely on sandboxing.
- Hooks use preview/run so clients can display pending hook work.
- Mutation paths parse and verify intent before side effects.
- Routing state favors cheap notification reads plus serialized writes.
- File watching and file search are service utilities, not TUI utilities.

## Integration Points

- Core exec policy connects rules, shell parsing, approval settings, sandboxing,
  and policy amendments.
- Core patch runtime connects verification and safety to filesystem mutation.
- Core hook runtime adapts tool calls to hook names and outcomes.
- Unified exec process manager bridges tool calls into `exec-server`.
- App-server file search and skills watcher consume search/watch services.
- Headless `exec` integrates app-server, config loading, environment manager,
  and event rendering.

## Surprising Decisions

- `apply_patch` is a distinct mutation protocol even when invoked through a
  shell-like path.
- Patch parsing is more permissive internally than user-facing guidance.
- Remote exec clients are lazy but do not model reconnection as a core feature.
- Hook handlers for one event can run concurrently while aggregation preserves
  display order.
- Hooks can be enabled but not trusted until their hash is accepted.
- `file-search` handles gitignore context intentionally rather than blindly
  walking parent ignores.
- Headless `exec` rejects interactive approval requests.

## Book Implications

- Explain tool execution as a layered pipeline: spec, interpretation, policy,
  hooks, approval, sandbox, backend execution, event reporting.
- Treat `exec-server` as the abstraction for where work happens.
- Give `apply_patch` its own mutation-protocol chapter.
- Include hooks as an execution-control subsystem, not a configuration detail.
- Distinguish current policy from legacy policy.
