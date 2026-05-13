# Chapter 13: Sandboxes, Network Policy, and Platform Boundaries

Chapter 12 described the gates that decide whether a side effect may proceed.
This chapter follows an approved action into the isolation layer. Approval says
who authorized the attempt. Sandboxing says what the attempt can still touch.
Those are different controls, and Codex keeps them different.

The sandbox architecture has three stages. First, Codex resolves a permission
profile into filesystem and network policy. Second, a sandbox manager decides
whether the current tool needs a platform sandbox and transforms the command
when it does. Third, a platform helper enforces the transformed command as well
as that operating system allows.

## Policy, Transform, Enforcement

<p class="sketch-intro">Read this as a policy compiler, not one sandbox: the same permission profile can produce different enforcement paths on different platforms.</p>
<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-13-01-en.svg" alt="Sandboxing starts from one permission profile, then branches through platform helpers; even the no-sandbox path is explicit and still returns execution metadata." loading="lazy" />
  <figcaption>Sandboxing starts from one permission profile, then branches through platform helpers; even the no-sandbox path is explicit and still returns execution metadata.</figcaption>
</figure>

This is not one sandbox. It is a policy compiler plus several enforcement
backends. The compiler is cross-platform. Enforcement is platform-specific.
That distinction is why the same permission profile can produce different
commands, warnings, or refusals on different operating systems.

| Platform path | Primary enforcement | Network story | Fail-closed case |
| --- | --- | --- | --- |
| macOS | Generated Seatbelt profile and fixed sandbox runner | Socket allowances and proxy sockets when expressible | Refuse or narrow execution when the generated profile cannot represent the requested policy. |
| Linux | Bubblewrap filesystem view, namespaces, seccomp, optional legacy policy | Network namespace or managed proxy route plus socket restrictions | Refuse sandboxed commands on hosts that cannot provide required namespace behavior. |
| Windows | Restricted token or dedicated sandbox identity with ACLs, firewall, WFP | Firewall and Windows Filtering Platform filters around prepared identities | Refuse when the backend cannot express the requested filesystem/network split. |
| No platform sandbox | Explicit unsandboxed or unsupported path | Whatever the host process has | Must be marked as unsandboxed; should not masquerade as equivalent containment. |

## Permission Profiles Are the Modern Unit

Older configuration used direct sandbox modes. Modern Codex treats permission
profiles as the primary unit. A profile can describe filesystem access,
network behavior, additional granted permissions, and active modifications for
a turn or session. The runtime then projects the profile into a filesystem
sandbox policy and a network sandbox policy.


<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-13-concept-1-en.svg" alt="Permission profiles are the unit of governance: base rights, extra grants, filesystem policy, network policy, platform transforms, and executor commands move together." loading="lazy" />
  <figcaption>Permission profiles are the unit of governance: base rights, extra grants, filesystem policy, network policy, platform transforms, and executor commands move together.</figcaption>
</figure>

Additional permissions are merged before enforcement. A tool may ask for a
specific writable root or network access. The granted subset is intersected
with the request and merged into the effective profile. This keeps permission
granting scoped: approving one request does not silently convert the whole
session into unrestricted execution.

```text
// Pseudocode - simplified for clarity.
  base_profile = resolved_permissions_for_turn()
  granted = merge_session_and_turn_grants()
  effective_profile = apply_additional_permissions(base_profile, granted)

  filesystem_policy, network_policy = split_profile(effective_profile)

  sandbox_type = select_platform_sandbox(
      filesystem_policy,
      network_policy,
      tool_preference,
      managed_network_enabled
  )

  transformed = transform_command_for_platform(
      command,
      sandbox_type,
      effective_profile,
      network_proxy_state
  )

  execute(transformed)
```

The important detail is that transformation receives policy. It does not
rediscover permissions by inspecting the command string.

## macOS: Seatbelt as a Generated Profile

On macOS, Codex lowers policy into a Seatbelt profile and runs through a fixed
platform sandbox runner. The generated profile represents readable roots,
writable roots, protected metadata, denied read patterns, allowed sockets, and
network proxy allowances. The sandbox runner path is not discovered through
the user shell's `PATH`; it is a platform boundary, not a convenience command.


<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-13-concept-2-en.svg" alt="Seatbelt is generated from the effective permission profile, so allowed roots, network sockets, the fixed runner, and fail-closed behavior stay tied to one policy source." loading="lazy" />
  <figcaption>Seatbelt is generated from the effective permission profile, so allowed roots, network sockets, the fixed runner, and fail-closed behavior stay tied to one policy source.</figcaption>
</figure>

Seatbelt is good at expressing file access and selected socket allowances, but
the runtime still has to prepare the policy carefully. Path normalization,
protected subpaths, missing paths, and proxy sockets are all resolved before
the helper runs. If the transform cannot faithfully express the requested
policy on the platform, the safe result is a refusal or a narrower execution,
not an unmarked fallback.

## Linux: Bubblewrap, Namespaces, Seccomp, and Proxy Routing

On Linux, Codex uses a helper path that prefers Bubblewrap for filesystem
layout and namespace isolation. The helper builds a read-only view by default,
binds writable roots back in, remounts protected subpaths as read-only, masks
denied paths, and handles narrower allow/deny carveouts in path-specificity
order. It can also use a legacy Landlock path for compatible legacy policies.

Network isolation is layered. When ordinary restricted networking is enough,
the helper can unshare the network namespace. When managed proxy routing is
active, it creates a constrained route to the configured proxy endpoints and
then applies seccomp so the command cannot open bypass sockets in the usual
way. This is stronger than merely setting proxy environment variables.

Linux also has platform boundary checks. WSL environments that cannot provide
the required namespace behavior are rejected for sandboxed commands that need
Bubblewrap. Missing or unsuitable Bubblewrap support can produce startup
warnings or bundled-helper fallbacks, but the runtime still surfaces the
boundary instead of pretending all Linux hosts are equivalent.

## Windows: Identities, ACLs, Firewall, and WFP

Windows has two broad sandbox paths: a legacy restricted-token path and an
elevated backend built around dedicated sandbox identities. The elevated path
performs setup work such as creating or refreshing users, ACLs, capability
SIDs, firewall rules, and Windows Filtering Platform filters. Ordinary command
execution can then run under the prepared identity through a runner protocol.

This split matters because Windows cannot always express the same nested
filesystem policy shapes as Unix sandboxes. When the selected backend cannot
enforce a requested split filesystem policy, Codex should refuse rather than
run unsandboxed and call it equivalent. The platform boundary is part of the
security model.

## Managed Network Is Not a Universal Firewall

Codex's managed network proxy is an application-level boundary. It can run HTTP
and SOCKS listeners, inject proxy environment, evaluate host/domain policy,
enforce limited methods where visible, ask a decider for approval, and emit
audit records. It can also be paired with platform forcing so a sandboxed
command has no easy route except through the proxy.


<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-13-concept-3-en.svg" alt="Managed network policy is narrower than a firewall: it translates runtime permissions into platform-specific network controls and reports what cannot be enforced." loading="lazy" />
  <figcaption>Managed network policy is narrower than a firewall: it translates runtime permissions into platform-specific network controls and reports what cannot be enforced.</figcaption>
</figure>

It is not a universal packet firewall. DNS rebinding, non-proxy-aware
programs, and host-level networking controls belong to the platform or
infrastructure layer. The honest description is: managed proxy plus platform
routing can strongly shape application traffic; it should not be advertised as
complete network isolation by itself.

## Shell Escalation

Some shell paths need to request an unsandboxed or escalated execution after a
sandbox denial. Codex treats that as a new risk decision. The shell escalation
adapter separates the wrapper protocol from the final process spawn, usually
through a local socket or inherited channel. That lets the runtime keep
approval and audit semantics around the escalation rather than letting the
shell silently escape its own sandbox.

## Apply This

1. **Separate authorization from containment.** Approval lets an action proceed; sandboxing limits what it can still do.
2. **Compile policy before execution.** Resolve profiles into filesystem and network policy before platform-specific transforms.
3. **Treat platforms as different backends.** Do not assume macOS, Linux, and Windows can enforce identical shapes.
4. **Be precise about network guarantees.** Managed proxy is powerful with platform forcing, but it is not a universal firewall.
5. **Refuse unverifiable containment.** If a backend cannot enforce the requested boundary, fail closed instead of running unmarked.

Part III ends here: the model suggested an action, Codex routed it, governed it,
mutated through structured protocols, passed approval gates, and finally
lowered policy into platform execution. Part IV opens the runtime to clients
that need to share this same thread and side-effect model.

<div class="source-equivalence">

## Source Map

| Concept | Source anchor |
| --- | --- |
| Sandbox type selection | [`codex-rs/sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L23) |
| Platform sandbox choice | [`codex-rs/sandboxing/src/manager.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/manager.rs#L48) |
| macOS Seatbelt policy | [`codex-rs/sandboxing/src/seatbelt.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/sandboxing/src/seatbelt.rs#L31) |
| Linux helper entry | [`codex-rs/linux-sandbox/src/main.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/main.rs#L4) |
| Linux proxy routing | [`codex-rs/linux-sandbox/src/proxy_routing.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/linux-sandbox/src/proxy_routing.rs#L169) |
| Windows sandbox setup | [`codex-rs/windows-sandbox-rs/src/setup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/windows-sandbox-rs/src/setup.rs#L85) |
| Network proxy policy | [`codex-rs/network-proxy/src/config.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/network-proxy/src/config.rs#L271) |

</div>
