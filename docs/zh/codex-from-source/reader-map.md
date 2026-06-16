# Codex 源码阅读地图：跟着 Turn，而不是跟着树

> **阅读契约：** 本页假设前言已经解释了为什么 Codex 最好被读成一个 governed turn。这里的问题更实际：当一个用户请求进入系统，下一步应该选择哪条源码路径？跟踪 owner、typed carrier、authority boundary，以及 UI 渲染后仍然留下的 evidence。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/codex-source-reading-routes.webp" alt="阅读路线图：从 runtime 契约穿过副作用、客户端表面、扩展和治理" loading="eager" decoding="async" />
  <figcaption>有用的路线不是“打开每个文件夹”。先从请求出发，再选择下一个 owner：entry、protocol、turn runtime、tool authority、client projection、extension 或 governance。</figcaption>
</figure>

Codex 仓库足够大，几乎任何第一选择都会得到回报。你可以从 CLI 开始，看到真实的产品 surface。你可以从 TUI 开始，看到用户可见状态。你可以从 protocol types 开始，看到共享词汇。你也可以从 tools、MCP、sandboxing、app-server code、memory、plugins、cloud-task clients 或 release workflows 开始，而且仍然在看重要的东西。

这正是阅读地图需要路线、而不是目录清单的原因。本页用于前言已经给出 mental model 之后。不要再问“Codex 是什么？”，而是问一个更窄的问题：**给定一个普通 user turn，哪一个源码 owner 拥有下一步决策？**

本文使用的源码快照是 [`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。每个源码链接都固定到这个 commit，因此阅读路线在 `main` 变化后仍然可审计。

## 一、文件树压力

文件树擅长展示名词：`cli`、`core`、`protocol`、`tui`、`app-server`、`mcp`、`exec`、`sandbox`、`plugins`、`cloud-tasks`、`release`。它不擅长展示 ownership。同一个用户请求可能穿过好几个名词，才发生任何可见事情。

所以压力点不是“哪个文件夹最重要？”而是“如果跳过哪个边界，我的理解会错？”

| 如果你从这里开始 | 局部真相 | 路线风险 |
| --- | --- | --- |
| CLI 或 app-server | Intent 通过具体 surface 进入。 | 你可能把 entry code 当成 runtime 本身。 |
| TUI | 用户看到 events、history、diffs 和 status。 | 你可能把 rendering state 当成 truth source。 |
| Protocol crate | Shared types 揭示词汇。 | 你可能收集 enums，却不知道谁执行它们。 |
| Core runtime | Sessions、turns、context 和 tools 汇合。 | 你可能把 local runtime facts 过度解读成 hosted backend facts。 |
| Tool files | Side effects 变得具体。 | 你可能漏掉 approval、sandboxing、hooks、retry 和 output shaping。 |
| CI 与 release | Generated schemas 和 policy checks 可见。 | 你可能把 governance 当成 packaging，而不是 architecture。 |

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/bounded-agent-os-map-569ff6a1-v2.webp" alt="有边界 agent 操作系统地图：分开客户端表面、类型协议、session runtime、权限门、sandbox 与 rollout 证据" loading="lazy" decoding="async" />
  <figcaption>文件树只有在每个文件夹都绑定到 owner 后才变得有用：entry surfaces、typed protocol、session runtime、authority gates、client projections 和 release evidence。</figcaption>
</figure>

把文件夹读成 pressure points。一个 chapter 值得注意，是因为它保护了 turn 的某个 invariant：intent 必须 typed，context 必须 owned，model output 不能自己变成 authority，side effects 必须穿过 policy，evidence 必须保持 reviewable。

## 二、跟着一个 User Turn

使用一个故意普通的请求：

> 修改这个 workspace 里的一个文件，需要时运行检查，然后报告发生了什么。

这个请求给你一条活的 routing test。每一步中，只要知道谁拥有下一步决策，就停止把当前文件当成全部架构来读。

| Turn step | 阅读问题 | 路线通常指向哪里 |
| --- | --- | --- |
| Entry | 哪个 surface 接收了请求？它拒绝在本地决定什么？ | CLI、TUI、SDK、app-server、remote-control 或 nested-agent entry code。 |
| Typed carrier | 哪个 operation 或 transport message 现在携带 intent？ | Protocol types 和 generated schemas。 |
| Session owner | 哪个 runtime object 拥有 context、policy、cancellation 和 event correlation？ | Session 和 turn code。 |
| Model stream | 哪个 stream item 是普通 assistant output？哪个在请求 work？ | Provider client 和 turn-loop handling。 |
| Tool authority | 哪个边界可以 deny、sandbox、retry、transform 或 cancel 副作用？ | Tool routing、approval、hooks、sandboxing、patch、exec 和 filesystem code。 |
| Client projection | 用户怎样看到 evidence，而不成为 truth owner？ | TUI、app-server、transcript、rollout 和 event rendering。 |
| Governance | 哪些 checks 让边界跨 release 保持稳定？ | Generated schemas、boundary tests、workflows、packaging 和 CI policy。 |

这条路线让前言里的 queue-pair model 留在背景里，不需要重复。前言解释 submissions 和 events 为什么是最小 runtime contract。本页把这个 contract 当成指南针：请求离开一个 owner 时，找到指向下一个 owner 的 typed handoff。

## 三、源码机制：选择下一个 Owner

源码路线有三个常见切换点。每一个都是读者应该换文件的地方，因为当前 owner 已经完成了它的工作。

### 3.1 Entry Code 展示 Surface，不展示全部架构

在固定 commit 上，CLI 的 [`Subcommand`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/main.rs#L105-L146) enum 足够说明 Codex 暴露了许多 entry surfaces。一个删节版 excerpt 可以说明问题：

```rust
enum Subcommand {
    Exec(ExecCli),
    Review(ReviewArgs),
    // login, logout, and other local commands omitted
    Mcp(McpCli),
    Plugin(PluginCli),
    McpServer,
    AppServer(AppServerCommand),
    RemoteControl,
    Sandbox(SandboxArgs),
    Debug(DebugCommand),
}
```

不要把这个片段读成“CLI 就是架构”。它是路线标记。一旦 entry surface 把 command 转成 typed request，下一个问题就属于 protocol 和 runtime，而不是 argument parsing。

### 3.2 Turn Function 标出 Runtime Ownership

Governed turn 是 context、model streaming、pending input、tool calls、compaction、cancellation 和 completion 开始汇合的地方。[`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139-L146) 的 signature 是一个紧凑源码锚点：

```rust
pub(crate) async fn run_turn(
    sess: Arc<Session>,
    turn_context: Arc<TurnContext>,
    input: Vec<UserInput>,
    prewarmed_client_session: Option<ModelClientSession>,
    cancellation_token: CancellationToken,
) -> Option<String> {
```

把它读成 ownership signal。Turn 不只是一次 model call。它接收 session state、turn-scoped context、user input、optional provider session state 和 cancellation。如果你在审计“用户请求期间发生了什么”，这里就是 entry-surface reading 应该变成 runtime reading 的点。

### 3.3 Tool Code 只有在 Authority 可见后才有意义

Tool implementation files 很有吸引力，因为它们具体：shell、patch、filesystem、MCP、network 和 sandbox behavior 看起来都是“动作”。更安全的地图，是先问这个动作如何被授权和尝试。[`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L41-L60) 展示了位于具体执行之前的 owner：

```rust
pub(crate) struct ToolOrchestrator {
    sandbox: SandboxManager,
}
```

这个小 struct 指向更大的路线：approval context、sandbox selection、permission hooks、network approval、attempts、retry behavior 和 result shaping。源码读者应该先定位允许 handler 运行的 authority path，再打开具体 shell 或 patch handler。

## 四、常见误读

| 误读 | 更好的路线 |
| --- | --- |
| “我理解的第一个 command parser 就是架构。” | 把 entry code 当成 adapter。沿着 typed request 进入 runtime owner。 |
| “TUI 是 truth，因为用户看到它。” | 把 TUI 当成 runtime events、transcript state 和 local UI state 之上的 projection。 |
| “模型编辑文件。” | 跟着 model output 进入 tool routing、approval、sandboxing、patch application 和 emitted evidence。 |
| “cloud-facing client file 证明了 hosted backend internals。” | 把 public client contracts 与 private service topology 和 scheduling 分开。 |
| “源码链接是读正文之前的作业。” | 先读路线；用固定链接审计重要论断。 |
| “CI 和 release 是 delivery details。” | Generated schemas、boundary checks 和 release workflows 是 architecture 抵抗 drift 的方式。 |

这些错误有同一个形状：它们停在第一个熟悉的 surface。修正动作永远是追问哪一个 owner 接下来携带请求。

## 五、阅读路线

限时路线不是论证本身。它们是在 turn route 清楚之后分配注意力的方式。

### 5.1 30 分钟路线

需要最快建立可靠 mental model 时，使用这条路径：

| Step | 阅读 | 只保留这个 |
| --- | --- | --- |
| 1 | [前言](preface.html) | 为什么一个 turn 是阅读单位。 |
| 2 | [第 4 章](chapter-04.html) | 客户端和 runtime 共享的 protocol vocabulary。 |
| 3 | [第 5 章](chapter-05.html) | Threads 和 sessions 拥有 durable state 与 event correlation。 |
| 4 | [第 6 章](chapter-06.html) | Turn loop 汇合 context、streaming、tools、continuation 和 completion。 |
| 5 | [第 9 章](chapter-09.html)、[第 12 章](chapter-12.html)和[第 13 章](chapter-13.html) | Tool calls 是 governed side effects，不是 direct model authority。 |
| 6 | [第 14 章](chapter-14.html)和[第 16 章](chapter-16.html) | App-server 和 TUI 是 runtime 之上的 client surfaces。 |
| 7 | [结语](epilogue.html) | 可迁移到 Codex 之外的设计经验。 |

这条路线之后，你应该能从 entry surface 讲清一个请求如何变成 typed operation、turn owner、model stream、tool authority、event evidence 和 client-visible result。

### 5.2 2 小时路线

如果你想获得 source-grounded architecture knowledge，但不想打开每个 GitHub link，用这条路径：

1. 读[前言](preface.html)，再读第 1-8 章。这会给出 bounded runtime model、startup narrowing、configuration、protocol、session ownership、turn loop、provider streaming 和 rollout evidence。
2. 读第 9-16 章。这会把 model-visible tool specifications 继续推进到 routing、shell、patch、hooks、human approval、sandboxing、app-server、SDKs、daemon control 和 TUI rendering。
3. 读第 17-22 章。这部分覆盖 MCP、skills、plugins、migration、multi-agent coordination、cloud task boundaries、identity 和 memory。
4. 读第 23-25 章和结语。这会解释为什么 build systems、generated contracts、packaging、release workflows 和 CI policy 是 architecture 的一部分，而不是 delivery chores。
5. 只有在 narrative route 稳定之后，再使用[模式索引](patterns.html)、[源码索引](source-atlas.html)和[实现参考](implementation-reference.html)。

2 小时路线应当留下 owner boundaries，而不是 trivia。你应该知道哪些 facts 是 runtime contracts，哪些是 client projections，哪些是 authority gates，哪些是 release-time enforcement。

### 5.3 源码审计路线

当你想根据固定 commit 验证论断时，使用这条路径：

| Audit move | Rule |
| --- | --- |
| 从 claim 开始，而不是从 filename 开始。 | 只有当 claim 已经命名边界时，一个文件才是在验证边界。 |
| 优先使用 pinned links，而不是 `main`。 | 移动 branch links 会让长期阅读不可复现。 |
| 先验证 direct facts。 | Types、functions、tests、constants、workflows 和 generated schemas 强于 surrounding inference。 |
| 明确标记 inference。 | 如果边界来自几个锚点，称它为 surrounding contract inference。 |
| 把 mismatch 当成书的问题。 | 读者不应该默默调和 stale prose 与 changed source。 |

做一次 focused audit 时，只先打开这些锚点：

1. [`Submission`, `Op`, `Event`, and `EventMsg`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L123)，用于共享 protocol vocabulary。
2. [`Codex`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L364)、[`submit`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L688) 和 [`next_event`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/mod.rs#L743)，用于 session facade。
3. [`session/turn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L139)，用于 governed turn。
4. [`ToolOrchestrator`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/orchestrator.rs#L41)，用于 approval、sandbox、attempt 和 retry ownership。
5. [`MessageProcessor`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L272) 和 [`ChatWidget`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658)，用于 client projection。
6. [`rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281) 和 [`verify_tui_core_boundary.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/scripts/verify_tui_core_boundary.py#L24)，用于 release 与 governance evidence。

## 六、可迁移规则

可复用的教训，是先设计阅读路线，再设计阅读清单。

| 阅读另一个 agent system 时 | 先问这个 | 答案保护什么 |
| --- | --- | --- |
| Entry and protocol | 用户意图在哪里变成 typed request？ | 系统不会把 UI text 与 runtime work 混在一起。 |
| Runtime ownership | 哪个 component 拥有 turn state、context、cancellation 和 completion？ | 读者能找到请求真正的 control point。 |
| Model output | 哪些 outputs 是普通 text？哪些可以变成 side-effect requests？ | Generated content 与 authority 分开。 |
| Tool authority | Policy、approval、sandboxing、hooks 或 retries 可以在哪里介入？ | Side effects 保持 reviewable 和 deniable。 |
| Evidence | Client 渲染之后什么会留下？ | Audit、replay、diagnostics 和 tests 共享稳定 facts。 |
| Governance | 哪些 generated artifacts 或 checks 保持边界稳定？ | Architecture 经受 refactors、releases 和 packaging changes。 |

如果 source tree 显得太大，不要打开更多文件。选择一个普通请求，跟着携带它的 owner 走。Owner 变了，就换文件。Owner 还是同一个，就继续读。

## 七、源码地图

下面的地图是整条路线的紧凑版本。它有意面向 claim，而不是面向 folder。

<figure class="wc-article-figure">
  <img src="https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/pinned-source-evidence-map-df64b03.webp" alt="固定源码证据图：把章节论断映射到 verified owners、公开源码锚点和审计规则" loading="lazy" decoding="async" />
  <figcaption>把 source map 当成审计层：从 claim 开始，选择能证明它的 owner，再打开固定锚点。</figcaption>
</figure>

| 你想验证的 claim | 先检查的 owner | 书中支撑 |
| --- | --- | --- |
| 一个请求有共享 typed vocabulary。 | Protocol types 和 generated schemas。 | [第 4 章](chapter-04.html)、[实现参考](implementation-reference.html) |
| 一个 session 拥有 context、queues、cancellation 和 event correlation。 | Session facade 和 turn runtime。 | [第 5 章](chapter-05.html)、[第 6 章](chapter-06.html) |
| Model output 只有通过 runtime handling 才变成 action。 | Provider stream handling 和 tool routing。 | [第 7 章](chapter-07.html)、[第 9 章](chapter-09.html) |
| File edits 和 shell commands 是 governed side effects。 | Patch、exec、approval、hook 和 sandbox code。 | [第 10 章](chapter-10.html)、[第 11 章](chapter-11.html)、[第 12 章](chapter-12.html)、[第 13 章](chapter-13.html) |
| UI clients 渲染 evidence，而不是拥有 truth。 | App-server 和 TUI projection code。 | [第 14 章](chapter-14.html)、[第 16 章](chapter-16.html) |
| Extensions 在 typed 进入前停留在 core runtime 外。 | MCP、skills、plugins 和 connector boundaries。 | [第 17 章](chapter-17.html)、[第 18 章](chapter-18.html) |
| Release policy 是 architecture 的一部分。 | Generated contracts、packaging、workflows 和 boundary tests。 | [第 23 章](chapter-23.html)、[第 24 章](chapter-24.html)、[第 25 章](chapter-25.html)、[Pipeline](pipeline.html) |

需要更密集锚点时，用[源码索引](source-atlas.html)；已经知道路线、需要精确 subsystem facts 时，用[实现参考](implementation-reference.html)。本页的工作更简单：让一个请求沿着正确 owner 移动，直到 source tree 从一堆文件变成一条路径。
