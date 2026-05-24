import type { APIRoute } from "astro";
import { leetcodeProblemSearchIndex } from "../../../data/leetcode-detail-data";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(leetcodeProblemSearchIndex), {
    headers: {
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "content-type": "application/json; charset=utf-8",
    },
  });
