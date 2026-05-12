const focusButton = document.getElementById("focus-toggle");
const expandIcon = document.getElementById("focus-icon-expand");
const collapseIcon = document.getElementById("focus-icon-collapse");

function setFocusMode(enabled: boolean) {
  document.documentElement.classList.toggle("focus-mode", enabled);
  expandIcon?.classList.toggle("hidden", enabled);
  collapseIcon?.classList.toggle("hidden", !enabled);
  focusButton?.setAttribute("aria-pressed", String(enabled));
}

focusButton?.addEventListener("click", () => {
  setFocusMode(!document.documentElement.classList.contains("focus-mode"));
});
