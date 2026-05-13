# 第 19 章：外部迁移与向后兼容

第 18 章把扩展平面拆成 Skills、Plugins、Connectors 和类型化扩展。本章追问：当用户带着并非诞生于这些平面的既有 Agent 配置与历史进入 Codex 时，系统应该怎么办？迁移是桥，兼容性是纪律，防止这座桥变成一堆不可维护的特判。

<div class="chapter-lede">
  <p><strong>你在这里：</strong>Codex 已能在明确信任边界下加载原生扩展表面。</p>
  <p><strong>问题：</strong>用户会带来外部配置、命令、Hook、子 Agent、MCP 服务和 JSONL 会话，但它们的语义不完全匹配 Codex。</p>
  <p><strong>心智模型：</strong>迁移是保守地翻译成原生产物并附带元数据，而不是模拟另一个 Agent 运行时。</p>
</div>

Agent 系统的向后兼容不只是接受旧 API 字段。它还意味着接纳用户已有历史、工作习惯和本地自动化，同时不能让模糊行为变成隐藏权限。Codex 把迁移当作受控导入路径：读取来源产物，识别受支持结构，翻译成 Codex 原生形状，跳过不安全或动态案例，并记录足够元数据以避免重复导入。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-19-01-zh.svg" alt="迁移只把可识别的外部产物翻译成原生形状，保留已有目标，并记录来源信息，避免兼容性变成运行时模拟。" loading="lazy" />
  <figcaption>迁移只把可识别的外部产物翻译成原生形状，保留已有目标，并记录来源信息，避免兼容性变成运行时模拟。</figcaption>
</figure>

最后一个节点很重要。迁移后的 Hook 应作为 Codex Hook 运行；迁移后的命令应表现为 Codex Skill 或工作流单元；导入的会话应成为 rollout 历史。迁移层不应该留在 turn loop 里。

## 配置迁移

导入器在写入任何原生目标之前，先分类每个来源产物，并为它选择保守结果。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-19-concept-1-zh.svg" alt="配置导入会分类每个外部产物，只转换受支持子集，保留原生目标，并为每次跳过或写入留下导入报告。" loading="lazy" />
  <figcaption>配置导入会分类每个外部产物，只转换受支持子集，保留原生目标，并为每次跳过或写入留下导入报告。</figcaption>
</figure>

这张表故意保持很小：每一行先是权限决策，然后才是转换规则。

| 来源产物 | 原生目标 | 保守规则 |
| --- | --- | --- |
| MCP 服务条目 | Codex MCP 配置 | 导入受支持传输，跳过已禁用或不受支持条目 |
| Hook | Codex Hook 配置 | 只转换能匹配结构化 Hook 模型的处理器 |
| 命令 | Skill 或工作流单元 | 要求稳定元数据，跳过动态运行时扩展 |
| 子 Agent | Agent 定义或类 Skill 指令 | 只保留 Codex 能安全表达的字段 |

保守规则就是架构。迁移绝不应该猜测权限边界。如果外部命令依赖特定 provider 的运行时扩展，安全行为是跳过并说明原因。如果某个 Hook 处理器无法表示为 Codex Hook schema，安全行为不是把它伪装成任意 shell 文本。若目标文件已经存在，导入器应保留用户已有原生配置，而不是覆盖。

```text
// 伪代码 - 说明性模式。
对每条外部配置:
    类型 = 分类(外部配置)

    如果不支持(类型, 外部配置):
        记录跳过(外部配置, 原因)
        继续

    目标 = 计算原生目标(外部配置)
    如果目标已存在:
        记录保留(目标)
        继续

    原生产物 = 转换为 Codex 形状(外部配置)
    写入原生产物(目标, 原生产物)
```

这是通过翻译实现兼容性，而不是通过无边界解释实现兼容性。

## 会话导入

会话导入与配置迁移不同，因为历史不是未来能力，而是过去对话的证据。外部 JSONL 会话可能包含用户消息、助手消息、工具调用、工具输出、标题、工作目录、token 用量和来源特有记录。Codex 必须把足够多历史翻译成自己的 rollout 条目，才能让线程与历史重建逻辑理解。导入路径因此会检测候选会话，验证工作上下文仍存在，只加载可导入记录，构建可见 turn，添加导入元数据，并记录内容哈希台账。台账防止重复导入，同时允许来源内容改变后再次被发现。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-19-02-zh.svg" alt="内容哈希台账让会话导入可重复：未变化的 JSONL 被跳过，发生变化且受支持的记录会变成 rollout 条目和导入线程。" loading="lazy" />
  <figcaption>内容哈希台账让会话导入可重复：未变化的 JSONL 被跳过，发生变化且受支持的记录会变成 rollout 条目和导入线程。</figcaption>
</figure>

这个设计同时保留两个事实：导入对话可作为 Codex history 使用；它也仍然带着导入历史的来源信息。

## 不让兼容变成语义漂移

最危险的迁移错误不是解析失败，而是成功导入后改变了含义。Agent 系统在提示规则、工具调用格式、Hook 时机、权限模型、命令扩展、子 Agent 行为和历史 schema 上都可能不同。转换器如果过度聪明，就会创建看似有效、却行为不同的原生产物。

Codex 用三条兼容性规则降低这种风险。第一，保留原生用户工作：已有目标文件优先于导入材料。第二，跳过原生运行时无法表达的动态行为。第三，附加导入元数据，让后续代码和用户能区分原生历史与迁移历史。这些规则并不花哨，但它们避免迁移变成每个后续子系统里的隐藏兼容模式。

## 向后兼容桥

迁移是一座桥，协议兼容是另一座桥。前面章节已经介绍生成 schema、旧别名、v1/v2 共存、实验性关卡和客户端版本兼容处理。这些兼容桥应停在系统边界，而不是进入原生运行时状态。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-19-concept-2-zh.svg" alt="兼容桥留在系统边界上：旧形态在那里被命名，支持案例被翻译，不支持案例被跳过，原生运行时状态保持干净。" loading="lazy" />
  <figcaption>兼容桥留在系统边界上：旧形态在那里被命名，支持案例被翻译，不支持案例被跳过，原生运行时状态保持干净。</figcaption>
</figure>

边界规则就是这条策略的操作化版本。

| 兼容桥 | 保护什么 | 不应该做什么 |
| --- | --- | --- |
| schema 别名 | 旧客户端和已存事件 | 隐藏不兼容语义 |
| 实验性关卡 | 不稳定能力 | 让不稳定字段看起来像永久契约 |
| 迁移转换器 | 来自其他工具的用户工作流 | 永久模拟另一个运行时 |
| 导入台账 | 幂等会话导入 | 压制已经改变的来源内容 |
| 来源标记 | 导入历史的可审计性 | 用私有实现细节污染模型上下文 |

共同主题是显式性。兼容代码应该说清楚它在桥接什么、跳过什么、桥接在哪里结束。

## 设计导入报告

导入操作即使成功也应该产出报告。用户需要知道哪些 MCP 服务被导入，哪些 Hook 被跳过，哪些命令变成 Skill，哪些已有文件被保留，哪些会话变成线程。静默迁移在演示里诱人，在生产里危险。

```text
// 伪代码 - 说明性模式。
报告 = {
    已导入: [],
    已保留: [],
    已跳过: [],
    警告: []
}

对每个产物:
    结果 = 迁移(产物)
    报告.添加(结果.类别, 结果.摘要)

返回报告
```

报告也是测试判据。迁移测试应覆盖边界行为：已禁用服务、不受支持传输、重复命令名、缺失元数据、已有目标、无效台账、变化后的来源内容，以及不受支持的会话记录。

<div class="trace-ledger">

## 追踪台账

| 问题 | 第 19 章答案 |
| --- | --- |
| 用户请求现在在哪里？ | 它可以由导入后的原生产物和导入后的 rollout 历史支撑。 |
| 什么数据结构携带它？ | 迁移摘要、已转换配置产物、rollout 条目、导入元数据和内容哈希台账。 |
| 谁拥有下一步决策？ | 转换器、验证器、跳过规则、目标保留检查，以及导入之后的原生运行时加载器。 |
| 这里可能怎么失败？ | 不受支持的来源语义、不安全动态扩展、重复名称、已有目标冲突、无效 JSONL、缺失工作上下文，或过期导入台账数据。 |

</div>

<div class="apply-this">

## 应用到实践

1. **有损导入账本。** 解决迁移过度承诺 -> 记录 skipped、converted 和 unsupported 字段 -> 风险：假装不兼容语义被完整保留。
2. **目标形状原生化。** 解决兼容层脆弱 -> 翻译成 Codex-native config、hook、skill 和 session shape -> 风险：永久携带外部 runtime 假设。
3. **信任重置。** 解决导入自动化不安全 -> 让导入 hook 和 command 重新经过 Codex trust gate -> 风险：继承另一个系统的信任结论。
4. **历史来源标记。** 解决导入 transcript 混淆 -> 把迁移 item 标记为 imported history -> 风险：把导入记录和本地 rollout fact 混在一起。
5. **兼容性边界。** 解决旧客户端破坏 -> 把 legacy alias 留在协议边界 -> 风险：让兼容分支扩散到 core logic。

</div>

## 接下来

第五部到这里结束：runtime 已能接纳外部工具、加载 extension package，并把外部历史迁移进 native contracts。第六部转向一个 turn 之外的协作：multi-agent threads、cloud tasks、identity 和 memory。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| External config model | [`codex-rs/app-server/src/config/external_agent_config.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/config/external_agent_config.rs#L1) |
| Migration request processor | [`codex-rs/app-server/src/request_processors/external_agent_config_processor.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server/src/request_processors/external_agent_config_processor.rs#L1) |
| TUI migration startup | [`codex-rs/tui/src/external_agent_config_migration_startup.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/tui/src/external_agent_config_migration_startup.rs#L1) |
| Protocol compatibility surface | [`codex-rs/app-server-protocol/src/protocol/mod.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/protocol/mod.rs#L1) |
| Thread store | [`codex-rs/thread-store/src`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/thread-store/src) |

</div>
