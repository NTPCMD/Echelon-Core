export type AccountMode = "consumer" | "business";
export type AuthEntry = "login" | "register";

type SearchParamValue = string | string[] | undefined;
export type AuthSearchParams = Record<string, SearchParamValue>;

const localOrigin = "https://echelon.local";

function firstValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function isBusinessPath(path: string): boolean {
  return path === "/business-dashboard" || path.startsWith("/business-dashboard/");
}

export function safeInternalPath(value: string | undefined, fallback: string): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  try {
    const url = new URL(value, localOrigin);
    if (url.origin !== localOrigin || url.pathname.startsWith("/auth/")) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function defaultDestination(mode: AccountMode, entry: AuthEntry = "login"): string {
  if (mode === "business") return "/business-dashboard";
  return entry === "register" ? "/welcome" : "/dashboard";
}

export function destinationForMode(
  mode: AccountMode,
  requestedPath: string | undefined,
  entry: AuthEntry,
): string {
  const fallback = defaultDestination(mode, entry);
  const path = safeInternalPath(requestedPath, fallback);
  return isBusinessPath(path) === (mode === "business") ? path : fallback;
}

export function resolveAuthIntent(
  searchParams: AuthSearchParams,
  entry: AuthEntry,
): { mode: AccountMode; returnTo: string } {
  const requestedPath = firstValue(searchParams.returnTo) ?? firstValue(searchParams.redirect_url);
  const explicitMode = firstValue(searchParams.mode);
  const mode: AccountMode =
    explicitMode === "business" || explicitMode === "consumer"
      ? explicitMode
      : isBusinessPath(safeInternalPath(requestedPath, "/dashboard"))
        ? "business"
        : "consumer";

  return {
    mode,
    returnTo: destinationForMode(mode, requestedPath, entry),
  };
}

export function buildAuthEntryUrl(entry: AuthEntry, mode: AccountMode, returnTo?: string): string {
  const destination = destinationForMode(mode, returnTo, entry);
  const params = new URLSearchParams({ mode, returnTo: destination });
  return `/auth/${entry}?${params.toString()}`;
}

export function buildAuthContinuationUrl(mode: AccountMode, returnTo?: string): string {
  const destination = destinationForMode(mode, returnTo, "login");
  const params = new URLSearchParams({ mode, returnTo: destination });
  return `/auth/continue?${params.toString()}`;
}

export function buildBusinessOnboardingUrl(returnTo?: string): string {
  const destination = destinationForMode("business", returnTo, "register");
  return `/business-onboarding?${new URLSearchParams({ returnTo: destination }).toString()}`;
}
