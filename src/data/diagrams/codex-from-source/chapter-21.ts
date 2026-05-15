import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces flowchart TD for the cloud backend contract layout.
export const cloudBackendContract: FlowSpec = {
  cols: 4,
  rows: 6,
  width: 880,
  height: 700,
  nodes: [
    {
      id: "CLI",
      label: { en: "cloud CLI command", zh: "cloud CLI 命令" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 0,
      colSpan: 2,
    },
    {
      id: "TUI",
      label: { en: "cloud task TUI", zh: "cloud task TUI" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 0,
      colSpan: 2,
    },
    {
      id: "BackendTrait",
      label: {
        en: "cloud backend contract",
        zh: "cloud backend 契约",
      },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 1,
      colSpan: 2,
    },
    {
      id: "HTTP",
      label: {
        en: "HTTP backend client",
        zh: "HTTP backend client",
      },
      shape: "rounded",
      tone: "warning",
      col: 0,
      row: 2,
      colSpan: 2,
    },
    {
      id: "Mock",
      label: { en: "mock backend", zh: "mock backend" },
      shape: "rounded",
      tone: "muted",
      col: 2,
      row: 2,
      colSpan: 2,
    },
    {
      id: "Remote",
      label: {
        en: "remote Codex task service",
        zh: "远端 Codex task service",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 3,
      colSpan: 2,
    },
    {
      id: "Diff",
      label: {
        en: "task diff and attempt metadata",
        zh: "task diff 与 attempt metadata",
      },
      shape: "cylinder",
      tone: "muted",
      col: 0,
      row: 4,
      colSpan: 2,
    },
    {
      id: "LocalPatch",
      label: {
        en: "local patch preflight/apply",
        zh: "本地 patch preflight/apply",
      },
      shape: "rounded",
      tone: "accent",
      col: 2,
      row: 4,
      colSpan: 2,
    },
    {
      id: "Worktree",
      label: { en: "current worktree", zh: "当前 worktree" },
      shape: "cylinder",
      tone: "success",
      col: 1,
      row: 5,
      colSpan: 2,
    },
  ],
  edges: [
    { from: "CLI", to: "BackendTrait" },
    { from: "TUI", to: "BackendTrait" },
    { from: "BackendTrait", to: "HTTP", tone: "warning" },
    {
      from: "BackendTrait",
      to: "Mock",
      tone: "muted",
      style: "dashed",
    },
    { from: "HTTP", to: "Remote" },
    { from: "Remote", to: "Diff" },
    { from: "Diff", to: "LocalPatch", tone: "accent" },
    {
      from: "CLI",
      to: "LocalPatch",
      tone: "info",
      style: "dashed",
      label: { en: "apply", zh: "apply" },
    },
    {
      from: "TUI",
      to: "LocalPatch",
      tone: "info",
      style: "dashed",
      label: { en: "apply", zh: "apply" },
    },
    { from: "LocalPatch", to: "Worktree", tone: "success" },
  ],
  legend: {
    en: "Backend contract owns remote state; local patch path is the only writer of the checkout.",
    zh: "Backend 契约掌管远端状态；本地 patch path 才是唯一改动 checkout 的路径。",
  },
};

// Replaces sequenceDiagram for the apply-task local boundary.
export const applyTaskFlow: SequenceSpec = {
  actors: [
    {
      id: "User",
      label: { en: "User", zh: "用户" },
      tone: "warning",
    },
    {
      id: "CloudUI",
      label: { en: "Cloud CLI/TUI", zh: "Cloud CLI/TUI" },
      tone: "accent",
    },
    {
      id: "Backend",
      label: { en: "Backend", zh: "Backend" },
      tone: "info",
    },
    {
      id: "Patch",
      label: { en: "Local patch engine", zh: "本地 patch engine" },
      tone: "accent",
    },
    {
      id: "Worktree",
      label: { en: "Worktree", zh: "Worktree" },
      tone: "success",
    },
  ],
  steps: [
    {
      from: "User",
      to: "CloudUI",
      label: {
        en: "choose task and attempt",
        zh: "选择 task 与 attempt",
      },
    },
    {
      from: "CloudUI",
      to: "Backend",
      label: {
        en: "fetch details or selected attempt diff",
        zh: "获取详情或所选 attempt 的 diff",
      },
    },
    {
      from: "Backend",
      to: "CloudUI",
      label: {
        en: "unified diff plus metadata",
        zh: "unified diff 加 metadata",
      },
      kind: "reply",
    },
    {
      from: "CloudUI",
      to: "CloudUI",
      label: {
        en: "reject incompatible diff shape",
        zh: "拒绝不兼容的 diff 形态",
      },
      tone: "danger",
    },
    {
      from: "CloudUI",
      to: "Patch",
      label: {
        en: "preflight diff against current worktree",
        zh: "针对当前 worktree 做 preflight",
      },
    },
    {
      from: "Patch",
      to: "CloudUI",
      label: {
        en: "clean, partial, or error",
        zh: "clean / partial / error",
      },
      kind: "reply",
    },
    {
      from: "User",
      to: "CloudUI",
      label: { en: "confirm apply", zh: "确认 apply" },
      tone: "warning",
    },
    {
      from: "CloudUI",
      to: "Patch",
      label: {
        en: "apply selected diff locally",
        zh: "在本地应用所选 diff",
      },
    },
    {
      from: "Patch",
      to: "Worktree",
      label: {
        en: "modify files if clean enough",
        zh: "条件满足时修改文件",
      },
      tone: "success",
    },
    {
      from: "Patch",
      to: "CloudUI",
      label: {
        en: "applied paths, skipped paths, conflicts",
        zh: "applied / skipped / conflicts",
      },
      kind: "reply",
    },
  ],
  legend: {
    en: "Remote completion does not imply local mutation: preflight, confirm, and local patch own the boundary.",
    zh: "远端完成不代表本地已变更：preflight、确认与本地 patch 共同守住边界。",
  },
};

// Replaces flowchart LR for agent identity binding.
export const agentIdentityBinding: FlowSpec = {
  cols: 6,
  rows: 3,
  width: 960,
  height: 360,
  nodes: [
    {
      id: "Key",
      label: {
        en: "runtime key material",
        zh: "runtime 密钥材料",
      },
      shape: "cylinder",
      tone: "muted",
      col: 0,
      row: 1,
    },
    {
      id: "Public",
      label: {
        en: "public registration identity",
        zh: "公开注册身份",
      },
      shape: "pill",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "Signed",
      label: {
        en: "signed task assertion",
        zh: "已签名 task assertion",
      },
      shape: "pill",
      tone: "info",
      col: 1,
      row: 2,
    },
    {
      id: "Register",
      label: {
        en: "task registration request",
        zh: "task 注册请求",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 0,
    },
    {
      id: "ABOM",
      label: {
        en: "agent bill of materials",
        zh: "agent bill of materials",
      },
      shape: "note",
      tone: "muted",
      col: 2,
      row: 2,
    },
    {
      id: "Backend",
      label: {
        en: "backend identity service",
        zh: "backend 身份服务",
      },
      shape: "rounded",
      tone: "accent",
      col: 3,
      row: 1,
    },
    {
      id: "JWT",
      label: { en: "identity JWT claims", zh: "身份 JWT claims" },
      shape: "pill",
      tone: "success",
      col: 4,
      row: 1,
    },
    {
      id: "Task",
      label: {
        en: "authorized task access",
        zh: "已授权 task 访问",
      },
      shape: "pill",
      tone: "success",
      col: 5,
      row: 1,
    },
  ],
  edges: [
    { from: "Key", to: "Public", tone: "info" },
    { from: "Key", to: "Signed", tone: "info" },
    { from: "Public", to: "Register" },
    { from: "Register", to: "Backend", tone: "warning" },
    { from: "Signed", to: "Backend", tone: "accent" },
    {
      from: "ABOM",
      to: "Backend",
      tone: "muted",
      style: "dashed",
    },
    { from: "Backend", to: "JWT", tone: "success" },
    { from: "JWT", to: "Task", tone: "success" },
  ],
  legend: {
    en: "User auth establishes account context; agent identity binds one runtime key to one task authorization.",
    zh: "用户认证建立账号上下文；agent identity 把某个 runtime key 绑定到某个 task 授权。",
  },
};
