import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  chapterVisualSpecs,
  requiredIconNames,
  requiredLocalizedSurfaceNames,
  sourceSnapshot,
  visualSpecStatus,
} from "../src/visual/visual-specs.mjs";

const sourceBlob = `https://github.com/openai/codex/blob/${sourceSnapshot}/`;
const sourceRaw = `https://raw.githubusercontent.com/openai/codex/${sourceSnapshot}/`;
const localSourceRoot = process.env.CODEX_SOURCE_ROOT
  ? pathToFileURL(`${resolve(process.env.CODEX_SOURCE_ROOT)}/`)
  : new URL("../../codex/", import.meta.url);
const sourceContentCache = new Map();
const privatePattern =
  /\/Users\/|\/data\/home\/|\/data2\/|wineguo|guoqizhou|file:\/\//;
const placeholderPattern = /\b(tbd|todo|placeholder|lorem ipsum)\b/i;
const weakSourceAnchorPatterns = [
  [/^(?:\/\/|\/\*|\*|<!--|#(?!\!))/, "comment-only line"],
  [/^#!?\[/, "Rust attribute line"],
  [/^(?:-\s*)?if(?:\s|:)/, "conditional guard line"],
  [/^(?:(?:pub|pub\([^)]*\))\s+)?use\s+/, "import or re-export line"],
  [/^(?:unsafe\s+)?impl(?:<[^>]+>)?\s/, "broad impl header"],
  [/^def\s+main\s*\(/, "generic script entrypoint"],
  [/^name:/, "workflow label line"],
];

const allowedFallbacks = new Set(["static-svg", "table", "step-list", "mermaid"]);
const allowedMotionPolicies = new Set([
  "none",
  "step",
  "playable",
  "scrubbable",
]);
const allowedRoles = new Set([
  "contract",
  "runtime",
  "policy",
  "ui",
  "persistence",
  "tests",
  "generated-artifact",
  "release",
  "ci",
]);
const pinnedLinePattern = /#L[1-9]\d*$/;
const allowedLedgerStatuses = new Set([
  "planned",
  "implemented",
  "verified",
  "approved",
]);
const plannedLedgerCells = {
  evidence: "pending all gates",
  residualRisk: "not implemented",
  approval: "pending",
};
const unresolvedLedgerPattern = /\bpending\b/i;
const expectedTargets = new Set([
  "P1 pilot",
  "P2 foundations",
  "P2 core",
  "P3 surfaces",
  "P3 extensions",
  "P3 advanced",
  "P3 governance",
  "P4 synthesis",
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function localSourceHead() {
  try {
    const root = localSourceRoot.pathname;
    return execFileSync("git", ["-C", root, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function configuredSourceCommit() {
  const bookConfig = readFileSync(
    new URL("../src/book.config.ts", import.meta.url),
    "utf8",
  );
  const match = bookConfig.match(/sourceCommit = "([0-9a-f]{40})"/);
  assert(match, "src/book.config.ts must define sourceCommit");
  return match[1];
}

const localSourceCommit = localSourceHead();
if (localSourceCommit !== null) {
  assert(
    localSourceCommit === sourceSnapshot,
    `local source checkout ${localSourceRoot.pathname} is at ${localSourceCommit}, ` +
      `expected ${sourceSnapshot}`,
  );
}

const sourceCommit = configuredSourceCommit();
assert(
  sourceSnapshot === sourceCommit,
  `visual sourceSnapshot (${sourceSnapshot}) differs from book sourceCommit (${sourceCommit})`,
);

function assertText(value, path) {
  assert(typeof value === "string" && value.trim().length > 0, `${path} missing`);
  assert(!privatePattern.test(value), `${path} contains a private path`);
  assert(!placeholderPattern.test(value), `${path} contains placeholder text`);
}

function lineNumberFromPinnedUrl(pinnedUrl) {
  const match = pinnedUrl.match(/#L(\d+)$/);
  assert(match, `${pinnedUrl} must contain a line number`);
  return Number(match[1]);
}

function assertTextArray(value, path, { min, max }) {
  assert(Array.isArray(value), `${path} must be an array`);
  assert(value.length >= min, `${path} must contain at least ${min} items`);
  if (max !== undefined) {
    assert(value.length <= max, `${path} must contain at most ${max} items`);
  }

  const seen = new Set();
  for (const [index, item] of value.entries()) {
    const itemPath = `${path}[${index}]`;
    assertText(item, itemPath);
    const normalized = item.trim().toLowerCase();
    assert(!seen.has(normalized), `${itemPath} duplicates another item`);
    seen.add(normalized);
  }
}

function expectedRoute(chapter, lang) {
  if (chapter === "Epilogue") {
    return lang === "zh"
      ? "zh/codex-from-source/epilogue"
      : "codex-from-source/epilogue";
  }
  const number = String(Number(chapter)).padStart(2, "0");
  return lang === "zh"
    ? `zh/codex-from-source/chapter-${number}`
    : `codex-from-source/chapter-${number}`;
}

async function sourceFileContent(anchorPath) {
  if (sourceContentCache.has(anchorPath)) {
    return sourceContentCache.get(anchorPath);
  }

  const localFile = new URL(anchorPath, localSourceRoot);
  let content;
  if (existsSync(localFile)) {
    content = readFileSync(localFile, "utf8");
  } else {
    const response = await fetch(`${sourceRaw}${anchorPath}`);
    assert(
      response.ok,
      `unable to fetch pinned source ${anchorPath}: HTTP ${response.status}`,
    );
    content = await response.text();
  }

  sourceContentCache.set(anchorPath, content);
  return content;
}

async function assertSourceLineExists(anchor, path) {
  const lineNumber = lineNumberFromPinnedUrl(anchor.pinnedUrl);
  const content = await sourceFileContent(anchor.path);

  const lines = content.split(/\r?\n/);
  assert(
    lineNumber <= lines.length,
    `${path}.pinnedUrl points past end of source file`,
  );
  assert(
    lines[lineNumber - 1].trim().length > 0,
    `${path}.pinnedUrl points at a blank source line`,
  );
  const sourceLine = lines[lineNumber - 1].trim();
  for (const [pattern, label] of weakSourceAnchorPatterns) {
    assert(
      !pattern.test(sourceLine),
      `${path}.pinnedUrl points at a weak ${label}: ${sourceLine}`,
    );
  }
  if (anchor.lineTextIncludes !== undefined) {
    assertText(anchor.lineTextIncludes, `${path}.lineTextIncludes`);
    assert(
      sourceLine.includes(anchor.lineTextIncludes),
      `${path}.pinnedUrl line must include "${anchor.lineTextIncludes}"`,
    );
  }
}

function normalizeCell(value) {
  return value.trim().replaceAll("`", "").replace(/\s+/g, " ");
}

function parseMarkdownTable(path, requiredHeaders) {
  const file = new URL(`../${path}`, import.meta.url);
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => {
    const trimmed = line.trim();
    return (
      trimmed.startsWith("|") &&
      requiredHeaders.every((header) => trimmed.includes(header))
    );
  });
  assert(headerIndex >= 0, `${path} is missing the expected table`);

  const rows = [];
  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith("|")) {
      break;
    }

    rows.push(
      line
        .slice(1, -1)
        .split("|")
        .map(normalizeCell),
    );
  }

  return rows;
}

function normalizeVisualName(value) {
  return normalizeCell(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function assertPublicDocSafe(path) {
  const file = new URL(`../${path}`, import.meta.url);
  const body = readFileSync(file, "utf8");
  assert(!privatePattern.test(body), `${path} contains a private path`);
  assert(!placeholderPattern.test(body), `${path} contains placeholder text`);
}

function assertRowMatches(actual, expected, path, rowIndex) {
  assert(
    actual.length >= expected.length,
    `${path} row ${rowIndex + 1} has too few columns`,
  );
  for (const [columnIndex, expectedCell] of expected.entries()) {
    assert(
      actual[columnIndex] === expectedCell,
      `${path} row ${rowIndex + 1} column ${columnIndex + 1} expected ` +
        `"${expectedCell}", found "${actual[columnIndex]}"`,
    );
  }
}

function assertLedgerProgression(row, path, rowIndex) {
  const recordId = row[0];
  const status = row[5];
  const evidence = row[6];
  const residualRisk = row[7];
  const approval = row[8];

  assert(
    allowedLedgerStatuses.has(status),
    `${path} row ${rowIndex + 1} has invalid ledger status ${status}`,
  );
  assertText(evidence, `${recordId}.ledger.evidence`);
  assertText(residualRisk, `${recordId}.ledger.residualRisk`);
  assertText(approval, `${recordId}.ledger.approval`);

  if (status === "planned") {
    assert(
      evidence === plannedLedgerCells.evidence,
      `${path} row ${rowIndex + 1} planned evidence must be ` +
        `"${plannedLedgerCells.evidence}"`,
    );
    assert(
      residualRisk === plannedLedgerCells.residualRisk,
      `${path} row ${rowIndex + 1} planned residual risk must be ` +
        `"${plannedLedgerCells.residualRisk}"`,
    );
    assert(
      approval === plannedLedgerCells.approval,
      `${path} row ${rowIndex + 1} planned approval must be ` +
        `"${plannedLedgerCells.approval}"`,
    );
    return;
  }

  assert(
    evidence !== plannedLedgerCells.evidence,
    `${path} row ${rowIndex + 1} ${status} evidence must name concrete artifacts`,
  );
  assert(
    !unresolvedLedgerPattern.test(evidence),
    `${path} row ${rowIndex + 1} ${status} evidence must not be pending`,
  );
  assert(
    residualRisk !== plannedLedgerCells.residualRisk,
    `${path} row ${rowIndex + 1} ${status} residual risk must be reassessed`,
  );
  assert(
    !unresolvedLedgerPattern.test(residualRisk),
    `${path} row ${rowIndex + 1} ${status} residual risk must not be pending`,
  );
  assert(
    approval !== plannedLedgerCells.approval,
    `${path} row ${rowIndex + 1} ${status} row must name reviewer approvals`,
  );
  assert(
    !unresolvedLedgerPattern.test(approval),
    `${path} row ${rowIndex + 1} ${status} approval must not be pending`,
  );
}

assert(
  visualSpecStatus.scope === "internal-implementation-contract",
  "visual spec status must mark rewrite specs as internal implementation contract",
);
assert(
  visualSpecStatus.publicRoutes === false,
  "rewrite visual specs are excluded from public routes and must be marked internal",
);

assert(
  chapterVisualSpecs.length === 26,
  `expected 26 visual specs, found ${chapterVisualSpecs.length}`,
);

const ids = new Set();
const chapters = new Set();
const usedIcons = new Set();
const expectedLocalizationLanguages = ["en", "zh"];

for (const spec of chapterVisualSpecs) {
  assertText(spec.id, "spec.id");
  assert(!ids.has(spec.id), `duplicate visual spec id ${spec.id}`);
  ids.add(spec.id);

  assertText(spec.chapter, `${spec.id}.chapter`);
  assert(!chapters.has(spec.chapter), `duplicate chapter ${spec.chapter}`);
  chapters.add(spec.chapter);

  assert(
    spec.route === expectedRoute(spec.chapter, "en"),
    `${spec.id}.route must match chapter route`,
  );
  assert(
    spec.zhRoute === expectedRoute(spec.chapter, "zh"),
    `${spec.id}.zhRoute must match Chinese chapter route`,
  );

  assertText(spec.displayName?.en, `${spec.id}.displayName.en`);
  assertText(spec.displayName?.zh, `${spec.id}.displayName.zh`);
  assertText(spec.concept?.en, `${spec.id}.concept.en`);
  assertText(spec.concept?.zh, `${spec.id}.concept.zh`);

  assertText(
    spec.primaryInteractive?.component,
    `${spec.id}.primaryInteractive.component`,
  );
  assertText(
    spec.primaryInteractive?.readerQuestion?.en,
    `${spec.id}.primaryInteractive.readerQuestion.en`,
  );
  assertText(
    spec.primaryInteractive?.readerQuestion?.zh,
    `${spec.id}.primaryInteractive.readerQuestion.zh`,
  );

  assertTextArray(spec.secondaryDiagrams, `${spec.id}.secondaryDiagrams`, {
    min: 1,
    max: 3,
  });

  assert(
    Array.isArray(spec.iconSet) && spec.iconSet.length >= 4,
    `${spec.id}.iconSet must contain at least four icons`,
  );
  for (const icon of spec.iconSet) {
    assertText(icon, `${spec.id}.iconSet`);
    assert(
      requiredIconNames.includes(icon),
      `${spec.id}.iconSet includes unknown icon ${icon}`,
    );
    usedIcons.add(icon);
  }

  assert(
    Array.isArray(spec.localizationContract?.languages),
    `${spec.id}.localizationContract.languages must be an array`,
  );
  assert(
    expectedLocalizationLanguages.every((language) =>
      spec.localizationContract.languages.includes(language),
    ),
    `${spec.id}.localizationContract.languages must include English and Chinese`,
  );
  assert(
    Array.isArray(spec.localizationContract?.requiredSurfaces),
    `${spec.id}.localizationContract.requiredSurfaces must be an array`,
  );
  assert(
    requiredLocalizedSurfaceNames.every((surface) =>
      spec.localizationContract.requiredSurfaces.includes(surface),
    ),
    `${spec.id}.localizationContract.requiredSurfaces is incomplete`,
  );

  assert(
    Array.isArray(spec.sourceAnchors) && spec.sourceAnchors.length >= 2,
    `${spec.id}.sourceAnchors must contain at least two structured anchors`,
  );
  for (const [index, anchor] of spec.sourceAnchors.entries()) {
    const prefix = `${spec.id}.sourceAnchors[${index}]`;
    assert(allowedRoles.has(anchor.role), `${prefix}.role is invalid`);
    assertText(anchor.path, `${prefix}.path`);
    assert(
      !anchor.path.startsWith("/") && !anchor.path.includes(".."),
      `${prefix}.path must be repository-relative`,
    );
    assertText(anchor.pinnedUrl, `${prefix}.pinnedUrl`);
    assert(
      anchor.pinnedUrl.startsWith(sourceBlob),
      `${prefix}.pinnedUrl must use pinned Codex blob URL`,
    );
    assert(
      pinnedLinePattern.test(anchor.pinnedUrl),
      `${prefix}.pinnedUrl must include a concrete line anchor`,
    );
    assert(
      !anchor.pinnedUrl.endsWith("#L1"),
      `${prefix}.pinnedUrl must point at a source-specific line, not file start`,
    );
    assert(
      anchor.pinnedUrl ===
        `${sourceBlob}${anchor.path}#L${lineNumberFromPinnedUrl(anchor.pinnedUrl)}`,
      `${prefix}.pinnedUrl must exactly match pinned source path and line`,
    );
    await assertSourceLineExists(anchor, prefix);
    assertText(anchor.architectureClaim, `${prefix}.architectureClaim`);
    assertText(anchor.readerTakeaway, `${prefix}.readerTakeaway`);
    assertText(anchor.visualState, `${prefix}.visualState`);
    assertText(anchor.leakageNotes, `${prefix}.leakageNotes`);
  }

  assert(allowedFallbacks.has(spec.fallback), `${spec.id}.fallback is invalid`);
  assert(
    allowedMotionPolicies.has(spec.motionPolicy),
    `${spec.id}.motionPolicy is invalid`,
  );
  assertTextArray(
    spec.requiredStatesOrEdges,
    `${spec.id}.requiredStatesOrEdges`,
    { min: 4 },
  );
  assertTextArray(spec.invariants, `${spec.id}.invariants`, { min: 2 });
  assertTextArray(
    spec.misconceptionsCaught,
    `${spec.id}.misconceptionsCaught`,
    { min: 2 },
  );
  assert(
    Array.isArray(spec.comprehensionChecks) &&
      spec.comprehensionChecks.length >= 2 &&
      spec.comprehensionChecks.length <= 3,
    `${spec.id}.comprehensionChecks must contain 2-3 checks`,
  );
  const sourceAnchorPaths = spec.sourceAnchors.map((anchor) => anchor.path);
  const sourceAnchorRefs = spec.sourceAnchors.map(
    (anchor) => `${anchor.path}#L${lineNumberFromPinnedUrl(anchor.pinnedUrl)}`,
  );
  for (const [index, item] of spec.comprehensionChecks.entries()) {
    const prefix = `${spec.id}.comprehensionChecks[${index}]`;
    assertText(item.question, `${prefix}.question`);
    assertText(item.expectedAnswer, `${prefix}.expectedAnswer`);
    assertText(item.visualState, `${prefix}.visualState`);
    assertText(item.sourceEvidence, `${prefix}.sourceEvidence`);
    assert(
      sourceAnchorPaths.some((path) => item.sourceEvidence.includes(path)),
      `${prefix}.sourceEvidence must cite at least one sourceAnchors path`,
    );
    assert(
      Array.isArray(item.sourceEvidenceRefs) && item.sourceEvidenceRefs.length >= 1,
      `${prefix}.sourceEvidenceRefs must contain source-line refs`,
    );
    for (const [refIndex, ref] of item.sourceEvidenceRefs.entries()) {
      assertText(ref, `${prefix}.sourceEvidenceRefs[${refIndex}]`);
      assert(
        sourceAnchorRefs.includes(ref),
        `${prefix}.sourceEvidenceRefs[${refIndex}] must match a current source anchor`,
      );
    }
    assertText(item.misconceptionCaught, `${prefix}.misconceptionCaught`);
  }

  assertTextArray(spec.reviewQuestions, `${spec.id}.reviewQuestions`, { min: 2 });
  assert(
    expectedTargets.has(spec.targetPhase),
    `${spec.id}.targetPhase must be one of the approved phases`,
  );
}

for (let chapter = 1; chapter <= 25; chapter += 1) {
  assert(chapters.has(String(chapter)), `missing visual spec for chapter ${chapter}`);
}
assert(chapters.has("Epilogue"), "missing visual spec for epilogue");

for (const icon of requiredIconNames) {
  assert(usedIcons.has(icon), `required icon ${icon} is never used`);
}

const stagedFiles = execFileSync("git", ["diff", "--cached", "--name-only"], {
  encoding: "utf8",
})
  .split(/\r?\n/)
  .filter(Boolean);
const trackedVscodeFiles = execFileSync("git", ["ls-files", ".vscode"], {
  encoding: "utf8",
})
  .split(/\r?\n/)
  .filter(Boolean);
assert(
  stagedFiles.every((file) => !file.startsWith(".vscode/")),
  "No .vscode files may be staged for publication",
);
assert(
  trackedVscodeFiles.length === 0,
  "No .vscode files may be tracked in the publication repository",
);

const englishRecordRows = parseMarkdownTable(
  "docs/codex-from-source/rewrite/visual-spec-records.md",
  ["Record ID", "Route", "Primary Interactive"],
);
const chineseRecordRows = parseMarkdownTable(
  "docs/zh/codex-from-source/rewrite/visual-spec-records.md",
  ["Record ID", "Route", "Primary Interactive"],
);
const englishLedgerRows = parseMarkdownTable(
  "docs/codex-from-source/rewrite/visual-implementation-ledger.md",
  ["Record ID", "Phase", "Primary Interactive", "Status"],
);
const chineseLedgerRows = parseMarkdownTable(
  "docs/zh/codex-from-source/rewrite/visual-implementation-ledger.md",
  ["Record ID", "Phase", "Primary Interactive", "状态"],
);
const englishPlanRows = parseMarkdownTable(
  "docs/codex-from-source/rewrite/visual-experience-spec.md",
  ["Chapter", "Required Primary Explainer", "Reader Question"],
);
const chinesePlanRows = parseMarkdownTable(
  "docs/zh/codex-from-source/rewrite/visual-experience-spec.md",
  ["章节", "必备主解释器", "Reader Question"],
);

for (const visualDoc of [
  "docs/codex-from-source/rewrite/visual-experience-spec.md",
  "docs/zh/codex-from-source/rewrite/visual-experience-spec.md",
]) {
  assertPublicDocSafe(visualDoc);
}

assert(
  englishRecordRows.length === chapterVisualSpecs.length,
  "English VisualSpec record table must mirror canonical record count",
);
assert(
  chineseRecordRows.length === chapterVisualSpecs.length,
  "Chinese VisualSpec record table must mirror canonical record count",
);
assert(
  englishLedgerRows.length === chapterVisualSpecs.length,
  "English implementation ledger must mirror canonical record count",
);
assert(
  chineseLedgerRows.length === chapterVisualSpecs.length,
  "Chinese implementation ledger must mirror canonical record count",
);
assert(
  englishPlanRows.length === chapterVisualSpecs.length,
  "English visual experience plan must mirror canonical record count",
);
assert(
  chinesePlanRows.length === chapterVisualSpecs.length,
  "Chinese visual experience plan must mirror canonical record count",
);

for (const [index, spec] of chapterVisualSpecs.entries()) {
  const expectedChapterCell =
    spec.chapter === "Epilogue" ? "Epilogue" : `${spec.chapter}.`;
  assert(
    englishPlanRows[index][0].startsWith(expectedChapterCell),
    `English visual plan row ${index + 1} must match chapter ${spec.chapter}`,
  );
  assert(
    chinesePlanRows[index][0].startsWith(expectedChapterCell),
    `Chinese visual plan row ${index + 1} must match chapter ${spec.chapter}`,
  );
  assert(
    normalizeVisualName(englishPlanRows[index][1]) ===
      normalizeVisualName(spec.primaryInteractive.component),
    `${spec.id} English visual plan component must mirror canonical record`,
  );
  assert(
    normalizeVisualName(chinesePlanRows[index][1]) ===
      normalizeVisualName(spec.primaryInteractive.component),
    `${spec.id} Chinese visual plan component must mirror canonical record`,
  );
  assert(
    englishPlanRows[index][2] === spec.primaryInteractive.readerQuestion.en,
    `${spec.id} English visual plan reader question must mirror canonical record`,
  );
  assert(
    chinesePlanRows[index][2] === spec.primaryInteractive.readerQuestion.zh,
    `${spec.id} Chinese visual plan reader question must mirror canonical record`,
  );

  const commonRecordCells = [
    spec.id,
    spec.primaryInteractive.component,
    `${spec.fallback} / ${spec.motionPolicy}`,
    spec.targetPhase,
    String(spec.comprehensionChecks.length),
  ];
  assertRowMatches(
    englishRecordRows[index],
    [spec.id, spec.route, ...commonRecordCells.slice(1)],
    "docs/codex-from-source/rewrite/visual-spec-records.md",
    index,
  );
  assertRowMatches(
    chineseRecordRows[index],
    [spec.id, spec.zhRoute, ...commonRecordCells.slice(1)],
    "docs/zh/codex-from-source/rewrite/visual-spec-records.md",
    index,
  );

  const fallbackMotion = `${spec.fallback} / ${spec.motionPolicy}`;
  const commonLedgerPrefix = [
    spec.id,
    spec.targetPhase,
    spec.primaryInteractive.component,
    fallbackMotion,
  ];

  assertRowMatches(
    englishLedgerRows[index],
    [
      ...commonLedgerPrefix,
      "structured anchors in canonical record",
    ],
    "docs/codex-from-source/rewrite/visual-implementation-ledger.md",
    index,
  );
  assertRowMatches(
    chineseLedgerRows[index],
    [
      ...commonLedgerPrefix,
      "canonical record 中的结构化 anchors",
    ],
    "docs/zh/codex-from-source/rewrite/visual-implementation-ledger.md",
    index,
  );

  assertLedgerProgression(
    englishLedgerRows[index],
    "docs/codex-from-source/rewrite/visual-implementation-ledger.md",
    index,
  );
  assertLedgerProgression(
    chineseLedgerRows[index],
    "docs/zh/codex-from-source/rewrite/visual-implementation-ledger.md",
    index,
  );
  assert(
    englishLedgerRows[index][5] === chineseLedgerRows[index][5],
    `${spec.id} ledger status must match across English and Chinese ledgers`,
  );
  assert(
    englishLedgerRows[index][6] === chineseLedgerRows[index][6],
    `${spec.id} ledger evidence must match across English and Chinese ledgers`,
  );
  assert(
    englishLedgerRows[index][7] === chineseLedgerRows[index][7],
    `${spec.id} ledger residual risk must match across English and Chinese ledgers`,
  );
  assert(
    englishLedgerRows[index][8] === chineseLedgerRows[index][8],
    `${spec.id} ledger approval must match across English and Chinese ledgers`,
  );
}

console.log(`checked ${chapterVisualSpecs.length} visual spec records`);
