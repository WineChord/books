# 第 23 章：构建系统与生成契约

第 22 章仍然在 runtime 内部：长期记忆只能通过 read path、write path、lock、
citation 和受限 internal agent 改变。第七部把同样的纪律推进到仓库层面。如果 runtime 由持久契约治理，source tree 也需要一套机器，确保每一次依赖变更、
schema 编辑、平台移植和 release build 之后，这些契约仍然成立。本章解释 Codex 为什么同时保留两种 Rust 构建视图，为什么生成的 schema 被当作产品契约，以及为什么测试 launcher 只是为了让 hermetic CI 里的测试仍然像普通 Cargo 测试。读完本章，你应该把构建系统看成第二层协议：Cargo 服务本地开发和实际发布构建，Bazel 服务 hermetic 验证 overlay，schema 生成服务所有不链接运行时却要集成 Codex 的客户端。

## 这一层解决什么问题

Agent 运行时对构建漂移特别敏感。普通 CLI 也许可以容忍本地测试、发布包和运行配置之间的一点不一致；Codex 不行。schema 不一致会卡住 SDK，平台构建差异会改变沙箱行为，某个 helper 二进制只在部分构建里存在会把安全承诺变成产品缺陷。所以仓库做了一个明确拆分：

| 层 | 主要读者 | 承诺 |
| --- | --- | --- |
| Cargo workspace | 产品工程师 | 用熟悉的 crate 边界快速、惯用地开发 Rust。 |
| Bazel overlay | CI 与发布验证 | 在同一个 crate 图之上做 hermetic、平台感知构建。 |
| 生成 schema | 外部客户端 | 为配置、hooks、app-server 消息提供稳定的机器可读契约。 |
| 测试 launcher | 开发者与 CI | 即使由 Bazel 执行，测试仍保留 Cargo 风格假设。 |

关键不在于“使用 Bazel”。关键在于 Bazel 没有被允许变成第二套产品架构，也没有被写成虚构的唯一发布路径。Cargo 仍然是开发者和 shipping build 的源头；Bazel 在需要证明打包、平台和生成契约仍然一致时，把它镜像并约束起来。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-23-01-zh.svg" alt="构建图承担两件事：Cargo 保持产品图可理解，Bazel 镜像足够多的结构，用可复现方式验证发布产物。" loading="lazy" />
  <figcaption>构建图承担两件事：Cargo 保持产品图可理解，Bazel 镜像足够多的结构，用可复现方式验证发布产物。</figcaption>
</figure>

这个图就是本章的形状：一个源码图喂给两个构建接口；一个运行时图吐出多个公开契约。只要这些输出开始分叉，架构在用户运行命令之前就已经失败了。

## Cargo 是开发者源头

Cargo 拥有日常开发循环。它定义 Rust workspace、crate 依赖、二进制目标、features、测试、lint 预期和 lockfile 解析。这个选择很实际：Rust 工程师熟悉 Cargo，IDE 理解 Cargo，大多数库级推理也发生在 crate 边界。

Codex 的 crate 布局和本书的架构地图高度对应。协议、核心运行时、模型客户端、工具执行、沙箱、app-server、TUI、SDK 支撑、云任务和治理工具都有可识别的归属。Cargo 让这些 crate 继续作为工程边界存在，而不是被一个发布流水线遮住。代价是 Cargo 单独不够。它不能完整表达发布矩阵、远程执行预期、helper 二进制打包、生成产物检查或平台原生依赖。如果只有 Cargo，发布正确性就会依赖周边脚本和约定。Codex 保留 Cargo 作为顺手入口，把可复现性放进 overlay。

## Bazel 是 CI 与发布验证的 overlay

Bazel 的职责是让架构更不容易被意外破坏。它导入 Rust 依赖图，定义平台目标，并在受控环境中执行测试。固定源码中的公开发布 workflow 会用 Cargo 构建实际发布的 CLI 产物，然后 staging 和上传；Bazel 的价值在于验证 release-build 假设，并把平台与原生依赖结构放进 CI 可执行规则。它还承载产品 crate 不应理解的细节：runfiles 布局、sharding、snapshot 路径、平台 toolchain、下载的原生归档和 hermetic 验证目标。这种分离很重要。如果每个产品 crate 都要理解发布平台，核心运行时会逐渐吸收交付细节。决定一个 turn 如何执行的代码，不应该同时决定某个 Windows helper 如何链接，也不应该知道 Linux 发布产物如何找到原生归档。Bazel 把复杂性留在构建边界。

```text
// 伪代码 - 说明性模式。
workspace = read_cargo_workspace()
for crate in workspace.product_crates:
    bazel.add_library(crate.name, crate.sources, crate.features)
    bazel.add_tests(crate.name, crate.unit_tests, cargo_like_launcher)

for target in release_platforms:
    bazel.add_release_build_check(target, workspace.cli_binary, native_helpers)
```

重要决策是 overlay 从产品结构推导出来，而不是替换产品结构。工程师仍然按 crate 推理；CI 和发布验证按 hermetic target 推理；实际发布 job 仍然用 Cargo 构建 artifact，然后再 package 和 publish。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-23-02-zh.svg" alt="Bazel 不替代产品图，而是在可复现启动条件下镜像 Cargo 形状的世界，让 CI 能捕获平台与打包漂移。" loading="lazy" />
  <figcaption>Bazel 不替代产品图，而是在可复现启动条件下镜像 Cargo 形状的世界，让 CI 能捕获平台与打包漂移。</figcaption>
</figure>

launcher 这个盒子很容易被低估。测试经常假设工作目录、snapshot 路径、fixture 布局或环境变量。Bazel 天然会打破这些假设。Codex 只恢复测试应该拥有的假设，这样同一个测试既能服务本地开发，也能服务 hermetic CI，而不需要让每个测试都学习 Bazel 内部机制。

## 生成 schema 是产品 API

生成 schema 不是构建副产物，而是承诺。Codex 用类型化运行时契约表达配置、hooks、app-server 消息和其他客户端可见面。当这些类型被生成到仓库中的 schema 文件，内部类型变化就变成可 review 的产品变化。这就是第 4 章协议纪律在构建时的版本。运行时可以内部演进，但客户端契约需要稳定词汇。生成产物让漂移可见：

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-23-03-zh.svg" alt="生成 schema 是产品 API：运行时类型产出已提交契约，漂移检查让变更可审查，外部 client 得到稳定词汇，而不是私有 Rust 形状。" loading="lazy" />
  <figcaption>生成 schema 是产品 API：运行时类型产出已提交契约，漂移检查让变更可审查，外部 client 得到稳定词汇，而不是私有 Rust 形状。</figcaption>
</figure>

过期 schema 不只是“文档没更新”。它说明代码和契约已经不再描述同一个产品。Codex 把这当作正确性问题，因为 app-server 客户端、SDK、hook 作者和配置生成器都可能依赖这些 schema。

## 深入：不泄露实现的契约生成

生成 schema 必须暴露足够多的信息用于集成，同时不能泄露运行时实现。它应该使用产品概念说话：字段、判别项、可选性、稳定名字和兼容性标记。它不应该暴露私有 helper 结构，也不应该迫使客户端照搬内部模块布局。

```text
// 伪代码 - 为清晰起见简化。
contract_types = collect_public_contracts(runtime_crates)
schema = []

for contract in contract_types:
    schema.append({
        "name": stable_external_name(contract),
        "shape": exported_fields(contract),
        "compat": compatibility_notes(contract),
    })

write_if_changed("generated-contracts", schema)
```

重点不是序列化技术，而是控制什么会成为公开内容。生成契约仍然可以经过编辑：选择稳定名字，实验字段被 gate，旧别名在兼容性需要时继续保留。

## 为什么构建属于架构书

很容易把构建文件当成外围内容。在 Codex 里，构建文件是架构变成可执行规则的地方。TUI 与 core 的边界可以被检查；schema drift 可以让 CI 失败；原生依赖可以被隔离；大二进制 blob 可以被拒绝；Cargo 与 Bazel lockfile 可以保持同步；发布目标可以证明运行时仍然能在产品声称支持的平台假设下构建。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-23-concept-1-zh.svg" alt="构建属于架构，因为生成 API、发布验证和打包流程决定哪些契约最终真正交付。" loading="lazy" />
  <figcaption>构建属于架构，因为生成 API、发布验证和打包流程决定哪些契约最终真正交付。</figcaption>
</figure>

所以构建系统也是治理面。它不只回答“能不能编译”，还回答“是否保留了让 agent 可以被嵌入、扩展、发布和调试的契约”。

## 应用到实践

1. **双接口构建** -> 解决开发速度与发布可复现性的张力 -> 保留顺手工具作为源头，从它推导 hermetic target -> 风险：overlay 变成第二套架构。
2. **生成契约文件** -> 解决静默 API 漂移 -> 外部客户端依赖的 schema 要提交进仓库 -> 风险：把内部 helper 形状暴露成公开词汇。
3. **Cargo 风格测试 launcher** -> 解决测试跨构建系统可移植性 -> 只恢复测试应该拥有的路径与环境假设 -> 风险：让测试依赖构建系统内部细节。
4. **交付隔离区** -> 解决平台复杂性污染产品代码 -> 把原生依赖和打包逻辑留在构建边界 -> 风险：在核心运行时 crate 中加入平台分支。
5. **把构建当治理** -> 解决 review 容易漏掉的架构规则 -> 用可执行策略检查边界、schema、大小和依赖 -> 风险：加入噪音检查让开发者习惯性忽略。

## 下一章

下一章追踪这些构建系统产生的产物。即使 Cargo、Bazel 和生成 schema 已经达成一致，发布流水线仍然要把这种一致性变成 npm 包、独立安装器、签名归档、helper 二进制和平台原生依赖。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| Cargo workspace | [`codex-rs/Cargo.toml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/Cargo.toml#L1) |
| Bazel module | [`MODULE.bazel`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/MODULE.bazel#L1) |
| Bazel crate macros | [`defs.bzl`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/defs.bzl#L66) |
| Bazel release-build verification | [`.github/workflows/bazel.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/bazel.yml#L314) |
| App-server schema export | [`codex-rs/app-server-protocol/src/bin/export.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/app-server-protocol/src/bin/export.rs#L1) |

</div>
