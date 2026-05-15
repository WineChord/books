# 结语：真正值得带走的东西

第 25 章用治理结束实现故事，因为架构要么在那里存活，要么变成对过去的怀念。结语更短，也更直接。Codex 有趣不是因为每个子系统都完美，而是因为它做了一个连贯的架构赌注，并且在每一层反复支付这个赌注的成本。

这个赌注是：

> 把 AI coding agent 当成事件溯源的运行时；它的危险能力只能通过类型化契约、显式策略和可回放边界暴露。

这句话解释了协议、turn loop、工具路由、审批、沙箱、app-server、TUI、扩展、记忆、云任务、生成 schema 和 CI 治理。当某个设计看起来啰嗦时，它通常是在压力下维护这个赌注。

## 五个可迁移教训

### 1. 把产品词汇放进类型

Codex 更容易理解，是因为重要事件都有名字。用户 turn、模型 item、工具调用、审批请求、session event 和 app-server notification 不是系统中心的一堆松散 JSON，而是带类型边界的产品概念。

这点可以迁移到 AI 之外。只要某个 workflow 重要，就先给它的状态和消息命名。然后让客户端、日志、测试和回放都说同一种词汇。

### 2. 把副作用当成协商出来的能力

模型可以提出建议，运行时负责决定。这是 Codex 安全架构的核心。工具会被声明、路由、检查、审批、沙箱化、执行、归一化、持久化和渲染。这里没有一个动词是偶然的。

可迁移的是协商模式。任何允许不受信任 planner 造成副作用的系统，都应该在建议与执行之间插入策略和观察。

### 3. 一个运行时，多种 surface

Codex 不是“TUI 加一些 API”。终端 UI、app-server、SDK、headless exec、云流程和远端客户端都是共享运行时契约之上的 surface。这会增加前期成本，因为运行时必须显式；但当新客户端出现时，它不需要重写 agent。

可迁移的是 surface/runtime 拆分。拥有多个客户端的产品，应该让客户端无聊，让运行时契约精确。

### 4. 先观察，再解释

rollout、trace、graph edge、projection、app-server history 和生成 schema 都表达同一个偏好：先记录事实，再发明视图。这让 Codex 有空间回放、调试、reduce、迁移和审计。

可迁移的是 raw fact layer。如果只保存当前 projection，每个新问题都会变成生产迁移；如果保存事实，projection 可以演进。

### 5. 让架构可执行

最后一个教训最不华丽。边界能存活，是因为检查会执行它们。生成 schema、依赖策略、构建 overlay、发布 lane 和自定义 lint 属于架构，因为它们让设计在原作者不再每天想着它时仍然诚实。

可迁移的是可执行治理。先写下规则，再让仓库在重要版本的规则被破坏时失败。

## Codex 仍然昂贵的地方

这套设计不免费。类型化契约带来兼容性负担；durable rollout 带来迁移责任；多客户端运行时设计比单一 UI 更需要纪律；policy gate 会让工具执行更难扩展；构建与发布 overlay 需要专门维护；扩展面会放大信任决策。

只有产品真的需要这些成本时，它们才值得。如果你在做一个小型内部工具，不要照搬整套架构。带走经过压力测试的思想：类型化事件、协商式副作用、显式运行时契约、原始事实持久化和可执行策略。

## 最后的心智模型

如果只记住一张图，就记住这一张：

```mermaid
graph TD
  User[User intent] --> Protocol[Typed protocol]
  Protocol --> Runtime[Event-sourced runtime]
  Runtime --> Model[Model streaming]
  Model --> Tools[Negotiated tools]
  Tools --> Policy[Policy and sandbox gates]
  Policy --> Effects[Filesystem, process, network effects]
  Runtime --> Clients[Clients and SDKs]
  Runtime --> Memory[Durable state and memory]
  Runtime --> Trace[Replay and observability]
  Build[Build and governance] --> Protocol
  Build --> Runtime
  Build --> Clients
```

系统不是一次模型调用。它是一个为模型驱动 worker 提供的有边界运行环境。worker 越有能力，边界就越有价值。

这就是最值得偷走的架构经验。

<div class="source-equivalence">

## 源码地图

结语综合全书，不引入新的子系统。它的规范源码锚点就是各章反复使用的源码族： [`protocol`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src)、 [`core session runtime`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session)、 [`app-server`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src)、 [`tool execution`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools)、 [`rollout trace`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/rollout-trace/src) 和 [repository governance](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github)。

</div>
