/** Tiny in-memory TTL cache for matching-jobs GETs. No SWR/RQ in package.json. */

// ponytail: process-local Map; fine for SPA session, not shared across tabs/SSR.
const TTL_MS = 60_000;

type Entry<T> = { expiresAt: number; value?: T; inflight?: Promise<T> };

const store = new Map<string, Entry<unknown>>();

export function matchingJobsCacheKey(
  scope: "me" | "candidate",
  id: string,
  params?: { limit?: number; minScore?: number }
): string {
  const limit = params?.limit ?? 10;
  const minScore = params?.minScore ?? 0;
  return `${scope}:${id}:${limit}:${minScore}`;
}

export async function getOrFetchMatchingJobs<T>(
  key: string,
  fetcher: () => Promise<T>,
  opts?: { bypass?: boolean }
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (!opts?.bypass && hit && hit.expiresAt > now && hit.value !== undefined && !hit.inflight) {
    return hit.value;
  }
  if (!opts?.bypass && hit?.inflight) {
    return hit.inflight;
  }

  const inflight = fetcher()
    .then((value) => {
      store.set(key, { expiresAt: Date.now() + TTL_MS, value });
      return value;
    })
    .catch((err) => {
      store.delete(key);
      throw err;
    });

  store.set(key, { expiresAt: now + TTL_MS, value: hit?.value, inflight });
  return inflight;
}

export function invalidateMatchingJobsCache(prefix?: string): void {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const k of store.keys()) {
    if (k.startsWith(prefix)) store.delete(k);
  }
}
