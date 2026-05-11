# Chapter 11: MCP, Apps, Skills, Plugins

<div class="chapter-lede">
  <p><strong>You are here:</strong> the core loop works, and now external capability enters the turn.</p>
  <p><strong>Problem:</strong> extensions must add tools or instructions without turning the runtime into a pile of special cases.</p>
  <p><strong>Mental model:</strong> extensions are imports into a turn: some add context, some add tools, some add app-visible capability.</p>
</div>

Codex has several extension concepts. MCP servers expose external tools and
resources. Apps/connectors make external capabilities visible through plugins
and accessible tool inventory. Skills add instruction bundles to a turn.
Plugins package capabilities. Subagents and collaboration features can create
new runtime participants. These are related, but they are not the same.

## Evidence Map

<div class="evidence-map">

| Concept | Source | Why it matters |
| --- | --- | --- |
| MCP config type | [`McpServerConfig`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118) | Represents user-configured MCP servers. |
| MCP CLI | [`McpCli`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/cli/src/mcp_cmd.rs#L39) | Lets users manage MCP servers from the CLI. |
| Turn skill handling | [`run_turn`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L170) | Shows explicit skill mentions becoming turn-scoped context. |
| App-server catalog | [`message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1069) | Routes skills, hooks, plugins, apps, and MCP requests. |

</div>

## Extension Comparison

| Concept | Adds | First question to ask |
| --- | --- | --- |
| MCP server | external tools/resources | What transport, auth, and tool schemas are available? |
| App/connector | app-visible capability | Is this connector accessible and enabled for the turn? |
| Skill | instructions and optional dependencies | Was the skill explicitly mentioned or selected? |
| Plugin | packaged skills, hooks, apps, MCP servers | Which bundled capabilities are enabled by config? |
| Dynamic tool | client-provided execution path | Which client owns execution and response? |
| Subagent | another agent runtime participant | Is it a new loop, child thread, or collaboration tool? |

This table prevents a common beginner mistake: treating every extension as
"just a tool." Some extensions add model-visible tools. Some add instructions.
Some add app metadata. Some affect hooks or prompts.

## Turn-Scoped Injection

The turn loop collects explicit skill mentions and app/plugin mentions before
sampling. It lists MCP tools when apps are enabled or plugin mentions require
raw inventory. It then builds skill and plugin injections as conversation
items. That is a disciplined shape: extensions become explicit context for a
turn, not invisible global magic.

This also helps with reproducibility. If a turn used a skill, the injected
instruction item can be recorded. If a plugin contributed tools, the turn can
be understood against the inventory available at that moment.

## MCP as Universal Tool Boundary

The Model Context Protocol matters because it gives external servers a way to
offer tools and resources through a standard host-client-server shape. Codex
still has to do product work around that standard: configuration, OAuth,
status, refresh, resource reads, tool calls, progress notifications, and
elicitation requests.

The lesson is that standards reduce integration shape, not integration labor.

## Skills and Beginner Confusion

A skill is not a plugin, and a plugin is not automatically a skill. In this
book's terminology:

- **Skill** means instructions that can be injected into a turn.
- **Plugin** means a package that can bundle skills, hooks, apps, and MCP
  server declarations.
- **App/connector** means an external capability surfaced through the app
  system.
- **MCP tool** means a callable tool exposed by an MCP server.

Keeping those terms separate makes the source easier to read.

<div class="apply-this">

## Apply This

- Make extension capability explicit at the turn boundary.
- Separate instruction extensions from tool extensions.
- Treat standard protocols as a starting point, not a complete product.
- Keep terminology strict so users can reason about what gained capability.

</div>

## Read the Source Next

- [`McpServerConfig`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/config/src/mcp_types.rs#L118):
  start from user-configured MCP shape.
- [`collect_explicit_skill_mentions`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/session/turn.rs#L222):
  see how text and structured skill items become injections.
- [`ClientRequest::SkillsList`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/message_processor.rs#L1069):
  inspect app-server catalog routing.

<div class="exercise-box">

## Reading Exercise

Choose one capability: "invoke a skill", "list MCP server status", or "read a
plugin skill." Find the CLI or app-server entry, then trace how it becomes
either turn context, catalog data, or a tool call.

</div>

<div class="next-step">

## What Comes Next

The final chapter studies the user-facing surfaces. The same runtime events
can drive a terminal UI or a JSON-RPC app-server, but each surface has its own
presentation responsibilities.

</div>
