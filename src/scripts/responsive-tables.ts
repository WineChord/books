const enhanceTables = () => {
  document.querySelectorAll<HTMLTableElement>(".chapter-prose table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll<HTMLTableCellElement>("thead th")).map(
      (cell) => cell.textContent?.trim() ?? "",
    );

    if (headers.length === 0) {
      return;
    }

    table.querySelectorAll<HTMLTableRowElement>("tbody tr").forEach((row) => {
      Array.from(row.children).forEach((cell, index) => {
        if (cell instanceof HTMLTableCellElement && headers[index]) {
          cell.dataset.label = headers[index];
        }
      });
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enhanceTables, { once: true });
} else {
  enhanceTables();
}
