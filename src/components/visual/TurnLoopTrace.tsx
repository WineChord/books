import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type StepKey =
  | "schedule"
  | "resolve_context"
  | "stream_model"
  | "detect_tool_calls"
  | "exec_tools"
  | "record_history"
  | "fire_hooks"
  | "budget_check"
  | "continue_or_complete";

interface AppendEntry {
  enLabel: string;
  zhLabel: string;
  kind: "context" | "assistant" | "tool_call" | "tool_output" | "summary";
}

interface Step {
  key: StepKey;
  enTitle: string;
  zhTitle: string;
  enSummary: string;
  zhSummary: string;
  enDetails: string[];
  zhDetails: string[];
  enSource: string;
  tokenDelta: number;
  appends?: AppendEntry[];
}

const TOKEN_BUDGET = 200_000;

const steps: Step[] = [
  {
    key: "schedule",
    enTitle: "schedule",
    zhTitle: "schedule",
    enSummary:
      "TurnContext built; SubmissionLoop dequeues an op.",
    zhSummary:
      "构建 TurnContext；SubmissionLoop 取出一个 op。",
    enDetails: [
      "Input op pulled from the submission queue.",
      "TurnContext snapshots model, cwd, sandbox, settings.",
      "Cancellation token wired into the per-turn scope.",
    ],
    zhDetails: [
      "从 submission 队列取出输入 op。",
      "TurnContext 快照 model、cwd、sandbox、settings。",
      "Cancellation token 接入本 turn 的作用域。",
    ],
    enSource: "session/submission_loop.rs",
    tokenDelta: 0,
  },
  {
    key: "resolve_context",
    enTitle: "resolve_context",
    zhTitle: "resolve_context",
    enSummary:
      "ContextManager assembles ledger + fragments + memory.",
    zhSummary:
      "ContextManager 汇聚 ledger + fragments + memory。",
    enDetails: [
      "Ledger snapshot cloned for this projection.",
      "Fragments resolved in lifetime order.",
      "Memory and skills budgeted into remaining headroom.",
    ],
    zhDetails: [
      "克隆 ledger 快照用于本次 projection。",
      "按生命周期顺序解析 fragments。",
      "Memory 与 skills 在剩余预算内分配。",
    ],
    enSource: "context_manager/resolve.rs",
    tokenDelta: 14_500,
    appends: [
      {
        enLabel: "context.fragment(turn_envelope)",
        zhLabel: "context.fragment(turn_envelope)",
        kind: "context",
      },
    ],
  },
  {
    key: "stream_model",
    enTitle: "stream_model",
    zhTitle: "stream_model",
    enSummary:
      "Streaming response; deltas bridged to event bus.",
    zhSummary:
      "流式响应；deltas 桥接到 event bus。",
    enDetails: [
      "Provider streams text + tool_use deltas.",
      "Each delta forwarded to TUI/MCP subscribers.",
      "Partial assistant message buffered until end-of-stream.",
    ],
    zhDetails: [
      "Provider 流式返回 text 与 tool_use deltas。",
      "每个 delta 转发到 TUI/MCP 订阅者。",
      "部分 assistant 消息缓存到流结束。",
    ],
    enSource: "model/stream.rs",
    tokenDelta: 6_400,
    appends: [
      {
        enLabel: "assistant.message(streaming…)",
        zhLabel: "assistant.message(streaming…)",
        kind: "assistant",
      },
    ],
  },
  {
    key: "detect_tool_calls",
    enTitle: "detect_tool_calls",
    zhTitle: "detect_tool_calls",
    enSummary:
      "Parse tool_use blocks from the streamed response.",
    zhSummary:
      "从流式响应中解析 tool_use 块。",
    enDetails: [
      "Stream finalized into a structured ResponseItem.",
      "tool_use blocks extracted with stable call_ids.",
      "Empty tool_use list short-circuits to completion.",
    ],
    zhDetails: [
      "将流整理为结构化的 ResponseItem。",
      "提取带稳定 call_id 的 tool_use 块。",
      "若 tool_use 为空则直接进入完成阶段。",
    ],
    enSource: "model/parse.rs",
    tokenDelta: 0,
  },
  {
    key: "exec_tools",
    enTitle: "exec_tools",
    zhTitle: "exec_tools",
    enSummary:
      "Tools partitioned by safety; concurrency-safe ones run first.",
    zhSummary:
      "按安全性分桶；可并发的工具优先执行。",
    enDetails: [
      "Read-only tools dispatched in parallel.",
      "Mutating tools serialized through the executor lock.",
      "Each tool returns a tool_output bound to its call_id.",
    ],
    zhDetails: [
      "只读工具并发派发。",
      "写操作工具通过 executor 锁串行执行。",
      "每个工具返回与 call_id 绑定的 tool_output。",
    ],
    enSource: "tools/executor.rs",
    tokenDelta: 22_800,
    appends: [
      {
        enLabel: "tool_call(read_file src/turn.rs)",
        zhLabel: "tool_call(read_file src/turn.rs)",
        kind: "tool_call",
      },
      {
        enLabel: "tool_output(read_file 312 lines)",
        zhLabel: "tool_output(read_file 312 行)",
        kind: "tool_output",
      },
    ],
  },
  {
    key: "record_history",
    enTitle: "record_history",
    zhTitle: "record_history",
    enSummary:
      "Append response items to ContextManager and rollout.",
    zhSummary:
      "把 response items 追加到 ContextManager 与 rollout。",
    enDetails: [
      "Items appended to the in-memory ledger.",
      "Rollout file flushed atomically as JSONL.",
      "Reconstruction can replay this turn from disk alone.",
    ],
    zhDetails: [
      "条目追加到内存中的 ledger。",
      "Rollout 文件以 JSONL 原子刷盘。",
      "Reconstruction 可以仅从磁盘重放这一 turn。",
    ],
    enSource: "context_manager/history.rs",
    tokenDelta: 0,
    appends: [
      {
        enLabel: "tool_call(apply_patch src/turn.rs)",
        zhLabel: "tool_call(apply_patch src/turn.rs)",
        kind: "tool_call",
      },
      {
        enLabel: "tool_output(applied 18 lines)",
        zhLabel: "tool_output(应用 18 行)",
        kind: "tool_output",
      },
    ],
  },
  {
    key: "fire_hooks",
    enTitle: "fire_hooks",
    zhTitle: "fire_hooks",
    enSummary:
      "PreToolUse/PostToolUse/Stop hooks may amend or block.",
    zhSummary:
      "PreToolUse/PostToolUse/Stop hooks 可修改或阻断。",
    enDetails: [
      "Pre hooks run before each tool dispatch.",
      "Post hooks see the recorded outputs.",
      "Stop hooks can request another iteration of the loop.",
    ],
    zhDetails: [
      "Pre hooks 在每次工具派发前运行。",
      "Post hooks 看到已记录的输出。",
      "Stop hooks 可请求再走一轮 loop。",
    ],
    enSource: "hooks/dispatch.rs",
    tokenDelta: 1_200,
  },
  {
    key: "budget_check",
    enTitle: "budget_check",
    zhTitle: "budget_check",
    enSummary:
      "Check token budget; if needed, queue compaction.",
    zhSummary:
      "检查 token 预算；必要时排队 compaction。",
    enDetails: [
      "Tokenizer estimates the projection size.",
      "Above 80% budget, compaction is enqueued for next turn.",
      "A summary fragment is reserved for the checkpoint.",
    ],
    zhDetails: [
      "Tokenizer 估算 projection 体积。",
      "超过 80% 预算时，下一 turn 排队 compaction。",
      "为 checkpoint 预留一段 summary fragment。",
    ],
    enSource: "context_manager/budget.rs",
    tokenDelta: 119_000,
    appends: [
      {
        enLabel: "summary.checkpoint(reserved)",
        zhLabel: "summary.checkpoint(已预留)",
        kind: "summary",
      },
    ],
  },
  {
    key: "continue_or_complete",
    enTitle: "continue_or_complete",
    zhTitle: "continue_or_complete",
    enSummary:
      "Loop on more tool calls; otherwise finalize and emit AgentMessage.",
    zhSummary:
      "若还有 tool_call 则继续循环；否则收尾并发出 AgentMessage。",
    enDetails: [
      "If pending tool_use remain, jump back to stream_model.",
      "Otherwise emit AgentMessage to the event bus.",
      "TurnContext drained; cancellation token is released.",
    ],
    zhDetails: [
      "若仍有未处理的 tool_use，跳回 stream_model。",
      "否则向 event bus 发出 AgentMessage。",
      "TurnContext 收尾；释放 cancellation token。",
    ],
    enSource: "session/turn.rs",
    tokenDelta: 0,
    appends: [
      {
        enLabel: "assistant.message(final)",
        zhLabel: "assistant.message(final)",
        kind: "assistant",
      },
    ],
  },
];

interface Props {
  lang: Lang;
}

export default function TurnLoopTrace({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [stepIndex, setStepIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const handler = (event: MediaQueryListEvent) => {
      reduceMotion.current = event.matches;
      if (event.matches) {
        setPlaying(false);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    if (reduceMotion.current) {
      setPlaying(false);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 900);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing]);

  const stepOne = () => {
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };

  const reset = () => {
    setStepIndex(-1);
    setPlaying(false);
  };

  const ledgerEntries = useMemo(() => {
    const entries: Array<AppendEntry & { stepIndex: number; index: number }> =
      [];
    for (let i = 0; i <= stepIndex; i++) {
      const step = steps[i];
      if (!step?.appends) continue;
      for (const entry of step.appends) {
        entries.push({ ...entry, stepIndex: i, index: entries.length });
      }
    }
    return entries;
  }, [stepIndex]);

  const tokensUsed = useMemo(() => {
    let total = 0;
    for (let i = 0; i <= stepIndex; i++) {
      total += steps[i]?.tokenDelta ?? 0;
    }
    return total;
  }, [stepIndex]);

  const tokenPct = Math.min(1, tokensUsed / TOKEN_BUDGET);
  const overBudget = tokenPct > 0.8;
  const warningStep = steps.findIndex((s) => s.key === "budget_check");
  const showCompactionWarning =
    overBudget && stepIndex >= warningStep;

  const status: "idle" | "running" | "done" =
    stepIndex < 0
      ? "idle"
      : stepIndex >= steps.length - 1
      ? "done"
      : "running";

  const kindColor: Record<AppendEntry["kind"], { bg: string; fg: string }> = {
    context: { bg: colors.infoSoft, fg: colors.info },
    assistant: { bg: colors.accentSoft, fg: colors.accent },
    tool_call: { bg: colors.warningSoft, fg: colors.warning },
    tool_output: { bg: colors.warningSoft, fg: colors.warning },
    summary: {
      bg: mode === "light" ? "#ede9fe" : "#231b3a",
      fg: mode === "light" ? "#6d28d9" : "#c4b5fd",
    },
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Step through one turn"
      zhTitle="逐步走过一次 turn"
      subtitle="Watch a single op move through Codex's nine-stage runtime loop."
      zhSubtitle="观察一个 op 流经 Codex 的九阶段运行时 loop。"
      caption="Each turn is the same recipe: schedule → resolve → stream → exec → record → hook → budget → continue. Only the data changes."
      zhCaption="每个 turn 都是同一套配方：schedule → resolve → stream → exec → record → hook → budget → continue，只有数据不同。"
      badge="Chapter 6"
      zhBadge="第 6 章"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => {
            if (status === "done") {
              reset();
              setPlaying(true);
              return;
            }
            setPlaying(!playing);
          }}
          style={{
            background: colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {status === "done"
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
          onClick={stepOne}
          disabled={stepIndex >= steps.length - 1}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor:
              stepIndex >= steps.length - 1 ? "not-allowed" : "pointer",
            opacity: stepIndex >= steps.length - 1 ? 0.5 : 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "下一步" : "Step"}
        </button>
        <button
          onClick={reset}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "重置" : "Reset"}
        </button>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span>
            {lang === "zh" ? "阶段" : "stage"}{" "}
            {stepIndex < 0 ? "—" : `${stepIndex + 1}/${steps.length}`}
          </span>
          <span>
            {lang === "zh" ? "已追加" : "appended"} {ledgerEntries.length}
          </span>
          <span>
            {lang === "zh" ? "状态" : "status"}{" "}
            {status === "idle"
              ? lang === "zh"
                ? "待机"
                : "idle"
              : status === "running"
              ? lang === "zh"
                ? "运行中"
                : "running"
              : lang === "zh"
              ? "完成"
              : "done"}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {steps.map((step, idx) => {
            const isActive = idx === stepIndex;
            const isDone = idx < stepIndex;
            const isFuture = idx > stepIndex;
            const accent = isActive
              ? colors.accent
              : isDone
              ? colors.success
              : colors.softBorder;
            const bg = isActive
              ? colors.accentSoft
              : isDone
              ? colors.successSoft
              : colors.panel;
            return (
              <div
                key={step.key}
                style={{
                  border: `1px solid ${
                    isActive ? colors.accent : colors.softBorder
                  }`,
                  borderLeft: `4px solid ${accent}`,
                  borderRadius: 10,
                  padding: "8px 10px",
                  background: isFuture ? colors.panel : bg,
                  opacity: isFuture ? 0.55 : 1,
                  transition:
                    "background 200ms ease, border-color 200ms ease, opacity 200ms ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  animation:
                    isActive && !reduceMotion.current
                      ? "tlt-pulse 1.6s ease-in-out infinite"
                      : undefined,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: isActive
                        ? colors.accent
                        : isDone
                        ? colors.success
                        : colors.track,
                      color:
                        isActive || isDone
                          ? "#fff"
                          : colors.textMuted,
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {isDone ? "✓" : idx + 1}
                  </span>
                  <span
                    style={{
                      color: isFuture ? colors.textMuted : colors.text,
                    }}
                  >
                    {localized(lang, step.enTitle, step.zhTitle)}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      fontWeight: 600,
                      color: colors.textMuted,
                    }}
                  >
                    {step.enSource}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: isFuture ? colors.textMuted : colors.text,
                    lineHeight: 1.5,
                  }}
                >
                  {localized(lang, step.enSummary, step.zhSummary)}
                </div>
                {isActive ? (
                  <ul
                    style={{
                      margin: "4px 0 0",
                      paddingLeft: 18,
                      fontSize: 11.5,
                      color: colors.text,
                      lineHeight: 1.55,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {(lang === "zh" ? step.zhDetails : step.enDetails).map(
                      (detail) => (
                        <li key={detail}>{detail}</li>
                      ),
                    )}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              padding: 12,
              background: colors.background,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <span>{lang === "zh" ? "Token 预算" : "Token budget"}</span>
              <span style={{ color: colors.text }}>
                {tokensUsed.toLocaleString()} /{" "}
                {TOKEN_BUDGET.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: 12,
                borderRadius: 999,
                background: colors.track,
                overflow: "hidden",
                border: `1px solid ${colors.softBorder}`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${tokenPct * 100}%`,
                  background: overBudget ? colors.warning : colors.accent,
                  transition: "width 350ms ease, background 200ms ease",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -2,
                  bottom: -2,
                  left: "80%",
                  width: 1,
                  background: colors.warning,
                  opacity: 0.7,
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {lang === "zh" ? "占用" : "used"} {(tokenPct * 100).toFixed(1)}%
              </span>
              <span>
                {lang === "zh" ? "压缩阈值 80%" : "compaction at 80%"}
              </span>
            </div>
            {showCompactionWarning ? (
              <div
                role="alert"
                style={{
                  marginTop: 2,
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: `1px solid ${colors.warning}`,
                  background: colors.warningSoft,
                  color: colors.warning,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ marginRight: 6 }}>
                  {lang === "zh"
                    ? "Compaction 已排队："
                    : "Compaction queued:"}
                </strong>
                {lang === "zh"
                  ? "下一 turn 将安装 checkpoint summary。"
                  : "next turn installs a checkpoint summary."}
              </div>
            ) : null}
          </div>

          <div
            style={{
              border: `1px solid ${colors.softBorder}`,
              borderRadius: 10,
              padding: 12,
              background: colors.background,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 220,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <span>{lang === "zh" ? "Ledger 预览" : "Ledger preview"}</span>
              <span style={{ color: colors.text }}>
                {ledgerEntries.length}{" "}
                {lang === "zh" ? "条" : "items"}
              </span>
            </div>

            {ledgerEntries.length === 0 ? (
              <div
                style={{
                  padding: 16,
                  textAlign: "center",
                  color: colors.textMuted,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11.5,
                  border: `1px dashed ${colors.softBorder}`,
                  borderRadius: 8,
                }}
              >
                {lang === "zh"
                  ? "Ledger 为空。开始播放即可看到追加。"
                  : "Ledger is empty. Press play to see appends."}
              </div>
            ) : (
              <div
                role="list"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  maxHeight: 260,
                  overflow: "auto",
                }}
              >
                {ledgerEntries.map((entry) => {
                  const isFresh = entry.stepIndex === stepIndex;
                  const swatch = kindColor[entry.kind];
                  return (
                    <div
                      key={entry.index}
                      role="listitem"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        alignItems: "center",
                        gap: 8,
                        padding: "5px 8px",
                        borderRadius: 7,
                        background: swatch.bg,
                        color: colors.text,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11.5,
                        border: `1px solid ${swatch.fg}40`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                          color: colors.textMuted,
                          minWidth: 26,
                        }}
                      >
                        {String(entry.index).padStart(2, "0")}
                      </span>
                      <span>
                        <span
                          style={{ color: swatch.fg, fontWeight: 700 }}
                        >
                          [{entry.kind}]
                        </span>{" "}
                        {localized(lang, entry.enLabel, entry.zhLabel)}
                      </span>
                      {isFresh ? (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: 999,
                            background: colors.accent,
                            color: "#fff",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {lang === "zh" ? "新增" : "appended"}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: 10,
                            color: colors.textMuted,
                            fontWeight: 600,
                          }}
                        >
                          #{entry.stepIndex + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tlt-pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${colors.accentSoft}; }
          50% { box-shadow: 0 0 0 6px transparent; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-tlt] * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </InteractiveFigure>
  );
}
