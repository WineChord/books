# LeetCode Submit Extension

This directory contains a no-build Chrome Manifest V3 extension for the
WineChord Books LeetCode page. It lets the page submit local editor code to
LeetCode China without exposing LeetCode cookies to page JavaScript.

## Install

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this directory: `extensions/leetcode-submit`.
5. Sign in to <https://leetcode.cn> in the same Chrome profile.

## Protocol

The book page sends requests with `window.postMessage`.

```js
window.postMessage(
  {
    source: "books-leetcode-page",
    version: 1,
    type: "submit",
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
  type: "submit",
  data: {
    question: {
      questionId: "1",
      questionFrontendId: "1",
      title: "Two Sum",
      titleSlug: "two-sum",
    },
    submit: {
      submission_id: 123456789,
    },
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
      finished: true,
      pollAttempts: 2,
      raw: {}
    }
  }
}
```

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

For a submit request, the background service worker:

1. Checks for LeetCode CN login state with `chrome.cookies`.
2. Reads the CSRF cookie only to set the `x-csrftoken` request header.
3. Fetches `questionEditorData` from `https://leetcode.cn/graphql/`.
4. Posts `{ lang, question_id, typed_code }` to
   `https://leetcode.cn/problems/{titleSlug}/submit/`.
5. Polls
   `https://leetcode.cn/submissions/detail/{submissionId}/check/`.
6. Returns a structured result or structured error to the page.

Cookie values are not logged, hardcoded, sent to the page, or stored by this
extension.

The service worker installs a dynamic request-header rule for
`https://leetcode.cn/*` so LeetCode receives same-origin `Origin` and
`Referer` headers on extension requests. The rule is scoped to extension
requests covered by the LeetCode host permission.
