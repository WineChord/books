import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

interface Lane {
  key: string;
  enLabel: string;
  zhLabel: string;
  baseTokens: number;
  truncatable: boolean;
  enRule: string;
  zhRule: string;
  color: string;
}

const lanes: Lane[] = [
  {
    key: "history",
    enLabel: "Conversation history",
    zhLabel: "对话历史",
    baseTokens: 28000,
    truncatable: false,
    enRule: "Compaction installs a checkpoint, never simply trimmed.",
    zhRule: "通过 compaction 安装 checkpoint，不直接裁剪。",
    color: "#fbbf24",
  },
  {
    key: "skills",
    enLabel: "Skills + plugins",
    zhLabel: "Skills 与 plugins",
    baseTokens: 4200,
    truncatable: true,
    enRule: "Drop least-recently-relevant first; deterministic order.",
    zhRule: "优先删除最久未相关的项；保持确定性顺序。",
    color: "#bef264",
  },
  {
    key: "memory",
    enLabel: "Memory snippets",
    zhLabel: "Memory 摘要",
    baseTokens: 1800,
    truncatable: true,
    enRule: "Recall is ranked; lowest scoring snippets drop first.",
    zhRule: "Recall 已排序；分值最低的先丢弃。",
    color: "#7dd3fc",
  },
  {
    key: "tools",
    enLabel: "Tool outputs",
    zhLabel: "Tool 输出",
    baseTokens: 12500,
    truncatable: true,
    enRule: "Truncated at insertion; rollout still has the full payload.",
    zhRule: "在插入时即截断；rollout 中保留完整 payload。",
    color: "#fb923c",
  },
  {
    key: "images",
    enLabel: "Images",
    zhLabel: "图片",
    baseTokens: 4500,
    truncatable: true,
    enRule: "Per-turn budget; oldest non-essential images drop.",
    zhRule: "每个 turn 都有图片预算；优先丢弃最旧的非必要图片。",
    color: "#fca5a5",
  },
];

interface Props {
  lang: Lang;
}

export default function BudgetSimulator({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [budget, setBudget] = useState(40000);

  const result = useMemo(() => allocate(budget), [budget]);
  const totalBase = lanes.reduce((sum, lane) => sum + lane.baseTokens, 0);

  return (
    <InteractiveFigure
      lang={lang}
      title="One window, many budgeted lanes"
      zhTitle="一个 prompt 窗口，多条受预算约束的 lane"
      subtitle="Move the slider to set a smaller window. Watch which lanes truncate first."
      zhSubtitle="拖动滑块缩小窗口，看哪些 lane 先被截断。"
      caption="Each lane has its own truncation policy. History never silently drops — only compaction can replace it."
      zhCaption="每条 lane 都有自己的截断策略；历史从不静默丢失，只能由 compaction 替换。"
      badge="Chapter 5"
      zhBadge="第 5 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            padding: 10,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
          }}
        >
          <label
            htmlFor="ccm-budget-slider"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: colors.textMuted,
              fontWeight: 600,
            }}
          >
            {lang === "zh" ? "Prompt 窗口预算" : "Prompt window budget"}
          </label>
          <input
            id="ccm-budget-slider"
            type="range"
            min={6000}
            max={totalBase + 4000}
            step={500}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            style={{ flex: 1, accentColor: colors.accent, minWidth: 160 }}
          />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 14,
              color: colors.accent,
              fontVariantNumeric: "tabular-nums",
              minWidth: 80,
              textAlign: "right",
            }}
          >
            {budget.toLocaleString()}{" "}
            <span style={{ fontSize: 10, color: colors.textMuted }}>
              {lang === "zh" ? "tokens" : "tokens"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {result.lanes.map((lane) => {
            const original = lanes.find((entry) => entry.key === lane.key)!;
            const ratio = lane.allocated / original.baseTokens;
            const droppedRatio = 1 - ratio;
            return (
              <div
                key={lane.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 200px) 1fr auto",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: colors.text,
                    }}
                  >
                    {localized(lang, original.enLabel, original.zhLabel)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      color: original.truncatable
                        ? colors.warning
                        : colors.success,
                    }}
                  >
                    {original.truncatable
                      ? lang === "zh"
                        ? "可截断"
                        : "truncatable"
                      : lang === "zh"
                      ? "受 checkpoint 保护"
                      : "checkpoint-protected"}
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    height: 22,
                    background: colors.track,
                    borderRadius: 6,
                    overflow: "hidden",
                    border: `1px solid ${colors.softBorder}`,
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${Math.min(100, ratio * 100)}%`,
                      background: original.color,
                      transition: "width 0.3s ease",
                    }}
                  />
                  {droppedRatio > 0.001 ? (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: `${droppedRatio * 100}%`,
                        background:
                          mode === "light"
                            ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0 4px, transparent 4px 8px)"
                            : "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 4px, transparent 4px 8px)",
                      }}
                    />
                  ) : null}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: colors.text,
                    minWidth: 130,
                    textAlign: "right",
                  }}
                >
                  {lane.allocated.toLocaleString()} /{" "}
                  <span style={{ color: colors.textMuted }}>
                    {original.baseTokens.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            padding: 10,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: colors.textMuted,
          }}
        >
          <span>
            {lang === "zh" ? "已分配" : "allocated"}{" "}
            <strong style={{ color: colors.text }}>
              {result.allocated.toLocaleString()}
            </strong>
          </span>
          <span>
            {lang === "zh" ? "已截断" : "truncated"}{" "}
            <strong style={{ color: colors.warning }}>
              {result.truncated.toLocaleString()}
            </strong>
          </span>
          <span>
            {lang === "zh" ? "余量" : "headroom"}{" "}
            <strong style={{ color: colors.success }}>
              {result.headroom.toLocaleString()}
            </strong>
          </span>
        </div>

        <div
          style={{
            padding: 10,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
            background: colors.panel,
            fontSize: 12.5,
            color: colors.text,
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: colors.accent }}>
            {lang === "zh" ? "策略说明：" : "Policy notes:"}
          </strong>{" "}
          {lang === "zh"
            ? "可截断 lane 按各自的策略丢弃；history 不在此处截断，必须由 compaction 替换。"
            : "Truncatable lanes drop by their own policy. History is never silently trimmed — only compaction can replace it."}
        </div>
      </div>
    </InteractiveFigure>
  );
}

function allocate(budget: number) {
  const order = ["history", "skills", "memory", "tools", "images"];
  const minimums: Record<string, number> = {
    history: 6000,
    skills: 200,
    memory: 0,
    tools: 800,
    images: 0,
  };

  let remaining = budget;
  const allocations = new Map<string, number>();
  for (const key of order) {
    const min = minimums[key];
    if (min > 0) {
      const give = Math.min(min, remaining);
      allocations.set(key, give);
      remaining -= give;
    } else {
      allocations.set(key, 0);
    }
  }

  for (const lane of lanes) {
    if (remaining <= 0) break;
    const allocated = allocations.get(lane.key) ?? 0;
    const room = lane.baseTokens - allocated;
    if (room <= 0) continue;
    const give = Math.min(room, remaining);
    allocations.set(lane.key, allocated + give);
    remaining -= give;
  }

  const result = lanes.map((lane) => ({
    key: lane.key,
    allocated: allocations.get(lane.key) ?? 0,
  }));
  const allocated = result.reduce((sum, lane) => sum + lane.allocated, 0);
  const baseTotal = lanes.reduce((sum, lane) => sum + lane.baseTokens, 0);
  const truncated = Math.max(0, baseTotal - allocated);
  const headroom = Math.max(0, budget - allocated);
  return { lanes: result, allocated, truncated, headroom };
}
