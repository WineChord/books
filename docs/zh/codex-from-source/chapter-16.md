# 第 16 章：TUI 作为事件渲染器

第 15 章说明 Codex 不止一种客户端形态：SDK 客户端、后台守护进程连接、执行包装器和远程控制流都通过有纪律的边界触达运行时。本章研究用户最先感受到的客户端。终端 UI 不是运行时，而是建立在 app-server 支撑的线程模型之上的事件渲染器、输入协调器和审批表面。这个区别会改变阅读架构的方式。传统终端应用往往拥有整个循环：读一个按键，更新状态，画一帧。Codex 也有这样的循环，但它绘制的状态大多在别处产生。TUI 把用户输入路由成应用命令，把这些命令发送到 app-server 会话，接收协议通知和请求，更新聊天状态，并在保留真实滚屏记录的同时，把结果渲染到实时终端视口里。

## Inline，而不是 Fullscreen

TUI 默认是 inline 的。它不像传统 fullscreen alternate-screen application 那样，在退出前拥有每一行。它把 terminal scrollback 当作产品行为的一部分。Completed transcript cells 可以提交到真实 scrollback，而 active cells、composer、status 和模态界面占用 live viewport。这个选择有后果。Rendering 不能假设自己可以永远 repaint 整个历史屏幕。它必须判断什么已经 committed，什么仍然 mutable，什么需要 redraw。Resize handling 必须用 source-backed content 重新 reflow。Streaming markdown 不能过早提交那些 layout 还可能变化的文本。External-editor flows 必须干净地释放并重新获得 terminal event ownership。

Inline model 比简单 fullscreen UI 更难，但它符合开发者使用终端的方式：conversation 应该留在 scrollback 中，可复制、可搜索，并能与 shell 里的其他工作交织。

## Startup Path

Startup 连接三个世界：configuration/auth state、terminal capability 和 app-server 会话 state。TUI 加载 configuration，确定 account 与 model context，初始化 terminal behavior，create 或 resume thread，然后进入一个同时处理 UI events 与 runtime events 的 event loop。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-16-01-zh.svg" alt="TUI 启动会在 app loop 前绑定三类契约：已解析的 config/auth、检测到的 terminal capability，以及 active thread 的 app-server 会话。" loading="lazy" />
  <figcaption>TUI 启动会在 app loop 前绑定三类契约：已解析的 config/auth、检测到的 terminal capability，以及 active thread 的 app-server 会话。</figcaption>
</figure>

Terminal capability 不是装饰。Keyboard enhancement、focus behavior、tmux handling、color palette support、desktop notifications、inline viewport behavior、image paste 和 clipboard paths 都可能改变 UI 应该尝试什么。App-server 给 TUI runtime contract；terminal detection 给它物理显示 contract。

## 空间模型

在阅读 event loop 之前，先把屏幕想成四层。真实 scrollback 已经 committed，属于 terminal。Live viewport 包含 in-flight work 的 mutable cells。Bottom pane 拥有 composition 和 focused transient views。Modal layer 只有在 protocol request 或 UI task 需要决策时才打断 composer。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-16-02-zh.svg" alt="已提交滚屏记录、实时单元、输入、模态层和重排逻辑分属不同平面，所以终端渲染可以保持增量，同时不丢失权威历史。" loading="lazy" />
  <figcaption>已提交滚屏记录、实时单元、输入、模态层和重排逻辑分属不同平面，所以终端渲染可以保持增量，同时不丢失权威历史。</figcaption>
</figure>

这张图解释了 inline 选择。UI 不是在 repaint 一个私有世界，而是在判断哪些 runtime facts 已足够稳定、可以提交给 terminal 的世界，哪些仍必须保持 mutable。

## 四个 Event Sources

运行后，app loop 是一个 multiplexer。它监听 internal app events、active-thread protocol events、终端输入 events 和 app-server 会话 events。然后把它们转成三类结果：发送应用命令，修改 transcript 或 UI state，或者 schedule 一帧。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-16-03-zh.svg" alt="内部事件、活动线程通知和用户输入都进入同一个应用事件队列，渲染则留在下游，作为模型状态的投影。" loading="lazy" />
  <figcaption>内部事件、活动线程通知和用户输入都进入同一个应用事件队列，渲染则留在下游，作为模型状态的投影。</figcaption>
</figure>

这种 event shape 解释了为什么 TUI 更像 actor-like 系统，而不是一棵单一 mutable widget tree。App object 拥有 orchestration。Chat widget 拥有 conversation state。Bottom pane 拥有 input 和 transient views。Terminal control 拥有 raw mode、resize、buffer diffing 和 viewport behavior。每个 component 都有状态，但它们通过 typed events 和 commands 通信，而不是跨层直接伸手修改。

## App Commands

TUI 把 user intent 转成应用命令。Submitted prompt、interrupt、approval response、model switch、file mention、slash command 或 external-editor completion，都不应该直接修改 runtime state。它先变成 typed command，再由 app 路由。这样可以把 UI gestures 与 runtime authority 分开。按下一个 key 可能只是移动 cursor，打开 modal，接受 completion，或提交 structured input。只有最后一种会跨入 app-server state。Command boundary 是 TUI 判断“我在处理呈现”还是“我在请求 runtime 工作”的地方。

```text
// 伪代码 - 说明性模式。
对应用循环选中的每个事件:
    如果它是终端输入:
        让聚焦组件处理 key
        收集它产生的应用命令

    如果它是协议通知:
        更新聊天历史、活动单元或状态

    如果它是服务端请求:
        排队审批、外部输入请求或输入提示
        显示对应模态界面

    如果应用命令已就绪:
        通过 app-server 会话发送

    可见状态改变时请求渲染帧
```

这段伪代码同样避开实现细节。持久设计是：runtime mutations 通过 commands 离开 UI，runtime observations 通过 protocol events 进入 UI。

## Chat Widget

Chat widget 是 conversation controller。它拥有 committed history cells、in-flight work 的 active cells、stream controllers、status surfaces、pending queues，以及 active thread 的 protocol handling。它不只是 renderer，而是决定 events 如何变成 display units 的组件。

Committed 和 active cells 的区别是核心。Committed cell 表示 source 已足够稳定、可以进入 history 的 transcript content。Active cell 表示仍在变化的内容：streaming assistant text、仍在增长的 command output、等待响应的 approval，或 status 未 final 的 turn。二者分开后，UI 才能既 responsive 又正确：它可以 redraw mutable content，而不重写过去。

## Bottom Pane

Bottom pane 是 persistent composition 与 transient interruption 交汇的地方。Composer 保存普通用户输入。Modal views 处理 approval、elicitation、feedback、selection、file 或 skill mentions、slash-command completion，以及其他 focused tasks。这些 modes 会 interrupt composer，但不会摧毁它。

Approval handling 展示了为什么这很重要。Command approval 不只是 transcript 里的一行文本，而是绑定 runtime progress 的 pending 服务端请求。TUI 必须展示足够 context，接受 decision，通过 app-server 会话发送 response，然后把用户带回 conversation。如果 modal 只是没有 pending protocol state 的视觉 overlay，runtime 可能在 UI 看似继续后仍然 blocked。

## Streaming Markdown

Streaming output 是最难的 rendering path。Model 可能输出 partial markdown，后续 tokens 会改变早先可见文本的 wrap 或 parse。Tables 是最清楚的例子：后来的 row 可能改变前面 rows 的 column widths。因此 TUI 把 stable committed source 和 mutable live tail 分开。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-16-04-zh.svg" alt="Streaming Markdown 只在 live tail 保持可变；一旦提交，source 和 layout identity 就被保留，因此 resize、copy 和 scrollback 都可重现。" loading="lazy" />
  <figcaption>Streaming Markdown 只在 live tail 保持可变；一旦提交，source 和 layout identity 就被保留，因此 resize、copy 和 scrollback 都可重现。</figcaption>
</figure>

规则是保守的：只 commit 可以被视为 stable source 的内容，把 incomplete 或 layout-sensitive 内容留在 live viewport。这让 scrollback 保持可读，同时仍能快速展示新输出。

## Rich 与 Raw Rendering

TUI 需要两种 rendering personality。Rich rendering 让 terminal experience 可读：markdown structure、status labels、command cells、diffs、approval prompts 和 active progress surfaces。Raw 或 copy-friendly rendering 让 transcript content 能离开 UI 使用：text 应该可选择，logs 应该可理解，committed scrollback 不应该依赖隐藏 widget state。这也是 source-backed rendering 重要的原因。如果 history cells 尽量保留原始 source，resize reflow 和 copy behavior 就能从 content 派生，而不是从过期 screen buffer 派生。只存 painted rows 的 terminal UI，最终会在 resize、wrapping、selection 和 transcript reconstruction 面前失败。

## Terminal Control

Terminal layer 拥有 application logic 不该知道太多的机制：raw mode、keyboard enhancement、event streams、resize notifications、inline viewport size、buffer diffing 和 terminal restoration。Codex 还有支持 ANSI conversion、terminal detection、feedback capture、debugging、cancellation helpers 和 code-mode execution 的辅助 crates。这些不是支线任务，它们把外部 interface complexity 留在 chat controller 之外。一个具体例子是 external editor。Editor 拥有 terminal 时，TUI 不能继续假设自己拥有 standard input events。Event stream 可能需要在 editor flow 前后 drop 并重新创建。这类 terminal ownership problem 应属于 terminal substrate，而不是属于把 turn 通知 映射成 history cell 的逻辑。

## Code Mode 与嵌套工作

Code mode 带来另一种 event-rendering 挑战。JavaScript runtime 可以执行 code，保留 host-managed session state，等待 long-running work，并通过 host callbacks 路由 nested tool calls。从 TUI 的角度看，这些仍然是 events、commands、statuses 和 renderable cells。UI 不应该成为 execution engine 的 owner。它应该显示状态，发送用户 decision，并保持 transcript coherent。这就是本章反复出现的结构：specialized subsystem 可以很复杂，但它与 TUI 的交互通过 events、commands、cells 和 modal state 调停。

## 追踪台账

| 问题 | 第 16 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 它要么正在 bottom pane 中被 compose，要么表示为应用命令，要么以 protocol events 的形式回到 chat surface。 |
| 什么数据结构携带它？ | App events、应用命令、app-server 会话 messages、chat cells、stream controllers、modal queues 和 terminal frame requests。 |
| 谁拥有下一步决策？ | Focused UI component、chat widget、app orchestrator、app-server 会话，或正在 approval/elicitation modal 中回应的用户。 |
| 这里可能怎么失败？ | Terminal ownership 丢失、resize mismatch、duplicated replay、blocked approval、malformed streaming markdown、stale active cell，或 scrollback/render drift。 |

## 应用到实践

1. **把 UI 当作客户端。** 让 runtime authority 留在 protocol commands 和 events 后面。
2. **区分 active 与 committed。** 在 live viewport redraw mutable work，只把 stable transcript content commit 进去。
3. **从 source 渲染。** 保留 content source，让 resize、copy 和 replay 可以重建 display，而不是信任 painted rows。
4. **显式建模 interruption。** 把 approvals、elicitations 和 feedback 表示为绑定 pending protocol work 的 modal state。
5. **隔离 terminal mechanics。** 把 raw mode、keyboard behavior、viewport control 和 buffer diffing 放在 application state 之下。

## 收束

TUI 完成了第四部的论证。运行时能成为平台，是因为它的客户端共享同一个线程模型，而不是共享同一套界面。App-server 定义契约，SDK 客户端与后台守护进程层让契约可达，终端界面证明一个丰富的交互表面仍然可以是事件渲染器，而不是第二套运行时。第五部将从客户端转向扩展点：那些给系统加入新能力的协议和包。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| TUI chat widget | [`codex-rs/tui/src/chatwidget.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget.rs#L658) |
| Bottom pane state | [`codex-rs/tui/src/bottom_pane/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/bottom_pane/mod.rs#L199) |
| TUI app-server 会话 | [`codex-rs/tui/src/app_server_session.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_server_session.rs#L148) |
| App events | [`codex-rs/tui/src/app_event.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/app_event.rs#L72) |
| Rendering tests | [`codex-rs/tui/src/chatwidget/tests/exec_flow.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/chatwidget/tests/exec_flow.rs#L34) |

</div>
