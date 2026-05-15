# Research Notes: Build, Release, and Governance

Scope: root package files, `MODULE.bazel`, `BUILD.bazel`, `justfile`, `codex-rs/Cargo.toml`, `codex-rs/BUILD.bazel`, scripts, patches, `tools/argument-comment-lint`, `third_party`, GitHub Actions, docs, `codex-rs/docs`, vendored code, V8 proof-of-concept code, test support, and workspace launcher templates.

## Module Boundaries

- Root files define orchestration: npm/pnpm, Bazel module, just commands,
  release metadata, and governance checks.
- `codex-rs` is the Rust workspace and source of truth for product crates,
  shared dependencies, lints, binaries, and generated schemas.
- `codex-cli` is the npm-facing wrapper layer.
- Bazel is an overlay build system that mirrors Cargo metadata and adds
  hermetic CI, platform targeting, and release behavior.
- Scripts and GitHub actions provide install, packaging, CI setup, release
  assembly, schema generation, and policy checks.
- `third_party`, `patches`, vendored code, and V8 experiments isolate native and
  nonstandard dependency complexity.
- User docs are thin in this repo; many internal interfaces live under Rust
  documentation and generated schemas.

## Key Abstractions

- The Bazel crate macro derives Rust libraries, binaries, unit tests,
  integration tests, build scripts, data, and environment wiring from
  Cargo-like crate layout.
- Workspace-root test launchers make Bazel tests behave like Cargo tests with
  stable paths, runfiles, sharding, snapshots, and Windows support.
- Multiplatform and release binary aggregations collect artifacts for release.
- The npm package builder turns one Rust CLI into a meta package plus
  platform-specific optional dependencies.
- Standalone installers consume release npm tarballs and expose stable command
  shims.
- Argument-comment lint is both a Rust lint and a Bazel aspect.

## Data Flow

1. Local development usually starts from `just`, which delegates to Cargo or
   Bazel from `codex-rs`.
2. Cargo owns workspace metadata, dependencies, lints, and ordinary developer
   workflows.
3. Bazel imports metadata, applies patches, defines target platforms, and runs
   hermetic CI/release builds.
4. Rust binaries generate config, hook, and app-server schemas into checked-in
   contract artifacts.
5. Release artifacts flow from Rust builds into CI artifacts, npm staging,
   GitHub releases, signing, installers, and checksums.
6. V8 support flows through third-party metadata, checksum manifests, Bazel
   repository rules, patch-managed portability, and release archives.

## Design Patterns and Rationale

- Cargo stays developer-friendly; Bazel adds reproducibility, platform
  targeting, remote cache/execution, and release packaging.
- Policy is executable: manifest verification, boundary checks, lint sync,
  blob-size limits, ASCII/ToC checks, dependency governance.
- Platform differences are absorbed by launchers, installers, CI scripts, and
  helper packages instead of product crates.
- Native complexity is quarantined in third-party, patches, and vendored build
  wrappers.
- Generated artifacts are checked in when they define external contracts.
- CI is split by purpose: fast PR gates, full matrix, Bazel hermetic checks,
  release builds, SDK checks, and supply-chain scans.

## Integration Points

- GitHub Actions drives CI, release, signing, issue triage, stale PR cleanup,
  and generated metadata updates.
- Bazel remote cache/execution is wired through repo configuration and CI.
- npm/pnpm provide JavaScript distribution and SDK packaging.
- GitHub Releases provide native artifacts and installer payloads.
- DotSlash is used for selected downloadable tools and lint artifacts.
- V8 and Bubblewrap are native dependencies managed away from product code.
- Signing includes Apple, Windows, and artifact-signing flows.

## Surprising Decisions

- Bazel may be described as experimental in documentation but is central to
  release validation and CI architecture.
- Bazel disables ordinary runfiles assumptions and restores Cargo-like test
  behavior through custom launchers.
- Standalone installers consume npm tarballs from releases rather than raw
  native binary archives.
- Platform npm packages can have platform-suffixed versions inside one public
  package family.
- Governance scripts enforce architecture, not just style.
- V8 defaults differ between source-built Bazel artifacts and release
  compatibility artifacts.

## Book Implications

- Separate product architecture from delivery architecture.
- Treat generated schemas as API contracts.
- Explain Bazel as a release and compatibility overlay on Cargo.
- Include a release packaging chapter because artifacts, npm packages,
  installers, signing, and helper binaries are tightly connected.
- Include a governance chapter because many boundaries are enforced by CI and
  scripts rather than convention.
