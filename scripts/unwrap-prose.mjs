// Unwrap hard-wrapped prose lines in book Markdown/MDX files.
//
// Transformation rules:
//   * Frontmatter blocks (--- ... ---) at the file head are left untouched.
//   * Fenced code blocks (``` ... ```), including ```mermaid blocks, are
//     copied verbatim.
//   * Headings (#), tables (|), blockquotes (>), list items (-, *, +, 1.)
//     and lines starting with whitespace are left as-is. List continuation
//     lines (indented 2+ spaces) are therefore preserved verbatim.
//   * Any consecutive run of "prose" lines bounded by blank lines or a
//     structural line above is joined into a single physical line. JSX/HTML
//     blocks that wrap prose (e.g. <div class="source-equivalence">...</div>)
//     are joined the same way so the inner sentences become one line.
//
// The script walks docs/ recursively and rewrites *.md and *.mdx in place.
// Existing trailing newlines are preserved exactly.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? process.cwd();
const docsDir = join(root, "docs");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return walk(path);
    }
    return [path];
  });
}

const FRONTMATTER_MARK = /^---\s*$/;
const CODE_FENCE = /^```/;
const HEADING = /^#{1,6}\s/;
const TABLE_LINE = /^\|/;
const BLOCKQUOTE = /^>\s?/;
const LIST_ITEM = /^\s*(?:[-*+]\s|\d+\.\s)/;
const INDENTED = /^[ \t]+\S/;
// Lines that look like ASCII art or aligned diagrams; never touch.
const ASCII_ART = /[\u2500-\u259F\u2580-\u259F]|^\s*[+|=`-]{4,}/;

function isStructural(line) {
  if (line.length === 0) return false;
  if (HEADING.test(line)) return true;
  if (TABLE_LINE.test(line)) return true;
  if (BLOCKQUOTE.test(line)) return true;
  if (LIST_ITEM.test(line)) return true;
  if (INDENTED.test(line)) return true;
  if (ASCII_ART.test(line)) return true;
  return false;
}

function unwrapBuffer(buffer) {
  if (buffer.length === 0) return [];
  if (buffer.length === 1) return [buffer[0]];
  // If any line in this paragraph is structural, leave the paragraph alone.
  for (const line of buffer) {
    if (isStructural(line)) return [...buffer];
  }
  const joined = buffer
    .map((line) => line.replace(/\s+$/u, ""))
    .join(" ")
    .replace(/\s+/gu, " ")
    .trim();
  return [joined];
}

function transform(source) {
  const lines = source.split("\n");
  const trailingNewline = source.endsWith("\n");
  const out = [];
  let i = 0;
  let inFrontmatter = false;
  if (lines[0] !== undefined && FRONTMATTER_MARK.test(lines[0])) {
    out.push(lines[0]);
    inFrontmatter = true;
    i = 1;
    while (i < lines.length) {
      out.push(lines[i]);
      if (FRONTMATTER_MARK.test(lines[i])) {
        inFrontmatter = false;
        i += 1;
        break;
      }
      i += 1;
    }
  }

  let buffer = [];
  let inFence = false;
  let fenceMarker = null;

  const flush = () => {
    for (const line of unwrapBuffer(buffer)) {
      out.push(line);
    }
    buffer = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    if (inFence) {
      out.push(line);
      if (line.trim().startsWith(fenceMarker ?? "```")) {
        inFence = false;
        fenceMarker = null;
      }
      i += 1;
      continue;
    }
    if (CODE_FENCE.test(line)) {
      flush();
      out.push(line);
      inFence = true;
      fenceMarker = line.trim().match(/^`+/)?.[0] ?? "```";
      i += 1;
      continue;
    }
    if (line.trim().length === 0) {
      flush();
      out.push(line);
      i += 1;
      continue;
    }
    if (isStructural(line)) {
      flush();
      out.push(line);
      i += 1;
      continue;
    }
    buffer.push(line);
    i += 1;
  }
  flush();

  let result = out.join("\n");
  if (trailingNewline && !result.endsWith("\n")) {
    result += "\n";
  } else if (!trailingNewline && result.endsWith("\n")) {
    result = result.slice(0, -1);
  }
  return result;
}

let touched = 0;
let changed = 0;
for (const file of walk(docsDir)) {
  if (!/\.(?:md|mdx)$/.test(file)) continue;
  touched += 1;
  const original = readFileSync(file, "utf8");
  const next = transform(original);
  if (next !== original) {
    writeFileSync(file, next);
    changed += 1;
    if (process.env.VERBOSE) {
      console.log(`unwrapped ${relative(root, file)}`);
    }
  }
}

console.log(`scanned ${touched} files, rewrote ${changed}`);
