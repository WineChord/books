import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type NodeKey =
  | "user"
  | "parent"
  | "mailbox"
  | "code-search"
  | "tester"
  | "doc-writer";

type NodeState = "idle" | "pending" | "running" | "completed";

type EdgeKind = "input" | "spawn" | "post" | "read" | "bubble" | "answer";

interface AgentNode {
  key: NodeKey;
  enName: string;
  zhName: string;
  enRole: string;
  zhRole: string;
  prefix: string;
  enPermission: string;
  zhPermission: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  shape: "circle" | "rect";
}

interface EdgeSpec {
  id: string;
  from: NodeKey;
  to: NodeKey;
  kind: EdgeKind;
  curvature: number;
}

interface LogEntry {
  id: number;
  t: number;
  actor: NodeKey | "system";
  enText: string;
  zhText: string;
}

const NODES: AgentNode[] = [
  {
    key: "user",
    enName: "User",
    zhName: "用户",
    enRole: "Human operator",
    zhRole: "人类操作者",
    prefix: "n/a (out-of-band input)",
    enPermission: "owner, ultimate approver",
    zhPermission: "owner，最终审批方",
    cx: 70,
    cy: 70,
    rx: 38,
    ry: 28,
    shape: "circle",
  },
  {
    key: "parent",
    enName: "Parent agent",
    zhName: "父 agent",
    enRole: "Orchestrator turn loop",
    zhRole: "编排型 turn loop",
    prefix: "ctx:thread:7f3a:parent",
    enPermission: "on-request, receives approval bubbles",
    zhPermission: "on-request，接收 approval bubble",
    cx: 290,
    cy: 72,
    rx: 60,
    ry: 38,
    shape: "circle",
  },
  {
    key: "mailbox",
    enName: "Mailbox",
    zhName: "Mailbox",
    enRole: "Shared append-only bus",
    zhRole: "共享 append-only 总线",
    prefix: "ctx:thread:7f3a:mailbox",
    enPermission: "fan-out reads, append-only writes",
    zhPermission: "fan-out 读取，append-only 写入",
    cx: 500,
    cy: 188,
    rx: 50,
    ry: 56,
    shape: "rect",
  },
  {
    key: "code-search",
    enName: "code-search",
    zhName: "code-search",
    enRole: "Read-only researcher",
    zhRole: "只读检索者",
    prefix: "ctx:thread:7f3a:parent.code-search",
    enPermission: "read-only sandbox",
    zhPermission: "只读 sandbox",
    cx: 105,
    cy: 298,
    rx: 66,
    ry: 32,
    shape: "rect",
  },
  {
    key: "tester",
    enName: "tester",
    zhName: "tester",
    enRole: "Sandbox test runner",
    zhRole: "Sandbox 测试执行者",
    prefix: "ctx:thread:7f3a:parent.tester",
    enPermission: "sandbox-write, approval required",
    zhPermission: "sandbox-write，需 approval",
    cx: 290,
    cy: 298,
    rx: 66,
    ry: 32,
    shape: "rect",
  },
  {
    key: "doc-writer",
    enName: "doc-writer",
    zhName: "doc-writer",
    enRole: "Docs-only writer",
    zhRole: "文档专属写入者",
    prefix: "ctx:thread:7f3a:parent.doc-writer",
    enPermission: "write to docs/** only",
    zhPermission: "仅写入 docs/**",
    cx: 415,
    cy: 298,
    rx: 66,
    ry: 32,
    shape: "rect",
  },
];

const NODE_MAP: Record<NodeKey, AgentNode> = NODES.reduce(
  (acc, node) => {
    acc[node.key] = node;
    return acc;
  },
  {} as Record<NodeKey, AgentNode>,
);

const EDGES: EdgeSpec[] = [
  { id: "user-parent", from: "user", to: "parent", kind: "input", curvature: -0.05 },
  { id: "parent-user", from: "parent", to: "user", kind: "answer", curvature: 0.32 },
  { id: "parent-code-search", from: "parent", to: "code-search", kind: "spawn", curvature: -0.08 },
  { id: "parent-tester", from: "parent", to: "tester", kind: "spawn", curvature: 0 },
  { id: "parent-doc-writer", from: "parent", to: "doc-writer", kind: "spawn", curvature: 0.08 },
  { id: "code-search-mailbox", from: "code-search", to: "mailbox", kind: "post", curvature: 0.18 },
  { id: "tester-mailbox", from: "tester", to: "mailbox", kind: "post", curvature: 0.16 },
  { id: "doc-writer-mailbox", from: "doc-writer", to: "mailbox", kind: "post", curvature: 0.22 },
  { id: "mailbox-code-search", from: "mailbox", to: "code-search", kind: "read", curvature: 0.18 },
  { id: "mailbox-tester", from: "mailbox", to: "tester", kind: "read", curvature: 0.16 },
  { id: "mailbox-doc-writer", from: "mailbox", to: "doc-writer", kind: "read", curvature: 0.22 },
  { id: "code-search-parent", from: "code-search", to: "parent", kind: "bubble", curvature: 0.24 },
  { id: "tester-parent", from: "tester", to: "parent", kind: "bubble", curvature: 0 },
  { id: "doc-writer-parent", from: "doc-writer", to: "parent", kind: "bubble", curvature: -0.24 },
];

const INITIAL_STATES: Record<NodeKey, NodeState> = {
  user: "idle",
  parent: "idle",
  mailbox: "idle",
  "code-search": "idle",
  tester: "idle",
  "doc-writer": "idle",
};

const STEP_COUNT = 7;

function boundaryPoint(node: AgentNode, tx: number, ty: number) {
  const dx = tx - node.cx;
  const dy = ty - node.cy;
  if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) {
    return { x: node.cx, y: node.cy };
  }
  if (node.shape === "circle") {
    const t =
      1 /
      Math.sqrt(
        (dx * dx) / (node.rx * node.rx) + (dy * dy) / (node.ry * node.ry),
      );
    return { x: node.cx + dx * t, y: node.cy + dy * t };
  }
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  const scale = Math.min(
    node.rx / Math.max(adx, 1e-6),
    node.ry / Math.max(ady, 1e-6),
  );
  return { x: node.cx + dx * scale, y: node.cy + dy * scale };
}

function pathFor(edge: EdgeSpec) {
  const from = NODE_MAP[edge.from];
  const to = NODE_MAP[edge.to];
  const start = boundaryPoint(from, to.cx, to.cy);
  const end = boundaryPoint(to, from.cx, from.cy);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const mx = (start.x + end.x) / 2 + nx * len * edge.curvature;
  const my = (start.y + end.y) / 2 + ny * len * edge.curvature;
  return `M${start.x.toFixed(1)},${start.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${end.x.toFixed(1)},${end.y.toFixed(1)}`;
}

function formatTime(t: number) {
  const seconds = Math.floor(t);
  const tenths = Math.floor((t - seconds) * 10);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}.${tenths}`;
}

interface Props {
  lang: Lang;
}

export default function AgentGraphBoard({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [selected, setSelected] = useState<NodeKey>("parent");
  const [states, setStates] =
    useState<Record<NodeKey, NodeState>>(INITIAL_STATES);
  const [revealedEdges, setRevealedEdges] = useState<Set<string>>(new Set());
  const [currentEdges, setCurrentEdges] = useState<Set<string>>(new Set());
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [bubbleOn, setBubbleOn] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const timerRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const idRef = useRef(0);
  const reduceMotionRef = useRef(false);

  const edgeKindColor: Record<EdgeKind, string> = useMemo(
    () => ({
      input: colors.success,
      spawn: colors.accent,
      post: colors.info,
      read: colors.info,
      bubble: colors.warning,
      answer: colors.success,
    }),
    [colors],
  );

  const edgeKindLabel = useCallback(
    (kind: EdgeKind) => {
      const map: Record<EdgeKind, [string, string]> = {
        input: ["user input", "用户输入"],
        spawn: ["spawn", "派生"],
        post: ["post msg", "发送消息"],
        read: ["read msg", "读取消息"],
        bubble: ["bubble", "上浮"],
        answer: ["final answer", "最终回答"],
      };
      return localized(lang, map[kind][0], map[kind][1]);
    },
    [lang],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const handler = (event: MediaQueryListEvent) => {
      reduceMotionRef.current = event.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    },
    [],
  );

  const pushEntries = useCallback(
    (
      entries: Array<{
        actor: NodeKey | "system";
        enText: string;
        zhText: string;
      }>,
    ) => {
      if (entries.length === 0) {
        return;
      }
      const added: LogEntry[] = entries.map((entry) => {
        tRef.current += 0.4;
        idRef.current += 1;
        return {
          id: idRef.current,
          t: tRef.current,
          actor: entry.actor,
          enText: entry.enText,
          zhText: entry.zhText,
        };
      });
      setLog((prev) => [...prev, ...added].slice(-32));
    },
    [],
  );

  const reset = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    tRef.current = 0;
    idRef.current = 0;
    setStep(-1);
    setPlaying(false);
    setStates(INITIAL_STATES);
    setRevealedEdges(new Set());
    setCurrentEdges(new Set());
    setLog([]);
    setBubbleOn(false);
  }, []);

  const applyStep = useCallback(
    (next: number) => {
      const stateUpdates: Partial<Record<NodeKey, NodeState>> = {};
      let edgeIds: string[] = [];
      let entries: Array<{
        actor: NodeKey | "system";
        enText: string;
        zhText: string;
      }> = [];
      switch (next) {
        case 0:
          entries = [
            {
              actor: "user",
              enText: "submit task: refactor login flow",
              zhText: "提交任务：重构 login 流程",
            },
          ];
          edgeIds = ["user-parent"];
          stateUpdates.parent = "running";
          break;
        case 1:
          entries = [
            {
              actor: "parent",
              enText: "spawn code-search, tester, doc-writer",
              zhText: "派生 code-search、tester、doc-writer",
            },
          ];
          edgeIds = [
            "parent-code-search",
            "parent-tester",
            "parent-doc-writer",
          ];
          stateUpdates["code-search"] = "pending";
          stateUpdates.tester = "pending";
          stateUpdates["doc-writer"] = "pending";
          break;
        case 2:
          entries = [
            {
              actor: "code-search",
              enText: "scan files matching `login*`",
              zhText: "扫描匹配 `login*` 的文件",
            },
            {
              actor: "tester",
              enText: "boot sandbox and run suite",
              zhText: "启动 sandbox 并运行测试集",
            },
            {
              actor: "doc-writer",
              enText: "draft changelog entry",
              zhText: "起草 changelog 条目",
            },
          ];
          stateUpdates["code-search"] = "running";
          stateUpdates.tester = "running";
          stateUpdates["doc-writer"] = "running";
          break;
        case 3:
          entries = [
            {
              actor: "code-search",
              enText: "post found_files (8 paths) to mailbox",
              zhText: "向 mailbox 写入 found_files（8 个路径）",
            },
            {
              actor: "tester",
              enText: "post test_failures (2) to mailbox",
              zhText: "向 mailbox 写入 test_failures（2 条）",
            },
            {
              actor: "doc-writer",
              enText: "post draft_diff to mailbox",
              zhText: "向 mailbox 写入 draft_diff",
            },
          ];
          edgeIds = [
            "code-search-mailbox",
            "tester-mailbox",
            "doc-writer-mailbox",
          ];
          stateUpdates.mailbox = "running";
          break;
        case 4:
          entries = [
            {
              actor: "mailbox",
              enText: "fan-out new messages to subscribers",
              zhText: "fan-out 给所有订阅者",
            },
            {
              actor: "doc-writer",
              enText: "read found_files and test_failures",
              zhText: "读取 found_files 与 test_failures",
            },
          ];
          edgeIds = [
            "mailbox-code-search",
            "mailbox-tester",
            "mailbox-doc-writer",
          ];
          break;
        case 5:
          entries = [
            {
              actor: "code-search",
              enText: "bubble result: 8 hits",
              zhText: "向 parent bubble『result: 8 hits』",
            },
            {
              actor: "tester",
              enText: "bubble result: 8/10 pass",
              zhText: "向 parent bubble『result: 8/10 pass』",
            },
            {
              actor: "doc-writer",
              enText: "bubble result: changelog.md ready",
              zhText: "向 parent bubble『result: changelog.md ready』",
            },
          ];
          edgeIds = ["code-search-parent", "tester-parent", "doc-writer-parent"];
          stateUpdates["code-search"] = "completed";
          stateUpdates.tester = "completed";
          stateUpdates["doc-writer"] = "completed";
          break;
        case 6:
          entries = [
            {
              actor: "parent",
              enText: "aggregate sub-results into final answer",
              zhText: "把子结果聚合成最终回答",
            },
            {
              actor: "parent",
              enText: "reply to user with summary + diff",
              zhText: "回复 user：summary + diff",
            },
          ];
          edgeIds = ["parent-user"];
          stateUpdates.parent = "completed";
          stateUpdates.mailbox = "completed";
          break;
        default:
          break;
      }
      setStates((prev) => ({ ...prev, ...stateUpdates }));
      setCurrentEdges(new Set(edgeIds));
      setRevealedEdges((prev) => {
        const nextSet = new Set(prev);
        edgeIds.forEach((id) => nextSet.add(id));
        return nextSet;
      });
      pushEntries(entries);
    },
    [pushEntries],
  );

  const advance = useCallback(() => {
    setStep((s) => {
      const next = s + 1;
      if (next >= STEP_COUNT) {
        setPlaying(false);
        return s;
      }
      applyStep(next);
      return next;
    });
  }, [applyStep]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    const interval = reduceMotionRef.current ? 380 : 950;
    timerRef.current = window.setInterval(advance, interval);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing, advance]);

  const togglePlay = useCallback(() => {
    if (step >= STEP_COUNT - 1) {
      reset();
      setTimeout(() => setPlaying(true), 0);
      return;
    }
    setPlaying((p) => !p);
  }, [step, reset]);

  const toggleBubble = useCallback(() => {
    setBubbleOn((on) => {
      const nextOn = !on;
      if (nextOn) {
        pushEntries([
          {
            actor: "tester",
            enText: "request approval: write outside sandbox",
            zhText: "请求 approval：要在 sandbox 外写入",
          },
          {
            actor: "tester",
            enText: "bubble approval up to parent",
            zhText: "把 approval 上浮给 parent",
          },
          {
            actor: "parent",
            enText: "forward approval request to user",
            zhText: "把 approval 请求转发给 user",
          },
        ]);
      } else {
        pushEntries([
          {
            actor: "user",
            enText: "approve write; resume tester",
            zhText: "批准写入；让 tester 继续",
          },
          {
            actor: "parent",
            enText: "deliver approval back to tester",
            zhText: "把 approval 结果回送 tester",
          },
        ]);
      }
      return nextOn;
    });
  }, [pushEntries]);

  const stateColor = useCallback(
    (s: NodeState) => {
      switch (s) {
        case "pending":
          return colors.warning;
        case "running":
          return colors.accent;
        case "completed":
          return colors.success;
        default:
          return colors.textMuted;
      }
    },
    [colors],
  );

  const stateLabel = useCallback(
    (s: NodeState) => {
      const map: Record<NodeState, [string, string]> = {
        idle: ["idle", "idle"],
        pending: ["pending", "pending"],
        running: ["running", "running"],
        completed: ["completed", "completed"],
      };
      return localized(lang, map[s][0], map[s][1]);
    },
    [lang],
  );

  const bubbleEdges = useMemo(
    () => (bubbleOn ? new Set(["tester-parent", "parent-user"]) : new Set<string>()),
    [bubbleOn],
  );

  const selectedNode = NODE_MAP[selected];

  const buttonStyle = (active: boolean) => ({
    background: active ? colors.accent : colors.panel,
    color: active ? "#fff" : colors.text,
    border: `1px solid ${active ? colors.accent : colors.border}`,
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer" as const,
    fontFamily: "var(--font-mono)",
  });

  return (
    <InteractiveFigure
      lang={lang}
      title="Parent agent, sub-agents, mailboxes"
      zhTitle="父 agent、子 agent 与 mailbox"
      subtitle="Press play to watch the parent spawn three sub-agents and aggregate their results."
      zhSubtitle="点击播放，看父 agent 派生 3 个子 agent 并聚合结果。"
      caption="Approval bubbles travel child → parent → user; sub-agents share state only through the mailbox."
      zhCaption="Approval 沿 child → parent → user 上浮；子 agent 仅通过 mailbox 共享状态。"
      badge="Chapter 20"
      zhBadge="第 20 章"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <button onClick={togglePlay} style={buttonStyle(playing)}>
          {step >= STEP_COUNT - 1
            ? lang === "zh"
              ? "↺ 重新开始"
              : "↺ Restart"
            : playing
            ? lang === "zh"
              ? "⏸ 暂停"
              : "⏸ Pause"
            : lang === "zh"
            ? "▶ 播放"
            : "▶ Play"}
        </button>
        <button
          onClick={advance}
          disabled={playing || step >= STEP_COUNT - 1}
          style={{
            ...buttonStyle(false),
            opacity: playing || step >= STEP_COUNT - 1 ? 0.5 : 1,
            cursor:
              playing || step >= STEP_COUNT - 1 ? "not-allowed" : "pointer",
          }}
        >
          {lang === "zh" ? "下一步" : "Step"}
        </button>
        <button onClick={reset} style={buttonStyle(false)}>
          {lang === "zh" ? "清空" : "Reset"}
        </button>
        <button onClick={toggleBubble} style={buttonStyle(bubbleOn)}>
          {bubbleOn
            ? lang === "zh"
              ? "● Approval bubble: 等待回复"
              : "● Approval bubble: waiting"
            : lang === "zh"
            ? "○ Approval bubble"
            : "○ Approval bubble"}
        </button>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          {lang === "zh" ? "步骤" : "step"} {Math.max(step + 1, 0)}/{STEP_COUNT}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 12,
            background: colors.background,
            padding: 10,
          }}
        >
          <svg
            viewBox="0 0 580 360"
            width="100%"
            height="auto"
            role="img"
            aria-label={
              lang === "zh"
                ? "父 agent 与 3 个子 agent 通过 mailbox 协同的图示"
                : "Parent agent coordinating three sub-agents through a mailbox"
            }
          >
            <defs>
              {(Object.keys(edgeKindColor) as EdgeKind[]).map((kind) => (
                <marker
                  key={kind}
                  id={`agb-arrow-${kind}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerUnits="strokeWidth"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill={edgeKindColor[kind]} />
                </marker>
              ))}
            </defs>

            {EDGES.map((edge) => {
              const isCurrent = currentEdges.has(edge.id);
              const isRevealed = revealedEdges.has(edge.id);
              const isBubble = bubbleEdges.has(edge.id);
              const stroke = edgeKindColor[edge.kind];
              const opacity = isCurrent
                ? 1
                : isBubble
                ? 0.9
                : isRevealed
                ? 0.6
                : 0.22;
              const strokeWidth = isCurrent || isBubble ? 2.6 : 1.4;
              const dash =
                edge.kind === "read"
                  ? "5 4"
                  : isBubble && !isCurrent
                  ? "6 4"
                  : undefined;
              return (
                <path
                  key={edge.id}
                  d={pathFor(edge)}
                  fill="none"
                  stroke={isBubble ? colors.warning : stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={dash}
                  opacity={opacity}
                  markerEnd={`url(#agb-arrow-${
                    isBubble ? "bubble" : edge.kind
                  })`}
                />
              );
            })}

            {!reduceMotionRef.current
              ? Array.from(currentEdges).map((edgeId) => {
                  const edge = EDGES.find((e) => e.id === edgeId);
                  if (!edge) {
                    return null;
                  }
                  return (
                    <circle
                      key={`pulse-${edgeId}`}
                      r={4}
                      fill={edgeKindColor[edge.kind]}
                      opacity={0.85}
                    >
                      <animateMotion
                        path={pathFor(edge)}
                        dur="1.4s"
                        repeatCount="indefinite"
                        rotate="auto"
                      />
                    </circle>
                  );
                })
              : null}

            {NODES.map((node) => {
              const isSelected = selected === node.key;
              const nodeState = states[node.key];
              const ring = stateColor(nodeState);
              const fillBase =
                node.key === "user"
                  ? colors.infoSoft
                  : node.key === "parent"
                  ? colors.accentSoft
                  : node.key === "mailbox"
                  ? colors.successSoft
                  : colors.warningSoft;
              const fill = isSelected
                ? mode === "light"
                  ? "#fffaef"
                  : "#2a2725"
                : fillBase;
              const stroke = isSelected ? colors.accent : ring;
              const labelEn = node.enName;
              const labelZh = node.zhName;
              return (
                <g
                  key={node.key}
                  onClick={() => setSelected(node.key)}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={localized(lang, node.enName, node.zhName)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(node.key);
                    }
                  }}
                >
                  {node.shape === "circle" ? (
                    <ellipse
                      cx={node.cx}
                      cy={node.cy}
                      rx={node.rx}
                      ry={node.ry}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3 : 1.8}
                    />
                  ) : (
                    <rect
                      x={node.cx - node.rx}
                      y={node.cy - node.ry}
                      width={node.rx * 2}
                      height={node.ry * 2}
                      rx={10}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? 3 : 1.8}
                    />
                  )}
                  <text
                    x={node.cx}
                    y={node.cy - 2}
                    textAnchor="middle"
                    fontSize={node.key === "parent" ? 13 : 12}
                    fontWeight={700}
                    fill={colors.text}
                    fontFamily="var(--font-mono)"
                  >
                    {localized(lang, labelEn, labelZh)}
                  </text>
                  <text
                    x={node.cx}
                    y={node.cy + 14}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill={ring}
                    fontFamily="var(--font-mono)"
                  >
                    {stateLabel(nodeState)}
                  </text>
                </g>
              );
            })}
          </svg>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
            }}
          >
            {(Object.keys(edgeKindColor) as EdgeKind[]).map((kind) => (
              <span
                key={kind}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  color: colors.textMuted,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 2,
                    background: edgeKindColor[kind],
                    borderTop:
                      kind === "read"
                        ? `2px dashed ${edgeKindColor[kind]}`
                        : undefined,
                    display: "inline-block",
                  }}
                />
                {edgeKindLabel(kind)}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            border: `1px solid ${colors.border}`,
            borderLeftWidth: 4,
            borderLeftColor: stateColor(states[selectedNode.key]),
            borderRadius: 12,
            padding: 14,
            background:
              mode === "light"
                ? "linear-gradient(180deg, #fffaef 0%, #ffffff 75%)"
                : "linear-gradient(180deg, #232220 0%, #1f1f1d 75%)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              color: colors.accent,
              fontWeight: 700,
            }}
          >
            {lang === "zh" ? "节点详情" : "Node detail"}
          </div>
          <h5
            style={{
              margin: 0,
              fontSize: "1.05rem",
              fontWeight: 700,
              fontFamily: "var(--font-serif, inherit)",
            }}
          >
            {localized(lang, selectedNode.enName, selectedNode.zhName)}
          </h5>
          <div
            style={{
              fontSize: 12,
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
            }}
          >
            {localized(lang, "role:", "role：")}{" "}
            <span style={{ color: colors.text, fontWeight: 600 }}>
              {localized(lang, selectedNode.enRole, selectedNode.zhRole)}
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
              wordBreak: "break-all",
            }}
          >
            {lang === "zh" ? "prompt cache 前缀：" : "prompt cache prefix:"}
            <br />
            <span style={{ color: colors.text }}>{selectedNode.prefix}</span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
            }}
          >
            {lang === "zh" ? "permission：" : "permission:"}{" "}
            <span style={{ color: colors.text }}>
              {localized(
                lang,
                selectedNode.enPermission,
                selectedNode.zhPermission,
              )}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: "auto",
              paddingTop: 10,
              borderTop: `1px dashed ${colors.softBorder}`,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            <span style={{ color: colors.textMuted }}>
              {lang === "zh" ? "当前状态：" : "current state:"}
            </span>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                background: `${stateColor(states[selectedNode.key])}22`,
                color: stateColor(states[selectedNode.key]),
                fontWeight: 700,
                border: `1px solid ${stateColor(states[selectedNode.key])}`,
              }}
            >
              {stateLabel(states[selectedNode.key])}
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: colors.textMuted,
              fontStyle: "italic",
            }}
          >
            {lang === "zh"
              ? "点击图中任意节点切换详情。"
              : "Click any node in the graph to switch detail."}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 12,
          background: colors.background,
          padding: "8px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              color: colors.accent,
              fontWeight: 700,
            }}
          >
            {lang === "zh" ? "活动日志" : "Activity log"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            {log.length} {lang === "zh" ? "条" : "entries"}
          </div>
        </div>
        <div
          role="list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxHeight: 180,
            overflowY: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
          }}
        >
          {log.length === 0 ? (
            <div
              style={{
                padding: "16px 8px",
                textAlign: "center",
                color: colors.textMuted,
              }}
            >
              {lang === "zh"
                ? "日志为空。点击播放或下一步开始模拟。"
                : "Log is empty. Press play or step to start."}
            </div>
          ) : null}
          {log.map((entry) => {
            const actorColor =
              entry.actor === "system"
                ? colors.textMuted
                : entry.actor === "user"
                ? colors.info
                : entry.actor === "parent"
                ? colors.accent
                : entry.actor === "mailbox"
                ? colors.success
                : colors.warning;
            return (
              <div
                key={entry.id}
                role="listitem"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto 1fr",
                  gap: 8,
                  padding: "3px 6px",
                  borderRadius: 6,
                  background: `${actorColor}10`,
                }}
              >
                <span style={{ color: colors.textMuted, minWidth: 56 }}>
                  {formatTime(entry.t)}
                </span>
                <span
                  style={{
                    color: actorColor,
                    fontWeight: 700,
                    minWidth: 96,
                  }}
                >
                  {entry.actor}
                </span>
                <span style={{ color: colors.text }}>
                  {localized(lang, entry.enText, entry.zhText)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </InteractiveFigure>
  );
}
