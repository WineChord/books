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

const enFiles = readdirSync(enBookDir)
  .filter((name) => name.endsWith(".md"))
  .sort();
const zhFiles = readdirSync(zhBookDir)
  .filter((name) => name.endsWith(".md"))
  .sort();

assert(
  JSON.stringify(enFiles) === JSON.stringify(zhFiles),
  `English and Chinese chapter files differ:\nEN ${enFiles}\nZH ${zhFiles}`,
);

const files = walk(docsDir).filter((path) => path.endsWith(".md"));

for (const file of files) {
  const rel = relative(root, file);
  const body = readFileSync(file, "utf8");

  assert(!privatePattern.test(body), `${rel} contains a private local path`);

  const sourceLinks = body.match(/https:\/\/github\.com\/openai\/codex\/(?:blob|tree)\/[^)\s]+/g) ?? [];
  for (const link of sourceLinks) {
    if (link.startsWith(sourceBlob) || link.startsWith(sourceTree)) {
      continue;
    }
    throw new Error(`${rel} contains an unpinned Codex source link: ${link}`);
  }
}

console.log(`checked ${files.length} Markdown files`);
