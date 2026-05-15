import React, { useEffect, useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type GateKey =
  | "pre-hook"
  | "policy"
  | "sandbox"
  | "guardian"
  | "user"
  | "post-hook";

type Verdict = "pass" | "defer" | "block" | "amend" | "skipped";

type Mode = "ask" | "trust-all";

type Outcome = "applied" | "escalated" | "blocked";

interface GateDef {
  key: GateKey;
  enLabel: string;
  zhLabel: string;
  enRole: string;
  zhRole: string;
}

interface Decision {
  verdict: Verdict;
  enWhy: string;
  zhWhy: string;
}

interface ModeRun {
  outcome: Outcome;
  decisions: Record<GateKey, Decision>;
}

interface ToolScenario {
  key: string;
  enLabel: string;
  zhLabel: string;
  enArg: string;
  zhArg: string;
  enHint: string;
  zhHint: string;
  ask: ModeRun;
  trustAll: ModeRun;
}

const gates: GateDef[] = [
  {
    key: "pre-hook",
    enLabel: "PreToolUse hook",
    zhLabel: "PreToolUse 钩子",
    enRole: "User-defined hook fires before any other gate.",
    zhRole: "用户自定义钩子最先触发。",
  },
  {
    key: "policy",
    enLabel: "Approval policy",
    zhLabel: "Approval 策略",
    enRole: "Mode picker: ask / trust-all / deny-all / bubble.",
    zhRole: "模式选择：ask / trust-all / deny-all / bubble。",
  },
  {
    key: "sandbox",
    enLabel: "Sandbox classifier",
    zhLabel: "Sandbox 分类器",
    enRole: "read-only / workspace-write / danger-full-access.",
    zhRole: "read-only / workspace-write / danger-full-access。",
  },
  {
    key: "guardian",
    enLabel: "Guardian review",
    zhLabel: "Guardian 审查",
    enRole: "LLM-side classifier blocks pattern-matched disasters.",
    zhRole: "LLM 侧分类器拦截高危模式。",
  },
  {
    key: "user",
    enLabel: "User approval prompt",
    zhLabel: "用户授权提示",
    enRole: "Interactive consent; bubbled to parent if no terminal.",
    zhRole: "交互式同意；若无终端则上抛至父级。",
  },
  {
    key: "post-hook",
    enLabel: "PostToolUse hook",
    zhLabel: "PostToolUse 钩子",
    enRole: "Last chance to amend the recorded result.",
    zhRole: "落盘前最后一次修改结果的机会。",
  },
];

const D = (verdict: Verdict, enWhy: string, zhWhy: string): Decision => ({
  verdict,
  enWhy,
  zhWhy,
});

const scenarios: ToolScenario[] = [
  {
    key: "read_file",
    enLabel: "read_file",
    zhLabel: "read_file",
    enArg: 'path = "src/codex.rs"',
    zhArg: 'path = "src/codex.rs"',
    enHint: "Light load — read-only calls clear every gate.",
    zhHint: "轻量调用 —— 只读请求一路放行。",
    ask: {
      outcome: "applied",
      decisions: {
        "pre-hook": D(
          "pass",
          "Hook config has no read interceptors.",
          "钩子配置未拦截读取。",
        ),
        policy: D(
          "pass",
          "Reads bypass user consent in every mode.",
          "任何模式下读取都跳过用户同意。",
        ),
        sandbox: D(
          "pass",
          "Classified read-only — safest tier.",
          "归类为 read-only —— 最安全的层级。",
        ),
        guardian: D(
          "pass",
          "No risky pattern detected.",
          "未检测到风险模式。",
        ),
        user: D(
          "pass",
          "Prompt skipped for read-only calls.",
          "只读调用跳过用户授权。",
        ),
        "post-hook": D(
          "pass",
          "Nothing to rewrite.",
          "无需改写结果。",
        ),
      },
    },
    trustAll: {
      outcome: "applied",
      decisions: {
        "pre-hook": D("pass", "Same hook config.", "钩子配置不变。"),
        policy: D(
          "pass",
          "trust-all subsumes the read auto-approve.",
          "trust-all 包含读取自动放行。",
        ),
        sandbox: D("pass", "read-only is unchanged.", "read-only 不受影响。"),
        guardian: D("pass", "Still benign.", "依然安全。"),
        user: D("pass", "Prompt skipped.", "跳过提示。"),
        "post-hook": D("pass", "No transform.", "无变换。"),
      },
    },
  },
  {
    key: "apply_patch",
    enLabel: "apply_patch",
    zhLabel: "apply_patch",
    enArg: 'patch = "--- a/foo\\n+++ b/foo\\n@@ ..."',
    zhArg: 'patch = "--- a/foo\\n+++ b/foo\\n@@ ..."',
    enHint: "Workspace write — needs user approval in ask mode.",
    zhHint: "工作区写入 —— ask 模式下需用户授权。",
    ask: {
      outcome: "applied",
      decisions: {
        "pre-hook": D(
          "pass",
          "No pre-hook intercepts patches.",
          "无前置钩子拦截 patch。",
        ),
        policy: D(
          "defer",
          "Writes require explicit consent in ask mode.",
          "ask 模式下写入需明确同意。",
        ),
        sandbox: D(
          "pass",
          "Workspace-write tier authorized for /repo.",
          "/repo 处于 workspace-write 授权范围内。",
        ),
        guardian: D(
          "pass",
          "Diff is scoped to one file.",
          "Diff 仅作用于单个文件。",
        ),
        user: D(
          "pass",
          "User accepted the diff preview.",
          "用户已接受 diff 预览。",
        ),
        "post-hook": D(
          "pass",
          "No PostToolUse transform configured.",
          "未配置 PostToolUse 变换。",
        ),
      },
    },
    trustAll: {
      outcome: "applied",
      decisions: {
        "pre-hook": D("pass", "Hook config unchanged.", "钩子配置不变。"),
        policy: D(
          "pass",
          "trust-all skips the consent step.",
          "trust-all 跳过同意环节。",
        ),
        sandbox: D(
          "pass",
          "Same workspace-write tier.",
          "仍然在 workspace-write 层级。",
        ),
        guardian: D("pass", "Still scoped.", "作用域不变。"),
        user: D(
          "pass",
          "Prompt suppressed — no user in the loop.",
          "提示被抑制 —— 不再询问用户。",
        ),
        "post-hook": D("pass", "Nothing to transform.", "无需变换。"),
      },
    },
  },
  {
    key: "shell_exec",
    enLabel: "shell_exec",
    zhLabel: "shell_exec",
    enArg: 'cmd = "cargo test -p codex"',
    zhArg: 'cmd = "cargo test -p codex"',
    enHint: "Sandboxed exec — PostToolUse trims noisy stdout.",
    zhHint: "受 sandbox 限制的 exec —— PostToolUse 会裁剪冗长输出。",
    ask: {
      outcome: "applied",
      decisions: {
        "pre-hook": D(
          "pass",
          "Hook is silent for cargo subcommands.",
          "钩子对 cargo 子命令未做响应。",
        ),
        policy: D(
          "defer",
          "Exec requires user consent in ask mode.",
          "ask 模式下 exec 需要用户同意。",
        ),
        sandbox: D(
          "defer",
          "Runs under workspace-write with network off.",
          "在 workspace-write 下运行，且关闭网络。",
        ),
        guardian: D(
          "pass",
          "No destructive flags spotted.",
          "未发现破坏性参数。",
        ),
        user: D(
          "pass",
          "User accepted the command preview.",
          "用户已接受命令预览。",
        ),
        "post-hook": D(
          "amend",
          "Stdout trimmed to last 2 KB; env vars redacted.",
          "stdout 截取最后 2 KB；脱敏环境变量。",
        ),
      },
    },
    trustAll: {
      outcome: "applied",
      decisions: {
        "pre-hook": D("pass", "Hook is silent.", "钩子保持静默。"),
        policy: D(
          "pass",
          "trust-all auto-approves exec.",
          "trust-all 自动放行 exec。",
        ),
        sandbox: D(
          "defer",
          "Still sandboxed — trust-all does not lift it.",
          "依然处于 sandbox —— trust-all 不会解除限制。",
        ),
        guardian: D("pass", "Same scan, same verdict.", "审查结果一致。"),
        user: D(
          "pass",
          "Prompt skipped — already pre-approved.",
          "已预批准 —— 跳过提示。",
        ),
        "post-hook": D(
          "amend",
          "Identical trim and redact step.",
          "执行同样的裁剪与脱敏。",
        ),
      },
    },
  },
  {
    key: "delete_file",
    enLabel: "delete_file",
    zhLabel: "delete_file",
    enArg: 'path = "src/legacy.rs"',
    zhArg: 'path = "src/legacy.rs"',
    enHint: "Destructive — ask mode bubbles up, trust-all consents.",
    zhHint: "破坏性操作 —— ask 模式上抛，trust-all 同意。",
    ask: {
      outcome: "escalated",
      decisions: {
        "pre-hook": D(
          "pass",
          "Hook records but does not block.",
          "钩子仅记录，不拦截。",
        ),
        policy: D(
          "block",
          "ask mode refuses destructive ops; bubbles to parent.",
          "ask 模式拒绝破坏性操作，并上抛父级。",
        ),
        sandbox: D("skipped", "Never reached.", "未到达。"),
        guardian: D("skipped", "Never reached.", "未到达。"),
        user: D("skipped", "Never reached.", "未到达。"),
        "post-hook": D("skipped", "Never reached.", "未到达。"),
      },
    },
    trustAll: {
      outcome: "applied",
      decisions: {
        "pre-hook": D("pass", "Hook only logs.", "钩子仅记录。"),
        policy: D(
          "pass",
          "trust-all explicitly consents to deletes.",
          "trust-all 已明示同意删除。",
        ),
        sandbox: D(
          "pass",
          "Workspace-write covers in-repo files.",
          "workspace-write 覆盖仓库内文件。",
        ),
        guardian: D(
          "pass",
          "Single-file delete clears the heuristics.",
          "单文件删除通过启发式检查。",
        ),
        user: D(
          "pass",
          "Prompt suppressed in trust-all.",
          "trust-all 下抑制提示。",
        ),
        "post-hook": D("pass", "Nothing to amend.", "无需修改。"),
      },
    },
  },
  {
    key: "rm_rf",
    enLabel: "rm -rf /repo",
    zhLabel: "rm -rf /repo",
    enArg: 'cmd = "rm -rf /repo"',
    zhArg: 'cmd = "rm -rf /repo"',
    enHint: "Catastrophic — Guardian fires even with trust-all on.",
    zhHint: "灾难性操作 —— 即便开启 trust-all，Guardian 仍会拦截。",
    ask: {
      outcome: "blocked",
      decisions: {
        "pre-hook": D(
          "pass",
          "User did not register an rm interceptor.",
          "用户未注册 rm 拦截器。",
        ),
        policy: D(
          "defer",
          "Would route to user prompt under ask mode.",
          "ask 模式下会交由用户裁决。",
        ),
        sandbox: D(
          "pass",
          "Path is inside the workspace tier.",
          "路径位于 workspace 层级内。",
        ),
        guardian: D(
          "block",
          "rm -rf rooted at /repo trips the disaster classifier.",
          "根目录 rm -rf 命中灾难性模式分类器。",
        ),
        user: D("skipped", "Never reached.", "未到达。"),
        "post-hook": D("skipped", "Never reached.", "未到达。"),
      },
    },
    trustAll: {
      outcome: "blocked",
      decisions: {
        "pre-hook": D(
          "pass",
          "No interceptor registered.",
          "未注册拦截器。",
        ),
        policy: D(
          "pass",
          "trust-all would auto-approve.",
          "trust-all 本会自动放行。",
        ),
        sandbox: D(
          "pass",
          "Workspace-write covers the path.",
          "workspace-write 覆盖该路径。",
        ),
        guardian: D(
          "block",
          "Guardian ignores trust-all for catastrophic patterns.",
          "Guardian 对灾难性模式不受 trust-all 影响。",
        ),
        user: D("skipped", "Never reached.", "未到达。"),
        "post-hook": D("skipped", "Never reached.", "未到达。"),
      },
    },
  },
];

interface VerdictStyle {
  glyph: string;
  fill: string;
  stroke: string;
  enLabel: string;
  zhLabel: string;
}

function verdictStyle(
  verdict: Verdict,
  mode: "light" | "dark",
  colors: typeof palette.light,
): VerdictStyle {
  switch (verdict) {
    case "pass":
      return {
        glyph: "✓",
        fill: colors.successSoft,
        stroke: colors.success,
        enLabel: "pass",
        zhLabel: "通过",
      };
    case "defer":
      return {
        glyph: "↻",
        fill: colors.warningSoft,
        stroke: colors.warning,
        enLabel: "defer",
        zhLabel: "延后",
      };
    case "block":
      return {
        glyph: "✕",
        fill: mode === "light" ? "#fee2e2" : "#3a1414",
        stroke: mode === "light" ? "#b91c1c" : "#fca5a5",
        enLabel: "block",
        zhLabel: "拦截",
      };
    case "amend":
      return {
        glyph: "✎",
        fill: mode === "light" ? "#ede9fe" : "#2d1b4d",
        stroke: mode === "light" ? "#7c3aed" : "#c4b5fd",
        enLabel: "amend",
        zhLabel: "改写",
      };
    case "skipped":
    default:
      return {
        glyph: "—",
        fill: colors.track,
        stroke: colors.textMuted,
        enLabel: "skipped",
        zhLabel: "跳过",
      };
  }
}

function outcomeStyle(
  outcome: Outcome,
  mode: "light" | "dark",
  colors: typeof palette.light,
) {
  if (outcome === "applied") {
    return {
      fill: colors.successSoft,
      stroke: colors.success,
      enLabel: "EFFECT APPLIED",
      zhLabel: "效果已落地",
    };
  }
  if (outcome === "escalated") {
    return {
      fill: colors.warningSoft,
      stroke: colors.warning,
      enLabel: "ESCALATED TO PARENT",
      zhLabel: "已上抛父级",
    };
  }
  return {
    fill: mode === "light" ? "#fee2e2" : "#3a1414",
    stroke: mode === "light" ? "#b91c1c" : "#fca5a5",
    enLabel: "BLOCKED",
    zhLabel: "已拦截",
  };
}

interface Props {
  lang: Lang;
}

export default function ApprovalLadder({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [scenarioKey, setScenarioKey] = useState<string>("apply_patch");
  const [policyMode, setPolicyMode] = useState<Mode>("ask");
  const [replayTick, setReplayTick] = useState(0);
  const [step, setStep] = useState<number>(gates.length);

  const scenario = useMemo(
    () => scenarios.find((entry) => entry.key === scenarioKey) ?? scenarios[0],
    [scenarioKey],
  );
  const run: ModeRun =
    policyMode === "ask" ? scenario.ask : scenario.trustAll;

  const terminalIndex = useMemo(() => {
    for (let i = 0; i < gates.length; i += 1) {
      if (run.decisions[gates[i].key].verdict === "block") {
        return i;
      }
    }
    return gates.length - 1;
  }, [run]);

  useEffect(() => {
    setStep(0);
    let current = 0;
    const last = terminalIndex + 1;
    const id = window.setInterval(() => {
      current += 1;
      setStep(current);
      if (current >= last) {
        window.clearInterval(id);
      }
    }, 650);
    return () => window.clearInterval(id);
  }, [scenarioKey, policyMode, replayTick, terminalIndex]);

  const finished = step >= terminalIndex + 1;

  return (
    <InteractiveFigure
      lang={lang}
      title="Six gates between intent and effect"
      zhTitle="意图与生效之间的六道闸门"
      subtitle="Pick a tool call and watch it descend the ladder. Each gate may pass, defer, block, or amend."
      zhSubtitle="选择一个工具调用，观察它沿闸门下落；每道闸门都可能放行、延后、拦截或改写。"
      caption="The model proposes; six independent gates dispose. Trust-all collapses some gates, but Guardian and the sandbox stay armed."
      zhCaption="模型只能提议，六道独立闸门才是裁决者；trust-all 会折叠部分闸门，但 Guardian 与 sandbox 仍然有效。"
      badge="Chapter 12"
      zhBadge="第 12 章"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 9,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {scenarios.map((entry) => {
              const active = entry.key === scenarioKey;
              return (
                <button
                  key={entry.key}
                  onClick={() => setScenarioKey(entry.key)}
                  aria-pressed={active}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: `1.5px solid ${
                      active ? colors.accent : colors.softBorder
                    }`,
                    background: active ? colors.accentSoft : colors.panel,
                    color: active ? colors.accent : colors.text,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {localized(lang, entry.enLabel, entry.zhLabel)}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.textMuted,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {lang === "zh" ? "策略模式" : "policy mode"}
            </span>
            {(["ask", "trust-all"] as Mode[]).map((option) => {
              const active = policyMode === option;
              return (
                <button
                  key={option}
                  onClick={() => setPolicyMode(option)}
                  aria-pressed={active}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 999,
                    border: `1.5px solid ${
                      active ? colors.accent : colors.softBorder
                    }`,
                    background: active ? colors.accent : colors.panel,
                    color: active ? colors.panel : colors.text,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    fontWeight: 700,
                  }}
                >
                  {option}
                </button>
              );
            })}
            <button
              onClick={() => setReplayTick((tick) => tick + 1)}
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                border: `1.5px solid ${colors.softBorder}`,
                background: colors.panel,
                color: colors.text,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                fontWeight: 600,
              }}
            >
              {lang === "zh" ? "重播" : "replay"}
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: colors.accent,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {lang === "zh" ? "提议的调用" : "proposed call"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: colors.text,
                padding: "8px 10px",
                background: colors.panel,
                border: `1px dashed ${colors.softBorder}`,
                borderRadius: 8,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <strong style={{ color: colors.accent }}>
                {localized(lang, scenario.enLabel, scenario.zhLabel)}
              </strong>
              {"("}
              {localized(lang, scenario.enArg, scenario.zhArg)}
              {")"}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginTop: 4,
              }}
            >
              {gates.map((gate, index) => {
                const decided = step > index;
                const isCurrent = step === index + 1 && !finished;
                const decision = run.decisions[gate.key];
                const effectiveVerdict: Verdict = decided
                  ? decision.verdict
                  : "skipped";
                const vstyle = verdictStyle(effectiveVerdict, mode, colors);
                const pending = !decided;
                return (
                  <div
                    key={gate.key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px 1fr auto",
                      alignItems: "stretch",
                      gap: 10,
                      padding: "8px 10px",
                      border: `1.5px solid ${
                        pending ? colors.softBorder : vstyle.stroke
                      }`,
                      background: pending ? colors.panel : vstyle.fill,
                      borderRadius: 9,
                      opacity: pending ? 0.55 : 1,
                      transform: isCurrent ? "translateX(4px)" : "none",
                      transition:
                        "opacity 0.3s ease, transform 0.3s ease," +
                        " background 0.3s ease, border-color 0.3s ease",
                      boxShadow: isCurrent
                        ? `0 0 0 2px ${colors.accentSoft}`
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: pending ? colors.track : vstyle.stroke,
                          color: pending ? colors.textMuted : colors.panel,
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: 12.5,
                        }}
                      >
                        {index + 1}
                      </div>
                      {index < gates.length - 1 ? (
                        <div
                          style={{
                            flex: 1,
                            width: 2,
                            background: pending
                              ? colors.softBorder
                              : vstyle.stroke,
                            opacity: pending ? 0.6 : 0.5,
                            minHeight: 8,
                          }}
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: 12.5,
                          color: pending ? colors.textMuted : colors.text,
                        }}
                      >
                        {localized(lang, gate.enLabel, gate.zhLabel)}
                      </span>
                      <span
                        style={{
                          fontSize: 11.5,
                          color: colors.textMuted,
                          lineHeight: 1.45,
                        }}
                      >
                        {localized(lang, gate.enRole, gate.zhRole)}
                      </span>
                      {decided ? (
                        <span
                          style={{
                            fontSize: 11.5,
                            color: vstyle.stroke,
                            lineHeight: 1.45,
                            fontStyle: "italic",
                          }}
                          title={localized(
                            lang,
                            decision.enWhy,
                            decision.zhWhy,
                          )}
                        >
                          ↳ {localized(lang, decision.enWhy, decision.zhWhy)}
                        </span>
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 64,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: pending
                            ? colors.track
                            : vstyle.stroke + "22",
                          border: `1px solid ${
                            pending ? colors.softBorder : vstyle.stroke
                          }`,
                          color: pending ? colors.textMuted : vstyle.stroke,
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {vstyle.glyph}{" "}
                        {localized(lang, vstyle.enLabel, vstyle.zhLabel)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                border: `1px solid ${colors.softBorder}`,
                borderRadius: 10,
                background: colors.background,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: colors.accent,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {lang === "zh" ? "场景说明" : "scenario note"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: colors.text,
                  lineHeight: 1.55,
                }}
              >
                {localized(lang, scenario.enHint, scenario.zhHint)}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                {lang === "zh" ? "进度" : "progress"}: {Math.min(
                  step,
                  terminalIndex + 1,
                )}{" "}
                / {terminalIndex + 1}
              </div>
            </div>

            <OutcomeBanner
              lang={lang}
              outcome={run.outcome}
              visible={finished}
              mode={mode}
              colors={colors}
            />

            <div
              style={{
                border: `1px dashed ${colors.softBorder}`,
                borderRadius: 10,
                padding: 12,
                background: colors.panel,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 12,
                color: colors.text,
                lineHeight: 1.55,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: colors.accent,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {lang === "zh"
                  ? "trust-all 不能解除什么"
                  : "what trust-all cannot lift"}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <li>
                  {lang === "zh"
                    ? "Sandbox 分类器照常分级；网络隔离不会因 trust-all 解除。"
                    : "Sandbox classifier still tiers the call; network stays isolated."}
                </li>
                <li>
                  {lang === "zh"
                    ? "Guardian 对灾难性模式始终生效，绕不过。"
                    : "Guardian always fires on catastrophic patterns — no bypass."}
                </li>
                <li>
                  {lang === "zh"
                    ? "PostToolUse 钩子仍会改写或脱敏结果。"
                    : "PostToolUse hooks still amend or redact the recorded result."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </InteractiveFigure>
  );
}

interface OutcomeBannerProps {
  lang: Lang;
  outcome: Outcome;
  visible: boolean;
  mode: "light" | "dark";
  colors: typeof palette.light;
}

function OutcomeBanner({
  lang,
  outcome,
  visible,
  mode,
  colors,
}: OutcomeBannerProps) {
  const ostyle = outcomeStyle(outcome, mode, colors);
  const enDetail =
    outcome === "applied"
      ? "Result lands in the durable ledger; PostToolUse may have amended it."
      : outcome === "escalated"
      ? "Runtime cannot decide alone — the parent (human or orchestrator) must answer."
      : "Effect refused before it touched the workspace.";
  const zhDetail =
    outcome === "applied"
      ? "结果落入持久化 ledger；PostToolUse 可能已对其改写。"
      : outcome === "escalated"
      ? "runtime 无法独自裁决 —— 上抛给父级（人或编排器）回答。"
      : "在影响工作区之前已被拒绝。";

  return (
    <div
      style={{
        border: `1.5px solid ${ostyle.stroke}`,
        background: ostyle.fill,
        borderRadius: 10,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: visible ? 1 : 0.35,
        transition: "opacity 0.35s ease",
      }}
      aria-live="polite"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12.5,
          fontWeight: 800,
          letterSpacing: "0.06em",
          color: ostyle.stroke,
        }}
      >
        {localized(lang, ostyle.enLabel, ostyle.zhLabel)}
      </span>
      <span
        style={{
          fontSize: 12.5,
          color: colors.text,
          lineHeight: 1.55,
        }}
      >
        {localized(lang, enDetail, zhDetail)}
      </span>
    </div>
  );
}
