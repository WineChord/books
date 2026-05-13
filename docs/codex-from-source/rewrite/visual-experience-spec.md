# Visual Experience Spec

This spec defines the visual comprehension layer for *Codex From Source*. It is
not a theme guide. It is the acceptance standard for turning a source-equivalent
technical book into a system that readers can understand visually, interactively,
and pleasurably.

The benchmark is the interactive density of `claude-code-from-source`: chapter
diagrams are not passive illustrations; they become simulators, state machines,
pipelines, calculators, graph explorers, and decision tools. The goal here is to
match that effect and exceed it for Codex by making every visual component serve
source-level understanding.

## Core Thesis

The site is not a Markdown renderer. It is a visual explanation system for an
agent runtime.

Every important runtime concept must have a visual home. Prose explains why the
architecture exists; interaction lets the reader test the architecture in their
head. If a reader has to hold a lifecycle, routing rule, trust boundary, state
machine, or component relationship entirely in memory, the page has failed.

## Reference Delta

The current Codex site has strong typography, navigation, and static diagrams.
The reference site goes further in four ways:

1. Mermaid slots are treated as temporary stand-ins for chapter-specific interactive
   components.
2. Each interaction is domain-specific: a tool pipeline behaves like a pipeline,
   a state machine behaves like a state machine, and a cache calculator behaves
   like a calculator.
3. Motion is explanatory. It shows sequence, state change, selection, routing,
   or completion rather than decorating the page.
4. Visual density is high but controlled. The reader sees many useful surfaces,
   but each surface has a clear job.

Codex must adopt this model and improve it with stricter aesthetics, bilingual
parity, stronger source anchors, and better accessibility.

## Non-Negotiable Principles

1. **Visuals teach, they do not decorate.** Every icon, animation, diagram,
   card, and control must reduce cognitive load or expose a system invariant.
2. **One concept, one canonical visual.** A concept may be referenced across
   chapters, but the full visual explanation lives in one chapter.
3. **Interaction must answer a question.** Click, hover, drag, scrub, filter,
   toggle, and step controls must reveal a specific architectural choice.
4. **Beauty is a correctness property.** Awkward spacing, generic icons, noisy
   motion, weak contrast, cramped text, or unbalanced composition are review
   failures because they reduce trust and comprehension.
5. **Static Mermaid is a fallback, not the target.** Mermaid can remain as
   source-friendly scaffolding, but final publication quality requires custom
   interactive explainers for the book's central concepts.
6. **Bilingual parity is mandatory.** English and Chinese pages must receive the
   same visual components, source anchors, affordances, and explanatory density.

## Visual Vocabulary

The book needs a stable icon and symbol system. Do not invent a new visual style
per chapter.

| Concept Family | Icon Motif | Color Role | Interaction Role |
| --- | --- | --- | --- |
| Runtime / turn loop | circular route, pulse, frame | terracotta primary | step, play, pause, continue |
| Protocol / contract | bracket, document, typed node | charcoal/cream with terracotta edge | inspect fields, map event shapes |
| Tools / side effects | tool glyph, gate, pipeline segment | terracotta plus status colors | route, approve, fail, retry |
| Policy / security | shield, lock, boundary line | amber for caution, red only for failure | compare decisions and gates |
| State / persistence | stack, timeline, ledger | muted neutral with highlighted delta | scrub history, inspect snapshots |
| Client / UI | terminal frame, panel, cursor | cream/charcoal with accent cursor | replay rendering/input paths |
| Extension / MCP / plugins | socket, node port, package | cool neutral plus provenance tag | show trust plane and ownership |
| Build / release / CI | conveyor, check lane, artifact box | green success, amber review | trace from source to artifact |
| Multi-agent / cloud | branching graph, worker chip, mailbox | differentiated role colors | fan-out, join, observe |

Icon rules:

- Use lucide icons where an exact concept exists; use custom SVG only when the
  domain concept is specific enough to deserve a book-native mark.
- Icons must be line-based, optically balanced at 16, 20, and 32 px.
- No emoji, no decorative blobs, no generic clipart, no one-off visual jokes.
- Every icon used as a control needs a visible focus state and an accessible
  name.
- Status colors must be consistent: green means completed/safe, amber means
  pending/review, red means blocked/failure, terracotta means active/primary.

Required reusable icon names:

`user`, `model`, `runtime`, `thread`, `turn`, `event`, `item`, `tool`, `shell`,
`file`, `patch`, `approval`, `hook`, `sandbox`, `network`, `client`, `cloud`,
`memory`, `schema`, `release`, `ci`, `error`, `source`, `policy`, `mcp`,
`skill`, `plugin`, `connector`, `trace`, `state`, `config`, `auth`.

The implementation may add icons, but it may not rename these concepts casually.
Terminology must match chapter prose, the source atlas, and the implementation
reference.

## Motion Language

Motion must make causality visible.

Allowed motion:

- Step activation in pipelines and lifecycles.
- Node focus, link highlighting, and data-flow direction.
- Scrubbed timelines and progressive reveal.
- Counter animation for quantities that explain cost, latency, token use, or
  fan-out.
- Small entrance transitions for components entering the viewport.

Rejected motion:

- Decorative floating particles, orbs, bokeh, or ambient loops.
- Motion that continues forever without communicating state.
- Large parallax or hero spectacle that distracts from reading.
- Animations that move text while the reader is trying to read it.

Timing standards:

- Micro interaction: 100-180 ms.
- Step transition: 180-320 ms.
- Pipeline playback: 350-700 ms per major step.
- Respect `prefers-reduced-motion`; provide an instant state-change path.

## Required Page-Level Surfaces

Every chapter must include these surfaces unless a reviewer explicitly accepts a
documented exception.

1. **Chapter Visual Brief**
   - Appears near the opening.
   - Names the main mental model of the chapter.
   - Shows the visual legend for recurring icons in that chapter.
   - Includes one sentence explaining what the reader should be able to simulate
     mentally after the chapter.

2. **Primary Interactive Explainer**
   - One substantial component per chapter.
   - Must be specific to the chapter's central problem.
   - Must have at least three meaningful states or interactions.
   - Must work on desktop and mobile.
   - Must include a no-JS/static fallback that preserves the same teaching
     point.

3. **Source Anatomy Panel**
   - Replaces or upgrades the current end-of-chapter Source Map.
   - Shows why the referenced files matter, not just where they are.
   - Groups files by role: contract, runtime, policy, UI, persistence, tests,
     generated artifact, or release.

4. **Leadership Scan Surface**
   - A compact visual summary for readers who skip deep dives.
   - Must show the problem, the architectural bet, the trade-off, and the
     transferable pattern.

5. **Pattern Cards**
   - The five `Apply This` patterns must become scannable cards with icons,
     problem/adaptation/pitfall slots, and consistent layout.

6. **Visual Comprehension Checks**
   - Each chapter ends with 2-3 short checks tied to the primary explainer.
   - The checks ask readers to predict a route, gate, state transition, failure
     path, ownership boundary, or source role.
   - Checks must be answerable from the visual layer plus chapter prose.

## Structured VisualSpec Records

Every source-reading chapter must have a `visualSpec` record before
implementation begins. The record is both planning artifact and review target.

Required shape:

```ts
// Illustrative - visual planning metadata, not runtime source.
type ChapterVisualSpec = {
  id: string;
  chapter: string;
  displayName: {
    en: string;
    zh: string;
  };
  concept: {
    en: string;
    zh: string;
  };
  primaryInteractive: {
    component: string;
    readerQuestion: {
      en: string;
      zh: string;
    };
  };
  localizationContract: {
    languages: Array<"en" | "zh">;
    requiredSurfaces: string[];
  };
  secondaryDiagrams: string[];
  iconSet: string[];
  sourceAnchors: Array<{
    role: "contract" | "runtime" | "policy" | "ui" | "persistence" |
          "tests" | "generated-artifact" | "release" | "ci";
    path: string;
    pinnedUrl: string;
    architectureClaim: string;
    readerTakeaway: string;
    visualState: string;
    leakageNotes: string;
  }>;
  fallback: "static-svg" | "table" | "step-list" | "mermaid";
  motionPolicy: "none" | "step" | "playable" | "scrubbable";
  requiredStatesOrEdges: string[];
  invariants: string[];
  misconceptionsCaught: string[];
  comprehensionChecks: Array<{
    question: string;
    expectedAnswer: string;
    visualState: string;
    sourceEvidence: string;
    sourceEvidenceRefs: string[];
    misconceptionCaught: string;
  }>;
  reviewQuestions: string[];
};
```

Rules:

- `primaryInteractive` must name a real component or a planned component.
- `localizationContract` must require English and Chinese for every reader-facing
  surface: title, concept, reader question, legend labels, controls, state/edge
  labels, source anatomy summaries, comprehension prompts, review checklist, and
  fallback text.
- `secondaryDiagrams` must list 1-3 supporting visuals.
- `iconSet` must use the reusable icon names from this spec.
- `sourceAnchors` must be structured entries with role, pinned URL, architecture
  claim, reader takeaway, visual state, and leakage notes. A plain link list is
  invalid. Each pinned URL must point to a concrete source line, not a file
  file-start anchor. The checker verifies the referenced line against
  `CODEX_SOURCE_ROOT`, a sibling `../codex` checkout, or the pinned GitHub raw
  source so the gate works in fresh CI checkouts.
- `fallback` must preserve the same idea for no-JS, reduced-motion, and
  accessibility fallbacks.
- `requiredStatesOrEdges`, `invariants`, and `misconceptionsCaught` must make
  the source-equivalence contract concrete enough that reviewers can reject a
  shallow visual.
- `comprehensionChecks` must include expected answers and source evidence that
  cites at least one path from the same record's `sourceAnchors`. The
  machine-readable record also carries `sourceEvidenceRefs`, a list of
  `path#Lnumber` references derived from current anchors.
- `reviewQuestions` must be concrete. "Does this look good?" is invalid.
  "Can the reader predict whether this tool call reaches execution?" is valid.

Coverage gate:

- all 25 chapters plus the epilogue have `visualSpec` records;
- every record has `primaryInteractive`, fallback, source anchors, icon set, and
  review questions;
- no core mechanism relies only on prose plus Mermaid;
- English and Chinese pages share equivalent records.
- reviewer-facing record and ledger mirrors match the canonical records and
  cannot drift silently.

Machine-readable canonical records live in
`src/visual/visual-specs.mjs`. Human-readable mirrors live in
[Chapter VisualSpec Records](visual-spec-records) and
`docs/zh/codex-from-source/rewrite/visual-spec-records.md`. Implementation must
consume one stable record identity per chapter and localize display text rather
than forking the architecture contract. `npm run check:visual-spec` is the
minimum enforcement gate for this data.

Canonical `sourceAnchors`, invariants, and review questions are internal
source-equivalence assertions. They are not a localization shortcut for the
reader-facing UI. A chapter can leave `planned` status only when the
implementation supplies localized English and Chinese component copy and the
ledger records screenshot/review evidence for both languages.

## Implementation Architecture

The rewrite workspace is internal planning material. It is intentionally
excluded from public routes. "Approved for publication" applies to the future
reader-facing visual implementation, not to the unpublished rewrite workspace
itself.

The implementation contract is:

1. `src/visual/visual-specs.mjs` owns chapter records, icon vocabulary, source
   snapshot, target phase, and internal/public status.
2. `scripts/check-visual-spec.mjs` validates 26 records, stable routes,
   bilingual labels, source anchors, icon names, fallback modes, motion policy,
   required states, invariants, misconceptions, comprehension checks, and target
   phase.
3. Future interactive components must be registered by `primaryInteractive`
   component key. A component key without a registered implementation may be
   `planned`, but it cannot be called visually complete.
4. Chapter rendering should use a route-keyed visual registry rather than MDX
   ad hoc imports. The expected insertion points are: visual brief after the
   opening, primary explainer before the first major deep dive, source anatomy
   before chapter navigation, and pattern cards in the `Apply This` section.
5. Fallback rendering must be data-driven from the same record. Static SVG,
   table, step list, or Mermaid fallback cannot have a different teaching claim
   from the interactive component.
6. Islands must hydrate by route and visibility. A chapter must not load every
   visual component for the whole book.

Spec-only changes have a separate gate: `npm run verify`,
`npm run check:visual-spec`, no private-path leaks, no staged `.vscode`, and at
least three reviewer approvals for the spec contract. Implementation changes
also need the browser, screenshot, accessibility, and live-deploy gates below.

## Component Catalogue

The implementation should build reusable primitives before chapter-specific
components:

| Component Type | Purpose | Minimum Interaction |
| --- | --- | --- |
| System Map | Show subsystem relationships and ownership | hover/tap node, highlight paths, link to chapter/source |
| Lifecycle Stepper | Teach ordered runtime flow | next/back/play, active step detail, failure branch |
| Policy Gate Stack | Explain layered decisions | toggle policy inputs, show resulting decision path |
| Contract Explorer | Show typed public surface | inspect message shape, stable/experimental/deprecated tags |
| State Machine Viewer | Explain state transitions | choose event, animate transition, show illegal transitions |
| Pipeline Simulator | Show transformation through stages | run sample input, fail at selected stage, inspect output |
| Source Anatomy Cards | Connect narrative to source | filter by role, reveal why file matters, pin source links |
| Cost/Latency Calculator | Explain performance trade-offs | sliders/toggles, live totals, threshold markers |
| Timeline / Gantt | Show parallel work and sequencing | scrub/play, reveal dependencies and critical path |
| Matrix Explorer | Compare clients, backends, permissions, or modes | filter rows, highlight differences, summarize choice |
| Trace Replay | Show event/output reconstruction | step through events, show UI/model/source views |
| Boundary Diagram | Explain trust, sandbox, network, or extension planes | toggle actor, show allowed and blocked edges |

Every component must have a written "reader question" in code or adjacent
metadata. Example: "What must happen before a tool call becomes an effect?"

Every interactive explainer must expose these four cognitive scaffolds:

1. **Initial state** - what the reader is looking at before anything happens.
2. **What changed** - what the current interaction changed.
3. **Why it matters** - the architectural consequence of the change.
4. **Source evidence** - the file role or source anchor behind the claim.

## Codex Chapter Visual Plan

The table below defines the first implementation target. Names are conceptual;
final component names may differ, but the reader question must remain covered.

| Chapter | Required Primary Explainer | Reader Question |
| --- | --- | --- |
| 1. Architectural Bet | Bounded Agent OS Map | Which layers turn model intent into governed work? |
| 2. Distribution to Router | Startup Route Timeline | How does command intent narrow before runtime starts? |
| 3. Config/Auth/Requirements | Constraint Envelope Builder | Which inputs become the final runtime envelope? |
| 4. Protocol Boundary | Submission/Event Contract Explorer | What is the stable language between clients and runtime? |
| 5. Threads/Sessions/State | Durable Thread Ledger | How does a turn become resumable state? |
| 6. Turn Loop | Turn Loop Simulator | What repeats until the runtime decides to stop? |
| 7. Model Providers | Streaming Provider Comparator | How do different transports normalize into one stream? |
| 8. Observability/Trace | Rollout Trace Replay | How do runtime facts become replayable history? |
| 9. Tool Routing | Tool Spec to Handler Router | Why is model-visible schema not execution authority? |
| 10. Shell/Exec/FS | Execution Backend Pipeline | Where are shell and filesystem effects authorized? |
| 11. Patch Protocol | Patch Application Workbench | How does structured editing avoid opaque shell mutation? |
| 12. Hooks/Approval | Human Gate Stack | Which gates can stop or amend a command? |
| 13. Sandboxes/Network | Containment Boundary Explorer | What changes across platform sandboxes and network modes? |
| 14. App-Server | JSON-RPC Contract Map | How do clients share runtime ownership? |
| 15. SDK/Daemons/Remote | Client Reachability Matrix | How do SDKs and daemons reach the same contract? |
| 16. TUI | Event Renderer Lab | How does terminal UI project runtime events? |
| 17. MCP | External Tool Trust Plane | How does MCP add tools without runtime entanglement? |
| 18. Skills/Plugins | Extension Provenance Explorer | Which extension type contributes which capability? |
| 19. Migration/Compatibility | Compatibility Lane Board | How are old and new surfaces kept alive together? |
| 20. Multi-Agent | Agent Graph Orchestrator | How do child agents coordinate without sharing internals? |
| 21. Cloud Tasks | Remote Task Contract Timeline | What remains local when work moves remote? |
| 22. Memories | Memory Side-Channel Explorer | How does long-term context enter without taking over? |
| 23. Build Systems | Generated Contract Drift Viewer | Why are schemas treated as product artifacts? |
| 24. Packaging/Release | Release Artifact Conveyor | How does source become installable platform packages? |
| 25. CI/Governance | Policy Lane Dashboard | Which checks preserve architecture over time? |
| Epilogue | Transfer Pattern Atlas | Which visual patterns can readers reuse? |

## Delivery Phases

The full visual layer is deliberately large. Scope must be delivered in phases
so the site improves without claiming completion too early.

| Phase | Scope | Exit Standard |
| --- | --- | --- |
| P0 Contract | `visualSpecs`, checker, design tokens, registry architecture | `npm run check:visual-spec` validates all 26 records |
| P1 Pilots | Chapters 1, 6, 9, 12, 16, 20 | Proves architecture map, turn loop, tool gate, human gate, TUI renderer, and multi-agent graph |
| P2 Core | Chapters 2-14 except P1 chapters | Covers startup, config, protocol, state, providers, trace, exec, patch, sandbox, app-server |
| P3 Extensions and Governance | Chapters 15, 17-25 | Covers SDKs, MCP, extensions, compatibility, cloud, memory, build, release, CI |
| P4 Synthesis | Epilogue and cross-chapter pattern atlas | Makes reusable lessons visually scannable |

Only P0 can be marked complete before reader-facing components exist. A planned
chapter may be present in the ledger, but "visually complete" is reserved for
implemented, verified, and approved rows.

## Chapter Visual Density

Minimum per chapter:

- 1 primary interactive explainer.
- 1 secondary visual, either static custom SVG, compact interactive matrix, or
  source anatomy panel.
- 1 leadership scan surface.
- 5 pattern cards.

Target per chapter:

- 1 primary interactive explainer.
- 2-3 secondary visuals.
- 1 upgraded source anatomy panel.
- 1 mini interaction embedded in a deep dive when the chapter discusses policy,
  routing, state, latency, concurrency, or compatibility.

Maximum:

- Do not overload a chapter with more than 5 major visual blocks unless the
  chapter is split or reviewers explicitly approve the density.

## Aesthetic Standard

The visual system should feel like a high-end engineering monograph, not a SaaS
dashboard and not a tutorial playground.

Concrete tokens:

| Token | Value | Use |
| --- | --- | --- |
| `cream` | `#f5f4ed` | page background and quiet surfaces |
| `beige` | `#e8e6dc` | secondary surfaces and code-adjacent fills |
| `terracotta` | `#d97757` | active path, primary controls, current step |
| `charcoal` | `#141413` | light-mode text and dark-mode background |
| `dark-surface` | `#1e1e1c` | dark-mode tool surfaces |
| `secondary` | `#30302e` | secondary text in light mode |
| `muted` | `#87867f` | metadata, disabled state, quiet labels |
| `border` | `#c2c0b6` | structural rules and card borders |
| `highlight` | `#eda100` | caution, pending review, focused comparison |

Additional semantic colors may be added only with a named role and contrast
evidence. Do not add untracked one-off hues.

Observable craft rules:

- spacing uses a 4 px grid; major visual surfaces use 16, 24, 32, or 48 px
  internal rhythm;
- diagram strokes use 1.5-2 px for normal edges and 2.5-3 px for active paths;
- icon-only controls are 44 x 44 px on touch surfaces and at least 32 x 32 px on
  dense desktop toolbars;
- focus rings use a 2 px terracotta or highlight outline with at least 2 px
  offset;
- component frames use radius 4-8 px; nested cards remain forbidden;
- labels must fit at 200% browser zoom and at 320 px width;
- visual QA must include screenshot review for overlap, clipped labels, and
  ambiguous active state.

Required qualities:

- restrained, book-like typography;
- clear rhythm between prose and visual surfaces;
- generous but not wasteful spacing;
- dense information with visible hierarchy;
- tactile controls that feel precise, not playful;
- dark mode that is designed, not inverted;
- no text collisions at 320 px, 375 px, 768 px, 1024 px, and 1440 px;
- no monochrome one-hue theme;
- no decorative gradients, orbs, or bokeh backgrounds;
- cards only for repeated items, modals, and framed tools;
- no cards inside cards;
- rounded corners at 8 px or less except book covers or intentional media.

Each major component must pass a "squint test": at a glance the reader should
see the active state, primary path, blocked path, and next action.

## Accessibility and Input Standards

Every interactive component must support:

- keyboard operation for all controls;
- visible focus states;
- accessible names for icon-only controls;
- tooltips or visible labels for unfamiliar icons;
- `aria-current`, `aria-expanded`, `aria-pressed`, or live-region semantics when
  state is exposed;
- pointer and touch parity;
- reduced-motion mode;
- no hover-only essential information;
- no trapped focus except in real modal surfaces;
- readable hit targets on mobile, with core controls at least 44 x 44 px;
- non-color encodings for every state;
- screen-reader summaries for visual explainers.

If the component cannot be made accessible, it must degrade to a clear static
diagram and table without losing the chapter's core meaning.

## Performance Standards

The visual layer must keep reading responsive under explicit budgets.

- Lazy-load interactive islands by chapter. A route that does not render a
  visual island must load 0 bytes of that island's JS.
- Each chapter-specific visual island must stay at or below 45 kB gzip JS.
  A shared visual runtime may be up to 90 kB gzip when at least five chapters
  use it.
- Deterministic diagrams should use SVG/HTML/CSS. Canvas/WebGL requires a
  measured need and a static fallback with equivalent meaning.
- D3 force simulations must render a stable initial layout immediately and
  settle within 1,200 ms on a 4x CPU-throttled desktop profile.
- Custom interactions must produce no browser long task over 50 ms during
  first render, resize, theme switch, reduced-motion switch, or one complete
  interaction probe.
- Visual additions must keep chapter CLS at or below 0.03 and must not increase
  LCP by more than 250 ms against the same page without the island.
- Animation must not block scroll, text selection, or keyboard focus movement.
- `npm run verify` remains the baseline gate; implemented rows also need a
  bundle report and Playwright trace or screenshot probe covering desktop,
  mobile, light mode, dark mode, and reduced motion.

## Source Integrity Standards

Visual explainers must teach patterns and architecture without leaking exact
source implementations.

- No verbatim source code in component fixtures.
- Public file names, public type names, and public function names may be used
  as anchored labels when they are linked to the pinned source snapshot and
  teach the architecture.
- Sample identifiers inside pseudocode, mock payloads, and component fixtures
  must be illustrative, not copied from private/internal prompt text.
- Source links must remain pinned to the audited source snapshot.
- Source anatomy panels explain file roles; they do not reproduce file contents.
- Components that simulate data flow must use simplified example data.
- Banned material includes copied function bodies, proprietary prompt text,
  secrets, private paths, internal constants, and unanchored near-verbatim
  implementation logic.

## Implementation Ledger

Future implementation must maintain a ledger at:

`docs/codex-from-source/rewrite/visual-implementation-ledger.md`

The Chinese mirror ledger lives at:

`docs/zh/codex-from-source/rewrite/visual-implementation-ledger.md`

The ledger records:

- chapter;
- component name;
- reader question;
- current status;
- screenshots tested;
- mobile status;
- accessibility status;
- reviewer approvals;
- known residual risks.

No chapter may be called visually complete unless its ledger row is complete.

## Definition of Done

A chapter's visual layer is complete only when all conditions are true:

1. The primary explainer directly answers the chapter's central reader question.
2. The chapter can be understood at a high level by reading the leadership scan
   surface and manipulating the primary explainer.
3. The source anatomy panel explains why each source anchor matters.
4. English and Chinese pages have equivalent visuals and labels.
5. All controls work with keyboard, pointer, and touch.
6. Mobile screenshots at 320 px and 375 px show no overlap, clipping, or hidden
   essential text.
7. Tablet and desktop screenshots at 768 px, 1024 px, and 1440 px show balanced
   composition and
   readable information density.
8. Reduced-motion mode remains usable.
9. The component does not reproduce exact source code.
10. At least three independent reviewers approve publication.

## Review Roles

Every spec revision and implementation pass must use fresh reviewer agents with
high reasoning effort. Implementation passes require at least three reviewers;
large or contentious changes should use four or more.

1. **Product Experience Reviewer**
   - Checks whether the visual direction serves the intended reader journey.
   - Verifies hierarchy, pacing, navigation, and page states.
   - Blocks changes that make the experience less clear, less trustworthy, or
     less aligned with the book's positioning.

2. **Visual and Aesthetic Reviewer**
   - Reviews beauty, hierarchy, icon quality, motion taste, typography,
     spacing, color, and comparison against the reference site.
   - Blocks on anything that feels like generic documentation, a dashboard skin,
     or a rough prototype.

3. **Cognitive and Source-Equivalence Reviewer**
   - Reviews whether visuals improve understanding of the source architecture.
   - Blocks on visuals that are attractive but do not teach the real subsystem.
   - Checks that the chapter can be understood without opening source.

4. **Interaction, Accessibility, and Performance Reviewer**
   - Reviews keyboard, touch, responsive layout, reduced motion, bundle scope,
     runtime errors, and browser behavior.
   - Blocks on invisible controls, hover-only content, mobile overflow, or heavy
     code loaded on unrelated pages.

5. **Implementation Feasibility Reviewer**
   - Checks whether requirements are testable in the existing Astro/React stack.
   - Blocks ambiguous, brittle, impractical, or unmaintainable requirements.

Optional reviewers for large changes:

- bilingual parity reviewer;
- source leakage reviewer;
- competitive benchmark reviewer.

## Review Packet

Before review starts, the author must provide a review packet.

For spec changes, include:

- changed or newly proposed sections;
- goals and non-goals;
- affected chapters, states, breakpoints, and locales;
- acceptance criteria for each normative requirement;
- known risks or open questions.

For implementation changes, include:

- implementation summary and changed components;
- screenshots for 320, 375, 768, 1024, and 1440 px;
- light and dark mode evidence;
- English and Chinese evidence;
- keyboard, touch, focus, reduced-motion, and contrast evidence;
- build and local verification results;
- intentional deviations from this spec.

## Scoring Rubric

Each reviewer scores 0-4 in each category.

| Score | Meaning |
| --- | --- | --- |
| 0 | Fails the category or lacks enough evidence to judge. |
| 1 | Major gaps; directionally wrong or too ambiguous. |
| 2 | Partially acceptable but needs meaningful revision. |
| 3 | Strong; only minor issues remain. |
| 4 | Excellent; clear, complete, and well evidenced. |

Weighted categories:

| Category | Weight | Blocking Threshold |
| --- | ---: | --- |
| Reader value and product fit | 20% | below 3 |
| Spec clarity and testability | 20% | below 3 |
| Visual coherence and craft | 20% | below 3 |
| Accessibility and usability | 20% | below 3; core control failure blocks automatically |
| Implementation feasibility and maintainability | 15% | below 3 |
| Evidence quality | 5% | below 3 |

Publication requires:

- no blocking issues;
- weighted score at least 85%;
- no individual category below 3;
- all mandatory reviewers explicitly state "Approved for publication";
- if any reviewer requests changes, a fresh reviewer pass must be run after the
  fix.

## Blocking Issue Policy

An issue is blocking if any of the following are true:

- the spec contains conflicting, vague, or untestable requirements;
- two reasonable implementers could produce materially different outcomes from
  the same requirement;
- a core reader workflow becomes unclear, slower, hidden, or less trustworthy;
- accessibility fails for contrast, keyboard access, focus visibility, text
  scaling, reduced motion, or screen-reader structure;
- mobile or desktop layouts overlap, clip content, hide controls, or require
  awkward horizontal scrolling to understand the main idea;
- the implementation cannot be verified with screenshots, interaction checks,
  tests, or manual acceptance steps;
- the proposal relies on brittle one-off behavior instead of reusable visual
  rules;
- performance, asset weight, or rendering behavior noticeably degrades reading;
- the change contradicts the book's positioning, voice, or navigation model;
- a visual is attractive but source-inaccurate;
- a central runtime concept still depends only on prose plus Mermaid.

Blocking issues must be fixed before approval. A blocker cannot be accepted as
"known risk." To remove a blocker, either fix the issue or reduce scope so the
failing requirement is no longer claimed.

## Non-Blocking Issue Policy

An issue is non-blocking only when all conditions are true:

- the core reader journey still works;
- accessibility is not degraded;
- the spec remains clear and testable;
- no rubric category falls below the approval threshold;
- the reviewer records a concrete follow-up, owner, and target phase.

Examples: copy polish, minor spacing refinement, optional illustration
improvements, or future component consolidation that does not affect approved
behavior.

## Repeated Review Protocol

1. Implement or revise the visual layer.
2. Run local validation: `npm run verify`, browser screenshots, interaction
   probes, and private-path scans.
3. Spawn at least three fresh reviewer agents using high reasoning effort.
4. Compile reviewer findings into a prioritized action plan.
5. Fix every blocking issue and every meaningful non-blocking issue that is
   feasible without compromising architecture.
6. Re-run validation.
7. Re-run fresh reviewer agents.
8. Repeat until all mandatory reviewers report no blocking issues, no meaningful
   non-blocking issues, and approval for publication.

If the same blocker survives two review cycles, reduce scope or rewrite the
requirement before another cycle begins.

Stopping early because the page is "good enough" violates this spec.

## Release Gate

Before publishing visual-layer changes:

- `npm run verify` passes.
- Generated output has no private path leaks.
- No `.vscode` files are staged.
- Playwright or Chromium screenshots cover light/dark mode, English/Chinese
  pages, and 320, 375, 768, 1024, and 1440 px widths.
- Browser probes verify no page-level horizontal overflow.
- Browser probes verify diagrams are nonblank and labels do not overlap nodes,
  arrows, code panels, or controls.
- Every new interactive component is exercised at least once in a browser.
- Reduced-motion mode is checked.
- Autoplay, if present, can pause and reset.
- Heavy interactive bundles are scoped to relevant chapters.
- Visual claims link back to source atlas entries or pinned source anchors.
- GitHub Pages workflow passes after push.
- Live URLs are smoke-tested after deploy.

## Unacceptable Outcomes

The following outcomes fail review even if the build passes:

- A chapter contains only prose plus Mermaid for a central runtime concept.
- A component looks polished but teaches less than the paragraph it replaced.
- The visual language changes randomly from chapter to chapter.
- Controls exist but the reader cannot predict what they do.
- Mobile users get a reduced or broken explanation.
- Chinese pages lag behind English pages.
- Animation attracts attention without showing causality.
- Source panels are just link lists.
- Pattern cards repeat text without making the pattern scannable.
- The result looks like a generic documentation theme.
