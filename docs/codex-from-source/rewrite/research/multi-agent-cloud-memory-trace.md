# Research Notes: Multi-Agent, Cloud Tasks, Memories, and Trace

Scope: `codex-rs/agent-graph-store`, `codex-rs/agent-identity`, `codex-rs/cloud-tasks`, `codex-rs/cloud-tasks-client`, `codex-rs/cloud-tasks-mock-client`, `codex-rs/external-agent-migration`, `codex-rs/external-agent-sessions`, `codex-rs/memories`, `codex-rs/rollout-trace`, and `codex-rs/thread-manager-sample`.

## Module Boundaries

- `agent-graph-store` is a narrow persistence facade for parent-child agent
  thread edges.
- `agent-identity` handles runtime keys, JWT decoding, signed task
  authorization, task registration, and agent bill-of-material metadata.
- `cloud-tasks-client` and the mock client define backend task contracts.
- `cloud-tasks` provides CLI/TUI orchestration for task list, detail, apply,
  environment detection, state, and terminal UI.
- `external-agent-migration` converts external MCP, hooks, subagents, and
  commands into Codex config shapes.
- `external-agent-sessions` detects and imports external JSONL sessions into
  Codex rollout items with a ledger.
- `memories` is split into read prompt/citation helpers, a read-only MCP
  filesystem service, and a background write/consolidation pipeline.
- `rollout-trace` captures raw events, payload bundles, graph models, and
  replay reducers.
- `thread-manager-sample` is a minimal integration binary.

## Key Abstractions

- Agent graph: graph store, spawn edge status, local graph store.
- Cloud: cloud backend, task summary, task text, turn attempt, apply outcome.
- Cloud TUI: app state, diff overlay, attempt views, environment modal,
  preflight/apply state.
- External sessions: session summary, migration, imported session, content-hash
  ledger.
- Memories: startup context, Stage 1 rollout extraction, Stage 2 consolidation
  lock, memory workspace files, local backend, citations.
- Trace: agent thread, Codex turn, conversation item, inference call, tool
  call, code cell, terminal operation, compaction, interaction edge.

## Data Flow

1. Multi-agent events are captured as tool/runtime/protocol events, then reduced
   into spawn, assign, send, result, and close edges.
2. Cloud tasks resolve auth, branch, environment, and prompt; backend creates,
   lists, fetches, diffs, and applies tasks.
3. Cloud apply fetches a unified diff and runs local patch preflight/application.
4. Agent identity generates or loads key material, signs authorization payloads,
   registers tasks, decrypts task ids, and verifies JWTs when JWKS is present.
5. External migration reads source configs, converts supported constructs,
   skips dynamic/unsafe cases, and preserves existing target files.
6. External session import detects JSONL sessions, skips already-imported
   content, translates messages/tools into rollout items, and records ledger
   entries.
7. Memory write first claims eligible rollouts, filters/redacts, and asks a
   model for structured memory; then it locks globally, syncs files, computes a
   diff, and uses a restricted internal agent for consolidation.
8. Trace capture writes raw JSONL and payload files; replay normalizes those
   into a graph while retaining raw references.

## Design Patterns and Rationale

- Narrow traits isolate storage, backend, memory MCP, and thread manager
  integration.
- Capture and interpretation are separate.
- Reducers are strict about unsupported items, call id inconsistencies, unknown
  turns, duplicate tools, and mismatched terminals.
- Ordering races use pending queues.
- Memory consolidation uses a model-driven agent but surrounds it with locks,
  git baselines, restricted permissions, no network, and feature disabling.
- Memory read surfaces reject parent traversal, hidden paths, symlinked files,
  and symlinked ancestors.
- Tests focus on edge behavior rather than happy-path snapshots only.

## Integration Points

- State DB stores graph edges and memory job/lock state.
- Protocol supplies thread IDs, rollout items, agent status, and response item
  shapes.
- Core supplies thread manager, rollout recorder, model client, config, auth,
  and internal memory agent.
- Backend clients and APIs supply cloud task and identity endpoints.
- Git utilities support cloud patch application and memory workspace diffing.
- Ratatui/crossterm support cloud task UI.
- RMCP supports memories as an MCP filesystem service.

## Surprising Decisions

- Graph descendant filtering prunes traversal as well as returned rows.
- Updating a missing graph edge status can be a successful no-op.
- Agent identity can decode JWT claims without JWKS and verifies when JWKS is
  provided.
- Cloud task apply is local patch application from backend diff, not just a
  remote state transition.
- Memory Phase 2 uses a restricted internal agent and git diff as the
  consolidation signal.
- Trace separates terminal runtime output from model-visible tool output.
- Code cell ids derive from model-visible call ids, while runtime cell ids are
  thread-local handles.

## Book Implications

- Introduce rollout, thread, turn, model-visible item, runtime event, tool call,
  and interaction edge early.
- Teach “observe first, interpret later” as the trace design principle.
- Use diagrams for cloud task lifecycle, multi-agent communication, and memory
  consolidation.
- Emphasize safety: conservative migration, hardened memory reads, redaction,
  rate limits, and restricted internal agents.
- Avoid treating TUI as the center; it is one client over backend/task
  abstractions.
