# Rewrite Workspace

This workspace records the execution of the full rewrite brief preserved in
[Book Rewrite Prompt](../book-rewrite-prompt). It is not the final book. It is
the research and planning layer that must exist before the chapters are written
from scratch.

Source snapshot: `569ff6a1c400bd514ff79f5f1050a684dc3afde3`.

## Phase Status

| Phase | Status | Artifact |
| --- | --- | --- |
| Phase 1: Exploration | Complete | [Subsystem research notes](#phase-1-research-notes) |
| Phase 2: Audience and Positioning | Complete | [Audience and positioning](positioning) |
| Phase 3: Structure | Complete | [Proposed outline](outline) |
| Phase 4: Writing | Complete | English and Chinese chapters 1-25 plus epilogue |
| Phase 5: Editorial Review | Complete | Multiple reviewer passes |
| Phase 6: Revision | Complete | Review feedback applied |
| Phase 7: Source Code Audit | Complete | Pseudocode and source leakage audited |
| Visual Experience Spec | Active | [Visual comprehension and interaction standard](visual-experience-spec), [chapter records](visual-spec-records), [implementation ledger](visual-implementation-ledger) |

## Phase 1 Research Notes

Each file below is a raw subsystem analysis document. These are not chapters
and should not be polished into the final book directly.

- [Entrypoints, config, and auth](research/entrypoints-config-auth)
- [Core runtime and state](research/core-runtime-state)
- [Model providers and backend clients](research/model-backend)
- [Tool execution and mutation paths](research/tools-execution)
- [Security, permissions, and sandboxing](research/security-sandbox)
- [App-server and SDKs](research/app-server-sdk)
- [Terminal UI and rendering](research/tui-rendering)
- [Extensions, MCP, skills, and plugins](research/extensions)
- [Multi-agent, cloud tasks, memories, and trace](research/multi-agent-cloud-memory-trace)
- [Build, release, and governance](research/build-release-governance)

## Current Status

The outline was approved, the chapters were written, and the publication pass
now lives in the main book pages. Future work should update the final chapters,
source atlas, and implementation reference first.

The next major improvement is the visual comprehension layer. The governing
standard is [Visual Experience Spec](visual-experience-spec): every central
runtime concept should become a beautiful, interactive, accessible explanation,
not merely prose plus Mermaid.

The canonical machine-readable contract lives in `src/visual/visual-specs.mjs`;
the reviewer-facing index is [Chapter VisualSpec Records](visual-spec-records).
Implementation status must be tracked in the [Visual Implementation Ledger](visual-implementation-ledger).
