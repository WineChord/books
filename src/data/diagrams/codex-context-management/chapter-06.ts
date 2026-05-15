import type {
  Bilingual,
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the `sequenceDiagram` for hooked compaction flow.
export const compactionHookFlow: SequenceSpec = {
  actors: [
    { id: "Turn", label: { en: "Turn", zh: "Turn" }, tone: "accent" },
    { id: "Hooks", label: { en: "Hooks", zh: "Hooks" }, tone: "info" },
    {
      id: "Compactor",
      label: { en: "Compactor", zh: "Compactor" },
      tone: "warning",
    },
    { id: "History", label: { en: "History", zh: "History" }, tone: "success" },
    { id: "Client", label: { en: "Client", zh: "Client" }, tone: "muted" },
  ],
  steps: [
    {
      from: "Turn",
      to: "Hooks",
      label: { en: "pre-compact", zh: "pre-compact" },
    },
    {
      from: "Hooks",
      to: "Turn",
      label: { en: "continue or stop", zh: "continue or stop" },
      kind: "reply",
    },
    {
      from: "Turn",
      to: "Compactor",
      label: {
        en: "compact selected history",
        zh: "压缩选定历史",
      },
    },
    {
      from: "Compactor",
      to: "History",
      label: {
        en: "install replacement history",
        zh: "安装 replacement history",
      },
    },
    {
      from: "History",
      to: "History",
      label: {
        en: "update reference baseline",
        zh: "更新 reference baseline",
      },
      kind: "self",
    },
    {
      from: "History",
      to: "Client",
      label: {
        en: "emit compaction completion",
        zh: "发送压缩完成事件",
      },
    },
    {
      from: "Turn",
      to: "Hooks",
      label: { en: "post-compact", zh: "post-compact" },
    },
    {
      from: "Turn",
      to: "Client",
      label: {
        en: "token usage recomputed",
        zh: "重新计算 token usage",
      },
    },
  ],
  legend: {
    en: "Hooks wrap compaction because forgetting is a side effect on thread state — policy gets to observe or block it.",
    zh: "Hooks 包住 compaction，因为遗忘是 thread 状态上的副作用——策略可以观察或阻断。",
  },
};

// Replaces the before/after history ASCII block.
export const compactionBeforeAfter: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `Before compaction (mid-turn, near auto-compact limit):

  [ initial_ctx
  | user1 | asst1 | tool_call1 | tool_out1 | asst1b
  | user2 | asst2 | tool_call2 | tool_out2 | asst2b
  | user3 | asst3 | ... many items ...
  | userN ]                                <-- triggering user
                                           ^^^^^^ window almost full

After mid-turn compaction:

  [ summary_message                        <-- replacement history opens
  | user(recent_summarized)
  | initial_ctx                            <-- re-inserted before last user
  | userN ]                                <-- last real user preserved

After pre-turn compaction:

  [ summary_message                        <-- replacement history opens
  | user(recent_summarized) ]              <-- baseline cleared`,
    zh: `压缩前 (turn 中, 接近 auto-compact 上限):

  [ initial_ctx
  | user1 | asst1 | tool_call1 | tool_out1 | asst1b
  | user2 | asst2 | tool_call2 | tool_out2 | asst2b
  | user3 | asst3 | ... 大量 items ...
  | userN ]                                <-- 触发 turn 的用户
                                           ^^^^^^ 窗口接近满

Turn 中压缩后:

  [ summary_message                        <-- replacement history 开始
  | user(recent_summarized)
  | initial_ctx                            <-- 重新插入到最后一条用户前
  | userN ]                                <-- 保留最后真实用户

Turn 前压缩后:

  [ summary_message                        <-- replacement history 开始
  | user(recent_summarized) ]              <-- baseline 已清空`,
  },
  legend: {
    en: "Mid-turn compaction re-injects `initial_ctx`; pre-turn compaction clears the baseline so the next regular turn rebuilds it.",
    zh: "Turn 中 compaction 会重新注入 `initial_ctx`；Turn 前 compaction 清空 baseline，让下一次普通 turn 重建。",
  },
  highlights: [
    { match: "replacement history", tone: "accent" },
    { match: "baseline cleared", tone: "warning" },
    { match: "baseline 已清空", tone: "warning" },
    { match: "triggering user", tone: "info" },
    { match: "触发 turn 的用户", tone: "info" },
  ],
};

// Replaces the `graph TD` for remote compaction.
export const remoteCompactionFlow: FlowSpec = {
  cols: 2,
  rows: 8,
  width: 720,
  height: 900,
  nodes: [
    {
      id: "Clone",
      label: {
        en: "Live history clone",
        zh: "Live history clone",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 0,
      colSpan: 2,
    },
    {
      id: "Trim",
      label: {
        en: "Trim to compact window",
        zh: "Trim 到 compact 窗口",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 1,
      colSpan: 2,
    },
    {
      id: "BuildPrompt",
      label: {
        en: "Build compact prompt with tools",
        zh: "构造带 tools 的 compact prompt",
      },
      shape: "rounded",
      tone: "danger",
      col: 0,
      row: 2,
      colSpan: 2,
    },
    {
      id: "Provider",
      label: {
        en: "Provider compact endpoint",
        zh: "Provider compact endpoint",
      },
      shape: "pill",
      tone: "danger",
      col: 0,
      row: 3,
      colSpan: 2,
    },
    {
      id: "Filter",
      label: {
        en: "Filter compacted items",
        zh: "过滤 compacted items",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 4,
      colSpan: 2,
    },
    {
      id: "InsertCtx",
      label: {
        en: "Insert canonical context if mid-turn",
        zh: "Mid-turn 时插入规范上下文",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 5,
      colSpan: 2,
    },
    {
      id: "Record",
      label: {
        en: "Record installed checkpoint",
        zh: "记录已安装 checkpoint",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 6,
      colSpan: 2,
    },
    {
      id: "Replace",
      label: {
        en: "Replace live history",
        zh: "替换 live history",
      },
      shape: "pill",
      tone: "accent",
      col: 0,
      row: 7,
      colSpan: 2,
    },
  ],
  edges: [
    { from: "Clone", to: "Trim" },
    { from: "Trim", to: "BuildPrompt" },
    { from: "BuildPrompt", to: "Provider", tone: "danger" },
    { from: "Provider", to: "Filter", tone: "danger", style: "dashed" },
    { from: "Filter", to: "InsertCtx" },
    { from: "InsertCtx", to: "Record" },
    { from: "Record", to: "Replace", tone: "accent" },
  ],
  legend: {
    en: "Red nodes belong to the provider; the rest belong to Codex. Provider produces, runtime installs.",
    zh: "红色节点属于 provider，其余属于 Codex。Provider 生产，runtime 安装。",
  },
};

// Replaces the summary-only vs replacement-history ASCII block.
export const summaryOnlyVsReplacement: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `With summary only:

  [ "Earlier, the user fixed bug X and asked for feature Y;
     the assistant offered patch P and ran command Q." ]

Resume now must infer:
  - Were any tool calls accepted?
  - Did command Q succeed?
  - What is the current cwd, permissions, model?
  - Was patch P merged?

With replacement history:

  [ summary_message
  | tool_call_record(command="Q", exit=0)
  | patch_record(file="...", status="applied")
  | initial_ctx
  | userN ]

Resume now reads protocol items and rebuilds without inference.`,
    zh: `只有摘要时:

  [ "之前用户修复了 bug X 并请求功能 Y；
     助手提供了 patch P 并运行命令 Q。" ]

Resume 必须推断:
  - tool call 是否被接受？
  - 命令 Q 是否成功？
  - 当前 cwd, 权限, 模型是什么？
  - patch P 是否合并了？

带 replacement history 时:

  [ summary_message
  | tool_call_record(command="Q", exit=0)
  | patch_record(file="...", status="applied")
  | initial_ctx
  | userN ]

Resume 直接读取协议 item, 不再推断。`,
  },
  legend: {
    en: "Summary is prose; replacement history is protocol state — only the latter lets resume rebuild without inference.",
    zh: "摘要是文字，replacement history 是协议状态——只有后者能让 resume 不靠推断直接重建。",
  },
  highlights: [
    { match: "With summary only", tone: "warning" },
    { match: "With replacement history", tone: "success" },
    { match: "只有摘要时", tone: "warning" },
    { match: "带 replacement history 时", tone: "success" },
  ],
};
