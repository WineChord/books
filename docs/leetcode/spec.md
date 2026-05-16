# LeetCode Frequency 500 Spec

This book is a compact practice surface for LeetCode China interview
preparation.

## Data Contract

The ranking starts from the problemset sorted by 出题频率 on May 16, 2026.
The page excludes the pinned daily-question row because it is not part of the
frequency order. Ranks 1-500 are therefore the first 500 real frequency rows.

Hot 100 membership comes from the public Hot 100 study plan. If a Hot 100
problem is outside the top 500, it is appended without a top-500 rank and keeps
its frequency-order position for Hot 100 sorting.

ByteDance comes from each problem detail page's `companyTagStatsV2` data. The
book records the three LeetCode company buckets: past three months, three to
six months, and more than six months ago. The row-level ByteDance signal is
true when any one of those buckets contains `bytedance`.

## Page Contract

Each row shows three identifiers:

1. the top-500 frequency rank;
2. the Hot 100 rank, sorted by frequency rather than by the study-plan order;
3. the original LeetCode frontend problem id inside the clickable title.

Topic tags and supplemental row badges are collapsed by default. They appear
when the title area is hovered or the title link receives keyboard focus, so
the list stays dense while the tags remain nearby.

The page supports 10, 20, 50, 100, and custom page sizes. It defaults to 20
items per page.

Filters include all problems, Hot 100, any ByteDance appearance, ByteDance in
the past three months, ByteDance three to six months ago, ByteDance more than
six months ago, unsolved, needs thought, and not mastered. Text search matches
id, title, tags, and ByteDance.

## Practice State

The site is static, so it cannot store a server-side solve counter. Practice
state is stored in the visitor's browser with local storage:

1. Done marks that the problem has been attempted.
2. Needs thought marks that it should be revisited.
3. Mastered marks that it is currently fluent.

Clicked links use the browser's visited-link behavior and an additional local
visited mark, so links remain visually distinct on later visits in the same
browser profile.

## Preview Contract

The statement preview is a short plain-text excerpt from the Chinese problem
statement. The approach preview is a tag-driven interview checklist: it does
not replace a full solution, but it gives the first idea to test and the
follow-up questions likely to matter in an interview.
