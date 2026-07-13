export function downloadTextFile(
  filename: string,
  content: string,
  type = "text/plain;charset=utf-8",
) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function rowsToCsv(rows: Array<Array<string | number>>) {
  return rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");
}

export function consumeDashboardIntent(intent: string) {
  if (typeof window === "undefined") return null;

  const url = new URL(window.location.href);
  const storageKey = `echelon-dashboard-intent:${url.pathname}:${intent}`;
  const storedParameters = window.sessionStorage.getItem(storageKey);

  if (url.searchParams.get("create") !== intent) {
    return storedParameters ? new URLSearchParams(storedParameters) : null;
  }

  const parameters = new URLSearchParams(url.searchParams);
  window.sessionStorage.setItem(storageKey, parameters.toString());
  window.setTimeout(() => {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get("create") !== intent) return;
    ["create", "customer", "name", "email", "company"].forEach((parameter) => currentUrl.searchParams.delete(parameter));
    window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
  }, 250);
  window.setTimeout(() => window.sessionStorage.removeItem(storageKey), 1200);
  return parameters;
}
