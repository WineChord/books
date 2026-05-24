import type { APIRoute, GetStaticPaths } from "astro";
import {
  getLeetcodeProblemDetail,
  leetcodeProblemDetailSlugs,
} from "../../../data/leetcode-detail-data";

export const getStaticPaths: GetStaticPaths = () =>
  leetcodeProblemDetailSlugs.map((slug) => ({
    params: { slug },
  }));

export const GET: APIRoute = ({ params }) => {
  const detail = getLeetcodeProblemDetail(params.slug || "");
  if (!detail) {
    return new Response(JSON.stringify({ error: "Problem detail not found" }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(detail), {
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
      "content-type": "application/json; charset=utf-8",
    },
  });
};
