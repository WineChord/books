# Visual Implementation Ledger

This ledger tracks implementation against the [Visual Experience Spec](visual-experience-spec)
and the canonical records in `src/visual/visual-specs.mjs`. The checker
`npm run check:visual-spec` validates the records and verifies that this ledger
matches the canonical component, phase, fallback, source-anchor source, and
ledger state machine. This ledger records whether the reader-facing site has
implemented and verified each visual.

Status values:

- `planned`: canonical record exists, component is not implemented.
- `implemented`: component exists locally and is wired to a chapter route.
- `verified`: local validation, screenshots, browser checks, and accessibility
  checks passed.
- `approved`: required reviewer agents approved publication.

Evidence required for every non-planned row:

- screenshots at 320, 375, 768, 1024, and 1440 px;
- light and dark mode evidence;
- English and Chinese evidence;
- keyboard, touch, focus, reduced-motion, contrast, and screen-reader summary
  evidence;
- interaction probe for every meaningful state;
- bundle-scope evidence showing unrelated chapters do not load the island;
- source anatomy evidence linked to structured anchors;
- reviewer approvals and unresolved residual risks.

| Record ID | Phase | Primary Interactive | Fallback / Motion | Source Anchors | Status | Evidence | Residual Risk | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ch01-architectural-bet` | P1 pilot | BoundedAgentOSMap | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch02-startup-router` | P2 foundations | StartupRouteTimeline | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch03-constraint-envelope` | P2 foundations | ConstraintEnvelopeBuilder | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch04-protocol-boundary` | P2 foundations | SubmissionEventContractExplorer | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch05-durable-thread-ledger` | P2 foundations | DurableThreadLedger | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch06-turn-loop` | P1 pilot | TurnLoopSimulator | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch07-streaming-provider` | P2 core | StreamingProviderComparator | table / scrubbable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch08-rollout-trace` | P2 core | RolloutTraceReplay | step-list / scrubbable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch09-tool-routing` | P1 pilot | ToolSpecToHandlerRouter | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch10-exec-backend` | P2 core | ExecutionBackendPipeline | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch11-patch-workbench` | P2 core | PatchApplicationWorkbench | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch12-human-gate-stack` | P1 pilot | HumanGateStack | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch13-containment-boundary` | P2 core | ContainmentBoundaryExplorer | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch14-json-rpc-contract` | P2 core | JsonRpcContractMap | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch15-client-reachability` | P3 surfaces | ClientReachabilityMatrix | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch16-event-renderer` | P1 pilot | EventRendererLab | static-svg / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch17-mcp-trust-plane` | P3 extensions | ExternalToolTrustPlane | static-svg / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch18-extension-provenance` | P3 extensions | ExtensionProvenanceExplorer | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch19-compatibility-lanes` | P3 advanced | CompatibilityLaneBoard | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch20-agent-graph` | P1 pilot | AgentGraphOrchestrator | static-svg / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch21-remote-task-contract` | P3 advanced | RemoteTaskContractTimeline | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch22-memory-side-channel` | P3 advanced | MemorySideChannelExplorer | step-list / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch23-generated-contracts` | P3 governance | GeneratedContractDriftViewer | step-list / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch24-release-artifact` | P3 governance | ReleaseArtifactConveyor | step-list / playable | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `ch25-policy-lanes` | P3 governance | PolicyLaneDashboard | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
| `epilogue-transfer-atlas` | P4 synthesis | TransferPatternAtlas | table / step | structured anchors in canonical record | planned | pending all gates | not implemented | pending |
