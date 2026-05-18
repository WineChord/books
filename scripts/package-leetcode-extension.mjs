import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const extensionDir = join(process.cwd(), "extensions", "leetcode-submit");
const manifestPath = join(extensionDir, "manifest.json");
const outputDir = join(process.cwd(), "dist", "extensions");
const packageBaseName = "leetcode-submit";
const packageFiles = [
  "manifest.json",
  "background.js",
  "content-books.js",
  "README.md",
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readManifest() {
  assert(existsSync(manifestPath), `${manifestPath} does not exist`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  assert(
    /^\d+\.\d+\.\d+$/.test(manifest.version || ""),
    "extensions/leetcode-submit/manifest.json must contain a semver version",
  );
  return manifest;
}

function assertPackageInputs() {
  for (const file of packageFiles) {
    assert(
      existsSync(join(extensionDir, file)),
      `extensions/leetcode-submit/${file} does not exist`,
    );
  }
}

function zipExtension(outputPath) {
  rmSync(outputPath, { force: true });
  execFileSync("zip", ["-Xqr", outputPath, ...packageFiles], {
    cwd: extensionDir,
    stdio: "inherit",
  });
}

const manifest = readManifest();
assertPackageInputs();
mkdirSync(outputDir, { recursive: true });

const versionedZip = join(outputDir, `${packageBaseName}-${manifest.version}.zip`);
const latestZip = join(outputDir, `${packageBaseName}.zip`);

zipExtension(versionedZip);
copyFileSync(versionedZip, latestZip);

console.log(`Wrote ${versionedZip}`);
console.log(`Wrote ${latestZip}`);
