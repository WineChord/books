function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function remarkMermaidRaw() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (!node.children) return;
  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];
    if (child.type === "code" && child.lang === "mermaid") {
      node.children[index] = {
        type: "html",
        value: `<div class="mermaid-scroll" tabindex="0" aria-label="Scrollable architecture diagram"><div class="mermaid">${escapeHtml(child.value)}</div></div>`,
      };
    } else {
      walk(child);
    }
  }
}
