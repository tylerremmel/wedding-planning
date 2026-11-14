/* Travel map (Getting there, The wedding). Markup: _includes/travel-map.html. Content: _data/travel_map.yml,
   served with the route lines as assets/data/travel-map.json.
   - data-travel-map="routes" | "local" | "toggle". A toggle map shows tabs and follows the reader: routes above
     the heading named by data-local-from, the local view from there down, until the reader picks a tab.
   - The map is a static picture. Nothing on it responds to the pointer or keyboard; only the script moves it,
     to fit each view (with a zoom animation when a toggle map switches views).
   - A map is built the first time it has a size, so maps hidden at the current width (show="narrow"/"wide")
     cost nothing until they appear.
   - Icons are inlined so CSS can color their glyph and outline separately (components.css). */
(function () {
  var maps = Array.prototype.slice.call(
    document.querySelectorAll("[data-travel-map]"),
  );
  if (!maps.length || !window.L) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var FLY_SECONDS = 0.8;
  var PAD = 24; /* px kept clear between the fitted icons and labels and the map's edge */
  var MIN_PAD = 8; /* the least clearance accepted, before zooming out further, when the labels are too wide */
  var MAX_ZOOM_OUT = 2; /* zoom levels the fit may back out so labels fit */

  /* The icon files have a white outline shape (Illustrator's class "cls-1") and black glyph shapes (no class).
     Keep only the shapes, tagged so CSS can color them, and drop the file's <style>, ids and fills. */
  function cleanIcon(text) {
    var src = new DOMParser().parseFromString(
      text,
      "image/svg+xml",
    ).documentElement;
    var serializer = new XMLSerializer();
    var shapes = Array.prototype.map.call(
      src.querySelectorAll("path, circle, ellipse, rect, polygon"),
      function (shape) {
        var outline = shape.hasAttribute("class");
        ["id", "class", "style", "fill", "data-name"].forEach(function (a) {
          shape.removeAttribute(a);
        });
        shape.setAttribute(
          "class",
          outline ? "travel-map__icon-outline" : "travel-map__icon-glyph",
        );
        return serializer.serializeToString(shape);
      },
    );
    /* Wrapped in a span: SVG elements have no offsetLeft/offsetWidth, which the map's fit measures. */
    return (
      '<span class="travel-map__icon"><svg viewBox="' +
      src.getAttribute("viewBox") +
      '" aria-hidden="true" focusable="false">' +
      shapes.join("") +
      "</svg></span>"
    );
  }

  /* The data, then every icon it names. Fetched once per page, however many maps there are. */
  var request;
  function load(el) {
    if (request) return request;
    var iconBase = el.getAttribute("data-icons");
    request = fetch(el.getAttribute("data-src"))
      .then(function (res) {
        if (!res.ok) throw new Error("travel map data: " + res.status);
        return res.json();
      })
      .then(function (data) {
        var names = [data.south.icon];
        data.origins.concat(data.places).forEach(function (item) {
          item.icons.forEach(function (n) {
            if (names.indexOf(n) < 0) names.push(n);
          });
        });
        return Promise.all(
          names.map(function (n) {
            return fetch(iconBase + "jt-" + n + "-outlined.svg").then(
              function (res) {
                if (!res.ok) throw new Error("travel map icon: " + n);
                return res.text();
              },
            );
          }),
        ).then(function (svgs) {
          data.icons = {};
          names.forEach(function (n, i) {
            data.icons[n] = cleanIcon(svgs[i]);
          });
          return data;
        });
      });
    return request;
  }

  /* Esri's World Gray Canvas basemaps: plain gray land and water with almost no labels, so the routes and
     icons carry the map. Light or dark follows the color scheme. No API key needed. */
  var darkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  function tileUrl() {
    return (
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_" +
      (darkScheme.matches ? "Dark" : "Light") +
      "_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    );
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function labelHtml(text) {
    return (
      '<span class="travel-map__label meta s-075">' +
      escapeHtml(text) +
      "</span>"
    );
  }

  /* Where a routes-view pin hangs: on the route line beside the point, so the pin can sit clear of the line.
     A route that starts or ends at the point (Boston, the Inne) gives its end; otherwise it's where the nearest
     line crosses the point's latitude (Portland). With no line nearby it's the point itself. */
  var NEAR_END = 0.02; /* degrees: a route end this close counts as starting or ending at the point */
  var NEAR_LINE = 0.15; /* degrees: farther than this from every line, the pin hangs on its point */
  function besideRoute(latlng, routes) {
    var lat = latlng[0];
    var lines = Object.keys(routes).map(function (name) {
      return routes[name];
    });
    var best = null;
    var bestDist = Infinity;
    lines.forEach(function (pts) {
      [pts[0], pts[pts.length - 1]].forEach(function (end) {
        var d = Math.max(Math.abs(end[0] - lat), Math.abs(end[1] - latlng[1]));
        if (d <= NEAR_END && d < bestDist) {
          best = end;
          bestDist = d;
        }
      });
    });
    if (best) return best;
    lines.forEach(function (pts) {
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1];
        var b = pts[i];
        if ((a[0] - lat) * (b[0] - lat) > 0 || a[0] === b[0]) continue;
        var lng = a[1] + ((lat - a[0]) / (b[0] - a[0])) * (b[1] - a[1]);
        var d = Math.abs(lng - latlng[1]);
        if (d <= NEAR_LINE && d < bestDist) {
          best = [lat, lng];
          bestDist = d;
        }
      }
    });
    return best || latlng;
  }

  /* A marker is a zero-size point. Its pin (icons, then the label) is placed in CSS. In the local view the icon is
     centered on the point, with the label beside, above or below it; in the routes view (`beside`) the pin starts
     a little way off the route line, on the label's side. `view` is the view it belongs to, for fading between
     views. */
  function addMarker(group, icons, item, view, beside) {
    var side =
      ["left", "top", "bottom"].indexOf(item.side) >= 0 ? item.side : "right";
    var glyphs = item.icons
      .map(function (n) {
        return icons[n];
      })
      .join("");
    var label = item.label ? labelHtml(item.label) : "";
    var marker = L.marker(item.latlng, {
      interactive: false,
      keyboard: false,
      icon: L.divIcon({
        className: "travel-map__marker travel-map__view-" + view,
        iconSize: null,
        html:
          '<span class="travel-map__pin travel-map__pin--' +
          side +
          (beside ? " travel-map__pin--beside" : "") +
          '" style="--nudge: ' +
          (item.nudge || 0) +
          'px">' +
          /* A label on the left comes first, so the icons keep their order (Portland: train, then plane). */
          (side === "left" ? label + glyphs : glyphs + label) +
          "</span>",
      }),
    });
    group.addLayer(marker);
  }

  function build(el, data) {
    var frame = el.querySelector(".travel-map__frame");
    var canvas = el.querySelector(".travel-map__canvas");
    var initialMode = el.getAttribute("data-travel-map");
    var tabs = el.querySelector(".travel-map__tabs");
    var narrow = el.classList.contains("travel-map--narrow");

    /* The map is a picture, not a navigation tool: no panning or zooming by the reader. The attribution is the
       figure's caption, outside the map. */
    var map = L.map(canvas, {
      zoomSnap: 0.25,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });
    var tiles = L.tileLayer(tileUrl(), { maxZoom: 16 }).addTo(map);
    darkScheme.addEventListener("change", function () {
      tiles.setUrl(tileUrl());
    });

    /* Tint the gray tiles sapphire: a layer over them in the tile pane, blended in CSS (components.css). It sits
       in the tile pane so the routes and pins above stay untouched, and it's kept over the visible area as the
       map moves. */
    var tint = L.DomUtil.create(
      "div",
      "travel-map__tint",
      map.getPane("tilePane"),
    );
    function placeTint() {
      var size = map.getSize();
      L.DomUtil.setPosition(tint, map.containerPointToLayerPoint([0, 0]));
      tint.style.width = size.x + "px";
      tint.style.height = size.y + "px";
    }
    map.on("move resize viewreset zoomend", placeTint);

    var destination = data.places.filter(function (p) {
      return p.id === data.destination;
    })[0];
    /* A starting view, so markers are in the page (and measurable) when the first fit runs. */
    map.setView(destination.latlng, 8, { animate: false });
    placeTint();

    /* The views this map can show. Each one's layers stay on the map; switching views fades one set out and
       the other in (components.css), instead of adding and removing them. */
    var showsRoutes = initialMode !== "local";
    var showsLocal = initialMode !== "routes";
    el.setAttribute("data-view", showsRoutes ? "routes" : "local");

    /* ---- Routes view ---- */
    var routesGroup = L.featureGroup();
    var corner = null;
    if (showsRoutes) {
      Object.keys(data.routes).forEach(function (name) {
        routesGroup.addLayer(
          L.polyline(data.routes[name], {
            className: "travel-map__route travel-map__view-routes",
            interactive: false,
            smoothFactor: 1.5,
          }),
        );
      });
      data.origins.concat([destination]).forEach(function (o) {
        var beside = Object.assign({}, o, {
          latlng: besideRoute(o.latlng, data.routes),
          side: (narrow && o.routes_side_narrow) || o.routes_side || o.side,
        });
        addMarker(routesGroup, data.icons, beside, "routes", true);
      });
      routesGroup.addTo(map);

      /* Drivers from the south: pinned to the map's corner rather than a point, since their line runs off the
         map. */
      corner = document.createElement("div");
      corner.className = "travel-map__corner travel-map__view-routes";
      corner.innerHTML =
        labelHtml(data.south.label) + data.icons[data.south.icon];
      frame.appendChild(corner);
    }

    /* ---- Local view ---- */
    var localGroup = L.featureGroup();
    if (showsLocal) {
      data.places.forEach(function (p) {
        addMarker(localGroup, data.icons, p, "local", false);
      });
      localGroup.addTo(map);
    }

    var views = {
      routes: {
        group: routesGroup,
        /* Every origin and the destination. The southern line starts outside this and runs off the map. */
        bounds: L.latLngBounds(
          data.origins
            .map(function (o) {
              return o.latlng;
            })
            .concat([destination.latlng]),
        ),
      },
      local: {
        group: localGroup,
        bounds: L.latLngBounds(
          data.places.map(function (p) {
            return p.latlng;
          }),
        ),
      },
    };

    var mode = null;

    /* Fit a view: find the closest zoom at which every pin (icons and label) fits inside the map, and center on
       that whole box. Labels sit beside icons, so plain bounds fitting can't allow for them. A pin's offset from
       its point is the same at every zoom, so it's measured once per fit from the page: from the pin's icons
       and label, since a pin with its label above or below is zero width. (Offsets, not client rects, so a
       zoom animation in progress doesn't skew it.) */
    function pinBoxes(group) {
      var boxes = [];
      group.eachLayer(function (layer) {
        if (!layer.getLatLng) return;
        var markerEl = layer.getElement();
        var pin = markerEl && markerEl.querySelector(".travel-map__pin");
        if (!pin) return;
        var min = null;
        var max = null;
        Array.prototype.forEach.call(pin.children, function (child) {
          var a = L.point(
            pin.offsetLeft + child.offsetLeft,
            pin.offsetTop + child.offsetTop,
          );
          var b = a.add(L.point(child.offsetWidth, child.offsetHeight));
          min = min ? L.point(Math.min(min.x, a.x), Math.min(min.y, a.y)) : a;
          max = max ? L.point(Math.max(max.x, b.x), Math.max(max.y, b.y)) : b;
        });
        if (min) boxes.push({ latlng: layer.getLatLng(), min: min, max: max });
      });
      return boxes;
    }
    function extent(boxes, zoom) {
      var box = null;
      boxes.forEach(function (b) {
        var pt = map.project(b.latlng, zoom);
        var bounds = L.bounds(pt.add(b.min), pt.add(b.max));
        box = box ? box.extend(bounds) : bounds;
      });
      return box;
    }
    function target(view) {
      var size = map.getSize();
      var zoom = map.getBoundsZoom(
        view.bounds,
        false,
        L.point(2 * PAD, 2 * PAD),
      );
      var floor = zoom - MAX_ZOOM_OUT;
      var boxes = pinBoxes(view.group);
      if (!boxes.length) return { center: view.bounds.getCenter(), zoom: zoom };
      /* The closest zoom, from the points' own fit down to the floor, at which the pins fit with `pad` to spare.
         Labels don't shrink as the map zooms out, so on a narrow map zooming out barely helps: rather than back
         out to the floor, accept the smaller MIN_PAD clearance first. */
      function closest(pad) {
        for (var z = zoom; z >= floor; z -= map.options.zoomSnap) {
          var s = extent(boxes, z).getSize();
          if (s.x <= size.x - 2 * pad && s.y <= size.y - 2 * pad) return z;
        }
        return null;
      }
      var best = closest(PAD);
      if (best === null) best = closest(MIN_PAD);
      zoom = best === null ? floor : best;
      var box = extent(boxes, zoom);
      var center = box.getCenter();
      /* Routes view: slide right, as far as the spare room on the right allows, to clear the drivers-from-the-
         south pin in the bottom-left corner. Only narrow maps need it; wide ones already have the room. */
      if (view === views.routes && corner) {
        var half = box.getSize().x / 2;
        var left = size.x / 2 - half; /* the box's left edge, centered */
        var need = corner.offsetLeft + corner.offsetWidth + PAD - left;
        var spare = left - PAD;
        var shift = Math.max(0, Math.min(need, spare));
        center = center.subtract(L.point(shift, 0));
      }
      return { center: map.unproject(center, zoom), zoom: zoom };
    }
    function fit(animate) {
      var t = target(views[mode]);
      if (animate && !reduceMotion.matches) {
        map.flyTo(t.center, t.zoom, { duration: FLY_SECONDS });
      } else {
        map.setView(t.center, t.zoom, { animate: false });
      }
    }

    function setMode(next, animate) {
      if (next === mode) return;
      mode = next;
      el.setAttribute("data-view", mode);
      if (tabs) {
        var input = tabs.querySelector('input[value="' + mode + '"]');
        if (input) input.checked = true;
      }
      fit(animate);
    }

    setMode(initialMode === "local" ? "local" : "routes", false);

    /* ---- Tabs and following the reader (toggle maps) ---- */
    if (tabs) {
      var readerChose = false;
      tabs.addEventListener("change", function (e) {
        readerChose = true; /* from now on the reader's choice wins over scrolling */
        setMode(e.target.value, true);
      });

      var trigger = document.getElementById(el.getAttribute("data-local-from"));
      if (trigger && "IntersectionObserver" in window) {
        /* The local view starts once the trigger heading passes the middle of the screen. Every block in
           the text column is observed against that middle line, so a jump (a link, the End key) that skips
           the heading itself still re-checks the position. */
        var follow = function () {
          if (readerChose) return;
          var local =
            trigger.getBoundingClientRect().top < window.innerHeight / 2;
          setMode(local ? "local" : "routes", true);
        };
        var observer = new IntersectionObserver(follow, {
          rootMargin: "-50% 0px -50% 0px",
        });
        Array.prototype.forEach.call(
          trigger.parentElement.children,
          function (c) {
            observer.observe(c);
          },
        );
        follow();
      }
    }

    return {
      resize: function () {
        map.invalidateSize({ pan: false });
        fit(false);
      },
    };
  }

  /* Build each map once it has a size; refit it when its size changes (rotation, crossing the breakpoint). */
  maps.forEach(function (el) {
    var instance = null;
    var pending = false;
    var canvas = el.querySelector(".travel-map__canvas");
    function check() {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      if (instance) {
        instance.resize();
        return;
      }
      if (pending) return;
      pending = true;
      load(el)
        .then(function (data) {
          instance = build(el, data);
          el.classList.add("is-ready");
        })
        .catch(function (err) {
          pending = false;
          request = null;
          el.classList.add("is-failed");
          if (window.console) console.error(err);
        });
    }
    if ("ResizeObserver" in window) {
      new ResizeObserver(check).observe(canvas);
    } else {
      window.addEventListener("resize", check);
    }
    check();
  });
})();
