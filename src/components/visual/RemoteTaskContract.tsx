import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type StateKey =
  | "queued"
  | "picked_up"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

type EventTone = "info" | "ok" | "warn" | "error";

interface TaskEvent {
  at: number;
  enLabel: string;
  zhLabel: string;
  tone: EventTone;
  toState: StateKey;
}

type ScenarioKey =
  | "happy_path"
  | "cancelled_mid_flight"
  | "timeout_waiting_for_worker"
  | "retried_after_transient_error";

interface Scenario {
  key: ScenarioKey;
  enLabel: string;
  zhLabel: string;
  enHint: string;
  zhHint: string;
  contract: {
    task_id: string;
    capabilities: string[];
    tenant: string;
    deadline: string;
    idempotency_key: string;
  };
  events: TaskEvent[];
}

const SCENARIOS: Scenario[] = [
  {
    key: "happy_path",
    enLabel: "happy path",
    zhLabel: "顺利路径",
    enHint: "ack → pickup → stream → done",
    zhHint: "ack → pickup → stream → done",
    contract: {
      task_id: "tsk_01HZAB6QK0X",
      capabilities: ["read_files", "run_tests", "edit_patch"],
      tenant: "acme-prod",
      deadline: "+15m (2026-05-15T11:45:00Z)",
      idempotency_key: "ik_8a3f0b91",
    },
    events: [
      { at: 0, tone: "info", toState: "queued",
        enLabel: "POST /v1/tasks (submit)",
        zhLabel: "POST /v1/tasks（submit）" },
      { at: 80, tone: "ok", toState: "queued",
        enLabel: "ack: server accepted task",
        zhLabel: "ack：server 已接受 task" },
      { at: 230, tone: "info", toState: "picked_up",
        enLabel: "worker pulled task from queue",
        zhLabel: "worker 从 queue 拉取 task" },
      { at: 320, tone: "info", toState: "running",
        enLabel: "stream channel opened (SSE)",
        zhLabel: "stream 通道已打开（SSE）" },
      { at: 410, tone: "info", toState: "running",
        enLabel: "event: assistant_message_delta",
        zhLabel: "event：assistant_message_delta" },
      { at: 740, tone: "info", toState: "running",
        enLabel: "event: tool_call(run_tests)",
        zhLabel: "event：tool_call(run_tests)" },
      { at: 1180, tone: "ok", toState: "running",
        enLabel: "event: tool_output(42/42 passed)",
        zhLabel: "event：tool_output（42/42 通过）" },
      { at: 1490, tone: "ok", toState: "succeeded",
        enLabel: "terminal: succeeded",
        zhLabel: "terminal：succeeded" },
    ],
  },
  {
    key: "cancelled_mid_flight",
    enLabel: "cancelled mid-flight",
    zhLabel: "运行中被取消",
    enHint: "client cancels while streaming",
    zhHint: "client 在 streaming 时取消",
    contract: {
      task_id: "tsk_01HZAB6QK0Y",
      capabilities: ["read_files", "run_tests"],
      tenant: "acme-prod",
      deadline: "+15m (2026-05-15T11:50:00Z)",
      idempotency_key: "ik_91d22f70",
    },
    events: [
      { at: 0, tone: "info", toState: "queued",
        enLabel: "POST /v1/tasks (submit)",
        zhLabel: "POST /v1/tasks（submit）" },
      { at: 75, tone: "ok", toState: "queued",
        enLabel: "ack: server accepted task",
        zhLabel: "ack：server 已接受 task" },
      { at: 250, tone: "info", toState: "picked_up",
        enLabel: "worker pulled task from queue",
        zhLabel: "worker 从 queue 拉取 task" },
      { at: 330, tone: "info", toState: "running",
        enLabel: "stream channel opened (SSE)",
        zhLabel: "stream 通道已打开（SSE）" },
      { at: 480, tone: "info", toState: "running",
        enLabel: "event: assistant_message_delta",
        zhLabel: "event：assistant_message_delta" },
      { at: 610, tone: "warn", toState: "running",
        enLabel: "client → DELETE /v1/tasks/{id}",
        zhLabel: "client → DELETE /v1/tasks/{id}" },
      { at: 720, tone: "warn", toState: "running",
        enLabel: "cancel signal forwarded to worker",
        zhLabel: "cancel 信号已转发给 worker" },
      { at: 830, tone: "warn", toState: "cancelled",
        enLabel: "terminal: cancelled (cooperative)",
        zhLabel: "terminal：cancelled（合作式）" },
    ],
  },
  {
    key: "timeout_waiting_for_worker",
    enLabel: "timeout waiting for worker",
    zhLabel: "等待 worker 超时",
    enHint: "no worker, deadline missed",
    zhHint: "没有 worker，错过 deadline",
    contract: {
      task_id: "tsk_01HZAB6QK0Z",
      capabilities: ["edit_patch"],
      tenant: "acme-staging",
      deadline: "+5s (tight) 2026-05-15T11:55:05Z",
      idempotency_key: "ik_55c1a302",
    },
    events: [
      { at: 0, tone: "info", toState: "queued",
        enLabel: "POST /v1/tasks (submit, deadline=5s)",
        zhLabel: "POST /v1/tasks（submit，deadline=5s）" },
      { at: 60, tone: "ok", toState: "queued",
        enLabel: "ack: server accepted task",
        zhLabel: "ack：server 已接受 task" },
      { at: 1200, tone: "warn", toState: "queued",
        enLabel: "no worker matched capabilities yet",
        zhLabel: "暂无 worker 匹配 capabilities" },
      { at: 3000, tone: "warn", toState: "queued",
        enLabel: "still queued, scheduler nudged",
        zhLabel: "仍在 queue，scheduler 已 nudge" },
      { at: 5000, tone: "error", toState: "queued",
        enLabel: "deadline exceeded",
        zhLabel: "deadline exceeded" },
      { at: 5100, tone: "error", toState: "failed",
        enLabel: "terminal: failed (DEADLINE_EXCEEDED)",
        zhLabel: "terminal：failed（DEADLINE_EXCEEDED）" },
    ],
  },
  {
    key: "retried_after_transient_error",
    enLabel: "retry after transient error",
    zhLabel: "瞬时错误后重试",
    enHint: "5xx → backoff → re-queue → success",
    zhHint: "5xx → backoff → 重新入队 → 成功",
    contract: {
      task_id: "tsk_01HZAB6QK10",
      capabilities: ["read_files", "run_tests"],
      tenant: "acme-prod",
      deadline: "+15m (2026-05-15T12:00:00Z)",
      idempotency_key: "ik_b71e0c4a",
    },
    events: [
      { at: 0, tone: "info", toState: "queued",
        enLabel: "POST /v1/tasks (submit)",
        zhLabel: "POST /v1/tasks（submit）" },
      { at: 70, tone: "ok", toState: "queued",
        enLabel: "ack: server accepted task",
        zhLabel: "ack：server 已接受 task" },
      { at: 220, tone: "info", toState: "picked_up",
        enLabel: "worker pulled task from queue",
        zhLabel: "worker 从 queue 拉取 task" },
      { at: 310, tone: "info", toState: "running",
        enLabel: "stream channel opened (SSE)",
        zhLabel: "stream 通道已打开（SSE）" },
      { at: 440, tone: "error", toState: "running",
        enLabel: "worker error: 503 upstream",
        zhLabel: "worker 错误：503 upstream" },
      { at: 460, tone: "warn", toState: "running",
        enLabel: "backoff 250ms (idempotency_key reused)",
        zhLabel: "backoff 250ms（复用 idempotency_key）" },
      { at: 720, tone: "info", toState: "queued",
        enLabel: "re-enqueued for retry (attempt 2)",
        zhLabel: "重新入队等待 retry（attempt 2）" },
      { at: 900, tone: "info", toState: "picked_up",
        enLabel: "another worker picked up task",
        zhLabel: "另一个 worker 拉取了 task" },
      { at: 970, tone: "info", toState: "running",
        enLabel: "stream channel opened (SSE)",
        zhLabel: "stream 通道已打开（SSE）" },
      { at: 1350, tone: "ok", toState: "running",
        enLabel: "event: tool_output(passed)",
        zhLabel: "event：tool_output（通过）" },
      { at: 1620, tone: "ok", toState: "succeeded",
        enLabel: "terminal: succeeded (retry won)",
        zhLabel: "terminal：succeeded（retry 成功）" },
    ],
  },
];

const STATE_POS: Record<StateKey, { x: number; y: number }> = {
  queued: { x: 170, y: 50 },
  picked_up: { x: 170, y: 140 },
  running: { x: 170, y: 230 },
  succeeded: { x: 75, y: 355 },
  failed: { x: 170, y: 355 },
  cancelled: { x: 270, y: 355 },
};

const STATE_LABELS: Record<StateKey, string> = {
  queued: "queued",
  picked_up: "picked_up",
  running: "running",
  succeeded: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
};

const SVG_W = 340;
const SVG_H = 410;
const BOX_W = 132;
const BOX_H = 38;

interface Props {
  lang: Lang;
}

export default function RemoteTaskContract({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [scenarioKey, setScenarioKey] =
    useState<ScenarioKey>("happy_path");
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const scenario = useMemo(
    () =>
      SCENARIOS.find((s) => s.key === scenarioKey) ?? SCENARIOS[0],
    [scenarioKey],
  );

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    setCursor(0);
    setPlaying(false);
  }, [scenarioKey]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setCursor((c) => {
        if (c >= scenario.events.length) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 650);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, scenario]);

  const currentState: StateKey = useMemo(() => {
    if (cursor === 0) return "queued";
    return scenario.events[cursor - 1].toState;
  }, [cursor, scenario]);

  const visited = useMemo(() => {
    const set = new Set<StateKey>(["queued"]);
    for (let i = 0; i < cursor; i += 1) {
      set.add(scenario.events[i].toState);
    }
    return set;
  }, [cursor, scenario]);

  const visitedTransitions = useMemo(() => {
    const set = new Set<string>();
    let prev: StateKey = "queued";
    for (let i = 0; i < cursor; i += 1) {
      const ev = scenario.events[i];
      if (ev.toState !== prev) {
        set.add(`${prev}->${ev.toState}`);
        prev = ev.toState;
      }
    }
    return set;
  }, [cursor, scenario]);

  const dangerColor = mode === "light" ? "#b91c1c" : "#fca5a5";
  const dangerSoft =
    mode === "light"
      ? "rgba(185, 28, 28, 0.10)"
      : "rgba(252, 165, 165, 0.16)";

  const stateColor = (key: StateKey): { fg: string; bg: string } => {
    if (key === "succeeded") {
      return { fg: colors.success, bg: colors.successSoft };
    }
    if (key === "failed") return { fg: dangerColor, bg: dangerSoft };
    if (key === "cancelled") {
      return { fg: colors.warning, bg: colors.warningSoft };
    }
    if (key === "running") {
      return { fg: colors.accent, bg: colors.accentSoft };
    }
    return { fg: colors.info, bg: colors.infoSoft };
  };

  const toneColor = (tone: EventTone): string => {
    if (tone === "ok") return colors.success;
    if (tone === "warn") return colors.warning;
    if (tone === "error") return dangerColor;
    return colors.info;
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Remote task: from submit to complete"
      zhTitle="Remote task：从提交到完成"
      subtitle="Pick a scenario, then play the lifecycle. The state machine and event stream advance in lockstep."
      zhSubtitle="选择一个 scenario 并播放生命周期，状态机与 event 流会同步推进。"
      caption="The contract — task_id, capabilities, tenant, deadline, idempotency_key — is the only thing both sides share at submit time."
      zhCaption="contract（task_id、capabilities、tenant、deadline、idempotency_key）是双方在 submit 时唯一共享的载荷。"
      badge="Chapter 21"
      zhBadge="第 21 章"
    >
      <div
        role="tablist"
        aria-label={lang === "zh" ? "scenario 选择" : "scenario picker"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        {SCENARIOS.map((s) => {
          const active = s.key === scenarioKey;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={active}
              onClick={() => setScenarioKey(s.key)}
              style={{
                background: active ? colors.accent : colors.panel,
                color: active ? "#fff" : colors.text,
                border: `1px solid ${
                  active ? colors.accent : colors.border
                }`,
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{localized(lang, s.enLabel, s.zhLabel)}</span>
              <span
                style={{
                  fontSize: 10.5,
                  opacity: active ? 0.85 : 0.6,
                  fontWeight: 500,
                }}
              >
                · {localized(lang, s.enHint, s.zhHint)}
              </span>
            </button>
          );
        })}
      </div>

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
          onClick={() => {
            if (cursor >= scenario.events.length) {
              setCursor(0);
              setPlaying(true);
              return;
            }
            setPlaying(!playing);
          }}
          style={{
            background: colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {cursor >= scenario.events.length
            ? lang === "zh"
              ? "↺ 重放"
              : "↺ Replay"
            : playing
            ? lang === "zh"
              ? "⏸ 暂停"
              : "⏸ Pause"
            : lang === "zh"
            ? "▶ 播放"
            : "▶ Play"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setCursor((c) => Math.min(c + 1, scenario.events.length));
          }}
          disabled={cursor >= scenario.events.length}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor:
              cursor >= scenario.events.length ? "not-allowed" : "pointer",
            opacity: cursor >= scenario.events.length ? 0.5 : 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "下一步" : "Step"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setCursor(0);
          }}
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
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          {cursor} / {scenario.events.length}{" "}
          {lang === "zh" ? "events" : "events"}
          {" · "}
          <strong style={{ color: stateColor(currentState).fg }}>
            {STATE_LABELS[currentState]}
          </strong>
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) minmax(0, 1.1fr)",
          gap: 12,
        }}
      >
        <StateMachine
          colors={colors}
          mode={mode}
          dangerColor={dangerColor}
          dangerSoft={dangerSoft}
          currentState={currentState}
          visited={visited}
          visitedTransitions={visitedTransitions}
          lang={lang}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Pane
            title={lang === "zh" ? "事件流" : "Event stream"}
            colors={colors}
            mode={mode}
          >
            {cursor === 0 ? (
              <div
                style={{
                  padding: 14,
                  color: colors.textMuted,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
              >
                {lang === "zh"
                  ? "尚未提交。点击 ▶ 播放。"
                  : "Nothing submitted yet. Press ▶ to play."}
              </div>
            ) : null}
            {scenario.events.slice(0, cursor).map((ev, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto 1fr",
                  gap: 8,
                  alignItems: "baseline",
                  padding: "5px 8px",
                  borderRadius: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  background: `${toneColor(ev.tone)}1a`,
                  border: `1px solid ${toneColor(ev.tone)}40`,
                  color: colors.text,
                }}
              >
                <span
                  style={{
                    fontSize: 10.5,
                    color: colors.textMuted,
                    minWidth: 46,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  +{ev.at}ms
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: toneColor(ev.tone),
                    textTransform: "uppercase",
                  }}
                >
                  {ev.toState}
                </span>
                <span>{localized(lang, ev.enLabel, ev.zhLabel)}</span>
              </div>
            ))}
          </Pane>

          <Pane
            title={
              lang === "zh"
                ? "Contract（POST /v1/tasks 载荷）"
                : "Contract (POST /v1/tasks payload)"
            }
            colors={colors}
            mode={mode}
          >
            <ContractView
              colors={colors}
              contract={scenario.contract}
              lang={lang}
            />
          </Pane>
        </div>
      </div>
    </InteractiveFigure>
  );
}

function StateMachine({
  colors,
  mode,
  dangerColor,
  dangerSoft,
  currentState,
  visited,
  visitedTransitions,
  lang,
}: {
  colors: (typeof palette)["light"];
  mode: "light" | "dark";
  dangerColor: string;
  dangerSoft: string;
  currentState: StateKey;
  visited: Set<StateKey>;
  visitedTransitions: Set<string>;
  lang: Lang;
}) {
  const stateBg = (key: StateKey): string => {
    if (!visited.has(key)) return colors.track;
    if (key === "succeeded") return colors.successSoft;
    if (key === "failed") return dangerSoft;
    if (key === "cancelled") return colors.warningSoft;
    if (key === "running") return colors.accentSoft;
    return colors.infoSoft;
  };
  const stateStroke = (key: StateKey): string => {
    if (!visited.has(key)) return colors.softBorder;
    if (key === "succeeded") return colors.success;
    if (key === "failed") return dangerColor;
    if (key === "cancelled") return colors.warning;
    if (key === "running") return colors.accent;
    return colors.info;
  };

  const drawEdge = (
    from: StateKey,
    to: StateKey,
    pathD: string,
    keyStr: string,
    dashed = false,
  ) => {
    const traversed = visitedTransitions.has(`${from}->${to}`);
    const stroke = traversed ? stateStroke(to) : colors.softBorder;
    return (
      <g key={keyStr}>
        <path
          d={pathD}
          stroke={stroke}
          strokeWidth={traversed ? 2.5 : 1.5}
          strokeDasharray={dashed ? "4 4" : undefined}
          fill="none"
          markerEnd={traversed ? "url(#mm-arrow)" : "url(#mm-arrow-faint)"}
          opacity={traversed ? 1 : 0.6}
        />
      </g>
    );
  };

  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        padding: 8,
      }}
    >
      <div
        style={{
          padding: "4px 8px 8px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color: colors.accent,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {lang === "zh" ? "状态机" : "State machine"}
      </div>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        role="img"
        aria-label={
          lang === "zh"
            ? "remote task 状态机"
            : "remote task state machine"
        }
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <marker
            id="mm-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.accent} />
          </marker>
          <marker
            id="mm-arrow-faint"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.textMuted} />
          </marker>
        </defs>

        {drawEdge(
          "queued",
          "picked_up",
          `M ${STATE_POS.queued.x} ${STATE_POS.queued.y + BOX_H / 2} L ${
            STATE_POS.picked_up.x
          } ${STATE_POS.picked_up.y - BOX_H / 2 - 4}`,
          "q-pu",
        )}
        {drawEdge(
          "picked_up",
          "running",
          `M ${STATE_POS.picked_up.x} ${
            STATE_POS.picked_up.y + BOX_H / 2
          } L ${STATE_POS.running.x} ${STATE_POS.running.y - BOX_H / 2 - 4}`,
          "pu-r",
        )}
        {drawEdge(
          "running",
          "succeeded",
          `M ${STATE_POS.running.x - 28} ${
            STATE_POS.running.y + BOX_H / 2
          } L ${STATE_POS.succeeded.x + 18} ${
            STATE_POS.succeeded.y - BOX_H / 2 - 4
          }`,
          "r-s",
        )}
        {drawEdge(
          "running",
          "failed",
          `M ${STATE_POS.running.x} ${STATE_POS.running.y + BOX_H / 2} L ${
            STATE_POS.failed.x
          } ${STATE_POS.failed.y - BOX_H / 2 - 4}`,
          "r-f",
        )}
        {drawEdge(
          "running",
          "cancelled",
          `M ${STATE_POS.running.x + 28} ${
            STATE_POS.running.y + BOX_H / 2
          } L ${STATE_POS.cancelled.x - 18} ${
            STATE_POS.cancelled.y - BOX_H / 2 - 4
          }`,
          "r-c",
        )}
        {drawEdge(
          "queued",
          "failed",
          `M ${STATE_POS.queued.x + BOX_W / 2 - 6} ${
            STATE_POS.queued.y
          } C 320 110, 310 320, ${STATE_POS.failed.x + BOX_W / 2 - 8} ${
            STATE_POS.failed.y - 4
          }`,
          "q-f",
          true,
        )}
        {drawEdge(
          "running",
          "queued",
          `M ${STATE_POS.running.x - BOX_W / 2 + 6} ${
            STATE_POS.running.y
          } C 20 180, 20 110, ${STATE_POS.queued.x - BOX_W / 2 + 8} ${
            STATE_POS.queued.y + 4
          }`,
          "r-q",
          true,
        )}

        {(Object.keys(STATE_POS) as StateKey[]).map((key) => {
          const pos = STATE_POS[key];
          const isCurrent = key === currentState;
          const fg = stateStroke(key);
          const bg = stateBg(key);
          return (
            <g key={key}>
              {isCurrent ? (
                <rect
                  x={pos.x - BOX_W / 2 - 4}
                  y={pos.y - BOX_H / 2 - 4}
                  width={BOX_W + 8}
                  height={BOX_H + 8}
                  rx={10}
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth={2}
                  opacity={0.55}
                />
              ) : null}
              <rect
                x={pos.x - BOX_W / 2}
                y={pos.y - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx={8}
                fill={bg}
                stroke={fg}
                strokeWidth={isCurrent ? 2.5 : 1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize={13}
                fontFamily="var(--font-mono)"
                fontWeight={700}
                fill={fg}
              >
                {STATE_LABELS[key]}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          padding: "6px 8px 2px",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: colors.textMuted,
        }}
      >
        {lang === "zh"
          ? "虚线：异常路径（deadline 超时 / retry 回流）"
          : "Dashed: exception paths (deadline timeout / retry loop-back)"}
      </div>
    </div>
  );
}

function ContractView({
  colors,
  contract,
  lang,
}: {
  colors: (typeof palette)["light"];
  contract: Scenario["contract"];
  lang: Lang;
}) {
  const k = (s: string) => (
    <span style={{ color: colors.accent }}>&quot;{s}&quot;</span>
  );
  const v = (s: string, isString = true) => (
    <span style={{ color: colors.info }}>
      {isString ? `"${s}"` : s}
    </span>
  );
  return (
    <div
      style={{
        padding: "10px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.7,
        color: colors.text,
        background: colors.panel,
      }}
    >
      <div style={{ color: colors.textMuted }}>
        {lang === "zh" ? "// 客户端 → 服务端" : "// client → server"}
      </div>
      <div>{"{"}</div>
      <div style={{ paddingLeft: 16 }}>
        {k("task_id")}: {v(contract.task_id)},
      </div>
      <div style={{ paddingLeft: 16 }}>
        {k("capabilities")}:{" "}
        <span style={{ color: colors.info }}>
          [{contract.capabilities.map((c) => `"${c}"`).join(", ")}]
        </span>
        ,
      </div>
      <div style={{ paddingLeft: 16 }}>
        {k("tenant")}: {v(contract.tenant)},
      </div>
      <div style={{ paddingLeft: 16 }}>
        {k("deadline")}: {v(contract.deadline)},
      </div>
      <div style={{ paddingLeft: 16 }}>
        {k("idempotency_key")}: {v(contract.idempotency_key)}
      </div>
      <div>{"}"}</div>
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
  colors: (typeof palette)["light"];
  mode: "light" | "dark";
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
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxHeight: 320,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
