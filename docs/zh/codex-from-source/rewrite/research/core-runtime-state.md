# Research Notes: Core Runtime and State

本页是中文侧 counterpart，用于保持双语站点路径完整。原始 Phase 1 研究笔记
以英文保存：

- [Core runtime and state](/books/codex-from-source/rewrite/research/core-runtime-state)

摘要：这一子系统覆盖 `ThreadManager -> CodexThread -> Codex -> Session ->
Task -> ToolRouter`，并区分 model-visible context、rollout JSONL、SQLite
projection 三种历史。它是全书 runtime 叙事的主轴。
