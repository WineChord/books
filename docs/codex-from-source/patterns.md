# Pattern Index

This page collects the reusable design patterns that appear across the book.
They are not Codex-only tricks. They are architectural moves that matter
whenever an LLM product can inspect files, run commands, call external tools,
or serve multiple clients.

## The Patterns

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>Typed Boundary First</h3>
    <p>Read enums and structs before long functions. In Codex, `Op`, `Submission`, `Event`, and app-server requests reveal the product contract.</p>
    <p><a href="chapter-04.html">Chapter 4</a></p>
  </div>
  <div class="pattern-card">
    <h3>Queue Pair Runtime</h3>
    <p>Clients submit operations and listen for events. That shape lets TUI, exec, and app-server clients share one core runtime.</p>
    <p><a href="chapter-05.html">Chapter 5</a></p>
  </div>
  <div class="pattern-card">
    <h3>Turn as Control Unit</h3>
    <p>A turn is the unit where context, model sampling, tools, hooks, compaction, and completion come together.</p>
    <p><a href="chapter-06.html">Chapter 6</a></p>
  </div>
  <div class="pattern-card">
    <h3>Tools as Product Contracts</h3>
    <p>A tool is not just a function. It carries schema, mutability, hooks, cancellation, output formatting, and user-visible effects.</p>
    <p><a href="chapter-07.html">Chapter 7</a></p>
  </div>
  <div class="pattern-card">
    <h3>Patch Instead of Blind Write</h3>
    <p>Structured patches make edits reviewable, approvable, diffable, and easier to attribute to a turn.</p>
    <p><a href="chapter-08.html">Chapter 8</a></p>
  </div>
  <div class="pattern-card">
    <h3>Approval as Control Plane</h3>
    <p>Approval policy, permission hooks, Guardian review, and network amendments sit above individual tools instead of being scattered through them.</p>
    <p><a href="chapter-09.html">Chapter 9</a></p>
  </div>
  <div class="pattern-card">
    <h3>Sandbox as Runtime Transform</h3>
    <p>Codex treats sandboxing as a transformation of execution requests, selected by platform, policy, permissions, and retry semantics.</p>
    <p><a href="chapter-10.html">Chapter 10</a></p>
  </div>
  <div class="pattern-card">
    <h3>Extension by Injection</h3>
    <p>Skills, plugins, app mentions, and MCP inventory become turn-scoped context and tools rather than separate agent loops.</p>
    <p><a href="chapter-11.html">Chapter 11</a></p>
  </div>
  <div class="pattern-card">
    <h3>One Runtime, Many Surfaces</h3>
    <p>The TUI and app-server differ at presentation time, but both consume structured events from the same session model.</p>
    <p><a href="chapter-12.html">Chapter 12</a></p>
  </div>
</div>

## Reading the Patterns Safely

Patterns are only useful when they stay attached to evidence. For each pattern,
the chapter provides an evidence map with pinned source links, an explanation
for beginners, and a small reading exercise. If you want the complete map in
one place, use the [Source Atlas](source-atlas.html).
