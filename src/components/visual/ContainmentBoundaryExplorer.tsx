import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type RingKey = "process" | "sandbox" | "capability" | "approval" | "tool";
type ProfileKey = "read-only" | "workspace-write" | "danger-full-access";
type ColorKey = "info" | "success" | "warning" | "accent" | "accentMuted";
type Tone = "success" | "warning" | "info";

interface RingDef {
  key: RingKey;
  enLabel: string;
  zhLabel: string;
  enShort: string;
  zhShort: string;
  enGrants: string;
  zhGrants: string;
  enDenies: string;
  zhDenies: string;
  enBypass: string;
  zhBypass: string;
  colorKey: ColorKey;
}

// Rings are listed outermost first; the order also drives the side list.
const rings: RingDef[] = [
  {
    key: "process",
    enLabel: "Process boundary",
    zhLabel: "进程边界",
    enShort: "PID isolation, working dir",
    zhShort: "PID 隔离与工作目录",
    enGrants:
      "OS-level PID isolation; private process tree rooted at the working dir.",
    zhGrants: "操作系统层面的 PID 隔离；以工作目录为根的私有进程树。",
    enDenies: "Signaling, ptracing or reading other users' processes.",
    zhDenies: "向其他用户的进程发信号、ptrace 或读取其内存。",
    enBypass:
      "Spawning a subprocess inherits the same boundary; never weaker.",
    zhBypass: "派生子进程会继承相同的边界，且不会更弱。",
    colorKey: "info",
  },
  {
    key: "sandbox",
    enLabel: "Sandbox profile",
    zhLabel: "沙箱 profile",
    enShort: "seatbelt / landlock / docker",
    zhShort: "seatbelt / landlock / docker",
    enGrants:
      "Default-deny syscalls outside an allowlist (seatbelt on macOS, landlock on Linux, docker for portable confinement).",
    zhGrants:
      "在允许列表之外默认拒绝系统调用（macOS 用 seatbelt、Linux 用 landlock、跨平台用 docker）。",
    enDenies:
      "Reads outside the working dir, arbitrary network egress, raw devices.",
    zhDenies: "工作目录之外的读取、任意网络出站与裸设备访问。",
    enBypass:
      "Profile danger-full-access disables the sandbox entirely — use sparingly.",
    zhBypass: "profile danger-full-access 会完全关闭沙箱 — 谨慎使用。",
    colorKey: "success",
  },
  {
    key: "capability",
    enLabel: "Capability set",
    zhLabel: "能力集合",
    enShort: "filesystem, network, devices",
    zhShort: "文件系统、网络、设备",
    enGrants:
      "Coarse-grained allowlists per resource class: filesystem paths, network egress, device nodes.",
    zhGrants:
      "按资源类别给出的粗粒度白名单：文件系统路径、网络出站、设备节点。",
    enDenies:
      "Anything outside the set; e.g. no network when --network is absent.",
    zhDenies: "集合之外的一切访问；例如未指定 --network 时禁止联网。",
    enBypass: "An approval can temporarily widen one capability for one call.",
    zhBypass: "通过 approval 可以为单次调用临时扩展某一项能力。",
    colorKey: "warning",
  },
  {
    key: "approval",
    enLabel: "Approval policy",
    zhLabel: "approval 策略",
    enShort: "ask / deny / trust",
    zhShort: "ask / deny / trust",
    enGrants: "Per-call user gate: ask, allow-once, deny, trust-this-tool.",
    zhGrants: "针对每次调用的用户关卡：ask、allow-once、deny、trust-this-tool。",
    enDenies: "Side effects without explicit user (or policy) consent.",
    zhDenies: "在用户（或策略）未明确同意前的副作用。",
    enBypass: "Trusted tools record the decision and skip future prompts.",
    zhBypass: "trusted 工具会记录该决定，后续不再弹出提示。",
    colorKey: "accent",
  },
  {
    key: "tool",
    enLabel: "Tool surface",
    zhLabel: "工具表面",
    enShort: "allowed tools list",
    zhShort: "允许的工具列表",
    enGrants:
      "Final list of tools the model is permitted to call this session.",
    zhGrants: "本次会话中模型可以调用的最终工具列表。",
    enDenies: "Tools not registered are unreachable, regardless of approvals.",
    zhDenies: "未注册的工具不可达，无论 approval 如何。",
    enBypass: "None — the surface is the last gate before the model speaks.",
    zhBypass: "无 — surface 是模型发声之前的最后一道关卡。",
    colorKey: "accentMuted",
  },
];

interface ProfileDef {
  key: ProfileKey;
  enLabel: string;
  zhLabel: string;
  enHint: string;
  zhHint: string;
  // Ring radii, same order as `rings` (outermost first).
  radii: [number, number, number, number, number];
}

// Outer process boundary stays nearly fixed; inner rings grow as the
// profile becomes more permissive.
const profiles: ProfileDef[] = [
  {
    key: "read-only",
    enLabel: "read-only viewing",
    zhLabel: "只读查看",
    enHint: "Inspect files; no writes, no network.",
    zhHint: "只读查看文件；不写入、不联网。",
    radii: [170, 122, 82, 50, 26],
  },
  {
    key: "workspace-write",
    enLabel: "workspace-write",
    zhLabel: "workspace-write",
    enHint: "Write within the working dir; ask before network.",
    zhHint: "在工作目录内可写；联网前需要 approval。",
    radii: [170, 140, 108, 78, 52],
  },
  {
    key: "danger-full-access",
    enLabel: "danger-full-access",
    zhLabel: "danger-full-access",
    enHint: "All gates relaxed. Use only in trusted environments.",
    zhHint: "所有关卡都放宽；仅在受信任的环境中使用。",
    radii: [170, 158, 144, 128, 112],
  },
];

const SVG_SIZE = 400;
const CENTER = SVG_SIZE / 2;

export default function ContainmentBoundaryExplorer({
  lang,
}: {
  lang: Lang;
}) {
  const mode = useThemeMode();
  const colors = palette[mode];

  const [profile, setProfile] = useState<ProfileKey>("workspace-write");
  const [selected, setSelected] = useState<RingKey>("sandbox");

  const activeProfile = profiles.find((p) => p.key === profile)!;
  const selectedRing = rings.find((r) => r.key === selected)!;
  const selectedColor = colors[selectedRing.colorKey];

  const ringWithRadii = useMemo(
    () =>
      rings.map((ring, idx) => ({
        ...ring,
        radius: activeProfile.radii[idx],
      })),
    [activeProfile],
  );

  const detailCells: Array<{ tone: Tone; en: string; zh: string; body: string }> = [
    { tone: "success", en: "Grants", zh: "授予",
      body: localized(lang, selectedRing.enGrants, selectedRing.zhGrants) },
    { tone: "warning", en: "Denies", zh: "拒绝",
      body: localized(lang, selectedRing.enDenies, selectedRing.zhDenies) },
    { tone: "info", en: "Bypass", zh: "绕过",
      body: localized(lang, selectedRing.enBypass, selectedRing.zhBypass) },
  ];

  return (
    <InteractiveFigure
      lang={lang}
      title="Concentric containment rings"
      zhTitle="同心的限制圈"
      subtitle="Click a ring to see what it grants, denies and how it can be bypassed. Switch profiles to watch the inner rings grow or shrink."
      zhSubtitle="点击任意一圈，看它授予什么、拒绝什么，以及是否存在绕过手段。切换 profile，观察内圈如何放大或收缩。"
      caption="Each ring is independent — Codex never collapses them into a single switch. A subprocess inherits process+sandbox; capability and approval are evaluated per call."
      zhCaption="每一圈都是独立的 — Codex 不会把它们折叠成一个总开关。子进程继承 process 与 sandbox，capability 与 approval 则在每次调用时单独判定。"
      badge="Chapter 13"
      zhBadge="第 13 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Profile picker. */}
        <div
          style={{
            display: "flex", flexDirection: "column", gap: 8, padding: 10,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {lang === "zh" ? "Preset profile / 预设 profile" : "Preset profile"}
          </div>
          <div
            role="radiogroup"
            aria-label={lang === "zh" ? "预设 profile" : "Preset profile"}
            style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
          >
            {profiles.map((p) => {
              const isActive = profile === p.key;
              return (
                <button
                  key={p.key}
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setProfile(p.key)}
                  style={{
                    padding: "6px 12px", borderRadius: 999,
                    border: `1.5px solid ${
                      isActive ? colors.accent : colors.softBorder
                    }`,
                    background: isActive ? colors.accentSoft : colors.panel,
                    color: isActive ? colors.accent : colors.text,
                    fontFamily: "var(--font-mono)", fontSize: 11.5,
                    fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {localized(lang, p.enLabel, p.zhLabel)}
                </button>
              );
            })}
          </div>
          <p
            style={{
              margin: 0, fontSize: 11.5, color: colors.textMuted,
              lineHeight: 1.5,
            }}
          >
            {localized(lang, activeProfile.enHint, activeProfile.zhHint)}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 14,
          }}
        >
          {/* Concentric rings SVG. */}
          <div
            style={{
              border: `1px solid ${colors.softBorder}`, borderRadius: 12,
              background: colors.background, padding: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              role="img"
              aria-label={
                lang === "zh"
                  ? "同心限制圈示意图"
                  : "Concentric containment rings diagram"
              }
              style={{ width: "100%", maxWidth: 360, height: "auto" }}
            >
              <defs>
                <pattern
                  id="cbe-grid" width="20" height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20" fill="none"
                    stroke={colors.grid} strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                x={0} y={0} width={SVG_SIZE} height={SVG_SIZE}
                fill="url(#cbe-grid)" opacity={0.45}
              />
              {ringWithRadii.map((ring, idx) => {
                const isSelected = selected === ring.key;
                const ringColor = colors[ring.colorKey];
                return (
                  <g
                    key={ring.key}
                    onClick={() => setSelected(ring.key)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={CENTER} cy={CENTER} r={ring.radius}
                      fill={isSelected ? colors.accentSoft : "transparent"}
                      stroke={ringColor}
                      strokeWidth={isSelected ? 3 : 1.6}
                      style={{
                        transition:
                          "r 0.45s ease, stroke-width 0.2s ease, fill 0.2s ease",
                        filter: isSelected
                          ? `drop-shadow(0 0 6px ${ringColor})`
                          : "none",
                      }}
                    />
                    <circle
                      cx={CENTER} cy={CENTER - ring.radius} r={9}
                      fill={colors.background} stroke={ringColor}
                      strokeWidth={isSelected ? 2 : 1.4}
                      style={{ transition: "cy 0.45s ease" }}
                    />
                    <text
                      x={CENTER} y={CENTER - ring.radius + 3.5}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 10,
                        fontWeight: 700, fill: ringColor,
                        transition: "y 0.45s ease",
                      }}
                    >
                      {idx + 1}
                    </text>
                  </g>
                );
              })}
              <circle cx={CENTER} cy={CENTER} r={6} fill={colors.accent} />
              <text
                x={CENTER} y={CENTER + 22} textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  fontWeight: 700, fill: colors.text,
                }}
              >
                {lang === "zh" ? "模型" : "model"}
              </text>
            </svg>
          </div>

          {/* Ring list buttons. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ringWithRadii.map((ring, idx) => {
              const isSelected = selected === ring.key;
              const ringColor = colors[ring.colorKey];
              return (
                <button
                  key={ring.key}
                  onClick={() => setSelected(ring.key)}
                  aria-pressed={isSelected}
                  style={{
                    textAlign: "left", padding: "8px 10px", borderRadius: 9,
                    border: `1.5px solid ${
                      isSelected ? ringColor : colors.softBorder
                    }`,
                    background: isSelected ? colors.accentSoft : colors.panel,
                    color: colors.text, cursor: "pointer", display: "grid",
                    gridTemplateColumns: "22px 1fr", columnGap: 10,
                    alignItems: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: ringColor, color: "#fff",
                      fontFamily: "var(--font-mono)", fontSize: 11,
                      fontWeight: 700, display: "flex",
                      alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span
                      style={{
                        fontWeight: 700, fontSize: 12.5,
                        color: isSelected ? ringColor : colors.text,
                      }}
                    >
                      {localized(lang, ring.enLabel, ring.zhLabel)}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 10.5,
                        color: colors.textMuted, lineHeight: 1.4,
                      }}
                    >
                      {localized(lang, ring.enShort, ring.zhShort)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected ring detail panel. */}
        <div
          style={{
            border: `1px solid ${colors.softBorder}`, borderRadius: 11,
            background: colors.panel, overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "8px 12px", background: colors.background,
              borderBottom: `1px solid ${colors.softBorder}`,
              display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 10, height: 10, borderRadius: "50%",
                background: selectedColor, display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: selectedColor,
              }}
            >
              {lang === "zh" ? "选中 ring" : "Selected ring"}
            </span>
            <span style={{ fontWeight: 700, fontSize: 13, color: colors.text }}>
              {localized(lang, selectedRing.enLabel, selectedRing.zhLabel)}
            </span>
            <span
              style={{
                fontSize: 11.5, color: colors.textMuted,
                fontFamily: "var(--font-mono)",
              }}
            >
              ({localized(lang, selectedRing.enShort, selectedRing.zhShort)})
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
              gap: 1, background: colors.softBorder,
            }}
          >
            {detailCells.map((cell) => {
              const toneColor = colors[cell.tone];
              const toneSoft = colors[
                (cell.tone + "Soft") as "successSoft"
              ];
              return (
                <div
                  key={cell.tone}
                  style={{
                    background: colors.panel, padding: "10px 12px",
                    display: "flex", flexDirection: "column", gap: 6,
                    minHeight: 110,
                  }}
                >
                  <span
                    style={{
                      alignSelf: "flex-start",
                      fontFamily: "var(--font-mono)", fontSize: 10.5,
                      fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", color: toneColor,
                      background: toneSoft,
                      border: `1px solid ${toneColor}55`,
                      borderRadius: 6, padding: "2px 7px",
                    }}
                  >
                    {cell.en} <span style={{ opacity: 0.55 }}>/ {cell.zh}</span>
                  </span>
                  <p
                    style={{
                      margin: 0, fontSize: 12.5, color: colors.text,
                      lineHeight: 1.55,
                    }}
                  >
                    {cell.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}
