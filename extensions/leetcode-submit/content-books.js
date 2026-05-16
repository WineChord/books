const pageMessageSource = "books-leetcode-page";
const extensionMessageSource = "books-leetcode-extension";
const protocolVersion = 1;
const allowedOriginPatterns = [
  /^https:\/\/wineandchord\.com$/,
  /^https:\/\/www\.wineandchord\.com$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/,
];

function isAllowedOrigin(origin) {
  return allowedOriginPatterns.some((pattern) => pattern.test(origin));
}

function isPageRequest(message) {
  return (
    message &&
    typeof message === "object" &&
    message.source === pageMessageSource &&
    message.version === protocolVersion
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
  if (!isPageRequest(event.data)) return;

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

    postResponse(response);
  });
});
