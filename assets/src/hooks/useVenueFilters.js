import { useEffect, useMemo, useRef, useState } from "react";
import { hasUserReacted } from "../utils/reactions";

// Owns filter/sort state plus the derived `availableStates` and
// `filteredRecords` lists, and refits the map whenever filters change or
// records first load.
//
// `commentedRecordIds` is a Set of record IDs the current user has
// commented on, populated progressively as VenueCard's lazy per-record
// comment fetches resolve — see AirtableInterface's handleCommentsLoaded.
// Until a record's comments have loaded, "have I commented?" is unknown,
// so filterUninteracted optimistically includes it and lets it drop out
// once its data arrives.
export function useVenueFilters(records, userEmail, commentedRecordIds) {
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  // null means "no filter applied" — every option is implicitly checked.
  const [filterStates, setFilterStates] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [filterVenueTypes, setFilterVenueTypes] = useState(null);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterCeremony, setFilterCeremony] = useState(false);
  const [filterReception, setFilterReception] = useState(false);
  const [filterLodging, setFilterLodging] = useState(false);
  const [filterUninteracted, setFilterUninteracted] = useState(false);
  const [filterReactionsScoreRange, setFilterReactionsScoreRange] =
    useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const initialFitDone = useRef(false);

  // Clear bounds and refit map when filters or sort changes
  useEffect(() => {
    setMapBounds(null);
    setFitKey((k) => k + 1);
  }, [
    filterText,
    sortKey,
    filterStates,
    filterOptions,
    filterVenueTypes,
    filterPetFriendly,
    filterCeremony,
    filterReception,
    filterLodging,
    filterUninteracted,
    filterReactionsScoreRange,
  ]);

  // Refit map only on first records load — geocoding batch updates should not refit
  useEffect(() => {
    if (records.length > 0 && !initialFitDone.current) {
      initialFitDone.current = true;
      setFitKey((k) => k + 1);
    }
  }, [records]);

  const availableStates = useMemo(() => {
    const states = new Set(
      records.map((r) => r.fields["State"]).filter(Boolean),
    );
    return Array.from(states).sort();
  }, [records]);

  const availableVenueTypes = useMemo(() => {
    const types = new Set();
    records.forEach((r) => {
      (r.fields["Profile"] || []).forEach((t) => types.add(t));
    });
    return Array.from(types).sort();
  }, [records]);

  const reactionsScoreBounds = useMemo(() => {
    if (records.length === 0) return [0, 0];
    const scores = records.map((r) => Number(r.fields["Reactions score"]) || 0);
    return [Math.min(...scores), Math.max(...scores)];
  }, [records]);

  const isReactionsScoreFilterActive =
    filterReactionsScoreRange != null &&
    (filterReactionsScoreRange[0] !== reactionsScoreBounds[0] ||
      filterReactionsScoreRange[1] !== reactionsScoreBounds[1]);

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
          filterStates != null &&
          !filterStates.includes(record.fields["State"])
        )
          return false;

        if (filterOptions != null) {
          const options = record.fields["Options included"] || [];
          if (!filterOptions.some((o) => options.includes(o))) return false;
        }

        if (filterVenueTypes != null) {
          const types = record.fields["Profile"] || [];
          if (!filterVenueTypes.some((t) => types.includes(t))) return false;
        }

        if (filterPetFriendly && !record.fields["Pet friendly?"]) return false;

        if (filterCeremony && !record.fields["Ceremony"]) return false;

        if (filterReception && !record.fields["Reception"]) return false;

        if (filterLodging && !record.fields["Lodging"]) return false;

        if (filterUninteracted) {
          if (hasUserReacted(record.fields, userEmail)) return false;
          if (commentedRecordIds.has(record.id)) return false;
        }

        if (isReactionsScoreFilterActive) {
          const score = Number(record.fields["Reactions score"]) || 0;
          if (
            score < filterReactionsScoreRange[0] ||
            score > filterReactionsScoreRange[1]
          )
            return false;
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
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortKey === "name") {
          return (
            dir *
            (a.fields["Venue name"] || "").localeCompare(
              b.fields["Venue name"] || "",
            )
          );
        }
        if (sortKey === "capacity") {
          const capA = Number(a.fields["Capacity"]) || 0;
          const capB = Number(b.fields["Capacity"]) || 0;
          return dir * (capA - capB);
        }
        if (sortKey === "reactions") {
          const rA = Number(a.fields["Reactions score"]) || 0;
          const rB = Number(b.fields["Reactions score"]) || 0;
          if (rA !== rB) return dir * (rB - rA);
          return (a.fields["Venue name"] || "").localeCompare(
            b.fields["Venue name"] || "",
          );
        }
        if (sortKey === "cost") {
          const cA = Number(a.fields["Estimated total cost"]) || 0;
          const cB = Number(b.fields["Estimated total cost"]) || 0;
          return dir * (cA - cB);
        }
        return 0;
      });
  }, [
    records,
    filterText,
    sortKey,
    sortDir,
    mapBounds,
    filterStates,
    filterOptions,
    filterVenueTypes,
    filterPetFriendly,
    filterCeremony,
    filterReception,
    filterLodging,
    filterUninteracted,
    userEmail,
    commentedRecordIds,
    isReactionsScoreFilterActive,
    filterReactionsScoreRange,
  ]);

  return {
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
  };
}
