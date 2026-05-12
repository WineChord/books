const diagrams = Array.from(document.querySelectorAll<HTMLElement>(".mermaid"));

if (diagrams.length > 0) {
  void import("mermaid").then(({ default: mermaid }) => {
    diagrams.forEach((diagram) => {
      diagram.dataset.mermaidSource = diagram.textContent ?? "";
    });

    function renderDiagrams() {
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
        securityLevel: "strict",
      });

      diagrams.forEach((diagram) => {
        diagram.removeAttribute("data-processed");
        diagram.textContent = diagram.dataset.mermaidSource ?? "";
      });

      void mermaid.run({
        nodes: diagrams,
      });
    }

    document.addEventListener("themechange", renderDiagrams);
    renderDiagrams();
  });
}
