import type { FlowSpec } from "../../../components/visual/diagrams/types";

// Replaces the `flowchart LR` block under "Policy, Transform, Enforcement".
// Permission profile is split into filesystem/network policy, lowered into a
// platform-specific transform, and finally executed against one of four
// platform helpers (or none) before producing execution metadata.
export const policyTransformEnforcement: FlowSpec = {
  cols: 7,
  rows: 4,
  width: 960,
  height: 480,
  nodes: [
    {
      id: "Profile",
      label: { en: "permission profile", zh: "permission profile" },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Split",
      label: {
        en: "filesystem and network policy",
        zh: "filesystem 与 network policy",
      },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Select",
      label: {
        en: "select sandbox type",
        zh: "选择 sandbox type",
      },
      shape: "rounded",
      tone: "default",
      col: 2,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Transform",
      label: {
        en: "transform command and environment",
        zh: "改写 command 与 environment",
      },
      shape: "rounded",
      tone: "accent",
      col: 3,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Platform",
      label: { en: "platform helper", zh: "platform helper" },
      shape: "diamond",
      tone: "warning",
      col: 4,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Mac",
      label: { en: "macOS Seatbelt", zh: "macOS Seatbelt" },
      shape: "rounded",
      tone: "info",
      col: 5,
      row: 0,
    },
    {
      id: "Linux",
      label: {
        en: "Linux bwrap, namespaces, seccomp",
        zh: "Linux bwrap、namespaces、seccomp",
      },
      shape: "rounded",
      tone: "info",
      col: 5,
      row: 1,
    },
    {
      id: "Windows",
      label: {
        en: "Windows token, ACL, firewall, WFP",
        zh: "Windows token、ACL、firewall、WFP",
      },
      shape: "rounded",
      tone: "info",
      col: 5,
      row: 2,
    },
    {
      id: "None",
      label: { en: "no platform sandbox", zh: "无平台 sandbox" },
      shape: "rounded",
      tone: "muted",
      col: 5,
      row: 3,
    },
    {
      id: "Result",
      label: {
        en: "execution metadata and result",
        zh: "execution metadata 与结果",
      },
      shape: "pill",
      tone: "success",
      col: 6,
      row: 1,
      rowSpan: 2,
    },
  ],
  edges: [
    { from: "Profile", to: "Split" },
    { from: "Split", to: "Select" },
    { from: "Select", to: "Transform" },
    { from: "Transform", to: "Platform" },
    { from: "Platform", to: "Mac" },
    { from: "Platform", to: "Linux" },
    { from: "Platform", to: "Windows" },
    { from: "Platform", to: "None", style: "dashed", tone: "muted" },
    { from: "Mac", to: "Result", tone: "success" },
    { from: "Linux", to: "Result", tone: "success" },
    { from: "Windows", to: "Result", tone: "success" },
    { from: "None", to: "Result", style: "dashed", tone: "muted" },
  ],
  legend: {
    en: "Profiles compile into platform-specific enforcement: macOS Seatbelt, Linux bwrap, Windows ACLs, or none.",
    zh: "Profile 被编译成各平台的 enforcement：macOS Seatbelt、Linux bwrap、Windows ACL，或无 sandbox。",
  },
};
