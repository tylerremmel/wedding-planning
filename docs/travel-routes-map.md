# Travel Routes Map for Getting-There Page

## Overview

A static map with two views:

- **Traveling there:** the driving route to Waterford, Maine from the places guests arrive
- **Once you're there:** zoomed-in view of the area with the key places

The map is a picture, not a navigation tool. Nothing on it responds to the pointer or keyboard; the page copy carries
the details (distances, times, addresses, schedule). The only motion is the zoom between views on the desktop
Getting There map.

## Traveling there

One solid route line, plus a second line for drivers from the south that stops where it meets the first, so no two
lines overlap.

| Pin                           | Icons        | Placement                                                                  |
| ----------------------------- | ------------ | -------------------------------------------------------------------------- |
| The Waterford Inne            | star         | Beside the end of the route; label on the left (desktop) or above (phones) |
| Portland                      | train, plane | Beside the line at Portland; label on the right (desktop) or left (phones) |
| Boston                        | plane        | Beside the start of the route; label on the right                          |
| Driving from all points south | bronco       | Pinned 20px in from the map's bottom-left corner, label above (4 lines)    |

- **Main route:** Boston Logan, I-95 North past Portland to Gray, ME-26 North to Norway, on to the Inne.
- **Southern route:** starts in New Haven so it always runs off the bottom-left edge, then I-84 through Hartford,
  I-290 through Worcester, I-495, and stops where it joins I-95 (Salisbury, MA).
- Pins sit just off the line (`--map-route-clearance`, 12px), never on it.
- On phones Portland's label moves to the left of the line, so every label is on the inland side and the map can
  zoom in further. Icons keep their order (train, then plane) whichever side the label is on.

## Once you're there

| Place              | Icon | Label |
| ------------------ | ---- | ----- |
| The Waterford Inne | star | right |
| Oxbow Beer Garden  | pin  | left  |
| Hampton Inn        | pin  | below |

Icons are centered on their points. Hampton Inn and Oxbow are nudged 12px apart so their icons don't overlap on
phones.

## Look

- **Icons:** `assets/icons/updated/jt-<icon>-outlined.svg`, inlined by the script so CSS can color the two shapes:
  glyph in `--map-ink`, outline in `--map-paper`. Light: sapphire on white. Dark: white on sapphire. Icons fit a
  24px square.
- **Labels:** the same ink and paper; single-line labels are 24px tall. 4px between icons, and between icons and
  their label.
- **Routes:** `--map-route`, set per scheme (sapphire-600 in light, sapphire-300 in dark), 4px.
- **Tiles:** Esri World Light Gray Canvas and World Dark Gray Canvas, switched with `prefers-color-scheme`. No API
  key. (CARTO needs a key for raster tiles; Stadia needs an account; OpenStreetMap's tiles were too busy.) A
  sapphire layer over the tiles (`mix-blend-mode: color`) tints them toward `--map-tint`;
  `--map-tint-strength` sets how much, per scheme.
- **Tabs** (toggle map only): small rectangular tabs on the map's top-left corner.
- **Credit:** "Leaflet | Tiles © Esri …" is the figure's caption, below the map.

## Interaction

### Mode toggle (`mode="toggle"`, Getting There desktop only)

- **Automatic switching:** the map follows the reader. Above "Where to stay" it shows routes; from "Where to stay"
  down it shows the local view.
- **User override:** once the reader picks a tab, automatic switching stops for the rest of the visit.
- **Animation:** smooth zoom (fly to the new view) over 0.8s. The outgoing view's routes, pins and labels fade out
  at once; the incoming view's fade in after `--map-fade-in-delay` (500ms), as the zoom settles. Nothing carries
  over between views: the map tiles give the continuity.
- **Reduced motion:** views switch without the zoom or the fades.

### Fitting a view

The script finds the closest zoom at which every pin (icons and label) fits inside the map with 24px to spare, and
centers on them. Labels don't shrink as the map zooms out, so when they're too wide for the map it accepts 8px
before zooming out further. In the routes view on narrow maps, the fit slides right (as far as the room on the right
allows) to clear the drivers-from-the-south pin.

### Without JavaScript

Maps are hidden and the page falls back to the single text column.

## Implementation

**Plain JavaScript + Leaflet, no React.** The React bundle is the venues app; the content pages use small vanilla
scripts.

- `_includes/travel-map.html`: the map figure (tabs, frame, caption). Params: `mode` (`routes` | `local` |
  `toggle`), `sticky`, `show` (`narrow` | `wide`), `local_from` (toggle maps).
- `assets/js/travel-map.js`: builds every `[data-travel-map]` with Leaflet. Only maps that are visible get built; a
  map hidden at the current width is built when it first appears.
- `assets/lib/leaflet/`: Leaflet 1.9.4, self-hosted. Loaded only on pages that contain a map.
- `_data/travel_map.yml`: labels, icons, label sides, coordinates and the route definitions.
- `_data/travel_routes.json`: route geometry, generated by `ruby scripts/fetch-travel-routes.rb` (OSRM, simplified,
  joined routes cut where they meet); never fetched at runtime. Rerun it after moving a point a route uses.
- `assets/data/travel-map.json`: built by Jekyll from the two data files; the script fetches it once per page.
- Styles: `components.css` (Map split, Travel map) and the travel map tokens in `tokens.css`.

## Page locations

### Getting There (`/getting-there/`)

- **Wide screens (960px and up):** `.map-split`. One sticky map in the left half with the tabs, from "Arriving by
  air" through "Where to stay". It sits below the 50px reserved for the coming sticky nav (`--nav-height`), with
  80px (`--map-pad`) around the map; the text column has 80px side padding.
- **Narrow screens:** two inline maps, no tabs: routes (3:5) before "Arriving by air", local (3:2) before "Where to
  stay".

### The Wedding (`/the-wedding/`)

- **All screens:** one inline local map (3:2), after the intro paragraphs. No side-by-side layout.

## Include usage

```liquid
{% include travel-map.html mode="toggle" sticky=true show="wide" local_from="where-to-stay" %}  <!-- Getting There, wide -->
{% include travel-map.html mode="routes" show="narrow" %}                                      <!-- Getting There, narrow -->
{% include travel-map.html mode="local" show="narrow" %}                                       <!-- Getting There, narrow -->
{% include travel-map.html mode="local" %}                                                     <!-- The Wedding -->
```

## Open items

- The page copy still describes driving "from Portsmouth"; the map's southern route starts in New Haven.
- `--nav-height` reserves space for a sticky site nav that doesn't exist yet.
