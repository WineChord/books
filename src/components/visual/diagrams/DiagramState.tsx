import React, { useMemo, useState } from "react";
import { useThemeMode, palette, type Palette } from "../useThemeMode";
import {
  type Lang,
  type StateSpec,
  type StateNode,
  type Tone,
  pickLabel,
} from "./types";

function tone(t: Tone | undefined, p: Palette) {
  switch (t) {
    case "accent":
      return { fill: p.accentSoft, stroke: p.accent, text: p.accent };
    case "success":
      return { fill: p.successSoft, stroke: p.success, text: p.success };
    case "warning":
      return { fill: p.warningSoft, stroke: p.warning, text: p.warning };
    case "info":
      return { fill: p.infoSoft, stroke: p.info, text: p.info };
    case "muted":
      return { fill: p.track, stroke: p.softBorder, text: p.textMuted };
    default:
      return { fill: p.panel, stroke: p.border, text: p.text };
  }
}

interface PlacedNode extends StateNode {
  cx: number;
  cy: number;
  width: number;
  height: number;
  shape: "circle" | "rect";
}

export interface DiagramStateProps {
  spec: StateSpec;
  lang: Lang;
}

export default function DiagramState({ spec, lang }: DiagramStateProps) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [activeId, setActiveId] = useState<string | null>(null);

  const padding = 36;
  const width = Math.max(560, spec.cols * 200);
  const height = Math.max(220, spec.rows * 160);
  const cellW = (width - padding * 2) / spec.cols;
  const cellH = (height - padding * 2) / spec.rows;

  const placed = useMemo<PlacedNode[]>(() => {
    return spec.states.map((state) => {
      const isMarker = state.kind === "initial" || state.kind === "terminal";
      const cx = padding + (state.col ?? 0) * cellW + cellW / 2;
      const cy = padding + (state.row ?? 0) * cellH + cellH / 2;
      if (isMarker) {
        return { ...state, cx, cy, width: 26, height: 26, shape: "circle" as const };
      }
      if (state.kind === "choice") {
        return { ...state, cx, cy, width: 60, height: 60, shape: "circle" as const };
      }
      const w = Math.min(170, cellW * 0.78);
      const h = Math.min(72, cellH * 0.55);
      return { ...state, cx, cy, width: w, height: h, shape: "rect" as const };
    });
  }, [spec.states, cellW, cellH, padding]);

  const placedById = useMemo(() => {
    const map = new Map<string, PlacedNode>();
    placed.forEach((p) => map.set(p.id, p));
    return map;
  }, [placed]);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        role="img"
        aria-label={pickLabel(spec.legend, lang) || "state diagram"}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ maxWidth: width, display: "block" }}
        onClick={() => setActiveId(null)}
      >
        <defs>
          <marker
            id="state-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth={6}
            markerHeight={6}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.accent} />
          </marker>
        </defs>

        {/* Transitions */}
        {spec.transitions.map((tr, idx) => {
          const from = placedById.get(tr.from);
          const to = placedById.get(tr.to);
          if (!from || !to) return null;
          const dx = to.cx - from.cx;
          const dy = to.cy - from.cy;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const fromR = (Math.min(from.width, from.height) / 2) + 2;
          const toR = (Math.min(to.width, to.height) / 2) + 6;
          const sx = from.cx + ux * fromR;
          const sy = from.cy + uy * fromR;
          const ex = to.cx - ux * toR;
          const ey = to.cy - uy * toR;
          const midX = (sx + ex) / 2;
          const midY = (sy + ey) / 2;
          const offset = 30;
          const cx1 = midX - uy * offset;
          const cy1 = midY + ux * offset;
          const t = tone(tr.tone, colors);
          const dash =
            tr.style === "dashed"
              ? "6 6"
              : tr.style === "dotted"
                ? "1 6"
                : undefined;
          const labelText = pickLabel(tr.label, lang);
          const dim = activeId !== null && activeId !== tr.from && activeId !== tr.to;
          return (
            <g key={`tr-${idx}`} opacity={dim ? 0.18 : 1}>
              <path
                d={`M ${sx} ${sy} Q ${cx1} ${cy1} ${ex} ${ey}`}
                fill="none"
                stroke={t.stroke}
                strokeWidth={1.5}
                strokeDasharray={dash}
                markerEnd="url(#state-arrow)"
              />
              {labelText ? (
                <g>
                  <rect
                    x={cx1 - Math.min(labelText.length * 4 + 8, 100)}
                    y={cy1 - 9}
                    width={Math.min(labelText.length * 8 + 16, 200)}
                    height={18}
                    rx={6}
                    fill={colors.panel}
                    stroke={colors.softBorder}
                  />
                  <text
                    x={cx1}
                    y={cy1 + 4}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={10}
                    fill={t.text}
                  >
                    {labelText}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}

        {/* States */}
        {placed.map((node) => {
          const t = tone(node.tone, colors);
          const isActive = activeId === node.id;
          const handleClick = (event: React.MouseEvent) => {
            event.stopPropagation();
            setActiveId((prev) => (prev === node.id ? null : node.id));
          };
          if (node.kind === "initial") {
            return (
              <circle
                key={node.id}
                cx={node.cx}
                cy={node.cy}
                r={node.width / 2}
                fill={colors.text}
                stroke={colors.text}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            );
          }
          if (node.kind === "terminal") {
            return (
              <g
                key={node.id}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.width / 2}
                  fill="transparent"
                  stroke={colors.text}
                  strokeWidth={1.4}
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.width / 2 - 5}
                  fill={colors.text}
                />
              </g>
            );
          }
          if (node.kind === "choice") {
            const points = [
              `${node.cx},${node.cy - node.height / 2}`,
              `${node.cx + node.width / 2},${node.cy}`,
              `${node.cx},${node.cy + node.height / 2}`,
              `${node.cx - node.width / 2},${node.cy}`,
            ].join(" ");
            return (
              <polygon
                key={node.id}
                points={points}
                fill={t.fill}
                stroke={t.stroke}
                strokeWidth={isActive ? 2.4 : 1.4}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
            );
          }
          return (
            <g
              key={node.id}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={node.cx - node.width / 2}
                y={node.cy - node.height / 2}
                width={node.width}
                height={node.height}
                rx={14}
                ry={14}
                fill={isActive ? colors.accentSoft : t.fill}
                stroke={isActive ? colors.accent : t.stroke}
                strokeWidth={isActive ? 2.4 : 1.4}
              />
              <text
                x={node.cx}
                y={node.cy + 4}
                textAnchor="middle"
                fontFamily="var(--font-sans, inherit)"
                fontSize={13}
                fontWeight={600}
                fill={t.text}
              >
                {pickLabel(node.label, lang)}
              </text>
            </g>
          );
        })}
      </svg>
      {pickLabel(spec.legend, lang) ? (
        <p
          style={{
            margin: "0.6rem 0 0",
            fontSize: "0.82rem",
            color: colors.textMuted,
            lineHeight: 1.55,
          }}
        >
          {pickLabel(spec.legend, lang)}
        </p>
      ) : null}
    </div>
  );
}
