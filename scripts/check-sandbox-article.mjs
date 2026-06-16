import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagePath = path.join(root, "docs/public/sandbox/index.html");
const html = fs.readFileSync(pagePath, "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(html.includes('<html lang="zh-CN">'), "page language must be zh-CN");
assert(
  html.includes('<link rel="canonical" href="https://www.wineandchord.com/books/sandbox/">'),
  "canonical URL must point to /books/sandbox/"
);
assert(html.includes('property="og:image"'), "missing og:image");
assert(html.includes("https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/sandbox-cover-20260616.png"), "og:image must use uploaded cover PNG");
assert(html.includes("https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/sandbox-ranking-lenses-20260616-v2.webp"), "ranking figure must use the non-ranking v2 lens graphic");

const forbidden = [
  /\/Users\//,
  /~\/projects\//,
  /file:\/\//,
  /AGENTS\.md/,
  /SKILL\.md/,
  /TODO|FIXME|TBD/,
  /Generated images are saved/i,
  /imagegen prompt/i,
];

for (const pattern of forbidden) {
  assert(!pattern.test(html), `forbidden public artifact text matched: ${pattern}`);
}

const imageMatches = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)];
assert(imageMatches.length >= 8, `expected at least 8 figures, found ${imageMatches.length}`);

for (const match of imageMatches) {
  const tag = match[0];
  const src = match[1];
  assert(src.startsWith("https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/"), `image must use PicGo CDN URL: ${src}`);
  assert(/\balt="[^"]{12,}"/.test(tag), `image missing meaningful alt text: ${src}`);
  assert(/\bwidth="2400"/.test(tag) || src.endsWith(".png"), `figure should declare width: ${src}`);
  assert(/\bheight="1350"/.test(tag) || src.endsWith(".png"), `figure should declare height: ${src}`);
}

const requiredUrls = [
  "https://github.com/openai/codex/blob/d959664420a5f39641eba661c240c35e3739607c/",
  "https://github.com/anthropics/claude-code/blob/64ceb97caab3fb898ece9a1b61e337470f805550/",
  "https://github.com/openclaw/openclaw/blob/9b6bed7a75a7c3d6c59095082aabc8bdb192aad9/",
  "https://github.com/NousResearch/hermes-agent/blob/55cb4103beba5822303c06b662635e1491ae72f5/",
  "https://github.com/e2b-dev/E2B/blob/8c084cbd7ca5fb72817169dac52d3db92182ead2/",
  "https://github.com/opensandbox-group/OpenSandbox/blob/67cdad61cdbfdc1ccecb8f57f3127b82d1ac3ca2/",
  "https://github.com/TencentCloud/CubeSandbox/blob/4004a6ec34a9d045a9789a1fd438d6518eedb3d3/",
  "https://github.com/containers/bubblewrap/blob/2f55bae38468d0c50cf5df87b1e481e882b63acb/",
  "https://github.com/google/gvisor/blob/de17338bc14f1d457dba7e22e8c7c3e39231e119/",
  "https://github.com/firecracker-microvm/firecracker/blob/dc92199f1c7c2dcdffde9c4694bdc60954332855/",
];

for (const url of requiredUrls) {
  assert(html.includes(url), `missing pinned source URL prefix: ${url}`);
}

assert(html.includes("stars 只是采用度代理") || html.includes("stars 是 2026-06-16"), "ranking caveat must separate stars from security");
assert(html.includes("Claude Code 的公开仓库没有完整运行时源码"), "Claude evidence boundary must be explicit");
assert(html.includes("var(--font-book)"), "page must use book font variable");
assert(html.includes('--font-book: "PingFang SC", "PingFang TC", "PingFang HK"'), "font stack must be PingFang-first");
assert(html.includes("var(--font-code)"), "page must use code font variable");
assert(html.includes("katex"), "quantitative content should be rendered with KaTeX");

if (failures.length > 0) {
  console.error("Sandbox article checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sandbox article checks passed: ${imageMatches.length} remote figures verified.`);
