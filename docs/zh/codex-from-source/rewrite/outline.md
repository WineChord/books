# 拟定完整大纲

本页执行 Phase 3。它只提交结构，不进入正式写作。按照原始 prompt，只有
这份大纲被批准或修订后，才开始从零写每一章。

## 第一部：建立契约

_复杂 agent 只有在所有角色使用同一套语言时才可理解。_

1. **The Architectural Bet**：定义 thesis、thread/turn/item/event/tool/rollout 等核心词汇。
2. **From Distribution Wrapper to Rust Command Router**：从 npm/native launcher 进入 Rust CLI，解释薄入口模式。
3. **Configuration, Auth, and Managed Requirements**：讲配置分层、信任、requirements、auth 和 feature flags。
4. **Protocol as Product Boundary**：讲 submissions、events、app-server JSON-RPC、schemas 和兼容性。

## 第二部：构建 Agent Runtime

_runtime 不是一次模型调用，而是 context、streaming、tools、cancellation 和 replay 的调度器。_

5. **Threads, Sessions, and Durable State**：`ThreadManager -> CodexThread -> Codex -> Session`，以及三种历史。
6. **The Turn Loop**：从 user input 到 model streaming、tool dispatch、compaction 和 completion。
7. **Model Providers and Streaming Transports**：transport、typed API、provider runtime、model catalog 和 backend tasks。
8. **Observability, Rollout Trace, and Replay**：raw capture、reducers、graph model、analytics 和 OTEL。

## 第三部：执行副作用

_模型可以提出动作，Codex 决定动作是否成为副作用。_

9. **Tool Specs, Routing, and Runtime Dispatch**：model-visible spec 与 runtime handler 分离。
10. **Shell, Exec Server, and Filesystem Mutation**：shell parsing、execpolicy、exec-server、remote/local execution。
11. **Patches as a Mutation Protocol**：把 patch 作为 parse/verify/approve/mutate 协议，而不是 shell 文本。
12. **Hooks and Human Approval**：hook trust、preview/run、approval、Guardian 和 headless rejection。
13. **Sandboxes and Managed Networking**：permission profile 到平台 sandbox/helper/proxy 的转换链。

## 第四部：把 Runtime 打开给 Client

_多个 client 共享同一个 thread model，runtime 才成为平台。_

14. **App-Server as Local Distributed System**：protocol、transport、serialization、backpressure、server-to-client requests。
15. **SDKs, Daemon, and Remote Control**：Python app-server SDK、TypeScript exec SDK、daemon 和 remote control。
16. **The Terminal UI as Inline Runtime Client**：inline scrollback TUI、event loop、rendering、streaming 和 resize reflow。

## 第五部：扩展系统

_扩展点只有在信任边界明确时才有价值。_

17. **MCP as Runtime Tool Protocol**：RMCP transport、OAuth、Codex MCP facade、hosted app tools、tool provenance。
18. **Skills, Plugins, Connectors, and Typed Extensions**：skills、plugins、connectors、typed extension 四个平面。
19. **External Agent Migration and Compatibility Bridges**：外部配置和 session 的保守迁移。

## 第六部：超越单个 Turn 的协作

_当动作可持久化，系统才能协调 agents、tasks、memory 和 cloud workflows。_

20. **Multi-Agent Threads and Interaction Graphs**：spawn edges、mailboxes、agent-control tools 和 trace graph。
21. **Cloud Tasks and Agent Identity**：cloud task lifecycle、patch preflight、agent identity、task authorization。
22. **Memories and Long-Term Context**：memory read/write、Stage 1/2 consolidation、redaction、restricted internal agents。

## 第七部：发布与治理

_架构能否长期存在，取决于 release、tests 和 governance 是否强制它。_

23. **Build Systems and Generated Contracts**：Cargo、Bazel、generated schemas 和 workspace-root tests。
24. **Packaging, Release, and Native Dependencies**：npm packages、GitHub releases、installers、signing、V8 和 bubblewrap。
25. **CI, Policy, and Architectural Governance**：CI lanes、boundary checks、argument-comment lint、schema drift 和 release gates。

## Epilogue: What to Steal

总结可迁移模式：typed event boundary、event-sourced replay、capability-routed
tools、policy before execution、declarative extension planes、client-neutral
runtime、observe-first tracing、CI-enforced architecture。
