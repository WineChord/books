import React, { useEffect, useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type IntentKey = "user_input" | "exec_approval" | "interrupt" | "compact";

type Tone = "info" | "success" | "warning" | "accent";

interface EventVariant {
  name: string;
  enTooltip: string;
  zhTooltip: string;
  tone: Tone;
}

interface Intent {
  key: IntentKey;
  enLabel: string;
  zhLabel: string;
  enSummary: string;
  zhSummary: string;
  payload: string;
  events: EventVariant[];
}

const intents: Intent[] = [
  {
    key: "user_input",
    enLabel: "user_input",
    zhLabel: "user_input",
    enSummary: "Apply patch to login.rs",
    zhSummary: "对 login.rs 应用补丁",
    payload: `{
  "id": "S-001",
  "op": {
    "type": "user_input",
    "items": [
      { "type": "text",
        "text": "Apply patch to login.rs" }
    ]
  }
}`,
    events: [
      {
        name: "TaskStarted",
        enTooltip: "Runtime announces a new turn has begun.",
        zhTooltip: "运行时宣告新的 turn 已开始。",
        tone: "info",
      },
      {
        name: "AgentMessageDelta",
        enTooltip: "Streaming token chunks while the model thinks.",
        zhTooltip: "模型生成时持续推流的 token 增量。",
        tone: "accent",
      },
      {
        name: "AgentMessage",
        enTooltip: "Final assistant message for this turn.",
        zhTooltip: "本 turn 最终的 assistant 消息。",
        tone: "success",
      },
      {
        name: "TurnDiff",
        enTooltip: "Aggregated file diff produced during the turn.",
        zhTooltip: "本 turn 聚合产生的文件 diff。",
        tone: "warning",
      },
    ],
  },
  {
    key: "exec_approval",
    enLabel: "exec_approval",
    zhLabel: "exec_approval",
    enSummary: "Approve a queued shell tool",
    zhSummary: "批准队列中的 shell 工具",
    payload: `{
  "id": "S-002",
  "op": {
    "type": "exec_approval",
    "id": "call-shell-7f3a",
    "decision": "approved_for_session"
  }
}`,
    events: [
      {
        name: "ExecCommandBegin",
        enTooltip: "The runtime starts running the approved command.",
        zhTooltip: "运行时开始执行被批准的命令。",
        tone: "info",
      },
      {
        name: "ExecCommandOutputDelta",
        enTooltip: "Streaming stdout/stderr chunks from the child process.",
        zhTooltip: "子进程的 stdout/stderr 推流增量。",
        tone: "accent",
      },
      {
        name: "ExecCommandEnd",
        enTooltip: "Final exit code, duration and trailing output.",
        zhTooltip: "最终的 exit code、耗时与剩余输出。",
        tone: "success",
      },
    ],
  },
  {
    key: "interrupt",
    enLabel: "interrupt",
    zhLabel: "interrupt",
    enSummary: "Cancel the in-flight turn",
    zhSummary: "取消正在进行的 turn",
    payload: `{
  "id": "S-003",
  "op": { "type": "interrupt" }
}`,
    events: [
      {
        name: "TurnAborted",
        enTooltip: "Runtime confirms the turn was cancelled mid-flight.",
        zhTooltip: "运行时确认 turn 在中途被取消。",
        tone: "warning",
      },
      {
        name: "Error",
        enTooltip: "Optional error if cancellation came too late.",
        zhTooltip: "可选错误：取消请求来得太晚时上报。",
        tone: "info",
      },
      {
        name: "TaskComplete",
        enTooltip: "Turn lifecycle closes even on abort.",
        zhTooltip: "即便中止，turn 生命周期仍正常收尾。",
        tone: "success",
      },
    ],
  },
  {
    key: "compact",
    enLabel: "compact",
    zhLabel: "compact",
    enSummary: "Request a manual compaction",
    zhSummary: "请求一次手动 compaction",
    payload: `{
  "id": "S-004",
  "op": { "type": "compact" }
}`,
    events: [
      {
        name: "TaskStarted",
        enTooltip: "Compaction starts inside a synthetic turn.",
        zhTooltip: "compaction 在合成 turn 内启动。",
        tone: "info",
      },
      {
        name: "AgentMessage",
        enTooltip: "Summary text installed back into the rollout.",
        zhTooltip: "总结文本被写回 rollout。",
        tone: "accent",
      },
      {
        name: "TaskComplete",
        enTooltip: "Compaction turn closes; ledger now points at the summary.",
        zhTooltip: "compaction turn 收尾；ledger 切换到摘要项。",
        tone: "success",
      },
    ],
  },
];

interface Stage {
  key: string;
  enLabel: string;
  zhLabel: string;
  enSub: string;
  zhSub: string;
}

const stages: Stage[] = [
  {
    key: "client",
    enLabel: "Client surface",
    zhLabel: "客户端表面",
    enSub: "TUI / app-server / SDK",
    zhSub: "TUI / app-server / SDK",
  },
  {
    key: "submission",
    enLabel: "Submission",
    zhLabel: "Submission",
    enSub: "{ id, op }",
    zhSub: "{ id, op }",
  },
  {
    key: "queue",
    enLabel: "Runtime queue",
    zhLabel: "运行时队列",
    enSub: "session.next_op",
    zhSub: "session.next_op",
  },
  {
    key: "handler",
    enLabel: "Op handler",
    zhLabel: "Op handler",
    enSub: "match op { ... }",
    zhSub: "match op { ... }",
  },
  {
    key: "event",
    enLabel: "Event",
    zhLabel: "Event",
    enSub: "{ id, msg }",
    zhSub: "{ id, msg }",
  },
  {
    key: "subscribers",
    enLabel: "Subscribers",
    zhLabel: "订阅者",
    enSub: "TUI / app-server / SDK",
    zhSub: "TUI / app-server / SDK",
  },
];

interface Props {
  lang: Lang;
}

export default function SubmissionFlowExplorer({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [active, setActive] = useState<IntentKey>("user_input");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activeIntent = useMemo(
    () => intents.find((intent) => intent.key === active) ?? intents[0],
    [active],
  );

  const toneColor = (tone: Tone) => {
    switch (tone) {
      case "success":
        return { stroke: colors.success, soft: colors.successSoft };
      case "warning":
        return { stroke: colors.warning, soft: colors.warningSoft };
      case "info":
        return { stroke: colors.info, soft: colors.infoSoft };
      case "accent":
      default:
        return { stroke: colors.accent, soft: colors.accentSoft };
    }
  };

  // SVG flow geometry: six stages laid out horizontally.
  const stageWidth = 104;
  const stageHeight = 64;
  const centers = stages.map((_, index) => 60 + index * 120);
  const flowY = 90;
  const startX = centers[0] + stageWidth / 2;
  const endX = centers[centers.length - 1] - stageWidth / 2;

  return (
    <InteractiveFigure
      lang={lang}
      title="From client intent to durable event"
      zhTitle="从客户意图到持久 event"
      subtitle="Pick an intent. Watch how Submission/Op crosses into the runtime and what Event variants flow back."
      zhSubtitle="选择一个意图，观察 Submission/Op 如何越过边界进入运行时，以及哪些 Event 变体回流。"
      caption="The protocol boundary is small on purpose: every client speaks the same Submission/Op in, Event/EventMsg out."
      zhCaption="协议边界刻意保持紧凑：每个客户端都用相同的 Submission/Op 进、Event/EventMsg 出。"
      badge="Chapter 4"
      zhBadge="第 4 章"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {intents.map((intent) => {
          const isActive = intent.key === active;
          return (
            <button
              key={intent.key}
              onClick={() => setActive(intent.key)}
              aria-pressed={isActive}
              style={{
                padding: "8px 12px",
                borderRadius: 9,
                border: `1.5px solid ${
                  isActive ? colors.accent : colors.softBorder
                }`,
                background: isActive ? colors.accentSoft : colors.panel,
                color: isActive ? colors.accentHover : colors.text,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                minWidth: 150,
                textAlign: "left",
              }}
            >
              <span style={{ color: colors.accent }}>{intent.enLabel}</span>
              <span
                style={{
                  fontFamily: "var(--font-sans, inherit)",
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: colors.textMuted,
                }}
              >
                {localized(lang, intent.enSummary, intent.zhSummary)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 12,
          background: colors.background,
          padding: 12,
          marginBottom: 14,
        }}
      >
        <svg
          viewBox="0 0 720 180"
          width="100%"
          height="auto"
          role="img"
          aria-label={
            lang === "zh"
              ? "Submission 在六个阶段之间流动的横向示意图"
              : "Horizontal flow of a Submission across six stages"
          }
        >
          <defs>
            <marker
              id="sfe-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerUnits="strokeWidth"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={colors.accent} />
            </marker>
            <linearGradient id="sfe-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={colors.accent} stopOpacity="0.05" />
              <stop offset="0.5" stopColor={colors.accent} stopOpacity="0.55" />
              <stop offset="1" stopColor={colors.accent} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect
            x={startX - 4}
            y={flowY - 1.5}
            width={endX - startX + 8}
            height={3}
            rx={1.5}
            fill="url(#sfe-flow)"
          />

          {stages.map((stage, index) => {
            const cx = centers[index];
            const x = cx - stageWidth / 2;
            const y = flowY - stageHeight / 2;
            const isBoundary =
              stage.key === "submission" || stage.key === "event";
            return (
              <g key={stage.key}>
                <rect
                  x={x}
                  y={y}
                  width={stageWidth}
                  height={stageHeight}
                  rx={9}
                  fill={isBoundary ? colors.accentSoft : colors.panel}
                  stroke={isBoundary ? colors.accent : colors.softBorder}
                  strokeWidth={isBoundary ? 1.6 : 1.2}
                />
                <text
                  x={cx}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill={isBoundary ? colors.accent : colors.text}
                  fontFamily="var(--font-sans, inherit)"
                >
                  {localized(lang, stage.enLabel, stage.zhLabel)}
                </text>
                <text
                  x={cx}
                  y={y + 42}
                  textAnchor="middle"
                  fontSize={10}
                  fill={colors.textMuted}
                  fontFamily="var(--font-mono)"
                >
                  {localized(lang, stage.enSub, stage.zhSub)}
                </text>
              </g>
            );
          })}

          {stages.slice(0, -1).map((_, index) => {
            const x1 = centers[index] + stageWidth / 2;
            const x2 = centers[index + 1] - stageWidth / 2;
            return (
              <line
                key={`edge-${index}`}
                x1={x1}
                y1={flowY}
                x2={x2}
                y2={flowY}
                stroke={colors.accent}
                strokeWidth={1.6}
                opacity={0.85}
                markerEnd="url(#sfe-arrow)"
              />
            );
          })}

          <text
            x={(centers[1] + centers[2]) / 2}
            y={flowY - 36}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={colors.accent}
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            {lang === "zh" ? "→ 客户 → 运行时" : "→ client → runtime"}
          </text>
          <text
            x={(centers[3] + centers[4]) / 2}
            y={flowY + 50}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={colors.success}
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            {lang === "zh" ? "← 运行时 → 客户" : "← runtime → client"}
          </text>

          {!reduceMotion ? (
            <circle
              key={active}
              cx={startX}
              cy={flowY}
              r={5}
              fill={colors.accent}
              opacity={0.9}
            >
              <animate
                attributeName="cx"
                values={`${startX};${endX}`}
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.95;0.2"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          ) : null}
        </svg>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 12,
        }}
      >
        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 12,
            overflow: "hidden",
            background: colors.background,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              borderBottom: `1px solid ${colors.softBorder}`,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color: colors.accent,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background:
                mode === "light"
                  ? "linear-gradient(180deg, #f5f1e2 0%, #fdfaf2 100%)"
                  : "linear-gradient(180deg, #2c2b29 0%, #1f1f1d 100%)",
            }}
          >
            {lang === "zh"
              ? "Submission 载荷（伪 JSON）"
              : "Submission payload (pseudo JSON)"}
          </div>
          <pre
            style={{
              margin: 0,
              padding: "12px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              lineHeight: 1.55,
              color: colors.text,
              background: "transparent",
              whiteSpace: "pre",
              overflowX: "auto",
            }}
          >
            <code>{activeIntent.payload}</code>
          </pre>
        </div>

        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 12,
            background: colors.background,
            padding: "10px 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color: colors.success,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {lang === "zh"
              ? "回流的 Event.msg 变体"
              : "Event.msg variants returned"}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {activeIntent.events.map((variant) => {
              const tone = toneColor(variant.tone);
              return (
                <span
                  key={variant.name}
                  title={localized(
                    lang,
                    variant.enTooltip,
                    variant.zhTooltip,
                  )}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 999,
                    border: `1px solid ${tone.stroke}`,
                    background: tone.soft,
                    color: tone.stroke,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "help",
                    whiteSpace: "nowrap",
                  }}
                >
                  EventMsg::{variant.name}
                </span>
              );
            })}
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              color: colors.text,
              fontSize: "0.85rem",
              lineHeight: 1.55,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {activeIntent.events.map((variant) => (
              <li key={variant.name}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: toneColor(variant.tone).stroke,
                    fontWeight: 700,
                  }}
                >
                  {variant.name}
                </span>
                <span style={{ color: colors.textMuted }}>
                  {" \u2014 "}
                  {localized(lang, variant.enTooltip, variant.zhTooltip)}
                </span>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: "auto",
              paddingTop: 8,
              borderTop: `1px dashed ${colors.softBorder}`,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>
              {lang === "zh" ? "源码：" : "source:"} protocol/protocol.rs
            </span>
            <span style={{ color: colors.accent, fontWeight: 700 }}>
              {lang === "zh"
                ? "悬停 chip 查看说明"
                : "hover a chip for detail"}
            </span>
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}
