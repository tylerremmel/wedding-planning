/* Drawers (see _includes/drawer.html). A trigger is any element with data-drawer-open="ID"; ID is a
   <dialog class="drawer">. showModal() gives the focus trap, Escape to close, inert page and the ::backdrop
   scrim; the browser returns focus to the trigger on close. This adds: close buttons, a click on the scrim
   (the dialog has no padding, so a click whose target is the dialog itself landed on the scrim), and
   scroll lock while open (components.css). */
(function () {
  function open(drawer) {
    if (drawer && !drawer.open) drawer.showModal();
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-drawer-open]");
    if (trigger) {
      open(document.getElementById(trigger.getAttribute("data-drawer-open")));
      return;
    }
    var closer = e.target.closest("[data-drawer-close]");
    if (closer) {
      closer.closest("dialog").close();
      return;
    }
    if (e.target.matches("dialog.drawer")) e.target.close();
  });
})();
