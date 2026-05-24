import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const problemDataPath = join(rootDir, "src/data/leetcode-problems.ts");
const byteDanceDataPath = join(rootDir, "src/data/leetcode-bytedance.ts");
const seriesDataPath = join(rootDir, "src/data/leetcode-series.ts");
const outputPath = join(rootDir, "src/data/leetcode-problem-assets.ts");

const graphqlUrl = "https://leetcode.cn/graphql/";
const defaultRequestLimit = 1;
const defaultRequestDelayMs = 450;
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/125.0 Safari/537.36";
const assetSource = "leetcode-cn";
const emptyStats = {
  problems: 0,
  withAssets: 0,
  images: 0,
  tables: 0,
  failed: 0,
};
const questionQuery = `
query questionStatementAssets($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    titleSlug
    translatedContent
    content
    isPaidOnly
  }
}
`;
const sectionMarkerPattern =
  /<(?:p|h[1-6])\b[^>]*>\s*(?:<strong\b[^>]*>)?\s*(?:示例\s*\d*\s*[：:]|Example\s*\d*\s*:|提示\s*[：:]|Constraints\s*:)/iu;
const imageTagPattern = /<img\b[^>]*>/giu;
const tableTagPattern = /<table\b[\s\S]*?<\/table>/giu;
const allowedTableTags = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "code",
  "strong",
  "em",
  "sup",
  "sub",
  "br",
]);
const allowedImageHostPattern =
  /(^|\.)leetcode\.cn$|(^|\.)leetcode\.com$|^assets\.leetcode\.com$|^fastly\.jsdelivr\.net$/iu;

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

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function numberOption(name, fallback) {
  const value = Number(optionValue(name, fallback));
  return Number.isFinite(value) && value > 0 ? Math.trunc(value) : fallback;
}

function selectedSlugSet() {
  const value = optionValue("slugs", "");
  if (!value) return null;
  const slugs = value
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
  return slugs.length ? new Set(slugs) : null;
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

function readBookProblems() {
  const problems = extractJsonExport(
    readFileSync(problemDataPath, "utf8"),
    "leetcodeProblems",
  );
  const byteDanceProblems = extractJsonExport(
    readFileSync(byteDanceDataPath, "utf8"),
    "leetcodeByteDanceProblems",
  );
  const seriesProblems = extractJsonExport(
    readFileSync(seriesDataPath, "utf8"),
    "leetcodeSeriesProblems",
  );
  const seen = new Set();
  const result = [];
  for (const problem of [...problems, ...byteDanceProblems, ...seriesProblems]) {
    if (seen.has(problem.titleSlug)) continue;
    seen.add(problem.titleSlug);
    result.push(problem);
  }
  const slugs = selectedSlugSet();
  if (!slugs) return [...result];
  return result.filter((problem) => slugs.has(problem.titleSlug));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeAttributeValue(value) {
  return String(value)
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function tagAttributes(tag) {
  const attributes = new Map();
  const attributePattern =
    /([A-Za-z_:][-A-Za-z0-9_:.]*)\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+)/gu;
  for (const match of tag.matchAll(attributePattern)) {
    attributes.set(match[1].toLowerCase(), decodeAttributeValue(match[2]));
  }
  return attributes;
}

function safeUrl(rawUrl) {
  const value = String(rawUrl || "").trim();
  if (!value) return "";
  const normalized = value.startsWith("//") ? `https:${value}` : value;
  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:") return "";
    if (!allowedImageHostPattern.test(url.hostname)) return "";
    return url.toString();
  } catch (_error) {
    return "";
  }
}

function safeStyle(rawStyle) {
  const declarations = [];
  for (const chunk of String(rawStyle || "").split(";")) {
    const [rawName, rawValue] = chunk.split(":");
    if (!rawName || !rawValue) continue;
    const name = rawName.trim().toLowerCase();
    const value = rawValue.trim();
    if (!["height", "max-width", "width"].includes(name)) continue;
    if (!/^(?:\d+(?:\.\d+)?(?:px|%)|auto)$/iu.test(value)) continue;
    declarations.push(`${name}: ${value}`);
  }
  return declarations.join("; ");
}

function sanitizeImageTag(tag) {
  const attributes = tagAttributes(tag);
  const src = safeUrl(attributes.get("src"));
  if (!src) return "";
  const alt = attributes.get("alt") || "";
  const style = safeStyle(attributes.get("style"));
  return [
    "<img",
    `src="${escapeHtml(src)}"`,
    `alt="${escapeHtml(alt)}"`,
    'loading="lazy"',
    'decoding="async"',
    style ? `style="${escapeHtml(style)}"` : "",
    "/>",
  ]
    .filter(Boolean)
    .join(" ");
}

function sanitizeTableHtml(tableHtml) {
  return String(tableHtml || "")
    .replace(/<!--[\s\S]*?-->/gu, "")
    .replace(/<script\b[\s\S]*?<\/script>/giu, "")
    .replace(/<style\b[\s\S]*?<\/style>/giu, "")
    .replace(/<\/?([A-Za-z][A-Za-z0-9]*)\b[^>]*>/gu, (tag, rawName) => {
      const name = rawName.toLowerCase();
      if (!allowedTableTags.has(name)) return "";
      if (tag.startsWith("</")) return `</${name}>`;
      if (name === "br") return "<br>";
      return `<${name}>`;
    })
    .trim();
}

function firstStatementSectionEnd(content) {
  const match = content.match(sectionMarkerPattern);
  return match?.index ?? content.length;
}

function extractStatementAssets(content) {
  const assets = [];
  const seen = new Set();
  const sectionEnd = firstStatementSectionEnd(content);

  for (const match of content.matchAll(imageTagPattern)) {
    const html = sanitizeImageTag(match[0]);
    if (!html || seen.has(html)) continue;
    seen.add(html);
    assets.push({ type: "image", source: assetSource, html });
  }

  for (const match of content.matchAll(tableTagPattern)) {
    const index = match.index ?? content.length;
    if (index > sectionEnd) continue;
    const html = sanitizeTableHtml(match[0]);
    if (!html || seen.has(html)) continue;
    seen.add(html);
    assets.push({ type: "table", source: assetSource, html });
  }

  return assets;
}

async function fetchProblemContent(problem) {
  const titleSlug = problem.titleSlug;
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": userAgent,
      referer: `https://leetcode.cn/problems/${titleSlug}/description/`,
      ...(process.env.LEETCODE_CN_COOKIE
        ? { cookie: process.env.LEETCODE_CN_COOKIE }
        : {}),
    },
    body: JSON.stringify({
      query: questionQuery,
      variables: { titleSlug },
    }),
  });
  if (!response.ok) {
    throw new Error(`${titleSlug}: HTTP ${response.status}`);
  }
  const payload = await response.json();
  const question = payload.data?.question;
  if (!question) throw new Error(`${titleSlug}: missing question`);
  return question.translatedContent || question.content || "";
}

async function collectProblemAssets(problem, index, total) {
  const label = `${index + 1}/${total} ${problem.titleSlug}`;
  try {
    const content = await fetchProblemContent(problem);
    const assets = extractStatementAssets(content);
    if (assets.length) {
      console.log(`${label}: ${assets.length} asset(s)`);
    }
    return { problem, assets, failed: false };
  } catch (error) {
    console.warn(`${label}: ${error.message}`);
    return { problem, assets: [], failed: true };
  }
}

async function collectAllAssets(problems) {
  const results = [];
  let nextIndex = 0;
  const requestLimit = numberOption("concurrency", defaultRequestLimit);
  const requestDelayMs = numberOption("delay-ms", defaultRequestDelayMs);

  async function worker() {
    while (nextIndex < problems.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await collectProblemAssets(
        problems[index],
        index,
        problems.length,
      );
      await sleep(requestDelayMs);
    }
  }

  const workers = Array.from(
    { length: Math.min(requestLimit, problems.length) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
}

function readExistingAssets() {
  if (!existsSync(outputPath)) return {};
  return extractJsonExport(
    readFileSync(outputPath, "utf8"),
    "leetcodeProblemStatementAssets",
  );
}

function readHeadAssets() {
  try {
    return extractJsonExport(
      execFileSync("git", [
        "show",
        "HEAD:src/data/leetcode-problem-assets.ts",
      ], {
        cwd: rootDir,
        encoding: "utf8",
      }),
      "leetcodeProblemStatementAssets",
    );
  } catch (_error) {
    return {};
  }
}

function buildOutput(results, existingAssets = {}) {
  const assetMap = { ...existingAssets };
  const stats = { ...emptyStats, problems: results.length };

  for (const result of results) {
    if (result.failed) {
      stats.failed += 1;
      continue;
    }
    if (!result.assets.length) {
      delete assetMap[result.problem.titleSlug];
      continue;
    }
    assetMap[result.problem.titleSlug] = result.assets;
  }

  for (const assets of Object.values(assetMap)) {
    if (!assets.length) continue;
    stats.withAssets += 1;
    for (const asset of assets) {
      if (asset.type === "image") stats.images += 1;
      if (asset.type === "table") stats.tables += 1;
    }
  }

  return `// Generated by scripts/sync-leetcode-statement-assets.mjs.
// Do not edit by hand.

export interface LeetcodeProblemStatementAsset {
  type: "image" | "table";
  source: "leetcode-cn";
  html: string;
}

export const leetcodeProblemStatementAssets = ${JSON.stringify(
    assetMap,
    null,
    2,
  )} satisfies Record<string, LeetcodeProblemStatementAsset[]>;

export const leetcodeProblemStatementAssetStats = ${JSON.stringify(
    stats,
    null,
    2,
  )};
`;
}

const problems = readBookProblems();
const results = await collectAllAssets(problems);
const existingAssets = {
  ...readHeadAssets(),
  ...readExistingAssets(),
};
const output = buildOutput(results, existingAssets);
writeFileSync(outputPath, output);
const stats = extractJsonExport(output, "leetcodeProblemStatementAssetStats");
console.log(
  `Wrote ${stats.withAssets} asset-bearing problems ` +
    `(${stats.images} images, ${stats.tables} tables) to ${outputPath}`,
);
if (stats.failed) {
  console.warn(`Finished with ${stats.failed} content fetch failure(s)`);
}
