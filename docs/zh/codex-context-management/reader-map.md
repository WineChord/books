# 阅读地图

这本书比《Codex 源码剖析》更窄。它假设你已经知道 Codex 有 session runtime、工具执行、TUI 和 app-server。本书只追问一个问题：模型到底看见了什么，为什么看见这些，以及 Codex 如何在很多 turn 之后仍然让这个答案稳定。

## 架构读者路径

先读第 1、2、6、7 章和结语。这个路径能抓住核心设计：

- 上下文是运行时边界，不是松散 transcript。
- Turn envelope 冻结一次模型请求允许使用的运行时事实。
- Compaction 是 checkpoint 协议，不只是摘要。
- Replay 和 rollback 基于证据，而不是基于可变内存。

## 实现读者路径

按顺序读完整本书：

1. 第 1 章定义问题和词汇。
2. 第 2 章解释 turn envelope。
3. 第 3 章解释 history ledger。
4. 第 4 章解释 typed fragments 和 settings diff。
5. 第 5 章解释可选上下文预算。
6. 第 6 章解释 compaction。
7. 第 7 章解释 resume、rollback、fork 和 replay。
8. 第 8 章解释客户端如何观察上下文但不拥有上下文。

## 概念归属

| 概念 | 归属章节 |
| --- | --- |
| 上下文作为运行时状态 | 第 1 章 |
| `TurnContext` 的形状 | 第 2 章 |
| 历史归一化与 token 估算 | 第 3 章 |
| 运行时上下文 diff | 第 4 章 |
| Skills、plugins、memory、outputs、images | 第 5 章 |
| 本地和远程压缩 | 第 6 章 |
| Rollout reconstruction 与 truncation | 第 7 章 |
| TUI、app-server、realtime、token usage | 第 8 章 |
