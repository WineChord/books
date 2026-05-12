document.querySelectorAll("pre").forEach((pre) => {
  const wrapper = document.createElement("div");
  wrapper.className = "code-block-wrapper";
  pre.parentNode?.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-button";
  button.setAttribute("aria-label", "Copy code block");
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(pre.textContent ?? "");
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = "Copy";
    }, 1200);
  });
  wrapper.appendChild(button);
});
