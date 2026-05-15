import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

function readThemeMode(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Watches the html.dark class and re-renders when it flips.
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    setMode(readThemeMode());

    if (typeof document === "undefined") {
      return;
    }

    const observer = new MutationObserver(() => {
      setMode(readThemeMode());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<{ theme?: ThemeMode }>).detail;
      if (detail?.theme === "light" || detail?.theme === "dark") {
        setMode(detail.theme);
      } else {
        setMode(readThemeMode());
      }
    };
    document.addEventListener("themechange", handleThemeChange as EventListener);

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "themechange",
        handleThemeChange as EventListener,
      );
    };
  }, []);

  return mode;
}

// Bilingual color tokens shared across visual components.
export const palette = {
  light: {
    background: "#fdfaf2",
    panel: "#ffffff",
    border: "#dcd6c2",
    softBorder: "#e8e3d2",
    accent: "#c2410c",
    accentSoft: "rgba(194, 65, 12, 0.12)",
    accentHover: "#9a3412",
    text: "#1f2937",
    textMuted: "#6b7280",
    success: "#15803d",
    successSoft: "rgba(21, 128, 61, 0.12)",
    warning: "#a16207",
    warningSoft: "rgba(161, 98, 7, 0.12)",
    info: "#0e7490",
    infoSoft: "rgba(14, 116, 144, 0.12)",
    accentMuted: "#9a3412",
    track: "#f5f1e2",
    grid: "#ece5d0",
  },
  dark: {
    background: "#161616",
    panel: "#1f1f1d",
    border: "#3d3d39",
    softBorder: "#2c2c29",
    accent: "#fb923c",
    accentSoft: "rgba(251, 146, 60, 0.18)",
    accentHover: "#fdba74",
    text: "#f5f1e2",
    textMuted: "#a3a298",
    success: "#86efac",
    successSoft: "rgba(134, 239, 172, 0.16)",
    warning: "#fcd34d",
    warningSoft: "rgba(252, 211, 77, 0.18)",
    info: "#67e8f9",
    infoSoft: "rgba(103, 232, 249, 0.16)",
    accentMuted: "#fdba74",
    track: "#28272a",
    grid: "#34322f",
  },
} as const;

export type Palette = (typeof palette)[ThemeMode];
