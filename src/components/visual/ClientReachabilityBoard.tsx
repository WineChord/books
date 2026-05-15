import React, { useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ClientKey = "tui" | "exec" | "appserver" | "sdk";

type EndpointKey =
  | "submission"
  | "events"
  | "approvals"
  | "history"
  | "context"
  | "rollout";

type Access = "full" | "read" | "none";

interface ClientConfig {
  key: ClientKey;
  label: string;
  enRole: string;
  zhRole: string;
  enTransport: string;
  zhTransport: string;
  enAuth: string;
  zhAuth: string;
}

interface EndpointConfig {
  key: EndpointKey;
  label: string;
  enDesc: string;
  zhDesc: string;
}

interface CellInfo {
  access: Access;
  enFlags: string[];
  zhFlags: string[];
}

const clients: ClientConfig[] = [
  {
    key: "tui",
    label: "TUI",
    enRole: "Interactive terminal session.",
    zhRole: "交互式终端会话。",
    enTransport: "in-process channel",
    zhTransport: "进程内 channel",
    enAuth: "none (local user)",
    zhAuth: "无（本地用户）",
  },
  {
    key: "exec",
    label: "exec",
    enRole: "Headless single-shot CLI.",
    zhRole: "无头单次 CLI 执行。",
    enTransport: "in-process channel",
    zhTransport: "进程内 channel",
    enAuth: "none (local user)",
    zhAuth: "无（本地用户）",
  },
  {
    key: "appserver",
    label: "app-server",
    enRole: "Multiplexed daemon for IDEs.",
    zhRole: "服务于 IDE 的多路复用守护进程。",
    enTransport: "JSON-RPC over WebSocket",
    zhTransport: "WebSocket 上的 JSON-RPC",
    enAuth: "bearer token",
    zhAuth: "bearer token",
  },
  {
    key: "sdk",
    label: "SDK",
    enRole: "Programmatic client library.",
    zhRole: "编程式客户端库。",
    enTransport: "unix socket",
    zhTransport: "Unix socket",
    enAuth: "OAuth bearer",
    zhAuth: "OAuth bearer",
  },
];

const endpoints: EndpointConfig[] = [
  {
    key: "submission",
    label: "SubmissionLoop",
    enDesc: "Inbound queue of typed Ops.",
    zhDesc: "类型化 Op 的入站队列。",
  },
  {
    key: "events",
    label: "EventStream",
    enDesc: "Outbound runtime events.",
    zhDesc: "运行时的出站事件流。",
  },
  {
    key: "approvals",
    label: "ApprovalQueue",
    enDesc: "Pending tool requests.",
    zhDesc: "等待审批的工具请求。",
  },
  {
    key: "history",
    label: "HistoryReplay",
    enDesc: "Replay of completed sessions.",
    zhDesc: "已完成会话的重放。",
  },
  {
    key: "context",
    label: "LiveContext",
    enDesc: "Snapshot of active conversation.",
    zhDesc: "当前会话的快照。",
  },
  {
    key: "rollout",
    label: "RolloutDownload",
    enDesc: "Persisted rollout artifacts.",
    zhDesc: "已持久化的 rollout 构件。",
  },
];

const matrix: Record<ClientKey, Record<EndpointKey, CellInfo>> = {
  tui: {
    submission: {
      access: "full",
      enFlags: ["typed-Op submit", "Ctrl-C cancels", "interactive prompt"],
      zhFlags: ["提交 typed Op", "Ctrl-C 取消", "交互式输入"],
    },
    events: {
      access: "full",
      enFlags: ["live render", "delta repaint", "ANSI colors"],
      zhFlags: ["实时渲染", "增量重绘", "ANSI 颜色"],
    },
    approvals: {
      access: "full",
      enFlags: ["modal prompt", "y/n keypress", "remember-for-session"],
      zhFlags: ["模态提示", "y/n 按键", "本会话记忆"],
    },
    history: {
      access: "read",
      enFlags: ["scroll-back", "in-buffer search", "no edits"],
      zhFlags: ["向上滚动", "缓冲区搜索", "禁止编辑"],
    },
    context: {
      access: "read",
      enFlags: ["/context command", "inline preview", "no mutate"],
      zhFlags: ["/context 命令", "内联预览", "禁止修改"],
    },
    rollout: {
      access: "none",
      enFlags: ["no fs export", "must use exec --save"],
      zhFlags: ["不能导出文件", "需借助 exec --save"],
    },
  },
  exec: {
    submission: {
      access: "full",
      enFlags: ["one Op via stdin", "headless", "exit on done"],
      zhFlags: ["从 stdin 提交单个 Op", "无头模式", "完成后退出"],
    },
    events: {
      access: "full",
      enFlags: ["JSONL on stdout", "pipe-friendly", "no replay"],
      zhFlags: ["stdout 上的 JSONL", "管道友好", "不可回放"],
    },
    approvals: {
      access: "none",
      enFlags: ["policy decides", "no prompt UI", "auto-deny by default"],
      zhFlags: ["策略决定", "无提示 UI", "默认自动拒绝"],
    },
    history: {
      access: "none",
      enFlags: ["one-shot", "no session recall"],
      zhFlags: ["单次执行", "不回溯会话"],
    },
    context: {
      access: "none",
      enFlags: ["final dump only", "no live snapshot"],
      zhFlags: ["仅末尾输出", "无实时快照"],
    },
    rollout: {
      access: "read",
      enFlags: ["--save-rollout flag", "fs write only", "no fetch back"],
      zhFlags: ["--save-rollout 参数", "仅写入文件", "无法回读"],
    },
  },
  appserver: {
    submission: {
      access: "full",
      enFlags: ["RPC submit method", "per-session Op", "multiplexed"],
      zhFlags: ["RPC submit 方法", "按会话提交 Op", "多路复用"],
    },
    events: {
      access: "full",
      enFlags: ["per-conn subscribe", "fan-out push", "ws backpressure"],
      zhFlags: ["按连接订阅", "扇出推送", "WebSocket 背压"],
    },
    approvals: {
      access: "full",
      enFlags: ["forward to IDE", "wait-for-decision", "timeout policy"],
      zhFlags: ["转发到 IDE", "等待决策", "超时策略"],
    },
    history: {
      access: "full",
      enFlags: ["SQL-backed list", "open by id", "cross-session"],
      zhFlags: ["SQL 列表", "按 id 打开", "跨会话"],
    },
    context: {
      access: "full",
      enFlags: ["live snapshot RPC", "diff stream", "per-session scope"],
      zhFlags: ["实时快照 RPC", "增量流", "按会话作用域"],
    },
    rollout: {
      access: "full",
      enFlags: ["HTTP GET endpoint", "range request", "token-gated"],
      zhFlags: ["HTTP GET 端点", "Range 请求", "需 token"],
    },
  },
  sdk: {
    submission: {
      access: "full",
      enFlags: ["channel.send(Op)", "structured payload", "Promise return"],
      zhFlags: ["channel.send(Op)", "结构化 payload", "返回 Promise"],
    },
    events: {
      access: "full",
      enFlags: ["typed callbacks", "async iterator", "filter helpers"],
      zhFlags: ["类型化回调", "异步迭代器", "过滤辅助函数"],
    },
    approvals: {
      access: "read",
      enFlags: ["observe queue", "user app decides", "no auto-approve"],
      zhFlags: ["观察队列", "用户应用决策", "禁止自动批准"],
    },
    history: {
      access: "read",
      enFlags: ["listSessions()", "loadById()", "no edits"],
      zhFlags: ["listSessions()", "loadById()", "禁止编辑"],
    },
    context: {
      access: "read",
      enFlags: ["snapshot fetch", "no mutate", "trace ids"],
      zhFlags: ["拉取快照", "禁止修改", "携带 trace id"],
    },
    rollout: {
      access: "read",
      enFlags: ["fetchArtifact()", "stream bytes", "OAuth scope"],
      zhFlags: ["fetchArtifact()", "字节流", "OAuth scope"],
    },
  },
};

function colorsForAccess(
  access: Access,
  c: typeof palette.light,
  mode: "light" | "dark",
): { fg: string; bg: string; ring: string } {
  if (access === "full") {
    return {
      fg: c.success,
      bg: c.successSoft,
      ring: c.success + "55",
    };
  }
  if (access === "read") {
    return {
      fg: c.warning,
      bg: c.warningSoft,
      ring: c.warning + "55",
    };
  }
  const fg = mode === "light" ? "#b91c1c" : "#fca5a5";
  const bg =
    mode === "light"
      ? "rgba(185, 28, 28, 0.10)"
      : "rgba(252, 165, 165, 0.16)";
  return { fg, bg, ring: fg + "55" };
}

function accessLabel(access: Access, lang: Lang): string {
  if (access === "full") {
    return localized(lang, "Full access", "完全访问");
  }
  if (access === "read") {
    return localized(lang, "Read-only", "只读");
  }
  return localized(lang, "No access", "无访问权限");
}

function AccessIcon({ access, color }: { access: Access; color: string }) {
  if (access === "full") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M3 7.5L6 10.5L11 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (access === "read") {
    return (
      <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
        <path
          d="M1.5 7C1.5 7 3.8 2.8 8 2.8C12.2 2.8 14.5 7 14.5 7C14.5 7 12.2 11.2 8 11.2C3.8 11.2 1.5 7 1.5 7Z"
          stroke={color}
          strokeWidth="1.4"
          fill="none"
        />
        <circle cx="8" cy="7" r="2.1" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 3L11 11M11 3L3 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface Props {
  lang: Lang;
}

export default function ClientReachabilityBoard({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [selectedClient, setSelectedClient] = useState<ClientKey>("appserver");
  const [selectedEndpoint, setSelectedEndpoint] =
    useState<EndpointKey>("submission");

  const client = clients.find((entry) => entry.key === selectedClient)!;
  const endpoint = endpoints.find((entry) => entry.key === selectedEndpoint)!;
  const cell = matrix[selectedClient][selectedEndpoint];
  const cellColors = colorsForAccess(cell.access, colors, mode);

  const gridTemplate = "minmax(110px, auto) repeat(6, minmax(0, 1fr))";

  return (
    <InteractiveFigure
      lang={lang}
      title="Which clients can reach what?"
      zhTitle="客户端可以触达哪些端点？"
      subtitle="Click a row to focus a client surface, a column to focus a runtime endpoint, or a cell to inspect the exact pairing."
      zhSubtitle="点击行以聚焦某个客户端 surface，点击列以聚焦某个 runtime 端点，点击单元格则查看具体组合。"
      caption="Reachability is encoded in the protocol: surfaces only see what the runtime is willing to project to them."
      zhCaption="可达性由协议编码：surface 只能看到 runtime 愿意向它投影的内容。"
      badge="Chapter 15"
      zhBadge="第 15 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Legend lang={lang} colors={colors} mode={mode} />
          <div
            role="grid"
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
              gap: 4,
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              padding: 6,
              background: colors.background,
              overflowX: "auto",
            }}
          >
            <div />
            {endpoints.map((ep) => {
              const isCol = selectedEndpoint === ep.key;
              return (
                <button
                  key={ep.key}
                  role="columnheader"
                  onClick={() => setSelectedEndpoint(ep.key)}
                  aria-pressed={isCol}
                  style={{
                    appearance: "none",
                    border: `1px solid ${
                      isCol ? colors.accent : "transparent"
                    }`,
                    background: isCol ? colors.accentSoft : "transparent",
                    color: isCol ? colors.accent : colors.textMuted,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    padding: "6px 4px",
                    borderRadius: 7,
                    cursor: "pointer",
                    lineHeight: 1.25,
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                  title={localized(lang, ep.enDesc, ep.zhDesc)}
                >
                  {ep.label}
                </button>
              );
            })}

            {clients.map((c) => {
              const isRow = selectedClient === c.key;
              return (
                <React.Fragment key={c.key}>
                  <button
                    role="rowheader"
                    onClick={() => setSelectedClient(c.key)}
                    aria-pressed={isRow}
                    style={{
                      appearance: "none",
                      border: `1px solid ${
                        isRow ? colors.accent : "transparent"
                      }`,
                      background: isRow ? colors.accentSoft : "transparent",
                      color: isRow ? colors.accent : colors.text,
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "8px 8px",
                      borderRadius: 7,
                      cursor: "pointer",
                      textAlign: "left",
                      lineHeight: 1.25,
                    }}
                    title={localized(lang, c.enRole, c.zhRole)}
                  >
                    {c.label}
                  </button>
                  {endpoints.map((ep) => {
                    const info = matrix[c.key][ep.key];
                    const isSelected =
                      selectedClient === c.key &&
                      selectedEndpoint === ep.key;
                    const inRowOrCol =
                      selectedClient === c.key ||
                      selectedEndpoint === ep.key;
                    const cc = colorsForAccess(info.access, colors, mode);
                    return (
                      <button
                        key={ep.key}
                        role="gridcell"
                        onClick={() => {
                          setSelectedClient(c.key);
                          setSelectedEndpoint(ep.key);
                        }}
                        aria-label={`${c.label} → ${ep.label}: ${accessLabel(
                          info.access,
                          lang,
                        )}`}
                        style={{
                          appearance: "none",
                          border: `1.5px solid ${
                            isSelected
                              ? colors.accent
                              : inRowOrCol
                              ? cc.ring
                              : colors.softBorder
                          }`,
                          background: isSelected
                            ? colors.accentSoft
                            : inRowOrCol
                            ? cc.bg
                            : mode === "light"
                            ? "#fffdf6"
                            : "#1a1a18",
                          borderRadius: 8,
                          minHeight: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          opacity:
                            !inRowOrCol && (selectedClient || selectedEndpoint)
                              ? 0.55
                              : 1,
                          transition: "background 120ms, border 120ms",
                        }}
                      >
                        <AccessIcon access={info.access} color={cc.fg} />
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>

          <p
            style={{
              margin: 0,
              padding: "8px 10px",
              borderRadius: 8,
              border: `1px dashed ${colors.softBorder}`,
              background: mode === "light" ? "#fffaef" : "#232220",
              color: colors.textMuted,
              fontSize: 12,
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: colors.accent, fontWeight: 700 }}>
              {localized(lang, "Note", "提示")}:
            </strong>{" "}
            {localized(
              lang,
              "Surfaces are read-only projections; mutations always re-enter through SubmissionLoop with a typed Op.",
              "Surface 都是只读投影；所有 mutation 必须通过 SubmissionLoop 以 typed Op 形式重新进入。",
            )}
          </p>
        </div>

        <aside
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
            background: colors.background,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {localized(lang, "Selected pairing", "当前组合")}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            <span>{client.label}</span>
            <span style={{ color: colors.textMuted, fontWeight: 500 }}>→</span>
            <span>{endpoint.label}</span>
            <span
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 9px",
                borderRadius: 999,
                background: cellColors.bg,
                border: `1px solid ${cellColors.ring}`,
                color: cellColors.fg,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              <AccessIcon access={cell.access} color={cellColors.fg} />
              {accessLabel(cell.access, lang)}
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: colors.textMuted,
              lineHeight: 1.5,
            }}
          >
            {localized(lang, endpoint.enDesc, endpoint.zhDesc)}
          </p>

          <SidePanelRow
            colors={colors}
            label={localized(lang, "Transport", "传输")}
            value={localized(lang, client.enTransport, client.zhTransport)}
          />
          <SidePanelRow
            colors={colors}
            label={localized(lang, "Auth", "认证")}
            value={localized(lang, client.enAuth, client.zhAuth)}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: colors.textMuted,
              }}
            >
              {localized(lang, "Capability flags", "能力标记")}
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {(lang === "zh" ? cell.zhFlags : cell.enFlags).map((flag) => (
                <li
                  key={flag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: cellColors.bg,
                    border: `1px solid ${cellColors.ring}`,
                    color: cellColors.fg,
                    whiteSpace: "nowrap",
                  }}
                >
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "auto",
              fontSize: 11,
              color: colors.textMuted,
              lineHeight: 1.5,
              borderTop: `1px dashed ${colors.softBorder}`,
              paddingTop: 8,
            }}
          >
            <em>{localized(lang, client.enRole, client.zhRole)}</em>
          </div>
        </aside>
      </div>
    </InteractiveFigure>
  );
}

function SidePanelRow({
  colors,
  label,
  value,
}: {
  colors: typeof palette.light;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(70px, auto) 1fr",
        gap: 8,
        alignItems: "baseline",
        fontSize: 12.5,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: colors.textMuted,
        }}
      >
        {label}
      </span>
      <span style={{ color: colors.text, lineHeight: 1.4 }}>{value}</span>
    </div>
  );
}

function Legend({
  lang,
  colors,
  mode,
}: {
  lang: Lang;
  colors: typeof palette.light;
  mode: "light" | "dark";
}) {
  const items: Array<{ access: Access; en: string; zh: string }> = [
    { access: "full", en: "Full access", zh: "完全访问" },
    { access: "read", en: "Read-only", zh: "只读" },
    { access: "none", en: "No access", zh: "无访问权限" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        fontSize: 11.5,
        color: colors.textMuted,
      }}
    >
      {items.map((item) => {
        const cc = colorsForAccess(item.access, colors, mode);
        return (
          <span
            key={item.access}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 8px",
              borderRadius: 999,
              background: cc.bg,
              border: `1px solid ${cc.ring}`,
              color: cc.fg,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
            }}
          >
            <AccessIcon access={item.access} color={cc.fg} />
            {localized(lang, item.en, item.zh)}
          </span>
        );
      })}
    </div>
  );
}
