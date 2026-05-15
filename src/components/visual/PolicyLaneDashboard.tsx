import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type LaneKey = "consumer" | "enterprise" | "regulated" | "lab";

interface LaneConfig {
  key: LaneKey;
  enLabel: string;
  zhLabel: string;
  enTagline: string;
  zhTagline: string;
  sandbox: { en: string; zh: string };
  approval: { en: string; zh: string };
  telemetry: { en: string; zh: string };
  retention: { en: string; zh: string };
  tools: { en: string[]; zh: string[] };
  signatures: { en: string; zh: string };
  // Strictness score (0-100); higher means more locked-down.
  strictness: number;
}

const lanes: LaneConfig[] = [
  {
    key: "consumer",
    enLabel: "consumer",
    zhLabel: "consumer",
    enTagline: "Default for individuals on personal machines.",
    zhTagline: "面向个人开发者的默认选择。",
    sandbox: {
      en: "workspace-write (cwd only)",
      zh: "workspace-write（仅 cwd）",
    },
    approval: {
      en: "on-request (chat-driven approvals)",
      zh: "按需批准（聊天驱动）",
    },
    telemetry: {
      en: "opt-in usage metrics",
      zh: "按需开启使用指标",
    },
    retention: {
      en: "7 days, locally encrypted rollouts",
      zh: "本地加密 rollout，保留 7 天",
    },
    tools: {
      en: [
        "shell (sandboxed)",
        "apply_patch",
        "web fetch",
        "user-installed MCPs",
      ],
      zh: ["shell（沙箱）", "apply_patch", "web fetch", "用户安装的 MCP"],
    },
    signatures: {
      en: "signed binary, no extra org policy",
      zh: "签名的发行物，不附加企业 policy",
    },
    strictness: 25,
  },
  {
    key: "enterprise",
    enLabel: "enterprise",
    zhLabel: "enterprise",
    enTagline: "Org-managed deployment with policy bundle.",
    zhTagline: "企业管理的部署，带 policy bundle。",
    sandbox: {
      en: "workspace-write + network allow-list",
      zh: "workspace-write 加网络白名单",
    },
    approval: {
      en: "on-failure (auto-approve safe ops)",
      zh: "失败时再要求批准（安全操作自动批准）",
    },
    telemetry: {
      en: "required, scrubbed, sent to org collector",
      zh: "必填，脱敏后送到企业 collector",
    },
    retention: {
      en: "30 days, org-encrypted rollouts",
      zh: "企业加密 rollout，保留 30 天",
    },
    tools: {
      en: [
        "shell (sandboxed)",
        "apply_patch",
        "approved MCP catalog",
        "org SSO",
      ],
      zh: ["shell（沙箱）", "apply_patch", "审核过的 MCP 目录", "企业 SSO"],
    },
    signatures: {
      en: "signed binary + signed policy bundle",
      zh: "签名发行物 加 签名 policy bundle",
    },
    strictness: 55,
  },
  {
    key: "regulated",
    enLabel: "regulated",
    zhLabel: "regulated",
    enTagline: "Compliance-heavy environments (finance, health).",
    zhTagline: "金融、医疗等强合规环境。",
    sandbox: {
      en: "read-only (network blocked)",
      zh: "read-only（网络阻断）",
    },
    approval: {
      en: "untrusted (every shell needs approval)",
      zh: "untrusted（每条 shell 都需批准）",
    },
    telemetry: {
      en: "audit log only, no usage metrics",
      zh: "仅审计日志，不收集使用指标",
    },
    retention: {
      en: "365 days, WORM-stored, KMS encrypted",
      zh: "WORM 存储 365 天，KMS 加密",
    },
    tools: {
      en: [
        "no shell by default",
        "apply_patch (sandboxed)",
        "no MCPs",
        "no web fetch",
      ],
      zh: ["默认禁用 shell", "apply_patch（沙箱）", "禁用 MCP", "禁用 web fetch"],
    },
    signatures: {
      en: "signed binary + cosign + provenance attestation",
      zh: "签名发行物 加 cosign 加 provenance 证明",
    },
    strictness: 90,
  },
  {
    key: "lab",
    enLabel: "lab",
    zhLabel: "lab",
    enTagline: "Internal evaluations and capability research.",
    zhTagline: "内部评测与能力研究。",
    sandbox: {
      en: "danger-full-access (vetted hosts only)",
      zh: "danger-full-access（仅在审核过的机器上）",
    },
    approval: {
      en: "never (fully autonomous runs)",
      zh: "never（完全自动化）",
    },
    telemetry: {
      en: "verbose tracing, raw transcripts",
      zh: "详细追踪，包含原始 transcript",
    },
    retention: {
      en: "180 days, internal cluster",
      zh: "内部集群保留 180 天",
    },
    tools: {
      en: [
        "shell (full)",
        "apply_patch",
        "experimental MCPs",
        "internal eval harness",
      ],
      zh: ["shell（完整）", "apply_patch", "实验性 MCP", "内部 eval harness"],
    },
    signatures: {
      en: "internal build signed by lab CA",
      zh: "由 lab CA 签名的内部构建",
    },
    strictness: 10,
  },
];

interface RowConfig {
  key: keyof Pick<
    LaneConfig,
    "sandbox" | "approval" | "telemetry" | "retention" | "tools" | "signatures"
  >;
  enLabel: string;
  zhLabel: string;
}

const rows: RowConfig[] = [
  { key: "sandbox", enLabel: "default sandbox", zhLabel: "默认 sandbox" },
  { key: "approval", enLabel: "approval mode", zhLabel: "approval 模式" },
  { key: "telemetry", enLabel: "telemetry", zhLabel: "telemetry" },
  { key: "retention", enLabel: "retention", zhLabel: "保留期" },
  { key: "tools", enLabel: "allowed tools", zhLabel: "允许的工具" },
  {
    key: "signatures",
    enLabel: "required signatures",
    zhLabel: "签名要求",
  },
];

interface Props {
  lang: Lang;
}

export default function PolicyLaneDashboard({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [active, setActive] = useState<LaneKey>("enterprise");
  const [compareTo, setCompareTo] = useState<LaneKey>("regulated");

  const activeLane = lanes.find((lane) => lane.key === active)!;
  const compareLane = lanes.find((lane) => lane.key === compareTo)!;

  const { strictest, mostPermissive } = useMemo(() => {
    let strict = lanes[0];
    let lax = lanes[0];
    for (const lane of lanes) {
      if (lane.strictness > strict.strictness) strict = lane;
      if (lane.strictness < lax.strictness) lax = lane;
    }
    return { strictest: strict, mostPermissive: lax };
  }, []);

  function laneAccent(lane: LaneKey) {
    if (lane === "consumer") return colors.info;
    if (lane === "enterprise") return colors.accent;
    if (lane === "regulated") return colors.warning;
    return colors.success;
  }

  function rowValue(lane: LaneConfig, row: RowConfig): string {
    const value = lane[row.key];
    if (Array.isArray((value as { en: string[] }).en)) {
      const arr = lang === "zh"
        ? (value as { zh: string[] }).zh
        : (value as { en: string[] }).en;
      return arr.join(" · ");
    }
    const single = value as { en: string; zh: string };
    return localized(lang, single.en, single.zh);
  }

  return (
    <InteractiveFigure
      lang={lang}
      title="Four deployment policy lanes"
      zhTitle="四条部署 policy lane"
      subtitle="Click a lane to focus it; pick another lane in the radio group to diff against it."
      zhSubtitle="点击一条 lane 高亮，再用单选框选择对照 lane。"
      caption="Each lane bundles sandbox, approval, telemetry, retention, allowed tools, and signature requirements. Lanes are configurations, not features."
      zhCaption="每条 lane 把 sandbox、approval、telemetry、保留期、工具、签名打包；lane 是配置，不是新功能。"
      badge="Chapter 25"
      zhBadge="第 25 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${lanes.length}, minmax(0, 1fr))`,
            gap: 8,
          }}
        >
          {lanes.map((lane) => {
            const isActive = active === lane.key;
            const accent = laneAccent(lane.key);
            return (
              <button
                key={lane.key}
                onClick={() => setActive(lane.key)}
                aria-pressed={isActive}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1.6px solid ${
                    isActive ? accent : colors.softBorder
                  }`,
                  background: isActive ? colors.background : colors.panel,
                  color: colors.text,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: accent,
                    opacity: isActive ? 1 : 0.55,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? accent : colors.text,
                    marginTop: 4,
                  }}
                >
                  {localized(lang, lane.enLabel, lane.zhLabel)}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    lineHeight: 1.45,
                  }}
                >
                  {localized(lang, lane.enTagline, lane.zhTagline)}
                </span>
                <span
                  style={{
                    marginTop: 4,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: accent,
                    fontWeight: 700,
                  }}
                >
                  {lang === "zh" ? "严格度" : "strictness"} {lane.strictness}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
            background: colors.background,
            padding: 12,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color: colors.textMuted,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {lang === "zh" ? "对照 lane" : "compare against"}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {lanes
              .filter((lane) => lane.key !== active)
              .map((lane) => {
                const checked = compareTo === lane.key;
                const accent = laneAccent(lane.key);
                return (
                  <label
                    key={`compare-${lane.key}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 9px",
                      borderRadius: 7,
                      border: `1px solid ${
                        checked ? accent : colors.softBorder
                      }`,
                      background: checked ? colors.panel : colors.background,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11.5,
                      color: checked ? accent : colors.text,
                      fontWeight: 600,
                    }}
                  >
                    <input
                      type="radio"
                      name="policy-lane-compare"
                      value={lane.key}
                      checked={checked}
                      onChange={() => setCompareTo(lane.key)}
                      style={{ accentColor: accent }}
                    />
                    {localized(lang, lane.enLabel, lane.zhLabel)}
                  </label>
                );
              })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              background: colors.panel,
              padding: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `160px repeat(${lanes.length}, minmax(0, 1fr))`,
                background: colors.background,
                borderBottom: `1px solid ${colors.softBorder}`,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                color: colors.textMuted,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ padding: "8px 10px" }}>
                {lang === "zh" ? "维度" : "facet"}
              </div>
              {lanes.map((lane) => {
                const isActive = active === lane.key;
                const accent = laneAccent(lane.key);
                return (
                  <div
                    key={`head-${lane.key}`}
                    style={{
                      padding: "8px 10px",
                      color: isActive ? accent : colors.textMuted,
                      fontWeight: isActive ? 800 : 700,
                      borderLeft: `1px solid ${colors.softBorder}`,
                    }}
                  >
                    {localized(lang, lane.enLabel, lane.zhLabel)}
                  </div>
                );
              })}
            </div>
            {rows.map((row, rowIndex) => (
              <div
                key={`row-${row.key}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `160px repeat(${lanes.length}, minmax(0, 1fr))`,
                  borderTop:
                    rowIndex === 0
                      ? "none"
                      : `1px solid ${colors.softBorder}`,
                }}
              >
                <div
                  style={{
                    padding: "8px 10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: colors.textMuted,
                    background: colors.background,
                  }}
                >
                  {localized(lang, row.enLabel, row.zhLabel)}
                </div>
                {lanes.map((lane) => {
                  const isActive = active === lane.key;
                  const isCompare = compareTo === lane.key;
                  const text = rowValue(lane, row);
                  const otherText = isActive
                    ? rowValue(compareLane, row)
                    : isCompare
                      ? rowValue(activeLane, row)
                      : null;
                  const differs =
                    otherText !== null && otherText !== text;
                  return (
                    <div
                      key={`cell-${lane.key}-${row.key}`}
                      style={{
                        padding: "8px 10px",
                        fontSize: 12,
                        color: colors.text,
                        background: isActive
                          ? colors.background
                          : colors.panel,
                        borderLeft: `1px solid ${colors.softBorder}`,
                        outline:
                          differs && (isActive || isCompare)
                            ? `1.5px solid ${laneAccent(lane.key)}`
                            : "none",
                        outlineOffset: "-1.5px",
                        position: "relative",
                      }}
                    >
                      {text}
                      {differs && (isActive || isCompare) ? (
                        <span
                          style={{
                            display: "inline-block",
                            marginLeft: 6,
                            padding: "0 6px",
                            borderRadius: 4,
                            background: laneAccent(lane.key),
                            color: colors.panel,
                            fontFamily: "var(--font-mono)",
                            fontSize: 9.5,
                            fontWeight: 700,
                            verticalAlign: "middle",
                          }}
                        >
                          {lang === "zh" ? "差异" : "diff"}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
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
                border: `1px solid ${laneAccent(active)}`,
                borderLeftWidth: 4,
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
                  fontSize: 10.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: laneAccent(active),
                  fontWeight: 700,
                }}
              >
                {lang === "zh" ? "聚焦 lane" : "focused lane"}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                {localized(lang, activeLane.enLabel, activeLane.zhLabel)}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>
                {localized(lang, activeLane.enTagline, activeLane.zhTagline)}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11.5,
                  color: colors.text,
                  fontFamily: "var(--font-mono)",
                }}
              >
                vs.{" "}
                <span
                  style={{
                    color: laneAccent(compareTo),
                    fontWeight: 700,
                  }}
                >
                  {localized(lang, compareLane.enLabel, compareLane.zhLabel)}
                </span>
              </div>
            </div>

            <div
              style={{
                border: `1px solid ${colors.softBorder}`,
                borderRadius: 10,
                background: colors.background,
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
                {lang === "zh" ? "总览" : "Overview"}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  padding: 8,
                  borderRadius: 7,
                  background: colors.warningSoft,
                  border: `1px solid ${colors.warning}55`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: colors.warning,
                    fontWeight: 700,
                  }}
                >
                  {lang === "zh" ? "最严格" : "strictest"}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: colors.text,
                  }}
                >
                  {localized(lang, strictest.enLabel, strictest.zhLabel)}{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: colors.textMuted,
                    }}
                  >
                    ({strictest.strictness})
                  </span>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  padding: 8,
                  borderRadius: 7,
                  background: colors.successSoft,
                  border: `1px solid ${colors.success}55`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: colors.success,
                    fontWeight: 700,
                  }}
                >
                  {lang === "zh" ? "最宽松" : "most permissive"}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: colors.text,
                  }}
                >
                  {localized(
                    lang,
                    mostPermissive.enLabel,
                    mostPermissive.zhLabel,
                  )}{" "}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: colors.textMuted,
                    }}
                  >
                    ({mostPermissive.strictness})
                  </span>
                </span>
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: colors.textMuted,
                  lineHeight: 1.55,
                  borderTop: `1px dashed ${colors.softBorder}`,
                  paddingTop: 6,
                }}
              >
                {lang === "zh"
                  ? "lane 之间的差距来自策略，不来自代码：同一份 codex 二进制可以服务所有 lane。"
                  : "The gap between lanes comes from policy, not code: the same codex binary serves every lane."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}
