import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ArtifactKey =
  | "rust"
  | "ts"
  | "py"
  | "manifest"
  | "openapi";

interface ArtifactConfig {
  key: ArtifactKey;
  enLabel: string;
  zhLabel: string;
  enGenerator: string;
  zhGenerator: string;
  enOutput: string;
  zhOutput: string;
  // Rough position relative to the central schema (in svg units).
  dx: number;
  dy: number;
}

const artifacts: ArtifactConfig[] = [
  {
    key: "rust",
    enLabel: "Rust types",
    zhLabel: "Rust 类型",
    enGenerator: "schemars + protocol-codegen",
    zhGenerator: "schemars + protocol-codegen",
    enOutput: "core/protocol/src/generated.rs",
    zhOutput: "core/protocol/src/generated.rs",
    dx: -210,
    dy: -90,
  },
  {
    key: "ts",
    enLabel: "TypeScript SDK",
    zhLabel: "TypeScript SDK",
    enGenerator: "openapi-typescript + zod-codegen",
    zhGenerator: "openapi-typescript + zod-codegen",
    enOutput: "sdk/ts/src/generated/index.ts",
    zhOutput: "sdk/ts/src/generated/index.ts",
    dx: 210,
    dy: -90,
  },
  {
    key: "py",
    enLabel: "Python SDK",
    zhLabel: "Python SDK",
    enGenerator: "datamodel-code-generator",
    zhGenerator: "datamodel-code-generator",
    enOutput: "sdk/py/codex/_generated.py",
    zhOutput: "sdk/py/codex/_generated.py",
    dx: 210,
    dy: 90,
  },
  {
    key: "manifest",
    enLabel: "JSON-RPC manifest",
    zhLabel: "JSON-RPC manifest",
    enGenerator: "manifest-builder",
    zhGenerator: "manifest-builder",
    enOutput: "protocol/manifest.json",
    zhOutput: "protocol/manifest.json",
    dx: -210,
    dy: 90,
  },
  {
    key: "openapi",
    enLabel: "OpenAPI spec",
    zhLabel: "OpenAPI 规范",
    enGenerator: "schema-to-openapi",
    zhGenerator: "schema-to-openapi",
    enOutput: "docs/openapi.yaml",
    zhOutput: "docs/openapi.yaml",
    dx: 0,
    dy: 150,
  },
];

type ArtifactStatus = "fresh" | "stale" | "drifted";

type ArtifactState = Record<ArtifactKey, { status: ArtifactStatus; version: number }>;

function makeInitialState(): ArtifactState {
  const state = {} as ArtifactState;
  for (const artifact of artifacts) {
    state[artifact.key] = { status: "fresh", version: 1 };
  }
  return state;
}

interface Props {
  lang: Lang;
}

export default function GeneratedContractDriftViewer({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [schemaVersion, setSchemaVersion] = useState(1);
  const [state, setState] = useState<ArtifactState>(() => makeInitialState());
  const [highlight, setHighlight] = useState<ArtifactKey | null>(null);

  const driftCount = useMemo(
    () =>
      Object.values(state).filter(
        (entry) => entry.status === "stale" || entry.status === "drifted",
      ).length,
    [state],
  );

  function bumpSchema() {
    const nextVersion = schemaVersion + 1;
    setSchemaVersion(nextVersion);
    setState((prev) => {
      const next = { ...prev } as ArtifactState;
      for (const artifact of artifacts) {
        if (next[artifact.key].status === "drifted") {
          continue;
        }
        next[artifact.key] = { status: "stale", version: prev[artifact.key].version };
      }
      return next;
    });
  }

  function regenerate() {
    setState((prev) => {
      const next = { ...prev } as ArtifactState;
      for (const artifact of artifacts) {
        next[artifact.key] = { status: "fresh", version: schemaVersion };
      }
      return next;
    });
  }

  function handEdit(key: ArtifactKey) {
    setState((prev) => ({
      ...prev,
      [key]: { status: "drifted", version: prev[key].version },
    }));
    setHighlight(key);
  }

  function statusColor(status: ArtifactStatus) {
    if (status === "fresh") return colors.success;
    if (status === "stale") return colors.warning;
    return colors.accent;
  }

  function statusLabel(status: ArtifactStatus) {
    if (lang === "zh") {
      if (status === "fresh") return "已同步";
      if (status === "stale") return "需重新生成";
      return "drift 警告";
    }
    if (status === "fresh") return "in sync";
    if (status === "stale") return "out of date";
    return "drift detected";
  }

  return (
    <InteractiveFigure
      lang={lang}
      title="Schema is the source of truth"
      zhTitle="Schema 是唯一真相"
      subtitle="Bump the schema, regenerate, or hand-edit a downstream artifact to see drift propagate."
      zhSubtitle="bump schema、regenerate，或手改下游 artifact，观察 drift 如何传播。"
      caption="Generated code is never edited by hand. The schema is the only authored source; everything downstream is reproducible."
      zhCaption="生成的代码从不手改。schema 是唯一作者维护的来源，下游所有产物都可重复生成。"
      badge="Chapter 23"
      zhBadge="第 23 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 16,
        }}
      >
        <div
          style={{
            position: "relative",
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 12,
            background: colors.background,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={bumpSchema}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: `1px solid ${colors.accent}`,
                background: colors.accentSoft,
                color: colors.accent,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {lang === "zh" ? "Bump schema" : "Bump schema"}
            </button>
            <button
              onClick={regenerate}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: `1px solid ${colors.success}`,
                background: colors.successSoft,
                color: colors.success,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {lang === "zh" ? "Regenerate" : "Regenerate"}
            </button>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
                marginLeft: "auto",
              }}
            >
              {lang === "zh" ? "schema 版本" : "schema version"}{" "}
              <strong style={{ color: colors.accent }}>v{schemaVersion}</strong>
            </span>
          </div>

          <svg
            viewBox="-260 -180 520 380"
            width="100%"
            height="auto"
            role="img"
            aria-label={
              lang === "zh"
                ? "schema 是唯一真相，下游 artifact 通过 codegen 派生"
                : "schema is the source of truth, downstream artifacts derived via codegen"
            }
            style={{ minHeight: 320 }}
          >
            <defs>
              <marker
                id="gcd-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={colors.accent} />
              </marker>
            </defs>

            {artifacts.map((artifact) => {
              const status = state[artifact.key].status;
              const stroke = statusColor(status);
              return (
                <line
                  key={`edge-${artifact.key}`}
                  x1={0}
                  y1={0}
                  x2={artifact.dx}
                  y2={artifact.dy}
                  stroke={stroke}
                  strokeWidth={status === "drifted" ? 2.4 : 1.6}
                  strokeDasharray={status === "stale" ? "5 4" : "0"}
                  opacity={0.85}
                  markerEnd="url(#gcd-arrow)"
                />
              );
            })}

            <rect
              x={-78}
              y={-32}
              width={156}
              height={64}
              rx={10}
              fill={colors.accentSoft}
              stroke={colors.accent}
              strokeWidth={2.4}
            />
            <text
              x={0}
              y={-6}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={colors.accent}
              fontFamily="var(--font-mono)"
            >
              {lang === "zh" ? "schema.json" : "schema.json"}
            </text>
            <text
              x={0}
              y={14}
              textAnchor="middle"
              fontSize={10}
              fill={colors.textMuted}
              fontFamily="var(--font-mono)"
            >
              v{schemaVersion}
            </text>

            {artifacts.map((artifact) => {
              const status = state[artifact.key].status;
              const stroke = statusColor(status);
              const isHighlight = highlight === artifact.key;
              const w = 150;
              const h = 56;
              const x = artifact.dx - w / 2;
              const y = artifact.dy - h / 2;
              return (
                <g
                  key={artifact.key}
                  onClick={() => setHighlight(artifact.key)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={9}
                    fill={
                      status === "fresh"
                        ? colors.successSoft
                        : status === "stale"
                          ? colors.warningSoft
                          : colors.accentSoft
                    }
                    stroke={stroke}
                    strokeWidth={isHighlight ? 3 : 1.5}
                  />
                  <text
                    x={artifact.dx}
                    y={artifact.dy - 6}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={colors.text}
                  >
                    {localized(lang, artifact.enLabel, artifact.zhLabel)}
                  </text>
                  <text
                    x={artifact.dx}
                    y={artifact.dy + 12}
                    textAnchor="middle"
                    fontSize={9.5}
                    fontFamily="var(--font-mono)"
                    fill={stroke}
                  >
                    {statusLabel(status)} · v{state[artifact.key].version}
                  </text>
                </g>
              );
            })}
          </svg>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {artifacts.map((artifact) => (
              <button
                key={`hand-${artifact.key}`}
                onClick={() => handEdit(artifact.key)}
                title={
                  lang === "zh"
                    ? "模拟手改该 artifact"
                    : "simulate a hand-edit of this artifact"
                }
                style={{
                  padding: "5px 9px",
                  borderRadius: 7,
                  border: `1px solid ${colors.softBorder}`,
                  background: colors.panel,
                  color: colors.text,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  cursor: "pointer",
                }}
              >
                {lang === "zh" ? "手改 " : "hand-edit "}
                {localized(lang, artifact.enLabel, artifact.zhLabel)}
              </button>
            ))}
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
              borderTop: `1px dashed ${colors.softBorder}`,
              paddingTop: 6,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {lang === "zh" ? "drift 计数" : "drift count"}{" "}
              <strong
                style={{
                  color: driftCount === 0 ? colors.success : colors.accent,
                }}
              >
                {driftCount}
              </strong>
            </span>
            <span>
              {lang === "zh"
                ? "点击 artifact 高亮，按钮模拟手改"
                : "click to highlight, buttons simulate hand-edits"}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              background: colors.panel,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: colors.accent,
              }}
            >
              {lang === "zh" ? "Codegen 工具与产物" : "Generators and outputs"}
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {artifacts.map((artifact) => {
                const status = state[artifact.key].status;
                const stroke = statusColor(status);
                const isHighlight = highlight === artifact.key;
                return (
                  <li
                    key={`row-${artifact.key}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 9px",
                      border: `1px solid ${
                        isHighlight ? stroke : colors.softBorder
                      }`,
                      borderRadius: 8,
                      background: isHighlight
                        ? status === "fresh"
                          ? colors.successSoft
                          : status === "stale"
                            ? colors.warningSoft
                            : colors.accentSoft
                        : colors.background,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: stroke,
                      }}
                    />
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 12.5 }}>
                        {localized(lang, artifact.enLabel, artifact.zhLabel)}
                      </span>
                      <span
                        style={{
                          fontSize: 10.5,
                          color: colors.textMuted,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {localized(
                          lang,
                          artifact.enGenerator,
                          artifact.zhGenerator,
                        )}{" "}
                        →{" "}
                        {localized(lang, artifact.enOutput, artifact.zhOutput)}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: stroke,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {status === "fresh"
                        ? "✓"
                        : status === "stale"
                          ? "↺"
                          : "!"}{" "}
                      {statusLabel(status)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            style={{
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              background: colors.background,
              padding: 12,
              fontSize: 12.5,
              color: colors.text,
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: colors.accent }}>
              {lang === "zh" ? "为什么这样设计？" : "Why this matters:"}
            </strong>{" "}
            {lang === "zh"
              ? "生成的 Rust、TS、Python、JSON-RPC manifest、OpenAPI 都派生自同一份 schema；所谓 contract drift 永远来自 schema 与 codegen 之间的版本错位，或来自手动改写下游产物。"
              : "Rust, TypeScript, Python, JSON-RPC manifest and OpenAPI all derive from the same schema; contract drift only comes from a stale codegen or a hand-edit on a downstream artifact."}
          </div>

          {highlight ? (
            <div
              style={{
                border: `1px solid ${statusColor(state[highlight].status)}`,
                borderLeftWidth: 4,
                borderRadius: 10,
                padding: 10,
                background: colors.panel,
                fontSize: 12,
                color: colors.text,
                lineHeight: 1.55,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: statusColor(state[highlight].status),
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {state[highlight].status === "drifted"
                  ? lang === "zh"
                    ? "drift 高亮"
                    : "drift highlighted"
                  : lang === "zh"
                    ? "已选中"
                    : "selected"}
              </div>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>
                {localized(
                  lang,
                  artifacts.find((a) => a.key === highlight)!.enLabel,
                  artifacts.find((a) => a.key === highlight)!.zhLabel,
                )}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                {state[highlight].status === "drifted"
                  ? lang === "zh"
                    ? "手改了下游产物。下次 codegen 会覆盖这些改动；请把意图迁回 schema。"
                    : "downstream artifact was hand-edited. The next codegen run will overwrite it — push the intent back into the schema."
                  : state[highlight].status === "stale"
                    ? lang === "zh"
                      ? "schema 已 bump，但该 artifact 仍是旧版本。运行 regenerate 重新派生。"
                      : "schema was bumped but this artifact is still on the previous version. Run regenerate to re-derive it."
                    : lang === "zh"
                      ? "与 schema 完全同步。"
                      : "fully in sync with schema."}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </InteractiveFigure>
  );
}
