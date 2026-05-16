const pageMessageSource = "books-leetcode-page";
const extensionMessageSource = "books-leetcode-extension";
const protocolVersion = 1;
const allowedOriginPatterns = [
  /^https:\/\/wineandchord\.com$/,
  /^https:\/\/www\.wineandchord\.com$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];
const allowedPathPatterns = [
  /^\/books\/leetcode\/?$/,
  /^\/books\/zh\/leetcode\/?$/,
];
const allowedRequestTypes = new Set(["check", "run", "submit", "login-status"]);

function isAllowedOrigin(origin) {
  return allowedOriginPatterns.some((pattern) => pattern.test(origin));
}

function isAllowedPath(pathname) {
  return allowedPathPatterns.some((pattern) => pattern.test(pathname));
}

function isPageRequest(message) {
  return (
    message &&
    typeof message === "object" &&
    message.source === pageMessageSource &&
    message.version === protocolVersion &&
    allowedRequestTypes.has(message.type)
  );
}

function hasValidCodePayload(message) {
  if (message.type !== "run" && message.type !== "submit") return true;
  const payload = message.payload;
  return (
    payload &&
    typeof payload === "object" &&
    typeof payload.titleSlug === "string" &&
    typeof payload.langSlug === "string" &&
    typeof payload.code === "string"
  );
}

function hasValidCheckPayload(message) {
  if (message.type !== "check") return true;
  const payload = message.payload;
  return (
    payload &&
    typeof payload === "object" &&
    (typeof payload.submissionId === "number" ||
      typeof payload.submissionId === "string")
  );
}

function requestIdFrom(message) {
  return typeof message.requestId === "string" ? message.requestId : null;
}

function postResponse(response) {
  window.postMessage(
    {
      ...response,
      source: extensionMessageSource,
      version: protocolVersion,
    },
    window.location.origin,
  );
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (!isAllowedOrigin(event.origin)) return;
  if (!isAllowedPath(window.location.pathname)) return;
  if (!isPageRequest(event.data)) return;
  if (!hasValidCodePayload(event.data)) return;
  if (!hasValidCheckPayload(event.data)) return;

  postResponse({
    ok: true,
    requestId: requestIdFrom(event.data),
    type: "ack",
  });

  chrome.runtime.sendMessage(event.data, (response) => {
    const runtimeError = chrome.runtime.lastError;
    if (runtimeError) {
      postResponse({
        ok: false,
        requestId: requestIdFrom(event.data),
        type: "error",
        error: {
          code: "extension_unavailable",
          message: runtimeError.message,
        },
      });
      return;
    }

    if (!response) {
      postResponse({
        ok: false,
        requestId: requestIdFrom(event.data),
        type: "error",
        error: {
          code: "extension_empty_response",
          message: "Extension returned no response.",
        },
      });
      return;
    }

    postResponse(response);
  });
});
