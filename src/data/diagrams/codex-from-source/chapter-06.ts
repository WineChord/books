import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces `sequenceDiagram` describing how one user turn moves between
// client, session, hooks, context, model, tools, and persistence.
export const turnLoopSequence: SequenceSpec = {
  actors: [
    {
      id: "Client",
      label: { en: "Client", zh: "客户端" },
      tone: "muted",
    },
    {
      id: "Session",
      label: { en: "Session", zh: "Session" },
      tone: "accent",
    },
    {
      id: "Hooks",
      label: { en: "Hooks", zh: "Hooks" },
      tone: "info",
    },
    {
      id: "Context",
      label: { en: "Context", zh: "上下文" },
      tone: "info",
    },
    {
      id: "Model",
      label: { en: "Model", zh: "模型" },
      tone: "warning",
    },
    {
      id: "Tools",
      label: { en: "Tools", zh: "工具" },
      tone: "success",
    },
    {
      id: "Store",
      label: { en: "Store", zh: "持久化" },
      tone: "muted",
    },
  ],
  steps: [
    {
      from: "Client",
      to: "Session",
      label: { en: "submit user operation", zh: "提交用户 operation" },
    },
    {
      from: "Session",
      to: "Session",
      label: { en: "resolve turn context", zh: "解析 turn context" },
      kind: "self",
    },
    {
      from: "Session",
      to: "Hooks",
      label: {
        en: "inspect startup and prompt",
        zh: "检查 startup 与 prompt",
      },
    },
    {
      from: "Session",
      to: "Context",
      label: {
        en: "record user input and injected context",
        zh: "记录用户输入与注入 context",
      },
    },
    {
      from: "Session",
      to: "Model",
      label: {
        en: "sample from recorded history",
        zh: "基于已记录历史采样",
      },
    },
    {
      from: "Model",
      to: "Session",
      label: { en: "stream response events", zh: "流式返回 response events" },
      kind: "reply",
    },
    {
      from: "Session",
      to: "Store",
      label: {
        en: "persist and emit stream items",
        zh: "持久化并发出 stream items",
      },
    },
    {
      from: "Session",
      to: "Tools",
      label: {
        en: "dispatch calls with cancellation",
        zh: "派发工具调用（带 cancellation）",
      },
      tone: "success",
    },
    {
      from: "Tools",
      to: "Session",
      label: {
        en: "observations or structured failures",
        zh: "observation 或结构化失败",
      },
      kind: "reply",
      tone: "success",
    },
    {
      from: "Session",
      to: "Context",
      label: { en: "record observations", zh: "记录 observations" },
    },
    {
      from: "Session",
      to: "Context",
      label: {
        en: "compact when over budget",
        zh: "上下文超限时 compact",
      },
      tone: "warning",
    },
    {
      from: "Session",
      to: "Hooks",
      label: { en: "inspect pending input", zh: "检查 pending input" },
    },
    {
      from: "Session",
      to: "Context",
      label: { en: "record accepted input", zh: "记录已接受输入" },
    },
    {
      from: "Session",
      to: "Hooks",
      label: {
        en: "run stop and after-agent hooks",
        zh: "运行 stop 与 after-agent hooks",
      },
    },
    {
      from: "Session",
      to: "Client",
      label: { en: "turn completion events", zh: "turn completion events" },
      kind: "reply",
    },
  ],
  legend: {
    en: "One turn rotates between sampling, persistence, tool dispatch, context repair, and pending-input intake.",
    zh: "一次 turn 在 sampling、持久化、工具派发、上下文修复和 pending input 之间循环。",
  },
};

// Replaces `flowchart TD` for the turn loop state machine. Every transition
// from `Sample`, `Stream`, `DispatchTools`, `Compact`, and `StopHooks` is a
// continuation reason; without one the turn settles.
export const turnStateMachine: FlowSpec = {
  cols: 5,
  rows: 7,
  width: 960,
  height: 800,
  nodes: [
    {
      id: "StartState",
      label: { en: "Start", zh: "开始" },
      shape: "circle",
      tone: "muted",
      col: 2,
      row: 0,
    },
    {
      id: "Prepare",
      label: { en: "Prepare", zh: "准备" },
      sub: {
        en: "transport, compaction, hooks",
        zh: "transport、compaction、hooks",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "Blocked",
      label: { en: "Blocked", zh: "Blocked" },
      sub: { en: "prompt hook rejects", zh: "prompt hook 拒绝" },
      shape: "rounded",
      tone: "danger",
      col: 0,
      row: 2,
    },
    {
      id: "Sample",
      label: { en: "Sample", zh: "Sample" },
      sub: {
        en: "request from recorded history",
        zh: "基于已记录历史采样",
      },
      shape: "diamond",
      tone: "accent",
      col: 2,
      row: 2,
    },
    {
      id: "Abort",
      label: { en: "Abort", zh: "Abort" },
      sub: {
        en: "cancellation or fatal error",
        zh: "cancellation 或 fatal error",
      },
      shape: "rounded",
      tone: "danger",
      col: 0,
      row: 3,
    },
    {
      id: "Stream",
      label: { en: "Stream", zh: "Stream" },
      sub: {
        en: "items, deltas, tool calls",
        zh: "items, deltas, tool calls",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 3,
    },
    {
      id: "StopHooks",
      label: { en: "StopHooks", zh: "StopHooks" },
      sub: {
        en: "let the turn settle or extend",
        zh: "决定 turn 落定或继续",
      },
      shape: "rounded",
      tone: "warning",
      col: 4,
      row: 3,
    },
    {
      id: "Compact",
      label: { en: "Compact", zh: "Compact" },
      sub: { en: "rewrite model history", zh: "改写模型历史" },
      shape: "rounded",
      tone: "warning",
      col: 1,
      row: 4,
    },
    {
      id: "DispatchTools",
      label: { en: "DispatchTools", zh: "DispatchTools" },
      sub: { en: "router under cancellation", zh: "router 在 cancellation 下" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 4,
    },
    {
      id: "Complete",
      label: { en: "Complete", zh: "完成" },
      shape: "rounded",
      tone: "success",
      col: 4,
      row: 4,
    },
    {
      id: "RecordObservations",
      label: { en: "RecordObservations", zh: "RecordObservations" },
      sub: { en: "structured tool facts", zh: "结构化工具事实" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 5,
    },
    {
      id: "EndState",
      label: { en: "End", zh: "结束" },
      shape: "circle",
      tone: "muted",
      col: 2,
      row: 6,
    },
  ],
  edges: [
    { from: "StartState", to: "Prepare" },
    {
      from: "Prepare",
      to: "Blocked",
      label: { en: "prompt hook rejects", zh: "prompt hook 拒绝" },
      tone: "danger",
      style: "dashed",
    },
    {
      from: "Prepare",
      to: "Sample",
      label: { en: "hooks accepted", zh: "hooks 接受" },
      tone: "success",
    },
    {
      from: "Sample",
      to: "Abort",
      label: { en: "cancel / fatal", zh: "cancel / fatal" },
      tone: "danger",
      style: "dashed",
    },
    { from: "Sample", to: "Stream" },
    {
      from: "Stream",
      to: "DispatchTools",
      label: { en: "tool calls", zh: "tool calls" },
    },
    {
      from: "Stream",
      to: "Compact",
      label: { en: "follow-up + over budget", zh: "follow-up + 超限" },
      tone: "warning",
    },
    {
      from: "Stream",
      to: "StopHooks",
      label: { en: "no follow-up", zh: "无 follow-up" },
    },
    { from: "DispatchTools", to: "RecordObservations" },
    {
      from: "RecordObservations",
      to: "Compact",
      label: { en: "would overflow", zh: "将溢出" },
      tone: "warning",
      style: "dashed",
    },
    {
      from: "RecordObservations",
      to: "Sample",
      label: { en: "observations recorded", zh: "已记录" },
      route: "curve",
    },
    {
      from: "Compact",
      to: "Sample",
      label: { en: "compacted history", zh: "compacted history" },
      route: "curve",
    },
    {
      from: "StopHooks",
      to: "Sample",
      label: { en: "hook adds context", zh: "hook 注入 context" },
      route: "curve",
      style: "dashed",
    },
    {
      from: "StopHooks",
      to: "Complete",
      label: { en: "no reason remains", zh: "无继续理由" },
      tone: "success",
    },
    { from: "Blocked", to: "EndState", tone: "danger" },
    { from: "Abort", to: "EndState", tone: "danger" },
    { from: "Complete", to: "EndState", tone: "success" },
  ],
  legend: {
    en: "The loop continues only for an explicit reason: tool follow-up, compaction, accepted input, or a stop hook that adds context.",
    zh: "loop 只在有明确继续理由时前进：tool follow-up、compaction、accepted input，或 stop hook 注入了 context。",
  },
};
