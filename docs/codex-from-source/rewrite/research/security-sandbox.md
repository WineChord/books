# Research Notes: Security, Permissions, and Sandboxing

Scope: `codex-rs/sandboxing`, `codex-rs/linux-sandbox`,
`codex-rs/windows-sandbox-rs`, `codex-rs/bwrap`,
`codex-rs/process-hardening`, `codex-rs/shell-escalation`,
`codex-rs/network-proxy`, `codex-rs/secrets`,
`codex-rs/terminal-detection`, `codex-rs/uds`, and
`codex-rs/stdio-to-uds`.

## Module Boundaries

- `sandboxing` compiles policy into platform-specific command transforms. It
  does not enforce isolation by itself.
- `linux-sandbox` enforces Linux isolation through bwrap layout, namespaces,
  seccomp, legacy Landlock, and managed proxy routing.
- `windows-sandbox-rs` provides legacy restricted-token and elevated sandbox
  backends using users, ACLs, capability SIDs, firewall, WFP, and helper
  binaries.
- `bwrap` packages the vendored Bubblewrap binary.
- `network-proxy` is the managed network boundary for env injection, host and
  domain policy, HTTP/SOCKS forwarding, limited HTTPS, and audit/block records.
- `shell-escalation` mediates Unix shell subcommands through a local socket
  protocol.
- `process-hardening` strips loader-related risk and disables dump/attach
  surfaces early.
- `secrets`, `terminal-detection`, `uds`, and `stdio-to-uds` are adjacent
  support utilities, not sandbox enforcement.

## Key Abstractions

- `SandboxManager` decides whether platform sandboxing is requested and returns
  transformed command metadata.
- Permission profile is the modern cross-platform policy unit.
- Filesystem sandbox policy and network sandbox policy are conceptually split
  before lowering into platform mechanisms.
- macOS Seatbelt generation turns policy into read/write roots, protected
  metadata, unreadable globs, proxy rules, and socket allowances.
- Linux uses bwrap plus a second-stage seccomp exec.
- Windows elevated mode uses sandbox users, runner IPC, ACL refresh, firewall,
  WFP, and capability SIDs.
- Managed network proxy state and deciders represent live host/domain/socket
  policy.
- Shell escalation separates wrapper protocol, approval policy, and actual
  process spawning.

## Data Flow

1. Core passes policy, command, cwd, env, and extra permissions to sandbox
   selection.
2. The sandbox layer merges permissions, normalizes paths, selects a platform
   strategy, and returns the original command or wrapper command.
3. Linux launches through an outer helper, creates bwrap filesystem/network
   namespaces, prepares proxy bridges if required, applies seccomp, then runs
   the target.
4. macOS generates a Seatbelt profile and executes through the fixed platform
   sandbox runner.
5. Windows elevated mode validates setup, refreshes users/ACLs/firewall/WFP,
   launches a command runner as the sandbox user, and runs the target under a
   restricted token.
6. Managed proxy accepts HTTP/SOCKS requests, evaluates policy, optionally asks
   a decider, forwards direct/upstream/MITM traffic, and records audit output.
7. Shell escalation lets shell wrappers request an unsandboxed or escalated run
   through inherited local sockets.
8. Secret storage canonicalizes names/scopes, encrypts local data, and relies
   on OS keyring passphrases.

## Design Patterns and Rationale

- Policy compilation and platform enforcement are separate.
- Ambiguous safety boundaries tend to fail closed: invalid proxy env, DNS
  timeout, invalid domain patterns, unsafe symlinks, unsupported restricted
  modes.
- Linux layers filesystem namespaces, network routing, and seccomp instead of
  treating sandboxing as one primitive.
- Path safety is defensive: canonicalization, root sorting, glob prefixes,
  symlink checks, and missing-path masking.
- Windows separates one-time elevated setup from ordinary command execution.
- Managed network policy is request/host-centric, not packet-centric.
- Process hardening is intentionally small and early.

## Integration Points

- Sandbox policy depends on protocol/config model types.
- Linux helper integrates bwrap, system helper discovery, ripgrep for denied
  globs, seccomp, inotify, and managed proxy env.
- Network proxy integrates command env injection, runtime config reload, audit
  logs, MITM cert state, and optional decider callbacks.
- Windows integrates users/groups, DPAPI, ACL APIs, firewall COM APIs, WFP,
  named pipes, ConPTY, and job objects.
- Shell escalation integrates with Unix shells through inherited fds and
  `SCM_RIGHTS`.
- Terminal detection should feed metadata, not trust decisions.

## Surprising Decisions

- Linux can skip bwrap for fully permissive disk/network cases, but restricted
  networking can force wrapping for namespace bridge enforcement.
- Linux delays `no_new_privs` in paths where privileged bwrap setup needs to
  happen first.
- Denied-glob expansion uses `rg` when available and treats many `rg` failures
  as hard errors.
- Managed proxy routing uses a TCP-to-UDS bridge and then seccomp closes off
  bypass paths.
- macOS avoids PATH lookup for the sandbox runner.
- Limited HTTPS requires MITM inspection; otherwise CONNECT is blocked.
- Windows WFP setup can be non-fatal while firewall failure is surfaced more
  strongly.

## Book Implications

- Present sandboxing as policy, transform, and enforcement.
- Give Linux, macOS, and Windows separate diagrams.
- Avoid calling managed proxy a global firewall.
- Explain permission profiles as the current model and legacy sandbox policy as
  compatibility.
- Include path-safety patterns as their own section.
