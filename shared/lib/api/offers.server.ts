/**
 * Server-only offer fetches for RSC pages.
 * Forwards the browser's HttpOnly auth cookies to the API (same pattern as client `withCredentials`).
 * // ponytail: no token refresh on the server — expired access cookie → null, client island retries.
 */
import { cookies } from "next/headers";
import type { Offer } from "@/shared/lib/api/offers";

function serverApiBase(): string {
  // Prefer absolute backend URL for RSC (same cookies as browser→API on localhost).
  // Relative /api/v1 cannot be fetched from the Node server without an absolute origin.
  const raw = (process.env.NEXT_PUBLIC_API_URL ?? "").trim().replace(/\/+$/, "");
  if (raw && /^https?:\/\//i.test(raw)) return raw;
  const backend = (
    process.env.NEXT_PUBLIC_API_BACKEND_URL ||
    process.env.BACKEND_URL ||
    "http://127.0.0.1:3000"
  )
    .trim()
    .replace(/\/+$/, "");
  return `${backend}/v1`;
}

export async function fetchOfferByIdServer(offerId: string): Promise<Offer | null> {
  const id = String(offerId || "").trim();
  if (!/^[0-9a-fA-F]{24}$/.test(id)) return null;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  if (!cookieHeader) return null;

  try {
    const res = await fetch(`${serverApiBase()}/offers/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Offer;
  } catch {
    return null;
  }
}
