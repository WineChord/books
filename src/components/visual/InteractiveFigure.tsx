import React from "react";
import { useThemeMode, palette } from "./useThemeMode";

export type Lang = "en" | "zh";

export interface InteractiveFigureProps {
  lang: Lang;
  title: string;
  subtitle?: string;
  caption?: string;
  zhTitle?: string;
  zhSubtitle?: string;
  zhCaption?: string;
  badge?: string;
  zhBadge?: string;
  children: React.ReactNode;
}

export function localized<T>(lang: Lang, en: T, zh: T | undefined): T {
  if (lang === "zh" && zh !== undefined) {
    return zh;
  }
  return en;
}

// A standardized wrapper used by every interactive visual in the books.
// Provides title, optional subtitle, caption, theming and a consistent border.
export default function InteractiveFigure({
  lang,
  title,
  subtitle,
  caption,
  zhTitle,
  zhSubtitle,
  zhCaption,
  badge,
  zhBadge,
  children,
}: InteractiveFigureProps) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const displayTitle = localized(lang, title, zhTitle);
  const displaySubtitle = localized(lang, subtitle, zhSubtitle);
  const displayCaption = localized(lang, caption, zhCaption);
  const displayBadge = localized(lang, badge, zhBadge);

  return (
    <figure
      className="interactive-figure"
      style={{
        margin: "2rem 0",
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        overflow: "hidden",
        background: colors.panel,
        color: colors.text,
        boxShadow:
          mode === "light"
            ? "0 1px 2px rgba(36, 27, 8, 0.04), 0 8px 32px rgba(36, 27, 8, 0.06)"
            : "0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.4)",
        fontFamily: "var(--font-sans, inherit)",
      }}
    >
      <header
        style={{
          padding: "0.85rem 1.1rem 0.65rem",
          borderBottom: `1px solid ${colors.softBorder}`,
          background:
            mode === "light"
              ? "linear-gradient(180deg, #fffaef 0%, #fdfaf2 100%)"
              : "linear-gradient(180deg, #232220 0%, #1f1f1d 100%)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: colors.accent,
              fontFamily: "var(--font-mono)",
            }}
          >
            {lang === "zh" ? "可交互图示" : "Interactive figure"}
          </div>
          {displayBadge ? (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: colors.accentHover,
                background: colors.accentSoft,
                border: `1px solid ${colors.accent}`,
                borderRadius: 999,
                padding: "2px 10px",
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap",
              }}
            >
              {displayBadge}
            </span>
          ) : null}
        </div>
        <h4
          style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 650,
            color: colors.text,
            fontFamily: "var(--font-serif, inherit)",
            lineHeight: 1.3,
          }}
        >
          {displayTitle}
        </h4>
        {displaySubtitle ? (
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: colors.textMuted,
              lineHeight: 1.55,
            }}
          >
            {displaySubtitle}
          </p>
        ) : null}
      </header>

      <div style={{ padding: "1.1rem", color: colors.text }}>{children}</div>

      {displayCaption ? (
        <figcaption
          style={{
            padding: "0.65rem 1.1rem 0.95rem",
            borderTop: `1px solid ${colors.softBorder}`,
            fontSize: "0.82rem",
            color: colors.textMuted,
            lineHeight: 1.55,
            fontStyle: "italic",
          }}
        >
          {displayCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}
