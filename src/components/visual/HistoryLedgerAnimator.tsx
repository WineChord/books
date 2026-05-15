import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ItemKind =
  | "context"
  | "user"
  | "assistant"
  | "tool_call"
  | "tool_output"
  | "checkpoint";

interface LedgerItem {
  index: number;
  kind: ItemKind;
  enText: string;
  zhText: string;
  pairId?: string;
  paired?: boolean;
}

const eventTimeline: Array<Omit<LedgerItem, "index">> = [
  {
    kind: "context",
    enText: "context.cwd = /repo (initial fragment)",
    zhText: "context.cwd = /repo（初始 fragment）",
  },
  {
    kind: "user",
    enText: "user: 'add error handling to login'",
    zhText: "user：'给 login 加上错误处理'",
  },
  {
    kind: "assistant",
    enText: "assistant: planning the change…",
    zhText: "assistant：正在规划改动…",
  },
  {
    kind: "tool_call",
    enText: "tool_call(read_file login.rs)",
    zhText: "tool_call(read_file login.rs)",
    pairId: "p1",
  },
  {
    kind: "tool_output",
    enText: "tool_output(login.rs lines 1..120)",
    zhText: "tool_output(login.rs 的 1..120 行)",
    pairId: "p1",
    paired: true,
  },
  {
    kind: "tool_call",
    enText: "tool_call(apply_patch login.rs)",
    zhText: "tool_call(apply_patch login.rs)",
    pairId: "p2",
  },
  {
    kind: "tool_output",
    enText: "tool_output(applied 14 lines, 3 hunks)",
    zhText: "tool_output(应用了 14 行，3 个 hunk)",
    pairId: "p2",
    paired: true,
  },
  {
    kind: "assistant",
    enText: "assistant: 'I added retry-with-backoff'",
    zhText: "assistant：'我加上了 retry-with-backoff'",
  },
  {
    kind: "checkpoint",
    enText: "compaction summary installed (turns 1..N)",
    zhText: "已安装 compaction 摘要（turns 1..N）",
  },
];

interface Props {
  lang: Lang;
}

export default function HistoryLedgerAnimator({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [items, setItems] = useState<LedgerItem[]>([]);
  const [playing, setPlaying] = useState(false);
  const [violations, setViolations] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setItems((current) => {
        if (current.length >= eventTimeline.length) {
          setPlaying(false);
          return current;
        }
        const nextEvent = eventTimeline[current.length];
        return [...current, { ...nextEvent, index: current.length }];
      });
    }, 700);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing]);

  const reset = () => {
    setItems([]);
    setPlaying(false);
    setViolations([]);
  };

  const removeItem = (index: number) => {
    setItems((current) => {
      const removed = current[index];
      const next = current.filter((_, i) => i !== index);
      const newViolations: string[] = [];
      if (removed?.kind === "tool_call" && removed.pairId) {
        const stillPaired = next.find(
          (item) => item.pairId === removed.pairId && item.kind === "tool_output",
        );
        if (stillPaired) {
          newViolations.push(
            lang === "zh"
              ? `孤立 tool_output(${removed.pairId})：调用记录被移除`
              : `Orphan tool_output(${removed.pairId}): the call record was removed`,
          );
        }
      } else if (removed?.kind === "tool_output" && removed.pairId) {
        const stillPaired = next.find(
          (item) => item.pairId === removed.pairId && item.kind === "tool_call",
        );
        if (stillPaired) {
          newViolations.push(
            lang === "zh"
              ? `孤立 tool_call(${removed.pairId})：output 记录被移除`
              : `Orphan tool_call(${removed.pairId}): the output record was removed`,
          );
        }
      }
      setViolations(newViolations);
      return next.map((item, idx) => ({ ...item, index: idx }));
    });
  };

  const stats = useMemo(() => {
    const calls = items.filter((item) => item.kind === "tool_call").length;
    const outputs = items.filter((item) => item.kind === "tool_output").length;
    const checkpoint = items.find((item) => item.kind === "checkpoint");
    return { calls, outputs, checkpointed: !!checkpoint };
  }, [items]);

  const kindColor: Record<ItemKind, { bg: string; fg: string }> = {
    context: { bg: colors.infoSoft, fg: colors.info },
    user: { bg: colors.successSoft, fg: colors.success },
    assistant: { bg: colors.accentSoft, fg: colors.accent },
    tool_call: { bg: colors.warningSoft, fg: colors.warning },
    tool_output: { bg: colors.warningSoft, fg: colors.warning },
    checkpoint: {
      bg: mode === "light" ? "#ede9fe" : "#231b3a",
      fg: mode === "light" ? "#6d28d9" : "#c4b5fd",
    },
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="The history ledger fills append-only"
      zhTitle="History ledger 仅追加式增长"
      subtitle="Press play to stream a turn through the ledger. Try removing one half of a pair."
      zhSubtitle="点击播放，让一个 turn 流经 ledger；试着只删除配对中的一半。"
      caption="Tool call/output pairs must stay together. Compaction installs a checkpoint without breaking pairing."
      zhCaption="tool_call 与 tool_output 必须成对存在；compaction 在不破坏配对的前提下安装 checkpoint。"
      badge="Chapter 3"
      zhBadge="第 3 章"
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
            if (items.length >= eventTimeline.length) {
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
          {items.length >= eventTimeline.length
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
          onClick={() => {
            const nextEvent = eventTimeline[items.length];
            if (!nextEvent) return;
            setItems((current) => [
              ...current,
              { ...nextEvent, index: current.length },
            ]);
          }}
          disabled={items.length >= eventTimeline.length}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor:
              items.length >= eventTimeline.length ? "not-allowed" : "pointer",
            opacity: items.length >= eventTimeline.length ? 0.5 : 1,
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
          {lang === "zh" ? "清空" : "Clear"}
        </button>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
            display: "flex",
            gap: 12,
          }}
        >
          <span>
            {lang === "zh" ? "调用" : "calls"} {stats.calls}
          </span>
          <span>
            {lang === "zh" ? "输出" : "outputs"} {stats.outputs}
          </span>
          <span>
            {lang === "zh" ? "已检查" : "checkpointed"}{" "}
            {stats.checkpointed ? "✓" : "—"}
          </span>
        </div>
      </div>

      <div
        role="list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: colors.background,
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 10,
          padding: 8,
          maxHeight: 320,
          overflow: "auto",
        }}
      >
        {items.length === 0 ? (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              color: colors.textMuted,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            {lang === "zh"
              ? "Ledger 为空。点击播放或下一步开始追加。"
              : "Ledger is empty. Press play or step to append."}
          </div>
        ) : null}
        {items.map((item) => (
          <div
            key={item.index}
            role="listitem"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: 10,
              padding: "5px 8px",
              borderRadius: 7,
              background: kindColor[item.kind].bg,
              color: kindColor[item.kind].fg,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              border: `1px solid ${kindColor[item.kind].fg}40`,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: colors.textMuted,
                minWidth: 30,
              }}
            >
              {String(item.index).padStart(2, "0")}
            </span>
            <span style={{ color: colors.text }}>
              <span style={{ color: kindColor[item.kind].fg, fontWeight: 700 }}>
                [{item.kind}]
              </span>{" "}
              {localized(lang, item.enText, item.zhText)}
            </span>
            <button
              onClick={() => removeItem(item.index)}
              aria-label={lang === "zh" ? "移除该项" : "remove this item"}
              style={{
                background: "transparent",
                color: colors.textMuted,
                border: `1px solid ${colors.softBorder}`,
                borderRadius: 6,
                padding: "1px 6px",
                cursor: "pointer",
                fontSize: 11,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {violations.length > 0 ? (
        <div
          role="alert"
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 9,
            border: `1px solid ${colors.warning}`,
            background: colors.warningSoft,
            color: colors.warning,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <strong style={{ marginRight: 6 }}>
            {lang === "zh" ? "协议违规：" : "Protocol violation:"}
          </strong>
          {violations.join(" · ")}
        </div>
      ) : null}
    </InteractiveFigure>
  );
}
