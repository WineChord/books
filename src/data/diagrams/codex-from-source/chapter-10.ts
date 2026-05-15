import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Replaces the `flowchart TD` describing the shell execution chain: from the
// model tool call all the way to events, telemetry, and a model-visible
// result. Each node owns one decision so the chain stays explainable.
export const shellExecutionChain: FlowSpec = {
  cols: 3,
  rows: 10,
  width: 720,
  height: 1100,
  nodes: [
    {
      id: "Call",
      label: { en: "Tool call", zh: "Tool call" },
      shape: "pill",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "Parse",
      label: {
        en: "Parse command and arguments",
        zh: "解析 command 与 arguments",
      },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 1,
    },
    {
      id: "Classify",
      label: {
        en: "Classify safety and policy",
        zh: "分类 safety 与 policy",
      },
      shape: "rounded",
      tone: "warning",
      col: 1,
      row: 2,
    },
    {
      id: "Hooks",
      label: {
        en: "Pre-tool and permission hooks",
        zh: "Pre-tool 与 permission hooks",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 3,
    },
    {
      id: "Approval",
      label: { en: "Approval or rejection", zh: "Approval 或 rejection" },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 4,
    },
    {
      id: "Sandbox",
      label: {
        en: "Permission profile to sandbox attempt",
        zh: "Permission profile 转 sandbox attempt",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 5,
    },
    {
      id: "Env",
      label: {
        en: "Environment and exec-server backend",
        zh: "Environment 与 exec-server backend",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 6,
    },
    {
      id: "Process",
      label: { en: "Managed process", zh: "Managed process" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 7,
    },
    {
      id: "Output",
      label: {
        en: "Sequenced output and exit",
        zh: "Sequenced output 与 exit",
      },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 8,
    },
    {
      id: "Events",
      label: {
        en: "Events, telemetry, model result",
        zh: "Events、telemetry、model result",
      },
      shape: "pill",
      tone: "success",
      col: 1,
      row: 9,
    },
  ],
  edges: [
    { from: "Call", to: "Parse" },
    { from: "Parse", to: "Classify" },
    { from: "Classify", to: "Hooks" },
    { from: "Hooks", to: "Approval" },
    { from: "Approval", to: "Sandbox", tone: "success" },
    { from: "Sandbox", to: "Env" },
    { from: "Env", to: "Process", tone: "accent" },
    { from: "Process", to: "Output" },
    { from: "Output", to: "Events", tone: "success" },
  ],
  legend: {
    en: "No single box makes shell execution safe; the order — parse, classify, hook, approve, sandbox, environment, process, output, events — is the safety guarantee.",
    zh: "Shell 执行的安全性不来自任何单一节点，而来自顺序：parse、classify、hook、approve、sandbox、environment、process、output、events。",
  },
};
