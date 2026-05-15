import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type Category =
  | "read-only"
  | "workspace-write"
  | "network"
  | "dangerous"
  | "ambiguous";

type BackendKey =
  | "LocalShellBackend"
  | "SandboxedBackend"
  | "DockerBackend"
  | "RemoteBackend";

type SandboxProfile =
  | "read-only"
  | "workspace-write"
  | "network"
  | "none"
  | "blocked";

type ApprovalKind = "pre-approved" | "ask" | "always-ask" | "blocked";

interface CommandSample {
  id: string;
  cmd: string;
  enLabel: string;
  zhLabel: string;
  category: Category;
  enIntent: string;
  zhIntent: string;
  // Default (untrusted) routing.
  backend: BackendKey;
  sandbox: SandboxProfile;
  network: "off" | "on" | "scoped";
  fsWrite: "none" | "workspace" | "scoped" | "blocked";
  approval: ApprovalKind;
  truncation: "kb" | "lines" | "stream" | "blocked";
  // Notes about the routing reasoning.
  enNote: string;
  zhNote: string;
}

const SAMPLES: CommandSample[] = [
  {
    id: "ls",
    cmd: "ls -la",
    enLabel: "Read directory listing",
    zhLabel: "读取目录列表",
    category: "read-only",
    enIntent: "Pure read; no fs mutation, no network",
    zhIntent: "纯读取；不写文件、不联网",
    backend: "SandboxedBackend",
    sandbox: "read-only",
    network: "off",
    fsWrite: "none",
    approval: "pre-approved",
    truncation: "kb",
    enNote:
      "Matches the read-only allowlist, so it runs inside the OS sandbox without prompting.",
    zhNote: "命中只读 allowlist，在 OS sandbox 中直接执行，无需审批。",
  },
  {
    id: "cargo-build",
    cmd: "cargo build",
    enLabel: "Compile workspace",
    zhLabel: "编译工作区",
    category: "workspace-write",
    enIntent: "Mutates target/ inside the workspace, no network",
    zhIntent: "修改 workspace 内的 target/，不联网",
    backend: "SandboxedBackend",
    sandbox: "workspace-write",
    network: "off",
    fsWrite: "workspace",
    approval: "ask",
    truncation: "lines",
    enNote:
      "Writes are scoped to the workspace via seatbelt / landlock; network is denied.",
    zhNote: "通过 seatbelt / landlock 仅放行 workspace 写入；网络被拒。",
  },
  {
    id: "git-push",
    cmd: "git push",
    enLabel: "Sync to remote",
    zhLabel: "推送到远端",
    category: "network",
    enIntent: "Reads .git, contacts remote — needs network",
    zhIntent: "读取 .git 并访问远端，必须联网",
    backend: "SandboxedBackend",
    sandbox: "network",
    network: "on",
    fsWrite: "scoped",
    approval: "always-ask",
    truncation: "lines",
    enNote: "Network policy lifts only after explicit approval each turn.",
    zhNote: "每次执行都需明确审批，方可放开网络策略。",
  },
  {
    id: "rm",
    cmd: "rm -rf /",
    enLabel: "Recursive delete from root",
    zhLabel: "从根目录递归删除",
    category: "dangerous",
    enIntent: "Matches the deny list — never auto-runs",
    zhIntent: "命中 deny 列表 —— 永不自动执行",
    backend: "SandboxedBackend",
    sandbox: "blocked",
    network: "off",
    fsWrite: "blocked",
    approval: "blocked",
    truncation: "blocked",
    enNote:
      "The pattern is rejected at parse time; the backend is never invoked.",
    zhNote: "在解析阶段就被拒绝；backend 根本不会被调用。",
  },
  {
    id: "mkdir",
    cmd: "mkdir tmp",
    enLabel: "Create scratch directory",
    zhLabel: "创建临时目录",
    category: "workspace-write",
    enIntent: "Single fs mutation under cwd",
    zhIntent: "只在 cwd 下做一次文件系统写入",
    backend: "SandboxedBackend",
    sandbox: "workspace-write",
    network: "off",
    fsWrite: "workspace",
    approval: "pre-approved",
    truncation: "lines",
    enNote:
      "Trivial workspace mutation; sandbox handles it without leaving the cwd.",
    zhNote: "简单的 workspace 写入；sandbox 限制在 cwd 内即可。",
  },
  {
    id: "curl",
    cmd: "curl https://example.com",
    enLabel: "Fetch over HTTPS",
    zhLabel: "通过 HTTPS 拉取",
    category: "ambiguous",
    enIntent: "Network-bound; fs write depends on flags",
    zhIntent: "需要联网；是否写文件取决于参数",
    backend: "SandboxedBackend",
    sandbox: "network",
    network: "on",
    fsWrite: "none",
    approval: "ask",
    truncation: "stream",
    enNote:
      "Sandbox profile flips to network; output is streamed through a truncating sink.",
    zhNote: "sandbox 切到 network profile；输出通过截断 sink 流式回传。",
  },
];

interface Props {
  lang: Lang;
}

export default function ExecutionBackendBoard({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [activeId, setActiveId] = useState<string>(SAMPLES[0].id);
  const [trusted, setTrusted] = useState<boolean>(false);

  const active = useMemo(
    () => SAMPLES.find((sample) => sample.id === activeId) ?? SAMPLES[0],
    [activeId],
  );

  const trustedView = useMemo(() => applyTrust(active), [active]);
  const view = trusted ? trustedView : active;

  const categoryColor = useMemo(
    () => categoryColorMap(mode, colors),
    [mode, colors],
  );

  return (
    <InteractiveFigure
      lang={lang}
      title="Picking an execution backend"
      zhTitle="选择执行后端"
      subtitle="Choose a shell command to see how Codex routes it through backends, sandbox profiles, and approval gates."
      zhSubtitle="选择一个 shell 命令，看 Codex 如何在 backend、sandbox 与审批门之间为它布线。"
      caption="The backend is picked first; the sandbox profile and approval gate are chosen by the same policy in one pass."
      zhCaption="backend 先被选定；sandbox profile 与审批门在同一轮策略评估中一并决定。"
      badge="Chapter 10"
      zhBadge="第 10 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <CommandPicker
          lang={lang}
          colors={colors}
          activeId={activeId}
          onChange={setActiveId}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          <DecisionTree
            lang={lang}
            colors={colors}
            mode={mode}
            view={view}
            categoryColor={categoryColor}
            trusted={trusted}
          />
          <BackendCard
            lang={lang}
            colors={colors}
            view={view}
            categoryColor={categoryColor}
            trusted={trusted}
          />
        </div>

        <TrustComparison
          lang={lang}
          colors={colors}
          base={active}
          trustedView={trustedView}
          trusted={trusted}
          onToggle={() => setTrusted((value) => !value)}
        />
      </div>
    </InteractiveFigure>
  );
}

interface PickerProps {
  lang: Lang;
  colors: (typeof palette)["light"];
  activeId: string;
  onChange: (id: string) => void;
}

function CommandPicker({ lang, colors, activeId, onChange }: PickerProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
        padding: 10,
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 9,
      }}
    >
      <label
        htmlFor="exec-backend-cmd"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
          color: colors.textMuted,
        }}
      >
        {lang === "zh" ? "示例命令" : "Example command"}
      </label>
      <select
        id="exec-backend-cmd"
        value={activeId}
        onChange={(event) => onChange(event.target.value)}
        style={{
          flex: 1,
          minWidth: 220,
          padding: "6px 10px",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 600,
          color: colors.text,
          background: colors.panel,
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {SAMPLES.map((sample) => (
          <option key={sample.id} value={sample.id}>
            {sample.cmd}
            {"  —  "}
            {localized(lang, sample.enLabel, sample.zhLabel)}
          </option>
        ))}
      </select>
    </div>
  );
}

interface DecisionTreeProps {
  lang: Lang;
  colors: (typeof palette)["light"];
  mode: "light" | "dark";
  view: CommandSample;
  categoryColor: Record<Category, { fill: string; stroke: string }>;
  trusted: boolean;
}

function DecisionTree({
  lang,
  colors,
  mode,
  view,
  categoryColor,
  trusted,
}: DecisionTreeProps) {
  const stages: {
    title: string;
    zhTitle: string;
    value: string;
    zhValue: string;
    tone: "neutral" | "good" | "warn" | "bad";
  }[] = [
    {
      title: "Command",
      zhTitle: "命令",
      value: view.cmd,
      zhValue: view.cmd,
      tone: "neutral",
    },
    {
      title: "Category",
      zhTitle: "分类",
      value: categoryLabel(view.category, "en"),
      zhValue: categoryLabel(view.category, "zh"),
      tone: categoryTone(view.category),
    },
    {
      title: "Backend",
      zhTitle: "Backend",
      value: view.backend,
      zhValue: view.backend,
      tone: "neutral",
    },
    {
      title: "Sandbox",
      zhTitle: "Sandbox",
      value: sandboxLabel(view.sandbox, "en"),
      zhValue: sandboxLabel(view.sandbox, "zh"),
      tone: view.sandbox === "blocked" ? "bad" : "good",
    },
    {
      title: "Approval",
      zhTitle: "审批",
      value: approvalLabel(view.approval, "en"),
      zhValue: approvalLabel(view.approval, "zh"),
      tone: approvalTone(view.approval),
    },
    {
      title: "Handler",
      zhTitle: "执行 handler",
      value: handlerLabel(view, "en"),
      zhValue: handlerLabel(view, "zh"),
      tone: view.approval === "blocked" ? "bad" : "good",
    },
  ];

  const toneColor = (tone: "neutral" | "good" | "warn" | "bad") => {
    if (tone === "good") return { stroke: colors.success, fill: colors.successSoft };
    if (tone === "warn") return { stroke: colors.warning, fill: colors.warningSoft };
    if (tone === "bad")
      return {
        stroke: mode === "light" ? "#b91c1c" : "#fca5a5",
        fill: mode === "light" ? "#fee2e2" : "#3a1414",
      };
    return { stroke: colors.accent, fill: colors.accentSoft };
  };

  const cat = categoryColor[view.category];

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 12,
        background: colors.background,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: colors.textMuted,
          }}
        >
          {lang === "zh" ? "决策路径" : "Decision path"}
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: cat.stroke,
            background: cat.fill,
            border: `1px solid ${cat.stroke}`,
            borderRadius: 999,
            padding: "2px 10px",
          }}
        >
          {trusted
            ? lang === "zh"
              ? "已信任 · 走捷径"
              : "trusted · fast path"
            : lang === "zh"
            ? "默认策略"
            : "default policy"}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {stages.map((stage, index) => {
          const tc = toneColor(stage.tone);
          const isLast = index === stages.length - 1;
          return (
            <React.Fragment key={stage.title}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "84px 1fr",
                  alignItems: "stretch",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    fontSize: 10.5,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: colors.textMuted,
                  }}
                >
                  {localized(lang, stage.title, stage.zhTitle)}
                </div>
                <div
                  style={{
                    border: `1.5px solid ${tc.stroke}`,
                    background: tc.fill,
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: tc.stroke,
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {localized(lang, stage.value, stage.zhValue)}
                </div>
              </div>
              {!isLast ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "84px 1fr",
                    gap: 10,
                  }}
                  aria-hidden="true"
                >
                  <span />
                  <span
                    style={{
                      width: 0,
                      borderLeft: `2px dashed ${colors.softBorder}`,
                      height: 14,
                      marginLeft: 14,
                    }}
                  />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 4,
          padding: 10,
          border: `1px dashed ${colors.softBorder}`,
          borderRadius: 8,
          fontSize: 12,
          color: colors.text,
          lineHeight: 1.55,
          background: colors.panel,
        }}
      >
        <strong style={{ color: cat.stroke }}>
          {lang === "zh" ? "为什么走这条路：" : "Why this path:"}
        </strong>{" "}
        {localized(lang, view.enNote, view.zhNote)}
      </div>
    </div>
  );
}

interface BackendCardProps {
  lang: Lang;
  colors: (typeof palette)["light"];
  view: CommandSample;
  categoryColor: Record<Category, { fill: string; stroke: string }>;
  trusted: boolean;
}

function BackendCard({
  lang,
  colors,
  view,
  categoryColor,
  trusted,
}: BackendCardProps) {
  const cat = categoryColor[view.category];
  const bullets: { en: string; zh: string }[] = [
    {
      en: `Backend: ${view.backend}`,
      zh: `Backend：${view.backend}`,
    },
    {
      en: `Sandbox profile: ${sandboxLabel(view.sandbox, "en")}`,
      zh: `Sandbox profile：${sandboxLabel(view.sandbox, "zh")}`,
    },
    {
      en: `Network policy: ${networkLabel(view.network, "en")}`,
      zh: `网络策略：${networkLabel(view.network, "zh")}`,
    },
    {
      en: `Filesystem write profile: ${fsLabel(view.fsWrite, "en")}`,
      zh: `文件系统写入：${fsLabel(view.fsWrite, "zh")}`,
    },
    {
      en: `Approval requirement: ${approvalLabel(view.approval, "en")}`,
      zh: `审批要求：${approvalLabel(view.approval, "zh")}`,
    },
    {
      en: `Result truncation: ${truncationLabel(view.truncation, "en")}`,
      zh: `输出截断：${truncationLabel(view.truncation, "zh")}`,
    },
  ];

  return (
    <div
      style={{
        border: `1px solid ${cat.stroke}`,
        borderLeftWidth: 4,
        borderRadius: 12,
        padding: 14,
        background: `linear-gradient(180deg, ${cat.fill} 0%, ${colors.panel} 70%)`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: cat.stroke,
          }}
        >
          {lang === "zh" ? "选中的 Backend" : "Chosen backend"}
        </div>
        {trusted ? (
          <span
            style={{
              fontSize: 10.5,
              fontFamily: "var(--font-mono)",
              color: colors.success,
              background: colors.successSoft,
              border: `1px solid ${colors.success}`,
              borderRadius: 999,
              padding: "1px 8px",
            }}
          >
            {lang === "zh" ? "已信任" : "trusted"}
          </span>
        ) : null}
      </div>

      <h5
        style={{
          margin: 0,
          fontSize: "1.05rem",
          fontWeight: 700,
          color: colors.text,
          fontFamily: "var(--font-serif, inherit)",
        }}
      >
        {view.backend}
      </h5>
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          lineHeight: 1.55,
          color: colors.textMuted,
        }}
      >
        {localized(lang, view.enIntent, view.zhIntent)}
      </p>

      <ul
        style={{
          margin: 0,
          paddingLeft: 18,
          fontSize: 12.5,
          lineHeight: 1.65,
          color: colors.text,
          fontFamily: "var(--font-mono)",
        }}
      >
        {bullets.map((bullet) => (
          <li key={bullet.en}>{localized(lang, bullet.en, bullet.zh)}</li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 10,
          borderTop: `1px dashed ${colors.softBorder}`,
          fontSize: 11,
          color: colors.textMuted,
          fontFamily: "var(--font-mono)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span>
          {lang === "zh" ? "源码：" : "source:"} executor/backends.rs
        </span>
        <span style={{ color: cat.stroke, fontWeight: 700 }}>
          {lang === "zh"
            ? `分类 · ${categoryLabel(view.category, "zh")}`
            : `class · ${categoryLabel(view.category, "en")}`}
        </span>
      </div>
    </div>
  );
}

interface TrustProps {
  lang: Lang;
  colors: (typeof palette)["light"];
  base: CommandSample;
  trustedView: CommandSample;
  trusted: boolean;
  onToggle: () => void;
}

function TrustComparison({
  lang,
  colors,
  base,
  trustedView,
  trusted,
  onToggle,
}: TrustProps) {
  const blocked = base.approval === "blocked";
  const rows: {
    en: string;
    zh: string;
    before: string;
    zhBefore: string;
    after: string;
    zhAfter: string;
  }[] = [
    {
      en: "Backend",
      zh: "Backend",
      before: base.backend,
      zhBefore: base.backend,
      after: trustedView.backend,
      zhAfter: trustedView.backend,
    },
    {
      en: "Sandbox",
      zh: "Sandbox",
      before: sandboxLabel(base.sandbox, "en"),
      zhBefore: sandboxLabel(base.sandbox, "zh"),
      after: sandboxLabel(trustedView.sandbox, "en"),
      zhAfter: sandboxLabel(trustedView.sandbox, "zh"),
    },
    {
      en: "Approval",
      zh: "审批",
      before: approvalLabel(base.approval, "en"),
      zhBefore: approvalLabel(base.approval, "zh"),
      after: approvalLabel(trustedView.approval, "en"),
      zhAfter: approvalLabel(trustedView.approval, "zh"),
    },
  ];

  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 12,
        background: colors.panel,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <strong
            style={{
              fontSize: 13,
              color: colors.text,
              fontFamily: "var(--font-serif, inherit)",
            }}
          >
            {lang === "zh"
              ? "如果勾选「信任此命令」会怎样？"
              : 'What changes if you "Trust this command"?'}
          </strong>
          <span
            style={{
              fontSize: 11.5,
              color: colors.textMuted,
              lineHeight: 1.5,
            }}
          >
            {blocked
              ? lang === "zh"
                ? "deny 列表无法被信任覆盖；下面的对比仅用于示意。"
                : "The deny list cannot be overridden by trust; the comparison below is illustrative."
              : lang === "zh"
              ? "信任会绕过审批门，并在安全时改用更轻量的 backend。"
              : "Trust skips the approval gate and may switch to a lighter backend when safe."}
          </span>
        </div>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: blocked ? "not-allowed" : "pointer",
            opacity: blocked ? 0.55 : 1,
            fontSize: 12.5,
            fontFamily: "var(--font-mono)",
            color: colors.text,
            border: `1px solid ${
              trusted ? colors.success : colors.softBorder
            }`,
            background: trusted ? colors.successSoft : colors.background,
            borderRadius: 999,
            padding: "4px 12px",
          }}
        >
          <input
            type="checkbox"
            checked={trusted}
            disabled={blocked}
            onChange={onToggle}
            style={{ accentColor: colors.success }}
          />
          {lang === "zh" ? "信任此命令" : "Trust this command"}
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(80px, 110px) minmax(0, 1fr) 18px minmax(0, 1fr)",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        <div />
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            color: colors.textMuted,
          }}
        >
          {lang === "zh" ? "默认（未信任）" : "default (untrusted)"}
        </div>
        <div />
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            color: colors.success,
          }}
        >
          {lang === "zh" ? "信任后" : "after trust"}
        </div>

        {rows.map((row) => {
          const before = localized(lang, row.before, row.zhBefore);
          const after = localized(lang, row.after, row.zhAfter);
          const changed = before !== after;
          return (
            <React.Fragment key={row.en}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: colors.textMuted,
                  alignSelf: "center",
                }}
              >
                {localized(lang, row.en, row.zh)}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  color: colors.text,
                  background: colors.background,
                  border: `1px solid ${colors.softBorder}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                }}
              >
                {before}
              </div>
              <div
                aria-hidden="true"
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  color: changed ? colors.accent : colors.textMuted,
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                →
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  fontWeight: changed ? 700 : 400,
                  color: changed ? colors.success : colors.text,
                  background: changed ? colors.successSoft : colors.background,
                  border: `1px solid ${
                    changed ? colors.success : colors.softBorder
                  }`,
                  borderRadius: 8,
                  padding: "6px 10px",
                }}
              >
                {after}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function applyTrust(sample: CommandSample): CommandSample {
  if (sample.approval === "blocked") {
    // Trust never overrides the deny list.
    return sample;
  }
  let backend: BackendKey = sample.backend;
  let sandbox: SandboxProfile = sample.sandbox;
  if (sample.category === "read-only") {
    backend = "LocalShellBackend";
    sandbox = "none";
  } else if (sample.category === "workspace-write") {
    sandbox = "workspace-write";
  }
  return {
    ...sample,
    backend,
    sandbox,
    approval: "pre-approved",
  };
}

function categoryColorMap(
  mode: "light" | "dark",
  colors: (typeof palette)["light"],
): Record<Category, { fill: string; stroke: string }> {
  return {
    "read-only": {
      fill: colors.successSoft,
      stroke: colors.success,
    },
    "workspace-write": {
      fill: colors.warningSoft,
      stroke: colors.warning,
    },
    network: {
      fill: colors.infoSoft,
      stroke: colors.info,
    },
    dangerous: {
      fill: mode === "light" ? "#fee2e2" : "#3a1414",
      stroke: mode === "light" ? "#b91c1c" : "#fca5a5",
    },
    ambiguous: {
      fill: colors.accentSoft,
      stroke: colors.accent,
    },
  };
}

function categoryTone(category: Category): "neutral" | "good" | "warn" | "bad" {
  switch (category) {
    case "read-only":
      return "good";
    case "workspace-write":
      return "warn";
    case "network":
      return "warn";
    case "dangerous":
      return "bad";
    case "ambiguous":
      return "neutral";
  }
}

function approvalTone(
  approval: ApprovalKind,
): "neutral" | "good" | "warn" | "bad" {
  if (approval === "pre-approved") return "good";
  if (approval === "blocked") return "bad";
  return "warn";
}

function categoryLabel(category: Category, lang: "en" | "zh"): string {
  const en: Record<Category, string> = {
    "read-only": "read-only",
    "workspace-write": "workspace-write",
    network: "network",
    dangerous: "dangerous",
    ambiguous: "depends on flags",
  };
  const zh: Record<Category, string> = {
    "read-only": "只读",
    "workspace-write": "workspace 写",
    network: "联网",
    dangerous: "危险 / 拒绝",
    ambiguous: "取决于参数",
  };
  return lang === "zh" ? zh[category] : en[category];
}

function sandboxLabel(profile: SandboxProfile, lang: "en" | "zh"): string {
  const en: Record<SandboxProfile, string> = {
    "read-only": "read-only (seatbelt / landlock)",
    "workspace-write": "workspace-write (seatbelt / landlock)",
    network: "network (seatbelt / landlock)",
    none: "none (host shell)",
    blocked: "blocked",
  };
  const zh: Record<SandboxProfile, string> = {
    "read-only": "read-only（seatbelt / landlock）",
    "workspace-write": "workspace-write（seatbelt / landlock）",
    network: "network（seatbelt / landlock）",
    none: "无 sandbox（host shell）",
    blocked: "已拒绝",
  };
  return lang === "zh" ? zh[profile] : en[profile];
}

function networkLabel(
  network: CommandSample["network"],
  lang: "en" | "zh",
): string {
  const en: Record<CommandSample["network"], string> = {
    off: "denied",
    on: "allowed",
    scoped: "scoped (per host)",
  };
  const zh: Record<CommandSample["network"], string> = {
    off: "拒绝",
    on: "放行",
    scoped: "按主机放行",
  };
  return lang === "zh" ? zh[network] : en[network];
}

function fsLabel(
  fs: CommandSample["fsWrite"],
  lang: "en" | "zh",
): string {
  const en: Record<CommandSample["fsWrite"], string> = {
    none: "no writes",
    workspace: "workspace only",
    scoped: "scoped paths",
    blocked: "writes denied",
  };
  const zh: Record<CommandSample["fsWrite"], string> = {
    none: "不写入",
    workspace: "仅 workspace",
    scoped: "受限路径",
    blocked: "拒绝写入",
  };
  return lang === "zh" ? zh[fs] : en[fs];
}

function approvalLabel(approval: ApprovalKind, lang: "en" | "zh"): string {
  const en: Record<ApprovalKind, string> = {
    "pre-approved": "pre-approved",
    ask: "ask once",
    "always-ask": "always ask",
    blocked: "blocked",
  };
  const zh: Record<ApprovalKind, string> = {
    "pre-approved": "免审批",
    ask: "本次询问",
    "always-ask": "每次询问",
    blocked: "已拒绝",
  };
  return lang === "zh" ? zh[approval] : en[approval];
}

function truncationLabel(
  truncation: CommandSample["truncation"],
  lang: "en" | "zh",
): string {
  const en: Record<CommandSample["truncation"], string> = {
    kb: "head + tail, KB-bound",
    lines: "tail-bound, line cap",
    stream: "streamed through truncating sink",
    blocked: "no output produced",
  };
  const zh: Record<CommandSample["truncation"], string> = {
    kb: "首尾保留，限 KB",
    lines: "保留尾部，限行数",
    stream: "通过截断 sink 流式回传",
    blocked: "无输出",
  };
  return lang === "zh" ? zh[truncation] : en[truncation];
}

function handlerLabel(view: CommandSample, lang: "en" | "zh"): string {
  if (view.approval === "blocked") {
    return lang === "zh" ? "ExecBlocked → 错误事件" : "ExecBlocked → error event";
  }
  if (view.backend === "LocalShellBackend") {
    return lang === "zh"
      ? "spawn(host) → 流式 stdout / stderr"
      : "spawn(host) → stream stdout / stderr";
  }
  if (view.backend === "DockerBackend") {
    return lang === "zh"
      ? "docker exec → 截断回传"
      : "docker exec → truncated capture";
  }
  if (view.backend === "RemoteBackend") {
    return lang === "zh" ? "远程 RPC → 流式回传" : "remote RPC → streamed";
  }
  return lang === "zh"
    ? "sandbox.spawn → 流式 stdout / stderr"
    : "sandbox.spawn → stream stdout / stderr";
}
