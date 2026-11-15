/* Top bar.
   - Hidden at the top of the page (the header has its own nav there); once the hero image has scrolled out of
     view, its background pulls down and its links fade in (see .site-bar in components.css).
   - On narrow screens the current page is a disclosure button: Escape, an outside click, or choosing a link
     closes it.
   - On story pages the bar has a second set of links, the page's sections. Once the first divider
     ([data-sticky-sentinel]) has scrolled out of view above the viewport the bar shows the sections instead of
     the pages, with scroll-spy; scrolling back above it restores the pages. The section logic (jump to a
     section's top, hash handling, scroll-spy) came from the old sticky section nav. */
(function () {
  var nav = document.querySelector("[data-top-bar]");
  var toggle = nav && nav.querySelector(".site-bar__toggle");
  if (!toggle) return;
  var label = toggle.querySelector("span");

  /* ---- Reveal once the hero has scrolled away ---- */
  /* Pages with no hero (404, venues) use the header instead. */
  var topper =
    document.querySelector(".hero") || document.querySelector(".site-header");
  function show(on) {
    if (nav.classList.contains("is-visible") === on) return;
    nav.classList.toggle("is-visible", on);
    if (!on) setOpen(false);
  }
  /* Shown only once the topper is gone off the TOP of the screen (not while it's still below the fold). */
  if (topper && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      show(!e.isIntersecting && e.boundingClientRect.bottom <= 0);
    }).observe(topper);
  } else {
    show(true);
  }

  /* ---- Dropdown disclosure (narrow screens) ---- */
  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) setOpen(false);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  /* ---- Story sections ---- */
  var items = Array.prototype.slice.call(
    nav.querySelectorAll("[data-section-link]"),
  );
  if (!items.length) return;

  var pagesLabel = label.textContent;
  var pagesControls = toggle.getAttribute("aria-controls");
  var sentinel = document.querySelector("[data-sticky-sentinel]");
  var tab = document.querySelector(".site-tab__link");

  /* A section starts at the block right after the nearest divider above its heading (its photo, for example);
     with no divider above, it starts at the heading itself. */
  function sectionStart(heading) {
    var p = heading.previousElementSibling;
    while (p) {
      if (p.classList.contains("divider"))
        return p.nextElementSibling || heading;
      if (p.tagName === "H2") break;
      p = p.previousElementSibling;
    }
    return heading;
  }
  var sections = items
    .map(function (li) {
      var heading = document.getElementById(
        li.getAttribute("data-section-link"),
      );
      return {
        li: li,
        link: li.querySelector("a"),
        label: li.textContent.trim(),
        heading: heading,
        start: heading ? sectionStart(heading) : null,
      };
    })
    .filter(function (s) {
      return s.heading;
    });
  if (!sections.length) return;

  /* Jump to the top of the section (the CSS scroll-margin leaves room for the bar). */
  function goTo(section, smooth) {
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.start.scrollIntoView({
      behavior: smooth && !reduce ? "smooth" : "auto",
      block: "start",
    });
  }
  sections.forEach(function (s) {
    s.link.addEventListener("click", function (e) {
      /* Leave ctrl/cmd/shift/middle clicks alone so "open in new tab" still works. */
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;
      e.preventDefault();
      goTo(s, true);
      /* Move focus to the heading so keyboard and screen reader users land in the section. */
      s.heading.setAttribute("tabindex", "-1");
      s.heading.focus({ preventScroll: true });
      if (window.history && history.pushState) {
        history.pushState(null, "", "#" + s.heading.id);
      }
    });
  });
  function sectionForHash() {
    return sections.filter(function (s) {
      return "#" + s.heading.id === window.location.hash;
    })[0];
  }
  if (window.location.hash) {
    var wanted = sectionForHash();
    if (wanted)
      window.requestAnimationFrame(function () {
        goTo(wanted, false);
      });
  }
  /* Back/forward between the hashes pushed above: land on that section. With no matching section
     (back to the page's original URL) the browser's own scroll restoration applies. */
  window.addEventListener("popstate", function () {
    var target = sectionForHash();
    if (target) goTo(target, false);
  });

  /* ---- Swap between the pages and the sections ---- */
  function setMode(mode) {
    if (nav.getAttribute("data-mode") === mode) return;
    nav.setAttribute("data-mode", mode);
    nav.classList.add("is-swapped");
    /* Both sets share is-open and the toggle's aria-expanded, so close the dropdown on every swap: it must
       never be left open showing the other set's links. */
    setOpen(false);
    toggle.setAttribute(
      "aria-controls",
      mode === "sections" ? "site-bar-sections" : pagesControls,
    );
    if (mode === "pages") label.textContent = pagesLabel;
  }

  /* ---- Scroll-spy (and the swap check, so a jump that skips the divider entirely is still caught) ---- */
  var ticking = false;
  function update() {
    ticking = false;
    setMode(
      sentinel && sentinel.getBoundingClientRect().bottom < 0
        ? "sections"
        : "pages",
    );
    var line = (tab ? tab.getBoundingClientRect().bottom : 0) + 80;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.start.getBoundingClientRect().top <= line) current = s;
    });
    if (nav.getAttribute("data-mode") === "sections")
      label.textContent = current.label;
    sections.forEach(function (s) {
      var on = s === current;
      if (on) {
        s.li.setAttribute("data-current", "");
        s.link.setAttribute("aria-current", "location");
      } else {
        s.li.removeAttribute("data-current");
        s.link.removeAttribute("aria-current");
      }
    });
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
})();
