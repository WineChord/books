import type { Bilingual } from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the whole-book "cheat sheet" ASCII diagram in the epilogue.
export const cheatSheet: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `                +------------------------------+
                |        TurnContext           |   <- ch.2 envelope
                +------+----------+------------+
                       |          |
                       v          v
   +--------------+  fragments  +-----------+
   | History      |<-- diffs --->| Optional |   <- ch.3, ch.4, ch.5
   | ledger       |             | planes    |
   +------+-------+             +-----+-----+
          |                           |
          +------------+--------------+
                       v
              +-----------------+
              | Prompt projection|              <- ch.1 boundary
              +--------+--------+
                       |
                       v
                  Model request
                       |
                       v
              +-----------------+
              | New items + log |
              +--------+--------+
                       |
        +--------------+--------------+
        v                             v
  +-----------+                +--------------+
  | Compaction|                | Rollout      |   <- ch.6, ch.7
  | checkpoint|                | reconstruction|
  +-----------+                +------+-------+
                                      |
                                      v
                               +--------------+
                               | Client view  |   <- ch.8
                               +--------------+`,
    zh: `                +------------------------------+
                |        TurnContext           |   <- 第 2 章 envelope
                +------+----------+------------+
                       |          |
                       v          v
   +--------------+  fragments  +-----------+
   | History      |<-- diffs --->| Optional |    <- 第 3, 4, 5 章
   | ledger       |             | planes    |
   +------+-------+             +-----+-----+
          |                           |
          +------------+--------------+
                       v
              +-----------------+
              | Prompt projection|              <- 第 1 章 边界
              +--------+--------+
                       |
                       v
                  Model request
                       |
                       v
              +-----------------+
              | New items + log |
              +--------+--------+
                       |
        +--------------+--------------+
        v                             v
  +-----------+                +--------------+
  | Compaction|                | Rollout      |   <- 第 6, 7 章
  | checkpoint|                | reconstruction|
  +-----------+                +------+-------+
                                      |
                                      v
                               +--------------+
                               | 客户端 view  |   <- 第 8 章
                               +--------------+`,
  },
  legend: {
    en: "Read top-to-bottom for a forward turn; bottom-to-top for resume, rollback, replay — both directions touch every owner.",
    zh: "正向 turn 自上而下读；resume、rollback、replay 自下而上读——两种方向都经过每一个 owner。",
  },
  highlights: [
    { match: "TurnContext", tone: "accent" },
    { match: "Prompt projection", tone: "success" },
    { match: "Compaction", tone: "warning" },
    { match: "Rollout", tone: "warning" },
    { match: "Client view", tone: "info" },
    { match: "客户端 view", tone: "info" },
  ],
};
