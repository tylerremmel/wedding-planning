import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
  Slider,
  Typography,
} from "@mui/material";
import { MdCheck, MdChevronRight, MdFilterList, MdSort } from "react-icons/md";
import { Button, Icon } from "./shared.stitches";

const OPTIONS_INCLUDED = [
  "The intimate microwedding",
  "The extended family party",
  "The more-the-merrier shindig",
];

// `current` is null when every option is implicitly checked (no filter
// applied yet). Unchecking one splits off an explicit subset; rechecking
// back up to the full set collapses to null again.
function toggleSelection(current, available, value) {
  const effective = current ?? available;
  const next = effective.includes(value)
    ? effective.filter((v) => v !== value)
    : [...effective, value];
  return next.length === available.length ? null : next;
}

function CheckIndicator({ checked }) {
  return checked ? (
    <ListItemIcon>
      <MdCheck />
    </ListItemIcon>
  ) : (
    <ListItemIcon />
  );
}

function SelectableMenuItem({ checked, isRadio = false, children, ...props }) {
  return (
    <MenuItem
      {...props}
      role={
        isRadio
          ? "menuitemradio"
          : checked !== undefined
            ? "menuitemcheckbox"
            : "menuitem"
      }
      aria-checked={checked !== undefined ? Boolean(checked) : undefined}
    >
      {children}
    </MenuItem>
  );
}

export default function VenueFilterSortMenu({
  availableStates,
  filterStates,
  setFilterStates,
  filterOptions,
  setFilterOptions,
  availableVenueTypes,
  filterVenueTypes,
  setFilterVenueTypes,
  filterReactionsScoreRange,
  setFilterReactionsScoreRange,
  reactionsScoreBounds,
  isReactionsScoreFilterActive,
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
  isLoggedIn,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
}) {
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [stateSubmenuAnchor, setStateSubmenuAnchor] = useState(null);
  const [optionsSubmenuAnchor, setOptionsSubmenuAnchor] = useState(null);
  const [venueTypeSubmenuAnchor, setVenueTypeSubmenuAnchor] = useState(null);
  const [canHostSubmenuAnchor, setCanHostSubmenuAnchor] = useState(null);

  const openSubmenu = (which, target) => {
    setStateSubmenuAnchor(which === "state" ? target : null);
    setOptionsSubmenuAnchor(which === "options" ? target : null);
    setVenueTypeSubmenuAnchor(which === "venueType" ? target : null);
    setCanHostSubmenuAnchor(which === "canHost" ? target : null);
  };

  const hasActiveFilters =
    filterStates != null ||
    filterOptions != null ||
    filterVenueTypes != null ||
    isReactionsScoreFilterActive ||
    filterPetFriendly ||
    filterCeremony ||
    filterReception ||
    filterLodging ||
    filterUninteracted;

  const [reactionsScoreMin, reactionsScoreMax] = reactionsScoreBounds;
  const reactionsScoreValue = filterReactionsScoreRange ?? reactionsScoreBounds;

  return (
    <>
      {/* Filters button */}
      <Button
        variant={hasActiveFilters ? "blue" : "gray"}
        onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
      >
        <Icon size="125">
          <MdFilterList />
        </Icon>
        Filters
        {hasActiveFilters &&
          ` (${(filterStates != null ? 1 : 0) + (filterOptions != null ? 1 : 0) + (filterVenueTypes != null ? 1 : 0) + (isReactionsScoreFilterActive ? 1 : 0) + (filterPetFriendly ? 1 : 0) + (filterCeremony ? 1 : 0) + (filterReception ? 1 : 0) + (filterLodging ? 1 : 0) + (filterUninteracted ? 1 : 0)})`}
      </Button>
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => {
          setFilterMenuAnchor(null);
          setStateSubmenuAnchor(null);
          setOptionsSubmenuAnchor(null);
          setVenueTypeSubmenuAnchor(null);
          setCanHostSubmenuAnchor(null);
        }}
      >
        <MenuItem
          disableRipple
          sx={{ gap: 2 }}
          onMouseEnter={(e) => openSubmenu("state", e.currentTarget)}
          onClick={(e) =>
            openSubmenu("state", stateSubmenuAnchor ? null : e.currentTarget)
          }
          selected={Boolean(stateSubmenuAnchor)}
        >
          <ListItemText>Location</ListItemText>
          <ListItemIcon sx={{ "&.MuiListItemIcon-root": { minWidth: 0 } }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          disableRipple
          sx={{ gap: 2 }}
          onMouseEnter={(e) => openSubmenu("options", e.currentTarget)}
          onClick={(e) =>
            openSubmenu(
              "options",
              optionsSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(optionsSubmenuAnchor)}
        >
          <ListItemText>Guest list</ListItemText>
          <ListItemIcon sx={{ "&.MuiListItemIcon-root": { minWidth: 0 } }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          disableRipple
          sx={{ gap: 2 }}
          onMouseEnter={(e) => openSubmenu("venueType", e.currentTarget)}
          onClick={(e) =>
            openSubmenu(
              "venueType",
              venueTypeSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(venueTypeSubmenuAnchor)}
        >
          <ListItemText>Venue profile</ListItemText>
          <ListItemIcon sx={{ "&.MuiListItemIcon-root": { minWidth: 0 } }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          disableRipple
          sx={{ gap: 2 }}
          onMouseEnter={(e) => openSubmenu("canHost", e.currentTarget)}
          onClick={(e) =>
            openSubmenu(
              "canHost",
              canHostSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(canHostSubmenuAnchor)}
        >
          <ListItemText>Can host ...</ListItemText>
          <ListItemIcon sx={{ "&.MuiListItemIcon-root": { minWidth: 0 } }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={filterPetFriendly}
          onMouseEnter={() => openSubmenu(null, null)}
          onClick={() => setFilterPetFriendly((v) => !v)}
        >
          <ListItemText>Pet friendly?</ListItemText>
          <ListItemIcon sx={{ "&.MuiListItemIcon-root": { minWidth: 0 } }}>
            {filterPetFriendly && <MdCheck />}
          </ListItemIcon>
        </SelectableMenuItem>

        <Divider />

        <Box
          sx={{ px: 2, paddingTop: 0.75 }}
          onMouseEnter={() => openSubmenu(null, null)}
        >
          <Typography variant="body1" gutterBottom>
            Reactions score
          </Typography>
          <Slider
            size="small"
            value={reactionsScoreValue}
            onChange={(e, newValue) => setFilterReactionsScoreRange(newValue)}
            valueLabelDisplay="auto"
            min={reactionsScoreMin}
            max={reactionsScoreMax}
            step={1}
            disabled={reactionsScoreMin === reactionsScoreMax}
            getAriaLabel={() => "Reactions score range"}
          />
          {/* <Typography variant="body2" gutterBottom>
            Showing: {reactionsScoreValue[0]} to {reactionsScoreValue[1]}
          </Typography> */}
        </Box>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={filterUninteracted}
          onMouseEnter={() => openSubmenu(null, null)}
          onClick={() => setFilterUninteracted((v) => !v)}
        >
          <ListItemText>Hide ones I've seen</ListItemText>
          <CheckIndicator checked={filterUninteracted} />
        </SelectableMenuItem>
        {hasActiveFilters && (
          <>
            <Divider sx={{ my: 1 }} />
            <MenuItem
              disableRipple
              onMouseEnter={() => openSubmenu(null, null)}
              onClick={() => {
                setFilterStates(null);
                setFilterOptions(null);
                setFilterVenueTypes(null);
                setFilterReactionsScoreRange(null);
                setFilterPetFriendly(false);
                setFilterCeremony(false);
                setFilterReception(false);
                setFilterLodging(false);
                setFilterUninteracted(false);
                setFilterMenuAnchor(null);
                setStateSubmenuAnchor(null);
                setOptionsSubmenuAnchor(null);
                setVenueTypeSubmenuAnchor(null);
                setCanHostSubmenuAnchor(null);
              }}
            >
              <ListItemText>Clear filters</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* State submenu */}
      <Menu
        anchorEl={stateSubmenuAnchor}
        open={Boolean(stateSubmenuAnchor)}
        onClose={() => setStateSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          root: { sx: { pointerEvents: "none" } },
          paper: { sx: { pointerEvents: "auto" } },
        }}
      >
        {availableStates.map((state) => (
          <SelectableMenuItem
            disableRipple
            sx={{ gap: 2 }}
            key={state}
            checked={(filterStates ?? availableStates).includes(state)}
            onClick={() =>
              setFilterStates((prev) =>
                toggleSelection(prev, availableStates, state),
              )
            }
          >
            <CheckIndicator
              checked={(filterStates ?? availableStates).includes(state)}
            />
            {state}
          </SelectableMenuItem>
        ))}
      </Menu>

      {/* Options included submenu */}
      <Menu
        anchorEl={optionsSubmenuAnchor}
        open={Boolean(optionsSubmenuAnchor)}
        onClose={() => setOptionsSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          root: { sx: { pointerEvents: "none" } },
          paper: { sx: { pointerEvents: "auto" } },
        }}
      >
        {OPTIONS_INCLUDED.map((opt) => (
          <SelectableMenuItem
            disableRipple
            sx={{ gap: 2 }}
            key={opt}
            checked={(filterOptions ?? OPTIONS_INCLUDED).includes(opt)}
            onClick={() =>
              setFilterOptions((prev) =>
                toggleSelection(prev, OPTIONS_INCLUDED, opt),
              )
            }
          >
            <CheckIndicator
              checked={(filterOptions ?? OPTIONS_INCLUDED).includes(opt)}
            />
            {opt}
          </SelectableMenuItem>
        ))}
      </Menu>

      {/* Type of venue submenu */}
      <Menu
        anchorEl={venueTypeSubmenuAnchor}
        open={Boolean(venueTypeSubmenuAnchor)}
        onClose={() => setVenueTypeSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          root: { sx: { pointerEvents: "none" } },
          paper: { sx: { pointerEvents: "auto" } },
        }}
      >
        {availableVenueTypes.map((type) => (
          <SelectableMenuItem
            disableRipple
            sx={{ gap: 2 }}
            key={type}
            checked={(filterVenueTypes ?? availableVenueTypes).includes(type)}
            onClick={() =>
              setFilterVenueTypes((prev) =>
                toggleSelection(prev, availableVenueTypes, type),
              )
            }
          >
            <CheckIndicator
              checked={(filterVenueTypes ?? availableVenueTypes).includes(type)}
            />
            {type}
          </SelectableMenuItem>
        ))}
      </Menu>

      {/* Can host submenu */}
      <Menu
        anchorEl={canHostSubmenuAnchor}
        open={Boolean(canHostSubmenuAnchor)}
        onClose={() => setCanHostSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          root: { sx: { pointerEvents: "none" } },
          paper: { sx: { pointerEvents: "auto" } },
        }}
      >
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={filterCeremony}
          onClick={() => setFilterCeremony((v) => !v)}
        >
          <CheckIndicator checked={filterCeremony} />
          <ListItemText>Ceremony</ListItemText>
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={filterReception}
          onClick={() => setFilterReception((v) => !v)}
        >
          <CheckIndicator checked={filterReception} />
          <ListItemText>Reception</ListItemText>
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={filterLodging}
          onClick={() => setFilterLodging((v) => !v)}
        >
          <CheckIndicator checked={filterLodging} />
          <ListItemText>Lodging</ListItemText>
        </SelectableMenuItem>
      </Menu>

      {/* Sort button */}
      <Button
        variant="gray"
        onClick={(e) => setSortMenuAnchor(e.currentTarget)}
      >
        <Icon size="125">
          <MdSort />
        </Icon>
        Sort
      </Button>
      <Menu
        anchorEl={sortMenuAnchor}
        open={Boolean(sortMenuAnchor)}
        onClose={() => setSortMenuAnchor(null)}
      >
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortKey === "name"}
          isRadio
          onClick={() => setSortKey("name")}
        >
          <CheckIndicator checked={sortKey === "name"} />
          Venue name
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortKey === "capacity"}
          isRadio
          onClick={() => setSortKey("capacity")}
        >
          <CheckIndicator checked={sortKey === "capacity"} />
          Capacity
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortKey === "reactions"}
          isRadio
          onClick={() => setSortKey("reactions")}
        >
          <CheckIndicator checked={sortKey === "reactions"} />
          Reactions
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortKey === "cost"}
          isRadio
          onClick={() => setSortKey("cost")}
        >
          <CheckIndicator checked={sortKey === "cost"} />
          Estimated total cost
        </SelectableMenuItem>
        <Divider />
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortDir === "asc"}
          isRadio
          onClick={() => setSortDir("asc")}
        >
          <CheckIndicator checked={sortDir === "asc"} />
          Ascending
        </SelectableMenuItem>
        <SelectableMenuItem
          disableRipple
          sx={{ gap: 2 }}
          checked={sortDir === "desc"}
          isRadio
          onClick={() => setSortDir("desc")}
        >
          <CheckIndicator checked={sortDir === "desc"} />
          Descending
        </SelectableMenuItem>
      </Menu>
    </>
  );
}
