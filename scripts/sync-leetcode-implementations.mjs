import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const outputPath = new URL(
  "src/data/leetcode-implementation-generated.ts",
  repoRoot,
);
const defaultMaxRefsPerProblem = 6;
const defaultDoocsDir = "/tmp/doocs-leetcode";
const defaultKamyuDir = "/tmp/kamyu-leetcode";
const doocsRepoUrl = "https://github.com/doocs/leetcode";
const kamyuRepoUrl = "https://github.com/kamyu104/LeetCode-Solutions";
const doocsLicense = "CC-BY-SA-4.0";
const kamyuLicense = "MIT";

const doocsRoots = [
  "solution",
  "lcof",
  "lcof2",
  "lcci",
  "lcp",
  "lcs",
];
const codeBlockPriority = [
  "cpp",
  "c++",
  "mysql",
  "sql",
  "typescript",
  "ts",
  "javascript",
  "js",
  "python3",
  "python",
  "bash",
  "shell",
];
const kamyuLanguageDirs = [
  ["C++", "cpp", ".cpp"],
  ["MySQL", "mysql", ".sql"],
  ["TypeScript", "typescript", ".ts"],
  ["Python3", "python", ".py"],
  ["Shell", "bash", ".sh"],
];

function optionValue(name, fallback) {
  const prefix = `--${name}=`;
  const option = process.argv.find((item) => item.startsWith(prefix));
  if (!option) return fallback;
  return option.slice(prefix.length);
}

function numberOption(name, fallback) {
  const value = Number(optionValue(name, fallback));
  return Number.isFinite(value) && value > 0 ? Math.trunc(value) : fallback;
}

function languageName(lang) {
  const normalized = String(lang || "").toLowerCase();
  if (normalized === "cpp" || normalized === "c++") return "C++";
  if (normalized === "mysql" || normalized === "sql") return "MySQL";
  if (normalized === "ts" || normalized === "typescript") return "TypeScript";
  if (normalized === "js" || normalized === "javascript") return "JavaScript";
  if (normalized === "python" || normalized === "python3") return "Python3";
  if (normalized === "bash" || normalized === "shell") return "Bash";
  return lang || "Text";
}

function isCpp(reference) {
  return reference.language === "C++" || reference.language === "C++17";
}

function encodePathForUrl(relativePath) {
  return relativePath
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function githubBlobUrl(repoUrl, relativePath, branch = "main") {
  return `${repoUrl}/blob/${branch}/${encodePathForUrl(relativePath)}`;
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${exportName}`);
  return JSON.parse(match[1]);
}

async function targetProblems() {
  const problems = extractJsonArray(
    await readFile(problemsPath, "utf8"),
    "leetcodeProblems",
    "satisfies LeetcodeProblem\\[\\];",
  );
  const bytedanceProblems = extractJsonArray(
    await readFile(bytedancePath, "utf8"),
    "leetcodeByteDanceProblems",
    "satisfies LeetcodeByteDanceProblem\\[\\];",
  );
  const result = [];
  const seen = new Set();
  for (const problem of [...problems, ...bytedanceProblems]) {
    if (seen.has(problem.titleSlug)) continue;
    seen.add(problem.titleSlug);
    result.push(problem);
  }
  return result;
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

function problemSlugs(markdown) {
  return [
    ...new Set(
      [...markdown.matchAll(/leetcode\.(?:com|cn)\/problems\/([^/)#?]+)/g)]
        .map((match) => match[1])
        .filter(Boolean),
    ),
  ];
}

function solutionSections(markdown) {
  const headings = [
    ...markdown.matchAll(/^### (?:Solution|解法)[^\n]*/gm),
  ].map((match) => ({
    index: match.index,
    title: match[0].replace(/^###\s*/, "").trim(),
  }));
  if (!headings.length) {
    return [{ title: "Reference", body: markdown }];
  }
  return headings.map((heading, index) => ({
    title: heading.title,
    body: markdown.slice(heading.index, headings[index + 1]?.index ?? markdown.length),
  }));
}

function codeBlocks(markdown) {
  const blocks = [];
  const pattern = /```([A-Za-z0-9+#-]*)\n([\s\S]*?)```/g;
  let match;
  while ((match = pattern.exec(markdown))) {
    const code = match[2].trimEnd();
    if (!code.trim()) continue;
    blocks.push({
      lang: String(match[1] || "").toLowerCase(),
      code,
    });
  }
  return blocks;
}

function complexityFromSection(sectionBody) {
  const normalized = sectionBody.replace(/\s+/g, " ");
  const time =
    normalized.match(/(?:time complexity|时间复杂度)[：:\s]*([^。.;<\n]{1,80})/i)?.[1] ||
    "";
  const space =
    normalized.match(/(?:space complexity|空间复杂度)[：:\s]*([^。.;<\n]{1,80})/i)?.[1] ||
    "";
  if (!time && !space) return null;
  return [time && `Time ${time.trim()}`, space && `Space ${space.trim()}`]
    .filter(Boolean)
    .join(" / ");
}

function normalizeCode(code) {
  return code.replace(/\r\n/g, "\n").trim();
}

function referenceKey(reference) {
  return normalizeCode(reference.code).replace(/\s+/g, "");
}

function makeReference({
  approachTitle,
  code,
  complexity = null,
  language,
  license,
  sourceTitle,
  sourceUrl,
}) {
  return {
    language,
    status: "Reference",
    provenance: "external-reference",
    approachTitle,
    complexity,
    license,
    modified: false,
    submittedAt: null,
    runtime: null,
    memory: null,
    sourceTitle,
    sourceUrl,
    code: normalizeCode(code),
  };
}

async function doocsReferences(doocsDir) {
  const result = new Map();
  for (const root of doocsRoots) {
    const files = await walkFiles(path.join(doocsDir, root), new Set([
      "README_EN.md",
      "README.md",
    ]));
    for (const file of files) {
      const markdown = await readFile(file, "utf8");
      const slugs = problemSlugs(markdown);
      if (!slugs.length) continue;
      const relativePath = path.relative(doocsDir, file);
      const sourceUrl = githubBlobUrl(doocsRepoUrl, relativePath);
      const dirname = path.basename(path.dirname(file));
      const refs = [];
      for (const section of solutionSections(markdown)) {
        const blocks = codeBlocks(section.body);
        for (const lang of codeBlockPriority) {
          const block = blocks.find((item) => item.lang === lang);
          if (!block) continue;
          refs.push(
            makeReference({
              approachTitle: section.title,
              code: block.code,
              complexity: complexityFromSection(section.body),
              language: languageName(block.lang),
              license: doocsLicense,
              sourceTitle: `Doocs ${dirname} ${section.title}`,
              sourceUrl,
            }),
          );
          break;
        }
      }
      if (!refs.length) continue;
      for (const slug of slugs) {
        if (!result.has(slug)) result.set(slug, []);
        result.get(slug).push(...refs);
      }
    }
  }
  return result;
}

async function kamyuReferences(kamyuDir) {
  const result = new Map();
  if (!existsSync(kamyuDir)) return result;
  for (const [dir, lang, ext] of kamyuLanguageDirs) {
    const sourceDir = path.join(kamyuDir, dir);
    if (!existsSync(sourceDir)) continue;
    const files = await readdir(sourceDir);
    for (const file of files) {
      if (!file.endsWith(ext)) continue;
      const slug = file.slice(0, -ext.length);
      const fullPath = path.join(sourceDir, file);
      const relativePath = path.relative(kamyuDir, fullPath);
      const code = await readFile(fullPath, "utf8");
      if (!code.trim()) continue;
      const reference = makeReference({
        approachTitle: "Modern C++ reference",
        code,
        complexity: null,
        language: languageName(lang),
        license: kamyuLicense,
        sourceTitle: `kamyu104 ${relativePath}`,
        sourceUrl: githubBlobUrl(kamyuRepoUrl, relativePath, "master"),
      });
      if (!result.has(slug)) result.set(slug, []);
      result.get(slug).push(reference);
    }
  }
  return result;
}

function manualReferences() {
  return new Map(
    Object.entries({
      "you-le-yuan-de-mi-gong": [
        makeReference({
          approachTitle: "Solution 1: Extreme-ray greedy geometry",
          code: `class Solution {
    long long cross(vector<vector<int>>& p, int a, int b, int c) {
        long long x1 = p[b][0] - p[a][0], y1 = p[b][1] - p[a][1];
        long long x2 = p[c][0] - p[a][0], y2 = p[c][1] - p[a][1];
        return x1 * y2 - y1 * x2;
    }
public:
    vector<int> visitOrder(vector<vector<int>>& points, string direction) {
        int n = points.size();
        vector<int> res, used(n);
        int cur = 0;
        for(int i = 1; i < n; i++) {
            if(points[i] < points[cur]) cur = i;
        }
        res.push_back(cur);
        used[cur] = 1;
        for(char d: direction) {
            int nxt = -1;
            for(int i = 0; i < n; i++) {
                if(used[i]) continue;
                if(nxt < 0) nxt = i;
                else if(d == 'L' && cross(points, cur, nxt, i) < 0) {
                    nxt = i;
                } else if(d == 'R' && cross(points, cur, nxt, i) > 0) {
                    nxt = i;
                }
            }
            res.push_back(nxt);
            used[nxt] = 1;
            cur = nxt;
        }
        for(int i = 0; i < n; i++) {
            if(!used[i]) res.push_back(i);
        }
        return res;
    }
};`,
          language: "C++",
          license: "generated-original",
          sourceTitle: "LeetCode LCP 15 official problem + geometry greedy derivation",
          sourceUrl: "https://leetcode.cn/problems/you-le-yuan-de-mi-gong/",
        }),
      ],
      Za25hA: [
        makeReference({
          approachTitle: "Solution 1: BFS distances + unicyclic graph pruning",
          code: `class Solution {
    vector<vector<int>> g;

    vector<int> bfs(int s) {
        int n = g.size();
        vector<int> d(n, -1);
        queue<int> q;
        d[s] = 0;
        q.push(s);
        while(q.size()) {
            int u = q.front();
            q.pop();
            for(int v: g[u]) {
                if(d[v] >= 0) continue;
                d[v] = d[u] + 1;
                q.push(v);
            }
        }
        return d;
    }

public:
    int chaseGame(vector<vector<int>>& edges, int startA, int startB) {
        int n = edges.size();
        g.assign(n, {});
        vector<int> deg(n), in(n, 1);
        for(auto& e: edges) {
            int a = e[0] - 1, b = e[1] - 1;
            g[a].push_back(b);
            g[b].push_back(a);
            deg[a]++;
            deg[b]++;
        }

        queue<int> q;
        for(int i = 0; i < n; i++) {
            if(deg[i] == 1) q.push(i);
        }
        while(q.size()) {
            int u = q.front();
            q.pop();
            in[u] = 0;
            for(int v: g[u]) {
                if(--deg[v] == 1) q.push(v);
            }
        }

        auto da = bfs(startA - 1);
        auto db = bfs(startB - 1);
        int ring = accumulate(in.begin(), in.end(), 0);
        if(ring > 3) {
            for(int i = 0; i < n; i++) {
                if(in[i] && da[i] > db[i] + 1) return -1;
            }
        }

        int res = 1;
        for(int i = 0; i < n; i++) {
            if(da[i] > db[i] + 1) res = max(res, da[i]);
        }
        return res;
    }
};`,
          language: "C++",
          license: "generated-original",
          sourceTitle: "AcWing LCP 21 explanation and LeetCode official problem",
          sourceUrl: "https://www.acwing.com/solution/content/20649/",
        }),
      ],
      t3fKg1: [
        makeReference({
          approachTitle: "Solution 1: Greedy by ending time with selected intervals",
          code: `class Solution {
    struct Node {
        int l = 0, r = 0, sum = 0;
        bool tag = false;
    };
    vector<Node> tr;

    int node() {
        tr.push_back(Node());
        return tr.size() - 1;
    }

    void cover(int u, int l, int r) {
        tr[u].sum = r - l + 1;
        tr[u].tag = true;
    }

    void push(int u, int l, int r) {
        if(l == r) return;
        int m = l + (r - l) / 2;
        if(!tr[u].l) tr[u].l = node();
        if(!tr[u].r) tr[u].r = node();
        if(!tr[u].tag) return;
        cover(tr[u].l, l, m);
        cover(tr[u].r, m + 1, r);
        tr[u].tag = false;
    }

    int query(int u, int l, int r, int ql, int qr) {
        if(!u || qr < l || r < ql) return 0;
        if(ql <= l && r <= qr) return tr[u].sum;
        if(tr[u].tag) return min(r, qr) - max(l, ql) + 1;
        int m = l + (r - l) / 2;
        return query(tr[u].l, l, m, ql, qr) +
            query(tr[u].r, m + 1, r, ql, qr);
    }

    void add(int u, int l, int r, int ql, int qr, int& k) {
        if(k == 0 || qr < l || r < ql) return;
        if(ql <= l && r <= qr) {
            int zero = r - l + 1 - tr[u].sum;
            if(k >= zero) {
                cover(u, l, r);
                k -= zero;
                return;
            }
        }
        push(u, l, r);
        int m = l + (r - l) / 2;
        add(tr[u].r, m + 1, r, ql, qr, k);
        add(tr[u].l, l, m, ql, qr, k);
        tr[u].sum = tr[tr[u].l].sum + tr[tr[u].r].sum;
    }

public:
    int processTasks(vector<vector<int>>& tasks) {
        sort(tasks.begin(), tasks.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        tr.assign(2, Node());
        const int hi = 1000000000;
        for(auto& t: tasks) {
            int need = t[2] - query(1, 0, hi, t[0], t[1]);
            if(need > 0) add(1, 0, hi, t[0], t[1], need);
        }
        return tr[1].sum;
    }
};`,
          language: "C++",
          license: "generated-original",
          sourceTitle: "Simon_X LCP 32 greedy discussion",
          sourceUrl: "https://www.cnblogs.com/Simon-X/p/15706310.html",
        }),
      ],
      kplEvH: [
        makeReference({
          approachTitle: "Solution 1: State BFS over position and speed",
          code: `class Solution {
public:
    vector<vector<int>> bicycleYard(vector<int>& position,
        vector<vector<int>>& terrain, vector<vector<int>>& obstacle) {
        int n = terrain.size(), m = terrain[0].size();
        int sx = position[0], sy = position[1];
        int lim = terrain[sx][sy] + 1;
        vector<vector<vector<int>>> vis(
            n, vector<vector<int>>(m, vector<int>(lim + 1)));

        queue<array<int, 3>> q;
        q.push({sx, sy, 1});
        vis[sx][sy][1] = 1;

        vector<vector<int>> res;
        int dx[4] = {0, 0, 1, -1};
        int dy[4] = {1, -1, 0, 0};

        while(q.size()) {
            auto [x, y, v] = q.front();
            q.pop();
            if(v == 1 && (x != sx || y != sy)) res.push_back({x, y});
            for(int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                if(nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
                int nv = v + terrain[x][y] - terrain[nx][ny] -
                    obstacle[nx][ny];
                if(nv <= 0 || nv > lim || vis[nx][ny][nv]) continue;
                vis[nx][ny][nv] = 1;
                q.push({nx, ny, nv});
            }
        }
        sort(res.begin(), res.end());
        return res;
    }
};`,
          language: "C++",
          license: "generated-original",
          sourceTitle: "LCP 45 official problem and BFS state derivation",
          sourceUrl: "https://leetcode.cn/problems/kplEvH/",
        }),
      ],
      "add-without-plus-lcci": [
        makeReference({
          approachTitle: "Solution 1: Bitwise carry iteration",
          code: `class Solution {
public:
    int add(int a, int b) {
        unsigned int x = a, y = b;
        while(y) {
            unsigned int c = (x & y) << 1;
            x ^= y;
            y = c;
        }
        return (int)x;
    }
};`,
          language: "C++",
          license: "generated-original",
          sourceTitle: "Doocs LCCI 17.01 bitwise carry explanation",
          sourceUrl: "https://github.com/doocs/leetcode/blob/main/lcci/17.01.Add%20Without%20Plus/README_EN.md",
        }),
      ],
    }),
  );
}

function selectReferences(problem, doocs, kamyu, manual, maxRefs) {
  const refs = [];
  const doocsRefs = doocs.get(problem.titleSlug) || [];
  const kamyuRefs = kamyu.get(problem.titleSlug) || [];
  const manualRefs = manual.get(problem.titleSlug) || [];
  const doocsCpp = doocsRefs.filter(isCpp);
  const kamyuCpp = kamyuRefs.filter(isCpp);
  if (doocsCpp.length) {
    refs.push(...doocsCpp);
  } else if (kamyuCpp.length) {
    refs.push(...kamyuCpp);
  } else if (doocsRefs.length) {
    refs.push(...doocsRefs);
  } else if (kamyuRefs.length) {
    refs.push(...kamyuRefs);
  }
  refs.push(...manualRefs);
  const seen = new Set();
  return refs
    .filter((reference) => {
      const key = referenceKey(reference);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, maxRefs);
}

function renderOutput(referencesBySlug, stats) {
  const header = `import type { LeetcodeImplementationReference } from "./leetcode-implementation-references";

// Generated by scripts/sync-leetcode-implementations.mjs.
// External references preserve per-entry source URLs and licenses.
`;
  return `${header}
export const leetcodeGeneratedImplementationReferences = (${JSON.stringify(
    referencesBySlug,
    null,
    2,
  )}) satisfies Record<string, LeetcodeImplementationReference[]>;

export const leetcodeGeneratedImplementationStats = ${JSON.stringify(
    stats,
    null,
    2,
  )} as const;
`;
}

async function main() {
  const doocsDir = optionValue(
    "doocs-dir",
    process.env.DOOCS_LEETCODE_DIR || defaultDoocsDir,
  );
  const kamyuDir = optionValue(
    "kamyu-dir",
    process.env.KAMYU_LEETCODE_DIR || defaultKamyuDir,
  );
  const maxRefs = numberOption("max-refs-per-problem", defaultMaxRefsPerProblem);
  const problems = await targetProblems();
  const doocs = await doocsReferences(doocsDir);
  const kamyu = await kamyuReferences(kamyuDir);
  const manual = manualReferences();
  const referencesBySlug = {};
  const missing = [];
  for (const problem of problems) {
    const refs = selectReferences(problem, doocs, kamyu, manual, maxRefs);
    if (!refs.length) {
      missing.push(problem.titleSlug);
      continue;
    }
    referencesBySlug[problem.titleSlug] = refs;
  }
  const allRefs = Object.values(referencesBySlug).flat();
  const stats = {
    generatedAt: new Date().toISOString().slice(0, 10),
    targetProblems: problems.length,
    problems: Object.keys(referencesBySlug).length,
    references: allRefs.length,
    cppProblems: Object.values(referencesBySlug).filter((refs) =>
      refs.some(isCpp),
    ).length,
    nonCppOnlyProblems: Object.values(referencesBySlug).filter(
      (refs) => !refs.some(isCpp),
    ).length,
    missing,
    sources: [
      `${doocsRepoUrl} (${doocsLicense})`,
      `${kamyuRepoUrl} (${kamyuLicense})`,
      "Manual generated-original fallbacks for sparse LCP/LCCI gaps.",
    ],
  };
  await mkdir(path.dirname(fileURLToPath(outputPath)), { recursive: true });
  await writeFile(outputPath, renderOutput(referencesBySlug, stats));
  console.log(
    `Wrote ${stats.problems}/${stats.targetProblems} problems, ` +
      `${stats.references} references, ${stats.cppProblems} C++ problems.`,
  );
  if (missing.length) {
    console.error(`Missing references: ${missing.join(", ")}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
