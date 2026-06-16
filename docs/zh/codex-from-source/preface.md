# 从源码阅读 Codex

> **阅读契约：** 问题不是“我应该先打开哪个文件？”问题是一次 coding-agent 请求怎样变成本地类型化软件：意图进入，turn 被调度，模型输出变成 events，副作用穿过 policy，客户端收到证据。读完本篇后，你应该能把源码支撑的 runtime fact 与产品或后端推断分开。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-contract.webp" alt="源码阅读契约：分开叙事模型、固定源码证据、论断分类和读者审计路径" loading="eager" decoding="async" />
  <figcaption>阅读契约是本文的护栏：正文承载模型，固定源码锚点承载审计证据，私有后端行为留在论断边界之外。</figcaption>
</figure>

打开公开的 [OpenAI Codex 仓库](https://github.com/openai/codex)，很容易把阅读变成目录问题。这里有 CLI、终端 UI、protocol crate、core runtime、模型流式代码、工具派发、补丁应用、沙箱、审批路径、MCP 支持、skill 与 plugin 加载、app-server transport、SDK，以及发布治理。文件树是真实的，但文件树不是架构。

实际压力比“文件很多”更尖锐。Codex 是一个本地 agent：它能检查 workspace、运行命令、编辑文件，并报告证据。因此读者需要知道意图在哪里不再只是文本，在哪里变成 typed operation，模型输出在哪里可以请求副作用，policy 在哪里可以拒绝请求，界面继续前进后哪些持久事实仍然留下。如果这些 owner 混在一起，源码阅读就会变成零碎 trivia，或变成对私有系统的过度自信推测。

本文的 thesis 很简单：**把 Codex 读成围绕 LLM-powered turn 的一组类型化边界，它才会变得清楚。** 最小的可见契约不是 prompt，而是一对队列：caller 提交 operations，runtime 发出相关联的 events。其余架构把这个契约扩展到 context、tools、approvals、sandboxing、client surfaces、extensions、memory、cloud task boundaries 和 governance。

本文使用的源码快照是 [`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。源码链接固定到这个 commit，因此今天写下的解释在 `main` 移动后仍然可以被审计。

## 一、压力：文件树不是 Runtime

第一个源码阅读陷阱，是从文件名出发，用名词推断架构：`cli`、`core`、`protocol`、`tui`、`mcp`、`exec`、`app-server`。这些名字只有在你知道每个边界保护什么之后才有用。一个 protocol type 重要，不是因为它位于 protocol crate，而是因为其他子系统必须通过它说话，不能共享私有实现细节。

第二个陷阱，是把公开源码当成所有产品行为的窗口。这个仓库可以展示本地 runtime 结构、typed requests、event surfaces、model-stream handling、本地工具执行、approval 与 sandbox boundaries、persistence records、generated schemas 和 release checks。它不能证明模型权重、托管调度、私有后端拓扑、内部安全系统，或每一个云端产品决策。这些东西可能影响产品，但在这个源码快照中不是 implementation facts。

第三个陷阱，是把 agent 简化成“一个 prompt 加一组 tools”。这个描述漏掉了最难的部分。一个有用的 coding agent 必须防止 intent、authority、side effects、observations、transcript state、client projections 和 audit evidence 塌缩成一个可变 blob。Codex 值得阅读，正是因为它的公开源码暴露了这些分离。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/bounded-agent-os-map-569ff6a1-v2.webp" alt="有边界 agent 操作系统地图：分开客户端表面、类型协议、session runtime、权限门、sandbox 与 rollout 证据" loading="lazy" decoding="async" />
  <figcaption>把 Codex 读成一个有边界的运行环境：客户端提交意图，runtime 拥有 turn，authority gate 仲裁副作用，持久证据超出任何一个 UI 的生命周期。</figcaption>
</figure>

## 二、Thesis：跟着 Turn 走

贯穿全书的场景故意保持普通：

> 用户要求 Codex 修改代码。Codex 推理 workspace，调用 tools，接收 observations，在 policy 要求时请求 permission，应用 patch，并报告结果。

这条路径比文件树更好，因为每一层都必须回答同一组问题：

1. 用户请求现在在哪里？
2. 哪个 typed value 携带它？
3. 谁拥有下一步决策？
4. 这里什么可以失败、被拒绝、重试、取消或持久化？
5. 这个模式的哪一部分可以迁移到另一个 agent runtime？

从源码阅读角度看，循环是：

1. **Intent** 通过 CLI command、TUI action、SDK call、app-server request 或 nested agent instruction 进入。
2. **Protocol** 把 intent 变成 operation 或 transport message。
3. **Runtime** 带着 context、configuration、model selection 和 policy 调度一个 governed turn。
4. **Model stream** 产出 assistant items、tool calls、control signals 和 errors。
5. **Side effects** 穿过 tool routing、sandbox、approval、hook、patch 或 filesystem boundaries。
6. **Evidence** 以 events、transcript items、diffs、rollout state、logs 或 client-visible output 返回。

核心阅读动作，是把这些 owner 分开。TUI 不是 truth owner，只是因为用户看见了它。Tool result 也不会因为被打印出来就自动成为 durable audit record。Model-visible request 不是 local transcript。Source link 也不是声称私有后端行为的许可。

## 三、最小机制：Submission 进入，Event 离开

在固定 commit 上，[`codex-rs/protocol/src/protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123-L133) 里的 request envelope 小到可以完整引用：

```rust
/// Submission Queue Entry - requests from user
#[derive(Debug, Clone, Deserialize, Serialize, JsonSchema)]
pub struct Submission {
    /// Unique id for this Submission to correlate with Events
    pub id: String,
    /// Payload
    pub op: Op,
    /// Optional W3C trace carrier propagated across async submission handoffs.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub trace: Option<W3cTraceContext>,
}
```

同一个文件里的 response envelope 也同样紧凑。[`Event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L1247-L1254) 携带 agent 返回的关联事实：

```rust
/// Event Queue Entry - events from agent
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Event {
    /// Submission `id` that this event is correlated with.
    pub id: String,
    /// Payload
    pub msg: EventMsg,
}
```

这一对不是 Rust trivia。它说明 runtime 对客户端承诺什么：work 以 [`Op`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403) 进入，可见后果以与 submission id 关联的 `EventMsg` values 返回。Caller 可以是 terminal UI、app-server bridge、SDK wrapper，或另一个本地 surface；边界仍然是 typed。

高层 session facade 把同一个形状显式化。[`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364-L375) 被文档化为一对队列：

```rust
/// The high-level interface to the Codex system.
/// It operates as a queue pair where you send submissions and receive events.
pub struct Codex {
    pub(crate) tx_sub: Sender<Submission>,
    pub(crate) rx_event: Receiver<Event>,
    // Last known status of the agent.
    pub(crate) agent_status: watch::Receiver<AgentStatus>,
    pub(crate) session: Arc<Session>,
    // Shared future for the background submission loop completion so multiple
    // callers can wait for shutdown.
    pub(crate) session_loop_termination: SessionLoopTermination,
}
```

Facade methods 保留这条纪律。[`submit`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L688-L718) 把 operation 包进 submission，分配 id，需要时附加 trace context，并通过 submission channel 发送。[`next_event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L743-L748) 接收下一个 runtime event。这里可见的架构不是“调用了模型”，而是“caller 进入一个 governed queue，并观察 typed facts”。

一旦这个形状清楚，后续机制就有了附着点。User turn 不只是文本；[`UserInputWithTurnContext`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L445-L475) 可以携带 turn-scoped environment selections、approval policy、sandbox policy 和 working directory changes。Tool calls 不是任意 process launches；它们穿过 routing、policy、sandbox、approval 和 output-shaping boundaries。Client views 不是独立真相；它们从同一个 runtime 投射 events 和 state。

## 四、证据边界

本文使用三类论断：

| 论断类别 | 含义 | 安全表述 |
| --- | --- | --- |
| Verified source | 固定的 type、function、test、constant 或 workflow 直接展示该行为。 | `Submission` carries an `Op`; `Event` carries an `EventMsg`; `Codex` owns submission and event channels. |
| Surrounding contract inference | 几个公开锚点让某个边界可见，但不能过度解读某一行。 | App-server 是覆盖本地 runtime 的多客户端 surface。 |
| Out of scope | 该行为需要私有服务内部、托管部署细节、模型权重或未公开后端状态。 | Cloud-side scheduling 和 private safety pipelines 不是这个仓库给出的 implementation facts。 |

这条边界不是法律谨慎，而是工程卫生。如果源码读者把 verified local runtime behavior 与 private backend inference 混在一起，文章会更难修正，也更难迁移。当正文说“repository exposes”或“runtime sends”时，它应当由固定源码支撑。当产品体验“suggests”某个边界时，这句话必须与 source-level fact 分开。

固定链接也是这条纪律的一部分。移动的 `main` link 可能在重构后悄悄变成另一个论断。如果正文说 `Op` 位于 [`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)，这个链接几个月后仍应展示同一个 enum。当 Codex 变化时，诚实的更新方式是移动 snapshot，重新审计论断，并一起修订正文和图。

## 五、Rust 术语是设计把手

本文不假设你熟悉 Rust。源码使用 Rust，是因为项目使用 Rust；本文使用一小组词汇，是因为这些词能揭示边界：

| 术语 | 在本文中的第一性含义 |
| --- | --- |
| Crate | 一个单独命名的 Rust package。Codex 用 crates 把 CLI、core runtime、protocol、TUI、MCP、sandbox、app-server 和 release code 放在更清楚的边界后面。 |
| Enum | 表示“这个 value 正好是这些 case 之一”的 type。Protocol enums 往往映射产品能力和生命周期状态。 |
| Struct | 一组有名字的 fields。Public structs 显示哪些 data 必须跨越边界。 |
| Async task | 可以在等待 I/O、model output、user approval、subprocess output 或另一个 channel 时暂停的 work。 |
| Channel | 在 tasks 之间传递 messages 的 queue。Submission 和 event channels 是 runtime model 的中心。 |
| Event | 表示某件事发生过的 structured fact：turn started、tool call began、output streamed、approval was requested，或 turn completed。 |
| Facade | 隐藏较大 subsystem 的紧凑 public surface。`Codex::spawn`、`submit` 和 `next_event` 是覆盖 session runtime work 的 facade。 |
| Protocol boundary | 代码停止共享私有实现细节，开始交换 typed messages 的位置。 |

把这些词当成把手，而不是 jargon。一个 section 之所以值得存在，是因为它帮助你回答请求在哪里、什么 type 携带它、谁拥有下一步决策，以及这个边界有什么可见 failure mode。

## 六、常见误读

最常见的误读，是把 UI history 等同于 model-visible history。Terminal cell、app-server event、transcript entry 和 Responses API input 可以携带相关 facts，但它们不是同一个 surface。后续源码走读会持续分开 UI projection、durable rollout 或 transcript state，以及 model-visible request shape，因为每个 owner 的 failure 与 recovery obligation 都不同。

另一个误读，是把副作用看成模型的直接动作。源码没有展示“模型编辑文件”。它展示的是 model output 穿过 tool specifications、dispatch、policy、approval、sandboxing、patch application、ordered output 和 event emission。差异很重要：authority 属于 runtime boundary，不属于 generated text。

第三个误读，是把 evidence tables 当成作业。它们是 audit aids，不是理解正文的前置条件。主叙事应该教会系统，而不强迫每段旁边都开一个 GitHub tab。源码链接存在，是为了让论断可以在源码变化时被检查、修正或升级。

最后一个误读，是让公开仓库解释它看不到的事情。Local queue pairs、protocol types、context handling、tool routing、sandbox selection 和 generated schemas 是 source-visible 的。Private service routing、model weights、hosted scheduling 和 unpublished backend behavior 不是。好的源码阅读在这条线保持清楚时会更有用，而不是更保守。

## 七、可迁移规则

可迁移的教训不是“复制 Codex”，而是保留让 agent runtime 可审计的 owner：

| 设计动作 | 保护什么 |
| --- | --- |
| 把用户工作放进 explicit submissions。 | Cancellation、tracing、retries、ordering 和 client correlation 有具体归属。 |
| 发出 durable events，而不只是 mutate UI state。 | TUI、app-server clients、transcripts、diagnostics 和 tests 可以共享同一批 facts。 |
| 把 model-visible history 与 UI/storage history 分开。 | Context pressure、compaction、resume 和 audit records 可以演进，而不假装它们是一个 surface。 |
| 让副作用穿过 policy、approval、sandbox 和 patch boundaries。 | Generated text 不会直接变成 filesystem 或 shell authority。 |
| 发布前先给论断分类。 | Source-backed statements 保持可 review，private backend inference 不会渗进 implementation prose。 |
| 固定 source evidence。 | 长期文档在仓库移动后仍然可审计。 |

如果只记一句话，记住这句：把 Codex 理解为 governed turn 周围的 typed boundaries，比把它理解为模型调用周围的一袋 commands 更容易。

## 八、模型清楚之后的阅读路线

只有在上面的 runtime model 建立之后，再使用路线图。否则它会变成另一张目录，而不是阅读策略。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-routes.webp" alt="阅读路线图：从 runtime 契约穿过副作用、客户端表面、扩展和治理" loading="lazy" decoding="async" />
  <figcaption>路线图是第二层：在 turn boundary 清楚后，再选择快速架构路线、完整实现路线或源码审计路线。</figcaption>
</figure>

如果需要一条围绕全书的限时路径，从[阅读地图](reader-map.html)开始。需要紧凑审计锚点时，用[源码索引](source-atlas.html)。已经理解架构、需要密集事实时，用[实现参考](implementation-reference.html)。这些页面之所以有用，是因为核心契约已经稳定：intent 以 typed operation 进入，runtime 拥有 turn，side effects 穿过 authority boundaries，evidence 以 events 返回。
