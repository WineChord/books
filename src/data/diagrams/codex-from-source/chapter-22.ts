import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces the flowchart TD with read/write subgraphs.
export const memoryReadWritePaths: FlowSpec = {
  cols: 5,
  rows: 3,
  width: 880,
  height: 380,
  nodes: [
    {
      id: "Summary",
      label: { en: "memory summary", zh: "memory summary" },
      shape: "rounded",
      tone: "info",
      group: "read",
      col: 0,
      row: 0,
    },
    {
      id: "Instructions",
      label: {
        en: "developer-instruction context",
        zh: "developer-instruction context",
      },
      shape: "rounded",
      tone: "info",
      group: "read",
      col: 1,
      row: 0,
    },
    {
      id: "MCP",
      label: {
        en: "read-only MCP tools",
        zh: "只读 MCP tools",
      },
      sub: { en: "list / read / search", zh: "list / read / search" },
      shape: "rounded",
      tone: "info",
      group: "read",
      col: 3,
      row: 0,
    },
    {
      id: "Citations",
      label: { en: "citation parser", zh: "citation parser" },
      shape: "rounded",
      tone: "info",
      group: "read",
      col: 4,
      row: 0,
    },
    {
      id: "Startup",
      label: { en: "root session startup", zh: "root session 启动" },
      shape: "pill",
      tone: "muted",
      group: "write",
      col: 0,
      row: 1,
    },
    {
      id: "Phase1",
      label: { en: "Stage 1", zh: "Stage 1" },
      sub: {
        en: "per-rollout extraction",
        zh: "每个 rollout 抽取",
      },
      shape: "rounded",
      tone: "accent",
      group: "write",
      col: 1,
      row: 1,
    },
    {
      id: "DB",
      label: { en: "state database", zh: "state database" },
      sub: {
        en: "stage-1 outputs and leases",
        zh: "stage-1 outputs 与 lease",
      },
      shape: "cylinder",
      tone: "warning",
      group: "write",
      col: 2,
      row: 1,
    },
    {
      id: "Phase2",
      label: { en: "Stage 2", zh: "Stage 2" },
      sub: {
        en: "global consolidation",
        zh: "全局合并",
      },
      shape: "rounded",
      tone: "accent",
      group: "write",
      col: 3,
      row: 1,
    },
    {
      id: "Workspace",
      label: { en: "memory workspace", zh: "memory workspace" },
      sub: {
        en: "raw memories and summaries",
        zh: "原始记忆与 summary",
      },
      shape: "cylinder",
      tone: "warning",
      group: "write",
      col: 4,
      row: 1,
    },
    {
      id: "Internal",
      label: {
        en: "restricted internal agent",
        zh: "受限 internal agent",
      },
      shape: "rounded",
      tone: "danger",
      group: "write",
      col: 4,
      row: 2,
    },
  ],
  edges: [
    { from: "Summary", to: "Instructions" },
    { from: "MCP", to: "Citations" },
    { from: "Startup", to: "Phase1" },
    { from: "Phase1", to: "DB" },
    { from: "DB", to: "Phase2" },
    { from: "Phase2", to: "Workspace" },
    { from: "Workspace", to: "Internal" },
    {
      from: "Internal",
      to: "Summary",
      label: { en: "feedback", zh: "feedback" },
      style: "dashed",
      tone: "muted",
      route: "curve",
    },
  ],
  subgraphs: [
    {
      id: "read",
      label: { en: "read path", zh: "read path" },
      tone: "info",
      col: 0,
      row: 0,
      colSpan: 5,
      rowSpan: 1,
    },
    {
      id: "write",
      label: { en: "write path", zh: "write path" },
      tone: "accent",
      col: 0,
      row: 1,
      colSpan: 5,
      rowSpan: 2,
    },
  ],
  legend: {
    en: "Read path serves the active session; write path runs in the background and only feeds back through summaries.",
    zh: "Read path 服务当前 session；write path 在后台运行，只通过 summary 反馈回来。",
  },
};

// Replaces the citation flowchart LR.
export const citationProvenanceFlow: FlowSpec = {
  cols: 6,
  rows: 1,
  width: 880,
  height: 180,
  nodes: [
    {
      id: "Summary",
      label: {
        en: "memory summary or file excerpt",
        zh: "memory summary 或文件片段",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Citation",
      label: { en: "citation block", zh: "citation block" },
      shape: "pill",
      tone: "muted",
      col: 1,
      row: 0,
    },
    {
      id: "Parser",
      label: { en: "citation parser", zh: "citation parser" },
      shape: "rounded",
      tone: "accent",
      col: 2,
      row: 0,
    },
    {
      id: "IDs",
      label: {
        en: "rollout and thread ids",
        zh: "rollout 与 thread id",
      },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 0,
    },
    {
      id: "Usage",
      label: { en: "usage accounting", zh: "usage 记账" },
      shape: "rounded",
      tone: "warning",
      col: 4,
      row: 0,
    },
    {
      id: "Selection",
      label: {
        en: "future Stage 2 selection",
        zh: "未来 Stage 2 选择",
      },
      shape: "rounded",
      tone: "success",
      col: 5,
      row: 0,
    },
  ],
  edges: [
    { from: "Summary", to: "Citation" },
    { from: "Citation", to: "Parser" },
    { from: "Parser", to: "IDs" },
    { from: "IDs", to: "Usage" },
    { from: "Usage", to: "Selection" },
  ],
  legend: {
    en: "A citation is a compact receipt that ties a memory artifact back to its source rollouts and to future selection.",
    zh: "Citation 是一张紧凑收据，把 memory artifact 连回 source rollouts 与未来选择逻辑。",
  },
};

// Replaces the Stage 2 consolidation sequenceDiagram.
export const stageTwoConsolidation: SequenceSpec = {
  actors: [
    { id: "Startup", label: { en: "Startup", zh: "Startup" }, tone: "accent" },
    { id: "DB", label: { en: "State DB", zh: "State DB" }, tone: "warning" },
    {
      id: "FS",
      label: { en: "Memory workspace", zh: "Memory workspace" },
      tone: "info",
    },
    { id: "Git", label: { en: "Git baseline", zh: "Git baseline" }, tone: "muted" },
    {
      id: "Agent",
      label: {
        en: "Restricted internal agent",
        zh: "受限 internal agent",
      },
      tone: "danger",
    },
  ],
  steps: [
    {
      from: "Startup",
      to: "DB",
      label: {
        en: "claim global Stage 2 lock",
        zh: "claim 全局 Stage 2 lock",
      },
    },
    {
      from: "DB",
      to: "Startup",
      label: {
        en: "ownership token and watermark",
        zh: "ownership token 与 watermark",
      },
      kind: "reply",
    },
    {
      from: "Startup",
      to: "FS",
      label: {
        en: "sync selected Stage 1 outputs",
        zh: "同步选中的 Stage 1 outputs",
      },
    },
    {
      from: "Startup",
      to: "FS",
      label: {
        en: "prune stale generated artifacts",
        zh: "清理 stale 产物",
      },
    },
    {
      from: "Startup",
      to: "Git",
      label: { en: "compute workspace diff", zh: "计算 workspace diff" },
    },
    {
      from: "Startup",
      to: "DB",
      label: {
        en: "if no diff: mark success without agent",
        zh: "无 diff：直接标记成功",
      },
      kind: "async",
      tone: "success",
    },
    {
      from: "Startup",
      to: "FS",
      label: {
        en: "else: write bounded diff artifact",
        zh: "否则：写入有界 diff artifact",
      },
      tone: "warning",
    },
    {
      from: "Startup",
      to: "Agent",
      label: {
        en: "run consolidation with restricted config",
        zh: "用受限 config 运行 consolidation",
      },
    },
    {
      from: "Startup",
      to: "DB",
      label: { en: "heartbeat lock (loop)", zh: "heartbeat lock（循环）" },
      tone: "muted",
    },
    {
      from: "Agent",
      to: "Startup",
      label: { en: "final status", zh: "final status" },
      kind: "reply",
    },
    {
      from: "Startup",
      to: "Git",
      label: {
        en: "reset successful baseline",
        zh: "reset 成功 baseline",
      },
    },
    {
      from: "Startup",
      to: "DB",
      label: {
        en: "mark selected inputs and watermark",
        zh: "标记被消费的输入与 watermark",
      },
    },
  ],
  legend: {
    en: "Stage 2 holds a single global lock, drives the workspace diff, and only invokes the restricted agent when the diff demands it.",
    zh: "Stage 2 持有唯一 global lock，驱动 workspace diff，并仅在有 diff 时调用受限 agent。",
  },
};
