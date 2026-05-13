export interface PartConfig {
  number: number;
  title: string;
  zhTitle: string;
  epigraph: string;
  zhEpigraph: string;
  chapters: number[];
}

export interface PageConfig {
  path: string;
  zhPath?: string;
  number?: number;
  title: string;
  zhTitle?: string;
  description: string;
  zhDescription?: string;
  kind: "front" | "chapter" | "epilogue" | "reference";
}

export const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
export const siteTitle = "Codex From Source";
export const siteDescription =
  "A source-equivalent architecture book about OpenAI Codex CLI.";

export const parts: PartConfig[] = [
  {
    number: 1,
    title: "Establish the Contract",
    zhTitle: "建立契约",
    epigraph: "A complex agent becomes legible when every actor speaks typed runtime language.",
    zhEpigraph: "复杂 agent 只有在所有参与者说同一种类型化运行时语言时才容易理解。",
    chapters: [1, 2, 3, 4],
  },
  {
    number: 2,
    title: "Build the Runtime",
    zhTitle: "构建运行时",
    epigraph: "The runtime is a scheduler for context, streaming, tools, cancellation, and replay.",
    zhEpigraph: "运行时是 context、streaming、tools、cancellation 和 replay 的调度器。",
    chapters: [5, 6, 7, 8],
  },
  {
    number: 3,
    title: "Execute Side Effects",
    zhTitle: "执行副作用",
    epigraph: "The model can suggest an action. Codex decides whether it becomes an effect.",
    zhEpigraph: "模型可以建议动作；Codex 决定它是否真正变成副作用。",
    chapters: [9, 10, 11, 12, 13],
  },
  {
    number: 4,
    title: "Open the Runtime",
    zhTitle: "开放运行时",
    epigraph: "A runtime becomes a platform when many clients share one thread model.",
    zhEpigraph: "当多个客户端共享同一个线程模型时，运行时才成为平台。",
    chapters: [14, 15, 16],
  },
  {
    number: 5,
    title: "Extend the System",
    zhTitle: "扩展系统",
    epigraph: "Extension points are useful only when every trust boundary is explicit.",
    zhEpigraph: "扩展点只有在每个信任边界都显式时才有用。",
    chapters: [17, 18, 19],
  },
  {
    number: 6,
    title: "Coordinate Work",
    zhTitle: "协调工作",
    epigraph: "Durable work needs graph edges, task contracts, and controlled memory.",
    zhEpigraph: "持久工作需要图边、任务契约和受控 memory。",
    chapters: [20, 21, 22],
  },
  {
    number: 7,
    title: "Ship and Govern",
    zhTitle: "发布与治理",
    epigraph: "Architecture survives when release and CI enforce it.",
    zhEpigraph: "架构只有在发布和 CI 持续执行时才会存活。",
    chapters: [23, 24, 25],
  },
];

export const pages: PageConfig[] = [
  front("preface", "Preface", "前言", "Why this book exists and how to read it.", "说明本书为何存在，以及如何按不同深度阅读。"),
  front("reader-map", "Reader Map", "阅读地图", "Suggested reading paths through the system.", "为架构读者和实现读者提供穿过全书的阅读路径。"),
  chapter(1, "The Architectural Bet", "架构赌注", "Agent as a bounded operating system.", "把 Codex 定义为有边界的 agent 操作系统。"),
  chapter(2, "From Distribution Wrapper to Rust Router", "从分发包装器到 Rust Router", "How startup narrows user intent into a typed command path.", "解释启动路径如何把用户意图收窄为类型化命令。"),
  chapter(3, "Configuration, Authentication, and Managed Requirements", "配置、认证与 Managed Requirements", "How policy and identity become runtime constraints.", "说明配置、身份与托管要求如何变成运行时约束。"),
  chapter(4, "The Protocol Boundary", "协议边界", "The typed vocabulary shared by clients, sessions, and replays.", "梳理客户端、会话和回放共享的类型化词汇。"),
  chapter(5, "Threads, Sessions, and Durable State", "线程、会话与持久状态", "Ownership, queues, history, rollout, and resumability.", "解释所有权、队列、历史、rollout 和可恢复性。"),
  chapter(6, "The Turn Loop", "Turn Loop", "Where context, model streaming, tools, and continuation meet.", "说明上下文、模型流、工具和续跑如何汇合。"),
  chapter(7, "Model Providers, Streaming, and Backend Tasks", "模型 Provider、流式传输与 Backend Task", "Provider transport, event normalization, and backend-task boundaries.", "解释 provider 传输、事件归一化和后台任务边界。"),
  chapter(8, "Observability and Rollout Trace", "Observability 与 Rollout Trace", "How raw runtime facts become replayable and inspectable.", "说明原始运行时事实如何变成可回放、可检查的证据。"),
  chapter(9, "Tool Specifications, Routing, and Dispatch", "工具规格、路由与分发", "How model-visible tools become governed side effects.", "解释模型可见工具如何变成受治理的副作用。"),
  chapter(10, "Shell, Exec Server, and Filesystem Tools", "Shell、Exec Server 与文件系统工具", "Process and filesystem capabilities under runtime policy.", "说明进程与文件系统能力如何受运行时策略约束。"),
  chapter(11, "Patches as a First-Class Editing Protocol", "把 Patch 作为一等编辑协议", "Structured mutation instead of opaque shell edits.", "把结构化 patch 作为替代不透明 shell 编辑的协议。"),
  chapter(12, "Hooks and Human Approval", "Hooks 与人工审批", "Policy gates before risky actions reach the world.", "解释危险动作到达外部世界前的策略门。"),
  chapter(13, "Sandboxes, Network Policy, and Platform Boundaries", "Sandboxes、网络策略与平台边界", "Platform containment and network mediation.", "梳理平台隔离与网络访问调解。"),
  chapter(14, "The App-Server Contract", "App-Server 契约", "The JSON-RPC boundary for clients and SDKs.", "解释面向客户端和 SDK 的 JSON-RPC 边界。"),
  chapter(15, "Client Surfaces, Daemon Lifecycle, and Remote Control", "客户端表面、Daemon 生命周期与远程控制", "How external clients reach the same runtime.", "说明外部客户端如何接入同一个运行时。"),
  chapter(16, "The TUI as an Event Renderer", "TUI 作为事件渲染器", "Terminal UI as projection, not alternate runtime.", "把终端 UI 解释为事件投影，而不是另一个运行时。"),
  chapter(17, "MCP: External Tools Without Runtime Entanglement", "MCP：没有运行时耦合的外部工具", "External tool servers behind provenance and routing boundaries.", "说明外部工具服务器如何通过来源和路由边界接入。"),
  chapter(18, "Skills, Plugins, Connectors, and Typed Extensions", "Skills、Plugins、Connectors 与类型化扩展", "Extension packaging with explicit trust planes.", "解释扩展打包和显式信任平面。"),
  chapter(19, "External Migration and Backward Compatibility", "外部迁移与向后兼容", "Compatibility as a runtime and product constraint.", "把兼容性作为运行时和产品约束。"),
  chapter(20, "Multi-Agent Coordination", "多 Agent 协作", "Threads, graph edges, and child-agent outcomes.", "解释 thread、graph edge 和子 agent 结果如何协作。"),
  chapter(21, "Cloud Tasks, Identity, and Remote Work", "云任务、身份与远程工作", "Remote work as task contracts plus local verification.", "把远程工作解释为任务契约加本地验证。"),
  chapter(22, "Memories and User-Level State", "Memories 与用户级状态", "Long-term context as a controlled side channel.", "把长期上下文作为受控旁路。"),
  chapter(23, "Build Systems and Generated Contracts", "构建系统与生成契约", "How build overlays and generated schemas enforce boundaries.", "说明构建 overlay 与生成 schema 如何执行边界。"),
  chapter(24, "Packaging, Release, and Native Dependencies", "打包、发布与原生依赖", "The path from Rust workspace to npm-distributed binaries.", "解释 Rust workspace 到 npm 原生包的发布路径。"),
  chapter(25, "CI, Policy, and Architectural Governance", "CI、策略与架构治理", "Executable checks that keep architecture honest.", "说明 CI 与策略检查如何让架构保持诚实。"),
  {
    path: "codex-from-source/epilogue",
    zhPath: "zh/codex-from-source/epilogue",
    title: "Epilogue: What to Steal",
    zhTitle: "结语：真正值得带走的东西",
    description: "The transferable design lessons from the full system.",
    zhDescription: "从完整系统中抽取可迁移的设计经验。",
    kind: "epilogue",
  },
  reference("patterns", "Pattern Index", "模式索引", "A compact index of transferable patterns.", "可迁移模式的紧凑索引。"),
  reference("source-atlas", "Source Atlas", "源码索引", "Pinned source anchors for auditability.", "用于审计的固定源码锚点。"),
  reference("implementation-reference", "Implementation Reference", "实现参考", "Dense subsystem reference for source-level review.", "面向源码级审阅的密集子系统参考。"),
  reference("bibliography", "Bibliography", "参考文献", "Source and reference bibliography.", "源码和外部参考资料。"),
  reference("pipeline", "Production Pipeline", "写作流水线", "How the book was produced and checked.", "说明本书如何生产和校验。"),
];

export const chapters = pages.filter((page) => page.kind === "chapter");
export const frontPages = pages.filter((page) => page.kind === "front");
export const referencePages = pages.filter((page) => page.kind === "reference");
export const readingPages = pages.filter((page) => page.kind === "front" || page.kind === "chapter" || page.kind === "epilogue");
export const epiloguePage = pages.find((page) => page.kind === "epilogue");

export function getPageByPath(path: string): PageConfig | undefined {
  return pages.find((page) => page.path === path || page.zhPath === path);
}

export function getLangForPath(path: string): "en" | "zh" {
  return path.startsWith("zh/") ? "zh" : "en";
}

export function localizePage(page: PageConfig, lang: "en" | "zh") {
  return {
    path: lang === "zh" ? page.zhPath ?? page.path : page.path,
    title: lang === "zh" ? page.zhTitle ?? page.title : page.title,
    description: lang === "zh" ? page.zhDescription ?? page.description : page.description,
  };
}

export function getPartForChapter(chapterNumber: number): PartConfig | undefined {
  return parts.find((part) => part.chapters.includes(chapterNumber));
}

export function isFirstChapterOfPart(chapterNumber: number): boolean {
  return parts.some((part) => part.chapters[0] === chapterNumber);
}

export function getAdjacentPages(page: PageConfig, lang: "en" | "zh") {
  const sequence = readingPages;
  const index = sequence.findIndex((item) => item.path === page.path);
  const previous = index > 0 ? sequence[index - 1] : null;
  const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;
  return {
    previous: previous ? localizePage(previous, lang) : null,
    next: next ? localizePage(next, lang) : null,
  };
}

function chapter(
  number: number,
  title: string,
  zhTitle: string,
  description: string,
  zhDescription: string,
): PageConfig {
  const file = String(number).padStart(2, "0");
  return {
    number,
    path: `codex-from-source/chapter-${file}`,
    zhPath: `zh/codex-from-source/chapter-${file}`,
    title,
    zhTitle,
    description,
    zhDescription,
    kind: "chapter",
  };
}

function front(
  slug: string,
  title: string,
  zhTitle: string,
  description: string,
  zhDescription: string,
): PageConfig {
  return {
    path: `codex-from-source/${slug}`,
    zhPath: `zh/codex-from-source/${slug}`,
    title,
    zhTitle,
    description,
    zhDescription,
    kind: "front",
  };
}

function reference(
  slug: string,
  title: string,
  zhTitle: string,
  description: string,
  zhDescription: string,
): PageConfig {
  return {
    path: `codex-from-source/${slug}`,
    zhPath: `zh/codex-from-source/${slug}`,
    title,
    zhTitle,
    description,
    zhDescription,
    kind: "reference",
  };
}
