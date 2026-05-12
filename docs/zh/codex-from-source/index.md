---
layout: home
hero:
  name: Codex 源码剖析
  text: 一本关于 OpenAI Codex 运行时的源码等价架构书。
  tagline: "一本固定到公开源码 commit 的专业技术书：把 Codex 解释为一个事件溯源的 agent runtime，覆盖类型化契约、策略门控工具、可回放状态、多客户端、扩展、云工作流和可执行治理。"
actions:
  - theme: brand
    text: 从前言开始
    link: /zh/codex-from-source/preface.html
  - theme: alt
    text: 阅读地图
    link: /zh/codex-from-source/reader-map.html
  - theme: alt
    text: English
    link: /codex-from-source/
features:
  - title: 源码等价
    details: 默认读书即可理解架构、数据流、契约和取舍；源码链接用于审计，而不是作业。
  - title: 出版级结构
    details: 章节按技术书组织，不是 API 文档；每一层解决一个问题，并为下一层铺路。
  - title: 源码固定
    details: 所有源码链接都固定到同一个公开 openai/codex commit，避免分支漂移。
---

<div class="book-hero-panel">
  <div class="book-hero-copy">
    <h2>把 Codex 当作系统阅读，而不是当作文件堆阅读。</h2>
    <p>
      Codex 的核心架构赌注是：把 AI coding agent 当成事件溯源的运行时；
      它的危险能力只能通过类型化契约、显式策略和可回放边界暴露。
    </p>
    <p>
      本书沿着这个赌注解释命令启动、配置、协议设计、sessions、模型流式输出、
      工具执行、审批、沙箱、app-server、TUI 渲染、MCP、skills、plugins、
      迁移、多 agent 协调、云任务、memory、构建系统、打包发布和 CI 治理。
    </p>
  </div>
  <div class="book-cover" aria-label="Codex From Source cover">
    <div class="book-cover__kicker">Architecture, Patterns, Internals</div>
    <div class="book-cover__title">Codex<br />From<br />Source</div>
    <div class="book-cover__footer">25 章 + 结语</div>
  </div>
</div>

<ArchitectureMap />

## 这本书教什么

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>运行时就是契约</h3>
    <p>threads、turns、operations、events、items 和 rollouts 构成稳定词汇，让客户端和回放理解同一份工作。</p>
  </div>
  <div class="pattern-card">
    <h3>工具就是能力</h3>
    <p>模型可见的 tool spec 与 routing、hooks、approvals、sandbox transforms、execution、output shaping 和 persistence 分离。</p>
  </div>
  <div class="pattern-card">
    <h3>客户端只是 surface</h3>
    <p>TUI、app-server、SDK、daemon path 和 remote clients 共享同一个 runtime contract，而不是各自拥有一个 agent。</p>
  </div>
  <div class="pattern-card">
    <h3>扩展是信任平面</h3>
    <p>MCP、skills、plugins、connectors 和 typed extensions 只能通过显式 provenance 与 validation boundary 增加能力。</p>
  </div>
  <div class="pattern-card">
    <h3>协调是持久图</h3>
    <p>多 agent 工作、云任务、身份、memory 和 trace reduction 让长时间工作可重建，而不是隐藏在瞬时状态里。</p>
  </div>
  <div class="pattern-card">
    <h3>治理是可执行设计</h3>
    <p>构建 overlay、生成 schema、打包 lane、发布检查和 CI policy 让架构不依赖人的记忆。</p>
  </div>
</div>

## 目录

<div class="part-toc">
  <section>
    <h3>第一部：建立契约</h3>
    <p>复杂 agent 只有在所有参与者说同一种语言时才容易理解。</p>
    <ol>
      <li><a href="chapter-01.html">架构赌注</a></li>
      <li><a href="chapter-02.html">从分发包装器到 Rust Router</a></li>
      <li><a href="chapter-03.html">配置、认证与 Managed Requirements</a></li>
      <li><a href="chapter-04.html">协议边界</a></li>
    </ol>
  </section>
  <section>
    <h3>第二部：构建 Agent 运行时</h3>
    <p>运行时不是一次模型调用，而是 context、streaming、tools、cancellation 和 replay 的调度器。</p>
    <ol start="5">
      <li><a href="chapter-05.html">线程、会话与持久状态</a></li>
      <li><a href="chapter-06.html">Turn Loop</a></li>
      <li><a href="chapter-07.html">模型 Provider、流式传输与 Backend Task</a></li>
      <li><a href="chapter-08.html">Observability 与 Rollout Trace</a></li>
    </ol>
  </section>
  <section>
    <h3>第三部：执行副作用</h3>
    <p>模型可以建议动作；Codex 决定这个动作是否成为副作用。</p>
    <ol start="9">
      <li><a href="chapter-09.html">工具规格、路由与分发</a></li>
      <li><a href="chapter-10.html">Shell、Exec Server 与文件系统工具</a></li>
      <li><a href="chapter-11.html">把 Patch 作为一等编辑协议</a></li>
      <li><a href="chapter-12.html">Hooks 与人工审批</a></li>
      <li><a href="chapter-13.html">Sandboxes、网络策略与平台边界</a></li>
    </ol>
  </section>
  <section>
    <h3>第四部：向客户端开放运行时</h3>
    <p>当多个客户端共享同一个 thread model 时，运行时才成为平台。</p>
    <ol start="14">
      <li><a href="chapter-14.html">App-Server 契约</a></li>
      <li><a href="chapter-15.html">SDK、Daemon 与远程控制</a></li>
      <li><a href="chapter-16.html">TUI 作为事件渲染器</a></li>
    </ol>
  </section>
  <section>
    <h3>第五部：扩展系统</h3>
    <p>扩展点只有在每个信任边界都显式时才有用。</p>
    <ol start="17">
      <li><a href="chapter-17.html">MCP：没有运行时耦合的外部工具</a></li>
      <li><a href="chapter-18.html">Skills、Plugins、Connectors 与类型化扩展</a></li>
      <li><a href="chapter-19.html">外部迁移与向后兼容</a></li>
    </ol>
  </section>
  <section>
    <h3>第六部：协调跨越一个 Turn 的工作</h3>
    <p>一旦动作可以持久化，agent 图、任务、memory 和云工作流才成为可能。</p>
    <ol start="20">
      <li><a href="chapter-20.html">多 Agent 协调</a></li>
      <li><a href="chapter-21.html">云任务、身份与远程工作</a></li>
      <li><a href="chapter-22.html">Memories 与用户级状态</a></li>
    </ol>
  </section>
  <section>
    <h3>第七部：发布与治理系统</h3>
    <p>架构只有在发布、测试和治理持续执行时才会存活。</p>
    <ol start="23">
      <li><a href="chapter-23.html">构建系统与生成契约</a></li>
      <li><a href="chapter-24.html">打包、发布与原生依赖</a></li>
      <li><a href="chapter-25.html">CI、策略与架构治理</a></li>
    </ol>
    <p><a href="epilogue.html">结语：真正值得带走的东西</a></p>
  </section>
</div>

## 适合谁读

- **技术负责人**：想理解架构、设计理由和取舍，但不想读每一段源码细节。
- **资深工程师**：想理解运行时、协议、工具系统、客户端和发布体系的实现级结构。
- **Agent 系统建设者**：想复用类型化事件、策略门控、扩展系统、replay 和可执行治理。

## 源码策略

Codex 源码快照固定为
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。
本书不使用本机源码路径；代码链接指向公开 GitHub URL，并通过自动检查拒绝私有路径和基于分支的 Codex 链接。

## 参考页

- [模式索引](patterns.html)
- [源码索引](source-atlas.html)
- [实现参考](implementation-reference.html)
- [参考文献](bibliography.html)
- [写作流水线](pipeline.html)
