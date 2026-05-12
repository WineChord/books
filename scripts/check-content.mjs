import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
const sourceBlob = `https://github.com/openai/codex/blob/${sourceCommit}/`;
const sourceTree = `https://github.com/openai/codex/tree/${sourceCommit}`;
const privatePattern =
  /\/Users\/|\/data\/home\/|\/data2\/|wineguo|guoqizhou|file:\/\//;

const root = process.cwd();
const docsDir = join(root, "docs");
const enBookDir = join(docsDir, "codex-from-source");
const zhBookDir = join(docsDir, "zh", "codex-from-source");
const bookConfigPath = join(root, "src", "book.config.ts");
const contentConfigPath = join(root, "src", "content.config.ts");
const packagePath = join(root, "package.json");
const packageLockPath = join(root, "package-lock.json");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return walk(path);
    }
    return [path];
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function publicBookFiles(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .filter((name) => name !== "index.md")
    .filter((name) => name !== "book-rewrite-prompt.md")
    .sort();
}

function countApplyItems(body) {
  const heading = body.search(/^## .*(?:Apply This|应用模式|应用到实践).*$/m);
  if (heading === -1) {
    return 0;
  }
  const section = body.slice(heading);
  const nextHeading = section.slice(1).search(/^## /m);
  const applySection =
    nextHeading === -1 ? section : section.slice(0, nextHeading + 1);
  return applySection.match(/^\d+\.\s+/gm)?.length ?? 0;
}

function checkChapterContract(file, body) {
  assert(
    body.includes('<div class="source-equivalence">'),
    `${file} is missing its source-equivalence block`,
  );
  assert(
    countApplyItems(body) === 5,
    `${file} must have exactly five Apply This items`,
  );
}

const enFiles = publicBookFiles(enBookDir);
const zhFiles = publicBookFiles(zhBookDir);

assert(
  JSON.stringify(enFiles) === JSON.stringify(zhFiles),
  `English and Chinese public files differ:\nEN ${enFiles}\nZH ${zhFiles}`,
);

const bookConfig = readFileSync(bookConfigPath, "utf8");
const contentConfig = readFileSync(contentConfigPath, "utf8");
const packageJson = readFileSync(packagePath, "utf8");
const packageLock = readFileSync(packageLockPath, "utf8");

const configuredCommit = bookConfig.match(
  /sourceCommit = "([0-9a-f]{40})"/,
)?.[1];
assert(
  configuredCommit === sourceCommit,
  `book.config.ts sourceCommit (${configuredCommit}) differs from check-content (${sourceCommit})`,
);

assert(
  contentConfig.includes("**/book-rewrite-prompt.md"),
  "content collection must exclude book-rewrite-prompt.md",
);
assert(
  contentConfig.includes("**/rewrite/**"),
  "content collection must exclude rewrite research material",
);
assert(
  !packageJson.includes("vitepress"),
  "package.json must not depend on VitePress after the Astro migration",
);
assert(
  !packageLock.includes("vitepress"),
  "package-lock.json must not lock VitePress after the Astro migration",
);

const configuredPaths = new Set(
  [...bookConfig.matchAll(/\b(?:path|zhPath): "([^"]+)"/g)].map(
    (match) => match[1],
  ),
);

for (const match of bookConfig.matchAll(/\bchapter\((\d+),/g)) {
  const file = String(Number(match[1])).padStart(2, "0");
  configuredPaths.add(`codex-from-source/chapter-${file}`);
  configuredPaths.add(`zh/codex-from-source/chapter-${file}`);
}

for (const match of bookConfig.matchAll(/\b(?:front|reference)\("([^"]+)"/g)) {
  configuredPaths.add(`codex-from-source/${match[1]}`);
  configuredPaths.add(`zh/codex-from-source/${match[1]}`);
}

for (const file of enFiles) {
  const page = file.replace(/\.md$/, "");
  assert(
    configuredPaths.has(`codex-from-source/${page}`),
    `book.config.ts is missing English page metadata for ${page}`,
  );
  assert(
    configuredPaths.has(`zh/codex-from-source/${page}`),
    `book.config.ts is missing Chinese page metadata for ${page}`,
  );
}

const files = walk(docsDir).filter((path) => path.endsWith(".md"));

for (const file of files) {
  const rel = relative(root, file);
  const body = readFileSync(file, "utf8");

  assert(!privatePattern.test(body), `${rel} contains a private local path`);
  assert(
    !/https:\/\/github\.com\/openai\/codex\/(?:blob|tree)\/(?:main|master)\b/.test(body),
    `${rel} contains a branch-based Codex source link`,
  );

  const sourceLinks =
    body.match(/https:\/\/github\.com\/openai\/codex\/(?:blob|tree)\/[^)\s]+/g)
    ?? [];
  for (const link of sourceLinks) {
    if (link.startsWith(sourceBlob) || link.startsWith(sourceTree)) {
      continue;
    }
    throw new Error(`${rel} contains an unpinned Codex source link: ${link}`);
  }

  if (/codex-from-source\/chapter-\d+\.md$/.test(rel)) {
    checkChapterContract(rel, body);
  }
}

console.log(`checked ${files.length} Markdown files`);
