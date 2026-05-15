import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type FragmentKey =
  | "base"
  | "memory"
  | "skills"
  | "plugins"
  | "context"
  | "settings"
  | "user"
  | "tools"
  | "images";

type Fragment = {
  key: FragmentKey;
  enLabel: string;
  zhLabel: string;
  enWhy: string;
  zhWhy: string;
  ownedBy: string;
  category: "base" | "static" | "diff" | "user" | "optional";
};

const fragments: Fragment[] = [
  {
    key: "base",
    enLabel: "Base instructions",
    zhLabel: "Base instructions",
    enWhy: "Stable system rules; cache-friendly prefix.",
    zhWhy: "稳定的系统规则；prompt cache 的前缀。",
    ownedBy: "TurnContext.base_instructions",
    category: "base",
  },
  {
    key: "memory",
    enLabel: "Memory snippets",
    zhLabel: "Memory 摘要",
    enWhy: "Project / user / team facts the model should remember.",
    zhWhy: "项目 / 用户 / 团队层面需要记住的事实。",
    ownedBy: "memory module",
    category: "static",
  },
  {
    key: "skills",
    enLabel: "Skills",
    zhLabel: "Skills",
    enWhy: "Discovered capabilities, lazily attached when relevant.",
    zhWhy: "通过发现得到的能力，仅在相关时附加。",
    ownedBy: "skills/loader.rs",
    category: "static",
  },
  {
    key: "plugins",
    enLabel: "Plugin guidance",
    zhLabel: "Plugin guidance",
    enWhy: "Hook-provided instructions that compose with skills.",
    zhWhy: "由 hook 注入的指导，与 skills 配合。",
    ownedBy: "plugins/registry.rs",
    category: "static",
  },
  {
    key: "context",
    enLabel: "Context fragments",
    zhLabel: "Context 片段",
    enWhy: "Typed runtime facts (cwd, model, sandbox) rendered to text.",
    zhWhy: "类型化运行时事实（cwd、model、sandbox）渲染成文本。",
    ownedBy: "context/fragment.rs",
    category: "diff",
  },
  {
    key: "settings",
    enLabel: "Settings diffs",
    zhLabel: "Settings diff",
    enWhy: "Only what changed since the previous turn.",
    zhWhy: "只发送相对上一 turn 变化的部分。",
    ownedBy: "session/turn_context.rs",
    category: "diff",
  },
  {
    key: "user",
    enLabel: "User input",
    zhLabel: "用户输入",
    enWhy: "The new prompt, with attachments and structured input.",
    zhWhy: "新的 prompt，带附件和结构化输入。",
    ownedBy: "session/turn.rs",
    category: "user",
  },
  {
    key: "tools",
    enLabel: "Tool outputs",
    zhLabel: "Tool 输出",
    enWhy: "Truncated previous tool results with rollout backreferences.",
    zhWhy: "截断后的工具输出，rollout 中保留完整版本。",
    ownedBy: "tools/orchestrator.rs",
    category: "optional",
  },
  {
    key: "images",
    enLabel: "Images",
    zhLabel: "图片",
    enWhy: "Per-turn vision attachments; budget-bounded.",
    zhWhy: "本 turn 的视觉附件；受预算约束。",
    ownedBy: "context/images.rs",
    category: "optional",
  },
];

const canonicalOrder: FragmentKey[] = [
  "base",
  "memory",
  "skills",
  "plugins",
  "context",
  "settings",
  "user",
  "tools",
  "images",
];

interface Props {
  lang: Lang;
}

export default function ResolutionOrderTimeline({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [order, setOrder] = useState<FragmentKey[]>(canonicalOrder);
  const [highlighted, setHighlighted] = useState<FragmentKey | null>(null);

  const isCanonical = useMemo(
    () => order.join() === canonicalOrder.join(),
    [order],
  );

  const categoryColor: Record<Fragment["category"], string> = {
    base: colors.accent,
    static: colors.info,
    diff: colors.warning,
    user: colors.success,
    optional: colors.textMuted,
  };

  const move = (key: FragmentKey, direction: -1 | 1) => {
    setOrder((current) => {
      const idx = current.indexOf(key);
      const target = idx + direction;
      if (target < 0 || target >= current.length) return current;
      const next = current.slice();
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="Resolution order is not arbitrary"
      zhTitle="解析顺序不是随意的"
      subtitle="Reorder fragments and watch which guarantees break. Click a row to see what it owns."
      zhSubtitle="尝试重排片段，看看哪些不变量会被打破。点击一行可以看到它的归属。"
      caption="The canonical order keeps base instructions cache-stable, lets diffs override static text, and ensures user input is the latest model-visible message."
      zhCaption="规范顺序让 base instructions 保持 cache 稳定，让 diff 覆盖静态文本，并保证用户输入是模型看到的最近一条消息。"
      badge="Chapter 2"
      zhBadge="第 2 章"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            padding: "8px 10px",
            background: isCanonical ? colors.successSoft : colors.warningSoft,
            border: `1px solid ${
              isCanonical ? colors.success : colors.warning
            }`,
            borderRadius: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: isCanonical ? colors.success : colors.warning,
            }}
          >
            {isCanonical
              ? lang === "zh"
                ? "规范顺序：所有不变量满足"
                : "Canonical order: all invariants hold"
              : lang === "zh"
              ? "已偏离规范顺序"
              : "Drifted from canonical order"}
          </span>
          <button
            onClick={() => setOrder(canonicalOrder)}
            style={{
              border: `1px solid ${colors.border}`,
              background: colors.panel,
              color: colors.text,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
            }}
          >
            {lang === "zh" ? "重置" : "Reset"}
          </button>
        </div>

        <ol
          style={{
            margin: 0,
            paddingLeft: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {order.map((key, index) => {
            const fragment = fragments.find((item) => item.key === key)!;
            const isHighlighted = highlighted === key;
            const swatch = categoryColor[fragment.category];
            return (
              <li
                key={key}
                onMouseEnter={() => setHighlighted(key)}
                onMouseLeave={() => setHighlighted(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto",
                  alignItems: "stretch",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 9,
                  border: `1px solid ${
                    isHighlighted ? swatch : colors.softBorder
                  }`,
                  background: isHighlighted
                    ? `${swatch}1a`
                    : mode === "light"
                    ? "#fffaef"
                    : "#23221f",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: swatch,
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                  }}
                >
                  {index + 1}
                </span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13.5,
                      color: colors.text,
                    }}
                  >
                    {localized(lang, fragment.enLabel, fragment.zhLabel)}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: colors.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {localized(lang, fragment.enWhy, fragment.zhWhy)}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      color: swatch,
                    }}
                  >
                    {fragment.ownedBy}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <button
                    onClick={() => move(key, -1)}
                    disabled={index === 0}
                    aria-label={lang === "zh" ? "向上移动" : "Move up"}
                    style={{
                      border: `1px solid ${colors.border}`,
                      background: colors.panel,
                      color: colors.text,
                      borderRadius: 6,
                      padding: "2px 8px",
                      cursor: index === 0 ? "not-allowed" : "pointer",
                      opacity: index === 0 ? 0.4 : 1,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(key, 1)}
                    disabled={index === order.length - 1}
                    aria-label={lang === "zh" ? "向下移动" : "Move down"}
                    style={{
                      border: `1px solid ${colors.border}`,
                      background: colors.panel,
                      color: colors.text,
                      borderRadius: 6,
                      padding: "2px 8px",
                      cursor:
                        index === order.length - 1 ? "not-allowed" : "pointer",
                      opacity: index === order.length - 1 ? 0.4 : 1,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                    }}
                  >
                    ▼
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        <Invariants order={order} lang={lang} colors={colors} />
      </div>
    </InteractiveFigure>
  );
}

function Invariants({
  order,
  lang,
  colors,
}: {
  order: FragmentKey[];
  lang: Lang;
  colors: ReturnType<typeof palette.light extends infer T ? () => T : never> &
    typeof palette.light;
}) {
  const indexOf = (key: FragmentKey) => order.indexOf(key);
  const checks: Array<{ enLabel: string; zhLabel: string; ok: boolean }> = [
    {
      enLabel: "Base instructions are first (cache prefix stable)",
      zhLabel: "Base instructions 在最前（保持 cache 前缀稳定）",
      ok: indexOf("base") === 0,
    },
    {
      enLabel: "Static guidance comes before runtime diffs",
      zhLabel: "静态 guidance 早于运行时 diff",
      ok:
        Math.max(indexOf("memory"), indexOf("skills"), indexOf("plugins")) <
        Math.min(indexOf("context"), indexOf("settings")),
    },
    {
      enLabel: "User input lands after diffs and before tool outputs",
      zhLabel: "用户输入位于 diff 之后、tool 输出之前",
      ok:
        indexOf("user") > Math.max(indexOf("settings"), indexOf("context")) &&
        indexOf("user") < Math.min(indexOf("tools"), indexOf("images")),
    },
    {
      enLabel: "User input is the most recent model-visible message",
      zhLabel: "用户输入应是最新的模型可见消息",
      ok:
        indexOf("user") >
          Math.max(
            indexOf("base"),
            indexOf("memory"),
            indexOf("skills"),
            indexOf("plugins"),
            indexOf("context"),
            indexOf("settings"),
          ) || indexOf("user") < indexOf("tools"),
    },
  ];

  return (
    <ul
      style={{
        margin: 0,
        padding: 8,
        listStyle: "none",
        background:
          colors.softBorder === "#e8e3d2" ? "#fdfaf2" : "#1c1b19",
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 9,
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 4,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      {checks.map((check) => (
        <li
          key={check.enLabel}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: check.ok ? colors.success : colors.warning,
          }}
        >
          <span style={{ fontWeight: 700 }}>{check.ok ? "✓" : "✗"}</span>
          <span>{lang === "zh" ? check.zhLabel : check.enLabel}</span>
        </li>
      ))}
    </ul>
  );
}
