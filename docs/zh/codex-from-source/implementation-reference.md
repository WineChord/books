# 实现参考

这一页是本书的“免打开源码速查页”。它收集那些放进章节正文会打断阅读、但只留在源码链接里又会损失关键信息的实现事实。

## 快照规则

本页所有事实都对应 Codex commit
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)。
如果后续 Codex 版本改变类型或路径，应更新本页，而不是依赖分支链接。

## 运行时主干

| 阶段 | 具体实现事实 | 源码读者会记住什么 |
| --- | --- | --- |
| 入口 | CLI 解析命令后，把交互、exec、app-server、login、MCP、debug、completion 等命令路由到不同 crate。 | CLI 是入口路由，不拥有 agent loop。 |
| 协议 | 一个 `Submission` 包住 `Op`、id 和 trace context；一个 `Event` 包住 id 和 `EventMsg`。 | 关联关系是显式的，客户端能把进度和结果对应到提交的工作。 |
| 会话 | `Codex` 是小 facade：submission sender、event receiver、status receiver、session state、shutdown future。 | 公开运行时合同是“队列输入，事件输出”。 |
| 提交循环 | 后台循环接收 operation、分发、启动或替换 active task、abort 当前 turn、排队后续输入，并发出统一完成事件。 | Agent 行为是 task 驱动的，不是同步函数调用。 |
| 任务模型 | 普通用户 turn、compact task、review task、user shell command task 是不同运行时工作单元。 | “turn”很常见，但不是唯一 session task。 |
| Turn loop | `run_turn` 准备上下文、注入扩展、运行 hooks、采样模型、处理工具、判断继续、压缩上下文并停止。 | 模型调用只是状态机中的一个阶段。 |
| 工具运行时 | router/registry 把模型工具调用变成 handler、orchestration、hook、审批、沙箱执行、事件和模型可见输出。 | 工具是受治理的副作用，不是任意回调。 |
| 接入面 | TUI 和 app-server 消费或翻译同一条 runtime event stream。 | UI 不应该拥有 agent 决策。 |

## Operation 清单

`Op` 远不只是“用户输入”：

| 分组 | 例子 | 为什么重要 |
| --- | --- | --- |
| Turn 输入 | `UserInput`、`UserInputWithTurnContext`、`UserTurn` | 用户工作可携带 cwd、model、approval、sandbox、permissions、output schema、environment 和 client metadata。 |
| 中断与清理 | `Interrupt`、`CleanBackgroundTerminals` | 停止 turn 与清理长期后台终端是两件事。 |
| 审批响应 | exec approval、patch approval、Guardian-denied action approval | 用户或 reviewer 的决定本身也是排队协议输入。 |
| 动态工具 | dynamic tool response 和 cancellation | 有些工具由客户端接入面执行，而不是只由 core runtime 执行。 |
| Thread 控制 | compaction、rollback、shell command、memory mode、goal operations | thread 是持久状态，不是一次临时聊天。 |
| MCP 与扩展 | refresh、tool/resource flow、elicitation response | 外部能力会变化，也可能请求用户输入。 |
| Realtime | start、audio、text、close、list voices | 同一协议家族覆盖语音/文本实时流。 |
| 多 agent/collab | agent spawn、message、wait、close/resume | 子 agent 是一等运行时交互。 |

## Event 分类

`EventMsg` 是运行时公开日志。源码读者通常这样分类：

| 类别 | 代表事件 | 读者应记住什么 |
| --- | --- | --- |
| 生命周期 | `TurnStarted`、`TurnComplete`、`TurnAborted`、`ShutdownComplete` | 客户端知道工作何时开始、结束、中止或运行时退出。 |
| 文本与推理 | agent message、delta、reasoning summary、raw reasoning、section break | 流式输出是结构化的，不是每个模型 token 都是最终用户文本。 |
| Item 生命周期 | `ItemStarted`、`ItemCompleted`、raw response items | 新 item 事件与旧 task/tool 事件并存，以保持兼容。 |
| 工具生命周期 | exec begin/output/end、MCP begin/end、web/image begin/end、patch begin/update/end | UI 可以在最终结果前展示进度。 |
| 审批与权限 | exec approval、patch approval、permission request、user input request、Guardian assessment | 人或策略的决定是可见事件，不是隐藏 prompt。 |
| 上下文与历史 | context compacted、thread rolled back、token counts、goal updates | 记忆压力和持久 thread 修改是协议可见的。 |
| 错误与警告 | error、warning、Guardian warning、stream error、deprecation notice | 失败有类别和含义，不只是控制台文本。 |
| Realtime 与 collab | realtime events、collab agent spawn/wait/close/resume | 协议也覆盖实时交互和多 agent 工作流。 |

## 配置、约束与安全输入

配置是分层的。源码读者会问四个问题：谁提供了设置，哪一层获胜，有什么约束，运行时能不能忽略它。

| 区域 | 源码级行为 |
| --- | --- |
| 分层 | 设置可能来自默认值、用户配置、profile、CLI override、托管/MDM 输入、环境变量和 app-server 写入。 |
| 来源 | 运行时会保留 provenance，让客户端区分用户选择和托管策略。 |
| Requirements | 云端或 workspace requirements 可以禁用或约束功能，而不只是设置值。 |
| Feature precedence | 实验能力和托管能力可能 gate 方法、transport、app/plugin 可用性或 UI 控件。 |
| 热变更 | 一些设置通过 `UserInputWithTurnContext` 成为 turn-scoped；另一些是持久 config write 或 profile 选择。 |
| 认证存储 | ChatGPT/API key、MCP OAuth、connector credential 都是敏感状态，并有存储 fallback 行为。 |
| Secret handling | 日志、事件和 UI 路径都应避免泄露 token、bearer credential 和 connector secret。 |

这很重要，因为 config 本身可能参与安全决策：model、sandbox、approval mode、permission profile、writable root 和 network rule 都会影响工具是否运行。

## 状态与持久化

| 状态 | 持久化内容 | 为什么重要 |
| --- | --- | --- |
| Thread store | thread identity、archive state、metadata、goals、memory settings、可恢复工作 | thread 可以跨 session resume、fork、list、archive。 |
| History | 模型可见 conversation item 和规范化 prompt history | 下次模型请求来自记录状态，而不是从 UI 文本重建。 |
| Rollout files | 用于 resume/fork/reconstruction 的 raw 或可 replay 事件记录 | “transcript”和“runtime replay”相关但不相同。 |
| SQLite/log state | app/server metadata、migration、WAL、retention budget、运行记录 | 有些操作行为有数据库支撑，不只是内存状态。 |
| Context baseline | turn context item 记录哪些上下文已经注入 | 避免 compaction、resume 或依赖注入后重复或漏注上下文。 |

## Turn 状态机

简化算法如下：

1. 如果没有输入且没有 pending/continuation，就拒绝空工作。
2. 刷新或构造 model client session。
3. 如果上下文已过大，先做 pre-sampling compaction。
4. 先解析本 turn 可能需要的上下文候选，但还不把 prompt 视为已接受。
5. 运行 user-prompt hooks 和 dependency prompts。阻塞型 hook 仍然可以在
   prompt 进入持久对话历史前停止这个 turn。
6. 记录已接受的用户输入、turn context、baseline 和获准注入的上下文。
7. 从历史和活动上下文构造 sampling request。
8. 流式读取模型事件，并规范化为 runtime items 和 deltas。
9. 分发工具调用、dynamic tool request 或 approval prompt。
10. 根据 active turn state drain 或 requeue pending input。
11. 计算是否需要 follow-up。
12. 如果 token 压力要求，在 turn 中途做 compaction。
13. 运行 stop hooks 和 after-agent hooks。
14. 发出完成、中止或错误事件。

重要分支：

| 分支 | 含义 |
| --- | --- |
| 存在 pending input | 循环可能继续或重新排队，不能丢掉中途到达的输入。 |
| 工具 future 仍在运行 | cancellation 和 completion 必须处理未完成副作用。 |
| stream disconnect | 有些 transport error 可按预算和 backoff 重试，有些变成结构化错误。 |
| context window exceeded | runtime 可能先 compact 再重试，不一定立刻致命。 |
| hook blocks | hook 可以停止执行、替换输出、要求继续或报告失败。 |
| client session reset | model 变更、compaction 或 transport 恢复可能要求新 client session。 |

## 模型流式输出

模型流先经过 client boundary，turn loop 才看到有用事件：

| 部件 | 源码读者会知道什么 |
| --- | --- |
| `ModelClientSession` | 拥有一次 session 内和模型 provider 通信的规范化边界。 |
| WebSocket vs HTTPS | client 可以偏好流式 transport，并按 provider 或失败情况 fallback。 |
| Auth recovery | 401 类失败可能触发凭证刷新或更清晰的认证错误。 |
| Retry budget | transport retry 有预算和 backoff，不是每个 stream error 都立刻致命。 |
| Event mapping | provider 的 `ResponseEvent` 会映射为内部 item、text delta、reasoning delta、tool call 和 error。 |
| Dropped consumer | 接收方消失时，stream 和工具工作应取消，不能泄漏 task。 |

## 工具清单与分发

| 层 | 拥有什么 |
| --- | --- |
| Spec planning | 决定 hosted、local、MCP、dynamic、deferred、unavailable、discoverable tools 哪些进入模型 tool list。 |
| Tool kind | 对工具分类，方便 handler 和安全检查匹配 payload。 |
| Router | 把模型工具调用转换成 typed invocation 并交给 registry。 |
| Registry | 保存 handler，并按 kind/name 分发。 |
| Handler | 解析参数、声明安全元数据、运行或委托工作，并返回结构化输出。 |
| Parallel runtime | 在允许并发时并发，在写操作或非并发安全场景串行。 |
| Orchestrator | 处理 hooks、approval、sandbox attempt、retry/escalation、事件和模型可见结果。 |

工具清单不只包含本地 shell 和 patch，还包括 hosted web search、image generation、MCP tools/resources、dynamic client-owned tools、plugin discovery 的 tool search、code-mode/nested tools，以及提示模型不应调用的 unavailable-tool placeholders。

## Shell 与 Exec 分类

| 名称 | 含义 |
| --- | --- |
| shell / local shell | Codex 控制的命令执行路径，带 cwd、env、approval、sandbox、timeout 和 output events。 |
| unified `exec_command` | 更丰富的命令工具路径，可管理 PTY/process id、stdin、timeout，并拦截 apply_patch。 |
| `write_stdin` | 向已运行 exec session 发送输入，而不是启动新工作。 |
| user shell command | 用户请求的 shell action，经 session/thread protocol 排队，不是模型工具调用。 |
| remote/container backend | runtime backend 可能通过远端或类容器环境执行，而不是直接本地 OS 进程。 |

命令输出可能因 telemetry/UI 被截断；PTY session 有生命周期 id；shell 启动有 fallback；`apply_patch` 可以从 shell-like 文本中被拦截，以便仍走 patch 语义。

## Patch Runtime

Patch 有三层：

| 层 | 职责 |
| --- | --- |
| Patch grammar | 解析 add、delete、update、move、hunk、EOF 等操作。 |
| Runtime handler | 把模型参数变成 patch attempt，计算 effective permissions，需要时审批，发 patch events，并返回模型可见输出。 |
| Diff tracker | 记录当前 turn 中已提交的文件 delta，让客户端展示 turn diff。 |

源码读者还会知道：patch argument 可以流式到达；patch event 在最终成功前也会 begin/update/end；shell/unified-exec 可以委托到 patch runtime；远端文件系统会改变 patch 执行位置；被拒绝或失败的 patch 也需要清晰的模型可见结果。

## 审批、权限、Guardian 与网络

| 层 | 细节 |
| --- | --- |
| Approval policy | `UnlessTrusted`、`OnFailure`、`OnRequest`、`Granular`、`Never` 决定是否提示、自动拒绝或升级。 |
| Permission profile | 文件系统和网络权限比旧 sandbox mode 更细，可来自 built-in、active profile 或 additional permissions。 |
| Approval requirement | 命令可能 auto-approved、需要用户审批、被策略拒绝，或要求 exec-policy amendment。 |
| Approval cache | 某些 approval 可以在 turn/session 内缓存，避免等价请求反复弹窗。 |
| Request permissions | 模型可以通过工具请求额外权限，而这个请求本身也受 approval policy 管理。 |
| Hooks | Permission-request hooks 可以在 Guardian 或用户审批前决定；post-tool hooks 可以替换模型可见输出。 |
| Guardian | 自动 review 可覆盖 shell、unified exec、patch、network、MCP、permissions；timeout 或 reviewer failure 应 fail closed。 |
| Network approval | 网络访问可能 immediate 或 deferred，涉及 host approval cache、managed proxy registration、denial cancellation 和 policy amendment。 |

安全语言要精确：approval 是决策过程，permission profile 描述期望访问，sandbox 只有在平台/backend 真正执行时才是 enforcement。

## 沙箱平台行为

| 平台/路径 | 源码读者会知道什么 |
| --- | --- |
| Preference | 工具请求可以自动选择 sandbox、要求 sandbox，或禁止 sandbox。 |
| Override | 某些决策可绕过第一次 sandbox attempt，但必须来自显式策略。 |
| macOS | Seatbelt profile 约束文件和网络，并可保护 `.git`、`.codex` 等敏感根。 |
| Linux | runtime 可选择 Landlock 或 bubblewrap 类 helper；平台 sandbox 选择可 fallback 到 `SandboxType::None`，而 helper 启动失败仍是执行错误。 |
| Windows | elevated、unelevated、restricted-token 行为不同；兼容性限制可能要求拒绝，而不是不安全 fallback。 |
| External sandbox | runtime 可知道自己已在外部 sandbox 中，只保留能推理的网络语义。 |
| Remote exec | 远端执行也可能参与 filesystem/sandbox 语义，而不是本地启动进程。 |

Sandbox denial 是 policy signal，不只是进程错误。它可能携带 network policy decision，也不一定允许无沙箱重试。

## MCP、Apps、Plugins 与 Skills

| 扩展 | 源码读者会知道什么 |
| --- | --- |
| MCP servers | 可为 stdio 或 streamable HTTP，有 env vars、bearer-token env vars、required/disabled、startup/tool timeout、auth status、OAuth 边界和 per-tool approval config。 |
| MCP tools | 可 allow/deny filter，可来自 startup snapshot/cache，带 sandbox metadata，并受 elicitation policy 管理。 |
| Apps/connectors | 暴露 connector metadata 和 app-owned tools，可能依赖 auth availability，并缓存可用 tool list。 |
| Plugins | 有 manifest、bundled skills/hooks/apps/MCP servers、marketplace cache、availability policy、install/uninstall/share flow 和 plugin skill roots。 |
| Skills | 指令包可来自显式 mention、dependency、disabled paths、bundled collections 或 plugin roots。 |
| Mentions | 用户输入可以包含结构化 mention，影响 turn-scoped context 和 tool availability。 |
| Hooks | Session start、user prompt submit、pre/post tool use、permission request、stop、after-agent hooks 都是策略扩展点。 |

核心规则是：扩展通过 typed inventory、mention、hook 或 injected context 进入系统，而不是悄悄改写中心 turn loop。

## TUI 与 App-Server 接入面

| 接入面事实 | 含义 |
| --- | --- |
| TUI state | 终端 UI 管理 scrollback、live tool tail、bottom pane、approval popup、keymap、editor handoff、notification、markdown rendering 和 resume replay buffering。 |
| App-server transport | app-server 可根据模式使用 stdio、websocket、Unix-domain 或 off/in-process style transport。 |
| Initialization gating | 客户端可能需要 handshake、auth、experimental capability 或 notification 设置后才能完整使用。 |
| Request scope | app-server request 有 serialization scope：有些全局，有些按 thread，有些按 path/thread。 |
| Backpressure | JSON-RPC 可返回 overload/backpressure 错误，而不是永远阻塞。 |
| Security | Origin checks、bearer/capability tokens、websocket auth mode 和 secret sanitization 是 app-server 合同的一部分。 |
| Client APIs | 接入面包含 filesystem APIs/watchers、command exec、process spawn 实验、fuzzy search、accounts/rate limits、model/provider info、config writes、feedback upload、remote control、realtime audio/text 和 thread operations。 |
| Notification mapping | runtime events 会变成 app-server notifications，例如 turn started/completed、item updates、command approval request、turn diff update、token usage 和 compaction。 |

因此 app-server 既是展示桥接，也是运行时入口。现代 TUI 或 exec 路径可以经过 app-server 风格边界，而不总是直接调用旧 core facade。

## 错误与重试分类

| 失败 | 需要记住的运行时行为 |
| --- | --- |
| 可重试 transport | 按预算和 backoff 重试，再给最终错误。 |
| 认证失败 | 可能刷新凭证、请求验证，或发出明确认证错误。 |
| 上下文窗口 | 可能触发 compaction 后重试，不一定是致命错误。 |
| Quota/rate/overload | 不同错误类别帮助 UI 选择文案。 |
| Cyber/policy denial | 应报告为策略拒绝，而不是普通命令失败。 |
| 工具解析错误 | 通常成为模型可见工具输出，让模型修正参数。 |
| Runtime fatal error | 停止相关 task，并发出 error event。 |
| Cancellation | drain 或 abort stream/tool futures，并报告 aborted/cancelled outcome。 |
| App-server JSON-RPC error | 编码 method-level failure，例如 invalid request、auth、experimental gate 或 backpressure。 |

## 运行与高级行为

| 区域 | 源码级细节 |
| --- | --- |
| Bounded queues | runtime channels 和 app-server requests 不能被当作无限 buffer。 |
| Shutdown | cancellation token 和 task join 防止后台工作泄漏。 |
| Thread unload | app-server 可在客户端消失后 unload 或 unsubscribe thread。 |
| Observability | trace context、W3C propagation、telemetry spans、analytics 修饰 submission 和 tool call。 |
| Generated contracts | app-server schema、TypeScript/Python SDK contract tests、generated types 属于兼容性表面。 |
| Multi-agent | spawned agents、agent job state、depth/limits、inter-agent messages、wait/close/resume 和 collab events 是一等能力。 |
| Code mode | 某些工具只在特殊 mode 或 nested execution context 中可用。 |
| Goals and budgets | thread goals 可包含状态和跨 turn 的预算/accounting。 |
| Review mode | review request 通过 protocol events 和 task flow 进入/退出。 |
| Cloud task support | cloud/remote task 路径会增加 requirements、auth 和运行约束。 |

## 源码等价自检

不用打开源码，你应该能回答：

1. 为什么 `Submission -> Session -> Event` 比阻塞式 `run(prompt)` 更适合 Codex？
2. 哪些设置是 turn-scoped，哪些意味着持久或托管配置？
3. 工具解析失败、sandbox denial、approval denial、stream disconnect、runtime fatal error 有什么区别？
4. 为什么 approval、permission profile、network policy、Guardian 和 sandbox 要分层？
5. 为什么 app-server 不只是薄 UI adapter？
6. resume/fork/archive 必须保留哪些状态？

如果答案很模糊，先回到对应表格，而不是立刻打开源码。
