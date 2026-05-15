import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Replaces the `flowchart TD` describing how runtime sources flow through the
// trace context, writer, raw event/payload sinks, and offline reducer.
export const rolloutTracePipeline: FlowSpec = {
  cols: 3,
  rows: 6,
  width: 760,
  height: 720,
  nodes: [
    {
      id: "Runtime",
      label: { en: "Runtime sources", zh: "Runtime 来源" },
      sub: {
        en: "turns, inference, tools, terminal, agents",
        zh: "turns、inference、tools、terminal、agents",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "Context",
      label: { en: "Trace context", zh: "Trace context" },
      sub: {
        en: "root and child threads",
        zh: "root 与子 threads",
      },
      shape: "note",
      tone: "muted",
      col: 1,
      row: 1,
    },
    {
      id: "Writer",
      label: { en: "Trace writer", zh: "Trace writer" },
      sub: {
        en: "sequence numbers",
        zh: "sequence numbers",
      },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 2,
    },
    {
      id: "Events",
      label: { en: "Raw event log", zh: "Raw event log" },
      shape: "cylinder",
      tone: "default",
      col: 0,
      row: 3,
    },
    {
      id: "Payloads",
      label: { en: "Raw payload files", zh: "Raw payload 文件" },
      shape: "cylinder",
      tone: "default",
      col: 2,
      row: 3,
    },
    {
      id: "Reducer",
      label: { en: "Offline reducer", zh: "Offline reducer" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 4,
    },
    {
      id: "Graph",
      label: { en: "Reduced graph", zh: "Reduced graph" },
      sub: {
        en: "threads, turns, items, tools, terminals, edges",
        zh: "threads、turns、items、tools、terminals、edges",
      },
      shape: "rounded",
      tone: "success",
      col: 1,
      row: 5,
    },
  ],
  edges: [
    { from: "Runtime", to: "Context" },
    { from: "Context", to: "Writer" },
    { from: "Writer", to: "Events" },
    { from: "Writer", to: "Payloads" },
    { from: "Events", to: "Reducer" },
    { from: "Payloads", to: "Reducer" },
    { from: "Reducer", to: "Graph", tone: "accent" },
  ],
  legend: {
    en: "Runtime captures sequenced raw evidence; an offline reducer turns it into the explanation graph.",
    zh: "Runtime 捕获带 sequence 的原始证据，offline reducer 再把它们还原成解释图。",
  },
};

// Replaces the `flowchart LR` describing how raw payloads enter the strict
// reducer and become the four kinds of reduced trace objects.
export const traceReducerInputs: FlowSpec = {
  cols: 3,
  rows: 4,
  width: 860,
  height: 480,
  nodes: [
    {
      id: "RawModel",
      label: { en: "Raw model payloads", zh: "Raw model payloads" },
      shape: "cylinder",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "RawRuntime",
      label: { en: "Raw runtime payloads", zh: "Raw runtime payloads" },
      shape: "cylinder",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "RawTerminal",
      label: { en: "Raw terminal payloads", zh: "Raw terminal payloads" },
      shape: "cylinder",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "Reducer",
      label: { en: "Strict reducer", zh: "Strict reducer" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Conversation",
      label: { en: "Conversation items", zh: "Conversation items" },
      sub: {
        en: "what the model saw",
        zh: "模型实际看到的内容",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 0,
    },
    {
      id: "RuntimeObjects",
      label: { en: "Runtime objects", zh: "Runtime objects" },
      sub: {
        en: "tools, terminals, compactions",
        zh: "tools、terminals、compactions",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 1,
    },
    {
      id: "Edges",
      label: { en: "Interaction edges", zh: "Interaction edges" },
      sub: {
        en: "causal flow",
        zh: "causal flow",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 2,
    },
    {
      id: "Refs",
      label: { en: "Raw payload references", zh: "Raw payload references" },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 3,
    },
  ],
  edges: [
    { from: "RawModel", to: "Reducer" },
    { from: "RawRuntime", to: "Reducer" },
    { from: "RawTerminal", to: "Reducer" },
    { from: "Reducer", to: "Conversation", tone: "success" },
    { from: "Reducer", to: "RuntimeObjects", tone: "success" },
    { from: "Reducer", to: "Edges", tone: "success" },
    { from: "Reducer", to: "Refs", tone: "success" },
  ],
  legend: {
    en: "Raw payloads enter a strict reducer that produces conversation, runtime, edge, and reference objects without conflating them.",
    zh: "原始 payloads 进入严格 reducer，产出 conversation、runtime、edge 与 reference 对象，互不混淆。",
  },
};
