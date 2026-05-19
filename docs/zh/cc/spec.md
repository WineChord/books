# Claude Code 面试核心书规格

本书是发布在 `/books/cc/` 的单页交互式长书，面向零基础读者，
系统讲解 Claude Code 上下文管理、记忆、压缩、多 Agent 设计和面试答法。

## 来源契约

页面必须覆盖用户提供的三个微信公众号链接，以及这些链接中能读取到的同主题内部链接。

第一个微信链接已直接读取正文，内容包括上下文窗口、朴素方案缺陷、五层压缩金字塔、
Auto-Compact、摘要 prompt、压缩后接续和面试回答结构。

第二、第三个微信链接在本地读取时返回微信安全验证页，因此使用可读授权转载页补齐：

1. `https://www.eefocus.com/article/1984643.html`
2. `https://www.eefocus.com/article/2009921.html`

页面同时用 Anthropic 官方文档校验 subagents、memory、MCP、slash commands
等公开能力，避免只依赖非官方源码分析。

## 路由契约

1. `src/pages/cc/index.astro` 渲染主要中文页面。
2. `src/pages/zh/cc/index.astro` 按仓库现有中文路由模式渲染同一页面。
3. Astro 的 `base` 是 `/books`，因此公开 URL 是 `/books/cc/`。
4. 规格页可通过 `/books/cc/spec.html` 和 `/books/zh/cc/spec.html` 访问。

## 覆盖契约

页面必须从第一性原理讲清：

1. chat、copilot、agent 的区别；
2. token、上下文窗口、system prompt、历史消息、工具定义、tool use、
   tool result；
3. 为什么 coding agent 比普通聊天更快消耗上下文；
4. 为什么长上下文不能消除上下文管理需求；
5. 为什么滑动窗口、固定间隔摘要、向量召回不适合作为 agent 历史的唯一方案；
6. 五层压缩金字塔：大结果存磁盘、Snip、Micro-Compact、Context Collapse、
   Auto-Compact；
7. Auto-Compact 的触发、13K 缓冲、手动和自动差异、熔断、递归守卫、
   全量重写和恢复通道；
8. 摘要 prompt 的 XML 结构、九项清单、所有用户消息和当前工作；
9. 压缩后的边界标记、summary、attachments、hook results 和 transcript 兜底；
10. memory、context、summary 的区别；
11. Subagent、Fork Subagent、Coordinator、工具隔离、上下文隔离、消息队列和完成通知；
12. 30 秒版、2 分钟版和追问版面试答法。

## 交互契约

页面必须提供这些可视化或交互讲解：

1. token 预算压力和压缩触发阈值；
2. 五层压缩机制；
3. Auto-Compact 流水线；
4. 九项摘要 prompt；
5. memory 类型和恢复通道；
6. 多 Agent 通信；
7. 面试问答卡片。

原文图片不直接热链发布到本站；页面用本站自有交互图和解释文本重构图意。

## 质量契约

1. 页面必须通过 `npm run build`。
2. 页面必须通过仓库内容检查和 dist 检查。
3. 发布 HTML 不得包含本地机器路径或私有环境信息。
4. 页面必须兼容桌面和移动端。
5. 无 JavaScript 时内容仍可读，JavaScript 只增强图示交互。
