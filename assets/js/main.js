/* main.js
   The site works fully without JavaScript. This file does two small things:
   1. keeps the footer copyright year current (anything marked data-year);
   2. adds the project filter on work.html (progressive enhancement). */

/* 1. Footer year */
(function () {
  "use strict";

  var year = String(new Date().getFullYear());
  var targets = document.querySelectorAll("[data-year]");

  for (var i = 0; i < targets.length; i++) {
    targets[i].textContent = year;
  }
})();

/* 2. Project filter (work.html only) */
(function () {
  "use strict";

  var bar = document.querySelector("[data-filters]");
  var grid = document.querySelector("[data-work-grid]");
  if (!bar || !grid) return;

  var buttons = bar.querySelectorAll("[data-filter]");
  var items = grid.querySelectorAll("[data-category]");
  var status = document.querySelector("[data-filter-status]");
  var empty = document.querySelector("[data-filter-empty]");

  // Only show the filter bar when scripting works.
  bar.hidden = false;

  function matches(item, type) {
    if (type === "all") return true;
    var types = item.getAttribute("data-category").split(" ");
    return types.indexOf(type) !== -1;
  }

  function labelFor(type) {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute("data-filter") === type) {
        return buttons[i].textContent;
      }
    }
    return "";
  }

  function apply(type, announce) {
    var shown = 0;

    for (var i = 0; i < items.length; i++) {
      var visible = matches(items[i], type);
      items[i].hidden = !visible;
      if (visible) shown++;
    }

    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute("data-filter") === type;
      buttons[j].setAttribute("aria-pressed", active ? "true" : "false");
    }

    if (empty) empty.hidden = shown > 0;

    if (status && announce) {
      var noun = shown === 1 ? "project" : "projects";
      status.textContent = type === "all"
        ? "Showing all " + shown + " " + noun
        : "Showing " + shown + " " + labelFor(type) + " " + noun;
    }
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener("click", function () {
      var type = this.getAttribute("data-filter");
      apply(type, true);

      // Keep the choice in the address (work.html#branding) so it can be shared.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", type === "all" ? window.location.pathname : "#" + type);
      }
    });
  }

  // Open a filtered view from a link such as work.html#packaging
  var fromHash = window.location.hash.replace("#", "");
  if (fromHash && labelFor(fromHash)) {
    apply(fromHash, false);
  }
})();
