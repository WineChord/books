import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type StageKey =
  | "main"
  | "ci"
  | "tag"
  | "sign"
  | "upload"
  | "announce"
  | "mirror";

interface StageConfig {
  key: StageKey;
  enLabel: string;
  zhLabel: string;
  enHint: string;
  zhHint: string;
}

const stages: StageConfig[] = [
  {
    key: "main",
    enLabel: "main commit",
    zhLabel: "main commit",
    enHint: "Frozen SHA on the release branch.",
    zhHint: "release 分支上冻结的 SHA。",
  },
  {
    key: "ci",
    enLabel: "CI green",
    zhLabel: "CI 绿灯",
    enHint: "All required checks must be green.",
    zhHint: "所有必填 check 必须通过。",
  },
  {
    key: "tag",
    enLabel: "tag",
    zhLabel: "打 tag",
    enHint: "Annotated semver tag, signed by maintainer.",
    zhHint: "由 maintainer 签名的 semver annotated tag。",
  },
  {
    key: "sign",
    enLabel: "sign",
    zhLabel: "签名",
    enHint: "cosign + checksum manifest.",
    zhHint: "cosign 加 checksum manifest。",
  },
  {
    key: "upload",
    enLabel: "upload",
    zhLabel: "上传",
    enHint: "GitHub releases, npm, registry, brew.",
    zhHint: "GitHub releases、npm、镜像仓库、brew。",
  },
  {
    key: "announce",
    enLabel: "announce",
    zhLabel: "发布公告",
    enHint: "Changelog + release notes go out.",
    zhHint: "changelog 与 release notes 一起发出。",
  },
  {
    key: "mirror",
    enLabel: "mirror",
    zhLabel: "同步镜像",
    enHint: "CDN + corporate mirror back-fill.",
    zhHint: "CDN 与公司镜像回填。",
  },
];

type ArtifactKind =
  | "linux-x64"
  | "linux-arm64"
  | "mac-x64"
  | "mac-arm64"
  | "windows-x64"
  | "npm"
  | "docker"
  | "brew"
  | "checksum";

interface ArtifactConfig {
  key: ArtifactKind;
  enLabel: string;
  zhLabel: string;
  enKind: string;
  zhKind: string;
}

const artifacts: ArtifactConfig[] = [
  {
    key: "linux-x64",
    enLabel: "codex-linux-x64",
    zhLabel: "codex-linux-x64",
    enKind: "binary tarball",
    zhKind: "二进制 tarball",
  },
  {
    key: "linux-arm64",
    enLabel: "codex-linux-arm64",
    zhLabel: "codex-linux-arm64",
    enKind: "binary tarball",
    zhKind: "二进制 tarball",
  },
  {
    key: "mac-x64",
    enLabel: "codex-mac-x64",
    zhLabel: "codex-mac-x64",
    enKind: "binary tarball",
    zhKind: "二进制 tarball",
  },
  {
    key: "mac-arm64",
    enLabel: "codex-mac-arm64",
    zhLabel: "codex-mac-arm64",
    enKind: "binary tarball",
    zhKind: "二进制 tarball",
  },
  {
    key: "windows-x64",
    enLabel: "codex-windows-x64",
    zhLabel: "codex-windows-x64",
    enKind: "zip + msi",
    zhKind: "zip 与 msi",
  },
  {
    key: "npm",
    enLabel: "@openai/codex (npm)",
    zhLabel: "@openai/codex (npm)",
    enKind: "node wrapper package",
    zhKind: "node wrapper 包",
  },
  {
    key: "docker",
    enLabel: "ghcr.io/openai/codex",
    zhLabel: "ghcr.io/openai/codex",
    enKind: "multi-arch docker image",
    zhKind: "多架构 docker 镜像",
  },
  {
    key: "brew",
    enLabel: "homebrew formula",
    zhLabel: "homebrew formula",
    enKind: "tap PR auto-bump",
    zhKind: "tap PR 自动升版",
  },
  {
    key: "checksum",
    enLabel: "checksums.txt",
    zhLabel: "checksums.txt",
    enKind: "signed manifest",
    zhKind: "签名 manifest",
  },
];

type ArtifactStatus = "queued" | "built" | "signed" | "pushed" | "done";

const statusOrder: ArtifactStatus[] = [
  "queued",
  "built",
  "signed",
  "pushed",
  "done",
];

function statusToStage(status: ArtifactStatus): StageKey {
  if (status === "queued") return "main";
  if (status === "built") return "ci";
  if (status === "signed") return "sign";
  if (status === "pushed") return "upload";
  return "mirror";
}

function statusLabel(status: ArtifactStatus, lang: Lang) {
  if (lang === "zh") {
    if (status === "queued") return "排队";
    if (status === "built") return "构建完成";
    if (status === "signed") return "已签名";
    if (status === "pushed") return "已上传";
    return "完成";
  }
  if (status === "queued") return "queued";
  if (status === "built") return "built";
  if (status === "signed") return "signed";
  if (status === "pushed") return "pushed";
  return "done";
}

interface Props {
  lang: Lang;
}

export default function ReleaseArtifactConveyor({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [statuses, setStatuses] = useState<Record<ArtifactKind, ArtifactStatus>>(
    () => {
      const next = {} as Record<ArtifactKind, ArtifactStatus>;
      for (const artifact of artifacts) {
        next[artifact.key] = "queued";
      }
      return next;
    },
  );
  const [running, setRunning] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      for (const id of timersRef.current) {
        window.clearTimeout(id);
      }
      timersRef.current = [];
    };
  }, []);

  function clearTimers() {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }

  function runRelease() {
    if (running) return;
    clearTimers();
    setRunning(true);
    setStatuses(() => {
      const next = {} as Record<ArtifactKind, ArtifactStatus>;
      for (const artifact of artifacts) {
        next[artifact.key] = "queued";
      }
      return next;
    });

    const stepDelay = 280;
    let stepIndex = 0;

    artifacts.forEach((artifact, artifactIndex) => {
      statusOrder.slice(1).forEach((status) => {
        stepIndex += 1;
        const id = window.setTimeout(
          () => {
            setStatuses((prev) => ({ ...prev, [artifact.key]: status }));
          },
          stepIndex * stepDelay + artifactIndex * 40,
        );
        timersRef.current.push(id);
      });
    });

    const finishId = window.setTimeout(
      () => {
        setRunning(false);
      },
      stepIndex * stepDelay + 600,
    );
    timersRef.current.push(finishId);
  }

  function resetRelease() {
    clearTimers();
    setRunning(false);
    setStatuses(() => {
      const next = {} as Record<ArtifactKind, ArtifactStatus>;
      for (const artifact of artifacts) {
        next[artifact.key] = "queued";
      }
      return next;
    });
  }

  const totals = useMemo(() => {
    const counts = {
      queued: 0,
      built: 0,
      signed: 0,
      pushed: 0,
      done: 0,
    } as Record<ArtifactStatus, number>;
    for (const artifact of artifacts) {
      counts[statuses[artifact.key]] += 1;
    }
    return counts;
  }, [statuses]);

  function statusColor(status: ArtifactStatus) {
    if (status === "queued") return colors.textMuted;
    if (status === "built") return colors.info;
    if (status === "signed") return colors.warning;
    if (status === "pushed") return colors.accent;
    return colors.success;
  }

  return (
    <InteractiveFigure
      lang={lang}
      title="From green main to published binaries"
      zhTitle="从 main 绿灯到发布物"
      subtitle="Run the release to watch each artifact ride down the conveyor belt."
      zhSubtitle="点击 Run release，观察每个 artifact 在传送带上前进。"
      caption="Every artifact passes the same stages — built, signed, pushed, mirrored. The matrix expands per OS, per arch, per package."
      zhCaption="每个 artifact 都经过相同的 stage：built、signed、pushed、mirror；矩阵按 OS、arch、package 展开。"
      badge="Chapter 24"
      zhBadge="第 24 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            padding: 10,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
          }}
        >
          <button
            onClick={runRelease}
            disabled={running}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${colors.accent}`,
              background: running ? colors.accentSoft : colors.accent,
              color: running ? colors.accent : colors.panel,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              cursor: running ? "wait" : "pointer",
            }}
          >
            {running
              ? lang === "zh"
                ? "发布中…"
                : "Running…"
              : lang === "zh"
                ? "Run release"
                : "Run release"}
          </button>
          <button
            onClick={resetRelease}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: `1px solid ${colors.softBorder}`,
              background: colors.panel,
              color: colors.text,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {lang === "zh" ? "重置" : "Reset"}
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
              marginLeft: "auto",
            }}
          >
            {lang === "zh" ? "完成" : "done"}{" "}
            <strong style={{ color: colors.success }}>{totals.done}</strong>
            {" / "}
            {artifacts.length}
          </span>
        </div>

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
              display: "grid",
              gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
              gap: 6,
              alignItems: "stretch",
            }}
          >
            {stages.map((stage, index) => (
              <div
                key={stage.key}
                style={{
                  position: "relative",
                  padding: "8px 6px",
                  borderRadius: 8,
                  background: colors.background,
                  border: `1px solid ${colors.softBorder}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: colors.textMuted,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: colors.text,
                  }}
                >
                  {localized(lang, stage.enLabel, stage.zhLabel)}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    color: colors.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {localized(lang, stage.enHint, stage.zhHint)}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 8,
              border: `1px solid ${colors.softBorder}`,
              background: colors.background,
              padding: 8,
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 4,
                transform: "translateY(-50%)",
                background:
                  mode === "light"
                    ? "repeating-linear-gradient(90deg, #d6cdb0 0 8px, #f5f1e2 8px 16px)"
                    : "repeating-linear-gradient(90deg, #3d3a35 0 8px, #28272a 8px 16px)",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {artifacts.map((artifact) => {
                const status = statuses[artifact.key];
                const stage = statusToStage(status);
                const stageIndex = stages.findIndex((s) => s.key === stage);
                const ratio = stageIndex / (stages.length - 1);
                return (
                  <div
                    key={artifact.key}
                    style={{
                      position: "relative",
                      height: 26,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(${ratio * 100}% - 12px)`,
                        top: 0,
                        bottom: 0,
                        width: "auto",
                        minWidth: 24,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: statusColor(status),
                        color:
                          status === "queued" ? colors.text : colors.panel,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "left 0.32s ease",
                        boxShadow:
                          mode === "light"
                            ? "0 1px 2px rgba(0,0,0,0.08)"
                            : "0 1px 2px rgba(0,0,0,0.4)",
                      }}
                      title={localized(lang, artifact.enLabel, artifact.zhLabel)}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background:
                            status === "queued"
                              ? colors.textMuted
                              : colors.panel,
                          opacity: 0.85,
                        }}
                      />
                      {localized(lang, artifact.enLabel, artifact.zhLabel)}
                      <span style={{ opacity: 0.85 }}>
                        · {statusLabel(status, lang)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
              borderRadius: 10,
              background: colors.panel,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 6,
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
              {lang === "zh" ? "发布矩阵" : "Release matrix"}
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
            >
              <thead>
                <tr style={{ color: colors.textMuted }}>
                  <th style={{ textAlign: "left", padding: "4px 6px" }}>
                    {lang === "zh" ? "产物" : "artifact"}
                  </th>
                  <th style={{ textAlign: "left", padding: "4px 6px" }}>
                    {lang === "zh" ? "类型" : "kind"}
                  </th>
                  <th style={{ textAlign: "right", padding: "4px 6px" }}>
                    {lang === "zh" ? "状态" : "status"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {artifacts.map((artifact) => {
                  const status = statuses[artifact.key];
                  return (
                    <tr
                      key={`row-${artifact.key}`}
                      style={{
                        borderTop: `1px solid ${colors.softBorder}`,
                      }}
                    >
                      <td
                        style={{
                          padding: "5px 6px",
                          fontFamily: "var(--font-mono)",
                          color: colors.text,
                        }}
                      >
                        {localized(lang, artifact.enLabel, artifact.zhLabel)}
                      </td>
                      <td
                        style={{
                          padding: "5px 6px",
                          color: colors.textMuted,
                        }}
                      >
                        {localized(lang, artifact.enKind, artifact.zhKind)}
                      </td>
                      <td
                        style={{
                          padding: "5px 6px",
                          textAlign: "right",
                          fontFamily: "var(--font-mono)",
                          color: statusColor(status),
                          fontWeight: 700,
                        }}
                      >
                        {statusLabel(status, lang)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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
              {lang === "zh" ? "状态汇总" : "Status summary"}
            </div>
            {statusOrder.map((status) => {
              const count = totals[status];
              const ratio = count / artifacts.length;
              return (
                <div
                  key={status}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 36px",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: statusColor(status),
                      fontWeight: 700,
                    }}
                  >
                    {statusLabel(status, lang)}
                  </span>
                  <div
                    style={{
                      position: "relative",
                      height: 10,
                      background: colors.track,
                      borderRadius: 5,
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
                        width: `${ratio * 100}%`,
                        background: statusColor(status),
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textAlign: "right",
                      color: colors.text,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                marginTop: 4,
                paddingTop: 8,
                borderTop: `1px dashed ${colors.softBorder}`,
                fontSize: 11.5,
                color: colors.textMuted,
                lineHeight: 1.55,
              }}
            >
              {lang === "zh"
                ? "checksum 与 signature 是发布物的一部分；mirror 步骤负责把内容回填到 CDN 与公司镜像。"
                : "checksums and signatures are part of the release; the mirror stage back-fills CDN and corporate mirrors."}
            </div>
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}
