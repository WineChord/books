# Audience and Positioning

This page executes Phase 2 of the rewrite brief. It defines the audience, core
thesis, value of the book, and editorial stance before the outline becomes a
chapter plan.

## Primary Audience

The book serves two readers at the same time.

### Technical Leaders

These readers want architectural judgment more than line-by-line mechanics.
They already understand distributed systems, typed APIs, product surfaces, and
operational risk. They want to know why Codex is shaped this way:

- why the system centers on threads, turns, items, tools, and events;
- why app-server exists beside the terminal UI and `exec`;
- why execution safety is split across policy, approvals, sandbox transforms,
  platform helpers, hooks, and managed networking;
- why extensions are declarative first, with MCP, skills, plugins, and typed
  in-process contributors layered separately;
- where compatibility obligations constrain cleaner designs.

They can skip deep dives, pseudocode blocks, and source-adjacent sidebars while
still understanding the system's architectural bet.

### Senior Engineers

These readers want implementation-level understanding without reading every
source file first. They already know enough Rust, async systems, JSON-RPC,
terminal UI, and model-tool loops to appreciate details. They want:

- the control path from command startup to thread creation and turn execution;
- the model path from provider registry to Responses streaming;
- the tool path from model-visible spec to backend execution and event output;
- the persistence path from rollout JSONL to SQLite projections and replay;
- the client path from protocol events to TUI rendering, app-server
  notifications, and SDK behavior;
- the extension path from plugin manifests and skill metadata to runtime
  context and MCP tool calls.

They should read every chapter, including deep dives, Apply This sections, and
source-audit appendices.

## Core Thesis

Codex is built around one architectural bet:

> Treat the agent as an event-sourced runtime whose dangerous capabilities are
> exposed only through typed contracts, policy gates, and replayable boundaries.

Everything else serves that bet:

- the CLI is thin because long-lived behavior belongs behind reusable runtime
  contracts;
- the protocol is explicit because clients, SDKs, replays, and tests need one
  vocabulary for submissions, events, turns, items, approvals, and tools;
- the session loop is queue-driven because user input, model streaming, tool
  calls, interruption, and compaction must interleave without corrupting
  history;
- tools are split into specs, routers, hooks, policy, approvals, sandboxing,
  backend execution, and output normalization because model intent is not
  trusted side effect;
- app-server exists because a terminal UI is only one client of the runtime;
- extensions are layered because third-party capability should enter through
  validated surfaces, not arbitrary core rewrites;
- rollout traces, state projections, memories, cloud tasks, and multi-agent
  graph edges exist because a useful agent must make its actions reconstructable.

## What Makes This Worth a Book

Reading the source gives facts. The book must give a system.

The source is split by crate ownership: core runtime, protocol, model clients,
tool execution, app-server, TUI, sandboxing, plugins, SDKs, cloud tasks, and
release infrastructure all tell local truths. The important knowledge is often
cross-cutting:

- an approval notification begins in tool execution, passes through core
  runtime, becomes app-server JSON-RPC, renders as TUI modal state, and may be
  rejected in headless `exec`;
- a turn is simultaneously model-visible context, durable rollout, app-server
  item stream, analytics fact, and terminal rendering input;
- a plugin can contribute skills, MCP servers, app connector IDs, hooks, and
  model-visible summaries;
- sandbox behavior cannot be understood from one crate because policy
  compilation, Linux helpers, macOS Seatbelt, Windows identities, and managed
  proxying are separate layers.

The book earns its place by adding:

- **Narrative:** one path through the system, then the variants.
- **Rationale:** why boundaries exist and what trade-offs they encode.
- **Synthesis:** repeated patterns across unrelated crates.
- **Transfer:** designs a reader can reuse in their own agent systems.
- **Editorial judgment:** where the design is elegant, where compatibility
  weighs it down, and where the abstraction is still evolving.

## Editorial Contract

The rewrite must not become reference documentation. Each chapter must answer a
problem:

- What pressure forced this layer to exist?
- What boundary did the implementation choose?
- What alternatives were rejected or deferred?
- What pattern is reusable outside Codex?
- What compatibility or safety cost came with the choice?

The book should not reproduce source. Code blocks in the final draft must be
pseudocode and must use generic names. Source identifiers may appear as
architectural anchors, but implementation bodies must not be copied.
