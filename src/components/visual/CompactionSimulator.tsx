import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type Item = {
  index: number;
  enLabel: string;
  zhLabel: string;
  kind: "context" | "user" | "assistant" | "tool" | "summary";
  tokens: number;
  pairId?: string;
};

const longHistory: Item[] = [
  {
    index: 0,
    enLabel: "context.cwd = /repo",
    zhLabel: "context.cwd = /repo",
    kind: "context",
    tokens: 80,
  },
  {
    index: 1,
    enLabel: "user: explore the auth module",
    zhLabel: "user：调研 auth 模块",
    kind: "user",
    tokens: 240,
  },
  {
    index: 2,
    enLabel: "assistant: scanned 14 files",
    zhLabel: "assistant：扫描了 14 个文件",
    kind: "assistant",
    tokens: 380,
  },
  {
    index: 3,
    enLabel: "tool_call(read_file auth.rs)",
    zhLabel: "tool_call(read_file auth.rs)",
    kind: "tool",
    tokens: 120,
    pairId: "p1",
  },
  {
    index: 4,
    enLabel: "tool_output(auth.rs lines 1..520)",
    zhLabel: "tool_output(auth.rs 1..520 行)",
    kind: "tool",
    tokens: 1800,
    pairId: "p1",
  },
  {
    index: 5,
    enLabel: "user: list known issues",
    zhLabel: "user：列出已知问题",
    kind: "user",
    tokens: 90,
  },
  {
    index: 6,
    enLabel: "assistant: summary of 6 issues",
    zhLabel: "assistant：6 个问题的摘要",
    kind: "assistant",
    tokens: 720,
  },
  {
    index: 7,
    enLabel: "tool_call(search 'TODO')",
    zhLabel: "tool_call(search 'TODO')",
    kind: "tool",
    tokens: 110,
    pairId: "p2",
  },
  {
    index: 8,
    enLabel: "tool_output(31 hits)",
    zhLabel: "tool_output(31 处命中)",
    kind: "tool",
    tokens: 1450,
    pairId: "p2",
  },
];

const summary: Item = {
  index: -1,
  enLabel:
    "checkpoint: explored auth.rs (520 lines), 6 known issues, 31 TODOs",
  zhLabel:
    "checkpoint：调研 auth.rs（520 行），6 个已知问题，31 个 TODO",
  kind: "summary",
  tokens: 220,
};

const recent: Item[] = [
  {
    index: 9,
    enLabel: "user: rewrite token validation",
    zhLabel: "user：重写 token 校验",
    kind: "user",
    tokens: 110,
  },
  {
    index: 10,
    enLabel: "assistant: drafting changes…",
    zhLabel: "assistant：正在草拟修改…",
    kind: "assistant",
    tokens: 320,
  },
];

interface Props {
  lang: Lang;
}

export default function CompactionSimulator({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [compacted, setCompacted] = useState(false);

  const totalsBefore = useMemo(
    () =>
      [...longHistory, ...recent].reduce((sum, item) => sum + item.tokens, 0),
    [],
  );
  const totalsAfter = useMemo(
    () => [summary, ...recent].reduce((sum, item) => sum + item.tokens, 0),
    [],
  );

  const kindColor: Record<Item["kind"], string> = {
    context: colors.info,
    user: colors.success,
    assistant: colors.accent,
    tool: colors.warning,
    summary: mode === "light" ? "#6d28d9" : "#c4b5fd",
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Compaction installs a checkpoint, not a deletion"
      zhTitle="Compaction 安装 checkpoint，而不是删除"
      subtitle="Click to install a checkpoint. The model sees a summary; the rollout still has the full history."
      zhSubtitle="点击安装 checkpoint。模型看到的是摘要，rollout 中仍保留完整历史。"
      caption="Pairing is preserved across the boundary. Compacted items remain in the durable rollout for resume and audit."
      zhCaption="跨越边界仍保留 tool_call 与 output 的配对；被压缩的条目仍存在于持久 rollout 中，可用于 resume 与审计。"
      badge="Chapter 6"
      zhBadge="第 6 章"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => setCompacted(!compacted)}
          style={{
            background: compacted ? colors.success : colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {compacted
            ? lang === "zh"
              ? "↺ 还原历史"
              : "↺ Reveal history"
            : lang === "zh"
            ? "▶ 安装 checkpoint"
            : "▶ Install checkpoint"}
        </button>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: colors.textMuted,
            marginLeft: "auto",
            flexWrap: "wrap",
          }}
        >
          <span>
            {lang === "zh" ? "原始 tokens" : "raw tokens"}{" "}
            <strong style={{ color: colors.text }}>
              {totalsBefore.toLocaleString()}
            </strong>
          </span>
          <span>
            {lang === "zh" ? "压缩后 tokens" : "after compaction"}{" "}
            <strong style={{ color: colors.success }}>
              {totalsAfter.toLocaleString()}
            </strong>
          </span>
          <span>
            {lang === "zh" ? "节省" : "savings"}{" "}
            <strong style={{ color: colors.accent }}>
              {(((totalsBefore - totalsAfter) / totalsBefore) * 100).toFixed(0)}%
            </strong>
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 12,
        }}
      >
        <Pane
          title={lang === "zh" ? "Rollout（durable）" : "Rollout (durable)"}
          colors={colors}
          mode={mode}
          accent={kindColor.summary}
        >
          {[...longHistory, ...recent].map((item) => (
            <ItemRow
              key={item.index}
              item={item}
              lang={lang}
              colors={colors}
              kindColor={kindColor[item.kind]}
              dimmed={false}
            />
          ))}
        </Pane>
        <Pane
          title={
            lang === "zh"
              ? "Model-visible（compacted）"
              : "Model-visible (compacted)"
          }
          colors={colors}
          mode={mode}
          accent={kindColor.summary}
        >
          {compacted ? (
            <>
              <ItemRow
                item={summary}
                lang={lang}
                colors={colors}
                kindColor={kindColor.summary}
                dimmed={false}
                strong
              />
              {recent.map((item) => (
                <ItemRow
                  key={`recent-${item.index}`}
                  item={item}
                  lang={lang}
                  colors={colors}
                  kindColor={kindColor[item.kind]}
                  dimmed={false}
                />
              ))}
            </>
          ) : (
            [...longHistory, ...recent].map((item) => (
              <ItemRow
                key={`pre-${item.index}`}
                item={item}
                lang={lang}
                colors={colors}
                kindColor={kindColor[item.kind]}
                dimmed={false}
              />
            ))
          )}
        </Pane>
      </div>
    </InteractiveFigure>
  );
}

function Pane({
  title,
  children,
  colors,
  mode,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  colors: ReturnType<typeof palette.light extends infer T ? () => T : never> &
    typeof palette.light;
  mode: "light" | "dark";
  accent: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          background:
            mode === "light"
              ? "linear-gradient(180deg, #f5f1e2 0%, #fdfaf2 100%)"
              : "linear-gradient(180deg, #2c2b29 0%, #1f1f1d 100%)",
          borderBottom: `1px solid ${colors.softBorder}`,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color: accent,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxHeight: 300,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ItemRow({
  item,
  lang,
  colors,
  kindColor,
  dimmed,
  strong,
}: {
  item: Item;
  lang: Lang;
  colors: ReturnType<typeof palette.light extends infer T ? () => T : never> &
    typeof palette.light;
  kindColor: string;
  dimmed: boolean;
  strong?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 8,
        alignItems: "center",
        padding: "5px 8px",
        borderRadius: 6,
        background: `${kindColor}1a`,
        border: `1px solid ${kindColor}40`,
        opacity: dimmed ? 0.45 : 1,
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        fontWeight: strong ? 600 : 400,
      }}
    >
      <span
        style={{
          fontSize: 10,
          color: kindColor,
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        {item.kind}
      </span>
      <span style={{ color: colors.text }}>
        {localized(lang, item.enLabel, item.zhLabel)}
      </span>
      <span style={{ fontSize: 10, color: colors.textMuted }}>
        {item.tokens.toLocaleString()}
      </span>
    </div>
  );
}
