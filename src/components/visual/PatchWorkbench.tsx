import React, { useMemo, useState } from "react";
import InteractiveFigure, { localized, type Lang } from "./InteractiveFigure";
import { useThemeMode, palette } from "./useThemeMode";

type ExampleId = "clean" | "drift" | "overlap";

type Stage =
  | "idle"
  | "parsed"
  | "resolved"
  | "normalized"
  | "verified"
  | "applied";

const STAGE_ORDER: Stage[] = [
  "idle",
  "parsed",
  "resolved",
  "normalized",
  "verified",
  "applied",
];

const STAGE_LABELS: Record<Stage, { en: string; zh: string; code: string }> = {
  idle: { en: "Idle", zh: "待开始", code: "idle" },
  parsed: { en: "Parse hunks", zh: "解析 hunk", code: "parse" },
  resolved: { en: "Resolve paths", zh: "解析路径", code: "resolve" },
  normalized: { en: "Normalize EOL", zh: "归一化换行", code: "normalize" },
  verified: { en: "Verify context", zh: "校验 context", code: "verify" },
  applied: { en: "Apply", zh: "应用", code: "apply" },
};

type HunkStatus =
  | "pending"
  | "parsed"
  | "context_ok"
  | "context_drift"
  | "overlap"
  | "applied"
  | "rejected";

const STATUS_LABEL: Record<HunkStatus, string> = {
  pending: "PENDING",
  parsed: "PARSED",
  context_ok: "CONTEXT_OK",
  context_drift: "CONTEXT_DRIFT",
  overlap: "OVERLAP",
  applied: "APPLIED",
  rejected: "REJECTED",
};

type PatchLine = { mark: " " | "-" | "+"; text: string };

interface HunkSpec {
  id: string;
  enIntent: string;
  zhIntent: string;
  range: [number, number]; // 1-indexed line range in the before file.
  body: PatchLine[];
  verdict: "ok" | "drift" | "overlap";
  drift?: { lineNo: number; expected: string; actual: string };
  overlapWith?: string;
}

interface Example {
  id: ExampleId;
  enLabel: string;
  zhLabel: string;
  enSubtitle: string;
  zhSubtitle: string;
  envelope: string;
  fileFrom: string;
  fileTo: string;
  beforeLines: string[];
  afterLines: string[];
  hunks: HunkSpec[];
}

const examples: Example[] = [
  {
    id: "clean",
    enLabel: "Clean rename",
    zhLabel: "干净的重命名",
    enSubtitle: "Rename plus a tiny edit. Every context line still matches.",
    zhSubtitle: "重命名加上一处小改动。所有 context 行依旧匹配。",
    envelope: "*** Rename File: src/utils.rs -> src/helpers.rs",
    fileFrom: "src/utils.rs",
    fileTo: "src/helpers.rs",
    beforeLines: [
      "pub fn sum(a: i32, b: i32) -> i32 {",
      "    a + b",
      "}",
      "",
      "pub fn product(a: i32, b: i32) -> i32 {",
      "    a * b",
      "}",
    ],
    afterLines: [
      "pub fn sum(a: i32, b: i32) -> i32 {",
      "    return a + b;",
      "}",
      "",
      "pub fn product(a: i32, b: i32) -> i32 {",
      "    a * b",
      "}",
    ],
    hunks: [
      {
        id: "H1",
        enIntent: "Add explicit return in sum()",
        zhIntent: "在 sum() 中显式 return",
        range: [1, 3],
        body: [
          { mark: " ", text: "pub fn sum(a: i32, b: i32) -> i32 {" },
          { mark: "-", text: "    a + b" },
          { mark: "+", text: "    return a + b;" },
          { mark: " ", text: "}" },
        ],
        verdict: "ok",
      },
    ],
  },
  {
    id: "drift",
    enLabel: "Context drift",
    zhLabel: "Context 漂移",
    enSubtitle: "Working tree changed; one expected line no longer matches.",
    zhSubtitle: "工作区被改过；patch 期望的某一行已不再匹配。",
    envelope: "*** Update File: src/auth.rs",
    fileFrom: "src/auth.rs",
    fileTo: "src/auth.rs",
    beforeLines: [
      "fn check_session() -> Result<(), Error> {",
      "    let user = lookup_user();",
      "    if user.is_valid() {",
      "        return Ok(());",
      "    }",
      "    Err(Error::Unauthorized)",
      "}",
    ],
    afterLines: [
      "fn check_session() -> Result<(), Error> {",
      "    let user = lookup_user();",
      "    if user.is_valid() {",
      "        return Ok(());",
      "    }",
      "    Err(Error::Unauthorized)",
      "}",
    ],
    hunks: [
      {
        id: "H1",
        enIntent: "Require admin role on session check",
        zhIntent: "在 session check 中要求 admin 角色",
        range: [2, 5],
        body: [
          { mark: " ", text: "    let user = lookup_user();" },
          { mark: "-", text: "    if user.valid() {" },
          {
            mark: "+",
            text: "    if user.valid() && user.has_role(Role::Admin) {",
          },
          { mark: " ", text: "        return Ok(());" },
          { mark: " ", text: "    }" },
        ],
        verdict: "drift",
        drift: {
          lineNo: 3,
          expected: "    if user.valid() {",
          actual: "    if user.is_valid() {",
        },
      },
    ],
  },
  {
    id: "overlap",
    enLabel: "Hunk overlap",
    zhLabel: "Hunk 重叠",
    enSubtitle: "Two hunks claim the same line. The second one is rejected.",
    zhSubtitle: "两个 hunk 争用同一行。第二个会被拒绝。",
    envelope: "*** Update File: src/server.rs",
    fileFrom: "src/server.rs",
    fileTo: "src/server.rs",
    beforeLines: [
      "async fn handle(req: Request) -> Response {",
      "    let body = parse(req).await;",
      "    let result = process(body);",
      "    Response::ok(result)",
      "}",
    ],
    afterLines: [
      "async fn handle(req: Request) -> Response {",
      "    let body = parse(req).await;",
      "    let result = process(body).await;",
      "    Response::ok(result)",
      "}",
    ],
    hunks: [
      {
        id: "H1",
        enIntent: "Await the process() future",
        zhIntent: "等待 process() 的 future",
        range: [2, 4],
        body: [
          { mark: " ", text: "    let body = parse(req).await;" },
          { mark: "-", text: "    let result = process(body);" },
          { mark: "+", text: "    let result = process(body).await;" },
          { mark: " ", text: "    Response::ok(result)" },
        ],
        verdict: "ok",
      },
      {
        id: "H2",
        enIntent: "Wrap process() in a pipeline",
        zhIntent: "把 process() 包进 pipeline",
        range: [2, 4],
        body: [
          { mark: " ", text: "    let body = parse(req).await;" },
          { mark: "-", text: "    let result = process(body);" },
          {
            mark: "+",
            text: "    let result = pipeline(body).await.process();",
          },
          { mark: " ", text: "    Response::ok(result)" },
        ],
        verdict: "overlap",
        overlapWith: "H1",
      },
    ],
  },
];

type Palette = (typeof palette)[keyof typeof palette];

function statusAt(hunk: HunkSpec, stage: Stage): HunkStatus {
  const idx = STAGE_ORDER.indexOf(stage);
  if (idx <= 0) return "pending";
  if (idx < 4) return "parsed";
  if (idx === 4) {
    return hunk.verdict === "ok"
      ? "context_ok"
      : hunk.verdict === "drift"
      ? "context_drift"
      : "overlap";
  }
  return hunk.verdict === "ok" ? "applied" : "rejected";
}

function statusColor(s: HunkStatus, c: Palette): string {
  if (s === "applied" || s === "context_ok") return c.success;
  if (s === "context_drift" || s === "rejected") return c.accent;
  if (s === "overlap") return c.warning;
  if (s === "parsed") return c.info;
  return c.textMuted;
}

const MONO = "var(--font-mono)";

export default function PatchWorkbench({ lang }: { lang: Lang }) {
  const mode = useThemeMode();
  const colors = palette[mode];
  const [exampleId, setExampleId] = useState<ExampleId>("clean");
  const [stage, setStage] = useState<Stage>("idle");

  const example = useMemo(
    () => examples.find((ex) => ex.id === exampleId) ?? examples[0],
    [exampleId],
  );
  const hunkStatuses = useMemo(
    () => example.hunks.map((h) => statusAt(h, stage)),
    [example, stage],
  );
  const stageIdx = STAGE_ORDER.indexOf(stage);
  const isDone = stage === "applied";

  const summary = useMemo(() => {
    const parsed = stageIdx >= 1 ? example.hunks.length : 0;
    let applied = 0;
    let rejected = 0;
    if (isDone) {
      hunkStatuses.forEach((s) => {
        if (s === "applied") applied += 1;
        else if (s === "rejected") rejected += 1;
      });
    }
    return { parsed, applied, rejected, mutated: applied > 0 ? 1 : 0 };
  }, [example, hunkStatuses, isDone, stageIdx]);

  // Build the line-highlight maps. Once verify has run, paint each hunk's
  // range in the before panel with its outcome color. Applied hunks paint
  // the matching range in the after panel.
  const beforeHighlights = useMemo(() => {
    const map = new Map<number, HunkStatus>();
    example.hunks.forEach((hunk, i) => {
      const s = hunkStatuses[i];
      const paint = s === "context_drift" || s === "overlap" || s === "rejected"
        || (!isDone && (s === "context_ok" || s === "applied"));
      if (!paint) return;
      for (let ln = hunk.range[0]; ln <= hunk.range[1]; ln += 1) {
        if (!map.has(ln)) map.set(ln, s);
      }
    });
    return map;
  }, [example, hunkStatuses, isDone]);

  const afterHighlights = useMemo(() => {
    if (!isDone) return new Map<number, HunkStatus>();
    const map = new Map<number, HunkStatus>();
    example.hunks.forEach((hunk, i) => {
      if (hunkStatuses[i] !== "applied") return;
      for (let ln = hunk.range[0]; ln <= hunk.range[1]; ln += 1) {
        map.set(ln, "applied");
      }
    });
    return map;
  }, [example, hunkStatuses, isDone]);

  const stepForward = () =>
    setStage(STAGE_ORDER[Math.min(stageIdx + 1, STAGE_ORDER.length - 1)]);

  return (
    <InteractiveFigure
      lang={lang}
      title="Patch validation, hunk by hunk"
      zhTitle="Patch 校验，逐 hunk 处理"
      subtitle="Pick a patch and step through parse, resolve, normalize, verify, apply."
      zhSubtitle="选一份 patch，依次走过 parse、resolve、normalize、verify、apply。"
      caption="A patch is data, not a write. Each stage rejects before the filesystem is touched."
      zhCaption="Patch 是数据，不是写操作。每个阶段都会在触碰文件系统之前先做拦截。"
      badge="Chapter 11"
      zhBadge="第 11 章"
    >
      <ExamplePicker
        lang={lang}
        colors={colors}
        exampleId={exampleId}
        onPick={(id) => {
          setExampleId(id);
          setStage("idle");
        }}
      />

      <StageStrip lang={lang} colors={colors} stageIdx={stageIdx} />

      <Controls
        lang={lang}
        colors={colors}
        stage={stage}
        isDone={isDone}
        onStep={stepForward}
        onValidate={() => setStage("applied")}
        onReset={() => setStage("idle")}
      />

      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: colors.textMuted,
          padding: "6px 10px",
          borderRadius: 8,
          background: colors.background,
          border: `1px solid ${colors.softBorder}`,
          marginBottom: 12,
        }}
      >
        <span style={{ color: colors.accent, fontWeight: 700 }}>
          patch envelope
        </span>{" "}
        · {example.envelope}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <FilePanel
          lang={lang}
          colors={colors}
          mode={mode}
          title={lang === "zh" ? "之前" : "before"}
          fileName={example.fileFrom}
          lines={example.beforeLines}
          highlights={beforeHighlights}
        />
        <FilePanel
          lang={lang}
          colors={colors}
          mode={mode}
          title={lang === "zh" ? "之后" : "after"}
          fileName={isDone ? example.fileTo : example.fileFrom}
          lines={isDone ? example.afterLines : example.beforeLines}
          highlights={afterHighlights}
          dimmed={!isDone}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {example.hunks.map((hunk, i) => (
          <HunkCard
            key={hunk.id}
            lang={lang}
            colors={colors}
            hunk={hunk}
            status={hunkStatuses[i]}
          />
        ))}
      </div>

      {stageIdx >= 4 ? (
        <Alerts
          lang={lang}
          colors={colors}
          hunks={example.hunks}
          statuses={hunkStatuses}
        />
      ) : null}

      <SummaryCard lang={lang} colors={colors} mode={mode} summary={summary} />
    </InteractiveFigure>
  );
}

function ExamplePicker({
  lang,
  colors,
  exampleId,
  onPick,
}: {
  lang: Lang;
  colors: Palette;
  exampleId: ExampleId;
  onPick: (id: ExampleId) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={lang === "zh" ? "选择示例 patch" : "Select example patch"}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 8,
        marginBottom: 12,
      }}
    >
      {examples.map((ex) => {
        const active = ex.id === exampleId;
        return (
          <label
            key={ex.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 9,
              border: `1.5px solid ${active ? colors.accent : colors.softBorder}`,
              background: active ? colors.accentSoft : colors.panel,
              cursor: "pointer",
              fontFamily: MONO,
            }}
          >
            <input
              type="radio"
              name="patch-example"
              value={ex.id}
              checked={active}
              onChange={() => onPick(ex.id)}
              style={{ marginTop: 3, accentColor: colors.accent }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: active ? colors.accent : colors.text,
                }}
              >
                {localized(lang, ex.enLabel, ex.zhLabel)}
              </span>
              <span style={{ fontSize: 11, color: colors.textMuted }}>
                {localized(lang, ex.enSubtitle, ex.zhSubtitle)}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
}

function StageStrip({
  lang,
  colors,
  stageIdx,
}: {
  lang: Lang;
  colors: Palette;
  stageIdx: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: 6,
        marginBottom: 12,
      }}
    >
      {STAGE_ORDER.slice(1).map((s, i) => {
        const reached = stageIdx >= i + 1;
        return (
          <div
            key={s}
            style={{
              padding: "6px 9px",
              borderRadius: 8,
              border: `1px solid ${reached ? colors.accent : colors.softBorder}`,
              background: reached ? colors.accentSoft : colors.panel,
              color: reached ? colors.accentHover : colors.textMuted,
              fontFamily: MONO,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                opacity: 0.85,
              }}
            >
              {String(i + 1).padStart(2, "0")} · {STAGE_LABELS[s].code}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 600 }}>
              {localized(lang, STAGE_LABELS[s].en, STAGE_LABELS[s].zh)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Controls({
  lang,
  colors,
  stage,
  isDone,
  onStep,
  onValidate,
  onReset,
}: {
  lang: Lang;
  colors: Palette;
  stage: Stage;
  isDone: boolean;
  onStep: () => void;
  onValidate: () => void;
  onReset: () => void;
}) {
  const btn = (primary: boolean, disabled: boolean): React.CSSProperties => ({
    background: primary && !disabled ? colors.accent : colors.panel,
    color: primary && !disabled ? "#fff" : colors.text,
    border:
      primary && !disabled ? "none" : `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    fontFamily: MONO,
  });

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}
    >
      <button onClick={onStep} disabled={isDone} style={btn(true, isDone)}>
        {lang === "zh" ? "▸ 下一步" : "▸ Step"}
      </button>
      <button
        onClick={onValidate}
        disabled={isDone}
        style={btn(false, isDone)}
      >
        {lang === "zh" ? "校验全部" : "Validate"}
      </button>
      <button onClick={onReset} style={btn(false, false)}>
        {lang === "zh" ? "↺ 重置" : "↺ Reset"}
      </button>
      <div
        style={{
          marginLeft: "auto",
          fontFamily: MONO,
          fontSize: 11,
          color: colors.textMuted,
          alignSelf: "center",
        }}
      >
        {lang === "zh" ? "当前阶段" : "stage"}:{" "}
        <strong style={{ color: colors.text }}>{STAGE_LABELS[stage].code}</strong>
      </div>
    </div>
  );
}

function FilePanel({
  lang,
  colors,
  mode,
  title,
  fileName,
  lines,
  highlights,
  dimmed,
}: {
  lang: Lang;
  colors: Palette;
  mode: "light" | "dark";
  title: string;
  fileName: string;
  lines: string[];
  highlights: Map<number, HunkStatus>;
  dimmed?: boolean;
}) {
  const tint = (s: HunkStatus) => {
    if (s === "applied" || s === "context_ok")
      return { bg: colors.successSoft, fg: colors.success };
    if (s === "context_drift" || s === "rejected")
      return { bg: colors.accentSoft, fg: colors.accent };
    if (s === "overlap") return { bg: colors.warningSoft, fg: colors.warning };
    return null;
  };

  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.softBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        opacity: dimmed ? 0.85 : 1,
      }}
    >
      <div
        style={{
          padding: "6px 10px",
          background:
            mode === "light"
              ? "linear-gradient(180deg, #f5f1e2 0%, #fdfaf2 100%)"
              : "linear-gradient(180deg, #2c2b29 0%, #1f1f1d 100%)",
          borderBottom: `1px solid ${colors.softBorder}`,
          fontFamily: MONO,
          fontSize: 11,
          display: "flex",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: colors.accent,
          }}
        >
          {title}
        </span>
        <span style={{ color: colors.textMuted }}>{fileName}</span>
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11.5,
          padding: "6px 0",
          maxHeight: 220,
          overflow: "auto",
        }}
      >
        {lines.length === 0 ? (
          <div
            style={{
              padding: 12,
              textAlign: "center",
              color: colors.textMuted,
            }}
          >
            {lang === "zh" ? "（空文件）" : "(empty file)"}
          </div>
        ) : (
          lines.map((text, idx) => {
            const ln = idx + 1;
            const t = highlights.get(ln) ? tint(highlights.get(ln)!) : null;
            return (
              <div
                key={ln}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  background: t ? t.bg : "transparent",
                  color: colors.text,
                  padding: "1px 8px",
                }}
              >
                <span
                  style={{
                    textAlign: "right",
                    color: t ? t.fg : colors.textMuted,
                    fontWeight: t ? 700 : 400,
                    paddingRight: 6,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {ln}
                </span>
                <span style={{ whiteSpace: "pre" }}>
                  {text.length === 0 ? "\u00A0" : text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function HunkCard({
  lang,
  colors,
  hunk,
  status,
}: {
  lang: Lang;
  colors: Palette;
  hunk: HunkSpec;
  status: HunkStatus;
}) {
  const sc = statusColor(status, colors);
  return (
    <div
      style={{
        border: `1px solid ${colors.softBorder}`,
        borderLeft: `4px solid ${sc}`,
        borderRadius: 9,
        background: colors.background,
        padding: "8px 10px",
        fontFamily: MONO,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>
          {hunk.id}
        </span>
        <span style={{ fontSize: 11.5, color: colors.textMuted, flex: 1 }}>
          {localized(lang, hunk.enIntent, hunk.zhIntent)} ·{" "}
          {lang === "zh" ? "范围" : "range"} L{hunk.range[0]}–L{hunk.range[1]}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 999,
            background: `${sc}26`,
            border: `1px solid ${sc}`,
            color: sc,
            letterSpacing: "0.06em",
          }}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div
        style={{
          marginTop: 6,
          borderRadius: 6,
          border: `1px solid ${colors.softBorder}`,
          overflow: "hidden",
        }}
      >
        {hunk.body.map((line, k) => {
          const bg =
            line.mark === "+"
              ? colors.successSoft
              : line.mark === "-"
              ? colors.accentSoft
              : "transparent";
          const fg =
            line.mark === "+"
              ? colors.success
              : line.mark === "-"
              ? colors.accent
              : colors.text;
          return (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                fontSize: 11.5,
                background: bg,
                color: fg,
                padding: "1px 6px",
              }}
            >
              <span style={{ fontWeight: 700 }}>{line.mark}</span>
              <span style={{ whiteSpace: "pre" }}>{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Alerts({
  lang,
  colors,
  hunks,
  statuses,
}: {
  lang: Lang;
  colors: Palette;
  hunks: HunkSpec[];
  statuses: HunkStatus[];
}) {
  return (
    <>
      {hunks.map((hunk, i) => {
        const s = statuses[i];
        if (s === "context_drift" && hunk.drift) {
          return (
            <div
              key={`drift-${hunk.id}`}
              role="alert"
              style={{
                padding: 10,
                borderRadius: 9,
                border: `1px solid ${colors.accent}`,
                background: colors.accentSoft,
                color: colors.text,
                fontFamily: MONO,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <strong style={{ color: colors.accent }}>
                {lang === "zh"
                  ? `Context 漂移于 ${hunk.id}：L${hunk.drift.lineNo}`
                  : `Context drift in ${hunk.id} at L${hunk.drift.lineNo}`}
              </strong>
              <div
                style={{
                  marginTop: 6,
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: 4,
                }}
              >
                <span style={{ color: colors.textMuted }}>
                  {lang === "zh" ? "patch 期望" : "expected"}
                </span>
                <code style={{ color: colors.accent, whiteSpace: "pre" }}>
                  {hunk.drift.expected}
                </code>
                <span style={{ color: colors.textMuted }}>
                  {lang === "zh" ? "实际文件" : "found"}
                </span>
                <code style={{ color: colors.success, whiteSpace: "pre" }}>
                  {hunk.drift.actual}
                </code>
              </div>
            </div>
          );
        }
        if (s === "overlap" && hunk.overlapWith) {
          return (
            <div
              key={`overlap-${hunk.id}`}
              role="alert"
              style={{
                padding: 10,
                borderRadius: 9,
                border: `1px solid ${colors.warning}`,
                background: colors.warningSoft,
                color: colors.text,
                fontFamily: MONO,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <strong style={{ color: colors.warning }}>
                {lang === "zh"
                  ? `Hunk 重叠：${hunk.id} 与 ${hunk.overlapWith} 覆盖同一区间`
                  : `Hunk overlap: ${hunk.id} touches the same range as ${hunk.overlapWith}`}
              </strong>
              <div style={{ marginTop: 6, color: colors.textMuted }}>
                {lang === "zh"
                  ? `两个 hunk 都覆盖 L${hunk.range[0]}–L${hunk.range[1]}；patch 引擎按出现顺序保留第一个，拒绝后续重叠 hunk。`
                  : `Both hunks cover L${hunk.range[0]}–L${hunk.range[1]}; the patch engine keeps the first and rejects later overlaps.`}
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

function SummaryCard({
  lang,
  colors,
  mode,
  summary,
}: {
  lang: Lang;
  colors: Palette;
  mode: "light" | "dark";
  summary: { parsed: number; applied: number; rejected: number; mutated: number };
}) {
  const cells: Array<{
    en: string;
    zh: string;
    value: number;
    tone: "info" | "success" | "accent" | "warning";
  }> = [
    { en: "hunks parsed", zh: "解析 hunks", value: summary.parsed, tone: "info" },
    {
      en: "hunks applied",
      zh: "应用 hunks",
      value: summary.applied,
      tone: "success",
    },
    {
      en: "hunks rejected",
      zh: "拒绝 hunks",
      value: summary.rejected,
      tone: "accent",
    },
    {
      en: "files mutated",
      zh: "改动文件",
      value: summary.mutated,
      tone: "warning",
    },
  ];
  const toneColor = (tone: "info" | "success" | "accent" | "warning") =>
    tone === "success"
      ? colors.success
      : tone === "accent"
      ? colors.accent
      : tone === "warning"
      ? colors.warning
      : colors.info;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 8,
        padding: 10,
        borderRadius: 10,
        border: `1px solid ${colors.softBorder}`,
        background:
          mode === "light"
            ? "linear-gradient(180deg, #fffaef 0%, #ffffff 100%)"
            : "linear-gradient(180deg, #232220 0%, #1f1f1d 100%)",
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.en}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: MONO,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: colors.textMuted,
              fontWeight: 700,
            }}
          >
            {localized(lang, cell.en, cell.zh)}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: toneColor(cell.tone),
              lineHeight: 1.1,
            }}
          >
            {cell.value}
          </span>
        </div>
      ))}
    </div>
  );
}
