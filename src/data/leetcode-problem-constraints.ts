export const leetcodeProblemConstraints = ({
  "two-sum": [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "只会存在一个有效答案"
  ],
  "longest-substring-without-repeating-characters": [
    "0 <= s.length <= 5 * 10^4",
    "s 由英文字母、数字、符号和空格组成"
  ],
  "trapping-rain-water": [
    "n == height.length",
    "1 <= n <= 2 * 10^4",
    "0 <= height[i] <= 10^5"
  ],
  "group-anagrams": [
    "1 <= strs.length <= 10^4",
    "0 <= strs[i].length <= 100",
    "strs[i] 仅包含小写字母"
  ],
  "lru-cache": [
    "1 <= capacity <= 3000",
    "0 <= key <= 10000",
    "0 <= value <= 10^5",
    "最多调用 2 * 10^5 次 get 和 put"
  ],
  "longest-palindromic-substring": [
    "1 <= s.length <= 1000",
    "s 仅由数字和英文字母组成"
  ],
  "longest-consecutive-sequence": [
    "0 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "3sum": [
    "3 <= nums.length <= 3000",
    "-10^5 <= nums[i] <= 10^5"
  ],
  "climbing-stairs": [
    "1 <= n <= 45"
  ],
  "subarray-sum-equals-k": [
    "1 <= nums.length <= 2 * 10^4",
    "-1000 <= nums[i] <= 1000",
    "-10^7 <= k <= 10^7"
  ],
  "add-two-numbers": [
    "每个链表中的节点数在范围 [1, 100] 内",
    "0 <= Node.val <= 9",
    "题目数据保证列表表示的数字不含前导零"
  ],
  "container-with-most-water": [
    "n == height.length",
    "2 <= n <= 10^5",
    "0 <= height[i] <= 10^4"
  ],
  "number-of-islands": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 300",
    "grid[i][j] 的值为 '0' 或 '1'"
  ],
  "median-of-two-sorted-arrays": [
    "nums1.length == m",
    "nums2.length == n",
    "0 <= m <= 1000",
    "0 <= n <= 1000",
    "1 <= m + n <= 2000",
    "-10^6 <= nums1[i], nums2[i] <= 10^6"
  ],
  "merge-intervals": [
    "1 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^4"
  ],
  "kth-largest-element-in-an-array": [
    "1 <= k <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "merge-two-sorted-lists": [
    "两个链表的节点数目范围是 [0, 50]",
    "-100 <= Node.val <= 100",
    "l1 和 l2 均按 非递减顺序 排列"
  ],
  "move-zeroes": [
    "1 <= nums.length <= 10^4",
    "-2^31 <= nums[i] <= 2^31 - 1"
  ],
  "valid-parentheses": [
    "1 <= s.length <= 10^4",
    "s 仅由括号 '()[]{}' 组成"
  ],
  "add-two-integers": [
    "-100 <= num1, num2 <= 100"
  ],
  "spiral-matrix": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 10",
    "-100 <= matrix[i][j] <= 100"
  ],
  "reverse-linked-list": [
    "链表中节点的数目范围是 [0, 5000]",
    "-5000 <= Node.val <= 5000"
  ],
  "merge-sorted-array": [
    "nums1.length == m + n",
    "nums2.length == n",
    "0 <= m, n <= 200",
    "1 <= m + n <= 200",
    "-10^9 <= nums1[i], nums2[j] <= 10^9"
  ],
  "longest-common-prefix": [
    "1 <= strs.length <= 200",
    "0 <= strs[i].length <= 200",
    "strs[i] 如果非空，则仅由小写英文字母组成"
  ],
  "best-time-to-buy-and-sell-stock": [
    "1 <= prices.length <= 10^5",
    "0 <= prices[i] <= 10^4"
  ],
  "sliding-window-maximum": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
    "1 <= k <= nums.length"
  ],
  "palindrome-number": [
    "-2^31 <= x <= 2^31 - 1"
  ],
  "edit-distance": [
    "0 <= word1.length, word2.length <= 500",
    "word1 和 word2 由小写英文字母组成"
  ],
  "generate-parentheses": [
    "1 <= n <= 8"
  ],
  "maximum-subarray": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "binary-search": [
    "你可以假设 nums 中的所有元素是不重复的。",
    "n 将在 [1, 10000]之间。",
    "nums 的每个元素都将在 [-9999, 9999]之间。"
  ],
  "reverse-nodes-in-k-group": [
    "链表中的节点数目为 n",
    "1 <= k <= n <= 5000",
    "0 <= Node.val <= 1000"
  ],
  "find-all-anagrams-in-a-string": [
    "1 <= s.length, p.length <= 3 * 10^4",
    "s 和 p 仅包含小写字母"
  ],
  "remove-element": [
    "0 <= nums.length <= 100",
    "0 <= nums[i] <= 50",
    "0 <= val <= 100"
  ],
  "lowest-common-ancestor-of-a-binary-tree": [
    "树中节点数目在范围 [2, 10^5] 内。",
    "-10^9 <= Node.val <= 10^9",
    "所有 Node.val 互不相同。",
    "p != q",
    "p 和 q 均存在于给定的二叉树中。"
  ],
  "house-robber": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 400"
  ],
  "perfect-squares": [
    "1 <= n <= 10^4"
  ],
  "spiral-matrix-ii": [
    "1 <= n <= 20"
  ],
  "find-the-index-of-the-first-occurrence-in-a-string": [
    "1 <= haystack.length, needle.length <= 10^4",
    "haystack 和 needle 仅由小写英文字符组成"
  ],
  "permutations": [
    "1 <= nums.length <= 6",
    "-10 <= nums[i] <= 10",
    "nums 中的所有整数 互不相同"
  ],
  "longest-valid-parentheses": [
    "0 <= s.length <= 3 * 10^4",
    "s[i] 为 '(' 或 ')'"
  ],
  "daily-temperatures": [
    "1 <= temperatures.length <= 10^5",
    "30 <= temperatures[i] <= 100"
  ],
  "partition-equal-subset-sum": [
    "1 <= nums.length <= 200",
    "1 <= nums[i] <= 100"
  ],
  "minimum-size-subarray-sum": [
    "1 <= target <= 10^9",
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^4"
  ],
  "intersection-of-two-linked-lists": [
    "listA 中节点数目为 m",
    "listB 中节点数目为 n",
    "1 <= m, n <= 3 * 10^4",
    "1 <= Node.val <= 10^5",
    "0 <= skipA <= m",
    "0 <= skipB <= n",
    "如果 listA 和 listB 没有交点，intersectVal 为 0",
    "如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]"
  ],
  "combine-two-tables": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "n-queens": [
    "1 <= n <= 9"
  ],
  "first-missing-positive": [
    "1 <= nums.length <= 10^5",
    "-2^31 <= nums[i] <= 2^31 - 1"
  ],
  "jump-game": [
    "1 <= nums.length <= 10^4",
    "0 <= nums[i] <= 10^5"
  ],
  "sort-an-array": [
    "1 <= nums.length <= 5 * 10^4",
    "-5 * 10^4 <= nums[i] <= 5 * 10^4"
  ],
  "longest-common-subsequence": [
    "1 <= text1.length, text2.length <= 1000",
    "text1 和 text2 仅由小写英文字符组成。"
  ],
  "palindrome-partitioning": [
    "1 <= s.length <= 16",
    "s 仅由小写英文字母组成"
  ],
  "jump-game-ii": [
    "1 <= nums.length <= 10^4",
    "0 <= nums[i] <= 1000",
    "题目保证可以到达 n - 1"
  ],
  "binary-tree-maximum-path-sum": [
    "树中节点数目范围是 [1, 3 * 10^4]",
    "-1000 <= Node.val <= 1000"
  ],
  "search-in-rotated-sorted-array": [
    "1 <= nums.length <= 5000",
    "-10^4 <= nums[i] <= 10^4",
    "nums 中的每个值都 独一无二",
    "题目数据保证 nums 在预先未知的某个下标上进行了旋转",
    "-10^4 <= target <= 10^4"
  ],
  "search-insert-position": [
    "1 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "nums 为 无重复元素 的 升序 排列数组",
    "-10^4 <= target <= 10^4"
  ],
  "search-a-2d-matrix-ii": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= n, m <= 300",
    "-10^9 <= matrix[i][j] <= 10^9",
    "每行的所有元素从左到右升序排列",
    "每列的所有元素从上到下升序排列",
    "-10^9 <= target <= 10^9"
  ],
  "longest-increasing-subsequence": [
    "1 <= nums.length <= 2500",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "minimum-window-substring": [
    "m == s.length",
    "n == t.length",
    "1 <= m, n <= 10^5",
    "s 和 t 由英文字母组成"
  ],
  "merge-k-sorted-lists": [
    "k == lists.length",
    "0 <= k <= 10^4",
    "0 <= lists[i].length <= 500",
    "-10^4 <= lists[i][j] <= 10^4",
    "lists[i] 按 升序 排列",
    "lists[i].length 的总和不超过 10^4"
  ],
  "palindrome-linked-list": [
    "链表中节点数目在范围[1, 10^5] 内",
    "0 <= Node.val <= 9"
  ],
  "swap-nodes-in-pairs": [
    "链表中节点的数目在范围 [0, 100] 内",
    "0 <= Node.val <= 100"
  ],
  "remove-duplicates-from-sorted-array": [
    "1 <= nums.length <= 3 * 10^4",
    "-10 0 0",
    "nums 已按 非递减 顺序排列。"
  ],
  "merge-strings-alternately": [
    "1 <= word1.length, word2.length <= 100",
    "word1 和 word2 由小写英文字母组成"
  ],
  "construct-binary-tree-from-preorder-and-inorder-traversal": [
    "1 <= preorder.length <= 3000",
    "inorder.length == preorder.length",
    "-3000 <= preorder[i], inorder[i] <= 3000",
    "preorder 和 inorder 均 无重复 元素",
    "inorder 均出现在 preorder",
    "preorder 保证 为二叉树的前序遍历序列",
    "inorder 保证 为二叉树的中序遍历序列"
  ],
  "sort-list": [
    "链表中节点的数目在范围 [0, 5 * 10^4] 内",
    "-10^5 <= Node.val <= 10^5"
  ],
  "next-permutation": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 100"
  ],
  "concatenation-of-array": [
    "n == nums.length",
    "1 <= n <= 1000",
    "1 <= nums[i] <= 1000"
  ],
  "minimum-path-sum": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 200",
    "0 <= grid[i][j] <= 200"
  ],
  "letter-combinations-of-a-phone-number": [
    "1 <= digits.length <= 4",
    "digits[i] 是范围 ['2', '9'] 的一个数字。"
  ],
  "reorder-list": [
    "链表的长度范围为 [1, 5 * 10^4]",
    "1 <= node.val <= 1000"
  ],
  "multiply-strings": [
    "1 <= num1.length, num2.length <= 200",
    "num1 和 num2 只能由数字组成。",
    "num1 和 num2 都不包含任何前导零，除了数字0本身。"
  ],
  "implement-trie-prefix-tree": [
    "1 <= word.length, prefix.length <= 2000",
    "word 和 prefix 仅由小写英文字母组成",
    "insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次"
  ],
  "basic-calculator": [
    "1 <= s.length <= 3 * 10^5",
    "s 由数字、'+'、'-'、'('、')'、和 ' ' 组成",
    "s 表示一个有效的表达式",
    "'+' 不能用作一元运算(例如， \"+1\" 和 \"+(2 + 3)\" 无效)",
    "'-' 可以用作一元运算(即 \"-1\" 和 \"-(2 + 3)\" 是有效的)",
    "输入中不存在两个连续的操作符",
    "每个数字和运行的计算将适合于一个有符号的 32位 整数"
  ],
  "rotting-oranges": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 10",
    "grid[i][j] 仅为 0、1 或 2"
  ],
  "maximal-square": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 300",
    "matrix[i][j] 为 '0' 或 '1'"
  ],
  "squares-of-a-sorted-array": [
    "1 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "nums 已按 非递减顺序 排序"
  ],
  "maximum-product-subarray": [
    "1 <= nums.length <= 2 * 10^4",
    "-10 <= nums[i] <= 10",
    "nums 的任何子数组的乘积都 保证 是一个 32-位 整数"
  ],
  "candy": [
    "n == ratings.length",
    "1 <= n <= 2 * 10^4",
    "0 <= ratings[i] <= 2 * 10^4"
  ],
  "employees-earning-more-than-their-managers": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "course-schedule": [
    "1 <= numCourses <= 2000",
    "0 <= prerequisites.length <= 5000",
    "prerequisites[i].length == 2",
    "0 <= a_i, b_i < numCourses",
    "prerequisites[i] 中的所有课程对 互不相同"
  ],
  "binary-tree-level-order-traversal": [
    "树中节点数目在范围 [0, 2000] 内",
    "-1000 <= Node.val <= 1000"
  ],
  "coin-change": [
    "1 <= coins.length <= 12",
    "1 <= coins[i] <= 2^31 - 1",
    "0 <= amount <= 10^4"
  ],
  "find-first-and-last-position-of-element-in-sorted-array": [
    "0 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
    "nums 是一个非递减数组",
    "-10^9 <= target <= 10^9"
  ],
  "copy-list-with-random-pointer": [
    "0",
    "-10^4 <= Node.val <= 10^4",
    "Node.random 为 null 或指向链表中的节点。"
  ],
  "binary-tree-inorder-traversal": [
    "树中节点数目在范围 [0, 100] 内",
    "-100 <= Node.val <= 100"
  ],
  "roman-to-integer": [
    "1 <= s.length <= 15",
    "s 仅含字符 ('I', 'V', 'X', 'L', 'C', 'D', 'M')",
    "题目数据保证 s 是一个有效的罗马数字，且表示整数在范围 [1, 3999] 内",
    "题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。",
    "IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX。",
    "关于罗马数字的详尽书写规则，可以参考 罗马数字 - 百度百科。"
  ],
  "decode-string": [
    "1 <= s.length <= 30",
    "s 由小写英文字母、数字和方括号 '[]' 组成",
    "s 保证是一个 有效 的输入。",
    "s 中所有整数的取值范围为 [1, 300]"
  ],
  "word-break": [
    "1 <= s.length <= 300",
    "1 <= wordDict.length <= 1000",
    "1 <= wordDict[i].length <= 20",
    "s 和 wordDict[i] 仅由小写英文字母组成",
    "wordDict 中的所有字符串 互不相同"
  ],
  "regular-expression-matching": [
    "1 <= s.length <= 20",
    "1 <= p.length <= 20",
    "s 只包含从 a-z 的小写字母。",
    "p 只包含从 a-z 的小写字母，以及字符 . 和 *。",
    "保证每次出现字符 * 时，前面都匹配到有效的字符"
  ],
  "reverse-integer": [
    "-2^31 <= x <= 2^31 - 1"
  ],
  "search-a-2d-matrix": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 100",
    "-10^4 <= matrix[i][j], target <= 10^4"
  ],
  "maximum-depth-of-binary-tree": [
    "树中节点的数量在 [0, 10^4] 区间内。",
    "-100 <= Node.val <= 100"
  ],
  "palindromic-substrings": [
    "1 <= s.length <= 1000",
    "s 由小写英文字母组成"
  ],
  "3sum-closest": [
    "3 <= nums.length <= 1000",
    "-1000 <= nums[i] <= 1000",
    "-10^4 <= target <= 10^4"
  ],
  "single-number": [
    "1 <= nums.length <= 3 * 10^4",
    "-3 * 10^4 <= nums[i] <= 3 * 10^4",
    "除了某个元素只出现一次以外，其余每个元素均出现两次。"
  ],
  "remove-nth-node-from-end-of-list": [
    "链表中结点的数目为 sz",
    "1 <= sz <= 30",
    "0 <= Node.val <= 100",
    "1 <= n <= sz"
  ],
  "rotate-image": [
    "n == matrix.length == matrix[i].length",
    "1 <= n <= 20",
    "-1000 <= matrix[i][j] <= 1000"
  ],
  "invert-binary-tree": [
    "树中节点数目范围在 [0, 100] 内",
    "-100 <= Node.val <= 100"
  ],
  "set-matrix-zeroes": [
    "m == matrix.length",
    "n == matrix[0].length",
    "1 <= m, n <= 200",
    "-2^31 <= matrix[i][j] <= 2^31 - 1"
  ],
  "validate-binary-search-tree": [
    "树中节点数目范围在[1, 10^4] 内",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  "diameter-of-binary-tree": [
    "树中节点数目在范围 [1, 10^4] 内",
    "-100 <= Node.val <= 100"
  ],
  "linked-list-cycle": [
    "链表中节点的数目范围是 [0, 10^4]",
    "-10^5 <= Node.val <= 10^5",
    "pos 为 -1 或者链表中的一个 有效索引。"
  ],
  "largest-rectangle-in-histogram": [
    "1 <= heights.length <=10^5",
    "0 <= heights[i] <= 10^4"
  ],
  "largest-number": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 10^9"
  ],
  "remove-linked-list-elements": [
    "列表中的节点数目在范围 [0, 10^4] 内",
    "1 <= Node.val <= 50",
    "0 <= val <= 50"
  ],
  "restore-ip-addresses": [
    "1 <= s.length <= 20",
    "s 仅由数字组成"
  ],
  "design-linked-list": [
    "0 <= index, val <= 1000",
    "请不要使用内置的 LinkedList 库。",
    "调用 get、addAtHead、addAtTail、addAtIndex 和 deleteAtIndex 的次数不超过 2000。"
  ],
  "can-make-arithmetic-progression-from-sequence": [
    "2 <= arr.length <= 1000",
    "-10^6 <= arr[i] <= 10^6"
  ],
  "recyclable-and-low-fat-products": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "zigzag-conversion": [
    "1 <= s.length <= 1000",
    "s 由英文字母（小写和大写）、',' 和 '.' 组成",
    "1 <= numRows <= 1000"
  ],
  "reverse-linked-list-ii": [
    "链表中节点数目为 n",
    "1 <= n <= 500",
    "-500 <= Node.val <= 500",
    "1 <= left <= right <= n"
  ],
  "linked-list-cycle-ii": [
    "链表中节点的数目范围在范围 [0, 10^4] 内",
    "-10^5 <= Node.val <= 10^5",
    "pos 的值为 -1 或者链表中的一个有效索引"
  ],
  "happy-number": [
    "1 <= n <= 2^31 - 1"
  ],
  "add-binary": [
    "1 <= a.length, b.length <= 10^4",
    "a 和 b 仅由字符 '0' 或 '1' 组成",
    "字符串如果不是 \"0\"，就不含前导零"
  ],
  "sqrtx": [
    "0 <= x <= 2^31 - 1"
  ],
  "subsets": [
    "1 <= nums.length <= 10",
    "-10 <= nums[i] <= 10",
    "nums 中的所有元素 互不相同"
  ],
  "permutations-ii": [
    "1 <= nums.length <= 8",
    "-10 <= nums[i] <= 10"
  ],
  "add-strings": [
    "1 <= num1.length, num2.length <= 10^4",
    "num1 和num2 都只包含数字 0-9",
    "num1 和num2 都不包含任何前导零"
  ],
  "pascals-triangle": [
    "1 <= numRows <= 30"
  ],
  "top-k-frequent-elements": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
    "k 的取值范围是 [1, 数组中不相同的元素的个数]",
    "题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的"
  ],
  "best-time-to-buy-and-sell-stock-ii": [
    "1 <= prices.length <= 3 * 10^4",
    "0 <= prices[i] <= 10^4"
  ],
  "rotate-array": [
    "1 <= nums.length <= 10^5",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "0 <= k <= 10^5"
  ],
  "fruit-into-baskets": [
    "1 <= fruits.length <= 10^5",
    "0 <= fruits[i] < fruits.length"
  ],
  "fibonacci-number": [
    "0 <= n <= 30"
  ],
  "min-stack": [
    "-2^31 <= val <= 2^31 - 1",
    "pop、top 和 getMin 操作总是在 非空栈 上调用",
    "push, pop, top, and getMin最多被调用 3 * 10^4 次"
  ],
  "4sum-ii": [
    "n == nums1.length",
    "n == nums2.length",
    "n == nums3.length",
    "n == nums4.length",
    "1 <= n <= 200",
    "-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28"
  ],
  "find-the-duplicate-number": [
    "1 <= n <= 10^5",
    "nums.length == n + 1",
    "1 <= nums[i] <= n",
    "nums 中 只有一个整数 出现 两次或多次，其余整数均只出现 一次"
  ],
  "majority-element": [
    "n == nums.length",
    "1 <= n <= 5 * 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "输入保证数组中一定有一个多数元素。"
  ],
  "product-of-array-except-self": [
    "2 <= nums.length <= 10^5",
    "-30 <= nums[i] <= 30",
    "输入 保证 数组 answer[i] 在 32 位 整数范围内"
  ],
  "min-cost-climbing-stairs": [
    "2 <= cost.length <= 1000",
    "0 <= cost[i] <= 999"
  ],
  "find-the-difference": [
    "0 <= s.length <= 1000",
    "t.length == s.length + 1",
    "s 和 t 只包含小写字母"
  ],
  "path-sum-iii": [
    "二叉树的节点个数的范围是 [0,1000]",
    "-10^9 <= Node.val <= 10^9",
    "-1000 <= targetSum <= 1000"
  ],
  "managers-with-at-least-5-direct-reports": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "4sum": [
    "1 <= nums.length <= 200",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9"
  ],
  "find-median-from-data-stream": [
    "-10^5 <= num <= 10^5",
    "在调用 findMedian 之前，数据结构中至少有一个元素",
    "最多 5 * 10^4 次调用 addNum 和 findMedian"
  ],
  "maximal-rectangle": [
    "rows == matrix.length",
    "cols == matrix[0].length",
    "1 <= rows, cols <= 200",
    "matrix[i][j] 为 '0' 或 '1'"
  ],
  "shuffle-the-array": [
    "1 <= n <= 500",
    "nums.length == 2n",
    "1 <= nums[i] <= 10^3"
  ],
  "best-time-to-buy-and-sell-stock-iii": [
    "1 <= prices.length <= 10^5",
    "0 <= prices[i] <= 10^5"
  ],
  "find-peak-element": [
    "1 <= nums.length <= 1000",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "对于所有有效的 i 都有 nums[i] != nums[i + 1]"
  ],
  "maximum-length-of-repeated-subarray": [
    "1 <= nums1.length, nums2.length <= 1000",
    "0 <= nums1[i], nums2[i] <= 100"
  ],
  "convert-sorted-array-to-binary-search-tree": [
    "1 <= nums.length <= 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "nums 按 严格递增 顺序排列"
  ],
  "intersection-of-two-arrays": [
    "1 <= nums1.length, nums2.length <= 1000",
    "0 <= nums1[i], nums2[i] <= 1000"
  ],
  "unique-paths": [
    "1 <= m, n <= 100",
    "题目数据保证答案小于等于 2 * 10^9"
  ],
  "integer-break": [
    "2 <= n <= 58"
  ],
  "combinations": [
    "1 <= n <= 20",
    "1 <= k <= n"
  ],
  "combination-sum": [
    "1 <= candidates.length <= 30",
    "2 <= candidates[i] <= 40",
    "candidates 的所有元素 互不相同",
    "1 <= target <= 40"
  ],
  "rising-temperature": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "longest-palindromic-subsequence": [
    "1 <= s.length <= 1000",
    "s 仅由小写英文字母组成"
  ],
  "shu-de-zi-jie-gou-lcof": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "symmetric-tree": [
    "树中节点数目在范围 [1, 1000] 内",
    "-100 <= Node.val <= 100"
  ],
  "word-search": [
    "m == board.length",
    "n = board[i].length",
    "1 <= m, n <= 6",
    "1 <= word.length <= 15",
    "board 和 word 仅由大小写英文字母组成"
  ],
  "compare-version-numbers": [
    "1 <= version1.length, version2.length <= 500",
    "version1 和 version2 仅包含数字和 '.'",
    "version1 和 version2 都是 有效版本号",
    "version1 和 version2 的所有修订号都可以存储在 32 位整数 中"
  ],
  "set-mismatch": [
    "2 <= nums.length <= 10^4",
    "1 <= nums[i] <= 10^4"
  ],
  "longest-increasing-path-in-a-matrix": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 200",
    "0 <= matrix[i][j] <= 2^31 - 1"
  ],
  "decode-ways": [
    "1 <= s.length <= 100",
    "s 只包含数字，并且可能包含前导零。"
  ],
  "last-stone-weight-ii": [
    "1 <= stones.length <= 30",
    "1 <= stones[i] <= 100"
  ],
  "remove-duplicates-from-sorted-array-ii": [
    "1 <= nums.length <= 3 * 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "nums 已按升序排列"
  ],
  "integer-to-roman": [
    "1 <= num <= 3999"
  ],
  "unique-paths-ii": [
    "m == obstacleGrid.length",
    "n == obstacleGrid[i].length",
    "1 <= m, n <= 100",
    "obstacleGrid[i][j] 为 0 或 1"
  ],
  "gas-station": [
    "n == gas.length == cost.length",
    "1 <= n <= 10^5",
    "0 <= gas[i], cost[i] <= 10^4",
    "输入保证答案唯一。"
  ],
  "consecutive-numbers": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "max-consecutive-ones-iii": [
    "1 <= nums.length <= 10^5",
    "nums[i] 不是 0 就是 1",
    "0 <= k <= nums.length"
  ],
  "partition-to-k-equal-sum-subsets": [
    "1 <= k <= len(nums) <= 16",
    "0 < nums[i] < 10000",
    "每个元素的频率在 [1,4] 范围内"
  ],
  "find-all-numbers-disappeared-in-an-array": [
    "n == nums.length",
    "1 <= n <= 10^5",
    "1 <= nums[i] <= n"
  ],
  "delete-and-earn": [
    "1 <= nums.length <= 2 * 10^4",
    "1 <= nums[i] <= 10^4"
  ],
  "binary-tree-right-side-view": [
    "二叉树的节点个数的范围是 [0,100]",
    "-100 <= Node.val <= 100"
  ],
  "nth-highest-salary": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "number-of-longest-increasing-subsequence": [
    "1 <= nums.length <= 2000",
    "-10^6 <= nums[i] <= 10^6"
  ],
  "find-customer-referee": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "valid-palindrome": [
    "1 <= s.length <= 2 * 10^5",
    "s 仅由可打印的 ASCII 字符组成"
  ],
  "monthly-transactions-i": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "plus-one": [
    "1 <= digits.length <= 100",
    "0 <= digits[i] <= 9",
    "digits 不包含任何前导 0。"
  ],
  "repeated-substring-pattern": [
    "1 <= s.length <= 10^4",
    "s 由小写英文字母组成"
  ],
  "sort-colors": [
    "n == nums.length",
    "1 <= n <= 300",
    "nums[i] 为 0、1 或 2"
  ],
  "binary-tree-zigzag-level-order-traversal": [
    "树中节点数目在范围 [0, 2000] 内",
    "-100 <= Node.val <= 100"
  ],
  "valid-sudoku": [
    "board.length == 9",
    "board[i].length == 9",
    "board[i][j] 是一位数字（1-9）或者 '.'"
  ],
  "subarray-product-less-than-k": [
    "1 <= nums.length <= 3 * 10^4",
    "1 <= nums[i] <= 1000",
    "0 <= k <= 10^6"
  ],
  "house-robber-ii": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 1000"
  ],
  "top-k-frequent-words": [
    "1 <= words.length <= 500",
    "1 <= words[i].length <= 10",
    "words[i] 由小写英文字母组成。",
    "k 的取值范围是 [1, 不同 words[i] 的数量]"
  ],
  "remove-k-digits": [
    "1 <= k <= num.length <= 10^5",
    "num 仅由若干位数字（0 - 9）组成",
    "除了 0 本身之外，num 不含任何前导零"
  ],
  "valid-triangle-number": [
    "1 <= nums.length <= 1000",
    "0 <= nums[i] <= 1000"
  ],
  "reverse-words-in-a-string": [
    "1 <= s.length <= 10^4",
    "s 包含英文大小写字母、数字和空格 ' '",
    "s 中 至少存在一个 单词"
  ],
  "best-time-to-buy-and-sell-stock-with-cooldown": [
    "1 <= prices.length <= 5000",
    "0 <= prices[i] <= 1000"
  ],
  "substring-with-concatenation-of-all-words": [
    "1 <= s.length <= 10^4",
    "1 <= words.length <= 5000",
    "1 <= words[i].length <= 30",
    "words[i] 和 s 由小写英文字母组成"
  ],
  "department-highest-salary": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "average-time-of-process-per-machine": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "wiggle-subsequence": [
    "1 <= nums.length <= 1000",
    "0 <= nums[i] <= 1000"
  ],
  "kth-node-from-end-of-list-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "numbers-at-most-n-given-digit-set": [
    "1 <= digits.length <= 9",
    "digits[i].length == 1",
    "digits[i] 是从 '1' 到 '9' 的数",
    "digits 中的所有值都 不同",
    "digits 按 非递减顺序 排列",
    "1 <= n <= 10^9"
  ],
  "remove-duplicates-from-sorted-list": [
    "链表中节点数目在范围 [0, 300] 内",
    "-100 <= Node.val <= 100",
    "题目数据保证链表已经按升序 排列"
  ],
  "partition-list": [
    "链表中节点的数目在范围 [0, 200] 内",
    "-100 <= Node.val <= 100",
    "-200 <= x <= 200"
  ],
  "two-sum-ii-input-array-is-sorted": [
    "2 <= numbers.length <= 3 * 10^4",
    "-1000 <= numbers[i] <= 1000",
    "numbers 按 非递减顺序 排列",
    "-1000 <= target <= 1000",
    "仅存在一个有效答案"
  ],
  "house-robber-iii": [
    "树的节点数在 [1, 10^4] 范围内",
    "0 <= Node.val <= 10^4"
  ],
  "matchsticks-to-square": [
    "1 <= matchsticks.length <= 15",
    "1 <= matchsticks[i] <= 10^8"
  ],
  "design-circular-queue": [
    "所有的值都在 0 至 1000 的范围内；",
    "操作数将在 1 至 1000 的范围内；",
    "请不要使用内置的队列库。"
  ],
  "valid-anagram": [
    "1 <= s.length, t.length <= 5 * 10^4",
    "s 和 t 仅包含小写字母"
  ],
  "smallest-k-lcci": [
    "0 <= len(arr) <= 100000",
    "0 <= k <= min(100000, len(arr))"
  ],
  "average-selling-price": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "rotate-list": [
    "链表中节点的数目在范围 [0, 500] 内",
    "-100 <= Node.val <= 100",
    "0 <= k <= 2 * 10^9"
  ],
  "find-k-pairs-with-smallest-sums": [
    "1 <= nums1.length, nums2.length <= 10^5",
    "-10^9 <= nums1[i], nums2[i] <= 10^9",
    "nums1 和 nums2 均为 升序排列",
    "1 <= k <= 10^4",
    "k <= nums1.length * nums2.length"
  ],
  "game-play-analysis-iv": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "reverse-substrings-between-each-pair-of-parentheses": [
    "1 <= s.length <= 2000",
    "s 中只有小写英文字母和括号",
    "题目测试用例确保所有括号都是成对出现的"
  ],
  "divide-two-integers": [
    "-2^31 <= dividend, divisor <= 2^31 - 1",
    "divisor != 0"
  ],
  "subsets-ii": [
    "1 <= nums.length <= 10",
    "-10 <= nums[i] <= 10"
  ],
  "greatest-sum-divisible-by-three": [
    "1 <= nums.length <= 4 * 10^4",
    "1 <= nums[i] <= 10^4"
  ],
  "rank-scores": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "remove-duplicate-letters": [
    "1 <= s.length <= 10^4",
    "s 由小写英文字母组成"
  ],
  "game-play-analysis-i": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "customer-who-visited-but-did-not-make-any-transactions": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "best-time-to-buy-and-sell-stock-iv": [
    "1 <= k <= 100",
    "1 <= prices.length <= 1000",
    "0 <= prices[i] <= 1000"
  ],
  "flatten-binary-tree-to-linked-list": [
    "树中结点数在范围 [0, 2000] 内",
    "-100 <= Node.val <= 100"
  ],
  "second-highest-salary": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "kth-smallest-element-in-a-sorted-matrix": [
    "n == matrix.length",
    "n == matrix[i].length",
    "1 <= n <= 300",
    "-10^9 <= matrix[i][j] <= 10^9",
    "题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列",
    "1 <= k <= n^2"
  ],
  "dungeon-game": [
    "m == dungeon.length",
    "n == dungeon[i].length",
    "1 <= m, n <= 200",
    "-1000 <= dungeon[i][j] <= 1000"
  ],
  "range-sum-query-immutable": [
    "1 <= nums.length <= 10^4",
    "-10^5 <= nums[i] <= 10^5",
    "0 <= left <= right < nums.length",
    "最多调用 10^4 次 sumRange 方法"
  ],
  "string-to-integer-atoi": [
    "0 <= s.length <= 200",
    "s 由英文字母（大写和小写）、数字（0-9）、' '、'+'、'-' 和 '.' 组成"
  ],
  "is-subsequence": [
    "0 <= s.length <= 100",
    "0 <= t.length <= 10^4",
    "两个字符串都只由小写字符组成。"
  ],
  "wildcard-matching": [
    "0 <= s.length, p.length <= 2000",
    "s 仅由小写英文字母组成",
    "p 仅由小写英文字母、'?' 或 '*' 组成"
  ],
  "add-digits": [
    "0 <= num <= 2^31 - 1"
  ],
  "first-unique-character-in-a-string": [
    "1 <= s.length <= 10^5",
    "s 只包含小写字母"
  ],
  "contiguous-array": [
    "1 <= nums.length <= 10^5",
    "nums[i] 不是 0 就是 1"
  ],
  "compress-string-lcci": [
    "字符串长度在 [0, 50000] 范围内。"
  ],
  "ransom-note": [
    "1 <= ransomNote.length, magazine.length <= 10^5",
    "ransomNote 和 magazine 由小写英文字母组成"
  ],
  "balanced-binary-tree": [
    "树中的节点数在范围 [0, 5000] 内",
    "-10^4 <= Node.val <= 10^4"
  ],
  "binary-tree-paths": [
    "树中节点的数目在范围 [1, 100] 内",
    "-100 <= Node.val <= 100"
  ],
  "shun-shi-zhen-da-yin-ju-zhen-lcof": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "print-in-order": [
    "尽管输入中的数字似乎暗示了顺序，但是我们并不保证线程在操作系统中的调度顺序。",
    "你看到的输入格式主要是为了确保测试的全面性。"
  ],
  "h-index": [
    "n == citations.length",
    "1 <= n <= 5000",
    "0 <= citations[i] <= 1000"
  ],
  "employee-bonus": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "binary-tree-preorder-traversal": [
    "树中节点数目在范围 [0, 100] 内",
    "-100 <= Node.val <= 100"
  ],
  "powx-n": [
    "-100.0 < x < 100.0",
    "-2^31 <= n <= 2^31-1",
    "n 是一个整数",
    "要么 x 不为零，要么 n > 0。",
    "-10^4 <= x^n <= 10^4"
  ],
  "max-consecutive-ones": [
    "1 <= nums.length <= 10^5",
    "nums[i] 不是 0 就是 1."
  ],
  "minimum-ascii-delete-sum-for-two-strings": [
    "1 <= s1.length, s2.length <= 1000",
    "s1 和 s2 由小写英文字母组成"
  ],
  "single-number-ii": [
    "1 <= nums.length <= 3 * 10^4",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次"
  ],
  "reverse-string": [
    "1 <= s.length <= 10^5",
    "s[i] 都是 ASCII 码表中的可打印字符"
  ],
  "user-activity-for-the-past-30-days-i": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "insert-delete-getrandom-o1": [
    "-2^31 <= val <= 2^31 - 1",
    "最多调用 insert、remove 和 getRandom 函数 2 * 10^5 次",
    "在调用 getRandom 方法时，数据结构中 至少存在一个 元素。"
  ],
  "smallest-even-multiple": [
    "1 <= n <= 150"
  ],
  "longest-repeating-character-replacement": [
    "1 <= s.length <= 10^5",
    "s 仅由大写英文字母组成",
    "0 <= k <= s.length"
  ],
  "path-sum": [
    "树中节点的数目在范围 [0, 5000] 内",
    "-1000 <= Node.val <= 1000",
    "-1000 <= targetSum <= 1000"
  ],
  "24-game": [
    "cards.length == 4",
    "1 <= cards[i] <= 9"
  ],
  "calculator-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "sliding-window-median": [
    "你可以假设 k 始终有效，即：k 始终小于等于输入的非空数组的元素个数。",
    "与真实值误差在 10 ^ -5 以内的答案将被视作正确答案。"
  ],
  "maximum-running-time-of-n-computers": [
    "1 <= n <= batteries.length <= 10^5",
    "1 <= batteries[i] <= 10^9"
  ],
  "contains-duplicate-ii": [
    "1 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
    "0 <= k <= 10^5"
  ],
  "remove-invalid-parentheses": [
    "1 <= s.length <= 25",
    "s 由小写英文字母以及括号 '(' 和 ')' 组成",
    "s 中至多含 20 个括号"
  ],
  "non-overlapping-intervals": [
    "1 <= intervals.length <= 10^5",
    "intervals[i].length == 2",
    "-5 * 10^4 <= start_i < end_i <= 5 * 10^4"
  ],
  "maximum-width-of-binary-tree": [
    "树中节点的数目范围是 [1, 3000]",
    "-100 <= Node.val <= 100"
  ],
  "shortest-path-in-binary-matrix": [
    "n == grid.length",
    "n == grid[i].length",
    "1 <= n <= 100",
    "grid[i][j] 为 0 或 1"
  ],
  "subtract-the-product-and-sum-of-digits-of-an-integer": [
    "1 <= n <= 10^5"
  ],
  "partition-labels": [
    "1 <= s.length <= 500",
    "s 仅由小写英文字母组成"
  ],
  "ones-and-zeroes": [
    "1 <= strs.length <= 600",
    "1 <= strs[i].length <= 100",
    "strs[i] 仅由 '0' 和 '1' 组成",
    "1 <= m, n <= 100"
  ],
  "shan-chu-lian-biao-de-jie-dian-lcof": [
    "题目保证链表中节点的值互不相同",
    "若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点"
  ],
  "shu-zu-zhong-de-ni-xu-dui-lcof": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "sorted-merge-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "implement-stack-using-queues": [
    "1 <= x <= 9",
    "最多调用100 次 push、pop、top 和 empty",
    "每次调用 pop 和 top 都保证栈不为空"
  ],
  "remove-duplicates-from-sorted-list-ii": [
    "链表中节点数目在范围 [0, 300] 内",
    "-100 <= Node.val <= 100",
    "题目数据保证链表已经按升序 排列"
  ],
  "target-sum": [
    "1 <= nums.length <= 20",
    "0 <= nums[i] <= 1000",
    "0 <= sum(nums[i]) <= 1000",
    "-1000 <= target <= 1000"
  ],
  "delete-duplicate-emails": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "ugly-number": [
    "-2^31 <= n <= 2^31 - 1"
  ],
  "odd-even-linked-list": [
    "n == 链表中的节点数",
    "0 <= n <= 10^4",
    "-10^6 <= Node.val <= 10^6"
  ],
  "game-of-life": [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 25",
    "board[i][j] 为 0 或 1"
  ],
  "product-sales-analysis-i": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "root-equals-sum-of-children": [
    "树只包含根结点、左子结点和右子结点",
    "-100 <= Node.val <= 100"
  ],
  "simplify-path": [
    "1 <= path.length <= 3000",
    "path 由英文字母，数字，'.'，'/' 或 '_' 组成。",
    "path 是一个有效的 Unix 风格绝对路径。"
  ],
  "middle-of-the-linked-list": [
    "链表的结点数范围是 [1, 100]",
    "1 <= Node.val <= 100"
  ],
  "longest-duplicate-substring": [
    "2 <= s.length <= 3 * 10^4",
    "s 由小写英文字母组成"
  ],
  "same-tree": [
    "两棵树上的节点数目都在范围 [0, 100] 内",
    "-10^4 <= Node.val <= 10^4"
  ],
  "count-of-smaller-numbers-after-self": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "valid-perfect-square": [
    "1 <= num <= 2^31 - 1"
  ],
  "maximum-xor-of-two-numbers-in-an-array": [
    "1 <= nums.length <= 2 * 10^5",
    "0 <= nums[i] <= 2^31 - 1"
  ],
  "validate-stack-sequences": [
    "1 <= pushed.length <= 1000",
    "0 <= pushed[i] <= 1000",
    "pushed 的所有元素 互不相同",
    "popped.length == pushed.length",
    "popped 是 pushed 的一个排列"
  ],
  "remove-all-adjacent-duplicates-in-string": [
    "1 <= s.length <= 10^5",
    "s 仅由小写英文字母组成。"
  ],
  "serialize-and-deserialize-binary-tree": [
    "树中结点数在范围 [0, 10^4] 内",
    "-1000 <= Node.val <= 1000"
  ],
  "design-circular-deque": [
    "1 <= k <= 1000",
    "0 <= value <= 1000",
    "insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull 调用次数不大于 2000 次"
  ],
  "couples-holding-hands": [
    "2n == row.length",
    "2 <= n <= 30",
    "n 是偶数",
    "0 <= row[i] < 2n",
    "row 中所有元素均 无重复"
  ],
  "sudoku-solver": [
    "board.length == 9",
    "board[i].length == 9",
    "board[i][j] 是一位数字或者 '.'",
    "题目数据 保证 输入数独仅有一个解"
  ],
  "evaluate-reverse-polish-notation": [
    "1 <= tokens.length <= 10^4",
    "tokens[i] 是一个算符（\"+\"、\"-\"、\"*\" 或 \"/\"），或是在范围 [-200, 200] 内的一个整数"
  ],
  "largest-divisible-subset": [
    "1 <= nums.length <= 1000",
    "1 <= nums[i] <= 2 * 10^9",
    "nums 中的所有整数 互不相同"
  ],
  "delete-node-in-a-bst": [
    "节点数的范围 [0, 10^4].",
    "-10^5 <= Node.val <= 10^5",
    "节点值唯一",
    "root 是合法的二叉搜索树",
    "-10^5 <= key <= 10^5"
  ],
  "backspace-string-compare": [
    "1 <= s.length, t.length <= 200",
    "s 和 t 只含有小写字母以及字符 '#'"
  ],
  "ZL6zAn": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 50",
    "grid[i][j] is either 0 or 1"
  ],
  "get-biggest-three-rhombus-sums-in-a-grid": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 100",
    "1 <= grid[i][j] <= 10^5"
  ],
  "triangle-judgement": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "car-pooling": [
    "1 <= trips.length <= 1000",
    "trips[i].length == 3",
    "1 <= numPassengers_i <= 100",
    "0 <= from_i < to_i <= 1000",
    "1 <= capacity <= 10^5"
  ],
  "maximum-points-you-can-obtain-from-cards": [
    "1 <= cardPoints.length <= 10^5",
    "1 <= cardPoints[i] <= 10^4",
    "1 <= k <= cardPoints.length"
  ],
  "maximum-erasure-value": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^4"
  ],
  "tweet-counts-per-frequency": [
    "0 <= time, startTime, endTime <= 10^9",
    "0 <= endTime - startTime <= 10^4",
    "recordTweet 和 getTweetCountsPerFrequency，最多有 10^4 次操作。"
  ],
  "longest-balanced-subarray-ii": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^5"
  ],
  "distinct-subsequences": [
    "1 <= s.length, t.length <= 1000",
    "s 和 t 由英文字母组成"
  ],
  "lowest-common-ancestor-of-a-binary-search-tree": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "ipo": [
    "1 <= k <= 10^5",
    "0 <= w <= 10^9",
    "n == profits.length",
    "n == capital.length",
    "1 <= n <= 10^5",
    "0 <= profits[i] <= 10^4",
    "0 <= capital[i] <= 10^9"
  ],
  "number-of-good-pairs": [
    "1 <= nums.length <= 100",
    "1 <= nums[i] <= 100"
  ],
  "maximum-sum-of-almost-unique-subarray": [
    "1 <= nums.length <= 2 * 10^4",
    "1 <= m <= k <= nums.length",
    "1 <= nums[i] <= 10^9"
  ],
  "minimum-number-of-seconds-to-make-mountain-height-zero": [
    "1 <= mountainHeight <= 10^5",
    "1 <= workerTimes.length <= 10^4",
    "1 <= workerTimes[i] <= 10^6"
  ],
  "word-ladder": [
    "1 <= beginWord.length <= 10",
    "endWord.length == beginWord.length",
    "1 <= wordList.length <= 5000",
    "wordList[i].length == beginWord.length",
    "beginWord、endWord 和 wordList[i] 由小写英文字母组成",
    "beginWord != endWord",
    "wordList 中的所有字符串 互不相同"
  ],
  "customers-who-never-order": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "peak-index-in-a-mountain-array": [
    "3 <= arr.length <= 10^5",
    "0 <= arr[i] <= 10^6",
    "题目数据 保证 arr 是一个山脉数组"
  ],
  "event-emitter": [
    "1 <= actions.length <= 10",
    "values.length === actions.length",
    "所有测试用例都是有效的。例如，你不需要处理取消一个不存在的订阅的情况。",
    "只有 4 种不同的操作：EventEmitter、emit、subscribe 和 unsubscribe。 EventEmitter 操作没有参数。",
    "emit 操作接收 1 或 2 个参数。第一个参数是要触发的事件名，第二个参数传递给回调函数。",
    "subscribe 操作接收 2 个参数，第一个是事件名，第二个是回调函数。",
    "unsubscribe 操作接收一个参数，即之前进行订阅的顺序（从 0 开始）。"
  ],
  "permutation-sequence": [
    "1 <= n <= 9",
    "1 <= k <= n!"
  ],
  "text-justification": [
    "1 <= words.length <= 300",
    "1 <= words[i].length <= 20",
    "words[i] 由小写英文字母和符号组成",
    "1 <= maxWidth <= 100",
    "words[i].length <= maxWidth"
  ],
  "contains-duplicate": [
    "1 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "add-two-numbers-ii": [
    "链表的长度范围为 [1, 100]",
    "0 <= node.val <= 9",
    "输入数据保证链表代表的数字无前导 0"
  ],
  "can-place-flowers": [
    "1 <= flowerbed.length <= 2 * 10^4",
    "flowerbed[i] 为 0 或 1",
    "flowerbed 中不存在相邻的两朵花",
    "0 <= n <= flowerbed.length"
  ],
  "unique-binary-search-trees-ii": [
    "1 <= n <= 8"
  ],
  "duplicate-emails": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "implement-queue-using-stacks": [
    "1 <= x <= 9",
    "最多调用 100 次 push、pop、peek 和 empty",
    "假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）"
  ],
  "article-views-i": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "path-sum-ii": [
    "树中节点总数在范围 [0, 5000] 内",
    "-1000 <= Node.val <= 1000",
    "-1000 <= targetSum <= 1000"
  ],
  "triangle": [
    "1 <= triangle.length <= 200",
    "triangle[0].length == 1",
    "triangle[i].length == triangle[i - 1].length + 1",
    "-10^4 <= triangle[i][j] <= 10^4"
  ],
  "task-scheduler": [
    "1 <= tasks.length <= 10^4",
    "tasks[i] 是大写英文字母",
    "0 <= n <= 100"
  ],
  "count-collisions-on-a-road": [
    "1 <= directions.length <= 10^5",
    "directions[i] 的值为 'L'、'R' 或 'S'"
  ],
  "sum-root-to-leaf-numbers": [
    "树中节点的数目在范围 [1, 1000] 内",
    "0 <= Node.val <= 9",
    "树的深度不超过 10"
  ],
  "course-schedule-ii": [
    "1 <= numCourses <= 2000",
    "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
    "prerequisites[i].length == 2",
    "0 <= a_i, b_i < numCourses",
    "a_i != b_i",
    "所有[a_i, b_i] 互不相同"
  ],
  "nth-digit": [
    "1 <= n <= 2^31 - 1"
  ],
  "maximize-spanning-tree-stability-with-upgrades": [
    "2 <= n <= 10^5",
    "1 <= edges.length <= 10^5",
    "edges[i] = [u_i, v_i, s_i, must_i]",
    "0 <= u_i, v_i < n",
    "u_i != v_i",
    "1 <= s_i <= 10^5",
    "must_i 是 0 或 1。",
    "0 <= k <= n",
    "没有重复的边。"
  ],
  "length-of-last-word": [
    "1 <= s.length <= 10^4",
    "s 仅有英文字母和空格 ' ' 组成",
    "s 中至少存在一个单词"
  ],
  "coin-change-ii": [
    "1 <= coins.length <= 300",
    "1 <= coins[i] <= 5000",
    "coins 中的所有值 互不相同",
    "0 <= amount <= 5000"
  ],
  "burst-balloons": [
    "n == nums.length",
    "1 <= n <= 300",
    "0 <= nums[i] <= 100"
  ],
  "trapping-rain-water-ii": [
    "m == heightMap.length",
    "n == heightMap[i].length",
    "1 <= m, n <= 200",
    "0 <= heightMap[i][j] <= 2 * 10^4"
  ],
  "validate-ip-address": [
    "queryIP 仅由英文字母，数字，字符 '.' 和 ':' 组成。"
  ],
  "diagonal-traverse": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= m, n <= 10^4",
    "1 <= m * n <= 10^4",
    "-10^5 <= mat[i][j] <= 10^5"
  ],
  "kth-smallest-element-in-a-bst": [
    "树中的节点数为 n。",
    "1 <= k <= n <= 10^4",
    "0 <= Node.val <= 10^4"
  ],
  "basic-calculator-ii": [
    "1 <= s.length <= 3 * 10^5",
    "s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开",
    "s 表示一个 有效表达式",
    "表达式中的所有整数都是非负整数，且在范围 [0, 2^31 - 1] 内",
    "题目数据保证答案是一个 32-bit 整数"
  ],
  "image-overlap": [
    "n == img1.length == img1[i].length",
    "n == img2.length == img2[i].length",
    "1 <= n <= 30",
    "img1[i][j] 为 0 或 1",
    "img2[i][j] 为 0 或 1"
  ],
  "integer-to-english-words": [
    "0 <= num <= 2^31 - 1"
  ],
  "baseball-game": [
    "1 <= ops.length <= 1000",
    "ops[i] 为 \"C\"、\"D\"、\"+\"，或者一个表示整数的字符串。整数范围是 [-3 * 10^4, 3 * 10^4]",
    "对于 \"+\" 操作，题目数据保证记录此操作时前面总是存在两个有效的分数",
    "对于 \"C\" 和 \"D\" 操作，题目数据保证记录此操作时前面总是存在一个有效的分数"
  ],
  "advantage-shuffle": [
    "1 <= nums1.length <= 10^5",
    "nums2.length == nums1.length",
    "0 <= nums1[i], nums2[i] <= 10^9"
  ],
  "maximum-sum-bst-in-binary-tree": [
    "每棵树有 1 到 40000 个节点。",
    "每个节点的键值在 [-4 * 10^4 , 4 * 10^4] 之间。"
  ],
  "find-two-non-overlapping-sub-arrays-each-with-target-sum": [
    "1 <= arr.length <= 10^5",
    "1 <= arr[i] <= 1000",
    "1 <= target <= 10^8"
  ],
  "max-submatrix-lcci": [
    "1 <= matrix.length, matrix[0].length <= 200"
  ],
  "repeated-dna-sequences": [
    "0 <= s.length <= 10^5",
    "s[i]=='A'、'C'、'G' or 'T'"
  ],
  "word-frequency": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "meeting-rooms-ii": [
    "1 <= intervals.length <= 10^4",
    "0 <= start_i < end_i <= 10^6"
  ],
  "trips-and-users": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "split-array-largest-sum": [
    "1 <= nums.length <= 1000",
    "0 <= nums[i] <= 10^6",
    "1 <= k <= min(50, nums.length)"
  ],
  "find-all-duplicates-in-an-array": [
    "n == nums.length",
    "1 <= n <= 10^5",
    "1 <= nums[i] <= n",
    "nums 中的每个元素出现 一次 或 两次"
  ],
  "random-pick-with-weight": [
    "1 <= w.length <= 10^4",
    "1 <= w[i] <= 10^5",
    "pickIndex 将被调用不超过 10^4 次"
  ],
  "next-greater-element-iii": [
    "1 <= n <= 2^31 - 1"
  ],
  "binary-gap": [
    "1 <= n <= 10^9"
  ],
  "minimum-cost-for-tickets": [
    "1 <= days.length <= 365",
    "1 <= days[i] <= 365",
    "days 按顺序严格递增",
    "costs.length == 3",
    "1 <= costs[i] <= 1000"
  ],
  "minimum-absolute-difference": [
    "2 <= arr.length <= 10^5",
    "-10^6 <= arr[i] <= 10^6"
  ],
  "matrix-block-sum": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= m, n, k <= 100",
    "1 <= mat[i][j] <= 100"
  ],
  "count-number-of-trapezoids-i": [
    "4 <= points.length <= 10^5",
    "–10^8 <= x_i, y_i <= 10^8",
    "所有点两两不同。"
  ],
  "valid-number": [
    "1 <= s.length <= 20",
    "s 仅含英文字母（大写和小写），数字（0-9），加号 '+'，减号 '-'，或者点 '.'。"
  ],
  "word-break-ii": [
    "1 <= s.length <= 20",
    "1 <= wordDict.length <= 1000",
    "1 <= wordDict[i].length <= 10",
    "s 和 wordDict[i] 仅有小写英文字母组成",
    "wordDict 中所有字符串都 不同"
  ],
  "flatten-nested-list-iterator": [
    "1 <= nestedList.length <= 500",
    "嵌套列表中的整数值在范围 [-10^6, 10^6] 内"
  ],
  "average-of-levels-in-binary-tree": [
    "树中节点数量在 [1, 10^4] 范围内",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  "maximum-average-subarray-i": [
    "n == nums.length",
    "1 <= k <= n <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "domino-and-tromino-tiling": [
    "1 <= n <= 1000"
  ],
  "koko-eating-bananas": [
    "1 <= piles.length <= 10^4",
    "piles.length <= h <= 10^9",
    "1 <= piles[i] <= 10^9"
  ],
  "count-negative-numbers-in-a-sorted-matrix": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 100",
    "-100 <= grid[i][j] <= 100"
  ],
  "replace-employee-id-with-the-unique-identifier": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "hanota-lcci": [
    "A 中盘子的数目不大于 14 个。"
  ],
  "isomorphic-strings": [
    "1 <= s.length <= 5 * 10^4",
    "t.length == s.length",
    "s 和 t 由任意有效的 ASCII 字符组成"
  ],
  "russian-doll-envelopes": [
    "1 <= envelopes.length <= 10^5",
    "envelopes[i].length == 2",
    "1 <= w_i, h_i <= 10^5"
  ],
  "kids-with-the-greatest-number-of-candies": [
    "n == candies.length",
    "2 <= n <= 100",
    "1 <= candies[i] <= 100",
    "1 <= extraCandies <= 50"
  ],
  "count-good-triplets": [
    "3 <= arr.length <= 100",
    "0 <= arr[i] <= 1000",
    "0 <= a, b, c <= 1000"
  ],
  "the-number-of-employees-which-report-to-each-employee": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "sum-lists-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "word-pattern": [
    "1 <= pattern.length <= 300",
    "pattern 只包含小写英文字母",
    "1 <= s.length <= 3000",
    "s 只包含小写英文字母和 ' '",
    "s 不包含 任何前导或尾随对空格",
    "s 中每个单词都被 单个空格 分隔"
  ],
  "longest-palindrome": [
    "1 <= s.length <= 2000",
    "s 只由小写 和/或 大写英文字母组成"
  ],
  "sum-of-left-leaves": [
    "节点数在 [1, 1000] 范围内",
    "-1000 <= Node.val <= 1000"
  ],
  "customer-placing-the-largest-number-of-orders": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "uncrossed-lines": [
    "1 <= nums1.length, nums2.length <= 500",
    "1 <= nums1[i], nums2[j] <= 2000"
  ],
  "maximum-number-of-vowels-in-a-substring-of-given-length": [
    "1 <= s.length <= 10^5",
    "s 由小写英文字母组成",
    "1 <= k <= s.length"
  ],
  "interleaving-string": [
    "0 <= s1.length, s2.length <= 100",
    "0 <= s3.length <= 200",
    "s1、s2、和 s3 都由小写英文字母组成"
  ],
  "best-time-to-buy-and-sell-stock-with-transaction-fee": [
    "1 <= prices.length <= 5 * 10^4",
    "1 <= prices[i] < 5 * 10^4",
    "0 <= fee < 5 * 10^4"
  ],
  "super-egg-drop": [
    "1 <= k <= 100",
    "1 <= n <= 10^4"
  ],
  "find-minimum-in-rotated-sorted-array": [
    "n == nums.length",
    "1 <= n <= 5000",
    "-5000 <= nums[i] <= 5000",
    "nums 中的所有整数 互不相同",
    "nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转"
  ],
  "beautiful-arrangement-ii": [
    "1 <= k < n <= 10^4"
  ],
  "surrounded-regions": [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 200",
    "board[i][j] 为 'X' 或 'O'"
  ],
  "max-sum-of-rectangle-no-larger-than-k": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 100",
    "-100 <= matrix[i][j] <= 100",
    "-10^5 <= k <= 10^5"
  ],
  "new-21-game": [
    "0 <= k <= n <= 10^4",
    "1 <= maxPts <= 10^4"
  ],
  "continuous-subarray-sum": [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= 10^9",
    "0 <= sum(nums[i]) <= 2^31 - 1",
    "1 <= k <= 2^31 - 1"
  ],
  "find-k-th-smallest-pair-distance": [
    "n == nums.length",
    "2 <= n <= 10^4",
    "0 <= nums[i] <= 10^6",
    "1 <= k <= n * (n - 1) / 2"
  ],
  "minimize-maximum-pair-sum-in-array": [
    "n == nums.length",
    "2 <= n <= 10^5",
    "n 是 偶数。",
    "1 <= nums[i] <= 10^5"
  ],
  "the-skyline-problem": [
    "1 <= buildings.length <= 10^4",
    "0 <= left_i < right_i <= 2^31 - 1",
    "1 <= height_i <= 2^31 - 1",
    "buildings 按 left_i 非递减排序"
  ],
  "product-price-at-a-given-date": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= m, n <= 300",
    "0 <= mat[i][j] <= 10^4",
    "0 <= threshold <= 10^5"
  ],
  "egg-drop-with-2-eggs-and-n-floors": [
    "1 <= n <= 1000"
  ],
  "count-submatrices-with-top-left-element-and-sum-less-than-k": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= n, m <= 1000",
    "0 <= grid[i][j] <= 1000",
    "1 <= k <= 10^9"
  ],
  "tenth-line": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "nim-game": [
    "1 <= n <= 2^31 - 1"
  ],
  "132-pattern": [
    "n == nums.length",
    "1 <= n <= 2 * 10^5",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "trim-a-binary-search-tree": [
    "树中节点数在范围 [1, 10^4] 内",
    "0 <= Node.val <= 10^4",
    "树中每个节点的值都是 唯一 的",
    "题目数据保证输入是一棵有效的二叉搜索树",
    "0 <= low <= high <= 10^4"
  ],
  "maximum-swap": [
    "给定数字的范围是 [0, 10^8]"
  ],
  "max-stack": [
    "-10^7 <= x <= 10^7",
    "最多调用 10^4 次 push、pop、top、peekMax 和 popMax",
    "调用 pop、top、peekMax 或 popMax 时，栈中 至少存在一个元素"
  ],
  "bus-routes": [
    "1 <= routes.length <= 500.",
    "1 <= routes[i].length <= 10^5",
    "routes[i] 中的所有值 互不相同",
    "sum(routes[i].length) <= 10^5",
    "0 <= routes[i][j] < 10^6",
    "0 <= source, target < 10^6"
  ],
  "longest-mountain-in-array": [
    "1 <= arr.length <= 10^4",
    "0 <= arr[i] <= 10^4"
  ],
  "leaf-similar-trees": [
    "给定的两棵树结点数在 [1, 200] 范围内",
    "给定的两棵树上的值在 [0, 200] 范围内"
  ],
  "video-stitching": [
    "1 <= clips.length <= 100",
    "0 <= start_i <= end_i <= 100",
    "1 <= time <= 100"
  ],
  "maximum-number-of-events-that-can-be-attended": [
    "1 <= events.length <= 10^5",
    "events[i].length == 2",
    "1 <= startDay_i <= endDay_i <= 10^5"
  ],
  "minimum-changes-to-make-alternating-binary-string": [
    "1 <= s.length <= 10^4",
    "s[i] 是 '0' 或 '1'"
  ],
  "minimum-number-of-swaps-to-make-the-string-balanced": [
    "n == s.length",
    "2 <= n <= 10^6",
    "n 为偶数",
    "s[i] 为'[' 或 ']'",
    "开括号 '[' 的数目为 n / 2，闭括号 ']' 的数目也是 n / 2"
  ],
  "maximum-alternating-subarray-sum": [
    "1 <= nums.length <= 10^5",
    "-10^5 <= nums[i] <= 10^5"
  ],
  "number-of-unique-subjects-taught-by-each-teacher": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "count-the-number-of-good-subsequences": [
    "1 <= s.length <= 10^4",
    "s 仅由小写英文字母组成"
  ],
  "scramble-string": [
    "s1.length == s2.length",
    "1 <= s1.length <= 30",
    "s1 和 s2 由小写英文字母组成"
  ],
  "shortest-palindrome": [
    "0 <= s.length <= 5 * 10^4",
    "s 仅由小写英文字母组成"
  ],
  "ugly-number-ii": [
    "1 <= n <= 1690"
  ],
  "intersection-of-two-arrays-ii": [
    "1 <= nums1.length, nums2.length <= 1000",
    "0 <= nums1[i], nums2[i] <= 1000"
  ],
  "lfu-cache": [
    "1 <= capacity <= 10^4",
    "0 <= key <= 10^5",
    "0 <= value <= 10^9",
    "最多调用 2 * 10^5 次 get 和 put 方法"
  ],
  "single-element-in-a-sorted-array": [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= 10^5"
  ],
  "number-of-provinces": [
    "1 <= n <= 200",
    "n == isConnected.length",
    "n == isConnected[i].length",
    "isConnected[i][j] 为 1 或 0",
    "isConnected[i][i] == 1",
    "isConnected[i][j] == isConnected[j][i]"
  ],
  "human-traffic-of-stadium": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "sales-person": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "to-lower-case": [
    "1 <= s.length <= 100",
    "s 由 ASCII 字符集中的可打印字符组成"
  ],
  "sliding-puzzle": [
    "board.length == 2",
    "board[i].length == 3",
    "0 <= board[i][j] <= 5",
    "board[i][j] 中每个值都 不同"
  ],
  "3sum-with-multiplicity": [
    "3 <= arr.length <= 3000",
    "0 <= arr[i] <= 100",
    "0 <= target <= 300"
  ],
  "find-common-characters": [
    "1 <= words.length <= 100",
    "1 <= words[i].length <= 100",
    "words[i] 由小写英文字母组成"
  ],
  "delete-nodes-and-return-forest": [
    "树中的节点数最大为 1000。",
    "每个节点都有一个介于 1 到 1000 之间的值，且各不相同。",
    "to_delete.length <= 1000",
    "to_delete 包含一些从 1 到 1000、各不相同的值。"
  ],
  "design-a-stack-with-increment-operation": [
    "1 <= maxSize, x, k <= 1000",
    "0 <= val <= 100",
    "每种方法 increment，push 以及 pop 分别最多调用 1000 次"
  ],
  "count-sub-islands": [
    "m == grid1.length == grid2.length",
    "n == grid1[i].length == grid2[i].length",
    "1 <= m, n <= 500",
    "grid1[i][j] 和 grid2[i][j] 都要么是 0 要么是 1。"
  ],
  "all-ancestors-of-a-node-in-a-directed-acyclic-graph": [
    "1 <= n <= 1000",
    "0 <= edges.length <= min(2000, n * (n - 1) / 2)",
    "edges[i].length == 2",
    "0 <= from_i, to_i <= n - 1",
    "from_i != to_i",
    "图中不会有重边。",
    "图是 有向 且 无环 的。"
  ],
  "count-the-number-of-fair-pairs": [
    "1 <= nums.length <= 10^5",
    "nums.length == n",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= lower <= upper <= 10^9"
  ],
  "maximum-product-of-first-and-last-elements-of-a-subsequence": [
    "1 <= nums.length <= 10^5",
    "-10^5 <= nums[i] <= 10^5",
    "1 <= m <= nums.length"
  ],
  "minimum-discards-to-balance-inventory": [
    "1 <= arrivals.length <= 10^5",
    "1 <= arrivals[i] <= 10^5",
    "1 <= w <= arrivals.length",
    "1 <= m <= w"
  ],
  "nge-tou-zi-de-dian-shu-lcof": [
    "1 <= num <= 11"
  ],
  "palindrome-permutation-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "different-ways-to-add-parentheses": [
    "1 <= expression.length <= 20",
    "expression 由数字和算符 '+'、'-' 和 '*' 组成。",
    "输入表达式中的所有整数值在范围 [0, 99]",
    "输入表达式中的所有整数都没有前导 '-' 或 '+' 表示符号。"
  ],
  "range-sum-query-2d-immutable": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1",
    "-10^5 <= matrix[i][j] <= 10^5",
    "0 <= row1 <= row2 < m",
    "0 <= col1 <= col2 < n",
    "最多调用 10^4 次 sumRegion 方法"
  ],
  "water-and-jug-problem": [
    "1 <= x, y, target <= 10^3"
  ],
  "heaters": [
    "1 <= houses.length, heaters.length <= 3 * 10^4",
    "1 <= houses[i], heaters[i] <= 10^9"
  ],
  "non-decreasing-subsequences": [
    "1 <= nums.length <= 15",
    "-100 <= nums[i] <= 100"
  ],
  "exchange-seats": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "robot-return-to-origin": [
    "1 <= moves.length <= 2 * 10^4",
    "moves 只包含字符 'U', 'D', 'L' 和 'R'"
  ],
  "valid-parenthesis-string": [
    "1 <= s.length <= 100",
    "s[i] 为 '('、')' 或 '*'"
  ],
  "count-binary-substrings": [
    "1 <= s.length <= 10^5",
    "s[i] 为 '0' 或 '1'"
  ],
  "number-of-recent-calls": [
    "1 <= t <= 10^9",
    "保证每次对 ping 调用所使用的 t 值都 严格递增",
    "至多调用 ping 方法 10^4 次"
  ],
  "subarray-sums-divisible-by-k": [
    "1 <= nums.length <= 3 * 10^4",
    "-10^4 <= nums[i] <= 10^4",
    "2 <= k <= 10^4"
  ],
  "how-many-numbers-are-smaller-than-the-current-number": [
    "2 <= nums.length <= 500",
    "0 <= nums[i] <= 100"
  ],
  "count-odd-numbers-in-an-interval-range": [
    "0 <= low <= high <= 10^9"
  ],
  "count-salary-categories": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "range-frequency-queries": [
    "1 <= arr.length <= 10^5",
    "1 <= arr[i], value <= 10^4",
    "0 <= left <= right < arr.length",
    "调用 query 不超过 10^5 次。"
  ],
  "maximum-subarray-sum-with-length-divisible-by-k": [
    "1 <= k <= nums.length <= 2 * 10^5",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "best-time-to-buy-and-sell-stock-v": [
    "2 <= prices.length <= 10^3",
    "1 <= prices[i] <= 10^9",
    "1 <= k <= prices.length / 2"
  ],
  "is-unique-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "binary-tree-level-order-traversal-ii": [
    "树中节点数目在范围 [0, 2000] 内",
    "-1000 <= Node.val <= 1000"
  ],
  "number-of-digit-one": [
    "0 <= n <= 10^9"
  ],
  "reverse-vowels-of-a-string": [
    "1 <= s.length <= 3 * 10^5",
    "s 由 可打印的 ASCII 字符组成"
  ],
  "reverse-string-ii": [
    "1 <= s.length <= 10^4",
    "s 仅由小写英文组成",
    "1 <= k <= 10^4"
  ],
  "not-boring-movies": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "minimum-falling-path-sum": [
    "n == matrix.length == matrix[i].length",
    "1 <= n <= 100",
    "-100 <= matrix[i][j] <= 100"
  ],
  "distinct-subsequences-ii": [
    "1 <= s.length <= 2000",
    "s 仅由小写英文字母组成"
  ],
  "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold": [
    "1 <= arr.length <= 10^5",
    "1 <= arr[i] <= 10^4",
    "1 <= k <= arr.length",
    "0 <= threshold <= 10^4"
  ],
  "populating-next-right-pointers-in-each-node": [
    "树中节点的数量在 [0, 2^12 - 1] 范围内",
    "-1000 <= node.val <= 1000"
  ],
  "insertion-sort-list": [
    "列表中的节点数在 [1, 5000]范围内",
    "-5000 <= Node.val <= 5000"
  ],
  "count-primes": [
    "0 <= n <= 5 * 10^6"
  ],
  "word-search-ii": [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 12",
    "board[i][j] 是一个小写英文字母",
    "1 <= words.length <= 3 * 10^4",
    "1 <= words[i].length <= 10",
    "words[i] 由小写英文字母组成",
    "words 中的所有字符串互不相同"
  ],
  "implement-rand10-using-rand7": [
    "1 <= n <= 10^5"
  ],
  "find-largest-value-in-each-tree-row": [
    "二叉树的节点个数的范围是 [0,10^4]",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  "maximum-binary-tree": [
    "1 <= nums.length <= 1000",
    "0 <= nums[i] <= 1000",
    "nums 中的所有整数 互不相同"
  ],
  "maximum-sum-circular-subarray": [
    "n == nums.length",
    "1 <= n <= 3 * 10^4",
    "-3 * 10^4 <= nums[i] <= 3 * 10^4​​​​​​​"
  ],
  "immediate-food-delivery-ii": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "minimum-operations-to-reduce-x-to-zero": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^4",
    "1 <= x <= 10^9"
  ],
  "confirmation-rate": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "shortest-and-lexicographically-smallest-beautiful-string": [
    "1 <= s.length <= 100",
    "1 <= k <= s.length"
  ],
  "divide-an-array-into-subarrays-with-minimum-cost-ii": [
    "3 <= n <= 10^5",
    "1 <= nums[i] <= 10^9",
    "3 <= k <= n",
    "k - 2 <= dist <= n - 2"
  ],
  "evaluate-division": [
    "1 <= equations.length <= 20",
    "equations[i].length == 2",
    "1 <= A_i.length, B_i.length <= 5",
    "values.length == equations.length",
    "0.0 < values[i] <= 20.0",
    "1 <= queries.length <= 20",
    "queries[i].length == 2",
    "1 <= C_j.length, D_j.length <= 5",
    "A_i, B_i, C_j, D_j 由小写英文字母与数字组成"
  ],
  "delete-operation-for-two-strings": [
    "1 <= word1.length, word2.length <= 500",
    "word1 和 word2 只包含小写英文字母"
  ],
  "exclusive-time-of-functions": [
    "1 <= n <= 100",
    "2 <= logs.length <= 500",
    "0 <= function_id < n",
    "0 <= timestamp <= 10^9",
    "两个开始事件不会在同一时间戳发生",
    "两个结束事件不会在同一时间戳发生",
    "每道函数都有一个对应 \"start\" 日志的 \"end\" 日志"
  ],
  "asteroid-collision": [
    "2 <= asteroids.length <= 10^4",
    "-1000 <= asteroids[i] <= 1000",
    "asteroids[i] != 0"
  ],
  "transpose-matrix": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 1000",
    "1 <= m * n <= 10^5",
    "-10^9 <= matrix[i][j] <= 10^9"
  ],
  "boats-to-save-people": [
    "1 <= people.length <= 5 * 10^4",
    "1 <= people[i] <= limit <= 3 * 10^4"
  ],
  "n-ary-tree-level-order-traversal": [
    "树的高度不会超过 1000",
    "树的节点总数在 [0, 10^4] 之间"
  ],
  "maximum-profit-from-trading-stocks-with-discounts": [
    "1 <= n <= 160",
    "present.length, future.length == n",
    "1 <= present[i], future[i] <= 50",
    "hierarchy.length == n - 1",
    "hierarchy[i] == [u_i, v_i]",
    "1 <= u_i, v_i <= n",
    "u_i != v_i",
    "1 <= budget <= 160",
    "没有重复的边。",
    "员工 1 是所有员工的直接或间接上司。",
    "输入的图 hierarchy 保证 无环。"
  ],
  "minimum-depth-of-binary-tree": [
    "树中节点数的范围在 [0, 10^5] 内",
    "-1000 <= Node.val <= 1000"
  ],
  "counting-bits": [
    "0 <= n <= 10^5"
  ],
  "next-greater-element-ii": [
    "1 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "keys-and-rooms": [
    "n == rooms.length",
    "2 <= n <= 1000",
    "0 <= rooms[i].length <= 1000",
    "1 <= sum(rooms[i].length) <= 3000",
    "0 <= rooms[i][j] < n",
    "所有 rooms[i] 的值 互不相同"
  ],
  "combination-sum-ii": [
    "1 <= candidates.length <= 100",
    "1 <= candidates[i] <= 50",
    "1 <= target <= 30"
  ],
  "summary-ranges": [
    "0 <= nums.length <= 20",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "nums 中的所有值都 互不相同",
    "nums 按升序排列"
  ],
  "insert-interval": [
    "0 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^5",
    "intervals 根据 start_i 按 升序 排列",
    "newInterval.length == 2",
    "0 <= start <= end <= 10^5"
  ],
  "count-complete-tree-nodes": [
    "树中节点的数目范围是[0, 5 * 10^4]",
    "0 <= Node.val <= 5 * 10^4",
    "题目数据保证输入的树是 完全二叉树"
  ],
  "string-compression": [
    "1 <= chars.length <= 2000",
    "chars[i] 可以是小写英文字母、大写英文字母、数字或符号"
  ],
  "design-hashset": [
    "0 <= key <= 10^6",
    "最多调用 10^4 次 add、remove 和 contains"
  ],
  "minimum-moves-to-move-a-box-to-their-target-location": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 20",
    "grid 仅包含字符 '.', '#', 'S' , 'T', 以及 'B'。",
    "grid 中 'S', 'B' 和 'T' 各只能出现一个。"
  ],
  "cinema-seat-allocation": [
    "1 <= n <= 10^9",
    "1 <= reservedSeats.length <= min(10*n, 10^4)",
    "reservedSeats[i].length == 2",
    "1 <= reservedSeats[i][0] <= n",
    "1 <= reservedSeats[i][1] <= 10",
    "所有 reservedSeats[i] 都是互不相同的。"
  ],
  "median-of-a-row-wise-sorted-matrix": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 500",
    "m 和 n 都是奇数。",
    "1 <= grid[i][j] <= 10^6",
    "grid[i] 按非递减顺序排序"
  ],
  "find-the-maximum-number-of-fruits-collected": [
    "2 <= n == fruits.length == fruits[i].length <= 1000",
    "0 <= fruits[i][j] <= 1000"
  ],
  "unique-binary-search-trees": [
    "1 <= n <= 19"
  ],
  "minimum-cost-to-convert-string-ii": [
    "1 <= source.length == target.length <= 1000",
    "source、target 均由小写英文字母组成",
    "1 <= cost.length == original.length == changed.length <= 100",
    "1 <= original[i].length == changed[i].length <= source.length",
    "original[i]、changed[i] 均由小写英文字母组成",
    "original[i] != changed[i]",
    "1 <= cost[i] <= 10^6"
  ],
  "minimum-operations-to-make-median-of-array-equal-to-k": [
    "1 <= nums.length <= 2 * 10^5",
    "1 <= nums[i] <= 10^9",
    "1 <= k <= 10^9"
  ],
  "count-mentions-per-user": [
    "1 <= numberOfUsers <= 100",
    "1 <= events.length <= 100",
    "events[i].length == 3",
    "events[i][0] 的值为 MESSAGE 或 OFFLINE。",
    "1 <= int(events[i][1]) <= 10^5",
    "在任意 \"MESSAGE\" 事件中，以 id 形式提及的用户数目介于 1 和 100 之间。",
    "0 <= numberOfUsers - 1",
    "题目保证 OFFLINE 引用的用户 id 在事件发生时处于 在线 状态。"
  ],
  "count-number-of-trapezoids-ii": [
    "4 <= points.length <= 500",
    "–1000 <= x_i, y_i <= 1000",
    "所有点两两不同。"
  ],
  "permutation-in-string": [
    "1 <= s1.length, s2.length <= 10^4",
    "s1 和 s2 仅包含小写字母"
  ],
  "sparse-matrix-multiplication": [
    "m == mat1.length",
    "k == mat1[i].length == mat2.length",
    "n == mat2[i].length",
    "1 <= m, n, k <= 100",
    "-100 <= mat1[i][j], mat2[i][j] <= 100"
  ],
  "gcd-sort-of-an-array": [
    "1 <= nums.length <= 3 * 10^4",
    "2 <= nums[i] <= 10^5"
  ],
  "reward-top-k-students": [
    "1 <= positive_feedback.length, negative_feedback.length <= 10^4",
    "1 <= positive_feedback[i].length, negative_feedback[j].length <= 100",
    "positive_feedback[i] 和 negative_feedback[j] 都只包含小写英文字母。",
    "positive_feedback 和 negative_feedback 中不会有相同单词。",
    "n == report.length == student_id.length",
    "1 <= n <= 10^4",
    "report[i] 只包含小写英文字母和空格 ' '。",
    "report[i] 中连续单词之间有单个空格隔开。",
    "1 <= report[i].length <= 100",
    "1 <= student_id[i] <= 10^9",
    "student_id[i] 的值 互不相同。",
    "1 <= k <= n"
  ],
  "find-all-possible-stable-binary-arrays-i": [
    "1 <= zero, one, limit <= 200"
  ],
  "find-all-possible-stable-binary-arrays-ii": [
    "1 <= zero, one, limit <= 1000"
  ],
  "make-array-elements-equal-to-zero": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 100",
    "至少存在一个元素 i 满足 nums[i] == 0。"
  ],
  "construct-binary-tree-from-inorder-and-postorder-traversal": [
    "1 <= inorder.length <= 3000",
    "postorder.length == inorder.length",
    "-3000 <= inorder[i], postorder[i] <= 3000",
    "inorder 和 postorder 都由 不同 的值组成",
    "postorder 中每一个值都在 inorder 中",
    "inorder 保证是树的中序遍历",
    "postorder 保证是树的后序遍历"
  ],
  "special-binary-string": [
    "1 <= s.length <= 50",
    "s[i] 为 '0' 或 '1'。",
    "s 是一个特殊的二进制字符串。"
  ],
  "trionic-array-ii": [
    "4 <= n = nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9",
    "保证至少存在一个三段式子数组。"
  ],
  "find-minimum-in-rotated-sorted-array-ii": [
    "n == nums.length",
    "1 <= n <= 5000",
    "-5000 <= nums[i] <= 5000",
    "nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转"
  ],
  "longest-balanced-subarray-i": [
    "1 <= nums.length <= 1500",
    "1 <= nums[i] <= 10^5"
  ],
  "longest-arithmetic-sequence-after-changing-at-most-one-element": [
    "4 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^5"
  ],
  "k-similar-strings": [
    "1 <= s1.length <= 20",
    "s2.length == s1.length",
    "s1 和 s2 只包含集合 {'a', 'b', 'c', 'd', 'e', 'f'} 中的小写字母",
    "s2 是 s1 的一个字母异位词"
  ],
  "maximize-area-of-square-hole-in-grid": [
    "1 <= n <= 10^9",
    "1 <= m <= 10^9",
    "1 <= hBars.length <= 100",
    "2 <= hBars[i] <= n + 1",
    "1 <= vBars.length <= 100",
    "2 <= vBars[i] <= m + 1",
    "hBars 中所有值互不相同。",
    "vBars 中所有值互不相同。"
  ],
  "divide-an-array-into-subarrays-with-minimum-cost-i": [
    "3 <= n <= 50",
    "1 <= nums[i] <= 50"
  ],
  "minimum-substring-partition-of-equal-character-frequency": [
    "1 <= s.length <= 1000",
    "s 只包含小写英文字母。"
  ],
  "WqXACV": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "set-intersection-size-at-least-two": [
    "1 <= intervals.length <= 3000",
    "intervals[i].length == 2",
    "0 <= start_i < end_i <= 10^8"
  ],
  "previous-permutation-with-one-swap": [
    "1 <= arr.length <= 10^4",
    "1 <= arr[i] <= 10^4"
  ],
  "maximum-matrix-sum": [
    "n == matrix.length == matrix[i].length",
    "2 <= n <= 250",
    "-10^5 <= matrix[i][j] <= 10^5"
  ],
  "sum-of-two-integers": [
    "-1000 <= a, b <= 1000"
  ],
  "split-array-with-equal-sum": [
    "n == nums.length",
    "1 <= n <= 2000",
    "-10^6 <= nums[i] <= 10^6"
  ],
  "shopping-offers": [
    "n == price.length == needs.length",
    "1 <= n <= 6",
    "0 <= price[i], needs[i] <= 10",
    "1 <= special.length <= 100",
    "special[i].length == n + 1",
    "0 <= special[i][j] <= 50",
    "生成的输入对于 0 <= j <= n - 1 至少有一个 special[i][j] 非零。"
  ],
  "degree-of-an-array": [
    "nums.length 在 1 到 50,000 范围内。",
    "nums[i] 是一个在 0 到 49,999 范围内的整数。"
  ],
  "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree": [
    "2 <= n <= 100",
    "1 <= edges.length <= min(200, n * (n - 1) / 2)",
    "edges[i].length == 3",
    "0 <= from_i < to_i < n",
    "1 <= weight_i <= 1000",
    "所有 (from_i, to_i) 数对都是互不相同的。"
  ],
  "fancy-sequence": [
    "1 <= val, inc, m <= 100",
    "0 <= idx <= 10^5",
    "总共最多会有 10^5 次对 append，addAll，multAll 和 getIndex 的调用。"
  ],
  "minimum-deletions-to-make-string-balanced": [
    "1 <= s.length <= 10^5",
    "s[i] 要么是 'a' 要么是 'b'​。​"
  ],
  "find-the-most-competitive-subsequence": [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= 10^9",
    "1 <= k <= nums.length"
  ],
  "largest-submatrix-with-rearrangements": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m * n <= 10^5",
    "matrix[i][j] 要么是 0，要么是 1。"
  ],
  "construct-the-minimum-bitwise-array-i": [
    "1 <= nums.length <= 100",
    "2 <= nums[i] <= 1000",
    "nums[i] 是一个质数。"
  ],
  "diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof": [
    "0 <= actions.length <= 50000",
    "0 <= actions[i] <= 10000"
  ],
  "eight-queens-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "flatten-a-multilevel-doubly-linked-list": [
    "节点数目不超过 1000",
    "1 <= Node.val <= 10^5"
  ],
  "implement-magic-dictionary": [
    "1 <= dictionary.length <= 100",
    "1 <= dictionary[i].length <= 100",
    "dictionary[i] 仅由小写英文字母组成",
    "dictionary 中的所有字符串 互不相同",
    "1 <= searchWord.length <= 100",
    "searchWord 仅由小写英文字母组成",
    "buildDict 仅在 search 之前调用一次",
    "最多调用 100 次 search"
  ],
  "super-palindromes": [
    "1 <= left.length, right.length <= 18",
    "left 和 right 仅由数字（0 - 9）组成。",
    "left 和 right 不含前导零。",
    "left 和 right 表示的整数在区间 [1, 10^18 - 1] 内。",
    "left 小于等于 right。"
  ],
  "minimize-malware-spread-ii": [
    "n == graph.length",
    "n == graph[i].length",
    "2 <= n <= 300",
    "graph[i][j] 是 0 或 1.",
    "graph[i][j] == graph[j][i]",
    "graph[i][i] == 1",
    "1 <= initial.length < n",
    "0 <= initial[i] <= n - 1",
    "initial 中每个整数都不同"
  ],
  "number-of-days-between-two-dates": [
    "给定的日期是 1971 年到 2100 年之间的有效日期。"
  ],
  "maximum-value-at-a-given-index-in-a-bounded-array": [
    "1 <= n <= maxSum <= 10^9",
    "0 <= index < n"
  ],
  "meeting-rooms-iii": [
    "1 <= n <= 100",
    "1 <= meetings.length <= 10^5",
    "meetings[i].length == 2",
    "0 <= start_i < end_i <= 5 * 10^5",
    "start_i 的所有值 互不相同"
  ],
  "check-if-strings-can-be-made-equal-with-operations-ii": [
    "n == s1.length == s2.length",
    "1 <= n <= 10^5",
    "s1 和 s2 只包含小写英文字母。"
  ],
  "coupon-code-validator": [
    "n == code.length == businessLine.length == isActive.length",
    "1 <= n <= 100",
    "0 <= code[i].length, businessLine[i].length <= 100",
    "code[i] 和 businessLine[i] 由可打印的 ASCII 字符组成。",
    "isActive[i] 的值为 true 或 false。"
  ],
  "bracket-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "delete-node-in-a-linked-list": [
    "链表中节点的数目范围是 [2, 1000]",
    "-1000 <= Node.val <= 1000",
    "链表中每个节点的值都是 唯一 的",
    "需要删除的节点 node 是 链表中的节点，且 不是末尾节点"
  ],
  "longest-absolute-file-path": [
    "1 <= input.length <= 10^4",
    "input 可能包含小写或大写的英文字母，一个换行符 '\\n'，一个制表符 '\\t'，一个点 '.'，一个空格 ' '，和数字。"
  ],
  "reverse-pairs": [
    "给定数组的长度不会超过50000。",
    "输入数组中的所有数字都在32位整数的表示范围内。"
  ],
  "01-matrix": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= m, n <= 10^4",
    "1 <= m * n <= 10^4",
    "mat[i][j] is either 0 or 1.",
    "mat 中至少有一个 0"
  ],
  "strange-printer": [
    "1 <= s.length <= 100",
    "s 由小写英文字母组成"
  ],
  "knight-probability-in-chessboard": [
    "1 <= n <= 25",
    "0 <= k <= 100",
    "0 <= row, column <= n - 1"
  ],
  "hand-of-straights": [
    "1 <= hand.length <= 10^4",
    "0 <= hand[i] <= 10^9",
    "1 <= groupSize <= hand.length"
  ],
  "score-of-parentheses": [
    "S 是平衡括号字符串，且只含有 (和)。",
    "2 <= S.length <= 50"
  ],
  "spiral-matrix-iii": [
    "1 <= rows, cols <= 100",
    "0 <= rStart < rows",
    "0 <= cStart < cols"
  ],
  "sum-of-subarray-minimums": [
    "1 <= arr.length <= 3 * 10^4",
    "1 <= arr[i] <= 3 * 10^4"
  ],
  "snapshot-array": [
    "1 <= length <= 50000",
    "题目最多进行50000 次set，snap，和 get的调用。",
    "0 <= index < length",
    "0 <= snap_id < 我们调用 snap() 的总次数",
    "0 <= val <= 10^9"
  ],
  "longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^9",
    "0 <= limit <= 10^9"
  ],
  "special-positions-in-a-binary-matrix": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= m, n <= 100",
    "mat[i][j] 是 0 或 1。"
  ],
  "make-sum-divisible-by-p": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^9",
    "1 <= p <= 10^9"
  ],
  "jump-game-vii": [
    "2 <= s.length <= 10^5",
    "s[i] 要么是 '0'，要么是 '1'",
    "s[0] == '0'",
    "1 <= minJump <= maxJump < s.length"
  ],
  "minimum-difference-between-highest-and-lowest-of-k-scores": [
    "1 <= k <= nums.length <= 1000",
    "0 <= nums[i] <= 10^5"
  ],
  "flatten-deeply-nested-array": [
    "0 <= arr 的元素个数 <= 10^5",
    "0 <= arr 的子数组个数 <= 10^5",
    "maxDepth <= 1000",
    "-1000 <= each number <= 1000",
    "0"
  ],
  "calculate-delayed-arrival-time": [
    "1 <= arrivaltime < 24",
    "1 <= delayedTime <= 24"
  ],
  "separate-squares-i": [
    "1 <= squares.length <= 5 * 10^4",
    "squares[i] = [x_i, y_i, l_i]",
    "squares[i].length == 3",
    "0 <= x_i, y_i <= 10^9",
    "1 <= l_i <= 10^9",
    "所有正方形的总面积不超过 10^12。"
  ],
  "xor-after-range-multiplication-queries-ii": [
    "1 <= n == nums.length <= 10^5",
    "1 <= nums[i] <= 10^9",
    "1 <= q == queries.length <= 10^5",
    "queries[i] = [l_i, r_i, k_i, v_i]",
    "0 <= l_i <= r_i < n",
    "1 <= k_i <= n",
    "1 <= v_i <= 10^5"
  ],
  "zero-matrix-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "super-ugly-number": [
    "1 <= n <= 10^5",
    "1 <= primes.length <= 100",
    "2 <= primes[i] <= 1000",
    "题目数据 保证 primes[i] 是一个质数",
    "primes 中的所有值都 互不相同，且按 递增顺序 排列"
  ],
  "design-twitter": [
    "1 <= userId, followerId, followeeId <= 500",
    "0 <= tweetId <= 10^4",
    "所有推特的 ID 都互不相同",
    "postTweet、getNewsFeed、follow 和 unfollow 方法最多调用 3 * 10^4 次",
    "用户不能关注自己"
  ],
  "k-th-smallest-in-lexicographical-order": [
    "1 <= k <= n <= 10^9"
  ],
  "minesweeper": [
    "m == board.length",
    "n == board[i].length",
    "1 <= m, n <= 50",
    "board[i][j] 为 'M'、'E'、'B' 或数字 '1' 到 '8' 中的一个",
    "click.length == 2",
    "0 <= click_r < m",
    "0 <= click_c < n",
    "board[click_r][click_c] 为 'M' 或 'E'"
  ],
  "add-one-row-to-tree": [
    "节点数在 [1, 10^4] 范围内",
    "树的深度在 [1, 10^4]范围内",
    "-100 <= Node.val <= 100",
    "-10^5 <= val <= 10^5",
    "1 <= depth <= the depth of tree + 1"
  ],
  "course-schedule-iii": [
    "1 <= courses.length <= 10^4",
    "1 <= duration_i, lastDay_i <= 10^4"
  ],
  "find-pivot-index": [
    "1 <= nums.length <= 10^4",
    "-1000 <= nums[i] <= 1000"
  ],
  "subarrays-with-k-different-integers": [
    "1 <= nums.length <= 2 * 10^4",
    "1 <= nums[i], k <= nums.length"
  ],
  "partition-array-for-maximum-sum": [
    "1 <= arr.length <= 500",
    "0 <= arr[i] <= 10^9",
    "1 <= k <= arr.length"
  ],
  "duplicate-zeros": [
    "1 <= arr.length <= 10^4",
    "0 <= arr[i] <= 9"
  ],
  "relative-sort-array": [
    "1 <= arr1.length, arr2.length <= 1000",
    "0 <= arr1[i], arr2[i] <= 1000",
    "arr2 中的元素 arr2[i] 各不相同",
    "arr2 中的每个元素 arr2[i] 都出现在 arr1 中"
  ],
  "remove-sub-folders-from-the-filesystem": [
    "1 <= folder.length <= 4 * 10^4",
    "2 <= folder[i].length <= 100",
    "folder[i] 只包含小写字母和 '/'",
    "folder[i] 总是以字符 '/' 起始",
    "folder 每个元素都是 唯一 的"
  ],
  "design-browser-history": [
    "1 <= homepage.length <= 20",
    "1 <= url.length <= 20",
    "1 <= steps <= 100",
    "homepage 和 url 都只包含 '.' 或者小写英文字母。",
    "最多调用 5000 次 visit， back 和 forward 函数。"
  ],
  "shortest-subarray-to-be-removed-to-make-array-sorted": [
    "1 <= arr.length <= 10^5",
    "0 <= arr[i] <= 10^9"
  ],
  "even-odd-tree": [
    "树中节点数在范围 [1, 10^5] 内",
    "1 <= Node.val <= 10^6"
  ],
  "minimum-absolute-sum-difference": [
    "n == nums1.length",
    "n == nums2.length",
    "1 <= n <= 10^5",
    "1 <= nums1[i], nums2[i] <= 10^5"
  ],
  "find-unique-binary-string": [
    "n == nums.length",
    "1 <= n <= 16",
    "nums[i].length == n",
    "nums[i] 为 '0' 或 '1'",
    "nums 中的所有字符串 互不相同"
  ],
  "k-radius-subarray-averages": [
    "n == nums.length",
    "1 <= n <= 10^5",
    "0 <= nums[i], k <= 10^5"
  ],
  "minimum-sum-of-four-digit-number-after-splitting-digits": [
    "1000 <= num <= 9999"
  ],
  "smallest-number-in-infinite-set": [
    "1 <= num <= 1000",
    "最多调用 popSmallest 和 addBack 方法 共计 1000 次"
  ],
  "count-pairs-whose-sum-is-less-than-target": [
    "1 <= nums.length == n <= 50",
    "-50 <= nums[i], target <= 50"
  ],
  "right-triangles": [
    "1 <= grid.length <= 1000",
    "1 <= grid[i].length <= 1000",
    "0 <= grid[i][j] <= 1"
  ],
  "minimum-pair-removal-to-sort-array-i": [
    "1 <= nums.length <= 50",
    "-1000 <= nums[i] <= 1000"
  ],
  "P5rCT8": [
    "树中节点的数目在范围 [1, 10^4] 内。",
    "-10^5 <= Node.val <= 10^5",
    "树中各节点的值均保证唯一。"
  ],
  "er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof": [
    "数组长度 <= 1000",
    "postorder 中无重复数字"
  ],
  "xu-lie-hua-er-cha-shu-lcof": [
    "树中结点数在范围 [0, 10^4] 内",
    "-1000 <= Node.val <= 1000"
  ],
  "bu-ke-pai-zhong-de-shun-zi-lcof": [
    "places.length = 5",
    "0 <= places[i] <= 13"
  ],
  "gray-code": [
    "1 <= n <= 16"
  ],
  "convert-sorted-list-to-binary-search-tree": [
    "head 中的节点数在[0, 2 * 10^4] 范围内",
    "-10^5 <= Node.val <= 10^5"
  ],
  "palindrome-partitioning-ii": [
    "1 <= s.length <= 2000",
    "s 仅由小写英文字母组成"
  ],
  "lexicographical-numbers": [
    "1 <= n <= 5 * 10^4"
  ],
  "elimination-game": [
    "1 <= n <= 10^9"
  ],
  "longest-substring-with-at-least-k-repeating-characters": [
    "1 <= s.length <= 10^4",
    "s 仅由小写英文字母组成",
    "1 <= k <= 10^5"
  ],
  "fizz-buzz": [
    "1 <= n <= 10^4"
  ],
  "number-of-segments-in-a-string": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "can-i-win": [
    "1 <= maxChoosableInteger <= 20",
    "0 <= desiredTotal <= 300"
  ],
  "find-mode-in-binary-search-tree": [
    "树中节点的数目在范围 [1, 10^4] 内",
    "-10^5 <= Node.val <= 10^5"
  ],
  "relative-ranks": [
    "n == score.length",
    "1 <= n <= 10^4",
    "0 <= score[i] <= 10^6",
    "score 中的所有值 互不相同"
  ],
  "investments-in-2016": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "longest-continuous-increasing-subsequence": [
    "1 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "self-dividing-numbers": [
    "1 <= left <= right <= 10^4"
  ],
  "monotone-increasing-digits": [
    "0 <= n <= 10^9"
  ],
  "swim-in-rising-water": [
    "n == grid.length",
    "n == grid[i].length",
    "1 <= n <= 50",
    "0 <= grid[i][j] < n^2",
    "grid[i][j] 中每个值 均无重复"
  ],
  "champagne-tower": [
    "0 <= poured <= 10^9",
    "0 <= query_glass <= query_row < 100"
  ],
  "shortest-subarray-with-sum-at-least-k": [
    "1 <= nums.length <= 10^5",
    "-10^5 <= nums[i] <= 10^5",
    "1 <= k <= 10^9"
  ],
  "vertical-order-traversal-of-a-binary-tree": [
    "树中结点数目总数在范围 [1, 1000] 内",
    "0 <= Node.val <= 1000"
  ],
  "robot-bounded-in-circle": [
    "1 <= instructions.length <= 100",
    "instructions[i] 仅包含 'G', 'L', 'R'"
  ],
  "print-zero-even-odd": [
    "1 <= n <= 1000"
  ],
  "reformat-department-table": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "last-person-to-fit-in-the-bus": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "search-suggestions-system": [
    "1 <= products.length <= 1000",
    "1 <= &Sigma; products[i].length <= 2 * 10^4",
    "products[i] 中所有的字符都是小写英文字母。",
    "1 <= searchWord.length <= 1000",
    "searchWord 中所有字符都是小写英文字母。"
  ],
  "find-users-with-valid-e-mails": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "thousand-separator": [
    "0 <= n < 2^31"
  ],
  "maximum-absolute-sum-of-any-subarray": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4"
  ],
  "check-if-binary-string-has-at-most-one-segment-of-ones": [
    "1 <= s.length <= 100",
    "s[i]​​​​ 为 '0' 或 '1'",
    "s[0] 为 '1'"
  ],
  "check-if-the-sentence-is-pangram": [
    "1 <= sentence.length <= 1000",
    "sentence 由小写英语字母组成"
  ],
  "parallel-courses-iii": [
    "1 <= n <= 5 * 10^4",
    "0 <= relations.length <= min(n * (n - 1) / 2, 5 * 10^4)",
    "relations[j].length == 2",
    "1 <= prevCourse_j, nextCourse_j <= n",
    "prevCourse_j != nextCourse_j",
    "所有的先修课程对 [prevCourse_j, nextCourse_j] 都是 互不相同 的。",
    "time.length == n",
    "1 <= time[i] <= 10^4",
    "先修课程图是一个有向无环图。"
  ],
  "count-number-of-texts": [
    "1 <= pressedKeys.length <= 10^5",
    "pressedKeys 只包含数字 '2' 到 '9'。"
  ],
  "successful-pairs-of-spells-and-potions": [
    "n == spells.length",
    "m == potions.length",
    "1 <= n, m <= 10^5",
    "1 <= spells[i], potions[i] <= 10^5",
    "1 <= success <= 10^10"
  ],
  "house-robber-iv": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^9",
    "1 <= k <= (nums.length + 1)/2"
  ],
  "promise-time-limit": [
    "0 <= inputs.length <= 10",
    "0 <= t <= 1000",
    "fn 返回一个 Promise 对象"
  ],
  "find-the-maximum-achievable-number": [
    "1 <= num, t <= 50"
  ],
  "maximum-beauty-of-an-array-after-applying-operation": [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i], k <= 10^5"
  ],
  "design-an-array-statistics-tracker": [
    "1 <= number <= 10^9",
    "addNumber，removeFirstAddedNumber，getMean，getMedian 和 getMode 的总调用次数最多为 10^5。",
    "removeFirstAddedNumber，getMean，getMedian 和 getMode 只会在数据结构中至少有一个元素时被调用。"
  ],
  "maximum-amount-of-money-robot-can-earn": [
    "m == coins.length",
    "n == coins[i].length",
    "1 <= m, n <= 500",
    "-1000 <= coins[i][j] <= 1000"
  ],
  "coin-bonus": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "you-le-yuan-de-mi-gong": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "zhan-de-ya-ru-dan-chu-xu-lie-lcof": [
    "0 <= putIn.length == takeOut.length <= 1000",
    "0 <= putIn[i], takeOut < 1000",
    "putIn 是 takeOut 的排列。"
  ],
  "check-permutation-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "search-rotate-array-lcci": [
    "arr 长度范围在[1, 1000000]之间"
  ],
  "department-top-three-salaries": [
    "没有姓名、薪资和部门 完全 相同的员工。"
  ],
  "wiggle-sort": [
    "1 <= nums.length <= 5 * 10^4",
    "0 <= nums[i] <= 10^4",
    "输入的 nums 保证至少有一个答案。"
  ],
  "additive-number": [
    "1 <= num.length <= 35",
    "num 仅由数字（0 - 9）组成"
  ],
  "friend-requests-ii-who-has-the-most-friends": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "minimum-number-of-refueling-stops": [
    "1 <= target, startFuel <= 10^9",
    "0 <= stations.length <= 500",
    "1 <= position_i < position_i+1 < target",
    "1 <= fuel_i < 10^9"
  ],
  "largest-perimeter-triangle": [
    "3 <= nums.length <= 10^4",
    "1 <= nums[i] <= 10^6"
  ],
  "smallest-integer-divisible-by-k": [
    "1 <= k <= 10^5"
  ],
  "sum-of-root-to-leaf-binary-numbers": [
    "树中的节点数在 [1, 1000] 范围内",
    "Node.val 仅为 0 或 1"
  ],
  "building-h2o": [
    "3 * n == water.length",
    "1 <= n <= 20",
    "water[i] == 'O' or 'H'",
    "输入字符串 water 中的 'H' 总数将会是 2 * n。",
    "输入字符串 water 中的 'O' 总数将会是 n。"
  ],
  "k-concatenation-maximum-sum": [
    "1 <= arr.length <= 10^5",
    "1 <= k <= 10^5",
    "-10^4 <= arr[i] <= 10^4"
  ],
  "number-of-substrings-containing-all-three-characters": [
    "3 <= s.length <= 5 x 10^4",
    "s 只包含字符 a，b 和 c。"
  ],
  "build-an-array-with-stack-operations": [
    "1 <= target.length <= 100",
    "1 <= n <= 100",
    "1 <= target[i] <= n",
    "target 严格递增"
  ],
  "reorder-routes-to-make-all-paths-lead-to-the-city-zero": [
    "2 <= n <= 5 * 10^4",
    "connections.length == n-1",
    "connections[i].length == 2",
    "0 <= connections[i][0], connections[i][1] <= n-1",
    "connections[i][0] != connections[i][1]"
  ],
  "running-sum-of-1d-array": [
    "1 <= nums.length <= 1000",
    "-10^6 <= nums[i] <= 10^6"
  ],
  "the-latest-login-in-2020": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "unique-length-3-palindromic-subsequences": [
    "3 <= s.length <= 10^5",
    "s 仅由小写英文字母组成"
  ],
  "find-if-path-exists-in-graph": [
    "1 <= n <= 2 * 10^5",
    "0 <= edges.length <= 2 * 10^5",
    "edges[i].length == 2",
    "0 <= u_i, v_i <= n - 1",
    "u_i != v_i",
    "0 <= source, destination <= n - 1",
    "不存在重复边",
    "不存在指向顶点自身的边"
  ],
  "find-the-difference-of-two-arrays": [
    "1 <= nums1.length, nums2.length <= 1000",
    "-1000 <= nums1[i], nums2[i] <= 1000"
  ],
  "maximum-bags-with-full-capacity-of-rocks": [
    "n == capacity.length == rocks.length",
    "1 <= n <= 5 * 10^4",
    "1 <= capacity[i] <= 10^9",
    "0 <= rocks[i] <= capacity[i]",
    "1 <= additionalRocks <= 10^9"
  ],
  "remove-nodes-from-linked-list": [
    "给定列表中的节点数目在范围 [1, 10^5] 内",
    "1 <= Node.val <= 10^5"
  ],
  "reschedule-meetings-for-maximum-free-time-i": [
    "1 <= eventTime <= 10^9",
    "n == startTime.length == endTime.length",
    "2 <= n <= 10^5",
    "1 <= k <= n",
    "0 <= startTime[i] < endTime[i] <= eventTime",
    "endTime[i] <= startTime[i + 1] 其中 i 在范围 [0, n - 2] 之间。"
  ],
  "minimum-operations-to-make-array-sum-divisible-by-k": [
    "1 <= nums.length <= 1000",
    "1 <= nums[i] <= 1000",
    "1 <= k <= 100"
  ],
  "que-shi-de-shu-zi-lcof": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "partition-list-lcci": [
    "链表中节点的数目在范围 [0, 200] 内",
    "-100 <= Node.val <= 100",
    "-200 <= x <= 200"
  ],
  "pond-sizes-lcci": [
    "0 < len(land) <= 1000",
    "0 < len(land[i]) <= 1000"
  ],
  "license-key-formatting": [
    "1 <= s.length <= 10^5",
    "s 只包含字母、数字和破折号 '-'.",
    "1 <= k <= 10^4"
  ],
  "find-k-closest-elements": [
    "1 <= k <= arr.length",
    "1",
    "arr 按 升序 排列",
    "-10^4 <= arr[i], x <= 10^4"
  ],
  "largest-triangle-area": [
    "3 <= points.length <= 50",
    "-50 <= x_i, y_i <= 50",
    "给出的所有点 互不相同"
  ],
  "sort-array-by-parity-ii": [
    "2 <= nums.length <= 2 * 10^4",
    "nums.length 是偶数",
    "nums 中一半是偶数",
    "0 <= nums[i] <= 1000"
  ],
  "binary-prefix-divisible-by-5": [
    "1 <= nums.length <= 10^5",
    "nums[i] 仅为 0 或 1"
  ],
  "n-th-tribonacci-number": [
    "0 <= n <= 37",
    "答案保证是一个 32 位整数，即 answer <= 2^31 - 1。"
  ],
  "queries-quality-and-percentage": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "maximum-score-after-splitting-a-string": [
    "2 <= s.length <= 500",
    "字符串 s 仅由字符 '0' 和 '1' 组成。"
  ],
  "xor-operation-in-an-array": [
    "1 <= n <= 1000",
    "0 <= start <= 1000",
    "n == nums.length"
  ],
  "min-cost-to-connect-all-points": [
    "1 <= points.length <= 1000",
    "-10^6 <= x_i, y_i <= 10^6",
    "所有点 (x_i, y_i) 两两不同。"
  ],
  "find-the-minimum-and-maximum-number-of-nodes-between-critical-points": [
    "链表中节点的数量在范围 [2, 10^5] 内",
    "1 <= Node.val <= 10^5"
  ],
  "time-needed-to-buy-tickets": [
    "n == tickets.length",
    "1 <= n <= 100",
    "1 <= tickets[i] <= 100",
    "0 <= k < n"
  ],
  "count-the-number-of-vowel-strings-in-range": [
    "1 <= words.length <= 1000",
    "1 <= words[i].length <= 10",
    "words[i] 仅由小写英文字母组成",
    "0 <= left <= right < words.length"
  ],
  "count-subarrays-where-max-element-appears-at-least-k-times": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^6",
    "1 <= k <= 10^5"
  ],
  "rotate-matrix-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "missing-number": [
    "n == nums.length",
    "1 <= n <= 10^4",
    "0 <= nums[i] <= n",
    "nums 中的所有数字都 独一无二"
  ],
  "flood-fill": [
    "m == image.length",
    "n == image[i].length",
    "1 <= m, n <= 50",
    "0 <= image[i][j], color < 2^16",
    "0 <= sr < m",
    "0 <= sc < n"
  ],
  "maximum-level-sum-of-a-binary-tree": [
    "树中的节点数在 [1, 10^4]范围内",
    "-10^5 <= Node.val <= 10^5"
  ],
  "replace-the-substring-for-balanced-string": [
    "1 <= s.length <= 10^5",
    "s.length 是 4 的倍数",
    "s 中只含有 'Q', 'W', 'E', 'R' 四种字符"
  ],
  "count-number-of-nice-subarrays": [
    "1 <= nums.length <= 50000",
    "1 <= nums[i] <= 10^5",
    "1 <= k <= nums.length"
  ],
  "sort-integers-by-the-number-of-1-bits": [
    "1 <= arr.length <= 500",
    "0 <= arr[i] <= 10^4"
  ],
  "invalid-tweets": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "find-followers-count": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "paths-in-matrix-whose-sum-is-divisible-by-k": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 5 * 10^4",
    "1 <= m * n <= 5 * 10^4",
    "0 <= grid[i][j] <= 100",
    "1 <= k <= 50"
  ],
  "climbing-stairs-ii": [
    "1 <= n == costs.length <= 10^5",
    "1 <= costs[i] <= 10^4"
  ],
  "er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof": [
    "-1000 <= Node.val <= 1000",
    "Node.left.val < Node.val < Node.right.val",
    "Node.val 的所有值都是独一无二的",
    "0 <= Number of Nodes <= 2000"
  ],
  "binary-tree-postorder-traversal": [
    "树中节点的数目在范围 [0, 100] 内",
    "-100 <= Node.val <= 100"
  ],
  "factorial-trailing-zeroes": [
    "0 <= n <= 10^4"
  ],
  "single-number-iii": [
    "2 <= nums.length <= 3 * 10^4",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "除两个只出现一次的整数外，nums 中的其他数字都出现两次"
  ],
  "maximum-distance-in-arrays": [
    "m == arrays.length",
    "2 <= m <= 10^5",
    "1 <= arrays[i].length <= 500",
    "-10^4 <= arrays[i][j] <= 10^4",
    "arrays[i] 以 升序 排序。",
    "所有数组中最多有 10^5 个整数。"
  ],
  "all-paths-from-source-to-target": [
    "n == graph.length",
    "2 <= n <= 15",
    "0 <= graph[i][j] < n",
    "graph[i][j] != i（即不存在自环）",
    "graph[i] 中的所有元素 互不相同",
    "保证输入为 有向无环图（DAG）"
  ],
  "maximum-array-hopping-score-i": [
    "2 <= nums.length <= 10^3",
    "1 <= nums[i] <= 10^5"
  ],
  "combination-sum-iv": [
    "1 <= nums.length <= 200",
    "1 <= nums[i] <= 1000",
    "nums 中的所有元素 互不相同",
    "1 <= target <= 1000"
  ],
  "queue-reconstruction-by-height": [
    "1 <= people.length <= 2000",
    "0 <= h_i <= 10^6",
    "0 <= k_i < people.length",
    "题目数据确保队列可以被重建"
  ],
  "minimum-number-of-arrows-to-burst-balloons": [
    "1 <= points.length <= 10^5",
    "points[i].length == 2",
    "-2^31 <= x_start < x_end <= 2^31 - 1"
  ],
  "search-in-a-binary-search-tree": [
    "树中节点数在 [1, 5000] 范围内",
    "1 <= Node.val <= 10^7",
    "root 是二叉搜索树",
    "1 <= val <= 10^7"
  ],
  "students-and-examinations": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "convert-the-temperature": [
    "0 <= celsius <= 1000"
  ],
  "assign-cookies": [
    "1 <= g.length <= 3 * 10^4",
    "0 <= s.length <= 3 * 10^4",
    "1 <= g[i], s[j] <= 2^31 - 1"
  ],
  "combination-sum-iii": [
    "2 <= k <= 9",
    "1 <= n <= 60"
  ],
  "minimize-rounding-error-to-meet-target": [
    "1 <= prices.length <= 500",
    "表示价格的每个字符串 prices[i] 都代表一个介于 [0.0, 1000.0] 之间的实数，并且正好有 3 个小数位。",
    "target 介于 0 和 1000000 之间。"
  ],
  "minimum-seconds-to-equalize-a-circular-array": [
    "1 <= n == nums.length <= 10^5",
    "1 <= nums[i] <= 10^9"
  ],
  "minimum-flips-to-make-binary-string-coherent": [
    "1 <= s.length <= 10^5",
    "s[i] 是 '0' 或 '1'。"
  ],
  "maximum-score-from-grid-operations": [
    "1 <= n == grid.length <= 100",
    "n == grid[i].length",
    "0 <= grid[i][j] <= 10^9"
  ],
  "making-file-names-unique": [
    "1 <= names.length <= 5 * 10^4",
    "1 <= names[i].length <= 20",
    "names[i] 由小写英文字母、数字和/或圆括号组成。"
  ],
  "minimum-sum-of-values-by-dividing-array": [
    "1 <= n == nums.length <= 10^4",
    "1 <= m == andValues.length <= min(n, 10)",
    "1 <= nums[i] < 10^5",
    "0 <= andValues[j] < 10^5"
  ],
  "count-the-number-of-inversions": [
    "2 <= n <= 300",
    "1 <= requirements.length <= n",
    "requirements[i] = [end_i, cnt_i]",
    "0 <= end_i <= n - 1",
    "0 <= cnt_i <= 400",
    "输入保证至少有一个 i 满足 end_i == n - 1。",
    "输入保证所有的 end_i 互不相同。"
  ],
  "find-the-largest-palindrome-divisible-by-k": [
    "1 <= n <= 10^5",
    "1 <= k <= 9"
  ],
  "Za25hA": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "t3fKg1": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "the-maze-iii": [
    "m == maze.length",
    "n == maze[i].length",
    "1 <= m, n <= 100",
    "maze[i][j] is 0 or 1.",
    "ball.length == 2",
    "hole.length == 2",
    "0 <= ball_row, hole_row <= m",
    "0 <= ball_col, hole_col <= n",
    "球和洞都存在于一个空地中，它们最初不会处于同一位置。",
    "迷宫中至少有 2 个空地。"
  ],
  "alphabet-board-path": [
    "1 <= target.length <= 100",
    "target 仅含有小写英文字母。"
  ],
  "order-two-columns-independently": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "longest-binary-subsequence-less-than-or-equal-to-k": [
    "1 <= s.length <= 1000",
    "s[i] 要么是 '0'，要么是 '1'。",
    "1 <= k <= 10^9"
  ],
  "minimum-number-of-groups-to-create-a-valid-assignment": [
    "1 <= balls.length <= 10^5",
    "1 <= balls[i] <= 10^9"
  ],
  "count-the-number-of-substrings-with-dominant-ones": [
    "1 <= s.length <= 4 * 10^4",
    "s 仅包含字符 '0' 和 '1'。"
  ],
  "design-search-autocomplete-system": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "number-of-times-binary-string-is-prefix-aligned": [
    "n == flips.length",
    "1 <= n <= 5 * 10^4",
    "flips 是范围 [1, n] 中所有整数构成的一个排列"
  ],
  "count-zero-request-servers": [
    "1 <= n <= 10^5",
    "1 <= logs.length <= 10^5",
    "1 <= queries.length <= 10^5",
    "logs[i].length == 2",
    "1 <= logs[i][0] <= n",
    "1 <= logs[i][1] <= 10^6",
    "1 <= x <= 10^5",
    "x < queries[i] <= 10^6"
  ],
  "find-the-sequence-of-strings-appeared-on-the-screen": [
    "1 <= target.length <= 400",
    "target 仅由小写英文字母组成。"
  ],
  "last-remaining-integer-after-alternating-deletion-operations": [
    "1 <= n <= 10^15"
  ],
  "ip-to-cidr": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "design-file-system": [
    "对两个函数的调用次数加起来小于等于 10^4",
    "2 <= path.length <= 100",
    "1 <= value <= 10^9"
  ],
  "sort-linked-list-already-sorted-using-absolute-values": [
    "链表节点数的范围是 [1, 10^5].",
    "-5000 <= Node.val <= 5000",
    "head 是根据结点绝对值升序排列好的链表."
  ],
  "sum-of-k-mirror-numbers": [
    "2 <= k <= 9",
    "1 <= n <= 30"
  ],
  "minimum-edge-reversals-so-every-node-is-reachable": [
    "2 <= n <= 10^5",
    "edges.length == n - 1",
    "edges[i].length == 2",
    "0 <= u_i == edges[i][0] < n",
    "0 <= v_i == edges[i][1] < n",
    "u_i != v_i",
    "输入保证如果边是双向边，可以得到一棵树。"
  ],
  "kplEvH": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "rle-iterator": [
    "2 <= encoding.length <= 1000",
    "encoding.length 为偶",
    "0 <= encoding[i] <= 10^9",
    "1 <= n <= 10^9",
    "每个测试用例调用next 不高于 1000 次"
  ],
  "least-operators-to-express-number": [
    "2 <= x <= 100",
    "1 <= target <= 2 * 10^8"
  ],
  "last-substring-in-lexicographical-order": [
    "1 <= s.length <= 4 * 10^5",
    "s 仅含有小写英文字符。"
  ],
  "tournament-winners": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "implement-trie-ii-prefix-tree": [
    "1 <= word.length, prefix.length <= 2000",
    "word 和 prefix 只包含小写英文字母。",
    "insert、 countWordsEqualTo、 countWordsStartingWith 和 erase 总共调用最多 3 * 10^4 次。",
    "保证每次调用 erase 时，字符串 word 总是存在于前缀树中。"
  ],
  "query-kth-smallest-trimmed-number": [
    "裁剪到剩下最右边 x 个数位的意思是不断删除最左边的数位，直到剩下 x 个数位。",
    "nums 中的字符串可能会有前导 0。"
  ],
  "design-memory-allocator": [
    "1 <= n, size, mID <= 1000",
    "最多调用 allocate 和 free 方法 1000 次"
  ],
  "sum-of-matrix-after-queries": [
    "1 <= n <= 10^4",
    "1 <= queries.length <= 5 * 10^4",
    "queries[i].length == 3",
    "0 <= type_i <= 1",
    "0 <= index_i < n",
    "0 <= val_i <= 10^5"
  ],
  "movement-of-robots": [
    "2 <= nums.length <= 10^5",
    "-2 * 10^9 <= nums[i] <= 2 * 10^9",
    "0 <= d <= 10^9",
    "nums.length == s.length",
    "s 只包含 'L' 和 'R'。",
    "nums[i] 互不相同。"
  ],
  "kth-smallest-path-xor-sum": [
    "1 <= n == vals.length <= 5 * 10^4",
    "0 <= vals[i] <= 10^5",
    "par.length == n",
    "par[0] == -1",
    "对于 [1, n - 1] 中的 i，0 <= par[i] < n",
    "1 <= queries.length <= 5 * 10^4",
    "queries[j] == [u_j, k_j]",
    "0 <= u_j < n",
    "1 <= k_j <= n",
    "输出保证父数组 par 表示一棵合法的树。"
  ],
  "parallel-courses-ii": [
    "1 <= n <= 15",
    "1 <= k <= n",
    "0 <= relations.length <= n * (n-1) / 2",
    "relations[i].length == 2",
    "1 <= x_i, y_i <= n",
    "x_i != y_i",
    "所有先修关系都是不同的，也就是说 relations[i] != relations[j]。",
    "题目输入的图是个有向无环图。"
  ],
  "partition-array-into-two-arrays-to-minimize-sum-difference": [
    "1 <= n <= 15",
    "nums.length == 2 * n",
    "-10^7 <= nums[i] <= 10^7"
  ],
  "sum-of-numbers-with-units-digit-k": [
    "0 <= num <= 3000",
    "0 <= k <= 9"
  ],
  "find-the-longest-balanced-substring-of-a-binary-string": [
    "1 <= s.length <= 50",
    "'0' <= s[i] <= '1'"
  ],
  "shortest-string-that-contains-three-strings": [
    "1 <= a.length, b.length, c.length <= 100",
    "a，b，c 只包含小写英文字母。"
  ],
  "minimum-increment-operations-to-make-array-beautiful": [
    "3 <= n == nums.length <= 10^5",
    "0 <= nums[i] <= 10^9",
    "0 <= k <= 10^9"
  ],
  "number-of-unique-xor-triplets-i": [
    "1 <= n == nums.length <= 10^5",
    "1 <= nums[i] <= n",
    "nums 是从 1 到 n 的整数的一个排列。"
  ],
  "minimum-operations-to-transform-array": [
    "1 <= n == nums1.length <= 10^5",
    "nums2.length == n + 1",
    "1 <= nums1[i], nums2[i] <= 10^5"
  ],
  "kill-process": [
    "n == pid.length",
    "n == ppid.length",
    "1 <= n <= 5 * 10^4",
    "1 <= pid[i] <= 5 * 10^4",
    "0 <= ppid[i] <= 5 * 10^4",
    "仅有一个进程没有父进程",
    "pid 中的所有值 互不相同",
    "题目数据保证 kill 在 pid 中"
  ],
  "flip-columns-for-maximum-number-of-equal-rows": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 300",
    "matrix[i][j] == 0 或 1"
  ],
  "queens-that-can-attack-the-king": [
    "1 <= queens.length < 64",
    "queens[i].length == king.length == 2",
    "0 <= xQueen_i, yQueen_i, xKing, yKing < 8",
    "所有给定的位置都是 唯一 的。"
  ],
  "max-difference-you-can-get-from-changing-an-integer": [
    "1 <= num <= 10^8"
  ],
  "arithmetic-subarrays": [
    "n == nums.length",
    "m == l.length",
    "m == r.length",
    "2 <= n <= 500",
    "1 <= m <= 500",
    "0 <= l[i] < r[i] < n",
    "-10^5 <= nums[i] <= 10^5"
  ],
  "detect-squares": [
    "point.length == 2",
    "0 <= x, y <= 1000",
    "调用 add 和 count 的 总次数 最多为 5000"
  ],
  "minimum-time-to-remove-all-cars-containing-illegal-goods": [
    "1 <= s.length <= 2 * 10^5",
    "s[i] 为 '0' 或 '1'"
  ],
  "minimum-number-of-moves-to-make-palindrome": [
    "1 <= s.length <= 2000",
    "s 只包含小写英文字母。",
    "s 可以通过有限次操作得到一个回文串。"
  ],
  "maximum-square-area-by-removing-fences-from-a-field": [
    "3 <= m, n <= 10^9",
    "1 <= hFences.length, vFences.length <= 600",
    "1 < hFences[i] < m",
    "1 < vFences[i] < n",
    "hFences 和 vFences 中的元素是唯一的。"
  ],
  "find-the-largest-area-of-square-inside-two-rectangles": [
    "n == bottomLeft.length == topRight.length",
    "2 <= n <= 10^3",
    "bottomLeft[i].length == topRight[i].length == 2",
    "1 <= bottomLeft[i][0], bottomLeft[i][1] <= 10^7",
    "1 <= topRight[i][0], topRight[i][1] <= 10^7",
    "bottomLeft[i][0] < topRight[i][0]",
    "bottomLeft[i][1] < topRight[i][1]"
  ],
  "separate-squares-ii": [
    "1 <= squares.length <= 5 * 10^4",
    "squares[i] = [x_i, y_i, l_i]",
    "squares[i].length == 3",
    "0 <= x_i, y_i <= 10^9",
    "1 <= l_i <= 10^9",
    "所有正方形的总面积不超过 10^15。"
  ],
  "shortest-path-in-a-weighted-tree": [
    "1 <= n <= 10^5",
    "edges.length == n - 1",
    "edges[i] == [u_i, v_i, w_i]",
    "1 <= u_i, v_i <= n",
    "1 <= w_i <= 10^4",
    "输入保证 edges 构成一棵合法的树。",
    "1 <= queries.length == q <= 10^5",
    "queries[i].length == 2 或 4 queries[i] == [1, u, v, w']，或者",
    "queries[i] == [2, x]",
    "1 <= u, v, x <= n",
    "(u, v) 一定是 edges 中的一条边。",
    "1 <= w' <= 10^4"
  ],
  "longest-alternating-subarray-after-removing-at-most-one-element": [
    "2 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^5"
  ],
  "sentence-similarity-iii": [
    "1 <= sentence1.length, sentence2.length <= 100",
    "sentence1 和 sentence2 都只包含大小写英文字母和空格。",
    "sentence1 和 sentence2 中的单词都只由单个空格隔开。"
  ],
  "maximum-number-of-words-you-can-type": [
    "1 <= text.length <= 10^4",
    "0 <= brokenLetters.length <= 26",
    "text 由若干用单个空格分隔的单词组成，且不含任何前导和尾随空格",
    "每个单词仅由小写英文字母组成",
    "brokenLetters 由 互不相同 的小写英文字母组成"
  ],
  "number-of-accounts-that-did-not-stream": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "maximize-value-of-function-in-a-ball-passing-game": [
    "1 <= receiver.length == n <= 10^5",
    "0 <= receiver[i] <= n - 1",
    "1 <= k <= 10^10"
  ],
  "find-the-length-of-the-longest-common-prefix": [
    "1 <= arr1.length, arr2.length <= 5 * 10^4",
    "1 <= arr1[i], arr2[i] <= 10^8"
  ],
  "minimum-amount-of-damage-dealt-to-bob": [
    "1 <= power <= 10^4",
    "1 <= n == damage.length == health.length <= 10^5",
    "1 <= damage[i], health[i] <= 10^4"
  ],
  "design-task-manager": [
    "1 <= tasks.length <= 10^5",
    "0 <= userId <= 10^5",
    "0 <= taskId <= 10^5",
    "0 <= priority <= 10^9",
    "0 <= newPriority <= 10^9",
    "add，edit，rmv 和 execTop 的总操作次数 加起来 不超过 2 * 10^5 次。",
    "输入保证 taskId 是合法的。"
  ],
  "minimum-operations-to-equalize-binary-string": [
    "1 <= s.length <= 10^5",
    "s[i] 的值为 '0' 或 '1'。",
    "1 <= k <= s.length"
  ],
  "robot-room-cleaner": [
    "m == room.length",
    "n == room[i].length",
    "1 <= m <= 100",
    "1 <= n <= 200",
    "room[i][j] 为 0 或 1.",
    "0 <= row < m",
    "0 <= col < n",
    "room[row][col] == 1",
    "所有空单元格都可以从起始位置出发访问到。"
  ],
  "design-in-memory-file-system": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "k-th-symbol-in-grammar": [
    "1 <= n <= 30",
    "1 <= k <= 2^n - 1"
  ],
  "sum-of-mutated-array-closest-to-target": [
    "1 <= arr.length <= 10^4",
    "1 <= arr[i], target <= 10^5"
  ],
  "stone-game-iii": [
    "1 <= stoneValue.length <= 5 * 10^4",
    "-1000 <= stoneValue[i] <= 1000"
  ],
  "find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k": [
    "1 <= k <= 10^9"
  ],
  "last-day-where-you-can-still-cross": [
    "2 <= row, col <= 2 * 10^4",
    "4 <= row * col <= 2 * 10^4",
    "cells.length == row * col",
    "1 <= r_i <= row",
    "1 <= c_i <= col",
    "cells 中的所有格子坐标都是 唯一 的。"
  ],
  "minimum-number-of-work-sessions-to-finish-the-tasks": [
    "n == tasks.length",
    "1 <= n <= 14",
    "1 <= tasks[i] <= 10",
    "max(tasks[i]) <= sessionTime <= 15"
  ],
  "the-category-of-each-member-in-the-store": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "maximum-number-of-k-divisible-components": [
    "1 <= n <= 3 * 10^4",
    "edges.length == n - 1",
    "edges[i].length == 2",
    "0 <= a_i, b_i < n",
    "values.length == n",
    "0 <= values[i] <= 10^9",
    "1 <= k <= 10^9",
    "values 之和可以被 k 整除。",
    "输入保证 edges 是一棵无向树。"
  ],
  "minimum-pair-removal-to-sort-array-ii": [
    "1 <= nums.length <= 10^5",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "balanced-k-factor-decomposition": [
    "4 <= n <= 10^5",
    "2 <= k <= 5",
    "k 严格小于 n 的正因数的总数。"
  ],
  "count-good-subarrays": [
    "1 <= nums.length <= 10^5",
    "0 <= nums[i] <= 10^9"
  ],
  "zui-xiao-tiao-yue-ci-shu": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "the-maze": [
    "m == maze.length",
    "n == maze[i].length",
    "1 <= m, n <= 100",
    "maze[i][j] is 0 or 1.",
    "start.length == 2",
    "destination.length == 2",
    "0 <= start_row, destination_row < m",
    "0 <= start_col, destination_col < n",
    "球和目的地都在空地上，且初始时它们不在同一位置",
    "迷宫 至少包括 2 块空地"
  ],
  "solve-the-equation": [
    "3 <= equation.length <= 1000",
    "equation 只有一个 '='.",
    "方程由绝对值在 [0, 100] 范围内且无任何前导零的整数和变量 'x' 组成。​​​"
  ],
  "longest-chunked-palindrome-decomposition": [
    "1 <= text.length <= 1000",
    "text 仅由小写英文字符组成"
  ],
  "find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows": [
    "m == mat.length",
    "n == mat.length[i]",
    "1 <= m, n <= 40",
    "1 <= k <= min(200, n ^ m)",
    "1 <= mat[i][j] <= 5000",
    "mat[i] 是一个非递减数组"
  ],
  "buildings-with-an-ocean-view": [
    "1 <= heights.length <= 10^5",
    "1 <= heights[i] <= 10^9"
  ],
  "check-if-a-parentheses-string-can-be-valid": [
    "n == s.length == locked.length",
    "1 <= n <= 10^5",
    "s[i] 要么是 '(' 要么是 ')'。",
    "locked[i] 要么是 '0' 要么是 '1'。"
  ],
  "maximum-sum-of-an-hourglass": [
    "m == grid.length",
    "n == grid[i].length",
    "3 <= m, n <= 150",
    "0 <= grid[i][j] <= 10^6"
  ],
  "maximize-the-minimum-powered-city": [
    "n == stations.length",
    "1 <= n <= 10^5",
    "0 <= stations[i] <= 10^5",
    "0 <= r <= n - 1",
    "0 <= k <= 10^9"
  ],
  "count-increasing-quadruplets": [
    "4 <= nums.length <= 4000",
    "1 <= nums[i] <= nums.length",
    "nums 中所有数字 互不相同，nums 是一个排列。"
  ],
  "join-two-arrays-by-id": [
    "arr1 和 arr2 都是有效的 JSON 数组",
    "在 arr1 和 arr2 中都有唯一的键值 id",
    "2 <= JSON.stringify(arr1).length <= 10^6",
    "2 <= JSON.stringify(arr2).length <= 10^6"
  ],
  "shortest-subarray-with-or-at-least-k-ii": [
    "1 <= nums.length <= 2 * 10^5",
    "0 9",
    "0 <= k <= 10^9"
  ],
  "minimum-cost-path-with-teleportations": [
    "2 <= m, n <= 80",
    "m == grid.length",
    "n == grid[i].length",
    "0 <= grid[i][j] <= 10^4",
    "0 <= k <= 10"
  ],
  "minimum-operations-to-equalize-subarrays": [
    "1 <= n == nums.length <= 4 × 10^4",
    "1 <= nums[i] <= 10^9",
    "1 <= k <= 10^9",
    "1 <= queries.length <= 4 × 10^4",
    "queries[i] = [l_i, r_i]",
    "0 <= l_i <= r_i <= n - 1"
  ],
  "minimum-partition-score": [
    "1 <= nums.length <= 1000",
    "1 <= nums[i] <= 10^4",
    "1 <= k <= nums.length"
  ],
  "escape-a-large-maze": [
    "0 <= blocked.length <= 200",
    "blocked[i].length == 2",
    "0 <= x_i, y_i < 10^6",
    "source.length == target.length == 2",
    "0 <= s_x, s_y, t_x, t_y < 10^6",
    "source != target",
    "题目数据保证 source 和 target 不在封锁列表内"
  ],
  "number-of-submatrices-that-sum-to-target": [
    "1 <= matrix.length <= 100",
    "1 <= matrix[0].length <= 100",
    "-1000 <= matrix[i][j] <= 1000",
    "-10^8 <= target <= 10^8"
  ],
  "sales-analysis-ii": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "range-sum-of-sorted-subarray-sums": [
    "1 <= nums.length <= 10^3",
    "nums.length == n",
    "1 <= nums[i] <= 100",
    "1 <= left <= right <= n * (n + 1) / 2"
  ],
  "design-movie-rental-system": [
    "1 <= n <= 3 * 10^5",
    "1 <= entries.length <= 10^5",
    "0 <= shop_i < n",
    "1 <= movie_i, price_i <= 10^4",
    "每个商店 至多 有一份电影 movie_i 的拷贝。",
    "search，rent，drop 和 report 的调用 总共 不超过 10^5 次。"
  ],
  "calculate-amount-paid-in-taxes": [
    "1 <= brackets.length <= 100",
    "1 <= upper_i <= 1000",
    "0 <= percent_i <= 100",
    "0 <= income <= 1000",
    "upper_i 按递增顺序排列",
    "upper_i 中的所有值 互不相同",
    "最后一个税级的上限大于等于 income"
  ],
  "longest-cycle-in-a-graph": [
    "n == edges.length",
    "2 <= n <= 10^5",
    "-1 <= edges[i] < n",
    "edges[i] != i"
  ],
  "minimum-cost-to-make-array-equal": [
    "n == nums.length == cost.length",
    "1 <= n <= 10^5",
    "1 <= nums[i], cost[i] <= 10^6",
    "测试用例确保输出不超过 2^53-1。"
  ],
  "compute-decimal-representation": [
    "1 <= n <= 10^9"
  ],
  "longest-balanced-substring-ii": [
    "1 <= s.length <= 10^5",
    "s 仅包含字符 'a'、'b' 和 'c'。"
  ],
  "good-subsequence-queries": [
    "2 <= n == nums.length <= 5 * 10^4",
    "1 <= nums[i] <= 5 * 10^4",
    "1 <= queries.length <= 5 * 10^4",
    "queries[i] = [ind_i, val_i]",
    "1 <= val_i, p <= 5 * 10^4",
    "0 <= ind_i <= n - 1"
  ],
  "o8SXZn": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "power-set-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "shortest-supersequence-lcci": [
    "big.length <= 100000",
    "1 <= small.length <= 100000"
  ],
  "word-ladder-ii": [
    "1 <= beginWord.length <= 5",
    "endWord.length == beginWord.length",
    "1 <= wordList.length <= 500",
    "wordList[i].length == beginWord.length",
    "beginWord、endWord 和 wordList[i] 由小写英文字母组成",
    "beginWord != endWord",
    "wordList 中的所有单词 互不相同"
  ],
  "soup-servings": [
    "0 <= n <= 10^9"
  ],
  "exam-room": [
    "1 <= n <= 10^9",
    "保证有学生正坐在座位 p 上。",
    "seat 和 leave 最多被调用 10^4 次。"
  ],
  "array-of-doubled-pairs": [
    "0 <= arr.length <= 3 * 10^4",
    "arr.length 是偶数",
    "-10^5 <= arr[i] <= 10^5"
  ],
  "report-contiguous-dates": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "stone-game-iv": [
    "1 <= n <= 10^5"
  ],
  "equal-sum-arrays-with-minimum-number-of-operations": [
    "1 <= nums1.length, nums2.length <= 10^5",
    "1 <= nums1[i], nums2[i] <= 6"
  ],
  "partition-array-according-to-given-pivot": [
    "1 <= nums.length <= 10^5",
    "-10^6 <= nums[i] <= 10^6",
    "pivot 等于 nums 中的一个元素。"
  ],
  "users-with-two-purchases-within-seven-days": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "minimum-operations-to-reduce-an-integer-to-0": [
    "1 <= n <= 10^5"
  ],
  "prime-pairs-with-target-sum": [
    "1 <= n <= 10^6"
  ],
  "count-symmetric-integers": [
    "1 <= low <= high <= 10^4"
  ],
  "minimum-cost-walk-in-weighted-graph": [
    "1 <= n <= 10^5",
    "0 <= edges.length <= 10^5",
    "edges[i].length == 3",
    "0 <= u_i, v_i <= n - 1",
    "u_i != v_i",
    "0 <= w_i <= 10^5",
    "1 <= query.length <= 10^5",
    "query[i].length == 2",
    "0 <= s_i, t_i <= n - 1"
  ],
  "minimum-operations-to-make-binary-array-elements-equal-to-one-i": [
    "3 <= nums.length <= 10^5",
    "0 <= nums[i] <= 1"
  ],
  "lexicographically-smallest-generated-string": [
    "1 <= n == str1.length <= 10^4",
    "1 <= m == str2.length <= 500",
    "str1 仅由 'T' 或 'F' 组成。",
    "str2 仅由小写英文字母组成。"
  ],
  "hexadecimal-and-hexatrigesimal-conversion": [
    "1 <= n <= 1000"
  ],
  "minimum-time-to-reach-destination-in-directed-graph": [
    "1 <= n <= 10^5",
    "0 <= edges.length <= 10^5",
    "edges[i] == [u_i, v_i, start_i, end_i]",
    "0 <= u_i, v_i <= n - 1",
    "u_i != v_i",
    "0 <= start_i <= end_i <= 10^9"
  ],
  "robot-in-a-grid-lcci": [
    "官方题面未单列数据范围；以题面中的输入说明或表结构为准。"
  ],
  "student-attendance-record-ii": [
    "1 <= n <= 10^5"
  ],
  "k-inverse-pairs-array": [
    "1 <= n <= 1000",
    "0 <= k <= 1000"
  ],
  "rabbits-in-forest": [
    "1 <= answers.length <= 1000",
    "0 <= answers[i] < 1000"
  ],
  "bricks-falling-when-hit": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 200",
    "grid[i][j] 为 0 或 1",
    "1 <= hits.length <= 4 * 10^4",
    "hits[i].length == 2",
    "0 <= x_i <= m - 1",
    "0 <= y_i <= n - 1",
    "所有 (x_i, y_i) 互不相同"
  ],
  "minimum-cost-to-hire-k-workers": [
    "n == quality.length == wage.length",
    "1 <= k <= n <= 10^4",
    "1 <= quality[i], wage[i] <= 10^4"
  ],
  "shortest-way-to-form-string": [
    "1 <= source.length, target.length <= 1000",
    "source 和 target 仅包含英文小写字母。"
  ],
  "prime-arrangements": [
    "1 <= n <= 100"
  ],
  "maximal-network-rank": [
    "2 <= n <= 100",
    "0 <= roads.length <= n * (n - 1) / 2",
    "roads[i].length == 2",
    "0 <= a_i, b_i <= n-1",
    "a_i != b_i",
    "每对城市之间 最多只有一条 道路相连"
  ],
  "car-fleet-ii": [
    "1 <= cars.length <= 10^5",
    "1 <= position_i, speed_i <= 10^6",
    "position_i < position_i+1"
  ],
  "check-if-all-characters-have-equal-number-of-occurrences": [
    "1 <= s.length <= 1000",
    "s 只包含小写英文字母。"
  ],
  "maximum-earnings-from-taxi": [
    "1 <= n <= 10^5",
    "1 <= rides.length <= 3 * 10^4",
    "rides[i].length == 3",
    "1 <= start_i < end_i <= n",
    "1 <= tip_i <= 10^5"
  ],
  "vowels-of-all-substrings": [
    "1 <= word.length <= 10^5",
    "word 由小写英文字母组成"
  ],
  "minimum-difference-in-sums-after-removal-of-elements": [
    "nums.length == 3 * n",
    "1 <= n <= 10^5",
    "1 <= nums[i] <= 10^5"
  ],
  "number-of-flowers-in-full-bloom": [
    "1 <= flowers.length <= 5 * 10^4",
    "flowers[i].length == 2",
    "1 <= start_i <= end_i <= 10^9",
    "1 <= people.length <= 5 * 10^4",
    "1 <= people[i] <= 10^9"
  ],
  "distribute-money-to-maximum-children": [
    "1 <= money <= 200",
    "2 <= children <= 30"
  ],
  "is-object-empty": [
    "obj 是一个有效的 JSON 对象或数组",
    "2 <= JSON.stringify(obj).length <= 10^5"
  ],
  "maximum-odd-binary-number": [
    "1 <= s.length <= 100",
    "s 仅由 '0' 和 '1' 组成",
    "s 中至少包含一个 '1'"
  ],
  "count-complete-substrings": [
    "1 <= word.length <= 10^5",
    "word 只包含小写英文字母。",
    "1 <= k <= word.length"
  ],
  "find-the-k-th-character-in-string-game-i": [
    "1 <= k <= 500"
  ],
  "maximum-k-to-sort-a-permutation": [
    "1 <= n == nums.length <= 10^5",
    "0 <= nums[i] <= n - 1",
    "nums 是从 0 到 n - 1 的一个排列。"
  ],
  "minimum-cost-path-with-edge-reversals": [
    "2 <= n <= 5 * 10^4",
    "1 <= edges.length <= 10^5",
    "edges[i] = [u_i, v_i, w_i]",
    "0 <= u_i, v_i <= n - 1",
    "1 <= w_i <= 1000"
  ],
  "minimum-operations-to-equalize-array": [
    "1 <= n == nums.length <= 100",
    "1 <= nums[i] <= 10^5"
  ],
  "boolean-evaluation-lcci": [
    "运算符的数量不超过 19 个"
  ],
  "add-without-plus-lcci": [
    "a, b 均可能是负数或 0",
    "结果不会溢出 32 位整数"
  ],
  "circus-tower-lcci": [
    "height.length == weight.length <= 10000"
  ],
  "alien-dictionary": [
    "1 <= words.length <= 100",
    "1 <= words[i].length <= 100",
    "words[i] 仅由小写英文字母组成"
  ],
  "valid-word-square": [
    "1 <= words.length <= 500",
    "1 <= words[i].length <= 500",
    "words[i] 仅由小写英文字母组成。"
  ],
  "2-keys-keyboard": [
    "1 <= n <= 1000"
  ],
  "bulb-switcher-ii": [
    "1 <= n <= 1000",
    "0 <= presses <= 1000"
  ],
  "number-of-distinct-islands": [
    "m == grid.length",
    "n == grid[i].length",
    "1 <= m, n <= 50",
    "grid[i][j] 仅包含 0 或 1"
  ],
  "pyramid-transition-matrix": [
    "2 <= bottom.length <= 6",
    "0 <= allowed.length <= 216",
    "allowed[i].length == 3",
    "所有输入字符串中的字母来自集合 {'A', 'B', 'C', 'D', 'E', 'F'}。",
    "allowed 中所有值都是 唯一的"
  ],
  "split-array-with-same-average": [
    "1 <= nums.length <= 30",
    "0 <= nums[i] <= 10^4"
  ],
  "delete-columns-to-make-sorted-iii": [
    "n == strs.length",
    "1 <= n <= 100",
    "1 <= strs[i].length <= 100",
    "strs[i] 由小写英文字母组成"
  ],
  "swap-for-longest-repeated-character-substring": [
    "1 <= text.length <= 20000",
    "text 仅由小写英文字母组成。"
  ],
  "day-of-the-week": [
    "给出的日期一定是在 1971 到 2100 年之间的有效日期。"
  ],
  "design-skiplist": [
    "0 <= num, target <= 2 * 10^4",
    "调用search, add, erase操作次数不大于 5 * 10^4"
  ],
  "minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix": [
    "m == mat.length",
    "n == mat[0].length",
    "1 <= m <= 3",
    "1 <= n <= 3",
    "mat[i][j] 是 0 或 1。"
  ],
  "rank-transform-of-an-array": [
    "0 <= arr.length <= 10^5",
    "-10^9 <= arr[i] <= 10^9"
  ],
  "lucky-numbers-in-a-matrix": [
    "m == mat.length",
    "n == mat[i].length",
    "1 <= n, m <= 50",
    "1 <= matrix[i][j] <= 10^5",
    "矩阵中的所有元素都是不同的"
  ],
  "design-underground-system": [
    "1 <= id, t <= 10^6",
    "1 <= stationName.length, startStation.length, endStation.length <= 10",
    "所有字符串由大小写英文字母与数字组成",
    "总共最多调用 checkIn、checkOut 和 getAverageTime 方法 2 * 10^4 次",
    "与标准答案误差在 10^-5 以内的结果都被视为正确结果"
  ],
  "special-array-with-x-elements-greater-than-or-equal-x": [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 1000"
  ],
  "minimum-number-of-operations-to-convert-time": [
    "current 和 correct 都符合 \"HH:MM\" 格式",
    "current <= correct"
  ],
  "maximum-number-of-distinct-elements-after-operations": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^9",
    "0 <= k <= 10^9"
  ],
  "final-element-after-subarray-deletions": [
    "1 <= nums.length <= 10^5",
    "1 <= nums[i] <= 10^5"
  ],
  "hamming-distance": [
    "0 <= x, y <= 2^31 - 1"
  ],
  "convert-bst-to-greater-tree": [
    "树中的节点数介于 0 和 10^4 之间。",
    "每个节点的值介于 -10^4 和 10^4 之间。",
    "树中的所有值 互不相同。",
    "给定的树为二叉搜索树。"
  ],
  "shortest-unsorted-continuous-subarray": [
    "1 <= nums.length <= 10^4",
    "-10^5 <= nums[i] <= 10^5"
  ],
  "merge-two-binary-trees": [
    "两棵树中的节点数目在范围 [0, 2000] 内",
    "-10^4 <= Node.val <= 10^4"
  ],
  "n-queens-ii": [
    "1 <= n <= 9"
  ],
  "search-in-rotated-sorted-array-ii": [
    "1 <= nums.length <= 5000",
    "-10^4 <= nums[i] <= 10^4",
    "题目数据保证 nums 在预先未知的某个下标上进行了旋转",
    "-10^4 <= target <= 10^4"
  ],
  "recover-binary-search-tree": [
    "树上节点的数目在范围 [2, 1000] 内",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  "check-subtree-lcci": [
    "树的节点数目范围为 [0, 20000]。"
  ],
  "redundant-connection": [
    "n == edges.length",
    "3 <= n <= 1000",
    "edges[i].length == 2",
    "1 <= ai < bi <= edges.length",
    "ai != bi",
    "edges 中无重复元素",
    "给定的图是连通的"
  ],
  "number-of-operations-to-make-network-connected": [
    "1 <= n <= 10^5",
    "1 <= connections.length <= min(n*(n-1)/2, 10^5)",
    "connections[i].length == 2",
    "0 <= connections[i][0], connections[i][1] < n",
    "connections[i][0] != connections[i][1]",
    "没有重复的连接。",
    "两台计算机不会通过多条线缆连接。"
  ],
  "LGjMqU": [
    "链表的长度范围为 [1, 5 * 10^4]",
    "1 <= node.val <= 1000"
  ],
  "maximum-69-number": [
    "1 <= num <= 10^4",
    "num 每一位上的数字都是 6 或者 9。"
  ],
  "QTMn0o": [
    "1 <= nums.length <= 2 * 10^4",
    "-1000 <= nums[i] <= 1000",
    "-10^7 <= k <= 10^7"
  ],
  "chou-shu-lcof": [
    "1 <= n <= 1690"
  ],
  "furthest-point-from-origin": [
    "1 <= moves.length == n <= 50",
    "moves 仅由字符 'L'、'R' 和 '_' 组成"
  ],
  "wtcaE1": [
    "0 <= s.length <= 5 * 10^4",
    "s 由英文字母、数字、符号和空格组成"
  ]
}) satisfies Record<string, string[]>;

export const leetcodeProblemConstraintStats = {
  "problems": 872,
  "constraints": 2556,
  "leetcodeSource": 761,
  "doocsSource": 24,
  "fallback": 87,
  "fallbackSlugs": [
    "combine-two-tables",
    "employees-earning-more-than-their-managers",
    "recyclable-and-low-fat-products",
    "managers-with-at-least-5-direct-reports",
    "rising-temperature",
    "shu-de-zi-jie-gou-lcof",
    "consecutive-numbers",
    "nth-highest-salary",
    "find-customer-referee",
    "monthly-transactions-i",
    "department-highest-salary",
    "average-time-of-process-per-machine",
    "kth-node-from-end-of-list-lcci",
    "average-selling-price",
    "game-play-analysis-iv",
    "rank-scores",
    "game-play-analysis-i",
    "customer-who-visited-but-did-not-make-any-transactions",
    "second-highest-salary",
    "shun-shi-zhen-da-yin-ju-zhen-lcof",
    "employee-bonus",
    "user-activity-for-the-past-30-days-i",
    "calculator-lcci",
    "shu-zu-zhong-de-ni-xu-dui-lcof",
    "sorted-merge-lcci",
    "delete-duplicate-emails",
    "product-sales-analysis-i",
    "triangle-judgement",
    "lowest-common-ancestor-of-a-binary-search-tree",
    "customers-who-never-order",
    "duplicate-emails",
    "article-views-i",
    "word-frequency",
    "trips-and-users",
    "replace-employee-id-with-the-unique-identifier",
    "the-number-of-employees-which-report-to-each-employee",
    "sum-lists-lcci",
    "customer-placing-the-largest-number-of-orders",
    "product-price-at-a-given-date",
    "tenth-line",
    "number-of-unique-subjects-taught-by-each-teacher",
    "human-traffic-of-stadium",
    "sales-person",
    "palindrome-permutation-lcci",
    "exchange-seats",
    "count-salary-categories",
    "is-unique-lcci",
    "not-boring-movies",
    "immediate-food-delivery-ii",
    "confirmation-rate",
    "WqXACV",
    "eight-queens-lcci",
    "bracket-lcci",
    "zero-matrix-lcci",
    "number-of-segments-in-a-string",
    "investments-in-2016",
    "reformat-department-table",
    "last-person-to-fit-in-the-bus",
    "find-users-with-valid-e-mails",
    "coin-bonus",
    "you-le-yuan-de-mi-gong",
    "check-permutation-lcci",
    "friend-requests-ii-who-has-the-most-friends",
    "the-latest-login-in-2020",
    "que-shi-de-shu-zi-lcof",
    "queries-quality-and-percentage",
    "rotate-matrix-lcci",
    "invalid-tweets",
    "find-followers-count",
    "students-and-examinations",
    "Za25hA",
    "t3fKg1",
    "order-two-columns-independently",
    "design-search-autocomplete-system",
    "ip-to-cidr",
    "kplEvH",
    "tournament-winners",
    "number-of-accounts-that-did-not-stream",
    "design-in-memory-file-system",
    "the-category-of-each-member-in-the-store",
    "zui-xiao-tiao-yue-ci-shu",
    "sales-analysis-ii",
    "o8SXZn",
    "power-set-lcci",
    "report-contiguous-dates",
    "users-with-two-purchases-within-seven-days",
    "robot-in-a-grid-lcci"
  ]
} as const;
