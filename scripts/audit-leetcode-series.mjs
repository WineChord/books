import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const seriesPath = new URL("src/data/leetcode-series.ts", repoRoot);
const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const romanTokens = new Set([
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
]);
const defaultCachePath = `/tmp/leetcode-cn-all-${new Date()
  .toISOString()
  .slice(0, 10)}.json`;
const curatedAuditFamilySlugs = {
  wordBreak: new Set([
    "word-break",
    "word-break-ii",
    "concatenated-words",
    "extra-characters-in-a-string",
  ]),
  coinChange: new Set([
    "coin-change",
    "coin-change-ii",
    "combination-sum-iv",
    "perfect-squares",
    "minimum-cost-for-tickets",
    "inverse-coin-change",
  ]),
  knapsackDp: new Set([
    "partition-equal-subset-sum",
    "target-sum",
    "ones-and-zeroes",
    "last-stone-weight-ii",
    "profitable-schemes",
    "number-of-ways-to-earn-points",
    "ways-to-express-an-integer-as-sum-of-powers",
  ]),
  stringDp: new Set([
    "regular-expression-matching",
    "wildcard-matching",
    "edit-distance",
    "interleaving-string",
    "longest-common-subsequence",
    "delete-operation-for-two-strings",
    "minimum-ascii-delete-sum-for-two-strings",
    "shortest-common-supersequence",
  ]),
  randomSamplingFairness: new Set([
    "linked-list-random-node",
    "shuffle-an-array",
    "random-pick-index",
    "random-flip-matrix",
    "implement-rand10-using-rand7",
    "generate-random-point-in-a-circle",
    "random-point-in-non-overlapping-rectangles",
    "random-pick-with-weight",
    "random-pick-with-blacklist",
    "insert-delete-getrandom-o1",
    "insert-delete-getrandom-o1-duplicates-allowed",
  ]),
  cacheDesign: new Set([
    "lru-cache",
    "lfu-cache",
    "cache-with-time-limit",
  ]),
  stackDesign: new Set([
    "min-stack",
    "max-stack",
    "maximum-frequency-stack",
    "design-a-stack-with-increment-operation",
    "dinner-plate-stacks",
    "validate-stack-sequences",
    "build-an-array-with-stack-operations",
  ]),
  stackQueueAdapter: new Set([
    "implement-queue-using-stacks",
    "implement-stack-using-queues",
  ]),
  queueDequeDesign: new Set([
    "design-circular-queue",
    "design-circular-deque",
    "design-front-middle-back-queue",
    "design-most-recently-used-queue",
    "design-bounded-blocking-queue",
  ]),
  hashTableDesign: new Set([
    "design-hashset",
    "design-hashmap",
    "insert-delete-getrandom-o1",
    "insert-delete-getrandom-o1-duplicates-allowed",
    "two-sum-iii-data-structure-design",
    "all-oone-data-structure",
    "time-based-key-value-store",
    "design-a-number-container-system",
    "frequency-tracker",
  ]),
  frequencyBucketDesign: new Set([
    "lfu-cache",
    "all-oone-data-structure",
    "maximum-frequency-stack",
    "frequency-tracker",
    "most-frequent-ids",
    "design-a-number-container-system",
  ]),
  historyVersionDesign: new Set([
    "design-browser-history",
    "snapshot-array",
    "time-based-key-value-store",
  ]),
  topKFrequency: new Set([
    "word-frequency",
    "top-k-frequent-elements",
    "sort-characters-by-frequency",
    "sort-array-by-increasing-frequency",
    "top-k-frequent-words",
    "most-frequent-subtree-sum",
    "reward-top-k-students",
    "range-frequency-queries",
    "tweet-counts-per-frequency",
    "most-frequent-ids",
  ]),
  topKSelection: new Set([
    "smallest-k-lcci",
    "kth-largest-element-in-an-array",
    "kth-largest-element-in-a-stream",
    "find-the-kth-largest-integer-in-the-array",
    "find-subsequence-of-length-k-with-the-largest-sum",
    "the-k-strongest-values-in-an-array",
    "the-k-weakest-rows-in-a-matrix",
    "find-k-closest-elements",
    "k-closest-points-to-origin",
    "find-k-pairs-with-smallest-sums",
    "merge-k-sorted-lists",
  ]),
  kthOrderStatistics: new Set([
    "kth-smallest-element-in-a-bst",
    "kth-smallest-element-in-a-sorted-matrix",
    "kth-smallest-number-in-multiplication-table",
    "find-k-th-smallest-pair-distance",
    "k-th-smallest-prime-fraction",
    "k-th-smallest-in-lexicographical-order",
    "find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows",
    "kth-smallest-product-of-two-sorted-arrays",
    "kth-smallest-subarray-sum",
    "query-kth-smallest-trimmed-number",
    "kth-largest-sum-in-a-binary-tree",
    "find-kth-largest-xor-coordinate-value",
    "kth-smallest-path-xor-sum",
    "kth-smallest-amount-with-single-denomination-combination",
  ]),
  medianStatistics: new Set([
    "median-of-two-sorted-arrays",
    "find-median-from-data-stream",
    "sliding-window-median",
    "median-employee-salary",
    "find-median-given-frequency-of-numbers",
    "median-of-a-row-wise-sorted-matrix",
    "design-an-array-statistics-tracker",
    "minimum-operations-to-make-median-of-array-equal-to-k",
    "count-subarrays-with-median-k",
    "find-the-median-of-the-uniqueness-array",
    "median-of-a-binary-search-tree-level",
  ]),
  streamStatisticsDesign: new Set([
    "moving-average-from-data-stream",
    "number-of-recent-calls",
    "design-hit-counter",
    "find-consecutive-integers-from-a-data-stream",
    "tweet-counts-per-frequency",
    "range-frequency-queries",
    "data-stream-as-disjoint-intervals",
    "product-of-the-last-k-numbers",
    "kth-largest-element-in-a-stream",
    "find-median-from-data-stream",
    "design-an-array-statistics-tracker",
    "two-sum-iii-data-structure-design",
    "design-search-autocomplete-system",
    "detect-squares",
  ]),
  streamRateCounterDesign: new Set([
    "logger-rate-limiter",
    "moving-average-from-data-stream",
    "number-of-recent-calls",
    "design-hit-counter",
    "tweet-counts-per-frequency",
    "design-authentication-manager",
  ]),
  trieSearchDesign: new Set([
    "implement-trie-prefix-tree",
    "implement-trie-ii-prefix-tree",
    "design-add-and-search-words-data-structure",
    "implement-magic-dictionary",
    "replace-words",
    "search-suggestions-system",
    "design-search-autocomplete-system",
    "word-squares",
    "word-squares-ii",
  ]),
  manualParser: new Set([
    "string-to-integer-atoi",
    "valid-number",
    "decode-string",
    "evaluate-reverse-polish-notation",
    "mini-parser",
    "parse-lisp-expression",
    "basic-calculator",
    "basic-calculator-ii",
    "basic-calculator-iii",
    "basic-calculator-iv",
    "compare-version-numbers",
  ]),
  massiveSetDedupIntersection: new Set([
    "contains-duplicate",
    "contains-duplicate-ii",
    "contains-duplicate-iii",
    "find-the-duplicate-number",
    "find-all-duplicates-in-an-array",
    "find-all-numbers-disappeared-in-an-array",
    "intersection-of-two-arrays",
    "intersection-of-two-arrays-ii",
    "intersection-of-three-sorted-arrays",
    "intersection-of-multiple-arrays",
    "set-intersection-size-at-least-two",
    "interval-list-intersections",
    "find-the-difference-of-two-arrays",
    "find-common-characters",
    "group-anagrams",
    "valid-anagram",
    "find-all-anagrams-in-a-string",
    "repeated-dna-sequences",
    "minimum-index-sum-of-two-lists",
    "making-file-names-unique",
    "find-duplicate-file-in-system",
    "duplicate-emails",
    "delete-duplicate-emails",
  ]),
};

const problemsetQuery = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
    total
    questions {
      frontendQuestionId
      title
      titleCn
      titleSlug
      difficulty
      paidOnly
      topicTags {
        slug
        name
        nameTranslated
      }
      acRate
    }
  }
}
`;

const auditedFamilies = [
  {
    key: "jump-game",
    title: "Jump Game",
    matches: (question) => /^Jump Game\b/i.test(question.title),
  },
  {
    key: "stock-trading",
    title: "Stock Trading",
    matches: (question) =>
      /^Best Time to Buy and Sell Stock\b/i.test(question.title) ||
      [
        "maximum-profit-from-trading-stocks",
        "maximum-profit-from-trading-stocks-with-discounts",
      ].includes(question.titleSlug),
  },
  {
    key: "house-robber",
    title: "House Robber",
    matches: (question) => /^House Robber\b/i.test(question.title),
  },
  {
    key: "paint-house",
    title: "Paint House",
    matches: (question) => /^Paint House\b/i.test(question.title),
  },
  {
    key: "n-sum",
    title: "N-Sum",
    matches: (question) =>
      /^(?:Two Sum|3Sum|4Sum)\b/i.test(question.title) ||
      question.titleSlug === "max-number-of-k-sum-pairs" ||
      question.titleSlug === "find-the-k-sum-of-an-array",
  },
  {
    key: "parentheses",
    title: "Parentheses",
    matches: (question) => /Parentheses|Parenthesis/i.test(question.title),
  },
  {
    key: "islands",
    title: "Islands",
    matches: (question) => /\bIslands?\b/i.test(question.title),
  },
  {
    key: "range-sum-query",
    title: "Range Sum Query",
    matches: (question) => /^Range Sum Query\b/i.test(question.title),
  },
  {
    key: "course-schedule",
    title: "Course Schedule",
    matches: (question) => /^Course Schedule\b/i.test(question.title),
  },
  {
    key: "meeting-rooms",
    title: "Meeting Rooms",
    matches: (question) => /^Meeting Rooms\b/i.test(question.title),
  },
  {
    key: "word-break",
    title: "Word Break and Dictionary DP",
    matches: (question) => curatedAuditFamilySlugs.wordBreak.has(question.titleSlug),
  },
  {
    key: "coin-change",
    title: "Coin Change and Complete Knapsack",
    matches: (question) => curatedAuditFamilySlugs.coinChange.has(question.titleSlug),
  },
  {
    key: "knapsack-dp",
    title: "Knapsack DP",
    matches: (question) => curatedAuditFamilySlugs.knapsackDp.has(question.titleSlug),
  },
  {
    key: "string-dp",
    title: "String DP",
    matches: (question) => curatedAuditFamilySlugs.stringDp.has(question.titleSlug),
  },
  {
    key: "word-series",
    title: "Word Search / Break / Ladder",
    matches: (question) =>
      /^Word (?:Search|Break|Ladder)\b/i.test(question.title) ||
      question.titleSlug === "design-add-and-search-words-data-structure",
  },
  {
    key: "n-queens",
    title: "N-Queens",
    matches: (question) => /^N-Queens\b/i.test(question.title),
  },
  {
    key: "bst-iterator",
    title: "BST Iterator",
    matches: (question) =>
      /^Binary Search Tree Iterator\b/i.test(question.title) ||
      question.titleSlug === "kth-smallest-element-in-a-bst",
  },
  {
    key: "linked-list-reversal",
    title: "Linked List Reversal",
    matches: (question) =>
      /^Reverse Linked List\b/i.test(question.title) ||
      /^Reverse Nodes in (?:k-Group|Even Length Groups)\b/i.test(question.title),
  },
  {
    key: "find-peak-element",
    title: "Find Peak Element",
    matches: (question) =>
      question.titleSlug === "find-peak-element" ||
      question.titleSlug === "find-a-peak-element-ii",
  },
  {
    key: "implement-trie",
    title: "Implement Trie",
    matches: (question) => /^Implement Trie\b/i.test(question.title),
  },
  {
    key: "trie-search-design",
    title: "Trie Search and Suggestion Design",
    matches: (question) =>
      curatedAuditFamilySlugs.trieSearchDesign.has(question.titleSlug),
  },
  {
    key: "manual-parser",
    title: "Manual Parser",
    matches: (question) => curatedAuditFamilySlugs.manualParser.has(question.titleSlug),
  },
  {
    key: "insert-delete-getrandom",
    title: "Insert Delete GetRandom",
    matches: (question) => /^Insert Delete GetRandom\b/i.test(question.title),
  },
  {
    key: "random-sampling-fairness",
    title: "Random Sampling and Fairness",
    matches: (question) =>
      curatedAuditFamilySlugs.randomSamplingFairness.has(question.titleSlug),
  },
  {
    key: "cache-design",
    title: "Cache Design",
    matches: (question) => curatedAuditFamilySlugs.cacheDesign.has(question.titleSlug),
  },
  {
    key: "stack-min-max-design",
    title: "Stack Design",
    matches: (question) => curatedAuditFamilySlugs.stackDesign.has(question.titleSlug),
  },
  {
    key: "stack-queue-adapter",
    title: "Stack and Queue Adapters",
    matches: (question) =>
      curatedAuditFamilySlugs.stackQueueAdapter.has(question.titleSlug),
  },
  {
    key: "queue-deque-design",
    title: "Queue and Deque Design",
    matches: (question) =>
      curatedAuditFamilySlugs.queueDequeDesign.has(question.titleSlug),
  },
  {
    key: "hash-table-design",
    title: "Hash Table Design",
    matches: (question) =>
      curatedAuditFamilySlugs.hashTableDesign.has(question.titleSlug),
  },
  {
    key: "frequency-bucket-design",
    title: "Frequency Bucket Design",
    matches: (question) =>
      curatedAuditFamilySlugs.frequencyBucketDesign.has(question.titleSlug),
  },
  {
    key: "history-version-design",
    title: "History and Version Design",
    matches: (question) =>
      curatedAuditFamilySlugs.historyVersionDesign.has(question.titleSlug),
  },
  {
    key: "top-k-frequency",
    title: "Top K Frequency",
    matches: (question) =>
      curatedAuditFamilySlugs.topKFrequency.has(question.titleSlug),
  },
  {
    key: "top-k-selection",
    title: "Top K Selection",
    matches: (question) =>
      curatedAuditFamilySlugs.topKSelection.has(question.titleSlug),
  },
  {
    key: "kth-order-statistics",
    title: "Kth Order Statistics",
    matches: (question) =>
      curatedAuditFamilySlugs.kthOrderStatistics.has(question.titleSlug),
  },
  {
    key: "median-statistics",
    title: "Median Statistics",
    matches: (question) =>
      curatedAuditFamilySlugs.medianStatistics.has(question.titleSlug),
  },
  {
    key: "stream-statistics-design",
    title: "Stream Statistics Design",
    matches: (question) =>
      curatedAuditFamilySlugs.streamStatisticsDesign.has(question.titleSlug),
  },
  {
    key: "stream-rate-counter-design",
    title: "Stream Counter and Rate Limiter Design",
    matches: (question) =>
      curatedAuditFamilySlugs.streamRateCounterDesign.has(question.titleSlug),
  },
  {
    key: "massive-set-dedup-intersection",
    title: "Massive Set Dedup and Intersection",
    matches: (question) =>
      curatedAuditFamilySlugs.massiveSetDedupIntersection.has(question.titleSlug),
  },
  {
    key: "serialize-and-deserialize",
    title: "Serialize and Deserialize",
    matches: (question) => /^Serialize and Deserialize\b/i.test(question.title),
  },
  {
    key: "design-file-system",
    title: "Design File System",
    matches: (question) =>
      question.titleSlug === "design-file-system" ||
      question.titleSlug === "design-in-memory-file-system",
  },
  {
    key: "flatten-structures",
    title: "Flatten Structures",
    matches: (question) =>
      /^Flatten\b/i.test(question.title) ||
      question.titleSlug === "flatten-deeply-nested-array",
  },
  {
    key: "alien-dictionary",
    title: "Alien Dictionary",
    matches: (question) =>
      question.titleSlug === "alien-dictionary" ||
      question.titleSlug === "verifying-an-alien-dictionary",
  },
  {
    key: "game-play-analysis",
    title: "Game Play Analysis",
    matches: (question) => question.titleSlug.startsWith("game-play-analysis-"),
  },
  {
    key: "product-sales-analysis",
    title: "Product Sales Analysis",
    matches: (question) => question.titleSlug.startsWith("product-sales-analysis-"),
  },
  {
    key: "sales-analysis",
    title: "Sales Analysis",
    matches: (question) => question.titleSlug.startsWith("sales-analysis-"),
  },
  {
    key: "article-views",
    title: "Article Views",
    matches: (question) => question.titleSlug.startsWith("article-views-"),
  },
  {
    key: "immediate-food-delivery",
    title: "Immediate Food Delivery",
    matches: (question) => question.titleSlug.startsWith("immediate-food-delivery-"),
  },
  {
    key: "monthly-transactions",
    title: "Monthly Transactions",
    matches: (question) => question.titleSlug.startsWith("monthly-transactions-"),
  },
  {
    key: "user-activity-for-the-past-30-days",
    title: "User Activity for the Past 30 Days",
    matches: (question) =>
      question.titleSlug.startsWith("user-activity-for-the-past-30-days-"),
  },
  {
    key: "invalid-tweets",
    title: "Invalid Tweets",
    matches: (question) =>
      question.titleSlug === "invalid-tweets" ||
      question.titleSlug === "invalid-tweets-ii",
  },
  {
    key: "second-highest-salary",
    title: "Second Highest Salary",
    matches: (question) =>
      question.titleSlug === "second-highest-salary" ||
      question.titleSlug === "second-highest-salary-ii",
  },
  {
    key: "friend-requests",
    title: "Friend Requests",
    matches: (question) =>
      question.titleSlug === "friend-requests-i-overall-acceptance-rate" ||
      question.titleSlug === "friend-requests-ii-who-has-the-most-friends",
  },
];

const reviewFamilies = [
  {
    title: "Stock price domain",
    matches: (question) => /\bStocks?\b/i.test(question.title),
    coveredBy: new Set(["stock-trading"]),
  },
  {
    title: "Brace Expansion",
    matches: (question) => /^Brace Expansion\b/i.test(question.title),
    coveredBy: new Set(["brace-expansion"]),
  },
  {
    title: "Shortest Word Distance",
    matches: (question) => /^Shortest Word Distance\b/i.test(question.title),
    coveredBy: new Set(["shortest-word-distance"]),
  },
];
const intentionalSubsetPairs = new Set([
  "best-time-to-buy-and-sell-stock->stock-trading",
  "contains-duplicate->massive-set-dedup-intersection",
  "basic-calculator->manual-parser",
  "implement-trie->trie-search-design",
  "intersection-of-two-arrays->massive-set-dedup-intersection",
  "insert-delete-getrandom->hash-table-design",
  "insert-delete-getrandom->random-sampling-fairness",
  "number-of-distinct-islands->islands",
  "number-of-islands->islands",
  "reverse-linked-list->linked-list-reversal",
  "two-sum->n-sum",
  "word-break->word-series",
  "word-ladder->word-series",
  "word-search->word-series",
]);

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

function plainTitle(value) {
  return String(value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function localQuestionMetadata(problem) {
  return {
    acRate:
      typeof problem.acRate === "string"
        ? Number.parseFloat(problem.acRate) / 100
        : problem.acRate,
    difficulty: problem.difficulty,
    frontendQuestionId: problem.frontendId,
    paidOnly: Boolean(problem.paidOnly),
    title: plainTitle(problem.titleSlug),
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    topicTags: problem.tags?.map((tag) => ({
      slug: tag.slug,
      name: tag.name,
      nameTranslated: tag.name,
    })) ?? [],
  };
}

function problemId(question) {
  return `${question.frontendQuestionId}. ${question.titleCn} (${question.titleSlug})`;
}

function seriesCandidateKeys(slug) {
  const tokens = String(slug || "").toLowerCase().split("-").filter(Boolean);
  const keys = [];
  for (let index = 1; index < tokens.length; index += 1) {
    if (!romanTokens.has(tokens[index])) continue;
    const prefix = tokens.slice(0, index);
    if (prefix.length >= 2) keys.push(prefix.join("-"));
  }
  return keys;
}

function buildRomanGroups(questionsBySlug) {
  const groupsByKey = new Map();
  for (const question of questionsBySlug.values()) {
    for (const key of seriesCandidateKeys(question.titleSlug)) {
      if (!groupsByKey.has(key)) groupsByKey.set(key, new Set());
      groupsByKey.get(key).add(question.titleSlug);
      if (questionsBySlug.has(key)) groupsByKey.get(key).add(key);
    }
  }
  return [...groupsByKey.entries()]
    .map(([key, members]) => ({
      key,
      memberSlugs: [...members].filter((slug) => questionsBySlug.has(slug)),
    }))
    .filter((group) => group.memberSlugs.length >= 2);
}

function buildMemberToDefinitions(definitions) {
  const result = new Map();
  for (const definition of definitions) {
    for (const slug of definition.memberSlugs) {
      if (!result.has(slug)) result.set(slug, []);
      result.get(slug).push(definition);
    }
  }
  return result;
}

function hasDefinitionCovering(definitions, memberSlugs) {
  return definitions.some((definition) =>
    memberSlugs.every((slug) => definition.memberSlugs.includes(slug)),
  );
}

function familyIsRelevant(candidateSlugs, seedSlugs, finalSlugs, definition) {
  if (definition) return true;
  return candidateSlugs.some((slug) => seedSlugs.has(slug) || finalSlugs.has(slug));
}

async function fetchAllQuestions() {
  const live = hasFlag("live");
  const cachePath = optionValue("cache", defaultCachePath);
  if (!live && cachePath && existsSync(cachePath)) {
    return JSON.parse(await readFile(cachePath, "utf8"));
  }

  const questions = [];
  let total = Number.POSITIVE_INFINITY;
  const limit = 100;
  for (let skip = 0; skip < total; skip += limit) {
    const response = await fetch(leetcodeChinaGraphqlEndpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        operationName: "problemsetQuestionList",
        query: problemsetQuery,
        variables: {
          categorySlug: "",
          filters: {},
          limit,
          skip,
        },
      }),
    });
    if (!response.ok) throw new Error(`LeetCode China GraphQL ${response.status}`);
    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((item) => item.message).join("; "));
    }
    total = payload.data.problemsetQuestionList.total;
    questions.push(...payload.data.problemsetQuestionList.questions);
  }

  if (cachePath && hasFlag("write-cache")) {
    await writeFile(cachePath, `${JSON.stringify(questions, null, 2)}\n`);
  }
  return questions;
}

function auditDefinitionIntegrity({ definitions, seriesProblems, questionsBySlug }) {
  const errors = [];
  const problemSlugs = new Set(seriesProblems.map((problem) => problem.titleSlug));
  const definitionSlugs = new Set();

  for (const definition of definitions) {
    if (definition.memberSlugs.length < 2) {
      errors.push(
        `${definition.key} has fewer than two members and should not be a series.`,
      );
    }
    for (const slug of definition.memberSlugs) {
      definitionSlugs.add(slug);
      if (!questionsBySlug.has(slug)) {
        errors.push(`${definition.key} references unknown official slug: ${slug}`);
      }
      if (!problemSlugs.has(slug)) {
        errors.push(`${definition.key} member is missing generated problem data: ${slug}`);
      }
    }
  }

  for (const slug of problemSlugs) {
    if (!definitionSlugs.has(slug)) {
      errors.push(`Generated series problem is not present in any definition: ${slug}`);
    }
  }
  return errors;
}

function auditRomanClosure({ definitions, finalSlugs, questionsBySlug }) {
  const errors = [];
  const groups = buildRomanGroups(questionsBySlug);
  for (const group of groups) {
    if (!group.memberSlugs.some((slug) => finalSlugs.has(slug))) continue;
    if (hasDefinitionCovering(definitions, group.memberSlugs)) continue;
    const members = group.memberSlugs
      .map((slug) => problemId(questionsBySlug.get(slug)))
      .join("; ");
    errors.push(
      `Official numbered series is not fully covered by one displayed series: ` +
        `${group.key}: ${members}`,
    );
  }
  return errors;
}

function auditCuratedFamilies({
  definitionsByKey,
  finalSlugs,
  seedSlugs,
  questionsBySlug,
}) {
  const errors = [];
  for (const family of auditedFamilies) {
    const candidates = [...questionsBySlug.values()].filter(family.matches);
    const candidateSlugs = candidates.map((question) => question.titleSlug);
    const definition = definitionsByKey.get(family.key);
    if (!familyIsRelevant(candidateSlugs, seedSlugs, finalSlugs, definition)) continue;
    if (!definition) {
      errors.push(
        `${family.title} has official candidates but no displayed series: ` +
          candidates.map(problemId).join("; "),
      );
      continue;
    }
    const missing = candidates.filter(
      (question) => !definition.memberSlugs.includes(question.titleSlug),
    );
    if (missing.length === 0) continue;
    errors.push(
      `${family.title} series is missing official candidates: ` +
        missing.map(problemId).join("; "),
    );
  }
  return errors;
}

function auditReviewCandidates({ definitionsByKey, finalSlugs, questionsBySlug }) {
  const warnings = [];
  for (const family of reviewFamilies) {
    const candidates = [...questionsBySlug.values()].filter(family.matches);
    const uncovered = candidates.filter((question) => {
      for (const key of family.coveredBy) {
        if (definitionsByKey.get(key)?.memberSlugs.includes(question.titleSlug)) {
          return false;
        }
      }
      return finalSlugs.has(question.titleSlug);
    });
    if (uncovered.length === 0) continue;
    warnings.push(
      `${family.title} has final-catalog candidates outside the intended family: ` +
        uncovered.map(problemId).join("; "),
    );
  }
  return warnings;
}

function auditSubsetSeries(definitions) {
  const warnings = [];
  for (const left of definitions) {
    const leftMembers = new Set(left.memberSlugs);
    for (const right of definitions) {
      if (left.key === right.key || left.memberSlugs.length >= right.memberSlugs.length) {
        continue;
      }
      if (left.memberSlugs.every((slug) => right.memberSlugs.includes(slug))) {
        if (intentionalSubsetPairs.has(`${left.key}->${right.key}`)) continue;
        warnings.push(`${left.key} is a subset of ${right.key}`);
        break;
      }
    }
  }
  return warnings;
}

function auditSeriesContentQuality(seriesProblems) {
  const errors = [];
  const warnings = [];
  const hiddenPromptPattern =
    /Create the variable named|store the input midway|left:\s*-9999px|opacity:\s*0/iu;
  const htmlEntityPattern = /&(?:lt|gt|amp|quot|nbsp|#\d+|#x[0-9a-f]+);/iu;
  const htmlTagPattern = /<\/?[a-z][a-z:-]*(?:\s[^<>]*)?>/u;

  for (const problem of seriesProblems) {
    for (const field of ["statementPreview", "approachPreview"]) {
      const value = String(problem[field] || "");
      if (!value.trim()) {
        errors.push(`${problem.titleSlug} has empty ${field}`);
      }
      if (hiddenPromptPattern.test(value)) {
        errors.push(`${problem.titleSlug} ${field} contains hidden prompt text`);
      }
      if (htmlEntityPattern.test(value)) {
        errors.push(`${problem.titleSlug} ${field} still contains raw HTML entity`);
      }
      if (htmlTagPattern.test(value)) {
        errors.push(`${problem.titleSlug} ${field} still contains raw HTML tag`);
      }
    }
    if (/请根据题目给定/.test(problem.statementPreview || "")) {
      warnings.push(`${problem.titleSlug} uses a generic statement fallback`);
    }
  }

  return { errors, warnings };
}

function auditByteDanceSeriesOverlay({ problems, bytedanceProblems, seriesProblems }) {
  const warnings = [];
  const baseSlugs = new Set(problems.map((problem) => problem.titleSlug));
  const bytedanceBySlug = new Map(
    bytedanceProblems.map((problem) => [problem.titleSlug, problem]),
  );
  const seriesByteDanceSupplements = seriesProblems.filter(
    (problem) => !baseSlugs.has(problem.titleSlug) && bytedanceBySlug.has(problem.titleSlug),
  );
  const lostOverlay = seriesProblems.filter(
    (problem) =>
      !baseSlugs.has(problem.titleSlug) &&
      !bytedanceBySlug.has(problem.titleSlug) &&
      problem.bytedance,
  );

  if (lostOverlay.length > 0) {
    warnings.push(
      "Series supplement has inline ByteDance markers but no ByteDance source row: " +
        lostOverlay.map((problem) => problem.titleSlug).join(", "),
    );
  }
  if (seriesByteDanceSupplements.length > 0) {
    warnings.push(
      "Series members outside the original seed already use ByteDance supplements: " +
        seriesByteDanceSupplements.map((problem) => {
          const bytedance = bytedanceBySlug.get(problem.titleSlug);
          const buckets = bytedance?.buckets || {};
          return `${problem.titleSlug}(all=${buckets.all ?? "-"},30d=${buckets.thirtyDays ?? "-"})`;
        }).join(", "),
    );
  }

  return warnings;
}

async function main() {
  const [problemsSource, bytedanceSource, seriesSource] = await Promise.all([
    readFile(problemsPath, "utf8"),
    readFile(bytedancePath, "utf8"),
    readFile(seriesPath, "utf8"),
  ]);

  const problems = extractJsonArray(
    problemsSource,
    "leetcodeProblems",
    "satisfies LeetcodeProblem\\[\\];",
  );
  const bytedanceProblems = extractJsonArray(
    bytedanceSource,
    "leetcodeByteDanceProblems",
    "satisfies LeetcodeByteDanceProblem\\[\\];",
  );
  const definitions = extractJsonArray(
    seriesSource,
    "leetcodeSeriesDefinitions",
    "satisfies LeetcodeSeriesDefinition\\[\\];",
  );
  const seriesProblems = extractJsonArray(
    seriesSource,
    "leetcodeSeriesProblems",
    "satisfies LeetcodeSeriesProblem\\[\\];",
  );
  let allQuestions;
  try {
    allQuestions = await fetchAllQuestions();
  } catch (error) {
    if (hasFlag("live")) throw error;
    console.warn(
      `Official problemset fetch failed; using local catalog fallback: ${error.message}`,
    );
    const localQuestionsBySlug = new Map();
    for (const problem of [...problems, ...bytedanceProblems, ...seriesProblems]) {
      if (!localQuestionsBySlug.has(problem.titleSlug)) {
        localQuestionsBySlug.set(problem.titleSlug, localQuestionMetadata(problem));
      }
    }
    allQuestions = [...localQuestionsBySlug.values()];
  }

  const questionsBySlug = new Map(
    allQuestions.map((question) => [question.titleSlug, question]),
  );
  for (const problem of [...problems, ...bytedanceProblems]) {
    if (!questionsBySlug.has(problem.titleSlug)) {
      questionsBySlug.set(problem.titleSlug, localQuestionMetadata(problem));
    }
  }
  const definitionsByKey = new Map(
    definitions.map((definition) => [definition.key, definition]),
  );
  const memberToDefinitions = buildMemberToDefinitions(definitions);
  const seedSlugs = new Set(
    [...problems, ...bytedanceProblems].map((problem) => problem.titleSlug),
  );
  const finalSlugs = new Set([
    ...seedSlugs,
    ...seriesProblems.map((problem) => problem.titleSlug),
  ]);

  const errors = [
    ...auditDefinitionIntegrity({ definitions, seriesProblems, questionsBySlug }),
    ...auditRomanClosure({ definitions, finalSlugs, questionsBySlug }),
    ...auditCuratedFamilies({
      definitionsByKey,
      finalSlugs,
      seedSlugs,
      questionsBySlug,
    }),
  ];
  const contentQuality = auditSeriesContentQuality(seriesProblems);
  errors.push(...contentQuality.errors);
  const warnings = [
    ...auditReviewCandidates({ definitionsByKey, finalSlugs, questionsBySlug }),
    ...auditSubsetSeries(definitions),
    ...auditByteDanceSeriesOverlay({ problems, bytedanceProblems, seriesProblems }),
    ...contentQuality.warnings,
  ];

  console.log("LeetCode series audit summary:");
  console.log(`- official problemset questions checked: ${allQuestions.length}`);
  console.log(`- questions available to series audit: ${questionsBySlug.size}`);
  console.log(`- original seed problems: ${seedSlugs.size}`);
  console.log(`- displayed series: ${definitions.length}`);
  console.log(`- displayed series problems: ${seriesProblems.length}`);
  console.log(`- final catalog problems: ${finalSlugs.size}`);
  console.log(`- member-to-series links: ${memberToDefinitions.size}`);
  console.log(`- hard errors: ${errors.length}`);
  console.log(`- review warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\nHard errors:");
    for (const error of errors) console.log(`- ${error}`);
  }
  if (warnings.length > 0 && !hasFlag("quiet-warnings")) {
    console.log("\nReview warnings:");
    for (const warning of warnings.slice(0, 40)) console.log(`- ${warning}`);
    if (warnings.length > 40) {
      console.log(`- ... ${warnings.length - 40} more warnings omitted`);
    }
  }

  if (errors.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
