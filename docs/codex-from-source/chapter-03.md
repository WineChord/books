# Chapter 3: CLI Entrypoint

<div class="chapter-lede">
  <p><strong>You are here:</strong> the user has typed a command, but no agent loop has started yet.</p>
  <p><strong>Problem:</strong> entry code must translate messy command-line reality into clean runtime choices.</p>
  <p><strong>Mental model:</strong> the CLI is a train station: it sells tickets, checks the platform, and sends passengers to the right line.</p>
</div>

Entrypoints should be thin, but not trivial. They handle platform selection,
arguments, configuration overrides, authentication commands, sandbox debug
tools, MCP management, app-server mode, and ordinary interactive use. Their
job is not to implement the whole agent. Their job is to pick the right owner.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Native binary selection | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | The npm package launches a platform-specific binary rather than implementing the agent in JavaScript. |
| Top-level CLI modes | [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106) | Defines the major user-visible routes. |
| App-server route | [`Subcommand::AppServer`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L130) | Shows that Codex can run as a headless service, not only as a TUI. |
| MCP CLI | [`mcp_cmd.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39) | Shows management commands for external MCP servers. |

</div>

## Command Dispatch Table

| User-facing path | CLI representation | Destination idea |
| --- | --- | --- |
| `codex` with no subcommand | default branch after parsing | Start the interactive terminal experience. |
| `codex exec ...` | exec-style subcommand | Run a non-interactive turn for automation. |
| `codex app-server` | `Subcommand::AppServer` | Start a JSON-RPC service surface. |
| `codex mcp ...` | `Subcommand::Mcp` | Manage MCP server configuration and auth. |
| login/logout/auth commands | auth-oriented subcommands | Update account state before runtime use. |
| sandbox/debug commands | debug-oriented subcommands | Help diagnose execution boundaries. |

This dispatch table is a reading technique. Once you know which branch owns a
mode, you can stop reading unrelated branches. A beginner should not try to
understand app-server routing while reading login behavior.

## Configuration Is Also Input

The user's text prompt is not the only input. Codex also receives working
directory, model choice, approval policy, sandbox policy, feature flags,
profiles, environment choices, and persisted config layers. These settings
shape what the session may do later.

That is why entry code matters. It is the last place where command-line flags
and environment assumptions are still close to the user. Later layers should
receive typed configuration, not re-parse raw command-line strings.

| Setting | Why it matters later |
| --- | --- |
| `cwd` | Determines which repository tools inspect and which paths sandbox rules interpret. |
| Model | Shapes model instructions, streaming behavior, and possible reasoning settings. |
| Approval policy | Controls when shell or file-changing tools ask for permission. |
| Sandbox policy | Controls filesystem, network, and platform execution constraints. |
| MCP config | Determines which external tools may appear in a turn. |

## Thin Does Not Mean Dumb

A good entrypoint avoids deep business logic, but it still enforces a clean
handoff. In Codex, the CLI knows enough to parse modes and prepare runtime
arguments. The core session knows how to run turns. The app-server knows how
to route JSON-RPC requests. This separation keeps the CLI from becoming the
only place where product behavior can evolve.

<div class="apply-this">

## Apply This

- Keep entrypoints as routers, not as hidden runtimes.
- Treat configuration as first-class input.
- Build command dispatch tables when reading large CLIs.
- Let specialized crates own specialized behavior.

</div>

## Read the Source Next

- [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15):
  inspect the native-binary handoff.
- [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L106):
  classify user-facing modes.
- [`McpCli`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39):
  see how one subcommand family gets its own module.

<div class="exercise-box">

## Reading Exercise

Choose three `Subcommand` variants. For each one, find the match branch that
handles it and name the crate or module that owns the real behavior. This
trains the habit of separating routing from implementation.

</div>

<div class="next-step">

## What Comes Next

After entry code chooses a path, Codex needs stable messages. The next chapter
studies the protocol layer that turns product behavior into typed operations,
events, requests, and notifications.

</div>
