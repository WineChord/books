# 模式索引

这一页汇总全书反复出现的可迁移设计模式。它们不是 Codex 独有技巧，而是任何能检查文件、运行命令、调用外部工具或服务多种客户端的 LLM 产品都要面对的架构动作。

## 模式列表

<div class="pattern-grid">
  <div class="pattern-card">
    <h3>先读类型边界</h3>
    <p>先读 enum 和 struct，再读长函数。`Op`、`Submission`、`Event` 和 app-server requests 会先暴露产品契约。</p>
    <p><a href="chapter-04">第 4 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>Queue Pair Runtime</h3>
    <p>客户端提交 operation，同时监听 events。TUI、exec 和 app-server 因此可以共享一个 core runtime。</p>
    <p><a href="chapter-05">第 5 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>Turn 作为控制单元</h3>
    <p>一次 turn 聚合上下文、模型采样、工具、hooks、compaction 和完成条件。</p>
    <p><a href="chapter-06">第 6 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>工具即产品契约</h3>
    <p>工具不是函数指针。它携带 schema、可变性、hooks、取消、输出格式和用户可见效果。</p>
    <p><a href="chapter-07">第 7 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>用 Patch 而不是盲写文件</h3>
    <p>结构化补丁让编辑可审查、可审批、可生成 diff，也更容易归因到某次 turn。</p>
    <p><a href="chapter-08">第 8 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>审批作为控制面</h3>
    <p>approval policy、permission hooks、Guardian review 和网络策略 amendment 位于单个工具之上。</p>
    <p><a href="chapter-09">第 9 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>沙箱作为运行时变换</h3>
    <p>Codex 把沙箱看成对执行请求的变换，由平台、策略、权限和 retry 语义共同决定。</p>
    <p><a href="chapter-10">第 10 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>通过注入扩展</h3>
    <p>Skills、plugins、app mentions 和 MCP inventory 变成 turn-scoped context 和 tools，而不是散落的特殊循环。</p>
    <p><a href="chapter-11">第 11 章</a></p>
  </div>
  <div class="pattern-card">
    <h3>一个 Runtime，多种接入面</h3>
    <p>TUI 和 app-server 的呈现方式不同，但都消费同一个 session model 产生的结构化 events。</p>
    <p><a href="chapter-12">第 12 章</a></p>
  </div>
</div>

## 安全地阅读模式

模式必须贴住证据才有价值。每个模式对应的章节都提供证据表、固定到公开 commit 的源码链接、面向初学者的解释和一个阅读练习。想一次性回到源码，请看 [源码索引](source-atlas)。
