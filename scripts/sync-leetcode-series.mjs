import { existsSync } from "node:fs";
import { readFile, writeFile, readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const outputPath = new URL("src/data/leetcode-series.ts", repoRoot);
const defaultQuestionCachePath = `/tmp/leetcode-cn-all-${new Date()
  .toISOString()
  .slice(0, 10)}.json`;
const defaultDoocsDir = "/tmp/doocs-leetcode";
const doocsRepoUrl = "https://github.com/doocs/leetcode";
const doocsLicense = "CC-BY-SA-4.0";
const romanTokens = new Map([
  ["i", 1],
  ["ii", 2],
  ["iii", 3],
  ["iv", 4],
  ["v", 5],
  ["vi", 6],
  ["vii", 7],
  ["viii", 8],
  ["ix", 9],
  ["x", 10],
]);
const difficultyLabels = new Map([
  ["EASY", "简单"],
  ["Easy", "简单"],
  ["MEDIUM", "中等"],
  ["Medium", "中等"],
  ["HARD", "困难"],
  ["Hard", "困难"],
]);
const curatedSeries = [
  {
    key: "jump-game",
    title: "跳跃游戏系列",
    titleEn: "Jump Game",
    description: "从一维可达性、最少跳数、同值传送、受限 DP 到区间策略，覆盖跳跃游戏的主要演化。",
    memberSlugs: [
      "jump-game",
      "jump-game-ii",
      "jump-game-iii",
      "jump-game-iv",
      "jump-game-v",
      "jump-game-vi",
      "jump-game-vii",
      "jump-game-viii",
      "jump-game-ix",
    ],
  },
  {
    key: "stock-trading",
    title: "股票买卖系列",
    titleEn: "Stock Trading",
    description: "把一次、无限次、两次、k 次、冷冻期、手续费和策略改写放在同一条状态机路线里练。",
    memberSlugs: [
      "best-time-to-buy-and-sell-stock",
      "best-time-to-buy-and-sell-stock-ii",
      "best-time-to-buy-and-sell-stock-iii",
      "best-time-to-buy-and-sell-stock-iv",
      "best-time-to-buy-and-sell-stock-v",
      "best-time-to-buy-and-sell-stock-with-cooldown",
      "best-time-to-buy-and-sell-stock-with-transaction-fee",
      "best-time-to-buy-and-sell-stock-using-strategy",
      "maximum-profit-from-trading-stocks",
      "maximum-profit-from-trading-stocks-with-discounts",
    ],
  },
  {
    key: "house-robber",
    title: "打家劫舍系列",
    titleEn: "House Robber",
    description: "线性、环形、树形、能力二分和分组约束共同构成“不选相邻”的 DP 系列。",
    memberSlugs: [
      "house-robber",
      "house-robber-ii",
      "house-robber-iii",
      "house-robber-iv",
      "house-robber-v",
    ],
  },
  {
    key: "paint-house",
    title: "粉刷房子系列",
    titleEn: "Paint House",
    description: "围绕相邻颜色不同，从固定三色扩展到多色、街区数量和对称位置约束。",
    memberSlugs: [
      "paint-house",
      "paint-house-ii",
      "paint-house-iii",
      "paint-house-iv",
    ],
  },
  {
    key: "n-sum",
    title: "N 数之和系列",
    titleEn: "N-Sum",
    description: "两数、三数、四数、K 和与树上两数之和，训练哈希、排序双指针和去重边界。",
    memberSlugs: [
      "two-sum",
      "two-sum-ii-input-array-is-sorted",
      "two-sum-iii-data-structure-design",
      "two-sum-iv-input-is-a-bst",
      "two-sum-less-than-k",
      "two-sum-bsts",
      "3sum",
      "3sum-closest",
      "3sum-smaller",
      "3sum-with-multiplicity",
      "4sum",
      "4sum-ii",
      "max-number-of-k-sum-pairs",
      "find-the-k-sum-of-an-array",
    ],
  },
  {
    key: "subarray-sum",
    title: "子数组和系列",
    titleEn: "Subarray Sum",
    description: "最大/最短/可整除/等于目标的连续子数组和，核心是前缀和、单调队列和动态规划。",
    memberSlugs: [
      "maximum-subarray",
      "minimum-size-subarray-sum",
      "maximum-size-subarray-sum-equals-k",
      "continuous-subarray-sum",
      "subarray-sum-equals-k",
      "shortest-subarray-with-sum-at-least-k",
      "binary-subarrays-with-sum",
      "subarray-sums-divisible-by-k",
      "maximum-subarray-sum-with-one-deletion",
      "number-of-sub-arrays-with-odd-sum",
      "maximum-number-of-non-overlapping-subarrays-with-sum-equals-target",
      "maximum-good-subarray-sum",
      "minimum-positive-sum-subarray",
      "maximum-subarray-sum-with-length-divisible-by-k",
    ],
  },
  {
    key: "substring",
    title: "子串窗口系列",
    titleEn: "Substring Windows",
    description: "把无重复、最小覆盖、拼接词、奇偶掩码和 K 约束子串放在同一个滑窗/状态压缩图谱里。",
    memberSlugs: [
      "longest-substring-without-repeating-characters",
      "longest-palindromic-substring",
      "substring-with-concatenation-of-all-words",
      "minimum-window-substring",
      "longest-substring-with-at-most-two-distinct-characters",
      "longest-substring-with-at-most-k-distinct-characters",
      "maximum-number-of-non-overlapping-substrings",
      "find-longest-awesome-substring",
      "number-of-wonderful-substrings",
      "count-complete-substrings",
      "count-substrings-that-satisfy-k-constraint-i",
      "count-substrings-that-satisfy-k-constraint-ii",
    ],
  },
  {
    key: "parentheses",
    title: "括号合法性系列",
    titleEn: "Parentheses",
    description: "从栈匹配扩展到生成、最长合法段、删除/插入修复、锁定位和网格路径合法性。",
    memberSlugs: [
      "valid-parentheses",
      "generate-parentheses",
      "longest-valid-parentheses",
      "different-ways-to-add-parentheses",
      "remove-invalid-parentheses",
      "score-of-parentheses",
      "minimum-add-to-make-parentheses-valid",
      "remove-outermost-parentheses",
      "maximum-nesting-depth-of-two-valid-parentheses-strings",
      "reverse-substrings-between-each-pair-of-parentheses",
      "minimum-remove-to-make-valid-parentheses",
      "minimum-insertions-to-balance-a-parentheses-string",
      "maximum-nesting-depth-of-the-parentheses",
      "valid-parenthesis-string",
      "check-if-a-parentheses-string-can-be-valid",
      "minimize-result-by-adding-parentheses-to-expression",
      "check-if-there-is-a-valid-parentheses-string-path",
    ],
  },
  {
    key: "islands",
    title: "岛屿网格系列",
    titleEn: "Islands",
    description: "同一张网格图上练 DFS/BFS、并查集、边界外扩、形状规范化和割点思路。",
    memberSlugs: [
      "number-of-islands",
      "number-of-islands-ii",
      "island-perimeter",
      "max-area-of-island",
      "number-of-distinct-islands",
      "number-of-distinct-islands-ii",
      "making-a-large-island",
      "number-of-closed-islands",
      "number-of-enclaves",
      "minimum-number-of-days-to-disconnect-island",
      "count-sub-islands",
      "count-islands-with-total-value-divisible-by-k",
    ],
  },
  {
    key: "range-sum-query",
    title: "区域和检索系列",
    titleEn: "Range Sum Query",
    description: "数组/矩阵、静态/动态四种组合，串起前缀和、树状数组和线段树。",
    memberSlugs: [
      "range-sum-query-immutable",
      "range-sum-query-2d-immutable",
      "range-sum-query-mutable",
      "range-sum-query-2d-mutable",
    ],
  },
  {
    key: "course-schedule",
    title: "课程表系列",
    titleEn: "Course Schedule",
    description: "拓扑排序、返回路径、贪心排课和传递可达性共同组成课程依赖路线。",
    memberSlugs: [
      "course-schedule",
      "course-schedule-ii",
      "course-schedule-iii",
      "course-schedule-iv",
    ],
  },
  {
    key: "meeting-rooms",
    title: "会议室系列",
    titleEn: "Meeting Rooms",
    description: "从区间冲突判断到最少会议室，再到房间编号调度，适合连续练扫描线和堆。",
    memberSlugs: ["meeting-rooms", "meeting-rooms-ii", "meeting-rooms-iii"],
  },
  {
    key: "word-break",
    title: "单词拆分系列",
    titleEn: "Word Break",
    description: "围绕字典切分，从能否拆分、输出所有句子扩展到连接词和最少额外字符，集中练前缀 DP、Trie 和记忆化搜索。",
    memberSlugs: [
      "word-break",
      "word-break-ii",
      "concatenated-words",
      "extra-characters-in-a-string",
    ],
  },
  {
    key: "coin-change",
    title: "零钱兑换与完全背包",
    titleEn: "Coin Change",
    description: "围绕金额凑法，比较最少硬币、组合计数、排列计数、平方数面额、车票区间 DP 和反推硬币面值。",
    memberSlugs: [
      "coin-change",
      "coin-change-ii",
      "combination-sum-iv",
      "perfect-squares",
      "minimum-cost-for-tickets",
      "inverse-coin-change",
    ],
  },
  {
    key: "knapsack-dp",
    title: "背包 DP 经典题",
    titleEn: "Knapsack DP",
    description: "把 0/1 背包、二维容量、目标和转换、分组计数和有限选择放在同一条状态定义路线里练。",
    memberSlugs: [
      "partition-equal-subset-sum",
      "target-sum",
      "ones-and-zeroes",
      "last-stone-weight-ii",
      "profitable-schemes",
      "number-of-ways-to-earn-points",
      "ways-to-express-an-integer-as-sum-of-powers",
    ],
  },
  {
    key: "string-dp",
    title: "字符串 DP 经典题",
    titleEn: "String DP",
    description: "覆盖匹配、编辑距离、交错、公共子序列、删除代价和超序列，重点练二维状态和边界初始化。",
    memberSlugs: [
      "regular-expression-matching",
      "wildcard-matching",
      "edit-distance",
      "interleaving-string",
      "longest-common-subsequence",
      "delete-operation-for-two-strings",
      "minimum-ascii-delete-sum-for-two-strings",
      "shortest-common-supersequence",
    ],
  },
  {
    key: "word-series",
    title: "单词搜索/拆分/接龙",
    titleEn: "Word Search, Break, Ladder",
    description: "把单词表建图、字典 DP、Trie 回溯和最短路径放到一组字符串图问题里。",
    memberSlugs: [
      "word-ladder",
      "word-ladder-ii",
      "word-break",
      "word-break-ii",
      "word-search",
      "word-search-ii",
      "design-add-and-search-words-data-structure",
    ],
  },
  {
    key: "n-queens",
    title: "N 皇后系列",
    titleEn: "N-Queens",
    description: "同一个回溯约束，分别训练枚举方案和只计数的剪枝写法。",
    memberSlugs: ["n-queens", "n-queens-ii"],
  },
  {
    key: "bst-iterator",
    title: "BST 迭代器系列",
    titleEn: "BST Iterator",
    description: "围绕中序遍历流，覆盖单向迭代、双向迭代和第 K 小查询。",
    memberSlugs: [
      "binary-search-tree-iterator",
      "binary-search-tree-iterator-ii",
      "kth-smallest-element-in-a-bst",
    ],
  },
  {
    key: "linked-list-reversal",
    title: "链表翻转系列",
    titleEn: "Linked List Reversal",
    description: "从整链表、区间、K 组到偶数长度组，集中练指针断开与重接。",
    memberSlugs: [
      "reverse-linked-list",
      "reverse-linked-list-ii",
      "reverse-nodes-in-k-group",
      "reverse-nodes-in-even-length-groups",
    ],
  },
  {
    key: "find-peak-element",
    title: "寻找峰值系列",
    titleEn: "Find Peak Element",
    description: "一维和二维峰值都依赖相邻比较与二分收缩，是局部最优存在性证明的典型系列。",
    memberSlugs: ["find-peak-element", "find-a-peak-element-ii"],
  },
  {
    key: "implement-trie",
    title: "Trie 实现系列",
    titleEn: "Implement Trie",
    description: "从基础前缀树扩展到带计数的前缀树，集中练节点结构、路径计数和删除更新。",
    memberSlugs: ["implement-trie-prefix-tree", "implement-trie-ii-prefix-tree"],
  },
  {
    key: "trie-search-design",
    title: "Trie 搜索与推荐设计",
    titleEn: "Trie Search and Suggestion Design",
    description: "从前缀树基础操作扩展到通配符、魔法字典、词根替换、搜索推荐、自动补全和单词方块。",
    memberSlugs: [
      "implement-trie-prefix-tree",
      "implement-trie-ii-prefix-tree",
      "design-add-and-search-words-data-structure",
      "implement-magic-dictionary",
      "replace-words",
      "search-suggestions-system",
      "design-search-autocomplete-system",
      "word-squares",
      "word-squares-ii",
    ],
  },
  {
    key: "manual-parser",
    title: "手写解析器系列",
    titleEn: "Manual Parser",
    description: "从 atoi、有效数字、括号表达式、逆波兰式、嵌套结构到 Lisp 表达式，集中练字符扫描、栈和递归下降。",
    memberSlugs: [
      "string-to-integer-atoi",
      "valid-number",
      "decode-string",
      "evaluate-reverse-polish-notation",
      "mini-parser",
      "parse-lisp-expression",
      "basic-calculator",
      "basic-calculator-ii",
      "basic-calculator-iii",
      "basic-calculator-iv",
      "compare-version-numbers",
    ],
  },
  {
    key: "insert-delete-getrandom",
    title: "O(1) 随机集合系列",
    titleEn: "Insert Delete GetRandom",
    description: "把数组和哈希表组合起来，分别处理无重复和允许重复的 O(1) 插入、删除、随机访问。",
    memberSlugs: [
      "insert-delete-getrandom-o1",
      "insert-delete-getrandom-o1-duplicates-allowed",
    ],
  },
  {
    key: "random-sampling-fairness",
    title: "随机抽样与公平概率系列",
    titleEn: "Random Sampling and Fairness",
    description: "围绕等概率、按权重概率、黑名单映射、水塘采样、洗牌和拒绝采样，建立抽奖公平性的算法基础。",
    memberSlugs: [
      "linked-list-random-node",
      "shuffle-an-array",
      "random-pick-index",
      "random-flip-matrix",
      "implement-rand10-using-rand7",
      "generate-random-point-in-a-circle",
      "random-point-in-non-overlapping-rectangles",
      "random-pick-with-weight",
      "random-pick-with-blacklist",
      "insert-delete-getrandom-o1",
      "insert-delete-getrandom-o1-duplicates-allowed",
    ],
  },
  {
    key: "cache-design",
    title: "缓存设计系列",
    titleEn: "Cache Design",
    description: "从 LRU、LFU 到带过期时间的缓存，集中练哈希表、双向链表、频次桶、淘汰策略和缓存一致性追问。",
    memberSlugs: [
      "lru-cache",
      "lfu-cache",
      "cache-with-time-limit",
    ],
  },
  {
    key: "stack-min-max-design",
    title: "栈结构设计系列",
    titleEn: "Stack Design",
    description: "围绕栈 API 扩展最值查询、频率弹出、批量增量和多栈容量，练辅助栈、链表、哈希表和有序结构。",
    memberSlugs: [
      "min-stack",
      "max-stack",
      "maximum-frequency-stack",
      "design-a-stack-with-increment-operation",
      "dinner-plate-stacks",
      "validate-stack-sequences",
      "build-an-array-with-stack-operations",
    ],
  },
  {
    key: "stack-queue-adapter",
    title: "栈队列互实现系列",
    titleEn: "Stack and Queue Adapters",
    description: "用两个基础容器模拟另一个容器，重点比较入队/出队、push/pop 的摊还复杂度和空结构边界。",
    memberSlugs: [
      "implement-queue-using-stacks",
      "implement-stack-using-queues",
    ],
  },
  {
    key: "queue-deque-design",
    title: "队列与双端队列设计系列",
    titleEn: "Queue and Deque Design",
    description: "从循环队列、循环双端队列到前中后队列、MRU 队列和阻塞队列，练数组取模、双端操作、游标移动和容量边界。",
    memberSlugs: [
      "design-circular-queue",
      "design-circular-deque",
      "design-front-middle-back-queue",
      "design-most-recently-used-queue",
      "design-bounded-blocking-queue",
    ],
  },
  {
    key: "hash-table-design",
    title: "哈希表手写系列",
    titleEn: "Hash Table Design",
    description: "从 HashSet、HashMap 到随机集合、时间键值表和全 O(1) 结构，练桶数组、冲突处理、删除语义、resize 和 load factor 追问。",
    memberSlugs: [
      "design-hashset",
      "design-hashmap",
      "insert-delete-getrandom-o1",
      "insert-delete-getrandom-o1-duplicates-allowed",
      "two-sum-iii-data-structure-design",
      "all-oone-data-structure",
      "time-based-key-value-store",
      "design-a-number-container-system",
      "frequency-tracker",
    ],
  },
  {
    key: "frequency-bucket-design",
    title: "频次桶设计系列",
    titleEn: "Frequency Bucket Design",
    description: "把 key 的频次变化作为核心状态，练 O(1) 频次迁移、最小频次、最大/最小 key 查询和高频元素维护。",
    memberSlugs: [
      "lfu-cache",
      "all-oone-data-structure",
      "maximum-frequency-stack",
      "frequency-tracker",
      "most-frequent-ids",
      "design-a-number-container-system",
    ],
  },
  {
    key: "history-version-design",
    title: "历史与版本设计系列",
    titleEn: "History and Version Design",
    description: "从浏览器前进后退到数组快照和时间键值表，练游标、版本号、懒拷贝和按时间二分查询。",
    memberSlugs: [
      "design-browser-history",
      "snapshot-array",
      "time-based-key-value-store",
    ],
  },
  {
    key: "top-k-frequency",
    title: "Top K 高频统计系列",
    titleEn: "Top K Frequency",
    description: "从词频、字符频率、前 K 高频到区间频次和实时频次，串起哈希计数、桶、堆、排序和海量数据 TopK 追问。",
    memberSlugs: [
      "word-frequency",
      "top-k-frequent-elements",
      "sort-characters-by-frequency",
      "sort-array-by-increasing-frequency",
      "top-k-frequent-words",
      "most-frequent-subtree-sum",
      "reward-top-k-students",
      "range-frequency-queries",
      "tweet-counts-per-frequency",
      "most-frequent-ids",
    ],
  },
  {
    key: "top-k-selection",
    title: "Top K 选择系列",
    titleEn: "Top K Selection",
    description: "围绕只取前 K 个候选，比较全排序、大小为 K 的堆、快选、多路归并和在线维护。",
    memberSlugs: [
      "smallest-k-lcci",
      "kth-largest-element-in-an-array",
      "kth-largest-element-in-a-stream",
      "find-the-kth-largest-integer-in-the-array",
      "find-subsequence-of-length-k-with-the-largest-sum",
      "the-k-strongest-values-in-an-array",
      "the-k-weakest-rows-in-a-matrix",
      "find-k-closest-elements",
      "k-closest-points-to-origin",
      "find-k-pairs-with-smallest-sums",
      "merge-k-sorted-lists",
    ],
  },
  {
    key: "kth-order-statistics",
    title: "第 K 大/第 K 小顺序统计系列",
    titleEn: "Kth Order Statistics",
    description: "把第 K 项问题从数组扩展到矩阵、乘法表、数对距离、分数、字典序、树和组合和，训练二分答案、堆、快选和计数。",
    memberSlugs: [
      "kth-smallest-element-in-a-bst",
      "kth-smallest-element-in-a-sorted-matrix",
      "kth-smallest-number-in-multiplication-table",
      "find-k-th-smallest-pair-distance",
      "k-th-smallest-prime-fraction",
      "k-th-smallest-in-lexicographical-order",
      "find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows",
      "kth-smallest-product-of-two-sorted-arrays",
      "kth-smallest-subarray-sum",
      "query-kth-smallest-trimmed-number",
      "kth-largest-sum-in-a-binary-tree",
      "find-kth-largest-xor-coordinate-value",
      "kth-smallest-path-xor-sum",
      "kth-smallest-amount-with-single-denomination-combination",
    ],
  },
  {
    key: "median-statistics",
    title: "中位数统计系列",
    titleEn: "Median Statistics",
    description: "覆盖静态有序数据、双堆数据流、滑动窗口、行有序矩阵、频次表和可更新统计器里的中位数维护。",
    memberSlugs: [
      "median-of-two-sorted-arrays",
      "find-median-from-data-stream",
      "sliding-window-median",
      "median-employee-salary",
      "find-median-given-frequency-of-numbers",
      "median-of-a-row-wise-sorted-matrix",
      "design-an-array-statistics-tracker",
      "minimum-operations-to-make-median-of-array-equal-to-k",
      "count-subarrays-with-median-k",
      "find-the-median-of-the-uniqueness-array",
      "median-of-a-binary-search-tree-level",
    ],
  },
  {
    key: "stream-statistics-design",
    title: "数据流统计设计系列",
    titleEn: "Stream Statistics Design",
    description: "从移动平均、最近请求、点击计数、推文频率到在线第 K 大和中位数，练时间窗口、队列、堆、有序集合和增量聚合。",
    memberSlugs: [
      "moving-average-from-data-stream",
      "number-of-recent-calls",
      "design-hit-counter",
      "find-consecutive-integers-from-a-data-stream",
      "tweet-counts-per-frequency",
      "range-frequency-queries",
      "data-stream-as-disjoint-intervals",
      "product-of-the-last-k-numbers",
      "kth-largest-element-in-a-stream",
      "find-median-from-data-stream",
      "design-an-array-statistics-tracker",
      "two-sum-iii-data-structure-design",
      "design-search-autocomplete-system",
      "detect-squares",
    ],
  },
  {
    key: "stream-rate-counter-design",
    title: "数据流计数与限流设计",
    titleEn: "Stream Counter and Rate Limiter Design",
    description: "用队列、哈希表和有序结构维护时间窗口、请求频率、点击计数、推文频率和 token 过期。",
    memberSlugs: [
      "logger-rate-limiter",
      "moving-average-from-data-stream",
      "number-of-recent-calls",
      "design-hit-counter",
      "tweet-counts-per-frequency",
      "design-authentication-manager",
    ],
  },
  {
    key: "massive-set-dedup-intersection",
    title: "海量集合去重与求交系列",
    titleEn: "Massive Set Dedup and Intersection",
    description: "用数组、字符串和 SQL 题映射海量 URL 去重、求交、重复检测、哈希归一化和外部排序/分片追问。",
    memberSlugs: [
      "contains-duplicate",
      "contains-duplicate-ii",
      "contains-duplicate-iii",
      "find-the-duplicate-number",
      "find-all-duplicates-in-an-array",
      "find-all-numbers-disappeared-in-an-array",
      "intersection-of-two-arrays",
      "intersection-of-two-arrays-ii",
      "intersection-of-three-sorted-arrays",
      "intersection-of-multiple-arrays",
      "set-intersection-size-at-least-two",
      "interval-list-intersections",
      "find-the-difference-of-two-arrays",
      "find-common-characters",
      "group-anagrams",
      "valid-anagram",
      "find-all-anagrams-in-a-string",
      "repeated-dna-sequences",
      "minimum-index-sum-of-two-lists",
      "making-file-names-unique",
      "find-duplicate-file-in-system",
      "duplicate-emails",
      "delete-duplicate-emails",
    ],
  },
  {
    key: "serialize-and-deserialize",
    title: "序列化与反序列化系列",
    titleEn: "Serialize and Deserialize",
    description: "同一套编码/解码不变量，覆盖普通二叉树、二叉搜索树和 N 叉树结构。",
    memberSlugs: [
      "serialize-and-deserialize-binary-tree",
      "serialize-and-deserialize-bst",
      "serialize-and-deserialize-n-ary-tree",
    ],
  },
  {
    key: "design-file-system",
    title: "文件系统设计系列",
    titleEn: "Design File System",
    description: "从路径注册到内存文件系统，练习 Trie 式目录树、文件内容和路径命令语义。",
    memberSlugs: ["design-file-system", "design-in-memory-file-system"],
  },
  {
    key: "flatten-structures",
    title: "扁平化结构系列",
    titleEn: "Flatten Structures",
    description: "把树、二维向量、嵌套列表、多级链表和嵌套数组统一到迭代/递归展开模型里。",
    memberSlugs: [
      "flatten-binary-tree-to-linked-list",
      "flatten-2d-vector",
      "flatten-nested-list-iterator",
      "flatten-a-multilevel-doubly-linked-list",
      "flatten-deeply-nested-array",
    ],
  },
  {
    key: "alien-dictionary",
    title: "外星语词典系列",
    titleEn: "Alien Dictionary",
    description: "从验证给定字母序到从词表反推出字母序，覆盖自定义排序和拓扑建图。",
    memberSlugs: ["alien-dictionary", "verifying-an-alien-dictionary"],
  },
  {
    key: "game-play-analysis",
    title: "游戏玩法分析系列",
    titleEn: "Game Play Analysis",
    description: "数据库题中的玩家活动分析系列，适合连续练首次登录、留存和事件聚合。",
    memberSlugs: [
      "game-play-analysis-i",
      "game-play-analysis-ii",
      "game-play-analysis-iii",
      "game-play-analysis-iv",
      "game-play-analysis-v",
    ],
  },
  {
    key: "product-sales-analysis",
    title: "产品销售分析系列",
    titleEn: "Product Sales Analysis",
    description: "围绕销售表和产品表的连接、聚合与分组统计，覆盖产品销售分析的多个阶段。",
    memberSlugs: [
      "product-sales-analysis-i",
      "product-sales-analysis-ii",
      "product-sales-analysis-iii",
      "product-sales-analysis-iv",
      "product-sales-analysis-v",
    ],
  },
  {
    key: "sales-analysis",
    title: "销售分析系列",
    titleEn: "Sales Analysis",
    description: "以销售记录为核心，练习按时间、产品和用户维度做筛选与聚合。",
    memberSlugs: ["sales-analysis-i", "sales-analysis-ii", "sales-analysis-iii"],
  },
  {
    key: "article-views",
    title: "文章浏览系列",
    titleEn: "Article Views",
    description: "围绕作者与浏览者关系建模，训练去重、自连接和用户行为过滤。",
    memberSlugs: ["article-views-i", "article-views-ii"],
  },
  {
    key: "immediate-food-delivery",
    title: "即时食物配送系列",
    titleEn: "Immediate Food Delivery",
    description: "配送订单分析系列，覆盖即时订单比例和首次订单口径。",
    memberSlugs: [
      "immediate-food-delivery-i",
      "immediate-food-delivery-ii",
      "immediate-food-delivery-iii",
    ],
  },
  {
    key: "monthly-transactions",
    title: "每月交易系列",
    titleEn: "Monthly Transactions",
    description: "按月份和国家聚合交易金额、数量与状态，是 SQL 时间分桶的典型系列。",
    memberSlugs: ["monthly-transactions-i", "monthly-transactions-ii"],
  },
  {
    key: "user-activity-for-the-past-30-days",
    title: "近 30 天用户活动系列",
    titleEn: "User Activity for the Past 30 Days",
    description: "围绕最近 30 天窗口统计活跃用户和会话，练习日期过滤与分组。",
    memberSlugs: [
      "user-activity-for-the-past-30-days-i",
      "user-activity-for-the-past-30-days-ii",
    ],
  },
  {
    key: "invalid-tweets",
    title: "无效推文系列",
    titleEn: "Invalid Tweets",
    description: "小型 SQL 文本过滤系列，覆盖长度、内容和条件过滤。",
    memberSlugs: ["invalid-tweets", "invalid-tweets-ii"],
  },
  {
    key: "second-highest-salary",
    title: "第 N 高薪水系列",
    titleEn: "Second Highest Salary",
    description: "从第二高薪水扩展到更一般的排名薪水查询，训练去重排序和空值处理。",
    memberSlugs: ["second-highest-salary", "second-highest-salary-ii"],
  },
  {
    key: "friend-requests",
    title: "好友申请系列",
    titleEn: "Friend Requests",
    description: "好友申请 SQL 系列，覆盖整体通过率和好友关系聚合统计。",
    memberSlugs: [
      "friend-requests-i-overall-acceptance-rate",
      "friend-requests-ii-who-has-the-most-friends",
    ],
  },
];
const problemsetQuery = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
    total
    questions {
      frontendQuestionId
      title
      titleCn
      titleSlug
      difficulty
      paidOnly
      topicTags {
        slug
        name
        nameTranslated
      }
      acRate
    }
  }
}
`;

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

function difficultyLabel(value) {
  return difficultyLabels.get(value) ?? value ?? "";
}

function acRateLabel(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return `${(numeric * 100).toFixed(1)}%`;
}

function frontendNumber(value) {
  const numeric = Number(String(value).replace(/\D/g, ""));
  return Number.isFinite(numeric) ? numeric : Number.MAX_SAFE_INTEGER;
}

function seriesCandidateKeys(slug) {
  const tokens = String(slug || "").toLowerCase().split("-").filter(Boolean);
  const keys = [];
  for (let index = 1; index < tokens.length; index += 1) {
    if (!romanTokens.has(tokens[index])) continue;
    const prefix = tokens.slice(0, index);
    if (prefix.length >= 2) keys.push(prefix.join("-"));
  }
  return keys;
}

function seriesOrderValue(slug, key) {
  if (slug === key) return 0;
  const suffix = slug.startsWith(`${key}-`)
    ? slug.slice(key.length + 1).split("-")[0]
    : "";
  return romanTokens.get(suffix) ?? Number.MAX_SAFE_INTEGER;
}

function plainTitle(value) {
  return String(value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function mergeDefinitions(definitions) {
  const byKey = new Map();
  for (const definition of definitions) {
    const existing = byKey.get(definition.key);
    if (!existing) {
      byKey.set(definition.key, {
        ...definition,
        memberSlugs: [...new Set(definition.memberSlugs)],
      });
      continue;
    }
    existing.memberSlugs = [
      ...new Set([...existing.memberSlugs, ...definition.memberSlugs]),
    ];
  }
  return [...byKey.values()];
}

function buildAutoRomanSeries(questions, existingSlugs, curatedKeys) {
  const bySlug = new Map(questions.map((question) => [question.titleSlug, question]));
  const membersByKey = new Map();
  for (const question of questions) {
    for (const key of seriesCandidateKeys(question.titleSlug)) {
      if (!membersByKey.has(key)) membersByKey.set(key, new Set());
      membersByKey.get(key).add(question.titleSlug);
      if (bySlug.has(key)) membersByKey.get(key).add(key);
    }
  }
  const definitions = [];
  for (const [key, slugs] of membersByKey) {
    if (curatedKeys.has(key)) continue;
    const members = [...slugs].filter((slug) => bySlug.has(slug));
    if (members.length < 2) continue;
    if (!members.some((slug) => existingSlugs.has(slug))) continue;
    members.sort((left, right) => {
      return (
        seriesOrderValue(left, key) - seriesOrderValue(right, key) ||
        frontendNumber(bySlug.get(left)?.frontendQuestionId) -
          frontendNumber(bySlug.get(right)?.frontendQuestionId)
      );
    });
    const base = bySlug.get(key) ?? bySlug.get(members[0]);
    definitions.push({
      key,
      title: `${base?.titleCn ?? plainTitle(key)}系列`,
      titleEn: base?.title ?? plainTitle(key),
      description: "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
      memberSlugs: members,
    });
  }
  return definitions.sort((left, right) => left.key.localeCompare(right.key));
}

async function fetchAllQuestions() {
  const cachePath = optionValue("cache", defaultQuestionCachePath);
  if (cachePath && existsSync(cachePath)) {
    return JSON.parse(await readFile(cachePath, "utf8"));
  }
  const questions = [];
  let total = Number.POSITIVE_INFINITY;
  const limit = 100;
  for (let skip = 0; skip < total; skip += limit) {
    const response = await fetch(leetcodeChinaGraphqlEndpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        operationName: "problemsetQuestionList",
        query: problemsetQuery,
        variables: {
          categorySlug: "",
          filters: {},
          limit,
          skip,
        },
      }),
    });
    if (!response.ok) throw new Error(`LeetCode China GraphQL ${response.status}`);
    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((item) => item.message).join("; "));
    }
    total = payload.data.problemsetQuestionList.total;
    questions.push(...payload.data.problemsetQuestionList.questions);
  }
  return questions;
}

function localQuestionMetadata(problem) {
  return {
    acRate:
      typeof problem.acRate === "string"
        ? Number.parseFloat(problem.acRate) / 100
        : problem.acRate,
    difficulty: problem.difficulty,
    frontendQuestionId: problem.frontendId,
    paidOnly: Boolean(problem.paidOnly),
    title: plainTitle(problem.titleSlug),
    titleCn: problem.titleCn,
    titleSlug: problem.titleSlug,
    topicTags: problem.tags?.map((tag) => ({
      slug: tag.slug,
      name: tag.name,
      nameTranslated: tag.name,
    })) ?? [],
  };
}

async function walkFiles(dir, names, result = []) {
  if (!existsSync(dir)) return result;
  const entries = await readdir(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      await walkFiles(fullPath, names, result);
    } else if (names.has(entry)) {
      result.push(fullPath);
    }
  }
  return result;
}

function markdownQuality(file, markdown, doocsDir) {
  const relativePath = path.relative(doocsDir, file);
  const pathDepth = relativePath.split(path.sep).length;
  let score = pathDepth;
  if (/<!-- description:start -->/i.test(markdown)) score += 1000;
  if (/##\s*(?:题目描述|Problem Description)/i.test(markdown)) score += 400;
  if (/<!-- solution:start -->/i.test(markdown)) score += 100;
  if (path.basename(file) === "README.md") score += 10;
  if (/^(?:README|README_EN)\.md$/i.test(relativePath)) score -= 2000;
  return score;
}

function problemSlugs(markdown) {
  return [
    ...new Set(
      [...markdown.matchAll(/leetcode\.(?:com|cn)\/problems\/([^/)#?]+)/g)]
        .map((match) => match[1])
        .filter(Boolean),
    ),
  ];
}

async function doocsMarkdownBySlug(doocsDir) {
  const result = new Map();
  const files = await walkFiles(doocsDir, new Set(["README.md", "README_EN.md"]));
  for (const file of files) {
    const markdown = await readFile(file, "utf8");
    for (const slug of problemSlugs(markdown)) {
      const current = result.get(slug);
      const candidate = {
        file,
        markdown,
        relativePath: path.relative(doocsDir, file),
        score: markdownQuality(file, markdown, doocsDir),
      };
      if (current && current.score >= candidate.score) continue;
      result.set(slug, candidate);
    }
  }
  return result;
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&le;/gi, "<=")
    .replace(/&ge;/gi, ">=")
    .replace(/&minus;/gi, "-")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    );
}

function cleanText(value) {
  return decodeEntities(
    String(value || "")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(
        /<span\b[^>]*(?:opacity\s*:\s*0|position\s*:\s*absolute|left\s*:\s*-9999px)[^>]*>[\s\S]*?<\/span>/gi,
        " ",
      )
      .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, "^$1")
      .replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, "_$1")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(?:p|li|ul|ol|div|pre|table|tr)>/gi, " ")
      .replace(/<\/?[a-z][\w:-]*(?:\s[^<>]*)?>/gi, " "),
  )
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$([\s\S]*?)\$\$/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .replace(/^[\t ]*[#>*-]+\s*/gm, " ")
    .replace(/[`|]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([。！？；：，、])/gu, "$1")
    .trim();
}

function descriptionFromMarkdown(markdown) {
  return (
    markdown.match(/<!-- description:start -->([\s\S]*?)<!-- description:end -->/i)?.[1] ||
    markdown.match(/## 题目描述([\s\S]*?)## 解法/i)?.[1] ||
    ""
  );
}

function solutionFromMarkdown(markdown) {
  const body =
    markdown.match(/## 解法([\s\S]*?)<!-- solution:end -->/i)?.[1] ||
    markdown.match(/## Solution([\s\S]*?)<!-- solution:end -->/i)?.[1] ||
    "";
  return body
    .replace(/<!-- tabs:start -->[\s\S]*$/i, "")
    .replace(/#### [\s\S]*$/i, "")
    .replace(/###\s*(?:方法|Solution)[^\n]*/gi, " ")
    .trim();
}

function boundedText(value, limit) {
  const text = cleanText(value);
  if (text.length <= limit) return text;
  const sliced = text.slice(0, limit);
  const sentenceEnd = Math.max(
    sliced.lastIndexOf("。"),
    sliced.lastIndexOf("；"),
    sliced.lastIndexOf("."),
  );
  if (sentenceEnd > limit * 0.55) return sliced.slice(0, sentenceEnd + 1);
  return `${sliced.replace(/[，,；;。.\s]+$/u, "")}。`;
}

const approachPreviewOverrides = {
  "jump-game-iv":
    "把每个下标看成图节点，普通边是 i-1 和 i+1，同值下标之间也可以互达。用 BFS 按层扩展，第一次到达最后一个下标就是最少步数；每个值对应的下标列表用过后立即清空，避免同值边反复扫描导致退化。",
  "paint-house":
    "定义 dp[i][c] 为前 i 间房、且第 i 间涂颜色 c 的最低成本。第 i 间选某个颜色时，只能从上一间的另外两种颜色转移；三色场景可以直接维护三个滚动值，最后取最小值。",
  "paint-house-iv":
    "从两端向中间成对处理房子，状态记录上一对左右两侧分别使用的颜色。枚举当前左房和右房颜色，要求同一对两端不同、并且分别不等于相邻上一对颜色，转移累计最小成本。",
  "maximum-number-of-non-overlapping-substrings":
    "先为每个字符计算最左和最右出现位置，再尝试把某个字符的区间扩展成闭包：区间内所有字符的完整出现范围都必须被包含。得到所有合法最小区间后，按右端点贪心选择互不重叠的区间。",
  "minimize-result-by-adding-parentheses-to-expression":
    "加号左右两边各枚举一个括号边界。括号内计算加法，括号左侧和右侧若存在则作为乘数；遍历所有边界组合，取表达式值最小的字符串即可。",
  "island-perimeter":
    "每个陆地格子先贡献 4 条边，再检查上方和左方是否也是陆地；每发现一条共享边，就从总周长中减去 2。这样每条相邻边只统计一次。",
  "number-of-distinct-islands-ii":
    "先 DFS 取出每个岛屿的相对坐标，再生成旋转和翻转后的 8 种形态。每种形态平移到左上角并排序序列化，选择字典序最小的序列作为规范形状，用集合去重。",
  "design-add-and-search-words-data-structure":
    "用 Trie 保存单词。普通字符沿对应子节点继续，遇到通配符 '.' 时枚举当前节点的所有子节点做 DFS；递归到单词末尾时检查终止标记。",
  "reverse-nodes-in-even-length-groups":
    "链表按长度 1、2、3... 分组遍历，最后一组按实际长度计算。若当前组实际长度为偶数，就原地反转这一段并接回前后节点；否则只移动指针继续下一组。",
  "insert-delete-getrandom-o1-duplicates-allowed":
    "用数组保存所有元素，用哈希表把值映射到它出现的下标集合。删除时把目标下标与数组末尾交换，并同步更新两个值的下标集合；随机返回数组中的随机位置。",
  "linked-list-random-node":
    "链表长度未知且不适合全部保存时，用水塘采样。遍历到第 i 个节点时，以 1/i 的概率用它替换当前答案；遍历结束后，每个节点被保留下来的概率都等于 1/n。",
  "shuffle-an-array":
    "使用 Fisher-Yates 洗牌。第 i 轮从 [i, n - 1] 中等概率随机一个位置与 i 交换，保证每个元素放到当前位置的概率相同，最终每种排列出现概率都是 1/n!。",
  "random-pick-index":
    "只扫描数组中等于 target 的位置，并对第 cnt 个命中的位置以 1/cnt 的概率替换答案。这是水塘采样的一维应用，不需要提前保存 target 的全部下标。",
  "random-flip-matrix":
    "把还没翻过的格子看成 [0, remaining) 的编号空间。每次随机一个编号 x，真实编号由哈希表映射得到；再把 x 映射到当前末尾编号，remaining 减一，从而惰性模拟无放回抽样。",
  "implement-rand10-using-rand7":
    "先用两次 rand7 构造 1 到 49 的均匀随机数。只接受 1 到 40，并映射到 1 到 10；如果落在 41 到 49，就拒绝并重抽，避免取模后各结果概率不相等。",
  "generate-random-point-in-a-circle":
    "可以在外接正方形内拒绝采样，也可以直接用极坐标。极坐标写法要令半径为 sqrt(rand()) * r，角度均匀取 [0, 2π)，这样面积概率才均匀。",
  "random-point-in-non-overlapping-rectangles":
    "先按每个矩形包含的整数点数量建立前缀和，再随机一个全局点序号，用二分定位矩形，最后把局部偏移还原成该矩形中的坐标。",
  "random-pick-with-weight":
    "对权重数组做前缀和，随机生成 1 到 total 之间的整数，再二分找到第一个前缀和不小于该随机数的位置。区间长度正好等于权重，因此返回概率与权重成正比。",
  "random-pick-with-blacklist":
    "有效白名单大小是 n - blacklist.length。只在 [0, size) 中随机；若抽到黑名单内的编号，就用哈希表映射到 [size, n) 中未被拉黑的编号，保证每个白名单数字等概率返回。",
  "serialize-and-deserialize-n-ary-tree":
    "采用先序遍历序列化，每个节点写入值和孩子数量。反序列化时按同样顺序读取，先创建当前节点，再递归读取固定数量的孩子，从而无需额外空指针标记。",
  "verifying-an-alien-dictionary":
    "先把外星字母映射成顺序编号，再逐对比较相邻单词。找到第一处不同字符时按编号判断大小；如果前缀完全相同，则较短单词必须排在前面。",
  "game-play-analysis-ii":
    "按玩家分组找最早登录日期，再回到 Activity 表取该玩家首次登录使用的设备。可以用子查询求 MIN(event_date)，再用 player_id 和日期连接。",
  "game-play-analysis-iii":
    "先按玩家和日期聚合当天游戏数，再用窗口函数或自连接计算截至当天的累计 games_played。输出粒度是 player_id + event_date。",
  "game-play-analysis-v":
    "先求每个玩家首次登录日，再判断该玩家是否在首次登录后的第二天也登录。最终用满足条件的玩家数除以总玩家数，并按题目要求四舍五入。",
  "product-sales-analysis-ii":
    "输出粒度是 product_id，直接在 Sales 表按 product_id 分组，对 quantity 求和得到 total_quantity。",
  "product-sales-analysis-iii":
    "先为每个 product_id 找到最早销售年份，再筛出这些年份对应的销售记录，返回 product_id、first_year、quantity 和 price。",
  "product-sales-analysis-iv":
    "先按 user_id 和 product_id 汇总购买数量，再在每个用户内找最大购买量。并列时保留所有达到最大值的产品。",
  "product-sales-analysis-v":
    "先按 user_id 和 product_id 聚合消费金额或数量，再结合 Product 表补齐产品名；最后按题目要求筛选每个用户的目标产品集合。",
  "sales-analysis-i":
    "把 Sales 与 Product 连接后，按 seller_id 聚合销售额 price * quantity。找出最大销售额，并返回所有达到该最大值的 seller_id。",
  "sales-analysis-iii":
    "按 product_id 判断销售日期是否全部落在指定窗口内。可以先按产品聚合最小和最大 sale_date，也可以用 NOT EXISTS 排除窗口外有销售记录的产品。",
  "immediate-food-delivery-i":
    "逐行判断 order_date 是否等于 customer_pref_delivery_date，统计即时配送订单数占全部订单数的比例，最后按题目要求保留两位小数。",
  "immediate-food-delivery-iii":
    "先找出每个顾客的首单，再只在首单集合里判断是否即时配送。最终计算即时首单数占顾客数的百分比。",
  "monthly-transactions-ii":
    "先把交易按月份和国家聚合，再分别统计 approved、chargeback 等状态的数量和金额；如果退款记录在独立表中，需要按交易 id 合并后再聚合。",
  "user-activity-for-the-past-30-days-ii":
    "限定日期窗口后，先按日期和用户去重会话，再按日期统计活跃用户数或会话数。关键是窗口端点要按题目给定日期包含/排除规则处理。",
  "second-highest-salary-ii":
    "在每个部门内按 salary 去重后排名，取排名为 2 的工资；没有第二高工资的部门需要按题意返回 NULL 或不返回，取决于输出要求。",
  "friend-requests-i-overall-acceptance-rate":
    "分别统计去重后的发送请求对和接受请求对，用接受数除以请求数。空请求时返回 0；去重粒度应是 sender/requester 与 receiver/accepter 的组合。",
  "basic-calculator-iv":
    "把表达式解析成多项式。每个项用变量列表的有序元组表示，系数用哈希表累加；遇到赋值变量时转成常数，乘法做项之间笛卡尔组合，最后按次数和字典序输出。",
  "basic-calculator-iii":
    "用递归下降或两个栈处理 +、-、*、/ 和括号。括号递归求子表达式，乘除优先在当前项内结算，加减把项压入总和，最后累加。",
  "smallest-k-lcci":
    "如果只需要最小的 k 个数，可以全排序后截取、维护大小为 k 的最大堆，或用快速选择把第 k 小元素放到正确分区。面试里通常比较三者：排序最简单，堆适合数据流，快选平均 O(n)。",
  "kth-largest-element-in-an-array":
    "把第 k 大转换成排序后下标 n-k 的元素，用快速选择做分区。每次只递归目标下标所在的一侧，平均时间 O(n)；若担心最坏情况，可随机选 pivot 或退化时改用堆。",
  "top-k-frequent-elements":
    "先用哈希表统计频次，再用大小为 k 的小根堆保留当前最高频的 k 个元素；如果频次范围不大，也可以按频次建桶从高到低收集。",
  "find-median-from-data-stream":
    "维护两个堆：小根堆保存较大的一半，大根堆保存较小的一半。每次插入后调整堆顶顺序和大小差，中位数就是两个堆顶之一或二者平均值。",
  "lru-cache":
    "用哈希表 key -> 双向链表节点实现 O(1) 定位，用双向链表按最近访问顺序排列。get 和 put 命中时都把节点移到头部，容量超限时淘汰尾部节点，并同步删除哈希表项。",
  "lfu-cache":
    "维护 key 到节点的哈希表、freq 到双向链表的哈希表，以及当前最小频次 minFreq。访问或更新时把节点从旧频次链表移到新频次链表；淘汰时删除 minFreq 链表尾部的最久未使用节点。",
  "design-hashmap":
    "题目数据范围允许直接数组，但面试手写 HashMap 更应讲清桶数组和冲突处理：put 在桶内更新或追加，get/remove 只扫描目标桶；当 load factor 过高时扩容并重新分桶。",
  "min-stack":
    "主栈保存所有值，辅助栈保存当前位置的最小值。push 时把 min(x, 当前最小值) 同步压入辅助栈，pop 时两个栈一起弹出，top 和 getMin 都能 O(1) 返回。",
  "max-stack":
    "可以用双向链表保存栈顺序，再用有序映射把值映射到对应节点集合。popMax 时取最大值对应的最新节点，从链表和映射中同时删除，保持栈操作和最大值操作一致。",
  "beautiful-arrangement":
    "用状态压缩 DP 或回溯。第 pos 个位置可以放未使用且满足 num % pos == 0 或 pos % num == 0 的数字；位掩码记录已用数字，记忆化避免重复搜索。",
  "decode-ways-ii":
    "动态规划处理前缀解码数。每一位既可能单独解码，也可能和前一位组成两位数；字符 '*' 要展开成 1-9 或合法两位组合的数量，所有转移都取模。",
  "majority-element-ii":
    "摩尔投票保留最多两个候选，因为出现次数超过 n/3 的元素最多两个。第一遍抵消得到候选，第二遍重新计数验证是否真的超过阈值。",
  "minimum-partition-score-ii":
    "子数组得分只由子数组和决定，先用前缀和 O(1) 求任意区间和及得分。再做 k 段划分 DP，状态表示前 i 个元素分成 t 段的最小总分，并结合数据规模选择优化。",
  "number-of-unique-xor-triplets-ii":
    "三元组允许 i <= j <= k，因此先统计任意两个数异或能得到的值，再与第三个数异或生成候选。值域较小时可以用布尔数组去重，最后统计可达 XOR 值个数。",
  "path-sum-iv":
    "把三位数编码拆成层、位置和值，用哈希表表示隐式二叉树。DFS 从根累加路径和，若当前节点没有左右孩子就是叶子，把当前路径和加入答案。",
  "populating-next-right-pointers-in-each-node-ii":
    "逐层连接 next 指针。可以用队列 BFS，也可以利用上一层已经建立的 next 链，扫描当前层时用 dummy 指针串起下一层所有孩子。",
  "sentence-similarity-ii":
    "相似关系具有传递性，用并查集把所有相似单词合并。比较两个句子时长度必须相同，且每个位置的单词相同或属于同一个并查集集合。",
  "strange-printer-ii":
    "每种颜色最终必须覆盖它出现位置的最小矩形。若某颜色矩形内含有其他颜色，则当前颜色必须先于那些颜色打印；建依赖图后做拓扑排序，存在环则不可行。",
  "string-compression-ii":
    "区间 DP 或记忆化搜索。状态记录处理到的位置、还能删除多少字符、上一段字符和长度；每次选择删除当前字符或保留并更新压缩长度增量。",
  "wiggle-sort-ii":
    "排序后把较小一半倒序放到偶数位、较大一半倒序放到奇数位，可以避免相等元素相邻破坏摆动关系；若追求原地线性，可结合三向切分和虚拟下标。",
  "word-pattern-ii":
    "回溯建立 pattern 字符到非空子串的一一映射。每次枚举当前字符可匹配的前缀，既要保证同字符复用同一子串，也要保证不同字符不能映射到同一子串。",
};

function fallbackStrategy(question) {
  const tagSlugs = new Set((question.topicTags || []).map((tag) => tag.slug));
  if (tagSlugs.has("database")) {
    return "先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。";
  }
  if (tagSlugs.has("design")) {
    return "先把每个 API 需要维护的状态列出来，再选择哈希表、堆、链表或树等结构保证更新和查询复杂度；实现时要让初始化、重复调用和空结构行为都可预测。";
  }
  if (tagSlugs.has("dynamic-programming")) {
    return "先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。";
  }
  if (tagSlugs.has("graph") || tagSlugs.has("union-find")) {
    return "先把题目对象建成点和边，再确认边的方向、连通性和访问顺序；连通块题用 DFS/BFS 或并查集，依赖关系题要检查入度、拓扑序或环。";
  }
  if (tagSlugs.has("binary-search")) {
    return "先判断答案或分界点是否具有单调性，再写 check 函数；二分过程中要统一开闭区间，最后用边界样例验证返回的是第一个可行还是最后一个可行位置。";
  }
  if (tagSlugs.has("sliding-window") || tagSlugs.has("two-pointers")) {
    return "先确定窗口内必须维护的不变量，再移动右端扩展、移动左端恢复合法；计数类题要明确每次恢复合法后新增的是多少个候选。";
  }
  if (tagSlugs.has("stack") || tagSlugs.has("monotonic-stack")) {
    return "先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。";
  }
  if (tagSlugs.has("tree") || tagSlugs.has("binary-tree")) {
    return "先判断答案来自子树内部还是跨过当前节点，再用递归返回父节点真正需要的信息；带父指针或多节点条件时要额外维护访问来源。";
  }
  if (tagSlugs.has("string")) {
    return "先把字符关系转成计数、位置、前缀状态或自动机状态，再用这些状态判断合法性；实现时重点检查空串、重复字符和边界下标。";
  }
  if (tagSlugs.has("math") || tagSlugs.has("bit-manipulation")) {
    return "先把操作转成等价的公式、位状态或不变量，再减少枚举维度；实现时要明确溢出、取模和重复状态是否会影响答案。";
  }
  return "先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。";
}

function statementPreview(markdown, question) {
  const description = descriptionFromMarkdown(markdown)
    .replace(/<p>\s*<strong[^>]*class="example"[\s\S]*$/i, "")
    .replace(/<p>\s*<strong[^>]*>\s*(?:示例|Example)[\s\S]*$/i, "")
    .replace(/<p>\s*<strong[^>]*>\s*(?:提示|Constraints)[\s\S]*$/i, "");
  const preview = boundedText(description, 560);
  if (preview) return preview;
  return `${question.titleCn}：请根据题目给定的输入约束和目标返回要求，设计正确且高效的算法。`;
}

function approachPreview(markdown, question, seriesTitle) {
  const solution = boundedText(solutionFromMarkdown(markdown), 620);
  if (solution.length >= 80) return solution;
  const override = approachPreviewOverrides[question.titleSlug];
  if (override) return override;
  const tagNames = (question.topicTags || [])
    .map((tag) => tag.nameTranslated || tag.name)
    .filter(Boolean)
    .join("、");
  const context = tagNames
    ? `主要标签是 ${tagNames}。`
    : "先从数据规模反推可接受复杂度。";
  return `${question.titleCn} 属于${seriesTitle || "系列题"}中的一个变体。${context}${fallbackStrategy(question)}刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。`;
}

function followUpsFor(question, series) {
  const title = question.titleCn;
  const seriesTitle = series?.title ?? "同系列";
  const key = series?.key;
  const base = [
    {
      question: `这题和${seriesTitle}里的基础题相比，新增的核心约束是什么？`,
      answer: `先不要急着套模板。把 ${title} 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。`,
    },
    {
      question: "实现时最容易遗漏哪类边界？",
      answer: "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。",
    },
  ];
  if (key === "stock-trading") {
    base.push({
      question: "为什么股票题要先定义持有/未持有状态？",
      answer: "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。",
    });
  } else if (key === "jump-game") {
    base.push({
      question: "什么时候用贪心边界，什么时候必须建图或做 DP？",
      answer: "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。",
    });
  } else if (key === "islands") {
    base.push({
      question: "为什么岛屿题通常要原地标记或维护 visited？",
      answer: "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。",
    });
  } else if (key === "parentheses") {
    base.push({
      question: "括号题的核心不变量是什么？",
      answer: "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。",
    });
  } else if (key === "range-sum-query") {
    base.push({
      question: "为什么静态查询和动态修改要用不同结构？",
      answer: "静态查询可以一次预处理前缀和后 O(1) 回答；有修改时前缀和会整体失效，需要树状数组或线段树把单点更新和区间求和都控制在对数复杂度。",
    });
  } else if (key === "word-break") {
    base.push({
      question: "拆分型字典 DP 的状态应该怎么定义？",
      answer: "通常让 dp[i] 表示前 i 个字符能否被词典合法覆盖；需要输出方案时，把可行前驱位置保存下来，再用 DFS 和记忆化恢复所有句子。",
    });
  } else if (key === "coin-change") {
    base.push({
      question: "零钱兑换和组合总数为什么循环顺序不同？",
      answer: "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。",
    });
  } else if (key === "knapsack-dp") {
    base.push({
      question: "背包 DP 最先要判断什么？",
      answer: "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。",
    });
  } else if (key === "string-dp") {
    base.push({
      question: "字符串二维 DP 的边界为什么容易错？",
      answer: "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。",
    });
  } else if (key === "random-sampling-fairness") {
    base.push({
      question: "如何证明随机抽样是公平的？",
      answer: "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。",
    });
  } else if (key === "cache-design") {
    base.push({
      question: "面试追问 LRU 线程安全和缓存一致性时怎么回答？",
      answer: "先把单机算法的不变量讲清：哈希表定位节点，链表维护访问顺序，淘汰时两边同时更新。线程安全再讨论锁粒度、读写锁或分段锁；一致性再讨论写穿、写回、失效和过期策略。",
    });
  } else if (key === "hash-table-design") {
    base.push({
      question: "手写 HashMap 时 resize 的关键不变量是什么？",
      answer: "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。",
    });
  } else if (key === "frequency-bucket-design") {
    base.push({
      question: "为什么频次结构常用双层哈希或频次桶？",
      answer: "key 到节点的哈希表保证 O(1) 定位，频次到有序 key 集合或双向链表保证 O(1) 迁移；LFU 还要维护当前最小频次，才能在容量满时稳定淘汰。",
    });
  } else if (
    key === "stack-min-max-design" ||
    key === "stack-queue-adapter" ||
    key === "queue-deque-design"
  ) {
    base.push({
      question: "手写容器题最应该先确认哪些 API 语义？",
      answer: "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。",
    });
  } else if (key === "history-version-design") {
    base.push({
      question: "历史版本题为什么常用游标或版本号？",
      answer: "浏览器历史的核心是当前位置游标和截断未来记录；快照与时间键值表的核心是只记录变化点，用版本号或时间戳二分找到不超过查询时刻的最新值。",
    });
  } else if (key === "trie-search-design") {
    base.push({
      question: "Trie 设计题什么时候需要在节点上额外存信息？",
      answer: "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。",
    });
  } else if (key === "manual-parser") {
    base.push({
      question: "手写解析器为什么要先定语法层级？",
      answer: "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。",
    });
  } else if (
    key === "top-k-frequency" ||
    key === "top-k-selection" ||
    key === "kth-order-statistics" ||
    key === "median-statistics" ||
    key === "stream-statistics-design"
  ) {
    base.push({
      question: "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
      answer: "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。",
    });
  } else if (key === "stream-rate-counter-design") {
    base.push({
      question: "限流和计数器题如何从算法题扩展到工程题？",
      answer: "先说明单机窗口队列或时间桶如何精确计数，再讨论 token bucket、leaky bucket、分布式时钟偏差、Redis 原子更新和过期清理；工程题重点是边界一致性和可观测性。",
    });
  } else if (key === "massive-set-dedup-intersection") {
    base.push({
      question: "海量 URL 去重或求交不能全放内存时怎么办？",
      answer: "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。",
    });
  } else {
    base.push({
      question: `刷${seriesTitle}时应按什么顺序复盘？`,
      answer: "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。",
    });
  }
  return base;
}

function githubBlobUrl(relativePath) {
  return `${doocsRepoUrl}/blob/main/${relativePath
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

function buildSeriesProblems(definitions, questionsBySlug, markdownBySlug) {
  const seriesBySlug = new Map();
  for (const definition of definitions) {
    for (const slug of definition.memberSlugs) {
      if (!seriesBySlug.has(slug)) seriesBySlug.set(slug, []);
      seriesBySlug.get(slug).push(definition.key);
    }
  }
  const firstSeriesBySlug = new Map();
  for (const definition of definitions) {
    for (const slug of definition.memberSlugs) {
      if (!firstSeriesBySlug.has(slug)) firstSeriesBySlug.set(slug, definition);
    }
  }
  const slugs = [...seriesBySlug.keys()];
  slugs.sort((left, right) => {
    const leftSeries = firstSeriesBySlug.get(left);
    const rightSeries = firstSeriesBySlug.get(right);
    const seriesOrder =
      definitions.findIndex((item) => item.key === leftSeries?.key) -
      definitions.findIndex((item) => item.key === rightSeries?.key);
    if (seriesOrder !== 0) return seriesOrder;
    return (
      frontendNumber(questionsBySlug.get(left)?.frontendQuestionId) -
      frontendNumber(questionsBySlug.get(right)?.frontendQuestionId)
    );
  });
  return slugs.map((slug) => {
    const question = questionsBySlug.get(slug);
    if (!question) throw new Error(`Missing question metadata for ${slug}`);
    const markdown = markdownBySlug.get(slug);
    const series = firstSeriesBySlug.get(slug);
    return {
      acRate: acRateLabel(question.acRate),
      difficulty: difficultyLabel(question.difficulty),
      frontendId: question.frontendQuestionId,
      paidOnly: Boolean(question.paidOnly),
      seriesKeys: seriesBySlug.get(slug) ?? [],
      seriesPrimaryKey: series?.key ?? "",
      source: markdown
        ? `${doocsRepoUrl} (${doocsLicense})`
        : "LeetCode China official problemset metadata",
      sourceUrl: markdown ? githubBlobUrl(markdown.relativePath) : "",
      tags: (question.topicTags || []).map((tag) => ({
        slug: tag.slug,
        name: tag.nameTranslated || tag.name,
      })),
      title: String(question.title || "").trim(),
      titleCn: String(question.titleCn || "").trim(),
      titleSlug: question.titleSlug,
      url: `https://leetcode.cn/problems/${question.titleSlug}/description/`,
      statementPreview: statementPreview(markdown?.markdown ?? "", question),
      approachPreview: approachPreview(markdown?.markdown ?? "", question, series?.title),
      followUps: followUpsFor(question, series),
    };
  });
}

function renderOutput(definitions, problems) {
  const stats = {
    generatedAt: new Date().toISOString().slice(0, 10),
    series: definitions.length,
    problems: problems.length,
    paidOnly: problems.filter((problem) => problem.paidOnly).length,
    source:
      "LeetCode China official problemset metadata with Doocs statement and solution text where available.",
  };
  return `export interface LeetcodeSeriesDefinition {
  key: string;
  title: string;
  titleEn: string;
  description: string;
  memberSlugs: string[];
}

export interface LeetcodeSeriesProblem {
  acRate: string | null;
  difficulty: string;
  frontendId: string;
  paidOnly: boolean;
  seriesKeys: string[];
  seriesPrimaryKey: string;
  source: string;
  sourceUrl: string;
  tags: Array<{ slug: string; name: string }>;
  title: string;
  titleCn: string;
  titleSlug: string;
  url: string;
  statementPreview: string;
  approachPreview: string;
  followUps: Array<{ question: string; answer: string }>;
}

export const leetcodeSeriesDefinitions = (${JSON.stringify(
    definitions,
    null,
    2,
  )}) satisfies LeetcodeSeriesDefinition[];

export const leetcodeSeriesProblems = (${JSON.stringify(
    problems,
    null,
    2,
  )}) satisfies LeetcodeSeriesProblem[];

export const leetcodeSeriesStats = ${JSON.stringify(stats, null, 2)} as const;
`;
}

async function main() {
  const [problemsSource, bytedanceSource, questions] = await Promise.all([
    readFile(problemsPath, "utf8"),
    readFile(bytedancePath, "utf8"),
    fetchAllQuestions(),
  ]);
  const leetcodeProblems = extractJsonArray(
    problemsSource,
    "leetcodeProblems",
    "satisfies LeetcodeProblem\\[\\];",
  );
  const leetcodeByteDanceProblems = extractJsonArray(
    bytedanceSource,
    "leetcodeByteDanceProblems",
    "satisfies LeetcodeByteDanceProblem\\[\\];",
  );
  const existingSlugs = new Set(
    [...leetcodeProblems, ...leetcodeByteDanceProblems].map(
      (problem) => problem.titleSlug,
    ),
  );
  const questionsBySlug = new Map(questions.map((question) => [
    question.titleSlug,
    question,
  ]));
  for (const problem of [...leetcodeProblems, ...leetcodeByteDanceProblems]) {
    if (!questionsBySlug.has(problem.titleSlug)) {
      questionsBySlug.set(problem.titleSlug, localQuestionMetadata(problem));
    }
  }
  const curatedKeys = new Set(curatedSeries.map((series) => series.key));
  const allKnownQuestions = [...questionsBySlug.values()];
  const definitions = mergeDefinitions([
    ...curatedSeries,
    ...buildAutoRomanSeries(allKnownQuestions, existingSlugs, curatedKeys),
  ])
    .map((definition) => ({
      ...definition,
      memberSlugs: definition.memberSlugs.filter((slug) =>
        questionsBySlug.has(slug),
      ),
    }))
    .filter((definition) => definition.memberSlugs.length >= 2);
  const doocsDir = optionValue(
    "doocs-dir",
    process.env.DOOCS_LEETCODE_DIR || defaultDoocsDir,
  );
  const markdownBySlug = await doocsMarkdownBySlug(doocsDir);
  const problems = buildSeriesProblems(definitions, questionsBySlug, markdownBySlug);
  await mkdir(path.dirname(fileURLToPath(outputPath)), { recursive: true });
  await writeFile(outputPath, renderOutput(definitions, problems));
  console.log(
    `Wrote ${definitions.length} series and ${problems.length} series problems.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
