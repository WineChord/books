import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const problemDataPath = join(rootDir, "src/data/leetcode-problems.ts");
const byteDanceDataPath = join(rootDir, "src/data/leetcode-bytedance.ts");
const mathDataPath = join(rootDir, "src/data/leetcode-problem-math.ts");

const expectedProblems = 872;
const badPlainTextPatterns = [
  { label: "plain n 2", regex: /\bn 2\b/ },
  { label: "plain n 3", regex: /\bn 3\b/ },
  { label: "plain 2 31", regex: /\b2 31\b/ },
  { label: "plain 10 9", regex: /\b10 9\b/ },
  { label: "plain 10 6", regex: /\b10 6\b/ },
  { label: "plain m x n", regex: /\bm x n\b/ },
  { label: "plain n x n", regex: /\bn x n\b/ },
  { label: "plain 2 x 1", regex: /\b2 x 1\b/ },
  { label: "plain start i", regex: /\bstart i\b/ },
  { label: "plain end i", regex: /\bend i\b/ },
  { label: "plain position i", regex: /\bposition i\b/ },
  { label: "plain speed i", regex: /\bspeed i\b/ },
  { label: "plain timestamp i", regex: /\btimestamp i\b/ },
  { label: "spaced not-equals", regex: /\b[ijk]\s+!\s+=\s+[ijk]\b/ },
];

function extractJsonExport(source, exportName) {
  const marker = `export const ${exportName} = `;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Missing export ${exportName}`);
  }
  const valueStart = markerIndex + marker.length;
  const openIndex = source.slice(valueStart).search(/[\[{]/);
  if (openIndex === -1) {
    throw new Error(`Missing JSON value for ${exportName}`);
  }
  const start = valueStart + openIndex;
  const open = source[start];
  const close = open === "[" ? "]" : "}";
  const end = balancedEnd(source, start, open, close);
  return JSON.parse(source.slice(start, end + 1));
}

function balancedEnd(source, start, open, close) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  throw new Error(`Unbalanced ${open}${close} JSON export`);
}

function stripGeneratedMath(html) {
  return removeKatexSpans(html)
    .replace(/<annotation\b[^>]*>.*?<\/annotation>/gs, " ")
    .replace(/<math\b[^>]*>.*?<\/math>/gs, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

function removeKatexSpans(html) {
  const openSpan = '<span class="katex">';
  let output = "";
  let cursor = 0;
  while (cursor < html.length) {
    const start = html.indexOf(openSpan, cursor);
    if (start === -1) {
      output += html.slice(cursor);
      break;
    }
    output += html.slice(cursor, start);
    let depth = 0;
    let scan = start;
    while (scan < html.length) {
      const nextOpen = html.indexOf("<span", scan);
      const nextClose = html.indexOf("</span>", scan);
      if (nextClose === -1) {
        cursor = html.length;
        break;
      }
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        scan = nextOpen + "<span".length;
        continue;
      }
      depth -= 1;
      scan = nextClose + "</span>".length;
      if (depth === 0) {
        cursor = scan;
        break;
      }
    }
    if (scan >= html.length) cursor = html.length;
  }
  return output;
}

function assertIncludes(value, expected, label) {
  if (!value.includes(expected)) {
    throw new Error(`${label} should include ${expected}`);
  }
}

const problemSource = readFileSync(problemDataPath, "utf8");
const byteDanceSource = readFileSync(byteDanceDataPath, "utf8");
const mathSource = readFileSync(mathDataPath, "utf8");
const problems = extractJsonExport(problemSource, "leetcodeProblems");
const byteDanceProblems = extractJsonExport(
  byteDanceSource,
  "leetcodeByteDanceProblems",
);
const statements = extractJsonExport(mathSource, "leetcodeProblemStatementHtml");
const constraints = extractJsonExport(
  mathSource,
  "leetcodeProblemConstraintHtml",
);
const stats = extractJsonExport(mathSource, "leetcodeProblemMathStats");
const mergedSlugs = new Set(problems.map((problem) => problem.titleSlug));
byteDanceProblems.forEach((problem) => mergedSlugs.add(problem.titleSlug));

if (mergedSlugs.size !== expectedProblems) {
  throw new Error(
    `Expected ${expectedProblems} merged problems, got ${mergedSlugs.size}`,
  );
}
if (Object.keys(statements).length !== expectedProblems) {
  throw new Error(
    `Expected ${expectedProblems} statement rows, got ${
      Object.keys(statements).length
    }`,
  );
}
if (Object.keys(constraints).length !== expectedProblems) {
  throw new Error(
    `Expected ${expectedProblems} constraint rows, got ${
      Object.keys(constraints).length
    }`,
  );
}
if (stats.problems !== expectedProblems || stats.katexErrors !== 0) {
  throw new Error(
    `Unexpected math stats: problems=${stats.problems}, errors=${stats.katexErrors}`,
  );
}

assertIncludes(
  statements["spiral-matrix-ii"],
  "n^{2}",
  "Spiral Matrix II statement",
);
assertIncludes(
  statements["spiral-matrix-ii"],
  "\\times",
  "Spiral Matrix II statement",
);
assertIncludes(
  statements["reverse-integer"],
  "2^{31}",
  "Reverse Integer statement",
);
assertIncludes(
  statements["domino-and-tromino-tiling"],
  "10^{9} + 7",
  "Domino and Tromino Tiling statement",
);
if (statements["4sum-ii"].includes("l &lt; n n")) {
  throw new Error("4Sum II statement should not split nums1 after n");
}
if (!constraints["two-sum"].some((item) => item.includes("10^{4}"))) {
  throw new Error("Two Sum constraints should render 10^4 with KaTeX");
}

const failures = [];
Object.entries(statements).forEach(([slug, html]) => {
  const text = stripGeneratedMath(html);
  badPlainTextPatterns.forEach(({ label, regex }) => {
    if (regex.test(text)) failures.push(`${slug}: ${label}`);
  });
});
Object.entries(constraints).forEach(([slug, items]) => {
  const text = stripGeneratedMath(items.join(" "));
  badPlainTextPatterns.forEach(({ label, regex }) => {
    if (regex.test(text)) failures.push(`${slug} constraints: ${label}`);
  });
});

if (failures.length) {
  throw new Error(
    `Found unrendered math fragments:\n${failures.slice(0, 40).join("\n")}`,
  );
}

console.log(
  `Checked ${expectedProblems} LeetCode math rows and ${stats.mathFragments} rendered fragments.`,
);
