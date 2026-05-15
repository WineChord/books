import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette, type Palette } from "./useThemeMode";

type LaneKey = "sse" | "ws" | "realtime";
type EventType =
  | "delta" | "done" | "error" | "heartbeat" | "interrupt"
  | "audio_frame" | "reconnect" | "resume" | "rehandshake";
type Tone = "pending" | "active" | "warn" | "ok";

interface TimelineEvent { id: number; type: EventType; t: number; chunkIndex?: number }

interface LaneConfig {
  key: LaneKey;
  enLabel: string; zhLabel: string;
  enModel: string; zhModel: string;
  enRecovery: string; zhRecovery: string;
  firstByteMs: number; chunkMs: number; recoveryMs: number;
  recovery: "restart" | "resume" | "rehandshake";
  events: EventType[];
}

const TOTAL_CHUNKS = 10;
const ERROR_AT = 5;

// Per-lane base event sequence; last entry must be "done" to close stream.
const lanes: LaneConfig[] = [
  {
    key: "sse", enLabel: "SSE", zhLabel: "SSE",
    enModel: "1 HTTP request, server streams chunks",
    zhModel: "一次 HTTP 请求，服务端推送 chunk",
    enRecovery: "Retry the request from scratch",
    zhRecovery: "重新发起请求，从头重试",
    firstByteMs: 120, chunkMs: 110, recoveryMs: 800, recovery: "restart",
    events: [
      "delta", "delta", "heartbeat", "delta", "delta",
      "delta", "delta", "delta", "delta", "done",
    ],
  },
  {
    key: "ws", enLabel: "WebSocket", zhLabel: "WebSocket",
    enModel: "Persistent bidirectional channel",
    zhModel: "持久双向通道",
    enRecovery: "Resume from last sequence id",
    zhRecovery: "按 sequence id 续传",
    firstByteMs: 80, chunkMs: 90, recoveryMs: 400, recovery: "resume",
    events: [
      "delta", "delta", "delta", "delta", "delta",
      "delta", "heartbeat", "delta", "interrupt", "done",
    ],
  },
  {
    key: "realtime", enLabel: "Realtime audio/video", zhLabel: "Realtime 音视频",
    enModel: "Duplex media + control plane",
    zhModel: "双工媒体 + 控制平面",
    enRecovery: "Re-handshake, drop stale frames",
    zhRecovery: "重新握手，丢弃过期帧",
    firstByteMs: 40, chunkMs: 70, recoveryMs: 200, recovery: "rehandshake",
    events: [
      "audio_frame", "delta", "audio_frame", "audio_frame", "delta",
      "audio_frame", "audio_frame", "delta", "audio_frame", "done",
    ],
  },
];

interface DimensionRow {
  key: string; enLabel: string; zhLabel: string;
  cells: Record<LaneKey, { en: string; zh: string }>;
}

const dimensions: DimensionRow[] = [
  {
    key: "connection", enLabel: "Connection model", zhLabel: "连接模型",
    cells: {
      sse: { en: "1 HTTP, server-push", zh: "一次 HTTP，服务端推送" },
      ws: { en: "Persistent duplex", zh: "持久双工" },
      realtime: { en: "Media + control planes", zh: "媒体 + 控制平面" },
    },
  },
  {
    key: "ordering", enLabel: "Frame ordering", zhLabel: "帧顺序",
    cells: {
      sse: { en: "Strict (HTTP)", zh: "严格（按 HTTP 字节序）" },
      ws: { en: "Strict per channel", zh: "按通道严格" },
      realtime: { en: "Best-effort", zh: "尽力而为（容忍乱序）" },
    },
  },
  {
    key: "backpressure", enLabel: "Backpressure", zhLabel: "背压",
    cells: {
      sse: { en: "TCP only", zh: "仅依赖 TCP" },
      ws: { en: "App-level pings", zh: "应用层 ping/pause" },
      realtime: { en: "Drop stale frames", zh: "丢弃过期帧" },
    },
  },
  {
    key: "recovery", enLabel: "Error recovery", zhLabel: "错误恢复",
    cells: {
      sse: { en: "Retry from scratch", zh: "从头重试" },
      ws: { en: "Resume by seq id", zh: "按 seq id 续传" },
      realtime: { en: "Re-handshake", zh: "重新握手" },
    },
  },
  {
    key: "modalities", enLabel: "Modalities", zhLabel: "支持的模态",
    cells: {
      sse: { en: "Text deltas", zh: "文本 delta" },
      ws: { en: "Text + control msgs", zh: "文本 + 控制消息" },
      realtime: { en: "Audio + video + text", zh: "音 + 视 + 文" },
    },
  },
];

// Build a per-lane event timeline. When errorOn, a transient error fires
// after chunk 5 and each lane responds with its own recovery pattern
// (restart for SSE, resume for WS, re-handshake for Realtime).
function buildTimeline(lane: LaneConfig, errorOn: boolean): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const ev = (type: EventType, t: number, chunkIndex?: number) =>
    events.push({ id: events.length, type, t, chunkIndex });
  const base = lane.events;
  let t = lane.firstByteMs;

  const before = Math.min(ERROR_AT, base.length);
  for (let i = 0; i < before; i++) { ev(base[i], t, i + 1); t += lane.chunkMs; }

  if (!errorOn) {
    for (let i = before; i < base.length; i++) {
      ev(base[i], t, i + 1); t += lane.chunkMs;
    }
    return events;
  }

  ev("error", t);
  const errorT = t;
  if (lane.recovery === "restart") {
    const start = errorT + lane.recoveryMs;
    ev("reconnect", start);
    let rt = start + lane.chunkMs;
    for (let i = 0; i < base.length; i++) {
      ev(base[i], rt, i + 1); rt += lane.chunkMs;
    }
  } else {
    const start = errorT + lane.recoveryMs;
    ev(lane.recovery === "resume" ? "resume" : "rehandshake", start);
    let rt = start + lane.chunkMs;
    for (let i = before; i < base.length; i++) {
      ev(base[i], rt, i + 1); rt += lane.chunkMs;
    }
  }
  return events;
}

const KEYFRAMES = `
@keyframes spl-tick-in {
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes spl-pulse {
  0%,100% { opacity: 0.55; }
  50% { opacity: 1; }
}`;

export default function StreamingProviderLanes({ lang }: { lang: Lang }) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [errorOn, setErrorOn] = useState(false);

  const reduceMotion = useRef(false);
  const nowRef = useRef(0);
  const totalRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const timelines = useMemo(() => {
    const map = {} as Record<LaneKey, TimelineEvent[]>;
    for (const lane of lanes) map[lane.key] = buildTimeline(lane, errorOn);
    return map;
  }, [errorOn]);

  const totalDuration = useMemo(() => {
    let max = 0;
    for (const lane of lanes) {
      const tl = timelines[lane.key];
      if (tl.length) max = Math.max(max, tl[tl.length - 1].t + 250);
    }
    return max;
  }, [timelines]);

  useEffect(() => { nowRef.current = now; }, [now]);
  useEffect(() => { totalRef.current = totalDuration; }, [totalDuration]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => { reduceMotion.current = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reset on errorOn change because the timeline shape changes.
  useEffect(() => { setNow(0); setPlaying(false); }, [errorOn]);

  useEffect(() => {
    if (!playing) return;
    if (reduceMotion.current) {
      setNow(totalRef.current); setPlaying(false); return;
    }
    let cancelled = false;
    const baseTime = performance.now();
    const baseNow = nowRef.current;
    const tick = () => {
      if (cancelled) return;
      const elapsed = baseNow + (performance.now() - baseTime);
      if (elapsed >= totalRef.current) {
        setNow(totalRef.current); setPlaying(false); return;
      }
      setNow(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [playing]);

  const handlePlay = () => {
    if (reduceMotion.current) {
      setNow(totalDuration); setPlaying(false); return;
    }
    if (now >= totalDuration) { setNow(0); setPlaying(true); return; }
    setPlaying((p) => !p);
  };
  const handleReset = () => { setPlaying(false); setNow(0); };

  const isDone = totalDuration > 0 && now >= totalDuration && !playing;
  const playLabel = playing
    ? (lang === "zh" ? "⏸ 暂停" : "⏸ Pause")
    : isDone
    ? (lang === "zh" ? "↺ 重放" : "↺ Replay")
    : (lang === "zh" ? "▶ 播放" : "▶ Play");

  const eventStyle = (type: EventType): { bg: string; fg: string; border: string } => {
    const purpleFg = mode === "light" ? "#6d28d9" : "#c4b5fd";
    const purpleBg = mode === "light" ? "#ede9fe" : "#231b3a";
    const dangerFg = mode === "light" ? "#b91c1c" : "#fca5a5";
    const dangerBg = mode === "light" ? "#fee2e2" : "#3a1414";
    switch (type) {
      case "delta": return { bg: colors.accentSoft, fg: colors.accent, border: colors.accent };
      case "done": return { bg: colors.successSoft, fg: colors.success, border: colors.success };
      case "error": return { bg: dangerBg, fg: dangerFg, border: dangerFg };
      case "heartbeat": return { bg: colors.infoSoft, fg: colors.info, border: colors.info };
      case "interrupt":
      case "reconnect":
      case "resume":
      case "rehandshake":
        return { bg: colors.warningSoft, fg: colors.warning, border: colors.warning };
      case "audio_frame": return { bg: purpleBg, fg: purpleFg, border: purpleFg };
    }
  };

  const laneStatus = (lane: LaneConfig): { en: string; zh: string; tone: Tone } => {
    const visible = timelines[lane.key].filter((e) => e.t <= now);
    if (visible.length === 0) {
      return now < lane.firstByteMs
        ? { en: "Connecting…", zh: "建立连接…", tone: "pending" }
        : { en: "Idle", zh: "空闲", tone: "pending" };
    }
    const last = visible[visible.length - 1].type;
    if (last === "done") return { en: "Complete", zh: "已完成", tone: "ok" };
    if (last === "error") return { en: "Error", zh: "错误", tone: "warn" };
    if (last === "reconnect") return { en: "Reconnecting…", zh: "正在重连…", tone: "warn" };
    if (last === "resume") return { en: "Resuming…", zh: "续传中…", tone: "warn" };
    if (last === "rehandshake") return { en: "Re-handshaking…", zh: "重新握手…", tone: "warn" };
    return { en: "Streaming", zh: "流式中", tone: "active" };
  };

  const tonePalette = (tone: Tone): { bg: string; fg: string } => {
    if (tone === "pending") return { bg: colors.track, fg: colors.textMuted };
    if (tone === "active") return { bg: colors.accentSoft, fg: colors.accent };
    if (tone === "warn") return { bg: colors.warningSoft, fg: colors.warning };
    return { bg: colors.successSoft, fg: colors.success };
  };

  const legendTypes: EventType[] = [
    "delta", "done", "error", "heartbeat", "interrupt", "audio_frame",
  ];

  const monoFont = "var(--font-mono)";

  return (
    <InteractiveFigure
      lang={lang}
      title="Three streaming patterns side by side"
      zhTitle="三种流式模式并排比较"
      subtitle="Press play to stream the same response through SSE, WebSocket, and Realtime. Toggle the error switch to compare recovery."
      zhSubtitle="点击播放，让同一段响应分别通过 SSE、WebSocket、Realtime 三条 lane 流式输出；切换错误开关对比恢复行为。"
      caption="Latency labels reflect first-byte budgets, not total duration. Recovery cost is what changes the runtime calculus."
      zhCaption="latency 标签代表首字节预算，不是总时长；真正影响运行时取舍的是错误恢复成本。"
      badge="Chapter 7"
      zhBadge="第 7 章"
    >
      <style>{KEYFRAMES}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
            padding: 10, background: colors.background,
            border: `1px solid ${colors.softBorder}`, borderRadius: 9,
          }}
        >
          <button
            onClick={handlePlay}
            aria-pressed={playing}
            style={{
              background: colors.accent, color: "#fff", border: "none",
              borderRadius: 8, padding: "6px 14px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", fontFamily: monoFont,
            }}
          >
            {playLabel}
          </button>
          <button
            onClick={handleReset}
            style={{
              background: colors.panel, color: colors.text,
              border: `1px solid ${colors.border}`, borderRadius: 8,
              padding: "6px 14px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: monoFont,
            }}
          >
            {lang === "zh" ? "复位" : "Reset"}
          </button>
          <label
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 8,
              border: `1px solid ${errorOn ? colors.warning : colors.softBorder}`,
              background: errorOn ? colors.warningSoft : colors.panel,
              color: errorOn ? colors.warning : colors.text,
              fontSize: 12, fontWeight: 600, fontFamily: monoFont,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={errorOn}
              onChange={(e) => setErrorOn(e.target.checked)}
              style={{ accentColor: colors.warning }}
            />
            <span>
              {lang === "zh"
                ? "在第 5 个 chunk 注入瞬态错误"
                : "Inject a transient error at chunk 5"}
            </span>
          </label>
          <div
            style={{
              marginLeft: "auto", fontFamily: monoFont, fontSize: 11,
              color: colors.textMuted, fontVariantNumeric: "tabular-nums",
            }}
          >
            t = {String(Math.round(now)).padStart(4, "0")} /{" "}
            {Math.round(totalDuration)} ms
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 12,
          }}
        >
          {lanes.map((lane) => {
            const visible = timelines[lane.key].filter((e) => e.t <= now);
            const status = laneStatus(lane);
            const tone = tonePalette(status.tone);
            const chunkCount = visible.filter((e) => e.chunkIndex !== undefined).length;
            const totalChunkSlots =
              errorOn && lane.recovery === "restart"
                ? TOTAL_CHUNKS * 2
                : TOTAL_CHUNKS;
            return (
              <div
                key={lane.key}
                style={{
                  border: `1px solid ${colors.softBorder}`, borderRadius: 12,
                  background: colors.background, display: "flex",
                  flexDirection: "column", overflow: "hidden", minWidth: 0,
                }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    borderBottom: `1px solid ${colors.softBorder}`,
                    background: colors.panel,
                    display: "flex", flexDirection: "column", gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700, fontSize: 13, color: colors.text,
                        fontFamily: monoFont,
                      }}
                    >
                      {localized(lang, lane.enLabel, lane.zhLabel)}
                    </span>
                    <span
                      style={{
                        fontSize: 10.5, fontWeight: 700,
                        padding: "2px 6px", borderRadius: 999,
                        background: colors.accentSoft, color: colors.accent,
                        fontFamily: monoFont,
                      }}
                    >
                      ~{lane.firstByteMs}ms
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10.5, color: colors.textMuted,
                      fontFamily: monoFont, lineHeight: 1.45,
                    }}
                  >
                    {localized(lang, lane.enModel, lane.zhModel)}
                  </div>
                </div>

                <div
                  aria-label={
                    lang === "zh"
                      ? `${lane.zhLabel} 流式事件列表`
                      : `${lane.enLabel} stream of events`
                  }
                  style={{
                    position: "relative", padding: 8, height: 320,
                    overflowY: "auto", display: "flex",
                    flexDirection: "column", gap: 4,
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", left: 14, top: 8, bottom: 8,
                      width: 2,
                      background: `repeating-linear-gradient(180deg, ${colors.softBorder} 0 6px, transparent 6px 10px)`,
                      pointerEvents: "none",
                    }}
                  />
                  {visible.length === 0 ? (
                    <div
                      style={{
                        position: "relative", paddingLeft: 28,
                        fontFamily: monoFont, fontSize: 11.5,
                        color: colors.textMuted,
                      }}
                    >
                      {lang === "zh" ? "等待首字节…" : "waiting for first byte…"}
                    </div>
                  ) : null}
                  {visible.map((ev) => {
                    const s = eventStyle(ev.type);
                    return (
                      <div
                        key={ev.id}
                        style={{
                          position: "relative", paddingLeft: 28,
                          animation: reduceMotion.current
                            ? "none"
                            : "spl-tick-in 0.3s ease-out both",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute", left: 8, top: 5,
                            width: 14, height: 14, borderRadius: 4,
                            background: s.fg,
                            boxShadow: `0 0 0 3px ${s.bg}`,
                          }}
                        />
                        <div
                          style={{
                            display: "inline-flex", alignItems: "center",
                            gap: 6, padding: "3px 8px", borderRadius: 6,
                            background: s.bg, border: `1px solid ${s.border}`,
                            color: s.fg, fontSize: 11, fontFamily: monoFont,
                            fontWeight: 600,
                          }}
                        >
                          {ev.chunkIndex !== undefined ? (
                            <span style={{ opacity: 0.75, fontWeight: 700 }}>
                              #{ev.chunkIndex}
                            </span>
                          ) : null}
                          <span>{ev.type}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    padding: "8px 12px",
                    borderTop: `1px solid ${colors.softBorder}`,
                    background: colors.panel,
                    display: "flex", flexDirection: "column", gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 8,
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px", borderRadius: 999,
                        background: tone.bg, color: tone.fg,
                        fontSize: 10.5, fontWeight: 700,
                        fontFamily: monoFont,
                        animation:
                          status.tone === "active" && !reduceMotion.current
                            ? "spl-pulse 1.4s ease-in-out infinite"
                            : "none",
                      }}
                    >
                      {localized(lang, status.en, status.zh)}
                    </span>
                    <span
                      style={{
                        fontSize: 10, color: colors.textMuted,
                        fontFamily: monoFont,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {chunkCount} / {totalChunkSlots}{" "}
                      {lang === "zh" ? "片" : "chunks"}
                    </span>
                  </div>
                  {errorOn ? (
                    <div
                      style={{
                        fontSize: 10.5, color: colors.textMuted,
                        lineHeight: 1.45,
                      }}
                    >
                      <strong style={{ color: colors.warning }}>
                        {lang === "zh" ? "恢复策略：" : "Recovery: "}
                      </strong>
                      {localized(lang, lane.enRecovery, lane.zhRecovery)}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: 10, background: colors.background,
            border: `1px solid ${colors.softBorder}`, borderRadius: 9,
            display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 11, fontWeight: 700, color: colors.textMuted,
              fontFamily: monoFont, marginRight: 4,
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >
            {lang === "zh" ? "事件类型" : "Event types"}
          </span>
          {legendTypes.map((type) => {
            const s = eventStyle(type);
            return (
              <span
                key={type}
                style={{
                  padding: "2px 8px", borderRadius: 999,
                  background: s.bg, border: `1px solid ${s.border}`,
                  color: s.fg, fontFamily: monoFont,
                  fontSize: 10.5, fontWeight: 600,
                }}
              >
                {type}
              </span>
            );
          })}
        </div>

        <div
          style={{
            border: `1px solid ${colors.softBorder}`, borderRadius: 10,
            overflow: "auto", background: colors.panel,
          }}
        >
          <table
            style={{
              width: "100%", borderCollapse: "collapse",
              fontSize: 12, fontFamily: monoFont,
            }}
          >
            <thead>
              <tr style={{ background: colors.background }}>
                <th style={th(colors)}>{lang === "zh" ? "维度" : "Dimension"}</th>
                {lanes.map((lane) => (
                  <th key={lane.key} style={th(colors)}>
                    {localized(lang, lane.enLabel, lane.zhLabel)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dim, rowIndex) => (
                <tr
                  key={dim.key}
                  style={{
                    background:
                      rowIndex % 2 === 0 ? colors.panel : colors.background,
                  }}
                >
                  <td style={{ ...td(colors), fontWeight: 700, color: colors.text }}>
                    {localized(lang, dim.enLabel, dim.zhLabel)}
                  </td>
                  {lanes.map((lane) => (
                    <td key={lane.key} style={td(colors)}>
                      {localized(lang, dim.cells[lane.key].en, dim.cells[lane.key].zh)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InteractiveFigure>
  );
}

function th(c: Palette): React.CSSProperties {
  return {
    padding: "8px 10px", textAlign: "left", color: c.textMuted,
    fontWeight: 700, fontSize: 11, letterSpacing: "0.04em",
    textTransform: "uppercase",
    borderBottom: `1px solid ${c.softBorder}`,
  };
}

function td(c: Palette): React.CSSProperties {
  return {
    padding: "8px 10px", color: c.text,
    borderBottom: `1px solid ${c.softBorder}`,
    verticalAlign: "top", lineHeight: 1.5,
  };
}
