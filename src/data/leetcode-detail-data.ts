import { leetcodeCodeTemplates } from "./leetcode-code-templates";
import { leetcodeImplementationReferences } from "./leetcode-implementation-references";
import { leetcodeGeneratedImplementationReferences } from "./leetcode-implementation-generated";
import { leetcodeByteDanceProblems } from "./leetcode-bytedance";
import { leetcodeProblems } from "./leetcode-problems";
import {
  leetcodeProblemConstraintHtml,
  leetcodeProblemStatementHtml,
} from "./leetcode-problem-math";
import { leetcodeProblemStatementAssets } from "./leetcode-problem-assets";
import { leetcodeRelatedQuestions } from "./leetcode-related";
import {
  leetcodeSeriesDefinitions,
  leetcodeSeriesProblems,
} from "./leetcode-series";
import {
  leetcodeLingShenGroups,
  leetcodeLingShenProblems,
} from "./leetcode-lingshen";
import { leetcodeContestRatings } from "./leetcode-contest-ratings";

const leetcodeTargetLimit = 888;
const relatedTopicPeerLimit = 6;
const missingFrequencyRank = 999999;
const byteDanceBySlug = new Map(
  leetcodeByteDanceProblems.map((problem) => [problem.titleSlug, problem]),
);
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
const strongRelatedTagSlugs = new Set([
  "backtracking",
  "binary-search",
  "binary-tree",
  "bit-manipulation",
  "breadth-first-search",
  "depth-first-search",
  "dynamic-programming",
  "graph",
  "heap-priority-queue",
  "linked-list",
  "monotonic-queue",
  "monotonic-stack",
  "prefix-sum",
  "shortest-path",
  "sliding-window",
  "stack",
  "string-matching",
  "topological-sort",
  "tree",
  "trie",
  "two-pointers",
  "union-find",
]);

function mergedByteDanceBuckets(problem) {
  const entry = byteDanceBySlug.get(problem.titleSlug);
  if (entry) return entry.buckets;
  const periods = problem.bytedancePeriods || {};
  return {
    all: problem.bytedance ? problem.frequencyRank : null,
    thirtyDays: null,
    threeMonths: periods.past3Months,
    sixMonths: periods.past6Months,
    moreThanSixMonths: periods.before6Months,
  };
}

function frequencyLabel(value) {
  if (value === null || value === undefined) return "字节补充";
  return `${Number(value).toFixed(1)}%`;
}

function seriesOrderValue(slug, seriesKey) {
  if (slug === seriesKey) return 0;
  const suffix = slug.startsWith(`${seriesKey}-`)
    ? slug.slice(seriesKey.length + 1).split("-")[0]
    : "";
  return seriesRomanTokenValues.get(suffix) ?? Number.MAX_SAFE_INTEGER;
}

function problemFrequencyOrder(problem) {
  return problem.topRank ?? problem.frequencyRank ?? missingFrequencyRank;
}

function problemFrontendOrder(problem) {
  const id = Number(problem.frontendId);
  return Number.isFinite(id) ? id : missingFrequencyRank;
}

function compareProblemsByFrequency(left, right) {
  return (
    problemFrequencyOrder(left) - problemFrequencyOrder(right) ||
    (left.hotRank ?? missingFrequencyRank) -
      (right.hotRank ?? missingFrequencyRank) ||
    problemFrontendOrder(left) - problemFrontendOrder(right) ||
    left.titleSlug.localeCompare(right.titleSlug)
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
    top888Count: ranked.filter((rank) => rank <= leetcodeTargetLimit).length,
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
  const groupsBySlug = new Map();
  for (const definition of seriesDefinitions) {
    const members = definition.memberSlugs
      .map((slug) => bySlug.get(slug))
      .filter(Boolean);
    if (members.length < 2) continue;
    members.sort((left, right) => {
      const leftOrder = seriesOrderValue(left.titleSlug, definition.key);
      const rightOrder = seriesOrderValue(right.titleSlug, definition.key);
      return compareProblemsByFrequency(left, right) || leftOrder - rightOrder;
    });
    const group = {
      ...definition,
      members,
    };
    groups.push(group);
    for (const member of members) {
      if (!groupsBySlug.has(member.titleSlug)) {
        groupsBySlug.set(member.titleSlug, []);
      }
      groupsBySlug.get(member.titleSlug).push(group);
    }
  }
  groups.sort(compareSeriesByFrequency);
  return { groups, groupsBySlug };
}

function relatedQuestionUrl(slug) {
  return `https://leetcode.cn/problems/${slug}/description/`;
}

function relatedSummary(question, catalogBySlug, currentSlug) {
  const bookProblem = catalogBySlug.get(question.titleSlug);
  const difficulty = bookProblem?.difficulty ?? question.difficulty ?? "";
  return {
    current: question.titleSlug === currentSlug,
    contestProblemIndex: bookProblem?.contestProblemIndex ?? "",
    contestRating: bookProblem?.contestRating ?? null,
    contestRatingSource: bookProblem?.contestRatingSource ?? "",
    contestSlug: bookProblem?.contestSlug ?? "",
    contestTitle: bookProblem?.contestTitle ?? "",
    contestTitleEn: bookProblem?.contestTitleEn ?? "",
    difficulty,
    frontendId: bookProblem?.frontendId ?? "",
    frequencyRank: bookProblem?.frequencyRank ?? null,
    hot100: Boolean(bookProblem?.hot100),
    hotRank: bookProblem?.hotRank ?? null,
    inBook: Boolean(bookProblem),
    paidOnly: Boolean(question.isPaidOnly || bookProblem?.paidOnly),
    seriesKey: question.seriesKey ?? "",
    seriesTitle: question.seriesTitle ?? "",
    sharedTags: question.sharedTags ?? [],
    title: question.title ?? "",
    titleCn:
      bookProblem?.titleCn ??
      question.translatedTitle ??
      question.title ??
      question.titleSlug,
    titleSlug: question.titleSlug,
    topRank: bookProblem?.topRank ?? null,
    url: bookProblem?.url ?? relatedQuestionUrl(question.titleSlug),
  };
}

function bookRelatedQuestion(problem) {
  return {
    difficulty: problem.difficulty,
    isPaidOnly: problem.paidOnly,
    title: problem.titleSlug,
    titleSlug: problem.titleSlug,
    translatedTitle: problem.titleCn,
  };
}

function sharedTags(problem, other) {
  const problemTags = new Map(problem.tags.map((tag) => [tag.slug, tag.name]));
  return other.tags
    .filter((tag) => problemTags.has(tag.slug))
    .map((tag) => ({
      name: problemTags.get(tag.slug) ?? tag.name,
      slug: tag.slug,
    }));
}

function topicPeerScore(problem, candidate, shared) {
  const strongShared = shared.filter((tag) => strongRelatedTagSlugs.has(tag.slug));
  if (shared.length < 2 && strongShared.length === 0) return 0;
  const rank = candidate.topRank ?? candidate.frequencyRank ?? missingFrequencyRank;
  const rankScore = Math.max(0, 2000 - rank);
  return (
    shared.length * 10000 +
    strongShared.length * 6000 +
    (candidate.hot100 ? 3000 : 0) +
    (candidate.bytedance ? 1800 : 0) +
    rankScore
  );
}

function buildTopicPeers(problem, catalogProblems, catalogBySlug, excludedSlugs) {
  return catalogProblems
    .filter(
      (candidate) =>
        candidate.titleSlug !== problem.titleSlug &&
        !excludedSlugs.has(candidate.titleSlug),
    )
    .map((candidate) => {
      const shared = sharedTags(problem, candidate);
      return {
        problem: candidate,
        score: topicPeerScore(problem, candidate, shared),
        shared,
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      return (
        right.score - left.score ||
        (left.problem.topRank ?? left.problem.frequencyRank ?? missingFrequencyRank) -
          (right.problem.topRank ?? right.problem.frequencyRank ?? missingFrequencyRank)
      );
    })
    .slice(0, relatedTopicPeerLimit)
    .map((item) =>
      relatedSummary(
        {
          ...bookRelatedQuestion(item.problem),
          sharedTags: item.shared.slice(0, 3),
        },
        catalogBySlug,
        problem.titleSlug,
      ),
    );
}

const leetcodeSeriesProblemBySlug = new Map(
  leetcodeSeriesProblems.map((problem) => [problem.titleSlug, problem]),
);
const lingShenBySlug = new Map(
  leetcodeLingShenProblems.map((problem) => [problem.titleSlug, problem]),
);
const lingShenGroupByKey = new Map(
  leetcodeLingShenGroups.map((group) => [group.key, group]),
);
const contestRatingBySlug = new Map(Object.entries(leetcodeContestRatings));
const leetcodeSeriesDefinitionByKey = new Map(
  leetcodeSeriesDefinitions.map((definition) => [definition.key, definition]),
);
const leetcodeSeriesKeysBySlug = new Map();
for (const definition of leetcodeSeriesDefinitions) {
  for (const slug of definition.memberSlugs) {
    if (!leetcodeSeriesKeysBySlug.has(slug)) {
      leetcodeSeriesKeysBySlug.set(slug, []);
    }
    leetcodeSeriesKeysBySlug.get(slug).push(definition.key);
  }
}

function seriesKeysFor(slug) {
  return (
    leetcodeSeriesProblemBySlug.get(slug)?.seriesKeys ??
    leetcodeSeriesKeysBySlug.get(slug) ??
    []
  );
}

function seriesTitlesFor(slug) {
  return seriesKeysFor(slug)
    .map((key) => leetcodeSeriesDefinitionByKey.get(key)?.title)
    .filter(Boolean);
}

function lingShenGroupTitlesFor(slug) {
  return (lingShenBySlug.get(slug)?.groupKeys ?? [])
    .map((key) => lingShenGroupByKey.get(key)?.title)
    .filter(Boolean);
}

function contestRatingFields(slug, lingShen) {
  const contest = contestRatingBySlug.get(slug);
  const lingShenRating =
    typeof lingShen?.rating === "number" ? lingShen.rating : null;
  const contestRating = contest?.rating ?? lingShenRating;
  return {
    contestProblemIndex: contest?.problemIndex ?? "",
    contestRating: contestRating ?? null,
    contestRatingSource: contest
      ? "zerotrac"
      : contestRating
        ? "lingshen"
        : "",
    contestSlug: contest?.contestSlug ?? "",
    contestTitle: contest?.contestTitle ?? "",
    contestTitleEn: contest?.contestTitleEn ?? "",
  };
}

const leetcodeProblemsWithByteDance = leetcodeProblems.map((problem) => {
  const entry = byteDanceBySlug.get(problem.titleSlug);
  const lingShen = lingShenBySlug.get(problem.titleSlug);
  const bucketSourceValues = Object.values(entry?.bucketSources || {});
  const hasVerifiedByteDanceBucket = bucketSourceValues.some(
    (source) => source === "companyFavorite" || source === "companyRendered",
  );
  return {
    ...problem,
    bytedance: Boolean(entry || problem.bytedance),
    bytedanceBuckets: mergedByteDanceBuckets(problem),
    bytedanceBucketSources: entry?.bucketSources ?? {},
    bytedanceRank: entry?.bytedanceRank ?? null,
    bytedanceSource: entry?.source ?? (problem.bytedance ? "legacyTop888" : null),
    bytedanceVerified: hasVerifiedByteDanceBucket || problem.bytedanceVerified,
    seriesKeys: seriesKeysFor(problem.titleSlug),
    seriesPrimaryKey:
      leetcodeSeriesProblemBySlug.get(problem.titleSlug)?.seriesPrimaryKey ?? "",
    seriesTitles: seriesTitlesFor(problem.titleSlug),
    lingShen: Boolean(lingShen),
    lingShenGroupKeys: lingShen?.groupKeys ?? [],
    lingShenGroupTitles: lingShenGroupTitlesFor(problem.titleSlug),
    lingShenRank: lingShen?.lingshenRank ?? null,
    lingShenRating: lingShen?.rating ?? null,
    ...contestRatingFields(problem.titleSlug, lingShen),
  };
});
const existingSlugs = new Set(leetcodeProblems.map((problem) => problem.titleSlug));
const leetcodeByteDanceSupplements = leetcodeByteDanceProblems
  .filter((problem) => !existingSlugs.has(problem.titleSlug))
  .map((problem, index) => ({
    topRank: null,
    frequencyRank: leetcodeTargetLimit + index + 1,
    hotRank: null,
    frontendId: problem.frontendId,
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    url: problem.url,
    difficulty: problem.difficulty,
    acRate: problem.acRate,
    frequency: frequencyLabel(problem.frequency),
    bytedance: true,
    bytedanceVerified: problem.source !== "legacyTop888",
    bytedancePeriods: {
      past3Months: null,
      past6Months: null,
      before6Months: null,
    },
    bytedanceBuckets: problem.buckets,
    bytedanceBucketSources: problem.bucketSources ?? {},
    bytedanceRank: problem.bytedanceRank,
    bytedanceSource: problem.source,
    hot100: false,
    paidOnly: problem.paidOnly,
    tags: problem.tags,
    lingShen: Boolean(lingShenBySlug.get(problem.titleSlug)),
    lingShenGroupKeys: lingShenBySlug.get(problem.titleSlug)?.groupKeys ?? [],
    lingShenGroupTitles: lingShenGroupTitlesFor(problem.titleSlug),
    lingShenRank: lingShenBySlug.get(problem.titleSlug)?.lingshenRank ?? null,
    lingShenRating: lingShenBySlug.get(problem.titleSlug)?.rating ?? null,
    ...contestRatingFields(problem.titleSlug, lingShenBySlug.get(problem.titleSlug)),
    statementPreview: problem.statementPreview ?? "",
    approachPreview: problem.approachPreview ?? "",
    followUps: problem.followUps ?? [],
    seriesKeys: seriesKeysFor(problem.titleSlug),
    seriesPrimaryKey:
      leetcodeSeriesProblemBySlug.get(problem.titleSlug)?.seriesPrimaryKey ?? "",
    seriesTitles: seriesTitlesFor(problem.titleSlug),
  }));
const existingWithByteDanceSlugs = new Set([
  ...leetcodeProblems.map((problem) => problem.titleSlug),
  ...leetcodeByteDanceSupplements.map((problem) => problem.titleSlug),
]);
const leetcodeSeriesSupplements = leetcodeSeriesProblems
  .filter((problem) => !existingWithByteDanceSlugs.has(problem.titleSlug))
  .map((problem, index) => ({
    topRank: null,
    frequencyRank:
      leetcodeTargetLimit + leetcodeByteDanceSupplements.length + index + 1,
    hotRank: null,
    frontendId: problem.frontendId,
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    url: problem.url,
    difficulty: problem.difficulty,
    acRate: problem.acRate,
    frequency: "系列补充",
    bytedance: false,
    bytedanceVerified: false,
    bytedancePeriods: {
      past3Months: null,
      past6Months: null,
      before6Months: null,
    },
    bytedanceBuckets: {
      all: null,
      thirtyDays: null,
      threeMonths: null,
      sixMonths: null,
      moreThanSixMonths: null,
    },
    bytedanceBucketSources: {},
    bytedanceRank: null,
    bytedanceSource: null,
    hot100: false,
    paidOnly: problem.paidOnly,
    tags: problem.tags,
    lingShen: Boolean(lingShenBySlug.get(problem.titleSlug)),
    lingShenGroupKeys: lingShenBySlug.get(problem.titleSlug)?.groupKeys ?? [],
    lingShenGroupTitles: lingShenGroupTitlesFor(problem.titleSlug),
    lingShenRank: lingShenBySlug.get(problem.titleSlug)?.lingshenRank ?? null,
    lingShenRating: lingShenBySlug.get(problem.titleSlug)?.rating ?? null,
    ...contestRatingFields(problem.titleSlug, lingShenBySlug.get(problem.titleSlug)),
    statementPreview: problem.statementPreview,
    approachPreview: problem.approachPreview,
    followUps: problem.followUps ?? [],
    seriesKeys: problem.seriesKeys,
    seriesPrimaryKey: problem.seriesPrimaryKey,
    seriesTitles: seriesTitlesFor(problem.titleSlug),
    seriesSupplement: true,
  }));
const existingWithSeriesSlugs = new Set([
  ...existingWithByteDanceSlugs,
  ...leetcodeSeriesSupplements.map((problem) => problem.titleSlug),
]);
const leetcodeLingShenSupplements = leetcodeLingShenProblems
  .filter((problem) => !existingWithSeriesSlugs.has(problem.titleSlug))
  .map((problem, index) => ({
    topRank: null,
    frequencyRank:
      leetcodeTargetLimit +
      leetcodeByteDanceSupplements.length +
      leetcodeSeriesSupplements.length +
      index +
      1,
    hotRank: null,
    frontendId: problem.frontendId,
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    url: problem.url,
    difficulty: problem.difficulty,
    acRate: problem.acRate,
    frequency: "灵神补充",
    bytedance: false,
    bytedanceVerified: false,
    bytedancePeriods: {
      past3Months: null,
      past6Months: null,
      before6Months: null,
    },
    bytedanceBuckets: {
      all: null,
      thirtyDays: null,
      threeMonths: null,
      sixMonths: null,
      moreThanSixMonths: null,
    },
    bytedanceBucketSources: {},
    bytedanceRank: null,
    bytedanceSource: null,
    hot100: false,
    paidOnly: problem.paidOnly,
    tags: problem.tags,
    lingShen: true,
    lingShenGroupKeys: problem.groupKeys,
    lingShenGroupTitles: lingShenGroupTitlesFor(problem.titleSlug),
    lingShenRank: problem.lingshenRank,
    lingShenRating: problem.rating,
    ...contestRatingFields(problem.titleSlug, problem),
    statementPreview: problem.statementPreview,
    approachPreview: problem.approachPreview,
    followUps: problem.followUps ?? [],
    seriesKeys: seriesKeysFor(problem.titleSlug),
    seriesPrimaryKey:
      leetcodeSeriesProblemBySlug.get(problem.titleSlug)?.seriesPrimaryKey ?? "",
    seriesTitles: seriesTitlesFor(problem.titleSlug),
    lingShenSupplement: true,
  }));
const mergedLeetcodeProblems = [
  ...leetcodeProblemsWithByteDance,
  ...leetcodeByteDanceSupplements,
  ...leetcodeSeriesSupplements,
  ...leetcodeLingShenSupplements,
];
const leetcodeProblemCatalogBySlug = new Map(
  mergedLeetcodeProblems.map((problem) => [problem.titleSlug, problem]),
);
const leetcodeSeriesCatalog = buildSeriesCatalog(
  mergedLeetcodeProblems,
  leetcodeSeriesDefinitions,
);
const leetcodeSeriesGroupsBySlug = leetcodeSeriesCatalog.groupsBySlug;
export const leetcodeMergedProblems = mergedLeetcodeProblems;

function buildRelatedQuestions(problem) {
  const seenSeriesSlugs = new Set();
  const series = (leetcodeSeriesGroupsBySlug.get(problem.titleSlug) ?? [])
    .flatMap((group) =>
      group.members.map((item) => ({
        item,
        group,
      })),
    )
    .filter(({ item }) => {
      if (seenSeriesSlugs.has(item.titleSlug)) return false;
      seenSeriesSlugs.add(item.titleSlug);
      return true;
    })
    .map(({ item, group }) =>
      relatedSummary(
        {
          ...bookRelatedQuestion(item),
          seriesKey: group.key,
          seriesTitle: group.title,
        },
        leetcodeProblemCatalogBySlug,
        problem.titleSlug,
      ),
    );
  const seriesSlugs = new Set(series.map((item) => item.titleSlug));
  const official = (leetcodeRelatedQuestions[problem.titleSlug] ?? [])
    .filter((item) => !seriesSlugs.has(item.titleSlug))
    .map((item) =>
      relatedSummary(item, leetcodeProblemCatalogBySlug, problem.titleSlug),
    );
  const excludedSlugs = new Set([
    problem.titleSlug,
    ...seriesSlugs,
    ...official.map((item) => item.titleSlug),
  ]);
  const topicPeers = buildTopicPeers(
    problem,
    mergedLeetcodeProblems,
    leetcodeProblemCatalogBySlug,
    excludedSlugs,
  );
  return {
    official,
    series,
    topicPeers,
    total: official.length + series.length + topicPeers.length,
  };
}

function searchFragment(value, limit = 140) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/[，。；、\s]+$/u, "");
}

function uniqueSearchFragments(values) {
  const seen = new Set();
  const fragments = [];
  values.flat().forEach((value) => {
    const fragment = searchFragment(value);
    const key = fragment.toLowerCase();
    if (!fragment || seen.has(key)) return;
    seen.add(key);
    fragments.push(fragment);
  });
  return fragments;
}

function problemSearchText(problem, implementationReferences, relatedQuestions) {
  return uniqueSearchFragments([
    ...(problem.constraints || []),
    ...(problem.followUps || []).flatMap((item) => [item.question, item.answer]),
    ...(problem.companyFollowUps || []).flatMap((item) => [
      item.question,
      item.answer,
      item.company,
      item.sourceTitle,
    ]),
    problem.contestRating ? `周赛难度分 ${problem.contestRating}` : "",
    problem.contestRating ? `contest rating ${problem.contestRating}` : "",
    problem.contestTitle,
    problem.contestTitleEn,
    problem.contestProblemIndex,
    ...implementationReferences.flatMap((item) => [
      item.language,
      item.provenance,
      item.approachTitle,
      item.complexity,
      item.license,
      item.sourceTitle,
    ]),
    ...(relatedQuestions.series || []).flatMap((item) => [
      item.frontendId,
      item.titleCn,
      item.title,
      item.titleSlug,
    ]),
    ...(relatedQuestions.official || []).flatMap((item) => [
      item.frontendId,
      item.titleCn,
      item.title,
      item.titleSlug,
    ]),
    ...(relatedQuestions.topicPeers || []).flatMap((item) => [
      item.frontendId,
      item.titleCn,
      item.title,
      item.titleSlug,
      ...(item.sharedTags || []).map((tag) => tag.name),
    ]),
  ]).join(" ").toLowerCase();
}

const leetcodeProblemDetailsBySlug = new Map(
  mergedLeetcodeProblems.map((problem) => {
    const implementationReferences = [
      ...(leetcodeImplementationReferences[problem.titleSlug] ?? []),
      ...(leetcodeGeneratedImplementationReferences[problem.titleSlug] ?? []),
    ];
    const relatedQuestions = buildRelatedQuestions(problem);
    return [
      problem.titleSlug,
      {
        approachPreview: problem.approachPreview ?? "",
        codeTemplates: leetcodeCodeTemplates[problem.titleSlug] ?? [],
        companyFollowUps: problem.companyFollowUps ?? [],
        constraintHtml: leetcodeProblemConstraintHtml[problem.titleSlug] ?? [],
        constraints: problem.constraints ?? [],
        detailsLoaded: true,
        followUps: problem.followUps ?? [],
        implementationReferences,
        relatedQuestions,
        statementAssets: leetcodeProblemStatementAssets[problem.titleSlug] ?? [],
        statementHtml: leetcodeProblemStatementHtml[problem.titleSlug] ?? "",
        statementPreview: problem.statementPreview ?? "",
        titleSlug: problem.titleSlug,
      },
    ];
  }),
);

const byteDanceBucketPayloadKeys = [
  "all",
  "thirtyDays",
  "threeMonths",
  "sixMonths",
  "moreThanSixMonths",
];
const codeTemplateLanguagePayloadSlugs = [
  "bash",
  "c",
  "cangjie",
  "cpp",
  "csharp",
  "dart",
  "elixir",
  "erlang",
  "golang",
  "java",
  "javascript",
  "kotlin",
  "mssql",
  "mysql",
  "oraclesql",
  "php",
  "postgresql",
  "python",
  "python3",
  "pythondata",
  "racket",
  "ruby",
  "rust",
  "scala",
  "swift",
  "typescript",
];
const codeTemplateLanguagePayloadIndexBySlug = new Map(
  codeTemplateLanguagePayloadSlugs.map((slug, index) => [slug, index]),
);
const tagPayload = [];
const tagPayloadIndexByKey = new Map();

function tagPayloadKey(tag) {
  return `${tag.slug}\0${tag.name}`;
}

function packedTags(tags) {
  return (tags || []).map((tag) => {
    const key = tagPayloadKey(tag);
    if (!tagPayloadIndexByKey.has(key)) {
      tagPayloadIndexByKey.set(key, tagPayload.length);
      tagPayload.push([tag.slug, tag.name]);
    }
    return tagPayloadIndexByKey.get(key);
  });
}

function packedCodeTemplateLanguageSlugs(codeTemplates) {
  return codeTemplates.reduce((mask, template) => {
    const index = codeTemplateLanguagePayloadIndexBySlug.get(template.langSlug);
    return index === undefined ? mask : mask | (1 << index);
  }, 0);
}

function packedByteDanceBuckets(buckets) {
  return byteDanceBucketPayloadKeys.map((key) => buckets?.[key] ?? null);
}

function packedByteDanceBucketSources(sources) {
  const values = byteDanceBucketPayloadKeys.map((key) => sources?.[key] ?? null);
  return values.some(Boolean) ? values : null;
}

function packedRecordPayload(records) {
  const keys = [...new Set(records.flatMap((record) => Object.keys(record)))];
  return {
    keys,
    tagPayload,
    codeTemplateLanguagePayloadSlugs,
    rows: records.map((record) =>
      keys.map((key) => record[key] === undefined ? null : record[key]),
    ),
  };
}

const leetcodeProblemSummaries = mergedLeetcodeProblems.map((problem) => {
  const implementationReferences = [
    ...(leetcodeImplementationReferences[problem.titleSlug] ?? []),
    ...(leetcodeGeneratedImplementationReferences[problem.titleSlug] ?? []),
  ];
  const relatedQuestions =
    leetcodeProblemDetailsBySlug.get(problem.titleSlug)?.relatedQuestions ??
    buildRelatedQuestions(problem);
  const {
    approachPreview,
    acRate,
    companyFollowUps,
    followUps,
    searchText,
    statementPreview,
    url,
    bytedanceSource,
    bytedancePeriods,
    ...summary
  } = problem;
  const codeTemplates = leetcodeCodeTemplates[problem.titleSlug] ?? [];
  return {
    ...summary,
    bytedanceBuckets: packedByteDanceBuckets(summary.bytedanceBuckets),
    bytedanceBucketSources: packedByteDanceBucketSources(
      summary.bytedanceBucketSources,
    ),
    codeTemplateLanguageSlugs: packedCodeTemplateLanguageSlugs(codeTemplates),
    companyFollowUpCount: (companyFollowUps || []).length,
    implementationReferenceCount: implementationReferences.length,
    relatedQuestionCount: relatedQuestions.total ?? 0,
    tags: packedTags(summary.tags),
  };
});

export const leetcodeProblemDetailSlugs = [...leetcodeProblemDetailsBySlug.keys()];
export const leetcodeProblemSummaryPayload = packedRecordPayload(
  leetcodeProblemSummaries,
);
export const leetcodeProblemSearchIndex = mergedLeetcodeProblems
  .map((problem) => {
    const implementationReferences = [
      ...(leetcodeImplementationReferences[problem.titleSlug] ?? []),
      ...(leetcodeGeneratedImplementationReferences[problem.titleSlug] ?? []),
    ];
    const relatedQuestions =
      leetcodeProblemDetailsBySlug.get(problem.titleSlug)?.relatedQuestions ??
      buildRelatedQuestions(problem);
    return [
      problem.titleSlug,
      problemSearchText(problem, implementationReferences, relatedQuestions),
    ];
  })
  .filter(([, searchText]) => searchText);

export function getLeetcodeProblemDetail(slug) {
  return leetcodeProblemDetailsBySlug.get(slug) ?? null;
}
