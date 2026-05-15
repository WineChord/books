import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Replaces the `flowchart LR` describing the patch lifecycle. The chain is
// laid out as a U-shape so the long linear flow stays readable: detect
// intent across the top row, then approve, apply, and emit results returning
// across the bottom row to the model-visible result on the left.
export const patchLifecycle: FlowSpec = {
  cols: 5,
  rows: 2,
  width: 940,
  height: 280,
  nodes: [
    {
      id: "Input",
      label: {
        en: "Freeform patch or shell-like invocation",
        zh: "Freeform patch 或 shell 形式调用",
      },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Detect",
      label: {
        en: "Detect apply-patch intent",
        zh: "识别 apply-patch 意图",
      },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 0,
    },
    {
      id: "Parse",
      label: { en: "Parse patch hunks", zh: "Parse patch hunks" },
      shape: "rounded",
      tone: "default",
      col: 2,
      row: 0,
    },
    {
      id: "Verify",
      label: {
        en: "Verify paths and current file content",
        zh: "校验 paths 与当前文件内容",
      },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 0,
    },
    {
      id: "Assess",
      label: {
        en: "Assess safety and required permissions",
        zh: "评估 safety 与所需权限",
      },
      shape: "diamond",
      tone: "warning",
      col: 4,
      row: 0,
    },
    {
      id: "Approve",
      label: { en: "Approval and hooks", zh: "Approval 与 hooks" },
      shape: "rounded",
      tone: "warning",
      col: 4,
      row: 1,
    },
    {
      id: "Apply",
      label: {
        en: "Filesystem-backed apply",
        zh: "通过文件系统应用",
      },
      shape: "rounded",
      tone: "accent",
      col: 3,
      row: 1,
    },
    {
      id: "Delta",
      label: { en: "Committed delta", zh: "Committed delta" },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 1,
    },
    {
      id: "Events",
      label: {
        en: "Patch events and turn diff",
        zh: "Patch events 与 turn diff",
      },
      shape: "pill",
      tone: "success",
      col: 1,
      row: 1,
    },
    {
      id: "Result",
      label: { en: "Model-visible result", zh: "Model-visible 结果" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 1,
    },
  ],
  edges: [
    { from: "Input", to: "Detect" },
    { from: "Detect", to: "Parse" },
    { from: "Parse", to: "Verify" },
    { from: "Verify", to: "Assess" },
    { from: "Assess", to: "Approve", tone: "warning" },
    { from: "Approve", to: "Apply", tone: "accent" },
    { from: "Apply", to: "Delta", tone: "success" },
    { from: "Delta", to: "Events" },
    { from: "Events", to: "Result", tone: "success" },
  ],
  legend: {
    en: "Patch is a protocol, not a string: parse, verify, approve, apply through the executor filesystem, and emit a structured delta.",
    zh: "Patch 是协议，不是字符串：parse、verify、approve、通过 executor filesystem 应用，再产出结构化 delta。",
  },
};
