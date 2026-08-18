export const SOCIAL_PLATFORMS = [
  "LinkedIn",
  "GitHub",
  "Twitter",
  "Facebook",
  "Instagram",
  "Portfolio",
  "Website",
  "Other",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export type SocialLinkRow = { platform: string; url: string };

/** Hostnames allowed per platform. Platforms omitted here accept any valid URL. */
const PLATFORM_HOSTS: Record<string, readonly string[]> = {
  LinkedIn: ["linkedin.com", "www.linkedin.com"],
  GitHub: ["github.com", "www.github.com"],
  Twitter: ["twitter.com", "www.twitter.com", "x.com", "www.x.com", "mobile.twitter.com"],
  Facebook: ["facebook.com", "www.facebook.com", "fb.com", "m.facebook.com"],
  Instagram: ["instagram.com", "www.instagram.com"],
};

const PLATFORM_URL_EXAMPLES: Record<string, string> = {
  LinkedIn: "linkedin.com/in/you",
  GitHub: "github.com/you",
  Twitter: "x.com/you",
  Facebook: "facebook.com/you",
  Instagram: "instagram.com/you",
};

/** Common gTLDs for generic Portfolio / Website / Other links. */
const COMMON_TLDS = new Set([
  "com",
  "org",
  "net",
  "io",
  "co",
  "dev",
  "app",
  "me",
  "info",
  "biz",
  "edu",
  "gov",
  "uk",
  "in",
  "us",
  "ca",
  "au",
  "de",
  "fr",
  "jp",
  "cn",
  "ai",
  "tv",
  "cc",
  "xyz",
]);

function hasUrlScheme(raw: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(raw.trim());
}

/** Prepends https:// when the user omitted a scheme. */
export function normalizeSocialUrl(raw: string): string {
  const u = raw.trim();
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

function parseHttpUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidate = hasUrlScheme(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

function isPlausibleHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host || host === "localhost" || host.includes(" ")) return false;

  const parts = host.split(".").filter(Boolean);
  if (parts.length < 2) return false;

  const tld = parts[parts.length - 1];
  if (!/^[a-z]{2,63}$/i.test(tld)) return false;
  if (tld.length === 2) {
    return parts.every((p) => /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(p));
  }
  if (!COMMON_TLDS.has(tld)) return false;

  return parts.every((p) => /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(p));
}

function hostMatchesPlatform(hostname: string, platform: string): boolean {
  const allowed = PLATFORM_HOSTS[platform];
  if (!allowed?.length) return true;

  const host = hostname.toLowerCase().replace(/\.$/, "");
  return allowed.some((h) => host === h || host.endsWith(`.${h}`));
}

/** Inline field error for a single social-link URL (null = valid or empty). */
export function getSocialLinkUrlError(platform: string, url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const parsed = parseHttpUrl(trimmed);
  if (!parsed || !isPlausibleHostname(parsed.hostname)) {
    return "Enter a valid web address (e.g. github.com/username)";
  }

  const platformTrimmed = platform.trim();
  if (platformTrimmed && PLATFORM_HOSTS[platformTrimmed]) {
    if (!hostMatchesPlatform(parsed.hostname, platformTrimmed)) {
      const example = PLATFORM_URL_EXAMPLES[platformTrimmed] ?? "the correct platform domain";
      return `URL must be a ${platformTrimmed} link (e.g. ${example})`;
    }
  }

  return null;
}

export function isSocialLinkUrlValid(platform: string, url: string): boolean {
  return getSocialLinkUrlError(platform, url) === null;
}

/** Ensures partially filled rows have both platform and URL. */
export function validateSocialLinkRowsIncomplete(rows: SocialLinkRow[]): string | null {
  for (let i = 0; i < rows.length; i++) {
    const platform = rows[i]?.platform.trim() ?? "";
    const url = rows[i]?.url.trim() ?? "";
    if (platform && !url) return `Social link ${i + 1}: add a URL, or clear the row.`;
    if (!platform && url) return `Social link ${i + 1}: choose a platform, or clear the URL.`;
  }
  return null;
}

/** Full client-side validation for save/submit. Returns the first error message. */
export function validateSocialLinkRows(rows: SocialLinkRow[]): string | null {
  const incomplete = validateSocialLinkRowsIncomplete(rows);
  if (incomplete) return incomplete;

  for (let i = 0; i < rows.length; i++) {
    const platform = rows[i]?.platform.trim() ?? "";
    const url = rows[i]?.url.trim() ?? "";
    if (!platform && !url) continue;

    const urlError = getSocialLinkUrlError(platform, url);
    if (urlError) return `Social link ${i + 1}: ${urlError}`;
  }

  return null;
}
