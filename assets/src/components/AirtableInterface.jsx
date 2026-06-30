import React, { useEffect, useRef, useState, useMemo } from "react";
import { styled } from "../styles/stitches";
import VenueCard from "./VenueCard";
import MapPanel from "./MapPanel";
import {
  getUserToken,
  redirectToAirtableOAuth,
  exchangeCodeForToken,
  clearSession,
  getTokenExpiry,
  performTokenRefresh,
  savePreAuthState,
  restorePreAuthState,
} from "../utils/airtableAuth";
import { fetchVenueRecords, fetchUserProfile } from "../utils/airtableApi";
import { getCachedVenues, setCachedVenues } from "../utils/venueCache";
import { geocodeAndPersistMissingCoords } from "../utils/geocodeVenues";
import {
  PageShell,
  HeaderPanel,
  StatusBlock,
  ActionButtons,
  Button,
  ControlPanel,
  LeftPanel,
  RightPanel,
  FilterGroup,
  FilterSubGroup,
  FilterGroupText,
  Input,
  Select,
  GridContainer,
  Notification,
} from "./AirtableInterface.stitches";
import { Autocomplete, TextField } from "@mui/material";

const SEASON_OPTIONS = [
  "Winter",
  "Spring",
  "Summer",
  "Late summer",
  "Early fall",
  "Fall",
];
const OPTIONS_INCLUDED = [
  "The intimate microwedding",
  "The extended family party",
  "The more-the-merrier shindig",
];

export default function AirtableInterface() {
  const [records, setRecords] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Checking login status...",
  );
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(getUserToken());
  const [userEmail, setUserEmail] = useState(null);
  const [nextCommentsIndex, setNextCommentsIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [hoveredVenueId, setHoveredVenueId] = useState(null);
  const [pinHoveredVenueId, setPinHoveredVenueId] = useState(null);
  const [openDrawerVenueId, setOpenDrawerVenueId] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const [filterStates, setFilterStates] = useState([]);
  const [filterSeasons, setFilterSeasons] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(null);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const initialFitDone = useRef(false);
  const isRefreshing = useRef(false);
  const refreshAttempted = useRef(false);

  useEffect(() => {
    if (isRefreshing.current) {
      isRefreshing.current = false;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const oauthCode = params.get("code");

    if (oauthCode) {
      setStatusMessage("Verifying authentication credentials...");
      (async () => {
        const ok = await exchangeCodeForToken(oauthCode);
        if (ok) {
          // update token from storage and remove query params
          setUserToken(getUserToken());
          const u = new URL(window.location.href);
          u.search = "";
          window.history.replaceState({}, document.title, u.toString());
          const saved = restorePreAuthState();
          if (saved) {
            if (saved.filterText != null) setFilterText(saved.filterText);
            if (saved.sortKey != null) setSortKey(saved.sortKey);
            if (saved.openDrawerVenueId != null)
              setOpenDrawerVenueId(saved.openDrawerVenueId);
          }
          setStatusMessage("Authentication successful. Loading records...");
          loadRecords();
        } else {
          setStatusMessage("Authentication failed. Please try again.");
        }
      })();
      return;
    }

    if (userToken) {
      setStatusMessage("Session authorized. Fetching live dataset...");
      fetchUserProfile(userToken).then((profile) => {
        if (profile?.email) setUserEmail(profile.email);
      });
      loadRecords();
    } else {
      setStatusMessage(
        "Log in with an approved Airtable account to unlock entries.",
      );
    }
  }, [userToken]);

  // Clear bounds and refit map when filters or sort changes
  useEffect(() => {
    setMapBounds(null);
    setFitKey((k) => k + 1);
  }, [filterText, sortKey, filterStates, filterSeasons, filterOptions]);

  // Refit map only on first records load — geocoding batch updates should not refit
  useEffect(() => {
    if (records.length > 0 && !initialFitDone.current) {
      initialFitDone.current = true;
      setFitKey((k) => k + 1);
    }
  }, [records]);

  function invalidateAuthToken() {
    localStorage.removeItem("airtable_user_token");
    localStorage.removeItem("airtable_token_expiry");
    localStorage.removeItem("airtable_refresh_token");
    localStorage.removeItem("user_email");
    setUserToken(null);
    setMinutesLeft(null);
    setRefreshFailed(false);
    refreshAttempted.current = false;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!userToken) {
      setMinutesLeft(null);
      return;
    }
    function checkExpiry() {
      const expiry = getTokenExpiry();
      if (!expiry) return;
      const ms = expiry - Date.now();
      setMinutesLeft(ms > 0 ? Math.floor(ms / 60000) : 0);
    }
    checkExpiry();
    const id = setInterval(checkExpiry, 30000);
    return () => clearInterval(id);
  }, [userToken]);

  useEffect(() => {
    if (minutesLeft === null || minutesLeft > 5 || refreshAttempted.current) return;
    refreshAttempted.current = true;
    performTokenRefresh().then((ok) => {
      if (ok) {
        refreshAttempted.current = false;
        setRefreshFailed(false);
        isRefreshing.current = true;
        setUserToken(getUserToken());
      } else {
        setRefreshFailed(true);
      }
    });
  }, [minutesLeft]);

  function handleRefreshSession() {
    savePreAuthState({ filterText, sortKey, openDrawerVenueId });
    redirectToAirtableOAuth();
  }

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

  const availableStates = useMemo(() => {
    const states = new Set(
      records.map((r) => r.fields["State"]).filter(Boolean),
    );
    return Array.from(states).sort();
  }, [records]);

  const filteredRecords = useMemo(() => {
    const normalizedFilter = filterText.toLowerCase().trim();
    return records
      .filter((record) => {
        const name = record.fields["Venue name"] || "";
        const address = record.fields["Full address"] || "";
        const matchesText =
          name.toLowerCase().includes(normalizedFilter) ||
          address.toLowerCase().includes(normalizedFilter);

        if (!matchesText) return false;

        if (
          filterStates.length > 0 &&
          !filterStates.includes(record.fields["State"])
        )
          return false;

        if (filterSeasons.length > 0) {
          const seasons = record.fields["Ideal season(s)"] || [];
          if (!filterSeasons.some((s) => seasons.includes(s))) return false;
        }

        if (filterOptions) {
          const options = record.fields["Options included"] || [];
          if (!options.includes(filterOptions)) return false;
        }

        if (mapBounds) {
          const lat = record.fields["Latitude"];
          const lng = record.fields["Longitude"];
          if (lat != null && lng != null) {
            return (
              lat >= mapBounds.south &&
              lat <= mapBounds.north &&
              lng >= mapBounds.west &&
              lng <= mapBounds.east
            );
          }
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortKey === "name") {
          return (a.fields["Venue name"] || "").localeCompare(
            b.fields["Venue name"] || "",
          );
        }
        if (sortKey === "capacity") {
          const capA = Number(a.fields["Capacity"]) || 0;
          const capB = Number(b.fields["Capacity"]) || 0;
          return capB - capA;
        }
        return 0;
      });
  }, [
    records,
    filterText,
    sortKey,
    mapBounds,
    filterStates,
    filterSeasons,
    filterOptions,
  ]);

  return (
    <PageShell>
      <HeaderPanel>
        <StatusBlock>
          <div>{statusMessage}</div>
          {errorMessage && (
            <div style={{ color: "#e03131" }}>{errorMessage}</div>
          )}
        </StatusBlock>

        {refreshFailed && minutesLeft !== null && minutesLeft <= 5 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 12px",
              background: minutesLeft === 0 ? "#fff0f0" : "#fffbe6",
              borderRadius: "6px",
              fontSize: "0.85rem",
              color: minutesLeft === 0 ? "#c92a2a" : "#e67700",
            }}
          >
            {minutesLeft === 0
              ? "Session expired."
              : "Could not refresh session automatically."}
            <Button variant="gray" onClick={handleRefreshSession}>
              Log in again
            </Button>
          </div>
        )}

        <ActionButtons>
          {!userToken ? (
            <Button variant="blue" onClick={redirectToAirtableOAuth}>
              Log In with Airtable
            </Button>
          ) : (
            <>
              <Button variant="gray" onClick={() => loadRecords(true)}>
                Refresh venues
              </Button>
              <Button variant="red" onClick={clearSession}>
                Log Out
              </Button>
            </>
          )}
        </ActionButtons>
      </HeaderPanel>

      <ControlPanel>
        <LeftPanel>
          <FilterGroup>
            <FilterGroupText>Filter by:</FilterGroupText>
            <FilterSubGroup>
              <Autocomplete
                multiple
                size="small"
                limitTags={2}
                id="filter-state"
                options={availableStates}
                value={filterStates}
                onChange={(_, newValue) => setFilterStates(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    placeholder="All states"
                  />
                )}
                sx={{ width: "100%" }}
              />
              {/* <Autocomplete
              multiple
              size="small"
              limitTags={2}
              id="filter-season"
              options={SEASON_OPTIONS}
              value={filterSeasons}
              onChange={(_, newValue) => setFilterSeasons(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ideal season"
                  placeholder="All seasons"
                />
              )}
              sx={{ width: "100%" }}
            /> */}
              <Autocomplete
                size="small"
                id="filter-options"
                options={OPTIONS_INCLUDED}
                value={filterOptions}
                onChange={(_, newValue) => setFilterOptions(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Options included"
                    placeholder="All"
                  />
                )}
                sx={{ width: "100%" }}
              />
            </FilterSubGroup>
            <FilterGroupText css={{ paddingTop: "12px" }}>
              Sort by:
            </FilterGroupText>
            <FilterSubGroup>
              <Button
                variant={sortKey === "name" ? "blue" : "gray"}
                onClick={() => setSortKey("name")}
              >
                Venue name
              </Button>
              <Button
                variant={sortKey === "capacity" ? "blue" : "gray"}
                onClick={() => setSortKey("capacity")}
              >
                Capacity
              </Button>
            </FilterSubGroup>
          </FilterGroup>
          {loading ? (
            <Notification>Loading venue cards…</Notification>
          ) : filteredRecords.length > 0 ? (
            <GridContainer>
              {filteredRecords.map((record, index) => (
                <VenueCard
                  key={record.id}
                  record={record}
                  userToken={userToken}
                  userEmail={userEmail}
                  shouldLoadComments={index === nextCommentsIndex}
                  onCommentsLoaded={() =>
                    setNextCommentsIndex((prev) => Math.max(prev, index + 1))
                  }
                  isHovered={hoveredVenueId === record.id}
                  scrollTo={pinHoveredVenueId === record.id}
                  openDrawer={openDrawerVenueId === record.id}
                  onDrawerClose={() => setOpenDrawerVenueId(null)}
                  onCardHover={setHoveredVenueId}
                />
              ))}
            </GridContainer>
          ) : (
            <Notification>No venues available yet.</Notification>
          )}
        </LeftPanel>

        <RightPanel>
          <MapPanel
            venues={filteredRecords}
            hoveredVenueId={hoveredVenueId}
            onPinHover={(id) => {
              setHoveredVenueId(id);
              setPinHoveredVenueId(id);
            }}
            onPinClick={setOpenDrawerVenueId}
            onBoundsChange={setMapBounds}
            onShowAll={() => {
              setMapBounds(null);
              setFitKey((k) => k + 1);
            }}
            fitKey={fitKey}
            isBoundsFiltered={mapBounds !== null}
          />
        </RightPanel>
      </ControlPanel>
    </PageShell>
  );
}
