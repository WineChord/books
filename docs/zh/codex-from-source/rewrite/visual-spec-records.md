# 章节 VisualSpec 记录

机器可读 canonical records 位于 `src/visual/visual-specs.mjs`。本页是给 reviewer
看的索引。`npm run check:visual-spec` 会验证下表每一行的 route、component、
fallback、motion policy、target phase 和 comprehension-check count 都匹配 canonical
record。

| Record ID | Route | Primary Interactive | Fallback / Motion | Phase | Checks |
| --- | --- | --- | --- | --- | --- |
| `ch01-architectural-bet` | `zh/codex-from-source/chapter-01` | BoundedAgentOSMap | static-svg / step | P1 pilot | 2 |
| `ch02-startup-router` | `zh/codex-from-source/chapter-02` | StartupRouteTimeline | static-svg / step | P2 foundations | 2 |
| `ch03-constraint-envelope` | `zh/codex-from-source/chapter-03` | ConstraintEnvelopeBuilder | static-svg / step | P2 foundations | 2 |
| `ch04-protocol-boundary` | `zh/codex-from-source/chapter-04` | SubmissionEventContractExplorer | static-svg / step | P2 foundations | 2 |
| `ch05-durable-thread-ledger` | `zh/codex-from-source/chapter-05` | DurableThreadLedger | static-svg / step | P2 foundations | 2 |
| `ch06-turn-loop` | `zh/codex-from-source/chapter-06` | TurnLoopSimulator | step-list / playable | P1 pilot | 2 |
| `ch07-streaming-provider` | `zh/codex-from-source/chapter-07` | StreamingProviderComparator | table / scrubbable | P2 core | 2 |
| `ch08-rollout-trace` | `zh/codex-from-source/chapter-08` | RolloutTraceReplay | step-list / scrubbable | P2 core | 2 |
| `ch09-tool-routing` | `zh/codex-from-source/chapter-09` | ToolSpecToHandlerRouter | step-list / playable | P1 pilot | 2 |
| `ch10-exec-backend` | `zh/codex-from-source/chapter-10` | ExecutionBackendPipeline | step-list / playable | P2 core | 2 |
| `ch11-patch-workbench` | `zh/codex-from-source/chapter-11` | PatchApplicationWorkbench | step-list / playable | P2 core | 2 |
| `ch12-human-gate-stack` | `zh/codex-from-source/chapter-12` | HumanGateStack | step-list / playable | P1 pilot | 2 |
| `ch13-containment-boundary` | `zh/codex-from-source/chapter-13` | ContainmentBoundaryExplorer | table / step | P2 core | 2 |
| `ch14-json-rpc-contract` | `zh/codex-from-source/chapter-14` | JsonRpcContractMap | step-list / playable | P2 core | 2 |
| `ch15-client-reachability` | `zh/codex-from-source/chapter-15` | ClientReachabilityMatrix | table / step | P3 surfaces | 2 |
| `ch16-event-renderer` | `zh/codex-from-source/chapter-16` | EventRendererLab | static-svg / playable | P1 pilot | 2 |
| `ch17-mcp-trust-plane` | `zh/codex-from-source/chapter-17` | ExternalToolTrustPlane | static-svg / step | P3 extensions | 2 |
| `ch18-extension-provenance` | `zh/codex-from-source/chapter-18` | ExtensionProvenanceExplorer | table / step | P3 extensions | 2 |
| `ch19-compatibility-lanes` | `zh/codex-from-source/chapter-19` | CompatibilityLaneBoard | table / step | P3 advanced | 2 |
| `ch20-agent-graph` | `zh/codex-from-source/chapter-20` | AgentGraphOrchestrator | static-svg / playable | P1 pilot | 2 |
| `ch21-remote-task-contract` | `zh/codex-from-source/chapter-21` | RemoteTaskContractTimeline | step-list / playable | P3 advanced | 2 |
| `ch22-memory-side-channel` | `zh/codex-from-source/chapter-22` | MemorySideChannelExplorer | step-list / step | P3 advanced | 2 |
| `ch23-generated-contracts` | `zh/codex-from-source/chapter-23` | GeneratedContractDriftViewer | step-list / step | P3 governance | 2 |
| `ch24-release-artifact` | `zh/codex-from-source/chapter-24` | ReleaseArtifactConveyor | step-list / playable | P3 governance | 2 |
| `ch25-policy-lanes` | `zh/codex-from-source/chapter-25` | PolicyLaneDashboard | table / step | P3 governance | 2 |
| `epilogue-transfer-atlas` | `zh/codex-from-source/epilogue` | TransferPatternAtlas | table / step | P4 synthesis | 2 |

reviewer 应检查 `src/visual/visual-specs.mjs` 中的完整记录。checker 还会强制每条
canonical 记录拥有指向具体源码行的结构化 source anchors，并至少包含两个带 expected
answers 的 comprehension checks；每个 source evidence 都必须引用同一 record 中的
source path。
