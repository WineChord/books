import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Replaces the "Contract Surface" `flowchart LR` block. The path forms a U:
// inbound bytes flow right across the top (Client, Transport, Processor,
// Queue, Request, Thread) and outbound traffic flows back across the bottom
// (Listener, Sender) before the transport hands the response back to Client.
export const contractSurface: FlowSpec = {
  cols: 5,
  rows: 2,
  width: 920,
  height: 320,
  nodes: [
    {
      id: "Client",
      label: { en: "Client connection", zh: "Client 连接" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Transport",
      label: { en: "Transport adapter", zh: "Transport adapter" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 0,
    },
    {
      id: "Processor",
      label: { en: "Message processor", zh: "Message processor" },
      shape: "rounded",
      tone: "accent",
      col: 2,
      row: 0,
    },
    {
      id: "Queue",
      label: {
        en: "Resource scoped queue",
        zh: "Resource-scoped queue",
      },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 0,
    },
    {
      id: "Request",
      label: { en: "Request processor", zh: "Request processor" },
      shape: "rounded",
      tone: "accent",
      col: 4,
      row: 0,
    },
    {
      id: "Thread",
      label: { en: "Core thread", zh: "Core thread" },
      shape: "rounded",
      tone: "success",
      col: 4,
      row: 1,
    },
    {
      id: "Listener",
      label: { en: "Thread listener", zh: "Thread listener" },
      shape: "rounded",
      tone: "default",
      col: 3,
      row: 1,
    },
    {
      id: "Sender",
      label: { en: "Outgoing sender", zh: "Outgoing sender" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
  ],
  edges: [
    { from: "Client", to: "Transport" },
    { from: "Transport", to: "Processor" },
    { from: "Processor", to: "Queue" },
    { from: "Queue", to: "Request" },
    { from: "Request", to: "Thread" },
    { from: "Thread", to: "Listener" },
    { from: "Listener", to: "Sender" },
    { from: "Sender", to: "Transport", tone: "info" },
    { from: "Transport", to: "Client", tone: "info" },
    {
      from: "Processor",
      to: "Sender",
      label: {
        en: "initialization and gates",
        zh: "initialization 与 gates",
      },
      style: "dashed",
      tone: "muted",
    },
    {
      from: "Listener",
      to: "Sender",
      label: {
        en: "notifications and requests",
        zh: "notifications 与 requests",
      },
      style: "dashed",
      tone: "muted",
    },
  ],
  legend: {
    en: "Bytes never reach core directly: ingress flows through validation and queues, egress flows through listeners and senders.",
    zh: "字节永远不会直接进入 core：入站走 validation 与 queue，出站走 listener 与 sender。",
  },
};

// Replaces the "Event Mapping" `flowchart TD` block. A core runtime event is
// classified into a notification (history), a server request (pending), or a
// derived status (folded back into notifications). Pending requests can later
// re-enter the core runtime, hence the dashed back-edge.
export const eventMapping: FlowSpec = {
  cols: 3,
  rows: 4,
  width: 760,
  height: 480,
  nodes: [
    {
      id: "CoreEvent",
      label: { en: "Core runtime event", zh: "Core runtime event" },
      shape: "pill",
      tone: "muted",
      col: 1,
      row: 0,
    },
    {
      id: "Classify",
      label: {
        en: "How should clients see it?",
        zh: "Client 应该如何看到它？",
      },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 1,
    },
    {
      id: "Notify",
      label: { en: "Server notification", zh: "Server notification" },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 2,
    },
    {
      id: "Ask",
      label: { en: "Server request", zh: "Server request" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 2,
    },
    {
      id: "Status",
      label: { en: "Derived thread status", zh: "Derived thread status" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 2,
    },
    {
      id: "History",
      label: { en: "History reconstruction", zh: "History 重建" },
      shape: "cylinder",
      tone: "default",
      col: 0,
      row: 3,
    },
    {
      id: "Pending",
      label: { en: "Pending response tracker", zh: "Pending response tracker" },
      shape: "cylinder",
      tone: "warning",
      col: 1,
      row: 3,
    },
  ],
  edges: [
    { from: "CoreEvent", to: "Classify" },
    { from: "Classify", to: "Notify", tone: "success" },
    { from: "Classify", to: "Ask", tone: "accent" },
    { from: "Classify", to: "Status", tone: "info" },
    { from: "Notify", to: "History" },
    { from: "Ask", to: "Pending" },
    { from: "Status", to: "Notify", tone: "info" },
    {
      from: "Pending",
      to: "CoreEvent",
      style: "dashed",
      tone: "warning",
      route: "curve",
    },
  ],
  legend: {
    en: "Core events fan out into notifications, server requests, or derived status; pending requests can re-enter the runtime.",
    zh: "Core event 扇出成 notification、server request 或 derived status；pending request 可以再次进入 runtime。",
  },
};
