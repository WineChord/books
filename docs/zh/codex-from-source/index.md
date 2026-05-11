---
layout: home
hero:
  name: Codex 源码剖析
  text: 一本双语源码阅读书。
  tagline: "从用户的一句话出发，读懂 OpenAI Codex CLI 如何组织协议、运行时、工具、审批、沙箱、MCP、TUI 与 app-server。"
actions:
  - theme: brand
    text: 从前言开始
    link: /zh/codex-from-source/preface
  - theme: alt
    text: English
    link: /codex-from-source/
features:
  - title: 初学者友好
    details: 每章先解释用户能看到的现象，再进入 Rust 模块和控制流。
  - title: 深入源码
    details: 所有源码引用都固定到公开 openai/codex 仓库的同一个 commit。
  - title: 放在更大语境中理解
    details: 结合 ReAct、工具调用、MCP 与沙箱安全等公开资料一起阅读。
---

<div class="book-grid">
  <div class="book-card">
    <h3>源码快照</h3>
    <p>
      本书固定分析
      <a href="https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3"><code>569ff6a1c400bd514ff79f5f1050a684dc3afde3</code></a>
      这个公开 commit。
    </p>
  </div>
  <div class="book-card">
    <h3>阅读路线</h3>
    <p>
      先从命令行入口开始，再沿着消息进入核心会话、工具、审批检查和用户界面。
    </p>
  </div>
  <div class="book-card">
    <h3>范围说明</h3>
    <p>
      本书分析开源 CLI 仓库，不声称覆盖 OpenAI 私有托管服务或模型内部实现。
    </p>
  </div>
</div>

## 章节

1. [阅读策略](chapter-01)
2. [仓库地形](chapter-02)
3. [CLI 入口](chapter-03)
4. [协议层](chapter-04)
5. [会话运行时](chapter-05)
6. [工具与补丁](chapter-06)
7. [沙箱与审批](chapter-07)
8. [MCP、Apps 与 Skills](chapter-08)
9. [TUI 与 App Server](chapter-09)
