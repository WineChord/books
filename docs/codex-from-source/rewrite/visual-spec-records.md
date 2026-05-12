# Chapter VisualSpec Records

The canonical machine-readable records live in `src/visual/visual-specs.mjs`.
This page is the human-readable index for reviewers. `npm run check:visual-spec`
validates that every row below matches the canonical record for route, component,
fallback, motion policy, target phase, and comprehension-check count.

| Record ID | Route | Primary Interactive | Fallback / Motion | Phase | Checks |
| --- | --- | --- | --- | --- | --- |
| `ch01-architectural-bet` | `codex-from-source/chapter-01` | BoundedAgentOSMap | static-svg / step | P1 pilot | 2 |
| `ch02-startup-router` | `codex-from-source/chapter-02` | StartupRouteTimeline | static-svg / step | P2 foundations | 2 |
| `ch03-constraint-envelope` | `codex-from-source/chapter-03` | ConstraintEnvelopeBuilder | static-svg / step | P2 foundations | 2 |
| `ch04-protocol-boundary` | `codex-from-source/chapter-04` | SubmissionEventContractExplorer | static-svg / step | P2 foundations | 2 |
| `ch05-durable-thread-ledger` | `codex-from-source/chapter-05` | DurableThreadLedger | static-svg / step | P2 foundations | 2 |
| `ch06-turn-loop` | `codex-from-source/chapter-06` | TurnLoopSimulator | step-list / playable | P1 pilot | 2 |
| `ch07-streaming-provider` | `codex-from-source/chapter-07` | StreamingProviderComparator | table / scrubbable | P2 core | 2 |
| `ch08-rollout-trace` | `codex-from-source/chapter-08` | RolloutTraceReplay | step-list / scrubbable | P2 core | 2 |
| `ch09-tool-routing` | `codex-from-source/chapter-09` | ToolSpecToHandlerRouter | step-list / playable | P1 pilot | 2 |
| `ch10-exec-backend` | `codex-from-source/chapter-10` | ExecutionBackendPipeline | step-list / playable | P2 core | 2 |
| `ch11-patch-workbench` | `codex-from-source/chapter-11` | PatchApplicationWorkbench | step-list / playable | P2 core | 2 |
| `ch12-human-gate-stack` | `codex-from-source/chapter-12` | HumanGateStack | step-list / playable | P1 pilot | 2 |
| `ch13-containment-boundary` | `codex-from-source/chapter-13` | ContainmentBoundaryExplorer | table / step | P2 core | 2 |
| `ch14-json-rpc-contract` | `codex-from-source/chapter-14` | JsonRpcContractMap | step-list / playable | P2 core | 2 |
| `ch15-client-reachability` | `codex-from-source/chapter-15` | ClientReachabilityMatrix | table / step | P3 surfaces | 2 |
| `ch16-event-renderer` | `codex-from-source/chapter-16` | EventRendererLab | static-svg / playable | P1 pilot | 2 |
| `ch17-mcp-trust-plane` | `codex-from-source/chapter-17` | ExternalToolTrustPlane | static-svg / step | P3 extensions | 2 |
| `ch18-extension-provenance` | `codex-from-source/chapter-18` | ExtensionProvenanceExplorer | table / step | P3 extensions | 2 |
| `ch19-compatibility-lanes` | `codex-from-source/chapter-19` | CompatibilityLaneBoard | table / step | P3 advanced | 2 |
| `ch20-agent-graph` | `codex-from-source/chapter-20` | AgentGraphOrchestrator | static-svg / playable | P1 pilot | 2 |
| `ch21-remote-task-contract` | `codex-from-source/chapter-21` | RemoteTaskContractTimeline | step-list / playable | P3 advanced | 2 |
| `ch22-memory-side-channel` | `codex-from-source/chapter-22` | MemorySideChannelExplorer | step-list / step | P3 advanced | 2 |
| `ch23-generated-contracts` | `codex-from-source/chapter-23` | GeneratedContractDriftViewer | step-list / step | P3 governance | 2 |
| `ch24-release-artifact` | `codex-from-source/chapter-24` | ReleaseArtifactConveyor | step-list / playable | P3 governance | 2 |
| `ch25-policy-lanes` | `codex-from-source/chapter-25` | PolicyLaneDashboard | table / step | P3 governance | 2 |
| `epilogue-transfer-atlas` | `codex-from-source/epilogue` | TransferPatternAtlas | table / step | P4 synthesis | 2 |

Reviewers should inspect `src/visual/visual-specs.mjs` for the full record body.
The checker also enforces that every canonical record has structured source
anchors on concrete source lines, and at least two comprehension checks whose
source evidence cites paths from that same record.
