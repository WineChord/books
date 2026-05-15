import React from "react";
import { useThemeMode, palette, type Palette } from "../useThemeMode";
import { type Lang, type Bilingual, pickLabel } from "./types";

// Optional inline highlight ranges for ASCII content, keyed by the literal
// substring to colorize. Useful for emphasising specific column headers or
// labels inside an otherwise plain ASCII drawing.
export interface AsciiHighlight {
  match: string;
  tone: "accent" | "success" | "warning" | "info" | "muted";
}

export interface DiagramAsciiProps {
  lang: Lang;
  // Bilingual or shared ASCII text. Whitespace and column alignment are
  // preserved exactly as authored.
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
}

function highlightLine(
  line: string,
  highlights: AsciiHighlight[] | undefined,
  p: Palette,
): React.ReactNode {
  if (!highlights || highlights.length === 0) return line;
  const tones: Record<AsciiHighlight["tone"], string> = {
    accent: p.accent,
    success: p.success,
    warning: p.warning,
    info: p.info,
    muted: p.textMuted,
  };
  // Build a list of segments by walking the line and matching highlights.
  const segments: { text: string; color?: string }[] = [];
  let cursor = 0;
  while (cursor < line.length) {
    let matchStart = -1;
    let matchEnd = -1;
    let matchTone: string | undefined;
    for (const h of highlights) {
      const idx = line.indexOf(h.match, cursor);
      if (idx !== -1 && (matchStart === -1 || idx < matchStart)) {
        matchStart = idx;
        matchEnd = idx + h.match.length;
        matchTone = tones[h.tone];
      }
    }
    if (matchStart === -1) {
      segments.push({ text: line.slice(cursor) });
      break;
    }
    if (matchStart > cursor) {
      segments.push({ text: line.slice(cursor, matchStart) });
    }
    segments.push({ text: line.slice(matchStart, matchEnd), color: matchTone });
    cursor = matchEnd;
  }
  return segments.map((seg, i) => (
    <span
      key={i}
      style={{
        color: seg.color,
        fontWeight: seg.color ? 700 : undefined,
      }}
    >
      {seg.text}
    </span>
  ));
}

export default function DiagramAscii({
  lang,
  ascii,
  legend,
  highlights,
}: DiagramAsciiProps) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const text = pickLabel(ascii, lang);
  const lines = text.split("\n");
  return (
    <div
      style={{
        background: mode === "light" ? "#fbf6e7" : "#1c1b18",
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 12,
        padding: "0.9rem 1.1rem",
        overflowX: "auto",
        boxShadow:
          mode === "light"
            ? "inset 0 1px 0 rgba(255,255,255,0.7)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.55,
          color: colors.text,
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, idx) => (
          <span key={idx}>
            {highlightLine(line, highlights, colors)}
            {"\n"}
          </span>
        ))}
      </pre>
      {pickLabel(legend, lang) ? (
        <p
          style={{
            margin: "0.6rem 0 0",
            fontSize: "0.78rem",
            color: colors.textMuted,
            lineHeight: 1.55,
          }}
        >
          {pickLabel(legend, lang)}
        </p>
      ) : null}
    </div>
  );
}
