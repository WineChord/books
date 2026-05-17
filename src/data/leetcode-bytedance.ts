export interface LeetcodeByteDanceBucketRanks {
  all: number | null;
  thirtyDays: number | null;
  threeMonths: number | null;
  sixMonths: number | null;
  moreThanSixMonths: number | null;
}

export type LeetcodeByteDanceBucketSource =
  | "companyFavorite"
  | "companyRendered"
  | "legacyTop888";

export interface LeetcodeByteDanceProblem {
  bytedanceRank: number | null;
  frontendId: string;
  titleCn: string;
  titleSlug: string;
  url: string;
  difficulty: string;
  acRate: string | null;
  frequency: number | null;
  paidOnly: boolean;
  source: "companyFavorite" | "companyRendered" | "legacyTop888";
  tags: Array<{ slug: string; name: string }>;
  buckets: LeetcodeByteDanceBucketRanks;
  bucketSources?: Partial<Record<keyof LeetcodeByteDanceBucketRanks, LeetcodeByteDanceBucketSource>>;
}

export const leetcodeByteDanceProblems = ([
  {
    "acRate": "55.1%",
    "buckets": {
      "all": 1,
      "thirtyDays": 1,
      "threeMonths": 1,
      "sixMonths": 1,
      "moreThanSixMonths": 1
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 1,
    "difficulty": "简单",
    "frontendId": "1",
    "frequency": 100,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "两数之和",
    "titleSlug": "two-sum",
    "url": "https://leetcode.cn/problems/two-sum/description/"
  },
  {
    "acRate": "46.9%",
    "buckets": {
      "all": 2,
      "thirtyDays": 2,
      "threeMonths": 2,
      "sixMonths": 7,
      "moreThanSixMonths": 2
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 2,
    "difficulty": "中等",
    "frontendId": "2",
    "frequency": 92,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "两数相加",
    "titleSlug": "add-two-numbers",
    "url": "https://leetcode.cn/problems/add-two-numbers/description/"
  },
  {
    "acRate": "42.4%",
    "buckets": {
      "all": 3,
      "thirtyDays": 3,
      "threeMonths": 3,
      "sixMonths": 2,
      "moreThanSixMonths": 3
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 3,
    "difficulty": "中等",
    "frontendId": "3",
    "frequency": 99,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "无重复字符的最长子串",
    "titleSlug": "longest-substring-without-repeating-characters",
    "url": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/"
  },
  {
    "acRate": "44.6%",
    "buckets": {
      "all": 4,
      "thirtyDays": 27,
      "threeMonths": 4,
      "sixMonths": 18,
      "moreThanSixMonths": 4
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 4,
    "difficulty": "困难",
    "frontendId": "4",
    "frequency": 90.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "寻找两个正序数组的中位数",
    "titleSlug": "median-of-two-sorted-arrays",
    "url": "https://leetcode.cn/problems/median-of-two-sorted-arrays/description/"
  },
  {
    "acRate": "55.5%",
    "buckets": {
      "all": 5,
      "thirtyDays": 8,
      "threeMonths": 43,
      "sixMonths": 74,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 5,
    "difficulty": "中等",
    "frontendId": "146",
    "frequency": 96.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "LRU 缓存",
    "titleSlug": "lru-cache",
    "url": "https://leetcode.cn/problems/lru-cache/description/"
  },
  {
    "acRate": "40.8%",
    "buckets": {
      "all": 5,
      "thirtyDays": 4,
      "threeMonths": 5,
      "sixMonths": 23,
      "moreThanSixMonths": 5
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 5,
    "difficulty": "中等",
    "frontendId": "5",
    "frequency": 95.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长回文子串",
    "titleSlug": "longest-palindromic-substring",
    "url": "https://leetcode.cn/problems/longest-palindromic-substring/description/"
  },
  {
    "acRate": "54.2%",
    "buckets": {
      "all": 6,
      "thirtyDays": null,
      "threeMonths": 62,
      "sixMonths": null,
      "moreThanSixMonths": 6
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 6,
    "difficulty": "中等",
    "frontendId": "6",
    "frequency": 64.8,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "Z 字形变换",
    "titleSlug": "zigzag-conversion",
    "url": "https://leetcode.cn/problems/zigzag-conversion/description/"
  },
  {
    "acRate": "48.9%",
    "buckets": {
      "all": 7,
      "thirtyDays": 9,
      "threeMonths": 38,
      "sixMonths": 66,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 7,
    "difficulty": "中等",
    "frontendId": "128",
    "frequency": 94.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长连续序列",
    "titleSlug": "longest-consecutive-sequence",
    "url": "https://leetcode.cn/problems/longest-consecutive-sequence/description/"
  },
  {
    "acRate": "35.7%",
    "buckets": {
      "all": 7,
      "thirtyDays": 82,
      "threeMonths": 97,
      "sixMonths": 3,
      "moreThanSixMonths": 7
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 7,
    "difficulty": "中等",
    "frontendId": "7",
    "frequency": 67.5,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "整数反转",
    "titleSlug": "reverse-integer",
    "url": "https://leetcode.cn/problems/reverse-integer/description/"
  },
  {
    "acRate": "22.0%",
    "buckets": {
      "all": 8,
      "thirtyDays": null,
      "threeMonths": 187,
      "sixMonths": 4,
      "moreThanSixMonths": 8
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 8,
    "difficulty": "中等",
    "frontendId": "8",
    "frequency": 48,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "字符串转换整数 (atoi)",
    "titleSlug": "string-to-integer-atoi",
    "url": "https://leetcode.cn/problems/string-to-integer-atoi/description/"
  },
  {
    "acRate": "56.2%",
    "buckets": {
      "all": 9,
      "thirtyDays": 72,
      "threeMonths": 71,
      "sixMonths": 5,
      "moreThanSixMonths": 9
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 9,
    "difficulty": "简单",
    "frontendId": "9",
    "frequency": 83.3,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "回文数",
    "titleSlug": "palindrome-number",
    "url": "https://leetcode.cn/problems/palindrome-number/description/"
  },
  {
    "acRate": "46.5%",
    "buckets": {
      "all": 10,
      "thirtyDays": 12,
      "threeMonths": 57,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 10,
    "difficulty": "中等",
    "frontendId": "560",
    "frequency": 93,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "和为 K 的子数组",
    "titleSlug": "subarray-sum-equals-k",
    "url": "https://leetcode.cn/problems/subarray-sum-equals-k/description/"
  },
  {
    "acRate": "31.2%",
    "buckets": {
      "all": 10,
      "thirtyDays": null,
      "threeMonths": 90,
      "sixMonths": 43,
      "moreThanSixMonths": 10
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 10,
    "difficulty": "困难",
    "frontendId": "10",
    "frequency": 67.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "正则表达式匹配",
    "titleSlug": "regular-expression-matching",
    "url": "https://leetcode.cn/problems/regular-expression-matching/description/"
  },
  {
    "acRate": "61.8%",
    "buckets": {
      "all": 11,
      "thirtyDays": 5,
      "threeMonths": 6,
      "sixMonths": 6,
      "moreThanSixMonths": 11
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 11,
    "difficulty": "中等",
    "frontendId": "11",
    "frequency": 91.5,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "盛最多水的容器",
    "titleSlug": "container-with-most-water",
    "url": "https://leetcode.cn/problems/container-with-most-water/description/"
  },
  {
    "acRate": "69.3%",
    "buckets": {
      "all": 12,
      "thirtyDays": null,
      "threeMonths": 152,
      "sixMonths": null,
      "moreThanSixMonths": 12
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 12,
    "difficulty": "中等",
    "frontendId": "12",
    "frequency": 57,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "整数转罗马数字",
    "titleSlug": "integer-to-roman",
    "url": "https://leetcode.cn/problems/integer-to-roman/description/"
  },
  {
    "acRate": "64.0%",
    "buckets": {
      "all": 13,
      "thirtyDays": 13,
      "threeMonths": 46,
      "sixMonths": 85,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 13,
    "difficulty": "中等",
    "frontendId": "200",
    "frequency": 91,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "岛屿数量",
    "titleSlug": "number-of-islands",
    "url": "https://leetcode.cn/problems/number-of-islands/description/"
  },
  {
    "acRate": "64.2%",
    "buckets": {
      "all": 13,
      "thirtyDays": null,
      "threeMonths": 87,
      "sixMonths": null,
      "moreThanSixMonths": 13
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 13,
    "difficulty": "简单",
    "frontendId": "13",
    "frequency": 68.6,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "罗马数字转整数",
    "titleSlug": "roman-to-integer",
    "url": "https://leetcode.cn/problems/roman-to-integer/description/"
  },
  {
    "acRate": "45.2%",
    "buckets": {
      "all": 14,
      "thirtyDays": 97,
      "threeMonths": 7,
      "sixMonths": 47,
      "moreThanSixMonths": 14
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 14,
    "difficulty": "简单",
    "frontendId": "14",
    "frequency": 84.5,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "最长公共前缀",
    "titleSlug": "longest-common-prefix",
    "url": "https://leetcode.cn/problems/longest-common-prefix/description/"
  },
  {
    "acRate": "40.5%",
    "buckets": {
      "all": 15,
      "thirtyDays": 6,
      "threeMonths": 8,
      "sixMonths": 8,
      "moreThanSixMonths": 15
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 15,
    "difficulty": "中等",
    "frontendId": "15",
    "frequency": 94.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "三数之和",
    "titleSlug": "3sum",
    "url": "https://leetcode.cn/problems/3sum/description/"
  },
  {
    "acRate": "60.2%",
    "buckets": {
      "all": 16,
      "thirtyDays": 18,
      "threeMonths": 48,
      "sixMonths": 89,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 16,
    "difficulty": "中等",
    "frontendId": "215",
    "frequency": 89.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "数组中的第K个最大元素",
    "titleSlug": "kth-largest-element-in-an-array",
    "url": "https://leetcode.cn/problems/kth-largest-element-in-an-array/description/"
  },
  {
    "acRate": "44.9%",
    "buckets": {
      "all": 16,
      "thirtyDays": 57,
      "threeMonths": 95,
      "sixMonths": 9,
      "moreThanSixMonths": 16
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 16,
    "difficulty": "中等",
    "frontendId": "16",
    "frequency": 66.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最接近的三数之和",
    "titleSlug": "3sum-closest",
    "url": "https://leetcode.cn/problems/3sum-closest/description/"
  },
  {
    "acRate": "63.6%",
    "buckets": {
      "all": 17,
      "thirtyDays": 56,
      "threeMonths": 9,
      "sixMonths": 10,
      "moreThanSixMonths": 17
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 17,
    "difficulty": "中等",
    "frontendId": "17",
    "frequency": 71.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "电话号码的字母组合",
    "titleSlug": "letter-combinations-of-a-phone-number",
    "url": "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/"
  },
  {
    "acRate": "63.8%",
    "buckets": {
      "all": 18,
      "thirtyDays": null,
      "threeMonths": 53,
      "sixMonths": 99,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 18,
    "difficulty": "简单",
    "frontendId": "283",
    "frequency": 87.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "移动零",
    "titleSlug": "move-zeroes",
    "url": "https://leetcode.cn/problems/move-zeroes/description/"
  },
  {
    "acRate": "36.9%",
    "buckets": {
      "all": 18,
      "thirtyDays": null,
      "threeMonths": 130,
      "sixMonths": 11,
      "moreThanSixMonths": 18
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 18,
    "difficulty": "中等",
    "frontendId": "18",
    "frequency": 60.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "四数之和",
    "titleSlug": "4sum",
    "url": "https://leetcode.cn/problems/4sum/description/"
  },
  {
    "acRate": "53.3%",
    "buckets": {
      "all": 19,
      "thirtyDays": null,
      "threeMonths": 97,
      "sixMonths": 12,
      "moreThanSixMonths": 19
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 19,
    "difficulty": "中等",
    "frontendId": "19",
    "frequency": 66.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "删除链表的倒数第 N 个结点",
    "titleSlug": "remove-nth-node-from-end-of-list",
    "url": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/"
  },
  {
    "acRate": "45.6%",
    "buckets": {
      "all": 20,
      "thirtyDays": 24,
      "threeMonths": 10,
      "sixMonths": 13,
      "moreThanSixMonths": 20
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 20,
    "difficulty": "简单",
    "frontendId": "20",
    "frequency": 87.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "有效的括号",
    "titleSlug": "valid-parentheses",
    "url": "https://leetcode.cn/problems/valid-parentheses/description/"
  },
  {
    "acRate": "74.1%",
    "buckets": {
      "all": 20,
      "thirtyDays": null,
      "threeMonths": 76,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 20,
    "difficulty": "简单",
    "frontendId": "2235",
    "frequency": 87,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "两整数相加",
    "titleSlug": "add-two-integers",
    "url": "https://leetcode.cn/problems/add-two-integers/description/"
  },
  {
    "acRate": "68.2%",
    "buckets": {
      "all": 21,
      "thirtyDays": 16,
      "threeMonths": 11,
      "sixMonths": 14,
      "moreThanSixMonths": 21
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 21,
    "difficulty": "简单",
    "frontendId": "21",
    "frequency": 88.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "合并两个有序链表",
    "titleSlug": "merge-two-sorted-lists",
    "url": "https://leetcode.cn/problems/merge-two-sorted-lists/description/"
  },
  {
    "acRate": "76.4%",
    "buckets": {
      "all": 22,
      "thirtyDays": 21,
      "threeMonths": 47,
      "sixMonths": 87,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 22,
    "difficulty": "简单",
    "frontendId": "206",
    "frequency": 85.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "反转链表",
    "titleSlug": "reverse-linked-list",
    "url": "https://leetcode.cn/problems/reverse-linked-list/description/"
  },
  {
    "acRate": "79.1%",
    "buckets": {
      "all": 22,
      "thirtyDays": 11,
      "threeMonths": 12,
      "sixMonths": 15,
      "moreThanSixMonths": 22
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 22,
    "difficulty": "中等",
    "frontendId": "22",
    "frequency": 82.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "括号生成",
    "titleSlug": "generate-parentheses",
    "url": "https://leetcode.cn/problems/generate-parentheses/description/"
  },
  {
    "acRate": "63.8%",
    "buckets": {
      "all": 23,
      "thirtyDays": 42,
      "threeMonths": 88,
      "sixMonths": 16,
      "moreThanSixMonths": 23
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 23,
    "difficulty": "困难",
    "frontendId": "23",
    "frequency": 73.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "合并 K 个升序链表",
    "titleSlug": "merge-k-sorted-lists",
    "url": "https://leetcode.cn/problems/merge-k-sorted-lists/description/"
  },
  {
    "acRate": "75.0%",
    "buckets": {
      "all": 24,
      "thirtyDays": 19,
      "threeMonths": 13,
      "sixMonths": 17,
      "moreThanSixMonths": 24
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 24,
    "difficulty": "中等",
    "frontendId": "24",
    "frequency": 73.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "两两交换链表中的节点",
    "titleSlug": "swap-nodes-in-pairs",
    "url": "https://leetcode.cn/problems/swap-nodes-in-pairs/description/"
  },
  {
    "acRate": "60.0%",
    "buckets": {
      "all": 25,
      "thirtyDays": 55,
      "threeMonths": 37,
      "sixMonths": 64,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 25,
    "difficulty": "简单",
    "frontendId": "121",
    "frequency": 83.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "买卖股票的最佳时机",
    "titleSlug": "best-time-to-buy-and-sell-stock",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/"
  },
  {
    "acRate": "69.9%",
    "buckets": {
      "all": 25,
      "thirtyDays": 40,
      "threeMonths": 14,
      "sixMonths": 22,
      "moreThanSixMonths": 25
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 25,
    "difficulty": "困难",
    "frontendId": "25",
    "frequency": 81.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "K 个一组翻转链表",
    "titleSlug": "reverse-nodes-in-k-group",
    "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/description/"
  },
  {
    "acRate": "50.2%",
    "buckets": {
      "all": 26,
      "thirtyDays": null,
      "threeMonths": 52,
      "sixMonths": 94,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 26,
    "difficulty": "困难",
    "frontendId": "239",
    "frequency": 83.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "滑动窗口最大值",
    "titleSlug": "sliding-window-maximum",
    "url": "https://leetcode.cn/problems/sliding-window-maximum/description/"
  },
  {
    "acRate": "58.6%",
    "buckets": {
      "all": 26,
      "thirtyDays": null,
      "threeMonths": 15,
      "sixMonths": 19,
      "moreThanSixMonths": 26
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 26,
    "difficulty": "简单",
    "frontendId": "26",
    "frequency": 73.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "删除有序数组中的重复项",
    "titleSlug": "remove-duplicates-from-sorted-array",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/"
  },
  {
    "acRate": "60.2%",
    "buckets": {
      "all": 27,
      "thirtyDays": null,
      "threeMonths": 16,
      "sixMonths": 20,
      "moreThanSixMonths": 27
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 27,
    "difficulty": "简单",
    "frontendId": "27",
    "frequency": 80.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "移除元素",
    "titleSlug": "remove-element",
    "url": "https://leetcode.cn/problems/remove-element/description/"
  },
  {
    "acRate": "45.4%",
    "buckets": {
      "all": 28,
      "thirtyDays": null,
      "threeMonths": 17,
      "sixMonths": 21,
      "moreThanSixMonths": 28
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 28,
    "difficulty": "简单",
    "frontendId": "28",
    "frequency": 78.8,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "string-matching",
        "name": "字符串匹配"
      }
    ],
    "titleCn": "找出字符串中第一个匹配项的下标",
    "titleSlug": "find-the-index-of-the-first-occurrence-in-a-string",
    "url": "https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/"
  },
  {
    "acRate": "22.6%",
    "buckets": {
      "all": 29,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 16,
      "moreThanSixMonths": 29
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 29,
    "difficulty": "中等",
    "frontendId": "29",
    "frequency": 49.5,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "两数相除",
    "titleSlug": "divide-two-integers",
    "url": "https://leetcode.cn/problems/divide-two-integers/description/"
  },
  {
    "acRate": "38.3%",
    "buckets": {
      "all": 30,
      "thirtyDays": null,
      "threeMonths": 171,
      "sixMonths": null,
      "moreThanSixMonths": 30
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 30,
    "difficulty": "困难",
    "frontendId": "30",
    "frequency": 52.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "串联所有单词的子串",
    "titleSlug": "substring-with-concatenation-of-all-words",
    "url": "https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description/"
  },
  {
    "acRate": "56.2%",
    "buckets": {
      "all": 31,
      "thirtyDays": 85,
      "threeMonths": 31,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 31,
    "difficulty": "简单",
    "frontendId": "704",
    "frequency": 82.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二分查找",
    "titleSlug": "binary-search",
    "url": "https://leetcode.cn/problems/binary-search/description/"
  },
  {
    "acRate": "42.8%",
    "buckets": {
      "all": 31,
      "thirtyDays": 25,
      "threeMonths": 18,
      "sixMonths": 24,
      "moreThanSixMonths": 31
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 31,
    "difficulty": "中等",
    "frontendId": "31",
    "frequency": 71.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "下一个排列",
    "titleSlug": "next-permutation",
    "url": "https://leetcode.cn/problems/next-permutation/description/"
  },
  {
    "acRate": "42.1%",
    "buckets": {
      "all": 32,
      "thirtyDays": null,
      "threeMonths": 63,
      "sixMonths": null,
      "moreThanSixMonths": 32
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 32,
    "difficulty": "困难",
    "frontendId": "32",
    "frequency": 78.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长有效括号",
    "titleSlug": "longest-valid-parentheses",
    "url": "https://leetcode.cn/problems/longest-valid-parentheses/description/"
  },
  {
    "acRate": "54.6%",
    "buckets": {
      "all": 33,
      "thirtyDays": 33,
      "threeMonths": 56,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 33,
    "difficulty": "中等",
    "frontendId": "438",
    "frequency": 81.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "找到字符串中所有字母异位词",
    "titleSlug": "find-all-anagrams-in-a-string",
    "url": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/"
  },
  {
    "acRate": "46.1%",
    "buckets": {
      "all": 33,
      "thirtyDays": 17,
      "threeMonths": 19,
      "sixMonths": 25,
      "moreThanSixMonths": 33
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 33,
    "difficulty": "中等",
    "frontendId": "33",
    "frequency": 74.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "搜索旋转排序数组",
    "titleSlug": "search-in-rotated-sorted-array",
    "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array/description/"
  },
  {
    "acRate": "46.7%",
    "buckets": {
      "all": 34,
      "thirtyDays": null,
      "threeMonths": 84,
      "sixMonths": 26,
      "moreThanSixMonths": 34
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 34,
    "difficulty": "中等",
    "frontendId": "34",
    "frequency": 69.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "在排序数组中查找元素的第一个和最后一个位置",
    "titleSlug": "find-first-and-last-position-of-element-in-sorted-array",
    "url": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/"
  },
  {
    "acRate": "75.1%",
    "buckets": {
      "all": 35,
      "thirtyDays": null,
      "threeMonths": 51,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 35,
    "difficulty": "中等",
    "frontendId": "236",
    "frequency": 79.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的最近公共祖先",
    "titleSlug": "lowest-common-ancestor-of-a-binary-tree",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/"
  },
  {
    "acRate": "49.5%",
    "buckets": {
      "all": 35,
      "thirtyDays": 95,
      "threeMonths": 56,
      "sixMonths": 27,
      "moreThanSixMonths": 35
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 35,
    "difficulty": "简单",
    "frontendId": "35",
    "frequency": 74.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "搜索插入位置",
    "titleSlug": "search-insert-position",
    "url": "https://leetcode.cn/problems/search-insert-position/description/"
  },
  {
    "acRate": "56.4%",
    "buckets": {
      "all": 36,
      "thirtyDays": null,
      "threeMonths": 36,
      "sixMonths": 83,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 36,
    "difficulty": "中等",
    "frontendId": "198",
    "frequency": 79.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "打家劫舍",
    "titleSlug": "house-robber",
    "url": "https://leetcode.cn/problems/house-robber/description/"
  },
  {
    "acRate": "64.9%",
    "buckets": {
      "all": 36,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 11,
      "moreThanSixMonths": 36
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 36,
    "difficulty": "中等",
    "frontendId": "36",
    "frequency": 53.7,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "titleCn": "有效的数独",
    "titleSlug": "valid-sudoku",
    "url": "https://leetcode.cn/problems/valid-sudoku/description/"
  },
  {
    "acRate": "68.3%",
    "buckets": {
      "all": 37,
      "thirtyDays": 59,
      "threeMonths": 69,
      "sixMonths": 98,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 37,
    "difficulty": "中等",
    "frontendId": "279",
    "frequency": 79.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "完全平方数",
    "titleSlug": "perfect-squares",
    "url": "https://leetcode.cn/problems/perfect-squares/description/"
  },
  {
    "acRate": "67.2%",
    "buckets": {
      "all": 37,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 28,
      "moreThanSixMonths": 37
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 37,
    "difficulty": "困难",
    "frontendId": "37",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "titleCn": "解数独",
    "titleSlug": "sudoku-solver",
    "url": "https://leetcode.cn/problems/sudoku-solver/description/"
  },
  {
    "acRate": "74.1%",
    "buckets": {
      "all": 38,
      "thirtyDays": null,
      "threeMonths": 140,
      "sixMonths": 31,
      "moreThanSixMonths": 38
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 38,
    "difficulty": "中等",
    "frontendId": "39",
    "frequency": 58.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "组合总和",
    "titleSlug": "combination-sum",
    "url": "https://leetcode.cn/problems/combination-sum/description/"
  },
  {
    "acRate": "60.1%",
    "buckets": {
      "all": 39,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 39
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 39,
    "difficulty": "中等",
    "frontendId": "40",
    "frequency": 28.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "组合总和 II",
    "titleSlug": "combination-sum-ii",
    "url": "https://leetcode.cn/problems/combination-sum-ii/description/"
  },
  {
    "acRate": "49.4%",
    "buckets": {
      "all": 40,
      "thirtyDays": 29,
      "threeMonths": 20,
      "sixMonths": 29,
      "moreThanSixMonths": 40
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 40,
    "difficulty": "困难",
    "frontendId": "41",
    "frequency": 76.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "缺失的第一个正数",
    "titleSlug": "first-missing-positive",
    "url": "https://leetcode.cn/problems/first-missing-positive/description/"
  },
  {
    "acRate": "66.0%",
    "buckets": {
      "all": 41,
      "thirtyDays": 7,
      "threeMonths": 21,
      "sixMonths": 33,
      "moreThanSixMonths": 41
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 41,
    "difficulty": "困难",
    "frontendId": "42",
    "frequency": 98,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "接雨水",
    "titleSlug": "trapping-rain-water",
    "url": "https://leetcode.cn/problems/trapping-rain-water/description/"
  },
  {
    "acRate": "69.7%",
    "buckets": {
      "all": 42,
      "thirtyDays": 23,
      "threeMonths": 84,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 42,
    "difficulty": "中等",
    "frontendId": "739",
    "frequency": 78,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "每日温度",
    "titleSlug": "daily-temperatures",
    "url": "https://leetcode.cn/problems/daily-temperatures/description/"
  },
  {
    "acRate": "45.1%",
    "buckets": {
      "all": 42,
      "thirtyDays": null,
      "threeMonths": 72,
      "sixMonths": 30,
      "moreThanSixMonths": 42
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 42,
    "difficulty": "中等",
    "frontendId": "43",
    "frequency": 70.7,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "字符串相乘",
    "titleSlug": "multiply-strings",
    "url": "https://leetcode.cn/problems/multiply-strings/description/"
  },
  {
    "acRate": "54.2%",
    "buckets": {
      "all": 43,
      "thirtyDays": 41,
      "threeMonths": 55,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 43,
    "difficulty": "中等",
    "frontendId": "416",
    "frequency": 77.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "分割等和子集",
    "titleSlug": "partition-equal-subset-sum",
    "url": "https://leetcode.cn/problems/partition-equal-subset-sum/description/"
  },
  {
    "acRate": "45.8%",
    "buckets": {
      "all": 43,
      "thirtyDays": 62,
      "threeMonths": 22,
      "sixMonths": 32,
      "moreThanSixMonths": 43
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 43,
    "difficulty": "中等",
    "frontendId": "45",
    "frequency": 75.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "跳跃游戏 II",
    "titleSlug": "jump-game-ii",
    "url": "https://leetcode.cn/problems/jump-game-ii/description/"
  },
  {
    "acRate": "80.3%",
    "buckets": {
      "all": 44,
      "thirtyDays": 32,
      "threeMonths": 64,
      "sixMonths": 34,
      "moreThanSixMonths": 44
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 44,
    "difficulty": "中等",
    "frontendId": "46",
    "frequency": 78.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "全排列",
    "titleSlug": "permutations",
    "url": "https://leetcode.cn/problems/permutations/description/"
  },
  {
    "acRate": "47.4%",
    "buckets": {
      "all": 44,
      "thirtyDays": null,
      "threeMonths": 61,
      "sixMonths": 88,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 44,
    "difficulty": "中等",
    "frontendId": "209",
    "frequency": 77.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "长度最小的子数组",
    "titleSlug": "minimum-size-subarray-sum",
    "url": "https://leetcode.cn/problems/minimum-size-subarray-sum/description/"
  },
  {
    "acRate": "68.3%",
    "buckets": {
      "all": 45,
      "thirtyDays": 54,
      "threeMonths": 45,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 45,
    "difficulty": "简单",
    "frontendId": "160",
    "frequency": 77.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "相交链表",
    "titleSlug": "intersection-of-two-linked-lists",
    "url": "https://leetcode.cn/problems/intersection-of-two-linked-lists/description/"
  },
  {
    "acRate": "66.8%",
    "buckets": {
      "all": 45,
      "thirtyDays": 39,
      "threeMonths": 80,
      "sixMonths": null,
      "moreThanSixMonths": 45
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 45,
    "difficulty": "中等",
    "frontendId": "47",
    "frequency": 63.7,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "全排列 II",
    "titleSlug": "permutations-ii",
    "url": "https://leetcode.cn/problems/permutations-ii/description/"
  },
  {
    "acRate": "74.3%",
    "buckets": {
      "all": 46,
      "thirtyDays": null,
      "threeMonths": 46,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 46,
    "difficulty": "简单",
    "frontendId": "175",
    "frequency": 76.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "组合两个表",
    "titleSlug": "combine-two-tables",
    "url": "https://leetcode.cn/problems/combine-two-tables/description/"
  },
  {
    "acRate": "79.4%",
    "buckets": {
      "all": 46,
      "thirtyDays": null,
      "threeMonths": 23,
      "sixMonths": 35,
      "moreThanSixMonths": 46
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 46,
    "difficulty": "中等",
    "frontendId": "48",
    "frequency": 66.3,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "titleCn": "旋转图像",
    "titleSlug": "rotate-image",
    "url": "https://leetcode.cn/problems/rotate-image/description/"
  },
  {
    "acRate": "69.6%",
    "buckets": {
      "all": 47,
      "thirtyDays": 10,
      "threeMonths": 24,
      "sixMonths": 36,
      "moreThanSixMonths": 47
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 47,
    "difficulty": "中等",
    "frontendId": "49",
    "frequency": 97.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "字母异位词分组",
    "titleSlug": "group-anagrams",
    "url": "https://leetcode.cn/problems/group-anagrams/description/"
  },
  {
    "acRate": "39.2%",
    "buckets": {
      "all": 48,
      "thirtyDays": null,
      "threeMonths": 195,
      "sixMonths": 37,
      "moreThanSixMonths": 48
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 48,
    "difficulty": "中等",
    "frontendId": "50",
    "frequency": 46.9,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "Pow(x, n)",
    "titleSlug": "powx-n",
    "url": "https://leetcode.cn/problems/powx-n/description/"
  },
  {
    "acRate": "75.3%",
    "buckets": {
      "all": 49,
      "thirtyDays": null,
      "threeMonths": 65,
      "sixMonths": 38,
      "moreThanSixMonths": 49
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 49,
    "difficulty": "困难",
    "frontendId": "51",
    "frequency": 76.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "N 皇后",
    "titleSlug": "n-queens",
    "url": "https://leetcode.cn/problems/n-queens/description/"
  },
  {
    "acRate": "47.8%",
    "buckets": {
      "all": 50,
      "thirtyDays": null,
      "threeMonths": 90,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 50,
    "difficulty": "中等",
    "frontendId": "912",
    "frequency": 75.5,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "bucket-sort",
        "name": "桶排序"
      },
      {
        "slug": "counting-sort",
        "name": "计数排序"
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
      },
      {
        "slug": "merge-sort",
        "name": "归并排序"
      }
    ],
    "titleCn": "排序数组",
    "titleSlug": "sort-an-array",
    "url": "https://leetcode.cn/problems/sort-an-array/description/"
  },
  {
    "acRate": "82.9%",
    "buckets": {
      "all": 50,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 50
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 50,
    "difficulty": "困难",
    "frontendId": "52",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "N 皇后 II",
    "titleSlug": "n-queens-ii",
    "url": "https://leetcode.cn/problems/n-queens-ii/description/"
  },
  {
    "acRate": "56.7%",
    "buckets": {
      "all": 51,
      "thirtyDays": 30,
      "threeMonths": 25,
      "sixMonths": 39,
      "moreThanSixMonths": 51
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 51,
    "difficulty": "中等",
    "frontendId": "53",
    "frequency": 82.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最大子数组和",
    "titleSlug": "maximum-subarray",
    "url": "https://leetcode.cn/problems/maximum-subarray/description/"
  },
  {
    "acRate": "67.7%",
    "buckets": {
      "all": 51,
      "thirtyDays": 52,
      "threeMonths": 50,
      "sixMonths": 91,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 51,
    "difficulty": "中等",
    "frontendId": "1143",
    "frequency": 75.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长公共子序列",
    "titleSlug": "longest-common-subsequence",
    "url": "https://leetcode.cn/problems/longest-common-subsequence/description/"
  },
  {
    "acRate": "55.3%",
    "buckets": {
      "all": 52,
      "thirtyDays": 20,
      "threeMonths": 26,
      "sixMonths": 40,
      "moreThanSixMonths": 52
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 52,
    "difficulty": "中等",
    "frontendId": "54",
    "frequency": 86.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "螺旋矩阵",
    "titleSlug": "spiral-matrix",
    "url": "https://leetcode.cn/problems/spiral-matrix/description/"
  },
  {
    "acRate": "75.1%",
    "buckets": {
      "all": 52,
      "thirtyDays": null,
      "threeMonths": 39,
      "sixMonths": 67,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 52,
    "difficulty": "中等",
    "frontendId": "131",
    "frequency": 75.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "分割回文串",
    "titleSlug": "palindrome-partitioning",
    "url": "https://leetcode.cn/problems/palindrome-partitioning/description/"
  },
  {
    "acRate": "45.0%",
    "buckets": {
      "all": 53,
      "thirtyDays": null,
      "threeMonths": 27,
      "sixMonths": 41,
      "moreThanSixMonths": 53
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 53,
    "difficulty": "中等",
    "frontendId": "55",
    "frequency": 75.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "跳跃游戏",
    "titleSlug": "jump-game",
    "url": "https://leetcode.cn/problems/jump-game/description/"
  },
  {
    "acRate": "53.6%",
    "buckets": {
      "all": 54,
      "thirtyDays": 15,
      "threeMonths": 28,
      "sixMonths": 42,
      "moreThanSixMonths": 54
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 54,
    "difficulty": "中等",
    "frontendId": "56",
    "frequency": 90.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "合并区间",
    "titleSlug": "merge-intervals",
    "url": "https://leetcode.cn/problems/merge-intervals/description/"
  },
  {
    "acRate": "48.1%",
    "buckets": {
      "all": 54,
      "thirtyDays": 70,
      "threeMonths": 58,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 54,
    "difficulty": "困难",
    "frontendId": "124",
    "frequency": 75,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树中的最大路径和",
    "titleSlug": "binary-tree-maximum-path-sum",
    "url": "https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/"
  },
  {
    "acRate": "43.0%",
    "buckets": {
      "all": 55,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 86
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 55,
    "difficulty": "中等",
    "frontendId": "57",
    "frequency": 28.5,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "插入区间",
    "titleSlug": "insert-interval",
    "url": "https://leetcode.cn/problems/insert-interval/description/"
  },
  {
    "acRate": "48.8%",
    "buckets": {
      "all": 56,
      "thirtyDays": null,
      "threeMonths": 235,
      "sixMonths": null,
      "moreThanSixMonths": 55
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 56,
    "difficulty": "简单",
    "frontendId": "58",
    "frequency": 38.4,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "最后一个单词的长度",
    "titleSlug": "length-of-last-word",
    "url": "https://leetcode.cn/problems/length-of-last-word/description/"
  },
  {
    "acRate": "69.4%",
    "buckets": {
      "all": 57,
      "thirtyDays": null,
      "threeMonths": 60,
      "sixMonths": 44,
      "moreThanSixMonths": 56
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 57,
    "difficulty": "中等",
    "frontendId": "59",
    "frequency": 79.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "螺旋矩阵 II",
    "titleSlug": "spiral-matrix-ii",
    "url": "https://leetcode.cn/problems/spiral-matrix-ii/description/"
  },
  {
    "acRate": "57.2%",
    "buckets": {
      "all": 57,
      "thirtyDays": null,
      "threeMonths": 57,
      "sixMonths": 95,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 57,
    "difficulty": "中等",
    "frontendId": "240",
    "frequency": 74.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "搜索二维矩阵 II",
    "titleSlug": "search-a-2d-matrix-ii",
    "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/description/"
  },
  {
    "acRate": "58.7%",
    "buckets": {
      "all": 58,
      "thirtyDays": null,
      "threeMonths": 54,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 58,
    "difficulty": "中等",
    "frontendId": "300",
    "frequency": 74,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长递增子序列",
    "titleSlug": "longest-increasing-subsequence",
    "url": "https://leetcode.cn/problems/longest-increasing-subsequence/description/"
  },
  {
    "acRate": "41.6%",
    "buckets": {
      "all": 58,
      "thirtyDays": 31,
      "threeMonths": 180,
      "sixMonths": null,
      "moreThanSixMonths": 57
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 58,
    "difficulty": "中等",
    "frontendId": "61",
    "frequency": 49.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "旋转链表",
    "titleSlug": "rotate-list",
    "url": "https://leetcode.cn/problems/rotate-list/description/"
  },
  {
    "acRate": "70.3%",
    "buckets": {
      "all": 59,
      "thirtyDays": 49,
      "threeMonths": 137,
      "sixMonths": 45,
      "moreThanSixMonths": 58
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 59,
    "difficulty": "中等",
    "frontendId": "62",
    "frequency": 59.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "不同路径",
    "titleSlug": "unique-paths",
    "url": "https://leetcode.cn/problems/unique-paths/description/"
  },
  {
    "acRate": "42.6%",
    "buckets": {
      "all": 60,
      "thirtyDays": null,
      "threeMonths": 153,
      "sixMonths": null,
      "moreThanSixMonths": 59
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 60,
    "difficulty": "中等",
    "frontendId": "63",
    "frequency": 57,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "不同路径 II",
    "titleSlug": "unique-paths-ii",
    "url": "https://leetcode.cn/problems/unique-paths-ii/description/"
  },
  {
    "acRate": "58.3%",
    "buckets": {
      "all": 61,
      "thirtyDays": null,
      "threeMonths": 61,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 61,
    "difficulty": "简单",
    "frontendId": "234",
    "frequency": 73.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "titleCn": "回文链表",
    "titleSlug": "palindrome-linked-list",
    "url": "https://leetcode.cn/problems/palindrome-linked-list/description/"
  },
  {
    "acRate": "72.5%",
    "buckets": {
      "all": 61,
      "thirtyDays": 48,
      "threeMonths": 87,
      "sixMonths": null,
      "moreThanSixMonths": 60
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 61,
    "difficulty": "中等",
    "frontendId": "64",
    "frequency": 71.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最小路径和",
    "titleSlug": "minimum-path-sum",
    "url": "https://leetcode.cn/problems/minimum-path-sum/description/"
  },
  {
    "acRate": "47.5%",
    "buckets": {
      "all": 62,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 10,
      "moreThanSixMonths": 61
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 62,
    "difficulty": "简单",
    "frontendId": "66",
    "frequency": 54.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "加一",
    "titleSlug": "plus-one",
    "url": "https://leetcode.cn/problems/plus-one/description/"
  },
  {
    "acRate": "54.4%",
    "buckets": {
      "all": 63,
      "thirtyDays": null,
      "threeMonths": 94,
      "sixMonths": null,
      "moreThanSixMonths": 62
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 63,
    "difficulty": "简单",
    "frontendId": "67",
    "frequency": 64.2,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
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
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "二进制求和",
    "titleSlug": "add-binary",
    "url": "https://leetcode.cn/problems/add-binary/description/"
  },
  {
    "acRate": "70.4%",
    "buckets": {
      "all": 64,
      "thirtyDays": null,
      "threeMonths": 96,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 64,
    "difficulty": "简单",
    "frontendId": "1768",
    "frequency": 72.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "交替合并字符串",
    "titleSlug": "merge-strings-alternately",
    "url": "https://leetcode.cn/problems/merge-strings-alternately/description/"
  },
  {
    "acRate": "57.3%",
    "buckets": {
      "all": 64,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 63
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 64,
    "difficulty": "困难",
    "frontendId": "68",
    "frequency": 39.8,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "文本左右对齐",
    "titleSlug": "text-justification",
    "url": "https://leetcode.cn/problems/text-justification/description/"
  },
  {
    "acRate": "38.9%",
    "buckets": {
      "all": 65,
      "thirtyDays": null,
      "threeMonths": 29,
      "sixMonths": null,
      "moreThanSixMonths": 64
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 65,
    "difficulty": "简单",
    "frontendId": "69",
    "frequency": 64.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "x 的平方根",
    "titleSlug": "sqrtx",
    "url": "https://leetcode.cn/problems/sqrtx/description/"
  },
  {
    "acRate": "55.7%",
    "buckets": {
      "all": 66,
      "thirtyDays": 14,
      "threeMonths": 30,
      "sixMonths": 46,
      "moreThanSixMonths": 65
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 66,
    "difficulty": "简单",
    "frontendId": "70",
    "frequency": 93.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "爬楼梯",
    "titleSlug": "climbing-stairs",
    "url": "https://leetcode.cn/problems/climbing-stairs/description/"
  },
  {
    "acRate": "67.7%",
    "buckets": {
      "all": 66,
      "thirtyDays": 35,
      "threeMonths": 44,
      "sixMonths": 75,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 66,
    "difficulty": "中等",
    "frontendId": "148",
    "frequency": 71.8,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
      },
      {
        "slug": "sorting",
        "name": "排序"
      },
      {
        "slug": "merge-sort",
        "name": "归并排序"
      }
    ],
    "titleCn": "排序链表",
    "titleSlug": "sort-list",
    "url": "https://leetcode.cn/problems/sort-list/description/"
  },
  {
    "acRate": "48.5%",
    "buckets": {
      "all": 67,
      "thirtyDays": null,
      "threeMonths": 95,
      "sixMonths": null,
      "moreThanSixMonths": 66
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 67,
    "difficulty": "中等",
    "frontendId": "71",
    "frequency": 42.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "简化路径",
    "titleSlug": "simplify-path",
    "url": "https://leetcode.cn/problems/simplify-path/description/"
  },
  {
    "acRate": "64.1%",
    "buckets": {
      "all": 68,
      "thirtyDays": 37,
      "threeMonths": 31,
      "sixMonths": 48,
      "moreThanSixMonths": 67
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 68,
    "difficulty": "中等",
    "frontendId": "72",
    "frequency": 82.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "编辑距离",
    "titleSlug": "edit-distance",
    "url": "https://leetcode.cn/problems/edit-distance/description/"
  },
  {
    "acRate": "76.9%",
    "buckets": {
      "all": 68,
      "thirtyDays": null,
      "threeMonths": 68,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 68,
    "difficulty": "简单",
    "frontendId": "1929",
    "frequency": 71.3,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "数组串联",
    "titleSlug": "concatenation-of-array",
    "url": "https://leetcode.cn/problems/concatenation-of-array/description/"
  },
  {
    "acRate": "71.6%",
    "buckets": {
      "all": 69,
      "thirtyDays": null,
      "threeMonths": 72,
      "sixMonths": 49,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 69,
    "difficulty": "中等",
    "frontendId": "73",
    "frequency": 66,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "titleCn": "矩阵置零",
    "titleSlug": "set-matrix-zeroes",
    "url": "https://leetcode.cn/problems/set-matrix-zeroes/description/"
  },
  {
    "acRate": "52.6%",
    "buckets": {
      "all": 70,
      "thirtyDays": null,
      "threeMonths": 32,
      "sixMonths": 50,
      "moreThanSixMonths": 68
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 70,
    "difficulty": "中等",
    "frontendId": "74",
    "frequency": 67.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "搜索二维矩阵",
    "titleSlug": "search-a-2d-matrix",
    "url": "https://leetcode.cn/problems/search-a-2d-matrix/description/"
  },
  {
    "acRate": "67.9%",
    "buckets": {
      "all": 71,
      "thirtyDays": null,
      "threeMonths": 71,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 71,
    "difficulty": "中等",
    "frontendId": "143",
    "frequency": 71.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "titleCn": "重排链表",
    "titleSlug": "reorder-list",
    "url": "https://leetcode.cn/problems/reorder-list/description/"
  },
  {
    "acRate": "63.7%",
    "buckets": {
      "all": 71,
      "thirtyDays": null,
      "threeMonths": 164,
      "sixMonths": null,
      "moreThanSixMonths": 69
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 71,
    "difficulty": "中等",
    "frontendId": "75",
    "frequency": 54.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "颜色分类",
    "titleSlug": "sort-colors",
    "url": "https://leetcode.cn/problems/sort-colors/description/"
  },
  {
    "acRate": "49.3%",
    "buckets": {
      "all": 72,
      "thirtyDays": null,
      "threeMonths": 33,
      "sixMonths": 51,
      "moreThanSixMonths": 70
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 72,
    "difficulty": "困难",
    "frontendId": "76",
    "frequency": 73.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最小覆盖子串",
    "titleSlug": "minimum-window-substring",
    "url": "https://leetcode.cn/problems/minimum-window-substring/description/"
  },
  {
    "acRate": "72.6%",
    "buckets": {
      "all": 73,
      "thirtyDays": null,
      "threeMonths": 73,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 73,
    "difficulty": "中等",
    "frontendId": "208",
    "frequency": 70.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "实现 Trie (前缀树)",
    "titleSlug": "implement-trie-prefix-tree",
    "url": "https://leetcode.cn/problems/implement-trie-prefix-tree/description/"
  },
  {
    "acRate": "77.5%",
    "buckets": {
      "all": 73,
      "thirtyDays": null,
      "threeMonths": 139,
      "sixMonths": null,
      "moreThanSixMonths": 71
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 73,
    "difficulty": "中等",
    "frontendId": "77",
    "frequency": 58.7,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "titleCn": "组合",
    "titleSlug": "combinations",
    "url": "https://leetcode.cn/problems/combinations/description/"
  },
  {
    "acRate": "43.8%",
    "buckets": {
      "all": 74,
      "thirtyDays": null,
      "threeMonths": 85,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 74,
    "difficulty": "困难",
    "frontendId": "224",
    "frequency": 70.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "基本计算器",
    "titleSlug": "basic-calculator",
    "url": "https://leetcode.cn/problems/basic-calculator/description/"
  },
  {
    "acRate": "81.9%",
    "buckets": {
      "all": 74,
      "thirtyDays": null,
      "threeMonths": 114,
      "sixMonths": 52,
      "moreThanSixMonths": 72
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 74,
    "difficulty": "中等",
    "frontendId": "78",
    "frequency": 64,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "子集",
    "titleSlug": "subsets",
    "url": "https://leetcode.cn/problems/subsets/description/"
  },
  {
    "acRate": "55.6%",
    "buckets": {
      "all": 75,
      "thirtyDays": null,
      "threeMonths": 83,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 75,
    "difficulty": "中等",
    "frontendId": "994",
    "frequency": 70.3,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "腐烂的橘子",
    "titleSlug": "rotting-oranges",
    "url": "https://leetcode.cn/problems/rotting-oranges/description/"
  },
  {
    "acRate": "51.0%",
    "buckets": {
      "all": 75,
      "thirtyDays": null,
      "threeMonths": 145,
      "sixMonths": null,
      "moreThanSixMonths": 73
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 75,
    "difficulty": "中等",
    "frontendId": "79",
    "frequency": 58,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "单词搜索",
    "titleSlug": "word-search",
    "url": "https://leetcode.cn/problems/word-search/description/"
  },
  {
    "acRate": "52.0%",
    "buckets": {
      "all": 76,
      "thirtyDays": 43,
      "threeMonths": 49,
      "sixMonths": 90,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 76,
    "difficulty": "中等",
    "frontendId": "221",
    "frequency": 70.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最大正方形",
    "titleSlug": "maximal-square",
    "url": "https://leetcode.cn/problems/maximal-square/description/"
  },
  {
    "acRate": "63.5%",
    "buckets": {
      "all": 76,
      "thirtyDays": null,
      "threeMonths": 151,
      "sixMonths": 53,
      "moreThanSixMonths": 74
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 76,
    "difficulty": "中等",
    "frontendId": "80",
    "frequency": 57.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "删除有序数组中的重复项 II",
    "titleSlug": "remove-duplicates-from-sorted-array-ii",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/"
  },
  {
    "acRate": "68.5%",
    "buckets": {
      "all": 77,
      "thirtyDays": 58,
      "threeMonths": 77,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 77,
    "difficulty": "简单",
    "frontendId": "977",
    "frequency": 70,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "有序数组的平方",
    "titleSlug": "squares-of-a-sorted-array",
    "url": "https://leetcode.cn/problems/squares-of-a-sorted-array/description/"
  },
  {
    "acRate": "41.5%",
    "buckets": {
      "all": 77,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 75
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 77,
    "difficulty": "中等",
    "frontendId": "81",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "搜索旋转排序数组 II",
    "titleSlug": "search-in-rotated-sorted-array-ii",
    "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/description/"
  },
  {
    "acRate": "44.3%",
    "buckets": {
      "all": 78,
      "thirtyDays": null,
      "threeMonths": 67,
      "sixMonths": 78,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 78,
    "difficulty": "中等",
    "frontendId": "152",
    "frequency": 70,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "乘积最大子数组",
    "titleSlug": "maximum-product-subarray",
    "url": "https://leetcode.cn/problems/maximum-product-subarray/description/"
  },
  {
    "acRate": "55.4%",
    "buckets": {
      "all": 78,
      "thirtyDays": 68,
      "threeMonths": 34,
      "sixMonths": 54,
      "moreThanSixMonths": 76
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 78,
    "difficulty": "中等",
    "frontendId": "82",
    "frequency": 44.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "删除排序链表中的重复元素 II",
    "titleSlug": "remove-duplicates-from-sorted-list-ii",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/"
  },
  {
    "acRate": "48.7%",
    "buckets": {
      "all": 79,
      "thirtyDays": null,
      "threeMonths": 40,
      "sixMonths": 69,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 79,
    "difficulty": "困难",
    "frontendId": "135",
    "frequency": 70,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "分发糖果",
    "titleSlug": "candy",
    "url": "https://leetcode.cn/problems/candy/description/"
  },
  {
    "acRate": "54.8%",
    "buckets": {
      "all": 79,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 14,
      "moreThanSixMonths": 77
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 79,
    "difficulty": "简单",
    "frontendId": "83",
    "frequency": 51.4,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "删除排序链表中的重复元素",
    "titleSlug": "remove-duplicates-from-sorted-list",
    "url": "https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/"
  },
  {
    "acRate": "69.0%",
    "buckets": {
      "all": 80,
      "thirtyDays": null,
      "threeMonths": 80,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 80,
    "difficulty": "简单",
    "frontendId": "181",
    "frequency": 69.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "超过经理收入的员工",
    "titleSlug": "employees-earning-more-than-their-managers",
    "url": "https://leetcode.cn/problems/employees-earning-more-than-their-managers/description/"
  },
  {
    "acRate": "49.5%",
    "buckets": {
      "all": 80,
      "thirtyDays": null,
      "threeMonths": 99,
      "sixMonths": null,
      "moreThanSixMonths": 78
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 80,
    "difficulty": "困难",
    "frontendId": "84",
    "frequency": 65.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "柱状图中最大的矩形",
    "titleSlug": "largest-rectangle-in-histogram",
    "url": "https://leetcode.cn/problems/largest-rectangle-in-histogram/description/"
  },
  {
    "acRate": "57.1%",
    "buckets": {
      "all": 81,
      "thirtyDays": 22,
      "threeMonths": 92,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 81,
    "difficulty": "中等",
    "frontendId": "207",
    "frequency": 69.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "课程表",
    "titleSlug": "course-schedule",
    "url": "https://leetcode.cn/problems/course-schedule/description/"
  },
  {
    "acRate": "56.9%",
    "buckets": {
      "all": 81,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 55,
      "moreThanSixMonths": 79
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 81,
    "difficulty": "困难",
    "frontendId": "85",
    "frequency": 59.9,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "matrix",
        "name": "矩阵"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "titleCn": "最大矩形",
    "titleSlug": "maximal-rectangle",
    "url": "https://leetcode.cn/problems/maximal-rectangle/description/"
  },
  {
    "acRate": "65.8%",
    "buckets": {
      "all": 82,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 5
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 82,
    "difficulty": "中等",
    "frontendId": "86",
    "frequency": 51.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "分隔链表",
    "titleSlug": "partition-list",
    "url": "https://leetcode.cn/problems/partition-list/description/"
  },
  {
    "acRate": "55.0%",
    "buckets": {
      "all": 83,
      "thirtyDays": null,
      "threeMonths": 35,
      "sixMonths": 56,
      "moreThanSixMonths": 80
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 83,
    "difficulty": "简单",
    "frontendId": "88",
    "frequency": 85.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "合并两个有序数组",
    "titleSlug": "merge-sorted-array",
    "url": "https://leetcode.cn/problems/merge-sorted-array/description/"
  },
  {
    "acRate": "53.0%",
    "buckets": {
      "all": 83,
      "thirtyDays": 26,
      "threeMonths": 70,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 83,
    "difficulty": "中等",
    "frontendId": "322",
    "frequency": 69.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "零钱兑换",
    "titleSlug": "coin-change",
    "url": "https://leetcode.cn/problems/coin-change/description/"
  },
  {
    "acRate": "75.2%",
    "buckets": {
      "all": 84,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "companyRendered"
    },
    "bytedanceRank": 84,
    "difficulty": "中等",
    "frontendId": "89",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "格雷编码",
    "titleSlug": "gray-code",
    "url": "https://leetcode.cn/problems/gray-code/description/"
  },
  {
    "acRate": "70.6%",
    "buckets": {
      "all": 85,
      "thirtyDays": null,
      "threeMonths": 85,
      "sixMonths": 70,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 85,
    "difficulty": "中等",
    "frontendId": "138",
    "frequency": 69,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "随机链表的复制",
    "titleSlug": "copy-list-with-random-pointer",
    "url": "https://leetcode.cn/problems/copy-list-with-random-pointer/description/"
  },
  {
    "acRate": "64.0%",
    "buckets": {
      "all": 85,
      "thirtyDays": null,
      "threeMonths": 183,
      "sixMonths": null,
      "moreThanSixMonths": 81
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 85,
    "difficulty": "中等",
    "frontendId": "90",
    "frequency": 49.5,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "子集 II",
    "titleSlug": "subsets-ii",
    "url": "https://leetcode.cn/problems/subsets-ii/description/"
  },
  {
    "acRate": "35.0%",
    "buckets": {
      "all": 86,
      "thirtyDays": null,
      "threeMonths": 149,
      "sixMonths": null,
      "moreThanSixMonths": 82
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 86,
    "difficulty": "中等",
    "frontendId": "91",
    "frequency": 57.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "解码方法",
    "titleSlug": "decode-ways",
    "url": "https://leetcode.cn/problems/decode-ways/description/"
  },
  {
    "acRate": "58.3%",
    "buckets": {
      "all": 87,
      "thirtyDays": 88,
      "threeMonths": 109,
      "sixMonths": 57,
      "moreThanSixMonths": 83
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 87,
    "difficulty": "中等",
    "frontendId": "92",
    "frequency": 64.7,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "反转链表 II",
    "titleSlug": "reverse-linked-list-ii",
    "url": "https://leetcode.cn/problems/reverse-linked-list-ii/description/"
  },
  {
    "acRate": "61.6%",
    "buckets": {
      "all": 88,
      "thirtyDays": 38,
      "threeMonths": 59,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 88,
    "difficulty": "中等",
    "frontendId": "394",
    "frequency": 68.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "字符串解码",
    "titleSlug": "decode-string",
    "url": "https://leetcode.cn/problems/decode-string/description/"
  },
  {
    "acRate": "62.2%",
    "buckets": {
      "all": 88,
      "thirtyDays": null,
      "threeMonths": 105,
      "sixMonths": null,
      "moreThanSixMonths": 84
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 88,
    "difficulty": "中等",
    "frontendId": "93",
    "frequency": 65.2,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "titleCn": "复原 IP 地址",
    "titleSlug": "restore-ip-addresses",
    "url": "https://leetcode.cn/problems/restore-ip-addresses/description/"
  },
  {
    "acRate": "78.3%",
    "buckets": {
      "all": 89,
      "thirtyDays": 44,
      "threeMonths": 86,
      "sixMonths": null,
      "moreThanSixMonths": 85
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 89,
    "difficulty": "简单",
    "frontendId": "94",
    "frequency": 68.9,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "titleCn": "二叉树的中序遍历",
    "titleSlug": "binary-tree-inorder-traversal",
    "url": "https://leetcode.cn/problems/binary-tree-inorder-traversal/description/"
  },
  {
    "acRate": "60.3%",
    "buckets": {
      "all": 89,
      "thirtyDays": 45,
      "threeMonths": 74,
      "sixMonths": 71,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 89,
    "difficulty": "中等",
    "frontendId": "139",
    "frequency": 68,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "单词拆分",
    "titleSlug": "word-break",
    "url": "https://leetcode.cn/problems/word-break/description/"
  },
  {
    "acRate": "74.7%",
    "buckets": {
      "all": 90,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 47,
      "moreThanSixMonths": 86
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 90,
    "difficulty": "中等",
    "frontendId": "95",
    "frequency": 39.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "不同的二叉搜索树 II",
    "titleSlug": "unique-binary-search-trees-ii",
    "url": "https://leetcode.cn/problems/unique-binary-search-trees-ii/description/"
  },
  {
    "acRate": "71.4%",
    "buckets": {
      "all": 91,
      "thirtyDays": null,
      "threeMonths": 292,
      "sixMonths": null,
      "moreThanSixMonths": 87
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 91,
    "difficulty": "中等",
    "frontendId": "96",
    "frequency": 27.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "不同的二叉搜索树",
    "titleSlug": "unique-binary-search-trees",
    "url": "https://leetcode.cn/problems/unique-binary-search-trees/description/"
  },
  {
    "acRate": "46.8%",
    "buckets": {
      "all": 92,
      "thirtyDays": null,
      "threeMonths": 257,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 92,
    "difficulty": "中等",
    "frontendId": "97",
    "frequency": 34.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "交错字符串",
    "titleSlug": "interleaving-string",
    "url": "https://leetcode.cn/problems/interleaving-string/description/"
  },
  {
    "acRate": "41.0%",
    "buckets": {
      "all": 93,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 1,
      "moreThanSixMonths": 88
    },
    "bucketSources": {
      "all": "companyRendered",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 93,
    "difficulty": "中等",
    "frontendId": "98",
    "frequency": 65.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "验证二叉搜索树",
    "titleSlug": "validate-binary-search-tree",
    "url": "https://leetcode.cn/problems/validate-binary-search-tree/description/"
  },
  {
    "acRate": "68.2%",
    "buckets": {
      "all": 94,
      "thirtyDays": null,
      "threeMonths": 94,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 94,
    "difficulty": "中等",
    "frontendId": "647",
    "frequency": 66.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "回文子串",
    "titleSlug": "palindromic-substrings",
    "url": "https://leetcode.cn/problems/palindromic-substrings/description/"
  },
  {
    "acRate": "61.7%",
    "buckets": {
      "all": 94,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 89
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 94,
    "difficulty": "中等",
    "frontendId": "99",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "恢复二叉搜索树",
    "titleSlug": "recover-binary-search-tree",
    "url": "https://leetcode.cn/problems/recover-binary-search-tree/description/"
  },
  {
    "acRate": "64.0%",
    "buckets": {
      "all": 95,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 90
    },
    "bucketSources": {
      "all": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 95,
    "difficulty": "简单",
    "frontendId": "100",
    "frequency": 42,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "相同的树",
    "titleSlug": "same-tree",
    "url": "https://leetcode.cn/problems/same-tree/description/"
  },
  {
    "acRate": "76.7%",
    "buckets": {
      "all": 96,
      "thirtyDays": null,
      "threeMonths": 41,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 96,
    "difficulty": "简单",
    "frontendId": "136",
    "frequency": 66.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "只出现一次的数字",
    "titleSlug": "single-number",
    "url": "https://leetcode.cn/problems/single-number/description/"
  },
  {
    "acRate": "63.6%",
    "buckets": {
      "all": 96,
      "thirtyDays": null,
      "threeMonths": 93,
      "sixMonths": 58,
      "moreThanSixMonths": 91
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 96,
    "difficulty": "简单",
    "frontendId": "101",
    "frequency": 58.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "对称二叉树",
    "titleSlug": "symmetric-tree",
    "url": "https://leetcode.cn/problems/symmetric-tree/description/"
  },
  {
    "acRate": "70.7%",
    "buckets": {
      "all": 97,
      "thirtyDays": null,
      "threeMonths": 36,
      "sixMonths": 59,
      "moreThanSixMonths": 92
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 97,
    "difficulty": "中等",
    "frontendId": "102",
    "frequency": 69.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的层序遍历",
    "titleSlug": "binary-tree-level-order-traversal",
    "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal/description/"
  },
  {
    "acRate": "61.0%",
    "buckets": {
      "all": 98,
      "thirtyDays": null,
      "threeMonths": 81,
      "sixMonths": 60,
      "moreThanSixMonths": 93
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 98,
    "difficulty": "中等",
    "frontendId": "103",
    "frequency": 53.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的锯齿形层序遍历",
    "titleSlug": "binary-tree-zigzag-level-order-traversal",
    "url": "https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/"
  },
  {
    "acRate": "79.0%",
    "buckets": {
      "all": 99,
      "thirtyDays": 28,
      "threeMonths": 73,
      "sixMonths": 61,
      "moreThanSixMonths": 94
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 99,
    "difficulty": "简单",
    "frontendId": "104",
    "frequency": 67.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的最大深度",
    "titleSlug": "maximum-depth-of-binary-tree",
    "url": "https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/"
  },
  {
    "acRate": "82.5%",
    "buckets": {
      "all": 99,
      "thirtyDays": null,
      "threeMonths": 99,
      "sixMonths": 92,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 99,
    "difficulty": "简单",
    "frontendId": "226",
    "frequency": 66.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "翻转二叉树",
    "titleSlug": "invert-binary-tree",
    "url": "https://leetcode.cn/problems/invert-binary-tree/description/"
  },
  {
    "acRate": "73.3%",
    "buckets": {
      "all": 100,
      "thirtyDays": null,
      "threeMonths": 65,
      "sixMonths": 62,
      "moreThanSixMonths": 95
    },
    "bucketSources": {
      "all": "companyRendered",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 100,
    "difficulty": "中等",
    "frontendId": "105",
    "frequency": 72.4,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
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
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "titleCn": "从前序与中序遍历序列构造二叉树",
    "titleSlug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "url": "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/"
  },
  {
    "acRate": "64.2%",
    "buckets": {
      "all": 102,
      "thirtyDays": 73,
      "threeMonths": 101,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 102,
    "difficulty": "简单",
    "frontendId": "543",
    "frequency": 65.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的直径",
    "titleSlug": "diameter-of-binary-tree",
    "url": "https://leetcode.cn/problems/diameter-of-binary-tree/description/"
  },
  {
    "acRate": "54.8%",
    "buckets": {
      "all": 103,
      "thirtyDays": 96,
      "threeMonths": 42,
      "sixMonths": 72,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 103,
    "difficulty": "简单",
    "frontendId": "141",
    "frequency": 65.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "环形链表",
    "titleSlug": "linked-list-cycle",
    "url": "https://leetcode.cn/problems/linked-list-cycle/description/"
  },
  {
    "acRate": "42.0%",
    "buckets": {
      "all": 105,
      "thirtyDays": null,
      "threeMonths": 104,
      "sixMonths": 81,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 105,
    "difficulty": "中等",
    "frontendId": "179",
    "frequency": 65.4,
    "paidOnly": false,
    "source": "companyRendered",
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
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "最大数",
    "titleSlug": "largest-number",
    "url": "https://leetcode.cn/problems/largest-number/description/"
  },
  {
    "acRate": "59.5%",
    "buckets": {
      "all": 106,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 86,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 106,
    "difficulty": "简单",
    "frontendId": "203",
    "frequency": 65.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "移除链表元素",
    "titleSlug": "remove-linked-list-elements",
    "url": "https://leetcode.cn/problems/remove-linked-list-elements/description/"
  },
  {
    "acRate": "34.7%",
    "buckets": {
      "all": 108,
      "thirtyDays": null,
      "threeMonths": 106,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 108,
    "difficulty": "中等",
    "frontendId": "707",
    "frequency": 64.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "design",
        "name": "设计"
      },
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "设计链表",
    "titleSlug": "design-linked-list",
    "url": "https://leetcode.cn/problems/design-linked-list/description/"
  },
  {
    "acRate": "65.7%",
    "buckets": {
      "all": 109,
      "thirtyDays": null,
      "threeMonths": 107,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 109,
    "difficulty": "简单",
    "frontendId": "1502",
    "frequency": 64.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "判断能否形成等差数列",
    "titleSlug": "can-make-arithmetic-progression-from-sequence",
    "url": "https://leetcode.cn/problems/can-make-arithmetic-progression-from-sequence/description/"
  },
  {
    "acRate": "83.5%",
    "buckets": {
      "all": 110,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 3,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 110,
    "difficulty": "简单",
    "frontendId": "1757",
    "frequency": 64.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "可回收且低脂的产品",
    "titleSlug": "recyclable-and-low-fat-products",
    "url": "https://leetcode.cn/problems/recyclable-and-low-fat-products/description/"
  },
  {
    "acRate": "63.0%",
    "buckets": {
      "all": 113,
      "thirtyDays": null,
      "threeMonths": 66,
      "sixMonths": 73,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 113,
    "difficulty": "中等",
    "frontendId": "142",
    "frequency": 64.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "环形链表 II",
    "titleSlug": "linked-list-cycle-ii",
    "url": "https://leetcode.cn/problems/linked-list-cycle-ii/description/"
  },
  {
    "acRate": "66.0%",
    "buckets": {
      "all": 114,
      "thirtyDays": null,
      "threeMonths": 111,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 114,
    "difficulty": "简单",
    "frontendId": "202",
    "frequency": 64.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "titleCn": "快乐数",
    "titleSlug": "happy-number",
    "url": "https://leetcode.cn/problems/happy-number/description/"
  },
  {
    "acRate": "55.1%",
    "buckets": {
      "all": 119,
      "thirtyDays": null,
      "threeMonths": 116,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 119,
    "difficulty": "简单",
    "frontendId": "415",
    "frequency": 63.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "字符串相加",
    "titleSlug": "add-strings",
    "url": "https://leetcode.cn/problems/add-strings/description/"
  },
  {
    "acRate": "77.9%",
    "buckets": {
      "all": 120,
      "thirtyDays": null,
      "threeMonths": 117,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 120,
    "difficulty": "简单",
    "frontendId": "118",
    "frequency": 63.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "杨辉三角",
    "titleSlug": "pascals-triangle",
    "url": "https://leetcode.cn/problems/pascals-triangle/description/"
  },
  {
    "acRate": "65.8%",
    "buckets": {
      "all": 121,
      "thirtyDays": null,
      "threeMonths": 118,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 121,
    "difficulty": "中等",
    "frontendId": "347",
    "frequency": 63,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "前 K 个高频元素",
    "titleSlug": "top-k-frequent-elements",
    "url": "https://leetcode.cn/problems/top-k-frequent-elements/description/"
  },
  {
    "acRate": "75.7%",
    "buckets": {
      "all": 122,
      "thirtyDays": null,
      "threeMonths": 119,
      "sixMonths": 65,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 122,
    "difficulty": "中等",
    "frontendId": "122",
    "frequency": 62.9,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "买卖股票的最佳时机 II",
    "titleSlug": "best-time-to-buy-and-sell-stock-ii",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/"
  },
  {
    "acRate": "48.2%",
    "buckets": {
      "all": 123,
      "thirtyDays": null,
      "threeMonths": 120,
      "sixMonths": 82,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 123,
    "difficulty": "中等",
    "frontendId": "189",
    "frequency": 62.1,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "two-pointers",
        "name": "双指针"
      }
    ],
    "titleCn": "轮转数组",
    "titleSlug": "rotate-array",
    "url": "https://leetcode.cn/problems/rotate-array/description/"
  },
  {
    "acRate": "48.0%",
    "buckets": {
      "all": 124,
      "thirtyDays": null,
      "threeMonths": 121,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 124,
    "difficulty": "中等",
    "frontendId": "904",
    "frequency": 62.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "水果成篮",
    "titleSlug": "fruit-into-baskets",
    "url": "https://leetcode.cn/problems/fruit-into-baskets/description/"
  },
  {
    "acRate": "65.5%",
    "buckets": {
      "all": 125,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 4,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 125,
    "difficulty": "简单",
    "frontendId": "509",
    "frequency": 61.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "斐波那契数",
    "titleSlug": "fibonacci-number",
    "url": "https://leetcode.cn/problems/fibonacci-number/description/"
  },
  {
    "acRate": "62.7%",
    "buckets": {
      "all": 126,
      "thirtyDays": null,
      "threeMonths": 122,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 126,
    "difficulty": "中等",
    "frontendId": "155",
    "frequency": 61.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最小栈",
    "titleSlug": "min-stack",
    "url": "https://leetcode.cn/problems/min-stack/description/"
  },
  {
    "acRate": "65.4%",
    "buckets": {
      "all": 127,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 5,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 127,
    "difficulty": "中等",
    "frontendId": "454",
    "frequency": 61.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "四数相加 II",
    "titleSlug": "4sum-ii",
    "url": "https://leetcode.cn/problems/4sum-ii/description/"
  },
  {
    "acRate": "67.7%",
    "buckets": {
      "all": 128,
      "thirtyDays": 99,
      "threeMonths": 123,
      "sixMonths": 100,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 128,
    "difficulty": "中等",
    "frontendId": "287",
    "frequency": 61.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "寻找重复数",
    "titleSlug": "find-the-duplicate-number",
    "url": "https://leetcode.cn/problems/find-the-duplicate-number/description/"
  },
  {
    "acRate": "67.3%",
    "buckets": {
      "all": 129,
      "thirtyDays": null,
      "threeMonths": 75,
      "sixMonths": 80,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 129,
    "difficulty": "简单",
    "frontendId": "169",
    "frequency": 61.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "多数元素",
    "titleSlug": "majority-element",
    "url": "https://leetcode.cn/problems/majority-element/description/"
  },
  {
    "acRate": "77.8%",
    "buckets": {
      "all": 130,
      "thirtyDays": null,
      "threeMonths": 125,
      "sixMonths": 93,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 130,
    "difficulty": "中等",
    "frontendId": "238",
    "frequency": 61,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "titleCn": "除了自身以外数组的乘积",
    "titleSlug": "product-of-array-except-self",
    "url": "https://leetcode.cn/problems/product-of-array-except-self/description/"
  },
  {
    "acRate": "68.1%",
    "buckets": {
      "all": 131,
      "thirtyDays": null,
      "threeMonths": 126,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 131,
    "difficulty": "简单",
    "frontendId": "746",
    "frequency": 60.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "使用最小花费爬楼梯",
    "titleSlug": "min-cost-climbing-stairs",
    "url": "https://leetcode.cn/problems/min-cost-climbing-stairs/description/"
  },
  {
    "acRate": "62.4%",
    "buckets": {
      "all": 132,
      "thirtyDays": null,
      "threeMonths": 77,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 132,
    "difficulty": "简单",
    "frontendId": "389",
    "frequency": 60.7,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "找不同",
    "titleSlug": "find-the-difference",
    "url": "https://leetcode.cn/problems/find-the-difference/description/"
  },
  {
    "acRate": "49.0%",
    "buckets": {
      "all": 133,
      "thirtyDays": null,
      "threeMonths": 79,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 133,
    "difficulty": "中等",
    "frontendId": "437",
    "frequency": 60.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "路径总和 III",
    "titleSlug": "path-sum-iii",
    "url": "https://leetcode.cn/problems/path-sum-iii/description/"
  },
  {
    "acRate": "52.0%",
    "buckets": {
      "all": 134,
      "thirtyDays": null,
      "threeMonths": 129,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 134,
    "difficulty": "中等",
    "frontendId": "570",
    "frequency": 60.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "至少有5名直接下属的经理",
    "titleSlug": "managers-with-at-least-5-direct-reports",
    "url": "https://leetcode.cn/problems/managers-with-at-least-5-direct-reports/description/"
  },
  {
    "acRate": "59.4%",
    "buckets": {
      "all": 136,
      "thirtyDays": null,
      "threeMonths": 131,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 136,
    "difficulty": "困难",
    "frontendId": "295",
    "frequency": 60,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "数据流的中位数",
    "titleSlug": "find-median-from-data-stream",
    "url": "https://leetcode.cn/problems/find-median-from-data-stream/description/"
  },
  {
    "acRate": "80.6%",
    "buckets": {
      "all": 138,
      "thirtyDays": null,
      "threeMonths": 132,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 138,
    "difficulty": "简单",
    "frontendId": "1470",
    "frequency": 59.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "重新排列数组",
    "titleSlug": "shuffle-the-array",
    "url": "https://leetcode.cn/problems/shuffle-the-array/description/"
  },
  {
    "acRate": "62.8%",
    "buckets": {
      "all": 139,
      "thirtyDays": null,
      "threeMonths": 89,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 139,
    "difficulty": "困难",
    "frontendId": "123",
    "frequency": 59.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "买卖股票的最佳时机 III",
    "titleSlug": "best-time-to-buy-and-sell-stock-iii",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/"
  },
  {
    "acRate": "49.9%",
    "buckets": {
      "all": 140,
      "thirtyDays": 47,
      "threeMonths": 134,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 140,
    "difficulty": "中等",
    "frontendId": "162",
    "frequency": 59.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "寻找峰值",
    "titleSlug": "find-peak-element",
    "url": "https://leetcode.cn/problems/find-peak-element/description/"
  },
  {
    "acRate": "57.0%",
    "buckets": {
      "all": 141,
      "thirtyDays": null,
      "threeMonths": 135,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 141,
    "difficulty": "中等",
    "frontendId": "718",
    "frequency": 59.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最长重复子数组",
    "titleSlug": "maximum-length-of-repeated-subarray",
    "url": "https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/"
  },
  {
    "acRate": "80.7%",
    "buckets": {
      "all": 142,
      "thirtyDays": null,
      "threeMonths": 136,
      "sixMonths": 63,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 142,
    "difficulty": "简单",
    "frontendId": "108",
    "frequency": 59.6,
    "paidOnly": false,
    "source": "companyRendered",
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
      }
    ],
    "titleCn": "将有序数组转换为二叉搜索树",
    "titleSlug": "convert-sorted-array-to-binary-search-tree",
    "url": "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/"
  },
  {
    "acRate": "75.1%",
    "buckets": {
      "all": 143,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 7,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 143,
    "difficulty": "简单",
    "frontendId": "349",
    "frequency": 59.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两个数组的交集",
    "titleSlug": "intersection-of-two-arrays",
    "url": "https://leetcode.cn/problems/intersection-of-two-arrays/description/"
  },
  {
    "acRate": "65.0%",
    "buckets": {
      "all": 145,
      "thirtyDays": null,
      "threeMonths": 138,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 145,
    "difficulty": "中等",
    "frontendId": "343",
    "frequency": 59,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "整数拆分",
    "titleSlug": "integer-break",
    "url": "https://leetcode.cn/problems/integer-break/description/"
  },
  {
    "acRate": "53.8%",
    "buckets": {
      "all": 148,
      "thirtyDays": null,
      "threeMonths": 141,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 148,
    "difficulty": "简单",
    "frontendId": "197",
    "frequency": 58.3,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "上升的温度",
    "titleSlug": "rising-temperature",
    "url": "https://leetcode.cn/problems/rising-temperature/description/"
  },
  {
    "acRate": "67.6%",
    "buckets": {
      "all": 149,
      "thirtyDays": 81,
      "threeMonths": 142,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 149,
    "difficulty": "中等",
    "frontendId": "516",
    "frequency": 58.3,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "最长回文子序列",
    "titleSlug": "longest-palindromic-subsequence",
    "url": "https://leetcode.cn/problems/longest-palindromic-subsequence/description/"
  },
  {
    "acRate": "46.4%",
    "buckets": {
      "all": 150,
      "thirtyDays": null,
      "threeMonths": 143,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 150,
    "difficulty": "中等",
    "frontendId": "LCR 143",
    "frequency": 58.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "子结构判断",
    "titleSlug": "shu-de-zi-jie-gou-lcof",
    "url": "https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/description/"
  },
  {
    "acRate": "55.7%",
    "buckets": {
      "all": 153,
      "thirtyDays": null,
      "threeMonths": 68,
      "sixMonths": 79,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 153,
    "difficulty": "中等",
    "frontendId": "165",
    "frequency": 57.6,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "比较版本号",
    "titleSlug": "compare-version-numbers",
    "url": "https://leetcode.cn/problems/compare-version-numbers/description/"
  },
  {
    "acRate": "38.0%",
    "buckets": {
      "all": 154,
      "thirtyDays": null,
      "threeMonths": 147,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 154,
    "difficulty": "简单",
    "frontendId": "645",
    "frequency": 57.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "错误的集合",
    "titleSlug": "set-mismatch",
    "url": "https://leetcode.cn/problems/set-mismatch/description/"
  },
  {
    "acRate": "53.7%",
    "buckets": {
      "all": 155,
      "thirtyDays": 46,
      "threeMonths": 148,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 155,
    "difficulty": "困难",
    "frontendId": "329",
    "frequency": 57.3,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "memoization",
        "name": "记忆化"
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
        "slug": "matrix",
        "name": "矩阵"
      }
    ],
    "titleCn": "矩阵中的最长递增路径",
    "titleSlug": "longest-increasing-path-in-a-matrix",
    "url": "https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/description/"
  },
  {
    "acRate": "71.9%",
    "buckets": {
      "all": 157,
      "thirtyDays": null,
      "threeMonths": 150,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 157,
    "difficulty": "中等",
    "frontendId": "1049",
    "frequency": 57.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最后一块石头的重量 II",
    "titleSlug": "last-stone-weight-ii",
    "url": "https://leetcode.cn/problems/last-stone-weight-ii/description/"
  },
  {
    "acRate": "47.4%",
    "buckets": {
      "all": 161,
      "thirtyDays": null,
      "threeMonths": 154,
      "sixMonths": 68,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 161,
    "difficulty": "中等",
    "frontendId": "134",
    "frequency": 56.7,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "加油站",
    "titleSlug": "gas-station",
    "url": "https://leetcode.cn/problems/gas-station/description/"
  },
  {
    "acRate": "46.0%",
    "buckets": {
      "all": 162,
      "thirtyDays": null,
      "threeMonths": 155,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 162,
    "difficulty": "中等",
    "frontendId": "180",
    "frequency": 56.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "连续出现的数字",
    "titleSlug": "consecutive-numbers",
    "url": "https://leetcode.cn/problems/consecutive-numbers/description/"
  },
  {
    "acRate": "62.0%",
    "buckets": {
      "all": 163,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 8,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 163,
    "difficulty": "中等",
    "frontendId": "1004",
    "frequency": 56.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最大连续1的个数 III",
    "titleSlug": "max-consecutive-ones-iii",
    "url": "https://leetcode.cn/problems/max-consecutive-ones-iii/description/"
  },
  {
    "acRate": "42.6%",
    "buckets": {
      "all": 164,
      "thirtyDays": null,
      "threeMonths": 156,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 164,
    "difficulty": "中等",
    "frontendId": "698",
    "frequency": 56.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
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
    "titleCn": "划分为k个相等的子集",
    "titleSlug": "partition-to-k-equal-sum-subsets",
    "url": "https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/description/"
  },
  {
    "acRate": "65.7%",
    "buckets": {
      "all": 165,
      "thirtyDays": null,
      "threeMonths": 157,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 165,
    "difficulty": "简单",
    "frontendId": "448",
    "frequency": 56.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "找到所有数组中消失的数字",
    "titleSlug": "find-all-numbers-disappeared-in-an-array",
    "url": "https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/description/"
  },
  {
    "acRate": "60.0%",
    "buckets": {
      "all": 166,
      "thirtyDays": 63,
      "threeMonths": 158,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 166,
    "difficulty": "中等",
    "frontendId": "740",
    "frequency": 56.1,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "删除并获得点数",
    "titleSlug": "delete-and-earn",
    "url": "https://leetcode.cn/problems/delete-and-earn/description/"
  },
  {
    "acRate": "73.5%",
    "buckets": {
      "all": 167,
      "thirtyDays": null,
      "threeMonths": 159,
      "sixMonths": 84,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 167,
    "difficulty": "中等",
    "frontendId": "199",
    "frequency": 55.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的右视图",
    "titleSlug": "binary-tree-right-side-view",
    "url": "https://leetcode.cn/problems/binary-tree-right-side-view/description/"
  },
  {
    "acRate": "45.7%",
    "buckets": {
      "all": 168,
      "thirtyDays": null,
      "threeMonths": 160,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 168,
    "difficulty": "中等",
    "frontendId": "177",
    "frequency": 55.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "第N高的薪水",
    "titleSlug": "nth-highest-salary",
    "url": "https://leetcode.cn/problems/nth-highest-salary/description/"
  },
  {
    "acRate": "46.0%",
    "buckets": {
      "all": 169,
      "thirtyDays": null,
      "threeMonths": 161,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 169,
    "difficulty": "中等",
    "frontendId": "673",
    "frequency": 55.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "最长递增子序列的个数",
    "titleSlug": "number-of-longest-increasing-subsequence",
    "url": "https://leetcode.cn/problems/number-of-longest-increasing-subsequence/description/"
  },
  {
    "acRate": "68.3%",
    "buckets": {
      "all": 170,
      "thirtyDays": null,
      "threeMonths": 162,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 170,
    "difficulty": "简单",
    "frontendId": "584",
    "frequency": 55.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "寻找用户推荐人",
    "titleSlug": "find-customer-referee",
    "url": "https://leetcode.cn/problems/find-customer-referee/description/"
  },
  {
    "acRate": "48.9%",
    "buckets": {
      "all": 171,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 1
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 171,
    "difficulty": "简单",
    "frontendId": "125",
    "frequency": 54.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "验证回文串",
    "titleSlug": "valid-palindrome",
    "url": "https://leetcode.cn/problems/valid-palindrome/description/"
  },
  {
    "acRate": "60.0%",
    "buckets": {
      "all": 172,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 9,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 172,
    "difficulty": "中等",
    "frontendId": "1193",
    "frequency": 54.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "每月交易 I",
    "titleSlug": "monthly-transactions-i",
    "url": "https://leetcode.cn/problems/monthly-transactions-i/description/"
  },
  {
    "acRate": "52.5%",
    "buckets": {
      "all": 174,
      "thirtyDays": null,
      "threeMonths": 163,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 174,
    "difficulty": "简单",
    "frontendId": "459",
    "frequency": 54.3,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "string-matching",
        "name": "字符串匹配"
      }
    ],
    "titleCn": "重复的子字符串",
    "titleSlug": "repeated-substring-pattern",
    "url": "https://leetcode.cn/problems/repeated-substring-pattern/description/"
  },
  {
    "acRate": "54.4%",
    "buckets": {
      "all": 178,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 12,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 178,
    "difficulty": "中等",
    "frontendId": "713",
    "frequency": 53.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "乘积小于 K 的子数组",
    "titleSlug": "subarray-product-less-than-k",
    "url": "https://leetcode.cn/problems/subarray-product-less-than-k/description/"
  },
  {
    "acRate": "46.2%",
    "buckets": {
      "all": 179,
      "thirtyDays": null,
      "threeMonths": 166,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 179,
    "difficulty": "中等",
    "frontendId": "213",
    "frequency": 53.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "打家劫舍 II",
    "titleSlug": "house-robber-ii",
    "url": "https://leetcode.cn/problems/house-robber-ii/description/"
  },
  {
    "acRate": "56.6%",
    "buckets": {
      "all": 180,
      "thirtyDays": null,
      "threeMonths": 167,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 180,
    "difficulty": "中等",
    "frontendId": "692",
    "frequency": 52.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "前K个高频单词",
    "titleSlug": "top-k-frequent-words",
    "url": "https://leetcode.cn/problems/top-k-frequent-words/description/"
  },
  {
    "acRate": "33.0%",
    "buckets": {
      "all": 181,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 2
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 181,
    "difficulty": "中等",
    "frontendId": "402",
    "frequency": 52.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "titleCn": "移掉 K 位数字",
    "titleSlug": "remove-k-digits",
    "url": "https://leetcode.cn/problems/remove-k-digits/description/"
  },
  {
    "acRate": "55.5%",
    "buckets": {
      "all": 182,
      "thirtyDays": 87,
      "threeMonths": 98,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 182,
    "difficulty": "中等",
    "frontendId": "611",
    "frequency": 52.9,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "有效三角形的个数",
    "titleSlug": "valid-triangle-number",
    "url": "https://leetcode.cn/problems/valid-triangle-number/description/"
  },
  {
    "acRate": "59.6%",
    "buckets": {
      "all": 183,
      "thirtyDays": 36,
      "threeMonths": 169,
      "sixMonths": 76,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 183,
    "difficulty": "中等",
    "frontendId": "151",
    "frequency": 52.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "反转字符串中的单词",
    "titleSlug": "reverse-words-in-a-string",
    "url": "https://leetcode.cn/problems/reverse-words-in-a-string/description/"
  },
  {
    "acRate": "65.5%",
    "buckets": {
      "all": 184,
      "thirtyDays": null,
      "threeMonths": 170,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 184,
    "difficulty": "中等",
    "frontendId": "309",
    "frequency": 52.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "买卖股票的最佳时机含冷冻期",
    "titleSlug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/"
  },
  {
    "acRate": "54.2%",
    "buckets": {
      "all": 186,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 3
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 186,
    "difficulty": "中等",
    "frontendId": "184",
    "frequency": 52.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "部门工资最高的员工",
    "titleSlug": "department-highest-salary",
    "url": "https://leetcode.cn/problems/department-highest-salary/description/"
  },
  {
    "acRate": "69.9%",
    "buckets": {
      "all": 187,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 4
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 187,
    "difficulty": "简单",
    "frontendId": "1661",
    "frequency": 52.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "每台机器的进程平均运行时间",
    "titleSlug": "average-time-of-process-per-machine",
    "url": "https://leetcode.cn/problems/average-time-of-process-per-machine/description/"
  },
  {
    "acRate": "46.1%",
    "buckets": {
      "all": 188,
      "thirtyDays": null,
      "threeMonths": 172,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 188,
    "difficulty": "中等",
    "frontendId": "376",
    "frequency": 52.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "摆动序列",
    "titleSlug": "wiggle-subsequence",
    "url": "https://leetcode.cn/problems/wiggle-subsequence/description/"
  },
  {
    "acRate": "76.5%",
    "buckets": {
      "all": 189,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 13,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 189,
    "difficulty": "简单",
    "frontendId": "面试题 02.02",
    "frequency": 52.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "返回倒数第 k 个节点",
    "titleSlug": "kth-node-from-end-of-list-lcci",
    "url": "https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/description/"
  },
  {
    "acRate": "48.8%",
    "buckets": {
      "all": 190,
      "thirtyDays": 34,
      "threeMonths": 78,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 190,
    "difficulty": "困难",
    "frontendId": "902",
    "frequency": 52.1,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "string",
        "name": "字符串"
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
    "titleCn": "最大为 N 的数字组合",
    "titleSlug": "numbers-at-most-n-given-digit-set",
    "url": "https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/description/"
  },
  {
    "acRate": "61.0%",
    "buckets": {
      "all": 193,
      "thirtyDays": null,
      "threeMonths": 174,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 193,
    "difficulty": "中等",
    "frontendId": "167",
    "frequency": 51.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两数之和 II - 输入有序数组",
    "titleSlug": "two-sum-ii-input-array-is-sorted",
    "url": "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/"
  },
  {
    "acRate": "62.6%",
    "buckets": {
      "all": 194,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 15,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 194,
    "difficulty": "中等",
    "frontendId": "337",
    "frequency": 51,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "打家劫舍 III",
    "titleSlug": "house-robber-iii",
    "url": "https://leetcode.cn/problems/house-robber-iii/description/"
  },
  {
    "acRate": "47.2%",
    "buckets": {
      "all": 195,
      "thirtyDays": null,
      "threeMonths": 175,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 195,
    "difficulty": "中等",
    "frontendId": "473",
    "frequency": 50.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "火柴拼正方形",
    "titleSlug": "matchsticks-to-square",
    "url": "https://leetcode.cn/problems/matchsticks-to-square/description/"
  },
  {
    "acRate": "47.2%",
    "buckets": {
      "all": 196,
      "thirtyDays": null,
      "threeMonths": 176,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 196,
    "difficulty": "中等",
    "frontendId": "622",
    "frequency": 50.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "设计循环队列",
    "titleSlug": "design-circular-queue",
    "url": "https://leetcode.cn/problems/design-circular-queue/description/"
  },
  {
    "acRate": "67.3%",
    "buckets": {
      "all": 197,
      "thirtyDays": 69,
      "threeMonths": 100,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 197,
    "difficulty": "简单",
    "frontendId": "242",
    "frequency": 50.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "有效的字母异位词",
    "titleSlug": "valid-anagram",
    "url": "https://leetcode.cn/problems/valid-anagram/description/"
  },
  {
    "acRate": "56.7%",
    "buckets": {
      "all": 198,
      "thirtyDays": null,
      "threeMonths": 178,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 198,
    "difficulty": "中等",
    "frontendId": "面试题 17.14",
    "frequency": 50.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最小K个数",
    "titleSlug": "smallest-k-lcci",
    "url": "https://leetcode.cn/problems/smallest-k-lcci/description/"
  },
  {
    "acRate": "37.3%",
    "buckets": {
      "all": 199,
      "thirtyDays": null,
      "threeMonths": 179,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 199,
    "difficulty": "简单",
    "frontendId": "1251",
    "frequency": 50.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "平均售价",
    "titleSlug": "average-selling-price",
    "url": "https://leetcode.cn/problems/average-selling-price/description/"
  },
  {
    "acRate": "43.1%",
    "buckets": {
      "all": 201,
      "thirtyDays": null,
      "threeMonths": 181,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 201,
    "difficulty": "中等",
    "frontendId": "373",
    "frequency": 49.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "查找和最小的 K 对数字",
    "titleSlug": "find-k-pairs-with-smallest-sums",
    "url": "https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/description/"
  },
  {
    "acRate": "43.3%",
    "buckets": {
      "all": 202,
      "thirtyDays": null,
      "threeMonths": 182,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 202,
    "difficulty": "中等",
    "frontendId": "550",
    "frequency": 49.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "游戏玩法分析 IV",
    "titleSlug": "game-play-analysis-iv",
    "url": "https://leetcode.cn/problems/game-play-analysis-iv/description/"
  },
  {
    "acRate": "58.7%",
    "buckets": {
      "all": 205,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 17,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 205,
    "difficulty": "中等",
    "frontendId": "1262",
    "frequency": 49.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "可被三整除的最大和",
    "titleSlug": "greatest-sum-divisible-by-three",
    "url": "https://leetcode.cn/problems/greatest-sum-divisible-by-three/description/"
  },
  {
    "acRate": "63.6%",
    "buckets": {
      "all": 206,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 18,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 206,
    "difficulty": "中等",
    "frontendId": "178",
    "frequency": 49.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "分数排名",
    "titleSlug": "rank-scores",
    "url": "https://leetcode.cn/problems/rank-scores/description/"
  },
  {
    "acRate": "50.3%",
    "buckets": {
      "all": 207,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 6
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 207,
    "difficulty": "中等",
    "frontendId": "316",
    "frequency": 49.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "titleCn": "去除重复字母",
    "titleSlug": "remove-duplicate-letters",
    "url": "https://leetcode.cn/problems/remove-duplicate-letters/description/"
  },
  {
    "acRate": "71.4%",
    "buckets": {
      "all": 208,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 7
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 208,
    "difficulty": "简单",
    "frontendId": "511",
    "frequency": 49.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "游戏玩法分析 I",
    "titleSlug": "game-play-analysis-i",
    "url": "https://leetcode.cn/problems/game-play-analysis-i/description/"
  },
  {
    "acRate": "65.4%",
    "buckets": {
      "all": 209,
      "thirtyDays": null,
      "threeMonths": 184,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 209,
    "difficulty": "简单",
    "frontendId": "1581",
    "frequency": 49.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "进店却未进行过交易的顾客",
    "titleSlug": "customer-who-visited-but-did-not-make-any-transactions",
    "url": "https://leetcode.cn/problems/customer-who-visited-but-did-not-make-any-transactions/description/"
  },
  {
    "acRate": "54.7%",
    "buckets": {
      "all": 210,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 19,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 210,
    "difficulty": "困难",
    "frontendId": "188",
    "frequency": 49.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "买卖股票的最佳时机 IV",
    "titleSlug": "best-time-to-buy-and-sell-stock-iv",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/"
  },
  {
    "acRate": "76.2%",
    "buckets": {
      "all": 211,
      "thirtyDays": null,
      "threeMonths": 185,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 211,
    "difficulty": "中等",
    "frontendId": "114",
    "frequency": 48.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二叉树展开为链表",
    "titleSlug": "flatten-binary-tree-to-linked-list",
    "url": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/"
  },
  {
    "acRate": "39.1%",
    "buckets": {
      "all": 212,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 8
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 212,
    "difficulty": "中等",
    "frontendId": "176",
    "frequency": 48.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "第二高的薪水",
    "titleSlug": "second-highest-salary",
    "url": "https://leetcode.cn/problems/second-highest-salary/description/"
  },
  {
    "acRate": "64.9%",
    "buckets": {
      "all": 213,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 20,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 213,
    "difficulty": "中等",
    "frontendId": "378",
    "frequency": 48.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "有序矩阵中第 K 小的元素",
    "titleSlug": "kth-smallest-element-in-a-sorted-matrix",
    "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/description/"
  },
  {
    "acRate": "49.0%",
    "buckets": {
      "all": 214,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 21,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 214,
    "difficulty": "困难",
    "frontendId": "174",
    "frequency": 48.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "地下城游戏",
    "titleSlug": "dungeon-game",
    "url": "https://leetcode.cn/problems/dungeon-game/description/"
  },
  {
    "acRate": "79.7%",
    "buckets": {
      "all": 215,
      "thirtyDays": null,
      "threeMonths": 186,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 215,
    "difficulty": "简单",
    "frontendId": "303",
    "frequency": 48.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "区域和检索 - 数组不可变",
    "titleSlug": "range-sum-query-immutable",
    "url": "https://leetcode.cn/problems/range-sum-query-immutable/description/"
  },
  {
    "acRate": "53.1%",
    "buckets": {
      "all": 217,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 22,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 217,
    "difficulty": "简单",
    "frontendId": "392",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "判断子序列",
    "titleSlug": "is-subsequence",
    "url": "https://leetcode.cn/problems/is-subsequence/description/"
  },
  {
    "acRate": "34.8%",
    "buckets": {
      "all": 218,
      "thirtyDays": null,
      "threeMonths": 188,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 218,
    "difficulty": "困难",
    "frontendId": "44",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "通配符匹配",
    "titleSlug": "wildcard-matching",
    "url": "https://leetcode.cn/problems/wildcard-matching/description/"
  },
  {
    "acRate": "69.1%",
    "buckets": {
      "all": 219,
      "thirtyDays": null,
      "threeMonths": 189,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 219,
    "difficulty": "简单",
    "frontendId": "258",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "number-theory",
        "name": "数论"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "各位相加",
    "titleSlug": "add-digits",
    "url": "https://leetcode.cn/problems/add-digits/description/"
  },
  {
    "acRate": "57.7%",
    "buckets": {
      "all": 220,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 23,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 220,
    "difficulty": "简单",
    "frontendId": "387",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "queue",
        "name": "队列"
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
        "slug": "counting",
        "name": "计数"
      }
    ],
    "titleCn": "字符串中的第一个唯一字符",
    "titleSlug": "first-unique-character-in-a-string",
    "url": "https://leetcode.cn/problems/first-unique-character-in-a-string/description/"
  },
  {
    "acRate": "56.3%",
    "buckets": {
      "all": 221,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 24,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 221,
    "difficulty": "中等",
    "frontendId": "525",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "连续数组",
    "titleSlug": "contiguous-array",
    "url": "https://leetcode.cn/problems/contiguous-array/description/"
  },
  {
    "acRate": "46.1%",
    "buckets": {
      "all": 222,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 9
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 222,
    "difficulty": "简单",
    "frontendId": "面试题 01.06",
    "frequency": 47.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "字符串压缩",
    "titleSlug": "compress-string-lcci",
    "url": "https://leetcode.cn/problems/compress-string-lcci/description/"
  },
  {
    "acRate": "68.2%",
    "buckets": {
      "all": 223,
      "thirtyDays": null,
      "threeMonths": 190,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 223,
    "difficulty": "简单",
    "frontendId": "383",
    "frequency": 47.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
      }
    ],
    "titleCn": "赎金信",
    "titleSlug": "ransom-note",
    "url": "https://leetcode.cn/problems/ransom-note/description/"
  },
  {
    "acRate": "60.1%",
    "buckets": {
      "all": 224,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 10
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 224,
    "difficulty": "简单",
    "frontendId": "110",
    "frequency": 47.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "平衡二叉树",
    "titleSlug": "balanced-binary-tree",
    "url": "https://leetcode.cn/problems/balanced-binary-tree/description/"
  },
  {
    "acRate": "71.6%",
    "buckets": {
      "all": 225,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 11
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 225,
    "difficulty": "简单",
    "frontendId": "257",
    "frequency": 47.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "string",
        "name": "字符串"
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
    "titleCn": "二叉树的所有路径",
    "titleSlug": "binary-tree-paths",
    "url": "https://leetcode.cn/problems/binary-tree-paths/description/"
  },
  {
    "acRate": "41.6%",
    "buckets": {
      "all": 226,
      "thirtyDays": null,
      "threeMonths": 191,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 226,
    "difficulty": "简单",
    "frontendId": "LCR 146",
    "frequency": 47.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "螺旋遍历二维数组",
    "titleSlug": "shun-shi-zhen-da-yin-ju-zhen-lcof",
    "url": "https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/description/"
  },
  {
    "acRate": "66.9%",
    "buckets": {
      "all": 227,
      "thirtyDays": null,
      "threeMonths": 192,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 227,
    "difficulty": "简单",
    "frontendId": "1114",
    "frequency": 47.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "concurrency",
        "name": "多线程"
      }
    ],
    "titleCn": "按序打印",
    "titleSlug": "print-in-order",
    "url": "https://leetcode.cn/problems/print-in-order/description/"
  },
  {
    "acRate": "46.8%",
    "buckets": {
      "all": 228,
      "thirtyDays": null,
      "threeMonths": 193,
      "sixMonths": 97,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 228,
    "difficulty": "中等",
    "frontendId": "274",
    "frequency": 47.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "H 指数",
    "titleSlug": "h-index",
    "url": "https://leetcode.cn/problems/h-index/description/"
  },
  {
    "acRate": "70.2%",
    "buckets": {
      "all": 229,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 25,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 229,
    "difficulty": "简单",
    "frontendId": "577",
    "frequency": 47.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "员工奖金",
    "titleSlug": "employee-bonus",
    "url": "https://leetcode.cn/problems/employee-bonus/description/"
  },
  {
    "acRate": "73.4%",
    "buckets": {
      "all": 230,
      "thirtyDays": null,
      "threeMonths": 194,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 230,
    "difficulty": "简单",
    "frontendId": "144",
    "frequency": 47,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "titleCn": "二叉树的前序遍历",
    "titleSlug": "binary-tree-preorder-traversal",
    "url": "https://leetcode.cn/problems/binary-tree-preorder-traversal/description/"
  },
  {
    "acRate": "62.0%",
    "buckets": {
      "all": 232,
      "thirtyDays": null,
      "threeMonths": 196,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 232,
    "difficulty": "简单",
    "frontendId": "485",
    "frequency": 46.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "最大连续 1 的个数",
    "titleSlug": "max-consecutive-ones",
    "url": "https://leetcode.cn/problems/max-consecutive-ones/description/"
  },
  {
    "acRate": "74.6%",
    "buckets": {
      "all": 233,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 26,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 233,
    "difficulty": "中等",
    "frontendId": "712",
    "frequency": 46.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两个字符串的最小ASCII删除和",
    "titleSlug": "minimum-ascii-delete-sum-for-two-strings",
    "url": "https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/description/"
  },
  {
    "acRate": "72.5%",
    "buckets": {
      "all": 234,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 12
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 234,
    "difficulty": "中等",
    "frontendId": "137",
    "frequency": 46.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "只出现一次的数字 II",
    "titleSlug": "single-number-ii",
    "url": "https://leetcode.cn/problems/single-number-ii/description/"
  },
  {
    "acRate": "80.9%",
    "buckets": {
      "all": 235,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 27,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 235,
    "difficulty": "简单",
    "frontendId": "344",
    "frequency": 46.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "反转字符串",
    "titleSlug": "reverse-string",
    "url": "https://leetcode.cn/problems/reverse-string/description/"
  },
  {
    "acRate": "46.5%",
    "buckets": {
      "all": 236,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 28,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 236,
    "difficulty": "简单",
    "frontendId": "1141",
    "frequency": 46.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "查询近30天活跃用户数",
    "titleSlug": "user-activity-for-the-past-30-days-i",
    "url": "https://leetcode.cn/problems/user-activity-for-the-past-30-days-i/description/"
  },
  {
    "acRate": "52.9%",
    "buckets": {
      "all": 237,
      "thirtyDays": null,
      "threeMonths": 197,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 237,
    "difficulty": "中等",
    "frontendId": "380",
    "frequency": 46.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "O(1) 时间插入、删除和获取随机元素",
    "titleSlug": "insert-delete-getrandom-o1",
    "url": "https://leetcode.cn/problems/insert-delete-getrandom-o1/description/"
  },
  {
    "acRate": "82.5%",
    "buckets": {
      "all": 238,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 29,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 238,
    "difficulty": "简单",
    "frontendId": "2413",
    "frequency": 46.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "number-theory",
        "name": "数论"
      }
    ],
    "titleCn": "最小偶倍数",
    "titleSlug": "smallest-even-multiple",
    "url": "https://leetcode.cn/problems/smallest-even-multiple/description/"
  },
  {
    "acRate": "56.5%",
    "buckets": {
      "all": 239,
      "thirtyDays": null,
      "threeMonths": 198,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 239,
    "difficulty": "中等",
    "frontendId": "424",
    "frequency": 45.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "替换后的最长重复字符",
    "titleSlug": "longest-repeating-character-replacement",
    "url": "https://leetcode.cn/problems/longest-repeating-character-replacement/description/"
  },
  {
    "acRate": "56.0%",
    "buckets": {
      "all": 240,
      "thirtyDays": null,
      "threeMonths": 199,
      "sixMonths": null,
      "moreThanSixMonths": 98
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 240,
    "difficulty": "简单",
    "frontendId": "112",
    "frequency": 45.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "路径总和",
    "titleSlug": "path-sum",
    "url": "https://leetcode.cn/problems/path-sum/description/"
  },
  {
    "acRate": "56.3%",
    "buckets": {
      "all": 241,
      "thirtyDays": null,
      "threeMonths": 200,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 241,
    "difficulty": "困难",
    "frontendId": "679",
    "frequency": 45.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "titleCn": "24 点游戏",
    "titleSlug": "24-game",
    "url": "https://leetcode.cn/problems/24-game/description/"
  },
  {
    "acRate": "40.8%",
    "buckets": {
      "all": 242,
      "thirtyDays": null,
      "threeMonths": 201,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 242,
    "difficulty": "中等",
    "frontendId": "面试题 16.26",
    "frequency": 45.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "计算器",
    "titleSlug": "calculator-lcci",
    "url": "https://leetcode.cn/problems/calculator-lcci/description/"
  },
  {
    "acRate": "40.9%",
    "buckets": {
      "all": 243,
      "thirtyDays": null,
      "threeMonths": 202,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 243,
    "difficulty": "困难",
    "frontendId": "480",
    "frequency": 45.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "滑动窗口中位数",
    "titleSlug": "sliding-window-median",
    "url": "https://leetcode.cn/problems/sliding-window-median/description/"
  },
  {
    "acRate": "51.2%",
    "buckets": {
      "all": 244,
      "thirtyDays": null,
      "threeMonths": 203,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 244,
    "difficulty": "困难",
    "frontendId": "2141",
    "frequency": 45.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "同时运行 N 台电脑的最长时间",
    "titleSlug": "maximum-running-time-of-n-computers",
    "url": "https://leetcode.cn/problems/maximum-running-time-of-n-computers/description/"
  },
  {
    "acRate": "51.0%",
    "buckets": {
      "all": 245,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 13
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 245,
    "difficulty": "简单",
    "frontendId": "219",
    "frequency": 45.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "存在重复元素 II",
    "titleSlug": "contains-duplicate-ii",
    "url": "https://leetcode.cn/problems/contains-duplicate-ii/description/"
  },
  {
    "acRate": "56.2%",
    "buckets": {
      "all": 246,
      "thirtyDays": null,
      "threeMonths": 204,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 246,
    "difficulty": "困难",
    "frontendId": "301",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "删除无效的括号",
    "titleSlug": "remove-invalid-parentheses",
    "url": "https://leetcode.cn/problems/remove-invalid-parentheses/description/"
  },
  {
    "acRate": "53.4%",
    "buckets": {
      "all": 247,
      "thirtyDays": null,
      "threeMonths": 205,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 247,
    "difficulty": "中等",
    "frontendId": "435",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "无重叠区间",
    "titleSlug": "non-overlapping-intervals",
    "url": "https://leetcode.cn/problems/non-overlapping-intervals/description/"
  },
  {
    "acRate": "45.7%",
    "buckets": {
      "all": 248,
      "thirtyDays": 50,
      "threeMonths": 206,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 248,
    "difficulty": "中等",
    "frontendId": "662",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树最大宽度",
    "titleSlug": "maximum-width-of-binary-tree",
    "url": "https://leetcode.cn/problems/maximum-width-of-binary-tree/description/"
  },
  {
    "acRate": "42.0%",
    "buckets": {
      "all": 249,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 14
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 249,
    "difficulty": "中等",
    "frontendId": "1091",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
      }
    ],
    "titleCn": "二进制矩阵中的最短路径",
    "titleSlug": "shortest-path-in-binary-matrix",
    "url": "https://leetcode.cn/problems/shortest-path-in-binary-matrix/description/"
  },
  {
    "acRate": "80.6%",
    "buckets": {
      "all": 250,
      "thirtyDays": 80,
      "threeMonths": 207,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 250,
    "difficulty": "简单",
    "frontendId": "1281",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "整数的各位积和之差",
    "titleSlug": "subtract-the-product-and-sum-of-digits-of-an-integer",
    "url": "https://leetcode.cn/problems/subtract-the-product-and-sum-of-digits-of-an-integer/description/"
  },
  {
    "acRate": "79.0%",
    "buckets": {
      "all": 251,
      "thirtyDays": null,
      "threeMonths": 208,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 251,
    "difficulty": "中等",
    "frontendId": "763",
    "frequency": 44.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "划分字母区间",
    "titleSlug": "partition-labels",
    "url": "https://leetcode.cn/problems/partition-labels/description/"
  },
  {
    "acRate": "67.8%",
    "buckets": {
      "all": 252,
      "thirtyDays": null,
      "threeMonths": 209,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 252,
    "difficulty": "中等",
    "frontendId": "474",
    "frequency": 44.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "一和零",
    "titleSlug": "ones-and-zeroes",
    "url": "https://leetcode.cn/problems/ones-and-zeroes/description/"
  },
  {
    "acRate": "58.9%",
    "buckets": {
      "all": 253,
      "thirtyDays": null,
      "threeMonths": 210,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 253,
    "difficulty": "简单",
    "frontendId": "LCR 136",
    "frequency": 44.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "删除链表的节点",
    "titleSlug": "shan-chu-lian-biao-de-jie-dian-lcof",
    "url": "https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/description/"
  },
  {
    "acRate": "50.0%",
    "buckets": {
      "all": 254,
      "thirtyDays": null,
      "threeMonths": 211,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 254,
    "difficulty": "困难",
    "frontendId": "LCR 170",
    "frequency": 44.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "merge-sort",
        "name": "归并排序"
      }
    ],
    "titleCn": "交易逆序对的总数",
    "titleSlug": "shu-zu-zhong-de-ni-xu-dui-lcof",
    "url": "https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/description/"
  },
  {
    "acRate": "56.2%",
    "buckets": {
      "all": 255,
      "thirtyDays": null,
      "threeMonths": 212,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 255,
    "difficulty": "简单",
    "frontendId": "面试题 10.01",
    "frequency": 44.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "合并排序的数组",
    "titleSlug": "sorted-merge-lcci",
    "url": "https://leetcode.cn/problems/sorted-merge-lcci/description/"
  },
  {
    "acRate": "65.6%",
    "buckets": {
      "all": 256,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 30,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 256,
    "difficulty": "简单",
    "frontendId": "225",
    "frequency": 44.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "用队列实现栈",
    "titleSlug": "implement-stack-using-queues",
    "url": "https://leetcode.cn/problems/implement-stack-using-queues/description/"
  },
  {
    "acRate": "48.8%",
    "buckets": {
      "all": 258,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 31,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 258,
    "difficulty": "中等",
    "frontendId": "494",
    "frequency": 43.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "目标和",
    "titleSlug": "target-sum",
    "url": "https://leetcode.cn/problems/target-sum/description/"
  },
  {
    "acRate": "67.2%",
    "buckets": {
      "all": 259,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 15
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 259,
    "difficulty": "简单",
    "frontendId": "196",
    "frequency": 43.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "删除重复的电子邮箱",
    "titleSlug": "delete-duplicate-emails",
    "url": "https://leetcode.cn/problems/delete-duplicate-emails/description/"
  },
  {
    "acRate": "50.2%",
    "buckets": {
      "all": 260,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 32,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 260,
    "difficulty": "简单",
    "frontendId": "263",
    "frequency": 43.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "丑数",
    "titleSlug": "ugly-number",
    "url": "https://leetcode.cn/problems/ugly-number/description/"
  },
  {
    "acRate": "64.5%",
    "buckets": {
      "all": 261,
      "thirtyDays": null,
      "threeMonths": 214,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 261,
    "difficulty": "中等",
    "frontendId": "328",
    "frequency": 43.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      }
    ],
    "titleCn": "奇偶链表",
    "titleSlug": "odd-even-linked-list",
    "url": "https://leetcode.cn/problems/odd-even-linked-list/description/"
  },
  {
    "acRate": "77.2%",
    "buckets": {
      "all": 262,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 16
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 262,
    "difficulty": "中等",
    "frontendId": "289",
    "frequency": 43.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "生命游戏",
    "titleSlug": "game-of-life",
    "url": "https://leetcode.cn/problems/game-of-life/description/"
  },
  {
    "acRate": "85.7%",
    "buckets": {
      "all": 263,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 17
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 263,
    "difficulty": "简单",
    "frontendId": "1068",
    "frequency": 43.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "产品销售分析 I",
    "titleSlug": "product-sales-analysis-i",
    "url": "https://leetcode.cn/problems/product-sales-analysis-i/description/"
  },
  {
    "acRate": "79.2%",
    "buckets": {
      "all": 264,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 33,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 264,
    "difficulty": "简单",
    "frontendId": "2236",
    "frequency": 43.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "判断根结点是否等于子结点之和",
    "titleSlug": "root-equals-sum-of-children",
    "url": "https://leetcode.cn/problems/root-equals-sum-of-children/description/"
  },
  {
    "acRate": "72.8%",
    "buckets": {
      "all": 266,
      "thirtyDays": null,
      "threeMonths": 216,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 266,
    "difficulty": "简单",
    "frontendId": "876",
    "frequency": 42.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "链表的中间结点",
    "titleSlug": "middle-of-the-linked-list",
    "url": "https://leetcode.cn/problems/middle-of-the-linked-list/description/"
  },
  {
    "acRate": "35.3%",
    "buckets": {
      "all": 267,
      "thirtyDays": 94,
      "threeMonths": 217,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 267,
    "difficulty": "困难",
    "frontendId": "1044",
    "frequency": 42.3,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "suffix-array",
        "name": "后缀数组"
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
    "titleCn": "最长重复子串",
    "titleSlug": "longest-duplicate-substring",
    "url": "https://leetcode.cn/problems/longest-duplicate-substring/description/"
  },
  {
    "acRate": "44.5%",
    "buckets": {
      "all": 269,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 19
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 269,
    "difficulty": "困难",
    "frontendId": "315",
    "frequency": 41.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "merge-sort",
        "name": "归并排序"
      }
    ],
    "titleCn": "计算右侧小于当前元素的个数",
    "titleSlug": "count-of-smaller-numbers-after-self",
    "url": "https://leetcode.cn/problems/count-of-smaller-numbers-after-self/description/"
  },
  {
    "acRate": "45.5%",
    "buckets": {
      "all": 270,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 20
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 270,
    "difficulty": "简单",
    "frontendId": "367",
    "frequency": 41.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "有效的完全平方数",
    "titleSlug": "valid-perfect-square",
    "url": "https://leetcode.cn/problems/valid-perfect-square/description/"
  },
  {
    "acRate": "59.0%",
    "buckets": {
      "all": 271,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 21
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 271,
    "difficulty": "中等",
    "frontendId": "421",
    "frequency": 41.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
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
        "slug": "hash-table",
        "name": "哈希表"
      }
    ],
    "titleCn": "数组中两个数的最大异或值",
    "titleSlug": "maximum-xor-of-two-numbers-in-an-array",
    "url": "https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/description/"
  },
  {
    "acRate": "66.9%",
    "buckets": {
      "all": 272,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 22
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 272,
    "difficulty": "中等",
    "frontendId": "946",
    "frequency": 41.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "验证栈序列",
    "titleSlug": "validate-stack-sequences",
    "url": "https://leetcode.cn/problems/validate-stack-sequences/description/"
  },
  {
    "acRate": "73.7%",
    "buckets": {
      "all": 273,
      "thirtyDays": null,
      "threeMonths": 218,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 273,
    "difficulty": "简单",
    "frontendId": "1047",
    "frequency": 41.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "删除字符串中的所有相邻重复项",
    "titleSlug": "remove-all-adjacent-duplicates-in-string",
    "url": "https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/"
  },
  {
    "acRate": "60.1%",
    "buckets": {
      "all": 274,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 34,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 274,
    "difficulty": "困难",
    "frontendId": "297",
    "frequency": 41.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二叉树的序列化与反序列化",
    "titleSlug": "serialize-and-deserialize-binary-tree",
    "url": "https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/description/"
  },
  {
    "acRate": "56.4%",
    "buckets": {
      "all": 275,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 35,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 275,
    "difficulty": "中等",
    "frontendId": "641",
    "frequency": 41.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "设计循环双端队列",
    "titleSlug": "design-circular-deque",
    "url": "https://leetcode.cn/problems/design-circular-deque/description/"
  },
  {
    "acRate": "67.0%",
    "buckets": {
      "all": 276,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 36,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 276,
    "difficulty": "困难",
    "frontendId": "765",
    "frequency": 41.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
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
        "slug": "union-find",
        "name": "并查集"
      },
      {
        "slug": "graph",
        "name": "图"
      }
    ],
    "titleCn": "情侣牵手",
    "titleSlug": "couples-holding-hands",
    "url": "https://leetcode.cn/problems/couples-holding-hands/description/"
  },
  {
    "acRate": "57.3%",
    "buckets": {
      "all": 278,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 23
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 278,
    "difficulty": "中等",
    "frontendId": "150",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "逆波兰表达式求值",
    "titleSlug": "evaluate-reverse-polish-notation",
    "url": "https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/"
  },
  {
    "acRate": "47.4%",
    "buckets": {
      "all": 279,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 38,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 279,
    "difficulty": "中等",
    "frontendId": "368",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "最大整除子集",
    "titleSlug": "largest-divisible-subset",
    "url": "https://leetcode.cn/problems/largest-divisible-subset/description/"
  },
  {
    "acRate": "53.2%",
    "buckets": {
      "all": 280,
      "thirtyDays": null,
      "threeMonths": 219,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 280,
    "difficulty": "中等",
    "frontendId": "450",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "titleCn": "删除二叉搜索树中的节点",
    "titleSlug": "delete-node-in-a-bst",
    "url": "https://leetcode.cn/problems/delete-node-in-a-bst/description/"
  },
  {
    "acRate": "48.1%",
    "buckets": {
      "all": 281,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 24
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 281,
    "difficulty": "简单",
    "frontendId": "844",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "two-pointers",
        "name": "双指针"
      },
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "比较含退格的字符串",
    "titleSlug": "backspace-string-compare",
    "url": "https://leetcode.cn/problems/backspace-string-compare/description/"
  },
  {
    "acRate": "68.2%",
    "buckets": {
      "all": 282,
      "thirtyDays": null,
      "threeMonths": 220,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 282,
    "difficulty": "中等",
    "frontendId": "LCR 105",
    "frequency": 41.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "岛屿的最大面积",
    "titleSlug": "ZL6zAn",
    "url": "https://leetcode.cn/problems/ZL6zAn/description/"
  },
  {
    "acRate": "62.5%",
    "buckets": {
      "all": 283,
      "thirtyDays": null,
      "threeMonths": 221,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 283,
    "difficulty": "中等",
    "frontendId": "1878",
    "frequency": 41.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "matrix",
        "name": "矩阵"
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
    "titleCn": "矩阵中最大的三个菱形和",
    "titleSlug": "get-biggest-three-rhombus-sums-in-a-grid",
    "url": "https://leetcode.cn/problems/get-biggest-three-rhombus-sums-in-a-grid/description/"
  },
  {
    "acRate": "72.7%",
    "buckets": {
      "all": 284,
      "thirtyDays": null,
      "threeMonths": 222,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 284,
    "difficulty": "简单",
    "frontendId": "610",
    "frequency": 40.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "判断三角形",
    "titleSlug": "triangle-judgement",
    "url": "https://leetcode.cn/problems/triangle-judgement/description/"
  },
  {
    "acRate": "53.9%",
    "buckets": {
      "all": 285,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 39,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 285,
    "difficulty": "中等",
    "frontendId": "1094",
    "frequency": 40.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "拼车",
    "titleSlug": "car-pooling",
    "url": "https://leetcode.cn/problems/car-pooling/description/"
  },
  {
    "acRate": "58.9%",
    "buckets": {
      "all": 286,
      "thirtyDays": null,
      "threeMonths": 223,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 286,
    "difficulty": "中等",
    "frontendId": "1423",
    "frequency": 40.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "可获得的最大点数",
    "titleSlug": "maximum-points-you-can-obtain-from-cards",
    "url": "https://leetcode.cn/problems/maximum-points-you-can-obtain-from-cards/description/"
  },
  {
    "acRate": "65.5%",
    "buckets": {
      "all": 287,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 40,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 287,
    "difficulty": "中等",
    "frontendId": "1695",
    "frequency": 40.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "删除子数组的最大得分",
    "titleSlug": "maximum-erasure-value",
    "url": "https://leetcode.cn/problems/maximum-erasure-value/description/"
  },
  {
    "acRate": "53.5%",
    "buckets": {
      "all": 288,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 41,
      "moreThanSixMonths": 100
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 288,
    "difficulty": "困难",
    "frontendId": "115",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "不同的子序列",
    "titleSlug": "distinct-subsequences",
    "url": "https://leetcode.cn/problems/distinct-subsequences/description/"
  },
  {
    "acRate": "72.6%",
    "buckets": {
      "all": 289,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 42,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 289,
    "difficulty": "中等",
    "frontendId": "235",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二叉搜索树的最近公共祖先",
    "titleSlug": "lowest-common-ancestor-of-a-binary-search-tree",
    "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/description/"
  },
  {
    "acRate": "47.3%",
    "buckets": {
      "all": 290,
      "thirtyDays": null,
      "threeMonths": 224,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 290,
    "difficulty": "困难",
    "frontendId": "502",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "IPO",
    "titleSlug": "ipo",
    "url": "https://leetcode.cn/problems/ipo/description/"
  },
  {
    "acRate": "81.5%",
    "buckets": {
      "all": 291,
      "thirtyDays": null,
      "threeMonths": 225,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 291,
    "difficulty": "简单",
    "frontendId": "1512",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "counting",
        "name": "计数"
      }
    ],
    "titleCn": "好数对的数目",
    "titleSlug": "number-of-good-pairs",
    "url": "https://leetcode.cn/problems/number-of-good-pairs/description/"
  },
  {
    "acRate": "45.4%",
    "buckets": {
      "all": 292,
      "thirtyDays": null,
      "threeMonths": 226,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 292,
    "difficulty": "中等",
    "frontendId": "2841",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "几乎唯一子数组的最大和",
    "titleSlug": "maximum-sum-of-almost-unique-subarray",
    "url": "https://leetcode.cn/problems/maximum-sum-of-almost-unique-subarray/description/"
  },
  {
    "acRate": "51.1%",
    "buckets": {
      "all": 293,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 43,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 293,
    "difficulty": "中等",
    "frontendId": "3296",
    "frequency": 40.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "titleCn": "移山所需的最少秒数",
    "titleSlug": "minimum-number-of-seconds-to-make-mountain-height-zero",
    "url": "https://leetcode.cn/problems/minimum-number-of-seconds-to-make-mountain-height-zero/description/"
  },
  {
    "acRate": "50.4%",
    "buckets": {
      "all": 294,
      "thirtyDays": null,
      "threeMonths": 227,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 294,
    "difficulty": "困难",
    "frontendId": "127",
    "frequency": 40.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "单词接龙",
    "titleSlug": "word-ladder",
    "url": "https://leetcode.cn/problems/word-ladder/description/"
  },
  {
    "acRate": "66.9%",
    "buckets": {
      "all": 295,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 44,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 295,
    "difficulty": "简单",
    "frontendId": "183",
    "frequency": 40.2,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "从不订购的客户",
    "titleSlug": "customers-who-never-order",
    "url": "https://leetcode.cn/problems/customers-who-never-order/description/"
  },
  {
    "acRate": "67.7%",
    "buckets": {
      "all": 296,
      "thirtyDays": null,
      "threeMonths": 228,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 296,
    "difficulty": "中等",
    "frontendId": "852",
    "frequency": 40.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "山脉数组的峰顶索引",
    "titleSlug": "peak-index-in-a-mountain-array",
    "url": "https://leetcode.cn/problems/peak-index-in-a-mountain-array/description/"
  },
  {
    "acRate": "65.7%",
    "buckets": {
      "all": 297,
      "thirtyDays": null,
      "threeMonths": 229,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 297,
    "difficulty": "中等",
    "frontendId": "2694",
    "frequency": 40.1,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [],
    "titleCn": "事件发射器",
    "titleSlug": "event-emitter",
    "url": "https://leetcode.cn/problems/event-emitter/description/"
  },
  {
    "acRate": "54.7%",
    "buckets": {
      "all": 298,
      "thirtyDays": 79,
      "threeMonths": 230,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 298,
    "difficulty": "困难",
    "frontendId": "60",
    "frequency": 39.8,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "排列序列",
    "titleSlug": "permutation-sequence",
    "url": "https://leetcode.cn/problems/permutation-sequence/description/"
  },
  {
    "acRate": "56.0%",
    "buckets": {
      "all": 300,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 26
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 300,
    "difficulty": "简单",
    "frontendId": "217",
    "frequency": 39.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "存在重复元素",
    "titleSlug": "contains-duplicate",
    "url": "https://leetcode.cn/problems/contains-duplicate/description/"
  },
  {
    "acRate": "62.0%",
    "buckets": {
      "all": 301,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 45,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 301,
    "difficulty": "中等",
    "frontendId": "445",
    "frequency": 39.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两数相加 II",
    "titleSlug": "add-two-numbers-ii",
    "url": "https://leetcode.cn/problems/add-two-numbers-ii/description/"
  },
  {
    "acRate": "32.3%",
    "buckets": {
      "all": 302,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 46,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 302,
    "difficulty": "简单",
    "frontendId": "605",
    "frequency": 39.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "种花问题",
    "titleSlug": "can-place-flowers",
    "url": "https://leetcode.cn/problems/can-place-flowers/description/"
  },
  {
    "acRate": "78.1%",
    "buckets": {
      "all": 304,
      "thirtyDays": null,
      "threeMonths": 231,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 304,
    "difficulty": "简单",
    "frontendId": "182",
    "frequency": 39.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "查找重复的电子邮箱",
    "titleSlug": "duplicate-emails",
    "url": "https://leetcode.cn/problems/duplicate-emails/description/"
  },
  {
    "acRate": "68.1%",
    "buckets": {
      "all": 305,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 48,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 305,
    "difficulty": "简单",
    "frontendId": "232",
    "frequency": 39.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "用栈实现队列",
    "titleSlug": "implement-queue-using-stacks",
    "url": "https://leetcode.cn/problems/implement-queue-using-stacks/description/"
  },
  {
    "acRate": "70.8%",
    "buckets": {
      "all": 306,
      "thirtyDays": null,
      "threeMonths": 232,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 306,
    "difficulty": "简单",
    "frontendId": "1148",
    "frequency": 39.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "文章浏览 I",
    "titleSlug": "article-views-i",
    "url": "https://leetcode.cn/problems/article-views-i/description/"
  },
  {
    "acRate": "64.2%",
    "buckets": {
      "all": 307,
      "thirtyDays": 84,
      "threeMonths": 233,
      "sixMonths": null,
      "moreThanSixMonths": 99
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 307,
    "difficulty": "中等",
    "frontendId": "113",
    "frequency": 39.2,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "路径总和 II",
    "titleSlug": "path-sum-ii",
    "url": "https://leetcode.cn/problems/path-sum-ii/description/"
  },
  {
    "acRate": "69.7%",
    "buckets": {
      "all": 308,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 27
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 308,
    "difficulty": "中等",
    "frontendId": "120",
    "frequency": 39.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "三角形最小路径和",
    "titleSlug": "triangle",
    "url": "https://leetcode.cn/problems/triangle/description/"
  },
  {
    "acRate": "61.0%",
    "buckets": {
      "all": 309,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 28
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 309,
    "difficulty": "中等",
    "frontendId": "621",
    "frequency": 39.2,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "任务调度器",
    "titleSlug": "task-scheduler",
    "url": "https://leetcode.cn/problems/task-scheduler/description/"
  },
  {
    "acRate": "71.9%",
    "buckets": {
      "all": 310,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 29
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 310,
    "difficulty": "中等",
    "frontendId": "129",
    "frequency": 38.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "求根节点到叶节点数字之和",
    "titleSlug": "sum-root-to-leaf-numbers",
    "url": "https://leetcode.cn/problems/sum-root-to-leaf-numbers/description/"
  },
  {
    "acRate": "59.6%",
    "buckets": {
      "all": 311,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 30
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 311,
    "difficulty": "中等",
    "frontendId": "210",
    "frequency": 38.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "课程表 II",
    "titleSlug": "course-schedule-ii",
    "url": "https://leetcode.cn/problems/course-schedule-ii/description/"
  },
  {
    "acRate": "45.8%",
    "buckets": {
      "all": 312,
      "thirtyDays": null,
      "threeMonths": 91,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 312,
    "difficulty": "中等",
    "frontendId": "400",
    "frequency": 38.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "第 N 位数字",
    "titleSlug": "nth-digit",
    "url": "https://leetcode.cn/problems/nth-digit/description/"
  },
  {
    "acRate": "62.1%",
    "buckets": {
      "all": 313,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 31
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 313,
    "difficulty": "困难",
    "frontendId": "3600",
    "frequency": 38.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
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
        "slug": "binary-search",
        "name": "二分查找"
      },
      {
        "slug": "minimum-spanning-tree",
        "name": "最小生成树"
      }
    ],
    "titleCn": "升级后最大生成树稳定性",
    "titleSlug": "maximize-spanning-tree-stability-with-upgrades",
    "url": "https://leetcode.cn/problems/maximize-spanning-tree-stability-with-upgrades/description/"
  },
  {
    "acRate": "65.6%",
    "buckets": {
      "all": 315,
      "thirtyDays": null,
      "threeMonths": 236,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 315,
    "difficulty": "中等",
    "frontendId": "518",
    "frequency": 38.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "零钱兑换 II",
    "titleSlug": "coin-change-ii",
    "url": "https://leetcode.cn/problems/coin-change-ii/description/"
  },
  {
    "acRate": "71.0%",
    "buckets": {
      "all": 316,
      "thirtyDays": null,
      "threeMonths": 237,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 316,
    "difficulty": "困难",
    "frontendId": "312",
    "frequency": 37.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "戳气球",
    "titleSlug": "burst-balloons",
    "url": "https://leetcode.cn/problems/burst-balloons/description/"
  },
  {
    "acRate": "59.4%",
    "buckets": {
      "all": 317,
      "thirtyDays": null,
      "threeMonths": 238,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 317,
    "difficulty": "困难",
    "frontendId": "407",
    "frequency": 37.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "接雨水 II",
    "titleSlug": "trapping-rain-water-ii",
    "url": "https://leetcode.cn/problems/trapping-rain-water-ii/description/"
  },
  {
    "acRate": "28.6%",
    "buckets": {
      "all": 318,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 49,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 318,
    "difficulty": "中等",
    "frontendId": "468",
    "frequency": 37.9,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "验证IP地址",
    "titleSlug": "validate-ip-address",
    "url": "https://leetcode.cn/problems/validate-ip-address/description/"
  },
  {
    "acRate": "58.0%",
    "buckets": {
      "all": 319,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 32
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 319,
    "difficulty": "中等",
    "frontendId": "498",
    "frequency": 37.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "对角线遍历",
    "titleSlug": "diagonal-traverse",
    "url": "https://leetcode.cn/problems/diagonal-traverse/description/"
  },
  {
    "acRate": "79.8%",
    "buckets": {
      "all": 320,
      "thirtyDays": null,
      "threeMonths": 86,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": 320,
    "difficulty": "中等",
    "frontendId": "230",
    "frequency": 37.7,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉搜索树中第 K 小的元素",
    "titleSlug": "kth-smallest-element-in-a-bst",
    "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/"
  },
  {
    "acRate": "46.3%",
    "buckets": {
      "all": 321,
      "thirtyDays": 51,
      "threeMonths": 240,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 321,
    "difficulty": "中等",
    "frontendId": "227",
    "frequency": 37.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "基本计算器 II",
    "titleSlug": "basic-calculator-ii",
    "url": "https://leetcode.cn/problems/basic-calculator-ii/description/"
  },
  {
    "acRate": "37.2%",
    "buckets": {
      "all": 322,
      "thirtyDays": null,
      "threeMonths": 241,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 322,
    "difficulty": "困难",
    "frontendId": "273",
    "frequency": 37.1,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
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
    "titleCn": "整数转换英文表示",
    "titleSlug": "integer-to-english-words",
    "url": "https://leetcode.cn/problems/integer-to-english-words/description/"
  },
  {
    "acRate": "72.5%",
    "buckets": {
      "all": 323,
      "thirtyDays": null,
      "threeMonths": 242,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 323,
    "difficulty": "简单",
    "frontendId": "682",
    "frequency": 37.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "棒球比赛",
    "titleSlug": "baseball-game",
    "url": "https://leetcode.cn/problems/baseball-game/description/"
  },
  {
    "acRate": "52.1%",
    "buckets": {
      "all": 324,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 33
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 324,
    "difficulty": "中等",
    "frontendId": "870",
    "frequency": 37.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "优势洗牌",
    "titleSlug": "advantage-shuffle",
    "url": "https://leetcode.cn/problems/advantage-shuffle/description/"
  },
  {
    "acRate": "50.0%",
    "buckets": {
      "all": 325,
      "thirtyDays": 53,
      "threeMonths": 243,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 325,
    "difficulty": "困难",
    "frontendId": "1373",
    "frequency": 37.1,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "binary-tree",
        "name": "二叉树"
      }
    ],
    "titleCn": "二叉搜索子树的最大键值和",
    "titleSlug": "maximum-sum-bst-in-binary-tree",
    "url": "https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/description/"
  },
  {
    "acRate": "54.0%",
    "buckets": {
      "all": 326,
      "thirtyDays": 67,
      "threeMonths": 244,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 326,
    "difficulty": "困难",
    "frontendId": "面试题 17.24",
    "frequency": 37.1,
    "paidOnly": false,
    "source": "companyRendered",
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
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "titleCn": "最大子矩阵",
    "titleSlug": "max-submatrix-lcci",
    "url": "https://leetcode.cn/problems/max-submatrix-lcci/description/"
  },
  {
    "acRate": "55.6%",
    "buckets": {
      "all": 327,
      "thirtyDays": null,
      "threeMonths": 245,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 327,
    "difficulty": "中等",
    "frontendId": "187",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "重复的DNA序列",
    "titleSlug": "repeated-dna-sequences",
    "url": "https://leetcode.cn/problems/repeated-dna-sequences/description/"
  },
  {
    "acRate": "35.8%",
    "buckets": {
      "all": 328,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 50,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 328,
    "difficulty": "中等",
    "frontendId": "192",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "shell",
        "name": "Shell"
      }
    ],
    "titleCn": "统计词频",
    "titleSlug": "word-frequency",
    "url": "https://leetcode.cn/problems/word-frequency/description/"
  },
  {
    "acRate": "53.3%",
    "buckets": {
      "all": 329,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 34
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 329,
    "difficulty": "中等",
    "frontendId": "253",
    "frequency": 36.7,
    "paidOnly": true,
    "source": "legacyTop888",
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
    "titleCn": "会议室 II",
    "titleSlug": "meeting-rooms-ii",
    "url": "https://leetcode.cn/problems/meeting-rooms-ii/description/"
  },
  {
    "acRate": "41.1%",
    "buckets": {
      "all": 330,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 51,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 330,
    "difficulty": "困难",
    "frontendId": "262",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "行程和用户",
    "titleSlug": "trips-and-users",
    "url": "https://leetcode.cn/problems/trips-and-users/description/"
  },
  {
    "acRate": "60.8%",
    "buckets": {
      "all": 331,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 35
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 331,
    "difficulty": "困难",
    "frontendId": "410",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
      },
      {
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "titleCn": "分割数组的最大值",
    "titleSlug": "split-array-largest-sum",
    "url": "https://leetcode.cn/problems/split-array-largest-sum/description/"
  },
  {
    "acRate": "75.6%",
    "buckets": {
      "all": 332,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 36
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 332,
    "difficulty": "中等",
    "frontendId": "442",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "数组中重复的数据",
    "titleSlug": "find-all-duplicates-in-an-array",
    "url": "https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/"
  },
  {
    "acRate": "50.0%",
    "buckets": {
      "all": 333,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 52,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 333,
    "difficulty": "中等",
    "frontendId": "528",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "按权重随机选择",
    "titleSlug": "random-pick-with-weight",
    "url": "https://leetcode.cn/problems/random-pick-with-weight/description/"
  },
  {
    "acRate": "37.0%",
    "buckets": {
      "all": 334,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 53,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 334,
    "difficulty": "中等",
    "frontendId": "556",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "下一个更大元素 III",
    "titleSlug": "next-greater-element-iii",
    "url": "https://leetcode.cn/problems/next-greater-element-iii/description/"
  },
  {
    "acRate": "71.8%",
    "buckets": {
      "all": 335,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 37
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 335,
    "difficulty": "简单",
    "frontendId": "868",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      }
    ],
    "titleCn": "二进制间距",
    "titleSlug": "binary-gap",
    "url": "https://leetcode.cn/problems/binary-gap/description/"
  },
  {
    "acRate": "63.8%",
    "buckets": {
      "all": 336,
      "thirtyDays": null,
      "threeMonths": 246,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 336,
    "difficulty": "中等",
    "frontendId": "983",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最低票价",
    "titleSlug": "minimum-cost-for-tickets",
    "url": "https://leetcode.cn/problems/minimum-cost-for-tickets/description/"
  },
  {
    "acRate": "74.0%",
    "buckets": {
      "all": 337,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 54,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 337,
    "difficulty": "简单",
    "frontendId": "1200",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最小绝对差",
    "titleSlug": "minimum-absolute-difference",
    "url": "https://leetcode.cn/problems/minimum-absolute-difference/description/"
  },
  {
    "acRate": "73.4%",
    "buckets": {
      "all": 338,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 55,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 338,
    "difficulty": "中等",
    "frontendId": "1314",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "prefix-sum",
        "name": "前缀和"
      }
    ],
    "titleCn": "矩阵区域和",
    "titleSlug": "matrix-block-sum",
    "url": "https://leetcode.cn/problems/matrix-block-sum/description/"
  },
  {
    "acRate": "43.9%",
    "buckets": {
      "all": 339,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 56,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 339,
    "difficulty": "中等",
    "frontendId": "3623",
    "frequency": 36.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "统计梯形的数目 I",
    "titleSlug": "count-number-of-trapezoids-i",
    "url": "https://leetcode.cn/problems/count-number-of-trapezoids-i/description/"
  },
  {
    "acRate": "28.3%",
    "buckets": {
      "all": 340,
      "thirtyDays": null,
      "threeMonths": 247,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 340,
    "difficulty": "困难",
    "frontendId": "65",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "有效数字",
    "titleSlug": "valid-number",
    "url": "https://leetcode.cn/problems/valid-number/description/"
  },
  {
    "acRate": "61.3%",
    "buckets": {
      "all": 341,
      "thirtyDays": null,
      "threeMonths": 248,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 341,
    "difficulty": "困难",
    "frontendId": "140",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "单词拆分 II",
    "titleSlug": "word-break-ii",
    "url": "https://leetcode.cn/problems/word-break-ii/description/"
  },
  {
    "acRate": "72.8%",
    "buckets": {
      "all": 342,
      "thirtyDays": null,
      "threeMonths": 249,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 342,
    "difficulty": "中等",
    "frontendId": "341",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "扁平化嵌套列表迭代器",
    "titleSlug": "flatten-nested-list-iterator",
    "url": "https://leetcode.cn/problems/flatten-nested-list-iterator/description/"
  },
  {
    "acRate": "72.1%",
    "buckets": {
      "all": 343,
      "thirtyDays": null,
      "threeMonths": 250,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 343,
    "difficulty": "简单",
    "frontendId": "637",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二叉树的层平均值",
    "titleSlug": "average-of-levels-in-binary-tree",
    "url": "https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/"
  },
  {
    "acRate": "44.4%",
    "buckets": {
      "all": 344,
      "thirtyDays": null,
      "threeMonths": 251,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 344,
    "difficulty": "简单",
    "frontendId": "643",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "子数组最大平均数 I",
    "titleSlug": "maximum-average-subarray-i",
    "url": "https://leetcode.cn/problems/maximum-average-subarray-i/description/"
  },
  {
    "acRate": "50.4%",
    "buckets": {
      "all": 345,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 38
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 345,
    "difficulty": "中等",
    "frontendId": "875",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "爱吃香蕉的珂珂",
    "titleSlug": "koko-eating-bananas",
    "url": "https://leetcode.cn/problems/koko-eating-bananas/description/"
  },
  {
    "acRate": "75.7%",
    "buckets": {
      "all": 346,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 39
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 346,
    "difficulty": "简单",
    "frontendId": "1351",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "统计有序矩阵中的负数",
    "titleSlug": "count-negative-numbers-in-a-sorted-matrix",
    "url": "https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/description/"
  },
  {
    "acRate": "79.6%",
    "buckets": {
      "all": 347,
      "thirtyDays": null,
      "threeMonths": 252,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 347,
    "difficulty": "简单",
    "frontendId": "1378",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "使用唯一标识码替换员工ID",
    "titleSlug": "replace-employee-id-with-the-unique-identifier",
    "url": "https://leetcode.cn/problems/replace-employee-id-with-the-unique-identifier/description/"
  },
  {
    "acRate": "64.6%",
    "buckets": {
      "all": 348,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 57,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 348,
    "difficulty": "简单",
    "frontendId": "面试题 08.06",
    "frequency": 36.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "汉诺塔问题",
    "titleSlug": "hanota-lcci",
    "url": "https://leetcode.cn/problems/hanota-lcci/description/"
  },
  {
    "acRate": "50.5%",
    "buckets": {
      "all": 349,
      "thirtyDays": null,
      "threeMonths": 253,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 349,
    "difficulty": "简单",
    "frontendId": "205",
    "frequency": 36,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "同构字符串",
    "titleSlug": "isomorphic-strings",
    "url": "https://leetcode.cn/problems/isomorphic-strings/description/"
  },
  {
    "acRate": "84.7%",
    "buckets": {
      "all": 350,
      "thirtyDays": null,
      "threeMonths": 254,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 350,
    "difficulty": "简单",
    "frontendId": "1431",
    "frequency": 36,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "拥有最多糖果的孩子",
    "titleSlug": "kids-with-the-greatest-number-of-candies",
    "url": "https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/description/"
  },
  {
    "acRate": "74.9%",
    "buckets": {
      "all": 351,
      "thirtyDays": null,
      "threeMonths": 255,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 351,
    "difficulty": "简单",
    "frontendId": "1534",
    "frequency": 36,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "titleCn": "统计好三元组",
    "titleSlug": "count-good-triplets",
    "url": "https://leetcode.cn/problems/count-good-triplets/description/"
  },
  {
    "acRate": "47.1%",
    "buckets": {
      "all": 352,
      "thirtyDays": null,
      "threeMonths": 256,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 352,
    "difficulty": "中等",
    "frontendId": "面试题 02.05",
    "frequency": 36,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "链表求和",
    "titleSlug": "sum-lists-lcci",
    "url": "https://leetcode.cn/problems/sum-lists-lcci/description/"
  },
  {
    "acRate": "45.6%",
    "buckets": {
      "all": 353,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 40
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 353,
    "difficulty": "简单",
    "frontendId": "290",
    "frequency": 35.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "单词规律",
    "titleSlug": "word-pattern",
    "url": "https://leetcode.cn/problems/word-pattern/description/"
  },
  {
    "acRate": "55.3%",
    "buckets": {
      "all": 354,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 58,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 354,
    "difficulty": "简单",
    "frontendId": "409",
    "frequency": 35.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
      }
    ],
    "titleCn": "最长回文串",
    "titleSlug": "longest-palindrome",
    "url": "https://leetcode.cn/problems/longest-palindrome/description/"
  },
  {
    "acRate": "64.1%",
    "buckets": {
      "all": 355,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 59,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 355,
    "difficulty": "简单",
    "frontendId": "404",
    "frequency": 35.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "左叶子之和",
    "titleSlug": "sum-of-left-leaves",
    "url": "https://leetcode.cn/problems/sum-of-left-leaves/description/"
  },
  {
    "acRate": "75.4%",
    "buckets": {
      "all": 356,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 41
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 356,
    "difficulty": "中等",
    "frontendId": "1035",
    "frequency": 35.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "不相交的线",
    "titleSlug": "uncrossed-lines",
    "url": "https://leetcode.cn/problems/uncrossed-lines/description/"
  },
  {
    "acRate": "61.9%",
    "buckets": {
      "all": 357,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 42
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 357,
    "difficulty": "中等",
    "frontendId": "1456",
    "frequency": 35.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "定长子串中元音的最大数目",
    "titleSlug": "maximum-number-of-vowels-in-a-substring-of-given-length",
    "url": "https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/"
  },
  {
    "acRate": "77.6%",
    "buckets": {
      "all": 359,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 43
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 359,
    "difficulty": "中等",
    "frontendId": "714",
    "frequency": 34.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "买卖股票的最佳时机含手续费",
    "titleSlug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/"
  },
  {
    "acRate": "33.3%",
    "buckets": {
      "all": 360,
      "thirtyDays": null,
      "threeMonths": 258,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 360,
    "difficulty": "困难",
    "frontendId": "887",
    "frequency": 33.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "鸡蛋掉落",
    "titleSlug": "super-egg-drop",
    "url": "https://leetcode.cn/problems/super-egg-drop/description/"
  },
  {
    "acRate": "59.3%",
    "buckets": {
      "all": 361,
      "thirtyDays": null,
      "threeMonths": 259,
      "sixMonths": 77,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 361,
    "difficulty": "中等",
    "frontendId": "153",
    "frequency": 33.5,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "寻找旋转排序数组中的最小值",
    "titleSlug": "find-minimum-in-rotated-sorted-array",
    "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/"
  },
  {
    "acRate": "66.7%",
    "buckets": {
      "all": 362,
      "thirtyDays": null,
      "threeMonths": 260,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 362,
    "difficulty": "中等",
    "frontendId": "667",
    "frequency": 33.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "优美的排列 II",
    "titleSlug": "beautiful-arrangement-ii",
    "url": "https://leetcode.cn/problems/beautiful-arrangement-ii/description/"
  },
  {
    "acRate": "47.6%",
    "buckets": {
      "all": 363,
      "thirtyDays": null,
      "threeMonths": 261,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 363,
    "difficulty": "中等",
    "frontendId": "130",
    "frequency": 32.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "被围绕的区域",
    "titleSlug": "surrounded-regions",
    "url": "https://leetcode.cn/problems/surrounded-regions/description/"
  },
  {
    "acRate": "42.7%",
    "buckets": {
      "all": 364,
      "thirtyDays": 98,
      "threeMonths": 262,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 364,
    "difficulty": "中等",
    "frontendId": "837",
    "frequency": 32.5,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "sliding-window",
        "name": "滑动窗口"
      },
      {
        "slug": "probability-and-statistics",
        "name": "概率与统计"
      }
    ],
    "titleCn": "新 21 点",
    "titleSlug": "new-21-game",
    "url": "https://leetcode.cn/problems/new-21-game/description/"
  },
  {
    "acRate": "29.8%",
    "buckets": {
      "all": 365,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 44
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 365,
    "difficulty": "中等",
    "frontendId": "523",
    "frequency": 32.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "连续的子数组和",
    "titleSlug": "continuous-subarray-sum",
    "url": "https://leetcode.cn/problems/continuous-subarray-sum/description/"
  },
  {
    "acRate": "49.4%",
    "buckets": {
      "all": 366,
      "thirtyDays": null,
      "threeMonths": 263,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 366,
    "difficulty": "困难",
    "frontendId": "719",
    "frequency": 32.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "找出第 K 小的数对距离",
    "titleSlug": "find-k-th-smallest-pair-distance",
    "url": "https://leetcode.cn/problems/find-k-th-smallest-pair-distance/description/"
  },
  {
    "acRate": "81.6%",
    "buckets": {
      "all": 367,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 45
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 367,
    "difficulty": "中等",
    "frontendId": "1877",
    "frequency": 32.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "数组中最大数对和的最小值",
    "titleSlug": "minimize-maximum-pair-sum-in-array",
    "url": "https://leetcode.cn/problems/minimize-maximum-pair-sum-in-array/description/"
  },
  {
    "acRate": "55.9%",
    "buckets": {
      "all": 368,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 46
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 368,
    "difficulty": "困难",
    "frontendId": "218",
    "frequency": 31.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "divide-and-conquer",
        "name": "分治"
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
        "slug": "line-sweep",
        "name": "扫描线"
      },
      {
        "slug": "heap-priority-queue",
        "name": "堆（优先队列）"
      }
    ],
    "titleCn": "天际线问题",
    "titleSlug": "the-skyline-problem",
    "url": "https://leetcode.cn/problems/the-skyline-problem/description/"
  },
  {
    "acRate": "57.5%",
    "buckets": {
      "all": 369,
      "thirtyDays": null,
      "threeMonths": 264,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 369,
    "difficulty": "中等",
    "frontendId": "1164",
    "frequency": 31.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "指定日期的产品价格",
    "titleSlug": "product-price-at-a-given-date",
    "url": "https://leetcode.cn/problems/product-price-at-a-given-date/description/"
  },
  {
    "acRate": "78.1%",
    "buckets": {
      "all": 370,
      "thirtyDays": null,
      "threeMonths": 265,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 370,
    "difficulty": "中等",
    "frontendId": "1884",
    "frequency": 31.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "鸡蛋掉落-两枚鸡蛋",
    "titleSlug": "egg-drop-with-2-eggs-and-n-floors",
    "url": "https://leetcode.cn/problems/egg-drop-with-2-eggs-and-n-floors/description/"
  },
  {
    "acRate": "70.7%",
    "buckets": {
      "all": 371,
      "thirtyDays": null,
      "threeMonths": 266,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 371,
    "difficulty": "简单",
    "frontendId": "292",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "brainteaser",
        "name": "脑筋急转弯"
      },
      {
        "slug": "math",
        "name": "数学"
      },
      {
        "slug": "game-theory",
        "name": "博弈"
      }
    ],
    "titleCn": "Nim 游戏",
    "titleSlug": "nim-game",
    "url": "https://leetcode.cn/problems/nim-game/description/"
  },
  {
    "acRate": "37.0%",
    "buckets": {
      "all": 372,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 47
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 372,
    "difficulty": "中等",
    "frontendId": "456",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "ordered-set",
        "name": "有序集合"
      },
      {
        "slug": "monotonic-stack",
        "name": "单调栈"
      }
    ],
    "titleCn": "132 模式",
    "titleSlug": "132-pattern",
    "url": "https://leetcode.cn/problems/132-pattern/description/"
  },
  {
    "acRate": "67.2%",
    "buckets": {
      "all": 373,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 60,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 373,
    "difficulty": "中等",
    "frontendId": "669",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "修剪二叉搜索树",
    "titleSlug": "trim-a-binary-search-tree",
    "url": "https://leetcode.cn/problems/trim-a-binary-search-tree/description/"
  },
  {
    "acRate": "49.3%",
    "buckets": {
      "all": 374,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 48
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 374,
    "difficulty": "中等",
    "frontendId": "670",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "greedy",
        "name": "贪心"
      },
      {
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "最大交换",
    "titleSlug": "maximum-swap",
    "url": "https://leetcode.cn/problems/maximum-swap/description/"
  },
  {
    "acRate": "42.4%",
    "buckets": {
      "all": 375,
      "thirtyDays": null,
      "threeMonths": 267,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 375,
    "difficulty": "困难",
    "frontendId": "716",
    "frequency": 31.4,
    "paidOnly": true,
    "source": "legacyTop888",
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
    "titleCn": "最大栈",
    "titleSlug": "max-stack",
    "url": "https://leetcode.cn/problems/max-stack/description/"
  },
  {
    "acRate": "47.3%",
    "buckets": {
      "all": 376,
      "thirtyDays": 71,
      "threeMonths": 268,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 376,
    "difficulty": "困难",
    "frontendId": "815",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "公交路线",
    "titleSlug": "bus-routes",
    "url": "https://leetcode.cn/problems/bus-routes/description/"
  },
  {
    "acRate": "43.5%",
    "buckets": {
      "all": 377,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 49
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 377,
    "difficulty": "中等",
    "frontendId": "845",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "dynamic-programming",
        "name": "动态规划"
      },
      {
        "slug": "enumeration",
        "name": "枚举"
      }
    ],
    "titleCn": "数组中的最长山脉",
    "titleSlug": "longest-mountain-in-array",
    "url": "https://leetcode.cn/problems/longest-mountain-in-array/description/"
  },
  {
    "acRate": "65.6%",
    "buckets": {
      "all": 378,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 50
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 378,
    "difficulty": "简单",
    "frontendId": "872",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "叶子相似的树",
    "titleSlug": "leaf-similar-trees",
    "url": "https://leetcode.cn/problems/leaf-similar-trees/description/"
  },
  {
    "acRate": "53.2%",
    "buckets": {
      "all": 379,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 61,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 379,
    "difficulty": "中等",
    "frontendId": "1024",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "视频拼接",
    "titleSlug": "video-stitching",
    "url": "https://leetcode.cn/problems/video-stitching/description/"
  },
  {
    "acRate": "35.0%",
    "buckets": {
      "all": 380,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 51
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 380,
    "difficulty": "中等",
    "frontendId": "1353",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最多可以参加的会议数目",
    "titleSlug": "maximum-number-of-events-that-can-be-attended",
    "url": "https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/description/"
  },
  {
    "acRate": "84.2%",
    "buckets": {
      "all": 381,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 52
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 381,
    "difficulty": "简单",
    "frontendId": "2356",
    "frequency": 31.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "每位教师所教授的科目种类的数量",
    "titleSlug": "number-of-unique-subjects-taught-by-each-teacher",
    "url": "https://leetcode.cn/problems/number-of-unique-subjects-taught-by-each-teacher/description/"
  },
  {
    "acRate": "41.1%",
    "buckets": {
      "all": 382,
      "thirtyDays": null,
      "threeMonths": 269,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 382,
    "difficulty": "困难",
    "frontendId": "214",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "string-matching",
        "name": "字符串匹配"
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
    "titleCn": "最短回文串",
    "titleSlug": "shortest-palindrome",
    "url": "https://leetcode.cn/problems/shortest-palindrome/description/"
  },
  {
    "acRate": "58.1%",
    "buckets": {
      "all": 383,
      "thirtyDays": null,
      "threeMonths": 270,
      "sixMonths": 96,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "sixMonths": "companyRendered"
    },
    "bytedanceRank": 383,
    "difficulty": "中等",
    "frontendId": "264",
    "frequency": 31,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "丑数 II",
    "titleSlug": "ugly-number-ii",
    "url": "https://leetcode.cn/problems/ugly-number-ii/description/"
  },
  {
    "acRate": "59.0%",
    "buckets": {
      "all": 384,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 53
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 384,
    "difficulty": "简单",
    "frontendId": "350",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两个数组的交集 II",
    "titleSlug": "intersection-of-two-arrays-ii",
    "url": "https://leetcode.cn/problems/intersection-of-two-arrays-ii/description/"
  },
  {
    "acRate": "49.3%",
    "buckets": {
      "all": 385,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 54
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 385,
    "difficulty": "困难",
    "frontendId": "460",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "LFU 缓存",
    "titleSlug": "lfu-cache",
    "url": "https://leetcode.cn/problems/lfu-cache/description/"
  },
  {
    "acRate": "60.5%",
    "buckets": {
      "all": 386,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 55
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 386,
    "difficulty": "中等",
    "frontendId": "540",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "有序数组中的单一元素",
    "titleSlug": "single-element-in-a-sorted-array",
    "url": "https://leetcode.cn/problems/single-element-in-a-sorted-array/description/"
  },
  {
    "acRate": "62.9%",
    "buckets": {
      "all": 387,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 56
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 387,
    "difficulty": "中等",
    "frontendId": "547",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "省份数量",
    "titleSlug": "number-of-provinces",
    "url": "https://leetcode.cn/problems/number-of-provinces/description/"
  },
  {
    "acRate": "49.9%",
    "buckets": {
      "all": 388,
      "thirtyDays": null,
      "threeMonths": 271,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 388,
    "difficulty": "困难",
    "frontendId": "601",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "体育馆的人流量",
    "titleSlug": "human-traffic-of-stadium",
    "url": "https://leetcode.cn/problems/human-traffic-of-stadium/description/"
  },
  {
    "acRate": "65.1%",
    "buckets": {
      "all": 389,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 57
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 389,
    "difficulty": "简单",
    "frontendId": "607",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "销售员",
    "titleSlug": "sales-person",
    "url": "https://leetcode.cn/problems/sales-person/description/"
  },
  {
    "acRate": "75.7%",
    "buckets": {
      "all": 390,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 58
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 390,
    "difficulty": "简单",
    "frontendId": "709",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      }
    ],
    "titleCn": "转换成小写字母",
    "titleSlug": "to-lower-case",
    "url": "https://leetcode.cn/problems/to-lower-case/description/"
  },
  {
    "acRate": "70.8%",
    "buckets": {
      "all": 391,
      "thirtyDays": null,
      "threeMonths": 272,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 391,
    "difficulty": "困难",
    "frontendId": "773",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
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
        "slug": "dynamic-programming",
        "name": "动态规划"
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
    "titleCn": "滑动谜题",
    "titleSlug": "sliding-puzzle",
    "url": "https://leetcode.cn/problems/sliding-puzzle/description/"
  },
  {
    "acRate": "43.2%",
    "buckets": {
      "all": 392,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 62,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 392,
    "difficulty": "中等",
    "frontendId": "923",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "三数之和的多种可能",
    "titleSlug": "3sum-with-multiplicity",
    "url": "https://leetcode.cn/problems/3sum-with-multiplicity/description/"
  },
  {
    "acRate": "70.3%",
    "buckets": {
      "all": 393,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 59
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 393,
    "difficulty": "简单",
    "frontendId": "1002",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "查找共用字符",
    "titleSlug": "find-common-characters",
    "url": "https://leetcode.cn/problems/find-common-characters/description/"
  },
  {
    "acRate": "70.1%",
    "buckets": {
      "all": 394,
      "thirtyDays": null,
      "threeMonths": 273,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 394,
    "difficulty": "中等",
    "frontendId": "1110",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "删点成林",
    "titleSlug": "delete-nodes-and-return-forest",
    "url": "https://leetcode.cn/problems/delete-nodes-and-return-forest/description/"
  },
  {
    "acRate": "72.5%",
    "buckets": {
      "all": 395,
      "thirtyDays": null,
      "threeMonths": 274,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 395,
    "difficulty": "中等",
    "frontendId": "1381",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "设计一个支持增量操作的栈",
    "titleSlug": "design-a-stack-with-increment-operation",
    "url": "https://leetcode.cn/problems/design-a-stack-with-increment-operation/description/"
  },
  {
    "acRate": "69.0%",
    "buckets": {
      "all": 396,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 63,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 396,
    "difficulty": "中等",
    "frontendId": "1905",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "统计子岛屿",
    "titleSlug": "count-sub-islands",
    "url": "https://leetcode.cn/problems/count-sub-islands/description/"
  },
  {
    "acRate": "57.6%",
    "buckets": {
      "all": 397,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 60
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 397,
    "difficulty": "中等",
    "frontendId": "2192",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "有向无环图中一个节点的所有祖先",
    "titleSlug": "all-ancestors-of-a-node-in-a-directed-acyclic-graph",
    "url": "https://leetcode.cn/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/description/"
  },
  {
    "acRate": "48.8%",
    "buckets": {
      "all": 398,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 61
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 398,
    "difficulty": "中等",
    "frontendId": "2563",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "统计公平数对的数目",
    "titleSlug": "count-the-number-of-fair-pairs",
    "url": "https://leetcode.cn/problems/count-the-number-of-fair-pairs/description/"
  },
  {
    "acRate": "47.0%",
    "buckets": {
      "all": 399,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 62
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 399,
    "difficulty": "中等",
    "frontendId": "3584",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "子序列首尾元素的最大乘积",
    "titleSlug": "maximum-product-of-first-and-last-elements-of-a-subsequence",
    "url": "https://leetcode.cn/problems/maximum-product-of-first-and-last-elements-of-a-subsequence/description/"
  },
  {
    "acRate": "58.1%",
    "buckets": {
      "all": 400,
      "thirtyDays": null,
      "threeMonths": 275,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 400,
    "difficulty": "中等",
    "frontendId": "LCR 185",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "probability-and-statistics",
        "name": "概率与统计"
      }
    ],
    "titleCn": "统计结果概率",
    "titleSlug": "nge-tou-zi-de-dian-shu-lcof",
    "url": "https://leetcode.cn/problems/nge-tou-zi-de-dian-shu-lcof/description/"
  },
  {
    "acRate": "53.1%",
    "buckets": {
      "all": 401,
      "thirtyDays": null,
      "threeMonths": 276,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 401,
    "difficulty": "简单",
    "frontendId": "面试题 01.04",
    "frequency": 31,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "回文排列",
    "titleSlug": "palindrome-permutation-lcci",
    "url": "https://leetcode.cn/problems/palindrome-permutation-lcci/description/"
  },
  {
    "acRate": "75.4%",
    "buckets": {
      "all": 402,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 64,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 402,
    "difficulty": "中等",
    "frontendId": "241",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "为运算表达式设计优先级",
    "titleSlug": "different-ways-to-add-parentheses",
    "url": "https://leetcode.cn/problems/different-ways-to-add-parentheses/description/"
  },
  {
    "acRate": "63.8%",
    "buckets": {
      "all": 403,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 65,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 403,
    "difficulty": "中等",
    "frontendId": "304",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二维区域和检索 - 矩阵不可变",
    "titleSlug": "range-sum-query-2d-immutable",
    "url": "https://leetcode.cn/problems/range-sum-query-2d-immutable/description/"
  },
  {
    "acRate": "45.5%",
    "buckets": {
      "all": 404,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 63
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 404,
    "difficulty": "中等",
    "frontendId": "365",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "math",
        "name": "数学"
      }
    ],
    "titleCn": "水壶问题",
    "titleSlug": "water-and-jug-problem",
    "url": "https://leetcode.cn/problems/water-and-jug-problem/description/"
  },
  {
    "acRate": "42.3%",
    "buckets": {
      "all": 405,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 64
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 405,
    "difficulty": "中等",
    "frontendId": "475",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "供暖器",
    "titleSlug": "heaters",
    "url": "https://leetcode.cn/problems/heaters/description/"
  },
  {
    "acRate": "52.7%",
    "buckets": {
      "all": 406,
      "thirtyDays": null,
      "threeMonths": 277,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 406,
    "difficulty": "中等",
    "frontendId": "491",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "hash-table",
        "name": "哈希表"
      },
      {
        "slug": "backtracking",
        "name": "回溯"
      }
    ],
    "titleCn": "非递减子序列",
    "titleSlug": "non-decreasing-subsequences",
    "url": "https://leetcode.cn/problems/non-decreasing-subsequences/description/"
  },
  {
    "acRate": "70.9%",
    "buckets": {
      "all": 407,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 65
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 407,
    "difficulty": "中等",
    "frontendId": "626",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "换座位",
    "titleSlug": "exchange-seats",
    "url": "https://leetcode.cn/problems/exchange-seats/description/"
  },
  {
    "acRate": "80.4%",
    "buckets": {
      "all": 408,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 66
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 408,
    "difficulty": "简单",
    "frontendId": "657",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "simulation",
        "name": "模拟"
      }
    ],
    "titleCn": "机器人能否返回原点",
    "titleSlug": "robot-return-to-origin",
    "url": "https://leetcode.cn/problems/robot-return-to-origin/description/"
  },
  {
    "acRate": "40.5%",
    "buckets": {
      "all": 409,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 66,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 409,
    "difficulty": "中等",
    "frontendId": "678",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "有效的括号字符串",
    "titleSlug": "valid-parenthesis-string",
    "url": "https://leetcode.cn/problems/valid-parenthesis-string/description/"
  },
  {
    "acRate": "64.9%",
    "buckets": {
      "all": 410,
      "thirtyDays": null,
      "threeMonths": 278,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 410,
    "difficulty": "简单",
    "frontendId": "696",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "计数二进制子串",
    "titleSlug": "count-binary-substrings",
    "url": "https://leetcode.cn/problems/count-binary-substrings/description/"
  },
  {
    "acRate": "50.6%",
    "buckets": {
      "all": 411,
      "thirtyDays": null,
      "threeMonths": 279,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 411,
    "difficulty": "中等",
    "frontendId": "974",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "和可被 K 整除的子数组",
    "titleSlug": "subarray-sums-divisible-by-k",
    "url": "https://leetcode.cn/problems/subarray-sums-divisible-by-k/description/"
  },
  {
    "acRate": "81.9%",
    "buckets": {
      "all": 412,
      "thirtyDays": 77,
      "threeMonths": 280,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 412,
    "difficulty": "简单",
    "frontendId": "1365",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "companyRendered",
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
        "slug": "counting-sort",
        "name": "计数排序"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "有多少小于当前数字的数字",
    "titleSlug": "how-many-numbers-are-smaller-than-the-current-number",
    "url": "https://leetcode.cn/problems/how-many-numbers-are-smaller-than-the-current-number/description/"
  },
  {
    "acRate": "66.4%",
    "buckets": {
      "all": 413,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 67,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 413,
    "difficulty": "中等",
    "frontendId": "1907",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "按分类统计薪水",
    "titleSlug": "count-salary-categories",
    "url": "https://leetcode.cn/problems/count-salary-categories/description/"
  },
  {
    "acRate": "44.7%",
    "buckets": {
      "all": 414,
      "thirtyDays": null,
      "threeMonths": 281,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 414,
    "difficulty": "中等",
    "frontendId": "2080",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "区间内查询数字的频率",
    "titleSlug": "range-frequency-queries",
    "url": "https://leetcode.cn/problems/range-frequency-queries/description/"
  },
  {
    "acRate": "46.1%",
    "buckets": {
      "all": 415,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 68,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 415,
    "difficulty": "中等",
    "frontendId": "3381",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "长度可被 K 整除的子数组的最大元素和",
    "titleSlug": "maximum-subarray-sum-with-length-divisible-by-k",
    "url": "https://leetcode.cn/problems/maximum-subarray-sum-with-length-divisible-by-k/description/"
  },
  {
    "acRate": "71.4%",
    "buckets": {
      "all": 416,
      "thirtyDays": null,
      "threeMonths": 282,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 416,
    "difficulty": "简单",
    "frontendId": "面试题 01.01",
    "frequency": 30.6,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "判定字符是否唯一",
    "titleSlug": "is-unique-lcci",
    "url": "https://leetcode.cn/problems/is-unique-lcci/description/"
  },
  {
    "acRate": "75.6%",
    "buckets": {
      "all": 417,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 67
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 417,
    "difficulty": "中等",
    "frontendId": "107",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "二叉树的层序遍历 II",
    "titleSlug": "binary-tree-level-order-traversal-ii",
    "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/"
  },
  {
    "acRate": "49.8%",
    "buckets": {
      "all": 418,
      "thirtyDays": null,
      "threeMonths": 283,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 418,
    "difficulty": "困难",
    "frontendId": "233",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "recursion",
        "name": "递归"
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
    "titleCn": "数字 1 的个数",
    "titleSlug": "number-of-digit-one",
    "url": "https://leetcode.cn/problems/number-of-digit-one/description/"
  },
  {
    "acRate": "56.9%",
    "buckets": {
      "all": 419,
      "thirtyDays": null,
      "threeMonths": 284,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 419,
    "difficulty": "简单",
    "frontendId": "345",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "反转字符串中的元音字母",
    "titleSlug": "reverse-vowels-of-a-string",
    "url": "https://leetcode.cn/problems/reverse-vowels-of-a-string/description/"
  },
  {
    "acRate": "57.9%",
    "buckets": {
      "all": 420,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 68
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 420,
    "difficulty": "简单",
    "frontendId": "541",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "反转字符串 II",
    "titleSlug": "reverse-string-ii",
    "url": "https://leetcode.cn/problems/reverse-string-ii/description/"
  },
  {
    "acRate": "67.8%",
    "buckets": {
      "all": 421,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 69,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 421,
    "difficulty": "中等",
    "frontendId": "931",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "下降路径最小和",
    "titleSlug": "minimum-falling-path-sum",
    "url": "https://leetcode.cn/problems/minimum-falling-path-sum/description/"
  },
  {
    "acRate": "52.6%",
    "buckets": {
      "all": 422,
      "thirtyDays": null,
      "threeMonths": 285,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 422,
    "difficulty": "困难",
    "frontendId": "940",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "不同的子序列 II",
    "titleSlug": "distinct-subsequences-ii",
    "url": "https://leetcode.cn/problems/distinct-subsequences-ii/description/"
  },
  {
    "acRate": "73.3%",
    "buckets": {
      "all": 423,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 69
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 423,
    "difficulty": "中等",
    "frontendId": "1343",
    "frequency": 30.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "大小为 K 且平均值大于等于阈值的子数组数目",
    "titleSlug": "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold",
    "url": "https://leetcode.cn/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/"
  },
  {
    "acRate": "74.8%",
    "buckets": {
      "all": 424,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 70
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 424,
    "difficulty": "中等",
    "frontendId": "116",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "填充每个节点的下一个右侧节点指针",
    "titleSlug": "populating-next-right-pointers-in-each-node",
    "url": "https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/"
  },
  {
    "acRate": "70.6%",
    "buckets": {
      "all": 425,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 71
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 425,
    "difficulty": "中等",
    "frontendId": "147",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "linked-list",
        "name": "链表"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "对链表进行插入排序",
    "titleSlug": "insertion-sort-list",
    "url": "https://leetcode.cn/problems/insertion-sort-list/description/"
  },
  {
    "acRate": "37.0%",
    "buckets": {
      "all": 426,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 72
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 426,
    "difficulty": "中等",
    "frontendId": "204",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "enumeration",
        "name": "枚举"
      },
      {
        "slug": "number-theory",
        "name": "数论"
      }
    ],
    "titleCn": "计数质数",
    "titleSlug": "count-primes",
    "url": "https://leetcode.cn/problems/count-primes/description/"
  },
  {
    "acRate": "43.6%",
    "buckets": {
      "all": 427,
      "thirtyDays": null,
      "threeMonths": 286,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 427,
    "difficulty": "困难",
    "frontendId": "212",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "单词搜索 II",
    "titleSlug": "word-search-ii",
    "url": "https://leetcode.cn/problems/word-search-ii/description/"
  },
  {
    "acRate": "55.8%",
    "buckets": {
      "all": 428,
      "thirtyDays": null,
      "threeMonths": 287,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 428,
    "difficulty": "中等",
    "frontendId": "470",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "用 Rand7() 实现 Rand10()",
    "titleSlug": "implement-rand10-using-rand7",
    "url": "https://leetcode.cn/problems/implement-rand10-using-rand7/description/"
  },
  {
    "acRate": "66.7%",
    "buckets": {
      "all": 429,
      "thirtyDays": null,
      "threeMonths": 288,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 429,
    "difficulty": "中等",
    "frontendId": "515",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "在每个树行中找最大值",
    "titleSlug": "find-largest-value-in-each-tree-row",
    "url": "https://leetcode.cn/problems/find-largest-value-in-each-tree-row/description/"
  },
  {
    "acRate": "82.3%",
    "buckets": {
      "all": 430,
      "thirtyDays": null,
      "threeMonths": 289,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 430,
    "difficulty": "中等",
    "frontendId": "654",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最大二叉树",
    "titleSlug": "maximum-binary-tree",
    "url": "https://leetcode.cn/problems/maximum-binary-tree/description/"
  },
  {
    "acRate": "46.7%",
    "buckets": {
      "all": 431,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 73
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 431,
    "difficulty": "中等",
    "frontendId": "918",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "monotonic-queue",
        "name": "单调队列"
      }
    ],
    "titleCn": "环形子数组的最大和",
    "titleSlug": "maximum-sum-circular-subarray",
    "url": "https://leetcode.cn/problems/maximum-sum-circular-subarray/description/"
  },
  {
    "acRate": "54.1%",
    "buckets": {
      "all": 432,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 70,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 432,
    "difficulty": "中等",
    "frontendId": "1174",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "即时食物配送 II",
    "titleSlug": "immediate-food-delivery-ii",
    "url": "https://leetcode.cn/problems/immediate-food-delivery-ii/description/"
  },
  {
    "acRate": "40.4%",
    "buckets": {
      "all": 433,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 74
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 433,
    "difficulty": "中等",
    "frontendId": "1658",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "prefix-sum",
        "name": "前缀和"
      },
      {
        "slug": "sliding-window",
        "name": "滑动窗口"
      }
    ],
    "titleCn": "将 x 减到 0 的最小操作数",
    "titleSlug": "minimum-operations-to-reduce-x-to-zero",
    "url": "https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/description/"
  },
  {
    "acRate": "62.9%",
    "buckets": {
      "all": 434,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 75
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 434,
    "difficulty": "中等",
    "frontendId": "1934",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "database",
        "name": "数据库"
      }
    ],
    "titleCn": "确认率",
    "titleSlug": "confirmation-rate",
    "url": "https://leetcode.cn/problems/confirmation-rate/description/"
  },
  {
    "acRate": "47.3%",
    "buckets": {
      "all": 435,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 76
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 435,
    "difficulty": "中等",
    "frontendId": "2904",
    "frequency": 30,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "最短且字典序最小的美丽子字符串",
    "titleSlug": "shortest-and-lexicographically-smallest-beautiful-string",
    "url": "https://leetcode.cn/problems/shortest-and-lexicographically-smallest-beautiful-string/description/"
  },
  {
    "acRate": "53.0%",
    "buckets": {
      "all": 436,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 71,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 436,
    "difficulty": "困难",
    "frontendId": "3013",
    "frequency": 29.8,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "将数组分成最小总代价的子数组 II",
    "titleSlug": "divide-an-array-into-subarrays-with-minimum-cost-ii",
    "url": "https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/description/"
  },
  {
    "acRate": "59.6%",
    "buckets": {
      "all": 437,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 77
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 437,
    "difficulty": "中等",
    "frontendId": "399",
    "frequency": 29.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "string",
        "name": "字符串"
      },
      {
        "slug": "shortest-path",
        "name": "最短路"
      }
    ],
    "titleCn": "除法求值",
    "titleSlug": "evaluate-division",
    "url": "https://leetcode.cn/problems/evaluate-division/description/"
  },
  {
    "acRate": "68.7%",
    "buckets": {
      "all": 438,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 78
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 438,
    "difficulty": "中等",
    "frontendId": "583",
    "frequency": 29.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "两个字符串的删除操作",
    "titleSlug": "delete-operation-for-two-strings",
    "url": "https://leetcode.cn/problems/delete-operation-for-two-strings/description/"
  },
  {
    "acRate": "65.8%",
    "buckets": {
      "all": 439,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 72,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 439,
    "difficulty": "中等",
    "frontendId": "636",
    "frequency": 29.7,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "stack",
        "name": "栈"
      },
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "函数的独占时间",
    "titleSlug": "exclusive-time-of-functions",
    "url": "https://leetcode.cn/problems/exclusive-time-of-functions/description/"
  },
  {
    "acRate": "69.2%",
    "buckets": {
      "all": 440,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 79
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 440,
    "difficulty": "简单",
    "frontendId": "867",
    "frequency": 29.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "转置矩阵",
    "titleSlug": "transpose-matrix",
    "url": "https://leetcode.cn/problems/transpose-matrix/description/"
  },
  {
    "acRate": "58.0%",
    "buckets": {
      "all": 441,
      "thirtyDays": null,
      "threeMonths": 290,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888"
    },
    "bytedanceRank": 441,
    "difficulty": "中等",
    "frontendId": "881",
    "frequency": 29.7,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "救生艇",
    "titleSlug": "boats-to-save-people",
    "url": "https://leetcode.cn/problems/boats-to-save-people/description/"
  },
  {
    "acRate": "74.4%",
    "buckets": {
      "all": 442,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 80
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 442,
    "difficulty": "中等",
    "frontendId": "429",
    "frequency": 29.4,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "tree",
        "name": "树"
      },
      {
        "slug": "breadth-first-search",
        "name": "广度优先搜索"
      }
    ],
    "titleCn": "N 叉树的层序遍历",
    "titleSlug": "n-ary-tree-level-order-traversal",
    "url": "https://leetcode.cn/problems/n-ary-tree-level-order-traversal/description/"
  },
  {
    "acRate": "59.4%",
    "buckets": {
      "all": 443,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 81
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 443,
    "difficulty": "困难",
    "frontendId": "3562",
    "frequency": 29.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "折扣价交易股票的最大利润",
    "titleSlug": "maximum-profit-from-trading-stocks-with-discounts",
    "url": "https://leetcode.cn/problems/maximum-profit-from-trading-stocks-with-discounts/description/"
  },
  {
    "acRate": "56.9%",
    "buckets": {
      "all": 444,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 97
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": 444,
    "difficulty": "简单",
    "frontendId": "111",
    "frequency": 29.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "二叉树的最小深度",
    "titleSlug": "minimum-depth-of-binary-tree",
    "url": "https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/"
  },
  {
    "acRate": "79.0%",
    "buckets": {
      "all": 445,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 73,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 445,
    "difficulty": "简单",
    "frontendId": "338",
    "frequency": 29.1,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "dynamic-programming",
        "name": "动态规划"
      }
    ],
    "titleCn": "比特位计数",
    "titleSlug": "counting-bits",
    "url": "https://leetcode.cn/problems/counting-bits/description/"
  },
  {
    "acRate": "69.2%",
    "buckets": {
      "all": 446,
      "thirtyDays": 93,
      "threeMonths": 291,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "threeMonths": "legacyTop888",
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": 446,
    "difficulty": "中等",
    "frontendId": "503",
    "frequency": 29.1,
    "paidOnly": false,
    "source": "companyRendered",
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
    "titleCn": "下一个更大元素 II",
    "titleSlug": "next-greater-element-ii",
    "url": "https://leetcode.cn/problems/next-greater-element-ii/description/"
  },
  {
    "acRate": "71.4%",
    "buckets": {
      "all": 447,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 83
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 447,
    "difficulty": "中等",
    "frontendId": "841",
    "frequency": 29.1,
    "paidOnly": false,
    "source": "legacyTop888",
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
      }
    ],
    "titleCn": "钥匙和房间",
    "titleSlug": "keys-and-rooms",
    "url": "https://leetcode.cn/problems/keys-and-rooms/description/"
  },
  {
    "acRate": "54.8%",
    "buckets": {
      "all": 449,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 85
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 449,
    "difficulty": "简单",
    "frontendId": "228",
    "frequency": 28.8,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "array",
        "name": "数组"
      }
    ],
    "titleCn": "汇总区间",
    "titleSlug": "summary-ranges",
    "url": "https://leetcode.cn/problems/summary-ranges/description/"
  },
  {
    "acRate": "82.5%",
    "buckets": {
      "all": 451,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 74,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 451,
    "difficulty": "简单",
    "frontendId": "222",
    "frequency": 28.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      },
      {
        "slug": "tree",
        "name": "树"
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
    "titleCn": "完全二叉树的节点个数",
    "titleSlug": "count-complete-tree-nodes",
    "url": "https://leetcode.cn/problems/count-complete-tree-nodes/description/"
  },
  {
    "acRate": "50.8%",
    "buckets": {
      "all": 452,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 75,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 452,
    "difficulty": "中等",
    "frontendId": "443",
    "frequency": 28.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "压缩字符串",
    "titleSlug": "string-compression",
    "url": "https://leetcode.cn/problems/string-compression/description/"
  },
  {
    "acRate": "65.1%",
    "buckets": {
      "all": 453,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 76,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 453,
    "difficulty": "简单",
    "frontendId": "705",
    "frequency": 28.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "设计哈希集合",
    "titleSlug": "design-hashset",
    "url": "https://leetcode.cn/problems/design-hashset/description/"
  },
  {
    "acRate": "54.0%",
    "buckets": {
      "all": 454,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 87
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 454,
    "difficulty": "困难",
    "frontendId": "1263",
    "frequency": 28.5,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "推箱子",
    "titleSlug": "minimum-moves-to-move-a-box-to-their-target-location",
    "url": "https://leetcode.cn/problems/minimum-moves-to-move-a-box-to-their-target-location/description/"
  },
  {
    "acRate": "49.2%",
    "buckets": {
      "all": 456,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 77,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 456,
    "difficulty": "困难",
    "frontendId": "2977",
    "frequency": 27.9,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "转换字符串的最小成本 II",
    "titleSlug": "minimum-cost-to-convert-string-ii",
    "url": "https://leetcode.cn/problems/minimum-cost-to-convert-string-ii/description/"
  },
  {
    "acRate": "76.8%",
    "buckets": {
      "all": 457,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": 78,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "all": "legacyTop888",
      "sixMonths": "legacyTop888"
    },
    "bytedanceRank": 457,
    "difficulty": "中等",
    "frontendId": "406",
    "frequency": 21.3,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "array",
        "name": "数组"
      },
      {
        "slug": "sorting",
        "name": "排序"
      }
    ],
    "titleCn": "根据身高重建队列",
    "titleSlug": "queue-reconstruction-by-height",
    "url": "https://leetcode.cn/problems/queue-reconstruction-by-height/description/"
  },
  {
    "acRate": "82.1%",
    "buckets": {
      "all": 458,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 88
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 458,
    "difficulty": "简单",
    "frontendId": "461",
    "frequency": 8.5,
    "paidOnly": false,
    "source": "legacyTop888",
    "tags": [
      {
        "slug": "bit-manipulation",
        "name": "位运算"
      }
    ],
    "titleCn": "汉明距离",
    "titleSlug": "hamming-distance",
    "url": "https://leetcode.cn/problems/hamming-distance/description/"
  },
  {
    "acRate": "78.7%",
    "buckets": {
      "all": 459,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 89
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 459,
    "difficulty": "中等",
    "frontendId": "538",
    "frequency": null,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "把二叉搜索树转换为累加树",
    "titleSlug": "convert-bst-to-greater-tree",
    "url": "https://leetcode.cn/problems/convert-bst-to-greater-tree/description/"
  },
  {
    "acRate": "43.2%",
    "buckets": {
      "all": 460,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 90
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 460,
    "difficulty": "中等",
    "frontendId": "581",
    "frequency": null,
    "paidOnly": false,
    "source": "legacyTop888",
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
        "slug": "two-pointers",
        "name": "双指针"
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
    "titleCn": "最短无序连续子数组",
    "titleSlug": "shortest-unsorted-continuous-subarray",
    "url": "https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/description/"
  },
  {
    "acRate": "79.7%",
    "buckets": {
      "all": 461,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 91
    },
    "bucketSources": {
      "all": "legacyTop888",
      "moreThanSixMonths": "legacyTop888"
    },
    "bytedanceRank": 461,
    "difficulty": "简单",
    "frontendId": "617",
    "frequency": null,
    "paidOnly": false,
    "source": "legacyTop888",
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
    "titleCn": "合并二叉树",
    "titleSlug": "merge-two-binary-trees",
    "url": "https://leetcode.cn/problems/merge-two-binary-trees/description/"
  },
  {
    "acRate": "72.8%",
    "buckets": {
      "all": null,
      "thirtyDays": 60,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "1441",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "用栈操作构建数组",
    "titleSlug": "build-an-array-with-stack-operations",
    "url": "https://leetcode.cn/problems/build-an-array-with-stack-operations/description/"
  },
  {
    "acRate": "60.3%",
    "buckets": {
      "all": null,
      "thirtyDays": 61,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "困难",
    "frontendId": "2435",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "矩阵中和能被 K 整除的路径",
    "titleSlug": "paths-in-matrix-whose-sum-is-divisible-by-k",
    "url": "https://leetcode.cn/problems/paths-in-matrix-whose-sum-is-divisible-by-k/description/"
  },
  {
    "acRate": "64.1%",
    "buckets": {
      "all": null,
      "thirtyDays": 64,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "面试题 04.10",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "检查子树",
    "titleSlug": "check-subtree-lcci",
    "url": "https://leetcode.cn/problems/check-subtree-lcci/description/"
  },
  {
    "acRate": "82.2%",
    "buckets": {
      "all": null,
      "thirtyDays": 65,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "面试题 08.04",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "幂集",
    "titleSlug": "power-set-lcci",
    "url": "https://leetcode.cn/problems/power-set-lcci/description/"
  },
  {
    "acRate": "68.8%",
    "buckets": {
      "all": null,
      "thirtyDays": 66,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "684",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "冗余连接",
    "titleSlug": "redundant-connection",
    "url": "https://leetcode.cn/problems/redundant-connection/description/"
  },
  {
    "acRate": "63.7%",
    "buckets": {
      "all": null,
      "thirtyDays": 74,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "1319",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "连通网络的操作次数",
    "titleSlug": "number-of-operations-to-make-network-connected",
    "url": "https://leetcode.cn/problems/number-of-operations-to-make-network-connected/description/"
  },
  {
    "acRate": "64.7%",
    "buckets": {
      "all": null,
      "thirtyDays": 75,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "LCR 026",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "重排链表",
    "titleSlug": "LGjMqU",
    "url": "https://leetcode.cn/problems/LGjMqU/description/"
  },
  {
    "acRate": "77.3%",
    "buckets": {
      "all": null,
      "thirtyDays": 76,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "简单",
    "frontendId": "1323",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "6 和 9 组成的最大数字",
    "titleSlug": "maximum-69-number",
    "url": "https://leetcode.cn/problems/maximum-69-number/description/"
  },
  {
    "acRate": "44.0%",
    "buckets": {
      "all": null,
      "thirtyDays": 78,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "LCR 010",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "和为 K 的子数组",
    "titleSlug": "QTMn0o",
    "url": "https://leetcode.cn/problems/QTMn0o/description/"
  },
  {
    "acRate": "64.0%",
    "buckets": {
      "all": null,
      "thirtyDays": 83,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "LCR 168",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "丑数",
    "titleSlug": "chou-shu-lcof",
    "url": "https://leetcode.cn/problems/chou-shu-lcof/description/"
  },
  {
    "acRate": "62.8%",
    "buckets": {
      "all": null,
      "thirtyDays": 86,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "面试题 01.08",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "零矩阵",
    "titleSlug": "zero-matrix-lcci",
    "url": "https://leetcode.cn/problems/zero-matrix-lcci/description/"
  },
  {
    "acRate": "70.9%",
    "buckets": {
      "all": null,
      "thirtyDays": 89,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "2637",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "有时间限制的 Promise 对象",
    "titleSlug": "promise-time-limit",
    "url": "https://leetcode.cn/problems/promise-time-limit/description/"
  },
  {
    "acRate": "83.3%",
    "buckets": {
      "all": null,
      "thirtyDays": 90,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "简单",
    "frontendId": "2833",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "距离原点最远的点",
    "titleSlug": "furthest-point-from-origin",
    "url": "https://leetcode.cn/problems/furthest-point-from-origin/description/"
  },
  {
    "acRate": "51.2%",
    "buckets": {
      "all": null,
      "thirtyDays": 91,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "困难",
    "frontendId": "132",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "分割回文串 II",
    "titleSlug": "palindrome-partitioning-ii",
    "url": "https://leetcode.cn/problems/palindrome-partitioning-ii/description/"
  },
  {
    "acRate": "43.1%",
    "buckets": {
      "all": null,
      "thirtyDays": 92,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "困难",
    "frontendId": "440",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "字典序的第K小数字",
    "titleSlug": "k-th-smallest-in-lexicographical-order",
    "url": "https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/description/"
  },
  {
    "acRate": "57.5%",
    "buckets": {
      "all": null,
      "thirtyDays": 100,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "thirtyDays": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "846",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "一手顺子",
    "titleSlug": "hand-of-straights",
    "url": "https://leetcode.cn/problems/hand-of-straights/description/"
  },
  {
    "acRate": "48.2%",
    "buckets": {
      "all": null,
      "thirtyDays": null,
      "threeMonths": 82,
      "sixMonths": null,
      "moreThanSixMonths": null
    },
    "bucketSources": {
      "threeMonths": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "LCR 016",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "无重复字符的最长子串",
    "titleSlug": "wtcaE1",
    "url": "https://leetcode.cn/problems/wtcaE1/description/"
  },
  {
    "acRate": "73.1%",
    "buckets": {
      "all": null,
      "thirtyDays": null,
      "threeMonths": null,
      "sixMonths": null,
      "moreThanSixMonths": 96
    },
    "bucketSources": {
      "moreThanSixMonths": "companyRendered"
    },
    "bytedanceRank": null,
    "difficulty": "中等",
    "frontendId": "106",
    "frequency": null,
    "paidOnly": false,
    "source": "companyRendered",
    "tags": [],
    "titleCn": "从中序与后序遍历序列构造二叉树",
    "titleSlug": "construct-binary-tree-from-inorder-and-postorder-traversal",
    "url": "https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/"
  }
]) satisfies LeetcodeByteDanceProblem[];

export const leetcodeByteDanceStats = {
  "source": "LeetCode China company favorite favoriteQuestionList sorted by FREQUENCY descending.",
  "sourceStatus": "chromeRenderedTop100MergedWithLegacyTop888Fallback",
  "sourceUpdatedAt": "2026-05-17",
  "targetAll": 1503,
  "syncedAll": 465,
  "syncComplete": false,
  "bucketTotals": {
    "all": 465,
    "thirtyDays": 100,
    "threeMonths": 293,
    "sixMonths": 175,
    "moreThanSixMonths": 187
  },
  "renderedBucketCounts": {
    "all": 100,
    "thirtyDays": 100,
    "threeMonths": 100,
    "sixMonths": 100,
    "moreThanSixMonths": 100
  },
  "renderedSource": "Chrome-rendered LeetCode company pages, visible Top100 per favoriteSlug."
} as const;
