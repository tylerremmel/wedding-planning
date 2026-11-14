/* Travel map (Getting there, The wedding). Markup: _includes/travel-map.html. Content: _data/travel_map.yml,
   served with the route lines as assets/data/travel-map.json.
   - data-travel-map="routes" | "local" | "toggle". A toggle map shows tabs and follows the reader: routes above
     the heading named by data-local-from, the local view from there down, until the reader picks a tab.
   - A map is built the first time it has a size, so maps hidden at the current width (show="narrow"/"wide")
     cost nothing until they appear.
   - Opening an origin's popover dims the other routes and origins; closing it restores them.
   - Colors, sizes, dimming and the icon scale are all CSS (components.css), so they follow the color scheme. */
(function () {
  var maps = Array.prototype.slice.call(
    document.querySelectorAll("[data-travel-map]"),
  );
  if (!maps.length || !window.L) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var FLY_SECONDS = 0.8;
  var PAD = 32; /* px kept clear around the fitted points */
  var MAX_ZOOM_OUT = 2; /* zoom levels the fit may back out so labels fit */
  var EDGE = 8; /* px a popover keeps from the map's edge when it pans into view */

  var dataRequest;
  function loadData(url) {
    if (!dataRequest) {
      dataRequest = fetch(url).then(function (res) {
        if (!res.ok) throw new Error("travel map data: " + res.status);
        return res.json();
      });
    }
    return dataRequest;
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

  /* A marker is a zero-size point; the badge (and its label) are centered on it in CSS. */
  function markerIcon(iconBase, kind, item) {
    var nudge = item.nudge || 0;
    var side = nudge < 0 || item.side === "left" ? "left" : "right";
    var label = item.label
      ? '<span class="travel-map__label label s-075 travel-map__label--' +
        side +
        '" aria-hidden="true">' +
        escapeHtml(item.label) +
        "</span>"
      : "";
    return L.divIcon({
      className: "travel-map__marker travel-map__marker--" + kind,
      iconSize: null,
      html:
        '<span class="travel-map__pin" style="--nudge: ' +
        nudge +
        'px">' +
        '<span class="travel-map__badge"><span class="travel-map__glyph" style="--icon: url(' +
        iconBase +
        "jt-" +
        item.icon +
        '.svg)"></span></span>' +
        label +
        "</span>",
    });
  }

  function popupHtml(item) {
    return (
      '<p class="travel-map__popup-name label s-100">' +
      escapeHtml(item.name) +
      "</p>" +
      (item.address
        ? '<p class="travel-map__popup-address meta s-087">' +
          escapeHtml(item.address) +
          "</p>"
        : "") +
      '<div class="travel-map__popup-details">' +
      item.html +
      "</div>"
    );
  }

  function addMarker(group, iconBase, kind, item) {
    var marker = L.marker(item.latlng, {
      icon: markerIcon(iconBase, kind, item),
      keyboard: true,
      riseOnHover: true,
    });
    marker.bindPopup(popupHtml(item), {
      className: "travel-map__popup",
      /* Leaflet sizes a popup by its unwrapped text, which the site's text-wrap rules defeat; set the range. */
      minWidth: 220,
      maxWidth: 280,
      offset: L.point(item.nudge || 0, -14),
      autoPanPadding: L.point(EDGE, EDGE),
    });
    marker.nudge = item.nudge || 0;
    marker.on("add", function () {
      var el = marker.getElement();
      el.setAttribute("aria-label", item.name);
    });
    marker.on("popupopen", function () {
      marker.getElement().classList.add("is-active");
    });
    marker.on("popupclose", function () {
      var el = marker.getElement();
      if (el) el.classList.remove("is-active");
    });
    group.addLayer(marker);
    return marker;
  }

  function build(el, data) {
    var canvas = el.querySelector(".travel-map__canvas");
    var iconBase = el.getAttribute("data-icons");
    var initialMode = el.getAttribute("data-travel-map");
    var tabs = el.querySelector(".travel-map__tabs");

    /* The map is a picture, not a navigation tool: no panning or zooming by the reader. Only the script moves
       it (fitting a view, and briefly panning so an open popover fits; see popupclose below). */
    var map = L.map(canvas, {
      zoomSnap: 0.25,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(
      '<a href="https://leafletjs.com">Leaflet</a>',
    );
    var tiles = L.tileLayer(tileUrl(), {
      maxZoom: 16,
      attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    }).addTo(map);
    darkScheme.addEventListener("change", function () {
      tiles.setUrl(tileUrl());
    });

    /* A popover never gets taller than the map; longer text scrolls inside it. */
    map.on("popupopen", function (e) {
      var max = Math.max(120, canvas.offsetHeight - 4 * EDGE - 24);
      if (e.popup.options.maxHeight !== max) {
        e.popup.options.maxHeight = max;
        e.popup.update();
      }
    });

    var destination = data.places.filter(function (p) {
      return p.id === data.destination;
    })[0];
    /* A starting view, so markers are in the page (and measurable) when the first fit runs. */
    map.setView(destination.latlng, 8, { animate: false });

    /* ---- Routes view ---- */
    var routesGroup = L.featureGroup();
    var routeLines = {};
    function line(latlngs, cls) {
      return L.polyline(latlngs, {
        className: cls,
        interactive: false,
        smoothFactor: 1.5,
      });
    }
    /* Through routes (no icon at the start) go at the bottom; then the origins' routes in reverse of their
       first appearance in the origins list, so the first route listed ends up on top where routes overlap.
       The open popover's route is brought to the front (see highlight). */
    var routeNames = [];
    data.origins.forEach(function (o) {
      if (routeNames.indexOf(o.route) < 0) routeNames.push(o.route);
    });
    routeNames = routeNames.concat(data.through_routes || []).reverse();
    routeNames.forEach(function (name) {
      routesGroup.addLayer(line(data.routes[name], "travel-map__casing"));
      routeLines[name] = line(
        data.routes[name],
        "travel-map__route travel-map__route--" + name,
      );
      routesGroup.addLayer(routeLines[name]);
    });
    var originMarkers = data.origins.map(function (o) {
      var m = addMarker(routesGroup, iconBase, "origin", o);
      m.route = o.route;
      return m;
    });
    addMarker(routesGroup, iconBase, "destination", destination);

    /* Dim everything that isn't the open origin's route. */
    function highlight(route) {
      Object.keys(routeLines).forEach(function (name) {
        var l = routeLines[name];
        var path = l.getElement();
        if (path) path.classList.toggle("is-dimmed", !!route && name !== route);
        if (route && name === route) l.bringToFront();
      });
      originMarkers.forEach(function (m) {
        var mel = m.getElement();
        if (mel)
          mel.classList.toggle("is-dimmed", !!route && m.route !== route);
      });
    }
    originMarkers.forEach(function (m) {
      m.on("popupopen", function () {
        highlight(m.route);
      });
      m.on("popupclose", function () {
        highlight(null);
      });
    });

    /* ---- Local view ---- */
    var localGroup = L.featureGroup();
    data.places.forEach(function (p) {
      addMarker(
        localGroup,
        iconBase,
        p.id === data.destination ? "destination" : "place",
        p,
      );
    });

    var views = {
      routes: {
        group: routesGroup,
        /* Every origin and the destination. Through routes (Hartford) start outside this and run off the
           edge of the map. */
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

    /* Fit a view: find the closest zoom at which every icon and its label fits inside the map, and center on
       that whole box (icons plus labels). Labels sit beside icons, so plain bounds fitting can't allow for them. */
    function extent(group, zoom) {
      var box = null;
      group.eachLayer(function (layer) {
        if (!layer.getLatLng) return;
        var markerEl = layer.getElement();
        var badge = markerEl && markerEl.querySelector(".travel-map__badge");
        if (!badge) return;
        var pt = map.project(layer.getLatLng(), zoom);
        var x = pt.x + (layer.nudge || 0);
        var r = badge.offsetWidth / 2;
        var left = x - r;
        var right = x + r;
        var label = markerEl.querySelector(".travel-map__label");
        if (label) {
          if (label.classList.contains("travel-map__label--left"))
            left -= label.offsetWidth + 6;
          else right += label.offsetWidth + 6;
        }
        var b = L.bounds(L.point(left, pt.y - r), L.point(right, pt.y + r));
        box = box ? box.extend(b) : b;
      });
      return box;
    }
    function target(view) {
      var top = tabs ? tabs.offsetHeight : 0;
      var size = map.getSize();
      var room = L.point(size.x - 2 * PAD, size.y - top - 2 * PAD);
      var zoom = map.getBoundsZoom(
        view.bounds,
        false,
        L.point(2 * PAD, 2 * PAD + top),
      );
      var floor = zoom - MAX_ZOOM_OUT;
      var box = extent(view.group, zoom);
      while (box && zoom > floor) {
        var s = box.getSize();
        if (s.x <= room.x && s.y <= room.y) break;
        zoom -= map.options.zoomSnap;
        box = extent(view.group, zoom);
      }
      if (!box) return { center: view.bounds.getCenter(), zoom: zoom };
      /* The box's center goes to the middle of the space below the tabs. */
      var mid = box.getCenter().subtract(L.point(0, top / 2));
      return { center: map.unproject(mid, zoom), zoom: zoom };
    }
    function fit(animate) {
      var t = target(views[mode]);
      if (animate && !reduceMotion.matches) {
        map.flyTo(t.center, t.zoom, { duration: FLY_SECONDS });
      } else {
        map.setView(t.center, t.zoom, { animate: false });
      }
    }
    /* A popover may pan the map to fit; closing it returns to the fitted view. */
    var switching = false;
    map.on("popupclose", function () {
      if (!switching) fit(true);
    });

    function setMode(next, animate) {
      if (next === mode) return;
      switching = true;
      map.closePopup();
      switching = false;
      if (mode) map.removeLayer(views[mode].group);
      mode = next;
      map.addLayer(views[mode].group);
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
      loadData(el.getAttribute("data-src"))
        .then(function (data) {
          instance = build(el, data);
          el.classList.add("is-ready");
        })
        .catch(function (err) {
          pending = false;
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
