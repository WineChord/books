# Chapter 2: Repository Topography

Codex is organized as a small JavaScript package wrapped around a large Rust
workspace. That shape is practical: npm is a familiar distribution channel for
CLI tools, while Rust is a strong fit for a cross-platform terminal program
that must manage processes, files, async streams, and platform sandboxes.

## The outer shell

At the root, the repository has a monorepo maintenance
[`package.json`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/package.json)
and a CLI package under
[`codex-cli`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli).
The wrapper script
[`codex-cli/bin/codex.js`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/bin/codex.js#L175)
spawns the native binary. Think of it as a launcher, not the brain.

The brain is the Rust workspace declared in
[`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1).
The workspace lists many crates because Codex has many responsibilities:
configuration, login, protocol, TUI, app server, model providers, MCP, tools,
execution policy, sandboxing, rollout storage, and more.

## A map of crate families

The names are easier to remember if you group them by role:

<div class="source-grid">
  <div class="source-card">
    <h3>Entrypoints</h3>
    <p><code>cli</code>, <code>tui</code>, <code>exec</code>, <code>app-server</code>.</p>
  </div>
  <div class="source-card">
    <h3>Runtime</h3>
    <p><code>core</code>, <code>protocol</code>, <code>thread-store</code>, <code>rollout</code>.</p>
  </div>
  <div class="source-card">
    <h3>External I/O</h3>
    <p><code>codex-api</code>, <code>model-provider</code>, <code>codex-mcp</code>, <code>connectors</code>.</p>
  </div>
  <div class="source-card">
    <h3>Boundaries</h3>
    <p><code>exec</code>, <code>execpolicy</code>, <code>sandboxing</code>, <code>linux-sandbox</code>.</p>
  </div>
</div>

This grouping is not official terminology; it is a reading aid. The important
point is that Codex separates user surfaces from the core runtime. A terminal
UI and a headless app server can share the same lower-level session logic.

## Why there are many small crates

Beginners often expect one application to be one package. Rust workspaces
encourage a different style: split code by stable responsibility. For Codex,
that has several benefits.

First, build boundaries make dependencies explicit. A sandboxing crate can
depend on process and platform utilities without dragging UI code with it.
Second, tests can focus on smaller units. Third, the project can expose some
crates as reusable libraries while keeping other modules private.

The root of the core library,
[`codex-rs/core/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/lib.rs#L1),
is a useful table of contents. It lists modules for sessions, tools, config,
MCP, skills, sandboxing, rollout, safety, and thread management. The module
list is dense, but it tells you what the core crate owns.

## The first architectural lesson

The repository is not arranged around screens. It is arranged around
capabilities and contracts. The CLI is a door. The TUI is a door. App-server
is another door. Behind those doors, the same source tree needs to answer:

- What user intent arrived?
- Which configuration and permissions apply?
- Which model and tools are available?
- How are tool calls supervised?
- How are events persisted and returned?

Once you see the repository this way, a long list of crates becomes a set of
systems with clear jobs.

