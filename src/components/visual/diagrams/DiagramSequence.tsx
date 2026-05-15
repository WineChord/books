import React, { useEffect, useMemo, useState } from "react";
import { useThemeMode, palette, type Palette } from "../useThemeMode";
import {
  type Lang,
  type SequenceSpec,
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
    case "danger":
      return { fill: p.warningSoft, stroke: "#dc2626", text: "#dc2626" };
    case "muted":
      return { fill: p.track, stroke: p.softBorder, text: p.textMuted };
    default:
      return { fill: p.panel, stroke: p.border, text: p.text };
  }
}

export interface DiagramSequenceProps {
  spec: SequenceSpec;
  lang: Lang;
  // When true, shows a play / step / reset toolbar that animates messages.
  steppable?: boolean;
}

export default function DiagramSequence({
  spec,
  lang,
  steppable = true,
}: DiagramSequenceProps) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [step, setStep] = useState(spec.steps.length); // show all by default
  const [playing, setPlaying] = useState(false);

  const actorCount = spec.actors.length;
  const padX = 32;
  const padTop = 60;
  const padBottom = 32;
  const actorWidth = 132;
  const actorGap = 32;
  const messageGap = 52;
  const totalWidth = padX * 2 + actorCount * actorWidth + (actorCount - 1) * actorGap;
  const totalHeight =
    padTop + padBottom + Math.max(60, spec.steps.length * messageGap + 30);

  const actorX = useMemo(() => {
    const map = new Map<string, number>();
    spec.actors.forEach((actor, idx) => {
      map.set(actor.id, padX + idx * (actorWidth + actorGap) + actorWidth / 2);
    });
    return map;
  }, [spec.actors]);

  useEffect(() => {
    if (!playing) return;
    if (step >= spec.steps.length) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((prev) => prev + 1), 700);
    return () => clearTimeout(timer);
  }, [playing, step, spec.steps.length]);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        role="img"
        aria-label={pickLabel(spec.legend, lang) || "sequence diagram"}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        width="100%"
        style={{ maxWidth: totalWidth, display: "block" }}
      >
        <defs>
          <marker
            id="seq-arrow-default"
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
          <marker
            id="seq-arrow-reply"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth={6}
            markerHeight={6}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.success} />
          </marker>
        </defs>

        {/* Lifelines */}
        {spec.actors.map((actor) => {
          const x = actorX.get(actor.id)!;
          return (
            <g key={`life-${actor.id}`}>
              <line
                x1={x}
                x2={x}
                y1={padTop + 18}
                y2={totalHeight - padBottom}
                stroke={colors.softBorder}
                strokeDasharray="4 6"
                strokeWidth={1}
              />
            </g>
          );
        })}

        {/* Actor headers */}
        {spec.actors.map((actor) => {
          const x = actorX.get(actor.id)!;
          const t = tone(actor.tone ?? "accent", colors);
          return (
            <g key={`head-${actor.id}`}>
              <rect
                x={x - actorWidth / 2}
                y={padTop - 32}
                width={actorWidth}
                height={36}
                rx={10}
                ry={10}
                fill={t.fill}
                stroke={t.stroke}
                strokeWidth={1.4}
              />
              <text
                x={x}
                y={padTop - 9}
                textAnchor="middle"
                fontFamily="var(--font-sans, inherit)"
                fontSize={12.5}
                fontWeight={600}
                fill={t.text}
              >
                {pickLabel(actor.label, lang)}
              </text>
            </g>
          );
        })}

        {/* Messages */}
        {spec.steps.map((stepDef, idx) => {
          const visible = idx < step;
          const fromX = actorX.get(stepDef.from)!;
          const toX = actorX.get(stepDef.to)!;
          const y = padTop + 30 + idx * messageGap;
          const isSelf = stepDef.from === stepDef.to;
          const t = tone(
            stepDef.tone ?? (stepDef.kind === "reply" ? "success" : "accent"),
            colors,
          );
          const dash =
            stepDef.kind === "async" || stepDef.kind === "reply"
              ? "6 6"
              : undefined;
          const arrow =
            stepDef.kind === "reply" ? "url(#seq-arrow-reply)" : "url(#seq-arrow-default)";
          const opacity = visible ? 1 : 0.18;
          const labelText = pickLabel(stepDef.label, lang);
          if (isSelf) {
            const r = 22;
            const path = `M ${fromX} ${y} C ${fromX + r * 3} ${y - r}, ${fromX + r * 3} ${y + r}, ${fromX} ${y + r}`;
            return (
              <g key={`step-${idx}`} opacity={opacity}>
                <path
                  d={path}
                  fill="none"
                  stroke={t.stroke}
                  strokeWidth={1.6}
                  strokeDasharray={dash}
                  markerEnd={arrow}
                />
                {labelText ? (
                  <text
                    x={fromX + r * 3 + 6}
                    y={y + 4}
                    fontFamily="var(--font-mono)"
                    fontSize={11}
                    fill={t.text}
                  >
                    {labelText}
                  </text>
                ) : null}
              </g>
            );
          }
          const direction = toX >= fromX ? 1 : -1;
          return (
            <g key={`step-${idx}`} opacity={opacity}>
              <line
                x1={fromX}
                y1={y}
                x2={toX - direction * 6}
                y2={y}
                stroke={t.stroke}
                strokeWidth={1.6}
                strokeDasharray={dash}
                markerEnd={arrow}
              />
              {labelText ? (
                <g>
                  <rect
                    x={(fromX + toX) / 2 - Math.min(labelText.length * 4 + 10, 110)}
                    y={y - 22}
                    width={Math.min(labelText.length * 8 + 20, 220)}
                    height={18}
                    rx={6}
                    ry={6}
                    fill={colors.panel}
                    stroke={colors.softBorder}
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={y - 9}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={11}
                    fill={t.text}
                  >
                    {labelText}
                  </text>
                </g>
              ) : null}
              {stepDef.note ? (
                <g>
                  <rect
                    x={fromX - actorWidth / 2 + 6}
                    y={y + 8}
                    width={actorWidth - 12}
                    height={26}
                    rx={6}
                    ry={6}
                    fill={colors.warningSoft}
                    stroke={colors.warning}
                    strokeWidth={1}
                  />
                  <text
                    x={fromX}
                    y={y + 25}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={10}
                    fill={colors.warning}
                  >
                    {pickLabel(stepDef.note, lang)}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
      {steppable && spec.steps.length > 1 ? (
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginTop: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (step >= spec.steps.length) setStep(0);
              setPlaying((p) => !p);
            }}
            style={{
              border: `1px solid ${colors.accent}`,
              background: playing ? colors.accent : "transparent",
              color: playing ? "#fff" : colors.accent,
              padding: "4px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {playing
              ? lang === "zh" ? "暂停" : "Pause"
              : lang === "zh" ? "播放" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, spec.steps.length))}
            style={{
              border: `1px solid ${colors.softBorder}`,
              background: "transparent",
              color: colors.text,
              padding: "4px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {lang === "zh" ? "下一步" : "Step"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(0);
            }}
            style={{
              border: `1px solid ${colors.softBorder}`,
              background: "transparent",
              color: colors.textMuted,
              padding: "4px 12px",
              borderRadius: 999,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {lang === "zh" ? "重置" : "Reset"}
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: colors.textMuted,
            }}
          >
            {step}/{spec.steps.length}
          </span>
        </div>
      ) : null}
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
