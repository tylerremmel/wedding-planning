# The Grande-Remmel Wedding

A Jekyll wedding website with a React-powered venue explorer, backed by Airtable and deployed to GitHub Pages.

**Live site:** https://tylerremmel.github.io/wedding-planning/

---

## Pages

### Home (`index.markdown`)

The landing page. Uses Jekyll's built-in `home` layout from the Minima theme. No custom logic — content is managed directly in the Markdown file and the Jekyll `_config.yml` site settings.

### About (`about.markdown`)

A standard static page using the Minima `page` layout.

### Venues (`venues.md`)

The main feature page. Mounts the React application into a `<div id="airtable-interface-root">` element and loads the compiled bundle. All venue browsing, filtering, map interaction, commenting, and reactions happen inside this React app — Jekyll only provides the outer page chrome.

---

## React Application

The app lives in [`assets/src/`](assets/src/) and is compiled by Vite into a single IIFE bundle at [`assets/js/airtable-interface.bundle.js`](assets/js/airtable-interface.bundle.js).

### Entry point

[`assets/src/main.jsx`](assets/src/main.jsx) — Calls `ReactDOM.createRoot` on `#airtable-interface-root` and mounts `<AirtableInterface />`. Also runs global Stitches style injection.

### Components

#### `AirtableInterface.jsx`

The root component. It's a thin composition/layout layer — almost all state and side effects live in the three hooks below. It wires their outputs together, owns a small amount of view-only state (`hoveredVenueId`, `pinHoveredVenueId`, `openDrawerVenueId`), and renders the two-column layout: `LeftPanel` (filter/sort controls + venue card grid) and `RightPanel` (map).

It also stabilizes the `onCommentsLoaded` / `onDrawerClose` callbacks passed to each `VenueCard` via `useCallback`, so `VenueCard`'s `React.memo` can actually skip re-rendering cards whose props didn't change (e.g. on hover).

Styles are in [`AirtableInterface.stitches.jsx`](assets/src/components/AirtableInterface.stitches.jsx).

#### Hooks (`assets/src/hooks/`)

State and side effects that used to live in `AirtableInterface.jsx` directly are split across three hooks:

- **`useAirtableAuth.js`** — Manages the Airtable OAuth session end to end: exchanges an `?code=` callback param for a token via the proxy, tracks token expiry, and silently refreshes the token in the background (5 minutes before it expires) using the stored `refresh_token`. If silent refresh fails, exposes `refreshFailed`/`minutesLeft` so the UI can show a session warning with a manual re-login button. `handleRefreshSession` saves the current filter/sort/drawer state via `savePreAuthState` before redirecting through OAuth again, and restores it afterwards. Exposes an `authEpoch` counter that increments only on events that should trigger a records load (fresh login, or an existing token found at mount) — never on a silent refresh.
- **`useVenueRecords.js`** — Loads venue records (from a 1-hour local cache or the Airtable API, with retry/backoff on rate limits), reacting to `authEpoch` changes from `useAirtableAuth`. After a successful fetch, kicks off `geocodeAndPersistMissingCoords` for venues missing lat/lng, merging coordinates into state progressively as batches resolve. Also owns `nextCommentsIndex`, which sequences comment loading across cards.
- **`useVenueFilters.js`** — Owns all filter/sort state (text search, state/options/pet-friendly/reactions filters, sort key + direction) and derives `filteredRecords` and `availableStates` via `useMemo`. Also owns `mapBounds`/`fitKey` and the effects that clear/refit the map when filters change or records first load.

#### `VenueFilterSortMenu.jsx`

The Filters and Sort buttons in the header, plus their MUI `Menu`/submenu popovers (State, Options included, Reactions, and a Pet friendly toggle for filters; venue name/capacity/reactions/cost with Ascending/Descending for sort). Owns its own menu-anchor state; all filter/sort values and setters are passed down as props from `AirtableInterface.jsx`.

#### `VenueCard.jsx`

Renders a single venue as a card in the left panel. Wrapped in `React.memo` so it only re-renders when its own props change. Clicking a card opens a MUI `Drawer` anchored to the left with full venue details.

- **Image carousel** — Parses a JSON array from the `Images JSON` Airtable field. Falls back to an inline SVG placeholder if the field is empty or an image fails to load. A fading dot-indicator strip (up to 7 dots, windowed around the current slide) appears under the carousel for venues with multiple photos.
- **Comments** — Loaded sequentially across cards (one at a time via `shouldLoadComments` / `onCommentsLoaded` chaining) to avoid hitting Airtable's rate limit. Retries with backoff on rate-limit errors.
- **Reactions** — Heart, thumbs-up, and thumbs-down reactions. State is derived from the `All reactions` Airtable field (`email|type` pairs), with optimistic local updates on click.
- **Drawer** — Shows full contact info, links, vibe check, capacity, seasons, pet policy, deposit info, and a lazy-loaded image grid.
- **Hover/scroll sync** — Accepts `isHovered` (highlights the card when its map pin is hovered) and `scrollTo` (smooth-scrolls the card into view when its pin is clicked).

Styles are in [`VenueCard.stitches.jsx`](assets/src/components/VenueCard.stitches.jsx).

#### `VenueComments.jsx`

Shared comments and reactions UI used in two contexts — `variant="card"` (compact, inline on the card) and `variant="drawer"` (full, inside the detail drawer). Receives all state and handlers as props from `VenueCard`. Comments render newest-first, each with a per-author avatar resolved from the commenter's first name (falls back to a generic avatar for anyone other than the two wedding planners).

#### `MapPanel.jsx`

A React-Leaflet map panel rendered in the right column.

- **Pins** — Custom SVG pins rendered via `L.divIcon`. Default pins are blue; the hovered pin scales up and turns amber.
- **Bounds reporting** — The inner `MapController` component listens to Leaflet's `moveend` event. After a user-initiated move, it waits **1.5 seconds** (debounced via `clearTimeout`/`setTimeout`) before calling `onBoundsChange`, so rapid panning or zooming doesn't immediately reorder the card list.
- **Programmatic fit** — A `fitKey` prop increment triggers `map.fitBounds` on all currently-visible venues. The `skipNextMoveRef` flag suppresses the resulting `moveend` event so programmatic refits don't trigger a bounds filter.
- **"Show all venues" button** — Rendered as an absolutely-positioned overlay when `isBoundsFiltered` is true. Clears bounds and refits the map.

### Utilities

#### `airtableAuth.js`

Handles the Airtable OAuth 2.0 PKCE flow and session lifecycle:
- Generates and stores a `code_verifier` / `code_challenge` pair in `localStorage`
- Redirects to Airtable's OAuth authorization endpoint
- On callback, POSTs the code + verifier to the Vercel proxy's `/api/auth` endpoint and stores the returned access token, expiry, and `refresh_token` in `localStorage`
- `performTokenRefresh` — exchanges the stored `refresh_token` for a new access token via `/api/refresh` (refresh tokens rotate on each use and are valid for 60 days)
- `savePreAuthState` / `restorePreAuthState` — round-trip filter/sort/drawer state through `sessionStorage` across a forced re-login redirect

#### `airtableApi.js`

All Airtable API calls are routed through the Vercel proxy to avoid CORS and keep the OAuth token off the client in transit:
- `fetchVenueRecords` — fetches all records from the venues table
- `fetchRecordComments` — fetches comments for a single record
- `submitComment` — posts a new comment
- `submitReaction` — toggles a reaction; the proxy returns `{ active: boolean }` so the UI can apply an optimistic update
- `fetchUserProfile` — fetches the logged-in user's Airtable profile (used to display their email)

#### `venueCache.js`

Caches fetched venue records in `localStorage` for 1 hour (`getCachedVenues` / `setCachedVenues`), so a page refresh or cold start can render immediately without waiting on a live Airtable fetch. "Refresh venues" bypasses the cache for a forced live fetch.

#### `sleep.js`

A single shared `sleep(ms)` delay helper, used by the retry/backoff loops in `useVenueRecords.js` and `VenueCard.jsx`.

#### `geocodeVenues.js`

Auto-geocodes venues that are missing `Latitude` / `Longitude` fields:

1. **Embedded coordinates** — If the `Full address` field contains a raw `lat, lng` pair, those are extracted immediately without a network call.
2. **Nominatim geocoding** — Remaining addresses are sent to the proxy's `/api/geocode` endpoint in batches of 4. The proxy calls OpenStreetMap Nominatim server-side (no CORS restriction) and writes the results back to Airtable.
3. **Progressive updates** — Each resolved batch calls `onBatchResolved`, merging coordinates into local state immediately so pins appear on the map as they resolve.

---

## Backend Proxy

A separate Vercel project at `https://airtable-proxy-olive.vercel.app` provides the following serverless endpoints. All of them keep the Airtable API key server-side; the client only ever holds its own OAuth user token.

| Endpoint | Purpose |
|---|---|
| `/api/auth` | Exchanges an OAuth authorization code (+ PKCE verifier) for an Airtable access/refresh token |
| `/api/refresh` | Exchanges a stored `refresh_token` for a new access token |
| `/api/records` | Fetches all records from the venues table |
| `/api/comments` | Fetches comments for a single record |
| `/api/submit` | Posts a new comment |
| `/api/reactions` | Toggles a reaction and returns its new active state |
| `/api/profile` | Fetches the logged-in user's Airtable profile |
| `/api/geocode` | Accepts address batches, calls Nominatim, writes coordinates back to Airtable |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Static site | Jekyll + Minima theme, GitHub Pages |
| UI framework | React 18 |
| Styling | Stitches (`@stitches/react`) |
| Component library | MUI (`@mui/material`) for the Drawer, filter/sort menus, and form inputs |
| Map | React-Leaflet + Leaflet |
| Icons | `react-icons` |
| Build tool | Vite (IIFE output, single bundle) |
| Backend | Vercel serverless functions |
| Data source | Airtable (OAuth 2.0 PKCE) |
| Geocoding | OpenStreetMap Nominatim (via proxy) |

---

## Local Development

### Prerequisites

- Node.js
- Ruby + Bundler (for Jekyll)

### Install dependencies

```bash
npm install
bundle install
```

### Run the React dev server

```bash
npm run dev
```

### Build the React bundle

```bash
npm run build
```

### Preview the full site locally

Starts Vite in watch mode and Jekyll together:

```bash
npm run preview
```

The site is available at `http://127.0.0.1:4001/wedding-planning/`. The React bundle at `assets/js/airtable-interface.bundle.js` rebuilds automatically on source changes.
