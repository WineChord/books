# 阅读地图

本书比《Codex 源码剖析》更短更专门。它默认你已经知道 Codex 有 session runtime、tool 执行、TUI 和 app-server。它聚焦于这些系统都依赖的同一个问题：模型究竟看到了什么？为什么是这些？多轮之后 Codex 又如何让答案保持稳定？

## 三条阅读路径

你可以用三种方式阅读本书。选择符合你目标的那一条：

```text
  目标                  按顺序阅读的章节
  ----                  -----------------
  架构概览              1 -> 2 -> 6 -> 7 -> 结语
  实现深入              1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
  模式搜寻              仅按顺序读"应用模式"小节
```

每条路径都坦白自己的取舍：概览跳过大多数实现密度，一小时内读完；深入是唯一通读全部小节的方式；模式搜寻是为另一个 runtime 提取可迁移设计动作的最快方式。

## 给架构读者

读第 1、2、6、7 章和结语。这条路径让你看到核心设计：

- 上下文是一条强制边界，而不是松散 transcript。
- Turn envelope 冻结了允许影响单次模型请求的运行时事实。
- Compaction 是 checkpoint 协议，不是单纯的摘要。
- Replay 与 rollback 围绕证据设计，而不是可变内存。

## 给实现读者

按顺序读完所有章节。这个顺序是刻意的：

1. 第 1 章定义问题与词汇。
2. 第 2 章解释收集运行时事实的 turn envelope。
3. 第 3 章解释作为 prompt 输入的历史账本。
4. 第 4 章解释 typed context fragments 与 diff 注入。
5. 第 5 章解释可选上下文预算。
6. 第 6 章解释 compaction。
7. 第 7 章解释 resume、rollback、fork 与 replay。
8. 第 8 章解释客户端如何在不拥有上下文的前提下观察它。

## 概念归属表

每个概念都只有一个"家"：

| 概念 | 所属章节 |
| --- | --- |
| 上下文作为运行时状态 | 第 1 章 |
| `TurnContext` 形状 | 第 2 章 |
| 历史 normalization 与 token 估计 | 第 3 章 |
| 运行时上下文 diff | 第 4 章 |
| Skills、plugins、memory、outputs、images | 第 5 章 |
| 本地与远程 compaction | 第 6 章 |
| Rollout 重建与截断 | 第 7 章 |
| TUI / app-server / realtime / token usage 面 | 第 8 章 |

## 交叉引用速查

各章复用一小组词汇。下表显示每个术语被哪一章引入、又被哪些章节复用：

| 术语 | 引入章节 | 复用章节 |
| --- | --- | --- |
| Prompt projection | 第 1 章 | 之后每一章 |
| Turn envelope (`TurnContext`) | 第 2 章 | 4, 6, 7, 8 |
| History ledger | 第 3 章 | 4, 5, 6, 7 |
| Reference baseline | 第 3 章 | 4, 6, 7 |
| Typed fragment | 第 4 章 | 5, 8 |
| Settings diff | 第 4 章 | 6, 7 |
| Optional plane | 第 5 章 | 8 |
| Replacement history | 第 6 章 | 7 |
| Rollback marker | 第 7 章 | 8 |

后续章节直接引用先前的概念，不再重新解释。若某节显得简略，请在读完该章后跟随它的 source atlas 链接：本书提供叙事，链接提供可审计性。
