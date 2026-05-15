import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces flowchart LR for the conservative migration pipeline.
export const migrationPipeline: FlowSpec = {
  cols: 7,
  rows: 1,
  width: 960,
  height: 200,
  nodes: [
    {
      id: "Source",
      label: {
        en: "External source artifacts",
        zh: "外部来源 artifacts",
      },
      shape: "pill",
      tone: "info",
      col: 0,
      row: 0,
    },
    {
      id: "Detect",
      label: { en: "Detect and classify", zh: "检测并分类" },
      shape: "rounded",
      tone: "warning",
      col: 1,
      row: 0,
    },
    {
      id: "Validate",
      label: {
        en: "Validate supported subset",
        zh: "校验受支持子集",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 0,
    },
    {
      id: "Convert",
      label: {
        en: "Convert to Codex-native shape",
        zh: "转换为 Codex-native 形态",
      },
      shape: "rounded",
      tone: "accent",
      col: 3,
      row: 0,
    },
    {
      id: "Preserve",
      label: {
        en: "Preserve existing targets",
        zh: "保留已有目标",
      },
      shape: "rounded",
      tone: "info",
      col: 4,
      row: 0,
    },
    {
      id: "Ledger",
      label: { en: "Record import metadata", zh: "记录导入元数据" },
      shape: "cylinder",
      tone: "muted",
      col: 5,
      row: 0,
    },
    {
      id: "Runtime",
      label: {
        en: "Use native runtime paths",
        zh: "走原生 runtime 路径",
      },
      shape: "pill",
      tone: "success",
      col: 6,
      row: 0,
    },
  ],
  edges: [
    { from: "Source", to: "Detect" },
    { from: "Detect", to: "Validate" },
    { from: "Validate", to: "Convert" },
    { from: "Convert", to: "Preserve" },
    { from: "Preserve", to: "Ledger" },
    { from: "Ledger", to: "Runtime", tone: "success" },
  ],
  legend: {
    en: "Migration is conservative translation: detect, validate, convert, then hand off to native runtime paths.",
    zh: "迁移是一条保守的翻译流水线：先检测，再校验，再转换，最后交回原生 runtime 路径。",
  },
};

// Replaces sequenceDiagram for the session import handshake.
export const sessionImportFlow: SequenceSpec = {
  actors: [
    {
      id: "Detector",
      label: { en: "Detector", zh: "Detector" },
      tone: "accent",
    },
    {
      id: "Ledger",
      label: { en: "Ledger", zh: "Ledger" },
      tone: "muted",
    },
    {
      id: "Parser",
      label: { en: "Parser", zh: "Parser" },
      tone: "info",
    },
    {
      id: "Rollout",
      label: { en: "Rollout", zh: "Rollout" },
      tone: "accent",
    },
    {
      id: "ThreadStore",
      label: { en: "ThreadStore", zh: "ThreadStore" },
      tone: "success",
    },
  ],
  steps: [
    {
      from: "Detector",
      to: "Ledger",
      label: {
        en: "has this content hash been imported?",
        zh: "这个 content hash 是否已经导入过？",
      },
    },
    {
      from: "Ledger",
      to: "Detector",
      label: { en: "no", zh: "未导入" },
      kind: "reply",
    },
    {
      from: "Detector",
      to: "Parser",
      label: {
        en: "load importable JSONL session",
        zh: "加载可导入的 JSONL session",
      },
    },
    {
      from: "Parser",
      to: "Rollout",
      label: {
        en: "emit native rollout items",
        zh: "生成原生 rollout items",
      },
    },
    {
      from: "Rollout",
      to: "ThreadStore",
      label: {
        en: "create imported thread",
        zh: "创建 imported thread",
      },
    },
    {
      from: "ThreadStore",
      to: "Ledger",
      label: {
        en: "record source hash and imported thread id",
        zh: "记录 source hash 与 imported thread id",
      },
    },
  ],
  legend: {
    en: "The ledger gates duplicate imports while letting changed source content be re-detected.",
    zh: "Ledger 既阻止重复导入，又允许已经改变的 source content 被再次发现。",
  },
};
