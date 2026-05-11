# 前言

本书是一份围绕开源
[OpenAI Codex 仓库](https://github.com/openai/codex)的源码导读。它分析的是公开
CLI 仓库，不是 OpenAI 私有的模型训练系统、云端托管服务或内部后端。全书固定使用
[`569ff6a1c400bd514ff79f5f1050a684dc3afde3`](https://github.com/openai/codex/tree/569ff6a1c400bd514ff79f5f1050a684dc3afde3)
这个源码快照。

Codex 值得细读，因为它不是一个简单的聊天外壳。它是一个本地软件工程 agent：
有命令行入口、终端 UI、类型化协议、会话运行时、工具执行、沙箱、审批、MCP
集成，以及给其他客户端使用的 app-server。换句话说，它展示了一个 LLM 产品如何
变成一个真实系统。

## 怎样阅读本书

章节顺序从用户能看到的行为逐步深入到内部机制：

<div class="flow">
  <div><strong>命令</strong>先看用户实际运行什么。</div>
  <div><strong>协议</strong>把 UI 动作变成类型化消息。</div>
  <div><strong>运行时</strong>驱动模型调用和工具调用。</div>
  <div><strong>边界</strong>审批、沙箱、持久化和回报结果。</div>
</div>

每章都回答三个问题：

1. 这一层解决什么问题？
2. 哪些源码文件实现它？
3. 我们能复用什么设计经验？

本书不假设读者熟悉 Rust。只要某个 Rust 概念对理解架构有帮助，就会先用直观语言
解释，再把它放回源码里。

## 范围需要说清楚

OpenAI 的公开发布文章把 Codex 描述为能在隔离环境中工作、运行测试并提出 PR 的
软件工程 agent。开源 CLI 仓库展示了其中相当大一部分本地产品架构：命令分发、
终端 UI、app-server 协议、模型流、工具执行、MCP 和本地安全边界。它没有公开模型
权重、私有服务内部实现，也不覆盖所有云端部署细节。因此本书会谨慎使用“CLI
实现了”“开源仓库暴露了”这类表述。

## 为什么源码链接固定到 commit

源码会变化。指向 `main` 的链接下周可能就指向不同代码。本书所有源码链接都固定到
同一个公开 commit。这样解释是可复现的：如果章节说 `Op` 定义在
[`protocol.rs`](https://github.com/openai/codex/blob/569ff6a1c400bd514ff79f5f1050a684dc3afde3/codex-rs/protocol/src/protocol.rs#L403)，
你以后再打开也能看到同一份代码。

