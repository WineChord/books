import type { APIRoute } from "astro";
import { leetcodeProblemGuidePayload } from "../../../data/leetcode-guide-data";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(leetcodeProblemGuidePayload), {
    headers: {
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "content-type": "application/json; charset=utf-8",
    },
  });
