import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ToolKey =
  | "read_file"
  | "apply_patch"
  | "shell_exec"
  | "mcp.search"
  | "skill.run"
  | "stream_search";

type BackendKey =
  | "ExecBackend"
  | "FilesystemBackend"
  | "McpClient"
  | "SkillRuntime"
  | "NetworkPolicy";

type ConcurrencyKey =
  | "read-only"
  | "workspace-write"
  | "danger"
  | "external";

type ApprovalKey = "auto" | "hook" | "user" | "bubble";

interface ToolConfig {
  key: ToolKey;
  enRole: string;
  zhRole: string;
  backend: BackendKey;
  concurrency: ConcurrencyKey;
  approvals: ApprovalKey[];
  enApprovalNote: string;
  zhApprovalNote: string;
  truncation: string;
  enResultNote: string;
  zhResultNote: string;
}

const TOOLS: ToolConfig[] = [
  {
    key: "read_file",
    enRole: "Read-only filesystem read",
    zhRole: "只读文件系统读取",
    backend: "FilesystemBackend",
    concurrency: "read-only",
    approvals: ["auto"],
    enApprovalNote:
      "Auto-approved when the path stays inside the workspace root.",
    zhApprovalNote: "路径位于 workspace 根目录内时自动放行。",
    truncation: "32 KiB",
    enResultNote: "Bytes truncated, then ToolOutput is recorded.",
    zhResultNote: "字节截断后写入 ToolOutput。",
  },
  {
    key: "apply_patch",
    enRole: "Workspace-write patch application",
    zhRole: "workspace-write 补丁应用",
    backend: "FilesystemBackend",
    concurrency: "workspace-write",
    approvals: ["hook", "user"],
    enApprovalNote:
      "Hooks may pre-approve; the user confirms diffs that escape the workspace.",
    zhApprovalNote: "Hook 可以预批准；越界改动需要用户二次确认。",
    truncation: "32 KiB",
    enResultNote: "Patch summary is recorded; per-file diffs stream out.",
    zhResultNote: "记录补丁摘要；逐文件 diff 流式输出。",
  },
  {
    key: "shell_exec",
    enRole: "Shell execution under sandbox",
    zhRole: "在 sandbox 下执行 shell",
    backend: "ExecBackend",
    concurrency: "workspace-write",
    approvals: ["hook", "user", "bubble"],
    enApprovalNote:
      "Hook + user approval; a deny bubbles up as a re-prompt to the model.",
    zhApprovalNote: "Hook + 用户审批；拒绝会向上冒泡为对模型的 re-prompt。",
    truncation: "64 KiB",
    enResultNote: "stdout / stderr truncated, exit code attached to ToolOutput.",
    zhResultNote: "stdout / stderr 截断，exit code 一并带到 ToolOutput。",
  },
  {
    key: "mcp.search",
    enRole: "External MCP tool over JSON-RPC",
    zhRole: "通过 JSON-RPC 调用的外部 MCP tool",
    backend: "McpClient",
    concurrency: "external",
    approvals: ["hook"],
    enApprovalNote:
      "Hooks gate which MCP servers are reachable; no per-call user prompt.",
    zhApprovalNote: "Hook 决定哪些 MCP server 可达；不做逐次用户审批。",
    truncation: "16 KiB",
    enResultNote: "JSON payload normalized, then truncated and recorded.",
    zhResultNote: "JSON payload 归一化后截断并记录。",
  },
  {
    key: "skill.run",
    enRole: "Skill plugin invocation",
    zhRole: "Skill 插件调用",
    backend: "SkillRuntime",
    concurrency: "workspace-write",
    approvals: ["hook", "user"],
    enApprovalNote:
      "Hooks bind the skill; the user confirms skills with write effects.",
    zhApprovalNote: "Hook 绑定 skill；带写入效果的 skill 需要用户确认。",
    truncation: "32 KiB",
    enResultNote: "Skill output normalized to ToolOutput, written into rollout.",
    zhResultNote: "Skill 输出归一化为 ToolOutput，并写入 rollout。",
  },
  {
    key: "stream_search",
    enRole: "Web search through proxy",
    zhRole: "通过 proxy 的网络搜索",
    backend: "NetworkPolicy",
    concurrency: "external",
    approvals: ["auto"],
    enApprovalNote:
      "Auto-approved against the proxy allowlist; no user prompt needed.",
    zhApprovalNote: "在 proxy 白名单内自动放行，无需用户提示。",
    truncation: "16 KiB",
    enResultNote: "Snippets truncated; provenance URLs preserved verbatim.",
    zhResultNote: "片段截断；保留来源 URL 原貌。",
  },
];

const BACKEND_KEYS: BackendKey[] = [
  "ExecBackend",
  "FilesystemBackend",
  "McpClient",
  "SkillRuntime",
  "NetworkPolicy",
];

const CONCURRENCY_KEYS: ConcurrencyKey[] = [
  "read-only",
  "workspace-write",
  "danger",
  "external",
];

const APPROVAL_KEYS: ApprovalKey[] = ["auto", "hook", "user", "bubble"];

const APPROVAL_HINTS: Record<ApprovalKey, { en: string; zh: string }> = {
  auto: { en: "allowlist", zh: "白名单" },
  hook: { en: "hook decides", zh: "Hook 决策" },
  user: { en: "ask user", zh: "用户审批" },
  bubble: { en: "bubble up", zh: "向上冒泡" },
};

const CONCURRENCY_DESCRIPTIONS: Record<
  ConcurrencyKey,
  { en: string; zh: string }
> = {
  "read-only": {
    en: "Cannot mutate disk or env; safe to fan out in parallel.",
    zh: "不能改动磁盘或环境，可以并行扇出。",
  },
  "workspace-write": {
    en: "May write inside the workspace; serialized at job level.",
    zh: "可以在 workspace 内写入；任务级串行执行。",
  },
  danger: {
    en: "Escapes the sandbox; locked behind explicit approval.",
    zh: "越出 sandbox；必须显式审批后才能运行。",
  },
  external: {
    en: "Talks to remote services; bound by network policy.",
    zh: "调用远端服务；受网络策略约束。",
  },
};

const BACKEND_SHORT: Record<BackendKey, string> = {
  ExecBackend: "Exec",
  FilesystemBackend: "Filesystem",
  McpClient: "Mcp",
  SkillRuntime: "Skill",
  NetworkPolicy: "Network",
};

const BACKEND_SUBTITLE: Record<BackendKey, string> = {
  ExecBackend: "Backend",
  FilesystemBackend: "Backend",
  McpClient: "Client",
  SkillRuntime: "Runtime",
  NetworkPolicy: "Policy",
};

interface Props {
  lang: Lang;
}

export default function ToolDispatchMap({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [activeKey, setActiveKey] = useState<ToolKey>("shell_exec");
  const tool = useMemo(
    () => TOOLS.find((entry) => entry.key === activeKey) ?? TOOLS[0],
    [activeKey],
  );

  const concurrencyColor: Record<ConcurrencyKey, string> = {
    "read-only": colors.success,
    "workspace-write": colors.warning,
    danger: colors.accent,
    external: colors.info,
  };
  const concurrencyFill: Record<ConcurrencyKey, string> = {
    "read-only": colors.successSoft,
    "workspace-write": colors.warningSoft,
    danger: colors.accentSoft,
    external: colors.infoSoft,
  };

  const activeApprovals = useMemo(
    () => new Set<ApprovalKey>(tool.approvals),
    [tool],
  );

  // SVG geometry constants. Each stage row sits at a fixed y; box rows align
  // their option boxes to a small set of x columns so arrows snap cleanly.
  const STAGE1_Y = 22;
  const STAGE2_Y = 92;
  const STAGE3_Y = 170;
  const STAGE4_Y = 248;
  const STAGE5_Y = 326;

  const stage2X = [35, 155, 275, 395, 515]; // 5 backend boxes, width 110
  const stage34X = [35, 185, 335, 485]; // 4 concurrency / approval boxes

  const backendCenter = (b: BackendKey) =>
    stage2X[BACKEND_KEYS.indexOf(b)] + 55;
  const concurrencyCenter = (c: ConcurrencyKey) =>
    stage34X[CONCURRENCY_KEYS.indexOf(c)] + 70;
  const approvalCenter = (a: ApprovalKey) =>
    stage34X[APPROVAL_KEYS.indexOf(a)] + 70;

  const stage1Cx = 330;
  const resultCx = 330;

  return (
    <InteractiveFigure
      lang={lang}
      title="From tool name to handler"
      zhTitle="从 tool 名字到 handler"
      subtitle="Pick a tool the model issued and watch it fall through registry, backend, concurrency tag, approval gate, and result pipeline."
      zhSubtitle="选择一次模型发起的 tool 调用，看它依次穿过 registry、backend、并发标签、审批闸和结果管道。"
      caption="Five stages, six tools. Adding a new tool means picking values along these axes — never writing fresh routing code."
      zhCaption="五个阶段，六种工具。新增一个 tool 只是在这些坐标轴上选值，而不必另写一套路由。"
      badge="Chapter 9"
      zhBadge="第 9 章"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {TOOLS.map((entry) => {
          const isActive = entry.key === activeKey;
          return (
            <button
              key={entry.key}
              onClick={() => setActiveKey(entry.key)}
              aria-pressed={isActive}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: "left",
                padding: "8px 12px",
                borderRadius: 9,
                border: `1.5px solid ${
                  isActive ? colors.accent : colors.softBorder
                }`,
                background: isActive ? colors.accentSoft : colors.panel,
                color: colors.text,
                cursor: "pointer",
                minWidth: 150,
                flex: "1 1 150px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: isActive ? colors.accent : colors.text,
                }}
              >
                {entry.key}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  lineHeight: 1.4,
                }}
              >
                {localized(lang, entry.enRole, entry.zhRole)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 12,
          background: colors.background,
          padding: 12,
          marginBottom: 14,
        }}
      >
        <svg
          viewBox="0 0 660 380"
          width="100%"
          height="auto"
          role="img"
          aria-label={
            lang === "zh"
              ? "tool 名字到 handler 的派发流程"
              : "Tool name to handler dispatch flow"
          }
        >
          <defs>
            <marker
              id="tdm-arrow"
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

          <text
            x={15}
            y={STAGE1_Y - 7}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.textMuted}
            letterSpacing="0.06em"
          >
            {localized(lang, "1. ToolRegistry lookup", "1. ToolRegistry 查找")}
          </text>
          <rect
            x={230}
            y={STAGE1_Y}
            width={200}
            height={36}
            rx={9}
            fill={colors.accentSoft}
            stroke={colors.accent}
            strokeWidth={1.6}
          />
          <text
            x={stage1Cx}
            y={STAGE1_Y + 22}
            textAnchor="middle"
            fontSize={12}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.accent}
          >
            {`resolve("${tool.key}")`}
          </text>

          <line
            x1={stage1Cx}
            y1={STAGE1_Y + 36}
            x2={backendCenter(tool.backend)}
            y2={STAGE2_Y - 2}
            stroke={colors.accent}
            strokeWidth={2}
            markerEnd="url(#tdm-arrow)"
          />

          <text
            x={15}
            y={STAGE2_Y - 7}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.textMuted}
            letterSpacing="0.06em"
          >
            {localized(lang, "2. Backend selection", "2. Backend 选择")}
          </text>
          {BACKEND_KEYS.map((b, i) => {
            const isActive = b === tool.backend;
            const x = stage2X[i];
            return (
              <g key={b}>
                <rect
                  x={x}
                  y={STAGE2_Y}
                  width={110}
                  height={44}
                  rx={8}
                  fill={isActive ? colors.accentSoft : colors.panel}
                  stroke={isActive ? colors.accent : colors.softBorder}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 1 : 0.45}
                />
                <text
                  x={x + 55}
                  y={STAGE2_Y + 19}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={isActive ? colors.accent : colors.text}
                  opacity={isActive ? 1 : 0.7}
                >
                  {BACKEND_SHORT[b]}
                </text>
                <text
                  x={x + 55}
                  y={STAGE2_Y + 33}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontFamily="var(--font-mono)"
                  fill={colors.textMuted}
                  opacity={isActive ? 1 : 0.55}
                >
                  {BACKEND_SUBTITLE[b]}
                </text>
              </g>
            );
          })}

          <line
            x1={backendCenter(tool.backend)}
            y1={STAGE2_Y + 44}
            x2={concurrencyCenter(tool.concurrency)}
            y2={STAGE3_Y - 2}
            stroke={colors.accent}
            strokeWidth={2}
            markerEnd="url(#tdm-arrow)"
          />

          <text
            x={15}
            y={STAGE3_Y - 7}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.textMuted}
            letterSpacing="0.06em"
          >
            {localized(lang, "3. Concurrency class", "3. 并发类")}
          </text>
          {CONCURRENCY_KEYS.map((c, i) => {
            const isActive = c === tool.concurrency;
            const x = stage34X[i];
            const cColor = concurrencyColor[c];
            const cFill = concurrencyFill[c];
            return (
              <g key={c}>
                <rect
                  x={x}
                  y={STAGE3_Y}
                  width={140}
                  height={44}
                  rx={8}
                  fill={isActive ? cFill : colors.panel}
                  stroke={cColor}
                  strokeWidth={isActive ? 2.4 : 1}
                  opacity={isActive ? 1 : 0.4}
                />
                <text
                  x={x + 70}
                  y={STAGE3_Y + 27}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={cColor}
                  opacity={isActive ? 1 : 0.7}
                >
                  {c}
                </text>
              </g>
            );
          })}

          {tool.approvals.map((a) => (
            <line
              key={`arr34-${a}`}
              x1={concurrencyCenter(tool.concurrency)}
              y1={STAGE3_Y + 44}
              x2={approvalCenter(a)}
              y2={STAGE4_Y - 2}
              stroke={colors.accent}
              strokeWidth={1.6}
              markerEnd="url(#tdm-arrow)"
              opacity={0.9}
            />
          ))}

          <text
            x={15}
            y={STAGE4_Y - 7}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.textMuted}
            letterSpacing="0.06em"
          >
            {localized(lang, "4. Approval gate", "4. 审批闸")}
          </text>
          {APPROVAL_KEYS.map((a, i) => {
            const isActive = activeApprovals.has(a);
            const x = stage34X[i];
            const hint = APPROVAL_HINTS[a];
            return (
              <g key={a}>
                <rect
                  x={x}
                  y={STAGE4_Y}
                  width={140}
                  height={44}
                  rx={8}
                  fill={isActive ? colors.accentSoft : colors.panel}
                  stroke={isActive ? colors.accent : colors.softBorder}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 1 : 0.4}
                />
                <text
                  x={x + 70}
                  y={STAGE4_Y + 19}
                  textAnchor="middle"
                  fontSize={11.5}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={isActive ? colors.accent : colors.text}
                  opacity={isActive ? 1 : 0.7}
                >
                  {a}
                </text>
                <text
                  x={x + 70}
                  y={STAGE4_Y + 33}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontFamily="var(--font-mono)"
                  fill={colors.textMuted}
                  opacity={isActive ? 1 : 0.55}
                >
                  {localized(lang, hint.en, hint.zh)}
                </text>
              </g>
            );
          })}

          {tool.approvals.map((a) => (
            <line
              key={`arr45-${a}`}
              x1={approvalCenter(a)}
              y1={STAGE4_Y + 44}
              x2={resultCx}
              y2={STAGE5_Y - 2}
              stroke={colors.accent}
              strokeWidth={1.6}
              markerEnd="url(#tdm-arrow)"
              opacity={0.9}
            />
          ))}

          <text
            x={15}
            y={STAGE5_Y - 7}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fontWeight={700}
            fill={colors.textMuted}
            letterSpacing="0.06em"
          >
            {localized(lang, "5. Result handler", "5. 结果处理")}
          </text>
          {[
            {
              en: `truncate ${tool.truncation}`,
              zh: `截断 ${tool.truncation}`,
            },
            { en: "record in rollout", zh: "写入 rollout" },
            { en: "emit ToolOutput", zh: "发出 ToolOutput" },
          ].map((step, i) => {
            const stepX = 30 + i * 210;
            const stepW = 190;
            return (
              <g key={i}>
                <rect
                  x={stepX}
                  y={STAGE5_Y}
                  width={stepW}
                  height={36}
                  rx={9}
                  fill={colors.accentSoft}
                  stroke={colors.accent}
                  strokeWidth={1.4}
                />
                <text
                  x={stepX + stepW / 2}
                  y={STAGE5_Y + 22}
                  textAnchor="middle"
                  fontSize={11.5}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={colors.accent}
                >
                  {localized(lang, step.en, step.zh)}
                </text>
                {i < 2 ? (
                  <line
                    x1={stepX + stepW}
                    y1={STAGE5_Y + 18}
                    x2={stepX + stepW + 18}
                    y2={STAGE5_Y + 18}
                    stroke={colors.accent}
                    strokeWidth={2}
                    markerEnd="url(#tdm-arrow)"
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
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
            border: `1px solid ${concurrencyColor[tool.concurrency]}`,
            borderLeftWidth: 4,
            borderRadius: 10,
            padding: 12,
            background: concurrencyFill[tool.concurrency],
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
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: concurrencyColor[tool.concurrency],
              display: "flex",
              gap: 6,
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            <span>{localized(lang, "Selection summary", "选择摘要")}</span>
            <span style={{ color: colors.text }}>· {tool.key}</span>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: 12.5,
              fontFamily: "var(--font-mono)",
              color: colors.text,
              lineHeight: 1.55,
            }}
          >
            <li>
              <span style={{ color: colors.textMuted }}>
                {localized(lang, "Backend", "Backend")}:
              </span>{" "}
              {tool.backend}
            </li>
            <li>
              <span style={{ color: colors.textMuted }}>
                {localized(lang, "Concurrency", "并发类")}:
              </span>{" "}
              {tool.concurrency}
            </li>
            <li>
              <span style={{ color: colors.textMuted }}>
                {localized(lang, "Approval", "审批")}:
              </span>{" "}
              {tool.approvals.join(" + ")}
            </li>
            <li>
              <span style={{ color: colors.textMuted }}>
                {localized(lang, "Result truncation", "结果截断")}:
              </span>{" "}
              {tool.truncation}
            </li>
          </ul>
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: colors.text,
              lineHeight: 1.55,
            }}
          >
            {localized(lang, tool.enApprovalNote, tool.zhApprovalNote)}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: colors.textMuted,
              lineHeight: 1.5,
              borderTop: `1px dashed ${colors.softBorder}`,
              paddingTop: 6,
            }}
          >
            {localized(lang, tool.enResultNote, tool.zhResultNote)}
          </p>
        </div>

        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
            padding: 12,
            background: mode === "light" ? "#fffaef" : "#23221f",
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
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: colors.textMuted,
            }}
          >
            {localized(lang, "Concurrency classes", "并发类图例")}
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
            {CONCURRENCY_KEYS.map((c) => {
              const cColor = concurrencyColor[c];
              const cFill = concurrencyFill[c];
              const isActive = c === tool.concurrency;
              return (
                <li
                  key={c}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: cColor,
                      background: cFill,
                      border: `1px solid ${cColor}`,
                      borderRadius: 6,
                      padding: "2px 8px",
                      whiteSpace: "nowrap",
                      boxShadow: isActive ? `0 0 0 2px ${cFill}` : "none",
                    }}
                  >
                    {c}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: colors.text,
                      lineHeight: 1.45,
                    }}
                  >
                    {localized(
                      lang,
                      CONCURRENCY_DESCRIPTIONS[c].en,
                      CONCURRENCY_DESCRIPTIONS[c].zh,
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </InteractiveFigure>
  );
}
