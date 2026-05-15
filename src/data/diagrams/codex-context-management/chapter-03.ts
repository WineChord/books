import type {
  Bilingual,
  FlowSpec,
  StateSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// ASCII rendering of the four ContextManager fields.
export const ledgerShape: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `+------------------ ContextManager ------------------+
|                                                    |
|  items:                                            |
|  [ user_msg | tool_call | tool_out | asst_msg ...] |    oldest -> newest
|                                                    |
|  history_version: u64       (bumped on rewrite)    |
|  token_info:      TokenInfo (latest estimate or    |
|                              exact usage)          |
|  reference_context_item: Option<TurnContextItem>   |
|       Some(item) -> next turn diffs against it     |
|       None       -> next turn fully reinjects      |
|                                                    |
+----------------------------------------------------+`,
    zh: `+------------------ ContextManager ------------------+
|                                                    |
|  items:                                            |
|  [ user_msg | tool_call | tool_out | asst_msg ...] |    oldest -> newest
|                                                    |
|  history_version: u64       (rewrite 时递增)        |
|  token_info:      TokenInfo (最近一次估计或精确用量)  |
|  reference_context_item: Option<TurnContextItem>   |
|       Some(item) -> 下次 turn 与它做 diff           |
|       None       -> 下次 turn 完整重新注入          |
|                                                    |
+----------------------------------------------------+`,
  },
  legend: {
    en: "Three ordinary fields plus a reference baseline that turns the ledger into the link between Chapter 2's envelope and Chapter 4's diff fragments.",
    zh: "三个普通字段加一个 reference baseline，让账本成为第 2 章 envelope 与第 4 章 diff fragments 之间的链接。",
  },
  highlights: [
    { match: "ContextManager", tone: "accent" },
    { match: "items:", tone: "info" },
    { match: "history_version:", tone: "info" },
    { match: "token_info:", tone: "info" },
    { match: "reference_context_item:", tone: "warning" },
  ],
};

// Replaces the chapter-03 stateDiagram-v2 of the ledger lifecycle.
export const ledgerLifecycle: StateSpec = {
  cols: 4,
  rows: 3,
  states: [
    {
      id: "start",
      label: { en: "start", zh: "start" },
      kind: "initial",
      col: 0,
      row: 1,
    },
    {
      id: "Recording",
      label: { en: "Recording", zh: "Recording" },
      tone: "info",
      col: 1,
      row: 1,
    },
    {
      id: "Rewritten",
      label: { en: "Rewritten", zh: "Rewritten" },
      tone: "warning",
      col: 1,
      row: 0,
    },
    {
      id: "Normalizing",
      label: { en: "Normalizing", zh: "Normalizing" },
      tone: "accent",
      col: 2,
      row: 1,
    },
    {
      id: "PromptReady",
      label: { en: "PromptReady", zh: "PromptReady" },
      tone: "success",
      col: 3,
      row: 1,
    },
  ],
  transitions: [
    { from: "start", to: "Recording" },
    {
      from: "Recording",
      to: "Normalizing",
      label: { en: "for_prompt()", zh: "for_prompt()" },
    },
    {
      from: "Recording",
      to: "Rewritten",
      label: {
        en: "compaction or rollback",
        zh: "compaction 或 rollback",
      },
      tone: "warning",
      style: "dashed",
    },
    {
      from: "Rewritten",
      to: "Recording",
      label: {
        en: "new history_version, baseline cleared",
        zh: "新 history_version, baseline 清空",
      },
      tone: "warning",
    },
    {
      from: "Normalizing",
      to: "PromptReady",
      label: {
        en: "strip unsupported items",
        zh: "剥离不支持的 items",
      },
      tone: "accent",
    },
    {
      from: "PromptReady",
      to: "Recording",
      label: {
        en: "model and tool output recorded",
        zh: "模型与 tool 输出已记录",
      },
      tone: "success",
    },
  ],
  legend: {
    en: "Conceptual lifecycle: record raw-enough items, normalize for the target model, then record new evidence.",
    zh: "概念上的生命周期：先记录足够原始的 items，再按目标模型 normalize，最后记录新证据。",
  },
};

// ASCII funnel showing how truncation policy turns raw tool output into
// bounded ledger content.
export const truncationFunnel: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `                raw tool output
                       |
                       v
        +---------------------------+
        |   under per-output limit? | -- yes --> record verbatim
        +---------------------------+
                       |
                       no
                       v
        +---------------------------+
        |   has a structured tail?  | -- yes --> keep head + tail elision
        +---------------------------+
                       |
                       no
                       v
        +---------------------------+
        |   replace body with note  | --------> record placeholder + size
        +---------------------------+`,
    zh: `                raw tool output
                       |
                       v
        +---------------------------+
        |   under per-output limit? | -- yes --> 原样记录
        +---------------------------+
                       |
                       no
                       v
        +---------------------------+
        |   has a structured tail?  | -- yes --> 保留 head + tail elision
        +---------------------------+
                       |
                       no
                       v
        +---------------------------+
        |   replace body with note  | --------> 写入 placeholder + size
        +---------------------------+`,
  },
  legend: {
    en: "Tool output enters history through one funnel rather than ad-hoc truncation in every call site.",
    zh: "Tool output 通过单一漏斗进入历史，而不是被每个调用点临时截断。",
  },
  highlights: [
    { match: "raw tool output", tone: "warning" },
    { match: "yes", tone: "success" },
    { match: "no", tone: "muted" },
  ],
};

// Replaces the chapter-03 mermaid flowchart TD that walks pair check then
// modality check before producing a prompt input.
export const normalizationFlow: FlowSpec = {
  cols: 4,
  rows: 6,
  width: 880,
  height: 720,
  nodes: [
    {
      id: "Clone",
      label: { en: "Raw ledger clone", zh: "Raw ledger clone" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 0,
      colSpan: 2,
    },
    {
      id: "PairCheck",
      label: { en: "Pair check", zh: "配对检查" },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 1,
      colSpan: 2,
    },
    {
      id: "DropCall",
      label: {
        en: "Drop call or stub output",
        zh: "丢弃 call 或补 stub output",
      },
      shape: "rounded",
      tone: "danger",
      col: 0,
      row: 2,
    },
    {
      id: "DropOrphan",
      label: {
        en: "Drop orphan output",
        zh: "丢弃 orphan output",
      },
      shape: "rounded",
      tone: "danger",
      col: 3,
      row: 2,
    },
    {
      id: "ImageCheck",
      label: {
        en: "Model accepts images?",
        zh: "模型支持图片?",
      },
      shape: "diamond",
      tone: "warning",
      col: 1,
      row: 3,
      colSpan: 2,
    },
    {
      id: "KeepImages",
      label: {
        en: "Keep image-capable items",
        zh: "保留可含图片的 items",
      },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 4,
    },
    {
      id: "StripImages",
      label: {
        en: "Strip image content",
        zh: "剥离图片内容",
      },
      shape: "rounded",
      tone: "danger",
      col: 3,
      row: 4,
    },
    {
      id: "PromptInput",
      label: { en: "Prompt input", zh: "Prompt input" },
      shape: "pill",
      tone: "success",
      col: 1,
      row: 5,
      colSpan: 2,
    },
  ],
  edges: [
    { from: "Clone", to: "PairCheck" },
    {
      from: "PairCheck",
      to: "DropCall",
      label: {
        en: "call without output",
        zh: "call 缺 output",
      },
      tone: "danger",
      style: "dashed",
    },
    {
      from: "PairCheck",
      to: "DropOrphan",
      label: {
        en: "output without call",
        zh: "output 缺 call",
      },
      tone: "danger",
      style: "dashed",
    },
    {
      from: "PairCheck",
      to: "ImageCheck",
      label: { en: "pairs ok", zh: "配对正常" },
      tone: "success",
    },
    { from: "DropCall", to: "ImageCheck" },
    { from: "DropOrphan", to: "ImageCheck" },
    {
      from: "ImageCheck",
      to: "KeepImages",
      label: { en: "yes", zh: "是" },
      tone: "success",
    },
    {
      from: "ImageCheck",
      to: "StripImages",
      label: { en: "no", zh: "否" },
      tone: "danger",
    },
    { from: "KeepImages", to: "PromptInput", tone: "success" },
    { from: "StripImages", to: "PromptInput" },
  ],
  legend: {
    en: "Codex chooses safe prompt shape over maximal fidelity: items the model cannot represent change the projection, not the underlying ledger.",
    zh: "Codex 选择对当前模型安全的 prompt 形状，而不是最大保真度：模型无法表示的 items 改变 projection，而不是破坏底层账本。",
  },
};

// ASCII worked example for rollback baseline behaviour.
export const rollbackExample: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `Before rollback (drop last 1 user turn):
  [ initial_ctx | user1 | asst1 | user2 | asst2 ]
                         ^^^^^^^^^^^^^^
                         baseline references "initial_ctx" only

After rollback:
  [ initial_ctx | user1 | asst1 ]
                ^^^^^^^^^^^^^^^^
                baseline still valid, kept

After rollback that also removed initial_ctx:
  [ user1 | asst1 ]
  baseline cleared -> next turn fully reinjects context`,
    zh: `回滚前 (drop last 1 user turn):
  [ initial_ctx | user1 | asst1 | user2 | asst2 ]
                         ^^^^^^^^^^^^^^
                         baseline references "initial_ctx" only

回滚后:
  [ initial_ctx | user1 | asst1 ]
                ^^^^^^^^^^^^^^^^
                baseline 仍有效, 保留

回滚同时移除 initial_ctx 后:
  [ user1 | asst1 ]
  baseline 清空 -> 下次 turn 完整重新注入 context`,
  },
  legend: {
    en: "When in doubt, reinject. Baseline clearing is conservative on purpose so a removed source cannot leave silent context drift.",
    zh: "拿不准就重新注入。Baseline 清空规则刻意保守，避免源被移除后仍按旧 baseline 偷偷漂移。",
  },
  highlights: [
    { match: "initial_ctx", tone: "accent" },
    { match: "baseline", tone: "warning" },
    { match: "cleared", tone: "muted" },
  ],
};
