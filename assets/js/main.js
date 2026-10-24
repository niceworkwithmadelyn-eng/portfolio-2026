/* main.js
   The site works fully without JavaScript. This file only keeps the
   footer copyright year current. Anything marked data-year is updated. */
(function () {
  "use strict";

  var year = String(new Date().getFullYear());
  var targets = document.querySelectorAll("[data-year]");

  for (var i = 0; i < targets.length; i++) {
    targets[i].textContent = year;
  }
})();
