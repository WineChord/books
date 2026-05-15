import type { Bilingual } from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the "Codex context as runtime" map ASCII shown in the preface.
export const chapterMap: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `  +--------------- Codex context as runtime ---------------+
  |                                                        |
  |  [1] Boundary       [2] TurnContext envelope           |
  |        |                       |                       |
  |        v                       v                       |
  |  [3] History ledger  -->  [4] Typed fragments + diffs  |
  |        |                       |                       |
  |        +-----------+-----------+                       |
  |                    v                                   |
  |             [5] Optional planes                        |
  |                    |                                   |
  |                    v                                   |
  |             [6] Compaction (checkpoint)                |
  |                    |                                   |
  |                    v                                   |
  |             [7] Resume / rollback / fork / replay      |
  |                    |                                   |
  |                    v                                   |
  |             [8] Client surfaces (read-only)            |
  |                                                        |
  +--------------------------------------------------------+`,
    zh: `  +--------------- Codex 上下文 as runtime ---------------+
  |                                                        |
  |  [1] 边界           [2] TurnContext 信封               |
  |        |                       |                       |
  |        v                       v                       |
  |  [3] 历史账本    -->   [4] Typed fragments + diffs      |
  |        |                       |                       |
  |        +-----------+-----------+                       |
  |                    v                                   |
  |             [5] 可选平面                               |
  |                    |                                   |
  |                    v                                   |
  |             [6] Compaction (checkpoint)                |
  |                    |                                   |
  |                    v                                   |
  |             [7] Resume / rollback / fork / replay      |
  |                    |                                   |
  |                    v                                   |
  |             [8] 客户端面 (只读)                        |
  |                                                        |
  +--------------------------------------------------------+`,
  },
  legend: {
    en: "Each box becomes a chapter, in order; follow the arrows to read the subsystem top-down.",
    zh: "每个方框对应一章，按箭头方向自上而下阅读整套子系统。",
  },
  highlights: [
    { match: "[1]", tone: "accent" },
    { match: "[2]", tone: "accent" },
    { match: "[3]", tone: "info" },
    { match: "[4]", tone: "info" },
    { match: "[5]", tone: "warning" },
    { match: "[6]", tone: "warning" },
    { match: "[7]", tone: "success" },
    { match: "[8]", tone: "muted" },
  ],
};
