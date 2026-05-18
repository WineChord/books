import { readFile, writeFile } from "node:fs/promises";

const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const defaultConcurrency = 3;
const defaultRetryCount = 4;
const defaultRequestDelayMs = 180;
const defaultBackoffMs = 1200;
const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const personalReferencesPath = new URL(
  "src/data/leetcode-implementation-references.ts",
  repoRoot,
);
const generatedReferencesPath = new URL(
  "src/data/leetcode-implementation-generated.ts",
  repoRoot,
);
const outputPath = new URL("src/data/leetcode-problem-constraints.ts", repoRoot);
const leetcodeCookie = process.env.LEETCODE_CN_COOKIE || "";
const fallbackConstraint =
  "官方题面未单列数据范围；以题面中的输入说明或表结构为准。";

const questionContentQuery = `
query questionContent($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    titleSlug
    translatedContent
    content
  }
}
`;

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function numberOption(name, fallback) {
  const value = Number(optionValue(name, fallback));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

function extractConstraintStats(source) {
  const match = source.match(
    /export const leetcodeProblemConstraintStats = (\{[\s\S]*?\n\}) as const/,
  );
  if (!match) return null;
  return JSON.parse(match[1]);
}

function buildBookProblems(problems, bytedanceProblems) {
  const existingSlugs = new Set(problems.map((problem) => problem.titleSlug));
  const supplements = bytedanceProblems.filter(
    (problem) => !existingSlugs.has(problem.titleSlug),
  );
  return [...problems, ...supplements];
}

function csrfToken(cookie) {
  const match = cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function requestHeaders(slug) {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/json",
    origin: "https://leetcode.cn",
    referer: `https://leetcode.cn/problems/${slug}/description/`,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  };
  if (leetcodeCookie) {
    headers.cookie = leetcodeCookie;
    const token = csrfToken(leetcodeCookie);
    if (token) headers["x-csrftoken"] = token;
  }
  return headers;
}

function retryDelay(attempt, backoffMs) {
  return backoffMs * 2 ** attempt + Math.floor(Math.random() * 250);
}

async function fetchLeetcodeContent(slug, options, attempt = 0) {
  const response = await fetch(leetcodeChinaGraphqlEndpoint, {
    method: "POST",
    headers: requestHeaders(slug),
    body: JSON.stringify({
      operationName: "questionContent",
      query: questionContentQuery,
      variables: { titleSlug: slug },
    }),
  });
  if (!response.ok) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchLeetcodeContent(slug, options, attempt + 1);
    }
    throw new Error(`LeetCode China GraphQL ${response.status}`);
  }
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchLeetcodeContent(slug, options, attempt + 1);
    }
    throw new Error(`LeetCode China non-JSON response for ${slug}`);
  }
  if (payload.errors?.length) {
    const message = payload.errors.map((item) => item.message).join("; ");
    throw new Error(`LeetCode China: ${message}`);
  }
  const question = payload.data?.question;
  if (!question) return "";
  return question.translatedContent || question.content || "";
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&le;/gi, "<=")
    .replace(/&ge;/gi, ">=")
    .replace(/&minus;/gi, "-")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    );
}

function cleanConstraintText(html) {
  return normalizeConstraintText(
    decodeEntities(html)
      .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, "^$1")
      .replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, "_$1")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?(?:code|strong|em|span|b|p)[^>]*>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function normalizeConstraintText(value) {
  return String(value)
    .replace(/(\b(?:10|2)\^\d+)\^/g, "$1")
    .replace(/\s+([。！？；：，、])/gu, "$1")
    .replace(/([（(])\s+/gu, "$1")
    .replace(/\s+([）)])/gu, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeConstraintItems(items) {
  return (items || []).map(normalizeConstraintText).filter(Boolean);
}

function normalizeConstraintsBySlug(constraintsBySlug) {
  return Object.fromEntries(
    Object.entries(constraintsBySlug).map(([slug, items]) => [
      slug,
      normalizeConstraintItems(items),
    ]),
  );
}

function listItems(listHtml) {
  return [...listHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => cleanConstraintText(match[1]))
    .filter(Boolean);
}

function extractConstraintsFromHtml(html) {
  if (!html) return [];
  const heading = "(?:提示|注意|Constraints|Note)";
  const gap = "(?:\\s|&nbsp;|&#160;)*";
  const anchors = [
    ...html.matchAll(
      new RegExp(`<strong[^>]*>${gap}${heading}${gap}[：:]?${gap}<\\/strong>`, "gi"),
    ),
    ...html.matchAll(
      new RegExp(`<b[^>]*>${gap}${heading}${gap}[：:]?${gap}<\\/b>`, "gi"),
    ),
  ].sort((left, right) => left.index - right.index);

  for (const anchor of anchors) {
    const rest = html.slice(anchor.index);
    const listMatch = rest.match(/<(?:ul|ol)[^>]*>[\s\S]*?<\/(?:ul|ol)>/i);
    if (!listMatch) continue;
    const items = listItems(listMatch[0]);
    if (items.length) return items;
  }
  return [];
}

function rawDoocsUrl(url) {
  if (!url.includes("github.com/doocs/leetcode/blob/main/")) return "";
  return url.replace(
    "https://github.com/doocs/leetcode/blob/main/",
    "https://raw.githubusercontent.com/doocs/leetcode/main/",
  );
}

function buildDoocsUrlBySlug(referenceObjects) {
  const urlsBySlug = new Map();
  for (const references of referenceObjects) {
    for (const [slug, items] of Object.entries(references)) {
      const urls = (items || [])
        .map((item) => rawDoocsUrl(item.sourceUrl || ""))
        .filter(Boolean);
      if (!urls.length) continue;
      const preferred =
        urls.find((url) => url.endsWith("/README.md")) ||
        urls.find((url) => url.endsWith("/README_EN.md")) ||
        urls[0];
      urlsBySlug.set(slug, preferred);
    }
  }
  return urlsBySlug;
}

async function fetchDoocsConstraints(slug, url, options, attempt = 0) {
  if (!url) return [];
  const response = await fetch(url, {
    headers: {
      accept: "text/plain, */*",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchDoocsConstraints(slug, url, options, attempt + 1);
    }
    throw new Error(`Doocs ${slug} ${response.status}`);
  }
  const markdown = await response.text();
  const description =
    markdown.match(
      /<!-- description:start -->([\s\S]*?)<!-- description:end -->/i,
    )?.[1] || markdown;
  return extractConstraintsFromHtml(description);
}

async function constraintsForProblem(problem, doocsUrls, options) {
  let leetcodeContent = "";
  try {
    leetcodeContent = await fetchLeetcodeContent(problem.titleSlug, options);
  } catch (error) {
    console.warn(`${problem.titleSlug}: ${error.message}; trying fallback source`);
  }
  const fromLeetcode = extractConstraintsFromHtml(leetcodeContent);
  if (fromLeetcode.length) {
    return { constraints: fromLeetcode, fallback: false, source: "leetcode" };
  }

  const fromDoocs = await fetchDoocsConstraints(
    problem.titleSlug,
    doocsUrls.get(problem.titleSlug),
    options,
  );
  if (fromDoocs.length) {
    return { constraints: fromDoocs, fallback: false, source: "doocs" };
  }

  return {
    constraints: [fallbackConstraint],
    fallback: true,
    source: "fallback",
  };
}

async function runPool(items, worker, options) {
  let cursor = 0;
  const results = [];
  async function runWorker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
      await sleep(options.delayMs);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(options.concurrency, items.length) }, runWorker),
  );
  return results;
}

function renderOutput(constraintsBySlug, stats) {
  return `export const leetcodeProblemConstraints = (${JSON.stringify(
    constraintsBySlug,
    null,
    2,
  )}) satisfies Record<string, string[]>;

export const leetcodeProblemConstraintStats = ${JSON.stringify(
    stats,
    null,
    2,
  )} as const;
`;
}

function orderConstraintsByProblem(problems, constraintsBySlug) {
  const ordered = {};
  for (const problem of problems) {
    ordered[problem.titleSlug] = constraintsBySlug[problem.titleSlug] || [
      fallbackConstraint,
    ];
  }
  return ordered;
}

async function readExistingOutput() {
  try {
    const source = await readFile(outputPath, "utf8");
    return {
      constraints: extractJsonObject(source, "leetcodeProblemConstraints"),
      stats: extractConstraintStats(source),
    };
  } catch (error) {
    if (error.code === "ENOENT") return { constraints: {}, stats: null };
    throw error;
  }
}

const options = {
  backoffMs: numberOption("backoff-ms", defaultBackoffMs),
  concurrency: numberOption("concurrency", defaultConcurrency),
  delayMs: numberOption("delay-ms", defaultRequestDelayMs),
  retries: numberOption("retries", defaultRetryCount),
};

const [
  problemsSource,
  bytedanceSource,
  personalReferencesSource,
  generatedReferencesSource,
] = await Promise.all([
  readFile(problemsPath, "utf8"),
  readFile(bytedancePath, "utf8"),
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
const personalReferences = extractJsonObject(
  personalReferencesSource,
  "leetcodeImplementationReferences",
);
const generatedReferences = extractJsonObject(
  generatedReferencesSource,
  "leetcodeGeneratedImplementationReferences",
);
const doocsUrls = buildDoocsUrlBySlug([personalReferences, generatedReferences]);
const bookProblems = buildBookProblems(leetcodeProblems, leetcodeByteDanceProblems);

if (hasFlag("normalize-only")) {
  const existing = await readExistingOutput();
  const constraintsBySlug = normalizeConstraintsBySlug(existing.constraints);
  const fallbackSlugs = bookProblems
    .filter((problem) => {
      const constraints = constraintsBySlug[problem.titleSlug] ?? [];
      return constraints.length === 1 && constraints[0] === fallbackConstraint;
    })
    .map((problem) => problem.titleSlug);
  const stats = {
    ...(existing.stats ?? {}),
    problems: bookProblems.length,
    constraints: Object.values(constraintsBySlug).reduce(
      (sum, constraints) => sum + constraints.length,
      0,
    ),
    fallback: fallbackSlugs.length,
    fallbackSlugs,
  };
  await writeFile(
    outputPath,
    renderOutput(orderConstraintsByProblem(bookProblems, constraintsBySlug), stats),
  );
  console.log(`Normalized ${bookProblems.length} problem constraint sets`);
  process.exit(0);
}

const existingOutput = hasFlag("fallback-only")
  ? await readExistingOutput()
  : { constraints: {}, stats: null };
const fallbackTargets = new Set(existingOutput.stats?.fallbackSlugs ?? []);
const targetProblems = hasFlag("fallback-only")
  ? bookProblems.filter((problem) => fallbackTargets.has(problem.titleSlug))
  : bookProblems;
const constraintsBySlug = { ...existingOutput.constraints };
const sourceCounts = new Map();
if (existingOutput.stats) {
  sourceCounts.set("leetcode", existingOutput.stats.leetcodeSource ?? 0);
  sourceCounts.set("doocs", existingOutput.stats.doocsSource ?? 0);
}

await runPool(
  targetProblems,
  async (problem, index) => {
    const label = `${index + 1}/${targetProblems.length} ${problem.titleSlug}`;
    try {
      const result = await constraintsForProblem(problem, doocsUrls, options);
      constraintsBySlug[problem.titleSlug] = normalizeConstraintItems(
        result.constraints,
      );
      if (!existingOutput.stats || result.source !== "fallback") {
        sourceCounts.set(
          result.source,
          (sourceCounts.get(result.source) ?? 0) + 1,
        );
      }
      console.log(`${label}: ${result.constraints.length} (${result.source})`);
    } catch (error) {
      constraintsBySlug[problem.titleSlug] = [fallbackConstraint];
      console.warn(`${label}: ${error.message}; wrote fallback`);
    }
  },
  options,
);

const fallbackSlugs = bookProblems
  .filter((problem) => {
    const constraints = constraintsBySlug[problem.titleSlug] ?? [];
    return constraints.length === 1 && constraints[0] === fallbackConstraint;
  })
  .map((problem) => problem.titleSlug);
const stats = {
  problems: bookProblems.length,
  constraints: Object.values(constraintsBySlug).reduce(
    (sum, constraints) => sum + constraints.length,
    0,
  ),
  leetcodeSource: sourceCounts.get("leetcode") ?? 0,
  doocsSource: sourceCounts.get("doocs") ?? 0,
  fallback: fallbackSlugs.length,
  fallbackSlugs,
};

await writeFile(
  outputPath,
  renderOutput(orderConstraintsByProblem(bookProblems, constraintsBySlug), stats),
);
console.log(
  `Wrote ${bookProblems.length} problem constraint sets to ${outputPath.pathname}`,
);
