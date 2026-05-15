import type {
  Bilingual,
  FlowSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the `flowchart TD` describing the three reconstruction outputs.
export const reconstructionOutputs: FlowSpec = {
  cols: 3,
  rows: 5,
  width: 880,
  height: 620,
  nodes: [
    {
      id: "Rollout",
      label: { en: "Rollout items", zh: "Rollout items" },
      shape: "pill",
      tone: "muted",
      col: 0,
      row: 0,
      colSpan: 3,
    },
    {
      id: "ReverseScan",
      label: { en: "Reverse scan", zh: "逆向扫描" },
      shape: "rounded",
      tone: "warning",
      col: 0,
      row: 1,
      colSpan: 3,
    },
    {
      id: "CheckpointQ",
      label: {
        en: "Found surviving checkpoint?",
        zh: "找到存活 checkpoint？",
      },
      shape: "diamond",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "PrevSettings",
      label: {
        en: "Recover previous settings",
        zh: "恢复上一次设置",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 2,
    },
    {
      id: "RefCtx",
      label: {
        en: "Recover or clear reference context",
        zh: "恢复或清空 reference context",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 2,
    },
    {
      id: "UseBase",
      label: {
        en: "Use replacement history base",
        zh: "使用 replacement history 起点",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 3,
    },
    {
      id: "Empty",
      label: {
        en: "Start from empty history",
        zh: "从空历史开始",
      },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 3,
    },
    {
      id: "Replay",
      label: {
        en: "Replay surviving suffix forward",
        zh: "向前重放存活后缀",
      },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 4,
      colSpan: 2,
    },
    {
      id: "Rebuilt",
      label: {
        en: "Rebuilt ContextManager state",
        zh: "重建 ContextManager 状态",
      },
      shape: "pill",
      tone: "accent",
      col: 2,
      row: 4,
    },
  ],
  edges: [
    { from: "Rollout", to: "ReverseScan" },
    { from: "ReverseScan", to: "CheckpointQ" },
    { from: "ReverseScan", to: "PrevSettings", style: "dashed" },
    { from: "ReverseScan", to: "RefCtx", style: "dashed" },
    {
      from: "CheckpointQ",
      to: "UseBase",
      label: { en: "yes", zh: "是" },
      tone: "success",
    },
    {
      from: "CheckpointQ",
      to: "Empty",
      label: { en: "no", zh: "否" },
      tone: "muted",
      style: "dashed",
    },
    { from: "UseBase", to: "Replay", tone: "success" },
    { from: "Empty", to: "Replay", tone: "muted" },
    { from: "Replay", to: "Rebuilt", tone: "accent" },
    { from: "PrevSettings", to: "Rebuilt", tone: "info", style: "dashed" },
    { from: "RefCtx", to: "Rebuilt", tone: "info", style: "dashed" },
  ],
  legend: {
    en: "Reverse scan recovers three outputs: rebuilt history, previous settings, and the reference context baseline.",
    zh: "逆向扫描恢复三件东西：重建历史、上一次设置，以及 reference context baseline。",
  },
};

// Replaces the rollout layout ASCII art (with checkpoint and rollback marks).
export const rolloutLayoutScan: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `rollout (oldest                                                 newest)
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|i_c | u1 | a1 | t1 | u2 | a2 | RB | u3 | a3 | CP | u4 | a4 | u5 | a5 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
   |    |    |    |    |    |    |    |    |    |    |    |    |    |
   |    |    |    |    |    |    |    |    |    |    |    |    |    +-- assistant
   |    |    |    |    |    |    |    |    |    |    |    |    +------- user5 (latest)
   |    |    |    |    |    |    |    |    |    |    |    +------------ assistant
   |    |    |    |    |    |    |    |    |    |    +----------------- user4
   |    |    |    |    |    |    |    |    |    +---------------------- CHECKPOINT
   |    |    |    |    |    |    |    |    +--------------------------- assistant
   |    |    |    |    |    |    |    +-------------------------------- user3
   |    |    |    |    |    |    +------------------------------------- ROLLBACK marker
   |    |    |    |    |    +------------------------------------------ assistant
   |    |    |    |    +----------------------------------------------- user2
   |    |    |    +---------------------------------------------------- tool record
   |    |    +--------------------------------------------------------- assistant
   |    +-------------------------------------------------------------- user1
   +------------------------------------------------------------------- initial_ctx`,
    zh: `rollout (oldest                                                 newest)
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|i_c | u1 | a1 | t1 | u2 | a2 | RB | u3 | a3 | CP | u4 | a4 | u5 | a5 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
   |    |    |    |    |    |    |    |    |    |    |    |    |    |
   |    |    |    |    |    |    |    |    |    |    |    |    |    +-- assistant
   |    |    |    |    |    |    |    |    |    |    |    |    +------- user5 (latest)
   |    |    |    |    |    |    |    |    |    |    |    +------------ assistant
   |    |    |    |    |    |    |    |    |    |    +----------------- user4
   |    |    |    |    |    |    |    |    |    +---------------------- CHECKPOINT
   |    |    |    |    |    |    |    |    +--------------------------- assistant
   |    |    |    |    |    |    |    +-------------------------------- user3
   |    |    |    |    |    |    +------------------------------------- ROLLBACK marker
   |    |    |    |    |    +------------------------------------------ assistant
   |    |    |    |    +----------------------------------------------- user2
   |    |    |    +---------------------------------------------------- tool record
   |    |    +--------------------------------------------------------- assistant
   |    +-------------------------------------------------------------- user1
   +------------------------------------------------------------------- initial_ctx`,
  },
  legend: {
    en: "Reverse scan short-circuits at `CP`; older items become irrelevant, `RB` is interpreted while scanning.",
    zh: "逆向扫描在 `CP` 短路：更早 items 与重建无关，`RB` 在扫描时被解释。",
  },
  highlights: [
    { match: "CHECKPOINT", tone: "accent" },
    { match: "ROLLBACK marker", tone: "warning" },
    { match: "initial_ctx", tone: "muted" },
    { match: "user5 (latest)", tone: "success" },
  ],
};

// Replaces the small fork-boundary ASCII (`AGENT_ENVELOPE` callouts).
export const forkBoundaries: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `                fork boundaries
                       v
  [ user1 | asst1 | AGENT_ENVELOPE | child_user | child_asst
  | ENV_ENV | grandchild_user | ...                          ]
         ^ no            ^ yes                ^ yes`,
    zh: `                fork 边界
                       v
  [ user1 | asst1 | AGENT_ENVELOPE | child_user | child_asst
  | ENV_ENV | grandchild_user | ...                          ]
         ^ 否            ^ 是                ^ 是`,
  },
  legend: {
    en: "User messages are boundaries, but triggering assistant envelopes are too — each suffix is its own work unit.",
    zh: "用户消息是边界，触发 turn 的 assistant envelope 也是——每个后缀都是独立工作单元。",
  },
  highlights: [
    { match: "AGENT_ENVELOPE", tone: "accent" },
    { match: "ENV_ENV", tone: "accent" },
    { match: "fork boundaries", tone: "warning" },
    { match: "fork 边界", tone: "warning" },
  ],
};

// Replaces the legacy compaction ASCII decision tree.
export const legacyCompactionTree: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `  legacy_compaction_record found?
        |
        +-- yes -> rebuild from user_messages + summary_text
        |          clear reference_context_item
        |          accept prompt may be less clean
        |
        +-- no  -> use modern replacement_history checkpoint path`,
    zh: `  legacy_compaction_record found?
        |
        +-- yes -> 从 user_messages + summary_text 重建
        |          清空 reference_context_item
        |          接受 prompt 可能不那么干净
        |
        +-- no  -> 使用现代 replacement_history checkpoint 路径`,
  },
  legend: {
    en: "The branch never silently produces an inferior prompt — the legacy shape is explicit, recorded, and visible.",
    zh: "分支从不无声产生劣化 prompt——遗留形状显式、被记录、telemetry 可见。",
  },
  highlights: [
    { match: "yes", tone: "warning" },
    { match: "no", tone: "success" },
    { match: "replacement_history", tone: "accent" },
  ],
};
