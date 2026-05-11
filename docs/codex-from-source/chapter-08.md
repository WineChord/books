# Chapter 8: MCP, Apps, and Skills

Codex becomes more useful when it can reach beyond built-in tools. The
extension story has several layers: MCP servers expose external capabilities,
apps/connectors package integrations, skills provide local instructions and
workflows, and newer extension APIs let first-party contributors hook into
runtime surfaces.

## MCP in one sentence

The Model Context Protocol is a JSON-RPC-based standard for connecting AI
applications to external tools, resources, and prompts. In Codex, MCP is not
just a concept in documentation; it has configuration types, client lifecycle
code, tool-listing behavior, approval metadata, and execution paths.

User-facing MCP configuration is modeled in
[`config/src/mcp_types.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118).
Runtime client management appears in
[`codex-mcp/src/rmcp_client.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/rmcp_client.rs#L135).
Actual MCP tool calls pass through
[`core/src/mcp_tool_call.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_call.rs#L560).

## The host-client-server shape

MCP documentation describes hosts, clients, and servers. Codex acts as a host
application that creates clients for configured servers. Those servers expose
capabilities. The model can then request a tool call, and Codex mediates the
call through its own approval and sandbox metadata.

<div class="flow">
  <div><strong>Config</strong>User declares an MCP server.</div>
  <div><strong>Client</strong>Codex starts or connects to it.</div>
  <div><strong>Discovery</strong>Tools/resources/prompts become available.</div>
  <div><strong>Invocation</strong>The model asks for one capability.</div>
  <div><strong>Mediation</strong>Codex applies approval and reporting rules.</div>
</div>

This is a recurring Codex design: external power is brought inside through a
typed boundary instead of raw arbitrary access.

## Skills and local instructions

Skills are a different kind of extension. They do not necessarily expose a
runtime tool. They can describe specialized workflows, constraints, or local
knowledge that Codex should load into context. The core library exports skill
building and injection functions from
[`core/src/lib.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/lib.rs#L67).

The distinction is useful:

- MCP tools add callable external capabilities.
- Skills add procedural or domain knowledge.
- Apps/connectors package integrations for richer client environments.
- Extension APIs contribute structured capabilities inside Codex itself.

## Subagents and extensions

The source also contains a subagent handler in
[`core/src/tools/handlers/multi_agents_v2/spawn.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/tools/handlers/multi_agents_v2/spawn.rs#L16)
and extension registry code in
[`ext/extension-api/src/registry.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/ext/extension-api/src/registry.rs#L11).
These features show the same architectural pressure from another angle:
once an agent can coordinate more work, the platform needs explicit
registration, ownership, attribution, and event flow.

## Design lesson

The important lesson is not "use MCP for everything." The lesson is that agent
capabilities need discoverability, schemas, lifecycle management, and
permission boundaries. Codex's source gives concrete examples of those
requirements in a real CLI agent.

