# LeetCode Frequency 888 Spec

This book is a compact practice surface for LeetCode China interview
preparation.

## Data Contract

The ranking starts from the LeetCode China problemset sorted by 出题频率 on
May 16, 2026. The pinned daily-question row is excluded because it is not part
of the frequency order. The source ranking therefore contains the first 888
real frequency rows.

The default problem list is deduplicated. Obvious duplicates are detected by a
normalized Chinese title, such as the LCCI/LCR variant of the same canonical
problem. The row with the higher frequency rank is kept, and the removed row is
recorded in the duplicate audit section so it can be checked manually. The top
rank shown on kept rows remains the original frequency rank, so removed rows
leave intentional gaps.

Hot 100 membership comes from the public Hot 100 study plan. If a Hot 100
problem is outside the top 888, it is appended without a Top 888 rank and keeps
its frequency-order position for Hot 100 sorting.

ByteDance data is stored as LeetCode company buckets: past three months, three
to six months, and more than six months ago. A row is treated as a ByteDance hit
when any one of those buckets contains ByteDance. Rows whose company bucket data
could not be verified are not counted as ByteDance hits.

Previously verified exact frequency percentages are preserved. New rows that
can be ordered by frequency but do not expose an exact percentage in the public
response are labeled with `约` and estimated from neighboring verified
frequency anchors. Those labels are intentionally visible in the data so exact
and estimated percentages are not confused.

Company follow-ups are separate from generated study checks. A company
follow-up is included only when a public LeetCode Discuss interview post
mentions the company, the problem or a close variant, and the follow-up prompt.
Each included follow-up stores a concise answer, the company name, and the
source link. If no public source was found for a problem, the page says so
rather than assigning a company by inference.

## Page Contract

The title and stats area uses a compact workspace layout, and the large cover
is not shown in the first viewport. The problem list is the primary workspace;
on desktop, the first problem rows should be visible without scrolling. The
table is sized to fit the content column without an internal horizontal
scrollbar.

Each row shows three identifiers:

1. the Top 888 frequency rank;
2. the Hot 100 rank, sorted by frequency rather than by the study-plan order;
3. the original LeetCode frontend problem id inside the clickable title.

Topic tags and supplemental row badges are collapsed by default. They appear
when the title area is hovered or the title link receives keyboard focus, so
the list stays dense while the tags remain nearby.

The duplicate audit appears above the table in a collapsed details section. It
lists every removed duplicate, the kept row, and the original frequency ranks.

The page supports 10, 20, 50, 100, and custom page sizes. It defaults to 20
items per page.

Filters are grouped by scope, ByteDance, and practice state. Scope includes all
problems, Hot 100, and sourced company follow-ups. ByteDance includes any
ByteDance appearance, the past three months, three to six months ago, and more
than six months ago. State includes unsolved, needs thought, and not mastered.
Text search matches id, title, tags, ByteDance, study-check answers, company
follow-up answers, companies, and source titles.

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
statement. Prompt-like boilerplate embedded in problem text is removed from the
preview before rendering.

The approach preview has two layers:

1. tag-driven study checks, each with a short answer;
2. sourced company follow-ups, each with a short answer, company, and source.

The sourced company list is intentionally conservative. It is not a claim that
other companies never asked the same follow-up; it only records what could be
verified publicly.
