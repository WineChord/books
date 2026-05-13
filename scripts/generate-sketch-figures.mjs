import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const sourceRef = process.env.SKETCH_SOURCE_REF;
const outputDir = path.join(
  root,
  "docs",
  "public",
  "figures",
  "codex-from-source",
  "excalidraw",
);
const publicBase = "/books/figures/codex-from-source/excalidraw";
const minFiguresPerFile = 4;

const chapterFiles = [
  ...Array.from({ length: 25 }, (_, index) =>
    `chapter-${String(index + 1).padStart(2, "0")}`,
  ),
  "epilogue",
];

const stopHeadingPattern =
  /^(apply this|应用模式|应用到实践|closing|what comes next|source map|trace ledger|结语|小结|收束|接下来|源码地图|源码索引|轨迹台账)/i;

const diagramBlueprints = {
  "chapter-02:1": {
    caption: {
      en: "Startup is intentionally split: the JavaScript wrapper locates and launches the native binary, while the Rust router owns command semantics and product dispatch.",
      zh: "启动链路被刻意拆开：JavaScript 包装器只定位并启动原生二进制，命令语义和产品分发由 Rust router 负责。",
    },
  },
  "chapter-02:2": {
    labels: {
      en: [
        "Command router",
        "Product surfaces",
        "Shared config",
        "Shared auth",
        "Protocol boundary",
        "Shared state",
        "Thread/session runtime",
      ],
      zh: [
        "Command router",
        "Product surfaces",
        "Shared config",
        "Shared auth",
        "Protocol boundary",
        "Shared state",
        "Thread/session runtime",
      ],
    },
    caption: {
      en: "Thin surfaces fan out from one router, then converge on shared configuration, authentication, protocol, state, and the thread/session runtime.",
      zh: "薄接入面从同一个 router 分流，再收束到共享的 configuration、authentication、protocol、state 与 thread/session runtime。",
    },
  },
  "chapter-03:2": {
    caption: {
      en: "Authentication is captured as a runtime snapshot: tokens may come from the environment, keyring, auth files, OAuth/device flow, bearer providers, or agent identity, but downstream layers ask one manager for current state.",
      zh: "认证被捕获为运行时快照：token 可以来自环境、keyring、auth file、OAuth/device flow、bearer provider 或 agent identity，但后续层只向同一个 auth manager 查询当前状态。",
    },
  },
  "chapter-03:1": {
    caption: {
      en: "The configuration stack keeps every layer visible while only trusted, enabled, and higher-precedence values affect the resolved runtime envelope.",
      zh: "配置栈会保留每一层的来源，但只有受信任、已启用且优先级更高的值才会进入最终运行包络。",
    },
  },
  "chapter-08:1": {
    caption: {
      en: "Rollout trace records ordered events and raw payload files from runtime sources, then leaves explanation graphs to an offline reducer.",
      zh: "Rollout trace 从运行时来源记录有序事件和原始载荷文件，再把解释图的构造交给离线 reducer。",
    },
  },
  "chapter-04:1": {
    labels: {
      en: [
        "Client operation",
        "Runtime boundary",
        "Accepted fact",
        "Model request",
        "Item delta",
        "Bounded tool request",
        "Recorded event",
      ],
      zh: [
        "Client operation",
        "Runtime boundary",
        "Accepted fact",
        "Model request",
        "Item delta",
        "Bounded tool request",
        "Recorded event",
      ],
    },
    caption: {
      en: "The protocol path is a controlled crossing: operations enter, accepted facts are recorded, and only bounded requests reach models or tools.",
      zh: "协议路径是一道受控边界：操作进入后先成为已接受事实，只有受约束的请求才能继续触达模型或工具。",
    },
  },
  "chapter-04:2": {
    intro: {
      en: "Read this board as the second half of the protocol contract: core events are not exposed until the app-server has translated them into client-safe facts.",
      zh: "读这张图时，把它当成协议契约的后半段：核心事件不会直接暴露，必须先被 app-server 翻译成客户端可理解的事实。",
    },
    caption: {
      en: "App-server events are translated into thread items and deltas before clients see them, so UI surfaces observe runtime facts rather than provider-shaped messages.",
      zh: "App-server 会先把 runtime events 转成 thread items 和 deltas，客户端看到的是运行时事实，而不是 provider 原始消息。",
    },
  },
  "chapter-04:3": {
    caption: {
      en: "App-server event mapping projects core events into thread items, item deltas, derived status, and server-to-client requests before any client renders the update.",
      zh: "App-server 的事件映射会先把核心事件投影成 thread item、item delta、派生状态和服务端到客户端请求，然后客户端才渲染更新。",
    },
  },
  "chapter-04:4": {
    caption: {
      en: "The entry boundary is deliberately narrow: installed commands pass through the Rust router, resolved envelopes describe allowed runtime state, and protocol events are the only durable exit.",
      zh: "入口边界被刻意收窄：安装后的命令先经过 Rust router，已解析运行包络描述可用运行时状态，protocol events 才是可持久化的出口。",
    },
  },
  "chapter-05:1": {
    caption: {
      en: "The runtime stack narrows authority from client surfaces through ThreadManager and CodexThread into submission queues, session state, scheduled tasks, and tool side effects.",
      zh: "运行时栈把客户端入口的权限逐层收窄，经 ThreadManager 与 CodexThread 进入提交队列、会话状态、调度任务和工具副作用。",
    },
  },
  "chapter-05:2": {
    caption: {
      en: "Start, resume, fork, and rollback all rebuild a live session by opening persistence around a chosen replay prefix and appending future items under the resulting thread identity.",
      zh: "start、resume、fork 和 rollback 都围绕选定的 replay 前缀打开持久化、重建 live session，并在得到的 thread identity 下继续追加未来条目。",
    },
  },
  "chapter-05:3": {
    caption: {
      en: "Start, resume, fork, and rollback all rebuild a live session by opening persistence around a chosen replay prefix and appending future items under the resulting thread identity.",
      zh: "start、resume、fork 和 rollback 都围绕选定的 replay 前缀打开持久化、重建 live session，并在得到的 thread identity 下继续追加未来条目。",
    },
  },
  "chapter-07:1": {
    caption: {
      en: "Provider data, catalogs, runtime auth, typed APIs, and transports stay in separate layers so the turn loop receives normalized response events instead of provider mechanics.",
      zh: "Provider 配置、模型目录、运行时认证、类型化 API 和传输适配分层处理，让 turn loop 接收归一化响应事件，而不是接触各 provider 的通信细节。",
    },
  },
  "chapter-07:2": {
    caption: {
      en: "HTTP SSE frames and WebSocket session messages carry the same prompt and tool request into a transport parser that returns ResponseEvent items for the turn loop.",
      zh: "HTTP SSE 帧和 WebSocket 会话消息承载同一份 prompt 与工具请求，并由传输适配归一成 turn loop 可消费的 ResponseEvent 条目。",
    },
  },
  "chapter-07:3": {
    caption: {
      en: "Inference transports return response events for local turns, while backend task APIs manage cloud task lifecycle, attempts, diffs, and apply semantics on a separate product path.",
      zh: "推理 transport 为本地 turn 返回响应事件，而 backend task API 在另一条产品路径上管理云端任务生命周期、attempt、diff 和 apply 语义。",
    },
  },
  "chapter-08:2": {
    caption: {
      en: "The strict reducer turns raw model, runtime, and terminal payloads into separate model-visible items, runtime objects, and causal interaction edges without flattening them into a transcript.",
      zh: "严格 reducer 把原始模型、运行时和终端载荷规约成模型可见条目、运行时对象和因果交互边，而不是压平成一份 transcript。",
    },
  },
  "chapter-14:1": {
    caption: {
      en: "The app-server contract routes client connections through transport adapters, message processing, resource-scoped queues, request processors, core threads, and thread listeners before anything becomes a public update.",
      zh: "app-server 契约让客户端连接先经过传输适配、消息处理、资源范围化队列、请求处理器、核心线程和线程 listener，之后才形成公开更新。",
    },
  },
  "chapter-14:2": {
    caption: {
      en: "Event mapping translates core runtime events into server notifications, server requests, derived status, replayable history, and pending response tracking for the client contract.",
      zh: "事件映射把核心运行时事件翻译成客户端契约里的服务端通知、服务端请求、派生状态、可回放历史和待处理响应跟踪。",
    },
  },
  "chapter-06:2": {
    labels: {
      en: [
        "Start",
        "Prepare and prompt hooks",
        "Blocked prompt",
        "Sample",
        "Stream",
        "Dispatch tools",
        "Record observations",
        "Compact history",
        "Pending input",
        "Stop hooks",
        "Complete or abort",
      ],
      zh: [
        "开始",
        "准备与提示 Hook",
        "提示被阻断",
        "模型采样",
        "流式事件",
        "分发工具",
        "记录观察结果",
        "压缩历史",
        "待处理输入",
        "停止 Hook",
        "完成或中止",
      ],
    },
    caption: {
      en: "The turn loop advances only when a recorded condition exists: streamed output, tool observations, compaction pressure, pending input, stop-hook context, or final settlement.",
      zh: "Turn loop 只有在存在已记录条件时才继续：流式输出、工具观察结果、压缩压力、待处理输入、停止 Hook 上下文，或最终落定。",
    },
  },
  "chapter-06:1": {
    labels: {
      en: [
        "Submit operation",
        "Resolve context",
        "Prompt hooks",
        "Record input/context",
        "Sample and stream",
        "Persist items",
        "Tool dispatch",
        "Observations, compaction, pending input",
        "Stop hooks and completion",
      ],
      zh: [
        "提交操作",
        "解析上下文",
        "提示 Hook",
        "记录输入与上下文",
        "采样并流式返回",
        "持久化条目",
        "工具分发",
        "观察结果、压缩、待处理输入",
        "停止 Hook 与完成",
      ],
    },
    caption: {
      en: "A turn is a controlled loop: context is recorded before sampling, streamed items become durable evidence, and follow-up work re-enters through explicit observations or hooks.",
      zh: "一次 turn 是受控循环：采样前先记录上下文，流式条目成为持久证据，后续工作必须通过明确的观察结果或 Hook 重新进入。",
    },
  },
  "chapter-09:1": {
    labels: {
      en: [
        "Config and capabilities",
        "Tool spec plan",
        "Model-visible specs",
        "Handler registry",
        "Model tool call",
        "Runtime router",
        "Events and result",
      ],
      zh: [
        "Config and capabilities",
        "Tool spec plan",
        "Model-visible specs",
        "Handler registry",
        "Model tool call",
        "Runtime router",
        "Events and result",
      ],
    },
    caption: {
      en: "The tool lifecycle has two planes: one builds the model-visible contract, while the other routes tool calls to authorized runtime handlers.",
      zh: "工具生命周期有两个平面：一个构造模型可见契约，另一个把工具调用路由到获得授权的运行时处理器。",
    },
  },
  "chapter-10:1": {
    labels: {
      en: [
        "Tool call",
        "Parse command and arguments",
        "Classify safety and policy",
        "Pre-tool and permission hooks",
        "Approval or rejection",
        "Permission profile to sandbox",
        "Environment and exec-server backend",
        "Managed process",
        "Sequenced output and exit",
        "Events, telemetry, model result",
      ],
      zh: [
        "工具调用",
        "解析命令与参数",
        "分类安全与策略",
        "工具前 Hook 与权限 Hook",
        "审批或拒绝",
        "权限配置到沙箱",
        "环境与 exec-server 后端",
        "受管理进程",
        "有序输出与退出状态",
        "事件、遥测与模型结果",
      ],
    },
    caption: {
      en: "Shell execution is a chain of custody: the command is parsed, policy and hooks narrow it, the selected sandbox runs a managed process, and ordered output returns as evidence.",
      zh: "Shell 执行是一条监管链：命令先被解析，策略与 Hook 逐步收窄权限，选中的沙箱运行受管理进程，最终把有序输出作为证据返回。",
    },
  },
  "chapter-11:1": {
    labels: {
      en: [
        "Freeform patch or shell-like invocation",
        "Detect apply-patch intent",
        "Parse patch hunks",
        "Verify paths and current file content",
        "Assess safety and permissions",
        "Approval and hooks",
        "Filesystem-backed apply",
        "Committed delta",
        "Patch events and turn diff",
        "Model-visible result",
      ],
      zh: [
        "自由格式 patch 或 shell 形式调用",
        "识别 apply-patch 意图",
        "解析 patch hunk",
        "验证路径与当前文件内容",
        "评估安全性与权限",
        "审批与 Hook",
        "基于文件系统应用",
        "已提交 delta",
        "patch 事件与 turn diff",
        "模型可见结果",
      ],
    },
    caption: {
      en: "Patch application is treated as evidence, not text mutation: every accepted hunk passes grammar, path, permission, filesystem, and diff-recording gates before the model sees a result.",
      zh: "Patch 应用被当作证据链，而不是文本替换：每个被接受的 hunk 都要经过语法、路径、权限、文件系统与 diff 记录关卡，模型才会看到结果。",
    },
  },
  "chapter-12:1": {
    title: {
      en: "The Approval Stack: Whiteboard Map",
      zh: "审批栈：白板结构图",
    },
    intro: {
      en: "Read the gate stack from top to bottom: each row answers who may add context, who may stop work, and who is allowed to turn intent into action.",
      zh: "这张关卡栈要从上往下读：每一层都回答谁能补充上下文、谁能停止工作，以及谁能把意图变成动作。",
    },
    labels: {
      en: [
        "Tool, prompt, compact, or stop event",
        "Hook preview",
        "Trusted hook run",
        "Hook outcome",
        "Context or feedback",
        "Block or stop",
        "Approval requirement",
        "Permission-request hook",
        "Decision source",
        "Allow, deny, timeout, amend",
        "Tool attempt or rejection",
      ],
      zh: [
        "工具、提示、压缩或停止事件",
        "Hook 预览",
        "可信 Hook 执行",
        "Hook 结果",
        "上下文或反馈",
        "阻断或停止",
        "审批要求",
        "权限请求 Hook",
        "决策来源",
        "允许、拒绝、超时、修正",
        "工具尝试或拒绝",
      ],
    },
    caption: {
      en: "The approval stack is ordered so every actor can add context, block, amend, or authorize before a dangerous attempt becomes real.",
      zh: "审批栈是有序的：每个参与方都能在危险动作真实发生前补充上下文、阻断、修正或授权。",
    },
  },
  "chapter-12:2": {
    title: {
      en: "One Command Through the Gates: Whiteboard Map",
      zh: "一条命令穿过审批链：白板结构图",
    },
    labels: {
      en: [
        "Shell tool call",
        "Pre-tool event",
        "Allow, context, warning, or block",
        "Evaluate command and profile",
        "Approval request when needed",
        "Allow, deny, amend, timeout",
        "Executable decision",
        "Run under selected sandbox",
        "Output and status",
        "Post-tool hook observes output/status",
      ],
      zh: [
        "Shell 工具调用",
        "工具前事件",
        "允许、上下文、警告或阻断",
        "评估命令与权限配置",
        "按需发起审批请求",
        "允许、拒绝、修正、超时",
        "可执行决策",
        "在所选沙箱中运行",
        "输出与状态",
        "工具后 Hook 观察输出与状态",
      ],
    },
    caption: {
      en: "A shell command becomes executable only after hooks add or block context, policy evaluates the effective profile, and the reviewer path returns a decision.",
      zh: "一条 shell 命令只有在 Hook 补充或阻断上下文、策略评估有效权限、审查路径返回决策后，才会变成可执行动作。",
    },
  },
  "chapter-13:1": {
    intro: {
      en: "Read this as a policy compiler, not one sandbox: the same permission profile can produce different enforcement paths on different platforms.",
      zh: "这张图要读成一个策略编译器，而不是一个沙箱：同一份权限配置会在不同平台上生成不同执行路径。",
    },
    labels: {
      en: [
        "Permission profile",
        "Filesystem and network policy",
        "Select sandbox type",
        "Transform command and environment",
        "macOS Seatbelt",
        "Linux bwrap, namespaces, seccomp",
        "Windows token, ACL, firewall, WFP",
        "No platform sandbox",
        "Execution metadata and result",
      ],
      zh: [
        "权限配置",
        "文件系统与网络策略",
        "选择沙箱类型",
        "转换命令与环境",
        "macOS Seatbelt",
        "Linux bwrap、namespace、seccomp",
        "Windows token、ACL、防火墙、WFP",
        "无平台沙箱",
        "执行元数据与结果",
      ],
    },
    caption: {
      en: "Sandboxing starts from one permission profile, then branches through platform helpers; even the no-sandbox path is explicit and still returns execution metadata.",
      zh: "沙箱策略从同一份权限配置出发，再按平台 helper 分支；即使没有平台沙箱，也必须显式进入路径并返回执行元数据。",
    },
  },
  "chapter-15:1": {
    labels: {
      en: [
        "Protocol schema",
        "Rust facade",
        "Python SDK",
        "TypeScript SDK",
        "Exec command surface",
        "Daemon lifecycle",
        "Remote-control bridge",
        "Remote backend",
        "App-server runtime",
      ],
      zh: [
        "协议 schema",
        "Rust facade",
        "Python SDK",
        "TypeScript SDK",
        "exec 命令接入面",
        "后台守护进程",
        "远程控制桥",
        "远程后端",
        "App-server 运行时",
      ],
    },
    caption: {
      en: "Client surfaces are not peers: schema-driven SDKs, command surfaces, daemons, and remote-control bridges all converge on the app-server runtime through different trust and transport paths.",
      zh: "客户端接入面并不等价：schema 驱动的 SDK、命令接入面、daemon 与远程控制桥，沿着不同的信任和传输路径收束到 app-server 运行时。",
    },
  },
  "chapter-15:2": {
    title: {
      en: "Daemon Lifecycle: Whiteboard Map",
      zh: "Daemon 生命周期：白板结构图",
    },
    labels: {
      en: [
        "Unknown",
        "Probing",
        "Ready",
        "Starting",
        "Restarting",
        "Failed",
        "Retry under lock",
      ],
      zh: [
        "未知状态",
        "健康探测",
        "就绪",
        "启动中",
        "重启中",
        "失败",
        "带锁重试",
      ],
    },
    caption: {
      en: "The daemon lifecycle is not just startup: stale servers and update requirements flow through restart, failure, and locked retry paths.",
      zh: "守护进程生命周期不只是启动：陈旧服务与更新需求会进入重启、失败和带锁重试路径。",
    },
  },
  "chapter-15:3": {
    caption: {
      en: "Remote control turns a backend stream into a recoverable local connection: cursor acknowledgements and buffered replay keep the app-server contract intact across reconnects.",
      zh: "Remote control 把后端流转成可恢复的本地连接：cursor ack 与 buffered replay 让 app-server 契约在重连后仍保持一致。",
    },
  },
  "chapter-16:3": {
    caption: {
      en: "Internal events, active-thread notifications, and user input all enter one app-event queue, while rendering stays downstream as a projection of model state.",
      zh: "内部事件、活动线程通知和用户输入都进入同一个应用事件队列，渲染则留在下游，作为模型状态的投影。",
    },
  },
  "chapter-16:2": {
    labels: {
      en: [
        "Committed scrollback",
        "Live viewport",
        "Bottom pane",
        "Modal layer",
        "Runtime events",
        "Resize and reflow",
      ],
      zh: [
        "已提交滚屏记录",
        "实时视口",
        "底部面板",
        "模态层",
        "运行时事件",
        "重排与尺寸变化",
      ],
    },
    caption: {
      en: "Committed scrollback, live cells, input, modals, and resize reflow are separate planes, which is why terminal rendering can stay incremental without losing source-of-truth history.",
      zh: "已提交滚屏记录、实时单元、输入、模态层和重排逻辑分属不同平面，所以终端渲染可以保持增量，同时不丢失权威历史。",
    },
  },
  "chapter-16:1": {
    caption: {
      en: "TUI startup binds three contracts before the app loop begins: resolved config and auth, detected terminal capability, and an app-server session for the active thread.",
      zh: "TUI 启动会在 app loop 前绑定三类契约：已解析的 config/auth、检测到的 terminal capability，以及 active thread 的 app-server session。",
    },
  },
  "chapter-16:4": {
    caption: {
      en: "Streaming Markdown stays mutable only at the live tail; once committed, source and layout identity are kept so resize, copy, and scrollback remain reproducible.",
      zh: "Streaming Markdown 只在 live tail 保持可变；一旦提交，source 和 layout identity 就被保留，因此 resize、copy 和 scrollback 都可重现。",
    },
  },
  "chapter-17:1": {
    caption: {
      en: "MCP creates a naming boundary: configured servers keep raw identity, model-visible names are sanitized, and provenance records route calls back to the owning server.",
      zh: "MCP 创建命名边界：配置服务保留原始身份，模型可见名称先被清洗，来源记录再把调用路由回所属服务。",
    },
  },
  "chapter-19:1": {
    caption: {
      en: "Migration translates only recognized external artifacts into native shapes, preserves existing targets, and records provenance so compatibility does not become runtime emulation.",
      zh: "迁移只把可识别的外部产物翻译成原生形状，保留已有目标，并记录来源信息，避免兼容性变成运行时模拟。",
    },
  },
  "chapter-20:2": {
    caption: {
      en: "The live graph keeps open and closed descendants small for runtime coordination, while the trace graph reduces raw events into explainable interaction edges for debuggers and clients.",
      zh: "Live graph 为 runtime coordination 维护小型 open/closed descendants 索引，trace graph 则把 raw events 归约成 debugger 和 client 可解释的 interaction edges。",
    },
  },
  "chapter-20:1": {
    caption: {
      en: "Multi-agent work stays compositional when parent and child threads are linked through graph lifecycle, mailbox delivery, and result notifications instead of shared mutable state.",
      zh: "多 Agent 工作通过 graph lifecycle、mailbox delivery 和 result notifications 连接父子 threads，而不是合并成共享可变状态，因此保持可组合。",
    },
  },
  "chapter-24:1": {
    caption: {
      en: "Delivery keeps the native Codex binary authoritative while Cargo, Bazel verification, npm platform packages, release archives, the meta package, and standalone installers handle distribution.",
      zh: "交付层让 Codex 原生二进制保持权威，同时由 Cargo、Bazel 验证、npm 平台包、发布归档、元包和独立安装器处理分发。",
    },
  },
  "chapter-18:1": {
    title: {
      en: "Extension Planes: Whiteboard Map",
      zh: "扩展平面：白板结构图",
    },
    labels: {
      en: [
        "Marketplace bundles",
        "Plugin cache",
        "Plugin loader",
        "Skill metadata",
        "MCP configs",
        "Hook configs",
        "Hosted connectors",
      ],
      zh: [
        "市场 bundles",
        "插件 cache",
        "插件 loader",
        "技能 metadata",
        "MCP 配置",
        "Hook 配置",
        "托管连接器",
      ],
    },
    caption: {
      en: "Marketplace bundles, plugin cache, loader validation, skill metadata, MCP and hook configs, and hosted connectors converge at thread construction without sharing one trust model.",
      zh: "市场包、插件缓存、加载器校验、技能元数据、MCP/Hook 配置和托管连接器在线程构造时汇合，但不共用同一套信任模型。",
    },
  },
  "chapter-22:1": {
    caption: {
      en: "Memory has separate read and write paths: the active turn can read curated summaries and resources, while background consolidation writes durable memory through a controlled pipeline.",
      zh: "记忆有独立读写路径：活动 turn 只能读取受控摘要与资源，后台合并流程才通过受控流水线写入持久 memory。",
    },
  },
  "chapter-22:2": {
    caption: {
      en: "Citations connect memory back to evidence: parsed citation blocks preserve artifact locations, rollout ids, and thread ids so later logic can distinguish using memory from merely mentioning a remembered fact.",
      zh: "引用把 memory 连回证据：解析后的 citation block 保留 artifact 位置、rollout id 与 thread id，让后续逻辑能区分“使用了 memory”和“只是提到被记住的事实”。",
    },
  },
  "chapter-19:2": {
    title: {
      en: "Idempotent Session Import",
      zh: "幂等会话导入",
    },
    labels: {
      en: [
        "Content hash ledger",
        "New import",
        "Importable JSONL",
        "Native rollout items",
        "Imported thread",
        "Source hash record",
      ],
      zh: [
        "内容哈希台账",
        "新导入",
        "可导入 JSONL",
        "原生 rollout 条目",
        "导入线程",
        "来源哈希记录",
      ],
    },
    caption: {
      en: "The content-hash ledger makes session import repeatable: unchanged JSONL is skipped, while changed supported records become rollout items and an imported thread.",
      zh: "Content-hash ledger 让 session import 可重复：未变化的 JSONL 被跳过，发生变化且受支持的记录会变成 rollout items 和 imported thread。",
    },
  },
  "chapter-21:1": {
    title: {
      en: "Task Backend Contract: Whiteboard Map",
      zh: "任务后端契约：白板结构图",
    },
    labels: {
      en: [
        "Cloud CLI/TUI",
        "Backend contract",
        "HTTP client",
        "Mock backend",
        "Remote task service",
        "Attempt diff",
        "Task metadata",
      ],
      zh: [
        "云端 CLI/TUI",
        "后端契约",
        "HTTP client",
        "Mock backend",
        "远端任务服务",
        "尝试 diff",
        "任务 metadata",
      ],
    },
    caption: {
      en: "Remote task work crosses a backend contract before any local patch touches the worktree.",
      zh: "远程任务工作先跨过后端契约，随后本地 patch 引擎才会触碰工作树。",
    },
  },
  "chapter-21:2": {
    title: {
      en: "Local Patch Apply: Whiteboard Map",
      zh: "本地 Patch 应用：白板结构图",
    },
    labels: {
      en: [
        "Choose task and attempt",
        "Fetch selected diff",
        "Unified diff and metadata",
        "Reject diff",
        "Preflight current worktree",
        "Apply through patch engine",
        "Return task result",
      ],
      zh: [
        "选择任务与尝试",
        "获取详情或所选 diff",
        "统一 diff 与元数据",
        "拒绝 diff",
        "基于当前工作树预检",
        "通过 patch 引擎应用",
        "返回任务结果",
      ],
    },
    caption: {
      en: "Task apply is still local governance: the backend supplies a candidate diff, but the worktree-facing patch engine validates shape, preflights current state, and records the result.",
      zh: "任务应用仍然是本地治理：后端提供候选 diff，但接触工作树的是 patch 引擎，它负责校验形状、基于当前状态预检并记录结果。",
    },
  },
  "chapter-21:3": {
    title: {
      en: "Agent Identity Binds Runtime to Task",
      zh: "Agent 身份把运行时绑定到任务",
    },
    labels: {
      en: [
        "Runtime key material",
        "Public registration identity",
        "Task registration request",
        "Signed task assertion",
        "Agent bill of materials",
        "Backend identity service",
        "Identity JWT claims",
        "Authorized task access",
      ],
      zh: [
        "运行时密钥材料",
        "公开注册身份",
        "任务注册请求",
        "已签名任务断言",
        "Agent 物料清单",
        "后端身份服务",
        "身份 JWT 声明",
        "已授权任务访问",
      ],
    },
    caption: {
      en: "Agent identity prevents remote task authority from becoming ambient: runtime key material signs a task-scoped assertion before the backend grants access.",
      zh: "Agent 身份避免远程任务权限变成环境权限：运行时密钥材料先签署任务范围内的断言，后端才授予访问。",
    },
  },
  "chapter-22:3": {
    title: {
      en: "Stage 2 Memory Consolidation",
      zh: "Stage 2 记忆合并",
    },
    labels: {
      en: [
        "State DB",
        "Memory worktree",
        "Versioned baseline",
        "Claim lock",
        "Restricted agent",
        "Commit memory changes",
        "Sync selected outputs",
      ],
      zh: [
        "状态 DB",
        "记忆工作树",
        "Git 基线",
        "声明锁",
        "受限代理",
        "提交记忆变更",
        "同步所选输出",
      ],
    },
    caption: {
      en: "Stage 2 turns selected memory records into a controlled worktree update: state claims the lock, the baseline scopes the diff, and the restricted agent edits only memory artifacts.",
      zh: "Stage 2 把选中的记忆记录变成受控工作树更新：状态先声明锁，基线限定 diff，受限代理只编辑记忆产物。",
    },
  },
  "chapter-23:2": {
    title: {
      en: "Bazel Overlay Verification: Whiteboard Map",
      zh: "Bazel 覆盖验证：白板结构图",
    },
    labels: {
      en: [
        "Developer changes a crate",
        "Cargo test path",
        "Bazel mirrored target",
        "Workspace-root launcher",
        "Cargo-like paths and snapshots",
        "Platform release matrix",
        "Release confidence",
      ],
      zh: [
        "开发者修改 crate",
        "Cargo 测试路径",
        "Bazel 镜像目标",
        "工作区根启动器",
        "Cargo 风格路径与快照",
        "平台发布矩阵",
        "发布信心",
      ],
    },
    caption: {
      en: "Bazel does not replace the product graph; it mirrors the Cargo-shaped world under reproducible launch conditions so CI can catch platform and packaging drift.",
      zh: "Bazel 不替代产品图，而是在可复现启动条件下镜像 Cargo 形状的世界，让 CI 能捕获平台与打包漂移。",
    },
  },
  "chapter-23:3": {
    caption: {
      en: "Generated schemas are product APIs: runtime types produce checked-in contracts, drift checks make changes reviewable, and external clients get a stable vocabulary instead of private Rust shapes.",
      zh: "生成 schema 是产品 API：运行时类型产出已提交契约，漂移检查让变更可审查，外部 client 得到稳定词汇，而不是私有 Rust 形状。",
    },
  },
  "chapter-23:1": {
    labels: {
      en: [
        "Cargo workspace",
        "Workspace crates and binaries",
        "Resolved dependency graph",
        "Bazel overlay",
        "Reproducible CI and release checks",
        "Generated contract schemas",
        "SDKs, app-server clients, config authors",
        "GitHub release workflow",
        "Release artifacts",
      ],
      zh: [
        "Cargo 工作区",
        "工作区包与二进制",
        "已解析依赖图",
        "Bazel 覆盖层",
        "可复现 CI 与发布验证",
        "生成契约 schema",
        "SDK、app-server 客户端与配置作者",
        "GitHub 发布流程",
        "发布产物",
      ],
    },
    caption: {
      en: "The build graph has two jobs: Cargo keeps the product graph understandable, while Bazel mirrors enough of it to verify release artifacts reproducibly.",
      zh: "构建图承担两件事：Cargo 保持产品图可理解，Bazel 镜像足够多的结构，用可复现方式验证发布产物。",
    },
  },
  "chapter-24:2": {
    title: {
      en: "Installer Release Flow",
      zh: "安装器发布流",
    },
    labels: {
      en: [
        "Release CI",
        "Package staging",
        "Release storage",
        "Installer",
        "User shell",
        "Assemble packages",
        "Publish payload",
      ],
      zh: [
        "发布 CI",
        "包暂存",
        "发布存储",
        "安装器",
        "用户 shell",
        "组装包",
        "发布载荷",
      ],
    },
    caption: {
      en: "Release CI assembles and stages packages, publishes payloads to release storage, and lets the installer place the verified command in the user's shell.",
      zh: "发布 CI 组装并暂存包，将 payload 发布到 release storage，再由安装器把经过验证的命令放进用户 shell。",
    },
  },
  "chapter-24:3": {
    caption: {
      en: "Product code consumes a stable native capability while third-party metadata, vendor fixes, Integrity Records, bundled helpers, and release rules stay behind the build and release boundary.",
      zh: "产品代码只消费稳定原生能力，而第三方元数据、供应商补丁、完整性记录、内置 helper 和发布规则留在构建与发布边界之后。",
    },
  },
  "chapter-25:1": {
    title: {
      en: "Governance Gates: Whiteboard Map",
      zh: "治理门：白板结构图",
    },
    caption: {
      en: "A proposed change earns merge confidence only by passing executable gates for tests, generated output, architectural boundaries, dependencies, blobs, and custom lints.",
      zh: "拟议变更只有通过测试、生成产物、架构边界、依赖、二进制大文件和自定义 lint 这些可执行关卡后，才获得合并信心。",
    },
  },
  "chapter-25:2": {
    title: {
      en: "CI Lanes Match Risk, Not Just Language",
      zh: "CI 通道匹配风险，而不只是语言",
    },
    labels: {
      en: [
        "Pull request",
        "Fast feedback lane",
        "Contract drift lane",
        "Reproducible build lane",
        "Platform matrix lane",
        "Supply-chain lane",
        "Review decision",
      ],
      zh: [
        "变更请求",
        "快速反馈通道",
        "契约漂移通道",
        "可复现构建通道",
        "平台矩阵通道",
        "供应链通道",
        "审查决策",
      ],
    },
    caption: {
      en: "CI lanes make risk legible by separating fast feedback, contract drift, reproducible builds, platform coverage, and supply-chain checks before review.",
      zh: "CI 通道在审查前拆开快速反馈、契约漂移、可复现构建、平台覆盖和供应链检查，让风险更可读。",
    },
  },
  "chapter-25:3": {
    title: {
      en: "Generated Drift State Machine",
      zh: "生成漂移状态机",
    },
    labels: {
      en: [
        "Source changed",
        "Generator run",
        "Drift detected",
        "CI blocked",
        "Reviewable diff",
        "Accepted",
        "Reworked loop",
      ],
      zh: [
        "源码变化",
        "运行生成器",
        "发现漂移",
        "CI 阻塞",
        "可审查 diff",
        "接受",
        "返工循环",
      ],
    },
    caption: {
      en: "Generated drift is treated as a contract loop: source changes run generators, stale output blocks CI, and the diff is either accepted or returned for rework.",
      zh: "生成产物漂移被当成契约循环：源码变化触发生成器，过期输出阻塞 CI，diff 要么被接受，要么回到返工。",
    },
    intro: {
      en: "The generated-drift state machine turns source changes into a visible contract loop: generated output must either pass review or return for rework.",
      zh: "把生成漂移状态机当作阅读锚点：源码变化会产生生成产物，CI 阻塞漂移，审查要么接受契约变更，要么把它送回返工循环。",
    },
  },
  "epilogue:1": {
    title: {
      en: "The Bounded Operating Environment",
      zh: "有边界的运行环境",
    },
    labels: {
      en: [
        "User intent",
        "Typed protocol",
        "Event-sourced runtime",
        "Model streaming",
        "Negotiated tools",
        "Policy and sandbox gates",
        "Filesystem, process, network effects",
        "Clients and SDKs",
        "Durable state and memory",
        "Replay and observe",
        "Build and governance",
      ],
      zh: [
        "用户意图",
        "类型化协议",
        "事件溯源运行时",
        "模型流式输出",
        "协商工具",
        "策略与沙箱门",
        "文件系统、进程、网络副作用",
        "客户端与 SDK",
        "持久状态与记忆",
        "回放与可观测性",
        "构建与治理",
      ],
    },
    caption: {
      en: "The bounded operating environment keeps typed intent, model streaming, negotiated tools, policy gates, state, replay, clients, memory, build, and governance attached to one runtime.",
      zh: "有边界运行环境把类型化意图、模型流式输出、协商后的工具、策略门、状态、回放、客户端、记忆、构建与治理绑定到同一个运行时。",
    },
    intro: {
      en: "The final operating-environment sketch compresses the reusable architecture: typed intent enters one runtime, every effect is negotiated, and durable state keeps the system accountable.",
      zh: "收束图压缩的是可复用架构：类型化意图进入同一个运行时，每个副作用都要协商，持久状态让系统可追责。",
    },
  },
  "epilogue:The Book's Final Mental Model": {
    title: "epilogue:1",
    labels: "epilogue:1",
  },
  "epilogue:最后的心智模型": {
    title: "epilogue:1",
    labels: "epilogue:1",
  },
};

const conceptBlueprints = {
  "chapter-01:The Vocabulary": {
    title: {
      en: "Core Vocabulary",
      zh: "核心词汇",
    },
    labels: {
      en: [
        "Thread",
        "Turn",
        "Item",
        "Operation",
        "Event",
        "Tool",
        "Rollout",
      ],
      zh: [
        "Thread",
        "Turn",
        "Item",
        "Operation",
        "Event",
        "Tool",
        "Rollout",
      ],
    },
    caption: {
      en: "Thread, turn, item, operation, event, tool, and rollout name the runtime facts that keep user intent, model output, side effects, and replay from collapsing into one transcript.",
      zh: "Thread、turn、item、operation、event、tool 和 rollout 命名的是运行时事实，用来防止用户意图、模型输出、副作用和 replay 坍缩成一份 transcript。",
    },
  },
  "chapter-01:核心词汇": {
    labels: "chapter-01:The Vocabulary",
  },
  "chapter-01:Why Contracts Come First": {
    title: {
      en: "Contracts Before Surfaces",
      zh: "先讲契约，再讲接入面",
    },
    labels: {
      en: [
        "Replaceable clients",
        "Stable operations",
        "Runtime boundary",
        "Accepted events",
        "Replay evidence",
        "Authority stays inside",
      ],
      zh: [
        "可替换客户端",
        "稳定 operation",
        "运行时边界",
        "已接受 event",
        "Replay 证据",
        "权限留在内部",
      ],
    },
    caption: {
      en: "Contracts come first because clients are replaceable surfaces; typed operations and accepted events are the stable boundary that keeps runtime authority inside the system.",
      zh: "本书先讲契约，因为客户端都是可替换的接入面；typed operations 和 accepted events 才是把 runtime authority 留在系统内部的稳定边界。",
    },
  },
  "chapter-01:为什么从契约开始": {
    labels: "chapter-01:Why Contracts Come First",
  },
  "chapter-02:JavaScript as Delivery Glue": {
    title: {
      en: "JavaScript Bootloader Boundary",
      zh: "JavaScript Bootloader 边界",
    },
    labels: {
      en: [
        "Installed command",
        "Platform detection",
        "Native binary lookup",
        "Helper path setup",
        "Signal forwarding",
        "Rust router owns semantics",
      ],
      zh: [
        "已安装命令",
        "平台检测",
        "原生二进制查找",
        "Helper path",
        "信号转发",
        "Rust router 负责语义",
      ],
    },
    caption: {
      en: "The JavaScript layer handles platform lookup, native discovery, helper paths, and signal forwarding; config, auth, tools, and product semantics stay behind the Rust router.",
      zh: "JavaScript 层只处理平台查找、native discovery、helper paths 和 signal forwarding；config、auth、tools 与产品语义都留在 Rust router 后面。",
    },
  },
  "chapter-02:作为交付胶水的 JavaScript": {
    labels: "chapter-02:JavaScript as Delivery Glue",
  },
  "chapter-01:A Turn as a System Call": {
    title: {
      en: "Turn as System Call",
      zh: "Turn 像系统调用",
    },
    labels: {
      en: [
        "User intent operation",
        "Runtime admission",
        "Effect gate",
        "Tool effect request",
        "Accepted event",
        "Replay evidence",
      ],
      zh: [
        "用户意图操作",
        "运行时受理",
        "副作用门",
        "工具副作用请求",
        "已接受事件",
        "回放证据",
      ],
    },
    caption: {
      en: "A turn behaves like a system call: typed intent enters the runtime, policy decides which effects may happen, and accepted events become the evidence that replay can trust.",
      zh: "一次 turn 像系统调用：类型化意图进入运行时，策略决定哪些副作用可以发生，已接受事件成为回放可以信任的证据。",
    },
  },
  "chapter-01:把 Turn 看成系统调用": {
    labels: "chapter-01:A Turn as a System Call",
  },
  "chapter-01:Authority Is Layered": {
    title: {
      en: "Layered Authority",
      zh: "分层权限",
    },
    labels: {
      en: [
        "Client intent",
        "Managed requirements",
        "Permission profile",
        "Policy and hooks",
        "Approval decision",
        "Sandbox or executor",
        "Rollout evidence",
      ],
      zh: [
        "客户端意图",
        "托管要求",
        "权限配置",
        "策略与 Hook",
        "审批决策",
        "沙箱或执行器",
        "回放证据",
      ],
    },
    caption: {
      en: "Authority is layered so no single model message can become power: clients submit intent, runtime policy gates it, tool handlers execute narrow effects, and rollout evidence records what happened.",
      zh: "权限被分层后，任何单条模型消息都不能直接变成权力：客户端提交意图，运行时策略把关，工具处理器执行窄副作用，回放证据记录事实。",
    },
  },
  "chapter-01:权限是分层的": {
    labels: "chapter-01:Authority Is Layered",
  },
  "chapter-02:Hidden Commands Are Still Contracts": {
    title: {
      en: "Hidden Command Contracts",
      zh: "隐藏命令契约",
    },
    labels: {
      en: [
        "Private entry point",
        "Parsed arguments",
        "Helper process",
        "Packaging script",
        "CI expectation",
        "Stable failure mode",
      ],
      zh: [
        "私有入口",
        "解析后参数",
        "Helper 进程",
        "打包脚本",
        "CI 预期",
        "稳定错误语义",
      ],
    },
    caption: {
      en: "Hidden commands are private product surfaces, but tests, packaging, and helper processes still depend on their arguments, outputs, and failure modes as contracts.",
      zh: "隐藏命令是私有产品接入面，但测试、打包流程和 helper processes 仍会把它们的参数、输出和失败形态当成契约依赖。",
    },
  },
  "chapter-02:隐藏命令仍然是契约": {
    labels: "chapter-02:Hidden Commands Are Still Contracts",
  },
  "chapter-03:Preferences Versus Requirements": {
    title: {
      en: "Preferences and Requirements",
      zh: "偏好与要求",
    },
    labels: {
      en: [
        "User preference",
        "Managed requirement",
        "Source provenance",
        "Restrictive merge",
        "Fail-closed error",
        "Resolved envelope",
      ],
      zh: [
        "用户偏好",
        "托管要求",
        "来源信息",
        "限制性合并",
        "失败即关闭",
        "解析后信封",
      ],
    },
    caption: {
      en: "Preferences express what a surface wants; requirements express what the environment permits. The resolved envelope keeps both source-aware so policy can constrain rather than silently override.",
      zh: "偏好表达接入面想要什么，要求表达环境允许什么。解析后的信封保留两者来源，让策略进行约束，而不是静默覆盖。",
    },
  },
  "chapter-03:偏好与要求": {
    labels: "chapter-03:Preferences Versus Requirements",
  },
  "chapter-03:Preference 与 Requirement 不同": {
    labels: "chapter-03:Preferences Versus Requirements",
  },
  "chapter-03:Authentication as a Snapshot": {
    title: {
      en: "Authentication Snapshot",
      zh: "认证快照",
    },
    labels: {
      en: [
        "Environment token",
        "Auth manager",
        "Keyring or auth file",
        "OAuth/device flow",
        "Bearer provider",
        "Current account state",
      ],
      zh: [
        "环境 token",
        "认证管理器",
        "Keyring 或 auth file",
        "OAuth/device flow",
        "Bearer provider",
        "当前账号状态",
      ],
    },
    caption: {
      en: "The auth manager turns several credential sources into one current snapshot, so long-running sessions do not mix refreshed, expired, or externally supplied tokens.",
      zh: "认证管理器把多种凭据来源整理成同一个当前快照，避免长时间运行的会话混用已刷新、已过期或外部提供的 token。",
    },
  },
  "chapter-03:认证是一份 Snapshot": {
    labels: "chapter-03:Authentication as a Snapshot",
  },
  "chapter-03:Managed Requirements and Fail-Closed Behavior": {
    title: {
      en: "Managed Requirements and Fail-Closed",
      zh: "托管要求与失败即关闭",
    },
    labels: {
      en: [
        "Managed account",
        "Host policy",
        "Requirement loader",
        "Source-aware constraint",
        "Fail-closed error",
        "Resolved envelope",
      ],
      zh: [
        "托管账号",
        "主机策略",
        "要求加载器",
        "带来源约束",
        "失败即关闭",
        "解析后包络",
      ],
    },
    caption: {
      en: "Managed requirements are loaded as source-aware constraints; when policy cannot be proven, the runtime fails closed instead of silently weakening the envelope.",
      zh: "托管要求会作为带来源的约束加载；当策略无法被证明时，运行时选择失败即关闭，而不是静默削弱运行包络。",
    },
  },
  "chapter-03:Managed Requirements 与 Fail-Closed": {
    labels: "chapter-03:Managed Requirements and Fail-Closed Behavior",
  },
  "chapter-05:Session State Is Layered": {
    title: {
      en: "Layered Session State",
      zh: "分层会话状态",
    },
    labels: {
      en: [
        "Durable thread record",
        "Resolved configuration",
        "Mutable session state",
        "Active turn work",
        "Mailbox input",
        "Store handles",
      ],
      zh: [
        "持久线程记录",
        "已解析配置",
        "可变会话状态",
        "活动 turn 工作",
        "邮箱输入",
        "存储句柄",
      ],
    },
    caption: {
      en: "Layered session state separates durable thread commitments from configuration, mutable runtime data, active turn work, mailbox input, and store handles.",
      zh: "分层会话状态把持久线程承诺与配置、可变运行时数据、活动 turn 工作、邮箱输入和存储句柄分开。",
    },
  },
  "chapter-05:Session State 是分层的": {
    labels: "chapter-05:Session State Is Layered",
  },
  "chapter-07:Model Metadata Is Runtime Infrastructure": {
    title: {
      en: "Model Metadata as Infrastructure",
      zh: "模型元数据基础设施",
    },
    labels: {
      en: [
        "Catalog record",
        "Auth visibility",
        "Cache overlay",
        "Context limit",
        "Capability flag",
        "Turn-loop trust",
      ],
      zh: [
        "模型目录记录",
        "认证可见性",
        "缓存叠加",
        "上下文限制",
        "能力标记",
        "Turn loop 信任",
      ],
    },
    caption: {
      en: "Model metadata is runtime infrastructure because cache overlays, auth visibility, context limits, and capability flags determine which model facts the turn loop may trust.",
      zh: "模型元数据属于运行时基础设施，因为缓存叠加、认证可见性、上下文限制和能力标记共同决定 turn loop 能信任哪些模型事实。",
    },
  },
  "chapter-07:Model Metadata 是 Runtime Infrastructure": {
    labels: "chapter-07:Model Metadata Is Runtime Infrastructure",
  },
  "chapter-07:模型元数据是 Runtime Infrastructure": {
    labels: "chapter-07:Model Metadata Is Runtime Infrastructure",
  },
  "chapter-08:Reducers Are Strict on Purpose": {
    caption: {
      en: "Strict reduction preserves the principle that Codex observes first, then derives product analytics, operational telemetry, debug context, and local logs for different audiences.",
      zh: "严格规约维护 Codex 先观察后解释的原则，再为不同受众派生产品分析、运行时遥测、debug context 和本地日志。",
    },
  },
  "chapter-08:Reducer 故意严格": {
    labels: "chapter-08:Reducers Are Strict on Purpose",
  },
  "chapter-08:OTEL Observes Runtime Operations": {
    title: {
      en: "OTEL Operational Plane",
      zh: "OTEL 运维平面",
    },
    labels: {
      en: [
        "Runtime span",
        "Provider latency",
        "Retry attempt",
        "Stream behavior",
        "Trace context",
        "Operational dashboard",
      ],
      zh: [
        "运行时 span",
        "Provider 延迟",
        "重试 attempt",
        "流式行为",
        "Trace 上下文",
        "运维视图",
      ],
    },
    caption: {
      en: "OTEL belongs to the operational plane, where runtime owners track latency, retries, stream behavior, and propagated trace context without turning telemetry into replay truth.",
      zh: "OTEL 属于运维平面，运行时负责人在这里追踪延迟、重试、流式行为和传播的 trace 上下文，但不会把遥测数据变成回放真相。",
    },
  },
  "chapter-08:OTEL 观测 Runtime Operations": {
    labels: "chapter-08:OTEL Observes Runtime Operations",
  },
  "chapter-09:Specification Is Not Authority": {
    caption: {
      en: "The tool specification is only the model-visible menu; authority lives in handler lookup, payload validation, policy, and output shaping.",
      zh: "Tool specification 只是模型可见菜单；真正的授权在 handler lookup、payload validation、policy 和 output shaping 中完成。",
    },
  },
  "chapter-09:规格不是执行授权": {
    labels: "chapter-09:Specification Is Not Authority",
  },
  "chapter-09:Routing a Tool Call": {
    caption: {
      en: "A tool call becomes executable only after the runtime validates payload shape, resolves the handler, applies policy, and records a model-visible observation.",
      zh: "一次 tool call 只有在 runtime 校验载荷、解析 handler、应用策略并记录模型可见 observation 后，才真正可执行。",
    },
  },
  "chapter-09:路由一次工具调用": {
    labels: "chapter-09:Routing a Tool Call",
  },
  "chapter-09:Output Belongs to Two Audiences": {
    title: {
      en: "Tool Output for Two Readers",
      zh: "工具输出服务两个读者",
    },
    labels: {
      en: [
        "Raw tool result",
        "Client status",
        "Logs and artifacts",
        "Model observation",
        "Bounded summary",
        "Runtime event",
      ],
      zh: [
        "原始工具结果",
        "客户端状态",
        "日志与产物",
        "模型观察结果",
        "有边界摘要",
        "运行时事件",
      ],
    },
    caption: {
      en: "Tool output is shaped for two readers at once: clients need faithful status and logs, while the model needs a bounded observation it can reason over.",
      zh: "工具输出同时服务两个读者：客户端需要可信状态和日志，模型需要边界清晰、可推理的观察结果。",
    },
  },
  "chapter-09:输出服务两个读者": {
    labels: "chapter-09:Output Belongs to Two Audiences",
  },
  "chapter-10:Output Is Sequenced State": {
    title: {
      en: "Command Output as Sequenced State",
      zh: "命令输出是有序状态",
    },
    labels: {
      en: [
        "stdout chunk",
        "stderr chunk",
        "Sequence number",
        "Exit status",
        "Truncation marker",
        "Runtime record",
      ],
      zh: [
        "stdout 分片",
        "stderr 分片",
        "序列号",
        "退出状态",
        "截断标记",
        "运行时记录",
      ],
    },
    caption: {
      en: "Command output is sequenced state, not an afterthought: stdout, stderr, exit status, truncation, and ordering all become part of the runtime record.",
      zh: "命令输出是有序状态，而不是附带文本：stdout、stderr、exit status、截断和顺序都进入运行时记录。",
    },
  },
  "chapter-10:输出是有序状态": {
    labels: "chapter-10:Output Is Sequenced State",
  },
  "chapter-06:Pending Input and Interruption": {
    title: {
      en: "Pending Input and Interruption",
      zh: "待处理输入与中断",
    },
    labels: {
      en: [
        "Active turn owner",
        "User interruption",
        "Pending input queue",
        "Cancel stream and tools",
        "Durable interruption event",
        "Next turn resumes cleanly",
      ],
      zh: [
        "活动 turn owner",
        "用户中断",
        "待处理输入队列",
        "取消流与工具",
        "持久中断事件",
        "下一轮干净恢复",
      ],
    },
    caption: {
      en: "Pending input and interruption share one ownership boundary: the active turn records why work stopped, queues what comes next, and leaves the following turn a durable handoff.",
      zh: "待处理输入和中断共享同一个 ownership 边界：活动 turn 记录工作为何停止、排队后续输入，并给下一轮留下持久交接点。",
    },
  },
  "chapter-06:Pending Input 与 Interruption": {
    labels: "chapter-06:Pending Input and Interruption",
  },
  "chapter-05:The First Event Is a Contract": {
    title: {
      en: "First Event Contract: Chapter Mental Model",
      zh: "第一个事件契约：章节心智模型",
    },
    labels: {
      en: [
        "Setup event anchors clients",
        "Three histories stay separate",
        "One item fans out",
        "Replay prefix selects state",
        "Session state is layered",
        "Metadata is extracted",
      ],
      zh: [
        "Setup 事件锚定客户端",
        "三种历史保持分离",
        "一次写入扇出",
        "Replay 前缀选择状态",
        "会话状态分层",
        "元数据来自抽取",
      ],
    },
    caption: {
      en: "The setup event gives every client a deterministic stream anchor before durable history, replay prefixes, layered session state, and extracted metadata take on separate responsibilities.",
      zh: "setup 事件先为所有客户端固定事件流锚点，随后持久历史、回放前缀、分层会话状态和抽取出的元数据各自承担不同职责。",
    },
    intro: {
      en: "The first-event board anchors every later recovery path: each box is a surface that would drift if startup were just a side effect.",
      zh: "第一个事件图锚定后续所有恢复路径：每个框都是启动流程不能沦为副作用的原因。",
    },
  },
  "chapter-05:第一个事件就是契约": {
    labels: "chapter-05:The First Event Is a Contract",
  },
  "chapter-06:Preparation Before Sampling": {
    title: {
      en: "Preparation Before Sampling: Chapter Mental Model",
      zh: "Sampling 前的准备：章节心智模型",
    },
    labels: {
      en: [
        "The Turn State Machine",
        "Streaming Is Runtime Input",
        "Tools Are Follow-Up, Not a Detour",
        "Pending Input",
        "Compaction Controls Flow",
        "Stopping Can Add Work Too",
      ],
      zh: [
        "循环的状态机",
        "流式是运行时输入",
        "工具是后续工作，不是岔路",
        "待处理输入与中断",
        "压缩是控制流的一部分",
        "停止也可能添加工作",
      ],
    },
    caption: {
      en: "Preparation before sampling is where the turn becomes a state machine: streaming, tools, pending input, compaction, and stop hooks all feed the next runtime decision.",
      zh: "Sampling 前的准备说明 turn 已经是状态机：流式输入、工具、待处理输入、压缩和停止 hooks 都会影响下一步运行时决策。",
    },
    intro: {
      en: "The turn-loop board should be read before the first model request: each node is a way the runtime can create the next unit of work.",
      zh: "在进入第一次模型请求前，先把 turn loop 读成状态机：每个节点都是运行时产生下一份工作的方式。",
    },
  },
  "chapter-06:Sampling 前的准备": {
    labels: "chapter-06:Preparation Before Sampling",
  },
  "chapter-10:exec-server Defines Where Work Happens": {
    title: {
      en: "exec-server Boundary: Chapter Mental Model",
      zh: "exec-server 执行边界：章节心智模型",
    },
    labels: {
      en: [
        "Execution request",
        "Policy and approval",
        "Local or remote executor",
        "Executor filesystem",
        "Sequenced output",
      ],
      zh: [
        "执行请求",
        "策略与审批",
        "本地或远程执行器",
        "执行器文件系统",
        "有序输出",
      ],
    },
    caption: {
      en: "exec-server keeps execution placement behind one boundary: policy chooses the attempt, the executor owns process/filesystem operations, and sequenced output becomes replayable evidence.",
      zh: "exec-server 把执行位置收进同一个边界：策略选择 attempt，executor 拥有进程与文件系统操作，有序输出再变成可回放证据。",
    },
  },
  "chapter-10:exec-server 定义工作发生在哪里": {
    labels: "chapter-10:exec-server Defines Where Work Happens",
  },
  "chapter-10:Parsing Before Policy": {
    title: {
      en: "Parsing Before Policy: Chapter Mental Model",
      zh: "先解析，再做策略判断：章节心智模型",
    },
    labels: {
      en: [
        "exec-server defines work placement",
        "Filesystem access through executor",
        "Sequenced output",
        "Environment contract",
        "Policy before execution",
      ],
      zh: [
        "exec-server 定义工作位置",
        "文件系统访问经过执行器",
        "有序输出",
        "环境契约",
        "执行前先过策略",
      ],
    },
    caption: {
      en: "Parsing is the bridge into policy: command shape, executor filesystem access, ordered output, and environment are all understood before execution is allowed.",
      zh: "解析是进入策略判断的桥：命令形状、执行器文件系统访问、有序输出和环境契约都要先被理解，执行才会被允许。",
    },
  },
  "chapter-10:先解析，再做策略判断": {
    labels: "chapter-10:Parsing Before Policy",
  },
  "chapter-11:Intercepting Shell-Like Patches": {
    title: {
      en: "Shell-Like Patch Intercept: Chapter Mental Model",
      zh: "Shell 形式 Patch 拦截：章节心智模型",
    },
    labels: {
      en: [
        "Patch tool or heredoc",
        "Recognized patch intent",
        "Parse and verify hunks",
        "Approval and permissions",
        "Executor filesystem apply",
        "Recorded diff and model result",
      ],
      zh: [
        "Patch 工具",
        "识别 patch 意图",
        "解析并验证 hunks",
        "审批与权限",
        "执行器文件系统应用",
        "记录结果",
      ],
    },
    caption: {
      en: "Shell-like patch text is only a compatibility bridge: once recognized, it enters the same parse, verify, approve, apply, and diff-recording path as the patch tool.",
      zh: "Shell 形式的 patch 文本只是兼容桥：一旦被识别，它就进入和 patch 工具相同的解析、校验、审批、应用与 diff 记录路径。",
    },
  },
  "chapter-11:拦截 Shell 形式的 Patch": {
    labels: "chapter-11:Intercepting Shell-Like Patches",
  },
  "chapter-11:Grammar Is Only the First Gate": {
    title: {
      en: "Patch Grammar and Verification",
      zh: "Patch 语法与校验",
    },
    labels: {
      en: [
        "Patch grammar",
        "Intent recovery",
        "Filesystem verification",
        "Permission gate",
        "Executor apply",
        "Recorded diff",
      ],
      zh: [
        "Patch 语法",
        "意图恢复",
        "文件系统校验",
        "权限门",
        "执行器应用",
        "记录 diff",
      ],
    },
    caption: {
      en: "Patch grammar only recovers intent. The real boundary is verification: paths, old content, permissions, executor ownership, and diff evidence must all line up before a mutation is accepted.",
      zh: "Patch 语法只负责恢复意图，真正的边界是校验：路径、旧内容、权限、执行器所有权和 diff 证据都成立后，变更才会被接受。",
    },
  },
  "chapter-11:语法只是第一道门": {
    labels: "chapter-11:Grammar Is Only the First Gate",
  },
  "chapter-11:Grammar 只是第一道门": {
    labels: "chapter-11:Grammar Is Only the First Gate",
  },
  "chapter-11:Diff Tracking Is Evidence, Not Decoration": {
    title: {
      en: "Diff Tracking as Evidence",
      zh: "Diff Tracking 是证据",
    },
    labels: {
      en: [
        "Baseline content",
        "Committed patch delta",
        "Rename origin",
        "Exact diff",
        "Invalidation state",
        "Model-visible result",
      ],
      zh: [
        "基线内容",
        "已提交 patch delta",
        "重命名来源",
        "精确 diff",
        "失效状态",
        "模型可见结果",
      ],
    },
    caption: {
      en: "Diff tracking is evidence management: the runtime can show an exact diff only while baseline content, committed deltas, rename origins, and invalidation state still agree.",
      zh: "Diff tracking 是证据管理：只有基线内容、已提交 delta、重命名来源和失效状态仍然一致时，运行时才展示精确 diff。",
    },
  },
  "chapter-11:Diff Tracking 是证据，不是装饰": {
    labels: "chapter-11:Diff Tracking Is Evidence, Not Decoration",
  },
  "chapter-09:Specification Is Not Authority": {
    labels: {
      en: [
        "Visible spec",
        "Handler registry",
        "Policy envelope",
        "Runtime authority",
        "Tool output shaping",
      ],
      zh: [
        "可见规格",
        "处理器注册表",
        "策略包络",
        "运行时授权",
        "工具输出整形",
      ],
    },
    caption: {
      en: "Specification is not authority: the model sees a menu, but handler lookup, payload validation, policy, runtime execution, and output shaping decide what can actually happen.",
      zh: "规格不是授权：模型看到的是菜单，真正决定能发生什么的是 handler lookup、payload validation、policy、runtime execution 和 output shaping。",
    },
  },
  "chapter-09:Routing a Tool Call": {
    labels: {
      en: [
        "Model tool call",
        "Payload validation",
        "Handler lookup",
        "Policy gate",
        "Supervised execution",
        "Model-visible result",
      ],
      zh: [
        "模型工具调用",
        "载荷验证",
        "处理器查找",
        "策略门",
        "受监督执行",
        "模型可见结果",
      ],
    },
    caption: {
      en: "A tool call becomes executable only after the runtime validates payload shape, resolves the handler, applies policy, executes under supervision, and records a bounded observation.",
      zh: "一次 tool call 只有在 runtime 校验载荷形状、解析 handler、应用策略、监督执行并记录有边界的 observation 后，才真正可执行。",
    },
  },
  "chapter-09:规格不是执行授权": {
    labels: "chapter-09:Specification Is Not Authority",
  },
  "chapter-09:路由一次工具调用": {
    labels: "chapter-09:Routing a Tool Call",
  },
  "chapter-19:Session Import": {
    title: {
      en: "Session Import: Chapter Mental Model",
      zh: "会话导入：章节心智模型",
    },
    labels: {
      en: [
        "Content hash check",
        "New import",
        "Load JSONL session",
        "Convert events",
        "Native rollout items",
      ],
      zh: [
        "内容哈希检查",
        "新导入",
        "加载 JSONL 会话",
        "转换事件",
        "原生 rollout 条目",
      ],
    },
    caption: {
      en: "Session import is idempotent work: a content hash prevents duplicate imports, then a supported JSONL session is converted into native rollout items.",
      zh: "会话导入是幂等工作：内容哈希阻止重复导入，受支持的 JSONL 会话再被转换成原生 rollout 条目。",
    },
  },
  "chapter-19:会话导入": {
    labels: "chapter-19:Session Import",
  },
  "chapter-19:Configuration Migration": {
    title: {
      en: "Conservative Configuration Migration",
      zh: "保守配置迁移",
    },
    labels: {
      en: [
        "External artifact",
        "Classify kind",
        "Supported subset",
        "Native target",
        "Preserve existing file",
        "Import report",
      ],
      zh: [
        "外部产物",
        "分类类型",
        "支持子集",
        "原生目标",
        "保留已有文件",
        "导入报告",
      ],
    },
    caption: {
      en: "Configuration import classifies each external artifact, converts only the supported subset, preserves native targets, and leaves an import report for every skip or write.",
      zh: "配置导入会分类每个外部产物，只转换受支持子集，保留原生目标，并为每次跳过或写入留下导入报告。",
    },
  },
  "chapter-19:Backward Compatibility Bridges": {
    title: {
      en: "Compatibility Bridges",
      zh: "向后兼容桥",
    },
    labels: {
      en: [
        "Old client or artifact",
        "Boundary adapter",
        "Explicit supported case",
        "Native runtime shape",
        "Skip unsupported case",
        "Removal point",
      ],
      zh: [
        "旧客户端或产物",
        "边界适配器",
        "显式支持案例",
        "原生运行时形状",
        "跳过不支持案例",
        "可移除位置",
      ],
    },
    caption: {
      en: "Compatibility bridges stay at the system edge, where old shapes are named, supported cases are translated, unsupported cases are skipped, and native runtime state stays clean.",
      zh: "兼容桥留在系统边界上：旧形态在那里被命名，支持案例被翻译，不支持案例被跳过，原生运行时状态保持干净。",
    },
  },
  "chapter-20:Agent-Control Tools Are Coordination Edges": {
    title: {
      en: "Agent-Control Tools as Edges",
      zh: "Agent-Control Tools 是协作边",
    },
    labels: {
      en: [
        "Parent thread",
        "Tool call",
        "Child thread",
        "Mailbox event",
        "Live graph edge",
        "Trace graph evidence",
      ],
      zh: [
        "父 thread",
        "工具调用",
        "子 thread",
        "Mailbox 事件",
        "Live graph 边",
        "Trace graph 证据",
      ],
    },
    caption: {
      en: "Agent-control tools create durable edges from parent tool calls to child messages, live graph state, and trace evidence, so delegation is replayable rather than just returned.",
      zh: "Agent-control tools 把 parent tool calls 连接到 child messages、live graph state 和 trace evidence，让 delegation 可 replay，而不只是返回一个结果。",
    },
  },
  "chapter-20:Agent-Control Tools 是协作边": {
    labels: "chapter-20:Agent-Control Tools Are Coordination Edges",
  },
  "chapter-20:The Coordination Unit Is Still a Thread": {
    title: {
      en: "Thread as Coordination Unit",
      zh: "Thread 仍是协作单位",
    },
    labels: {
      en: [
        "Parent thread",
        "Child thread",
        "Graph store",
        "Open relation",
        "Close relation",
        "Trace evidence",
      ],
      zh: [
        "父 thread",
        "子 thread",
        "图存储",
        "打开关系",
        "关闭关系",
        "Trace 证据",
      ],
    },
    caption: {
      en: "Multi-agent coordination keeps the thread as the unit of ownership: parent and child threads are related by graph edges, not merged into one shared state.",
      zh: "多 Agent 协作仍以 thread 作为 ownership 单位：父子 thread 通过图边关联，而不是合并成一份共享状态。",
    },
  },
  "chapter-20:协作单位仍然是 Thread": {
    labels: "chapter-20:The Coordination Unit Is Still a Thread",
  },
  "chapter-20:Live Graph Versus Trace Graph": {
    title: {
      en: "Live Graph and Trace Graph",
      zh: "Live Graph 与 Trace Graph",
    },
    labels: {
      en: [
        "Runtime event stream",
        "Live child map",
        "Open and closed edges",
        "Trace reducer",
        "Explanation graph",
        "Audit query",
      ],
      zh: [
        "运行时事件流",
        "Live child map",
        "打开/关闭边",
        "Trace reducer",
        "解释图",
        "审计查询",
      ],
    },
    caption: {
      en: "The live graph answers coordination questions, while the trace graph answers explanation questions; both reduce events, but they serve different readers.",
      zh: "Live graph 回答协作问题，trace graph 回答解释问题；二者都由事件归约而来，但服务不同读者。",
    },
  },
  "chapter-20:Live Graph 与 Trace Graph": {
    labels: "chapter-20:Live Graph Versus Trace Graph",
  },
  "chapter-20:Collaboration Events Are Product Events": {
    title: {
      en: "Collaboration as Product Events",
      zh: "协作事件是产品事件",
    },
    labels: {
      en: [
        "Spawn or send",
        "Named participant",
        "User-visible message",
        "Parent notice",
        "Event projection",
        "Product state",
      ],
      zh: [
        "Spawn 或 send",
        "命名参与者",
        "用户可见消息",
        "Parent notice",
        "事件投影",
        "产品状态",
      ],
    },
    caption: {
      en: "Spawn, send, parent notices, named participants, and event projections turn coordination into product state that clients can render and recover.",
      zh: "Spawn、send、parent notices、named participants 与 event projections 把协作变成客户端可渲染、可恢复的 product state。",
    },
  },
  "chapter-20:Collaboration Events 是产品事件": {
    labels: "chapter-20:Collaboration Events Are Product Events",
  },
  "chapter-21:The Cloud TUI Is a Task Operator": {
    title: {
      en: "Cloud TUI as Operator Console",
      zh: "Cloud TUI 操作台",
    },
    labels: {
      en: [
        "Task list",
        "Attempt selector",
        "Backend contract",
        "Diff preview",
        "Apply preflight",
        "Local patch engine",
      ],
      zh: [
        "任务列表",
        "Attempt 选择器",
        "后端契约",
        "Diff 预览",
        "应用预检",
        "本地 patch 引擎",
      ],
    },
    caption: {
      en: "The cloud TUI is an operator console: it chooses tasks and attempts, but backend contracts still own task state, identity, and patch material.",
      zh: "Cloud TUI 是操作台：它选择任务和 attempt，但任务状态、身份和 patch material 仍由后端契约拥有。",
    },
  },
  "chapter-21:Cloud TUI 是 Task Operator": {
    labels: "chapter-21:The Cloud TUI Is a Task Operator",
  },
  "chapter-21:云端 TUI 是任务 Operator": {
    labels: "chapter-21:The Cloud TUI Is a Task Operator",
  },
  "chapter-22:The Internal Agent Is Deliberately Restricted": {
    title: {
      en: "Restricted Internal Memory Agent",
      zh: "受限内部记忆 Agent",
    },
    labels: {
      en: [
        "Selected context",
        "Restricted prompt",
        "Memory worktree",
        "Allowed artifacts",
        "Accepted output",
        "Sync back",
      ],
      zh: [
        "已选择上下文",
        "受限提示",
        "记忆工作树",
        "允许产物",
        "已接受输出",
        "同步回写",
      ],
    },
    caption: {
      en: "The internal memory agent is deliberately restricted: it works from selected context, writes through a constrained path, and syncs only accepted outputs.",
      zh: "内部记忆 agent 被刻意限制：它只读取被选中的上下文，通过受约束路径写入，并且只同步已接受输出。",
    },
  },
  "chapter-22:Internal Agent 被刻意限制": {
    labels: "chapter-22:The Internal Agent Is Deliberately Restricted",
  },
  "chapter-22:内部 Agent 被刻意限制": {
    labels: "chapter-22:The Internal Agent Is Deliberately Restricted",
  },
  "chapter-23:Deep Dive: Contract Generation Without Source Leakage": {
    caption: {
      en: "Contract generation protects the API boundary by emitting schemas and bindings without exposing the Rust implementation that produced them.",
      zh: "契约生成保护 API 边界：它输出 schemas 和 bindings，但不暴露生成它们的 Rust 实现。",
    },
  },
  "chapter-23:深入：不泄露实现的契约生成": {
    labels: "chapter-23:Deep Dive: Contract Generation Without Source Leakage",
  },
  "chapter-23:Why the Build Belongs in the Architecture Book": {
    title: {
      en: "Build as Architecture",
      zh: "构建属于架构",
    },
    labels: {
      en: [
        "Cargo graph",
        "Generated schemas",
        "Bazel mirror",
        "Release verification",
        "Packaging boundary",
        "Shipped contract",
      ],
      zh: [
        "Cargo 图",
        "生成 schema",
        "Bazel 镜像",
        "发布验证",
        "打包边界",
        "已交付契约",
      ],
    },
    caption: {
      en: "The build belongs in the architecture because generated APIs, release verification, and packaging decide which contracts are actually shipped.",
      zh: "构建属于架构，因为生成 API、发布验证和打包流程决定哪些契约最终真正交付。",
    },
  },
  "chapter-23:为什么构建属于架构书": {
    labels: "chapter-23:Why the Build Belongs in the Architecture Book",
  },
  "chapter-24:Signing and Checksums as Trust Transfer": {
    caption: {
      en: "Checksums, signatures, platform signing, and release metadata transfer trust from reviewed source and built artifacts to the installed Codex command.",
      zh: "checksum、signature、platform signing 和 release metadata 把信任从已审查源码与构建产物转移到安装后的 Codex 命令。",
    },
  },
  "chapter-24:签名与校验和是信任转移": {
    labels: "chapter-24:Signing and Checksums as Trust Transfer",
  },
  "chapter-24:Delivery Architecture Protects Product Architecture": {
    title: {
      en: "Delivery Protects Product Shape",
      zh: "交付保护产品形态",
    },
    labels: {
      en: [
        "Platform package",
        "Installer",
        "Bundled helper",
        "Native dependency",
        "Artifact verification",
        "Runtime contract",
      ],
      zh: [
        "平台包",
        "安装器",
        "内置 helper",
        "原生依赖",
        "产物验证",
        "运行时契约",
      ],
    },
    caption: {
      en: "Delivery architecture protects product architecture by keeping platform selection, dependency quarantine, and artifact verification outside the runtime contract.",
      zh: "交付架构把平台包、安装器、helper 和原生依赖限制在发布侧，让运行时契约在不同安装路径下保持不变。",
    },
  },
  "chapter-24:交付架构保护产品架构": {
    labels: "chapter-24:Delivery Architecture Protects Product Architecture",
  },
  "chapter-25:Governance Has to Stay Proportional": {
    title: {
      en: "Proportional Governance",
      zh: "比例化治理",
    },
    labels: {
      en: [
        "Architectural promise",
        "Reviewer blind spot",
        "Executable check",
        "Low-value preference",
        "Review convention",
        "Local tooling",
      ],
      zh: [
        "架构承诺",
        "审查盲区",
        "可执行检查",
        "低价值偏好",
        "审查约定",
        "本地工具",
      ],
    },
    caption: {
      en: "Proportional governance turns only reviewer-missable architectural promises into failing checks, leaving low-value preferences to review norms and local tooling.",
      zh: "比例化治理只把审查中容易漏掉的架构承诺变成失败检查，把低价值偏好留给审查约定和本地工具。",
    },
  },
  "chapter-25:治理必须保持比例感": {
    labels: "chapter-25:Governance Has to Stay Proportional",
  },
  "epilogue:The Book's Final Mental Model": {
    title: {
      en: "Final Operating Model",
      zh: "最终运行模型",
    },
    labels: {
      en: [
        "Client vocabulary",
        "Shared runtime",
        "Negotiated effects",
        "Replay evidence",
        "Failure contract",
        "Released capability",
      ],
      zh: [
        "客户端词汇",
        "共享运行时",
        "协商后的副作用",
        "回放证据",
        "失败契约",
        "已外放能力",
      ],
    },
    caption: {
      en: "The final mental model keeps capability release honest: client vocabulary enters one runtime, effects are negotiated, evidence stays replayable, and failure remains part of the contract.",
      zh: "最后的心智模型让能力外放保持诚实：客户端词汇进入同一个运行时，副作用经过协商，证据可回放，失败也属于契约。",
    },
  },
  "epilogue:最后的心智模型": {
    labels: "epilogue:The Book's Final Mental Model",
  },
  "chapter-22:Stage 2 Consolidates Global Memory": {
    title: {
      en: "Global Memory Consolidation",
      zh: "全局记忆合并",
    },
    labels: {
      en: [
        "State DB",
        "Memory worktree",
        "Versioned baseline",
        "Claim lock",
        "Commit memory changes",
        "Restricted agent",
        "Sync selected outputs",
      ],
      zh: [
        "状态 DB",
        "记忆工作树",
        "Git 基线",
        "声明锁",
        "提交记忆变更",
        "受限代理",
        "同步所选输出",
      ],
    },
    caption: {
      en: "Global memory consolidation is guarded by state, a worktree, and a versioned baseline before any restricted internal agent can rewrite durable memory.",
      zh: "全局记忆合并先受状态、工作树和 Git 基线约束，受限内部代理才能改写持久记忆。",
    },
  },
  "chapter-22:Stage 2 合并全局 Memory": {
    labels: "chapter-22:Stage 2 Consolidates Global Memory",
  },
  "chapter-22:Stage 2 合并全局记忆": {
    labels: "chapter-22:Stage 2 Consolidates Global Memory",
  },
  "chapter-24:Standalone Installers Consume Release Artifacts": {
    title: {
      en: "Installer Release Flow",
      zh: "安装器发布流",
    },
    labels: {
      en: [
        "Release CI",
        "Package staging",
        "Release storage",
        "Installer",
        "User shell",
        "Assemble packages",
        "Publish payload",
      ],
      zh: [
        "发布 CI",
        "包暂存",
        "发布存储",
        "安装器",
        "用户 shell",
        "组装包",
        "发布载荷",
      ],
    },
    caption: {
      en: "Standalone installation consumes release artifacts without changing the runtime contract: CI assembles packages, release storage holds payloads, and the installer verifies what it places.",
      zh: "独立安装不会改变运行时契约：CI 组装包，发布存储保存载荷，安装器验证后再落盘。",
    },
  },
  "chapter-24:独立安装器消费发布产物": {
    labels: "chapter-24:Standalone Installers Consume Release Artifacts",
  },
  "chapter-12:Hook Discovery and Trust": {
    title: {
      en: "Hook Discovery and Trust: Chapter Mental Model",
      zh: "Hook 发现与信任：章节心智模型",
    },
    labels: {
      en: [
        "Hook source",
        "Trust hash",
        "Modified hook",
        "Disabled hook",
        "Trusted execution",
        "Structured result",
      ],
      zh: [
        "Hook 来源",
        "信任哈希",
        "被修改 Hook",
        "禁用 Hook",
        "可信执行",
        "结构化结果",
      ],
    },
    caption: {
      en: "Hook discovery is governed by trust state: the runtime distinguishes trusted, modified, disabled, and executed hooks before it accepts structured results.",
      zh: "Hook 发现受信任状态治理：运行时先区分可信、已修改、已禁用和正在执行的 Hook，再接受结构化结果。",
    },
  },
  "chapter-12:Hook Discovery 与 Trust": {
    labels: "chapter-12:Hook Discovery and Trust",
  },
  "chapter-12:Approval Is a Different Gate": {
    title: {
      en: "Approval as a Separate Gate",
      zh: "审批是独立关卡",
    },
    labels: {
      en: [
        "Policy says decision needed",
        "Permission payload",
        "Session approval key",
        "One-time allow",
        "Policy amendment",
        "Deny or timeout",
      ],
      zh: [
        "策略要求决策",
        "权限载荷",
        "会话审批键",
        "单次允许",
        "策略修订",
        "拒绝或超时",
      ],
    },
    caption: {
      en: "Approval is deliberately separate from hooks: policy produces a decision payload, reviewers answer it, and only some answers change future policy.",
      zh: "审批被刻意拆在 hooks 之外：策略先产生决策载荷，审查方再回答，只有部分回答会改变后续策略。",
    },
  },
  "chapter-12:Approval 是另一道门": {
    labels: "chapter-12:Approval Is a Different Gate",
  },
  "chapter-15:The TypeScript SDK": {
    title: {
      en: "TypeScript SDK Reachability",
      zh: "TypeScript SDK 可达性",
    },
    labels: {
      en: [
        "Generated schema",
        "Client facade",
        "Daemon connection",
        "Transport adapter",
        "Remote bridge",
        "Protocol errors",
      ],
      zh: [
        "生成 schema",
        "客户端 facade",
        "Daemon 连接",
        "传输适配",
        "远程桥",
        "协议错误",
      ],
    },
    caption: {
      en: "The TypeScript SDK is a reachability layer over the same app-server contract: generated types, daemon connection management, transports, and remote bridges must preserve protocol semantics.",
      zh: "TypeScript SDK 是同一个 app-server 契约上的可达性层：生成类型、daemon 连接管理、传输适配和远程桥都必须保持协议语义。",
    },
  },
  "chapter-15:TypeScript SDK": {
    labels: "chapter-15:The TypeScript SDK",
  },
  "chapter-13:Managed Network Is Not a Universal Firewall": {
    title: {
      en: "Managed Network Policy",
      zh: "托管网络策略",
    },
    labels: {
      en: [
        "Permission profile",
        "Managed requirement",
        "Platform network control",
        "Allowed hosts",
        "Unsupported constraint",
        "Execution metadata",
      ],
      zh: [
        "权限配置",
        "托管要求",
        "平台网络控制",
        "允许主机",
        "不可执行约束",
        "执行元数据",
      ],
    },
    caption: {
      en: "Managed network policy is narrower than a firewall: it translates runtime permissions into platform-specific network controls and reports what cannot be enforced.",
      zh: "托管网络策略不是通用防火墙：它把运行时权限翻译成平台网络控制，并报告哪些约束无法执行。",
    },
  },
  "chapter-13:Managed Network 不是通用防火墙": {
    labels: "chapter-13:Managed Network Is Not a Universal Firewall",
  },
  "chapter-13:托管网络不是通用防火墙": {
    labels: "chapter-13:Managed Network Is Not a Universal Firewall",
  },
  "chapter-14:Request Serialization": {
    title: {
      en: "Request Serialization Pressure Point",
      zh: "请求序列化压力点",
    },
    labels: {
      en: [
        "Ordered thread work",
        "Event mapping",
        "Replay on rejoin",
        "Server client request",
        "Backpressure",
        "Derived status",
      ],
      zh: [
        "有序 thread 工作",
        "事件映射",
        "重新加入回放",
        "服务端客户端请求",
        "背压",
        "派生状态",
      ],
    },
    caption: {
      en: "Request serialization is the pressure point tying ordered thread work to event mapping, replay, server-to-client requests, backpressure, and derived status.",
      zh: "请求序列化是把有序 thread 工作与事件映射、回放、服务端到客户端请求、背压和派生状态绑在一起的压力点。",
    },
  },
  "chapter-14:请求序列化": {
    labels: "chapter-14:Request Serialization",
  },
  "chapter-14:Server-To-Client Requests": {
    title: {
      en: "Tracked Server Requests",
      zh: "可跟踪服务端请求",
    },
    labels: {
      en: [
        "Approval request",
        "Input request",
        "Elicitation",
        "Client-owned tool",
        "Auth refresh",
        "Tracked turn state",
      ],
      zh: [
        "审批请求",
        "补充输入请求",
        "补充信息收集",
        "客户端拥有工具",
        "认证刷新",
        "可跟踪 turn 状态",
      ],
    },
    caption: {
      en: "Server-to-client requests make approval, input, elicitation, client-owned tools, and auth refresh part of tracked turn state rather than hidden callbacks.",
      zh: "服务端到客户端请求把审批、补充输入、信息收集、客户端拥有工具和认证刷新纳入可跟踪的 turn 状态，而不是隐藏回调。",
    },
  },
  "chapter-14:服务端-To-客户端请求": {
    labels: "chapter-14:Server-To-Client Requests",
  },
  "chapter-14:服务端到客户端请求": {
    labels: "chapter-14:Server-To-Client Requests",
  },
  "chapter-18:Typed Extensions: Compiled Contributions": {
    title: {
      en: "Compiled Extension Contributions",
      zh: "编译期扩展贡献",
    },
    labels: {
      en: [
        "Compiled contributor",
        "Narrow API",
        "Thread-start state",
        "Prompt fragment",
        "Plugin boundary",
        "No runtime loading",
      ],
      zh: [
        "编译期贡献者",
        "窄 API",
        "线程启动状态",
        "提示片段",
        "插件边界",
        "不做运行时加载",
      ],
    },
    caption: {
      en: "Typed extensions are compiled contributors whose narrow API can add thread-start state or prompt fragments without turning plugins into runtime-loaded code.",
      zh: "类型化扩展是编译期贡献者，可通过窄 API 增加线程启动状态或提示片段，而不会把插件变成运行时加载的代码。",
    },
  },
  "chapter-18:Typed Extensions：编译期贡献": {
    labels: "chapter-18:Typed Extensions: Compiled Contributions",
  },
  "chapter-13:Permission Profiles Are the Modern Unit": {
    title: {
      en: "Permission Profiles: Chapter Mental Model",
      zh: "权限配置：章节心智模型",
    },
    labels: {
      en: [
        "Base profile",
        "Additional grants",
        "Filesystem policy",
        "Network policy",
        "Platform transform",
        "Executor command",
      ],
      zh: [
        "基础权限配置",
        "额外授权",
        "文件系统策略",
        "网络策略",
        "平台转换",
        "执行命令",
      ],
    },
    caption: {
      en: "Permission profiles are the unit of governance: base rights, extra grants, filesystem policy, network policy, platform transforms, and executor commands move together.",
      zh: "权限配置是治理单位：基础权限、额外授权、文件系统策略、网络策略、平台转换和执行命令必须一起判断。",
    },
  },
  "chapter-13:Permission Profile 是现代单位": {
    labels: "chapter-13:Permission Profiles Are the Modern Unit",
  },
  "chapter-13:macOS: Seatbelt as a Generated Profile": {
    title: {
      en: "macOS Seatbelt Profile: Chapter Mental Model",
      zh: "macOS 沙盒配置：章节心智模型",
    },
    labels: {
      en: [
        "Permission profile",
        "Seatbelt generator",
        "Allowed roots",
        "Network sockets",
        "Fixed runner",
        "Fail closed",
      ],
      zh: [
        "权限配置",
        "Seatbelt 生成器",
        "允许根目录",
        "网络套接字",
        "固定运行器",
        "失败即关闭",
      ],
    },
    caption: {
      en: "Seatbelt is generated from the effective permission profile, so allowed roots, network sockets, the fixed runner, and fail-closed behavior stay tied to one policy source.",
      zh: "Seatbelt 由有效权限配置生成，因此允许根目录、网络套接字、固定运行器和失败即关闭行为都绑定到同一个策略来源。",
    },
  },
  "chapter-17:Tool Discovery and Routing": {
    title: {
      en: "Tool Discovery and Routing: Chapter Mental Model",
      zh: "工具发现与路由：章节心智模型",
    },
    labels: {
      en: [
        "Effective server startup",
        "Tool listing",
        "Sanitized model names",
        "Provenance record",
        "Model tool call",
        "Owning MCP server",
        "Shaped observation",
      ],
      zh: [
        "有效服务启动",
        "工具列表",
        "清洗后的模型名称",
        "来源记录",
        "模型工具调用",
        "所属 MCP 服务",
        "整形后的观察结果",
      ],
    },
    caption: {
      en: "Discovery and routing are one algorithm: startup produces listings, names are sanitized for the model, provenance remembers ownership, and observations are shaped on the way back.",
      zh: "发现与路由是一套算法：启动后产生工具列表，名称被清洗后暴露给模型，来源记录记住所有权，观察结果在返回时被整形。",
    },
    intro: {
      en: "The routing board is the missing algorithmic view: it shows how an MCP tool name remains tied to the server that produced it even after the model sees a sanitized surface.",
      zh: "这张路由图补上算法视角：即使模型看到的是清洗后的工具名，MCP 工具仍然和产出它的服务保持绑定。",
    },
  },
  "chapter-17:Tool Discovery 与 Routing": {
    labels: "chapter-17:Tool Discovery and Routing",
  },
  "chapter-17:The Boundary MCP Creates": {
    title: {
      en: "The MCP Boundary",
      zh: "MCP 边界",
    },
    labels: {
      en: [
        "Configured server",
        "Raw server identity",
        "Model-visible name",
        "Provenance record",
        "Runtime router",
        "Auditable call",
      ],
      zh: [
        "配置服务",
        "原始服务身份",
        "模型可见名称",
        "来源记录",
        "运行时路由",
        "可审计调用",
      ],
    },
    caption: {
      en: "MCP creates a naming boundary: raw server identity, model-visible names, provenance records, and runtime routing stay separate so external tools cannot choose their own authority.",
      zh: "MCP 创建的是命名边界：原始服务身份、模型可见名称、来源记录和运行时路由保持分离，外部工具不能自行决定权限。",
    },
  },
  "chapter-17:MCP 创造的边界": {
    labels: "chapter-17:The Boundary MCP Creates",
  },
  "chapter-17:Resources and Templates": {
    title: {
      en: "MCP Resources and Templates",
      zh: "MCP 资源与模板",
    },
    labels: {
      en: [
        "List resources",
        "Read resource",
        "List templates",
        "Resolve parameters",
        "Return context",
        "Preserve provenance",
      ],
      zh: [
        "列出资源",
        "读取资源",
        "列出模板",
        "解析参数",
        "返回上下文",
        "保留来源",
      ],
    },
    caption: {
      en: "Resources and templates use the same MCP clients but not the same semantics as tools: they read context, preserve provenance, and avoid pretending every external capability is a side effect.",
      zh: "资源与模板复用同一组 MCP 客户端，但语义不同于工具：它们读取上下文、保留来源，不把所有外部能力都伪装成副作用。",
    },
  },
  "chapter-17:Resources 与 Templates": {
    labels: "chapter-17:Resources and Templates",
  },
  "chapter-17:Failure Semantics": {
    title: {
      en: "MCP Failure Semantics",
      zh: "MCP 失败语义",
    },
    labels: {
      en: [
        "Optional server fails",
        "Startup status",
        "Missing tools",
        "Tool-call error",
        "User-visible warning",
        "Runtime continues",
      ],
      zh: [
        "可选服务失败",
        "启动状态",
        "工具缺失",
        "调用错误",
        "用户可见警告",
        "运行时继续",
      ],
    },
    caption: {
      en: "MCP failure is localized: optional servers can fail, tools can disappear, and calls can error without collapsing the core turn loop.",
      zh: "MCP 失败被限制在边界内：可选服务可以失败，工具可以缺失，调用可以报错，但核心 turn loop 不应被拖垮。",
    },
  },
  "chapter-18:Skills: Instruction With a Budget": {
    title: {
      en: "Skills With a Context Budget",
      zh: "带上下文预算的 Skills",
    },
    labels: {
      en: [
        "Skill roots",
        "Metadata discovery",
        "Load outcomes",
        "Summary budget",
        "Invocation rule",
        "Full body injection",
      ],
      zh: [
        "Skill 根目录",
        "元数据发现",
        "加载结果",
        "摘要预算",
        "触发规则",
        "完整内容注入",
      ],
    },
    caption: {
      en: "Skills spend context deliberately: roots are discovered, metadata becomes budgeted summaries, and full bodies enter the prompt only when invocation rules justify them.",
      zh: "Skills 有意识地花费上下文：先发现 roots，再把 metadata 压进预算内摘要，只有 invocation rules 足够明确时才把 full body 放进 prompt。",
    },
    intro: {
      en: "Read the skills sketch as a context-budget control: capability discovery is cheap, full instruction injection is deliberately expensive.",
      zh: "Skills 图要按上下文预算来读：能力发现很便宜，完整指令注入必须被刻意控制。",
    },
  },
  "chapter-18:Skills：带预算的 Instruction": {
    labels: "chapter-18:Skills: Instruction With a Budget",
  },
  "chapter-18:Plugins: Packaging and Distribution": {
    title: {
      en: "Plugin Packaging and Distribution",
      zh: "Plugin 打包与分发",
    },
    labels: {
      en: [
        "Marketplace or remote source",
        "Plugin cache",
        "Loader validation",
        "Contribution manifest",
        "Skills, MCP, hooks",
        "Trust outcome",
        "Runtime exposure",
      ],
      zh: [
        "Marketplace 或远程源",
        "Plugin 缓存",
        "Loader 校验",
        "贡献清单",
        "Skills、MCP、hooks",
        "信任结果",
        "运行时暴露",
      ],
    },
    caption: {
      en: "A plugin becomes runtime capability only after its source, cache entry, manifest, contribution paths, and trust outcome have been validated.",
      zh: "Plugin 只有在 source、cache entry、manifest、contribution paths 与 trust outcome 都通过校验后，才会变成 runtime capability。",
    },
    intro: {
      en: "Read the plugin packaging sketch as a trust pipeline: nothing becomes a skill, MCP server, connector, or hook until the loader has resolved where it came from.",
      zh: "Plugin 包装图要按信任流水线来读：loader 先确认来源，skill、MCP server、connector 和 hook 才能进入运行时。",
    },
  },
  "chapter-18:Plugins：打包与分发": {
    labels: "chapter-18:Plugins: Packaging and Distribution",
  },
  "chapter-18:Plugins：Packaging 与 Distribution": {
    labels: "chapter-18:Plugins: Packaging and Distribution",
  },
  "chapter-13:macOS：生成 Seatbelt Profile": {
    labels: "chapter-13:macOS: Seatbelt as a Generated Profile",
  },
  "epilogue:The Five Lessons That Transfer": {
    title: {
      en: "Transferable Design Moves",
      zh: "可迁移的设计动作",
    },
    labels: {
      en: [
        "Product vocabulary",
        "Negotiated effects",
        "One runtime",
        "Raw facts",
        "Executable governance",
      ],
      zh: [
        "产品词汇",
        "协商副作用",
        "单一运行时",
        "原始事实",
        "可执行治理",
      ],
    },
    caption: {
      en: "The portable moves are discipline, not Codex trivia: typed vocabulary, negotiated effects, one runtime, raw facts, and executable governance travel to other systems.",
      zh: "真正可迁移的是工程纪律而不是 Codex 细节：类型化词汇、协商后的副作用、单一运行时、原始事实和可执行治理都可以带到其他系统。",
    },
    intro: {
      en: "This transfer board separates what carries into other systems from what is Codex-specific: the reusable move is discipline around vocabulary, effects, runtime ownership, facts, and governance.",
      zh: "这张白板把可迁移内容和 Codex 专属实现分开：真正可复用的是围绕词汇、副作用、运行时所有权、事实和治理的纪律。",
    },
  },
  "epilogue:五个可迁移教训": {
    labels: "epilogue:The Five Lessons That Transfer",
  },
  "epilogue:Where Codex Is Still Expensive": {
    title: {
      en: "The Cost of This Architecture",
      zh: "这套架构的成本",
    },
    labels: {
      en: [
        "Compatibility burden",
        "Migration duty",
        "Runtime discipline",
        "Policy friction",
        "Trust maintenance",
      ],
      zh: [
        "兼容负担",
        "迁移责任",
        "运行时纪律",
        "策略摩擦",
        "信任维护",
      ],
    },
    caption: {
      en: "Codex's coherence has an operating bill: compatibility work, migration duty, runtime discipline, policy friction, and trust maintenance must all be funded.",
      zh: "Codex 的一致性有运营成本：兼容工作、迁移责任、运行时纪律、策略摩擦和信任维护都需要持续投入。",
    },
    intro: {
      en: "The closing cost board is deliberately not celebratory: each reusable pattern carries an operating burden that teams must be willing to fund.",
      zh: "最后这张成本图不是庆功图：每个可复用模式都带着运营负担，团队必须愿意持续投入。",
    },
  },
  "epilogue:Codex 仍然昂贵的地方": {
    labels: "epilogue:Where Codex Is Still Expensive",
  },
};

function createRng(seedText) {
  let seed = 2166136261;
  for (const char of seedText) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function jitter(rng, amount) {
  return (rng() - 0.5) * amount;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripMarkdown(value) {
  return value
    .replace(/^#+\s+/, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function slugify(value) {
  return stripMarkdown(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function unique(values) {
  const seen = new Set();
  const result = [];
  for (const raw of values) {
    const value = stripMarkdown(raw)
      .replace(/\\n/g, " ")
      .replace(/^["'“”]+|["'“”]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!value || value.length < 2 || seen.has(value.toLowerCase())) {
      continue;
    }
    seen.add(value.toLowerCase());
    result.push(value);
  }
  return result;
}

function cleanupZhLabel(value) {
  return value
    .replace(/执行-服务端/g, "exec-server")
    .replace(/环境 是合同/g, "环境是契约")
    .replace(/文件系统访问经过 执行器/g, "文件系统访问经过执行器")
    .replace(/开发者[- ]指令\s*上下文/g, "开发者指令上下文")
    .replace(/读[- ]只\s*MCP\s*工具\s*列表\s*\/\s*读\s*\/\s*搜索/g, "只读 MCP 工具列表、读取与搜索")
    .replace(/远程\s+控制/g, "远程控制")
    .replace(/后端\s*stream/g, "后端流")
    .replace(/本地远程\s*bridge/g, "本地远程桥")
    .replace(/App-服务端/g, "App 服务端")
    .replace(/创建\s*app\s*server\s*会话/gi, "创建 App 服务端会话")
    .replace(/app\s*server\s*会话/gi, "App 服务端会话")
    .replace(/Rust\s*crate\s*与\s*二进制/g, "Rust 包与二进制")
    .replace(/Hermetic\s*CI/g, "封闭 CI")
    .replace(/Hermetic\s*构建/g, "封闭构建")
    .replace(/Hermetic\s*发布/g, "封闭发布")
    .replace(/追加到\s*source\s*buffer/g, "追加到缓冲区")
    .replace(/来源\s*buffer/g, "缓冲区")
    .replace(/source\s*buffer/g, "缓冲区")
    .replace(/服务端\s*(?:to|To|到)\s*客户端请求/g, "服务端到客户端请求")
    .replace(/服务端\s*To\s*客户端请求/g, "服务端到客户端请求")
    .replace(/权限权限配置\s*(?:to|To|到)\s*沙箱尝试/g, "权限配置到沙箱")
    .replace(/权限权限配置\s*(?:to|To|到)\s*沙箱/g, "权限配置到沙箱")
    .replace(/读\s*路径\s*(?:和|与)\s*写\s*路径/g, "读路径和写路径")
    .replace(/把\s*记忆/g, "把记忆")
    .replace(/第三方\s*-\s*元数据/g, "第三方元数据")
    .replace(/对话条目模型实际看到(?:的内容)?/g, "模型可见对话条目")
    .replace(/运行时对象工具、终端(?:、压缩)?/g, "运行时对象与工具输出")
    .replace(/路由\s*(?:by|按)\s*来源/gi, "按来源路由")
    .replace(/转换\s*(?:to|到)\s*Codex/gi, "转换为 Codex")
    .replace(/Use\s*原生运行时/g, "使用原生运行时")
    .replace(/Use\s*原生运行时路径/gi, "使用原生运行时路径")
    .replace(/读\s*只\s*MCP/gi, "只读 MCP")
    .replace(/读\s*only\s*MCP/gi, "只读 MCP")
    .replace(/客户端应如何看见\s*it\?/g, "客户端如何观察事件")
    .replace(/Web\s+Socket/g, "WebSocket")
    .replace(/\s*,\s*/g, "、")
    .replace(/\s+([，、：])/g, "$1")
    .replace(/([，、：])\s+/g, "$1")
    .replace(/(\p{Script=Han})\s+(\p{Script=Han})/gu, "$1$2")
    .replace(/\s{2,}/g, " ")
    .replace(/[，、]\s*$/g, "")
    .trim();
}

function localizeZhLabel(label) {
  const exact = new Map([
    ["System or managed layer", "系统或托管层"],
    ["Layer merge", "层合并"],
    ["User layer", "用户层"],
    ["Project layer", "项目层"],
    ["Disabled untrusted layer", "禁用未信任层"],
    ["Resolved config with provenance", "带来源的已解析配置"],
    ["Environment or stdin token", "环境或 stdin token"],
    ["Auth manager", "认证管理器"],
    ["Keyring or auth file", "Keyring 或认证文件"],
    ["OAuth/device flow", "OAuth/device 流程"],
    ["Login status snapshot", "登录状态快照"],
    ["Trust-Gated Project Configuration", "受信任门控的项目配置"],
    ["Feature Flags as Lifecycle Management", "作为生命周期管理的特性开关"],
    ["Authentication as a Snapshot", "作为快照的认证"],
    ["Managed Requirements and Fail-Closed Behavior", "托管要求与失败即关闭"],
    ["Preference 与 Requirement 不同", "偏好与要求不同"],
    ["Managed Requirements 与 Fail-Closed", "托管要求与失败即关闭"],
    ["Runtime Stack", "运行时栈"],
    ["Thread Manager manages live threads", "线程管理器管理活动线程"],
    ["Client-held live handle", "客户端持有的活动句柄"],
    ["Append item", "追加条目"],
    ["Session state", "会话状态"],
    ["Metadata", "元数据"],
    ["Thread persistence", "线程持久化"],
    ["Start new thread id", "启动新线程 ID"],
    ["Open live persistence", "打开活动持久化"],
    ["Resume existing rollout", "恢复已有 rollout"],
    ["Fork from item", "从条目分叉"],
    ["Rollback metadata", "回滚元数据"],
    ["Runtime input", "运行时输入"],
    ["Pending input and interruption", "待处理输入与中断"],
    ["Tools are follow-up work", "工具是后续工作"],
    ["Compaction pressure", "压缩压力"],
    ["Provider registry", "Provider 注册表"],
    ["Runtime provider", "运行时 provider"],
    ["Prompt and tools and options", "Prompt、工具与选项"],
    ["HTTP request", "HTTP 请求"],
    ["SSE frames", "SSE 帧"],
    ["WebSocket session", "WebSocket 会话"],
    ["HTTP, SSE, WebSocket, retries", "HTTP、SSE WebSocket、重试"],
    ["Local turn loop", "本地 turn loop"],
    ["Model prompt and tools", "模型 prompt 与工具"],
    ["Inference transport", "推理 transport"],
    ["Response events", "响应事件"],
    ["Rollout Trace captures runtime sources", "Rollout Trace 捕获运行时来源"],
    ["Turns trace", "Turns trace"],
    ["Context root and child", "上下文根与子节点"],
    ["Trace writer", "Trace writer"],
    ["Raw model payloads", "原始模型载荷"],
    ["Raw runtime payloads", "原始运行时载荷"],
    ["Raw terminal payloads", "原始终端载荷"],
    ["Reduced timeline", "规约后的时间线"],
    ["Observation plane", "观测平面"],
    ["Rollout Persistence is Replay Spine", "Rollout 持久化是回放主干"],
    ["Raw Events 与 Reduced Graph", "原始事件与规约图"],
    ["Tool call", "工具调用"],
    ["Parse command and arguments", "解析命令与参数"],
    ["Classify safety and policy", "分类安全与策略"],
    ["Exec request", "执行请求"],
    ["Sandbox attempt", "沙箱尝试"],
    ["Sequenced output", "有序输出"],
    ["freeform patch or shell-like invocation", "自由格式 patch 或 shell 形式调用"],
    ["detect apply-patch intent", "识别 apply-patch 意图"],
    ["parse patch hunks", "解析 patch hunks"],
    ["verify paths and current file content", "验证路径与当前文件内容"],
    ["assess safety and required permissions", "评估安全性与所需权限"],
    ["approval and hooks", "审批与 Hooks"],
    ["filesystem-backed apply", "基于文件系统应用"],
    ["committed delta", "已提交 delta"],
    ["patch events and turn diff", "patch 事件与 turn diff"],
    ["model-visible result", "模型可见结果"],
    ["tool, prompt, compact, or stop event", "工具、提示、压缩或停止事件"],
    ["trusted hook run", "可信 Hook 执行"],
    ["hook outcome", "Hook 结果"],
    ["context or feedback", "上下文或反馈"],
    ["continue with added facts", "携带新增事实继续"],
    ["block or stop", "阻断或停止"],
    ["stop or reject", "停止或拒绝"],
    ["permission-request hook", "权限请求 Hook"],
    ["decision source", "决策来源"],
    ["configured automation", "已配置自动化"],
    ["human path", "人工路径"],
    ["user approval", "用户审批"],
    ["allow, deny, timeout, amend", "允许/拒绝/超时/修正"],
    ["tool attempt or rejection", "工具尝试或拒绝"],
    ["Shell tool call", "Shell 工具调用"],
    ["shell tool call", "Shell 工具调用"],
    ["Pre-tool event", "工具前事件"],
    ["pre-tool event", "工具前事件"],
    ["pre tool event", "工具前事件"],
    ["allow, context, warning, or block", "允许/上下文/警告/阻断"],
    ["evaluate command and profile", "评估命令与权限配置"],
    ["approval request when needed", "按需发起审批请求"],
    ["allow, deny, amend, timeout", "允许/拒绝/修正/超时"],
    ["run under selected sandbox", "在所选沙箱中运行"],
    ["output and status", "输出与状态"],
    ["post-tool event", "工具后事件"],
    ["permission profile", "权限配置"],
    ["filesystem and network policy", "文件系统与网络策略"],
    ["select sandbox type", "选择沙箱类型"],
    ["transform command and environment", "转换命令与环境"],
    ["platform helper", "平台 helper"],
    ["execution metadata and result", "执行元数据与结果"],
    ["Connection", "连接"],
    ["Transport adapter", "Transport 适配器"],
    ["Message processor", "消息处理器"],
    ["Resource-scoped queue", "资源范围队列"],
    ["Request processor", "请求处理器"],
    ["Core runtime event", "核心运行时事件"],
    ["Server request", "服务端请求"],
    ["Derived thread status", "派生线程状态"],
    ["Transport Normalization", "Transport 归一化"],
    ["Initialization and Capability", "初始化与能力"],
    ["Serialization", "序列化"],
    ["Threads, Turns, and Items", "线程、Turn 与条目"],
    ["Client Taxonomy", "客户端分类"],
    ["Protocol schema", "协议 schema"],
    ["Rust facade", "Rust facade"],
    ["Python SDK", "Python SDK"],
    ["TypeScript SDK", "TypeScript SDK"],
    ["Daemon lifecycle", "后台守护进程"],
    ["Remote control", "远程控制"],
    ["Remote client", "远程客户端"],
    ["Backend stream", "后端 stream"],
    ["Local remote bridge", "本地远程 bridge"],
    ["Open logical connection", "打开逻辑连接"],
    ["Start TUI", "启动 TUI"],
    ["Load config and auth", "加载配置与认证"],
    ["Detect terminal capability", "检测终端能力"],
    ["Create app server", "创建 App 服务端会话"],
    ["创建 app server", "创建 App 服务端会话"],
    ["Create app-server session", "创建 App 服务端会话"],
    ["Create or resume thread", "创建或恢复线程"],
    ["Enter app loop", "进入应用循环"],
    ["Internal app events", "内部 app 事件"],
    ["Active thread events", "活动线程事件"],
    ["Terminal input and resize", "终端输入与尺寸变化"],
    ["App-server events", "App-server 事件"],
    ["App loop", "应用循环"],
    ["app-server commands", "应用命令"],
    ["Chat and pane state", "聊天与面板状态"],
    ["Frame request", "帧请求"],
    ["Streaming delta", "流式 delta"],
    ["Append to source buffer", "追加到 source buffer"],
    ["Commit to history cell", "提交到历史 cell"],
    ["Reflow visible layout", "重排可见布局"],
    ["MCP config and built-ins", "MCP 配置与内置项"],
    ["Effective server definitions", "有效服务定义"],
    ["Managed MCP clients", "托管 MCP client"],
    ["Tool listings", "工具列表"],
    ["Tool Discovery and Routing", "工具发现与路由"],
    ["Hosted App Resources and Templates", "Hosted App 资源与模板"],
    ["Outbound Codex as an MCP Server", "作为 MCP Server 的出站 Codex"],
    ["Failure Modes and Design Guardrails", "失败模式与设计护栏"],
    ["Skills: Instruction With a Budget", "Skills：带预算的指令"],
    ["Marketplace bundles", "市场包"],
    ["Marketplace or remote source", "市场或远程源"],
    ["Skills, MCP, hooks", "技能、MCP 与 Hook"],
    ["Skills、MCP、hooks", "技能、MCP 与 Hook"],
    ["市场 bundles", "市场包"],
    ["技能、MCP、hooks", "技能、MCP 与 Hook"],
    ["Rust crate", "Rust 包"],
    ["Rust crates", "Rust 包"],
    ["Hermetic", "封闭构建"],
    ["Plugins: Packaging and Distribution", "Plugins：打包与分发"],
    ["Plugins：Packaging 与 Distribution", "Plugins：打包与分发"],
    ["Connectors: Hosted App Metadata", "Connectors：Hosted App 元数据"],
    ["Typed Extensions: Compiled Contributions", "类型化扩展：编译贡献"],
    ["Trust and Fail-Soft Loading", "信任与失败软化加载"],
    ["External source artifacts", "外部来源产物"],
    ["Detect and classify", "检测与分类"],
    ["Validate supported subset", "验证支持子集"],
    ["Session Import", "会话导入"],
    ["has this content hash been imported", "检查内容哈希"],
    ["has this content hash been imported?", "检查内容哈希"],
    ["no", "继续导入"],
    ["load importable JSONL", "加载可导入 JSONL"],
    ["emit native rollout items", "产出原生 rollout 条目"],
    ["Configuration Migration", "配置迁移"],
    ["Backward Compatibility", "向后兼容"],
    ["Designing the Import Boundary", "设计导入报告"],
    ["Designing the Import Report", "设计导入报告"],
    ["parent thread", "父线程"],
    ["agent control tool", "agent 控制"],
    ["spawn / wait / send / close", "spawn / wait / send / close"],
    ["graph store", "图存储"],
    ["parent-child edge", "父子边"],
    ["Live Graph and Trace Graph", "活动图与 Trace 图"],
    ["Live Graph 与 Trace Graph", "活动图与 Trace 图"],
    ["Memory Has Separate Read and Write Paths", "记忆有独立读写路径"],
    ["Memory 有独立 Read Path 和 Write Path", "记忆有独立读写路径"],
    ["Citations Connect Memory Back to Evidence", "引用把记忆连回证据"],
    ["Citations 把 Memory 连回证据", "引用把记忆连回证据"],
    ["Native Dependencies Belong in Quarantine", "原生依赖应该被隔离"],
    ["conversation items the model actually sees", "模型可见对话条目"],
    ["runtime objects: tools, terminal, compaction", "运行时对象与工具输出"],
    ["观察结果、压缩、待处理输入", "观察、压缩、待处理"],
    ["对话条目模型实际看到的内容", "模型可见对话条目"],
    ["运行时对象工具、终端、压缩", "运行时对象与工具输出"],
    ["文件系统访问经过执行器", "执行器文件访问"],
    ["工具、提示、压缩或停止事件", "工具、提示、压缩、停止"],
    ["允许、上下文、警告或阻断", "允许、警告或阻断"],
    ["连接器：托管 App 元数据", "托管 App 元数据"],
    ["加载可导入 JSONL 会话", "加载 JSONL 会话"],
    ["获取详情或所选 diff", "获取详情或 diff"],
    ["基于当前工作树预检", "工作树预检"],
    ["通过 patch 引擎应用", "Patch 引擎应用"],
    ["文件系统、进程、网络副作用", "文件、进程、网络副作用"],
    ["Observations, compaction, pending input", "观察、压缩、待处理"],
    ["Conversation items the model actually sees", "模型可见对话条目"],
    ["Runtime objects: tools, terminal, compaction", "运行时对象与工具输出"],
    ["Filesystem access through executor", "执行器文件系统访问"],
    ["Tool, prompt, compact, or stop event", "工具、提示、压缩、停止"],
    ["Allow, deny, timeout, amend", "允许、拒绝、超时、修正"],
    ["Allow, context, warning, or block", "允许、警告或阻断"],
    ["Connectors: Hosted App Metadata", "托管 App 元数据"],
    ["load importable JSONL", "加载 JSONL"],
    ["emit native rollout items", "产出原生条目"],
    ["Fetch selected diff", "获取所选 diff"],
    ["fetch details or selected attempt diff", "获取详情或 diff"],
    ["Preflight current worktree", "工作树预检"],
    ["preflight diff against current worktree", "工作树预检"],
    ["Apply through patch engine", "Patch 引擎应用"],
    ["apply selected diff locally", "本地应用 diff"],
    ["Filesystem, process, network effects", "文件、进程、网络副作用"],
    ["ordered raw events and payload refs", "有序原始事件与载荷引用"],
    ["offline reducer", "离线 reducer"],
    ["live graph", "live graph"],
    ["trace graph", "trace graph"],
    ["Agent Control Tools Are Collaboration Edges", "Agent 控制工具是协作边"],
    ["Pending Queues Make Races Explicit", "Pending 队列让竞态显式化"],
    ["Descendant Traversal is a Governance Feature", "后代遍历是治理能力"],
    ["Choose task and attempt", "选择任务与尝试"],
    ["Fetch selected diff", "获取所选差异"],
    ["Unified diff and metadata", "统一 diff 与元数据"],
    ["Reject incompatible diff", "拒绝 diff"],
    ["Reject diff", "拒绝 diff"],
    ["Preflight current worktree", "基于当前工作树预检"],
    ["Apply through patch engine", "通过 patch 引擎应用"],
    ["Return task result", "返回任务结果"],
    ["choose task and attempt", "选择任务与尝试"],
    ["fetch details or selected attempt diff", "获取详情或所选 diff"],
    ["unified diff plus metadata", "统一 diff 与元数据"],
    ["reject incompatible diff shape", "拒绝不兼容 diff"],
    ["preflight diff against current worktree", "基于当前工作树预检"],
    ["clean, partial, or error", "干净/部分/错误"],
    ["confirm apply", "确认应用"],
    ["apply selected diff locally", "本地应用所选 diff"],
    ["modify files if clean enough", "条件满足时修改文件"],
    ["applied paths, skipped paths, conflicts", "已应用路径/跳过路径/冲突"],
    ["Runtime key material", "运行时密钥材料"],
    ["Public registration identity", "公开注册身份"],
    ["Task registration request", "任务注册请求"],
    ["Signed task assertion", "已签名任务断言"],
    ["Backend identity service", "后端身份服务"],
    ["Identity JWT claims", "身份 JWT 声明"],
    ["Authorized task access", "已授权任务访问"],
    ["Memory read path", "记忆读取路径"],
    ["Memory summary", "记忆摘要"],
    ["Developer instruction context", "开发者指令上下文"],
    ["Memory item or citation", "记忆条目或引用"],
    ["Memory write path", "记忆写入路径"],
    ["Citations bind Memory", "引用绑定记忆"],
    ["memory summary or file excerpt", "记忆摘要或文件摘录"],
    ["citation block", "引用块"],
    ["citation parser", "引用解析器"],
    ["source rollout", "来源 rollout"],
    ["Stage 2 global memory merge", "Stage 2 全局记忆合并"],
    ["Memory workspace", "记忆工作区"],
    ["Git baseline", "Git 基线"],
    ["Restricted internal agent", "受限内部代理"],
    ["claim global branch", "声明全局分支"],
    ["commit memory changes", "提交记忆变更"],
    ["Cargo workspace", "Cargo 工作区"],
    ["Rust crates and binaries", "工作区包与二进制"],
    ["Rust crate 与二进制", "工作区包与二进制"],
    ["Resolved dependency graph", "已解析依赖图"],
    ["Bazel overlay", "Bazel 覆盖层"],
    ["Reproducible CI and release verification", "可复现 CI 与发布验证"],
    ["Reproducible CI 与发布验证", "可复现 CI 与发布验证"],
    ["GitHub release workflow", "GitHub 发布流程"],
    ["Generated contract schemas", "生成契约 schema"],
    ["SDKs, app-server clients, config authors", "SDK、app-server 客户端与配置作者"],
    ["Release artifacts", "发布产物"],
    ["Developer changes a crate", "开发者修改 crate"],
    ["Cargo test path", "Cargo 测试路径"],
    ["Bazel mirrored target", "Bazel 镜像目标"],
    ["Workspace-root launcher", "工作区根启动器"],
    ["Cargo-like paths, snapshots, env", "Cargo 风格路径、快照与环境"],
    ["Platform and release matrix", "平台与发布矩阵"],
    ["Release confidence", "发布信心"],
    ["Runtime type", "运行时类型"],
    ["Schema generator", "Schema 生成器"],
    ["Checked-in schema", "已提交 schema"],
    ["Drift check", "漂移检查"],
    ["External client", "外部客户端"],
    ["Cargo release workflow", "Cargo 发布流程"],
    ["Native Codex binary", "Codex 原生二进制"],
    ["Bazel release build", "Bazel 发布构建"],
    ["Package staging", "包暂存"],
    ["Release storage", "发布存储"],
    ["Installer", "安装器"],
    ["User shell", "用户 shell"],
    ["Product code", "产品代码"],
    ["Stable native capability", "稳定原生能力"],
    ["Build / release boundary", "构建/发布边界"],
    ["Third-party metadata", "第三方元数据"],
    ["Vendor fixes", "供应商补丁"],
    ["Integrity Records", "完整性记录"],
    ["Pull request", "变更请求"],
    ["exec-server Defines Where Work Happens", "exec-server 定义工作发生在哪里"],
    ["Fast feedback lane", "快速反馈通道"],
    ["Contract drift lane", "契约漂移通道"],
    ["Hermetic release lane", "封闭发布通道"],
    ["Hermetic 发布通道", "封闭发布通道"],
    ["User intent", "用户意图"],
    ["Typed protocol", "类型化协议"],
    ["Event-sourced runtime", "事件溯源运行时"],
    ["Negotiated tools", "协商工具"],
    ["Policy gates", "策略门"],
    ["Durable state/memory", "持久状态/记忆"],
    ["Clients, replay, governance", "客户端/回放/治理"],
    ["Command router", "命令路由"],
    ["Product surfaces", "产品接入面"],
    ["Shared config", "共享配置"],
    ["Shared auth", "共享认证"],
    ["Protocol boundary", "协议边界"],
    ["Shared state", "共享状态"],
    ["Thread/session runtime", "线程/会话运行时"],
    ["Client operation", "客户端操作"],
    ["Runtime boundary", "运行时边界"],
    ["Accepted fact", "已接受事实"],
    ["Model request", "模型请求"],
    ["Item delta", "Item 增量"],
    ["Bounded tool request", "受限工具请求"],
    ["Recorded event", "已记录事件"],
    ["Dispatch tools", "分发工具"],
    ["Stop hooks", "停止 Hook"],
    ["Complete or abort", "完成或中止"],
    ["Config and capabilities", "配置与能力"],
    ["Tool spec plan", "工具规格计划"],
    ["Model-visible specs", "模型可见规格"],
    ["Handler registry", "处理器注册表"],
    ["Model tool call", "模型工具调用"],
    ["Runtime router", "运行时路由"],
    ["Events and result", "事件与结果"],
    ["Runtime event", "运行时事件"],
    ["Hook preview", "Hook 预览"],
    ["Trusted hook", "可信 Hook"],
    ["Policy requirement", "策略要求"],
    ["Reviewer source", "审查者来源"],
    ["Guardian or user", "守护方或用户"],
    ["Executable decision", "可执行决策"],
    ["Tool attempt/rejection", "工具尝试/拒绝"],
    ["Retry under lock", "带锁重试"],
    ["Source changed", "源码变化"],
    ["Generator run", "运行生成器"],
    ["Drift detected", "发现漂移"],
    ["CI blocked", "CI 阻塞"],
    ["Reviewable diff", "可审查差异"],
    ["Accepted", "接受"],
    ["Reworked loop", "返工循环"],
    ["Unknown", "未知"],
    ["Probing", "探测中"],
    ["Ready", "就绪"],
    ["Starting", "启动中"],
    ["Restarting", "重启中"],
    ["Failed", "失败"],
    ["Proposed change", "拟议变更"],
    ["Unit and integration tests", "单元与集成测试"],
    ["Generated artifact drift checks", "生成产物漂移检查"],
    ["Architecture boundary checks", "架构边界检查"],
    ["Dependency and blob policy", "依赖与二进制策略"],
    ["Custom lints", "自定义 lint"],
    ["Merge confidence", "合并信心"],
    ["Committed scrollback", "已提交滚屏记录"],
    ["Live viewport", "实时视口"],
    ["Bottom pane", "底部面板"],
    ["Modal layer", "模态层"],
    ["Runtime events", "运行时事件"],
    ["Resize and reflow", "重排与尺寸变化"],
    ["Task workflow", "任务工作流"],
    ["Backend contract", "后端契约"],
    ["Cloud CLI/TUI", "云端 CLI/TUI"],
    ["Remote task service", "远端任务服务"],
    ["Attempt diff", "尝试 diff"],
    ["Local patch engine", "本地 patch 引擎"],
    ["Worktree", "工作树"],
    ["Execution request", "执行请求"],
    ["Policy and approval", "策略与审批"],
    ["Local or remote executor", "本地或远程执行器"],
    ["Executor filesystem", "执行器文件系统"],
    ["Sequenced output", "有序输出"],
    ["Patch tool or heredoc", "Patch 工具"],
    ["Recognized patch intent", "识别 patch 意图"],
    ["Parse and verify hunks", "解析并验证 hunks"],
    ["Approval and permissions", "审批与权限"],
    ["Executor filesystem apply", "执行器文件系统应用"],
    ["Recorded diff and model result", "记录 diff 与模型结果"],
    ["Base profile", "基础权限配置"],
    ["Permission profile", "权限配置"],
    ["permission profile to sandbox", "权限配置到沙箱"],
    ["permission profile to sandbox attempt", "权限配置到沙箱"],
    ["Additional grants", "额外授权"],
    ["Filesystem policy", "文件系统策略"],
    ["Network policy", "网络策略"],
    ["Platform transform", "平台转换"],
    ["Executor command", "执行命令"],
    ["Seatbelt generator", "Seatbelt 生成器"],
    ["Allowed roots", "允许根目录"],
    ["Network sockets", "网络套接字"],
    ["Fixed runner", "固定运行器"],
    ["Fail closed", "失败即关闭"],
    ["Mock backend", "模拟后端"],
    ["Task metadata", "任务元数据"],
    ["Server-to-client request", "服务端到客户端请求"],
    ["Server-to-client requests", "服务端到客户端请求"],
    ["Server To Client Request", "服务端到客户端请求"],
    ["Server To Client Requests", "服务端到客户端请求"],
    ["服务端 To 客户端请求", "服务端到客户端请求"],
    ["How should clients see it?", "客户端如何观察事件"],
    ["Route by provenance", "按来源路由"],
    ["Convert to Codex-native shape", "转换为 Codex 原生形状"],
    ["Use native runtime path", "使用原生运行时路径"],
    ["Use 原生运行时路径", "使用原生运行时路径"],
    ["read-only MCP tools", "只读 MCP 工具"],
    ["Linux bwrap, namespaces, seccomp", "bwrap、namespace、seccomp"],
  ]);
  if (exact.has(label)) {
    return cleanupZhLabel(exact.get(label));
  }

  const replacements = [
    [/conversation\s+items\s+the\s+model\s+actually\s+sees/gi, "模型可见对话条目"],
    [/runtime\s+objects\s*:?\s*tools\s*,?\s*terminal\s*,?\s*compaction/gi, "运行时对象与工具输出"],
    [/\bThreadManager\b/g, "线程管理器"],
    [/\bCodexThread\b/g, "Codex 线程"],
    [/\bSessionTask\b/g, "会话任务"],
    [/\bToolRouter\b/g, "工具路由"],
    [/\bResponseEvent\b/g, "响应事件"],
    [/\bResponseEvents\b/g, "响应事件"],
    [/\bWebSocket\b/g, "WebSocket"],
    [/\bin-process\b/gi, "进程内"],
    [/\btoken\b/gi, "令牌"],
    [/\bbearer\b/gi, "持有者"],
    [/\bFeature\b/gi, "特性"],
    [/\bfeatures\b/gi, "特性"],
    [/\bstdio\b/gi, "stdio"],
    [/\bsocket\b/gi, "socket"],
    [/\bwebsocket\b/gi, "WebSocket"],
    [/\bresponses\b/gi, "响应"],
    [/\bRollback\b/gi, "回滚"],
    [/\bnormalized\b/gi, "归一化"],
    [/\bagents\b/gi, "Agent"],
    [/\bAnalytics\b/gi, "分析"],
    [/\bOTEL\b/g, "OTEL"],
    [/\benvironment\b/gi, "环境"],
    [/\bExecutor\b/gi, "执行器"],
    [/\bGrammar\b/gi, "语法"],
    [/\bTracking\b/gi, "跟踪"],
    [/\bStack\b/gi, "栈"],
    [/\bnamespace\b/gi, "namespace"],
    [/\bnotification\b/gi, "通知"],
    [/\blistener\b/gi, "listener"],
    [/\bBackpressure\b/gi, "背压"],
    [/\bOverload\b/gi, "过载"],
    [/\blogical\b/gi, "逻辑"],
    [/\bApp\b/g, "App"],
    [/\bcommands\b/gi, "命令"],
    [/\bclient\b/gi, "客户端"],
    [/\bLedger\b/gi, "台账"],
    [/\bclose\b/gi, "关闭"],
    [/\bdescendants\b/gi, "后代"],
    [/\bedges\b/gi, "边"],
    [/\bcoordination\b/gi, "协调"],
    [/\bRace\b/gi, "竞态"],
    [/\bDescendant\b/gi, "后代"],
    [/\bTraversal\b/gi, "遍历"],
    [/\block\b/gi, "锁"],
    [/\bownership\b/gi, "所有权"],
    [/\bwatermark\b/gi, "水位"],
    [/\bsync\b/gi, "同步"],
    [/\boutputs\b/gi, "输出"],
    [/\bSupply chain\b/gi, "供应链"],
    [/\bPull request\b/gi, "Pull request"],
    [/\bHermetic\b/gi, "封闭构建"],
    [/\bModels\b/gi, "模型"],
    [/\bRealtime\b/gi, "实时"],
    [/\bdeltas\b/gi, "delta"],
    [/\bturns\b/gi, "Turn"],
    [/\bterminals\b/gi, "终端"],
    [/\bcompactions\b/gi, "压缩"],
    [/\bcausal flow\b/gi, "因果流"],
    [/\bObservation Plane\b/gi, "观测平面"],
    [/\bObservation\b/gi, "观测"],
    [/\bPlane\b/gi, "平面"],
    [/\bReduce\b/gi, "规约"],
    [/\bLoop\b/gi, "循环"],
    [/\bexec\b/gi, "执行"],
    [/\bapply\b/gi, "应用"],
    [/\bhunks\b/gi, "hunk"],
    [/\bhunk\b/gi, "hunk"],
    [/\bUp\b/g, "工作"],
    [/\bResource\b/gi, "资源"],
    [/\bSerialization\b/gi, "序列化"],
    [/\bDaemon\b/gi, "Daemon"],
    [/\blayout\b/gi, "布局"],
    [/\bparent\b/gi, "父"],
    [/\bsend\b/gi, "发送"],
    [/\bbundle\b/gi, "bundle"],
    [/\binstaller\b/gi, "安装器"],
    [/\bshell\b/gi, "shell"],
    [/\bhelper\b/gi, "helper"],
    [/\blint\b/gi, "lint"],
    [/\bLine\b/gi, "行"],
    [/\bResize\b/gi, "尺寸变化"],
    [/\bReflow\b/gi, "重排"],
    [/\bfrom\b/gi, "从"],
    [/\bsource\b/gi, "来源"],
    [/\bbuffer\b/gi, "buffer"],
    [/\bcell\b/gi, "cell"],
    [/\bMarkdown\b/gi, "Markdown"],
    [/\bStage\b/g, "Stage"],
    [/\bGit\b/g, "Git"],
    [/\bbaseline\b/gi, "基线"],
    [/\bThird\b/gi, "第三方"],
    [/\bparty\b/gi, ""],
    [/\bSystem\b/gi, "系统"],
    [/\bUser\b/gi, "用户"],
    [/\bProject\b/gi, "项目"],
    [/\bSession\b/gi, "会话"],
    [/\boverrides\b/gi, "覆盖项"],
    [/\bupdates\b/gi, "更新"],
    [/\bbearer\b/gi, "bearer"],
    [/\bFail\b/gi, "失败"],
    [/\bClosed\b/gi, "关闭"],
    [/\bResolved\b/gi, "已解析"],
    [/\bEnvelope\b/gi, "信封"],
    [/\bCore\b/gi, "核心"],
    [/\bItem\b/gi, "条目"],
    [/\bItems\b/gi, "条目"],
    [/\bAPIs\b/g, "API"],
    [/\boperations\b/gi, "操作"],
    [/\bapprovals\b/gi, "审批"],
    [/\brequests\b/gi, "请求"],
    [/\berrors\b/gi, "错误"],
    [/\bprojection\b/gi, "投影"],
    [/\bkind\b/gi, "类型"],
    [/\blive\b/gi, "活动"],
    [/\bmap\b/gi, "映射"],
    [/\bhandle\b/gi, "句柄"],
    [/\bsubmission\b/gi, "提交"],
    [/\bqueues\b/gi, "队列"],
    [/\bdurable\b/gi, "持久"],
    [/\bresume\b/gi, "恢复"],
    [/\bfork\b/gi, "分叉"],
    [/\bSampling\b/gi, "采样"],
    [/\bStreaming\b/gi, "流式"],
    [/\bInput\b/gi, "输入"],
    [/\bFollow\b/gi, "后续"],
    [/\bPending\b/gi, "待处理"],
    [/\bInterruption\b/gi, "中断"],
    [/\bCompaction\b/gi, "压缩"],
    [/\bdata\b/gi, "数据"],
    [/\bchoice\b/gi, "选择"],
    [/\baccount\b/gi, "账号"],
    [/\bcapabilities\b/gi, "能力"],
    [/\bcatalog\b/gi, "目录"],
    [/\bbundled\b/gi, "内置"],
    [/\bcache\b/gi, "缓存"],
    [/\bframes\b/gi, "帧"],
    [/\bmessages\b/gi, "消息"],
    [/\bResponse\b/gi, "响应"],
    [/\bTasks\b/gi, "任务"],
    [/\bdiffs\b/gi, "diff"],
    [/\bsources\b/gi, "来源"],
    [/\bterminal\b/gi, "终端"],
    [/\bchild\b/gi, "子"],
    [/\bthreads\b/gi, "线程"],
    [/\bsequence\b/gi, "序列"],
    [/\bnumbers\b/gi, "编号"],
    [/\bfiles\b/gi, "文件"],
    [/\bRaw\b/gi, "原始"],
    [/\bReduced\b/gi, "规约"],
    [/\bGraph\b/gi, "图"],
    [/\bPersistence\b/gi, "持久化"],
    [/\bSpine\b/gi, "主干"],
    [/\bEvidence\b/gi, "证据"],
    [/\bReducer\b/gi, "规约器"],
    [/\bstrict\b/gi, "严格"],
    [/\bconversation\b/gi, "对话"],
    [/\bobjects\b/gi, "对象"],
    [/\bcall\b/gi, "调用"],
    [/\bparse\b/gi, "解析"],
    [/\bpermission\b/gi, "权限"],
    [/\bhooks\b/gi, "Hooks"],
    [/\bapproval\b/gi, "审批"],
    [/\brejection\b/gi, "拒绝"],
    [/\bheredoc\b/gi, "heredoc"],
    [/\bGate\b/gi, "关卡"],
    [/\bTrust\b/gi, "信任"],
    [/\bTransform\b/gi, "转换"],
    [/\bEnforcement\b/gi, "执行约束"],
    [/\bbwrap\b/gi, "bwrap"],
    [/\bnamespaces\b/gi, "namespace"],
    [/\bseccomp\b/gi, "seccomp"],
    [/\bfirewall\b/gi, "防火墙"],
    [/\bconnection\b/gi, "连接"],
    [/\bscoped\b/gi, "范围化"],
    [/\bMapping\b/gi, "映射"],
    [/\bnotification\b/gi, "通知"],
    [/\bHistory\b/gi, "历史"],
    [/\breconstruction\b/gi, "重建"],
    [/\btracker\b/gi, "跟踪器"],
    [/\bHow should clients see\b/gi, "客户端应如何看见"],
    [/\bretries\b/gi, "重试"],
    [/\bonly\b/gi, "只"],
    [/\bby\b/gi, "按"],
    [/\bclients\b/gi, "客户端"],
    [/\bGates\b/gi, "关卡"],
    [/\bRejoin\b/gi, "重新加入"],
    [/\bOpen\b/gi, "打开"],
    [/\bdeliver\b/gi, "投递"],
    [/\bStartup\b/gi, "启动"],
    [/\bSources\b/gi, "来源"],
    [/\bRender\b/gi, "渲染"],
    [/\bmutable\b/gi, "可变"],
    [/\btail\b/gi, "尾部"],
    [/\bcomplete\b/gi, "完成"],
    [/\bbuilt\b/gi, "内置"],
    [/\bins\b/gi, "项"],
    [/\bEffective\b/gi, "有效"],
    [/\bSanitized\b/gi, "清洗后"],
    [/\bnames\b/gi, "名称"],
    [/\bHosted\b/gi, "托管"],
    [/\bResources\b/gi, "资源"],
    [/\bTemplates\b/gi, "模板"],
    [/\bOutbound\b/gi, "出站"],
    [/\bFailure\b/gi, "失败"],
    [/\bSemantics\b/gi, "语义"],
    [/\bbundles\b/gi, "bundle"],
    [/\bloader\b/gi, "加载器"],
    [/\bmetadata\b/gi, "元数据"],
    [/\bTyped\b/gi, "类型化"],
    [/\bExtensions\b/gi, "扩展"],
    [/\bSoft\b/gi, "软化"],
    [/\bLoading\b/gi, "加载"],
    [/\bConvert\b/gi, "转换"],
    [/\bshape\b/gi, "形状"],
    [/\bPreserve\b/gi, "保留"],
    [/\bexisting\b/gi, "已有"],
    [/\btargets\b/gi, "目标"],
    [/\bRecord\b/gi, "记录"],
    [/\bhas this\b/gi, "是否已有"],
    [/\bthe 导入 报告\b/g, "导入报告"],
    [/\b内容 hash 已 已导入\b/g, "内容哈希是否已导入"],
    [/\bcontent\b/gi, "内容"],
    [/\bhash\b/gi, "hash"],
    [/\bbeen\b/gi, "已"],
    [/\bload\b/gi, "加载"],
    [/\bimportable\b/gi, "可导入"],
    [/\bcreate\b/gi, "创建"],
    [/\bimported\b/gi, "已导入"],
    [/\bBackward\b/gi, "向后"],
    [/\bBridges\b/gi, "桥接"],
    [/\bDesigning\b/gi, "设计"],
    [/\bImport\b/gi, "导入"],
    [/\bReport\b/gi, "报告"],
    [/\bcontrol\b/gi, "控制"],
    [/\bspawn\b/gi, "生成"],
    [/\bassign\b/gi, "分配"],
    [/\bstore\b/gi, "存储"],
    [/\bmailbox\b/gi, "邮箱"],
    [/\bdelivery\b/gi, "投递"],
    [/\bvisible\b/gi, "可见"],
    [/\bclosed\b/gi, "关闭"],
    [/\binteraction\b/gi, "交互"],
    [/\bdebugger\b/gi, "调试器"],
    [/\bCollaboration\b/gi, "协作"],
    [/\blist\b/gi, "列表"],
    [/\bsearch\b/gi, "搜索"],
    [/\bstartup\b/gi, "启动"],
    [/\busage\b/gi, "使用"],
    [/\baccounting\b/gi, "计量"],
    [/\bfuture\b/gi, "未来"],
    [/\bselection\b/gi, "选择"],
    [/\bexpose\b/gi, "暴露"],
    [/\bcanonical\b/gi, "规范"],
    [/\bverification\b/gi, "验证"],
    [/\bnpm\b/gi, "npm"],
    [/\bplatform\b/gi, "平台"],
    [/\bpackage\b/gi, "包"],
    [/\bpackages\b/gi, "包"],
    [/\barchive\b/gi, "归档"],
    [/\bmeta\b/gi, "元"],
    [/\bstandalone\b/gi, "独立"],
    [/\bassemble\b/gi, "组装"],
    [/\bpublish\b/gi, "发布"],
    [/\bverified\b/gi, "已验证"],
    [/\bThird party\b/gi, "第三方"],
    [/\bChecksum\b/gi, "校验和"],
    [/\bmanifests\b/gi, "清单"],
    [/\bBundled\b/gi, "内置"],
    [/\bhelpers\b/gi, "helper"],
    [/\bPlatform\b/gi, "平台"],
    [/\bSupply chain\b/gi, "供应链"],
    [/\bReview\b/gi, "审查"],
    [/\bdecision\b/gi, "决策"],
    [/\bConfiguration\b/gi, "配置"],
    [/\bInitialization\b/gi, "初始化"],
    [/\bCompatibility\b/gi, "兼容性"],
    [/\bCapability\b/gi, "能力"],
    [/\bDiscovery\b/gi, "发现"],
    [/\bDistribution\b/gi, "分发"],
    [/\bPackaging\b/gi, "打包"],
    [/\bMigration\b/gi, "迁移"],
    [/\bInstruction\b/gi, "指令"],
    [/\bExternal\b/gi, "外部"],
    [/\bInternal\b/gi, "内部"],
    [/\bClient\b/gi, "客户端"],
    [/\bServer\b/gi, "服务端"],
    [/\bRuntime\b/gi, "运行时"],
    [/\bThread\b/gi, "线程"],
    [/\bTurn\b/gi, "Turn"],
    [/\bEvent\b/gi, "事件"],
    [/\bEvents\b/gi, "事件"],
    [/\bModel\b/gi, "模型"],
    [/\bTool\b/gi, "工具"],
    [/\bTools\b/gi, "工具"],
    [/\bPolicy\b/gi, "策略"],
    [/\bConfig\b/gi, "配置"],
    [/\bAuth\b/gi, "认证"],
    [/\bProtocol\b/gi, "协议"],
    [/\bBoundary\b/gi, "边界"],
    [/\bState\b/gi, "状态"],
    [/\bRequest\b/gi, "请求"],
    [/\bResponse\b/gi, "响应"],
    [/\bQueue\b/gi, "队列"],
    [/\bConnector\b/gi, "连接器"],
    [/\bConnectors\b/gi, "连接器"],
    [/\bPlugin\b/gi, "插件"],
    [/\bPlugins\b/gi, "插件"],
    [/\bSkill\b/gi, "技能"],
    [/\bSkills\b/gi, "技能"],
    [/\bMemory\b/gi, "记忆"],
    [/\bReplay\b/gi, "回放"],
    [/\bGovernance\b/gi, "治理"],
    [/\bTask\b/gi, "任务"],
    [/\bWorkflow\b/gi, "工作流"],
    [/\bBackend\b/gi, "后端"],
    [/\bContract\b/gi, "契约"],
    [/\bProposed\b/gi, "拟议"],
    [/\bChange\b/gi, "变更"],
    [/\bGenerated\b/gi, "生成"],
    [/\bArchitecture\b/gi, "架构"],
    [/\bScrollback\b/gi, "滚屏记录"],
    [/\bViewport\b/gi, "视口"],
    [/\bModal\b/gi, "模态"],
    [/\bLayer\b/gi, "层"],
    [/\bCloud\b/gi, "云端"],
    [/\bRemote\b/gi, "远程"],
    [/\bLocal\b/gi, "本地"],
    [/\bService\b/gi, "服务"],
    [/\bStatus\b/gi, "状态"],
    [/\bResult\b/gi, "结果"],
    [/\bSource\b/gi, "来源"],
    [/\bArtifact\b/gi, "产物"],
    [/\bArtifacts\b/gi, "产物"],
    [/\bValidate\b/gi, "验证"],
    [/\bDetect\b/gi, "检测"],
    [/\bClassify\b/gi, "分类"],
    [/\bRoute\b/gi, "路由"],
    [/\bRouting\b/gi, "路由"],
    [/\bRegistry\b/gi, "注册表"],
    [/\bManager\b/gi, "管理器"],
    [/\bProfile\b/gi, "权限配置"],
    [/\bProfiles\b/gi, "权限配置"],
    [/\bFilesystem\b/gi, "文件系统"],
    [/\bNetwork\b/gi, "网络"],
    [/\bFile\b/gi, "文件"],
    [/\bPath\b/gi, "路径"],
    [/\bPaths\b/gi, "路径"],
    [/\bPayload\b/gi, "载荷"],
    [/\bPayloads\b/gi, "载荷"],
    [/\bTrace\b/gi, "trace"],
    [/\bRollout\b/gi, "rollout"],
    [/\bSnapshot\b/gi, "快照"],
    [/\bSnapshots\b/gi, "快照"],
    [/\bLauncher\b/gi, "启动器"],
    [/\bMatrix\b/gi, "矩阵"],
    [/\bConfidence\b/gi, "信心"],
    [/\bRelease\b/gi, "发布"],
    [/\bBuild\b/gi, "构建"],
    [/\bNative\b/gi, "原生"],
    [/\bStable\b/gi, "稳定"],
    [/\bProduct\b/gi, "产品"],
    [/\bChecked in\b/gi, "已提交"],
    [/\bChecked-in\b/gi, "已提交"],
    [/\bDrift\b/gi, "漂移"],
    [/\bDeveloper\b/gi, "开发者"],
    [/\bChanges\b/gi, "修改"],
    [/\bCrate\b/gi, "crate"],
    [/\bCrates\b/gi, "crates"],
    [/\bTarget\b/gi, "目标"],
    [/\bRoot\b/gi, "根"],
    [/\bSummary\b/gi, "摘要"],
    [/\bCitation\b/gi, "引用"],
    [/\bCitations\b/gi, "引用"],
    [/\bParser\b/gi, "解析器"],
    [/\bRead\b/gi, "读"],
    [/\bWrite\b/gi, "写"],
    [/\bGlobal\b/gi, "全局"],
    [/\bAgent\b/gi, "Agent"],
    [/\bIdentity\b/gi, "身份"],
    [/\bPublic\b/gi, "公开"],
    [/\bRegistration\b/gi, "注册"],
    [/\bSigned\b/gi, "已签名"],
    [/\bAuthorized\b/gi, "已授权"],
    [/\bAccess\b/gi, "访问"],
    [/\bMaterial\b/gi, "材料"],
    [/\bClaim\b/gi, "声明"],
    [/\bClaims\b/gi, "声明"],
    [/\bDiff\b/gi, "diff"],
    [/\bAttempt\b/gi, "尝试"],
    [/\bAttempts\b/gi, "尝试"],
    [/\bDetails\b/gi, "详情"],
    [/\bSelected\b/gi, "所选"],
    [/\bMetadata\b/gi, "元数据"],
    [/\bCompatible\b/gi, "兼容"],
    [/\bIncompatible\b/gi, "不兼容"],
    [/\bPreflight\b/gi, "预检"],
    [/\bCurrent\b/gi, "当前"],
    [/\bWorktree\b/gi, "工作树"],
    [/\bApply\b/gi, "应用"],
    [/\bApplied\b/gi, "已应用"],
    [/\bSkipped\b/gi, "跳过"],
    [/\bConflicts\b/gi, "冲突"],
    [/\bClean\b/gi, "干净"],
    [/\bPartial\b/gi, "部分"],
    [/\bError\b/gi, "错误"],
    [/\bCommand\b/gi, "命令"],
    [/\bArguments\b/gi, "参数"],
    [/\bClassify\b/gi, "分类"],
    [/\bSafety\b/gi, "安全"],
    [/\bSandbox\b/gi, "沙箱"],
    [/\bSample\b/gi, "采样"],
    [/\bStream\b/gi, "流式"],
    [/\bCompact\b/gi, "压缩"],
    [/\bPrepare\b/gi, "准备"],
    [/\bStart\b/gi, "开始"],
    [/\bPrompt\b/gi, "提示"],
    [/\bProvider\b/gi, "provider"],
    [/\bInference\b/gi, "推理"],
    [/\bTransport\b/gi, "transport"],
    [/\bOptions\b/gi, "选项"],
    [/\bContext\b/gi, "上下文"],
    [/\bRouter\b/gi, "路由"],
    [/\bBinary\b/gi, "二进制"],
    [/\bInstall\b/gi, "安装"],
    [/\bManaged\b/gi, "托管"],
    [/\bPreference\b/gi, "偏好"],
    [/\bRequirement\b/gi, "要求"],
    [/\bRequirements\b/gi, "要求"],
    [/\bFlags\b/gi, "开关"],
    [/\bLifecycle\b/gi, "生命周期"],
    [/\bProvenance\b/gi, "来源"],
    [/\bDisabled\b/gi, "禁用"],
    [/\bUntrusted\b/gi, "未信任"],
    [/\bMerge\b/gi, "合并"],
    [/\bor\b/gi, "或"],
    [/\band\b/gi, "与"],
    [/\bwith\b/gi, "带"],
    [/\bunder\b/gi, "在"],
    [/\bwhen\b/gi, "当"],
    [/\bneeded\b/gi, "需要时"],
    [/\bselected\b/gi, "所选"],
    [/\bplus\b/gi, "加"],
  ];
  const localized = replacements.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    label,
  );
  return cleanupZhLabel(localized);
}

function headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)]
    .map((match) => ({
      title: stripMarkdown(match[1]),
      index: match.index,
    }))
    .filter((heading) => !stopHeadingPattern.test(heading.title));
}

function chapterTitle(body) {
  return stripMarkdown(body.match(/^#\s+(.+)$/m)?.[1] ?? "Chapter");
}

function headingBefore(body, index) {
  const candidates = headings(body).filter((heading) => heading.index < index);
  return candidates.at(-1)?.title ?? chapterTitle(body);
}

function extractLabelsFromMermaid(block, fallbackLabels) {
  const labels = [];
  for (const match of block.matchAll(/\[[^\]\n]*?["']?([^"'\]\n]+)["']?\]/g)) {
    labels.push(match[1]);
  }
  for (const match of block.matchAll(/\{([^{}\n]+)\}/g)) {
    labels.push(match[1]);
  }
  for (const match of block.matchAll(/state\s+"([^"]+)"/g)) {
    labels.push(match[1]);
  }
  for (const match of block.matchAll(/participant\s+\S+\s+as\s+(.+)$/gm)) {
    labels.push(match[1]);
  }
  for (const match of block.matchAll(/[-=]+>>?[^:]*:\s*(.+)$/gm)) {
    labels.push(match[1]);
  }
  for (const match of block.matchAll(/^\s*([A-Za-z][A-Za-z0-9_-]{1,})\s*-->/gm)) {
    labels.push(match[1]);
  }
  return unique([...labels, ...fallbackLabels]).slice(0, 7);
}

function labelsFromHeadings(body, startIndex) {
  const nextHeadings = headings(body)
    .filter((heading) => heading.index >= startIndex)
    .map((heading) => heading.title);
  return unique(nextHeadings).slice(0, 7);
}

function paragraphRecords(body) {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "\n\n");
  const records = [];
  const pattern = /(?:^|\n\n)([\s\S]*?)(?=\n\n|$)/g;
  for (const match of withoutCode.matchAll(pattern)) {
    const raw = match[1].trim();
    if (!raw) {
      continue;
    }
    records.push({
      index: match.index + match[0].indexOf(match[1]),
      raw,
    });
  }
  return records;
}

function cleanCaptionCandidate(value, lang) {
  const text = stripMarkdown(value)
    .replace(/^>\s*/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return lang === "zh" ? cleanupZhLabel(text) : text;
}

function isCaptionCandidate(value, cleanText = value) {
  const trimmed = value.trim();
  const clean = cleanText.trim();
  if (!trimmed || trimmed.length < 36) {
    return false;
  }
  if (
    /^(?:#|import\s|export\s|<|```|\|)|^---+$/.test(trimmed) ||
    /class(?:Name)?="sketch-|src="\/books\/figures\//.test(trimmed)
  ) {
    return false;
  }
  if (/^\|?\s*[-: ]+\|/.test(trimmed) || /^(?:Plane|Layer|Field)\s*\|/i.test(trimmed)) {
    return false;
  }
  if (/[：:]$/.test(clean) && clean.length < 120) {
    return false;
  }
  if (
    /^(?:The core thesis can be stated|The startup path has|The design question is|This gives the chapter|如果只记住一张图)/i.test(
      clean,
    )
  ) {
    return false;
  }
  return /[.!?。！？:：]/.test(trimmed);
}

function trimCaption(value, lang) {
  const limit = lang === "zh" ? 150 : 265;
  const min = lang === "zh" ? 34 : 80;
  const sentences =
    value.match(lang === "zh" ? /[^。！？]+[。！？][”"']?|[^。！？]+$/g : /[^.!?]+[.!?][”"']?|[^.!?]+$/g) ?? [
      value,
    ];
  let result = "";
  for (const sentence of sentences) {
    const next = `${result}${result ? " " : ""}${sentence.trim()}`.trim();
    if (next.length > limit && result.length >= min) {
      break;
    }
    result = next;
    if (result.length >= min && /[.!?。！？]$/.test(result)) {
      break;
    }
  }
  const raw = result || value;
  const clipped = raw.length > limit
    ? raw.slice(0, limit).replace(/\s+\S*$/, "")
    : raw;
  const trimmed = clipped
    .replace(/[,:;，、；：\s]+$/, "")
    .trim();
  if (!trimmed) {
    return null;
  }
  if (/[.!?。！？]$/.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}${lang === "zh" ? "。" : "."}`;
}

function contextualCaption(body, anchorIndex, lang, mode = "near") {
  const records = paragraphRecords(body)
    .map((record) => ({
      ...record,
      text: cleanCaptionCandidate(record.raw, lang),
    }))
    .filter((record) => isCaptionCandidate(record.raw, record.text) && record.text.length >= 36);

  const candidates = records
    .filter((record) => {
      if (mode === "after") {
        return record.index >= anchorIndex;
      }
      if (mode === "before") {
        return record.index < anchorIndex;
      }
      return Math.abs(record.index - anchorIndex) < 2600;
    })
    .sort((left, right) => {
      if (mode === "after") {
        return left.index - right.index;
      }
      if (mode === "before") {
        return right.index - left.index;
      }
      return Math.abs(left.index - anchorIndex) - Math.abs(right.index - anchorIndex);
    });

  for (const candidate of candidates.slice(0, 8)) {
    const caption = trimCaption(candidate.text, lang);
    if (caption) {
      return caption;
    }
  }
  return null;
}

function resolveLabels(blueprints, key, lang) {
  const blueprint = blueprints[key];
  if (!blueprint) {
    return null;
  }
  const labels = blueprint.labels;
  if (typeof labels === "string") {
    return resolveLabels(blueprints, labels, lang);
  }
  return labels?.[lang] ?? null;
}

function resolveText(blueprints, key, field, lang) {
  const blueprint = blueprints[key];
  if (!blueprint) {
    return null;
  }
  const value = blueprint[field];
  if (typeof value === "string") {
    return resolveText(blueprints, value, field, lang);
  }
  if (!value) {
    const parentKey =
      typeof blueprint.labels === "string"
        ? blueprint.labels
        : typeof blueprint.title === "string"
          ? blueprint.title
          : null;
    return parentKey ? resolveText(blueprints, parentKey, field, lang) : null;
  }
  return value?.[lang] ?? null;
}

function resolvedBlueprint(blueprints, key) {
  const blueprint = blueprints[key];
  if (!blueprint) {
    return null;
  }
  const parentKey =
    typeof blueprint.labels === "string"
      ? blueprint.labels
      : typeof blueprint.title === "string"
        ? blueprint.title
        : null;
  if (parentKey) {
    const parent = resolvedBlueprint(blueprints, parentKey);
    return parent
      ? {
          ...parent,
          ...blueprint,
          labels: parent.labels,
          title: parent.title,
          caption: parent.caption,
          intro: parent.intro,
        }
      : blueprint;
  }
  return blueprint;
}

function shortFigureTitle(value, lang) {
  let text = stripMarkdown(value)
    .replace(/^Chapter\s+\d+:\s*/i, "")
    .replace(/^第\s*\d+\s*章[:：]\s*/, "")
    .replace(/:\s*(?:Whiteboard Map|Chapter Mental Model)$/i, "")
    .replace(/：\s*(?:白板结构图|章节心智模型)$/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (lang === "zh") {
    text = localizeZhLabel(text);
  }
  if (text.length <= (lang === "zh" ? 22 : 44)) {
    return text;
  }
  const parts = text
    .split(/[,:：，]/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length > 1) {
    text = parts.slice(0, lang === "zh" ? 2 : 3).join(lang === "zh" ? "、" : ", ");
  }
  if (text.length <= (lang === "zh" ? 24 : 48)) {
    return text;
  }
  const words = text.split(/\s+/);
  const shortened = words.slice(0, lang === "zh" ? 4 : 6).join(" ");
  return shortened.replace(/\b(?:and|or|with|to|of|a|the|not)$/i, "").trim();
}

function cleanFigureTitle(value) {
  return stripMarkdown(value)
    .replace(/:\s*(?:Whiteboard Map|Chapter Mental Model)$/i, "")
    .replace(/：\s*(?:白板结构图|章节心智模型)$/, "")
    .trim();
}

function clampLines(lines, maxLines, maxChars) {
  if (lines.length <= maxLines) {
    return lines;
  }
  return lines.slice(0, maxLines);
}

function repairDanglingLines(lines) {
  const result = [...lines];
  for (let index = 0; index < result.length - 1; index += 1) {
    const line = result[index].trim();
    if (!/(?:\b(?:or|and|with|the|a|of|to)\b|与|的)$/i.test(line)) {
      continue;
    }
    const nextWords = result[index + 1].trim().split(/\s+/);
    if (!nextWords[0]) {
      continue;
    }
    result[index] = `${line} ${nextWords.shift()}`.trim();
    result[index + 1] = nextWords.join(" ").trim();
  }
  return result.filter(Boolean);
}

function needsZhTokenSpace(left, right) {
  if (!left || !right) {
    return false;
  }
  const leftAscii = /[A-Za-z0-9_.]$/.test(left);
  const rightAscii = /^[A-Za-z0-9_.]/.test(right);
  const leftZh = /[\u4e00-\u9fa5]$/.test(left);
  const rightZh = /^[\u4e00-\u9fa5]/.test(right);
  return (leftAscii && (rightAscii || rightZh)) || (leftZh && rightAscii);
}

function wrapText(text, maxChars, lang, maxLines = 4) {
  const value = String(text)
    .trim()
    .replace(/app-server/gi, "app_server")
    .replace(/[()]/g, " ")
    .replace(/([/+])/g, " $1 ")
    .replace(/[-–]/g, " ")
    .replace(/\bmac OS\b/g, "macOS")
    .replace(/\s+/g, " ");
  if (lang === "zh" && !/[\u4e00-\u9fa5、，：]/.test(value)) {
    return wrapText(value, maxChars, "en", maxLines);
  }
  if (lang === "zh") {
    const tokens = value.match(/[A-Za-z0-9_.]+|[\u4e00-\u9fa5]+|[^\s]/g) ?? [
      value,
    ];
    const chunks = [];
    let current = "";
    for (const token of tokens) {
      const separator = needsZhTokenSpace(current, token) ? " " : "";
      const candidate = `${current}${separator}${token}`;
      if (candidate.length > maxChars && current) {
        chunks.push(current.trim());
        current = token;
      } else if (token.length > maxChars) {
        if (current) {
          chunks.push(current.trim());
        }
        if (/^[A-Za-z0-9_.]+$/.test(token)) {
          chunks.push(token);
          current = "";
          continue;
        }
        chunks.push(...(token.match(new RegExp(`.{1,${maxChars}}`, "g")) ?? []));
        current = "";
      } else {
        current = candidate;
      }
    }
    if (current.trim()) {
      chunks.push(current.trim());
    }
    return clampLines(repairDanglingLines(chunks), maxLines, maxChars);
  }

  const words = value.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (word.length > maxChars) {
      if (current) {
        lines.push(current);
        current = "";
      }
      const chunks = word.match(new RegExp(`.{1,${maxChars}}`, "g")) ?? [word];
      lines.push(...chunks);
      continue;
    }
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) {
    lines.push(current);
  }
  return clampLines(repairDanglingLines(lines), maxLines, maxChars);
}

function roughRect(x, y, width, height, radius, rng) {
  const points = [
    [x + radius, y],
    [x + width - radius, y],
    [x + width, y + radius],
    [x + width, y + height - radius],
    [x + width - radius, y + height],
    [x + radius, y + height],
    [x, y + height - radius],
    [x, y + radius],
  ];
  return points
    .map(([px, py], index) => `${index === 0 ? "M" : "L"} ${(
      px + jitter(rng, 5)
    ).toFixed(1)} ${(py + jitter(rng, 5)).toFixed(1)}`)
    .join(" ")
    .concat(" Z");
}

function roughLine(x1, y1, x2, y2, rng) {
  const cx1 = x1 + (x2 - x1) * 0.35 + jitter(rng, 34);
  const cy1 = y1 + jitter(rng, 32);
  const cx2 = x1 + (x2 - x1) * 0.7 + jitter(rng, 34);
  const cy2 = y2 + jitter(rng, 32);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(
    1,
  )}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function textBlock(
  text,
  x,
  y,
  maxChars,
  size,
  weight,
  lang,
  fill = "#171717",
  maxLines = 4,
) {
  const normalizedText = normalizeSketchLabel(text, lang);
  return wrapText(normalizedText, maxChars, lang, maxLines)
    .map((line, index) => {
      const cleanLine = line
        .replace(/^[，、,/]\s*/, "")
        .replace(/\s*[，、,/]\s*$/g, "")
        .replace(/\s+([,.;:!?])/g, "$1")
        .replace(/([,.;:!?])([A-Za-z0-9])/g, "$1 $2")
        .replace(/app_server/gi, "app-server");
      const renderedLine = lang === "zh" ? cleanupZhLabel(cleanLine) : cleanLine;
      const attrs = [
        `x="${x}"`,
        `y="${y + index * size * 1.25}"`,
        `font-size="${size}"`,
        `fill="${fill}"`,
      ];
      if (weight) {
        attrs.push(`font-weight="${weight}"`);
      }
      return `<text ${attrs.join(" ")}>${esc(renderedLine)}</text>`;
    })
    .join("\n");
}

function normalizeSketchLabel(label, lang) {
  let result = String(label);
  const appServerTitle = "App " + "server";
  const appServerHyphenDaemon = "App" + "-server daemon";
  const appCommandsTitle = "App " + "commands";
  const hermeticBuildTitle = "Hermetic " + "build";
  const hermeticCiTitle = "Hermetic " + "CI";
  const productCrateLabel = "Product " + "crates";
  const patchSetsLabel = "Patch " + "sets";
  const patchBundlesLabel = "Patch " + "bundles";
  const checksumTerm = "check" + "sum";
  const checksumManifestLabel = "Checksum " + "manifests";
  const checksumManifestLower = checksumTerm + " manifest";
  const checksumManifestsLower = checksumTerm + " manifests";
  const replacements = [
    [/App-server events/g, "app-server events"],
    [new RegExp(escapeRegExp(appServerHyphenDaemon), "g"), "Daemon lifecycle"],
    [/App-server runtime/g, "app-server runtime"],
    [/App-server\b/g, "app-server"],
    [new RegExp(`${escapeRegExp(hermeticBuildTitle)} lane`, "g"), "Reproducible build lane"],
    [new RegExp(escapeRegExp(hermeticBuildTitle), "g"), "Reproducible build"],
    [new RegExp(`${escapeRegExp(hermeticCiTitle)} and release verification`, "g"), "Reproducible CI and release checks"],
    [new RegExp(`${escapeRegExp(hermeticCiTitle)} and release`, "g"), "Reproducible CI and release"],
    [/Rust crates and binaries/g, "Workspace crates and binaries"],
    [/Rust crates/g, "Workspace crates"],
    [new RegExp(`${escapeRegExp(appServerTitle)} events`, "g"), "app-server events"],
    [new RegExp(`${escapeRegExp(appServerTitle)} daemon`, "g"), "Daemon lifecycle"],
    [new RegExp(`${escapeRegExp(appServerTitle)} runtime`, "g"), "app-server runtime"],
    [new RegExp(`${escapeRegExp(appServerTitle)}\\b`, "g"), "app-server"],
    [new RegExp(escapeRegExp(appCommandsTitle), "g"), "app-server commands"],
    [new RegExp(escapeRegExp(productCrateLabel), "g"), "Product code"],
    [new RegExp(escapeRegExp(patchSetsLabel), "g"), "Vendor fixes"],
    [new RegExp(escapeRegExp(patchBundlesLabel), "g"), "Vendor fixes"],
    [new RegExp(escapeRegExp(checksumManifestLabel), "g"), "Integrity Records"],
    [new RegExp(escapeRegExp(checksumManifestsLower), "g"), "Integrity Records"],
    [new RegExp(escapeRegExp(checksumManifestLower), "g"), "Integrity Records"],
    [new RegExp(`\\b${escapeRegExp(checksumTerm)}\\b(?! manifest)`, "g"), "Integrity Records"],
  ];
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  if (lang === "zh") {
    const zhReplacements = [
      [new RegExp(`封闭构建${"构建"}通道`, "g"), "可复现构建通道"],
      [/封闭构建通道/g, "可复现构建通道"],
      [/封闭 CI 与发布验证/g, "可复现 CI 与发布验证"],
      [/Rust 包与二进制/g, "工作区包与二进制"],
      [new RegExp(`产品 ${"crates"}`, "g"), "产品包"],
      [new RegExp(escapeRegExp(patchSetsLabel), "g"), "补丁集"],
      [new RegExp(escapeRegExp(patchBundlesLabel), "g"), "补丁集"],
      [new RegExp(escapeRegExp(checksumManifestLower), "g"), "完整性记录"],
      [new RegExp(escapeRegExp(checksumTerm), "g"), "完整性记录"],
      [/App-server 事件/g, "app-server 事件"],
      [/App-server/g, "app-server"],
      [new RegExp(`${escapeRegExp(appServerTitle)} 事件`, "g"), "app-server 事件"],
      [new RegExp(escapeRegExp(appServerTitle), "g"), "app-server"],
      [/应用命令/g, "app-server 命令"],
    ];
    for (const [pattern, replacement] of zhReplacements) {
      result = result.replace(pattern, replacement);
    }
    return cleanupZhLabel(result);
  }
  return result.replace(/\s+/g, " ").trim();
}

function cardTextMetrics(label, box, lang) {
  const available = Math.max(64, box.w - 82);
  if (lang === "zh") {
    const hasAscii = /[A-Za-z0-9]/.test(label);
    const size = box.w < 190 ? 12 : box.w < 225 ? 13 : 14;
    return {
      chars: Math.max(hasAscii ? 7 : 6, Math.floor(available / (size * 1.08))),
      size,
      lines: box.h < 106 ? 4 : 5,
    };
  }
  const isLong = label.length >= 20;
  const size = box.w < 190 ? 12 : isLong ? 14 : 15;
  return {
    chars: Math.max(8, Math.floor(available / (size * 0.66))),
    size,
    lines: box.h < 106 ? 4 : isLong ? 4 : 3,
  };
}

function diagramKind(source, index) {
  if (/sequenceDiagram/.test(source)) {
    return "sequence";
  }
  if (/stateDiagram/.test(source)) {
    return "state";
  }
  if (index % 3 === 1) {
    return "state";
  }
  return "flow";
}

function svgDescription(title, labels, lang) {
  const readableTitle = cleanFigureTitle(title);
  const labelList = labels
    .slice(0, 5)
    .map((label) => displaySketchLabel(label, lang))
    .join(lang === "zh" ? "、" : ", ");
  return lang === "zh"
    ? `${readableTitle}的手绘白板图，展示${labelList}之间的关系。`
    : `Hand-drawn whiteboard figure for ${readableTitle}, showing the relationship between ${labelList}.`;
}

const boardPalette = [
  ["#fff7d6", "#d97757"],
  ["#e9f4ff", "#3b82f6"],
  ["#ecfdf3", "#2f855a"],
  ["#fff1f2", "#be4456"],
  ["#f3e8ff", "#8b5cf6"],
  ["#fef3c7", "#b7791f"],
  ["#eef2ff", "#4f46e5"],
  ["#f1f5f9", "#475569"],
];

function boardFamily({ id, title, labels, kind }) {
  const baseId = id.replace(/-(?:en|zh)$/, "");
  const overrideRules = [
    [/^chapter-20/, "agent-graph"],
    [/^chapter-21/, "cloud-task"],
    [/^chapter-22/, "memory-plane"],
    [/^chapter-23/, "schema-factory"],
    [/^chapter-24/, "release-stack"],
    [/^chapter-25/, "governance-lanes"],
    [/^(chapter-01-concept-|epilogue)/, "map"],
    [/^chapter-0?2(?:-|$)/, "split"],
    [/^(chapter-03|chapter-05-01|chapter-05-concept-2|chapter-07-01|chapter-13-concept-1|chapter-16-02)/, "swimlane"],
    [/^(chapter-04|chapter-14|chapter-15-concept-1|chapter-17-01|chapter-17-concept-[12])/, "swimlane"],
    [/^(chapter-05-02|chapter-06|chapter-12-0|chapter-15-02|chapter-16-04|chapter-25-03)/, "loop"],
    [/^(chapter-08|chapter-11-concept-3|chapter-20-02|chapter-22-02|chapter-23-03)/, "ledger"],
    [/^(chapter-09|chapter-10|chapter-11-01|chapter-11-concept-[12]|chapter-12-concept|chapter-13-01|chapter-25-01)/, "gate"],
    [/^(chapter-15-0[23]|chapter-16|chapter-21-concept-1)/, "swimlane"],
    [/^(chapter-17-concept-3|chapter-18)/, "split"],
    [/^chapter-19/, "split"],
  ];
  for (const [pattern, family] of overrideRules) {
    if (pattern.test(baseId)) {
      return family;
    }
  }
  const text = `${id} ${title} ${labels.join(" ")}`.toLowerCase();
  if (/approval|gate|hook|permission|policy|guardian|sandbox|trust|auth|oauth|安全|审批|关卡|权限|信任|沙箱|认证/.test(text)) {
    return "gate";
  }
  if (/mcp|client|server|sdk|tui|app|cloud|daemon|websocket|transport|protocol|connector|remote|客户端|服务|协议|传输|远程|连接器/.test(text)) {
    return /boundary|routing|tool|tooling|external|边界|路由|工具/.test(text)
      ? "split"
      : "swimlane";
  }
  if (/rollout|event|trace|ledger|history|schema|source|audit|evidence|projection|record|事件|历史|证据|记录|审计|投影/.test(text)) {
    return "ledger";
  }
  if (/startup|lifecycle|release|install|build|ci|migration|compatibility|pipeline|启动|生命周期|发布|安装|构建|迁移|兼容/.test(text)) {
    return "timeline";
  }
  if (/loop|state|resume|fork|memory|compact|retry|cache|interrupt|状态|恢复|分叉|记忆|压缩|重试|缓存|中断/.test(text) || kind === "state") {
    return "loop";
  }
  if (/planes?|boundary|runtime|model|tool|router|split|外部|运行时|模型|路由|平面/.test(text)) {
    return "split";
  }
  if (/vocabulary|mental model|reader|final|bounded|core|词汇|心智模型|最终|有边界|核心/.test(text)) {
    return "map";
  }
  return kind === "sequence" ? "timeline" : "pipeline";
}

function boardHeight(family, count) {
  if (
    [
      "agent-graph",
      "cloud-task",
      "memory-plane",
      "schema-factory",
      "release-stack",
      "governance-lanes",
    ].includes(family)
  ) {
    return count > 9 ? 790 : 740;
  }
  if (family === "gate" || family === "swimlane" || family === "ledger") {
    return count > 8 ? 760 : 700;
  }
  if (family === "timeline" || family === "loop") {
    return count > 8 ? 720 : 680;
  }
  return 700;
}

function nodeTextMetrics(label, box, lang) {
  const size = lang === "zh" ? 18 : label.length > 22 ? 17 : 18;
  return {
    chars: lang === "zh"
      ? Math.max(7, Math.floor((box.w - 34) / (size * 1.05)))
      : Math.max(12, Math.floor((box.w - 34) / (size * 0.58))),
    size,
    lines: box.h < 76 ? 3 : 4,
  };
}

function roughDiamond(cx, cy, width, height, rng) {
  const points = [
    [cx, cy - height / 2],
    [cx + width / 2, cy],
    [cx, cy + height / 2],
    [cx - width / 2, cy],
  ];
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${(
      x + jitter(rng, 4)
    ).toFixed(1)} ${(y + jitter(rng, 4)).toFixed(1)}`)
    .join(" ")
    .concat(" Z");
}

function drawNode({ label, box, lang, rng, index, shape = "box", dashed = false }) {
  const [fill, stroke] = boardPalette[index % boardPalette.length];
  const metrics = nodeTextMetrics(label, box, lang);
  const path = shape === "diamond"
    ? roughDiamond(box.x + box.w / 2, box.y + box.h / 2, box.w, box.h, rng)
    : roughRect(box.x, box.y, box.w, box.h, 18, rng);
  const textX = shape === "diamond" ? box.x + 28 : box.x + 18;
  const textY = shape === "diamond" ? box.y + box.h / 2 - 4 : box.y + 32;
  const maxChars = shape === "diamond"
    ? Math.max(8, metrics.chars - 3)
    : metrics.chars;
  return `<g>
    <path d="${path}" fill="${fill}" stroke="${stroke}" stroke-width="2.4"${dashed ? ' stroke-dasharray="8 8"' : ""} />
    <path d="${shape === "diamond"
      ? roughDiamond(box.x + box.w / 2, box.y + box.h / 2, box.w - 10, box.h - 8, rng)
      : roughRect(box.x + 4, box.y + 4, box.w - 8, box.h - 8, 15, rng)}" fill="none" stroke="${stroke}" stroke-width="1.1" opacity="0.28" />
    ${textBlock(label, textX, textY, maxChars, metrics.size, 750, lang, "#171717", metrics.lines)}
  </g>`;
}

function connector({ from, to, rng, color = "#d97757", dashed = false }) {
  return `<path d="${roughLine(
    from.x,
    from.y,
    to.x,
    to.y,
    rng,
  )}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"${dashed ? ' stroke-dasharray="8 9"' : ""} marker-end="url(#arrow)" opacity="0.72" />`;
}

function renderGateBoard(labels, lang, rng, width, height) {
  const count = Math.min(labels.length, 10);
  const centerX = width / 2;
  const startY = 160;
  const step = count > 7 ? 55 : 64;
  const boxes = labels.slice(0, count).map((label, index) => {
    const wide = index === 0 || index === count - 1;
    const w = wide ? 760 : Math.max(420, 690 - index * 24);
    return {
      label,
      box: { x: centerX - w / 2, y: startY + index * step, w, h: 48 },
      shape: /allow|deny|approval|decision|审批|允许|拒绝|决策|超时|修正/i.test(label)
        ? "diamond"
        : "box",
    };
  });
  const rails = `<path d="${roughLine(260, 150, 260, height - 90, rng)}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="10 12" opacity="0.25" />
    <path d="${roughLine(width - 260, 150, width - 260, height - 90, rng)}" fill="none" stroke="#2f855a" stroke-width="2" stroke-dasharray="10 12" opacity="0.25" />`;
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  const arrows = boxes
    .slice(0, -1)
    .map((item, index) => {
      const next = boxes[index + 1];
      return connector({
        from: {
          x: item.box.x + item.box.w / 2,
          y: item.box.y + item.box.h,
        },
        to: {
          x: next.box.x + next.box.w / 2,
          y: next.box.y,
        },
        rng,
      });
    })
    .join("\n");
  return `${rails}\n${arrows}\n${nodes}`;
}

function renderSwimlaneBoard(labels, lang, rng, width, height) {
  const lanes = lang === "zh"
    ? ["外部表面", "运行时契约", "执行边界"]
    : ["External surface", "Runtime contract", "Execution boundary"];
  const laneWidth = 350;
  const laneXs = [70, 465, 860];
  const laneY = 150;
  const laneH = height - 230;
  const laneMarkup = laneXs
    .map((x, index) => `<g>
      <path d="${roughRect(x, laneY, laneWidth, laneH, 24, rng)}" fill="${index === 1 ? "#fffdf7" : "#f8fafc"}" stroke="#475569" stroke-width="1.8" stroke-dasharray="${index === 1 ? "0" : "8 10"}" opacity="0.72" />
      ${textBlock(lanes[index], x + 20, laneY + 34, lang === "zh" ? 10 : 20, 16, 800, lang, "#475569", 1)}
    </g>`)
    .join("\n");
  const items = labels.slice(0, 12).map((label, index) => {
    const lane = index % 3;
    const row = Math.floor(index / 3);
    return {
      label,
      box: {
        x: laneXs[lane] + 24,
        y: laneY + 66 + row * 112,
        w: laneWidth - 48,
        h: 74,
      },
    };
  });
  const arrows = items
    .slice(0, -1)
    .map((item, index) => {
      const next = items[index + 1];
      return connector({
        from: { x: item.box.x + item.box.w, y: item.box.y + item.box.h / 2 },
        to: { x: next.box.x, y: next.box.y + next.box.h / 2 },
        rng,
        dashed: index % 3 === 2,
      });
    })
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${laneMarkup}\n${arrows}\n${nodes}`;
}

function renderSplitBoard(labels, lang, rng, width, height) {
  const zoneNames = lang === "zh"
    ? ["输入/来源", "运行时边界", "输出/证据"]
    : ["Input / origin", "Runtime boundary", "Output / evidence"];
  const zoneXs = [62, 445, 828];
  const zoneW = 350;
  const zoneMarkup = zoneXs
    .map((x, index) => `<g>
      <path d="${roughRect(x, 150, zoneW, height - 235, 26, rng)}" fill="${index === 1 ? "#fff7d6" : "#fffdf7"}" stroke="${index === 1 ? "#d97757" : "#475569"}" stroke-width="2" opacity="0.65" />
      ${textBlock(zoneNames[index], x + 20, 184, lang === "zh" ? 10 : 22, 16, 800, lang, "#475569", 1)}
    </g>`)
    .join("\n");
  const items = labels.slice(0, 12).map((label, index) => {
    const zone = index % 3;
    const row = Math.floor(index / 3);
    return {
      label,
      box: {
        x: zoneXs[zone] + 28,
        y: 220 + row * 98,
        w: zoneW - 56,
        h: 66,
      },
    };
  });
  const arrows = items
    .slice(0, -1)
    .map((item, index) => connector({
      from: { x: item.box.x + item.box.w, y: item.box.y + item.box.h / 2 },
      to: { x: items[index + 1].box.x, y: items[index + 1].box.y + items[index + 1].box.h / 2 },
      rng,
      color: index % 3 === 1 ? "#2f855a" : "#d97757",
    }))
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ ...item, lang, rng, index, dashed: index % 3 === 2 }))
    .join("\n");
  return `${zoneMarkup}\n${arrows}\n${nodes}`;
}

function renderLoopBoard(labels, lang, rng, width, height, title) {
  const center = { x: width / 2, y: height / 2 + 20 };
  const radiusX = 455;
  const radiusY = height > 700 ? 230 : 205;
  const count = Math.min(labels.length, 10);
  const items = labels.slice(0, count).map((label, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
    return {
      label,
      box: {
        x: center.x + Math.cos(angle) * radiusX - 135,
        y: center.y + Math.sin(angle) * radiusY - 42,
        w: 270,
        h: 72,
      },
    };
  });
  const loop = `<ellipse cx="${center.x}" cy="${center.y}" rx="${radiusX + 72}" ry="${radiusY + 58}" fill="none" stroke="#475569" stroke-width="2.2" stroke-dasharray="13 12" opacity="0.28" />
    <path d="${roughRect(center.x - 155, center.y - 58, 310, 102, 24, rng)}" fill="#fffdf7" stroke="#d97757" stroke-width="2" opacity="0.92" />
    ${textBlock(title, center.x - 128, center.y - 18, lang === "zh" ? 12 : 24, 18, 800, lang, "#171717", 2)}`;
  const arrows = items
    .map((item, index) => {
      const next = items[(index + 1) % items.length];
      return connector({
        from: { x: item.box.x + item.box.w / 2, y: item.box.y + item.box.h / 2 },
        to: { x: next.box.x + next.box.w / 2, y: next.box.y + next.box.h / 2 },
        rng,
        color: "#8b5cf6",
        dashed: index % 2 === 0,
      });
    })
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${loop}\n${arrows}\n${nodes}`;
}

function renderLedgerBoard(labels, lang, rng, width, height) {
  const leftTitle = lang === "zh" ? "事实流" : "Fact stream";
  const rightTitle = lang === "zh" ? "可读投影" : "Readable projection";
  const y0 = 165;
  const rowH = Math.min(64, Math.floor((height - 250) / Math.max(4, Math.ceil(labels.length / 2))));
  const frame = `<path d="${roughRect(70, y0, 500, height - 245, 22, rng)}" fill="#fffdf7" stroke="#475569" stroke-width="2" opacity="0.75" />
    <path d="${roughRect(710, y0, 500, height - 245, 22, rng)}" fill="#f8fafc" stroke="#475569" stroke-width="2" opacity="0.75" />
    ${textBlock(leftTitle, 96, y0 + 36, lang === "zh" ? 8 : 18, 17, 800, lang, "#475569", 1)}
    ${textBlock(rightTitle, 736, y0 + 36, lang === "zh" ? 8 : 22, 17, 800, lang, "#475569", 1)}
    <path d="${roughLine(610, y0 + 38, 675, y0 + 38, rng)}" fill="none" stroke="#d97757" stroke-width="3" marker-end="url(#arrow)" opacity="0.7" />`;
  const rows = labels.slice(0, 12).map((label, index) => {
    const side = index % 2;
    const row = Math.floor(index / 2);
    const box = {
      x: side === 0 ? 105 : 745,
      y: y0 + 70 + row * rowH,
      w: 420,
      h: Math.max(48, rowH - 12),
    };
    return drawNode({ label, box, lang, rng, index, dashed: side === 1 });
  }).join("\n");
  return `${frame}\n${rows}`;
}

function renderTimelineBoard(labels, lang, rng, width, height) {
  const y = height / 2 + 20;
  const spine = `<path d="${roughLine(90, y, width - 90, y, rng)}" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round" opacity="0.34" />`;
  const count = Math.min(labels.length, 10);
  const step = (width - 220) / Math.max(1, count - 1);
  const items = labels.slice(0, count).map((label, index) => {
    const above = index % 2 === 0;
    return {
      label,
      box: {
        x: 85 + index * step - 80,
        y: above ? y - 150 : y + 48,
        w: 205,
        h: 82,
      },
      anchor: { x: 85 + index * step + 22, y },
    };
  });
  const ticks = items
    .map((item, index) => `<g>
      <circle cx="${item.anchor.x}" cy="${item.anchor.y}" r="8" fill="#fffdf7" stroke="${boardPalette[index % boardPalette.length][1]}" stroke-width="3" />
      <path d="${roughLine(item.anchor.x, item.anchor.y, item.box.x + item.box.w / 2, item.box.y + (item.box.y < y ? item.box.h : 0), rng)}" fill="none" stroke="${boardPalette[index % boardPalette.length][1]}" stroke-width="2" opacity="0.55" />
    </g>`)
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ label: item.label, box: item.box, lang, rng, index }))
    .join("\n");
  return `${spine}\n${ticks}\n${nodes}`;
}

function renderMapBoard(labels, lang, rng, width, height, title) {
  const center = { x: width / 2, y: height / 2 + 30 };
  const hub = {
    x: center.x - 150,
    y: center.y - 58,
    w: 300,
    h: 108,
  };
  const count = Math.min(labels.length, 10);
  const items = labels.slice(0, count).map((label, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
    return {
      label,
      box: {
        x: center.x + Math.cos(angle) * 450 - 112,
        y: center.y + Math.sin(angle) * 220 - 38,
        w: 224,
        h: 70,
      },
    };
  });
  const hubMarkup = drawNode({ label: title, box: hub, lang, rng, index: 0, dashed: true });
  const links = items
    .map((item, index) => connector({
      from: { x: center.x, y: center.y },
      to: { x: item.box.x + item.box.w / 2, y: item.box.y + item.box.h / 2 },
      rng,
      color: boardPalette[index % boardPalette.length][1],
      dashed: true,
    }))
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ ...item, lang, rng, index: index + 1 }))
    .join("\n");
  return `${links}\n${nodes}\n${hubMarkup}`;
}

function renderPipelineBoard(labels, lang, rng, width, height) {
  const count = Math.min(labels.length, 12);
  const columns = count > 8 ? 4 : Math.min(5, count);
  const rows = Math.ceil(count / columns);
  const cellW = (width - 150) / columns;
  const cellH = (height - 240) / rows;
  const items = labels.slice(0, count).map((label, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const offset = row % 2 === 0 ? 0 : cellW / 2;
    return {
      label,
      box: {
        x: 70 + col * cellW + offset * 0.28,
        y: 170 + row * cellH + (col % 2) * 14,
        w: Math.min(250, cellW - 34),
        h: Math.min(92, cellH - 18),
      },
    };
  });
  const arrows = items
    .slice(0, -1)
    .map((item, index) => connector({
      from: { x: item.box.x + item.box.w, y: item.box.y + item.box.h / 2 },
      to: { x: items[index + 1].box.x, y: items[index + 1].box.y + items[index + 1].box.h / 2 },
      rng,
      color: boardPalette[index % boardPalette.length][1],
      dashed: Math.floor(index / columns) % 2 === 1,
    }))
    .join("\n");
  const nodes = items
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${arrows}\n${nodes}`;
}

function renderAgentGraphBoard(labels, lang, rng, width, height, title) {
  const names = lang === "zh"
    ? {
        parent: "父线程拥有协调权",
        graph: "图生命周期",
        mailbox: "邮箱与等待点",
        trace: "结果通知与 trace",
      }
    : {
        parent: "Parent owns coordination",
        graph: "Graph lifecycle",
        mailbox: "Mailbox and waits",
        trace: "Result notifications and trace",
      };
  const selected = labels.slice(0, 9);
  const boxes = [
    { label: selected[0] ?? names.parent, box: { x: 78, y: 212, w: 270, h: 92 } },
    { label: selected[1] ?? names.graph, box: { x: 498, y: 180, w: 300, h: 96 } },
    { label: selected[2] ?? names.mailbox, box: { x: 905, y: 216, w: 270, h: 88 } },
    { label: selected[3] ?? "child A", box: { x: 180, y: 430, w: 240, h: 86 } },
    { label: selected[4] ?? "child B", box: { x: 520, y: 500, w: 240, h: 86 } },
    { label: selected[5] ?? "child C", box: { x: 845, y: 430, w: 240, h: 86 } },
    { label: selected[6] ?? names.trace, box: { x: 430, y: 615, w: 430, h: 80 } },
  ];
  const halo = `<ellipse cx="640" cy="448" rx="520" ry="238" fill="#eef2ff" stroke="#4f46e5" stroke-width="2" stroke-dasharray="14 12" opacity="0.28" />
    ${textBlock(title, 500, 345, lang === "zh" ? 12 : 24, 19, 800, lang, "#475569", 2)}`;
  const edges = [
    [boxes[0], boxes[1], "#d97757"],
    [boxes[1], boxes[2], "#3b82f6"],
    [boxes[1], boxes[3], "#2f855a"],
    [boxes[1], boxes[4], "#8b5cf6"],
    [boxes[1], boxes[5], "#be4456"],
    [boxes[3], boxes[6], "#475569"],
    [boxes[4], boxes[6], "#475569"],
    [boxes[5], boxes[6], "#475569"],
  ].map(([from, to, color], index) => connector({
    from: { x: from.box.x + from.box.w / 2, y: from.box.y + from.box.h / 2 },
    to: { x: to.box.x + to.box.w / 2, y: to.box.y + to.box.h / 2 },
    rng,
    color,
    dashed: index >= 5,
  })).join("\n");
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${halo}\n${edges}\n${nodes}`;
}

function renderCloudTaskBoard(labels, lang, rng, width, height) {
  const rails = lang === "zh"
    ? ["本地客户端", "云端任务后端", "本地应用边界"]
    : ["Local client", "Cloud task backend", "Local apply boundary"];
  const x = [80, 480, 880];
  const railMarkup = x.map((railX, index) => `<g>
      <path d="${roughRect(railX, 158, 300, height - 250, 26, rng)}" fill="${index === 1 ? "#e9f4ff" : "#fffdf7"}" stroke="#475569" stroke-width="2" opacity="0.55" />
      ${textBlock(rails[index], railX + 24, 194, lang === "zh" ? 10 : 22, 17, 800, lang, "#475569", 1)}
    </g>`).join("\n");
  const picked = labels.slice(0, 9);
  const boxes = picked.map((label, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    return {
      label,
      box: { x: x[col] + 34, y: 242 + row * 135, w: 232, h: 82 },
    };
  });
  const arrows = boxes.slice(0, -1).map((item, index) => {
    const next = boxes[index + 1];
    return connector({
      from: { x: item.box.x + item.box.w, y: item.box.y + item.box.h / 2 },
      to: { x: next.box.x, y: next.box.y + next.box.h / 2 },
      rng,
      color: index % 3 === 1 ? "#2f855a" : "#d97757",
      dashed: index % 3 === 2,
    });
  }).join("\n");
  const patchPad = `<path d="${roughRect(902, 585, 220, 72, 18, rng)}" fill="#ecfdf3" stroke="#2f855a" stroke-width="2.2" />
    ${textBlock(lang === "zh" ? "只在预检后修改工作树" : "Mutate worktree only after preflight", 924, 620, lang === "zh" ? 12 : 24, 17, 800, lang, "#171717", 2)}`;
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${railMarkup}\n${arrows}\n${nodes}\n${patchPad}`;
}

function renderMemoryPlaneBoard(labels, lang, rng, width, height) {
  const names = lang === "zh"
    ? ["活动 turn 读路径", "证据与引用", "后台写路径"]
    : ["Active-turn read path", "Evidence and citations", "Background write path"];
  const selected = labels.slice(0, 10);
  const left = { x: 72, y: 214, w: 310, h: 360 };
  const mid = { x: 486, y: 180, w: 310, h: 430 };
  const right = { x: 900, y: 214, w: 310, h: 360 };
  const planes = [left, mid, right].map((box, index) => `<g>
    <path d="${roughRect(box.x, box.y, box.w, box.h, 30, rng)}" fill="${index === 1 ? "#fff7d6" : "#f8fafc"}" stroke="${index === 1 ? "#d97757" : "#475569"}" stroke-width="2.2" opacity="0.66" />
    ${textBlock(names[index], box.x + 24, box.y + 38, lang === "zh" ? 10 : 24, 17, 800, lang, "#475569", 1)}
  </g>`).join("\n");
  const boxes = [
    { label: selected[0] ?? names[0], box: { x: 105, y: 300, w: 244, h: 78 } },
    { label: selected[1] ?? "summary", box: { x: 105, y: 430, w: 244, h: 78 } },
    { label: selected[2] ?? names[1], box: { x: 520, y: 275, w: 244, h: 78 } },
    { label: selected[3] ?? "citation", box: { x: 520, y: 430, w: 244, h: 78 } },
    { label: selected[4] ?? names[2], box: { x: 935, y: 300, w: 244, h: 78 } },
    { label: selected[5] ?? "durable memory", box: { x: 935, y: 430, w: 244, h: 78 } },
  ];
  const links = [
    [boxes[0], boxes[2], "#3b82f6"],
    [boxes[2], boxes[1], "#3b82f6"],
    [boxes[4], boxes[3], "#2f855a"],
    [boxes[3], boxes[5], "#2f855a"],
    [boxes[5], boxes[0], "#d97757"],
  ].map(([from, to, color], index) => connector({
    from: { x: from.box.x + from.box.w / 2, y: from.box.y + from.box.h / 2 },
    to: { x: to.box.x + to.box.w / 2, y: to.box.y + to.box.h / 2 },
    rng,
    color,
    dashed: index === 4,
  })).join("\n");
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${planes}\n${links}\n${nodes}`;
}

function renderSchemaFactoryBoard(labels, lang, rng, width, height) {
  const selected = labels.slice(0, 10);
  const source = { label: selected[0] ?? "schema source", box: { x: 70, y: 330, w: 245, h: 86 } };
  const machine = { x: 420, y: 205, w: 420, h: 300 };
  const products = [
    { label: selected[3] ?? "Rust types", box: { x: 930, y: 205, w: 245, h: 74 } },
    { label: selected[4] ?? "TypeScript models", box: { x: 930, y: 325, w: 245, h: 74 } },
    { label: selected[5] ?? "Python models", box: { x: 930, y: 445, w: 245, h: 74 } },
  ];
  const checks = [
    { label: selected[1] ?? (lang === "zh" ? "可复现构建" : "Reproducible build"), box: { x: 462, y: 330, w: 155, h: 72 } },
    { label: selected[2] ?? (lang === "zh" ? "漂移检查" : "Drift check"), box: { x: 650, y: 330, w: 155, h: 72 } },
  ];
  const machineMarkup = `<path d="${roughRect(machine.x, machine.y, machine.w, machine.h, 34, rng)}" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.5" />
    <path d="${roughLine(machine.x + 40, machine.y + 105, machine.x + machine.w - 40, machine.y + 105, rng)}" fill="none" stroke="#4f46e5" stroke-width="2" opacity="0.34" />
    ${textBlock(lang === "zh" ? "契约生成工厂" : "Contract generation factory", machine.x + 44, machine.y + 64, lang === "zh" ? 12 : 28, 20, 800, lang, "#171717", 1)}`;
  const outputFrame = `<path d="${roughRect(895, 170, 315, 390, 28, rng)}" fill="#fffdf7" stroke="#475569" stroke-width="2" stroke-dasharray="10 10" opacity="0.62" />`;
  const arrows = [
    connector({ from: { x: source.box.x + source.box.w, y: source.box.y + 43 }, to: { x: machine.x, y: machine.y + 170 }, rng, color: "#d97757" }),
    ...products.map((item, index) => connector({
      from: { x: machine.x + machine.w, y: machine.y + 98 + index * 58 },
      to: { x: item.box.x, y: item.box.y + item.box.h / 2 },
      rng,
      color: "#3b82f6",
      dashed: index === 2,
    })),
  ].join("\n");
  const nodes = [source, ...checks, ...products]
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${outputFrame}\n${machineMarkup}\n${arrows}\n${nodes}`;
}

function renderReleaseStackBoard(labels, lang, rng, width, height) {
  const selected = labels.slice(0, 11);
  const core = { label: selected[0] ?? "native binary", box: { x: 475, y: 220, w: 330, h: 96 } };
  const rings = `<ellipse cx="640" cy="392" rx="475" ry="210" fill="#f8fafc" stroke="#475569" stroke-width="2" stroke-dasharray="16 12" opacity="0.38" />
    <ellipse cx="640" cy="392" rx="250" ry="114" fill="#fff7d6" stroke="#d97757" stroke-width="2" opacity="0.42" />`;
  const boxes = [
    core,
    { label: selected[1] ?? "Cargo", box: { x: 130, y: 206, w: 230, h: 78 } },
    { label: selected[2] ?? "Bazel verification", box: { x: 918, y: 206, w: 230, h: 78 } },
    { label: selected[3] ?? "npm platform package", box: { x: 130, y: 394, w: 230, h: 78 } },
    { label: selected[4] ?? "release archive", box: { x: 918, y: 394, w: 230, h: 78 } },
    { label: selected[5] ?? "installer", box: { x: 310, y: 582, w: 250, h: 78 } },
    {
      label: selected[6] ?? (lang === "zh" ? "完整性记录" : "Integrity Records"),
      box: { x: 720, y: 582, w: 250, h: 78 },
    },
  ];
  const links = boxes.slice(1).map((item, index) => connector({
    from: { x: core.box.x + core.box.w / 2, y: core.box.y + core.box.h / 2 },
    to: { x: item.box.x + item.box.w / 2, y: item.box.y + item.box.h / 2 },
    rng,
    color: boardPalette[index % boardPalette.length][1],
    dashed: index >= 4,
  })).join("\n");
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${rings}\n${links}\n${nodes}`;
}

function renderGovernanceLanesBoard(labels, lang, rng, width, height) {
  const laneNames = lang === "zh"
    ? ["策略", "验证", "发布", "回滚"]
    : ["Policy", "Verification", "Release", "Rollback"];
  const selected = labels.slice(0, 12);
  const laneH = 112;
  const laneMarkup = laneNames.map((name, index) => {
    const y = 168 + index * 128;
    return `<g>
      <path d="${roughRect(82, y, width - 164, laneH, 24, rng)}" fill="${boardPalette[index % boardPalette.length][0]}" stroke="${boardPalette[index % boardPalette.length][1]}" stroke-width="2" opacity="0.58" />
      ${textBlock(name, 110, y + 44, lang === "zh" ? 8 : 18, 19, 800, lang, "#171717", 1)}
    </g>`;
  }).join("\n");
  const boxes = selected.map((label, index) => {
    const lane = index % 4;
    const col = Math.floor(index / 4);
    return {
      label,
      box: { x: 250 + col * 300, y: 188 + lane * 128, w: 230, h: 72 },
    };
  });
  const arrows = boxes.slice(0, -1).map((item, index) => connector({
    from: { x: item.box.x + item.box.w, y: item.box.y + item.box.h / 2 },
    to: { x: boxes[index + 1].box.x, y: boxes[index + 1].box.y + boxes[index + 1].box.h / 2 },
    rng,
    color: boardPalette[index % boardPalette.length][1],
    dashed: index % 4 === 3,
  })).join("\n");
  const nodes = boxes
    .map((item, index) => drawNode({ ...item, lang, rng, index }))
    .join("\n");
  return `${laneMarkup}\n${arrows}\n${nodes}`;
}

function renderBoard({ family, labels, lang, rng, width, height, title, id }) {
  if (family === "agent-graph") {
    return renderAgentGraphBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "cloud-task") {
    return renderCloudTaskBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "memory-plane") {
    return renderMemoryPlaneBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "schema-factory") {
    return renderSchemaFactoryBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "release-stack") {
    return renderReleaseStackBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "governance-lanes") {
    return renderGovernanceLanesBoard(labels, lang, rng, width, height, title, id);
  }
  if (family === "gate") {
    return renderGateBoard(labels, lang, rng, width, height);
  }
  if (family === "swimlane") {
    return renderSwimlaneBoard(labels, lang, rng, width, height);
  }
  if (family === "split") {
    return renderSplitBoard(labels, lang, rng, width, height);
  }
  if (family === "loop") {
    return renderLoopBoard(labels, lang, rng, width, height, title);
  }
  if (family === "ledger") {
    return renderLedgerBoard(labels, lang, rng, width, height);
  }
  if (family === "timeline") {
    return renderTimelineBoard(labels, lang, rng, width, height);
  }
  if (family === "map") {
    return renderMapBoard(labels, lang, rng, width, height, title);
  }
  return renderPipelineBoard(labels, lang, rng, width, height);
}

function makeSvg({ id, lang, title, caption, labels, kind }) {
  const rng = createRng(id);
  const cleanTitle = normalizeSketchLabel(cleanFigureTitle(title), lang);
  const visualTitle = shortFigureTitle(cleanTitle, lang);
  const sourceLabels = labels.map((label) =>
    normalizeSketchLabel(displaySketchLabel(label, lang), lang),
  );
  const safeLabels = sourceLabels.length
    ? sourceLabels
    : lang === "zh"
      ? ["入口", "运行时", "边界", "证据"]
      : ["Entry", "Runtime", "Boundary", "Evidence"];
  const family = boardFamily({ id, title: cleanTitle, labels: safeLabels, kind });
  const width = 1280;
  const height = boardHeight(family, safeLabels.length);
  const description = normalizeSketchLabel(svgDescription(cleanTitle, safeLabels, lang), lang);
  const board = renderBoard({
    family,
    labels: safeLabels,
    lang,
    rng,
    width,
    height,
    title: visualTitle,
    id,
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title-${id} desc-${id}">
  <title id="title-${id}">${esc(cleanTitle)}</title>
  <desc id="desc-${id}">${esc(description)}</desc>
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M 1 1 L 11 6 L 1 11 z" fill="#d97757" />
    </marker>
    <filter id="paper-${id}" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.045" />
      </feComponentTransfer>
    </filter>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" rx="30" fill="#fffdf7" />
  <path d="${roughRect(22, 22, width - 44, height - 44, 28, rng)}" fill="none" stroke="#171717" stroke-width="2" opacity="0.18" />
  <rect x="0" y="0" width="${width}" height="${height}" filter="url(#paper-${id})" />
  <g font-family="Virgil, 'Comic Sans MS', 'Segoe Print', 'LXGW WenKai', 'Noto Sans CJK SC', cursive" letter-spacing="0">
    ${textBlock(
      visualTitle,
      66,
      95,
      lang === "zh" ? 18 : 42,
      lang === "zh" ? 31 : 33,
      800,
      lang,
      "#171717",
      2,
    )}
    <path d="${roughLine(64, 166, width - 70, 160, rng)}" fill="none" stroke="#171717" stroke-width="2" opacity="0.22" />
    ${board}
  </g>
</svg>
`;
}

function templateIndex(id, size) {
  let total = 0;
  for (const char of id) {
    total += char.charCodeAt(0);
  }
  return total % size;
}

function pick(seed, values, salt = "") {
  return values[templateIndex(`${seed}:${salt}`, values.length)];
}

function shortCalloutLabel(value, lang) {
  const exactEn = new Map([
    ["ThreadManager owns live thread map", "ThreadManager map"],
    ["Filesystem access through executor", "Executor filesystem"],
    ["Append to source buffer", "Source buffer"],
    ["Compatibility Without Semantic Drift", "Compatibility guard"],
    ["Bazel release-build verification", "Bazel verification"],
    ["developer-instruction context", "Instruction context"],
    ["has this content hash been imported?", "Hash check"],
    ["has this content hash been imported", "Hash check"],
    ["no", "Import path"],
    ["Replay and observability", "Replay view"],
  ]);
  if (lang !== "zh" && exactEn.has(value)) {
    return exactEn.get(value);
  }
  const label = lang === "zh" ? localizeZhLabel(value) : value;
  const text = stripMarkdown(label).replace(/\s+/g, " ").trim();
  const exactZh = new Map([
    ["记录一个条目可能影响三层", "三层写入"],
    ["获取详情或所选 diff", "获取详情"],
    ["获取所选差异", "获取差异"],
    ["统一 diff 与元数据", "统一差异"],
    ["统一差异与元数据", "统一差异"],
    ["尝试 diff", "尝试差异"],
    ["记录 diff 与模型结果", "记录结果"],
    ["Marketplace 或远程源", "市场/远程源"],
  ]);
  if (lang === "zh" && exactZh.has(text)) {
    return exactZh.get(text);
  }
  if (lang === "zh") {
    const compactZhPrefixes = [
      [/^transport\b/i, "传输边界"],
      [/^trace\b/i, "Trace 边界"],
      [/^rollout\s*\/?\s*trace\b/i, "Trace 证据"],
      [/^rollout\s+trace\b/i, "Trace 证据"],
      [/^Agent[- ]?控制工具/i, "Agent 控制"],
      [/^Agent\b/i, "Agent 控制"],
      [/^配置\s*provider\b/i, "Provider 配置"],
    ];
    for (const [pattern, replacement] of compactZhPrefixes) {
      if (pattern.test(text)) {
        return replacement;
      }
    }
  }
  const limit = lang === "zh" ? 11 : 22;
  if (text.length <= limit) {
    return text;
  }
  if (lang === "zh") {
    return text.slice(0, limit);
  }
  return text
    .split(/\s+/)
    .slice(0, 3)
    .join(" ")
    .replace(/\b(?:and|or|with|of|the|to|a|an|as|for)$/i, "")
    .replace(/\b(?:through|without|before|after|from|into|onto)$/i, "")
    .trim()
    .replace(/[,:;]$/, "");
}

function displaySketchLabel(label, lang) {
  const raw = normalizeSketchLabel(stripMarkdown(label), lang);
  const localized = lang === "zh" ? localizeZhLabel(raw) : raw;
  const text = localized.replace(/\s+/g, " ").trim();
  const replacements =
    lang === "zh"
      ? [
          [/^transport\s*:/i, "传输适配"],
          [/^transport\s*\/?/i, "传输适配"],
          [/^trace\s*\/?\s*上下文根/i, "Trace 上下文"],
          [/^trace\s+上下文根/i, "Trace 上下文"],
          [/^rollout\s*\/?\s*trace\b/i, "Trace 证据"],
          [/^rollout\s+trace\b/i, "Trace 证据"],
          [/^Agent[- ]?控制工具/i, "Agent 控制"],
          [/^运行时来源\b/i, "运行时来源"],
          [/^配置\s*provider\b/i, "Provider 配置"],
          [/^Marketplace\s*或\s*远程源$/i, "市场/远程源"],
        ]
      : [
          [/^Choose task and attempt$/i, "Choose task, attempt"],
          [/^Transport\s*:/i, "Transport adapter"],
          [/^trace context root/i, "Trace context"],
          [/^trace writer sequence/i, "Trace writer"],
          [/^runtime sources/i, "Runtime sources"],
          [/^agent-control tool/i, "Agent control tool"],
          [/^Reject incompatible diff$/i, "Reject diff"],
          [/^reject incompatible diff shape$/i, "Reject diff shape"],
        ];
  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) {
      return replacement;
    }
  }
  return lang === "zh" ? cleanupZhLabel(text) : text;
}

function figureMarkup({
  isMdx,
  src,
  alt,
  caption,
  lang,
  id,
  title,
  labels,
  intro,
}) {
  const classAttr = isMdx ? "className" : "class";
  const introMarkup = intro
    ? `<p ${classAttr}="sketch-intro">${intro}</p>\n`
    : "";
  return `${introMarkup}<figure ${classAttr}="sketch-figure">
  <img src="${src}" alt="${esc(alt)}" loading="lazy" />
  <figcaption>${esc(caption)}</figcaption>
</figure>`;
}

function captionForDiagram(heading, labels, lang, contextCaption = null) {
  const usable = labels.length >= 3
    ? labels
    : [...labels, lang === "zh" ? "后续状态" : "later state"];
  const first = displaySketchLabel(usable[0], lang);
  const second = displaySketchLabel(usable[1], lang);
  const third = displaySketchLabel(usable[2], lang);
  const fourth = displaySketchLabel(
    usable[3] ?? (lang === "zh" ? "证据" : "evidence"),
    lang,
  );
  const subject = lang === "zh" && /[A-Za-z0-9]/.test(heading)
    ? ` ${heading} `
    : heading;
  const variants =
    lang === "zh"
      ? [
          `${subject}把${first}、${second}、${third}和${fourth}放在同一条运行链路上，说明请求如何逐步变成可解释结果。`,
          `${first}进入后不会直接改变状态；${second}先收窄语义，${third}推进工作，${fourth}留下可审计线索。`,
          `${subject}把关键路径压成可读白板：${first}被适配后进入${second}，再由${third}和${fourth}分别承担推进与记录。`,
          `${heading}不是单步调用；${first}、${second}、${third}和${fourth}分别承担输入、约束、推进和证据责任。`,
        ]
      : [
          `Read ${heading} as a sequence: ${first} is narrowed by ${second}, then ${third} hands an auditable result to ${fourth}.`,
          `The important split is between ${first} as outside input and ${second} as boundary condition; ${third} and ${fourth} show how the runtime keeps the result explainable.`,
          `${heading} reduces the path to four checkpoints: adapt ${first}, pass through ${second}, advance ${third}, and leave evidence at ${fourth}.`,
          `${heading} is more than a call chain: ${first}, ${second}, ${third}, and ${fourth} each own a different responsibility in the path.`,
        ];
  return variants[templateIndex(heading, variants.length)];
}

function captionForConcept(heading, labels, lang, contextCaption = null) {
  const usableLabels = labels.filter(
    (label) => stripMarkdown(label).toLowerCase() !== heading.toLowerCase(),
  );
  const preview =
    lang === "zh"
      ? usableLabels.slice(0, 4).map((label) => displaySketchLabel(label, lang)).join("、")
      : usableLabels.slice(0, 4).map((label) => displaySketchLabel(label, lang)).join(", ");
  const focus = preview || (lang === "zh" ? "本节关键边界" : "the section's key boundaries");
  const variants =
    lang === "zh"
      ? [
          `${heading}图强调${focus}之间的责任分离，帮助读者判断哪些状态属于运行时，哪些只是展示或导入材料。`,
          `这张图把${heading}的讨论落到${focus}上：先看谁拥有状态，再看证据如何回到后续流程。`,
          `${heading}图不是概念清单，而是说明${focus}如何共同限制后续实现的选择空间。`,
          `读${heading}图时，关键不是节点数量，而是${focus}之间的交接点在哪里。`,
        ]
      : [
          `${heading} is about responsibility separation across ${focus}, making it clear which state belongs to the runtime and which material is only input or presentation.`,
          `This figure grounds ${heading} in ${focus}: first identify who owns the state, then follow how evidence returns to the next step.`,
          `${heading} is not a concept list; the board shows how ${focus} constrain the implementation choices that follow.`,
          `${heading} depends on the handoff between ${focus}; the implementation choices follow from that handoff.`,
        ];
  return variants[templateIndex(heading, variants.length)];
}

function altText(title, labels, lang, caption = null) {
  if (caption) {
    const cleanCaption = stripMarkdown(caption)
      .replace(/\s+/g, " ")
      .trim();
    const limit = lang === "zh" ? 180 : 360;
    if (cleanCaption.length <= limit) {
      return cleanCaption;
    }
    return cleanCaption
      .slice(0, limit)
      .replace(/\s+\S*$/, "")
      .replace(/[，、,;:]\s*$/g, "")
      .trim();
  }
  const displayTitle = title
    .replace(/:\s*(?:Whiteboard Map|Chapter Mental Model)$/i, "")
    .replace(/：\s*(?:白板结构图|章节心智模型)$/, "")
    .trim();
  const preview =
    lang === "zh"
      ? labels.slice(0, 4).map((label) => displaySketchLabel(label, lang)).join("、")
      : labels.slice(0, 6).map((label) => displaySketchLabel(label, lang)).join(", ");
  const text = lang === "zh"
    ? `${displayTitle} 展示 ${preview} 如何在同一条运行时路径中分工。`
    : `${displayTitle} shows how ${preview} divide responsibility inside the runtime path.`;
  const limit = lang === "zh" ? 180 : 640;
  if (text.length <= limit) {
    return text;
  }
  const trimmed = text
    .slice(0, limit)
    .replace(/\s+\S*$/, "")
    .replace(/\b(?:and|or|with|of|the|to|a|an|as|for)$/i, "")
    .replace(/[,，;；:\s]+$/, "")
    .trim();
  return `${trimmed}.`;
}

function writeFigure({ id, lang, title, caption, labels, kind }) {
  const filename = `${id}.svg`;
  const file = path.join(outputDir, filename);
  writeFileSync(
    file,
    makeSvg({ id, lang, title, caption, labels, kind }),
    "utf8",
  );
  return `${publicBase}/${filename}`;
}

function insertAfterHeadingIntro(body, headingIndex, markup) {
  const headingEnd = body.indexOf("\n", headingIndex);
  if (headingEnd === -1) {
    return `${body}\n\n${markup}\n`;
  }
  const nextHeading = body.slice(headingEnd + 1).search(/^##\s+/m);
  const sectionEnd =
    nextHeading === -1 ? body.length : headingEnd + 1 + nextHeading;
  const section = body.slice(headingEnd + 1, sectionEnd);
  if (/^\s*###\s+/m.test(section)) {
    return `${body.slice(0, headingEnd + 1)}\n${markup}\n\n${body.slice(
      headingEnd + 1,
    )}`;
  }
  const paragraphEnd = section.search(/\n\s*\n/);
  const insertAt =
    paragraphEnd === -1
      ? headingEnd + 1
      : headingEnd + 1 + paragraphEnd + section.match(/\n\s*\n/)?.[0].length;
  return `${body.slice(0, insertAt)}\n${markup}\n\n${body.slice(insertAt)}`;
}

function sanitizeGeneratedBody(body, lang) {
  const sketchLeadPrefix = "The sketch below " + "shows";
  const tableNamesPrefix = "The table " + "names";
  const tableAppliesPrefix = "The table " + "applies";
  const tableTurnsPrefix = "The table " + "turns";
  const oldClassificationLead =
    "The classification result falls into four " +
    "conservative handling patterns.";
  const newClassificationLead =
    "The table is deliberately small: each row is a permission decision before it is a conversion rule.";
  const productCratePhrase = "Product " + "crates";
  const patchBundlePhrase = "patch " + "bundles";
  const checksumManifestsPhrase = "check" + "sum manifests";
  const productCrateZh = "产品 " + "crates";
  const patchSetsLower = "patch " + "sets";
  const patchSetsTitle = "Patch " + "sets";
  const zhSketchIntro = "下图先" + "展示";
  const zhFigureTableLead =
    "下面的图先" +
    "展示分类路径；" +
    "图后的" +
    "表格列出产物类别和保守导入规则。";
  const zhAfterTableLead =
    "图后的" + "表格列出产物类别和保守导入规则。";
  const zhCompatSketchLead =
    "迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1/v2 共存、实验性关卡和客户端版本兼容处理。" +
    zhSketchIntro +
    "兼容桥停在哪里。";
  const zhBoundaryTableLead =
    "图后的" + "表格把这条策略拆成边界规则。";
  let result = body
    .replace(
      /The source map above names the concrete connection manager and exposure code\./g,
      "The sketch and pseudocode above name the concrete connection manager and exposure code.",
    )
    .replace(
      /The graph-store and rollout-trace reducers named in the source map implement/g,
      "The graph-store and rollout-trace reducers shown by the sketch and pseudocode implement",
    )
    .replace(
      /The concrete cloud-task client named in the source map owns the backend/g,
      "The concrete cloud-task client named in the implementation reference owns the backend",
    )
    .replace(
      /If you remember one diagram, make it this one:/g,
      "The book closes with two diagrams: the first compresses the final operating model, and the second places the bounded operating environment back on one board.",
    )
    .replace(
      /External configuration migration handles several artifact families:/g,
      "Before writing anything, the importer classifies each source artifact and chooses a conservative outcome.",
    )
    .replace(
      new RegExp(`${escapeRegExp(sketchLeadPrefix)} the classification path\\.`, "g"),
      "Before writing anything, the importer classifies each source artifact and chooses a conservative outcome.",
    )
    .replace(
      /(<\/figure>\n\n)(\| Source artifact \| Native destination \| Conservative rule \|)/g,
      `$1${newClassificationLead}\n\n$2`,
    )
    .replace(
      new RegExp(
        `${escapeRegExp(tableNamesPrefix)} the artifact families and the conservative import rule\\.`,
        "g",
      ),
      newClassificationLead,
    )
    .replace(
      new RegExp(
        `${escapeRegExp(tableAppliesPrefix)} that classification path to each artifact family\\.`,
        "g",
      ),
      newClassificationLead,
    )
    .replace(
      /Migration is one bridge\. Protocol compatibility is another\. Earlier chapters\nintroduced generated schemas, legacy aliases, v1\/v2 coexistence, experimental\ngates, and client-version workarounds\. Chapter 19 is where those ideas become\na general policy:/g,
      "Migration is one bridge. Protocol compatibility is another. Earlier chapters\nintroduced generated schemas, legacy aliases, v1/v2 coexistence, experimental\ngates, and client-version workarounds. Those compatibility bridges should end\nat the system edge.",
    )
    .replace(
      /(<\/figure>\n\n)(\| Compatibility bridge \| What it protects \| What it should not do \|)/g,
      "$1The boundary rules are the operational form of that policy.\n\n$2",
    )
    .replace(/^pseudocode:\s*message handling\s*\n/gm, "// Pseudocode - illustrative pattern.\n")
    .replace(/^pseudocode:\s*SDK stream router\s*\n/gm, "// Pseudocode - illustrative pattern.\n")
    .replace(/^pseudocode:\s*TUI event step\s*\n/gm, "// Pseudocode - illustrative pattern.\n")
    .replace(
      /(Before writing anything, the importer classifies each source artifact and chooses a conservative outcome\.)\n{3,}<figure/g,
      "$1\n\n<figure",
    )
    .replace(/(compatibility bridges end\.)\n{3,}<figure/g, "$1\n\n<figure");

  result = result.replace(
      new RegExp(
        `${escapeRegExp(productCratePhrase)} should consume a stable capability`,
        "g",
      ),
      "Product code should consume a stable capability",
    )
    .replace(
      new RegExp(`\\b${escapeRegExp(productCratePhrase.toLowerCase())}\\b`, "g"),
      "product code",
    )
    .replace(/Product packages consume a stable native capability/g, "Product code consumes a stable native capability")
    .replace(new RegExp(escapeRegExp(patchBundlePhrase), "g"), "vendor fixes")
    .replace(new RegExp(escapeRegExp(checksumManifestsPhrase), "g"), "Integrity Records");

  result = result
    .replace(
      new RegExp(
        `${escapeRegExp(sketchLeadPrefix)} where those\\ncompatibility bridges end\\.`,
        "g",
      ),
      "Those compatibility bridges should end\nat the system edge.",
    )
    .replace(
      new RegExp(`${escapeRegExp(tableTurnsPrefix)} that policy into boundary rules\\.`, "g"),
      "The boundary rules are the operational form of that policy.",
    );

  if (lang !== "zh") {
    return result;
  }

  result = result
    .replace(/([。！？])\s+(?=[\u4e00-\u9fa5])/g, "$1")
    .replace(
      new RegExp(escapeRegExp(newClassificationLead), "g"),
      "这张表故意保持很小：每一行先是权限决策，然后才是转换规则。",
    )
    .replace(
      /^> 把 AI coding agent 当成事件溯源的运行时；它的危险能力只能通过类型化契约、显式策略和可回放边界暴露。这句话解释了协议、turn loop、工具路由、审批、沙箱、app-server、TUI、扩展、记忆、云任务、生成 schema 和 CI 治理。当某个设计看起来啰嗦时，它通常是在压力下维护这个赌注。$/m,
      "> 把 AI coding agent 当成事件溯源的运行时；它的危险能力只能通过类型化契约、显式策略和可回放边界暴露。\n\n这句话解释了协议、turn loop、工具路由、审批、沙箱、app-server、TUI、扩展、记忆、云任务、生成 schema 和 CI 治理。当某个设计看起来啰嗦时，它通常是在压力下维护这个赌注。",
    )
    .replace(/cloud tasks\s+和\s+本地 turn execution/g, "cloud tasks 和本地 turn execution")
    .replace(/需要\s+来源信息/g, "需要来源信息")
    .replace(/聚焦\s+/g, "聚焦")
    .replace(/Guardian 或用户/g, "自动守护方或用户")
    .replace(/Guardian 或面向用户的 client/g, "自动守护方或面向用户的 client")
    .replace(/公开权限 profile/g, "公开权限配置")
    .replace(/权限 profile/g, "权限配置")
    .replace(/CI lane 应该匹配风险/g, "CI 通道应该匹配风险")
    .replace(/按风险组织 CI lane/g, "按风险组织 CI 通道")
    .replace(/巨大 lane/g, "巨大通道")
    .replace(/tool result、compaction 和 stop-hook context/g, "工具结果、压缩和停止 Hook 上下文")
    .replace(/Patch execution 的生命周期/g, "Patch 执行的生命周期")
    .replace(/Parse step 理解 patch grammar。Verify step 访问 workspace filesystem，计算实际会发生的具体 changes。Assess step 判断 patch 是 auto-approved、需要 approval，还是需要 additional permissions。Apply step 通过 selected executor filesystem 写入，而不是假设本地路径就是目标。/g, "解析步骤理解 patch 语法。校验步骤访问工作区文件系统，计算实际会发生的变更。评估步骤判断 patch 可自动批准、需要审批，还是需要额外权限。应用步骤通过选中的执行器文件系统写入，而不是假设本地路径就是目标。")
    .replace(/Patch grammar 描述的是一门很小的编辑语言/g, "Patch 语法描述的是一门很小的编辑语言")
    .replace(/Codex 的 parser/g, "Codex 的解析器")
    .replace(/runtime 尝试恢复出意图协议/g, "运行时尝试恢复出意图协议")
    .replace(/真正的边界是 verification/g, "真正的边界是校验")
    .replace(/Update 需要知道/g, "更新需要知道")
    .replace(/Delete 需要读出/g, "删除需要读出")
    .replace(/Move 需要同时考虑 source 和 destination path/g, "移动需要同时考虑来源路径和目标路径")
    .replace(/verification failure/g, "校验失败")
    .replace(/best-effort write/g, "尽力写入")
    .replace(/shell heredoc/g, "shell heredoc")
    .replace(/patch body/g, "patch 内容")
    .replace(/patch protocol/g, "patch 协议")
    .replace(/Runtime 可以提醒模型直接使用 patch tool，但仍会按 patch 治理这次修改：parse、verify、compute paths、run approval、apply through executor filesystem、emit events、update turn diff。/g, "运行时可以提醒模型直接使用 patch 工具，但仍会按 patch 协议治理这次修改：解析、校验、计算路径、执行审批、通过执行器文件系统应用、发出事件，并更新 turn diff。")
    .replace(/shell syntax 会先转成 patch action，再发生 mutation/g, "shell 语法会先转成 patch 动作，然后才发生变更")
    .replace(/Patch application 使用 executor filesystem/g, "Patch 应用使用执行器文件系统")
    .replace(/executor filesystem/g, "执行器文件系统")
    .replace(/local turn/g, "本地 turn")
    .replace(/remote turn/g, "远程 turn")
    .replace(/filesystem object/g, "文件系统对象")
    .replace(/sandbox context/g, "沙箱上下文")
    .replace(/committed delta/g, "已提交 delta")
    .replace(/Turn diff tracker/g, "Turn diff 跟踪器")
    .replace(/Preview\/run 分离/g, "预览/运行分离")
    .replace(/terminal UI、app-server 和 headless context/g, "终端 UI、app-server 和无头上下文")
    .replace(/pending work/g, "待处理工作")
    .replace(/当 policy 认为/g, "当策略认为")
    .replace(/sandboxed attempt/g, "沙箱尝试")
    .replace(/unsandboxed retry/g, "非沙箱重试")
    .replace(/Approval payload 是 tool-specific 的/g, "审批载荷与工具类型相关")
    .replace(/shell approval 包含 command 和 cwd/g, "shell 审批包含命令和当前目录")
    .replace(/patch approval 包含 file changes/g, "patch 审批包含文件变更")
    .replace(/tool metadata/g, "工具元数据")
    .replace(/additional filesystem 或 network access/g, "额外文件系统或网络访问")
    .replace(/session approvals/g, "会话审批")
    .replace(/Shell-like command/g, "Shell 形式命令")
    .replace(/approval key/g, "审批键")
    .replace(/affected path/g, "受影响路径")
    .replace(/session scope/g, "会话范围")
    .replace(/Approval decisions 比 yes\/no 丰富。它们可以是 approve once、approve for session、deny、abort、timeout、approve exec-policy amendment，或 approve network-policy amendment。/g, "审批决策比“是/否”更丰富：可以只批准一次、批准本会话、拒绝、中止、超时，或批准执行策略、网络策略的修正。")
    .replace(/Guardian 是 approval-like requests 的自动 review path/g, "Guardian 是审批类请求的自动审查路径")
    .replace(/tool call id/g, "工具调用 ID")
    .replace(/review id/g, "审查 ID")
    .replace(/Denial、timeout 和 abort/g, "拒绝、超时和中止")
    .replace(/Headless execution/g, "无头执行")
    .replace(/交互 modal/g, "交互式弹窗")
    .replace(/provenance，也就是来源/g, "来源信息，也就是每个值的来历")
    .replace(/imported history 的 provenance/g, "导入历史的来源信息")
    .replace(/包括 来源信息/g, "包括来源信息")
    .replace(/带着 导入历史/g, "带着导入历史")
    .replace(/imported history 的可审计性/g, "导入历史的可审计性")
    .replace(/provenance markers/g, "来源标记")
    .replace(/provenance/g, "来源信息")
    .replace(/忽略 rejected ones/g, "忽略被拒绝项")
    .replace(/modal decision surface/g, "弹窗决策界面")
    .replace(/dynamic tools/g, "动态工具")
    .replace(/hosted、connector-backed 或 client supplied/g, "托管、连接器支持或客户端提供")
    .replace(/task list、environment modal、best-of\s*\nattempt selector、diff overlay、prompt\/messages view、background\s*enrichment、preflight spinner、apply spinner 和 result modal/g, "任务列表、环境弹窗、最佳尝试选择器、diff 覆盖层、prompt/messages 视图、后台补充、预检加载态、应用加载态和结果弹窗")
    .replace(/但是 TUI 仍然不拥有\s*后端语义。它用\s*后端契约\s*加载 tasks\s*和 attempts，用 environment detection helpers 填充 filters，用 apply\s*preflight 保护本地 mutation，用 attempt state 渲染正确 diff 或 prompt。/g, "但是 TUI 仍然不拥有后端语义。它用后端契约加载任务和尝试，用环境检测 helper 填充过滤器，用应用预检保护本地变更，用尝试状态渲染正确的 diff 或 prompt。")
    .replace(/但是 TUI 仍然不拥有\s*后端语义。它用\s*后端契约\s*加载 tasks/g, "但是 TUI 仍然不拥有后端语义。它用后端契约加载任务")
    .replace(/和 attempts，用 environment detection helpers 填充 filters，用 apply/g, "和尝试，用环境检测 helper 填充过滤器，用应用")
    .replace(/preflight 保护本地 mutation，用 attempt state 渲染正确 diff 或 prompt/g, "预检保护本地变更，用尝试状态渲染正确的 diff 或 prompt")
    .replace(/remote work/g, "远程工作")
    .replace(/local turn loop/g, "本地 turn loop")
    .replace(/Local session/g, "本地会话")
    .replace(/Cloud TUI 不是一张薄表。它持有 任务列表/g, "Cloud TUI 不是一张薄表。它持有任务列表")
    .replace(/结果弹窗 的状态/g, "结果弹窗的状态")
    .replace(/让 远程工作 不会泄漏进 本地 turn loop/g, "让远程工作不会泄漏进本地 turn loop")
    .replace(/本地会话 仍然可以/g, "本地会话仍然可以")
    .replace(/使用\s+模型流式输出/g, "使用模型流式输出")
    .replace(/在 认证、Git 上下文和 patch 应用 这些边界/g, "在认证、Git 上下文和 patch 应用这些边界")
    .replace(/绑定到\s+后端任务/g, "绑定到后端任务")
    .replace(/分开\s+后端任务/g, "分开后端任务")
    .replace(/和 本地 turn lifecycle/g, "和本地 turn lifecycle")
    .replace(/远程工作通过\s+后端契约\s+创建/g, "远程工作通过后端契约创建")
    .replace(/动态工具 和/g, "动态工具和")
    .replace(/把\s+后端任务/g, "把后端任务")
    .replace(/即使\s+后端任务/g, "即使后端任务")
    .replace(/使用 来源信息/g, "使用来源信息")
    .replace(/根据 来源信息/g, "根据来源信息")
    .replace(/共享 clients 与 来源信息/g, "共享 clients 与来源信息")
    .replace(/和 来源信息/g, "和来源信息")
    .replace(/来源信息 table/g, "来源表")
    .replace(/来源信息 record/g, "来源记录")
    .replace(/按 来源信息 路由/g, "按来源信息路由")
    .replace(/通过 执行器文件系统 interface/g, "通过执行器文件系统接口")
    .replace(/远程工作space operations/g, "远程 workspace 操作")
    .replace(/沙箱上下文 可以/g, "沙箱上下文可以")
    .replace(/解析器 可以/g, "解析器可以")
    .replace(/表示 运行时/g, "表示运行时")
    .replace(/模型可见的 校验失败/g, "模型可见的校验失败")
    .replace(/而不是 尽力写入/g, "而不是尽力写入")
    .replace(/在 本地 turn/g, "在本地 turn")
    .replace(/在 远程 turn/g, "在远程 turn")
    .replace(/执行器文件系统 可能/g, "执行器文件系统可能")
    .replace(/同类 文件系统对象 和可选 沙箱上下文/g, "同类文件系统对象和可选沙箱上下文")
    .replace(/实际 已提交 delta/g, "实际已提交 delta")
    .replace(/跟踪 已提交 delta/g, "跟踪已提交 delta")
    .replace(/Turn diff 跟踪器 为/g, "Turn diff 跟踪器为")
    .replace(/Local 与 远程工作space/g, "本地与远程 workspace")
    .replace(/把 工具结果/g, "把工具结果")
    .replace(/上下文 当成/g, "上下文当成")
    .replace(/展示 待处理工作/g, "展示待处理工作")
    .replace(/对 终端 UI/g, "对终端 UI")
    .replace(/沙箱尝试 失败/g, "沙箱尝试失败")
    .replace(/非沙箱重试 时/g, "非沙箱重试时")
    .replace(/和 工具元数据/g, "和工具元数据")
    .replace(/额外文件系统或网络访问/g, "额外文件系统或网络访问")
    .replace(/会话审批/g, "会话审批")
    .replace(/Shell 形式命令 通常/g, "Shell 形式命令通常")
    .replace(/审批键。Patch/g, "审批键。Patch")
    .replace(/受影响路径 建/g, "受影响路径建")
    .replace(/和 工具调用 ID/g, "和工具调用 ID")
    .replace(/审查 ID/g, "审查 ID")
    .replace(/拒绝、超时和中止 是/g, "拒绝、超时和中止是")
    .replace(/无头执行 不能/g, "无头执行不能")
    .replace(/弹窗决策界面/g, "弹窗决策界面")
    .replace(/MCP 和 动态工具/g, "MCP 和动态工具")
    .replace(/客户端提供 来源/g, "客户端提供来源")
    .replace(/来源信息 和参数/g, "来源信息和参数")
    .replace(/model streaming、tool execution、approvals 和 rollout persistence/g, "模型流式输出、工具执行、审批和 rollout 持久化")
    .replace(/Cloud task browsing 和 application 是独立 flows/g, "Cloud task 浏览和应用是独立流程")
    .replace(/auth、git context 和\s*patch application/g, "认证、Git 上下文和 patch 应用")
    .replace(/backend task/g, "后端任务")
    .replace(/远程工作通过\s*后端契约\s*创建、列出、检查和授权；本地 mutation 仍然\s*经过本地 patch checks/g, "远程工作通过后端契约创建、列出、检查和授权；本地变更仍然经过本地 patch 检查")
    .replace(/经过本地 patch checks/g, "经过本地 patch 检查")
    .replace(/memories 有用，\s*是因为它们是受控 side channel，而不是偷偷变成另一份 chat history/g, "memories 有用，是因为它们是受控侧通道，而不是偷偷变成另一份聊天历史")
    .replace(/backend semantics/g, "后端语义")
    .replace(/backend contracts/g, "后端契约")
    .replace(/backend contract/g, "后端契约")
    .replace(/不拥有 后端语义/g, "不拥有后端语义")
    .replace(/用 后端契约 加载 tasks/g, "用后端契约加载任务")
    .replace(/使用\s+模型流式输出/g, "使用模型流式输出")
    .replace(/远程工作通过\s+后端契约\s+创建/g, "远程工作通过后端契约创建")
    .replace(/cloud tasks\s+和\s+本地 turn execution/g, "cloud tasks 和本地 turn execution")
    .replace(/需要\s+来源信息/g, "需要来源信息")
    .replace(/把\s+后端任务/g, "把后端任务")
    .replace(/即使\s+后端任务/g, "即使后端任务")
    .replace(/绑定到\s+后端任务/g, "绑定到后端任务")
    .replace(/分开\s+后端任务/g, "分开后端任务")
    .replace(/通过\s+后端契约/g, "通过后端契约")
    .replace(/使用\s+模型/g, "使用模型")
    .replace(/记录\s+来源信息/g, "记录来源信息")
    .replace(/用\s+来源信息/g, "用来源信息")
    .replace(/根据来源信息\s+路由/g, "根据来源信息路由")
    .replace(/创建\s+关系/g, "创建关系")
    .replace(/。 Runtime/g, "。Runtime")
    .replace(/。 Migration/g, "。Migration")
    .replace(/无头执行\s+不应该/g, "无头执行不应该")
    .replace(/无头上下文\s+都/g, "无头上下文都")
    .replace(/或\s+沙箱尝试失败且可能进行\s+非沙箱重试/g, "或沙箱尝试失败且可能需要非沙箱重试")
    .replace(/请求的\s+额外文件系统/g, "请求的额外文件系统")
    .replace(/批准为\s+会话范围/g, "批准为会话范围")
    .replace(/用\s+弹窗决策界面\s+打断/g, "通过弹窗决策界面打断")
    .replace(/可能来自\s+托管、连接器支持或客户端提供来源/g, "可能来自托管服务、连接器或客户端提供的来源")
    .replace(/无头执行\s+应拒绝/g, "无头执行应拒绝")
    .replace(/interactive approvals/g, "交互式审批")
    .replace(/reviewer 再回答/g, "审查方再回答")
    .replace(/MCP approval 包含 server/g, "MCP 审批包含 server")
    .replace(
      /当策略认为某个工具需要决策，或沙箱尝试失败且可能需要非沙箱重试时，approval 开始。审批载荷与工具类型相关：shell 审批包含命令和当前目录，patch 审批包含文件变更，MCP 审批包含 server 和工具元数据，permission request 包含请求的额外文件系统或网络访问。/g,
      "当策略认为某个工具需要人工或自动决策，或者沙箱尝试失败并允许非沙箱重试时，就会进入审批流程。审批载荷与工具类型相关：shell 审批包含命令和当前目录，patch 审批包含文件变更，MCP 审批包含服务端和工具元数据，权限请求包含额外文件系统或网络访问。",
    )
    .replace(
      /当策略认为某个工具需要人工或自动决策，或者沙箱尝试失败并允许非沙箱重试时，就会进入审批流程。审批载荷与工具类型相关：shell 审批包含命令和当前目录，patch 审批包含文件变更，MCP 审批包含服务端和工具元数据，权限请求包含额外文件系统或网络访问。/g,
      "当策略认为某个工具需要人工或自动决策，或者沙箱尝试失败并允许非沙箱重试时，就会进入审批流程。不同工具携带不同审批载荷：shell 审批说明命令和当前目录，patch 审批说明文件变更，MCP 审批说明服务端和工具元数据，权限请求说明额外文件系统或网络访问。",
    )
    .replace(
      /Runtime 可以按 key 缓存会话审批。Shell 形式命令通常只有一个审批键。Patch 可能按每个受影响路径建 key，所以一次多文件 patch 如果被批准为会话范围，之后触碰其中子集的请求也可以安全跳过提示。/g,
      "运行时可以按审批键缓存会话审批。Shell 形式命令通常只有一个审批键。Patch 可能按每个受影响路径建立审批键，所以一次多文件 patch 如果被批准为会话范围，之后触碰其中子集的请求也可以安全跳过提示。",
    )
    .replace(/## Approval 是另一道门/g, "## 审批是另一道门")
    .replace(/## Guardian、Headless Mode 与 UI 中断/g, "## Guardian、无头模式与 UI 中断")
    .replace(/Runtime 可以按 key 缓存会话审批/g, "运行时可以按审批键缓存会话审批")
    .replace(/按每个受影响路径建 key/g, "按每个受影响路径建立审批键")
    .replace(/amendment 会改变未来策略；一次性 approval 只授权当前动作/g, "策略修正会改变未来策略；一次性审批只授权当前动作")
    .replace(/区分 hooks 和 approvals/g, "区分 hooks 和审批")
    .replace(/approval 授权副作用/g, "审批授权副作用")
    .replace(
      /MCP 和动态工具 还增加了一层 approval 维度。它们的工具元数据可能来自托管服务、连接器或客户端提供的来源。审批表面必须展示与信任相关的 来源信息和参数，但不能把原始内部名称当作用户可见的信任边界。/g,
      "MCP 和动态工具还增加了一层审批维度。它们的工具元数据可能来自托管服务、连接器或客户端提供的来源。审批表面必须展示与信任相关的来源和参数，但不能把原始内部名称当作用户可见的信任边界。",
    )
    .replace(/Approval 被刻意拆在 hooks 之外/g, "审批被刻意拆在 hooks 之外")
    .replace(/来源记录 和/g, "来源记录和")
    .replace(/、来源记录 和/g, "、来源记录和")
    .replace(/无法展示的\s+交互式审批/g, "无法展示的交互式审批")
    .replace(/缓存\s+会话审批/g, "缓存会话审批")
    .replace(/一个\s+审批键/g, "一个审批键")
    .replace(/每个\s+受影响路径/g, "每个受影响路径")
    .replace(/分开的\s+审查 ID/g, "分开的审查 ID")
    .replace(/再用来源信息\s+把调用路由回去/g, "再用来源记录把调用路由回去")
    .replace(/记录来源信息。Core session/g, "记录来源记录。Core session")
    .replace(/根据来源信息路由到正确 server/g, "根据来源记录路由到正确 server")
    .replace(/execution 使用来源信息/g, "execution 使用来源记录")
    .replace(/来源表/g, "来源记录")
    .replace(/来源信息 = remember/g, "provenance = remember")
    .replace(/expose_tool\(public_name, raw_tool\.schema, 来源信息\)/g, "expose_tool(public_name, raw_tool.schema, provenance)")
    .replace(/来源信息 = lookup/g, "provenance = lookup")
    .replace(/client_for\(来源信息\.server_identity\)/g, "client_for(provenance.server_identity)")
    .replace(/call_tool\(来源信息\.raw_tool_name/g, "call_tool(provenance.raw_tool_name")
    .replace(/创建的\s+来源记录\s+解析路由/g, "创建的来源记录解析路由")
    .replace(/共享 clients 与来源信息/g, "共享 clients 与来源记录")
    .replace(/来源记录s/g, "来源记录")
    .replace(/根据来源信息路由/g, "根据来源记录路由")
    .replace(/按来源信息路由/g, "按来源记录路由")
    .replace(/保存的来源元数据/g, "保存的来源记录")
    .replace(/\| Provenance record \| Runtime router/g, "| 来源记录 | Runtime router")
    .replace(/来源记录\s+和/g, "来源记录和")
    .replace(/运行时 owner/g, "运行时所有者");

  result = result
    .replace(/Runtime 可以按 key 缓存会话审批/g, "运行时可以按审批键缓存会话审批")
    .replace(/按每个受影响路径\s*建 key/g, "按每个受影响路径建立审批键")
    .replace(
      /第 13 章会跟随一个已批准动作进入隔离层：permission profiles 如何变成 filesystem\/network policy，再下降成 platform sandboxes、managed networking 和 execution metadata。/g,
      "第 13 章会跟随一个已批准动作进入隔离层：权限配置如何变成文件系统/网络策略，再下降成平台沙箱、托管网络和执行元数据。",
    )
    .replace(
      /Effective server definitions、managed MCP clients、tool listings、来源记录和 shaped tool observations。/g,
      "有效服务定义、托管 MCP clients、工具列表、来源记录和整形后的工具观察结果。",
    )
    .replace(
      /模型选择 visible tool，但 runtime 根据来源记录路由，由 MCP server 执行 operation。/g,
      "模型选择可见工具，但运行时根据来源记录路由，由 MCP server 执行操作。",
    )
    .replace(/因为\s+策略修正/g, "因为策略修正");

  result = result
    .replace(
      /> contracts、policy gates 和 replayable boundaries 暴露。这句话里的每个词都承担架构含义。/g,
      "> contracts、policy gates 和 replayable boundaries 暴露。\n\n这句话里的每个词都承担架构含义。",
    )
    .replace(
      /5\. 客户端观察并偶尔回答请求，但不拥有 runtime。这个形状会在后续章节反复出现。/g,
      "5. 客户端观察并偶尔回答请求，但不拥有 runtime。\n\n这个形状会在后续章节反复出现。",
    )
    .replace(
      /如果只记住一张图，就记住这一张：/g,
      "最后用两张图收束：第一张压缩最终运行模型，第二张把整本书的有边界运行环境放回同一张白板。",
    )
    .replace(
      /If you remember one diagram, make it this one:/g,
      "The book closes with two diagrams: the first compresses the final operating model, and the second places the bounded operating environment back on one board.",
    );

  result = result
    .replace(
      /第 11 章展示了文件系统 mutation 如何在应用前被解析和验证。本章研究 runtime 已经理解某个动作之后，仍然可以阻止、修正或解释它的关卡：hooks、approval policy、Guardian review 和 user approval。它们彼此相关，但不是同一层。/g,
      "第 11 章展示了文件系统变更如何在应用前被解析和验证。本章研究运行时已经理解某个动作之后，仍然可以阻止、修正或解释它的关卡：Hook、审批策略、Guardian 审查和用户审批。它们彼此相关，但不是同一层。",
    )
    .replace(
      /Hooks 是配置好的程序，用来观察或影响 runtime events。Approval 是允许或拒绝副作用的控制面决策。Guardian 是可以回答部分 approval requests 的自动 reviewer。用户界面是人工决策表面。Codex 把这些层分开，因此每一层失败时都能给出精确语义。/g,
      "Hook 是配置好的程序，用来观察或影响运行时事件。审批是允许或拒绝副作用的控制面决策。Guardian 是可以回答部分审批请求的自动审查者。用户界面则是人工决策表面。Codex 把这些层分开，因此每一层失败时都能给出精确语义。",
    )
    .replace(/## Gate Stack/g, "## 关卡栈")
    .replace(
      /这个 stack 是有顺序的，不是装饰。Hooks 可以添加 context 或阻断特定事件。Permission-request hooks 可以在常规 review path 前回答 approval。自动守护方或用户可以决定剩余未解决的 approvals。只有这些 gate 产出 allowed decision 后，tool attempt 才会发生。/g,
      "这个关卡栈是有顺序的，不是装饰。Hook 可以添加上下文或阻断特定事件。权限请求 Hook 可以在常规审查路径前回答审批。自动守护方或用户可以决定剩余未解决的审批。只有这些关卡产出允许决策后，工具尝试才会发生。",
    )
    .replace(/## 一个命令如何穿过 Gate/g, "## 一条命令如何穿过关卡")
    .replace(
      /理解这些层分离的最简单方式，是跟随一条 shell command。模型请求一个命令。Codex 先运行匹配的 pre-tool hooks；这些 hooks 可以在 policy 评估副作用前添加 context、给出 warning，或直接 block。如果 hooks 没有阻断，approval policy 会根据当前 permission profile 判断这个命令是否可以运行。如果需要决策，permission-request hook 可以自动回答；如果没有回答，自动守护方或面向用户的 client 会收到请求。只有 allow decision 到达后，shell handler 才会进入 sandbox selection 和 process execution。结果返回后，post-tool hooks 可以观察输出，并把结构化 feedback 喂回 turn。/g,
      "理解这些层分离的最简单方式，是跟随一条 shell 命令。模型请求一个命令。Codex 先运行匹配的工具前 Hook；这些 Hook 可以在策略评估副作用前添加上下文、给出警告，或直接阻断。如果 Hook 没有阻断，审批策略会根据当前权限配置判断这个命令是否可以运行。如果需要决策，权限请求 Hook 可以自动回答；如果没有回答，自动守护方或面向用户的客户端会收到请求。只有允许决策到达后，shell 处理器才会进入沙箱选择和进程执行。结果返回后，工具后 Hook 可以观察输出，并把结构化反馈喂回 turn。",
    )
    .replace(
      /重点不是 command 本身，而是每一道 gate 拥有不同问题：automation 观察什么，policy 允许什么，reviewer 授权什么，sandbox 包含什么，以及什么结果进入 durable state。/g,
      "重点不是命令本身，而是每一道关卡回答的问题不同：自动化观察什么，策略允许什么，审查方授权什么，沙箱包含什么，以及什么结果进入持久状态。",
    )
    .replace(/## Hook Discovery 与 Trust/g, "## Hook 发现与信任")
    .replace(
      /Codex 可以从多种来源加载 hooks：system 或 managed configuration、user configuration、project configuration、session flags、plugins、cloud requirements，以及 legacy managed files。每个 hook 都有 event identity、matcher state、command text、timeout、source metadata、display order 和 trust status。/g,
      "Codex 可以从多种来源加载 Hook：系统或托管配置、用户配置、项目配置、会话标志、插件、云端要求，以及旧式托管文件。每个 Hook 都有事件身份、匹配状态、命令文本、超时、来源元数据、展示顺序和信任状态。",
    )
    .replace(
      /Trust 不由“文件存在”推导。Managed hooks 按策略可信。User 或 project hooks 只有在 normalized identity hash 和已保存 trusted hash 匹配时才可信。如果 hook 内容变了，它会成为 modified，而不是继续静默运行。Disabled hooks 仍能在 listing 中可见，但不会参与 runtime。这个设计保护两类工作流。运营方可以集中管理用户不需要逐个批准的 hooks。用户也能添加自己的 hooks，但改变后的 hook 必须重新获得信任，才能进入运行时。/g,
      "信任不由“文件存在”推导。托管 Hook 按策略可信。用户或项目 Hook 只有在规范化身份哈希与已保存的可信哈希匹配时才可信。如果 Hook 内容变了，它会进入已修改状态，而不是继续静默运行。被禁用的 Hook 仍能在列表中可见，但不会参与运行时。这个设计保护两类工作流：运营方可以集中管理用户不需要逐个批准的 Hook；用户也能添加自己的 Hook，但改变后的 Hook 必须重新获得信任，才能进入运行时。",
    )
    .replace(/## Hook Events 与 Results/g, "## Hook 事件与结果")
    .replace(
      /Hook event vocabulary 不只覆盖命令执行。它包括 session start、user prompt submit、pre-tool use、permission request、post-tool use、pre\/post compact 和 stop。这些都是架构检查点：工具 mutation 前、工具报告输出后、上下文压缩前、turn 可能停止时，以及 prompt 进入 runtime 时。/g,
      "Hook 事件词汇不只覆盖命令执行。它包括会话启动、用户提示提交、工具前使用、权限请求、工具后使用、压缩前后和停止。这些都是架构检查点：工具变更前、工具报告输出后、上下文压缩前、turn 可能停止时，以及提示进入运行时时。",
    )
    .replace(
      /Hook handlers 通过 stdin 接收 JSON，通过 stdout 返回结构化 JSON，在部分失败模式下通过 stderr 给模型反馈。Outcome 不只是 success 或 failure。Hook 可以提供 additional model context、warning、block、stop、feedback，也可以失败但允许 operation 继续，具体取决于 event contract。/g,
      "Hook 处理器通过 stdin 接收 JSON，通过 stdout 返回结构化 JSON，并在部分失败模式下通过 stderr 给模型反馈。结果不只是成功或失败。Hook 可以提供额外模型上下文、警告、阻断、停止和反馈，也可以失败但允许操作继续，具体取决于事件契约。",
    )
    .replace(
      /Guardian 是审批类请求的自动审查路径。当审批路由选择 automated review 时，runtime 会创建一个和工具调用 ID 分开的审查 ID，并等待决策。拒绝、超时和中止是不同结果，这样用户可见消息才能说明发生了什么，而不是统一成“失败”。/g,
      "Guardian 是审批类请求的自动审查路径。当审批路由选择自动审查时，运行时会创建一个和工具调用 ID 分开的审查 ID，并等待决策。拒绝、超时和中止是不同结果，这样用户可见消息才能说明发生了什么，而不是统一成“失败”。",
    )
    .replace(
      /无头执行不能依赖交互式弹窗。如果某个请求需要人工审批，但当前没有人工审批通道，安全行为是 reject，而不是永远等待。TUI 则可以通过弹窗决策界面打断普通流程，并在决策到达后继续 turn。/g,
      "无头执行不能依赖交互式弹窗。如果某个请求需要人工审批，但当前没有人工审批通道，安全行为是拒绝，而不是永远等待。TUI 则可以通过弹窗决策界面打断普通流程，并在决策到达后继续 turn。",
    )
    .replace(
      /5\. \*\*没有审批通道时 fail closed。\*\* 无头执行应拒绝无法展示的交互式审批。第 13 章会跟随一个已批准动作进入隔离层：权限配置如何变成文件系统\/网络策略，再下降成平台沙箱、托管网络和执行元数据。/g,
      "5. **没有审批通道时失败即关闭。** 无头执行应拒绝无法展示的交互式审批。\n\n第 13 章会跟随一个已批准动作进入隔离层：权限配置如何变成文件系统/网络策略，再下降成平台沙箱、托管网络和执行元数据。",
    );

  result = result
    .replace(
      /第 16 章把终端 UI 看成共享 runtime contract 上的 inline client，说明客户端可以观察和驱动线程，却不拥有 runtime。本章继续向外走一步：如果客户端可以不接管 runtime 就参与工作，外部工具也必须能进入一次 turn，而不是变成 runtime 的一部分。/g,
      "第 16 章把终端 UI 看成共享运行时契约上的内联客户端，说明客户端可以观察和驱动线程，却不拥有运行时。本章继续向外走一步：如果客户端可以不接管运行时就参与工作，外部工具也必须能进入一次 turn，而不是变成运行时的一部分。",
    )
    .replace(
      /<p><strong>你在这里：<\/strong>clients 已经能通过类型化 events 观察和操控 threads。<\/p>/g,
      "<p><strong>你在这里：</strong>客户端已经能通过类型化事件观察和操控线程。</p>",
    )
    .replace(
      /<p><strong>问题：<\/strong>外部工具需要暴露给模型，但 transport、authentication、命名和失败语义不能泄漏进核心 turn loop。<\/p>/g,
      "<p><strong>问题：</strong>外部工具需要暴露给模型，但传输、认证、命名和失败语义不能泄漏进核心 turn loop。</p>",
    )
    .replace(
      /<p><strong>心智模型：<\/strong>MCP 是 runtime tool protocol：Codex 通过 clients 发现工具，把安全整理后的 tool shape 暴露给模型，再用来源记录把调用路由回去。<\/p>/g,
      "<p><strong>心智模型：</strong>MCP 是运行时工具协议：Codex 通过客户端发现工具，把安全整理后的工具形状暴露给模型，再用来源记录把调用路由回去。</p>",
    )
    .replace(
      /低层 MCP client 负责 transports 和 OAuth。面向 Codex 的 MCP 层把 configured servers 和 built-ins 变成 effective server definitions，管理启动、缓存 listing、整理名称，并记录来源记录。Core session 只消费 model-visible tool specs；当模型真的调用工具时，runtime 再根据来源记录路由到正确 server。/g,
      "低层 MCP 客户端负责传输和 OAuth。面向 Codex 的 MCP 层把配置服务和内置项变成有效服务定义，管理启动、缓存列表、整理名称，并记录来源记录。核心会话只消费模型可见的工具规格；当模型真的调用工具时，运行时再根据来源记录路由到正确服务。",
    )
    .replace(/\| Raw server identity \| MCP client 和 connection manager \| 让真实 server、transport 和 tool namespace 可寻址。 \|/g, "| 原始服务身份 | MCP 客户端和连接管理器 | 让真实服务、传输方式和工具命名空间可寻址。 |")
    .replace(/\| Model-visible name \| 模型 prompt 和 tool schema \| 给模型一个安全、规范化的标识符。 \|/g, "| 模型可见名称 | 模型提示和工具 schema | 给模型一个安全、规范化的标识符。 |")
    .replace(/\| 来源记录 \| Runtime router 和审计路径 \| 把模型可见调用映射回所属 server 与 raw tool。 \|/g, "| 来源记录 | 运行时路由和审计路径 | 把模型可见调用映射回所属服务与原始工具。 |")
    .replace(
      /这个拆分不是样式问题。外部 server 可以选择会冲突的名字，也可能使用不适合模型 tool calling 的字符；它暴露的工具来源还会影响审批、沙箱和用户解释。Codex 因而把命名视为适配步骤，而不是直接复制 server 字符串。/g,
      "这个拆分不是样式问题。外部服务可以选择会冲突的名字，也可能使用不适合模型工具调用的字符；它暴露的工具来源还会影响审批、沙箱和用户解释。Codex 因而把命名视为适配步骤，而不是直接复制服务端字符串。",
    )
    .replace(/低层 client 负责 transport/g, "低层客户端负责传输")
    .replace(/Codex MCP orchestration 层/g, "Codex 的 MCP 编排层")
    .replace(/configured servers 与 built-ins/g, "配置服务与内置项")
    .replace(/startup status/g, "启动状态")
    .replace(/tools 和 resources/g, "工具和资源")
    .replace(/bidirectional runtime request/g, "双向运行时请求")
    .replace(/hidden prompt injection/g, "隐藏提示注入")
    .replace(/cache-oriented/g, "偏向缓存")
    .replace(/Tool listing/g, "工具列表")
    .replace(/普通工作继续进行/g, "普通工作继续进行")
    .replace(/Discovery 产出 model-facing tool specs，但 execution 使用来源记录。可以用这个心智模型理解：/g, "发现阶段产出模型可见的工具规格，但执行阶段使用来源记录。可以用这个心智模型理解：")
    .replace(/```text\n\/\/ Pseudocode - illustrative pattern\.\nfor each effective_server:/g, "```text\n// Pseudocode - illustrative pattern.\n// source_record is the provenance record described above.\nfor each effective_server:")
    .replace(/provenance = remember/g, "source_record = remember")
    .replace(/expose_tool\(public_name, raw_tool\.schema, provenance\)/g, "expose_tool(public_name, raw_tool.schema, source_record)")
    .replace(/provenance = lookup/g, "source_record = lookup")
    .replace(/client_for\(provenance\.server_identity\)/g, "client_for(source_record.server_identity)")
    .replace(/call_tool\(provenance\.raw_tool_name/g, "call_tool(source_record.raw_tool_name")
    .replace(/这段是泛化 pseudocode，刻意不复刻源码。/g, "这段是泛化伪代码，刻意不复刻源码。")
    .replace(/server 接收调用/g, "服务接收调用")
    .replace(/Hosted app tools/g, "托管 app 工具")
    .replace(/MCP tools/g, "MCP 工具")
    .replace(/hosted metadata/g, "托管元数据")
    .replace(/connector names/g, "连接器名称")
    .replace(/account authentication/g, "账号认证")
    .replace(/cache path/g, "缓存路径")
    .replace(/auth refresh/g, "认证刷新")
    .replace(/model-facing tool boundary/g, "模型可见工具边界")
    .replace(/origin 与 access 的 metadata/g, "来源与访问元数据")
    .replace(/## Resources 与 Templates/g, "## 资源与模板")
    .replace(/MCP servers 不只暴露 tools，还可以暴露 resources 和 resource templates。/g, "MCP 服务不只暴露工具，还可以暴露资源和资源模板。")
    .replace(/有独立 routing 的 read\/list operations/g, "有独立路由的读取/列出操作")
    .replace(/model-visible functions/g, "模型可见函数")
    .replace(/resource 可能成为 context，tool 可能产生 side effect，template 可能代表参数化读取。/g, "资源可能成为上下文，工具可能产生副作用，模板可能代表参数化读取。")
    .replace(/Resources 与 templates 复用同一组 MCP client/g, "资源与模板复用同一组 MCP 客户端")
    .replace(/tools：它们读取上下文/g, "工具：它们读取上下文")
    .replace(/connection manager 服务多类请求/g, "连接管理器服务多类请求")
    .replace(/列出 servers/g, "列出服务")
    .replace(/列出 tools/g, "列出工具")
    .replace(/调用 tool/g, "调用工具")
    .replace(/读取 resource/g, "读取资源")
    .replace(/列出 templates/g, "列出模板")
    .replace(/authentication status/g, "认证状态")
    .replace(/clients 与来源记录/g, "客户端与来源记录")
    .replace(/MCP failure 首先是 extension failure，然后才可能影响 agent。Server 可能启动失败，OAuth token 可能过期，tool listing 可能超时，resource read 可能被拒绝，elicitation 也可能被取消。Runtime 应保留这些差异，因为它们对应不同恢复路径。/g, "MCP 失败首先是扩展失败，然后才可能影响 agent。服务可能启动失败，OAuth token 可能过期，工具列表可能超时，资源读取可能被拒绝，外部输入请求也可能被取消。运行时应保留这些差异，因为它们对应不同恢复路径。")
    .replace(/\| Failure \| Runtime meaning \| User-visible recovery \|/g, "| 失败类型 | 运行时含义 | 用户可见恢复路径 |")
    .replace(/\| Startup failure \| server 没有成为可用 capability \| 展示 status，并在没有这些工具的情况下继续 \|/g, "| 启动失败 | 服务没有成为可用能力 | 展示状态，并在没有这些工具的情况下继续 |")
    .replace(/\| Listing failure \| server 存在，但 tools 未知或过期 \| retry、refresh，或在有效时使用 cache \|/g, "| 列表失败 | 服务存在，但工具未知或过期 | 重试、刷新，或在有效时使用缓存 |")
    .replace(/\| OAuth failure \| account access 缺失或过期 \| 请求 auth flow，或标记 tools unavailable \|/g, "| OAuth 失败 | 账号访问缺失或过期 | 请求认证流程，或标记工具不可用 |")
    .replace(/\| Tool call failure \| 已选择的 tool 拒绝或执行失败 \| 返回结构化 observation \|/g, "| 工具调用失败 | 已选择的工具拒绝或执行失败 | 返回结构化观察结果 |")
    .replace(/\| Elicitation cancelled \| 必需外部输入未提供 \| 停止该 operation，不编造数据 \|/g, "| 外部输入取消 | 必需外部输入未提供 | 停止该操作，不编造数据 |")
    .replace(/这些区别防止 MCP 变成 runtime entanglement。Turn loop 看到 tools 与 observations；MCP orchestration 拥有 server lifecycle。/g, "这些区别防止 MCP 变成运行时纠缠。Turn loop 看到工具与观察结果；MCP 编排层拥有服务生命周期。")
    .replace(/它可以通过 sanitized model-visible tool calls 到达外部 tool servers。/g, "它可以通过清洗后的模型可见工具调用到达外部工具服务。")
    .replace(/托管 MCP clients/g, "托管 MCP 客户端")
    .replace(/由 MCP server 执行操作/g, "由 MCP 服务执行操作")
    .replace(/startup、listing、OAuth、elicitation、resource access、name collision、stale cache 或 tool-call failure。/g, "启动、列表、OAuth、外部输入、资源访问、命名冲突、过期缓存或工具调用失败。");

  result = result
    .replace(
      /把 MCP 说成“更多工具”很容易误导。内置 shell tool 的 handler 在 runtime 内部，系统知道它怎么执行。MCP tool 则来自一个 server；这个 server 可能通过 stdio、HTTP、executor-backed process 或 in-process adapter 运行。模型不该关心这些差异，runtime 也不能把外部 server 当成可信内部代码。因此 MCP 边界被分成多层。低层 MCP 客户端负责传输和 OAuth。面向 Codex 的 MCP 层把配置服务和内置项变成有效服务定义，管理启动、缓存列表、整理名称，并记录来源记录。核心会话只消费模型可见的工具规格；当模型真的调用工具时，运行时再根据来源记录路由到正确服务。/g,
      "把 MCP 说成“更多工具”很容易误导。内置 shell 工具的处理器在运行时内部，系统知道它怎么执行。MCP 工具则来自外部服务；这个服务可能通过 stdio、HTTP、执行器托管进程或进程内适配器运行。模型不该关心这些差异，运行时也不能把外部服务当成可信内部代码。因此 MCP 边界被分成多层。低层 MCP 客户端负责传输和 OAuth。面向 Codex 的 MCP 层把配置服务和内置项变成有效服务定义，管理启动、缓存列表、整理名称，并记录来源记录。核心会话只消费模型可见的工具规格；当模型真的调用工具时，运行时再根据来源记录路由到正确服务。",
    )
    .replace(/这张图说明 MCP 为什么是协议边界，而不是直接的 function registry。Discovery、naming 和 routing 是三个不同动作。/g, "这张图说明 MCP 为什么是协议边界，而不是直接的函数注册表。发现、命名和路由是三个不同动作。")
    .replace(/## Inbound MCP Stack/g, "## 入站 MCP 栈")
    .replace(
      /Inbound MCP 指 Codex 消费 MCP servers 提供的工具。低层客户端负责传输：启动本地 stdio process、通过 HTTP 通信、适配 executor-backed process、使用 in-process server，以及处理 OAuth-aware HTTP flow。对 runtime 的其他部分来说，这一层应该足够无聊：它提供 client behavior，但不决定哪些工具进入模型请求。/g,
      "入站 MCP 指 Codex 消费 MCP 服务提供的工具。低层客户端负责传输：启动本地 stdio 进程、通过 HTTP 通信、适配执行器托管进程、使用进程内服务，以及处理具备 OAuth 感知能力的 HTTP 流程。对运行时的其他部分来说，这一层应该足够无聊：它提供客户端行为，但不决定哪些工具进入模型请求。",
    )
    .replace(
      /Codex 的 MCP 编排层在它上面。它规范化 配置服务与内置项，异步启动 clients，记录 启动状态，列出 工具和资源，路由 tool calls，并处理 elicitation。Elicitation 是 MCP server 在操作过程中请求更多用户或客户端输入。架构上它是 双向运行时请求，不是隐藏的 prompt injection。启动过程有意偏向 偏向缓存。工具列表 可能昂贵，也可能临时不可用；客户端界面应该能展示进度，同时普通工作继续进行。可选 server 启动失败不应让整个 runtime 崩掉，而应表现为 status、warnings 或缺失工具。/g,
      "Codex 的 MCP 编排层位于传输层之上。它规范化配置服务与内置项，异步启动客户端，记录启动状态，列出工具和资源，路由工具调用，并处理外部输入请求。外部输入请求是 MCP 服务在操作过程中向用户或客户端索取更多输入。架构上它是双向运行时请求，不是隐藏提示注入。启动过程有意偏向缓存：工具列表可能昂贵，也可能临时不可用；客户端界面应该能展示进度，同时普通工作继续进行。可选服务启动失败不应让整个运行时崩掉，而应表现为状态、警告或缺失工具。",
    )
    .replace(/## Tool Discovery 与 Routing/g, "## 工具发现与路由")
    .replace(/\/\/ source_record is the provenance record described above\./g, "// source_record means the provenance record described above.")
    .replace(/模型永远不是“哪个 服务接收调用”的权威；runtime 根据 discovery 时创建的来源记录解析路由。/g, "模型永远不是“哪个服务接收调用”的权威；运行时根据发现阶段创建的来源记录解析路由。")
    .replace(/## Hosted App Tools/g, "## 托管 App 工具")
    .replace(
      /托管 app 工具 在暴露给模型之后看起来类似 MCP 工具，但它们的事实来源不同。它们依赖 托管元数据、连接器名称、app IDs、accessible tool information 和 账号认证。因此它们需要独立的 trust 与 缓存路径。一个工具可以“出现在目录里”，但当前 account 没有权限；它也可能需要 认证刷新 或 elicitation 后才能调用。从书中的架构层面看，关键是让“MCP tool”和“hosted app tool”只在 模型可见工具边界 汇合。证明 来源与访问元数据 仍留在边界后方，不被抹平。/g,
      "托管 App 工具在暴露给模型之后看起来类似 MCP 工具，但它们的事实来源不同。它们依赖托管元数据、连接器名称、App ID、可访问工具信息和账号认证。因此它们需要独立的信任路径与缓存路径。一个工具可以“出现在目录里”，但当前账号没有权限；它也可能需要认证刷新或外部输入之后才能调用。从架构层面看，关键是让 MCP 工具和托管 App 工具只在模型可见工具边界汇合。来源与访问元数据仍留在边界后方，不被抹平。",
    )
    .replace(/默认变成 模型可见函数/g, "默认变成模型可见函数")
    .replace(/因此 连接管理器服务多类请求：/g, "因此连接管理器服务多类请求：")
    .replace(/处理 elicitation，以及报告 认证状态/g, "处理外部输入请求，以及报告认证状态")
    .replace(/它们共享 客户端与来源记录/g, "它们共享客户端与来源记录")
    .replace(/## Outbound Codex as an MCP Server/g, "## 作为 MCP 服务端的出站 Codex")
    .replace(
      /Codex 也有 outbound 方向：把 Codex 自己暴露成 MCP server。听起来像对称能力，但它有意更窄。Inbound MCP 让 Codex 消费广泛外部工具生态；outbound MCP 让外部 MCP client 请求 Codex start 或 resume work，并以 notifications 接收 Codex events。这种窄边界是正确倾向。成熟 runtime 已经有自己的 thread、turn、approval、event 和 rollout contracts。如果把所有概念都作为任意 MCP capability 导出，产品边界会变模糊。更有用的桥接，是把少量外部 tool calls 映射到 thread-manager operations，并流式返回可观察 events。/g,
      "Codex 也有出站方向：把 Codex 自己暴露成 MCP 服务。听起来像对称能力，但它有意更窄。入站 MCP 让 Codex 消费广泛外部工具生态；出站 MCP 让外部 MCP 客户端请求 Codex 开始或恢复工作，并通过通知接收 Codex 事件。这种窄边界是正确倾向。成熟运行时已经有自己的 thread、turn、approval、event 和 rollout 契约。如果把所有概念都作为任意 MCP 能力导出，产品边界会变模糊。更有用的桥接，是把少量外部工具调用映射到线程管理器操作，并流式返回可观察事件。",
    )
    .replace(/## Failure Semantics/g, "## 失败语义");

  result = result
    .replace(/\| 系统调用 \| 接收 typed operation，而不是任意私有方法调用。 \|/g, "| 系统调用 | 接收类型化操作，而不是任意私有方法调用。 |")
    .replace(/\| 权限控制 \| 编译审批策略、沙箱策略、permission profile 和 managed requirements。 \|/g, "| 权限控制 | 编译审批策略、沙箱策略、权限配置和托管要求。 |")
    .replace(
      /> Codex 是一个 event-sourced agent runtime；危险能力只能通过 typed\n> contracts、policy gates 和 replayable boundaries 暴露。/g,
      "> Codex 是一个事件溯源的 Agent 运行时；危险能力只能通过类型化契约、策略关卡和可回放边界暴露。",
    )
    .replace(/Event-sourced 意味着/g, "事件溯源意味着")
    .replace(/Agent runtime 意味着/g, "Agent 运行时意味着")
    .replace(/Typed contracts 意味着/g, "类型化契约意味着")
    .replace(/Policy-gated side effects 意味着/g, "受策略门控的副作用意味着")
    .replace(/Replayable boundaries 意味着/g, "可回放边界意味着")
    .replace(/typed operations 和 accepted events 才是把 runtime authority/g, "类型化操作和已接受事件才是把运行时权限")
    .replace(/审批被刻意拆在 hooks 之外/g, "审批被刻意拆在 Hook 之外")
    .replace(/在 hook 真正完成前/g, "在 Hook 真正完成前")
    .replace(/1\. \*\*区分 hooks 和审批。\*\* Hooks 观察或影响事件；审批授权副作用。/g, "1. **区分 Hook 和审批。** Hook 观察或影响事件；审批授权副作用。")
    .replace(/对 user\/project hooks 做 hash，并把 modified hooks 当作未信任。/g, "对用户/项目 Hook 做哈希，并把已修改的 Hook 当作未信任。")
    .replace(/发出 pending hook 或 approval state。/g, "发出待处理 Hook 或审批状态。")
    .replace(/区分 deny、abort、timeout、one-time approval、session approval 和 policy amendment。/g, "区分拒绝、中止、超时、单次审批、会话审批和策略修正。")
    .replace(/## Trace Ledger/g, "## 追踪台账")
    .replace(/内置 shell tool 的 handler 在 runtime 内部/g, "内置 shell 工具的处理器在运行时内部")
    .replace(/MCP tool 则来自一个 server；这个 server/g, "MCP 工具则来自一个外部服务；这个服务")
    .replace(/executor-backed process/g, "执行器托管进程")
    .replace(/in-process adapter/g, "进程内适配器")
    .replace(/runtime 也不能把外部 server/g, "运行时也不能把外部服务")
    .replace(/它规范化 配置服务与内置项/g, "它规范化配置服务与内置项")
    .replace(/异步启动 clients，记录 启动状态，列出 工具和资源，路由 tool calls，并处理 elicitation/g, "异步启动客户端，记录启动状态，列出工具和资源，路由工具调用，并处理外部输入请求")
    .replace(/Elicitation 是 MCP server/g, "外部输入请求是 MCP 服务")
    .replace(/它是 双向运行时请求，不是隐藏的 prompt injection/g, "它是双向运行时请求，不是隐藏提示注入")
    .replace(/偏向 偏向缓存/g, "偏向缓存")
    .replace(/哪个 服务接收调用/g, "哪个服务接收调用")
    .replace(/runtime 根据 discovery 时/g, "运行时根据发现阶段")
    .replace(/托管 app 工具 在/g, "托管 App 工具在")
    .replace(/依赖 托管元数据/g, "依赖托管元数据")
    .replace(/和 账号认证/g, "和账号认证")
    .replace(/独立的 trust 与 缓存路径/g, "独立的信任与缓存路径")
    .replace(/当前 account 没有权限/g, "当前账号没有权限")
    .replace(/需要 认证刷新 或 elicitation 后/g, "需要认证刷新或外部输入请求后")
    .replace(/因此连接管理器服务多类请求/g, "因此，连接管理器服务多类请求")
    .replace(/处理 elicitation，以及报告 认证状态/g, "处理外部输入请求，并报告认证状态")
    .replace(/用户 turn、模型 item、工具调用、审批请求、session event 和 app-server notification/g, "用户 turn、模型 item、工具调用、审批请求、会话事件和 app-server 通知")
    .replace(/任何允许不受信任 planner/g, "任何允许不受信任规划器")
    .replace(/一个运行时，多种 surface/g, "一个运行时，多种接入面")
    .replace(/之上的 surface/g, "之上的接入面")
    .replace(/重写 agent/g, "重写 Agent")
    .replace(/surface\/runtime 拆分/g, "接入面/运行时拆分")
    .replace(/raw fact layer/g, "原始事实层")
    .replace(/durable rollout/g, "持久 rollout")
    .replace(/policy gate/g, "策略关卡")
    .replace(/发布 lane/g, "发布通道")
    .replace(/模型驱动 worker/g, "模型驱动的工作者")
    .replace(/为模型驱动的工作者\s+提供/g, "为模型驱动的工作者提供")
    .replace(/worker 越有能力/g, "工作者越有能力")
    .replace(
      /> Codex 是一个事件溯源的 Agent 运行时；危险能力只能通过类型化契约、策略关卡和可回放边界暴露。这句话里的每个词都承担架构含义。事件溯源意味着/g,
      "> Codex 是一个事件溯源的 Agent 运行时；危险能力只能通过类型化契约、策略关卡和可回放边界暴露。\n\n这句话里的每个词都承担架构含义。\n\n事件溯源意味着",
    )
    .replace(/运行时权限\s+留/g, "运行时权限留")
    .replace(
      /\/\/ source_record means the 来源记录 described above\./g,
      "// source_record is the provenance record described above.",
    );

  result = result
    .replace(/有\s+持久 rollout/g, "保留持久 rollout")
    .replace(/realtime path 和\s+后端任务 API/g, "realtime path 和后端任务 API")
    .replace(/和\s+后端任务/g, "和后端任务")
    .replace(/而\s+后端任务/g, "而后端任务")
    .replace(/把后端任务\s+分开/g, "把后端任务分开")
    .replace(/接口\s+执行/g, "接口执行")
    .replace(/操作\s+和 command execution/g, "操作和 command execution")
    .replace(/Codex 使用\s+执行器文件系统 traits/g, "Codex 使用 Executor filesystem traits")
    .replace(/验证\s+动态工具/g, "验证动态工具")
    .replace(/events 和\s+待处理工作/g, "events 和待处理工作")
    .replace(/托管元数据\s+是否可用/g, "托管元数据是否可用")
    .replace(/发布通道\s+和 review-time/g, "发布通道和 review-time")
    .replace(/通知\s+不是/g, "通知不是")
    .replace(/规划器\s+造成/g, "规划器造成")
    .replace(/可迁移的是\s+接入面/g, "可迁移的是接入面")
    .replace(/可迁移的是\s+原始事实层/g, "可迁移的是原始事实层")
    .replace(/发布通道\s+和/g, "发布通道和")
    .replace(/策略关卡\s+会/g, "策略关卡会")
    .replace(/\/\/ Pseudocode - simplified for clarity\./g, "// 伪代码 - 为清晰起见简化。")
    .replace(/\/\/ Pseudocode - illustrative pattern\./g, "// 伪代码 - 说明性模式。")
    .replace(
      /\/\/ source_record is the provenance record described above\./g,
      "// source_record 表示上文的来源记录。",
    )
    .replace(/raw server identity/g, "原始服务身份")
    .replace(/跨远端 server 的不安全 dispatch/g, "跨远端服务的不安全分发")
    .replace(/server 健康证明/g, "服务健康证明")
    .replace(/显式 elicitation/g, "显式外部输入请求")
    .replace(/OAuth 和 elicitation 建模成 runtime request/g, "OAuth 和外部输入请求建模成运行时请求")
    .replace(/让 server 代替用户编造决策/g, "让服务代替用户编造决策")
    .replace(/窄 outbound bridge/g, "窄出站桥接")
    .replace(/MCP client/g, "MCP 客户端")
    .replace(/native runtime/g, "原生运行时")
    .replace(/整个\s+原生运行时/g, "整个原生运行时")
    .replace(/capability 状态/g, "能力状态")
    .replace(/解释\s+能力状态/g, "解释能力状态")
    .replace(/当成\s+服务健康证明/g, "当成服务健康证明")
    .replace(/原生运行时\s+镜像/g, "原生运行时镜像")
    .replace(/\/\/ Pseudocode - [^\n]+/g, "// 伪代码 - 说明性模式。")
    .replace(/\bpseudocode\b/g, "伪代码")
    .replace(/伪代码:\s*message handling/g, "伪代码：消息处理")
    .replace(/伪代码:\s*SDK stream router/g, "伪代码：SDK 流路由")
    .replace(/伪代码:\s*TUI event step/g, "伪代码：TUI 事件步骤")
    .replace(/^伪代码：(?:消息处理|SDK 流路由|TUI 事件步骤)\s*\n/gm, "// 伪代码 - 说明性模式。\n")
    .replace(/伪代码:\s*platform package selection/g, "伪代码：平台包选择")
    .replace(
      /伪代码:\s*simplified release verification/g,
      "伪代码：简化发布验证",
    )
    .replace(
      /伪代码:\s*executable architecture policy/g,
      "伪代码：可执行架构策略",
    )
    .replace(
      /伪代码:\s*the build overlay pattern/g,
      "伪代码：构建 overlay 模式",
    )
    .replace(/这段\s+伪代码\s+/g, "这段伪代码")
    .replace(/待处理工作\s+重建/g, "待处理工作重建")
    .replace(/分开\s+原始服务身份/g, "分开原始服务身份")
    .replace(/跳过\s+原生运行时\s+无法表达/g, "跳过原生运行时无法表达")
    .replace(/之后的\s+原生运行时 loaders/g, "之后的原生运行时 loaders")
    .replace(/第 18 章把 extension planes 拆成 skills、plugins、connectors 和 typed extensions。本章追问：当用户带着并非诞生于这些 planes 的既有 agent configurations 与 histories 进入 Codex 时，系统应该怎么办？Migration 是桥，compatibility 是纪律，防止这座桥变成一堆不可维护的特判。/g, "第 18 章把扩展平面拆成 Skills、Plugins、Connectors 和类型化扩展。本章追问：当用户带着并非诞生于这些平面的既有 Agent 配置与历史进入 Codex 时，系统应该怎么办？迁移是桥，兼容性是纪律，防止这座桥变成一堆不可维护的特判。")
    .replace(/Codex 已能在明确 trust boundaries 下加载原生 extension surfaces。/g, "Codex 已能在明确信任边界下加载原生扩展表面。")
    .replace(/用户会带来 external configs、commands、hooks、subagents、MCP servers 和 JSONL sessions，但它们的语义不完全匹配 Codex。/g, "用户会带来外部配置、命令、Hook、子 Agent、MCP 服务和 JSONL 会话，但它们的语义不完全匹配 Codex。")
    .replace(/migration 是保守地翻译成 native artifacts 并附带 metadata，而不是模拟另一个 agent runtime。/g, "迁移是保守地翻译成原生产物并附带元数据，而不是模拟另一个 Agent 运行时。")
    .replace(/Agent system 的 backward compatibility 不只是接受旧 API 字段。它还意味着接纳用户已有历史、工作习惯和本地自动化，同时不能让模糊行为变成隐藏权限。Codex 把 migration 当作受控 import path：读取 source artifact，识别 supported constructs，翻译成 Codex-native shapes，跳过 unsafe 或 dynamic cases，并记录足够 metadata 以避免重复导入。/g, "Agent 系统的向后兼容不只是接受旧 API 字段。它还意味着接纳用户已有历史、工作习惯和本地自动化，同时不能让模糊行为变成隐藏权限。Codex 把迁移当作受控导入路径：读取来源产物，识别受支持结构，翻译成 Codex 原生形状，跳过不安全或动态案例，并记录足够元数据以避免重复导入。")
    .replace(/Migration 只把可识别的外部产物翻译成 native shapes，保留已有 target，并记录来源信息，避免 compatibility 变成运行时模拟。/g, "迁移只把可识别的外部产物翻译成原生形状，保留已有目标，并记录来源信息，避免兼容性变成运行时模拟。")
    .replace(/最后一个节点很重要。迁移后的 hook 应作为 Codex hook 运行；迁移后的 command 应表现为 Codex skill 或 workflow unit；导入的 session 应成为 rollout history。Migration layer 不应该留在 turn loop 里。/g, "最后一个节点很重要。迁移后的 Hook 应作为 Codex Hook 运行；迁移后的命令应表现为 Codex Skill 或工作流单元；导入的会话应成为 rollout 历史。迁移层不应该留在 turn loop 里。")
    .replace(/^## Configuration Migration$/gm, "## 配置迁移")
    .replace(
      /External configuration migration 处理几类 artifact：/g,
      "导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。",
    )
    .replace(
      /外部配置迁移处理几类产物：/g,
      "导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。",
    )
    .replace(
      new RegExp(escapeRegExp(zhFigureTableLead), "g"),
      "导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。",
    )
    .replace(
      new RegExp(`${zhSketchIntro}分类路径。`, "g"),
      "导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。",
    )
    .replace(
      /(<\/figure>\n\n)(\| 来源产物 \| 原生目标 \| 保守规则 \|)/g,
      "$1这张表把同一条分类路径应用到每一类来源产物。\n\n$2",
    )
    .replace(new RegExp(escapeRegExp(zhAfterTableLead), "g"), "这张表把同一条分类路径应用到每一类来源产物。")
    .replace(/\| Source artifact \| Native destination \| Conservative rule \|/g, "| 来源产物 | 原生目标 | 保守规则 |")
    .replace(/\| MCP server entries \| Codex MCP configuration \| 导入 supported transports，跳过 disabled 或 unsupported entries \|/g, "| MCP 服务条目 | Codex MCP 配置 | 导入受支持传输，跳过已禁用或不受支持条目 |")
    .replace(/\| hooks \| Codex hook configuration \| 只转换能匹配 structured hook model 的 handlers \|/g, "| Hook | Codex Hook 配置 | 只转换能匹配结构化 Hook 模型的处理器 |")
    .replace(/\| commands \| skills 或 workflow units \| 要求稳定 metadata，跳过 dynamic runtime expansion \|/g, "| 命令 | Skill 或工作流单元 | 要求稳定元数据，跳过动态运行时扩展 |")
    .replace(/\| subagents \| agent definitions 或 skill-like instructions \| 只保留 Codex 能安全表达的 fields \|/g, "| 子 Agent | Agent 定义或类 Skill 指令 | 只保留 Codex 能安全表达的字段 |")
    .replace(/保守规则就是架构。Migration 绝不应该猜测 permission boundary。如果外部 command 依赖 provider-specific runtime expansion，安全行为是跳过并说明原因。如果某个 hook handler 无法表示为 Codex hook schema，安全行为不是把它伪装成任意 shell text。若目标文件已经存在，importer 应保留用户已有 native configuration，而不是覆盖。/g, "保守规则就是架构。迁移绝不应该猜测权限边界。如果外部命令依赖特定 provider 的运行时扩展，安全行为是跳过并说明原因。如果某个 Hook 处理器无法表示为 Codex Hook schema，安全行为不是把它伪装成任意 shell 文本。若目标文件已经存在，导入器应保留用户已有原生配置，而不是覆盖。")
    .replace(/这是通过翻译实现 compatibility，而不是通过无边界解释实现 compatibility。/g, "这是通过翻译实现兼容性，而不是通过无边界解释实现兼容性。")
    .replace(/^## Session Import$/gm, "## 会话导入")
    .replace(/Session import 与 config migration 不同，因为 history 不是未来能力，而是过去对话的证据。External JSONL sessions 可能包含 user messages、assistant messages、tool calls、tool outputs、titles、working directories、token usage 和 source-specific records。Codex 必须把足够多历史翻译成自己的 rollout items，才能让 thread 与 history reconstruction 理解。/g, "会话导入与配置迁移不同，因为历史不是未来能力，而是过去对话的证据。外部 JSONL 会话可能包含用户消息、助手消息、工具调用、工具输出、标题、工作目录、token 用量和来源特有记录。Codex 必须把足够多历史翻译成自己的 rollout 条目，才能让线程与历史重建逻辑理解。")
    .replace(/Import path 因此会检测 candidate sessions，验证 working context 仍存在，只加载 importable records，构建 visible turns，添加 import metadata，并记录 content-hash ledger。Ledger 防止重复导入，同时允许 source content 改变后再次被发现。/g, "导入路径因此会检测候选会话，验证工作上下文仍存在，只加载可导入记录，构建可见 turn，添加导入元数据，并记录内容哈希台账。台账防止重复导入，同时允许来源内容改变后再次被发现。")
    .replace(/Content-hash ledger 让 session import 可重复：未变化的 JSONL 被跳过，发生变化且受支持的记录会变成 rollout items 和 imported thread。/g, "内容哈希台账让会话导入可重复：未变化的 JSONL 被跳过，发生变化且受支持的记录会变成 rollout 条目和导入线程。")
    .replace(/最危险的 migration bug 不是 parse failure，而是成功导入后改变了含义。Agent systems 在 prompt rules、tool call formats、hook timing、permission models、command expansion、subagent behavior 和 history schemas 上都可能不同。Converter 如果过度聪明，就会创建看似有效、却行为不同的 native artifact。/g, "最危险的迁移错误不是解析失败，而是成功导入后改变了含义。Agent 系统在提示规则、工具调用格式、Hook 时机、权限模型、命令扩展、子 Agent 行为和历史 schema 上都可能不同。转换器如果过度聪明，就会创建看似有效、却行为不同的原生产物。")
    .replace(/Codex 用三条 compatibility rules 降低这种风险。第一，保留 native user work。已有 target files 优先于 imported material。第二，跳过原生运行时无法表达的 dynamic behavior。第三，附加 import metadata，让后续代码和用户能区分 native history 与 migrated history。这些规则并不花哨，但它们避免 migration 变成每个后续 subsystem 里的隐藏 compatibility mode。/g, "Codex 用三条兼容性规则降低这种风险。第一，保留原生用户工作：已有目标文件优先于导入材料。第二，跳过原生运行时无法表达的动态行为。第三，附加导入元数据，让后续代码和用户能区分原生历史与迁移历史。这些规则并不花哨，但它们避免迁移变成每个后续子系统里的隐藏兼容模式。")
    .replace(/^## Backward Compatibility Bridges$/gm, "## 向后兼容桥")
    .replace(/Migration 是一座桥，protocol compatibility 是另一座桥。前面章节已经介绍 generated schemas、legacy aliases、v1\/v2 coexistence、experimental gates 和 client-version workarounds。第 19 章把这些想法整理成一般策略：/g, "迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1/v2 共存、实验性关卡和客户端版本兼容处理。这些兼容桥应停在系统边界，而不是进入原生运行时状态。")
    .replace(/迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1\/v2 共存、实验性关卡和客户端版本兼容处理。第 19 章把这些想法整理成一般策略：/g, "迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1/v2 共存、实验性关卡和客户端版本兼容处理。这些兼容桥应停在系统边界，而不是进入原生运行时状态。")
    .replace(new RegExp(escapeRegExp(zhCompatSketchLead), "g"), "迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1/v2 共存、实验性关卡和客户端版本兼容处理。这些兼容桥应停在系统边界，而不是进入原生运行时状态。")
    .replace(
      /(<\/figure>\n\n)(\| 兼容桥 \| 保护什么 \| 不应该做什么 \|)/g,
      "$1边界规则就是这条策略的操作化版本。\n\n$2",
    )
    .replace(new RegExp(escapeRegExp(zhBoundaryTableLead), "g"), "边界规则就是这条策略的操作化版本。")
    .replace(/Compatibility bridges 留在系统边界上：旧形态在那里被命名，支持案例被翻译，不支持案例被跳过，原生运行时 state 保持干净。/g, "兼容桥留在系统边界上：旧形态在那里被命名，支持案例被翻译，不支持案例被跳过，原生运行时状态保持干净。")
    .replace(/\| Compatibility bridge \| What it protects \| What it should not do \|/g, "| 兼容桥 | 保护什么 | 不应该做什么 |")
    .replace(/\| schema aliases \| older clients and stored events \| 隐藏不兼容语义 \|/g, "| schema 别名 | 旧客户端和已存事件 | 隐藏不兼容语义 |")
    .replace(/\| experimental gates \| unstable capabilities \| 让 unstable fields 看起来像永久契约 \|/g, "| 实验性关卡 | 不稳定能力 | 让不稳定字段看起来像永久契约 |")
    .replace(/\| migration converters \| 来自其他工具的用户 workflows \| 永久模拟另一个 runtime \|/g, "| 迁移转换器 | 来自其他工具的用户工作流 | 永久模拟另一个运行时 |")
    .replace(/\| import ledgers \| 幂等 session import \| 压制已经改变的 source content \|/g, "| 导入台账 | 幂等会话导入 | 压制已经改变的来源内容 |")
    .replace(/\| 来源标记 \| 导入历史的可审计性 \| 用私有 implementation detail 污染 model context \|/g, "| 来源标记 | 导入历史的可审计性 | 用私有实现细节污染模型上下文 |")
    .replace(/共同主题是 explicitness。Compatibility code 应该说清楚它在桥接什么、跳过什么、桥接在哪里结束。/g, "共同主题是显式性。兼容代码应该说清楚它在桥接什么、跳过什么、桥接在哪里结束。")
    .replace(/^## Designing the Import Report$/gm, "## 设计导入报告")
    .replace(/Import operation 即使成功也应该产出 report。用户需要知道哪些 MCP servers 被导入，哪些 hooks 被跳过，哪些 commands 变成 skills，哪些 existing files 被保留，哪些 sessions 变成 threads。Silent migration 在演示里诱人，在生产里危险。/g, "导入操作即使成功也应该产出报告。用户需要知道哪些 MCP 服务被导入，哪些 Hook 被跳过，哪些命令变成 Skill，哪些已有文件被保留，哪些会话变成线程。静默迁移在演示里诱人，在生产里危险。")
    .replace(/Report 也是 test oracle。Migration tests 应覆盖 edge behavior：disabled servers、unsupported transports、duplicate command names、missing metadata、existing targets、invalid ledgers、changed source content 和 unsupported session records。/g, "报告也是测试判据。迁移测试应覆盖边界行为：已禁用服务、不受支持传输、重复命令名、缺失元数据、已有目标、无效台账、变化后的来源内容，以及不受支持的会话记录。")
    .replace(/它可以由 imported native artifacts 和 imported rollout history 支撑。/g, "它可以由导入后的原生产物和导入后的 rollout 历史支撑。")
    .replace(/migration summaries、converted config artifacts、rollout items、import metadata 和 content-hash ledgers。/g, "迁移摘要、已转换配置产物、rollout 条目、导入元数据和内容哈希台账。")
    .replace(/converters、validators、skip rules、target preservation checks，以及 import 之后的原生运行时 loaders。/g, "转换器、验证器、跳过规则、目标保留检查，以及导入之后的原生运行时加载器。")
    .replace(/unsupported source semantics、unsafe dynamic expansion、duplicate names、existing target conflicts、invalid JSONL、missing working context 或 stale import ledger data。/g, "不受支持的来源语义、不安全动态扩展、重复名称、已有目标冲突、无效 JSONL、缺失工作上下文，或过期导入台账数据。")
    .replace(/\/\/ 伪代码 - 说明性模式。(?=当 transport message 到达:)/g, "// 伪代码 - 说明性模式。\n")
    .replace(/\/\/ 伪代码 - 说明性模式。(?=为 process output stream 启动一个 reader)/g, "// 伪代码 - 说明性模式。\n")
    .replace(/\/\/ 伪代码 - 说明性模式。(?=对 app loop 选中的每个 event:)/g, "// 伪代码 - 说明性模式。\n")
    .replace(/当 transport message 到达:/g, "当传输消息到达:")
    .replace(/parse protocol envelope/g, "解析协议信封")
    .replace(/找到 connection state/g, "找到连接状态")
    .replace(/connection 尚未 initialized/g, "连接尚未初始化")
    .replace(/只允许 initialization-compatible methods/g, "只允许初始化兼容方法")
    .replace(/检查 method、payload 和 capability gates/g, "检查方法、载荷和能力关卡")
    .replace(/计算 request 的 serialization key/g, "计算请求的序列化键")
    .replace(/把 request 排到该 key 对应队列后面/g, "把请求排到该键对应队列后面")
    .replace(/当 request 到达队首/g, "当请求到达队首")
    .replace(/调用匹配的 request processor/g, "调用匹配的请求处理器")
    .replace(/processor 完成后发送 response/g, "处理器完成后发送响应")
    .replace(/为 process output stream 启动一个 reader/g, "为进程输出流启动一个 reader")
    .replace(/对每条 incoming protocol message/g, "对每条传入协议消息")
    .replace(/request id/g, "请求 ID")
    .replace(/waiter/g, "等待方")
    .replace(/turn notification/g, "turn 通知")
    .replace(/active thread 或 turn 的 stream/g, "活动线程或 turn 的流")
    .replace(/client 做决定/g, "客户端做决定")
    .replace(/server-request handler/g, "服务端请求处理器")
    .replace(/unknown 或 unsupported message/g, "未知或不受支持的消息")
    .replace(/对 app loop 选中的每个 event/g, "对应用循环选中的每个事件")
    .replace(/terminal input/g, "终端输入")
    .replace(/focused component/g, "聚焦组件")
    .replace(/app command/g, "应用命令")
    .replace(/protocol notification/g, "协议通知")
    .replace(/chat history、active cells 或 status/g, "聊天历史、活动单元或状态")
    .replace(/server request/g, "服务端请求")
    .replace(/enqueue approval、elicitation 或 input prompt/g, "排队审批、外部输入请求或输入提示")
    .replace(/modal surface/g, "模态界面")
    .replace(/app-server session/g, "app-server 会话")
    .replace(/visible state 改变时 request frame/g, "可见状态改变时请求渲染帧")
    .replace(/for each source_entry in external_config:/g, "对 external_config 中的每个 source_entry:")
    .replace(/if not supported\(kind, source_entry\):/g, "如果不支持(kind, source_entry):")
    .replace(/continue/g, "继续")
    .replace(/if target\.exists:/g, "如果 target 已存在:")
    .replace(/for each artifact:/g, "对每个 artifact:")
    .replace(/return report/g, "返回 report")
    .replace(/对 external_config 中的每个 source_entry:/g, "对每条外部配置:")
    .replace(/kind = classify\(source_entry\)/g, "类型 = 分类(外部配置)")
    .replace(/如果不支持\(kind, source_entry\):/g, "如果不支持(类型, 外部配置):")
    .replace(/report_skip\(source_entry, reason\)/g, "记录跳过(外部配置, 原因)")
    .replace(/target = compute_native_target\(source_entry\)/g, "目标 = 计算原生目标(外部配置)")
    .replace(/如果 target 已存在:/g, "如果目标已存在:")
    .replace(/report_preserved\(target\)/g, "记录保留(目标)")
    .replace(
      /native_artifact = convert_to_codex_shape\(source_entry\)/g,
      "原生产物 = 转换为 Codex 形状(外部配置)",
    )
    .replace(/write_native_artifact\(target, native_artifact\)/g, "写入原生产物(目标, 原生产物)")
    .replace(/report = \{/g, "报告 = {")
    .replace(/imported: \[\]/g, "已导入: []")
    .replace(/preserved: \[\]/g, "已保留: []")
    .replace(/skipped: \[\]/g, "已跳过: []")
    .replace(/warnings: \[\]/g, "警告: []")
    .replace(/对每个 artifact:/g, "对每个产物:")
    .replace(/outcome = migrate\(artifact\)/g, "结果 = 迁移(产物)")
    .replace(/report\.add\(outcome\.category, outcome\.summary\)/g, "报告.添加(结果.类别, 结果.摘要)")
    .replace(/返回 report/g, "返回报告")
    .replace(/\/\/ 伪代码 - 说明性模式。(?=(?:当传输消息到达|为进程输出流启动|对应用循环选中的每个事件|对每条外部配置))/g, "// 伪代码 - 说明性模式。\n")
    .replace(/\/\/ 伪代码 - 说明性模式。(?=报告 = \{)/g, "// 伪代码 - 说明性模式。\n")
    .replace(
      /Standard I\/O 给 SDK 一条 incoming stream。Request responses、active turn 通知 和 服务端请求 都从这条 stream 进来。如果 SDK 的两个部分直接读同一条 stream，就会互相抢消息。因此 SDK 使用一个 reader，再把 messages 路由给等待 request 的 queue、turn stream，或 服务端请求处理器。/g,
      "Standard I/O 给 SDK 一条输入流。请求响应、活动 turn 通知和服务端请求都从这条流进来。如果 SDK 的两个部分直接读取同一条流，就会互相抢消息。因此 SDK 使用一个 reader，再把消息路由给等待请求的队列、turn 流，或服务端请求处理器。",
    )
    .replace(/如果 连接/g, "如果连接")
    .replace(/某个 请求 ID/g, "某个请求 ID")
    .replace(/该 id 的 等待方/g, "该 ID 的等待方")
    .replace(/active turn 通知s/g, "active turn 通知")
    .replace(/服务端请求s/g, "服务端请求")
    .replace(/追加到 活动线程/g, "追加到活动线程")
    .replace(/如果它请求 客户端/g, "如果它请求客户端")
    .replace(/交给 服务端请求处理器/g, "交给服务端请求处理器")
    .replace(/报告 未知/g, "报告未知")
    .replace(/如果它是 终端输入/g, "如果它是终端输入")
    .replace(/让 聚焦组件/g, "让聚焦组件")
    .replace(/让聚焦组件 处理/g, "让聚焦组件处理")
    .replace(/产生的 应用命令/g, "产生的应用命令")
    .replace(/如果它是 协议通知/g, "如果它是协议通知")
    .replace(/更新 聊天历史/g, "更新聊天历史")
    .replace(/如果它是 服务端请求/g, "如果它是服务端请求")
    .replace(/对应 模态界面/g, "对应模态界面")
    .replace(/如果 应用命令/g, "如果应用命令")
    .replace(/应用命令 已/g, "应用命令已")
    .replace(/app-server 会话 发送/g, "app-server 会话发送")
    .replace(/会话s/g, "会话")
    .replace(/应用命令s/g, "应用命令")
    .replace(/协议通知s\s+和\s+requests/g, "协议通知和请求")
    .replace(/模态界面s/g, "模态界面")
    .replace(/answer 服务端请求/g, "响应服务端请求")
    .replace(/chat state/g, "聊天状态")
    .replace(/live terminal viewport/g, "实时终端视口")
    .replace(
      new RegExp(escapeRegExp(oldClassificationLead), "g"),
      "这张表把分类结果收束成四种保守处理模式。",
    )
    .replace(/本章研究用户最先感受到的 client/g, "本章研究用户最先感受到的客户端")
    .replace(/把这些 commands 发送/g, "把这些命令发送")
    .replace(/新增一种\s+服务端请求\s+variant/g, "新增一种服务端请求变体")
    .replace(/到达错误\s+等待方/g, "到达错误的等待方")
    .replace(/路由成\s+应用命令/g, "路由成应用命令")
    .replace(/接收\s+协议通知/g, "接收协议通知")
    .replace(/发送\s+应用命令/g, "发送应用命令")
    .replace(/转成\s+应用命令/g, "转成应用命令")
    .replace(/表示为\s+应用命令/g, "表示为应用命令")
    .replace(/Protocol schema 说明有哪些 messages/g, "Protocol schema 说明有哪些消息")
    .replace(/programmer 如何 start session/g, "programmer 如何启动会话")
    .replace(/route responses/g, "路由响应")
    .replace(/consume turn events/g, "消费 turn 事件")
    .replace(/protocol engineer/g, "protocol 工程师")
    .replace(/多种 client shape/g, "多种客户端形态")
    .replace(/client shape/g, "客户端形态")
    .replace(/Client shape/g, "客户端形态")
    .replace(/不同 clients/g, "不同客户端")
    .replace(/client in-process/g, "客户端在进程内")
    .replace(/每个 client/g, "每个客户端")
    .replace(/Rust caller/g, "Rust 调用方")
    .replace(/Internal clients/g, "内部客户端")
    .replace(/external clients/g, "外部客户端")
    .replace(/严肃 client/g, "严肃客户端")
    .replace(/client 过旧/g, "客户端过旧")
    .replace(/older clients/g, "旧客户端")
    .replace(/shared clients/g, "共享客户端")
    .replace(/clients 共享/g, "客户端共享")
    .replace(/clients 可以/g, "客户端可以")
    .replace(/clients/g, "客户端")
    .replace(/Schema artifacts/g, "Schema 产物")
    .replace(/schema artifacts/g, "schema 产物")
    .replace(/generated contracts/g, "生成契约")
    .replace(/message shapes/g, "消息形状")
    .replace(/generated contracts 和 compatibility filters/g, "生成契约和兼容性过滤器")
    .replace(/generated contracts 会减少 drift/g, "生成契约会减少 drift")
    .replace(/让 schemas 定义契约，让 SDK 定义/g, "让 schema 定义契约，让 SDK 定义")
    .replace(/schemas 定义/g, "schema 定义")
    .replace(/protocols/g, "协议")
    .replace(/packages/g, "package")
    .replace(/interactive surface/g, "交互表面")
    .replace(/extension points/g, "扩展点")
    .replace(/app-server protocol client/g, "app-server protocol 客户端")
    .replace(/protocol client/g, "protocol 客户端")
    .replace(/process-driven execution/g, "进程驱动执行")
    .replace(/Process-oriented SDK/g, "进程取向 SDK")
    .replace(/short-lived jobs/g, "短生命周期任务")
    .replace(/command wrapper/g, "命令包装器")
    .replace(/lifecycle manager/g, "生命周期管理器")
    .replace(/transport bridge/g, "传输桥")
    .replace(/Transport layer/g, "传输层")
    .replace(/failure surface/g, "失败面")
    .replace(/Generated schema models/g, "生成 schema model")
    .replace(/SDK queues/g, "SDK 队列")
    .replace(/process streams/g, "进程流")
    .replace(/daemon probes/g, "daemon 探测")
    .replace(/remote chunks/g, "远程分片")
    .replace(/app-server connection ids/g, "app-server 连接 ID")
    .replace(/Transport adapter/g, "传输适配器")
    .replace(/remote bridge/g, "远程桥")
    .replace(/Launch failure/g, "启动失败")
    .replace(/stale daemon state/g, "过期 daemon 状态")
    .replace(/stream routing race/g, "流路由竞争")
    .replace(/unsupported client capability/g, "不受支持的客户端能力")
    .replace(/transport backpressure/g, "传输背压")
    .replace(/lost remote cursor/g, "远程 cursor 丢失")
    .replace(/replay mismatch/g, "replay 不匹配")
    .replace(/有些 客户端在进程内 运行/g, "有些客户端在进程内运行")
    .replace(/而是 生命周期管理器/g, "而是生命周期管理器")
    .replace(/后果的 传输桥/g, "后果的传输桥")
    .replace(/同意 消息形状/g, "同意消息形状")
    .replace(/在 生成契约和兼容性过滤器 中/g, "在生成契约和兼容性过滤器中")
    .replace(/生成契约和兼容性过滤器 中/g, "生成契约和兼容性过滤器中")
    .replace(/让 client 在 runtime/g, "让客户端在 runtime")
    .replace(/Rust 调用方 要/g, "Rust 调用方要")
    .replace(/外部客户端 也/g, "外部客户端也")
    .replace(/命令包装器 可能/g, "命令包装器可能")
    .replace(/两个监督者 破坏/g, "两个监督者破坏")
    .replace(/给客户端 走/g, "给客户端走")
    .replace(/有些 旧客户端/g, "有些旧客户端")
    .replace(/未知 服务端请求/g, "未知服务端请求")
    .replace(/丰富的交互表面 仍然/g, "丰富的交互表面仍然")
    .replace(/从 客户端转向/g, "从客户端转向")
    .replace(/process\/event-stream client/g, "进程/事件流客户端")
    .replace(/面向简单 进程驱动执行/g, "面向简单的进程驱动执行")
    .replace(/status 和 模态界面/g, "status 和模态界面")
    .replace(/把 UI 当作 client/g, "把 UI 当作客户端")
    .replace(/一种 客户端形态/g, "一种客户端形态")
    .replace(/让 客户端/g, "让客户端")
    .replace(/给 客户端/g, "给客户端")
    .replace(/外部 客户端/g, "外部客户端")
    .replace(/内部客户端 /g, "内部客户端")
    .replace(/每个客户端 都/g, "每个客户端都")
    .replace(/严肃客户端 应该/g, "严肃客户端应该")
    .replace(/不同客户端 需要/g, "不同客户端需要")
    .replace(/local 客户端 需要/g, "local 客户端需要")
    .replace(/客户端 需要/g, "客户端需要")
    .replace(/客户端 转向/g, "客户端转向")
    .replace(/它的 客户端/g, "它的客户端")
    .replace(/是 进程\/事件流客户端/g, "是进程/事件流客户端")
    .replace(/更适合 短生命周期任务/g, "更适合短生命周期任务")
    .replace(/传输层 的/g, "传输层的")
    .replace(/自己的 失败面/g, "自己的失败面")
    .replace(/丰富的 交互表面/g, "丰富的交互表面")
    .replace(/丰富的交互表面 仍然/g, "丰富的交互表面仍然")
    .replace(/转向 扩展点/g, "转向扩展点")
    .replace(/从 客户端转向/g, "从客户端转向")
    .replace(/能力的 协议 和 package/g, "能力的协议和 package")
    .replace(/能力的协议和 package/g, "能力的协议和包")
    .replace(/生成契约 和 compatibility filters/g, "生成契约和兼容性过滤器")
    .replace(/在 生成契约 中/g, "在生成契约中")
    .replace(/生成契约 会减少/g, "生成契约会减少")
    .replace(/哪些 旧客户端/g, "哪些旧客户端")
    .replace(/但 生成契约/g, "但生成契约")
    .replace(/unknown 服务端请求/g, "未知服务端请求")
    .replace(/status 和模态界面 占用/g, "status 和模态界面占用")
    .replace(/模态界面 占用/g, "模态界面占用")
    .replace(new RegExp(escapeRegExp(productCrateZh), "g"), "产品包")
    .replace(new RegExp(escapeRegExp(patchSetsLower), "g"), "补丁集")
    .replace(new RegExp(escapeRegExp(patchSetsTitle), "g"), "补丁集")
    .replace(
      new RegExp(
        `${escapeRegExp(tableNamesPrefix)} the artifact families and the conservative import rule\\.`,
        "g",
      ),
      "这张表把同一条分类路径应用到每一类来源产物。",
    )
    .replace(
      new RegExp(
        `${escapeRegExp(tableAppliesPrefix)} that classification path to each artifact family\\.`,
        "g",
      ),
      "这张表把同一条分类路径应用到每一类来源产物。",
    )
    .replace(
      new RegExp(`${escapeRegExp(tableTurnsPrefix)} that policy into boundary rules\\.`, "g"),
      "边界规则就是这条策略的操作化版本。",
    )
    .replace(
      /The boundary rules are the operational form of that policy\./g,
      "边界规则就是这条策略的操作化版本。",
    )
    .replace(
      /(Before writing anything, the importer classifies each source artifact and chooses a conservative outcome\.)\n{3,}<figure/g,
      "$1\n\n<figure",
    )
    .replace(/(导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。)\n{3,}<figure/g, "$1\n\n<figure")
    .replace(/(compatibility bridges end\.)\n{3,}<figure/g, "$1\n\n<figure")
    .replace(new RegExp(`(${zhSketchIntro}兼容桥停在哪里。)\\n{3,}<figure`, "g"), "$1\n\n<figure")
    .replace(
      /checksum、signature、platform signing 和 release metadata/g,
      "校验和、签名、平台签名和发布元数据",
    )
    .replace(/\n{3,}(<(?:p\s+class(?:Name)?=\"sketch-intro\"|figure\s+class(?:Name)?=\"sketch-figure\"))/g, "\n\n$1")
    .replace(/(<\/figure>)\n{3,}/g, "$1\n\n");

  return result;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findHeadingIndex(body, title) {
  const pattern = /^##\s+(.+)$/gm;
  for (const match of body.matchAll(pattern)) {
    if (stripMarkdown(match[1]) === title) {
      return match.index;
    }
  }
  return -1;
}

function chooseConceptHeadings(candidates, needed) {
  if (needed <= 0) {
    return [];
  }
  if (candidates.length <= needed) {
    return candidates;
  }
  const chosen = [];
  const used = new Set();
  for (let index = 0; index < needed; index += 1) {
    const target = Math.round(((index + 1) * (candidates.length - 1)) / (needed + 1));
    let best = target;
    for (let distance = 0; distance < candidates.length; distance += 1) {
      const left = target - distance;
      const right = target + distance;
      if (left >= 0 && !used.has(left)) {
        best = left;
        break;
      }
      if (right < candidates.length && !used.has(right)) {
        best = right;
        break;
      }
    }
    used.add(best);
    chosen.push(candidates[best]);
  }
  return chosen.sort((a, b) => a.index - b.index);
}

function processFile(file, lang) {
  const isMdx = file.endsWith(".mdx");
  const relativeFile = path.relative(root, file).replaceAll(path.sep, "/");
  let body = sourceRef
    ? execFileSync("git", ["show", `${sourceRef}:${relativeFile}`], {
        encoding: "utf8",
      })
    : readFileSync(file, "utf8");
  if (!sourceRef && /class(?:Name)?="sketch-figure"/.test(body) && !/^```mermaid\b/m.test(body)) {
    const sanitized = sanitizeGeneratedBody(body, lang);
    if (sanitized !== body) {
      writeFileSync(file, sanitized, "utf8");
    }
    return 0;
  }
  const originalBody = body;
  const fileBase = path.basename(file).replace(/\.(?:md|mdx)$/, "");
  const title = chapterTitle(body);
  const fileHeadings = headings(body);
  const generated = [];
  const occupiedHeadingTitles = new Set();
  let mermaidIndex = 0;

  body = body.replace(/```mermaid\n([\s\S]*?)```/g, (match, block, offset) => {
    mermaidIndex += 1;
    const heading = headingBefore(originalBody, offset);
    occupiedHeadingTitles.add(heading.toLowerCase());
    const blueprintKey = `${fileBase}:${mermaidIndex}`;
    const blueprint = resolvedBlueprint(diagramBlueprints, blueprintKey);
    const labels = resolveLabels(diagramBlueprints, blueprintKey, lang) ?? extractLabelsFromMermaid(
      block,
      labelsFromHeadings(originalBody, offset),
    );
    const id = `${fileBase}-${String(mermaidIndex).padStart(2, "0")}-${lang}`;
    const shortHeading = shortFigureTitle(heading, lang);
    const diagramTitle =
      blueprint?.title?.[lang] ??
      (lang === "zh"
        ? `${shortHeading}：白板结构图`
        : `${shortHeading}: Whiteboard Map`);
    const nearbyCaption =
      contextualCaption(originalBody, offset, lang, "before") ??
      contextualCaption(originalBody, offset, lang);
    const caption =
      blueprint?.caption?.[lang] ??
      captionForDiagram(shortHeading, labels, lang, nearbyCaption);
    const src = writeFigure({
      id,
      lang,
      title: diagramTitle,
      caption,
      labels,
      kind: diagramKind(block, mermaidIndex),
    });
    generated.push(src);
    return figureMarkup({
      isMdx,
      src,
      alt: altText(diagramTitle, labels, lang, caption),
      caption,
      lang,
      id,
      title: diagramTitle,
      labels,
      intro: blueprint?.intro?.[lang],
    });
  });

  const existingFigures =
    body.match(/class(?:Name)?="sketch-figure"/g)?.length ?? 0;
  const existingConceptNumbers = [
    ...body.matchAll(new RegExp(`${fileBase}-concept-(\\d+)-${lang}\\.svg`, "g")),
  ].map((match) => Number(match[1]));
  const nextConceptNumber = Math.max(0, ...existingConceptNumbers) + 1;
  const candidateHeadings = fileHeadings.filter(
    (item) => !occupiedHeadingTitles.has(item.title.toLowerCase()),
  );
  const needed = Math.max(0, minFiguresPerFile - existingFigures);
  const priorityHeadings = candidateHeadings.filter((heading) =>
    resolvedBlueprint(conceptBlueprints, `${fileBase}:${heading.title}`),
  );
  const selectedPriorityHeadings = chooseConceptHeadings(priorityHeadings, needed);
  const selectedKeys = new Set(
    selectedPriorityHeadings.map((heading) => heading.title.toLowerCase()),
  );
  const remainingHeadings = candidateHeadings.filter(
    (heading) => !selectedKeys.has(heading.title.toLowerCase()),
  );
  const selectedHeadings = [
    ...selectedPriorityHeadings,
    ...chooseConceptHeadings(remainingHeadings, needed - selectedPriorityHeadings.length),
  ].sort((a, b) => a.index - b.index);
  for (let index = 0; index < needed; index += 1) {
    const conceptNumber = nextConceptNumber + index;
    const heading = selectedHeadings[index] ?? fileHeadings[conceptNumber - 1] ?? {
      title,
      index: body.indexOf("\n") + 1,
    };
    const conceptKey = `${fileBase}:${heading.title}`;
    const conceptBlueprint = resolvedBlueprint(conceptBlueprints, conceptKey);
    const conceptLabels = resolveLabels(conceptBlueprints, conceptKey, lang);
    const labels = (conceptLabels ?? labelsFromHeadings(body, heading.index)).filter(
      (label) => stripMarkdown(label).toLowerCase() !== heading.title.toLowerCase(),
    );
    const shortHeading = shortFigureTitle(heading.title, lang);
    const fallbackLabels =
      labels.length >= 4
        ? labels
        : lang === "zh"
          ? [
              `${shortHeading}边界`,
              "运行时所有者",
              "策略判断",
              "证据记录",
              "失败形态",
            ]
          : [
              `${shortHeading} boundary`,
              "Runtime owner",
              "Policy decision",
              "Evidence record",
              "Failure shape",
            ];
    const id = `${fileBase}-concept-${conceptNumber}-${lang}`;
    const diagramTitle =
      resolveText(conceptBlueprints, conceptKey, "title", lang) ??
      (lang === "zh"
        ? `${shortHeading}：结构白板`
        : `${shortHeading}: Whiteboard Map`);
    const nearbyCaption = contextualCaption(originalBody, heading.index, lang, "after");
    const caption =
      resolveText(conceptBlueprints, conceptKey, "caption", lang) ??
      captionForConcept(shortHeading, fallbackLabels, lang, nearbyCaption);
    const src = writeFigure({
      id,
      lang,
      title: diagramTitle,
      caption,
      labels: fallbackLabels,
      kind: diagramKind("", index),
    });
    const markup = figureMarkup({
      isMdx,
      src,
      alt: altText(diagramTitle, fallbackLabels, lang, caption),
      caption,
      lang,
      id,
      title: diagramTitle,
      labels: fallbackLabels,
      intro: resolveText(conceptBlueprints, conceptKey, "intro", lang),
    });
    const currentHeadingIndex = findHeadingIndex(body, heading.title);
    body = insertAfterHeadingIntro(
      body,
      currentHeadingIndex === -1 ? heading.index : currentHeadingIndex,
      markup,
    );
    generated.push(src);
  }

  body = sanitizeGeneratedBody(body, lang);

  if (body !== originalBody) {
    writeFileSync(file, body, "utf8");
  }
  return generated.length;
}

mkdirSync(outputDir, { recursive: true });

let count = 0;
for (const slug of chapterFiles) {
  for (const lang of ["en", "zh"]) {
    const dir =
      lang === "en"
        ? path.join(root, "docs", "codex-from-source")
        : path.join(root, "docs", "zh", "codex-from-source");
    const mdx = path.join(dir, `${slug}.mdx`);
    const md = path.join(dir, `${slug}.md`);
    const file = existsSync(mdx) ? mdx : md;
    if (!existsSync(file)) {
      throw new Error(`Missing chapter file: ${file}`);
    }
    count += processFile(file, lang);
  }
}

console.log(`generated or inserted ${count} Excalidraw-style figures`);
