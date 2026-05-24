# 系统设计面试核心书规格说明

本规格定义 `design` 单页书的首个题目页面。页面发布在
`/books/design/`，以“设计一个 ChatGPT”为样板题，面向零基础读者讲清
系统设计面试的完整答题链路。

## 路由

- 中文默认页：`/books/design/`
- 中文镜像页：`/books/zh/design/`
- 规格页：`/books/design/spec.html`
- 中文规格镜像：`/books/zh/design/spec.html`

默认页和中文镜像内容一致，canonical 指向 `/books/design/`。

## 字体与数学排版

本书继承 `BOOK_STYLE.md` 的全站书籍样式契约：正文、标题、导航、
控件、表格、图注和普通 UI 文本默认使用苹方字体栈；代码块、行内代码、
终端片段和代码编辑器默认使用 Cursor/LeetCode 代码字体栈
`Monaco, "Cascadia Code", Consolas, "Courier New", ui-monospace,
SFMono-Regular, Menlo, monospace`。容量估算、延迟/吞吐、概率、复杂度、公式、
指标和任何可量化约束能用 LaTeX/KaTeX 表达时必须优先使用 LaTeX。

## 内容范围

页面必须覆盖：

- 面试问法：Design ChatGPT、Design an AI chatbot、Design a real-time LLM
  chat product、Design ChatGPT API、Design enterprise ChatGPT、Design agentic
  ChatGPT、Design Code Interpreter。
- 面试流程：澄清范围、列需求、估规模、画主链路、深挖瓶颈、讲取舍、
  预案追问。
- 产品能力：多轮对话、流式输出、会话恢复、文件上传、RAG、连接器、
  工具调用、Agent、Canvas、代码执行、数据分析、多模态、图片、语音、
  Projects、Tasks、Apps、Deep research、记忆、企业权限和审计。
- 后端高并发高可用：API 网关、鉴权、限流、队列、幂等、长连接、
  断线重连、状态机、数据库分层、事件流、trace、多区域、降级、回压、
  容量估算。
- 推理系统：模型路由、prefill、decode、KV cache、PagedAttention、
  continuous batching、chunked prefill、prefix cache、FlashAttention、
  量化、并行、推测解码、prefill/decode 分离、GPU 调度、成本控制。
- 安全治理：输入/输出安全、prompt injection、工具权限、浏览器接管、
  高风险动作确认、隐私隔离、租户隔离、评估和可观测性。
- 发布闭环：离线评测、安全评测、shadow traffic、canary、回滚、用户反馈、
  数据脱敏、训练候选和训练/评测集隔离。

## 资料约束

实现必须参考用户提供的 ChatGPT 分享页，并在其基础上补齐官方公开资料：

- OpenAI ChatGPT 发布页。
- OpenAI Canvas 发布页和帮助页。
- OpenAI ChatGPT agent 发布页与 system card。
- OpenAI Projects、Tasks、Connectors 帮助页。
- OpenAI Data Analysis / Code Interpreter 文档。
- OpenAI Streaming、Agents SDK、tools、evals、guardrails 等 API 文档。
- vLLM PagedAttention 论文与 NVIDIA TensorRT-LLM chunked prefill 资料。
- FlashAttention、Splitwise、DistServe、Speculative Decoding 等推理系统资料。
- 公开系统设计面试文章中对 ChatGPT/AI chatbot 的常见问法和考点。

页面底部必须列出资料地图，不能复制第三方长文。

## 交互和视觉

页面必须包含：

- 左侧或顶部目录锚点，支持跳转到主要章节。
- 白板版端到端架构图。
- 真实 ChatGPT 产品功能地图。
- 请求链路和流式输出时序图。
- API、存储、事件流和 trace 表。
- GPU 推理调度图。
- Agent 虚拟计算机和工具边界图。
- Canvas 协同编辑图。
- 代码执行容器图。
- 面试追问卡片、取舍表和检查清单。

技术系统图优先用第一方 HTML/SVG/CSS 实现，保证可读、可打印、移动端不溢出。
不新增运行时依赖。

## 验收

实现完成后至少验证：

- `npm run check:content`
- `npm run build`
- `npm run check:dist`
- 本地打开 `/books/design/`，检查目录跳转、响应式布局、图表可读性和文案无本地私有路径。
