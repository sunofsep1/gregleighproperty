/* Greg Leigh site — shared interactions: mobile nav, testimonials carousel, sold filter. */
(function () {
  "use strict";

  // Year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("is-open");
    });
  }

  // Testimonials carousel
  var stage = document.getElementById("t-stage");
  if (stage && window.TESTIMONIALS) {
    var dotsEl = document.getElementById("t-dots");
    var i = 0, timer = null, DELAY = 5000;
    window.TESTIMONIALS.forEach(function (t, idx) {
      var s = document.createElement("div");
      s.className = "tslide" + (idx === 0 ? " is-active" : "");
      s.innerHTML = '<p class="tquote">' + t.q + '</p>' +
        '<div class="tmeta"><span class="ministars" aria-hidden="true">★★★★★</span>' +
        '<span class="role">' + t.role + '</span>' +
        '<span class="src"><span class="tick">✓</span> Verified · realestate.com.au</span></div>';
      stage.appendChild(s);
      if (dotsEl) {
        var d = document.createElement("button");
        d.className = "tdot" + (idx === 0 ? " is-active" : "");
        d.setAttribute("aria-label", "Testimonial " + (idx + 1));
        d.addEventListener("click", function () { go(idx); reset(); });
        dotsEl.appendChild(d);
      }
    });
    var slides = stage.querySelectorAll(".tslide");
    var dots = dotsEl ? dotsEl.querySelectorAll(".tdot") : [];
    function go(n) {
      slides[i].classList.remove("is-active"); if (dots[i]) dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active"); if (dots[i]) dots[i].classList.add("is-active");
    }
    function reset() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, DELAY); }
    var nx = document.getElementById("t-next"), pv = document.getElementById("t-prev");
    if (nx) nx.addEventListener("click", function () { go(i + 1); reset(); });
    if (pv) pv.addEventListener("click", function () { go(i - 1); reset(); });
    reset();
  }

  // Sold/listings suburb filter
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.getAttribute("data-filter");
      document.querySelectorAll(".grid .card").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-suburb") === f;
        card.style.display = show ? "" : "none";
      });
    });
  }
})();
