import type {
  Bilingual,
  FlowSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the `flowchart LR` block: select -> budget -> inject pipeline.
export const optionalContextSelection: FlowSpec = {
  cols: 5,
  rows: 3,
  width: 880,
  height: 360,
  nodes: [
    {
      id: "Candidate",
      label: {
        en: "Candidate optional context",
        zh: "候选可选上下文",
      },
      shape: "pill",
      tone: "muted",
      col: 0,
      row: 1,
    },
    {
      id: "Selection",
      label: { en: "Selection", zh: "选择" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
    },
    {
      id: "Budget",
      label: { en: "Budget", zh: "预算" },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "Fits",
      label: { en: "Fits?", zh: "放得下？" },
      shape: "diamond",
      tone: "warning",
      col: 3,
      row: 1,
    },
    {
      id: "Inject",
      label: {
        en: "Inject as fragment or history item",
        zh: "作为 fragment 或 history item 注入",
      },
      shape: "rounded",
      tone: "success",
      col: 4,
      row: 0,
    },
    {
      id: "Truncate",
      label: {
        en: "Truncate and warn",
        zh: "截断并警告",
      },
      shape: "rounded",
      tone: "warning",
      col: 4,
      row: 1,
    },
    {
      id: "Omit",
      label: {
        en: "Omit and warn",
        zh: "省略并警告",
      },
      shape: "rounded",
      tone: "danger",
      col: 4,
      row: 2,
    },
    {
      id: "Projection",
      label: {
        en: "Prompt projection",
        zh: "Prompt projection",
      },
      sub: {
        en: "model-visible state",
        zh: "模型可见状态",
      },
      shape: "pill",
      tone: "accent",
      col: 2,
      row: 2,
    },
  ],
  edges: [
    { from: "Candidate", to: "Selection" },
    { from: "Selection", to: "Budget" },
    { from: "Budget", to: "Fits" },
    {
      from: "Fits",
      to: "Inject",
      label: { en: "yes", zh: "是" },
      tone: "success",
    },
    {
      from: "Fits",
      to: "Truncate",
      label: { en: "partly", zh: "部分" },
      tone: "warning",
    },
    {
      from: "Fits",
      to: "Omit",
      label: { en: "no", zh: "否" },
      tone: "danger",
      style: "dashed",
    },
    { from: "Inject", to: "Projection", tone: "success" },
    { from: "Truncate", to: "Projection", tone: "warning" },
  ],
  legend: {
    en: "Optional context never assumes the whole window — every plane runs select, budget, and inject.",
    zh: "可选上下文从不假定整个窗口可用——每个平面都走 select、budget、inject。",
  },
};

// Replaces the effective context window ASCII illustration.
export const windowSlicing: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `+------------------- Effective context window -------------------+
|                                                                |
|  base instructions          [#####]                            |
|  initial context bundle     [######]                           |
|  per-turn diffs             [###]                              |
|  history (recent turns)     [####################]             |
|  optional - skills          [###]   <- budgeted                |
|  optional - plugins/apps    [##]    <- budgeted                |
|  optional - memory summary  [##]    <- budgeted, truncated     |
|  optional - tool outputs    [#####] <- truncation policy       |
|  reserved for response                          [#######]      |
|                                                                |
+----------------------------------------------------------------+`,
    zh: `+------------------- Effective context window -------------------+
|                                                                |
|  base instructions          [#####]                            |
|  initial context bundle     [######]                           |
|  per-turn diffs             [###]                              |
|  history (recent turns)     [####################]             |
|  optional - skills          [###]   <- budgeted                |
|  optional - plugins/apps    [##]    <- budgeted                |
|  optional - memory summary  [##]    <- budgeted, truncated     |
|  optional - tool outputs    [#####] <- truncation policy       |
|  reserved for response                          [#######]      |
|                                                                |
+----------------------------------------------------------------+`,
  },
  legend: {
    en: "Reserved tail on the right is what keeps optional planes truly optional — the answer always wins.",
    zh: "右端保留区让可选平面真的可选——答案永远赢。",
  },
  highlights: [
    { match: "Effective context window", tone: "accent" },
    { match: "reserved for response", tone: "success" },
    { match: "budgeted", tone: "info" },
    { match: "truncation policy", tone: "warning" },
  ],
};

// Replaces the breadth-first vs depth-first ASCII comparison block.
export const skillBreadthVsDepth: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `budget tight, naive depth-first:        budget tight, breadth-first:

  [skill A: full description]             [skill A: short description]
  [skill B: full description]             [skill B: short description]
  ... (D, E, F omitted) ...               [skill C: short description]
                                          [skill D: short description]
                                          [skill E: short description]
                                          [skill F: short description]

The naive variant hides capabilities the model could mention.
The breadth variant keeps the catalog visible at the cost of depth.`,
    zh: `预算紧张, 朴素深度优先:                  预算紧张, 广度优先:

  [skill A: 完整描述]                     [skill A: 短描述]
  [skill B: 完整描述]                     [skill B: 短描述]
  ... (D, E, F 被省略) ...                [skill C: 短描述]
                                          [skill D: 短描述]
                                          [skill E: 短描述]
                                          [skill F: 短描述]

朴素方式隐藏了模型本可以提到的能力。
广度方式保留了完整目录, 代价是细节。`,
  },
  legend: {
    en: "Codex prefers breadth before depth so the model can mention more capabilities, even if descriptions shrink.",
    zh: "Codex 优先广度而不是深度——宁可描述变短，也要让模型看见更多能力。",
  },
  highlights: [
    { match: "naive depth-first", tone: "warning" },
    { match: "breadth-first", tone: "success" },
    { match: "朴素深度优先", tone: "warning" },
    { match: "广度优先", tone: "success" },
  ],
};

// Replaces the `flowchart TD` describing tool output policy branches.
export const toolOutputPolicy: FlowSpec = {
  cols: 5,
  rows: 6,
  width: 920,
  height: 700,
  nodes: [
    {
      id: "Tool",
      label: { en: "Tool execution", zh: "Tool 执行" },
      shape: "pill",
      tone: "muted",
      col: 1,
      row: 0,
      colSpan: 3,
    },
    {
      id: "Raw",
      label: { en: "Raw observation", zh: "原始观察" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
      colSpan: 3,
    },
    {
      id: "Policy",
      label: { en: "Output policy", zh: "Output policy" },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 2,
      colSpan: 3,
    },
    {
      id: "Verbatim",
      label: {
        en: "Verbatim history item",
        zh: "原样写入历史",
      },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 3,
    },
    {
      id: "Elide",
      label: { en: "Head + tail elision", zh: "Head + tail elision" },
      shape: "rounded",
      tone: "warning",
      col: 1,
      row: 3,
    },
    {
      id: "ImageQ",
      label: {
        en: "Model accepts images?",
        zh: "模型支持图片？",
      },
      shape: "diamond",
      tone: "warning",
      col: 2,
      row: 3,
    },
    {
      id: "Binary",
      label: {
        en: "Placeholder + size note",
        zh: "Placeholder + size note",
      },
      shape: "rounded",
      tone: "muted",
      col: 4,
      row: 3,
    },
    {
      id: "Image",
      label: {
        en: "Image-bearing item",
        zh: "含图片 item",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 4,
    },
    {
      id: "Strip",
      label: {
        en: "Strip image, keep text",
        zh: "剥离图片, 保留文本",
      },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 4,
    },
    {
      id: "Projection",
      label: {
        en: "Prompt projection",
        zh: "Prompt projection",
      },
      shape: "pill",
      tone: "accent",
      col: 1,
      row: 5,
      colSpan: 3,
    },
  ],
  edges: [
    { from: "Tool", to: "Raw" },
    { from: "Raw", to: "Policy" },
    {
      from: "Policy",
      to: "Verbatim",
      label: { en: "small text", zh: "小段文本" },
      tone: "success",
    },
    {
      from: "Policy",
      to: "Elide",
      label: { en: "large text", zh: "大段文本" },
      tone: "warning",
    },
    {
      from: "Policy",
      to: "ImageQ",
      label: { en: "image", zh: "图片" },
      tone: "info",
    },
    {
      from: "Policy",
      to: "Binary",
      label: { en: "binary", zh: "二进制" },
      tone: "muted",
      style: "dashed",
    },
    {
      from: "ImageQ",
      to: "Image",
      label: { en: "yes", zh: "是" },
      tone: "success",
    },
    {
      from: "ImageQ",
      to: "Strip",
      label: { en: "no", zh: "否" },
      tone: "warning",
      style: "dashed",
    },
    { from: "Verbatim", to: "Projection", tone: "success" },
    { from: "Elide", to: "Projection", tone: "warning" },
    { from: "Image", to: "Projection", tone: "success" },
    { from: "Strip", to: "Projection", tone: "warning" },
    { from: "Binary", to: "Projection", tone: "muted", style: "dashed" },
  ],
  legend: {
    en: "One arrow `tool output -> history` hides four protocol-aware branches.",
    zh: "一条 `tool output -> history` 的箭头其实藏着四条按协议区分的分支。",
  },
};
