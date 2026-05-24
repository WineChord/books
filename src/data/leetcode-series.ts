export interface LeetcodeSeriesDefinition {
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

export const leetcodeSeriesDefinitions = ([
  {
    "key": "jump-game",
    "title": "跳跃游戏系列",
    "titleEn": "Jump Game",
    "description": "从一维可达性、最少跳数、同值传送、受限 DP 到区间策略，覆盖跳跃游戏的主要演化。",
    "memberSlugs": [
      "jump-game",
      "jump-game-ii",
      "jump-game-iii",
      "jump-game-iv",
      "jump-game-v",
      "jump-game-vi",
      "jump-game-vii",
      "jump-game-viii",
      "jump-game-ix"
    ]
  },
  {
    "key": "stock-trading",
    "title": "股票买卖系列",
    "titleEn": "Stock Trading",
    "description": "把一次、无限次、两次、k 次、冷冻期、手续费和策略改写放在同一条状态机路线里练。",
    "memberSlugs": [
      "best-time-to-buy-and-sell-stock",
      "best-time-to-buy-and-sell-stock-ii",
      "best-time-to-buy-and-sell-stock-iii",
      "best-time-to-buy-and-sell-stock-iv",
      "best-time-to-buy-and-sell-stock-v",
      "best-time-to-buy-and-sell-stock-with-cooldown",
      "best-time-to-buy-and-sell-stock-with-transaction-fee",
      "best-time-to-buy-and-sell-stock-using-strategy",
      "maximum-profit-from-trading-stocks",
      "maximum-profit-from-trading-stocks-with-discounts"
    ]
  },
  {
    "key": "house-robber",
    "title": "打家劫舍系列",
    "titleEn": "House Robber",
    "description": "线性、环形、树形、能力二分和分组约束共同构成“不选相邻”的 DP 系列。",
    "memberSlugs": [
      "house-robber",
      "house-robber-ii",
      "house-robber-iii",
      "house-robber-iv",
      "house-robber-v"
    ]
  },
  {
    "key": "paint-house",
    "title": "粉刷房子系列",
    "titleEn": "Paint House",
    "description": "围绕相邻颜色不同，从固定三色扩展到多色、街区数量和对称位置约束。",
    "memberSlugs": [
      "paint-house",
      "paint-house-ii",
      "paint-house-iii",
      "paint-house-iv"
    ]
  },
  {
    "key": "n-sum",
    "title": "N 数之和系列",
    "titleEn": "N-Sum",
    "description": "两数、三数、四数、K 和与树上两数之和，训练哈希、排序双指针和去重边界。",
    "memberSlugs": [
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
      "find-the-k-sum-of-an-array"
    ]
  },
  {
    "key": "subarray-sum",
    "title": "子数组和系列",
    "titleEn": "Subarray Sum",
    "description": "最大/最短/可整除/等于目标的连续子数组和，核心是前缀和、单调队列和动态规划。",
    "memberSlugs": [
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
      "maximum-subarray-sum-with-length-divisible-by-k"
    ]
  },
  {
    "key": "substring",
    "title": "子串窗口系列",
    "titleEn": "Substring Windows",
    "description": "把无重复、最小覆盖、拼接词、奇偶掩码和 K 约束子串放在同一个滑窗/状态压缩图谱里。",
    "memberSlugs": [
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
      "count-substrings-that-satisfy-k-constraint-ii"
    ]
  },
  {
    "key": "parentheses",
    "title": "括号合法性系列",
    "titleEn": "Parentheses",
    "description": "从栈匹配扩展到生成、最长合法段、删除/插入修复、锁定位和网格路径合法性。",
    "memberSlugs": [
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
      "check-if-there-is-a-valid-parentheses-string-path"
    ]
  },
  {
    "key": "islands",
    "title": "岛屿网格系列",
    "titleEn": "Islands",
    "description": "同一张网格图上练 DFS/BFS、并查集、边界外扩、形状规范化和割点思路。",
    "memberSlugs": [
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
      "count-islands-with-total-value-divisible-by-k"
    ]
  },
  {
    "key": "range-sum-query",
    "title": "区域和检索系列",
    "titleEn": "Range Sum Query",
    "description": "数组/矩阵、静态/动态四种组合，串起前缀和、树状数组和线段树。",
    "memberSlugs": [
      "range-sum-query-immutable",
      "range-sum-query-2d-immutable",
      "range-sum-query-mutable",
      "range-sum-query-2d-mutable"
    ]
  },
  {
    "key": "course-schedule",
    "title": "课程表系列",
    "titleEn": "Course Schedule",
    "description": "拓扑排序、返回路径、贪心排课和传递可达性共同组成课程依赖路线。",
    "memberSlugs": [
      "course-schedule",
      "course-schedule-ii",
      "course-schedule-iii",
      "course-schedule-iv"
    ]
  },
  {
    "key": "meeting-rooms",
    "title": "会议室系列",
    "titleEn": "Meeting Rooms",
    "description": "从区间冲突判断到最少会议室，再到房间编号调度，适合连续练扫描线和堆。",
    "memberSlugs": [
      "meeting-rooms",
      "meeting-rooms-ii",
      "meeting-rooms-iii"
    ]
  },
  {
    "key": "word-break",
    "title": "单词拆分系列",
    "titleEn": "Word Break",
    "description": "围绕字典切分，从能否拆分、输出所有句子扩展到连接词和最少额外字符，集中练前缀 DP、Trie 和记忆化搜索。",
    "memberSlugs": [
      "word-break",
      "word-break-ii",
      "concatenated-words",
      "extra-characters-in-a-string"
    ]
  },
  {
    "key": "coin-change",
    "title": "零钱兑换与完全背包",
    "titleEn": "Coin Change",
    "description": "围绕金额凑法，比较最少硬币、组合计数、排列计数、平方数面额、车票区间 DP 和反推硬币面值。",
    "memberSlugs": [
      "coin-change",
      "coin-change-ii",
      "combination-sum-iv",
      "perfect-squares",
      "minimum-cost-for-tickets",
      "inverse-coin-change"
    ]
  },
  {
    "key": "knapsack-dp",
    "title": "背包 DP 经典题",
    "titleEn": "Knapsack DP",
    "description": "把 0/1 背包、二维容量、目标和转换、分组计数和有限选择放在同一条状态定义路线里练。",
    "memberSlugs": [
      "partition-equal-subset-sum",
      "target-sum",
      "ones-and-zeroes",
      "last-stone-weight-ii",
      "profitable-schemes",
      "number-of-ways-to-earn-points",
      "ways-to-express-an-integer-as-sum-of-powers"
    ]
  },
  {
    "key": "string-dp",
    "title": "字符串 DP 经典题",
    "titleEn": "String DP",
    "description": "覆盖匹配、编辑距离、交错、公共子序列、删除代价和超序列，重点练二维状态和边界初始化。",
    "memberSlugs": [
      "regular-expression-matching",
      "wildcard-matching",
      "edit-distance",
      "interleaving-string",
      "longest-common-subsequence",
      "delete-operation-for-two-strings",
      "minimum-ascii-delete-sum-for-two-strings",
      "shortest-common-supersequence"
    ]
  },
  {
    "key": "word-series",
    "title": "单词搜索/拆分/接龙",
    "titleEn": "Word Search, Break, Ladder",
    "description": "把单词表建图、字典 DP、Trie 回溯和最短路径放到一组字符串图问题里。",
    "memberSlugs": [
      "word-ladder",
      "word-ladder-ii",
      "word-break",
      "word-break-ii",
      "word-search",
      "word-search-ii",
      "design-add-and-search-words-data-structure"
    ]
  },
  {
    "key": "n-queens",
    "title": "N 皇后系列",
    "titleEn": "N-Queens",
    "description": "同一个回溯约束，分别训练枚举方案和只计数的剪枝写法。",
    "memberSlugs": [
      "n-queens",
      "n-queens-ii"
    ]
  },
  {
    "key": "bst-iterator",
    "title": "BST 迭代器系列",
    "titleEn": "BST Iterator",
    "description": "围绕中序遍历流，覆盖单向迭代、双向迭代和第 K 小查询。",
    "memberSlugs": [
      "binary-search-tree-iterator",
      "binary-search-tree-iterator-ii",
      "kth-smallest-element-in-a-bst"
    ]
  },
  {
    "key": "linked-list-reversal",
    "title": "链表翻转系列",
    "titleEn": "Linked List Reversal",
    "description": "从整链表、区间、K 组到偶数长度组，集中练指针断开与重接。",
    "memberSlugs": [
      "reverse-linked-list",
      "reverse-linked-list-ii",
      "reverse-nodes-in-k-group",
      "reverse-nodes-in-even-length-groups"
    ]
  },
  {
    "key": "find-peak-element",
    "title": "寻找峰值系列",
    "titleEn": "Find Peak Element",
    "description": "一维和二维峰值都依赖相邻比较与二分收缩，是局部最优存在性证明的典型系列。",
    "memberSlugs": [
      "find-peak-element",
      "find-a-peak-element-ii"
    ]
  },
  {
    "key": "implement-trie",
    "title": "Trie 实现系列",
    "titleEn": "Implement Trie",
    "description": "从基础前缀树扩展到带计数的前缀树，集中练节点结构、路径计数和删除更新。",
    "memberSlugs": [
      "implement-trie-prefix-tree",
      "implement-trie-ii-prefix-tree"
    ]
  },
  {
    "key": "trie-search-design",
    "title": "Trie 搜索与推荐设计",
    "titleEn": "Trie Search and Suggestion Design",
    "description": "从前缀树基础操作扩展到通配符、魔法字典、词根替换、搜索推荐、自动补全和单词方块。",
    "memberSlugs": [
      "implement-trie-prefix-tree",
      "implement-trie-ii-prefix-tree",
      "design-add-and-search-words-data-structure",
      "implement-magic-dictionary",
      "replace-words",
      "search-suggestions-system",
      "design-search-autocomplete-system",
      "word-squares",
      "word-squares-ii"
    ]
  },
  {
    "key": "manual-parser",
    "title": "手写解析器系列",
    "titleEn": "Manual Parser",
    "description": "从 atoi、有效数字、括号表达式、逆波兰式、嵌套结构到 Lisp 表达式，集中练字符扫描、栈和递归下降。",
    "memberSlugs": [
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
      "compare-version-numbers"
    ]
  },
  {
    "key": "insert-delete-getrandom",
    "title": "O(1) 随机集合系列",
    "titleEn": "Insert Delete GetRandom",
    "description": "把数组和哈希表组合起来，分别处理无重复和允许重复的 O(1) 插入、删除、随机访问。",
    "memberSlugs": [
      "insert-delete-getrandom-o1",
      "insert-delete-getrandom-o1-duplicates-allowed"
    ]
  },
  {
    "key": "random-sampling-fairness",
    "title": "随机抽样与公平概率系列",
    "titleEn": "Random Sampling and Fairness",
    "description": "围绕等概率、按权重概率、黑名单映射、水塘采样、洗牌和拒绝采样，建立抽奖公平性的算法基础。",
    "memberSlugs": [
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
      "insert-delete-getrandom-o1-duplicates-allowed"
    ]
  },
  {
    "key": "cache-design",
    "title": "缓存设计系列",
    "titleEn": "Cache Design",
    "description": "从 LRU、LFU 到带过期时间的缓存，集中练哈希表、双向链表、频次桶、淘汰策略和缓存一致性追问。",
    "memberSlugs": [
      "lru-cache",
      "lfu-cache",
      "cache-with-time-limit"
    ]
  },
  {
    "key": "stack-min-max-design",
    "title": "栈结构设计系列",
    "titleEn": "Stack Design",
    "description": "围绕栈 API 扩展最值查询、频率弹出、批量增量和多栈容量，练辅助栈、链表、哈希表和有序结构。",
    "memberSlugs": [
      "min-stack",
      "max-stack",
      "maximum-frequency-stack",
      "design-a-stack-with-increment-operation",
      "dinner-plate-stacks",
      "validate-stack-sequences",
      "build-an-array-with-stack-operations"
    ]
  },
  {
    "key": "stack-queue-adapter",
    "title": "栈队列互实现系列",
    "titleEn": "Stack and Queue Adapters",
    "description": "用两个基础容器模拟另一个容器，重点比较入队/出队、push/pop 的摊还复杂度和空结构边界。",
    "memberSlugs": [
      "implement-queue-using-stacks",
      "implement-stack-using-queues"
    ]
  },
  {
    "key": "queue-deque-design",
    "title": "队列与双端队列设计系列",
    "titleEn": "Queue and Deque Design",
    "description": "从循环队列、循环双端队列到前中后队列、MRU 队列和阻塞队列，练数组取模、双端操作、游标移动和容量边界。",
    "memberSlugs": [
      "design-circular-queue",
      "design-circular-deque",
      "design-front-middle-back-queue",
      "design-most-recently-used-queue",
      "design-bounded-blocking-queue"
    ]
  },
  {
    "key": "hash-table-design",
    "title": "哈希表手写系列",
    "titleEn": "Hash Table Design",
    "description": "从 HashSet、HashMap 到随机集合、时间键值表和全 O(1) 结构，练桶数组、冲突处理、删除语义、resize 和 load factor 追问。",
    "memberSlugs": [
      "design-hashset",
      "design-hashmap",
      "insert-delete-getrandom-o1",
      "insert-delete-getrandom-o1-duplicates-allowed",
      "two-sum-iii-data-structure-design",
      "all-oone-data-structure",
      "time-based-key-value-store",
      "design-a-number-container-system",
      "frequency-tracker"
    ]
  },
  {
    "key": "frequency-bucket-design",
    "title": "频次桶设计系列",
    "titleEn": "Frequency Bucket Design",
    "description": "把 key 的频次变化作为核心状态，练 O(1) 频次迁移、最小频次、最大/最小 key 查询和高频元素维护。",
    "memberSlugs": [
      "lfu-cache",
      "all-oone-data-structure",
      "maximum-frequency-stack",
      "frequency-tracker",
      "most-frequent-ids",
      "design-a-number-container-system"
    ]
  },
  {
    "key": "history-version-design",
    "title": "历史与版本设计系列",
    "titleEn": "History and Version Design",
    "description": "从浏览器前进后退到数组快照和时间键值表，练游标、版本号、懒拷贝和按时间二分查询。",
    "memberSlugs": [
      "design-browser-history",
      "snapshot-array",
      "time-based-key-value-store"
    ]
  },
  {
    "key": "top-k-frequency",
    "title": "Top K 高频统计系列",
    "titleEn": "Top K Frequency",
    "description": "从词频、字符频率、前 K 高频到区间频次和实时频次，串起哈希计数、桶、堆、排序和海量数据 TopK 追问。",
    "memberSlugs": [
      "word-frequency",
      "top-k-frequent-elements",
      "sort-characters-by-frequency",
      "sort-array-by-increasing-frequency",
      "top-k-frequent-words",
      "most-frequent-subtree-sum",
      "reward-top-k-students",
      "range-frequency-queries",
      "tweet-counts-per-frequency",
      "most-frequent-ids"
    ]
  },
  {
    "key": "top-k-selection",
    "title": "Top K 选择系列",
    "titleEn": "Top K Selection",
    "description": "围绕只取前 K 个候选，比较全排序、大小为 K 的堆、快选、多路归并和在线维护。",
    "memberSlugs": [
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
      "merge-k-sorted-lists"
    ]
  },
  {
    "key": "kth-order-statistics",
    "title": "第 K 大/第 K 小顺序统计系列",
    "titleEn": "Kth Order Statistics",
    "description": "把第 K 项问题从数组扩展到矩阵、乘法表、数对距离、分数、字典序、树和组合和，训练二分答案、堆、快选和计数。",
    "memberSlugs": [
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
      "kth-smallest-amount-with-single-denomination-combination"
    ]
  },
  {
    "key": "median-statistics",
    "title": "中位数统计系列",
    "titleEn": "Median Statistics",
    "description": "覆盖静态有序数据、双堆数据流、滑动窗口、行有序矩阵、频次表和可更新统计器里的中位数维护。",
    "memberSlugs": [
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
      "median-of-a-binary-search-tree-level"
    ]
  },
  {
    "key": "stream-statistics-design",
    "title": "数据流统计设计系列",
    "titleEn": "Stream Statistics Design",
    "description": "从移动平均、最近请求、点击计数、推文频率到在线第 K 大和中位数，练时间窗口、队列、堆、有序集合和增量聚合。",
    "memberSlugs": [
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
      "detect-squares"
    ]
  },
  {
    "key": "stream-rate-counter-design",
    "title": "数据流计数与限流设计",
    "titleEn": "Stream Counter and Rate Limiter Design",
    "description": "用队列、哈希表和有序结构维护时间窗口、请求频率、点击计数、推文频率和 token 过期。",
    "memberSlugs": [
      "logger-rate-limiter",
      "moving-average-from-data-stream",
      "number-of-recent-calls",
      "design-hit-counter",
      "tweet-counts-per-frequency",
      "design-authentication-manager"
    ]
  },
  {
    "key": "massive-set-dedup-intersection",
    "title": "海量集合去重与求交系列",
    "titleEn": "Massive Set Dedup and Intersection",
    "description": "用数组、字符串和 SQL 题映射海量 URL 去重、求交、重复检测、哈希归一化和外部排序/分片追问。",
    "memberSlugs": [
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
      "delete-duplicate-emails"
    ]
  },
  {
    "key": "serialize-and-deserialize",
    "title": "序列化与反序列化系列",
    "titleEn": "Serialize and Deserialize",
    "description": "同一套编码/解码不变量，覆盖普通二叉树、二叉搜索树和 N 叉树结构。",
    "memberSlugs": [
      "serialize-and-deserialize-binary-tree",
      "serialize-and-deserialize-bst",
      "serialize-and-deserialize-n-ary-tree"
    ]
  },
  {
    "key": "design-file-system",
    "title": "文件系统设计系列",
    "titleEn": "Design File System",
    "description": "从路径注册到内存文件系统，练习 Trie 式目录树、文件内容和路径命令语义。",
    "memberSlugs": [
      "design-file-system",
      "design-in-memory-file-system"
    ]
  },
  {
    "key": "flatten-structures",
    "title": "扁平化结构系列",
    "titleEn": "Flatten Structures",
    "description": "把树、二维向量、嵌套列表、多级链表和嵌套数组统一到迭代/递归展开模型里。",
    "memberSlugs": [
      "flatten-binary-tree-to-linked-list",
      "flatten-2d-vector",
      "flatten-nested-list-iterator",
      "flatten-a-multilevel-doubly-linked-list",
      "flatten-deeply-nested-array"
    ]
  },
  {
    "key": "alien-dictionary",
    "title": "外星语词典系列",
    "titleEn": "Alien Dictionary",
    "description": "从验证给定字母序到从词表反推出字母序，覆盖自定义排序和拓扑建图。",
    "memberSlugs": [
      "alien-dictionary",
      "verifying-an-alien-dictionary"
    ]
  },
  {
    "key": "game-play-analysis",
    "title": "游戏玩法分析系列",
    "titleEn": "Game Play Analysis",
    "description": "数据库题中的玩家活动分析系列，适合连续练首次登录、留存和事件聚合。",
    "memberSlugs": [
      "game-play-analysis-i",
      "game-play-analysis-ii",
      "game-play-analysis-iii",
      "game-play-analysis-iv",
      "game-play-analysis-v"
    ]
  },
  {
    "key": "product-sales-analysis",
    "title": "产品销售分析系列",
    "titleEn": "Product Sales Analysis",
    "description": "围绕销售表和产品表的连接、聚合与分组统计，覆盖产品销售分析的多个阶段。",
    "memberSlugs": [
      "product-sales-analysis-i",
      "product-sales-analysis-ii",
      "product-sales-analysis-iii",
      "product-sales-analysis-iv",
      "product-sales-analysis-v"
    ]
  },
  {
    "key": "sales-analysis",
    "title": "销售分析系列",
    "titleEn": "Sales Analysis",
    "description": "以销售记录为核心，练习按时间、产品和用户维度做筛选与聚合。",
    "memberSlugs": [
      "sales-analysis-i",
      "sales-analysis-ii",
      "sales-analysis-iii"
    ]
  },
  {
    "key": "article-views",
    "title": "文章浏览系列",
    "titleEn": "Article Views",
    "description": "围绕作者与浏览者关系建模，训练去重、自连接和用户行为过滤。",
    "memberSlugs": [
      "article-views-i",
      "article-views-ii"
    ]
  },
  {
    "key": "immediate-food-delivery",
    "title": "即时食物配送系列",
    "titleEn": "Immediate Food Delivery",
    "description": "配送订单分析系列，覆盖即时订单比例和首次订单口径。",
    "memberSlugs": [
      "immediate-food-delivery-i",
      "immediate-food-delivery-ii",
      "immediate-food-delivery-iii"
    ]
  },
  {
    "key": "monthly-transactions",
    "title": "每月交易系列",
    "titleEn": "Monthly Transactions",
    "description": "按月份和国家聚合交易金额、数量与状态，是 SQL 时间分桶的典型系列。",
    "memberSlugs": [
      "monthly-transactions-i",
      "monthly-transactions-ii"
    ]
  },
  {
    "key": "user-activity-for-the-past-30-days",
    "title": "近 30 天用户活动系列",
    "titleEn": "User Activity for the Past 30 Days",
    "description": "围绕最近 30 天窗口统计活跃用户和会话，练习日期过滤与分组。",
    "memberSlugs": [
      "user-activity-for-the-past-30-days-i",
      "user-activity-for-the-past-30-days-ii"
    ]
  },
  {
    "key": "invalid-tweets",
    "title": "无效推文系列",
    "titleEn": "Invalid Tweets",
    "description": "小型 SQL 文本过滤系列，覆盖长度、内容和条件过滤。",
    "memberSlugs": [
      "invalid-tweets",
      "invalid-tweets-ii"
    ]
  },
  {
    "key": "second-highest-salary",
    "title": "第 N 高薪水系列",
    "titleEn": "Second Highest Salary",
    "description": "从第二高薪水扩展到更一般的排名薪水查询，训练去重排序和空值处理。",
    "memberSlugs": [
      "second-highest-salary",
      "second-highest-salary-ii"
    ]
  },
  {
    "key": "friend-requests",
    "title": "好友申请系列",
    "titleEn": "Friend Requests",
    "description": "好友申请 SQL 系列，覆盖整体通过率和好友关系聚合统计。",
    "memberSlugs": [
      "friend-requests-i-overall-acceptance-rate",
      "friend-requests-ii-who-has-the-most-friends"
    ]
  },
  {
    "key": "add-two-numbers",
    "title": "两数相加系列",
    "titleEn": "Add Two Numbers",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "add-two-numbers",
      "add-two-numbers-ii"
    ]
  },
  {
    "key": "basic-calculator",
    "title": "基本计算器系列",
    "titleEn": "Basic Calculator",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "basic-calculator",
      "basic-calculator-ii",
      "basic-calculator-iii",
      "basic-calculator-iv"
    ]
  },
  {
    "key": "beautiful-arrangement",
    "title": "优美的排列系列",
    "titleEn": "Beautiful Arrangement",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "beautiful-arrangement",
      "beautiful-arrangement-ii"
    ]
  },
  {
    "key": "best-time-to-buy-and-sell-stock",
    "title": "买卖股票的最佳时机系列",
    "titleEn": "Best Time to Buy and Sell Stock",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "best-time-to-buy-and-sell-stock",
      "best-time-to-buy-and-sell-stock-ii",
      "best-time-to-buy-and-sell-stock-iii",
      "best-time-to-buy-and-sell-stock-iv",
      "best-time-to-buy-and-sell-stock-v"
    ]
  },
  {
    "key": "binary-tree-level-order-traversal",
    "title": "二叉树的层序遍历系列",
    "titleEn": "Binary Tree Level Order Traversal",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "binary-tree-level-order-traversal",
      "binary-tree-level-order-traversal-ii"
    ]
  },
  {
    "key": "bulb-switcher",
    "title": "灯泡开关系列",
    "titleEn": "Bulb Switcher",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "bulb-switcher",
      "bulb-switcher-ii"
    ]
  },
  {
    "key": "car-fleet",
    "title": "车队系列",
    "titleEn": "Car Fleet",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "car-fleet",
      "car-fleet-ii"
    ]
  },
  {
    "key": "check-if-strings-can-be-made-equal-with-operations",
    "title": "判断通过操作能否让字符串相等 I系列",
    "titleEn": "Check if Strings Can be Made Equal With Operations I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "check-if-strings-can-be-made-equal-with-operations-i",
      "check-if-strings-can-be-made-equal-with-operations-ii"
    ]
  },
  {
    "key": "climbing-stairs",
    "title": "爬楼梯系列",
    "titleEn": "Climbing Stairs",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "climbing-stairs",
      "climbing-stairs-ii"
    ]
  },
  {
    "key": "combination-sum",
    "title": "组合总和系列",
    "titleEn": "Combination Sum",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "combination-sum",
      "combination-sum-ii",
      "combination-sum-iii",
      "combination-sum-iv"
    ]
  },
  {
    "key": "construct-the-minimum-bitwise-array",
    "title": "构造最小位运算数组 I系列",
    "titleEn": "Construct the Minimum Bitwise Array I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "construct-the-minimum-bitwise-array-i",
      "construct-the-minimum-bitwise-array-ii"
    ]
  },
  {
    "key": "contains-duplicate",
    "title": "存在重复元素系列",
    "titleEn": "Contains Duplicate",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "contains-duplicate",
      "contains-duplicate-ii",
      "contains-duplicate-iii"
    ]
  },
  {
    "key": "count-number-of-trapezoids",
    "title": "统计梯形的数目 I系列",
    "titleEn": "Count Number of Trapezoids I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "count-number-of-trapezoids-i",
      "count-number-of-trapezoids-ii"
    ]
  },
  {
    "key": "decode-ways",
    "title": "解码方法系列",
    "titleEn": "Decode Ways",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "decode-ways",
      "decode-ways-ii"
    ]
  },
  {
    "key": "delete-columns-to-make-sorted",
    "title": "删列造序系列",
    "titleEn": "Delete Columns to Make Sorted",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "delete-columns-to-make-sorted",
      "delete-columns-to-make-sorted-ii",
      "delete-columns-to-make-sorted-iii"
    ]
  },
  {
    "key": "diagonal-traverse",
    "title": "对角线遍历系列",
    "titleEn": "Diagonal Traverse",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "diagonal-traverse",
      "diagonal-traverse-ii"
    ]
  },
  {
    "key": "distinct-subsequences",
    "title": "不同的子序列系列",
    "titleEn": "Distinct Subsequences",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "distinct-subsequences",
      "distinct-subsequences-ii"
    ]
  },
  {
    "key": "divide-an-array-into-subarrays-with-minimum-cost",
    "title": "将数组分成最小总代价的子数组 I系列",
    "titleEn": "Divide an Array Into Subarrays With Minimum Cost I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "divide-an-array-into-subarrays-with-minimum-cost-i",
      "divide-an-array-into-subarrays-with-minimum-cost-ii"
    ]
  },
  {
    "key": "find-all-possible-stable-binary-arrays",
    "title": "找出所有稳定的二进制数组 I系列",
    "titleEn": "Find All Possible Stable Binary Arrays I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "find-all-possible-stable-binary-arrays-i",
      "find-all-possible-stable-binary-arrays-ii"
    ]
  },
  {
    "key": "find-minimum-in-rotated-sorted-array",
    "title": "寻找旋转排序数组中的最小值系列",
    "titleEn": "Find Minimum in Rotated Sorted Array",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "find-minimum-in-rotated-sorted-array",
      "find-minimum-in-rotated-sorted-array-ii"
    ]
  },
  {
    "key": "find-the-k-th-character-in-string-game",
    "title": "找出第 K 个字符 I系列",
    "titleEn": "Find the K-th Character in String Game I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "find-the-k-th-character-in-string-game-i",
      "find-the-k-th-character-in-string-game-ii"
    ]
  },
  {
    "key": "h-index",
    "title": "H 指数系列",
    "titleEn": "H-Index",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "h-index",
      "h-index-ii"
    ]
  },
  {
    "key": "intersection-of-two-arrays",
    "title": "两个数组的交集系列",
    "titleEn": "Intersection of Two Arrays",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "intersection-of-two-arrays",
      "intersection-of-two-arrays-ii"
    ]
  },
  {
    "key": "last-stone-weight",
    "title": "最后一块石头的重量系列",
    "titleEn": "Last Stone Weight",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "last-stone-weight",
      "last-stone-weight-ii"
    ]
  },
  {
    "key": "linked-list-cycle",
    "title": "环形链表系列",
    "titleEn": "Linked List Cycle",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "linked-list-cycle",
      "linked-list-cycle-ii"
    ]
  },
  {
    "key": "longest-balanced-subarray",
    "title": "最长平衡子数组 I系列",
    "titleEn": "Longest Balanced Subarray I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "longest-balanced-subarray-i",
      "longest-balanced-subarray-ii"
    ]
  },
  {
    "key": "longest-balanced-substring",
    "title": "最长的平衡子串 I系列",
    "titleEn": "Longest Balanced Substring I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "longest-balanced-substring-i",
      "longest-balanced-substring-ii"
    ]
  },
  {
    "key": "longest-increasing-subsequence",
    "title": "最长递增子序列系列",
    "titleEn": "Longest Increasing Subsequence",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "longest-increasing-subsequence",
      "longest-increasing-subsequence-ii"
    ]
  },
  {
    "key": "longest-palindromic-subsequence",
    "title": "最长回文子序列系列",
    "titleEn": "Longest Palindromic Subsequence",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "longest-palindromic-subsequence",
      "longest-palindromic-subsequence-ii"
    ]
  },
  {
    "key": "lowest-common-ancestor-of-a-binary-tree",
    "title": "二叉树的最近公共祖先系列",
    "titleEn": "Lowest Common Ancestor of a Binary Tree",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "lowest-common-ancestor-of-a-binary-tree",
      "lowest-common-ancestor-of-a-binary-tree-ii",
      "lowest-common-ancestor-of-a-binary-tree-iii",
      "lowest-common-ancestor-of-a-binary-tree-iv"
    ]
  },
  {
    "key": "majority-element",
    "title": "多数元素系列",
    "titleEn": "Majority Element",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "majority-element",
      "majority-element-ii"
    ]
  },
  {
    "key": "max-consecutive-ones",
    "title": "最大连续 1 的个数系列",
    "titleEn": "Max Consecutive Ones",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "max-consecutive-ones",
      "max-consecutive-ones-ii",
      "max-consecutive-ones-iii"
    ]
  },
  {
    "key": "maximum-array-hopping-score",
    "title": "最大数组跳跃得分 I系列",
    "titleEn": "Maximum Array Hopping Score I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "maximum-array-hopping-score-i",
      "maximum-array-hopping-score-ii"
    ]
  },
  {
    "key": "maximum-average-subarray",
    "title": "子数组最大平均数 I系列",
    "titleEn": "Maximum Average Subarray I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "maximum-average-subarray-i",
      "maximum-average-subarray-ii"
    ]
  },
  {
    "key": "maximum-binary-tree",
    "title": "最大二叉树系列",
    "titleEn": "Maximum Binary Tree",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "maximum-binary-tree",
      "maximum-binary-tree-ii"
    ]
  },
  {
    "key": "maximum-number-of-events-that-can-be-attended",
    "title": "最多可以参加的会议数目系列",
    "titleEn": "Maximum Number of Events That Can Be Attended",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "maximum-number-of-events-that-can-be-attended",
      "maximum-number-of-events-that-can-be-attended-ii"
    ]
  },
  {
    "key": "minimize-malware-spread",
    "title": "尽量减少恶意软件的传播系列",
    "titleEn": "Minimize Malware Spread",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimize-malware-spread",
      "minimize-malware-spread-ii"
    ]
  },
  {
    "key": "minimum-cost-to-convert-string",
    "title": "转换字符串的最小成本 I系列",
    "titleEn": "Minimum Cost to Convert String I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimum-cost-to-convert-string-i",
      "minimum-cost-to-convert-string-ii"
    ]
  },
  {
    "key": "minimum-falling-path-sum",
    "title": "下降路径最小和系列",
    "titleEn": "Minimum Falling Path Sum",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimum-falling-path-sum",
      "minimum-falling-path-sum-ii"
    ]
  },
  {
    "key": "minimum-operations-to-make-binary-array-elements-equal-to-one",
    "title": "使二进制数组全部等于 1 的最少操作次数 I系列",
    "titleEn": "Minimum Operations to Make Binary Array Elements Equal to One I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimum-operations-to-make-binary-array-elements-equal-to-one-i",
      "minimum-operations-to-make-binary-array-elements-equal-to-one-ii"
    ]
  },
  {
    "key": "minimum-pair-removal-to-sort-array",
    "title": "移除最小数对使数组有序 I系列",
    "titleEn": "Minimum Pair Removal to Sort Array I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimum-pair-removal-to-sort-array-i",
      "minimum-pair-removal-to-sort-array-ii"
    ]
  },
  {
    "key": "minimum-partition-score",
    "title": "最小分割分数系列",
    "titleEn": "Minimum Partition Score",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "minimum-partition-score",
      "minimum-partition-score-ii"
    ]
  },
  {
    "key": "next-greater-element",
    "title": "下一个更大元素 I系列",
    "titleEn": "Next Greater Element I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "next-greater-element-i",
      "next-greater-element-ii",
      "next-greater-element-iii",
      "next-greater-element-iv"
    ]
  },
  {
    "key": "number-of-distinct-islands",
    "title": "不同岛屿的数量系列",
    "titleEn": "Number of Distinct Islands",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "number-of-distinct-islands",
      "number-of-distinct-islands-ii"
    ]
  },
  {
    "key": "number-of-islands",
    "title": "岛屿数量系列",
    "titleEn": "Number of Islands",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "number-of-islands",
      "number-of-islands-ii"
    ]
  },
  {
    "key": "number-of-unique-xor-triplets",
    "title": "不同 XOR 三元组的数目 I系列",
    "titleEn": "Number of Unique XOR Triplets I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "number-of-unique-xor-triplets-i",
      "number-of-unique-xor-triplets-ii"
    ]
  },
  {
    "key": "palindrome-partitioning",
    "title": "分割回文串系列",
    "titleEn": "Palindrome Partitioning",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "palindrome-partitioning",
      "palindrome-partitioning-ii",
      "palindrome-partitioning-iii",
      "palindrome-partitioning-iv"
    ]
  },
  {
    "key": "parallel-courses",
    "title": "并行课程系列",
    "titleEn": "Parallel Courses",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "parallel-courses",
      "parallel-courses-ii",
      "parallel-courses-iii"
    ]
  },
  {
    "key": "pascals-triangle",
    "title": "杨辉三角系列",
    "titleEn": "Pascal's Triangle",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "pascals-triangle",
      "pascals-triangle-ii"
    ]
  },
  {
    "key": "path-sum",
    "title": "路径总和系列",
    "titleEn": "Path Sum",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "path-sum",
      "path-sum-ii",
      "path-sum-iii",
      "path-sum-iv"
    ]
  },
  {
    "key": "populating-next-right-pointers-in-each-node",
    "title": "填充每个节点的下一个右侧节点指针系列",
    "titleEn": "Populating Next Right Pointers in Each Node",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "populating-next-right-pointers-in-each-node",
      "populating-next-right-pointers-in-each-node-ii"
    ]
  },
  {
    "key": "redundant-connection",
    "title": "冗余连接系列",
    "titleEn": "Redundant Connection",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "redundant-connection",
      "redundant-connection-ii"
    ]
  },
  {
    "key": "remove-all-adjacent-duplicates-in-string",
    "title": "删除字符串中的所有相邻重复项系列",
    "titleEn": "Remove All Adjacent Duplicates In String",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "remove-all-adjacent-duplicates-in-string",
      "remove-all-adjacent-duplicates-in-string-ii"
    ]
  },
  {
    "key": "remove-duplicates-from-sorted-array",
    "title": "删除有序数组中的重复项系列",
    "titleEn": "Remove Duplicates from Sorted Array",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "remove-duplicates-from-sorted-array",
      "remove-duplicates-from-sorted-array-ii"
    ]
  },
  {
    "key": "remove-duplicates-from-sorted-list",
    "title": "删除排序链表中的重复元素系列",
    "titleEn": "Remove Duplicates from Sorted List",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "remove-duplicates-from-sorted-list",
      "remove-duplicates-from-sorted-list-ii"
    ]
  },
  {
    "key": "reschedule-meetings-for-maximum-free-time",
    "title": "重新安排会议得到最多空余时间 I系列",
    "titleEn": "Reschedule Meetings for Maximum Free Time I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "reschedule-meetings-for-maximum-free-time-i",
      "reschedule-meetings-for-maximum-free-time-ii"
    ]
  },
  {
    "key": "reverse-linked-list",
    "title": "反转链表系列",
    "titleEn": "Reverse Linked List",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "reverse-linked-list",
      "reverse-linked-list-ii"
    ]
  },
  {
    "key": "reverse-string",
    "title": "反转字符串系列",
    "titleEn": "Reverse String",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "reverse-string",
      "reverse-string-ii"
    ]
  },
  {
    "key": "reverse-words-in-a-string",
    "title": "反转字符串中的单词系列",
    "titleEn": "Reverse Words in a String",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "reverse-words-in-a-string",
      "reverse-words-in-a-string-ii",
      "reverse-words-in-a-string-iii"
    ]
  },
  {
    "key": "search-a-2d-matrix",
    "title": "搜索二维矩阵系列",
    "titleEn": "Search a 2D Matrix",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "search-a-2d-matrix",
      "search-a-2d-matrix-ii"
    ]
  },
  {
    "key": "search-in-rotated-sorted-array",
    "title": "搜索旋转排序数组系列",
    "titleEn": "Search in Rotated Sorted Array",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "search-in-rotated-sorted-array",
      "search-in-rotated-sorted-array-ii"
    ]
  },
  {
    "key": "sentence-similarity",
    "title": "句子相似性系列",
    "titleEn": "Sentence Similarity",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "sentence-similarity",
      "sentence-similarity-ii",
      "sentence-similarity-iii"
    ]
  },
  {
    "key": "separate-squares",
    "title": "分割正方形 I系列",
    "titleEn": "Separate Squares I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "separate-squares-i",
      "separate-squares-ii"
    ]
  },
  {
    "key": "shortest-subarray-with-or-at-least-k",
    "title": "或值至少为 K 的最短子数组 I系列",
    "titleEn": "Shortest Subarray With OR at Least K I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "shortest-subarray-with-or-at-least-k-i",
      "shortest-subarray-with-or-at-least-k-ii"
    ]
  },
  {
    "key": "single-number",
    "title": "只出现一次的数字系列",
    "titleEn": "Single Number",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "single-number",
      "single-number-ii",
      "single-number-iii"
    ]
  },
  {
    "key": "sort-array-by-parity",
    "title": "按奇偶排序数组系列",
    "titleEn": "Sort Array By Parity",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "sort-array-by-parity",
      "sort-array-by-parity-ii"
    ]
  },
  {
    "key": "spiral-matrix",
    "title": "螺旋矩阵系列",
    "titleEn": "Spiral Matrix",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "spiral-matrix",
      "spiral-matrix-ii",
      "spiral-matrix-iii",
      "spiral-matrix-iv"
    ]
  },
  {
    "key": "stone-game",
    "title": "石子游戏系列",
    "titleEn": "Stone Game",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "stone-game",
      "stone-game-ii",
      "stone-game-iii",
      "stone-game-iv",
      "stone-game-v",
      "stone-game-vi",
      "stone-game-vii",
      "stone-game-viii",
      "stone-game-ix"
    ]
  },
  {
    "key": "strange-printer",
    "title": "奇怪的打印机系列",
    "titleEn": "Strange Printer",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "strange-printer",
      "strange-printer-ii"
    ]
  },
  {
    "key": "string-compression",
    "title": "压缩字符串系列",
    "titleEn": "String Compression",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "string-compression",
      "string-compression-ii",
      "string-compression-iii"
    ]
  },
  {
    "key": "student-attendance-record",
    "title": "学生出勤记录 I系列",
    "titleEn": "Student Attendance Record I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "student-attendance-record-i",
      "student-attendance-record-ii"
    ]
  },
  {
    "key": "task-scheduler",
    "title": "任务调度器系列",
    "titleEn": "Task Scheduler",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "task-scheduler",
      "task-scheduler-ii"
    ]
  },
  {
    "key": "the-maze",
    "title": "迷宫系列",
    "titleEn": "The Maze",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "the-maze",
      "the-maze-ii",
      "the-maze-iii"
    ]
  },
  {
    "key": "trapping-rain-water",
    "title": "接雨水系列",
    "titleEn": "Trapping Rain Water",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "trapping-rain-water",
      "trapping-rain-water-ii"
    ]
  },
  {
    "key": "trionic-array",
    "title": "三段式数组 I系列",
    "titleEn": "Trionic Array I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "trionic-array-i",
      "trionic-array-ii"
    ]
  },
  {
    "key": "two-sum",
    "title": "两数之和系列",
    "titleEn": "Two Sum",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "two-sum",
      "two-sum-ii-input-array-is-sorted",
      "two-sum-iii-data-structure-design",
      "two-sum-iv-input-is-a-bst"
    ]
  },
  {
    "key": "ugly-number",
    "title": "丑数系列",
    "titleEn": "Ugly Number",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "ugly-number",
      "ugly-number-ii",
      "ugly-number-iii"
    ]
  },
  {
    "key": "unique-binary-search-trees",
    "title": "不同的二叉搜索树系列",
    "titleEn": "Unique Binary Search Trees",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "unique-binary-search-trees",
      "unique-binary-search-trees-ii"
    ]
  },
  {
    "key": "unique-paths",
    "title": "不同路径系列",
    "titleEn": "Unique Paths",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "unique-paths",
      "unique-paths-ii",
      "unique-paths-iii"
    ]
  },
  {
    "key": "valid-palindrome",
    "title": "验证回文串系列",
    "titleEn": "Valid Palindrome",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "valid-palindrome",
      "valid-palindrome-ii",
      "valid-palindrome-iii",
      "valid-palindrome-iv"
    ]
  },
  {
    "key": "wiggle-sort",
    "title": "摆动排序系列",
    "titleEn": "Wiggle Sort",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "wiggle-sort",
      "wiggle-sort-ii"
    ]
  },
  {
    "key": "word-ladder",
    "title": "单词接龙系列",
    "titleEn": "Word Ladder",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "word-ladder",
      "word-ladder-ii"
    ]
  },
  {
    "key": "word-pattern",
    "title": "单词规律系列",
    "titleEn": "Word Pattern",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "word-pattern",
      "word-pattern-ii"
    ]
  },
  {
    "key": "word-search",
    "title": "单词搜索系列",
    "titleEn": "Word Search",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "word-search",
      "word-search-ii"
    ]
  },
  {
    "key": "xor-after-range-multiplication-queries",
    "title": "区间乘法查询后的异或 I系列",
    "titleEn": "XOR After Range Multiplication Queries I",
    "description": "力扣官方标题中带有连续编号的同名系列题，适合按编号顺序成组练习。",
    "memberSlugs": [
      "xor-after-range-multiplication-queries-i",
      "xor-after-range-multiplication-queries-ii"
    ]
  }
]) satisfies LeetcodeSeriesDefinition[];

export const leetcodeSeriesProblems = ([
  {
    "acRate": "45.8%",
    "difficulty": "中等",
    "frontendId": "45",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0045.Jump%20Game%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Jump Game II",
    "titleCn": "跳跃游戏 II",
    "titleSlug": "jump-game-ii",
    "url": "https://leetcode.cn/problems/jump-game-ii/description/",
    "statementPreview": "给定一个长度为 n 的 0 索引 整数数组 nums。初始位置在下标 0。 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处： 0 <= j <= nums[i] 且 i + j < n 返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。",
    "approachPreview": "我们可以用变量 mx 记录当前位置能够到达的最远位置，用变量 last 记录上一次跳跃到的位置，用变量 ans 记录跳跃的次数。 接下来，我们遍历 [0,..n - 2] 的每一个位置 i，对于每一个位置 i，我们可以通过 i + nums[i] 计算出当前位置能够到达的最远位置，我们用 mx 来记录这个最远位置，即 mx = max(mx, i + nums[i])。接下来，判断当前位置是否到达了上一次跳跃的边界，即 i = last，如果到达了，那么我们就需要进行一次跳跃，将 last 更新为 mx，并且将跳跃次数 ans 增加 1。 最后，我们返回跳跃的次数 ans 即可。 时间复杂度 O(n)，其中 n 是数组的长度。空间复杂度 O(1)。 相似题目：",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "45.0%",
    "difficulty": "中等",
    "frontendId": "55",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0055.Jump%20Game/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Jump Game",
    "titleCn": "跳跃游戏",
    "titleSlug": "jump-game",
    "url": "https://leetcode.cn/problems/jump-game/description/",
    "statementPreview": "给你一个非负整数数组 nums，你最初位于数组的 第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。 判断你是否能够到达最后一个下标，如果可以，返回 true；否则，返回 false。",
    "approachPreview": "我们用变量 mx 维护当前能够到达的最远下标，初始时 mx = 0。 我们从左到右遍历数组，对于遍历到的每个位置 i，如果 mx \\lt i，说明当前位置无法到达，直接返回 false。否则，我们可以通过跳跃从位置 i 到达的最远位置为 i+nums[i]，我们用 i+nums[i] 更新 mx 的值，即 mx = \\max(mx, i + nums[i])。 遍历结束，直接返回 true。 时间复杂度 O(n)，其中 n 为数组的长度。空间复杂度 O(1)。 相似题目：",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "62.3%",
    "difficulty": "中等",
    "frontendId": "1306",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1306.Jump%20Game%20III/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Jump Game III",
    "titleCn": "跳跃游戏 III",
    "titleSlug": "jump-game-iii",
    "url": "https://leetcode.cn/problems/jump-game-iii/description/",
    "statementPreview": "这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。 请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。 注意，不管是什么情况下，你都无法跳到数组之外。",
    "approachPreview": "我们可以使用 BFS 来判断是否能够到达值为 0 的下标。 定义一个队列 q，用于存储当前能够到达的下标。初始时，将 start 下标入队。 当队列不为空时，取出队首下标 i，如果 arr[i] = 0，则返回 true。否则，我们将下标 i 标记为已访问，如果 i + arr[i] 和 i - arr[i] 在数组范围内且未被访问过，则将其入队，继续搜索。 最后，如果队列为空，说明无法到达值为 0 的下标，返回 false。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "64.7%",
    "difficulty": "困难",
    "frontendId": "1340",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1340.Jump%20Game%20V/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Jump Game V",
    "titleCn": "跳跃游戏 V",
    "titleSlug": "jump-game-v",
    "url": "https://leetcode.cn/problems/jump-game-v/description/",
    "statementPreview": "给你一个整数数组 arr 和一个整数 d。每一步你可以从下标 i 跳到： i + x，其中 i + x < arr.length 且 0 < x <= d。 i - x，其中 i - x >= 0 且 0 < x <= d。 除此以外，你从下标 i 跳到下标 j 需要满足： arr[i] > arr[j] 且 arr[i] > arr[k]，其中下标 k 是所有 i 到 j 之间的数字（更正式的， min(i, j) < k < max(i, j) ）。 你可以选择数组的任意下标开始跳跃。请你返回你 最多 可以访问多少个下标。 请注意，任何时刻你都不能跳到数组的外面。",
    "approachPreview": "我们设计一个函数 dfs(i)，表示从下标 i 开始跳跃能够访问的最大下标数。我们可以枚举 i 的所有合法的跳跃目标 j，即 i - d \\leq j \\leq i + d，并且 arr[i] \\gt arr[j]。对于每个合法的 j，我们可以递归地计算 dfs(j)，并取其中的最大值。最终的答案即为所有 i 的 dfs(i) 的最大值。 我们可以使用记忆化搜索来优化这个过程，即使用一个数组 f 记录每个下标的 dfs 值，避免重复计算。 时间复杂度 O(n \\times d)，空间复杂度 O(n)。其中 n 为数组 arr 的长度。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 V 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "47.8%",
    "difficulty": "困难",
    "frontendId": "1345",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1345.Jump%20Game%20IV/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Jump Game IV",
    "titleCn": "跳跃游戏 IV",
    "titleSlug": "jump-game-iv",
    "url": "https://leetcode.cn/problems/jump-game-iv/description/",
    "statementPreview": "给你一个整数数组 arr，你一开始在数组的第一个元素处（下标为 0）。 每一步，你可以从下标 i 跳到下标 i + 1、 i - 1 或者 j： i + 1 需满足： i + 1 < arr.length i - 1 需满足： i - 1 >= 0 j 需满足： arr[i] == arr[j] 且 i != j 请你返回到达数组最后一个元素的下标处所需的 最少操作次数。 注意：任何时候你都不能跳到数组外面。",
    "approachPreview": "把每个下标看成图节点，普通边是 i-1 和 i+1，同值下标之间也可以互达。用 BFS 按层扩展，第一次到达最后一个下标就是最少步数；每个值对应的下标列表用过后立即清空，避免同值边反复扫描导致退化。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "44.7%",
    "difficulty": "中等",
    "frontendId": "1696",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1696.Jump%20Game%20VI/README.md",
    "tags": [
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "monotonic-queue",
        "name": "单调队列"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Jump Game VI",
    "titleCn": "跳跃游戏 VI",
    "titleSlug": "jump-game-vi",
    "url": "https://leetcode.cn/problems/jump-game-vi/description/",
    "statementPreview": "给你一个下标从 0 开始的整数数组 nums 和一个整数 k。 一开始你在下标 0 处。每一步，你最多可以往前跳 k 步，但你不能跳出数组的边界。也就是说，你可以从下标 i 跳到 [i + 1， min(n - 1, i + k)] 包含 两个端点的任意位置。 你的目标是到达数组最后一个位置（下标为 n - 1 ），你的 得分 为经过的所有数字之和。 请你返回你能得到的 最大得分。",
    "approachPreview": "我们定义 f[i] 表示到达下标 i 的最大得分，那么 f[i] 的值可以从 f[j] 转移而来，其中 j 满足 i - k \\leq j \\leq i - 1。因此我们可以使用动态规划求解。 状态转移方程为： f[i] = \\max_{j \\in [i - k, i - 1]} f[j] + nums[i] 我们可以使用单调队列优化状态转移方程，具体做法是维护一个单调递减的队列，队列中存储的是下标 j，并且队列中的下标对应的 f[j] 值是单调递减的。在进行状态转移时，我们只需要取出队首的下标 j，即可得到 f[j] 的最大值，然后将 f[i] 的值更新为 f[j] + nums[i] 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 VI 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "30.7%",
    "difficulty": "中等",
    "frontendId": "1871",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1800-1899/1871.Jump%20Game%20VII/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Jump Game VII",
    "titleCn": "跳跃游戏 VII",
    "titleSlug": "jump-game-vii",
    "url": "https://leetcode.cn/problems/jump-game-vii/description/",
    "statementPreview": "给你一个下标从 0 开始的二进制字符串 s 和两个整数 minJump 和 maxJump。一开始，你在下标 0 处，且该位置的值一定为 '0'。当同时满足如下条件时，你可以从下标 i 移动到下标 j 处： i + minJump <= j <= min(i + maxJump, s.length - 1) 且 s[j] == '0' . 如果你可以到达 s 的下标 s.length - 1 处，请你返回 true，否则返回 false。",
    "approachPreview": "我们定义一个长度为 n+1 的前缀和数组 pre，其中 pre[i] 表示 s 的前 i 个位置中能够到达的个数。定义一个长度为 n 的布尔数组 f，其中 f[i] 表示 s[i] 是否能够到达。初始时 pre[1] = 1，而 f[0] = true。 考虑 i \\in [1, n)，如果 s[i] = 0，那么我们需要判断 s 的前 i 个位置中是否存在一个位置 j，满足 j 能够到达且 j 到 i 的距离在 [minJump, maxJump] 之间。如果存在这样的位置 j，那么我们就有 f[i] = true，否则 f[i] = false。在判断 j 是否存在时，我们可以通过前缀和数组 pre 在 O(1) 的时间内判断是否存在这样的位置 j。 最终答案即为 f[n-1]。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 VII 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "50.9%",
    "difficulty": "中等",
    "frontendId": "2297",
    "paidOnly": true,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2297.Jump%20Game%20VIII/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Jump Game VIII",
    "titleCn": "跳跃游戏 VIII",
    "titleSlug": "jump-game-viii",
    "url": "https://leetcode.cn/problems/jump-game-viii/description/",
    "statementPreview": "给定一个长度为 n 的下标从 0 开始的整数数组 nums。初始位置为下标 0。当 i < j 时，你可以从下标 i 跳转到下标 j : 对于在 i < k < j 范围内的所有下标 k 有 nums[i] <= nums[j] 和 nums[k] < nums[i] , 或者 对于在 i < k < j 范围内的所有下标 k 有 nums[i] > nums[j] 和 nums[k] >= nums[i]。 你还得到了一个长度为 n 的整数数组 costs，其中 costs[i] 表示跳转 到 下标 i 的代价。 返回 跳转到 下标 n - 1 的最小代价。",
    "approachPreview": "根据题目描述，我们实际上需要找到 \\textit{nums}[i] 的下一个大于等于 \\textit{nums}[i] 的位置 j，以及下一个小于 \\textit{nums}[i] 的位置 j。我们利用单调栈可以在 O(n) 的时间内找到这两个位置，然后构建邻接表 g，其中 g[i] 表示下标 i 可以跳转到的下标。 然后我们使用动态规划求解最小代价。设 f[i] 表示跳转到下标 i 的最小代价，初始时 f[0] = 0，其余 f[i] = \\infty。我们从小到大枚举下标 i，对于每个 i，我们枚举 g[i] 中的每个下标 j，进行状态转移 f[j] = \\min(f[j], f[i] + \\textit{costs}[j])。答案为 f[n - 1]。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 VIII 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "42.2%",
    "difficulty": "中等",
    "frontendId": "3660",
    "paidOnly": false,
    "seriesKeys": [
      "jump-game"
    ],
    "seriesPrimaryKey": "jump-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3660.Jump%20Game%20IX/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Jump Game IX",
    "titleCn": "跳跃游戏 IX",
    "titleSlug": "jump-game-ix",
    "url": "https://leetcode.cn/problems/jump-game-ix/description/",
    "statementPreview": "给你一个整数数组 nums。 从任意下标 i 出发，你可以根据以下规则跳跃到另一个下标 j： 仅当 nums[j] < nums[i] 时，才允许跳跃到下标 j，其中 j > i。 仅当 nums[j] > nums[i] 时，才允许跳跃到下标 j，其中 j < i。 对于每个下标 i，找出从 i 出发且可以跳跃 任意 次，能够到达 nums 中的 最大值 是多少。 返回一个数组 ans，其中 ans[i] 是从下标 i 出发可以到达的 最大值。",
    "approachPreview": "如果 i = n - 1，那么它可以跳到 \\textit{nums} 中的最大值，因此 \\textit{ans}[i] = \\max(\\textit{nums})。对于其他位置 i，我们可以通过维护一个前缀最大值数组和一个后缀最小值变量来计算。 具体步骤如下： 1. 创建一个数组 \\textit{preMax}，其中 \\textit{preMax}[i] 表示从左到右遍历时 [0, i] 区间内的最大值。 2. 创建一个变量 \\textit{sufMin}，表示从右到左遍历时，当前元素右侧的最小值。初始时 \\textit{sufMin} = \\infty。 3. 首先预处理 \\textit{preMax} 数组。 4. 接下来，从右到左遍历数组，对于每个位置 i，如果 \\textit{preMax}[i] > \\textit{sufMin}，说明可以从 i 跳到 \\textit{preMax} 所在的位置，再跳到 \\textit{sufMin} 所在的位置，最后跳到 i + 1。因此在 i + 1 能跳到的数，在 i 也能跳到，因此 \\textit{ans}[i] = \\textit{ans}[i + 1]；否则更新为 \\textit{preMax}[i]。然后更新 \\textit{sufMin}。 5. 最后返回结果数组 \\textit{ans}。 时间复杂度 O(n)，空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和跳跃游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 跳跃游戏 IX 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "什么时候用贪心边界，什么时候必须建图或做 DP？",
        "answer": "如果只关心能否到达或最少普通跳数，最远可达边界通常够用；一旦跳法依赖值、区间、代价或方向限制，就要把下标当状态做 BFS、DP 或单调结构优化。"
      }
    ]
  },
  {
    "acRate": "60.0%",
    "difficulty": "简单",
    "frontendId": "121",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading",
      "best-time-to-buy-and-sell-stock"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0121.Best%20Time%20to%20Buy%20and%20Sell%20Stock/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock",
    "titleCn": "买卖股票的最佳时机",
    "titleSlug": "best-time-to-buy-and-sell-stock",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/",
    "statementPreview": "给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0。",
    "approachPreview": "我们可以枚举数组 nums 每个元素作为卖出价格，那么我们需要在前面找到一个最小值作为买入价格，这样才能使得利润最大化。 因此，我们用一个变量 mi 维护数组 nums 的前缀最小值。接下来遍历数组 nums，对于每个元素 v，计算其与前面元素的最小值 mi 的差值，更新答案为差值的最大值。然后更新 mi = min(mi, v)。继续遍历数组 nums，直到遍历结束。 最后返回答案即可。 时间复杂度 O(n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "75.7%",
    "difficulty": "中等",
    "frontendId": "122",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading",
      "best-time-to-buy-and-sell-stock"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0122.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock II",
    "titleCn": "买卖股票的最佳时机 II",
    "titleSlug": "best-time-to-buy-and-sell-stock-ii",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/",
    "statementPreview": "给你一个整数数组 prices，其中 prices[i] 表示某支股票第 i 天的价格。 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。然而，你可以在 同一天 多次买卖该股票，但要确保你持有的股票不超过一股。 返回 你能获得的 最大 利润。",
    "approachPreview": "从第二天开始，如果当天股价大于前一天股价，则在前一天买入，当天卖出，即可获得利润。如果当天股价小于前一天股价，则不买入，不卖出。也即是说，所有上涨交易日都做买卖，所有下跌交易日都不做买卖，最终获得的利润是最大的。 时间复杂度 O(n)，其中 n 为数组 prices 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "62.8%",
    "difficulty": "困难",
    "frontendId": "123",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading",
      "best-time-to-buy-and-sell-stock"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0123.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock III",
    "titleCn": "买卖股票的最佳时机 III",
    "titleSlug": "best-time-to-buy-and-sell-stock-iii",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/",
    "statementPreview": "给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。 注意： 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。",
    "approachPreview": "我们定义以下几个变量，其中： f1 表示第一次买入股票后的最大利润； f2 表示第一次卖出股票后的最大利润； f3 表示第二次买入股票后的最大利润； f4 表示第二次卖出股票后的最大利润。 遍历过程中，直接使用 f1 , f2 , f3 , f4 计算，考虑的是在同一天买入和卖出时，收益是 0，不会对答案产生影响。 最后返回 f4 即可。 时间复杂度 O(n)，其中 n 为数组 prices 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "54.8%",
    "difficulty": "困难",
    "frontendId": "188",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading",
      "best-time-to-buy-and-sell-stock"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0188.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20IV/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock IV",
    "titleCn": "买卖股票的最佳时机 IV",
    "titleSlug": "best-time-to-buy-and-sell-stock-iv",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/",
    "statementPreview": "给你一个整数数组 prices 和一个整数 k，其中 prices[i] 是某支给定的股票在第 i 天的价格。 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。 注意： 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。",
    "approachPreview": "我们设计一个函数 dfs(i, j, k)，表示从第 i 天开始，最多完成 j 笔交易，以及当前持有股票的状态为 k（不持有股票用 0 表示，持有股票用 1 表示）时，所能获得的最大利润。答案即为 dfs(0, k, 0)。 函数 dfs(i, j, k) 的执行逻辑如下： 如果 i 大于等于 n，直接返回 0； 第 i 天可以不进行任何操作，那么 dfs(i, j, k) = dfs(i + 1, j, k)； 如果 k \\gt 0，那么第 i 天可以选择卖出股票，那么 dfs(i, j, k) = \\max(dfs(i + 1, j - 1, 0) + prices[i], dfs(i + 1, j, k))； 否则，如果 j \\gt 0，那么第 i 天可以选择买入股票，那么 dfs(i, j, k) = \\max(dfs(i + 1, j - 1, 1) - prices[i], dfs(i + 1, j, k))。 取上述三种情况的最大值即为 dfs(i, j, k) 的值。 过程中，我们可以使用记忆化搜索的方法，将每次计算的结果保存下来，避免重复计算。 时间复杂度 O(n \\times k)，空间复杂度 O(n \\times k)。其中 n 和 k 分别为数组 prices 的长度和 k 的值。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "65.5%",
    "difficulty": "中等",
    "frontendId": "309",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0309.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Cooldown/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "titleCn": "买卖股票的最佳时机含冷冻期",
    "titleSlug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/",
    "statementPreview": "给定一个整数数组 prices，其中第 prices[i] 表示第 i 天的股票价格。​ 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）: 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。 注意： 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，表示从第 i 天开始，状态为 j 时，能够获得的最大利润。其中 j 的取值为 0, 1，分别表示当前不持有股票和持有股票。答案即为 dfs(0, 0)。 函数 dfs(i, j) 的执行逻辑如下： 如果 i \\geq n，表示已经没有股票可以交易了，此时返回 0； 否则，我们可以选择不交易，此时 dfs(i, j) = dfs(i + 1, j)。我们也可以进行股票交易，如果此时 j \\gt 0，说明当前持有股票，可以卖出，此时 dfs(i, j) = prices[i] + dfs(i + 2, 0)；如果此时 j = 0，说明当前不持有股票，可以买入，此时 dfs(i, j) = -prices[i] + dfs(i + 1, 1)。取最大值作为函数 dfs(i, j) 的返回值。 答案为 dfs(0, 0)。 为了避免重复计算，我们使用记忆化搜索的方法，用一个数组 f 记录 dfs(i, j) 的返回值，如果 f[i][j] 不为 -1，说明已经计算过，直接返回 f[i][j] 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 prices 的长度。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机含冷冻期 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "77.6%",
    "difficulty": "中等",
    "frontendId": "714",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0714.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Transaction%20Fee/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "titleCn": "买卖股票的最佳时机含手续费",
    "titleSlug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/",
    "statementPreview": "给定一个整数数组 prices，其中 prices[i] 表示第 i 天的股票价格；整数 fee 代表了交易股票的手续费用。 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。 返回获得利润的最大值。 注意： 这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，表示从第 i 天开始，状态为 j 时，能够获得的最大利润。其中 j 的取值为 0, 1，分别表示当前不持有股票和持有股票。答案即为 dfs(0, 0)。 函数 dfs(i, j) 的执行逻辑如下： 如果 i \\geq n，那么没有股票可以交易了，此时返回 0； 否则，我们可以选择不交易，此时 dfs(i, j) = dfs(i + 1, j)。我们也可以进行股票交易，如果此时 j \\gt 0，说明当前持有股票，可以卖出，此时 dfs(i, j) = prices[i] + dfs(i + 1, 0) - fee；如果此时 j = 0，说明当前不持有股票，可以买入，此时 dfs(i, j) = -prices[i] + dfs(i + 1, 1)。取最大值作为函数 dfs(i, j) 的返回值。 答案为 dfs(0, 0)。 为了避免重复计算，我们使用记忆化搜索的方法，用一个数组 f 记录 dfs(i, j) 的返回值，如果 f[i][j] 不为 -1，说明已经计算过，直接返回 f[i][j] 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 prices 的长度。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机含手续费 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "56.9%",
    "difficulty": "中等",
    "frontendId": "2291",
    "paidOnly": true,
    "seriesKeys": [
      "stock-trading"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2291.Maximum%20Profit%20From%20Trading%20Stocks/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Maximum Profit From Trading Stocks",
    "titleCn": "最大股票收益",
    "titleSlug": "maximum-profit-from-trading-stocks",
    "url": "https://leetcode.cn/problems/maximum-profit-from-trading-stocks/description/",
    "statementPreview": "给你两个下标从 0 开始的数组 present 和 future， present[i] 和 future[i] 分别代表第 i 支股票现在和将来的价格。每支股票你最多购买 一次，你的预算为 budget。 求最大的收益。",
    "approachPreview": "我们定义 f[i][j] 表示前 i 支股票，预算为 j 时的最大收益。那么答案就是 f[n][\\textit{budget}]。 对于第 i 支股票，我们有两种选择： 不购买，那么 f[i][j] = f[i - 1][j]； 购买，那么 f[i][j] = f[i - 1][j - \\textit{present}[i]] + \\textit{future}[i] - \\textit{present}[i]。 最后返回 f[n][\\textit{budget}] 即可。 时间复杂度 O(n \\times \\textit{budget})，空间复杂度 O(n \\times \\textit{budget})。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大股票收益 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "59.4%",
    "difficulty": "困难",
    "frontendId": "3562",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3562.Maximum%20Profit%20from%20Trading%20Stocks%20with%20Discounts/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Maximum Profit from Trading Stocks with Discounts",
    "titleCn": "折扣价交易股票的最大利润",
    "titleSlug": "maximum-profit-from-trading-stocks-with-discounts",
    "url": "https://leetcode.cn/problems/maximum-profit-from-trading-stocks-with-discounts/description/",
    "statementPreview": "给你一个整数 n，表示公司中员工的数量。每位员工都分配了一个从 1 到 n 的唯一 ID，其中员工 1 是 CEO，是每一个员工的直接或间接上司。另给你两个下标从 1 开始的整数数组 present 和 future，两个数组的长度均为 n，具体定义如下： present[i] 表示第 i 位员工今天可以购买股票的 当前价格。 future[i] 表示第 i 位员工明天可以卖出股票的 预期价格。 公司的层级关系由二维整数数组 hierarchy 表示，其中 hierarchy[i] = [u_i, v_i] 表示员工 u_i 是员工 v_i 的直属上司。 此外，再给你一个整数 budget，表示可用于投资的总预算。 公司有一项折扣政策：如果某位员工的直属上司购买了公司的股票，那么该员工可以以 半价 购买股票（即 floor(present[v] / 2) ）。 请返回在不超过给定预算的情况下可以获得的 最大利润。 注意： 每只股票最多只能购买一次。 不能使用股票未来的收益来增加投资预算，购买只能依赖于 budget。",
    "approachPreview": "对每个节点 u，我们维护一个二维数组 f_u[j][pre]，表示在以 u 为根的子树中，预算不超过 j 且 u 的上司是否购买了股票（其中 pre=1 表示购买，而 pre=0 表示未购买）的情况下，可以获得的最大利润。那么答案就是 f_1[\\text{budget}][0]。 对节点 u，函数 \\text{dfs}(u) 返回一个 (\\text{budget}+1) \\times 2 的二维数组 f，表示在以 u 为根的子树中，不超过预算 j 且 u 的上司是否购买了股票的情况下，可以获得的最大利润。 对 u，我们要考虑两件事： 1. 节点 u 本身是否买股票（会占用一部分预算 \\text{cost}，其中 \\text{cost} = \\lfloor \\text{present}[u] / (pre + 1) \\rfloor）。并增加利润 \\text{future}[u] - \\text{cost}。 2. 节点 u 的子节点 v 如何分配预算以最大化利润。我们把每个子节点的 \\text{dfs}(v) 看成“物品”，用背包把子树的利润合并到当前 u 的 \\text{nxt} 数组中。 具体实现时，我们先初始化一个 (\\text{budget}+1) \\times 2 的二维数组 \\text{nxt}，表示当前已经合并了子节点的利润。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 折扣价交易股票的最大利润 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "63.4%",
    "difficulty": "中等",
    "frontendId": "3573",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading",
      "best-time-to-buy-and-sell-stock"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3573.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20V/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Best Time to Buy and Sell Stock V",
    "titleCn": "买卖股票的最佳时机 V",
    "titleSlug": "best-time-to-buy-and-sell-stock-v",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-v/description/",
    "statementPreview": "给你一个整数数组 prices，其中 prices[i] 是第 i 天股票的价格（美元），以及一个整数 k。 你最多可以进行 k 笔交易，每笔交易可以是以下任一类型： 普通交易：在第 i 天买入，然后在之后的第 j 天卖出，其中 i < j。你的利润是 prices[j] - prices[i]。 做空交易：在第 i 天卖出，然后在之后的第 j 天买回，其中 i < j。你的利润是 prices[i] - prices[j]。 注意：你必须在开始下一笔交易之前完成当前交易。此外，你不能在已经进行买入或卖出操作的同一天再次进行买入或卖出操作。 通过进行 最多 k 笔交易，返回你可以获得的最大总利润。",
    "approachPreview": "我们定义 f[i][j][k] 表示在前 i 天内，最多进行 j 笔交易，且当前状态为 k 时的最大利润。这里的状态 k 有三种可能： 若 k = 0，表示当前没有持有股票。 若 k = 1，表示当前持有一支股票。 若 k = 2，表示当前持有一支股票的空头。 初始时，对任意 j \\in [1, k]，都有 f[0][j][1] = -prices[0] 和 f[0][j][2] = prices[0]。这表示在第 0 天买入一支股票或卖出一支股票的空头。 接下来，我们可以通过状态转移来更新 f[i][j][k] 的值。对于每一天 i 和每笔交易 j，我们可以根据当前状态 k 来决定如何更新： 若 k = 0，表示当前没有持有股票，这个状态可以由以下三种情况转移而来： 前一天没有持有股票。 前一天持有一支股票，并在今天卖出。 前一天持有一支股票的空头，并在今天买回。 若 k = 1，表示当前持有一支股票，这个状态可以由以下两种情况转移而来： 前一天持有一支股票。 前一天没有持有股票，并在今天买入。 若 k = 2，表示当前持有一支股票的空头，这个状态可以由以下两种情况转移而来： 前一天持有一支股票的空头。 前一天没有持有股票，并在今天卖出。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 买卖股票的最佳时机 V 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "53.4%",
    "difficulty": "中等",
    "frontendId": "3652",
    "paidOnly": false,
    "seriesKeys": [
      "stock-trading"
    ],
    "seriesPrimaryKey": "stock-trading",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3652.Best%20Time%20to%20Buy%20and%20Sell%20Stock%20using%20Strategy/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Best Time to Buy and Sell Stock using Strategy",
    "titleCn": "按策略买卖股票的最佳时机",
    "titleSlug": "best-time-to-buy-and-sell-stock-using-strategy",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-using-strategy/description/",
    "statementPreview": "给你两个整数数组 prices 和 strategy，其中： prices[i] 表示第 i 天某股票的价格。 strategy[i] 表示第 i 天的交易策略，其中： 1 表示买入一单位股票。 0 表示持有股票。 1 表示卖出一单位股票。 同时给你一个 偶数 整数 k，你可以对 strategy 进行 最多一次 修改。一次修改包括： 选择 strategy 中恰好 k 个 连续 元素。 将前 k / 2 个元素设为 0 （持有）。 将后 k / 2 个元素设为 1 （卖出）。 利润 定义为所有天数中 strategy[i] * prices[i] 的 总和。 返回你可以获得的 最大 可能利润。 注意： 没有预算或股票持有数量的限制，因此所有买入和卖出操作均可行，无需考虑过去的操作。",
    "approachPreview": "我们用一个数组 \\textit{s} 来表示前缀和，其中 \\textit{s}[i] 表示前 i 天的利润和，即 \\textit{s}[i] = \\sum_{j=0}^{i-1} \\textit{prices}[j] \\times \\textit{strategy}[j]。我们还用一个数组 \\textit{t} 来表示前缀和，其中 \\textit{t}[i] 表示前 i 天的股票价格和，即 \\textit{t}[i] = \\sum_{j=0}^{i-1} \\textit{prices}[j]。 初始时，最大利润为 \\textit{s}[n]。我们枚举修改的子数组的右端点 i，则左端点为 i-k。修改后，子数组内前 k/2 天的策略变为 0，后 k/2 天的策略变为 1，因此利润变化为： \\Delta = -(\\textit{s}[i] - \\textit{s}[i-k]) + (\\textit{t}[i] - \\textit{t}[i-k/2]) 因此，我们可以通过枚举所有可能的 i 来更新最大利润。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和股票买卖系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 按策略买卖股票的最佳时机 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么股票题要先定义持有/未持有状态？",
        "answer": "每一天结束时只关心当前是否持有股票以及用了多少限制资源；冷冻期、手续费、交易次数或策略修改都可以在这个状态机上增加维度或调整转移。"
      }
    ]
  },
  {
    "acRate": "56.4%",
    "difficulty": "中等",
    "frontendId": "198",
    "paidOnly": false,
    "seriesKeys": [
      "house-robber"
    ],
    "seriesPrimaryKey": "house-robber",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0198.House%20Robber/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "House Robber",
    "titleCn": "打家劫舍",
    "titleSlug": "house-robber",
    "url": "https://leetcode.cn/problems/house-robber/description/",
    "statementPreview": "你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统， 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。",
    "approachPreview": "我们设计一个函数 \\textit{dfs}(i)，表示从第 i 间房屋开始偷窃能够得到的最高金额。那么答案即为 \\textit{dfs}(0)。 函数 \\textit{dfs}(i) 的执行过程如下： 如果 i \\ge \\textit{len}(\\textit{nums})，表示所有房屋都被考虑过了，直接返回 0； 否则，考虑偷窃第 i 间房屋，那么 \\textit{dfs}(i) = \\textit{nums}[i] + \\textit{dfs}(i+2)；不偷窃第 i 间房屋，那么 \\textit{dfs}(i) = \\textit{dfs}(i+1)。 返回 \\max(\\textit{nums}[i] + \\textit{dfs}(i+2), \\textit{dfs}(i+1))。 为了避免重复计算，我们使用记忆化搜索的方法，将 \\textit{dfs}(i) 的结果保存在一个数组或哈希表中，每次计算前先查询是否已经计算过，如果计算过直接返回结果。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组长度。",
    "followUps": [
      {
        "question": "这题和打家劫舍系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打家劫舍 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷打家劫舍系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.2%",
    "difficulty": "中等",
    "frontendId": "213",
    "paidOnly": false,
    "seriesKeys": [
      "house-robber"
    ],
    "seriesPrimaryKey": "house-robber",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0213.House%20Robber%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "House Robber II",
    "titleCn": "打家劫舍 II",
    "titleSlug": "house-robber-ii",
    "url": "https://leetcode.cn/problems/house-robber-ii/description/",
    "statementPreview": "你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统， 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下，今晚能够偷窃到的最高金额。",
    "approachPreview": "环状排列意味着第一个房屋和最后一个房屋中最多只能选择一个偷窃，因此可以把此环状排列房间问题约化为两个单排排列房屋子问题。 时间复杂度 O(n)，其中 n 是数组长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和打家劫舍系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打家劫舍 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷打家劫舍系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.6%",
    "difficulty": "中等",
    "frontendId": "337",
    "paidOnly": false,
    "seriesKeys": [
      "house-robber"
    ],
    "seriesPrimaryKey": "house-robber",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0337.House%20Robber%20III/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "House Robber III",
    "titleCn": "打家劫舍 III",
    "titleSlug": "house-robber-iii",
    "url": "https://leetcode.cn/problems/house-robber-iii/description/",
    "statementPreview": "小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root。 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。 给定二叉树的 root。返回 在不触动警报的情况下，小偷能够盗取的最高金额。",
    "approachPreview": "我们定义一个函数 dfs(root)，表示偷取以 root 为根的二叉树的最大金额。该函数返回一个二元组 (a, b)，其中 a 表示偷取 root 节点时能得到的最大金额，而 b 表示不偷取 root 节点时能得到的最大金额。 函数 dfs(root) 的计算过程如下： 如果 root 为空，那么显然有 dfs(root) = (0, 0)。 否则，我们首先计算出左右子节点的结果，即 dfs(root.left) 和 dfs(root.right)，这样就得到了两对值 (l_a, l_b) 以及 (r_a, r_b)。对于 dfs(root) 的结果，我们可以分为两种情况： 如果偷取 root 节点，那么不能偷取其左右子节点，结果为 root.val + l_b + r_b； 如果不偷取 root 节点，那么可以偷取其左右子节点，结果为 \\max(l_a, l_b) + \\max(r_a, r_b)。 在主函数中，我们可以直接返回 dfs(root) 的较大值，即 \\max(dfs(root))。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉树的节点数。",
    "followUps": [
      {
        "question": "这题和打家劫舍系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打家劫舍 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷打家劫舍系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.0%",
    "difficulty": "中等",
    "frontendId": "2560",
    "paidOnly": false,
    "seriesKeys": [
      "house-robber"
    ],
    "seriesPrimaryKey": "house-robber",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2560.House%20Robber%20IV/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "House Robber IV",
    "titleCn": "打家劫舍 IV",
    "titleSlug": "house-robber-iv",
    "url": "https://leetcode.cn/problems/house-robber-iv/description/",
    "statementPreview": "沿街有一排连续的房屋。每间房屋内都藏有一定的现金。现在有一位小偷计划从这些房屋中窃取现金。 由于相邻的房屋装有相互连通的防盗系统，所以小偷 不会窃取相邻的房屋。 小偷的 窃取能力 定义为他在窃取过程中能从单间房屋中窃取的 最大金额。 给你一个整数数组 nums 表示每间房屋存放的现金金额。形式上，从左起第 i 间房屋中放有 nums[i] 美元。 另给你一个整数 k，表示窃贼将会窃取的 最少 房屋数。小偷总能窃取至少 k 间房屋。 返回小偷的 最小 窃取能力。",
    "approachPreview": "题目求的是窃贼的最小窃取能力，我们可以二分枚举窃贼的窃取能力，对于枚举的能力 x，我们可以通过贪心的方式判断窃贼是否能够窃取至少 k 间房屋，具体地，我们从左到右遍历数组，对于当前遍历到的房屋 i，如果 nums[i] \\leq x 且 i 与上一个窃取的房屋的下标之差大于 1，则窃贼可以窃取房屋 i，否则窃贼不能窃取房屋 i。累计窃取的房屋数，如果窃取的房屋数大于等于 k，则说明窃贼可以窃取至少 k 间房屋，此时窃贼的窃取能力 x 可能是最小的，否则窃贼的窃取能力 x 不是最小的。 时间复杂度 O(n \\times \\log m)，空间复杂度 O(1)。其中 n 和 m 分别是数组 nums 的长度和数组 nums 中的最大值。",
    "followUps": [
      {
        "question": "这题和打家劫舍系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打家劫舍 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷打家劫舍系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.8%",
    "difficulty": "中等",
    "frontendId": "3840",
    "paidOnly": false,
    "seriesKeys": [
      "house-robber"
    ],
    "seriesPrimaryKey": "house-robber",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3800-3899/3840.House%20Robber%20V/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "House Robber V",
    "titleCn": "打家劫舍 V",
    "titleSlug": "house-robber-v",
    "url": "https://leetcode.cn/problems/house-robber-v/description/",
    "statementPreview": "你是一名专业小偷，计划偷窃沿街的房屋。每间房屋都藏有一定的现金，并由带有颜色代码的安全系统保护。 给你两个长度为 n 的整数数组 nums 和 colors，其中 nums[i] 是第 i 间房屋中的金额，而 colors[i] 是该房屋的颜色代码。 如果两间 相邻 的房屋具有 相同 的颜色代码，则你 不能同时偷窃 它们。 返回你能偷窃到的 最大 金额。",
    "approachPreview": "我们定义两个变量 f 和 g，其中 f 表示当前房屋不被偷窃时的最大金额，而 g 表示当前房屋被偷窃时的最大金额。初始时 f = 0, g = nums[0]。答案为 \\max(f, g)。 接下来，我们从第二间房屋开始遍历： 如果当前房屋与前一间房屋颜色相同，则 f 的值为 \\max(f, g)，而 g 的值为 f + nums[i]。 如果当前房屋与前一间房屋颜色不同，则 f 的值为 \\max(f, g)，而 g 的值为 \\max(f, g) + nums[i]。 最后返回 \\max(f, g) 即可。 时间复杂度 O(n)，其中 n 是房屋的数量。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和打家劫舍系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打家劫舍 V 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷打家劫舍系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.3%",
    "difficulty": "中等",
    "frontendId": "256",
    "paidOnly": true,
    "seriesKeys": [
      "paint-house"
    ],
    "seriesPrimaryKey": "paint-house",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0256.Paint%20House/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Paint House",
    "titleCn": "粉刷房子",
    "titleSlug": "paint-house",
    "url": "https://leetcode.cn/problems/paint-house/description/",
    "statementPreview": "假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。 当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的正整数矩阵 costs 来表示的。 例如， costs[0][0] 表示第 0 号房子粉刷成红色的成本花费； costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。 请计算出粉刷完所有房子最少的花费成本。",
    "approachPreview": "定义 dp[i][c] 为前 i 间房、且第 i 间涂颜色 c 的最低成本。第 i 间选某个颜色时，只能从上一间的另外两种颜色转移；三色场景可以直接维护三个滚动值，最后取最小值。",
    "followUps": [
      {
        "question": "这题和粉刷房子系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 粉刷房子 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷粉刷房子系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.9%",
    "difficulty": "困难",
    "frontendId": "265",
    "paidOnly": true,
    "seriesKeys": [
      "paint-house"
    ],
    "seriesPrimaryKey": "paint-house",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0265.Paint%20House%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Paint House II",
    "titleCn": "粉刷房子 II",
    "titleSlug": "paint-house-ii",
    "url": "https://leetcode.cn/problems/paint-house-ii/description/",
    "statementPreview": "假如有一排房子共有 n 幢，每个房子可以被粉刷成 k 种颜色中的一种。房子粉刷成不同颜色的花费成本也是不同的。你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。 每个房子粉刷成不同颜色的花费以一个 n x k 的矩阵表示。 例如， costs[0][0] 表示第 0 幢房子粉刷成 0 号颜色的成本； costs[1][2] 表示第 1 幢房子粉刷成 2 号颜色的成本，以此类推。 返回 粉刷完所有房子的最低成本。",
    "approachPreview": "定义 f[i][j] 表示粉刷前 i 个房子，且最后一个房子被粉刷成第 j 种颜色的最小花费。答案为 \\min_{0 \\leq j < k} f[n][j]。 对于 f[i][j]，可以从 f[i - 1][j'] 转移而来，其中 j' \\neq j。因此，可以得到状态转移方程： f[i][j] = \\min_{0 \\leq j' < k, j' \\neq j} f[i - 1][j'] + costs[i - 1][j] 由于 f[i][j] 只与 f[i - 1][j'] 有关，因此可以使用滚动数组优化空间复杂度。 时间复杂度 O(n \\times k^2)，空间复杂度 O(k)。其中 n 和 k 分别为房子数量和颜色数量。",
    "followUps": [
      {
        "question": "这题和粉刷房子系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 粉刷房子 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷粉刷房子系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.8%",
    "difficulty": "困难",
    "frontendId": "1473",
    "paidOnly": false,
    "seriesKeys": [
      "paint-house"
    ],
    "seriesPrimaryKey": "paint-house",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1473.Paint%20House%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Paint House III",
    "titleCn": "粉刷房子 III",
    "titleSlug": "paint-house-iii",
    "url": "https://leetcode.cn/problems/paint-house-iii/description/",
    "statementPreview": "在一个小城市里，有 m 个房子排成一排，你需要给每个房子涂上 n 种颜色之一（颜色编号为 1 到 n ）。有的房子去年夏天已经涂过颜色了，所以这些房子不可以被重新涂色。 我们将连续相同颜色尽可能多的房子称为一个街区。（比方说 houses = [1,2,2,3,3,2,1,1]，它包含 5 个街区 [{1}, {2,2}, {3,3}, {2}, {1,1}]。） 给你一个数组 houses，一个 m * n 的矩阵 cost 和一个整数 target，其中： houses[i]：是第 i 个房子的颜色， 0 表示这个房子还没有被涂色。 cost[i][j]：是将第 i 个房子涂成颜色 j+1 的花费。 请你返回房子涂色方案的最小总花费，使得每个房子都被涂色后，恰好组成 target 个街区。如果没有可用的涂色方案，请返回 -1。",
    "approachPreview": "我们定义 f[i][j][k] 表示将下标 [0,..i] 的房子涂上颜色，最后一个房子的颜色为 j，且恰好形成 k 个街区的最小花费。那么答案就是 f[m-1][j][\\textit{target}]，其中 j 的取值范围为 [1,..n]。初始时，我们判断下标为 0 的房子是否已经涂色，如果未涂色，那么 f[0][j][1] = \\textit{cost}[0][j - 1]，其中 j \\in [1,..n]。如果已经涂色，那么 f[0][\\textit{houses}[0]][1] = 0。其他的 f[i][j][k] 的值都初始化为 \\infty。 接下来，我们从下标 i=1 开始遍历，对于每个 i，我们判断下标为 i 的房子是否已经涂色： 如果未涂色，那么我们可以将下标为 i 的房子涂成颜色 j，我们枚举街区的数量 k，其中 k \\in [1,..\\min(\\textit{target}, i + 1)]，并且枚举下标为 i 的房子的前一个房子的颜色 j_0，其中 j_0 \\in [1,..n]，那么我们可以得到状态转移方程： f[i][j][k] = \\min_{j_0 \\in [1,..",
    "followUps": [
      {
        "question": "这题和粉刷房子系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 粉刷房子 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷粉刷房子系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.3%",
    "difficulty": "中等",
    "frontendId": "3429",
    "paidOnly": false,
    "seriesKeys": [
      "paint-house"
    ],
    "seriesPrimaryKey": "paint-house",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3400-3499/3429.Paint%20House%20IV/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Paint House IV",
    "titleCn": "粉刷房子 IV",
    "titleSlug": "paint-house-iv",
    "url": "https://leetcode.cn/problems/paint-house-iv/description/",
    "statementPreview": "给你一个 偶数 整数 n，表示沿直线排列的房屋数量，以及一个大小为 n x 3 的二维数组 cost，其中 cost[i][j] 表示将第 i 个房屋涂成颜色 j + 1 的成本。 如果房屋满足以下条件，则认为它们看起来 漂亮： 不存在 两个 涂成相同颜色的相邻房屋。 距离行两端 等距 的房屋不能涂成相同的颜色。例如，如果 n = 6，则位置 (0, 5)、 (1, 4) 和 (2, 3) 的房屋被认为是等距的。 返回使房屋看起来 漂亮 的 最低 涂色成本。",
    "approachPreview": "从两端向中间成对处理房子，状态记录上一对左右两侧分别使用的颜色。枚举当前左房和右房颜色，要求同一对两端不同、并且分别不等于相邻上一对颜色，转移累计最小成本。",
    "followUps": [
      {
        "question": "这题和粉刷房子系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 粉刷房子 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷粉刷房子系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.1%",
    "difficulty": "简单",
    "frontendId": "1",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum",
      "two-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0001.Two%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Two Sum",
    "titleCn": "两数之和",
    "titleSlug": "two-sum",
    "url": "https://leetcode.cn/problems/two-sum/description/",
    "statementPreview": "给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。 你可以按任意顺序返回答案。",
    "approachPreview": "我们可以使用一个哈希表 \\textit{d} 来存储每个元素及其对应的索引。 遍历数组 \\textit{nums}，对于当前元素 \\textit{nums}[i]，我们首先判断 \\textit{target} - \\textit{nums}[i] 是否在哈希表 \\textit{d} 中，如果在 \\textit{d} 中，说明 \\textit{target} 值已经找到，返回 \\textit{target} - \\textit{nums}[i] 的索引和 i 即可。 时间复杂度 O(n)，空间复杂度 O(n)，其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "40.5%",
    "difficulty": "中等",
    "frontendId": "15",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0015.3Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "3Sum",
    "titleCn": "三数之和",
    "titleSlug": "3sum",
    "url": "https://leetcode.cn/problems/3sum/description/",
    "statementPreview": "给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、 i != k 且 j != k，同时还满足 nums[i] + nums[j] + nums[k] == 0。请你返回所有和为 0 且不重复的三元组。 注意： 答案中不可以包含重复的三元组。",
    "approachPreview": "我们注意到，题目不要求我们按照顺序返回三元组，因此我们不妨先对数组进行排序，这样就可以方便地跳过重复的元素。 接下来，我们枚举三元组的第一个元素 nums[i]，其中 0 \\leq i \\lt n - 2。对于每个 i，我们可以通过维护两个指针 j = i + 1 和 k = n - 1，从而找到满足 nums[i] + nums[j] + nums[k] = 0 的 j 和 k。在枚举的过程中，我们需要跳过重复的元素，以避免出现重复的三元组。 具体判断逻辑如下： 如果 i \\gt 0 并且 nums[i] = nums[i - 1]，则说明当前枚举的元素与上一个元素相同，我们可以直接跳过，因为不会产生新的结果。 如果 nums[i] \\gt 0，则说明当前枚举的元素大于 0，则三数之和必然无法等于 0，结束枚举。 否则，我们令左指针 j = i + 1，右指针 k = n - 1，当 j \\lt k 时，执行循环，计算三数之和 x = nums[i] + nums[j] + nums[k]，并与 0 比较： 如果 x \\lt 0，则说明 nums[j] 太小，我们需要将 j 右移一位。 如果 x \\gt 0，则说明 nums[k] 太大，我们需要将 k 左移一位。 否则，说明我们找到了一个合法的三元组，将其加入答案，并将 j 右移一位，将 k 左移一位，同时跳过所有重复的元素，继续寻找下一个合法的三元组。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 三数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.9%",
    "difficulty": "中等",
    "frontendId": "16",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0016.3Sum%20Closest/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "3Sum Closest",
    "titleCn": "最接近的三数之和",
    "titleSlug": "3sum-closest",
    "url": "https://leetcode.cn/problems/3sum-closest/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个在 不同下标位置 的整数，使它们的和与 target 最接近。 返回这三个数的和。 假定每组输入只存在恰好一个解。",
    "approachPreview": "我们将数组排序，然后遍历数组，对于每个元素 nums[i]，我们使用指针 j 和 k 分别指向 i+1 和 n-1，计算三数之和，如果三数之和等于 target，则直接返回 target，否则根据与 target 的差值更新答案。如果三数之和大于 target，则将 k 向左移动一位，否则将 j 向右移动一位。 时间复杂度 O(n^2)，空间复杂度 O(\\log n)。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最接近的三数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "36.9%",
    "difficulty": "中等",
    "frontendId": "18",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0018.4Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "4Sum",
    "titleCn": "四数之和",
    "titleSlug": "4sum",
    "url": "https://leetcode.cn/problems/4sum/description/",
    "statementPreview": "给你一个由 n 个整数组成的数组 nums，和一个目标值 target。请你找出并返回满足下述全部条件且 不重复 的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）： 0 <= a, b, c, d < n a、 b、 c 和 d 互不相同 nums[a] + nums[b] + nums[c] + nums[d] == target 你可以按 任意顺序 返回答案。",
    "approachPreview": "我们注意到，题目中要求找到不重复的四元组，那么我们可以先对数组进行排序，这样就可以方便地跳过重复的元素。 接下来，我们枚举四元组的前两个元素 nums[i] 和 nums[j]，其中 i \\lt j，在枚举的过程中，我们跳过重复的 nums[i] 和 nums[j]。然后，我们用两个指针 k 和 l 分别指向 nums[i] 和 nums[j] 后面的两端，令 x = nums[i] + nums[j] + nums[k] + nums[l]，我们将 x 与 target 比较，进行如下操作： 如果 x \\lt target，则更新 k = k + 1 以得到更大的 x； 如果 x \\gt target，则更新 l = l - 1 以得到更小的 x； 否则，说明找到了一个四元组 (nums[i], nums[j], nums[k], nums[l])，将其加入答案，然后我们更新指针 k 和 l，并跳过所有重复的元素，防止答案中包含重复的四元组，继续寻找下一个四元组。 时间复杂度为 O(n^3)，空间复杂度为 O(\\log n)，其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 四数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.0%",
    "difficulty": "中等",
    "frontendId": "167",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum",
      "two-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0167.Two%20Sum%20II%20-%20Input%20Array%20Is%20Sorted/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Two Sum II - Input Array Is Sorted",
    "titleCn": "两数之和 II - 输入有序数组",
    "titleSlug": "two-sum-ii-input-array-is-sorted",
    "url": "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/",
    "statementPreview": "给你一个下标从 1 开始的整数数组 numbers，该数组已按 非递减顺序排列，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index_1] 和 numbers[index_2]，则 1 <= index_1 < index_2 <= numbers.length。 以长度为 2 的整数数组 [index_1, index_2] 的形式返回这两个整数的下标 index_1 和 index_2。 你可以假设每个输入 只对应唯一的答案，而且你 不可以 重复使用相同的元素。 你所设计的解决方案必须只使用常量级的额外空间。",
    "approachPreview": "我们注意到数组按照非递减顺序排列，因此对于每个 numbers[i]，可以通过二分查找的方式找到 target - numbers[i] 的位置，如果存在，那么返回 [i + 1, j + 1] 即可。 时间复杂度 O(n \\times \\log n)，其中 n 为数组 numbers 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数之和 II - 输入有序数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "42.5%",
    "difficulty": "简单",
    "frontendId": "170",
    "paidOnly": true,
    "seriesKeys": [
      "n-sum",
      "hash-table-design",
      "stream-statistics-design",
      "two-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0170.Two%20Sum%20III%20-%20Data%20structure%20design/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Two Sum III - Data structure design",
    "titleCn": "两数之和 III - 数据结构设计",
    "titleSlug": "two-sum-iii-data-structure-design",
    "url": "https://leetcode.cn/problems/two-sum-iii-data-structure-design/description/",
    "statementPreview": "设计一个接收整数流的数据结构，该数据结构支持检查是否存在两数之和等于特定值。 实现 TwoSum 类： TwoSum() 使用空数组初始化 TwoSum 对象 void add(int number) 向数据结构添加一个数 number boolean find(int value) 寻找数据结构中是否存在一对整数，使得两数之和与给定的值相等。如果存在，返回 true；否则，返回 false。",
    "approachPreview": "我们用哈希表 cnt 存储数字出现的次数。 调用 add 方法时，将数字 number 的出现次数加一。 调用 find 方法时，遍历哈希表 cnt，对于每个键 x，判断 value - x 是否也是哈希表 cnt 的键，如果是，判断 x 是否等于 value - x，如果不等，说明找到了一对和为 value 的数字，返回 true；如果等，判断 x 的出现次数是否大于 1，如果大于 1，说明找到了一对和为 value 的数字，返回 true；如果小于等于 1，说明没有找到一对和为 value 的数字，继续遍历哈希表 cnt，如果遍历结束都没有找到，返回 false。 时间复杂度： add 方法的时间复杂度为 O(1)； find 方法的时间复杂度为 O(n)。 空间复杂度 O(n)，其中 n 为哈希表 cnt 的大小。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数之和 III - 数据结构设计 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.8%",
    "difficulty": "中等",
    "frontendId": "259",
    "paidOnly": true,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0259.3Sum%20Smaller/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "3Sum Smaller",
    "titleCn": "较小的三数之和",
    "titleSlug": "3sum-smaller",
    "url": "https://leetcode.cn/problems/3sum-smaller/description/",
    "statementPreview": "给定一个长度为 n 的整数数组和一个目标值 target，寻找能够使条件 nums[i] + nums[j] + nums[k] < target 成立的三元组 i, j, k 个数（ 0 <= i < j < k < n ）。",
    "approachPreview": "由于元素的顺序不影响结果，我们可以先对数组进行排序，然后使用双指针的方法来解决这个问题。 我们先将数组排序，然后枚举第一个元素 \\textit{nums}[i]，并在 \\textit{nums}[i+1:n-1] 的区间内使用双指针分别指向 \\textit{nums}[j] 和 \\textit{nums}[k]，其中 j 是 \\textit{nums}[i] 的下一个元素，而 k 是数组的最后一个元素。 如果 \\textit{nums}[i] + \\textit{nums}[j] + \\textit{nums}[k] < \\textit{target}，那么对于任意 j \\lt k' \\leq k 的元素，都有 \\textit{nums}[i] + \\textit{nums}[j] + \\textit{nums}[k'] \\lt \\textit{target}，一共有 k - j 个这样的 k'，我们将 k - j 累加到答案中。接下来，将 j 右移一个位置，继续寻找下一个满足条件的 k，直到 j \\geq k 为止。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 较小的三数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.4%",
    "difficulty": "中等",
    "frontendId": "454",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0454.4Sum%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "4Sum II",
    "titleCn": "四数相加 II",
    "titleSlug": "4sum-ii",
    "url": "https://leetcode.cn/problems/4sum-ii/description/",
    "statementPreview": "给你四个整数数组 nums1、 nums2、 nums3 和 nums4，数组长度都是 n，请你计算有多少个元组 (i, j, k, l) 能满足： 0 <= i, j, k, l < n nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0",
    "approachPreview": "我们可以将数组 nums1 和 nums2 中的元素 a 和 b 相加，将所有可能的和存储在哈希表 cnt 中，其中键为两数之和，值为两数之和出现的次数。 然后我们遍历数组 nums3 和 nums4 中的元素 c 和 d，令 c+d 为目标值，那么答案即为 cnt[-(c+d)] 的累加和。 时间复杂度 O(n^2)，空间复杂度 O(n^2)，其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 四数相加 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "63.8%",
    "difficulty": "简单",
    "frontendId": "653",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum",
      "two-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0653.Two%20Sum%20IV%20-%20Input%20is%20a%20BST/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Two Sum IV - Input is a BST",
    "titleCn": "两数之和 IV - 输入二叉搜索树",
    "titleSlug": "two-sum-iv-input-is-a-bst",
    "url": "https://leetcode.cn/problems/two-sum-iv-input-is-a-bst/description/",
    "statementPreview": "给定一个二叉搜索树 root 和一个目标结果 k，如果二叉搜索树中存在两个元素且它们的和等于给定的目标结果，则返回 true。",
    "approachPreview": "DFS 遍历二叉搜索树，对于每个节点，判断 k - node.val 是否在哈希表中，如果在，则返回 true，否则将 node.val 加入哈希表中。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为二叉搜索树的节点个数。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数之和 IV - 输入二叉搜索树 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "43.2%",
    "difficulty": "中等",
    "frontendId": "923",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0923.3Sum%20With%20Multiplicity/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "3Sum With Multiplicity",
    "titleCn": "三数之和的多种可能",
    "titleSlug": "3sum-with-multiplicity",
    "url": "https://leetcode.cn/problems/3sum-with-multiplicity/description/",
    "statementPreview": "给定一个整数数组 arr，以及一个整数 target 作为目标值，返回满足 i < j < k 且 arr[i] + arr[j] + arr[k] == target 的元组 i, j, k 的数量。 由于结果会非常大，请返回 10^9 + 7 的模。",
    "approachPreview": "我们可以用一个哈希表或者一个长度为 101 的数组 cnt 统计数组 arr 中每个元素的出现次数。 然后，我们枚举数组 arr 中的每个元素 arr[j]，先将 cnt[arr[j]] 减一，然后再枚举 arr[j] 之前的元素 arr[i]，计算 c = target - arr[i] - arr[j]，如果 c 在 [0, 100] 的范围内，那么答案就加上 cnt[c]，最后返回答案。 注意，这里的答案可能会超过 {10}^9 + 7，所以在每次加法操作后都要取模。 时间复杂度 O(n^2)，其中 n 为数组 arr 的长度。空间复杂度 O(C)，其中 C 为数组 arr 中元素的最大值，本题中 C = 100。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 三数之和的多种可能 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.5%",
    "difficulty": "简单",
    "frontendId": "1099",
    "paidOnly": true,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1099.Two%20Sum%20Less%20Than%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Two Sum Less Than K",
    "titleCn": "小于 K 的两数之和",
    "titleSlug": "two-sum-less-than-k",
    "url": "https://leetcode.cn/problems/two-sum-less-than-k/description/",
    "statementPreview": "给你一个整数数组 nums 和整数 k，返回最大和 sum，满足存在 i < j 使得 nums[i] + nums[j] = sum 且 sum < k。如果没有满足此等式的 i,j 存在，则返回 -1。",
    "approachPreview": "我们可以先对数组 nums 进行排序，初始化答案为 -1。 接下来，我们枚举数组中的每个元素 nums[i]，并在数组中寻找满足 nums[j] + nums[i] \\lt k 的最大的 nums[j]。这里我们可以使用二分查找来加速寻找过程。如果找到了这样的 nums[j]，那么我们就可以更新答案，即 ans = \\max(ans, nums[i] + nums[j])。 枚举结束后，返回答案即可。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 小于 K 的两数之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.0%",
    "difficulty": "中等",
    "frontendId": "1214",
    "paidOnly": true,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1214.Two%20Sum%20BSTs/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Two Sum BSTs",
    "titleCn": "查找两棵二叉搜索树之和",
    "titleSlug": "two-sum-bsts",
    "url": "https://leetcode.cn/problems/two-sum-bsts/description/",
    "statementPreview": "给出两棵二叉搜索树的根节点 root1 和 root2，请你从两棵树中各找出一个节点，使得这两个节点的值之和等于目标值 Target。 如果可以找到返回 True，否则返回 False。",
    "approachPreview": "我们分别对两棵树进行中序遍历，得到两个有序数组 nums[0] 和 nums[1]，然后使用双指针的方法判断是否存在两个数的和为目标值。双指针判断方法如下： 初始化两个指针 i 和 j，分别指向数组 nums[0] 的左边界和数组 nums[1] 的右边界； 每次比较 x = nums[0][i] + nums[1][j] 与目标值的大小。如果 x = target，则返回 true；否则，如果 x \\lt target，则 i 右移一位；否则，如果 x \\gt target，则 j 左移一位。 时间复杂度 O(m + n)，空间复杂度 O(m + n)。其中 m 和 n 分别为两棵树的节点数。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 查找两棵二叉搜索树之和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.0%",
    "difficulty": "中等",
    "frontendId": "1679",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1679.Max%20Number%20of%20K-Sum%20Pairs/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Max Number of K-Sum Pairs",
    "titleCn": "K 和数对的最大数目",
    "titleSlug": "max-number-of-k-sum-pairs",
    "url": "https://leetcode.cn/problems/max-number-of-k-sum-pairs/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。 每一步操作中，你需要从数组中选出和为 k 的两个整数，并将它们移出数组。 返回你可以对数组执行的最大操作数。",
    "approachPreview": "我们对 nums 进行排序。然后 l, r 分别指向 nums 首尾元素，判断两整数之和 s 与 k 的大小关系。 若 s = k，说明找到了两个整数，满足和为 k，答案加一，然后 l, r 向中间移动； 若 s \\gt k，则 r 指针向左移动； 若 s \\lt k，则 l 指针向右移动； 继续循环判断，直至 l \\geq r。 循环结束，返回答案。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 为 nums 的长度。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 K 和数对的最大数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.2%",
    "difficulty": "困难",
    "frontendId": "2386",
    "paidOnly": false,
    "seriesKeys": [
      "n-sum"
    ],
    "seriesPrimaryKey": "n-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2386.Find%20the%20K-Sum%20of%20an%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find the K-Sum of an Array",
    "titleCn": "找出数组的第 K 大和",
    "titleSlug": "find-the-k-sum-of-an-array",
    "url": "https://leetcode.cn/problems/find-the-k-sum-of-an-array/description/",
    "statementPreview": "给你一个整数数组 nums 和一个 正 整数 k。你可以选择数组的任一 子序列 并且对其全部元素求和。 数组的 第 k 大和 定义为：可以获得的第 k 个 最大 子序列和（子序列和允许出现重复） 返回数组的 第 k 大和。 子序列是一个可以由其他数组删除某些或不删除元素派生而来的数组，且派生过程不改变剩余元素的顺序。 注意： 空子序列的和视作 0。",
    "approachPreview": "首先，我们找到最大的子序和 mx，即所有正数之和。 可以发现，其他子序列的和，都可以看成在这个最大子序列和之上，减去其他部分子序列之和得到。因此，我们可以将问题转换为求第 k 小的子序列和。 只需要将所有数的绝对值升序排列，之后建立小根堆，存储二元组 (s, i)，表示当前和为 s，且下一个待选择的数字的下标为 i 的子序列。 每次取出堆顶，并放入两种新情况：一是再选择下一位，二是选择下一位并且不选择本位。 由于数组是从小到大排序，这种方式能够不重不漏地按序遍历完所有的子序列和。 时间复杂度 O(n \\times \\log n + k \\times \\log k)。其中 n 是数组 \\textit{nums} 的长度。空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和N 数之和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出数组的第 K 大和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 数之和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "56.7%",
    "difficulty": "中等",
    "frontendId": "53",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0053.Maximum%20Subarray/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Maximum Subarray",
    "titleCn": "最大子数组和",
    "titleSlug": "maximum-subarray",
    "url": "https://leetcode.cn/problems/maximum-subarray/description/",
    "statementPreview": "给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。 子数组 是数组中的一个连续部分。",
    "approachPreview": "我们定义 f[i] 表示以元素 \\textit{nums}[i] 为结尾的连续子数组的最大和，初始时 f[0] = \\textit{nums}[0]，那么最终我们要求的答案即为 \\max_{0 \\leq i < n} f[i]。 考虑 f[i]，其中 i \\geq 1，它的状态转移方程为： f[i] = \\max(f[i - 1] + \\textit{nums}[i], \\textit{nums}[i]) 也即： f[i] = \\max(f[i - 1], 0) + \\textit{nums}[i] 由于 f[i] 只与 f[i - 1] 有关系，因此我们可以只用一个变量 f 来维护对于当前 f[i] 的值是多少，然后进行状态转移即可。答案为 \\max_{0 \\leq i < n} f。 时间复杂度 O(n)，其中 n 为数组 \\textit{nums} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大子数组和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.4%",
    "difficulty": "中等",
    "frontendId": "209",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0209.Minimum%20Size%20Subarray%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Minimum Size Subarray Sum",
    "titleCn": "长度最小的子数组",
    "titleSlug": "minimum-size-subarray-sum",
    "url": "https://leetcode.cn/problems/minimum-size-subarray-sum/description/",
    "statementPreview": "给定一个含有 n 个正整数的数组和一个正整数 target。 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [nums_l, nums_l+1, ..., nums_r-1, nums_r]，并返回其长度。 如果不存在符合条件的子数组，返回 0。",
    "approachPreview": "我们先预处理出数组 nums 的前缀和数组 s，其中 s[i] 表示数组 nums 前 i 项元素之和。由于数组 nums 中的元素都是正整数，因此数组 s 也是单调递增的。另外，我们初始化答案 ans = n + 1，其中 n 为数组 nums 的长度。 接下来，我们遍历前缀和数组 s，对于其中的每个元素 s[i]，我们可以通过二分查找的方法找到满足 s[j] \\geq s[i] + target 的最小下标 j，如果 j \\leq n，则说明存在满足条件的子数组，我们可以更新答案，即 ans = min(ans, j - i)。 最后，如果 ans \\leq n，则说明存在满足条件的子数组，返回 ans，否则返回 0。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 长度最小的子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.5%",
    "difficulty": "中等",
    "frontendId": "325",
    "paidOnly": true,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0325.Maximum%20Size%20Subarray%20Sum%20Equals%20k/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Maximum Size Subarray Sum Equals k",
    "titleCn": "和等于 k 的最长子数组长度",
    "titleSlug": "maximum-size-subarray-sum-equals-k",
    "url": "https://leetcode.cn/problems/maximum-size-subarray-sum-equals-k/description/",
    "statementPreview": "给定一个数组 nums 和一个目标值 k，找到和等于 k 的最长连续 子数组 长度。如果不存在任意一个符合要求的子数组，则返回 0。",
    "approachPreview": "我们可以用一个哈希表 \\textit{d} 记录数组 \\textit{nums} 中每个前缀和第一次出现的下标，初始时 \\textit{d}[0] = -1。另外定义一个变量 \\textit{s} 记录前缀和。 接下来，遍历数组 \\textit{nums}，对于当前遍历到的数字 \\textit{nums}[i]，我们更新前缀和 \\textit{s} = \\textit{s} + \\textit{nums}[i]，如果 \\textit{s}-k 在哈希表 \\textit{d} 中存在，不妨记 j = \\textit{d}[\\textit{s} - k]，那么以 \\textit{nums}[i] 结尾的符合条件的子数组的长度为 i - j，我们使用一个变量 \\textit{ans} 来维护最长的符合条件的子数组的长度。然后，如果 \\textit{s} 在哈希表中不存在，我们记录 \\textit{s} 和对应的下标 i，即 \\textit{d}[\\textit{s}] = i，否则我们不更新 \\textit{d}[\\textit{s}]。需要注意的是，可能会有多个位置 i 都满足 \\textit{s} 的值，因此我们只记录最小的 i，这样就能保证子数组的长度最长。 遍历结束之后，我们返回 \\textit{ans} 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和等于 k 的最长子数组长度 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "29.8%",
    "difficulty": "中等",
    "frontendId": "523",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0523.Continuous%20Subarray%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Continuous Subarray Sum",
    "titleCn": "连续的子数组和",
    "titleSlug": "continuous-subarray-sum",
    "url": "https://leetcode.cn/problems/continuous-subarray-sum/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k，如果 nums 有一个 好的子数组 返回 true，否则返回 false： 一个 好的子数组 是： 长度 至少为 2，且 子数组元素总和为 k 的倍数。 注意： 子数组 是数组中 连续 的部分。 如果存在一个整数 n，令整数 x 符合 x = n * k，则称 x 是 k 的一个倍数。 0 始终 视为 k 的一个倍数。",
    "approachPreview": "根据题目描述，如果存在两个前缀和模 k 的余数相同的位置 i 和 j（不妨设 j < i），那么 \\textit{nums}[j+1..i] 这个子数组的和是 k 的倍数。 因此，我们可以使用哈希表存储每个前缀和模 k 的余数第一次出现的位置。初始时，我们在哈希表中存入一对键值对 (0, -1)，表示前缀和为 0 的余数 0 出现在位置 -1。 遍历数组时，我们计算当前前缀和的模 k 的余数，如果当前前缀和的模 k 的余数没有在哈希表中出现过，我们就将当前前缀和的模 k 的余数和对应的位置存入哈希表中。否则，如果当前前缀和的模 k 的余数在哈希表中已经出现过，位置为 j，那么我们就找到了一个满足条件的子数组 \\textit{nums}[j+1..i]，因此返回 \\textit{True}。 遍历结束后，如果没有找到满足条件的子数组，我们返回 \\textit{False}。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 连续的子数组和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.6%",
    "difficulty": "中等",
    "frontendId": "560",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0560.Subarray%20Sum%20Equals%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Subarray Sum Equals K",
    "titleCn": "和为 K 的子数组",
    "titleSlug": "subarray-sum-equals-k",
    "url": "https://leetcode.cn/problems/subarray-sum-equals-k/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k，请你统计并返回 该数组中和为 k 的子数组的个数。 子数组是数组中元素的连续非空序列。",
    "approachPreview": "我们定义一个哈希表 \\textit{cnt}，用于存储数组 \\textit{nums} 的前缀和出现的次数。初始时，我们将 \\textit{cnt}[0] 的值设为 1，表示前缀和 0 出现了一次。 我们遍历数组 \\textit{nums}，计算前缀和 \\textit{s}，然后将 \\textit{cnt}[s - k] 的值累加到答案中，并将 \\textit{cnt}[s] 的值增加 1。 遍历结束后，我们返回答案。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和为 K 的子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "29.0%",
    "difficulty": "困难",
    "frontendId": "862",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0862.Shortest%20Subarray%20with%20Sum%20at%20Least%20K/README.md",
    "tags": [
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "monotonic-queue",
        "name": "单调队列"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Shortest Subarray with Sum at Least K",
    "titleCn": "和至少为 K 的最短子数组",
    "titleSlug": "shortest-subarray-with-sum-at-least-k",
    "url": "https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k，找出 nums 中和至少为 k 的 最短非空子数组，并返回该子数组的长度。如果不存在这样的 子数组，返回 -1。 子数组 是数组中 连续 的一部分。",
    "approachPreview": "题目要求找到一个最短的子数组，使得子数组的和大于等于 k。不难想到，可以使用前缀和快速计算子数组的和。 我们用一个长度为 n+1 的数组 s[i] 表示数组 nums 前 i 个元素的和。另外，我们需要维护一个严格单调递增的队列 q，队列中存储的是前缀和数组 s[i] 的下标。注意，这里的单调递增是指下标对应的前缀和的大小，而不是下标的大小。 为什么存的是下标呢？这是为了方便计算子数组的长度。那为什么队列严格单调递增？我们可以用反证法来说明。 假设队列元素非严格单调递增，也即是说，存在下标 i 和 j，满足 i < j，且 s[i] \\geq s[j]。 当遍历到下标 k，其中 i \\lt j \\lt k \\leq n，此时 s[k]-s[j] \\geq s[k]-s[i]，且 nums[j..k-1] 的长度小于 nums[i..k-1] 的长度。由于下标 j 的存在，子数组 nums[i..k-1] 一定不是最优解，队列中的下标 i 是不必要的，需要将其移除。因此，队列中的元素一定严格单调递增。 回到这道题目上，我们遍历前缀和数组 s，对于遍历到的下标 i，如果 s[i] - s[q.front] \\geq k，说明当前遇到了一个可行解，我们可以更新答案。此时，我们需要将队首元素出队，直到队列为空或者 s[i] - s[q.front] \\lt k 为止。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和至少为 K 的最短子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.6%",
    "difficulty": "中等",
    "frontendId": "930",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0930.Binary%20Subarrays%20With%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Binary Subarrays With Sum",
    "titleCn": "和相同的二元子数组",
    "titleSlug": "binary-subarrays-with-sum",
    "url": "https://leetcode.cn/problems/binary-subarrays-with-sum/description/",
    "statementPreview": "给你一个二元数组 nums，和一个整数 goal，请你统计并返回有多少个和为 goal 的 非空 子数组。 子数组 是数组的一段连续部分。",
    "approachPreview": "我们可以用数组或哈希表 cnt 记录每个前缀和出现的次数，其中 cnt[i] 表示前缀和为 i 的子数组个数。初始时 cnt[0] = 1。 接下来我们遍历数组 nums，用变量 s 维护当前的前缀和，对于每个 s，我们可以计算出 s - goal 出现的次数，即为以当前位置结尾的满足条件的子数组个数，累加到答案中。然后我们将 s 的计数值加 1。 最终的答案即为满足条件的子数组个数。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和相同的二元子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.6%",
    "difficulty": "中等",
    "frontendId": "974",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0974.Subarray%20Sums%20Divisible%20by%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Subarray Sums Divisible by K",
    "titleCn": "和可被 K 整除的子数组",
    "titleSlug": "subarray-sums-divisible-by-k",
    "url": "https://leetcode.cn/problems/subarray-sums-divisible-by-k/description/",
    "statementPreview": "给定一个整数数组 nums 和一个整数 k，返回其中元素之和可被 k 整除的非空 子数组 的数目。 子数组 是数组中 连续 的部分。",
    "approachPreview": "假设存在 i \\leq j，使得 \\textit{nums}[i,..j] 的和能被 k 整除，如果我们令 s_i 表示 \\textit{nums}[0,..i] 的和，令 s_j 表示 \\textit{nums}[0,..j] 的和，那么 s_j - s_i 能被 k 整除，即 (s_j - s_i) \\bmod k = 0，也即 s_j \\bmod k = s_i \\bmod k。因此，我们可以用哈希表统计前缀和模 k 的值的个数，从而快速判断是否存在满足条件的子数组。 我们用一个哈希表 \\textit{cnt} 统计前缀和模 k 的值的个数，即 \\textit{cnt}[i] 表示前缀和模 k 的值为 i 的个数。初始时 \\textit{cnt}[0]=1。用变量 s 表示前缀和，初始时 s = 0。 接下来，从左到右遍历数组 \\textit{nums}，对于遍历到的每个元素 x，我们计算 s = (s + x) \\bmod k，然后更新答案 \\textit{ans} = \\textit{ans} + \\textit{cnt}[s]，其中 \\textit{cnt}[s] 表示前缀和模 k 的值为 s 的个数。最后我们将 \\textit{cnt}[s] 的值加 1，继续遍历下一个元素。 最终，我们返回答案 \\textit{ans}。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和可被 K 整除的子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.8%",
    "difficulty": "中等",
    "frontendId": "1186",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1186.Maximum%20Subarray%20Sum%20with%20One%20Deletion/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Maximum Subarray Sum with One Deletion",
    "titleCn": "删除一次得到子数组最大和",
    "titleSlug": "maximum-subarray-sum-with-one-deletion",
    "url": "https://leetcode.cn/problems/maximum-subarray-sum-with-one-deletion/description/",
    "statementPreview": "给你一个整数数组，返回它的某个 非空 子数组（连续元素）在执行一次可选的删除操作后，所能得到的最大元素总和。换句话说，你可以从原数组中选出一个子数组，并可以决定要不要从中删除一个元素（只能删一次哦），（删除后）子数组中至少应当有一个元素，然后该子数组（剩下）的元素总和是所有子数组之中最大的。 注意，删除一个元素后，子数组 不能为空。",
    "approachPreview": "我们可以先预处理出数组 \\textit{arr} 以每个元素结尾和开头的最大子数组和，分别存入数组 \\textit{left} 和 \\textit{right} 中。 如果我们不删除任何元素，那么最大子数组和就是 \\textit{left}[i] 或 \\textit{right}[i] 中的最大值；如果我们删除一个元素，我们可以枚举 [1..n-2] 中的每个位置 i，计算 \\textit{left}[i-1] + \\textit{right}[i+1] 的值，取最大值即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 \\textit{arr} 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除一次得到子数组最大和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.2%",
    "difficulty": "中等",
    "frontendId": "1524",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1524.Number%20of%20Sub-arrays%20With%20Odd%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Number of Sub-arrays With Odd Sum",
    "titleCn": "和为奇数的子数组数目",
    "titleSlug": "number-of-sub-arrays-with-odd-sum",
    "url": "https://leetcode.cn/problems/number-of-sub-arrays-with-odd-sum/description/",
    "statementPreview": "给你一个整数数组 arr。请你返回和为 奇数 的子数组数目。 由于答案可能会很大，请你将结果对 10^9 + 7 取余后返回。",
    "approachPreview": "我们定义一个长度为 2 的数组 \\textit{cnt} 作为计数器，其中 \\textit{cnt}[0] 和 \\textit{cnt}[1] 分别表示前缀和为偶数和奇数的子数组的个数。初始时 \\textit{cnt}[0] = 1，而 \\textit{cnt}[1] = 0。 接下来，我们维护当前的前缀和 s，初始时 s = 0。 遍历数组 \\textit{arr}，对于遍历到的每个元素 x，我们将 s 的值加上 x，然后根据 s 的奇偶性，将 \\textit{cnt}[s \\mod 2 \\oplus 1] 的值累加到答案中，然后我们将 \\textit{cnt}[s \\mod 2] 的值加 1。 遍历结束后，我们即可得到答案。注意答案的取模运算。 时间复杂度 O(n)，其中 n 为数组 \\textit{arr} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和为奇数的子数组数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.9%",
    "difficulty": "中等",
    "frontendId": "1546",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1546.Maximum%20Number%20of%20Non-Overlapping%20Subarrays%20With%20Sum%20Equals%20Target/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Maximum Number of Non-Overlapping Subarrays With Sum Equals Target",
    "titleCn": "和为目标值且不重叠的非空子数组的最大数目",
    "titleSlug": "maximum-number-of-non-overlapping-subarrays-with-sum-equals-target",
    "url": "https://leetcode.cn/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target/description/",
    "statementPreview": "给你一个数组 nums 和一个整数 target。 请你返回 非空不重叠 子数组的最大数目，且每个子数组中数字和都为 target。",
    "approachPreview": "我们遍历数组 nums，利用前缀和 + 哈希表的方法，寻找和为 target 的子数组，若找到，则答案加一，然后我们将前缀和置为 0，继续遍历数组 nums，直到遍历完整个数组。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 和为目标值且不重叠的非空子数组的最大数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "30.2%",
    "difficulty": "中等",
    "frontendId": "3026",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3026.Maximum%20Good%20Subarray%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Maximum Good Subarray Sum",
    "titleCn": "最大好子数组和",
    "titleSlug": "maximum-good-subarray-sum",
    "url": "https://leetcode.cn/problems/maximum-good-subarray-sum/description/",
    "statementPreview": "给你一个长度为 n 的数组 nums 和一个 正 整数 k。 如果 nums 的一个 子数组 中，第一个元素和最后一个元素 差的绝对值恰好 为 k，我们称这个子数组为 好 的。换句话说，如果子数组 nums[i..j] 满足 nums[i] - nums[j] == k，那么它是一个好子数组。 请你返回 nums 中 好 子数组的 最大 和，如果没有好子数组，返回 0。",
    "approachPreview": "我们用一个哈希表 p 记录 nums[i] 的前缀数组 nums[0..i-1] 的和 s，如果有多个相同的 nums[i]，我们只保留最小的 s。初始时，我们将 p[nums[0]] 设为 0。另外，我们用一个变量 s 记录当前的前缀和，初始时 s = 0。初始化答案 ans 为 -\\infty。 接下来，我们枚举 nums[i]，并且维护一个变量 s 表示 nums[0..i] 的和。如果 nums[i] - k 在 p 中，那么我们就找到了一个好子数组，将答案更新为 ans = \\max(ans, s - p[nums[i] - k])。同理，如果 nums[i] + k 在 p 中，那么我们也找到了一个好子数组，将答案更新为 ans = \\max(ans, s - p[nums[i] + k])。然后，如果 i + 1 \\lt n 并且 nums[i + 1] 不在 p 中，或者 p[nums[i + 1]] \\gt s，我们就将 p[nums[i + 1]] 设为 s。 最后，如果 ans = -\\infty，那么我们返回 0，否则返回 ans。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大好子数组和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.1%",
    "difficulty": "简单",
    "frontendId": "3364",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3364.Minimum%20Positive%20Sum%20Subarray/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Minimum Positive Sum Subarray",
    "titleCn": "最小正和子数组",
    "titleSlug": "minimum-positive-sum-subarray",
    "url": "https://leetcode.cn/problems/minimum-positive-sum-subarray/description/",
    "statementPreview": "给你一个整数数组 nums 和 两个 整数 l 和 r。你的任务是找到一个长度在 l 和 r 之间（包含）且和大于 0 的 子数组 的 最小 和。 返回满足条件的子数组的 最小 和。如果不存在这样的子数组，则返回 -1。 子数组 是数组中的一个连续 非空 元素序列。",
    "approachPreview": "我们可以枚举子数组的左端点 i，然后在 [i, n) 的区间内从左往右枚举右端点 j，计算区间 [i, j] 的和 s，如果 s 大于 0 且区间长度在 [l, r] 之间，我们就更新答案。 最后，如果答案仍然是初始值，说明没有找到符合条件的子数组，返回 -1，否则返回答案。 时间复杂度 O(n^2)，其中 n 是数组 \\textit{nums} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小正和子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.1%",
    "difficulty": "中等",
    "frontendId": "3381",
    "paidOnly": false,
    "seriesKeys": [
      "subarray-sum"
    ],
    "seriesPrimaryKey": "subarray-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3381.Maximum%20Subarray%20Sum%20With%20Length%20Divisible%20by%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Maximum Subarray Sum With Length Divisible by K",
    "titleCn": "长度可被 K 整除的子数组的最大元素和",
    "titleSlug": "maximum-subarray-sum-with-length-divisible-by-k",
    "url": "https://leetcode.cn/problems/maximum-subarray-sum-with-length-divisible-by-k/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。 返回 nums 中一个 非空子数组 的 最大 和，要求该子数组的长度可以 被 k 整除。",
    "approachPreview": "根据题目描述，要使得子数组的长度可以被 k 整除，等价于要求子数组 \\textit{nums}[i+1 \\ldots j] 中，满足 i \\bmod k = j \\bmod k。 我们可以枚举子数组的右端点 j，并使用一个长度为 k 的数组 \\textit{f} 来记录每个模 k 的前缀和的最小值。初始时 \\textit{f}[k-1] = 0，表示下标 -1 的前缀和为 0。 那么对于当前的右端点 j，前缀和为 s，我们可以计算出以 j 为右端点的、长度可以被 k 整除的子数组的最大和为 s - \\textit{f}[j \\bmod k]，以此更新答案。同时，我们也需要更新 \\textit{f}[j \\bmod k]，使其等于当前前缀和 s 和 \\textit{f}[j \\bmod k] 的较小值。 枚举结束后，返回答案即可。 时间复杂度 O(n)，空间复杂度 O(k)。其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和子数组和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 长度可被 K 整除的子数组的最大元素和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "42.5%",
    "difficulty": "中等",
    "frontendId": "3",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0003.Longest%20Substring%20Without%20Repeating%20Characters/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Longest Substring Without Repeating Characters",
    "titleCn": "无重复字符的最长子串",
    "titleSlug": "longest-substring-without-repeating-characters",
    "url": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/",
    "statementPreview": "给定一个字符串 s，请你找出其中不含有重复字符的 最长 子串 的长度。",
    "approachPreview": "我们可以用两个指针 l 和 r 维护一个滑动窗口，使其始终满足窗口内没有重复字符，初始时 l 和 r 都指向字符串的第一个字符。用一个哈希表或者长度为 128 的数组 \\textit{cnt} 来记录每个字符出现的次数，其中 \\textit{cnt}[c] 表示字符 c 出现的次数。 接下来，我们依次移动右指针 r，每次移动时，将 \\textit{cnt}[s[r]] 的值加 1，然后判断当前窗口 [l, r] 内 \\textit{cnt}[s[r]] 是否大于 1，如果大于 1，说明当前窗口内有重复字符，我们需要移动左指针 l，直到窗口内没有重复字符为止。然后，我们更新答案 \\textit{ans} = \\max(\\textit{ans}, r - l + 1)。 最终，我们返回答案 \\textit{ans} 即可。 时间复杂度 O(n)，其中 n 为字符串的长度。空间复杂度 O( \\Sigma )，其中 \\Sigma 表示字符集，这里 \\Sigma 的大小为 128。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 无重复字符的最长子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "40.8%",
    "difficulty": "中等",
    "frontendId": "5",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0005.Longest%20Palindromic%20Substring/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Palindromic Substring",
    "titleCn": "最长回文子串",
    "titleSlug": "longest-palindromic-substring",
    "url": "https://leetcode.cn/problems/longest-palindromic-substring/description/",
    "statementPreview": "给你一个字符串 s，找到 s 中最长的 回文 子串。",
    "approachPreview": "我们定义 f[i][j] 表示字符串 s[i..j] 是否为回文串，初始时 f[i][j] = true。 接下来，我们定义变量 k 和 mx，其中 k 表示最长回文串的起始位置，mx 表示最长回文串的长度。初始时 k = 0, mx = 1。 考虑 f[i][j]，如果 s[i] = s[j]，那么 f[i][j] = f[i + 1][j - 1]；否则 f[i][j] = false。如果 f[i][j] = true 并且 mx \\lt j - i + 1，那么我们更新 k = i, mx = j - i + 1。 由于 f[i][j] 依赖于 f[i + 1][j - 1]，因此我们需要保证 i + 1 在 j - 1 之前，因此我们需要从大到小地枚举 i，从小到大地枚举 j。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长回文子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "38.3%",
    "difficulty": "困难",
    "frontendId": "30",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0030.Substring%20with%20Concatenation%20of%20All%20Words/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Substring with Concatenation of All Words",
    "titleCn": "串联所有单词的子串",
    "titleSlug": "substring-with-concatenation-of-all-words",
    "url": "https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description/",
    "statementPreview": "给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。 s 中的 串联子串 是指一个包含 words 中所有字符串以任意顺序排列连接起来的子串。 例如，如果 words = [\"ab\",\"cd\",\"ef\"]， 那么 \"abcdef\"， \"abefcd\"， \"cdabef\"， \"cdefab\"， \"efabcd\"， 和 \"efcdab\" 都是串联子串。 \"acdbef\" 不是串联子串，因为他不是任何 words 排列的连接。 返回所有串联子串在 s 中的开始索引。你可以以 任意顺序 返回答案。",
    "approachPreview": "我们用哈希表 cnt 统计 words 中每个单词出现的次数，用哈希表 cnt1 统计当前滑动窗口中每个单词出现的次数。我们记字符串 s 的长度为 m，字符串数组 words 中单词的数量为 n，每个单词的长度为 k。 我们可以枚举滑动窗口的起点 i，其中 0 \\lt i \\lt k。对于每个起点，我们维护一个滑动窗口，左边界为 l，右边界为 r，滑动窗口中的单词个数为 t，另外用一个哈希表 cnt1 统计滑动窗口中每个单词出现的次数。 每一次，我们提取字符串 s[r:r+k]，如果 s[r:r+k] 不在哈希表 cnt 中，说明当前滑动窗口中的单词不合法，我们将左边界 l 更新为 r，同时将哈希表 cnt1 清空，单词个数 t 重置为 0。如果 s[r:r+k] 在哈希表 cnt 中，说明当前滑动窗口中的单词合法，我们将单词个数 t 加 1，将哈希表 cnt1 中 s[r:r+k] 的次数加 1。如果 cnt1[s[r:r+k]] 大于 cnt[s[r:r+k]]，说明当前滑动窗口中 s[r:r+k] 出现的次数过多，我们需要将左边界 l 右移，直到 cnt1[s[r:r+k]] = cnt[s[r:r+k]]。如果 t = n，说明当前滑动窗口中的单词正好合法，我们将左边界 l 加入答案数组。 时间复杂度 O(m \\times k)，空间复杂度 O(n \\times k)。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 串联所有单词的子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.3%",
    "difficulty": "困难",
    "frontendId": "76",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0076.Minimum%20Window%20Substring/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Minimum Window Substring",
    "titleCn": "最小覆盖子串",
    "titleSlug": "minimum-window-substring",
    "url": "https://leetcode.cn/problems/minimum-window-substring/description/",
    "statementPreview": "给定两个字符串 s 和 t，长度分别是 m 和 n，返回 s 中的 最短窗口 子串，使得该子串包含 t 中的每一个字符（ 包括重复字符 ）。如果没有这样的子串，返回空字符串 \"\"。 测试用例保证答案唯一。",
    "approachPreview": "我们用一个哈希表或数组 \\textit{need} 统计字符串 t 中每个字符出现的次数，用另一个哈希表或数组 \\textit{window} 统计滑动窗口中每个字符出现的次数。另外，定义两个指针 l 和 r 分别指向窗口的左右边界，变量 \\textit{cnt} 表示窗口中已经包含了 t 中的多少个字符，变量 k 和 \\textit{mi} 分别表示最小覆盖子串的起始位置和长度。 我们从左到右遍历字符串 s，对于当前遍历到的字符 s[r]： 我们将其加入窗口中，即 \\textit{window}[s[r]] = \\textit{window}[s[r]] + 1，如果此时 \\textit{need}[s[r]] \\geq \\textit{window}[s[r]]，则说明 s[r] 是一个「必要的字符」，我们将 \\textit{cnt} 加一。 如果 \\textit{cnt} 等于 t 的长度，说明此时窗口中已经包含了 t 中的所有字符，我们就可以尝试更新最小覆盖子串的起始位置和长度了。如果 r - l + 1 < \\textit{mi}，说明当前窗口表示的子串更短，我们就更新 \\textit{mi} = r - l + 1 和 k = l。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小覆盖子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.4%",
    "difficulty": "中等",
    "frontendId": "159",
    "paidOnly": true,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0159.Longest%20Substring%20with%20At%20Most%20Two%20Distinct%20Characters/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Longest Substring with At Most Two Distinct Characters",
    "titleCn": "至多包含两个不同字符的最长子串",
    "titleSlug": "longest-substring-with-at-most-two-distinct-characters",
    "url": "https://leetcode.cn/problems/longest-substring-with-at-most-two-distinct-characters/description/",
    "statementPreview": "给你一个字符串 s，请你找出 至多 包含 两个不同字符 的最长 子串，并返回该子串的长度。",
    "approachPreview": "我们维护一个哈希表 cnt 记录当前滑动窗口中各个字符出现的次数，如果哈希表中的键值对个数超过 2，则说明当前滑动窗口中包含了超过 2 个不同的字符，此时需要移动左指针 j，直到哈希表中的键值对个数不超过 2 为止，然后更新窗口的最大长度。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 至多包含两个不同字符的最长子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.0%",
    "difficulty": "中等",
    "frontendId": "340",
    "paidOnly": true,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0340.Longest%20Substring%20with%20At%20Most%20K%20Distinct%20Characters/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Longest Substring with At Most K Distinct Characters",
    "titleCn": "至多包含 K 个不同字符的最长子串",
    "titleSlug": "longest-substring-with-at-most-k-distinct-characters",
    "url": "https://leetcode.cn/problems/longest-substring-with-at-most-k-distinct-characters/description/",
    "statementPreview": "给你一个字符串 s 和一个整数 k，请你找出 至多 包含 k 个 不同 字符的最长 子串，并返回该子串的长度。",
    "approachPreview": "我们可以使用滑动窗口的思想，用一个哈希表 \\textit{cnt} 记录窗口中每个字符的出现次数，用 \\textit{l} 记录窗口的左边界。 遍历字符串，每次将右边界的字符加入哈希表，如果哈希表中不同字符的个数超过了 k，则将左边界的字符从哈希表中删除，然后更新左边界 \\textit{l}。 最后返回字符串的长度减去左边界的长度即可。 时间复杂度 O(n)，空间复杂度 O(k)。其中 n 为字符串的长度。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 至多包含 K 个不同字符的最长子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "38.4%",
    "difficulty": "困难",
    "frontendId": "1520",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1520.Maximum%20Number%20of%20Non-Overlapping%20Substrings/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Maximum Number of Non-Overlapping Substrings",
    "titleCn": "最多的不重叠子字符串",
    "titleSlug": "maximum-number-of-non-overlapping-substrings",
    "url": "https://leetcode.cn/problems/maximum-number-of-non-overlapping-substrings/description/",
    "statementPreview": "给你一个只包含小写字母的字符串 s，你需要找到 s 中最多数目的非空子字符串，满足如下条件： 这些字符串之间互不重叠，也就是说对于任意两个子字符串 s[i..j] 和 s[x..y]，要么 j < x 要么 i > y。 如果一个子字符串包含字符 char，那么 s 中所有 char 字符都应该在这个子字符串中。 请你找到满足上述条件的最多子字符串数目。如果有多个解法有相同的子字符串数目，请返回这些子字符串总长度最小的一个解。可以证明最小总长度解是唯一的。 请注意，你可以以 任意 顺序返回最优解的子字符串。",
    "approachPreview": "先为每个字符计算最左和最右出现位置，再尝试把某个字符的区间扩展成闭包：区间内所有字符的完整出现范围都必须被包含。得到所有合法最小区间后，按右端点贪心选择互不重叠的区间。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最多的不重叠子字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.7%",
    "difficulty": "困难",
    "frontendId": "1542",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1542.Find%20Longest%20Awesome%20Substring/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Find Longest Awesome Substring",
    "titleCn": "找出最长的超赞子字符串",
    "titleSlug": "find-longest-awesome-substring",
    "url": "https://leetcode.cn/problems/find-longest-awesome-substring/description/",
    "statementPreview": "给你一个字符串 s。请返回 s 中最长的 超赞子字符串 的长度。 「超赞子字符串」需满足满足下述两个条件： 该字符串是 s 的一个非空子字符串 进行任意次数的字符交换后，该字符串可以变成一个回文字符串",
    "approachPreview": "根据题目描述，“超赞子字符串”中的字符可以通过交换得到回文字符串，因此，“超赞子字符串”中最多有一个数字字符出现奇数次，其余数字字符出现偶数次。 我们可以用一个整数 st 来表示当前前缀字符串中数字字符出现的奇偶性，其中 st 的第 i 位表示数字字符 i 出现的奇偶性，即 st 的第 i 位为 1 表示数字字符 i 出现奇数次，为 0 表示数字字符 i 出现偶数次。 而如果子字符串 s[j,..i] 是“超赞字符串”，那么前缀字符串 s[0,..i] 的状态 st 与前缀字符串 s[0,..j-1] 的状态 st' 的二进制位中，最多只有一位不同。这是因为，二进制位不同，表示奇偶性不同，而奇偶性不同，就意味着子字符串 s[j,..i] 中该数字出现的次数为奇数次。 所以，我们可以用哈希表或数组记录所有状态 st 第一次出现的位置。若当前前缀字符串的状态 st 在哈希表中已经存在，那么说明当前前缀字符串的状态 st 与前缀字符串 s[0,..j-1] 的状态 st' 的二进制位中，所有位都相同，即子字符串 s[j,..i] 是“超赞字符串”，更新答案的最大值。或者，我们可以枚举每一位，将当前前缀字符串的状态 st 的第 i 位取反，即 st \\oplus 2^i，然后判断 st \\oplus 2^i 是否在哈希表中，若在，那么说明当前前缀字符串的状态 st 与前缀字符串 s[0,..",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出最长的超赞子字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.6%",
    "difficulty": "中等",
    "frontendId": "1915",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1915.Number%20of%20Wonderful%20Substrings/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Number of Wonderful Substrings",
    "titleCn": "最美子字符串的数目",
    "titleSlug": "number-of-wonderful-substrings",
    "url": "https://leetcode.cn/problems/number-of-wonderful-substrings/description/",
    "statementPreview": "如果某个字符串中 至多一个 字母出现 奇数 次，则称其为 最美 字符串。 例如， \"ccjjc\" 和 \"abab\" 都是最美字符串，但 \"ab\" 不是。 给你一个字符串 word，该字符串由前十个小写英文字母组成（ 'a' 到 'j' ）。请你返回 word 中 最美非空子字符串 的数目。 如果同样的子字符串在 word 中出现多次，那么应当对 每次出现 分别计数。 子字符串 是字符串中的一个连续字符序列。",
    "approachPreview": "由于字符串中只包含 10 个小写字母，因此可以用一个长度为 10 的二进制数表示字符串中每个字母的奇偶性，其中第 i 位为 1 表示第 i 个字母出现了奇数次，为 0 表示第 i 个字母出现了偶数次。 我们遍历字符串的每个字符，用一个变量 st 维护当前字符串的前缀异或值，用一个数组 cnt 维护每个前缀异或值出现的次数，初始时 st = 0, cnt[0] = 1。 对于当前遍历到的字符，我们更新其前缀异或值。如果当前的前缀异或值出现了 cnt[st] 次，也就意味着有 cnt[st] 个子字符串满足所有字母的出现次数均为偶数，因此我们将答案增加 cnt[st]。此外，对于 0 \\le i < 10，如果当前的前缀异或值 st 的第 i 位为 1，那么我们还可以找到一个字母出现了奇数次，我们将答案增加 cnt[st \\oplus (1 << i)]。最后，我们将 st 出现的次数增加 1。继续遍历下一个字符，直到遍历完整个字符串。 时间复杂度 O(n \\times \\Sigma)，空间复杂度 O(2^{\\Sigma})，其中 \\Sigma = 10，而 n 为字符串的长度。 相似题目：",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最美子字符串的数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "38.9%",
    "difficulty": "困难",
    "frontendId": "2953",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2900-2999/2953.Count%20Complete%20Substrings/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Count Complete Substrings",
    "titleCn": "统计完全子字符串",
    "titleSlug": "count-complete-substrings",
    "url": "https://leetcode.cn/problems/count-complete-substrings/description/",
    "statementPreview": "给你一个字符串 word 和一个整数 k。 如果 word 的一个子字符串 s 满足以下条件，我们称它是 完全字符串： s 中每个字符 恰好 出现 k 次。 相邻字符在字母表中的顺序 至多 相差 2。也就是说， s 中两个相邻字符 c1 和 c2，它们在字母表中的位置相差 至多 为 2。 请你返回 word 中 完全 子字符串的数目。 子字符串 指的是一个字符串中一段连续 非空 的字符序列。",
    "approachPreview": "根据题目描述中的条件 2，我们可以发现，一个完全字符串中，相邻两个字符之差不超过 2。因此，我们遍历字符串 word，可以利用双指针把 word 分割成若干个子字符串，这些子字符串中的字符种类数不超过 26，且相邻字符之差不超过 2。接下来，我们只需要在每个子字符串中，统计每个字符都出现 k 次的子字符串的个数即可。 我们定义一个函数 f(s)，它的功能是统计字符串 s 中每个字符都出现 k 次的子字符串的个数。由于 s 中的字符种类数不超过 26，因此我们可以枚举每个字符种类数 i，其中 1 \\le i \\le 26，那么每个字符种类数为 i 的子字符串的长度为 l = i \\times k。 我们可以用一个数组或哈希表 cnt 维护一个长度为 l 的滑动窗口中每个字符出现的次数，用另一个哈希表 freq 维护每个次数出现的次数。如果 freq[k] = i，即有 i 个字符都出现了 k 次，那么我们就找到了一个满足条件的子字符串。我们可以用双指针维护这个滑动窗口，每次移动右指针时，我们将右指针指向的字符出现的次数加一，并更新 freq 数组；每次移动左指针时，我们将左指针指向的字符出现的次数减一，并更新 freq 数组。在每次移动指针后，我们都判断 freq[k] 是否等于 i，如果等于则说明我们找到了一个满足条件的子字符串。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计完全子字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "83.0%",
    "difficulty": "简单",
    "frontendId": "3258",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3200-3299/3258.Count%20Substrings%20That%20Satisfy%20K-Constraint%20I/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Count Substrings That Satisfy K-Constraint I",
    "titleCn": "统计满足 K 约束的子字符串数量 I",
    "titleSlug": "count-substrings-that-satisfy-k-constraint-i",
    "url": "https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-i/description/",
    "statementPreview": "给你一个 二进制 字符串 s 和一个整数 k。 如果一个 二进制字符串 满足以下任一条件，则认为该字符串满足 k 约束： 字符串中 0 的数量最多为 k。 字符串中 1 的数量最多为 k。 返回一个整数，表示 s 的所有满足 k 约束 的 子字符串 的数量。",
    "approachPreview": "我们用两个变量 \\textit{cnt0} 和 \\textit{cnt1} 分别记录当前窗口内的 0 和 1 的个数，用 \\textit{ans} 记录满足 k 约束的子字符串的个数，用 l 记录窗口的左边界。 当我们右移窗口时，如果窗口内的 0 和 1 的个数都大于 k，我们就需要左移窗口，直到窗口内的 0 和 1 的个数都不大于 k。此时，窗口内所有以 r 作为右端点的子字符串都满足 k 约束，个数为 r - l + 1，其中 r 是窗口的右边界。我们将这个个数累加到 \\textit{ans} 中。 最后，我们返回 \\textit{ans} 即可。 时间复杂度 O(n)，其中 n 是字符串 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计满足 K 约束的子字符串数量 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.3%",
    "difficulty": "困难",
    "frontendId": "3261",
    "paidOnly": false,
    "seriesKeys": [
      "substring"
    ],
    "seriesPrimaryKey": "substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3200-3299/3261.Count%20Substrings%20That%20Satisfy%20K-Constraint%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Count Substrings That Satisfy K-Constraint II",
    "titleCn": "统计满足 K 约束的子字符串数量 II",
    "titleSlug": "count-substrings-that-satisfy-k-constraint-ii",
    "url": "https://leetcode.cn/problems/count-substrings-that-satisfy-k-constraint-ii/description/",
    "statementPreview": "给你一个 二进制 字符串 s 和一个整数 k。 另给你一个二维整数数组 queries，其中 queries[i] = [l_i, r_i]。 如果一个 二进制字符串 满足以下任一条件，则认为该字符串满足 k 约束： 字符串中 0 的数量最多为 k。 字符串中 1 的数量最多为 k。 返回一个整数数组 answer，其中 answer[i] 表示 s[l_i..r_i] 中满足 k 约束 的 子字符串 的数量。",
    "approachPreview": "我们用两个变量 \\textit{cnt0} 和 \\textit{cnt1} 分别记录当前窗口内的 0 和 1 的个数，指针 i 和 j 分别标识窗口的左右边界。用一个数组 d 记录每个位置 i 右边第一个不满足 k 约束的位置，初始时 d[i] = n。另外，用一个长度为 n + 1 的前缀和数组 \\textit{pre}[i] 记录以前 i 个位置作为右边界的满足 k 约束的子字符串的个数。 当我们右移窗口时，如果窗口内的 0 和 1 的个数都大于 k，我们将 d[i] 更新为 j，表示位置 i 右边第一个不满足 k 约束的位置。然后我们将 i 右移一位，直到窗口内的 0 和 1 的个数都不大于 k。此时，我们可以计算出以 j 为右边界的满足 k 约束的子字符串的个数，即 j - i + 1，我们更新到前缀和数组中。 最后，对于每个查询 [l, r]，我们首先找出 l 右边第一个不满足 k 约束的位置 p，那么 p = \\min(r + 1, d[l])，那么 [l, p - 1] 的所有子字符串都满足 k 约束，个数为 (1 + p - l) \\times (p - l) / 2，然后，我们计算以 [p, r] 为右边界的满足 k 约束的子字符串的个数，即 \\textit{pre}[r + 1] - \\textit{pre}[p]，最后将两者相加即可。 时间复杂度 O(n + m)，空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和子串窗口系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计满足 K 约束的子字符串数量 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子串窗口系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.6%",
    "difficulty": "简单",
    "frontendId": "20",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0020.Valid%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Valid Parentheses",
    "titleCn": "有效的括号",
    "titleSlug": "valid-parentheses",
    "url": "https://leetcode.cn/problems/valid-parentheses/description/",
    "statementPreview": "给定一个只包括 '('， ')'， '{'， '}'， '['， ']' 的字符串 s，判断字符串是否有效。 有效字符串需满足： 左括号必须用相同类型的右括号闭合。 左括号必须以正确的顺序闭合。 每个右括号都有一个对应的相同类型的左括号。",
    "approachPreview": "遍历括号字符串 s，遇到左括号时，压入当前的左括号；遇到右括号时，弹出栈顶元素（若栈为空，直接返回 false ），判断是否匹配，若不匹配，直接返回 false。 也可以选择遇到左括号时，将右括号压入栈中；遇到右括号时，弹出栈顶元素（若栈为空，直接返回 false ），判断是否是相等。若不匹配，直接返回 false。 两者的区别仅限于括号转换时机，一个是在入栈时，一个是在出栈时。 遍历结束，若栈为空，说明括号字符串有效，返回 true；否则，返回 false。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为括号字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有效的括号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "79.0%",
    "difficulty": "中等",
    "frontendId": "22",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0022.Generate%20Parentheses/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Generate Parentheses",
    "titleCn": "括号生成",
    "titleSlug": "generate-parentheses",
    "url": "https://leetcode.cn/problems/generate-parentheses/description/",
    "statementPreview": "数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。",
    "approachPreview": "括号生成 属于括号合法性系列中的一个变体。主要标签是 字符串、动态规划、回溯。先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 括号生成 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "42.1%",
    "difficulty": "困难",
    "frontendId": "32",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0032.Longest%20Valid%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Valid Parentheses",
    "titleCn": "最长有效括号",
    "titleSlug": "longest-valid-parentheses",
    "url": "https://leetcode.cn/problems/longest-valid-parentheses/description/",
    "statementPreview": "给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号 子串 的长度。 左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 \"(()())\"。",
    "approachPreview": "我们定义 f[i] 表示以 s[i-1] 结尾的最长有效括号的长度，那么答案就是 \\max\\limits_{i=1}^n f[i]。 如果 s[i-1] 是左括号，那么以 s[i-1] 结尾的最长有效括号的长度一定为 0，因此 f[i] = 0。 如果 s[i-1] 是右括号，有以下两种情况： 如果 s[i-2] 是左括号，那么以 s[i-1] 结尾的最长有效括号的长度为 f[i-2] + 2。 如果 s[i-2] 是右括号，那么以 s[i-1] 结尾的最长有效括号的长度为 f[i-1] + 2，但是还需要考虑 s[i-f[i-1]-2] 是否是左括号，如果是左括号，那么以 s[i-1] 结尾的最长有效括号的长度为 f[i-1] + 2 + f[i-f[i-1]-2]。 因此，我们可以得到状态转移方程： \\begin{cases} f[i] = 0, & \\textit{if } s[i-1] = '(',\\\\ f[i] = f[i-2] + 2, & \\textit{if } s[i-1] = ')' \\textit{ and } s[i-2] = '(',\\\\ f[i] = f[i-1] + 2 + f[i-f[i-1]-2], & \\textit{if } s[i-1] = ')' \\textit{ and } s[i-2] = ')' \\textit{ and } s[i-f[i-1]-2] = '(',\\\\ \\。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长有效括号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "75.4%",
    "difficulty": "中等",
    "frontendId": "241",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0241.Different%20Ways%20to%20Add%20Parentheses/README.md",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "memoization",
        "name": "记忆化"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Different Ways to Add Parentheses",
    "titleCn": "为运算表达式设计优先级",
    "titleSlug": "different-ways-to-add-parentheses",
    "url": "https://leetcode.cn/problems/different-ways-to-add-parentheses/description/",
    "statementPreview": "给你一个由数字和运算符组成的字符串 expression，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 10^4。",
    "approachPreview": "为运算表达式设计优先级 属于括号合法性系列中的一个变体。主要标签是 递归、记忆化、数学、字符串、动态规划。先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 为运算表达式设计优先级 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "56.2%",
    "difficulty": "困难",
    "frontendId": "301",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0301.Remove%20Invalid%20Parentheses/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Remove Invalid Parentheses",
    "titleCn": "删除无效的括号",
    "titleSlug": "remove-invalid-parentheses",
    "url": "https://leetcode.cn/problems/remove-invalid-parentheses/description/",
    "statementPreview": "给你一个由若干括号和字母组成的字符串 s，删除最小数量的无效括号，使得输入的字符串有效。 返回所有可能的结果。答案可以按 任意顺序 返回。",
    "approachPreview": "我们首先处理得到字符串 s 待删除的左、右括号的最小数量，分别记为 l 和 r。 然后我们设计一个递归函数 dfs(i, l, r, lcnt, rcnt, t)，其中： i 表示当前处理到字符串 s 的第 i 个字符； l 和 r 分别表示剩余待删除的左、右括号的数量； t 表示当前得到的字符串； lcnt 和 rcnt 分别表示当前得到的字符串中左、右括号的数量。 递归函数的逻辑如下： 如果 i 等于字符串 s 的长度，且 l 和 r 都等于 0，则将 t 加入答案数组中； 如果剩余的待处理字符数 n-i 小于剩余待删除的左右括号数量 l+r，或者当前得到的字符串中的左括号数量小于右括号数量，直接返回； 如果当前字符是左括号，我们可以选择删除或者保留，如果删除，需要满足 l \\gt 0，然后递归调用 dfs(i+1, l-1, r, lcnt, rcnt, t)； 如果当前字符是右括号，我们可以选择删除或者保留，如果删除，需要满足 r \\gt 0，然后递归调用 dfs(i+1, l, r-1, lcnt, rcnt, t)； 如果选择保留当前字符，我们需要判断当前字符是左括号、右括号还是字母。如果是左括号，我们需要更新 lcnt，如果是右括号，我们需要更新 rcnt，然后递归调用 dfs(i+1, l, r, lcnt, rcnt, t+s[i])。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除无效的括号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "40.5%",
    "difficulty": "中等",
    "frontendId": "678",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0678.Valid%20Parenthesis%20String/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Valid Parenthesis String",
    "titleCn": "有效的括号字符串",
    "titleSlug": "valid-parenthesis-string",
    "url": "https://leetcode.cn/problems/valid-parenthesis-string/description/",
    "statementPreview": "给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、 ')' 和 '*'。请你检验这个字符串是否为有效字符串，如果是 有效 字符串返回 true。 有效 字符串符合如下规则： 任何左括号 '(' 必须有相应的右括号 ')'。 任何右括号 ')' 必须有相应的左括号 '('。 左括号 '(' 必须在对应的右括号之前 ')'。 '*' 可以被视为单个右括号 ')'，或单个左括号 '('，或一个空字符串 \"\"。",
    "approachPreview": "定义 dp[i][j] 表示字符串 s 中下标范围 [i..j] 内的子串是否为有效括号字符串。答案为 dp[0][n - 1]。 子串长度为 1 时，如果字符 s[i] 为 *，则 dp[i][i] 为 true，否则为 false。 子串长度大于 1 时，如果满足下面任意一种情况，则 dp[i][j] 为 true： 子串 s[i..j] 的左边界为 ( 或 *，且右边界为 * 或 )，且 s[i+1..j-1] 为有效括号字符串； 子串 s[i..j] 中的任意下标 k，如果 s[i..k] 为有效括号字符串，且 s[k+1..j] 为有效括号字符串，则 s[i..j] 为有效括号字符串。 时间复杂度 O(n^3)，空间复杂度 O(n^2)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有效的括号字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "68.9%",
    "difficulty": "中等",
    "frontendId": "856",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0856.Score%20of%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Score of Parentheses",
    "titleCn": "括号的分数",
    "titleSlug": "score-of-parentheses",
    "url": "https://leetcode.cn/problems/score-of-parentheses/description/",
    "statementPreview": "给定一个平衡括号字符串 S，按下述规则计算该字符串的分数： () 得 1 分。 AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。 (A) 得 2 * A 分，其中 A 是平衡括号字符串。",
    "approachPreview": "我们通过观察发现， () 是唯一贡献分数的结构，外括号只是为该结构添加了一些乘数。所以我们只需要关心 ()。 我们用 d 维护当前括号的深度，对于每个 (，我们将深度加一，对于每个 )，我们将深度减一。当我们遇到 () 时，我们将 2^d 加到答案中。 我们举个实际的例子，以 (()(())) 为例，我们首先找到内部两个闭合括号 ()，然后将分数加上对应的 2^d。实际上，我们是在计算 (()) + ((())) 的分数。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 是字符串的长度。 括号相关类型题：",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 括号的分数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "73.3%",
    "difficulty": "中等",
    "frontendId": "921",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0921.Minimum%20Add%20to%20Make%20Parentheses%20Valid/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Minimum Add to Make Parentheses Valid",
    "titleCn": "使括号有效的最少添加",
    "titleSlug": "minimum-add-to-make-parentheses-valid",
    "url": "https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/",
    "statementPreview": "只有满足下面几点之一，括号字符串才是有效的： 它是一个空字符串，或者 它可以被写成 AB （ A 与 B 连接）, 其中 A 和 B 都是有效字符串，或者 它可以被写作 (A)，其中 A 是有效字符串。 给定一个括号字符串 s，在每一次操作中，你都可以在字符串的任何位置插入一个括号 例如，如果 s = \"()))\"，你可以插入一个开始括号为 \"(()))\" 或结束括号为 \"())))\"。 返回 为使结果字符串 s 有效而必须添加的最少括号数。",
    "approachPreview": "这个问题属于经典的括号匹配问题，可以使用“贪心 + 栈”来解决。 遍历字符串 s 的每个字符 c： 若 c 为左括号，直接将 c 入栈； 若 c 为右括号，此时如果栈不为空，且栈顶元素为左括号，则将栈顶元素出栈，表示匹配成功；否则将 c 入栈。 遍历结束后，栈中剩余的元素个数即为需要添加的括号数。 时间复杂度为 O(n)，空间复杂度 O(n)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 使括号有效的最少添加 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "81.6%",
    "difficulty": "简单",
    "frontendId": "1021",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1021.Remove%20Outermost%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Remove Outermost Parentheses",
    "titleCn": "删除最外层的括号",
    "titleSlug": "remove-outermost-parentheses",
    "url": "https://leetcode.cn/problems/remove-outermost-parentheses/description/",
    "statementPreview": "有效括号字符串为空 \"\"、 \"(\" + A + \")\" 或 A + B，其中 A 和 B 都是有效的括号字符串， + 代表字符串的连接。 例如， \"\"， \"()\"， \"(())()\" 和 \"(()(()))\" 都是有效的括号字符串。 如果有效字符串 s 非空，且不存在将其拆分为 s = A + B 的方法，我们称其为 原语（primitive），其中 A 和 B 都是非空有效括号字符串。 给出一个非空有效字符串 s，考虑将其进行原语化分解，使得： s = P_1 + P_2 + ... + P_k，其中 P_i 是有效括号字符串原语。 对 s 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 s。",
    "approachPreview": "遍历字符串，遇到左括号 '(' 计数器加一，此时计数器不为 1 时，说明当前括号不是最外层括号，将其加入结果字符串。遇到右括号 ')' 计数器减一，此时计数器不为 0 时，说明当前括号不是最外层括号，将其加入结果字符串。 时间复杂度 O(n)，其中 n 为字符串长度。忽略答案字符串的空间开销，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除最外层的括号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "77.0%",
    "difficulty": "中等",
    "frontendId": "1111",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1111.Maximum%20Nesting%20Depth%20of%20Two%20Valid%20Parentheses%20Strings/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Maximum Nesting Depth of Two Valid Parentheses Strings",
    "titleCn": "有效括号的嵌套深度",
    "titleSlug": "maximum-nesting-depth-of-two-valid-parentheses-strings",
    "url": "https://leetcode.cn/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/description/",
    "statementPreview": "如果一个字符串仅由字符 \"(\" 和 \")\" 组成，并且满足以下条件，则称为有效括号字符串（VPS）： 它是空字符串，或 它可以表示为 AB （ A 连接 B ），其中 A 和 B 都是VPS，或者 它可以表示为 (A)，其中 A 是一个 VPS。 我们可以类似地定义任何 VPS S 的嵌套深度 depth(S) 如下： depth(\"\") = 0 depth(A + B) = max(depth(A), depth(B))，其中 A 和 B 都是 VPS depth(\"(\" + A + \")\") = 1 + depth(A)，其中 A 是一个 VPS。 例如， \"\"， \"()()\" 和 \"()(()())\" 都是 VPS（嵌套深度 0，1 和 2），并且 \")(\" 和 \"(()\" 不是 VPS。 给定一个 VPS 序列，将其拆分成两个不相交的子序列 A 和 B，使得 A 和 B 都是 VPS（且 A.length + B.length = seq.length ）。这些子序列不一定是连续的。 例如，对于序列 123456789，一种可能的拆分是： A = {1, 3, 5, 7, 9}， B = {2, 4, 6, 8}。",
    "approachPreview": "我们用一个变量 x 维护当前括号的平衡度，也就是左括号的数量减去右括号的数量。 遍历字符串 seq，更新 x 的值。如果 x 为奇数，我们将当前的左括号分给 A，否则分给 B。 时间复杂度 O(n)，其中 n 是字符串 seq 的长度。忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有效括号的嵌套深度 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "65.9%",
    "difficulty": "中等",
    "frontendId": "1190",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1190.Reverse%20Substrings%20Between%20Each%20Pair%20of%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse Substrings Between Each Pair of Parentheses",
    "titleCn": "反转每对括号间的子串",
    "titleSlug": "reverse-substrings-between-each-pair-of-parentheses",
    "url": "https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/description/",
    "statementPreview": "给出一个字符串 s （仅含有小写英文字母和括号）。 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。 注意，您的结果中 不应 包含任何括号。",
    "approachPreview": "反转每对括号间的子串 属于括号合法性系列中的一个变体。主要标签是 栈、字符串。先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转每对括号间的子串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "61.5%",
    "difficulty": "中等",
    "frontendId": "1249",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1249.Minimum%20Remove%20to%20Make%20Valid%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Minimum Remove to Make Valid Parentheses",
    "titleCn": "移除无效的括号",
    "titleSlug": "minimum-remove-to-make-valid-parentheses",
    "url": "https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/description/",
    "statementPreview": "给你一个由 '('、 ')' 和小写字母组成的字符串 s。 你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。 请返回任意一个合法字符串。 有效「括号字符串」应当符合以下 任意一条 要求： 空字符串或只包含小写字母的字符串 可以被写作 AB （ A 连接 B ）的字符串，其中 A 和 B 都是有效「括号字符串」 可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」",
    "approachPreview": "我们先从左向右扫描，将多余的右括号删除，再从右向左扫描，将多余的左括号删除。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是字符串 s 的长度。 相似题目：",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 移除无效的括号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "49.9%",
    "difficulty": "中等",
    "frontendId": "1541",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1541.Minimum%20Insertions%20to%20Balance%20a%20Parentheses%20String/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Minimum Insertions to Balance a Parentheses String",
    "titleCn": "平衡括号字符串的最少插入次数",
    "titleSlug": "minimum-insertions-to-balance-a-parentheses-string",
    "url": "https://leetcode.cn/problems/minimum-insertions-to-balance-a-parentheses-string/description/",
    "statementPreview": "给你一个括号字符串 s，它只包含字符 '(' 和 ')'。一个括号字符串被称为平衡的当它满足： 任何左括号 '(' 必须对应两个连续的右括号 '))'。 左括号 '(' 必须在对应的连续两个右括号 '))' 之前。 比方说 \"())\"， \"())(())))\" 和 \"(())())))\" 都是平衡的， \")()\"， \"()))\" 和 \"(()))\" 都是不平衡的。 你可以在任意位置插入字符 '(' 和 ')' 使字符串平衡。 请你返回让 s 平衡的最少插入次数。",
    "approachPreview": "我们用 x 表示字符串中待匹配的左括号的数量，初始时为 0。遍历字符串 s： 如果遇到左括号，则 x 的值加 1；如果遇到右括号，我们分情况讨论： 如果有两个连续的右括号，那么我们先让指针往后移动一位；否则，我们需要插入一个右括号，使得出现两个连续的右括号，因此插入次数加 1； 如果 x = 0，说明当前没有待匹配的左括号，我们需要插入一个左括号，用于匹配上面准备好的两个连续的右括号，因此插入次数加 1；否则，我们让 x 的值减 1。 然后指针往后移动一位，继续下一次遍历。 遍历结束后，如果 x = 0，说明字符串已经平衡，返回插入次数；否则，说明字符串中有待匹配的左括号，我们需要再插入 2 \\times x 个右括号，使得字符串变成平衡字符串，返回插入次数。 时间复杂度 O(n)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 平衡括号字符串的最少插入次数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "81.4%",
    "difficulty": "简单",
    "frontendId": "1614",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1614.Maximum%20Nesting%20Depth%20of%20the%20Parentheses/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Maximum Nesting Depth of the Parentheses",
    "titleCn": "括号的最大嵌套深度",
    "titleSlug": "maximum-nesting-depth-of-the-parentheses",
    "url": "https://leetcode.cn/problems/maximum-nesting-depth-of-the-parentheses/description/",
    "statementPreview": "给定 有效括号字符串 s，返回 s 的 嵌套深度。嵌套深度是嵌套括号的 最大 数量。",
    "approachPreview": "我们用一个变量 d 记录当前的深度，初始时 d = 0。 遍历字符串 s，当遇到左括号时，深度 d 加一，同时更新答案为当前深度 d 和答案的最大值。当遇到右括号时，深度 d 减一。 最后返回答案即可。 时间复杂度 O(n)，其中 n 是字符串 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 括号的最大嵌套深度 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "45.3%",
    "difficulty": "中等",
    "frontendId": "2116",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2100-2199/2116.Check%20if%20a%20Parentheses%20String%20Can%20Be%20Valid/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Check if a Parentheses String Can Be Valid",
    "titleCn": "判断一个括号字符串是否有效",
    "titleSlug": "check-if-a-parentheses-string-can-be-valid",
    "url": "https://leetcode.cn/problems/check-if-a-parentheses-string-can-be-valid/description/",
    "statementPreview": "一个括号字符串是只由 '(' 和 ')' 组成的 非空 字符串。如果一个字符串满足下面 任意 一个条件，那么它就是有效的： 字符串为 () . 它可以表示为 AB （ A 与 B 连接），其中 A 和 B 都是有效括号字符串。 它可以表示为 (A)，其中 A 是一个有效括号字符串。 给你一个括号字符串 s 和一个字符串 locked，两者长度都为 n。 locked 是一个二进制字符串，只包含 '0' 和 '1'。对于 locked 中 每一个 下标 i： 如果 locked[i] 是 '1'，你 不能 改变 s[i]。 如果 locked[i] 是 '0'，你 可以 将 s[i] 变为 '(' 或者 ')'。 如果你可以将 s 变为有效括号字符串，请你返回 true，否则返回 false。",
    "approachPreview": "我们观察发现，奇数长度的字符串一定不是有效的括号字符串，因为无论怎么匹配，都会剩下一个括号。因此，如果字符串 s 的长度是奇数，提前返回 \\textit{false}。 接下来，我们进行两次遍历。 第一次从左到右，判断所有的 '(' 括号是否可以被 ')' 或者可变括号匹配，如果不可以，直接返回 \\textit{false}。 第二次从右到左，判断所有的 ')' 括号是否可以被 '(' 或者可变括号匹配，如果不可以，直接返回 \\textit{false}。 遍历结束，说明所有的括号都可以被匹配，字符串 s 是有效的括号字符串，返回 \\textit{true}。 时间复杂度 O(n)，其中 n 为字符串 s 的长度。空间复杂度 O(1)。 相似题目：",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 判断一个括号字符串是否有效 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "62.5%",
    "difficulty": "中等",
    "frontendId": "2232",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2232.Minimize%20Result%20by%20Adding%20Parentheses%20to%20Expression/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "title": "Minimize Result by Adding Parentheses to Expression",
    "titleCn": "向表达式添加括号后的最小结果",
    "titleSlug": "minimize-result-by-adding-parentheses-to-expression",
    "url": "https://leetcode.cn/problems/minimize-result-by-adding-parentheses-to-expression/description/",
    "statementPreview": "给你一个下标从 0 开始的字符串 expression，格式为 \"<num1>+<num2>\"，其中 <num1> 和 <num2> 表示正整数。 请你向 expression 中添加一对括号，使得在添加之后， expression 仍然是一个有效的数学表达式，并且计算后可以得到 最小 可能值。左括号 必须 添加在 '+' 的左侧，而右括号必须添加在 '+' 的右侧。 返回添加一对括号后形成的表达式 expression，且满足 expression 计算得到 最小 可能值。 如果存在多个答案都能产生相同结果，返回任意一个答案。 生成的输入满足： expression 的原始值和添加满足要求的任一对括号之后 expression 的值，都符合 32-bit 带符号整数范围。",
    "approachPreview": "加号左右两边各枚举一个括号边界。括号内计算加法，括号左侧和右侧若存在则作为乘数；遍历所有边界组合，取表达式值最小的字符串即可。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 向表达式添加括号后的最小结果 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "42.8%",
    "difficulty": "困难",
    "frontendId": "2267",
    "paidOnly": false,
    "seriesKeys": [
      "parentheses"
    ],
    "seriesPrimaryKey": "parentheses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2267.Check%20if%20There%20Is%20a%20Valid%20Parentheses%20String%20Path/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Check if There Is a Valid Parentheses String Path",
    "titleCn": "检查是否有合法括号字符串路径",
    "titleSlug": "check-if-there-is-a-valid-parentheses-string-path",
    "url": "https://leetcode.cn/problems/check-if-there-is-a-valid-parentheses-string-path/description/",
    "statementPreview": "一个括号字符串是一个 非空 且只包含 '(' 和 ')' 的字符串。如果下面 任意 条件为 真，那么这个括号字符串就是 合法的。 字符串是 ()。 字符串可以表示为 AB （ A 连接 B ）， A 和 B 都是合法括号序列。 字符串可以表示为 (A)，其中 A 是合法括号序列。 给你一个 m x n 的括号网格图矩阵 grid。网格图中一个 合法括号路径 是满足以下所有条件的一条路径： 路径开始于左上角格子 (0, 0)。 路径结束于右下角格子 (m - 1, n - 1)。 路径每次只会向 下 或者向 右 移动。 路径经过的格子组成的括号字符串是 合法 的。 如果网格图中存在一条 合法括号路径，请返回 true，否则返回 false。",
    "approachPreview": "我们记矩阵的行数为 m，列数为 n。 如果 m + n - 1 为奇数，或者左上角和右下角的括号不匹配，那么一定不存在合法路径，直接返回 \\text{false}。 否则，我们设计一个函数 \\textit{dfs}(i, j, k)，表示从 (i, j) 出发，且当前括号的平衡度为 k，是否存在合法路径。其中，平衡度 k 的定义为：从 (0, 0) 到 (i, j) 的路径中，左括号的个数减去右括号的个数。 如果平衡度 k 小于 0 或者大于 m + n - i - j，那么一定不存在合法路径，直接返回 \\text{false}。如果 (i, j) 正好是右下角的格子，那么只有当 k = 0 时才存在合法路径。否则，我们枚举 (i, j) 的下一个格子 (x, y)，如果 (x, y) 是合法的格子且 \\textit{dfs}(x, y, k) 为 \\text{true}，那么就存在合法路径。 时间复杂度 O(m \\times n \\times (m + n))，空间复杂度 O(m \\times n \\times (m + n))。其中 m 和 n 分别是矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和括号合法性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 检查是否有合法括号字符串路径 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "括号题的核心不变量是什么？",
        "answer": "从左到右扫描时，尚未匹配的左括号数量不能被非法消费；如果题目允许删除、插入、星号或锁定位，就要维护可能的余额范围或最优修复代价。"
      }
    ]
  },
  {
    "acRate": "64.0%",
    "difficulty": "中等",
    "frontendId": "200",
    "paidOnly": false,
    "seriesKeys": [
      "islands",
      "number-of-islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0200.Number%20of%20Islands/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Number of Islands",
    "titleCn": "岛屿数量",
    "titleSlug": "number-of-islands",
    "url": "https://leetcode.cn/problems/number-of-islands/description/",
    "statementPreview": "给你一个由 '1' （陆地）和 '0' （水）组成的的二维网格，请你计算网格中岛屿的数量。 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。 此外，你可以假设该网格的四条边均被水包围。",
    "approachPreview": "我们可以使用深度优先搜索（DFS）来遍历每个岛屿。遍历网格中的每个单元格 (i, j)，如果该单元格的值为 '1'，则说明我们找到了一个新的岛屿。我们可以从该单元格开始进行 DFS，将与之相连的所有陆地单元格的值都标记为 '0'，以避免重复计数。每次找到一个新的岛屿时，我们将岛屿数量加 1。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为网格的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 岛屿数量 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "42.3%",
    "difficulty": "困难",
    "frontendId": "305",
    "paidOnly": true,
    "seriesKeys": [
      "islands",
      "number-of-islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0305.Number%20of%20Islands%20II/README.md",
    "tags": [
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Number of Islands II",
    "titleCn": "岛屿数量 II",
    "titleSlug": "number-of-islands-ii",
    "url": "https://leetcode.cn/problems/number-of-islands-ii/description/",
    "statementPreview": "给你一个大小为 m x n 的二维二进制网格 grid。网格表示一个地图，其中， 0 表示水， 1 表示陆地。最初， grid 中的所有单元格都是水单元格（即，所有单元格都是 0 ）。 可以通过执行 addLand 操作，将某个位置的水转换成陆地。给你一个数组 positions，其中 positions[i] = [r_i, c_i] 是要执行第 i 次操作的位置 (r_i, c_i)。 返回一个整数数组 answer，其中 answer[i] 是将单元格 (r_i, c_i) 转换为陆地后，地图中岛屿的数量。 岛屿 的定义是被「水」包围的「陆地」，通过水平方向或者垂直方向上相邻的陆地连接而成。你可以假设地图网格的四边均被无边无际的「水」所包围。",
    "approachPreview": "我们用一个二维数组 grid 来表示一个地图，其中 0 和 1 分别表示水和陆地。初始时 grid 中的所有单元格都是水单元格（即所有单元格都是 0），用一个变量 cnt 来记录岛屿的数量。而岛屿之间的连通关系可以用一个并查集 uf 来维护。 接下来，我们遍历数组 positions 中的每个位置 (i, j)，如果 grid[i][j] 为 1，说明该位置已经是陆地，我们直接将 cnt 添加到答案中；否则，我们将 grid[i][j] 的值改为 1，并且将 cnt 的值增加 1。然后，我们遍历该位置的上下左右四个方向，如果某个方向的位置为 1，并且该位置与 (i, j) 不属于同一个连通分量，那么我们就将该位置与 (i, j) 进行合并，同时将 cnt 的值减少 1。遍历完该位置的上下左右四个方向之后，我们将 cnt 添加到答案中。 时间复杂度 O(k \\times \\alpha(m \\times n)) 或 O(k \\times \\log(m \\times n))，其中 k 是 positions 的长度，而 \\alpha 是阿克曼函数的反函数，本题中 \\alpha(m \\times n) 可以认为是一个很小的常数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 岛屿数量 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "71.1%",
    "difficulty": "简单",
    "frontendId": "463",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0463.Island%20Perimeter/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Island Perimeter",
    "titleCn": "岛屿的周长",
    "titleSlug": "island-perimeter",
    "url": "https://leetcode.cn/problems/island-perimeter/description/",
    "statementPreview": "给定一个 row x col 的二维网格地图 grid，其中： grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100。计算这个岛屿的周长。",
    "approachPreview": "每个陆地格子先贡献 4 条边，再检查上方和左方是否也是陆地；每发现一条共享边，就从总周长中减去 2。这样每条相邻边只统计一次。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 岛屿的周长 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "58.7%",
    "difficulty": "中等",
    "frontendId": "694",
    "paidOnly": true,
    "seriesKeys": [
      "islands",
      "number-of-distinct-islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0694.Number%20of%20Distinct%20Islands/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "hash-function",
        "name": "哈希函数"
      }
    ],
    "title": "Number of Distinct Islands",
    "titleCn": "不同岛屿的数量",
    "titleSlug": "number-of-distinct-islands",
    "url": "https://leetcode.cn/problems/number-of-distinct-islands/description/",
    "statementPreview": "给定一个非空 01 二维数组表示的网格，一个岛屿由四连通（上、下、左、右四个方向）的 1 组成，你可以认为网格的四周被海水包围。 请你计算这个网格中共有多少个形状不同的岛屿。两个岛屿被认为是相同的，当且仅当一个岛屿可以通过平移变换（不可以旋转、翻转）和另一个岛屿重合。",
    "approachPreview": "我们遍历网格中的每个位置 (i, j)，如果该位置为 1，则以其为起始节点开始进行深度优先搜索，过程中将 1 修改为 0，并且将搜索的方向记录下来，等搜索结束后将方向序列加入哈希表中，最后返回哈希表中不同方向序列的数量即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为网格的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同岛屿的数量 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "68.8%",
    "difficulty": "中等",
    "frontendId": "695",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0695.Max%20Area%20of%20Island/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Max Area of Island",
    "titleCn": "岛屿的最大面积",
    "titleSlug": "max-area-of-island",
    "url": "https://leetcode.cn/problems/max-area-of-island/description/",
    "statementPreview": "给你一个大小为 m x n 的二进制矩阵 grid。 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0 （代表水）包围着。 岛屿的面积是岛上值为 1 的单元格的数目。 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0。",
    "approachPreview": "我们可以遍历每一个格子 (i, j)，从每个格子开始进行深度优先搜索，如果搜索到的格子是陆地，就将当前格子标记为已访问，并且继续搜索上、下、左、右四个方向的格子。搜索结束后，计算标记的陆地的数量，即为岛屿的面积。我们找出最大的岛屿面积即为答案。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是二维数组的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 岛屿的最大面积 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "50.6%",
    "difficulty": "困难",
    "frontendId": "711",
    "paidOnly": true,
    "seriesKeys": [
      "islands",
      "number-of-distinct-islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0711.Number%20of%20Distinct%20Islands%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "hash-function",
        "name": "哈希函数"
      }
    ],
    "title": "Number of Distinct Islands II",
    "titleCn": "不同岛屿的数量 II",
    "titleSlug": "number-of-distinct-islands-ii",
    "url": "https://leetcode.cn/problems/number-of-distinct-islands-ii/description/",
    "statementPreview": "给定一个 m x n 二进制数组表示的网格 grid，一个岛屿由 四连通 （上、下、左、右四个方向）的 1 组成（代表陆地）。你可以认为网格的四周被海水包围。 如果两个岛屿的形状相同，或者通过旋转（顺时针旋转 90°，180°，270°）、翻转（左右翻转、上下翻转）后形状相同，那么就认为这两个岛屿是相同的。 返回 这个网格中形状 不同 的岛屿的数量。",
    "approachPreview": "先 DFS 取出每个岛屿的相对坐标，再生成旋转和翻转后的 8 种形态。每种形态平移到左上角并排序序列化，选择字典序最小的序列作为规范形状，用集合去重。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同岛屿的数量 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "48.6%",
    "difficulty": "困难",
    "frontendId": "827",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0827.Making%20A%20Large%20Island/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Making A Large Island",
    "titleCn": "最大人工岛",
    "titleSlug": "making-a-large-island",
    "url": "https://leetcode.cn/problems/making-a-large-island/description/",
    "statementPreview": "给你一个大小为 n x n 二进制矩阵 grid。 最多 只能将一格 0 变成 1。 返回执行此操作后， grid 中最大的岛屿面积是多少？ 岛屿 由一组上、下、左、右四个方向相连的 1 形成。",
    "approachPreview": "我们可以给每个连通块一个唯一的标识，用数组 p 记录每个位置所属的连通块，即 p[i][j] 表示 (i, j) 所属的连通块编号。用数组 cnt 记录每个连通块的大小，即 cnt[root] 表示连通块 root 的大小。 首先，我们遍历整个矩阵，对于每个 grid[i][j] = 1 且 p[i][j] = 0 的位置，我们对其进行深度优先搜索，将其所属的连通块标记为 root，并统计连通块的大小。 接着，我们遍历整个矩阵，对于每个 grid[i][j] = 0 的位置，我们找到其上、下、左、右四个位置所属的连通块，将这些连通块的大小相加，再加上当前位置的 1，即可得到将当前位置变为 1 后的最大岛屿面积。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 为矩阵的边长。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大人工岛 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "62.3%",
    "difficulty": "中等",
    "frontendId": "1020",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1020.Number%20of%20Enclaves/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Number of Enclaves",
    "titleCn": "飞地的数量",
    "titleSlug": "number-of-enclaves",
    "url": "https://leetcode.cn/problems/number-of-enclaves/description/",
    "statementPreview": "给你一个大小为 m x n 的二进制矩阵 grid，其中 0 表示一个海洋单元格、 1 表示一个陆地单元格。 一次 移动 是指从一个陆地单元格走到另一个相邻（ 上、下、左、右 ）的陆地单元格或跨过 grid 的边界。 返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。",
    "approachPreview": "我们可以从边界上的陆地开始进行深度优先搜索，将所有与边界相连的陆地都标记为 0。最后，统计剩余的 1 的个数，即为答案。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 飞地的数量 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "64.8%",
    "difficulty": "中等",
    "frontendId": "1254",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1254.Number%20of%20Closed%20Islands/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Number of Closed Islands",
    "titleCn": "统计封闭岛屿的数目",
    "titleSlug": "number-of-closed-islands",
    "url": "https://leetcode.cn/problems/number-of-closed-islands/description/",
    "statementPreview": "二维矩阵 grid 由 0 （土地）和 1 （水）组成。岛是由最大的4个方向连通的 0 组成的群，封闭岛是一个 完全 由1包围（左、上、右、下）的岛。 请返回 封闭岛屿 的数目。",
    "approachPreview": "遍历矩阵，对于每个陆地，我们进行深度优先搜索，找到与其相连的所有陆地，然后判断是否存在边界上的陆地，如果存在，则不是封闭岛屿，否则是封闭岛屿，答案加一。 最后返回答案即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计封闭岛屿的数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "45.5%",
    "difficulty": "困难",
    "frontendId": "1568",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1568.Minimum%20Number%20of%20Days%20to%20Disconnect%20Island/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "strongly-connected-component",
        "name": "强连通分量"
      }
    ],
    "title": "Minimum Number of Days to Disconnect Island",
    "titleCn": "使陆地分离的最少天数",
    "titleSlug": "minimum-number-of-days-to-disconnect-island",
    "url": "https://leetcode.cn/problems/minimum-number-of-days-to-disconnect-island/description/",
    "statementPreview": "给你一个大小为 m x n，由若干 0 和 1 组成的二维网格 grid，其中 1 表示陆地， 0 表示水。 岛屿 由水平方向或竖直方向上相邻的 1 （陆地）连接形成。 如果 恰好只有一座岛屿，则认为陆地是 连通的；否则，陆地就是 分离的。 一天内，可以将 任何单个 陆地单元（ 1 ）更改为水单元（ 0 ）。 返回使陆地分离的最少天数。",
    "approachPreview": "观察发现，我们总是可以通过把角落相邻的两个陆地变成水，使得岛屿分离。因此，答案只可能是 0，1 或 2。 我们跑一遍 DFS，统计当前岛屿的数量，如果数量不等于 1，也就是说不满足恰好只有一座岛屿，那么答案就是 0。 否则，我们遍历每一块陆地，把它变成水，然后再跑一遍 DFS，看看岛屿的数量是否不等于 1，如果不等于 1，说明这块陆地变成水后，岛屿分离了，答案就是 1。 遍历结束，说明必须要把两块陆地变成水，才能使得岛屿分离，因此答案就是 2。 时间复杂度 O(m^2\\times n^2)，其中 m 和 n 分别是 grid 的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 使陆地分离的最少天数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "69.0%",
    "difficulty": "中等",
    "frontendId": "1905",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1905.Count%20Sub%20Islands/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Count Sub Islands",
    "titleCn": "统计子岛屿",
    "titleSlug": "count-sub-islands",
    "url": "https://leetcode.cn/problems/count-sub-islands/description/",
    "statementPreview": "给你两个 m x n 的二进制矩阵 grid1 和 grid2，它们只包含 0 （表示水域）和 1 （表示陆地）。一个 岛屿 是由 四个方向 （水平或者竖直）上相邻的 1 组成的区域。任何矩阵以外的区域都视为水域。 如果 grid2 的一个岛屿，被 grid1 的一个岛屿 完全 包含，也就是说 grid2 中该岛屿的每一个格子都被 grid1 中同一个岛屿完全包含，那么我们称 grid2 中的这个岛屿为 子岛屿。 请你返回 grid2 中 子岛屿 的 数目。",
    "approachPreview": "我们可以遍历矩阵 grid2 中的每一个格子 (i, j)，如果该格子为 1，则从该格子开始进行深度优先搜索，将与该格子相连的所有格子的值都置为 0，并记录与该格子相连的所有格子中， grid1 中对应格子的值是否为 1，如果为 1，则说明该格子在 grid1 中也是一个岛屿，否则不是。最后统计 grid2 中子岛屿的数量即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是矩阵 grid1 和 grid2 的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计子岛屿 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "57.3%",
    "difficulty": "中等",
    "frontendId": "3619",
    "paidOnly": false,
    "seriesKeys": [
      "islands"
    ],
    "seriesPrimaryKey": "islands",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3619.Count%20Islands%20With%20Total%20Value%20Divisible%20by%20K/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Count Islands With Total Value Divisible by K",
    "titleCn": "总价值可以被 K 整除的岛屿数目",
    "titleSlug": "count-islands-with-total-value-divisible-by-k",
    "url": "https://leetcode.cn/problems/count-islands-with-total-value-divisible-by-k/description/",
    "statementPreview": "给你一个 m x n 的矩阵 grid 和一个正整数 k。一个 岛屿 是由 正 整数（表示陆地）组成的，并且陆地间 四周 连通（水平或垂直）。 一个岛屿的总价值是该岛屿中所有单元格的值之和。 返回总价值可以被 k 整除 的岛屿数量。",
    "approachPreview": "我们定义一个函数 \\textit{dfs}(i, j)，它从位置 (i, j) 开始进行 DFS 遍历，并且返回该岛屿的总价值。我们将当前位置的值加入总价值，然后将该位置标记为已访问（例如，将其值设为 0）。接着，我们递归地访问四个方向（上、下、左、右）的相邻位置，如果相邻位置的值大于 0，则继续进行 DFS，并将其值加入总价值。最后，我们返回总价值。 在主函数中，我们遍历整个网格，对于每个未访问的位置 (i, j)，如果其值大于 0，则调用 \\textit{dfs}(i, j) 来计算该岛屿的总价值。如果总价值可以被 k 整除，则将答案加一。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是网格的行数和列数。",
    "followUps": [
      {
        "question": "这题和岛屿网格系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 总价值可以被 K 整除的岛屿数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么岛屿题通常要原地标记或维护 visited？",
        "answer": "同一个陆地格子只能属于一个连通块。访问后立即标记，才能保证面积、数量或形状统计不会重复计算，也能让边界外扩逻辑保持清晰。"
      }
    ]
  },
  {
    "acRate": "79.7%",
    "difficulty": "简单",
    "frontendId": "303",
    "paidOnly": false,
    "seriesKeys": [
      "range-sum-query"
    ],
    "seriesPrimaryKey": "range-sum-query",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0303.Range%20Sum%20Query%20-%20Immutable/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Range Sum Query - Immutable",
    "titleCn": "区域和检索 - 数组不可变",
    "titleSlug": "range-sum-query-immutable",
    "url": "https://leetcode.cn/problems/range-sum-query-immutable/description/",
    "statementPreview": "给定一个整数数组 nums，处理以下类型的多个查询: 计算索引 left 和 right （包含 left 和 right ）之间的 nums 元素的 和，其中 left <= right 实现 NumArray 类： NumArray(int[] nums) 使用数组 nums 初始化对象 int sumRange(int left, int right) 返回数组 nums 中索引 left 和 right 之间的元素的 总和，包含 left 和 right 两点（也就是 nums[left] + nums[left + 1] + ... + nums[right] )",
    "approachPreview": "我们创建一个长度为 n + 1 的前缀和数组 s，其中 s[i] 表示前 i 个元素的前缀和，即 s[i] = \\sum_{j=0}^{i-1} nums[j]，那么索引 [left, right] 之间的元素的和就可以表示为 s[right + 1] - s[left]。 初始化前缀和数组 s 的时间复杂度为 O(n)，查询的时间复杂度为 O(1)。空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和区域和检索系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区域和检索 - 数组不可变 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么静态查询和动态修改要用不同结构？",
        "answer": "静态查询可以一次预处理前缀和后 O(1) 回答；有修改时前缀和会整体失效，需要树状数组或线段树把单点更新和区间求和都控制在对数复杂度。"
      }
    ]
  },
  {
    "acRate": "63.8%",
    "difficulty": "中等",
    "frontendId": "304",
    "paidOnly": false,
    "seriesKeys": [
      "range-sum-query"
    ],
    "seriesPrimaryKey": "range-sum-query",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0304.Range%20Sum%20Query%202D%20-%20Immutable/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Range Sum Query 2D - Immutable",
    "titleCn": "二维区域和检索 - 矩阵不可变",
    "titleSlug": "range-sum-query-2d-immutable",
    "url": "https://leetcode.cn/problems/range-sum-query-2d-immutable/description/",
    "statementPreview": "给定一个二维矩阵 matrix， 以下类型的多个请求： 计算其子矩形范围内元素的总和，该子矩阵的 左上角 为 (row1, col1)， 右下角 为 (row2, col2)。 实现 NumMatrix 类： NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化 int sumRegion(int row1, int col1, int row2, int col2) 返回 左上角 (row1, col1)、 右下角 (row2, col2) 所描述的子矩阵的元素 总和。",
    "approachPreview": "我们用 s[i + 1][j + 1] 表示第 i 行第 j 列左上部分所有元素之和，下标 i 和 j 均从 0 开始。可以得到以下前缀和公式： s[i + 1][j + 1] = s[i + 1][j] + s[i][j + 1] - s[i][j] + nums[i][j] 那么分别以 (x_1, y_1) 和 (x_2, y_2) 为左上角和右下角的矩形的元素之和为： s[x_2 + 1][y_2 + 1] - s[x_2 + 1][y_1] - s[x_1][y_2 + 1] + s[x_1][y_1] 我们在初始化方法中预处理出前缀和数组 s，在查询方法中直接返回上述公式的结果即可。 初始化的时间复杂度为 O(m \\times n)，查询的时间复杂度为 O(1)。空间复杂度为 O(m \\times n)。",
    "followUps": [
      {
        "question": "这题和区域和检索系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二维区域和检索 - 矩阵不可变 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么静态查询和动态修改要用不同结构？",
        "answer": "静态查询可以一次预处理前缀和后 O(1) 回答；有修改时前缀和会整体失效，需要树状数组或线段树把单点更新和区间求和都控制在对数复杂度。"
      }
    ]
  },
  {
    "acRate": "54.3%",
    "difficulty": "中等",
    "frontendId": "307",
    "paidOnly": false,
    "seriesKeys": [
      "range-sum-query"
    ],
    "seriesPrimaryKey": "range-sum-query",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0307.Range%20Sum%20Query%20-%20Mutable/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-indexed-tree",
        "name": "树状数组"
      },
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      }
    ],
    "title": "Range Sum Query - Mutable",
    "titleCn": "区域和检索 - 数组可修改",
    "titleSlug": "range-sum-query-mutable",
    "url": "https://leetcode.cn/problems/range-sum-query-mutable/description/",
    "statementPreview": "给你一个数组 nums，请你完成两类查询。 其中一类查询要求 更新 数组 nums 下标对应的值 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和，其中 left <= right 实现 NumArray 类： NumArray(int[] nums) 用整数数组 nums 初始化对象 void update(int index, int val) 将 nums[index] 的值 更新 为 val int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 （即， nums[left] + nums[left + 1], ..., nums[right] ）",
    "approachPreview": "树状数组，也称作“二叉索引树”（Binary Indexed Tree）或 Fenwick 树。 它可以高效地实现如下两个操作： 1. **单点更新** update(x, delta)： 把序列 x 位置的数加上一个值 delta； 1. **前缀和查询** query(x)：查询序列 [1,...x] 区间的区间和，即位置 x 的前缀和。 这两个操作的时间复杂度均为 O(\\log n)。 树状数组最基本的功能就是求比某点 x 小的点的个数（这里的比较是抽象的概念，可以是数的大小、坐标的大小、质量的大小等等）。 对于本题，我们在构造函数中，先创建一个树状数组，然后遍历数组中每个元素的下标 i（从 1 开始）和对应的值 v，调用 update(i, v)，即可完成树状数组的初始化。时间复杂度为 O(n \\log n)。 对于 sumRange(left, right)，我们可以通过 query(right + 1) - query(left) 得到区间和。时间复杂度为 O(\\log n)。 对于 update(index, val)，我们可以先通过 sumRange(index, index) 得到原来的值 prev，然后调用 update(index, val - prev)，即可完成更新。时间复杂度为 O(\\log n)。 空间复杂度为 O(n)。",
    "followUps": [
      {
        "question": "这题和区域和检索系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区域和检索 - 数组可修改 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么静态查询和动态修改要用不同结构？",
        "answer": "静态查询可以一次预处理前缀和后 O(1) 回答；有修改时前缀和会整体失效，需要树状数组或线段树把单点更新和区间求和都控制在对数复杂度。"
      }
    ]
  },
  {
    "acRate": "59.8%",
    "difficulty": "中等",
    "frontendId": "308",
    "paidOnly": true,
    "seriesKeys": [
      "range-sum-query"
    ],
    "seriesPrimaryKey": "range-sum-query",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0308.Range%20Sum%20Query%202D%20-%20Mutable/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-indexed-tree",
        "name": "树状数组"
      },
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Range Sum Query 2D - Mutable",
    "titleCn": "二维区域和检索 - 矩阵可修改",
    "titleSlug": "range-sum-query-2d-mutable",
    "url": "https://leetcode.cn/problems/range-sum-query-2d-mutable/description/",
    "statementPreview": "给你一个二维矩阵 matrix，处理以下类型的多个查询: 更新 matrix 中单元格的值。 计算由 左上角 (row1, col1) 和 右下角 (row2, col2) 定义的 matrix 内矩阵元素的 和。 实现 NumMatrix 类： NumMatrix(int[][] matrix) 用整数矩阵 matrix 初始化对象。 void update(int row, int col, int val) 更新 matrix[row][col] 的值到 val。 int sumRegion(int row1, int col1, int row2, int col2) 返回矩阵 matrix 中指定矩形区域元素的 和，该区域由 左上角 (row1, col1) 和 右下角 (row2, col2) 界定。",
    "approachPreview": "树状数组，也称作“二叉索引树”（Binary Indexed Tree）或 Fenwick 树。 它可以高效地实现如下两个操作： 1. **单点更新** update(x, delta)： 把序列 x 位置的数加上一个值 delta； 1. **前缀和查询** query(x)：查询序列 [1,...x] 区间的区间和，即位置 x 的前缀和。 这两个操作的时间复杂度均为 O(\\log n)。 对于本题，可以构建二维树状数组。",
    "followUps": [
      {
        "question": "这题和区域和检索系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二维区域和检索 - 矩阵可修改 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么静态查询和动态修改要用不同结构？",
        "answer": "静态查询可以一次预处理前缀和后 O(1) 回答；有修改时前缀和会整体失效，需要树状数组或线段树把单点更新和区间求和都控制在对数复杂度。"
      }
    ]
  },
  {
    "acRate": "57.1%",
    "difficulty": "中等",
    "frontendId": "207",
    "paidOnly": false,
    "seriesKeys": [
      "course-schedule"
    ],
    "seriesPrimaryKey": "course-schedule",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0207.Course%20Schedule/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      }
    ],
    "title": "Course Schedule",
    "titleCn": "课程表",
    "titleSlug": "course-schedule",
    "url": "https://leetcode.cn/problems/course-schedule/description/",
    "statementPreview": "你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1。 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [a_i, b_i]，表示如果要学习课程 a_i 则 必须 先学习课程 b_i _。 例如，先修课程对 [0, 1] 表示：想要学习课程 0，你需要先完成课程 1。 请你判断是否可能完成所有课程的学习？如果可以，返回 true；否则，返回 false。",
    "approachPreview": "对于本题，我们可以将课程看作图中的节点，先修课程看作图中的边，那么我们可以将本题转化为判断有向图中是否存在环。 具体地，我们可以使用拓扑排序的思想，对于每个入度为 0 的节点，我们将其出度的节点的入度减 1，直到所有节点都被遍历到。 如果所有节点都被遍历到，说明图中不存在环，那么我们就可以完成所有课程的学习；否则，我们就无法完成所有课程的学习。 时间复杂度 O(n + m)，空间复杂度 O(n + m)。其中 n 和 m 分别为课程数和先修课程数。",
    "followUps": [
      {
        "question": "这题和课程表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 课程表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷课程表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.6%",
    "difficulty": "中等",
    "frontendId": "210",
    "paidOnly": false,
    "seriesKeys": [
      "course-schedule"
    ],
    "seriesPrimaryKey": "course-schedule",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0210.Course%20Schedule%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      }
    ],
    "title": "Course Schedule II",
    "titleCn": "课程表 II",
    "titleSlug": "course-schedule-ii",
    "url": "https://leetcode.cn/problems/course-schedule-ii/description/",
    "statementPreview": "现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites，其中 prerequisites[i] = [a_i, b_i]，表示在选修课程 a_i 前 必须 先选修 b_i。 例如，想要学习课程 0，你需要先完成课程 1，我们用一个匹配来表示： [0,1]。 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组。",
    "approachPreview": "我们创建一个邻接表 g，用于存储每个节点的后继节点，同时还需要一个数组 indeg 存储每个节点的入度。在构建邻接表的同时，我们也统计每个节点的入度。当入度为 0 的节点代表没有任何前置课程，可以直接学习，我们将其加入队列 q 中。 当队列 q 不为空的时候，我们取出队首的节点 i： 我们将 i 放入答案中； 接下来，我们将 i 的所有后继节点的入度减少 1。如果发现某个后继节点 j 的入度变为 0，则将 j 放入队列 q 中。 在广度优先搜索的结束时，如果答案中包含了这 n 个节点，那么我们就找到了一种拓扑排序，否则说明图中存在环，也就不存在拓扑排序了。 时间复杂度 O(n + m)，空间复杂度 O(n + m)。其中 n 和 m 分别是节点数和边数。",
    "followUps": [
      {
        "question": "这题和课程表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 课程表 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷课程表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.0%",
    "difficulty": "困难",
    "frontendId": "630",
    "paidOnly": false,
    "seriesKeys": [
      "course-schedule"
    ],
    "seriesPrimaryKey": "course-schedule",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0630.Course%20Schedule%20III/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Course Schedule III",
    "titleCn": "课程表 III",
    "titleSlug": "course-schedule-iii",
    "url": "https://leetcode.cn/problems/course-schedule-iii/description/",
    "statementPreview": "这里有 n 门不同的在线课程，按从 1 到 n 编号。给你一个数组 courses，其中 courses[i] = [duration_i, lastDay_i] 表示第 i 门课将会 持续 上 duration_i 天课，并且必须在不晚于 lastDay_i 的时候完成。 你的学期从第 1 天开始。且不能同时修读两门及两门以上的课程。 返回你最多可以修读的课程数目。",
    "approachPreview": "我们可以按照课程的结束时间进行升序排序，每次选择结束时间最早的课程进行上课。 如果已选择的课程的总时间 s 超过了当前课程的结束时间 last，那么我们就将此前选择的课程中耗时最长的课程去掉，直到能够满足当前课程的结束时间为止。这里我们使用一个优先队列（大根堆） pq 来维护当前已经选择的课程的耗时，每次我们都从优先队列中取出耗时最长的课程进行去除。 最后，优先队列中的元素个数即为我们能够选择的课程数目。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 是课程数目。",
    "followUps": [
      {
        "question": "这题和课程表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 课程表 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷课程表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.4%",
    "difficulty": "中等",
    "frontendId": "1462",
    "paidOnly": false,
    "seriesKeys": [
      "course-schedule"
    ],
    "seriesPrimaryKey": "course-schedule",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1462.Course%20Schedule%20IV/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      }
    ],
    "title": "Course Schedule IV",
    "titleCn": "课程表 IV",
    "titleSlug": "course-schedule-iv",
    "url": "https://leetcode.cn/problems/course-schedule-iv/description/",
    "statementPreview": "你总共需要上 numCourses 门课，课程编号依次为 0 到 numCourses-1。你会得到一个数组 prerequisite，其中 prerequisites[i] = [a_i, b_i] 表示如果你想选 b_i 课程，你 必须 先选 a_i 课程。 有的课会有直接的先修课程，比如如果想上课程 1，你必须先上课程 0，那么会以 [0,1] 数对的形式给出先修课程数对。 先决条件也可以是 间接 的。如果课程 a 是课程 b 的先决条件，课程 b 是课程 c 的先决条件，那么课程 a 就是课程 c 的先决条件。 你也得到一个数组 queries，其中 queries[j] = [u_j, v_j]。对于第 j 个查询，您应该回答课程 u_j 是否是课程 v_j 的先决条件。 返回一个布尔数组 answer，其中 answer[j] 是第 j 个查询的答案。",
    "approachPreview": "我们创建一个二维数组 f，其中 f[i][j] 表示节点 i 到节点 j 是否可达。 接下来，我们遍历先修课程数组 prerequisites，对于其中的每一项 [a, b]，我们将 f[a][b] 设为 true。 然后，我们使用 Floyd 算法计算出所有节点对之间的可达性。 具体地，我们使用三重循环，首先枚举中间点 k，接下来枚举起点 i，最后枚举终点 j。对于每一次循环，如果节点 i 到节点 k 可达，且节点 k 到节点 j 可达，那么节点 i 到节点 j 也是可达的，我们将 f[i][j] 设为 true。 在计算完所有节点对之间的可达性之后，对于每一个查询 [a, b]，我们直接返回 f[a][b] 即可。 时间复杂度 O(n^3)，空间复杂度 O(n^2)。其中 n 为节点数。",
    "followUps": [
      {
        "question": "这题和课程表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 课程表 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷课程表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.4%",
    "difficulty": "简单",
    "frontendId": "252",
    "paidOnly": true,
    "seriesKeys": [
      "meeting-rooms"
    ],
    "seriesPrimaryKey": "meeting-rooms",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0252.Meeting%20Rooms/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Meeting Rooms",
    "titleCn": "会议室",
    "titleSlug": "meeting-rooms",
    "url": "https://leetcode.cn/problems/meeting-rooms/description/",
    "statementPreview": "给定一个会议时间安排的数组 intervals，每个会议时间都会包括开始和结束的时间 intervals[i] = [start_i, end_i]，请你判断一个人是否能够参加这里面的全部会议。",
    "approachPreview": "我们将会议按照开始时间进行排序，然后遍历排序后的会议，如果当前会议的开始时间小于前一个会议的结束时间，则说明两个会议有重叠，返回 \\text{false}，否则继续遍历。 如果遍历结束都没有发现重叠的会议，则返回 \\text{true}。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 为会议数量。",
    "followUps": [
      {
        "question": "这题和会议室系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 会议室 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷会议室系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.3%",
    "difficulty": "中等",
    "frontendId": "253",
    "paidOnly": true,
    "seriesKeys": [
      "meeting-rooms"
    ],
    "seriesPrimaryKey": "meeting-rooms",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0253.Meeting%20Rooms%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Meeting Rooms II",
    "titleCn": "会议室 II",
    "titleSlug": "meeting-rooms-ii",
    "url": "https://leetcode.cn/problems/meeting-rooms-ii/description/",
    "statementPreview": "给你一个会议时间安排的数组 intervals，每个会议时间都会包括开始和结束的时间 intervals[i] = [start_i, end_i]，返回 所需会议室的最小数量。",
    "approachPreview": "我们可以用差分数组来实现。 我们首先找到所有会议的最大结束时间，记为 m，然后创建一个长度为 m + 1 的差分数组 d，将每个会议的开始时间和结束时间分别加到差分数组的对应位置上，即 d[l] = d[l] + 1，而 d[r] = d[r] - 1。 然后，我们计算差分数组的前缀和，找出前缀和的最大值，即为所需会议室的最小数量。 时间复杂度 O(n + m)，空间复杂度 O(m)。其中 n 和 m 分别为会议数量和最大结束时间。",
    "followUps": [
      {
        "question": "这题和会议室系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 会议室 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷会议室系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.8%",
    "difficulty": "困难",
    "frontendId": "2402",
    "paidOnly": false,
    "seriesKeys": [
      "meeting-rooms"
    ],
    "seriesPrimaryKey": "meeting-rooms",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2400-2499/2402.Meeting%20Rooms%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Meeting Rooms III",
    "titleCn": "会议室 III",
    "titleSlug": "meeting-rooms-iii",
    "url": "https://leetcode.cn/problems/meeting-rooms-iii/description/",
    "statementPreview": "给你一个整数 n，共有编号从 0 到 n - 1 的 n 个会议室。 给你一个二维整数数组 meetings，其中 meetings[i] = [start_i, end_i] 表示一场会议将会在 半闭 时间区间 [start_i, end_i) 举办。所有 start_i 的值 互不相同。 会议将会按以下方式分配给会议室： 每场会议都会在未占用且编号 最小 的会议室举办。 如果没有可用的会议室，会议将会延期，直到存在空闲的会议室。延期会议的持续时间和原会议持续时间 相同。 当会议室处于未占用状态时，将会优先提供给原 开始 时间更早的会议。 返回举办最多次会议的房间 编号。如果存在多个房间满足此条件，则返回编号 最小 的房间。 半闭区间 [a, b) 是 a 和 b 之间的区间， 包括 a 但 不包括 b。",
    "approachPreview": "我们定义两个优先队列，分别表示空闲会议室、使用中的会议室。其中：空闲会议室 \\textit{idle} 依据**下标**排序；而使用中的会议室 \\textit{busy} 依据**结束时间、下标**排序。 先对会议按照开始时间排序，然后遍历会议，对于每个会议： 若有使用中的会议室小于当前等于会议的开始时间，将其加入到空闲会议室队列 \\textit{idle} 中； 若当前有空闲会议室，那么在空闲队列 \\textit{idle} 中取出权重最小的会议室，将其加入使用中的队列 \\textit{busy} 中； 若当前没有空闲会议室，那么在使用队列 \\textit{busy} 中找出最早结束时间且下标最小的会议室，重新加入使用中的队列 \\textit{busy} 中。 时间复杂度 O(m (\\log m + \\log n))，空间复杂度 O(n + m)，其中 n 和 m 分别为会议室数量和会议数量。 相似题目：",
    "followUps": [
      {
        "question": "这题和会议室系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 会议室 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷会议室系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.3%",
    "difficulty": "中等",
    "frontendId": "139",
    "paidOnly": false,
    "seriesKeys": [
      "word-break",
      "word-series"
    ],
    "seriesPrimaryKey": "word-break",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0139.Word%20Break/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "memoization",
        "name": "记忆化"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Word Break",
    "titleCn": "单词拆分",
    "titleSlug": "word-break",
    "url": "https://leetcode.cn/problems/word-break/description/",
    "statementPreview": "给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。 注意： 不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。",
    "approachPreview": "我们定义 f[i] 表示字符串 s 的前 i 个字符能否拆分成 wordDict 中的单词，初始时 f[0]=true，其余为 false。答案为 f[n]。 考虑 f[i]，如果存在 j \\in [0, i) 使得 f[j] \\land s[j:i] \\in wordDict，则 f[i]=true。为了优化效率，我们可以使用哈希表存储 wordDict 中的单词，这样可以快速判断 s[j:i] 是否在 wordDict 中。 时间复杂度 O(n^3)，空间复杂度 O(n)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和单词拆分系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词拆分 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "拆分型字典 DP 的状态应该怎么定义？",
        "answer": "通常让 dp[i] 表示前 i 个字符能否被词典合法覆盖；需要输出方案时，把可行前驱位置保存下来，再用 DFS 和记忆化恢复所有句子。"
      }
    ]
  },
  {
    "acRate": "61.4%",
    "difficulty": "困难",
    "frontendId": "140",
    "paidOnly": false,
    "seriesKeys": [
      "word-break",
      "word-series"
    ],
    "seriesPrimaryKey": "word-break",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0140.Word%20Break%20II/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "memoization",
        "name": "记忆化"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Word Break II",
    "titleCn": "单词拆分 II",
    "titleSlug": "word-break-ii",
    "url": "https://leetcode.cn/problems/word-break-ii/description/",
    "statementPreview": "给定一个字符串 s 和一个字符串字典 wordDict，在字符串 s 中增加空格来构建一个句子，使得句子中所有的单词都在词典中。 以任意顺序 返回所有这些可能的句子。 注意： 词典中的同一个单词可能在分段中被重复使用多次。",
    "approachPreview": "单词拆分 II 属于单词拆分系列中的一个变体。主要标签是 字典树、记忆化、数组、哈希表、字符串、动态规划、回溯。先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和单词拆分系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词拆分 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "拆分型字典 DP 的状态应该怎么定义？",
        "answer": "通常让 dp[i] 表示前 i 个字符能否被词典合法覆盖；需要输出方案时，把可行前驱位置保存下来，再用 DFS 和记忆化恢复所有句子。"
      }
    ]
  },
  {
    "acRate": "52.5%",
    "difficulty": "困难",
    "frontendId": "472",
    "paidOnly": false,
    "seriesKeys": [
      "word-break"
    ],
    "seriesPrimaryKey": "word-break",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0472.Concatenated%20Words/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Concatenated Words",
    "titleCn": "连接词",
    "titleSlug": "concatenated-words",
    "url": "https://leetcode.cn/problems/concatenated-words/description/",
    "statementPreview": "给你一个 不含重复 单词的字符串数组 words，请你找出并返回 words 中的所有 连接词。 连接词 定义为：一个完全由给定数组中的至少两个较短单词（不一定是不同的两个单词）组成的字符串。",
    "approachPreview": "判断一个单词是不是连接词，需要判断这个单词是否完全由至少两个给定数组中的更短的非空单词（可以重复）组成。判断更短的单词是否在给定数组中，可以使用字典树实现。 首先将 words 按照字符串的长度递增的顺序排序，排序后可以确保当遍历到任意单词时，比该单词短的单词一定都已经遍历过，因此可以根据已经遍历过的全部单词判断当前单词是不是连接词。 在将 words 排序之后，遍历 words，跳过空字符串，对于每个非空单词，判断该单词是不是连接词，如果是连接词则将该单词加入结果数组，如果不是连接词则将该单词加入字典树。 判断一个单词是不是连接词的做法是在字典树中深度优先搜索。从该单词的第一个字符（即下标 0 处的字符）开始，在字典树中依次搜索每个字符对应的结点，可能有以下几种情况： 如果一个字符对应的结点是单词的结尾，则找到了一个更短的单词，从该字符的后一个字符开始搜索下一个更短的单词； 如果一个字符对应的结点在字典树中不存在，则当前的搜索结果失败，回到上一个单词的结尾继续搜索。 如果找到一个更短的单词且这个更短的单词的最后一个字符是当前单词的最后一个字符，则当前单词是连接词。由于数组 words 中没有重复的单词，因此在判断一个单词是不是连接词时，该单词一定没有加入字典树，由此可以确保判断连接词的条件成立。",
    "followUps": [
      {
        "question": "这题和单词拆分系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 连接词 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "拆分型字典 DP 的状态应该怎么定义？",
        "answer": "通常让 dp[i] 表示前 i 个字符能否被词典合法覆盖；需要输出方案时，把可行前驱位置保存下来，再用 DFS 和记忆化恢复所有句子。"
      }
    ]
  },
  {
    "acRate": "65.3%",
    "difficulty": "中等",
    "frontendId": "2707",
    "paidOnly": false,
    "seriesKeys": [
      "word-break"
    ],
    "seriesPrimaryKey": "word-break",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2700-2799/2707.Extra%20Characters%20in%20a%20String/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Extra Characters in a String",
    "titleCn": "字符串中的额外字符",
    "titleSlug": "extra-characters-in-a-string",
    "url": "https://leetcode.cn/problems/extra-characters-in-a-string/description/",
    "statementPreview": "给你一个下标从 0 开始的字符串 s 和一个单词字典 dictionary。你需要将 s 分割成若干个 互不重叠 的子字符串，每个子字符串都在 dictionary 中出现过。 s 中可能会有一些 额外的字符 不在任何子字符串中。 请你采取最优策略分割 s，使剩下的字符 最少。",
    "approachPreview": "我们可以用一个哈希表 ss 记录字段中的所有单词，方便我们快速判断一个字符串是否在字典中。 接下来，我们定义 f[i] 表示字符串 s 的前 i 个字符的最小额外字符数，初始时 f[0] = 0。 当 i \\ge 1 时，第 i 个字符 s[i - 1] 可以作为一个额外字符，此时 f[i] = f[i - 1] + 1，如果在 j \\in [0, i - 1] 中存在一个下标 j，使得 s[j..i) 在哈希表 ss 中，那么我们可以将 s[j..i) 作为一个单词，此时 f[i] = f[j]。 综上，我们可以得到状态转移方程： f[i] = \\min \\{ f[i - 1] + 1, \\min_{j \\in [0, i - 1]} f[j] \\} 其中 i \\ge 1，而 j \\in [0, i - 1] 且 s[j..i) 在哈希表 ss 中。 最终答案为 f[n]。 时间复杂度 O(n^3 + L)，空间复杂度 O(n + L)。其中 n 是字符串 s 的长度，而 L 是字典中所有单词的长度之和。",
    "followUps": [
      {
        "question": "这题和单词拆分系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 字符串中的额外字符 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "拆分型字典 DP 的状态应该怎么定义？",
        "answer": "通常让 dp[i] 表示前 i 个字符能否被词典合法覆盖；需要输出方案时，把可行前驱位置保存下来，再用 DFS 和记忆化恢复所有句子。"
      }
    ]
  },
  {
    "acRate": "68.3%",
    "difficulty": "中等",
    "frontendId": "279",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0279.Perfect%20Squares/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Perfect Squares",
    "titleCn": "完全平方数",
    "titleSlug": "perfect-squares",
    "url": "https://leetcode.cn/problems/perfect-squares/description/",
    "statementPreview": "给你一个整数 n，返回 和为 n 的完全平方数的最少数量。 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如， 1、 4、 9 和 16 都是完全平方数，而 3 和 11 不是。",
    "approachPreview": "我们定义 f[i][j] 表示使用数字 1, 2, \\cdots, i 的完全平方数组成和为 j 的最少数量。初始时 f[0][0] = 0，其余位置的值均为正无穷。 我们可以枚举使用的最后一个数字的数量 k，那么： f[i][j] = \\min(f[i - 1][j], f[i - 1][j - i^2] + 1, \\cdots, f[i - 1][j - k \\times i^2] + k) 其中 i^2 表示最后一个数字 i 的完全平方数。 不妨令 j = j - i^2，那么有： f[i][j - i^2] = \\min(f[i - 1][j - i^2], f[i - 1][j - 2 \\times i^2] + 1, \\cdots, f[i - 1][j - k \\times i^2] + k - 1) 将二式代入一式，我们可以得到以下状态转移方程： f[i][j] = \\min(f[i - 1][j], f[i][j - i^2] + 1) 最后答案即为 f[m][n]。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 为 sqrt(n) 的整数部分。 注意到 f[i][j] 只与 f[i - 1][j] 和 f[i][j - i^2] 有关，因此我们可以将二维数组优化为一维数组，空间复杂度降为 O(n)。 相似题目：",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 完全平方数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "53.0%",
    "difficulty": "中等",
    "frontendId": "322",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0322.Coin%20Change/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Coin Change",
    "titleCn": "零钱兑换",
    "titleSlug": "coin-change",
    "url": "https://leetcode.cn/problems/coin-change/description/",
    "statementPreview": "给你一个整数数组 coins，表示不同面额的硬币；以及一个整数 amount，表示总金额。 计算并返回可以凑成总金额所需的 最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。 你可以认为每种硬币的数量是无限的。",
    "approachPreview": "我们定义 f[i][j] 表示使用前 i 种硬币，凑出金额 j 的最少硬币数。初始时 f[0][0] = 0，其余位置的值均为正无穷。 我们可以枚举使用的最后一枚硬币的数量 k，那么有： f[i][j] = \\min(f[i - 1][j], f[i - 1][j - x] + 1, \\cdots, f[i - 1][j - k \\times x] + k) 其中 x 表示第 i 种硬币的面值。 不妨令 j = j - x，那么有： f[i][j - x] = \\min(f[i - 1][j - x], f[i - 1][j - 2 \\times x] + 1, \\cdots, f[i - 1][j - k \\times x] + k - 1) 将二式代入一式，我们可以得到以下状态转移方程： f[i][j] = \\min(f[i - 1][j], f[i][j - x] + 1) 最后答案即为 f[m][n]。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为硬币的种类数和总金额。",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 零钱兑换 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "53.6%",
    "difficulty": "中等",
    "frontendId": "377",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change",
      "combination-sum"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0377.Combination%20Sum%20IV/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Combination Sum IV",
    "titleCn": "组合总和 Ⅳ",
    "titleSlug": "combination-sum-iv",
    "url": "https://leetcode.cn/problems/combination-sum-iv/description/",
    "statementPreview": "给你一个由 不同 整数组成的数组 nums，和一个目标整数 target。请你从 nums 中找出并返回总和为 target 的元素排列的个数。 题目数据保证答案符合 32 位整数范围。",
    "approachPreview": "我们定义 f[i] 表示总和为 i 的元素组合的个数，初始时 f[0] = 1，其余 f[i] = 0。最终答案即为 f[target]。 对于 f[i]，我们可以枚举数组中的每个元素 x，如果 i \\ge x，则 f[i] = f[i] + f[i - x]。 最后返回 f[target] 即可。 时间复杂度 O(n \\times target)，空间复杂度 O(target)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 组合总和 Ⅳ 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "中等",
    "frontendId": "518",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0518.Coin%20Change%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Coin Change II",
    "titleCn": "零钱兑换 II",
    "titleSlug": "coin-change-ii",
    "url": "https://leetcode.cn/problems/coin-change-ii/description/",
    "statementPreview": "给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0。 假设每一种面额的硬币有无限个。 题目数据保证结果符合 32 位带符号整数。",
    "approachPreview": "我们定义 f[i][j] 表示使用前 i 种硬币，凑出金额 j 的硬币组合数。初始时 f[0][0] = 1，其余位置的值均为 0。 我们可以枚举使用的最后一枚硬币的数量 k，那么有式子一： f[i][j] = f[i - 1][j] + f[i - 1][j - x] + f[i - 1][j - 2 \\times x] + \\cdots + f[i - 1][j - k \\times x] 其中 x 表示第 i 种硬币的面值。 不妨令 j = j - x，那么有式子二： f[i][j - x] = f[i - 1][j - x] + f[i - 1][j - 2 \\times x] + \\cdots + f[i - 1][j - k \\times x] 将式子二代入式子一，得到： f[i][j] = f[i - 1][j] + f[i][j - x] 最终的答案为 f[m][n]，其中 m 和 n 分别表示硬币的种类数和总金额。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为硬币的种类数和总金额。",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 零钱兑换 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "63.8%",
    "difficulty": "中等",
    "frontendId": "983",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0983.Minimum%20Cost%20For%20Tickets/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Minimum Cost For Tickets",
    "titleCn": "最低票价",
    "titleSlug": "minimum-cost-for-tickets",
    "url": "https://leetcode.cn/problems/minimum-cost-for-tickets/description/",
    "statementPreview": "在一个火车旅行很受欢迎的国度，你提前一年计划了一些火车旅行。在接下来的一年里，你要旅行的日子将以一个名为 days 的数组给出。每一项是一个从 1 到 365 的整数。 火车票有 三种不同的销售方式： 一张 为期一天 的通行证售价为 costs[0] 美元； 一张 为期七天 的通行证售价为 costs[1] 美元； 一张 为期三十天 的通行证售价为 costs[2] 美元。 通行证允许数天无限制的旅行。 例如，如果我们在第 2 天获得一张 为期 7 天 的通行证，那么我们可以连着旅行 7 天：第 2 天、第 3 天、第 4 天、第 5 天、第 6 天、第 7 天和第 8 天。 返回 你想要完成在给定的列表 days 中列出的每一天的旅行所需要的最低消费。",
    "approachPreview": "我们定义一个函数 \\textit{dfs(i)}，表示从第 i 次出行开始到最后一次出行结束所需的最小花费。那么答案为 \\textit{dfs(0)}。 函数 \\textit{dfs(i)} 的执行过程如下： 如果 i \\geq n，表示所有出行已经结束，返回 0； 否则，我们需要考虑三种购买方式，分别是购买 1 天通行证、购买 7 天通行证和购买 30 天通行证。我们分别计算这三种购买方式的花费，并且利用二分查找，找到下一次出行的下标 j，然后递归调用 \\textit{dfs(j)}，最后返回这三种购买方式的最小花费。 为了避免重复计算，我们使用记忆化搜索，将已经计算过的结果保存起来。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 表示出行的次数。",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最低票价 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "66.6%",
    "difficulty": "中等",
    "frontendId": "3592",
    "paidOnly": false,
    "seriesKeys": [
      "coin-change"
    ],
    "seriesPrimaryKey": "coin-change",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3592.Inverse%20Coin%20Change/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Inverse Coin Change",
    "titleCn": "硬币面值还原",
    "titleSlug": "inverse-coin-change",
    "url": "https://leetcode.cn/problems/inverse-coin-change/description/",
    "statementPreview": "给你一个 从 1 开始计数 的整数数组 numWays，其中 numWays[i] 表示使用某些 固定 面值的硬币（每种面值可以使用无限次）凑出总金额 i 的方法数。每种面值都是一个 正整数，并且其值 最多 为 numWays.length。 然而，具体的硬币面值已经 丢失。你的任务是还原出可能生成这个 numWays 数组的面值集合。 返回一个按从小到大顺序排列的数组，其中包含所有可能的 唯一 整数面值。 如果不存在这样的集合，返回一个 空 数组。",
    "approachPreview": "硬币面值还原 属于零钱兑换与完全背包中的一个变体。主要标签是 数组、动态规划。先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和零钱兑换与完全背包里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 硬币面值还原 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "零钱兑换和组合总数为什么循环顺序不同？",
        "answer": "最少硬币数关心最优值，可以按金额逐步松弛；组合数要避免排列重复，通常外层枚举硬币、内层枚举金额，让每种面额只按固定顺序加入。"
      }
    ]
  },
  {
    "acRate": "54.2%",
    "difficulty": "中等",
    "frontendId": "416",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0416.Partition%20Equal%20Subset%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Partition Equal Subset Sum",
    "titleCn": "分割等和子集",
    "titleSlug": "partition-equal-subset-sum",
    "url": "https://leetcode.cn/problems/partition-equal-subset-sum/description/",
    "statementPreview": "给你一个 只包含正整数 的 非空 数组 nums。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。",
    "approachPreview": "我们先计算出数组的总和 s，如果总和是奇数，那么一定不能分割成两个和相等的子集，直接返回 false。如果总和是偶数，我们记目标子集的和为 m = \\frac{s}{2}，那么问题就转化成了：是否存在一个子集，使得其元素的和为 m。 我们定义 f[i][j] 表示前 i 个数中选取若干个数，使得其元素的和恰好为 j。初始时 f[0][0] = true，其余 f[i][j] = false。答案为 f[n][m]。 考虑 f[i][j]，如果我们选取了第 i 个数 x，那么 f[i][j] = f[i - 1][j - x]；如果我们没有选取第 i 个数 x，那么 f[i][j] = f[i - 1][j]。因此状态转移方程为： f[i][j] = f[i - 1][j] \\textit{ or } f[i - 1][j - x] \\textit{ if } j \\geq x 最终答案为 f[n][m]。 时间复杂度 (m \\times n)，空间复杂度 (m \\times n)。其中 m 和 n 分别为数组的总和的一半和数组的长度。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割等和子集 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "67.8%",
    "difficulty": "中等",
    "frontendId": "474",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0474.Ones%20and%20Zeroes/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Ones and Zeroes",
    "titleCn": "一和零",
    "titleSlug": "ones-and-zeroes",
    "url": "https://leetcode.cn/problems/ones-and-zeroes/description/",
    "statementPreview": "给你一个二进制字符串数组 strs 和两个整数 m 和 n。 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1。 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集。",
    "approachPreview": "我们定义 f[i][j][k] 表示在前 i 个字符串中，使用 j 个 0 和 k 个 1 的情况下最多可以得到的字符串数量。初始时 f[i][j][k]=0，答案为 f[sz][m][n]，其中 sz 是数组 strs 的长度。 对于 f[i][j][k]，我们有两种决策： 不选第 i 个字符串，此时 f[i][j][k]=f[i-1][j][k]； 选第 i 个字符串，此时 f[i][j][k]=f[i-1][j-a][k-b]+1，其中 a 和 b 分别是第 i 个字符串中 0 和 1 的数量。 我们取两种决策中的最大值，即可得到 f[i][j][k] 的值。 最终的答案即为 f[sz][m][n]。 时间复杂度 O(sz \\times m \\times n)，空间复杂度 O(sz \\times m \\times n)。其中 sz 是数组 strs 的长度；而 m 和 n 分别是字符串中 0 和 1 的数量上限。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 一和零 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "48.8%",
    "difficulty": "中等",
    "frontendId": "494",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0494.Target%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Target Sum",
    "titleCn": "目标和",
    "titleSlug": "target-sum",
    "url": "https://leetcode.cn/problems/target-sum/description/",
    "statementPreview": "给你一个非负整数数组 nums 和一个整数 target。 向数组中的每个整数前添加 '+' 或 '-'，然后串联起所有整数，可以构造一个 表达式： 例如， nums = [2, 1]，可以在 2 之前添加 '+'，在 1 之前添加 '-'，然后串联起来得到表达式 \"+2-1\"。 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。",
    "approachPreview": "我们记数组 \\textit{nums} 所有元素的和为 s，添加负号的元素之和为 x，则添加正号的元素之和为 s - x，则有： (s - x) - x = \\textit{target} \\Rightarrow x = \\frac{s - \\textit{target}}{2} 由于 x \\geq 0，且 x 为整数，所以 s \\geq \\textit{target} 且 s - \\textit{target} 为偶数。如果不满足这两个条件，则直接返回 0。 接下来，我们可以将问题转化为：在数组 \\textit{nums} 中选取若干元素，使得这些元素之和等于 \\frac{s - \\textit{target}}{2}，问有多少种选取方法。 我们可以使用动态规划来解决这个问题。定义 f[i][j] 表示在数组 \\textit{nums} 的前 i 个元素中选取若干元素，使得这些元素之和等于 j 的选取方案数。 对于 \\textit{nums}[i - 1]，我们有两种选择：选取或不选取。如果我们不选取 \\textit{nums}[i - 1]，则 f[i][j] = f[i - 1][j]；如果我们选取 \\textit{nums}[i - 1]，则 f[i][j] = f[i - 1][j - \\textit{nums}[i - 1]]。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 目标和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "54.5%",
    "difficulty": "困难",
    "frontendId": "879",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0879.Profitable%20Schemes/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Profitable Schemes",
    "titleCn": "盈利计划",
    "titleSlug": "profitable-schemes",
    "url": "https://leetcode.cn/problems/profitable-schemes/description/",
    "statementPreview": "集团里有 n 名员工，他们可以完成各种各样的工作创造利润。 第 i 种工作会产生 profit[i] 的利润，它要求 group[i] 名成员共同参与。如果成员参与了其中一项工作，就不能参与另一项工作。 工作的任何至少产生 minProfit 利润的子集称为 盈利计划。并且工作的成员总数最多为 n。 有多少种计划可以选择？因为答案很大，所以 返回结果模 10^9 + 7 的值。",
    "approachPreview": "我们设计一个函数 dfs(i, j, k)，表示从第 i 个工作开始，且当前已经选择了 j 个员工，且当前产生的利润为 k，这种情况下的方案数。那么答案就是 dfs(0, 0, 0)。 函数 dfs(i, j, k) 的执行过程如下： 如果 i = n，表示所有工作都已经考虑过了，如果 k \\geq minProfit，则方案数为 1，否则方案数为 0； 如果 i \\lt n，我们可以选择不选择第 i 个工作，此时方案数为 dfs(i + 1, j, k)；如果 j + group[i] \\leq n，我们也可以选择第 i 个工作，此时方案数为 dfs(i + 1, j + group[i], \\min(k + profit[i], minProfit))。这里我们将利润上限限制在 minProfit，是因为利润超过 minProfit 对我们的答案没有任何影响。 最后返回 dfs(0, 0, 0) 即可。 为了避免重复计算，我们可以使用记忆化搜索的方法，用一个三维数组 f 记录所有的 dfs(i, j, k) 的结果。当我们计算出 dfs(i, j, k) 的值后，我们将其存入 f[i][j][k] 中。调用 dfs(i, j, k) 时，如果 f[i][j][k] 已经被计算过，我们直接返回 f[i][j][k] 即可。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 盈利计划 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "71.9%",
    "difficulty": "中等",
    "frontendId": "1049",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp",
      "last-stone-weight"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1049.Last%20Stone%20Weight%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Last Stone Weight II",
    "titleCn": "最后一块石头的重量 II",
    "titleSlug": "last-stone-weight-ii",
    "url": "https://leetcode.cn/problems/last-stone-weight-ii/description/",
    "statementPreview": "有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。 每一回合，从中选出 任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下： 如果 x == y，那么两块石头都会被完全粉碎； 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。 最后， 最多只会剩下一块 石头。返回此石头 最小的可能重量。如果没有石头剩下，就返回 0。",
    "approachPreview": "两个**石头的重量越接近，粉碎后的新重量就越小。同样的，**两堆**石头的重量越接近，它们粉碎后的新重量也越小。 所以本题可以转换为，计算容量为 sum / 2 的背包最多能装多少重量的石头。 定义 dp[i][j] 表示从前 i 个石头中选出若干个，使得所选石头重量之和为不超过 j 的最大重量。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最后一块石头的重量 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "69.0%",
    "difficulty": "困难",
    "frontendId": "2585",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2585.Number%20of%20Ways%20to%20Earn%20Points/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Number of Ways to Earn Points",
    "titleCn": "获得分数的方法数",
    "titleSlug": "number-of-ways-to-earn-points",
    "url": "https://leetcode.cn/problems/number-of-ways-to-earn-points/description/",
    "statementPreview": "考试中有 n 种类型的题目。给你一个整数 target 和一个下标从 0 开始的二维整数数组 types，其中 types[i] = [count_i, marks_i] 表示第 i 种类型的题目有 count_i 道，每道题目对应 marks_i 分。 返回你在考试中恰好得到 target 分的方法数。由于答案可能很大，结果需要对 10^9 +7 取余。 注意，同类型题目无法区分。 比如说，如果有 3 道同类型题目，那么解答第 1 和第 2 道题目与解答第 1 和第 3 道题目或者第 2 和第 3 道题目是相同的。",
    "approachPreview": "我们定义 f[i][j] 表示前 i 种类型的题目中，恰好得到 j 分的方法数。初始时 f[0][0] = 1，其余 f[i][j] = 0。答案即为 f[n][target]。 我们可以枚举第 i 种类型的题目，假设该类型题目的数量为 count，分数为 marks，那么我们可以得到如下状态转移方程： f[i][j] = \\sum_{k=0}^{count} f[i-1][j-k \\times marks] 其中 k 表示第 i 种类型的题目的数量。 最终的答案即为 f[n][target]。注意答案可能很大，需要对 10^9 + 7 取模。 时间复杂度 O(n \\times target \\times count)，空间复杂度 O(n \\times target)。其中 n 为题目类型的数量；而 target 和 count 分别为题目的目标分数和每种类型题目的数量。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 获得分数的方法数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "54.4%",
    "difficulty": "中等",
    "frontendId": "2787",
    "paidOnly": false,
    "seriesKeys": [
      "knapsack-dp"
    ],
    "seriesPrimaryKey": "knapsack-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2700-2799/2787.Ways%20to%20Express%20an%20Integer%20as%20Sum%20of%20Powers/README.md",
    "tags": [
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Ways to Express an Integer as Sum of Powers",
    "titleCn": "将一个数字表示成幂的和的方案数",
    "titleSlug": "ways-to-express-an-integer-as-sum-of-powers",
    "url": "https://leetcode.cn/problems/ways-to-express-an-integer-as-sum-of-powers/description/",
    "statementPreview": "给你两个 正 整数 n 和 x。 请你返回将 n 表示成一些 互不相同 正整数的 x 次幂之和的方案数。换句话说，你需要返回互不相同整数 [n_1, n_2, ..., n_k] 的集合数目，满足 n = n_1^x + n_2^x + ... + n_k^x。 由于答案可能非常大，请你将它对 10^9 + 7 取余后返回。 比方说， n = 160 且 x = 3，一个表示 n 的方法是 n = 2^3 + 3^3 + 5^3 ^。",
    "approachPreview": "我们定义 f[i][j] 表示在前 i 个正整数中选取一些数的 x 次幂之和等于 j 的方案数，初始时 f[0][0] = 1，其余均为 0。答案为 f[n][n]。 对于每个正整数 i，我们可以选择不选它或者选它： 不选它：此时方案数为 f[i-1][j]； 选它：此时方案数为 f[i-1][j-i^x]（前提是 j \\geq i^x）。 因此状态转移方程为： f[i][j] = f[i-1][j] + (j \\geq i^x ? f[i-1][j-i^x] : 0) 注意到答案可能非常大，我们需要对 10^9 + 7 取余。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 是题目中给定的整数。",
    "followUps": [
      {
        "question": "这题和背包 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 将一个数字表示成幂的和的方案数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "背包 DP 最先要判断什么？",
        "answer": "先判断每个物品能选 0/1 次、无限次还是有限次，再决定枚举物品和容量的顺序；0/1 背包通常倒序枚举容量，完全背包通常正序枚举容量。"
      }
    ]
  },
  {
    "acRate": "31.2%",
    "difficulty": "困难",
    "frontendId": "10",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0010.Regular%20Expression%20Matching/README.md",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Regular Expression Matching",
    "titleCn": "正则表达式匹配",
    "titleSlug": "regular-expression-matching",
    "url": "https://leetcode.cn/problems/regular-expression-matching/description/",
    "statementPreview": "给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。 '.' 匹配任意单个字符 '*' 匹配零个或多个前面的那一个元素 返回一个布尔值，表示匹配是否覆盖整个输入字符串（而非部分）。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，表示从 s 的第 i 个字符开始，和 p 的第 j 个字符开始是否匹配。那么答案就是 dfs(0, 0)。 函数 dfs(i, j) 的计算过程如下： 如果 j 已经到达 p 的末尾，那么如果 i 也到达了 s 的末尾，那么匹配成功，否则匹配失败。 如果 j 的下一个字符是 '*'，我们可以选择匹配 0 个 s[i] 字符，那么就是 dfs(i, j + 2)。如果此时 i \\lt m 并且 s[i] 和 p[j] 匹配，那么我们可以选择匹配 1 个 s[i] 字符，那么就是 dfs(i + 1, j)。 如果 j 的下一个字符不是 '*'，那么如果 i \\lt m 并且 s[i] 和 p[j] 匹配，那么就是 dfs(i + 1, j + 1)。否则匹配失败。 过程中，我们可以使用记忆化搜索，避免重复计算。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是 s 和 p 的长度。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 正则表达式匹配 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "34.8%",
    "difficulty": "困难",
    "frontendId": "44",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0044.Wildcard%20Matching/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Wildcard Matching",
    "titleCn": "通配符匹配",
    "titleSlug": "wildcard-matching",
    "url": "https://leetcode.cn/problems/wildcard-matching/description/",
    "statementPreview": "给你一个输入字符串 ( s ) 和一个字符模式 ( p )，请你实现一个支持 '?' 和 '*' 匹配规则的通配符匹配： '?' 可以匹配任何单个字符。 '*' 可以匹配任意字符序列（包括空字符序列）。 判定匹配成功的充要条件是：字符模式必须能够 完全匹配 输入字符串（而不是部分匹配）。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，表示从字符串 s 的第 i 个字符开始和字符串 p 的第 j 个字符开始是否匹配。那么答案就是 dfs(0, 0)。 函数 dfs(i, j) 的执行过程如下： 如果 i \\geq \\textit{len}(s)，那么只有当 j \\geq \\textit{len}(p) 或者 p[j] = '*' 且 dfs(i, j + 1) 为真时，dfs(i, j) 才为真。 如果 j \\geq \\textit{len}(p)，那么 dfs(i, j) 为假。 如果 p[j] = '*'，那么 dfs(i, j) 为真当且仅当 dfs(i + 1, j) 或 dfs(i + 1, j + 1) 或 dfs(i, j + 1) 中有一个为真。 否则 dfs(i, j) 为真当且仅当 p[j] = '?' 或 s[i] = p[j] 且 dfs(i + 1, j + 1) 为真。 为了避免重复计算，我们使用记忆化搜索的方法，将 dfs(i, j) 的结果存储在一个哈希表中。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是字符串 s 和 p 的长度。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 通配符匹配 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "64.1%",
    "difficulty": "中等",
    "frontendId": "72",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0072.Edit%20Distance/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Edit Distance",
    "titleCn": "编辑距离",
    "titleSlug": "edit-distance",
    "url": "https://leetcode.cn/problems/edit-distance/description/",
    "statementPreview": "给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数。 你可以对一个单词进行如下三种操作： 插入一个字符 删除一个字符 替换一个字符",
    "approachPreview": "我们定义 f[i][j] 表示将 word1 的前 i 个字符转换成 word2 的前 j 个字符所使用的最少操作数。初始时 f[i][0] = i, f[0][j] = j。其中 i \\in [1, m], j \\in [0, n]。 考虑 f[i][j]： 如果 word1[i - 1] = word2[j - 1]，那么我们只需要考虑将 word1 的前 i - 1 个字符转换成 word2 的前 j - 1 个字符所使用的最少操作数，因此 f[i][j] = f[i - 1][j - 1]； 否则，我们可以考虑插入、删除、替换操作，那么 f[i][j] = \\min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1。 综上，我们可以得到状态转移方程： f[i][j] = \\begin{cases} i, & \\textit{if } j = 0 \\\\ j, & \\textit{if } i = 0 \\\\ f[i - 1][j - 1], & \\textit{if } word1[i - 1] = word2[j - 1] \\\\ \\min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1, & \\textit{otherwise} \\end{cases} 最后，我们返回 f[m][n] 即可。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 编辑距离 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "46.9%",
    "difficulty": "中等",
    "frontendId": "97",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0097.Interleaving%20String/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Interleaving String",
    "titleCn": "交错字符串",
    "titleSlug": "interleaving-string",
    "url": "https://leetcode.cn/problems/interleaving-string/description/",
    "statementPreview": "给定三个字符串 s1、 s2、 s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。 两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串： s = s_1 + s_2 + ... + s_n t = t_1 + t_2 + ... + t_m n - m <= 1 交错 是 s_1 + t_1 + s_2 + t_2 + s_3 + t_3 + ... 或者 t_1 + s_1 + t_2 + s_2 + t_3 + s_3 + ... 注意： a + b 意味着字符串 a 和 b 连接。",
    "approachPreview": "我们记字符串 s_1 的长度为 m，字符串 s_2 的长度为 n，如果 m + n \\neq s_3，那么 s_3 一定不是 s_1 和 s_2 的交错字符串，返回 false。 接下来，我们设计一个函数 dfs(i, j)，表示从 s_1 的第 i 个字符和 s_2 的第 j 个字符开始，能否交错组成 s_3 的剩余部分。那么答案就是 dfs(0, 0)。 函数 dfs(i, j) 的计算过程如下： 如果 i \\geq m 并且 j \\geq n，那么说明 s_1 和 s_2 都已经遍历完毕，返回 true。 如果 i < m 并且 s_1[i] = s_3[i + j]，那么说明 s_1[i] 这个字符是 s_3[i + j] 中的一部分，因此递归地调用 dfs(i + 1, j) 判断 s_1 的下一个字符能否和 s_2 的当前字符匹配，如果能匹配成功，就返回 true。 同理，如果 j < n 并且 s_2[j] = s_3[i + j]，那么说明 s_2[j] 这个字符是 s_3[i + j] 中的一部分，因此递归地调用 dfs(i, j + 1) 判断 s_2 的下一个字符能否和 s_1 的当前字符匹配，如果能匹配成功，就返回 true。 否则，返回 false。 为了避免重复计算，我们可以使用记忆化搜索。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 交错字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "68.7%",
    "difficulty": "中等",
    "frontendId": "583",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0583.Delete%20Operation%20for%20Two%20Strings/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Delete Operation for Two Strings",
    "titleCn": "两个字符串的删除操作",
    "titleSlug": "delete-operation-for-two-strings",
    "url": "https://leetcode.cn/problems/delete-operation-for-two-strings/description/",
    "statementPreview": "给定两个单词 word1 和 word2，返回使得 word1 和 word2 相同 所需的 最小步数。 每步 可以删除任意一个字符串中的一个字符。",
    "approachPreview": "我们定义 f[i][j] 表示使得字符串 \\textit{word1} 的前 i 个字符和字符串 \\textit{word2} 的前 j 个字符相同的最小删除步数。那么答案为 f[m][n]，其中 m 和 n 分别是字符串 \\textit{word1} 和 \\textit{word2} 的长度。 初始时，如果 j = 0，那么 f[i][0] = i；如果 i = 0，那么 f[0][j] = j。 当 i, j > 0 时，如果 \\textit{word1}[i - 1] = \\textit{word2}[j - 1]，那么 f[i][j] = f[i - 1][j - 1]；否则 f[i][j] = \\min(f[i - 1][j], f[i][j - 1]) + 1。 最终返回 f[m][n] 即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是字符串 \\textit{word1} 和 \\textit{word2} 的长度。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个字符串的删除操作 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "74.6%",
    "difficulty": "中等",
    "frontendId": "712",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0712.Minimum%20ASCII%20Delete%20Sum%20for%20Two%20Strings/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Minimum ASCII Delete Sum for Two Strings",
    "titleCn": "两个字符串的最小ASCII删除和",
    "titleSlug": "minimum-ascii-delete-sum-for-two-strings",
    "url": "https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/description/",
    "statementPreview": "给定两个字符串 s1 和 s2，返回 使两个字符串相等所需删除字符的 ASCII 值的最小和。",
    "approachPreview": "我们定义 f[i][j] 表示使得 s_1 的前 i 个字符和 s_2 的前 j 个字符相等所需删除字符的 ASCII 值的最小和。那么答案就是 f[m][n]。 如果 s_1[i-1] = s_2[j-1]，那么 f[i][j] = f[i-1][j-1]。否则，我们可以删除 s_1[i-1] 或者 s_2[j-1] 中的一个，使得 f[i][j] 达到最小。因此，状态转移方程如下： f[i][j]= \\begin{cases} f[i-1][j-1], & s_1[i-1] = s_2[j-1] \\\\ min(f[i-1][j] + s_1[i-1], f[i][j-1] + s_2[j-1]), & s_1[i-1] \\neq s_2[j-1] \\end{cases} 初始状态为 f[0][j] = f[0][j-1] + s_2[j-1], f[i][0] = f[i-1][0] + s_1[i-1]。 最后返回 f[m][n] 即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是 s_1 和 s_2 的长度。 相似题目：",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个字符串的最小ASCII删除和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "55.7%",
    "difficulty": "困难",
    "frontendId": "1092",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1092.Shortest%20Common%20Supersequence/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Shortest Common Supersequence",
    "titleCn": "最短公共超序列",
    "titleSlug": "shortest-common-supersequence",
    "url": "https://leetcode.cn/problems/shortest-common-supersequence/description/",
    "statementPreview": "给你两个字符串 str1 和 str2，返回同时以 str1 和 str2 作为 子序列 的最短字符串。如果答案不止一个，则可以返回满足条件的 任意一个 答案。 如果从字符串 t 中删除一些字符（也可能不删除），可以得到字符串 s，那么 s 就是 t 的一个子序列。",
    "approachPreview": "我们先用动态规划求出两个字符串的最长公共子序列，然后根据最长公共子序列构造出最短公共超序列。 定义 f[i][j] 表示字符串 str1 的前 i 个字符和字符串 str2 的前 j 个字符的最长公共子序列的长度。状态转移方程如下： f[i][j] = \\begin{cases} 0 & i = 0 \\textit{ or } j = 0 \\\\ f[i - 1][j - 1] + 1 & str1[i - 1] = str2[j - 1] \\\\ \\max(f[i - 1][j], f[i][j - 1]) & str1[i - 1] \\neq str2[j - 1] \\end{cases} 接下来我们基于 f[i][j] 构造出最短公共超序列。 不妨对照着上面的示例字符串，来看看如何构造出最短公共超序列。 我们用双指针 i 和 j 分别指向字符串 str1 和 str2 的末尾，然后从后往前遍历，每次比较 str1[i] 和 str2[j] 的值： 如果 str1[i] = str2[j]，则将 str1[i] 或 str2[j] 中的任意一个字符加入到最答案序列的末尾，然后 i 和 j 同时减 1；",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最短公共超序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "67.7%",
    "difficulty": "中等",
    "frontendId": "1143",
    "paidOnly": false,
    "seriesKeys": [
      "string-dp"
    ],
    "seriesPrimaryKey": "string-dp",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1143.Longest%20Common%20Subsequence/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Common Subsequence",
    "titleCn": "最长公共子序列",
    "titleSlug": "longest-common-subsequence",
    "url": "https://leetcode.cn/problems/longest-common-subsequence/description/",
    "statementPreview": "给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列，返回 0。 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。 例如， \"ace\" 是 \"abcde\" 的子序列，但 \"aec\" 不是 \"abcde\" 的子序列。 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。",
    "approachPreview": "我们定义 f[i][j] 表示 text1 的前 i 个字符和 text2 的前 j 个字符的最长公共子序列的长度。那么答案为 f[m][n]，其中 m 和 n 分别为 text1 和 text2 的长度。 如果 text1 的第 i 个字符和 text2 的第 j 个字符相同，则 f[i][j] = f[i - 1][j - 1] + 1；如果 text1 的第 i 个字符和 text2 的第 j 个字符不同，则 f[i][j] = max(f[i - 1][j], f[i][j - 1])。即状态转移方程为： f[i][j] = \\begin{cases} f[i - 1][j - 1] + 1, & text1[i - 1] = text2[j - 1] \\\\ \\max(f[i - 1][j], f[i][j - 1]), & text1[i - 1] \\neq text2[j - 1] \\end{cases} 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别为 text1 和 text2 的长度。",
    "followUps": [
      {
        "question": "这题和字符串 DP 经典题里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长公共子序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "字符串二维 DP 的边界为什么容易错？",
        "answer": "dp[i][j] 往往表示两个前缀的关系，所以第 0 行和第 0 列代表空串参与匹配或编辑的状态；初始化错了，后续转移即使公式正确也会整体偏移。"
      }
    ]
  },
  {
    "acRate": "51.1%",
    "difficulty": "中等",
    "frontendId": "79",
    "paidOnly": false,
    "seriesKeys": [
      "word-series",
      "word-search"
    ],
    "seriesPrimaryKey": "word-series",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0079.Word%20Search/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Word Search",
    "titleCn": "单词搜索",
    "titleSlug": "word-search",
    "url": "https://leetcode.cn/problems/word-search/description/",
    "statementPreview": "给定一个 m x n 二维字符网格 board 和一个字符串单词 word。如果 word 存在于网格中，返回 true；否则，返回 false。 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。",
    "approachPreview": "我们可以枚举网格的每一个位置 (i, j) 作为搜索的起点，然后从起点开始进行深度优先搜索，如果可以搜索到单词的末尾，就说明单词存在，否则说明单词不存在。 因此，我们设计一个函数 dfs(i, j, k)，表示从网格的 (i, j) 位置出发，且从单词的第 k 个字符开始搜索，是否能够搜索成功。函数 dfs(i, j, k) 的执行步骤如下： 如果 k = word -1，说明已经搜索到单词的最后一个字符，此时只需要判断网格 (i, j) 位置的字符是否等于 word[k]，如果相等则说明单词存在，否则说明单词不存在。无论单词是否存在，都无需继续往下搜索，因此直接返回结果。 否则，如果 word[k] 字符不等于网格 (i, j) 位置的字符，说明本次搜索失败，直接返回 false。 否则，我们将网格 (i, j) 位置的字符暂存于 c 中，然后将此位置的字符修改为一个特殊字符 '0'，代表此位置的字符已经被使用过，防止之后搜索时重复使用。然后我们从 (i, j) 位置的上、下、左、右四个方向分别出发，去搜索网格中第 k+1 个字符，如果四个方向有任何一个方向搜索成功，就说明搜索成功，否则说明搜索失败，此时我们需要还原网格 (i, j) 位置的字符，即把 c 放回网格 (i, j) 位置（回溯）。",
    "followUps": [
      {
        "question": "这题和单词搜索/拆分/接龙里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词搜索 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词搜索/拆分/接龙时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "36.6%",
    "difficulty": "困难",
    "frontendId": "126",
    "paidOnly": false,
    "seriesKeys": [
      "word-series",
      "word-ladder"
    ],
    "seriesPrimaryKey": "word-series",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0126.Word%20Ladder%20II/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Word Ladder II",
    "titleCn": "单词接龙 II",
    "titleSlug": "word-ladder-ii",
    "url": "https://leetcode.cn/problems/word-ladder-ii/description/",
    "statementPreview": "按字典 wordList 完成从单词 beginWord 到单词 endWord 转化，一个表示此过程的 转换序列 是形式上像 beginWord -> s_1 -> s_2 -> ... -> s_k 这样的单词序列，并满足： 每对相邻的单词之间仅有单个字母不同。 转换过程中的每个单词 s_i （ 1 <= i <= k ）必须是字典 wordList 中的单词。注意， beginWord 不必是字典 wordList 中的单词。 s_k == endWord 给你两个单词 beginWord 和 endWord，以及一个字典 wordList。请你找出并返回所有从 beginWord 到 endWord 的 最短转换序列，如果不存在这样的转换序列，返回一个空列表。每个序列都应该以单词列表 [beginWord, s_1, s_2, ..., s_k] 的形式返回。",
    "approachPreview": "单词接龙 II 属于单词搜索/拆分/接龙中的一个变体。主要标签是 广度优先搜索、哈希表、字符串、回溯。先把字符关系转成计数、位置、前缀状态或自动机状态，再用这些状态判断合法性；实现时重点检查空串、重复字符和边界下标。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和单词搜索/拆分/接龙里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词接龙 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词搜索/拆分/接龙时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.4%",
    "difficulty": "困难",
    "frontendId": "127",
    "paidOnly": false,
    "seriesKeys": [
      "word-series",
      "word-ladder"
    ],
    "seriesPrimaryKey": "word-series",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0127.Word%20Ladder/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Word Ladder",
    "titleCn": "单词接龙",
    "titleSlug": "word-ladder",
    "url": "https://leetcode.cn/problems/word-ladder/description/",
    "statementPreview": "字典 wordList 中从单词 beginWord 到 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s_1 -> s_2 -> ... -> s_k： 每一对相邻的单词只差一个字母。 对于 1 <= i <= k 时，每个 s_i 都在 wordList 中。注意， beginWord 不需要在 wordList 中。 s_k == endWord 给你两个单词 beginWord 和 endWord 和一个字典 wordList，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目。如果不存在这样的转换序列，返回 0。",
    "approachPreview": "BFS 最小步数模型。本题可以用朴素 BFS，也可以用双向 BFS 优化搜索空间，从而提升效率。 双向 BFS 是 BFS 常见的一个优化方法，主要实现思路如下： 1. 创建两个队列 q1, q2 分别用于“起点 -> 终点”、“终点 -> 起点”两个方向的搜索； 2. 创建两个哈希表 m1, m2 分别记录访问过的节点以及对应的扩展次数（步数）； 3. 每次搜索时，优先选择元素数量较少的队列进行搜索扩展，如果在扩展过程中，搜索到另一个方向已经访问过的节点，说明找到了最短路径； 4. 只要其中一个队列为空，说明当前方向的搜索已经进行不下去了，说明起点到终点不连通，无需继续搜索。",
    "followUps": [
      {
        "question": "这题和单词搜索/拆分/接龙里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词接龙 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词搜索/拆分/接龙时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.8%",
    "difficulty": "中等",
    "frontendId": "211",
    "paidOnly": false,
    "seriesKeys": [
      "word-series",
      "trie-search-design"
    ],
    "seriesPrimaryKey": "word-series",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0211.Design%20Add%20and%20Search%20Words%20Data%20Structure/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Design Add and Search Words Data Structure",
    "titleCn": "添加与搜索单词 - 数据结构设计",
    "titleSlug": "design-add-and-search-words-data-structure",
    "url": "https://leetcode.cn/problems/design-add-and-search-words-data-structure/description/",
    "statementPreview": "请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配。 实现词典类 WordDictionary： WordDictionary() 初始化词典对象 void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配 bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true；否则，返回 false。 word 中可能包含一些 '.'，每个 . 都可以表示任何一个字母。",
    "approachPreview": "用 Trie 保存单词。普通字符沿对应子节点继续，遇到通配符 '.' 时枚举当前节点的所有子节点做 DFS；递归到单词末尾时检查终止标记。",
    "followUps": [
      {
        "question": "这题和单词搜索/拆分/接龙里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 添加与搜索单词 - 数据结构设计 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词搜索/拆分/接龙时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "43.6%",
    "difficulty": "困难",
    "frontendId": "212",
    "paidOnly": false,
    "seriesKeys": [
      "word-series",
      "word-search"
    ],
    "seriesPrimaryKey": "word-series",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0212.Word%20Search%20II/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Word Search II",
    "titleCn": "单词搜索 II",
    "titleSlug": "word-search-ii",
    "url": "https://leetcode.cn/problems/word-search-ii/description/",
    "statementPreview": "给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词。 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。",
    "approachPreview": "我们首先将 words 中的单词构建成前缀树，前缀树的每个节点包含一个长度为 26 的数组 children，表示该节点的子节点，数组的下标表示子节点对应的字符，数组的值表示子节点的引用。同时，每个节点还包含一个整数 ref，表示该节点对应的单词在 words 中的引用，如果该节点不是单词的结尾，则 ref 的值为 -1。 接下来，我们对于 board 中的每个单元格，从该单元格出发，进行深度优先搜索，搜索过程中，如果当前单词不是前缀树中的单词，则剪枝，如果当前单词是前缀树中的单词，则将该单词加入答案，并将该单词在前缀树中的引用置为 -1，表示该单词已经被找到，不需要再次搜索。 最后，我们将答案返回即可。 时间复杂度 (m \\times n \\times 3^{l-1})，空间复杂度 (k \\times l)。其中 m 和 n 分别是 board 的行数和列数。而 l 和 k 分别是 words 中的单词的平均长度和单词的个数。",
    "followUps": [
      {
        "question": "这题和单词搜索/拆分/接龙里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词搜索 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词搜索/拆分/接龙时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "75.3%",
    "difficulty": "困难",
    "frontendId": "51",
    "paidOnly": false,
    "seriesKeys": [
      "n-queens"
    ],
    "seriesPrimaryKey": "n-queens",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0051.N-Queens/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "N-Queens",
    "titleCn": "N 皇后",
    "titleSlug": "n-queens",
    "url": "https://leetcode.cn/problems/n-queens/description/",
    "statementPreview": "按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。 n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。 给你一个整数 n，返回所有不同的 n 皇后问题 的解决方案。 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。",
    "approachPreview": "我们定义三个数组 col, dg 和 udg，分别表示列、正对角线和反对角线上的是否有皇后，如果位置 (i, j) 有皇后，那么 col[j], dg[i + j] 和 udg[n - i + j] 都为 1。另外，我们用一个数组 g 记录当前棋盘的状态，初始时 g 中的所有元素都是 '.'。 接下来，我们定义一个函数 dfs(i)，表示从第 i 行开始放置皇后。 在 dfs(i) 中，如果 i=n，说明我们已经完成了所有皇后的放置，我们将当前 g 放入答案数组中，递归结束。 否则，我们枚举当前行的每一列 j，如果位置 (i, j) 没有皇后，即 col[j], dg[i + j] 和 udg[n - i + j] 都为 0，那么我们可以放置皇后，即把 g[i][j] 改为 'Q'，并将 col[j], dg[i + j] 和 udg[n - i + j] 都置为 1，然后继续搜索下一行，即调用 dfs(i + 1)，递归结束后，我们需要将 g[i][j] 改回 '.' 并将 col[j], dg[i + j] 和 udg[n - i + j] 都置为 0。 在主函数中，我们调用 dfs(0) 开始递归，最后返回答案数组即可。 时间复杂度 (n^2 \\times n!)，空间复杂度 O(n)。其中 n 是题目给定的整数。",
    "followUps": [
      {
        "question": "这题和N 皇后系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 N 皇后 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 皇后系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "82.9%",
    "difficulty": "困难",
    "frontendId": "52",
    "paidOnly": false,
    "seriesKeys": [
      "n-queens"
    ],
    "seriesPrimaryKey": "n-queens",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0052.N-Queens%20II/README.md",
    "tags": [
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "N-Queens II",
    "titleCn": "N 皇后 II",
    "titleSlug": "n-queens-ii",
    "url": "https://leetcode.cn/problems/n-queens-ii/description/",
    "statementPreview": "n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。 给你一个整数 n，返回 n 皇后问题 不同的解决方案的数量。",
    "approachPreview": "我们设计一个函数 dfs(i)，表示从第 i 行开始搜索，搜索到的结果累加到答案中。 在第 i 行，我们枚举第 i 行的每一列，如果当前列不与前面已经放置的皇后发生冲突，那么我们就可以放置一个皇后，然后继续搜索下一行，即调用 dfs(i + 1)。 如果发生冲突，那么我们就跳过当前列，继续枚举下一列。 判断是否发生冲突，我们需要用三个数组分别记录每一列、每一条正对角线、每一条反对角线是否已经放置了皇后。 具体地，我们用 cols 数组记录每一列是否已经放置了皇后，用 dg 数组记录每一条正对角线是否已经放置了皇后，用 udg 数组记录每一条反对角线是否已经放置了皇后。 时间复杂度 O(n!)，空间复杂度 O(n)。其中 n 是皇后的数量。",
    "followUps": [
      {
        "question": "这题和N 皇后系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 N 皇后 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷N 皇后系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "83.0%",
    "difficulty": "中等",
    "frontendId": "173",
    "paidOnly": false,
    "seriesKeys": [
      "bst-iterator"
    ],
    "seriesPrimaryKey": "bst-iterator",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0173.Binary%20Search%20Tree%20Iterator/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      },
      {
        "slug": "iterator",
        "name": "迭代器"
      }
    ],
    "title": "Binary Search Tree Iterator",
    "titleCn": "二叉搜索树迭代器",
    "titleSlug": "binary-search-tree-iterator",
    "url": "https://leetcode.cn/problems/binary-search-tree-iterator/description/",
    "statementPreview": "实现一个二叉搜索树迭代器类 BSTIterator，表示一个按中序遍历二叉搜索树（BST）的迭代器： BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。 boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true；否则返回 false。 int next() 将指针向右移动，然后返回指针处的数字。 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。",
    "approachPreview": "初始化数据时，递归中序遍历，将二叉搜索树每个结点的值保存在列表 vals 中。用 cur 指针记录外部即将遍历的位置，初始化为 0。 调用 next() 时，返回 vals[cur]，同时 cur 指针自增。调用 hasNext() 时，判断 cur 指针是否已经达到 len(vals) 个数，若是，说明已经遍历结束，返回 false，否则返回 true。",
    "followUps": [
      {
        "question": "这题和BST 迭代器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉搜索树迭代器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷BST 迭代器系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "79.8%",
    "difficulty": "中等",
    "frontendId": "230",
    "paidOnly": false,
    "seriesKeys": [
      "bst-iterator",
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "bst-iterator",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0230.Kth%20Smallest%20Element%20in%20a%20BST/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Kth Smallest Element in a BST",
    "titleCn": "二叉搜索树中第 K 小的元素",
    "titleSlug": "kth-smallest-element-in-a-bst",
    "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/",
    "statementPreview": "给定一个二叉搜索树的根节点 root，和一个整数 k，请你设计一个算法查找其中第 k 小的元素（ k 从 1 开始计数）。",
    "approachPreview": "二叉搜索树中第 K 小的元素 属于BST 迭代器系列中的一个变体。主要标签是 树、深度优先搜索、二叉搜索树、二叉树。先判断答案来自子树内部还是跨过当前节点，再用递归返回父节点真正需要的信息；带父指针或多节点条件时要额外维护访问来源。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和BST 迭代器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉搜索树中第 K 小的元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷BST 迭代器系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.0%",
    "difficulty": "中等",
    "frontendId": "1586",
    "paidOnly": true,
    "seriesKeys": [
      "bst-iterator"
    ],
    "seriesPrimaryKey": "bst-iterator",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1586.Binary%20Search%20Tree%20Iterator%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      },
      {
        "slug": "iterator",
        "name": "迭代器"
      }
    ],
    "title": "Binary Search Tree Iterator II",
    "titleCn": "二叉搜索树迭代器 II",
    "titleSlug": "binary-search-tree-iterator-ii",
    "url": "https://leetcode.cn/problems/binary-search-tree-iterator-ii/description/",
    "statementPreview": "实现二叉搜索树（BST）的 中序遍历 迭代器 BSTIterator 类： BSTIterator(TreeNode root) 初始化 BSTIterator 类的实例。二叉搜索树的根节点 root 作为构造函数的参数传入。内部指针使用一个不存在于树中且小于树中任意值的数值来初始化。 boolean hasNext() 如果当前指针在中序遍历序列中，存在右侧数值，返回 true，否则返回 false。 int next() 将指针在中序遍历序列中向右移动，然后返回移动后指针所指数值。 boolean hasPrev() 如果当前指针在中序遍历序列中，存在左侧数值，返回 true，否则返回 false。 int prev() 将指针在中序遍历序列中向左移动，然后返回移动后指针所指数值。 注意，虽然我们使用树中不存在的最小值来初始化内部指针，第一次调用 next() 需要返回二叉搜索树中最小的元素。 你可以假设 next() 和 prev() 的调用总是有效的。即，当 next() / prev() 被调用的时候，在中序遍历序列中一定存在下一个/上一个元素。 进阶： 你可以不提前遍历树中的值来解决问题吗？",
    "approachPreview": "我们可以使用中序遍历将二叉搜索树的所有节点的值存储到数组 nums 中，然后使用数组实现迭代器。我们定义一个指针 i，初始时 i = -1，表示指向数组 nums 中的一个元素。每次调用 next() 时，我们将 i 的值加 1，并返回 nums[i]；每次调用 prev() 时，我们将 i 的值减 1，并返回 nums[i]。 时间复杂度方面，初始化迭代器需要 O(n) 的时间，其中 n 是二叉搜索树的节点数。每次调用 next() 和 prev() 都需要 O(1) 的时间。空间复杂度方面，我们需要 O(n) 的空间存储二叉搜索树的所有节点的值。",
    "followUps": [
      {
        "question": "这题和BST 迭代器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉搜索树迭代器 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷BST 迭代器系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.9%",
    "difficulty": "困难",
    "frontendId": "25",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-reversal"
    ],
    "seriesPrimaryKey": "linked-list-reversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0025.Reverse%20Nodes%20in%20k-Group/README.md",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Reverse Nodes in k-Group",
    "titleCn": "K 个一组翻转链表",
    "titleSlug": "reverse-nodes-in-k-group",
    "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/description/",
    "statementPreview": "给你链表的头节点 head，每 k 个节点一组进行翻转，请你返回修改后的链表。 k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。",
    "approachPreview": "我们可以根据题意，模拟整个翻转的过程。 首先，我们定义一个辅助函数 \\textit{reverse}，用于翻转一个链表。然后，我们定义一个虚拟头结点 \\textit{dummy}，并将其 \\textit{next} 指针指向 \\textit{head}。 接着，我们遍历链表，每次遍历 k 个节点，若剩余节点不足 k 个，则不进行翻转。否则，我们将 k 个节点取出，然后调用 \\textit{reverse} 函数翻转这 k 个节点。然后将翻转后的链表与原链表连接起来。继续遍历下一个 k 个节点，直到遍历完整个链表。 时间复杂度 O(n)，其中 n 为链表的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和链表翻转系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 K 个一组翻转链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷链表翻转系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.3%",
    "difficulty": "中等",
    "frontendId": "92",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-reversal",
      "reverse-linked-list"
    ],
    "seriesPrimaryKey": "linked-list-reversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0092.Reverse%20Linked%20List%20II/README.md",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Reverse Linked List II",
    "titleCn": "反转链表 II",
    "titleSlug": "reverse-linked-list-ii",
    "url": "https://leetcode.cn/problems/reverse-linked-list-ii/description/",
    "statementPreview": "给你单链表的头指针 head 和两个整数 left 和 right，其中 left <= right。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表。",
    "approachPreview": "定义一个虚拟头结点 dummy，指向链表的头结点 head，然后定义一个指针 pre 指向 dummy，从虚拟头结点开始遍历链表，遍历到第 left 个结点时，将 pre 指向该结点，然后从该结点开始遍历 right - left + 1 次，将遍历到的结点依次插入到 pre 的后面，最后返回 dummy.next 即可。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 为链表的长度。",
    "followUps": [
      {
        "question": "这题和链表翻转系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转链表 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷链表翻转系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.4%",
    "difficulty": "简单",
    "frontendId": "206",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-reversal",
      "reverse-linked-list"
    ],
    "seriesPrimaryKey": "linked-list-reversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0206.Reverse%20Linked%20List/README.md",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Reverse Linked List",
    "titleCn": "反转链表",
    "titleSlug": "reverse-linked-list",
    "url": "https://leetcode.cn/problems/reverse-linked-list/description/",
    "statementPreview": "给你单链表的头节点 head，请你反转链表，并返回反转后的链表。",
    "approachPreview": "我们创建一个虚拟头节点 \\textit{dummy}，然后遍历链表，将每个节点依次插入 \\textit{dummy} 的下一个节点。遍历结束，返回 \\textit{dummy.next}。 时间复杂度 O(n)，其中 n 为链表的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和链表翻转系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷链表翻转系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.1%",
    "difficulty": "中等",
    "frontendId": "2074",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-reversal"
    ],
    "seriesPrimaryKey": "linked-list-reversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2074.Reverse%20Nodes%20in%20Even%20Length%20Groups/README.md",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Reverse Nodes in Even Length Groups",
    "titleCn": "反转偶数长度组的节点",
    "titleSlug": "reverse-nodes-in-even-length-groups",
    "url": "https://leetcode.cn/problems/reverse-nodes-in-even-length-groups/description/",
    "statementPreview": "给你一个链表的头节点 head。 链表中的节点 按顺序 划分成若干 非空 组，这些非空组的长度构成一个自然数序列（ 1, 2, 3, 4, ... ）。一个组的 长度 就是组中分配到的节点数目。换句话说： 节点 1 分配给第一组 节点 2 和 3 分配给第二组 节点 4、 5 和 6 分配给第三组，以此类推 注意，最后一组的长度可能小于或者等于 1 + 倒数第二组的长度。 反转 每个 偶数 长度组中的节点，并返回修改后链表的头节点 head。",
    "approachPreview": "链表按长度 1、2、3... 分组遍历，最后一组按实际长度计算。若当前组实际长度为偶数，就原地反转这一段并接回前后节点；否则只移动指针继续下一组。",
    "followUps": [
      {
        "question": "这题和链表翻转系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转偶数长度组的节点 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷链表翻转系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.9%",
    "difficulty": "中等",
    "frontendId": "162",
    "paidOnly": false,
    "seriesKeys": [
      "find-peak-element"
    ],
    "seriesPrimaryKey": "find-peak-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0162.Find%20Peak%20Element/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Find Peak Element",
    "titleCn": "寻找峰值",
    "titleSlug": "find-peak-element",
    "url": "https://leetcode.cn/problems/find-peak-element/description/",
    "statementPreview": "峰值元素是指其值严格大于左右相邻值的元素。 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。 你可以假设 nums[-1] = nums[n] = -∞。 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。",
    "approachPreview": "我们定义二分查找的左边界 left=0，右边界 right=n-1，其中 n 是数组的长度。在每一步二分查找中，我们找到当前区间的中间元素 mid，然后比较 mid 与其右边元素 mid+1 的值： 如果 mid 的值大于 mid+1 的值，则左侧存在峰值元素，我们将右边界 right 更新为 mid； 否则，右侧存在峰值元素，我们将左边界 left 更新为 mid+1。 最后，当左边界 left 与右边界 right 相等时，我们就找到了数组的峰值元素。 时间复杂度 O(\\log n)，其中 n 是数组 nums 的长度。每一步二分查找可以将搜索区间减少一半，因此时间复杂度为 O(\\log n)。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和寻找峰值系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找峰值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷寻找峰值系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.7%",
    "difficulty": "中等",
    "frontendId": "1901",
    "paidOnly": false,
    "seriesKeys": [
      "find-peak-element"
    ],
    "seriesPrimaryKey": "find-peak-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1901.Find%20a%20Peak%20Element%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Find a Peak Element II",
    "titleCn": "寻找峰值 II",
    "titleSlug": "find-a-peak-element-ii",
    "url": "https://leetcode.cn/problems/find-a-peak-element-ii/description/",
    "statementPreview": "一个 2D 网格中的 峰值 是指那些 严格大于 其相邻格子(上、下、左、右)的元素。 给你一个 从 0 开始编号 的 m x n 矩阵 mat，其中任意两个相邻格子的值都 不相同。找出 任意一个 峰值 mat[i][j] 并 返回其位置 [i,j]。 你可以假设整个矩阵周边环绕着一圈值为 -1 的格子。 要求必须写出时间复杂度为 O(m log(n)) 或 O(n log(m)) 的算法",
    "approachPreview": "记 m 和 n 分别为矩阵的行数和列数。 题目要求我们寻找峰值，并且时间复杂度为 O(m \\times \\log n) 或 O(n \\times \\log m)，那么我们可以考虑使用二分查找。 我们考虑第 i 行的最大值，不妨将其下标记为 j。 如果 mat[i][j] \\gt mat[i + 1][j]，那么第 [0,..i] 行中必然存在一个峰值，我们只需要在第 [0,..i] 行中找到最大值即可。同理，如果 mat[i][j] \\lt mat[i + 1][j]，那么第 [i + 1,..m - 1] 行中必然存在一个峰值，我们只需要在第 [i + 1,..m - 1] 行中找到最大值即可。 为什么上述做法是对的？我们不妨用反证法来证明。 如果 mat[i][j] \\gt mat[i + 1][j]，假设第 [0,..i] 行中不存在峰值，那么 mat[i][j] 不是峰值，而由于 mat[i][j] 是第 i 行的最大值，并且 mat[i][j] \\gt mat[i + 1][j]，那么 mat[i][j] \\lt mat[i - 1][j]。我们继续从第 i - 1 行往上考虑，每一行的最大值都小于上一行的最大值。那么当遍历到 i = 0 时，由于矩阵中的元素都是正整数，并且矩阵周边一圈的格子的值都为 -1。因此，在第 0 行时，其最大值大于其所有相邻元素，那么第 0 行的最大值就是峰值，与假设矛盾。",
    "followUps": [
      {
        "question": "这题和寻找峰值系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找峰值 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷寻找峰值系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.6%",
    "difficulty": "中等",
    "frontendId": "208",
    "paidOnly": false,
    "seriesKeys": [
      "implement-trie",
      "trie-search-design"
    ],
    "seriesPrimaryKey": "implement-trie",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0208.Implement%20Trie%20(Prefix%20Tree)/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Implement Trie (Prefix Tree)",
    "titleCn": "实现 Trie (前缀树)",
    "titleSlug": "implement-trie-prefix-tree",
    "url": "https://leetcode.cn/problems/implement-trie-prefix-tree/description/",
    "statementPreview": "Trie （发音类似 \"try\"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。 请你实现 Trie 类： Trie() 初始化前缀树对象。 void insert(String word) 向前缀树中插入字符串 word。 boolean search(String word) 如果字符串 word 在前缀树中，返回 true （即，在检索之前已经插入）；否则，返回 false。 boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix，返回 true；否则，返回 false。",
    "approachPreview": "前缀树每个节点包括两部分： 1. 指向子节点的指针数组 children，对于本题而言，数组长度为 26，即小写英文字母的数量。children[0] 对应小写字母 a，...，children[25] 对应小写字母 z。 1. 布尔字段 isEnd，表示该节点是否为字符串的结尾。 1. 插入字符串 我们从字典树的根开始，插入字符串。对于当前字符对应的子节点，有两种情况： 子节点存在。沿着指针移动到子节点，继续处理下一个字符。 子节点不存在。创建一个新的子节点，记录在 children 数组的对应位置上，然后沿着指针移动到子节点，继续搜索下一个字符。 重复以上步骤，直到处理字符串的最后一个字符，然后将当前节点标记为字符串的结尾。 2. 查找前缀 我们从字典树的根开始，查找前缀。对于当前字符对应的子节点，有两种情况： 子节点存在。沿着指针移动到子节点，继续搜索下一个字符。 子节点不存在。说明字典树中不包含该前缀，返回空指针。 重复以上步骤，直到返回空指针或搜索完前缀的最后一个字符。 若搜索到了前缀的末尾，就说明字典树中存在该前缀。此外，若前缀末尾对应节点的 isEnd 为真，则说明字典树中存在该字符串。 时间复杂度方面，插入字符串的时间复杂度为 O(m \\times \\Sigma )，查找前缀的时间复杂度为 O(m)，其中 m 为字符串的长度，而 \\Sigma 为字符集的大小（本题中为 26）。",
    "followUps": [
      {
        "question": "这题和Trie 实现系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 实现 Trie (前缀树) 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷Trie 实现系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "56.7%",
    "difficulty": "中等",
    "frontendId": "1804",
    "paidOnly": true,
    "seriesKeys": [
      "implement-trie",
      "trie-search-design"
    ],
    "seriesPrimaryKey": "implement-trie",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1800-1899/1804.Implement%20Trie%20II%20(Prefix%20Tree)/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Implement Trie II (Prefix Tree)",
    "titleCn": "实现 Trie （前缀树） II",
    "titleSlug": "implement-trie-ii-prefix-tree",
    "url": "https://leetcode.cn/problems/implement-trie-ii-prefix-tree/description/",
    "statementPreview": "前缀树（ trie，发音为 \"try\"）是一个树状的数据结构，用于高效地存储和检索一系列字符串的前缀。前缀树有许多应用，如自动补全和拼写检查。 实现前缀树 Trie 类： Trie() 初始化前缀树对象。 void insert(String word) 将字符串 word 插入前缀树中。 int countWordsEqualTo(String word) 返回前缀树中字符串 word 的实例个数。 int countWordsStartingWith(String prefix) 返回前缀树中以 prefix 为前缀的字符串个数。 void erase(String word) 从前缀树中移除字符串 word。",
    "approachPreview": "前缀树每个节点包括三部分： 1. 指向子节点的指针数组 children，对于本题而言，数组长度为 26，即小写英文字母的数量。 children[0] 对应小写字母 a，...， children[25] 对应小写字母 z。 1. int 变量 v，表示以该节点结尾的字符串个数。 1. int 变量 pv，表示以该节点作为前缀节点的字符串个数。 1. 插入字符串 我们从字典树的根开始，插入字符串。对于当前字符对应的子节点，有两种情况： 子节点存在。沿着指针移动到子节点，继续处理下一个字符。 子节点不存在。创建一个新的子节点，记录在 children 数组的对应位置上，然后沿着指针移动到子节点，让子节点的 pv 值加 1。继续搜索下一个字符。 重复以上步骤，直到处理字符串的最后一个字符，然后将当前节点的 v 值加 1。 时间复杂度 O(n)，其中 n 为字符串的长度。 2. 查找前缀 我们从字典树的根开始，查找前缀。对于当前字符对应的子节点，有两种情况： 子节点存在。沿着指针移动到子节点，继续搜索下一个字符。 子节点不存在。说明字典树中不包含该前缀，返回空指针。 重复以上步骤，直到返回空指针或搜索完前缀的最后一个字符。 时间复杂度 O(n)，其中 n 为字符串的长度。 3. 移除字符串 我们从字典树的根节点开始，依次将对应的子节点的 pv 值减 1，直到搜索完字符串的最后一个字符。然后将当前节点的 v 值减 1。",
    "followUps": [
      {
        "question": "这题和Trie 实现系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 实现 Trie （前缀树） II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷Trie 实现系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "64.6%",
    "difficulty": "困难",
    "frontendId": "425",
    "paidOnly": true,
    "seriesKeys": [
      "trie-search-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0425.Word%20Squares/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Word Squares",
    "titleCn": "单词方块",
    "titleSlug": "word-squares",
    "url": "https://leetcode.cn/problems/word-squares/description/",
    "statementPreview": "给定一个单词集合 words （没有重复），找出并返回其中所有的 单词方块。 words 中的同一个单词可以被 多次 使用。你可以按 任意顺序 返回答案。 一个单词序列形成了一个有效的 单词方块 的意思是指从第 k 行和第 k 列 0 <= k < max(numRows, numColumns) 来看都是相同的字符串。 例如，单词序列 [\"ball\",\"area\",\"lead\",\"lady\"] 形成了一个单词方块，因为每个单词从水平方向看和从竖直方向看都是相同的。",
    "approachPreview": "根据已添加单词确定下一个单词的前缀，继续进行搜索。 比如已经添加了两个单词 ball 和 area，要添加下一个单词，我们首先要获取下一个单词的前缀，第一个字母是第一个单词的第三个位置 l，第二个字母是第二个单词的第三个位置 e，这样就构成了前缀 le。然后找出所有前缀为 le 的单词，作为下一个单词。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词方块 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "53.9%",
    "difficulty": "困难",
    "frontendId": "642",
    "paidOnly": true,
    "seriesKeys": [
      "trie-search-design",
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0642.Design%20Search%20Autocomplete%20System/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Design Search Autocomplete System",
    "titleCn": "设计搜索自动补全系统",
    "titleSlug": "design-search-autocomplete-system",
    "url": "https://leetcode.cn/problems/design-search-autocomplete-system/description/",
    "statementPreview": "为搜索引擎设计一个搜索自动补全系统。用户会输入一条语句（最少包含一个字母，以特殊字符 '#' 结尾）。 给定一个字符串数组 sentences 和一个整数数组 times，长度都为 n，其中 sentences[i] 是之前输入的句子， times[i] 是该句子输入的相应次数。对于除 ‘#’ 以外的每个输入字符，返回前 3 个历史热门句子，这些句子的前缀与已经输入的句子的部分相同。 下面是详细规则： 一条句子的热度定义为历史上用户输入这个句子的总次数。 返回前 3 的句子需要按照热度从高到低排序（第一个是最热门的）。如果有多条热度相同的句子，请按照 ASCII 码的顺序输出（ASCII 码越小排名越前）。 如果满足条件的句子个数少于 3，将它们全部输出。 如果输入了特殊字符，意味着句子结束了，请返回一个空集合。 实现 AutocompleteSystem 类： AutocompleteSystem(String[] sentences, int[] times): 使用数组 sentences 和 times 对对象进行初始化。 List<String> input(char c) 表示用户输入了字符 c。 如果 c == '#'，则返回空数组 []，并将输入的语句存储在系统中。",
    "approachPreview": "设计搜索自动补全系统 属于Trie 搜索与推荐设计中的一个变体。主要标签是 深度优先搜索、设计、字典树、字符串、数据流、排序、堆（优先队列）。先把每个 API 需要维护的状态列出来，再选择哈希表、堆、链表或树等结构保证更新和查询复杂度；实现时要让初始化、重复调用和空结构行为都可预测。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计搜索自动补全系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "63.9%",
    "difficulty": "中等",
    "frontendId": "648",
    "paidOnly": false,
    "seriesKeys": [
      "trie-search-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0648.Replace%20Words/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Replace Words",
    "titleCn": "单词替换",
    "titleSlug": "replace-words",
    "url": "https://leetcode.cn/problems/replace-words/description/",
    "statementPreview": "在英语中，我们有一个叫做 词根 (root) 的概念，可以词根 后面 添加其他一些词组成另一个较长的单词——我们称这个词为 衍生词 ( derivative )。例如，词根 help，跟随着 继承 词 \"ful\"，可以形成新的单词 \"helpful\"。 现在，给定一个由许多 词根 组成的词典 dictionary 和一个用空格分隔单词形成的句子 sentence。你需要将句子中的所有 衍生词 用 词根 替换掉。如果 衍生词 有许多可以形成它的 词根，则用 最短 的 词根 替换它。 你需要输出替换之后的句子。",
    "approachPreview": "我们可以使用前缀树来存储词典中的所有词根。定义前缀树节点类 \\text{Trie}，其中包含一个长度为 26 的数组 \\text{children} 来存储子节点，以及一个布尔变量 \\text{is\\_end} 来标记是否为一个完整的词根。 对于每个词根，我们将其插入前缀树中。对于句子中的每个单词，我们在前缀树中搜索其最短的词根，如果找到了，则替换该单词，否则保持不变。 时间复杂度 O(n \\times w + L)，空间复杂度 O(n \\times w )，其中 n 和 w 分别是词典中词根的数量和平均长度，而 L 是句子中单词的总长度。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词替换 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "67.2%",
    "difficulty": "中等",
    "frontendId": "676",
    "paidOnly": false,
    "seriesKeys": [
      "trie-search-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0676.Implement%20Magic%20Dictionary/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Implement Magic Dictionary",
    "titleCn": "实现一个魔法字典",
    "titleSlug": "implement-magic-dictionary",
    "url": "https://leetcode.cn/problems/implement-magic-dictionary/description/",
    "statementPreview": "设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同。 如果给出一个单词，请判定能否只将这个单词中 一个 字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。 实现 MagicDictionary 类： MagicDictionary() 初始化对象 void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构， dictionary 中的字符串互不相同 bool search(String searchWord) 给定一个字符串 searchWord，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true；否则，返回 false。",
    "approachPreview": "我们可以使用前缀树来存储字典中的所有单词，然后对于每个搜索的单词，我们使用深度优先搜索的方法，具体地，我们从前缀树的根节点开始，对于当前遍历到的字母，我们首先判断是否存在与其相同的子节点，如果存在，则继续向下遍历，否则我们需要判断是否还有剩余的修改次数，如果没有，则说明无法匹配，返回 false。如果有剩余的修改次数，我们可以尝试对当前的字母进行修改，然后继续向下遍历，如果当前的字母修改后对应的子节点存在，则说明可以匹配，否则说明无法匹配，返回 false。如果我们遍历到了单词的结尾，且修改次数恰好为 1，那么说明可以匹配，返回 true。 时间复杂度 O(n \\times l + q \\times l \\times \\Sigma )，空间复杂度 O(n \\times l)，其中 n 和 l 分别是字典中的单词数量和单词的平均长度，而 q 是搜索的单词数量。另外 \\Sigma 表示字符集的大小，这里字符集为小写英文字母，因此 \\Sigma =26。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 实现一个魔法字典 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "62.6%",
    "difficulty": "中等",
    "frontendId": "1268",
    "paidOnly": false,
    "seriesKeys": [
      "trie-search-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1268.Search%20Suggestions%20System/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Search Suggestions System",
    "titleCn": "搜索推荐系统",
    "titleSlug": "search-suggestions-system",
    "url": "https://leetcode.cn/problems/search-suggestions-system/description/",
    "statementPreview": "给你一个产品数组 products 和一个字符串 searchWord， products 数组中每个产品都是一个字符串。 请你设计一个推荐系统，在依次输入单词 searchWord 的每一个字母后，推荐 products 数组中前缀与 searchWord 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，请按字典序返回最小的三个。 请你以二维列表的形式，返回在输入 searchWord 每个字母后相应的推荐产品的列表。",
    "approachPreview": "题目要求在输入 searchWord 的每一个字母后，推荐 products 数组中前缀与 searchWord 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，按字典序返回最小的三个。 找前缀相同的产品，可以使用前缀树；而要返回字典序最小的三个产品，我们可以先对 products 数组进行排序，然后将排序后的数组下标存入前缀树中。 前缀树的每个节点维护以下信息： children：这是一个长度为 26 的数组，用于存储当前节点的子节点， children[i] 表示当前节点的子节点中字符为 i + 'a' 的节点。 v：这是一个数组，用于存储当前节点的子节点中的字符在 products 数组中的下标，最多存储三个下标。 搜索时，我们从前缀树的根节点开始，找到每一个前缀对应的下标数组，将其存入结果数组中。最后只需要将每个下标数组中的下标对应到 products 数组中即可。 时间复杂度 O(L \\times \\log n + m)，空间复杂度 O(L)。其中 L 是 products 数组所有字符串的长度之和，而 n 和 m 分别是 products 数组的长度和 searchWord 的长度。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 搜索推荐系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "50.2%",
    "difficulty": "中等",
    "frontendId": "3799",
    "paidOnly": false,
    "seriesKeys": [
      "trie-search-design"
    ],
    "seriesPrimaryKey": "trie-search-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3700-3799/3799.Word%20Squares%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Word Squares II",
    "titleCn": "单词方块 II",
    "titleSlug": "word-squares-ii",
    "url": "https://leetcode.cn/problems/word-squares-ii/description/",
    "statementPreview": "给你一个字符串数组 words，包含一组 互不相同 且由小写英文字母组成的四字母字符串。 单词方块 由 4 个 互不相同 的单词组成： top , left , right 和 bottom，它们按如下方式排列： top 形成 顶部行。 bottom 形成 底部行。 left 形成 左侧列 （从上到下）。 right 形成 右侧列 （从上到下）。 它必须满足以下条件： top[0] == left[0] , top[3] == right[0] bottom[0] == left[3] , bottom[3] == right[3] 返回所有满足题目要求的 不同 单词方块，按 4 元组 (top, left, right, bottom)​​​​​​​ 的 字典序升序 排序。",
    "approachPreview": "单词方块 II 属于Trie 搜索与推荐设计中的一个变体。主要标签是 数组、字符串、回溯、枚举、排序。先把字符关系转成计数、位置、前缀状态或自动机状态，再用这些状态判断合法性；实现时重点检查空串、重复字符和边界下标。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Trie 搜索与推荐设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词方块 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "Trie 设计题什么时候需要在节点上额外存信息？",
        "answer": "如果只查单词和前缀，终止标记就够；如果要删除、统计、推荐或自动补全，就要在节点上维护计数、top 候选或子树元数据，并在插入删除时同步更新。"
      }
    ]
  },
  {
    "acRate": "22.0%",
    "difficulty": "中等",
    "frontendId": "8",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0008.String%20to%20Integer%20(atoi)/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "String to Integer (atoi)",
    "titleCn": "字符串转换整数 (atoi)",
    "titleSlug": "string-to-integer-atoi",
    "url": "https://leetcode.cn/problems/string-to-integer-atoi/description/",
    "statementPreview": "请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数。 函数 myAtoi(string s) 的算法如下： 空格： 读入字符串并丢弃无用的前导空格（ \" \" ） 符号： 检查下一个字符（假设还未到字符末尾）为 '-' 还是 '+'。如果两者都不存在，则假定结果为正。 转换： 通过跳过前置零来读取该整数，直到遇到非数字字符或到达字符串的结尾。如果没有读取数字，则结果为0。 舍入： 如果整数数超过 32 位有符号整数范围 [−2^31, 2^31 − 1]，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −2^31 的整数应该被舍入为 −2^31，大于 2^31 − 1 的整数应该被舍入为 2^31 − 1。 返回整数作为最终结果。",
    "approachPreview": "我们首先判断字符串是否为空，如果是，直接返回 0。 否则，我们需要遍历字符串，跳过前导空格，判断第一个非空格字符是否为正负号。 接着遍历后面的字符，如果是数字，我们判断添加该数字是否会导致整数溢出，如果会，我们根据正负号返回结果。否则我们将数字添加到结果中。继续遍历后面的字符，直到遇到非数字字符或者遍历结束。 遍历结束后，我们根据正负号返回结果。 时间复杂度 O(n)，其中 n 为字符串的长度。我们只需要依次处理所有字符。空间复杂度 O(1)。 同。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 字符串转换整数 (atoi) 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "28.3%",
    "difficulty": "困难",
    "frontendId": "65",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0065.Valid%20Number/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Valid Number",
    "titleCn": "有效数字",
    "titleSlug": "valid-number",
    "url": "https://leetcode.cn/problems/valid-number/description/",
    "statementPreview": "给定一个字符串 s，返回 s 是否是一个 有效数字。 例如，下面的都是有效数字： \"2\", \"0089\", \"-0.1\", \"+3.14\", \"4.\", \"-.9\", \"2e10\", \"-90E3\", \"3e+7\", \"+6e-1\", \"53.5e93\", \"-123.456e789\"，而接下来的不是： \"abc\", \"1a\", \"1e\", \"e3\", \"99e2.5\", \"--6\", \"-+3\", \"95a54e53\"。 一般的，一个 有效数字 可以用以下的规则之一定义： 一个 整数 后面跟着一个 可选指数。 一个 十进制数 后面跟着一个 可选指数。 一个 整数 定义为一个 可选符号 '-' 或 '+' 后面跟着 数字。 一个 十进制数 定义为一个 可选符号 '-' 或 '+' 后面跟着下述规则： 数字 后跟着一个 小数点 .。 数字 后跟着一个 小数点 . 再跟着 数位。 一个 小数点 . 后跟着 数位。 指数 定义为指数符号 'e' 或 'E'，后面跟着一个 整数。 数字 定义为一个或多个数位。",
    "approachPreview": "首先，我们判断字符串是否以正负号开头，如果是，将指针 i 向后移动一位。如果此时指针 i 已经到达字符串末尾，说明字符串只有一个正负号，返回 false。 如果当前指针 i 指向的字符是小数点，并且小数点后面没有数字，或者小数点后是一个 e 或 E，返回 false。 接着，我们用两个变量 dot 和 e 分别记录小数点和 e 或 E 的个数。 用指针 j 指向当前字符： 如果当前字符是小数点，并且此前出现过小数点或者 e 或 E，返回 false。否则，我们将 dot 加一； 如果当前字符是 e 或 E，并且此前出现过 e 或 E，或者当前字符是开头或结尾，返回 false。否则，我们将 e 加一；然后判断下一个字符是否是正负号，如果是，将指针 j 向后移动一位。如果此时指针 j 已经到达字符串末尾，返回 false； 如果当前字符不是数字，返回 false。 遍历完字符串后，返回 true。 时间复杂度 O(n)，其中 n 为字符串长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有效数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "57.3%",
    "difficulty": "中等",
    "frontendId": "150",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0150.Evaluate%20Reverse%20Polish%20Notation/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Evaluate Reverse Polish Notation",
    "titleCn": "逆波兰表达式求值",
    "titleSlug": "evaluate-reverse-polish-notation",
    "url": "https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/",
    "statementPreview": "给你一个字符串数组 tokens，表示一个根据 逆波兰表示法 表示的算术表达式。 请你计算该表达式。返回一个表示表达式值的整数。 注意： 有效的算符为 '+'、 '-'、 '*' 和 '/'。 每个操作数（运算对象）都可以是一个整数或者另一个表达式。 两个整数之间的除法总是 向零截断。 表达式中不含除零运算。 输入是一个根据逆波兰表示法表示的算术表达式。 答案及所有中间计算结果可以用 32 位 整数表示。",
    "approachPreview": "逆波兰表达式求值 属于手写解析器系列中的一个变体。主要标签是 栈、数组、数学。先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 逆波兰表达式求值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "55.7%",
    "difficulty": "中等",
    "frontendId": "165",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0165.Compare%20Version%20Numbers/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Compare Version Numbers",
    "titleCn": "比较版本号",
    "titleSlug": "compare-version-numbers",
    "url": "https://leetcode.cn/problems/compare-version-numbers/description/",
    "statementPreview": "给你两个 版本号字符串 version1 和 version2，请你比较它们。版本号由被点 '.' 分开的修订号组成。 修订号的值 是它 转换为整数 并忽略前导零。 比较版本号时，请按 从左到右的顺序 依次比较它们的修订号。如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0。 返回规则如下： 如果 version1 < version2 返回 -1， 如果 version1 > version2 返回 1， 除此之外返回 0。",
    "approachPreview": "同时遍历两个字符串，用两个指针 i 和 j 分别指向两个字符串的当前位置，初始时 i = j = 0。 每次取出两个字符串中对应的修订号，记为 a 和 b，比较 a 和 b 的大小，如果 a \\lt b，则返回 -1；如果 a \\gt b，则返回 1；如果 a = b，则继续比较下一对修订号。 时间复杂度 O(\\max(m, n))，空间复杂度 O(1)。其中 m 和 n 分别是两个字符串的长度。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 比较版本号 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "43.8%",
    "difficulty": "困难",
    "frontendId": "224",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser",
      "basic-calculator"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0224.Basic%20Calculator/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Basic Calculator",
    "titleCn": "基本计算器",
    "titleSlug": "basic-calculator",
    "url": "https://leetcode.cn/problems/basic-calculator/description/",
    "statementPreview": "给你一个字符串表达式 s，请你实现一个基本计算器来计算并返回它的值。 注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval()。",
    "approachPreview": "我们用一个栈 stk 来保存当前的计算结果和操作符，用一个变量 sign 保存当前的符号，变量 ans 保存最终的计算结果。 接下来，我们遍历字符串 s 的每一个字符： 如果当前字符是数字，那么我们用一个循环将后面的连续数字都读进来，然后用当前的符号将其加或者减到 ans 中。 如果当前字符是 '+'，我们修改变量 sign 为正号。 如果当前字符是 '-'，我们修改变量 sign 为负号。 如果当前字符是 '('，我们把当前的 ans 和 sign 入栈，并分别置空置 1，重新开始计算新的 ans 和 sign。 如果当前字符是 ')'，我们弹出栈顶的两个元素，一个是操作符，一个是括号前计算好的数字，我们将当前的数字乘上操作符，再加上之前的数字，作为新的 ans。 遍历完字符串 s 之后，我们返回 ans。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 基本计算器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "46.4%",
    "difficulty": "中等",
    "frontendId": "227",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser",
      "basic-calculator"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0227.Basic%20Calculator%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Basic Calculator II",
    "titleCn": "基本计算器 II",
    "titleSlug": "basic-calculator-ii",
    "url": "https://leetcode.cn/problems/basic-calculator-ii/description/",
    "statementPreview": "给你一个字符串表达式 s，请你实现一个基本计算器来计算并返回它的值。 整数除法仅保留整数部分。 你可以假设给定的表达式总是有效的。所有中间结果将在 [-2^31, 2^31 - 1] 的范围内。 注意： 不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval()。",
    "approachPreview": "遍历字符串 s，并用变量 sign 记录每个数字之前的运算符，对于第一个数字，其之前的运算符视为加号。每次遍历到数字末尾时，根据 sign 来决定计算方式： 加号：将数字压入栈； 减号：将数字的相反数压入栈； 乘除号：计算数字与栈顶元素，并将栈顶元素替换为计算结果。 遍历结束后，将栈中元素求和即为答案。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 基本计算器 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "55.2%",
    "difficulty": "中等",
    "frontendId": "385",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0385.Mini%20Parser/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Mini Parser",
    "titleCn": "迷你语法分析器",
    "titleSlug": "mini-parser",
    "url": "https://leetcode.cn/problems/mini-parser/description/",
    "statementPreview": "给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 NestedInteger。 列表中的每个元素只可能是整数或整数嵌套列表",
    "approachPreview": "我们首先判断字符串 s 是否为空或是一个空列表，如果是的话，直接返回一个空的 NestedInteger 即可。如果 s 是一个整数，我们直接返回一个包含这个整数的 NestedInteger。否则，我们从左到右遍历字符串 s，如果当前深度为 0，并且遇到了逗号或者字符串 s 的末尾，则我们截取出一个子串并递归调用函数解析该子串，将返回值加入到列表中。否则，如果当前遇到了左括号，我们将深度加 1，并继续遍历。如果遇到了右括号，我们将深度减 1，继续遍历。 遍历结束后，返回答案。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 迷你语法分析器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "61.6%",
    "difficulty": "中等",
    "frontendId": "394",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0394.Decode%20String/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Decode String",
    "titleCn": "字符串解码",
    "titleSlug": "decode-string",
    "url": "https://leetcode.cn/problems/decode-string/description/",
    "statementPreview": "给定一个经过编码的字符串，返回它解码后的字符串。 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k，例如不会出现像 3a 或 2[4] 的输入。 测试用例保证输出的长度不会超过 10^5。",
    "approachPreview": "字符串解码 属于手写解析器系列中的一个变体。主要标签是 栈、递归、字符串。先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 字符串解码 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "64.5%",
    "difficulty": "困难",
    "frontendId": "736",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0736.Parse%20Lisp%20Expression/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Parse Lisp Expression",
    "titleCn": "Lisp 语法解析",
    "titleSlug": "parse-lisp-expression",
    "url": "https://leetcode.cn/problems/parse-lisp-expression/description/",
    "statementPreview": "给你一个类似 Lisp 语句的字符串表达式 expression，求出其计算结果。 表达式语法如下所示: 表达式可以为整数， let 表达式， add 表达式， mult 表达式，或赋值的变量。表达式的结果总是一个整数。 (整数可以是正整数、负整数、0) let 表达式采用 \"(let v_1 e_1 v_2 e_2 ... v_n e_n expr)\" 的形式，其中 let 总是以字符串 \"let\" 来表示，接下来会跟随一对或多对交替的变量和表达式，也就是说，第一个变量 v_1 被分配为表达式 e_1 的值，第二个变量 v_2 被分配为表达式 e_2 的值， 依次类推；最终 let 表达式的值为 expr 表达式的值。 add 表达式表示为 \"(add e_1 e_2)\"，其中 add 总是以字符串 \"add\" 来表示，该表达式总是包含两个表达式 e_1、 e_2，最终结果是 e_1 表达式的值与 e_2 表达式的值之 和。 mult 表达式表示为 \"(mult e_1 e_2)\"，其中 mult 总是以字符串 \"mult\" 表示，该表达式总是包含两个表达式 e_1、 e_2，最终结果是 e_1 表达式的值与 e_2 表达式的值之 积。",
    "approachPreview": "Lisp 语法解析 属于手写解析器系列中的一个变体。主要标签是 栈、递归、哈希表、字符串。先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 Lisp 语法解析 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "55.8%",
    "difficulty": "困难",
    "frontendId": "770",
    "paidOnly": false,
    "seriesKeys": [
      "manual-parser",
      "basic-calculator"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0770.Basic%20Calculator%20IV/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Basic Calculator IV",
    "titleCn": "基本计算器 IV",
    "titleSlug": "basic-calculator-iv",
    "url": "https://leetcode.cn/problems/basic-calculator-iv/description/",
    "statementPreview": "给定一个表达式如 expression = \"e + 8 - a + 5\" 和一个求值映射，如 {\"e\": 1} （给定的形式为 evalvars = [\"e\"] 和 evalints = [1] ），返回表示简化表达式的标记列表，例如 [\"-1*a\",\"14\"] 表达式交替使用块和符号，每个块和符号之间有一个空格。 块要么是括号中的表达式，要么是变量，要么是非负整数。 变量是一个由小写字母组成的字符串（不包括数字）。请注意，变量可以是多个字母，并注意变量从不具有像 \"2x\" 或 \"-x\" 这样的前导系数或一元运算符。 表达式按通常顺序进行求值：先是括号，然后求乘法，再计算加法和减法。 例如， expression = \"1 + 2 * 3\" 的答案是 [\"7\"]。 输出格式如下： 对于系数非零的每个自变量项，我们按字典排序的顺序将自变量写在一个项中。 例如，我们永远不会写像 “b*a*c” 这样的项，只写 “a*b*c”。 项的次数等于被乘的自变量的数目，并计算重复项。我们先写出答案的最大次数项，用字典顺序打破关系，此时忽略词的前导系数。 例如， \"a*a*b*c\" 的次数为 4。 项的前导系数直接放在左边，用星号将它与变量分隔开(如果存在的话)。前导系数 1 仍然要打印出来。",
    "approachPreview": "把表达式解析成多项式。每个项用变量列表的有序元组表示，系数用哈希表累加；遇到赋值变量时转成常数，乘法做项之间笛卡尔组合，最后按次数和字典序输出。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 基本计算器 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "53.7%",
    "difficulty": "困难",
    "frontendId": "772",
    "paidOnly": true,
    "seriesKeys": [
      "manual-parser",
      "basic-calculator"
    ],
    "seriesPrimaryKey": "manual-parser",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0772.Basic%20Calculator%20III/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Basic Calculator III",
    "titleCn": "基本计算器 III",
    "titleSlug": "basic-calculator-iii",
    "url": "https://leetcode.cn/problems/basic-calculator-iii/description/",
    "statementPreview": "实现一个基本的计算器来计算简单的表达式字符串。 表达式字符串只包含非负整数，算符 +、 -、 *、 /，左括号 ( 和右括号 )。整数除法需要 向下截断。 你可以假定给定的表达式总是有效的。所有的中间结果的范围均满足 [-2^31, 2^31 - 1]。 注意： 你不能使用任何将字符串作为表达式求值的内置函数，比如 eval()。",
    "approachPreview": "用递归下降或两个栈处理 +、-、*、/ 和括号。括号递归求子表达式，乘除优先在当前项内结算，加减把项压入总和，最后累加。",
    "followUps": [
      {
        "question": "这题和手写解析器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 基本计算器 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写解析器为什么要先定语法层级？",
        "answer": "先按优先级把表达式拆成因子、项和表达式，再决定用栈还是递归下降；括号和一元符号要在同一套语法里处理，避免靠零散 if 修补边界。"
      }
    ]
  },
  {
    "acRate": "52.9%",
    "difficulty": "中等",
    "frontendId": "380",
    "paidOnly": false,
    "seriesKeys": [
      "insert-delete-getrandom",
      "random-sampling-fairness",
      "hash-table-design"
    ],
    "seriesPrimaryKey": "insert-delete-getrandom",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0380.Insert%20Delete%20GetRandom%20O(1)/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Insert Delete GetRandom O(1)",
    "titleCn": "O(1) 时间插入、删除和获取随机元素",
    "titleSlug": "insert-delete-getrandom-o1",
    "url": "https://leetcode.cn/problems/insert-delete-getrandom-o1/description/",
    "statementPreview": "实现 RandomizedSet 类： RandomizedSet() 初始化 RandomizedSet 对象 bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true；否则，返回 false。 bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true；否则，返回 false。 int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。 你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1)。",
    "approachPreview": "我们定义一个动态列表 q，用于存储集合中的元素，定义一个哈希表 d，用于存储每个元素在 q 中的下标。 插入元素时，如果元素已经存在于哈希表 d 中，直接返回 false；否则，我们将元素插入到动态列表 q 的末尾，同时将元素和其在 q 中的下标插入到哈希表 d 中，最后返回 true。 删除元素时，如果元素不存在于哈希表 d 中，直接返回 false；否则，我们从哈希表中获取元素在列表 q 中的下标 i，然后将列表 q 的最后一个元素 q[-1] 与 q[i] 交换，然后将哈希表中 q[-1] 的下标更新为 i，最后将 q 的最后一个元素删除，同时将元素从哈希表中删除，最后返回 true。 获取随机元素时，我们从动态列表 q 中随机选择一个元素返回即可。 时间复杂度 O(1)，空间复杂度 O(n)。其中 n 为集合中元素的个数。",
    "followUps": [
      {
        "question": "这题和O(1) 随机集合系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 O(1) 时间插入、删除和获取随机元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷O(1) 随机集合系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.8%",
    "difficulty": "困难",
    "frontendId": "381",
    "paidOnly": false,
    "seriesKeys": [
      "insert-delete-getrandom",
      "random-sampling-fairness",
      "hash-table-design"
    ],
    "seriesPrimaryKey": "insert-delete-getrandom",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0381.Insert%20Delete%20GetRandom%20O(1)%20-%20Duplicates%20allowed/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Insert Delete GetRandom O(1) - Duplicates allowed",
    "titleCn": "O(1) 时间插入、删除和获取随机元素 - 允许重复",
    "titleSlug": "insert-delete-getrandom-o1-duplicates-allowed",
    "url": "https://leetcode.cn/problems/insert-delete-getrandom-o1-duplicates-allowed/description/",
    "statementPreview": "RandomizedCollection 是一种包含数字集合(可能是重复的)的数据结构。它应该支持插入和删除特定元素，以及删除随机元素。 实现 RandomizedCollection 类: RandomizedCollection() 初始化空的 RandomizedCollection 对象。 bool insert(int val) 将一个 val 项插入到集合中，即使该项已经存在。如果该项不存在，则返回 true，否则返回 false。 bool remove(int val) 如果存在，从集合中移除一个 val 项。如果该项存在，则返回 true，否则返回 false。注意，如果 val 在集合中出现多次，我们只删除其中一个。 int getRandom() 从当前的多个元素集合中返回一个随机元素。每个元素被返回的概率与集合中包含的相同值的数量 线性相关。 您必须实现类的函数，使每个函数的 平均 时间复杂度为 O(1)。 注意： 生成测试用例时，只有在 RandomizedCollection 中 至少有一项 时，才会调用 getRandom。",
    "approachPreview": "用数组保存所有元素，用哈希表把值映射到它出现的下标集合。删除时把目标下标与数组末尾交换，并同步更新两个值的下标集合；随机返回数组中的随机位置。",
    "followUps": [
      {
        "question": "这题和O(1) 随机集合系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 O(1) 时间插入、删除和获取随机元素 - 允许重复 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷O(1) 随机集合系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.7%",
    "difficulty": "中等",
    "frontendId": "382",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0382.Linked%20List%20Random%20Node/README.md",
    "tags": [
      {
        "slug": "reservoir-sampling",
        "name": "水塘抽样"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Linked List Random Node",
    "titleCn": "链表随机节点",
    "titleSlug": "linked-list-random-node",
    "url": "https://leetcode.cn/problems/linked-list-random-node/description/",
    "statementPreview": "给你一个单链表，随机选择链表的一个节点，并返回相应的节点值。每个节点 被选中的概率一样。 实现 Solution 类： Solution(ListNode head) 使用整数数组初始化对象。 int getRandom() 从链表中随机选择一个节点并返回该节点的值。链表中所有节点被选中的概率相等。",
    "approachPreview": "链表长度未知且不适合全部保存时，用水塘采样。遍历到第 i 个节点时，以 1/i 的概率用它替换当前答案；遍历结束后，每个节点被保留下来的概率都等于 1/n。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 链表随机节点 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "62.5%",
    "difficulty": "中等",
    "frontendId": "384",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0384.Shuffle%20an%20Array/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Shuffle an Array",
    "titleCn": "打乱数组",
    "titleSlug": "shuffle-an-array",
    "url": "https://leetcode.cn/problems/shuffle-an-array/description/",
    "statementPreview": "给你一个整数数组 nums，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。 实现 Solution class: Solution(int[] nums) 使用整数数组 nums 初始化对象 int[] reset() 重设数组到它的初始状态并返回 int[] shuffle() 返回数组随机打乱后的结果",
    "approachPreview": "使用 Fisher-Yates 洗牌。第 i 轮从 [i, n - 1] 中等概率随机一个位置与 i 交换，保证每个元素放到当前位置的概率相同，最终每种排列出现概率都是 1/n!。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 打乱数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "68.1%",
    "difficulty": "中等",
    "frontendId": "398",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0398.Random%20Pick%20Index/README.md",
    "tags": [
      {
        "slug": "reservoir-sampling",
        "name": "水塘抽样"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Random Pick Index",
    "titleCn": "随机数索引",
    "titleSlug": "random-pick-index",
    "url": "https://leetcode.cn/problems/random-pick-index/description/",
    "statementPreview": "给你一个可能含有 重复元素 的整数数组 nums，请你随机输出给定的目标数字 target 的索引。你可以假设给定的数字一定存在于数组中。 实现 Solution 类： Solution(int[] nums) 用数组 nums 初始化对象。 int pick(int target) 从 nums 中选出一个满足 nums[i] == target 的随机索引 i。如果存在多个有效的索引，则每个索引的返回概率应当相等。",
    "approachPreview": "只扫描数组中等于 target 的位置，并对第 cnt 个命中的位置以 1/cnt 的概率替换答案。这是水塘采样的一维应用，不需要提前保存 target 的全部下标。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 随机数索引 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "55.8%",
    "difficulty": "中等",
    "frontendId": "470",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0470.Implement%20Rand10()%20Using%20Rand7()/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "rejection-sampling",
        "name": "拒绝采样"
      },
      {
        "slug": "probability-and-statistics",
        "name": "概率与统计"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Implement Rand10() Using Rand7()",
    "titleCn": "用 Rand7() 实现 Rand10()",
    "titleSlug": "implement-rand10-using-rand7",
    "url": "https://leetcode.cn/problems/implement-rand10-using-rand7/description/",
    "statementPreview": "给定方法 rand7 可生成 [1,7] 范围内的均匀随机整数，试写一个方法 rand10 生成 [1,10] 范围内的均匀随机整数。 你只能调用 rand7() 且不能调用其他方法。请不要使用系统的 Math.random() 方法。 每个测试用例将有一个内部参数 n，即你实现的函数 rand10() 在测试时将被调用的次数。请注意，这不是传递给 rand10() 的参数。",
    "approachPreview": "我们可以使用拒绝采样的方法实现等概率生成任意区间的随机数。拒绝采样的思路是如果生成的随机数落在我们希望的区间内，那么就返回该随机数，否则会不断生成直到生成一个落在区间内的随机数为止。 对于本题，我们可以通过调用 rand7() 两次来实现生成 [1,10] 以内的随机数，具体如下： 我们生成一个大于等于 1 且小于等于 40 的整数 x，其中等概率生成的方式为 x = (rand7() - 1) \\times 7 + rand7()，然后，我们返回 x \\bmod 10 + 1 即可。 期望时间复杂度为 O(1)，但是最坏情况下会达到无穷大的时间复杂度。空间复杂度为 O(1)。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 用 Rand7() 实现 Rand10() 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "48.8%",
    "difficulty": "中等",
    "frontendId": "478",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0478.Generate%20Random%20Point%20in%20a%20Circle/README.md",
    "tags": [
      {
        "slug": "geometry",
        "name": "几何"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "rejection-sampling",
        "name": "拒绝采样"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Generate Random Point in a Circle",
    "titleCn": "在圆内随机生成点",
    "titleSlug": "generate-random-point-in-a-circle",
    "url": "https://leetcode.cn/problems/generate-random-point-in-a-circle/description/",
    "statementPreview": "给定圆的半径和圆心的位置，实现函数 randPoint，在圆中产生均匀随机点。 实现 Solution 类: Solution(double radius, double x_center, double y_center) 用圆的半径 radius 和圆心的位置 (x_center, y_center) 初始化对象 randPoint() 返回圆内的一个随机点。圆周上的一点被认为在圆内。答案作为数组返回 [x, y]。",
    "approachPreview": "可以在外接正方形内拒绝采样，也可以直接用极坐标。极坐标写法要令半径为 sqrt(rand()) * r，角度均匀取 [0, 2π)，这样面积概率才均匀。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 在圆内随机生成点 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "42.5%",
    "difficulty": "中等",
    "frontendId": "497",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0497.Random%20Point%20in%20Non-overlapping%20Rectangles/README.md",
    "tags": [
      {
        "slug": "reservoir-sampling",
        "name": "水塘抽样"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Random Point in Non-overlapping Rectangles",
    "titleCn": "非重叠矩形中的随机点",
    "titleSlug": "random-point-in-non-overlapping-rectangles",
    "url": "https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/description/",
    "statementPreview": "给定一个由非重叠的轴对齐矩形的数组 rects，其中 rects[i] = [ai, bi, xi, yi] 表示 (ai, bi) 是第 i 个矩形的左下角点， (xi, yi) 是第 i 个矩形的右上角点。设计一个算法来随机挑选一个被某一矩形覆盖的整数点。矩形周长上的点也算做是被矩形覆盖。所有满足要求的点必须等概率被返回。 在给定的矩形覆盖的空间内的任何整数点都有可能被返回。 请注意，整数点是具有整数坐标的点。 实现 Solution 类: Solution(int[][] rects) 用给定的矩形数组 rects 初始化对象。 int[] pick() 返回一个随机的整数点 [u, v] 在给定的矩形所覆盖的空间内。",
    "approachPreview": "先按每个矩形包含的整数点数量建立前缀和，再随机一个全局点序号，用二分定位矩形，最后把局部偏移还原成该矩形中的坐标。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 非重叠矩形中的随机点 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "46.5%",
    "difficulty": "中等",
    "frontendId": "519",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0519.Random%20Flip%20Matrix/README.md",
    "tags": [
      {
        "slug": "reservoir-sampling",
        "name": "水塘抽样"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Random Flip Matrix",
    "titleCn": "随机翻转矩阵",
    "titleSlug": "random-flip-matrix",
    "url": "https://leetcode.cn/problems/random-flip-matrix/description/",
    "statementPreview": "给你一个 m x n 的二元矩阵 matrix，且所有值被初始化为 0。请你设计一个算法，随机选取一个满足 matrix[i][j] == 0 的下标 (i, j)，并将它的值变为 1。所有满足 matrix[i][j] == 0 的下标 (i, j) 被选取的概率应当均等。 尽量最少调用内置的随机函数，并且优化时间和空间复杂度。 实现 Solution 类： Solution(int m, int n) 使用二元矩阵的大小 m 和 n 初始化该对象 int[] flip() 返回一个满足 matrix[i][j] == 0 的随机下标 [i, j]，并将其对应格子中的值变为 1 void reset() 将矩阵中所有的值重置为 0",
    "approachPreview": "把还没翻过的格子看成 [0, remaining) 的编号空间。每次随机一个编号 x，真实编号由哈希表映射得到；再把 x 映射到当前末尾编号，remaining 减一，从而惰性模拟无放回抽样。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 随机翻转矩阵 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "50.0%",
    "difficulty": "中等",
    "frontendId": "528",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0528.Random%20Pick%20with%20Weight/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Random Pick with Weight",
    "titleCn": "按权重随机选择",
    "titleSlug": "random-pick-with-weight",
    "url": "https://leetcode.cn/problems/random-pick-with-weight/description/",
    "statementPreview": "给你一个 下标从 0 开始 的正整数数组 w，其中 w[i] 代表第 i 个下标的权重。 请你实现一个函数 pickIndex，它可以 随机地 从范围 [0, w.length - 1] 内（含 0 和 w.length - 1 ）选出并返回一个下标。选取下标 i 的 概率 为 w[i] / sum(w)。 例如，对于 w = [1, 3]，挑选下标 0 的概率为 1 / (1 + 3) = 0.25 （即，25%），而选取下标 1 的概率为 3 / (1 + 3) = 0.75 （即， 75% ）。",
    "approachPreview": "对权重数组做前缀和，随机生成 1 到 total 之间的整数，再二分找到第一个前缀和不小于该随机数的位置。区间长度正好等于权重，因此返回概率与权重成正比。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 按权重随机选择 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "43.3%",
    "difficulty": "困难",
    "frontendId": "710",
    "paidOnly": false,
    "seriesKeys": [
      "random-sampling-fairness"
    ],
    "seriesPrimaryKey": "random-sampling-fairness",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0710.Random%20Pick%20with%20Blacklist/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "randomized",
        "name": "随机化"
      }
    ],
    "title": "Random Pick with Blacklist",
    "titleCn": "黑名单中的随机数",
    "titleSlug": "random-pick-with-blacklist",
    "url": "https://leetcode.cn/problems/random-pick-with-blacklist/description/",
    "statementPreview": "给定一个整数 n 和一个 无重复 黑名单整数数组 blacklist。设计一种算法，从 [0, n - 1] 范围内的任意整数中选取一个 未加入 黑名单 blacklist 的整数。任何在上述范围内且不在黑名单 blacklist 中的整数都应该有 同等的可能性 被返回。 优化你的算法，使它最小化调用语言 内置 随机函数的次数。 实现 Solution 类: Solution(int n, int[] blacklist) 初始化整数 n 和被加入黑名单 blacklist 的整数 int pick() 返回一个范围为 [0, n - 1] 且不在黑名单 blacklist 中的随机整数",
    "approachPreview": "有效白名单大小是 n - blacklist.length。只在 [0, size) 中随机；若抽到黑名单内的编号，就用哈希表映射到 [size, n) 中未被拉黑的编号，保证每个白名单数字等概率返回。",
    "followUps": [
      {
        "question": "这题和随机抽样与公平概率系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 黑名单中的随机数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "如何证明随机抽样是公平的？",
        "answer": "先明确目标概率是等概率还是按权重概率，再证明每个候选最终被返回的概率相同或正比于权重；RandX 转 RandY 要只在完整均匀样本空间内取模，越界必须拒绝重抽。"
      }
    ]
  },
  {
    "acRate": "55.5%",
    "difficulty": "中等",
    "frontendId": "146",
    "paidOnly": false,
    "seriesKeys": [
      "cache-design"
    ],
    "seriesPrimaryKey": "cache-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0146.LRU%20Cache/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "LRU Cache",
    "titleCn": "LRU 缓存",
    "titleSlug": "lru-cache",
    "url": "https://leetcode.cn/problems/lru-cache/description/",
    "statementPreview": "请你设计并实现一个满足 LRU (最近最少使用) 缓存 约束的数据结构。 实现 LRUCache 类： LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存 int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1。 void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，则应该 逐出 最久未使用的关键字。 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。",
    "approachPreview": "我们可以用“哈希表”和“双向链表”实现一个 LRU 缓存。 哈希表：用于存储 key 和对应的节点位置。 双向链表：用于存储节点数据，按照访问时间排序。 当访问一个节点时，如果节点存在，我们将其从原来的位置删除，并重新插入到链表头部。这样就能保证链表尾部存储的就是最近最久未使用的节点，当节点数量大于缓存最大空间时就淘汰链表尾部的节点。 当插入一个节点时，如果节点存在，我们将其从原来的位置删除，并重新插入到链表头部。如果不存在，我们首先检查缓存是否已满，如果已满，则删除链表尾部的节点，将新的节点插入链表头部。 时间复杂度 O(1)，空间复杂度 O(\\textit{capacity})。",
    "followUps": [
      {
        "question": "这题和缓存设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 LRU 缓存 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "面试追问 LRU 线程安全和缓存一致性时怎么回答？",
        "answer": "先把单机算法的不变量讲清：哈希表定位节点，链表维护访问顺序，淘汰时两边同时更新。线程安全再讨论锁粒度、读写锁或分段锁；一致性再讨论写穿、写回、失效和过期策略。"
      }
    ]
  },
  {
    "acRate": "49.3%",
    "difficulty": "困难",
    "frontendId": "460",
    "paidOnly": false,
    "seriesKeys": [
      "cache-design",
      "frequency-bucket-design"
    ],
    "seriesPrimaryKey": "cache-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0460.LFU%20Cache/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "LFU Cache",
    "titleCn": "LFU 缓存",
    "titleSlug": "lfu-cache",
    "url": "https://leetcode.cn/problems/lfu-cache/description/",
    "statementPreview": "请你为 最不经常使用（LFU） 缓存算法设计并实现数据结构。 实现 LFUCache 类： LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象 int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1。 void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最久未使用 的键。 为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器。使用计数最小的键是最久未使用的键。 当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。",
    "approachPreview": "我们定义两个哈希表，其中： 哈希表 map：用于存储缓存的键值对，哈希表的键 key 对应到缓存节点 node，方便 O(1) 时间内获取缓存节点。 哈希表 freqMap：用于存储使用频率相同的缓存节点的双向链表，哈希表的键 freq 对应到双向链表 list，方便 O(1) 时间内获取使用频率相同的缓存节点的双向链表。 另外，我们还需要维护一个变量 minFreq，用于记录当前最小的使用频率，方便 O(1) 时间内获取最小使用频率的缓存节点。 对于 get(key) 操作： 我们首先判断 capacity 是否为 0 或者 map 中是否存在键 key，如果不存在则返回 -1；否则从 map 中获取缓存节点 node，并将 node 的使用频率加 1，最后返回 node 的值。 对于 put(key, value) 操作： 我们首先判断 capacity 是否为 0，如果为 0 则直接返回； 否则判断 map 中是否存在键 key，如果存在则从 map 中获取缓存节点 node，更新 node 的值为 value，并将 node 的使用频率加 1，最后返回 node 的值； 如果不存在则判断 map 的长度是否等于 capacity，如果等于 capacity 则从 freqMap 中获取使用频率最小的双向链表 list，从 list 中删除最后一个节点，并且移除该节点对应的键值对。",
    "followUps": [
      {
        "question": "这题和缓存设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 LFU 缓存 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "面试追问 LRU 线程安全和缓存一致性时怎么回答？",
        "answer": "先把单机算法的不变量讲清：哈希表定位节点，链表维护访问顺序，淘汰时两边同时更新。线程安全再讨论锁粒度、读写锁或分段锁；一致性再讨论写穿、写回、失效和过期策略。"
      }
    ]
  },
  {
    "acRate": "63.3%",
    "difficulty": "中等",
    "frontendId": "2622",
    "paidOnly": false,
    "seriesKeys": [
      "cache-design"
    ],
    "seriesPrimaryKey": "cache-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2600-2699/2622.Cache%20With%20Time%20Limit/README.md",
    "tags": [],
    "title": "Cache With Time Limit",
    "titleCn": "有时间限制的缓存",
    "titleSlug": "cache-with-time-limit",
    "url": "https://leetcode.cn/problems/cache-with-time-limit/description/",
    "statementPreview": "编写一个类，它允许获取和设置键-值对，并且每个键都有一个 过期时间。 该类有三个公共方法： set(key, value, duration)：接收参数为整型键 key、整型值 value 和以毫秒为单位的持续时间 duration。一旦 duration 到期后，这个键就无法访问。如果相同的未过期键已经存在，该方法将返回 true，否则返回 false。如果该键已经存在，则它的值和持续时间都应该被覆盖。 get(key)：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1。 count()：返回未过期键的总数。",
    "approachPreview": "我们用哈希表 cache 记录键值对，其中键为整型键 key，值为一个数组，数组的第一个元素为整型值 value，第二个元素为元素的过期时间 expire。 我们实现一个 removeExpire 方法，用于删除过期的键值对。在 set、 get 和 count 方法中，我们先调用 removeExpire 方法，然后再进行相应的操作。 时间复杂度为 O(1)，空间复杂度为 O(n)。其中 n 为哈希表 cache 的大小。",
    "followUps": [
      {
        "question": "这题和缓存设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有时间限制的缓存 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "面试追问 LRU 线程安全和缓存一致性时怎么回答？",
        "answer": "先把单机算法的不变量讲清：哈希表定位节点，链表维护访问顺序，淘汰时两边同时更新。线程安全再讨论锁粒度、读写锁或分段锁；一致性再讨论写穿、写回、失效和过期策略。"
      }
    ]
  },
  {
    "acRate": "62.7%",
    "difficulty": "中等",
    "frontendId": "155",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0155.Min%20Stack/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      }
    ],
    "title": "Min Stack",
    "titleCn": "最小栈",
    "titleSlug": "min-stack",
    "url": "https://leetcode.cn/problems/min-stack/description/",
    "statementPreview": "设计一个支持 push， pop， top 操作，并能在常数时间内检索到最小元素的栈。 实现 MinStack 类: MinStack() 初始化堆栈对象。 void push(int val) 将元素val推入堆栈。 void pop() 删除堆栈顶部的元素。 int top() 获取堆栈顶部的元素。 int getMin() 获取堆栈中的最小元素。",
    "approachPreview": "我们用两个栈来实现，其中 stk1 用来存储数据， stk2 用来存储当前栈中的最小值。初始时， stk2 中存储一个极大值。 当我们向栈中压入一个元素 x 时，我们将 x 压入 stk1，并将 min(x, stk2[-1]) 压入 stk2。 当我们从栈中弹出一个元素时，我们将 stk1 和 stk2 的栈顶元素都弹出。 当我们要获取当前栈中的栈顶元素时，我们只需要返回 stk1 的栈顶元素即可。 当我们要获取当前栈中的最小值时，我们只需要返回 stk2 的栈顶元素即可。 每个操作的时间复杂度为 O(1)。整体的空间复杂度为 O(n)，其中 n 为栈中元素的个数。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "42.5%",
    "difficulty": "困难",
    "frontendId": "716",
    "paidOnly": true,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0716.Max%20Stack/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      }
    ],
    "title": "Max Stack",
    "titleCn": "最大栈",
    "titleSlug": "max-stack",
    "url": "https://leetcode.cn/problems/max-stack/description/",
    "statementPreview": "设计一个最大栈数据结构，既支持栈操作，又支持查找栈中最大元素。 实现 MaxStack 类： MaxStack() 初始化栈对象 void push(int x) 将元素 x 压入栈中。 int pop() 移除栈顶元素并返回这个元素。 int top() 返回栈顶元素，无需移除。 int peekMax() 检索并返回栈中最大元素，无需移除。 int popMax() 检索并返回栈中最大元素，并将其移除。如果有多个最大元素，只要移除 最靠近栈顶 的那个。",
    "approachPreview": "使用双向链表存储栈中的元素，使用有序集合存储栈中的元素，有序集合中的元素按照从小到大的顺序存储，每个元素都对应着双向链表中的一个节点。 调用 push(x) 方法时，将元素 x 插入到双向链表的末尾，同时将元素 x 对应的节点插入到有序集合中。时间复杂度 O(\\log n)。 调用 pop() 方法时，将双向链表的末尾节点删除，同时将有序集合中的对应节点删除。时间复杂度 O(\\log n)。 调用 top() 方法时，返回双向链表的末尾节点的值。时间复杂度 O(1)。 调用 peekMax() 方法时，返回有序集合中的最后一个元素对应的节点的值。时间复杂度 O(\\log n)。 调用 popMax() 方法时，将有序集合中的最后一个元素删除，同时将对应的节点从双向链表中删除。时间复杂度 O(\\log n)。 空间复杂度 O(n)。其中 n 为栈中的元素个数。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "64.6%",
    "difficulty": "困难",
    "frontendId": "895",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design",
      "frequency-bucket-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0895.Maximum%20Frequency%20Stack/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      }
    ],
    "title": "Maximum Frequency Stack",
    "titleCn": "最大频率栈",
    "titleSlug": "maximum-frequency-stack",
    "url": "https://leetcode.cn/problems/maximum-frequency-stack/description/",
    "statementPreview": "设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出 出现频率 最高的元素。 实现 FreqStack 类: FreqStack() 构造一个空的堆栈。 void push(int val) 将一个整数 val 压入栈顶。 int pop() 删除并返回堆栈中出现频率最高的元素。 如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。",
    "approachPreview": "根据题目描述，我们需要设计一个支持弹出“出现频率最高”的元素的数据结构。如果存在多个元素出现频率相同，那么弹出最接近栈顶的元素。 我们可以使用哈希表 cnt 记录每个元素出现的频率，用一个优先队列（大根堆） q 维护元素频率以及对应的压栈时间戳。 执行压栈操作时，我们先将当前时间戳加一，即 ts \\gets ts + 1；然后将元素 val 的频率加一，即 cnt[val] \\gets cnt[val] + 1，最后将三元组 (cnt[val], ts, val) 加入优先队列 q 中。压栈操作的时间复杂度为 O(\\log n)。 执行弹栈操作时，我们直接从优先队列 q 中弹出一个元素即可。由于优先队列 q 中的元素按照频率降序排序，因此弹出的元素一定是出现频率最高的元素。如果存在多个元素出现频率相同，那么弹出最接近栈顶的元素，即弹出时间戳最大的元素。弹出后，我们将弹出元素的频率减一，即 cnt[val] \\gets cnt[val] - 1。弹栈操作的时间复杂度为 O(\\log n)。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大频率栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "66.9%",
    "difficulty": "中等",
    "frontendId": "946",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0946.Validate%20Stack%20Sequences/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Validate Stack Sequences",
    "titleCn": "验证栈序列",
    "titleSlug": "validate-stack-sequences",
    "url": "https://leetcode.cn/problems/validate-stack-sequences/description/",
    "statementPreview": "给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false。",
    "approachPreview": "我们遍历 \\textit{pushed} 数组，对于当前遍历到的元素 x，我们将其压入栈 \\textit{stk} 中，然后判断栈顶元素是否和 \\textit{popped} 数组中下一个要弹出的元素相等，如果相等，我们就将栈顶元素弹出并将 \\textit{popped} 数组中下一个要弹出的元素的索引 i 加一。最后，如果要弹出的元素都能按照 \\textit{popped} 数组的顺序弹出，返回 \\textit{true}，否则返回 \\textit{false}。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为 \\textit{pushed} 数组的长度。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证栈序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "39.6%",
    "difficulty": "困难",
    "frontendId": "1172",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1172.Dinner%20Plate%20Stacks/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Dinner Plate Stacks",
    "titleCn": "餐盘栈",
    "titleSlug": "dinner-plate-stacks",
    "url": "https://leetcode.cn/problems/dinner-plate-stacks/description/",
    "statementPreview": "我们把无限数量 &infin; 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 capacity 都相同。 实现一个叫「餐盘」的类 DinnerPlates： DinnerPlates(int capacity) - 给出栈的最大容量 capacity。 void push(int val) - 将给出的正整数 val 推入 从左往右第一个 没有满的栈。 int pop() - 返回 从右往左第一个 非空栈顶部的值，并将其从栈中删除；如果所有的栈都是空的，请返回 -1。 int popAtStack(int index) - 返回编号 index 的栈顶部的值，并将其从栈中删除；如果编号 index 的栈是空的，请返回 -1。",
    "approachPreview": "我们定义以下数据结构或变量： capacity：每个栈的容量； stacks：栈数组，用于存储所有的栈，其中每个栈的最大容量都是 capacity； not_full：有序集合，用于存储所有未满的栈在栈数组中的下标。 对于 push(val) 操作： 我们首先判断 not_full 是否为空，如果为空，则说明没有未满的栈，需要新建一个栈，然后将 val 压入该栈中，此时判断容量 capacity 是否大于 1，如果大于 1，则将该栈的下标加入 not_full 中。 如果 not_full 不为空，则说明有未满的栈，我们取出 not_full 中最小的下标 index，将 val 压入 stacks[index] 中，此时如果 stacks[index] 的容量等于 capacity，则将 index 从 not_full 中删除。 对于 popAtStack(index) 操作： 我们首先判断 index 是否在 stacks 的下标范围内，如果不在，则直接返回 -1。如果 stacks[index] 为空，同样直接返回 -1。 如果 stacks[index] 不为空，则弹出 stacks[index] 的栈顶元素 val。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 餐盘栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "72.5%",
    "difficulty": "中等",
    "frontendId": "1381",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1381.Design%20a%20Stack%20With%20Increment%20Operation/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Design a Stack With Increment Operation",
    "titleCn": "设计一个支持增量操作的栈",
    "titleSlug": "design-a-stack-with-increment-operation",
    "url": "https://leetcode.cn/problems/design-a-stack-with-increment-operation/description/",
    "statementPreview": "请你设计一个支持对其元素进行增量操作的栈。 实现自定义栈类 CustomStack： CustomStack(int maxSize)：用 maxSize 初始化对象， maxSize 是栈中最多能容纳的元素数量。 void push(int x)：如果栈还未增长到 maxSize，就将 x 添加到栈顶。 int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1。 void inc(int k, int val)：栈底的 k 个元素的值都增加 val。如果栈中元素总数小于 k，则栈中的所有元素都增加 val。",
    "approachPreview": "我们可以用一个数组 stk 来模拟栈，用一个整数 i 表示下一个入栈的元素位置。另外，我们还需要一个数组 add 来记录每个位置上的增量累加值。 调用 push(x) 时，如果 i \\lt maxSize，我们将 x 放入 stk[i] 中，并将 i 加一。 调用 pop() 时，如果 i \\leq 0，说明栈为空，返回 -1。否则我们将 i 减一，答案为 stk[i] + add[i]，然后我们将 add[i - 1] 加上 add[i]，并将 add[i] 清零。最后返回答案。 调用 increment(k, val) 时，如果 i \\gt 0，我们将 add[\\min(i, k) - 1] 加上 val。 时间复杂度 O(1)，空间复杂度 O(n)。其中 n 是栈的最大容量。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计一个支持增量操作的栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "72.8%",
    "difficulty": "中等",
    "frontendId": "1441",
    "paidOnly": false,
    "seriesKeys": [
      "stack-min-max-design"
    ],
    "seriesPrimaryKey": "stack-min-max-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1441.Build%20an%20Array%20With%20Stack%20Operations/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Build an Array With Stack Operations",
    "titleCn": "用栈操作构建数组",
    "titleSlug": "build-an-array-with-stack-operations",
    "url": "https://leetcode.cn/problems/build-an-array-with-stack-operations/description/",
    "statementPreview": "给你一个数组 target 和一个整数 n。 给你一个空栈和两种操作： \"Push\"：将一个整数加到栈顶。 \"Pop\"：从栈顶删除一个整数。 同时给定一个范围 [1, n] 中的整数流。 使用两个栈操作使栈中的数字（从底部到顶部）等于 target。你应该遵循以下规则： 如果整数流不为空，从流中选取下一个整数并将其推送到栈顶。 如果栈不为空，弹出栈顶的整数。 如果，在任何时刻，栈中的元素（从底部到顶部）等于 target，则不要从流中读取新的整数，也不要对栈进行更多操作。 请返回遵循上述规则构建 target 所用的操作序列。如果存在多个合法答案，返回 任一 即可。",
    "approachPreview": "我们定义一个变量 \\textit{cur} 表示当前待读取的数字，初始时 \\textit{cur} = 1，用一个数组 \\textit{ans} 存储答案。 接下来，我们遍历数组 \\textit{target} 中的每个数字 x： 如果 \\textit{cur} < x，我们将 \\textit{Push} 和 \\textit{Pop} 依次加入答案，直到 \\textit{cur} = x； 然后我们将 \\textit{Push} 加入答案，表示读取数字 x； 接着，我们将 \\textit{cur} 加一，继续处理下一个数字。 遍历结束后，返回答案数组即可。 时间复杂度 O(n)，其中 n 是数组 \\textit{target} 的长度。忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和栈结构设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 用栈操作构建数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "简单",
    "frontendId": "225",
    "paidOnly": false,
    "seriesKeys": [
      "stack-queue-adapter"
    ],
    "seriesPrimaryKey": "stack-queue-adapter",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0225.Implement%20Stack%20using%20Queues/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      }
    ],
    "title": "Implement Stack using Queues",
    "titleCn": "用队列实现栈",
    "titleSlug": "implement-stack-using-queues",
    "url": "https://leetcode.cn/problems/implement-stack-using-queues/description/",
    "statementPreview": "请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（ push、 top、 pop 和 empty ）。 实现 MyStack 类： void push(int x) 将元素 x 压入栈顶。 int pop() 移除并返回栈顶元素。 int top() 返回栈顶元素。 boolean empty() 如果栈是空的，返回 true；否则，返回 false。 注意： 你只能使用队列的标准操作 —— 也就是 push to back、 peek/pop from front、 size 和 is empty 这些操作。 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。",
    "approachPreview": "我们使用两个队列 q_1 和 q_2，其中 q_1 用于存储栈中的元素，而 q_2 用于辅助实现栈的操作。 push 操作：将元素压入 q_2，然后将 q_1 中的元素依次弹出并压入 q_2，最后交换 q_1 和 q_2 的引用。时间复杂度 O(n)。 pop 操作：直接弹出 q_1 的队首元素。时间复杂度 O(1)。 top 操作：直接返回 q_1 的队首元素。时间复杂度 O(1)。 empty 操作：判断 q_1 是否为空。时间复杂度 O(1)。 空间复杂度 O(n)，其中 n 是栈中元素的个数。",
    "followUps": [
      {
        "question": "这题和栈队列互实现系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 用队列实现栈 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "68.1%",
    "difficulty": "简单",
    "frontendId": "232",
    "paidOnly": false,
    "seriesKeys": [
      "stack-queue-adapter"
    ],
    "seriesPrimaryKey": "stack-queue-adapter",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0232.Implement%20Queue%20using%20Stacks/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      }
    ],
    "title": "Implement Queue using Stacks",
    "titleCn": "用栈实现队列",
    "titleSlug": "implement-queue-using-stacks",
    "url": "https://leetcode.cn/problems/implement-queue-using-stacks/description/",
    "statementPreview": "请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（ push、 pop、 peek、 empty ）： 实现 MyQueue 类： void push(int x) 将元素 x 推到队列的末尾 int pop() 从队列的开头移除并返回元素 int peek() 返回队列开头的元素 boolean empty() 如果队列为空，返回 true；否则，返回 false 说明： 你 只能 使用标准的栈操作 —— 也就是只有 push to top , peek/pop from top , size , 和 is empty 操作是合法的。 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。",
    "approachPreview": "我们使用两个栈，其中栈 stk1 用于入队，另一个栈 stk2 用于出队。 入队时，直接将元素入栈 stk1。时间复杂度 O(1)。 出队时，先判断栈 stk2 是否为空，如果为空，则将栈 stk1 中的元素全部出栈并入栈 stk2，然后再从栈 stk2 中出栈一个元素。如果栈 stk2 不为空，则直接从栈 stk2 中出栈一个元素。均摊时间复杂度 O(1)。 获取队首元素时，先判断栈 stk2 是否为空，如果为空，则将栈 stk1 中的元素全部出栈并入栈 stk2，然后再从栈 stk2 中获取栈顶元素。如果栈 stk2 不为空，则直接从栈 stk2 中获取栈顶元素。均摊时间复杂度 O(1)。 判断队列是否为空时，只要判断两个栈是否都为空即可。时间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和栈队列互实现系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 用栈实现队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "47.2%",
    "difficulty": "中等",
    "frontendId": "622",
    "paidOnly": false,
    "seriesKeys": [
      "queue-deque-design"
    ],
    "seriesPrimaryKey": "queue-deque-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0622.Design%20Circular%20Queue/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Design Circular Queue",
    "titleCn": "设计循环队列",
    "titleSlug": "design-circular-queue",
    "url": "https://leetcode.cn/problems/design-circular-queue/description/",
    "statementPreview": "设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为&ldquo;环形缓冲器&rdquo;。 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。 你的实现应该支持如下操作： MyCircularQueue(k) : 构造器，设置队列长度为 k。 Front : 从队首获取元素。如果队列为空，返回 -1。 Rear : 获取队尾元素。如果队列为空，返回 -1。 enQueue(value) : 向循环队列插入一个元素。如果成功插入则返回真。 deQueue() : 从循环队列中删除一个元素。如果成功删除则返回真。 isEmpty() : 检查循环队列是否为空。 isFull() : 检查循环队列是否已满。",
    "approachPreview": "我们可以使用一个长度为 k 的数组 q 来模拟循环队列，用一个指针 \\textit{front} 记录队首元素的位置，初始时队列为空，而 \\textit{front} 为 0。另外，我们用一个变量 \\textit{size} 记录队列中元素的个数，初始时 \\textit{size} 为 0。 调用 enQueue 方法时，我们首先检查队列是否已满，即 \\textit{size} = k，如果满了则直接返回 \\textit{false}。否则，我们将元素插入到 (\\textit{front} + \\textit{size}) \\bmod k 的位置，然后 \\textit{size} = \\textit{size} + 1，表示队列中元素的个数增加了 1。最后返回 \\textit{true}。 调用 deQueue 方法时，我们首先检查队列是否为空，即 \\textit{size} = 0，如果为空则直接返回 \\textit{false}。否则，我们将 \\textit{front} = (\\textit{front} + 1) \\bmod k，表示队首元素出队，然后 \\textit{size} = \\textit{size} - 1， 调用 Front 方法时，我们首先检查队列是否为空，即 \\textit{size} = 0，如果为空则返回 -1。否则，返回 q[\\textit{front}]。",
    "followUps": [
      {
        "question": "这题和队列与双端队列设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计循环队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "56.4%",
    "difficulty": "中等",
    "frontendId": "641",
    "paidOnly": false,
    "seriesKeys": [
      "queue-deque-design"
    ],
    "seriesPrimaryKey": "queue-deque-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0641.Design%20Circular%20Deque/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Design Circular Deque",
    "titleCn": "设计循环双端队列",
    "titleSlug": "design-circular-deque",
    "url": "https://leetcode.cn/problems/design-circular-deque/description/",
    "statementPreview": "设计实现双端队列。 实现 MyCircularDeque 类: MyCircularDeque(int k)：构造函数,双端队列最大为 k。 boolean insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true，否则返回 false。 boolean insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true，否则返回 false。 boolean deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true，否则返回 false。 boolean deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true，否则返回 false。 int getFront() )：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。 int getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。 boolean isEmpty()：若双端队列为空，则返回 true，否则返回 false。 boolean isFull()：若双端队列满了，则返回 true，否则返回 false。",
    "approachPreview": "我们可以使用一个数组来实现循环双端队列。我们维护一个指向队头的指针 \\textit{front} 和一个表示队列中元素个数的变量 \\textit{size}，以及一个表示队列容量的变量 \\textit{capacity}。我们使用一个数组 \\textit{q} 来存储队列中的元素。 调用 \\textit{insertFront} 时，首先检查队列是否已满，如果已满则返回 \\text{false}。如果队列不为空，则将 \\textit{front} 向前移动一个位置（使用模运算实现循环），然后将新元素插入到 \\textit{front} 位置，并将 \\textit{size} 加 1。 调用 \\textit{insertLast} 时，首先检查队列是否已满，如果已满则返回 \\text{false}。如果队列不为空，则计算新元素应该插入的位置（使用 \\textit{front} 和 \\textit{size} 计算），将新元素插入到该位置，并将 \\textit{size} 加 1。 调用 \\textit{deleteFront} 时，首先检查队列是否为空，如果为空则返回 \\text{false}。如果队列不为空，则将 \\textit{front} 向后移动一个位置（使用模运算实现循环），并将 \\textit{size} 减 1。",
    "followUps": [
      {
        "question": "这题和队列与双端队列设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计循环双端队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "71.7%",
    "difficulty": "中等",
    "frontendId": "1188",
    "paidOnly": true,
    "seriesKeys": [
      "queue-deque-design"
    ],
    "seriesPrimaryKey": "queue-deque-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1188.Design%20Bounded%20Blocking%20Queue/README.md",
    "tags": [
      {
        "slug": "concurrency",
        "name": "多线程"
      }
    ],
    "title": "Design Bounded Blocking Queue",
    "titleCn": "设计有限阻塞队列",
    "titleSlug": "design-bounded-blocking-queue",
    "url": "https://leetcode.cn/problems/design-bounded-blocking-queue/description/",
    "statementPreview": "实现一个拥有如下方法的线程安全有限阻塞队列： BoundedBlockingQueue(int capacity) 构造方法初始化队列，其中 capacity 代表队列长度上限。 void enqueue(int element) 在队首增加一个 element . 如果队列满，调用线程被阻塞直到队列非满。 int dequeue() 返回队尾元素并从队列中将其删除. 如果队列为空，调用线程被阻塞直到队列非空。 int size() 返回当前队列元素个数。 你的实现将会被多线程同时访问进行测试。每一个线程要么是一个只调用 enqueue 方法的生产者线程，要么是一个只调用 dequeue 方法的消费者线程。 size 方法将会在每一个测试用例之后进行调用。 请不要使用内置的有限阻塞队列实现，否则面试将不会通过。",
    "approachPreview": "设计有限阻塞队列 属于队列与双端队列设计系列中的一个变体。主要标签是 多线程。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和队列与双端队列设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计有限阻塞队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "60.0%",
    "difficulty": "中等",
    "frontendId": "1670",
    "paidOnly": false,
    "seriesKeys": [
      "queue-deque-design"
    ],
    "seriesPrimaryKey": "queue-deque-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1670.Design%20Front%20Middle%20Back%20Queue/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "Design Front Middle Back Queue",
    "titleCn": "设计前中后队列",
    "titleSlug": "design-front-middle-back-queue",
    "url": "https://leetcode.cn/problems/design-front-middle-back-queue/description/",
    "statementPreview": "请你设计一个队列，支持在前，中，后三个位置的 push 和 pop 操作。 请你完成 FrontMiddleBack 类： FrontMiddleBack() 初始化队列。 void pushFront(int val) 将 val 添加到队列的 最前面。 void pushMiddle(int val) 将 val 添加到队列的 正中间。 void pushBack(int val) 将 val 添加到队里的 最后面。 int popFront() 将 最前面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1。 int popMiddle() 将 正中间 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1。 int popBack() 将 最后面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1。 请注意当有 两个 中间位置的时候，选择靠前面的位置进行操作。比方说： 将 6 添加到 [1, 2, 3, 4, 5] 的中间位置，结果数组为 [1, 2, 6 , 3, 4, 5]。 从 [1, 2, 3 , 4, 5, 6] 的中间位置弹出元素，返回 3，数组变为 [1, 2, 4, 5, 6]。",
    "approachPreview": "我们用两个双端队列，其中 q_1 存储前半部分，而 q_2 存储后半部分。每次由 rebalance 函数来维护两个队列的平衡性，即保持 q_2 的长度大于等于 q_1 的长度，且长度之差不超过 1。 在 pushFront、 pushMiddle 和 pushBack 函数中，我们只需要将元素添加到 q_1 或 q_2 中，并调用 rebalance 函数即可。 对于 popFront 函数，我们需要判断 q_1 和 q_2 是否为空，如果都为空，则返回 -1，否则我们需要判断 q_1 是否为空，如果不为空，则弹出 q_1 的队首元素，否则弹出 q_2 的队首元素，并调用 rebalance 函数。 对于 popMiddle 函数，我们需要判断 q_1 和 q_2 是否为空，如果都为空，则返回 -1，否则我们需要判断 q_1 和 q_2 的长度是否相等，如果相等，则弹出 q_1 的队尾元素，否则弹出 q_2 的队首元素，并调用 rebalance 函数。 对于 popBack 函数，我们只需要判断 q_2 是否为空，如果为空，则返回 -1，否则弹出 q_2 的队尾元素，并调用 rebalance 函数。 以上操作的时间复杂度均为 O(1)，空间复杂度为 O(n)，其中 n 是队列中的元素数量。",
    "followUps": [
      {
        "question": "这题和队列与双端队列设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计前中后队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "63.3%",
    "difficulty": "中等",
    "frontendId": "1756",
    "paidOnly": true,
    "seriesKeys": [
      "queue-deque-design"
    ],
    "seriesPrimaryKey": "queue-deque-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1756.Design%20Most%20Recently%20Used%20Queue/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Design Most Recently Used Queue",
    "titleCn": "设计最近使用（MRU）队列",
    "titleSlug": "design-most-recently-used-queue",
    "url": "https://leetcode.cn/problems/design-most-recently-used-queue/description/",
    "statementPreview": "设计一种类似队列的数据结构，该数据结构将最近使用的元素移到队列尾部。 实现 MRUQueue 类： MRUQueue(int n) 使用 n 个元素： [1,2,3,...,n] 构造 MRUQueue。 fetch(int k) 将第 k 个元素 （从 1 开始索引） 移到队尾，并返回该元素。 示例 1： 输入： [\"MRUQueue\", \"fetch\", \"fetch\", \"fetch\", \"fetch\"] [[8], [3], [5], [2], [8]] 输出： [null, 3, 6, 2, 2] 解释： MRUQueue mRUQueue = new MRUQueue(8); // 初始化队列为 [1,2,3,4,5,6,7,8]。 mRUQueue.fetch(3); // 将第 3 个元素 (3) 移到队尾，使队列变为 [1,2,4,5,6,7,8,3] 并返回该元素。 mRUQueue.fetch(5); // 将第 5 个元素 (6) 移到队尾，使队列变为 [1,2,4,5,7,8,3,6] 并返回该元素。 mRUQueue.fetch(2); // 将第 2 个元素 (2) 移到队尾，使队列变为 [1,4,5,7,8,3,6,2] 并返回该元素。 mRUQueue.",
    "approachPreview": "我们用一个数组 q 维护当前队列中的元素，移动第 k 个元素时，我们考虑不删除该元素，而是直接将其追加到数组末尾。如果不删除，我们如何知道第 k 个元素在数组 q 中的位置呢？ 我们可以用一个树状数组维护数组 q 中每个位置的元素是否被删除，如果第 i 个位置的元素被删除，那么我们更新树状数组中的第 i 个位置，表示该位置被移动的次数增加 1。这样，我们每次要删除第 k 个元素时，可以用二分查找，找到第一个满足 i - tree.query(i) \\geq k 的位置 i，即为第 k 个元素在数组 q 中的位置。不妨记 x=q[i]，那么我们将 x 追加到数组 q 的末尾，同时更新树状数组中第 i 个位置的值，表示该位置被移动的次数增加 1。最后，我们返回 x 即可。 时间复杂度 (\\log ^2 n)，空间复杂度 O(n)。其中 n 为队列的长度。",
    "followUps": [
      {
        "question": "这题和队列与双端队列设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计最近使用（MRU）队列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写容器题最应该先确认哪些 API 语义？",
        "answer": "先逐个写出 push、pop、peek、empty 等操作对内部状态的影响，再确认空结构、满容量、重复元素和连续调用的返回值；摊还复杂度题要说明昂贵操作发生的总次数。"
      }
    ]
  },
  {
    "acRate": "46.3%",
    "difficulty": "困难",
    "frontendId": "432",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design",
      "frequency-bucket-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0432.All%20O%60one%20Data%20Structure/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "All O`one Data Structure",
    "titleCn": "全 O(1) 的数据结构",
    "titleSlug": "all-oone-data-structure",
    "url": "https://leetcode.cn/problems/all-oone-data-structure/description/",
    "statementPreview": "请你设计一个用于存储字符串计数的数据结构，并能够返回计数最小和最大的字符串。 实现 AllOne 类： AllOne() 初始化数据结构的对象。 inc(String key) 字符串 key 的计数增加 1。如果数据结构中尚不存在 key，那么插入计数为 1 的 key。 dec(String key) 字符串 key 的计数减少 1。如果 key 的计数在减少后为 0，那么需要将这个 key 从数据结构中删除。测试用例保证：在减少计数前， key 存在于数据结构中。 getMaxKey() 返回任意一个计数最大的字符串。如果没有元素存在，返回一个空字符串 \"\"。 getMinKey() 返回任意一个计数最小的字符串。如果没有元素存在，返回一个空字符串 \"\"。 注意： 每个函数都应当满足 O(1) 平均时间复杂度。",
    "approachPreview": "全 O(1) 的数据结构 属于哈希表手写系列中的一个变体。主要标签是 设计、哈希表、链表、双向链表。先把每个 API 需要维护的状态列出来，再选择哈希表、堆、链表或树等结构保证更新和查询复杂度；实现时要让初始化、重复调用和空结构行为都可预测。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 全 O(1) 的数据结构 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "65.1%",
    "difficulty": "简单",
    "frontendId": "705",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0705.Design%20HashSet/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "hash-function",
        "name": "哈希函数"
      }
    ],
    "title": "Design HashSet",
    "titleCn": "设计哈希集合",
    "titleSlug": "design-hashset",
    "url": "https://leetcode.cn/problems/design-hashset/description/",
    "statementPreview": "不使用任何内建的哈希表库设计一个哈希集合（HashSet）。 实现 MyHashSet 类： void add(key) 向哈希集合中插入值 key。 bool contains(key) 返回哈希集合中是否存在这个值 key。 void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。",
    "approachPreview": "直接创建一个大小为 1000001 的数组，初始时数组中的每个元素都为 false，表示哈希集合中不存在该元素。 往哈希集合添加元素时，将数组中对应位置的值置为 true；删除元素时，将数组中对应位置的值置为 false；当查询元素是否存在时，直接返回数组中对应位置的值即可。 以上操作的时间复杂度均为 O(1)。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计哈希集合 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "65.2%",
    "difficulty": "简单",
    "frontendId": "706",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0706.Design%20HashMap/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "hash-function",
        "name": "哈希函数"
      }
    ],
    "title": "Design HashMap",
    "titleCn": "设计哈希映射",
    "titleSlug": "design-hashmap",
    "url": "https://leetcode.cn/problems/design-hashmap/description/",
    "statementPreview": "不使用任何内建的哈希表库设计一个哈希映射（HashMap）。 实现 MyHashMap 类： MyHashMap() 用空映射初始化对象 void put(int key, int value) 向 HashMap 插入一个键值对 (key, value)。如果 key 已经存在于映射中，则更新其对应的值 value。 int get(int key) 返回特定的 key 所映射的 value；如果映射中不包含 key 的映射，返回 -1。 void remove(key) 如果映射中存在 key 的映射，则移除 key 和它所对应的 value。",
    "approachPreview": "直接创建一个大小为 1000001 的数组，初始时数组中的每个元素都为 -1，表示哈希表中不存在该键值对。 调用 put 方法时，将数组中对应的位置赋值为 value；调用 get 方法时，返回数组中对应的位置的值；调用 remove 方法时，将数组中对应的位置赋值为 -1。 以上操作，时间复杂度均为 O(1)。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计哈希映射 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "53.7%",
    "difficulty": "中等",
    "frontendId": "981",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design",
      "history-version-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0981.Time%20Based%20Key-Value%20Store/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Time Based Key-Value Store",
    "titleCn": "基于时间的键值存储",
    "titleSlug": "time-based-key-value-store",
    "url": "https://leetcode.cn/problems/time-based-key-value-store/description/",
    "statementPreview": "设计一个基于时间的键值数据结构，该结构可以在不同时间戳存储对应同一个键的多个值，并针对特定时间戳检索键对应的值。 实现 TimeMap 类： TimeMap() 初始化数据结构对象 void set(String key, String value, int timestamp) 存储给定时间戳 timestamp 时的键 key 和值 value。 String get(String key, int timestamp) 返回一个值，该值在之前调用了 set，其中 timestamp_prev <= timestamp。如果有多个这样的值，它将返回与最大 timestamp_prev 关联的值。如果没有值，则返回空字符串（ \"\" ）。",
    "approachPreview": "我们可以用哈希表 \\textit{kvt} 记录键值对，其中键为字符串 \\textit{key}，值为一个有序集合，集合中的每个元素为一个二元组 (\\textit{timestamp}, \\textit{value})，表示键 \\textit{key} 在时间戳 \\textit{timestamp} 时对应的值为 \\textit{value}。 当我们需要查询键 \\textit{key} 在时间戳 \\textit{timestamp} 时对应的值时，我们可以通过有序集合的方法找到最大的时间戳 \\textit{timestamp}'，使得 \\textit{timestamp}' \\leq \\textit{timestamp}，然后返回对应的值即可。 时间复杂度方面，对于 \\textit{set} 操作，由于哈希表的插入操作的时间复杂度为 O(1)，因此时间复杂度为 O(1)。对于 \\textit{get} 操作，由于哈希表的查找操作的时间复杂度为 O(1)，而有序集合的查找操作的时间复杂度为 O(\\log n)，因此时间复杂度为 O(\\log n)。空间复杂度为 O(n)，其中 n 为 \\textit{set} 操作的次数。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 基于时间的键值存储 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "49.6%",
    "difficulty": "中等",
    "frontendId": "2349",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design",
      "frequency-bucket-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2349.Design%20a%20Number%20Container%20System/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Design a Number Container System",
    "titleCn": "设计数字容器系统",
    "titleSlug": "design-a-number-container-system",
    "url": "https://leetcode.cn/problems/design-a-number-container-system/description/",
    "statementPreview": "设计一个数字容器系统，可以实现以下功能： 在系统中给定下标处 插入 或者 替换 一个数字。 返回 系统中给定数字的最小下标。 请你实现一个 NumberContainers 类： NumberContainers() 初始化数字容器系统。 void change(int index, int number) 在下标 index 处填入 number。如果该下标 index 处已经有数字了，那么用 number 替换该数字。 int find(int number) 返回给定数字 number 在系统中的最小下标。如果系统中没有 number，那么返回 -1。",
    "approachPreview": "我们用一个哈希表 d 记录下标和数字的映射关系，用一个哈希表 g 记录每个数字对应的下标集合，这里我们可以使用有序集合来存储下标，这样我们就可以方便地找到最小下标。 调用 change 方法时，我们先判断下标是否已经存在，如果存在，我们就将原来的数字从对应的下标集合中删除，然后将新的数字添加到对应的下标集合中。时间复杂度 O(\\log n)。 调用 find 方法时，我们直接返回对应数字的下标集合的第一个元素即可。时间复杂度 O(1)。 空间复杂度 O(n)。其中 n 为数字的个数。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计数字容器系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "42.4%",
    "difficulty": "中等",
    "frontendId": "2671",
    "paidOnly": false,
    "seriesKeys": [
      "hash-table-design",
      "frequency-bucket-design"
    ],
    "seriesPrimaryKey": "hash-table-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2600-2699/2671.Frequency%20Tracker/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Frequency Tracker",
    "titleCn": "频率跟踪器",
    "titleSlug": "frequency-tracker",
    "url": "https://leetcode.cn/problems/frequency-tracker/description/",
    "statementPreview": "请你设计并实现一个能够对其中的值进行跟踪的数据结构，并支持对频率相关查询进行应答。 实现 FrequencyTracker 类： FrequencyTracker()：使用一个空数组初始化 FrequencyTracker 对象。 void add(int number)：添加一个 number 到数据结构中。 void deleteOne(int number)：从数据结构中删除一个 number。数据结构 可能不包含 number，在这种情况下不删除任何内容。 bool hasFrequency(int frequency) : 如果数据结构中存在出现 frequency 次的数字，则返回 true，否则返回 false。",
    "approachPreview": "我们定义两个哈希表，其中 cnt 用于记录每个数字出现的次数，而 freq 用于记录每个出现次数的数字的个数。 对于 add 操作，我们直接将哈希表 freq 中 cnt[number] 对应的值减一，然后将 cnt[number] 加一，再将 freq[cnt[number]] 对应的值加一。 对于 deleteOne 操作，我们首先判断 cnt[number] 是否大于零，如果大于零，我们将哈希表 freq 中 cnt[number] 对应的值减一，然后将 cnt[number] 减一，再将 freq[cnt[number]] 对应的值加一。 对于 hasFrequency 操作，我们直接返回 freq[frequency] 是否大于零。 时间复杂度方面，由于我们使用了哈希表，因此每个操作的时间复杂度均为 O(1)。空间复杂度 O(n)，其中 n 为不同的数字的个数。",
    "followUps": [
      {
        "question": "这题和哈希表手写系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 频率跟踪器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "手写 HashMap 时 resize 的关键不变量是什么？",
        "answer": "扩容必须在 load factor 超阈值后重新分桶，迁移过程中不能丢 key、不能破坏冲突链或开放寻址探测序列；删除还要区分空桶和墓碑，避免后续查找提前停止。"
      }
    ]
  },
  {
    "acRate": "43.6%",
    "difficulty": "中等",
    "frontendId": "3092",
    "paidOnly": false,
    "seriesKeys": [
      "frequency-bucket-design",
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "frequency-bucket-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3092.Most%20Frequent%20IDs/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Most Frequent IDs",
    "titleCn": "最高频率的 ID",
    "titleSlug": "most-frequent-ids",
    "url": "https://leetcode.cn/problems/most-frequent-ids/description/",
    "statementPreview": "你需要在一个集合里动态记录 ID 的出现频率。给你两个长度都为 n 的整数数组 nums 和 freq， nums 中每一个元素表示一个 ID，对应的 freq 中的元素表示这个 ID 在集合中此次操作后需要增加或者减少的数目。 增加 ID 的数目： 如果 freq[i] 是正数，那么 freq[i] 个 ID 为 nums[i] 的元素在第 i 步操作后会添加到集合中。 减少 ID 的数目： 如果 freq[i] 是负数，那么 -freq[i] 个 ID 为 nums[i] 的元素在第 i 步操作后会从集合中删除。 请你返回一个长度为 n 的数组 ans，其中 ans[i] 表示第 i 步操作后出现频率最高的 ID 数目，如果在某次操作后集合为空，那么 ans[i] 为 0。",
    "approachPreview": "我们用一个哈希表 cnt 来记录每个 ID 的出现次数，用一个哈希表 lazy 来记录每个次数需要被删除的个数。用一个优先队列 pq 来维护出现次数的最大值。 每一次操作 (x, f)，我们需要更新 x 的出现次数 cnt[x]，这意味着 cnt[x] 在 lazy 中的值需要增加 1，表示该次数需要删除的个数增加 1。然后我们更新 cnt[x] 的值，将 cnt[x] 加上 f。然后我们更新后的 cnt[x] 的值加入优先队列 pq 中。然后我们检查优先队列 pq 的堆顶元素，如果 lazy 中对应的次数需要删除的个数大于 0，我们就将堆顶元素弹出。最后，我们判断优先队列是否为空，如果不为空，堆顶元素就是出现次数的最大值，我们将其加入答案数组中。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和频次桶设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最高频率的 ID 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "为什么频次结构常用双层哈希或频次桶？",
        "answer": "key 到节点的哈希表保证 O(1) 定位，频次到有序 key 集合或双向链表保证 O(1) 迁移；LFU 还要维护当前最小频次，才能在容量满时稳定淘汰。"
      }
    ]
  },
  {
    "acRate": "38.8%",
    "difficulty": "中等",
    "frontendId": "1146",
    "paidOnly": false,
    "seriesKeys": [
      "history-version-design"
    ],
    "seriesPrimaryKey": "history-version-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1146.Snapshot%20Array/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Snapshot Array",
    "titleCn": "快照数组",
    "titleSlug": "snapshot-array",
    "url": "https://leetcode.cn/problems/snapshot-array/description/",
    "statementPreview": "实现支持下列接口的「快照数组」- SnapshotArray： SnapshotArray(int length) - 初始化一个与指定长度相等的 类数组 的数据结构。 初始时，每个元素都等于 0。 void set(index, val) - 会将指定索引 index 处的元素设置为 val。 int snap() - 获取该数组的快照，并返回快照的编号 snap_id （快照号是调用 snap() 的总次数减去 1 ）。 int get(index, snap_id) - 根据指定的 snap_id 选择快照，并返回该快照指定索引 index 的值。",
    "approachPreview": "我们维护一个长度为 \\textit{length} 的数组，数组中的每个元素是一个列表，用来存储每次设置的值以及对应的快照 ID。 调用 set 方法时，将值和快照 ID 添加到对应索引的列表中。时间复杂度 O(1)。 调用 snap 方法时，我们先将快照 ID 加一，然后返回快照 ID 减一。时间复杂度 O(1)。 调用 get 方法时，我们使用二分查找找到对应位置的第一个快照 ID 大于 snap_id 的值，然后返回前一个的值。如果找不到，则返回 0。时间复杂度 O(\\log n)。 空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和历史与版本设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 快照数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "历史版本题为什么常用游标或版本号？",
        "answer": "浏览器历史的核心是当前位置游标和截断未来记录；快照与时间键值表的核心是只记录变化点，用版本号或时间戳二分找到不超过查询时刻的最新值。"
      }
    ]
  },
  {
    "acRate": "69.9%",
    "difficulty": "中等",
    "frontendId": "1472",
    "paidOnly": false,
    "seriesKeys": [
      "history-version-design"
    ],
    "seriesPrimaryKey": "history-version-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1472.Design%20Browser%20History/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "Design Browser History",
    "titleCn": "设计浏览器历史记录",
    "titleSlug": "design-browser-history",
    "url": "https://leetcode.cn/problems/design-browser-history/description/",
    "statementPreview": "你有一个只支持单个标签页的 浏览器，最开始你浏览的网页是 homepage，你可以访问其他的网站 url，也可以在浏览历史中后退 steps 步或前进 steps 步。 请你实现 BrowserHistory 类： BrowserHistory(string homepage)，用 homepage 初始化浏览器类。 void visit(string url) 从当前页跳转访问 url 对应的页面。执行此操作会把浏览历史前进的记录全部删除。 string back(int steps) 在浏览历史中后退 steps 步。如果你只能在浏览历史中后退至多 x 步且 steps > x，那么你只后退 x 步。请返回后退 至多 steps 步以后的 url。 string forward(int steps) 在浏览历史中前进 steps 步。如果你只能在浏览历史中前进至多 x 步且 steps > x，那么你只前进 x 步。请返回前进 至多 steps 步以后的 url。",
    "approachPreview": "我们可以使用两个栈 \\textit{stk1} 和 \\textit{stk2} 分别存储浏览后退页面和前进页面。初始时 \\textit{stk1} 包含 \\textit{homepage}，而 \\textit{stk2} 为空。 调用 \\text{visit}(url) 时，我们将 \\textit{url} 加入 \\textit{stk1}，并清空 \\textit{stk2}。时间复杂度 O(1)。 调用 \\text{back}(steps) 时，我们将 \\textit{stk1} 的栈顶元素弹出并加入 \\textit{stk2}，重复这一操作 steps 次，直到 \\textit{stk1} 的长度为 1 或者 steps 为 0。最后返回 \\textit{stk1} 的栈顶元素。时间复杂度 O(\\textit{steps})。 调用 \\text{forward}(steps) 时，我们将 \\textit{stk2} 的栈顶元素弹出并加入 \\textit{stk1}，重复这一操作 steps 次，直到 \\textit{stk2} 为空或者 steps 为 0。最后返回 \\textit{stk1} 的栈顶元素。时间复杂度 O(\\textit{steps})。 空间复杂度 O(n)，其中 n 是浏览历史记录的长度。",
    "followUps": [
      {
        "question": "这题和历史与版本设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计浏览器历史记录 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "历史版本题为什么常用游标或版本号？",
        "answer": "浏览器历史的核心是当前位置游标和截断未来记录；快照与时间键值表的核心是只记录变化点，用版本号或时间戳二分找到不超过查询时刻的最新值。"
      }
    ]
  },
  {
    "acRate": "35.8%",
    "difficulty": "中等",
    "frontendId": "192",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0192.Word%20Frequency/README.md",
    "tags": [
      {
        "slug": "shell",
        "name": "Shell"
      }
    ],
    "title": "Word Frequency",
    "titleCn": "统计词频",
    "titleSlug": "word-frequency",
    "url": "https://leetcode.cn/problems/word-frequency/description/",
    "statementPreview": "写一个 bash 脚本以统计一个文本文件 words.txt 中每个单词出现的 频率。 为了简单起见，你可以假设： words.txt 只包括小写字母和 ' '。 每个单词只由小写字母组成。 单词间由一个或多个空格字符分隔。",
    "approachPreview": "统计词频 属于Top K 高频统计系列中的一个变体。主要标签是 Shell。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计词频 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "65.8%",
    "difficulty": "中等",
    "frontendId": "347",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0347.Top%20K%20Frequent%20Elements/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "bucket-sort",
        "name": "桶排序"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Top K Frequent Elements",
    "titleCn": "前 K 个高频元素",
    "titleSlug": "top-k-frequent-elements",
    "url": "https://leetcode.cn/problems/top-k-frequent-elements/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。",
    "approachPreview": "我们可以使用一个哈希表 \\textit{cnt} 统计每个元素出现的次数，然后使用一个小根堆（优先队列）来保存前 k 个高频元素。 我们首先遍历一遍数组，统计每个元素出现的次数，然后遍历哈希表，将元素和出现次数存入小根堆中。如果小根堆的大小超过了 k，我们就将堆顶元素弹出，保证堆的大小始终为 k。 最后，我们将小根堆中的元素依次弹出，放入结果数组中即可。 时间复杂度 O(n \\times \\log k)，空间复杂度 O(k)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 前 K 个高频元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "72.5%",
    "difficulty": "中等",
    "frontendId": "451",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0451.Sort%20Characters%20By%20Frequency/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "bucket-sort",
        "name": "桶排序"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Sort Characters By Frequency",
    "titleCn": "根据字符出现频率排序",
    "titleSlug": "sort-characters-by-frequency",
    "url": "https://leetcode.cn/problems/sort-characters-by-frequency/description/",
    "statementPreview": "给定一个字符串 s，根据字符出现的 频率 对其进行 降序排序。一个字符出现的 频率 是它出现在字符串中的次数。 返回 已排序的字符串。如果有多个答案，返回其中任何一个。",
    "approachPreview": "我们用哈希表 \\textit{cnt} 统计字符串 s 中每个字符出现的次数，然后将 \\textit{cnt} 中的键值对按照出现次数降序排序，最后按照排序后的顺序拼接字符串即可。 时间复杂度 O(n + k \\times \\log k)，空间复杂度 O(n + k)，其中 n 为字符串 s 的长度，而 k 为不同字符的个数。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 根据字符出现频率排序 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "76.5%",
    "difficulty": "中等",
    "frontendId": "508",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0508.Most%20Frequent%20Subtree%20Sum/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Most Frequent Subtree Sum",
    "titleCn": "出现次数最多的子树元素和",
    "titleSlug": "most-frequent-subtree-sum",
    "url": "https://leetcode.cn/problems/most-frequent-subtree-sum/description/",
    "statementPreview": "给你一个二叉树的根结点 root，请返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。 一个结点的 「子树元素和」 定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。",
    "approachPreview": "我们可以使用一个哈希表 \\textit{cnt} 记录每个子树元素和出现的次数，然后使用深度优先搜索遍历整棵树，统计每个子树的元素和，并更新 \\textit{cnt}。 最后，我们遍历 \\textit{cnt}，找到所有出现次数最多的子树元素和。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为二叉树的节点个数。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 出现次数最多的子树元素和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "56.6%",
    "difficulty": "中等",
    "frontendId": "692",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0692.Top%20K%20Frequent%20Words/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "bucket-sort",
        "name": "桶排序"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Top K Frequent Words",
    "titleCn": "前K个高频单词",
    "titleSlug": "top-k-frequent-words",
    "url": "https://leetcode.cn/problems/top-k-frequent-words/description/",
    "statementPreview": "给定一个单词列表 words 和一个整数 k，返回前 k 个出现次数最多的单词。 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率， 按字典顺序 排序。",
    "approachPreview": "我们可以用一个哈希表 \\textit{cnt} 记录每一个单词出现的次数，然后对哈希表中的键值对按照值进行排序，如果值相同，按照键进行排序。 最后取出前 k 个键即可。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为单词的个数。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 前K个高频单词 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "39.2%",
    "difficulty": "中等",
    "frontendId": "1348",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency",
      "stream-statistics-design",
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1348.Tweet%20Counts%20Per%20Frequency/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Tweet Counts Per Frequency",
    "titleCn": "推文计数",
    "titleSlug": "tweet-counts-per-frequency",
    "url": "https://leetcode.cn/problems/tweet-counts-per-frequency/description/",
    "statementPreview": "一家社交媒体公司正试图通过分析特定时间段内出现的推文数量来监控其网站上的活动。这些时间段可以根据特定的频率（ 每分钟、 每小时 或 每一天 ）划分为更小的 时间段。 例如，周期 [10,10000] （以 秒 为单位）将被划分为以下频率的 时间块 : 每 分钟 (60秒 块)： [10,69] , [70,129] , [130,189] , ... , [9970,10000] 每 小时 (3600秒 块)： [10,3609] , [3610,7209] , [7210,10000] 每 天 (86400秒 块)： [10,10000] 注意，最后一个块可能比指定频率的块大小更短，并且总是以时间段的结束时间结束(在上面的示例中为 10000 )。 设计和实现一个API来帮助公司进行分析。 实现 TweetCounts 类: TweetCounts() 初始化 TweetCounts 对象。 存储记录时间的 tweetName (以秒为单位)。",
    "approachPreview": "我们用哈希表 data 记录每个用户的推文时间，用有序列表记录每个用户的所有推文时间。 对于 recordTweet 操作，我们将推文时间加入到用户的推文时间列表中。 对于 getTweetCountsPerFrequency 操作，我们先计算出时间间隔 f，然后遍历用户的推文时间列表，统计每个时间间隔内的推文数量。 时间复杂度，对于 recordTweet 操作，总的时间复杂度 O(n \\times \\log n)；对于 getTweetCountsPerFrequency 操作，总的时间复杂度 O(q \\times (t + \\log n))。其中 n, q 和 t 分别表示插入的推文数量，查询的次数和时间间隔的长度。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 推文计数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "75.2%",
    "difficulty": "简单",
    "frontendId": "1636",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1636.Sort%20Array%20by%20Increasing%20Frequency/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Sort Array by Increasing Frequency",
    "titleCn": "按照频率将数组升序排序",
    "titleSlug": "sort-array-by-increasing-frequency",
    "url": "https://leetcode.cn/problems/sort-array-by-increasing-frequency/description/",
    "statementPreview": "给你一个整数数组 nums，请你将数组按照每个值的频率 升序 排序。如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。 请你返回排序后的数组。",
    "approachPreview": "用数组或者哈希表统计 nums 中每个数字出现的次数，由于题目中数字的范围是 [-100, 100]，我们可以直接创建一个大小为 201 的数组来统计。 然后对 nums 按照数字出现次数升序排序，如果出现次数相同，则按照数字降序排序。 时间复杂度为 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 按照频率将数组升序排序 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "44.7%",
    "difficulty": "中等",
    "frontendId": "2080",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency",
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2080.Range%20Frequency%20Queries/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Range Frequency Queries",
    "titleCn": "区间内查询数字的频率",
    "titleSlug": "range-frequency-queries",
    "url": "https://leetcode.cn/problems/range-frequency-queries/description/",
    "statementPreview": "请你设计一个数据结构，它能求出给定子数组内一个给定值的 频率。 子数组中一个值的 频率 指的是这个子数组中这个值的出现次数。 请你实现 RangeFreqQuery 类： RangeFreqQuery(int[] arr) 用下标从 0 开始的整数数组 arr 构造一个类的实例。 int query(int left, int right, int value) 返回子数组 arr[left...right] 中 value 的 频率。 一个 子数组 指的是数组中一段连续的元素。 arr[left...right] 指的是 nums 中包含下标 left 和 right 在内 的中间一段连续元素。",
    "approachPreview": "我们用一个哈希表 g 来存储每个值对应的下标数组。在构造函数中，我们遍历数组 \\textit{arr}，将每个值对应的下标加入到哈希表中。 在查询函数中，我们首先判断哈希表中是否存在给定的值。如果不存在，说明该值在数组中不存在，直接返回 0。否则，我们获取该值对应的下标数组 \\textit{idx}。然后我们使用二分查找找到下标数组中第一个大于等于 \\textit{left} 的下标 l，以及第一个大于 \\textit{right} 的下标 r。最后返回 r - l 即可。 时间复杂度方面，构造函数的时间复杂度为 O(n)，查询函数的时间复杂度为 O(\\log n)。其中 n 为数组的长度。空间复杂度为 O(n)。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区间内查询数字的频率 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "53.5%",
    "difficulty": "中等",
    "frontendId": "2512",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-frequency"
    ],
    "seriesPrimaryKey": "top-k-frequency",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2512.Reward%20Top%20K%20Students/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Reward Top K Students",
    "titleCn": "奖励最顶尖的 K 名学生",
    "titleSlug": "reward-top-k-students",
    "url": "https://leetcode.cn/problems/reward-top-k-students/description/",
    "statementPreview": "给你两个字符串数组 positive_feedback 和 negative_feedback，分别包含表示正面的和负面的词汇。 不会 有单词同时是正面的和负面的。 一开始，每位学生分数为 0。每个正面的单词会给学生的分数 加 3 分，每个负面的词会给学生的分数 减 1 分。 给你 n 个学生的评语，用一个下标从 0 开始的字符串数组 report 和一个下标从 0 开始的整数数组 student_id 表示，其中 student_id[i] 表示这名学生的 ID，这名学生的评语是 report[i]。每名学生的 ID 互不相同。 给你一个整数 k，请你返回按照得分 从高到低 最顶尖的 k 名学生。如果有多名学生分数相同，ID 越小排名越前。",
    "approachPreview": "我们可以将正面的单词存入哈希表 ps 中，将负面的单词存入哈希表 ns 中。 然后遍历 report，对于每个学生，我们将其得分存入数组 arr 中，数组中的每个元素为一个二元组 (t, sid)，其中 t 表示学生的得分，而 sid 表示学生的 ID。 最后我们对数组 arr 按照得分从高到低排序，如果得分相同则按照 ID 从小到大排序，然后取出前 k 个学生的 ID 即可。 时间复杂度 O(n \\times \\log n + ( ps + ns + n) \\times s )，空间复杂度 O(( ps + ns ) \\times s + n)。其中 n 为学生数量， ps 和 ns 分别为正面和负面单词的数量， s 为单词的平均长度。",
    "followUps": [
      {
        "question": "这题和Top K 高频统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 奖励最顶尖的 K 名学生 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "63.8%",
    "difficulty": "困难",
    "frontendId": "23",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0023.Merge%20k%20Sorted%20Lists/README.md",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      },
      {
        "slug": "merge-sort",
        "name": "归并排序"
      }
    ],
    "title": "Merge k Sorted Lists",
    "titleCn": "合并 K 个升序链表",
    "titleSlug": "merge-k-sorted-lists",
    "url": "https://leetcode.cn/problems/merge-k-sorted-lists/description/",
    "statementPreview": "给你一个链表数组，每个链表都已经按升序排列。 请你将所有链表合并到一个升序链表中，返回合并后的链表。",
    "approachPreview": "我们可以创建一个小根堆来 pq 维护所有链表的头节点，每次从小根堆中取出值最小的节点，添加到结果链表的末尾，然后将该节点的下一个节点加入堆中，重复上述步骤直到堆为空。 时间复杂度 O(n \\times \\log k)，空间复杂度 O(k)。其中 n 是所有链表节点数目的总和，而 k 是题目给定的链表数目。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 合并 K 个升序链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "60.2%",
    "difficulty": "中等",
    "frontendId": "215",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0215.Kth%20Largest%20Element%20in%20an%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Kth Largest Element in an Array",
    "titleCn": "数组中的第K个最大元素",
    "titleSlug": "kth-largest-element-in-an-array",
    "url": "https://leetcode.cn/problems/kth-largest-element-in-an-array/description/",
    "statementPreview": "给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。",
    "approachPreview": "快速选择算法是一种在未排序的数组中查找第 k 个最大元素或最小元素的算法。它的基本思想是每次选择一个基准元素，将数组分为两部分，一部分的元素都比基准元素小，另一部分的元素都比基准元素大，然后根据基准元素的位置，决定继续在左边还是右边查找，直到找到第 k 个最大元素。 时间复杂度 O(n)，空间复杂度 O(\\log n)。其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数组中的第K个最大元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "43.2%",
    "difficulty": "中等",
    "frontendId": "373",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0373.Find%20K%20Pairs%20with%20Smallest%20Sums/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find K Pairs with Smallest Sums",
    "titleCn": "查找和最小的 K 对数字",
    "titleSlug": "find-k-pairs-with-smallest-sums",
    "url": "https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/description/",
    "statementPreview": "给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k。 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2。 请找到和最小的 k 个数对 (u_1,v_1) , (u_2,v_2) ... (u_k,v_k)。",
    "approachPreview": "查找和最小的 K 对数字 属于Top K 选择系列中的一个变体。主要标签是 数组、堆（优先队列）。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 查找和最小的 K 对数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "48.9%",
    "difficulty": "中等",
    "frontendId": "658",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0658.Find%20K%20Closest%20Elements/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find K Closest Elements",
    "titleCn": "找到 K 个最接近的元素",
    "titleSlug": "find-k-closest-elements",
    "url": "https://leetcode.cn/problems/find-k-closest-elements/description/",
    "statementPreview": "给定一个 排序好 的数组 arr，两个整数 k 和 x，从数组中找到最靠近 x （两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。 整数 a 比整数 b 更接近 x 需要满足： a - x < b - x 或者 a - x == b - x 且 a < b",
    "approachPreview": "找到 K 个最接近的元素 属于Top K 选择系列中的一个变体。主要标签是 数组、双指针、二分查找、排序、滑动窗口、堆（优先队列）。先判断答案或分界点是否具有单调性，再写 check 函数；二分过程中要统一开闭区间，最后用边界样例验证返回的是第一个可行还是最后一个可行位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找到 K 个最接近的元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "53.5%",
    "difficulty": "简单",
    "frontendId": "703",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection",
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0703.Kth%20Largest%20Element%20in%20a%20Stream/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Kth Largest Element in a Stream",
    "titleCn": "数据流中的第 K 大元素",
    "titleSlug": "kth-largest-element-in-a-stream",
    "url": "https://leetcode.cn/problems/kth-largest-element-in-a-stream/description/",
    "statementPreview": "设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。 请实现 KthLargest 类： KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。 int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。",
    "approachPreview": "我们维护一个优先队列（小根堆）\\textit{minQ}。 初始化时，我们将数组 \\textit{nums} 中的元素依次加入 \\textit{minQ}，并保持 \\textit{minQ} 的大小不超过 k。时间复杂度 O(n \\times \\log k)。 每次加入一个新元素时，如果 \\textit{minQ} 的大小超过了 k，我们就将堆顶元素弹出，保证 \\textit{minQ} 的大小为 k。时间复杂度 O(\\log k)。 这样，\\textit{minQ} 中的元素就是数组 \\textit{nums} 中最大的 k 个元素，堆顶元素就是第 k 大的元素。 空间复杂度 O(k)。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数据流中的第 K 大元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "65.9%",
    "difficulty": "中等",
    "frontendId": "973",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0973.K%20Closest%20Points%20to%20Origin/README.md",
    "tags": [
      {
        "slug": "geometry",
        "name": "几何"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "K Closest Points to Origin",
    "titleCn": "最接近原点的 K 个点",
    "titleSlug": "k-closest-points-to-origin",
    "url": "https://leetcode.cn/problems/k-closest-points-to-origin/description/",
    "statementPreview": "给定一个数组 points，其中 points[i] = [x_i, y_i] 表示 X-Y 平面上的一个点，并且是一个整数 k，返回离原点 (0,0) 最近的 k 个点。 这里，平面上两点之间的距离是 欧几里德距离 （ √(x_1 - x_2)^2 + (y_1 - y_2)^2 ）。 你可以按 任何顺序 返回答案。除了点坐标的顺序之外，答案 确保 是 唯一 的。",
    "approachPreview": "我们将所有点按照与原点的距离从小到大排序，然后取前 k 个点即可。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 为数组 \\textit{points} 的长度。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最接近原点的 K 个点 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "68.7%",
    "difficulty": "简单",
    "frontendId": "1337",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1337.The%20K%20Weakest%20Rows%20in%20a%20Matrix/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "The K Weakest Rows in a Matrix",
    "titleCn": "矩阵中战斗力最弱的 K 行",
    "titleSlug": "the-k-weakest-rows-in-a-matrix",
    "url": "https://leetcode.cn/problems/the-k-weakest-rows-in-a-matrix/description/",
    "statementPreview": "给你一个大小为 m * n 的矩阵 mat，矩阵由若干军人和平民组成，分别用 1 和 0 表示。 请你返回矩阵中战斗力最弱的 k 行的索引，按从最弱到最强排序。 如果第 i 行的军人数量少于第 j 行，或者两行军人数量相同但 i 小于 j，那么我们认为第 i 行的战斗力比第 j 行弱。 军人 总是 排在一行中的靠前位置，也就是说 1 总是出现在 0 之前。",
    "approachPreview": "矩阵中战斗力最弱的 K 行 属于Top K 选择系列中的一个变体。主要标签是 数组、二分查找、矩阵、排序、堆（优先队列）。先判断答案或分界点是否具有单调性，再写 check 函数；二分过程中要统一开闭区间，最后用边界样例验证返回的是第一个可行还是最后一个可行位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 矩阵中战斗力最弱的 K 行 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "61.0%",
    "difficulty": "中等",
    "frontendId": "1471",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1471.The%20k%20Strongest%20Values%20in%20an%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "The k Strongest Values in an Array",
    "titleCn": "数组中的 k 个最强值",
    "titleSlug": "the-k-strongest-values-in-an-array",
    "url": "https://leetcode.cn/problems/the-k-strongest-values-in-an-array/description/",
    "statementPreview": "给你一个整数数组 arr 和一个整数 k。 设 m 为数组的中位数，只要满足下述两个前提之一，就可以判定 arr[i] 的值比 arr[j] 的值更强： arr[i] - m > arr[j] - m arr[i] - m == arr[j] - m，且 arr[i] > arr[j] 请返回由数组中最强的 k 个值组成的列表。答案可以以 任意顺序 返回。 中位数 是一个有序整数列表中处于中间位置的值。形式上，如果列表的长度为 n，那么中位数就是该有序列表（下标从 0 开始）中位于 ((n - 1) / 2) 的元素。 例如 arr = [6, -3, 7, 2, 11]， n = 5：数组排序后得到 arr = [-3, 2, 6, 7, 11]，数组的中间位置为 m = ((5 - 1) / 2) = 2，中位数 arr[m] 的值为 6。 例如 arr = [-7, 22, 17, 3]， n = 4：数组排序后得到 arr = [-7, 3, 17, 22]，数组的中间位置为 m = ((4 - 1) / 2) = 1，中位数 arr[m] 的值为 3。",
    "approachPreview": "我们首先对数组 \\textit{arr} 进行排序，然后找到数组的中位数 m。 接下来，我们按照题目描述的规则对数组进行排序，最后返回数组的前 k 个元素即可。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 是数组 \\textit{arr} 的长度。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数组中的 k 个最强值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "56.7%",
    "difficulty": "中等",
    "frontendId": "面试题 17.14",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/lcci/17.14.Smallest%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Smallest K LCCI",
    "titleCn": "最小K个数",
    "titleSlug": "smallest-k-lcci",
    "url": "https://leetcode.cn/problems/smallest-k-lcci/description/",
    "statementPreview": "设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。",
    "approachPreview": "如果只需要最小的 k 个数，可以全排序后截取、维护大小为 k 的最大堆，或用快速选择把第 k 小元素放到正确分区。面试里通常比较三者：排序最简单，堆适合数据流，快选平均 O(n)。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小K个数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "44.2%",
    "difficulty": "中等",
    "frontendId": "1985",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1985.Find%20the%20Kth%20Largest%20Integer%20in%20the%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find the Kth Largest Integer in the Array",
    "titleCn": "找出数组中的第 K 大整数",
    "titleSlug": "find-the-kth-largest-integer-in-the-array",
    "url": "https://leetcode.cn/problems/find-the-kth-largest-integer-in-the-array/description/",
    "statementPreview": "给你一个字符串数组 nums 和一个整数 k。 nums 中的每个字符串都表示一个不含前导零的整数。 返回 nums 中表示第 k 大整数的字符串。 注意： 重复的数字在统计时会视为不同元素考虑。例如，如果 nums 是 [\"1\",\"2\",\"2\"]，那么 \"2\" 是最大的整数， \"2\" 是第二大的整数， \"1\" 是第三大的整数。",
    "approachPreview": "我们可以将 \\textit{nums} 数组中的字符串按照整数从大到小排序，然后取第 k 个元素即可。也可以使用快速选择算法，找到第 k 大的整数。 时间复杂度 O(n \\times \\log n) 或 O(n)，其中 n 是 \\textit{nums} 数组的长度。空间复杂度 O(\\log n) 或 O(1)。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出数组中的第 K 大整数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "58.0%",
    "difficulty": "简单",
    "frontendId": "2099",
    "paidOnly": false,
    "seriesKeys": [
      "top-k-selection"
    ],
    "seriesPrimaryKey": "top-k-selection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2099.Find%20Subsequence%20of%20Length%20K%20With%20the%20Largest%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find Subsequence of Length K With the Largest Sum",
    "titleCn": "找到和最大的长度为 K 的子序列",
    "titleSlug": "find-subsequence-of-length-k-with-the-largest-sum",
    "url": "https://leetcode.cn/problems/find-subsequence-of-length-k-with-the-largest-sum/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。你需要找到 nums 中长度为 k 的 子序列，且这个子序列的 和最大。 请你返回 任意 一个长度为 k 的整数子序列。 子序列 定义为从一个数组里删除一些元素后，不改变剩下元素的顺序得到的数组。",
    "approachPreview": "我们先创建一个索引数组 \\textit{idx}，数组中的每个元素是数组 \\textit{nums} 的下标。然后我们根据数组 \\textit{nums} 的值对索引数组 \\textit{idx} 进行排序，排序的规则是 \\textit{nums}[i] < \\textit{nums}[j]，其中 i 和 j 是索引数组 \\textit{idx} 中的两个下标。 排序完成后，我们取索引数组 \\textit{idx} 的最后 k 个元素，这 k 个元素对应的就是数组 \\textit{nums} 中最大的 k 个元素。然后我们对这 k 个下标进行排序，得到的就是最大的 k 个元素在数组 \\textit{nums} 中的顺序。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和Top K 选择系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找到和最大的长度为 K 的子序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "64.9%",
    "difficulty": "中等",
    "frontendId": "378",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0378.Kth%20Smallest%20Element%20in%20a%20Sorted%20Matrix/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Kth Smallest Element in a Sorted Matrix",
    "titleCn": "有序矩阵中第 K 小的元素",
    "titleSlug": "kth-smallest-element-in-a-sorted-matrix",
    "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/description/",
    "statementPreview": "给你一个 n x n 矩阵 matrix，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。 请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。 你必须找到一个内存复杂度优于 O(n^2) 的解决方案。",
    "approachPreview": "有序矩阵中第 K 小的元素 属于第 K 大/第 K 小顺序统计系列中的一个变体。主要标签是 数组、二分查找、矩阵、排序、堆（优先队列）。先判断答案或分界点是否具有单调性，再写 check 函数；二分过程中要统一开闭区间，最后用边界样例验证返回的是第一个可行还是最后一个可行位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有序矩阵中第 K 小的元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "43.1%",
    "difficulty": "困难",
    "frontendId": "440",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0440.K-th%20Smallest%20in%20Lexicographical%20Order/README.md",
    "tags": [
      {
        "slug": "trie",
        "name": "字典树"
      }
    ],
    "title": "K-th Smallest in Lexicographical Order",
    "titleCn": "字典序的第K小数字",
    "titleSlug": "k-th-smallest-in-lexicographical-order",
    "url": "https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/description/",
    "statementPreview": "给定整数 n 和 k，返回 [1, n] 中字典序第 k 小的数字。",
    "approachPreview": "本题要求在区间 [1, n] 中，按**字典序**排序后，找到第 k 小的数字。由于 n 的范围非常大（最多可达 10^9），我们无法直接枚举所有数字后排序。因此我们采用**贪心 + 字典树模拟**的策略。 我们将 [1, n] 看作一棵 **十叉字典树（Trie）**： 每个节点是一个前缀，根节点为空串； 节点的子节点是当前前缀拼接上 0 \\sim 9； 例如前缀 1 会有子节点 10, 11, \\ldots, 19，而 10 会有 100, 101, \\ldots, 109； 这种结构天然符合字典序遍历。 我们使用变量 \\textit{curr} 表示当前前缀，初始为 1。每次我们尝试向下扩展前缀，直到找到第 k 小的数字。 每次我们计算当前前缀下有多少个合法数字（即以 \\textit{curr} 为前缀、且不超过 n 的整数个数），记作 \\textit{count}(\\text{curr})： 如果 k \\ge \\text{count}(\\text{curr})：说明目标不在这棵子树中，跳过整棵子树，前缀右移：\\textit{curr} \\leftarrow \\text{curr} + 1，并更新 k \\leftarrow k - \\text{count}(\\text{curr})；",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 字典序的第K小数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "60.0%",
    "difficulty": "困难",
    "frontendId": "668",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0668.Kth%20Smallest%20Number%20in%20Multiplication%20Table/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Kth Smallest Number in Multiplication Table",
    "titleCn": "乘法表中第k小的数",
    "titleSlug": "kth-smallest-number-in-multiplication-table",
    "url": "https://leetcode.cn/problems/kth-smallest-number-in-multiplication-table/description/",
    "statementPreview": "几乎每一个人都用 乘法表。但是你能在乘法表中快速找到第 k 小的数字吗？ 乘法表是大小为 m x n 的一个整数矩阵，其中 mat[i][j] == i * j （下标从 1 开始）。 给你三个整数 m、 n 和 k，请你在大小为 m x n 的乘法表中，找出并返回第 k 小的数字。",
    "approachPreview": "题目可以转换为，求有多少个数不超过 x。对于每一行 i，所有数都是 i 的倍数，不超过 x 的个数有 x / i 个。 二分枚举 x，累加每一行不超过 x 的个数，得到 cnt。找到 cnt >= k 的最小 x。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 乘法表中第k小的数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "49.4%",
    "difficulty": "困难",
    "frontendId": "719",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0719.Find%20K-th%20Smallest%20Pair%20Distance/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Find K-th Smallest Pair Distance",
    "titleCn": "找出第 K 小的数对距离",
    "titleSlug": "find-k-th-smallest-pair-distance",
    "url": "https://leetcode.cn/problems/find-k-th-smallest-pair-distance/description/",
    "statementPreview": "数对 (a,b) 由整数 a 和 b 组成，其数对距离定义为 a 和 b 的绝对差值。 给你一个整数数组 nums 和一个整数 k，数对由 nums[i] 和 nums[j] 组成且满足 0 <= i < j < nums.length。返回 所有数对距离中 第 k 小的数对距离。",
    "approachPreview": "先对 nums 数组进行排序，然后在 [0, nums[n-1]-nums[0]] 范围内二分枚举数对距离 dist，若 nums 中数对距离小于等于 dist 的数量 cnt 大于等于 k，则尝试缩小 dist，否则尝试扩大 dist。 时间复杂度 O(nlogn×logm)，其中 n 表示 nums 的长度，m 表示 nums 中两个数的最大差值。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出第 K 小的数对距离 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "68.0%",
    "difficulty": "中等",
    "frontendId": "786",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0786.K-th%20Smallest%20Prime%20Fraction/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "K-th Smallest Prime Fraction",
    "titleCn": "第 K 个最小的质数分数",
    "titleSlug": "k-th-smallest-prime-fraction",
    "url": "https://leetcode.cn/problems/k-th-smallest-prime-fraction/description/",
    "statementPreview": "给你一个按递增顺序排序的数组 arr 和一个整数 k。数组 arr 由 1 和若干 质数 组成，且其中所有整数互不相同。 对于每对满足 0 <= i < j < arr.length 的 i 和 j，可以得到分数 arr[i] / arr[j]。 那么第 k 个最小的分数是多少呢? 以长度为 2 的整数数组返回你的答案, 这里 answer[0] == arr[i] 且 answer[1] == arr[j]。",
    "approachPreview": "第 K 个最小的质数分数 属于第 K 大/第 K 小顺序统计系列中的一个变体。主要标签是 数组、双指针、二分查找、排序、堆（优先队列）。先判断答案或分界点是否具有单调性，再写 check 函数；二分过程中要统一开闭区间，最后用边界样例验证返回的是第一个可行还是最后一个可行位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 第 K 个最小的质数分数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "66.4%",
    "difficulty": "困难",
    "frontendId": "1439",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1439.Find%20the%20Kth%20Smallest%20Sum%20of%20a%20Matrix%20With%20Sorted%20Rows/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find the Kth Smallest Sum of a Matrix With Sorted Rows",
    "titleCn": "有序矩阵中的第 k 个最小数组和",
    "titleSlug": "find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows",
    "url": "https://leetcode.cn/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/description/",
    "statementPreview": "给你一个 m * n 的矩阵 mat，以及一个整数 k，矩阵中的每一行都以非递减的顺序排列。 你可以从每一行中选出 1 个元素形成一个数组。返回所有可能数组中的第 k 个 最小 数组和。",
    "approachPreview": "根据题目描述，我们需要找出前 m 行的所有可能数组中的第 k 个最小数组和。 如果我们能够找出前 m - 1 行的所有可能数组中的前 k 个最小数组和，那么我们可以将第 m 行的每个元素与前 m - 1 行的前 k 个最小数组和相加，将得到的所有结果排序后，取前 k 个最小值，即为前 m 行的所有可能数组中的前 k 个最小值。 因此，我们可以定义一个数组 pre，用于存储此前遍历到的行的前 k 个最小数组和，初始时 pre 只有一个元素 0。 然后，我们遍历 mat 的每一行 cur，将 cur 中的每个元素与 pre 中的每个元素相加，将得到的所有结果排序后，取前 k 个最小值作为新的 pre。继续遍历下一行，直到遍历完所有行。 最后返回 pre 中的第 k 个数（下标 k-1）即可。 时间复杂度 O(m \\times n \\times k \\times \\log (n \\times k))，空间复杂度 O(n \\times k)。其中 m 和 n 分别是矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有序矩阵中的第 k 个最小数组和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "68.7%",
    "difficulty": "中等",
    "frontendId": "1738",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1738.Find%20Kth%20Largest%20XOR%20Coordinate%20Value/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find Kth Largest XOR Coordinate Value",
    "titleCn": "找出第 K 大的异或坐标值",
    "titleSlug": "find-kth-largest-xor-coordinate-value",
    "url": "https://leetcode.cn/problems/find-kth-largest-xor-coordinate-value/description/",
    "statementPreview": "给你一个二维矩阵 matrix 和一个整数 k，矩阵大小为 m x n 由非负整数组成。 矩阵中坐标 (a, b) 的 目标值 可以通过对所有元素 matrix[i][j] 执行异或运算得到，其中 i 和 j 满足 0 <= i <= a < m 且 0 <= j <= b < n （ 下标从 0 开始计数 ）。 请你找出 matrix 的所有坐标中第 k 大的目标值（ k 的值从 1 开始计数 ）。",
    "approachPreview": "我们定义一个二维前缀异或数组 s，其中 s[i][j] 表示矩阵前 i 行和前 j 列的元素异或运算的结果，即： s[i][j] = \\bigoplus_{0 \\leq x \\leq i, 0 \\leq y \\leq j} matrix[x][y] 而 s[i][j] 可以由 s[i - 1][j], s[i][j - 1] 和 s[i - 1][j - 1] 三个元素计算得到，即： s[i][j] = s[i - 1][j] \\oplus s[i][j - 1] \\oplus s[i - 1][j - 1] \\oplus matrix[i - 1][j - 1] 我们遍历矩阵，计算出所有的 s[i][j]，然后将其排序，最后返回第 k 大的元素即可。如果不想使用排序，也可以使用快速选择算法，这样可以优化时间复杂度。 时间复杂度 O(m \\times n \\times \\log (m \\times n)) 或 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出第 K 大的异或坐标值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "52.0%",
    "difficulty": "中等",
    "frontendId": "1918",
    "paidOnly": true,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1900-1999/1918.Kth%20Smallest%20Subarray%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Kth Smallest Subarray Sum",
    "titleCn": "第 K 小的子数组和",
    "titleSlug": "kth-smallest-subarray-sum",
    "url": "https://leetcode.cn/problems/kth-smallest-subarray-sum/description/",
    "statementPreview": "给你一个 长度为 n 的整型数组 nums 和一个数值 k，返回 第 k 小的子数组和。 子数组 是指数组中一个 非空 且不间断的子序列。 子数组和 则指子数组中所有元素的和。",
    "approachPreview": "我们注意到，题目中数组元素均为正整数，子数组的和 s 越大，那么数组中子数组和小于等于 s 的个数就越多。这存在一个单调性，因此我们可以考虑使用使用二分查找的方法来求解。 我们二分枚举子数组的和，初始化左右边界分别为数组 \\textit{nums} 中的最小值以及所有元素之和。每次我们计算数组中子数组和小于等于当前枚举值的个数，如果个数大于等于 k，则说明当前枚举值 s 可能是第 k 小的子数组和，我们缩小右边界，否则我们增大左边界。枚举结束后，左边界即为第 k 小的子数组和。 问题转换为计算一个数组中，有多少个子数组的和小于等于 s，我们可以通过函数 f(s) 来计算。 函数 f(s) 的计算方法如下： 初始化双指针 j 和 i，分别指向当前窗口的左右边界，初始时 j = i = 0。初始化窗口内元素的和 t = 0。 用变量 \\textit{cnt} 记录子数组和小于等于 s 的个数，初始时 \\textit{cnt} = 0。 遍历数组 \\textit{nums}，每次遍历到一个元素 \\textit{nums}[i]，我们将其加入窗口，即 t = t + \\textit{nums}[i]。如果此时 t \\gt s，我们需要不断地将窗口的左边界右移，直到 t \\le s 为止，即不断地执行 t -= \\textit{nums}[j]，并且 j = j + 1。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 第 K 小的子数组和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "49.4%",
    "difficulty": "困难",
    "frontendId": "2040",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2040.Kth%20Smallest%20Product%20of%20Two%20Sorted%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Kth Smallest Product of Two Sorted Arrays",
    "titleCn": "两个有序数组的第 K 小乘积",
    "titleSlug": "kth-smallest-product-of-two-sorted-arrays",
    "url": "https://leetcode.cn/problems/kth-smallest-product-of-two-sorted-arrays/description/",
    "statementPreview": "给你两个 从小到大排好序 且下标从 0 开始的整数数组 nums1 和 nums2 以及一个整数 k，请你返回第 k （从 1 开始编号）小的 nums1[i] \\* nums2[j] 的乘积，其中 0 <= i < nums1.length 且 0 <= j < nums2.length。",
    "approachPreview": "我们可以二分枚举乘积的值 p，定义二分的区间为 [l, r]，其中 l = -\\textit{max}( \\textit{nums1}[0] , \\textit{nums1}[n - 1] ) \\times \\textit{max}( \\textit{nums2}[0] , \\textit{nums2}[n - 1] ), r = -l。 对于每个 p，我们计算出乘积小于等于 p 的乘积的个数，如果这个个数大于等于 k，那么说明第 k 小的乘积一定小于等于 p，我们就可以将区间右端点缩小到 p，否则我们将区间左端点增大到 p + 1。 那么问题的关键就是如何计算乘积小于等于 p 的乘积的个数。我们可以枚举 \\textit{nums1} 中的每个数 x，分类讨论： 如果 x > 0，那么 x \\times \\textit{nums2}[i] 随着 i 的增大是单调递增的，我们可以使用二分查找找到最小的 i，使得 x \\times \\textit{nums2}[i] > p，那么 i 就是小于等于 p 的乘积的个数，累加到个数 \\textit{cnt} 中；",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个有序数组的第 K 小乘积 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "43.7%",
    "difficulty": "中等",
    "frontendId": "2343",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2343.Query%20Kth%20Smallest%20Trimmed%20Number/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "radix-sort",
        "name": "基数排序"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Query Kth Smallest Trimmed Number",
    "titleCn": "裁剪数字后查询第 K 小的数字",
    "titleSlug": "query-kth-smallest-trimmed-number",
    "url": "https://leetcode.cn/problems/query-kth-smallest-trimmed-number/description/",
    "statementPreview": "给你一个下标从 0 开始的字符串数组 nums，其中每个字符串 长度相等 且只包含数字。 再给你一个下标从 0 开始的二维整数数组 queries，其中 queries[i] = [k_i, trim_i]。对于每个 queries[i]，你需要： 将 nums 中每个数字 裁剪 到剩下 最右边 trim_i 个数位。 在裁剪过后的数字中，找到 nums 中第 k_i 小数字对应的 下标。如果两个裁剪后数字一样大，那么下标 更小 的数字视为更小的数字。 将 nums 中每个数字恢复到原本字符串。 请你返回一个长度与 queries 相等的数组 answer，其中 answer[i] 是第 i 次查询的结果。",
    "approachPreview": "根据题意，我们可以模拟裁剪过程，然后对裁剪后的字符串进行排序，最后根据下标找到对应的数字即可。 时间复杂度 O(m \\times \\ n \\times \\log n \\times s)，空间复杂度 O(n)。其中 m 和 n 分别为 \\textit{nums} 和 \\textit{queries} 的长度，而 s 为 \\textit{nums}[i] 字符串的长度。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 裁剪数字后查询第 K 小的数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "54.1%",
    "difficulty": "中等",
    "frontendId": "2583",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2583.Kth%20Largest%20Sum%20in%20a%20Binary%20Tree/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Kth Largest Sum in a Binary Tree",
    "titleCn": "二叉树中的第 K 大层和",
    "titleSlug": "kth-largest-sum-in-a-binary-tree",
    "url": "https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/description/",
    "statementPreview": "给你一棵二叉树的根节点 root 和一个正整数 k。 树中的 层和 是指 同一层 上节点值的总和。 返回树中第 k 大的层和（不一定不同）。如果树少于 k 层，则返回 -1。 注意，如果两个节点与根节点的距离相同，则认为它们在同一层。",
    "approachPreview": "我们可以使用 BFS 遍历二叉树，同时记录每一层的节点和，然后对节点和数组进行排序，最后返回第 k 大的节点和即可。注意，如果二叉树的层数小于 k，则返回 -1。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为二叉树的节点数。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树中的第 K 大层和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "25.5%",
    "difficulty": "困难",
    "frontendId": "3116",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3116.Kth%20Smallest%20Amount%20With%20Single%20Denomination%20Combination/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "combinatorics",
        "name": "组合数学"
      },
      {
        "slug": "number-theory",
        "name": "数论"
      }
    ],
    "title": "Kth Smallest Amount With Single Denomination Combination",
    "titleCn": "单面值组合的第 K 小金额",
    "titleSlug": "kth-smallest-amount-with-single-denomination-combination",
    "url": "https://leetcode.cn/problems/kth-smallest-amount-with-single-denomination-combination/description/",
    "statementPreview": "给你一个整数数组 coins 表示不同面额的硬币，另给你一个整数 k。 你有无限量的每种面额的硬币。但是，你 不能 组合使用不同面额的硬币。 返回使用这些硬币能制造的 第 k^th 小 金额。",
    "approachPreview": "我们可以将题目转化为：找到最小的正整数 x，使得小于等于 x 的且满足条件的数的个数恰好为 k 个。如果 x 满足条件，那么对任意 x' > x 的 x' 也满足条件，这存在单调性，因此我们可以使用二分查找，找到最小的满足条件的 x。 我们定义一个函数 check(x)，用来判断小于等于 x 的且满足条件的数的个数是否大于等于 k。我们需要计算有多少个数可以由 coins 中的数组合得到。 假设 coins 为 [a, b]，根据容斥原理，小于等于 x 的满足条件的数的个数为： \\left\\lfloor \\frac{x}{a} \\right\\rfloor + \\left\\lfloor \\frac{x}{b} \\right\\rfloor - \\left\\lfloor \\frac{x}{lcm(a, b)} \\right\\rfloor 如果 coins 为 [a, b, c]，小于等于 x 的满足条件的数的个数为： \\left\\lfloor \\frac{x}{a} \\right\\rfloor + \\left\\lfloor \\frac{x}{b} \\right\\rfloor + \\left\\lfloor \\frac{x}{c} \\right\\rfloor - \\left\\lfloor \\frac{x}{lcm(a, b)} \\right\\rfloor - \\left\\lfloor \\frac{x}{lcm(a, c)} \\ri。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单面值组合的第 K 小金额 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "55.2%",
    "difficulty": "困难",
    "frontendId": "3590",
    "paidOnly": false,
    "seriesKeys": [
      "kth-order-statistics"
    ],
    "seriesPrimaryKey": "kth-order-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3590.Kth%20Smallest%20Path%20XOR%20Sum/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      }
    ],
    "title": "Kth Smallest Path XOR Sum",
    "titleCn": "第 K 小的路径异或和",
    "titleSlug": "kth-smallest-path-xor-sum",
    "url": "https://leetcode.cn/problems/kth-smallest-path-xor-sum/description/",
    "statementPreview": "给定一棵以节点 0 为根的无向树，带有 n 个节点，按 0 到 n - 1 编号。每个节点 i 有一个整数值 vals[i]，并且它的父节点通过 par[i] 给出。 从根节点 0 到节点 u 的 路径异或和 定义为从根节点到节点 u 的路径上所有节点 i 的 vals[i] 的按位异或，包括节点 u。 给定一个 2 维整数数组 queries，其中 queries[j] = [u_j, k_j]。对于每个查询，找到以 u_j 为根的子树的所有节点中，第 k_j 小 的 不同 路径异或和。如果子树中 不同 的异或路径和少于 k_j，答案为 -1。 返回一个整数数组，其中第 j 个元素是第 j 个查询的答案。 在有根树中，节点 v 的子树包括 v 以及所有经过 v 到达根节点路径上的节点，即 v 及其后代节点。",
    "approachPreview": "第 K 小的路径异或和 属于第 K 大/第 K 小顺序统计系列中的一个变体。主要标签是 树、深度优先搜索、数组、有序集合。先判断答案来自子树内部还是跨过当前节点，再用递归返回父节点真正需要的信息；带父指针或多节点条件时要额外维护访问来源。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和第 K 大/第 K 小顺序统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 第 K 小的路径异或和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "44.6%",
    "difficulty": "困难",
    "frontendId": "4",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0004.Median%20of%20Two%20Sorted%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      }
    ],
    "title": "Median of Two Sorted Arrays",
    "titleCn": "寻找两个正序数组的中位数",
    "titleSlug": "median-of-two-sorted-arrays",
    "url": "https://leetcode.cn/problems/median-of-two-sorted-arrays/description/",
    "statementPreview": "给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数。 算法的时间复杂度应该为 O(log (m+n))。",
    "approachPreview": "题目要求算法的时间复杂度为 O(\\log (m + n))，因此不能直接遍历两个数组，而是需要使用二分查找的方法。 如果 m + n 是奇数，那么中位数就是第 \\left\\lfloor\\frac{m + n + 1}{2}\\right\\rfloor 个数；如果 m + n 是偶数，那么中位数就是第 \\left\\lfloor\\frac{m + n + 1}{2}\\right\\rfloor 和第 \\left\\lfloor\\frac{m + n + 2}{2}\\right\\rfloor 个数的平均数。实际上，我们可以统一为求第 \\left\\lfloor\\frac{m + n + 1}{2}\\right\\rfloor 个数和第 \\left\\lfloor\\frac{m + n + 2}{2}\\right\\rfloor 个数的平均数。 因此，我们可以设计一个函数 f(i, j, k)，表示在数组 nums1 的区间 [i, m) 和数组 nums2 的区间 [j, n) 中，求第 k 小的数。那么中位数就是 f(0, 0, \\left\\lfloor\\frac{m + n + 1}{2}\\right\\rfloor) 和 f(0, 0, \\left\\lfloor\\frac{m + n + 2}{2}\\right\\rfloor) 的平均数。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找两个正序数组的中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "59.4%",
    "difficulty": "困难",
    "frontendId": "295",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics",
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0295.Find%20Median%20from%20Data%20Stream/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Find Median from Data Stream",
    "titleCn": "数据流的中位数",
    "titleSlug": "find-median-from-data-stream",
    "url": "https://leetcode.cn/problems/find-median-from-data-stream/description/",
    "statementPreview": "中位数 是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。 例如 arr = [2,3,4] 的中位数是 3。 例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5。 实现 MedianFinder 类: MedianFinder() 初始化 MedianFinder 对象。 void addNum(int num) 将数据流中的整数 num 添加到数据结构中。 double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10^-5 以内的答案将被接受。",
    "approachPreview": "我们可以使用两个堆来维护所有的元素，一个小根堆 \\textit{minQ} 和一个大根堆 \\textit{maxQ}，其中小根堆 \\textit{minQ} 存储较大的一半，大根堆 \\textit{maxQ} 存储较小的一半。 调用 addNum 方法时，我们首先将元素加入到大根堆 \\textit{maxQ}，然后将 \\textit{maxQ} 的堆顶元素弹出并加入到小根堆 \\textit{minQ}。如果此时 \\textit{minQ} 的大小与 \\textit{maxQ} 的大小差值大于 1，我们就将 \\textit{minQ} 的堆顶元素弹出并加入到 \\textit{maxQ}。时间复杂度为 O(\\log n)。 调用 findMedian 方法时，如果 \\textit{minQ} 的大小等于 \\textit{maxQ} 的大小，说明元素的总数为偶数，我们就可以返回 \\textit{minQ} 的堆顶元素与 \\textit{maxQ} 的堆顶元素的平均值；否则，我们返回 \\textit{minQ} 的堆顶元素。时间复杂度为 O(1)。 空间复杂度为 O(n)。其中 n 为元素的个数。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数据流的中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "40.9%",
    "difficulty": "困难",
    "frontendId": "480",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0480.Sliding%20Window%20Median/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Sliding Window Median",
    "titleCn": "滑动窗口中位数",
    "titleSlug": "sliding-window-median",
    "url": "https://leetcode.cn/problems/sliding-window-median/description/",
    "statementPreview": "中位数是有序序列最中间的那个数。如果序列的长度是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。 例如： [2,3,4]，中位数是 3 [2,3]，中位数是 (2 + 3) / 2 = 2.5 给你一个数组 nums，有一个长度为 k 的窗口从最左端滑动到最右端。窗口中有 k 个数，每次窗口向右移动 1 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。",
    "approachPreview": "我们可以使用两个优先队列（大小根堆）维护当前窗口中的元素，其中一个优先队列存储当前窗口中较小的一半元素，另一个优先队列存储当前窗口中较大的一半元素。这样，当前窗口的中位数就是两个优先队列的堆顶元素的平均值或其中的一个。 我们设计一个类 \\textit{MedianFinder}，用于维护当前窗口中的元素。该类包含以下方法： add_num(num)：将 \\textit{num} 加入当前窗口中。 find_median()：返回当前窗口中元素的中位数。 remove_num(num)：将 \\textit{num} 从当前窗口中移除。 prune(pq)：如果堆顶元素在延迟删除字典 \\textit{delayed} 中，则将其从堆顶弹出，并从该元素的延迟删除次数中减一。如果该元素的延迟删除次数为零，则将其从延迟删除字典中删除。 rebalance()：如果较小的一半元素的数量比较大的一半元素的数量多 2 个，则将较大的一半元素的堆顶元素加入较小的一半元素中；如果较小的一半元素的数量比较大的一半元素的数量少，则将较大的一半元素的堆顶元素加入较小的一半元素中。 在 add_num(num) 方法中，我们先考虑将 \\textit{num} 加入较小的一半元素中，如果 \\textit{num} 大于较大的一半元素的堆顶元素，则将 \\textit{num} 加入较大的一半元素中。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 滑动窗口中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "57.7%",
    "difficulty": "困难",
    "frontendId": "569",
    "paidOnly": true,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0569.Median%20Employee%20Salary/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Median Employee Salary",
    "titleCn": "员工薪水中位数",
    "titleSlug": "median-employee-salary",
    "url": "https://leetcode.cn/problems/median-employee-salary/description/",
    "statementPreview": "表: Employee +--------------+---------+ Column Name Type +--------------+---------+ id int company varchar salary int +--------------+---------+ id 是该表的主键列(具有唯一值的列)。 该表的每一行表示公司和一名员工的工资。 编写解决方案，找出每个公司的工资中位数。 以 任意顺序 返回结果表。 查询结果格式如下所示。",
    "approachPreview": "员工薪水中位数 属于中位数统计系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 员工薪水中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "46.1%",
    "difficulty": "困难",
    "frontendId": "571",
    "paidOnly": true,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0571.Find%20Median%20Given%20Frequency%20of%20Numbers/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Find Median Given Frequency of Numbers",
    "titleCn": "给定数字的频率查询中位数",
    "titleSlug": "find-median-given-frequency-of-numbers",
    "url": "https://leetcode.cn/problems/find-median-given-frequency-of-numbers/description/",
    "statementPreview": "Numbers 表： +-------------+------+ Column Name Type +-------------+------+ num int frequency int +-------------+------+ num 是这张表的主键(具有唯一值的列)。 这张表的每一行表示某个数字在该数据库中的出现频率。 中位数 是将数据样本中半数较高值和半数较低值分隔开的值。 编写解决方案，解压 Numbers 表，报告数据库中所有数字的 中位数。结果四舍五入至 一位小数。 返回结果如下例所示。",
    "approachPreview": "给定数字的频率查询中位数 属于中位数统计系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 给定数字的频率查询中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "66.8%",
    "difficulty": "中等",
    "frontendId": "2387",
    "paidOnly": true,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2387.Median%20of%20a%20Row%20Wise%20Sorted%20Matrix/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Median of a Row Wise Sorted Matrix",
    "titleCn": "行排序矩阵的中位数",
    "titleSlug": "median-of-a-row-wise-sorted-matrix",
    "url": "https://leetcode.cn/problems/median-of-a-row-wise-sorted-matrix/description/",
    "statementPreview": "给定一个包含 奇数 个整数的 m x n 矩阵 grid，其中每一行按 非递减 的顺序排序，返回矩阵的 中位数。 你必须以 O(m * log(n)) 的时间复杂度来解决这个问题。",
    "approachPreview": "中位数实际上是排序后第 target = \\left \\lceil \\frac{m\\times n}{2} \\right \\rceil 个数。 我们二分枚举矩阵的元素 x，统计网格中大于该元素的个数 cnt，如果 cnt \\ge target，说明中位数在 x 的左侧（包含 x），否则在右侧。 时间复杂度 O(m\\times \\log n \\times log M)，其中 m 和 n 分别为网格的行数和列数，而 M 为网格中的最大元素。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 行排序矩阵的中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "51.4%",
    "difficulty": "困难",
    "frontendId": "2488",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2400-2499/2488.Count%20Subarrays%20With%20Median%20K/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Count Subarrays With Median K",
    "titleCn": "统计中位数为 K 的子数组",
    "titleSlug": "count-subarrays-with-median-k",
    "url": "https://leetcode.cn/problems/count-subarrays-with-median-k/description/",
    "statementPreview": "给你一个长度为 n 的数组 nums，该数组由从 1 到 n 的 不同 整数组成。另给你一个正整数 k。 统计并返回 nums 中的 中位数 等于 k 的非空子数组的数目。 注意： 数组的中位数是按 递增 顺序排列后位于 中间 的那个元素，如果数组长度为偶数，则中位数是位于中间靠 左 的那个元素。 例如， [2,3,1,4] 的中位数是 2， [8,4,3,5,1] 的中位数是 4。 子数组是数组中的一个连续部分。",
    "approachPreview": "我们先找到中位数 k 在数组中的位置 i，然后从 i 开始向两边遍历，统计中位数为 k 的子数组的数目。 定义一个答案变量 ans，表示中位数为 k 的子数组的数目。初始时 ans = 1，表示当前有一个长度为 1 的子数组，其中位数为 k。另外，定义一个计数器 cnt，用于统计当前遍历过的数组中，「比 k 大的元素的个数」与「比 k 小的元素的个数」的差值的个数。 接下来，从 i + 1 开始向右遍历，我们维护一个变量 x，表示当前右侧子数组中「比 k 大的元素的个数」与「比 k 小的元素的个数」的差值。如果 x \\in [0, 1]，则当前右侧子数组的中位数为 k，答案变量 ans 自增 1。然后，我们将 x 的值加入计数器 cnt 中。 同理，从 i - 1 开始向左遍历，同样维护一个变量 x，表示当前左侧子数组中「比 k 大的元素的个数」与「比 k 小的元素的个数」的差值。如果 x \\in [0, 1]，则当前左侧子数组的中位数为 k，答案变量 ans 自增 1。如果 -x 或 -x + 1 也在计数器中，说明当前存在跨越 i 左右两侧的子数组，其中位数为 k，答案变量 ans 增加计数器中对应的值，即 ans += cnt[-x] + cnt[-x + 1]。 最后，返回答案变量 ans 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计中位数为 K 的子数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "50.8%",
    "difficulty": "中等",
    "frontendId": "3107",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3107.Minimum%20Operations%20to%20Make%20Median%20of%20Array%20Equal%20to%20K/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Minimum Operations to Make Median of Array Equal to K",
    "titleCn": "使数组中位数等于 K 的最少操作数",
    "titleSlug": "minimum-operations-to-make-median-of-array-equal-to-k",
    "url": "https://leetcode.cn/problems/minimum-operations-to-make-median-of-array-equal-to-k/description/",
    "statementPreview": "给你一个整数数组 nums 和一个 非负 整数 k。一次操作中，你可以选择任一元素 加 1 或者减 1。 请你返回将 nums 中位数 变为 k 所需要的 最少 操作次数。 一个数组的中位数指的是数组按非递减顺序排序后最中间的元素。如果数组长度为偶数，我们选择中间两个数的较大值为中位数。",
    "approachPreview": "我们首先对数组 nums 进行排序，然后找到中位数的位置 m，那么初始时我们需要的操作次数就是 nums[m] - k。 接下来，我们分情况讨论： 如果 nums[m] \\gt k，那么 m 右侧的元素都大于等于 k，我们只需要将 m 左侧的元素中，大于 k 的元素减小到 k 即可。 如果 nums[m] \\le k，那么 m 左侧的元素都小于等于 k，我们只需要将 m 右侧的元素中，小于 k 的元素增大到 k 即可。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 使数组中位数等于 K 的最少操作数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "50.5%",
    "difficulty": "困难",
    "frontendId": "3134",
    "paidOnly": false,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3134.Find%20the%20Median%20of%20the%20Uniqueness%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Find the Median of the Uniqueness Array",
    "titleCn": "找出唯一性数组的中位数",
    "titleSlug": "find-the-median-of-the-uniqueness-array",
    "url": "https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/description/",
    "statementPreview": "给你一个整数数组 nums。数组 nums 的 唯一性数组 是一个按元素从小到大排序的数组，包含了 nums 的所有非空 子数组 中不同元素的个数。 换句话说，这是由所有 0 <= i <= j < nums.length 的 distinct(nums[i..j]) 组成的递增数组。 其中， distinct(nums[i..j]) 表示从下标 i 到下标 j 的子数组中不同元素的数量。 返回 nums 唯一性数组 的 中位数。 注意，数组的 中位数 定义为有序数组的中间元素。如果有两个中间元素，则取值较小的那个。",
    "approachPreview": "我们记数组 \\textit{nums} 的长度为 n，那么唯一性数组的长度为 m = \\frac{(1 + n) \\times n}{2}，而唯一性数组的中位数就是这 m 个数中的第 \\frac{m + 1}{2} 小的数字。 考虑唯一性数组中，有多少个数小于等于 x。随着 x 的增大，只会有越来越多的数小于等于 x。这存在着单调性，因此，我们可以二分枚举 x，找到第一个 x，满足唯一性数组中小于等于 x 的数的个数大于等于 \\frac{m + 1}{2}，这个 x 就是唯一性数组的中位数。 我们定义二分查找的左边界 l = 0，右边界 r = n，然后进行二分查找，对于每个 \\textit{mid}，我们检查唯一性数组中小于等于 \\textit{mid} 的数的个数是否大于等于 \\frac{m + 1}{2}。我们通过函数 \\text{check}(mx) 来实现这一点。 函数 \\text{check}(mx) 的实现思路如下： 由于子数组越长，不同元素的个数越多，因此，我们可以利用双指针维护一个滑动窗口，使得窗口中的子数组的不同元素的个数不超过 mx。具体地，我们维护一个哈希表 \\textit{cnt}，\\textit{cnt}[x] 表示窗口中元素 x 的个数。我们使用两个指针 l 和 r，其中 l 表示窗口的左边界，而 r 表示窗口的右边界。初始时 l = r = 0。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出唯一性数组的中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "38.3%",
    "difficulty": "困难",
    "frontendId": "3369",
    "paidOnly": true,
    "seriesKeys": [
      "median-statistics",
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3369.Design%20an%20Array%20Statistics%20Tracker/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Design an Array Statistics Tracker",
    "titleCn": "设计数组统计跟踪器",
    "titleSlug": "design-an-array-statistics-tracker",
    "url": "https://leetcode.cn/problems/design-an-array-statistics-tracker/description/",
    "statementPreview": "设计一个数据结构来跟踪它其中的值，并回答一些有关其平均值、中位数和众数的询问。 实现 StatisticsTracker 类。 StatisticsTracker()：用空数组初始化 StatisticsTracker 对象。 void addNumber(int number)：将 number 添加到数据结构中。 void removeFirstAddedNumber()：从数据结构删除最早添加的数字。 int getMean()：返回数据结构中数字向下取整的 平均值。 int getMedian()：返回数据结构中数字的 中位数。 int getMode()：返回数据结构中数字的 众数。如果有多个众数，返回最小的那个。 注意： 数组的 平均值 是所有值的和除以数组中值的数量。 数组的 中位数 是在非递减顺序排序后数组的中间元素。如果中位数有两个选择，则取两个值中较大的一个。 数组的 众数 是数组中出现次数最多的元素。",
    "approachPreview": "我们定义一个队列 \\textit{q}，用来存储添加的数字，一个变量 \\textit{s}，用来存储所有数字的和，一个哈希表 \\textit{cnt}，用来存储每个数字的出现次数，一个有序集合 \\textit{sl}，用来存储所有数字，一个有序集合 \\textit{sl2}，用来存储所有数字及其出现次数，按照出现次数降序、数值升序的顺序。 在 addNumber 方法中，我们将数字添加到队列 \\textit{q} 中，将数字添加到有序集合 \\textit{sl} 中，然后先将数字及其出现次数从有序集合 \\textit{sl2} 中删除，再更新数字的出现次数，最后将数字及其出现次数添加到有序集合 \\textit{sl2} 中，并更新所有数字的和。时间复杂度为 O(\\log n)。 在 removeFirstAddedNumber 方法中，我们从队列 \\textit{q} 中删除最早添加的数字，从有序集合 \\textit{sl} 中删除数字，然后先将数字及其出现次数从有序集合 \\textit{sl2} 中删除，再更新数字的出现次数，最后将数字及其出现次数添加到有序集合 \\textit{sl2} 中，并更新所有数字的和。时间复杂度为 O(\\log n)。 在 getMean 方法中，我们返回所有数字的和除以数字的数量，时间复杂度为 O(1)。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计数组统计跟踪器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "91.6%",
    "difficulty": "中等",
    "frontendId": "3831",
    "paidOnly": true,
    "seriesKeys": [
      "median-statistics"
    ],
    "seriesPrimaryKey": "median-statistics",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3800-3899/3831.Median%20of%20a%20Binary%20Search%20Tree%20Level/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Median of a Binary Search Tree Level",
    "titleCn": "二叉搜索树某一层的中位数",
    "titleSlug": "median-of-a-binary-search-tree-level",
    "url": "https://leetcode.cn/problems/median-of-a-binary-search-tree-level/description/",
    "statementPreview": "给定一棵 二叉搜索树（BST） 的根结点 root 和一个整数 level。 根节点位于第 0 层。每一层代表与根节点的距离。 返回给定 level 中所有节点值的中位数。如果该层不存在或没有节点，则返回 -1。 中位数 定义为将该层的值按 非降序 排序后中间的元素。如果该层的值的数量为偶数，则返回 向上 中位数（排序后两个中间元素中较大的那个）。",
    "approachPreview": "我们注意到，题目要求我们找到二叉搜索树中某一层的节点值的中位数。由于中位数的定义是将节点值排序后取中间的值，而二叉搜索树的中序遍历本身就是有序的，因此我们可以通过中序遍历来收集指定层级的节点值。 我们定义一个辅助函数 \\text{dfs}(root, i)，其中 root 是当前节点，而 i 是当前节点的层级。在函数中，如果当前节点为空，则直接返回。否则，我们递归地遍历左子树，检查当前节点的层级是否等于目标层级，如果是，则将当前节点的值加入结果列表中，最后递归地遍历右子树。 我们初始化一个空列表 \\text{nums} 来存储指定层级的节点值，并调用 \\text{dfs}(root, 0) 来开始遍历。最后，我们检查 \\text{nums} 是否为空，如果为空则返回 -1，否则返回 \\text{nums} 中间位置的值。 时间复杂度 O(n)，空间复杂度 O(n)，其中 n 是树中节点的数量。",
    "followUps": [
      {
        "question": "这题和中位数统计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉搜索树某一层的中位数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "73.5%",
    "difficulty": "简单",
    "frontendId": "346",
    "paidOnly": true,
    "seriesKeys": [
      "stream-statistics-design",
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0346.Moving%20Average%20from%20Data%20Stream/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Moving Average from Data Stream",
    "titleCn": "数据流中的移动平均值",
    "titleSlug": "moving-average-from-data-stream",
    "url": "https://leetcode.cn/problems/moving-average-from-data-stream/description/",
    "statementPreview": "给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算其所有整数的移动平均值。 实现 MovingAverage 类： MovingAverage(int size) 用窗口大小 size 初始化对象。 double next(int val) 计算并返回数据流中最后 size 个值的移动平均值。",
    "approachPreview": "我们定义一个变量 \\textit{s}，用于计算当前最后 \\textit{size} 个元素的和，用一个变量 \\textit{cnt} 记录当前元素的总数。另外，我们用一个长度为 \\textit{size} 的数组 \\textit{data} 记录每个位置的元素对应的值。 调用 \\textit{next} 函数时，我们先计算出 \\textit{val} 要存放的下标 i，然后我们更新元素和 s，并且将下标 i 处的值设置为 \\textit{val}，同时将元素的个数加一。最后，我们返回 \\frac{s}{\\min(\\textit{cnt}, \\textit{size})} 的值即可。 时间复杂度 O(1)，空间复杂度 O(n)，其中 n 是题目给定的整数 \\textit{size}。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数据流中的移动平均值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "66.5%",
    "difficulty": "困难",
    "frontendId": "352",
    "paidOnly": false,
    "seriesKeys": [
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0352.Data%20Stream%20as%20Disjoint%20Intervals/README.md",
    "tags": [
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      }
    ],
    "title": "Data Stream as Disjoint Intervals",
    "titleCn": "将数据流变为多个不相交区间",
    "titleSlug": "data-stream-as-disjoint-intervals",
    "url": "https://leetcode.cn/problems/data-stream-as-disjoint-intervals/description/",
    "statementPreview": "给你一个由非负整数组成的数据流输入 a_1, a_2, ..., a_n，请你将目前为止看到的数字汇总为一组不相交的区间列表。 实现 SummaryRanges 类： SummaryRanges() 初始化一个空的数据流对象。 void addNum(int value) 将整数 value 添加到数据流中。 int[][] getIntervals() 返回当前数据流中的整数汇总为一组不相交的区间列表 [start_i, end_i]。答案应按 start_i 升序排序。",
    "approachPreview": "将数据流变为多个不相交区间 属于数据流统计设计系列中的一个变体。主要标签是 并查集、设计、哈希表、二分查找、数据流、有序集合。先把每个 API 需要维护的状态列出来，再选择哈希表、堆、链表或树等结构保证更新和查询复杂度；实现时要让初始化、重复调用和空结构行为都可预测。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 将数据流变为多个不相交区间 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "66.7%",
    "difficulty": "中等",
    "frontendId": "362",
    "paidOnly": true,
    "seriesKeys": [
      "stream-statistics-design",
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0362.Design%20Hit%20Counter/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Design Hit Counter",
    "titleCn": "敲击计数器",
    "titleSlug": "design-hit-counter",
    "url": "https://leetcode.cn/problems/design-hit-counter/description/",
    "statementPreview": "设计一个敲击计数器，使它可以统计在过去 5 分钟内被敲击次数。（即过去 300 秒） 您的系统应该接受一个时间戳参数 timestamp (单位为 秒 )，并且您可以假定对系统的调用是按时间顺序进行的(即 timestamp 是单调递增的)。几次撞击可能同时发生。 实现 HitCounter 类: HitCounter() 初始化命中计数器系统。 void hit(int timestamp) 记录在 timestamp ( 单位为秒 )发生的一次命中。在同一个 timestamp 中可能会出现几个点击。 int getHits(int timestamp) 返回 timestamp 在过去 5 分钟内(即过去 300 秒)的命中次数。",
    "approachPreview": "由于 timestamp 是单调递增的，我们可以使用一个数组 ts 来存储所有的 timestamp，然后在 getHits 方法中使用二分查找找到第一个大于等于 timestamp - 300 + 1 的位置，然后返回 ts 的长度减去这个位置即可。 时间复杂度方面， hit 方法的时间复杂度为 O(1)， getHits 方法的时间复杂度为 O(\\log n)。其中 n 为 ts 的长度。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 敲击计数器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "78.0%",
    "difficulty": "简单",
    "frontendId": "933",
    "paidOnly": false,
    "seriesKeys": [
      "stream-statistics-design",
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0933.Number%20of%20Recent%20Calls/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Number of Recent Calls",
    "titleCn": "最近的请求次数",
    "titleSlug": "number-of-recent-calls",
    "url": "https://leetcode.cn/problems/number-of-recent-calls/description/",
    "statementPreview": "写一个 RecentCounter 类来计算特定时间范围内最近的请求。 请你实现 RecentCounter 类： RecentCounter() 初始化计数器，请求数为 0。 int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。 保证 每次对 ping 的调用都使用比之前更大的 t 值。",
    "approachPreview": "由题得知， t 是**严格递增**的，当一个元素不满足 [t - 3000, t] 条件时，在后续的请求当中，它也不可能满足。 对此，需要将其从记录容器中移除，减少无意义的比较。 可以使用队列。每次将 t 进入队尾，同时从队头开始，依次移除小于 t - 3000 的元素。然后返回队列的大小（ q.size() ）即可。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最近的请求次数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "52.4%",
    "difficulty": "中等",
    "frontendId": "1352",
    "paidOnly": false,
    "seriesKeys": [
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1352.Product%20of%20the%20Last%20K%20Numbers/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Product of the Last K Numbers",
    "titleCn": "最后 K 个数的乘积",
    "titleSlug": "product-of-the-last-k-numbers",
    "url": "https://leetcode.cn/problems/product-of-the-last-k-numbers/description/",
    "statementPreview": "设计一个算法，该算法接受一个整数流并检索该流中最后 k 个整数的乘积。 实现 ProductOfNumbers 类： ProductOfNumbers() 用一个空的流初始化对象。 void add(int num) 将数字 num 添加到当前数字列表的最后面。 int getProduct(int k) 返回当前数字列表中，最后 k 个数字的乘积。你可以假设当前列表中始终 至少 包含 k 个数字。 题目数据保证：任何时候，任一连续数字序列的乘积都在 32 位整数范围内，不会溢出。",
    "approachPreview": "我们初始化一个数组 s，其中 s[i] 表示前 i 个数字的乘积。 当调用 add(num) 时，我们判断 num 是否为 0，若是，则将 s 置为 [1]，否则将 s 的最后一个元素乘以 num，并将结果添加到 s 的末尾。 当调用 getProduct(k) 时，此时判断 s 的长度是否小于等于 k，若是，则返回 0，否则返回 s 的最后一个元素除以 s 的倒数第 k + 1 个元素。即 s[-1] / s[-k - 1]。 时间复杂度 O(1)，空间复杂度 O(n)。其中 n 为调用 add 的次数。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最后 K 个数的乘积 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "56.7%",
    "difficulty": "中等",
    "frontendId": "2013",
    "paidOnly": false,
    "seriesKeys": [
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2013.Detect%20Squares/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Detect Squares",
    "titleCn": "检测正方形",
    "titleSlug": "detect-squares",
    "url": "https://leetcode.cn/problems/detect-squares/description/",
    "statementPreview": "给你一个在 X-Y 平面上的点构成的数据流。设计一个满足下述要求的算法： 添加 一个在数据流中的新点到某个数据结构中。 可以添加 重复 的点，并会视作不同的点进行处理。 给你一个查询点，请你从数据结构中选出三个点，使这三个点和查询点一同构成一个 面积为正 的 轴对齐正方形， 统计 满足该要求的方案数目。 轴对齐正方形 是一个正方形，除四条边长度相同外，还满足每条边都与 x-轴 或 y-轴 平行或垂直。 实现 DetectSquares 类： DetectSquares() 使用空数据结构初始化对象 void add(int[] point) 向数据结构添加一个新的点 point = [x, y] int count(int[] point) 统计按上述方式与点 point = [x, y] 共同构造 轴对齐正方形 的方案数。",
    "approachPreview": "我们可以用一个哈希表 cnt 维护所有点的信息，其中 cnt[x][y] 表示点 (x, y) 的个数。 当调用 add(x, y) 方法时，我们将 cnt[x][y] 的值加 1。 当调用 count(x_1, y_1) 方法时，我们需要获取另外的三个点，构成一个轴对齐正方形。我们可以枚举平行于 x 轴且与 (x_1, y_1) 的距离为 d 的点 (x_2, y_1)，如果存在这样的点，根据这两个点，我们可以确定另外两个点为 (x_1, y_1 + d) 和 (x_2, y_1 + d)，或者 (x_1, y_1 - d) 和 (x_2, y_1 - d)。我们将这两种情况的方案数累加即可。 时间复杂度方面，调用 add(x, y) 方法的时间复杂度为 O(1)，调用 count(x_1, y_1) 方法的时间复杂度为 O(n)；空间复杂度为 O(n)。其中 n 为数据流中的点的个数。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 检测正方形 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "55.8%",
    "difficulty": "中等",
    "frontendId": "2526",
    "paidOnly": false,
    "seriesKeys": [
      "stream-statistics-design"
    ],
    "seriesPrimaryKey": "stream-statistics-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2500-2599/2526.Find%20Consecutive%20Integers%20from%20a%20Data%20Stream/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Find Consecutive Integers from a Data Stream",
    "titleCn": "找到数据流中的连续整数",
    "titleSlug": "find-consecutive-integers-from-a-data-stream",
    "url": "https://leetcode.cn/problems/find-consecutive-integers-from-a-data-stream/description/",
    "statementPreview": "给你一个整数数据流，请你实现一个数据结构，检查数据流中最后 k 个整数是否 等于 给定值 value。 请你实现 DataStream 类： DataStream(int value, int k) 用两个整数 value 和 k 初始化一个空的整数数据流。 boolean consec(int num) 将 num 添加到整数数据流。如果后 k 个整数都等于 value，返回 true，否则返回 false。如果少于 k 个整数，条件不满足，所以也返回 false。",
    "approachPreview": "我们可以维护一个计数器 \\textit{cnt}，记录当前连续整数为 \\textit{value} 的个数。 调用 consec 方法时，如果 \\textit{num} 与 \\textit{value} 相等，我们将 \\textit{cnt} 自增 1，否则将 \\textit{cnt} 重置为 0。然后判断 \\textit{cnt} 是否大于等于 \\textit{k} 即可。 时间复杂度 O(1)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和数据流统计设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找到数据流中的连续整数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 TopK 或数据流场景怎么从 LeetCode 解法扩展？",
        "answer": "单机内存够时用哈希计数加大小为 K 的堆或快选；数据流要用增量堆、双堆、有序结构或分桶。海量数据再按 key 分片、局部 TopK 后归并，近似高频可讨论 Misra-Gries、Count-Min Sketch 或 Space-Saving。"
      }
    ]
  },
  {
    "acRate": "72.2%",
    "difficulty": "简单",
    "frontendId": "359",
    "paidOnly": true,
    "seriesKeys": [
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "stream-rate-counter-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0359.Logger%20Rate%20Limiter/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "data-stream",
        "name": "数据流"
      }
    ],
    "title": "Logger Rate Limiter",
    "titleCn": "日志速率限制器",
    "titleSlug": "logger-rate-limiter",
    "url": "https://leetcode.cn/problems/logger-rate-limiter/description/",
    "statementPreview": "请你设计一个日志系统，可以流式接收消息以及它的时间戳。每条 不重复 的消息最多只能每 10 秒打印一次。也就是说，如果在时间戳 t 打印某条消息，那么相同内容的消息直到时间戳变为 t + 10 之前都不会被打印。 所有消息都按时间顺序发送。多条消息可能到达同一时间戳。 实现 Logger 类： Logger() 初始化 logger 对象 bool shouldPrintMessage(int timestamp, string message) 如果这条消息 message 在给定的时间戳 timestamp 应该被打印出来，则返回 true，否则请返回 false。",
    "approachPreview": "我们用一个哈希表 \\textit{ts} 来存储每个消息的下一个可打印时间戳。在调用 shouldPrintMessage 方法时，我们检查当前时间戳是否大于等于消息的下一个可打印时间戳，若是则更新该消息的下一个可打印时间戳为当前时间戳加 10，并返回 true，否则返回 false。 时间复杂度 O(1)。空间复杂度 O(m)，其中 m 是不同消息的数量。",
    "followUps": [
      {
        "question": "这题和数据流计数与限流设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 日志速率限制器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "限流和计数器题如何从算法题扩展到工程题？",
        "answer": "先说明单机窗口队列或时间桶如何精确计数，再讨论 token bucket、leaky bucket、分布式时钟偏差、Redis 原子更新和过期清理；工程题重点是边界一致性和可观测性。"
      }
    ]
  },
  {
    "acRate": "64.6%",
    "difficulty": "中等",
    "frontendId": "1797",
    "paidOnly": false,
    "seriesKeys": [
      "stream-rate-counter-design"
    ],
    "seriesPrimaryKey": "stream-rate-counter-design",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1797.Design%20Authentication%20Manager/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "Design Authentication Manager",
    "titleCn": "设计一个验证系统",
    "titleSlug": "design-authentication-manager",
    "url": "https://leetcode.cn/problems/design-authentication-manager/description/",
    "statementPreview": "你需要设计一个包含验证码的验证系统。每一次验证中，用户会收到一个新的验证码，这个验证码在 currentTime 时刻之后 timeToLive 秒过期。如果验证码被更新了，那么它会在 currentTime （可能与之前的 currentTime 不同）时刻延长 timeToLive 秒。 请你实现 AuthenticationManager 类： AuthenticationManager(int timeToLive) 构造 AuthenticationManager 并设置 timeToLive 参数。 generate(string tokenId, int currentTime) 给定 tokenId，在当前时间 currentTime 生成一个新的验证码。 renew(string tokenId, int currentTime) 将给定 tokenId 且 未过期 的验证码在 currentTime 时刻更新。如果给定 tokenId 对应的验证码不存在或已过期，请你忽略该操作，不会有任何更新操作发生。 countUnexpiredTokens(int currentTime) 请返回在给定 currentTime 时刻， 未过期 的验证码数目。",
    "approachPreview": "我们可以简单维护一个哈希表 d，键为 tokenId，值为过期时间。 generate 操作时，将 tokenId 作为键， currentTime + timeToLive 作为值存入哈希表 d 中。 renew 操作时，如果 tokenId 不在哈希表 d 中，或者 currentTime >= d[tokenId]，则忽略该操作；否则，更新 d[tokenId] 为 currentTime + timeToLive。 countUnexpiredTokens 操作时，遍历哈希表 d，统计未过期的 tokenId 个数。 时间复杂度方面， generate 和 renew 操作的时间复杂度均为 O(1)， countUnexpiredTokens 操作的时间复杂度为 O(n)，其中 n 为哈希表 d 的键值对个数。 空间复杂度为 O(n)，其中 n 为哈希表 d 的键值对个数。",
    "followUps": [
      {
        "question": "这题和数据流计数与限流设计里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计一个验证系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "限流和计数器题如何从算法题扩展到工程题？",
        "answer": "先说明单机窗口队列或时间桶如何精确计数，再讨论 token bucket、leaky bucket、分布式时钟偏差、Redis 原子更新和过期清理；工程题重点是边界一致性和可观测性。"
      }
    ]
  },
  {
    "acRate": "69.5%",
    "difficulty": "中等",
    "frontendId": "49",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0049.Group%20Anagrams/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Group Anagrams",
    "titleCn": "字母异位词分组",
    "titleSlug": "group-anagrams",
    "url": "https://leetcode.cn/problems/group-anagrams/description/",
    "statementPreview": "给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。",
    "approachPreview": "1. 遍历字符串，对每个字符串按照**字符字典序**排序，得到一个新的字符串。 2. 以新字符串为 key， [str] 为 value，存入哈希表当中（ HashMap<String, List > ）。 3. 后续遍历得到相同 key 时，将其加入到对应的 value 当中即可。 以 strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"] 为例，遍历结束时，哈希表的状况： key value ------- ----------------------- \"aet\" [\"eat\", \"tea\", \"ate\"] \"ant\" [\"tan\", \"nat\"] \"abt\" [\"bat\"] 最后返回哈希表的 value 列表即可。 时间复杂度 O(n\\times k\\times \\log k)。其中 n 和 k 分别是字符串数组的长度和字符串的最大长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 字母异位词分组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "78.1%",
    "difficulty": "简单",
    "frontendId": "182",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0182.Duplicate%20Emails/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Duplicate Emails",
    "titleCn": "查找重复的电子邮箱",
    "titleSlug": "duplicate-emails",
    "url": "https://leetcode.cn/problems/duplicate-emails/description/",
    "statementPreview": "表: Person +-------------+---------+ Column Name Type +-------------+---------+ id int email varchar +-------------+---------+ id 是该表的主键（具有唯一值的列）。 此表的每一行都包含一封电子邮件。电子邮件不包含大写字母。 编写解决方案来报告所有重复的电子邮件。 请注意，可以保证电子邮件字段不为 NULL。 以 任意顺序 返回结果表。 结果格式如下例。",
    "approachPreview": "查找重复的电子邮箱 属于海量集合去重与求交系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 查找重复的电子邮箱 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "55.6%",
    "difficulty": "中等",
    "frontendId": "187",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0187.Repeated%20DNA%20Sequences/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "hash-function",
        "name": "哈希函数"
      },
      {
        "slug": "rolling-hash",
        "name": "滚动哈希"
      }
    ],
    "title": "Repeated DNA Sequences",
    "titleCn": "重复的DNA序列",
    "titleSlug": "repeated-dna-sequences",
    "url": "https://leetcode.cn/problems/repeated-dna-sequences/description/",
    "statementPreview": "DNA序列 由一系列核苷酸组成，缩写为 'A' , 'C' , 'G' 和 'T' .。 例如， \"ACGAATTCCG\" 是一个 DNA序列。 在研究 DNA 时，识别 DNA 中的重复序列非常有用。 给定一个表示 DNA序列 的字符串 s，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。你可以按 任意顺序 返回答案。",
    "approachPreview": "我们定义一个哈希表 cnt，用于存储所有长度为 10 的子字符串出现的次数。 遍历字符串 s 的所有长度为 10 的子字符串，对于当前子字符串 t，我们更新其在哈希表中对应的计数。如果 t 的计数为 2，我们就将它加入答案。 遍历结束后，返回答案数组即可。 时间复杂度 O(n \\times 10)，空间复杂度 O(n \\times 10)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 重复的DNA序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "67.2%",
    "difficulty": "简单",
    "frontendId": "196",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0196.Delete%20Duplicate%20Emails/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Delete Duplicate Emails",
    "titleCn": "删除重复的电子邮箱",
    "titleSlug": "delete-duplicate-emails",
    "url": "https://leetcode.cn/problems/delete-duplicate-emails/description/",
    "statementPreview": "表: Person +-------------+---------+ Column Name Type +-------------+---------+ id int email varchar +-------------+---------+ id 是该表的主键列(具有唯一值的列)。 该表的每一行包含一封电子邮件。电子邮件将不包含大写字母。 编写解决方案 删除 所有重复的电子邮件，只保留一个具有最小 id 的唯一电子邮件。 （对于 SQL 用户，请注意你应该编写一个 DELETE 语句而不是 SELECT 语句。） （对于 Pandas 用户，请注意你应该直接修改 Person 表。） 运行脚本后，显示的答案是 Person 表。驱动程序将首先编译并运行您的代码片段，然后再显示 Person 表。 Person 表的最终顺序 无关紧要。 返回结果格式如下示例所示。",
    "approachPreview": "删除重复的电子邮箱 属于海量集合去重与求交系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除重复的电子邮箱 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "56.0%",
    "difficulty": "简单",
    "frontendId": "217",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection",
      "contains-duplicate"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0217.Contains%20Duplicate/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Contains Duplicate",
    "titleCn": "存在重复元素",
    "titleSlug": "contains-duplicate",
    "url": "https://leetcode.cn/problems/contains-duplicate/description/",
    "statementPreview": "给你一个整数数组 nums。如果任一值在数组中出现 至少两次，返回 true；如果数组中每个元素互不相同，返回 false。",
    "approachPreview": "我们先对数组 nums 进行排序。 然后遍历数组，如果存在相邻两个元素相同，说明数组中存在重复元素，直接返回 true。 否则，遍历结束，返回 false。 时间复杂度 O(n \\times \\log n)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 存在重复元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "51.0%",
    "difficulty": "简单",
    "frontendId": "219",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection",
      "contains-duplicate"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0219.Contains%20Duplicate%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Contains Duplicate II",
    "titleCn": "存在重复元素 II",
    "titleSlug": "contains-duplicate-ii",
    "url": "https://leetcode.cn/problems/contains-duplicate-ii/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k，判断数组中是否存在两个 不同的索引 i 和 j，满足 nums[i] == nums[j] 且 abs(i - j) <= k。如果存在，返回 true；否则，返回 false。",
    "approachPreview": "我们用一个哈希表 \\textit{d} 存放最近遍历到的数以及对应的下标。 遍历数组 \\textit{nums}，对于当前遍历到的元素 \\textit{nums}[i]，如果在哈希表中存在，并且下标与当前元素的下标之差不超过 k，则返回 \\text{true}，否则将当前元素加入哈希表中。 遍历结束后，返回 \\text{false}。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 存在重复元素 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "31.8%",
    "difficulty": "困难",
    "frontendId": "220",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection",
      "contains-duplicate"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0220.Contains%20Duplicate%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "bucket-sort",
        "name": "桶排序"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Contains Duplicate III",
    "titleCn": "存在重复元素 III",
    "titleSlug": "contains-duplicate-iii",
    "url": "https://leetcode.cn/problems/contains-duplicate-iii/description/",
    "statementPreview": "给你一个整数数组 nums 和两个整数 indexDiff 和 valueDiff。 找出满足下述条件的下标对 (i, j)： i != j , abs(i - j) <= indexDiff abs(nums[i] - nums[j]) <= valueDiff 如果存在，返回 true； 否则，返回 false。",
    "approachPreview": "我们维护一个大小为 k 的滑动窗口，窗口中的元素保持有序。 遍历数组 nums，对于每个元素 nums[i]，我们在有序集合中查找第一个大于等于 nums[i] - t 的元素，如果元素存在，并且该元素小于等于 nums[i] + t，说明找到了一对符合条件的元素，返回 true。否则，我们将 nums[i] 插入到有序集合中，并且如果有序集合的大小超过了 k，我们需要将最早加入有序集合的元素删除。 时间复杂度 O(n \\times \\log k)，其中 n 是数组 nums 的长度。对于每个元素，我们需要 O(\\log k) 的时间来查找有序集合中的元素，一共有 n 个元素，因此总时间复杂度是 O(n \\times \\log k)。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 存在重复元素 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "67.3%",
    "difficulty": "简单",
    "frontendId": "242",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0242.Valid%20Anagram/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Valid Anagram",
    "titleCn": "有效的字母异位词",
    "titleSlug": "valid-anagram",
    "url": "https://leetcode.cn/problems/valid-anagram/description/",
    "statementPreview": "给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的 字母异位词。",
    "approachPreview": "我们先判断两个字符串的长度是否相等，如果不相等，说明两个字符串中的字符肯定不同，返回 false。 否则，我们用哈希表或者一个长度为 26 的数组来记录字符串 s 中每个字符出现的次数，然后遍历另一个字符串 t，每遍历到一个字符，就将哈希表中对应的字符次数减一，如果减一后的次数小于 0，说明该字符在两个字符串中出现的次数不同，返回 false。如果遍历完两个字符串后，哈希表中的所有字符次数都为 0，说明两个字符串中的字符出现次数相同，返回 true。 时间复杂度 O(n)，空间复杂度 O(C)，其中 n 是字符串的长度；而 C 是字符集的大小，本题中 C=26。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 有效的字母异位词 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "67.7%",
    "difficulty": "中等",
    "frontendId": "287",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0287.Find%20the%20Duplicate%20Number/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Find the Duplicate Number",
    "titleCn": "寻找重复数",
    "titleSlug": "find-the-duplicate-number",
    "url": "https://leetcode.cn/problems/find-the-duplicate-number/description/",
    "statementPreview": "给定一个包含 n + 1 个整数的数组 nums，其数字都在 [1, n] 范围内（包括 1 和 n ），可知至少存在一个重复的整数。 假设 nums 只有 一个重复的整数，返回 这个重复的数。 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。",
    "approachPreview": "我们可以发现，如果 [1,..x] 中的数字个数大于 x，那么重复的数字一定在 [1,..x] 中，否则重复的数字一定在 [x+1,..n] 中。 因此，我们可以二分枚举 x，每次判断 [1,..x] 中的数字个数是否大于 x，从而确定重复的数字在哪个区间中，进而缩小区间范围，直到找到重复的数字。 时间复杂度 O(n \\times \\log n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找重复数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "75.1%",
    "difficulty": "简单",
    "frontendId": "349",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection",
      "intersection-of-two-arrays"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0349.Intersection%20of%20Two%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Intersection of Two Arrays",
    "titleCn": "两个数组的交集",
    "titleSlug": "intersection-of-two-arrays",
    "url": "https://leetcode.cn/problems/intersection-of-two-arrays/description/",
    "statementPreview": "给定两个数组 nums1 和 nums2，返回 它们的 交集。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序。",
    "approachPreview": "我们先用哈希表或者一个长度为 1001 的数组 s 记录数组 nums1 中出现的元素，然后遍历数组 nums2 中每个元素，如果元素 x 在 s 中，那么将 x 加入答案，并且从 s 中移除 x。 遍历结束后，返回答案数组即可。 时间复杂度 O(n+m)，空间复杂度 O(n)。其中 n 和 m 分别是数组 nums1 和 nums2 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个数组的交集 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "59.0%",
    "difficulty": "简单",
    "frontendId": "350",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection",
      "intersection-of-two-arrays"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0350.Intersection%20of%20Two%20Arrays%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Intersection of Two Arrays II",
    "titleCn": "两个数组的交集 II",
    "titleSlug": "intersection-of-two-arrays-ii",
    "url": "https://leetcode.cn/problems/intersection-of-two-arrays-ii/description/",
    "statementPreview": "给你两个整数数组 nums1 和 nums2，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。",
    "approachPreview": "我们可以用一个哈希表 \\textit{cnt} 统计数组 \\textit{nums1} 中每个元素出现的次数，然后遍历数组 \\textit{nums2}，如果元素 x 在 \\textit{cnt} 中，并且 x 的出现次数大于 0，那么将 x 加入答案，然后将 x 的出现次数减一。 遍历结束后，返回答案数组即可。 时间复杂度 O(m + n)，空间复杂度 O(m)。其中 m 和 n 分别是数组 \\textit{nums1} 和 \\textit{nums2} 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个数组的交集 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "54.6%",
    "difficulty": "中等",
    "frontendId": "438",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0438.Find%20All%20Anagrams%20in%20a%20String/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Find All Anagrams in a String",
    "titleCn": "找到字符串中所有字母异位词",
    "titleSlug": "find-all-anagrams-in-a-string",
    "url": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/",
    "statementPreview": "给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。",
    "approachPreview": "我们不妨设字符串 s 的长度为 m，字符串 p 的长度为 n。 如果 m \\lt n，那么 s 中不可能存在任何一个子串同 p 为异位词，返回空列表即可。 当 m \\ge n 时，我们可以使用一个固定长度为 n 的滑动窗口来维护 s 的子串。为了判断子串是否为 p 的异位词，我们可以用一个固定长度为 26 的数组 cnt1 记录 p 中每个字母的出现次数，再用另一个数组 cnt2 记录当前滑动窗口中每个字母的出现次数，如果这两个数组相同，那么当前滑动窗口的子串就是 p 的异位词，我们记录下起始位置。 时间复杂度 O(m \\times C)，空间复杂度 O(C)。其中 m 是字符串 s 的长度；而 C 是字符集大小，在本题中字符集为所有小写字母，所以 C = 26。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找到字符串中所有字母异位词 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "75.6%",
    "difficulty": "中等",
    "frontendId": "442",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0442.Find%20All%20Duplicates%20in%20an%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Find All Duplicates in an Array",
    "titleCn": "数组中重复的数据",
    "titleSlug": "find-all-duplicates-in-an-array",
    "url": "https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 最多 两次。请你找出所有出现 两次 的整数，并以数组形式返回。 你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间（不包括存储输出所需的空间）的算法解决此问题。",
    "approachPreview": "数组中重复的数据 属于海量集合去重与求交系列中的一个变体。主要标签是 数组、哈希表、排序。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 数组中重复的数据 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "简单",
    "frontendId": "448",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0448.Find%20All%20Numbers%20Disappeared%20in%20an%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Find All Numbers Disappeared in an Array",
    "titleCn": "找到所有数组中消失的数字",
    "titleSlug": "find-all-numbers-disappeared-in-an-array",
    "url": "https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/description/",
    "statementPreview": "给你一个含 n 个整数的数组 nums，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。",
    "approachPreview": "我们可以使用数组或哈希表记录数组中的数字，然后遍历 [1, n] 区间内的数字，若数字不存在于数组或哈希表中，则说明数组中缺失该数字，将其添加到结果列表中。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找到所有数组中消失的数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "58.4%",
    "difficulty": "简单",
    "frontendId": "599",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0599.Minimum%20Index%20Sum%20of%20Two%20Lists/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Minimum Index Sum of Two Lists",
    "titleCn": "两个列表的最小索引总和",
    "titleSlug": "minimum-index-sum-of-two-lists",
    "url": "https://leetcode.cn/problems/minimum-index-sum-of-two-lists/description/",
    "statementPreview": "给定两个字符串数组 list1 和 list2，找到 索引和最小的公共字符串。 公共字符串 是同时出现在 list1 和 list2 中的字符串。 具有 最小索引和的公共字符串 是指，如果它在 list1[i] 和 list2[j] 中出现，那么 i + j 应该是所有其他 公共字符串 中的最小值。 返回所有 具有最小索引和的公共字符串。以 任何顺序 返回答案。",
    "approachPreview": "我们用一个哈希表 \\textit{d} 记录 \\textit{list2} 中的字符串和它们的下标，用一个变量 \\textit{mi} 记录最小的下标和。 然后遍历 \\textit{list1}，对于每个字符串 \\textit{s}，如果 \\textit{s} 在 \\textit{list2} 中出现，那么我们计算 \\textit{s} 在 \\textit{list1} 中的下标 \\textit{i} 和在 \\textit{list2} 中的下标 \\textit{j}，如果 \\textit{i} + \\textit{j} < \\textit{mi}，我们就更新答案数组 \\textit{ans} 为 \\textit{s}，并且更新 \\textit{mi} 为 \\textit{i} + \\textit{j}；如果 \\textit{i} + \\textit{j} = \\textit{mi}，我们就将 \\textit{s} 加入答案数组 \\textit{ans}。 遍历结束后，返回答案数组 \\textit{ans} 即可。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两个列表的最小索引总和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "55.8%",
    "difficulty": "中等",
    "frontendId": "609",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0609.Find%20Duplicate%20File%20in%20System/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Find Duplicate File in System",
    "titleCn": "在系统中查找重复文件",
    "titleSlug": "find-duplicate-file-in-system",
    "url": "https://leetcode.cn/problems/find-duplicate-file-in-system/description/",
    "statementPreview": "给你一个目录信息列表 paths，包括目录路径，以及该目录中的所有文件及其内容，请你按路径返回文件系统中的所有重复文件。答案可按 任意顺序 返回。 一组重复的文件至少包括 两个 具有完全相同内容的文件。 输入 列表中的单个目录信息字符串的格式如下： \"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)\" 这意味着，在目录 root/d1/d2/.../dm 下，有 n 个文件 ( f1.txt , f2.txt ... fn.txt ) 的内容分别是 ( f1_content , f2_content ... fn_content )。注意： n >= 1 且 m >= 0。如果 m = 0，则表示该目录是根目录。 输出 是由 重复文件路径组 构成的列表。其中每个组由所有具有相同内容文件的文件路径组成。文件路径是具有下列格式的字符串： \"directory_path/file_name.txt\"",
    "approachPreview": "我们创建一个哈希表 d，其中键是文件内容，值是具有相同内容的文件路径列表。 接下来，我们遍历 \\textit{paths}，对于每个路径，我们将其分割成目录路径和文件信息。对于每个文件信息，我们提取出文件名和文件内容，并将文件路径添加到哈希表 d 中对应文件内容的列表中。 最后，我们返回哈希表 d 中所有具有多个文件路径的值。 时间复杂度为 O(n)，空间复杂度为 O(n)，其中 n 是 \\textit{paths} 的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 在系统中查找重复文件 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "57.2%",
    "difficulty": "困难",
    "frontendId": "757",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0757.Set%20Intersection%20Size%20At%20Least%20Two/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Set Intersection Size At Least Two",
    "titleCn": "设置交集大小至少为2",
    "titleSlug": "set-intersection-size-at-least-two",
    "url": "https://leetcode.cn/problems/set-intersection-size-at-least-two/description/",
    "statementPreview": "给你一个二维整数数组 intervals，其中 intervals[i] = [start_i, end_i] 表示从 start_i 到 end_i 的所有整数，包括 start_i 和 end_i。 包含集合 是一个名为 nums 的数组，并满足 intervals 中的每个区间都 至少 有 两个 整数在 nums 中。 例如，如果 intervals = [[1,3], [3,7], [8,9]]，那么 [1,2,4,7,8,9] 和 [2,3,4,8,9] 都符合 包含集合 的定义。 返回包含集合可能的最小大小。",
    "approachPreview": "我们希望在数轴上选出尽可能少的整数点，使得每个区间都至少包含两个点。一个经典而有效的策略是按照区间的右端点进行排序，并尽量让已选取的点位于区间的右侧，以便这些点能覆盖更多后续区间。 首先将所有区间按照如下规则排序： 1. 按右端点从小到大； 2. 若右端点相同，按左端点从大到小。 这样排序的原因是：右端点越小的区间“可操作空间”越少，应优先满足；当右端点相同时，左端点更大的区间更窄，更应优先被处理。 随后，我们使用两个变量 s 和 e 分别记录当前所有已处理区间所共同拥有的 **倒数第二个点** 和 **最后一个点**。初始时 s = e = -1，表示还没有放置任何点。 接下来依次处理排序后的区间 [a, b]，根据它与 \\{s, e\\} 的关系分三种情况讨论： 1. **若 a \\leq s**： 当前区间已包含 s 和 e 两个点，无需额外放点。 2. **若 s < a \\leq e**： 当前区间只包含一个点（即 e），还需要补一个点。为了让新点对后续区间最有帮助，我们选择在区间最右侧的点 b。此时更新 \\textit{ans} = \\textit{ans} + 1，并将新的两点设为 \\{e, b\\}。 3. **若 a > e**： 当前区间完全不包含已有的两个点，需要补两个点。最优选择是在区间最右侧放置 \\{b - 1, b\\}。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设置交集大小至少为2 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "69.1%",
    "difficulty": "中等",
    "frontendId": "986",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0986.Interval%20List%20Intersections/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "line-sweep",
        "name": "扫描线"
      }
    ],
    "title": "Interval List Intersections",
    "titleCn": "区间列表的交集",
    "titleSlug": "interval-list-intersections",
    "url": "https://leetcode.cn/problems/interval-list-intersections/description/",
    "statementPreview": "给定两个由一些 闭区间 组成的列表， firstList 和 secondList，其中 firstList[i] = [start_i, end_i] 而 secondList[j] = [start_j, end_j]。每个区间列表都是成对 不相交 的，并且 已经排序。 返回这 两个区间列表的交集。 形式上， 闭区间 [a, b] （其中 a <= b ）表示实数 x 的集合，而 a <= x <= b。 两个闭区间的 交集 是一组实数，要么为空集，要么为闭区间。例如， [1, 3] 和 [2, 4] 的交集为 [2, 3]。",
    "approachPreview": "区间列表的交集 属于海量集合去重与求交系列中的一个变体。主要标签是 数组、双指针、扫描线。先确定窗口内必须维护的不变量，再移动右端扩展、移动左端恢复合法；计数类题要明确每次恢复合法后新增的是多少个候选。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区间列表的交集 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "70.3%",
    "difficulty": "简单",
    "frontendId": "1002",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1002.Find%20Common%20Characters/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Find Common Characters",
    "titleCn": "查找共用字符",
    "titleSlug": "find-common-characters",
    "url": "https://leetcode.cn/problems/find-common-characters/description/",
    "statementPreview": "给你一个字符串数组 words，请你找出所有在 words 的每个字符串中都出现的共用字符（ 包括重复字符 ），并以数组形式返回。你可以按 任意顺序 返回答案。",
    "approachPreview": "我们用一个长度为 26 的数组 cnt 记录每个字符在所有字符串中出现的最小次数，最后遍历 cnt 数组，将出现次数大于 0 的字符加入答案即可。 时间复杂度 O(n \\sum w_i)，空间复杂度 O( \\Sigma )。其中 n 为字符串数组 words 的长度，而 w_i 为字符串数组 words 中第 i 个字符串的长度，另外 \\Sigma 为字符集的大小，本题中 \\Sigma = 26。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 查找共用字符 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "78.4%",
    "difficulty": "简单",
    "frontendId": "1213",
    "paidOnly": true,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1213.Intersection%20of%20Three%20Sorted%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "counting",
        "name": "计数"
      }
    ],
    "title": "Intersection of Three Sorted Arrays",
    "titleCn": "三个有序数组的交集",
    "titleSlug": "intersection-of-three-sorted-arrays",
    "url": "https://leetcode.cn/problems/intersection-of-three-sorted-arrays/description/",
    "statementPreview": "给出三个均为 严格递增排列 的整数数组 arr1， arr2 和 arr3。返回一个由 仅 在这三个数组中 同时出现 的整数所构成的有序数组。",
    "approachPreview": "遍历三个数组，统计每个数字出现的次数，然后遍历任意一个数组，若某个数字出现的次数为 3，则将其加入结果数组。 时间复杂度 O(n)，空间复杂度 O(m)。其中 n 和 m 分别为数组的长度和数组中数字的范围。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 三个有序数组的交集 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "41.8%",
    "difficulty": "中等",
    "frontendId": "1487",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1487.Making%20File%20Names%20Unique/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Making File Names Unique",
    "titleCn": "保证文件名唯一",
    "titleSlug": "making-file-names-unique",
    "url": "https://leetcode.cn/problems/making-file-names-unique/description/",
    "statementPreview": "给你一个长度为 n 的字符串数组 names。你将会在文件系统中创建 n 个文件夹：在第 i 分钟，新建名为 names[i] 的文件夹。 由于两个文件 不能 共享相同的文件名，因此如果新建文件夹使用的文件名已经被占用，系统会以 (k) 的形式为新文件夹的文件名添加后缀，其中 k 是能保证文件名唯一的 最小正整数。 返回长度为 n 的字符串数组，其中 ans[i] 是创建第 i 个文件夹时系统分配给该文件夹的实际名称。",
    "approachPreview": "我们可以用哈希表 d 记录每个文件夹的最小可用编号，其中 d[name] = k 表示文件夹 name 的最小可用编号为 k。初始时，d 中没有任何文件夹，因此 d 为空。 接下来遍历文件夹数组，对于每个文件名 name： 如果 name 在 d 中，说明文件夹 name 已经存在，我们需要找到一个新的文件夹名字。我们可以不断地尝试 name(k)，其中 k 从 d[name] 开始，直到找到一个文件夹名字 name(k) 不存在于 d 中为止。我们将 name(k) 加入 d 中，并将 d[name] 更新为 k + 1。然后我们将 name 更新为 name(k)。 如果 name 不在 d 中，我们可以直接将 name 加入 d 中，并将 d[name] 更新为 1。 接着我们将 name 加入答案数组。然后继续遍历下一个文件名。 遍历完所有文件名后，我们即可得到答案数组。 在以下代码实现中，我们直接修改文件名数组 names，而不使用额外的答案数组。 时间复杂度 O(L)，空间复杂度 O(L)，其中 L 为数组 names 中所有文件名的长度之和。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 保证文件名唯一 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "74.5%",
    "difficulty": "简单",
    "frontendId": "2215",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2215.Find%20the%20Difference%20of%20Two%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Find the Difference of Two Arrays",
    "titleCn": "找出两数组的不同",
    "titleSlug": "find-the-difference-of-two-arrays",
    "url": "https://leetcode.cn/problems/find-the-difference-of-two-arrays/description/",
    "statementPreview": "给你两个下标从 0 开始的整数数组 nums1 和 nums2，请你返回一个长度为 2 的列表 answer，其中： answer[0] 是 nums1 中所有 不 存在于 nums2 中的 不同 整数组成的列表。 answer[1] 是 nums2 中所有 不 存在于 nums1 中的 不同 整数组成的列表。 注意： 列表中的整数可以按 任意 顺序返回。",
    "approachPreview": "我们定义两个哈希表 s1 和 s2 分别存储数组 nums1 和 nums2 中的元素。然后遍历 s1 中的每个元素，如果该元素不在 s2 中，那么将其加入到答案的第一个列表中。同理，遍历 s2 中的每个元素，如果该元素不在 s1 中，那么将其加入到答案的第二个列表中。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出两数组的不同 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "66.9%",
    "difficulty": "简单",
    "frontendId": "2248",
    "paidOnly": false,
    "seriesKeys": [
      "massive-set-dedup-intersection"
    ],
    "seriesPrimaryKey": "massive-set-dedup-intersection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2200-2299/2248.Intersection%20of%20Multiple%20Arrays/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Intersection of Multiple Arrays",
    "titleCn": "多个数组求交集",
    "titleSlug": "intersection-of-multiple-arrays",
    "url": "https://leetcode.cn/problems/intersection-of-multiple-arrays/description/",
    "statementPreview": "给你一个二维整数数组 nums，其中 nums[i] 是由 不同 正整数组成的一个非空数组，按 升序排列 返回一个数组，数组中的每个元素在 nums 所有数组 中都出现过。",
    "approachPreview": "遍历数组 nums，对于每个数组 arr，统计数组 arr 中每个数字出现的次数，然后遍历计数数组，统计出现次数等于数组 nums 的长度的数字，即为答案。 时间复杂度 O(N)，空间复杂度 O(1000)。其中 N 为数组 nums 中数字的总数。",
    "followUps": [
      {
        "question": "这题和海量集合去重与求交系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 多个数组求交集 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "海量 URL 去重或求交不能全放内存时怎么办？",
        "answer": "先规范化 URL，再按哈希分片把相同 key 落到同一桶；桶内用排序、哈希集合或布隆过滤器做去重和求交。需要精确结果时布隆过滤器只能做预过滤，最终仍要落到精确校验。"
      }
    ]
  },
  {
    "acRate": "60.1%",
    "difficulty": "困难",
    "frontendId": "297",
    "paidOnly": false,
    "seriesKeys": [
      "serialize-and-deserialize"
    ],
    "seriesPrimaryKey": "serialize-and-deserialize",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0297.Serialize%20and%20Deserialize%20Binary%20Tree/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Serialize and Deserialize Binary Tree",
    "titleCn": "二叉树的序列化与反序列化",
    "titleSlug": "serialize-and-deserialize-binary-tree",
    "url": "https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/description/",
    "statementPreview": "序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。",
    "approachPreview": "我们可以采用层序遍历的方式对二叉树进行序列化，即从根节点开始，依次将二叉树的节点按照从上到下、从左到右的顺序加入队列中，然后将队列中的节点依次出队。如果节点不为空，则将其值加入序列化字符串中，否则加入特殊字符 #。最后将序列化字符串返回即可。 反序列化时，我们将序列化字符串按照分隔符进行切分，得到一个字符串数组，然后依次将字符串数组中的元素加入队列中。队列中的元素即为二叉树的节点，我们从队列中依次取出元素，如果元素不为 #，则将其转换为整数后作为节点的值，然后将该节点加入队列中，否则将其置为 null。最后返回根节点即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为二叉树的节点个数。",
    "followUps": [
      {
        "question": "这题和序列化与反序列化系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的序列化与反序列化 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷序列化与反序列化系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.3%",
    "difficulty": "困难",
    "frontendId": "428",
    "paidOnly": true,
    "seriesKeys": [
      "serialize-and-deserialize"
    ],
    "seriesPrimaryKey": "serialize-and-deserialize",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0428.Serialize%20and%20Deserialize%20N-ary%20Tree/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Serialize and Deserialize N-ary Tree",
    "titleCn": "序列化和反序列化 N 叉树",
    "titleSlug": "serialize-and-deserialize-n-ary-tree",
    "url": "https://leetcode.cn/problems/serialize-and-deserialize-n-ary-tree/description/",
    "statementPreview": "序列化是指将一个数据结构转化为位序列的过程，因此可以将其存储在文件中或内存缓冲区中，以便稍后在相同或不同的计算机环境中恢复结构。 设计一个序列化和反序列化 N 叉树的算法。一个 N 叉树是指每个节点都有不超过 N 个孩子节点的有根树。序列化 / 反序列化算法的算法实现没有限制。你只需要保证 N 叉树可以被序列化为一个字符串并且该字符串可以被反序列化成原树结构即可。 例如，你需要序列化下面的 3-叉 树。 为 [1 [3[5 6] 2 4]]。你不需要以这种形式完成，你可以自己创造和实现不同的方法。 或者，您可以遵循 LeetCode 的层序遍历序列化格式，其中每组孩子节点由空值分隔。 例如，上面的树可以序列化为 [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14] 你不一定要遵循以上建议的格式，有很多不同的格式，所以请发挥创造力，想出不同的方法来完成本题。",
    "approachPreview": "采用先序遍历序列化，每个节点写入值和孩子数量。反序列化时按同样顺序读取，先创建当前节点，再递归读取固定数量的孩子，从而无需额外空指针标记。",
    "followUps": [
      {
        "question": "这题和序列化与反序列化系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 序列化和反序列化 N 叉树 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷序列化与反序列化系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.5%",
    "difficulty": "中等",
    "frontendId": "449",
    "paidOnly": false,
    "seriesKeys": [
      "serialize-and-deserialize"
    ],
    "seriesPrimaryKey": "serialize-and-deserialize",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0449.Serialize%20and%20Deserialize%20BST/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Serialize and Deserialize BST",
    "titleCn": "序列化和反序列化二叉搜索树",
    "titleSlug": "serialize-and-deserialize-bst",
    "url": "https://leetcode.cn/problems/serialize-and-deserialize-bst/description/",
    "statementPreview": "序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。 设计一个算法来序列化和反序列化 二叉搜索树。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。 编码的字符串应尽可能紧凑。",
    "approachPreview": "题目给定的是二叉搜索树，我们知道二叉搜索树的中序遍历是有序的，而通过“先序遍历”和“中序遍历”可以唯一确定一棵二叉树，所以我们可以通过先序遍历的结果和中序遍历的结果来唯一确定一棵二叉搜索树。 在 serialize 方法中，我们使用先序遍历的方式将二叉搜索树序列化为空格分隔的字符串，然后在 deserialize 方法中，我们将字符串按空格分割为数组，然后使用递归的方式来构建二叉搜索树。递归函数为 dfs(mi, mx)，表示当前节点的值必须在 [mi, mx] 之间，如果当前节点的值不在 [mi, mx] 之间，则说明这个节点不是当前递归树的节点，返回 None。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉搜索树的节点数。",
    "followUps": [
      {
        "question": "这题和序列化与反序列化系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 序列化和反序列化二叉搜索树 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷序列化与反序列化系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.2%",
    "difficulty": "困难",
    "frontendId": "588",
    "paidOnly": true,
    "seriesKeys": [
      "design-file-system"
    ],
    "seriesPrimaryKey": "design-file-system",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0588.Design%20In-Memory%20File%20System/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Design In-Memory File System",
    "titleCn": "设计内存文件系统",
    "titleSlug": "design-in-memory-file-system",
    "url": "https://leetcode.cn/problems/design-in-memory-file-system/description/",
    "statementPreview": "设计一个内存文件系统，模拟以下功能： 实现文件系统类: FileSystem() 初始化系统对象 List<String> ls(String path) 如果 path 是一个文件路径，则返回一个仅包含该文件名称的列表。 如果 path 是一个目录路径，则返回该目录中文件和 目录名 的列表。 答案应该 按 字典顺序 排列。 void mkdir(String path) 根据给定的路径创建一个新目录。给定的目录路径不存在。如果路径中的中间目录不存在，您也应该创建它们。 void addContentToFile(String filePath, String content) 如果 filePath 不存在，则创建包含给定内容 content 的文件。 如果 filePath 已经存在，将给定的内容 content 附加到原始内容。 String readContentFromFile(String filePath) 返回 filePath 下的文件内容。",
    "approachPreview": "设计内存文件系统 属于文件系统设计系列中的一个变体。主要标签是 设计、字典树、哈希表、字符串、排序。先把每个 API 需要维护的状态列出来，再选择哈希表、堆、链表或树等结构保证更新和查询复杂度；实现时要让初始化、重复调用和空结构行为都可预测。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和文件系统设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计内存文件系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷文件系统设计系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.2%",
    "difficulty": "中等",
    "frontendId": "1166",
    "paidOnly": true,
    "seriesKeys": [
      "design-file-system"
    ],
    "seriesPrimaryKey": "design-file-system",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1166.Design%20File%20System/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Design File System",
    "titleCn": "设计文件系统",
    "titleSlug": "design-file-system",
    "url": "https://leetcode.cn/problems/design-file-system/description/",
    "statementPreview": "你需要设计一个文件系统，你可以创建新的路径并将它们与不同的值关联。 路径的格式是一个或多个连接在一起的字符串，形式为： /，后面跟着一个或多个小写英文字母。例如， \" /leetcode\" 和 \"/leetcode/problems\" 是有效路径，而空字符串 \"\" 和 \"/\" 不是。 实现 FileSystem 类: bool createPath(string path, int value) 创建一个新的 path，并在可能的情况下关联一个 value，然后返回 true。如果路径 已经存在 或其父路径 不存在，则返回 false。 int get(string path) 返回与 path 关联的值，如果路径不存在则返回 -1。",
    "approachPreview": "我们可以使用前缀树来存储路径，每个节点存储一个值，表示该节点对应的路径的值。 定义前缀树的节点结构如下： children：子节点，使用哈希表存储，键为子节点的路径，值为子节点的引用； v：当前节点对应的路径的值。 定义前缀树的方法如下： insert(w, v)：插入路径 w，并将其对应的值设为 v。如果路径 w 已经存在或其父路径不存在，则返回 false，否则返回 true。时间复杂度为 O( w )，其中 w 为路径 w 的长度； search(w)：返回路径 w 对应的值。如果路径 w 不存在，则返回 -1。时间复杂度为 O( w )。 总时间复杂度 O(\\sum_{w \\in W} w )，总空间复杂度 O(\\sum_{w \\in W} w )，其中 W 为所有插入的路径的集合。",
    "followUps": [
      {
        "question": "这题和文件系统设计系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 设计文件系统 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷文件系统设计系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.2%",
    "difficulty": "中等",
    "frontendId": "114",
    "paidOnly": false,
    "seriesKeys": [
      "flatten-structures"
    ],
    "seriesPrimaryKey": "flatten-structures",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0114.Flatten%20Binary%20Tree%20to%20Linked%20List/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Flatten Binary Tree to Linked List",
    "titleCn": "二叉树展开为链表",
    "titleSlug": "flatten-binary-tree-to-linked-list",
    "url": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/",
    "statementPreview": "给你二叉树的根结点 root，请你将它展开为一个单链表： 展开后的单链表应该同样使用 TreeNode，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null。 展开后的单链表应该与二叉树 先序遍历 顺序相同。",
    "approachPreview": "先序遍历的访问顺序是“根、左子树、右子树”，左子树最后一个节点访问完后，接着会访问根节点的右子树节点。 因此，对于当前节点，如果其左子节点不为空，我们找到左子树的最右节点，作为前驱节点，然后将当前节点的右子节点赋给前驱节点的右子节点。然后将当前节点的左子节点赋给当前节点的右子节点，并将当前节点的左子节点置为空。然后将当前节点的右子节点作为下一个节点，继续处理，直至所有节点处理完毕。 时间复杂度 O(n)，其中 n 是树中节点的个数。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和扁平化结构系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树展开为链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷扁平化结构系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.7%",
    "difficulty": "中等",
    "frontendId": "251",
    "paidOnly": true,
    "seriesKeys": [
      "flatten-structures"
    ],
    "seriesPrimaryKey": "flatten-structures",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0251.Flatten%202D%20Vector/README.md",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "iterator",
        "name": "迭代器"
      }
    ],
    "title": "Flatten 2D Vector",
    "titleCn": "展开二维向量",
    "titleSlug": "flatten-2d-vector",
    "url": "https://leetcode.cn/problems/flatten-2d-vector/description/",
    "statementPreview": "请设计并实现一个能够展开二维向量的迭代器。该迭代器需要支持 next 和 hasNext 两种操作。 实现 Vector2D 类： Vector2D(int[][] vec) 使用二维向量 vec 初始化对象 next() 从二维向量返回下一个元素并将指针移动到下一个位置。你可以假设对 next 的所有调用都是合法的。 hasNext() 当向量中还有元素返回 true，否则返回 false。",
    "approachPreview": "我们定义两个指针 i 和 j，分别指向当前二维向量的行和列，初始时 i = 0，j = 0。 接下来，我们设计一个函数 forward()，用于将 i 和 j 向后移动，直到指向一个非空的元素。 每次调用 next 方法时，我们先调用 forward()，然后返回当前指向的元素，最后将 j 向后移动一位。 每次调用 hasNext 方法时，我们先调用 forward()，然后判断 i 是否小于二维向量的行数，如果是，则返回 true，否则返回 false。 时间复杂度 O(1)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和扁平化结构系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 展开二维向量 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷扁平化结构系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.9%",
    "difficulty": "中等",
    "frontendId": "341",
    "paidOnly": false,
    "seriesKeys": [
      "flatten-structures"
    ],
    "seriesPrimaryKey": "flatten-structures",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0341.Flatten%20Nested%20List%20Iterator/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "iterator",
        "name": "迭代器"
      }
    ],
    "title": "Flatten Nested List Iterator",
    "titleCn": "扁平化嵌套列表迭代器",
    "titleSlug": "flatten-nested-list-iterator",
    "url": "https://leetcode.cn/problems/flatten-nested-list-iterator/description/",
    "statementPreview": "给你一个嵌套的整数列表 nestedList。每个元素要么是一个整数，要么是一个列表；该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。 实现扁平迭代器类 NestedIterator： NestedIterator(List<NestedInteger> nestedList) 用嵌套列表 nestedList 初始化迭代器。 int next() 返回嵌套列表的下一个整数。 boolean hasNext() 如果仍然存在待迭代的整数，返回 true；否则，返回 false。 你的代码将会用下述伪代码检测： initialize iterator with nestedList res = [] while iterator.hasNext() append iterator.next() to the end of res return res 如果 res 与预期的扁平化列表匹配，那么你的代码将会被判为正确。",
    "approachPreview": "根据题意要求可以将 NestedInteger 数据结构视作一个 N 叉树，当元素为一个整数时，该节点是 N 叉树的叶子节点，当元素为一个整数数组时，该节点是 N 叉树的非叶子节点，数组中的每一个元素包含子树的所有节点。故直接递归遍历 N 叉树并记录所有的叶子节点即可。",
    "followUps": [
      {
        "question": "这题和扁平化结构系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 扁平化嵌套列表迭代器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷扁平化结构系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.0%",
    "difficulty": "中等",
    "frontendId": "430",
    "paidOnly": false,
    "seriesKeys": [
      "flatten-structures"
    ],
    "seriesPrimaryKey": "flatten-structures",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0430.Flatten%20a%20Multilevel%20Doubly%20Linked%20List/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      }
    ],
    "title": "Flatten a Multilevel Doubly Linked List",
    "titleCn": "扁平化多级双向链表",
    "titleSlug": "flatten-a-multilevel-doubly-linked-list",
    "url": "https://leetcode.cn/problems/flatten-a-multilevel-doubly-linked-list/description/",
    "statementPreview": "你会得到一个双链表，其中包含的节点有一个下一个指针、一个前一个指针和一个额外的 子指针。这个子指针可能指向一个单独的双向链表，也包含这些特殊的节点。这些子列表可以有一个或多个自己的子列表，以此类推，以生成如下面的示例所示的 多层数据结构。 给定链表的头节点 head，将链表 扁平化，以便所有节点都出现在单层双链表中。让 curr 是一个带有子列表的节点。子列表中的节点应该出现在 扁平化列表 中的 curr 之后 和 curr.next 之前。 返回 扁平列表的 head。列表中的节点必须将其 所有 子指针设置为 null。",
    "approachPreview": "扁平化多级双向链表 属于扁平化结构系列中的一个变体。主要标签是 深度优先搜索、链表、双向链表。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和扁平化结构系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 扁平化多级双向链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷扁平化结构系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.0%",
    "difficulty": "中等",
    "frontendId": "2625",
    "paidOnly": false,
    "seriesKeys": [
      "flatten-structures"
    ],
    "seriesPrimaryKey": "flatten-structures",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2600-2699/2625.Flatten%20Deeply%20Nested%20Array/README.md",
    "tags": [],
    "title": "Flatten Deeply Nested Array",
    "titleCn": "扁平化嵌套数组",
    "titleSlug": "flatten-deeply-nested-array",
    "url": "https://leetcode.cn/problems/flatten-deeply-nested-array/description/",
    "statementPreview": "请你编写一个函数，它接收一个 多维数组 arr 和它的深度 n，并返回该数组的 扁平化 后的结果。 多维数组 是一种包含整数或其他 多维数组 的递归数据结构。 数组 扁平化 是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。只有当嵌套的数组深度小于 n 时，才应该执行扁平化操作。第一层数组中元素的深度被认为是 0。 请在没有使用内置方法 Array.flat 的前提下解决这个问题。",
    "approachPreview": "我们可以使用递归的方法，将多维数组扁平化。 在函数中，我们首先判断 n 是否小于等于 0，如果是，直接返回原数组。否则，我们遍历数组的每个元素 x，如果 x 是数组，我们递归调用函数，参数为 (x, n - 1)，将返回值添加到结果数组中；否则，将 x 添加到结果数组中。最后返回结果数组。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组的元素个数。",
    "followUps": [
      {
        "question": "这题和扁平化结构系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 扁平化嵌套数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷扁平化结构系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "38.2%",
    "difficulty": "困难",
    "frontendId": "269",
    "paidOnly": true,
    "seriesKeys": [
      "alien-dictionary"
    ],
    "seriesPrimaryKey": "alien-dictionary",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0269.Alien%20Dictionary/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Alien Dictionary",
    "titleCn": "火星词典",
    "titleSlug": "alien-dictionary",
    "url": "https://leetcode.cn/problems/alien-dictionary/description/",
    "statementPreview": "现有一种使用英语字母的火星语言，这门语言的字母顺序对你来说是未知的。 给你一个来自这种外星语言字典的字符串列表 words， words 中的字符串已经 按这门新语言的 字典序 进行了排序。 如果这种说法是错误的，并且给出的 words 不能对应任何字母的顺序，则返回 \"\"。 否则，返回一个按新语言规则的 字典递增顺序 排序的独特字符串。如果有多个解决方案，则返回其中 任意一个。",
    "approachPreview": "用数组 g 记录在火星字典中的字母先后关系，g[i][j] = true 表示字母 i + 'a' 在字母 j + 'a' 的前面；用数组 s 记录当前字典出现过的字母，cnt 表示出现过的字母数。 一个很简单的想法是遍历每一个单词，比较该单词和其后的所有单词，把所有的先后关系更新进数组 g，这样遍历时间复杂度为 O(n^3)；但是我们发现其实比较相邻的两个单词就可以了，比如 a < b < c 则比较 a < b 和 b < c， a 和 c 的关系便确定了。因此算法可以优化成比较相邻两个单词，时间复杂度为 O(n²)。 出现矛盾的情况： g[i][j] = g[j][i] = true； 后一个单词是前一个单词的前缀； 在拓扑排序后 ans 的长度小于统计到的字母个数。 拓扑排序： 统计所有出现的字母入度； 将所有入度为 0 的字母加入队列； 当队列不空，出队并更新其他字母的入度，入度为 0 则入队，同时出队时将当前字母加入 ans 的结尾； 得到的便是字母的拓扑序，也就是火星字典的字母顺序。",
    "followUps": [
      {
        "question": "这题和外星语词典系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 火星词典 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷外星语词典系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.8%",
    "difficulty": "简单",
    "frontendId": "953",
    "paidOnly": false,
    "seriesKeys": [
      "alien-dictionary"
    ],
    "seriesPrimaryKey": "alien-dictionary",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0953.Verifying%20an%20Alien%20Dictionary/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Verifying an Alien Dictionary",
    "titleCn": "验证外星语词典",
    "titleSlug": "verifying-an-alien-dictionary",
    "url": "https://leetcode.cn/problems/verifying-an-alien-dictionary/description/",
    "statementPreview": "某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（ order ）是一些小写字母的排列。 给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。",
    "approachPreview": "先把外星字母映射成顺序编号，再逐对比较相邻单词。找到第一处不同字符时按编号判断大小；如果前缀完全相同，则较短单词必须排在前面。",
    "followUps": [
      {
        "question": "这题和外星语词典系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证外星语词典 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷外星语词典系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.4%",
    "difficulty": "简单",
    "frontendId": "511",
    "paidOnly": false,
    "seriesKeys": [
      "game-play-analysis"
    ],
    "seriesPrimaryKey": "game-play-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0511.Game%20Play%20Analysis%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Game Play Analysis I",
    "titleCn": "游戏玩法分析 I",
    "titleSlug": "game-play-analysis-i",
    "url": "https://leetcode.cn/problems/game-play-analysis-i/description/",
    "statementPreview": "活动表 Activity： +--------------+---------+ Column Name Type +--------------+---------+ player_id int device_id int event_date date games_played int +--------------+---------+ 在 SQL 中，表的主键是 (player_id, event_date)。 这张表展示了一些游戏玩家在游戏平台上的行为活动。 每行数据记录了一名玩家在退出平台之前，当天使用同一台设备登录平台后打开的游戏的数目（可能是 0 个）。 查询每位玩家 第一次登录平台的日期。 查询结果的格式如下所示： Activity 表： +-----------+-----------+------------+--------------+ player_id device_id event_date games_played +-----------+-----------+------------+--------------+ 1 2 2016-03-01 5 1 2 2016-05-02 6 2 3 2017-06-25 1 3 1 2016-03-02 0 3 4 201。",
    "approachPreview": "游戏玩法分析 I 属于游戏玩法分析系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和游戏玩法分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 游戏玩法分析 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷游戏玩法分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.9%",
    "difficulty": "简单",
    "frontendId": "512",
    "paidOnly": true,
    "seriesKeys": [
      "game-play-analysis"
    ],
    "seriesPrimaryKey": "game-play-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0512.Game%20Play%20Analysis%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Game Play Analysis II",
    "titleCn": "游戏玩法分析 II",
    "titleSlug": "game-play-analysis-ii",
    "url": "https://leetcode.cn/problems/game-play-analysis-ii/description/",
    "statementPreview": "Table: Activity +--------------+---------+ Column Name Type +--------------+---------+ player_id int device_id int event_date date games_played int +--------------+---------+ (player_id, event_date) 是这个表的两个主键(具有唯一值的列的组合) 这个表显示的是某些游戏玩家的游戏活动情况 每一行是在某天使用某个设备登出之前登录并玩多个游戏（可能为0）的玩家的记录 请编写解决方案，描述每一个玩家首次登陆的设备名称 返回结果格式如以下示例：",
    "approachPreview": "按玩家分组找最早登录日期，再回到 Activity 表取该玩家首次登录使用的设备。可以用子查询求 MIN(event_date)，再用 player_id 和日期连接。",
    "followUps": [
      {
        "question": "这题和游戏玩法分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 游戏玩法分析 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷游戏玩法分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.8%",
    "difficulty": "中等",
    "frontendId": "534",
    "paidOnly": true,
    "seriesKeys": [
      "game-play-analysis"
    ],
    "seriesPrimaryKey": "game-play-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0534.Game%20Play%20Analysis%20III/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Game Play Analysis III",
    "titleCn": "游戏玩法分析 III",
    "titleSlug": "game-play-analysis-iii",
    "url": "https://leetcode.cn/problems/game-play-analysis-iii/description/",
    "statementPreview": "表： Activity +--------------+---------+ Column Name Type +--------------+---------+ player_id int device_id int event_date date games_played int +--------------+---------+ （player_id，event_date）是此表的主键（具有唯一值的列）。 这张表显示了某些游戏的玩家的活动情况。 每一行是一个玩家的记录，他在某一天使用某个设备注销之前登录并玩了很多游戏（可能是 0 ）。 编写一个解决方案，同时报告每组玩家和日期，以及玩家到 目前为止 玩了多少游戏。也就是说，玩家在该日期之前所玩的游戏总数。详细情况请查看示例。 以 任意顺序 返回结果表。 结果格式如下所示。",
    "approachPreview": "先按玩家和日期聚合当天游戏数，再用窗口函数或自连接计算截至当天的累计 games_played。输出粒度是 player_id + event_date。",
    "followUps": [
      {
        "question": "这题和游戏玩法分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 游戏玩法分析 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷游戏玩法分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "43.3%",
    "difficulty": "中等",
    "frontendId": "550",
    "paidOnly": false,
    "seriesKeys": [
      "game-play-analysis"
    ],
    "seriesPrimaryKey": "game-play-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0550.Game%20Play%20Analysis%20IV/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Game Play Analysis IV",
    "titleCn": "游戏玩法分析 IV",
    "titleSlug": "game-play-analysis-iv",
    "url": "https://leetcode.cn/problems/game-play-analysis-iv/description/",
    "statementPreview": "Table: Activity +--------------+---------+ Column Name Type +--------------+---------+ player_id int device_id int event_date date games_played int +--------------+---------+ （player_id，event_date）是此表的主键（具有唯一值的列的组合）。 这张表显示了某些游戏的玩家的活动情况。 每一行是一个玩家的记录，他在某一天使用某个设备注销之前登录并玩了很多游戏（可能是 0）。 编写解决方案，报告在首次登录的第二天再次登录的玩家的 比率， 四舍五入到小数点后两位。换句话说，你需要计算从首次登录后的第二天登录的玩家数量，并将其除以总玩家数。 结果格式如下所示：",
    "approachPreview": "我们可以先找到每个玩家的首次登录日期，然后与原表进行左连接，连接条件为玩家 ID 相同且日期差为 -1，即第二天登录。那么，我们只需要统计出第二天登录的玩家数量中，玩家不为空的比率即可。",
    "followUps": [
      {
        "question": "这题和游戏玩法分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 游戏玩法分析 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷游戏玩法分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.4%",
    "difficulty": "困难",
    "frontendId": "1097",
    "paidOnly": true,
    "seriesKeys": [
      "game-play-analysis"
    ],
    "seriesPrimaryKey": "game-play-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1097.Game%20Play%20Analysis%20V/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Game Play Analysis V",
    "titleCn": "游戏玩法分析 V",
    "titleSlug": "game-play-analysis-v",
    "url": "https://leetcode.cn/problems/game-play-analysis-v/description/",
    "statementPreview": "表： Activity +--------------+---------+ Column Name Type +--------------+---------+ player_id int device_id int event_date date games_played int +--------------+---------+ （player_id，event_date）是此表的主键(具有唯一值的列的组合) 这张表显示了某些游戏的玩家的活动情况 每一行表示一个玩家的记录，在某一天使用某个设备注销之前，登录并玩了很多游戏（可能是 0） 玩家的 安装日期 定义为该玩家的第一个登录日。 我们将日期 x 的 第一天留存率 定义为：假定安装日期为 X 的玩家的数量为 N，其中在 X 之后的一天重新登录的玩家数量为 M， M/N 就是第一天留存率， 四舍五入到小数点后两位。 编写解决方案，报告所有安装日期、当天安装游戏的玩家数量和玩家的 第一天留存率。 以 任意顺序 返回结果表。 结果格式如下所示。",
    "approachPreview": "先求每个玩家首次登录日，再判断该玩家是否在首次登录后的第二天也登录。最终用满足条件的玩家数除以总玩家数，并按题目要求四舍五入。",
    "followUps": [
      {
        "question": "这题和游戏玩法分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 游戏玩法分析 V 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷游戏玩法分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "85.7%",
    "difficulty": "简单",
    "frontendId": "1068",
    "paidOnly": false,
    "seriesKeys": [
      "product-sales-analysis"
    ],
    "seriesPrimaryKey": "product-sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1068.Product%20Sales%20Analysis%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Product Sales Analysis I",
    "titleCn": "产品销售分析 I",
    "titleSlug": "product-sales-analysis-i",
    "url": "https://leetcode.cn/problems/product-sales-analysis-i/description/",
    "statementPreview": "销售表 Sales： +-------------+-------+ Column Name Type +-------------+-------+ sale_id int product_id int year int quantity int price int +-------------+-------+ (sale_id, year) 是销售表 Sales 的主键（具有唯一值的列的组合）。 product_id 是关联到产品表 Product 的外键（reference 列）。 该表的每一行显示 product_id 在某一年的销售情况。 注意: price 表示每单位价格。 产品表 Product： +--------------+---------+ Column Name Type +--------------+---------+ product_id int product_name varchar +--------------+---------+ product_id 是表的主键（具有唯一值的列）。 该表的每一行表示每种产品的产品名称。 编写解决方案，以获取 Sales 表中所有 sale_id 对应的 product_name 以及该产品的所有 year 和 price。",
    "approachPreview": "产品销售分析 I 属于产品销售分析系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和产品销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 产品销售分析 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷产品销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "82.5%",
    "difficulty": "简单",
    "frontendId": "1069",
    "paidOnly": true,
    "seriesKeys": [
      "product-sales-analysis"
    ],
    "seriesPrimaryKey": "product-sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1069.Product%20Sales%20Analysis%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Product Sales Analysis II",
    "titleCn": "产品销售分析 II",
    "titleSlug": "product-sales-analysis-ii",
    "url": "https://leetcode.cn/problems/product-sales-analysis-ii/description/",
    "statementPreview": "销售表： Sales +-------------+-------+ Column Name Type +-------------+-------+ sale_id int product_id int year int quantity int price int +-------------+-------+ sale_id 是这个表的主键（具有唯一值的列）。 product_id 是 Product 表的外键（reference 列）。 该表的每一行显示产品product_id在某一年的销售情况。 请注意价格是每单位的。 产品表： Product +--------------+---------+ Column Name Type +--------------+---------+ product_id int product_name varchar +--------------+---------+ product_id 是这个表的主键（具有唯一值的列）。 该表的每一行表示每种产品的产品名称。 编写解决方案，统计每个产品的销售总量。 返回结果表 无顺序要求。 结果格式如下例子所示。",
    "approachPreview": "输出粒度是 product_id，直接在 Sales 表按 product_id 分组，对 quantity 求和得到 total_quantity。",
    "followUps": [
      {
        "question": "这题和产品销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 产品销售分析 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷产品销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.0%",
    "difficulty": "中等",
    "frontendId": "1070",
    "paidOnly": false,
    "seriesKeys": [
      "product-sales-analysis"
    ],
    "seriesPrimaryKey": "product-sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1070.Product%20Sales%20Analysis%20III/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Product Sales Analysis III",
    "titleCn": "产品销售分析 III",
    "titleSlug": "product-sales-analysis-iii",
    "url": "https://leetcode.cn/problems/product-sales-analysis-iii/description/",
    "statementPreview": "销售表 Sales： +-------------+-------+ Column Name Type +-------------+-------+ sale_id int product_id int year int quantity int price int +-------------+-------+ (sale_id, year) 是这张表的主键（具有唯一值的列的组合）。 这张表的每一行都表示：编号 product_id 的产品在某一年的销售额。 一个产品可能在同一年内有多个销售条目。 请注意，价格是按每单位计的。 编写解决方案，选出每个售出过的产品 第一年 销售的 产品 id、 年份、 数量 和 价格。 对每个 product_id，找到其在Sales表中首次出现的最早年份。 返回该产品在该年度的 所有 销售条目。 返回一张有这些列的表： product_id， first_year， quantity 和 price。 结果表中的条目可以按 任意顺序 排列。",
    "approachPreview": "先为每个 product_id 找到最早销售年份，再筛出这些年份对应的销售记录，返回 product_id、first_year、quantity 和 price。",
    "followUps": [
      {
        "question": "这题和产品销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 产品销售分析 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷产品销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.2%",
    "difficulty": "中等",
    "frontendId": "2324",
    "paidOnly": true,
    "seriesKeys": [
      "product-sales-analysis"
    ],
    "seriesPrimaryKey": "product-sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2324.Product%20Sales%20Analysis%20IV/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Product Sales Analysis IV",
    "titleCn": "产品销售分析 IV",
    "titleSlug": "product-sales-analysis-iv",
    "url": "https://leetcode.cn/problems/product-sales-analysis-iv/description/",
    "statementPreview": "表: Sales +-------------+-------+ Column Name Type +-------------+-------+ sale_id int product_id int user_id int quantity int +-------------+-------+ sale_id 包含唯一值。 product_id 是 product 表的外键。 该表的每一行都显示了产品的 ID 和用户购买的数量。 表: Product +-------------+------+ Column Name Type +-------------+------+ product_id int price int +-------------+------+ product_id 包含唯一值。 该表的每一行都表示每种产品的价格。 编写解决方案，为每个用户获取其消费最多的产品 id。如果同一用户在两个或多个产品上花费了最多的钱，请获取所有花费了最多的钱的产品。 以 任意顺序 返回结果表。 查询结果格式如下所示。",
    "approachPreview": "先按 user_id 和 product_id 汇总购买数量，再在每个用户内找最大购买量。并列时保留所有达到最大值的产品。",
    "followUps": [
      {
        "question": "这题和产品销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 产品销售分析 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷产品销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.9%",
    "difficulty": "简单",
    "frontendId": "2329",
    "paidOnly": true,
    "seriesKeys": [
      "product-sales-analysis"
    ],
    "seriesPrimaryKey": "product-sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2329.Product%20Sales%20Analysis%20V/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Product Sales Analysis V",
    "titleCn": "产品销售分析Ⅴ",
    "titleSlug": "product-sales-analysis-v",
    "url": "https://leetcode.cn/problems/product-sales-analysis-v/description/",
    "statementPreview": "表： Sales +-------------+-------+ Column Name Type +-------------+-------+ sale_id int product_id int user_id int quantity int +-------------+-------+ sale_id 包含唯一值。 product_id 是 Product 表的外键。 这个表中的每一行展示了产品的 ID 以及某个用户购买的数量。 表： Product +-------------+------+ Column Name Type +-------------+------+ product_id int price int +-------------+------+ product_id 包含唯一值。 这张表中的每一行均表示了某个产品的价格。 编写解决方案，获取每个用户的消费额。 按用户消费额 spending 递减 的顺序返回结果。在消费额相等的情况下，以 user_id 递增的顺序将其排序。 结果的格式如下面例子所示：",
    "approachPreview": "先按 user_id 和 product_id 聚合消费金额或数量，再结合 Product 表补齐产品名；最后按题目要求筛选每个用户的目标产品集合。",
    "followUps": [
      {
        "question": "这题和产品销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 产品销售分析Ⅴ 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷产品销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.5%",
    "difficulty": "简单",
    "frontendId": "1082",
    "paidOnly": true,
    "seriesKeys": [
      "sales-analysis"
    ],
    "seriesPrimaryKey": "sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1082.Sales%20Analysis%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Sales Analysis I",
    "titleCn": "销售分析 I",
    "titleSlug": "sales-analysis-i",
    "url": "https://leetcode.cn/problems/sales-analysis-i/description/",
    "statementPreview": "产品表： Product +--------------+---------+ Column Name Type +--------------+---------+ product_id int product_name varchar unit_price int +--------------+---------+ product_id 是这个表的主键(具有唯一值的列)。 该表的每一行显示每个产品的名称和价格。 销售表： Sales +-------------+---------+ Column Name Type +-------------+---------+ seller_id int product_id int buyer_id int sale_date date quantity int price int +------ ------+---------+ 这个表它可以有重复的行。 product_id 是 Product 表的外键(reference 列)。 该表的每一行包含关于一个销售的一些信息。 编写解决方案，找出总销售额最高的销售者，如果有并列的，就都展示出来。 以 任意顺序 返回结果表。 返回结果格式如下所示。",
    "approachPreview": "把 Sales 与 Product 连接后，按 seller_id 聚合销售额 price * quantity。找出最大销售额，并返回所有达到该最大值的 seller_id。",
    "followUps": [
      {
        "question": "这题和销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 销售分析 I  的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.8%",
    "difficulty": "简单",
    "frontendId": "1083",
    "paidOnly": true,
    "seriesKeys": [
      "sales-analysis"
    ],
    "seriesPrimaryKey": "sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1083.Sales%20Analysis%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Sales Analysis II",
    "titleCn": "销售分析 II",
    "titleSlug": "sales-analysis-ii",
    "url": "https://leetcode.cn/problems/sales-analysis-ii/description/",
    "statementPreview": "表： Product +--------------+---------+ Column Name Type +--------------+---------+ product_id int product_name varchar unit_price int +--------------+---------+ Product_id 是该表的主键(具有唯一值的列)。 该表的每一行表示每种产品的名称和价格。 表： Sales +-------------+---------+ Column Name Type +-------------+---------+ seller_id int product_id int buyer_id int sale_date date quantity int price int +------ ------+---------+ 这个表可能有重复的行。 product_id 是 Product 表的外键(reference 列)。 buyer_id 永远不会是 NULL。 sale_date 永远不会是 NULL。 该表的每一行都包含一次销售的一些信息。 编写一个解决方案，报告那些买了 S8 而没有买 iPhone 的 买家。",
    "approachPreview": "我们先将 Sales 表和 Product 表连接起来，然后根据 buyer_id 分组，最后用 HAVING 子句筛选出购买了 S8 却没有购买 iPhone 的买家。",
    "followUps": [
      {
        "question": "这题和销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 销售分析 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.4%",
    "difficulty": "简单",
    "frontendId": "1084",
    "paidOnly": false,
    "seriesKeys": [
      "sales-analysis"
    ],
    "seriesPrimaryKey": "sales-analysis",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1084.Sales%20Analysis%20III/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Sales Analysis III",
    "titleCn": "销售分析 III",
    "titleSlug": "sales-analysis-iii",
    "url": "https://leetcode.cn/problems/sales-analysis-iii/description/",
    "statementPreview": "表： Product +--------------+---------+ Column Name Type +--------------+---------+ product_id int product_name varchar unit_price int +--------------+---------+ product_id 是该表的主键（具有唯一值的列）。 该表的每一行显示每个产品的名称和价格。 表： Sales +-------------+---------+ Column Name Type +-------------+---------+ seller_id int product_id int buyer_id int sale_date date quantity int price int +------ ------+---------+ 这个表可能有重复的行。 product_id 是 Product 表的外键（reference 列）。 该表的每一行包含关于一个销售的一些信息。 编写解决方案，报告 2019年春季 才售出的产品。即 仅 在 2019-01-01 （含）至 2019-03-31 （含）之间出售的商品。 以 任意顺序 返回结果表。 结果格式如下所示。",
    "approachPreview": "按 product_id 判断销售日期是否全部落在指定窗口内。可以先按产品聚合最小和最大 sale_date，也可以用 NOT EXISTS 排除窗口外有销售记录的产品。",
    "followUps": [
      {
        "question": "这题和销售分析系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 销售分析 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷销售分析系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.8%",
    "difficulty": "简单",
    "frontendId": "1148",
    "paidOnly": false,
    "seriesKeys": [
      "article-views"
    ],
    "seriesPrimaryKey": "article-views",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1148.Article%20Views%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Article Views I",
    "titleCn": "文章浏览 I",
    "titleSlug": "article-views-i",
    "url": "https://leetcode.cn/problems/article-views-i/description/",
    "statementPreview": "Views 表： +---------------+---------+ Column Name Type +---------------+---------+ article_id int author_id int viewer_id int view_date date +---------------+---------+ 此表可能会存在重复行。（换句话说，在 SQL 中这个表没有主键） 此表的每一行都表示某人在某天浏览了某位作者的某篇文章。 请注意，同一人的 author_id 和 viewer_id 是相同的。 请查询出所有浏览过自己文章的作者。 结果按照作者的 id 升序排列。 查询结果的格式如下所示：",
    "approachPreview": "文章浏览 I 属于文章浏览系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和文章浏览系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 文章浏览 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷文章浏览系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.2%",
    "difficulty": "中等",
    "frontendId": "1149",
    "paidOnly": true,
    "seriesKeys": [
      "article-views"
    ],
    "seriesPrimaryKey": "article-views",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1149.Article%20Views%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Article Views II",
    "titleCn": "文章浏览 II",
    "titleSlug": "article-views-ii",
    "url": "https://leetcode.cn/problems/article-views-ii/description/",
    "statementPreview": "表: Views +---------------+---------+ Column Name Type +---------------+---------+ article_id int author_id int viewer_id int view_date date +---------------+---------+ 此表可能会存在重复行。 此表的每一行都表示某人在某天浏览了某位作者的某篇文章。 请注意，同一人的 author_id 和 viewer_id 是相同的。 编写解决方案来找出在同一天阅读至少两篇文章的人。 结果按照 id 升序排序。 结果的格式如下。",
    "approachPreview": "我们将数据按照 viewer_id 和 view_date 分组，然后利用 HAVING 子句来筛选出浏览文章数大于 1 的记录，最后按照 id 去重排序即可。",
    "followUps": [
      {
        "question": "这题和文章浏览系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 文章浏览 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷文章浏览系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.2%",
    "difficulty": "简单",
    "frontendId": "1173",
    "paidOnly": true,
    "seriesKeys": [
      "immediate-food-delivery"
    ],
    "seriesPrimaryKey": "immediate-food-delivery",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1173.Immediate%20Food%20Delivery%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Immediate Food Delivery I",
    "titleCn": "即时食物配送 I",
    "titleSlug": "immediate-food-delivery-i",
    "url": "https://leetcode.cn/problems/immediate-food-delivery-i/description/",
    "statementPreview": "配送表: Delivery +-----------------------------+---------+ Column Name Type +-----------------------------+---------+ delivery_id int customer_id int order_date date customer_pref_delivery_date date +-----------------------------+---------+ delivery_id 是表的主键(具有唯一值的列)。 该表保存着顾客的食物配送信息，顾客在某个日期下了订单，并指定了一个期望的配送日期（和下单日期相同或者在那之后）。 如果顾客期望的配送日期和下单日期相同，则该订单称为 「即时订单」，否则称为「计划订单」。 编写解决方案统计即时订单所占的百分比， 保留两位小数。 返回结果如下所示。",
    "approachPreview": "逐行判断 order_date 是否等于 customer_pref_delivery_date，统计即时配送订单数占全部订单数的比例，最后按题目要求保留两位小数。",
    "followUps": [
      {
        "question": "这题和即时食物配送系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 即时食物配送 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷即时食物配送系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.1%",
    "difficulty": "中等",
    "frontendId": "1174",
    "paidOnly": false,
    "seriesKeys": [
      "immediate-food-delivery"
    ],
    "seriesPrimaryKey": "immediate-food-delivery",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1174.Immediate%20Food%20Delivery%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Immediate Food Delivery II",
    "titleCn": "即时食物配送 II",
    "titleSlug": "immediate-food-delivery-ii",
    "url": "https://leetcode.cn/problems/immediate-food-delivery-ii/description/",
    "statementPreview": "配送表: Delivery +-----------------------------+---------+ Column Name Type +-----------------------------+---------+ delivery_id int customer_id int order_date date customer_pref_delivery_date date +-----------------------------+---------+ delivery_id 是该表中具有唯一值的列。 该表保存着顾客的食物配送信息，顾客在某个日期下了订单，并指定了一个期望的配送日期（和下单日期相同或者在那之后）。 如果顾客期望的配送日期和下单日期相同，则该订单称为 「 即时订单 」，否则称为「 计划订单 」。 「 首次订单 」是顾客最早创建的订单。我们保证一个顾客只会有一个「首次订单」。 编写解决方案以获取即时订单在所有用户的首次订单中的比例。 保留两位小数。 结果示例如下所示：",
    "approachPreview": "即时食物配送 II 属于即时食物配送系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和即时食物配送系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 即时食物配送 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷即时食物配送系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "68.2%",
    "difficulty": "中等",
    "frontendId": "2686",
    "paidOnly": true,
    "seriesKeys": [
      "immediate-food-delivery"
    ],
    "seriesPrimaryKey": "immediate-food-delivery",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2600-2699/2686.Immediate%20Food%20Delivery%20III/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Immediate Food Delivery III",
    "titleCn": "即时食物配送 III",
    "titleSlug": "immediate-food-delivery-iii",
    "url": "https://leetcode.cn/problems/immediate-food-delivery-iii/description/",
    "statementPreview": "Delivery 表： +-----------------------------+---------+ 字段名 类型 +-----------------------------+---------+ delivery_id int customer_id int order_date date customer_pref_delivery_date date +-----------------------------+---------+ delivery_id 是该表的具有唯一值的列。 每一行包含有关向顾客交付食物的信息，顾客在某个日期下订单，并指定了一个首选交付日期（在订单日期当天或之后）。 如果顾客的首选交付日期与订单日期相同，则该订单称为 立即交付，否则称为 计划交付。 编写解决方案，找出每个唯一的 order_date 中立即交付订单的百分比。 结果保留两位小数。 返回查询结果并按 order_date 升序 排序。 查询结果的格式如下所示。",
    "approachPreview": "先找出每个顾客的首单，再只在首单集合里判断是否即时配送。最终计算即时首单数占顾客数的百分比。",
    "followUps": [
      {
        "question": "这题和即时食物配送系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 即时食物配送 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷即时食物配送系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.9%",
    "difficulty": "中等",
    "frontendId": "1193",
    "paidOnly": false,
    "seriesKeys": [
      "monthly-transactions"
    ],
    "seriesPrimaryKey": "monthly-transactions",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1193.Monthly%20Transactions%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Monthly Transactions I",
    "titleCn": "每月交易 I",
    "titleSlug": "monthly-transactions-i",
    "url": "https://leetcode.cn/problems/monthly-transactions-i/description/",
    "statementPreview": "表： Transactions +---------------+---------+ Column Name Type +---------------+---------+ id int country varchar state enum amount int trans_date date +---------------+---------+ id 是这个表的主键。 该表包含有关传入事务的信息。 state 列类型为 [\"approved\", \"declined\"] 之一。 编写一个 sql 查询来查找每个月和每个国家/地区的事务数及其总金额、已批准的事务数及其总金额。 以 任意顺序 返回结果表。 查询结果格式如下所示。",
    "approachPreview": "每月交易 I 属于每月交易系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和每月交易系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 每月交易 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷每月交易系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.5%",
    "difficulty": "中等",
    "frontendId": "1205",
    "paidOnly": true,
    "seriesKeys": [
      "monthly-transactions"
    ],
    "seriesPrimaryKey": "monthly-transactions",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1205.Monthly%20Transactions%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Monthly Transactions II",
    "titleCn": "每月交易 II",
    "titleSlug": "monthly-transactions-ii",
    "url": "https://leetcode.cn/problems/monthly-transactions-ii/description/",
    "statementPreview": "Transactions 记录表 +----------------+---------+ Column Name Type +----------------+---------+ id int country varchar state enum amount int trans_date date +----------------+---------+ id 是这个表的主键。 该表包含有关传入事务的信息。 状态列是枚举类型，值为 [approved、declined] 其中之一的列。 Chargebacks 表 +----------------+---------+ Column Name Type +----------------+---------+ trans_id int trans_date date +----------------+---------+ 退单包含有关放置在事务表中的某些事务的传入退单的基本信息。 trans_id 是 transactions 表的 id 列的外键（reference 列）。 每项退单都对应于之前进行的交易，即使未经批准。 编写一个解决方案，找出每个国家/地区的每月交易信息：已批准交易的数量及其总金额、退单的数量及其总金额。",
    "approachPreview": "先把交易按月份和国家聚合，再分别统计 approved、chargeback 等状态的数量和金额；如果退款记录在独立表中，需要按交易 id 合并后再聚合。",
    "followUps": [
      {
        "question": "这题和每月交易系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 每月交易 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷每月交易系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.5%",
    "difficulty": "简单",
    "frontendId": "1141",
    "paidOnly": false,
    "seriesKeys": [
      "user-activity-for-the-past-30-days"
    ],
    "seriesPrimaryKey": "user-activity-for-the-past-30-days",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1141.User%20Activity%20for%20the%20Past%2030%20Days%20I/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "User Activity for the Past 30 Days I",
    "titleCn": "查询近30天活跃用户数",
    "titleSlug": "user-activity-for-the-past-30-days-i",
    "url": "https://leetcode.cn/problems/user-activity-for-the-past-30-days-i/description/",
    "statementPreview": "表： Activity +---------------+---------+ Column Name Type +---------------+---------+ user_id int session_id int activity_date date activity_type enum +---------------+---------+ 该表可能包含重复数据。 activity_type 列是 ENUM(category) 类型， 从 ('open_session'， 'end_session'， 'scroll_down'， 'send_message') 取值。 该表记录社交媒体网站的用户活动。 注意，每个会话只属于一个用户。 编写解决方案，统计截至 2019-07-27 （包含2019-07-27），近 30 天的每日活跃用户数（当天只要有一条活动记录，即为活跃用户）。 以 任意顺序 返回结果表。 结果示例如下。 注意：（ 'open_session'， 'end_session'， 'scroll_down'， 'send_message' ）中的任何活动将被视为用户在某一天活跃的有效活动。",
    "approachPreview": "查询近30天活跃用户数 属于近 30 天用户活动系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和近 30 天用户活动系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 查询近30天活跃用户数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷近 30 天用户活动系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "36.4%",
    "difficulty": "简单",
    "frontendId": "1142",
    "paidOnly": true,
    "seriesKeys": [
      "user-activity-for-the-past-30-days"
    ],
    "seriesPrimaryKey": "user-activity-for-the-past-30-days",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1142.User%20Activity%20for%20the%20Past%2030%20Days%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "User Activity for the Past 30 Days II",
    "titleCn": "过去30天的用户活动 II",
    "titleSlug": "user-activity-for-the-past-30-days-ii",
    "url": "https://leetcode.cn/problems/user-activity-for-the-past-30-days-ii/description/",
    "statementPreview": "Activity 表： +---------------+---------+ Column Name Type +---------------+---------+ user_id int session_id int activity_date date activity_type enum +---------------+---------+ 该表没有主键，它可能有重复的行。 activity_type 列是 ENUM 类型，可以取（“ open_session”，“ end_session”，“ scroll_down”，“ send_message”）四种活动类型之一。 该表显示了社交媒体网站的用户活动。 请注意，每个会话只属于一个用户。 编写解决方案，统计截至 2019-07-27 （含）的 30 天内每个用户的平均会话数， 四舍五入到小数点后两位。只统计那些会话期间用户至少进行一项活动的有效会话。 结果格式如下例所示。",
    "approachPreview": "限定日期窗口后，先按日期和用户去重会话，再按日期统计活跃用户数或会话数。关键是窗口端点要按题目给定日期包含/排除规则处理。",
    "followUps": [
      {
        "question": "这题和近 30 天用户活动系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 过去30天的用户活动 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷近 30 天用户活动系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "83.4%",
    "difficulty": "简单",
    "frontendId": "1683",
    "paidOnly": false,
    "seriesKeys": [
      "invalid-tweets"
    ],
    "seriesPrimaryKey": "invalid-tweets",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1683.Invalid%20Tweets/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Invalid Tweets",
    "titleCn": "无效的推文",
    "titleSlug": "invalid-tweets",
    "url": "https://leetcode.cn/problems/invalid-tweets/description/",
    "statementPreview": "表： Tweets +----------------+---------+ Column Name Type +----------------+---------+ tweet_id int content varchar +----------------+---------+ 在 SQL 中，tweet_id 是这个表的主键。 content 只包含字母数字字符，'!'，' '，不包含其它特殊字符。 这个表包含某社交媒体 App 中所有的推文。 查询所有无效推文的编号（ID）。当推文内容中的字符数 严格大于 15 时，该推文是无效的。 以 任意顺序 返回结果表。 查询结果格式如下所示：",
    "approachPreview": "CHAR_LENGTH() 函数返回字符串的长度，其中中文、数字、字母都是 1 字节。 LENGTH() 函数返回字符串的长度，其中 utf8 编码下，中文 3 字节，数字、字母 1 字节；gbk 编码下，中文 2 字节，数字、字母 1 字节。 对于本题，我们直接用 CHAR_LENGTH 函数获取字符串长度，筛选出长度大于 15 的推文 ID 即可。",
    "followUps": [
      {
        "question": "这题和无效推文系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 无效的推文 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷无效推文系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "85.0%",
    "difficulty": "简单",
    "frontendId": "3150",
    "paidOnly": true,
    "seriesKeys": [
      "invalid-tweets"
    ],
    "seriesPrimaryKey": "invalid-tweets",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3150.Invalid%20Tweets%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Invalid Tweets II",
    "titleCn": "无效的推文 II",
    "titleSlug": "invalid-tweets-ii",
    "url": "https://leetcode.cn/problems/invalid-tweets-ii/description/",
    "statementPreview": "表： Tweets +----------------+---------+ Column Name Type +----------------+---------+ tweet_id int content varchar +----------------+---------+ tweet_id 是这个表的主键（有不同值的列）。 这个表包含某社交媒体 App 中所有的推文。 编写一个解决方案来找到 无效的推文。如果一条推文满足下面 任一 条件会被认为无效： 长度超过 140 个字符。 有超过 3 次提及。 有超过 3 个标签。 以 tweet_id 升序 返回结果表。 查询结果格式如下所示：",
    "approachPreview": "我们可以使用 LENGTH() 函数计算字符串的长度，计算排除掉 @ 或 # 之后的长度，然后使用 OR 运算符连接这三个条件，筛选出对应的 tweet_id，并按照 tweet_id 升序排序。",
    "followUps": [
      {
        "question": "这题和无效推文系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 无效的推文 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷无效推文系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "39.1%",
    "difficulty": "中等",
    "frontendId": "176",
    "paidOnly": false,
    "seriesKeys": [
      "second-highest-salary"
    ],
    "seriesPrimaryKey": "second-highest-salary",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0176.Second%20Highest%20Salary/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Second Highest Salary",
    "titleCn": "第二高的薪水",
    "titleSlug": "second-highest-salary",
    "url": "https://leetcode.cn/problems/second-highest-salary/description/",
    "statementPreview": "Employee 表： +-------------+------+ Column Name Type +-------------+------+ id int salary int +-------------+------+ id 是这个表的主键。 表的每一行包含员工的工资信息。 查询并返回 Employee 表中第二高的 不同 薪水。如果不存在第二高的薪水，查询应该返回 null(Pandas 则返回 None)。 查询结果如下例所示。",
    "approachPreview": "第二高的薪水 属于第 N 高薪水系列中的一个变体。主要标签是 数据库。先确定输出表的一行代表什么业务粒度，再把筛选、聚合、连接和排序拆开写；聚合题优先明确 GROUP BY 字段，排名题优先确认并列和空结果如何处理。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和第 N 高薪水系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 第二高的薪水 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷第 N 高薪水系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "87.3%",
    "difficulty": "中等",
    "frontendId": "3338",
    "paidOnly": true,
    "seriesKeys": [
      "second-highest-salary"
    ],
    "seriesPrimaryKey": "second-highest-salary",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3338.Second%20Highest%20Salary%20II/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Second Highest Salary II",
    "titleCn": "第二高的薪水 II",
    "titleSlug": "second-highest-salary-ii",
    "url": "https://leetcode.cn/problems/second-highest-salary-ii/description/",
    "statementPreview": "表： employees +------------------+---------+ Column Name Type +------------------+---------+ emp_id int salary int dept varchar +------------------+---------+ emp_id 是这张表的唯一主键。 这张表的每一行包含雇员信息，包括他们的 ID，薪水和部门。 编写一个解决方案来找到每个部门中 薪水第二高 的雇员。如果 有多个雇员有第二高的薪水，在结果中包含所有获得该薪水的雇员。 返回结果表以 emp_id 升序 排序。 结果格式如下所示。",
    "approachPreview": "在每个部门内按 salary 去重后排名，取排名为 2 的工资；没有第二高工资的部门需要按题意返回 NULL 或不返回，取决于输出要求。",
    "followUps": [
      {
        "question": "这题和第 N 高薪水系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 第二高的薪水 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷第 N 高薪水系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "42.6%",
    "difficulty": "简单",
    "frontendId": "597",
    "paidOnly": true,
    "seriesKeys": [
      "friend-requests"
    ],
    "seriesPrimaryKey": "friend-requests",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0597.Friend%20Requests%20I%20Overall%20Acceptance%20Rate/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Friend Requests I: Overall Acceptance Rate",
    "titleCn": "好友申请 I：总体通过率",
    "titleSlug": "friend-requests-i-overall-acceptance-rate",
    "url": "https://leetcode.cn/problems/friend-requests-i-overall-acceptance-rate/description/",
    "statementPreview": "表： FriendRequest +----------------+---------+ Column Name Type +----------------+---------+ sender_id int send_to_id int request_date date +----------------+---------+ 该表可能包含重复项（换句话说，在SQL中，该表没有主键）。 该表包含发送请求的用户的 ID，接受请求的用户的 ID 以及请求的日期。 表： RequestAccepted +----------------+---------+ Column Name Type +----------------+---------+ requester_id int accepter_id int accept_date date +----------------+---------+ 该表可能包含重复项（换句话说，在SQL中，该表没有主键）。 该表包含发送请求的用户的 ID，接受请求的用户的 ID 以及请求通过的日期。 求出好友申请的通过率，用 2 位小数表示。通过率由接受好友申请的数目除以申请总数。",
    "approachPreview": "分别统计去重后的发送请求对和接受请求对，用接受数除以请求数。空请求时返回 0；去重粒度应是 sender/requester 与 receiver/accepter 的组合。",
    "followUps": [
      {
        "question": "这题和好友申请系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 好友申请 I：总体通过率 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷好友申请系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.7%",
    "difficulty": "中等",
    "frontendId": "602",
    "paidOnly": false,
    "seriesKeys": [
      "friend-requests"
    ],
    "seriesPrimaryKey": "friend-requests",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0602.Friend%20Requests%20II%20Who%20Has%20the%20Most%20Friends/README.md",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "title": "Friend Requests II: Who Has the Most Friends",
    "titleCn": "好友申请 II ：谁有最多的好友",
    "titleSlug": "friend-requests-ii-who-has-the-most-friends",
    "url": "https://leetcode.cn/problems/friend-requests-ii-who-has-the-most-friends/description/",
    "statementPreview": "RequestAccepted 表： +----------------+---------+ Column Name Type +----------------+---------+ requester_id int accepter_id int accept_date date +----------------+---------+ (requester_id, accepter_id) 是这张表的主键(具有唯一值的列的组合)。 这张表包含发送好友请求的人的 ID，接收好友请求的人的 ID，以及好友请求通过的日期。 编写解决方案，找出拥有最多的好友的人和他拥有的好友数目。 生成的测试用例保证拥有最多好友数目的只有 1 个人。 查询结果格式如下例所示。",
    "approachPreview": "我们可以将 requester_id 和 accepter_id 两列合并成一列，表示每个人的好友关系。然后对合并后的结果进行分组统计，找出拥有最多好友的人和好友数目。",
    "followUps": [
      {
        "question": "这题和好友申请系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 好友申请 II ：谁有最多的好友 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷好友申请系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.9%",
    "difficulty": "中等",
    "frontendId": "2",
    "paidOnly": false,
    "seriesKeys": [
      "add-two-numbers"
    ],
    "seriesPrimaryKey": "add-two-numbers",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0002.Add%20Two%20Numbers/README.md",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Add Two Numbers",
    "titleCn": "两数相加",
    "titleSlug": "add-two-numbers",
    "url": "https://leetcode.cn/problems/add-two-numbers/description/",
    "statementPreview": "给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。 请你将两个数相加，并以相同形式返回一个表示和的链表。 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。",
    "approachPreview": "我们同时遍历两个链表 l_1 和 l_2，并使用变量 carry 表示当前是否有进位。 每次遍历时，我们取出对应链表的当前位，计算它们与进位 carry 的和，然后更新进位的值，最后将当前位的值加入答案链表。如果两个链表都遍历完了，并且进位为 0 时，遍历结束。 最后我们返回答案链表的头节点即可。 时间复杂度 O(\\max(m, n))，其中 m 和 n 分别为两个链表的长度。我们需要遍历两个链表的全部位置，而处理每个位置只需要 O(1) 的时间。忽略答案的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和两数相加系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数相加 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷两数相加系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.0%",
    "difficulty": "中等",
    "frontendId": "445",
    "paidOnly": false,
    "seriesKeys": [
      "add-two-numbers"
    ],
    "seriesPrimaryKey": "add-two-numbers",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0445.Add%20Two%20Numbers%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Add Two Numbers II",
    "titleCn": "两数相加 II",
    "titleSlug": "add-two-numbers-ii",
    "url": "https://leetcode.cn/problems/add-two-numbers-ii/description/",
    "statementPreview": "给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。 你可以假设除了数字 0 之外，这两个数字都不会以零开头。",
    "approachPreview": "两数相加 II 属于两数相加系列中的一个变体。主要标签是 栈、链表、数学。先定义栈中元素保持的单调性或未匹配含义；每次弹栈时立刻结算当前元素贡献，最后再处理栈中剩余状态。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和两数相加系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 两数相加 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷两数相加系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.8%",
    "difficulty": "中等",
    "frontendId": "526",
    "paidOnly": false,
    "seriesKeys": [
      "beautiful-arrangement"
    ],
    "seriesPrimaryKey": "beautiful-arrangement",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0526.Beautiful%20Arrangement/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "bitmask",
        "name": "位掩码"
      }
    ],
    "title": "Beautiful Arrangement",
    "titleCn": "优美的排列",
    "titleSlug": "beautiful-arrangement",
    "url": "https://leetcode.cn/problems/beautiful-arrangement/description/",
    "statementPreview": "假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 perm （ 下标从 1 开始 ），只要满足下述条件 之一，该数组就是一个 优美的排列： perm[i] 能够被 i 整除 i 能够被 perm[i] 整除 给你一个整数 n，返回可以构造的 优美排列 的 数量。",
    "approachPreview": "用状态压缩 DP 或回溯。第 pos 个位置可以放未使用且满足 num % pos == 0 或 pos % num == 0 的数字；位掩码记录已用数字，记忆化避免重复搜索。",
    "followUps": [
      {
        "question": "这题和优美的排列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 优美的排列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷优美的排列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "66.7%",
    "difficulty": "中等",
    "frontendId": "667",
    "paidOnly": false,
    "seriesKeys": [
      "beautiful-arrangement"
    ],
    "seriesPrimaryKey": "beautiful-arrangement",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0667.Beautiful%20Arrangement%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Beautiful Arrangement II",
    "titleCn": "优美的排列 II",
    "titleSlug": "beautiful-arrangement-ii",
    "url": "https://leetcode.cn/problems/beautiful-arrangement-ii/description/",
    "statementPreview": "给你两个整数 n 和 k，请你构造一个答案列表 answer，该列表应当包含从 1 到 n 的 n 个不同正整数，并同时满足下述条件： 假设该列表是 answer = [a_1, a_2, a_3, ... , a_n]，那么列表 [ a_1 - a_2 , a_2 - a_3 , a_3 - a_4 , ... , a_n-1 - a_n ] 中应该有且仅有 k 个不同整数。 返回列表 answer。如果存在多种答案，只需返回其中 任意一种。",
    "approachPreview": "先按照 1, n, 2, n-1, 3,... 构造答案数据 ans 的前 k 个数，共产生 k-1 个不同的整数。然后根据 k 的奇偶性确定从哪个数开始构造下一个数。 时间复杂度 O(n)，忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和优美的排列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 优美的排列 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷优美的排列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.7%",
    "difficulty": "中等",
    "frontendId": "102",
    "paidOnly": false,
    "seriesKeys": [
      "binary-tree-level-order-traversal"
    ],
    "seriesPrimaryKey": "binary-tree-level-order-traversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0102.Binary%20Tree%20Level%20Order%20Traversal/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Binary Tree Level Order Traversal",
    "titleCn": "二叉树的层序遍历",
    "titleSlug": "binary-tree-level-order-traversal",
    "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal/description/",
    "statementPreview": "给你二叉树的根节点 root，返回其节点值的 层序遍历。 （即逐层地，从左到右访问所有节点）。",
    "approachPreview": "我们可以使用 BFS 的方法来解决这道题。首先将根节点入队，然后不断地进行以下操作，直到队列为空： 遍历当前队列中的所有节点，将它们的值存储到一个临时数组 t 中，然后将它们的孩子节点入队。 将临时数组 t 存储到答案数组中。 最后返回答案数组即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉树的节点个数。",
    "followUps": [
      {
        "question": "这题和二叉树的层序遍历系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的层序遍历 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的层序遍历系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "75.6%",
    "difficulty": "中等",
    "frontendId": "107",
    "paidOnly": false,
    "seriesKeys": [
      "binary-tree-level-order-traversal"
    ],
    "seriesPrimaryKey": "binary-tree-level-order-traversal",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0107.Binary%20Tree%20Level%20Order%20Traversal%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Binary Tree Level Order Traversal II",
    "titleCn": "二叉树的层序遍历 II",
    "titleSlug": "binary-tree-level-order-traversal-ii",
    "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/",
    "statementPreview": "给你二叉树的根节点 root，返回其节点值 自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）",
    "approachPreview": "我们可以使用 BFS 的方法来解决这道题。首先将根节点入队，然后不断地进行以下操作，直到队列为空： 遍历当前队列中的所有节点，将它们的值存储到一个临时数组 t 中，然后将它们的孩子节点入队。 将临时数组 t 存储到答案数组中。 最后将答案数组反转后返回即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉树的节点个数。",
    "followUps": [
      {
        "question": "这题和二叉树的层序遍历系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的层序遍历 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的层序遍历系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.1%",
    "difficulty": "中等",
    "frontendId": "319",
    "paidOnly": false,
    "seriesKeys": [
      "bulb-switcher"
    ],
    "seriesPrimaryKey": "bulb-switcher",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0319.Bulb%20Switcher/README.md",
    "tags": [
      {
        "slug": "brainteaser",
        "name": "脑筋急转弯"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Bulb Switcher",
    "titleCn": "灯泡开关",
    "titleSlug": "bulb-switcher",
    "url": "https://leetcode.cn/problems/bulb-switcher/description/",
    "statementPreview": "初始时有 n 个灯泡处于关闭状态。第一轮，你将会打开所有灯泡。接下来的第二轮，你将会每两个灯泡关闭第二个。 第三轮，你每三个灯泡就切换第三个灯泡的开关（即，打开变关闭，关闭变打开）。第 i 轮，你每 i 个灯泡就切换第 i 个灯泡的开关。直到第 n 轮，你只需要切换最后一个灯泡的开关。 找出并返回 n 轮后有多少个亮着的灯泡。",
    "approachPreview": "我们不妨将 n 个灯泡编号为 1, 2, 3, \\cdots, n，那么对于第 i 个灯泡，它会在第 d 轮被操作，当且仅当 d 是 i 的因子。 对于一个数 i，它的因子个数是有限的，且因子个数为奇数时，最后的状态是开启的，否则是关闭的。 因此，我们只需要找到 1 到 n 中因子个数为奇数的数的个数即可。 对于一个数 i，如果它有因子 d，那么它一定有因子 i/d，因此因子个数为奇数的数一定是平方数。 举个例子，数字 12 的因子有 1, 2, 3, 4, 6, 12，因子个数为 6，是偶数；而对于数字 16 这个平方数，因子有 1, 2, 4, 8, 16，因子个数为 5，是奇数。 因此，我们只需要找到 1 到 n 中有多少个平方数即可，即 \\lfloor \\sqrt{n} \\rfloor。 时间复杂度 O(1)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和灯泡开关系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 灯泡开关 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷灯泡开关系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.3%",
    "difficulty": "中等",
    "frontendId": "672",
    "paidOnly": false,
    "seriesKeys": [
      "bulb-switcher"
    ],
    "seriesPrimaryKey": "bulb-switcher",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0672.Bulb%20Switcher%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Bulb Switcher II",
    "titleCn": "灯泡开关 Ⅱ",
    "titleSlug": "bulb-switcher-ii",
    "url": "https://leetcode.cn/problems/bulb-switcher-ii/description/",
    "statementPreview": "房间中有 n 只已经打开的灯泡，编号从 1 到 n。墙上挂着 4 个开关。 这 4 个开关各自都具有不同的功能，其中： 开关 1： 反转当前所有灯的状态（即开变为关，关变为开） 开关 2： 反转编号为偶数的灯的状态（即 0, 2, 4, ... ） 开关 3： 反转编号为奇数的灯的状态（即 1, 3, ... ） 开关 4： 反转编号为 j = 3k + 1 的灯的状态，其中 k = 0, 1, 2, ... （即 1, 4, 7, 10, ... ） 你必须 恰好 按压开关 presses 次。每次按压，你都需要从 4 个开关中选出一个来执行按压操作。 给你两个整数 n 和 presses，执行完所有按压之后，返回 不同可能状态 的数量。",
    "approachPreview": "观察灯泡开关随按钮操作的变化规律，我们可以发现，位置 i 与 i+6 的灯泡，开关状态始终保持一致，因此，我们只需要考虑最多前 n=6 个灯泡的开关状态。 另外，对于每个按钮，若操作偶数次，相当于没执行操作；若操作奇数次，相当于操作了 1 次。同时，不同按钮操作的先后顺序，也不影响结果。 题目有 4 个按钮，每个按钮有“操作偶数次”和“操作奇数次”两种状态，因此总共有 2^4 种按钮状态。 二进制枚举按钮的状态 mask，若当前状态满足题目 presses 的限制，我们可以通过位运算，模拟操作对应按钮，最终得到灯泡的状态 t，去重后的 t 的数量就是答案。 时空复杂度均为常数级别。",
    "followUps": [
      {
        "question": "这题和灯泡开关系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 灯泡开关 Ⅱ 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷灯泡开关系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.1%",
    "difficulty": "中等",
    "frontendId": "853",
    "paidOnly": false,
    "seriesKeys": [
      "car-fleet"
    ],
    "seriesPrimaryKey": "car-fleet",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0853.Car%20Fleet/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Car Fleet",
    "titleCn": "车队",
    "titleSlug": "car-fleet",
    "url": "https://leetcode.cn/problems/car-fleet/description/",
    "statementPreview": "在一条单行道上，有 n 辆车开往同一目的地。目的地是几英里以外的 target。 给定两个整数数组 position 和 speed，长度都是 n，其中 position[i] 是第 i 辆车的位置， speed[i] 是第 i 辆车的速度(单位是英里/小时)。 一辆车永远不会超过前面的另一辆车，但它可以追上去，并以较慢车的速度在另一辆车旁边行驶。 车队 是指并排行驶的一辆或几辆汽车。车队的速度是车队中 最慢 的车的速度。 即便一辆车在 target 才赶上了一个车队，它们仍然会被视作是同一个车队。 返回到达目的地的车队数量。",
    "approachPreview": "我们将车辆按照位置降序排序，这样我们只需要比较相邻两辆车的到达时间即可。 我们初始化一个变量 pre 表示上一辆车到达终点的时间，如果当前车辆到达终点的时间大于 pre，说明当前车辆无法追上前面的车辆，因此需要另外开一个车队，否则当前车辆会与前面的车辆组成一个车队。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是车辆的数量。",
    "followUps": [
      {
        "question": "这题和车队系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 车队 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷车队系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.6%",
    "difficulty": "困难",
    "frontendId": "1776",
    "paidOnly": false,
    "seriesKeys": [
      "car-fleet"
    ],
    "seriesPrimaryKey": "car-fleet",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1776.Car%20Fleet%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Car Fleet II",
    "titleCn": "车队 II",
    "titleSlug": "car-fleet-ii",
    "url": "https://leetcode.cn/problems/car-fleet-ii/description/",
    "statementPreview": "在一条单车道上有 n 辆车，它们朝着同样的方向行驶。给你一个长度为 n 的数组 cars，其中 cars[i] = [position_i, speed_i]，它表示： position_i 是第 i 辆车和道路起点之间的距离（单位：米）。题目保证 position_i < position_i+1 _。 speed_i 是第 i 辆车的初始速度（单位：米/秒）。 简单起见，所有车子可以视为在数轴上移动的点。当两辆车占据同一个位置时，我们称它们相遇了。一旦两辆车相遇，它们会合并成一个车队，这个车队里的车有着同样的位置和相同的速度，速度为这个车队里 最慢 一辆车的速度。 请你返回一个数组 answer，其中 answer[i] 是第 i 辆车与下一辆车相遇的时间（单位：秒），如果这辆车不会与下一辆车相遇，则 answer[i] 为 -1。答案精度误差需在 10^-5 以内。",
    "approachPreview": "由于每一辆车最终追上其右边第一辆车的时间与其左边的车没有关系，因此，我们可以从右往左遍历，计算每辆车与其右边第一辆车相遇的时间。 具体地，我们维护一个栈，栈中存放的是车辆的编号，栈顶元素表示当前最慢的车辆编号，栈底元素表示当前最快的车辆编号。 当我们遍历到第 i 辆车时，如果第 i 辆车的速度大于栈顶元素对应的车辆 j 的速度，此时我们计算两车相遇的时间，记为 t。如果车辆 j 与右边车辆不会相遇，或者 t 小于等于 j 与右辆车相遇的时间，说明车辆 i 可以在 t 时间追上车辆 j，更新答案。否则，说明车辆 i 不会与车辆 j 相遇，我们将车辆 j 出栈，继续判断车辆 i 与栈顶元素对应的车辆相遇的时间。如果栈为空，说明车辆 i 不会与任何车辆相遇，更新答案为 -1。最后，将车辆 i 入栈。 遍历完所有车辆后，即可得到答案。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为车辆数量。",
    "followUps": [
      {
        "question": "这题和车队系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 车队 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷车队系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.2%",
    "difficulty": "简单",
    "frontendId": "2839",
    "paidOnly": false,
    "seriesKeys": [
      "check-if-strings-can-be-made-equal-with-operations"
    ],
    "seriesPrimaryKey": "check-if-strings-can-be-made-equal-with-operations",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2800-2899/2839.Check%20if%20Strings%20Can%20be%20Made%20Equal%20With%20Operations%20I/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Check if Strings Can be Made Equal With Operations I",
    "titleCn": "判断通过操作能否让字符串相等 I",
    "titleSlug": "check-if-strings-can-be-made-equal-with-operations-i",
    "url": "https://leetcode.cn/problems/check-if-strings-can-be-made-equal-with-operations-i/description/",
    "statementPreview": "给你两个字符串 s1 和 s2，两个字符串的长度都为 4，且只包含 小写 英文字母。 你可以对两个字符串中的 任意一个 执行以下操作 任意 次： 选择两个下标 i 和 j 且满足 j - i = 2，然后 交换 这个字符串中两个下标对应的字符。 如果你可以让字符串 s1 和 s2 相等，那么返回 true，否则返回 false。",
    "approachPreview": "我们观察题目中的操作，可以发现，如果字符串的两个下标 i 和 j 的奇偶性相同，那么它们可以通过交换改变顺序。 因此，我们可以统计两个字符串中奇数下标的字符的出现次数，以及偶数下标的字符的出现次数，如果两个字符串的统计结果相同，那么我们就可以通过操作使得两个字符串相等。 时间复杂度 O(n + \\Sigma )，空间复杂度 O( \\Sigma )。其中 n 是字符串的长度，而 \\Sigma 是字符集。 相似题目：",
    "followUps": [
      {
        "question": "这题和判断通过操作能否让字符串相等 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 判断通过操作能否让字符串相等 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷判断通过操作能否让字符串相等 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "74.4%",
    "difficulty": "中等",
    "frontendId": "2840",
    "paidOnly": false,
    "seriesKeys": [
      "check-if-strings-can-be-made-equal-with-operations"
    ],
    "seriesPrimaryKey": "check-if-strings-can-be-made-equal-with-operations",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2800-2899/2840.Check%20if%20Strings%20Can%20be%20Made%20Equal%20With%20Operations%20II/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Check if Strings Can be Made Equal With Operations II",
    "titleCn": "判断通过操作能否让字符串相等 II",
    "titleSlug": "check-if-strings-can-be-made-equal-with-operations-ii",
    "url": "https://leetcode.cn/problems/check-if-strings-can-be-made-equal-with-operations-ii/description/",
    "statementPreview": "给你两个字符串 s1 和 s2，两个字符串长度都为 n，且只包含 小写 英文字母。 你可以对两个字符串中的 任意一个 执行以下操作 任意 次： 选择两个下标 i 和 j，满足 i < j 且 j - i 是 偶数，然后 交换 这个字符串中两个下标对应的字符。 如果你可以让字符串 s1 和 s2 相等，那么返回 true，否则返回 false。",
    "approachPreview": "我们观察题目中的操作，可以发现，如果字符串的两个下标 i 和 j 的奇偶性相同，那么它们可以通过交换改变顺序。 因此，我们可以统计两个字符串中奇数下标的字符的出现次数，以及偶数下标的字符的出现次数，如果两个字符串的统计结果相同，那么我们就可以通过操作使得两个字符串相等。 时间复杂度 O(n + \\Sigma )，空间复杂度 O( \\Sigma )。其中 n 是字符串的长度，而 \\Sigma 是字符集。 相似题目：",
    "followUps": [
      {
        "question": "这题和判断通过操作能否让字符串相等 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 判断通过操作能否让字符串相等 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷判断通过操作能否让字符串相等 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.7%",
    "difficulty": "简单",
    "frontendId": "70",
    "paidOnly": false,
    "seriesKeys": [
      "climbing-stairs"
    ],
    "seriesPrimaryKey": "climbing-stairs",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0070.Climbing%20Stairs/README.md",
    "tags": [
      {
        "slug": "memoization",
        "name": "记忆化"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Climbing Stairs",
    "titleCn": "爬楼梯",
    "titleSlug": "climbing-stairs",
    "url": "https://leetcode.cn/problems/climbing-stairs/description/",
    "statementPreview": "假设你正在爬楼梯。需要 n 阶你才能到达楼顶。 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？",
    "approachPreview": "我们定义 f[i] 表示爬到第 i 阶楼梯的方法数，那么 f[i] 可以由 f[i - 1] 和 f[i - 2] 转移而来，即： f[i] = f[i - 1] + f[i - 2] 初始条件为 f[0] = 1，f[1] = 1，即爬到第 0 阶楼梯的方法数为 1，爬到第 1 阶楼梯的方法数也为 1。 答案即为 f[n]。 由于 f[i] 只与 f[i - 1] 和 f[i - 2] 有关，因此我们可以只用两个变量 a 和 b 来维护当前的方法数，空间复杂度降低为 O(1)。 时间复杂度 O(n)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和爬楼梯系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 爬楼梯 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷爬楼梯系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "64.0%",
    "difficulty": "中等",
    "frontendId": "3693",
    "paidOnly": false,
    "seriesKeys": [
      "climbing-stairs"
    ],
    "seriesPrimaryKey": "climbing-stairs",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3693.Climbing%20Stairs%20II/README.md",
    "tags": [],
    "title": "Climbing Stairs II",
    "titleCn": "爬楼梯 II",
    "titleSlug": "climbing-stairs-ii",
    "url": "https://leetcode.cn/problems/climbing-stairs-ii/description/",
    "statementPreview": "你正在爬一个有 n + 1 级台阶的楼梯，台阶编号从 0 到 n。 你还得到了一个长度为 n 的 下标从 1 开始 的整数数组 costs，其中 costs[i] 是第 i 级台阶的成本。 从第 i 级台阶，你 只能 跳到第 i + 1、 i + 2 或 i + 3 级台阶。从第 i 级台阶跳到第 j 级台阶的成本定义为： costs[j] + (j - i)^2 你从第 0 级台阶开始，初始 cost = 0。 返回到达第 n 级台阶所需的 最小 总成本。 示例 1: 输入： n = 4, costs = [1,2,3,4] 输出： 13 解释： 一个最优路径是 0 → 1 → 2 → 4 跳跃 成本计算 成本 0 → 1 costs[1] + (1 - 0)^2 = 1 + 1 2 1 → 2 costs[2] + (2 - 1)^2 = 2 + 1 3 2 → 4 costs[4] + (4 - 2)^2 = 4 + 4 8 因此，最小总成本为 2 + 3 + 8 = 13 示例 2: 输入： n = 4, costs = [5,1,6,2] 输出： 11 解释： 一个最优路径是 0 → 2 → 4 跳跃 成本计算 成本 0 → 2 costs[2] + (2 - 0)^2 = 1 + 4 5 2。",
    "approachPreview": "我们定义 f[i] 表示到达第 i 级台阶所需的最小总成本，初始时 f[0] = 0，其余 f[i] = +\\infty。 对于每一级台阶 i，我们可以从第 i-1 级、第 i-2 级或第 i-3 级台阶跳跃过来，因此我们有以下状态转移方程： f[i] = \\min_{j=i-3}^{i-1} (f[j] + \\textit{costs}[i - 1] + (i - j)^2) 其中 \\textit{costs}[i] 是第 i 级台阶的成本，(i - j)^2 是从第 j 级台阶跳到第 i 级台阶的跳跃成本。注意，我们需要确保 j 不小于 0。 最终答案为 f[n]。 时间复杂度 O(n)，空间复杂度 O(n)，其中 n 是台阶的数量。",
    "followUps": [
      {
        "question": "这题和爬楼梯系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 爬楼梯 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷爬楼梯系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "74.1%",
    "difficulty": "中等",
    "frontendId": "39",
    "paidOnly": false,
    "seriesKeys": [
      "combination-sum"
    ],
    "seriesPrimaryKey": "combination-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0039.Combination%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Combination Sum",
    "titleCn": "组合总和",
    "titleSlug": "combination-sum",
    "url": "https://leetcode.cn/problems/combination-sum/description/",
    "statementPreview": "给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合，并以列表形式返回。你可以按 任意顺序 返回这些组合。 candidates 中的 同一个 数字可以 无限制重复被选取。如果至少一个数字的被选数量不同，则两种组合是不同的。 对于给定的输入，保证和为 target 的不同组合数少于 150 个。",
    "approachPreview": "我们可以先对数组进行排序，方便剪枝。 接下来，我们设计一个函数 dfs(i, s)，表示从下标 i 开始搜索，且剩余目标值为 s，其中 i 和 s 都是非负整数，当前搜索路径为 t，答案为 ans。 在函数 dfs(i, s) 中，我们先判断 s 是否为 0，如果是，则将当前搜索路径 t 加入答案 ans 中，然后返回。如果 s \\lt candidates[i]，说明当前下标及后面的下标的元素都大于剩余目标值 s，路径不合法，直接返回。否则，我们从下标 i 开始搜索，搜索的下标范围是 j \\in [i, n)，其中 n 为数组 candidates 的长度。在搜索的过程中，我们将当前下标的元素加入搜索路径 t，递归调用函数 dfs(j, s - candidates[j])，递归结束后，将当前下标的元素从搜索路径 t 中移除。 在主函数中，我们只要调用函数 dfs(0, target)，即可得到答案。 时间复杂度 O(2^n \\times n)，空间复杂度 O(n)。其中 n 为数组 candidates 的长度。由于剪枝，实际的时间复杂度要远小于 O(2^n \\times n)。 相似题目：",
    "followUps": [
      {
        "question": "这题和组合总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 组合总和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷组合总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.1%",
    "difficulty": "中等",
    "frontendId": "40",
    "paidOnly": false,
    "seriesKeys": [
      "combination-sum"
    ],
    "seriesPrimaryKey": "combination-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0040.Combination%20Sum%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Combination Sum II",
    "titleCn": "组合总和 II",
    "titleSlug": "combination-sum-ii",
    "url": "https://leetcode.cn/problems/combination-sum-ii/description/",
    "statementPreview": "给定一个候选人编号的集合 candidates 和一个目标数 target，找出 candidates 中所有可以使数字和为 target 的组合。 candidates 中的每个数字在每个组合中只能使用 一次。 注意： 解集不能包含重复的组合。",
    "approachPreview": "我们可以先对数组进行排序，方便剪枝以及跳过重复的数字。 接下来，我们设计一个函数 dfs(i, s)，表示从下标 i 开始搜索，且剩余目标值为 s，其中 i 和 s 都是非负整数，当前搜索路径为 t，答案为 ans。 在函数 dfs(i, s) 中，我们先判断 s 是否为 0，如果是，则将当前搜索路径 t 加入答案 ans 中，然后返回。如果 i \\geq n，或者 s \\lt candidates[i]，说明当前路径不合法，直接返回。否则，我们从下标 i 开始搜索，搜索的下标范围是 j \\in [i, n)，其中 n 为数组 candidates 的长度。在搜索的过程中，如果 j \\gt i 并且 candidates[j] = candidates[j - 1]，说明当前数字与上一个数字相同，我们可以跳过当前数字，因为上一个数字已经搜索过了。否则，我们将当前数字加入搜索路径 t 中，然后递归调用函数 dfs(j + 1, s - candidates[j])，然后将当前数字从搜索路径 t 中移除。 在主函数中，我们只要调用函数 dfs(0, target)，即可得到答案。 时间复杂度 O(2^n \\times n)，空间复杂度 O(n)。其中 n 为数组 candidates 的长度。由于剪枝，实际的时间复杂度要远小于 O(2^n \\times n)。 相似题目：",
    "followUps": [
      {
        "question": "这题和组合总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 组合总和 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷组合总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.3%",
    "difficulty": "中等",
    "frontendId": "216",
    "paidOnly": false,
    "seriesKeys": [
      "combination-sum"
    ],
    "seriesPrimaryKey": "combination-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0216.Combination%20Sum%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Combination Sum III",
    "titleCn": "组合总和 III",
    "titleSlug": "combination-sum-iii",
    "url": "https://leetcode.cn/problems/combination-sum-iii/description/",
    "statementPreview": "找出所有相加之和为 n 的 k 个数的组合，且满足下列条件： 只使用数字1到9 每个数字 最多使用一次 返回 所有可能的有效组合的列表。该列表不能包含相同的组合两次，组合可以以任何顺序返回。",
    "approachPreview": "我们设计一个函数 dfs(i, s)，表示当前枚举到数字 i，还剩下和为 s 的数字需要枚举，当前搜索路径为 t，答案为 ans。 函数 dfs(i, s) 的执行逻辑如下： 方式一： 如果 s = 0，且当前搜索路径 t 的长度为 k，说明找到了一组答案，将 t 加入 ans 中，然后返回。 如果 i \\gt 9 或者 i \\gt s 或者当前搜索路径 t 的长度大于 k，说明当前搜索路径不可能是答案，直接返回。 否则，我们可以选择将数字 i 加入搜索路径 t 中，然后继续搜索，即执行 dfs(i + 1, s - i)，搜索完成后，将 i 从搜索路径 t 中移除；我们也可以选择不将数字 i 加入搜索路径 t 中，直接执行 dfs(i + 1, s)。",
    "followUps": [
      {
        "question": "这题和组合总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 组合总和 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷组合总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "87.0%",
    "difficulty": "简单",
    "frontendId": "3314",
    "paidOnly": false,
    "seriesKeys": [
      "construct-the-minimum-bitwise-array"
    ],
    "seriesPrimaryKey": "construct-the-minimum-bitwise-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3314.Construct%20the%20Minimum%20Bitwise%20Array%20I/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Construct the Minimum Bitwise Array I",
    "titleCn": "构造最小位运算数组 I",
    "titleSlug": "construct-the-minimum-bitwise-array-i",
    "url": "https://leetcode.cn/problems/construct-the-minimum-bitwise-array-i/description/",
    "statementPreview": "给你一个长度为 n 的 质数 数组 nums。你的任务是返回一个长度为 n 的数组 ans，对于每个下标 i，以下 条件 均成立： ans[i] OR (ans[i] + 1) == nums[i] 除此以外，你需要 最小化 结果数组里每一个 ans[i]。 如果没法找到符合 条件 的 ans[i]，那么 ans[i] = -1。 质数 指的是一个大于 1 的自然数，且它只有 1 和自己两个因数。",
    "approachPreview": "对于一个整数 a，满足 a \\lor (a + 1) 的结果一定为奇数，因此，如果 \\text{nums[i]} 是偶数，那么 \\text{ans}[i] 一定不存在，直接返回 -1。本题中 \\textit{nums}[i] 是质数，判断是否是偶数，只需要判断是否等于 2 即可。 如果 \\text{nums[i]} 是奇数，假设 \\text{nums[i]} = \\text{0b1101101}，由于 a \\lor (a + 1) = \\text{nums[i]}，等价于将 a 的最后一个为 0 的二进制位变为 1。那么求解 a，就等价于将 \\text{nums[i]} 的最后一个 0 的下一位 1 变为 0。我们只需要从低位（下标为 1）开始遍历，找到第一个为 0 的二进制位，如果是第 i 位，那么我们就将 \\text{nums[i]} 的第 i - 1 位变为 1，即 \\text{ans}[i] = \\text{nums[i]} \\oplus 2^{i - 1}。 遍历所有的 \\text{nums[i]}，即可得到答案。 时间复杂度 O(n \\times \\log M)，其中 n 和 M 分别是数组 \\text{nums} 的长度和数组中的最大值。忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和构造最小位运算数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 构造最小位运算数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷构造最小位运算数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.3%",
    "difficulty": "中等",
    "frontendId": "3315",
    "paidOnly": false,
    "seriesKeys": [
      "construct-the-minimum-bitwise-array"
    ],
    "seriesPrimaryKey": "construct-the-minimum-bitwise-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3315.Construct%20the%20Minimum%20Bitwise%20Array%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Construct the Minimum Bitwise Array II",
    "titleCn": "构造最小位运算数组 II",
    "titleSlug": "construct-the-minimum-bitwise-array-ii",
    "url": "https://leetcode.cn/problems/construct-the-minimum-bitwise-array-ii/description/",
    "statementPreview": "给你一个长度为 n 的 质数 数组 nums。你的任务是返回一个长度为 n 的数组 ans，对于每个下标 i，以下 条件 均成立： ans[i] OR (ans[i] + 1) == nums[i] 除此以外，你需要 最小化 结果数组里每一个 ans[i]。 如果没法找到符合 条件 的 ans[i]，那么 ans[i] = -1。 质数 指的是一个大于 1 的自然数，且它只有 1 和自己两个因数。",
    "approachPreview": "对于一个整数 a，满足 a \\lor (a + 1) 的结果一定为奇数，因此，如果 \\text{nums[i]} 是偶数，那么 \\text{ans}[i] 一定不存在，直接返回 -1。本题中 \\textit{nums}[i] 是质数，判断是否是偶数，只需要判断是否等于 2 即可。 如果 \\text{nums[i]} 是奇数，假设 \\text{nums[i]} = \\text{0b1101101}，由于 a \\lor (a + 1) = \\text{nums[i]}，等价于将 a 的最后一个为 0 的二进制位变为 1。那么求解 a，就等价于将 \\text{nums[i]} 的最后一个 0 的下一位 1 变为 0。我们只需要从低位（下标为 1）开始遍历，找到第一个为 0 的二进制位，如果是第 i 位，那么我们就将 \\text{nums[i]} 的第 i - 1 位变为 1，即 \\text{ans}[i] = \\text{nums[i]} \\oplus 2^{i - 1}。 遍历所有的 \\text{nums[i]}，即可得到答案。 时间复杂度 O(n \\times \\log M)，其中 n 和 M 分别是数组 \\text{nums} 的长度和数组中的最大值。忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和构造最小位运算数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 构造最小位运算数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷构造最小位运算数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "43.9%",
    "difficulty": "中等",
    "frontendId": "3623",
    "paidOnly": false,
    "seriesKeys": [
      "count-number-of-trapezoids"
    ],
    "seriesPrimaryKey": "count-number-of-trapezoids",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3623.Count%20Number%20of%20Trapezoids%20I/README.md",
    "tags": [
      {
        "slug": "geometry",
        "name": "几何"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Count Number of Trapezoids I",
    "titleCn": "统计梯形的数目 I",
    "titleSlug": "count-number-of-trapezoids-i",
    "url": "https://leetcode.cn/problems/count-number-of-trapezoids-i/description/",
    "statementPreview": "给你一个二维整数数组 points，其中 points[i] = [x_i, y_i] 表示第 i 个点在笛卡尔平面上的坐标。 水平梯形 是一种凸四边形，具有 至少一对 水平边（即平行于 x 轴的边）。两条直线平行当且仅当它们的斜率相同。 返回可以从 points 中任意选择四个不同点组成的 水平梯形 数量。 由于答案可能非常大，请返回结果对 10^9 + 7 取余数后的值。",
    "approachPreview": "根据题目描述，水平边满足 y 坐标相同，因此我们可以根据 y 坐标将点进行分组，统计每个 y 坐标对应的点的数量。 我们用一个哈希表 \\textit{cnt} 来存储每个 y 坐标对应的点的数量。对于每个 y 坐标 y_i，假设对应的点的数量为 v，那么从这些点中选择两点作为水平边的方式有 \\binom{v}{2} = \\frac{v(v-1)}{2} 种，记为 t。 我们用一个变量 s 来记录之前所有 y 坐标对应的水平边的数量之和。那么，我们可以将当前 y 坐标对应的水平边的数量 t 与之前所有 y 坐标对应的水平边的数量之和 s 相乘，得到以当前 y 坐标为一对水平边的梯形的数量，并将其累加到答案中。最后，我们将当前 y 坐标对应的水平边的数量 t 累加到 s 中，以便后续计算。 注意，由于答案可能非常大，我们需要对 10^9 + 7 取余数。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是点的数量。",
    "followUps": [
      {
        "question": "这题和统计梯形的数目 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计梯形的数目 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷统计梯形的数目 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.7%",
    "difficulty": "困难",
    "frontendId": "3625",
    "paidOnly": false,
    "seriesKeys": [
      "count-number-of-trapezoids"
    ],
    "seriesPrimaryKey": "count-number-of-trapezoids",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3625.Count%20Number%20of%20Trapezoids%20II/README.md",
    "tags": [
      {
        "slug": "geometry",
        "name": "几何"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Count Number of Trapezoids II",
    "titleCn": "统计梯形的数目 II",
    "titleSlug": "count-number-of-trapezoids-ii",
    "url": "https://leetcode.cn/problems/count-number-of-trapezoids-ii/description/",
    "statementPreview": "给你一个二维整数数组 points，其中 points[i] = [x_i, y_i] 表示第 i 个点在笛卡尔平面上的坐标。 返回可以从 points 中任意选择四个不同点组成的梯形的数量。 梯形 是一种凸四边形，具有 至少一对 平行边。两条直线平行当且仅当它们的斜率相同。",
    "approachPreview": "我们可以把所有点两两组合，计算出每一对点所对应的直线的斜率和截距，并使用哈希表进行记录，计算斜率相同且截距不同的直线两两组合得到的数量之和。注意，对于平行四边形，我们在上述计算中会被重复计算两次，因此我们需要将其减去。 平行四边形的对角线中点重合，因此我们同样把所有点两两组合，计算出每一对点的中点坐标和斜率，并使用哈希表进行记录，计算斜率相同且中点坐标相同的点对两两组合得到的数量之和。 具体地，我们使用两个哈希表 \\textit{cnt1} 和 \\textit{cnt2} 分别记录以下信息： 其中 \\textit{cnt1} 记录斜率 k 和截距 b 出现的次数，键为斜率 k，值为另一个哈希表，记录截距 b 出现的次数； 其中 \\textit{cnt2} 记录点对的中点坐标和斜率 k 出现的次数，键为点对的中点坐标 p，值为另一个哈希表，记录斜率 k 出现的次数。 对于点对 (x_1, y_1) 和 (x_2, y_2)，我们记 dx = x_2 - x_1，并且 dy = y_2 - y_1。如果 dx = 0，则说明两点在同一条垂直线上，我们记斜率 k = +\\infty，截距 b = x_1；否则斜率 k = \\frac{dy}{dx}，截距 b = \\frac{y_1 \\cdot dx - x_1 \\cdot dy}{dx}。",
    "followUps": [
      {
        "question": "这题和统计梯形的数目 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 统计梯形的数目 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷统计梯形的数目 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "35.0%",
    "difficulty": "中等",
    "frontendId": "91",
    "paidOnly": false,
    "seriesKeys": [
      "decode-ways"
    ],
    "seriesPrimaryKey": "decode-ways",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0091.Decode%20Ways/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Decode Ways",
    "titleCn": "解码方法",
    "titleSlug": "decode-ways",
    "url": "https://leetcode.cn/problems/decode-ways/description/",
    "statementPreview": "一条包含字母 A-Z 的消息通过以下映射进行了 编码： \"1\" -> 'A' \"2\" -> 'B' ... \"25\" -> 'Y' \"26\" -> 'Z' 然而，在 解码 已编码的消息时，你意识到有许多不同的方式来解码，因为有些编码被包含在其它编码当中（ \"2\" 和 \"5\" 与 \"25\" ）。 例如， \"11106\" 可以映射为： \"AAJF\"，将消息分组为 (1, 1, 10, 6) \"KJF\"，将消息分组为 (11, 10, 6) 消息不能分组为 (1, 11, 06)，因为 \"06\" 不是一个合法编码（只有 \"6\" 是合法的）。 注意，可能存在无法解码的字符串。 给你一个只含数字的 非空 字符串 s，请计算并返回 解码 方法的 总数。如果没有合法的方式解码整个字符串，返回 0。 题目数据保证答案肯定是一个 32 位 的整数。",
    "approachPreview": "我们定义 f[i] 表示字符串的前 i 个字符的解码方法数，初始时 f[0]=1，其余 f[i]=0。 考虑 f[i] 如何进行状态转移。 如果第 i 个字符（即 s[i-1]）单独形成编码，那么它对应一种解码方式，即 f[i]=f[i-1]。前提是 s[i-1] \\neq 0。 如果第 i-1 个字符和第 i 个字符组成的字符串在 [1,26] 范围内，那么它们可以作为一个整体，对应一种解码方式，即 f[i] = f[i] + f[i-2]。前提是 s[i-2] \\neq 0，且 s[i-2]s[i-1] 在 [1,26] 范围内。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是字符串的长度。",
    "followUps": [
      {
        "question": "这题和解码方法系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 解码方法 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷解码方法系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "36.2%",
    "difficulty": "困难",
    "frontendId": "639",
    "paidOnly": false,
    "seriesKeys": [
      "decode-ways"
    ],
    "seriesPrimaryKey": "decode-ways",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0639.Decode%20Ways%20II/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Decode Ways II",
    "titleCn": "解码方法 II",
    "titleSlug": "decode-ways-ii",
    "url": "https://leetcode.cn/problems/decode-ways-ii/description/",
    "statementPreview": "一条包含字母 A-Z 的消息通过以下的方式进行了 编码： 'A' -> \"1\" 'B' -> \"2\" ... 'Z' -> \"26\" 要 解码 一条已编码的消息，所有的数字都必须分组，然后按原来的编码方案反向映射回字母（可能存在多种方式）。例如， \"11106\" 可以映射为： \"AAJF\" 对应分组 (1 1 10 6) \"KJF\" 对应分组 (11 10 6) 注意，像 (1 11 06) 这样的分组是无效的，因为 \"06\" 不可以映射为 'F'，因为 \"6\" 与 \"06\" 不同。 除了 上面描述的数字字母映射方案，编码消息中可能包含 '*' 字符，可以表示从 '1' 到 '9' 的任一数字（不包括 '0' ）。例如，编码字符串 \"1*\" 可以表示 \"11\"、 \"12\"、 \"13\"、 \"14\"、 \"15\"、 \"16\"、 \"17\"、 \"18\" 或 \"19\" 中的任意一条消息。对 \"1*\" 进行解码，相当于解码该字符串可以表示的任何编码消息。 给你一个字符串 s，由数字和 '*' 字符组成，返回 解码 该字符串的方法 数目。 由于答案数目可能非常大，返回 10^9 + 7 的 模。",
    "approachPreview": "动态规划处理前缀解码数。每一位既可能单独解码，也可能和前一位组成两位数；字符 '*' 要展开成 1-9 或合法两位组合的数量，所有转移都取模。",
    "followUps": [
      {
        "question": "这题和解码方法系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 解码方法 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷解码方法系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.6%",
    "difficulty": "简单",
    "frontendId": "944",
    "paidOnly": false,
    "seriesKeys": [
      "delete-columns-to-make-sorted"
    ],
    "seriesPrimaryKey": "delete-columns-to-make-sorted",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0944.Delete%20Columns%20to%20Make%20Sorted/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Delete Columns to Make Sorted",
    "titleCn": "删列造序",
    "titleSlug": "delete-columns-to-make-sorted",
    "url": "https://leetcode.cn/problems/delete-columns-to-make-sorted/description/",
    "statementPreview": "给你由 n 个小写字母字符串组成的数组 strs，其中每个字符串长度相等。 这些字符串可以每个一行，排成一个网格。例如， strs = [\"abc\", \"bce\", \"cae\"] 可以排列为： abc bce cae 你需要找出并删除 不是按字典序非严格递增排列的 列。在上面的例子（下标从 0 开始）中，列 0（ 'a' , 'b' , 'c' ）和列 2（ 'c' , 'e' , 'e' ）都是按字典序非严格递增排列的，而列 1（ 'b' , 'c' , 'a' ）不是，所以要删除列 1。 返回你需要删除的列数。",
    "approachPreview": "我们记字符串数组 \\textit{strs} 的行数为 n，列数为 m。 遍历每一列，从第二行开始，逐列比较当前行和上一行的字符，如果当前行的字符小于上一行的字符，说明当前列不是按字典序非严格递增排列的，需要删除，结果加一，然后跳出内层循环。 最后返回结果即可。 时间复杂度 O(L)，其中 L 为字符串数组 \\textit{strs} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和删列造序系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删列造序 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删列造序系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.8%",
    "difficulty": "中等",
    "frontendId": "955",
    "paidOnly": false,
    "seriesKeys": [
      "delete-columns-to-make-sorted"
    ],
    "seriesPrimaryKey": "delete-columns-to-make-sorted",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0955.Delete%20Columns%20to%20Make%20Sorted%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Delete Columns to Make Sorted II",
    "titleCn": "删列造序 II",
    "titleSlug": "delete-columns-to-make-sorted-ii",
    "url": "https://leetcode.cn/problems/delete-columns-to-make-sorted-ii/description/",
    "statementPreview": "给定由 n 个字符串组成的数组 strs，其中每个字符串长度相等。 选取一个删除索引序列，对于 strs 中的每个字符串，删除对应每个索引处的字符。 比如，有 strs = [\"abcdef\", \"uvwxyz\"]，删除索引序列 {0, 2, 3}，删除后 strs 为 [\"bef\", \"vyz\"]。 假设，我们选择了一组删除索引 answer，那么在执行删除操作之后，最终得到的数组的元素是按 字典序 （ strs[0] <= strs[1] <= strs[2] ... <= strs[n - 1] ）排列的，然后请你返回 answer.length 的最小可能值。",
    "approachPreview": "字符串按字典序比较时，从左到右比较，第一个不相等的字符决定了两个字符串的大小关系。因此我们可以从左到右遍历每一列，判断当前列是否需要删除。 我们维护一个长度为 n - 1 的布尔数组 \\textit{st}，表示相邻的字符串对是否已经确定了大小关系。如果已经确定了大小关系，那么后续在这两个字符串之间的任何字符比较都不会改变它们的大小关系。 对于每一列 j，我们遍历所有相邻的字符串对 (\\textit{strs}[i], \\textit{strs}[i + 1])： 如果 \\textit{st}[i] 为假且 \\textit{strs}[i][j] > \\textit{strs}[i + 1][j]，说明当前列必须删除，我们将答案加一并跳过该列的处理； 否则，如果 \\textit{st}[i] 为假且 \\textit{strs}[i][j] < \\textit{strs}[i + 1][j]，说明当前列确定了这两个字符串的大小关系，我们将 \\textit{st}[i] 设为真。 遍历完所有列后，答案即为需要删除的列数。 这个贪心策略是最优的，因为字典序由从左到右第一个不同列决定。若当前列不删除且导致某对字符串顺序错误，则无论后续列如何，都无法修正这一错误，因此必须删除当前列。若当前列不删除且不导致任何字符串对顺序错误，则保留当前列不会影响最终的字典序关系。",
    "followUps": [
      {
        "question": "这题和删列造序系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删列造序 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删列造序系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.7%",
    "difficulty": "困难",
    "frontendId": "960",
    "paidOnly": false,
    "seriesKeys": [
      "delete-columns-to-make-sorted"
    ],
    "seriesPrimaryKey": "delete-columns-to-make-sorted",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0960.Delete%20Columns%20to%20Make%20Sorted%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Delete Columns to Make Sorted III",
    "titleCn": "删列造序 III",
    "titleSlug": "delete-columns-to-make-sorted-iii",
    "url": "https://leetcode.cn/problems/delete-columns-to-make-sorted-iii/description/",
    "statementPreview": "给定由 n 个小写字母字符串组成的数组 strs，其中每个字符串长度相等。 选取一个删除索引序列，对于 strs 中的每个字符串，删除对应每个索引处的字符。 比如，有 strs = [\"abcdef\",\"uvwxyz\"]，删除索引序列 {0, 2, 3}，删除后为 [\"bef\", \"vyz\"]。 假设，我们选择了一组删除索引 answer，那么在执行删除操作之后，最终得到的数组的行中的 每个元素 都是按 字典序 排列的（即 (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]) 和 (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1])，依此类推）。 请返回 answer.length 的最小可能值。",
    "approachPreview": "我们定义 f[i] 表示以第 i 列结尾的最长不下降子序列的长度，初始时 f[i] = 1，答案即为 n - \\max(f)。 考虑计算 f[i]，我们可以枚举 j < i，如果对于所有的字符串 s，有 s[j] \\le s[i]，那么 f[i] = \\max(f[i], f[j] + 1)。 最后，我们返回 n - \\max(f)。 时间复杂度 O(n^2 \\times m)，空间复杂度 O(n)。其中 n 和 m 分别是数组 \\textit{strs} 每个字符串的长度和数组的长度。",
    "followUps": [
      {
        "question": "这题和删列造序系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删列造序 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删列造序系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.0%",
    "difficulty": "中等",
    "frontendId": "498",
    "paidOnly": false,
    "seriesKeys": [
      "diagonal-traverse"
    ],
    "seriesPrimaryKey": "diagonal-traverse",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0498.Diagonal%20Traverse/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Diagonal Traverse",
    "titleCn": "对角线遍历",
    "titleSlug": "diagonal-traverse",
    "url": "https://leetcode.cn/problems/diagonal-traverse/description/",
    "statementPreview": "给你一个大小为 m x n 的矩阵 mat，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。",
    "approachPreview": "对于每一轮 k，我们固定从右上方开始往左下方遍历，得到 t。如果 k 为偶数，再将 t 逆序。然后将 t 添加到结果数组 \\textit{ans} 中。 问题的关键在于确定轮数以及每一轮的起始坐标点 (i, j)。 时间复杂度 O(m \\times n)。其中 m 和 n 分别为矩阵的行数和列数。忽略答案的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和对角线遍历系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 对角线遍历 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷对角线遍历系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.2%",
    "difficulty": "中等",
    "frontendId": "1424",
    "paidOnly": false,
    "seriesKeys": [
      "diagonal-traverse"
    ],
    "seriesPrimaryKey": "diagonal-traverse",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1424.Diagonal%20Traverse%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Diagonal Traverse II",
    "titleCn": "对角线遍历 II",
    "titleSlug": "diagonal-traverse-ii",
    "url": "https://leetcode.cn/problems/diagonal-traverse-ii/description/",
    "statementPreview": "给你一个列表 nums，里面每一个元素都是一个整数列表。请你依照下面各图的规则，按顺序返回 nums 中对角线上的整数。",
    "approachPreview": "我们观察到： 每一条对角线上的 i + j 的值都是相同的； 下一条对角线的 i + j 的值比前一条对角线的大； 在同一条对角线中的 i + j 是相同的，而 j 值是从小到大递增。 因此，我们将所有数字以 (i, j, \\textit{nums}[i][j]) 的形式存进 \\textit{arr}，然后按照前两项排序。最后返回 \\textit{arr} 所有元素下标为 2 的值组成的数组即可。 时间复杂度 O(n \\times \\log n)，其中 n 是数组 \\textit{nums} 中元素的个数。空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和对角线遍历系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 对角线遍历 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷对角线遍历系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.5%",
    "difficulty": "困难",
    "frontendId": "115",
    "paidOnly": false,
    "seriesKeys": [
      "distinct-subsequences"
    ],
    "seriesPrimaryKey": "distinct-subsequences",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0115.Distinct%20Subsequences/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Distinct Subsequences",
    "titleCn": "不同的子序列",
    "titleSlug": "distinct-subsequences",
    "url": "https://leetcode.cn/problems/distinct-subsequences/description/",
    "statementPreview": "给你两个字符串 s 和 t，统计并返回在 s 的 子序列 中 t 出现的个数。 测试用例保证结果在 32 位有符号整数范围内。",
    "approachPreview": "我们定义 f[i][j] 表示字符串 s 的前 i 个字符中，子序列构成字符串 t 的前 j 个字符的方案数。初始时 f[i][0]=1，其中 i \\in [0,m]。 当 i \\gt 0 时，考虑 f[i][j] 的计算： 当 s[i-1] \\ne t[j-1] 时，不能选取 s[i-1]，因此 f[i][j]=f[i-1][j]； 否则，可以选取 s[i-1]，此时 f[i][j]=f[i-1][j-1]。 因此我们有如下的状态转移方程： f[i][j]=\\left\\{ \\begin{aligned} &f[i-1][j], &s[i-1] \\ne t[j-1] \\\\ &f[i-1][j-1]+f[i-1][j], &s[i-1]=t[j-1] \\end{aligned} \\right. 最终的答案即为 f[m][n]，其中 m 和 n 分别是字符串 s 和 t 的长度。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。 我们注意到 f[i][j] 的计算只和 f[i-1][..] 有关，因此，我们可以优化掉第一维，这样空间复杂度可以降低到 O(n)。",
    "followUps": [
      {
        "question": "这题和不同的子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同的子序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同的子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.6%",
    "difficulty": "困难",
    "frontendId": "940",
    "paidOnly": false,
    "seriesKeys": [
      "distinct-subsequences"
    ],
    "seriesPrimaryKey": "distinct-subsequences",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0940.Distinct%20Subsequences%20II/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Distinct Subsequences II",
    "titleCn": "不同的子序列 II",
    "titleSlug": "distinct-subsequences-ii",
    "url": "https://leetcode.cn/problems/distinct-subsequences-ii/description/",
    "statementPreview": "给定一个字符串 s，计算 s 的 不同非空子序列 的个数。因为结果可能很大，所以返回答案需要对 10^9 + 7 取余。 字符串的 子序列 是经由原字符串删除一些（也可能不删除）字符但不改变剩余字符相对位置的一个新字符串。 例如， \"ace\" 是 \" a b c d e \" 的一个子序列，但 \"aec\" 不是。",
    "approachPreview": "定义 dp[i] 表示以 s[i] 结尾的不同子序列的个数。由于 s 中只包含小写字母，因此我们可以直接创建一个长度为 26 的数组。初始时 dp 所有元素均为 0。答案为 \\sum_{i=0}^{25}dp[i]。 遍历字符串 s，对于每个位置的字符 s[i]，我们需要更新以 s[i] 结尾的不同子序列的个数，此时 dp[i]=\\sum_{j=0}^{25}dp[j]+1。其中 \\sum_{j=0}^{25}dp[j] 是此前我们已经计算出所有不同子序列的个数，而 +1 是指 s[i] 本身也可以作为一个子序列。 最后，我们需要对 dp 中的所有元素求和，再对 10^9+7 取余，即为答案。 时间复杂度 O(n\\times C)，其中 n 是字符串 s 的长度，而 C 是字符集的大小，本题中 C=26。空间复杂度 O(C)。",
    "followUps": [
      {
        "question": "这题和不同的子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同的子序列 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同的子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "75.9%",
    "difficulty": "简单",
    "frontendId": "3010",
    "paidOnly": false,
    "seriesKeys": [
      "divide-an-array-into-subarrays-with-minimum-cost"
    ],
    "seriesPrimaryKey": "divide-an-array-into-subarrays-with-minimum-cost",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3010.Divide%20an%20Array%20Into%20Subarrays%20With%20Minimum%20Cost%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Divide an Array Into Subarrays With Minimum Cost I",
    "titleCn": "将数组分成最小总代价的子数组 I",
    "titleSlug": "divide-an-array-into-subarrays-with-minimum-cost-i",
    "url": "https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-i/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums。 一个数组的 代价 是它的 第一个 元素。比方说， [1,2,3] 的代价是 1， [3,4,1] 的代价是 3。 你需要将 nums 分成 3 个 连续且没有交集 的子数组。 请你返回这些 子数组 的 最小 代价 总和。",
    "approachPreview": "我们记数组 nums 的第一个元素为 a，其余元素中最小的元素为 b，次小的元素为 c，那么答案就是 a+b+c。 时间复杂度 O(n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和将数组分成最小总代价的子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 将数组分成最小总代价的子数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷将数组分成最小总代价的子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.1%",
    "difficulty": "困难",
    "frontendId": "3013",
    "paidOnly": false,
    "seriesKeys": [
      "divide-an-array-into-subarrays-with-minimum-cost"
    ],
    "seriesPrimaryKey": "divide-an-array-into-subarrays-with-minimum-cost",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3013.Divide%20an%20Array%20Into%20Subarrays%20With%20Minimum%20Cost%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Divide an Array Into Subarrays With Minimum Cost II",
    "titleCn": "将数组分成最小总代价的子数组 II",
    "titleSlug": "divide-an-array-into-subarrays-with-minimum-cost-ii",
    "url": "https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/description/",
    "statementPreview": "给你一个下标从 0 开始长度为 n 的整数数组 nums 和两个 正 整数 k 和 dist。 一个数组的 代价 是数组中的 第一个 元素。比方说， [1,2,3] 的代价为 1， [3,4,1] 的代价为 3。 你需要将 nums 分割成 k 个 连续且互不相交 的 子数组，满足 第二 个子数组与第 k 个子数组中第一个元素的下标距离 不超过 dist。换句话说，如果你将 nums 分割成子数组 nums[0..(i_1 - 1)], nums[i_1..(i_2 - 1)], ..., nums[i_k-1..(n - 1)]，那么它需要满足 i_k-1 - i_1 <= dist。 请你返回这些子数组的 最小 总代价。",
    "approachPreview": "题目需要我们将数组 \\textit{nums} 分割成 k 个连续且不相交的子数组，并且第二个子数组的第一个元素与第 k 个子数组的第一个元素的下标距离不超过 \\textit{dist}，这等价于让我们从 \\textit{nums} 下标为 1 的元素开始，找到一个窗口大小为 \\textit{dist}+1 的子数组，求其中前 k-1 的最小元素之和。我们将 k 减 1，这样我们只需要求出 k 个最小元素之和，再加上 \\textit{nums}[0] 即可。 我们可以使用两个有序集合 \\textit{l} 和 \\textit{r} 分别维护大小为 \\textit{dist} + 1 的窗口元素，其中 \\textit{l} 维护最小的 k 个元素，而 \\textit{r} 维护窗口的剩余元素。我们维护一个变量 \\textit{s} 表示 \\textit{nums}[0] 与 l 中元素之和。初始时，我们将前 \\textit{dist}+2 个元素之和累加到 \\textit{s} 中，并将下标为 [1, \\textit{dist} + 1] 的所有元素加入到 \\textit{l} 中。如果 \\textit{l} 的大小大于 k，我们循环将 \\textit{l} 中的最大元素移动到 \\textit{r} 中，直到 \\textit{l} 的大小等于 k，过程中更新 \\textit{s} 的值。",
    "followUps": [
      {
        "question": "这题和将数组分成最小总代价的子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 将数组分成最小总代价的子数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷将数组分成最小总代价的子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.3%",
    "difficulty": "中等",
    "frontendId": "3129",
    "paidOnly": false,
    "seriesKeys": [
      "find-all-possible-stable-binary-arrays"
    ],
    "seriesPrimaryKey": "find-all-possible-stable-binary-arrays",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3129.Find%20All%20Possible%20Stable%20Binary%20Arrays%20I/README.md",
    "tags": [
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Find All Possible Stable Binary Arrays I",
    "titleCn": "找出所有稳定的二进制数组 I",
    "titleSlug": "find-all-possible-stable-binary-arrays-i",
    "url": "https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-i/description/",
    "statementPreview": "给你 3 个正整数 zero， one 和 limit。 一个 二进制数组 arr 如果满足以下条件，那么我们称它是 稳定的： 0 在 arr 中出现次数 恰好 为 zero。 1 在 arr 中出现次数 恰好 为 one。 arr 中每个长度超过 limit 的 子数组 都 同时 包含 0 和 1。 请你返回 稳定 二进制数组的 总 数目。 由于答案可能很大，将它对 10^9 + 7 取余 后返回。",
    "approachPreview": "我们设计一个函数 \\textit{dfs}(i, j, k) 表示还剩下 i 个 0 和 j 个 1 且接下来待填的数字是 k 的情况下，满足题目条件的稳定二进制数组的个数。那么答案就是 \\textit{dfs}(\\textit{zero}, \\textit{one}, 0) + \\textit{dfs}(\\textit{zero}, \\textit{one}, 1)。 函数 \\textit{dfs}(i, j, k) 的计算过程如下： 如果 i \\lt 0 或 j \\lt 0，返回 0。 如果 i = 0，那么当 k = 1 且 j \\leq \\textit{limit} 时返回 1，否则返回 0。 如果 j = 0，那么当 k = 0 且 i \\leq \\textit{limit} 时返回 1，否则返回 0。 如果 k = 0，我们考虑前一个数字是 0 的情况 \\textit{dfs}(i - 1, j, 0) 和前一个数字是 1 的情况 \\textit{dfs}(i - 1, j, 1)，如果前一个数是 0，那么有可能使得子数组中有超过 \\textit{limit} 个 0，即不允许出现倒数第 \\textit{limit} + 1 个数是 1 的情况，所以我们要减去这种情况，即 \\textit{dfs}(i - \\textit{limit} - 1, j, 1)。",
    "followUps": [
      {
        "question": "这题和找出所有稳定的二进制数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出所有稳定的二进制数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷找出所有稳定的二进制数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "66.0%",
    "difficulty": "困难",
    "frontendId": "3130",
    "paidOnly": false,
    "seriesKeys": [
      "find-all-possible-stable-binary-arrays"
    ],
    "seriesPrimaryKey": "find-all-possible-stable-binary-arrays",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3130.Find%20All%20Possible%20Stable%20Binary%20Arrays%20II/README.md",
    "tags": [
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Find All Possible Stable Binary Arrays II",
    "titleCn": "找出所有稳定的二进制数组 II",
    "titleSlug": "find-all-possible-stable-binary-arrays-ii",
    "url": "https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-ii/description/",
    "statementPreview": "给你 3 个正整数 zero， one 和 limit。 一个 二进制数组 arr 如果满足以下条件，那么我们称它是 稳定的： 0 在 arr 中出现次数 恰好 为 zero。 1 在 arr 中出现次数 恰好 为 one。 arr 中每个长度超过 limit 的 子数组 都 同时 包含 0 和 1。 请你返回 稳定 二进制数组的 总 数目。 由于答案可能很大，将它对 10^9 + 7 取余 后返回。",
    "approachPreview": "我们设计一个函数 dfs(i, j, k) 表示还剩下 i 个 0 和 j 个 1 且接下来待填的数字是 k 的情况下，满足题目条件的稳定二进制数组的个数。那么答案就是 dfs(zero, one, 0) + dfs(zero, one, 1)。 函数 dfs(i, j, k) 的计算过程如下： 如果 i \\lt 0 或 j \\lt 0，返回 0。 如果 i = 0，那么当 k = 1 且 j \\leq \\textit{limit} 时返回 1，否则返回 0。 如果 j = 0，那么当 k = 0 且 i \\leq \\textit{limit} 时返回 1，否则返回 0。 如果 k = 0，我们考虑前一个数字是 0 的情况 dfs(i - 1, j, 0) 和前一个数字是 1 的情况 dfs(i - 1, j, 1)，如果前一个数是 0，那么有可能使得子数组中有超过 \\textit{limit} 个 0，即不允许出现倒数第 \\textit{limit} + 1 个数是 1 的情况，所以我们要减去这种情况，即 dfs(i - \\textit{limit} - 1, j, 1)。",
    "followUps": [
      {
        "question": "这题和找出所有稳定的二进制数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出所有稳定的二进制数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷找出所有稳定的二进制数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.3%",
    "difficulty": "中等",
    "frontendId": "153",
    "paidOnly": false,
    "seriesKeys": [
      "find-minimum-in-rotated-sorted-array"
    ],
    "seriesPrimaryKey": "find-minimum-in-rotated-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0153.Find%20Minimum%20in%20Rotated%20Sorted%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Find Minimum in Rotated Sorted Array",
    "titleCn": "寻找旋转排序数组中的最小值",
    "titleSlug": "find-minimum-in-rotated-sorted-array",
    "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/",
    "statementPreview": "已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到： 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2] 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7] 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]]。 给你一个元素值 互不相同 的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素。 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。",
    "approachPreview": "我们可以使用二分查找来解决这个问题。 首先，我们定义两个指针 l 和 r，分别指向数组的起始位置和结束位置。然后，我们进入一个循环，直到 l 小于 r。 在每次循环中，我们计算中间位置 mid，并比较 nums[mid] 和 nums[n-1] 的值。如果 nums[mid] 大于 nums[n-1]，说明最小值在 mid 的右侧，因此我们将 l 更新为 mid + 1。否则，最小值在 mid 的左侧或 mid 本身，因此我们将 r 更新为 mid。当循环结束时，指针 l 将指向最小值的位置，我们返回 nums[l] 即可。 时间复杂度 O(\\log n)，其中 n 是数组 \\textit{nums} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和寻找旋转排序数组中的最小值系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找旋转排序数组中的最小值 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷寻找旋转排序数组中的最小值系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.2%",
    "difficulty": "困难",
    "frontendId": "154",
    "paidOnly": false,
    "seriesKeys": [
      "find-minimum-in-rotated-sorted-array"
    ],
    "seriesPrimaryKey": "find-minimum-in-rotated-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0154.Find%20Minimum%20in%20Rotated%20Sorted%20Array%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Find Minimum in Rotated Sorted Array II",
    "titleCn": "寻找旋转排序数组中的最小值 II",
    "titleSlug": "find-minimum-in-rotated-sorted-array-ii",
    "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/description/",
    "statementPreview": "已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到： 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4] 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7] 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]]。 给你一个可能存在 重复 元素值的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素。 你必须尽可能减少整个过程的操作步骤。",
    "approachPreview": "我们定义二分查找的左边界 l = 0，右边界 r = n - 1。每次计算中间位置 mid = (l + r) \\gg 1，比较 nums[mid] 和 nums[r] 的大小关系： 如果 nums[mid] > nums[r]，说明最小值在 mid 的右侧，因此将 l 更新为 mid + 1。 如果 nums[mid] = nums[r]，无法确定最小值的位置，但可以将 r 向左移动一位，即 r = r - 1，以缩小搜索范围。 如果 nums[mid] < nums[r]，说明最小值在 mid 的左侧或 mid 本身，因此将 r 更新为 mid。 当 l 与 r 相遇时，指针 l 就指向了最小值的位置，返回 nums[l] 即可。 时间复杂度 O(n)，最坏情况下数组中所有元素都相同，需要遍历整个数组。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和寻找旋转排序数组中的最小值系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 寻找旋转排序数组中的最小值 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷寻找旋转排序数组中的最小值系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.3%",
    "difficulty": "简单",
    "frontendId": "3304",
    "paidOnly": false,
    "seriesKeys": [
      "find-the-k-th-character-in-string-game"
    ],
    "seriesPrimaryKey": "find-the-k-th-character-in-string-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3304.Find%20the%20K-th%20Character%20in%20String%20Game%20I/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Find the K-th Character in String Game I",
    "titleCn": "找出第 K 个字符 I",
    "titleSlug": "find-the-k-th-character-in-string-game-i",
    "url": "https://leetcode.cn/problems/find-the-k-th-character-in-string-game-i/description/",
    "statementPreview": "Alice 和 Bob 正在玩一个游戏。最初，Alice 有一个字符串 word = \"a\"。 给定一个 正整数 k。 现在 Bob 会要求 Alice 执行以下操作 无限次 : 将 word 中的每个字符 更改 为英文字母表中的 下一个 字符来生成一个新字符串，并将其 追加 到原始的 word。 例如，对 \"c\" 进行操作生成 \"cd\"，对 \"zb\" 进行操作生成 \"zbac\"。 在执行足够多的操作后， word 中 至少 存在 k 个字符，此时返回 word 中第 k 个字符的值。",
    "approachPreview": "我们可以使用一个数组 \\textit{word} 来存储每次操作后的字符串，当 \\textit{word} 的长度小于 k 时，我们不断地对 \\textit{word} 进行操作。 最后返回 \\textit{word}[k - 1] 即可。 时间复杂度 O(k)，空间复杂度 O(k)。其中 k 为输入参数。",
    "followUps": [
      {
        "question": "这题和找出第 K 个字符 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出第 K 个字符 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷找出第 K 个字符 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.1%",
    "difficulty": "困难",
    "frontendId": "3307",
    "paidOnly": false,
    "seriesKeys": [
      "find-the-k-th-character-in-string-game"
    ],
    "seriesPrimaryKey": "find-the-k-th-character-in-string-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3300-3399/3307.Find%20the%20K-th%20Character%20in%20String%20Game%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Find the K-th Character in String Game II",
    "titleCn": "找出第 K 个字符 II",
    "titleSlug": "find-the-k-th-character-in-string-game-ii",
    "url": "https://leetcode.cn/problems/find-the-k-th-character-in-string-game-ii/description/",
    "statementPreview": "Alice 和 Bob 正在玩一个游戏。最初，Alice 有一个字符串 word = \"a\"。 给定一个 正整数 k 和一个整数数组 operations，其中 operations[i] 表示第 i 次操作的 类型。 现在 Bob 将要求 Alice 按顺序执行 所有 操作： 如果 operations[i] == 0，将 word 的一份 副本追加 到它自身。 如果 operations[i] == 1，将 word 中的每个字符 更改 为英文字母表中的 下一个 字符来生成一个新字符串，并将其 追加 到原始的 word。例如，对 \"c\" 进行操作生成 \"cd\"，对 \"zb\" 进行操作生成 \"zbac\"。 在执行所有操作后，返回 word 中第 k 个字符的值。 注意，在第二种类型的操作中，字符 'z' 可以变成 'a'。",
    "approachPreview": "由于每次操作后，字符串的长度都会翻倍，因此，如果进行 i 次操作，字符串的长度将会是 2^i。 我们可以模拟这个过程，找到第一个大于等于 k 的字符串长度 n。 接下来，我们再往回推，分情况讨论： 如果 k \\gt n / 2，说明 k 在后半部分，如果此时 \\textit{operations}[i - 1] = 1，说明 k 所在的字符是由前半部分的字符加上 1 得到的，我们加上 1。然后我们更新 k 为 k - n / 2。 如果 k \\le n / 2，说明 k 在前半部分，不会受到 \\textit{operations}[i - 1] 的影响。 接下来，我们更新 n 为 n / 2，继续往前推，直到 n = 1。 最后，我们将得到的数字对 26 取模，加上 'a' 的 ASCII 码，即可得到答案。 时间复杂度 O(\\log k)，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和找出第 K 个字符 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 找出第 K 个字符 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷找出第 K 个字符 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.8%",
    "difficulty": "中等",
    "frontendId": "274",
    "paidOnly": false,
    "seriesKeys": [
      "h-index"
    ],
    "seriesPrimaryKey": "h-index",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0274.H-Index/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "counting-sort",
        "name": "计数排序"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "H-Index",
    "titleCn": "H 指数",
    "titleSlug": "h-index",
    "url": "https://leetcode.cn/problems/h-index/description/",
    "statementPreview": "给你一个整数数组 citations，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。 根据维基百科上 h 指数的定义： h 代表“高引用次数”，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h 篇论文被引用次数大于等于 h。如果 h 有多种可能的值， h 指数 是其中最大的那个。",
    "approachPreview": "我们可以先对数组 citations 按照元素值从大到小进行排序。然后我们从大到小枚举 h 值，如果某个 h 值满足 citations[h-1] \\geq h，则说明有至少 h 篇论文分别被引用了至少 h 次，直接返回 h 即可。如果没有找到这样的 h 值，说明所有的论文都没有被引用，返回 0。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(\\log n)。其中 n 是数组 citations 的长度。",
    "followUps": [
      {
        "question": "这题和H 指数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 H 指数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷H 指数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.5%",
    "difficulty": "中等",
    "frontendId": "275",
    "paidOnly": false,
    "seriesKeys": [
      "h-index"
    ],
    "seriesPrimaryKey": "h-index",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0275.H-Index%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "H-Index II",
    "titleCn": "H 指数 II",
    "titleSlug": "h-index-ii",
    "url": "https://leetcode.cn/problems/h-index-ii/description/",
    "statementPreview": "给你一个整数数组 citations，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数， citations 已经按照 非降序排列。计算并返回该研究者的 h 指数。 h 指数的定义：h 代表“高引用次数”（high citations），一名科研人员的 h 指数是指他（她）的 （ n 篇论文中） 至少 有 h 篇论文分别被引用了 至少 h 次。 请你设计并实现对数时间复杂度的算法解决此问题。",
    "approachPreview": "我们注意到，如果有至少 x 篇论文的引用次数大于等于 x，那么对于任意 y \\lt x，其引用次数也一定大于等于 y。这存在着单调性。 因此，我们二分枚举 h，获取满足条件的最大 h。由于要满足 h 篇论文至少被引用 h 次，因此 citations[n - mid] \\ge mid。 时间复杂度 O(\\log n)，其中 n 是数组 citations 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和H 指数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 H 指数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷H 指数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "简单",
    "frontendId": "1046",
    "paidOnly": false,
    "seriesKeys": [
      "last-stone-weight"
    ],
    "seriesPrimaryKey": "last-stone-weight",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1046.Last%20Stone%20Weight/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Last Stone Weight",
    "titleCn": "最后一块石头的重量",
    "titleSlug": "last-stone-weight",
    "url": "https://leetcode.cn/problems/last-stone-weight/description/",
    "statementPreview": "有一堆石头，每块石头的重量都是正整数。 每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下： 如果 x == y，那么两块石头都会被完全粉碎； 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。 最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。",
    "approachPreview": "我们将数组 stones 所有元素放入大根堆，然后执行循环操作，每次弹出两个元素 y 和 x，如果 x \\neq y，将 y - x 放入大根堆。当堆元素个数小于 2 时，退出循环。 最后如果存在堆顶元素，则将其返回，否则返回 0。 时间复杂度 O(n\\log n)，空间复杂度 O(n)。其中 n 是数组 stones 的长度。",
    "followUps": [
      {
        "question": "这题和最后一块石头的重量系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最后一块石头的重量 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最后一块石头的重量系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.8%",
    "difficulty": "简单",
    "frontendId": "141",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-cycle"
    ],
    "seriesPrimaryKey": "linked-list-cycle",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0141.Linked%20List%20Cycle/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "title": "Linked List Cycle",
    "titleCn": "环形链表",
    "titleSlug": "linked-list-cycle",
    "url": "https://leetcode.cn/problems/linked-list-cycle/description/",
    "statementPreview": "给你一个链表的头节点 head，判断链表中是否有环。 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 注意： pos 不作为参数进行传递。仅仅是为了标识链表的实际情况。 如果链表中存在环，则返回 true。 否则，返回 false。",
    "approachPreview": "我们可以遍历链表，用一个哈希表 s 记录每个节点。当某个节点二次出现时，则表示存在环，直接返回 true。否则链表遍历结束，返回 false。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是链表中的节点数。",
    "followUps": [
      {
        "question": "这题和环形链表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 环形链表 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷环形链表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "63.0%",
    "difficulty": "中等",
    "frontendId": "142",
    "paidOnly": false,
    "seriesKeys": [
      "linked-list-cycle"
    ],
    "seriesPrimaryKey": "linked-list-cycle",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0142.Linked%20List%20Cycle%20II/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "title": "Linked List Cycle II",
    "titleCn": "环形链表 II",
    "titleSlug": "linked-list-cycle-ii",
    "url": "https://leetcode.cn/problems/linked-list-cycle-ii/description/",
    "statementPreview": "给定一个链表的头节点 head，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（ 索引从 0 开始 ）。如果 pos 是 -1，则在该链表中没有环。 注意： pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。 不允许修改 链表。",
    "approachPreview": "我们先利用快慢指针判断链表是否有环，如果有环的话，快慢指针一定会相遇，且相遇的节点一定在环中。 如果没有环，快指针会先到达链表尾部，直接返回 null 即可。 如果有环，我们再定义一个答案指针 ans 指向链表头部，然后让 ans 和慢指针一起向前走，每次走一步，直到 ans 和慢指针相遇，相遇的节点即为环的入口节点。 为什么这样能找到环的入口节点呢？ 我们不妨假设链表头节点到环入口的距离为 x，环入口到相遇节点的距离为 y，相遇节点到环入口的距离为 z，那么慢指针走过的距离为 x + y，快指针走过的距离为 x + y + k \\times (y + z)，其中 k 是快指针在环中绕了 k 圈。 由于快指针速度是慢指针的 2 倍，因此有 2 \\times (x + y) = x + y + k \\times (y + z)，可以推出 x + y = k \\times (y + z)，即 x = (k - 1) \\times (y + z) + z。 也即是说，如果我们定义一个答案指针 ans 指向链表头部，然后 ans 和慢指针一起向前走，那么它们一定会在环入口相遇。 时间复杂度 O(n)，其中 n 是链表中节点的数目。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和环形链表系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 环形链表 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷环形链表系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.1%",
    "difficulty": "中等",
    "frontendId": "3719",
    "paidOnly": false,
    "seriesKeys": [
      "longest-balanced-subarray"
    ],
    "seriesPrimaryKey": "longest-balanced-subarray",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3700-3799/3719.Longest%20Balanced%20Subarray%20I/README.md",
    "tags": [
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Longest Balanced Subarray I",
    "titleCn": "最长平衡子数组 I",
    "titleSlug": "longest-balanced-subarray-i",
    "url": "https://leetcode.cn/problems/longest-balanced-subarray-i/description/",
    "statementPreview": "给你一个整数数组 nums。 如果子数组中 不同偶数 的数量等于 不同奇数 的数量，则称该 子数组 是 平衡的。 返回 最长 平衡子数组的长度。 子数组 是数组中连续且 非空 的一段元素序列。",
    "approachPreview": "我们可以枚举子数组的左端点 i，然后从左端点开始向右枚举右端点 j，在枚举的过程中使用一个哈希表 \\textit{vis} 来记录子数组中出现过的数字，同时使用一个长度为 2 的数组 \\textit{cnt} 来分别记录子数组中不同偶数和不同奇数的数量。当 \\textit{cnt}[0] = \\textit{cnt}[1] 时，更新答案 \\textit{ans} = \\max(\\textit{ans}, j - i + 1)。 时间复杂度 O(n^2)，空间复杂度 O(n)。其中 n 为数组 \\textit{nums} 的长度。",
    "followUps": [
      {
        "question": "这题和最长平衡子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长平衡子数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长平衡子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.2%",
    "difficulty": "困难",
    "frontendId": "3721",
    "paidOnly": false,
    "seriesKeys": [
      "longest-balanced-subarray"
    ],
    "seriesPrimaryKey": "longest-balanced-subarray",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3700-3799/3721.Longest%20Balanced%20Subarray%20II/README.md",
    "tags": [
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Longest Balanced Subarray II",
    "titleCn": "最长平衡子数组 II",
    "titleSlug": "longest-balanced-subarray-ii",
    "url": "https://leetcode.cn/problems/longest-balanced-subarray-ii/description/",
    "statementPreview": "给你一个整数数组 nums。 如果子数组中 不同偶数 的数量等于 不同奇数 的数量，则称该 子数组 是 平衡的。 返回 最长 平衡子数组的长度。 子数组 是数组中连续且 非空 的一段元素序列。",
    "approachPreview": "我们可以将问题转化为前缀和问题。定义一个前缀和变量 \\textit{now}，表示当前子数组中奇数和偶数的差值： \\textit{now} = \\text{不同奇数} - \\text{不同偶数} 对于奇数元素记为 +1，偶数元素记为 -1。使用哈希表 \\textit{last} 记录每个数字上一次出现的位置，如果数字重复出现，需要撤销其之前的贡献。 为了高效计算每次右端点加入元素后子数组长度，我们使用线段树维护区间前缀和的最小值和最大值，同时支持区间加操作和线段树上二分查询。当遍历到右端点 i 时，先更新当前元素的贡献，然后使用线段树查询最早出现当前前缀和 \\textit{now} 的位置 pos，当前子数组长度为 i - pos，更新答案： \\textit{ans} = \\max(\\textit{ans}, i - pos) 时间复杂度为 O(n \\log n)，其中 n 为数组长度。每次修改和查询线段树操作 O(\\log n)，枚举右端点共 n 次，总时间复杂度为 O(n \\log n)，空间复杂度为 O(n)，其中线段树节点和哈希表各占 O(n) 空间。",
    "followUps": [
      {
        "question": "这题和最长平衡子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长平衡子数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长平衡子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "68.1%",
    "difficulty": "中等",
    "frontendId": "3713",
    "paidOnly": false,
    "seriesKeys": [
      "longest-balanced-substring"
    ],
    "seriesPrimaryKey": "longest-balanced-substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3700-3799/3713.Longest%20Balanced%20Substring%20I/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "title": "Longest Balanced Substring I",
    "titleCn": "最长的平衡子串 I",
    "titleSlug": "longest-balanced-substring-i",
    "url": "https://leetcode.cn/problems/longest-balanced-substring-i/description/",
    "statementPreview": "给你一个由小写英文字母组成的字符串 s。 如果一个 子串 中所有 不同 字符出现的次数都 相同，则称该子串为 平衡 子串。 请返回 s 的 最长平衡子串 的 长度。 子串 是字符串中连续的、 非空 的字符序列。",
    "approachPreview": "我们可以在 [0,..n-1] 范围内枚举子串的起始位置 i，然后在 [i,..,n-1] 范围内枚举子串的结束位置 j，并使用哈希表 \\textit{cnt} 记录子串 s[i..j] 中每个字符出现的次数。我们使用变量 \\textit{mx} 记录子串中出现次数最多的字符的出现次数，使用变量 v 记录子串中不同字符的个数。如果在某个位置 j，满足 \\textit{mx} \\times v = j - i + 1，则说明子串 s[i..j] 是一个平衡子串，我们更新答案 \\textit{ans} = \\max(\\textit{ans}, j - i + 1)。 时间复杂度 O(n^2)，其中 n 是字符串的长度。空间复杂度 O( \\Sigma )，其中 \\Sigma 是字符集的大小，本题中 \\Sigma = 26。",
    "followUps": [
      {
        "question": "这题和最长的平衡子串 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长的平衡子串 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长的平衡子串 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.5%",
    "difficulty": "中等",
    "frontendId": "3714",
    "paidOnly": false,
    "seriesKeys": [
      "longest-balanced-substring"
    ],
    "seriesPrimaryKey": "longest-balanced-substring",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3700-3799/3714.Longest%20Balanced%20Substring%20II/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Longest Balanced Substring II",
    "titleCn": "最长的平衡子串 II",
    "titleSlug": "longest-balanced-substring-ii",
    "url": "https://leetcode.cn/problems/longest-balanced-substring-ii/description/",
    "statementPreview": "给你一个只包含字符 'a'、 'b' 和 'c' 的字符串 s。 如果一个 子串 中所有 不同 字符出现的次数都 相同，则称该子串为 平衡 子串。 请返回 s 的 最长平衡子串 的 长度。 子串 是字符串中连续的、 非空 的字符序列。",
    "approachPreview": "答案分为以下三种情况： 1. 平衡子串中只有一种字符，例如 \"aaa\"。 2. 平衡子串中有两种字符，例如 \"aabb\"。 3. 平衡子串中有三种字符，例如 \"abc\"。 我们分别定义三个函数 \\text{calc1}(s), \\text{calc2}(s, a, b) 和 \\text{calc3}(s) 来计算上述三种情况的最长平衡子串长度，最后返回三者的最大值。 对于 \\text{calc1}(s)，我们只需要遍历字符串 s，统计每个连续字符的长度，取最大值即可。 对于 \\text{calc2}(s, a, b)，我们可以使用前缀和和哈希表来计算最长的平衡子串长度。具体来说，我们维护一个变量 d 来表示当前子串中字符 a 的数量减去字符 b 的数量，并使用一个哈希表来记录每个 d 值第一次出现的位置。当我们再次遇到相同的 d 值时，说明从上一次出现的位置到当前位置的子串中字符 a 和字符 b 的数量相等，即该子串是平衡的，我们更新答案。 对于 \\text{calc3}(s)，我们同样使用前缀和和哈希表来计算最长的平衡子串长度。我们定义一个数组 \\textit{cnt} 来记录字符 a, b 和 c 的数量，并使用一个哈希表来记录每个 (\\textit{cnt}[a] - \\textit{cnt}[b], \\textit{cnt}[b] - \\textit{cnt}[c]) 值第一次出现的位置。",
    "followUps": [
      {
        "question": "这题和最长的平衡子串 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长的平衡子串 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长的平衡子串 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.7%",
    "difficulty": "中等",
    "frontendId": "300",
    "paidOnly": false,
    "seriesKeys": [
      "longest-increasing-subsequence"
    ],
    "seriesPrimaryKey": "longest-increasing-subsequence",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0300.Longest%20Increasing%20Subsequence/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Increasing Subsequence",
    "titleCn": "最长递增子序列",
    "titleSlug": "longest-increasing-subsequence",
    "url": "https://leetcode.cn/problems/longest-increasing-subsequence/description/",
    "statementPreview": "给你一个整数数组 nums，找到其中最长严格递增子序列的长度。 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如， [3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的 子序列。",
    "approachPreview": "我们定义 f[i] 表示以 nums[i] 结尾的最长递增子序列的长度，初始时 f[i] = 1，答案为 f[i] 的最大值。 对于 f[i]，我们需要枚举 0 \\le j \\lt i，如果 nums[j] \\lt nums[i]，则 f[i] = \\max(f[i], f[j] + 1)。 最后的答案即为 f[i] 的最大值。 时间复杂度 O(n^2)，空间复杂度 O(n)。其中 n 为数组长度。",
    "followUps": [
      {
        "question": "这题和最长递增子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长递增子序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长递增子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "33.4%",
    "difficulty": "困难",
    "frontendId": "2407",
    "paidOnly": false,
    "seriesKeys": [
      "longest-increasing-subsequence"
    ],
    "seriesPrimaryKey": "longest-increasing-subsequence",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2400-2499/2407.Longest%20Increasing%20Subsequence%20II/README.md",
    "tags": [
      {
        "slug": "binary-indexed-tree",
        "name": "树状数组"
      },
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "monotonic-queue",
        "name": "单调队列"
      }
    ],
    "title": "Longest Increasing Subsequence II",
    "titleCn": "最长递增子序列 II",
    "titleSlug": "longest-increasing-subsequence-ii",
    "url": "https://leetcode.cn/problems/longest-increasing-subsequence-ii/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。 找到 nums 中满足以下要求的最长子序列： 子序列 严格递增 子序列中相邻元素的差值 不超过 k。 请你返回满足上述要求的 最长子序列 的长度。 子序列 是从一个数组中删除部分元素后，剩余元素不改变顺序得到的数组。",
    "approachPreview": "我们假设 f[v] 表示以数字 v 结尾的最长递增子序列的长度。 我们遍历数组 nums 中的每个元素 v，有状态转移方程：f[v] = \\max(f[v], f[x])，其中 x 的取值范围是 [v-k, v-1]。 因此，我们需要一个数据结构，来维护区间的最大值，不难想到使用线段树。 线段树将整个区间分割为多个不连续的子区间，子区间的数量不超过 log(width)。更新某个元素的值，只需要更新 log(width) 个区间，并且这些区间都包含在一个包含该元素的大区间内。 线段树的每个节点代表一个区间； 线段树具有唯一的根节点，代表的区间是整个统计范围，如 [1,N]； 线段树的每个叶子节点代表一个长度为 1 的元区间 [x, x]； 对于每个内部节点 [l,r]，它的左儿子是 [l,mid]，右儿子是 [mid+1,r], 其中 mid = \\left \\lfloor \\frac{l+r}{2} \\right \\rfloor。 对于本题，线段树节点维护的信息是区间范围内的最大值。 时间复杂度 O(n \\times \\log n)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和最长递增子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长递增子序列 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长递增子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "67.6%",
    "difficulty": "中等",
    "frontendId": "516",
    "paidOnly": false,
    "seriesKeys": [
      "longest-palindromic-subsequence"
    ],
    "seriesPrimaryKey": "longest-palindromic-subsequence",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0516.Longest%20Palindromic%20Subsequence/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Palindromic Subsequence",
    "titleCn": "最长回文子序列",
    "titleSlug": "longest-palindromic-subsequence",
    "url": "https://leetcode.cn/problems/longest-palindromic-subsequence/description/",
    "statementPreview": "给你一个字符串 s，找出其中最长的回文子序列，并返回该序列的长度。 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。",
    "approachPreview": "我们定义 f[i][j] 表示字符串 s 的第 i 个字符到第 j 个字符之间的最长回文子序列的长度。初始时 f[i][i] = 1，其余位置的值均为 0。 如果 s[i] = s[j]，那么 f[i][j] = f[i + 1][j - 1] + 2；否则 f[i][j] = \\max(f[i + 1][j], f[i][j - 1])。 由于 f[i][j] 的值与 f[i + 1][j - 1], f[i + 1][j], f[i][j - 1] 有关，所以我们应该从大到小枚举 i，从小到大枚举 j。 答案即为 f[0][n - 1]。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和最长回文子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长回文子序列 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长回文子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "56.5%",
    "difficulty": "中等",
    "frontendId": "1682",
    "paidOnly": true,
    "seriesKeys": [
      "longest-palindromic-subsequence"
    ],
    "seriesPrimaryKey": "longest-palindromic-subsequence",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1682.Longest%20Palindromic%20Subsequence%20II/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Longest Palindromic Subsequence II",
    "titleCn": "最长回文子序列 II",
    "titleSlug": "longest-palindromic-subsequence-ii",
    "url": "https://leetcode.cn/problems/longest-palindromic-subsequence-ii/description/",
    "statementPreview": "字符串 s 的某个子序列符合下列条件时，称为“ 好的回文子序列 ”： 它是 s 的子序列。 它是回文序列（反转后与原序列相等）。 长度为 偶数。 除中间的两个字符外，其余任意两个连续字符不相等。 例如，若 s = \"abcabcabb\"，则 \"abba\" 可称为“好的回文子序列”，而 \"bcb\" （长度不是偶数）和 \"bbbb\" （含有相等的连续字符）不能称为“好的回文子序列”。 给定一个字符串 s， 返回 s 的 最长“好的回文子序列” 的 长度。",
    "approachPreview": "我们设计一个函数 dfs(i, j, x) 表示字符串 s 中下标范围 [i, j] 内，且以字符 x 结尾的最长“好的回文子序列”的长度。答案为 dfs(0, n - 1, 26)。 函数 dfs(i, j, x) 的计算过程如下： 如果 i >= j，则 dfs(i, j, x) = 0； 如果 s[i] = s[j]，且 s[i] \\neq x，那么 dfs(i, j, x) = dfs(i + 1, j - 1, s[i]) + 2； 如果 s[i] \\neq s[j]，那么 dfs(i, j, x) = max(dfs(i + 1, j, x), dfs(i, j - 1, x))。 过程中，我们可以使用记忆化搜索的方式，避免重复计算。 时间复杂度 O(n^2 \\times C)。其中 n 为字符串 s 的长度，而 C 为字符集大小。本题中 C = 26。",
    "followUps": [
      {
        "question": "这题和最长回文子序列系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最长回文子序列 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最长回文子序列系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "75.1%",
    "difficulty": "中等",
    "frontendId": "236",
    "paidOnly": false,
    "seriesKeys": [
      "lowest-common-ancestor-of-a-binary-tree"
    ],
    "seriesPrimaryKey": "lowest-common-ancestor-of-a-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0236.Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Lowest Common Ancestor of a Binary Tree",
    "titleCn": "二叉树的最近公共祖先",
    "titleSlug": "lowest-common-ancestor-of-a-binary-tree",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/",
    "statementPreview": "给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。 百度百科 中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（ 一个节点也可以是它自己的祖先 ）。”",
    "approachPreview": "我们递归遍历二叉树： 如果当前节点为空或者等于 p 或者 q，则返回当前节点； 否则，我们递归遍历左右子树，将返回的结果分别记为 left 和 right。如果 left 和 right 都不为空，则说明 p 和 q 分别在左右子树中，因此当前节点即为最近公共祖先；如果 left 和 right 中只有一个不为空，返回不为空的那个。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为二叉树节点个数。",
    "followUps": [
      {
        "question": "这题和二叉树的最近公共祖先系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的最近公共祖先 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的最近公共祖先系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.6%",
    "difficulty": "中等",
    "frontendId": "1644",
    "paidOnly": true,
    "seriesKeys": [
      "lowest-common-ancestor-of-a-binary-tree"
    ],
    "seriesPrimaryKey": "lowest-common-ancestor-of-a-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1644.Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Lowest Common Ancestor of a Binary Tree II",
    "titleCn": "二叉树的最近公共祖先 II",
    "titleSlug": "lowest-common-ancestor-of-a-binary-tree-ii",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-ii/description/",
    "statementPreview": "给定一棵二叉树的根节点 root，返回给定节点 p 和 q 的最近公共祖先（LCA）节点。如果 p 或 q 之一 不存在 于该二叉树中，返回 null。树中的每个节点值都是互不相同的。 根据 维基百科中对最近公共祖先节点的定义：“两个节点 p 和 q 在二叉树 T 中的最近公共祖先节点是 后代节点 中既包括 p 又包括 q 的最深节点（我们允许 一个节点为自身的一个后代节点 ）”。一个节点 x 的 后代节点 是节点 x 到某一叶节点间的路径中的节点 y。",
    "approachPreview": "我们设计一个函数 dfs(root, p, q)，该函数返回以 root 为根节点的二叉树中是否包含节点 p 或节点 q，如果包含，则返回 true，否则返回 false。 函数 dfs(root, p, q) 的递归过程如下： 如果当前节点 root 为空，则返回 false。 否则，我们递归地遍历左子树和右子树，得到 l 和 r，分别表示左子树和右子树中是否包含节点 p 或节点 q。 如果 l 和 r 都为 true，说明当前节点 root 就是我们要找的最近公共祖先节点，将其赋值给变量 ans。 如果 l 或 r 为 true，并且当前节点 root 的值等于节点 p 或节点 q 的值，说明当前节点 root 就是我们要找的最近公共祖先节点，将其赋值给变量 ans。 最后，我们判断 l 或 r 是否为 true，或者当前节点 root 的值是否等于节点 p 或节点 q 的值，如果是，则返回 true，否则返回 false。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉树的节点个数。",
    "followUps": [
      {
        "question": "这题和二叉树的最近公共祖先系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的最近公共祖先 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的最近公共祖先系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "83.6%",
    "difficulty": "中等",
    "frontendId": "1650",
    "paidOnly": true,
    "seriesKeys": [
      "lowest-common-ancestor-of-a-binary-tree"
    ],
    "seriesPrimaryKey": "lowest-common-ancestor-of-a-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1650.Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree%20III/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Lowest Common Ancestor of a Binary Tree III",
    "titleCn": "二叉树的最近公共祖先 III",
    "titleSlug": "lowest-common-ancestor-of-a-binary-tree-iii",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iii/description/",
    "statementPreview": "给定一棵二叉树中的两个节点 p 和 q，返回它们的最近公共祖先节点（LCA）。 每个节点都包含其父节点的引用（指针）。 Node 的定义如下： class Node { public int val; public Node left; public Node right; public Node parent; } 根据 维基百科中对最近公共祖先节点的定义：“两个节点 p 和 q 在二叉树 T 中的最近公共祖先节点是后代节点中既包括 p 又包括 q 的最深节点（我们允许 一个节点为自身的一个后代节点 ）”。一个节点 x 的后代节点是节点 x 到某一叶节点间的路径中的节点 y。",
    "approachPreview": "我们用一个哈希表 vis 记录从节点 p 开始到根节点的路径上的所有节点，接下来从节点 q 开始往根节点方向遍历，如果遇到一个节点存在于哈希表 vis 中，那么该节点就是 p 和 q 的最近公共祖先节点，直接返回即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是二叉树的节点数。",
    "followUps": [
      {
        "question": "这题和二叉树的最近公共祖先系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的最近公共祖先 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的最近公共祖先系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "81.1%",
    "difficulty": "中等",
    "frontendId": "1676",
    "paidOnly": true,
    "seriesKeys": [
      "lowest-common-ancestor-of-a-binary-tree"
    ],
    "seriesPrimaryKey": "lowest-common-ancestor-of-a-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1676.Lowest%20Common%20Ancestor%20of%20a%20Binary%20Tree%20IV/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Lowest Common Ancestor of a Binary Tree IV",
    "titleCn": "二叉树的最近公共祖先 IV",
    "titleSlug": "lowest-common-ancestor-of-a-binary-tree-iv",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iv/description/",
    "statementPreview": "给定一棵二叉树的根节点 root 和 TreeNode 类对象的数组（列表） nodes，返回 nodes 中所有节点的最近公共祖先（LCA）。数组（列表）中所有节点都存在于该二叉树中，且二叉树中所有节点的值都是互不相同的。 我们扩展 二叉树的最近公共祖先节点在维基百科上的定义：“对于任意合理的 i 值， n 个节点 p_1、 p_2、...、 p_n 在二叉树 T 中的最近公共祖先节点是 后代 中包含所有节点 p_i 的最深节点（我们允许一个节点是其自身的后代）”。一个节点 x 的后代节点是节点 x 到某一叶节点间的路径中的节点 y。",
    "approachPreview": "我们用一个哈希表 \\textit{s} 记录数组 \\textit{nodes} 中所有节点的值，然后使用深度优先搜索，当遍历到的节点为空或者节点的值在哈希表 \\textit{s} 中时，返回当前节点。否则，递归遍历左右子树，如果左右子树的返回值都不为空，说明当前节点就是最近公共祖先，否则返回不为空的那个子树的返回值。 时间复杂度 O(n + m)，空间复杂度 O(n + m)。其中 n 和 m 分别是二叉树的节点数和数组 \\textit{nodes} 的长度。",
    "followUps": [
      {
        "question": "这题和二叉树的最近公共祖先系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 二叉树的最近公共祖先 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷二叉树的最近公共祖先系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "67.3%",
    "difficulty": "简单",
    "frontendId": "169",
    "paidOnly": false,
    "seriesKeys": [
      "majority-element"
    ],
    "seriesPrimaryKey": "majority-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0169.Majority%20Element/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Majority Element",
    "titleCn": "多数元素",
    "titleSlug": "majority-element",
    "url": "https://leetcode.cn/problems/majority-element/description/",
    "statementPreview": "给定一个大小为 n 的数组 nums，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。 你可以假设数组是非空的，并且给定的数组总是存在多数元素。",
    "approachPreview": "摩尔投票法的基本步骤如下： 初始化元素 m，并初始化计数器 cnt=0。接下来，对于输入列表中每一个元素 x： 1. 如果 cnt=0，那么 m=x 并且 cnt=1； 1. 否则，如果 m=x，那么 cnt = cnt + 1，否则 cnt = cnt - 1。 一般而言，摩尔投票法需要对输入的列表进行**两次遍历**。在第一次遍历中，我们生成候选值 m，如果存在多数，那么该候选值就是多数值。在第二次遍历中，只需要简单地计算候选值的频率，以确认是否是多数值。由于本题已经明确说明存在多数值，所以第一次遍历结束后，直接返回 m 即可，无需二次遍历确认是否是多数值。 时间复杂度 O(n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和多数元素系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 多数元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷多数元素系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.9%",
    "difficulty": "中等",
    "frontendId": "229",
    "paidOnly": false,
    "seriesKeys": [
      "majority-element"
    ],
    "seriesPrimaryKey": "majority-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0229.Majority%20Element%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Majority Element II",
    "titleCn": "多数元素 II",
    "titleSlug": "majority-element-ii",
    "url": "https://leetcode.cn/problems/majority-element-ii/description/",
    "statementPreview": "给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。",
    "approachPreview": "摩尔投票保留最多两个候选，因为出现次数超过 n/3 的元素最多两个。第一遍抵消得到候选，第二遍重新计数验证是否真的超过阈值。",
    "followUps": [
      {
        "question": "这题和多数元素系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 多数元素 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷多数元素系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.0%",
    "difficulty": "简单",
    "frontendId": "485",
    "paidOnly": false,
    "seriesKeys": [
      "max-consecutive-ones"
    ],
    "seriesPrimaryKey": "max-consecutive-ones",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0485.Max%20Consecutive%20Ones/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Max Consecutive Ones",
    "titleCn": "最大连续 1 的个数",
    "titleSlug": "max-consecutive-ones",
    "url": "https://leetcode.cn/problems/max-consecutive-ones/description/",
    "statementPreview": "给定一个二进制数组 nums， 计算其中最大连续 1 的个数。",
    "approachPreview": "我们可以遍历数组，用一个变量 \\textit{cnt} 记录当前连续的 1 的个数，用另一个变量 \\textit{ans} 记录最大连续 1 的个数。 当遍历到一个 1 时，将 \\textit{cnt} 加一，然后更新 \\textit{ans} 的值为 \\textit{cnt} 和 \\textit{ans} 本身的最大值，即 \\textit{ans} = \\max(\\textit{ans}, \\textit{cnt})。否则，将 \\textit{cnt} 重置为 0。 遍历结束后，返回 \\textit{ans} 的值即可。 时间复杂度 O(n)，其中 n 为数组的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和最大连续 1 的个数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大连续 1 的个数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大连续 1 的个数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "56.0%",
    "difficulty": "中等",
    "frontendId": "487",
    "paidOnly": true,
    "seriesKeys": [
      "max-consecutive-ones"
    ],
    "seriesPrimaryKey": "max-consecutive-ones",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0487.Max%20Consecutive%20Ones%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Max Consecutive Ones II",
    "titleCn": "最大连续1的个数 II",
    "titleSlug": "max-consecutive-ones-ii",
    "url": "https://leetcode.cn/problems/max-consecutive-ones-ii/description/",
    "statementPreview": "给定一个二进制数组 nums，如果最多可以翻转一个 0，则返回数组中连续 1 的最大个数。",
    "approachPreview": "我们可以遍历数组，用一个变量 \\textit{cnt} 记录当前窗口中 0 的个数，当 \\textit{cnt} > 1 时，我们将窗口的左边界右移一位。 遍历结束后，窗口的长度即为最大连续 1 的个数。 注意，在上述过程中，我们不需要循环将窗口的左边界右移，而是直接将左边界右移一位，这是因为，题目求的是最大连续 1 的个数，因此，窗口的长度只会增加，不会减少，所以我们不需要循环右移左边界。 时间复杂度 O(n)，其中 n 为数组的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和最大连续 1 的个数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大连续1的个数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大连续 1 的个数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.0%",
    "difficulty": "中等",
    "frontendId": "1004",
    "paidOnly": false,
    "seriesKeys": [
      "max-consecutive-ones"
    ],
    "seriesPrimaryKey": "max-consecutive-ones",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1004.Max%20Consecutive%20Ones%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Max Consecutive Ones III",
    "titleCn": "最大连续1的个数 III",
    "titleSlug": "max-consecutive-ones-iii",
    "url": "https://leetcode.cn/problems/max-consecutive-ones-iii/description/",
    "statementPreview": "给定一个二进制数组 nums 和一个整数 k，假设最多可以翻转 k 个 0，则返回执行操作后 数组中连续 1 的最大个数。",
    "approachPreview": "我们可以遍历数组，用一个变量 \\textit{cnt} 记录当前窗口中 0 的个数，当 \\textit{cnt} > k 时，我们将窗口的左边界右移一位。 遍历结束后，窗口的长度即为最大连续 1 的个数。 注意，在上述过程中，我们不需要循环将窗口的左边界右移，而是直接将左边界右移一位，这是因为，题目求的是最大连续 1 的个数，因此，窗口的长度只会增加，不会减少，所以我们不需要循环右移左边界。 时间复杂度 O(n)，其中 n 为数组的长度。空间复杂度 O(1)。 相似题目：",
    "followUps": [
      {
        "question": "这题和最大连续 1 的个数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大连续1的个数 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大连续 1 的个数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "33.0%",
    "difficulty": "中等",
    "frontendId": "3205",
    "paidOnly": true,
    "seriesKeys": [
      "maximum-array-hopping-score"
    ],
    "seriesPrimaryKey": "maximum-array-hopping-score",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3200-3299/3205.Maximum%20Array%20Hopping%20Score%20I/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Maximum Array Hopping Score I",
    "titleCn": "最大数组跳跃得分 I",
    "titleSlug": "maximum-array-hopping-score-i",
    "url": "https://leetcode.cn/problems/maximum-array-hopping-score-i/description/",
    "statementPreview": "给定一个数组 nums，你必须从索引 0 开始跳跃，直到到达数组的最后一个元素，使得获取 最大 分数。 每一次 跳跃 中，你可以从下标 i 跳到一个 j > i 的下标，并且可以得到 (j - i) * nums[j] 的分数。 返回你能够取得的最大分数。",
    "approachPreview": "我们设计一个函数 \\textit{dfs}(i)，表示从下标 i 出发，能够获得的最大分数。那么答案就是 \\textit{dfs}(0)。 函数 \\textit{dfs}(i) 的执行过程如下： 我们枚举下一个跳跃的位置 j，那么从下标 i 出发，能够获得的分数就是 (j - i) \\times \\textit{nums}[j]，加上从下标 j 出发，能够获得的最大分数，总分数就是 (j - i) \\times \\textit{nums}[j] + \\textit{dfs}(j)。我们枚举所有的 j，取分数的最大值即可。 为了避免重复计算，我们使用记忆化搜索的方法，将已经计算过的 \\textit{dfs}(i) 的值保存起来，下次直接返回即可。 时间复杂度 O(n^2)，空间复杂度 O(n)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和最大数组跳跃得分 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大数组跳跃得分 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大数组跳跃得分 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "25.7%",
    "difficulty": "中等",
    "frontendId": "3221",
    "paidOnly": true,
    "seriesKeys": [
      "maximum-array-hopping-score"
    ],
    "seriesPrimaryKey": "maximum-array-hopping-score",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3200-3299/3221.Maximum%20Array%20Hopping%20Score%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Maximum Array Hopping Score II",
    "titleCn": "最大数组跳跃得分 II",
    "titleSlug": "maximum-array-hopping-score-ii",
    "url": "https://leetcode.cn/problems/maximum-array-hopping-score-ii/description/",
    "statementPreview": "给定一个数组 nums，你必须从索引 0 开始跳跃，直到到达数组的最后一个元素，使得获取 最大 分数。 每一次 跳跃 中，你可以从下标 i 跳到一个 j > i 的下标，并且可以得到 (j - i) * nums[j] 的分数。 返回你能够取得的最大分数。",
    "approachPreview": "我们观察发现，对于当前位置 i，我们应该跳到下一个值最大的位置 j，这样才能获得最大的分数。 因此，我们遍历数组 \\textit{nums}，维护一个从栈底到栈顶单调递减的栈 \\textit{stk}。对于当前遍历到的位置 i，如果栈顶元素对应的值小于等于 \\textit{nums}[i]，我们就不断地弹出栈顶元素，直到栈为空或者栈顶元素对应的值大于 \\textit{nums}[i]，然后将 i 入栈。 然后，我们初始化答案 \\textit{ans} 和当前位置 i = 0，遍历栈中的元素，每次取出栈顶元素 j，更新答案 \\textit{ans} += \\textit{nums}[j] \\times (j - i)，然后更新 i = j。 最后返回答案 \\textit{ans}。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和最大数组跳跃得分 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大数组跳跃得分 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大数组跳跃得分 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.4%",
    "difficulty": "简单",
    "frontendId": "643",
    "paidOnly": false,
    "seriesKeys": [
      "maximum-average-subarray"
    ],
    "seriesPrimaryKey": "maximum-average-subarray",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0643.Maximum%20Average%20Subarray%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Maximum Average Subarray I",
    "titleCn": "子数组最大平均数 I",
    "titleSlug": "maximum-average-subarray-i",
    "url": "https://leetcode.cn/problems/maximum-average-subarray-i/description/",
    "statementPreview": "给你一个由 n 个元素组成的整数数组 nums 和一个整数 k。 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。 任何误差小于 10^-5 的答案都将被视为正确答案。",
    "approachPreview": "我们维护一个长度为 k 的滑动窗口，每次计算窗口内的和 s，取最大的和 s 作为答案。 时间复杂度 O(n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和子数组最大平均数 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 子数组最大平均数 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组最大平均数 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.6%",
    "difficulty": "困难",
    "frontendId": "644",
    "paidOnly": true,
    "seriesKeys": [
      "maximum-average-subarray"
    ],
    "seriesPrimaryKey": "maximum-average-subarray",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0644.Maximum%20Average%20Subarray%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Maximum Average Subarray II",
    "titleCn": "子数组最大平均数 II",
    "titleSlug": "maximum-average-subarray-ii",
    "url": "https://leetcode.cn/problems/maximum-average-subarray-ii/description/",
    "statementPreview": "给你一个包含 n 个整数的数组 nums，和一个整数 k。 请你找出 长度大于等于 k 且含最大平均值的连续子数组。并输出这个最大平均值。任何计算误差小于 10^-5 的结果都将被视为正确答案。",
    "approachPreview": "我们注意到，如果一个长度大于等于 k 的子数组的平均值为 v，那么最大平均数一定大于等于 v，否则最大平均数一定小于 v。因此，我们可以使用二分查找的方法找出最大平均数。 我们考虑二分查找的左右边界分别是什么？左边界 l 一定是数组中的最小值，而右边界 r 则是数组中的最大值。接下来，我们二分查找中点 mid，判断是否存在长度大于等于 k 的子数组的平均值大于等于 mid。如果存在，那么我们就将左边界 l 更新为 mid，否则我们就将右边界 r 更新为 mid。当左边界和右边界的差小于一个极小的非负数，即 r - l < \\epsilon 时，我们就可以得到最大平均数，其中 \\epsilon 表示一个极小的正数，可以取 10^{-5}。 问题的关键在于如何判断一个长度大于等于 k 的子数组的平均值是否大于等于 v。",
    "followUps": [
      {
        "question": "这题和子数组最大平均数 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 子数组最大平均数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷子数组最大平均数 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "82.3%",
    "difficulty": "中等",
    "frontendId": "654",
    "paidOnly": false,
    "seriesKeys": [
      "maximum-binary-tree"
    ],
    "seriesPrimaryKey": "maximum-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0654.Maximum%20Binary%20Tree/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Maximum Binary Tree",
    "titleCn": "最大二叉树",
    "titleSlug": "maximum-binary-tree",
    "url": "https://leetcode.cn/problems/maximum-binary-tree/description/",
    "statementPreview": "给定一个不重复的整数数组 nums。 最大二叉树 可以用下面的算法从 nums 递归地构建: 创建一个根节点，其值为 nums 中的最大值。 递归地在最大值 左边 的 子数组前缀上 构建左子树。 递归地在最大值 右边 的 子数组后缀上 构建右子树。 返回 nums 构建的 最大二叉树。",
    "approachPreview": "先找到数组 nums 的最大元素所在的位置 i，将 nums[i] 作为根节点，然后递归左右两侧的子数组，构建左右子树。 时间复杂度 O(n^2)，空间复杂度 O(n)，其中 n 是数组的长度。",
    "followUps": [
      {
        "question": "这题和最大二叉树系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大二叉树 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大二叉树系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.4%",
    "difficulty": "中等",
    "frontendId": "998",
    "paidOnly": false,
    "seriesKeys": [
      "maximum-binary-tree"
    ],
    "seriesPrimaryKey": "maximum-binary-tree",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0998.Maximum%20Binary%20Tree%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Maximum Binary Tree II",
    "titleCn": "最大二叉树 II",
    "titleSlug": "maximum-binary-tree-ii",
    "url": "https://leetcode.cn/problems/maximum-binary-tree-ii/description/",
    "statementPreview": "最大树 定义：一棵树，并满足：其中每个节点的值都大于其子树中的任何其他值。 给你最大树的根节点 root 和一个整数 val。 就像 之前的问题 那样，给定的树是利用 Construct(a) 例程从列表 a （ root = Construct(a) ）递归地构建的： 如果 a 为空，返回 null。 否则，令 a[i] 作为 a 的最大元素。创建一个值为 a[i] 的根节点 root。 root 的左子树将被构建为 Construct([a[0], a[1], ..., a[i - 1]])。 root 的右子树将被构建为 Construct([a[i + 1], a[i + 2], ..., a[a.length - 1]])。 返回 root。 请注意，题目没有直接给出 a，只是给出一个根节点 root = Construct(a)。 假设 b 是 a 的副本，并在末尾附加值 val。题目数据保证 b 中的值互不相同。 返回 Construct(b)。",
    "approachPreview": "如果 val 是最大数，那么将 val 作为新的根节点，root 作为新的根节点的左子树。 如果 val 不是最大数，由于 val 是在最后追加的数，那么一定是在 root 的右边，所以将 val 作为新节点插入 root 的右子树即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是树的节点数。",
    "followUps": [
      {
        "question": "这题和最大二叉树系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最大二叉树 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最大二叉树系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "35.1%",
    "difficulty": "中等",
    "frontendId": "1353",
    "paidOnly": false,
    "seriesKeys": [
      "maximum-number-of-events-that-can-be-attended"
    ],
    "seriesPrimaryKey": "maximum-number-of-events-that-can-be-attended",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1300-1399/1353.Maximum%20Number%20of%20Events%20That%20Can%20Be%20Attended/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Maximum Number of Events That Can Be Attended",
    "titleCn": "最多可以参加的会议数目",
    "titleSlug": "maximum-number-of-events-that-can-be-attended",
    "url": "https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/description/",
    "statementPreview": "给你一个数组 events，其中 events[i] = [startDay_i, endDay_i]，表示会议 i 开始于 startDay_i，结束于 endDay_i。 你可以在满足 startDay_i <= d <= endDay_i _ 中的任意一天 d 参加会议 i。在任意一天 d 中只能参加一场会议。 请你返回你可以参加的 最大 会议数目。",
    "approachPreview": "我们用一个哈希表 \\textit{g} 记录每个会议的开始和结束时间。键为会议的开始时间，值为一个列表，包含所有在该开始时间开始的会议的结束时间。用两个变量 \\textit{l} 和 \\textit{r} 分别记录会议的最小开始时间和最大结束时间。 对于从小到大每个在 \\textit{l} 到 \\textit{r} 的时间点 s，我们需要做以下操作： 1. 从优先队列中移除所有结束时间小于当前时间 s 的会议。 2. 将所有开始时间等于当前时间 s 的会议的结束时间加入优先队列中。 3. 如果优先队列不为空，则取出结束时间最小的会议，累加答案数，并从优先队列中移除该会议。 这样，我们可以确保在每个时间点 s，我们都能参加结束时间最早的会议，从而最大化参加的会议数。 时间复杂度 O(M \\times \\log n)，空间复杂度 O(n)，其中 M 和 n 分别为会议的最大结束时间和会议的数量。",
    "followUps": [
      {
        "question": "这题和最多可以参加的会议数目系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最多可以参加的会议数目 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最多可以参加的会议数目系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.8%",
    "difficulty": "困难",
    "frontendId": "1751",
    "paidOnly": false,
    "seriesKeys": [
      "maximum-number-of-events-that-can-be-attended"
    ],
    "seriesPrimaryKey": "maximum-number-of-events-that-can-be-attended",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1751.Maximum%20Number%20of%20Events%20That%20Can%20Be%20Attended%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Maximum Number of Events That Can Be Attended II",
    "titleCn": "最多可以参加的会议数目 II",
    "titleSlug": "maximum-number-of-events-that-can-be-attended-ii",
    "url": "https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended-ii/description/",
    "statementPreview": "给你一个 events 数组，其中 events[i] = [startDay_i, endDay_i, value_i]，表示第 i 个会议在 startDay_i _ 天开始，第 endDay_i 天结束，如果你参加这个会议，你能得到价值 value_i。同时给你一个整数 k 表示你能参加的最多会议数目。 你同一时间只能参加一个会议。如果你选择参加某个会议，那么你必须 完整 地参加完这个会议。会议结束日期是包含在会议内的，也就是说你不能同时参加一个开始日期与另一个结束日期相同的两个会议。 请你返回能得到的会议价值 最大和。",
    "approachPreview": "我们先将会议按照开始时间从小到大排序，然后设计一个函数 \\text{dfs}(i, k) 表示从第 i 个会议开始，最多参加 k 个会议的最大价值和。答案即为 \\text{dfs}(0, k)。 函数 \\text{dfs}(i, k) 的计算过程如下： 如果不参加第 i 个会议，那么最大价值和就是 \\text{dfs}(i + 1, k)；如果参加第 i 个会议，我们可以通过二分查找，找到第一个开始时间大于第 i 个会议结束时间的会议，记为 j，那么最大价值和就是 \\text{dfs}(j, k - 1) + \\text{value}[i]。取二者的较大值即可。即： \\text{dfs}(i, k) = \\max(\\text{dfs}(i + 1, k), \\text{dfs}(j, k - 1) + \\text{value}[i]) 其中 j 为第一个开始时间大于第 i 个会议结束时间的会议，可以通过二分查找得到。 由于函数 \\text{dfs}(i, k) 的计算过程中，会调用 \\text{dfs}(i + 1, k) 和 \\text{dfs}(j, k - 1)，因此我们可以使用记忆化搜索，将计算过的值保存下来，避免重复计算。 时间复杂度 O(n \\times \\log n + n \\times k)，空间复杂度 O(n \\times k)，其中 n 为会议数量。",
    "followUps": [
      {
        "question": "这题和最多可以参加的会议数目系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最多可以参加的会议数目 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最多可以参加的会议数目系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.7%",
    "difficulty": "困难",
    "frontendId": "924",
    "paidOnly": false,
    "seriesKeys": [
      "minimize-malware-spread"
    ],
    "seriesPrimaryKey": "minimize-malware-spread",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0924.Minimize%20Malware%20Spread/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Minimize Malware Spread",
    "titleCn": "尽量减少恶意软件的传播",
    "titleSlug": "minimize-malware-spread",
    "url": "https://leetcode.cn/problems/minimize-malware-spread/description/",
    "statementPreview": "给出了一个由 n 个节点组成的网络，用 n × n 个邻接矩阵图 graph 表示。在节点网络中，当 graph[i][j] = 1 时，表示节点 i 能够直接连接到另一个节点 j。 一些节点 initial 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。 假设 M(initial) 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。 如果从 initial 中 移除某一节点 能够最小化 M(initial)， 返回该节点。如果有多个节点满足条件，就返回 索引最小 的节点。 请注意，如果某个节点已从受感染节点的列表 initial 中删除，它以后仍有可能因恶意软件传播而受到感染。",
    "approachPreview": "根据题目描述，如果初始时有若干个节点属于同一个连通分量，那么一共可以分为三种情况： 1. 这些节点中没有一个节点被感染 1. 这些节点中只有一个节点被感染 1. 这些节点中有多个节点被感染 我们要考虑的是，移除某个感染节点后，剩下的节点中被感染的节点数最少。 情况一没有被感染的节点，不需要考虑；情况二只有一个节点被感染，那么移除这个节点后，该连通分量中的其他节点都不会被感染；情况三有多个节点被感染，那么移除任意一个感染节点后，该连通分量中的其他节点还是会被感染，所以我们只需要考虑情况二。 我们利用并查集 uf 维护节点的连通关系，用一个变量 ans 记录答案，用一个变量 mx 记录当前能减少感染的最大节点数，初始时 ans = n, mx = 0。 然后遍历数组 initial，用一个哈希表或者一个长度为 n 的数组 cnt 统计每个连通分量中被感染节点的个数。 接下来，我们再遍历数组 initial，对于每个节点 x，我们找到其所在的连通分量的根节点 root，如果该连通分量中只有一个被感染节点，即 cnt[root] = 1，我们就更新答案，更新的条件是该连通分量中的节点数 sz 大于 mx 或者 sz 等于 mx 且 x 的值小于 ans。 最后，如果 ans 没有被更新，说明所有的连通分量中都有多个被感染节点，那么我们返回 initial 中的最小值，否则返回 ans。",
    "followUps": [
      {
        "question": "这题和尽量减少恶意软件的传播系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 尽量减少恶意软件的传播 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷尽量减少恶意软件的传播系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.0%",
    "difficulty": "困难",
    "frontendId": "928",
    "paidOnly": false,
    "seriesKeys": [
      "minimize-malware-spread"
    ],
    "seriesPrimaryKey": "minimize-malware-spread",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0928.Minimize%20Malware%20Spread%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "title": "Minimize Malware Spread II",
    "titleCn": "尽量减少恶意软件的传播 II",
    "titleSlug": "minimize-malware-spread-ii",
    "url": "https://leetcode.cn/problems/minimize-malware-spread-ii/description/",
    "statementPreview": "给定一个由 n 个节点组成的网络，用 n x n 个邻接矩阵 graph 表示。在节点网络中，只有当 graph[i][j] = 1 时，节点 i 能够直接连接到另一个节点 j。 一些节点 initial 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。 假设 M(initial) 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。 我们可以从 initial 中 删除一个节点， 并完全移除该节点以及从该节点到任何其他节点的任何连接。 请返回移除后能够使 M(initial) 最小化的节点。如果有多个节点满足条件，返回索引 最小的节点。",
    "approachPreview": "我们可以使用并查集，将所有不在 initial 中的节点，并且满足 graph[i][j] = 1 的节点 (i, j) 进行合并。 接下来，我们创建一个哈希表 g，其中 g[i] 表示所有与节点 i 相连的连通分量的根节点。我们还需要一个计数器 cnt，用来统计每个根节点被多少个初始节点感染。 对于每个初始时被感染的节点 i，我们遍历所有与节点 i 相连的节点 j，如果节点 j 不在 initial 中，我们将节点 j 的根节点加入到集合 g[i] 中。同时，我们统计每个根节点被多少个初始节点感染，将结果保存到计数器 cnt 中。 然后，我们用一个变量 ans 记录答案，用 mx 记录最多可以减少的被感染节点的数量。初始时 ans = 0, mx = -1。 遍历所有初始时被感染的节点，对于每个节点 i，我们遍历 g[i] 中的所有根节点，如果根节点只被一个初始节点感染，我们累加这个根节点所在的连通分量的大小到 t 中。如果 t > mx 或者 t = mx 且 i < ans，我们更新 ans = i, mx = t。 最后返回 ans 即可。 时间复杂度 O(n^2 \\times \\alpha(n))，空间复杂度 O(n^2)。其中 n 是节点的数量，而 \\alpha(n) 是 Ackermann 函数的反函数。",
    "followUps": [
      {
        "question": "这题和尽量减少恶意软件的传播系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 尽量减少恶意软件的传播 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷尽量减少恶意软件的传播系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.1%",
    "difficulty": "中等",
    "frontendId": "2976",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-cost-to-convert-string"
    ],
    "seriesPrimaryKey": "minimum-cost-to-convert-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2900-2999/2976.Minimum%20Cost%20to%20Convert%20String%20I/README.md",
    "tags": [
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      }
    ],
    "title": "Minimum Cost to Convert String I",
    "titleCn": "转换字符串的最小成本 I",
    "titleSlug": "minimum-cost-to-convert-string-i",
    "url": "https://leetcode.cn/problems/minimum-cost-to-convert-string-i/description/",
    "statementPreview": "给你两个下标从 0 开始的字符串 source 和 target，它们的长度均为 n 并且由 小写 英文字母组成。 另给你两个下标从 0 开始的字符数组 original 和 changed，以及一个整数数组 cost，其中 cost[i] 代表将字符 original[i] 更改为字符 changed[i] 的成本。 你从字符串 source 开始。在一次操作中， 如果 存在 任意 下标 j 满足 cost[j] == z、 original[j] == x 以及 changed[j] == y。你就可以选择字符串中的一个字符 x 并以 z 的成本将其更改为字符 y。 返回将字符串 source 转换为字符串 target 所需的 最小 成本。如果不可能完成转换，则返回 -1。 注意，可能存在下标 i、 j 使得 original[j] == original[i] 且 changed[j] == changed[i]。",
    "approachPreview": "根据题目描述，我们可以将每个字母看作一个节点，每对字母的转换成本看作一条有向边。那么我们先初始化一个 26 \\times 26 的二维数组 g，其中 g[i][j] 表示字母 i 转换成字母 j 的最小成本。初始时 g[i][j] = \\infty，如果 i = j，那么 g[i][j] = 0。 然后我们遍历数组 original, changed 和 cost，对于每个下标 i，我们将 original[i] 转换成 changed[i] 的成本 cost[i] 更新到 g[original[i]][changed[i]] 中，取最小值。 接下来，我们使用 Floyd 算法计算出 g 中任意两个节点之间的最小成本。最后，我们遍历字符串 source 和 target，如果 source[i] \\neq target[i]，并且 g[source[i]][target[i]] \\geq \\infty，那么说明无法完成转换，返回 -1。否则，我们将 g[source[i]][target[i]] 累加到答案中。 遍历结束后，返回答案即可。 时间复杂度 O(m + n + \\Sigma ^3)，空间复杂度 O( \\Sigma ^2)。其中 m 和 n 分别是数组 original 和 source 的长度；而 \\Sigma 是字母表的大小，即 \\Sigma = 26。",
    "followUps": [
      {
        "question": "这题和转换字符串的最小成本 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 转换字符串的最小成本 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷转换字符串的最小成本 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.2%",
    "difficulty": "困难",
    "frontendId": "2977",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-cost-to-convert-string"
    ],
    "seriesPrimaryKey": "minimum-cost-to-convert-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2900-2999/2977.Minimum%20Cost%20to%20Convert%20String%20II/README.md",
    "tags": [
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "trie",
        "name": "字典树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      }
    ],
    "title": "Minimum Cost to Convert String II",
    "titleCn": "转换字符串的最小成本 II",
    "titleSlug": "minimum-cost-to-convert-string-ii",
    "url": "https://leetcode.cn/problems/minimum-cost-to-convert-string-ii/description/",
    "statementPreview": "给你两个下标从 0 开始的字符串 source 和 target，它们的长度均为 n 并且由 小写 英文字母组成。 另给你两个下标从 0 开始的字符串数组 original 和 changed，以及一个整数数组 cost，其中 cost[i] 代表将字符串 original[i] 更改为字符串 changed[i] 的成本。 你从字符串 source 开始。在一次操作中， 如果 存在 任意 下标 j 满足 cost[j] == z、 original[j] == x 以及 changed[j] == y，你就可以选择字符串中的 子串 x 并以 z 的成本将其更改为 y。 你可以执行 任意数量 的操作，但是任两次操作必须满足 以下两个 条件 之一： 在两次操作中选择的子串分别是 source[a..b] 和 source[c..d]，满足 b < c 或 d < a。换句话说，两次操作中选择的下标 不相交。 在两次操作中选择的子串分别是 source[a..b] 和 source[c..d]，满足 a == c 且 b == d。换句话说，两次操作中选择的下标 相同。 返回将字符串 source 转换为字符串 target 所需的 最小 成本。如果不可能完成转换，则返回 -1。",
    "approachPreview": "根据题目描述，我们可以将每个字符串看作一个节点，每对字符串的转换成本看作一条有向边。那么我们先初始化一个 26 \\times 26 的二维数组 g，其中 g[i][j] 表示字符串 i 转换成字符串 j 的最小成本。初始时 g[i][j] = \\infty，如果 i = j，那么 g[i][j] = 0。在这里，我们可以借助字典树存储 original 和 changed 中的字符串以及对应的整数编号。 然后，我们使用 Floyd 算法计算出任意两个字符串之间的最小成本。 接下来，我们定义函数 dfs(i) 表示将字符串 source[i..] 转换为字符串 target[i..] 所需的最小成本。那么答案就是 dfs(0)。 函数 dfs(i) 的计算过程如下： 如果 i \\geq source，说明不需要转换，返回 0。 否则，如果 source[i] = target[i]，那么可以直接跳过，我们直接递归计算 dfs(i + 1)。我们也可以在 [i, source ) 的范围内枚举下标 j，如果 source[i..j] 和 target[i..j] 都在字典树中，且其对应的整数编号 x 和 y 都大于等于 0，那么我们可以将 dfs(j + 1) 和 g[x][y] 相加，得到一种转换方案的成本，我们取所有方案中的最小值。",
    "followUps": [
      {
        "question": "这题和转换字符串的最小成本 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 转换字符串的最小成本 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷转换字符串的最小成本 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "67.8%",
    "difficulty": "中等",
    "frontendId": "931",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-falling-path-sum"
    ],
    "seriesPrimaryKey": "minimum-falling-path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0931.Minimum%20Falling%20Path%20Sum/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Minimum Falling Path Sum",
    "titleCn": "下降路径最小和",
    "titleSlug": "minimum-falling-path-sum",
    "url": "https://leetcode.cn/problems/minimum-falling-path-sum/description/",
    "statementPreview": "给你一个 n x n 的 方形 整数数组 matrix，请你找出并返回通过 matrix 的 下降路径 的 最小和。 下降路径 可以从第一行中的任何元素开始，并从每一行中选择一个元素。在下一行选择的元素和当前行所选元素最多相隔一列（即位于正下方或者沿对角线向左或者向右的第一个元素）。具体来说，位置 (row, col) 的下一个元素应当是 (row + 1, col - 1)、 (row + 1, col) 或者 (row + 1, col + 1)。",
    "approachPreview": "我们定义 f[i][j] 表示从第一行开始下降，到达第 i 行第 j 列的最小路径和。那么我们可以得到这样的动态规划转移方程： f[i][j] = matrix[i][j] + \\min \\left\\{ \\begin{aligned} & f[i - 1][j - 1], & j > 0 \\\\ & f[i - 1][j], & 0 \\leq j < n \\\\ & f[i - 1][j + 1], & j + 1 < n \\end{aligned} \\right. 最终的答案即为 \\min \\limits_{0 \\leq j < n} f[n - 1][j]。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。 我们注意到，状态 f[i][j] 只与上一行的状态有关，因此我们可以使用滚动数组的方式，去掉第一维的状态，将空间复杂度优化到 O(n)。",
    "followUps": [
      {
        "question": "这题和下降路径最小和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下降路径最小和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下降路径最小和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.5%",
    "difficulty": "困难",
    "frontendId": "1289",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-falling-path-sum"
    ],
    "seriesPrimaryKey": "minimum-falling-path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1289.Minimum%20Falling%20Path%20Sum%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Minimum Falling Path Sum II",
    "titleCn": "下降路径最小和  II",
    "titleSlug": "minimum-falling-path-sum-ii",
    "url": "https://leetcode.cn/problems/minimum-falling-path-sum-ii/description/",
    "statementPreview": "给你一个 n x n 整数矩阵 grid，请你返回 非零偏移下降路径 数字和的最小值。 非零偏移下降路径 定义为：从 grid 数组中的每一行选择一个数字，且按顺序选出来的数字中，相邻数字不在原数组的同一列。",
    "approachPreview": "我们定义 f[i][j] 表示前 i 行，且最后一个数字在第 j 列的最小数字和。那么状态转移方程为： f[i][j] = \\min_{k \\neq j} f[i - 1][k] + grid[i - 1][j] 其中 k 表示第 i - 1 行的数字在第 k 列，第 i 行第 j 列的数字为 grid[i - 1][j]。 最后答案为 f[n] 中的最小值。 时间复杂度 O(n^3)，空间复杂度 O(n^2)。其中 n 为矩阵的行数。 我们注意到，状态 f[i][j] 只与 f[i - 1][k] 有关，因此我们可以使用滚动数组优化空间复杂度，将空间复杂度优化到 O(n)。",
    "followUps": [
      {
        "question": "这题和下降路径最小和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下降路径最小和  II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下降路径最小和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "79.7%",
    "difficulty": "中等",
    "frontendId": "3191",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-operations-to-make-binary-array-elements-equal-to-one"
    ],
    "seriesPrimaryKey": "minimum-operations-to-make-binary-array-elements-equal-to-one",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3191.Minimum%20Operations%20to%20Make%20Binary%20Array%20Elements%20Equal%20to%20One%20I/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Minimum Operations to Make Binary Array Elements Equal to One I",
    "titleCn": "使二进制数组全部等于 1 的最少操作次数 I",
    "titleSlug": "minimum-operations-to-make-binary-array-elements-equal-to-one-i",
    "url": "https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/description/",
    "statementPreview": "给你一个二进制数组 nums。 你可以对数组执行以下操作 任意 次（也可以 0 次）： 选择数组中 任意连续 3 个元素，并将它们 全部反转。 反转 一个元素指的是将它的值从 0 变 1，或者从 1 变 0。 请你返回将 nums 中所有元素变为 1 的 最少 操作次数。如果无法全部变成 1，返回 -1。",
    "approachPreview": "我们注意到，数组中的第一个为 0 的位置，一定需要进行一次反转操作，否则无法将其变为 1。因此，我们可以顺序遍历数组，每次遇到 0，就将其后两个元素进行反转操作，累计一次操作次数。 遍历结束后，返回答案即可。 时间复杂度 O(n)，其中 n 为数组 \\textit{nums} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和使二进制数组全部等于 1 的最少操作次数 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 使二进制数组全部等于 1 的最少操作次数 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷使二进制数组全部等于 1 的最少操作次数 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.1%",
    "difficulty": "中等",
    "frontendId": "3192",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-operations-to-make-binary-array-elements-equal-to-one"
    ],
    "seriesPrimaryKey": "minimum-operations-to-make-binary-array-elements-equal-to-one",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3192.Minimum%20Operations%20to%20Make%20Binary%20Array%20Elements%20Equal%20to%20One%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Minimum Operations to Make Binary Array Elements Equal to One II",
    "titleCn": "使二进制数组全部等于 1 的最少操作次数 II",
    "titleSlug": "minimum-operations-to-make-binary-array-elements-equal-to-one-ii",
    "url": "https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii/description/",
    "statementPreview": "给你一个二进制数组 nums。 你可以对数组执行以下操作 任意 次（也可以 0 次）： 选择数组中 任意 一个下标 i，并将从下标 i 开始一直到数组末尾 所有 元素 反转。 反转 一个元素指的是将它的值从 0 变 1，或者从 1 变 0。 请你返回将 nums 中所有元素变为 1 的 最少 操作次数。",
    "approachPreview": "我们注意到，每当我们将某个位置的元素变为 1 时，它的右侧的所有元素都会被反转。因此，我们可以用一个变量 v 来记录当前位置及其右侧的元素是否被反转，如果被反转，那么 v 的值为 1，否则为 0。 我们遍历数组 \\textit{nums}，对于每个元素 x，我们将 x 与 v 进行异或运算，如果 x 为 0，那么我们需要将 x 变为 1，我们需要进行反转操作，我们将答案加一，并将 v 取反。 遍历结束后，我们就可以得到最少操作次数。 时间复杂度 O(n)，其中 n 为数组 \\textit{nums} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和使二进制数组全部等于 1 的最少操作次数 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 使二进制数组全部等于 1 的最少操作次数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷使二进制数组全部等于 1 的最少操作次数 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.0%",
    "difficulty": "简单",
    "frontendId": "3507",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-pair-removal-to-sort-array"
    ],
    "seriesPrimaryKey": "minimum-pair-removal-to-sort-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3507.Minimum%20Pair%20Removal%20to%20Sort%20Array%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Minimum Pair Removal to Sort Array I",
    "titleCn": "移除最小数对使数组有序 I",
    "titleSlug": "minimum-pair-removal-to-sort-array-i",
    "url": "https://leetcode.cn/problems/minimum-pair-removal-to-sort-array-i/description/",
    "statementPreview": "给你一个数组 nums，你可以执行以下操作任意次数： 选择 相邻 元素对中 和最小 的一对。如果存在多个这样的对，选择最左边的一个。 用它们的和替换这对元素。 返回将数组变为 非递减 所需的 最小操作次数。 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为 非递减。",
    "approachPreview": "我们定义一个函数 \\text{is\\_non\\_decreasing}(a)，用于判断数组 a 是否为非递减数组。 我们使用一个循环，直到数组 arr 为非递减数组为止。在每次循环中，我们找到数组 arr 中相邻元素对的和的最小值，并记录该对的左边元素的下标 k。然后，我们将该对的和替换左边的元素，并删除右边的元素。最后，我们返回操作的次数。 时间复杂度 O(n^2)，空间复杂度 O(n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和移除最小数对使数组有序 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 移除最小数对使数组有序 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷移除最小数对使数组有序 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.0%",
    "difficulty": "困难",
    "frontendId": "3510",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-pair-removal-to-sort-array"
    ],
    "seriesPrimaryKey": "minimum-pair-removal-to-sort-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3510.Minimum%20Pair%20Removal%20to%20Sort%20Array%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "doubly-linked-list",
        "name": "双向链表"
      },
      {
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Minimum Pair Removal to Sort Array II",
    "titleCn": "移除最小数对使数组有序 II",
    "titleSlug": "minimum-pair-removal-to-sort-array-ii",
    "url": "https://leetcode.cn/problems/minimum-pair-removal-to-sort-array-ii/description/",
    "statementPreview": "给你一个数组 nums，你可以执行以下操作任意次数： 选择 相邻 元素对中 和最小 的一对。如果存在多个这样的对，选择最左边的一个。 用它们的和替换这对元素。 返回将数组变为 非递减 所需的 最小操作次数。 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为 非递减。",
    "approachPreview": "我们定义一个有序集合 \\textit{sl} 来存储所有相邻元素对的和及其左侧下标的元组 (\\textit{s}, i)，定义另一个有序集合 \\textit{idx} 来存储当前数组中剩余元素的下标，并使用变量 \\textit{inv} 来记录当前数组中的逆序对数量。初始时，我们遍历数组 \\textit{nums}，将所有相邻元素对的和及其左侧下标的元组加入有序集合 \\textit{sl} 中，并计算逆序对数量 \\textit{inv}。 在每次操作中，我们从有序集合 \\textit{sl} 中取出和最小的元素对 (\\textit{s}, i)，那么我们可以得到下标 i 和 j（其中 j 是下标 i 在有序集合 \\textit{idx} 中的下一个下标）对应的元素对是当前数组中和最小的相邻元素对。如果 nums[i] > nums[j]，则说明该元素对是一个逆序对，合并替换后逆序对数量 \\textit{inv} 减一。 接下来，我们需要更新与下标 i 和 j 相关的元素对： 1. 如果下标 i 在有序集合 \\textit{idx} 中有前驱下标 h，则需要更新元素对 (h, i)。如果 nums[h] > nums[i]，则说明该元素对是一个逆序对，合并替换后逆序对数量 \\textit{inv} 减一。",
    "followUps": [
      {
        "question": "这题和移除最小数对使数组有序 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 移除最小数对使数组有序 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷移除最小数对使数组有序 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.0%",
    "difficulty": "困难",
    "frontendId": "3826",
    "paidOnly": false,
    "seriesKeys": [
      "minimum-partition-score"
    ],
    "seriesPrimaryKey": "minimum-partition-score",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3800-3899/3826.Minimum%20Partition%20Score/README.md",
    "tags": [
      {
        "slug": "queue",
        "name": "队列"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "monotonic-queue",
        "name": "单调队列"
      }
    ],
    "title": "Minimum Partition Score",
    "titleCn": "最小分割分数",
    "titleSlug": "minimum-partition-score",
    "url": "https://leetcode.cn/problems/minimum-partition-score/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。 你的任务是将 nums 分割成 恰好 k 个子数组，并返回所有有效分割方案中 最小可能的分数。 一个分割方案的 分数 是其所有子数组 值 的 总和。 子数组的 值 定义为 sumArr * (sumArr + 1) / 2，其中 sumArr 是该子数组元素的总和。 子数组 是数组中连续的非空元素序列。",
    "approachPreview": "最小分割分数 属于最小分割分数系列中的一个变体。主要标签是 队列、数组、分治、动态规划、前缀和、单调队列。先定义状态表示“处理到哪里、保留哪些限制资源”，再写清初始状态和转移来源；如果状态只依赖上一层，就用滚动数组或少量变量压缩空间。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和最小分割分数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小分割分数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最小分割分数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.8%",
    "difficulty": "困难",
    "frontendId": "3929",
    "paidOnly": true,
    "seriesKeys": [
      "minimum-partition-score"
    ],
    "seriesPrimaryKey": "minimum-partition-score",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3900-3999/3929.Minimum%20Partition%20Score%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Minimum Partition Score II",
    "titleCn": "最小分割分数 II",
    "titleSlug": "minimum-partition-score-ii",
    "url": "https://leetcode.cn/problems/minimum-partition-score-ii/description/",
    "statementPreview": "给你一个整数数组 nums 和一个整数 k。 你的任务是将 nums 分割成 恰好 k 个子数组，并返回所有有效分割方案中 最小可能的分数。 一个分割方案的 分数 是其所有子数组 值 的 总和。 子数组的 值 定义为 sumArr * (sumArr + 1) / 2，其中 sumArr 是该子数组元素的总和。 子数组 是数组中连续的非空元素序列。",
    "approachPreview": "子数组得分只由子数组和决定，先用前缀和 O(1) 求任意区间和及得分。再做 k 段划分 DP，状态表示前 i 个元素分成 t 段的最小总分，并结合数据规模选择优化。",
    "followUps": [
      {
        "question": "这题和最小分割分数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 最小分割分数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷最小分割分数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.7%",
    "difficulty": "简单",
    "frontendId": "496",
    "paidOnly": false,
    "seriesKeys": [
      "next-greater-element"
    ],
    "seriesPrimaryKey": "next-greater-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0496.Next%20Greater%20Element%20I/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Next Greater Element I",
    "titleCn": "下一个更大元素 I",
    "titleSlug": "next-greater-element-i",
    "url": "https://leetcode.cn/problems/next-greater-element-i/description/",
    "statementPreview": "nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。 给你两个 没有重复元素 的数组 nums1 和 nums2，下标从 0 开始计数，其中 nums1 是 nums2 的子集。 对于每个 0 <= i < nums1.length，找出满足 nums1[i] == nums2[j] 的下标 j，并且在 nums2 确定 nums2[j] 的 下一个更大元素。如果不存在下一个更大元素，那么本次查询的答案是 -1。 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素。",
    "approachPreview": "我们可以从右往左遍历数组 \\textit{nums2}，维护一个从栈顶到栈底单调递增的栈 \\textit{stk}，并且用哈希表 \\textit{d} 记录每个元素的下一个更大元素。 遍历到元素 x 时，如果栈不为空且栈顶元素小于 x，我们就不断弹出栈顶元素，直到栈为空或者栈顶元素大于等于 x。此时，如果栈不为空，栈顶元素就是 x 的下一个更大元素，否则 x 没有下一个更大元素。 最后我们遍历数组 \\textit{nums1}，根据哈希表 \\textit{d} 得到答案。 时间复杂度 O(m + n)，空间复杂度 O(n)。其中 m 和 n 分别为数组 \\textit{nums1} 和 \\textit{nums2} 的长度。",
    "followUps": [
      {
        "question": "这题和下一个更大元素 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下一个更大元素 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下一个更大元素 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.2%",
    "difficulty": "中等",
    "frontendId": "503",
    "paidOnly": false,
    "seriesKeys": [
      "next-greater-element"
    ],
    "seriesPrimaryKey": "next-greater-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0503.Next%20Greater%20Element%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Next Greater Element II",
    "titleCn": "下一个更大元素 II",
    "titleSlug": "next-greater-element-ii",
    "url": "https://leetcode.cn/problems/next-greater-element-ii/description/",
    "statementPreview": "给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素。 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。",
    "approachPreview": "题目需要我们找到每个元素的下一个更大元素，那么我们可以从后往前遍历数组，这样可以将问题为求上一个更大元素。另外，由于数组是循环的，我们可以将数组遍历两次。 具体地，我们从下标 n \\times 2 - 1 开始向前遍历数组，其中 n 是数组的长度。然后，我们记 j = i \\bmod n，其中 \\bmod 表示取模运算。如果栈不为空且栈顶元素小于等于 nums[j]，那么我们就不断地弹出栈顶元素，直到栈为空或者栈顶元素大于 nums[j]。此时，栈顶元素就是 nums[j] 的上一个更大元素，我们将其赋给 ans[j]。最后，我们将 nums[j] 入栈。继续遍历下一个元素。 遍历结束后，我们就可以得到数组 ans，它是数组 nums 中每个元素的下一个更大元素。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和下一个更大元素 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下一个更大元素 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下一个更大元素 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "37.0%",
    "difficulty": "中等",
    "frontendId": "556",
    "paidOnly": false,
    "seriesKeys": [
      "next-greater-element"
    ],
    "seriesPrimaryKey": "next-greater-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0556.Next%20Greater%20Element%20III/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Next Greater Element III",
    "titleCn": "下一个更大元素 III",
    "titleSlug": "next-greater-element-iii",
    "url": "https://leetcode.cn/problems/next-greater-element-iii/description/",
    "statementPreview": "给你一个正整数 n，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n。如果不存在这样的正整数，则返回 -1。 注意，返回的整数应当是一个 32 位整数，如果存在满足题意的答案，但不是 32 位整数，同样返回 -1。",
    "approachPreview": "下一个更大元素 III 属于下一个更大元素 I系列中的一个变体。主要标签是 数学、双指针、字符串。先确定窗口内必须维护的不变量，再移动右端扩展、移动左端恢复合法；计数类题要明确每次恢复合法后新增的是多少个候选。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和下一个更大元素 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下一个更大元素 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下一个更大元素 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.0%",
    "difficulty": "困难",
    "frontendId": "2454",
    "paidOnly": false,
    "seriesKeys": [
      "next-greater-element"
    ],
    "seriesPrimaryKey": "next-greater-element",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2400-2499/2454.Next%20Greater%20Element%20IV/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Next Greater Element IV",
    "titleCn": "下一个更大元素 IV",
    "titleSlug": "next-greater-element-iv",
    "url": "https://leetcode.cn/problems/next-greater-element-iv/description/",
    "statementPreview": "给你一个下标从 0 开始的非负整数数组 nums。对于 nums 中每一个整数，你必须找到对应元素的 第二大 整数。 如果 nums[j] 满足以下条件，那么我们称它为 nums[i] 的 第二大 整数： j > i nums[j] > nums[i] 恰好存在 一个 k 满足 i < k < j 且 nums[k] > nums[i]。 如果不存在 nums[j]，那么第二大整数为 -1。 比方说，数组 [1, 2, 4, 3] 中， 1 的第二大整数是 4， 2 的第二大整数是 3， 3 和 4 的第二大整数是 -1。 请你返回一个整数数组 answer，其中 answer[i] 是 nums[i] 的第二大整数。",
    "approachPreview": "我们可以将数组中的元素转成二元组 (x, i)，其中 x 为元素的值，i 为元素的下标。然后按照元素的值从大到小排序。 接下来，我们遍历排序后的数组，维护一个有序集合，其中存储的是元素的下标。当我们遍历到元素 (x, i) 时，所有大于 x 的元素的下标都已经在有序集合中了。我们只需要在有序集合中，找到 i 的下下一个元素的下标 j，那么 j 对应的元素就是 x 的第二大元素。然后，我们将 i 加入到有序集合中。继续遍历下一个元素。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和下一个更大元素 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 下一个更大元素 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷下一个更大元素 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "39.3%",
    "difficulty": "中等",
    "frontendId": "3513",
    "paidOnly": false,
    "seriesKeys": [
      "number-of-unique-xor-triplets"
    ],
    "seriesPrimaryKey": "number-of-unique-xor-triplets",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3513.Number%20of%20Unique%20XOR%20Triplets%20I/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Number of Unique XOR Triplets I",
    "titleCn": "不同 XOR 三元组的数目 I",
    "titleSlug": "number-of-unique-xor-triplets-i",
    "url": "https://leetcode.cn/problems/number-of-unique-xor-triplets-i/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums，其中 nums 是范围 [1, n] 内所有数的 排列。 XOR 三元组 定义为三个元素的异或值 nums[i] XOR nums[j] XOR nums[k]，其中 i <= j <= k。 返回所有可能三元组 (i, j, k) 中 不同 的 XOR 值的数量。 排列 是一个集合中所有元素的重新排列。",
    "approachPreview": "不同 XOR 三元组的数目 I 属于不同 XOR 三元组的数目 I系列中的一个变体。主要标签是 位运算、数组、数学。先把操作转成等价的公式、位状态或不变量，再减少枚举维度；实现时要明确溢出、取模和重复状态是否会影响答案。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和不同 XOR 三元组的数目 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同 XOR 三元组的数目 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同 XOR 三元组的数目 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "39.3%",
    "difficulty": "中等",
    "frontendId": "3514",
    "paidOnly": false,
    "seriesKeys": [
      "number-of-unique-xor-triplets"
    ],
    "seriesPrimaryKey": "number-of-unique-xor-triplets",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3500-3599/3514.Number%20of%20Unique%20XOR%20Triplets%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "title": "Number of Unique XOR Triplets II",
    "titleCn": "不同 XOR 三元组的数目 II",
    "titleSlug": "number-of-unique-xor-triplets-ii",
    "url": "https://leetcode.cn/problems/number-of-unique-xor-triplets-ii/description/",
    "statementPreview": "给你一个整数数组 nums。 XOR 三元组 定义为三个元素的异或值 nums[i] XOR nums[j] XOR nums[k]，其中 i <= j <= k。 返回所有可能三元组 (i, j, k) 中 不同 的 XOR 值的数量。",
    "approachPreview": "三元组允许 i <= j <= k，因此先统计任意两个数异或能得到的值，再与第三个数异或生成候选。值域较小时可以用布尔数组去重，最后统计可达 XOR 值个数。",
    "followUps": [
      {
        "question": "这题和不同 XOR 三元组的数目 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同 XOR 三元组的数目 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同 XOR 三元组的数目 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "75.1%",
    "difficulty": "中等",
    "frontendId": "131",
    "paidOnly": false,
    "seriesKeys": [
      "palindrome-partitioning"
    ],
    "seriesPrimaryKey": "palindrome-partitioning",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0131.Palindrome%20Partitioning/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Palindrome Partitioning",
    "titleCn": "分割回文串",
    "titleSlug": "palindrome-partitioning",
    "url": "https://leetcode.cn/problems/palindrome-partitioning/description/",
    "statementPreview": "给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串。返回 s 所有可能的分割方案。",
    "approachPreview": "我们可以使用动态规划，预处理出字符串中的任意子串是否为回文串，即 f[i][j] 表示子串 s[i..j] 是否为回文串。 接下来，我们设计一个函数 dfs(i)，表示从字符串的第 i 个字符开始，分割成若干回文串，当前分割方案为 t。 如果 i= s，说明已经分割完成，我们将 t 放入答案数组中，然后返回。 否则，我们可以从 i 开始，从小到大依次枚举结束位置 j，如果 s[i..j] 是回文串，那么就把 s[i..j] 加入到 t 中，然后继续递归 dfs(j+1)，回溯的时候要弹出 s[i..j]。 时间复杂度 O(n \\times 2^n)，空间复杂度 O(n^2)。其中 n 是字符串的长度。",
    "followUps": [
      {
        "question": "这题和分割回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割回文串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.2%",
    "difficulty": "困难",
    "frontendId": "132",
    "paidOnly": false,
    "seriesKeys": [
      "palindrome-partitioning"
    ],
    "seriesPrimaryKey": "palindrome-partitioning",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0132.Palindrome%20Partitioning%20II/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Palindrome Partitioning II",
    "titleCn": "分割回文串 II",
    "titleSlug": "palindrome-partitioning-ii",
    "url": "https://leetcode.cn/problems/palindrome-partitioning-ii/description/",
    "statementPreview": "给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串。 返回符合要求的 最少分割次数。",
    "approachPreview": "我们先预处理得到字符串 s 的每一个子串 s[i..j] 是否为回文串，记录在二维数组 g[i][j] 中，其中 g[i][j] 表示子串 s[i..j] 是否为回文串。 接下来，我们定义 f[i] 表示字符串 s[0..i-1] 的最少分割次数，初始时 f[i]=i。 接下来，我们考虑 f[i] 如何进行状态转移。我们可以枚举上一个分割点 j，如果子串 s[j..i] 是一个回文串，那么 f[i] 就可以从 f[j] 转移而来。如果 j=0，那么说明 s[0..i] 本身就是一个回文串，此时不需要进行分割，即 f[i]=0。因此，状态转移方程如下： f[i]=\\min_{0\\leq j \\leq i}\\begin{cases} f[j-1]+1, & \\textit{if}\\ g[j][i]=\\textit{True} \\\\ 0, & \\textit{if}\\ g[0][i]=\\textit{True} \\end{cases} 答案即为 f[n]，其中 n 是字符串 s 的长度。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和分割回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割回文串 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.8%",
    "difficulty": "困难",
    "frontendId": "1278",
    "paidOnly": false,
    "seriesKeys": [
      "palindrome-partitioning"
    ],
    "seriesPrimaryKey": "palindrome-partitioning",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1278.Palindrome%20Partitioning%20III/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Palindrome Partitioning III",
    "titleCn": "分割回文串 III",
    "titleSlug": "palindrome-partitioning-iii",
    "url": "https://leetcode.cn/problems/palindrome-partitioning-iii/description/",
    "statementPreview": "给你一个由小写字母组成的字符串 s，和一个整数 k。 请你按下面的要求分割字符串： 首先，你可以将 s 中的部分字符修改为其他的小写英文字母。 接着，你需要把 s 分割成 k 个非空且不相交的子串，并且每个子串都是回文串。 请返回以这种方式分割字符串所需修改的最少字符数。",
    "approachPreview": "我们定义 f[i][j] 表示将字符串 s 的前 i 个字符分割成 j 个回文串所需要的最少修改次数，我们假定 i 下标从 1 开始，答案为 f[n][k]。 对于 f[i][j]，我们可以枚举第 j-1 个回文串的最后一个字符的位置 h，那么 f[i][j] 就等于 f[h][j-1] + g[h][i-1] 的较小值，其中 g[h][i-1] 表示将字符串 s[h..i-1] 变成回文串所需要的最少修改次数（这一部分我们可以通过预处理得到，时间复杂度 O(n^2)。 时间复杂度 O(n^2 \\times k)，空间复杂度 O(n \\times (n + k))。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和分割回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割回文串 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.7%",
    "difficulty": "困难",
    "frontendId": "1745",
    "paidOnly": false,
    "seriesKeys": [
      "palindrome-partitioning"
    ],
    "seriesPrimaryKey": "palindrome-partitioning",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1700-1799/1745.Palindrome%20Partitioning%20IV/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Palindrome Partitioning IV",
    "titleCn": "分割回文串 IV",
    "titleSlug": "palindrome-partitioning-iv",
    "url": "https://leetcode.cn/problems/palindrome-partitioning-iv/description/",
    "statementPreview": "给你一个字符串 s，如果可以将它分割成三个 非空 回文子字符串，那么返回 true，否则返回 false。 当一个字符串正着读和反着读是一模一样的，就称其为 回文字符串。",
    "approachPreview": "我们定义 f[i][j] 表示字符串 s 的第 i 个字符到第 j 个字符是否为回文串，初始时 f[i][j] = \\textit{true}。 然后我们可以通过以下的状态转移方程来计算 f[i][j]： f[i][j] = \\begin{cases} \\textit{true}, & \\text{if } s[i] = s[j] \\text{ and } (i + 1 = j \\text{ or } f[i + 1][j - 1]) \\\\ \\textit{false}, & \\text{otherwise} \\end{cases} 由于 f[i][j] 依赖于 f[i + 1][j - 1]，因此，我们需要从大到小的顺序枚举 i，从小到大的顺序枚举 j，这样才能保证当计算 f[i][j] 时 f[i + 1][j - 1] 已经被计算过。 接下来，我们枚举第一个子串的右端点 i，第二个子串的右端点 j，那么第三个子串的左端点可以枚举的范围为 [j + 1, n - 1]，其中 n 是字符串 s 的长度。如果第一个子串 s[0..i]、第二个子串 s[i+1..j] 和第三个子串 s[j+1..n-1] 都是回文串，那么我们就找到了一种可行的分割方案，返回 \\textit{true}。 枚举完所有的分割方案后，如果没有找到符合要求的分割方案，那么返回 \\textit{false}。",
    "followUps": [
      {
        "question": "这题和分割回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割回文串 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.6%",
    "difficulty": "中等",
    "frontendId": "1136",
    "paidOnly": true,
    "seriesKeys": [
      "parallel-courses"
    ],
    "seriesPrimaryKey": "parallel-courses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1136.Parallel%20Courses/README.md",
    "tags": [
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      }
    ],
    "title": "Parallel Courses",
    "titleCn": "并行课程",
    "titleSlug": "parallel-courses",
    "url": "https://leetcode.cn/problems/parallel-courses/description/",
    "statementPreview": "给你一个整数 n，表示编号从 1 到 n 的 n 门课程。另给你一个数组 relations，其中 relations[i] = [prevCourse_i, nextCourse_i]，表示课程 prevCourse_i 和课程 nextCourse_i 之间存在先修关系：课程 prevCourse_i 必须在 nextCourse_i 之前修读完成。 在一个学期内，你可以学习 任意数量 的课程，但前提是你已经在 上 一学期修读完待学习课程的所有先修课程。 请你返回学完全部课程所需的 最少 学期数。如果没有办法做到学完全部这些课程的话，就返回 -1。",
    "approachPreview": "我们可以先将课程之间的先修关系建立图 g，并统计每个课程的入度 indeg。 然后我们将入度为 0 的课程入队，然后开始进行拓扑排序。每次从队列中取出一个课程，将其出队，并将其出度的课程的入度减 1，如果减 1 后入度为 0，则将该课程入队。当队列为空时，如果还有课程没有修完，则说明无法修完所有课程，返回 -1。否则返回修完所有课程所需的学期数。 时间复杂度 O(n + m)，空间复杂度 O(n + m)。其中 n 和 m 分别为课程数和先修关系数。",
    "followUps": [
      {
        "question": "这题和并行课程系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 并行课程 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷并行课程系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.5%",
    "difficulty": "困难",
    "frontendId": "1494",
    "paidOnly": false,
    "seriesKeys": [
      "parallel-courses"
    ],
    "seriesPrimaryKey": "parallel-courses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1494.Parallel%20Courses%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "bitmask",
        "name": "位掩码"
      }
    ],
    "title": "Parallel Courses II",
    "titleCn": "并行课程 II",
    "titleSlug": "parallel-courses-ii",
    "url": "https://leetcode.cn/problems/parallel-courses-ii/description/",
    "statementPreview": "给你一个整数 n 表示某所大学里课程的数目，编号为 1 到 n，数组 relations 中， relations[i] = [x_i, y_i] 表示一个先修课的关系，也就是课程 x_i 必须在课程 y_i _ 之前上。同时你还有一个整数 k。 在一个学期中，你 最多 可以同时上 k 门课，前提是这些课的先修课在之前的学期里已经上过了。 请你返回上完所有课最少需要多少个学期。题目保证一定存在一种上完所有课的方式。",
    "approachPreview": "我们用数组 d[i] 表示课程 i 的先修课程的集合。由于数据规模 n\\lt 15，我们可以用一个整数的二进制位（状态压缩）来表示集合，其中第 j 位为 1 表示课程 j 是课程 i 的先修课程。 我们用一个状态变量 cur 表示当前已经上过的课程的集合，初始时 cur=0。如果 cur=2^{n+1}-2，表示所有课程都上过了，返回当前学期即可。 如果课程 i 的先修课程 d[i] 的集合是 cur 的子集，说明课程 i 可以上。这样我们可以找到当前 cur 状态的下一个状态 nxt，表示后续学期可以上的课程集合。 如果 nxt 的二进制表示中 1 的个数小于等于 k，说明后续学期可以上的课程数不超过 k，我们就可以将 nxt 加入队列中。否则，说明后续学期可以上的课程数超过 k，那么我们就应该从后续可以上的课程中选择 k 门课程，这样才能保证后续学期可以上的课程数不超过 k。我们可以枚举 nxt 的所有子集，将子集加入队列中。 时间复杂度 O(3^n)，空间复杂度 O(2^n)。其中 n 是题目给定的课程数。",
    "followUps": [
      {
        "question": "这题和并行课程系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 并行课程 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷并行课程系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.4%",
    "difficulty": "困难",
    "frontendId": "2050",
    "paidOnly": false,
    "seriesKeys": [
      "parallel-courses"
    ],
    "seriesPrimaryKey": "parallel-courses",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2050.Parallel%20Courses%20III/README.md",
    "tags": [
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Parallel Courses III",
    "titleCn": "并行课程 III",
    "titleSlug": "parallel-courses-iii",
    "url": "https://leetcode.cn/problems/parallel-courses-iii/description/",
    "statementPreview": "给你一个整数 n，表示有 n 节课，课程编号从 1 到 n。同时给你一个二维整数数组 relations，其中 relations[j] = [prevCourse_j, nextCourse_j]，表示课程 prevCourse_j 必须在课程 nextCourse_j 之前 完成（先修课的关系）。同时给你一个下标从 0 开始的整数数组 time，其中 time[i] 表示完成第 (i+1) 门课程需要花费的 月份 数。 请你根据以下规则算出完成所有课程所需要的 最少 月份数： 如果一门课的所有先修课都已经完成，你可以在 任意 时间开始这门课程。 你可以 同时 上 任意门课程。 请你返回完成所有课程所需要的 最少 月份数。 注意： 测试数据保证一定可以完成所有课程（也就是先修课的关系构成一个有向无环图）。",
    "approachPreview": "我们首先根据给定的先修课程关系，构建出一个有向无环图，对该图进行拓扑排序，然后根据拓扑排序的结果，使用动态规划求出完成所有课程所需要的最少时间。 我们定义以下几个数据结构或变量： 邻接表 g 存储有向无环图，同时使用一个数组 indeg 存储每个节点的入度； 队列 q 存储所有入度为 0 的节点； 数组 f 存储每个节点的最早完成时间，初始时 f[i] = 0； 变量 ans 记录最终的答案，初始时 ans = 0； 当 q 非空时，依次取出队首节点 i，遍历 g[i] 中的每个节点 j，更新 f[j] = \\max(f[j], f[i] + time[j])，同时更新 ans = \\max(ans, f[j])，并将 j 的入度减 1，如果此时 j 的入度为 0，则将 j 加入队列 q 中； 最终返回 ans。 时间复杂度 O(m + n)，空间复杂度 O(m + n)。其中 m 是数组 relations 的长度。",
    "followUps": [
      {
        "question": "这题和并行课程系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 并行课程 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷并行课程系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.9%",
    "difficulty": "简单",
    "frontendId": "118",
    "paidOnly": false,
    "seriesKeys": [
      "pascals-triangle"
    ],
    "seriesPrimaryKey": "pascals-triangle",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0118.Pascal's%20Triangle/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Pascal's Triangle",
    "titleCn": "杨辉三角",
    "titleSlug": "pascals-triangle",
    "url": "https://leetcode.cn/problems/pascals-triangle/description/",
    "statementPreview": "给定一个非负整数 numRows， 生成「杨辉三角」的前 numRows 行。 在 「杨辉三角」 中，每个数是它左上方和右上方的数的和。",
    "approachPreview": "我们先创建一个答案数组 f，然后将 f 的第一行元素设为 [1]。接下来，我们从第二行开始，每一行的开头和结尾元素都是 1，其它 f[i][j] = f[i - 1][j - 1] + f[i - 1][j]。 时间复杂度 O(n^2)，其中 n 为给定的行数。忽略答案的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和杨辉三角系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 杨辉三角 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷杨辉三角系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.6%",
    "difficulty": "简单",
    "frontendId": "119",
    "paidOnly": false,
    "seriesKeys": [
      "pascals-triangle"
    ],
    "seriesPrimaryKey": "pascals-triangle",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0119.Pascal's%20Triangle%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Pascal's Triangle II",
    "titleCn": "杨辉三角 II",
    "titleSlug": "pascals-triangle-ii",
    "url": "https://leetcode.cn/problems/pascals-triangle-ii/description/",
    "statementPreview": "给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。 在「杨辉三角」中，每个数是它左上方和右上方的数的和。",
    "approachPreview": "我们创建一个长度为 rowIndex + 1 的数组 f，初始时所有元素均为 1。 接下来，我们从第 2 行开始，从后往前计算当前行的第 j 个元素的值 f[j] = f[j] + f[j - 1]，其中 j \\in [1, i - 1]。 最后返回 f 即可。 时间复杂度 O(n^2)，空间复杂度 O(n)。其中 n 是给定的行数。",
    "followUps": [
      {
        "question": "这题和杨辉三角系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 杨辉三角 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷杨辉三角系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "56.0%",
    "difficulty": "简单",
    "frontendId": "112",
    "paidOnly": false,
    "seriesKeys": [
      "path-sum"
    ],
    "seriesPrimaryKey": "path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0112.Path%20Sum/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Path Sum",
    "titleCn": "路径总和",
    "titleSlug": "path-sum",
    "url": "https://leetcode.cn/problems/path-sum/description/",
    "statementPreview": "给你二叉树的根节点 root 和一个表示目标和的整数 targetSum。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum。如果存在，返回 true；否则，返回 false。 叶子节点 是指没有子节点的节点。",
    "approachPreview": "从根节点开始，递归地对树进行遍历，并在遍历过程中更新节点的值为从根节点到该节点的路径和。当遍历到叶子节点时，判断该路径和是否等于目标值，如果相等则返回 true，否则返回 false。 时间复杂度 O(n)，其中 n 是二叉树的节点数。对每个节点访问一次。",
    "followUps": [
      {
        "question": "这题和路径总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 路径总和 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷路径总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "64.2%",
    "difficulty": "中等",
    "frontendId": "113",
    "paidOnly": false,
    "seriesKeys": [
      "path-sum"
    ],
    "seriesPrimaryKey": "path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0113.Path%20Sum%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Path Sum II",
    "titleCn": "路径总和 II",
    "titleSlug": "path-sum-ii",
    "url": "https://leetcode.cn/problems/path-sum-ii/description/",
    "statementPreview": "给你二叉树的根节点 root 和一个整数目标和 targetSum，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。 叶子节点 是指没有子节点的节点。",
    "approachPreview": "我们从根节点开始，递归遍历所有从根节点到叶子节点的路径，并记录路径和。当遍历到叶子节点时，如果此时路径和等于 targetSum，则将此路径加入答案。 时间复杂度 O(n^2)，其中 n 是二叉树的节点数。空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和路径总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 路径总和 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷路径总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.0%",
    "difficulty": "中等",
    "frontendId": "437",
    "paidOnly": false,
    "seriesKeys": [
      "path-sum"
    ],
    "seriesPrimaryKey": "path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0437.Path%20Sum%20III/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Path Sum III",
    "titleCn": "路径总和 III",
    "titleSlug": "path-sum-iii",
    "url": "https://leetcode.cn/problems/path-sum-iii/description/",
    "statementPreview": "给定一个二叉树的根节点 root，和一个整数 targetSum，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。",
    "approachPreview": "我们可以运用前缀和的思想，对二叉树进行递归遍历，同时用哈希表 \\textit{cnt} 统计从根节点到当前节点的路径上各个前缀和出现的次数。 我们设计一个递归函数 \\textit{dfs(node, s)}，表示当前遍历到的节点为 \\textit{node}，从根节点到当前节点的路径上的前缀和为 s。函数的返回值是统计以 \\textit{node} 节点及其子树节点作为路径终点且路径和为 \\textit{targetSum} 的路径数目。那么答案就是 \\textit{dfs(root, 0)}。 函数 \\textit{dfs(node, s)} 的递归过程如下： 如果当前节点 \\textit{node} 为空，则返回 0。 计算从根节点到当前节点的路径上的前缀和 s。 用 \\textit{cnt}[s - \\textit{targetSum}] 表示以当前节点为路径终点且路径和为 \\textit{targetSum} 的路径数目，其中 \\textit{cnt}[s - \\textit{targetSum}] 即为 \\textit{cnt} 中前缀和为 s - \\textit{targetSum} 的个数。 将前缀和 s 的计数值加 1，即 \\textit{cnt}[s] = \\textit{cnt}[s] + 1。 递归地遍历当前节点的左右子节点，即调用函数 \\textit{dfs(node.",
    "followUps": [
      {
        "question": "这题和路径总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 路径总和 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷路径总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.5%",
    "difficulty": "中等",
    "frontendId": "666",
    "paidOnly": true,
    "seriesKeys": [
      "path-sum"
    ],
    "seriesPrimaryKey": "path-sum",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0666.Path%20Sum%20IV/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Path Sum IV",
    "titleCn": "路径总和 IV",
    "titleSlug": "path-sum-iv",
    "url": "https://leetcode.cn/problems/path-sum-iv/description/",
    "statementPreview": "对于一棵深度小于 5 的树，可以用一组三位十进制整数来表示。给定一个由三位数组成的 递增 的数组 nums 表示一棵深度小于 5 的二叉树，对于每个整数： 百位上的数字表示这个节点的深度 d， 1 <= d <= 4。 十位上的数字表示这个节点在当前层所在的位置 p， 1 <= p <= 8。位置编号与一棵 满二叉树 的位置编号相同。 个位上的数字表示这个节点的权值 v， 0 <= v <= 9。 返回从 根 到所有 叶子结点 的 路径 之 和。 保证 给定的数组表示一个有效的连接二叉树。",
    "approachPreview": "把三位数编码拆成层、位置和值，用哈希表表示隐式二叉树。DFS 从根累加路径和，若当前节点没有左右孩子就是叶子，把当前路径和加入答案。",
    "followUps": [
      {
        "question": "这题和路径总和系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 路径总和 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷路径总和系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "74.8%",
    "difficulty": "中等",
    "frontendId": "116",
    "paidOnly": false,
    "seriesKeys": [
      "populating-next-right-pointers-in-each-node"
    ],
    "seriesPrimaryKey": "populating-next-right-pointers-in-each-node",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0116.Populating%20Next%20Right%20Pointers%20in%20Each%20Node/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Populating Next Right Pointers in Each Node",
    "titleCn": "填充每个节点的下一个右侧节点指针",
    "titleSlug": "populating-next-right-pointers-in-each-node",
    "url": "https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/",
    "statementPreview": "给定一个 完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下： struct Node { int val; Node *left; Node *right; Node *next; } 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。 初始状态下，所有 next 指针都被设置为 NULL。",
    "approachPreview": "填充每个节点的下一个右侧节点指针 属于填充每个节点的下一个右侧节点指针系列中的一个变体。主要标签是 树、深度优先搜索、广度优先搜索、链表、二叉树。先判断答案来自子树内部还是跨过当前节点，再用递归返回父节点真正需要的信息；带父指针或多节点条件时要额外维护访问来源。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和填充每个节点的下一个右侧节点指针系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 填充每个节点的下一个右侧节点指针 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷填充每个节点的下一个右侧节点指针系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.8%",
    "difficulty": "中等",
    "frontendId": "117",
    "paidOnly": false,
    "seriesKeys": [
      "populating-next-right-pointers-in-each-node"
    ],
    "seriesPrimaryKey": "populating-next-right-pointers-in-each-node",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0117.Populating%20Next%20Right%20Pointers%20in%20Each%20Node%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Populating Next Right Pointers in Each Node II",
    "titleCn": "填充每个节点的下一个右侧节点指针 II",
    "titleSlug": "populating-next-right-pointers-in-each-node-ii",
    "url": "https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/description/",
    "statementPreview": "给定一个二叉树： struct Node { int val; Node *left; Node *right; Node *next; } 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。 初始状态下，所有 next 指针都被设置为 NULL。",
    "approachPreview": "逐层连接 next 指针。可以用队列 BFS，也可以利用上一层已经建立的 next 链，扫描当前层时用 dummy 指针串起下一层所有孩子。",
    "followUps": [
      {
        "question": "这题和填充每个节点的下一个右侧节点指针系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 填充每个节点的下一个右侧节点指针 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷填充每个节点的下一个右侧节点指针系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "68.8%",
    "difficulty": "中等",
    "frontendId": "684",
    "paidOnly": false,
    "seriesKeys": [
      "redundant-connection"
    ],
    "seriesPrimaryKey": "redundant-connection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0684.Redundant%20Connection/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "graph",
        "name": "图"
      }
    ],
    "title": "Redundant Connection",
    "titleCn": "冗余连接",
    "titleSlug": "redundant-connection",
    "url": "https://leetcode.cn/problems/redundant-connection/description/",
    "statementPreview": "树可以看成是一个连通且 无环 的 无向 图。 给定一个图，该图从一棵 n 个节点 (节点值 1～n ) 的树中添加一条边后获得。添加的边的两个不同顶点编号在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges， edges[i] = [a_i, b_i] 表示图中在 ai 和 bi 之间存在一条边。 请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的那个。",
    "approachPreview": "根据题意，我们需要找到一条可以删去的边，删除后剩余部分是一个有着 n 个节点的树。我们可以遍历每一条边，判断这条边是否在同一个连通分量中。如果在同一个连通分量中，则说明这条边是多余的，可以删除，直接返回这条边即可。否则，我们将这条边所连接的两个节点合并到同一个连通分量中。 时间复杂度 O(n \\log n)，空间复杂度 O(n)。其中 n 为边的数量。",
    "followUps": [
      {
        "question": "这题和冗余连接系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 冗余连接 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷冗余连接系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "44.6%",
    "difficulty": "困难",
    "frontendId": "685",
    "paidOnly": false,
    "seriesKeys": [
      "redundant-connection"
    ],
    "seriesPrimaryKey": "redundant-connection",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0685.Redundant%20Connection%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "graph",
        "name": "图"
      }
    ],
    "title": "Redundant Connection II",
    "titleCn": "冗余连接 II",
    "titleSlug": "redundant-connection-ii",
    "url": "https://leetcode.cn/problems/redundant-connection-ii/description/",
    "statementPreview": "在本问题中，有根树指满足以下条件的 有向 图。该树只有一个根节点，所有其他节点都是该根节点的后继。该树除了根节点之外的每一个节点都有且只有一个父节点，而根节点没有父节点。 输入一个有向图，该图由一个有着 n 个节点（节点值不重复，从 1 到 n ）的树及一条附加的有向边构成。附加的边包含在 1 到 n 中的两个不同顶点间，这条附加的边不属于树中已存在的边。 结果图是一个以边组成的二维数组 edges。 每个元素是一对 [u_i, v_i]，用以表示 有向 图中连接顶点 u_i 和顶点 v_i 的边，其中 u_i 是 v_i 的一个父节点。 返回一条能删除的边，使得剩下的图是有 n 个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。",
    "approachPreview": "根据题目描述，对于一棵有根树，根节点的入度为 0，其余节点的入度为 1。在向树中添加一条边之后，可能会出现以下三种情况： 1. 添加的边指向了非根节点，该节点的入度变为 2，此时图中不存在有向环； 1. 添加的边指向了非根节点，该节点的入度变为 2，此时图中存在有向环； 1. 添加的边指向了根节点，根节点的入度变为 1，此时图中存在有向环，但不存在入度为 2 的节点。 因此，我们首先计算每个节点的入度，如果存在入度为 2 的节点，我们定位到该节点对应的两条边，分别记为 \\textit{dup}[0] 和 \\textit{dup}[1]。如果在删除 \\textit{dup}[1] 之后，剩余的边无法形成树，则说明 \\textit{dup}[0] 是需要删除的边；否则 \\textit{dup}[1] 是需要删除的边。 如果不存在入度为 2 的节点，我们遍历数组 \\textit{edges}，对于每条边 (u, v)，我们使用并查集维护节点之间的连通性。如果 u 和 v 已经连通，说明图中存在有向环，此时当前边即为需要删除的边。 时间复杂度 O(n \\log n)，空间复杂度 O(n)。其中 n 为边的数量。",
    "followUps": [
      {
        "question": "这题和冗余连接系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 冗余连接 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷冗余连接系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "73.7%",
    "difficulty": "简单",
    "frontendId": "1047",
    "paidOnly": false,
    "seriesKeys": [
      "remove-all-adjacent-duplicates-in-string"
    ],
    "seriesPrimaryKey": "remove-all-adjacent-duplicates-in-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1000-1099/1047.Remove%20All%20Adjacent%20Duplicates%20In%20String/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Remove All Adjacent Duplicates In String",
    "titleCn": "删除字符串中的所有相邻重复项",
    "titleSlug": "remove-all-adjacent-duplicates-in-string",
    "url": "https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/",
    "statementPreview": "给出由小写字母组成的字符串 s， 重复项删除操作 会选择两个相邻且相同的字母，并删除它们。 在 s 上反复执行重复项删除操作，直到无法继续删除。 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。",
    "approachPreview": "遍历字符串 s 中的每个字符 c，若栈为空或者栈顶值不等于字符 c，将 c 入栈，否则栈顶元素出栈。 最后返回栈中元素所组成的字符串。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和删除字符串中的所有相邻重复项系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除字符串中的所有相邻重复项 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除字符串中的所有相邻重复项系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.0%",
    "difficulty": "中等",
    "frontendId": "1209",
    "paidOnly": false,
    "seriesKeys": [
      "remove-all-adjacent-duplicates-in-string"
    ],
    "seriesPrimaryKey": "remove-all-adjacent-duplicates-in-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1209.Remove%20All%20Adjacent%20Duplicates%20in%20String%20II/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Remove All Adjacent Duplicates in String II",
    "titleCn": "删除字符串中的所有相邻重复项 II",
    "titleSlug": "remove-all-adjacent-duplicates-in-string-ii",
    "url": "https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string-ii/description/",
    "statementPreview": "给你一个字符串 s，「 k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。 你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。 在执行完所有删除操作后，返回最终得到的字符串。 本题答案保证唯一。",
    "approachPreview": "我们可以遍历字符串 s，维护一个栈，栈中存储的是字符和该字符出现的次数。当遍历到字符 c 时，如果栈顶元素的字符和 c 相同，则将栈顶元素的次数加一，否则将字符 c 和次数 1 入栈。当栈顶元素的次数等于 k 时，将栈顶元素出栈。 遍历完字符串 s 后，栈中存储的就是最终结果。我们可以将栈中的元素依次弹出，拼接成字符串即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和删除字符串中的所有相邻重复项系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除字符串中的所有相邻重复项 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除字符串中的所有相邻重复项系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.6%",
    "difficulty": "简单",
    "frontendId": "26",
    "paidOnly": false,
    "seriesKeys": [
      "remove-duplicates-from-sorted-array"
    ],
    "seriesPrimaryKey": "remove-duplicates-from-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0026.Remove%20Duplicates%20from%20Sorted%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "title": "Remove Duplicates from Sorted Array",
    "titleCn": "删除有序数组中的重复项",
    "titleSlug": "remove-duplicates-from-sorted-array",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/",
    "statementPreview": "给你一个 非严格递增排列 的数组 nums，请你 原地 删除重复出现的元素，使每个元素 只出现一次，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致。然后返回 nums 中唯一元素的个数。 考虑 nums 的唯一元素的数量为 k。去重后，返回唯一元素的数量 k。 nums 的前 k 个元素应包含 排序后 的唯一数字。下标 k - 1 之后的剩余元素可以忽略。 判题标准: 系统会用下面的代码来测试你的题解: int[] nums = [...]; // 输入数组 int[] expectedNums = [...]; // 长度正确的期望答案 int k = removeDuplicates(nums); // 调用 assert k == expectedNums.length; for (int i = 0; i < k; i++) { assert nums[i] == expectedNums[i]; } 如果所有断言都通过，那么您的题解将被 通过。",
    "approachPreview": "我们用一个变量 k 记录当前已经处理好的数组的长度，初始时 k=0，表示空数组。 然后我们从左到右遍历数组，对于遍历到的每个元素 x，如果 k=0 或者 x \\neq nums[k-1]，我们就将 x 放到 nums[k] 的位置，然后 k 自增 1。否则，x 与 nums[k-1] 相同，我们直接跳过这个元素。继续遍历，直到遍历完整个数组。 这样，当遍历结束时，nums 中前 k 个元素就是我们要求的答案，且 k 就是答案的长度。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 为数组的长度。 补充： 原问题要求最多相同的数字最多出现 1 次，我们可以扩展至相同的数字最多保留 k 个。 由于相同的数字最多保留 k 个，那么原数组的前 k 个元素我们可以直接保留； 对于后面的数字，能够保留的前提是：当前数字 x 与前面已保留的数字的倒数第 k 个元素比较，不同则保留，相同则跳过。 相似题目：",
    "followUps": [
      {
        "question": "这题和删除有序数组中的重复项系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除有序数组中的重复项 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除有序数组中的重复项系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "63.5%",
    "difficulty": "中等",
    "frontendId": "80",
    "paidOnly": false,
    "seriesKeys": [
      "remove-duplicates-from-sorted-array"
    ],
    "seriesPrimaryKey": "remove-duplicates-from-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0080.Remove%20Duplicates%20from%20Sorted%20Array%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "title": "Remove Duplicates from Sorted Array II",
    "titleCn": "删除有序数组中的重复项 II",
    "titleSlug": "remove-duplicates-from-sorted-array-ii",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/",
    "statementPreview": "给你一个有序数组 nums，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素 只出现两次，返回删除后数组的新长度。 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。 说明： 为什么返回数值是整数，但输出的答案是数组呢？ 请注意，输入数组是以 「引用」 方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。 你可以想象内部操作如下: // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝 int len = removeDuplicates(nums); // 在函数里修改输入数组对于调用者是可见的。 // 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。 for (int i = 0; i < len; i++) { print(nums[i]); }",
    "approachPreview": "我们用一个变量 k 记录当前已经处理好的数组的长度，初始时 k=0，表示空数组。 然后我们从左到右遍历数组，对于遍历到的每个元素 x，如果 k \\lt 2 或者 x \\neq nums[k-2]，我们就将 x 放到 nums[k] 的位置，然后 k 自增 1。否则，x 与 nums[k-2] 相同，我们直接跳过这个元素。继续遍历，直到遍历完整个数组。 这样，当遍历结束时，nums 中前 k 个元素就是我们要求的答案，且 k 就是答案的长度。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 为数组的长度。 补充： 原问题要求最多相同的数字最多出现 2 次，我们可以扩展至相同的数字最多保留 k 个。 由于相同的数字最多保留 k 个，那么原数组的前 k 个元素我们可以直接保留； 对于后面的数字，能够保留的前提是：当前数字 x 与前面已保留的数字的倒数第 k 个元素比较，不同则保留，相同则跳过。 相似题目：",
    "followUps": [
      {
        "question": "这题和删除有序数组中的重复项系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除有序数组中的重复项 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除有序数组中的重复项系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.4%",
    "difficulty": "中等",
    "frontendId": "82",
    "paidOnly": false,
    "seriesKeys": [
      "remove-duplicates-from-sorted-list"
    ],
    "seriesPrimaryKey": "remove-duplicates-from-sorted-list",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0082.Remove%20Duplicates%20from%20Sorted%20List%20II/README.md",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "title": "Remove Duplicates from Sorted List II",
    "titleCn": "删除排序链表中的重复元素 II",
    "titleSlug": "remove-duplicates-from-sorted-list-ii",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/",
    "statementPreview": "给定一个已排序的链表的头 head， 删除原始链表中所有重复数字的节点，只留下不同的数字。返回 已排序的链表。",
    "approachPreview": "我们先创建一个虚拟头节点 dummy，令 dummy.next = head，然后创建指针 pre 指向 dummy，指针 cur 指向 head，开始遍历链表。 当 cur 指向的节点值与 cur.next 指向的节点值相同时，我们就让 cur 不断向后移动，直到 cur 指向的节点值与 cur.next 指向的节点值不相同时，停止移动。此时，我们判断 pre.next 是否等于 cur，如果相等，说明 pre 与 cur 之间没有重复节点，我们就让 pre 移动到 cur 的位置；否则，说明 pre 与 cur 之间有重复节点，我们就让 pre.next 指向 cur.next。然后让 cur 继续向后移动。继续上述操作，直到 cur 为空，遍历结束。 最后，返回 dummy.next 即可。 时间复杂度 O(n)，其中 n 为链表的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和删除排序链表中的重复元素系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除排序链表中的重复元素 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除排序链表中的重复元素系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.8%",
    "difficulty": "简单",
    "frontendId": "83",
    "paidOnly": false,
    "seriesKeys": [
      "remove-duplicates-from-sorted-list"
    ],
    "seriesPrimaryKey": "remove-duplicates-from-sorted-list",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0083.Remove%20Duplicates%20from%20Sorted%20List/README.md",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "title": "Remove Duplicates from Sorted List",
    "titleCn": "删除排序链表中的重复元素",
    "titleSlug": "remove-duplicates-from-sorted-list",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/",
    "statementPreview": "给定一个已排序的链表的头 head， 删除所有重复的元素，使每个元素只出现一次。返回 已排序的链表。",
    "approachPreview": "我们用一个指针 cur 来遍历链表。如果当前 cur 与 cur.next 对应的元素相同，我们就将 cur 的 next 指针指向 cur 的下下个节点。否则，说明链表中 cur 对应的元素是不重复的，因此可以将 cur 指针移动到下一个节点。 遍历结束后，返回链表的头节点即可。 时间复杂度 O(n)，其中 n 是链表的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和删除排序链表中的重复元素系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 删除排序链表中的重复元素 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷删除排序链表中的重复元素系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.9%",
    "difficulty": "中等",
    "frontendId": "3439",
    "paidOnly": false,
    "seriesKeys": [
      "reschedule-meetings-for-maximum-free-time"
    ],
    "seriesPrimaryKey": "reschedule-meetings-for-maximum-free-time",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3400-3499/3439.Reschedule%20Meetings%20for%20Maximum%20Free%20Time%20I/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Reschedule Meetings for Maximum Free Time I",
    "titleCn": "重新安排会议得到最多空余时间 I",
    "titleSlug": "reschedule-meetings-for-maximum-free-time-i",
    "url": "https://leetcode.cn/problems/reschedule-meetings-for-maximum-free-time-i/description/",
    "statementPreview": "给你一个整数 eventTime 表示一个活动的总时长，这个活动开始于 t = 0，结束于 t = eventTime。 同时给你两个长度为 n 的整数数组 startTime 和 endTime。它们表示这次活动中 n 个时间 没有重叠 的会议，其中第 i 个会议的时间为 [startTime[i], endTime[i]]。 你可以重新安排 至多 k 个会议，安排的规则是将会议时间平移，且保持原来的 会议时长，你的目的是移动会议后 最大化 相邻两个会议之间的 最长 连续空余时间。 移动前后所有会议之间的 相对 顺序需要保持不变，而且会议时间也需要保持互不重叠。 请你返回重新安排会议以后，可以得到的 最大 空余时间。 注意，会议 不能 安排到整个活动的时间以外。",
    "approachPreview": "题目相当于把相邻的空闲时间段合并成一个更长的空闲时间段。一共有 n + 1 个空闲时间段，分别是： 第一个空闲时间段是从活动开始到第一个会议开始的时间段； 中间的 n - 1 个空闲时间段是相邻两个会议之间的时间段； 最后一个空闲时间段是最后一个会议结束到活动结束的时间段。 题目最多可以重新安排 k 个会议，等价于最多可以合并 k + 1 个空闲时间段。我们需要找到这 k + 1 个空闲时间段的最大长度。 我们可以将这些空闲时间段的长度存储在一个数组中 \\textit{nums} 中。然后，我们一个长度为 k + 1 的滑动窗口，遍历这个数组，计算每个窗口的和，找到最大的和，即为所求的最大空闲时间。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是会议的数量。",
    "followUps": [
      {
        "question": "这题和重新安排会议得到最多空余时间 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 重新安排会议得到最多空余时间 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷重新安排会议得到最多空余时间 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.0%",
    "difficulty": "中等",
    "frontendId": "3440",
    "paidOnly": false,
    "seriesKeys": [
      "reschedule-meetings-for-maximum-free-time"
    ],
    "seriesPrimaryKey": "reschedule-meetings-for-maximum-free-time",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3400-3499/3440.Reschedule%20Meetings%20for%20Maximum%20Free%20Time%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "title": "Reschedule Meetings for Maximum Free Time II",
    "titleCn": "重新安排会议得到最多空余时间 II",
    "titleSlug": "reschedule-meetings-for-maximum-free-time-ii",
    "url": "https://leetcode.cn/problems/reschedule-meetings-for-maximum-free-time-ii/description/",
    "statementPreview": "给你一个整数 eventTime 表示一个活动的总时长，这个活动开始于 t = 0，结束于 t = eventTime。 同时给你两个长度为 n 的整数数组 startTime 和 endTime。它们表示这次活动中 n 个时间 没有重叠 的会议，其中第 i 个会议的时间为 [startTime[i], endTime[i]]。 你可以重新安排 至多 一个会议，安排的规则是将会议时间平移，且保持原来的 会议时长，你的目的是移动会议后 最大化 最长 连续空余时间。 请你返回重新安排会议以后，可以得到的 最大 空余时间。 注意，会议 不能 安排到整个活动的时间以外，且会议之间需要保持互不重叠。 注意： 重新安排会议以后，会议之间的顺序可以发生改变。",
    "approachPreview": "根据题目描述，对于会议 i，我们记它左侧非空闲位置为 l_i，右侧非空闲位置为 r_i，记会议 i 的时长为 w_i = \\text{endTime}[i] - \\text{startTime}[i]，则： l_i = \\begin{cases} 0 & i = 0 \\\\\\\\ \\text{endTime}[i - 1] & i \\gt 0 \\end{cases} r_i = \\begin{cases} \\text{eventTime} & i = n - 1 \\\\\\\\ \\text{startTime}[i + 1] & i \\lt n - 1 \\end{cases} 那么它可以向左移动，也可以向右移动，此时空闲时间为： r_i - l_i - w_i 如果左侧存在最大的空闲时间 \\text{pre}_{i - 1}，满足 \\text{pre}_{i - 1} \\geq w_i，则可以将会议 i 向左移动到该位置，得到新的空闲时间： r_i - l_i 同理，如果右侧存在最大的空闲时间 \\text{suf}_{i + 1}，满足 \\text{suf}_{i + 1} \\geq w_i，则可以将会议 i 向右移动到该位置，得到新的空闲时间： r_i - l_i 因此，我们首先预处理两个数组 \\text{pre} 和 \\text{suf}，其中 \\text{pre}[i] 表示 [0, i] 范围内的最大空闲时间，\\text{。",
    "followUps": [
      {
        "question": "这题和重新安排会议得到最多空余时间 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 重新安排会议得到最多空余时间 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷重新安排会议得到最多空余时间 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "80.9%",
    "difficulty": "简单",
    "frontendId": "344",
    "paidOnly": false,
    "seriesKeys": [
      "reverse-string"
    ],
    "seriesPrimaryKey": "reverse-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0344.Reverse%20String/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse String",
    "titleCn": "反转字符串",
    "titleSlug": "reverse-string",
    "url": "https://leetcode.cn/problems/reverse-string/description/",
    "statementPreview": "编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。 不要给另外的数组分配额外的空间，你必须 原地 修改输入数组、使用 O(1) 的额外空间解决这一问题。",
    "approachPreview": "我们用两个指针 i 和 j，初始时分别指向数组的首尾，每次将 i 和 j 对应的元素交换，然后 i 向后移动，j 向前移动，直到 i 和 j 相遇。 时间复杂度 O(n)，其中 n 是数组的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和反转字符串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷反转字符串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.9%",
    "difficulty": "简单",
    "frontendId": "541",
    "paidOnly": false,
    "seriesKeys": [
      "reverse-string"
    ],
    "seriesPrimaryKey": "reverse-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0541.Reverse%20String%20II/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse String II",
    "titleCn": "反转字符串 II",
    "titleSlug": "reverse-string-ii",
    "url": "https://leetcode.cn/problems/reverse-string-ii/description/",
    "statementPreview": "给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。 如果剩余字符少于 k 个，则将剩余字符全部反转。 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。",
    "approachPreview": "我们可以遍历字符串 \\textit{s}，每次遍历 \\textit{2k} 个字符，然后利用双指针技巧，对这 \\textit{2k} 个字符中的前 \\textit{k} 个字符进行反转。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 \\textit{s} 的长度。",
    "followUps": [
      {
        "question": "这题和反转字符串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转字符串 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷反转字符串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.6%",
    "difficulty": "中等",
    "frontendId": "151",
    "paidOnly": false,
    "seriesKeys": [
      "reverse-words-in-a-string"
    ],
    "seriesPrimaryKey": "reverse-words-in-a-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0151.Reverse%20Words%20in%20a%20String/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse Words in a String",
    "titleCn": "反转字符串中的单词",
    "titleSlug": "reverse-words-in-a-string",
    "url": "https://leetcode.cn/problems/reverse-words-in-a-string/description/",
    "statementPreview": "给你一个字符串 s，请你反转字符串中 单词 的顺序。 单词 是由非空格字符组成的字符串。 s 中使用至少一个空格将字符串中的 单词 分隔开。 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。 注意： 输入字符串 s 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。",
    "approachPreview": "我们可以使用双指针 i 和 j，每次找到一个单词，将其添加到结果列表中，最后将结果列表反转，再拼接成字符串即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串的长度。",
    "followUps": [
      {
        "question": "这题和反转字符串中的单词系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转字符串中的单词 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷反转字符串中的单词系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.5%",
    "difficulty": "中等",
    "frontendId": "186",
    "paidOnly": true,
    "seriesKeys": [
      "reverse-words-in-a-string"
    ],
    "seriesPrimaryKey": "reverse-words-in-a-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0186.Reverse%20Words%20in%20a%20String%20II/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse Words in a String II",
    "titleCn": "反转字符串中的单词 II",
    "titleSlug": "reverse-words-in-a-string-ii",
    "url": "https://leetcode.cn/problems/reverse-words-in-a-string-ii/description/",
    "statementPreview": "给你一个字符数组 s，反转其中 单词 的顺序。 单词 的定义为：单词是一个由非空格字符组成的序列。 s 中的单词将会由单个空格分隔。 必须设计并实现 原地 解法来解决此问题，即不分配额外的空间。",
    "approachPreview": "我们可以遍历字符数组 s，利用双指针 i 和 j 找到每个单词的起始位置和结束位置，然后反转每个单词，最后再反转整个字符数组。 时间复杂度 O(n)，其中 n 为字符数组 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和反转字符串中的单词系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转字符串中的单词 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷反转字符串中的单词系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "73.7%",
    "difficulty": "简单",
    "frontendId": "557",
    "paidOnly": false,
    "seriesKeys": [
      "reverse-words-in-a-string"
    ],
    "seriesPrimaryKey": "reverse-words-in-a-string",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0557.Reverse%20Words%20in%20a%20String%20III/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Reverse Words in a String III",
    "titleCn": "反转字符串中的单词 III",
    "titleSlug": "reverse-words-in-a-string-iii",
    "url": "https://leetcode.cn/problems/reverse-words-in-a-string-iii/description/",
    "statementPreview": "给定一个字符串 s，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。",
    "approachPreview": "我们可以将字符串 \\textit{s} 按照空格分割成单词数组 \\textit{words}，然后将每个单词反转后再拼接成字符串。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 \\textit{s} 的长度。",
    "followUps": [
      {
        "question": "这题和反转字符串中的单词系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 反转字符串中的单词 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷反转字符串中的单词系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.6%",
    "difficulty": "中等",
    "frontendId": "74",
    "paidOnly": false,
    "seriesKeys": [
      "search-a-2d-matrix"
    ],
    "seriesPrimaryKey": "search-a-2d-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0074.Search%20a%202D%20Matrix/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Search a 2D Matrix",
    "titleCn": "搜索二维矩阵",
    "titleSlug": "search-a-2d-matrix",
    "url": "https://leetcode.cn/problems/search-a-2d-matrix/description/",
    "statementPreview": "给你一个满足下述两条属性的 m x n 整数矩阵： 每行中的整数从左到右按非严格递增顺序排列。 每行的第一个整数大于前一行的最后一个整数。 给你一个整数 target，如果 target 在矩阵中，返回 true；否则，返回 false。",
    "approachPreview": "我们将二维矩阵逻辑展开，然后二分查找即可。 时间复杂度 O(\\log (m \\times n))。其中 m 和 n 分别是矩阵的行数和列数。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和搜索二维矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 搜索二维矩阵 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷搜索二维矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.2%",
    "difficulty": "中等",
    "frontendId": "240",
    "paidOnly": false,
    "seriesKeys": [
      "search-a-2d-matrix"
    ],
    "seriesPrimaryKey": "search-a-2d-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0240.Search%20a%202D%20Matrix%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Search a 2D Matrix II",
    "titleCn": "搜索二维矩阵 II",
    "titleSlug": "search-a-2d-matrix-ii",
    "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/description/",
    "statementPreview": "编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性： 每行的元素从左到右升序排列。 每列的元素从上到下升序排列。 示例 1： 输入： matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5 输出： true 示例 2： 输入： matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20 输出： false",
    "approachPreview": "由于每一行的所有元素升序排列，因此，对于每一行，我们可以使用二分查找找到第一个大于等于 \\textit{target} 的元素，然后判断该元素是否等于 \\textit{target}。如果等于 \\textit{target}，说明找到了目标值，直接返回 \\text{true}。如果不等于 \\textit{target}，说明这一行的所有元素都小于 \\textit{target}，应该继续搜索下一行。 如果所有行都搜索完了，都没有找到目标值，说明目标值不存在，返回 \\text{false}。 时间复杂度 O(m \\times \\log n)，其中 m 和 n 分别为矩阵的行数和列数。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和搜索二维矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 搜索二维矩阵 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷搜索二维矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.2%",
    "difficulty": "中等",
    "frontendId": "33",
    "paidOnly": false,
    "seriesKeys": [
      "search-in-rotated-sorted-array"
    ],
    "seriesPrimaryKey": "search-in-rotated-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0033.Search%20in%20Rotated%20Sorted%20Array/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Search in Rotated Sorted Array",
    "titleCn": "搜索旋转排序数组",
    "titleSlug": "search-in-rotated-sorted-array",
    "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array/description/",
    "statementPreview": "整数数组 nums 按升序排列，数组中的值 互不相同。 在传递给函数之前， nums 在预先未知的某个下标 k （ 0 <= k < nums.length ）上进行了 向左旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] （下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 下标 3 上向左旋转后可能变为 [4,5,6,7,0,1,2]。 给你 旋转后 的数组 nums 和一个整数 target，如果 nums 中存在这个目标值 target，则返回它的下标，否则返回 -1。 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。",
    "approachPreview": "我们使用二分，将数组分割成 [left,.. mid], [mid + 1,.. right] 两部分，这时候可以发现，其中有一部分一定是有序的。 因此，我们可以根据有序的那一部分，判断 target 是否在这一部分中： 若 [0,.. mid] 范围内的元素构成有序数组： 若满足 nums[0] \\leq target \\leq nums[mid]，那么我们搜索范围可以缩小为 [left,.. mid]； 否则，在 [mid + 1,.. right] 中查找； 若 [mid + 1, n - 1] 范围内的元素构成有序数组： 若满足 nums[mid] \\lt target \\leq nums[n - 1]，那么我们搜索范围可以缩小为 [mid + 1,.. right]； 否则，在 [left,.. mid] 中查找。 二分查找终止条件是 left \\geq right，若结束后发现 nums[left] 与 target 不等，说明数组中不存在值为 target 的元素，返回 -1，否则返回下标 left。 时间复杂度 O(\\log n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和搜索旋转排序数组系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 搜索旋转排序数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷搜索旋转排序数组系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.5%",
    "difficulty": "中等",
    "frontendId": "81",
    "paidOnly": false,
    "seriesKeys": [
      "search-in-rotated-sorted-array"
    ],
    "seriesPrimaryKey": "search-in-rotated-sorted-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0081.Search%20in%20Rotated%20Sorted%20Array%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Search in Rotated Sorted Array II",
    "titleCn": "搜索旋转排序数组 II",
    "titleSlug": "search-in-rotated-sorted-array-ii",
    "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/description/",
    "statementPreview": "已知存在一个按非降序排列的整数数组 nums，数组中的值不必互不相同。 在传递给函数之前， nums 在预先未知的某个下标 k （ 0 <= k < nums.length ）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] （下标 从 0 开始 计数）。例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4]。 给你 旋转后 的数组 nums 和一个整数 target，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值 target，则返回 true，否则返回 false。 你必须尽可能减少整个操作步骤。",
    "approachPreview": "我们定义二分查找的左边界 l = 0，右边界 r = n - 1，其中 n 为数组的长度。 每次在二分查找的过程中，我们会得到当前的中点 \\textit{mid} = (l + r) / 2。 如果 \\textit{nums}[\\textit{mid}] > \\textit{nums}[r]，说明 [l, \\textit{mid}] 是有序的，此时如果 \\textit{nums}[l] \\le \\textit{target} \\le \\textit{nums}[\\textit{mid}]，说明 \\textit{target} 位于 [l, \\textit{mid}]，否则 \\textit{target} 位于 [\\textit{mid} + 1, r]。 如果 \\textit{nums}[\\textit{mid}] < \\textit{nums}[r]，说明 [\\textit{mid} + 1, r] 是有序的，此时如果 \\textit{nums}[\\textit{mid}] < \\textit{target} \\le \\textit{nums}[r]，说明 \\textit{target} 位于 [\\textit{mid} + 1, r]，否则 \\textit{target} 位于 [l, \\textit{mid}]。",
    "followUps": [
      {
        "question": "这题和搜索旋转排序数组系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 搜索旋转排序数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷搜索旋转排序数组系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "49.2%",
    "difficulty": "简单",
    "frontendId": "734",
    "paidOnly": true,
    "seriesKeys": [
      "sentence-similarity"
    ],
    "seriesPrimaryKey": "sentence-similarity",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0734.Sentence%20Similarity/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Sentence Similarity",
    "titleCn": "句子相似性",
    "titleSlug": "sentence-similarity",
    "url": "https://leetcode.cn/problems/sentence-similarity/description/",
    "statementPreview": "我们可以将一个句子表示为一个单词数组，例如，句子 \"I am happy with leetcode\" 可以表示为 arr = [\"I\",\"am\",happy\",\"with\",\"leetcode\"] 给定两个句子 sentence1 和 sentence2 分别表示为一个字符串数组，并给定一个字符串对 similarPairs，其中 similarPairs[i] = [x_i, y_i] 表示两个单词 x_i and y_i 是相似的。 如果 sentence1 和 sentence2 相似则返回 true，如果不相似则返回 false。 两个句子是相似的，如果: 它们具有 相同的长度 (即相同的字数) sentence1[i] 和 sentence2[i] 是相似的 请注意，一个词总是与它自己相似，也请注意，相似关系是不可传递的。例如，如果单词 a 和 b 是相似的，单词 b 和 c 也是相似的，那么 a 和 c 不一定相似。",
    "approachPreview": "我们首先判断 \\textit{sentence1} 和 \\textit{sentence2} 的长度是否相等，如果不相等则返回 \\text{false}。 然后我们使用一个哈希表 \\textit{s} 来存储所有相似的单词对，对于 \\textit{similarPairs} 中的每一个单词对 [x, y]，我们将 x 和 y 加入到哈希表 \\textit{s} 中。 接下来我们遍历 \\textit{sentence1} 和 \\textit{sentence2}，对于每一个位置 i，如果 \\textit{sentence1}[i] 不等于 \\textit{sentence2}[i]，并且 (\\textit{sentence1}[i], \\textit{sentence2}[i]) 和 (\\textit{sentence2}[i], \\textit{sentence1}[i]) 都不在哈希表 \\textit{s} 中，那么返回 \\text{false}。 如果遍历结束后都没有返回 \\text{false}，说明 \\textit{sentence1} 和 \\textit{sentence2} 是相似的，返回 \\text{true}。 时间复杂度 O(L)，空间复杂度 O(L)，其中 L 为题目中所有字符串的长度之和。",
    "followUps": [
      {
        "question": "这题和句子相似性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 句子相似性 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷句子相似性系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.0%",
    "difficulty": "中等",
    "frontendId": "737",
    "paidOnly": true,
    "seriesKeys": [
      "sentence-similarity"
    ],
    "seriesPrimaryKey": "sentence-similarity",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0700-0799/0737.Sentence%20Similarity%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Sentence Similarity II",
    "titleCn": "句子相似性 II",
    "titleSlug": "sentence-similarity-ii",
    "url": "https://leetcode.cn/problems/sentence-similarity-ii/description/",
    "statementPreview": "我们可以将一个句子表示为一个单词数组，例如，句子 I am happy with leetcode\" 可以表示为 arr = [\"I\",\"am\",happy\",\"with\",\"leetcode\"] 给定两个句子 sentence1 和 sentence2 分别表示为一个字符串数组，并给定一个字符串对 similarPairs，其中 similarPairs[i] = [x_i, y_i] 表示两个单词 x_i 和 y_i 是相似的。 如果 sentence1 和 sentence2 相似则返回 true，如果不相似则返回 false。 两个句子是相似的，如果: 它们具有 相同的长度 (即相同的词数) sentence1[i] 和 sentence2[i] 是相似的 请注意，一个词总是与它自己相似，也请注意，相似关系是可传递的。例如，如果单词 a 和 b 是相似的，单词 b 和 c 也是相似的，那么 a 和 c 也是 相似 的。",
    "approachPreview": "相似关系具有传递性，用并查集把所有相似单词合并。比较两个句子时长度必须相同，且每个位置的单词相同或属于同一个并查集集合。",
    "followUps": [
      {
        "question": "这题和句子相似性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 句子相似性 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷句子相似性系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.7%",
    "difficulty": "中等",
    "frontendId": "1813",
    "paidOnly": false,
    "seriesKeys": [
      "sentence-similarity"
    ],
    "seriesPrimaryKey": "sentence-similarity",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1800-1899/1813.Sentence%20Similarity%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Sentence Similarity III",
    "titleCn": "句子相似性 III",
    "titleSlug": "sentence-similarity-iii",
    "url": "https://leetcode.cn/problems/sentence-similarity-iii/description/",
    "statementPreview": "给定两个字符串 sentence1 和 sentence2，每个表示由一些单词组成的一个句子。句子是一系列由 单个 空格分隔的 单词，且开头和结尾没有多余空格。每个单词都只包含大写和小写英文字母。 如果两个句子 s1 和 s2，可以通过往其中一个句子插入一个任意的句子（可以是空句子）而得到另一个句子，那么我们称这两个句子是 相似的。 注意，插入的句子必须与现有单词用空白隔开。 比方说， s1 = \"Hello Jane\" 与 s2 = \"Hello my name is Jane\"，我们可以往 s1 中 \"Hello\" 和 \"Jane\" 之间插入 \"my name is\" 得到 s2。 s1 = \"Frog cool\" 与 s2 = \"Frogs are cool\" 不是相似的，因为尽管往 s1 中插入 \"s are\"，它没有与 \"Frog\" 用空格隔开。 给你两个句子 sentence1 和 sentence2，如果 sentence1 和 sentence2 是 相似 的，请你返回 true，否则返回 false。",
    "approachPreview": "我们将两个句子按照空格分割成两个单词数组 words1 和 words2，假设 words1 和 words2 的长度分别为 m 和 n，不妨设 m \\geq n。 我们使用双指针 i 和 j，初始时 i = j = 0。接下来，我们循环判断 words1[i] 是否等于 words2[i]，是则指针 i 继续右移；然后我们循环判断 words1[m - 1 - j] 是否等于 words2[n - 1 - j]，是则指针 j 继续右移。 循环结束后，如果 i + j \\geq n，说明两个句子相似，返回 true，否则返回 false。 时间复杂度 O(L)，空间复杂度 O(L)。其中 L 为两个句子的长度之和。",
    "followUps": [
      {
        "question": "这题和句子相似性系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 句子相似性 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷句子相似性系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.6%",
    "difficulty": "中等",
    "frontendId": "3453",
    "paidOnly": false,
    "seriesKeys": [
      "separate-squares"
    ],
    "seriesPrimaryKey": "separate-squares",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3400-3499/3453.Separate%20Squares%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      }
    ],
    "title": "Separate Squares I",
    "titleCn": "分割正方形 I",
    "titleSlug": "separate-squares-i",
    "url": "https://leetcode.cn/problems/separate-squares-i/description/",
    "statementPreview": "给你一个二维整数数组 squares，其中 squares[i] = [x_i, y_i, l_i] 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。 找到一个 最小的 y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 等于 该线以下正方形的总面积。 答案如果与实际答案的误差在 10^-5 以内，将视为正确答案。 注意：正方形 可能会 重叠。重叠区域应该被 多次计数。",
    "approachPreview": "根据题意，我们需要找到一个水平线，使得该线以上正方形的总面积等于该线以下正方形的总面积。由于随着 y 坐标的增加，线以下的面积会增加，线以上的面积会减少，因此我们可以使用二分查找来找到这个水平线的 y 坐标。 我们定义二分查找的左边界 l = 0，右边界 r = \\max(y_i + l_i)，即所有正方形的最高点。然后我们计算中间点 mid = (l + r) / 2，并计算该水平线以下的面积。如果该面积大于等于总面积的一半，则说明我们需要向下移动右边界 r，否则向上移动左边界 l。我们重复这个过程，直到左右边界的差小于一个很小的值（例如 10^{-5}）。 时间复杂度 O(n \\log(MU))，其中 n 是正方形的数量，而 M = 10^5, U = \\max(y_i + l_i)。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和分割正方形 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割正方形 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割正方形 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.4%",
    "difficulty": "困难",
    "frontendId": "3454",
    "paidOnly": false,
    "seriesKeys": [
      "separate-squares"
    ],
    "seriesPrimaryKey": "separate-squares",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3400-3499/3454.Separate%20Squares%20II/README.md",
    "tags": [
      {
        "slug": "segment-tree",
        "name": "线段树"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "line-sweep",
        "name": "扫描线"
      }
    ],
    "title": "Separate Squares II",
    "titleCn": "分割正方形 II",
    "titleSlug": "separate-squares-ii",
    "url": "https://leetcode.cn/problems/separate-squares-ii/description/",
    "statementPreview": "给你一个二维整数数组 squares，其中 squares[i] = [x_i, y_i, l_i] 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。 找到一个 最小的 y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 等于 该线以下正方形的总面积。 答案如果与实际答案的误差在 10^-5 以内，将视为正确答案。 注意：正方形 可能会 重叠。重叠区域只 统计一次。",
    "approachPreview": "本题可以使用扫描线算法来计算所有正方形的总面积。 我们将每个正方形的上下边界作为扫描线的事件点，按 y 坐标从小到大排序。对于每个事件点，我们使用线段树来维护当前扫描线下方被覆盖的 x 轴区间长度，从而计算出当前扫描线与上一个扫描线之间的面积增量。 具体步骤如下： 1. **预处理事件点**：对于每个正方形，计算其上下边界的 y 坐标，并将其作为事件点加入事件列表中。每个事件点包含 y 坐标、左边界 x_1、右边界 x_2 以及一个标志（表示是上边界还是下边界）。 2. **排序事件点**：将所有事件点按 y 坐标从小到大排序。 3. **构建线段树**：使用离散化后的 x 坐标构建线段树，用于维护当前被覆盖的 x 轴区间长度。 4. **扫描事件点**：遍历排序后的事件点列表，对于每个事件点： 计算当前事件点与上一个事件点之间的面积增量，并累加到总面积中。 根据当前事件点的类型（上边界或下边界），更新线段树，增加或减少对应的 x 轴区间覆盖计数。 5. **计算目标面积**：总面积的一半即为目标面积。 6. **再次扫描事件点**：再次遍历事件点列表，计算累计面积，当累计面积达到目标面积时，计算并返回对应的 y 坐标。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。其中 n 是正方形的数量。",
    "followUps": [
      {
        "question": "这题和分割正方形 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 分割正方形 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷分割正方形 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.1%",
    "difficulty": "简单",
    "frontendId": "3095",
    "paidOnly": false,
    "seriesKeys": [
      "shortest-subarray-with-or-at-least-k"
    ],
    "seriesPrimaryKey": "shortest-subarray-with-or-at-least-k",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3095.Shortest%20Subarray%20With%20OR%20at%20Least%20K%20I/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Shortest Subarray With OR at Least K I",
    "titleCn": "或值至少为 K 的最短子数组 I",
    "titleSlug": "shortest-subarray-with-or-at-least-k-i",
    "url": "https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-i/description/",
    "statementPreview": "给你一个 非负 整数数组 nums 和一个整数 k。 如果一个数组中所有元素的按位或运算 OR 的值 至少 为 k，那么我们称这个数组是 特别的。 请你返回 nums 中 最短特别非空 子数组 的长度，如果特别子数组不存在，那么返回 -1。",
    "approachPreview": "我们可以发现，如果我们固定子数组的左端点，随着右端点向右移动，子数组的按位或值只会增大，不会减小。因此我们可以使用双指针的方法，维护一个满足条件的子数组。 具体地，我们使用两个指针 i 和 j 分别表示子数组的左右端点，初始时两个指针都位于数组的第一个元素。用一个变量 s 表示子数组的按位或值，初始时 s 的值为 0。我们还需要维护一个长度为 32 的数组 cnt，表示子数组中每个元素的二进制表示中每一位的出现次数。 在每一步操作中，我们将 j 向右移动一位，更新 s 和 cnt。如果 s 的值大于等于 k，我们不断更新子数组的最小长度，并将 i 向右移动一位，直到 s 的值小于 k。在这个过程中，我们也需要更新 s 和 cnt。 最后，我们返回最小长度，如果不存在满足条件的子数组，则返回 -1。 时间复杂度 O(n \\times \\log M)，空间复杂度 O(\\log M)，其中 n 和 M 分别是数组的长度和数组中元素的最大值。",
    "followUps": [
      {
        "question": "这题和或值至少为 K 的最短子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 或值至少为 K 的最短子数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷或值至少为 K 的最短子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "51.7%",
    "difficulty": "中等",
    "frontendId": "3097",
    "paidOnly": false,
    "seriesKeys": [
      "shortest-subarray-with-or-at-least-k"
    ],
    "seriesPrimaryKey": "shortest-subarray-with-or-at-least-k",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3000-3099/3097.Shortest%20Subarray%20With%20OR%20at%20Least%20K%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "title": "Shortest Subarray With OR at Least K II",
    "titleCn": "或值至少为 K 的最短子数组 II",
    "titleSlug": "shortest-subarray-with-or-at-least-k-ii",
    "url": "https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/description/",
    "statementPreview": "给你一个 非负 整数数组 nums 和一个整数 k。 如果一个数组中所有元素的按位或运算 OR 的值 至少 为 k，那么我们称这个数组是 特别的。 请你返回 nums 中 最短特别非空 子数组 的长度，如果特别子数组不存在，那么返回 -1。",
    "approachPreview": "我们可以发现，如果我们固定子数组的左端点，随着右端点向右移动，子数组的按位或值只会增大，不会减小。因此我们可以使用双指针的方法，维护一个满足条件的子数组。 具体地，我们使用两个指针 i 和 j 分别表示子数组的左右端点，初始时两个指针都位于数组的第一个元素。用一个变量 s 表示子数组的按位或值，初始时 s 的值为 0。我们还需要维护一个长度为 32 的数组 cnt，表示子数组中每个元素的二进制表示中每一位的出现次数。 在每一步操作中，我们将 j 向右移动一位，更新 s 和 cnt。如果 s 的值大于等于 k，我们不断更新子数组的最小长度，并将 i 向右移动一位，直到 s 的值小于 k。在这个过程中，我们也需要更新 s 和 cnt。 最后，我们返回最小长度，如果不存在满足条件的子数组，则返回 -1。 时间复杂度 O(n \\times \\log M)，空间复杂度 O(\\log M)，其中 n 和 M 分别是数组的长度和数组中元素的最大值。 相似题目：",
    "followUps": [
      {
        "question": "这题和或值至少为 K 的最短子数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 或值至少为 K 的最短子数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷或值至少为 K 的最短子数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "76.7%",
    "difficulty": "简单",
    "frontendId": "136",
    "paidOnly": false,
    "seriesKeys": [
      "single-number"
    ],
    "seriesPrimaryKey": "single-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0136.Single%20Number/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Single Number",
    "titleCn": "只出现一次的数字",
    "titleSlug": "single-number",
    "url": "https://leetcode.cn/problems/single-number/description/",
    "statementPreview": "给你一个 非空 整数数组 nums，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。",
    "approachPreview": "异或运算的性质： 任何数和 0 做异或运算，结果仍然是原来的数，即 x \\oplus 0 = x； 任何数和其自身做异或运算，结果是 0，即 x \\oplus x = 0； 我们对该数组所有元素进行异或运算，结果就是那个只出现一次的数字。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 是数组 nums 的长度。",
    "followUps": [
      {
        "question": "这题和只出现一次的数字系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 只出现一次的数字 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷只出现一次的数字系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.5%",
    "difficulty": "中等",
    "frontendId": "137",
    "paidOnly": false,
    "seriesKeys": [
      "single-number"
    ],
    "seriesPrimaryKey": "single-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0137.Single%20Number%20II/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Single Number II",
    "titleCn": "只出现一次的数字 II",
    "titleSlug": "single-number-ii",
    "url": "https://leetcode.cn/problems/single-number-ii/description/",
    "statementPreview": "给你一个整数数组 nums，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次。 请你找出并返回那个只出现了一次的元素。 你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。",
    "approachPreview": "我们可以枚举每个二进制位 i，对于每个二进制位，我们统计所有数字在该二进制位上的和，如果该二进制位上的和能被 3 整除，那么只出现一次的数字在该二进制位上为 0，否则为 1。 时间复杂度 O(n \\times \\log M)，空间复杂度 O(1)。其中 n 和 M 分别是数组的长度和数组中元素的范围。",
    "followUps": [
      {
        "question": "这题和只出现一次的数字系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 只出现一次的数字 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷只出现一次的数字系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.6%",
    "difficulty": "中等",
    "frontendId": "260",
    "paidOnly": false,
    "seriesKeys": [
      "single-number"
    ],
    "seriesPrimaryKey": "single-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0260.Single%20Number%20III/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Single Number III",
    "titleCn": "只出现一次的数字 III",
    "titleSlug": "single-number-iii",
    "url": "https://leetcode.cn/problems/single-number-iii/description/",
    "statementPreview": "给你一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。 你必须设计并实现线性时间复杂度的算法且仅使用常量额外空间来解决此问题。",
    "approachPreview": "异或运算有以下性质： 任何数和 0 做异或运算，结果仍然是原来的数，即 x \\oplus 0 = x； 任何数和其自身做异或运算，结果是 0，即 x \\oplus x = 0； 由于数组中除了两个数字之外，其他数字都出现了两次，因此我们对数组中的所有数字进行异或运算，得到的结果即为两个只出现一次的数字的异或结果。 而由于这两个数字不相等，因此异或结果中至少存在一位为 1。我们可以通过 lowbit 运算找到异或结果中最低位的 1，并将数组中的所有数字按照该位是否为 1 分为两组，这样两个只出现一次的数字就被分到了不同的组中。 对两个组分别进行异或运算，即可得到两个只出现一次的数字 a 和 b。 时间复杂度 O(n)，其中 n 为数组长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和只出现一次的数字系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 只出现一次的数字 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷只出现一次的数字系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.4%",
    "difficulty": "简单",
    "frontendId": "905",
    "paidOnly": false,
    "seriesKeys": [
      "sort-array-by-parity"
    ],
    "seriesPrimaryKey": "sort-array-by-parity",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0905.Sort%20Array%20By%20Parity/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Sort Array By Parity",
    "titleCn": "按奇偶排序数组",
    "titleSlug": "sort-array-by-parity",
    "url": "https://leetcode.cn/problems/sort-array-by-parity/description/",
    "statementPreview": "给你一个整数数组 nums，将 nums 中的的所有偶数元素移动到数组的前面，后跟所有奇数元素。 返回满足此条件的 任一数组 作为答案。",
    "approachPreview": "我们用两个指针 i 和 j 分别指向数组的首尾，当 i < j 时，执行以下操作。 如果 nums[i] 为偶数，则 i 自增 1。 如果 nums[j] 为奇数，则 j 自减 1。 如果 nums[i] 为奇数，且 nums[j] 为偶数，则交换 nums[i] 和 nums[j]。然后 i 自增 1，而 j 自减 1。 最后返回数组 nums 即可。 时间复杂度 O(n)，其中 n 是数组 nums 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和按奇偶排序数组系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 按奇偶排序数组 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷按奇偶排序数组系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "72.3%",
    "difficulty": "简单",
    "frontendId": "922",
    "paidOnly": false,
    "seriesKeys": [
      "sort-array-by-parity"
    ],
    "seriesPrimaryKey": "sort-array-by-parity",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0922.Sort%20Array%20By%20Parity%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Sort Array By Parity II",
    "titleCn": "按奇偶排序数组 II",
    "titleSlug": "sort-array-by-parity-ii",
    "url": "https://leetcode.cn/problems/sort-array-by-parity-ii/description/",
    "statementPreview": "给定一个非负整数数组 nums， nums 中一半整数是 奇数，一半整数是 偶数。 对数组进行排序，以便当 nums[i] 为奇数时， i 也是 奇数；当 nums[i] 为偶数时， i 也是 偶数。 你可以返回 任何满足上述条件的数组作为答案。",
    "approachPreview": "我们用两个指针 i 和 j 分别指向偶数下标和奇数下标，初始时 i = 0, j = 1。 当 i 指向偶数下标时，如果 \\textit{nums}[i] 是奇数，那么我们需要找到一个奇数下标 j，使得 \\textit{nums}[j] 是偶数，然后交换 \\textit{nums}[i] 和 \\textit{nums}[j]。继续遍历，直到 i 指向数组末尾。 时间复杂度 O(n)，其中 n 是数组 \\textit{nums}[i] 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和按奇偶排序数组系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 按奇偶排序数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷按奇偶排序数组系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "55.3%",
    "difficulty": "中等",
    "frontendId": "54",
    "paidOnly": false,
    "seriesKeys": [
      "spiral-matrix"
    ],
    "seriesPrimaryKey": "spiral-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0054.Spiral%20Matrix/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Spiral Matrix",
    "titleCn": "螺旋矩阵",
    "titleSlug": "spiral-matrix",
    "url": "https://leetcode.cn/problems/spiral-matrix/description/",
    "statementPreview": "给你一个 m 行 n 列的矩阵 matrix，请按照 顺时针螺旋顺序，返回矩阵中的所有元素。",
    "approachPreview": "我们可以模拟整个遍历的过程，用 i 和 j 分别表示当前访问到的元素的行和列，用 k 表示当前的方向，用数组或哈希表 \\textit{vis} 记录每个元素是否被访问过。每次我们访问到一个元素后，将其标记为已访问，然后按照当前的方向前进一步，如果前进一步后发现越界或者已经访问过，则改变方向继续前进，直到遍历完整个矩阵。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和螺旋矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 螺旋矩阵 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷螺旋矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "69.4%",
    "difficulty": "中等",
    "frontendId": "59",
    "paidOnly": false,
    "seriesKeys": [
      "spiral-matrix"
    ],
    "seriesPrimaryKey": "spiral-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0059.Spiral%20Matrix%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Spiral Matrix II",
    "titleCn": "螺旋矩阵 II",
    "titleSlug": "spiral-matrix-ii",
    "url": "https://leetcode.cn/problems/spiral-matrix-ii/description/",
    "statementPreview": "给你一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix。",
    "approachPreview": "我们可以直接模拟螺旋矩阵的生成过程。 定义一个二维数组 \\textit{ans}，用于存储螺旋矩阵。用 i 和 j 分别表示当前位置的行号和列号，用 k 表示当前的方向编号，\\textit{dirs} 表示方向编号与方向的对应关系。 从 1 开始，依次填入矩阵中的每个位置。每次填入一个位置后，计算下一个位置的行号和列号，如果下一个位置不在矩阵中或者已经被填过，则改变方向，再计算下一个位置的行号和列号。 时间复杂度 O(n^2)，其中 n 是矩阵的边长。忽略答案数组的空间消耗，空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和螺旋矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 螺旋矩阵 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷螺旋矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "73.8%",
    "difficulty": "中等",
    "frontendId": "885",
    "paidOnly": false,
    "seriesKeys": [
      "spiral-matrix"
    ],
    "seriesPrimaryKey": "spiral-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0885.Spiral%20Matrix%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Spiral Matrix III",
    "titleCn": "螺旋矩阵 III",
    "titleSlug": "spiral-matrix-iii",
    "url": "https://leetcode.cn/problems/spiral-matrix-iii/description/",
    "statementPreview": "在 rows x cols 的网格上，你从单元格 (rStart, cStart) 面朝东面开始。网格的西北角位于第一行第一列，网格的东南角位于最后一行最后一列。 你需要以顺时针按螺旋状行走，访问此网格中的每个位置。每当移动到网格的边界之外时，需要继续在网格之外行走（但稍后可能会返回到网格边界）。 最终，我们到过网格的所有 rows x cols 个空间。 按照访问顺序返回表示网格位置的坐标列表。",
    "approachPreview": "螺旋矩阵 III 属于螺旋矩阵系列中的一个变体。主要标签是 数组、矩阵、模拟。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和螺旋矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 螺旋矩阵 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷螺旋矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "67.7%",
    "difficulty": "中等",
    "frontendId": "2326",
    "paidOnly": false,
    "seriesKeys": [
      "spiral-matrix"
    ],
    "seriesPrimaryKey": "spiral-matrix",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2326.Spiral%20Matrix%20IV/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Spiral Matrix IV",
    "titleCn": "螺旋矩阵 IV",
    "titleSlug": "spiral-matrix-iv",
    "url": "https://leetcode.cn/problems/spiral-matrix-iv/description/",
    "statementPreview": "给你两个整数： m 和 n，表示矩阵的维数。 另给你一个整数链表的头节点 head。 请你生成一个大小为 m x n 的螺旋矩阵，矩阵包含链表中的所有整数。链表中的整数从矩阵 左上角 开始、 顺时针 按 螺旋 顺序填充。如果还存在剩余的空格，则用 -1 填充。 返回生成的矩阵。",
    "approachPreview": "我们定义一个二维数组 \\textit{ans}，用来存放链表中的元素，初始时全部填充为 -1。定义三个变量 i, j, k，分别表示当前的行、列和方向。定义一个数组 \\textit{dirs}，表示四个方向的偏移量。 然后我们开始遍历链表，每次遍历一个节点，就将当前节点的值填充到 \\textit{ans}[i][j] 中，然后更新链表的指针，如果链表为空，说明所有的元素都已经填充完毕，退出循环。 否则，我们需要找到下一个元素的位置，我们可以通过当前位置 (i, j) 和当前方向 k 来计算下一个位置 (x, y)，如果 (x, y) 在矩阵的范围内，并且 \\textit{ans}[x][y] 为 -1，说明 (x, y) 还没有被填充过，我们就将 (x, y) 作为下一个位置，否则我们需要更换方向。 遍历完链表之后，我们就得到了一个螺旋矩阵，返回即可。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别表示矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和螺旋矩阵系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 螺旋矩阵 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷螺旋矩阵系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.1%",
    "difficulty": "中等",
    "frontendId": "877",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0800-0899/0877.Stone%20Game/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game",
    "titleCn": "石子游戏",
    "titleSlug": "stone-game",
    "url": "https://leetcode.cn/problems/stone-game/description/",
    "statementPreview": "Alice 和 Bob 用几堆石子在做游戏。一共有偶数堆石子， 排成一行；每堆都有 正 整数颗石子，数目为 piles[i]。 游戏以谁手中的石子最多来决出胜负。石子的 总数 是 奇数，所以没有平局。 Alice 和 Bob 轮流进行， Alice 先开始。 每回合，玩家从行的 开始 或 结束 处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中 石子最多 的玩家 获胜。 假设 Alice 和 Bob 都发挥出最佳水平，当 Alice 赢得比赛时返回 true，当 Bob 赢得比赛时返回 false。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，表示从第 i 堆石子到第 j 堆石子，当前玩家与另一个玩家的石子数量之差的最大值。那么答案就是 dfs(0, n - 1) \\gt 0。 函数 dfs(i, j) 的计算方法如下： 如果 i \\gt j，说明当前没有石子了，所以当前玩家没有石子可以拿，差值为 0，即 dfs(i, j) = 0。 否则，当前玩家有两种选择，如果选择第 i 堆石子，那么当前玩家与另一个玩家的石子数量之差为 piles[i] - dfs(i + 1, j)；如果选择第 j 堆石子，那么当前玩家与另一个玩家的石子数量之差为 piles[j] - dfs(i, j - 1)。当前玩家会选择两种情况中差值较大的情况，也就是说 dfs(i, j) = \\max(piles[i] - dfs(i + 1, j), piles[j] - dfs(i, j - 1))。 最后，我们只需要判断 dfs(0, n - 1) \\gt 0 即可。 为了避免重复计算，我们可以使用记忆化搜索的方法，用一个数组 f 记录所有的 dfs(i, j) 的值，当函数再次被调用到时，我们可以直接从 f 中取出答案而不需要重新计算。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 是石子的堆数。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.2%",
    "difficulty": "中等",
    "frontendId": "1140",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1100-1199/1140.Stone%20Game%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Stone Game II",
    "titleCn": "石子游戏 II",
    "titleSlug": "stone-game-ii",
    "url": "https://leetcode.cn/problems/stone-game-ii/description/",
    "statementPreview": "Alice 和 Bob 继续他们的石子游戏。许多堆石子 排成一行，每堆都有正整数颗石子 piles[i]。游戏以谁手中的石子最多来决出胜负。 Alice 和 Bob 轮流进行，Alice 先开始。最初， M = 1。 在每个玩家的回合中，该玩家可以拿走剩下的 前 X 堆的所有石子，其中 1 <= X <= 2M。然后，令 M = max(M, X)。 游戏一直持续到所有石子都被拿走。 假设 Alice 和 Bob 都发挥出最佳水平，返回 Alice 可以得到的最大数量的石头。",
    "approachPreview": "由于玩家每次可以拿走前 X 堆的所有石子，也就是说能拿走一个区间的石子，因此，我们可以先预处理出一个长度为 n+1 的前缀和数组 s，其中 s[i] 表示数组 piles 的前 i 个元素的和。 然后我们设计一个函数 dfs(i, m)，表示当前轮到的人可以从数组 piles 的下标 i 开始拿，且当前的 M 为 m 时，当前轮到的人能够拿到的最大石子数。初始时爱丽丝从下标 0 开始，且 M=1，所以我们需要求的答案为 dfs(0, 1)。 函数 dfs(i, m) 的计算过程如下： 如果当前轮到的人可以拿走剩下的所有石子，能够拿到的最大石子数为 s[n] - s[i]； 否则，当前轮到的人可以拿走剩下的前 x 堆的所有石子，其中 1 \\leq x \\leq 2m，能够拿到的最大石子数为 s[n] - s[i] - dfs(i + x, max(m, x))。也即是说，当前轮的人能够拿到的石子数为当前剩下的所有石子数减去下一轮对手能够拿到的石子数。我们需要枚举所有的 x，取其中的最大值作为函数 dfs(i, m) 的返回值。 为了避免重复计算，我们可以使用记忆化搜索。 最后，我们返回将 dfs(0, 1) 作为答案返回即可。 时间复杂度为 O(n^3)，空间复杂度为 O(n^2)。其中 n 为数组 piles 的长度。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.7%",
    "difficulty": "困难",
    "frontendId": "1406",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1400-1499/1406.Stone%20Game%20III/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game III",
    "titleCn": "石子游戏 III",
    "titleSlug": "stone-game-iii",
    "url": "https://leetcode.cn/problems/stone-game-iii/description/",
    "statementPreview": "Alice 和 Bob 继续他们的石子游戏。几堆石子 排成一行，每堆石子都对应一个得分，由数组 stoneValue 给出。 Alice 和 Bob 轮流取石子， Alice 总是先开始。在每个玩家的回合中，该玩家可以拿走剩下石子中的的前 1、2 或 3 堆石子。比赛一直持续到所有石头都被拿走。 每个玩家的最终得分为他所拿到的每堆石子的对应得分之和。每个玩家的初始分数都是 0。 比赛的目标是决出最高分，得分最高的选手将会赢得比赛，比赛也可能会出现平局。 假设 Alice 和 Bob 都采取 最优策略。 如果 Alice 赢了就返回 \"Alice\"， Bob 赢了就返回 \"Bob\"， 分数相同返回 \"Tie\"。",
    "approachPreview": "我们设计一个函数 dfs(i)，表示当前玩家在 [i, n) 范围内进行游戏时，可以获得的最大得分差值。如果 dfs(0) \\gt 0，则表示先手玩家 Alice 可以获胜；如果 dfs(0) \\lt 0，则表示后手玩家 Bob 可以获胜；否则，表示两人打成平局。 函数 dfs(i) 的执行逻辑如下： 如果 i \\geq n，说明当前没有石子可以拿了，直接返回 0 即可； 否则，我们枚举当前玩家拿走前 j+1 堆石子，其中 j \\in \\{0, 1, 2\\}，那么另一个玩家在下一轮可以获得的得分差值为 dfs(i + j + 1)，从而当前玩家可以获得的得分差值为 \\sum_{k=i}^{i+j} stoneValue[k] - dfs(i + j + 1)。我们要使得当前玩家的得分差值最大，因此可以用 \\max 函数得到最大得分差值，即： dfs(i) = \\max_{j \\in \\{0, 1, 2\\}} \\left\\{\\sum_{k=i}^{i+j} stoneValue[k] - dfs(i + j + 1)\\right\\} 为了防止重复计算，我们可以使用记忆化搜索。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 是石子的堆数。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.3%",
    "difficulty": "困难",
    "frontendId": "1510",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1510.Stone%20Game%20IV/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game IV",
    "titleCn": "石子游戏 IV",
    "titleSlug": "stone-game-iv",
    "url": "https://leetcode.cn/problems/stone-game-iv/description/",
    "statementPreview": "Alice 和 Bob 两个人轮流玩一个游戏，Alice 先手。 一开始，有 n 个石子堆在一起。每个人轮流操作，正在操作的玩家可以从石子堆里拿走 任意 非零 平方数 个石子。 如果石子堆里没有石子了，则无法操作的玩家输掉游戏。 给你正整数 n，且已知两个人都采取最优策略。如果 Alice 会赢得比赛，那么返回 True，否则返回 False。",
    "approachPreview": "我们设计一个函数 dfs(i)，表示当前石子堆中有 i 个石子时，当前玩家是否能赢得比赛。如果当前玩家能赢得比赛，则返回 true，否则返回 false。那么答案即为 dfs(n)。 函数 dfs(i) 的计算过程如下： 如果 i \\leq 0，说明当前玩家无法进行任何操作，因此当前玩家输掉比赛，返回 false； 否则，枚举当前玩家可以拿走的石子数量 j，其中 j 为平方数，如果当前玩家拿走 j 个石子后，另一个玩家无法赢得比赛，则当前玩家赢得比赛，返回 true。如果枚举完所有的 j，都无法满足上述条件，则当前玩家输掉比赛，返回 false。 为了避免重复计算，我们可以使用记忆化搜索，即使用数组 f 记录函数 dfs(i) 的计算结果。 时间复杂度 O(n \\times \\sqrt{n})，空间复杂度 O(n)。其中 n 为石子堆中石子的数量。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.3%",
    "difficulty": "困难",
    "frontendId": "1563",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1563.Stone%20Game%20V/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game V",
    "titleCn": "石子游戏 V",
    "titleSlug": "stone-game-v",
    "url": "https://leetcode.cn/problems/stone-game-v/description/",
    "statementPreview": "几块石子 排成一行，每块石子都有一个关联值，关联值为整数，由数组 stoneValue 给出。 游戏中的每一轮：Alice 会将这行石子分成两个 非空行 （即，左侧行和右侧行）；Bob 负责计算每一行的值，即此行中所有石子的值的总和。Bob 会丢弃值最大的行，Alice 的得分为剩下那行的值（每轮累加）。如果两行的值相等，Bob 让 Alice 决定丢弃哪一行。下一轮从剩下的那一行开始。 只 剩下一块石子 时，游戏结束。Alice 的分数最初为 0。 返回 Alice 能够获得的最大分数。",
    "approachPreview": "我们先预处理出前缀和数组 \\textit{s}，其中 \\textit{s}[i] 表示数组 \\textit{stoneValue} 前 i 个元素的和。 接下来，我们设计一个函数 \\textit{dfs}(i, j)，表示数组 \\textit{stoneValue} 中下标范围 [i, j] 内的石子，Alice 能够获得的最大分数。那么答案就是 \\textit{dfs}(0, n - 1)。 函数 \\textit{dfs}(i, j) 的计算过程如下： 如果 i \\geq j，说明只剩下一块石子，Alice 无法进行分割，因此返回 0。 否则，我们枚举分割点 k，即 i \\leq k < j，将数组 \\textit{stoneValue} 中下标范围 [i, j] 内的石子分割为 [i, k] 和 [k + 1, j] 两部分，计算出 a 和 b，分别表示两部分的石子总和。然后我们分别计算 \\textit{dfs}(i, k) 和 \\textit{dfs}(k + 1, j)，并更新答案。 注意，如果满足 a < b 并且 \\textit{ans} \\geq a \\times 2，那么这一次枚举可以跳过；如果满足 a > b 并且 \\textit{ans} \\geq b \\times 2，那么后续的枚举都可以跳过，直接退出循环。 最后，我们返回答案即可。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 V 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.5%",
    "difficulty": "中等",
    "frontendId": "1686",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1686.Stone%20Game%20VI/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Stone Game VI",
    "titleCn": "石子游戏 VI",
    "titleSlug": "stone-game-vi",
    "url": "https://leetcode.cn/problems/stone-game-vi/description/",
    "statementPreview": "Alice 和 Bob 轮流玩一个游戏，Alice 先手。 一堆石子里总共有 n 个石子，轮到某个玩家时，他可以 移出 一个石子并得到这个石子的价值。Alice 和 Bob 对石子价值有 不一样的的评判标准。双方都知道对方的评判标准。 给你两个长度为 n 的整数数组 aliceValues 和 bobValues。 aliceValues[i] 和 bobValues[i] 分别表示 Alice 和 Bob 认为第 i 个石子的价值。 所有石子都被取完后，得分较高的人为胜者。如果两个玩家得分相同，那么为平局。两位玩家都会采用 最优策略 进行游戏。 请你推断游戏的结果，用如下的方式表示： 如果 Alice 赢，返回 1。 如果 Bob 赢，返回 -1。 如果游戏平局，返回 0。",
    "approachPreview": "选取石头的最优化的策略是，让自己得分最高，同时让对手失分最多。因此，我们创建一个数组 vals，其中 vals[i] = (aliceValues[i] + bobValues[i], i)，表示第 i 个石头的总价值和编号。然后我们对 vals 按照总价值降序排序。 然后我们按照 vals 的顺序，让 Alice 和 Bob 交替选取石头。Alice 选取 vals 中的偶数位置的石头，Bob 选取 vals 中的奇数位置的石头。最后比较 Alice 和 Bob 的得分，返回对应的结果。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)，其中 n 为数组 aliceValues 和 bobValues 的长度。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 VI 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "中等",
    "frontendId": "1690",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1600-1699/1690.Stone%20Game%20VII/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game VII",
    "titleCn": "石子游戏 VII",
    "titleSlug": "stone-game-vii",
    "url": "https://leetcode.cn/problems/stone-game-vii/description/",
    "statementPreview": "石子游戏中，爱丽丝和鲍勃轮流进行自己的回合， 爱丽丝先开始。 有 n 块石子排成一排。每个玩家的回合中，可以从行中 移除 最左边的石头或最右边的石头，并获得与该行中剩余石头值之 和 相等的得分。当没有石头可移除时，得分较高者获胜。 鲍勃发现他总是输掉游戏（可怜的鲍勃，他总是输），所以他决定尽力 减小得分的差值。爱丽丝的目标是最大限度地 扩大得分的差值。 给你一个整数数组 stones，其中 stones[i] 表示 从左边开始 的第 i 个石头的值，如果爱丽丝和鲍勃都 发挥出最佳水平，请返回他们 得分的差值。",
    "approachPreview": "我们先预处理出前缀和数组 s，其中 s[i] 表示前 i 个石头的总和。 接下来，设计一个函数 dfs(i, j)，表示当剩下的石子为 stones[i], stones[i + 1], \\dots, stones[j] 时，先手与后手的得分差值。那么答案即为 dfs(0, n - 1)。 函数 dfs(i, j) 的计算过程如下： 如果 i \\gt j，说明当前没有石子，返回 0； 否则，先手有两种选择，分别是移除 stones[i] 或 stones[j]，然后计算得分差值，即 a = s[j + 1] - s[i + 1] - dfs(i + 1, j) 和 b = s[j] - s[i] - dfs(i, j - 1)，我们取两者中的较大值作为 dfs(i, j) 的返回值。 过程中，我们使用记忆化搜索，即使用数组 f 记录函数 dfs(i, j) 的返回值，避免重复计算。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 为石子的数量。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 VII 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "60.5%",
    "difficulty": "困难",
    "frontendId": "1872",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1800-1899/1872.Stone%20Game%20VIII/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "title": "Stone Game VIII",
    "titleCn": "石子游戏 VIII",
    "titleSlug": "stone-game-viii",
    "url": "https://leetcode.cn/problems/stone-game-viii/description/",
    "statementPreview": "Alice 和 Bob 玩一个游戏，两人轮流操作， Alice 先手。 总共有 n 个石子排成一行。轮到某个玩家的回合时，如果石子的数目 大于 1，他将执行以下操作： 选择一个整数 x > 1，并且 移除 最左边的 x 个石子。 将 移除 的石子价值之 和 累加到该玩家的分数中。 将一个 新的石子 放在最左边，且新石子的值为被移除石子值之和。 当只剩下 一个 石子时，游戏结束。 Alice 和 Bob 的 分数之差 为 (Alice 的分数 - Bob 的分数)。 Alice 的目标是 最大化 分数差，Bob 的目标是 最小化 分数差。 给你一个长度为 n 的整数数组 stones，其中 stones[i] 是 从左边起 第 i 个石子的价值。请你返回在双方都采用 最优 策略的情况下，Alice 和 Bob 的 分数之差。",
    "approachPreview": "根据题目描述，每次取走最左边的 x 个石子，把它们的和加到自己的分数中，然后把一个价值为这个和的石子放在最左边，相当于把这 x 个石子合并成了一个价值为这个和的石子，前缀和不变。 我们可以用一个长度为 n 的前缀和数组 s 来表示数组 stones 的前缀和，其中 s[i] 表示 stones[0..i] 的元素和。 接下来，我们设计一个函数 dfs(i)，表示当前从 stones[i:] 中取石子，返回当前玩家能得到的最大分数差。 函数 dfs(i) 的执行过程如下： 如果 i \\geq n - 1，说明当前只能取走全部石子，因此返回 s[n - 1]。 否则，我们可以选择从 stones[i + 1:] 中取走全部石子，得到的分数差为 dfs(i + 1)；也可以选择取走 stones[:i] 的石子，得到的分数差为 s[i] - dfs(i + 1)。我们取两种情况中的最大值，即为当前玩家能得到的最大分数差。 最终，我们可以得到 Alice 和 Bob 的分数之差为 dfs(1)，即 Alice 必须从 stones[1:] 中取石子开始游戏。 为了避免重复计算，我们可以使用记忆化搜索。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 stones 的长度。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 VIII 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "46.6%",
    "difficulty": "中等",
    "frontendId": "2029",
    "paidOnly": false,
    "seriesKeys": [
      "stone-game"
    ],
    "seriesPrimaryKey": "stone-game",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2000-2099/2029.Stone%20Game%20IX/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "title": "Stone Game IX",
    "titleCn": "石子游戏 IX",
    "titleSlug": "stone-game-ix",
    "url": "https://leetcode.cn/problems/stone-game-ix/description/",
    "statementPreview": "Alice 和 Bob 再次设计了一款新的石子游戏。现有一行 n 个石子，每个石子都有一个关联的数字表示它的价值。给你一个整数数组 stones，其中 stones[i] 是第 i 个石子的价值。 Alice 和 Bob 轮流进行自己的回合， Alice 先手。每一回合，玩家需要从 stones 中移除任一石子。 如果玩家移除石子后，导致 所有已移除石子 的价值 总和 可以被 3 整除，那么该玩家就 输掉游戏。 如果不满足上一条，且移除后没有任何剩余的石子，那么 Bob 将会直接获胜（即便是在 Alice 的回合）。 假设两位玩家均采用 最佳 决策。如果 Alice 获胜，返回 true；如果 Bob 获胜，返回 false。",
    "approachPreview": "由于玩家的目标是使得已移除石子的价值总和不能被 3 整除，因此我们只需要考虑每个石子的价值对 3 的余数即可。 我们用一个长度为 3 的数组 \\textit{cnt} 维护当前剩余石子的价值对 3 的余数的个数，其中 \\textit{cnt}[0] 表示余数为 0 的个数，而 \\textit{cnt}[1] 和 \\textit{cnt}[2] 分别表示余数为 1 和 2 的个数。 在第一回合，Alice 不能移除余数为 0 的石子，因为这样会使得已移除石子的价值总和能被 3 整除。因此，Alice 只能移除余数为 1 或 2 的石子。 我们首先考虑 Alice 移除余数为 1 的石子的情况。如果 Alice 移除了一个余数为 1 的石子，石子 0 对石子价值总和对 3 的余数不会改变，因此价值对 3 的余数为 0 的石子可以在任意回合被移除，我们暂时不考虑。所以 Bob 也只能移除余数为 1 的石子，之后 Alice 移除余数为 2 的石子，依次进行，序列为 1, 1, 2, 1, 2, \\ldots。在这种情况下，如果最终回合数为奇数，且还有剩余石子，那么 Alice 获胜，否则 Bob 获胜。 对于第一回合 Alice 移除余数为 2 的石子的情况，我们可以得到类似的结论。 时间复杂度 O(n)，其中 n 是数组 \\textit{stones} 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和石子游戏系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 石子游戏 IX 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷石子游戏系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.1%",
    "difficulty": "困难",
    "frontendId": "664",
    "paidOnly": false,
    "seriesKeys": [
      "strange-printer"
    ],
    "seriesPrimaryKey": "strange-printer",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0664.Strange%20Printer/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Strange Printer",
    "titleCn": "奇怪的打印机",
    "titleSlug": "strange-printer",
    "url": "https://leetcode.cn/problems/strange-printer/description/",
    "statementPreview": "有台奇怪的打印机有以下两个特殊要求： 打印机每次只能打印由 同一个字符 组成的序列。 每次可以在从起始到结束的任意位置打印新字符，并且会覆盖掉原来已有的字符。 给你一个字符串 s，你的任务是计算这个打印机打印它需要的最少打印次数。",
    "approachPreview": "我们定义 f[i][j] 表示打印完成区间 s[i..j] 的最少操作数，初始时 f[i][j]=\\infty，答案为 f[0][n-1]，其中 n 是字符串 s 的长度。 考虑 f[i][j]，如果 s[i] = s[j]，那么我们在打印 s[i] 时可以顺便打印 s[j]，这样我们即可忽略字符 s[j]，在区间 s[i+1..j-1] 内继续进行打印。如果 s[i] \\neq s[j]，那么我们需要分别完成该区间的打印，即使用 s[i..k] 和 s[k+1..j]，其中 k \\in [i,j)。于是我们可以列出如下的转移方程： f[i][j]= \\begin{cases} 1, & \\textit{if } i=j \\\\ f[i][j-1], & \\textit{if } s[i]=s[j] \\\\ \\min_{i \\leq k < j} \\{f[i][k]+f[k+1][j]\\}, & \\textit{otherwise} \\end{cases} 在枚举时，我们可以从大到小枚举 i，从小到大枚举 j，这样可以保证在计算 f[i][j] 时，状态 f[i][j-1] 和 f[i][k] 以及 f[k+1][j] 都已经被计算过。 时间复杂度 O(n^3)，空间复杂度 O(n^2)。其中 n 是字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和奇怪的打印机系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 奇怪的打印机 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷奇怪的打印机系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "65.6%",
    "difficulty": "困难",
    "frontendId": "1591",
    "paidOnly": false,
    "seriesKeys": [
      "strange-printer"
    ],
    "seriesPrimaryKey": "strange-printer",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1591.Strange%20Printer%20II/README.md",
    "tags": [
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "topological-sort",
        "name": "拓扑排序"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Strange Printer II",
    "titleCn": "奇怪的打印机 II",
    "titleSlug": "strange-printer-ii",
    "url": "https://leetcode.cn/problems/strange-printer-ii/description/",
    "statementPreview": "给你一个奇怪的打印机，它有如下两个特殊的打印规则： 每一次操作时，打印机会用同一种颜色打印一个矩形的形状，每次打印会覆盖矩形对应格子里原本的颜色。 一旦矩形根据上面的规则使用了一种颜色，那么 相同的颜色不能再被使用。 给你一个初始没有颜色的 m x n 的矩形 targetGrid，其中 targetGrid[row][col] 是位置 (row, col) 的颜色。 如果你能按照上述规则打印出矩形 targetGrid，请你返回 true，否则返回 false。",
    "approachPreview": "每种颜色最终必须覆盖它出现位置的最小矩形。若某颜色矩形内含有其他颜色，则当前颜色必须先于那些颜色打印；建依赖图后做拓扑排序，存在环则不可行。",
    "followUps": [
      {
        "question": "这题和奇怪的打印机系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 奇怪的打印机 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷奇怪的打印机系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.8%",
    "difficulty": "中等",
    "frontendId": "443",
    "paidOnly": false,
    "seriesKeys": [
      "string-compression"
    ],
    "seriesPrimaryKey": "string-compression",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0443.String%20Compression/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "String Compression",
    "titleCn": "压缩字符串",
    "titleSlug": "string-compression",
    "url": "https://leetcode.cn/problems/string-compression/description/",
    "statementPreview": "给你一个字符数组 chars，请使用下述算法压缩： 从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符： 如果这一组长度为 1，则将字符追加到 s 中。 否则，需要向 s 追加字符，后跟这一组的长度。 压缩后得到的字符串 s 不应该直接返回，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。 请在 修改完输入数组后，返回该数组的新长度。 你必须设计并实现一个只使用常量额外空间的算法来解决此问题。 注意： 数组中超出返回长度的字符无关紧要，应予忽略。",
    "approachPreview": "压缩字符串 属于压缩字符串系列中的一个变体。主要标签是 双指针、字符串。先确定窗口内必须维护的不变量，再移动右端扩展、移动左端恢复合法；计数类题要明确每次恢复合法后新增的是多少个候选。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和压缩字符串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 压缩字符串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷压缩字符串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "42.5%",
    "difficulty": "困难",
    "frontendId": "1531",
    "paidOnly": false,
    "seriesKeys": [
      "string-compression"
    ],
    "seriesPrimaryKey": "string-compression",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1500-1599/1531.String%20Compression%20II/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "String Compression II",
    "titleCn": "压缩字符串 II",
    "titleSlug": "string-compression-ii",
    "url": "https://leetcode.cn/problems/string-compression-ii/description/",
    "statementPreview": "行程长度编码 是一种常用的字符串压缩方法，它将连续的相同字符（重复 2 次或更多次）替换为字符和表示字符计数的数字（行程长度）。例如，用此方法压缩字符串 \"aabccc\"，将 \"aa\" 替换为 \"a2\"， \"ccc\" 替换为 \"c3\"。因此压缩后的字符串变为 \"a2bc3\"。 注意，本问题中，压缩时没有在单个字符后附加计数 '1'。 给你一个字符串 s 和一个整数 k。你需要从字符串 s 中删除最多 k 个字符，以使 s 的行程长度编码长度最小。 请你返回删除最多 k 个字符后， s 行程长度编码的最小长度。",
    "approachPreview": "区间 DP 或记忆化搜索。状态记录处理到的位置、还能删除多少字符、上一段字符和长度；每次选择删除当前字符或保留并更新压缩长度增量。",
    "followUps": [
      {
        "question": "这题和压缩字符串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 压缩字符串 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷压缩字符串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.9%",
    "difficulty": "中等",
    "frontendId": "3163",
    "paidOnly": false,
    "seriesKeys": [
      "string-compression"
    ],
    "seriesPrimaryKey": "string-compression",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3100-3199/3163.String%20Compression%20III/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "String Compression III",
    "titleCn": "压缩字符串 III",
    "titleSlug": "string-compression-iii",
    "url": "https://leetcode.cn/problems/string-compression-iii/description/",
    "statementPreview": "给你一个字符串 word，请你使用以下算法进行压缩： 从空字符串 comp 开始。当 word 不为空 时，执行以下操作： 移除 word 的最长单字符前缀，该前缀由单一字符 c 重复多次组成，且该前缀长度 最多 为 9。 将前缀的长度和字符 c 追加到 comp。 返回字符串 comp。",
    "approachPreview": "我们可以利用双指针，统计每个字符的连续出现次数。假如当前字符 c 连续出现了 k 次，然后我们将 k 划分成若干个 x，每个 x 最大为 9，然后将 x 和 c 拼接起来，将每个 x 和 c 拼接起来到结果中。 最后返回结果即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为字符串 word 的长度。",
    "followUps": [
      {
        "question": "这题和压缩字符串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 压缩字符串 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷压缩字符串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.2%",
    "difficulty": "简单",
    "frontendId": "551",
    "paidOnly": false,
    "seriesKeys": [
      "student-attendance-record"
    ],
    "seriesPrimaryKey": "student-attendance-record",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0551.Student%20Attendance%20Record%20I/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Student Attendance Record I",
    "titleCn": "学生出勤记录 I",
    "titleSlug": "student-attendance-record-i",
    "url": "https://leetcode.cn/problems/student-attendance-record-i/description/",
    "statementPreview": "给你一个字符串 s 表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符： 'A'：Absent，缺勤 'L'：Late，迟到 'P'：Present，到场 如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励： 按 总出勤 计，学生缺勤（ 'A' ） 严格 少于两天。 学生 不会 存在 连续 3 天或 连续 3 天以上的迟到（ 'L' ）记录。 如果学生可以获得出勤奖励，返回 true；否则，返回 false。",
    "approachPreview": "我们可以遍历字符串 s，记录字符 'A' 和字符串 \"LLL\" 的出现次数。如果字符 'A' 的出现次数小于 2，且字符串 \"LLL\" 没有出现过，则可以将该字符串视作记录合法，返回 true，否则返回 false。 时间复杂度 O(n)，其中 n 是字符串 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和学生出勤记录 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 学生出勤记录 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷学生出勤记录 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "62.6%",
    "difficulty": "困难",
    "frontendId": "552",
    "paidOnly": false,
    "seriesKeys": [
      "student-attendance-record"
    ],
    "seriesPrimaryKey": "student-attendance-record",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0552.Student%20Attendance%20Record%20II/README.md",
    "tags": [
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Student Attendance Record II",
    "titleCn": "学生出勤记录 II",
    "titleSlug": "student-attendance-record-ii",
    "url": "https://leetcode.cn/problems/student-attendance-record-ii/description/",
    "statementPreview": "可以用字符串表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符： 'A'：Absent，缺勤 'L'：Late，迟到 'P'：Present，到场 如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励： 按 总出勤 计，学生缺勤（ 'A' ） 严格 少于两天。 学生 不会 存在 连续 3 天或 连续 3 天以上的迟到（ 'L' ）记录。 给你一个整数 n，表示出勤记录的长度（次数）。请你返回记录长度为 n 时，可能获得出勤奖励的记录情况 数量。答案可能很大，所以返回对 10^9 + 7 取余 的结果。",
    "approachPreview": "我们设计一个函数 dfs(i, j, k)，表示从第 i 个出勤记录开始，当前缺勤次数为 j，目前最后连续迟到次数为 k 时，可获得出勤奖励的情况数量。那么答案就是 dfs(0, 0, 0)。 函数 dfs(i, j, k) 的执行过程如下： 如果 i \\ge n，说明已经遍历完所有出勤记录，返回 1； 如果 j = 0，说明当前缺勤次数为 0，那么可以选择缺勤，即 dfs(i + 1, j + 1, 0)； 如果 k \\lt 2，说明当前连续迟到次数小于 2，那么可以选择迟到，即 dfs(i + 1, j, k + 1)； 无论如何，都可以选择到场，即 dfs(i + 1, j, 0)。 我们将上述三种情况的结果相加，即为 dfs(i, j, k) 的结果。 为了避免重复计算，我们可以使用记忆化搜索。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为出勤记录的长度。",
    "followUps": [
      {
        "question": "这题和学生出勤记录 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 学生出勤记录 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷学生出勤记录 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "61.0%",
    "difficulty": "中等",
    "frontendId": "621",
    "paidOnly": false,
    "seriesKeys": [
      "task-scheduler"
    ],
    "seriesPrimaryKey": "task-scheduler",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0621.Task%20Scheduler/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "counting",
        "name": "计数"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Task Scheduler",
    "titleCn": "任务调度器",
    "titleSlug": "task-scheduler",
    "url": "https://leetcode.cn/problems/task-scheduler/description/",
    "statementPreview": "给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表，用字母 A 到 Z 表示，以及一个冷却时间 n。每个周期或时间间隔允许完成一项任务。任务可以按任何顺序完成，但有一个限制：两个 相同种类 的任务之间必须有长度为 n 的冷却时间。 返回完成所有任务所需要的 最短时间间隔。",
    "approachPreview": "不妨设 m 是任务的个数，统计每种任务出现的次数，记录在数组 cnt 中。 假设出现次数最多的任务为 A，出现次数为 x，则至少需要 (x-1)\\times(n+1) + 1 个时间单位才能安排完所有任务。如果出现次数最多的任务有 s 个，则需要再加上出现次数最多的任务的个数。 答案是 \\max ((x-1) \\times(n+1)+s, m)。 时间复杂度 O(m+ \\Sigma )。其中 \\Sigma 是任务的种类数。",
    "followUps": [
      {
        "question": "这题和任务调度器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 任务调度器 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷任务调度器系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.0%",
    "difficulty": "中等",
    "frontendId": "2365",
    "paidOnly": false,
    "seriesKeys": [
      "task-scheduler"
    ],
    "seriesPrimaryKey": "task-scheduler",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2365.Task%20Scheduler%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "Task Scheduler II",
    "titleCn": "任务调度器 II",
    "titleSlug": "task-scheduler-ii",
    "url": "https://leetcode.cn/problems/task-scheduler-ii/description/",
    "statementPreview": "给你一个下标从 0 开始的正整数数组 tasks，表示需要 按顺序 完成的任务，其中 tasks[i] 表示第 i 件任务的 类型。 同时给你一个正整数 space，表示一个任务完成 后，另一个 相同 类型任务完成前需要间隔的 最少 天数。 在所有任务完成前的每一天，你都必须进行以下两种操作中的一种： 完成 tasks 中的下一个任务 休息一天 请你返回完成所有任务所需的 最少 天数。",
    "approachPreview": "我们可以用哈希表 day 记录每个任务下一次可以被执行的时间，初始时 day 中的所有值都为 0，用变量 ans 记录当前时间。 遍历数组 tasks，对于每个任务 task，当前时间 ans 加一，表示从上一次执行任务到现在已经过去了一天，如果此时 day[task] \\gt ans，说明任务 task 需要在第 day[task] 天才能被执行，因此我们更新当前时间 ans = \\max(ans, day[task])。然后更新 day[task] 的值为 ans + space + 1，表示任务 task 下一次可以被执行的时间为 ans + space + 1。 遍历结束后，将 ans 返回即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组 tasks 的长度。",
    "followUps": [
      {
        "question": "这题和任务调度器系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 任务调度器 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷任务调度器系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.0%",
    "difficulty": "中等",
    "frontendId": "490",
    "paidOnly": true,
    "seriesKeys": [
      "the-maze"
    ],
    "seriesPrimaryKey": "the-maze",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0490.The%20Maze/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "The Maze",
    "titleCn": "迷宫",
    "titleSlug": "the-maze",
    "url": "https://leetcode.cn/problems/the-maze/description/",
    "statementPreview": "由空地（用 0 表示）和墙（用 1 表示）组成的迷宫 maze 中有一个球。球可以途经空地向 上、下、左、右 四个方向滚动，且在遇到墙壁前不会停止滚动。当球停下时，可以选择向下一个方向滚动。 给你一个大小为 m x n 的迷宫 maze，以及球的初始位置 start 和目的地 destination，其中 start = [start_row, start_col] 且 destination = [destination_row, destination_col]。请你判断球能否在目的地停下：如果可以，返回 true；否则，返回 false。 你可以 假定迷宫的边缘都是墙壁 （参考示例）。",
    "approachPreview": "迷宫 属于迷宫系列中的一个变体。主要标签是 深度优先搜索、广度优先搜索、数组、矩阵。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和迷宫系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 迷宫 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷迷宫系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.6%",
    "difficulty": "困难",
    "frontendId": "499",
    "paidOnly": true,
    "seriesKeys": [
      "the-maze"
    ],
    "seriesPrimaryKey": "the-maze",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0499.The%20Maze%20III/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "The Maze III",
    "titleCn": "迷宫 III",
    "titleSlug": "the-maze-iii",
    "url": "https://leetcode.cn/problems/the-maze-iii/description/",
    "statementPreview": "由空地和墙组成的迷宫中有一个 球。球可以向 上（u）下（d）左（l）右（r） 四个方向滚动，但在遇到墙壁前不会停止滚动。当球停下时，可以选择下一个方向（必须与上一个选择的方向不同）。迷宫中还有一个 洞，当球运动经过洞时，就会掉进洞里。 给定球的 起始位置，目的地 和 迷宫，找出让球以最短距离掉进洞里的路径。 距离的定义是球从起始位置（不包括）到目的地（包括）经过的 空地 个数。通过'u', 'd', 'l' 和 'r'输出球的移动 方向。 由于可能有多条最短路径， 请输出 字典序最小 的路径。 如果球无法进入洞，输出\"impossible\"。 迷宫由一个0和1的二维数组表示。 1表示墙壁，0表示空地。你可以假定迷宫的边缘都是墙壁。起始位置和目的地的坐标通过行号和列号给出。",
    "approachPreview": "迷宫 III 属于迷宫系列中的一个变体。主要标签是 深度优先搜索、广度优先搜索、图、数组、字符串、矩阵、最短路、堆（优先队列）。先把题目对象建成点和边，再确认边的方向、连通性和访问顺序；连通块题用 DFS/BFS 或并查集，依赖关系题要检查入度、拓扑序或环。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和迷宫系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 迷宫 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷迷宫系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "53.1%",
    "difficulty": "中等",
    "frontendId": "505",
    "paidOnly": true,
    "seriesKeys": [
      "the-maze"
    ],
    "seriesPrimaryKey": "the-maze",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0500-0599/0505.The%20Maze%20II/README.md",
    "tags": [
      {
        "slug": "depth-first-search",
        "name": "深度优先搜索"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "graph",
        "name": "图"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "The Maze II",
    "titleCn": "迷宫 II",
    "titleSlug": "the-maze-ii",
    "url": "https://leetcode.cn/problems/the-maze-ii/description/",
    "statementPreview": "迷宫 中有一个球，它有空地 (表示为 0 ) 和墙 (表示为 1 )。球可以 向上、 向下、 向左 或 向右 滚过空地，但直到撞上墙之前它都不会停止滚动。当球停止时，它才可以选择下一个滚动方向。 给定 m × n 的 迷宫 ( maze )，球的 起始位置 ( start = [start_row, start_col] ) 和 目的地 ( destination = [destination_row, destination_col] )，返回球在 目的地 ( destination ) 停止的最短 距离。如果球不能在 目的地 ( destination ) 停止，返回 -1。 距离 是指球从起始位置 ( 不包括 ) 到终点 ( 包括 ) 所经过的 空地 数。 你可以假设 迷宫的边界都是墙 ( 见例子 )。",
    "approachPreview": "我们定义一个二维数组 dist，其中 dist[i][j] 表示从起始位置到达 (i,j) 的最短路径长度。初始时，dist 中的所有元素都被初始化为一个很大的数，除了起始位置，因为起始位置到自身的距离是 0。 然后，我们定义一个队列 q，将起始位置加入队列。随后不断进行以下操作：弹出队列中的首元素，将其四个方向上可以到达的位置加入队列中，并且在 dist 中记录这些位置的距离，直到队列为空。 最后，如果终点位置的距离仍然是一个很大的数，说明从起始位置无法到达终点位置，返回 -1，否则返回终点位置的距离。 时间复杂度 O(m \\times n \\times \\max(m, n))，空间复杂度 O(m \\times n)。其中 m 和 n 分别是迷宫的行数和列数。",
    "followUps": [
      {
        "question": "这题和迷宫系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 迷宫 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷迷宫系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "66.0%",
    "difficulty": "困难",
    "frontendId": "42",
    "paidOnly": false,
    "seriesKeys": [
      "trapping-rain-water"
    ],
    "seriesPrimaryKey": "trapping-rain-water",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0042.Trapping%20Rain%20Water/README.md",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "title": "Trapping Rain Water",
    "titleCn": "接雨水",
    "titleSlug": "trapping-rain-water",
    "url": "https://leetcode.cn/problems/trapping-rain-water/description/",
    "statementPreview": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "approachPreview": "我们定义 left[i] 表示下标 i 位置及其左边的最高柱子的高度，定义 right[i] 表示下标 i 位置及其右边的最高柱子的高度。那么下标 i 位置能接的雨水量为 \\min(left[i], right[i]) - height[i]。我们遍历数组，计算出 left[i] 和 right[i]，最后答案为 \\sum_{i=0}^{n-1} \\min(left[i], right[i]) - height[i]。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为数组的长度。",
    "followUps": [
      {
        "question": "这题和接雨水系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 接雨水 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷接雨水系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "59.4%",
    "difficulty": "困难",
    "frontendId": "407",
    "paidOnly": false,
    "seriesKeys": [
      "trapping-rain-water"
    ],
    "seriesPrimaryKey": "trapping-rain-water",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0400-0499/0407.Trapping%20Rain%20Water%20II/README.md",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Trapping Rain Water II",
    "titleCn": "接雨水 II",
    "titleSlug": "trapping-rain-water-ii",
    "url": "https://leetcode.cn/problems/trapping-rain-water-ii/description/",
    "statementPreview": "给你一个 m x n 的矩阵，其中的值均为非负整数，代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。",
    "approachPreview": "接雨水问题的变种，由于矩阵的边界上的高度是确定的，因此可以将矩阵的边界上的高度加入优先队列，然后从优先队列中取出最小的高度，然后将其四周的高度与其比较，如果四周的高度小于当前高度，则可以接雨水，接雨水的体积为当前高度减去四周的高度，然后将较大的高度加入优先队列，重复上述过程，直到优先队列为空。 时间复杂度 O(m \\times n \\times \\log (m \\times n))，空间复杂度 O(m \\times n)。其中 m 和 n 分别为矩阵的行数和列数。",
    "followUps": [
      {
        "question": "这题和接雨水系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 接雨水 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷接雨水系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "47.0%",
    "difficulty": "简单",
    "frontendId": "3637",
    "paidOnly": false,
    "seriesKeys": [
      "trionic-array"
    ],
    "seriesPrimaryKey": "trionic-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3637.Trionic%20Array%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "title": "Trionic Array I",
    "titleCn": "三段式数组 I",
    "titleSlug": "trionic-array-i",
    "url": "https://leetcode.cn/problems/trionic-array-i/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums。 如果存在索引 0 < p < q < n − 1，使得数组满足以下条件，则称其为 三段式数组（trionic）： nums[0...p] 严格 递增， nums[p...q] 严格 递减， nums[q...n − 1] 严格 递增。 如果 nums 是三段式数组，返回 true；否则，返回 false。",
    "approachPreview": "我们首先定义一个指针 p，初始时 p = 0，表示当前指向数组的第一个元素。我们将 p 向右移动，直到找到第一个不满足严格递增的元素，即 nums[p] \\geq nums[p + 1]。如果此时 p = 0，说明数组的前半部分没有严格递增的部分，因此直接返回 \\text{false}。 接下来，我们定义另一个指针 q，初始时 q = p，表示当前指向数组的第二个部分的第一个元素。我们将 q 向右移动，直到找到第一个不满足严格递减的元素，即 nums[q] \\leq nums[q + 1]。如果此时 q = p 或者 q = n - 1，说明数组的第二部分没有严格递减的部分或者没有第三部分，因此直接返回 \\text{false}。 如果以上条件都满足，说明数组是三段式的，返回 \\text{true}。 时间复杂度 O(n)，其中 n 是数组的长度。空间复杂度 O(1)，只使用了常数级别的额外空间。",
    "followUps": [
      {
        "question": "这题和三段式数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 三段式数组 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷三段式数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "54.3%",
    "difficulty": "困难",
    "frontendId": "3640",
    "paidOnly": false,
    "seriesKeys": [
      "trionic-array"
    ],
    "seriesPrimaryKey": "trionic-array",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3640.Trionic%20Array%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Trionic Array II",
    "titleCn": "三段式数组 II",
    "titleSlug": "trionic-array-ii",
    "url": "https://leetcode.cn/problems/trionic-array-ii/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums。 三段式子数组 是一个连续子数组 nums[l...r] （满足 0 <= l < r < n ），并且存在下标 l < p < q < r，使得： nums[l...p] 严格 递增， nums[p...q] 严格 递减， nums[q...r] 严格 递增。 请你从数组 nums 的所有三段式子数组中找出和最大的那个，并返回其 最大 和。",
    "approachPreview": "我们可以遍历数组，寻找所有可能的极大三段式子数组，从而计算其和并更新最大值。 我们定义一个指针 i，初始时 i = 0，表示当前指向数组的第一个元素。我们将 i 向右移动，直到找到第一个不满足严格递增的元素，即 nums[i-1] \\geq nums[i]。如果此时 i = l + 1，说明这一段只有一个元素，无法形成递增序列，因此继续下一个循环。 接下来，我们定义指针 p，表示当前递增段的结束位置。然后找出第二段严格递减的部分，如果这一段只有一个元素或者到达数组末尾，或者出现相等的元素，则继续下一个循环。 然后我们定义指针 q，表示当前递减段的结束位置。接着找出第三段严格递增的部分，这时，我们就找到了一个极大的三段式子数组。那么这个三段式子数组的最大和，由以下几个部分组成： 下标范围 [p-2,..,q+1] 的元素之和 从 p-3 向左扩展的最大递增子数组之和，如果不存在则为 0 从 q+2 向右扩展的最大递增子数组之和，如果不存在则为 0。 我们计算出这个三段式子数组的和后，更新答案。然后将指针 i 移动到 q 位置，这是因为第三段的递增部分可以作为下一次循环的第一段递增部分。 遍历结束后，返回答案即可。 时间复杂度 O(n)，其中 n 是数组的长度。空间复杂度 O(1)，只使用了常数级别的额外空间。",
    "followUps": [
      {
        "question": "这题和三段式数组 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 三段式数组 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷三段式数组 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "50.2%",
    "difficulty": "简单",
    "frontendId": "263",
    "paidOnly": false,
    "seriesKeys": [
      "ugly-number"
    ],
    "seriesPrimaryKey": "ugly-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0263.Ugly%20Number/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "title": "Ugly Number",
    "titleCn": "丑数",
    "titleSlug": "ugly-number",
    "url": "https://leetcode.cn/problems/ugly-number/description/",
    "statementPreview": "丑数 就是只包含质因数 2、 3 和 5 的 正 整数。 给你一个整数 n，请你判断 n 是否为 丑数。如果是，返回 true；否则，返回 false。",
    "approachPreview": "丑数 属于丑数系列中的一个变体。主要标签是 数学。先把操作转成等价的公式、位状态或不变量，再减少枚举维度；实现时要明确溢出、取模和重复状态是否会影响答案。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和丑数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 丑数 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷丑数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "58.1%",
    "difficulty": "中等",
    "frontendId": "264",
    "paidOnly": false,
    "seriesKeys": [
      "ugly-number"
    ],
    "seriesPrimaryKey": "ugly-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0264.Ugly%20Number%20II/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "title": "Ugly Number II",
    "titleCn": "丑数 II",
    "titleSlug": "ugly-number-ii",
    "url": "https://leetcode.cn/problems/ugly-number-ii/description/",
    "statementPreview": "给你一个整数 n，请你找出并返回第 n 个 丑数。 丑数 就是质因子只包含 2、 3 和 5 的正整数。",
    "approachPreview": "初始时，将第一个丑数 1 加入堆。每次取出堆顶元素 x，由于 2x, 3x, 5x 也是丑数，因此将它们加入堆中。为了避免重复元素，可以用哈希表 vis 去重。 时间复杂度 O(n \\times \\log n)，空间复杂度 O(n)。",
    "followUps": [
      {
        "question": "这题和丑数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 丑数 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷丑数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "30.7%",
    "difficulty": "中等",
    "frontendId": "1201",
    "paidOnly": false,
    "seriesKeys": [
      "ugly-number"
    ],
    "seriesPrimaryKey": "ugly-number",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1201.Ugly%20Number%20III/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "combinatorics",
        "name": "组合数学"
      },
      {
        "slug": "number-theory",
        "name": "数论"
      }
    ],
    "title": "Ugly Number III",
    "titleCn": "丑数 III",
    "titleSlug": "ugly-number-iii",
    "url": "https://leetcode.cn/problems/ugly-number-iii/description/",
    "statementPreview": "丑数是可以被 a 或 b 或 c 整除的 正整数。 给你四个整数： n、 a、 b、 c，请你设计一个算法来找出第 n 个丑数。",
    "approachPreview": "我们可以将题目转换为：找到最小的正整数 x，使得小于等于 x 的丑数个数恰好为 n 个。 对于一个正整数 x，能被 a 整除的数有 \\left\\lfloor \\frac{x}{a} \\right\\rfloor 个，能被 b 整除的数有 \\left\\lfloor \\frac{x}{b} \\right\\rfloor 个，能被 c 整除的数有 \\left\\lfloor \\frac{x}{c} \\right\\rfloor 个，能被 a 和 b 同时整除的数有 \\left\\lfloor \\frac{x}{lcm(a, b)} \\right\\rfloor 个，能被 a 和 c 同时整除的数有 \\left\\lfloor \\frac{x}{lcm(a, c)} \\right\\rfloor 个，能被 b 和 c 同时整除的数有 \\left\\lfloor \\frac{x}{lcm(b, c)} \\right\\rfloor 个，能被 a, b 和 c 同时整除的数有 \\left\\lfloor \\frac{x}{lcm(a, b, c)} \\right\\rfloor 个。",
    "followUps": [
      {
        "question": "这题和丑数系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 丑数 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷丑数系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "74.7%",
    "difficulty": "中等",
    "frontendId": "95",
    "paidOnly": false,
    "seriesKeys": [
      "unique-binary-search-trees"
    ],
    "seriesPrimaryKey": "unique-binary-search-trees",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0095.Unique%20Binary%20Search%20Trees%20II/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Unique Binary Search Trees II",
    "titleCn": "不同的二叉搜索树 II",
    "titleSlug": "unique-binary-search-trees-ii",
    "url": "https://leetcode.cn/problems/unique-binary-search-trees-ii/description/",
    "statementPreview": "给你一个整数 n，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树。可以按 任意顺序 返回答案。",
    "approachPreview": "我们设计一个函数 dfs(i, j)，返回由 [i, j] 组成的所有可行的二叉搜索树，那么答案就是 dfs(1, n)。 函数 dfs(i, j) 的执行步骤如下： 1. 如果 i > j，那么说明此时没有数字可以构成二叉搜索树，返回由一个空节点组成的列表。 2. 如果 i \\leq j，那么我们枚举 [i, j] 中的数字 v 作为根节点，那么根节点 v 的左子树由 [i, v - 1] 组成，右子树由 [v + 1, j] 组成，最后将左右子树的所有组合笛卡尔积，即 left \\times right，加上根节点 v，得到以 v 为根节点的所有二叉搜索树。 时间复杂度 O(n \\times G(n))，空间复杂度 O(n \\times G(n))。其中 G(n) 是卡特兰数。",
    "followUps": [
      {
        "question": "这题和不同的二叉搜索树系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同的二叉搜索树 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同的二叉搜索树系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "71.4%",
    "difficulty": "中等",
    "frontendId": "96",
    "paidOnly": false,
    "seriesKeys": [
      "unique-binary-search-trees"
    ],
    "seriesPrimaryKey": "unique-binary-search-trees",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0096.Unique%20Binary%20Search%20Trees/README.md",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "binary-search-tree",
        "name": "二叉搜索树"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "title": "Unique Binary Search Trees",
    "titleCn": "不同的二叉搜索树",
    "titleSlug": "unique-binary-search-trees",
    "url": "https://leetcode.cn/problems/unique-binary-search-trees/description/",
    "statementPreview": "给你一个整数 n，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。",
    "approachPreview": "我们定义 f[i] 表示 [1, i] 能产生的二叉搜索树的个数，初始时 f[0] = 1，答案为 f[n]。 我们可以枚举节点数 i，那么左子树节点数 j \\in [0, i - 1]，右子树节点数 k = i - j - 1，左子树节点数和右子树节点数的组合数为 f[j] \\times f[k]，因此 f[i] = \\sum_{j = 0}^{i - 1} f[j] \\times f[i - j - 1]。 最后返回 f[n] 即可。 时间复杂度 O(n)，空间复杂度 O(n)。其中 n 为节点数。",
    "followUps": [
      {
        "question": "这题和不同的二叉搜索树系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同的二叉搜索树 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同的二叉搜索树系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.3%",
    "difficulty": "中等",
    "frontendId": "62",
    "paidOnly": false,
    "seriesKeys": [
      "unique-paths"
    ],
    "seriesPrimaryKey": "unique-paths",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0062.Unique%20Paths/README.md",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "combinatorics",
        "name": "组合数学"
      }
    ],
    "title": "Unique Paths",
    "titleCn": "不同路径",
    "titleSlug": "unique-paths",
    "url": "https://leetcode.cn/problems/unique-paths/description/",
    "statementPreview": "一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。 问总共有多少条不同的路径？",
    "approachPreview": "我们定义 f[i][j] 表示从左上角走到 (i, j) 的路径数量，初始时 f[0][0] = 1，答案为 f[m - 1][n - 1]。 考虑 f[i][j]： 如果 i \\gt 0，那么 f[i][j] 可以从 f[i - 1][j] 走一步到达，因此 f[i][j] = f[i][j] + f[i - 1][j]； 如果 j \\gt 0，那么 f[i][j] 可以从 f[i][j - 1] 走一步到达，因此 f[i][j] = f[i][j] + f[i][j - 1]。 因此，我们有如下的状态转移方程： f[i][j] = \\begin{cases} 1 & i = 0, j = 0 \\\\ f[i - 1][j] + f[i][j - 1] & \\textit{otherwise} \\end{cases} 最终的答案即为 f[m - 1][n - 1]。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是网格的行数和列数。 我们注意到 f[i][j] 仅与 f[i - 1][j] 和 f[i][j - 1] 有关，因此我们优化掉第一维空间，仅保留第二维空间，得到时间复杂度 O(m \\times n)，空间复杂度 O(n) 的实现。",
    "followUps": [
      {
        "question": "这题和不同路径系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同路径 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同路径系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "42.6%",
    "difficulty": "中等",
    "frontendId": "63",
    "paidOnly": false,
    "seriesKeys": [
      "unique-paths"
    ],
    "seriesPrimaryKey": "unique-paths",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0063.Unique%20Paths%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Unique Paths II",
    "titleCn": "不同路径 II",
    "titleSlug": "unique-paths-ii",
    "url": "https://leetcode.cn/problems/unique-paths-ii/description/",
    "statementPreview": "给定一个 m x n 的整数数组 grid。一个机器人初始位于 左上角 （即 grid[0][0] ）。机器人尝试移动到 右下角 （即 grid[m - 1][n - 1] ）。机器人每次只能向下或者向右移动一步。 网格中的障碍物和空位置分别用 1 和 0 来表示。机器人的移动路径中不能包含 任何 有障碍物的方格。 返回机器人能够到达右下角的不同路径数量。 测试用例保证答案小于等于 2 * 10^9。",
    "approachPreview": "我们设计一个函数 \\textit{dfs}(i, j) 表示从网格 (i, j) 到网格 (m - 1, n - 1) 的路径数。其中 m 和 n 分别是网格的行数和列数。 函数 \\textit{dfs}(i, j) 的执行过程如下： 如果 i \\ge m 或者 j \\ge n，或者 \\textit{obstacleGrid}[i][j] = 1，则路径数为 0； 如果 i = m - 1 且 j = n - 1，则路径数为 1； 否则，路径数为 \\textit{dfs}(i + 1, j) + \\textit{dfs}(i, j + 1)。 为了避免重复计算，我们可以使用记忆化搜索的方法。 时间复杂度 O(m \\times n)，空间复杂度 O(m \\times n)。其中 m 和 n 分别是网格的行数和列数。",
    "followUps": [
      {
        "question": "这题和不同路径系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同路径 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同路径系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "77.0%",
    "difficulty": "困难",
    "frontendId": "980",
    "paidOnly": false,
    "seriesKeys": [
      "unique-paths"
    ],
    "seriesPrimaryKey": "unique-paths",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0900-0999/0980.Unique%20Paths%20III/README.md",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "title": "Unique Paths III",
    "titleCn": "不同路径 III",
    "titleSlug": "unique-paths-iii",
    "url": "https://leetcode.cn/problems/unique-paths-iii/description/",
    "statementPreview": "在二维网格 grid 上，有 4 种类型的方格： 1 表示起始方格。且只有一个起始方格。 2 表示结束方格，且只有一个结束方格。 0 表示我们可以走过的空方格。 1 表示我们无法跨越的障碍。 返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。 每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。",
    "approachPreview": "我们可以先遍历整个网格，找出起点 (x, y)，并且统计空白格的数量 cnt。 接下来，我们可以从起点开始搜索，得到所有的路径数。我们设计一个函数 dfs(i, j, k) 表示从 (i, j) 出发，且当前已经走过的单元格数量为 k 的路径数。 在函数中，我们首先判断当前单元格是否为终点，如果是，则判断 k 是否等于 cnt + 1，如果是，则说明当前路径是一条有效路径，返回 1，否则返回 0。 如果当前单元格不是终点，则我们枚举当前单元格的上下左右四个邻接单元格，如果邻接单元格未被访问过，则我们将该邻接单元格标记为已访问，然后继续搜索从该邻接单元格出发的路径数，搜索完成后，我们再将该邻接单元格标记为未访问。在搜索完成后，我们返回所有邻接单元格的路径数之和。 最后，我们返回从起点出发的路径数即可，即 dfs(x, y, 1)。 时间复杂度 O(3^{m \\times n})，空间复杂度 O(m \\times n)。其中 m 和 n 分别为网格的行数和列数。",
    "followUps": [
      {
        "question": "这题和不同路径系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 不同路径 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷不同路径系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "48.9%",
    "difficulty": "简单",
    "frontendId": "125",
    "paidOnly": false,
    "seriesKeys": [
      "valid-palindrome"
    ],
    "seriesPrimaryKey": "valid-palindrome",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0100-0199/0125.Valid%20Palindrome/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Valid Palindrome",
    "titleCn": "验证回文串",
    "titleSlug": "valid-palindrome",
    "url": "https://leetcode.cn/problems/valid-palindrome/description/",
    "statementPreview": "如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串。 字母和数字都属于字母数字字符。 给你一个字符串 s，如果它是 回文串，返回 true；否则，返回 false。",
    "approachPreview": "我们用双指针 i 和 j 分别指向字符串 s 的两端，接下来循环以下过程，直至 i \\geq j： 1. 如果 s[i] 不是字母或数字，指针 i 右移一位，继续下一次循环； 1. 如果 s[j] 不是字母或数字，指针 j 左移一位，继续下一次循环； 1. 如果 s[i] 和 s[j] 的小写形式不相等，返回 false； 1. 否则，指针 i 右移一位，指针 j 左移一位，继续下一次循环。 循环结束，返回 true。 时间复杂度 O(n)，其中 n 是字符串 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和验证回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证回文串 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷验证回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.7%",
    "difficulty": "简单",
    "frontendId": "680",
    "paidOnly": false,
    "seriesKeys": [
      "valid-palindrome"
    ],
    "seriesPrimaryKey": "valid-palindrome",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0600-0699/0680.Valid%20Palindrome%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Valid Palindrome II",
    "titleCn": "验证回文串 II",
    "titleSlug": "valid-palindrome-ii",
    "url": "https://leetcode.cn/problems/valid-palindrome-ii/description/",
    "statementPreview": "给你一个字符串 s， 最多 可以从中删除一个字符。 请你判断 s 是否能成为回文字符串：如果能，返回 true；否则，返回 false。",
    "approachPreview": "我们用两个指针分别指向字符串的左右两端，每次判断两个指针指向的字符是否相同，如果不相同，则判断删除左指针对应的字符后字符串是否是回文字符串，或者判断删除右指针对应的字符后字符串是否是回文字符串。如果两个指针指向的字符相同，则将左右指针都往中间移动一位，直到两个指针相遇为止。 如果遍历结束，都没有遇到指针指向的字符不相同的情况，那么字符串本身就是一个回文字符串，返回 true 即可。 时间复杂度 O(n)，其中 n 是字符串 s 的长度。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和验证回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证回文串 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷验证回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "57.2%",
    "difficulty": "困难",
    "frontendId": "1216",
    "paidOnly": true,
    "seriesKeys": [
      "valid-palindrome"
    ],
    "seriesPrimaryKey": "valid-palindrome",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/1200-1299/1216.Valid%20Palindrome%20III/README.md",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "title": "Valid Palindrome III",
    "titleCn": "验证回文串 III",
    "titleSlug": "valid-palindrome-iii",
    "url": "https://leetcode.cn/problems/valid-palindrome-iii/description/",
    "statementPreview": "给出一个字符串 s 和一个整数 k，若这个字符串是一个「k 回文 」，则返回 true。 如果可以通过从字符串中删去最多 k 个字符将其转换为回文，那么这个字符串就是一个「 k 回文 」。",
    "approachPreview": "题目要求删去最多 k 个字符，使得剩余的字符串是回文串。可以转换为求最长回文子序列的问题。 我们定义 f[i][j] 表示字符串 s 中下标范围 [i, j] 内的最长回文子序列的长度。初始时 f[i][i] = 1，即每个单独的字符都是一个回文子序列。 当 s[i] = s[j] 时，有 f[i][j] = f[i + 1][j - 1] + 2，即去掉 s[i] 和 s[j] 后，剩余的字符串的最长回文子序列长度加 2。 当 s[i] \\neq s[j] 时，有 f[i][j] = \\max(f[i + 1][j], f[i][j - 1])，即去掉 s[i] 或 s[j] 后，剩余的字符串的最长回文子序列长度。 然后是否存在 f[i][j] + k \\geq n，如果存在，说明可以通过删去 k 个字符，使得剩余的字符串是回文串。 时间复杂度 O(n^2)，空间复杂度 O(n^2)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和验证回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证回文串 III 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷验证回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.7%",
    "difficulty": "中等",
    "frontendId": "2330",
    "paidOnly": true,
    "seriesKeys": [
      "valid-palindrome"
    ],
    "seriesPrimaryKey": "valid-palindrome",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/2300-2399/2330.Valid%20Palindrome%20IV/README.md",
    "tags": [
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Valid Palindrome IV",
    "titleCn": "验证回文串 IV",
    "titleSlug": "valid-palindrome-iv",
    "url": "https://leetcode.cn/problems/valid-palindrome-iv/description/",
    "statementPreview": "给你一个下标从 0 开始、仅由小写英文字母组成的字符串 s。在一步操作中，你可以将 s 中的任一字符更改为其他任何字符。 如果你能在 恰 执行一到两步操作后使 s 变成一个回文，则返回 true，否则返回 false。",
    "approachPreview": "我们可以使用双指针 i 和 j，分别指向字符串的头尾，然后向中间移动，统计不同字符的个数，如果不同字符的个数大于 2，则返回 \\textit{false}，否则返回 \\textit{true}。 时间复杂度 O(n)，空间复杂度 O(1)。其中 n 为字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和验证回文串系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 验证回文串 IV 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷验证回文串系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "70.1%",
    "difficulty": "中等",
    "frontendId": "280",
    "paidOnly": true,
    "seriesKeys": [
      "wiggle-sort"
    ],
    "seriesPrimaryKey": "wiggle-sort",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0280.Wiggle%20Sort/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Wiggle Sort",
    "titleCn": "摆动排序",
    "titleSlug": "wiggle-sort",
    "url": "https://leetcode.cn/problems/wiggle-sort/description/",
    "statementPreview": "给你一个的整数数组 nums , 将该数组重新排序后使 nums[0] <= nums[1] >= nums[2] <= nums[3]... 输入数组总是有一个有效的答案。",
    "approachPreview": "摆动排序 属于摆动排序系列中的一个变体。主要标签是 贪心、数组、排序。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和摆动排序系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 摆动排序 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷摆动排序系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "41.5%",
    "difficulty": "中等",
    "frontendId": "324",
    "paidOnly": false,
    "seriesKeys": [
      "wiggle-sort"
    ],
    "seriesPrimaryKey": "wiggle-sort",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0324.Wiggle%20Sort%20II/README.md",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "quickselect",
        "name": "快速选择"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "title": "Wiggle Sort II",
    "titleCn": "摆动排序 II",
    "titleSlug": "wiggle-sort-ii",
    "url": "https://leetcode.cn/problems/wiggle-sort-ii/description/",
    "statementPreview": "给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。 你可以假设所有输入数组都可以得到满足题目要求的结果。",
    "approachPreview": "排序后把较小一半倒序放到偶数位、较大一半倒序放到奇数位，可以避免相等元素相邻破坏摆动关系；若追求原地线性，可结合三向切分和虚拟下标。",
    "followUps": [
      {
        "question": "这题和摆动排序系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 摆动排序 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷摆动排序系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "45.6%",
    "difficulty": "简单",
    "frontendId": "290",
    "paidOnly": false,
    "seriesKeys": [
      "word-pattern"
    ],
    "seriesPrimaryKey": "word-pattern",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0290.Word%20Pattern/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "title": "Word Pattern",
    "titleCn": "单词规律",
    "titleSlug": "word-pattern",
    "url": "https://leetcode.cn/problems/word-pattern/description/",
    "statementPreview": "给定一种规律 pattern 和一个字符串 s，判断 s 是否遵循相同的规律。 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。具体来说： pattern 中的每个字母都 恰好 映射到 s 中的一个唯一单词。 s 中的每个唯一单词都 恰好 映射到 pattern 中的一个字母。 没有两个字母映射到同一个单词，也没有两个单词映射到同一个字母。",
    "approachPreview": "我们先将字符串 s 按照空格分割成单词数组 ws，如果 pattern 和 ws 的长度不相等，直接返回 false。否则，我们使用两个哈希表 d_1 和 d_2，分别记录 pattern 和 ws 中每个字符和单词的对应关系。 接下来，我们遍历 pattern 和 ws，对于每个字符 a 和单词 b，如果 d_1 中存在 a 的映射，且映射的单词不是 b，或者 d_2 中存在 b 的映射，且映射的字符不是 a，则返回 false。否则，我们将 a 和 b 的映射分别加入 d_1 和 d_2 中。 遍历结束后，返回 true。 时间复杂度 O(m + n)，空间复杂度 O(m + n)。其中 m 和 n 分别是 pattern 和字符串 s 的长度。",
    "followUps": [
      {
        "question": "这题和单词规律系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词规律 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词规律系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.5%",
    "difficulty": "中等",
    "frontendId": "291",
    "paidOnly": true,
    "seriesKeys": [
      "word-pattern"
    ],
    "seriesPrimaryKey": "word-pattern",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/0200-0299/0291.Word%20Pattern%20II/README.md",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "title": "Word Pattern II",
    "titleCn": "单词规律 II",
    "titleSlug": "word-pattern-ii",
    "url": "https://leetcode.cn/problems/word-pattern-ii/description/",
    "statementPreview": "给你一种规律 pattern 和一个字符串 s，请你判断 s 是否和 pattern 的规律 相匹配。 如果存在单个字符到 非空 字符串的 双射映射，那么字符串 s 匹配 pattern，即：如果 pattern 中的每个字符都被它映射到的字符串替换，那么最终的字符串则为 s。 双射 意味着映射双方一一对应，不会存在两个字符映射到同一个字符串，也不会存在一个字符分别映射到两个不同的字符串。",
    "approachPreview": "回溯建立 pattern 字符到非空子串的一一映射。每次枚举当前字符可匹配的前缀，既要保证同字符复用同一子串，也要保证不同字符不能映射到同一子串。",
    "followUps": [
      {
        "question": "这题和单词规律系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 单词规律 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷单词规律系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "66.1%",
    "difficulty": "中等",
    "frontendId": "3653",
    "paidOnly": false,
    "seriesKeys": [
      "xor-after-range-multiplication-queries"
    ],
    "seriesPrimaryKey": "xor-after-range-multiplication-queries",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3653.XOR%20After%20Range%20Multiplication%20Queries%20I/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "title": "XOR After Range Multiplication Queries I",
    "titleCn": "区间乘法查询后的异或 I",
    "titleSlug": "xor-after-range-multiplication-queries-i",
    "url": "https://leetcode.cn/problems/xor-after-range-multiplication-queries-i/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums 和一个大小为 q 的二维整数数组 queries，其中 queries[i] = [l_i, r_i, k_i, v_i]。 对于每个查询，按以下步骤执行操作： 设定 idx = l_i。 当 idx <= r_i 时： 更新： nums[idx] = (nums[idx] * v_i) % (10^9 + 7) 将 idx += k_i。 在处理完所有查询后，返回数组 nums 中所有元素的 按位异或 结果。",
    "approachPreview": "我们可以直接模拟题目中的操作，遍历每个查询并更新数组 \\textit{nums} 中的对应元素。最后计算数组中所有元素的按位异或结果并返回。 时间复杂度 O(q \\times \\frac{n}{k})，其中 n 是数组 \\textit{nums} 的长度，而 q 是查询的数量。空间复杂度 O(1)。",
    "followUps": [
      {
        "question": "这题和区间乘法查询后的异或 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区间乘法查询后的异或 I 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷区间乘法查询后的异或 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  },
  {
    "acRate": "52.9%",
    "difficulty": "困难",
    "frontendId": "3655",
    "paidOnly": false,
    "seriesKeys": [
      "xor-after-range-multiplication-queries"
    ],
    "seriesPrimaryKey": "xor-after-range-multiplication-queries",
    "source": "https://github.com/doocs/leetcode (CC-BY-SA-4.0)",
    "sourceUrl": "https://github.com/doocs/leetcode/blob/main/solution/3600-3699/3655.XOR%20After%20Range%20Multiplication%20Queries%20II/README.md",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      }
    ],
    "title": "XOR After Range Multiplication Queries II",
    "titleCn": "区间乘法查询后的异或 II",
    "titleSlug": "xor-after-range-multiplication-queries-ii",
    "url": "https://leetcode.cn/problems/xor-after-range-multiplication-queries-ii/description/",
    "statementPreview": "给你一个长度为 n 的整数数组 nums 和一个大小为 q 的二维整数数组 queries，其中 queries[i] = [l_i, r_i, k_i, v_i]。 对于每个查询，需要按以下步骤依次执行操作： 设定 idx = l_i。 当 idx <= r_i 时： 更新： nums[idx] = (nums[idx] * v_i) % (10^9 + 7)。 将 idx += k_i。 在处理完所有查询后，返回数组 nums 中所有元素的 按位异或 结果。",
    "approachPreview": "区间乘法查询后的异或 II 属于区间乘法查询后的异或 I系列中的一个变体。主要标签是 数组、分治。先把输入限制、可选操作和答案目标拆开，再选择合适的数据结构或状态定义；实现时要明确初始状态、转移条件和答案更新位置。刷同系列时要专门比较这题新增的限制，避免把相邻题的结论直接套到不同约束上。",
    "followUps": [
      {
        "question": "这题和区间乘法查询后的异或 I系列里的基础题相比，新增的核心约束是什么？",
        "answer": "先不要急着套模板。把 区间乘法查询后的异或 II 的输入限制、可选操作和答案目标单独列出来，再决定是沿用同系列的贪心、动态规划、图搜索还是数据结构写法。"
      },
      {
        "question": "实现时最容易遗漏哪类边界？",
        "answer": "重点检查最小规模、没有可选操作、所有候选都不可行、以及答案刚好由边界位置产生的情况；这些边界通常决定初始化和循环端点是否正确。"
      },
      {
        "question": "刷区间乘法查询后的异或 I系列时应按什么顺序复盘？",
        "answer": "先做基础题确认状态和不变量，再做编号更高或限制更多的变体；每做完一题都对比新增约束如何改变转移、剪枝或数据结构选择。"
      }
    ]
  }
]) satisfies LeetcodeSeriesProblem[];

export const leetcodeSeriesStats = {
  "generatedAt": "2026-05-24",
  "series": 139,
  "problems": 500,
  "paidOnly": 77,
  "source": "LeetCode China official problemset metadata with Doocs statement and solution text where available."
} as const;
