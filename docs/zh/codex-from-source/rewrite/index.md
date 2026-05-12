# 重写工作区

本工作区记录 [Book Rewrite Prompt](../book-rewrite-prompt) 的执行产物。这里
不是最终正文，而是正式重写前必须存在的研究和规划层。

源码快照：`569ff6a1c400bd514ff79f5f1050a684dc3afde3`。

## 阶段状态

| 阶段 | 状态 | 产物 |
| --- | --- | --- |
| Phase 1: Exploration | 已完成 | [子系统研究笔记](#phase-1-research-notes) |
| Phase 2: Audience and Positioning | 已完成 | [受众与定位](positioning) |
| Phase 3: Structure | 已完成 | [拟定大纲](outline) |
| Phase 4: Writing | 已完成 | 中英文 25 章与结语 |
| Phase 5: Editorial Review | 已完成 | 多轮 reviewer 反馈 |
| Phase 6: Revision | 已完成 | 根据审稿反馈修订 |
| Phase 7: Source Code Audit | 已完成 | 审计伪代码和源码泄漏 |

## Phase 1 Research Notes

以下文件是原始子系统分析笔记。它们不是正文，不应直接当成最终章节阅读。

- [入口、配置与认证](research/entrypoints-config-auth)
- [核心运行时与状态](research/core-runtime-state)
- [模型 provider 与后端客户端](research/model-backend)
- [工具执行与变更路径](research/tools-execution)
- [安全、权限与沙箱](research/security-sandbox)
- [App-server 与 SDK](research/app-server-sdk)
- [终端 UI 与渲染](research/tui-rendering)
- [扩展、MCP、skills 与 plugins](research/extensions)
- [多 agent、云任务、memories 与 trace](research/multi-agent-cloud-memory-trace)
- [构建、发布与治理](research/build-release-governance)

## 当前状态

大纲已批准，正文已完成，后续更新应优先修改正式章节和源码索引。
