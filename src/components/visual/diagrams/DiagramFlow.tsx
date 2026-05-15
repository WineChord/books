import React, { useMemo, useState } from "react";
import { useThemeMode, palette, type Palette } from "../useThemeMode";
import {
  type FlowSpec,
  type FlowNode,
  type FlowEdge,
  type FlowSubgraph,
  type Lang,
  type Tone,
  pickLabel,
} from "./types";

// Maps a logical "tone" to fill / stroke / text colors using the active palette
// so every diagram across the book stays consistent in light and dark mode.
function toneColors(tone: Tone | undefined, p: Palette) {
  switch (tone) {
    case "accent":
      return { fill: p.accentSoft, stroke: p.accent, text: p.accent };
    case "success":
      return { fill: p.successSoft, stroke: p.success, text: p.success };
    case "warning":
      return { fill: p.warningSoft, stroke: p.warning, text: p.warning };
    case "info":
      return { fill: p.infoSoft, stroke: p.info, text: p.info };
    case "danger":
      return { fill: p.warningSoft, stroke: "#dc2626", text: "#dc2626" };
    case "muted":
      return { fill: p.track, stroke: p.softBorder, text: p.textMuted };
    default:
      return { fill: p.panel, stroke: p.border, text: p.text };
  }
}

interface NodeRect {
  x: number;
  y: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
}

function rectFor(
  node: FlowNode,
  cellW: number,
  cellH: number,
  padX: number,
  padY: number,
): NodeRect {
  const colSpan = node.colSpan ?? 1;
  const rowSpan = node.rowSpan ?? 1;
  const widthUnits = node.widthUnits ?? Math.min(0.86, 0.92 - 0.02 * (colSpan - 1));
  const heightUnits = node.heightUnits ?? 0.62;
  const cellX = padX + (node.col ?? 0) * cellW;
  const cellY = padY + (node.row ?? 0) * cellH;
  const cellWidth = cellW * colSpan;
  const cellHeight = cellH * rowSpan;
  const width = cellWidth * widthUnits;
  const height = cellHeight * heightUnits;
  const x = cellX + (cellWidth - width) / 2;
  const y = cellY + (cellHeight - height) / 2;
  return { x, y, width, height, cx: x + width / 2, cy: y + height / 2 };
}

function edgeArrowId(prefix: string, tone: Tone | undefined) {
  return `${prefix}-${tone ?? "default"}`;
}

// Computes anchor points on a node rectangle in the direction of a target so
// arrows visually attach to the box edge instead of the centre.
function anchorPoint(
  rect: NodeRect,
  target: { cx: number; cy: number },
  shape: "rect" | "diamond" | "circle",
) {
  const dx = target.cx - rect.cx;
  const dy = target.cy - rect.cy;
  if (dx === 0 && dy === 0) return { x: rect.cx, y: rect.cy };
  if (shape === "circle") {
    const r = Math.min(rect.width, rect.height) / 2;
    const len = Math.hypot(dx, dy);
    return { x: rect.cx + (dx / len) * r, y: rect.cy + (dy / len) * r };
  }
  if (shape === "diamond") {
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    const k = halfW * halfH / (halfW * Math.abs(dy) + halfH * Math.abs(dx));
    return { x: rect.cx + dx * k, y: rect.cy + dy * k };
  }
  // Rectangle
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;
  const slope = Math.abs(dy / Math.max(Math.abs(dx), 0.0001));
  const limit = halfH / Math.max(halfW, 0.0001);
  if (slope < limit) {
    const sign = dx >= 0 ? 1 : -1;
    return { x: rect.cx + sign * halfW, y: rect.cy + sign * halfW * (dy / dx) };
  }
  const sign = dy >= 0 ? 1 : -1;
  return { x: rect.cx + sign * halfH * (dx / dy), y: rect.cy + sign * halfH };
}

function nodeRoutingShape(node: FlowNode): "rect" | "diamond" | "circle" {
  if (node.shape === "diamond") return "diamond";
  if (node.shape === "circle" || node.shape === "hex") return "circle";
  return "rect";
}

function buildPath(
  rectFrom: NodeRect,
  rectTo: NodeRect,
  shapeFrom: "rect" | "diamond" | "circle",
  shapeTo: "rect" | "diamond" | "circle",
  route: NonNullable<FlowEdge["route"]>,
  bend: number,
): { d: string; midX: number; midY: number } {
  const a = anchorPoint(rectFrom, { cx: rectTo.cx, cy: rectTo.cy }, shapeFrom);
  const b = anchorPoint(rectTo, { cx: rectFrom.cx, cy: rectFrom.cy }, shapeTo);
  if (route === "loop") {
    const r = Math.min(rectFrom.width, rectFrom.height) / 2 + 14;
    const start = { x: rectFrom.x + rectFrom.width, y: rectFrom.cy - rectFrom.height / 4 };
    const end = { x: rectFrom.x + rectFrom.width, y: rectFrom.cy + rectFrom.height / 4 };
    const ctrl1 = { x: start.x + r, y: start.y - r };
    const ctrl2 = { x: end.x + r, y: end.y + r };
    return {
      d: `M ${start.x} ${start.y} C ${ctrl1.x} ${ctrl1.y}, ${ctrl2.x} ${ctrl2.y}, ${end.x} ${end.y}`,
      midX: start.x + r,
      midY: rectFrom.cy,
    };
  }
  if (route === "h") {
    const midX = (a.x + b.x) / 2;
    return {
      d: `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`,
      midX,
      midY: (a.y + b.y) / 2,
    };
  }
  if (route === "v") {
    const midY = (a.y + b.y) / 2;
    return {
      d: `M ${a.x} ${a.y} L ${a.x} ${midY} L ${b.x} ${midY} L ${b.x} ${b.y}`,
      midX: (a.x + b.x) / 2,
      midY,
    };
  }
  // Bezier curve. Compute control points so vertical edges curve out
  // horizontally and horizontal edges curve out vertically.
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const verticalDominant = Math.abs(dy) >= Math.abs(dx);
  const offset = verticalDominant
    ? Math.min(140, Math.max(40, Math.abs(dy) * 0.35))
    : Math.min(140, Math.max(40, Math.abs(dx) * 0.35));
  const factor = bend ?? 1;
  const c1 = verticalDominant
    ? { x: a.x, y: a.y + Math.sign(dy || 1) * offset * factor }
    : { x: a.x + Math.sign(dx || 1) * offset * factor, y: a.y };
  const c2 = verticalDominant
    ? { x: b.x, y: b.y - Math.sign(dy || 1) * offset * factor }
    : { x: b.x - Math.sign(dx || 1) * offset * factor, y: b.y };
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  return {
    d: `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`,
    midX,
    midY,
  };
}

function NodeShapePath({
  node,
  rect,
  fill,
  stroke,
  active,
  highlight,
  p,
}: {
  node: FlowNode;
  rect: NodeRect;
  fill: string;
  stroke: string;
  active: boolean;
  highlight: boolean;
  p: Palette;
}) {
  const stroked = highlight ? p.accent : stroke;
  const strokeWidth = active ? 2.5 : highlight ? 2 : 1.4;
  const fillFinal = active ? p.accentSoft : fill;
  const shape = node.shape ?? "rounded";
  if (shape === "circle" || shape === "hex") {
    const r = Math.min(rect.width, rect.height) / 2;
    return (
      <circle
        cx={rect.cx}
        cy={rect.cy}
        r={r}
        fill={fillFinal}
        stroke={stroked}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === "diamond") {
    const points = [
      `${rect.cx},${rect.y}`,
      `${rect.x + rect.width},${rect.cy}`,
      `${rect.cx},${rect.y + rect.height}`,
      `${rect.x},${rect.cy}`,
    ].join(" ");
    return (
      <polygon
        points={points}
        fill={fillFinal}
        stroke={stroked}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === "parallelogram") {
    const slant = Math.min(20, rect.height * 0.4);
    const points = [
      `${rect.x + slant},${rect.y}`,
      `${rect.x + rect.width},${rect.y}`,
      `${rect.x + rect.width - slant},${rect.y + rect.height}`,
      `${rect.x},${rect.y + rect.height}`,
    ].join(" ");
    return (
      <polygon
        points={points}
        fill={fillFinal}
        stroke={stroked}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === "cylinder") {
    const r = Math.min(rect.width / 2, 14);
    const top = rect.y + r;
    const bottom = rect.y + rect.height - r;
    const d = [
      `M ${rect.x} ${top}`,
      `Q ${rect.x} ${rect.y - r * 0.3} ${rect.cx} ${rect.y}`,
      `Q ${rect.x + rect.width} ${rect.y - r * 0.3} ${rect.x + rect.width} ${top}`,
      `L ${rect.x + rect.width} ${bottom}`,
      `Q ${rect.x + rect.width} ${rect.y + rect.height + r * 0.3} ${rect.cx} ${rect.y + rect.height}`,
      `Q ${rect.x} ${rect.y + rect.height + r * 0.3} ${rect.x} ${bottom}`,
      `Z`,
    ].join(" ");
    return (
      <path
        d={d}
        fill={fillFinal}
        stroke={stroked}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === "note") {
    const fold = 12;
    const points = [
      `${rect.x},${rect.y}`,
      `${rect.x + rect.width - fold},${rect.y}`,
      `${rect.x + rect.width},${rect.y + fold}`,
      `${rect.x + rect.width},${rect.y + rect.height}`,
      `${rect.x},${rect.y + rect.height}`,
    ].join(" ");
    return (
      <g>
        <polygon
          points={points}
          fill={fillFinal}
          stroke={stroked}
          strokeWidth={strokeWidth}
        />
        <polyline
          points={`${rect.x + rect.width - fold},${rect.y} ${rect.x + rect.width - fold},${rect.y + fold} ${rect.x + rect.width},${rect.y + fold}`}
          fill="none"
          stroke={stroked}
          strokeWidth={1}
        />
      </g>
    );
  }
  if (shape === "pill") {
    const r = rect.height / 2;
    return (
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        rx={r}
        ry={r}
        fill={fillFinal}
        stroke={stroked}
        strokeWidth={strokeWidth}
      />
    );
  }
  // rounded / rect default
  const rx = shape === "rect" ? 4 : 12;
  return (
    <rect
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      rx={rx}
      ry={rx}
      fill={fillFinal}
      stroke={stroked}
      strokeWidth={strokeWidth}
    />
  );
}

// Splits a long label into balanced lines so multi-word node text wraps
// inside the node instead of overflowing horizontally.
function wrapLabel(text: string, maxChars: number): string[] {
  if (!text) return [];
  // For text dominated by CJK characters, hard wrap by character count.
  const cjk = (text.match(/[\u3000-\u9FFF\uFF00-\uFFEF]/g) ?? []).length;
  if (cjk > text.length * 0.4) {
    const out: string[] = [];
    for (let i = 0; i < text.length; i += maxChars) {
      out.push(text.slice(i, i + maxChars));
    }
    return out;
  }
  const words = text.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let line = "";
  for (const word of words) {
    if (!line) {
      line = word;
      continue;
    }
    if (line.length + word.length + 1 <= maxChars) {
      line += " " + word;
    } else {
      out.push(line);
      line = word;
    }
  }
  if (line) out.push(line);
  return out;
}

function renderSubgraph(
  subgraph: FlowSubgraph,
  members: FlowNode[],
  cellW: number,
  cellH: number,
  padX: number,
  padY: number,
  lang: Lang,
  p: Palette,
) {
  const colStart =
    subgraph.col ??
    Math.min(...members.map((node) => node.col ?? 0));
  const rowStart =
    subgraph.row ??
    Math.min(...members.map((node) => node.row ?? 0));
  const colEnd =
    subgraph.col !== undefined && subgraph.colSpan !== undefined
      ? subgraph.col + subgraph.colSpan
      : Math.max(
          ...members.map(
            (node) => (node.col ?? 0) + (node.colSpan ?? 1),
          ),
        );
  const rowEnd =
    subgraph.row !== undefined && subgraph.rowSpan !== undefined
      ? subgraph.row + subgraph.rowSpan
      : Math.max(
          ...members.map(
            (node) => (node.row ?? 0) + (node.rowSpan ?? 1),
          ),
        );
  const x = padX + colStart * cellW + 8;
  const y = padY + rowStart * cellH + 8;
  const width = (colEnd - colStart) * cellW - 16;
  const height = (rowEnd - rowStart) * cellH - 16;
  const tone = toneColors(subgraph.tone ?? "muted", p);
  const label = pickLabel(subgraph.label, lang);
  return (
    <g key={`sg-${subgraph.id}`}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        ry={14}
        fill={tone.fill}
        stroke={tone.stroke}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      {label ? (
        <text
          x={x + 12}
          y={y + 18}
          fontFamily="var(--font-mono)"
          fontSize={11}
          fontWeight={700}
          fill={tone.text}
          letterSpacing="0.06em"
          style={{ textTransform: "uppercase" }}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export interface DiagramFlowProps {
  spec: FlowSpec;
  lang: Lang;
}

export default function DiagramFlow({ spec, lang }: DiagramFlowProps) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [activeId, setActiveId] = useState<string | null>(null);
  const interactive = spec.interactive !== false;

  const padding = spec.padding ?? 28;
  const width = spec.width ?? Math.max(560, Math.min(960, spec.cols * 168));
  const baseHeight = spec.height ?? Math.max(220, spec.rows * 110);
  const height = baseHeight;
  const cellW = (width - padding * 2) / spec.cols;
  const cellH = (height - padding * 2) / spec.rows;

  const rectByNode = useMemo(() => {
    const map = new Map<string, NodeRect>();
    for (const node of spec.nodes) {
      map.set(node.id, rectFor(node, cellW, cellH, padding, padding));
    }
    return map;
  }, [spec.nodes, cellW, cellH, padding]);

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of spec.edges) {
      if (!map.has(edge.from)) map.set(edge.from, new Set());
      if (!map.has(edge.to)) map.set(edge.to, new Set());
      map.get(edge.from)!.add(edge.to);
      map.get(edge.to)!.add(edge.from);
    }
    return map;
  }, [spec.edges]);

  const arrowTones: Tone[] = [
    "default",
    "accent",
    "success",
    "warning",
    "info",
    "muted",
    "danger",
  ];

  const subgraphMembers = (subgraph: FlowSubgraph) =>
    spec.nodes.filter((node) => node.group === subgraph.id);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        role="img"
        aria-label={pickLabel(spec.legend, lang) || "diagram"}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ maxWidth: width, display: "block" }}
        onClick={() => interactive && setActiveId(null)}
      >
        <defs>
          {arrowTones.map((tone) => {
            const c = toneColors(tone, colors).stroke;
            return (
              <marker
                key={`arrow-${tone}`}
                id={edgeArrowId("af-arrow", tone)}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
              </marker>
            );
          })}
        </defs>

        {(spec.subgraphs ?? []).map((sub) =>
          renderSubgraph(
            sub,
            subgraphMembers(sub),
            cellW,
            cellH,
            padding,
            padding,
            lang,
            colors,
          ),
        )}

        {/* Edges */}
        {spec.edges.map((edge, idx) => {
          const fromNode = spec.nodes.find((n) => n.id === edge.from);
          const toNode = spec.nodes.find((n) => n.id === edge.to);
          const rectFrom = rectByNode.get(edge.from);
          const rectTo = rectByNode.get(edge.to);
          if (!fromNode || !toNode || !rectFrom || !rectTo) return null;
          const tone = edge.tone ?? "muted";
          const tc = toneColors(tone, colors);
          const dim = activeId !== null && activeId !== edge.from && activeId !== edge.to;
          const highlight =
            activeId !== null && (activeId === edge.from || activeId === edge.to);
          const strokeWidth = highlight ? 2.4 : 1.5;
          const dash =
            edge.style === "dashed"
              ? "6 6"
              : edge.style === "dotted"
                ? "1 6"
                : undefined;
          const route = edge.route ?? "auto";
          const bend = edge.bend ?? 1;
          const path = buildPath(
            rectFrom,
            rectTo,
            nodeRoutingShape(fromNode),
            nodeRoutingShape(toNode),
            route === "auto" ? "curve" : route,
            bend,
          );
          const labelText = pickLabel(edge.label, lang);
          const arrowId = `url(#${edgeArrowId("af-arrow", tone)})`;
          return (
            <g key={`edge-${idx}`} opacity={dim ? 0.18 : 1}>
              <path
                d={path.d}
                fill="none"
                stroke={tc.stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dash}
                markerEnd={edge.arrow === "none" ? undefined : arrowId}
                markerStart={edge.arrow === "double" ? arrowId : undefined}
              />
              {labelText ? (
                <g>
                  <rect
                    x={path.midX - Math.min(labelText.length * 4 + 8, 90)}
                    y={path.midY - 9}
                    width={Math.min(labelText.length * 8 + 16, 180)}
                    height={18}
                    rx={6}
                    ry={6}
                    fill={colors.panel}
                    stroke={colors.softBorder}
                    strokeWidth={1}
                  />
                  <text
                    x={path.midX}
                    y={path.midY + 4}
                    fontFamily="var(--font-mono)"
                    fontSize={10}
                    fill={tc.text}
                    textAnchor="middle"
                  >
                    {labelText}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}

        {/* Nodes */}
        {spec.nodes.map((node) => {
          const rect = rectByNode.get(node.id);
          if (!rect) return null;
          const tc = toneColors(node.tone, colors);
          const active = activeId === node.id;
          const neighbors = adjacency.get(activeId ?? "") ?? new Set();
          const highlight = activeId !== null && neighbors.has(node.id);
          const dim = activeId !== null && !active && !highlight;
          const labelLines = wrapLabel(
            pickLabel(node.label, lang),
            Math.max(8, Math.floor(rect.width / 8)),
          );
          const subText = node.sub ? pickLabel(node.sub, lang) : "";
          const subLines = subText
            ? wrapLabel(subText, Math.max(10, Math.floor(rect.width / 7)))
            : [];
          const handleClick = (event: React.MouseEvent) => {
            event.stopPropagation();
            if (!interactive) return;
            setActiveId((prev) => (prev === node.id ? null : node.id));
          };
          return (
            <g
              key={node.id}
              opacity={dim ? 0.32 : 1}
              style={{
                cursor: interactive ? "pointer" : "default",
                transition: "opacity 200ms ease",
              }}
              onClick={handleClick}
            >
              <NodeShapePath
                node={node}
                rect={rect}
                fill={tc.fill}
                stroke={tc.stroke}
                active={active}
                highlight={highlight}
                p={colors}
              />
              {labelLines.map((line, idx) => (
                <text
                  key={`label-${node.id}-${idx}`}
                  x={rect.cx}
                  y={
                    rect.cy -
                    ((labelLines.length - 1) * 7) +
                    idx * 14 -
                    (subLines.length > 0 ? 4 : 0)
                  }
                  textAnchor="middle"
                  fontFamily="var(--font-sans, inherit)"
                  fontSize={Math.min(13, Math.max(11, rect.height / 6))}
                  fontWeight={600}
                  fill={tc.text}
                >
                  {line}
                </text>
              ))}
              {subLines.map((line, idx) => (
                <text
                  key={`sub-${node.id}-${idx}`}
                  x={rect.cx}
                  y={
                    rect.cy +
                    rect.height / 2 -
                    8 -
                    (subLines.length - idx - 1) * 12
                  }
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={10}
                  fill={colors.textMuted}
                >
                  {line}
                </text>
              ))}
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
      {interactive ? (
        <p
          style={{
            margin: "0.4rem 0 0",
            fontSize: "0.72rem",
            color: colors.textMuted,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          {lang === "zh"
            ? "点击任意节点高亮其连接，再点空白可重置"
            : "Click any node to spotlight its connections; click empty space to reset."}
        </p>
      ) : null}
    </div>
  );
}
