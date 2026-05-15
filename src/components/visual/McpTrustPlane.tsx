import React, { useEffect, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type Transport = "stdio" | "http" | "unix";
type TrustMode = "signed" | "unsigned" | "sandboxed";
type Scope = "read" | "write" | "network";
type VerifyState = "idle" | "pending" | "ok" | "fail";

interface BiText {
  en: string;
  zh: string;
}

interface McpServer {
  id: string;
  name: string;
  enRole: string;
  zhRole: string;
  transport: Transport;
  trustMode: TrustMode;
  scopes: Scope[];
  publisher: string;
  signer: string;
  signatureOk: boolean;
  signatureNote: BiText;
  manifestDigest: string;
  requested: Scope[];
  granted: Scope[];
  narrow: BiText;
  approval: string;
}

const servers: McpServer[] = [
  {
    id: "fs-local",
    name: "fs-local",
    enRole: "Read & write the repo with sandbox bracketing.",
    zhRole: "在 sandbox 限定下读写本地仓库。",
    transport: "stdio",
    trustMode: "signed",
    scopes: ["read", "write"],
    publisher: "openai-tools",
    signer: "openai-tools (verified)",
    signatureOk: true,
    signatureNote: {
      en: "Signature chain leads to a vendored OpenAI tools root.",
      zh: "签名链回溯到内置的 OpenAI tools 根证书。",
    },
    manifestDigest: "sha256:9d8f\u20264321b14a",
    requested: ["read", "write", "network"],
    granted: ["read", "write"],
    narrow: {
      en: "Network scope stripped: server is not on the network allowlist.",
      zh: "已剥离 network 权限：该 server 不在 network allowlist 中。",
    },
    approval: `Allow fs-local to write /repo/cart.ts ?
  scopes:    read, write
  publisher: openai-tools (signed)
  digest:    sha256:9d8f\u20264321b14a
  [y] approve once  [a] always  [n] deny`,
  },
  {
    id: "github-tools",
    name: "github-tools",
    enRole: "Read PRs and post review comments.",
    zhRole: "读取 PR 并发表 review 评论。",
    transport: "http",
    trustMode: "signed",
    scopes: ["read", "network"],
    publisher: "github",
    signer: "github inc. (verified)",
    signatureOk: true,
    signatureNote: {
      en: "Manifest pinned by digest; signer rotates monthly via sigstore.",
      zh: "manifest 通过 digest 固定；签名者每月通过 sigstore 轮换。",
    },
    manifestDigest: "sha256:1a73\u20262d8af04c",
    requested: ["read", "write", "network"],
    granted: ["read", "network"],
    narrow: {
      en: "Write scope dropped: tool token only carries pull_request:read.",
      zh: "已剥离 write 权限：tool token 仅持有 pull_request:read。",
    },
    approval: `Allow github-tools to POST /reviews ?
  scopes:    read, network
  publisher: github (signed)
  network:   api.github.com (allowed)
  [y] approve once  [a] always  [n] deny`,
  },
  {
    id: "jira-bridge",
    name: "jira-bridge",
    enRole: "Sync issue status from JIRA.",
    zhRole: "同步 JIRA 工单状态。",
    transport: "http",
    trustMode: "unsigned",
    scopes: ["read", "network"],
    publisher: "community/jira-bridge",
    signer: "(no signature)",
    signatureOk: false,
    signatureNote: {
      en: "No signature attached. Server is auto-quarantined into sandboxed mode.",
      zh: "未附加签名，server 已自动隔离到 sandboxed 模式。",
    },
    manifestDigest: "sha256:c2ac\u20269fe17e\u00b71",
    requested: ["read", "write", "network"],
    granted: ["read"],
    narrow: {
      en: "Unsigned server: write and network are both quarantined behind the sandbox runner.",
      zh: "未签名的 server：write 与 network 都被隔离在 sandbox runner 之后。",
    },
    approval: `Allow jira-bridge (UNSIGNED) to GET /issues ?
  scopes:    read (sandboxed)
  publisher: community/jira-bridge
  warning:   signature missing -- downgraded
  [y] approve once  [a] always  [n] deny`,
  },
  {
    id: "ssh-runner",
    name: "ssh-runner",
    enRole: "Run remote commands on the staging host.",
    zhRole: "在 staging 主机执行远程命令。",
    transport: "unix",
    trustMode: "sandboxed",
    scopes: ["network"],
    publisher: "internal/staging-ops",
    signer: "internal/staging-ops",
    signatureOk: true,
    signatureNote: {
      en: "Signed by an internal CA. Trust mode pinned to sandboxed for blast radius.",
      zh: "由内部 CA 签发。出于爆炸半径考虑，trust mode 固定为 sandboxed。",
    },
    manifestDigest: "sha256:71be\u20260a4e2204",
    requested: ["read", "write", "network"],
    granted: ["network"],
    narrow: {
      en: "Only `ssh` egress and stdout survive; local fs writes are dropped.",
      zh: "只保留 `ssh` 出网与 stdout；本地 fs 写权限被剥离。",
    },
    approval: `Allow ssh-runner to call ssh staging "deploy" ?
  scopes:    network (sandboxed)
  publisher: internal/staging-ops (signed)
  network:   ssh://staging.example (allowed)
  [y] approve once  [a] always  [n] deny`,
  },
  {
    id: "db-readonly",
    name: "db-readonly",
    enRole: "Run analytics SELECTs against the warehouse.",
    zhRole: "对数仓发起分析型 SELECT。",
    transport: "stdio",
    trustMode: "signed",
    scopes: ["read", "network"],
    publisher: "data-team",
    signer: "data-team (verified)",
    signatureOk: true,
    signatureNote: {
      en: "Signed against the data-team root. Manifest forbids INSERT/UPDATE.",
      zh: "由 data-team 根证书签发，manifest 明确禁止 INSERT/UPDATE。",
    },
    manifestDigest: "sha256:4f00\u202613b1aa9d",
    requested: ["read", "write", "network"],
    granted: ["read", "network"],
    narrow: {
      en: "Write scope rejected per manifest; only SELECT-equivalent calls remain.",
      zh: "manifest 拒绝了 write 权限，仅保留 SELECT 等价调用。",
    },
    approval: `Allow db-readonly to run SELECT on warehouse.events ?
  scopes:    read, network
  publisher: data-team (signed)
  [y] approve once  [a] always  [n] deny`,
  },
];

interface Props {
  lang: Lang;
}

export default function McpTrustPlane({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [active, setActive] = useState<string>(servers[0].id);
  const [verifyState, setVerifyState] = useState<Record<string, VerifyState>>(
    () => Object.fromEntries(servers.map((s) => [s.id, "idle"])),
  );
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    },
    [],
  );

  const server = servers.find((s) => s.id === active) ?? servers[0];

  const runVerify = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setRunning(true);
    setVerifyState(Object.fromEntries(servers.map((s) => [s.id, "idle"])));
    servers.forEach((s, index) => {
      const startId = window.setTimeout(() => {
        setVerifyState((prev) => ({ ...prev, [s.id]: "pending" }));
      }, 120 + index * 320);
      const endId = window.setTimeout(() => {
        setVerifyState((prev) => ({
          ...prev,
          [s.id]: s.signatureOk ? "ok" : "fail",
        }));
        if (index === servers.length - 1) {
          setRunning(false);
        }
      }, 120 + index * 320 + 260);
      timers.current.push(startId, endId);
    });
  };

  const trustStyle = (
    m: TrustMode,
  ): { fg: string; bg: string; border: string } => {
    if (m === "signed") {
      return {
        fg: colors.success,
        bg: colors.successSoft,
        border: colors.success,
      };
    }
    if (m === "sandboxed") {
      return { fg: colors.info, bg: colors.infoSoft, border: colors.info };
    }
    return {
      fg: colors.warning,
      bg: colors.warningSoft,
      border: colors.warning,
    };
  };

  const codeBg = mode === "light" ? "#1f1f1c" : "#0d0d0c";
  const codeText = "#f5f1e2";

  return (
    <InteractiveFigure
      lang={lang}
      title="External tools, signed and scoped"
      zhTitle="已签名且受范围限制的外部工具"
      subtitle="Inspect each MCP server's provenance, requested capabilities, and the narrower set Codex actually grants."
      zhSubtitle="查看每个 MCP server 的来源、它请求了哪些能力，以及 Codex 真正放行的更窄子集。"
      caption="Trust is a per-server filter, not a global switch. Unsigned servers stay usable, but only through the sandbox runner."
      zhCaption="信任是每个 server 单独的过滤器，而不是全局开关。未签名的 server 仍然可用，但只能走 sandbox runner。"
      badge="Chapter 17"
      zhBadge="第 17 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
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
            {lang === "zh" ? "已注册的 MCP server" : "Registered MCP servers"}
          </div>
          <button
            onClick={runVerify}
            disabled={running}
            style={{
              cursor: running ? "wait" : "pointer",
              padding: "6px 14px",
              borderRadius: 999,
              border: `1.4px solid ${colors.accent}`,
              background: running ? colors.accentSoft : colors.accent,
              color: running ? colors.accentHover : "#fdfaf2",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              transition: "background 120ms ease",
            }}
          >
            {running
              ? lang === "zh"
                ? "验证中\u2026"
                : "verifying\u2026"
              : lang === "zh"
              ? "Verify all (验证全部)"
              : "Verify all"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {servers.map((s) => {
            const isActive = s.id === active;
            const v = verifyState[s.id];
            const trust = trustStyle(s.trustMode);
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={isActive}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: `1.5px solid ${
                    isActive ? colors.accent : colors.softBorder
                  }`,
                  background: isActive ? colors.accentSoft : colors.panel,
                  color: colors.text,
                  display: "grid",
                  gridTemplateColumns: "26px 1.4fr 0.9fr 0.9fr 1.5fr",
                  gap: 10,
                  alignItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  transition: "background 120ms ease, border-color 120ms ease",
                }}
              >
                <VerifyMark state={v} colors={colors} />
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 700, color: colors.text }}>
                    {s.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: colors.textMuted,
                      lineHeight: 1.4,
                    }}
                  >
                    {localized(lang, s.enRole, s.zhRole)}
                  </span>
                </span>
                <Pill
                  label={s.transport}
                  fg={colors.text}
                  bg={colors.track}
                  border={colors.softBorder}
                />
                <Pill
                  label={s.trustMode}
                  fg={trust.fg}
                  bg={trust.bg}
                  border={trust.border}
                />
                <ScopeRow scopes={s.scopes} colors={colors} />
              </button>
            );
          })}
        </div>

        <ServerDetail
          server={server}
          lang={lang}
          colors={colors}
          codeBg={codeBg}
          codeText={codeText}
        />
      </div>
    </InteractiveFigure>
  );
}

type Colors = (typeof palette)[keyof typeof palette];

function VerifyMark({
  state,
  colors,
}: {
  state: VerifyState;
  colors: Colors;
}) {
  let fg = colors.textMuted;
  let label = "\u00b7";
  if (state === "pending") {
    fg = colors.info;
    label = "\u2026";
  } else if (state === "ok") {
    fg = colors.success;
    label = "\u2713";
  } else if (state === "fail") {
    fg = colors.warning;
    label = "\u2717";
  }
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: 999,
        border: `1.5px solid ${fg}`,
        color: fg,
        background: "transparent",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: 13,
        transition: "color 160ms ease, border-color 160ms ease",
      }}
    >
      {label}
    </span>
  );
}

function Pill({
  label,
  fg,
  bg,
  border,
}: {
  label: string;
  fg: string;
  bg: string;
  border: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        color: fg,
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        fontWeight: 700,
        textAlign: "center",
        justifySelf: "start",
      }}
    >
      {label}
    </span>
  );
}

function ScopeRow({ scopes, colors }: { scopes: Scope[]; colors: Colors }) {
  const all: Scope[] = ["read", "write", "network"];
  return (
    <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
      {all.map((scope) => {
        const present = scopes.includes(scope);
        return (
          <span
            key={scope}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              padding: "1px 6px",
              borderRadius: 6,
              border: `1px solid ${
                present ? colors.accent : colors.softBorder
              }`,
              background: present ? colors.accentSoft : "transparent",
              color: present ? colors.accentHover : colors.textMuted,
            }}
          >
            {scope}
          </span>
        );
      })}
    </span>
  );
}

function ServerDetail({
  server,
  lang,
  colors,
  codeBg,
  codeText,
}: {
  server: McpServer;
  lang: Lang;
  colors: Colors;
  codeBg: string;
  codeText: string;
}) {
  const all: Scope[] = ["read", "write", "network"];
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderLeft: `4px solid ${
          server.signatureOk ? colors.success : colors.warning
        }`,
        borderRadius: 12,
        padding: 14,
        background: colors.background,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
          {lang === "zh" ? "来源（provenance）" : "Provenance"}
        </div>
        <DetailRow
          label={lang === "zh" ? "发布者" : "publisher"}
          value={server.publisher}
          colors={colors}
        />
        <DetailRow
          label={lang === "zh" ? "签名" : "signature"}
          value={server.signer}
          colors={colors}
          tone={server.signatureOk ? "ok" : "warn"}
        />
        <DetailRow
          label={lang === "zh" ? "manifest 摘要" : "manifest digest"}
          value={server.manifestDigest}
          colors={colors}
        />
        <p
          style={{
            margin: 0,
            fontSize: 11.5,
            color: colors.textMuted,
            lineHeight: 1.55,
          }}
        >
          {localized(lang, server.signatureNote.en, server.signatureNote.zh)}
        </p>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: colors.accent,
            marginTop: 4,
          }}
        >
          {lang === "zh" ? "能力裁剪" : "Capability narrowing"}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "4px 10px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            {lang === "zh" ? "请求" : "requested"}
          </span>
          <ScopeBar
            all={all}
            picked={server.requested}
            colors={colors}
            tone="muted"
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            {lang === "zh" ? "授予" : "granted"}
          </span>
          <ScopeBar
            all={all}
            picked={server.granted}
            colors={colors}
            tone="ok"
          />
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 11.5,
            color: colors.textMuted,
            lineHeight: 1.55,
          }}
        >
          {localized(lang, server.narrow.en, server.narrow.zh)}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          {lang === "zh" ? "审批提示样例" : "Approval prompt sample"}
        </div>
        <pre
          style={{
            margin: 0,
            padding: "10px 12px",
            background: codeBg,
            color: codeText,
            borderRadius: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            lineHeight: 1.6,
            overflowX: "auto",
            borderLeft: `3px solid ${colors.accent}`,
            flex: 1,
          }}
        >
          <code>{server.approval}</code>
        </pre>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  colors,
  tone,
}: {
  label: string;
  value: string;
  colors: Colors;
  tone?: "ok" | "warn";
}) {
  const valueColor =
    tone === "ok"
      ? colors.success
      : tone === "warn"
      ? colors.warning
      : colors.text;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "110px 1fr",
        gap: 8,
        alignItems: "baseline",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      <span style={{ color: colors.textMuted }}>{label}</span>
      <span style={{ color: valueColor, fontWeight: 600, wordBreak: "break-all" }}>
        {value}
      </span>
    </div>
  );
}

function ScopeBar({
  all,
  picked,
  colors,
  tone,
}: {
  all: Scope[];
  picked: Scope[];
  colors: Colors;
  tone: "ok" | "muted";
}) {
  return (
    <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
      {all.map((scope) => {
        const present = picked.includes(scope);
        let fg = colors.textMuted;
        let bg = "transparent";
        let border = colors.softBorder;
        if (present && tone === "ok") {
          fg = colors.success;
          bg = colors.successSoft;
          border = colors.success;
        } else if (present) {
          fg = colors.text;
          bg = colors.track;
          border = colors.softBorder;
        } else {
          fg = colors.textMuted;
          bg = "transparent";
          border = colors.softBorder;
        }
        return (
          <span
            key={scope}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              padding: "1px 8px",
              borderRadius: 6,
              border: `1px solid ${border}`,
              background: bg,
              color: fg,
              textDecoration: present ? "none" : "line-through",
              opacity: present ? 1 : 0.65,
            }}
          >
            {scope}
          </span>
        );
      })}
    </span>
  );
}
