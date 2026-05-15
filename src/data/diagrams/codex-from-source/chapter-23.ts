import type {
  FlowSpec,
  SequenceSpec,
} from "../../../components/visual/diagrams/types";

// Replaces the build-surface map (graph TD).
export const buildSurfaceMap: FlowSpec = {
  cols: 5,
  rows: 4,
  width: 880,
  height: 500,
  nodes: [
    {
      id: "Cargo",
      label: { en: "Cargo workspace", zh: "Cargo workspace" },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 0,
    },
    {
      id: "Bazel",
      label: { en: "Bazel overlay", zh: "Bazel overlay" },
      shape: "rounded",
      tone: "info",
      col: 3,
      row: 0,
    },
    {
      id: "Release",
      label: {
        en: "GitHub release workflow",
        zh: "GitHub release workflow",
      },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 1,
    },
    {
      id: "Crates",
      label: {
        en: "Rust crates and binaries",
        zh: "Rust crate 与二进制",
      },
      shape: "rounded",
      tone: "default",
      col: 1,
      row: 1,
    },
    {
      id: "Lock",
      label: {
        en: "Resolved dependency graph",
        zh: "已解析依赖图",
      },
      shape: "rounded",
      tone: "muted",
      col: 2,
      row: 1,
    },
    {
      id: "Hermetic",
      label: {
        en: "Hermetic CI and release verification",
        zh: "Hermetic CI 与发布验证",
      },
      shape: "rounded",
      tone: "info",
      col: 4,
      row: 1,
    },
    {
      id: "Artifacts",
      label: { en: "Release artifacts", zh: "Release artifacts" },
      shape: "pill",
      tone: "success",
      col: 0,
      row: 2,
    },
    {
      id: "Schemas",
      label: {
        en: "Generated contract schemas",
        zh: "生成的契约 schema",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 2,
    },
    {
      id: "Clients",
      label: {
        en: "SDKs, app-server clients, config authors",
        zh: "SDK、app-server 客户端、配置作者",
      },
      shape: "pill",
      tone: "warning",
      col: 2,
      row: 3,
      colSpan: 2,
    },
  ],
  edges: [
    { from: "Cargo", to: "Crates" },
    { from: "Cargo", to: "Lock" },
    { from: "Cargo", to: "Release", tone: "success" },
    { from: "Bazel", to: "Crates" },
    { from: "Bazel", to: "Lock" },
    { from: "Bazel", to: "Hermetic", tone: "info" },
    { from: "Crates", to: "Schemas" },
    { from: "Schemas", to: "Clients" },
    { from: "Release", to: "Artifacts", tone: "success" },
    {
      from: "Hermetic",
      to: "Artifacts",
      label: { en: "verifies", zh: "verifies" },
      style: "dashed",
      tone: "info",
    },
  ],
  legend: {
    en: "One source graph feeds two build interfaces; one runtime graph emits several public contracts.",
    zh: "同一份源码图喂给两套构建接口；同一份运行时图吐出多个公开契约。",
  },
};

// Replaces the developer flow (flowchart TD: dev -> cargo + bazel mirrored).
export const developerFlow: FlowSpec = {
  cols: 3,
  rows: 4,
  width: 720,
  height: 500,
  nodes: [
    {
      id: "Dev",
      label: {
        en: "Developer changes a crate",
        zh: "开发者修改一个 crate",
      },
      shape: "rounded",
      tone: "accent",
      col: 1,
      row: 0,
    },
    {
      id: "CargoTest",
      label: { en: "Cargo test path", zh: "Cargo test 路径" },
      shape: "rounded",
      tone: "success",
      col: 0,
      row: 1,
    },
    {
      id: "BazelTarget",
      label: {
        en: "Bazel mirrored target",
        zh: "Bazel 镜像 target",
      },
      shape: "rounded",
      tone: "info",
      col: 2,
      row: 1,
    },
    {
      id: "Launcher",
      label: {
        en: "Workspace-root launcher",
        zh: "Workspace-root launcher",
      },
      shape: "rounded",
      tone: "info",
      col: 1,
      row: 2,
    },
    {
      id: "Matrix",
      label: {
        en: "Platform and release matrix",
        zh: "平台与发布矩阵",
      },
      shape: "rounded",
      tone: "warning",
      col: 2,
      row: 2,
    },
    {
      id: "SameAssumptions",
      label: {
        en: "Cargo-like paths, snapshots, env",
        zh: "Cargo 风格的 path、snapshot、env",
      },
      shape: "note",
      tone: "muted",
      col: 1,
      row: 3,
    },
    {
      id: "Confidence",
      label: { en: "Release confidence", zh: "发布信心" },
      shape: "pill",
      tone: "success",
      col: 2,
      row: 3,
    },
  ],
  edges: [
    { from: "Dev", to: "CargoTest", tone: "success" },
    { from: "Dev", to: "BazelTarget", tone: "info" },
    { from: "BazelTarget", to: "Launcher" },
    { from: "BazelTarget", to: "Matrix" },
    { from: "Launcher", to: "SameAssumptions" },
    { from: "Matrix", to: "Confidence", tone: "success" },
  ],
  legend: {
    en: "The Bazel overlay derives from product structure; the launcher restores Cargo-like assumptions tests already expect.",
    zh: "Bazel overlay 从产品结构推导；launcher 只恢复测试本来就该有的 Cargo 风格假设。",
  },
};

// Replaces the schema drift sequenceDiagram.
export const schemaDriftSequence: SequenceSpec = {
  actors: [
    {
      id: "Type",
      label: { en: "Runtime type", zh: "Runtime type" },
      tone: "accent",
    },
    {
      id: "Gen",
      label: { en: "Schema generator", zh: "Schema generator" },
      tone: "info",
    },
    {
      id: "File",
      label: { en: "Checked-in schema", zh: "已提交 schema" },
      tone: "warning",
    },
    {
      id: "CI",
      label: { en: "Drift check", zh: "Drift check" },
      tone: "danger",
    },
    {
      id: "Client",
      label: { en: "External client", zh: "外部客户端" },
      tone: "success",
    },
  ],
  steps: [
    {
      from: "Type",
      to: "Gen",
      label: { en: "expose contract shape", zh: "暴露契约形状" },
    },
    {
      from: "Gen",
      to: "File",
      label: { en: "write canonical schema", zh: "写入规范 schema" },
    },
    {
      from: "CI",
      to: "File",
      label: {
        en: "compare committed output",
        zh: "比对已提交输出",
      },
      tone: "danger",
    },
    {
      from: "File",
      to: "Client",
      label: {
        en: "document machine-readable contract",
        zh: "记录机器可读契约",
      },
      tone: "success",
    },
  ],
  legend: {
    en: "Generated schemas turn internal type changes into reviewable client-contract changes.",
    zh: "生成 schema 把内部类型变化变成可 review 的客户端契约变化。",
  },
};
