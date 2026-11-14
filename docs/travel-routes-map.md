# Travel Routes Map for Getting-There Page

## Overview

Interactive map with two modes:

- **Traveling there:** driving routes from the guest entry points to Waterford, Maine
- **Once you're there:** zoomed-in view of the area with the key points of interest

## Traveling there: route origins

| Origin                                   | Icon       | Route                                            |
| ---------------------------------------- | ---------- | ------------------------------------------------ |
| Portland International Jetport (PWM)     | `jt-plane` | Portland route (shared)                          |
| Portland Transportation Center (PTC)     | `jt-train` | Portland route (shared); icon sits next to PWM's |
| Boston Logan International Airport (BOS) | `jt-plane` | Boston route                                     |

- PWM and PTC are about 2 miles apart, so they share one route line. Their icons sit side by side and each icon opens its own popover.
- **Drivers from the south**: a route line with no icon, starting in Hartford, CT and following I-84, I-290 through Worcester, I-495 and I-95 (a "through route" in the data). It starts outside the map's frame and runs in from the edge. It overlaps the Boston route along I-95; that's fine.
- No road shields on the map (the `jt-i95`, `jt-me-26` etc. icons are unused for now).

**Destination**: The Waterford Inne, 258 Chadbourne Road, Waterford, Maine 04088 (`jt-star`)

## Once you're there: points of interest

| Place                                                        | Icon      | Popover timing                                       |
| ------------------------------------------------------------ | --------- | ---------------------------------------------------- |
| The Waterford Inne, 258 Chadbourne Road, Waterford, ME 04088 | `jt-star` | Saturday ceremony and reception; Sunday brunch (TBA) |
| Hampton Inn By Hilton, 151 Main St, Oxford, ME 04270         | `jt-pin`  | Recommended lodging                                  |
| Oxbow Beer Garden, 420 Main St, Oxford, ME 04270             | `jt-pin`  | Friday welcome event (TBA)                           |

Unset times show a `TBA` marker, matching The Wedding page.

## Implementation approach

**Plain JavaScript + Leaflet, no React.** The React bundle is the venues app (~620 KB with MUI); the content pages
use small vanilla scripts. The map is:

- `_includes/travel-map.html`: the map container. Params: `mode` (`routes` | `local` | `toggle`), `sticky`, `show` (`narrow` | `wide`, to limit an instance to one side of the breakpoint).
- `assets/js/travel-map.js`: finds every `[data-travel-map]` and builds it with Leaflet. Only maps that are visible get built; a map hidden at the current width is built when it first appears.
- `assets/lib/leaflet/`: Leaflet 1.9.4, self-hosted. Loaded only on pages that contain a map.
- `_data/travel_map.yml`: names, labels, addresses, popover text, coordinates and through routes. Popover text is markdown and goes through `md.html`, so `TK` is highlighted.
- `_data/travel_routes.json`: route geometry. Generated once by `scripts/fetch-travel-routes.rb` (OSRM, simplified); never fetched at runtime.
- `assets/data/travel-map.json`: built by Jekyll from the two data files; the script fetches it once per page.

**Distances and times in popovers come from the page copy**, not from routing results, so the map never disagrees
with the text beside it. Where the copy doesn't give a figure, the popover says `TK`.

**Tiles**: Esri World Light Gray Canvas and World Dark Gray Canvas (base layers only, almost no labels), switched
with `prefers-color-scheme`. No API key. (CARTO now requires a key for raster tiles; Stadia needs an account with
the domain registered; OpenStreetMap's standard tiles were too busy.) Route lines and markers are styled in CSS from
tokens, so they follow the scheme too.

## Interaction design

### Mode toggle (`mode="toggle"`, Getting There desktop only)

- **UI pattern**: radio group at the top of the map, with trapezoidal tabs matching the header tab.
- **Automatic switching**: the map follows the reader. Above "Where to stay" it shows routes; from "Where to stay" down it shows the local view. Scroll position is tracked with an IntersectionObserver.
- **User override**: once the reader picks a tab, automatic switching stops for the rest of the visit to the page.
- **Animation**: smooth zoom (fly to bounds) over 0.8s.

### Traveling there mode

- **Default state**: all routes and origin icons visible, each origin labeled.
- **Popovers**: clicking (or tapping, or pressing Enter on) an origin icon opens its popover with distance and drive time.
- **Route highlighting** while a popover is open: the selected route stays at full opacity; other routes and origin icons fade to 0.3. Closing the popover restores everything.
- **Icon scale**: icons scale up 50% on hover, focus and while their popover is open (0.3s ease-in-out). On touch screens, tapping opens the popover, which applies the scale.

### Once you're there mode

- **Default state**: all 3 places visible with labels.
- **Popovers**: address and event timing; no distances.
- **Icon scale**: same as travel mode.

### Reduced motion

With `prefers-reduced-motion: reduce`, mode switches jump without the zoom animation and icons change size without
the scale animation.

## Design considerations

- **Map bounds**: fit the current mode's icons and their labels (routes: the origins and the Inne; the Hartford line runs off the edge). The fit centers on icons plus labels and backs out at most 2 zoom levels to make room for labels.
- **Styling**: monochromatic sapphire routes from `tokens.css`.
- **Dimmed state opacity**: 0.3.
- **No panning or zooming**: the map isn't for navigation, so readers can't drag, zoom or scroll it (no zoom buttons, pinch, scroll wheel, double-click or keyboard panning). It never traps page scrolling. Only the script moves it: fitting each view, and panning briefly so an open popover fits, returning to the fitted view when the popover closes.
- **Without JavaScript**: maps are hidden and the page falls back to the single text column.

## Page locations

The side-by-side layout is a shared block (`.map-split`) in `components.css`, used by both pages. It splits at
960px; narrower screens stack with the map above the text.

### Getting There (`/getting-there/`)

- **Wide screens**: one sticky map in the left half, from "Arriving by air" through "Where to stay", with the toggle. It stays pinned only while those sections are on screen.
- **Narrow screens**: two inline maps, no toggle: routes before "Arriving by air", local before "Where to stay".

### The Wedding (`/the-wedding/`)

- **All screens**: local view only, no toggle.
- **Wide screens**: map on the left, text on the right, not sticky. Placed after the intro paragraphs, before Schedule.
- **Narrow screens**: map stacked above the text.

## Include usage

```liquid
{% include travel-map.html mode="toggle" sticky=true show="wide" %}   <!-- Getting There, wide -->
{% include travel-map.html mode="routes" show="narrow" %}             <!-- Getting There, narrow -->
{% include travel-map.html mode="local" show="narrow" %}              <!-- Getting There, narrow -->
{% include travel-map.html mode="local" %}                            <!-- The Wedding -->
```

## Open items

- Popover distance/time for PTC isn't in the page copy yet (`TK`).
- The page copy still describes driving "from Portsmouth"; the map's southern route now starts in Hartford.
- Phone-width local map: the Oxbow and Inne labels together are wider than the map, so it zooms out further than ideal.
- Shield positions are a first pass; adjust in `_data/travel_map.yml`.
- Visual review of icon sizes, label placement and tab styling in Chrome and WebKit.
