import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type PlaneKey = "durable" | "runtime" | "optional" | "projection";

type Plane = {
  key: PlaneKey;
  enLabel: string;
  zhLabel: string;
  enLifetime: string;
  zhLifetime: string;
  enExamples: string[];
  zhExamples: string[];
  enRule: string;
  zhRule: string;
  source: string;
};

const planes: Plane[] = [
  {
    key: "durable",
    enLabel: "Durable evidence",
    zhLabel: "持久证据",
    enLifetime: "Forever (append-only)",
    zhLifetime: "永久（仅追加）",
    enExamples: [
      "Thread rollout file (.jsonl)",
      "ResponseItem ledger entries",
      "Tool call/output protocol pairs",
    ],
    zhExamples: [
      "Thread rollout 文件（.jsonl）",
      "ResponseItem ledger 条目",
      "Tool call/output 协议对",
    ],
    enRule: "Never mutated. Reconstruction reads this to rebuild any later state.",
    zhRule: "永不变更。Reconstruction 通过读它重建后续状态。",
    source: "context_manager/history.rs",
  },
  {
    key: "runtime",
    enLabel: "Per-turn runtime",
    zhLabel: "Turn 级运行时",
    enLifetime: "One turn",
    zhLifetime: "单个 turn",
    enExamples: [
      "TurnContext envelope (model, cwd)",
      "Settings diffs vs previous turn",
      "Sandbox policy snapshot",
    ],
    zhExamples: [
      "TurnContext envelope（model、cwd）",
      "相对上一 turn 的 settings diffs",
      "Sandbox policy 快照",
    ],
    enRule: "Recomputed each turn. Diff against previous turn becomes a fragment.",
    zhRule: "每个 turn 重算。相对上一 turn 的 diff 成为 fragment。",
    source: "session/turn_context.rs",
  },
  {
    key: "optional",
    enLabel: "Budgeted optional",
    zhLabel: "受预算约束的可选项",
    enLifetime: "Until budget runs out",
    zhLifetime: "直到预算耗尽",
    enExamples: [
      "Skills, plugins, memory snippets",
      "Tool outputs (truncated)",
      "Image attachments",
    ],
    zhExamples: [
      "Skills、plugins、memory 摘要",
      "Tool 输出（已截断）",
      "图片附件",
    ],
    enRule: "Each plane has an explicit budget; oldest or biggest entries drop first.",
    zhRule: "每个面有明确预算；优先丢弃最旧或最大的条目。",
    source: "context/fragment.rs",
  },
  {
    key: "projection",
    enLabel: "Prompt projection",
    zhLabel: "Prompt projection",
    enLifetime: "Single API request",
    zhLifetime: "单次 API 请求",
    enExamples: [
      "Cloned ledger view",
      "Rendered fragments in resolution order",
      "Normalization for the active model",
    ],
    zhExamples: [
      "Ledger 的克隆视图",
      "按解析顺序渲染的 fragments",
      "针对当前 model 的 normalization",
    ],
    enRule: "Built fresh each request, then thrown away. Never written back.",
    zhRule: "每次请求重新构建，然后丢弃；不会被写回。",
    source: "compact.rs (projection composers)",
  },
];

interface Props {
  lang: Lang;
}

export default function ContextLifecycleExplorer({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [active, setActive] = useState<PlaneKey>("durable");
  const [pulseTick, setPulseTick] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const handler = (event: MediaQueryListEvent) => {
      reduceMotion.current = event.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const id = window.setInterval(() => setPulseTick((tick) => tick + 1), 1800);
    return () => window.clearInterval(id);
  }, []);

  const activePlane = useMemo(
    () => planes.find((plane) => plane.key === active) ?? planes[0],
    [active],
  );

  const planeColors: Record<PlaneKey, { fill: string; stroke: string }> = {
    durable: {
      fill: mode === "light" ? "#fef3c7" : "#3a2c11",
      stroke: mode === "light" ? "#92400e" : "#fbbf24",
    },
    runtime: {
      fill: mode === "light" ? "#e0f2fe" : "#102a3d",
      stroke: mode === "light" ? "#0369a1" : "#7dd3fc",
    },
    optional: {
      fill: mode === "light" ? "#ecfccb" : "#1e2c12",
      stroke: mode === "light" ? "#3f6212" : "#bef264",
    },
    projection: {
      fill: mode === "light" ? "#fee2e2" : "#3a1414",
      stroke: mode === "light" ? "#b91c1c" : "#fca5a5",
    },
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Four lifetimes feeding one prompt projection"
      zhTitle="四种生命周期汇聚成一次 prompt projection"
      subtitle="Click each plane to see what owns it and how long the data lives."
      zhSubtitle="点击每个面板，看谁拥有它、数据存活多久。"
      caption="Codex separates context by lifetime, not by topic. The model never sees the planes directly — only the projection."
      zhCaption="Codex 按生命周期划分 context，而不是按主题。模型从不直接看到这些面，只看到 projection。"
      badge="Chapter 1"
      zhBadge="第 1 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: 320,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 12,
            background: colors.background,
            padding: 12,
          }}
        >
          <svg
            viewBox="0 0 320 360"
            width="100%"
            height="auto"
            role="img"
            aria-label={
              lang === "zh"
                ? "四个生命周期面板汇聚到 prompt projection"
                : "Four lifetime planes funnel into a prompt projection"
            }
          >
            <defs>
              <linearGradient id="ccm-flow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={colors.accent} stopOpacity="0.6" />
                <stop offset="1" stopColor={colors.accent} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {planes.slice(0, 3).map((plane, index) => {
              const x = 20 + index * 96;
              const isActive = active === plane.key;
              return (
                <g
                  key={plane.key}
                  onClick={() => setActive(plane.key)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={x}
                    y={20}
                    width={88}
                    height={84}
                    rx={10}
                    fill={planeColors[plane.key].fill}
                    stroke={planeColors[plane.key].stroke}
                    strokeWidth={isActive ? 3 : 1.4}
                    opacity={isActive ? 1 : 0.85}
                  />
                  <text
                    x={x + 44}
                    y={50}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill={planeColors[plane.key].stroke}
                  >
                    {(localized(lang, plane.enLabel, plane.zhLabel) ?? "")
                      .split(/\s/)
                      .slice(0, 1)
                      .join(" ")}
                  </text>
                  <text
                    x={x + 44}
                    y={66}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill={planeColors[plane.key].stroke}
                  >
                    {(localized(lang, plane.enLabel, plane.zhLabel) ?? "")
                      .split(/\s/)
                      .slice(1)
                      .join(" ")}
                  </text>
                  <text
                    x={x + 44}
                    y={88}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill={colors.textMuted}
                    fontFamily="var(--font-mono)"
                  >
                    {localized(lang, plane.enLifetime, plane.zhLifetime)}
                  </text>
                </g>
              );
            })}

            {planes.slice(0, 3).map((plane, index) => {
              const xStart = 64 + index * 96;
              const xEnd = 160;
              return (
                <line
                  key={`flow-${plane.key}`}
                  x1={xStart}
                  y1={104}
                  x2={xEnd}
                  y2={186}
                  stroke={planeColors[plane.key].stroke}
                  strokeWidth={active === plane.key ? 2.5 : 1.2}
                  strokeDasharray={active === plane.key ? "0" : "4 3"}
                  opacity={0.85}
                />
              );
            })}

            {(() => {
              const projection = planes[3];
              const isActive = active === projection.key;
              return (
                <g
                  onClick={() => setActive(projection.key)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={92}
                    y={186}
                    width={136}
                    height={52}
                    rx={10}
                    fill={planeColors.projection.fill}
                    stroke={planeColors.projection.stroke}
                    strokeWidth={isActive ? 3 : 1.6}
                  />
                  <text
                    x={160}
                    y={210}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={planeColors.projection.stroke}
                  >
                    {localized(
                      lang,
                      projection.enLabel,
                      projection.zhLabel,
                    )}
                  </text>
                  <text
                    x={160}
                    y={228}
                    textAnchor="middle"
                    fontSize={9.5}
                    fontFamily="var(--font-mono)"
                    fill={colors.textMuted}
                  >
                    {localized(
                      lang,
                      projection.enLifetime,
                      projection.zhLifetime,
                    )}
                  </text>
                </g>
              );
            })()}

            <line
              x1={160}
              y1={238}
              x2={160}
              y2={278}
              stroke={colors.accent}
              strokeWidth={2.5}
              markerEnd="url(#ccm-arrow)"
            />
            <rect
              x={106}
              y={278}
              width={108}
              height={36}
              rx={9}
              fill={colors.accentSoft}
              stroke={colors.accent}
              strokeWidth={1.4}
            />
            <text
              x={160}
              y={301}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={colors.accent}
            >
              {lang === "zh" ? "Model API 请求" : "Model API request"}
            </text>

            <path
              d={`M214,296 Q300,300 300,160 Q300,40 248,40`}
              fill="none"
              stroke={planeColors.durable.stroke}
              strokeWidth={1.6}
              strokeDasharray="6 4"
              opacity={0.65}
            />
            <text
              x={262}
              y={172}
              fontSize={9.5}
              fill={planeColors.durable.stroke}
              fontFamily="var(--font-mono)"
            >
              {lang === "zh" ? "appended back" : "appended back"}
            </text>

            {!reduceMotion.current ? (
              <circle
                cx={160}
                cy={186 + ((pulseTick % 4) / 4) * 96}
                r={4.5}
                fill={colors.accent}
                opacity={0.7}
              >
                <animate
                  attributeName="opacity"
                  values="0.95;0.15;0.95"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            ) : null}

            <defs>
              <marker
                id="ccm-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={colors.accent} />
              </marker>
            </defs>
          </svg>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
              marginTop: 8,
            }}
          >
            {planes.map((plane) => (
              <button
                key={plane.key}
                onClick={() => setActive(plane.key)}
                style={{
                  textAlign: "left",
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: `1.5px solid ${
                    active === plane.key
                      ? planeColors[plane.key].stroke
                      : colors.softBorder
                  }`,
                  background:
                    active === plane.key
                      ? planeColors[plane.key].fill
                      : colors.panel,
                  color:
                    active === plane.key
                      ? planeColors[plane.key].stroke
                      : colors.text,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
                aria-pressed={active === plane.key}
              >
                {localized(lang, plane.enLabel, plane.zhLabel)}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            border: `1px solid ${planeColors[active].stroke}`,
            borderLeftWidth: 4,
            borderRadius: 12,
            padding: 14,
            background:
              mode === "light"
                ? `linear-gradient(180deg, ${planeColors[active].fill} 0%, ${colors.panel} 70%)`
                : `linear-gradient(180deg, ${planeColors[active].fill} 0%, ${colors.panel} 70%)`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              color: planeColors[active].stroke,
              fontWeight: 700,
            }}
          >
            {localized(lang, "Lifetime", "生命周期")}:{" "}
            {localized(lang, activePlane.enLifetime, activePlane.zhLifetime)}
          </div>
          <h5
            style={{
              margin: 0,
              fontSize: "1.05rem",
              color: colors.text,
              fontWeight: 700,
              fontFamily: "var(--font-serif, inherit)",
            }}
          >
            {localized(lang, activePlane.enLabel, activePlane.zhLabel)}
          </h5>
          <p
            style={{
              margin: 0,
              fontSize: "0.88rem",
              color: colors.text,
              lineHeight: 1.6,
            }}
          >
            {localized(lang, activePlane.enRule, activePlane.zhRule)}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: colors.textMuted,
              }}
            >
              {localized(lang, "Examples", "示例")}
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                color: colors.text,
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}
            >
              {(lang === "zh"
                ? activePlane.zhExamples
                : activePlane.enExamples
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 10,
              borderTop: `1px dashed ${colors.softBorder}`,
              fontSize: 11,
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>
              {lang === "zh" ? "源码：" : "source:"} {activePlane.source}
            </span>
            <span style={{ color: planeColors[active].stroke, fontWeight: 700 }}>
              {lang === "zh" ? "可点击切换" : "click any plane"}
            </span>
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}
