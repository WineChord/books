# Research Notes: Model Providers and Backend Clients

Scope: `codex-rs/codex-client`, `codex-rs/codex-api`, `codex-rs/backend-client`, `codex-rs/codex-backend-openapi-models`, `codex-rs/model-provider`, `codex-rs/model-provider-info`, `codex-rs/models-manager`, `codex-rs/responses-api-proxy`, `codex-rs/aws-auth`, `codex-rs/lmstudio`, `codex-rs/ollama`, and `codex-rs/realtime-webrtc`.

## Module Boundaries

- `codex-client` is the lowest transport layer: request bodies, compression,
  retries, raw SSE framing, custom CA, reqwest, telemetry hooks, and scoped
  ChatGPT cookie handling.
- `codex-api` is the typed wire layer: provider URL/header config, auth
  application, Responses, Compact, Memories, Models, Files, WebSocket,
  realtime, WebRTC setup, parsing, and API error mapping.
- `model-provider-info` is the serializable provider registry.
- `model-provider` resolves runtime auth, account state, capabilities, model
  managers, base URLs, and provider-specific behavior.
- `models-manager` owns model catalogs, caches, defaults, remote overlays, and
  collaboration modes.
- `backend-client` and generated backend models speak ChatGPT backend task,
  usage, requirements, and rate-limit APIs.
- `aws-auth`, `ollama`, `lmstudio`, `responses-api-proxy`, and
  `realtime-webrtc` are specialized integrations.

## Key Abstractions

- Transport: request body, HTTP transport, retry policy, request telemetry.
- API: provider, auth provider, endpoint session, response stream, response
  event, and endpoint-specific clients.
- Provider runtime: provider info, provider account state, capabilities, auth
  managers, and model managers.
- Models: manager, endpoint client, bundled catalog, remote overlay, cache entry.
- Backend: backend client, generated DTOs, and tolerant task-detail adapters.
- Local and realtime: Ollama/LM Studio clients, pull progress, realtime
  sessions, WebRTC handle/events.

## Data Flow

1. Config merges built-in and user model providers.
2. Runtime provider resolution selects base URL, auth, account state,
   capabilities, and model manager.
3. Model metadata starts from a bundled catalog, then eligible providers refresh
   through remote model endpoints and merge overlays into cache.
4. Core builds a Responses request from model info, tools, input, and session
   state.
5. HTTP path streams SSE bytes and normalizes them into response events.
6. WebSocket path sends a Responses request over a persistent connection and
   produces the same event vocabulary.
7. Realtime separates media setup from websocket sideband/control.
8. Backend task and usage flows are separate from inference flows.

## Design Patterns and Rationale

- Transport, typed API, provider runtime, and core orchestration are separate.
- Auth mutates prepared requests so simple bearer auth and body-aware signing
  can share the same call path.
- HTTP SSE and WebSocket converge on the same event vocabulary.
- Model metadata is cache-plus-overlay rather than a static constants file.
- Provider config is data-only; runtime provider code owns account and
  capability decisions.
- Backend JSON is treated as unstable, so generated models coexist with
  tolerant handwritten adapters.
- Security and enterprise concerns are localized: custom CA, cookie allowlists,
  proxy hardening, and AWS signing.

## Integration Points

- Core client code consumes Responses, compact, memory, file upload, and
  realtime APIs.
- Thread manager builds model managers.
- Turn code consumes rate limits and model ETags from response events.
- Config integrates provider registry and user overrides.
- App-server exposes provider account and model state.
- Cloud tasks consume backend task APIs.
- TUI realtime UI consumes WebRTC/realtime events.

## Surprising Decisions

- The low transport crate still contains product-specific ChatGPT cookie policy.
- Provider query params are appended manually rather than through a unified URL
  construction abstraction.
- WebSocket auth is header-oriented; Bedrock-style signing therefore disables
  that path.
- Remote model refresh is selective; many API-key or custom providers use
  bundled/cache/static catalogs.
- Model cache freshness does not encode provider identity strongly enough to be
  a clean conceptual boundary.
- Bedrock signing strips underscore headers before signing to match gateway
  behavior.
- Local provider crates depend on core config types, which weakens layering.

## Book Implications

- Teach five layers: transport, typed API, provider registry/runtime, model
  catalog, and integrations.
- Use one Responses turn as the narrative, then show HTTP SSE and WebSocket as
  transport variants.
- Explain model metadata as runtime infrastructure.
- Use Bedrock to show why auth sometimes needs the request body.
- Keep backend tasks separate from inference clients.
- Give realtime a focused section with media plane and sideband control.
