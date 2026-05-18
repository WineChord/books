# LeetCode Submit Extension

This directory contains a no-build Chrome Manifest V3 extension for the
WineChord Books LeetCode page. It lets the page run official example cases and
submit local editor code to LeetCode China without exposing LeetCode cookies to
page JavaScript.

## Install

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this directory: `extensions/leetcode-submit`.
5. Sign in to <https://leetcode.cn> in the same Chrome profile.

After pulling extension changes, click Reload on this unpacked extension in
`chrome://extensions` before retesting the page.

## Protocol

The book page sends requests with `window.postMessage`.

```js
window.postMessage(
  {
    source: "books-leetcode-page",
    version: 1,
    type: "run",
    requestId: "client-generated-id",
    payload: {
      titleSlug: "two-sum",
      langSlug: "cpp",
      code: "class Solution { ... };",
      extraTestcases: "[0,4,3,0]\n0",
    },
  },
  window.location.origin,
);
```

`run` creates an official-example run with the testcases returned by
LeetCode's `questionEditorData.exampleTestcases`, plus optional
`extraTestcases` appended by the page. `submit` creates a full LeetCode
submission and ignores `extraTestcases`. Both request types use the same core
payload shape and return a LeetCode id quickly. The page then polls `check`
with that id.

The content script accepts messages only from the current page window on
`wineandchord.com`, `www.wineandchord.com`, `localhost`, or `127.0.0.1`.
It forwards valid requests to the extension background service worker.

The extension responds back to the page with the same `requestId`.

```js
{
  source: "books-leetcode-extension",
  version: 1,
  requestId: "client-generated-id",
  ok: true,
  type: "run",
  data: {
    question: {
      questionId: "1",
      questionFrontendId: "1",
      title: "Two Sum",
      titleSlug: "two-sum",
    },
    run: {
      interpret_id: 123456789,
    },
    submissionId: 123456789,
    testcaseGroups: [
      {
        source: "official",
        fields: [
          { name: "nums", value: "[2,7,11,15]" },
          { name: "target", value: "9" }
        ]
      },
      {
        source: "extra",
        fields: [
          { name: "nums", value: "[0,4,3,0]" },
          { name: "target", value: "0" }
        ]
      }
    ],
    testcases: "[2,7,11,15]\n9\n[0,4,3,0]\n0"
  }
}
```

The page checks the result with a separate short request.

```js
window.postMessage(
  {
    source: "books-leetcode-page",
    version: 1,
    type: "check",
    requestId: "client-generated-id",
    payload: {
      submissionId: 123456789,
    },
  },
  window.location.origin,
);
```

```js
{
  source: "books-leetcode-extension",
  version: 1,
  requestId: "client-generated-id",
  ok: true,
  type: "check",
  data: {
    submissionId: 123456789,
    result: {
      submissionId: 123456789,
      state: "SUCCESS",
      statusMessage: "Accepted",
      statusCode: 10,
      runSuccess: true,
      totalCorrect: 63,
      totalTestcases: 63,
      runtime: "0 ms",
      memory: "9.8 MB",
      compileError: "",
      input: "",
      output: ["0"],
      expectedOutput: ["0"],
      runtimeError: "",
      standardOutput: ["debug line"],
      finished: true,
      raw: {}
    }
  }
}
```

When LeetCode returns run or submit details, `output` contains the submitted
code answer from LeetCode's `code_answer`, `expectedOutput` contains the judge
expectation from `expected_code_answer`, and `standardOutput` contains stdout
from `std_output_list` or `std_output` when LeetCode exposes it. Runtime and
compile diagnostics are exposed through `runtimeError` and `compileError`.

Errors use the same envelope and set `ok` to `false`.

```js
{
  source: "books-leetcode-extension",
  version: 1,
  requestId: "client-generated-id",
  ok: false,
  type: "error",
  error: {
    code: "leetcode_login_required",
    message: "Please sign in to leetcode.cn before submitting."
  }
}
```

The page can also check login state without submitting code.

```js
window.postMessage(
  {
    source: "books-leetcode-page",
    version: 1,
    type: "login-status",
    requestId: "client-generated-id",
  },
  window.location.origin,
);
```

The response contains login booleans plus extension metadata. The page uses
`featureVersion` and `capabilities` to detect whether the loaded unpacked
extension is current before running or submitting.

```js
{
  source: "books-leetcode-extension",
  version: 1,
  requestId: "client-generated-id",
  ok: true,
  type: "login-status",
  data: {
    capabilities: [
      "check",
      "run",
      "submit",
      "login-status",
      "extra-run-testcases",
      "grouped-run-testcases",
      "run-output-details"
    ],
    extensionVersion: "0.5.0",
    featureVersion: 5,
    isLoggedIn: true,
    hasCsrfToken: true
  }
}
```

## LeetCode Flow

For a run or submit request, the background service worker:

1. Checks for LeetCode CN login state with `chrome.cookies`.
2. Reads the CSRF cookie only to set the `x-csrftoken` request header.
3. Fetches `questionEditorData` from `https://leetcode.cn/graphql/`.
4. For `run`, posts `{ data_input, lang, question_id, typed_code }` to
   `https://leetcode.cn/problems/{titleSlug}/interpret_solution/`.
5. For `submit`, posts `{ lang, question_id, typed_code }` to
   `https://leetcode.cn/problems/{titleSlug}/submit/`.
6. Returns the LeetCode interpretation or submission id to the page.
7. For later `check` requests, reads
   `https://leetcode.cn/submissions/detail/{submissionId}/check/` once and
   returns a structured result or structured error to the page.

For run requests, the extension also parses `questionEditorData.metaData` and
returns `testcaseGroups` so the page can display each LeetCode input case with
its parameter names instead of one combined blob. Run check responses preserve
LeetCode's output, expected output, and stdout fields so the page can attach
them to matching case tabs or show them as standalone debug details.

Cookie values are not logged, hardcoded, sent to the page, or stored by this
extension.

The service worker installs a dynamic request-header rule for
`https://leetcode.cn/*` so LeetCode receives same-origin `Origin` and
`Referer` headers on extension requests. The rule is scoped to extension
requests covered by the LeetCode host permission.
