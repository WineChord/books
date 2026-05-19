# Suffix Array Primer Spec

This book is a single-page interactive lesson for suffix arrays themselves. It
does not teach LCP and does not teach the shortest unique subarray problem on
the main page.

## Route Contract

The default route is `/books/sa/`, and it renders Chinese content by default.
The English route is `/books/sa/en.html`.

The supporting specification page is available at `/books/sa/spec.html`, with
the Chinese version at `/books/zh/sa/spec.html`.

The page links to `/books/lcp/` for LCP and to
`/books/sa/unique-subarray.html` for the application problem.

## Teaching Contract

The page assumes a complete beginner and explains:

1. suffix: the segment from one start to the end;
2. suffix array: the sorted list of suffix starts;
3. lexicographic order: compare from the first character and move right only
   on ties;
4. rank/class: the label for prefixes that are indistinguishable at the current
   inspected length;
5. doubling: a length `2k` prefix can be compared as
   `(rank[i], rank[i+k])` once length `k` prefixes have ranks.

The page must repeatedly answer why each step is valid, not just what the next
formula is.

## Interaction Contract

The lesson must provide:

1. editable string input with compact examples;
2. a clickable character tape;
3. a sorted suffix list that stores and highlights starts, not copied suffixes;
4. a construction-round table showing start, suffix, comparison key, and new
   rank;
5. a micro-step rail with previous and next controls;
6. automatic playback with speed presets and custom millisecond interval;
7. stage tabs that jump to the first micro-step for suffixes, order, ranks,
   doubling, and final result;
8. links to the LCP book and application problem without explaining those
   topics inline.

## Acceptance Contract

Before publishing:

1. `npm run build` passes.
2. `npm run check:content` passes.
3. `npm run check:dist` passes.
4. `/books/sa/` opens without console errors.
5. Step rail, playback, speed controls, examples, stage tabs, suffix rows, and
   character tape all change page state.
6. `/books/sa/en.html` opens correctly.
