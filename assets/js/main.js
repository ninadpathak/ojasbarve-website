/* Dr Ojas Barve — site interactions (no dependencies) */
(function () {
  "use strict";

  /* sticky header shadow */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.classList.remove("open");
      }
    });
  }

  /* typewriter roles (hero) */
  var rolesEl = document.querySelector("[data-roles]");
  if (rolesEl) {
    var roles = JSON.parse(rolesEl.getAttribute("data-roles"));
    var textEl = rolesEl.querySelector(".roles-text");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textEl.textContent = roles[0];
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var word = roles[ri];
        ci += deleting ? -1 : 1;
        textEl.textContent = word.slice(0, ci);
        var delay = deleting ? 34 : 62;
        if (!deleting && ci === word.length) { delay = 2100; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
        setTimeout(tick, delay);
      })();
    }
  }

  /* reveal on scroll + counters + language bars */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* experience accordion */
  document.querySelectorAll(".xp-head").forEach(function (head) {
    head.addEventListener("click", function () {
      var item = head.closest(".xp-item");
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".xp-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".xp-head").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* marquee: duplicate track content for a seamless loop */
  var track = document.querySelector(".marquee-track");
  if (track) track.innerHTML += track.innerHTML;

  /* mailto contact form */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var msg = form.querySelector("#cf-message").value.trim();
      var subject = encodeURIComponent("Website enquiry from " + name);
      var body = encodeURIComponent(msg + "\n\n— " + name + (email ? " (" + email + ")" : ""));
      window.location.href = "mailto:hello@ojasbarve.com?subject=" + subject + "&body=" + body;
    });
  }

  /* footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
