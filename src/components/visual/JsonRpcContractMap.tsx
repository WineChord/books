import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette, type Palette } from "./useThemeMode";

type Direction = "c2s" | "s2c";
type Mode = "light" | "dark";

interface MethodSpec {
  id: string;
  name: string;
  summaryEn: string;
  summaryZh: string;
  request: Record<string, unknown>;
  response: Record<string, unknown>;
  errorHintEn?: string;
  errorHintZh?: string;
}

interface NotificationSpec {
  name: string;
  summaryEn: string;
  summaryZh: string;
  payload: Record<string, unknown>;
}

// Methods the client (TUI / IDE / SDK) calls on the app-server.
const clientToServer: MethodSpec[] = [
  {
    id: "c2s-send-input",
    name: "sendInput",
    summaryEn: "Submit a new user turn (text or tool result) to the agent.",
    summaryZh: "向 agent 提交一次新的用户 turn（文本或工具结果）。",
    request: { jsonrpc: "2.0", id: 42, method: "sendInput", params: { threadId: "thr_8f3a", items: [{ type: "text", text: "Fix cart.ts test" }], cwd: "/repo" } },
    response: { jsonrpc: "2.0", id: 42, result: { turnId: "turn_24b1", accepted: true, queuePosition: 0 } },
    errorHintEn: "Returns -32010 'thread_busy' if a turn is already running.",
    errorHintZh: "若已有 turn 在跑，会返回 -32010 'thread_busy' 错误。",
  },
  {
    id: "c2s-read-state",
    name: "readState",
    summaryEn: "Snapshot session state without consuming events.",
    summaryZh: "读取一次会话状态快照，不消费任何事件。",
    request: { jsonrpc: "2.0", id: 43, method: "readState", params: { threadId: "thr_8f3a", fields: ["model", "sandbox", "approval"] } },
    response: { jsonrpc: "2.0", id: 43, result: { model: "claude-sonnet-4", sandbox: "workspace-write", approval: "ask", turnInFlight: false } },
  },
  {
    id: "c2s-get-thread",
    name: "getThread",
    summaryEn: "Fetch the persisted rollout for replay or audit.",
    summaryZh: "拉取已持久化的 rollout，用于回放或审计。",
    request: { jsonrpc: "2.0", id: 44, method: "getThread", params: { threadId: "thr_8f3a", includeEvents: true, limit: 50 } },
    response: { jsonrpc: "2.0", id: 44, result: { threadId: "thr_8f3a", turns: 12, messages: [{ role: "user", text: "ship it" }, { role: "assistant", text: "build green" }] } },
    errorHintEn: "Returns -32004 'thread_not_found' when the id is unknown.",
    errorHintZh: "若 server 不认识该 id，会返回 -32004 'thread_not_found' 错误。",
  },
  {
    id: "c2s-interrupt",
    name: "interrupt",
    summaryEn: "Cancel the active turn and drain tool calls cleanly.",
    summaryZh: "中止正在进行的 turn 并干净地清理工具调用。",
    request: { jsonrpc: "2.0", id: 45, method: "interrupt", params: { threadId: "thr_8f3a", reason: "user-cancelled" } },
    response: { jsonrpc: "2.0", id: 45, result: { stopped: true, drainedToolCalls: 2 } },
  },
];

// Methods the app-server calls back on the client.
const serverToClient: MethodSpec[] = [
  {
    id: "s2c-ask-approval",
    name: "askApproval",
    summaryEn: "Server asks the user to approve a sandbox-escaping call.",
    summaryZh: "server 请求用户批准一次会逃逸 sandbox 的调用。",
    request: { jsonrpc: "2.0", id: 1001, method: "askApproval", params: { callId: "call_3c9", tool: "shell", command: ["rm", "-rf", "build/"], reason: "write outside workspace" } },
    response: { jsonrpc: "2.0", id: 1001, result: { decision: "approve", remember: true } },
    errorHintEn: "If the client times out, the server treats the call as denied.",
    errorHintZh: "如果客户端超时，server 视为拒绝并继续执行。",
  },
  {
    id: "s2c-present-event",
    name: "presentEvent",
    summaryEn: "Server pushes a turn event for the client UI to render.",
    summaryZh: "server 推送一个 turn 事件给客户端 UI 渲染。",
    request: { jsonrpc: "2.0", id: 1002, method: "presentEvent", params: { turnId: "turn_24b1", kind: "tool_result", toolCallId: "call_3c9", ok: true } },
    response: { jsonrpc: "2.0", id: 1002, result: { rendered: true, clientAckTs: 1715750412345 } },
  },
  {
    id: "s2c-request-input",
    name: "requestInput",
    summaryEn: "Server prompts the user mid-turn for additional input.",
    summaryZh: "server 在 turn 中途向用户请求补充输入。",
    request: { jsonrpc: "2.0", id: 1003, method: "requestInput", params: { turnId: "turn_24b1", prompt: "Which version to pin?", choices: ["latest", "1.4.x", "cancel"] } },
    response: { jsonrpc: "2.0", id: 1003, result: { answer: "1.4.x", cancelled: false } },
    errorHintEn: "Client may reply with -32800 'input_cancelled' to abort the turn.",
    errorHintZh: "客户端可回 -32800 'input_cancelled' 以中止该 turn。",
  },
  {
    id: "s2c-pick-account",
    name: "pickAccount",
    summaryEn: "Server asks which auth account a tool should use.",
    summaryZh: "server 询问工具该用哪个鉴权账号。",
    request: { jsonrpc: "2.0", id: 1004, method: "pickAccount", params: { provider: "github", accounts: ["alice@example.com", "alice-bot"] } },
    response: { jsonrpc: "2.0", id: 1004, result: { account: "alice-bot" } },
  },
];

// One-way pushes that never expect a reply.
const notifications: NotificationSpec[] = [
  {
    name: "turnEvent",
    summaryEn: "Broadcast a turn lifecycle event (start / delta / end).",
    summaryZh: "广播 turn 生命周期事件（开始 / 增量 / 结束）。",
    payload: { jsonrpc: "2.0", method: "turnEvent", params: { turnId: "turn_24b1", phase: "turn.delta", delta: { kind: "text", text: "Patching cart.ts..." } } },
  },
  {
    name: "costUpdate",
    summaryEn: "Push token-usage and cost deltas to the running UI tally.",
    summaryZh: "推送 token 用量与花费增量给 UI 的累计计数。",
    payload: { jsonrpc: "2.0", method: "costUpdate", params: { threadId: "thr_8f3a", inputTokens: 2104, outputTokens: 356, usd: 0.0143 } },
  },
  {
    name: "threadResume",
    summaryEn: "Announce a previously detached thread was rehydrated.",
    summaryZh: "宣告一个之前脱离的 thread 已被复原。",
    payload: { jsonrpc: "2.0", method: "threadResume", params: { threadId: "thr_8f3a", fromEventId: "evt_77", reason: "reconnect" } },
  },
];

export default function JsonRpcContractMap({ lang }: { lang: Lang }) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [direction, setDirection] = useState<Direction>("c2s");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selected, setSelected] = useState<string>(clientToServer[0].id);

  const methods = direction === "c2s" ? clientToServer : serverToClient;
  const active = useMemo(
    () => methods.find((m) => m.id === selected) ?? methods[0],
    [methods, selected],
  );

  const switchDirection = (next: Direction) => {
    setDirection(next);
    const list = next === "c2s" ? clientToServer : serverToClient;
    setSelected(list[0].id);
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Bidirectional JSON-RPC contract"
      zhTitle="双向 JSON-RPC 契约"
      subtitle="Both peers may originate calls. Pick a direction to inspect the methods, their JSON shapes, and the fire-and-forget notifications."
      zhSubtitle="双方都可以发起调用。选择方向即可看到方法清单、JSON 形状与单向 notification。"
      caption="Requests carry an id and expect a result-or-error envelope; notifications never do."
      zhCaption="request 带 id 且期待 result 或 error 回包；notification 既没有 id 也没有回包。"
      badge="Chapter 14"
      zhBadge="第 14 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Controls
          lang={lang}
          colors={colors}
          direction={direction}
          onDirectionChange={switchDirection}
          showNotifications={showNotifications}
          onToggleNotifications={setShowNotifications}
        />
        {showNotifications ? (
          <NotificationsPanel lang={lang} colors={colors} mode={mode} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 230px) minmax(0, 1fr)",
              gap: 12,
            }}
          >
            <MethodList
              lang={lang}
              colors={colors}
              methods={methods}
              selectedId={active.id}
              onSelect={setSelected}
            />
            <MethodDetail
              lang={lang}
              colors={colors}
              mode={mode}
              method={active}
            />
          </div>
        )}
      </div>
    </InteractiveFigure>
  );
}

function Controls({
  lang,
  colors,
  direction,
  onDirectionChange,
  showNotifications,
  onToggleNotifications,
}: {
  lang: Lang;
  colors: Palette;
  direction: Direction;
  onDirectionChange: (d: Direction) => void;
  showNotifications: boolean;
  onToggleNotifications: (v: boolean) => void;
}) {
  const options: Array<{ value: Direction; label: string; arrow: string }> = [
    { value: "c2s", label: "client -> server", arrow: "→" },
    { value: "s2c", label: "server -> client", arrow: "←" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 12,
        padding: "8px 10px",
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color: colors.textMuted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {localized(lang, "direction", "方向")}
      </span>
      {options.map((opt) => {
        const isActive = !showNotifications && opt.value === direction;
        return (
          <button
            key={opt.value}
            onClick={() => onDirectionChange(opt.value)}
            disabled={showNotifications}
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              border: `1px solid ${isActive ? colors.accent : colors.border}`,
              background: isActive ? colors.accentSoft : colors.panel,
              color: isActive ? colors.accentHover : colors.text,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              cursor: showNotifications ? "not-allowed" : "pointer",
              opacity: showNotifications ? 0.45 : 1,
            }}
          >
            <span style={{ marginRight: 4 }}>{opt.arrow}</span>
            {opt.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: colors.text,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={showNotifications}
          onChange={(event) => onToggleNotifications(event.target.checked)}
          style={{ accentColor: colors.accent }}
        />
        <span style={{ fontWeight: 600 }}>
          {localized(
            lang,
            "show notifications (no response)",
            "显示 notification（无回包）",
          )}
        </span>
      </label>
    </div>
  );
}

function MethodList({
  lang,
  colors,
  methods,
  selectedId,
  onSelect,
}: {
  lang: Lang;
  colors: Palette;
  methods: MethodSpec[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 8,
        background: colors.panel,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: colors.accent,
          padding: "2px 4px 6px",
        }}
      >
        {localized(lang, "methods", "方法")}
      </div>
      {methods.map((method) => {
        const isActive = method.id === selectedId;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            style={{
              textAlign: "left",
              padding: "6px 8px",
              borderRadius: 7,
              border: `1px solid ${isActive ? colors.accent : "transparent"}`,
              background: isActive ? colors.accentSoft : "transparent",
              color: colors.text,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                color: isActive ? colors.accentHover : colors.text,
              }}
            >
              {method.name}
            </span>
            <span
              style={{ fontSize: 11, color: colors.textMuted, lineHeight: 1.4 }}
            >
              {localized(lang, method.summaryEn, method.summaryZh)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MethodDetail({
  lang,
  colors,
  mode,
  method,
}: {
  lang: Lang;
  colors: Palette;
  mode: Mode;
  method: MethodSpec;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          {method.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          {localized(lang, "request id", "请求 id")}: {String(method.request.id)}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 10,
        }}
      >
        <JsonPane
          colors={colors}
          mode={mode}
          heading={localized(lang, "request", "请求")}
          accent={colors.info}
          payload={method.request}
        />
        <JsonPane
          colors={colors}
          mode={mode}
          heading={localized(lang, "response", "回包")}
          accent={colors.success}
          payload={method.response}
        />
      </div>
      {method.errorHintEn ? (
        <div
          style={{
            padding: "6px 10px",
            borderLeft: `3px solid ${colors.warning}`,
            background: colors.warningSoft,
            color: colors.text,
            fontSize: 12,
            lineHeight: 1.5,
            borderRadius: 6,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: colors.warning,
              marginRight: 6,
            }}
          >
            {localized(lang, "error", "错误")}
          </span>
          {localized(lang, method.errorHintEn, method.errorHintZh ?? method.errorHintEn)}
        </div>
      ) : null}
    </div>
  );
}

function NotificationsPanel({
  lang,
  colors,
  mode,
}: {
  lang: Lang;
  colors: Palette;
  mode: Mode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          padding: "6px 10px",
          borderLeft: `3px solid ${colors.info}`,
          background: colors.infoSoft,
          color: colors.text,
          fontSize: 12,
          lineHeight: 1.5,
          borderRadius: 6,
        }}
      >
        {localized(
          lang,
          "Notifications carry no id field and never receive a response. They flow in both directions, mostly for streaming state.",
          "Notification 没有 id 字段，也永远不会收到回包；它在两个方向上都可流动，主要用于状态的流式推送。",
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}
      >
        {notifications.map((notif) => (
          <div
            key={notif.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: 10,
              border: `1px dashed ${colors.accent}`,
              background: colors.accentSoft,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: colors.accentHover,
                }}
              >
                {notif.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: colors.textMuted,
                }}
              >
                {localized(lang, "no id", "无 id")}
              </span>
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: colors.textMuted,
                lineHeight: 1.5,
              }}
            >
              {localized(lang, notif.summaryEn, notif.summaryZh)}
            </div>
            <JsonPane
              colors={colors}
              mode={mode}
              heading={localized(lang, "payload", "载荷")}
              accent={colors.accent}
              payload={notif.payload}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function JsonPane({
  colors,
  mode,
  heading,
  accent,
  payload,
}: {
  colors: Palette;
  mode: Mode;
  heading: string;
  accent: string;
  payload: Record<string, unknown>;
}) {
  const bg = mode === "light" ? "#1f1f1c" : "#0d0d0c";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {heading}
      </span>
      <pre
        style={{
          margin: 0,
          padding: "8px 10px",
          background: bg,
          color: "#f5f1e2",
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          lineHeight: 1.55,
          overflowX: "auto",
        }}
      >
        <code>{renderJson(payload, 0)}</code>
      </pre>
    </div>
  );
}

// Accent palette for the syntax-highlighted JSON renderer.
const KEY_COLOR = "#fdba74";
const STRING_COLOR = "#bef264";
const NUMBER_COLOR = "#7dd3fc";
const BOOL_COLOR = "#fca5a5";
const PUNCT_COLOR = "#a3a298";

function renderJson(value: unknown, depth: number): React.ReactNode {
  const indent = "  ".repeat(depth);
  const childIndent = "  ".repeat(depth + 1);
  if (value === null) return <span style={{ color: PUNCT_COLOR }}>null</span>;
  if (typeof value === "string") {
    return <span style={{ color: STRING_COLOR }}>{JSON.stringify(value)}</span>;
  }
  if (typeof value === "number") {
    return <span style={{ color: NUMBER_COLOR }}>{String(value)}</span>;
  }
  if (typeof value === "boolean") {
    return <span style={{ color: BOOL_COLOR }}>{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: PUNCT_COLOR }}>[]</span>;
    return (
      <>
        <span style={{ color: PUNCT_COLOR }}>[</span>{"\n"}
        {value.map((item, index) => (
          <React.Fragment key={index}>
            <span>{childIndent}</span>
            {renderJson(item, depth + 1)}
            {index < value.length - 1 ? (
              <span style={{ color: PUNCT_COLOR }}>,</span>
            ) : null}
            {"\n"}
          </React.Fragment>
        ))}
        <span>{indent}</span>
        <span style={{ color: PUNCT_COLOR }}>]</span>
      </>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) {
      return <span style={{ color: PUNCT_COLOR }}>{"{}"}</span>;
    }
    return (
      <>
        <span style={{ color: PUNCT_COLOR }}>{"{"}</span>{"\n"}
        {entries.map(([k, v], index) => (
          <React.Fragment key={k}>
            <span>{childIndent}</span>
            <span style={{ color: KEY_COLOR }}>{JSON.stringify(k)}</span>
            <span style={{ color: PUNCT_COLOR }}>: </span>
            {renderJson(v, depth + 1)}
            {index < entries.length - 1 ? (
              <span style={{ color: PUNCT_COLOR }}>,</span>
            ) : null}
            {"\n"}
          </React.Fragment>
        ))}
        <span>{indent}</span>
        <span style={{ color: PUNCT_COLOR }}>{"}"}</span>
      </>
    );
  }
  return <span style={{ color: PUNCT_COLOR }}>{String(value)}</span>;
}
