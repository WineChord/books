import type { APIRoute } from "astro";
import {
  getLeetcodeProblemDetail,
  leetcodeProblemDetailSlugs,
} from "../../../data/leetcode-detail-data";

const ideaTextLimit = 96;

function compactIdeaText(text: string) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function clippedIdeaText(text: string, limit = ideaTextLimit) {
  const compact = compactIdeaText(text);
  if (compact.length <= limit) return compact;
  return `${compact.slice(0, limit).replace(/[，。；、\s]+$/u, "")}…`;
}

function guideIdeaFallback() {
  return "先拆输入规模、状态和边界，再选择可验证的最小策略。";
}

const leetcodeGuideIdeaIndex = leetcodeProblemDetailSlugs.map((slug) => {
  const detail = getLeetcodeProblemDetail(slug);
  return [
    slug,
    clippedIdeaText(
      detail?.approachPreview ||
        detail?.statementPreview ||
        guideIdeaFallback(),
    ),
  ];
});

export const GET: APIRoute = () =>
  new Response(JSON.stringify(leetcodeGuideIdeaIndex), {
    headers: {
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "content-type": "application/json; charset=utf-8",
    },
  });
