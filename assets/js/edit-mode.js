/* Edit mode: visit any page with ?edit to show a pencil on each editable block that links to
   GitHub's web editor. Remembered in localStorage; ?edit=off turns it off. No tokens or API calls:
   GitHub permissions decide who can actually save. Blocks are any element with data-edit-src. */
(function () {
  var KEY = "wedding-edit-mode";
  var on = false;
  try {
    var q = new URLSearchParams(window.location.search);
    if (q.has("edit")) {
      if (q.get("edit") === "off") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, "1");
    }
    on = localStorage.getItem(KEY) === "1";
  } catch (e) {
    on = new URLSearchParams(window.location.search).has("edit");
  }
  if (!on) return;

  document.documentElement.classList.add("edit-mode");
  var style = document.createElement("style");
  style.textContent =
    ".edit-mode [data-edit-src]{outline:1px dashed transparent;outline-offset:6px}" +
    ".edit-mode [data-edit-src]:hover{outline-color:currentColor}" +
    ".edit-pencil{position:absolute;top:-10px;right:-10px;z-index:50;width:28px;height:28px;border-radius:50%;" +
    "background:#fff;color:#003030;border:1px solid #003030;display:none;align-items:center;justify-content:center;" +
    "font:16px/1 system-ui;text-decoration:none}" +
    ".edit-mode [data-edit-src]:hover>.edit-pencil,.edit-pencil:focus{display:flex}" +
    ".edit-banner{position:fixed;bottom:12px;left:12px;z-index:100;background:#fff;color:#003030;border:1px solid #003030;" +
    "padding:6px 10px;font:12px/1.3 system-ui}";
  document.head.appendChild(style);

  document.querySelectorAll("[data-edit-src]").forEach(function (el) {
    /* The pencil is positioned against the block; only set this if the block has no positioning of its own. */
    if (window.getComputedStyle(el).position === "static")
      el.style.position = "relative";
    var a = document.createElement("a");
    a.className = "edit-pencil";
    a.href = el.getAttribute("data-edit-src");
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Edit this on GitHub");
    a.textContent = "✎";
    el.appendChild(a);
  });

  var b = document.createElement("div");
  b.className = "edit-banner";
  b.innerHTML = 'Edit mode. <a href="?edit=off">Turn off</a>';
  document.body.appendChild(b);
})();
