# Research Notes: Entrypoints, Config, and Auth

Scope: `README.md`, `docs`, `codex-cli`, `codex-rs/cli`,
`codex-rs/chatgpt`, `codex-rs/login`, `codex-rs/config`,
`codex-rs/install-context`, `codex-rs/arg0`, `codex-rs/features`,
and `codex-rs/cloud-requirements`.

## Module Boundaries

- `codex-cli` is packaging glue. It selects the native binary package, adjusts
  runtime paths, sets install markers, forwards signals, and delegates behavior
  to Rust.
- `codex-rs/cli` is the product command router. It parses root flags and
  subcommands, translates feature toggles and overrides, and dispatches to TUI,
  `exec`, login, review, MCP, plugins, cloud, app-server, sandbox helpers, and
  hidden internal commands.
- `codex-rs/config` owns layered configuration, trust, schema, requirements,
  keymaps, hooks, skills, MCP, plugin marketplace config, and thread config.
- `codex-rs/login` owns credential discovery, OAuth/device flows, external
  tokens, keyring/file storage, refresh, logout, and auth telemetry.
- `codex-rs/chatgpt` is a thin authenticated backend client for account,
  connector, workspace, plugin, task, and requirement-adjacent calls.
- `arg0`, `install-context`, `features`, and `cloud-requirements` are shared
  infrastructure for single-binary dispatch, package-origin detection, feature
  normalization, and managed policy.

## Key Abstractions

- CLI command structs are mostly transport objects. They parse arguments,
  normalize overrides, then call shared crates.
- `ConfigLayerStack` preserves effective TOML, disabled layers, origins, layer
  metadata, and stable fingerprints.
- `ConfigRequirements` and constrained values represent managed policy as
  allowed choices plus source-aware rejection errors.
- `AuthManager` gives the process a stable auth snapshot while hiding storage,
  refresh, external auth, and unauthorized recovery.
- `FeatureSpec` and `Features` centralize lifecycle, defaults, aliases,
  warnings, dependencies, and structured feature config.
- `InstallContext` distinguishes npm, Bun, Homebrew, standalone, and unknown
  installs, including bundled helper discovery.
- `arg0` lets one native binary behave as the main CLI or as helper tools based
  on invocation name.

## Data Flow

1. The npm wrapper resolves a platform native package or vendor binary, updates
   `PATH`, sets install context, then spawns the Rust executable.
2. Rust startup runs `arg0` dispatch before normal CLI parsing, so helper names
   can bypass the main command tree.
3. Root flags and subcommand flags become config overrides and feature
   amendments.
4. Config load merges system, user, project, session, and thread layers while
   trust gates unsafe project-local keys.
5. Requirements load separately and constrain effective values after normal
   preference resolution.
6. Auth load checks env API key, ephemeral external auth, persisted auth, and
   token refresh paths.
7. Backend calls combine auth state, account metadata, connector directory
   state, and cloud requirements.

## Design Patterns and Rationale

- Product surfaces stay thin so TUI, exec, app-server, review, cloud, and
  helpers reuse the same config/auth foundation.
- Layered TOML keeps origin information available for diagnostics and policy
  explanations.
- Requirements are restrictive overlays, not user preferences.
- Feature flags avoid scattered string literals and preserve legacy behavior
  while allowing deprecation warnings.
- Auth snapshots prevent different subsystems from seeing inconsistent
  credentials during one process lifetime.
- Internal commands are hidden from ordinary users but first-class in parsing,
  which makes helper flows testable and composable.

## Integration Points

- External packaging: npm, Bun, Homebrew, standalone archives, desktop launch,
  and shell completion.
- External services: OpenAI auth, ChatGPT backend, connector directory,
  workspace settings, cloud requirements, and agent identity registration.
- OS integration: keyring, Windows/macOS app launch, sandbox helper paths, MDM,
  bundled tools, and host matching.
- Project integration: cwd/root discovery, `.codex` project config, trust
  state, and git patch apply for backend task diffs.
- Extension integration: MCP config edits, plugin marketplaces, plugin-provided
  app connectors, and OAuth-capable MCP servers.

## Surprising Decisions

- JavaScript owns distribution, not behavior.
- `.env` loading deliberately refuses `CODEX_` variables.
- Remote mode is accepted for only selected interactive flows; many subcommands
  reject it.
- `review` is constructed as an `exec` invocation rather than a separate
  runtime path.
- External ChatGPT tokens are stored ephemerally, while forced logout clears
  persistent auth too so fallback does not surprise the user.
- Managed accounts can fail closed when cloud requirements cannot be loaded.
- Project config can be visible as a layer even when disabled by trust.

## Book Implications

- Start the book with command flow: parse, load config, load auth, dispatch.
- Teach config before advanced commands because many commands are just
  different ways to create overrides or edit config.
- Treat auth as a foundation, not an appendix.
- Present managed requirements as policy constraints.
- Use the npm wrapper and `arg0` as examples of pragmatic delivery and
  single-binary multiplexing.
