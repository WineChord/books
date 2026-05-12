import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const distDir = path.join(process.cwd(), "docs", ".vitepress", "dist");
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

  const candidate = path.join(distDir, relativeTarget);
  if (existsSync(candidate)) {
    return true;
  }
  if (existsSync(path.join(candidate, "index.html"))) {
    return true;
  }
  return false;
}

function canonicalExists(rawTarget) {
  if (!rawTarget.startsWith(`${siteOrigin}${base}`)) {
    return false;
  }
  const url = new URL(rawTarget);
  const relativeTarget = url.pathname.slice(base.length);
  const candidate = path.join(distDir, relativeTarget);
  if (existsSync(candidate)) {
    return true;
  }
  return existsSync(path.join(candidate, "index.html"));
}

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const forbiddenPublicationPattern =
  /book-rewrite-prompt|\/rewrite\/|codex-from-source_rewrite|zh_codex-from-source_rewrite/;

for (const file of walk(distDir)) {
  if (!/\.(?:html|js|json|xml|css)$/.test(file)) {
    continue;
  }
  const rel = path.relative(distDir, file);
  const body = readFileSync(file, "utf8");
  assert(
    !forbiddenPublicationPattern.test(body)
      && !forbiddenPublicationPattern.test(rel),
    `${rel} exposes internal rewrite material`,
  );
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(distDir, file);

  if (rel !== "404.html") {
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert(canonical, `${rel} is missing canonical link`);
    assert(canonicalExists(canonical), `${rel} has unreachable canonical: ${canonical}`);
    assert(/property="og:title"/.test(html), `${rel} is missing og:title`);
    assert(/property="og:url"/.test(html), `${rel} is missing og:url`);
    assert(/name="twitter:card"/.test(html), `${rel} is missing twitter card`);
    assert(/name="description"/.test(html), `${rel} is missing description`);
  }

  const attrPattern = /\s(?:href|src)="([^"]+)"/g;
  for (const match of html.matchAll(attrPattern)) {
    const target = match[1];
    assert(targetExists(file, target), `${rel} has a broken target: ${target}`);
  }
}

console.log(`checked ${htmlFiles.length} generated HTML files`);
