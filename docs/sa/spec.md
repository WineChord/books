# Suffix Array Primer Spec

This book is a compact interactive page for learning suffix arrays from a
single LeetCode-style array problem.

## Route Contract

The default route is `/books/sa/`, and it renders Chinese content by default.
The English route is `/books/sa/en.html`. The language switch is a normal page
link in the compact LeetCode-style hero row.

The supporting specification page is available at `/books/sa/spec.html`, with
the Chinese version at `/books/zh/sa/spec.html`.

## Page Contract

The page follows the LeetCode book visual system: the same compact system font,
cream background, terracotta primary action, dark-mode-compatible borders, small
tables, and hidden first-viewport cover. The page does not show the global site
header.

The first viewport is a working lesson, not a marketing page. It contains the
short title row, the learning-path counters, an input for a small integer
array, example presets, stage tabs, a doubling-round slider, and four live
panels:

1. original values and compressed ranks;
2. suffix order for the selected doubling round;
3. final suffix order with adjacent LCP values;
4. the shortest-unique-subarray scan.

The visualization accepts 1 to 10 integers. Longer input is trimmed to 10 values
so the tables stay readable on mobile and desktop.

## Algorithm Contract

The lesson explains the provided C++ solution as four parts.

`compress` copies the input, sorts it, removes duplicates, and maps every
original value to its 1-based rank. This preserves equality and order while
giving the suffix-array builder a compact alphabet.

`build1` uses the standard doubling idea. At round `k`, each suffix is sorted
by `(rank[i], rank[i+k])`, where the second rank is `-1` past the array end.
After sorting, equal pairs receive the same new rank. `k` doubles until every
suffix has a unique rank or `k >= n`.

`build2` builds the LCP array with the Kasai scan. `lcp[p]` stores the longest
common prefix of `sa[p]` and `sa[p-1]`. The reused height `h` makes this pass
linear.

`smallestUniqueSubarray` uses the suffix-array neighbor fact. Every subarray
starting at `i` is a prefix of suffix `a[i..]`. In lexicographic order, the
suffix that shares the longest prefix with `a[i..]` must be either the previous
or next suffix. Therefore:

```text
same = max(LCP with previous suffix, LCP with next suffix)
need = same + 1
```

If `need` still fits inside the suffix, it is the shortest unique subarray
length for that starting position. The answer is the minimum such `need`.

## Teaching Contract

The Chinese page assumes an absolute beginner. It explains from first
principles: what a suffix is, why a subarray is a suffix prefix, why coordinate
compression is safe, why doubling compares two halves, and why only adjacent
suffixes matter for uniqueness.

The English page mirrors the same structure and keeps the same examples so the
language switch never changes the learning state conceptually.
