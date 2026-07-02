import React, { useCallback, useRef, useState } from "react";
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
  Button,
  ControlPanel,
  LeftPanel,
  RightPanel,
  GridContainer,
  Notification,
} from "./AirtableInterface.stitches";

export default function AirtableInterface() {
  const [statusMessage, setStatusMessage] = useState(
    "Checking login status...",
  );
  const [hoveredVenueId, setHoveredVenueId] = useState(null);
  const [pinHoveredVenueId, setPinHoveredVenueId] = useState(null);
  const [openDrawerVenueId, setOpenDrawerVenueId] = useState(null);

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
      if (saved.filterPetFriendly != null)
        setFilterPetFriendly(saved.filterPetFriendly);
      if (saved.filterReactions != null)
        setFilterReactions(saved.filterReactions);
      if (saved.openDrawerVenueId != null)
        setOpenDrawerVenueId(saved.openDrawerVenueId);
    },
  });

  const { records, loading, errorMessage, nextCommentsIndex, setNextCommentsIndex, loadRecords } =
    useVenueRecords({ userToken, authEpoch, setStatusMessage, invalidateAuthToken });

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
    filterPetFriendly,
    setFilterPetFriendly,
    filterReactions,
    setFilterReactions,
    mapBounds,
    setMapBounds,
    fitKey,
    setFitKey,
    availableStates,
    filteredRecords,
  } = useVenueFilters(records);

  // Stable callback identities so VenueCard's React.memo can actually skip
  // re-rendering cards whose own props didn't change (e.g. on hover).
  const filteredRecordsRef = useRef(filteredRecords);
  filteredRecordsRef.current = filteredRecords;

  const handleCommentsLoaded = useCallback((recordId) => {
    const idx = filteredRecordsRef.current.findIndex((r) => r.id === recordId);
    if (idx === -1) return;
    setNextCommentsIndex((prev) => Math.max(prev, idx + 1));
  }, [setNextCommentsIndex]);

  const handleDrawerClose = useCallback(() => setOpenDrawerVenueId(null), []);

  function handleRefreshSession() {
    redirectForRefresh({
      filterText,
      sortKey,
      sortDir,
      filterStates,
      filterOptions,
      filterPetFriendly,
      filterReactions,
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
            filterReactions={filterReactions}
            setFilterReactions={setFilterReactions}
            filterPetFriendly={filterPetFriendly}
            setFilterPetFriendly={setFilterPetFriendly}
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
              {filteredRecords.map((record, index) => (
                <VenueCard
                  key={record.id}
                  record={record}
                  userToken={userToken}
                  userEmail={userEmail}
                  shouldLoadComments={index === nextCommentsIndex}
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
