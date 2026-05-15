import type { Bilingual } from "../../../components/visual/diagrams/types";
import type { AsciiHighlight } from "../../../components/visual/diagrams/DiagramAscii";

// Replaces the "three reading paths" ASCII listing.
export const threeReadingPaths: {
  ascii: Bilingual;
  legend?: Bilingual;
  highlights?: AsciiHighlight[];
} = {
  ascii: {
    en: `  goal                          chapters in order
  ----                          -----------------
  architectural overview        1 -> 2 -> 6 -> 7 -> Epilogue
  implementation deep dive      1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
  pattern hunting               Apply This sections only, in order`,
    zh: `  目标                  按顺序阅读的章节
  ----                  -----------------
  架构概览              1 -> 2 -> 6 -> 7 -> 结语
  实现深入              1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
  模式搜寻              仅按顺序读"应用模式"小节`,
  },
  legend: {
    en: "Three honest paths: overview finishes in under an hour, deep dive reads every section, pattern hunting extracts transferable moves.",
    zh: "三条坦诚的路径：概览不到一小时读完，深入通读全部小节，模式搜寻提取可迁移的设计动作。",
  },
  highlights: [
    { match: "architectural overview", tone: "accent" },
    { match: "implementation deep dive", tone: "info" },
    { match: "pattern hunting", tone: "success" },
    { match: "架构概览", tone: "accent" },
    { match: "实现深入", tone: "info" },
    { match: "模式搜寻", tone: "success" },
  ],
};
