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

const supplementStatement = "";
const cjkPattern = /[\u3400-\u9fff]/;
const sentenceSplitPattern = /(?<=[。！？；!?])\s*/u;
const statementExampleSectionPattern =
  /(?:示例\s*\d*\s*[：:]|Example\s*\d*\s*:)[\s\S]*$/iu;
const statementExampleIntroSectionPattern =
  /(^|[。！？；;]\s*)[^。！？；;]*(?:下图|在文本格式中)[^。！？；;]*(?:示例|如下所示)[^。！？；;]*[：:][\s\S]*$/iu;
const statementExampleReferencePatterns = [
  /[（(][^（）()\n。！？；;：:]*?(?:示例|Example)[^（）()\n。！？；;：:]*?[）)]/giu,
  /[，,]\s*(?:如|参考|参见|请参考)[^。！？；;：:]*?(?:示例|Example)(?:图)?(?:所示)?/giu,
];
const statementInlineExampleTailPattern =
  /([。！？；;：:，,]\s*)(?:例如|比如|举例)[^。！？；;]*(?:[。！？；;]|$)/giu;
const statementExampleSentencePattern =
  /(^|[。！？；;]\s*)[^。！？；;：:]*(?:示例|Example|例如|比如|举例)[^。！？；;：:]*(?:[。！？；;：:]|$)/giu;
const statementResultFormatSentencePattern =
  /(^|[。！？；;]\s*)[^。！？；;：:]*(?:(?:查询|返回)?结果(?:表)?(?:的)?格式如下|(?:查询|返回)结果(?:表)?如下例)[^。！？；;：:]*(?:[。！？；;：:]|$)/giu;
const inlineEnumerationLabelPattern =
  /\s+((?:开关|按钮|操作|值|条件|规则|方法|步骤)\s*(?:\d+|[一二三四五六七八九十]+)\s*[：:])/gu;
const statementPreviewOverrides = {
  "search-in-rotated-sorted-array":
    "整数数组 nums 按升序排列，数组中的值互不相同。在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了向左旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标从 0 开始计数）。给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值 target，则返回它的下标，否则返回 -1。你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。",
  "4sum":
    "给你一个由 n 个整数组成的数组 nums，和一个目标值 target。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]]（若两个四元组元素一一对应，则认为两个四元组重复）：0 <= a, b, c, d < n；a、b、c 和 d 互不相同；nums[a] + nums[b] + nums[c] + nums[d] == target。你可以按任意顺序返回答案。",
  "range-sum-query-immutable":
    "给定一个整数数组 nums，处理以下类型的多个查询：计算索引 left 和 right（包含 left 和 right）之间的 nums 元素的和，其中 left <= right。实现 NumArray 类：NumArray(int[] nums) 使用数组 nums 初始化对象；int sumRange(int left, int right) 返回数组 nums 中索引 left 和 right 之间的元素总和，包含 left 和 right 两点，也就是 nums[left] + nums[left + 1] + ... + nums[right]。",
  "car-pooling":
    "车上最初有 capacity 个空座位。车只能向一个方向行驶，也就是说不允许掉头或改变方向。给定整数 capacity 和一个数组 trips，trips[i] = [numPassengers_i, from_i, to_i] 表示第 i 次旅行有 numPassengers_i 乘客，接他们和放他们的位置分别是 from_i 和 to_i。这些位置是从汽车的初始位置向东的公里数。当且仅当你可以在所有给定的行程中接送所有乘客时，返回 true，否则返回 false。",
  "implement-queue-using-stacks":
    "请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）。实现 MyQueue 类：void push(int x) 将元素 x 推到队列的末尾；int pop() 从队列的开头移除并返回元素；int peek() 返回队列开头的元素；boolean empty() 如果队列为空，返回 true，否则返回 false。说明：你只能使用标准的栈操作，也就是只有 push to top、peek/pop from top、size 和 is empty 操作是合法的；你所使用的语言也许不支持栈，可以使用 list 或 deque 来模拟一个栈，只要是标准的栈操作即可。",
  "maximize-spanning-tree-stability-with-upgrades":
    "给你一个整数 n，表示编号从 0 到 n - 1 的 n 个节点，以及一个 edges 列表，其中 edges[i] = [u_i, v_i, s_i, must_i]：u_i 和 v_i 表示节点 u_i 和 v_i 之间的一条无向边；s_i 是该边的强度；must_i 是一个整数（0 或 1）。如果 must_i == 1，则该边必须包含在生成树中，且不能升级。你还有一个整数 k，表示你可以执行的最多升级次数。每次升级会使边的强度翻倍，且每条可升级边（即 must_i == 0）最多只能升级一次。一个生成树的稳定性定义为其中所有边的最小强度。返回任何有效生成树可能达到的最大稳定性。如果无法连接所有节点，返回 -1。注意：图的一个生成树是该图中边的一个子集，它满足以下条件：将所有节点连接在一起；不形成任何环；包含恰好 n - 1 条边，其中 n 是图中节点的数量。",
  "find-minimum-in-rotated-sorted-array":
    "已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次旋转后，得到输入数组。注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]]。给你一个元素值互不相同的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的最小元素。你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。",
  "beautiful-arrangement-ii":
    "给你两个整数 n 和 k，请你构造一个答案列表 answer，该列表应当包含从 1 到 n 的 n 个不同正整数，并同时满足下述条件：假设该列表是 answer = [a_1, a_2, a_3, ..., a_n]，那么列表 [|a_1 - a_2|, |a_2 - a_3|, |a_3 - a_4|, ..., |a_n-1 - a_n|] 中应该有且仅有 k 个不同整数。返回列表 answer。如果存在多种答案，只需返回其中任意一种。",
  "longest-mountain-in-array":
    "把符合下列属性的数组 arr 称为山脉数组：arr.length >= 3；存在下标 i（0 < i < arr.length - 1），满足 arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 且 arr[i] > arr[i + 1] > ... > arr[arr.length - 1]。给出一个整数数组 arr，返回最长山脉子数组的长度。如果不存在山脉子数组，返回 0。",
  "find-minimum-in-rotated-sorted-array-ii":
    "已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次旋转后，得到输入数组。注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]]。给你一个可能存在重复元素值的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的最小元素。你必须尽可能减少整个过程的操作步骤。",
};
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
const identifierAtom =
  String.raw`[A-Za-z][A-Za-z0-9_]*(?:\s*\.\s*[A-Za-z][A-Za-z0-9_]*|\[[^\]\u3400-\u9fff]+\])*`;
const comparisonAtom = String.raw`(?:-?\d+(?:\s*(?:\^|\s)\s*\d+)?|${identifierAtom}(?:\s+(?:[ijkmn]|\d+|[ijkmn][+-]\d+))?)`;
const comparisonPattern = new RegExp(
  `${comparisonAtom}(?:\\s*(?:<=|>=|==|!\\s*=|!=|<|>|=)\\s*${comparisonAtom})+`,
  "g",
);
const functionCallAtom =
  String.raw`(?:[A-Za-z][A-Za-z0-9_]*\([^()\u3400-\u9fff]+\))`;
const arithmeticAtom =
  String.raw`(?:${functionCallAtom}|${identifierAtom}|-?\d+(?:\^\d+)?)`;
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
  const rawStatement = String(
    statementPreviewOverrides[problem.titleSlug] ||
      problem.statement ||
      problem.statementText ||
      problem.contentText ||
      problem.statementPreview ||
      "",
  );
  return stripStatementExamples(rawStatement);
}

function normalizeInlineEnumerationLabels(text) {
  return text.replace(
    inlineEnumerationLabelPattern,
    (match, label, offset, input) => {
      const normalizedLabel = label.replace(/\s*([：:])\s*/u, "$1");
      const previous = input.slice(0, offset).trimEnd().at(-1) || "";
      if (!previous || /[。！？；：:;]/u.test(previous)) {
        return ` ${normalizedLabel}`;
      }
      return `；${normalizedLabel}`;
    },
  );
}

function normalizeStatementText(text) {
  return normalizeInlineEnumerationLabels(
    String(text)
      .replace(/\r\n/g, "\n")
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/&ldquo;/gi, "“")
      .replace(/&rdquo;/gi, "”")
      .replace(/&lsquo;/gi, "‘")
      .replace(/&rsquo;/gi, "’")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/\s+([。！？；：，、])/gu, "$1")
      .replace(/([。！？；：，、])\s+/gu, "$1")
      .replace(/([（(])\s+/gu, "$1")
      .replace(/\s+([）)])/gu, "$1")
      .replace(/([：:])。/gu, "$1")
      .replace(/\.\s+\.\s+\./g, "...")
      .replace(/\s{2,}/g, " ")
      .trim(),
  );
}

function stripStatementExamples(text) {
  let cleaned = normalizeStatementText(text)
    .replace(statementExampleSectionPattern, "")
    .replace(statementExampleIntroSectionPattern, "$1")
    .trim();
  statementExampleReferencePatterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });
  return normalizeStatementText(
    cleaned
    .replace(statementInlineExampleTailPattern, (_match, prefix) => {
      if (/[。！？；;]/u.test(prefix)) return `${prefix.trim()} `;
      return "。 ";
    })
    .replace(statementResultFormatSentencePattern, (_match, prefix) => {
      return prefix || "";
    })
    .replace(statementExampleSentencePattern, (_match, prefix) => {
      return prefix || "";
    })
      .trim(),
  );
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
    current = joinStatementSentences(current, sentence);
  });
  if (current) paragraphs.push(current);
  return paragraphs;
}

function joinStatementSentences(left, right) {
  if (!left) return right;
  if (/[。！？；：，、]$/u.test(left)) return `${left}${right}`;
  return `${left} ${right}`;
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
    statementPreview: problem.statementPreview || supplementStatement,
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
