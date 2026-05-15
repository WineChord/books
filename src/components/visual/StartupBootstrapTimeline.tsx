import React, { useEffect, useMemo, useRef, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type PhaseKey =
  | "parse_argv"
  | "resolve_config"
  | "init_state"
  | "route_to_subcommand"
  | "bootstrap_session"
  | "ready_for_input";

type PhaseStatus = "ran" | "skipped" | "short";

interface PhaseDef {
  key: PhaseKey;
  enLabel: string;
  zhLabel: string;
  ms: number;
  files: string[];
  envVars: string[];
  enState: string;
  zhState: string;
  enFeatures: string;
  zhFeatures: string;
}

const PHASES: PhaseDef[] = [
  {
    key: "parse_argv",
    enLabel: "parse argv",
    zhLabel: "解析 argv",
    ms: 4,
    files: ["cli/main.rs", "cli/args.rs"],
    envVars: ["CODEX_NO_COLOR", "NO_COLOR"],
    enState:
      "Builds typed CliArgs from process::args(); validation is deferred.",
    zhState: "从 process::args() 构建 CliArgs；语义校验延后到后续阶段。",
    enFeatures: "--help, --version, shell completion handshake.",
    zhFeatures: "--help、--version、shell 自动补全握手。",
  },
  {
    key: "resolve_config",
    enLabel: "resolve config",
    zhLabel: "解析配置",
    ms: 18,
    files: [
      "config/loader.rs",
      "~/.codex/config.toml",
      "./.codex/config.toml",
    ],
    envVars: ["CODEX_HOME", "OPENAI_API_KEY", "CODEX_MODEL"],
    enState:
      "Layered config: defaults < user file < repo file < env < CLI flag.",
    zhState: "分层配置：defaults < 用户文件 < 仓库文件 < env < CLI flag。",
    enFeatures: "Provider selection, sandbox profile, log level, model default.",
    zhFeatures: "Provider 选择、sandbox profile、log 等级、默认模型。",
  },
  {
    key: "init_state",
    enLabel: "init state",
    zhLabel: "初始化状态",
    ms: 32,
    files: ["state/auth.rs", "state/session_dir.rs", "~/.codex/auth.json"],
    envVars: ["CODEX_HOME", "OPENAI_API_KEY"],
    enState:
      "Loads auth token, creates rollout dir, registers signal handlers.",
    zhState: "加载 auth token、创建 rollout 目录、注册信号处理函数。",
    enFeatures: "Telemetry opt-in, crash reporter, session_dir file lock.",
    zhFeatures: "Telemetry 开关、崩溃上报、session_dir 文件锁。",
  },
  {
    key: "route_to_subcommand",
    enLabel: "route subcommand",
    zhLabel: "路由子命令",
    ms: 1,
    files: ["cli/dispatch.rs"],
    envVars: [],
    enState:
      "Match on CliArgs::command; dispatch to one subcommand module.",
    zhState: "匹配 CliArgs::command，分发到对应的子命令模块。",
    enFeatures: "New commands extend this match arm; help text auto-derives.",
    zhFeatures: "新增命令只需扩展该 match 分支；help 文本自动派生。",
  },
  {
    key: "bootstrap_session",
    enLabel: "bootstrap session",
    zhLabel: "启动 session",
    ms: 60,
    files: [
      "session/builder.rs",
      "session/turn_context.rs",
      "tools/registry.rs",
      "memory/loader.rs",
    ],
    envVars: ["CODEX_SANDBOX", "CODEX_PROFILE"],
    enState:
      "Builds TurnContext, opens rollout writer, warms tool registry & memory.",
    zhState:
      "构造 TurnContext，打开 rollout writer，预热 tool registry 与 memory。",
    enFeatures: "Skills discovery, plugin hooks, MCP client warm-up.",
    zhFeatures: "Skills 发现、plugin hook、MCP client 预热。",
  },
  {
    key: "ready_for_input",
    enLabel: "ready for input",
    zhLabel: "准备接收输入",
    ms: 0,
    files: ["ui/repl.rs", "ui/print.rs", "server/socket.rs"],
    envVars: ["CODEX_NO_TTY"],
    enState:
      "Drains startup queue, hands control to the input loop (REPL / stdin / socket).",
    zhState: "排空启动队列，把控制权交给输入循环（REPL / stdin / socket）。",
    enFeatures: "Resumable rollouts, paste-friendly prompt, keybinding overlay.",
    zhFeatures: "可恢复的 rollout、粘贴友好的 prompt、键位提示层。",
  },
];

const TOTAL_MS = PHASES.reduce((sum, phase) => sum + phase.ms, 0);

type ModeKey = "repl" | "exec" | "login" | "apply-patch" | "serve";

interface ModeDef {
  key: ModeKey;
  cmd: string;
  enHint: string;
  zhHint: string;
  status: Record<PhaseKey, PhaseStatus>;
  enNote: string;
  zhNote: string;
}

const MODES: ModeDef[] = [
  {
    key: "repl",
    cmd: "codex repl",
    enHint: "Interactive shell",
    zhHint: "交互式 shell",
    status: {
      parse_argv: "ran",
      resolve_config: "ran",
      init_state: "ran",
      route_to_subcommand: "ran",
      bootstrap_session: "ran",
      ready_for_input: "ran",
    },
    enNote:
      "All six phases execute; ready_for_input enters the TUI input loop.",
    zhNote: "六个阶段全部执行；ready_for_input 进入 TUI 输入循环。",
  },
  {
    key: "exec",
    cmd: 'codex exec --print "summarize"',
    enHint: "One-shot, no REPL",
    zhHint: "一次性执行，不进入 REPL",
    status: {
      parse_argv: "ran",
      resolve_config: "ran",
      init_state: "ran",
      route_to_subcommand: "ran",
      bootstrap_session: "ran",
      ready_for_input: "short",
    },
    enNote:
      "Bootstrap still runs; ready_for_input short-circuits after the single turn is printed.",
    zhNote:
      "bootstrap 仍会执行；ready_for_input 在打印完单次 turn 后立即短路退出。",
  },
  {
    key: "login",
    cmd: "codex login",
    enHint: "Auth handshake only",
    zhHint: "仅做 auth 握手",
    status: {
      parse_argv: "ran",
      resolve_config: "ran",
      init_state: "short",
      route_to_subcommand: "ran",
      bootstrap_session: "skipped",
      ready_for_input: "skipped",
    },
    enNote:
      "init_state stops after auth.json is written; no session is built and no input loop is started.",
    zhNote:
      "init_state 在写入 auth.json 后短路；不构建 session，也不进入输入循环。",
  },
  {
    key: "apply-patch",
    cmd: "codex apply-patch patch.diff",
    enHint: "Filesystem-only utility",
    zhHint: "纯文件系统工具",
    status: {
      parse_argv: "ran",
      resolve_config: "short",
      init_state: "skipped",
      route_to_subcommand: "ran",
      bootstrap_session: "skipped",
      ready_for_input: "skipped",
    },
    enNote:
      "Only sandbox profile is read from config; the patch tool runs without auth, session, or REPL.",
    zhNote:
      "只从 config 读取 sandbox profile；patch 工具不需要 auth、session 或 REPL。",
  },
  {
    key: "serve",
    cmd: "codex serve --app-server",
    enHint: "Long-lived RPC server",
    zhHint: "常驻 RPC 服务",
    status: {
      parse_argv: "ran",
      resolve_config: "ran",
      init_state: "ran",
      route_to_subcommand: "ran",
      bootstrap_session: "ran",
      ready_for_input: "ran",
    },
    enNote:
      "bootstrap_session builds a server-side session pool; ready_for_input listens on a socket instead of stdin.",
    zhNote:
      "bootstrap_session 构建服务端 session 池；ready_for_input 在 socket 上监听而非 stdin。",
  },
];

const SVG_W = 900;
const SVG_H = 200;
const PAD_X = 56;
const NODE_R = 26;
const ROW_Y = 92;

interface Props {
  lang: Lang;
}

export default function StartupBootstrapTimeline({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [modeKey, setModeKey] = useState<ModeKey>("repl");
  const [selectedPhase, setSelectedPhase] = useState<PhaseKey>("parse_argv");
  const [playing, setPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState<number>(-1);
  const reduceMotion = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const handler = (event: MediaQueryListEvent) => {
      reduceMotion.current = event.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!playing) return;
    if (reduceMotion.current) {
      const last = PHASES.length - 1;
      setPlayIndex(last);
      setSelectedPhase(PHASES[last].key);
      setPlaying(false);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setPlayIndex((current) => {
        const next = current + 1;
        if (next >= PHASES.length) {
          setPlaying(false);
          return PHASES.length - 1;
        }
        setSelectedPhase(PHASES[next].key);
        return next;
      });
    }, 600);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing]);

  const currentMode = useMemo(
    () => MODES.find((m) => m.key === modeKey) ?? MODES[0],
    [modeKey],
  );
  const currentPhase = useMemo(
    () => PHASES.find((p) => p.key === selectedPhase) ?? PHASES[0],
    [selectedPhase],
  );
  const currentStatus = currentMode.status[currentPhase.key];

  const stepSpacing = (SVG_W - 2 * PAD_X) / (PHASES.length - 1);
  const nodeX = (index: number) => PAD_X + index * stepSpacing;

  const erroredStroke = mode === "light" ? "#dc2626" : "#fca5a5";
  const erroredFill =
    mode === "light"
      ? "rgba(220, 38, 38, 0.12)"
      : "rgba(252, 165, 165, 0.18)";

  const statusPalette = (status: PhaseStatus) => {
    if (status === "ran") {
      return { fill: colors.successSoft, stroke: colors.success };
    }
    if (status === "short") {
      return { fill: colors.warningSoft, stroke: colors.warning };
    }
    if (status === "errored") {
      return { fill: erroredFill, stroke: erroredStroke };
    }
    return { fill: colors.track, stroke: colors.textMuted };
  };

  const reachedMs = useMemo(() => {
    let sum = 0;
    PHASES.forEach((phase, index) => {
      const status = currentMode.status[phase.key];
      if (status === "skipped") return;
      if (playIndex < 0 || index <= playIndex) {
        sum += phase.ms;
      }
    });
    return sum;
  }, [currentMode, playIndex]);

  const budgetMs = useMemo(() => {
    let sum = 0;
    PHASES.forEach((phase) => {
      const status = currentMode.status[phase.key];
      if (status === "skipped") return;
      sum += phase.ms;
    });
    return sum;
  }, [currentMode]);

  const reset = () => {
    setPlaying(false);
    setPlayIndex(-1);
    setSelectedPhase(PHASES[0].key);
  };

  const stepOnce = () => {
    setPlaying(false);
    setPlayIndex((current) => {
      const next = Math.min(current + 1, PHASES.length - 1);
      setSelectedPhase(PHASES[next].key);
      return next;
    });
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (playIndex >= PHASES.length - 1) {
      setPlayIndex(-1);
      setSelectedPhase(PHASES[0].key);
    }
    setPlaying(true);
  };

  const statusLabel = (status: PhaseStatus): string => {
    if (status === "ran") return lang === "zh" ? "已执行" : "ran";
    if (status === "short") return lang === "zh" ? "短路" : "short-circuit";
    if (status === "errored") return lang === "zh" ? "出错" : "errored";
    return lang === "zh" ? "跳过" : "skipped";
  };

  return (
    <InteractiveFigure
      lang={lang}
      title="From argv to first turn"
      zhTitle="从 argv 到首个 turn"
      subtitle="Pick an entry mode, then play the boot timeline. Click any phase to see what it reads and mutates."
      zhSubtitle="选择一种入口模式，然后回放启动时间线；点击任一阶段即可查看它读取与改写的内容。"
      caption="115ms is the budget when every phase runs; short-circuited and skipped phases shave it down further, and an errored phase aborts the rest."
      zhCaption="六个阶段全部执行时预算约为 115ms；short-circuit 与 skipped 会进一步缩短，errored 则会中止后续阶段。"
      badge="Chapter 2"
      zhBadge="第 2 章"
    >
      <div
        role="tablist"
        aria-label={lang === "zh" ? "入口模式" : "Entry mode"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        {MODES.map((m) => {
          const active = m.key === modeKey;
          return (
            <button
              key={m.key}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setModeKey(m.key);
                setPlaying(false);
                setPlayIndex(-1);
              }}
              style={{
                background: active ? colors.accent : colors.panel,
                color: active ? "#fff" : colors.text,
                border: `1px solid ${active ? colors.accent : colors.border}`,
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{m.cmd}</span>
              <span
                style={{
                  fontSize: 10.5,
                  opacity: active ? 0.85 : 0.6,
                  fontWeight: 500,
                }}
              >
                · {localized(lang, m.enHint, m.zhHint)}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: colors.background,
          border: `1px solid ${colors.softBorder}`,
          borderRadius: 10,
          padding: 8,
        }}
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          role="img"
          aria-label={
            lang === "zh"
              ? "启动阶段时间线"
              : "Bootstrap phase timeline"
          }
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <line
            x1={PAD_X}
            y1={ROW_Y}
            x2={SVG_W - PAD_X}
            y2={ROW_Y}
            stroke={colors.grid}
            strokeWidth={2}
          />
          {PHASES.map((phase, index) => {
            const status = currentMode.status[phase.key];
            const isSelected = phase.key === selectedPhase;
            const isReached = playIndex < 0 || index <= playIndex;
            const isActive = playing && index === playIndex;
            const swatch = statusPalette(status);
            const cx = nodeX(index);
            return (
              <g key={phase.key}>
                {index > 0 ? (
                  <line
                    x1={nodeX(index - 1) + NODE_R}
                    y1={ROW_Y}
                    x2={cx - NODE_R}
                    y2={ROW_Y}
                    stroke={
                      status === "skipped" ? colors.textMuted : swatch.stroke
                    }
                    strokeWidth={2.5}
                    strokeDasharray={status === "skipped" ? "4 4" : undefined}
                    opacity={isReached ? 1 : 0.35}
                  />
                ) : null}
                {isActive ? (
                  <circle
                    cx={cx}
                    cy={ROW_Y}
                    r={NODE_R + 8}
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth={2}
                    opacity={0.55}
                  />
                ) : null}
                <circle
                  cx={cx}
                  cy={ROW_Y}
                  r={NODE_R}
                  fill={swatch.fill}
                  stroke={isSelected ? colors.accent : swatch.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                  opacity={isReached ? 1 : 0.4}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedPhase(phase.key)}
                />
                <text
                  x={cx}
                  y={ROW_Y + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={700}
                  fontFamily="var(--font-mono)"
                  fill={swatch.stroke}
                  style={{ pointerEvents: "none" }}
                >
                  {index + 1}
                </text>
                <text
                  x={cx}
                  y={ROW_Y - NODE_R - 12}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fill={colors.textMuted}
                >
                  {status === "skipped"
                    ? "—"
                    : `${phase.ms}ms${
                        status === "short"
                          ? "*"
                          : status === "errored"
                          ? "✕"
                          : ""
                      }`}
                </text>
                <text
                  x={cx}
                  y={ROW_Y + NODE_R + 22}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fontFamily="var(--font-mono)"
                  fill={colors.text}
                >
                  {localized(lang, phase.enLabel, phase.zhLabel)}
                </text>
                <text
                  x={cx}
                  y={ROW_Y + NODE_R + 38}
                  textAnchor="middle"
                  fontSize={10.5}
                  fontFamily="var(--font-mono)"
                  fill={swatch.stroke}
                >
                  {statusLabel(status)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {playing
            ? lang === "zh"
              ? "⏸ 暂停"
              : "⏸ Pause"
            : playIndex >= PHASES.length - 1
            ? lang === "zh"
              ? "↺ 重放"
              : "↺ Replay"
            : lang === "zh"
            ? "▶ 播放"
            : "▶ Play"}
        </button>
        <button
          onClick={stepOnce}
          disabled={playIndex >= PHASES.length - 1}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor:
              playIndex >= PHASES.length - 1 ? "not-allowed" : "pointer",
            opacity: playIndex >= PHASES.length - 1 ? 0.5 : 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "下一步" : "Step"}
        </button>
        <button
          onClick={reset}
          style={{
            background: colors.panel,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang === "zh" ? "重置" : "Reset"}
        </button>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: colors.textMuted,
          }}
        >
          <span>
            {lang === "zh" ? "进度" : "elapsed"}{" "}
            <strong style={{ color: colors.text }}>{reachedMs}ms</strong>
          </span>
          <span>
            {lang === "zh" ? "本模式预算" : "mode budget"}{" "}
            <strong style={{ color: colors.text }}>{budgetMs}ms</strong>
          </span>
          <span>
            {lang === "zh" ? "全量预算" : "full budget"}{" "}
            <strong style={{ color: colors.text }}>{TOTAL_MS}ms</strong>
          </span>
        </div>
      </div>

      <Legend lang={lang} colors={colors} mode={mode} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: 10,
          marginTop: 12,
        }}
      >
        <PhasePanel
          lang={lang}
          colors={colors}
          mode={mode}
          phase={currentPhase}
          status={currentStatus}
        />
        <ModeSummary lang={lang} colors={colors} mode={currentMode} />
      </div>
    </InteractiveFigure>
  );
}

function Legend({
  lang,
  colors,
  mode,
}: {
  lang: Lang;
  colors: (typeof palette)["light"];
  mode: "light" | "dark";
}) {
  const erroredStroke = mode === "light" ? "#dc2626" : "#fca5a5";
  const erroredFill =
    mode === "light"
      ? "rgba(220, 38, 38, 0.12)"
      : "rgba(252, 165, 165, 0.18)";
  const items: Array<{
    enLabel: string;
    zhLabel: string;
    fill: string;
    stroke: string;
    dashed?: boolean;
  }> = [
    {
      enLabel: "ran (full cost)",
      zhLabel: "已执行（完整开销）",
      fill: colors.successSoft,
      stroke: colors.success,
    },
    {
      enLabel: "short-circuited (partial)",
      zhLabel: "短路（部分开销）",
      fill: colors.warningSoft,
      stroke: colors.warning,
    },
    {
      enLabel: "errored (aborted mid-phase)",
      zhLabel: "出错（阶段中途中止）",
      fill: erroredFill,
      stroke: erroredStroke,
    },
    {
      enLabel: "skipped (no cost)",
      zhLabel: "跳过（无开销）",
      fill: colors.track,
      stroke: colors.textMuted,
      dashed: true,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: colors.textMuted,
      }}
    >
      {items.map((item) => (
        <span
          key={item.enLabel}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              borderRadius: 7,
              background: item.fill,
              border: `${item.dashed ? "1.5px dashed" : "2px solid"} ${
                item.stroke
              }`,
            }}
          />
          {localized(lang, item.enLabel, item.zhLabel)}
        </span>
      ))}
    </div>
  );
}

function PhasePanel({
  lang,
  colors,
  mode,
  phase,
  status,
}: {
  lang: Lang;
  colors: (typeof palette)["light"];
  mode: "light" | "dark";
  phase: PhaseDef;
  status: PhaseStatus;
}) {
  const erroredStroke = mode === "light" ? "#dc2626" : "#fca5a5";
  const statusTone =
    status === "ran"
      ? colors.success
      : status === "short"
      ? colors.warning
      : status === "errored"
      ? erroredStroke
      : colors.textMuted;
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        padding: 12,
        background: colors.background,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <strong
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: colors.text,
          }}
        >
          {localized(lang, phase.enLabel, phase.zhLabel)}
        </strong>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: statusTone,
            fontWeight: 700,
          }}
        >
          {status === "ran"
            ? lang === "zh"
              ? `已执行 · ${phase.ms}ms`
              : `ran · ${phase.ms}ms`
            : status === "short"
            ? lang === "zh"
              ? `短路 · ≤${phase.ms}ms`
              : `short-circuit · ≤${phase.ms}ms`
            : status === "errored"
            ? lang === "zh"
              ? `出错 · ≤${phase.ms}ms`
              : `errored · ≤${phase.ms}ms`
            : lang === "zh"
            ? "跳过 · 0ms"
            : "skipped · 0ms"}
        </span>
      </div>
      <PanelSection
        title={lang === "zh" ? "查看的文件" : "Files examined"}
        items={phase.files}
        colors={colors}
        emptyLabel={lang === "zh" ? "无" : "none"}
      />
      <PanelSection
        title={lang === "zh" ? "读取的环境变量" : "Env vars read"}
        items={phase.envVars}
        colors={colors}
        emptyLabel={lang === "zh" ? "无" : "none"}
      />
      <KeyVal
        label={lang === "zh" ? "改写的状态" : "State mutated"}
        value={localized(lang, phase.enState, phase.zhState)}
        colors={colors}
      />
      <KeyVal
        label={
          lang === "zh"
            ? "可协商的可选特性"
            : "Optional features negotiated"
        }
        value={localized(lang, phase.enFeatures, phase.zhFeatures)}
        colors={colors}
      />
    </div>
  );
}

function PanelSection({
  title,
  items,
  colors,
  emptyLabel,
}: {
  title: string;
  items: string[];
  colors: (typeof palette)["light"];
  emptyLabel: string;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.textMuted,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      {items.length === 0 ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: colors.textMuted,
            fontStyle: "italic",
          }}
        >
          {emptyLabel}
        </span>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {items.map((item) => (
            <code
              key={item}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                background: colors.accentSoft,
                color: colors.accentHover,
                border: `1px solid ${colors.accent}30`,
                borderRadius: 6,
                padding: "2px 6px",
              }}
            >
              {item}
            </code>
          ))}
        </div>
      )}
    </div>
  );
}

function KeyVal({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: (typeof palette)["light"];
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.textMuted,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          lineHeight: 1.55,
          color: colors.text,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function ModeSummary({
  lang,
  colors,
  mode,
}: {
  lang: Lang;
  colors: (typeof palette)["light"];
  mode: ModeDef;
}) {
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        padding: 12,
        background: colors.background,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.textMuted,
        }}
      >
        {lang === "zh" ? "当前入口" : "Current entry"}
      </div>
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          color: colors.accentHover,
          background: colors.accentSoft,
          border: `1px solid ${colors.accent}30`,
          borderRadius: 6,
          padding: "3px 7px",
          alignSelf: "flex-start",
        }}
      >
        {mode.cmd}
      </code>
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          lineHeight: 1.55,
          color: colors.text,
        }}
      >
        {localized(lang, mode.enNote, mode.zhNote)}
      </p>
    </div>
  );
}
