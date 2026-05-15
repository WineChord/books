import type {
  Bilingual,
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// ASCII rendering of TurnContext as a single struct grouped by responsibility.
export const envelopeGroups: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `+----------------------------- TurnContext envelope -----------------------------+
|                                                                                |
|  identity        | model, provider, reasoning, session_source, thread_source   |
|  workspace       | cwd, current_date, timezone, env_overlay, app_metadata      |
|  instructions    | base_instructions, developer_instructions, compact_prompt   |
|  policy          | approval_policy, permission_profile, sandbox_level,         |
|                  | network_proxy, shell_env_policy                             |
|  capabilities    | tools, dynamic_tools, feature_gates, skill_state            |
|  modes           | collaboration_mode, personality, realtime_flag              |
|  telemetry       | turn_id, timing_state, readiness_gates                       |
|                                                                                |
+--------------------------------------------------------------------------------+`,
    zh: `+----------------------------- TurnContext envelope -----------------------------+
|                                                                                |
|  identity        | model, provider, reasoning, session_source, thread_source   |
|  workspace       | cwd, current_date, timezone, env_overlay, app_metadata      |
|  instructions    | base_instructions, developer_instructions, compact_prompt   |
|  policy          | approval_policy, permission_profile, sandbox_level,         |
|                  | network_proxy, shell_env_policy                             |
|  capabilities    | tools, dynamic_tools, feature_gates, skill_state            |
|  modes           | collaboration_mode, personality, realtime_flag              |
|  telemetry       | turn_id, timing_state, readiness_gates                       |
|                                                                                |
+--------------------------------------------------------------------------------+`,
  },
  legend: {
    en: "Seven semantic groups feed seven different consumers; keeping them inside one envelope keeps the model's view aligned with the executor's contract.",
    zh: "七组语义字段喂给七类消费者；放在一个 envelope 里能让模型看到的视图与 executor 实际执行的契约保持一致。",
  },
  highlights: [
    { match: "TurnContext envelope", tone: "accent" },
    { match: "identity", tone: "info" },
    { match: "workspace", tone: "info" },
    { match: "instructions", tone: "info" },
    { match: "policy", tone: "warning" },
    { match: "capabilities", tone: "success" },
    { match: "modes", tone: "muted" },
    { match: "telemetry", tone: "muted" },
  ],
};

// Replaces the chapter-02 mermaid flowchart LR: seven inputs converge on
// the TurnContext, which then feeds five named consumers.
export const envelopeFlow: FlowSpec = {
  cols: 3,
  rows: 7,
  width: 880,
  height: 760,
  nodes: [
    {
      id: "Config",
      label: { en: "Config resolution", zh: "Config 解析" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Auth",
      label: { en: "Auth and provider", zh: "Auth 与 provider" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 1,
    },
    {
      id: "Workspace",
      label: { en: "Workspace and env", zh: "Workspace 与 env" },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "Policies",
      label: {
        en: "Policies and managed reqs",
        zh: "策略与 managed reqs",
      },
      shape: "rounded",
      tone: "warning",
      col: 0,
      row: 3,
    },
    {
      id: "Tools",
      label: { en: "Tools and features", zh: "Tools 与 features" },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 4,
    },
    {
      id: "Skills",
      label: { en: "Skills and plugins", zh: "Skills 与 plugins" },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 5,
    },
    {
      id: "Timing",
      label: {
        en: "Timing and telemetry",
        zh: "Timing 与 telemetry",
      },
      shape: "rounded",
      tone: "muted",
      col: 0,
      row: 6,
    },
    {
      id: "TurnContext",
      label: { en: "TurnContext", zh: "TurnContext" },
      sub: { en: "envelope", zh: "信封" },
      shape: "cylinder",
      tone: "accent",
      col: 1,
      row: 1,
      rowSpan: 5,
    },
    {
      id: "ContextDiffs",
      label: { en: "Context diffs", zh: "Context diffs" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "ToolBuild",
      label: {
        en: "Tool spec construction",
        zh: "Tool spec 构造",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 2,
    },
    {
      id: "Sandbox",
      label: { en: "Sandbox executor", zh: "Sandbox executor" },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 3,
    },
    {
      id: "ModelRequest",
      label: { en: "Model request", zh: "Model request" },
      shape: "rounded",
      tone: "default",
      col: 2,
      row: 4,
    },
    {
      id: "RolloutTrace",
      label: { en: "Rollout trace", zh: "Rollout trace" },
      shape: "cylinder",
      tone: "muted",
      col: 2,
      row: 5,
    },
  ],
  edges: [
    { from: "Config", to: "TurnContext" },
    { from: "Auth", to: "TurnContext" },
    { from: "Workspace", to: "TurnContext" },
    { from: "Policies", to: "TurnContext", tone: "warning" },
    { from: "Tools", to: "TurnContext", tone: "success" },
    { from: "Skills", to: "TurnContext", tone: "success" },
    { from: "Timing", to: "TurnContext", tone: "muted" },
    { from: "TurnContext", to: "ContextDiffs", tone: "info" },
    { from: "TurnContext", to: "ToolBuild", tone: "success" },
    { from: "TurnContext", to: "Sandbox", tone: "warning" },
    { from: "TurnContext", to: "ModelRequest", tone: "accent" },
    { from: "TurnContext", to: "RolloutTrace", tone: "muted", style: "dashed" },
  ],
  legend: {
    en: "Seven inputs build one envelope; five consumers read from it. Different fields drive different downstream paths.",
    zh: "七路输入构造同一个 envelope，五类消费者从它读取；不同字段驱动不同下游路径。",
  },
};

// Replaces the chapter-02 sequenceDiagram for model switching with pre-
// sampling compaction.
export const modelSwitchSequence: SequenceSpec = {
  actors: [
    { id: "User", label: { en: "User", zh: "用户" }, tone: "info" },
    {
      id: "Envelope",
      label: { en: "TurnContext", zh: "TurnContext" },
      tone: "accent",
    },
    {
      id: "Compactor",
      label: { en: "Compactor", zh: "Compactor" },
      tone: "warning",
    },
    {
      id: "OldModel",
      label: { en: "Old model", zh: "旧模型" },
      tone: "muted",
    },
    {
      id: "NewModel",
      label: { en: "New model", zh: "新模型" },
      tone: "success",
    },
  ],
  steps: [
    {
      from: "User",
      to: "Envelope",
      label: { en: "switch model", zh: "切换模型" },
    },
    {
      from: "Envelope",
      to: "OldModel",
      label: {
        en: "detect smaller new window",
        zh: "检测到新窗口更小",
      },
    },
    {
      from: "Envelope",
      to: "Compactor",
      label: {
        en: "pre-sampling compaction (old model)",
        zh: "采样前 compaction (旧模型)",
      },
    },
    {
      from: "Compactor",
      to: "OldModel",
      label: {
        en: "ask for summary while window allows",
        zh: "趁窗口还够时请求摘要",
      },
    },
    {
      from: "OldModel",
      to: "Compactor",
      label: {
        en: "replacement history",
        zh: "返回 replacement history",
      },
      kind: "reply",
    },
    {
      from: "Compactor",
      to: "Envelope",
      label: { en: "install checkpoint", zh: "安装 checkpoint" },
      kind: "reply",
    },
    {
      from: "Envelope",
      to: "NewModel",
      label: {
        en: "emit model-switch instructions first",
        zh: "先发出模型切换指令",
      },
    },
    {
      from: "Envelope",
      to: "NewModel",
      label: {
        en: "send compacted history + remaining diff",
        zh: "发送压缩后历史 + 剩余 diff",
      },
    },
  ],
  legend: {
    en: "Compaction runs against the old model before the new one takes over, preserving guidance carried by the previous history.",
    zh: "在新模型接管前用旧模型先做 compaction，保住旧历史里携带的指引。",
  },
};
