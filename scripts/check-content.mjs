import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const sourceCommit = "569ff6a1c400bd514ff79f5f1050a684dc3afde3";
const sourceBlob = `https://github.com/openai/codex/blob/${sourceCommit}/`;
const sourceTree = `https://github.com/openai/codex/tree/${sourceCommit}`;
const privatePattern =
  /\/Users\/|\/data\/home\/|\/data2\/|wineguo|guoqizhou|file:\/\//;

const root = process.cwd();
const docsDir = join(root, "docs");
const publicDir = join(docsDir, "public");
const enBookDir = join(docsDir, "codex-from-source");
const zhBookDir = join(docsDir, "zh", "codex-from-source");
const bookConfigPath = join(root, "src", "book.config.ts");
const contentConfigPath = join(root, "src", "content.config.ts");
const packagePath = join(root, "package.json");
const packageLockPath = join(root, "package-lock.json");
const sketchIntroFingerprints = new Map();

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

function checkSketchFigureContract(file, body) {
  assert(
    !/^```mermaid\b/m.test(body),
    `${file} must use Excalidraw-style figures instead of Mermaid blocks`,
  );

  const figures = [...body.matchAll(/class(?:Name)?="sketch-figure"/g)];
  assert(
    figures.length >= 4,
    `${file} must contain at least four Excalidraw-style sketch figures`,
  );

  const imageSources = [
    ...body.matchAll(
      /<img[^>]+src="(\/books\/figures\/codex-from-source\/excalidraw\/[^"]+\.svg)"/g,
    ),
  ].map((match) => match[1]);
  assert(
    imageSources.length >= figures.length,
    `${file} must back each sketch figure with a generated SVG image`,
  );
  for (const src of imageSources) {
    const publicPath = join(publicDir, src.replace(/^\/books\//, ""));
    assert(existsSync(publicPath), `${file} references a missing sketch ${src}`);
  }

  assert(
    !/main path runs through|dashed regions show|主线从|虚线边界|Before the implementation details/.test(
      body,
    ),
    `${file} contains a generic sketch intro or caption`,
  );
  assert(
    !/is about the handoff|puts entry, boundary|puts .* on one board|first places where the implementation starts making trade-offs|will keep reappearing|not a summary slide|local design problem|what downstream code can rely on|who starts, who constrains|This sketch handles the visual boundary|This figure makes .* concrete|separating four concerns|Start with the .* sketch|gives the section a concrete runtime path|shortest route through this part of the system|makes the split in responsibilities visible|That is the transferable pattern|Use it to check|读法压到一屏|下面的论证依赖|放到同一个视野|第一组坐标|一起看才成立|读正文前先固定|标出本节真正的切分点|读者可以用它检查|白板图先处理空间关系|这张图把.*拆成四个读法|它让后面的取舍/.test(
      body,
    ),
    `${file} contains a repeated generated sketch phrase`,
  );

  const introMatches = [
    ...body.matchAll(/<p class(?:Name)?="sketch-intro">([\s\S]*?)<\/p>/g),
  ];
  for (const match of introMatches) {
    const intro = match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    assert(intro.length > 24, `${file} contains a weak sketch intro`);

    const fingerprint = intro
      .toLowerCase()
      .replace(/[`*_]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const previous = sketchIntroFingerprints.get(fingerprint);
    assert(
      !previous || previous === file,
      `${file} repeats a sketch-intro structure already used by ${previous}: ${intro}`,
    );
    sketchIntroFingerprints.set(fingerprint, file);
  }
}

function checkSketchSvgQuality(file, body) {
  assert(!body.includes("..."), `${file} contains ellipsis truncation`);
  assert(!/source map above/.test(body), `${file} contains a stale source-map reference`);
  if (file.endsWith("-zh.svg")) {
    assert(
      !/Unknown|Probing|Ready|Starting|Restarting|Failed|Proposed change|Generated artifact|Architecture boundary|scrollbac|Backend Contrac|Developer changes a crate|Workspace-root launcher|Cargo-like paths/.test(
        body,
      ),
      `${file} contains an unlocalized placeholder or stale review issue`,
    );
    assert(
      !/服务端\s+(?:to|To)\s+客户端|Socket、retri|权限权限配置|ace、seccomp|客户端应如何看见 it|路由 by|转换 to|Use 原生|读 only|设计 the 导入|内容 hash 已 已导入|bounded operating environment：typed/.test(
        body,
      ),
      `${file} contains a known mixed-language sketch label issue`,
    );
  }

  const textNodes = [...body.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(
    (match) => match[1].replace(/&amp;/g, "&").trim(),
  );
  for (const text of textNodes) {
    assert(
      !/\b(?:or|and|with|the|a|of|to)\s*$/i.test(text),
      `${file} has a sketch label ending with a dangling English connector: ${text}`,
    );
    assert(
      !/,\s*$/.test(text),
      `${file} has a sketch label ending with an ASCII comma: ${text}`,
    );
    assert(
      !/(?:transport:|transport\s*\/|trace\s*\/|rollout\s*\/|Agent\s*\/|incompatibl$)/i.test(
        text,
      ),
      `${file} has a truncated or weak sketch label: ${text}`,
    );
  }

  if (file.endsWith("-zh.svg")) {
    assert(
      !/\b(?:warning\s*,?\s*or|approval request when needed|executable decision|fetch details or selected|unified diff plus metadata|reject incompatible diff shape|preflight diff against current)\b/i.test(
        body,
      ),
      `${file} contains unlocalized English review phrases`,
    );
  }
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
  const page = file.replace(/\.(?:md|mdx)$/, "");
  assert(
    configuredPaths.has(`codex-from-source/${page}`),
    `book.config.ts is missing English page metadata for ${page}`,
  );
  assert(
    configuredPaths.has(`zh/codex-from-source/${page}`),
    `book.config.ts is missing Chinese page metadata for ${page}`,
  );
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

  if (/codex-from-source\/chapter-\d+\.mdx?$/.test(rel)) {
    checkChapterContract(rel, body);
  }
  if (/codex-from-source\/(?:chapter-\d+|epilogue)\.mdx?$/.test(rel)) {
    checkSketchFigureContract(rel, body);
  }
}

const sketchDir = join(
  publicDir,
  "figures",
  "codex-from-source",
  "excalidraw",
);
const sketchFiles = existsSync(sketchDir)
  ? walk(sketchDir).filter((path) => path.endsWith(".svg"))
  : [];
assert(sketchFiles.length >= 150, "expected generated sketch SVG assets");
for (const file of sketchFiles) {
  checkSketchSvgQuality(relative(root, file), readFileSync(file, "utf8"));
}

console.log(`checked ${files.length} Markdown and MDX files`);
