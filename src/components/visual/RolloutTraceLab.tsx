import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type RolloutKind =
  | "session_start"
  | "response_item"
  | "tool_call"
  | "tool_output"
  | "context_diff"
  | "event"
  | "checkpoint";

type TraceLane =
  | "conversation"
  | "inference"
  | "tools"
  | "terminal_ops"
  | "raw_payloads";

interface RolloutEntry {
  index: number;
  kind: RolloutKind;
  json: string;
  laneIds: string[];
  isQueryRelevant: boolean;
}

interface TraceNode {
  id: string;
  lane: TraceLane;
  enLabel: string;
  zhLabel: string;
  column: number;
  span?: number;
  fromIndex: number;
  isQueryRelevant: boolean;
}

const rollout: RolloutEntry[] = [
  { index: 0, kind: "session_start",
    json: `{"t":0,"kind":"session_start","cwd":"/repo","model":"gpt-5"}`,
    laneIds: ["conv:start"], isQueryRelevant: true },
  { index: 1, kind: "context_diff",
    json: `{"t":1,"kind":"context_diff","sandbox":"workspace-write","approval":"never"}`,
    laneIds: ["conv:ctx"], isQueryRelevant: true },
  { index: 2, kind: "response_item",
    json: `{"t":2,"kind":"response_item","role":"user","text":"refactor login.rs"}`,
    laneIds: ["conv:user1"], isQueryRelevant: true },
  { index: 3, kind: "event",
    json: `{"t":3,"kind":"event","ev":"turn_start","model":"gpt-5"}`,
    laneIds: ["inf:turn1"], isQueryRelevant: false },
  { index: 4, kind: "response_item",
    json: `{"t":4,"kind":"response_item","role":"assistant","text":"reading login.rs"}`,
    laneIds: ["conv:asst1"], isQueryRelevant: true },
  { index: 5, kind: "tool_call",
    json: `{"t":5,"kind":"tool_call","name":"read_file","args":{"path":"login.rs"}}`,
    laneIds: ["tool:read1", "raw:req5"], isQueryRelevant: true },
  { index: 6, kind: "tool_output",
    json: `{"t":6,"kind":"tool_output","call":"read_file","ok":true,"bytes":4321}`,
    laneIds: ["tool:read1", "raw:res6"], isQueryRelevant: true },
  { index: 7, kind: "tool_call",
    json: `{"t":7,"kind":"tool_call","name":"shell","args":{"cmd":"cargo test"}}`,
    laneIds: ["tool:shell2", "term:exec7", "raw:req7"], isQueryRelevant: true },
  { index: 8, kind: "tool_output",
    json: `{"t":8,"kind":"tool_output","call":"shell","exit":0,"out_bytes":2380}`,
    laneIds: ["tool:shell2", "term:exec7", "raw:res8"], isQueryRelevant: true },
  { index: 9, kind: "checkpoint",
    json: `{"t":9,"kind":"checkpoint","summary":"compaction 0..8 installed"}`,
    laneIds: ["conv:cp1"], isQueryRelevant: true },
  { index: 10, kind: "response_item",
    json: `{"t":10,"kind":"response_item","role":"assistant","text":"ready, please confirm"}`,
    laneIds: ["conv:asst2"], isQueryRelevant: true },
  { index: 11, kind: "event",
    json: `{"t":11,"kind":"event","ev":"turn_complete","tokens_in":4321,"tokens_out":233}`,
    laneIds: ["inf:turn1"], isQueryRelevant: false },
];

const traceNodes: TraceNode[] = [
  { id: "conv:start", lane: "conversation", enLabel: "session", zhLabel: "session",
    column: 0, fromIndex: 0, isQueryRelevant: true },
  { id: "conv:ctx", lane: "conversation", enLabel: "ctx · ws-write", zhLabel: "ctx · ws-write",
    column: 1, fromIndex: 1, isQueryRelevant: true },
  { id: "conv:user1", lane: "conversation", enLabel: "user · refactor", zhLabel: "user · 重构",
    column: 2, fromIndex: 2, isQueryRelevant: true },
  { id: "inf:turn1", lane: "inference", enLabel: "turn 1 · gpt-5", zhLabel: "turn 1 · gpt-5",
    column: 3, span: 8, fromIndex: 3, isQueryRelevant: true },
  { id: "conv:asst1", lane: "conversation", enLabel: "asst · reading", zhLabel: "asst · 阅读",
    column: 4, fromIndex: 4, isQueryRelevant: true },
  { id: "tool:read1", lane: "tools", enLabel: "read_file", zhLabel: "read_file",
    column: 5, fromIndex: 5, isQueryRelevant: true },
  { id: "tool:shell2", lane: "tools", enLabel: "shell · test", zhLabel: "shell · 测试",
    column: 7, fromIndex: 7, isQueryRelevant: true },
  { id: "term:exec7", lane: "terminal_ops", enLabel: "exec → 0", zhLabel: "exec → 0",
    column: 7, fromIndex: 7, isQueryRelevant: true },
  { id: "conv:cp1", lane: "conversation", enLabel: "checkpoint", zhLabel: "checkpoint",
    column: 9, fromIndex: 9, isQueryRelevant: true },
  { id: "conv:asst2", lane: "conversation", enLabel: "asst · ready", zhLabel: "asst · 完成",
    column: 10, fromIndex: 10, isQueryRelevant: true },
  { id: "raw:req5", lane: "raw_payloads", enLabel: "req #5", zhLabel: "req #5",
    column: 5, fromIndex: 5, isQueryRelevant: false },
  { id: "raw:res6", lane: "raw_payloads", enLabel: "res #6", zhLabel: "res #6",
    column: 6, fromIndex: 6, isQueryRelevant: false },
  { id: "raw:req7", lane: "raw_payloads", enLabel: "req #7", zhLabel: "req #7",
    column: 7, fromIndex: 7, isQueryRelevant: false },
  { id: "raw:res8", lane: "raw_payloads", enLabel: "res #8", zhLabel: "res #8",
    column: 8, fromIndex: 8, isQueryRelevant: false },
];

const lanes: Array<{ key: TraceLane; name: string; yCenter: number }> = [
  { key: "conversation", name: "conversation", yCenter: 38 },
  { key: "inference", name: "inference", yCenter: 96 },
  { key: "tools", name: "tools", yCenter: 154 },
  { key: "terminal_ops", name: "terminal_ops", yCenter: 212 },
  { key: "raw_payloads", name: "raw_payloads", yCenter: 270 },
];

const LANE_SUBTITLE_EN: Record<TraceLane, string> = {
  conversation: "spine · user / assistant / ctx",
  inference: "model turns · span over time",
  tools: "tool calls · semantic view",
  terminal_ops: "terminal acts · exec / patch",
  raw_payloads: "full request / response bytes",
};
const LANE_SUBTITLE_ZH: Record<TraceLane, string> = {
  conversation: "对话主线 · user / assistant / ctx",
  inference: "模型推理 · turn 跨度",
  tools: "工具调用 · 高层语义",
  terminal_ops: "终端动作 · exec / patch",
  raw_payloads: "完整请求 / 响应字节",
};

const COL_X0 = 118;
const COL_W = 50;
const NODE_W = 92;
const NODE_H = 26;
const VIEWBOX_W = 760;
const colToX = (c: number) => COL_X0 + c * COL_W;

const PANE_HEADER_BG = (mode: "light" | "dark") =>
  mode === "light"
    ? "linear-gradient(180deg, #f5f1e2 0%, #fdfaf2 100%)"
    : "linear-gradient(180deg, #2c2b29 0%, #1f1f1d 100%)";

interface Props {
  lang: Lang;
}

export default function RolloutTraceLab({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [scrubIndex, setScrubIndex] = useState(rollout.length);
  const [showRaw, setShowRaw] = useState(true);
  const [filterQueryLane, setFilterQueryLane] = useState(false);

  const purpleFg = mode === "light" ? "#6d28d9" : "#c4b5fd";
  const purpleBg =
    mode === "light"
      ? "rgba(109, 40, 217, 0.10)"
      : "rgba(196, 181, 253, 0.16)";

  const laneColor: Record<TraceLane, { fg: string; bg: string }> = {
    conversation: { fg: colors.success, bg: colors.successSoft },
    inference: { fg: colors.accent, bg: colors.accentSoft },
    tools: { fg: colors.warning, bg: colors.warningSoft },
    terminal_ops: { fg: colors.info, bg: colors.infoSoft },
    raw_payloads: { fg: purpleFg, bg: purpleBg },
  };

  const kindColor: Record<RolloutKind, string> = {
    session_start: colors.info,
    context_diff: colors.info,
    response_item: colors.success,
    tool_call: colors.warning,
    tool_output: colors.warning,
    event: colors.accent,
    checkpoint: purpleFg,
  };

  const visibleLanes = useMemo(
    () => lanes.filter((l) => l.key !== "raw_payloads" || showRaw),
    [showRaw],
  );

  const visibleNodes = useMemo(
    () =>
      traceNodes.filter((n) => {
        if (n.lane === "raw_payloads" && !showRaw) return false;
        if (filterQueryLane && !n.isQueryRelevant) return false;
        return true;
      }),
    [showRaw, filterQueryLane],
  );

  const svgHeight = showRaw ? 304 : 246;
  const cursorX = 86 + Math.min(scrubIndex, rollout.length) * COL_W;

  const paneHeaderStyle: React.CSSProperties = {
    padding: "8px 12px",
    background: PANE_HEADER_BG(mode),
    borderBottom: `1px solid ${colors.softBorder}`,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 700,
    color: colors.accent,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const paneShellStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: colors.background,
    border: `1px solid ${colors.softBorder}`,
    borderRadius: 10,
    overflow: "hidden",
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Two records, one conversation"
      zhTitle="两份记录，同一段对话"
      subtitle="Drag the cursor and watch the same turn appear as a JSONL line and as projected trace nodes."
      zhSubtitle="拖动游标，观察同一个 turn 如何同时表现为 JSONL 一行和投影到 trace 各 lane 的节点。"
      caption="Rollout is the durable list of facts; the trace graph is one possible projection of those facts. State runtime answers queries against either."
      zhCaption="Rollout 是持久化的事实清单；trace graph 是这些事实的一种投影；State runtime 在两者之上回答查询。"
      badge="Chapter 8"
      zhBadge="第 8 章"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10,
        flexWrap: "wrap", marginBottom: 10 }}>
        <label htmlFor="ccm-trace-scrub"
          style={{ fontFamily: "var(--font-mono)", fontSize: 12,
            color: colors.textMuted, fontWeight: 600 }}>
          {lang === "zh" ? "as-of 游标" : "as-of cursor"}
        </label>
        <input id="ccm-trace-scrub" type="range" min={0} max={rollout.length}
          step={1} value={scrubIndex}
          onChange={(e) => setScrubIndex(Number(e.target.value))}
          style={{ flex: 1, accentColor: colors.accent, minWidth: 200 }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12,
          fontWeight: 700, color: colors.accent, minWidth: 110,
          textAlign: "right" }}>
          {scrubIndex} / {rollout.length}{" "}
          <span style={{ color: colors.textMuted, fontSize: 10 }}>
            {lang === "zh" ? "条" : "rows"}
          </span>
        </span>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap",
        marginBottom: 12 }}>
        <ToggleChip active={showRaw} onClick={() => setShowRaw((v) => !v)}
          colors={colors}
          label={lang === "zh" ? "显示 raw payloads lane" : "Show raw payloads lane"} />
        <ToggleChip active={filterQueryLane}
          onClick={() => setFilterQueryLane((v) => !v)} colors={colors}
          label={lang === "zh" ? "只看可查询投影" : "Filter to queryable projection"} />
      </div>

      <div style={paneShellStyle}>
        <div style={paneHeaderStyle}>
          {lang === "zh"
            ? "rollout.jsonl · 持久 append-only"
            : "rollout.jsonl · durable append-only"}
        </div>
        <div style={{ padding: 8, display: "flex", flexDirection: "column",
          gap: 3, maxHeight: 280, overflow: "auto",
          fontFamily: "var(--font-mono)", fontSize: 11.5 }}>
          {rollout.map((entry) => {
            const within = entry.index < scrubIndex;
            const dim = !within || (filterQueryLane && !entry.isQueryRelevant);
            const accent = kindColor[entry.kind];
            return (
              <div key={entry.index} style={{
                display: "grid",
                gridTemplateColumns: "auto auto 1fr",
                gap: 10, alignItems: "center",
                padding: "4px 8px", borderRadius: 6,
                background: dim ? "transparent" : `${accent}1a`,
                border: `1px solid ${dim ? "transparent" : `${accent}55`}`,
                color: dim ? colors.textMuted : colors.text,
                opacity: dim ? 0.42 : 1,
                whiteSpace: "nowrap", overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                <span style={{ fontSize: 10, color: colors.textMuted,
                  fontVariantNumeric: "tabular-nums", minWidth: 24 }}>
                  L{String(entry.index + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: accent,
                  minWidth: 116, letterSpacing: "0.02em" }}>
                  {entry.kind}
                </span>
                <span style={{ overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: dim ? colors.textMuted : colors.text }}>
                  {entry.json}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 220px",
        gap: 12, marginTop: 12, alignItems: "stretch" }}>
        <div style={paneShellStyle}>
          <div style={paneHeaderStyle}>
            {lang === "zh"
              ? "trace graph · 同一对话的投影"
              : "trace graph · projection of the same conversation"}
          </div>
          <div style={{ padding: 10, overflow: "auto" }}>
            <svg viewBox={`0 0 ${VIEWBOX_W} ${svgHeight}`} width="100%"
              height="auto" role="img"
              aria-label={lang === "zh"
                ? "rollout 投影到 trace 各 lane 的节点图"
                : "rollout projected as nodes across trace lanes"}
              style={{ minWidth: 560 }}>
              {visibleLanes.map((lane) => {
                const c = laneColor[lane.key];
                const subtitle =
                  (lang === "zh" ? LANE_SUBTITLE_ZH : LANE_SUBTITLE_EN)[lane.key];
                return (
                  <g key={lane.key}>
                    <rect x={8} y={lane.yCenter - 26} width={VIEWBOX_W - 16}
                      height={52} rx={10} fill={c.bg} stroke={c.fg}
                      strokeOpacity={0.35} strokeWidth={1} />
                    <text x={20} y={lane.yCenter - 8} fontSize={10}
                      fontWeight={700} fill={c.fg}
                      fontFamily="var(--font-mono)" letterSpacing="0.04em">
                      {lane.name}
                    </text>
                    <text x={20} y={lane.yCenter + 8} fontSize={9.5}
                      fill={colors.textMuted} fontFamily="var(--font-mono)">
                      {subtitle}
                    </text>
                  </g>
                );
              })}

              {rollout.map((entry) => {
                const ys = visibleLanes
                  .map((lane) =>
                    visibleNodes.find(
                      (n) => n.lane === lane.key && entry.laneIds.includes(n.id),
                    )
                      ? lane.yCenter
                      : null,
                  )
                  .filter((y): y is number => y !== null);
                if (ys.length < 2) return null;
                const x = colToX(entry.index);
                const within = entry.index < scrubIndex;
                return (
                  <line key={`rib-${entry.index}`} x1={x} x2={x}
                    y1={Math.min(...ys)} y2={Math.max(...ys)}
                    stroke={kindColor[entry.kind]} strokeWidth={1.5}
                    strokeDasharray="3 3" opacity={within ? 0.65 : 0.18} />
                );
              })}

              {visibleNodes.map((node) => {
                const lane = lanes.find((l) => l.key === node.lane)!;
                const within = node.fromIndex < scrubIndex;
                const c = laneColor[node.lane];
                const label = localized(lang, node.enLabel, node.zhLabel);
                if (node.span && node.span > 1) {
                  const xLeft = colToX(node.column) - NODE_W / 2;
                  const width = (node.span - 1) * COL_W + NODE_W;
                  return (
                    <g key={node.id}>
                      <rect x={xLeft} y={lane.yCenter - NODE_H / 2}
                        width={width} height={NODE_H} rx={NODE_H / 2}
                        fill={within ? c.bg : "transparent"} stroke={c.fg}
                        strokeWidth={within ? 1.6 : 1}
                        strokeDasharray={within ? "0" : "3 3"}
                        opacity={within ? 1 : 0.4} />
                      <text x={xLeft + width / 2} y={lane.yCenter + 4}
                        fontSize={11} fontWeight={700} textAnchor="middle"
                        fill={within ? c.fg : colors.textMuted}
                        opacity={within ? 1 : 0.6}
                        fontFamily="var(--font-mono)">
                        {label}
                      </text>
                    </g>
                  );
                }
                return (
                  <g key={node.id}>
                    <rect x={colToX(node.column) - NODE_W / 2}
                      y={lane.yCenter - NODE_H / 2} width={NODE_W}
                      height={NODE_H} rx={6}
                      fill={within ? c.bg : "transparent"} stroke={c.fg}
                      strokeWidth={within ? 1.6 : 1}
                      strokeDasharray={within ? "0" : "3 3"}
                      opacity={within ? 1 : 0.4} />
                    <text x={colToX(node.column)} y={lane.yCenter + 4}
                      fontSize={10.5} fontWeight={650} textAnchor="middle"
                      fill={within ? c.fg : colors.textMuted}
                      opacity={within ? 1 : 0.6}
                      fontFamily="var(--font-mono)">
                      {label}
                    </text>
                  </g>
                );
              })}

              <line x1={cursorX} x2={cursorX} y1={6} y2={svgHeight - 6}
                stroke={colors.accent} strokeWidth={1.6}
                strokeDasharray="2 4" opacity={0.85} />
              <rect x={cursorX - 28} y={svgHeight - 22} width={56} height={16}
                rx={4} fill={colors.accentSoft} stroke={colors.accent}
                strokeWidth={1} />
              <text x={cursorX} y={svgHeight - 10} fontSize={10}
                fontWeight={700} textAnchor="middle" fill={colors.accent}
                fontFamily="var(--font-mono)">
                {`t = ${scrubIndex}`}
              </text>
            </svg>
          </div>
        </div>

        <Legend lang={lang} colors={colors} purpleFg={purpleFg}
          paneShellStyle={paneShellStyle} paneHeaderStyle={paneHeaderStyle} />
      </div>
    </InteractiveFigure>
  );
}

function ToggleChip({
  active,
  onClick,
  label,
  colors,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  colors: typeof palette.light;
}) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      style={{
        background: active ? colors.accentSoft : colors.panel,
        color: active ? colors.accent : colors.text,
        border: `1px solid ${active ? colors.accent : colors.border}`,
        borderRadius: 999, padding: "5px 12px", fontSize: 11.5,
        fontWeight: 600, cursor: "pointer",
        fontFamily: "var(--font-mono)", letterSpacing: "0.01em",
      }}>
      <span style={{
        display: "inline-block", width: 9, height: 9, borderRadius: 999,
        background: active ? colors.accent : "transparent",
        border: `1.5px solid ${active ? colors.accent : colors.textMuted}`,
        marginRight: 8, verticalAlign: "middle",
      }} />
      {label}
    </button>
  );
}

interface LegendItem {
  color: string;
  enTitle: string;
  zhTitle: string;
  enBody: string;
  zhBody: string;
}

function Legend({
  lang,
  colors,
  purpleFg,
  paneShellStyle,
  paneHeaderStyle,
}: {
  lang: Lang;
  colors: typeof palette.light;
  purpleFg: string;
  paneShellStyle: React.CSSProperties;
  paneHeaderStyle: React.CSSProperties;
}) {
  const items: LegendItem[] = [
    {
      color: colors.warning,
      enTitle: "Rollout = facts",
      zhTitle: "Rollout = 事实",
      enBody:
        "Append-only .jsonl. One line per atomic event. Never edited; replayed to rebuild any later view.",
      zhBody:
        "仅追加的 .jsonl，每个原子事件一行。不可修改，可被重放以重建后续视图。",
    },
    {
      color: colors.success,
      enTitle: "Trace = projections",
      zhTitle: "Trace = 投影",
      enBody:
        "Same facts grouped by lane. Multiple lanes may share one rollout entry; lanes can be hidden or filtered.",
      zhBody:
        "同样的事实按 lane 分组：一条 rollout 可投影到多个 lane；lane 可隐藏或过滤。",
    },
    {
      color: purpleFg,
      enTitle: "State runtime = queries",
      zhTitle: "State runtime = 查询",
      enBody:
        "Builds queryable views over rollout + trace, e.g. \"latest assistant message\" or \"all tool calls in turn 1\".",
      zhBody:
        "在 rollout 与 trace 之上构建可查询视图，如「最近一条 assistant」或「turn 1 的所有 tool_call」。",
    },
  ];
  return (
    <aside style={paneShellStyle}>
      <div style={paneHeaderStyle}>
        {lang === "zh" ? "三种视角" : "Three views"}
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column",
        gap: 12, fontSize: 11.5, color: colors.text, lineHeight: 1.5 }}>
        {items.map((item) => (
          <div key={item.enTitle}>
            <div style={{ display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-mono)", fontWeight: 700,
              color: item.color, marginBottom: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3,
                background: item.color, display: "inline-block" }} />
              {localized(lang, item.enTitle, item.zhTitle)}
            </div>
            <div style={{ color: colors.textMuted }}>
              {localized(lang, item.enBody, item.zhBody)}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 4, paddingTop: 10,
          borderTop: `1px dashed ${colors.softBorder}`,
          fontFamily: "var(--font-mono)", fontSize: 10.5,
          color: colors.textMuted, lineHeight: 1.5 }}>
          {lang === "zh"
            ? "拖动游标追溯任意时刻；切换 lane 可观察 trace 仅是 rollout 的可选投影。"
            : "Scrub the cursor to any moment; toggle lanes to see that the trace is one optional projection of the rollout."}
        </div>
      </div>
    </aside>
  );
}
