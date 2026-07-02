import React, { useState } from "react";
import { Menu, MenuItem, Checkbox, Radio, Divider, ListItemIcon, ListItemText } from "@mui/material";
import {
  MdChevronRight,
  MdFilterList,
  MdSort,
  MdFavorite,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import { Button } from "./AirtableInterface.stitches";

const OPTIONS_INCLUDED = [
  "The intimate microwedding",
  "The extended family party",
  "The more-the-merrier shindig",
];

const REACTION_OPTIONS = [
  { label: "Heart", value: "heart", icon: <MdFavorite /> },
  { label: "Thumbs up", value: "thumbs_up", icon: <MdThumbUp /> },
  { label: "Thumbs down", value: "thumbs_down", icon: <MdThumbDown /> },
];

export default function VenueFilterSortMenu({
  availableStates,
  filterStates,
  setFilterStates,
  filterOptions,
  setFilterOptions,
  filterReactions,
  setFilterReactions,
  filterPetFriendly,
  setFilterPetFriendly,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
}) {
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [stateSubmenuAnchor, setStateSubmenuAnchor] = useState(null);
  const [optionsSubmenuAnchor, setOptionsSubmenuAnchor] = useState(null);
  const [reactionsSubmenuAnchor, setReactionsSubmenuAnchor] = useState(null);

  const hasActiveFilters =
    filterStates.length > 0 ||
    filterOptions.length > 0 ||
    filterReactions.length > 0 ||
    filterPetFriendly;

  return (
    <>
      {/* Filters button */}
      <Button
        variant={hasActiveFilters ? "blue" : "gray"}
        onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
      >
        <MdFilterList style={{ marginRight: 4 }} />
        Filters
        {hasActiveFilters &&
          ` (${filterStates.length + filterOptions.length + filterReactions.length + (filterPetFriendly ? 1 : 0)})`}
      </Button>
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => {
          setFilterMenuAnchor(null);
          setStateSubmenuAnchor(null);
          setOptionsSubmenuAnchor(null);
          setReactionsSubmenuAnchor(null);
        }}
      >
        <MenuItem
          disableRipple
          onClick={(e) =>
            setStateSubmenuAnchor(
              stateSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(stateSubmenuAnchor)}
        >
          <ListItemText>State</ListItemText>
          <ListItemIcon sx={{ minWidth: "unset", ml: 2 }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={(e) =>
            setOptionsSubmenuAnchor(
              optionsSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(optionsSubmenuAnchor)}
        >
          <ListItemText>Options included</ListItemText>
          <ListItemIcon sx={{ minWidth: "unset", ml: 2 }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={(e) =>
            setReactionsSubmenuAnchor(
              reactionsSubmenuAnchor ? null : e.currentTarget,
            )
          }
          selected={Boolean(reactionsSubmenuAnchor)}
        >
          <ListItemText>Reactions</ListItemText>
          <ListItemIcon sx={{ minWidth: "unset", ml: 2 }}>
            <MdChevronRight />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => setFilterPetFriendly((v) => !v)}
        >
          <Checkbox
            checked={filterPetFriendly}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Pet friendly
        </MenuItem>
        {hasActiveFilters && (
          <>
            <Divider />
            <MenuItem
              disableRipple
              onClick={() => {
                setFilterStates([]);
                setFilterOptions([]);
                setFilterReactions([]);
                setFilterPetFriendly(false);
                setFilterMenuAnchor(null);
                setStateSubmenuAnchor(null);
                setOptionsSubmenuAnchor(null);
                setReactionsSubmenuAnchor(null);
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
      >
        {availableStates.map((state) => (
          <MenuItem
            disableRipple
            key={state}
            onClick={() =>
              setFilterStates((prev) =>
                prev.includes(state)
                  ? prev.filter((s) => s !== state)
                  : [...prev, state],
              )
            }
          >
            <Checkbox
              checked={filterStates.includes(state)}
              size="small"
              sx={{ p: 0, mr: 1 }}
            />
            {state}
          </MenuItem>
        ))}
      </Menu>

      {/* Options included submenu */}
      <Menu
        anchorEl={optionsSubmenuAnchor}
        open={Boolean(optionsSubmenuAnchor)}
        onClose={() => setOptionsSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {OPTIONS_INCLUDED.map((opt) => (
          <MenuItem
            disableRipple
            key={opt}
            onClick={() =>
              setFilterOptions((prev) =>
                prev.includes(opt)
                  ? prev.filter((o) => o !== opt)
                  : [...prev, opt],
              )
            }
          >
            <Checkbox
              checked={filterOptions.includes(opt)}
              size="small"
              sx={{ p: 0, mr: 1 }}
            />
            {opt}
          </MenuItem>
        ))}
      </Menu>

      {/* Reactions submenu */}
      <Menu
        anchorEl={reactionsSubmenuAnchor}
        open={Boolean(reactionsSubmenuAnchor)}
        onClose={() => setReactionsSubmenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {REACTION_OPTIONS.map(({ label, value, icon }) => (
          <MenuItem
            disableRipple
            key={value}
            onClick={() =>
              setFilterReactions((prev) =>
                prev.includes(value)
                  ? prev.filter((r) => r !== value)
                  : [...prev, value],
              )
            }
          >
            <Checkbox
              checked={filterReactions.includes(value)}
              size="small"
              sx={{ p: 0, mr: 1 }}
            />
            <ListItemIcon sx={{ minWidth: "unset !important", mr: "6px" }}>
              {icon}
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>

      {/* Sort button */}
      <Button
        variant="gray"
        onClick={(e) => setSortMenuAnchor(e.currentTarget)}
      >
        <MdSort style={{ marginRight: 4 }} />
        Sort
      </Button>
      <Menu
        anchorEl={sortMenuAnchor}
        open={Boolean(sortMenuAnchor)}
        onClose={() => setSortMenuAnchor(null)}
      >
        <MenuItem disableRipple onClick={() => setSortKey("name")}>
          <Radio
            checked={sortKey === "name"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Venue name
        </MenuItem>
        <MenuItem disableRipple onClick={() => setSortKey("capacity")}>
          <Radio
            checked={sortKey === "capacity"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Capacity
        </MenuItem>
        <MenuItem disableRipple onClick={() => setSortKey("reactions")}>
          <Radio
            checked={sortKey === "reactions"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Reactions
        </MenuItem>
        <MenuItem disableRipple onClick={() => setSortKey("cost")}>
          <Radio
            checked={sortKey === "cost"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Estimated total cost
        </MenuItem>
        <Divider />
        <MenuItem disableRipple onClick={() => setSortDir("asc")}>
          <Radio
            checked={sortDir === "asc"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Ascending
        </MenuItem>
        <MenuItem disableRipple onClick={() => setSortDir("desc")}>
          <Radio
            checked={sortDir === "desc"}
            size="small"
            sx={{ p: 0, mr: 1 }}
          />
          Descending
        </MenuItem>
      </Menu>
    </>
  );
}
