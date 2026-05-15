import React, { useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type EventKey =
  | "agent-message-delta"
  | "tool-call-proposed"
  | "approval-requested"
  | "turn-diff"
  | "compaction-started";

type SurfaceKey = "tui" | "rpc" | "sdk" | "md";

interface SurfaceMeta {
  key: SurfaceKey;
  enLabel: string;
  zhLabel: string;
  enHint: string;
  zhHint: string;
}

interface EventSample {
  key: EventKey;
  name: string;
  enLabel: string;
  zhLabel: string;
  enSummary: string;
  zhSummary: string;
  core: string;
  renders: Record<SurfaceKey, string>;
}

const surfaceMeta: SurfaceMeta[] = [
  {
    key: "tui",
    enLabel: "TUI",
    zhLabel: "TUI",
    enHint: "ASCII inside the terminal cell grid.",
    zhHint: "终端栅格中的 ASCII。",
  },
  {
    key: "rpc",
    enLabel: "app-server",
    zhLabel: "app-server",
    enHint: "JSON-RPC notification on the wire.",
    zhHint: "线上的 JSON-RPC notification。",
  },
  {
    key: "sdk",
    enLabel: "SDK",
    zhLabel: "SDK",
    enHint: "Typed object handed to user code.",
    zhHint: "交给用户代码的 typed 对象。",
  },
  {
    key: "md",
    enLabel: "Markdown export",
    zhLabel: "Markdown 导出",
    enHint: "Frozen artifact for sharing or replay.",
    zhHint: "可分享或重放的静态产物。",
  },
];

const events: EventSample[] = [
  {
    key: "agent-message-delta",
    name: "AgentMessageDelta",
    enLabel: "Agent message delta",
    zhLabel: "Agent message delta",
    enSummary: "A streaming chunk of the assistant turn's prose.",
    zhSummary: "助手 turn 输出文本的流式片段。",
    core: `Event {
  kind:    AgentMessageDelta,
  turn_id: "turn_24b1",
  delta:   "Patching cart.ts to handle empty quantity..."
}`,
    renders: {
      tui: `assistant>
  Patching cart.ts to handle empty quantity\u2588`,
      rpc: `{
  "jsonrpc": "2.0",
  "method":  "turnEvent",
  "params": {
    "turnId": "turn_24b1",
    "kind":   "agent_message_delta",
    "delta":  "Patching cart.ts to handle empty quantity..."
  }
}`,
      sdk: `AgentMessageDeltaEvent {
  turnId:   "turn_24b1",
  delta:    "Patching cart.ts to handle empty quantity...",
  finished: false,
}`,
      md: `> assistant
> Patching cart.ts to handle empty quantity...`,
    },
  },
  {
    key: "tool-call-proposed",
    name: "ToolCallProposed",
    enLabel: "Tool call proposed",
    zhLabel: "Tool call proposed",
    enSummary: "Model proposes a shell command before execution.",
    zhSummary: "模型在执行前提议一次 shell 调用。",
    core: `Event {
  kind:    ToolCallProposed,
  call_id: "call_3c9",
  tool:    "shell",
  args:    { cmd: ["bun","test","cart.test.ts"], cwd: "/repo" }
}`,
    renders: {
      tui: `\u250c\u2500 tool: shell \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 $ bun test cart.test.ts    \u2502
\u2502 cwd: /repo                 \u2502
\u2502 [enter] approve [esc] skip \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
      rpc: `{
  "jsonrpc": "2.0",
  "method":  "turnEvent",
  "params": {
    "turnId": "turn_24b1",
    "kind":   "tool_call_proposed",
    "callId": "call_3c9",
    "tool":   "shell",
    "args":   {
      "cmd": ["bun","test","cart.test.ts"],
      "cwd": "/repo"
    }
  }
}`,
      sdk: `ToolCallProposedEvent {
  callId:   "call_3c9",
  tool:     "shell",
  args:     { cmd: ["bun","test","cart.test.ts"], cwd: "/repo" },
  approval: "pending",
}`,
      md: `### Tool call (proposed)
- **tool**: \`shell\`
- **command**: \`bun test cart.test.ts\`
- **cwd**: \`/repo\``,
    },
  },
  {
    key: "approval-requested",
    name: "ApprovalRequested",
    enLabel: "Approval requested",
    zhLabel: "Approval requested",
    enSummary: "Sandbox asks the user to authorize a destructive op.",
    zhSummary: "sandbox 请求用户授权一次破坏性操作。",
    core: `Event {
  kind:    ApprovalRequested,
  call_id: "call_3c9",
  reason:  "writes outside cwd",
  command: ["rm","-rf","build/"]
}`,
    renders: {
      tui: `! approval needed: writes outside cwd
  $ rm -rf build/
  [y] approve  [a] always  [n] deny`,
      rpc: `{
  "jsonrpc": "2.0",
  "method":  "askApproval",
  "id":      101,
  "params": {
    "callId":  "call_3c9",
    "reason":  "writes outside cwd",
    "command": ["rm","-rf","build/"]
  }
}`,
      sdk: `ApprovalRequestedEvent {
  callId:  "call_3c9",
  reason:  "writes outside cwd",
  command: ["rm","-rf","build/"],
  decide:  (d: "approve" | "deny") => Promise<void>,
}`,
      md: `> [!warning] Approval requested
> writes outside cwd
>
> \`\`\`sh
> rm -rf build/
> \`\`\``,
    },
  },
  {
    key: "turn-diff",
    name: "TurnDiff",
    enLabel: "Turn diff",
    zhLabel: "Turn diff",
    enSummary: "Aggregated patch produced by the turn.",
    zhSummary: "一次 turn 产出的合并 patch。",
    core: `Event {
  kind:    TurnDiff,
  turn_id: "turn_24b1",
  summary: { files: 1, +: 4, -: 1 },
  hunks:   [{ path: "cart.ts", "+": 4, "-": 1 }]
}`,
    renders: {
      tui: `diff: cart.ts  (+4 -1)
+   if (!quantity) return 0;
+   if (quantity < 0) {
+     throw new Error("neg");
+   }
-   return price * quantity;`,
      rpc: `{
  "jsonrpc": "2.0",
  "method":  "turnEvent",
  "params": {
    "turnId":  "turn_24b1",
    "kind":    "turn_diff",
    "summary": { "files": 1, "+": 4, "-": 1 },
    "patches": [{ "path": "cart.ts", "unified": "@@ -3,1 +3,4 @@" }]
  }
}`,
      sdk: `TurnDiffEvent {
  turnId:  "turn_24b1",
  summary: { files: 1, insertions: 4, deletions: 1 },
  patches: [{ path: "cart.ts", unified: "@@ ..." }],
}`,
      md: `### Diff

| file    | + | - |
| ------- | - | - |
| cart.ts | 4 | 1 |

\`\`\`diff
+ if (!quantity) return 0;
+ if (quantity < 0) {
+   throw new Error("neg");
+ }
- return price * quantity;
\`\`\``,
    },
  },
  {
    key: "compaction-started",
    name: "CompactionStarted",
    enLabel: "Compaction started",
    zhLabel: "Compaction started",
    enSummary: "Runtime begins summarizing and pruning prior turns.",
    zhSummary: "runtime 开始对历史 turn 做总结与裁剪。",
    core: `Event {
  kind:      CompactionStarted,
  thread_id: "thr_8f3a",
  reason:    "token_budget",
  keep_last: 10
}`,
    renders: {
      tui: `\u00b7\u00b7\u00b7 compacting thread (keep last 10) \u00b7\u00b7\u00b7
   reason: token_budget   in flight: yes`,
      rpc: `{
  "jsonrpc": "2.0",
  "method":  "turnEvent",
  "params": {
    "threadId": "thr_8f3a",
    "kind":     "compaction_started",
    "reason":   "token_budget",
    "keepLast": 10
  }
}`,
      sdk: `CompactionStartedEvent {
  threadId: "thr_8f3a",
  reason:   "token_budget",
  keepLast: 10,
  inFlight: true,
}`,
      md: `> _Compaction started_
> - reason: \`token_budget\`
> - keep last: \`10\``,
    },
  },
];

interface Props {
  lang: Lang;
}

export default function EventRendererLab({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [active, setActive] = useState<EventKey>(events[0].key);
  const event = events.find((e) => e.key === active) ?? events[0];

  const codeBg = mode === "light" ? "#1f1f1c" : "#0d0d0c";
  const codeText = "#f5f1e2";

  const surfaceAccent: Record<SurfaceKey, string> = {
    tui: colors.warning,
    rpc: colors.info,
    sdk: colors.success,
    md: colors.accent,
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="One event, many renderings"
      zhTitle="同一个 event，多种渲染"
      subtitle="Pick a runtime event and watch four surfaces project the same payload differently."
      zhSubtitle="挑一个 runtime 事件，看四种 surface 如何把同一份 payload 投影成不同形态。"
      caption="The event is canonical; each renderer is a pure function over it. Adding a new surface means writing a new projection, not changing the event."
      zhCaption="event 本体是唯一真理，renderer 只是它的纯函数。新增 surface 等价于新增一个投影，不需要改 event。"
      badge="Chapter 16"
      zhBadge="第 16 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          role="tablist"
          aria-label={lang === "zh" ? "事件选择" : "Event picker"}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {events.map((entry) => {
            const isActive = entry.key === active;
            return (
              <button
                key={entry.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(entry.key)}
                style={{
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: `1.4px solid ${
                    isActive ? colors.accent : colors.softBorder
                  }`,
                  background: isActive ? colors.accentSoft : colors.panel,
                  color: isActive ? colors.accentHover : colors.text,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 120ms ease, border-color 120ms ease",
                }}
              >
                {entry.name}
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
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
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
              {lang === "zh" ? "底层 event（单一真理）" : "Underlying event (single source of truth)"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
              }}
            >
              {event.name}
            </div>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: colors.textMuted,
              lineHeight: 1.55,
            }}
          >
            {localized(lang, event.enSummary, event.zhSummary)}
          </p>
          <pre
            style={{
              margin: 0,
              padding: "10px 12px",
              background: codeBg,
              color: codeText,
              borderRadius: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              lineHeight: 1.55,
              overflowX: "auto",
              borderLeft: `3px solid ${colors.accent}`,
            }}
          >
            <code>{event.core}</code>
          </pre>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 10,
          }}
        >
          {surfaceMeta.map((meta) => (
            <SurfacePane
              key={meta.key}
              meta={meta}
              lang={lang}
              body={event.renders[meta.key]}
              accent={surfaceAccent[meta.key]}
              codeBg={codeBg}
              codeText={codeText}
              colors={colors}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            border: `1px dashed ${colors.accent}`,
            borderRadius: 10,
            background: colors.accentSoft,
            color: colors.text,
            fontSize: 12.5,
            lineHeight: 1.55,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: colors.accent,
            }}
          >
            =
          </span>
          <span>
            {lang === "zh"
              ? "上面四格的内容都是从同一个 event 派生出来的。改 event 会同时改四格；改某一格只会改它自己。"
              : "All four panes derive from the same event. Changing the event updates all four; changing one pane only edits that pane."}
          </span>
        </div>
      </div>
    </InteractiveFigure>
  );
}

type Colors = (typeof palette)[keyof typeof palette];

function SurfacePane({
  meta,
  lang,
  body,
  accent,
  codeBg,
  codeText,
  colors,
}: {
  meta: SurfaceMeta;
  lang: Lang;
  body: string;
  accent: string;
  codeBg: string;
  codeText: string;
  colors: Colors;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: 10,
        border: `1px solid ${colors.softBorder}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 10,
        background: colors.panel,
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
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {localized(lang, meta.enLabel, meta.zhLabel)}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: colors.textMuted,
          }}
        >
          {meta.key}
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 11.5,
          color: colors.textMuted,
          lineHeight: 1.45,
        }}
      >
        {localized(lang, meta.enHint, meta.zhHint)}
      </p>
      <pre
        style={{
          margin: 0,
          padding: "8px 10px",
          background: codeBg,
          color: codeText,
          borderRadius: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          lineHeight: 1.55,
          overflowX: "auto",
          minHeight: 120,
        }}
      >
        <code>{body}</code>
      </pre>
    </div>
  );
}
