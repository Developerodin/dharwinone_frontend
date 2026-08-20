/**
 * Contact-directory scope, derived from the permission payload the client already fetches via
 * GET /v1/auth/my-permissions. No new endpoint. Spec §7.1.
 *
 * Precedence MUST match the backend's directoryScope() in
 * src/services/communicationAccess.service.js, or the UI and the API disagree about what the
 * user can see.
 */
export type DirectoryScope = "all" | "referred" | "none";

export const DIRECTORY_ALL_PERMISSION = "communication.directory:all";
export const DIRECTORY_REFERRED_PERMISSION = "communication.directory:referred";

/** Frontend-only UI flag key (NEXT_PUBLIC_COMMUNICATIONDIRECTORYRBAC). Backend always enforces RBAC. */
export const DIRECTORY_RBAC_FLAG = "communicationDirectoryRbac";

/**
 * `flagEnabled` gates the strict RBAC path but is not the only signal.
 *
 * When the flag is on, scope follows permissions exactly (matches backend directoryScope()).
 * When the flag is off/stale/missing on the client, users who lack both directory:* grants
 * still get `"none"` once permissions are loaded — fail-closed for Employee-type roles on
 * Vercel builds that omit NEXT_PUBLIC_COMMUNICATIONDIRECTORYRBAC. Empty permissions + flag
 * off keeps legacy `"all"` for intentional rollback.
 */
export function deriveDirectoryScope(
  permissions: string[],
  flagEnabled: boolean
): DirectoryScope {
  if (permissions.includes(DIRECTORY_ALL_PERMISSION)) return "all";
  if (permissions.includes(DIRECTORY_REFERRED_PERMISSION)) return "referred";
  if (flagEnabled) return "none";

  // Fail-closed when the frontend flag is missing or stale (NEXT_PUBLIC_* not baked at
  // Vercel build, /feature-flags fetch failed, or session cache false) but the user
  // clearly lacks directory grants. Employee-type roles still get EmailLookupPanel-only UI.
  if (permissions.length > 0) return "none";

  // Legacy rollback: flag off and permissions not yet known → full directory UI.
  return "all";
}
