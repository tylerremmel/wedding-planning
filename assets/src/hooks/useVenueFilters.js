import { useEffect, useMemo, useRef, useState } from "react";
import { hasUserReacted } from "../utils/reactions";

// Reads filter/sort state out of the URL's query string on first load, so a
// shared link or a plain page refresh reproduces the same view. Absent keys
// fall back to the same defaults the state would otherwise start with.
function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const list = (key) => {
    const raw = params.get(key);
    return raw ? raw.split(",").filter(Boolean) : null;
  };
  // "~"-delimited (not "-") since Reactions score can itself be negative.
  const range = (key) => {
    const raw = params.get(key);
    if (!raw) return null;
    const [min, max] = raw.split("~").map(Number);
    return Number.isFinite(min) && Number.isFinite(max) ? [min, max] : null;
  };

  return {
    filterText: params.get("q") || "",
    sortKey: params.get("sort") || "name",
    sortDir: params.get("dir") || "asc",
    filterStates: list("states"),
    filterOptions: list("options"),
    filterVenueTypes: list("types"),
    filterPetFriendly: params.get("pet") === "1",
    filterCeremony: params.get("ceremony") === "1",
    filterReception: params.get("reception") === "1",
    filterLodging: params.get("lodging") === "1",
    sortUnseenFirst: params.get("unseen") === "1",
    filterReactionsScoreRange: range("score"),
  };
}

// Owns filter/sort state plus the derived `availableStates` and
// `filteredRecords` lists, and refits the map whenever filters change or
// records first load.
//
// `commentedRecordIds` is a Set of record IDs the current user has
// commented on, populated progressively as VenueCard's lazy per-record
// comment fetches resolve — see AirtableInterface's handleCommentsLoaded.
//
// sortUnseenFirst is a sort modifier, not a filter — it used to remove
// already-reacted/commented venues outright, but that yanked the card out
// from under a user mid-interaction (react, then comment — the card would
// vanish after the reaction, before they could also leave a comment).
// Sinking it to the bottom instead keeps it visible. It's also a frozen
// snapshot rather than a live value: reacting/commenting during the
// session must not reshuffle the grid under the user's cursor, so "seen"
// status is captured once (on enabling it, or on an actual records
// refresh) and held still until the next refresh — see the snapshot
// effect below.
export function useVenueFilters(records, userEmail, commentedRecordIds, loadGeneration) {
  // Parsed once on mount — later renders should never re-read the URL,
  // only write to it (see the sync effect below), otherwise a user's edits
  // would get clobbered by re-parsing their own just-written state.
  const [urlDefaults] = useState(readFiltersFromUrl);
  const [filterText, setFilterText] = useState(urlDefaults.filterText);
  const [sortKey, setSortKey] = useState(urlDefaults.sortKey);
  const [sortDir, setSortDir] = useState(urlDefaults.sortDir);
  // null means "no filter applied" — every option is implicitly checked.
  const [filterStates, setFilterStates] = useState(urlDefaults.filterStates);
  const [filterOptions, setFilterOptions] = useState(
    urlDefaults.filterOptions,
  );
  const [filterVenueTypes, setFilterVenueTypes] = useState(
    urlDefaults.filterVenueTypes,
  );
  const [filterPetFriendly, setFilterPetFriendly] = useState(
    urlDefaults.filterPetFriendly,
  );
  const [filterCeremony, setFilterCeremony] = useState(
    urlDefaults.filterCeremony,
  );
  const [filterReception, setFilterReception] = useState(
    urlDefaults.filterReception,
  );
  const [filterLodging, setFilterLodging] = useState(
    urlDefaults.filterLodging,
  );
  const [sortUnseenFirst, setSortUnseenFirst] = useState(
    urlDefaults.sortUnseenFirst,
  );
  const [filterReactionsScoreRange, setFilterReactionsScoreRange] = useState(
    urlDefaults.filterReactionsScoreRange,
  );
  const [mapBounds, setMapBounds] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const initialFitDone = useRef(false);

  // Keep the URL's query string in sync with filter/sort state so a page
  // refresh (or a shared link) reproduces the same view. Only the filter
  // keys are touched — any other query params (e.g. a lingering OAuth
  // `code`) are preserved as-is.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (key, value) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };

    set("q", filterText || null);
    set("sort", sortKey !== "name" ? sortKey : null);
    set("dir", sortDir !== "asc" ? sortDir : null);
    set("states", filterStates?.length ? filterStates.join(",") : null);
    set("options", filterOptions?.length ? filterOptions.join(",") : null);
    set("types", filterVenueTypes?.length ? filterVenueTypes.join(",") : null);
    set("pet", filterPetFriendly ? "1" : null);
    set("ceremony", filterCeremony ? "1" : null);
    set("reception", filterReception ? "1" : null);
    set("lodging", filterLodging ? "1" : null);
    set("unseen", sortUnseenFirst ? "1" : null);
    set(
      "score",
      filterReactionsScoreRange
        ? `${filterReactionsScoreRange[0]}~${filterReactionsScoreRange[1]}`
        : null,
    );

    const query = params.toString();
    const url = new URL(window.location.href);
    url.search = query ? `?${query}` : "";
    window.history.replaceState({}, "", url.toString());
  }, [
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
    sortUnseenFirst,
    filterReactionsScoreRange,
  ]);

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
    sortUnseenFirst,
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

  // Frozen "seen" snapshot for sortUnseenFirst — recomputed only when a
  // real refresh happens (loadGeneration bumps) or when the toggle is
  // switched on, never in response to a live reaction/comment.
  const seenSnapshotRef = useRef(new Set());
  const [snapshotVersion, setSnapshotVersion] = useState(0);
  const prevLoadGeneration = useRef(loadGeneration);
  const prevSortUnseenFirst = useRef(sortUnseenFirst);

  useEffect(() => {
    const reloaded = loadGeneration !== prevLoadGeneration.current;
    const justEnabled = sortUnseenFirst && !prevSortUnseenFirst.current;
    prevLoadGeneration.current = loadGeneration;
    prevSortUnseenFirst.current = sortUnseenFirst;

    if (sortUnseenFirst && (reloaded || justEnabled)) {
      const snapshot = new Set();
      records.forEach((r) => {
        if (hasUserReacted(r.fields, userEmail) || commentedRecordIds.has(r.id)) {
          snapshot.add(r.id);
        }
      });
      seenSnapshotRef.current = snapshot;
      setSnapshotVersion((v) => v + 1);
    }
  }, [loadGeneration, sortUnseenFirst, records, userEmail, commentedRecordIds]);

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
        if (sortUnseenFirst) {
          const aSeen = seenSnapshotRef.current.has(a.id);
          const bSeen = seenSnapshotRef.current.has(b.id);
          if (aSeen !== bSeen) return aSeen ? 1 : -1;
        }

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
    sortUnseenFirst,
    snapshotVersion,
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
    sortUnseenFirst,
    setSortUnseenFirst,
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
