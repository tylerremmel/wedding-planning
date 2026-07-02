import { useState } from "react";
import { fetchVenueRecords } from "../utils/airtableApi";
import { getUserToken } from "../utils/airtableAuth";
import { getCachedVenues, setCachedVenues } from "../utils/venueCache";
import { geocodeAndPersistMissingCoords } from "../utils/geocodeVenues";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Loads venue records (from cache or the Airtable API, with retry/backoff),
// and kicks off background geocoding for records missing coordinates.
export function useVenueRecords({ userToken, setStatusMessage, invalidateAuthToken }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nextCommentsIndex, setNextCommentsIndex] = useState(0);

  async function loadRecords(force = false) {
    setErrorMessage("");

    if (!force) {
      const cached = getCachedVenues();
      if (cached) {
        setRecords(cached.records);
        setNextCommentsIndex(0);
        const ageMinutes = Math.floor((Date.now() - cached.cachedAt) / 60000);
        const ageLabel = ageMinutes === 0 ? "just now" : `${ageMinutes}m ago`;
        setStatusMessage(`Venues loaded from cache · updated ${ageLabel}`);
        return;
      }
    }

    setLoading(true);
    setStatusMessage("Fetching live venue data...");

    const token = userToken || getUserToken();
    const maxAttempts = 3;
    let attempt = 0;

    try {
      while (attempt < maxAttempts) {
        try {
          const data = await fetchVenueRecords(token);
          if (data.records && data.records.length > 0) {
            setRecords(data.records);
            setCachedVenues(data.records);
            setNextCommentsIndex(0);
            // Auto-geocode venues missing coordinates and write back to Airtable.
            // Uses a callback so pins appear progressively as each batch resolves.
            geocodeAndPersistMissingCoords(
              data.records,
              token,
              (batchResults) => {
                const coordsMap = new Map(
                  batchResults.map((r) => [
                    r.recordId,
                    { lat: r.lat, lng: r.lng },
                  ]),
                );
                setRecords((prev) =>
                  prev.map((record) => {
                    const coords = coordsMap.get(record.id);
                    if (!coords) return record;
                    return {
                      ...record,
                      fields: {
                        ...record.fields,
                        Latitude: coords.lat,
                        Longitude: coords.lng,
                      },
                    };
                  }),
                );
              },
            ).catch((err) => console.error("[geocode] Top-level error:", err));
          } else {
            setRecords([]);
          }
          return;
        } catch (err) {
          // Derive a readable message from the thrown error or response body
          let msg = "Unable to fetch records.";
          let isAuthError = false;
          let isRateLimit = false;

          try {
            if (err && typeof err === "object") {
              msg = err.message || err.error || JSON.stringify(err);
              isAuthError = Boolean(err.isAuthError);
              isRateLimit = Boolean(err.isRateLimit);
            } else if (typeof err === "string") {
              msg = err;
            }
          } catch (e) {
            msg = String(err);
          }

          if (
            isAuthError ||
            /UNAUTHORIZED|Invalid authentication token|401|Invalid or expired user session token|INVALID_API_VERSION/i.test(
              msg,
            )
          ) {
            invalidateAuthToken();
            setStatusMessage("Session expired. Please log in again.");
            setErrorMessage("");
            setRecords([]);
            return;
          }

          if (!isRateLimit && /rate limited|too many requests/i.test(msg)) {
            isRateLimit = true;
          }

          attempt += 1;

          if (isRateLimit && attempt < maxAttempts) {
            const backoff = 250 * Math.pow(2, attempt - 1);
            setStatusMessage(
              `Rate limit encountered. Retrying in ${backoff}ms...`,
            );
            await sleep(backoff);
            continue;
          }

          setErrorMessage(msg || "Unable to fetch records.");
          return;
        }
      }
    } finally {
      setLoading(false);
      setStatusMessage((prev) =>
        prev === "Session expired. Please log in again." ? prev : "",
      );
    }
  }

  return {
    records,
    loading,
    errorMessage,
    nextCommentsIndex,
    setNextCommentsIndex,
    loadRecords,
  };
}
