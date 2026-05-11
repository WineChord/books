# Chapter 2: Repository Topography

<div class="chapter-lede">
  <p><strong>You are here:</strong> the product loop now needs a physical map.</p>
  <p><strong>Problem:</strong> a Rust workspace can look like a flat pile of crates unless you group them by responsibility.</p>
  <p><strong>Mental model:</strong> Codex is a city: gates, roads, dispatch centers, workshops, guard posts, and public service desks.</p>
</div>

Codex is organized as a workspace, not as one giant binary. That matters
because workspace boundaries reveal ownership. The CLI should not know every
detail of patch application. The TUI should not own the model loop. The
protocol crate should not depend on terminal rendering.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| Rust workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) | Lists the crate-level units of ownership. |
| npm launcher | [`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L15) | Shows the JavaScript installation wrapper around native binaries. |
| App-server crate | [`app-server/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/lib.rs#L433) | Exposes a headless service surface for other clients. |
| Core runtime | [`core/src/session/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364) | Owns the main agent runtime. |

</div>

## The Main Families

| Family | Representative crates or paths | Responsibility |
| --- | --- | --- |
| Installation and entry | `codex-cli`, `codex-rs/cli` | Start the right binary, parse commands, route user modes. |
| Protocol | `protocol`, `app-server-protocol` | Define typed operations, events, app-server requests, responses, and generated schemas. |
| Runtime | `core`, `exec`, `apply-patch` | Manage sessions, turns, model calls, tools, subprocesses, and edits. |
| User surfaces | `tui`, `app-server`, `app-server-client` | Render interactive terminal state or serve external clients. |
| Integration | `codex-mcp`, `config`, `plugin`, `core-skills` | Load MCP servers, plugins, skills, and configuration. |
| Safety and execution | `sandboxing`, `linux-sandbox`, `execpolicy`, `cloud-requirements` | Bound filesystem, network, approval, and environment behavior. |
| Observability and storage | `analytics`, `rollout-trace`, `agent-graph-store` | Record what happened for debugging, telemetry, and trace analysis. |

This table is more useful than an alphabetical crate list because it gives you
a question for each file: "Which family should own this responsibility?" When
you find a file that seems to cross families, slow down. Those crossings are
often the most important design decisions.

## Inbound and Outbound Thinking

For each crate, ask two questions:

1. Who calls into this crate?
2. What does this crate call out to?

The protocol crates are mostly inbound contracts: many layers use them, but
they should stay light and stable. The core crate is a hub: it receives
operations, calls model clients, dispatches tools, talks to MCP, emits events,
and asks safety layers for decisions. The TUI is a client of protocol events:
it should render state rather than own the agent loop.

This is a practical way to read dependencies. You do not need to understand
all crates at once. You only need to understand the direction of knowledge.
Entry layers know how a user arrives. Runtime layers know how work proceeds.
Boundary layers know what is allowed. Surface layers know what to show.

## The Recurring Scenario on the Map

When the user asks for a code change, the route is roughly:

<div class="flow">
  <div><strong>CLI/TUI</strong>Accept the prompt and current settings.</div>
  <div><strong>Protocol</strong>Represent the request as typed data.</div>
  <div><strong>Core</strong>Create or reuse a session and run a turn.</div>
  <div><strong>Tools</strong>Read files, run commands, apply patches, or call MCP.</div>
  <div><strong>Surface</strong>Render progress, approvals, diffs, and completion.</div>
</div>

The important point is not that every request uses every crate. The important
point is that each crate family has a reason to exist.

<div class="trace-ledger">

## Trace Ledger

| Question | Chapter 2 answer |
| --- | --- |
| Where is the user request now? | It is being placed inside the repository ownership map. |
| What carries it? | Crate boundaries, dependency direction, and public protocol surfaces. |
| Who decides next? | Ownership boundaries decide whether entry, protocol, runtime, tools, safety, or presentation should handle the next step. |
| What can fail here? | A reader can assign behavior to the wrong crate, especially by confusing UI presentation with runtime ownership. |

</div>

<div class="apply-this">

## Apply This

- Group a large repository by responsibility before reading files.
- Look for ownership boundaries, not just module names.
- Use inbound/outbound questions to detect architectural hubs.
- Expect safety and UI to be separate concerns, even when they meet at runtime.

</div>

## Read the Source Next

- [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1):
  identify crate families.
- [`app-server/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/README.md#L1):
  inspect the external API surface.
- [`linux-sandbox/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/README.md#L1):
  see how one safety component documents its boundary.

<div class="exercise-box">

## Self-Check

Answer without opening source: why should UI crates consume protocol events
instead of owning the agent loop? Explain inbound and outbound dependencies in
one sentence each.

</div>

<div class="exercise-box">

## Optional Source Lab

Pick five crates from `codex-rs/Cargo.toml`. For each one, write a one-line
responsibility and name one crate family from the table above. If a crate does
not fit, that is a signal to inspect it more carefully.

</div>

<div class="next-step">

## What Comes Next

The next chapter starts at the visible entrance: how the installed command and
Rust CLI route users into the rest of the system.

</div>
