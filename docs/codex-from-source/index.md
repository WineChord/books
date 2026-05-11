---
layout: home
hero:
  name: Codex From Source
  text: A bilingual source-code reading book.
  tagline: "Learn how OpenAI Codex CLI turns a prompt into a supervised software-engineering loop: protocol, runtime, tools, approvals, sandboxes, MCP, TUI, and app-server integration."
actions:
  - theme: brand
    text: Start with the Preface
    link: /codex-from-source/preface
  - theme: alt
    text: 中文版
    link: /zh/codex-from-source/
features:
  - title: Beginner First
    details: Each chapter starts from the concrete user experience before descending into Rust modules and control flow.
  - title: Deep Source Links
    details: Code references are pinned to a specific public openai/codex commit.
  - title: Agent Context
    details: The book connects Codex internals to ReAct, tool calling, MCP, and sandboxing literature.
---

<div class="book-grid">
  <div class="book-card">
    <h3>Current source snapshot</h3>
    <p>
      The analysis is pinned to
      <a href="https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3"><code>569ff6a1c400bd514ff79f5f1050a684dc3afde3</code></a>.
    </p>
  </div>
  <div class="book-card">
    <h3>Reading path</h3>
    <p>
      Start with the command line, then follow messages into the core session,
      tools, approval checks, and user interfaces.
    </p>
  </div>
  <div class="book-card">
    <h3>Scope</h3>
    <p>
      This book studies the open-source CLI repository, not OpenAI's private
      hosted service or model internals.
    </p>
  </div>
</div>

## Chapters

1. [Reading Strategy](chapter-01)
2. [Repository Topography](chapter-02)
3. [CLI Entrypoint](chapter-03)
4. [Protocol](chapter-04)
5. [Session Runtime](chapter-05)
6. [Tools and Patches](chapter-06)
7. [Sandboxing and Approval](chapter-07)
8. [MCP, Apps, and Skills](chapter-08)
9. [TUI and App Server](chapter-09)
