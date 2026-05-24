import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const seriesPath = new URL("src/data/leetcode-series.ts", repoRoot);
const outputPath = new URL("src/data/leetcode-lingshen.ts", repoRoot);
const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const defaultQuestionCachePath = `/tmp/leetcode-cn-all-${new Date()
  .toISOString()
  .slice(0, 10)}.json`;
const defaultDoocsDir = "/tmp/doocs-leetcode";
const lingshenRouteUrl = "https://leetcode.cn/discuss/post/RvFUtj/";
const doocsRepoUrl = "https://github.com/doocs/leetcode";
const doocsLicense = "CC-BY-SA-4.0";
const statementPreviewLimit = 420;
const approachPreviewLimit = 520;
const problemsetPageSize = 100;

const lingshenSources = [
  {
    key: "sliding-window",
    title: "滑动窗口与双指针",
    titleEn: "Sliding Window & Two Pointers",
    description: "定长、不定长、单序列、双序列、三指针和分组循环题。",
    descriptionEn:
      "Fixed and variable windows, single-sequence and multi-sequence pointers.",
    postId: "0viNMK",
  },
  {
    key: "binary-search",
    title: "二分算法",
    titleEn: "Binary Search",
    description: "二分查找、二分答案、最小化最大值、最大化最小值和第 K 小。",
    descriptionEn:
      "Classic binary search, answer search, min-max, max-min, and kth order.",
    postId: "SqopEo",
  },
  {
    key: "monotonic-stack",
    title: "单调栈",
    titleEn: "Monotonic Stack",
    description: "基础单调栈、矩形面积、贡献法和最小字典序。",
    descriptionEn:
      "Monotonic stack basics, rectangle areas, contribution counting, and lexicographic minima.",
    postId: "9oZFK9",
  },
  {
    key: "grid-graph",
    title: "网格图",
    titleEn: "Grid Graphs",
    description: "网格 DFS、BFS 和综合建模题。",
    descriptionEn: "Grid DFS, BFS, and modeling-heavy grid problems.",
    postId: "YiXPXW",
  },
  {
    key: "bit-manipulation",
    title: "位运算",
    titleEn: "Bit Manipulation",
    description: "基础位运算、性质、拆位、试填、恒等式和思维题。",
    descriptionEn:
      "Bit basics, properties, per-bit splitting, constructive trials, and identities.",
    postId: "dHn9Vk",
  },
  {
    key: "graph",
    title: "图论算法",
    titleEn: "Graph Algorithms",
    description: "DFS/BFS、拓扑排序、基环树、最短路、最小生成树和网络流。",
    descriptionEn:
      "DFS/BFS, topological sorting, functional graphs, shortest paths, MST, and flow.",
    postId: "01LUak",
  },
  {
    key: "dynamic-programming",
    title: "动态规划",
    titleEn: "Dynamic Programming",
    description: "入门、背包、划分、状态机、区间、状压、数位、树形和概率期望 DP。",
    descriptionEn:
      "Intro DP, knapsack, partitioning, state machines, intervals, bitmask, digit, tree, and expectation DP.",
    postId: "tXLS3i",
  },
  {
    key: "data-structure",
    title: "常用数据结构",
    titleEn: "Data Structures",
    description: "枚举技巧、前缀和、差分、栈、队列、堆、Trie、并查集、树状数组和线段树。",
    descriptionEn:
      "Enumeration tricks, prefix sums, difference arrays, stacks, queues, heaps, tries, DSU, BIT, and segment trees.",
    postId: "mOr1u6",
  },
  {
    key: "math",
    title: "数学算法",
    titleEn: "Math Algorithms",
    description: "数论、组合、概率期望、博弈、计算几何和随机算法。",
    descriptionEn:
      "Number theory, combinatorics, probability, game theory, computational geometry, and randomized algorithms.",
    postId: "IYT3ss",
  },
  {
    key: "greedy-thinking",
    title: "贪心与思维",
    titleEn: "Greedy & Thinking",
    description: "基本贪心、反悔、区间、字典序、数学、思维、脑筋急转弯和构造。",
    descriptionEn:
      "Greedy strategies, regret, intervals, lexicographic order, math, thinking, puzzles, and construction.",
    postId: "g6KTKL",
  },
  {
    key: "linked-tree-backtracking",
    title: "链表、树与回溯",
    titleEn: "Linked List, Trees & Backtracking",
    description: "前后指针、快慢指针、二叉树 DFS/BFS、直径、LCA 和回溯。",
    descriptionEn:
      "Linked-list pointers, tree DFS/BFS, diameters, LCA, and backtracking.",
    postId: "K0n2gO",
  },
  {
    key: "string",
    title: "字符串",
    titleEn: "Strings",
    description: "KMP、Z 函数、Manacher、字符串哈希、AC 自动机、后缀数组和子序列自动机。",
    descriptionEn:
      "KMP, Z-function, Manacher, rolling hash, Aho-Corasick, suffix arrays, and subsequence automata.",
    postId: "SJFwQI",
  },
];

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

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

function postUrl(postId) {
  return `https://leetcode.cn/discuss/post/${postId}/`;
}

function githubBlobUrl(repoUrl, relativePath, branch = "main") {
  return `${repoUrl}/blob/${branch}/${relativePath
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

function stripMarkdown(value) {
  return String(value || "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function plainText(value) {
  return stripMarkdown(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function compactPreview(value, limit) {
  const text = plainText(value)
    .replace(/示例\s*\d*\s*[：:][\s\S]*$/u, "")
    .replace(/Example\s*\d*\s*:[\s\S]*$/iu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trim()}…`;
}

function decodeLinkedUrl(href) {
  if (!href.startsWith("/link/?target=")) return href;
  const url = new URL(href, "https://leetcode.cn");
  return decodeURIComponent(url.searchParams.get("target") || "");
}

function slugFromProblemHref(href) {
  const decoded = decodeLinkedUrl(href);
  return decoded.match(/leetcode\.cn\/problems\/([^/?#)]+)/)?.[1] || "";
}

function parseProblemLabel(label) {
  const text = plainText(label);
  const match = text.match(
    /^(?:(LCP|LCR|面试题|剑指 Offer(?: II)?)\s*)?(\d+[A-Za-z]?(?:\.\d+)?)\.?\s+(.+)$/u,
  );
  if (!match) {
    return {
      frontendId: "",
      titleCn: text,
    };
  }
  const prefix = match[1] ? `${match[1]} ` : "";
  return {
    frontendId: `${prefix}${match[2]}`,
    titleCn: match[3].trim(),
  };
}

function parseRating(rest) {
  const match = String(rest || "").match(/\b([12]\d{3}|3[0-9]{3})\b/);
  if (!match) return null;
  const rating = Number(match[1]);
  return Number.isFinite(rating) ? rating : null;
}

function parseNote(rest) {
  return plainText(rest)
    .replace(/\b([12]\d{3}|3[0-9]{3})\b/g, "")
    .replace(/^[，,。；;：:\s]+/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function nextData(html) {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!match) throw new Error("Could not find __NEXT_DATA__");
  return JSON.parse(match[1]);
}

function qaQuestionFromNextData(data) {
  return data.props.pageProps.dehydratedState.queries.find(
    (query) => query.state.data?.qaQuestion,
  )?.state.data.qaQuestion;
}

async function fetchLingShenPost(source) {
  const response = await fetch(postUrl(source.postId), {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok) throw new Error(`${source.key} HTTP ${response.status}`);
  const qaQuestion = qaQuestionFromNextData(nextData(await response.text()));
  if (!qaQuestion?.content) throw new Error(`${source.key} missing content`);
  return {
    content: qaQuestion.content,
    sourceTitle: qaQuestion.title || source.title,
    updatedAt: qaQuestion.updatedAt || qaQuestion.updated_at || "",
  };
}

function parsePostProblems(source, content) {
  const group = {
    description: source.description,
    descriptionEn: source.descriptionEn,
    key: source.key,
    memberSlugs: [],
    sections: [],
    sourceUrl: postUrl(source.postId),
    title: source.title,
    titleEn: source.titleEn,
  };
  const rows = [];
  const memberSet = new Set();
  const sectionByTitle = new Map();
  let currentSection = null;
  let orderInGroup = 0;

  function ensureSection(title) {
    const sectionTitle = title || "未分组";
    if (!sectionByTitle.has(sectionTitle)) {
      const section = {
        key: `section-${group.sections.length + 1}`,
        title: sectionTitle,
        titleEn: sectionTitle,
        memberSlugs: [],
      };
      sectionByTitle.set(sectionTitle, section);
      group.sections.push(section);
    }
    return sectionByTitle.get(sectionTitle);
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const heading = rawLine.match(/^#{2,4}\s+(.+)$/u);
    if (heading) {
      currentSection = ensureSection(
        plainText(heading[1]).replace(/^#+\s*/u, ""),
      );
      continue;
    }

    const linkPattern = /\[([^\]]+)]\(([^)]*leetcode\.cn\/problems\/[^)]*)\)/g;
    let match;
    while ((match = linkPattern.exec(rawLine))) {
      const slug = slugFromProblemHref(match[2]);
      if (!slug) continue;
      const rest = rawLine.slice(match.index + match[0].length);
      const label = parseProblemLabel(match[1]);
      orderInGroup += 1;
      if (!memberSet.has(slug)) {
        memberSet.add(slug);
        group.memberSlugs.push(slug);
      }
      const section = currentSection;
      if (section && !section.memberSlugs.includes(slug)) {
        section.memberSlugs.push(slug);
      }
      rows.push({
        frontendId: label.frontendId,
        groupKey: source.key,
        groupOrder: lingshenSources.findIndex((item) => item.key === source.key) + 1,
        groupRank: orderInGroup,
        groupTitle: source.title,
        note: parseNote(rest),
        paidOnlyHint: /会员题/u.test(rest),
        rating: parseRating(rest),
        sectionTitle: section?.title || "",
        sourceTitle: source.title,
        sourceUrl: postUrl(source.postId),
        titleCn: label.titleCn,
        titleSlug: slug,
      });
    }
  }

  return { group, rows };
}

async function fetchLingShenRows() {
  const groups = [];
  const occurrences = [];
  for (const source of lingshenSources) {
    const post = await fetchLingShenPost(source);
    const parsed = parsePostProblems(source, post.content);
    groups.push(parsed.group);
    occurrences.push(...parsed.rows);
    console.log(
      `${source.key}: ${parsed.rows.length} entries, ${parsed.group.memberSlugs.length} unique`,
    );
  }
  return { groups, occurrences };
}

async function walkFiles(dir, names, result = []) {
  if (!existsSync(dir)) return result;
  const entries = await readdir(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      await walkFiles(fullPath, names, result);
    } else if (names.has(entry)) {
      result.push(fullPath);
    }
  }
  return result;
}

function problemSlugs(markdown) {
  return [
    ...new Set(
      [...markdown.matchAll(/leetcode\.(?:com|cn)\/problems\/([^/)#?]+)/g)]
        .map((match) => match[1])
        .filter(Boolean),
    ),
  ];
}

async function buildDoocsBySlug(doocsDir) {
  const result = new Map();
  const roots = ["solution", "lcof", "lcof2", "lcci", "lcp", "lcs"];
  for (const root of roots) {
    const files = await walkFiles(
      path.join(doocsDir, root),
      new Set(["README.md", "README_EN.md"]),
    );
    for (const file of files) {
      const markdown = await readFile(file, "utf8");
      const slugs = problemSlugs(markdown);
      if (!slugs.length) continue;
      const relativePath = path.relative(doocsDir, file);
      const entry = {
        markdown,
        sourceTitle: `Doocs ${path.basename(path.dirname(file))}`,
        sourceUrl: githubBlobUrl(doocsRepoUrl, relativePath),
      };
      for (const slug of slugs) {
        const existing = result.get(slug);
        if (!existing || path.basename(file) === "README.md") {
          result.set(slug, entry);
        }
      }
    }
  }
  return result;
}

function extractSection(markdown, startPatterns, endPatterns) {
  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  let start = 0;
  for (let index = 0; index < lines.length; index += 1) {
    if (startPatterns.some((pattern) => pattern.test(lines[index]))) {
      start = index + 1;
      break;
    }
  }
  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    if (endPatterns.some((pattern) => pattern.test(lines[index]))) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

function markdownToText(markdown) {
  return String(markdown || "")
    .replace(/^---\n[\s\S]*?\n---\n/u, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "$1")
    .replace(/\[English Version][^\n]*/g, " ")
    .replace(/\[中文文档][^\n]*/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (/^\|/.test(trimmed)) return false;
      if (/^[-:|\s]+$/.test(trimmed)) return false;
      if (/^#+\s/.test(trimmed)) return false;
      return true;
    })
    .join(" ");
}

function statementFromDoocs(entry) {
  if (!entry?.markdown) return "";
  const body = extractSection(
    entry.markdown,
    [/^##\s+(?:题目描述|Description)/i],
    [/^##\s+(?:解法|Solutions?)/i, /^###\s+(?:解法|Solution)/i],
  );
  return compactPreview(markdownToText(body || entry.markdown), statementPreviewLimit);
}

function approachFromDoocs(entry) {
  if (!entry?.markdown) return "";
  const body = extractSection(
    entry.markdown,
    [/^##\s+(?:解法|Solutions?)/i, /^###\s+(?:解法|Solution)/i],
    [/^---\s*$/i],
  );
  return compactPreview(markdownToText(body), approachPreviewLimit);
}

function difficultyLabel(value) {
  if (value === "EASY" || value === "Easy") return "简单";
  if (value === "MEDIUM" || value === "Medium") return "中等";
  if (value === "HARD" || value === "Hard") return "困难";
  return value || "";
}

function acRateLabel(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${(numeric * 100).toFixed(1)}%`;
}

function localMetadata(problem) {
  return {
    acRate: problem.acRate,
    approachPreview: problem.approachPreview || "",
    difficulty: problem.difficulty,
    followUps: problem.followUps || [],
    frontendQuestionId: problem.frontendId,
    paidOnly: Boolean(problem.paidOnly),
    statementPreview: problem.statementPreview || "",
    title: problem.titleSlug,
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    topicTags: (problem.tags || []).map((tag) => ({
      name: tag.name,
      nameTranslated: tag.name,
      slug: tag.slug,
    })),
  };
}

async function readLocalProblems() {
  const [problemsSource, bytedanceSource, seriesSource] = await Promise.all([
    readFile(problemsPath, "utf8"),
    readFile(bytedancePath, "utf8"),
    readFile(seriesPath, "utf8"),
  ]);
  return [
    ...extractJsonArray(
      problemsSource,
      "leetcodeProblems",
      "satisfies LeetcodeProblem\\[\\];",
    ),
    ...extractJsonArray(
      bytedanceSource,
      "leetcodeByteDanceProblems",
      "satisfies LeetcodeByteDanceProblem\\[\\];",
    ),
    ...extractJsonArray(
      seriesSource,
      "leetcodeSeriesProblems",
      "satisfies LeetcodeSeriesProblem\\[\\];",
    ),
  ];
}

async function fetchAllQuestions() {
  const cachePath = optionValue("cache", defaultQuestionCachePath);
  if (cachePath && existsSync(cachePath)) {
    return JSON.parse(await readFile(cachePath, "utf8"));
  }
  const questions = [];
  let total = Number.POSITIVE_INFINITY;
  for (let skip = 0; skip < total; skip += problemsetPageSize) {
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
          limit: problemsetPageSize,
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
    console.log(`problemset: ${questions.length}/${total}`);
  }
  if (cachePath) {
    await writeFile(cachePath, JSON.stringify(questions, null, 2));
  }
  return questions;
}

function metadataFromQuestion(question) {
  return {
    acRate: acRateLabel(question.acRate),
    difficulty: difficultyLabel(question.difficulty),
    frontendQuestionId: question.frontendQuestionId,
    paidOnly: Boolean(question.paidOnly),
    title: question.title || "",
    titleCn: question.titleCn || question.translatedTitle || question.title || "",
    titleSlug: question.titleSlug || "",
    topicTags: (question.topicTags || []).map((tag) => ({
      name: tag.nameTranslated || tag.name || "",
      nameTranslated: tag.nameTranslated || tag.name || "",
      slug: tag.slug || "",
    })),
  };
}

function fallbackApproach(occurrence) {
  const section = occurrence.sectionTitle
    ? `的「${occurrence.sectionTitle}」小节`
    : "";
  return `这题收录在灵神${occurrence.groupTitle}题单${section}。刷这条路线时，先确认题目要求和数据范围，再把它归到当前专题的核心模型里：如果是基础题，重点练模板边界；如果是进阶题，重点比较它比同组前序题多出的限制。做完后应回到同组相邻题复盘，确认同一个套路在不同约束下为什么仍然成立，或者为什么必须换成更强的数据结构、状态设计或剪枝方式。`;
}

function generatedFollowUps(occurrence) {
  const section = occurrence.sectionTitle || occurrence.groupTitle;
  return [
    {
      question: "为什么这题适合放在当前灵神题单位置练？",
      answer: `它位于「${occurrence.groupTitle}」中的「${section}」，作用是巩固这一组的核心模型。先按题单顺序做前面的基础题，再做这题，可以更容易看出新增限制来自哪里。`,
    },
    {
      question: "刷同组题时应该重点比较什么？",
      answer: "比较状态定义、指针移动、单调性、数据结构维护对象或转移边界这些核心选择。题面看起来相似时，不要直接套代码，要先确认约束是否改变了可用模型。",
    },
    {
      question: "如果做不出来，复盘时从哪里开始？",
      answer: "先写出暴力做法和瓶颈，再看同组前序题有没有已经解决过这个瓶颈的套路。能说清楚为什么需要优化到当前解法，比只背最终代码更重要。",
    },
  ];
}

function mergeOccurrences(occurrences, metadataBySlug, localBySlug, doocsBySlug) {
  const problemsBySlug = new Map();
  const groupKeysBySlug = new Map();
  const sectionTitlesBySlug = new Map();
  const notesBySlug = new Map();

  occurrences.forEach((occurrence, index) => {
    const slug = occurrence.titleSlug;
    if (!groupKeysBySlug.has(slug)) groupKeysBySlug.set(slug, []);
    if (!groupKeysBySlug.get(slug).includes(occurrence.groupKey)) {
      groupKeysBySlug.get(slug).push(occurrence.groupKey);
    }
    if (!sectionTitlesBySlug.has(slug)) sectionTitlesBySlug.set(slug, []);
    if (
      occurrence.sectionTitle &&
      !sectionTitlesBySlug.get(slug).includes(occurrence.sectionTitle)
    ) {
      sectionTitlesBySlug.get(slug).push(occurrence.sectionTitle);
    }
    if (!notesBySlug.has(slug)) notesBySlug.set(slug, []);
    if (occurrence.note && !notesBySlug.get(slug).includes(occurrence.note)) {
      notesBySlug.get(slug).push(occurrence.note);
    }
    if (problemsBySlug.has(slug)) return;

    const metadata = metadataBySlug.get(slug) || {};
    const local = localBySlug.get(slug) || {};
    const doocs = doocsBySlug.get(slug);
    const statementPreview =
      local.statementPreview ||
      statementFromDoocs(doocs) ||
      fallbackApproach(occurrence);
    const approachPreview =
      local.approachPreview ||
      approachFromDoocs(doocs) ||
      fallbackApproach(occurrence);
    const followUps = Array.isArray(local.followUps) && local.followUps.length
      ? local.followUps
      : generatedFollowUps(occurrence);

    problemsBySlug.set(slug, {
      acRate: metadata.acRate ?? local.acRate ?? null,
      approachPreview,
      difficulty: metadata.difficulty ?? local.difficulty ?? "",
      followUps,
      frontendId:
        metadata.frontendQuestionId ||
        local.frontendQuestionId ||
        occurrence.frontendId ||
        "",
      groupKeys: [],
      lingshenRank: index + 1,
      note: "",
      paidOnly: Boolean(metadata.paidOnly || local.paidOnly || occurrence.paidOnlyHint),
      rating: occurrence.rating,
      sectionTitles: [],
      source: "leetcodeDiscuss",
      sourceTitle: occurrence.sourceTitle,
      sourceUrl: occurrence.sourceUrl,
      statementPreview,
      tags: (metadata.topicTags || local.topicTags || []).map((tag) => ({
        name: tag.nameTranslated || tag.name || "",
        slug: tag.slug || "",
      })),
      title: metadata.title || local.title || occurrence.titleSlug,
      titleCn: metadata.titleCn || local.titleCn || occurrence.titleCn || occurrence.titleSlug,
      titleSlug: slug,
      url: `https://leetcode.cn/problems/${slug}/description/`,
    });
  });

  return [...problemsBySlug.values()].map((problem) => ({
    ...problem,
    groupKeys: groupKeysBySlug.get(problem.titleSlug) || [],
    note: (notesBySlug.get(problem.titleSlug) || []).join("；"),
    sectionTitles: sectionTitlesBySlug.get(problem.titleSlug) || [],
  }));
}

function renderOutput(groups, problems, stats) {
  return `export interface LeetcodeLingShenGroup {
  key: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  sourceUrl: string;
  memberSlugs: string[];
  sections: Array<{
    key: string;
    title: string;
    titleEn: string;
    memberSlugs: string[];
  }>;
}

export interface LeetcodeLingShenProblem {
  acRate: string | null;
  approachPreview: string;
  difficulty: string;
  followUps: Array<{ question: string; answer: string }>;
  frontendId: string;
  groupKeys: string[];
  lingshenRank: number;
  note: string;
  paidOnly: boolean;
  rating: number | null;
  sectionTitles: string[];
  source: "leetcodeDiscuss";
  sourceTitle: string;
  sourceUrl: string;
  statementPreview: string;
  tags: Array<{ slug: string; name: string }>;
  title: string;
  titleCn: string;
  titleSlug: string;
  url: string;
}

export const leetcodeLingShenGroups = (${JSON.stringify(
    groups,
    null,
    2,
  )}) satisfies LeetcodeLingShenGroup[];

export const leetcodeLingShenProblems = (${JSON.stringify(
    problems,
    null,
    2,
  )}) satisfies LeetcodeLingShenProblem[];

export const leetcodeLingShenStats = ${JSON.stringify(stats, null, 2)} as const;
`;
}

async function main() {
  const doocsDir = optionValue(
    "doocs-dir",
    process.env.DOOCS_LEETCODE_DIR || defaultDoocsDir,
  );
  const [{ groups, occurrences }, localProblems, questions, doocsBySlug] =
    await Promise.all([
      fetchLingShenRows(),
      readLocalProblems(),
      fetchAllQuestions(),
      buildDoocsBySlug(doocsDir),
    ]);

  const localBySlug = new Map();
  for (const problem of localProblems) {
    if (!localBySlug.has(problem.titleSlug)) {
      localBySlug.set(problem.titleSlug, localMetadata(problem));
    }
  }
  const metadataBySlug = new Map(
    questions.map((question) => [
      question.titleSlug,
      metadataFromQuestion(question),
    ]),
  );
  for (const [slug, metadata] of localBySlug) {
    if (!metadataBySlug.has(slug)) metadataBySlug.set(slug, metadata);
  }

  const problems = mergeOccurrences(
    occurrences,
    metadataBySlug,
    localBySlug,
    doocsBySlug,
  );
  const knownLocalSlugs = new Set(localProblems.map((problem) => problem.titleSlug));
  const stats = {
    generatedAt: new Date().toISOString().slice(0, 10),
    groups: groups.length,
    occurrences: occurrences.length,
    problems: problems.length,
    localAlreadyCovered: problems.filter((problem) =>
      knownLocalSlugs.has(problem.titleSlug),
    ).length,
    supplements: problems.filter((problem) => !knownLocalSlugs.has(problem.titleSlug))
      .length,
    paidOnly: problems.filter((problem) => problem.paidOnly).length,
    withRating: problems.filter((problem) => problem.rating !== null).length,
    source: "LeetCode China LingShen discussion posts linked from the scientific practice route.",
    sourceUrl: lingshenRouteUrl,
    doocsSource: `${doocsRepoUrl} (${doocsLicense})`,
  };

  await mkdir(path.dirname(fileURLToPath(outputPath)), { recursive: true });
  await writeFile(outputPath, renderOutput(groups, problems, stats));
  console.log(
    `Wrote ${stats.problems} LingShen problems across ${stats.groups} groups; ` +
      `${stats.supplements} are new supplements.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
