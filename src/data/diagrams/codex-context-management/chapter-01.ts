import type {
  Bilingual,
  FlowSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the chapter-01 mermaid flowchart that splits durable, per-turn,
// and optional planes into a single prompt projection that loops back into
// rollout / history evidence.
export const projectionFlow: FlowSpec = {
  cols: 3,
  rows: 5,
  width: 820,
  height: 620,
  nodes: [
    {
      id: "ThreadRollout",
      label: { en: "Thread rollout", zh: "Thread rollout" },
      shape: "cylinder",
      tone: "warning",
      col: 0,
      row: 0,
    },
    {
      id: "HistoryLedger",
      label: { en: "History ledger", zh: "History ledger" },
      shape: "cylinder",
      tone: "warning",
      col: 0,
      row: 1,
    },
    {
      id: "TurnEnvelope",
      label: { en: "Turn envelope", zh: "Turn envelope" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 0,
    },
    {
      id: "SettingsDiffs",
      label: { en: "Settings diffs", zh: "Settings diffs" },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
    },
    {
      id: "Skills",
      label: {
        en: "Skills / plugins / memory",
        zh: "Skills / plugins / memory",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 0,
    },
    {
      id: "ToolOutputs",
      label: {
        en: "Tool outputs / images",
        zh: "Tool outputs / images",
      },
      shape: "rounded",
      tone: "success",
      col: 2,
      row: 1,
    },
    {
      id: "Projection",
      label: { en: "Prompt projection", zh: "Prompt projection" },
      shape: "circle",
      tone: "accent",
      col: 1,
      row: 2,
    },
    {
      id: "ModelRequest",
      label: { en: "Model request", zh: "Model request" },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 3,
    },
    {
      id: "NewItems",
      label: { en: "New response items", zh: "New response items" },
      shape: "pill",
      tone: "success",
      col: 1,
      row: 4,
    },
  ],
  edges: [
    { from: "ThreadRollout", to: "HistoryLedger" },
    { from: "HistoryLedger", to: "Projection", tone: "warning" },
    { from: "TurnEnvelope", to: "SettingsDiffs" },
    { from: "SettingsDiffs", to: "Projection", tone: "info" },
    { from: "Skills", to: "Projection", tone: "success" },
    { from: "ToolOutputs", to: "Projection", tone: "success" },
    { from: "Projection", to: "ModelRequest", tone: "accent" },
    { from: "ModelRequest", to: "NewItems" },
    {
      from: "NewItems",
      to: "ThreadRollout",
      label: { en: "record", zh: "记录" },
      tone: "warning",
      style: "dashed",
    },
    {
      from: "NewItems",
      to: "HistoryLedger",
      label: { en: "record", zh: "记录" },
      tone: "warning",
      style: "dashed",
    },
  ],
  subgraphs: [
    {
      id: "durable",
      label: {
        en: "Durable evidence (append-only)",
        zh: "持久证据 (append-only)",
      },
      tone: "warning",
      col: 0,
      row: 0,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: "runtime",
      label: {
        en: "Per-turn runtime state",
        zh: "每个 turn 的运行时状态",
      },
      tone: "info",
      col: 1,
      row: 0,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: "optional",
      label: {
        en: "Budgeted optional planes",
        zh: "有预算的可选平面",
      },
      tone: "success",
      col: 2,
      row: 0,
      colSpan: 1,
      rowSpan: 2,
    },
  ],
  legend: {
    en: "Durable, per-turn, and optional planes converge on one prompt projection; new items flow back into the durable plane.",
    zh: "持久、每 turn 和可选三个平面汇合到一个 prompt projection；新产生的 items 再回流到持久平面。",
  },
};

// Replaces the ASCII owner stack (Prompt Projection on top, four owners in
// the middle row, and Rollout evidence at the bottom).
export const ownerStack: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `                    +---------------------------------------+
                    |          Prompt Projection            |
                    |   (clone, normalize, render fragments) |
                    +-------+----------+----------+---------+
                            |          |          |
            +---------------+      +---+----+ +---+--------------+
            |                      |        | |                  |
    +-------v-------+   +---------v-+   +---v---------+   +------v-------+
    | ContextManager|   | TurnContext|   |  context/*  |   |  Compaction  |
    | history ledger|   |  envelope  |   |  fragments  |   |  checkpoint  |
    +-------+-------+   +-----+------+   +------+------+   +------+-------+
            |                 |                 |                 |
            +-----------------+--------+--------+-----------------+
                                       |
                              +--------v---------+
                              | Rollout evidence |
                              |  (append-only)   |
                              +------------------+`,
    zh: `                    +---------------------------------------+
                    |          Prompt Projection            |
                    |   (clone, normalize, render fragments) |
                    +-------+----------+----------+---------+
                            |          |          |
            +---------------+      +---+----+ +---+--------------+
            |                      |        | |                  |
    +-------v-------+   +---------v-+   +---v---------+   +------v-------+
    | ContextManager|   | TurnContext|   |  context/*  |   |  Compaction  |
    | history ledger|   |  envelope  |   |  fragments  |   |  checkpoint  |
    +-------+-------+   +-----+------+   +------+------+   +------+-------+
            |                 |                 |                 |
            +-----------------+--------+--------+-----------------+
                                       |
                              +--------v---------+
                              | Rollout evidence |
                              |  (append-only)   |
                              +------------------+`,
  },
  legend: {
    en: "Read top-down for prompt construction and bottom-up for replay; the same five owners appear in both directions.",
    zh: "构造 prompt 时从上往下读，replay 时从下往上读；两个方向都经过同样的五个 owner。",
  },
  highlights: [
    { match: "Prompt Projection", tone: "accent" },
    { match: "ContextManager", tone: "info" },
    { match: "TurnContext", tone: "info" },
    { match: "Compaction", tone: "warning" },
    { match: "Rollout evidence", tone: "muted" },
  ],
};

// Replaces the ASCII timeline showing how each lifetime spans a session.
export const lifetimeAxis: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `session  |==============================================|  thread close
turn         |---|     |---|     |---|     |---|
prompt        ^^         ^^        ^^        ^^         each turn rebuilds
checkpoint                |================|             compaction window
client            |--reads--|        |--reads--|         observers
                  start          turn N          end`,
    zh: `session  |==============================================|  thread close
turn         |---|     |---|     |---|     |---|
prompt        ^^         ^^        ^^        ^^         每个 turn 重建
checkpoint                |================|             compaction 窗口
client            |--reads--|        |--reads--|         观察者
                  start          turn N          end`,
  },
  legend: {
    en: "Lifetimes are not equal: a session contains many turns, each turn produces one prompt, checkpoints span turn ranges, and clients reattach over time.",
    zh: "横向条长短不一：一个 session 包含很多 turn，每个 turn 产生一个 prompt，checkpoint 跨越一段 turn，客户端会在不同时间重新接入。",
  },
  highlights: [
    { match: "session", tone: "accent" },
    { match: "turn", tone: "info" },
    { match: "prompt", tone: "success" },
    { match: "checkpoint", tone: "warning" },
    { match: "client", tone: "muted" },
  ],
};
