import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

interface State {
  cwd: string;
  model: string;
  sandbox: "read-only" | "workspace-write" | "danger-full-access";
  approvalPolicy: "ask" | "trust-all" | "deny-all";
  webSearch: boolean;
  shellSubmissionsAllowed: boolean;
}

const baseline: State = {
  cwd: "/repo",
  model: "claude-sonnet-4",
  sandbox: "workspace-write",
  approvalPolicy: "ask",
  webSearch: false,
  shellSubmissionsAllowed: true,
};

interface Props {
  lang: Lang;
}

export default function FragmentComposer({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [state, setState] = useState<State>(baseline);

  const fragments = useMemo(() => buildFragments(state, baseline, lang), [
    state,
    lang,
  ]);

  return (
    <InteractiveFigure
      lang={lang}
      title="Typed runtime facts become rendered fragments"
      zhTitle="类型化的运行时事实被渲染成 fragment"
      subtitle="Toggle controls to see how a TurnContext field becomes model-visible text."
      zhSubtitle="切换开关，看 TurnContext 的字段如何变成模型可见的文本。"
      caption="Codex never serializes the whole struct. Each fragment renders only the diff that matters this turn."
      zhCaption="Codex 从不把整个 struct 序列化进 prompt。每个 fragment 只渲染本 turn 真正需要呈现的 diff。"
      badge="Chapter 4"
      zhBadge="第 4 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 12,
            background: colors.background,
            border: `1px solid ${colors.softBorder}`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {lang === "zh" ? "TurnContext 控制台" : "TurnContext controls"}
          </div>
          <Field
            label={lang === "zh" ? "工作目录 (cwd)" : "Working dir (cwd)"}
            colors={colors}
          >
            <select
              value={state.cwd}
              onChange={(event) =>
                setState({ ...state, cwd: event.target.value })
              }
              style={selectStyle(colors)}
            >
              <option value="/repo">/repo</option>
              <option value="/repo/services/api">/repo/services/api</option>
              <option value="/sandbox">/sandbox</option>
            </select>
          </Field>
          <Field
            label={lang === "zh" ? "模型" : "Model"}
            colors={colors}
          >
            <select
              value={state.model}
              onChange={(event) =>
                setState({ ...state, model: event.target.value })
              }
              style={selectStyle(colors)}
            >
              <option value="claude-sonnet-4">claude-sonnet-4</option>
              <option value="gpt-4-text-only">gpt-4-text-only</option>
              <option value="codex-haiku">codex-haiku</option>
            </select>
          </Field>
          <Field
            label={lang === "zh" ? "Sandbox" : "Sandbox"}
            colors={colors}
          >
            <select
              value={state.sandbox}
              onChange={(event) =>
                setState({
                  ...state,
                  sandbox: event.target.value as State["sandbox"],
                })
              }
              style={selectStyle(colors)}
            >
              <option value="read-only">read-only</option>
              <option value="workspace-write">workspace-write</option>
              <option value="danger-full-access">danger-full-access</option>
            </select>
          </Field>
          <Field
            label={lang === "zh" ? "Approval policy" : "Approval policy"}
            colors={colors}
          >
            <select
              value={state.approvalPolicy}
              onChange={(event) =>
                setState({
                  ...state,
                  approvalPolicy: event.target
                    .value as State["approvalPolicy"],
                })
              }
              style={selectStyle(colors)}
            >
              <option value="ask">ask</option>
              <option value="trust-all">trust-all</option>
              <option value="deny-all">deny-all</option>
            </select>
          </Field>
          <Toggle
            label={lang === "zh" ? "启用 web 搜索" : "Web search enabled"}
            value={state.webSearch}
            onChange={(value) => setState({ ...state, webSearch: value })}
            colors={colors}
          />
          <Toggle
            label={
              lang === "zh"
                ? "允许新的 shell 提交"
                : "Shell submissions allowed"
            }
            value={state.shellSubmissionsAllowed}
            onChange={(value) =>
              setState({ ...state, shellSubmissionsAllowed: value })
            }
            colors={colors}
          />
          <button
            onClick={() => setState(baseline)}
            style={{
              alignSelf: "flex-end",
              border: `1px solid ${colors.border}`,
              background: colors.panel,
              color: colors.text,
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
            }}
          >
            {lang === "zh" ? "重置为基准" : "Reset to baseline"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            padding: 12,
            background:
              mode === "light"
                ? "linear-gradient(180deg, #1f1f1c 0%, #232220 100%)"
                : "linear-gradient(180deg, #0d0d0c 0%, #1a1a18 100%)",
            color: "#f5f1e2",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            lineHeight: 1.55,
            overflowX: "auto",
          }}
        >
          <div style={{ color: "#a3a298", marginBottom: 4 }}>
            {lang === "zh"
              ? "// 渲染后的 prompt 片段"
              : "// rendered prompt fragments"}
          </div>
          {fragments.length === 0 ? (
            <div style={{ color: "#a3a298" }}>
              {lang === "zh"
                ? "（与上一 turn 一致，无 diff 注入）"
                : "(no diff vs previous turn)"}
            </div>
          ) : null}
          {fragments.map((fragment) => (
            <div
              key={fragment.label}
              style={{
                padding: 6,
                borderLeft: `2px solid ${fragment.color}`,
                paddingLeft: 8,
                background: `${fragment.color}1a`,
              }}
            >
              <div
                style={{
                  color: fragment.color,
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {fragment.label}
              </div>
              <div style={{ color: "#f5f1e2" }}>{fragment.body}</div>
            </div>
          ))}
        </div>
      </div>
    </InteractiveFigure>
  );
}

function buildFragments(
  state: State,
  base: State,
  lang: Lang,
): Array<{ label: string; body: string; color: string }> {
  const out: Array<{ label: string; body: string; color: string }> = [];

  if (state.cwd !== base.cwd) {
    out.push({
      label: lang === "zh" ? "context.cwd diff" : "context.cwd diff",
      body:
        lang === "zh"
          ? `cwd 已变更为 ${state.cwd}（之前为 ${base.cwd}）`
          : `cwd is now ${state.cwd} (was ${base.cwd})`,
      color: "#fb923c",
    });
  }

  if (state.model !== base.model) {
    out.push({
      label: lang === "zh" ? "context.model diff" : "context.model diff",
      body:
        lang === "zh"
          ? `当前模型 ${state.model}（之前为 ${base.model}）`
          : `model is now ${state.model} (was ${base.model})`,
      color: "#7dd3fc",
    });
  }

  if (state.sandbox !== base.sandbox) {
    out.push({
      label: lang === "zh" ? "context.sandbox diff" : "context.sandbox diff",
      body:
        lang === "zh"
          ? `sandbox 切换到 ${state.sandbox}`
          : `sandbox switched to ${state.sandbox}`,
      color: "#fcd34d",
    });
  }

  if (state.approvalPolicy !== base.approvalPolicy) {
    out.push({
      label:
        lang === "zh" ? "context.approval diff" : "context.approval diff",
      body:
        lang === "zh"
          ? `approval policy = ${state.approvalPolicy}`
          : `approval policy = ${state.approvalPolicy}`,
      color: "#bef264",
    });
  }

  if (state.webSearch !== base.webSearch) {
    out.push({
      label: lang === "zh" ? "tools.web_search" : "tools.web_search",
      body: state.webSearch
        ? lang === "zh"
          ? "web 搜索能力开启，加入 tool spec"
          : "web search capability ON, added to tool spec"
        : lang === "zh"
        ? "web 搜索关闭，从 tool spec 移除"
        : "web search OFF, removed from tool spec",
      color: "#bef264",
    });
  }

  if (state.shellSubmissionsAllowed !== base.shellSubmissionsAllowed) {
    out.push({
      label:
        lang === "zh"
          ? "session.shell_submissions"
          : "session.shell_submissions",
      body: state.shellSubmissionsAllowed
        ? lang === "zh"
          ? "新的 shell 提交允许"
          : "new shell submissions allowed"
        : lang === "zh"
        ? "新的 shell 提交被禁用"
        : "new shell submissions disabled",
      color: "#fca5a5",
    });
  }

  return out;
}

function Field({
  label,
  children,
  colors,
}: {
  label: string;
  children: React.ReactNode;
  colors: ReturnType<typeof readPalette>;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: colors.textMuted,
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
  colors,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  colors: ReturnType<typeof readPalette>;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: colors.text,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        style={{ accentColor: colors.accent }}
      />
      <span>{label}</span>
    </label>
  );
}

function selectStyle(colors: ReturnType<typeof readPalette>) {
  return {
    width: "100%",
    padding: "4px 6px",
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
    background: colors.panel,
    color: colors.text,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
  };
}

function readPalette() {
  return palette.light;
}
