# 结语：上下文纪律

这本书最重要的结论不是 Codex 有一个聪明的 summary prompt，而是严肃的 agent runtime 必须像数据库治理状态一样治理上下文。它需要 owners、lifetimes、checkpoints、diffs、projections 和 replay。

可以迁移的经验是：

- 把 raw evidence 和 model-ready projection 分开。
- 构造 prompt state 之前先 resolve turn envelope。
- 通过 typed fragments 渲染运行时事实。
- 给可选上下文明确定义预算和诊断。
- 把 compaction 当 checkpoint installation。
- 把 rollback 保留为事件，而不是破坏性编辑。
- 让客户端观察上下文，但不要拥有上下文。

Codex 并不完美。有些 diff path 仍未覆盖所有 initial context，估算是粗糙的，legacy compaction 兼容路径也带来复杂度。正因为这些边缘存在，这个设计更值得学：它展示了真实产品如何从 prompt 拼接压力演进到一个必须 resume、branch、compact 并解释自己的 runtime。

如果只带走一个问题，请带走这个：不要问“我应该把什么塞进 prompt？”而要问“哪些运行时状态允许变成模型可见，谁拥有它，它应该活多久，我以后如何重建它？”
