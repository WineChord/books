import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  Cpu,
  Database,
  Eye,
  FileText,
  GitBranch,
  Layers,
  Lock,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Route,
  Scale,
  Server,
  Shield,
  SlidersHorizontal,
  StepForward,
  Terminal,
  UserCheck,
  Wrench,
  XCircle,
} from "lucide-react";

type Lang = "en" | "zh";
type ViewMode = "flow" | "authority";
type ClientKey = "tui" | "exec" | "app";

type Stage = {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  enTitle: string;
  zhTitle: string;
  enDetail: string;
  zhDetail: string;
  role: "entry" | "runtime" | "model" | "gate" | "record";
};

type AuthorityLayer = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  enName: string;
  zhName: string;
  enWhy: string;
  zhWhy: string;
};

type HistoryLane = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  enName: string;
  zhName: string;
  enWhy: string;
  zhWhy: string;
};

const stages: Stage[] = [
  {
    id: "client",
    icon: Terminal,
    enTitle: "Client surface",
    zhTitle: "客户端接入面",
    enDetail:
      "TUI, exec, app-server, and SDKs submit intent without owning the runtime.",
    zhDetail:
      "TUI、exec、app-server 和 SDK 提交意图，但不拥有 runtime。",
    role: "entry",
  },
  {
    id: "operation",
    icon: FileText,
    enTitle: "Typed operation",
    zhTitle: "Typed operation",
    enDetail:
      "Intent is shaped into a named request that can be accepted, denied, queued, or transformed.",
    zhDetail:
      "意图先被塑造成有名字的请求，之后才能被接受、拒绝、排队或转换。",
    role: "entry",
  },
  {
    id: "scheduler",
    icon: Cpu,
    enTitle: "Runtime scheduler",
    zhTitle: "Runtime 调度器",
    enDetail:
      "The session loop decides when to sample, dispatch tools, persist events, and settle the turn.",
    zhDetail:
      "Session loop 决定何时采样、派发工具、持久化事件、结束 turn。",
    role: "runtime",
  },
  {
    id: "model",
    icon: Radio,
    enTitle: "Model boundary",
    zhTitle: "模型边界",
    enDetail:
      "The model receives selected context and returns items; it does not execute effects directly.",
    zhDetail:
      "模型接收被选择后的上下文并返回 item；它不会直接执行副作用。",
    role: "model",
  },
  {
    id: "router",
    icon: Route,
    enTitle: "Item and tool router",
    zhTitle: "Item 与工具路由",
    enDetail:
      "Assistant output, tool calls, approvals, and continuations are routed through typed handlers.",
    zhDetail:
      "Assistant 输出、工具调用、审批和 continuation 都经由 typed handler 路由。",
    role: "runtime",
  },
  {
    id: "gate",
    icon: Shield,
    enTitle: "Policy gate",
    zhTitle: "策略闸门",
    enDetail:
      "Configuration, managed requirements, hooks, approvals, and sandboxes turn requests into decisions.",
    zhDetail:
      "配置、managed requirements、hooks、审批和 sandbox 把请求变成决策。",
    role: "gate",
  },
  {
    id: "effect",
    icon: Server,
    enTitle: "Bounded side effect",
    zhTitle: "有边界的副作用",
    enDetail:
      "Only approved work reaches shell, filesystem, MCP tools, or external services.",
    zhDetail:
      "只有被批准的工作会到达 shell、文件系统、MCP 工具或外部服务。",
    role: "gate",
  },
  {
    id: "record",
    icon: Database,
    enTitle: "Event and rollout",
    zhTitle: "Event 与 rollout",
    enDetail:
      "Facts are emitted for clients and appended as replayable evidence.",
    zhDetail:
      "事实被发给客户端，并作为可 replay 的证据追加保存。",
    role: "record",
  },
];

const authorityLayers: AuthorityLayer[] = [
  {
    icon: Wrench,
    enName: "Tool specification",
    zhName: "工具 spec",
    enWhy: "The model sees a capability shape, not execution authority.",
    zhWhy: "模型看到的是能力形状，不是执行授权。",
  },
  {
    icon: SlidersHorizontal,
    enName: "Resolved configuration",
    zhName: "解析后的配置",
    enWhy: "User, workspace, profile, and command choices define preferences.",
    zhWhy: "用户、workspace、profile 和命令行选择先定义偏好。",
  },
  {
    icon: Lock,
    enName: "Managed requirements",
    zhName: "Managed requirements",
    enWhy: "Organization or environment rules can narrow those preferences.",
    zhWhy: "组织或环境规则可以收紧这些偏好。",
  },
  {
    icon: Shield,
    enName: "Permission profile",
    zhName: "Permission profile",
    enWhy: "The runtime compiles a capability envelope before work executes.",
    zhWhy: "Runtime 在执行前编译出能力包络。",
  },
  {
    icon: Scale,
    enName: "Action policy",
    zhName: "动作策略",
    enWhy: "A concrete effect request is judged against the compiled envelope.",
    zhWhy: "具体副作用请求会对照编译后的能力包络进行判断。",
  },
  {
    icon: GitBranch,
    enName: "Hooks and reviewers",
    zhName: "Hooks 与 reviewer",
    enWhy: "Local policy can add context, block work, or request review.",
    zhWhy: "本地策略可以补上下文、阻断工作或请求 review。",
  },
  {
    icon: UserCheck,
    enName: "Human approval",
    zhName: "人类审批",
    enWhy: "Ambiguous or dangerous effects become explicit decisions.",
    zhWhy: "含糊或危险的副作用变成显式决策。",
  },
  {
    icon: Server,
    enName: "Sandbox and executor",
    zhName: "Sandbox 与 executor",
    enWhy: "The final boundary enforces the decision where the effect occurs.",
    zhWhy: "最后一道边界在副作用发生处执行决策。",
  },
];

const historyLanes: HistoryLane[] = [
  {
    icon: Eye,
    enName: "Model-visible context",
    zhName: "模型可见上下文",
    enWhy: "Selected facts shape the next sample; internal noise is omitted.",
    zhWhy: "被选择后的事实塑造下一次采样；内部噪声会被省略。",
  },
  {
    icon: Database,
    enName: "Rollout record",
    zhName: "Rollout 记录",
    enWhy: "Replay needs structured fidelity, not just rendered transcript text.",
    zhWhy: "Replay 需要结构化保真，而不是渲染后的 transcript 文本。",
  },
  {
    icon: GitBranch,
    enName: "Queryable projection",
    zhName: "可查询 projection",
    enWhy: "List, resume, and summary views read fast projections of the facts.",
    zhWhy: "列表、恢复和摘要视图读取的是事实的快速 projection。",
  },
];

const clientCopy = {
  tui: {
    en: "Terminal UI",
    zh: "终端 UI",
    enHint: "Streams events and approval prompts.",
    zhHint: "流式渲染事件和审批请求。",
  },
  exec: {
    en: "Headless exec",
    zh: "Headless exec",
    enHint: "Needs deterministic output and exit behavior.",
    zhHint: "需要确定性的输出和退出行为。",
  },
  app: {
    en: "App-server",
    zh: "App-server",
    enHint: "Maps runtime facts into protocol notifications.",
    zhHint: "把 runtime 事实映射成协议通知。",
  },
} satisfies Record<ClientKey, Record<string, string>>;

const uiCopy = {
  en: {
    eyebrow: "Chapter 1 interactive model",
    title: "Bounded Agent OS map",
    dek: "Step through the path that exists, then inspect the authority stack that prevents the path that must not exist.",
    flow: "Runtime path",
    authority: "Authority stack",
    play: "Play",
    pause: "Pause",
    previous: "Step back",
    step: "Step forward",
    reset: "Reset",
    clientLabel: "Client surface",
    now: "Current responsibility",
    stateIntro: "Current visual state",
    negative: "No direct model-to-shell path",
    negativeDetail:
      "The model can propose an effect, but authority is evaluated elsewhere.",
    source: "Source anatomy",
    sourceDetail:
      "The public contract, session facade, event stream, and rollout record are separate source anchors for the same architectural bet.",
    sourceItems: [
      "Protocol shapes operations and events",
      "Session facade owns turn orchestration",
      "Policy gates decide dangerous effects",
      "History projections separate context, replay, and listing",
      "Rollout preserves replayable evidence",
    ],
    histories: "Three histories",
    authorityLead:
      "Authority is not a single allow flag. Each layer narrows or explains the decision before execution.",
    passed: "passed",
    current: "current",
    queued: "queued",
  },
  zh: {
    eyebrow: "第 1 章交互模型",
    title: "有边界 Agent OS 地图",
    dek: "先走一遍真实存在的路径，再查看权限栈如何阻断那条不该存在的路径。",
    flow: "Runtime 路径",
    authority: "权限栈",
    play: "播放",
    pause: "暂停",
    previous: "后退一步",
    step: "前进一步",
    reset: "重置",
    clientLabel: "客户端接入面",
    now: "当前职责",
    stateIntro: "当前视觉状态",
    negative: "模型不能直达 shell",
    negativeDetail:
      "模型可以提出副作用，但执行权限由另一层评估。",
    source: "源码解剖",
    sourceDetail:
      "公共契约、session 门面、event stream 和 rollout record 是同一个架构赌注的不同源码锚点。",
    sourceItems: [
      "Protocol 定义 operation 和 event 形状",
      "Session facade 拥有 turn 编排",
      "Policy gate 决定危险副作用",
      "History projection 区分上下文、replay 和列表",
      "Rollout 保存可 replay 证据",
    ],
    histories: "三种历史",
    authorityLead:
      "权限不是一个 allow 布尔值。每一层都会在执行前收紧或解释这次决策。",
    passed: "已通过",
    current: "当前",
    queued: "等待",
  },
} satisfies Record<Lang, Record<string, string | string[]>>;

function getText(
  dictionary: Record<string, string | string[]>,
  key: string,
): string {
  const value = dictionary[key];
  return typeof value === "string" ? value : "";
}

function getList(
  dictionary: Record<string, string | string[]>,
  key: string,
): string[] {
  const value = dictionary[key];
  return Array.isArray(value) ? value : [];
}

function advanceStep(step: number): number {
  return (step + 1) % stages.length;
}

function retreatStep(step: number): number {
  return (step + stages.length - 1) % stages.length;
}

export default function BoundedAgentOSMap({
  lang = "en",
}: {
  lang?: Lang;
}) {
  const [view, setView] = useState<ViewMode>("flow");
  const [client, setClient] = useState<ClientKey>("tui");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const t = uiCopy[lang];
  const current = stages[step];
  const CurrentIcon = current.icon;
  const viewLabel = view === "flow" ? getText(t, "flow") : getText(t, "authority");
  const clientLabel = clientCopy[client][lang];
  const currentTitle = lang === "en" ? current.enTitle : current.zhTitle;
  const currentDetail = lang === "en" ? current.enDetail : current.zhDetail;
  const stateSummary =
    lang === "en"
      ? `${getText(t, "stateIntro")}: ${viewLabel}. ${getText(t, "now")}: ${currentTitle}. ${clientLabel}: ${
          clientCopy[client][lang === "en" ? "enHint" : "zhHint"]
        }`
      : `${getText(t, "stateIntro")}：${viewLabel}。${getText(t, "now")}：${currentTitle}。${clientLabel}：${
          clientCopy[client][lang === "en" ? "enHint" : "zhHint"]
        }`;

  const visibleStages = useMemo(() => {
    return stages.map((stage, index) => ({
      ...stage,
      state:
        index < step ? "passed" : index === step ? "current" : "queued",
    }));
  }, [step]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = window.setInterval(() => {
      setStep((value) => advanceStep(value));
    }, 1400);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <section
      className="chapter-visual bounded-os-map"
      aria-describedby="bounded-os-map-summary bounded-os-map-state"
      aria-labelledby="bounded-os-map-title"
    >
      <div className="chapter-visual__header">
        <div>
          <p className="chapter-visual__eyebrow">
            <Layers size={16} strokeWidth={2} aria-hidden="true" />
            {getText(t, "eyebrow")}
          </p>
          <h3 id="bounded-os-map-title">{getText(t, "title")}</h3>
          <p id="bounded-os-map-summary">{getText(t, "dek")}</p>
        </div>
        <div className="chapter-visual__controls" aria-label="Visual controls">
          <div
            aria-label={viewLabel}
            className="chapter-visual__segmented"
          >
            {(["flow", "authority"] as const).map((candidate) => (
              <button
                aria-pressed={view === candidate}
                className={view === candidate ? "is-active" : ""}
                key={candidate}
                onClick={() => setView(candidate)}
                type="button"
              >
                {candidate === "flow"
                  ? getText(t, "flow")
                  : getText(t, "authority")}
              </button>
            ))}
          </div>
          <div className="chapter-visual__icon-row">
            <button
              aria-label={isPlaying ? getText(t, "pause") : getText(t, "play")}
              className="chapter-visual__icon-button"
              onClick={() => setIsPlaying((value) => !value)}
              title={isPlaying ? getText(t, "pause") : getText(t, "play")}
              type="button"
            >
              {isPlaying ? (
                <Pause size={17} strokeWidth={2.2} aria-hidden="true" />
              ) : (
                <Play size={17} strokeWidth={2.2} aria-hidden="true" />
              )}
            </button>
            <button
              aria-label={getText(t, "previous")}
              className="chapter-visual__icon-button"
              onClick={() => {
                setIsPlaying(false);
                setStep((value) => retreatStep(value));
              }}
              title={getText(t, "previous")}
              type="button"
            >
              <ChevronLeft size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              aria-label={getText(t, "step")}
              className="chapter-visual__icon-button"
              onClick={() => {
                setIsPlaying(false);
                setStep((value) => advanceStep(value));
              }}
              title={getText(t, "step")}
              type="button"
            >
              <StepForward size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              aria-label={getText(t, "reset")}
              className="chapter-visual__icon-button"
              onClick={() => {
                setIsPlaying(false);
                setStep(0);
              }}
              title={getText(t, "reset")}
              type="button"
            >
              <RotateCcw size={17} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <p
        aria-live="polite"
        className="chapter-visual__sr-status"
        id="bounded-os-map-state"
      >
        {stateSummary}
      </p>

      <div className="bounded-os-map__client-strip">
        <span>
          <Eye size={15} strokeWidth={2} aria-hidden="true" />
          {getText(t, "clientLabel")}
        </span>
        <div className="bounded-os-map__client-buttons">
          {(["tui", "exec", "app"] as const).map((key) => (
            <button
              aria-pressed={client === key}
              className={client === key ? "is-active" : ""}
              key={key}
              onClick={() => setClient(key)}
              title={clientCopy[key][lang === "en" ? "enHint" : "zhHint"]}
              type="button"
            >
              {clientCopy[key][lang]}
            </button>
          ))}
        </div>
      </div>

      {view === "flow" ? (
        <div className="bounded-os-map__flow" data-active-role={current.role}>
          <div className="bounded-os-map__nodes">
            {visibleStages.map((stage, index) => {
              const Icon = stage.icon;
              const title = lang === "en" ? stage.enTitle : stage.zhTitle;
              const detail = lang === "en" ? stage.enDetail : stage.zhDetail;
              return (
                <button
                  aria-current={index === step ? "step" : undefined}
                  className={`bounded-os-node is-${stage.state}`}
                  key={stage.id}
                  onClick={() => {
                    setStep(index);
                    setIsPlaying(false);
                  }}
                  title={detail}
                  type="button"
                >
                  <span className="bounded-os-node__icon">
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="bounded-os-node__body">
                    <span>{title}</span>
                    <small>{detail}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bounded-os-map__blocked-path">
            <div>
              <XCircle size={20} strokeWidth={2.2} aria-hidden="true" />
              <strong>{getText(t, "negative")}</strong>
              <p>{getText(t, "negativeDetail")}</p>
            </div>
            <div className="bounded-os-map__strike" aria-hidden="true" />
          </div>
        </div>
      ) : (
        <div className="bounded-os-map__authority">
          <p>{getText(t, "authorityLead")}</p>
          <div className="bounded-os-map__stack">
            {authorityLayers.map((layer, index) => {
              const Icon = layer.icon;
              const layerState =
                index < Math.min(step, authorityLayers.length - 1)
                  ? "passed"
                  : index === Math.min(step, authorityLayers.length - 1)
                    ? "current"
                    : "queued";
              return (
                <button
                  className={`bounded-os-layer is-${layerState}`}
                  key={layer.enName}
                  onClick={() => {
                    setStep(index);
                    setIsPlaying(false);
                  }}
                  type="button"
                >
                  <span>
                    <Icon size={19} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <strong>{lang === "en" ? layer.enName : layer.zhName}</strong>
                  <small>{lang === "en" ? layer.enWhy : layer.zhWhy}</small>
                  <em>
                    {layerState === "passed"
                      ? getText(t, "passed")
                      : layerState === "current"
                        ? getText(t, "current")
                        : getText(t, "queued")}
                  </em>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <aside className="bounded-os-map__inspector">
        <div>
          <p className="bounded-os-map__inspector-label">
            <CheckCircle size={15} strokeWidth={2} aria-hidden="true" />
            {getText(t, "now")}
          </p>
          <h4>{currentTitle}</h4>
          <p>{currentDetail}</p>
        </div>
        <div>
          <p className="bounded-os-map__inspector-label">
            <CurrentIcon size={15} strokeWidth={2} aria-hidden="true" />
            {clientCopy[client][lang]}
          </p>
          <p>{clientCopy[client][lang === "en" ? "enHint" : "zhHint"]}</p>
        </div>
        <div>
          <p className="bounded-os-map__inspector-label">
            <Database size={15} strokeWidth={2} aria-hidden="true" />
            {getText(t, "source")}
          </p>
          <p>{getText(t, "sourceDetail")}</p>
          <ul>
            {getList(t, "sourceItems").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="bounded-os-map__inspector-label">
            <GitBranch size={15} strokeWidth={2} aria-hidden="true" />
            {getText(t, "histories")}
          </p>
          <div className="bounded-os-map__history-lanes">
            {historyLanes.map((lane) => {
              const Icon = lane.icon;
              return (
                <article key={lane.enName}>
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  <strong>{lang === "en" ? lane.enName : lane.zhName}</strong>
                  <span>{lang === "en" ? lane.enWhy : lane.zhWhy}</span>
                </article>
              );
            })}
          </div>
        </div>
      </aside>
    </section>
  );
}
