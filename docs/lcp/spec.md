# LCP Array Primer Spec

This book is a single-page interactive lesson for the LCP array itself. It
does not teach suffix-array construction in detail and does not teach the
shortest unique subarray problem on the main page.

## Route Contract

The default route is `/books/lcp/`, and it renders Chinese content by default.
The English route is `/books/lcp/en.html`.

The supporting specification page is available at `/books/lcp/spec.html`, with
the Chinese version at `/books/zh/lcp/spec.html`.

The page links back to `/books/sa/` for suffix arrays and to
`/books/sa/unique-subarray.html` for the application problem.

## Teaching Contract

The page assumes a beginner who has either read the suffix-array page or can
follow the linked explanation. It explains:

1. LCP as the length of the shared prefix between two strings;
2. `lcp[p]` as the shared-prefix length of `sa[p]` and `sa[p-1]`;
3. why sorted neighboring suffixes are enough for adjacent LCP;
4. `rank[i]` as the inverse map from original start to sorted position;
5. why Kasai can reuse `h` and decrement it after each start.

Every micro-step must include a direct why-explanation.

## Interaction Contract

The lesson must provide:

1. editable string input with compact examples;
2. a sorted suffix table with LCP values;
3. an aligned two-suffix comparison that highlights the shared prefix;
4. a Kasai trace table showing start, rank, neighbor, old `h`, new `h`, and
   written LCP value;
5. previous and next controls plus a numbered micro-step rail;
6. automatic playback with speed presets and custom millisecond interval;
7. cross-links to the suffix-array book and the application problem.

## Acceptance Contract

Before publishing:

1. `npm run build` passes.
2. `npm run check:content` passes.
3. `npm run check:dist` passes.
4. `/books/lcp/` opens without console errors.
5. Step rail, playback, speed controls, examples, stage tabs, and suffix rows
   all change page state.
6. `/books/lcp/en.html` opens correctly.
