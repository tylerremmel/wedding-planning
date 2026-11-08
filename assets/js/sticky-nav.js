/* Our Story sticky section nav.
   - Fades in once the first divider ([data-sticky-sentinel]) has scrolled out of view above the viewport,
     and fades out again when scrolling back above it.
   - Scroll-spy: tracks the current section; on narrow screens the bar shows its name and the dropdown
     lists the other sections.
   - Dropdown is a disclosure: button with aria-expanded; Escape, an outside click, or choosing a link closes it.
   Without JavaScript the nav is a plain row of links that stays in the page (see components.css). */
(function () {
  var nav = document.querySelector("[data-section-nav]");
  if (!nav) return;

  var toggle = nav.querySelector(".section-nav__toggle");
  var label = nav.querySelector("[data-section-current]");
  var items = Array.prototype.slice.call(
    nav.querySelectorAll("[data-section-link]"),
  );
  /* The nav is generated from the page's <h2> headings (see section-nav.html), so each link's id points
     at a heading. A section starts at the block right after the nearest divider above its heading (its
     photo, for example); with no divider above, it starts at the heading itself. */
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

  /* Jump to the top of the section (the CSS scroll-margin leaves room for this bar). */
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

  /* ---- Fade in after the first divider ---- */
  var sentinel = document.querySelector("[data-sticky-sentinel]");
  function show(on) {
    if (nav.classList.contains("is-visible") === on) return;
    nav.classList.toggle("is-visible", on);
    if (!on) setOpen(false);
  }
  /* IntersectionObserver only fires when the divider crosses the viewport edge, so a jump that skips
     it entirely (End key, scrollbar drag) is caught by this position check on scroll as well. */
  function checkSentinel() {
    if (sentinel) show(sentinel.getBoundingClientRect().bottom < 0);
  }
  if (sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      show(!e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(sentinel);
  } else if (!sentinel) {
    show(true);
  }

  /* ---- Scroll-spy ---- */
  var ticking = false;
  function update() {
    ticking = false;
    checkSentinel();
    var line = nav.offsetHeight + 80;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.start.getBoundingClientRect().top <= line) current = s;
    });
    if (!current) return;
    if (label) label.textContent = current.label;
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

  /* ---- Dropdown disclosure (narrow screens) ---- */
  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      if (toggle) toggle.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) setOpen(false);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) setOpen(false);
  });
})();
