import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

interface MainStep {
  key: string;
  enLabel: string;
  zhLabel: string;
  shortLabel: string;
  activateTick: number;
}

interface SideStep {
  key: string;
  enLabel: string;
  zhLabel: string;
  shortLabel: string;
  activateTick: number;
  ratio: number;
}

interface MemoryItem {
  id: string;
  score: number;
  enText: string;
  zhText: string;
}

const MAIN_STEPS: MainStep[] = [
  {
    key: "receive_user",
    enLabel: "receive_user",
    zhLabel: "receive_user",
    shortLabel: "receive",
    activateTick: 1,
  },
  {
    key: "parse_intent",
    enLabel: "parse_intent",
    zhLabel: "parse_intent",
    shortLabel: "parse",
    activateTick: 3,
  },
  {
    key: "resolve_context",
    enLabel: "resolve_context",
    zhLabel: "resolve_context",
    shortLabel: "resolve",
    activateTick: 7,
  },
  {
    key: "plan",
    enLabel: "plan",
    zhLabel: "plan",
    shortLabel: "plan",
    activateTick: 8,
  },
  {
    key: "select_tools",
    enLabel: "select_tools",
    zhLabel: "select_tools",
    shortLabel: "tools",
    activateTick: 9,
  },
  {
    key: "call_model",
    enLabel: "call_model",
    zhLabel: "call_model",
    shortLabel: "call",
    activateTick: 10,
  },
  {
    key: "stream_tokens",
    enLabel: "stream_tokens",
    zhLabel: "stream_tokens",
    shortLabel: "stream",
    activateTick: 11,
  },
  {
    key: "apply_actions",
    enLabel: "apply_actions",
    zhLabel: "apply_actions",
    shortLabel: "apply",
    activateTick: 12,
  },
  {
    key: "emit_response",
    enLabel: "emit_response",
    zhLabel: "emit_response",
    shortLabel: "emit",
    activateTick: 13,
  },
];

const SIDE_STEPS: SideStep[] = [
  {
    key: "gather_candidates",
    enLabel: "gather_candidates",
    zhLabel: "gather_candidates",
    shortLabel: "gather",
    activateTick: 2,
    ratio: 0.4,
  },
  {
    key: "sonnet_scoring",
    enLabel: "sonnet_scoring",
    zhLabel: "Sonnet 侧打分",
    shortLabel: "score",
    activateTick: 3,
    ratio: 0.85,
  },
  {
    key: "rank",
    enLabel: "rank",
    zhLabel: "rank",
    shortLabel: "rank",
    activateTick: 4,
    ratio: 1.3,
  },
  {
    key: "truncate_to_budget",
    enLabel: "truncate_to_budget",
    zhLabel: "按预算截断",
    shortLabel: "trunc",
    activateTick: 5,
    ratio: 1.7,
  },
  {
    key: "emit_selected",
    enLabel: "emit_selected",
    zhLabel: "emit_selected",
    shortLabel: "emit",
    activateTick: 6,
    ratio: 2.05,
  },
];

const MEMORIES: MemoryItem[] = [
  {
    id: "m1",
    score: 0.94,
    enText: "user prefers concise replies, prose over bullets",
    zhText: "user 偏好简洁回复，散文优于 bullet list",
  },
  {
    id: "m2",
    score: 0.87,
    enText: "project uses pnpm, not npm or yarn",
    zhText: "项目使用 pnpm，而非 npm 或 yarn",
  },
  {
    id: "m3",
    score: 0.79,
    enText: "commit subject lines must stay under 50 chars",
    zhText: "commit subject 必须保持在 50 字以内",
  },
  {
    id: "m4",
    score: 0.62,
    enText: "do not regress TypeScript strict-mode flags",
    zhText: "禁止回退 TypeScript strict-mode 配置",
  },
  {
    id: "m5",
    score: 0.43,
    enText: "user dislikes emoji in PR descriptions",
    zhText: "user 不喜欢 PR 描述里出现 emoji",
  },
  {
    id: "m6",
    score: 0.31,
    enText: "last week's CI flake notes for the auth job",
    zhText: "上周 auth job 的 CI flake 记录",
  },
  {
    id: "m7",
    score: 0.18,
    enText: "sibling repo runs a nightly mirror push",
    zhText: "兄弟仓库会做 nightly mirror push",
  },
];

const BUDGET = 4;
const TOTAL_TICKS = 13;
const MERGE_TARGET_INDEX = 2;

const SVG_W = 820;
const SVG_H = 280;
const PAD_X = 50;
const MAIN_Y = 90;
const SIDE_Y = 210;
const NODE_R = 18;
const STEP_W = (SVG_W - 2 * PAD_X) / 8;

interface Props {
  lang: Lang;
}

export default function MemorySideChannel({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setTick((t) => {
        if (t >= TOTAL_TICKS) {
          setPlaying(false);
          return t;
        }
        return t + 1;
      });
    }, 480);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing]);

  const selected = useMemo(
    () =>
      MEMORIES.slice().sort((a, b) => b.score - a.score).slice(0, BUDGET),
    [],
  );
  const selectedIds = useMemo(() => new Set(selected.map((m) => m.id)), [
    selected,
  ]);

  const mainXAt = (index: number) => PAD_X + index * STEP_W;
  const sideXAt = (ratio: number) => PAD_X + ratio * STEP_W;

  const mainActive = (index: number) =>
    !disabled || index !== MERGE_TARGET_INDEX
      ? tick >= MAIN_STEPS[index].activateTick
      : tick >= MAIN_STEPS[index].activateTick;
  const sideActive = (index: number) =>
    !disabled && tick >= SIDE_STEPS[index].activateTick;

  const mergeActive = !disabled && tick >= 6;
  const mergeResolved = !disabled && tick >= 7;

  const reset = () => {
    setPlaying(false);
    setTick(0);
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Memory recall as a side channel"
      zhTitle="Memory 召回作为旁路"
      subtitle="Memory recall runs in parallel with the turn loop, then merges selected items at resolve_context only."
      zhSubtitle="memory 召回与 turn loop 并行运行，仅在 resolve_context 时把入选条目并入主链路。"
      caption="The side channel never blocks the main turn. If recall is disabled or empty, resolve_context simply proceeds without the memory block."
      zhCaption="旁路永远不阻塞主链路。如果 recall 被关闭或返回空，resolve_context 会跳过 memory 区段继续往下走。"
      badge="Chapter 22"
      zhBadge="第 22 章"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => {
            if (tick >= TOTAL_TICKS) {
              setTick(0);
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
          {tick >= TOTAL_TICKS
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
            setTick((t) => Math.min(t + 1, TOTAL_TICKS));
          }}
          disabled={tick >= TOTAL_TICKS}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: tick >= TOTAL_TICKS ? "not-allowed" : "pointer",
            opacity: tick >= TOTAL_TICKS ? 0.5 : 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "下一步" : "Step"}
        </button>
        <button
          onClick={reset}
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
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: colors.text,
            cursor: "pointer",
            background: disabled ? colors.warningSoft : colors.panel,
            border: `1px solid ${disabled ? colors.warning : colors.border}`,
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            style={{ accentColor: colors.warning }}
          />
          {lang === "zh" ? "关闭 memory" : "Disable memory"}
        </label>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          {lang === "zh" ? "tick" : "tick"} {tick} / {TOTAL_TICKS}
        </span>
      </div>

      <div
        style={{
          background: colors.background,
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 10,
          padding: 8,
        }}
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          role="img"
          aria-label={
            lang === "zh"
              ? "memory 召回旁路时间线"
              : "memory recall side-channel timeline"
          }
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <marker
              id="msc-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.accent} />
            </marker>
          </defs>

          <line
            x1={PAD_X}
            y1={MAIN_Y}
            x2={SVG_W - PAD_X}
            y2={MAIN_Y}
            stroke={colors.grid}
            strokeWidth={2}
          />
          <line
            x1={PAD_X}
            y1={SIDE_Y}
            x2={sideXAt(SIDE_STEPS[SIDE_STEPS.length - 1].ratio) + 10}
            y2={SIDE_Y}
            stroke={disabled ? colors.softBorder : colors.grid}
            strokeWidth={2}
            strokeDasharray={disabled ? "4 4" : undefined}
            opacity={disabled ? 0.45 : 1}
          />

          <text
            x={PAD_X}
            y={MAIN_Y - 40}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.accent}
            letterSpacing="0.05em"
          >
            {lang === "zh" ? "MAIN TURN" : "MAIN TURN"}
          </text>
          <text
            x={PAD_X}
            y={SIDE_Y - 40}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={disabled ? colors.textMuted : colors.info}
            letterSpacing="0.05em"
          >
            {lang === "zh" ? "SIDE CHANNEL" : "SIDE CHANNEL"}
          </text>

          {MAIN_STEPS.map((step, i) => {
            const active = mainActive(i);
            const isMerge = i === MERGE_TARGET_INDEX;
            const x = mainXAt(i);
            const color = active
              ? isMerge
                ? mergeResolved
                  ? colors.success
                  : colors.accent
                : colors.accent
              : colors.textMuted;
            const fillBg = active
              ? isMerge && mergeResolved
                ? colors.successSoft
                : colors.accentSoft
              : colors.track;
            return (
              <g key={step.key}>
                {i > 0 ? (
                  <line
                    x1={mainXAt(i - 1) + NODE_R}
                    y1={MAIN_Y}
                    x2={x - NODE_R}
                    y2={MAIN_Y}
                    stroke={mainActive(i) ? colors.accent : colors.softBorder}
                    strokeWidth={2.5}
                    opacity={mainActive(i) ? 1 : 0.5}
                  />
                ) : null}
                <circle
                  cx={x}
                  cy={MAIN_Y}
                  r={NODE_R}
                  fill={fillBg}
                  stroke={color}
                  strokeWidth={isMerge ? 2.5 : 2}
                />
                <text
                  x={x}
                  y={MAIN_Y + 5}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={color}
                >
                  {i + 1}
                </text>
                <text
                  x={x}
                  y={MAIN_Y + NODE_R + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fill={colors.text}
                >
                  {step.shortLabel}
                </text>
                {isMerge && disabled ? (
                  <g>
                    <rect
                      x={x - 38}
                      y={MAIN_Y - NODE_R - 24}
                      width={76}
                      height={16}
                      rx={8}
                      fill={colors.warningSoft}
                      stroke={colors.warning}
                    />
                    <text
                      x={x}
                      y={MAIN_Y - NODE_R - 12}
                      textAnchor="middle"
                      fontSize={9.5}
                      fontFamily="var(--font-mono)"
                      fontWeight={700}
                      fill={colors.warning}
                    >
                      {lang === "zh" ? "memory off" : "memory off"}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}

          {SIDE_STEPS.map((step, i) => {
            const active = sideActive(i);
            const x = sideXAt(step.ratio);
            const color = active ? colors.info : colors.textMuted;
            const fillBg = active
              ? colors.infoSoft
              : disabled
              ? colors.track
              : colors.track;
            return (
              <g key={step.key} opacity={disabled ? 0.45 : 1}>
                {i > 0 ? (
                  <line
                    x1={sideXAt(SIDE_STEPS[i - 1].ratio) + NODE_R - 4}
                    y1={SIDE_Y}
                    x2={x - NODE_R + 4}
                    y2={SIDE_Y}
                    stroke={active ? colors.info : colors.softBorder}
                    strokeWidth={2}
                    strokeDasharray={disabled ? "3 3" : undefined}
                    opacity={active ? 1 : 0.5}
                  />
                ) : null}
                <circle
                  cx={x}
                  cy={SIDE_Y}
                  r={NODE_R - 2}
                  fill={fillBg}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={disabled ? "3 3" : undefined}
                />
                <text
                  x={x}
                  y={SIDE_Y + 5}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={color}
                >
                  {i === 1 ? "S" : i === 4 ? "E" : ""}
                </text>
                <text
                  x={x}
                  y={SIDE_Y + NODE_R + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fill={disabled ? colors.textMuted : colors.text}
                >
                  {step.shortLabel}
                </text>
              </g>
            );
          })}

          {mergeActive ? (
            <g>
              <path
                d={`M ${sideXAt(SIDE_STEPS[4].ratio)} ${
                  SIDE_Y - NODE_R + 2
                } C ${sideXAt(SIDE_STEPS[4].ratio)} ${MAIN_Y + 60}, ${mainXAt(
                  MERGE_TARGET_INDEX,
                )} ${MAIN_Y + 60}, ${mainXAt(MERGE_TARGET_INDEX)} ${
                  MAIN_Y + NODE_R + 2
                }`}
                stroke={colors.accent}
                strokeWidth={2}
                fill="none"
                markerEnd="url(#msc-arrow)"
              />
              <text
                x={
                  (sideXAt(SIDE_STEPS[4].ratio) + mainXAt(MERGE_TARGET_INDEX)) /
                  2
                }
                y={MAIN_Y + 75}
                textAnchor="middle"
                fontSize={10.5}
                fontFamily="var(--font-mono)"
                fontWeight={700}
                fill={colors.accent}
              >
                {lang === "zh"
                  ? `inject ${BUDGET} memories`
                  : `inject ${BUDGET} memories`}
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: 12,
          marginTop: 12,
        }}
      >
        <Pane
          title={
            lang === "zh"
              ? "候选 memory（按 Sonnet 评分排序）"
              : "Candidate memories (sorted by Sonnet score)"
          }
          colors={colors}
          mode={mode}
        >
          {MEMORIES.slice()
            .sort((a, b) => b.score - a.score)
            .map((memo) => {
              const inBudget = !disabled && selectedIds.has(memo.id);
              return (
                <div
                  key={memo.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 10,
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: 7,
                    background: inBudget
                      ? colors.successSoft
                      : disabled
                      ? colors.track
                      : "transparent",
                    border: `1px solid ${
                      inBudget
                        ? colors.success
                        : disabled
                        ? colors.softBorder
                        : colors.softBorder
                    }`,
                    opacity: disabled ? 0.55 : 1,
                  }}
                >
                  <ScoreBar
                    score={memo.score}
                    colors={colors}
                    selected={inBudget}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: colors.text,
                        textDecoration: disabled ? "line-through" : undefined,
                      }}
                    >
                      {localized(lang, memo.enText, memo.zhText)}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: inBudget ? colors.success : colors.textMuted,
                        fontWeight: 700,
                      }}
                    >
                      {memo.id} · score={memo.score.toFixed(2)}
                      {inBudget
                        ? lang === "zh"
                          ? " · in prompt"
                          : " · in prompt"
                        : disabled
                        ? lang === "zh"
                          ? " · dropped (off)"
                          : " · dropped (off)"
                        : lang === "zh"
                        ? " · below budget"
                        : " · below budget"}
                    </span>
                  </div>
                </div>
              );
            })}
        </Pane>

        <Pane
          title={
            lang === "zh"
              ? "Prompt 预览（call_model 的输入）"
              : "Prompt preview (input to call_model)"
          }
          colors={colors}
          mode={mode}
        >
          <PromptPreview
            colors={colors}
            disabled={disabled}
            selected={selected}
            lang={lang}
          />
        </Pane>
      </div>
    </InteractiveFigure>
  );
}

function ScoreBar({
  score,
  colors,
  selected,
}: {
  score: number;
  colors: (typeof palette)["light"];
  selected: boolean;
}) {
  const pct = Math.max(6, Math.round(score * 100));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        minWidth: 56,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 52,
          height: 6,
          background: colors.track,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: selected ? colors.success : colors.info,
            borderRadius: 3,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 700,
          color: selected ? colors.success : colors.info,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {score.toFixed(2)}
      </span>
    </div>
  );
}

function PromptPreview({
  colors,
  disabled,
  selected,
  lang,
}: {
  colors: (typeof palette)["light"];
  disabled: boolean;
  selected: MemoryItem[];
  lang: Lang;
}) {
  const sectionStyle: React.CSSProperties = {
    padding: "5px 8px",
    borderRadius: 6,
    background: colors.panel,
    border: `1px solid ${colors.softBorder}`,
    fontFamily: "var(--font-mono)",
    fontSize: 11.5,
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };
  const headerStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.accent,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={sectionStyle}>
        <span style={headerStyle}>SYSTEM</span>
        <span style={{ color: colors.textMuted }}>
          {lang === "zh"
            ? "你是一个仔细的 coding agent…"
            : "You are a careful coding agent…"}
        </span>
      </div>
      <div style={sectionStyle}>
        <span style={headerStyle}>
          {lang === "zh" ? "对话 (上一次 turn)" : "CONVERSATION (last turn)"}
        </span>
        <span>
          {lang === "zh"
            ? "user：把 auth 流程重构一下"
            : "user: refactor the auth flow"}
        </span>
        <span style={{ color: colors.textMuted }}>
          {lang === "zh"
            ? "assistant：已经分出三个模块…"
            : "assistant: split into three modules…"}
        </span>
      </div>
      <div
        style={{
          ...sectionStyle,
          background: disabled ? colors.track : colors.successSoft,
          border: `1px ${disabled ? "dashed" : "solid"} ${
            disabled ? colors.softBorder : colors.success
          }`,
        }}
      >
        <span
          style={{
            ...headerStyle,
            color: disabled ? colors.textMuted : colors.success,
          }}
        >
          {disabled
            ? lang === "zh"
              ? "memory hits (已关闭)"
              : "MEMORY HITS (disabled)"
            : lang === "zh"
            ? `memory hits (${selected.length})`
            : `MEMORY HITS (${selected.length})`}
        </span>
        {disabled ? (
          <span
            style={{
              color: colors.textMuted,
              fontStyle: "italic",
            }}
          >
            {lang === "zh"
              ? "// 没有 memory 区段，prompt 直接进入 user turn"
              : "// no memory section; prompt jumps straight to user turn"}
          </span>
        ) : (
          selected.map((m) => (
            <span key={m.id} style={{ color: colors.text }}>
              • {localized(lang, m.enText, m.zhText)}{" "}
              <span style={{ color: colors.textMuted }}>
                ({m.score.toFixed(2)})
              </span>
            </span>
          ))
        )}
      </div>
      <div style={sectionStyle}>
        <span style={headerStyle}>
          {lang === "zh" ? "user (本次)" : "USER (this turn)"}
        </span>
        <span>
          {lang === "zh"
            ? "现在把它接到 Stripe webhook"
            : "now hook the flow into the Stripe webhook"}
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
          maxHeight: 360,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
