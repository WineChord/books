import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Diagram 1: TUI startup path (replaces flowchart TD under `Startup Path`).
export const startupPath: FlowSpec = {
  cols: 3,
  rows: 5,
  width: 760,
  height: 600,
  nodes: [
    {
      id: "Start",
      label: { en: "Start TUI", zh: "启动 TUI" },
      shape: "pill",
      tone: "accent",
      col: 1,
      row: 0,
    },
    {
      id: "Config",
      label: { en: "Load config and auth", zh: "加载 config 与 auth" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "Terminal",
      label: {
        en: "Detect terminal capability",
        zh: "探测 terminal capability",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "Session",
      label: {
        en: "Create app-server session",
        zh: "创建 app-server session",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "Thread",
      label: {
        en: "Create or resume thread",
        zh: "创建或恢复 thread",
      },
      shape: "rounded",
      tone: "accent",
      col: 0,
      row: 3,
    },
    {
      id: "Loop",
      label: { en: "Enter app loop", zh: "进入 app loop" },
      shape: "pill",
      tone: "success",
      col: 1,
      row: 4,
    },
  ],
  edges: [
    { from: "Start", to: "Config" },
    { from: "Start", to: "Terminal" },
    { from: "Config", to: "Session" },
    { from: "Session", to: "Thread" },
    { from: "Thread", to: "Loop" },
    { from: "Terminal", to: "Loop", route: "curve" },
  ],
  legend: {
    en: "Three startup worlds converge: configuration, terminal capability, and app-server session.",
    zh: "三个启动世界在 app loop 汇合：configuration、terminal capability、app-server session。",
  },
};

// Diagram 2: spatial model (replaces graph TD under `The Spatial Model`).
export const spatialModel: FlowSpec = {
  cols: 3,
  rows: 4,
  width: 780,
  height: 480,
  nodes: [
    {
      id: "Scrollback",
      label: { en: "real terminal scrollback", zh: "真实终端 scrollback" },
      sub: {
        en: "committed transcript cells",
        zh: "已 commit 的 transcript cells",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 0,
    },
    {
      id: "Viewport",
      label: { en: "live viewport", zh: "live viewport" },
      sub: {
        en: "active cells and streaming tails",
        zh: "active cells 与 streaming tails",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
    },
    {
      id: "Runtime",
      label: {
        en: "app-server events and requests",
        zh: "app-server events 与 requests",
      },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 2,
    },
    {
      id: "Bottom",
      label: { en: "bottom pane", zh: "bottom pane" },
      sub: {
        en: "composer, suggestions, status",
        zh: "composer、suggestions、status",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 3,
    },
    {
      id: "Modal",
      label: { en: "modal layer", zh: "modal 层" },
      sub: {
        en: "approval, elicitation, selection",
        zh: "approval、elicitation、selection",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 3,
    },
  ],
  edges: [
    { from: "Runtime", to: "Viewport" },
    { from: "Viewport", to: "Scrollback", tone: "success" },
    { from: "Bottom", to: "Runtime", tone: "info" },
    { from: "Runtime", to: "Modal", tone: "warning" },
    { from: "Modal", to: "Runtime", style: "dashed", tone: "warning" },
  ],
  legend: {
    en: "Four layers: committed scrollback, live viewport, bottom pane, modal overlays — all driven by runtime events.",
    zh: "四层结构：已 commit 的 scrollback、live viewport、bottom pane、modal 层，全部由 runtime events 驱动。",
  },
};

// Diagram 3: four event sources (replaces flowchart LR under
// `Four Event Sources`).
export const eventSources: FlowSpec = {
  cols: 5,
  rows: 4,
  width: 920,
  height: 480,
  nodes: [
    {
      id: "AppEvents",
      label: { en: "Internal app events", zh: "内部 app events" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "ThreadEvents",
      label: { en: "Active thread events", zh: "活跃 thread events" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "TerminalEvents",
      label: {
        en: "Terminal input and resize",
        zh: "Terminal 输入与 resize",
      },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "ServerEvents",
      label: { en: "App-server events", zh: "app-server events" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 3,
    },
    {
      id: "Loop",
      label: { en: "App loop", zh: "App loop" },
      shape: "rounded",
      tone: "accent",
      col: 2,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Commands",
      label: { en: "App commands", zh: "App commands" },
      shape: "pill",
      tone: "warning",
      col: 4,
      row: 0,
    },
    {
      id: "State",
      label: { en: "Chat and pane state", zh: "Chat 与 pane state" },
      shape: "rounded",
      tone: "default",
      col: 4,
      row: 2,
    },
    {
      id: "Frame",
      label: { en: "Frame request", zh: "Frame request" },
      shape: "pill",
      tone: "success",
      col: 4,
      row: 3,
    },
  ],
  edges: [
    { from: "AppEvents", to: "Loop" },
    { from: "ThreadEvents", to: "Loop" },
    { from: "TerminalEvents", to: "Loop" },
    { from: "ServerEvents", to: "Loop" },
    { from: "Loop", to: "Commands", tone: "warning" },
    { from: "Loop", to: "State" },
    { from: "Loop", to: "Frame", tone: "success" },
    {
      from: "Commands",
      to: "ServerEvents",
      style: "dashed",
      tone: "accent",
      route: "curve",
      label: { en: "send", zh: "发送" },
    },
    { from: "State", to: "Frame" },
  ],
  legend: {
    en: "Four event sources fan into the loop; three outcomes — commands, state, frame — fan back out.",
    zh: "四类 event source 汇入 app loop，再扇出三类结果：commands、state、frame。",
  },
};

// Diagram 4: streaming markdown rendering rule
// (replaces flowchart TD under `Streaming Markdown`).
export const streamingMarkdown: FlowSpec = {
  cols: 3,
  rows: 4,
  width: 780,
  height: 480,
  nodes: [
    {
      id: "Resize",
      label: { en: "Resize event", zh: "Resize 事件" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Delta",
      label: { en: "Streaming delta", zh: "Streaming delta" },
      shape: "pill",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "Source",
      label: {
        en: "Append to source buffer",
        zh: "追加到 source buffer",
      },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 1,
    },
    {
      id: "Reflow",
      label: { en: "Reflow from source", zh: "从 source 重新 reflow" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "Stable",
      label: {
        en: "Line complete and layout stable?",
        zh: "行完整且 layout 稳定？",
      },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 2,
    },
    {
      id: "Commit",
      label: { en: "Commit to history cell", zh: "提交到 history cell" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 3,
    },
    {
      id: "Tail",
      label: { en: "Render mutable live tail", zh: "渲染 mutable live tail" },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 3,
    },
  ],
  edges: [
    { from: "Delta", to: "Source" },
    { from: "Source", to: "Stable" },
    {
      from: "Stable",
      to: "Commit",
      label: { en: "yes", zh: "是" },
      tone: "success",
    },
    {
      from: "Stable",
      to: "Tail",
      label: { en: "no", zh: "否" },
      tone: "warning",
      style: "dashed",
    },
    { from: "Resize", to: "Reflow" },
    {
      from: "Source",
      to: "Reflow",
      style: "dashed",
      tone: "info",
    },
  ],
  legend: {
    en: "Only stable source becomes committed history; everything else stays in the live tail, reflowable on resize.",
    zh: "只有稳定 source 才会 commit 进 history，其余留在 live tail，并可在 resize 时 reflow。",
  },
};
