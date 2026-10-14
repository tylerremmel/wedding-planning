# Decision: transition this repo in place vs. new repo for the wedding website

Status: **undecided** — written up as a recommendation for later reference, not yet acted on.

## Context

This repo started as a private, two-person venue-comparison tool (Airtable-backed React app, OAuth login, reactions/comments) and may grow into the public-facing wedding website (RSVPs, and later registry/travel/photos). If it does, the plan would be to retire the venue tool once a venue is finalized, and to put the eventual site on a custom domain rather than the current `tylerremmel.github.io/wedding-planning` subpath. Open question: reuse this codebase, or start a fresh repo?

## Recommendation: transition in place

**Why:**
- The reusable infrastructure already works in production and isn't venue-specific: OAuth PKCE login (`assets/src/utils/airtableAuth.js`, `hooks/useAirtableAuth.js`), the Airtable REST client (`assets/src/utils/airtableApi.js`), and the Stitches/MUI styling setup. A new repo would need all of this re-plumbed, not just copy-pasted.
- The OAuth redirect URI and the Vercel proxy's allowlist are hardcoded to *this* GitHub Pages URL. A new repo means re-registering the redirect with Airtable and updating the proxy — real coordination work for zero functional benefit.
- Venue-specific code is already cleanly isolated (`VenueCard.jsx`, `VenueComments.jsx`, `useVenueFilters.js`, `useVenueRecords.js`, `VenueFilterSortMenu.jsx`, `MapPanel.jsx`) and can be deleted without touching the shared layers above.
- The Jekyll shell already supports adding ordinary content pages (`about.markdown`, `venues.md` are both just `.md` files with front matter) — a homepage, RSVP page, travel page, etc. are new files, not an architecture change.
- A custom domain is an orthogonal step (buy domain + add `CNAME` + update one OAuth redirect) — identical effort whether this repo is reused or replaced. It's not a reason to start over.
- The main thing a fresh repo buys — a cleaner name/branding, no leftover Jekyll boilerplate — is cosmetic and guests never see the repo itself, only the rendered site.

## If/when this moves forward: what "transition in place" looks like

1. **Retire the venue tool** once the venue is finalized:
   - Remove or unlink `venues.md` from site navigation (keep the file/branch in git history if you want a record).
   - Delete the venue-specific files listed above (`VenueCard.jsx`, `VenueComments.jsx`, `useVenueFilters.js`, `useVenueRecords.js`, `VenueFilterSortMenu.jsx`, `MapPanel.jsx`, `utils/geocodeVenues.js`, `utils/venueCache.js`, `utils/preFilters.js`).
   - Keep `assets/src/utils/airtableAuth.js`, `airtableApi.js`, `hooks/useAirtableAuth.js`, `styles/stitches.js`, `styles/muiTheme.js`, `components/shared.stitches.jsx` — these carry over directly.
2. **Clean up Jekyll boilerplate** that was never customized: `_posts/2026-06-18-welcome-to-jekyll.markdown`, default content in `about.markdown`/`index.markdown`, generic `_includes/head.html`.
3. **Build out real site pages** as new Jekyll `.md`/`.html` files (homepage, RSVP, travel, registry, etc.), following the `venues.md` pattern. Any page needing interactivity (e.g. an RSVP form) reuses the existing Vite→IIFE bundle pattern — mount a new component into a new `<div id="...">`, extend `vite.config.js`'s single entry point to emit additional bundles as needed.
4. **New Airtable data model for RSVPs**: add a Guests/RSVP table (and any new Vercel proxy endpoints, e.g. `submit-rsvp.js`) in the separate proxy repo, mirroring the existing `submit.js`/`reactions.js` pattern — the Airtable OAuth/token plumbing doesn't change.
5. **Custom domain** (independent of the above): buy the domain, add a `CNAME` file to this repo, update GitHub Pages settings, then add the new redirect URI to the Airtable OAuth app. No code change is needed in `airtableAuth.js`: the redirect is built from `window.location` at runtime (`PROD_REDIRECT` is only a fallback). The Vercel proxy has no origin allowlist to update (its only allowlist is user IDs). Domain: `www.jennaandtyleraregettingmarried.com` is primary; the apex redirects to it.

## Verification (once implemented)

- After deleting venue-specific files, run `npm run build` and confirm the Vite bundle builds cleanly with no dangling imports.
- Run `npm run preview` (Jekyll + Vite watch) locally and click through all site pages, confirming OAuth login still works end-to-end against the existing Vercel proxy.
- After the domain change, do a full login/logout/token-refresh cycle against the new domain before removing the old `github.io` redirect from Airtable's OAuth app settings.
