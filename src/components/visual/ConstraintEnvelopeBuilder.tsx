import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ColorPalette = (typeof palette)[keyof typeof palette];

type ConfigSource =
  | "user_profile"
  | "project_profile"
  | "env_vars"
  | "cli_overrides";

type AuthMode = "direct_api" | "bedrock" | "vertex" | "managed_proxy";

type FeatureFlag =
  | "reactive_compact"
  | "kairos_memory"
  | "prompt_cache_v2"
  | "audio_realtime";

interface State {
  sources: Record<ConfigSource, boolean>;
  auth: AuthMode;
  features: Record<FeatureFlag, boolean>;
}

const initialState: State = {
  sources: {
    user_profile: true,
    project_profile: true,
    env_vars: false,
    cli_overrides: false,
  },
  auth: "direct_api",
  features: {
    reactive_compact: false,
    kairos_memory: false,
    prompt_cache_v2: true,
    audio_realtime: false,
  },
};

const CONFIG_SOURCES: ConfigSource[] = [
  "user_profile",
  "project_profile",
  "env_vars",
  "cli_overrides",
];

const AUTH_MODES: AuthMode[] = [
  "direct_api",
  "bedrock",
  "vertex",
  "managed_proxy",
];

const FEATURE_FLAGS: FeatureFlag[] = [
  "reactive_compact",
  "kairos_memory",
  "prompt_cache_v2",
  "audio_realtime",
];

const AUTH_TO_ENDPOINT: Record<AuthMode, string> = {
  direct_api: "api.anthropic.com/v1/messages",
  bedrock: "bedrock-runtime.us-east-1.amazonaws.com",
  vertex: "us-central1-aiplatform.googleapis.com",
  managed_proxy: "proxy.internal.corp/codex/v1",
};

const AUTH_TO_EGRESS: Record<AuthMode, string> = {
  direct_api: "anthropic.com",
  bedrock: "*.amazonaws.com",
  vertex: "*.googleapis.com",
  managed_proxy: "proxy.internal.corp",
};

interface Conflict {
  en: string;
  zh: string;
  feature?: FeatureFlag;
}

// Conflicts are surfaced before any tool call so the model never sees a
// half-resolved envelope.
function detectConflicts(state: State): Conflict[] {
  const out: Conflict[] = [];
  if (state.features.audio_realtime && state.auth !== "bedrock") {
    out.push({
      feature: "audio_realtime",
      en: `audio_realtime requires bedrock auth (current: ${state.auth}).`,
      zh: `audio_realtime 需要 bedrock 鉴权（当前：${state.auth}）。`,
    });
  }
  if (state.features.prompt_cache_v2 && state.auth === "managed_proxy") {
    out.push({
      feature: "prompt_cache_v2",
      en:
        "prompt_cache_v2 is stripped by managed_proxy; cache headers blocked.",
      zh: "prompt_cache_v2 在 managed_proxy 下会被剥离；缓存 header 被拦截。",
    });
  }
  if (state.features.kairos_memory && !state.sources.project_profile) {
    out.push({
      feature: "kairos_memory",
      en: "kairos_memory needs project_profile in the config layer list.",
      zh: "kairos_memory 需要把 project_profile 放进配置层列表。",
    });
  }
  if (state.features.reactive_compact && state.auth === "vertex") {
    out.push({
      feature: "reactive_compact",
      en: "reactive_compact has no vertex code path yet.",
      zh: "reactive_compact 暂未在 vertex 上落地。",
    });
  }
  if (state.auth === "managed_proxy" && state.sources.cli_overrides) {
    out.push({
      en: "managed_proxy ignores cli_overrides; drop the override layer.",
      zh: "managed_proxy 会忽略 cli_overrides；请移除该覆盖层。",
    });
  }
  return out;
}

interface Envelope {
  auth: AuthMode;
  endpoint: string;
  layers: ConfigSource[];
  features: { name: FeatureFlag; ok: boolean }[];
  egress: string;
  shellExec: string;
  approvalPolicy: string;
  denies: { en: string; zh: string }[];
}

function buildEnvelope(state: State, conflicts: Conflict[]): Envelope {
  const layers = CONFIG_SOURCES.filter((src) => state.sources[src]);
  const conflicted = new Set(
    conflicts
      .map((c) => c.feature)
      .filter((f): f is FeatureFlag => Boolean(f)),
  );
  const features = FEATURE_FLAGS.filter((f) => state.features[f]).map(
    (f) => ({ name: f, ok: !conflicted.has(f) }),
  );

  const denies: { en: string; zh: string }[] = [
    {
      en: "shell writes outside sandbox cwd",
      zh: "在 sandbox cwd 之外的 shell 写操作",
    },
    {
      en: `outbound traffic outside ${AUTH_TO_EGRESS[state.auth]}`,
      zh: `${AUTH_TO_EGRESS[state.auth]} 之外的出站流量`,
    },
    {
      en: "model_overrides injected via raw request headers",
      zh: "通过 raw header 注入的 model_overrides",
    },
  ];
  if (state.auth === "managed_proxy") {
    denies.push({
      en: "cli_overrides layer (server policy wins)",
      zh: "cli_overrides 层（服务端策略优先）",
    });
  }
  if (state.auth === "vertex") {
    denies.push({
      en: "reactive_compact (vertex code path TBD)",
      zh: "reactive_compact（vertex 路径未实现）",
    });
  }
  if (state.auth !== "bedrock") {
    denies.push({
      en: "audio_realtime websocket stream",
      zh: "audio_realtime websocket 流",
    });
  }
  if (!state.sources.env_vars) {
    denies.push({
      en: "ad-hoc CODEX_* env var injection",
      zh: "临时 CODEX_* 环境变量注入",
    });
  }

  return {
    auth: state.auth,
    endpoint: AUTH_TO_ENDPOINT[state.auth],
    layers,
    features,
    egress: AUTH_TO_EGRESS[state.auth],
    shellExec:
      state.auth === "managed_proxy" ? "approval_required" : "allowed",
    approvalPolicy:
      state.auth === "managed_proxy" ? "deny-by-default" : "ask",
    denies: denies.slice(0, 5),
  };
}

interface Props {
  lang: Lang;
}

export default function ConstraintEnvelopeBuilder({ lang }: Props) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [state, setState] = useState<State>(initialState);

  const conflicts = useMemo(() => detectConflicts(state), [state]);
  const envelope = useMemo(
    () => buildEnvelope(state, conflicts),
    [state, conflicts],
  );

  const toggleSource = (key: ConfigSource) =>
    setState((prev) => ({
      ...prev,
      sources: { ...prev.sources, [key]: !prev.sources[key] },
    }));
  const setAuth = (auth: AuthMode) => setState((prev) => ({ ...prev, auth }));
  const toggleFeature = (key: FeatureFlag) =>
    setState((prev) => ({
      ...prev,
      features: { ...prev.features, [key]: !prev.features[key] },
    }));

  return (
    <InteractiveFigure
      lang={lang}
      title="Build the constrained envelope"
      zhTitle="构建受约束的 envelope"
      subtitle="Pick config layers, an auth mode, and feature flags. Codex collapses them into the runtime envelope it actually executes against."
      zhSubtitle="选好配置层、鉴权方式与功能开关，Codex 会把它们坍缩成运行时真正执行的 envelope。"
      caption="The envelope is the smallest set of capabilities Codex commits to before any tool call runs. Conflicts surface before the model ever sees them."
      zhCaption="envelope 是 Codex 在任何工具调用之前承诺的最小能力集合。冲突会在模型看到之前先被暴露出来。"
      badge="Chapter 3"
      zhBadge="第 3 章"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.5fr)",
          gap: 14,
        }}
      >
        <InputColumn
          title={localized(lang, "Config sources (multi)", "配置源（多选）")}
          colors={colors}
        >
          {CONFIG_SOURCES.map((src) => (
            <Chip
              key={src}
              label={src}
              active={state.sources[src]}
              onClick={() => toggleSource(src)}
              colors={colors}
            />
          ))}
        </InputColumn>

        <InputColumn
          title={localized(lang, "Auth mode (single)", "鉴权模式（单选）")}
          colors={colors}
        >
          {AUTH_MODES.map((m) => (
            <RadioOption
              key={m}
              label={m}
              checked={state.auth === m}
              onClick={() => setAuth(m)}
              colors={colors}
            />
          ))}
        </InputColumn>

        <InputColumn
          title={localized(lang, "Feature flags", "功能开关")}
          colors={colors}
        >
          {FEATURE_FLAGS.map((f) => (
            <FlagToggle
              key={f}
              label={f}
              value={state.features[f]}
              onChange={() => toggleFeature(f)}
              colors={colors}
            />
          ))}
        </InputColumn>

        <EnvelopeCard
          envelope={envelope}
          colors={colors}
          mode={mode}
          lang={lang}
        />
      </div>

      <ValidationPanel
        conflicts={conflicts}
        colors={colors}
        lang={lang}
        onReset={() => setState(initialState)}
      />
    </InteractiveFigure>
  );
}

function InputColumn({
  title,
  children,
  colors,
}: {
  title: string;
  children: React.ReactNode;
  colors: ColorPalette;
}) {
  return (
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
        {title}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  colors,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  colors: ColorPalette;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "5px 10px",
        borderRadius: 999,
        border: `1px solid ${active ? colors.accent : colors.border}`,
        background: active ? colors.accentSoft : colors.panel,
        color: active ? colors.accentHover : colors.textMuted,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        cursor: "pointer",
        fontWeight: active ? 600 : 500,
      }}
    >
      {active ? "+ " : "  "}
      {label}
    </button>
  );
}

function RadioOption({
  label,
  checked,
  onClick,
  colors,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
  colors: ColorPalette;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 8px",
        borderRadius: 7,
        border: `1px solid ${checked ? colors.accent : colors.border}`,
        background: checked ? colors.accentSoft : colors.panel,
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: checked ? colors.accentHover : colors.text,
      }}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onClick}
        style={{ accentColor: colors.accent }}
      />
      <span>{label}</span>
    </label>
  );
}

function FlagToggle({
  label,
  value,
  onChange,
  colors,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  colors: ColorPalette;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 8px",
        borderRadius: 7,
        border: `1px solid ${value ? colors.accent : colors.border}`,
        background: value ? colors.accentSoft : colors.panel,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: value ? colors.accentHover : colors.text,
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

function EnvelopeCard({
  envelope,
  colors,
  mode,
  lang,
}: {
  envelope: Envelope;
  colors: ColorPalette;
  mode: "light" | "dark";
  lang: Lang;
}) {
  const dark = mode === "dark";
  const bg = dark
    ? "linear-gradient(180deg, #0d0d0c 0%, #1a1a18 100%)"
    : "linear-gradient(180deg, #1f1f1c 0%, #232220 100%)";
  const mutedText = "#a3a298";
  const baseText = "#f5f1e2";
  const accent = "#fb923c";
  const ok = "#86efac";
  const warn = "#fca5a5";

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 110px) minmax(0, 1fr)",
    gap: 8,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    lineHeight: 1.55,
  };

  return (
    <div
      style={{
        padding: 12,
        background: bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        color: baseText,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {lang === "zh"
          ? "解析后的 constraint envelope"
          : "Resolved constraint envelope"}
      </div>

      <div style={rowStyle}>
        <span style={{ color: mutedText }}>auth_mode</span>
        <span>{envelope.auth}</span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>endpoint</span>
        <span>{envelope.endpoint}</span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>config_layers</span>
        <span>
          {envelope.layers.length === 0
            ? lang === "zh"
              ? "（空，将回退到内置默认值）"
              : "(empty, falls back to baked-in defaults)"
            : "[" + envelope.layers.join(", ") + "]"}
        </span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>features</span>
        <span>
          {envelope.features.length === 0 ? (
            <span style={{ color: mutedText }}>
              {lang === "zh" ? "（无）" : "(none)"}
            </span>
          ) : (
            envelope.features.map((f, idx) => (
              <span key={f.name}>
                <span
                  style={{
                    color: f.ok ? ok : warn,
                    textDecoration: f.ok ? "none" : "line-through",
                  }}
                >
                  {f.name}
                </span>
                {idx < envelope.features.length - 1 ? ", " : ""}
              </span>
            ))
          )}
        </span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>network_egress</span>
        <span>{envelope.egress}</span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>shell_exec</span>
        <span>{envelope.shellExec}</span>
      </div>
      <div style={rowStyle}>
        <span style={{ color: mutedText }}>approval_policy</span>
        <span>{envelope.approvalPolicy}</span>
      </div>

      <div
        style={{
          marginTop: 4,
          paddingTop: 8,
          borderTop: "1px dashed #3d3d39",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div
          style={{
            color: warn,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          deny:
        </div>
        {envelope.denies.map((d, idx) => (
          <div
            key={idx}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              color: warn,
              paddingLeft: 8,
              lineHeight: 1.5,
            }}
          >
            - {lang === "zh" ? d.zh : d.en}
          </div>
        ))}
      </div>
    </div>
  );
}

function ValidationPanel({
  conflicts,
  colors,
  lang,
  onReset,
}: {
  conflicts: Conflict[];
  colors: ColorPalette;
  lang: Lang;
  onReset: () => void;
}) {
  const hasConflicts = conflicts.length > 0;
  return (
    <div
      style={{
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 12,
        borderRadius: 10,
        border: `1px solid ${
          hasConflicts ? colors.warning : colors.softBorder
        }`,
        background: hasConflicts ? colors.warningSoft : colors.background,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hasConflicts ? colors.warning : colors.success,
          }}
        >
          {hasConflicts
            ? lang === "zh"
              ? "检测到约束冲突："
              : "Constraint conflicts detected:"
            : lang === "zh"
            ? "envelope 一致，无冲突"
            : "envelope is coherent, no conflicts"}
        </div>
        <button
          type="button"
          onClick={onReset}
          style={{
            border: `1px solid ${colors.border}`,
            background: colors.panel,
            color: colors.text,
            borderRadius: 7,
            padding: "4px 12px",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
          }}
        >
          {lang === "zh" ? "重置" : "Reset"}
        </button>
      </div>
      {hasConflicts ? (
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: colors.text,
            lineHeight: 1.6,
          }}
        >
          {conflicts.map((c, idx) => (
            <li key={idx}>{lang === "zh" ? c.zh : c.en}</li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: colors.textMuted,
            lineHeight: 1.55,
          }}
        >
          {lang === "zh"
            ? "Codex 现在可以把这份 envelope 锁定为本会话的能力上限。"
            : "Codex can now lock this envelope as the per-session capability ceiling."}
        </div>
      )}
    </div>
  );
}
