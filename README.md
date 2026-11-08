# The Wedding of Jenna Grande and Tyler Remmel

Our wedding website: a custom Jekyll site (no theme gem) deployed to GitHub Pages with GitHub Actions, plus a legacy React venue explorer backed by Airtable that now lives at an unlinked URL.

**Live site:** https://www.jennaandtyleraregettingmarried.com/

Content editors: start with [EDITING.md](EDITING.md). This README is for development.

---

## Site structure

### Pages

| Page            | File               | Layout   | Notes                                                                   |
| --------------- | ------------------ | -------- | ----------------------------------------------------------------------- |
| Home            | `index.md`         | `home`   | Words and tiles come from `_data/home.yml`                              |
| Our story       | `our-story.md`     | `story`  | Prose, plus milestones, first impressions and photo groups from `_data` |
| The wedding     | `the-wedding.md`   | `page`   |                                                                         |
| Getting there   | `getting-there.md` | `page`   | Hotel blocks from `_data/hotels.yml`                                    |
| What to know    | `what-to-know.md`  | `page`   | FAQs from `_data/faqs.yml`                                              |
| Photos          | `photos.md`        | `page`   |                                                                         |
| Styleguide      | `styleguide.md`    | default  | Design reference, `noindex`, not in the nav (see below)                 |
| Venues (legacy) | `venues.md`        | `venues` | React + Airtable app, `noindex`, light scheme only, not in the nav      |
| 404             | `404.html`         | `page`   | `noindex`                                                               |

The header and footer menus come from `_data/navigation.yml` (order there is the order on the site). Pages that
should stay out of search engines set `noindex: true` in their front matter.

### Front matter options

- `hero:` the topper image under the header (`src`, `width`, `height`, `alt`); `hero: false` removes the slot.
- `noindex: true` adds a `robots` noindex meta tag.
- `scheme: light` forces the light color scheme (no dark mode, and a single `theme-color`).

### Layouts and includes

- `_layouts/`: `default` (document shell, header, footer), `home`, `page`, `story` (adds the sticky section nav) and `venues`.
- `_includes/`: one include per component. Notable ones:
  - `image.html`: the only `<img>` renderer; takes `src`, `alt`, `width`, `height`. An `alt` of `TK` is outlined in yellow in dev and renders as `alt=""` in production.
  - `md.html`: renders editor-written Markdown (`text=`, `inline=true` to drop the wrapping `<p>`) and highlights `TK`.
  - `divider.html`: a plain rule, or the ornament with `ornament=true` (normally only the first divider on a page). `sentinel=true` marks the divider the sticky nav waits for.
  - `section-nav.html`: builds the sticky nav from the page's own `## ` headings.
  - `edit-attr.html`: emits the `data-edit-src` attribute used by edit mode.
- `_plugins/highlight_tk.rb`: Liquid filter that wraps a standalone `TK` in visible text in `<mark class="tk">`. Custom plugins work because the site is built by Actions rather than the `github-pages` gem.

### Styling and scripts

- `assets/css/tokens.css`: design tokens (sapphire color ramp, type ramp, spacing, semantic light/dark roles). Dark mode follows the OS; there is no toggle.
- `assets/css/base.css` and `components.css`: element and component styles, all built on the tokens.
- `assets/js/sticky-nav.js`: Our Story sticky section nav (scroll-spy, dropdown on narrow screens, back/forward handling).
- `assets/js/edit-mode.js`: the `?edit` shortcut (below).
- `assets/favicons/`: favicon PNGs, apple-touch icon and `site.webmanifest`; `favicon.ico` stays at the site root. `theme-color` in `_includes/head.html` copies the header color for light and dark; update it there if `--header-bg` changes.

### Fonts

Roboto Serif and Roboto Flex are self-hosted variable fonts in `assets/fonts/`, declared in `tokens.css`. Both files **must contain a `STAT` table**. Without it, iOS Safari ignores `font-weight` and `font-stretch` for them and renders everything at the lightest weight and narrowest width (Chrome looks fine either way). Subsetting drops the table, so after re-subsetting or replacing either font, run:

```sh
pip install fonttools brotli
python3 scripts/add-stat-table.py
```

Check changes to type in WebKit (Safari, or Playwright's WebKit) as well as Chrome. Don't work around a mismatch with `font-variation-settings`: it is inherited, so it overrides `font-weight` on child elements (`<strong>`, the venues app's Quicksand text).

### iOS Safari chrome color

Safari 26 ignores `theme-color` and tints the status bar, bottom toolbar and overscroll area from the page background. `html` is painted with `--header-bg` (the header and footer share it) and `body` paints `--surface` over it, so the top and bottom of the page read as part of the header and footer. Safari also tints from a `position: fixed` or sticky element at the top edge, so the sticky Our Story nav recolors the status bar while it is visible. Keep `theme-color` in `_includes/head.html` for older iOS and other browsers.

### Styleguide page

`/styleguide/` (source: `styleguide.md`) is a living reference rendered from the real tokens and components. It
is not linked from the site and is `noindex`, so open it by URL (`/styleguide/` locally). Sections:

- Color: the sapphire ramp in light and dark
- Type ramp, and role/step usage (headline, subhead, body, meta)
- Spacing scale and the semantic spacing roles
- Ornament divider and plain rule
- Image group, timeline
- Sticky section nav (inert demo)

Check it after changing tokens or a component; if you add a component, add it here too.

### `?edit` mode (URL parameters)

Edit mode puts a pencil on each editable block that opens the source file in GitHub's web editor. It uses no tokens
or API calls; GitHub permissions decide who can actually save.

| URL parameter | Effect                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `?edit`       | Turns edit mode on and remembers it in `localStorage` (key `wedding-edit-mode`), so it stays on across pages |
| `?edit=off`   | Turns it off and clears the saved setting                                                                    |

While on, a banner at the bottom left shows "Edit mode. Turn off" (the link is `?edit=off`). If `localStorage` is
unavailable, `?edit` works for that page load only.

To make a block editable, add `{% include edit-attr.html path="_data/example.yml" %}` to its
element. The link target is built from `github_repo` and `edit_branch` in `_config.yml`. The script only sets
`position: relative` on a block when it has no positioning of its own.

### `TK` placeholders and alt text

`TK` means "to come". It is highlighted yellow wherever it appears in editor text. `scripts/check-alt.sh` finds
images whose `alt` is still `TK` and prints GitHub warning annotations; run it with `--strict` to make it exit 1.
The `Checks` workflow runs it on PRs in warning-only mode. Switch to `--strict` once all alt text is written.

### Images

`scripts/prep-image.sh <max-long-edge-px> <file>...` resizes photos, converts to sRGB, strips all metadata (GPS, camera, software tags) and writes a clean JPEG to `assets/img/`. It needs ImageMagick and exiftool. Favicons were stripped the same way.

### Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds Jekyll with `JEKYLL_ENV=production` and
deploys to GitHub Pages (custom domain in `CNAME`). `.github/workflows/checks.yml` runs the alt-text check on PRs and non-main pushes. The Jekyll `exclude:` list in `_config.yml` keeps `docs/`, `scripts/`, `EDITING.md`, `README.md` and the React sources out of the published site.

---

## Legacy Venues app

The venue explorer is a React application mounted by `venues.md` (`/venues/`). It is no longer linked from the site navigation and is kept for reference.

### React Application

The app lives in [`assets/src/`](assets/src/) and is compiled by Vite into a single IIFE bundle at [`assets/js/airtable-interface.bundle.js`](assets/js/airtable-interface.bundle.js).

#### Entry point

[`assets/src/main.jsx`](assets/src/main.jsx) — Calls `ReactDOM.createRoot` on `#airtable-interface-root` and mounts `<AirtableInterface />`. Also runs global Stitches style injection.

#### Components

##### `AirtableInterface.jsx`

The root component. It's a thin composition/layout layer — almost all state and side effects live in the three hooks below. It wires their outputs together, owns a small amount of view-only state (`hoveredVenueId`, `pinHoveredVenueId`, `openDrawerVenueId`), and renders the two-column layout: `LeftPanel` (filter/sort controls + venue card grid) and `RightPanel` (map).

It also stabilizes the `onCommentsLoaded` / `onDrawerClose` callbacks passed to each `VenueCard` via `useCallback`, so `VenueCard`'s `React.memo` can actually skip re-rendering cards whose props didn't change (e.g. on hover).

Styles are in [`AirtableInterface.stitches.jsx`](assets/src/components/AirtableInterface.stitches.jsx).

##### Hooks (`assets/src/hooks/`)

State and side effects that used to live in `AirtableInterface.jsx` directly are split across three hooks:

- **`useAirtableAuth.js`** — Manages the Airtable OAuth session end to end: exchanges an `?code=` callback param for a token via the proxy, tracks token expiry, and silently refreshes the token in the background (5 minutes before it expires) using the stored `refresh_token`. If silent refresh fails, exposes `refreshFailed`/`minutesLeft` so the UI can show a session warning with a manual re-login button. `handleRefreshSession` saves the current filter/sort/drawer state via `savePreAuthState` before redirecting through OAuth again, and restores it afterwards. Exposes an `authEpoch` counter that increments only on events that should trigger a records load (fresh login, or an existing token found at mount) — never on a silent refresh.
- **`useVenueRecords.js`** — Loads venue records (from a 1-hour local cache or the Airtable API, with retry/backoff on rate limits), reacting to `authEpoch` changes from `useAirtableAuth`. After a successful fetch, kicks off `geocodeAndPersistMissingCoords` for venues missing lat/lng, merging coordinates into state progressively as batches resolve. Also owns `nextCommentsIndex`, which sequences comment loading across cards.
- **`useVenueFilters.js`** — Owns all filter/sort state (text search, state/options/pet-friendly/reactions filters, sort key + direction) and derives `filteredRecords` and `availableStates` via `useMemo`. Also owns `mapBounds`/`fitKey` and the effects that clear/refit the map when filters change or records first load.

##### `VenueFilterSortMenu.jsx`

The Filters and Sort buttons in the header, plus their MUI `Menu`/submenu popovers (State, Options included, Reactions, and a Pet friendly toggle for filters; venue name/capacity/reactions/cost with Ascending/Descending for sort). Owns its own menu-anchor state; all filter/sort values and setters are passed down as props from `AirtableInterface.jsx`.

##### `VenueCard.jsx`

Renders a single venue as a card in the left panel. Wrapped in `React.memo` so it only re-renders when its own props change. Clicking a card opens a MUI `Drawer` anchored to the left with full venue details.

- **Image carousel** — Parses a JSON array from the `Images JSON` Airtable field. Falls back to an inline SVG placeholder if the field is empty or an image fails to load. A fading dot-indicator strip (up to 7 dots, windowed around the current slide) appears under the carousel for venues with multiple photos.
- **Comments** — Loaded sequentially across cards (one at a time via `shouldLoadComments` / `onCommentsLoaded` chaining) to avoid hitting Airtable's rate limit. Retries with backoff on rate-limit errors.
- **Reactions** — Heart, thumbs-up, and thumbs-down reactions. State is derived from the `All reactions` Airtable field (`email|type` pairs), with optimistic local updates on click.
- **Drawer** — Shows full contact info, links, vibe check, capacity, seasons, pet policy, deposit info, and a lazy-loaded image grid.
- **Hover/scroll sync** — Accepts `isHovered` (highlights the card when its map pin is hovered) and `scrollTo` (smooth-scrolls the card into view when its pin is clicked).

Styles are in [`VenueCard.stitches.jsx`](assets/src/components/VenueCard.stitches.jsx).

##### `VenueComments.jsx`

Shared comments and reactions UI used in two contexts — `variant="card"` (compact, inline on the card) and `variant="drawer"` (full, inside the detail drawer). Receives all state and handlers as props from `VenueCard`. Comments render newest-first, each with a per-author avatar resolved from the commenter's first name (falls back to a generic avatar for anyone other than the two wedding planners).

##### `MapPanel.jsx`

A React-Leaflet map panel rendered in the right column.

- **Pins** — Custom SVG pins rendered via `L.divIcon`. Default pins are blue; the hovered pin scales up and turns amber.
- **Bounds reporting** — The inner `MapController` component listens to Leaflet's `moveend` event. After a user-initiated move, it waits **1.5 seconds** (debounced via `clearTimeout`/`setTimeout`) before calling `onBoundsChange`, so rapid panning or zooming doesn't immediately reorder the card list.
- **Programmatic fit** — A `fitKey` prop increment triggers `map.fitBounds` on all currently-visible venues. The `skipNextMoveRef` flag suppresses the resulting `moveend` event so programmatic refits don't trigger a bounds filter.
- **"Show all venues" button** — Rendered as an absolutely-positioned overlay when `isBoundsFiltered` is true. Clears bounds and refits the map.

#### Utilities

##### `airtableAuth.js`

Handles the Airtable OAuth 2.0 PKCE flow and session lifecycle:

- Generates and stores a `code_verifier` / `code_challenge` pair in `localStorage`
- Redirects to Airtable's OAuth authorization endpoint
- On callback, POSTs the code + verifier to the Vercel proxy's `/api/auth` endpoint and stores the returned access token, expiry, and `refresh_token` in `localStorage`
- `performTokenRefresh` — exchanges the stored `refresh_token` for a new access token via `/api/refresh` (refresh tokens rotate on each use and are valid for 60 days)
- `savePreAuthState` / `restorePreAuthState` — round-trip filter/sort/drawer state through `sessionStorage` across a forced re-login redirect

##### `airtableApi.js`

All Airtable API calls are routed through the Vercel proxy to avoid CORS and keep the OAuth token off the client in transit:

- `fetchVenueRecords` — fetches all records from the venues table
- `fetchRecordComments` — fetches comments for a single record
- `submitComment` — posts a new comment
- `submitReaction` — toggles a reaction; the proxy returns `{ active: boolean }` so the UI can apply an optimistic update
- `fetchUserProfile` — fetches the logged-in user's Airtable profile (used to display their email)

##### `venueCache.js`

Caches fetched venue records in `localStorage` for 1 hour (`getCachedVenues` / `setCachedVenues`), so a page refresh or cold start can render immediately without waiting on a live Airtable fetch. "Refresh venues" bypasses the cache for a forced live fetch.

##### `sleep.js`

A single shared `sleep(ms)` delay helper, used by the retry/backoff loops in `useVenueRecords.js` and `VenueCard.jsx`.

##### `geocodeVenues.js`

Auto-geocodes venues that are missing `Latitude` / `Longitude` fields:

1. **Embedded coordinates** — If the `Full address` field contains a raw `lat, lng` pair, those are extracted immediately without a network call.
2. **Nominatim geocoding** — Remaining addresses are sent to the proxy's `/api/geocode` endpoint in batches of 4. The proxy calls OpenStreetMap Nominatim server-side (no CORS restriction) and writes the results back to Airtable.
3. **Progressive updates** — Each resolved batch calls `onBatchResolved`, merging coordinates into local state immediately so pins appear on the map as they resolve.

---

### Backend Proxy

A separate Vercel project at `https://airtable-proxy-olive.vercel.app` provides the following serverless endpoints. All of them keep the Airtable API key server-side; the client only ever holds its own OAuth user token.

| Endpoint         | Purpose                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `/api/auth`      | Exchanges an OAuth authorization code (+ PKCE verifier) for an Airtable access/refresh token |
| `/api/refresh`   | Exchanges a stored `refresh_token` for a new access token                                    |
| `/api/records`   | Fetches all records from the venues table                                                    |
| `/api/comments`  | Fetches comments for a single record                                                         |
| `/api/submit`    | Posts a new comment                                                                          |
| `/api/reactions` | Toggles a reaction and returns its new active state                                          |
| `/api/profile`   | Fetches the logged-in user's Airtable profile                                                |
| `/api/geocode`   | Accepts address batches, calls Nominatim, writes coordinates back to Airtable                |

---

## Tech Stack

| Layer             | Technology                                                                |
| ----------------- | ------------------------------------------------------------------------- |
| Static site       | Jekyll 4 (custom layouts and CSS, no theme gem), GitHub Pages via Actions |
| UI framework      | React 18                                                                  |
| Styling           | Stitches (`@stitches/react`)                                              |
| Component library | MUI (`@mui/material`) for the Drawer, filter/sort menus, and form inputs  |
| Map               | React-Leaflet + Leaflet                                                   |
| Icons             | `react-icons`                                                             |
| Build tool        | Vite (IIFE output, single bundle)                                         |
| Backend           | Vercel serverless functions                                               |
| Data source       | Airtable (OAuth 2.0 PKCE)                                                 |
| Geocoding         | OpenStreetMap Nominatim (via proxy)                                       |

---

## Local Development

### Prerequisites

- Ruby + Bundler (Jekyll; the CI uses Ruby 3.4)
- Node.js (only for the legacy React bundle)
- ImageMagick and exiftool (only for `scripts/prep-image.sh`)

### Run the site

```bash
bundle install
bundle exec jekyll serve
```

The site is at `http://127.0.0.1:4000/`. Use `JEKYLL_ENV=production bundle exec jekyll serve` to see it as deployed (for example, `alt: TK` images lose their yellow marker). Add `?edit` to a URL to try edit mode and visit `/styleguide/` for the design reference.

### Legacy React app

```bash
npm install
npm run dev       # Vite dev server
npm run build     # rebuild assets/js/airtable-interface.bundle.js
npm run preview   # Vite watch + Jekyll together at http://127.0.0.1:4001/
```

The compiled bundle is committed, so you only need these when changing `assets/src/`.

### Formatting

The project uses Prettier defaults (`npx prettier --check <files>`). Liquid-heavy HTML includes are not Prettier-clean and are left as is.
