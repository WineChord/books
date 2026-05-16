import { readFile } from "node:fs/promises";

const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const codeTemplatesPath = new URL("src/data/leetcode-code-templates.ts", repoRoot);
const personalReferencesPath = new URL(
  "src/data/leetcode-implementation-references.ts",
  repoRoot,
);
const generatedReferencesPath = new URL(
  "src/data/leetcode-implementation-generated.ts",
  repoRoot,
);

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

function extractConstObject(source, exportName) {
  const pattern = new RegExp(
    `export const ${exportName} = (\\{[\\s\\S]*?\\n\\}) as const;`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

const leetcodeProblems = extractJsonArray(
  await readFile(problemsPath, "utf8"),
  "leetcodeProblems",
  "satisfies LeetcodeProblem\\[\\];",
);
const leetcodeByteDanceProblems = extractJsonArray(
  await readFile(bytedancePath, "utf8"),
  "leetcodeByteDanceProblems",
  "satisfies LeetcodeByteDanceProblem\\[\\];",
);
const leetcodeCodeTemplates = extractJsonObject(
  await readFile(codeTemplatesPath, "utf8"),
  "leetcodeCodeTemplates",
);
const leetcodeImplementationReferences = extractJsonObject(
  await readFile(personalReferencesPath, "utf8"),
  "leetcodeImplementationReferences",
);
const generatedReferencesSource = await readFile(generatedReferencesPath, "utf8");
const leetcodeGeneratedImplementationReferences = extractJsonObject(
  generatedReferencesSource,
  "leetcodeGeneratedImplementationReferences",
);
const leetcodeGeneratedImplementationStats = extractConstObject(
  generatedReferencesSource,
  "leetcodeGeneratedImplementationStats",
);

function targetProblems() {
  const result = [];
  const seen = new Set();
  for (const problem of [...leetcodeProblems, ...leetcodeByteDanceProblems]) {
    if (seen.has(problem.titleSlug)) continue;
    seen.add(problem.titleSlug);
    result.push(problem);
  }
  return result;
}

function isCpp(reference) {
  return reference.language === "C++" || reference.language === "C++17";
}

function officialCppTemplate(slug) {
  return (leetcodeCodeTemplates[slug] || []).some(
    (template) => template.lang === "C++" || template.langSlug === "cpp",
  );
}

function referencesFor(slug) {
  return [
    ...(leetcodeImplementationReferences[slug] || []),
    ...(leetcodeGeneratedImplementationReferences[slug] || []),
  ];
}

const target = targetProblems();
const missing = [];
const invalid = [];
const cppMissing = [];
let referenceCount = 0;

for (const problem of target) {
  const refs = referencesFor(problem.titleSlug);
  referenceCount += refs.length;
  if (!refs.length) {
    missing.push(problem);
    continue;
  }
  if (officialCppTemplate(problem.titleSlug) && !refs.some(isCpp)) {
    cppMissing.push(problem);
  }
  for (const reference of refs) {
    if (!reference.code?.trim()) {
      invalid.push([problem, "empty code"]);
      continue;
    }
    if (/\bTODO\b|sync the official LeetCode signature/i.test(reference.code)) {
      invalid.push([problem, "placeholder code"]);
    }
    if (!reference.sourceUrl || !reference.sourceTitle) {
      invalid.push([problem, "missing source metadata"]);
    }
  }
}

const generatedProblemCount = Object.keys(
  leetcodeGeneratedImplementationReferences,
).length;

if (generatedProblemCount !== leetcodeGeneratedImplementationStats.problems) {
  invalid.push([
    { titleSlug: "leetcodeGeneratedImplementationStats" },
    "problem count mismatch",
  ]);
}

if (missing.length || cppMissing.length || invalid.length) {
  if (missing.length) {
    console.error("Missing implementation references:");
    for (const problem of missing.slice(0, 80)) {
      console.error(`- ${problem.frontendId} ${problem.titleSlug} ${problem.titleCn}`);
    }
  }
  if (cppMissing.length) {
    console.error("Problems with official C++ templates but no C++ reference:");
    for (const problem of cppMissing.slice(0, 80)) {
      console.error(`- ${problem.frontendId} ${problem.titleSlug} ${problem.titleCn}`);
    }
  }
  if (invalid.length) {
    console.error("Invalid implementation references:");
    for (const [problem, reason] of invalid.slice(0, 80)) {
      console.error(`- ${problem.titleSlug}: ${reason}`);
    }
  }
  process.exit(1);
}

console.log(
  `LeetCode implementations OK: ${target.length} problems, ` +
    `${referenceCount} references, generated ${generatedProblemCount}.`,
);
