const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"));
const sections = links
  .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
  .filter((element): element is HTMLElement => Boolean(element));

if (links.length && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
  );

  sections.forEach((section) => observer.observe(section));
}
