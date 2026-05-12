import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import {
  chapterVisualSpecs,
  sourceSnapshot,
  visualSpecStatus,
} from "../src/visual/visual-specs.mjs";

const distDir = path.join(process.cwd(), "dist");
const base = "/books/";
const siteOrigin = "https://www.wineandchord.com";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      return walk(full);
    }
    return [full];
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function fileOrIndexExists(candidate) {
  if (existsSync(candidate)) {
    return true;
  }
  return existsSync(path.join(candidate, "index.html"));
}

function targetExists(fromFile, rawTarget) {
  if (
    rawTarget.startsWith("http://")
    || rawTarget.startsWith("https://")
    || rawTarget.startsWith("mailto:")
    || rawTarget.startsWith("tel:")
    || rawTarget.startsWith("data:")
    || rawTarget.startsWith("#")
  ) {
    return true;
  }

  const withoutHash = rawTarget.split("#")[0].split("?")[0];
  if (!withoutHash) {
    return true;
  }

  let relativeTarget;
  if (withoutHash.startsWith(base)) {
    relativeTarget = withoutHash.slice(base.length);
  } else if (withoutHash.startsWith("/")) {
    return false;
  } else {
    const fromRel = path.relative(distDir, path.dirname(fromFile));
    relativeTarget = path.posix.normalize(
      path.posix.join(fromRel.split(path.sep).join("/"), withoutHash),
    );
  }

  return fileOrIndexExists(path.join(distDir, relativeTarget));
}

function canonicalExists(rawTarget) {
  if (!rawTarget.startsWith(`${siteOrigin}${base}`)) {
    return false;
  }
  const url = new URL(rawTarget);
  const relativeTarget = url.pathname.slice(base.length);
  return fileOrIndexExists(path.join(distDir, relativeTarget));
}

assert(existsSync(distDir), "dist directory is missing");
assert(existsSync(path.join(distDir, "_astro")), "Astro asset directory is missing");
assert(
  !readdirSync(distDir).some((name) => /^manifest_.*\.mjs$/.test(name)),
  "dist contains an Astro preview/server manifest; rebuild without preview",
);
assert(
  existsSync(path.join(distDir, "sitemap-index.xml")),
  "sitemap index is missing",
);
assert(
  existsSync(path.join(distDir, "codex-from-source", "index.html")),
  "English book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "codex-from-source", "chapter-01.html")),
  "English chapter HTML compatibility path is missing",
);
assert(
  existsSync(path.join(distDir, "zh", "codex-from-source", "chapter-01.html")),
  "Chinese chapter HTML compatibility path is missing",
);

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const chapterOneHtml = new Set([
  path.join("codex-from-source", "chapter-01.html"),
  path.join("zh", "codex-from-source", "chapter-01.html"),
]);
const forbiddenPublicationPattern =
  /book-rewrite-prompt|\/rewrite\/|codex-from-source_rewrite|zh_codex-from-source_rewrite|vitepress/i;
const forbiddenPublicationTokens = [
  "chapterVisualSpecs",
  "visualSpecStatus",
  "sourceSnapshot",
  "sourceEvidenceRefs",
  visualSpecStatus.scope,
  visualSpecStatus.approvalTarget,
  ...chapterVisualSpecs.map((spec) => spec.id),
  ...chapterVisualSpecs
    .map((spec) => spec.primaryInteractive.component)
    .filter((component) => component !== "BoundedAgentOSMap"),
];

for (const file of walk(distDir)) {
  if (!/\.(?:html|js|json|xml|css)$/.test(file)) {
    continue;
  }
  const rel = path.relative(distDir, file);
  const body = readFileSync(file, "utf8");
  assert(
    !forbiddenPublicationPattern.test(body)
      && !forbiddenPublicationPattern.test(rel),
    `${rel} exposes internal or obsolete publication material`,
  );
  for (const token of forbiddenPublicationTokens) {
    assert(
      !body.includes(token) && !rel.includes(token),
      `${rel} exposes internal visual spec token: ${token}`,
    );
  }
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(distDir, file);
  const isChapterOne = chapterOneHtml.has(rel);
  const hasChapterOneIsland = html.includes("BoundedAgentOSMap");
  const hasRenderedMermaid =
    /class="mermaid\b/.test(html) || /language-mermaid/.test(html);

  if (isChapterOne) {
    assert(hasChapterOneIsland, `${rel} is missing the Chapter 1 island`);
    assert(!hasRenderedMermaid, `${rel} still renders Chapter 1 Mermaid`);
  } else {
    assert(
      !hasChapterOneIsland,
      `${rel} unexpectedly loads the Chapter 1 island`,
    );
  }

  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `${rel} is missing canonical link`);
  assert(canonicalExists(canonical), `${rel} has unreachable canonical: ${canonical}`);
  assert(/property="og:title"/.test(html), `${rel} is missing og:title`);
  assert(/property="og:url"/.test(html), `${rel} is missing og:url`);
  assert(/name="twitter:card"/.test(html), `${rel} is missing twitter card`);
  assert(/name="description"/.test(html), `${rel} is missing description`);

  const attrPattern = /\s(?:href|src)="([^"]+)"/g;
  for (const match of html.matchAll(attrPattern)) {
    const target = match[1];
    assert(targetExists(file, target), `${rel} has a broken target: ${target}`);
  }
}

const sitemapFiles = walk(distDir).filter((file) => /sitemap.*\.xml$/.test(file));
for (const file of sitemapFiles) {
  const xml = readFileSync(file, "utf8");
  const rel = path.relative(distDir, file);
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const target = match[1];
    assert(canonicalExists(target), `${rel} has unreachable sitemap loc: ${target}`);
  }
}

console.log(`checked ${htmlFiles.length} generated HTML files`);
