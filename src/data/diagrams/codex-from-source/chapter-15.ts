import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces the "Client Taxonomy" `flowchart TD` block. Schema feeds the typed
// protocol clients (Rust, Python). The TypeScript SDK wraps `codex exec` and
// stops at the exec command surface. The daemon manages the local server
// process. Remote control reaches the runtime through a backend bridge.
export const clientTaxonomy: FlowSpec = {
  cols: 5,
  rows: 4,
  width: 920,
  height: 480,
  nodes: [
    {
      id: "Schema",
      label: { en: "Protocol schema", zh: "Protocol schema" },
      shape: "cylinder",
      tone: "accent",
      col: 0,
      row: 0,
      colSpan: 2,
    },
    {
      id: "Rust",
      label: { en: "Rust facade", zh: "Rust facade" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "Python",
      label: { en: "Python SDK", zh: "Python SDK" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
    },
    {
      id: "TypeScript",
      label: { en: "TypeScript SDK", zh: "TypeScript SDK" },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 1,
    },
    {
      id: "Daemon",
      label: { en: "App-server daemon", zh: "App-server daemon" },
      shape: "rounded",
      tone: "default",
      col: 3,
      row: 1,
    },
    {
      id: "Remote",
      label: { en: "Remote-control bridge", zh: "Remote-control bridge" },
      shape: "rounded",
      tone: "info",
      col: 4,
      row: 1,
    },
    {
      id: "Exec",
      label: { en: "Exec command surface", zh: "Exec command surface" },
      shape: "pill",
      tone: "warning",
      col: 2,
      row: 2,
    },
    {
      id: "Backend",
      label: { en: "Remote backend", zh: "Remote backend" },
      shape: "pill",
      tone: "muted",
      col: 4,
      row: 2,
    },
    {
      id: "Server",
      label: { en: "App-server runtime", zh: "App-server runtime" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 3,
      colSpan: 5,
    },
  ],
  edges: [
    { from: "Schema", to: "Rust", style: "dashed", tone: "accent" },
    { from: "Schema", to: "Python", style: "dashed", tone: "accent" },
    { from: "Rust", to: "Server" },
    { from: "Python", to: "Server" },
    { from: "TypeScript", to: "Exec", tone: "warning" },
    { from: "Daemon", to: "Server" },
    { from: "Remote", to: "Backend" },
    { from: "Backend", to: "Server" },
  ],
  legend: {
    en: "Protocol clients (Rust, Python) and daemon-managed connections share the runtime; the TypeScript SDK wraps the exec command instead.",
    zh: "Protocol client（Rust、Python）和 daemon 管理的连接共享 runtime；TypeScript SDK 则包装 exec 命令。",
  },
};

// Replaces the "Daemon Lifecycle" `flowchart TD` block. Lifecycle states fan
// out from a probing decision and converge again on Ready or Failed. The
// orphan End node is preserved from the source mermaid even though no edge
// terminates at it; it documents the lifecycle's logical exit.
export const daemonLifecycle: FlowSpec = {
  cols: 5,
  rows: 6,
  width: 880,
  height: 660,
  nodes: [
    {
      id: "Start",
      label: { en: "Start", zh: "Start" },
      shape: "pill",
      tone: "accent",
      col: 2,
      row: 0,
    },
    {
      id: "Unknown",
      label: { en: "Unknown", zh: "Unknown" },
      shape: "rounded",
      tone: "muted",
      col: 2,
      row: 1,
    },
    {
      id: "Probing",
      label: { en: "Probing", zh: "Probing" },
      shape: "diamond",
      tone: "warning",
      col: 2,
      row: 2,
    },
    {
      id: "Ready",
      label: { en: "Ready", zh: "Ready" },
      shape: "rounded",
      tone: "success",
      col: 1,
      row: 3,
    },
    {
      id: "Starting",
      label: { en: "Starting", zh: "Starting" },
      shape: "rounded",
      tone: "info",
      col: 3,
      row: 3,
    },
    {
      id: "Restarting",
      label: { en: "Restarting", zh: "Restarting" },
      shape: "rounded",
      tone: "warning",
      col: 0,
      row: 4,
    },
    {
      id: "Failed",
      label: { en: "Failed", zh: "Failed" },
      shape: "rounded",
      tone: "danger",
      col: 4,
      row: 4,
    },
    {
      id: "End",
      label: { en: "End", zh: "End" },
      shape: "pill",
      tone: "muted",
      col: 2,
      row: 5,
    },
  ],
  edges: [
    { from: "Start", to: "Unknown" },
    {
      from: "Unknown",
      to: "Probing",
      label: {
        en: "client asks for server",
        zh: "client 请求 server",
      },
    },
    {
      from: "Probing",
      to: "Ready",
      label: { en: "healthy response", zh: "healthy response" },
      tone: "success",
    },
    {
      from: "Probing",
      to: "Starting",
      label: { en: "no healthy server", zh: "无 healthy server" },
      tone: "info",
      style: "dashed",
    },
    {
      from: "Starting",
      to: "Ready",
      label: { en: "bootstrap succeeds", zh: "bootstrap 成功" },
      tone: "success",
    },
    {
      from: "Starting",
      to: "Failed",
      label: { en: "bootstrap fails", zh: "bootstrap 失败" },
      tone: "danger",
    },
    {
      from: "Ready",
      to: "Restarting",
      label: {
        en: "stale or update required",
        zh: "stale 或需更新",
      },
      tone: "warning",
    },
    {
      from: "Restarting",
      to: "Ready",
      label: { en: "probe succeeds", zh: "probe 成功" },
      tone: "success",
      style: "dashed",
    },
    {
      from: "Restarting",
      to: "Failed",
      label: { en: "restart fails", zh: "restart 失败" },
      tone: "danger",
    },
    {
      from: "Failed",
      to: "Starting",
      label: { en: "retry under lock", zh: "在 lock 下重试" },
      tone: "warning",
      style: "dashed",
    },
  ],
  legend: {
    en: "Daemon lifecycle: Unknown probes for a healthy server, then settles into Ready, Restarting, or Failed under operation locks.",
    zh: "Daemon 生命周期：Unknown 探测健康 server，然后在 operation lock 下落到 Ready、Restarting 或 Failed。",
  },
};

// Replaces the `sequenceDiagram` block under "Remote Control". Eleven messages
// trace one chunked round-trip across RemoteClient, Backend, Bridge, and the
// local app-server, including cursor acknowledgement for replay.
export const remoteControlSequence: SequenceSpec = {
  actors: [
    {
      id: "RemoteClient",
      label: { en: "Remote client", zh: "远程 client" },
      tone: "accent",
    },
    {
      id: "Backend",
      label: { en: "Backend stream", zh: "Backend 流" },
      tone: "info",
    },
    {
      id: "Bridge",
      label: { en: "Local remote bridge", zh: "本地 remote bridge" },
      tone: "warning",
    },
    {
      id: "Server",
      label: { en: "App-server", zh: "App-server" },
      tone: "success",
    },
  ],
  steps: [
    {
      from: "RemoteClient",
      to: "Backend",
      label: {
        en: "open logical connection",
        zh: "打开 logical connection",
      },
    },
    {
      from: "Backend",
      to: "Bridge",
      label: {
        en: "deliver connection metadata",
        zh: "下发 connection metadata",
      },
    },
    {
      from: "Bridge",
      to: "Server",
      label: {
        en: "create app-server connection",
        zh: "创建 app-server connection",
      },
    },
    {
      from: "RemoteClient",
      to: "Backend",
      label: { en: "send request chunk", zh: "发送 request chunk" },
    },
    {
      from: "Backend",
      to: "Bridge",
      label: {
        en: "forward chunk with cursor",
        zh: "携 cursor 转发 chunk",
      },
    },
    {
      from: "Bridge",
      to: "Server",
      label: { en: "submit protocol message", zh: "提交 protocol message" },
    },
    {
      from: "Server",
      to: "Bridge",
      label: {
        en: "emit response or notification",
        zh: "发出 response 或 notification",
      },
      kind: "reply",
    },
    {
      from: "Bridge",
      to: "Backend",
      label: { en: "send outbound chunk", zh: "发送 outbound chunk" },
      kind: "reply",
    },
    {
      from: "Backend",
      to: "RemoteClient",
      label: { en: "deliver message", zh: "投递 message" },
      kind: "reply",
    },
    {
      from: "RemoteClient",
      to: "Backend",
      label: { en: "acknowledge cursor", zh: "ack cursor" },
      kind: "async",
    },
    {
      from: "Backend",
      to: "Bridge",
      label: {
        en: "record ack for replay window",
        zh: "记录 ack 用于 replay window",
      },
      kind: "async",
    },
  ],
  legend: {
    en: "Remote control chunks every direction: outbound chunks carry cursors, the remote client acks, and the bridge records replay state.",
    zh: "Remote control 对双向传输都做 chunk：outbound chunk 携带 cursor，remote client ack 后 bridge 记录 replay 状态。",
  },
};
