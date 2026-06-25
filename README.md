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

The root component. Owns all top-level state and orchestrates the full application:

- **Auth flow** — On mount, checks `localStorage` for a stored token. If an `?code=` OAuth callback param is present, exchanges it for a token via the proxy. Handles session expiry by clearing state and prompting re-login.
- **Record fetching** — Calls the proxy to pull all venue records from Airtable. Retries up to 3 times with exponential backoff on rate-limit errors.
- **Geocoding** — After records load, calls `geocodeAndPersistMissingCoords` for any venues missing lat/lng. Coordinates are written back to Airtable and merged into local state progressively as each batch resolves, so map pins appear without waiting for the full geocode pass.
- **Filtering and sorting** — `filteredRecords` is a `useMemo` that applies text search (name or address), map bounds clipping, and alphabetical sort.
- **Map state** — Tracks `mapBounds` (set by the map after a 1.5 s debounce) and `fitKey` (incremented to trigger a programmatic refit). Bounds are cleared and the map refits automatically when the text filter or sort key changes.
- **Layout** — Renders a two-column split: `LeftPanel` (filter controls + venue card grid) and `RightPanel` (map).

Styles are in [`AirtableInterface.stitches.jsx`](assets/src/components/AirtableInterface.stitches.jsx).

#### `VenueCard.jsx`

Renders a single venue as a card in the left panel. Clicking a card opens a MUI `Drawer` anchored to the left with full venue details.

- **Image carousel** — Parses a JSON array from the `Images JSON` Airtable field. Falls back to an inline SVG placeholder if the field is empty or an image fails to load.
- **Comments** — Loaded sequentially across cards (one at a time via `shouldLoadComments` / `onCommentsLoaded` chaining) to avoid hitting Airtable's rate limit. Retries with backoff on rate-limit errors.
- **Reactions** — Heart, thumbs-up, and thumbs-down reactions. State is derived from the `All reactions` Airtable field (`email|type` pairs), with optimistic local updates on click.
- **Drawer** — Shows full contact info, links, vibe check, capacity, seasons, pet policy, deposit info, and a lazy-loaded image grid.
- **Hover/scroll sync** — Accepts `isHovered` (highlights the card when its map pin is hovered) and `scrollTo` (smooth-scrolls the card into view when its pin is clicked).

Styles are in [`VenueCard.stitches.jsx`](assets/src/components/VenueCard.stitches.jsx).

#### `VenueComments.jsx`

Shared comments and reactions UI used in two contexts — `variant="card"` (compact, inline on the card) and `variant="drawer"` (full, inside the detail drawer). Receives all state and handlers as props from `VenueCard`.

#### `MapPanel.jsx`

A React-Leaflet map panel rendered in the right column.

- **Pins** — Custom SVG pins rendered via `L.divIcon`. Default pins are blue; the hovered pin scales up and turns amber.
- **Bounds reporting** — The inner `MapController` component listens to Leaflet's `moveend` event. After a user-initiated move, it waits **1.5 seconds** (debounced via `clearTimeout`/`setTimeout`) before calling `onBoundsChange`, so rapid panning or zooming doesn't immediately reorder the card list.
- **Programmatic fit** — A `fitKey` prop increment triggers `map.fitBounds` on all currently-visible venues. The `skipNextMoveRef` flag suppresses the resulting `moveend` event so programmatic refits don't trigger a bounds filter.
- **"Show all venues" button** — Rendered as an absolutely-positioned overlay when `isBoundsFiltered` is true. Clears bounds and refits the map.

### Utilities

#### `airtableAuth.js`

Handles the Airtable OAuth 2.0 PKCE flow:
- Generates and stores a `code_verifier` / `code_challenge` pair in `sessionStorage`
- Redirects to Airtable's OAuth authorization endpoint
- On callback, POSTs the code + verifier to the Vercel proxy's `/api/exchange-token` endpoint
- Stores the returned token in `localStorage`

#### `airtableApi.js`

All Airtable API calls are routed through the Vercel proxy to avoid CORS and keep the OAuth token off the client in transit:
- `fetchVenueRecords` — fetches all records from the venues table
- `fetchRecordComments` — fetches comments for a single record
- `submitComment` — posts a new comment
- `submitReaction` — toggles a reaction; the proxy returns `{ active: boolean }` so the UI can apply an optimistic update

#### `geocodeVenues.js`

Auto-geocodes venues that are missing `Latitude` / `Longitude` fields:

1. **Embedded coordinates** — If the `Full address` field contains a raw `lat, lng` pair, those are extracted immediately without a network call.
2. **Nominatim geocoding** — Remaining addresses are sent to the proxy's `/api/geocode` endpoint in batches of 4. The proxy calls OpenStreetMap Nominatim server-side (no CORS restriction) and writes the results back to Airtable.
3. **Progressive updates** — Each resolved batch calls `onBatchResolved`, merging coordinates into local state immediately so pins appear on the map as they resolve.

---

## Backend Proxy

A separate Vercel project at `https://airtable-proxy-olive.vercel.app` provides three serverless endpoints:

| Endpoint | Purpose |
|---|---|
| `/api/exchange-token` | Exchanges an OAuth authorization code for an Airtable access token |
| `/api/*` (proxied) | Forwards authenticated Airtable API requests, injecting the stored token |
| `/api/geocode` | Accepts address batches, calls Nominatim, writes coordinates back to Airtable |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Static site | Jekyll + Minima theme, GitHub Pages |
| UI framework | React 18 |
| Styling | Stitches (`@stitches/react`) |
| Component library | MUI (`@mui/material`) for the Drawer |
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
