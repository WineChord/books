export interface PartConfig {
  number: number;
  title: string;
  zhTitle: string;
  epigraph: string;
  zhEpigraph: string;
  chapters: number[];
}

export interface PageConfig {
  book: string;
  path: string;
  zhPath?: string;
  number?: number;
  title: string;
  zhTitle?: string;
  description: string;
  zhDescription?: string;
  kind: "front" | "chapter" | "epilogue" | "reference";
}

export interface BookConfig {
  slug: string;
  title: string;
  zhTitle: string;
  shortTitle: string;
  zhShortTitle: string;
  description: string;
  zhDescription: string;
  coverKicker: string;
  zhCoverKicker: string;
  coverTitle: string;
  coverFooter: string;
  zhCoverFooter: string;
  parts: PartConfig[];
  pages: PageConfig[];
  chapters: PageConfig[];
  frontPages: PageConfig[];
  referencePages: PageConfig[];
  readingPages: PageConfig[];
  epiloguePage?: PageConfig;
}

export const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
export const siteTitle = "Codex From Source";
export const siteDescription =
  "A source-equivalent architecture book about OpenAI Codex CLI.";

const codexFromSourceParts: PartConfig[] = [
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
    zhEpigraph: "当多个客户端共享同一个 thread model 时，运行时才成为平台。",
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

const codexFromSourcePages: PageConfig[] = [
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
  chapter(15, "SDKs, Daemons, and Remote Control", "SDK、Daemon 与远程控制", "How external clients reach the same runtime.", "说明外部客户端如何接入同一个运行时。"),
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
    book: "codex-from-source",
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

const contextManagementParts: PartConfig[] = [
  {
    number: 1,
    title: "Define the Context Contract",
    zhTitle: "定义上下文契约",
    epigraph: "Context is not text around a model. It is the runtime boundary every turn must obey.",
    zhEpigraph: "上下文不是模型旁边的一段文本，而是每个 turn 必须遵守的运行时边界。",
    chapters: [1, 2],
  },
  {
    number: 2,
    title: "Shape Prompt State",
    zhTitle: "塑造 Prompt 状态",
    epigraph: "A prompt is assembled from ledgers, fragments, policies, and optional evidence.",
    zhEpigraph: "Prompt 由账本、片段、策略和可选证据共同组装。",
    chapters: [3, 4, 5],
  },
  {
    number: 3,
    title: "Survive Long Threads",
    zhTitle: "支撑长线程",
    epigraph: "A long-lived agent survives only if forgetting is explicit, auditable, and reversible enough.",
    zhEpigraph: "长期运行的 agent 只有在遗忘过程显式、可审计且足够可恢复时才能存活。",
    chapters: [6, 7],
  },
  {
    number: 4,
    title: "Expose Context Without Losing Control",
    zhTitle: "开放上下文而不失控",
    epigraph: "Clients may render context, but the runtime must remain the source of truth.",
    zhEpigraph: "客户端可以渲染上下文，但 runtime 必须仍然是真相来源。",
    chapters: [8],
  },
];

const contextManagementPages: PageConfig[] = [
  front("preface", "Preface", "前言", "Why Codex context management deserves its own book.", "说明为什么 Codex 的上下文管理值得单独成书。", "codex-context-management"),
  front("reader-map", "Reader Map", "阅读地图", "How to read the book as an architect or implementation reader.", "为架构读者和实现读者提供阅读路径。", "codex-context-management"),
  chapter(1, "Context Is a Runtime Boundary", "上下文是运行时边界", "The thesis: Codex governs context as runtime state, not as a text buffer.", "核心论点：Codex 把上下文作为运行时状态治理，而不是当作文本缓冲区。", "codex-context-management"),
  chapter(2, "TurnContext: The Envelope Around a Turn", "TurnContext：包住一次 Turn 的信封", "How model identity, policy, tools, hooks, and workspace facts become one turn envelope.", "解释模型身份、策略、工具、hooks 与工作区事实如何变成一次 turn 的信封。", "codex-context-management"),
  chapter(3, "ContextManager: History as Prompt-Ready State", "ContextManager：把历史变成可提示状态", "How the history ledger stores, normalizes, trims, and prepares model-visible items.", "解释历史账本如何存储、归一化、裁剪并准备模型可见 items。", "codex-context-management"),
  chapter(4, "Typed Fragments and Settings Diffs", "类型化片段与设置 Diff", "How Codex injects changing runtime facts without repeating the entire world.", "说明 Codex 如何注入变化的运行时事实，而不是重复整个世界。", "codex-context-management"),
  chapter(5, "Budgeting Optional Context", "为可选上下文做预算", "Skills, plugins, memory, tool output, and images as budgeted context planes.", "把 skills、plugins、memory、tool output 和 images 解释为有预算的上下文平面。", "codex-context-management"),
  chapter(6, "Compaction as a Checkpoint Protocol", "把压缩作为 Checkpoint 协议", "Local and remote compaction as governed replacement history, not lossy summarization.", "把本地和远程压缩解释为受治理的替代历史，而不是随意摘要。", "codex-context-management"),
  chapter(7, "Resume, Rollback, Fork, and Replay", "Resume、Rollback、Fork 与 Replay", "How rollout evidence reconstructs prompt state after time, rollback, and branching.", "解释 rollout 证据如何在时间、回滚和分叉之后重建 prompt 状态。", "codex-context-management"),
  chapter(8, "Client-Facing Context", "面向客户端的上下文", "How TUI, realtime, app-server, token usage, and trace surfaces expose context safely.", "说明 TUI、realtime、app-server、token usage 与 trace 如何安全暴露上下文。", "codex-context-management"),
  {
    book: "codex-context-management",
    path: "codex-context-management/epilogue",
    zhPath: "zh/codex-context-management/epilogue",
    title: "Epilogue: The Context Discipline",
    zhTitle: "结语：上下文纪律",
    description: "Transferable lessons for any agent runtime that must stay coherent over long work.",
    zhDescription: "面向任何长期运行 agent runtime 的可迁移经验。",
    kind: "epilogue",
  },
  reference("source-atlas", "Source Atlas", "源码索引", "Pinned source anchors for the context-management book.", "上下文管理书籍使用的固定源码锚点。", "codex-context-management"),
];

const leetcodePages: PageConfig[] = [
  {
    book: "leetcode",
    path: "leetcode/spec",
    zhPath: "zh/leetcode/spec",
    title: "Spec",
    zhTitle: "规格说明",
    description:
      "The data, ranking, filtering, and progress contract for the LeetCode frequency book.",
    zhDescription: "说明力扣高频题册的数据、排序、筛选和进度契约。",
    kind: "front",
  },
  {
    book: "leetcode",
    path: "leetcode/changelog",
    zhPath: "zh/leetcode/changelog",
    title: "Changelog",
    zhTitle: "更新日志",
    description:
      "User-facing changes to the LeetCode practice page and submit workflow.",
    zhDescription: "记录力扣练习页面和提交流程的用户可见变化。",
    kind: "reference",
  },
  {
    book: "leetcode",
    path: "leetcode/reference-implementation-sources",
    zhPath: "zh/leetcode/reference-implementation-sources",
    title: "Reference Implementation Sources",
    zhTitle: "Reference Implementation 来源",
    description:
      "Attribution and license notes for the LeetCode reference implementation dataset.",
    zhDescription: "力扣 reference implementation 数据集的来源归因和授权说明。",
    kind: "reference",
  },
];

const suffixArrayPages: PageConfig[] = [
  {
    book: "sa",
    path: "sa/spec",
    zhPath: "zh/sa/spec",
    title: "Spec",
    zhTitle: "规格说明",
    description:
      "The route, interaction, algorithm, and explanation contract for the suffix-array book.",
    zhDescription:
      "说明后缀数组单页书的路由、交互、算法和讲解契约。",
    kind: "front",
  },
];

const lcpPages: PageConfig[] = [
  {
    book: "lcp",
    path: "lcp/spec",
    zhPath: "zh/lcp/spec",
    title: "Spec",
    zhTitle: "规格说明",
    description:
      "The route, interaction, algorithm, and explanation contract for the LCP book.",
    zhDescription:
      "说明 LCP 单页书的路由、交互、算法和讲解契约。",
    kind: "front",
  },
];

const ccPages: PageConfig[] = [
  {
    book: "cc",
    path: "cc/spec",
    zhPath: "zh/cc/spec",
    title: "Spec",
    zhTitle: "规格说明",
    description:
      "The source, route, coverage, interaction, and QA contract for the Claude Code interview book.",
    zhDescription:
      "说明 Claude Code 面试书的来源、路由、覆盖范围、交互和验收契约。",
    kind: "front",
  },
];

const iqPages: PageConfig[] = [
  {
    book: "iq",
    path: "iq/spec",
    zhPath: "zh/iq/spec",
    title: "Spec",
    zhTitle: "规格说明",
    description:
      "The route, coverage, interaction, and QA contract for the classic brain-teaser book.",
    zhDescription:
      "说明经典智力题高频题库的路由、覆盖范围、交互和验收契约。",
    kind: "front",
  },
];

export const codexFromSourceBook = makeBook({
  slug: "codex-from-source",
  title: siteTitle,
  zhTitle: "Codex 源码剖析",
  shortTitle: "Codex",
  zhShortTitle: "Codex",
  description: siteDescription,
  zhDescription: "一本中英文双语的 OpenAI Codex CLI 源码剖析在线书。",
  coverKicker: "OpenAI Codex CLI",
  zhCoverKicker: "OpenAI Codex CLI",
  coverTitle: "Codex<br />From<br />Source",
  coverFooter: "25 chapters + epilogue",
  zhCoverFooter: "25 章 + 结语",
  parts: codexFromSourceParts,
  pages: codexFromSourcePages,
});

export const codexContextManagementBook = makeBook({
  slug: "codex-context-management",
  title: "Codex Context Management",
  zhTitle: "Codex 上下文管理",
  shortTitle: "Context",
  zhShortTitle: "上下文",
  description:
    "A source-pinned technical book about how Codex governs context across turns, tools, compaction, replay, and clients.",
  zhDescription:
    "一本固定到源码 commit 的技术书，解释 Codex 如何跨 turn、tools、compaction、replay 和客户端治理上下文。",
  coverKicker: "Runtime Context, Compaction, Replay",
  zhCoverKicker: "Runtime Context, Compaction, Replay",
  coverTitle: "Codex<br />Context<br />Management",
  coverFooter: "8 chapters + epilogue",
  zhCoverFooter: "8 章 + 结语",
  parts: contextManagementParts,
  pages: contextManagementPages,
});

export const leetcodeBook = makeBook({
  slug: "leetcode",
  title: "LeetCode Frequency 888",
  zhTitle: "力扣高频 888",
  shortTitle: "LeetCode",
  zhShortTitle: "力扣",
  description:
    "A compact, filterable LeetCode China frequency workbook targeting Top 888 ranking, with Hot 100 membership, duplicate audit, ByteDance company buckets, previews, local practice marks, and extension submit.",
  zhDescription:
    "一本紧凑可筛选的力扣中国区高频题册，目标覆盖 Top888，并包含 Hot100、重复题核对、字节企业题库、题面预览、本地练习标记和扩展提交。",
  coverKicker: "Frequency, Hot 100, Local Practice",
  zhCoverKicker: "Frequency, Hot 100, Local Practice",
  coverTitle: "LeetCode<br />Frequency<br />888",
  coverFooter: "888 target + ByteDance buckets",
  zhCoverFooter: "888 目标 + 字节题库",
  parts: [],
  pages: leetcodePages,
});

export const suffixArrayBook = makeBook({
  slug: "sa",
  title: "Suffix Array Primer",
  zhTitle: "后缀数组入门",
  shortTitle: "Suffix Array",
  zhShortTitle: "后缀数组",
  description:
    "A compact interactive suffix-array book focused only on suffix order, rank classes, and doubling construction.",
  zhDescription:
    "一本紧凑的交互式后缀数组小书，只讲后缀顺序、rank 等价类和倍增构造。",
  coverKicker: "Suffix Order, Rank Classes, Doubling",
  zhCoverKicker: "Suffix Order, Rank Classes, Doubling",
  coverTitle: "Suffix<br />Array<br />Primer",
  coverFooter: "Interactive visualization",
  zhCoverFooter: "交互式可视化",
  parts: [],
  pages: suffixArrayPages,
});

export const lcpBook = makeBook({
  slug: "lcp",
  title: "LCP Array Primer",
  zhTitle: "LCP 数组入门",
  shortTitle: "LCP",
  zhShortTitle: "LCP",
  description:
    "A compact interactive LCP book focused only on adjacent suffix matches and the Kasai scan.",
  zhDescription:
    "一本紧凑的交互式 LCP 小书，只讲相邻后缀公共前缀和 Kasai 扫描。",
  coverKicker: "Adjacent Suffixes, Kasai, Reused Height",
  zhCoverKicker: "Adjacent Suffixes, Kasai, Reused Height",
  coverTitle: "LCP<br />Array<br />Primer",
  coverFooter: "Interactive visualization",
  zhCoverFooter: "交互式可视化",
  parts: [],
  pages: lcpPages,
});

export const ccBook = makeBook({
  slug: "cc",
  title: "Claude Code Interview Book",
  zhTitle: "Claude Code 面试核心书",
  shortTitle: "Claude Code",
  zhShortTitle: "Claude Code",
  description:
    "A single-page interactive book about Claude Code context management, memory, compaction, subagents, and interview answers.",
  zhDescription:
    "一页交互式长书，系统讲解 Claude Code 上下文管理、记忆、压缩、多 Agent 和面试答法。",
  coverKicker: "Context, Compaction, Multi-Agent",
  zhCoverKicker: "Context, Compaction, Multi-Agent",
  coverTitle: "Claude<br />Code<br />Interviews",
  coverFooter: "single-page interactive book",
  zhCoverFooter: "单页交互式长书",
  parts: [],
  pages: ccPages,
});

export const iqBook = makeBook({
  slug: "iq",
  title: "Classic Brain Teasers",
  zhTitle: "经典智力题高频题库",
  shortTitle: "Brain Teasers",
  zhShortTitle: "智力题",
  description:
    "A single-page interactive book of classic logic, probability, coding, scheduling, and construction brain teasers.",
  zhDescription:
    "一本单页交互式智力题书，系统讲解逻辑、概率、编码、调度、构造等高频经典题。",
  coverKicker: "Logic, Probability, Construction",
  zhCoverKicker: "Logic, Probability, Construction",
  coverTitle: "Classic<br />Brain<br />Teasers",
  coverFooter: "28 puzzles + interactive demos",
  zhCoverFooter: "28 题 + 交互演示",
  parts: [],
  pages: iqPages,
});

export const books = [
  codexFromSourceBook,
  codexContextManagementBook,
  leetcodeBook,
  iqBook,
  suffixArrayBook,
  lcpBook,
  ccBook,
] as const;
export const allPages = books.flatMap((book) => book.pages);

export const parts = codexFromSourceBook.parts;
export const pages = codexFromSourceBook.pages;
export const chapters = codexFromSourceBook.chapters;
export const frontPages = codexFromSourceBook.frontPages;
export const referencePages = codexFromSourceBook.referencePages;
export const readingPages = codexFromSourceBook.readingPages;
export const epiloguePage = codexFromSourceBook.epiloguePage;

export function getPageByPath(path: string): PageConfig | undefined {
  return allPages.find((page) => page.path === path || page.zhPath === path);
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

export function getBookBySlug(slug: string): BookConfig | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBookForPage(page: PageConfig): BookConfig {
  const book = getBookBySlug(page.book);
  if (!book) {
    throw new Error(`Missing book metadata for ${page.book}`);
  }
  return book;
}

export function getPartForChapter(
  chapterNumber: number,
  bookSlug = "codex-from-source",
): PartConfig | undefined {
  return getBookBySlug(bookSlug)?.parts.find((part) =>
    part.chapters.includes(chapterNumber),
  );
}

export function getPartForPage(page: PageConfig): PartConfig | undefined {
  return page.number ? getPartForChapter(page.number, page.book) : undefined;
}

export function isFirstChapterOfPart(
  chapterNumber: number,
  bookSlug = "codex-from-source",
): boolean {
  return getBookBySlug(bookSlug)?.parts.some((part) =>
    part.chapters[0] === chapterNumber,
  ) ?? false;
}

export function isFirstChapterOfPartPage(page: PageConfig): boolean {
  return Boolean(page.number && isFirstChapterOfPart(page.number, page.book));
}

export function getAdjacentPages(page: PageConfig, lang: "en" | "zh") {
  const sequence = getBookForPage(page).readingPages;
  const index = sequence.findIndex((item) => item.path === page.path);
  const previous = index > 0 ? sequence[index - 1] : null;
  const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;
  return {
    previous: previous ? localizePage(previous, lang) : null,
    next: next ? localizePage(next, lang) : null,
  };
}

export function getNavigationForPath(path: string): BookConfig {
  const page = getPageByPath(path);
  return page ? getBookForPage(page) : codexFromSourceBook;
}

interface BookInput {
  slug: string;
  title: string;
  zhTitle: string;
  shortTitle: string;
  zhShortTitle: string;
  description: string;
  zhDescription: string;
  coverKicker: string;
  zhCoverKicker: string;
  coverTitle: string;
  coverFooter: string;
  zhCoverFooter: string;
  parts: PartConfig[];
  pages: PageConfig[];
}

function makeBook(input: BookInput): BookConfig {
  const chapters = input.pages.filter((page) => page.kind === "chapter");
  const frontPages = input.pages.filter((page) => page.kind === "front");
  const referencePages = input.pages.filter((page) => page.kind === "reference");
  const readingPages = input.pages.filter((page) =>
    page.kind === "front" || page.kind === "chapter" || page.kind === "epilogue"
  );
  const epiloguePage = input.pages.find((page) => page.kind === "epilogue");
  return {
    ...input,
    chapters,
    frontPages,
    referencePages,
    readingPages,
    epiloguePage,
  };
}

function chapter(
  number: number,
  title: string,
  zhTitle: string,
  description: string,
  zhDescription: string,
  book = "codex-from-source",
): PageConfig {
  const file = String(number).padStart(2, "0");
  return {
    book,
    number,
    path: `${book}/chapter-${file}`,
    zhPath: `zh/${book}/chapter-${file}`,
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
  book = "codex-from-source",
): PageConfig {
  return {
    book,
    path: `${book}/${slug}`,
    zhPath: `zh/${book}/${slug}`,
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
  book = "codex-from-source",
): PageConfig {
  return {
    book,
    path: `${book}/${slug}`,
    zhPath: `zh/${book}/${slug}`,
    title,
    zhTitle,
    description,
    zhDescription,
    kind: "reference",
  };
}
