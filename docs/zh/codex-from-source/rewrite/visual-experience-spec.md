# 视觉体验规范

这份规范定义 *Codex From Source* 的视觉理解层。它不是主题样式指南，而是把一本
源码等价的技术书做成可视化、可交互、可享受阅读系统的准出标准。

参考目标是 `claude-code-from-source` 的交互密度：章节图不是被动插图，而是模拟器、
状态机、流水线、计算器、图探索器和决策工具。Codex 的目标不是照抄，而是在源码
锚点、双语一致性、审美约束和可访问性上超过它。

## 核心主张

网站不是 Markdown renderer，而是 Agent runtime 的视觉解释系统。

每个重要运行时概念都必须有一个视觉归宿。正文解释架构为什么存在；交互让读者能
在脑中模拟架构。如果读者必须完全靠记忆保存 lifecycle、routing rule、trust
boundary、state machine 或 component relationship，页面就是失败的。

## 与参考站的差距

当前 Codex 站点已有较好的排版、导航和静态图，但参考站进一步做到了四点：

1. 把 Mermaid slot 当作章节专属交互组件的占位符。
2. 每个交互都是领域专属的：工具流水线像流水线，状态机像状态机，缓存解释器像
   计算器。
3. 动效用于解释因果：sequence、state change、selection、routing、completion。
4. 信息密度高但受控：读者看到很多有用界面，但每个界面只有一个清晰任务。

Codex 必须采用这个模型，并用更严格的美学、双语一致性、源码锚点和可访问性超过它。

## 不可妥协原则

1. **视觉用于教学，不用于装饰。** 每个 icon、动画、图、卡片和控件都必须降低认知
   负担，或揭示系统不变量。
2. **一个概念只有一个 canonical visual。** 概念可以跨章节引用，但完整视觉解释只
   能有一个主场。
3. **交互必须回答问题。** 点击、悬停、拖拽、scrub、filter、toggle、step 都必须
   揭示一个具体架构选择。
4. **美感是正确性的一部分。** 间距尴尬、icon 泛化、动效嘈杂、对比弱、文字拥挤、
   构图失衡都会降低信任和理解，因此都是 review 失败。
5. **静态 Mermaid 是 fallback，不是目标。** Mermaid 可以保留为源码友好的脚手架，
   但最终出版质量要求核心概念有定制交互解释器。
6. **双语一致是强制要求。** 中英文页面必须拥有同等视觉组件、源码锚点、交互能力和
   解释密度。

## 视觉词汇

本书需要稳定的 icon 与符号系统。不能每章发明一套视觉风格。

| 概念族 | Icon 母题 | 色彩角色 | 交互角色 |
| --- | --- | --- | --- |
| Runtime / turn loop | 环形路径、pulse、frame | terracotta 主色 | step、play、pause、continue |
| Protocol / contract | bracket、document、typed node | charcoal/cream 加 terracotta 边 | inspect fields、map event shapes |
| Tools / side effects | tool glyph、gate、pipeline segment | terracotta 加状态色 | route、approve、fail、retry |
| Policy / security | shield、lock、boundary line | amber 表示 caution，red 只表示 failure | compare decisions and gates |
| State / persistence | stack、timeline、ledger | muted neutral 加高亮 delta | scrub history、inspect snapshots |
| Client / UI | terminal frame、panel、cursor | cream/charcoal 加 accent cursor | replay rendering/input paths |
| Extension / MCP / plugins | socket、node port、package | cool neutral 加 provenance tag | show trust plane and ownership |
| Build / release / CI | conveyor、check lane、artifact box | green success、amber review | trace source to artifact |
| Multi-agent / cloud | branching graph、worker chip、mailbox | role colors | fan-out、join、observe |

Icon 规则：

- 有准确概念时优先使用 lucide；只有领域概念足够具体时才使用自定义 SVG。
- Icon 必须在 16、20、32 px 下都视觉平衡。
- 禁止 emoji、装饰 blob、通用 clipart、一次性玩笑符号。
- icon-only 控件必须有可见 focus state 和 accessible name。
- 状态色必须一致：green 表示 completed/safe，amber 表示 pending/review，red 表示
  blocked/failure，terracotta 表示 active/primary。

必备可复用 icon 名称：

`user`、`model`、`runtime`、`thread`、`turn`、`event`、`item`、`tool`、
`shell`、`file`、`patch`、`approval`、`hook`、`sandbox`、`network`、
`client`、`cloud`、`memory`、`schema`、`release`、`ci`、`error`、
`source`、`policy`、`mcp`、`skill`、`plugin`、`connector`、`trace`、
`state`、`config`、`auth`。

实现可以增加 icon，但不能随意重命名这些核心概念。术语必须与章节正文、source
atlas 和实现引用保持一致。

## 动效语言

动效必须让因果关系可见。

允许的动效：

- pipeline 和 lifecycle 的 step activation；
- node focus、link highlighting、data-flow direction；
- timeline scrub 和 progressive reveal；
- 解释 cost、latency、token use、fan-out 的计数动画；
- 组件进入视口的小幅 transition。

拒绝的动效：

- 装饰性粒子、orb、bokeh、ambient loop；
- 不表达状态却无限循环的动画；
- 干扰阅读的大型 parallax 或 hero spectacle；
- 读者阅读时移动正文文字的动画。

时间标准：

- micro interaction：100-180 ms；
- step transition：180-320 ms；
- pipeline playback：每个主步骤 350-700 ms；
- 必须尊重 `prefers-reduced-motion`，并提供即时状态切换路径。

## 页面级必备界面

每章必须包含以下界面，除非 reviewer 明确接受并记录例外。

1. **Chapter Visual Brief**
   - 位于开篇附近。
   - 说明本章主要 mental model。
   - 展示本章复用 icon 的 legend。
   - 用一句话说明读者读完后应能在脑中模拟什么。

2. **Primary Interactive Explainer**
   - 每章一个重量级组件。
   - 必须针对本章核心问题。
   - 至少有 3 个有意义的状态或交互。
   - 桌面与移动端都必须可用。
   - 必须包含 no-JS/static fallback，且 fallback 保留同一个教学重点。

3. **Source Anatomy Panel**
   - 替换或升级当前章末 Source Map。
   - 解释引用文件为什么重要，而不只是列出链接。
   - 按角色分组：contract、runtime、policy、UI、persistence、tests、generated
     artifact、release。

4. **Leadership Scan Surface**
   - 给跳过 deep dive 的技术负责人看的紧凑视觉摘要。
   - 必须展示 problem、architectural bet、trade-off、transferable pattern。

5. **Pattern Cards**
   - 五个 `Apply This` 模式必须变成可扫描卡片。
   - 卡片包含 icon、problem、adaptation、pitfall，布局保持一致。

6. **Visual Comprehension Checks**
   - 每章结尾提供 2-3 个短检查题，必须绑定 primary explainer。
   - 检查题要求读者预测 route、gate、state transition、failure path、
     ownership boundary 或 source role。
   - 检查题必须能仅凭视觉层和章节正文回答。

## 结构化 VisualSpec 记录

每个源码阅读章节在实现前都必须有一条 `visualSpec` 记录。它既是规划产物，也是
review 对象。

必备形状：

```ts
// Illustrative - visual planning metadata, not runtime source.
type ChapterVisualSpec = {
  id: string;
  chapter: string;
  displayName: {
    en: string;
    zh: string;
  };
  concept: {
    en: string;
    zh: string;
  };
  primaryInteractive: {
    component: string;
    readerQuestion: {
      en: string;
      zh: string;
    };
  };
  localizationContract: {
    languages: Array<"en" | "zh">;
    requiredSurfaces: string[];
  };
  secondaryDiagrams: string[];
  iconSet: string[];
  sourceAnchors: Array<{
    role: "contract" | "runtime" | "policy" | "ui" | "persistence" |
          "tests" | "generated-artifact" | "release" | "ci";
    path: string;
    pinnedUrl: string;
    architectureClaim: string;
    readerTakeaway: string;
    visualState: string;
    leakageNotes: string;
  }>;
  fallback: "static-svg" | "table" | "step-list" | "mermaid";
  motionPolicy: "none" | "step" | "playable" | "scrubbable";
  requiredStatesOrEdges: string[];
  invariants: string[];
  misconceptionsCaught: string[];
  comprehensionChecks: Array<{
    question: string;
    expectedAnswer: string;
    visualState: string;
    sourceEvidence: string;
    sourceEvidenceRefs: string[];
    misconceptionCaught: string;
  }>;
  reviewQuestions: string[];
};
```

规则：

- `primaryInteractive` 必须命名真实组件或计划组件。
- `localizationContract` 必须要求所有读者可见 surface 都提供英文和中文：title、
  concept、reader question、legend labels、controls、state/edge labels、source anatomy
  summaries、comprehension prompts、review checklist 和 fallback text。
- `secondaryDiagrams` 必须列出 1-3 个支撑视觉。
- `iconSet` 必须使用本规范中的可复用 icon 名称。
- `sourceAnchors` 必须是结构化条目，包含 role、pinned URL、architecture claim、
  reader takeaway、visual state 和 leakage notes。普通链接列表无效。每个 pinned URL
  必须指向具体源码行，不能停留在文件开头占位。checker 会通过 `CODEX_SOURCE_ROOT`、
  sibling `../codex` checkout，或 pinned GitHub raw source 校验对应行，因此 fresh CI
  checkout 也能运行同一个门禁。
- `fallback` 必须为 no-JS、reduced-motion 和可访问性 fallback 保留同一个概念。
- `requiredStatesOrEdges`、`invariants` 和 `misconceptionsCaught` 必须把源码等价契约
  写到 reviewer 可以拒绝浅层视觉的程度。
- `comprehensionChecks` 必须包含 expected answers 和 source evidence，且 evidence
  至少引用同一 record 中一个 `sourceAnchors` path。机器可读 record 还会携带
  `sourceEvidenceRefs`，它是从当前 anchors 派生出的 `path#Lnumber` 引用列表。
- `reviewQuestions` 必须具体。“好不好看？”无效；“读者能否预测这个 tool call 是否
  到达执行阶段？”有效。

覆盖门禁：

- 25 章加结语全部有 `visualSpec` 记录；
- 每条记录都有 `primaryInteractive`、fallback、source anchors、icon set 和
  review questions；
- 没有核心机制只依赖正文加 Mermaid；
- 中英文页面共享等价记录。
- 面向 reviewer 的记录镜像和台账必须匹配 canonical records，不能静默漂移。

机器可读 canonical records 位于 `src/visual/visual-specs.mjs`。人类可读镜像位于
[章节 VisualSpec 记录](visual-spec-records) 和
`docs/codex-from-source/rewrite/visual-spec-records.md`。实现必须使用稳定的章节
record identity，并本地化展示文本，而不是复制出两套会漂移的架构契约。
`npm run check:visual-spec` 是这份数据的最低执行门禁。

canonical `sourceAnchors`、invariants 和 review questions 是内部源码等价断言，
不能直接当作读者可见 UI 的本地化文案。章节只有在实现提供英文和中文组件文案，
并在台账中记录两种语言的截图和 review 证据后，才能离开 `planned` 状态。

## 实现架构

rewrite workspace 是内部规划材料，按设计不进入 public routes。“Approved for
publication” 指未来读者可见的视觉实现，不指这个未发布的 rewrite workspace 本身。

实现契约如下：

1. `src/visual/visual-specs.mjs` 拥有章节记录、icon vocabulary、source snapshot、
   target phase，以及 internal/public 状态。
2. `scripts/check-visual-spec.mjs` 校验 26 条记录、稳定 route、双语 label、source
   anchors、icon names、fallback modes、motion policy、required states、
   invariants、misconceptions、comprehension checks 和 target phase。
3. 后续交互组件必须用 `primaryInteractive` component key 注册。只有 planned key
   没有问题，但未注册实现不能称为 visually complete。
4. 章节渲染应使用 route-keyed visual registry，而不是 MDX 里的临时 import。预期插入点是：
   opening 后的 visual brief、第一个重要 deep dive 前的 primary explainer、chapter
   nav 前的 source anatomy，以及 `Apply This` section 中的 pattern cards。
5. fallback rendering 必须由同一条 record 数据驱动。static SVG、table、step list 或
   Mermaid fallback 不能和交互组件讲不同的 teaching claim。
6. islands 必须按 route 和 visibility hydrate。单个章节不能加载全书所有视觉组件。

spec-only 变更使用单独门禁：`npm run verify`、`npm run check:visual-spec`、无私有路径
泄漏、暂存区无 `.vscode`，以及至少三个 reviewer 批准 spec contract。实现变更还需要
下面的 browser、screenshot、accessibility 和 live deploy 门禁。

## 组件目录

先建立可复用 primitive，再实现章节专属组件。

| 组件类型 | 目的 | 最小交互 |
| --- | --- | --- |
| System Map | 展示子系统关系和所有权 | hover/tap node、highlight path、link to chapter/source |
| Lifecycle Stepper | 教有序 runtime flow | next/back/play、active detail、failure branch |
| Policy Gate Stack | 解释分层决策 | toggle policy inputs、show decision path |
| Contract Explorer | 展示 typed public surface | inspect message shape、stable/experimental/deprecated tags |
| State Machine Viewer | 解释状态转换 | choose event、animate transition、show illegal transitions |
| Pipeline Simulator | 展示输入如何经过阶段转换 | run sample input、fail selected stage、inspect output |
| Source Anatomy Cards | 连接叙事和源码 | filter by role、reveal why file matters、pin source links |
| Cost/Latency Calculator | 解释性能权衡 | sliders/toggles、live totals、threshold markers |
| Timeline / Gantt | 展示并行工作和顺序 | scrub/play、reveal dependencies and critical path |
| Matrix Explorer | 比较 client、backend、permission 或 mode | filter rows、highlight differences、summarize choice |
| Trace Replay | 展示事件/输出重建 | step through events、show UI/model/source views |
| Boundary Diagram | 解释 trust、sandbox、network、extension plane | toggle actor、show allowed/blocked edges |

每个组件必须有一个明确的 reader question。例如：“一个 tool call 变成 side effect
之前必须经过什么？”

每个交互解释器都必须暴露四个认知脚手架：

1. **Initial state** - 交互开始前读者正在看什么；
2. **What changed** - 当前操作改变了什么；
3. **Why it matters** - 这个变化对应的架构后果；
4. **Source evidence** - 支撑该说法的文件角色或 source anchor。

## Codex 章节视觉计划

下表定义第一轮实现目标。组件名是概念名，最终代码名可以不同，但 reader question
必须被覆盖。

| 章节 | 必备主解释器 | Reader Question |
| --- | --- | --- |
| 1. Architectural Bet | Bounded Agent OS Map | 哪些层把模型意图变成受治理的工作？ |
| 2. Distribution to Router | Startup Route Timeline | 命令意图如何在 runtime 启动前被收窄？ |
| 3. Config/Auth/Requirements | Constraint Envelope Builder | 哪些输入会形成最终 runtime envelope？ |
| 4. Protocol Boundary | Submission/Event Contract Explorer | client 和 runtime 之间的稳定语言是什么？ |
| 5. Threads/Sessions/State | Durable Thread Ledger | 一个 turn 如何变成可恢复状态？ |
| 6. Turn Loop | Turn Loop Simulator | runtime 为什么以及如何持续循环？ |
| 7. Model Providers | Streaming Provider Comparator | 不同 transport 如何归一成一个 stream？ |
| 8. Observability/Trace | Rollout Trace Replay | runtime facts 如何变成可回放历史？ |
| 9. Tool Routing | Tool Spec to Handler Router | 为什么模型可见 schema 不是执行权限？ |
| 10. Shell/Exec/FS | Execution Backend Pipeline | shell 和 filesystem effect 在哪里被授权？ |
| 11. Patch Protocol | Patch Application Workbench | 结构化编辑如何避免不透明 shell mutation？ |
| 12. Hooks/Approval | Human Gate Stack | 哪些 gate 可以停止或修正命令？ |
| 13. Sandboxes/Network | Containment Boundary Explorer | 不同平台 sandbox 和 network mode 如何变化？ |
| 14. App-Server | JSON-RPC Contract Map | client 如何共享 runtime ownership？ |
| 15. Client Surfaces/Daemon Lifecycle | Client Reachability Matrix | 不同客户端表面如何到达同一份契约？ |
| 16. TUI | Event Renderer Lab | terminal UI 如何投影 runtime events？ |
| 17. MCP | External Tool Trust Plane | MCP 如何在不缠住 runtime 的情况下增加工具？ |
| 18. Skills/Plugins | Extension Provenance Explorer | 不同 extension 类型贡献什么能力？ |
| 19. Migration/Compatibility | Compatibility Lane Board | 新旧 surface 如何并存？ |
| 20. Multi-Agent | Agent Graph Orchestrator | child agents 如何协同但不暴露内部过程？ |
| 21. Cloud Tasks | Remote Task Contract Timeline | 工作转到远程后，哪些东西仍然必须留在本地？ |
| 22. Memories | Memory Side-Channel Explorer | 长期上下文如何进入而不接管 runtime？ |
| 23. Build Systems | Generated Contract Drift Viewer | 为什么 schema 是产品产物？ |
| 24. Packaging/Release | Release Artifact Conveyor | 源码如何变成可安装的平台包？ |
| 25. CI/Governance | Policy Lane Dashboard | 哪些检查让架构不会随时间腐蚀？ |
| Epilogue | Transfer Pattern Atlas | 读者可以复用哪些视觉化架构模式？ |

## 交付阶段

完整视觉层范围很大，必须分阶段交付，避免网站还没有实现就提前声称完成。

| 阶段 | 范围 | 准出标准 |
| --- | --- | --- |
| P0 Contract | `visualSpecs`、checker、design tokens、registry architecture | `npm run check:visual-spec` 校验 26 条记录 |
| P1 Pilots | 第 1、6、9、12、16、20 章 | 验证 architecture map、turn loop、tool gate、human gate、TUI renderer、multi-agent graph |
| P2 Core | 第 2-14 章，排除 P1 章节 | 覆盖 startup、config、protocol、state、providers、trace、exec、patch、sandbox、app-server |
| P3 Extensions and Governance | 第 15、17-25 章 | 覆盖 SDK、MCP、extensions、compatibility、cloud、memory、build、release、CI |
| P4 Synthesis | 结语和跨章节 pattern atlas | 让可迁移经验可以被视觉化扫描 |

只有 P0 可以在读者可见组件不存在时标记完成。planned chapter 可以出现在 ledger 中，
但 “visually complete” 只允许用于 implemented、verified、approved 的行。

## 章节视觉密度

每章最低要求：

- 1 个 primary interactive explainer；
- 1 个 secondary visual，可以是静态自定义 SVG、紧凑交互矩阵或 source anatomy panel；
- 1 个 leadership scan surface；
- 5 个 pattern cards。

目标要求：

- 1 个 primary interactive explainer；
- 2-3 个 secondary visuals；
- 1 个升级后的 source anatomy panel；
- 当章节讨论 policy、routing、state、latency、concurrency 或 compatibility 时，deep
  dive 中还要有一个 mini interaction。

上限：

- 除非拆章或 reviewer 明确批准，否则单章不应超过 5 个 major visual blocks。

## 美学标准

视觉系统应该像高端工程专著，不像 SaaS dashboard，也不像教学玩具。

具体 tokens：

| Token | 值 | 用途 |
| --- | --- | --- |
| `cream` | `#f5f4ed` | 页面背景和安静界面 |
| `beige` | `#e8e6dc` | 次级界面和 code-adjacent fill |
| `terracotta` | `#d97757` | active path、primary controls、current step |
| `charcoal` | `#141413` | light-mode 正文和 dark-mode 背景 |
| `dark-surface` | `#1e1e1c` | dark-mode tool surfaces |
| `secondary` | `#30302e` | light mode 次级正文 |
| `muted` | `#87867f` | metadata、disabled state、安静 label |
| `border` | `#c2c0b6` | 结构线和 card border |
| `highlight` | `#eda100` | caution、pending review、focused comparison |

只有具名语义角色和 contrast evidence 同时存在时，才能增加额外语义色。禁止未追踪的一次性颜色。

可观察 craft rules：

- spacing 使用 4 px grid；major visual surfaces 的内部节奏使用 16、24、32 或 48 px；
- diagram stroke 普通边使用 1.5-2 px，active path 使用 2.5-3 px；
- icon-only controls 在 touch surface 上为 44 x 44 px，在密集桌面 toolbar 上至少
  32 x 32 px；
- focus ring 使用 2 px terracotta 或 highlight outline，并至少有 2 px offset；
- component frame 圆角 4-8 px；nested cards 继续禁止；
- label 必须在 200% browser zoom 和 320 px 宽度下容纳；
- visual QA 必须截图检查 overlap、clipped labels 和 ambiguous active state。

必须具备：

- 克制、书籍化的 typography；
- 正文和视觉界面之间有清晰节奏；
- 间距慷慨但不浪费；
- 信息密度高但层级清楚；
- 控件精确、触感稳定，不卖萌；
- dark mode 是设计出来的，不是反色；
- 320 px、375 px、768 px、1024 px、1440 px 都不能有文字碰撞、遮挡或隐藏关键信息；
- 禁止单一色相主题；
- 禁止装饰性 gradient、orb、bokeh 背景；
- card 只用于重复项、modal 和真正 framed tools；
- 禁止 card 套 card；
- 除 book cover 或明确媒体对象外，圆角不超过 8 px。

每个 major component 必须通过“眯眼测试”：一眼能看出 active state、primary path、
blocked path 和 next action。

## 可访问性与输入标准

每个交互组件必须支持：

- 所有控件可键盘操作；
- 可见 focus state；
- icon-only controls 有 accessible name；
- 陌生 icon 有 tooltip 或可见 label；
- 状态暴露时使用 `aria-current`、`aria-expanded`、`aria-pressed` 或 live region；
- pointer 与 touch 能力一致；
- reduced-motion mode；
- 关键信息不能 hover-only；
- 除真正 modal 外不能 trap focus；
- 移动端 hit target 可读可点，核心控件至少 44 x 44 px；
- 每种状态都有非颜色编码；
- 视觉解释器提供 screen-reader summary。

如果组件无法做到可访问，必须降级成清晰的静态图和表格，而且不能损失章节核心含义。

## 性能标准

视觉层必须在明确预算内保持阅读响应性。

- 按章节 lazy-load 交互 island。不渲染某个 visual island 的 route，必须加载
  0 bytes 该 island 的 JS。
- 每个章节专属 visual island 必须不超过 45 kB gzip JS。至少 5 个章节共用的
  shared visual runtime 可以放宽到 90 kB gzip。
- 可确定图优先用 SVG/HTML/CSS。Canvas/WebGL 必须有可测需求，并提供语义等价的
  静态 fallback。
- D3 force simulation 必须立即渲染稳定初始布局，并在 4x CPU-throttled desktop
  profile 下 1,200 ms 内 settle。
- 自定义交互在 first render、resize、theme switch、reduced-motion switch 或一次完整
  interaction probe 中，不能产生超过 50 ms 的 browser long task。
- 新增视觉层后，章节 CLS 必须不超过 0.03；相对于同页无 island 基线，LCP 增量不能超过
  250 ms。
- 动画不能阻塞滚动、文本选择或 keyboard focus 移动。
- `npm run verify` 是基础门禁；进入 implemented 的行还必须提供 bundle report，以及覆盖
  desktop、mobile、light mode、dark mode、reduced motion 的 Playwright trace 或截图 probe。

## 源码完整性标准

视觉解释器必须讲模式和架构，不得泄漏精确源码实现。

- 组件 fixture 中禁止逐字源码。
- 公开文件名、公开 type 名和公开 function 名可以作为锚定 label 使用，前提是链接到
  固定 source snapshot，并且确实帮助解释架构。
- pseudocode、mock payload 和组件 fixture 中的示例 identifier 必须是说明性名称，
  不能复制私有或内部 prompt 文本。
- 源码链接必须固定到已审计 source snapshot。
- Source anatomy panel 解释文件角色，不复刻文件内容。
- 模拟数据流必须使用简化示例数据。
- 禁止内容包括复制的 function body、专有 prompt 文本、secret、私有路径、内部
  constant，以及未锚定的近似逐字实现逻辑。

## 实现台账

后续实现必须维护：

`docs/codex-from-source/rewrite/visual-implementation-ledger.md`

中文镜像台账位于：

`docs/zh/codex-from-source/rewrite/visual-implementation-ledger.md`

台账记录：

- chapter；
- component name；
- reader question；
- current status；
- screenshots tested；
- mobile status；
- accessibility status；
- reviewer approvals；
- known residual risks。

台账未完成的章节，不能称为视觉层完成。

## 完成定义

一章的视觉层只有同时满足以下条件才算完成：

1. primary explainer 直接回答本章核心 reader question；
2. 只看 leadership scan surface 并操作 primary explainer，也能理解本章高层结构；
3. source anatomy panel 说明每个 source anchor 为什么重要；
4. 中英文页面视觉和标签等价；
5. 所有控件支持 keyboard、pointer、touch；
6. 320 px 与 375 px 移动截图没有重叠、裁切或隐藏关键信息；
7. 768 px、1024 px 与 1440 px 平板/桌面截图构图平衡、信息密度可读；
8. reduced-motion mode 可用；
9. 组件不复刻精确源码；
10. 至少三个独立 reviewer 批准发布。

## Review 角色

每次规范修订和实现 pass 都必须使用高 reasoning effort 的全新 reviewer agents。实现
pass 至少需要三个 reviewer；大改或争议变更应使用四个或更多。

1. **Product Experience Reviewer**
   - 检查视觉方向是否服务目标读者旅程。
   - 验证层级、节奏、导航和页面状态。
   - 任何让体验更不清晰、更不可信或偏离本书定位的改动都必须阻塞。

2. **Visual and Aesthetic Reviewer**
   - 审查美感、层级、icon 质量、动效品味、typography、间距、色彩，以及与参考站的差距。
   - 任何像通用文档、dashboard 皮肤或粗糙原型的结果都必须阻塞。

3. **Cognitive and Source-Equivalence Reviewer**
   - 审查视觉是否真的提高源码架构理解。
   - 美观但不教学的视觉必须阻塞。
   - 检查读者是否仍然能不打开源码理解系统。

4. **Interaction, Accessibility, and Performance Reviewer**
   - 审查 keyboard、touch、responsive layout、reduced motion、bundle scope、
     runtime errors 和浏览器行为。
   - invisible controls、hover-only 内容、移动端 overflow、无关页面加载重型代码都必须阻塞。

5. **Implementation Feasibility Reviewer**
   - 检查要求是否能在现有 Astro/React 栈中验证和维护。
   - 模糊、脆弱、不现实或不可维护的要求都必须阻塞。

大改时可增加：

- 双语一致 reviewer；
- 源码泄漏 reviewer；
- 竞品基准 reviewer。

## Review Packet

review 开始前，作者必须提供 review packet。

规范变更必须包含：

- 变更或新增的章节；
- goals 和 non-goals；
- 影响的章节、状态、断点和语言；
- 每条规范要求的 acceptance criteria；
- 已知风险或开放问题。

实现变更必须包含：

- 实现摘要和变更组件；
- 320、375、768、1024、1440 px 截图；
- light/dark mode 证据；
- 英文和中文证据；
- keyboard、touch、focus、reduced-motion、contrast 证据；
- build 和本地验证结果；
- 对本规范的有意偏离。

## 评分规则

每个 reviewer 对每个类别打 0-4 分。

| 分数 | 含义 |
| --- | --- |
| 0 | 该类别失败，或证据不足无法判断。 |
| 1 | 重大缺口，方向错误或过于模糊。 |
| 2 | 部分可接受，但需要实质修订。 |
| 3 | 强，只有小问题。 |
| 4 | 优秀，清晰、完整且证据充分。 |

加权类别：

| 类别 | 权重 | 阻塞阈值 |
| --- | ---: | --- |
| Reader value and product fit | 20% | 低于 3 |
| Spec clarity and testability | 20% | 低于 3 |
| Visual coherence and craft | 20% | 低于 3 |
| Accessibility and usability | 20% | 低于 3；核心控件失败自动阻塞 |
| Implementation feasibility and maintainability | 15% | 低于 3 |
| Evidence quality | 5% | 低于 3 |

发布要求：

- 无 blocking issues；
- 加权得分至少 85%；
- 没有任何单项低于 3；
- 所有强制 reviewer 都明确写出 “Approved for publication”；
- 只要任一 reviewer 要求修改，修复后必须重新用新的 reviewer pass。

## Blocking Issue Policy

满足以下任一条件就是 blocking issue：

- 规范包含冲突、模糊或不可测试的要求；
- 两个合理实现者会根据同一要求做出实质不同的结果；
- 核心读者流程变得不清晰、更慢、隐藏或不可信；
- accessibility 在 contrast、keyboard access、focus visibility、text scaling、
  reduced motion 或 screen-reader structure 上失败；
- 移动端或桌面布局重叠、裁切、隐藏控件，或要求横向滚动才能理解主概念；
- 实现无法通过截图、交互检查、测试或手工验收验证；
- 方案依赖脆弱的一次性行为，而不是可复用视觉规则；
- 性能、资源体积或渲染行为明显降低阅读体验；
- 改动违背本书定位、voice 或导航模型；
- 视觉很好看但不符合源码架构；
- 中心 runtime 概念仍然只依赖正文加 Mermaid。

blocking issue 必须修复后才能批准。blocker 不能被接受为 known risk。要移除
blocker，要么修复问题，要么降低范围，不再声称已满足失败的要求。

## Non-Blocking Issue Policy

只有同时满足以下条件，问题才可以被视为 non-blocking：

- 核心读者旅程仍然成立；
- accessibility 没有退化；
- 规范仍然清晰且可测试；
- 没有评分类别低于批准阈值；
- reviewer 记录了具体 follow-up、owner 和目标阶段。

示例：文案润色、轻微间距优化、可选插图增强，或不影响已批准行为的未来组件整合。

## 反复 Review 协议

1. 实现或修订视觉层。
2. 运行本地验证：`npm run verify`、browser screenshots、interaction probes、
   private-path scans。
3. 使用高 reasoning effort 启动至少三个全新 reviewer agents。
4. 汇总 reviewer findings 成优先级 action plan。
5. 修复所有 blocking issues，以及所有不破坏架构即可修的 meaningful non-blocking
   issues。
6. 重新运行验证。
7. 重新启动全新 reviewer agents。
8. 重复直到所有强制 reviewer 都报告：无 blocking、无 meaningful non-blocking，并批准发布。

如果同一个 blocker 连续两个 review cycle 后仍然存在，必须先降低范围或重写要求，再进入下一轮。

因为“看起来够好”而提前停止，违反本规范。

## 发布门禁

发布视觉层变更前必须满足：

- `npm run verify` 通过；
- 生成产物无私有路径泄漏；
- 暂存区没有 `.vscode` 文件；
- Playwright 或 Chromium 截图覆盖 light/dark mode、英文/中文页面，以及 320、375、
  768、1024、1440 px 宽度；
- browser probes 确认没有页面级横向 overflow；
- browser probes 确认 diagram 非空，label 不与 node、arrow、code panel 或 controls 重叠；
- 每个新增交互组件至少在浏览器中实际操作一次；
- reduced-motion mode 已检查；
- 如有 autoplay，必须可 pause 和 reset；
- 重型交互 bundle 只发到相关章节；
- 视觉 claim 回链到 source atlas 条目或固定 source anchors；
- push 后 GitHub Pages workflow 通过；
- deploy 后 smoke test 线上 URL。

## 不可接受结果

以下结果即使 build 通过也必须失败：

- 中心 runtime 概念只有 prose + Mermaid；
- 组件很漂亮但比被替换的段落更不教学；
- 视觉语言每章随机变化；
- 控件存在但读者无法预判它会做什么；
- 移动端用户得到缩水或破碎解释；
- 中文页面落后英文页面；
- 动效吸引注意力却不展示因果；
- Source panel 只是链接列表；
- Pattern cards 只是重复文字，没有提高可扫描性；
- 最终效果像通用文档主题。
