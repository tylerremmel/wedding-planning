const PROXY_BASE = "https://airtable-proxy-olive.vercel.app";

// Matches two decimal numbers separated by comma or whitespace
const COORDS_RE = /(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)/;

// 4 addresses per proxy call keeps each request safely under Vercel's 10s limit
const BATCH_SIZE = 4;

function parseEmbeddedCoords(address) {
  const match = COORDS_RE.exec(address || "");
  if (!match) return null;
  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[2]);
  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    return { lat, lng };
  }
  return null;
}

async function postToGeocodeProxy(addresses, updates, userToken) {
  const response = await fetch(`${PROXY_BASE}/api/geocode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userToken, addresses, updates }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    console.error("[geocode] Proxy request failed:", response.status, body);
    return [];
  }
  const body = await response.json();
  return (body.results || []).filter((r) => r.ok && r.lat != null);
}

export async function geocodeAndPersistMissingCoords(records, userToken, onBatchResolved) {
  const missing = records.filter(
    (r) => r.fields["Latitude"] == null || r.fields["Longitude"] == null,
  );

  console.log(
    `[geocode] ${missing.length} venue(s) need coordinates out of ${records.length} total`,
  );

  if (missing.length === 0) return;

  const embeddedUpdates = [];
  const toGeocode = [];

  for (const record of missing) {
    const address = record.fields["Full address"] || "";
    const name = record.fields["Venue name"] || record.id;
    const embedded = parseEmbeddedCoords(address);
    if (embedded) {
      console.log(`[geocode] "${name}" — embedded coords:`, embedded);
      embeddedUpdates.push({ recordId: record.id, lat: embedded.lat, lng: embedded.lng });
    } else if (address) {
      toGeocode.push({ recordId: record.id, address, _name: name });
    } else {
      console.warn(`[geocode] "${name}" — no address, skipping`);
    }
  }

  // Phase 1: embedded coords — write to Airtable and merge into local state immediately
  if (embeddedUpdates.length > 0) {
    postToGeocodeProxy([], embeddedUpdates, userToken).catch((err) =>
      console.error("[geocode] Embedded coords write-back failed:", err),
    );
    onBatchResolved && onBatchResolved(embeddedUpdates);
  }

  // Phase 2: geocode addresses via the proxy (server-side Nominatim, no CORS)
  if (toGeocode.length > 0) {
    console.log(
      `[geocode] Geocoding ${toGeocode.length} addresses in batches of ${BATCH_SIZE} (via proxy)...`,
    );
  }

  for (let i = 0; i < toGeocode.length; i += BATCH_SIZE) {
    const batch = toGeocode.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(toGeocode.length / BATCH_SIZE);
    console.log(
      `[geocode] Batch ${batchNum}/${totalBatches}: ${batch.map((v) => v._name).join(", ")}`,
    );

    const results = await postToGeocodeProxy(
      batch.map((v) => ({ recordId: v.recordId, address: v.address })),
      [],
      userToken,
    );

    if (results.length > 0) {
      console.log(`[geocode] Batch ${batchNum} resolved ${results.length}/${batch.length} venues`);
      onBatchResolved && onBatchResolved(results);
    } else {
      console.warn(`[geocode] Batch ${batchNum} resolved 0/${batch.length} venues`);
    }
  }

  console.log("[geocode] All batches complete");
}
