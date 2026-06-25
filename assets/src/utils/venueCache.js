const CACHE_KEY = "venue_records_cache";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function getCachedVenues() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { records, cachedAt } = JSON.parse(raw);
    if (Date.now() - cachedAt > CACHE_TTL_MS) return null;
    return { records, cachedAt };
  } catch {
    return null;
  }
}

export function setCachedVenues(records) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ records, cachedAt: Date.now() }),
    );
  } catch {
    // localStorage quota exceeded — silently skip caching
  }
}
