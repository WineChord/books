import { readFile, writeFile } from "node:fs/promises";

const leetcodeChinaGraphqlEndpoint = "https://leetcode.cn/graphql/";
const leetcodeGlobalGraphqlEndpoint = "https://leetcode.com/graphql";
const defaultConcurrency = 2;
const defaultRetryCount = 4;
const defaultRequestDelayMs = 250;
const defaultBackoffMs = 1200;
const repoRoot = new URL("../", import.meta.url);
const problemsPath = new URL("src/data/leetcode-problems.ts", repoRoot);
const bytedancePath = new URL("src/data/leetcode-bytedance.ts", repoRoot);
const outputPath = new URL("src/data/leetcode-code-templates.ts", repoRoot);
const leetcodeCookie = process.env.LEETCODE_CN_COOKIE || "";
const leetcodeGlobalCookie = process.env.LEETCODE_COOKIE || "";

const questionTemplatesQuery = `
query questionEditorData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    titleSlug
    codeSnippets {
      lang
      langSlug
      code
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

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function numberOption(name, fallback) {
  const value = Number(optionValue(name, fallback));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function extractJsonArray(source, exportName, suffix) {
  const pattern = new RegExp(
    `export const ${exportName} = \\(?(\\[[\\s\\S]*?\\n\\])\\)? ${suffix}`,
  );
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Could not find ${exportName} array`);
  }
  return JSON.parse(match[1]);
}

function extractExistingTemplates(source) {
  const match = source.match(
    /export const leetcodeCodeTemplates = \(([\s\S]*?)\) satisfies Record/,
  );
  if (!match) {
    throw new Error("Could not find leetcodeCodeTemplates object");
  }
  return JSON.parse(match[1]);
}

async function readExistingTemplates() {
  try {
    return extractExistingTemplates(await readFile(outputPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

function buildBookProblems(problems, bytedanceProblems) {
  const seen = new Set();
  const result = [];
  for (const problem of [...problems, ...bytedanceProblems]) {
    if (seen.has(problem.titleSlug)) continue;
    seen.add(problem.titleSlug);
    result.push(problem);
  }
  return result;
}

function csrfToken(cookie) {
  const match = cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function endpointConfigs() {
  const configs = [];
  if (!hasFlag("global-only")) {
    configs.push({
      cookie: leetcodeCookie,
      endpoint: leetcodeChinaGraphqlEndpoint,
      name: "leetcode.cn",
      origin: "https://leetcode.cn",
    });
  }
  if (!hasFlag("cn-only")) {
    configs.push({
      cookie: leetcodeGlobalCookie,
      endpoint: leetcodeGlobalGraphqlEndpoint,
      name: "leetcode.com",
      origin: "https://leetcode.com",
    });
  }
  return configs;
}

function requestHeaders(slug, endpointConfig) {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/json",
    origin: endpointConfig.origin,
    referer: `${endpointConfig.origin}/problems/${slug}/description/`,
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  };
  if (endpointConfig.cookie) {
    headers.cookie = endpointConfig.cookie;
    const token = csrfToken(endpointConfig.cookie);
    if (token) headers["x-csrftoken"] = token;
  }
  return headers;
}

function retryDelay(attempt, backoffMs) {
  return backoffMs * 2 ** attempt + Math.floor(Math.random() * 250);
}

async function fetchEndpointTemplates(slug, endpointConfig, options, attempt = 0) {
  const response = await fetch(endpointConfig.endpoint, {
    method: "POST",
    headers: requestHeaders(slug, endpointConfig),
    body: JSON.stringify({
      operationName: "questionEditorData",
      query: questionTemplatesQuery,
      variables: { titleSlug: slug },
    }),
  });
  if (!response.ok) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchEndpointTemplates(slug, endpointConfig, options, attempt + 1);
    }
    throw new Error(`${endpointConfig.name} GraphQL ${response.status}`);
  }
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    if (attempt < options.retries) {
      await sleep(retryDelay(attempt, options.backoffMs));
      return fetchEndpointTemplates(slug, endpointConfig, options, attempt + 1);
    }
    throw new Error(
      `${endpointConfig.name} non-JSON response ${JSON.stringify(
        text.slice(0, 80),
      )}`,
    );
  }
  if (payload.errors?.length) {
    const message = payload.errors.map((item) => item.message).join("; ");
    throw new Error(`${endpointConfig.name}: ${message}`);
  }
  const question = payload.data?.question;
  if (!question) return [];
  return (question.codeSnippets || []).map((snippet) => ({
    lang: snippet.lang,
    langSlug: snippet.langSlug,
    code: snippet.code,
  }));
}

async function fetchTemplates(slug, options) {
  const errors = [];
  for (const endpointConfig of options.endpoints) {
    try {
      const endpointOptions = {
        ...options,
        retries:
          endpointConfig.name === "leetcode.cn" &&
          !endpointConfig.cookie &&
          options.endpoints.length > 1
            ? 0
            : options.retries,
      };
      const templates = await fetchEndpointTemplates(
        slug,
        endpointConfig,
        endpointOptions,
      );
      if (templates.length) return templates;
      errors.push(`${endpointConfig.name}: no templates`);
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(errors.join("; "));
}

async function runPool(items, worker, options) {
  let cursor = 0;
  const results = [];
  async function runWorker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
      await sleep(options.delayMs);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(options.concurrency, items.length) }, runWorker),
  );
  return results;
}

function renderOutput(templatesBySlug, missing) {
  const templateCount = Object.values(templatesBySlug).reduce(
    (sum, templates) => sum + templates.length,
    0,
  );
  const content = `export interface LeetcodeCodeTemplate {
  lang: string;
  langSlug: string;
  code: string;
}

export const leetcodeCodeTemplates = (${JSON.stringify(
    templatesBySlug,
    null,
    2,
  )}) satisfies Record<string, LeetcodeCodeTemplate[]>;

export const leetcodeCodeTemplateStats = {
  problems: ${Object.keys(templatesBySlug).length},
  templates: ${templateCount},
  missing: ${JSON.stringify(missing, null, 2)},
  source: "LeetCode China public GraphQL question.codeSnippets with LeetCode global fallback.",
} as const;
`;
  return content;
}

async function main() {
  const limit = numberOption("limit", Number.POSITIVE_INFINITY);
  const options = {
    backoffMs: numberOption("backoff-ms", defaultBackoffMs),
    concurrency: numberOption("concurrency", defaultConcurrency),
    delayMs: numberOption("delay-ms", defaultRequestDelayMs),
    endpoints: endpointConfigs(),
    retries: numberOption("retries", defaultRetryCount),
  };
  if (!options.endpoints.length) {
    throw new Error("No endpoint selected");
  }
  const mergeExisting = !hasFlag("fresh");
  const missingOnly = hasFlag("missing-only");
  const [source, bytedanceSource] = await Promise.all([
    readFile(problemsPath, "utf8"),
    readFile(bytedancePath, "utf8"),
  ]);
  const problems = buildBookProblems(
    extractJsonArray(
      source,
      "leetcodeProblems",
      "satisfies LeetcodeProblem\\[\\];",
    ),
    extractJsonArray(
      bytedanceSource,
      "leetcodeByteDanceProblems",
      "satisfies LeetcodeByteDanceProblem\\[\\];",
    ),
  ).slice(0, limit);
  const templatesBySlug = mergeExisting ? await readExistingTemplates() : {};
  const fetchProblems = missingOnly
    ? problems.filter((problem) => !templatesBySlug[problem.titleSlug])
    : problems;

  await runPool(
    fetchProblems,
    async (problem, index) => {
      const position = `${index + 1}/${fetchProblems.length}`;
      try {
        const templates = await fetchTemplates(problem.titleSlug, options);
        if (templates.length) {
          templatesBySlug[problem.titleSlug] = templates;
          console.log(`${position} ${problem.titleSlug}: ${templates.length}`);
        } else {
          delete templatesBySlug[problem.titleSlug];
          console.log(`${position} ${problem.titleSlug}: no templates`);
        }
      } catch (error) {
        console.warn(`${position} ${problem.titleSlug}: ${error.message}`);
      }
    },
    options,
  );

  const orderedTemplates = {};
  for (const problem of problems) {
    if (templatesBySlug[problem.titleSlug]) {
      orderedTemplates[problem.titleSlug] = templatesBySlug[problem.titleSlug];
    }
  }
  const missing = problems
    .filter((problem) => !orderedTemplates[problem.titleSlug])
    .map((problem) => problem.titleSlug);
  await writeFile(outputPath, renderOutput(orderedTemplates, missing));
  console.log(
    `wrote ${Object.keys(orderedTemplates).length} problems and ${
      Object.values(orderedTemplates).flat().length
    } templates to ${outputPath.pathname}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
