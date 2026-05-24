import {
  leetcodeLingShenGroups,
  leetcodeLingShenProblems,
} from "./leetcode-lingshen";

const lingShenDeckMaxProblemCount = 15;
const lingShenProblemBySlug = new Map(
  leetcodeLingShenProblems.map((problem) => [problem.titleSlug, problem]),
);

function ratingRangeForSlugs(slugs: string[]) {
  const ratings = slugs
    .map((slug) => lingShenProblemBySlug.get(slug)?.rating)
    .filter((rating): rating is number => typeof rating === "number");
  if (!ratings.length) {
    return { ratingMax: null, ratingMin: null };
  }
  return {
    ratingMax: Math.max(...ratings),
    ratingMin: Math.min(...ratings),
  };
}

function paidOnlyCount(slugs: string[]) {
  return slugs.filter((slug) => lingShenProblemBySlug.get(slug)?.paidOnly).length;
}

function balancedDeckRanges(total: number, maxSize: number) {
  if (total <= 0) return [];
  const count = Math.max(1, Math.ceil(total / maxSize));
  const base = Math.floor(total / count);
  const remainder = total % count;
  const ranges = [];
  let start = 0;
  for (let index = 0; index < count; index += 1) {
    const size = base + (index < remainder ? 1 : 0);
    const end = start + size;
    ranges.push({ end, index, start });
    start = end;
  }
  return ranges;
}

function buildLingShenRoadmap() {
  const topics = leetcodeLingShenGroups
    .map((group, topicIndex) => {
      const sections = (group.sections || [])
        .map((section, sectionIndex) => {
          const members = section.memberSlugs.filter((slug) =>
            lingShenProblemBySlug.has(slug),
          );
          const decks = balancedDeckRanges(
            members.length,
            lingShenDeckMaxProblemCount,
          ).map(({ end, index, start }) => {
            const deckMembers = members.slice(start, end);
            const deckCount = Math.ceil(
              members.length / lingShenDeckMaxProblemCount,
            );
            const rangeLabel = `${start + 1}-${end}`;
            const ratingRange = ratingRangeForSlugs(deckMembers);
            return {
              count: deckMembers.length,
              id: `lingshen:${group.key}:${section.key}:deck-${index + 1}`,
              index: index + 1,
              members: deckMembers,
              paidOnly: paidOnlyCount(deckMembers),
              shortTitle: deckCount > 1 ? rangeLabel : "本节",
              shortTitleEn: deckCount > 1 ? rangeLabel : "Section",
              title:
                deckCount > 1
                  ? `${section.title} · ${rangeLabel}`
                  : section.title,
              titleEn:
                deckCount > 1
                  ? `${section.titleEn || section.title} · ${rangeLabel}`
                  : (section.titleEn || section.title),
              topicKey: group.key,
              ...ratingRange,
            };
          });
          const ratingRange = ratingRangeForSlugs(members);
          return {
            count: members.length,
            deckCount: decks.length,
            decks,
            id: `lingshen:${group.key}:${section.key}`,
            index: sectionIndex + 1,
            paidOnly: paidOnlyCount(members),
            ratingMax: ratingRange.ratingMax,
            ratingMin: ratingRange.ratingMin,
            title: section.title,
            titleEn: section.titleEn || section.title,
            topicKey: group.key,
          };
        })
        .filter((section) => section.count > 0);
      const members = group.memberSlugs.filter((slug) =>
        lingShenProblemBySlug.has(slug),
      );
      const ratingRange = ratingRangeForSlugs(members);
      return {
        categoryId: `lingshen:${group.key}`,
        count: members.length,
        deckCount: sections.reduce((sum, section) => sum + section.deckCount, 0),
        description: group.description,
        descriptionEn: group.descriptionEn,
        index: topicIndex + 1,
        key: group.key,
        paidOnly: paidOnlyCount(members),
        ratingMax: ratingRange.ratingMax,
        ratingMin: ratingRange.ratingMin,
        sectionCount: sections.length,
        sections,
        title: group.title,
        titleEn: group.titleEn,
      };
    })
    .filter((topic) => topic.count > 0);

  return {
    deckCount: topics.reduce((sum, topic) => sum + topic.deckCount, 0),
    deckSize: lingShenDeckMaxProblemCount,
    sectionCount: topics.reduce((sum, topic) => sum + topic.sectionCount, 0),
    topics,
  };
}

export const leetcodeLingShenRoadmap = buildLingShenRoadmap();
export const leetcodeLingShenRoadmapStats = {
  deckCount: leetcodeLingShenRoadmap.deckCount,
  deckSize: leetcodeLingShenRoadmap.deckSize,
  sectionCount: leetcodeLingShenRoadmap.sectionCount,
  topicCount: leetcodeLingShenRoadmap.topics.length,
} as const;
