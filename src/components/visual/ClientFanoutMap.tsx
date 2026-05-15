import React, { useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type SurfaceKey = "tui" | "exec" | "appserver" | "sdk";

interface SurfaceFacts {
  tokenUsage: boolean;
  modelLabel: boolean;
  toolPlan: boolean;
  warningBanner: boolean;
  rawTranscript: boolean;
  approvalQueue: boolean;
  sandboxBadge: boolean;
}

interface SurfaceConfig {
  key: SurfaceKey;
  enLabel: string;
  zhLabel: string;
  enRole: string;
  zhRole: string;
  facts: SurfaceFacts;
}

const surfaces: SurfaceConfig[] = [
  {
    key: "tui",
    enLabel: "TUI",
    zhLabel: "TUI",
    enRole: "Interactive terminal session.",
    zhRole: "交互式终端会话。",
    facts: {
      tokenUsage: true,
      modelLabel: true,
      toolPlan: true,
      warningBanner: true,
      rawTranscript: false,
      approvalQueue: true,
      sandboxBadge: true,
    },
  },
  {
    key: "exec",
    enLabel: "exec (headless)",
    zhLabel: "exec（headless）",
    enRole: "Single-shot CLI for automation.",
    zhRole: "用于自动化的单次 CLI 执行。",
    facts: {
      tokenUsage: false,
      modelLabel: false,
      toolPlan: false,
      warningBanner: true,
      rawTranscript: true,
      approvalQueue: false,
      sandboxBadge: false,
    },
  },
  {
    key: "appserver",
    enLabel: "app-server",
    zhLabel: "app-server",
    enRole: "Multiplexed daemon for IDEs and apps.",
    zhRole: "服务于 IDE 和应用的多路复用守护进程。",
    facts: {
      tokenUsage: true,
      modelLabel: true,
      toolPlan: true,
      warningBanner: true,
      rawTranscript: true,
      approvalQueue: true,
      sandboxBadge: true,
    },
  },
  {
    key: "sdk",
    enLabel: "SDK",
    zhLabel: "SDK",
    enRole: "Programmatic access via channels.",
    zhRole: "通过 channel 提供的编程式访问。",
    facts: {
      tokenUsage: true,
      modelLabel: true,
      toolPlan: false,
      warningBanner: true,
      rawTranscript: false,
      approvalQueue: false,
      sandboxBadge: true,
    },
  },
];

const factLabels: Array<{
  key: keyof SurfaceFacts;
  enLabel: string;
  zhLabel: string;
  enWhy: string;
  zhWhy: string;
}> = [
  {
    key: "tokenUsage",
    enLabel: "Token usage",
    zhLabel: "Token 使用量",
    enWhy: "Read-only projection of usage counters.",
    zhWhy: "用量计数器的只读投影。",
  },
  {
    key: "modelLabel",
    enLabel: "Active model label",
    zhLabel: "当前模型标签",
    enWhy: "Surfaces which provider is in use.",
    zhWhy: "显示当前使用的 provider。",
  },
  {
    key: "toolPlan",
    enLabel: "Tool plan preview",
    zhLabel: "Tool 计划预览",
    enWhy: "Lets the user inspect upcoming actions.",
    zhWhy: "让用户在执行前查看后续操作。",
  },
  {
    key: "warningBanner",
    enLabel: "Warning banners",
    zhLabel: "警告横幅",
    enWhy: "Non-fatal runtime warnings (token, sandbox, approvals).",
    zhWhy: "非致命的运行时警告（token、sandbox、approval）。",
  },
  {
    key: "rawTranscript",
    enLabel: "Raw transcript",
    zhLabel: "原始 transcript",
    enWhy: "Full payload for scripting/automation.",
    zhWhy: "完整 payload，便于脚本/自动化使用。",
  },
  {
    key: "approvalQueue",
    enLabel: "Approval queue",
    zhLabel: "Approval 队列",
    enWhy: "Pending tool requests awaiting consent.",
    zhWhy: "等待用户同意的工具请求队列。",
  },
  {
    key: "sandboxBadge",
    enLabel: "Sandbox badge",
    zhLabel: "Sandbox 徽章",
    enWhy: "Visual signal of current execution authority.",
    zhWhy: "当前执行权限的视觉提示。",
  },
];

interface Props {
  lang: Lang;
}

export default function ClientFanoutMap({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [active, setActive] = useState<SurfaceKey>("tui");
  const surface = surfaces.find((entry) => entry.key === active)!;

  return (
    <InteractiveFigure
      lang={lang}
      title="One runtime, many client projections"
      zhTitle="一个 runtime，多种客户端投影"
      subtitle="Pick a surface to see which runtime facts it projects. The runtime never lets the surface mutate state."
      zhSubtitle="选择一个 surface，看它会投影哪些 runtime 事实。runtime 从不允许 surface 直接改写状态。"
      caption="Each surface is a read-only projection. To change runtime state a client must submit a typed Op back through the protocol."
      zhCaption="每个 surface 都是只读投影；客户端要修改 runtime 状态，必须通过协议发送 typed Op。"
      badge="Chapter 8"
      zhBadge="第 8 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {surfaces.map((entry) => {
            const isActive = active === entry.key;
            return (
              <button
                key={entry.key}
                onClick={() => setActive(entry.key)}
                aria-pressed={isActive}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1.5px solid ${
                    isActive ? colors.accent : colors.softBorder
                  }`,
                  background: isActive ? colors.accentSoft : colors.panel,
                  color: colors.text,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? colors.accent : colors.text,
                  }}
                >
                  {localized(lang, entry.enLabel, entry.zhLabel)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: colors.textMuted,
                    lineHeight: 1.45,
                  }}
                >
                  {localized(lang, entry.enRole, entry.zhRole)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
            background: colors.background,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {localized(lang, "Projected facts", "投影的事实")}:{" "}
            {localized(lang, surface.enLabel, surface.zhLabel)}
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {factLabels.map((fact) => {
              const visible = surface.facts[fact.key];
              return (
                <li
                  key={fact.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 1fr",
                    gap: 8,
                    padding: "6px 8px",
                    borderRadius: 7,
                    background: visible
                      ? colors.successSoft
                      : mode === "light"
                      ? "#fdfaf2"
                      : "#1f1f1d",
                    border: `1px solid ${
                      visible ? colors.success + "55" : colors.softBorder
                    }`,
                    color: visible ? colors.text : colors.textMuted,
                    opacity: visible ? 1 : 0.6,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: visible ? colors.success : colors.textMuted,
                    }}
                  >
                    {visible ? "✓" : "—"}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600, fontSize: 12.5 }}>
                      {localized(lang, fact.enLabel, fact.zhLabel)}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: colors.textMuted,
                        lineHeight: 1.4,
                      }}
                    >
                      {localized(lang, fact.enWhy, fact.zhWhy)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </InteractiveFigure>
  );
}
