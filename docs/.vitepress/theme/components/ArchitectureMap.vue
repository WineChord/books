<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData, withBase } from "vitepress";

const enNodes = [
  {
    id: "entry",
    label: "Entry Surfaces",
    link: "/codex-from-source/chapter-02.html",
    detail:
      "The npm shim and Rust router narrow every command path before configuration and runtime work begin.",
  },
  {
    id: "protocol",
    label: "Protocol",
    link: "/codex-from-source/chapter-04.html",
    detail:
      "Submissions and events are the stable contract between clients and the agent runtime.",
  },
  {
    id: "session",
    label: "Session Runtime",
    link: "/codex-from-source/chapter-05.html",
    detail:
      "A Codex session owns configuration, history, skills, plugins, tools, and the event queue.",
  },
  {
    id: "turn",
    label: "Turn Loop",
    link: "/codex-from-source/chapter-06.html",
    detail:
      "Each user turn prepares context, samples the model, dispatches tools, records observations, and repeats.",
  },
  {
    id: "tools",
    label: "Tools",
    link: "/codex-from-source/chapter-09.html",
    detail:
      "Tool handlers describe what the model may call and how a call becomes a supervised side effect.",
  },
  {
    id: "boundary",
    label: "Approvals and Sandboxes",
    link: "/codex-from-source/chapter-12.html",
    detail:
      "Hooks, approval policy, and platform sandboxes bound risky actions before they mutate the world.",
  },
  {
    id: "extensions",
    label: "MCP and Skills",
    link: "/codex-from-source/chapter-17.html",
    detail:
      "External tools, plugins, apps, and skills extend the runtime without changing the central turn loop.",
  },
  {
    id: "surface",
    label: "User Surfaces",
    link: "/codex-from-source/chapter-14.html",
    detail:
      "The TUI and app-server consume the same event stream but present it to different kinds of clients.",
  },
];

const zhNodes = [
  {
    id: "entry",
    label: "入口接入面",
    link: "/zh/codex-from-source/chapter-02.html",
    detail:
      "npm shim 和 Rust router 会先收窄命令路径，然后才进入配置与运行时。",
  },
  {
    id: "protocol",
    label: "协议层",
    link: "/zh/codex-from-source/chapter-04.html",
    detail:
      "Submissions 和 events 是客户端与 Agent runtime 之间稳定的契约。",
  },
  {
    id: "session",
    label: "Session Runtime",
    link: "/zh/codex-from-source/chapter-05.html",
    detail:
      "一个 Codex session 拥有配置、历史、skills、plugins、tools 和 event queue。",
  },
  {
    id: "turn",
    label: "Turn Loop",
    link: "/zh/codex-from-source/chapter-06.html",
    detail:
      "一次用户 turn 会准备上下文、采样模型、分发工具、记录观察，然后决定继续或停止。",
  },
  {
    id: "tools",
    label: "工具系统",
    link: "/zh/codex-from-source/chapter-09.html",
    detail:
      "Tool handlers 描述模型能调用什么，以及一次调用如何变成受监督的副作用。",
  },
  {
    id: "boundary",
    label: "审批与沙箱",
    link: "/zh/codex-from-source/chapter-12.html",
    detail:
      "hooks、approval policy 和平台沙箱在风险动作改变世界前约束它。",
  },
  {
    id: "extensions",
    label: "MCP 与 Skills",
    link: "/zh/codex-from-source/chapter-17.html",
    detail:
      "外部工具、plugins、apps 和 skills 扩展 runtime，而不改写中心 turn loop。",
  },
  {
    id: "surface",
    label: "用户接入面",
    link: "/zh/codex-from-source/chapter-14.html",
    detail:
      "TUI 和 app-server 消费同一条 event stream，但服务不同类型的客户端。",
  },
];

const { lang } = useData();
const activeId = ref(enNodes[0].id);
const nodes = computed(() => (lang.value === "zh-CN" ? zhNodes : enNodes));
const activeNode = computed(() =>
  nodes.value.find((node) => node.id === activeId.value) ?? nodes.value[0],
);

watch(nodes, () => {
  activeId.value = "entry";
});
</script>

<template>
  <div class="architecture-map">
    <div class="architecture-map__nodes">
      <a
        v-for="node in nodes"
        :key="node.id"
        :href="withBase(node.link)"
        class="architecture-map__node"
        :class="{ 'is-active': node.id === activeId }"
        @mouseenter="activeId = node.id"
        @focus="activeId = node.id"
      >
        {{ node.label }}
      </a>
    </div>
    <div class="architecture-map__detail">
      <strong>{{ activeNode.label }}</strong>
      <p>{{ activeNode.detail }}</p>
    </div>
  </div>
</template>
