# Chapter 3: CLI Entrypoint

The top-level command is the program's front desk. It does not perform every
task itself. Its job is to understand what the user asked for and hand the
request to the right subsystem.

## The Clap model

Codex uses `clap`, a Rust command-line parsing library. The central type is
`MultitoolCli` in
[`codex-rs/cli/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L79).
The name is accurate: the binary is one executable with many tools inside it.

The `Subcommand` enum begins around
[`main.rs#L106`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106).
Each variant is a user-facing mode: interactive TUI, non-interactive exec,
review, login, MCP management, plugin management, app server, sandbox helpers,
debug tools, and more.

Enums are a good fit here. A command either is `Exec`, or `Login`, or
`McpServer`, and the compiler can force the routing code to consider the
known cases.

## Dispatch, not ownership

The actual dispatch happens lower in the same file near
[`cli_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L803).
The important design idea is that the CLI does not own all behavior. It calls
into other crates:

<div class="flow">
  <div><strong>No subcommand</strong>Launch the interactive terminal UI.</div>
  <div><strong><code>exec</code></strong>Run non-interactive automation.</div>
  <div><strong><code>app-server</code></strong>Expose JSON-RPC transport.</div>
  <div><strong><code>mcp</code></strong>Manage MCP server configuration.</div>
</div>

This keeps the command parser from becoming an application monolith. The CLI
decides where to go; the destination crate decides how to work.

## The three major user surfaces

Codex has three surfaces worth separating:

1. Interactive TUI, launched through
   [`codex_tui::run_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/lib.rs#L710).
2. Non-interactive exec, implemented around
   [`codex_exec::run_main`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/exec/src/lib.rs#L233).
3. App server, bootstrapped through
   [`run_main_with_transport_options`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433).

The source becomes easier once you stop thinking of the TUI as "the app."
The TUI is one client. Exec is another client. App-server clients are another
class of clients. They all need a way to create threads, start turns, receive
events, and answer approval requests.

## Configuration enters early

CLI parsing also collects overrides. A user may pass flags that affect model
selection, sandbox behavior, approval mode, working directory, or profile
choice. Those flags do not execute the agent loop by themselves. They become
part of effective configuration that later modules consume.

This is a common systems pattern: entrypoints should normalize input quickly,
then pass typed configuration downward. The alternative is for every module to
parse raw command-line strings, which would couple everything to the CLI.

## Reading exercise

Read the `Subcommand` enum and classify each variant as one of:

- user interface,
- automation,
- account/configuration,
- integration,
- debugging/safety.

Then inspect where each variant is dispatched. You will see the project
boundaries emerge from the routing table.

