import { readFile } from "node:fs/promises";

const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const constraintsPath = new URL(
  "src/data/leetcode-problem-constraints.ts",
  repoRoot,
);
const codeTemplatesPath = new URL("src/data/leetcode-code-templates.ts", repoRoot);
const personalReferencesPath = new URL(
  "src/data/leetcode-implementation-references.ts",
  repoRoot,
);
const generatedReferencesPath = new URL(
  "src/data/leetcode-implementation-generated.ts",
  repoRoot,
);

const defaultMaxSamples = 12;
const minImplementationChars = 120;
const minImplementationLines = 5;
const bytedanceSupplementStatement = "";
const bytedanceSupplementApproach = "";
const placeholderPattern =
  /\b(?:TODO|TBD|FIXME)\b|待补充|后续同步|placeholder|sync the official LeetCode signature/i;

function maxSamples() {
  const cliValue = process.argv.find((arg) =>
    arg.startsWith("--max-samples="),
  );
  const rawValue =
    cliValue?.slice("--max-samples=".length) ??
    process.env.LEETCODE_COVERAGE_MAX_SAMPLES;
  const parsed = Number.parseInt(rawValue ?? "", 10);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return defaultMaxSamples;
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

function extractJsonObject(source, exportName) {
  const pattern = new RegExp(
    `export const ${exportName} = \\((\\{[\\s\\S]*?\\n\\})\\) satisfies Record`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

function frequencyLabel(frequency) {
  if (frequency === null || frequency === undefined) return "补充";
  return `${frequency}%`;
}

function buildCandidates(problems, bytedanceProblems) {
  const existingSlugs = new Set(problems.map((problem) => problem.titleSlug));
  const baseProblems = problems.map((problem) => ({
    ...problem,
    sourceGroup: "top888",
  }));
  const supplements = bytedanceProblems
    .filter((problem) => !existingSlugs.has(problem.titleSlug))
    .map((problem, index) => ({
      topRank: null,
      frequencyRank: problems.length + index + 1,
      hotRank: null,
      frontendId: problem.frontendId,
      titleCn: problem.titleCn,
      titleSlug: problem.titleSlug,
      url: problem.url,
      difficulty: problem.difficulty,
      acRate: problem.acRate,
      frequency: frequencyLabel(problem.frequency),
      bytedance: true,
      bytedanceVerified: problem.source !== "legacyTop888",
      hot100: false,
      paidOnly: problem.paidOnly,
      tags: problem.tags,
      statementPreview: problem.statementPreview ?? bytedanceSupplementStatement,
      approachPreview: problem.approachPreview ?? bytedanceSupplementApproach,
      followUps: problem.followUps ?? [],
      sourceGroup: "bytedanceSupplement",
    }));
  return [...baseProblems, ...supplements];
}

function isBlank(value) {
  return typeof value !== "string" || value.trim().length === 0;
}

function hasPlaceholder(value) {
  return typeof value === "string" && placeholderPattern.test(value);
}

function isCppReference(reference) {
  return reference.language === "C++" || reference.language === "C++17";
}

function hasOfficialCppTemplate(templates) {
  return templates.some(
    (template) => template.lang === "C++" || template.langSlug === "cpp",
  );
}

function implementationReferencesFor(
  slug,
  personalReferences,
  generatedReferences,
) {
  return [
    ...(personalReferences[slug] ?? []),
    ...(generatedReferences[slug] ?? []),
  ];
}

function meaningfulCodeLines(code) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false;
      if (line.startsWith("//")) return false;
      if (line.startsWith("*")) return false;
      if (line.startsWith("/*")) return false;
      if (line.startsWith("*/")) return false;
      return true;
    }).length;
}

function problemLabel(problem) {
  const rank =
    problem.topRank === null || problem.topRank === undefined
      ? `#${problem.frequencyRank}`
      : String(problem.topRank);
  return `${rank} ${problem.frontendId} ${problem.titleSlug} ${problem.titleCn}`;
}

function addIssue(issues, severity, category, problem, detail) {
  issues.push({
    severity,
    category,
    label: problemLabel(problem),
    detail,
  });
}

function checkStudyContent(problem, issues) {
  const isByteDanceSupplement = problem.sourceGroup === "bytedanceSupplement";
  const severity = isByteDanceSupplement ? "error" : "warning";
  if (isBlank(problem.statementPreview)) {
    addIssue(issues, severity, "missing statement", problem, "empty");
  } else if (hasPlaceholder(problem.statementPreview)) {
    addIssue(issues, severity, "placeholder statement", problem, "placeholder");
  }
  if (isBlank(problem.approachPreview)) {
    addIssue(issues, severity, "missing approach", problem, "empty");
  } else if (hasPlaceholder(problem.approachPreview)) {
    addIssue(issues, severity, "placeholder approach", problem, "placeholder");
  }
  if (!Array.isArray(problem.followUps) || problem.followUps.length === 0) {
    addIssue(issues, severity, "missing generic followups", problem, "empty");
  }
  if (isByteDanceSupplement && !problem.tags?.length) {
    addIssue(issues, "error", "missing tags", problem, "empty");
  }
  if (!Array.isArray(problem.followUps) || problem.followUps.length === 0) {
    return;
  }
  for (const followUp of problem.followUps) {
    if (isBlank(followUp.question) || isBlank(followUp.answer)) {
      addIssue(
        issues,
        severity,
        "invalid generic followup",
        problem,
        "missing question or answer",
      );
    }
  }
}

function checkCodeTemplates(problem, templates, issues) {
  if (
    problem.sourceGroup === "bytedanceSupplement" &&
    (!Array.isArray(templates) || templates.length === 0)
  ) {
    addIssue(issues, "error", "missing code templates", problem, "empty");
  }
}

function checkProblemConstraints(problem, constraintsBySlug, issues) {
  const constraints = constraintsBySlug[problem.titleSlug];
  if (!Array.isArray(constraints) || constraints.length === 0) {
    addIssue(issues, "error", "missing data ranges", problem, "empty");
    return;
  }
  for (const constraint of constraints) {
    if (isBlank(constraint)) {
      addIssue(issues, "error", "invalid data range", problem, "blank item");
      return;
    }
  }
}

function checkCompanyFollowUps(problem, issues) {
  for (const followUp of problem.companyFollowUps ?? []) {
    if (
      isBlank(followUp.question) ||
      isBlank(followUp.answer) ||
      isBlank(followUp.company) ||
      isBlank(followUp.sourceTitle) ||
      isBlank(followUp.sourceUrl)
    ) {
      addIssue(
        issues,
        "error",
        "invalid company followup source",
        problem,
        "missing question, answer, company, sourceTitle, or sourceUrl",
      );
    }
  }
}

function checkImplementations(problem, references, templates, issues) {
  if (references.length === 0) {
    addIssue(issues, "error", "missing implementation", problem, "empty");
    return;
  }
  if (hasOfficialCppTemplate(templates) && !references.some(isCppReference)) {
    addIssue(issues, "error", "missing C++ reference", problem, "empty");
  }
  for (const reference of references) {
    if (isBlank(reference.code)) {
      addIssue(issues, "error", "empty implementation code", problem, "empty");
      continue;
    }
    if (hasPlaceholder(reference.code)) {
      addIssue(
        issues,
        "error",
        "placeholder implementation code",
        problem,
        reference.sourceTitle || reference.language,
      );
    }
    if (isBlank(reference.sourceTitle) || isBlank(reference.sourceUrl)) {
      addIssue(
        issues,
        "error",
        "missing implementation source",
        problem,
        reference.language,
      );
    }
    if (
      reference.code.trim().length < minImplementationChars ||
      meaningfulCodeLines(reference.code) < minImplementationLines
    ) {
      addIssue(
        issues,
        "warning",
        "short implementation code",
        problem,
        reference.sourceTitle || reference.language,
      );
    }
  }
}

function checkWarningCoverage(problem, references, issues) {
  if (!problem.companyFollowUps?.length) {
    addIssue(
      issues,
      "warning",
      "missing company followups",
      problem,
      "no sourced company-specific followups",
    );
  }
  const cppReferences = references.filter(isCppReference);
  const approachNames = new Set(
    cppReferences.map((reference) => reference.approachTitle ?? "Reference"),
  );
  if (cppReferences.length < 2 || approachNames.size < 2) {
    addIssue(
      issues,
      "warning",
      "limited multi-solution coverage",
      problem,
      `${cppReferences.length} C++ reference(s), ${approachNames.size} approach label(s)`,
    );
  }
}

function countByCategory(issues) {
  const counts = new Map();
  for (const issue of issues) {
    counts.set(issue.category, (counts.get(issue.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((left, right) => {
    return right[1] - left[1] || left[0].localeCompare(right[0]);
  });
}

function printIssueSection(title, issues, limit) {
  if (issues.length === 0) return;
  console.log(title);
  for (const [category, count] of countByCategory(issues)) {
    console.log(`- ${category}: ${count}`);
  }
  console.log("Samples:");
  for (const issue of issues.slice(0, limit)) {
    console.log(`- ${issue.category}: ${issue.label} (${issue.detail})`);
  }
}

const [
  problemsSource,
  bytedanceSource,
  constraintsSource,
  codeTemplatesSource,
  personalReferencesSource,
  generatedReferencesSource,
] = await Promise.all([
  readFile(problemsPath, "utf8"),
  readFile(bytedancePath, "utf8"),
  readFile(constraintsPath, "utf8"),
  readFile(codeTemplatesPath, "utf8"),
  readFile(personalReferencesPath, "utf8"),
  readFile(generatedReferencesPath, "utf8"),
]);

const leetcodeProblems = extractJsonArray(
  problemsSource,
  "leetcodeProblems",
  "satisfies LeetcodeProblem\\[\\];",
);
const leetcodeByteDanceProblems = extractJsonArray(
  bytedanceSource,
  "leetcodeByteDanceProblems",
  "satisfies LeetcodeByteDanceProblem\\[\\];",
);
const leetcodeProblemConstraints = extractJsonObject(
  constraintsSource,
  "leetcodeProblemConstraints",
);
const leetcodeCodeTemplates = extractJsonObject(
  codeTemplatesSource,
  "leetcodeCodeTemplates",
);
const leetcodeImplementationReferences = extractJsonObject(
  personalReferencesSource,
  "leetcodeImplementationReferences",
);
const leetcodeGeneratedImplementationReferences = extractJsonObject(
  generatedReferencesSource,
  "leetcodeGeneratedImplementationReferences",
);

const candidates = buildCandidates(leetcodeProblems, leetcodeByteDanceProblems);
const issues = [];
let implementationReferenceCount = 0;
let cppReferenceProblemCount = 0;

for (const problem of candidates) {
  const references = implementationReferencesFor(
    problem.titleSlug,
    leetcodeImplementationReferences,
    leetcodeGeneratedImplementationReferences,
  );
  const templates = leetcodeCodeTemplates[problem.titleSlug] ?? [];
  implementationReferenceCount += references.length;
  if (references.some(isCppReference)) cppReferenceProblemCount += 1;
  checkStudyContent(problem, issues);
  checkCodeTemplates(problem, templates, issues);
  checkProblemConstraints(problem, leetcodeProblemConstraints, issues);
  checkCompanyFollowUps(problem, issues);
  checkImplementations(problem, references, templates, issues);
  checkWarningCoverage(problem, references, issues);
}

const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");
const supplementCount = candidates.filter(
  (problem) => problem.sourceGroup === "bytedanceSupplement",
).length;
const sampleLimit = maxSamples();

console.log("LeetCode study coverage summary:");
console.log(`- page candidates: ${candidates.length}`);
console.log(`- data range rows: ${Object.keys(leetcodeProblemConstraints).length}`);
console.log(`- Top888 data rows: ${leetcodeProblems.length}`);
console.log(`- ByteDance supplements: ${supplementCount}`);
console.log(`- implementation references: ${implementationReferenceCount}`);
console.log(`- problems with C++ references: ${cppReferenceProblemCount}`);
console.log(`- hard issues: ${errors.length}`);
console.log(`- warnings: ${warnings.length}`);

printIssueSection("\nHard issues by category:", errors, sampleLimit);
printIssueSection("\nWarnings by category:", warnings, sampleLimit);

if (errors.length > 0) {
  process.exit(1);
}
