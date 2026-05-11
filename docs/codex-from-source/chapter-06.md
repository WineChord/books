# Chapter 6: Tools and Patches

Tools are how Codex changes from a language model into a coding agent. A model
can propose text, but a tool can read files, run tests, apply patches, ask for
approval, or call an MCP server. The danger is also here: tools touch the real
machine. Codex therefore treats tool execution as a routed and supervised
subsystem.

## Registry and routing

The tool registry in
[`core/src/tools/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/registry.rs#L220)
collects tool specifications and handlers. A specification tells the model
what the tool is called and what arguments it expects. A handler performs the
work when the model requests the tool.

Execution then passes through routing and runtime layers such as
[`core/src/tools/parallel.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/parallel.rs#L64)
and
[`core/src/tools/orchestrator.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L50).
Those layers decide whether tool calls can run concurrently, how cancellation
works, and how approval or sandbox retry should wrap execution.

## Shell is not just shell

The shell handler begins around
[`core/src/tools/handlers/shell.rs#L110`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/shell.rs#L110).
At first glance, a shell tool sounds simple: run a command and return stdout
and stderr. In Codex, it is more careful than that. The handler must consider
working directory, environment, command parsing, approval requirements, patch
interception, sandbox permissions, and how output is summarized back into the
conversation.

The actual process request path is in
[`core/src/exec.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/exec.rs#L315).
`build_exec_request` turns tool input into an executable request, while later
functions launch and observe the process. This is where the abstract idea
"the model wants to run tests" becomes a concrete child process.

## The apply_patch design

File edits get special treatment. The standalone patch engine lives in
[`codex-rs/apply-patch/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/apply-patch/src/lib.rs#L277).
The core tool handler lives in
[`core/src/tools/handlers/apply_patch.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/apply_patch.rs#L286).

This split is important. Patch parsing and application are a reusable engine;
agent-facing approval, progress, and event emission belong in the core tool
handler. A clean boundary makes it easier to test patch correctness without
starting a whole model session.

<div class="flow">
  <div><strong>Tool spec</strong>Expose patch capability to the model.</div>
  <div><strong>Parse</strong>Validate the patch grammar and hunks.</div>
  <div><strong>Approve</strong>Check file permissions and policy.</div>
  <div><strong>Apply</strong>Modify files through the patch engine.</div>
  <div><strong>Report</strong>Emit structured file-change events.</div>
</div>

## Why not let the model write files directly?

Direct file writing would be simpler but less auditable. A patch has structure:
add file, delete file, update file, hunks, context, and resulting deltas. That
structure lets Codex show what changed, ask targeted approval, and recover
from invalid edits. It also makes review easier for humans.

The broader lesson is that tool APIs are product design. A good tool is not
merely a function exposed to a model. It is a contract that shapes what the
model can safely ask for and what the user can understand afterward.

