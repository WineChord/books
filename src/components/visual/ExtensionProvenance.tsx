import React, { useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type Status = "pass" | "fail" | "warn";

type StepKey =
  | "author"
  | "sign"
  | "publish"
  | "pull"
  | "verify"
  | "sandbox"
  | "grant";

interface Step {
  key: StepKey;
  enLabel: string;
  zhLabel: string;
  enHint: string;
  zhHint: string;
}

const STEPS: Step[] = [
  {
    key: "author",
    enLabel: "Author",
    zhLabel: "作者",
    enHint: "Developer prepares the manifest + bundle.",
    zhHint: "开发者准备 manifest 与 bundle。",
  },
  {
    key: "sign",
    enLabel: "Sign manifest",
    zhLabel: "签名 manifest",
    enHint: "Author key signs the bundle digest.",
    zhHint: "作者密钥对 bundle 摘要进行签名。",
  },
  {
    key: "publish",
    enLabel: "Publish to registry",
    zhLabel: "发布到 registry",
    enHint: "Bundle + signature uploaded together.",
    zhHint: "bundle 与签名一同上传到 registry。",
  },
  {
    key: "pull",
    enLabel: "Codex pulls with hash",
    zhLabel: "Codex 按 hash 拉取",
    enHint: "Hash-pinned download; mirrors are not trusted.",
    zhHint: "按 hash 锚定下载；mirror 不被信任。",
  },
  {
    key: "verify",
    enLabel: "Verify signature",
    zhLabel: "验证签名",
    enHint: "Signature matched against the trusted keyring.",
    zhHint: "与可信公钥环比对签名。",
  },
  {
    key: "sandbox",
    enLabel: "Sandbox load",
    zhLabel: "Sandbox 加载",
    enHint: "Bundle mounted into the read/exec sandbox.",
    zhHint: "bundle 挂载到 read/exec sandbox。",
  },
  {
    key: "grant",
    enLabel: "Granted scope",
    zhLabel: "授予权限",
    enHint: "Capability scope handed to the runtime.",
    zhHint: "能力范围交给 runtime。",
  },
];

interface Extension {
  key: string;
  enName: string;
  zhName: string;
  enTag: string;
  zhTag: string;
  results: Record<StepKey, Status>;
  enSummary: string;
  zhSummary: string;
  enDecision: string;
  zhDecision: string;
  decisionTone: "good" | "bad" | "warn";
  enScopes: string[];
  zhScopes: string[];
}

const EXTENSIONS: Extension[] = [
  {
    key: "first-party",
    enName: "first-party-skill",
    zhName: "first-party-skill",
    enTag: "Trusted publisher",
    zhTag: "可信发布者",
    results: {
      author: "pass",
      sign: "pass",
      publish: "pass",
      pull: "pass",
      verify: "pass",
      sandbox: "pass",
      grant: "pass",
    },
    enSummary:
      "Manifest is signed by a maintainer key; bundle hash matches the registry; sandbox accepted the load with no policy violations.",
    zhSummary:
      "manifest 由维护者密钥签名；bundle hash 与 registry 完全一致；sandbox 接受加载且未触发任何策略违规。",
    enDecision:
      "GRANTED · Skill loads silently and receives its full requested scope; no extra consent prompt.",
    zhDecision:
      "已授予 · skill 静默加载并获得完整请求的权限范围；无需额外用户确认。",
    decisionTone: "good",
    enScopes: ["read: repo", "tool: ripgrep", "tool: format"],
    zhScopes: ["read: repo", "tool: ripgrep", "tool: format"],
  },
  {
    key: "bad-sig",
    enName: "community-skill-with-bad-sig",
    zhName: "community-skill-with-bad-sig",
    enTag: "Failed gate",
    zhTag: "未通过 gate",
    results: {
      author: "pass",
      sign: "pass",
      publish: "pass",
      pull: "pass",
      verify: "fail",
      sandbox: "fail",
      grant: "fail",
    },
    enSummary:
      "Signature does not chain to any key in the trusted ring. The pull aborts at verify; the binary is never executed.",
    zhSummary:
      "签名无法链接到可信公钥环中的任何密钥；在 verify 阶段终止；二进制从未被执行。",
    enDecision:
      "REJECTED · Load aborted at verify. Event written to the provenance ledger; user is prompted to report the registry mirror.",
    zhDecision:
      "已拒绝 · 在 verify 阶段终止加载；事件写入 provenance 账本；提示用户上报这一 registry mirror。",
    decisionTone: "bad",
    enScopes: [],
    zhScopes: [],
  },
  {
    key: "unsigned",
    enName: "unsigned-prototype",
    zhName: "unsigned-prototype",
    enTag: "Dev mode only",
    zhTag: "仅 dev 模式",
    results: {
      author: "pass",
      sign: "warn",
      publish: "warn",
      pull: "pass",
      verify: "warn",
      sandbox: "warn",
      grant: "warn",
    },
    enSummary:
      "No signature is present. Codex tags the bundle as 'unverified' and only loads it because CODEX_DEV=1 is set.",
    zhSummary:
      "未提供签名；Codex 把 bundle 标记为 'unverified'，仅在 CODEX_DEV=1 时加载。",
    enDecision:
      "WARN · Dev-mode load with a persistent banner; production runtime would refuse this bundle.",
    zhDecision:
      "警告 · dev 模式加载并显示持久横幅；production runtime 会直接拒绝此 bundle。",
    decisionTone: "warn",
    enScopes: ["read: cwd (dev)", "tool: shell (dev)"],
    zhScopes: ["read: cwd（dev）", "tool: shell（dev）"],
  },
];

type Colors = (typeof palette)["light"];

function statusInk(status: Status, colors: Colors) {
  if (status === "pass") {
    return { stroke: colors.success, soft: colors.successSoft };
  }
  if (status === "fail") {
    return { stroke: colors.accent, soft: colors.accentSoft };
  }
  return { stroke: colors.warning, soft: colors.warningSoft };
}

function statusBadge(status: Status): string {
  return status === "pass" ? "PASS" : status === "fail" ? "FAIL" : "WARN";
}

interface Props {
  lang: Lang;
}

export default function ExtensionProvenance({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [activeKey, setActiveKey] = useState<string>(EXTENSIONS[0].key);
  const ext =
    EXTENSIONS.find((entry) => entry.key === activeKey) ?? EXTENSIONS[0];

  const decisionTone =
    ext.decisionTone === "good"
      ? colors.success
      : ext.decisionTone === "bad"
      ? colors.accent
      : colors.warning;
  const decisionSoft =
    ext.decisionTone === "good"
      ? colors.successSoft
      : ext.decisionTone === "bad"
      ? colors.accentSoft
      : colors.warningSoft;

  return (
    <InteractiveFigure
      lang={lang}
      title="Provenance chain for an extension"
      zhTitle="扩展的证明链"
      subtitle="Pick an extension and walk the seven gates from the author's keystroke to a granted runtime scope."
      zhSubtitle="选择一个扩展，逐一走过从作者键入到 runtime 授权的七道关卡。"
      caption="A single FAIL aborts the pipeline. Dev-mode bundles still surface every warning instead of being silently approved."
      zhCaption="任意一道 FAIL 都会终止 pipeline；dev 模式 bundle 仍会暴露所有警告，绝不静默通过。"
      badge="Chapter 18"
      zhBadge="第 18 章"
    >
      <div
        role="tablist"
        aria-label={lang === "zh" ? "示例扩展" : "Example extensions"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        {EXTENSIONS.map((entry) => {
          const active = entry.key === activeKey;
          const tone =
            entry.decisionTone === "good"
              ? colors.success
              : entry.decisionTone === "bad"
              ? colors.accent
              : colors.warning;
          return (
            <button
              key={entry.key}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveKey(entry.key)}
              style={{
                background: active ? tone : colors.panel,
                color: active ? "#ffffff" : colors.text,
                border: `1px solid ${active ? tone : colors.border}`,
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
              <span>{localized(lang, entry.enName, entry.zhName)}</span>
              <span
                style={{
                  fontSize: 10.5,
                  opacity: active ? 0.9 : 0.65,
                  fontWeight: 500,
                }}
              >
                · {localized(lang, entry.enTag, entry.zhTag)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
            padding: 10,
            background: colors.background,
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 6,
              minWidth: "max-content",
            }}
          >
            {STEPS.map((step, idx) => {
              const status = ext.results[step.key];
              const sc = statusInk(status, colors);
              const nextStatus =
                idx < STEPS.length - 1
                  ? ext.results[STEPS[idx + 1].key]
                  : null;
              return (
                <React.Fragment key={step.key}>
                  <div
                    style={{
                      minWidth: 142,
                      maxWidth: 172,
                      border: `1.5px solid ${sc.stroke}`,
                      background: sc.soft,
                      borderRadius: 10,
                      padding: "10px 10px 8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10.5,
                          color: colors.textMuted,
                          fontWeight: 600,
                        }}
                      >
                        {idx + 1} / {STEPS.length}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10.5,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          color: sc.stroke,
                          background:
                            mode === "light" ? "#ffffff" : colors.panel,
                          border: `1px solid ${sc.stroke}`,
                          borderRadius: 999,
                          padding: "1px 8px",
                        }}
                      >
                        {statusBadge(status)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 12.5,
                        color: colors.text,
                        lineHeight: 1.3,
                      }}
                    >
                      {localized(lang, step.enLabel, step.zhLabel)}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: colors.textMuted,
                        lineHeight: 1.45,
                      }}
                    >
                      {localized(lang, step.enHint, step.zhHint)}
                    </div>
                  </div>
                  {nextStatus ? (
                    <div
                      aria-hidden
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          nextStatus === "fail"
                            ? colors.accent
                            : nextStatus === "warn"
                            ? colors.warning
                            : colors.textMuted,
                        fontSize: 14,
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                      }}
                    >
                      →
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div
          style={{
            border: `1px solid ${decisionTone}55`,
            borderRadius: 10,
            background: decisionSoft,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: decisionTone,
              fontWeight: 700,
            }}
          >
            {lang === "zh" ? "Codex 策略决策" : "Codex policy decision"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            {localized(lang, ext.enName, ext.zhName)}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              lineHeight: 1.55,
              color: colors.text,
            }}
          >
            {localized(lang, ext.enSummary, ext.zhSummary)}
          </p>

          <div
            style={{
              borderTop: `1px solid ${decisionTone}33`,
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: colors.textMuted,
              }}
            >
              {lang === "zh" ? "结果" : "Outcome"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                color: decisionTone,
                lineHeight: 1.45,
              }}
            >
              {localized(lang, ext.enDecision, ext.zhDecision)}
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${decisionTone}33`,
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: colors.textMuted,
              }}
            >
              {lang === "zh" ? "授予的能力" : "Granted capabilities"}
            </div>
            {ext.enScopes.length === 0 ? (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  color: colors.textMuted,
                  fontStyle: "italic",
                }}
              >
                {lang === "zh" ? "无（已拒绝加载）" : "none (load refused)"}
              </span>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {localized(lang, ext.enScopes, ext.zhScopes).map((scope) => (
                  <code
                    key={scope}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11.5,
                      background:
                        mode === "light" ? "#ffffff" : colors.panel,
                      color: decisionTone,
                      border: `1px solid ${decisionTone}55`,
                      borderRadius: 6,
                      padding: "2px 6px",
                    }}
                  >
                    {scope}
                  </code>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Legend lang={lang} colors={colors} />
    </InteractiveFigure>
  );
}

function Legend({ lang, colors }: { lang: Lang; colors: Colors }) {
  const items: Array<{
    enLabel: string;
    zhLabel: string;
    ink: string;
    soft: string;
  }> = [
    {
      enLabel: "PASS — gate succeeded",
      zhLabel: "PASS — 通过本关",
      ink: colors.success,
      soft: colors.successSoft,
    },
    {
      enLabel: "WARN — gate degraded (dev only)",
      zhLabel: "WARN — 降级通过（仅 dev）",
      ink: colors.warning,
      soft: colors.warningSoft,
    },
    {
      enLabel: "FAIL — pipeline aborts",
      zhLabel: "FAIL — pipeline 终止",
      ink: colors.accent,
      soft: colors.accentSoft,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: colors.textMuted,
      }}
    >
      {items.map((item) => (
        <span
          key={item.enLabel}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: 4,
              background: item.soft,
              border: `1.5px solid ${item.ink}`,
            }}
          />
          {localized(lang, item.enLabel, item.zhLabel)}
        </span>
      ))}
    </div>
  );
}
