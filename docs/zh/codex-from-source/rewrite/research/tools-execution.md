# Research Notes: Tool Execution and Mutation Paths

本页是中文侧 counterpart，用于保持双语站点路径完整。原始 Phase 1 研究笔记
以英文保存：

- [Tool execution and mutation paths](/books/codex-from-source/rewrite/research/tools-execution)

摘要：这一子系统覆盖 tool spec、shell parsing、execpolicy、hooks、approval、
sandbox selection、exec-server、filesystem backend 和 `apply_patch`。它说明工具
执行是分层 capability pipeline，不是直接函数调用。
