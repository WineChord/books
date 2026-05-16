import { readFile, writeFile } from "node:fs/promises";

const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const outputPath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const leetcodeCookie = process.env.LEETCODE_CN_COOKIE || "";
const defaultLimit = 100;
const defaultRetryCount = 4;
const defaultRequestDelayMs = 350;
const defaultBackoffMs = 1200;
const bytedanceTargetAll = 1503;

const bucketConfigs = [
  ["all", "bytedance-all"],
  ["thirtyDays", "bytedance-thirty-days"],
  ["threeMonths", "bytedance-three-months"],
  ["sixMonths", "bytedance-six-months"],
  ["moreThanSixMonths", "bytedance-more-than-six-months"],
];

const favoriteQuestionListQuery = `
query favoriteQuestionList(
  $favoriteSlug: String!
  $filter: FavoriteQuestionFilterInput
  $filtersV2: QuestionFilterInput
  $searchKeyword: String
  $sortBy: QuestionSortByInput
  $limit: Int
  $skip: Int
  $version: String = "v2"
) {
  favoriteQuestionList(
    favoriteSlug: $favoriteSlug
    filter: $filter
    filtersV2: $filtersV2
    searchKeyword: $searchKeyword
    sortBy: $sortBy
    limit: $limit
    skip: $skip
    version: $version
  ) {
    questions {
      difficulty
      id
      paidOnly
      questionFrontendId
      status
      title
      titleSlug
      translatedTitle
      isInMyFavorites
      frequency
      acRate
      contestPoint
      topicTags {
        name
        nameTranslated
        slug
      }
    }
    totalLength
    hasMore
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

function csrfToken(cookie) {
  const match = cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function difficultyLabel(value) {
  if (value === "EASY" || value === "Easy") return "简单";
  if (value === "HARD" || value === "Hard") return "困难";
  if (value === "MEDIUM" || value === "Medium") return "中等";
  return value || "";
}

function percentLabel(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${numeric.toFixed(1)}%`;
}

function requestHeaders(favoriteSlug) {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/json",
    origin: "https://leetcode.cn",
    referer: `https://leetcode.cn/company/bytedance/?favoriteSlug=${favoriteSlug}`,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "x-operation-name": "favoriteQuestionList",
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

async function fetchFavoritePage(favoriteSlug, skip, options, attempt = 0) {
  const response = await fetch(leetcodeChinaGraphqlEndpoint, {
    method: "POST",
    headers: requestHeaders(favoriteSlug),
    body: JSON.stringify({
      operationName: "favoriteQuestionList",
      query: favoriteQuestionListQuery,
      variables: {
        favoriteSlug,
        filter: null,
        filtersV2: null,
        searchKeyword: "",
        sortBy: {
          sortField: "FREQUENCY",
          sortOrder: "DESCENDING",
        },
        limit: options.limit,
        skip,
        version: "v2",
      },
    }),
  });

  if (!response.ok) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchFavoritePage(favoriteSlug, skip, options, attempt + 1);
    }
    throw new Error(`${favoriteSlug} GraphQL ${response.status}`);
  }

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchFavoritePage(favoriteSlug, skip, options, attempt + 1);
    }
    throw new Error(
      `${favoriteSlug} non-JSON response ${JSON.stringify(text.slice(0, 80))}`,
    );
  }

  if (payload.errors?.length) {
    const message = payload.errors.map((item) => item.message).join("; ");
    throw new Error(`${favoriteSlug}: ${message}`);
  }

  return payload.data?.favoriteQuestionList || {
    questions: [],
    totalLength: 0,
    hasMore: false,
  };
}

async function fetchFavoriteList(favoriteSlug, options) {
  const rows = [];
  let skip = 0;
  let totalLength = 0;

  for (;;) {
    const page = await fetchFavoritePage(favoriteSlug, skip, options);
    totalLength = Math.max(totalLength, page.totalLength || 0);
    rows.push(...(page.questions || []));
    console.log(`${favoriteSlug}: ${rows.length}/${totalLength || "?"}`);
    if (!page.hasMore || !page.questions?.length) break;
    skip += options.limit;
    await sleep(options.delayMs);
  }

  return { rows, totalLength };
}

function emptyBuckets() {
  return {
    all: null,
    thirtyDays: null,
    threeMonths: null,
    sixMonths: null,
    moreThanSixMonths: null,
  };
}

function normalizeQuestion(question, rank, bucketKey) {
  const buckets = emptyBuckets();
  buckets[bucketKey] = rank;
  return {
    acRate: percentLabel(question.acRate),
    buckets,
    bytedanceRank: bucketKey === "all" ? rank : null,
    difficulty: difficultyLabel(question.difficulty),
    frontendId: question.questionFrontendId || question.id || "",
    frequency:
      question.frequency === null || question.frequency === undefined
        ? null
        : Number(question.frequency),
    paidOnly: Boolean(question.paidOnly),
    source: "companyFavorite",
    tags: (question.topicTags || []).map((tag) => ({
      name: tag.nameTranslated || tag.name || "",
      slug: tag.slug || "",
    })),
    titleCn: question.translatedTitle || question.title || "",
    titleSlug: question.titleSlug || "",
    url: `https://leetcode.cn/problems/${question.titleSlug}/description/`,
  };
}

function mergeBucketEntry(target, source) {
  for (const [key, value] of Object.entries(source.buckets)) {
    if (value !== null) target.buckets[key] = value;
  }
  if (source.bytedanceRank !== null) target.bytedanceRank = source.bytedanceRank;
}

function companyEntriesFromBuckets(bucketRows) {
  const bySlug = new Map();
  for (const [bucketKey, rows] of Object.entries(bucketRows)) {
    rows.forEach((question, index) => {
      const entry = normalizeQuestion(question, index + 1, bucketKey);
      if (!entry.titleSlug) return;
      if (bySlug.has(entry.titleSlug)) {
        mergeBucketEntry(bySlug.get(entry.titleSlug), entry);
        return;
      }
      bySlug.set(entry.titleSlug, entry);
    });
  }
  return Array.from(bySlug.values()).sort(
    (left, right) =>
      (left.bytedanceRank || Number.MAX_SAFE_INTEGER) -
      (right.bytedanceRank || Number.MAX_SAFE_INTEGER),
  );
}

function legacyFallbackEntries(problems) {
  const buckets = {
    all: 0,
    threeMonths: 0,
    sixMonths: 0,
    moreThanSixMonths: 0,
  };

  return problems
    .filter((problem) => problem.bytedance)
    .map((problem) => {
      const periods = problem.bytedancePeriods || {};
      buckets.all += 1;
      const entryBuckets = emptyBuckets();
      entryBuckets.all = buckets.all;
      if (periods.past3Months) {
        buckets.threeMonths += 1;
        entryBuckets.threeMonths = buckets.threeMonths;
      }
      if (periods.past6Months) {
        buckets.sixMonths += 1;
        entryBuckets.sixMonths = buckets.sixMonths;
      }
      if (periods.before6Months) {
        buckets.moreThanSixMonths += 1;
        entryBuckets.moreThanSixMonths = buckets.moreThanSixMonths;
      }

      return {
        acRate: problem.acRate,
        buckets: entryBuckets,
        bytedanceRank: buckets.all,
        difficulty: problem.difficulty,
        frontendId: problem.frontendId,
        frequency: Number.parseFloat(problem.frequency) || null,
        paidOnly: Boolean(problem.paidOnly),
        source: "legacyTop888",
        tags: problem.tags || [],
        titleCn: problem.titleCn,
        titleSlug: problem.titleSlug,
        url: problem.url,
      };
    });
}

function bucketCount(entries, key) {
  return entries.filter((entry) => entry.buckets[key] !== null).length;
}

function renderOutput(entries, bucketTotals, sourceStatus) {
  const stats = {
    source: "LeetCode China company favorite favoriteQuestionList sorted by FREQUENCY descending.",
    sourceStatus,
    sourceUpdatedAt: "2026-05-16",
    targetAll: bytedanceTargetAll,
    syncedAll: bucketCount(entries, "all"),
    syncComplete: bucketCount(entries, "all") >= bytedanceTargetAll,
    bucketTotals,
  };

  return `export interface LeetcodeByteDanceBucketRanks {
  all: number | null;
  thirtyDays: number | null;
  threeMonths: number | null;
  sixMonths: number | null;
  moreThanSixMonths: number | null;
}

export interface LeetcodeByteDanceProblem {
  bytedanceRank: number | null;
  frontendId: string;
  titleCn: string;
  titleSlug: string;
  url: string;
  difficulty: string;
  acRate: string | null;
  frequency: number | null;
  paidOnly: boolean;
  source: "companyFavorite" | "legacyTop888";
  tags: Array<{ slug: string; name: string }>;
  buckets: LeetcodeByteDanceBucketRanks;
}

export const leetcodeByteDanceProblems = (${JSON.stringify(
    entries,
    null,
    2,
  )}) satisfies LeetcodeByteDanceProblem[];

export const leetcodeByteDanceStats = ${JSON.stringify(stats, null, 2)} as const;
`;
}

async function main() {
  const options = {
    backoffMs: numberOption("backoff-ms", defaultBackoffMs),
    delayMs: numberOption("delay-ms", defaultRequestDelayMs),
    limit: numberOption("limit", defaultLimit),
    retries: numberOption("retries", defaultRetryCount),
  };
  const source = await readFile(problemsPath, "utf8");
  const problems = extractProblems(source);
  const bucketRows = {};
  const bucketTotals = {};

  if (leetcodeCookie || !hasFlag("require-cookie")) {
    for (const [bucketKey, favoriteSlug] of bucketConfigs) {
      try {
        const result = await fetchFavoriteList(favoriteSlug, options);
        bucketRows[bucketKey] = result.rows;
        bucketTotals[bucketKey] = result.totalLength;
      } catch (error) {
        console.warn(`${favoriteSlug}: ${error.message}`);
        bucketRows[bucketKey] = [];
        bucketTotals[bucketKey] = 0;
      }
    }
  }

  let sourceStatus = "companyFavorite";
  let entries = companyEntriesFromBuckets(bucketRows);
  if (!entries.length) {
    if (hasFlag("require-cookie")) {
      throw new Error(
        "LeetCode returned no ByteDance rows. Set LEETCODE_CN_COOKIE and retry.",
      );
    }
    console.warn(
      "No authenticated ByteDance company rows were returned; using legacy Top888 fallback.",
    );
    sourceStatus = "legacyTop888Fallback";
    entries = legacyFallbackEntries(problems);
    bucketTotals.all = entries.length;
    bucketTotals.thirtyDays = 0;
    bucketTotals.threeMonths = bucketCount(entries, "threeMonths");
    bucketTotals.sixMonths = bucketCount(entries, "sixMonths");
    bucketTotals.moreThanSixMonths = bucketCount(entries, "moreThanSixMonths");
  }

  await writeFile(outputPath, renderOutput(entries, bucketTotals, sourceStatus));
  console.log(`wrote ${entries.length} ByteDance rows to ${outputPath.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
