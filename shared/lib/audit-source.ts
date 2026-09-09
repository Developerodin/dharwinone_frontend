/**
 * Maps current browser path to x-audit-source for ATS mutation requests.
 * Backend accepts allowlisted tokens or paths starting with `ats/`.
 */
const ATS_PREFIX = "/ats";

/** Derive stable audit source from pathname (max 120 chars). */
export function resolveAuditSource(pathname: string): string {
  const path = (pathname || "").trim();
  if (!path.toLowerCase().startsWith(ATS_PREFIX)) return "system";
  const normalized = path.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
  return normalized.slice(0, 120);
}

/** True for HTTP methods that mutate server state. */
export function isMutationMethod(method?: string): boolean {
  const m = (method || "get").toLowerCase();
  return m === "post" || m === "put" || m === "patch" || m === "delete";
}

/** Header value for x-audit-source on ATS screens. */
export function getAuditSourceHeader(pathname: string): string {
  return resolveAuditSource(pathname);
}
