import type { APIRoute } from "astro";
import { leetcodeLingShenRoadmap } from "../../../data/leetcode-lingshen-roadmap";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(leetcodeLingShenRoadmap), {
    headers: {
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
      "content-type": "application/json; charset=utf-8",
    },
  });
