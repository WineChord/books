# Research Notes: Extensions, MCP, Skills, and Plugins

Scope: `codex-rs/codex-mcp`, `codex-rs/mcp-server`, `codex-rs/rmcp-client`, `codex-rs/builtin-mcps`, `codex-rs/core-skills`, `codex-rs/skills`, `codex-rs/plugin`, `codex-rs/core-plugins`, `codex-rs/connectors`, `codex-rs/ext`, and `.codex/skills`.

## Module Boundaries

- `rmcp-client` is the low-level MCP client layer for transports, OAuth, stdio
  launching, HTTP adaptation, and elicitation.
- `codex-mcp` is the Codex-facing MCP facade: configured servers, built-ins,
  hosted app tools, tool/resource aggregation, naming, filtering, auth status,
  and elicitation routing.
- `mcp-server` exposes Codex itself as a prototype MCP stdio server.
- `builtin-mcps` registers first-party in-process MCPs.
- `core-skills` and `skills` own discovery, parsing, policy, rendering,
  invocation, and bundled system-skill installation.
- `plugin` and `core-plugins` own plugin value objects, loading, cache,
  marketplaces, remote catalogs, sharing, startup sync, and extraction of apps,
  MCP servers, skills, and hooks.
- `connectors` normalizes ChatGPT connector directory metadata.
- `ext` is a typed in-process extension API.
- `.codex/skills` contains repo-local operational skills.

## Key Abstractions

- `McpConnectionManager` owns clients, startup lifecycle, listing, tool call
  routing, resource/template access, and elicitation resolution.
- `EffectiveMcpServer` normalizes configured and built-in servers.
- Async managed MCP clients hide startup timing and cached tool listing.
- Tool info separates raw MCP identity from sanitized model-visible names and
  provenance.
- `RmcpClient` wraps local stdio, executor stdio, in-process, HTTP, and
  OAuth-aware HTTP transports.
- Skill metadata, skill load outcome, and skills manager form the skill plane.
- Plugin id, loaded plugin, plugin load outcome, plugin store, and plugin
  manager form the plugin plane.
- Extension registry is typed and in-process rather than a dynamic plugin ABI.

## Data Flow

1. MCP config and built-ins become effective server definitions.
2. Codex starts clients through the RMCP layer, lists tools, sanitizes names,
   and records provenance.
3. The model calls a sanitized tool name; the MCP manager routes back to the
   owning client.
4. Hosted app tools use ChatGPT auth, trusted hosted metadata, separate cache,
   connector names, and auth elicitation.
5. Codex-as-MCP-server maps MCP tool calls to thread start/resume and streams
   Codex events as MCP notifications.
6. Skills are discovered from config, plugins, repo roots, bundled system
   skills, and user/admin roots.
7. Skill metadata is parsed, summaries are budget-rendered, and explicit
   mentions load full bodies.
8. Plugins are installed from marketplaces into cache, loaded into skills/MCP
   servers/app connector IDs/hooks, and optionally synced from remote sources.
9. Typed extensions contribute thread-start state and prompt fragments through
   app-server wiring.

## Design Patterns and Rationale

- Extension surfaces are layered so each trust boundary can validate its input.
- Many failures are fail-soft: invalid optional skill metadata, marketplace
  errors, remote sync failures, and connector misses usually warn or skip.
- Trust is explicit for hosted connector metadata, remote plugin IDs, bundle
  paths, archive entries, marketplace names, and plugin-relative paths.
- Startup is cache-oriented and asynchronous so extension refresh does not
  block ordinary work.
- Model-visible context is bounded with skill budgets and truncation.
- MCP transports can run locally or through executor-backed process transport.
- Atomic replacement appears repeatedly for caches and marketplaces.

## Integration Points

- MCP integrates with sessions through tool schemas, sandbox metadata,
  permission policy, and elicitation events.
- Plugins contribute MCP servers, skill roots, app connector IDs, and hooks.
- Connectors merge hosted directory metadata with actually accessible tool
  metadata.
- Skills integrate with prompt construction and user input parsing.
- Explicit mentions can be structured or text-based.
- Implicit skill invocation is detected from commands that run skill scripts or
  inspect skill files.
- Codex-as-MCP-server translates external MCP tool calls into thread manager
  operations.
- Repo-local skills demonstrate no-compile extension packages.

## Surprising Decisions

- Remote plugins have both newer and legacy backend paths.
- Remote per-skill disabled state is fetched but local skill config remains the
  authority for `skills/list`.
- Codex-as-MCP-server mostly supports tool calls and declines other capability
  families.
- Typed extension traits exist beyond current production usage.
- Configured MCP servers default to memory-polluting, while built-ins declare
  behavior explicitly.
- Skill scan priority and render priority differ.
- Repo-local skills are both prompt instructions and executable workflow
  packages.

## Book Implications

- Present extension architecture as four planes: MCP tools, skills, plugins,
  and typed in-process extensions.
- Explain MCP as runtime protocol, plugins as packaging/distribution, and
  skills as model-instruction/workflow units.
- Emphasize trust boundaries and sanitization.
- Treat plugin sync as eventually consistent infrastructure.
- Be honest about prototype and unfinished areas.
