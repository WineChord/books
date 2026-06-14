import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const cdnPrefix = "https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/";
const bookRoots = ["docs/codex-from-source", "docs/zh/codex-from-source"];
const landingPages = [
  "src/pages/codex-from-source/index.astro",
  "src/pages/zh/codex-from-source/index.astro",
];
const chapterLayout = "src/layouts/ChapterLayout.astro";
const localAssetDir = "docs/public/codex-from-source/assets";
const forbiddenDynamicPatterns = [
  /^import .*src\/components\/visual\//m,
  /client:(?:load|visible|idle|media|only)/,
  /<ArchitectureMap\b/,
  /<InteractiveFigure\b/,
];
const privatePattern =
  /\/Users\/|\/data\/home\/|\/data2\/|wineguo|guoqizhou|file:\/\//;
const obsoletePattern = /book-rewrite-prompt|\/rewrite\/|codex-from-source_rewrite/i;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      return walk(full);
    }
    return [full];
  });
}

function readPngSize(file) {
  const buffer = readFileSync(file);
  const signature = buffer.subarray(0, 8).toString("hex");
  assert(signature === "89504e470d0a1a0a", `${file} is not a PNG file`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function assertNoPrivateOrObsolete(pathname, body) {
  assert(!privatePattern.test(body), `${pathname} contains a private path`);
  assert(!obsoletePattern.test(body), `${pathname} exposes obsolete rewrite material`);
}

function assertNoDynamicVisual(pathname, body) {
  for (const pattern of forbiddenDynamicPatterns) {
    assert(!pattern.test(body), `${pathname} still contains dynamic visual markup`);
  }
}

function imageTags(body) {
  return [...body.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
}

const markdownFiles = bookRoots.flatMap((root) =>
  walk(root).filter((file) => /\.(?:md|mdx)$/.test(file)),
);
const allPublicFigureUrls = new Set();

for (const file of markdownFiles) {
  const body = readFileSync(file, "utf8");
  assertNoPrivateOrObsolete(file, body);
  assertNoDynamicVisual(file, body);
  assert(
    body.includes("Reading Contract") || body.includes("阅读契约"),
    `${file} is missing a reading contract`,
  );

  for (const tag of imageTags(body)) {
    const src = attr(tag, "src");
    const alt = attr(tag, "alt");
    assert(src, `${file} has an image without src`);
    assert(
      src.startsWith(cdnPrefix),
      `${file} image must use PicGo CDN URL, found ${src}`,
    );
    assert(alt && alt.trim().length > 12, `${file} image has weak alt text`);
    allPublicFigureUrls.add(src);
  }

  const figureCount = imageTags(body).length;
  const captionCount = [...body.matchAll(/<figcaption>/g)].length;
  assert(
    captionCount >= figureCount,
    `${file} has fewer figcaptions than images`,
  );
}

for (const file of [...landingPages, chapterLayout]) {
  const body = readFileSync(file, "utf8");
  assertNoPrivateOrObsolete(file, body);
  assertNoDynamicVisual(file, body);
  for (const url of body.matchAll(/https:\/\/cdn\.jsdelivr\.net\/gh\/WineChord\/typora-images\/img\/[^"')\s]+\.png/g)) {
    allPublicFigureUrls.add(url[0]);
  }
  assert(
    !body.includes("codex-from-source/assets/") || body.includes("docs/public/codex-from-source/assets"),
    `${file} should not publish local codex-from-source asset paths`,
  );
}

const localAssets = walk(localAssetDir).filter((file) => file.endsWith(".png"));
assert(localAssets.length >= 34, "codex-from-source should keep local PNG backing assets");

for (const file of localAssets) {
  const { width, height } = readPngSize(file);
  assert(width >= 1672, `${file} width is below publication baseline`);
  assert(height >= 941, `${file} height is below publication baseline`);
  const basename = path.basename(file);
  assert(
    allPublicFigureUrls.has(`${cdnPrefix}${basename}`),
    `${basename} is not referenced through its PicGo URL`,
  );
}

for (const url of allPublicFigureUrls) {
  assert(url.startsWith(cdnPrefix), `unexpected public figure host: ${url}`);
  const basename = url.slice(cdnPrefix.length);
  assert(
    localAssets.some((file) => path.basename(file) === basename),
    `${url} does not have a matching local backing PNG`,
  );
}

console.log(
  `checked ${markdownFiles.length} article sources and ${localAssets.length} PicGo-backed figures`,
);
