---
layout: home
hero:
  name: Codex From Source
  text: A source-equivalent book about the OpenAI Codex runtime.
  tagline: "A professional, source-pinned architecture book that explains Codex as an event-sourced agent runtime with typed contracts, policy-gated tools, replayable state, multiple clients, extensions, cloud workflows, and executable governance."
actions:
  - theme: brand
    text: Start reading
    link: /codex-from-source/preface.html
  - theme: alt
    text: Reader map
    link: /codex-from-source/reader-map.html
  - theme: alt
    text: 中文版
    link: /zh/codex-from-source/
features:
  - title: Source-Equivalent
    details: "The book is written so readers can understand the architecture, data flow, contracts, and trade-offs without opening the source first."
  - title: Publication-Grade
    details: "Chapters are organized as a technical book, not API docs: each layer solves one problem and prepares the next."
  - title: Source-Pinned
    details: "Source links point to one public openai/codex commit for auditability without relying on branch state."
---

<div class="book-hero-panel">
  <div class="book-hero-copy">
    <h2>Read Codex as a system, not as a pile of files.</h2>
    <p>
      Codex is built around one architectural bet: treat an AI coding agent as
      an event-sourced runtime whose dangerous capabilities pass through typed
      contracts, explicit policy, and replayable boundaries.
    </p>
    <p>
      This book follows that bet through command startup, configuration,
      protocol design, sessions, model streaming, tool execution, approvals,
      sandboxes, app-server, TUI rendering, MCP, skills, plugins, migration,
      multi-agent coordination, cloud tasks, memory, build systems, packaging,
      release, and CI governance.
    </p>
  </div>
  <div class="book-cover" aria-label="Codex From Source cover">
    <div class="book-cover__kicker">Architecture, Patterns, Internals</div>
    <div class="book-cover__title">Codex<br />From<br />Source</div>
    <div class="book-cover__footer">25 chapters + epilogue</div>
  </div>
</div>

<ArchitectureMap />

## What This Book Teaches

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>Runtime as contract</h3>
    <p>Threads, turns, operations, events, items, and rollouts form the stable vocabulary that lets clients and replays understand the same work.</p>
  </div>
  <div class="pattern-card">
    <h3>Tools as capability</h3>
    <p>Model-visible tool specs are separated from routing, hooks, approvals, sandbox transforms, execution, output shaping, and persistence.</p>
  </div>
  <div class="pattern-card">
    <h3>Clients as surfaces</h3>
    <p>The TUI, app-server, SDKs, daemon paths, and remote clients share one runtime contract instead of each owning its own agent.</p>
  </div>
  <div class="pattern-card">
    <h3>Extensions as trust planes</h3>
    <p>MCP, skills, plugins, connectors, and typed extensions add capability only through explicit provenance and validation boundaries.</p>
  </div>
  <div class="pattern-card">
    <h3>Coordination as durable graph</h3>
    <p>Multi-agent work, cloud tasks, identity, memory, and trace reduction make long-running work reconstructable instead of invisible.</p>
  </div>
  <div class="pattern-card">
    <h3>Governance as executable design</h3>
    <p>Build overlays, generated schemas, packaging lanes, release checks, and CI policies keep the architecture from depending on memory.</p>
  </div>
</div>

## Table of Contents

<div class="part-toc">
  <section>
    <h3>Part I: Establish the Contract</h3>
    <p>A complex agent becomes understandable when every actor speaks the same language.</p>
    <ol>
      <li><a href="chapter-01.html">The Architectural Bet</a></li>
      <li><a href="chapter-02.html">From Distribution Wrapper to Rust Router</a></li>
      <li><a href="chapter-03.html">Configuration, Authentication, and Managed Requirements</a></li>
      <li><a href="chapter-04.html">The Protocol Boundary</a></li>
    </ol>
  </section>
  <section>
    <h3>Part II: Build the Agent Runtime</h3>
    <p>The runtime is a scheduler for context, streaming, tools, cancellation, and replay.</p>
    <ol start="5">
      <li><a href="chapter-05.html">Threads, Sessions, and Durable State</a></li>
      <li><a href="chapter-06.html">The Turn Loop</a></li>
      <li><a href="chapter-07.html">Model Providers, Streaming, and Backend Tasks</a></li>
      <li><a href="chapter-08.html">Observability and Rollout Trace</a></li>
    </ol>
  </section>
  <section>
    <h3>Part III: Execute Side Effects</h3>
    <p>A model can suggest an action. Codex decides whether it becomes a side effect.</p>
    <ol start="9">
      <li><a href="chapter-09.html">Tool Specifications, Routing, and Dispatch</a></li>
      <li><a href="chapter-10.html">Shell, Exec Server, and Filesystem Tools</a></li>
      <li><a href="chapter-11.html">Patches as a First-Class Editing Protocol</a></li>
      <li><a href="chapter-12.html">Hooks and Human Approval</a></li>
      <li><a href="chapter-13.html">Sandboxes, Network Policy, and Platform Boundaries</a></li>
    </ol>
  </section>
  <section>
    <h3>Part IV: Open the Runtime to Clients</h3>
    <p>A runtime becomes a platform when multiple clients share the same thread model.</p>
    <ol start="14">
      <li><a href="chapter-14.html">The App-Server Contract</a></li>
      <li><a href="chapter-15.html">SDKs, Daemons, and Remote Control</a></li>
      <li><a href="chapter-16.html">The TUI as an Event Renderer</a></li>
    </ol>
  </section>
  <section>
    <h3>Part V: Extend the System</h3>
    <p>Extension points are useful only when each trust boundary is explicit.</p>
    <ol start="17">
      <li><a href="chapter-17.html">MCP: External Tools Without Runtime Entanglement</a></li>
      <li><a href="chapter-18.html">Skills, Plugins, Connectors, and Typed Extensions</a></li>
      <li><a href="chapter-19.html">External Migration and Backward Compatibility</a></li>
    </ol>
  </section>
  <section>
    <h3>Part VI: Coordinate Work Beyond One Turn</h3>
    <p>Durable actions make agent graphs, tasks, memory, and cloud workflows possible.</p>
    <ol start="20">
      <li><a href="chapter-20.html">Multi-Agent Coordination</a></li>
      <li><a href="chapter-21.html">Cloud Tasks, Identity, and Remote Work</a></li>
      <li><a href="chapter-22.html">Memories and User-Level State</a></li>
    </ol>
  </section>
  <section>
    <h3>Part VII: Ship and Govern the System</h3>
    <p>Architecture survives only when release, tests, and governance enforce it.</p>
    <ol start="23">
      <li><a href="chapter-23.html">Build Systems and Generated Contracts</a></li>
      <li><a href="chapter-24.html">Packaging, Release, and Native Dependencies</a></li>
      <li><a href="chapter-25.html">CI, Policy, and Architectural Governance</a></li>
    </ol>
    <p><a href="epilogue.html">Epilogue: What to Steal</a></p>
  </section>
</div>

## Who This Is For

- **Technical leaders** who want architecture, design rationale, and trade-offs
  without reading every code-adjacent detail.
- **Senior engineers** who want implementation-level understanding of the
  runtime, protocol, tool system, clients, and release machinery.
- **Agent builders** who want transferable patterns for typed events, policy
  gates, extension systems, replay, and executable governance.

## Source Policy

The Codex source snapshot is
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).
The book avoids local source paths. Code links point to public GitHub URLs, and
automated checks reject private paths and branch-based Codex links.

## Reference Pages

- [Pattern Index](patterns.html)
- [Source Atlas](source-atlas.html)
- [Implementation Reference](implementation-reference.html)
- [Bibliography](bibliography.html)
- [Production Pipeline](pipeline.html)
