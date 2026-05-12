const progressBar = document.getElementById("reading-progress-bar");

if (progressBar) {
  let ticking = false;

  function updateProgress() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? Math.min(window.scrollY / height, 1) : 0;
    progressBar.style.width = `${progress * 100}%`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateProgress();
}
