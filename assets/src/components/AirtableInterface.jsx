import React, { useCallback, useEffect, useMemo, useState } from "react";
import VenueCard from "./VenueCard";
import MapPanel from "./MapPanel";
import VenueFilterSortMenu from "./VenueFilterSortMenu";
import { clearSession, redirectToAirtableOAuth } from "../utils/airtableAuth";
import { useAirtableAuth } from "../hooks/useAirtableAuth";
import { useVenueRecords } from "../hooks/useVenueRecords";
import { useVenueFilters } from "../hooks/useVenueFilters";
import {
  PageShell,
  HeaderPanel,
  StatusBlock,
  ErrorText,
  StatusText,
  NumberOfRecordsText,
  MenuGroup,
  StatusGroup,
  SessionWarning,
  ActionButtons,
  ControlPanel,
  LeftPanel,
  RightPanel,
  GridContainer,
  Notification,
} from "./AirtableInterface.stitches";
import { Button } from "./shared.stitches";

export default function AirtableInterface() {
  const [statusMessage, setStatusMessage] = useState(
    "Checking login status...",
  );
  const [hoveredVenueId, setHoveredVenueId] = useState(null);
  const [pinHoveredVenueId, setPinHoveredVenueId] = useState(null);
  const [openDrawerVenueId, setOpenDrawerVenueId] = useState(null);
  // Populated progressively as each card's lazy comment fetch resolves —
  // see handleCommentsLoaded below and useVenueFilters' filterUninteracted.
  const [commentedRecordIds, setCommentedRecordIds] = useState(
    () => new Set(),
  );
  // Tracks which records have finished a comments fetch (success or
  // failure), by id rather than position — filteredRecords can reorder or
  // shrink whenever filters/sort change, so an index-based "next to load"
  // pointer would point at the wrong record (or one that's already loaded,
  // permanently stalling the queue) the moment that happens.
  const [loadedCommentIds, setLoadedCommentIds] = useState(() => new Set());

  const {
    userToken,
    userEmail,
    minutesLeft,
    refreshFailed,
    authEpoch,
    invalidateAuthToken,
    handleRefreshSession: redirectForRefresh,
  } = useAirtableAuth({
    setStatusMessage,
    onRestoreState: (saved) => {
      if (saved.filterText != null) setFilterText(saved.filterText);
      if (saved.sortKey != null) setSortKey(saved.sortKey);
      if (saved.sortDir != null) setSortDir(saved.sortDir);
      if (saved.filterStates != null) setFilterStates(saved.filterStates);
      if (saved.filterOptions != null) setFilterOptions(saved.filterOptions);
      if (saved.filterVenueTypes != null)
        setFilterVenueTypes(saved.filterVenueTypes);
      if (saved.filterPetFriendly != null)
        setFilterPetFriendly(saved.filterPetFriendly);
      if (saved.filterCeremony != null) setFilterCeremony(saved.filterCeremony);
      if (saved.filterReception != null)
        setFilterReception(saved.filterReception);
      if (saved.filterLodging != null) setFilterLodging(saved.filterLodging);
      if (saved.filterUninteracted != null)
        setFilterUninteracted(saved.filterUninteracted);
      if (saved.filterReactionsScoreRange != null)
        setFilterReactionsScoreRange(saved.filterReactionsScoreRange);
      if (saved.openDrawerVenueId != null)
        setOpenDrawerVenueId(saved.openDrawerVenueId);
    },
  });

  const { records, loading, errorMessage, loadRecords } = useVenueRecords({
    userToken,
    authEpoch,
    setStatusMessage,
    invalidateAuthToken,
  });

  const {
    filterText,
    setFilterText,
    sortKey,
    setSortKey,
    sortDir,
    setSortDir,
    filterStates,
    setFilterStates,
    filterOptions,
    setFilterOptions,
    filterVenueTypes,
    setFilterVenueTypes,
    filterPetFriendly,
    setFilterPetFriendly,
    filterCeremony,
    setFilterCeremony,
    filterReception,
    setFilterReception,
    filterLodging,
    setFilterLodging,
    filterUninteracted,
    setFilterUninteracted,
    filterReactionsScoreRange,
    setFilterReactionsScoreRange,
    reactionsScoreBounds,
    isReactionsScoreFilterActive,
    mapBounds,
    setMapBounds,
    fitKey,
    setFitKey,
    availableStates,
    availableVenueTypes,
    filteredRecords,
  } = useVenueFilters(records, userEmail, commentedRecordIds);

  // Comment prefetching waits until filteredRecords has been still for
  // 1.5s (same debounce-after-settle pattern as the map's moveend handler)
  // before picking up anything not yet loaded — otherwise rapid filter/sort
  // changes would fire, cancel, and refire comment fetches against the
  // rate-limited comments endpoint on every intermediate state.
  const [settledFilteredRecords, setSettledFilteredRecords] =
    useState(filteredRecords);

  useEffect(() => {
    const t = setTimeout(() => {
      setSettledFilteredRecords(filteredRecords);
    }, 1500);
    return () => clearTimeout(t);
  }, [filteredRecords]);

  // The one record (in the settled filtered/sorted order) whose comments
  // should load next — always the first one not yet in loadedCommentIds, so
  // this stays correct no matter how the list gets reordered or resized.
  const nextCommentsRecordId = useMemo(() => {
    const next = settledFilteredRecords.find(
      (r) => !loadedCommentIds.has(r.id),
    );
    return next ? next.id : null;
  }, [settledFilteredRecords, loadedCommentIds]);

  const handleCommentsLoaded = useCallback((recordId, comments) => {
    setLoadedCommentIds((prev) =>
      prev.has(recordId) ? prev : new Set(prev).add(recordId),
    );

    if (userEmail && comments?.some((c) => c.author?.email === userEmail)) {
      setCommentedRecordIds((prev) =>
        prev.has(recordId) ? prev : new Set(prev).add(recordId),
      );
    }
  }, [userEmail]);

  const handleDrawerClose = useCallback(() => setOpenDrawerVenueId(null), []);

  function handleRefreshSession() {
    redirectForRefresh({
      filterText,
      sortKey,
      sortDir,
      filterStates,
      filterOptions,
      filterVenueTypes,
      filterPetFriendly,
      filterCeremony,
      filterReception,
      filterLodging,
      filterUninteracted,
      filterReactionsScoreRange,
      openDrawerVenueId,
    });
  }

  return (
    <PageShell>
      <HeaderPanel>
        <MenuGroup>
          <VenueFilterSortMenu
            availableStates={availableStates}
            filterStates={filterStates}
            setFilterStates={setFilterStates}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            availableVenueTypes={availableVenueTypes}
            filterVenueTypes={filterVenueTypes}
            setFilterVenueTypes={setFilterVenueTypes}
            filterReactionsScoreRange={filterReactionsScoreRange}
            setFilterReactionsScoreRange={setFilterReactionsScoreRange}
            reactionsScoreBounds={reactionsScoreBounds}
            isReactionsScoreFilterActive={isReactionsScoreFilterActive}
            filterPetFriendly={filterPetFriendly}
            setFilterPetFriendly={setFilterPetFriendly}
            filterCeremony={filterCeremony}
            setFilterCeremony={setFilterCeremony}
            filterReception={filterReception}
            setFilterReception={setFilterReception}
            filterLodging={filterLodging}
            setFilterLodging={setFilterLodging}
            filterUninteracted={filterUninteracted}
            setFilterUninteracted={setFilterUninteracted}
            isLoggedIn={Boolean(userEmail)}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortDir={sortDir}
            setSortDir={setSortDir}
          />
        </MenuGroup>

        <StatusGroup>
          <StatusBlock>
            <NumberOfRecordsText>
              Showing {filteredRecords.length} venues
            </NumberOfRecordsText>
            <StatusText>{statusMessage}</StatusText>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          </StatusBlock>

          {refreshFailed && minutesLeft !== null && minutesLeft <= 5 && (
            <SessionWarning
              severity={minutesLeft === 0 ? "critical" : "warning"}
            >
              {minutesLeft === 0
                ? "Session expired."
                : "Could not refresh session automatically."}
              <Button variant="gray" onClick={handleRefreshSession}>
                Log in again
              </Button>
            </SessionWarning>
          )}
        </StatusGroup>

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
          {loading ? (
            <Notification>Loading venue cards…</Notification>
          ) : filteredRecords.length > 0 ? (
            <GridContainer>
              {filteredRecords.map((record) => (
                <VenueCard
                  key={record.id}
                  record={record}
                  userToken={userToken}
                  userEmail={userEmail}
                  shouldLoadComments={record.id === nextCommentsRecordId}
                  onCommentsLoaded={handleCommentsLoaded}
                  isHovered={hoveredVenueId === record.id}
                  scrollTo={pinHoveredVenueId === record.id}
                  openDrawer={openDrawerVenueId === record.id}
                  onDrawerClose={handleDrawerClose}
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
