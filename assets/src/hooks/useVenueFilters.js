import { useEffect, useMemo, useRef, useState } from "react";

// Owns filter/sort state plus the derived `availableStates` and
// `filteredRecords` lists, and refits the map whenever filters change or
// records first load.
export function useVenueFilters(records) {
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [filterStates, setFilterStates] = useState([]);
  const [filterSeasons, setFilterSeasons] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterReactions, setFilterReactions] = useState([]);
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
    filterSeasons,
    filterOptions,
    filterPetFriendly,
    filterReactions,
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

        if (filterOptions.length > 0) {
          const options = record.fields["Options included"] || [];
          if (!filterOptions.some((o) => options.includes(o))) return false;
        }

        if (filterPetFriendly && !record.fields["Pet friendly?"]) return false;

        if (filterReactions.length > 0) {
          const allReactions = record.fields["All reactions"] || "";
          const hasMatch = filterReactions.some((type) =>
            allReactions
              .split(",")
              .some(
                (entry) => entry.slice(entry.indexOf("|") + 1).trim() === type,
              ),
          );
          if (!hasMatch) return false;
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
    filterSeasons,
    filterOptions,
    filterPetFriendly,
    filterReactions,
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
    filterSeasons,
    setFilterSeasons,
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
  };
}
