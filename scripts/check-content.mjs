import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
const sourceBlob = `https://github.com/openai/codex/blob/${sourceCommit}/`;
const sourceTree = `https://github.com/openai/codex/tree/${sourceCommit}`;
const privatePattern =
  /\/Users\/|\/data\/home\/|\/data2\/|wineguo|guoqizhou|file:\/\//;

const root = process.cwd();
const docsDir = join(root, "docs");
const bookConfigPath = join(root, "src", "book.config.ts");
const contentConfigPath = join(root, "src", "content.config.ts");
const packagePath = join(root, "package.json");
const packageLockPath = join(root, "package-lock.json");
const publicBooks = [
  {
    slug: "codex-from-source",
    enDir: join(docsDir, "codex-from-source"),
    zhDir: join(docsDir, "zh", "codex-from-source"),
  },
  {
    slug: "codex-context-management",
    enDir: join(docsDir, "codex-context-management"),
    zhDir: join(docsDir, "zh", "codex-context-management"),
  },
];

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
  const files = readdirSync(dir)
    .filter((name) => /\.(?:md|mdx)$/.test(name))
    .filter((name) => name !== "index.md")
    .filter((name) => name !== "index.mdx")
    .filter((name) => name !== "book-rewrite-prompt.md")
    .sort();
  const baseNames = files.map((name) => name.replace(/\.(?:md|mdx)$/, ""));
  assert(
    new Set(baseNames).size === baseNames.length,
    `${dir} contains duplicate Markdown/MDX pages with the same route`,
  );
  return files;
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

const publicFilesByBook = new Map();

for (const book of publicBooks) {
  const enFiles = publicBookFiles(book.enDir);
  const zhFiles = publicBookFiles(book.zhDir);

  assert(
    JSON.stringify(enFiles) === JSON.stringify(zhFiles),
    `English and Chinese public files differ for ${book.slug}:\nEN ${enFiles}\nZH ${zhFiles}`,
  );

  publicFilesByBook.set(book.slug, enFiles);
}

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

for (const line of bookConfig.split("\n")) {
  const bookSlug =
    publicBooks.find((book) => line.includes(`"${book.slug}"`))?.slug ??
    "codex-from-source";
  const chapterMatch = line.match(/\bchapter\((\d+),/);
  if (chapterMatch) {
    const file = String(Number(chapterMatch[1])).padStart(2, "0");
    configuredPaths.add(`${bookSlug}/chapter-${file}`);
    configuredPaths.add(`zh/${bookSlug}/chapter-${file}`);
    continue;
  }

  const helperMatch = line.match(/\b(?:front|reference)\("([^"]+)"/);
  if (helperMatch) {
    configuredPaths.add(`${bookSlug}/${helperMatch[1]}`);
    configuredPaths.add(`zh/${bookSlug}/${helperMatch[1]}`);
  }
}

for (const book of publicBooks) {
  for (const file of publicFilesByBook.get(book.slug)) {
    const page = file.replace(/\.(?:md|mdx)$/, "");
    assert(
      configuredPaths.has(`${book.slug}/${page}`),
      `book.config.ts is missing English page metadata for ${book.slug}/${page}`,
    );
    assert(
      configuredPaths.has(`zh/${book.slug}/${page}`),
      `book.config.ts is missing Chinese page metadata for zh/${book.slug}/${page}`,
    );
  }
}

const files = walk(docsDir).filter((path) => /\.(?:md|mdx)$/.test(path));

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

  if (/(?:codex-from-source|codex-context-management)\/chapter-\d+\.mdx?$/.test(rel)) {
    checkChapterContract(rel, body);
  }
}

console.log(`checked ${files.length} Markdown and MDX files`);
