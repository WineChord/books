import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const katex = require("katex");
const katexPackage = require("katex/package.json");

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const problemDataPath = join(rootDir, "src/data/leetcode-problems.ts");
const byteDanceDataPath = join(rootDir, "src/data/leetcode-bytedance.ts");
const constraintDataPath = join(
  rootDir,
  "src/data/leetcode-problem-constraints.ts",
);
const mathDataPath = join(rootDir, "src/data/leetcode-problem-math.ts");

const supplementStatement =
  "字节跳动企业题库补充题。题面预览需要后续同步，当前可点击题目链接打开力扣原题。";
const cjkPattern = /[\u3400-\u9fff]/;
const sentenceSplitPattern = /(?<=[。！？；;.!?])\s*/u;
const mathHtmlOptions = {
  output: "htmlAndMathml",
  strict: "ignore",
  throwOnError: false,
  trust: false,
};

const subscriptNames = [
  "mentions_string",
  "numPassengers",
  "bottomLeft",
  "heightMap",
  "topRight",
  "timestamp",
  "position",
  "quality",
  "percent",
  "subtext",
  "source",
  "target",
  "haystack",
  "needle",
  "matrix",
  "height",
  "weight",
  "speed",
  "start",
  "index",
  "upper",
  "answer",
  "headA",
  "headB",
  "nums1",
  "nums2",
  "nums3",
  "nums4",
  "word1",
  "word2",
  "from",
  "grid",
  "left",
  "next",
  "node",
  "nums",
  "root",
  "rows",
  "cols",
  "right",
  "arr1",
  "arr2",
  "head",
  "word",
  "end",
  "arr",
  "mat",
  "strs",
  "val",
  "to",
  "T",
  "F",
  "u",
  "v",
  "w",
  "a",
  "b",
  "s",
  "t",
  "x",
  "y",
].sort((left, right) => right.length - left.length);
const proseIdentifierNames = [
  "mentions_string",
  "numPassengers",
  "joinedArray",
  "bottomLeft",
  "heightMap",
  "topRight",
  "queryIP",
  "timestamp",
  "position",
  "quality",
  "percent",
  "subtext",
  "source",
  "target",
  "haystack",
  "needle",
  "numbers",
  "matrix",
  "heights",
  "height",
  "weight",
  "prices",
  "points",
  "queries",
  "answer",
  "result",
  "output",
  "speed",
  "start",
  "index",
  "upper",
  "lower",
  "headA",
  "headB",
  "nums1",
  "nums2",
  "nums3",
  "nums4",
  "word1",
  "word2",
  "arr1",
  "arr2",
  "from",
  "grid",
  "left",
  "node",
  "root",
  "rows",
  "cols",
  "text",
  "list",
  "nums",
  "next",
  "prev",
  "data",
  "cost",
  "time",
  "word",
  "head",
  "strs",
  "arr",
  "mat",
  "key",
  "map",
  "val",
  "end",
  "to",
  "N",
  "M",
  "T",
  "F",
  "u",
  "v",
  "w",
  "a",
  "b",
  "c",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "x",
  "y",
  "z",
].sort((left, right) => right.length - left.length);
const proseIdentifierNameSet = new Set(proseIdentifierNames);
const escapedProseIdentifierPattern = proseIdentifierNames
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const proseIdentifierPattern = new RegExp(
  `\\b(?:${escapedProseIdentifierPattern})(?:\\s*\\.\\s*(?:length|val|next|random)|\\s*\\[[^\\]\\u3400-\\u9fff]+\\])*`,
  "g",
);
const singleLetterContextPattern =
  /[\u3400-\u9fff()[\]（）,，.。:：;；+\-*/<>=]/u;
const subscriptNamePattern = subscriptNames
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const subscriptTextPattern = new RegExp(
  `\\b(${subscriptNamePattern})\\s+([A-Za-z0-9]+(?:[+-]\\d+)?)\\b`,
  "g",
);
const existingSubscriptPattern =
  /\b([A-Za-z][A-Za-z0-9_.]*)_([ijkmn]|\d+|[ijkmn][+-]\d+)\b/g;
const comparisonAtom = String.raw`(?:-?\d+(?:\s*(?:\^|\s)\s*\d+)?|[A-Za-z][A-Za-z0-9_.]*(?:\[[^\]\u3400-\u9fff]+\])?(?:\s+(?:[ijkmn]|\d+|[ijkmn][+-]\d+))?)`;
const comparisonPattern = new RegExp(
  `${comparisonAtom}(?:\\s*(?:<=|>=|==|!\\s*=|!=|<|>|=)\\s*${comparisonAtom})+`,
  "g",
);
const functionCallAtom =
  String.raw`(?:[A-Za-z][A-Za-z0-9_]*\([^()\u3400-\u9fff]+\))`;
const arithmeticAtom = String.raw`(?:${functionCallAtom}|[A-Za-z][A-Za-z0-9_.]*(?:\[[^\]\u3400-\u9fff]+\])?|-?\d+(?:\^\d+)?)`;
const arithmeticOperator = String.raw`(?:\s*[+*/]\s*|\s+-\s+)`;
const arithmeticExpressionPattern = new RegExp(
  `${arithmeticAtom}(?:${arithmeticOperator}${arithmeticAtom})+`,
  "g",
);
const arithmeticComparisonPattern = new RegExp(
  `${arithmeticExpressionPattern.source}\\s*(?:<=|>=|==|!\\s*=|!=|<|>|=)\\s*(?:${arithmeticExpressionPattern.source}|${comparisonAtom})`,
  "g",
);
const tupleComparisonPattern =
  /\b\d+\s*(?:<=|>=|<|>)\s*[A-Za-z](?:\s*,\s*[A-Za-z])+\s*(?:<=|>=|<|>)\s*[A-Za-z]/g;
const indexedNamePattern =
  /\b[A-Za-z][A-Za-z0-9_.]*(?:\[[A-Za-z0-9_.+\-*/\s]+\])+\b/g;
const dimensionJoinerPattern = String.raw`(?:x|×|&times;)`;
const dimensionPattern = new RegExp(
  `\\b(?:\\d+|[A-Za-z][A-Za-z0-9_]*|10(?:\\^|\\s+)\\d+)\\s*${dimensionJoinerPattern}\\s*(?:\\d+|[A-Za-z][A-Za-z0-9_]*|10(?:\\^|\\s+)\\d+)\\b`,
  "g",
);
const powerPattern =
  /\b(?:10|2)\s+\d+\b|\b(?:10|2)\^\d+\b|\bn\s+[23]\b|\bx\s+n\b/g;
const bigOPattern = /O\((?:[^()。！？；，,]|\([^()]*\))*\)/g;
const formulaPattern =
  /\b(?:[TF]\s+[A-Za-z0-9+\-]+)(?:\s*=\s*(?:[TF]\s+[A-Za-z0-9+\-]+)(?:\s*\+\s*(?:[TF]\s+[A-Za-z0-9+\-]+))*)?/g;
const bracketExpressionPattern = /\[[A-Za-z0-9_,.\s+\-*/^<>=|]+\]/g;
const parenthesizedMathPattern = /\([A-Za-z0-9_,.\[\]\s+\-*/^<>=|]+\)/g;
const modularNumberPattern = /\b10(?:\s+|\^)\d+\s*\+\s*\d+\b/g;
const scientificProductPattern = /\b\d+\s*\*\s*10(?:\s+|\^)\d+\b/g;
const averagePattern =
  /\baverage\([A-Za-z]\)\s*==\s*average\([A-Za-z]\)/g;

let renderedMathFragments = 0;
let katexErrors = 0;

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatIdentifier(token) {
  const value = token.trim();
  if (/^[A-Za-z][A-Za-z0-9_]*$/.test(value) && value.length > 1) {
    return `\\mathrm{${value.replace(/_/g, "\\_")}}`;
  }
  if (/^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/.test(value)) {
    return `\\mathrm{${value.replace(/_/g, "\\_")}}`;
  }
  return value;
}

function formatDimensionToken(token) {
  return formatIdentifier(token);
}

function isSimpleIdentifierExpression(value) {
  return (
    /^[A-Za-z][A-Za-z0-9_]*$/.test(value) ||
    /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/.test(value)
  );
}

function compactExpressionSpacing(value) {
  return value
    .replace(/&times;/g, "x")
    .replace(/\b([A-Za-z][A-Za-z0-9_]*)\s*\.\s*([A-Za-z][A-Za-z0-9_]*)\b/g, "$1.$2")
    .replace(/\b([A-Za-z][A-Za-z0-9_]*)\s+\[/g, "$1[")
    .replace(/\]\s+\[/g, "][");
}

function isProseIdentifier(raw, context) {
  const compact = compactExpressionSpacing(raw).replace(/\s+/g, "");
  const name = compact.match(/^[A-Za-z][A-Za-z0-9_]*/)?.[0] ?? "";
  if (!proseIdentifierNameSet.has(name)) return false;
  if (compact.length > 1) return true;

  const before = context.text.slice(Math.max(0, context.start - 3), context.start);
  const after = context.text.slice(context.end, context.end + 3);
  return (
    singleLetterContextPattern.test(before) ||
    singleLetterContextPattern.test(after)
  );
}

function problemStatementText(problem) {
  return String(
    problem.statement ||
      problem.statementText ||
      problem.contentText ||
      problem.statementPreview ||
      "",
  ).trim();
}

function statementParagraphs(problem) {
  const text = problemStatementText(problem);
  if (!text) return [];
  const explicit = text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (explicit.length > 1) return explicit;
  const sentences = text.split(sentenceSplitPattern).filter(Boolean);
  if (sentences.length <= 2) return [text];

  const paragraphs = [];
  let current = "";
  sentences.forEach((sentence) => {
    if (current && `${current} ${sentence}`.length > 190) {
      paragraphs.push(current);
      current = sentence;
      return;
    }
    current = current ? `${current} ${sentence}` : sentence;
  });
  if (current) paragraphs.push(current);
  return paragraphs;
}

function normalizeLatex(raw) {
  let text = String(raw)
    .trim()
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .replace(/−/g, "-")
    .replace(/×/g, "x")
    .replace(/\s+/g, " ");
  text = compactExpressionSpacing(text);
  if (isSimpleIdentifierExpression(text)) return formatIdentifier(text);

  text = text
    .replace(/\.\.\./g, "\\ldots")
    .replace(/\.\./g, "\\ldots")
    .replace(/\.\s+\.\s+\./g, "\\ldots")
    .replace(/\bnlog\s*\(/gi, "n \\log(")
    .replace(/\blog\b/g, "\\log")
    .replace(/\b(sum|average)\s*\(/g, (_match, name) => {
      return `${formatIdentifier(name)}(`;
    })
    .replace(/\b10\s+(\d+)\b/g, "10^{$1}")
    .replace(/\b2\s+31\b/g, "2^{31}")
    .replace(/\bn\s+([23])\b/g, "n^{$1}")
    .replace(/\b([A-Za-z0-9_.]+)\s*\^\s*(\d+)\b/g, "$1^{$2}")
    .replace(
      /\b((?:10\^\{\d+\})|(?:\d+|[A-Za-z][A-Za-z0-9_]*)(?:\^\{\d+\})?)\s*x\s*((?:10\^\{\d+\})|(?:\d+|[A-Za-z][A-Za-z0-9_]*)(?:\^\{\d+\})?)\b/g,
      (_match, left, right) => {
        return `${formatDimensionToken(left)} \\times ${formatDimensionToken(
          right,
        )}`;
      },
    )
    .replace(/\bx\s+n\b/g, "x^{n}")
    .replace(subscriptTextPattern, (_match, name, index) => {
      if (name === "x" && index === "n") return "x^{n}";
      return `${formatIdentifier(name)}_{${index}}`;
    })
    .replace(existingSubscriptPattern, (_match, name, index) => {
      return `${formatIdentifier(name)}_{${index}}`;
    })
    .replace(
      /(?<!\\)\b([A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+)\b/g,
      (_match, name) => formatIdentifier(name),
    )
    .replace(/\b([A-Za-z][A-Za-z0-9_]*)(?=\[)/g, (_match, name) => {
      return formatIdentifier(name);
    })
    .replace(/(?<![\\{A-Za-z])\b([A-Za-z][A-Za-z0-9_]*)\b/g, (match, name) => {
      if (!proseIdentifierNameSet.has(name)) return match;
      return formatIdentifier(name);
    })
    .replace(/<=/g, "\\le ")
    .replace(/>=/g, "\\ge ")
    .replace(/!\s*=/g, "\\ne ")
    .replace(/!=/g, "\\ne ")
    .replace(/==/g, "=")
    .replace(/\*/g, "\\cdot ");

  return text.trim();
}

function renderMath(raw) {
  const latex = normalizeLatex(raw);
  if (!latex) return escapeHtml(raw);
  renderedMathFragments += 1;
  try {
    return katex.renderToString(latex, mathHtmlOptions);
  } catch (_error) {
    katexErrors += 1;
    return `<span class="leetcode-math-fallback">${escapeHtml(raw)}</span>`;
  }
}

function addRange(
  ranges,
  text,
  regex,
  shouldUse = () => true,
  options = {},
) {
  for (const match of text.matchAll(regex)) {
    const raw = match[0];
    const start = match.index ?? 0;
    const end = start + raw.length;
    const before = start > 0 ? text[start - 1] : "";
    const after = end < text.length ? text[end] : "";
    if (
      (!options.allowLeftAdjacent && /[A-Za-z0-9_]/.test(before)) ||
      (!options.allowRightAdjacent && /[A-Za-z0-9_]/.test(after))
    ) {
      continue;
    }
    if (!raw.trim() || cjkPattern.test(raw) || !/[A-Za-z0-9]/.test(raw)) {
      continue;
    }
    if (!shouldUse(raw, { text, start, end, before, after })) continue;
    ranges.push({ start, end, raw });
  }
}

function mathRanges(text) {
  const ranges = [];
  addRange(ranges, text, bigOPattern);
  addRange(ranges, text, dimensionPattern);
  addRange(ranges, text, modularNumberPattern);
  addRange(ranges, text, scientificProductPattern);
  addRange(ranges, text, averagePattern);
  addRange(ranges, text, arithmeticComparisonPattern);
  addRange(ranges, text, tupleComparisonPattern, () => true, {
    allowRightAdjacent: true,
  });
  addRange(ranges, text, comparisonPattern);
  addRange(ranges, text, indexedNamePattern);
  addRange(ranges, text, powerPattern);
  addRange(
    ranges,
    text,
    new RegExp(
      `\\b(?:${subscriptNamePattern})\\s+(?:[ijkmn]|\\d+|[ijkmn][+-]\\d+|\\d+[+-]\\d+)\\b`,
      "g",
    ),
  );
  addRange(ranges, text, formulaPattern, (raw) => {
    return /=|[+-]/.test(raw) || /\b[TF]\s+(?:n|\d)/.test(raw);
  });
  addRange(ranges, text, bracketExpressionPattern, (raw) => {
    return (
      /\.\.|<=|>=|==|!=|_|\^/.test(raw) ||
      /\b(?:10|2)\s+\d+\b/.test(raw) ||
      /\d+\s*,\s*[A-Za-z]/.test(raw) ||
      /[A-Za-z]\s*,\s*\d+/.test(raw)
    );
  });
  addRange(ranges, text, parenthesizedMathPattern, (raw) => {
    return /,|<=|>=|==|!=|[+*/=]|\s-\s/.test(raw);
  });
  addRange(ranges, text, arithmeticExpressionPattern, (raw) => {
    return !/^\d+\s*-\s*\d+$/.test(raw);
  });
  addRange(ranges, text, proseIdentifierPattern, isProseIdentifier);

  return mergeRanges(ranges);
}

function mergeRanges(ranges) {
  return ranges
    .sort((left, right) => {
      return (
        left.start - right.start ||
        right.end - right.start - (left.end - left.start)
      );
    })
    .reduce((merged, range) => {
      const previous = merged[merged.length - 1];
      if (previous && range.start < previous.end) return merged;
      merged.push(range);
      return merged;
    }, []);
}

function inlineMathHtml(text) {
  const ranges = mathRanges(text);
  if (!ranges.length) return escapeHtml(text);

  let html = "";
  let cursor = 0;
  ranges.forEach((range) => {
    html += escapeHtml(text.slice(cursor, range.start));
    html += renderMath(range.raw);
    cursor = range.end;
  });
  html += escapeHtml(text.slice(cursor));
  return html;
}

function isStandaloneMathLine(text) {
  const trimmed = text.trim();
  return (
    trimmed.length > 0 &&
    trimmed.length <= 180 &&
    !cjkPattern.test(trimmed) &&
    !/[`"']/.test(trimmed) &&
    /(?:<=|>=|==|!=|<|>|=|\^|_|\*|\[[^\]]+\])/.test(trimmed)
  );
}

function constraintHtml(item) {
  const text = String(item).trim();
  if (!text) return "";
  if (isStandaloneMathLine(text)) return renderMath(text);
  return inlineMathHtml(text);
}

function statementHtml(problem) {
  const paragraphs = statementParagraphs(problem);
  return paragraphs.map((item) => `<p>${inlineMathHtml(item)}</p>`).join("");
}

const problemSource = readFileSync(problemDataPath, "utf8");
const byteDanceSource = readFileSync(byteDanceDataPath, "utf8");
const constraintSource = readFileSync(constraintDataPath, "utf8");
const problems = extractJsonExport(problemSource, "leetcodeProblems");
const byteDanceProblems = extractJsonExport(
  byteDanceSource,
  "leetcodeByteDanceProblems",
);
const constraintsBySlug = extractJsonExport(
  constraintSource,
  "leetcodeProblemConstraints",
);

const existingSlugs = new Set(problems.map((problem) => problem.titleSlug));
const supplements = byteDanceProblems
  .filter((problem) => !existingSlugs.has(problem.titleSlug))
  .map((problem) => ({
    ...problem,
    statementPreview: supplementStatement,
  }));
const bookProblems = [...problems, ...supplements];

const statementHtmlBySlug = {};
const constraintHtmlBySlug = {};
let constraintCount = 0;
bookProblems.forEach((problem) => {
  statementHtmlBySlug[problem.titleSlug] = statementHtml(problem);
  const items = constraintsBySlug[problem.titleSlug] ?? [];
  constraintHtmlBySlug[problem.titleSlug] = items
    .map(constraintHtml)
    .filter(Boolean);
  constraintCount += items.length;
});

const stats = {
  problems: bookProblems.length,
  statements: Object.keys(statementHtmlBySlug).length,
  constraintProblems: Object.values(constraintHtmlBySlug).filter(
    (items) => items.length,
  ).length,
  constraints: constraintCount,
  mathFragments: renderedMathFragments,
  katexErrors,
  katexVersion: katexPackage.version,
};

const generated = `// Generated by scripts/sync-leetcode-math.mjs.
// Do not edit by hand.

export const leetcodeProblemStatementHtml = ${JSON.stringify(
  statementHtmlBySlug,
  null,
  2,
)} as const satisfies Record<string, string>;

export const leetcodeProblemConstraintHtml = ${JSON.stringify(
  constraintHtmlBySlug,
  null,
  2,
)} as const satisfies Record<string, readonly string[]>;

export const leetcodeProblemMathStats = ${JSON.stringify(
  stats,
  null,
  2,
)} as const;
`;

writeFileSync(mathDataPath, generated);
console.log(
  `Synced ${stats.problems} LeetCode math rows with ${stats.mathFragments} KaTeX fragments.`,
);
if (stats.katexErrors) {
  console.warn(`KaTeX fallback fragments: ${stats.katexErrors}`);
}
