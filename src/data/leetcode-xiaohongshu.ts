export interface LeetcodeXiaohongshuProblem {
  xiaohongshuRank: number;
  frontendId: string;
  titleCn: string;
  titleSlug: string;
  url: string;
  difficulty: string;
  acRate: string | null;
  paidOnly: boolean;
  source: "companyFavorite";
}

export const leetcodeXiaohongshuSourceUrl =
  "https://leetcode.cn/company/xiaohongshu/?favoriteSlug=xiaohongshu-all";

export const leetcodeXiaohongshuProblems = ([
  ["2694", "事件发射器", "event-emitter", "中等", "65.7%"],
  ["26", "删除有序数组中的重复项", "remove-duplicates-from-sorted-array", "简单", "58.6%"],
  ["120", "三角形最小路径和", "triangle", "中等", "69.7%"],
  ["232", "用栈实现队列", "implement-queue-using-stacks", "简单", "68.1%"],
  ["347", "前 K 个高频元素", "top-k-frequent-elements", "中等", "65.9%"],
  ["253", "会议室 II", "meeting-rooms-ii", "中等", "53.3%"],
  ["763", "划分字母区间", "partition-labels", "中等", "79.0%"],
  ["498", "对角线遍历", "diagonal-traverse", "中等", "58.0%"],
  ["面试题 08.12", "八皇后", "eight-queens-lcci", "困难", "76.5%"],
  ["435", "无重叠区间", "non-overlapping-intervals", "中等", "53.5%"],
  ["LCR 146", "螺旋遍历二维数组", "shun-shi-zhen-da-yin-ju-zhen-lcof", "简单", "41.6%"],
  ["204", "计数质数", "count-primes", "中等", "37.0%"],
  ["209", "长度最小的子数组", "minimum-size-subarray-sum", "中等", "47.5%"],
  ["674", "最长连续递增序列", "longest-continuous-increasing-subsequence", "简单", "59.7%"],
  ["72", "编辑距离", "edit-distance", "中等", "64.1%"],
  ["64", "最小路径和", "minimum-path-sum", "中等", "72.5%"],
  ["862", "和至少为 K 的最短子数组", "shortest-subarray-with-sum-at-least-k", "困难", "29.1%"],
  ["2537", "统计好子数组的数目", "count-the-number-of-good-subarrays", "中等", "63.9%"],
  ["102", "二叉树的层序遍历", "binary-tree-level-order-traversal", "中等", "70.7%"],
  ["LCR 083", "全排列", "VvJkup", "中等", "82.7%"],
  ["69", "x 的平方根", "sqrtx", "简单", "39.0%"],
  ["49", "字母异位词分组", "group-anagrams", "中等", "69.5%"],
  ["25", "K 个一组翻转链表", "reverse-nodes-in-k-group", "困难", "70.0%"],
  ["698", "划分为k个相等的子集", "partition-to-k-equal-sum-subsets", "中等", "42.6%"],
  ["658", "找到 K 个最接近的元素", "find-k-closest-elements", "中等", "48.9%"],
  ["57", "插入区间", "insert-interval", "中等", "43.1%"],
  ["881", "救生艇", "boats-to-save-people", "中等", "58.0%"],
  ["240", "搜索二维矩阵 II", "search-a-2d-matrix-ii", "中等", "57.3%"],
  ["952", "按公因数计算最大组件大小", "largest-component-size-by-common-factor", "困难", "52.2%"],
  ["368", "最大整除子集", "largest-divisible-subset", "中等", "47.4%"],
  ["LCR 194", "二叉树的最近公共祖先", "er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof", "简单", "69.8%"],
  ["41", "缺失的第一个正数", "first-missing-positive", "困难", "49.5%"],
  ["452", "用最少数量的箭引爆气球", "minimum-number-of-arrows-to-burst-balloons", "中等", "53.6%"],
  ["236", "二叉树的最近公共祖先", "lowest-common-ancestor-of-a-binary-tree", "中等", "75.2%"],
  ["21", "合并两个有序链表", "merge-two-sorted-lists", "简单", "68.2%"],
  ["114", "二叉树展开为链表", "flatten-binary-tree-to-linked-list", "中等", "76.2%"],
  ["184", "部门工资最高的员工", "department-highest-salary", "中等", "54.3%"],
  ["51", "N 皇后", "n-queens", "困难", "75.3%"],
  ["124", "二叉树中的最大路径和", "binary-tree-maximum-path-sum", "困难", "48.2%"],
  ["2", "两数相加", "add-two-numbers", "中等", "47.0%"],
  ["386", "字典序排数", "lexicographical-numbers", "中等", "75.2%"],
  ["130", "被围绕的区域", "surrounded-regions", "中等", "47.6%"],
  ["239", "滑动窗口最大值", "sliding-window-maximum", "困难", "50.3%"],
  ["845", "数组中的最长山脉", "longest-mountain-in-array", "中等", "43.5%"],
  ["53", "最大子数组和", "maximum-subarray", "中等", "56.8%"],
  ["300", "最长递增子序列", "longest-increasing-subsequence", "中等", "58.8%"],
  ["1201", "丑数 III", "ugly-number-iii", "中等", "30.8%"],
  ["LCR 079", "子集", "TVdhkn", "中等", "83.9%"],
  ["141", "环形链表", "linked-list-cycle", "简单", "54.9%"],
  ["138", "随机链表的复制", "copy-list-with-random-pointer", "中等", "70.6%"],
  ["146", "LRU 缓存", "lru-cache", "中等", "55.6%"],
  ["121", "买卖股票的最佳时机", "best-time-to-buy-and-sell-stock", "简单", "60.1%"],
  ["55", "跳跃游戏", "jump-game", "中等", "45.1%"],
  ["33", "搜索旋转排序数组", "search-in-rotated-sorted-array", "中等", "46.3%"],
  ["32", "最长有效括号", "longest-valid-parentheses", "困难", "42.3%"],
  ["20", "有效的括号", "valid-parentheses", "简单", "45.7%"],
  ["15", "三数之和", "3sum", "中等", "40.5%"],
  ["5", "最长回文子串", "longest-palindromic-substring", "中等", "40.9%"],
  ["918", "环形子数组的最大和", "maximum-sum-circular-subarray", "中等", "46.8%"],
  ["LCR 168", "丑数", "chou-shu-lcof", "中等", "63.9%"],
  ["494", "目标和", "target-sum", "中等", "48.9%"],
  ["622", "设计循环队列", "design-circular-queue", "中等", "47.3%"],
  ["92", "反转链表 II", "reverse-linked-list-ii", "中等", "58.3%"],
  ["220", "存在重复元素 III", "contains-duplicate-iii", "困难", "31.9%"],
  ["LCR 036", "逆波兰表达式求值", "8Zf90G", "中等", "55.6%"],
  ["LCR 159", "库存管理 III", "zui-xiao-de-kge-shu-lcof", "简单", "57.7%"],
  ["76", "最小覆盖子串", "minimum-window-substring", "困难", "49.4%"],
  ["322", "零钱兑换", "coin-change", "中等", "53.1%"],
  ["3", "无重复字符的最长子串", "longest-substring-without-repeating-characters", "中等", "42.6%"],
  ["56", "合并区间", "merge-intervals", "中等", "53.7%"],
  ["2214", "通关游戏所需的最低生命值", "minimum-health-to-beat-game", "中等", "54.2%"],
  ["44", "通配符匹配", "wildcard-matching", "困难", "34.9%"],
  ["295", "数据流的中位数", "find-median-from-data-stream", "困难", "59.5%"],
  ["416", "分割等和子集", "partition-equal-subset-sum", "中等", "54.2%"],
  ["27", "移除元素", "remove-element", "简单", "60.2%"],
  ["151", "反转字符串中的单词", "reverse-words-in-a-string", "中等", "59.7%"],
  ["23", "合并 K 个升序链表", "merge-k-sorted-lists", "困难", "63.9%"],
].map(([frontendId, titleCn, titleSlug, difficulty, acRate], index) => ({
  acRate,
  difficulty,
  frontendId,
  paidOnly: false,
  source: "companyFavorite",
  titleCn,
  titleSlug,
  url: `https://leetcode.cn/problems/${titleSlug}/description/`,
  xiaohongshuRank: index + 1,
}))) satisfies LeetcodeXiaohongshuProblem[];

export const leetcodeXiaohongshuStats = {
  sourceObservedAt: "2026-06-25",
  sourceUpdatedLabel: "17 小时前",
  targetAll: 77,
  syncedAll: 77,
  sourceStatus: "companyFavorite",
  difficultyCounts: {
    easy: 12,
    medium: 51,
    hard: 14,
  },
  source:
    "Chrome-rendered LeetCode China company favorite page, visible xiaohongshu-all list.",
} as const;
