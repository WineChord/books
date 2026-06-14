import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const base = "/books/";
const siteOrigin = "https://www.wineandchord.com";
const codexFigureCdn = "https://cdn.jsdelivr.net/gh/WineChord/typora-images/img/";

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
  if (!candidate.endsWith(".html") && existsSync(`${candidate}.html`)) {
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

function readDistText(relativePath) {
  return readFileSync(path.join(distDir, relativePath), "utf8");
}

function readDistJson(relativePath) {
  return JSON.parse(readDistText(relativePath));
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
  existsSync(path.join(distDir, "leetcode", "index.html")),
  "LeetCode book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "leetcode", "spec.html")),
  "LeetCode spec page is missing",
);
const leetcodeDataFiles = [
  "summary.json",
  "search.json",
  "guides.json",
  "guide-ideas.json",
  "lingshen-roadmap.json",
];
for (const fileName of leetcodeDataFiles) {
  assert(
    existsSync(path.join(distDir, "leetcode", "data", fileName)),
    `LeetCode data file is missing: ${fileName}`,
  );
}
const leetcodeSummary = readDistJson(path.join("leetcode", "data", "summary.json"));
assert(
  Array.isArray(leetcodeSummary.keys) && Array.isArray(leetcodeSummary.rows),
  "LeetCode summary data has an invalid packed shape",
);
assert(leetcodeSummary.rows.length > 0, "LeetCode summary data is empty");
const leetcodeGuides = readDistJson(path.join("leetcode", "data", "guides.json"));
assert(
  Array.isArray(leetcodeGuides.series) && leetcodeGuides.series.length > 0,
  "LeetCode guide data is missing series entries",
);
assert(
  Array.isArray(leetcodeGuides.categories) && leetcodeGuides.categories.length > 0,
  "LeetCode guide data is missing category entries",
);
for (const rel of [
  path.join("leetcode", "index.html"),
  path.join("zh", "leetcode", "index.html"),
]) {
  const html = readDistText(rel);
  const dataBase = html.match(/data-problem-detail-base-url="([^"]+)"/)?.[1];
  assert(dataBase, `${rel} is missing LeetCode problem data base URL`);
  for (const fileName of ["summary.json", "guides.json"]) {
    assert(
      targetExists(path.join(distDir, rel), `${dataBase}${fileName}`),
      `${rel} points to a missing LeetCode data file: ${dataBase}${fileName}`,
    );
  }
}
assert(
  existsSync(path.join(distDir, "cc", "index.html")),
  "Claude Code interview book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "cc", "spec.html")),
  "Claude Code interview book spec page is missing",
);
assert(
  existsSync(path.join(distDir, "design", "index.html")),
  "System design interview book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "design", "spec.html")),
  "System design interview book spec page is missing",
);
assert(
  existsSync(path.join(distDir, "zh", "design", "index.html")),
  "Chinese system design interview book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "zh", "design", "spec.html")),
  "Chinese system design interview book spec page is missing",
);
assert(
  existsSync(path.join(distDir, "iq", "index.html")),
  "Classic brain teasers book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "iq", "spec.html")),
  "Classic brain teasers book spec page is missing",
);
assert(
  existsSync(path.join(distDir, "zh", "iq", "index.html")),
  "Chinese classic brain teasers book landing page is missing",
);
assert(
  existsSync(path.join(distDir, "zh", "iq", "spec.html")),
  "Chinese classic brain teasers book spec page is missing",
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
const forbiddenPublicationPattern =
  /book-rewrite-prompt|\/rewrite\/|codex-from-source_rewrite|zh_codex-from-source_rewrite|vitepress/i;
const forbiddenCodexDynamicTokens = [
  "ArchitectureMap",
  "BoundedAgentOSMap",
  "ConstraintEnvelopeBuilder",
  "DurableThreadLedger",
  "ContainmentBoundaryExplorer",
  "JsonRpcContractMap",
  "EventRendererLab",
  "CompatibilityLaneBoard",
  "GeneratedContractDriftViewer",
  "ReleaseArtifactConveyor",
  "PolicyLaneDashboard",
  "StartupBootstrapTimeline",
  "SubmissionFlowExplorer",
  "StreamingProviderLanes",
  "RolloutTraceLab",
  "ToolDispatchMap",
  "ExecutionBackendBoard",
  "PatchWorkbench",
  "ApprovalLadder",
  "McpTrustPlane",
  "ExtensionProvenance",
  "AgentGraphBoard",
  "RemoteTaskContract",
  "MemorySideChannel",
  "ClientReachabilityBoard",
  "PolicyLaneDashboard",
  "InteractiveFigure",
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
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(distDir, file);
  const isCodexFromSource =
    rel.startsWith(`codex-from-source${path.sep}`) ||
    rel.startsWith(path.join("zh", "codex-from-source") + path.sep);

  if (isCodexFromSource) {
    assert(
      !/astro-island|client:load|client:visible/.test(html),
      `${rel} still contains dynamic island markup`,
    );
    for (const token of forbiddenCodexDynamicTokens) {
      assert(
        !html.includes(token),
        `${rel} exposes a forbidden Codex dynamic visual token: ${token}`,
      );
    }
    assert(
      !html.includes("/books/codex-from-source/assets/"),
      `${rel} still publishes local codex-from-source asset paths`,
    );
    if (/<img\b/.test(html)) {
      assert(
        html.includes(codexFigureCdn),
        `${rel} is missing PicGo-hosted Codex figure URLs`,
      );
    }
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
