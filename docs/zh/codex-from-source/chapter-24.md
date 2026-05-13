# 第 24 章：打包、发布与原生依赖

第 23 章把构建系统当成契约引擎：Cargo 保留开发者和实际发布构建模型，Bazel 证明 release-build 假设，生成 schema 让外部客户端保持同步。打包是下一层压力。构建产物还不是产品。它还必须穿过 npm 安装、独立安装器、平台 helper 二进制、签名、校验和，以及在不同操作系统上表现不同的原生依赖。本章从 Rust 二进制一路追踪到用户命令。设计教训是：打包应该吸收平台蔓延，但不能让平台蔓延改变运行时。Codex 能支持多种安装路径，是因为产品架构足够窄：一个原生命令、一个薄分发 wrapper、可选的平台包，以及复杂性被留在发布基础设施附近的 helper 产物。

## 交付本身是架构边界

关于打包的第一个架构事实是：已安装命令不是 agent 的所在地。JavaScript 面向的包只是分发胶水。Rust 二进制拥有 CLI router 和运行时。这个拆分在第 2 章已经出现；发布基础设施正是这个拆分产生回报的地方。如果 npm 包拥有真实行为，每个平台包都可能变成产品 fork。如果安装器拥有行为，独立分发就会偏离 npm 分发。如果原生 helper 泄漏进核心逻辑，平台差异就会污染 turn loop。Codex 让单一运行时保持中心位置，让打包层解决获取、选择和验证。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-24-01-zh.svg" alt="交付层让 Codex 原生二进制保持权威，同时由 Cargo、Bazel 验证、npm 平台包、发布归档、元包和独立安装器处理分发。" loading="lazy" />
  <figcaption>交付层让 Codex 原生二进制保持权威，同时由 Cargo、Bazel 验证、npm 平台包、发布归档、元包和独立安装器处理分发。</figcaption>
</figure>

meta package 和 installer 是进入同一间房子的不同门。用户不应该通过运行时语义推断自己是从哪扇门进来的。

## NPM 包负责选择原生二进制

npm 面向层的职责很克制：暴露熟悉的安装入口，同时选择正确的原生 payload。它有意很薄，因为 Rust 命令才是权威产品。meta package 可以依赖平台特定的 optional package，已安装 wrapper 可以定位原生可执行文件，但这两层都不应该实现 agent loop。这个模式有用，因为产品可以进入 JavaScript 分发生态，同时不把自己重写成 JavaScript 产品。它也带来兼容性责任：平台包名、二进制位置、optional dependency 行为和 fallback 错误都成为用户体验的一部分。

```text
// 伪代码 - 说明性模式。
platform = detect_host_platform()
candidate = optional_package_for(platform)

if candidate.exists():
    run(candidate.binary, user_args)
else:
    explain_missing_native_payload(platform)
```

wrapper 很小，但失败模式很重要。打包错误应该可诊断，而不是神秘。用户不关心失败来自 npm optional dependency 解析、缺失归档还是权限问题；分发层必须把这些问题翻译成可行动的产品错误。

## 独立安装器消费发布产物

独立安装器解决另一个问题：用户可能希望不依赖 JavaScript 包管理器也能使用 Codex。这不意味着安装器应该发明第二套产物模型。更强的模式是让安装器消费打包已经产生的同一批发布 payload，然后暴露稳定命令 shim。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-24-02-zh.svg" alt="发布 CI 组装并暂存包，将 payload 发布到 release storage，再由安装器把经过验证的命令放进用户 shell。" loading="lazy" />
  <figcaption>发布 CI 组装并暂存包，将 payload 发布到 release storage，再由安装器把经过验证的命令放进用户 shell。</figcaption>
</figure>

这样交付路径在产物层耦合，而不是在行为层分叉。安装器拥有安装机制，不拥有运行时语义。只要这条规则成立，npm install 和 standalone install 就是同一个产品的运营变体。

## 原生依赖应该被隔离

原生依赖通常是发布系统失控的地方。Codex 必须处理 helper 二进制、沙箱支撑、平台链接，以及部分 vendored 或 patch 过的依赖。有些依赖只是普通 Rust crate；另一些需要归档、校验和、build script、平台条件或兼容模式。可复用模式是隔离。原生复杂性属于 `third_party`、patch 目录、Bazel repository rules、发布脚本和 helper 包组装。产品 crate 应该消费稳定 capability，而不是一团平台构建细节。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-24-03-zh.svg" alt="产品代码只消费稳定原生能力，而第三方元数据、供应商补丁、完整性记录、内置 helper 和发布规则留在构建与发布边界之后。" loading="lazy" />
  <figcaption>产品代码只消费稳定原生能力，而第三方元数据、供应商补丁、完整性记录、内置 helper 和发布规则留在构建与发布边界之后。</figcaption>
</figure>

这个设计不免费。隔离区本身需要维护：校验和要更新，patch 要有理由，发布资产必须存在，平台 selector 必须被测试。收益是维护面可见且集中，而不是分散在运行时代码里。

## 签名与校验和是信任转移

如果用户无法信任下载到的产物，可复现构建也不够。发布打包因此增加了信任转移层：校验和、签名、平台签名和发布元数据。这些机制本身不会让运行时更安全，但它们保留了从 reviewed source、built artifact、distributed package 到 installed command 的链路。对 agent 工具来说，这条链路尤其重要。安装好的二进制可以读文件、执行命令、请求审批并与远端服务交互。用户需要相信自己拿到的是项目本来打算发布的二进制。

```text
// 伪代码 - 说明性模式。
artifact = build_release_target(platform)
digest = compute_digest(artifact)
signature = sign_digest(digest, release_identity)

publish({
    "artifact": artifact,
    "checksum": digest,
    "signature": signature,
})
```

具体签名提供方不是重点。不变量才是重点：每个发布产物都应该能被验证为来自发布身份和 reviewed build process。

## 交付架构保护产品架构

发布系统的产品义务只有一个：在适配混乱平台时保留运行时契约。它应该让安装路径无聊，让 helper 二进制可用而不迫使用户理解 helper 图，让原生依赖可复现而不迫使核心工程师在 turn loop 里调试归档选择。

<figure class="sketch-figure">
  <img src="/books/figures/codex-from-source/excalidraw/chapter-24-concept-1-zh.svg" alt="交付架构把平台包、安装器、helper 和原生依赖限制在发布侧，让运行时契约在不同安装路径下保持不变。" loading="lazy" />
  <figcaption>交付架构把平台包、安装器、helper 和原生依赖限制在发布侧，让运行时契约在不同安装路径下保持不变。</figcaption>
</figure>

这就是打包值得独立成章的原因。它不只是“怎么发布”，而是防止发布关注点改变被发布的产品。

## 应用到实践

1. **薄分发 wrapper** -> 解决生态特定安装而不复制运行时行为 -> 让原生二进制保持权威，wrapper 只选择并启动它 -> 风险：把产品逻辑放进 wrapper。
2. **产物层共享路径** -> 解决 npm 与独立安装之间的漂移 -> 让安装器消费已验证的发布 payload -> 风险：构建第二套 installer-only 产物模型。
3. **原生依赖隔离** -> 解决平台复杂性泄漏进核心模块 -> 集中管理 patch、校验和、helper 和 selector -> 风险：隔离得太隐蔽以至于没人维护。
4. **可诊断安装失败** -> 解决 optional dependency 错误不透明 -> 把包解析失败翻译成平台感知消息 -> 风险：假设包管理器会友好失败。
5. **信任转移元数据** -> 解决产物来源风险 -> 每个 payload 都发布校验和、签名和发布元数据 -> 风险：把签名当仪式而不是用户信任链的一部分。

## 下一章

构建和打包能制造正确产物，但不能单独让架构长期保持正确。最后一章研究让架构规则可执行的 policy 与 CI：边界测试、schema drift 检查、依赖治理、发布通道和 review-time 自动化。

<div class="source-equivalence">

## 源码地图

| 概念 | 源码锚点 |
| --- | --- |
| npm wrapper package | [`codex-cli/package.json`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/package.json#L1) |
| npm package builder | [`codex-cli/scripts/build_npm_package.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/build_npm_package.py#L1) |
| Native dependency installer | [`codex-cli/scripts/install_native_deps.py`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-cli/scripts/install_native_deps.py#L1) |
| Cargo release build workflow | [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L281) |
| Release artifact staging | [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L373) |
| npm package staging | [`.github/workflows/rust-release.yml`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/.github/workflows/rust-release.yml#L570) |
| V8 dependency release surface | [`third_party/v8/README.md`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/third_party/v8/README.md#L1) |

</div>
