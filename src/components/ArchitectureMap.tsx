import { useMemo, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";

type Lang = "en" | "zh";

interface Props {
  lang?: Lang;
  base: string;
}

const nodes = [
  {
    id: "entry",
    label: { en: "Entry Surfaces", zh: "入口接入面" },
    href: { en: "codex-from-source/chapter-02", zh: "zh/codex-from-source/chapter-02" },
    detail: {
      en: "The npm shim and Rust router narrow every command path before configuration and runtime work begin.",
      zh: "npm shim 和 Rust router 会先收窄命令路径，然后才进入配置与运行时。",
    },
  },
  {
    id: "protocol",
    label: { en: "Protocol", zh: "协议层" },
    href: { en: "codex-from-source/chapter-04", zh: "zh/codex-from-source/chapter-04" },
    detail: {
      en: "Submissions and events are the stable contract between clients and the agent runtime.",
      zh: "Submissions 和 events 是客户端与 Agent runtime 之间稳定的契约。",
    },
  },
  {
    id: "runtime",
    label: { en: "Turn Runtime", zh: "Turn Runtime" },
    href: { en: "codex-from-source/chapter-06", zh: "zh/codex-from-source/chapter-06" },
    detail: {
      en: "Each turn resolves context, samples the model, dispatches tools, records observations, and decides whether to continue.",
      zh: "一次 turn 会解析上下文、采样模型、分发工具、记录观察，并决定是否继续。",
    },
  },
  {
    id: "tools",
    label: { en: "Tools", zh: "工具系统" },
    href: { en: "codex-from-source/chapter-09", zh: "zh/codex-from-source/chapter-09" },
    detail: {
      en: "Tool specs, routing, approvals, sandboxing, execution, and persistence turn suggestions into governed effects.",
      zh: "tool spec、routing、approval、sandbox、execution 和 persistence 把建议变成受治理的副作用。",
    },
  },
  {
    id: "clients",
    label: { en: "Clients", zh: "客户端" },
    href: { en: "codex-from-source/chapter-14", zh: "zh/codex-from-source/chapter-14" },
    detail: {
      en: "The TUI, app-server, SDKs, and remote control paths share the same runtime contract.",
      zh: "TUI、app-server、SDK 和远程控制路径共享同一个 runtime contract。",
    },
  },
  {
    id: "extensions",
    label: { en: "Extensions", zh: "扩展" },
    href: { en: "codex-from-source/chapter-17", zh: "zh/codex-from-source/chapter-17" },
    detail: {
      en: "MCP, skills, plugins, connectors, and typed extensions add capability through explicit trust planes.",
      zh: "MCP、skills、plugins、connectors 和 typed extensions 通过显式信任平面增加能力。",
    },
  },
];

export default function ArchitectureMap({ lang = "en", base }: Props) {
  const [active, setActive] = useState(nodes[0].id);
  const touchTarget = useRef<string | null>(null);
  const activeNode = useMemo(
    () => nodes.find((node) => node.id === active) ?? nodes[0],
    [active],
  );
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  function hasCoarsePointer() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  function previewOnPointer(
    event: PointerEvent<HTMLAnchorElement>,
    nodeId: string,
  ) {
    if (event.pointerType !== "touch") {
      setActive(nodeId);
    }
  }

  function rememberPointer(
    event: PointerEvent<HTMLAnchorElement>,
    nodeId: string,
  ) {
    touchTarget.current = event.pointerType === "touch" ? nodeId : null;
  }

  function previewOnFocus(nodeId: string) {
    if (!touchTarget.current && !hasCoarsePointer()) {
      setActive(nodeId);
    }
  }

  function previewOnTouch(
    event: MouseEvent<HTMLAnchorElement>,
    nodeId: string,
  ) {
    const fromTouch = touchTarget.current === nodeId || hasCoarsePointer();
    touchTarget.current = null;

    if (!fromTouch || nodeId === active) {
      return;
    }
    event.preventDefault();
    setActive(nodeId);
  }

  return (
    <div className="architecture-map" aria-label="Architecture map">
      <div className="architecture-map__nodes">
        {nodes.map((node) => (
          <a
            key={node.id}
            href={`${normalizedBase}${node.href[lang]}.html`}
            className={`architecture-map__node ${node.id === active ? "is-active" : ""}`}
            aria-current={node.id === active ? "true" : undefined}
            onPointerEnter={(event) => previewOnPointer(event, node.id)}
            onPointerDown={(event) => rememberPointer(event, node.id)}
            onFocus={() => previewOnFocus(node.id)}
            onClick={(event) => previewOnTouch(event, node.id)}
          >
            {node.label[lang]}
          </a>
        ))}
      </div>
      <div className="architecture-map__detail">
        <strong>{activeNode.label[lang]}</strong>
        <p>{activeNode.detail[lang]}</p>
      </div>
    </div>
  );
}
