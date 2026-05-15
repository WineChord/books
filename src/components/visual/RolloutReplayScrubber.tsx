import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type EventKind =
  | "session_start"
  | "context"
  | "user"
  | "assistant"
  | "tool_call"
  | "tool_output"
  | "checkpoint"
  | "rollback";

interface RolloutEvent {
  index: number;
  turn: number;
  kind: EventKind;
  enLabel: string;
  zhLabel: string;
  visible: boolean;
  affectsLedger: boolean;
}

const events: RolloutEvent[] = [
  {
    index: 0,
    turn: 0,
    kind: "session_start",
    enLabel: "session begins · base instructions stored",
    zhLabel: "session 开始 · base instructions 已存储",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 1,
    turn: 1,
    kind: "context",
    enLabel: "context: cwd=/repo, sandbox=workspace-write",
    zhLabel: "context：cwd=/repo, sandbox=workspace-write",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 2,
    turn: 1,
    kind: "user",
    enLabel: "user: outline retry strategy",
    zhLabel: "user：列出 retry 策略",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 3,
    turn: 1,
    kind: "assistant",
    enLabel: "assistant: 5-step plan",
    zhLabel: "assistant：5 步计划",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 4,
    turn: 2,
    kind: "tool_call",
    enLabel: "tool_call(read_file backoff.rs)",
    zhLabel: "tool_call(read_file backoff.rs)",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 5,
    turn: 2,
    kind: "tool_output",
    enLabel: "tool_output(120 lines)",
    zhLabel: "tool_output(120 行)",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 6,
    turn: 2,
    kind: "checkpoint",
    enLabel: "compaction summary installed (turns 0..2)",
    zhLabel: "compaction 摘要安装（turns 0..2）",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 7,
    turn: 3,
    kind: "user",
    enLabel: "user: switch to exponential backoff",
    zhLabel: "user：改用 exponential backoff",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 8,
    turn: 3,
    kind: "assistant",
    enLabel: "assistant: drafting changes",
    zhLabel: "assistant：草拟修改",
    visible: true,
    affectsLedger: true,
  },
  {
    index: 9,
    turn: 4,
    kind: "rollback",
    enLabel: "rollback to turn 3 (reject draft)",
    zhLabel: "rollback 到 turn 3（拒绝草稿）",
    visible: true,
    affectsLedger: false,
  },
  {
    index: 10,
    turn: 4,
    kind: "user",
    enLabel: "user: reroute to retry-with-jitter",
    zhLabel: "user：改用 retry-with-jitter",
    visible: true,
    affectsLedger: true,
  },
];

interface Props {
  lang: Lang;
}

export default function RolloutReplayScrubber({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [scrubIndex, setScrubIndex] = useState(events.length);

  const ledger = useMemo(() => reconstruct(events.slice(0, scrubIndex)), [
    scrubIndex,
  ]);

  const eventColor: Record<EventKind, string> = {
    session_start: colors.info,
    context: colors.info,
    user: colors.success,
    assistant: colors.accent,
    tool_call: colors.warning,
    tool_output: colors.warning,
    checkpoint: mode === "light" ? "#6d28d9" : "#c4b5fd",
    rollback: mode === "light" ? "#b91c1c" : "#fca5a5",
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Rollout reconstruction is reverse-scan plus replay"
      zhTitle="Rollout reconstruction 是反向扫描 + 顺序回放"
      subtitle="Drag the scrubber to a turn. The right pane shows the ledger reconstruction would build."
      zhSubtitle="拖动 scrubber 到某个 turn，右侧显示 reconstruction 重建出的 ledger。"
      caption="Rollback removes the rolled-back items from the model-visible ledger but stays in the durable rollout for audit."
      zhCaption="Rollback 会从模型可见的 ledger 中移除被回滚项；durable rollout 仍保留它们以便审计。"
      badge="Chapter 7"
      zhBadge="第 7 章"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <label
          htmlFor="ccm-rollout-scrub"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: colors.textMuted,
            fontWeight: 600,
          }}
        >
          {lang === "zh" ? "回放进度" : "Replay through"}
        </label>
        <input
          id="ccm-rollout-scrub"
          type="range"
          min={0}
          max={events.length}
          step={1}
          value={scrubIndex}
          onChange={(event) => setScrubIndex(Number(event.target.value))}
          style={{ flex: 1, accentColor: colors.accent, minWidth: 200 }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 700,
            color: colors.accent,
            minWidth: 110,
            textAlign: "right",
          }}
        >
          {scrubIndex} / {events.length}{" "}
          <span style={{ color: colors.textMuted, fontSize: 10 }}>events</span>
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 12,
        }}
      >
        <Pane
          title={
            lang === "zh"
              ? "Rollout（来源 jsonl）"
              : "Rollout (source jsonl)"
          }
          colors={colors}
          mode={mode}
        >
          {events.map((event) => {
            const within = event.index < scrubIndex;
            return (
              <div
                key={event.index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 8,
                  padding: "5px 8px",
                  borderRadius: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  background: within
                    ? `${eventColor[event.kind]}1a`
                    : "transparent",
                  color: within ? colors.text : colors.textMuted,
                  border: `1px solid ${
                    within ? eventColor[event.kind] + "40" : "transparent"
                  }`,
                  opacity: within ? 1 : 0.4,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: eventColor[event.kind],
                    fontWeight: 700,
                  }}
                >
                  T{event.turn}·{event.kind}
                </span>
                <span>{localized(lang, event.enLabel, event.zhLabel)}</span>
              </div>
            );
          })}
        </Pane>

        <Pane
          title={
            lang === "zh"
              ? "Reconstructed ledger（model-visible）"
              : "Reconstructed ledger (model-visible)"
          }
          colors={colors}
          mode={mode}
        >
          {ledger.length === 0 ? (
            <div
              style={{
                padding: 16,
                color: colors.textMuted,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
            >
              {lang === "zh" ? "暂无可见条目" : "No visible items yet"}
            </div>
          ) : null}
          {ledger.map((event) => (
            <div
              key={event.index}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 8,
                padding: "5px 8px",
                borderRadius: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                background: `${eventColor[event.kind]}1a`,
                color: colors.text,
                border: `1px solid ${eventColor[event.kind]}40`,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: eventColor[event.kind],
                  fontWeight: 700,
                }}
              >
                T{event.turn}·{event.kind}
              </span>
              <span>{localized(lang, event.enLabel, event.zhLabel)}</span>
            </div>
          ))}
        </Pane>
      </div>
    </InteractiveFigure>
  );
}

function reconstruct(slice: RolloutEvent[]): RolloutEvent[] {
  let result: RolloutEvent[] = [];
  let baselineIndex = 0;
  for (let i = 0; i < slice.length; i += 1) {
    const event = slice[i];
    if (event.kind === "rollback") {
      const targetTurn = event.turn - 1;
      result = result.filter((entry) => entry.turn <= targetTurn);
      continue;
    }
    if (event.kind === "checkpoint") {
      result = result.filter((entry) => entry.turn > event.turn);
      result.unshift(event);
      baselineIndex = result.length;
      continue;
    }
    result.push(event);
  }
  return result;
}

function Pane({
  title,
  children,
  colors,
  mode,
}: {
  title: string;
  children: React.ReactNode;
  colors: ReturnType<typeof palette.light extends infer T ? () => T : never> &
    typeof palette.light;
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
