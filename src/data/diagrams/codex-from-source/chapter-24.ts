import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces the release graph LR (Cargo + Bazel + npm + installer + helpers).
export const releaseSurfaceMap: FlowSpec = {
  cols: 6,
  rows: 4,
  width: 960,
  height: 480,
  nodes: [
    {
      id: "CargoRelease",
      label: {
        en: "Cargo release workflow",
        zh: "Cargo release workflow",
      },
      shape: "rounded",
      tone: "accent",
      col: 0,
      row: 1,
    },
    {
      id: "BazelVerify",
      label: {
        en: "Bazel release-build verification",
        zh: "Bazel release-build 验证",
      },
      shape: "rounded",
      tone: "info",
      col: 0,
      row: 2,
    },
    {
      id: "NativeBinary",
      label: {
        en: "Native Codex binary",
        zh: "原生 Codex 二进制",
      },
      shape: "pill",
      tone: "accent",
      col: 1,
      row: 1,
    },
    {
      id: "NpmMeta",
      label: { en: "npm meta package", zh: "npm meta 包" },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 0,
    },
    {
      id: "Helpers",
      label: { en: "helper binaries", zh: "helper 二进制" },
      shape: "rounded",
      tone: "muted",
      col: 2,
      row: 3,
    },
    {
      id: "NpmPlatform",
      label: { en: "npm platform package", zh: "npm 平台包" },
      shape: "rounded",
      tone: "warning",
      col: 3,
      row: 1,
    },
    {
      id: "ReleaseArchive",
      label: { en: "release archive", zh: "release archive" },
      shape: "rounded",
      tone: "success",
      col: 3,
      row: 2,
    },
    {
      id: "Installer",
      label: {
        en: "standalone installer",
        zh: "独立安装器",
      },
      shape: "rounded",
      tone: "success",
      col: 4,
      row: 2,
    },
    {
      id: "UserCommand",
      label: { en: "user command", zh: "用户命令" },
      shape: "pill",
      tone: "default",
      col: 5,
      row: 1,
      rowSpan: 2,
    },
  ],
  edges: [
    { from: "CargoRelease", to: "NativeBinary", tone: "accent" },
    {
      from: "BazelVerify",
      to: "NativeBinary",
      label: { en: "checks assumptions", zh: "校验假设" },
      style: "dashed",
      tone: "info",
    },
    { from: "NativeBinary", to: "NpmPlatform" },
    { from: "NativeBinary", to: "ReleaseArchive" },
    { from: "NpmMeta", to: "NpmPlatform" },
    { from: "ReleaseArchive", to: "Installer" },
    { from: "Helpers", to: "NpmPlatform", tone: "muted" },
    { from: "Helpers", to: "Installer", tone: "muted" },
    { from: "NpmPlatform", to: "UserCommand", tone: "warning" },
    { from: "Installer", to: "UserCommand", tone: "success" },
  ],
  legend: {
    en: "The meta package and the standalone installer are different doors into the same product house.",
    zh: "meta package 与独立安装器是同一个产品的不同入口。",
  },
};

// Replaces the standalone installer sequenceDiagram.
export const installerArtifactSequence: SequenceSpec = {
  actors: [
    { id: "CI", label: { en: "Release CI", zh: "Release CI" }, tone: "accent" },
    {
      id: "NPM",
      label: { en: "Package staging", zh: "Package staging" },
      tone: "warning",
    },
    {
      id: "GH",
      label: { en: "Release storage", zh: "Release storage" },
      tone: "info",
    },
    {
      id: "Inst",
      label: { en: "Installer", zh: "Installer" },
      tone: "success",
    },
    {
      id: "User",
      label: { en: "User shell", zh: "User shell" },
      tone: "default",
    },
  ],
  steps: [
    {
      from: "CI",
      to: "NPM",
      label: {
        en: "assemble platform packages",
        zh: "组装平台包",
      },
    },
    {
      from: "CI",
      to: "GH",
      label: {
        en: "publish verified payloads",
        zh: "发布已验证 payload",
      },
    },
    {
      from: "Inst",
      to: "GH",
      label: {
        en: "fetch matching payload",
        zh: "拉取匹配的 payload",
      },
    },
    {
      from: "Inst",
      to: "Inst",
      label: {
        en: "verify and place binary",
        zh: "校验并放置二进制",
      },
      kind: "self",
    },
    {
      from: "User",
      to: "Inst",
      label: {
        en: "invoke stable command",
        zh: "调用稳定命令",
      },
    },
  ],
  legend: {
    en: "Standalone installs reuse the same release payloads as npm packaging instead of forking artifacts.",
    zh: "独立安装复用 npm 打包产生的 payload，而不是叉出第二套产物。",
  },
};

// Replaces the native dependency quarantine flowchart TD.
export const nativeDependencyQuarantine: FlowSpec = {
  cols: 5,
  rows: 4,
  width: 880,
  height: 460,
  nodes: [
    {
      id: "Product",
      label: { en: "Product crates", zh: "Product crate" },
      shape: "pill",
      tone: "accent",
      col: 1,
      row: 0,
      colSpan: 3,
    },
    {
      id: "Capability",
      label: {
        en: "Stable native capability",
        zh: "稳定的原生能力",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 1,
      colSpan: 3,
    },
    {
      id: "BuildBoundary",
      label: {
        en: "Build/release boundary",
        zh: "构建/发布边界",
      },
      shape: "rounded",
      tone: "warning",
      col: 1,
      row: 2,
      colSpan: 3,
    },
    {
      id: "ThirdParty",
      label: {
        en: "Third-party metadata",
        zh: "第三方元数据",
      },
      shape: "rounded",
      tone: "muted",
      col: 0,
      row: 3,
    },
    {
      id: "Patches",
      label: { en: "Patch sets", zh: "Patch 集" },
      shape: "rounded",
      tone: "muted",
      col: 1,
      row: 3,
    },
    {
      id: "Checksums",
      label: { en: "Checksum manifests", zh: "校验和清单" },
      shape: "rounded",
      tone: "muted",
      col: 2,
      row: 3,
    },
    {
      id: "Helpers",
      label: { en: "Bundled helpers", zh: "捆绑 helper" },
      shape: "rounded",
      tone: "muted",
      col: 3,
      row: 3,
    },
    {
      id: "Platform",
      label: { en: "Platform selectors", zh: "平台选择器" },
      shape: "rounded",
      tone: "muted",
      col: 4,
      row: 3,
    },
  ],
  edges: [
    { from: "Product", to: "Capability" },
    { from: "Capability", to: "BuildBoundary" },
    { from: "BuildBoundary", to: "ThirdParty" },
    { from: "BuildBoundary", to: "Patches" },
    { from: "BuildBoundary", to: "Checksums" },
    { from: "BuildBoundary", to: "Helpers" },
    { from: "BuildBoundary", to: "Platform" },
  ],
  legend: {
    en: "Product crates consume a stable capability; native complexity stays inside the release boundary.",
    zh: "产品 crate 只消费稳定能力，原生复杂性留在发布边界内。",
  },
};
