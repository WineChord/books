---
layout: home
hero:
  name: Codex 源码剖析
  text: 把 OpenAI Codex CLI 当作一个生产级 Agent 系统来阅读。
  tagline: "一本中英文双语、源码链接固定到公开 GitHub commit 的在线书：从命令入口、协议消息、会话运行时、模型流式输出、工具执行、审批、沙箱、MCP、Skills、TUI 到 app-server，追踪一次用户请求如何完成。"
actions:
  - theme: brand
    text: 从前言开始
    link: /zh/codex-from-source/preface
  - theme: alt
    text: 模式索引
    link: /zh/codex-from-source/patterns
  - theme: alt
    text: English
    link: /codex-from-source/
features:
  - title: 源码固定
    details: 所有 Codex 源码论断都链接到公开 openai/codex 仓库的同一个 commit。
  - title: 初学者友好
    details: 每章先解释 Rust、异步、协议和工具调用的基本概念，再深入具体文件。
  - title: 可迁移
    details: 每章都会提炼可以复用到其他 Agent 系统的工程模式。
---

## 你将追踪什么

本书反复使用一个普通场景：

> 开发者要求 Codex 修改代码；Codex 阅读仓库，提出工具调用，在需要时请求审批，应用补丁，展示 diff，然后把控制权交还给用户。

这个路径足以暴露系统主干：命令分发、类型化协议、session queue pair、模型流式输出、工具路由、审批策略、沙箱选择、补丁跟踪、MCP/app 集成，以及面向用户的事件渲染。

<ArchitectureMap />

## 你将学到什么

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>Agent 循环</h3>
    <p>一次 turn 为什么不是一次模型调用，而是 prepare、sample、act、observe 的循环。</p>
  </div>
  <div class="pattern-card">
    <h3>类型化协议</h3>
    <p>Codex 如何用 operation、submission、event、JSON-RPC request 和 schema 作为产品契约。</p>
  </div>
  <div class="pattern-card">
    <h3>工具执行</h3>
    <p>shell、patch、MCP、dynamic tool 如何经过路由、hook、审批、取消和结果上报。</p>
  </div>
  <div class="pattern-card">
    <h3>安全边界</h3>
    <p>approval mode、permission profile、Guardian review、平台沙箱和网络策略如何分层。</p>
  </div>
  <div class="pattern-card">
    <h3>扩展接入面</h3>
    <p>skills、plugins、apps、MCP servers 和显式 mention 如何扩展能力，同时不改写核心循环。</p>
  </div>
  <div class="pattern-card">
    <h3>客户端接入面</h3>
    <p>TUI 和 app-server 如何复用同一个 core runtime，却服务完全不同的客户端体验。</p>
  </div>
</div>

## 目录

<div class="part-toc">
  <section>
    <h3>第一部：系统地图</h3>
    <p>从可见产品开始，找到真正重要的契约边界。</p>
    <ol>
      <li><a href="chapter-01">阅读策略</a></li>
      <li><a href="chapter-02">仓库地形</a></li>
      <li><a href="chapter-03">CLI 入口</a></li>
      <li><a href="chapter-04">协议层</a></li>
    </ol>
  </section>
  <section>
    <h3>第二部：追踪一个 Turn</h3>
    <p>从 session 创建读到模型和工具反复交互。</p>
    <ol start="5">
      <li><a href="chapter-05">Session Facade</a></li>
      <li><a href="chapter-06">Turn 循环与流式输出</a></li>
    </ol>
  </section>
  <section>
    <h3>第三部：执行工具</h3>
    <p>理解模型请求如何变成受监督的文件系统或进程副作用。</p>
    <ol start="7">
      <li><a href="chapter-07">工具注册与分发</a></li>
      <li><a href="chapter-08">补丁与 Turn Diff</a></li>
      <li><a href="chapter-09">审批控制面</a></li>
    </ol>
  </section>
  <section>
    <h3>第四部：边界与接入面</h3>
    <p>研究让 Agent 能被终端、应用、插件和 MCP 服务器使用的运行时边界。</p>
    <ol start="10">
      <li><a href="chapter-10">沙箱与运行时边界</a></li>
      <li><a href="chapter-11">MCP、Apps、Skills、Plugins</a></li>
      <li><a href="chapter-12">TUI 与 app-server</a></li>
    </ol>
  </section>
</div>

## 适合谁读

- **源码阅读初学者**：想学习如何从类型、队列和模块边界读一个大型 Rust 系统。
- **Agent 系统建设者**：想复用工具 API、审批、沙箱、记忆、扩展加载和 UI 事件流模式。
- **技术审查者**：在审计安全、兼容性或运行时行为前，需要一张可靠地图。

## 源码策略

Codex 源码快照固定为
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。
本书不使用本机源码路径；代码链接指向公开 GitHub URL，并通过自动检查拒绝私有路径和基于分支的 Codex 链接。

## 参考页

- [模式索引](patterns)
- [源码索引](source-atlas)
- [参考文献](bibliography)
- [写作流水线](pipeline)
