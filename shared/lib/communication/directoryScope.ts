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

/** Same flag the backend reads in directoryScope(). Must stay in sync. */
export const DIRECTORY_RBAC_FLAG = "communicationDirectoryRbac";

/**
 * `flagEnabled` is REQUIRED, not optional.
 *
 * The backend returns { kind: 'all' } whenever the flag is off, so a client that derived scope
 * from permissions alone would hide the directory from restricted roles while the API still served
 * it — meaning "unset the flag" would NOT roll the user-visible behaviour back. Taking the flag as
 * a parameter keeps this function pure and testable while making flag-off a genuine full rollback
 * on both sides.
 */
export function deriveDirectoryScope(
  permissions: string[],
  flagEnabled: boolean
): DirectoryScope {
  if (!flagEnabled) return "all";
  if (permissions.includes(DIRECTORY_ALL_PERMISSION)) return "all";
  if (permissions.includes(DIRECTORY_REFERRED_PERMISSION)) return "referred";
  return "none";
}
