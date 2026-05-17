import { readFile, writeFile } from "node:fs/promises";

const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const defaultConcurrency = 2;
const defaultRetryCount = 4;
const defaultRequestDelayMs = 250;
const defaultBackoffMs = 1200;
const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const outputPath = new URL("src/data/leetcode-related.ts", repoRoot);
const leetcodeCookie = process.env.LEETCODE_CN_COOKIE || "";

const relatedQuestionsQuery = `
query questionRelated($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    titleSlug
    similarQuestions
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

function extractProblems(source) {
  const match = source.match(
    /export const leetcodeProblems = ([\s\S]*?)\n\] satisfies LeetcodeProblem\[];/,
  );
  if (!match) {
    throw new Error("Could not find leetcodeProblems array");
  }
  return JSON.parse(`${match[1]}\n]`);
}

function extractByteDanceProblems(source) {
  const match = source.match(
    /export const leetcodeByteDanceProblems = \(([\s\S]*?\n\])\) satisfies/,
  );
  if (!match) {
    throw new Error("Could not find leetcodeByteDanceProblems array");
  }
  return JSON.parse(match[1]);
}

function extractExistingRelated(source) {
  const match = source.match(
    /export const leetcodeRelatedQuestions = \(([\s\S]*?)\) satisfies Record/,
  );
  if (!match) {
    throw new Error("Could not find leetcodeRelatedQuestions object");
  }
  return JSON.parse(match[1]);
}

async function readExistingRelated() {
  try {
    return extractExistingRelated(await readFile(outputPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

function buildCandidates(problems, bytedanceProblems) {
  const seen = new Set();
  const candidates = [];
  for (const problem of [...problems, ...bytedanceProblems]) {
    if (!problem.titleSlug || seen.has(problem.titleSlug)) continue;
    seen.add(problem.titleSlug);
    candidates.push(problem);
  }
  return candidates;
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
    "x-operation-name": "questionRelated",
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

function difficultyLabel(value) {
  if (value === "EASY" || value === "Easy") return "简单";
  if (value === "HARD" || value === "Hard") return "困难";
  if (value === "MEDIUM" || value === "Medium") return "中等";
  return value || "";
}

function parseSimilarQuestions(value) {
  if (!value) return [];
  const rows = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(rows)) return [];
  const seen = new Set();
  return rows
    .map((row) => ({
      title: row.title || "",
      titleSlug: row.titleSlug || "",
      difficulty: difficultyLabel(row.difficulty),
      translatedTitle: row.translatedTitle || row.title || "",
      isPaidOnly: Boolean(row.isPaidOnly),
    }))
    .filter((row) => {
      if (!row.titleSlug || seen.has(row.titleSlug)) return false;
      seen.add(row.titleSlug);
      return true;
    });
}

async function fetchRelated(slug, options, attempt = 0) {
  const response = await fetch(leetcodeChinaGraphqlEndpoint, {
    method: "POST",
    headers: requestHeaders(slug),
    body: JSON.stringify({
      operationName: "questionRelated",
      query: relatedQuestionsQuery,
      variables: { titleSlug: slug },
    }),
  });

  if (!response.ok) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchRelated(slug, options, attempt + 1);
    }
    throw new Error(`GraphQL ${response.status}`);
  }

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchRelated(slug, options, attempt + 1);
    }
    throw new Error(`non-JSON response ${JSON.stringify(text.slice(0, 80))}`);
  }

  if (payload.errors?.length) {
    const message = payload.errors.map((item) => item.message).join("; ");
    throw new Error(message);
  }

  const question = payload.data?.question;
  if (!question) return [];
  return parseSimilarQuestions(question.similarQuestions);
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

function renderOutput(relatedBySlug, missing) {
  const questionCount = Object.values(relatedBySlug).reduce(
    (sum, questions) => sum + questions.length,
    0,
  );
  const content = `export interface LeetcodeRelatedQuestion {
  title: string;
  titleSlug: string;
  difficulty: string;
  translatedTitle: string;
  isPaidOnly: boolean;
}

export const leetcodeRelatedQuestions = (${JSON.stringify(
    relatedBySlug,
    null,
    2,
  )}) satisfies Record<string, LeetcodeRelatedQuestion[]>;

export const leetcodeRelatedQuestionStats = {
  problems: ${Object.keys(relatedBySlug).length},
  questions: ${questionCount},
  missing: ${JSON.stringify(missing, null, 2)},
  source: "LeetCode China public GraphQL question.similarQuestions.",
} as const;
`;
  return content;
}

async function main() {
  const options = {
    backoffMs: numberOption("backoff-ms", defaultBackoffMs),
    concurrency: numberOption("concurrency", defaultConcurrency),
    delayMs: numberOption("delay-ms", defaultRequestDelayMs),
    retries: numberOption("retries", defaultRetryCount),
  };
  const limit = numberOption("limit", Number.POSITIVE_INFINITY);
  const mergeExisting = !hasFlag("fresh");
  const missingOnly = hasFlag("missing-only");
  const problems = extractProblems(await readFile(problemsPath, "utf8"));
  const bytedanceProblems = extractByteDanceProblems(
    await readFile(bytedancePath, "utf8"),
  );
  const candidates = buildCandidates(problems, bytedanceProblems).slice(0, limit);
  const relatedBySlug = mergeExisting ? await readExistingRelated() : {};
  const fetchProblems = missingOnly
    ? candidates.filter((problem) => !relatedBySlug[problem.titleSlug])
    : candidates;

  await runPool(
    fetchProblems,
    async (problem, index) => {
      const position = `${index + 1}/${fetchProblems.length}`;
      try {
        const relatedQuestions = await fetchRelated(problem.titleSlug, options);
        relatedBySlug[problem.titleSlug] = relatedQuestions;
        console.log(
          `${position} ${problem.titleSlug}: ${relatedQuestions.length}`,
        );
      } catch (error) {
        console.warn(`${position} ${problem.titleSlug}: ${error.message}`);
      }
    },
    options,
  );

  const orderedRelated = {};
  for (const problem of candidates) {
    if (Object.hasOwn(relatedBySlug, problem.titleSlug)) {
      orderedRelated[problem.titleSlug] = relatedBySlug[problem.titleSlug];
    }
  }
  const missing = candidates
    .filter((problem) => !Object.hasOwn(orderedRelated, problem.titleSlug))
    .map((problem) => problem.titleSlug);

  await writeFile(outputPath, renderOutput(orderedRelated, missing));
  console.log(
    `wrote ${Object.keys(orderedRelated).length} problems and ${
      Object.values(orderedRelated).flat().length
    } related questions to ${outputPath.pathname}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
