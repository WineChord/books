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
    },
  },
  window.location.origin,
);
```

`run` creates an official-example run with the testcases returned by
LeetCode's `questionEditorData.exampleTestcases`. `submit` creates a full
LeetCode submission. Both request types use the same payload shape and return a
LeetCode id quickly. The page then polls `check` with that id.

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
    submissionId: 123456789
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
      output: "",
      expectedOutput: "",
      runtimeError: "",
      standardOutput: "",
      finished: true,
      raw: {}
    }
  }
}
```

When LeetCode returns a failed testcase, `input` contains that testcase,
`output` contains the submitted code output, and `expectedOutput` contains the
judge expectation. Runtime and compile diagnostics are exposed through
`runtimeError` and `compileError`.

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

The response contains only booleans.

```js
{
  source: "books-leetcode-extension",
  version: 1,
  requestId: "client-generated-id",
  ok: true,
  type: "login-status",
  data: {
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

Cookie values are not logged, hardcoded, sent to the page, or stored by this
extension.

The service worker installs a dynamic request-header rule for
`https://leetcode.cn/*` so LeetCode receives same-origin `Origin` and
`Referer` headers on extension requests. The rule is scoped to extension
requests covered by the LeetCode host permission.
