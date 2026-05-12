# 视觉实现台账

本台账跟踪 [视觉体验规范](visual-experience-spec) 与 `src/visual/visual-specs.mjs`
中的 canonical records。`npm run check:visual-spec` 会校验记录本身，并验证本台账
匹配 canonical component、phase、fallback、source-anchor source 与 ledger 状态机；
本台账记录读者可见网站是否已经实现、验证并通过 review。

状态值：

- `planned`：canonical record 已存在，组件尚未实现；
- `implemented`：组件已在本地存在，并接入章节 route；
- `verified`：本地验证、截图、浏览器检查和 accessibility 检查通过；
- `approved`：必需 reviewer agents 批准发布。

每个非 planned 行都必须具备以下证据：

- 320、375、768、1024、1440 px 截图；
- light 和 dark mode 证据；
- 英文和中文证据；
- keyboard、touch、focus、reduced-motion、contrast、screen-reader summary 证据；
- 每个有意义状态的 interaction probe；
- bundle-scope 证据，证明无关章节不加载该 island；
- 链接到结构化 anchors 的 source anatomy 证据；
- reviewer approvals 和未解决 residual risks。

| Record ID | Phase | Primary Interactive | Fallback / Motion | Source Anchors | 状态 | 证据 | Residual Risk | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ch01-architectural-bet` | P1 pilot | BoundedAgentOSMap | static-svg / step | canonical record 中的结构化 anchors | approved | `src/components/visual/BoundedAgentOSMap.tsx`; `docs/codex-from-source/chapter-01.mdx`; `docs/zh/codex-from-source/chapter-01.mdx`; `docs/codex-from-source/rewrite/evidence/ch01/en-light-320.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-light-375.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-light-768.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-light-1024.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-light-1440.png`; `docs/codex-from-source/rewrite/evidence/ch01/zh-light-320.png`; `docs/codex-from-source/rewrite/evidence/ch01/zh-light-1440.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-dark-375.png`; `docs/codex-from-source/rewrite/evidence/ch01/zh-dark-1440.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-authority-768.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-appserver-768.png`; `docs/codex-from-source/rewrite/evidence/ch01/en-reduced-motion-375.png`; local browser probe verified hydration, no Mermaid, SVG icons, no visual overflow, readable mobile viewport evidence, authority stack state, app-server state, dark mode, reduced motion, live status, no tab-role misuse, and chapter-scoped island loading; `npm run verify` passed | Later chapters intentionally remain planned until their chapter pass; no known Chapter 1 gate remains after browser evidence | approved by final reviewers: Boyle the 2nd, Dalton the 2nd, Galileo the 2nd; earlier blockers addressed from Descartes the 2nd, Averroes the 2nd, Fermat the 2nd, Gibbs the 2nd, Poincare the 2nd, Jason the 2nd |
| `ch02-startup-router` | P2 foundations | StartupRouteTimeline | static-svg / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch03-constraint-envelope` | P2 foundations | ConstraintEnvelopeBuilder | static-svg / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch04-protocol-boundary` | P2 foundations | SubmissionEventContractExplorer | static-svg / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch05-durable-thread-ledger` | P2 foundations | DurableThreadLedger | static-svg / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch06-turn-loop` | P1 pilot | TurnLoopSimulator | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch07-streaming-provider` | P2 core | StreamingProviderComparator | table / scrubbable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch08-rollout-trace` | P2 core | RolloutTraceReplay | step-list / scrubbable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch09-tool-routing` | P1 pilot | ToolSpecToHandlerRouter | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch10-exec-backend` | P2 core | ExecutionBackendPipeline | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch11-patch-workbench` | P2 core | PatchApplicationWorkbench | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch12-human-gate-stack` | P1 pilot | HumanGateStack | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch13-containment-boundary` | P2 core | ContainmentBoundaryExplorer | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch14-json-rpc-contract` | P2 core | JsonRpcContractMap | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch15-client-reachability` | P3 surfaces | ClientReachabilityMatrix | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch16-event-renderer` | P1 pilot | EventRendererLab | static-svg / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch17-mcp-trust-plane` | P3 extensions | ExternalToolTrustPlane | static-svg / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch18-extension-provenance` | P3 extensions | ExtensionProvenanceExplorer | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch19-compatibility-lanes` | P3 advanced | CompatibilityLaneBoard | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch20-agent-graph` | P1 pilot | AgentGraphOrchestrator | static-svg / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch21-remote-task-contract` | P3 advanced | RemoteTaskContractTimeline | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch22-memory-side-channel` | P3 advanced | MemorySideChannelExplorer | step-list / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch23-generated-contracts` | P3 governance | GeneratedContractDriftViewer | step-list / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch24-release-artifact` | P3 governance | ReleaseArtifactConveyor | step-list / playable | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `ch25-policy-lanes` | P3 governance | PolicyLaneDashboard | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
| `epilogue-transfer-atlas` | P4 synthesis | TransferPatternAtlas | table / step | canonical record 中的结构化 anchors | planned | pending all gates | not implemented | pending |
