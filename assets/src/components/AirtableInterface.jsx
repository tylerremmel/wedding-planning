import React, { useEffect, useRef, useState, useMemo } from "react";
import { styled } from "../styles/stitches";
import VenueCard from "./VenueCard";
import MapPanel from "./MapPanel";
import {
  getUserToken,
  redirectToAirtableOAuth,
  exchangeCodeForToken,
  clearSession,
} from "../utils/airtableAuth";
import { fetchVenueRecords, fetchUserProfile } from "../utils/airtableApi";
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
  Input,
  Select,
  GridContainer,
  Notification,
} from "./AirtableInterface.stitches";

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
  const initialFitDone = useRef(false);

  useEffect(() => {
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

  // Clear bounds and refit map when text filter or sort changes
  useEffect(() => {
    setMapBounds(null);
    setFitKey((k) => k + 1);
  }, [filterText, sortKey]);

  // Refit map only on first records load — geocoding batch updates should not refit
  useEffect(() => {
    if (records.length > 0 && !initialFitDone.current) {
      initialFitDone.current = true;
      setFitKey((k) => k + 1);
    }
  }, [records]);

  function invalidateAuthToken() {
    localStorage.removeItem("airtable_user_token");
    localStorage.removeItem("user_email");
    setUserToken(null);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function loadRecords() {
    setLoading(true);
    setErrorMessage("");

    const token = userToken || getUserToken();
    const maxAttempts = 3;
    let attempt = 0;

    try {
      while (attempt < maxAttempts) {
        try {
          const data = await fetchVenueRecords(token);
          if (data.records && data.records.length > 0) {
            setRecords(data.records);
            setNextCommentsIndex(0);
            // Auto-geocode venues missing coordinates and write back to Airtable.
            // Uses a callback so pins appear progressively as each batch resolves.
            geocodeAndPersistMissingCoords(data.records, token, (batchResults) => {
              const coordsMap = new Map(
                batchResults.map((r) => [r.recordId, { lat: r.lat, lng: r.lng }]),
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
            }).catch((err) => console.error("[geocode] Top-level error:", err));
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
        return 0;
      });
  }, [records, filterText, sortKey, mapBounds]);

  return (
    <PageShell>
      <HeaderPanel>
        <StatusBlock>
          <p>{statusMessage}</p>
          {errorMessage && <p style={{ color: "#e03131" }}>{errorMessage}</p>}
        </StatusBlock>

        <ActionButtons>
          {!userToken ? (
            <Button intent="primary" onClick={redirectToAirtableOAuth}>
              Log In with Airtable
            </Button>
          ) : (
            <>
              <Button intent="secondary" onClick={loadRecords}>
                Refresh venues
              </Button>
              <Button intent="danger" onClick={clearSession}>
                Log Out
              </Button>
            </>
          )}
        </ActionButtons>
      </HeaderPanel>

      <ControlPanel>
        <LeftPanel>
          <FilterGroup>
            <Input
              name="filterText"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
              placeholder="Filter by venue name or address"
              aria-label="Venue search"
            />
            <Select
              name="sortKey"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value)}
              aria-label="Sort venues"
            >
              <option value="name">Sort by name</option>
            </Select>
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
