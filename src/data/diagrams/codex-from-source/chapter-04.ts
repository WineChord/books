import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces sequenceDiagram for `Core Runtime Protocol`. The runtime is the
// only component that turns a client submission into a durable sequence of
// events.
export const submissionLifecycle: SequenceSpec = {
  actors: [
    { id: "Client", label: { en: "Client", zh: "客户端" }, tone: "info" },
    { id: "Runtime", label: { en: "Runtime", zh: "Runtime" }, tone: "accent" },
    { id: "Model", label: { en: "Model", zh: "模型" }, tone: "info" },
    { id: "Tool", label: { en: "Tool", zh: "工具" }, tone: "warning" },
    { id: "Store", label: { en: "Store", zh: "存储" }, tone: "muted" },
  ],
  steps: [
    {
      from: "Client",
      to: "Runtime",
      label: { en: "submission(operation)", zh: "submission(operation)" },
    },
    {
      from: "Runtime",
      to: "Store",
      label: {
        en: "append accepted fact",
        zh: "append accepted fact",
      },
    },
    {
      from: "Runtime",
      to: "Client",
      label: { en: "event(turn started)", zh: "event(turn started)" },
      kind: "reply",
    },
    {
      from: "Runtime",
      to: "Model",
      label: {
        en: "request with context",
        zh: "request with context",
      },
    },
    {
      from: "Model",
      to: "Runtime",
      label: { en: "model item stream", zh: "model item stream" },
      kind: "async",
    },
    {
      from: "Runtime",
      to: "Client",
      label: { en: "event(item delta)", zh: "event(item delta)" },
      kind: "reply",
    },
    {
      from: "Runtime",
      to: "Tool",
      label: {
        en: "bounded tool request",
        zh: "bounded tool request",
      },
    },
    {
      from: "Tool",
      to: "Runtime",
      label: { en: "observation", zh: "observation" },
      kind: "async",
    },
    {
      from: "Runtime",
      to: "Store",
      label: { en: "append observation", zh: "append observation" },
    },
    {
      from: "Runtime",
      to: "Client",
      label: { en: "event(turn completed)", zh: "event(turn completed)" },
      kind: "reply",
    },
  ],
  legend: {
    en: "Submissions go into the runtime; events come back out. The runtime owns the durable append-only store of facts.",
    zh: "Submission 进入 runtime，event 离开 runtime；runtime 拥有事实的 append-only 持久存储。",
  },
};

// Replaces flowchart TD for `App-Server JSON-RPC`. The pipeline forms a U
// shape: client requests descend on the right, runtime work runs along the
// bottom, and notifications climb back up the left toward the client.
export const appServerPipeline: FlowSpec = {
  cols: 3,
  rows: 5,
  width: 880,
  height: 620,
  nodes: [
    {
      id: "ide",
      label: { en: "IDE or SDK client", zh: "IDE 或 SDK 客户端" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "notify",
      label: { en: "Client notifications", zh: "Client notifications" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 1,
    },
    {
      id: "transport",
      label: {
        en: "Transport",
        zh: "Transport",
      },
      sub: {
        en: "stdio / socket / websocket / in-process",
        zh: "stdio / socket / websocket / in-process",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 1,
    },
    {
      id: "serverreq",
      label: {
        en: "Server-to-client requests",
        zh: "Server-to-client requests",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 1,
    },
    {
      id: "mapper",
      label: { en: "App-server item mapper", zh: "App-server item mapper" },
      shape: "rounded",
      tone: "accent",
      col: 0,
      row: 2,
    },
    {
      id: "rpc",
      label: { en: "JSON-RPC envelope", zh: "JSON-RPC envelope" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 2,
    },
    {
      id: "events",
      label: { en: "Core events", zh: "Core events" },
      shape: "rounded",
      tone: "default",
      col: 0,
      row: 3,
    },
    {
      id: "processor",
      label: { en: "Message processor", zh: "Message processor" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 3,
    },
    {
      id: "core",
      label: { en: "Core runtime operations", zh: "Core runtime operations" },
      shape: "rounded",
      tone: "default",
      col: 0,
      row: 4,
    },
    {
      id: "appmodel",
      label: { en: "Thread, turn, item APIs", zh: "Thread、turn、item APIs" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 4,
    },
  ],
  edges: [
    { from: "ide", to: "transport" },
    { from: "transport", to: "rpc" },
    { from: "rpc", to: "processor" },
    { from: "processor", to: "appmodel" },
    { from: "processor", to: "serverreq", tone: "warning" },
    { from: "appmodel", to: "core" },
    { from: "core", to: "events" },
    { from: "events", to: "mapper" },
    { from: "mapper", to: "notify", tone: "accent" },
    {
      from: "notify",
      to: "ide",
      style: "dashed",
      tone: "success",
    },
    {
      from: "serverreq",
      to: "ide",
      style: "dashed",
      tone: "warning",
    },
  ],
  legend: {
    en: "Client requests descend through transport, JSON-RPC, and the message processor; events climb back as notifications, with server-to-client requests escaping the loop.",
    zh: "客户端请求经 transport、JSON-RPC、message processor 下行；event 经 mapper 与 notification 返回，server-to-client request 则直接跳出循环。",
  },
};

// Replaces flowchart TD for the core-event-to-app-server-item mapping. One
// core event fans out into thread items, deltas, status updates, or
// server-to-client requests before reaching the client projection.
export const eventToItemMapping: FlowSpec = {
  cols: 4,
  rows: 4,
  width: 820,
  height: 520,
  nodes: [
    {
      id: "CoreEvent",
      label: { en: "Core event", zh: "Core event" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
      colSpan: 4,
    },
    {
      id: "Kind",
      label: { en: "event kind", zh: "event kind" },
      shape: "diamond",
      tone: "warning",
      col: 0,
      row: 1,
      colSpan: 4,
    },
    {
      id: "Item",
      label: { en: "Thread item", zh: "Thread item" },
      shape: "rounded",
      tone: "default",
      col: 0,
      row: 2,
    },
    {
      id: "Delta",
      label: { en: "Item delta", zh: "Item delta" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 2,
    },
    {
      id: "Status",
      label: {
        en: "Thread or turn status",
        zh: "Thread 或 turn status",
      },
      shape: "rounded",
      tone: "default",
      col: 2,
      row: 2,
    },
    {
      id: "ServerRequest",
      label: {
        en: "Server-to-client request",
        zh: "Server-to-client request",
      },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 2,
    },
    {
      id: "Projection",
      label: { en: "Client projection", zh: "Client projection" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 3,
      colSpan: 4,
    },
  ],
  edges: [
    { from: "CoreEvent", to: "Kind" },
    { from: "Kind", to: "Item" },
    { from: "Kind", to: "Delta" },
    { from: "Kind", to: "Status" },
    { from: "Kind", to: "ServerRequest", tone: "warning" },
    { from: "Item", to: "Projection" },
    { from: "Delta", to: "Projection" },
    { from: "Status", to: "Projection" },
    {
      from: "ServerRequest",
      to: "Projection",
      tone: "warning",
    },
  ],
  legend: {
    en: "A single core event becomes an item, a delta, a status update, or a server-to-client request before reaching the client projection.",
    zh: "一个 core event 会被分发成 item、delta、status 或 server-to-client request，最终汇入 client projection。",
  },
};

// Replaces flowchart LR for `What Can Enter and Leave`. The horizontal chain
// shows the four sequential gates; the side notes describe what can cross the
// protocol boundary in each direction.
export const partOneGates: FlowSpec = {
  cols: 6,
  rows: 3,
  width: 960,
  height: 380,
  nodes: [
    {
      id: "enters",
      label: {
        en: "Can enter: operations, approvals, tool responses, turn input",
        zh: "可进入：operations、approvals、tool responses、turn input",
      },
      shape: "note",
      tone: "info",
      col: 4,
      row: 0,
      colSpan: 2,
    },
    {
      id: "install",
      label: { en: "Installed command", zh: "安装后的命令" },
      shape: "pill",
      tone: "muted",
      col: 0,
      row: 1,
    },
    {
      id: "router",
      label: { en: "Rust router", zh: "Rust router" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 1,
    },
    {
      id: "envelope",
      label: {
        en: "Resolved runtime envelope",
        zh: "Resolved runtime envelope",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "protocol",
      label: { en: "Protocol boundary", zh: "Protocol boundary" },
      shape: "rounded",
      tone: "accent",
      col: 3,
      row: 1,
    },
    {
      id: "runtime",
      label: { en: "Session runtime", zh: "Session runtime" },
      shape: "pill",
      tone: "success",
      col: 4,
      row: 1,
      colSpan: 2,
    },
    {
      id: "leaves",
      label: {
        en: "Can leave: events, items, status, requests, errors",
        zh: "可离开：events、items、status、requests、errors",
      },
      shape: "note",
      tone: "success",
      col: 4,
      row: 2,
      colSpan: 2,
    },
  ],
  edges: [
    { from: "install", to: "router" },
    { from: "router", to: "envelope" },
    { from: "envelope", to: "protocol" },
    { from: "protocol", to: "runtime", tone: "accent" },
    {
      from: "protocol",
      to: "enters",
      style: "dashed",
      tone: "info",
    },
    {
      from: "protocol",
      to: "leaves",
      style: "dashed",
      tone: "success",
    },
  ],
  legend: {
    en: "Four sequential gates bound what reaches the session runtime and what observable facts leave it.",
    zh: "四道顺序 gate 共同界定什么能到达 session runtime，以及什么可观察事实能离开它。",
  },
};
