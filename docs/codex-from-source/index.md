---
layout: home
hero:
  name: Codex From Source
  text: Read the OpenAI Codex CLI as a production agent system.
  tagline: "A bilingual, source-pinned book that follows one user request through command entry, protocol messages, session runtime, model streaming, tool execution, approvals, sandboxes, MCP, skills, the TUI, and the app-server."
actions:
  - theme: brand
    text: Start reading
    link: /codex-from-source/preface
  - theme: alt
    text: Reader map
    link: /codex-from-source/reader-map
  - theme: alt
    text: Pattern index
    link: /codex-from-source/patterns
  - theme: alt
    text: 中文版
    link: /zh/codex-from-source/
features:
  - title: Source-Pinned
    details: Every Codex source claim links to the public openai/codex repository at one fixed commit.
  - title: Beginner-First
    details: Chapters explain Rust, async, protocols, and tool calls from their first principles before zooming into files.
  - title: Source-Equivalent
    details: Reference tables collect runtime, protocol, tool, config, security, extension, and client details so source links are evidence rather than homework.
---

## What You Will Trace

The book carries one ordinary scenario through the architecture:

> A developer asks Codex to change code, Codex reads the repository, proposes
> tool calls, asks for permission when needed, applies a patch, reports the
> diff, and returns control to the user.

That one path is enough to expose the system. It touches command dispatch,
typed protocol boundaries, the session queue pair, model streaming, tool
routing, approval policy, sandbox selection, patch tracking, MCP/app
integration, and user-facing event rendering.

<ArchitectureMap />

## Source-Equivalent Reading Standard

The default path is not "open the source and follow along." The default path
is: read the book, answer the self-checks, and use the pinned source links only
when you want line-level verification. The [Reader Map](reader-map) gives a
30-minute path, a 2-hour path, and an optional source-audit path. The
[Implementation Reference](implementation-reference) collects the dense facts
that a source reader would otherwise discover across many files.

## What You Will Learn

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>The Agent Loop</h3>
    <p>How a turn becomes a repeated prepare, sample, act, observe cycle instead of a single model call.</p>
  </div>
  <div class="pattern-card">
    <h3>Typed Protocols</h3>
    <p>Why Codex uses operations, submissions, events, JSON-RPC requests, and generated schemas as product contracts.</p>
  </div>
  <div class="pattern-card">
    <h3>Tool Execution</h3>
    <p>How shell, patch, MCP, and dynamic tools pass through routing, hooks, approvals, cancellation, and reporting.</p>
  </div>
  <div class="pattern-card">
    <h3>Safety Boundaries</h3>
    <p>How approval modes, permission profiles, Guardian review, platform sandboxes, and network policy layer together.</p>
  </div>
  <div class="pattern-card">
    <h3>Extension Surfaces</h3>
    <p>How skills, plugins, apps, MCP servers, and explicit mentions add capability without rewriting the central loop.</p>
  </div>
  <div class="pattern-card">
    <h3>Client Surfaces</h3>
    <p>How the TUI and app-server reuse the same core runtime while serving very different client experiences.</p>
  </div>
</div>

## Table of Contents

<div class="part-toc">
  <section>
    <h3>Part I: Map the System</h3>
    <p>Start from the visible product and learn where the important contracts live.</p>
    <ol>
      <li><a href="chapter-01">Reading Strategy</a></li>
      <li><a href="chapter-02">Repository Topography</a></li>
      <li><a href="chapter-03">CLI Entrypoint</a></li>
      <li><a href="chapter-04">Protocol</a></li>
    </ol>
  </section>
  <section>
    <h3>Part II: Follow a Turn</h3>
    <p>Trace the runtime from session creation to the repeated model-tool loop.</p>
    <ol start="5">
      <li><a href="chapter-05">Session Facade</a></li>
      <li><a href="chapter-06">Turn Loop and Streaming</a></li>
    </ol>
  </section>
  <section>
    <h3>Part III: Execute Tools</h3>
    <p>Understand how a model request becomes a supervised filesystem or process side effect.</p>
    <ol start="7">
      <li><a href="chapter-07">Tool Registry and Dispatch</a></li>
      <li><a href="chapter-08">Patches and Turn Diffs</a></li>
      <li><a href="chapter-09">Approval Control Plane</a></li>
    </ol>
  </section>
  <section>
    <h3>Part IV: Boundaries and Surfaces</h3>
    <p>Study the runtime boundaries that make the agent usable from terminals, apps, plugins, and MCP servers.</p>
    <ol start="10">
      <li><a href="chapter-10">Sandboxes and Runtime Boundaries</a></li>
      <li><a href="chapter-11">MCP, Apps, Skills, Plugins</a></li>
      <li><a href="chapter-12">TUI and App Server</a></li>
    </ol>
  </section>
</div>

## Who This Is For

- **New source readers** who want to learn how to read a large Rust system by
  following types, queues, and module boundaries.
- **Agent builders** who want transferable patterns for tool APIs, approval
  flows, sandboxing, memory, extension loading, and UI event streams.
- **Technical reviewers** who want a grounded map before they audit security,
  compatibility, or operational behavior.

## Source Policy

The Codex snapshot is
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3).
The book avoids local source paths. Code links point to public GitHub URLs, and
the repository includes automated checks that reject private paths and
branch-based Codex links.

## Reference Pages

- [Pattern Index](patterns)
- [Source Atlas](source-atlas)
- [Implementation Reference](implementation-reference)
- [Bibliography](bibliography)
- [Production Pipeline](pipeline)
