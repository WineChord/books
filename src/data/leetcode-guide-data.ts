import {
  leetcodeMergedProblems,
} from "./leetcode-detail-data";
import {
  leetcodeLingShenGroups,
} from "./leetcode-lingshen";
import {
  leetcodeSeriesDefinitions,
} from "./leetcode-series";

const missingFrequencyRank = 999999;
const seriesRomanTokenValues = new Map([
  ["i", 1],
  ["ii", 2],
  ["iii", 3],
  ["iv", 4],
  ["v", 5],
  ["vi", 6],
  ["vii", 7],
  ["viii", 8],
  ["ix", 9],
  ["x", 10],
]);
const explicitlySequentialSeriesKeys = new Set(["n-sum"]);

const leetcodePracticeCategoryDefinitions = [
  {
    key: "dynamic-programming",
    title: "动态规划",
    titleEn: "Dynamic Programming",
    description: "状态定义、转移、记忆化搜索、背包和区间/序列 DP 放在一起练。",
    descriptionEn:
      "State design, transitions, memoization, knapsack, and sequence/interval DP.",
    tagSlugs: [
      "dynamic-programming",
      "memoization",
      "counting",
      "combinatorics",
    ],
  },
  {
    key: "tree",
    title: "树与二叉树",
    titleEn: "Trees",
    description: "二叉树、BST、递归分治、树上遍历和树形状态题。",
    descriptionEn:
      "Binary trees, BSTs, recursive divide-and-conquer, traversals, and tree states.",
    tagSlugs: [
      "tree",
      "binary-tree",
      "binary-search-tree",
      "divide-and-conquer",
    ],
  },
  {
    key: "graph-search",
    title: "图论与搜索",
    titleEn: "Graphs & Search",
    description: "图建模、BFS/DFS、拓扑排序、并查集和最短路题。",
    descriptionEn:
      "Graph modeling, BFS/DFS, topological sorting, union-find, and shortest paths.",
    tagSlugs: [
      "graph",
      "breadth-first-search",
      "depth-first-search",
      "topological-sort",
      "union-find",
      "shortest-path",
    ],
  },
  {
    key: "backtracking",
    title: "回溯枚举",
    titleEn: "Backtracking",
    description: "排列组合、子集、棋盘搜索和剪枝枚举集中练。",
    descriptionEn:
      "Permutations, combinations, subsets, board search, and pruning.",
    tagSlugs: ["backtracking"],
  },
  {
    key: "two-pointers-window",
    title: "双指针与滑窗",
    titleEn: "Two Pointers & Window",
    description: "左右指针、快慢指针、定长/变长窗口和原地收缩题。",
    descriptionEn:
      "Left/right pointers, fast/slow pointers, fixed and variable windows.",
    tagSlugs: ["two-pointers", "sliding-window"],
  },
  {
    key: "stack-queue",
    title: "栈、队列与单调结构",
    titleEn: "Stack & Queue",
    description: "栈、队列、单调栈、单调队列和括号/表达式类题。",
    descriptionEn:
      "Stacks, queues, monotonic structures, parentheses, and expression problems.",
    tagSlugs: [
      "stack",
      "queue",
      "monotonic-stack",
      "monotonic-queue",
      "recursion",
    ],
  },
  {
    key: "heap-topk",
    title: "堆与 TopK",
    titleEn: "Heap & TopK",
    description: "优先队列、TopK、合并有序结构和数据流排名题。",
    descriptionEn:
      "Priority queues, TopK, merging sorted structures, and stream ranking.",
    tagSlugs: ["heap-priority-queue"],
  },
  {
    key: "binary-search-sort",
    title: "二分、排序与有序结构",
    titleEn: "Binary Search & Order",
    description: "二分答案、旋转数组、有序集合、排序和扫描线题。",
    descriptionEn:
      "Binary search on values, rotated arrays, ordered sets, sorting, and sweep line.",
    tagSlugs: [
      "binary-search",
      "sorting",
      "ordered-set",
      "merge-sort",
      "quickselect",
      "bucket-sort",
      "radix-sort",
      "counting-sort",
      "line-sweep",
    ],
  },
  {
    key: "linked-list",
    title: "链表",
    titleEn: "Linked List",
    description: "反转、合并、快慢指针、环、相交和链表原地修改题。",
    descriptionEn:
      "Reversal, merge, fast/slow pointers, cycles, intersections, and in-place edits.",
    tagSlugs: ["linked-list", "doubly-linked-list"],
  },
  {
    key: "string-trie",
    title: "字符串与 Trie",
    titleEn: "String & Trie",
    description: "字符串解析、匹配、哈希、Trie、字典和文本扫描题。",
    descriptionEn:
      "Parsing, matching, hashing, tries, dictionaries, and text scanning.",
    tagSlugs: [
      "string",
      "string-matching",
      "trie",
      "rolling-hash",
      "hash-function",
      "suffix-array",
    ],
  },
  {
    key: "greedy",
    title: "贪心",
    titleEn: "Greedy",
    description: "局部最优、区间选择、调度、构造和交换论证题。",
    descriptionEn:
      "Local optimal choices, interval selection, scheduling, construction, and exchange arguments.",
    tagSlugs: ["greedy"],
  },
  {
    key: "array-hash-prefix",
    title: "数组、哈希与前缀",
    titleEn: "Array, Hash & Prefix",
    description: "数组遍历、哈希表、前缀和、差分、矩阵和计数题。",
    descriptionEn:
      "Array scans, hash tables, prefix sums, difference arrays, matrices, and counting.",
    tagSlugs: [
      "array",
      "hash-table",
      "prefix-sum",
      "matrix",
      "simulation",
      "enumeration",
    ],
  },
  {
    key: "design-structure",
    title: "设计与数据结构",
    titleEn: "Design & Data Structure",
    description: "缓存、迭代器、随机化结构、数据流和手写结构类题。",
    descriptionEn:
      "Caches, iterators, randomized structures, streams, and hand-built structures.",
    tagSlugs: [
      "design",
      "data-stream",
      "iterator",
      "randomized",
      "reservoir-sampling",
      "rejection-sampling",
    ],
  },
  {
    key: "sql-frontend-concurrency",
    title: "SQL、并发与前端",
    titleEn: "SQL, Concurrency & Frontend",
    description: "数据库 SQL、多线程、Promise 和偏前端 API 题集中处理。",
    descriptionEn:
      "Database SQL, concurrency, Promise, and frontend-leaning API problems.",
    tagSlugs: ["database", "concurrency", "javascript"],
    slugIncludes: [
      "array-prototype",
      "calculator-with-method-chaining",
      "curry",
      "debounce",
      "event-emitter",
      "function-composition",
      "memoize",
      "promise",
      "sleep",
      "throttle",
      "word-frequency",
    ],
  },
  {
    key: "math-bit",
    title: "数学与位运算",
    titleEn: "Math & Bit",
    description: "数论、概率、几何、位运算和公式推导题。",
    descriptionEn:
      "Number theory, probability, geometry, bit manipulation, and formula derivation.",
    tagSlugs: [
      "math",
      "bit-manipulation",
      "number-theory",
      "geometry",
      "probability-and-statistics",
      "randomized",
      "rejection-sampling",
    ],
  },
];

const leetcodePracticeUncategorized = {
  key: "mixed",
  title: "综合补齐",
  titleEn: "Mixed",
  description: "暂未落入主分类的题，作为兜底补齐，保证题单覆盖完整。",
  descriptionEn:
    "Fallback bucket for complete coverage when no primary category tag matches.",
  tagSlugs: [],
};

const leetcodePracticeCategoryTagWeights = new Map([
  ["tree", 18],
  ["binary-tree", 18],
  ["binary-search-tree", 18],
  ["graph", 18],
  ["topological-sort", 18],
  ["union-find", 18],
  ["shortest-path", 18],
  ["dynamic-programming", 17],
  ["memoization", 17],
  ["backtracking", 16],
  ["trie", 16],
  ["heap-priority-queue", 15],
  ["sliding-window", 15],
  ["monotonic-stack", 15],
  ["monotonic-queue", 15],
  ["design", 15],
  ["data-stream", 15],
  ["binary-search", 14],
  ["linked-list", 14],
  ["doubly-linked-list", 14],
  ["two-pointers", 13],
  ["stack", 13],
  ["queue", 13],
  ["string-matching", 13],
  ["rolling-hash", 13],
  ["greedy", 12],
  ["bit-manipulation", 12],
  ["math", 11],
  ["prefix-sum", 11],
  ["matrix", 10],
  ["database", 16],
  ["concurrency", 16],
  ["javascript", 16],
  ["hash-table", 9],
  ["string", 8],
  ["array", 7],
]);

const leetcodeProblemPayloadIndexBySlug = new Map(
  leetcodeMergedProblems.map((problem, index) => [problem.titleSlug, index]),
);
const leetcodeSeriesDefinitionOrderByKey = new Map(
  leetcodeSeriesDefinitions.map((definition) => [
    definition.key,
    new Map(definition.memberSlugs.map((slug, index) => [slug, index])),
  ]),
);

function problemFrontendOrder(problem) {
  const id = Number(problem.frontendId);
  return Number.isFinite(id) ? id : missingFrequencyRank;
}

function problemFrequencyOrder(problem) {
  return problem.topRank ?? problem.frequencyRank ?? missingFrequencyRank;
}

function compareProblemsByDefaultOrder(left, right) {
  return (
    problemFrontendOrder(left) - problemFrontendOrder(right) ||
    problemFrequencyOrder(left) - problemFrequencyOrder(right) ||
    left.titleSlug.localeCompare(right.titleSlug)
  );
}

function seriesOrderValue(slug, seriesKey) {
  if (slug === seriesKey) return 0;
  const suffix = slug.startsWith(`${seriesKey}-`)
    ? slug.slice(seriesKey.length + 1).split("-")[0]
    : "";
  return seriesRomanTokenValues.get(suffix) ?? Number.MAX_SAFE_INTEGER;
}

function slugRomanOrderValue(slug) {
  const parts = slug.split("-");
  return (
    seriesRomanTokenValues.get(parts[parts.length - 1]) ??
    Number.MAX_SAFE_INTEGER
  );
}

function problemPrimarySeriesKey(problem) {
  return problem.seriesPrimaryKey || (problem.seriesKeys || [])[0] || "";
}

function problemSeriesDefinitionOrder(problem, seriesKey) {
  const definitionOrder =
    leetcodeSeriesDefinitionOrderByKey.get(seriesKey)?.get(problem.titleSlug);
  if (definitionOrder !== undefined) return definitionOrder;
  return seriesOrderValue(problem.titleSlug, seriesKey);
}

function hasRomanSeriesOrder(problem, seriesKey) {
  return (
    seriesOrderValue(problem.titleSlug, seriesKey) !== Number.MAX_SAFE_INTEGER ||
    slugRomanOrderValue(problem.titleSlug) !== Number.MAX_SAFE_INTEGER
  );
}

function usesSequentialSeriesOrder(seriesKey, problems) {
  return (
    explicitlySequentialSeriesKeys.has(seriesKey) ||
    problems.some((problem) => hasRomanSeriesOrder(problem, seriesKey))
  );
}

function sequentialProblemProfiles(problems) {
  const seriesProblems = new Map();
  for (const problem of problems) {
    const key = problemPrimarySeriesKey(problem);
    if (!key) continue;
    const members = seriesProblems.get(key) || [];
    members.push(problem);
    seriesProblems.set(key, members);
  }

  const seriesBaseOrder = new Map();
  for (const [key, members] of seriesProblems) {
    if (members.length < 2 || !usesSequentialSeriesOrder(key, members)) continue;
    seriesBaseOrder.set(key, Math.min(...members.map(problemFrontendOrder)));
  }

  return new Map(
    problems.map((problem) => {
      const seriesKey = problemPrimarySeriesKey(problem);
      const shouldUseSeriesOrder =
        Boolean(seriesKey) && seriesBaseOrder.has(seriesKey);
      if (!shouldUseSeriesOrder) {
        return [
          problem.titleSlug,
          {
            baseOrder: problemFrontendOrder(problem),
            seriesOrder: 0,
          },
        ];
      }
      return [
        problem.titleSlug,
        {
          baseOrder: seriesBaseOrder.get(seriesKey) ?? problemFrontendOrder(problem),
          seriesOrder: problemSeriesDefinitionOrder(problem, seriesKey),
        },
      ];
    }),
  );
}

function compareProblemsBySequentialOrder(left, right, profiles) {
  const leftProfile = profiles.get(left.titleSlug) || {};
  const rightProfile = profiles.get(right.titleSlug) || {};
  return (
    (leftProfile.baseOrder ?? problemFrontendOrder(left)) -
      (rightProfile.baseOrder ?? problemFrontendOrder(right)) ||
    (leftProfile.seriesOrder ?? 0) - (rightProfile.seriesOrder ?? 0) ||
    compareProblemsByDefaultOrder(left, right)
  );
}

function sortProblemsBySequentialOrder(problems) {
  const profiles = sequentialProblemProfiles(problems);
  return [...problems].sort((left, right) =>
    compareProblemsBySequentialOrder(left, right, profiles),
  );
}

function compareProblemsBySeriesDefinition(left, right, seriesKey) {
  return (
    problemSeriesDefinitionOrder(left, seriesKey) -
      problemSeriesDefinitionOrder(right, seriesKey) ||
    compareProblemsByDefaultOrder(left, right)
  );
}

function seriesFrequencyProfile(group) {
  const ranked = group.members
    .map(problemFrequencyOrder)
    .sort((left, right) => left - right);
  const leadRanks = ranked.slice(0, 3);
  const leadAverage = leadRanks.length
    ? leadRanks.reduce((sum, rank) => sum + rank, 0) / leadRanks.length
    : missingFrequencyRank;
  return {
    best: ranked[0] ?? missingFrequencyRank,
    leadAverage,
    top888Count: ranked.filter((rank) => rank <= 888).length,
    hotCount: group.members.filter((member) => member.hot100).length,
    memberCount: group.members.length,
  };
}

function compareSeriesByFrequency(left, right) {
  const leftProfile = seriesFrequencyProfile(left);
  const rightProfile = seriesFrequencyProfile(right);
  return (
    leftProfile.best - rightProfile.best ||
    leftProfile.leadAverage - rightProfile.leadAverage ||
    rightProfile.top888Count - leftProfile.top888Count ||
    rightProfile.hotCount - leftProfile.hotCount ||
    rightProfile.memberCount - leftProfile.memberCount ||
    left.title.localeCompare(right.title)
  );
}

function buildSeriesCatalog(catalogProblems, seriesDefinitions) {
  const bySlug = new Map(
    catalogProblems.map((problem) => [problem.titleSlug, problem]),
  );
  const groups = [];
  for (const definition of seriesDefinitions) {
    const members = definition.memberSlugs
      .map((slug) => bySlug.get(slug))
      .filter(Boolean);
    if (members.length < 2) continue;
    members.sort((left, right) =>
      compareProblemsBySeriesDefinition(left, right, definition.key),
    );
    groups.push({
      ...definition,
      members,
    });
  }
  groups.sort(compareSeriesByFrequency);
  return { groups };
}

function compactIdeaText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function clippedIdeaText(text, limit = 96) {
  const compact = compactIdeaText(text);
  if (compact.length <= limit) return compact;
  return `${compact.slice(0, limit).replace(/[，。；、\s]+$/u, "")}…`;
}

function problemIdeaFallback(problem) {
  const tags = (problem.tags || []).slice(0, 3).map((tag) => tag.name);
  if (tags.length > 0) {
    return `从 ${tags.join("、")} 入手，先确定状态、窗口或数据结构，再补齐边界。`;
  }
  return "先拆输入规模、状态和边界，再选择可验证的最小策略。";
}

function problemIdeaText(problem) {
  return clippedIdeaText(
    problem.approachPreview ||
      problem.statementPreview ||
      problemIdeaFallback(problem),
  );
}

function groupIdeaTags(members) {
  const tagCounts = new Map();
  for (const member of members) {
    for (const tag of member.tags || []) {
      const current = tagCounts.get(tag.slug) || {
        count: 0,
        name: tag.name,
        slug: tag.slug,
      };
      current.count += 1;
      tagCounts.set(tag.slug, current);
    }
  }
  return Array.from(tagCounts.values())
    .sort((left, right) =>
      right.count - left.count || left.name.localeCompare(right.name),
    )
    .slice(0, 4)
    .map((tag) => tag.name);
}

function groupReviewPrompts(members) {
  const prompts = [];
  const seen = new Set();
  for (const member of members) {
    for (const followUp of member.followUps || []) {
      const prompt = clippedIdeaText(followUp.question, 82);
      if (!prompt || seen.has(prompt)) continue;
      seen.add(prompt);
      prompts.push(prompt);
      if (prompts.length >= 2) return prompts;
    }
  }
  return prompts;
}

function groupIdeaProfile(group, members) {
  return {
    lead: group.description,
    leadEn: group.descriptionEn || group.description,
    reviewPrompts: groupReviewPrompts(members),
    tags: groupIdeaTags(members),
  };
}

function compactGroupIdea(idea) {
  return {
    lead: idea.lead,
    leadEn: idea.leadEn,
    reviewPrompts: idea.reviewPrompts,
    tags: idea.tags,
  };
}

function packedMemberSlugs(slugs) {
  return slugs
    .map((slug) => leetcodeProblemPayloadIndexBySlug.get(slug))
    .filter(Number.isInteger);
}

function practiceProblemRank(problem, collectionKey) {
  if (collectionKey === "hot100") {
    return problem.hotRank ?? problemFrequencyOrder(problem);
  }
  if (collectionKey === "bytedance") {
    return (
      problem.bytedanceRank ??
      problem.bytedanceBuckets?.all ??
      problem.frequencyRank ??
      missingFrequencyRank
    );
  }
  return problemFrequencyOrder(problem);
}

function comparePracticeProblems(left, right, collectionKey) {
  return (
    practiceProblemRank(left, collectionKey) -
      practiceProblemRank(right, collectionKey) ||
    problemFrequencyOrder(left) - problemFrequencyOrder(right) ||
    problemFrontendOrder(left) - problemFrontendOrder(right) ||
    left.titleSlug.localeCompare(right.titleSlug)
  );
}

function practiceCategoryScore(problem, category) {
  const tagSlugs = new Set((problem.tags || []).map((tag) => tag.slug));
  const tagScore = category.tagSlugs.reduce((score, tagSlug) => {
    if (!tagSlugs.has(tagSlug)) return score;
    return score + (leetcodePracticeCategoryTagWeights.get(tagSlug) ?? 6);
  }, 0);
  const slugScore = (category.slugIncludes || []).some((keyword) =>
    problem.titleSlug.includes(keyword),
  )
    ? 16
    : 0;
  return tagScore + slugScore;
}

function primaryPracticeCategory(problem) {
  let bestCategory = leetcodePracticeUncategorized;
  let bestScore = 0;
  for (const category of leetcodePracticeCategoryDefinitions) {
    const score = practiceCategoryScore(problem, category);
    if (score > bestScore) {
      bestCategory = category;
      bestScore = score;
    }
  }
  return bestCategory;
}

function practiceCategoryFrequencyProfile(category, collectionKey) {
  const ranks = category.members
    .map((member) => practiceProblemRank(member, collectionKey))
    .sort((left, right) => left - right);
  const leadRanks = ranks.slice(0, 3);
  const leadAverage = leadRanks.length
    ? leadRanks.reduce((sum, rank) => sum + rank, 0) / leadRanks.length
    : missingFrequencyRank;
  return {
    best: ranks[0] ?? missingFrequencyRank,
    leadAverage,
    memberCount: category.members.length,
  };
}

function comparePracticeCategories(left, right, collectionKey) {
  const leftProfile = practiceCategoryFrequencyProfile(left, collectionKey);
  const rightProfile = practiceCategoryFrequencyProfile(right, collectionKey);
  return (
    leftProfile.best - rightProfile.best ||
    leftProfile.leadAverage - rightProfile.leadAverage ||
    rightProfile.memberCount - leftProfile.memberCount ||
    left.title.localeCompare(right.title)
  );
}

function buildPracticeCategoryCollection({
  key,
  title,
  titleEn,
  description,
  descriptionEn,
  problems,
}) {
  const categoryByKey = new Map(
    [...leetcodePracticeCategoryDefinitions, leetcodePracticeUncategorized]
      .map((category) => [
        category.key,
        {
          ...category,
          id: `${key}:${category.key}`,
          members: [],
        },
      ]),
  );
  const sortedProblems = [...problems].sort((left, right) =>
    comparePracticeProblems(left, right, key),
  );
  for (const problem of sortedProblems) {
    const category = primaryPracticeCategory(problem);
    categoryByKey.get(category.key)?.members.push(problem);
  }
  const categories = Array.from(categoryByKey.values())
    .filter((category) => category.members.length > 0)
    .sort((left, right) => comparePracticeCategories(left, right, key))
    .map((category) => {
      const members = sortProblemsBySequentialOrder(category.members);
      return {
        ...category,
        idea: groupIdeaProfile(category, members),
        members,
      };
    });
  const distinctCount = new Set(sortedProblems.map((problem) => problem.titleSlug))
    .size;
  return {
    categories,
    description,
    descriptionEn,
    distinctCount,
    key,
    title,
    titleEn,
  };
}

function buildOrderedPracticeGroupCollection({
  key,
  title,
  titleEn,
  description,
  descriptionEn,
  groups,
  catalogBySlug,
}) {
  const categories = groups
    .map((group) => {
      const members = group.memberSlugs
        .map((slug) => catalogBySlug.get(slug))
        .filter(Boolean);
      return {
        description: group.description,
        descriptionEn: group.descriptionEn,
        id: `${key}:${group.key}`,
        idea: groupIdeaProfile(group, members),
        key: group.key,
        members,
        title: group.title,
        titleEn: group.titleEn,
      };
    })
    .filter((group) => group.members.length > 0);
  const distinctCount = new Set(
    categories.flatMap((category) =>
      category.members.map((member) => member.titleSlug),
    ),
  ).size;
  return {
    categories,
    description,
    descriptionEn,
    distinctCount,
    key,
    title,
    titleEn,
  };
}

const leetcodeProblemsWithReferencesBySlug = new Map(
  leetcodeMergedProblems.map((problem) => [problem.titleSlug, problem]),
);
const leetcodeSeriesGuideGroups = buildSeriesCatalog(
  leetcodeMergedProblems,
  leetcodeSeriesDefinitions,
).groups;

export const leetcodeSeriesGuideOptions = leetcodeSeriesGuideGroups.map((group) => ({
  key: group.key,
  title: group.title,
  titleEn: group.titleEn,
  description: group.description,
  descriptionEn: group.descriptionEn || group.description,
  count: group.members.length,
  idea: compactGroupIdea(groupIdeaProfile(group, group.members)),
  supplements: group.members.filter((member) => member.seriesSupplement).length,
  members: packedMemberSlugs(group.members.map((member) => member.titleSlug)),
}));

const leetcodePracticeCategoryCollections = [
  buildPracticeCategoryCollection({
    key: "hot100",
    title: "Hot100 分类刷题单",
    titleEn: "Hot 100 Topic List",
    description:
      "按主算法标签把 Hot100 拆成可连续练的小题单，分类按高频优先，组内按题号和系列递进顺序。",
    descriptionEn:
      "Hot 100 split by primary algorithm tag, with groups ordered by frequency and each group ordered by problem number and series progression.",
    problems: leetcodeMergedProblems.filter((problem) => problem.hot100),
  }),
  buildPracticeCategoryCollection({
    key: "bytedance",
    title: "字节分类刷题单",
    titleEn: "ByteDance Topic List",
    description:
      "按字节题库全量排名和主算法标签拆分，分类按高频优先，组内按题号和系列递进顺序。",
    descriptionEn:
      "ByteDance problems split by company rank and primary algorithm tag, with each group ordered by problem number and series progression.",
    problems: leetcodeMergedProblems.filter((problem) => problem.bytedance),
  }),
  buildOrderedPracticeGroupCollection({
    key: "lingshen",
    title: "灵神题单",
    titleEn: "LingShen Topic List",
    description:
      "按灵神「如何科学刷题」路线的 12 个专题串联，专题内保留原题单顺序和难度分。",
    descriptionEn:
      "The 12-topic LingShen practice route, preserving source order and ratings inside each topic.",
    groups: leetcodeLingShenGroups,
    catalogBySlug: leetcodeProblemsWithReferencesBySlug,
  }),
];

export const leetcodePracticeCategoryGuideOptions =
  leetcodePracticeCategoryCollections.flatMap((collection) =>
    collection.categories.map((category) => ({
      collectionKey: collection.key,
      collectionTitle: collection.title,
      collectionTitleEn: collection.titleEn,
      count: category.members.length,
      id: category.id,
      key: category.key,
      description: category.description,
      descriptionEn: category.descriptionEn,
      idea: compactGroupIdea(category.idea),
      members: packedMemberSlugs(category.members.map((member) => member.titleSlug)),
      title: category.title,
      titleEn: category.titleEn,
    })),
  );

export const leetcodeProblemGuidePayload = {
  categories: leetcodePracticeCategoryGuideOptions,
  series: leetcodeSeriesGuideOptions,
};
