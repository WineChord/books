import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import {
  useThemeMode,
  palette,
  type ThemeMode,
  type Palette,
} from "./useThemeMode";

// A rollout entry is one durable line in rollout.jsonl. The state runtime
// SQLite projection on the right is derived deterministically from these
// lines, so a fresh process can hydrate by replaying them in order.
type EntryKind =
  | "thread_meta"
  | "user"
  | "assistant"
  | "tool_call"
  | "tool_output"
  | "checkpoint";

interface RolloutEntry {
  id: number;
  kind: EntryKind;
  turn: number;
  enJson: string;
  zhJson: string;
  text?: string;
  zhText?: string;
  callId?: string;
  lines?: number;
  corrupt?: boolean;
}

interface RuntimeTables {
  threads: Array<{ id: string; model: string }>;
  turns: Array<{ thread_id: string; turn_no: number; started_at: string }>;
  items: Array<{
    thread_id: string;
    turn_no: number;
    role: string;
    enText: string;
    zhText: string;
  }>;
  tool_outputs: Array<{
    thread_id: string;
    turn_no: number;
    call_id: string;
    lines: number;
  }>;
  checkpoint?: { turn: number; en: string; zh: string };
}

const THREAD_ID = "thr_a1b2c3d4";
const MODEL = "gpt-5-codex";

type ScriptEntry = Omit<RolloutEntry, "id">;

const META: ScriptEntry = {
  kind: "thread_meta",
  turn: 0,
  enJson: `{"type":"thread_meta","id":"${THREAD_ID}","model":"${MODEL}"}`,
  zhJson: `{"type":"thread_meta","id":"${THREAD_ID}","model":"${MODEL}"}`,
};

// Each inner array is one logical "turn" applied per Step click.
const TURNS: ScriptEntry[][] = [
  [
    {
      kind: "user",
      turn: 1,
      text: "outline a retry strategy for the API client",
      zhText: "为 API client 列出 retry 策略",
      enJson: `{"type":"user","turn":1,"text":"outline a retry strategy"}`,
      zhJson: `{"type":"user","turn":1,"text":"列出 retry 策略"}`,
    },
    {
      kind: "assistant",
      turn: 1,
      text: "five-step plan ready",
      zhText: "五步计划已就绪",
      enJson: `{"type":"assistant","turn":1,"text":"five-step plan"}`,
      zhJson: `{"type":"assistant","turn":1,"text":"五步计划"}`,
    },
  ],
  [
    {
      kind: "tool_call",
      turn: 2,
      callId: "tc_01",
      enJson: `{"type":"tool_call","turn":2,"id":"tc_01","name":"read_file"}`,
      zhJson: `{"type":"tool_call","turn":2,"id":"tc_01","name":"read_file"}`,
    },
    {
      kind: "tool_output",
      turn: 2,
      callId: "tc_01",
      lines: 120,
      enJson: `{"type":"tool_output","turn":2,"ref":"tc_01","lines":120}`,
      zhJson: `{"type":"tool_output","turn":2,"ref":"tc_01","lines":120}`,
    },
  ],
  [
    {
      kind: "assistant",
      turn: 3,
      text: "drafting backoff helper…",
      zhText: "正在草拟 backoff helper…",
      enJson: `{"type":"assistant","turn":3,"text":"drafting backoff helper"}`,
      zhJson: `{"type":"assistant","turn":3,"text":"草拟 backoff helper"}`,
    },
  ],
];

const CHECKPOINT: ScriptEntry = {
  kind: "checkpoint",
  turn: 3,
  enJson: `{"type":"checkpoint","turn":3,"summary":"turns 1..3 compacted"}`,
  zhJson: `{"type":"checkpoint","turn":3,"summary":"turns 1..3 已 compact"}`,
};

const TORN_LINE: ScriptEntry = {
  kind: "user",
  turn: -1,
  enJson: `{"type":"user","turn":2,"text":"hel`,
  zhJson: `{"type":"user","turn":2,"text":"hel`,
  corrupt: true,
};

type Phase =
  | "writing"
  | "compacted"
  | "crashed"
  | "wiping"
  | "hydrating"
  | "resumed";

const emptyRuntime = (): RuntimeTables => ({
  threads: [],
  turns: [],
  items: [],
  tool_outputs: [],
});

// Project a single rollout entry into the runtime tables. Corrupt entries
// are silently dropped, mirroring how the real replay logic skips a torn
// trailing line.
function applyEntry(prev: RuntimeTables, entry: RolloutEntry): RuntimeTables {
  if (entry.corrupt) return prev;
  switch (entry.kind) {
    case "thread_meta":
      return { ...prev, threads: [{ id: THREAD_ID, model: MODEL }] };
    case "user":
    case "assistant": {
      const turns = prev.turns.some((t) => t.turn_no === entry.turn)
        ? prev.turns
        : [
            ...prev.turns,
            {
              thread_id: THREAD_ID,
              turn_no: entry.turn,
              started_at: "t+" + entry.turn + "s",
            },
          ];
      return {
        ...prev,
        turns,
        items: [
          ...prev.items,
          {
            thread_id: THREAD_ID,
            turn_no: entry.turn,
            role: entry.kind,
            enText: entry.text ?? "",
            zhText: entry.zhText ?? "",
          },
        ],
      };
    }
    case "tool_call": {
      const turns = prev.turns.some((t) => t.turn_no === entry.turn)
        ? prev.turns
        : [
            ...prev.turns,
            {
              thread_id: THREAD_ID,
              turn_no: entry.turn,
              started_at: "t+" + entry.turn + "s",
            },
          ];
      return {
        ...prev,
        turns,
        items: [
          ...prev.items,
          {
            thread_id: THREAD_ID,
            turn_no: entry.turn,
            role: "tool_call",
            enText: `read_file(${entry.callId})`,
            zhText: `read_file(${entry.callId})`,
          },
        ],
      };
    }
    case "tool_output":
      return {
        ...prev,
        tool_outputs: [
          ...prev.tool_outputs,
          {
            thread_id: THREAD_ID,
            turn_no: entry.turn,
            call_id: entry.callId ?? "",
            lines: entry.lines ?? 0,
          },
        ],
      };
    case "checkpoint":
      return {
        ...prev,
        checkpoint: {
          turn: entry.turn,
          en: "turns 1..3 compacted",
          zh: "turns 1..3 已 compact",
        },
      };
    default:
      return prev;
  }
}

interface Props {
  lang: Lang;
}

export default function DurableThreadLedger({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [phase, setPhase] = useState<Phase>("writing");
  const [stepIndex, setStepIndex] = useState(0);
  const [rollout, setRollout] = useState<RolloutEntry[]>([
    { ...META, id: 0 },
  ]);
  const [runtime, setRuntime] = useState<RuntimeTables>(() =>
    applyEntry(emptyRuntime(), { ...META, id: 0 }),
  );
  const [hydrationCursor, setHydrationCursor] = useState<number>(-1);
  const [skippedIndex, setSkippedIndex] = useState<number | null>(null);
  const wipeTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (wipeTimer.current) window.clearTimeout(wipeTimer.current);
    },
    [],
  );

  const nextRolloutId = useCallback(
    () => rollout.reduce((m, e) => Math.max(m, e.id), -1) + 1,
    [rollout],
  );

  const reset = useCallback(() => {
    if (wipeTimer.current) window.clearTimeout(wipeTimer.current);
    setPhase("writing");
    setStepIndex(0);
    setRollout([{ ...META, id: 0 }]);
    setRuntime(applyEntry(emptyRuntime(), { ...META, id: 0 }));
    setHydrationCursor(-1);
    setSkippedIndex(null);
  }, []);

  const startResume = useCallback(() => {
    setPhase("wiping");
    setSkippedIndex(null);
    setRuntime(emptyRuntime());
    wipeTimer.current = window.setTimeout(() => {
      setPhase("hydrating");
      setHydrationCursor(0);
    }, 700);
  }, []);

  const step = useCallback(() => {
    if (phase === "wiping" || phase === "hydrating") return;

    if (phase === "writing" && stepIndex < TURNS.length) {
      const entries = TURNS[stepIndex];
      const baseId = nextRolloutId();
      const stamped: RolloutEntry[] = entries.map((e, i) => ({
        ...e,
        id: baseId + i,
      }));
      setRollout((prev) => [...prev, ...stamped]);
      setRuntime((prev) => stamped.reduce(applyEntry, prev));
      setStepIndex((s) => s + 1);
      return;
    }

    if (phase === "writing" && stepIndex === TURNS.length) {
      const entry: RolloutEntry = { ...CHECKPOINT, id: nextRolloutId() };
      setRollout((prev) => [...prev, entry]);
      setRuntime((prev) => applyEntry(prev, entry));
      setStepIndex((s) => s + 1);
      setPhase("compacted");
      return;
    }

    if (phase === "compacted" || phase === "crashed") {
      startResume();
      return;
    }

    if (phase === "resumed") {
      reset();
    }
  }, [phase, stepIndex, nextRolloutId, startResume, reset]);

  const crash = useCallback(() => {
    if (phase !== "writing") return;
    const entry: RolloutEntry = { ...TORN_LINE, id: nextRolloutId() };
    setRollout((prev) => [...prev, entry]);
    setPhase("crashed");
  }, [phase, nextRolloutId]);

  // Drive the hydration animation: replay one rollout entry per tick into
  // the runtime tables, skipping the torn write if present.
  useEffect(() => {
    if (phase !== "hydrating") return;
    if (hydrationCursor < 0) return;
    if (hydrationCursor >= rollout.length) {
      setPhase("resumed");
      return;
    }
    const entry = rollout[hydrationCursor];
    const t = window.setTimeout(() => {
      if (entry.corrupt) {
        setSkippedIndex(entry.id);
      } else {
        setRuntime((prev) => applyEntry(prev, entry));
      }
      setHydrationCursor((c) => c + 1);
    }, 360);
    return () => window.clearTimeout(t);
  }, [phase, hydrationCursor, rollout]);

  const asOfTurn = useMemo(() => {
    const turns = runtime.turns.map((t) => t.turn_no);
    return turns.length ? Math.max(...turns) : 0;
  }, [runtime]);

  const stepLabel = useMemo(() => {
    if (phase === "writing" && stepIndex < TURNS.length) {
      return localized(
        lang,
        `Step · write turn ${stepIndex + 1}`,
        `下一步 · 写入 turn ${stepIndex + 1}`,
      );
    }
    if (phase === "writing" && stepIndex === TURNS.length) {
      return localized(lang, "Step · run compaction", "下一步 · 执行 compaction");
    }
    if (phase === "compacted") {
      return localized(
        lang,
        "Step · resume from new process",
        "下一步 · 在新进程中 resume",
      );
    }
    if (phase === "crashed") {
      return localized(
        lang,
        "Step · resume (skip torn line)",
        "下一步 · resume（跳过 torn line）",
      );
    }
    if (phase === "wiping") {
      return localized(lang, "Process restarting…", "进程重启中…");
    }
    if (phase === "hydrating") {
      return localized(lang, "Hydrating…", "正在 hydrate…");
    }
    return localized(lang, "Step · reset & replay", "下一步 · 重置并重放");
  }, [phase, stepIndex, lang]);

  const phaseBadge = useMemo(() => {
    switch (phase) {
      case "writing":
        return localized(lang, "live", "运行中");
      case "compacted":
        return localized(lang, "compacted", "已 compact");
      case "crashed":
        return localized(lang, "torn write", "torn write");
      case "wiping":
        return localized(lang, "process down", "进程下线");
      case "hydrating":
        return localized(lang, "hydrating", "hydrate 中");
      case "resumed":
        return localized(lang, "resumed", "已 resume");
    }
  }, [phase, lang]);

  const phaseColor = useMemo(() => {
    switch (phase) {
      case "writing":
        return colors.success;
      case "compacted":
        return colors.info;
      case "crashed":
        return colors.warning;
      case "wiping":
      case "hydrating":
        return colors.accent;
      case "resumed":
        return colors.success;
    }
  }, [phase, colors]);

  const stepDisabled = phase === "wiping" || phase === "hydrating";
  const crashDisabled = phase !== "writing" || stepIndex === 0;

  return (
    <InteractiveFigure
      lang={lang}
      title="One thread, two storage planes"
      zhTitle="一个 thread，两个存储面"
      subtitle="Append-only rollout.jsonl is the source of truth; the SQLite-shaped state runtime is a derived projection."
      zhSubtitle="append-only 的 rollout.jsonl 是 source of truth；SQLite 形状的 state runtime 是派生投影。"
      caption="A new process recovers by replaying the rollout from line 0. A torn final line is detected and skipped without losing earlier turns."
      zhCaption="新进程通过从第 0 行开始重放 rollout 来恢复；末尾被截断的 torn line 会被检测并跳过，已写入的 turn 不会丢失。"
      badge="Chapter 5"
      zhBadge="第 5 章"
    >
      <ControlBar
        lang={lang}
        colors={colors}
        stepLabel={stepLabel}
        phaseBadge={phaseBadge}
        phaseColor={phaseColor}
        asOfTurn={asOfTurn}
        onStep={step}
        onCrash={crash}
        onReset={reset}
        stepDisabled={stepDisabled}
        crashDisabled={crashDisabled}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 28px minmax(0, 1fr)",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        <Pane
          mode={mode}
          colors={colors}
          title={
            lang === "zh"
              ? "rollout.jsonl（append-only，磁盘上）"
              : "rollout.jsonl (append-only, on disk)"
          }
        >
          <RolloutView
            entries={rollout}
            lang={lang}
            colors={colors}
            phase={phase}
            hydrationCursor={hydrationCursor}
            skippedIndex={skippedIndex}
          />
        </Pane>

        <DeriveArrow lang={lang} colors={colors} active={phase === "hydrating"} />

        <Pane
          mode={mode}
          colors={colors}
          title={
            lang === "zh"
              ? "state runtime（SQLite 投影，进程内）"
              : "state runtime (SQLite projection, in-process)"
          }
        >
          <RuntimeView
            runtime={runtime}
            lang={lang}
            colors={colors}
            phase={phase}
          />
        </Pane>
      </div>

      <StatusBanner
        lang={lang}
        colors={colors}
        phase={phase}
        skippedIndex={skippedIndex}
      />
    </InteractiveFigure>
  );
}

interface ControlBarProps {
  lang: Lang;
  colors: Palette;
  stepLabel: string;
  phaseBadge: string;
  phaseColor: string;
  asOfTurn: number;
  onStep: () => void;
  onCrash: () => void;
  onReset: () => void;
  stepDisabled: boolean;
  crashDisabled: boolean;
}

function ControlBar({
  lang,
  colors,
  stepLabel,
  phaseBadge,
  phaseColor,
  asOfTurn,
  onStep,
  onCrash,
  onReset,
  stepDisabled,
  crashDisabled,
}: ControlBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <button
        onClick={onStep}
        disabled={stepDisabled}
        style={{
          background: stepDisabled ? colors.panel : colors.accent,
          color: stepDisabled ? colors.textMuted : "#fff",
          border: stepDisabled ? `1px solid ${colors.border}` : "none",
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 700,
          cursor: stepDisabled ? "not-allowed" : "pointer",
          fontFamily: "var(--font-mono)",
        }}
      >
        {stepLabel}
      </button>
      <button
        onClick={onCrash}
        disabled={crashDisabled}
        style={{
          background: colors.panel,
          color: crashDisabled ? colors.textMuted : colors.warning,
          border: `1px solid ${crashDisabled ? colors.border : colors.warning}`,
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 700,
          cursor: crashDisabled ? "not-allowed" : "pointer",
          opacity: crashDisabled ? 0.55 : 1,
          fontFamily: "var(--font-mono)",
        }}
      >
        {lang === "zh" ? "⚡ 写入中崩溃" : "⚡ Crash mid-write"}
      </button>
      <button
        onClick={onReset}
        style={{
          background: colors.panel,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
        }}
      >
        {lang === "zh" ? "重置" : "Reset"}
      </button>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
        }}
      >
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 999,
            background: phaseColor + "1f",
            color: phaseColor,
            border: `1px solid ${phaseColor}66`,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {phaseBadge}
        </span>
        <span style={{ color: colors.textMuted }}>
          {lang === "zh" ? "as-of turn" : "as-of turn"}{" "}
          <strong style={{ color: colors.text }}>{asOfTurn}</strong>
        </span>
      </div>
    </div>
  );
}

function Pane({
  title,
  children,
  colors,
  mode,
}: {
  title: string;
  children: React.ReactNode;
  colors: Palette;
  mode: ThemeMode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        minHeight: 320,
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          background:
            mode === "light"
              ? "linear-gradient(180deg, #f5f1e2 0%, #fdfaf2 100%)"
              : "linear-gradient(180deg, #2c2b29 0%, #1f1f1d 100%)",
          borderBottom: `1px solid ${colors.softBorder}`,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color: colors.accent,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          padding: 10,
          flex: 1,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DeriveArrow({
  lang,
  colors,
  active,
}: {
  lang: Lang;
  colors: Palette;
  active: boolean;
}) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        color: active ? colors.accent : colors.textMuted,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {lang === "zh" ? "derive →" : "derive →"}
      </span>
      <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
    </div>
  );
}

interface RolloutViewProps {
  entries: RolloutEntry[];
  lang: Lang;
  colors: Palette;
  phase: Phase;
  hydrationCursor: number;
  skippedIndex: number | null;
}

function RolloutView({
  entries,
  lang,
  colors,
  phase,
  hydrationCursor,
  skippedIndex,
}: RolloutViewProps) {
  const dim = phase === "wiping";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        opacity: dim ? 0.35 : 1,
        transition: "opacity 0.25s ease",
      }}
    >
      {entries.map((entry, i) => {
        const reading =
          phase === "hydrating" && hydrationCursor === i ? true : false;
        const wasSkipped = entry.id === skippedIndex;
        const corrupt = entry.corrupt === true;
        const accent = corrupt ? colors.warning : colors.accent;
        const text = localized(lang, entry.enJson, entry.zhJson);
        return (
          <div
            key={entry.id}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 6,
              padding: "3px 6px",
              borderRadius: 5,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              border: `1px solid ${
                reading
                  ? accent
                  : corrupt
                  ? colors.warning + "88"
                  : "transparent"
              }`,
              background: reading
                ? accent + "22"
                : corrupt
                ? colors.warningSoft
                : "transparent",
              color: corrupt ? colors.warning : colors.text,
            }}
          >
            <span
              style={{
                color: colors.textMuted,
                fontVariantNumeric: "tabular-nums",
                width: 26,
                textAlign: "right",
              }}
            >
              {String(i + 1).padStart(3, "0")}
            </span>
            <span
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                textDecoration: wasSkipped ? "line-through" : "none",
              }}
            >
              {text}
              {corrupt ? (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 9,
                    fontWeight: 700,
                    color: colors.warning,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {wasSkipped
                    ? lang === "zh"
                      ? "· skipped"
                      : "· skipped"
                    : lang === "zh"
                    ? "· torn"
                    : "· torn"}
                </span>
              ) : null}
            </span>
          </div>
        );
      })}
      {phase === "writing" || phase === "compacted" || phase === "resumed" ? (
        <div
          style={{
            marginTop: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: colors.textMuted,
            fontStyle: "italic",
          }}
        >
          {lang === "zh"
            ? "↳ fsync 后即视为 durable"
            : "↳ durable once fsync returns"}
        </div>
      ) : null}
    </div>
  );
}

interface RuntimeViewProps {
  runtime: RuntimeTables;
  lang: Lang;
  colors: Palette;
  phase: Phase;
}

function RuntimeView({ runtime, lang, colors, phase }: RuntimeViewProps) {
  const empty =
    runtime.threads.length === 0 &&
    runtime.turns.length === 0 &&
    runtime.items.length === 0 &&
    runtime.tool_outputs.length === 0;

  if (empty) {
    return (
      <div
        style={{
          padding: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: colors.textMuted,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        {phase === "wiping"
          ? lang === "zh"
            ? "进程已下线，runtime 在重启中…"
            : "process gone — runtime restarting…"
          : lang === "zh"
          ? "runtime 为空（等待 hydrate 或写入）"
          : "runtime is empty (awaiting hydrate or write)"}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <DBTable
        name="threads"
        headers={["id", "model"]}
        rows={runtime.threads.map((t) => [shortId(t.id), t.model])}
        colors={colors}
      />
      <DBTable
        name="turns"
        headers={["thread_id", "turn_no", "started_at"]}
        rows={runtime.turns.map((t) => [
          shortId(t.thread_id),
          String(t.turn_no),
          t.started_at,
        ])}
        colors={colors}
      />
      <DBTable
        name="items"
        headers={["turn", "role", lang === "zh" ? "文本" : "text"]}
        rows={runtime.items.map((it) => [
          String(it.turn_no),
          it.role,
          localized(lang, it.enText, it.zhText) || "—",
        ])}
        colors={colors}
      />
      <DBTable
        name="tool_outputs"
        headers={["turn", "call_id", lang === "zh" ? "行数" : "lines"]}
        rows={runtime.tool_outputs.map((o) => [
          String(o.turn_no),
          o.call_id,
          String(o.lines),
        ])}
        colors={colors}
      />
      {runtime.checkpoint ? (
        <div
          style={{
            padding: "6px 8px",
            borderRadius: 6,
            border: `1px solid ${colors.info}66`,
            background: colors.infoSoft,
            color: colors.info,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
          }}
        >
          <strong style={{ marginRight: 6 }}>checkpoint:</strong>
          {localized(
            lang,
            `installed at turn ${runtime.checkpoint.turn} · ${runtime.checkpoint.en}`,
            `已在 turn ${runtime.checkpoint.turn} 安装 · ${runtime.checkpoint.zh}`,
          )}
        </div>
      ) : null}
    </div>
  );
}

function DBTable({
  name,
  headers,
  rows,
  colors,
}: {
  name: string;
  headers: string[];
  rows: string[][];
  colors: Palette;
}) {
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 6,
        overflow: "hidden",
        background: colors.panel,
      }}
    >
      <div
        style={{
          padding: "3px 8px",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 700,
          color: colors.accent,
          background: colors.track,
          borderBottom: `1px solid ${colors.softBorder}`,
          letterSpacing: "0.05em",
        }}
      >
        {name}
      </div>
      {rows.length === 0 ? (
        <div
          style={{
            padding: "5px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: colors.textMuted,
            fontStyle: "italic",
          }}
        >
          (0 rows)
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
          }}
        >
          <thead>
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "3px 8px",
                    color: colors.textMuted,
                    borderBottom: `1px solid ${colors.softBorder}`,
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "3px 8px",
                      color: colors.text,
                      borderTop:
                        i === 0
                          ? "none"
                          : `1px solid ${colors.softBorder}55`,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 180,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StatusBanner({
  lang,
  colors,
  phase,
  skippedIndex,
}: {
  lang: Lang;
  colors: Palette;
  phase: Phase;
  skippedIndex: number | null;
}) {
  let kind: "info" | "warn" | "ok" | null = null;
  let en = "";
  let zh = "";

  if (phase === "crashed") {
    kind = "warn";
    en =
      "Torn write detected: rollout has a partial trailing line; the runtime never observed it. Click Step to resume — replay will skip line 0 corruption safely.";
    zh =
      "检测到 torn write：rollout 末尾有一段不完整的行，runtime 还没看到它。点击下一步即可 resume —— replay 会安全跳过损坏行。";
  } else if (phase === "wiping") {
    kind = "info";
    en =
      "Process exited. Rollout stays on disk; the in-process state runtime is gone.";
    zh = "进程退出。rollout 仍在磁盘上；进程内的 state runtime 已经消失。";
  } else if (phase === "hydrating") {
    kind = "info";
    en = "Replaying rollout into a fresh state runtime, line by line.";
    zh = "正在把 rollout 一行行重放进新的 state runtime。";
  } else if (phase === "resumed") {
    kind = "ok";
    en =
      skippedIndex !== null
        ? "Resumed. The torn final line was skipped; everything before it survived intact."
        : "Resumed. The new process matches the pre-crash state byte-for-byte.";
    zh =
      skippedIndex !== null
        ? "已 resume。末尾的 torn line 被跳过，之前写入的内容完好无损。"
        : "已 resume。新进程的状态和崩溃前逐字节一致。";
  } else if (phase === "compacted") {
    kind = "info";
    en =
      "Compaction installed a checkpoint summary in both planes. The original lines stay in rollout for audit.";
    zh =
      "compaction 在两个 plane 中都装入了 checkpoint 摘要；原始行保留在 rollout 中以备审计。";
  }

  if (!kind) return null;

  const kindStyles: Record<
    typeof kind,
    { fg: string; bg: string; border: string }
  > = {
    info: { fg: colors.info, bg: colors.infoSoft, border: colors.info },
    warn: {
      fg: colors.warning,
      bg: colors.warningSoft,
      border: colors.warning,
    },
    ok: {
      fg: colors.success,
      bg: colors.successSoft,
      border: colors.success,
    },
  };
  const p = kindStyles[kind];

  return (
    <div
      role={kind === "warn" ? "alert" : "status"}
      style={{
        marginTop: 12,
        padding: 10,
        borderRadius: 9,
        border: `1px solid ${p.border}`,
        background: p.bg,
        color: p.fg,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.5,
      }}
    >
      {localized(lang, en, zh)}
    </div>
  );
}

function shortId(id: string): string {
  if (id.length <= 12) return id;
  return id.slice(0, 8) + "…";
}
