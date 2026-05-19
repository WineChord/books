# Suffix Array Primer Spec

This book is a single-page interactive lesson for learning suffix arrays from
one LeetCode-style array problem. It is not an algorithm glossary and not a
static code annotation. The goal is to move a complete beginner from "what is a
suffix?" to "why does this C++ solution work?".

## Route Contract

The default route is `/books/sa/`, and it renders Chinese content by default.
The English route is `/books/sa/en.html`. The language switch is a normal page
link in the compact LeetCode-style hero row.

The supporting specification page is available at `/books/sa/spec.html`, with
the Chinese version at `/books/zh/sa/spec.html`.

## Visual Contract

The page follows the LeetCode book visual system: the same compact system font,
cream background, terracotta primary action, dark-mode-compatible borders, small
tables, and hidden first-viewport cover. The page does not show the global site
header.

The first viewport must be a working lesson, not a marketing page. On desktop,
the input area, stage switcher, main teaching card, and at least part of the
visual table should be visible together. On mobile, the layout may stack
vertically, but text, buttons, tables, and tokens must not overlap.

## Teaching Contract

The Chinese page assumes a complete beginner. Every core term must be explained
the first time it appears:

1. suffix: the segment from one position to the end of the array;
2. subarray: a contiguous smaller segment;
3. subarray-suffix relationship: every subarray starting at `i` is a prefix of
   suffix `a[i..]`;
4. rank: the label assigned to each suffix after the current sorting round;
   equal ranks mean the currently inspected length still cannot separate them;
5. LCP: the length of the shared prefix between two adjacent suffixes.

The page splits the problem into five steps: concept, compression, doubling,
LCP, and answer scan. Every step must answer:

1. what the reader is looking at;
2. why the step is valid;
3. which function or variable in the provided C++ code it maps to.

The five steps are further decomposed into a micro-step flow. The default
Chinese lesson must expose at least 20 numbered micro-steps so a beginner can
advance one idea at a time. Each micro-step must state the local idea, explain
why it is true, point at a code fragment, and drive the visualization to the
matching stage, start position, and doubling round.

## Interaction Contract

The page must provide a linked workbench, not just a final result render:

1. After entering 1 to 10 integers, the page rebuilds the compressed array,
   suffix array, LCP array, and answer. Longer input is trimmed to 10 values so
   the tables stay readable.
2. Preset examples must cover a unique tail, all-equal input, and alternating
   repetition.
3. Clicking any start position or suffix row synchronizes the highlighted start
   across all panels.
4. The concept stage must show the active suffix and the prefix subarrays it can
   produce.
5. The compression stage must show original values, compressed values, and the
   sorted unique alphabet, while explaining why equality and order are preserved.
6. The doubling stage must include a round slider. The selected round must show
   `(rank[i], rank[i+k])` and explain why identical pairs receive the same new
   rank.
7. The LCP stage must show the active suffix, its neighbors, and which tokens
   form the shared prefix.
8. The answer stage must show `left`, `right`, `same`, `need`, boundary status,
   and the candidate subarray represented by `same + 1`.
9. A small self-check area must change with the stage. Clicking an answer must
   explain the reasoning, not just say right or wrong.
10. The active stage must map back to code, at least to `compress`, `build1`,
    `build2`, or `smallestUniqueSubarray`.
11. A previous/next stepper and a numbered step rail must let the reader move
    through the full lesson one micro-step at a time.
12. Clicking a micro-step must synchronize the stage tab, explanatory text,
    active suffix, round slider, tables, and code focus.
13. The provided C++ solution must use syntax highlighting. The code section
    related to the active micro-step must be visually emphasized.

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

## Acceptance Contract

Before publishing:

1. `npm run build` passes.
2. `npm run check:content` passes.
3. `npm run check:dist` passes.
4. `/books/sa/` opens without console errors.
5. Example buttons, stage buttons, the round slider, suffix rows, and self-check
   answers all change page state.
6. Both the default Chinese page and the English page open correctly, and the
   language switch does not break interaction.
7. Previous/next buttons and the micro-step rail advance through the detailed
   explanation without losing table, suffix, round, or code synchronization.
8. The C++ code block renders highlighted tokens and changes the active code
   section as the micro-step changes.
