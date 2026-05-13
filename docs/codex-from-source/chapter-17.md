# Chapter 17: MCP: External Tools Without Runtime Entanglement

Chapter 16 ended Part IV by treating the terminal UI as an inline client over
the same runtime contract used by other clients. This chapter moves one step
outward: if clients can share the runtime without owning it, external tools
must also be able to join a turn without becoming part of the runtime.

<div class="chapter-lede">
  <p><strong>You are here:</strong> clients already observe and steer threads through typed events.</p>
  <p><strong>Problem:</strong> external tools need to be available to the model, but their transport, authentication, naming, and failures must not leak into the core turn loop.</p>
  <p><strong>Mental model:</strong> MCP is a runtime tool protocol: Codex discovers tools through clients, exposes sanitized tool shapes to the model, and routes calls back through provenance.</p>
</div>

MCP is easiest to misunderstand when it is described as "just more tools."
That phrase hides the important architecture. A built-in shell tool has a
known handler inside the runtime. An MCP tool is discovered from a server that
may run over stdio, HTTP, an executor-backed process, or an in-process
adapter. The model should not care about those details, and the runtime should
not pretend the remote server is trusted code.

The result is a layered boundary. Low-level MCP clients speak transports and
OAuth. The Codex-facing MCP layer turns configured and built-in servers into
effective server definitions, manages startup, caches listings, sanitizes
names, and remembers provenance. The core session receives model-visible tool
specs and later routes a tool call back through that provenance record.

## The Boundary MCP Creates

MCP has three identities that must not be collapsed.

| Identity | Who uses it | Why it exists |
| --- | --- | --- |
| Raw server identity | MCP client and connection manager | Keeps the real server, transport, and tool namespace addressable. |
| Model-visible name | Model prompt and tool schema | Gives the model a safe, normalized identifier. |
| Provenance record | Runtime router and audit trail | Maps the model-visible call back to the owning server and raw tool. |

The separation is not cosmetic. External servers can choose names that collide,
use characters that are awkward for model tool calling, or expose tools whose
origin matters for approval, sandboxing, and user explanation. Codex therefore
treats naming as an adaptation step, not as a string copied from the server.

```mermaid
flowchart LR
    Config["MCP config and built-ins"]
    Effective["Effective server definitions"]
    Client["Managed MCP clients"]
    Listing["Tool listings"]
    Sanitize["Sanitized model names"]
    Model["Model tool call"]
    Route["Route by provenance"]
    Server["Owning MCP server"]
    Observe["Tool observation"]

    Config --> Effective
    Effective --> Client
    Client --> Listing
    Listing --> Sanitize
    Sanitize --> Model
    Model --> Route
    Route --> Server
    Server --> Observe
```

This diagram shows why MCP is a protocol boundary rather than a direct function
registry. Discovery, naming, and routing are separate operations.

## Inbound MCP Stack

Inbound MCP means Codex consumes tools from MCP servers. The low-level client
layer owns transport concerns: launching a local stdio process, talking to a
server over HTTP, adapting an executor-backed process, using in-process
servers, and handling OAuth-aware HTTP flows. This layer should be boring to
the rest of the runtime. It produces client behavior; it does not decide which
tools belong in a model request.

The Codex MCP orchestration layer sits above it. It normalizes configured
servers and built-ins, starts clients asynchronously, records startup status,
lists tools and resources, routes tool calls, and handles elicitation. An
elicitation is a server asking for more user or client input during an MCP
operation. Architecturally, that is a bidirectional runtime request, not a
hidden prompt injection.

Startup is intentionally cache-oriented. Tool listings may be expensive or
temporarily unavailable, and a client surface should be able to show progress
while ordinary work continues. A failed optional server should not collapse the
whole runtime. It should produce status, warnings, or absent tools.

## Tool Discovery and Routing

Discovery produces model-facing tool specs, but execution uses provenance. A
safe mental model is:

```text
// Pseudocode - illustrative pattern.
for each effective_server:
    client = start_or_reuse_client(effective_server)
    listing = client.list_tools_from_cache_or_server()

    for each raw_tool in listing:
        public_name = sanitize(raw_tool.name, effective_server.identity)
        provenance = remember(effective_server.identity, raw_tool.name)
        expose_tool(public_name, raw_tool.schema, provenance)

when model_calls(public_name, arguments):
    provenance = lookup(public_name)
    client = client_for(provenance.server_identity)
    result = client.call_tool(provenance.raw_tool_name, arguments)
    return shape_observation(result)
```

The source map above names the concrete connection manager and exposure code.
The invariant is the point: the model never becomes the authority on which
server receives a call. The runtime resolves that through the provenance table
it created during discovery.

## Hosted App Tools

Hosted app tools look similar to MCP tools after exposure, but their source of
truth is different. They depend on hosted metadata, connector names, app IDs,
accessible tool information, and account authentication. That means they need
a separate trust and cache path. A tool can be "available in a directory" but
not usable by the current account; it can also require authentication refresh
or elicitation before a call can proceed.

For a book-level architecture, the important lesson is that "MCP tool" and
"hosted app tool" should converge only at the model-facing tool boundary. The
metadata that proves origin and access remains distinct behind that boundary.

## Resources and Templates

MCP servers can expose more than tools. They can expose resources and resource
templates. Codex treats those as read/list operations with their own routing,
not as model-visible functions by default. That distinction matters because a
resource can become context, a tool can become a side effect, and a template
can become a parameterized read. Their permission and display stories are not
identical.

The connection manager therefore serves several families of requests: list
servers, list tools, call a tool, read a resource, list templates, resolve
elicitation, and report authentication status. They share clients and
provenance but do not have the same user-facing semantics.

## Outbound Codex as an MCP Server

Codex also has an outbound direction: expose Codex itself as an MCP server.
That sounds symmetric, but it is deliberately narrower. Inbound MCP lets Codex
consume a broad ecosystem of tools. Outbound MCP lets an external MCP client
ask Codex to start or resume work and receive Codex events as notifications.

The narrower surface is the right instinct. A mature runtime already has its
own thread, turn, approval, event, and rollout contracts. Exporting every one
of those as arbitrary MCP capabilities would blur the product boundary. The
useful bridge is to map a small set of external tool calls to thread-manager
operations and stream back observable events.

```text
// Pseudocode - illustrative pattern.
when external_mcp_client_calls("start_work", input):
    thread = thread_manager.start_thread(input)
    subscribe_to_events(thread.id)
    return accepted(thread.id)

for each event in subscribed_thread:
    notify_external_client(convert_event(event))
```

This is a bridge, not a second runtime.

## Failure Semantics

MCP failures are extension failures before they are agent failures. A server
can fail to start, an OAuth token can expire, a tool listing can time out, a
resource read can be denied, or an elicitation can be cancelled. The runtime
should preserve those differences because they lead to different recovery
paths.

| Failure | Runtime meaning | User-visible recovery |
| --- | --- | --- |
| Startup failure | server did not become an available capability | show status and continue without its tools |
| Listing failure | server exists but tools are unknown or stale | retry, refresh, or use cached state if valid |
| OAuth failure | account access is missing or expired | request auth flow or mark tools unavailable |
| Tool call failure | selected tool rejected or failed the operation | return a structured observation |
| Elicitation cancelled | required external input was not provided | stop that operation without inventing data |

These distinctions keep MCP from becoming runtime entanglement. The turn loop
sees tools and observations; MCP orchestration owns server lifecycle.

<div class="trace-ledger">

## Trace Ledger

| Question | Chapter 17 answer |
| --- | --- |
| Where is the user request now? | It can reach external tool servers through sanitized model-visible tool calls. |
| What carries it? | Effective server definitions, managed MCP clients, tool listings, provenance records, and shaped tool observations. |
| Who decides next? | The model selects a visible tool, but the runtime routes by provenance and the MCP server performs the operation. |
| What can fail here? | startup, listing, OAuth, elicitation, resource access, name collision, stale cache, or tool-call failure. |

</div>

<div class="apply-this">

## Apply This

1. **Identity split.** Solves external-tool name confusion -> keep raw server identity, model-visible names, and provenance records separate -> Pitfall: letting the model-visible string become the routing authority.
2. **Provenance routing.** Solves unsafe dispatch across remote servers -> route calls by stored origin metadata -> Pitfall: reconstructing the origin by parsing tool names.
3. **Cache as availability hint.** Solves slow or flaky startup -> use cached listings to explain capability state -> Pitfall: treating a cache as proof that the server is healthy.
4. **Explicit elicitation.** Solves external tools needing user input -> model OAuth and elicitation as runtime requests -> Pitfall: letting the server invent missing user decisions.
5. **Narrow outbound bridge.** Solves exposing Codex to other MCP clients -> publish only the operations that make sense across the protocol -> Pitfall: mirroring the whole native runtime as a remote API.

</div>

## What Comes Next

MCP is one extension plane, but not the only one. Chapter 18 widens the lens to
skills, plugins, connectors, and typed in-process extensions: the packaging and
instruction layers that decide which capabilities exist before MCP routing ever
begins.

<div class="source-equivalence">

## Source Map

| Concept | Source anchor |
| --- | --- |
| MCP configuration | [`codex-rs/codex-mcp/src/mcp/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/mcp/mod.rs#L106) |
| Connection manager | [`codex-rs/codex-mcp/src/connection_manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/connection_manager.rs#L72) |
| MCP tool info | [`codex-rs/codex-mcp/src/tools.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/codex-mcp/src/tools.rs#L29) |
| Core tool exposure | [`codex-rs/core/src/mcp_tool_exposure.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/core/src/mcp_tool_exposure.rs#L1) |
| Outbound Codex MCP server | [`codex-rs/mcp-server/src/message_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/mcp-server/src/message_processor.rs#L53) |

</div>
