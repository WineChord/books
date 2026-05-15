import type {
  Bilingual,
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the `graph LR` showing token-usage fan-out.
export const tokenFanout: FlowSpec = {
  cols: 4,
  rows: 4,
  width: 880,
  height: 460,
  nodes: [
    {
      id: "Source",
      label: {
        en: "Model usage event",
        zh: "Model usage event",
      },
      shape: "pill",
      tone: "warning",
      col: 0,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Hub",
      label: {
        en: "ContextManager token info",
        zh: "ContextManager token info",
      },
      sub: {
        en: "single source of truth",
        zh: "唯一事实来源",
      },
      shape: "rounded",
      tone: "danger",
      col: 1,
      row: 1,
      rowSpan: 2,
    },
    {
      id: "Compaction",
      label: {
        en: "Core compaction decisions",
        zh: "Core compaction decisions",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 0,
    },
    {
      id: "TUI",
      label: {
        en: "TUI token display",
        zh: "TUI token display",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "AppServer",
      label: {
        en: "App-server token notification",
        zh: "App-server token notification",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 2,
    },
    {
      id: "Telemetry",
      label: {
        en: "Telemetry",
        zh: "Telemetry",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 3,
    },
  ],
  edges: [
    { from: "Source", to: "Hub", tone: "warning" },
    { from: "Hub", to: "Compaction" },
    { from: "Hub", to: "TUI" },
    { from: "Hub", to: "AppServer" },
    { from: "Hub", to: "Telemetry" },
  ],
  legend: {
    en: "One source fact fans out to four consumers — each surface stays honest because it cannot invent its own number.",
    zh: "同一份源事实扇出到四个消费者——每个面都不会撒谎，因为没人能造自己的数字。",
  },
};

// Replaces the `sequenceDiagram` showing connection-scoped replay.
export const replayAttribution: SequenceSpec = {
  actors: [
    { id: "Client", label: { en: "Client", zh: "Client" }, tone: "info" },
    {
      id: "Server",
      label: { en: "App-server", zh: "App-server" },
      tone: "accent",
    },
    { id: "Core", label: { en: "Runtime", zh: "Runtime" }, tone: "warning" },
    { id: "Rollout", label: { en: "Rollout", zh: "Rollout" }, tone: "muted" },
  ],
  steps: [
    {
      from: "Client",
      to: "Server",
      label: { en: "attach to thread", zh: "attach to thread" },
    },
    {
      from: "Server",
      to: "Rollout",
      label: {
        en: "read latest token usage record",
        zh: "读取最近的 token usage 记录",
      },
    },
    {
      from: "Server",
      to: "Core",
      label: {
        en: "ask for rebuilt turn ids",
        zh: "询问重建后的 turn id 映射",
      },
    },
    {
      from: "Core",
      to: "Server",
      label: { en: "turn id map", zh: "turn id map" },
      kind: "reply",
    },
    {
      from: "Server",
      to: "Client",
      label: {
        en: "restored usage on owner.id (if id still present)",
        zh: "若原 id 仍存在，按 owner.id 发送",
      },
      kind: "reply",
      tone: "success",
    },
    {
      from: "Server",
      to: "Client",
      label: {
        en: "or restored usage on turn at owner.position (if id changed)",
        zh: "若 id 已变，按 owner.position 发送",
      },
      kind: "reply",
      tone: "warning",
    },
  ],
  legend: {
    en: "Replay is connection-scoped: other subscribers already saw the live event and must not receive it again.",
    zh: "Replay 是连接作用域：其他订阅者早已看过实时事件，不能再收到一次。",
  },
};

// Replaces the trace stream ASCII art (with phase callouts).
export const compactionTraceStream: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `trace stream around a compaction:

  ... usage(turn N-1)
    -> compaction_pre_hook(turn N)
    -> compact_input(payload = old history clone)        [phase 1]
    -> compact_output(payload = compacted items)         [phase 1]
    -> compaction_install(payload = replacement history) [phase 2]
    -> usage(post-compact recompute)                     [phase 2]
    -> compaction_post_hook(turn N)
    -> sample_request(payload = new prompt projection)   [phase 3]
  ... usage(turn N) ...`,
    zh: `一次 compaction 周围的 trace 流:

  ... usage(turn N-1)
    -> compaction_pre_hook(turn N)
    -> compact_input(payload = old history clone)        [phase 1]
    -> compact_output(payload = compacted items)         [phase 1]
    -> compaction_install(payload = replacement history) [phase 2]
    -> usage(post-compact recompute)                     [phase 2]
    -> compaction_post_hook(turn N)
    -> sample_request(payload = new prompt projection)   [phase 3]
  ... usage(turn N) ...`,
  },
  legend: {
    en: "Three phases share one trace stream: compact, install, sample. A naive trace would collapse them into one event.",
    zh: "compact、install、sample 三阶段共享一条 trace；朴素 trace 会把它们折成一个事件。",
  },
  highlights: [
    { match: "[phase 1]", tone: "warning" },
    { match: "[phase 2]", tone: "accent" },
    { match: "[phase 3]", tone: "success" },
    { match: "compaction_install", tone: "accent" },
  ],
};
