import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type LaneKey = "cli" | "agent" | "sdk";

type VersionStatus = "supported" | "deprecated" | "preview";

type FeatureKey =
  | "streamV2"
  | "toolPlans"
  | "compactionHints"
  | "skillsV2"
  | "approvalsChannel";

interface LaneMeta {
  key: LaneKey;
  enLabel: string;
  zhLabel: string;
  enRole: string;
  zhRole: string;
}

const LANES: LaneMeta[] = [
  {
    key: "cli",
    enLabel: "CLI lane",
    zhLabel: "CLI lane",
    enRole: "Human-driven terminal client.",
    zhRole: "由人驱动的终端客户端。",
  },
  {
    key: "agent",
    enLabel: "Agent lane",
    zhLabel: "Agent lane",
    enRole: "Server-side runtime and protocol.",
    zhRole: "服务端 runtime 与协议。",
  },
  {
    key: "sdk",
    enLabel: "SDK lane",
    zhLabel: "SDK lane",
    enRole: "Programmatic embedding API.",
    zhRole: "嵌入式编程 API。",
  },
];

interface FeatureMeta {
  key: FeatureKey;
  enLabel: string;
  zhLabel: string;
}

const FEATURES: FeatureMeta[] = [
  { key: "streamV2", enLabel: "stream-v2 (typed events)", zhLabel: "stream-v2（typed events）" },
  { key: "toolPlans", enLabel: "tool-plans", zhLabel: "tool-plans" },
  { key: "compactionHints", enLabel: "compaction-hints", zhLabel: "compaction-hints" },
  { key: "skillsV2", enLabel: "skills-v2 registry", zhLabel: "skills-v2 registry" },
  { key: "approvalsChannel", enLabel: "approvals channel", zhLabel: "approvals 通道" },
];

interface Version {
  key: string;
  lane: LaneKey;
  version: string;
  status: VersionStatus;
  enReleased: string;
  zhReleased: string;
  features: Record<FeatureKey, boolean>;
  compatibleWith: string[];
  enBreaking: string[];
  zhBreaking: string[];
  enDeprecations: string[];
  zhDeprecations: string[];
  capabilities: string[];
}

const VERSIONS: Version[] = [
  // CLI lane.
  {
    key: "cli:v1.6",
    lane: "cli",
    version: "v1.6",
    status: "deprecated",
    enReleased: "2023 Q4",
    zhReleased: "2023 Q4",
    features: {
      streamV2: false,
      toolPlans: false,
      compactionHints: false,
      skillsV2: false,
      approvalsChannel: false,
    },
    compatibleWith: ["agent:v1.x", "sdk:v0.9"],
    enBreaking: [],
    zhBreaking: [],
    enDeprecations: [
      "JSON event format deprecated; clients should switch to typed events.",
      "Inline tool calls deprecated in favor of tool-plans (v2.4+).",
    ],
    zhDeprecations: [
      "JSON 事件格式已弃用；客户端应切换到 typed events。",
      "Inline tool 调用已弃用，应改用 tool-plans（v2.4 起）。",
    ],
    capabilities: ["stream-v1"],
  },
  {
    key: "cli:v2.0",
    lane: "cli",
    version: "v2.0",
    status: "supported",
    enReleased: "2024 Q2",
    zhReleased: "2024 Q2",
    features: {
      streamV2: true,
      toolPlans: false,
      compactionHints: false,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["agent:v2.x", "sdk:v1.0", "sdk:v1.2"],
    enBreaking: [
      "stream-v1 events removed; clients must negotiate stream-v2.",
      "Subcommand `codex run` renamed to `codex exec`.",
    ],
    zhBreaking: [
      "已移除 stream-v1 事件；客户端必须协商 stream-v2。",
      "子命令 `codex run` 重命名为 `codex exec`。",
    ],
    enDeprecations: [
      "--legacy-json flag will be removed in v3.0.",
    ],
    zhDeprecations: [
      "--legacy-json 标志将在 v3.0 中移除。",
    ],
    capabilities: ["stream-v2", "approvals-channel"],
  },
  {
    key: "cli:v2.4",
    lane: "cli",
    version: "v2.4",
    status: "supported",
    enReleased: "2024 Q4",
    zhReleased: "2024 Q4",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["agent:v2.x", "agent:v3.x", "sdk:v1.0", "sdk:v1.2"],
    enBreaking: [],
    zhBreaking: [],
    enDeprecations: [
      "Built-in skills replaced by skills-v2 registry (still available as fallback).",
    ],
    zhDeprecations: [
      "内建 skills 已被 skills-v2 registry 替代（仍作为 fallback 可用）。",
    ],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "approvals-channel",
    ],
  },
  {
    key: "cli:v3.0",
    lane: "cli",
    version: "v3.0",
    status: "preview",
    enReleased: "2025 Q2 (preview)",
    zhReleased: "2025 Q2（preview）",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: true,
      approvalsChannel: true,
    },
    compatibleWith: ["agent:v3.x", "sdk:v1.2", "sdk:v2.0"],
    enBreaking: [
      "tool-plans response now wraps results in `{ ops, evidence }`.",
      "Skill manifest schema bumped to v2; inline skills removed.",
      "--legacy-json removed.",
    ],
    zhBreaking: [
      "tool-plans 响应现在以 `{ ops, evidence }` 包裹结果。",
      "Skill manifest schema 升级到 v2；inline skills 已移除。",
      "已移除 --legacy-json。",
    ],
    enDeprecations: [],
    zhDeprecations: [],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "skills-v2",
      "approvals-channel",
    ],
  },
  // Agent lane.
  {
    key: "agent:v1.x",
    lane: "agent",
    version: "v1.x",
    status: "deprecated",
    enReleased: "2023 Q4",
    zhReleased: "2023 Q4",
    features: {
      streamV2: false,
      toolPlans: false,
      compactionHints: false,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v1.6", "sdk:v0.9"],
    enBreaking: [],
    zhBreaking: [],
    enDeprecations: [
      "stream-v1 deprecated; negotiate stream-v2 wherever possible.",
    ],
    zhDeprecations: [
      "stream-v1 已弃用；尽可能协商 stream-v2。",
    ],
    capabilities: ["stream-v1", "approvals-channel"],
  },
  {
    key: "agent:v2.x",
    lane: "agent",
    version: "v2.x",
    status: "supported",
    enReleased: "2024 Q2",
    zhReleased: "2024 Q2",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v2.0", "cli:v2.4", "sdk:v1.0", "sdk:v1.2"],
    enBreaking: [
      "stream-v1 removed; clients must speak stream-v2.",
      "Tool error envelope schema changed (`error: { code, retryable }`).",
    ],
    zhBreaking: [
      "已移除 stream-v1；客户端必须使用 stream-v2。",
      "Tool 错误信封 schema 已更改（`error: { code, retryable }`）。",
    ],
    enDeprecations: [
      "Inline skills will be removed in v3.x.",
    ],
    zhDeprecations: [
      "Inline skills 将在 v3.x 中移除。",
    ],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "approvals-channel",
    ],
  },
  {
    key: "agent:v3.x",
    lane: "agent",
    version: "v3.x",
    status: "preview",
    enReleased: "2025 Q2 (preview)",
    zhReleased: "2025 Q2（preview）",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: true,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v2.4", "cli:v3.0", "sdk:v1.2", "sdk:v2.0"],
    enBreaking: [
      "Inline skills removed; only skills-v2 manifests accepted.",
      "tool-plans wraps results to match CLI v3.0.",
    ],
    zhBreaking: [
      "已移除 inline skills；仅接受 skills-v2 manifest。",
      "tool-plans 改为包裹返回，匹配 CLI v3.0。",
    ],
    enDeprecations: [],
    zhDeprecations: [],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "skills-v2",
      "approvals-channel",
    ],
  },
  // SDK lane.
  {
    key: "sdk:v0.9",
    lane: "sdk",
    version: "v0.9",
    status: "deprecated",
    enReleased: "2023 Q4",
    zhReleased: "2023 Q4",
    features: {
      streamV2: false,
      toolPlans: false,
      compactionHints: false,
      skillsV2: false,
      approvalsChannel: false,
    },
    compatibleWith: ["cli:v1.6", "agent:v1.x"],
    enBreaking: [],
    zhBreaking: [],
    enDeprecations: ["Entire surface superseded; migrate to v1.x."],
    zhDeprecations: ["整个 API 已被替代；请迁移到 v1.x。"],
    capabilities: ["stream-v1"],
  },
  {
    key: "sdk:v1.0",
    lane: "sdk",
    version: "v1.0",
    status: "supported",
    enReleased: "2024 Q2",
    zhReleased: "2024 Q2",
    features: {
      streamV2: true,
      toolPlans: false,
      compactionHints: false,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v2.0", "cli:v2.4", "agent:v2.x"],
    enBreaking: [
      "Stream iterator is now async; the callback API was removed.",
    ],
    zhBreaking: [
      "Stream 迭代器改为 async；已移除 callback API。",
    ],
    enDeprecations: [
      "Synchronous tool registry will be removed in v2.0.",
    ],
    zhDeprecations: [
      "同步 tool registry 将在 v2.0 中移除。",
    ],
    capabilities: ["stream-v2", "approvals-channel"],
  },
  {
    key: "sdk:v1.2",
    lane: "sdk",
    version: "v1.2",
    status: "supported",
    enReleased: "2024 Q4",
    zhReleased: "2024 Q4",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: false,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v2.0", "cli:v2.4", "cli:v3.0", "agent:v2.x", "agent:v3.x"],
    enBreaking: [],
    zhBreaking: [],
    enDeprecations: [
      "Inline skill helpers; switch to the skills-v2 registry helper.",
    ],
    zhDeprecations: [
      "Inline skill 辅助函数；请改用 skills-v2 registry 辅助函数。",
    ],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "approvals-channel",
    ],
  },
  {
    key: "sdk:v2.0",
    lane: "sdk",
    version: "v2.0",
    status: "preview",
    enReleased: "2025 Q2 (preview)",
    zhReleased: "2025 Q2（preview）",
    features: {
      streamV2: true,
      toolPlans: true,
      compactionHints: true,
      skillsV2: true,
      approvalsChannel: true,
    },
    compatibleWith: ["cli:v3.0", "agent:v3.x"],
    enBreaking: [
      "Tool registry API rewritten around `defineTool({ id, ... })`.",
      "Inline skills removed; manifests required.",
    ],
    zhBreaking: [
      "Tool registry API 围绕 `defineTool({ id, ... })` 重写。",
      "已移除 inline skills；必须提供 manifest。",
    ],
    enDeprecations: [],
    zhDeprecations: [],
    capabilities: [
      "stream-v2",
      "tool-plans",
      "compaction-hints",
      "skills-v2",
      "approvals-channel",
    ],
  },
];

type Colors = (typeof palette)["light"];

interface Props {
  lang: Lang;
}

export default function CompatibilityLaneBoard({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [targetKey, setTargetKey] = useState<string>("cli:v2.4");
  const target =
    VERSIONS.find((v) => v.key === targetKey) ?? VERSIONS[0];

  const targetLaneMeta =
    LANES.find((lane) => lane.key === target.lane) ?? LANES[0];

  const laneVersions = useMemo(() => {
    const byLane: Record<LaneKey, Version[]> = { cli: [], agent: [], sdk: [] };
    for (const v of VERSIONS) byLane[v.lane].push(v);
    return byLane;
  }, []);

  const tableVersions = laneVersions[target.lane];

  return (
    <InteractiveFigure
      lang={lang}
      title="Three lanes of compatibility"
      zhTitle="三条兼容性 lane"
      subtitle="Pick a target version on any lane. The other two lanes highlight which versions can still negotiate a working channel."
      zhSubtitle="在任意 lane 上选一个目标版本；其余两条 lane 会标出仍可协商出可用通道的版本。"
      caption="Compatibility is per-pair and per-capability: clients always negotiate the lowest mutually understood feature set."
      zhCaption="兼容性按 pair 与 capability 协商；客户端最终落到双方都理解的最低公共特性集。"
      badge="Chapter 19"
      zhBadge="第 19 章"
    >
      <TargetSummary
        lang={lang}
        colors={colors}
        target={target}
        laneMeta={targetLaneMeta}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          gap: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 8,
          }}
        >
          {LANES.map((lane) => (
            <LaneColumn
              key={lane.key}
              lang={lang}
              colors={colors}
              mode={mode}
              lane={lane}
              versions={laneVersions[lane.key]}
              target={target}
              onPick={setTargetKey}
            />
          ))}
        </div>

        <SidePanel lang={lang} colors={colors} target={target} />
      </div>

      <ComparisonTable
        lang={lang}
        colors={colors}
        mode={mode}
        laneMeta={targetLaneMeta}
        versions={tableVersions}
        targetKey={target.key}
      />
    </InteractiveFigure>
  );
}

function TargetSummary({
  lang,
  colors,
  target,
  laneMeta,
}: {
  lang: Lang;
  colors: Colors;
  target: Version;
  laneMeta: LaneMeta;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        padding: "8px 12px",
        background: colors.accentSoft,
        border: `1px solid ${colors.accent}`,
        borderRadius: 10,
        color: colors.text,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: colors.accent,
        }}
      >
        {lang === "zh" ? "目标版本" : "Target"}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: colors.text,
        }}
      >
        {localized(lang, laneMeta.enLabel, laneMeta.zhLabel)} ·{" "}
        {target.version}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          color: colors.textMuted,
        }}
      >
        {localized(lang, target.enReleased, target.zhReleased)}
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          color: colors.textMuted,
        }}
      >
        {lang === "zh"
          ? `${target.compatibleWith.length} 个跨 lane 互通版本`
          : `${target.compatibleWith.length} cross-lane peers`}
      </span>
    </div>
  );
}

function LaneColumn({
  lang,
  colors,
  mode,
  lane,
  versions,
  target,
  onPick,
}: {
  lang: Lang;
  colors: Colors;
  mode: "light" | "dark";
  lane: LaneMeta;
  versions: Version[];
  target: Version;
  onPick: (key: string) => void;
}) {
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        padding: 10,
        background: colors.background,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: colors.accent,
            textTransform: "uppercase",
          }}
        >
          {localized(lang, lane.enLabel, lane.zhLabel)}
        </span>
        <span
          style={{
            fontSize: 11,
            color: colors.textMuted,
            lineHeight: 1.4,
          }}
        >
          {localized(lang, lane.enRole, lane.zhRole)}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {versions.map((version) => (
          <VersionPill
            key={version.key}
            lang={lang}
            colors={colors}
            mode={mode}
            version={version}
            target={target}
            onPick={onPick}
          />
        ))}
      </div>
    </div>
  );
}

type PillRelation =
  | "target"
  | "sibling"
  | "compatible"
  | "incompatible";

function VersionPill({
  lang,
  colors,
  mode,
  version,
  target,
  onPick,
}: {
  lang: Lang;
  colors: Colors;
  mode: "light" | "dark";
  version: Version;
  target: Version;
  onPick: (key: string) => void;
}) {
  const relation: PillRelation =
    version.key === target.key
      ? "target"
      : version.lane === target.lane
      ? "sibling"
      : target.compatibleWith.includes(version.key)
      ? "compatible"
      : "incompatible";

  const statusInk =
    version.status === "supported"
      ? colors.success
      : version.status === "deprecated"
      ? colors.textMuted
      : colors.info;

  const border =
    relation === "target"
      ? colors.accent
      : relation === "compatible"
      ? colors.success
      : relation === "sibling"
      ? colors.softBorder
      : colors.softBorder;

  const bg =
    relation === "target"
      ? colors.accentSoft
      : relation === "compatible"
      ? colors.successSoft
      : mode === "light"
      ? "#ffffff"
      : colors.panel;

  const opacity = relation === "incompatible" ? 0.55 : 1;

  const marker =
    relation === "target"
      ? "★"
      : relation === "compatible"
      ? "✓"
      : relation === "incompatible"
      ? "✕"
      : "·";

  const markerColor =
    relation === "target"
      ? colors.accent
      : relation === "compatible"
      ? colors.success
      : relation === "incompatible"
      ? colors.accent
      : colors.textMuted;

  const statusLabel =
    version.status === "supported"
      ? lang === "zh"
        ? "supported"
        : "supported"
      : version.status === "deprecated"
      ? lang === "zh"
        ? "deprecated"
        : "deprecated"
      : lang === "zh"
      ? "preview"
      : "preview";

  return (
    <button
      onClick={() => onPick(version.key)}
      aria-pressed={relation === "target"}
      style={{
        textAlign: "left",
        cursor: "pointer",
        border: `1.5px solid ${border}`,
        background: bg,
        borderRadius: 999,
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity,
        color: colors.text,
        fontFamily: "var(--font-mono)",
      }}
    >
      <span
        aria-hidden
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: markerColor,
          width: 12,
          textAlign: "center",
        }}
      >
        {marker}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: colors.text,
          minWidth: 36,
        }}
      >
        {version.version}
      </span>
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: statusInk,
          marginLeft: "auto",
          fontStyle: version.status === "preview" ? "italic" : "normal",
        }}
      >
        {statusLabel}
      </span>
    </button>
  );
}

function SidePanel({
  lang,
  colors,
  target,
}: {
  lang: Lang;
  colors: Colors;
  target: Version;
}) {
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        background: colors.background,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <PanelSection
        lang={lang}
        colors={colors}
        tone={colors.accent}
        title={lang === "zh" ? "Breaking changes" : "Breaking changes"}
        items={localized(lang, target.enBreaking, target.zhBreaking)}
        emptyEn="No breaking changes vs. previous version."
        emptyZh="相对上一版本无 breaking change。"
      />
      <PanelSection
        lang={lang}
        colors={colors}
        tone={colors.warning}
        title={lang === "zh" ? "弃用警告" : "Deprecation warnings"}
        items={localized(lang, target.enDeprecations, target.zhDeprecations)}
        emptyEn="Nothing currently deprecated."
        emptyZh="当前无 deprecation。"
      />
      <CapabilitiesBlock
        lang={lang}
        colors={colors}
        capabilities={target.capabilities}
      />
    </div>
  );
}

function PanelSection({
  lang,
  colors,
  tone,
  title,
  items,
  emptyEn,
  emptyZh,
}: {
  lang: Lang;
  colors: Colors;
  tone: string;
  title: string;
  items: string[];
  emptyEn: string;
  emptyZh: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: tone,
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      {items.length === 0 ? (
        <span
          style={{
            fontSize: 11.5,
            fontStyle: "italic",
            color: colors.textMuted,
            lineHeight: 1.5,
          }}
        >
          {localized(lang, emptyEn, emptyZh)}
        </span>
      ) : (
        <ul
          style={{
            margin: 0,
            paddingLeft: 16,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {items.map((entry) => (
            <li
              key={entry}
              style={{
                fontSize: 12,
                color: colors.text,
                lineHeight: 1.5,
              }}
            >
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CapabilitiesBlock({
  lang,
  colors,
  capabilities,
}: {
  lang: Lang;
  colors: Colors;
  capabilities: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.info,
          fontWeight: 700,
        }}
      >
        {lang === "zh"
          ? "可协商的 capabilities"
          : "Negotiated capabilities"}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {capabilities.map((cap) => (
          <code
            key={cap}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              background: colors.infoSoft,
              color: colors.info,
              border: `1px solid ${colors.info}55`,
              borderRadius: 6,
              padding: "2px 6px",
            }}
          >
            {cap}
          </code>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({
  lang,
  colors,
  mode,
  laneMeta,
  versions,
  targetKey,
}: {
  lang: Lang;
  colors: Colors;
  mode: "light" | "dark";
  laneMeta: LaneMeta;
  versions: Version[];
  targetKey: string;
}) {
  return (
    <div
      style={{
        marginTop: 14,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        background: colors.panel,
        padding: 10,
        overflowX: "auto",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: colors.accent,
          marginBottom: 8,
        }}
      >
        {lang === "zh"
          ? `特性矩阵 · ${localized(lang, laneMeta.enLabel, laneMeta.zhLabel)}`
          : `Feature matrix · ${localized(lang, laneMeta.enLabel, laneMeta.zhLabel)}`}
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          color: colors.text,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "6px 8px",
                borderBottom: `1px solid ${colors.softBorder}`,
                color: colors.textMuted,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {lang === "zh" ? "特性" : "Feature"}
            </th>
            {versions.map((v) => {
              const isTarget = v.key === targetKey;
              return (
                <th
                  key={v.key}
                  style={{
                    textAlign: "center",
                    padding: "6px 8px",
                    borderBottom: `1px solid ${colors.softBorder}`,
                    color: isTarget ? colors.accent : colors.text,
                    fontWeight: 700,
                    background: isTarget ? colors.accentSoft : "transparent",
                  }}
                >
                  {v.version}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feature) => (
            <tr key={feature.key}>
              <td
                style={{
                  padding: "6px 8px",
                  borderBottom: `1px solid ${colors.softBorder}`,
                  color: colors.text,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {localized(lang, feature.enLabel, feature.zhLabel)}
              </td>
              {versions.map((v) => {
                const has = v.features[feature.key];
                const isTarget = v.key === targetKey;
                return (
                  <td
                    key={v.key}
                    style={{
                      padding: "6px 8px",
                      borderBottom: `1px solid ${colors.softBorder}`,
                      textAlign: "center",
                      color: has ? colors.success : colors.textMuted,
                      background: isTarget
                        ? mode === "light"
                          ? "#fff7ed"
                          : "#2a2620"
                        : "transparent",
                      fontWeight: 700,
                    }}
                  >
                    {has ? "✓" : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
