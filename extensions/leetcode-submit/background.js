const pageMessageSource = "books-leetcode-page";
const extensionMessageSource = "books-leetcode-extension";
const protocolVersion = 1;
const leetcodeOrigin = "https://leetcode.cn";
const leetcodeUrlFilter = "||leetcode.cn/";
const leetcodeHeaderRuleId = 1;
const graphqlEndpoint = `${leetcodeOrigin}/graphql/`;
const interpretPathSuffix = "interpret_solution/";
const submitPathSuffix = "submit/";
const submissionCheckPathPrefix = "/submissions/detail/";
const submissionCheckPathSuffix = "/check/";
const csrfCookieName = "csrftoken";
const sessionCookieName = "LEETCODE_SESSION";
const requestTimeoutMs = 15000;
const jsonContentType = "application/json";
const questionEditorOperationName = "questionEditorData";
const checkRequestType = "check";
const runRequestType = "run";
const submitRequestType = "submit";
const loginStatusRequestType = "login-status";
const pendingState = "PENDING";
const startedState = "STARTED";

const questionEditorQuery = `
query questionEditorData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    titleSlug
    exampleTestcases
    codeSnippets {
      lang
      langSlug
      code
    }
  }
}
`;

class ExtensionError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "ExtensionError";
    this.code = code;
    this.details = details;
  }
}

function isPageRequest(message) {
  return (
    message &&
    typeof message === "object" &&
    message.source === pageMessageSource &&
    message.version === protocolVersion
  );
}

function responseFor(request, body) {
  return {
    ...body,
    requestId: typeof request.requestId === "string" ? request.requestId : null,
    source: extensionMessageSource,
    version: protocolVersion,
  };
}

function errorResponse(request, error) {
  const code = error instanceof ExtensionError ? error.code : "unexpected_error";
  const details = error instanceof ExtensionError ? error.details : {};
  return responseFor(request, {
    ok: false,
    type: "error",
    error: {
      code,
      message: error.message || "Unexpected extension error.",
      ...details,
    },
  });
}

function cookieByName(name) {
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      {
        name,
        url: leetcodeOrigin,
      },
      (cookie) => {
        const runtimeError = chrome.runtime.lastError;
        if (runtimeError) {
          reject(new Error(runtimeError.message));
          return;
        }
        resolve(cookie);
      },
    );
  });
}

function updateDynamicRules(options) {
  return new Promise((resolve, reject) => {
    chrome.declarativeNetRequest.updateDynamicRules(options, () => {
      const runtimeError = chrome.runtime.lastError;
      if (runtimeError) {
        reject(new Error(runtimeError.message));
        return;
      }
      resolve();
    });
  });
}

async function ensureLeetcodeHeaderRules() {
  try {
    await updateDynamicRules({
      addRules: [
        {
          action: {
            requestHeaders: [
              {
                header: "Origin",
                operation: "set",
                value: leetcodeOrigin,
              },
              {
                header: "Referer",
                operation: "set",
                value: `${leetcodeOrigin}/`,
              },
            ],
            type: "modifyHeaders",
          },
          condition: {
            resourceTypes: ["xmlhttprequest"],
            urlFilter: leetcodeUrlFilter,
          },
          id: leetcodeHeaderRuleId,
          priority: 1,
        },
      ],
      removeRuleIds: [leetcodeHeaderRuleId],
    });
  } catch (error) {
    throw new ExtensionError(
      "leetcode_header_rule_failed",
      "Failed to prepare LeetCode request headers.",
      {
        message: error.message || "Unknown declarativeNetRequest error.",
      },
    );
  }
}

async function leetcodeLoginState() {
  const [csrfCookie, sessionCookie] = await Promise.all([
    cookieByName(csrfCookieName),
    cookieByName(sessionCookieName),
  ]);

  return {
    csrfToken: csrfCookie?.value || "",
    isLoggedIn: Boolean(sessionCookie?.value),
  };
}

async function requireLoginState() {
  const loginState = await leetcodeLoginState();
  if (!loginState.isLoggedIn) {
    throw new ExtensionError(
      "leetcode_login_required",
      "Please sign in to leetcode.cn before running or submitting.",
    );
  }
  if (!loginState.csrfToken) {
    throw new ExtensionError(
      "leetcode_csrf_missing",
      "LeetCode CN CSRF cookie is missing.",
    );
  }
  return loginState;
}

function headersFor(slug, csrfToken) {
  void slug;
  return {
    accept: "application/json, text/plain, */*",
    "content-type": jsonContentType,
    "x-csrftoken": csrfToken,
  };
}

async function fetchJson(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, requestTimeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      signal: controller.signal,
    });
    const text = await response.text();
    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (error) {
        throw new ExtensionError(
          "leetcode_non_json_response",
          "LeetCode returned a non-JSON response.",
          {
            status: response.status,
            preview: text.slice(0, 160),
          },
        );
      }
    }
    if (!response.ok) {
      throw new ExtensionError(
        "leetcode_http_error",
        `LeetCode request failed with HTTP ${response.status}.`,
        {
          payload,
          status: response.status,
        },
      );
    }
    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new ExtensionError(
        "leetcode_request_timeout",
        "LeetCode request timed out.",
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchQuestionEditorData(slug, csrfToken) {
  const payload = await fetchJson(graphqlEndpoint, {
    body: JSON.stringify({
      operationName: questionEditorOperationName,
      query: questionEditorQuery,
      variables: { titleSlug: slug },
    }),
    headers: headersFor(slug, csrfToken),
    method: "POST",
  });

  if (payload?.errors?.length) {
    const message = payload.errors.map((item) => item.message).join("; ");
    throw new ExtensionError("leetcode_graphql_error", message, {
      errors: payload.errors,
    });
  }

  const question = payload?.data?.question;
  if (!question?.questionId) {
    throw new ExtensionError(
      "leetcode_question_not_found",
      `Question ${slug} was not found on leetcode.cn.`,
    );
  }
  return question;
}

function normalizedCodeInput(request) {
  const payload = request.payload && typeof request.payload === "object"
    ? request.payload
    : request;
  const titleSlug = String(payload.titleSlug || "").trim();
  const langSlug = String(payload.langSlug || payload.lang || "").trim();
  const code = String(payload.code || payload.typedCode || "");

  if (!titleSlug) {
    throw new ExtensionError("invalid_request", "Missing titleSlug.");
  }
  if (!langSlug) {
    throw new ExtensionError("invalid_request", "Missing langSlug.");
  }
  if (!code.trim()) {
    throw new ExtensionError("invalid_request", "Missing code.");
  }

  return { code, langSlug, titleSlug };
}

function normalizedCheckInput(request) {
  const payload = request.payload && typeof request.payload === "object"
    ? request.payload
    : request;
  const submissionId = String(payload.submissionId || "").trim();

  if (!submissionId) {
    throw new ExtensionError("invalid_request", "Missing submissionId.");
  }

  return { submissionId };
}

function submitUrl(slug) {
  return `${leetcodeOrigin}/problems/${encodeURIComponent(slug)}/` +
    submitPathSuffix;
}

function interpretUrl(slug) {
  return `${leetcodeOrigin}/problems/${encodeURIComponent(slug)}/` +
    interpretPathSuffix;
}

function submissionCheckUrl(submissionId) {
  return `${leetcodeOrigin}${submissionCheckPathPrefix}` +
    `${encodeURIComponent(String(submissionId))}${submissionCheckPathSuffix}`;
}

async function createRun(input, question, csrfToken) {
  const dataInput = String(question.exampleTestcases || "").trim();
  if (!dataInput) {
    throw new ExtensionError(
      "leetcode_examples_missing",
      "LeetCode did not return example testcases for this question.",
    );
  }

  const payload = await fetchJson(interpretUrl(input.titleSlug), {
    body: JSON.stringify({
      data_input: dataInput,
      lang: input.langSlug,
      question_id: question.questionId,
      typed_code: input.code,
    }),
    headers: headersFor(input.titleSlug, csrfToken),
    method: "POST",
  });

  const interpretId = payload?.interpret_id;
  if (!interpretId) {
    throw new ExtensionError(
      "leetcode_run_rejected",
      "LeetCode did not return an interpret id.",
      {
        payload,
      },
    );
  }

  return {
    payload,
    submissionId: interpretId,
  };
}

async function createSubmission(input, question, csrfToken) {
  const payload = await fetchJson(submitUrl(input.titleSlug), {
    body: JSON.stringify({
      lang: input.langSlug,
      question_id: question.questionId,
      typed_code: input.code,
    }),
    headers: headersFor(input.titleSlug, csrfToken),
    method: "POST",
  });

  const submissionId = payload?.submission_id;
  if (!submissionId) {
    throw new ExtensionError(
      "leetcode_submit_rejected",
      "LeetCode did not return a submission id.",
      {
        payload,
      },
    );
  }

  return {
    payload,
    submissionId,
  };
}

function isFinishedSubmission(payload) {
  const state = payload?.state;
  if (state) return state !== pendingState && state !== startedState;
  return Boolean(payload?.status_msg || payload?.status_code);
}

function normalizeSubmission(payload, submissionId) {
  return {
    compileError: payload?.compile_error || payload?.full_compile_error || "",
    expectedOutput: payload?.expected_output || "",
    finished: isFinishedSubmission(payload),
    input: payload?.input || payload?.last_testcase || "",
    memory: payload?.memory || "",
    output: payload?.code_output || payload?.code_answer || "",
    runSuccess: Boolean(payload?.run_success),
    state: payload?.state || "",
    statusCode: payload?.status_code ?? null,
    statusMessage: payload?.status_msg || "",
    submissionId,
    totalCorrect: payload?.total_correct ?? null,
    totalTestcases: payload?.total_testcases ?? null,
    runtime: payload?.status_runtime || payload?.runtime || "",
    raw: payload,
  };
}

async function checkSubmissionOnce(submissionId, csrfToken) {
  const payload = await fetchJson(submissionCheckUrl(submissionId), {
    headers: headersFor("", csrfToken),
    method: "GET",
  });
  return normalizeSubmission(payload, submissionId);
}

async function handleLoginStatus(request) {
  const loginState = await leetcodeLoginState();
  return responseFor(request, {
    ok: true,
    type: loginStatusRequestType,
    data: {
      isLoggedIn: loginState.isLoggedIn,
      hasCsrfToken: Boolean(loginState.csrfToken),
    },
  });
}

async function handleRun(request) {
  const input = normalizedCodeInput(request);
  await ensureLeetcodeHeaderRules();
  const loginState = await requireLoginState();
  const question = await fetchQuestionEditorData(
    input.titleSlug,
    loginState.csrfToken,
  );
  const run = await createRun(input, question, loginState.csrfToken);

  return responseFor(request, {
    ok: true,
    type: runRequestType,
    data: {
      question: {
        questionId: question.questionId,
        questionFrontendId: question.questionFrontendId,
        title: question.title,
        titleSlug: question.titleSlug,
      },
      run: run.payload,
      submissionId: run.submissionId,
    },
  });
}

async function handleSubmit(request) {
  const input = normalizedCodeInput(request);
  await ensureLeetcodeHeaderRules();
  const loginState = await requireLoginState();
  const question = await fetchQuestionEditorData(
    input.titleSlug,
    loginState.csrfToken,
  );
  const submission = await createSubmission(
    input,
    question,
    loginState.csrfToken,
  );

  return responseFor(request, {
    ok: true,
    type: submitRequestType,
    data: {
      question: {
        questionId: question.questionId,
        questionFrontendId: question.questionFrontendId,
        title: question.title,
        titleSlug: question.titleSlug,
      },
      submit: submission.payload,
      submissionId: submission.submissionId,
    },
  });
}

async function handleCheck(request) {
  const input = normalizedCheckInput(request);
  await ensureLeetcodeHeaderRules();
  const loginState = await requireLoginState();
  const result = await checkSubmissionOnce(
    input.submissionId,
    loginState.csrfToken,
  );

  return responseFor(request, {
    ok: true,
    type: checkRequestType,
    data: {
      result,
      submissionId: input.submissionId,
    },
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!isPageRequest(request)) return false;

  (async () => {
    try {
      if (request.type === loginStatusRequestType) {
        sendResponse(await handleLoginStatus(request));
        return;
      }
      if (request.type === checkRequestType) {
        sendResponse(await handleCheck(request));
        return;
      }
      if (request.type === runRequestType) {
        sendResponse(await handleRun(request));
        return;
      }
      if (request.type === submitRequestType) {
        sendResponse(await handleSubmit(request));
        return;
      }
      throw new ExtensionError(
        "unsupported_request_type",
        `Unsupported request type: ${request.type}`,
      );
    } catch (error) {
      sendResponse(errorResponse(request, error));
    }
  })();

  return true;
});
