#!/usr/bin/env bash
set -euo pipefail

dist="docs/.vitepress/dist"

test -d "$dist"

if grep -RInE '/Users/|/data/home/|/data2/|wineguo|guoqizhou' "$dist"; then
  echo "Private local path or local username leaked into build output."
  exit 1
fi

if grep -RInE 'href="file:|src="file:' "$dist"; then
  echo "Local file URL leaked into build output."
  exit 1
fi

node scripts/check-dist.mjs
