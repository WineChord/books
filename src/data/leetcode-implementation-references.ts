export interface LeetcodeImplementationReference {
  language: string;
  status: "Accepted" | "Reference";
  provenance:
    | "my-recent-accepted-submission"
    | "optimized"
    | "generated-reference"
    | "external-reference";
  approachTitle?: string;
  complexity?: string | null;
  license?: string;
  modified?: boolean;
  submittedAt: string | null;
  runtime: string | null;
  memory: string | null;
  sourceTitle: string;
  sourceUrl: string;
  code: string;
}

export const leetcodeImplementationReferences = ({
  "two-sum": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "14.5 MB",
      "sourceTitle": "1. 两数之和 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/two-sum/submissions/723229010/",
      "code": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& a, int t) {\n        int n = a.size();\n        unordered_map<int,int> mp;\n        for(int i = 0; i < n; i++) {\n            if(mp.count(a[i])) return {mp[a[i]], i};\n            mp[t-a[i]] = i;\n        }\n        return {};\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Hash Map Complement Lookup",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "1. 两数之和 hash map study reference",
      "sourceUrl": "https://leetcode.cn/problems/two-sum/description/",
      "code": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> indexByValue;\n\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            auto it = indexByValue.find(complement);\n            if (it != indexByValue.end()) {\n                return {it->second, i};\n            }\n            indexByValue[nums[i]] = i;\n        }\n\n        return {};\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Brute Force Baseline",
      "complexity": "Time $O(n^2)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "1. 两数之和 brute force baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/two-sum/description/",
      "code": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        int n = nums.size();\n\n        for (int first = 0; first < n; ++first) {\n            for (int second = first + 1; second < n; ++second) {\n                if (nums[first] + nums[second] == target) {\n                    return {first, second};\n                }\n            }\n        }\n\n        return {};\n    }\n};"
    }
  ],
  "longest-substring-without-repeating-characters": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "7 ms",
      "memory": "11.8 MB",
      "sourceTitle": "3. 无重复字符的最长子串 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/submissions/723229925/",
      "code": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        int n = s.size();\n        unordered_map<char, int> mp;\n        int pre = -1, res = 0;\n        for(int i = 0; i < n; i++) {\n            if(mp.count(s[i])) pre = max(pre, mp[s[i]]);\n            res = max(res, i - pre);\n            mp[s[i]] = i;\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Last Seen Sliding Window",
      "complexity": "Time $O(n)$ / Space $O(1)$ for byte characters",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "3. 无重复字符的最长子串 lastSeen sliding window reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/",
      "code": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        const int charKinds = 256;\n        vector<int> lastSeen(charKinds, -1);\n        int n = s.size();\n        int left = 0;\n        int best = 0;\n\n        for (int right = 0; right < n; ++right) {\n            unsigned char current = static_cast<unsigned char>(s[right]);\n            left = max(left, lastSeen[current] + 1);\n            best = max(best, right - left + 1);\n            lastSeen[current] = right;\n        }\n\n        return best;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Set-Based Window Baseline",
      "complexity": "Time $O(n)$ / Space $O(min(n, |charset|))$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "3. 无重复字符的最长子串 set window baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/",
      "code": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> window;\n        int n = s.size();\n        int left = 0;\n        int best = 0;\n\n        for (int right = 0; right < n; ++right) {\n            while (window.count(s[right]) > 0) {\n                window.erase(s[left]);\n                ++left;\n            }\n            window.insert(s[right]);\n            best = max(best, right - left + 1);\n        }\n\n        return best;\n    }\n};"
    }
  ],
  "trapping-rain-water": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "3 ms",
      "memory": "26.4 MB",
      "sourceTitle": "42. 接雨水 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/trapping-rain-water/submissions/723230745/",
      "code": "class Solution {\npublic:\n    int trap(vector<int>& a) {\n        int n = a.size(), res = 0;\n        vector<int> s;\n        for(int i = 0; i < n; i++) {\n            while(s.size() && a[i] > a[s.back()]) {\n                int idx = s.back(); s.pop_back();\n                int b = a[idx];\n                if(s.empty()) break;\n                int k = s.back();\n                res += (i-k-1) * (min(a[k], a[i]) - b);\n            }\n            s.push_back(i);\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Two Pointer Main Solution",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "42. 接雨水 two pointer study reference",
      "sourceUrl": "https://leetcode.cn/problems/trapping-rain-water/description/",
      "code": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int n = height.size();\n        if (n < 3) {\n            return 0;\n        }\n\n        int left = 0;\n        int right = n - 1;\n        int leftMax = 0;\n        int rightMax = 0;\n        int water = 0;\n\n        while (left < right) {\n            leftMax = max(leftMax, height[left]);\n            rightMax = max(rightMax, height[right]);\n\n            if (leftMax <= rightMax) {\n                water += leftMax - height[left];\n                ++left;\n            } else {\n                water += rightMax - height[right];\n                --right;\n            }\n        }\n\n        return water;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Prefix/Suffix Max Baseline",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "42. 接雨水 prefix suffix baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/trapping-rain-water/description/",
      "code": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int n = height.size();\n        if (n < 3) {\n            return 0;\n        }\n\n        vector<int> leftMax(n);\n        vector<int> rightMax(n);\n        leftMax[0] = height[0];\n        rightMax[n - 1] = height[n - 1];\n\n        for (int i = 1; i < n; ++i) {\n            leftMax[i] = max(leftMax[i - 1], height[i]);\n        }\n        for (int i = n - 2; i >= 0; --i) {\n            rightMax[i] = max(rightMax[i + 1], height[i]);\n        }\n\n        int water = 0;\n        for (int i = 1; i + 1 < n; ++i) {\n            water += min(leftMax[i], rightMax[i]) - height[i];\n        }\n\n        return water;\n    }\n};"
    }
  ],
  "jump-game-ii": [
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Greedy BFS Layer",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "45. 跳跃游戏 II greedy study reference",
      "sourceUrl": "https://leetcode.cn/problems/jump-game-ii/description/",
      "code": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        int n = nums.size();\n        int jumps = 0;\n        int currentEnd = 0;\n        int farthest = 0;\n\n        for (int i = 0; i + 1 < n; ++i) {\n            farthest = max(farthest, i + nums[i]);\n            if (i == currentEnd) {\n                ++jumps;\n                currentEnd = farthest;\n            }\n        }\n\n        return jumps;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "DP Baseline",
      "complexity": "Time $O(n^3)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "45. 跳跃游戏 II DP baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/jump-game-ii/description/",
      "code": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        int n = nums.size();\n        const int unreachable = n + 1;\n        vector<int> dp(n, unreachable);\n        dp[0] = 0;\n\n        for (int i = 0; i < n; ++i) {\n            for (int step = 1; step <= nums[i] && i + step < n; ++step) {\n                dp[i + step] = min(dp[i + step], dp[i] + 1);\n            }\n        }\n\n        return dp[n - 1];\n    }\n};"
    }
  ],
  "group-anagrams": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "15 ms",
      "memory": "23.5 MB",
      "sourceTitle": "49. 字母异位词分组 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/group-anagrams/submissions/723230131/",
      "code": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& ss) {\n        vector<vector<string>> res;\n        unordered_map<string, vector<string>> mp;\n        for(auto& s: ss) {\n            auto t = s;\n            sort(t.begin(), t.end());\n            mp[t].push_back(s);\n        }\n        for(auto& [k,v]: mp) res.push_back(move(v));\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Sorting Key Main Solution",
      "complexity": "Time $O(n * k \\log k)$ / Space $O(n * k)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "49. 字母异位词分组 sorting key study reference",
      "sourceUrl": "https://leetcode.cn/problems/group-anagrams/description/",
      "code": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        vector<vector<string>> groups;\n        unordered_map<string, size_t> groupIndexByKey;\n\n        for (const string& word : strs) {\n            string key = word;\n            sort(key.begin(), key.end());\n\n            if (groupIndexByKey.count(key) == 0) {\n                groupIndexByKey[key] = groups.size();\n                groups.push_back({});\n            }\n            groups[groupIndexByKey[key]].push_back(word);\n        }\n\n        return groups;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Counting Key Variant",
      "complexity": "Time $O(n * (k + c))$ / Space $O(n * (k + c))$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "49. 字母异位词分组 counting key variant reference",
      "sourceUrl": "https://leetcode.cn/problems/group-anagrams/description/",
      "code": "class Solution {\n    string buildKey(const string& word) {\n        const int alphabetSize = 26;\n        const char firstLetter = 'a';\n        const char separator = '#';\n        vector<int> counts(alphabetSize);\n\n        for (char letter : word) {\n            ++counts[letter - firstLetter];\n        }\n\n        string key;\n        for (int count : counts) {\n            key.push_back(separator);\n            key += to_string(count);\n        }\n        return key;\n    }\n\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        vector<vector<string>> groups;\n        unordered_map<string, size_t> groupIndexByKey;\n\n        for (const string& word : strs) {\n            string key = buildKey(word);\n            if (groupIndexByKey.count(key) == 0) {\n                groupIndexByKey[key] = groups.size();\n                groups.push_back({});\n            }\n            groups[groupIndexByKey[key]].push_back(word);\n        }\n\n        return groups;\n    }\n};"
    }
  ],
  "lru-cache": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "82 ms",
      "memory": "169.1 MB",
      "sourceTitle": "146. LRU 缓存 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/lru-cache/submissions/723232998/",
      "code": "struct Node {\n    int k, v;\n    Node* pre;\n    Node* nxt;\n};\nclass LRUCache {\n    int cap;\n    Node* head;\n    Node* tail;\n    unordered_map<int, Node*> mp;\n    void addfront(Node* n) {\n        n->nxt = head->nxt;\n        n->pre = head;\n        head->nxt->pre = n;\n        head->nxt = n;\n    }\n    void del(Node* n) {\n        n->nxt->pre = n->pre;\n        n->pre->nxt = n->nxt;\n    }\n    void delback() {\n        auto n = tail->pre;\n        del(n);\n        mp.erase(n->k);\n    }\n    void touch(int k) {\n        auto n = mp[k];\n        del(n);\n        addfront(n);\n    }\npublic:\n    LRUCache(int cap) : cap(cap) {\n        head = new Node(-1,-1);\n        tail = new Node(-1,-1);\n        head->nxt = tail;\n        tail->pre = head;\n    }\n\n    int get(int key) {\n        if(!mp.count(key)) return -1;\n        touch(key);\n        return mp[key]->v;\n    }\n\n    void put(int key, int val) {\n        if(mp.count(key)) {\n            touch(key);\n            mp[key]->v = val;\n            return;\n        }\n        if(mp.size() >= cap) {\n            delback();\n        }\n        auto n = new Node(key, val);\n        addfront(n);\n        mp[key] = n;\n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "STL List Iterator Main Solution",
      "complexity": "Time $O(1)$ per operation / Space $O(capacity)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "146. LRU 缓存 std::list study reference",
      "sourceUrl": "https://leetcode.cn/problems/lru-cache/description/",
      "code": "class LRUCache {\n    using Entry = pair<int, int>;\n\n    int capacity;\n    list<Entry> items;\n    unordered_map<int, list<Entry>::iterator> iteratorByKey;\n\npublic:\n    LRUCache(int capacity) : capacity(capacity) {}\n\n    int get(int key) {\n        auto it = iteratorByKey.find(key);\n        if (it == iteratorByKey.end()) {\n            return -1;\n        }\n\n        items.splice(items.begin(), items, it->second);\n        return it->second->second;\n    }\n\n    void put(int key, int value) {\n        if (capacity <= 0) {\n            return;\n        }\n\n        auto it = iteratorByKey.find(key);\n        if (it != iteratorByKey.end()) {\n            it->second->second = value;\n            items.splice(items.begin(), items, it->second);\n            return;\n        }\n\n        if (items.size() == static_cast<size_t>(capacity)) {\n            int oldestKey = items.back().first;\n            iteratorByKey.erase(oldestKey);\n            items.pop_back();\n        }\n\n        items.emplace_front(key, value);\n        iteratorByKey[key] = items.begin();\n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Manual Doubly Linked List Variant",
      "complexity": "Time $O(1)$ per operation / Space $O(capacity)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "146. LRU 缓存 manual linked list variant reference",
      "sourceUrl": "https://leetcode.cn/problems/lru-cache/description/",
      "code": "class LRUCache {\n    struct Node {\n        int key;\n        int value;\n        Node* prev;\n        Node* next;\n\n        Node(int key, int value)\n            : key(key), value(value), prev(nullptr), next(nullptr) {}\n    };\n\n    int capacity;\n    unordered_map<int, Node*> nodeByKey;\n    Node* head;\n    Node* tail;\n\n    void addAfterHead(Node* node) {\n        node->prev = head;\n        node->next = head->next;\n        head->next->prev = node;\n        head->next = node;\n    }\n\n    void removeNode(Node* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n\n    void moveToFront(Node* node) {\n        removeNode(node);\n        addAfterHead(node);\n    }\n\n    Node* removeOldest() {\n        Node* node = tail->prev;\n        removeNode(node);\n        return node;\n    }\n\npublic:\n    LRUCache(int capacity) : capacity(capacity) {\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head->next = tail;\n        tail->prev = head;\n    }\n\n    ~LRUCache() {\n        Node* current = head;\n        while (current != nullptr) {\n            Node* next = current->next;\n            delete current;\n            current = next;\n        }\n    }\n\n    int get(int key) {\n        auto it = nodeByKey.find(key);\n        if (it == nodeByKey.end()) {\n            return -1;\n        }\n\n        Node* node = it->second;\n        moveToFront(node);\n        return node->value;\n    }\n\n    void put(int key, int value) {\n        if (capacity <= 0) {\n            return;\n        }\n\n        auto it = nodeByKey.find(key);\n        if (it != nodeByKey.end()) {\n            Node* node = it->second;\n            node->value = value;\n            moveToFront(node);\n            return;\n        }\n\n        if (nodeByKey.size() == static_cast<size_t>(capacity)) {\n            Node* oldest = removeOldest();\n            nodeByKey.erase(oldest->key);\n            delete oldest;\n        }\n\n        Node* node = new Node(key, value);\n        addAfterHead(node);\n        nodeByKey[key] = node;\n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */"
    }
  ],
  "longest-palindromic-substring": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "3 ms",
      "memory": "11.3 MB",
      "sourceTitle": "5. 最长回文子串 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/longest-palindromic-substring/submissions/723231374/",
      "code": "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        int n = s.size();\n        string t = \"^#\";\n        for(auto c: s) t.push_back(c), t.push_back('#');\n        t.push_back('$');\n        int m = t.size();\n        vector<int> p(m);\n        int c = 0, maxr = 0;\n        int st = 0, len = 0;\n        for(int i = 1; i < m-1; i++) {\n            int k = 2*c - i;\n            if(k > 0) p[i] = min(p[k], maxr-i);\n            while(t[i-p[i]-1] == t[i+p[i]+1]) p[i]++;\n            if(i+p[i] > maxr) maxr = i+p[i], c = i;\n            if(p[i] > len) len = p[i], st = (i-p[i])/2;\n        }\n        return s.substr(st, len);\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Center Expansion Main Solution",
      "complexity": "Time $O(n^2)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "5. 最长回文子串 center expansion study reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-palindromic-substring/description/",
      "code": "class Solution {\n    pair<int, int> expandFromCenter(\n        const string& s,\n        int left,\n        int right\n    ) {\n        int n = s.size();\n        while (left >= 0 && right < n && s[left] == s[right]) {\n            --left;\n            ++right;\n        }\n        return {left + 1, right - left - 1};\n    }\n\npublic:\n    string longestPalindrome(string s) {\n        int n = s.size();\n        int bestStart = 0;\n        int bestLength = 0;\n\n        for (int center = 0; center < n; ++center) {\n            auto odd = expandFromCenter(s, center, center);\n            if (odd.second > bestLength) {\n                bestStart = odd.first;\n                bestLength = odd.second;\n            }\n\n            auto even = expandFromCenter(s, center, center + 1);\n            if (even.second > bestLength) {\n                bestStart = even.first;\n                bestLength = even.second;\n            }\n        }\n\n        return s.substr(bestStart, bestLength);\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "DP Baseline",
      "complexity": "Time $O(n^2)$ / Space $O(n^2)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "5. 最长回文子串 DP baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-palindromic-substring/description/",
      "code": "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        int n = s.size();\n        if (n <= 1) {\n            return s;\n        }\n\n        const int maxLengthWithoutInner = 2;\n        vector<vector<bool>> dp(n, vector<bool>(n));\n        int bestStart = 0;\n        int bestLength = 1;\n\n        for (int left = n - 1; left >= 0; --left) {\n            dp[left][left] = true;\n            for (int right = left + 1; right < n; ++right) {\n                int length = right - left + 1;\n                bool sameEnds = s[left] == s[right];\n                bool hasNoInner = length <= maxLengthWithoutInner;\n                bool innerPalindrome = hasNoInner || dp[left + 1][right - 1];\n\n                dp[left][right] = sameEnds && innerPalindrome;\n                if (dp[left][right] && length > bestLength) {\n                    bestStart = left;\n                    bestLength = length;\n                }\n            }\n        }\n\n        return s.substr(bestStart, bestLength);\n    }\n};"
    }
  ],
  "longest-consecutive-sequence": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "95 ms",
      "memory": "86.9 MB",
      "sourceTitle": "128. 最长连续序列 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/longest-consecutive-sequence/submissions/723242228/",
      "code": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& a) {\n        unordered_set<int> s(a.begin(), a.end());\n        int res = 0;\n        while(s.size()) {\n            auto it = s.begin();\n            int x = *it; s.erase(it);\n            int l = x;\n            while(s.count(l-1)) s.erase(l-1), l--;\n            int r = x;\n            while(s.count(r+1)) s.erase(r+1), r++;\n            res = max(res, r-l+1);\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Hash Set Sequence Starts",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "128. 最长连续序列 hash set study reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-consecutive-sequence/description/",
      "code": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> values(nums.begin(), nums.end());\n        const int minValue = numeric_limits<int>::min();\n        const int maxValue = numeric_limits<int>::max();\n        int best = 0;\n\n        for (int value : values) {\n            if (value != minValue && values.count(value - 1) > 0) {\n                continue;\n            }\n\n            int current = value;\n            int length = 1;\n            while (current != maxValue && values.count(current + 1) > 0) {\n                ++current;\n                ++length;\n            }\n            best = max(best, length);\n        }\n\n        return best;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Sorting Baseline",
      "complexity": "Time $O(n \\log n)$ / Space $O(1)$ excluding sorting",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "128. 最长连续序列 sorting baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-consecutive-sequence/description/",
      "code": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        int n = nums.size();\n        if (n == 0) {\n            return 0;\n        }\n\n        sort(nums.begin(), nums.end());\n        int best = 1;\n        int currentLength = 1;\n\n        for (int i = 1; i < n; ++i) {\n            if (nums[i] == nums[i - 1]) {\n                continue;\n            }\n            if (nums[i] == nums[i - 1] + 1) {\n                ++currentLength;\n            } else {\n                currentLength = 1;\n            }\n            best = max(best, currentLength);\n        }\n\n        return best;\n    }\n};"
    }
  ],
  "3sum": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "51 ms",
      "memory": "28.6 MB",
      "sourceTitle": "15. 三数之和 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/3sum/submissions/723246104/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& a) {\n        int n = a.size();\n        sort(a.begin(), a.end());\n        vector<vector<int>> res;\n        for(int i = 0; i < n-2; i++) {\n            int t = -a[i];\n            int l = i+1, r = n-1;\n            while(l < r) {\n                if(a[l] + a[r] > t) r--;\n                else if(a[l] + a[r] < t) l++;\n                else if(a[l] + a[r] == t) {\n                    res.push_back({a[i],a[l],a[r]});\n                    l++; r--;\n                    while(l < r && a[l] == a[l-1]) l++;\n                    while(l < r && a[r] == a[r+1]) r--;\n                }\n            }\n            while(i < n-2 && a[i] == a[i+1]) i++;\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Sorting + Two Pointers Main Solution",
      "complexity": "Time $O(n^2)$ / Space $O(\\log n)$ excluding output",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "15. 三数之和 sorting two pointers study reference",
      "sourceUrl": "https://leetcode.cn/problems/3sum/description/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        vector<vector<int>> triples;\n        sort(nums.begin(), nums.end());\n        int n = nums.size();\n\n        for (int first = 0; first + 2 < n; ++first) {\n            if (nums[first] > 0) {\n                break;\n            }\n            if (first > 0 && nums[first] == nums[first - 1]) {\n                continue;\n            }\n\n            int left = first + 1;\n            int right = n - 1;\n            int target = -nums[first];\n\n            while (left < right) {\n                int sum = nums[left] + nums[right];\n                if (sum < target) {\n                    ++left;\n                } else if (sum > target) {\n                    --right;\n                } else {\n                    triples.push_back({nums[first], nums[left], nums[right]});\n                    ++left;\n                    --right;\n                    while (left < right && nums[left] == nums[left - 1]) {\n                        ++left;\n                    }\n                    while (left < right && nums[right] == nums[right + 1]) {\n                        --right;\n                    }\n                }\n            }\n        }\n\n        return triples;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Hash Set Two Sum Baseline",
      "complexity": "Average time $O(n^2)$ / Space $O(n)$ excluding output",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "15. 三数之和 hash set baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/3sum/description/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        vector<vector<int>> triples;\n        sort(nums.begin(), nums.end());\n        int n = nums.size();\n\n        for (int first = 0; first + 2 < n; ++first) {\n            if (nums[first] > 0) {\n                break;\n            }\n            if (first > 0 && nums[first] == nums[first - 1]) {\n                continue;\n            }\n\n            unordered_set<int> seen;\n            for (int second = first + 1; second < n; ++second) {\n                int third = -nums[first] - nums[second];\n                if (seen.count(third) > 0) {\n                    triples.push_back({nums[first], third, nums[second]});\n                    while (second + 1 < n && nums[second + 1] == nums[second]) {\n                        ++second;\n                    }\n                }\n                seen.insert(nums[second]);\n            }\n        }\n\n        return triples;\n    }\n};"
    }
  ],
  "climbing-stairs": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "7.7 MB",
      "sourceTitle": "70. 爬楼梯 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/climbing-stairs/submissions/723247208/",
      "code": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if(n <= 2) return n;\n        // 1: 1\n        // 2: 2\n        int f = 1, g = 2;\n        for(int i = 2; i < n; i++) {\n            g = f + g;\n            f = g - f;\n        }\n        return g;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Rolling Variables Main Solution",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "70. 爬楼梯 rolling DP study reference",
      "sourceUrl": "https://leetcode.cn/problems/climbing-stairs/description/",
      "code": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) {\n            return n;\n        }\n\n        int waysTwoStepsBefore = 1;\n        int waysOneStepBefore = 2;\n\n        for (int step = 3; step <= n; ++step) {\n            int currentWays = waysOneStepBefore + waysTwoStepsBefore;\n            waysTwoStepsBefore = waysOneStepBefore;\n            waysOneStepBefore = currentWays;\n        }\n\n        return waysOneStepBefore;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "DP Table Baseline",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "70. 爬楼梯 DP table baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/climbing-stairs/description/",
      "code": "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) {\n            return n;\n        }\n\n        vector<int> dp(n + 1);\n        dp[1] = 1;\n        dp[2] = 2;\n\n        for (int step = 3; step <= n; ++step) {\n            dp[step] = dp[step - 1] + dp[step - 2];\n        }\n\n        return dp[n];\n    }\n};"
    }
  ],
  "subarray-sum-equals-k": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "41 ms",
      "memory": "44.5 MB",
      "sourceTitle": "560. 和为 K 的子数组 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/subarray-sum-equals-k/submissions/723255456/",
      "code": "class Solution {\npublic:\n    int subarraySum(vector<int>& a, int k) {\n        int n = a.size();\n        unordered_map<int, int> mp;\n        mp[0] = 1;\n        int s = 0, res = 0;\n        for(int i = 0; i < n; i++) {\n            s += a[i];\n            if(mp.count(s-k)) res += mp[s-k];\n            mp[s]++;\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Prefix Sum Hash Count",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "560. 和为 K 的子数组 prefix sum hash study reference",
      "sourceUrl": "https://leetcode.cn/problems/subarray-sum-equals-k/description/",
      "code": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> countByPrefix;\n        countByPrefix[0] = 1;\n        int prefixSum = 0;\n        int answer = 0;\n\n        for (int num : nums) {\n            prefixSum += num;\n            int neededPrefix = prefixSum - k;\n            auto it = countByPrefix.find(neededPrefix);\n            if (it != countByPrefix.end()) {\n                answer += it->second;\n            }\n            ++countByPrefix[prefixSum];\n        }\n\n        return answer;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Prefix Enumeration Baseline",
      "complexity": "Time $O(n^2)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "560. 和为 K 的子数组 prefix enumeration baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/subarray-sum-equals-k/description/",
      "code": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int n = nums.size();\n        vector<int> prefix(n + 1);\n\n        for (int i = 0; i < n; ++i) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n\n        int answer = 0;\n        for (int left = 0; left < n; ++left) {\n            for (int right = left + 1; right <= n; ++right) {\n                if (prefix[right] - prefix[left] == k) {\n                    ++answer;\n                }\n            }\n        }\n\n        return answer;\n    }\n};"
    }
  ],
  "add-two-numbers": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "75.3 MB",
      "sourceTitle": "2. 两数相加 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/add-two-numbers/submissions/723256722/",
      "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        auto d = new ListNode(-1);\n        auto p = d; int up = 0;\n        while(l1 || l2 || up) {\n            int x = l1 ? l1->val : 0;\n            int y = l2 ? l2->val : 0;\n            int z = x + y + up;\n            p->next = new ListNode(z%10);\n            p = p->next; up = z / 10;\n            l1 = l1 ? l1->next : nullptr;\n            l2 = l2 ? l2->next : nullptr;\n        }\n        return d->next;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Dummy Head New Nodes",
      "complexity": "Time $O(n + m)$ / Space $O(n + m)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "2. 两数相加 dummy head study reference",
      "sourceUrl": "https://leetcode.cn/problems/add-two-numbers/description/",
      "code": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        const int base = 10;\n        ListNode dummy;\n        ListNode* tail = &dummy;\n        int carry = 0;\n\n        while (l1 != nullptr || l2 != nullptr || carry != 0) {\n            int sum = carry;\n            if (l1 != nullptr) {\n                sum += l1->val;\n                l1 = l1->next;\n            }\n            if (l2 != nullptr) {\n                sum += l2->val;\n                l2 = l2->next;\n            }\n\n            tail->next = new ListNode(sum % base);\n            tail = tail->next;\n            carry = sum / base;\n        }\n\n        return dummy.next;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "In-Place Node Reuse Variant",
      "complexity": "Time $O(n + m)$ / Space $O(1)$ extra",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "2. 两数相加 in-place reuse variant reference",
      "sourceUrl": "https://leetcode.cn/problems/add-two-numbers/description/",
      "code": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        const int base = 10;\n        ListNode dummy;\n        ListNode* tail = &dummy;\n        int carry = 0;\n\n        while (l1 != nullptr || l2 != nullptr) {\n            int sum = carry;\n            ListNode* node = nullptr;\n\n            if (l1 != nullptr) {\n                node = l1;\n                sum += l1->val;\n                l1 = l1->next;\n            }\n            if (l2 != nullptr) {\n                if (node == nullptr) {\n                    node = l2;\n                }\n                sum += l2->val;\n                l2 = l2->next;\n            }\n\n            node->val = sum % base;\n            tail->next = node;\n            tail = node;\n            carry = sum / base;\n        }\n\n        if (carry != 0) {\n            tail->next = new ListNode(carry);\n            tail = tail->next;\n        }\n        tail->next = nullptr;\n\n        return dummy.next;\n    }\n};"
    }
  ],
  "container-with-most-water": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "61.5 MB",
      "sourceTitle": "11. 盛最多水的容器 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/container-with-most-water/submissions/723257136/",
      "code": "class Solution {\npublic:\n    int maxArea(vector<int>& a) {\n        int n = a.size(), res = 0;\n        int l = 0, r = n-1;\n        while(l < r) {\n            res = max(res, min(a[l], a[r])*(r-l));\n            if(a[l] < a[r]) l++;\n            else r--;\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Two Pointers",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "11. 盛最多水的容器 two pointer study reference",
      "sourceUrl": "https://leetcode.cn/problems/container-with-most-water/description/",
      "code": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0;\n        int right = height.size() - 1;\n        int best = 0;\n\n        while (left < right) {\n            int width = right - left;\n            int containerHeight = min(height[left], height[right]);\n            best = max(best, width * containerHeight);\n\n            if (height[left] < height[right]) {\n                ++left;\n            } else {\n                --right;\n            }\n        }\n\n        return best;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Brute Force Baseline",
      "complexity": "Time $O(n^2)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "11. 盛最多水的容器 brute force baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/container-with-most-water/description/",
      "code": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int n = height.size();\n        int best = 0;\n\n        for (int left = 0; left < n; ++left) {\n            for (int right = left + 1; right < n; ++right) {\n                int width = right - left;\n                int containerHeight = min(height[left], height[right]);\n                best = max(best, width * containerHeight);\n            }\n        }\n\n        return best;\n    }\n};"
    }
  ],
  "number-of-islands": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "33 ms",
      "memory": "17.3 MB",
      "sourceTitle": "200. 岛屿数量 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/number-of-islands/submissions/723263800/",
      "code": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& a) {\n        int n = a.size(), m = a[0].size(), res = 0;\n        int dx[4] = {0, 0, 1, -1};\n        int dy[4] = {1, -1, 0, 0};\n        vector<vector<int>> vis(n, vector<int>(m));\n        auto dfs = [&](this auto&& dfs, int x, int y) -> void {\n            vis[x][y] = 1;\n            for(int i = 0; i < 4; i++) {\n                int nx = x + dx[i];\n                int ny = y + dy[i];\n                if(nx < 0 || ny < 0 || nx >= n || ny >= m) continue;\n                if(a[nx][ny] == '0') continue;\n                if(vis[nx][ny]) continue;\n                dfs(nx, ny);\n            }\n        };\n        for(int i = 0; i < n; i++)\n            for(int j = 0; j < m; j++) {\n                if(vis[i][j]) continue;\n                if(a[i][j] == '0') continue;\n                dfs(i, j); res++;\n            }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "DFS Flood Fill",
      "complexity": "Time $O(mn)$ / Space $O(mn)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "200. 岛屿数量 DFS flood-fill study reference",
      "sourceUrl": "https://leetcode.cn/problems/number-of-islands/description/",
      "code": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int rows = grid.size();\n        int cols = grid[0].size();\n        int islands = 0;\n        vector<vector<bool>> visited(rows, vector<bool>(cols, false));\n        const vector<int> rowDelta = {1, -1, 0, 0};\n        const vector<int> colDelta = {0, 0, 1, -1};\n        const size_t directionCount = rowDelta.size();\n        const char land = '1';\n\n        function<void(int, int)> dfs = [&](int row, int col) {\n            visited[row][col] = true;\n\n            for (size_t direction = 0; direction < directionCount; ++direction) {\n                int nextRow = row + rowDelta[direction];\n                int nextCol = col + colDelta[direction];\n\n                if (nextRow < 0 || nextRow >= rows) {\n                    continue;\n                }\n                if (nextCol < 0 || nextCol >= cols) {\n                    continue;\n                }\n                if (visited[nextRow][nextCol]) {\n                    continue;\n                }\n                if (grid[nextRow][nextCol] != land) {\n                    continue;\n                }\n\n                dfs(nextRow, nextCol);\n            }\n        };\n\n        for (int row = 0; row < rows; ++row) {\n            for (int col = 0; col < cols; ++col) {\n                if (visited[row][col] || grid[row][col] != land) {\n                    continue;\n                }\n\n                ++islands;\n                dfs(row, col);\n            }\n        }\n\n        return islands;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "BFS Queue Flood Fill",
      "complexity": "Time $O(mn)$ / Space $O(mn)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "200. 岛屿数量 BFS queue study reference",
      "sourceUrl": "https://leetcode.cn/problems/number-of-islands/description/",
      "code": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int rows = grid.size();\n        int cols = grid[0].size();\n        int islands = 0;\n        const vector<int> rowDelta = {1, -1, 0, 0};\n        const vector<int> colDelta = {0, 0, 1, -1};\n        const size_t directionCount = rowDelta.size();\n        const char land = '1';\n        const char water = '0';\n\n        for (int row = 0; row < rows; ++row) {\n            for (int col = 0; col < cols; ++col) {\n                if (grid[row][col] != land) {\n                    continue;\n                }\n\n                ++islands;\n                grid[row][col] = water;\n                queue<pair<int, int>> cells;\n                cells.push({row, col});\n\n                while (!cells.empty()) {\n                    auto [currentRow, currentCol] = cells.front();\n                    cells.pop();\n\n                    for (size_t direction = 0; direction < directionCount; ++direction) {\n                        int nextRow = currentRow + rowDelta[direction];\n                        int nextCol = currentCol + colDelta[direction];\n\n                        if (nextRow < 0 || nextRow >= rows) {\n                            continue;\n                        }\n                        if (nextCol < 0 || nextCol >= cols) {\n                            continue;\n                        }\n                        if (grid[nextRow][nextCol] != land) {\n                            continue;\n                        }\n\n                        grid[nextRow][nextCol] = water;\n                        cells.push({nextRow, nextCol});\n                    }\n                }\n            }\n        }\n\n        return islands;\n    }\n};"
    }
  ],
  "median-of-two-sorted-arrays": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "92.9 MB",
      "sourceTitle": "4. 寻找两个正序数组的中位数 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/median-of-two-sorted-arrays/submissions/723261647/",
      "code": "#define INF 0x3f3f3f3f\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& a1, vector<int>& a2) {\n        int n = a1.size(), m = a2.size();\n        int t = (n+m+1) / 2;\n        int l = max(0, t-m), r = min(n, t);\n        while(l <= r) {\n            int c1 = (l+r)/2; int c2 = t-c1;\n            int x1 = c1 ? a1[c1-1] : -INF;\n            int x2 = c2 ? a2[c2-1] : -INF;\n            int y1 = c1 == n ? INF : a1[c1];\n            int y2 = c2 == m ? INF : a2[c2];\n            if(x1 > y2) r = c1-1;\n            else if(x2 > y1) l = c1+1;\n            else {\n                if((n+m)%2) return max(x1, x2);\n                return 1.0*(max(x1, x2) + min(y1, y2))/2;\n            }\n        }\n        return -1;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "K-th Element Divide and Conquer",
      "complexity": "Time $O(\\log(m+n))$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "4. 寻找两个正序数组的中位数 k-th element study reference",
      "sourceUrl": "https://leetcode.cn/problems/median-of-two-sorted-arrays/description/",
      "code": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int total = nums1.size() + nums2.size();\n        int left = findKth(nums1, nums2, (total + 1) / 2);\n        int right = findKth(nums1, nums2, (total + 2) / 2);\n        return (left + right) / 2.0;\n    }\n\nprivate:\n    int findKth(vector<int>& nums1, vector<int>& nums2, int k) {\n        int index1 = 0;\n        int index2 = 0;\n        int size1 = nums1.size();\n        int size2 = nums2.size();\n\n        while (true) {\n            if (index1 == size1) {\n                return nums2[index2 + k - 1];\n            }\n            if (index2 == size2) {\n                return nums1[index1 + k - 1];\n            }\n            if (k == 1) {\n                return min(nums1[index1], nums2[index2]);\n            }\n\n            int half = k / 2;\n            int next1 = min(index1 + half, size1) - 1;\n            int next2 = min(index2 + half, size2) - 1;\n\n            if (nums1[next1] <= nums2[next2]) {\n                k -= next1 - index1 + 1;\n                index1 = next1 + 1;\n            } else {\n                k -= next2 - index2 + 1;\n                index2 = next2 + 1;\n            }\n        }\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Merge Until Middle Baseline",
      "complexity": "Time $O(m+n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "4. 寻找两个正序数组的中位数 merge baseline study reference",
      "sourceUrl": "https://leetcode.cn/problems/median-of-two-sorted-arrays/description/",
      "code": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int size1 = nums1.size();\n        int size2 = nums2.size();\n        int total = size1 + size2;\n        int middle = total / 2;\n        int index1 = 0;\n        int index2 = 0;\n        int previous = 0;\n        int current = 0;\n\n        for (int step = 0; step <= middle; ++step) {\n            previous = current;\n            if (index2 == size2 ||\n                (index1 < size1 && nums1[index1] <= nums2[index2])) {\n                current = nums1[index1];\n                ++index1;\n            } else {\n                current = nums2[index2];\n                ++index2;\n            }\n        }\n\n        if (total % 2 == 1) {\n            return current;\n        }\n        return (previous + current) / 2.0;\n    }\n};"
    }
  ],
  "merge-intervals": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "4 ms",
      "memory": "23.5 MB",
      "sourceTitle": "56. 合并区间 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/merge-intervals/submissions/723264646/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& a) {\n        sort(a.begin(), a.end());\n        vector<vector<int>> res;\n        res.push_back(a[0]);\n        for(int i = 1; i < a.size(); i++) {\n            int l = a[i][0], r = a[i][1];\n            int& x = res.back()[0];\n            int& y = res.back()[1];\n            if(l <= y) y = max(y, r);\n            else res.push_back(a[i]);\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Sort and Scan",
      "complexity": "Time $O(n \\log n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "56. 合并区间 sort and scan study reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-intervals/description/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) {\n            return {};\n        }\n\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged;\n        vector<int> current = intervals[0];\n\n        for (int index = 1; index < intervals.size(); ++index) {\n            int nextStart = intervals[index][0];\n            int nextEnd = intervals[index][1];\n\n            if (nextStart <= current[1]) {\n                current[1] = max(current[1], nextEnd);\n            } else {\n                merged.push_back(current);\n                current = intervals[index];\n            }\n        }\n\n        merged.push_back(current);\n        return merged;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Insertion-Style Baseline",
      "complexity": "Time $O(n^2)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "56. 合并区间 insertion baseline study reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-intervals/description/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        vector<vector<int>> merged;\n\n        for (vector<int> interval : intervals) {\n            bool changed = true;\n\n            while (changed) {\n                changed = false;\n\n                for (int index = 0; index < merged.size(); ++index) {\n                    if (overlap(interval, merged[index])) {\n                        interval[0] = min(interval[0], merged[index][0]);\n                        interval[1] = max(interval[1], merged[index][1]);\n                        merged.erase(merged.begin() + index);\n                        changed = true;\n                        break;\n                    }\n                }\n            }\n\n            merged.push_back(interval);\n        }\n\n        return merged;\n    }\n\nprivate:\n    bool overlap(const vector<int>& first, const vector<int>& second) {\n        return first[0] <= second[1] && second[0] <= first[1];\n    }\n};"
    }
  ],
  "kth-largest-element-in-an-array": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "58.1 MB",
      "sourceTitle": "215. 数组中的第K个最大元素 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/kth-largest-element-in-an-array/submissions/723270636/",
      "code": "class Solution {\npublic:\n    int findKthLargest(vector<int>& a, int k) {\n        int n = a.size();\n        k = n - k;\n        auto part = [&](this auto&& part, int l, int r) -> void {\n            if(l >= r) return;\n            int p = rand() % (r-l+1) + l;\n            int v = a[p];\n            int i = l-1, j = r+1;\n            while(true) {\n                do i++; while(a[i] < v);\n                do j--; while(a[j] > v);\n                if(i >= j) break;\n                swap(a[i], a[j]);\n            }\n            if(k <= j) part(l, j);\n            else part(j+1, r);\n        };\n        part(0, n-1);\n        return a[k];\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Quickselect",
      "complexity": "Average Time $O(n)$, Worst Time $O(n^2)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "215. 数组中的第K个最大元素 quickselect study reference",
      "sourceUrl": "https://leetcode.cn/problems/kth-largest-element-in-an-array/description/",
      "code": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        int target = nums.size() - k;\n        int left = 0;\n        int right = nums.size() - 1;\n\n        while (left <= right) {\n            int pivotIndex = left + rand() % (right - left + 1);\n            int finalIndex = partition(nums, left, right, pivotIndex);\n\n            if (finalIndex == target) {\n                return nums[finalIndex];\n            }\n            if (finalIndex < target) {\n                left = finalIndex + 1;\n            } else {\n                right = finalIndex - 1;\n            }\n        }\n\n        return nums[target];\n    }\n\nprivate:\n    int partition(vector<int>& nums, int left, int right, int pivotIndex) {\n        int pivotValue = nums[pivotIndex];\n        swap(nums[pivotIndex], nums[right]);\n        int storeIndex = left;\n\n        for (int i = left; i < right; ++i) {\n            if (nums[i] < pivotValue) {\n                swap(nums[storeIndex], nums[i]);\n                ++storeIndex;\n            }\n        }\n\n        swap(nums[storeIndex], nums[right]);\n        return storeIndex;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Min-Heap Size K",
      "complexity": "Time $O(n \\log k)$ / Space $O(k)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "215. 数组中的第K个最大元素 min-heap study reference",
      "sourceUrl": "https://leetcode.cn/problems/kth-largest-element-in-an-array/description/",
      "code": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> heap;\n\n        for (int num : nums) {\n            heap.push(num);\n            if (heap.size() > k) {\n                heap.pop();\n            }\n        }\n\n        return heap.top();\n    }\n};"
    }
  ],
  "merge-two-sorted-lists": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "19 MB",
      "sourceTitle": "21. 合并两个有序链表 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/merge-two-sorted-lists/submissions/723270932/",
      "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        auto d = new ListNode();\n        auto p = d;\n        while(l1 && l2) {\n            if(l1->val < l2->val) {\n                p->next = l1; l1 = l1->next;\n            } else {\n                p->next = l2; l2 = l2->next;\n            }\n            p = p->next;\n        }\n        if(l1) p->next = l1;\n        if(l2) p->next = l2;\n        return d->next;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Iterative Dummy Head",
      "complexity": "Time $O(m + n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "21. 合并两个有序链表 iterative dummy head reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-two-sorted-lists/description/",
      "code": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy;\n        ListNode* tail = &dummy;\n\n        while (list1 != nullptr && list2 != nullptr) {\n            if (list1->val <= list2->val) {\n                tail->next = list1;\n                list1 = list1->next;\n            } else {\n                tail->next = list2;\n                list2 = list2->next;\n            }\n            tail = tail->next;\n        }\n\n        tail->next = list1 != nullptr ? list1 : list2;\n        return dummy.next;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Recursive Merge",
      "complexity": "Time $O(m + n)$ / Space $O(m + n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "21. 合并两个有序链表 recursive reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-two-sorted-lists/description/",
      "code": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        if (list1 == nullptr) {\n            return list2;\n        }\n        if (list2 == nullptr) {\n            return list1;\n        }\n\n        if (list1->val <= list2->val) {\n            list1->next = mergeTwoLists(list1->next, list2);\n            return list1;\n        }\n\n        list2->next = mergeTwoLists(list1, list2->next);\n        return list2;\n    }\n};"
    }
  ],
  "move-zeroes": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.02.25",
      "runtime": "0 ms",
      "memory": "23.4 MB",
      "sourceTitle": "283. 移动零 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/move-zeroes/submissions/700331039/",
      "code": "class Solution {\npublic:\n    void moveZeroes(vector<int>& a) {\n        int n = a.size();\n        int i = 0, j = 0;\n        while(i < n) {\n            if(a[i]) a[j++] = a[i];\n            i++;\n        }\n        while(j < n) a[j++] = 0;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Overwrite and Fill",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "283. 移动零 overwrite and fill reference",
      "sourceUrl": "https://leetcode.cn/problems/move-zeroes/description/",
      "code": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int write = 0;\n\n        for (int num : nums) {\n            if (num != 0) {\n                nums[write] = num;\n                ++write;\n            }\n        }\n\n        while (write < nums.size()) {\n            nums[write] = 0;\n            ++write;\n        }\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Swap Two Pointers",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "283. 移动零 swap two pointers reference",
      "sourceUrl": "https://leetcode.cn/problems/move-zeroes/description/",
      "code": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int write = 0;\n\n        for (int i = 0; i < nums.size(); ++i) {\n            if (nums[i] != 0) {\n                swap(nums[write], nums[i]);\n                ++write;\n            }\n        }\n    }\n};"
    }
  ],
  "valid-parentheses": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.07",
      "runtime": "0 ms",
      "memory": "8.8 MB",
      "sourceTitle": "20. 有效的括号 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/valid-parentheses/submissions/723271949/",
      "code": "class Solution {\npublic:\n    bool isValid(string s) {\n        int n = s.size();\n        unordered_map<char,char> mp;\n        mp['['] = ']';\n        mp['{'] = '}';\n        mp['('] = ')';\n        vector<char> st;\n        for(auto c: s) {\n            if(mp.count(c)) st.push_back(c);\n            else {\n                if(st.empty()) return false;\n                if(c != mp[st.back()]) return false;\n                st.pop_back();\n            }\n        }\n        return st.empty();\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Stack With Closing-To-Opening Map",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "20. 有效的括号 stack map reference",
      "sourceUrl": "https://leetcode.cn/problems/valid-parentheses/description/",
      "code": "class Solution {\npublic:\n    bool isValid(string s) {\n        if (s.size() % 2 == 1) {\n            return false;\n        }\n\n        unordered_map<char, char> matching = {\n            {')', '('},\n            {']', '['},\n            {'}', '{'},\n        };\n        vector<char> stack;\n\n        for (char ch : s) {\n            if (!matching.count(ch)) {\n                stack.push_back(ch);\n                continue;\n            }\n\n            if (stack.empty() || stack.back() != matching[ch]) {\n                return false;\n            }\n            stack.pop_back();\n        }\n\n        return stack.empty();\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Stack With Expected Closing Brackets",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "20. 有效的括号 expected closing stack reference",
      "sourceUrl": "https://leetcode.cn/problems/valid-parentheses/description/",
      "code": "class Solution {\npublic:\n    bool isValid(string s) {\n        if (s.size() % 2 == 1) {\n            return false;\n        }\n\n        vector<char> expected;\n        for (char ch : s) {\n            if (ch == '(') {\n                expected.push_back(')');\n            } else if (ch == '[') {\n                expected.push_back(']');\n            } else if (ch == '{') {\n                expected.push_back('}');\n            } else {\n                if (expected.empty() || expected.back() != ch) {\n                    return false;\n                }\n                expected.pop_back();\n            }\n        }\n\n        return expected.empty();\n    }\n};"
    }
  ],
  "add-two-integers": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2023.08.19",
      "runtime": "0 ms",
      "memory": "5.9 MB",
      "sourceTitle": "2235. 两整数相加 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/add-two-integers/submissions/458002835/",
      "code": "class Solution {\npublic:\n    int sum(int num1, int num2) {\n        return num1+num2;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Direct Integer Addition",
      "complexity": "Time $O(1)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "2235. 两整数相加 direct addition study reference",
      "sourceUrl": "https://leetcode.cn/problems/add-two-integers/description/",
      "code": "class Solution {\npublic:\n    int sum(int num1, int num2) {\n        return num1 + num2;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Bitwise Addition Variant",
      "complexity": "Time $O(w)$ / Space $O(1)$, where $w$ is the integer bit width",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "2235. 两整数相加 bitwise addition study reference",
      "sourceUrl": "https://leetcode.cn/problems/add-two-integers/description/",
      "code": "class Solution {\npublic:\n    int sum(int num1, int num2) {\n        unsigned int first = static_cast<unsigned int>(num1);\n        unsigned int second = static_cast<unsigned int>(num2);\n\n        while (second != 0) {\n            unsigned int carry = (first & second) << 1;\n            first ^= second;\n            second = carry;\n        }\n\n        return static_cast<int>(first);\n    }\n};"
    }
  ],
  "spiral-matrix": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.08",
      "runtime": "0 ms",
      "memory": "9.4 MB",
      "sourceTitle": "54. 螺旋矩阵 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/spiral-matrix/submissions/723470421/",
      "code": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& a) {\n        int n = a.size(), m = a[0].size();\n        vector<int> res;\n        int i = 0, j = 0, ln = 0, rn = n-1, lm = 0, rm = m-1;\n        int sz = n * m;\n        while(res.size() < sz) {\n            while(res.size() < sz && j <= rm) res.push_back(a[i][j++]); j--; i++;\n            while(res.size() < sz && i <= rn) res.push_back(a[i++][j]); i--; j--;\n            while(res.size() < sz && j >= lm) res.push_back(a[i][j--]); j++; i--;\n            while(res.size() < sz && i > ln) res.push_back(a[i--][j]); i++; j++;\n            ln++; rn--; lm++; rm--;\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Boundary Shrinking",
      "complexity": "Time $O(mn)$ / Space $O(1)$ excluding output",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "54. 螺旋矩阵 boundary shrinking study reference",
      "sourceUrl": "https://leetcode.cn/problems/spiral-matrix/description/",
      "code": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        int rows = matrix.size();\n        int cols = matrix[0].size();\n        vector<int> order;\n        order.reserve(rows * cols);\n\n        int top = 0;\n        int bottom = rows - 1;\n        int left = 0;\n        int right = cols - 1;\n\n        while (top <= bottom && left <= right) {\n            for (int col = left; col <= right; ++col) {\n                order.push_back(matrix[top][col]);\n            }\n            ++top;\n\n            for (int row = top; row <= bottom; ++row) {\n                order.push_back(matrix[row][right]);\n            }\n            --right;\n\n            if (top <= bottom) {\n                for (int col = right; col >= left; --col) {\n                    order.push_back(matrix[bottom][col]);\n                }\n                --bottom;\n            }\n\n            if (left <= right) {\n                for (int row = bottom; row >= top; --row) {\n                    order.push_back(matrix[row][left]);\n                }\n                ++left;\n            }\n        }\n\n        return order;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Visited Direction Simulation",
      "complexity": "Time $O(mn)$ / Space $O(mn)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "54. 螺旋矩阵 visited simulation baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/spiral-matrix/description/",
      "code": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        int rows = matrix.size();\n        int cols = matrix[0].size();\n        int total = rows * cols;\n        vector<int> order;\n        order.reserve(total);\n        vector<vector<bool>> seen(rows, vector<bool>(cols, false));\n\n        const vector<int> rowStep = {0, 1, 0, -1};\n        const vector<int> colStep = {1, 0, -1, 0};\n        int row = 0;\n        int col = 0;\n        int direction = 0;\n\n        for (int count = 0; count < total; ++count) {\n            order.push_back(matrix[row][col]);\n            seen[row][col] = true;\n\n            int nextRow = row + rowStep[direction];\n            int nextCol = col + colStep[direction];\n            bool needTurn = nextRow < 0 || nextRow >= rows ||\n                nextCol < 0 || nextCol >= cols || seen[nextRow][nextCol];\n            if (needTurn) {\n                direction = (direction + 1) % rowStep.size();\n                nextRow = row + rowStep[direction];\n                nextCol = col + colStep[direction];\n            }\n\n            row = nextRow;\n            col = nextCol;\n        }\n\n        return order;\n    }\n};"
    }
  ],
  "reverse-linked-list": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.08",
      "runtime": "0 ms",
      "memory": "13.2 MB",
      "sourceTitle": "206. 反转链表 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/reverse-linked-list/submissions/723477758/",
      "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        if(!head || !head->next) return head;\n        auto d = new ListNode(-1, head);\n        auto pre = d, cur = d->next;\n        while(cur && cur->next) {\n            auto nxt = cur->next;\n            cur->next = nxt->next;\n            nxt->next = pre->next;\n            pre->next = nxt;\n        }\n        return d->next;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Iterative Three Pointer Reversal",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "206. 反转链表 iterative three pointer study reference",
      "sourceUrl": "https://leetcode.cn/problems/reverse-linked-list/description/",
      "code": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* previous = nullptr;\n        ListNode* current = head;\n\n        while (current != nullptr) {\n            ListNode* next = current->next;\n            current->next = previous;\n            previous = current;\n            current = next;\n        }\n\n        return previous;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Recursive Tail Reconnection",
      "complexity": "Time $O(n)$ / Space $O(n)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "206. 反转链表 recursive study reference",
      "sourceUrl": "https://leetcode.cn/problems/reverse-linked-list/description/",
      "code": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        if (head == nullptr || head->next == nullptr) {\n            return head;\n        }\n\n        ListNode* newHead = reverseList(head->next);\n        head->next->next = head;\n        head->next = nullptr;\n        return newHead;\n    }\n};"
    }
  ],
  "merge-sorted-array": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.08",
      "runtime": "0 ms",
      "memory": "12.2 MB",
      "sourceTitle": "88. 合并两个有序数组 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/merge-sorted-array/submissions/723463214/",
      "code": "class Solution {\npublic:\n    void merge(vector<int>& a, int m, vector<int>& b, int n) {\n        int i = m-1, j = n-1, k = n+m-1;\n        while(i >= 0 && j >= 0 && k >= 0) a[k--] = a[i] > b[j] ? a[i--] : b[j--];\n        while(i >= 0) a[k--] = a[i--];\n        while(j >= 0) a[k--] = b[j--];\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "Reverse Three Pointers",
      "complexity": "Time $O(m+n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "88. 合并两个有序数组 reverse three-pointer study reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-sorted-array/description/",
      "code": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int i = m - 1;\n        int j = n - 1;\n        int write = m + n - 1;\n\n        while (i >= 0 && j >= 0) {\n            if (nums1[i] > nums2[j]) {\n                nums1[write] = nums1[i];\n                --i;\n            } else {\n                nums1[write] = nums2[j];\n                --j;\n            }\n            --write;\n        }\n\n        while (j >= 0) {\n            nums1[write] = nums2[j];\n            --j;\n            --write;\n        }\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Forward Merge With Buffer",
      "complexity": "Time $O(m+n)$ / Space $O(m)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "88. 合并两个有序数组 forward buffer baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/merge-sorted-array/description/",
      "code": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        vector<int> left(nums1.begin(), nums1.begin() + m);\n        int i = 0;\n        int j = 0;\n        int write = 0;\n\n        while (i < m && j < n) {\n            if (left[i] <= nums2[j]) {\n                nums1[write] = left[i];\n                ++i;\n            } else {\n                nums1[write] = nums2[j];\n                ++j;\n            }\n            ++write;\n        }\n\n        while (i < m) {\n            nums1[write] = left[i];\n            ++i;\n            ++write;\n        }\n\n        while (j < n) {\n            nums1[write] = nums2[j];\n            ++j;\n            ++write;\n        }\n    }\n};"
    }
  ],
  "longest-common-prefix": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.08",
      "runtime": "0 ms",
      "memory": "11.6 MB",
      "sourceTitle": "14. 最长公共前缀 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/longest-common-prefix/submissions/723483819/",
      "code": "class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& ss) {\n        string res;\n        int sz = ss[0].size();\n        for(auto& s: ss) sz = min(sz, int(s.size()));\n        for(int i = 0; i < sz; i++) {\n            auto c = ss[0][i];\n            for(auto& s: ss) if(s[i] != c) return res;\n            res.push_back(c);\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Horizontal Scanning",
      "complexity": "Time $O(S)$ / Space $O(1)$ extra",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "14. 最长公共前缀 horizontal scanning reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-common-prefix/description/",
      "code": "class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if (strs.empty()) {\n            return \"\";\n        }\n\n        string prefix = strs[0];\n        for (int i = 1; i < strs.size(); ++i) {\n            while (strs[i].find(prefix) != 0) {\n                prefix.pop_back();\n                if (prefix.empty()) {\n                    return \"\";\n                }\n            }\n        }\n\n        return prefix;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Vertical Scanning",
      "complexity": "Time $O(S)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "14. 最长公共前缀 vertical scanning reference",
      "sourceUrl": "https://leetcode.cn/problems/longest-common-prefix/description/",
      "code": "class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if (strs.empty()) {\n            return \"\";\n        }\n\n        for (int col = 0; col < strs[0].size(); ++col) {\n            char expected = strs[0][col];\n            for (int row = 1; row < strs.size(); ++row) {\n                if (col == strs[row].size() || strs[row][col] != expected) {\n                    return strs[0].substr(0, col);\n                }\n            }\n        }\n\n        return strs[0];\n    }\n};"
    }
  ],
  "best-time-to-buy-and-sell-stock": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.15",
      "runtime": "4 ms",
      "memory": "95.2 MB",
      "sourceTitle": "121. 买卖股票的最佳时机 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/submissions/725084191/",
      "code": "class Solution {\npublic:\n    int maxProfit(vector<int>& a) {\n        int n = a.size();\n        int pre = a[0], res = 0;\n        for(int i = 1; i < n; i++) {\n            res = max(res, a[i] - pre);\n            pre = min(pre, a[i]);\n        }\n        return res;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "optimized",
      "approachTitle": "One Pass Minimum Price",
      "complexity": "Time $O(n)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "121. 买卖股票的最佳时机 one-pass min-price reference",
      "sourceUrl": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/",
      "code": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minPrice = prices[0];\n        int bestProfit = 0;\n\n        for (int i = 1; i < prices.size(); ++i) {\n            bestProfit = max(bestProfit, prices[i] - minPrice);\n            minPrice = min(minPrice, prices[i]);\n        }\n\n        return bestProfit;\n    }\n};"
    },
    {
      "language": "C++",
      "status": "Reference",
      "provenance": "generated-reference",
      "approachTitle": "Brute Force Buy Sell Pair",
      "complexity": "Time $O(n^2)$ / Space $O(1)$",
      "submittedAt": null,
      "runtime": null,
      "memory": null,
      "sourceTitle": "121. 买卖股票的最佳时机 brute-force pair baseline reference",
      "sourceUrl": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/",
      "code": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int bestProfit = 0;\n\n        for (int buy = 0; buy < prices.size(); ++buy) {\n            for (int sell = buy + 1; sell < prices.size(); ++sell) {\n                bestProfit = max(bestProfit, prices[sell] - prices[buy]);\n            }\n        }\n\n        return bestProfit;\n    }\n};"
    }
  ],
  "sliding-window-maximum": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.08",
      "runtime": "25 ms",
      "memory": "138.3 MB",
      "sourceTitle": "239. 滑动窗口最大值 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/sliding-window-maximum/submissions/723482178/",
      "code": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& a, int k) {\n        vector<int> res;\n        int n = a.size();\n        vector<int> q(n); int hh = 0, tt = -1;\n        for(int i = 0; i < n; i++) {\n            while(tt >= hh && q[hh] <= i-k) hh++;\n            while(tt >= hh && a[q[tt]] <= a[i]) tt--;\n            q[++tt] = i;\n            if(i >= k-1) res.push_back(a[q[hh]]);\n        }\n        return res;\n    }\n};"
    }
  ],
  "palindrome-number": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "11 ms",
      "memory": "14.1 MB",
      "sourceTitle": "9. 回文数 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/palindrome-number/submissions/723686345/",
      "code": "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        if(x < 0) return false;\n        if(x < 10) return true;\n        vector<int> a;\n        while(x) a.push_back(x%10), x/=10;\n        auto b = a;\n        reverse(b.begin(), b.end());\n        return a == b;\n    }\n};"
    }
  ],
  "edit-distance": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "11 ms",
      "memory": "13.2 MB",
      "sourceTitle": "72. 编辑距离 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/edit-distance/submissions/723681439/",
      "code": "#define INF 0x3f3f3f3f\nclass Solution {\npublic:\n    int minDistance(string s, string t) {\n        int n = s.size();\n        int m = t.size();\n        vector<vector<int>> f(n+1, vector<int>(m+1, INF));\n        for(int i = 0; i <= n; i++) f[i][0] = i;\n        for(int i = 0; i <= m; i++) f[0][i] = i;\n        for(int i = 1; i <= n; i++)\n            for(int j = 1; j <= m; j++) {\n                if(s[i-1] == t[j-1]) f[i][j] = min(f[i][j], f[i-1][j-1]);\n                else f[i][j] = min({f[i-1][j], f[i][j-1], f[i-1][j-1]}) + 1;\n            }\n        return f[n][m];\n    }\n};"
    }
  ],
  "generate-parentheses": [
    {
      "language": "Python3",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "4 ms",
      "memory": "12.6 MB",
      "sourceTitle": "22. 括号生成 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/generate-parentheses/submissions/723687117/",
      "code": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        a=[]\n        def f(s='',l=0,r=0) :\n            if l<n :\n                f(s+'(',l+1,r)\n            if r<l :\n                f(s+')',l,r+1)\n            if len(s)==2*n :\n                a.append(s)\n                return\n        f()\n        return a"
    }
  ],
  "maximum-subarray": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "70.1 MB",
      "sourceTitle": "53. 最大子数组和 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/maximum-subarray/submissions/723681927/",
      "code": "class Solution {\npublic:\n    int maxSubArray(vector<int>& a) {\n        int n = a.size(), res = -1e9;\n        int pre = 0;\n        for(int i = 0; i < n; i++) {\n            pre = a[i] + max(0, pre);\n            res = max(res, pre);\n        }\n        return res;\n    }\n};"
    }
  ],
  "binary-search": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "30.8 MB",
      "sourceTitle": "704. 二分查找 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/binary-search/submissions/723687369/",
      "code": "class Solution {\npublic:\n    int search(vector<int>& a, int t) {\n        int n = a.size();\n        int l = 0, r = n-1;\n        while(l <= r) {\n            int m = (l+r) / 2;\n            if(a[m] == t) return m;\n            else if(a[m] < t) l = m+1;\n            else r = m-1;\n        }\n        return -1;\n    }\n};"
    }
  ],
  "reverse-nodes-in-k-group": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "16.2 MB",
      "sourceTitle": "25. K 个一组翻转链表 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/reverse-nodes-in-k-group/submissions/723690085/",
      "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        if(!head || !head->next) return head;\n        auto p = head;\n        int cnt = 0;\n        while(p) p = p->next, cnt++;\n        if(cnt < k) return head;\n        auto d = new ListNode(-1, head);\n        auto pre = d, cur = d->next;\n        for(int j = 0; j < cnt/k; j++) {\n            for(int i = 1; i < k; i++) {\n                auto nxt = cur->next;\n                cur->next = nxt->next;\n                nxt->next = pre->next;\n                pre->next = nxt;\n            }\n            pre = cur; cur = cur->next;\n        }\n        return d->next;\n    }\n};"
    }
  ],
  "remove-element": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "11.4 MB",
      "sourceTitle": "27. 移除元素 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/remove-element/submissions/723687527/",
      "code": "class Solution {\npublic:\n    int removeElement(vector<int>& a, int v) {\n        int n = a.size(), j = 0;\n        for(int i = 0; i < n; i++) {\n            if(a[i] != v) a[j++] = a[i];\n        }\n        return j;\n    }\n};"
    }
  ],
  "lowest-common-ancestor-of-a-binary-tree": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "11 ms",
      "memory": "17.1 MB",
      "sourceTitle": "236. 二叉树的最近公共祖先 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/submissions/723717608/",
      "code": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if(root == p) return p;\n        if(root == q) return q;\n        if(!root) return root;\n        auto l = lowestCommonAncestor(root->left, p, q);\n        auto r = lowestCommonAncestor(root->right, p, q);\n        if(!l) return r;\n        if(!r) return l;\n        return root;\n    }\n};"
    }
  ],
  "house-robber": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "10 MB",
      "sourceTitle": "198. 打家劫舍 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/house-robber/submissions/723694554/",
      "code": "class Solution {\npublic:\n    int rob(vector<int>& a) {\n        int n = a.size();\n        int x = a[0], y = 0;\n        for(int i = 1; i < n; i++) {\n            int t = x;\n            x = a[i] + y;\n            y = max(y, t);\n        }\n        return max(x, y);\n    }\n};"
    }
  ],
  "perfect-squares": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "8.4 MB",
      "sourceTitle": "279. 完全平方数 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/perfect-squares/submissions/723719295/",
      "code": "#define INF 0x3f3f3f3f\n#define N 10010\nvector<int> a;\nint f[N];\nauto x = []() {\n    memset(f, INF, sizeof(f));\n    for(int i = 1; i*i < 10010; i++) a.push_back(i*i), f[i*i] = 1;\n    for(int i = 1; i < N; i++) {\n        for(auto x: a) {\n            if(i < x) break;\n            if(f[i-x] == INF) continue;\n            f[i] = min(f[i], f[i-x]+1);\n        }\n    }\n    return 0;\n}();\nclass Solution {\npublic:\n    int numSquares(int n) {\n        return f[n];\n    }\n};"
    }
  ],
  "spiral-matrix-ii": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "2 ms",
      "memory": "9.2 MB",
      "sourceTitle": "59. 螺旋矩阵 II latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/spiral-matrix-ii/submissions/723693718/",
      "code": "class Solution {\npublic:\n    vector<vector<int>> generateMatrix(int n) {\n        vector<vector<int>> a(n, vector<int>(n));\n        int i = 0, j = 0, ln = 0, rn = n-1, lm = 0, rm = n-1;\n        int c = 0, sz = n*n;\n        while(c < sz) {\n            while(c < sz && j <= rm) a[i][j++] = ++c; j--; i++;\n            while(c < sz && i <= rn) a[i++][j] = ++c; i--; j--;\n            while(c < sz && j >= lm) a[i][j--] = ++c; j++; i--;\n            while(c < sz && i > ln) a[i--][j] = ++c; i++; j++;\n            ln++; lm++; rn--; rm--;\n        }\n        return a;\n    }\n};"
    }
  ],
  "find-the-index-of-the-first-occurrence-in-a-string": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "9.4 MB",
      "sourceTitle": "28. 找出字符串中第一个匹配项的下标 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/submissions/723713724/",
      "code": "class Solution {\npublic:\n    int strStr(string s, string p) {\n        int n = s.size();\n        int m = p.size();\n        s = \" \" + s;\n        p = \" \" + p;\n        vector<int> nxt(m+1);\n        // p[1..nxt[i]] = p[..i]\n        int x = 0;\n        for(int i = 1; i <= m; i++) {\n            while(x && p[i] != p[x+1]) x = nxt[x];\n            if(i != x+1 && p[i] == p[x+1]) nxt[i] = ++x;\n        }\n        x = 0;\n        for(int i = 1; i <= n; i++) {\n            while(x && s[i] != p[x+1]) x = nxt[x];\n            if(s[i] == p[x+1]) ++x;\n            if(x == m) return i - m;\n        }\n        return -1;\n    }\n};"
    }
  ],
  "partition-equal-subset-sum": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "39 ms",
      "memory": "14.6 MB",
      "sourceTitle": "416. 分割等和子集 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/partition-equal-subset-sum/submissions/723725322/",
      "code": "class Solution {\npublic:\n    bool canPartition(vector<int>& a) {\n        int n = a.size();\n        auto s = accumulate(a.begin(), a.end(), 0);\n        if(s % 2) return false;\n        int t = s / 2;\n        vector<int> f(t+1);\n        f[0] = 1;\n        for(int i = 0; i < n; i++)\n            for(int j = t; j >= a[i]; j--)\n                f[j] |= f[j-a[i]];\n        return f[t];\n    }\n};"
    }
  ],
  "minimum-size-subarray-sum": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "31.5 MB",
      "sourceTitle": "209. 长度最小的子数组 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/minimum-size-subarray-sum/submissions/723722731/",
      "code": "#define INF 0x3f3f3f3f\nclass Solution {\npublic:\n    int minSubArrayLen(int t, vector<int>& a) {\n        int n = a.size();\n        int j = 0, res = INF;\n        int c = 0;\n        for(int i = 0; i < n; i++) {\n            c += a[i];\n            while(c >= t) {\n                res = min(res, i-j+1);\n                c -= a[j++];\n            }\n        }\n        if(res == INF) return 0;\n        return res;\n    }\n};"
    }
  ],
  "intersection-of-two-linked-lists": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "64 ms",
      "memory": "23.3 MB",
      "sourceTitle": "160. 相交链表 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/intersection-of-two-linked-lists/submissions/723723057/",
      "code": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        auto p = headA, q = headB;\n        while(p != q) {\n            p = p ? p->next : headB;\n            q = q ? q->next : headA;\n        }\n        return p;\n    }\n};"
    }
  ],
  "combine-two-tables": [
    {
      "language": "MySQL",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "537 ms",
      "memory": null,
      "sourceTitle": "175. 组合两个表 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/combine-two-tables/submissions/723724999/",
      "code": "# Write your MySQL query statement below\nselect FirstName, LastName, City, State\nfrom Person left join Address\non Person.PersonId = Address.PersonId;"
    }
  ],
  "n-queens": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.12",
      "runtime": "4 ms",
      "memory": "10 MB",
      "sourceTitle": "51. N 皇后 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/n-queens/submissions/724376228/",
      "code": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        vector<vector<string>> res;\n        vector<string> a(n, string(n, '.'));\n        vector<int> col(n), x0(2*n), x1(2*n);\n        auto dfs = [&](this auto&& dfs, int r) -> void {\n            if(r == n) {\n                res.push_back(a);\n                return;\n            }\n            for(int i = 0; i < n; i++) {\n                int j = r+i, k = n+r-i;\n                if(col[i] || x0[j] || x1[k]) continue;\n                col[i] = x0[j] = x1[k] = 1;\n                a[r][i] = 'Q';\n                dfs(r+1);\n                a[r][i] = '.';\n                col[i] = x0[j] = x1[k] = 0;\n            }\n        };\n        dfs(0);\n        return res;\n    }\n};"
    }
  ],
  "first-missing-positive": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.09",
      "runtime": "0 ms",
      "memory": "53.7 MB",
      "sourceTitle": "41. 缺失的第一个正数 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/first-missing-positive/submissions/723720633/",
      "code": "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& a) {\n        int n = a.size();\n        for(int i = 0; i < n; i++)\n            while(a[i] != i+1 && a[i] >= 1 && a[i] <= n && a[a[i]-1] != a[i]) swap(a[a[i]-1], a[i]);\n        for(int i = 0; i < n; i++)\n            if(a[i] != i+1) return i+1;\n        return n+1;\n    }\n};"
    }
  ],
  "sort-an-array": [
    {
      "language": "C++",
      "status": "Accepted",
      "provenance": "my-recent-accepted-submission",
      "submittedAt": "2026.05.11",
      "runtime": "71 ms",
      "memory": "71.5 MB",
      "sourceTitle": "912. 排序数组 latest accepted submission",
      "sourceUrl": "https://leetcode.cn/problems/sort-an-array/submissions/724102756/",
      "code": "class Solution {\npublic:\n    vector<int> sortArray(vector<int>& a) {\n        int n = a.size();\n        auto t = a;\n        auto ms = [&](this auto&& ms, int l, int r) -> void {\n            if(l >= r) return;\n            int m = (l+r) / 2;\n            ms(l, m); ms(m+1, r);\n            int i = l, j = m+1, k = l;\n            while(i <= m && j <= r) {\n                if(a[i] <= a[j]) t[k++] = a[i++];\n                else t[k++] = a[j++];\n            }\n            while(i <= m) t[k++] = a[i++];\n            while(j <= r) t[k++] = a[j++];\n            for(int i = l; i <= r; i++) a[i] = t[i];\n        };\n        ms(0, n-1);\n        return a;\n    }\n};"
    }
  ]
}) satisfies Record<
  string,
  LeetcodeImplementationReference[]
>;

export const leetcodeImplementationStats = {
  problems: 45,
  references: 49,
  source:
    "LeetCode China authenticated submission pages, harvested from recent accepted submissions.",
} as const;
