export function getTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme() {
  document.documentElement.classList.toggle("dark", getTheme() === "dark");
  document.dispatchEvent(new CustomEvent("themechange"));
}

export function toggleTheme() {
  localStorage.setItem("theme", getTheme() === "dark" ? "light" : "dark");
  applyTheme();
}
