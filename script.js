/* ============================================================
   SCRIPT.JS — Sabbir Shikder · Personal Site
   Renders the photo gallery from posts.js, powers the lightbox,
   navigation, scroll reveals, and graceful image fallbacks.
   You should not need to edit this file to add photos —
   just edit posts.js.
   ============================================================ */

(function () {
  "use strict";

  /* ---- Helper: escape text so captions are safe ---- */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Photos come from posts.js (window.POSTS). Empty list = friendly message. */
  var posts = Array.isArray(window.POSTS) ? window.POSTS : [];

  /* ============================================================
     1. RENDER THE GALLERY
     ============================================================ */
  function metaLine(post) {
    var bits = [];
    if (post.date) bits.push(esc(post.date));
    if (post.location) bits.push(esc(post.location));
    if (!bits.length) return "";
    return bits.join(' <span class="dot"></span> ');
  }

  function renderGallery(el, limit) {
    if (!el) return;
    var list = (typeof limit === "number" && limit > 0) ? posts.slice(0, limit) : posts;

    if (!list.length) {
      el.outerHTML = '<p class="gallery-empty">No photos yet — add your first one in posts.js.</p>';
      return;
    }

    var html = "";
    list.forEach(function (post, i) {
      // The data-index points back to the full posts array for the lightbox.
      var realIndex = posts.indexOf(post);
      html +=
        '<article class="post reveal" data-index="' + realIndex + '" tabindex="0" role="button" aria-label="Open photo">' +
          '<div class="post-media">' +
            '<img src="' + esc(post.image) + '" alt="' + esc(post.caption) + '" loading="lazy" ' +
              'onerror="this.parentElement.classList.add(\'is-placeholder\'); this.parentElement.innerHTML=\'<span>Add ' + esc(post.image).replace(/^.*\//, "") + '</span>\';" />' +
            '<span class="expand" aria-hidden="true">&#10063;</span>' +
          '</div>' +
          '<div class="post-body">' +
            '<p class="post-caption">' + esc(post.caption) + '</p>' +
            (metaLine(post) ? '<div class="post-meta">' + metaLine(post) + '</div>' : '') +
          '</div>' +
        '</article>';
    });
    el.innerHTML = html;
  }

  var recentEl = document.getElementById("recent-gallery");
  var fullEl = document.getElementById("full-gallery");
  if (recentEl) renderGallery(recentEl, parseInt(recentEl.dataset.limit, 10) || 3);
  if (fullEl) renderGallery(fullEl, 0);

  /* ============================================================
     2. LIGHTBOX
     ============================================================ */
  var lightbox = document.getElementById("lightbox");

  if (lightbox && posts.length) {
    var lbImg = document.getElementById("lb-img");
    var lbCap = document.getElementById("lb-caption");
    var lbMeta = document.getElementById("lb-meta");
    var btnClose = lightbox.querySelector(".lb-close");
    var btnPrev = lightbox.querySelector(".lb-prev");
    var btnNext = lightbox.querySelector(".lb-next");
    var current = 0;

    function showPhoto(index) {
      current = (index + posts.length) % posts.length;
      var post = posts[current];
      lbImg.src = post.image;
      lbImg.alt = post.caption || "";
      lbCap.textContent = post.caption || "";
      lbMeta.innerHTML = metaLine(post);
    }

    function openLightbox(index) {
      showPhoto(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      btnClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    // Open when a post is clicked (event delegation across all galleries)
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".post");
      if (card && card.dataset.index != null) {
        openLightbox(parseInt(card.dataset.index, 10));
      }
    });

    // Keyboard: open on Enter/Space when a card is focused
    document.addEventListener("keydown", function (e) {
      var card = document.activeElement;
      if (card && card.classList && card.classList.contains("post") &&
          (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openLightbox(parseInt(card.dataset.index, 10));
      }
    });

    btnClose.addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", function () { showPhoto(current - 1); });
    btnNext.addEventListener("click", function () { showPhoto(current + 1); });

    // Click the dark backdrop (but not the image/buttons) to close
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation while open
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPhoto(current - 1);
      else if (e.key === "ArrowRight") showPhoto(current + 1);
    });
  }

  /* ============================================================
     3. NAVIGATION — scroll state + active link + mobile menu
     ============================================================ */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active link based on current page
  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    function setMenu(open) {
      toggle.classList.toggle("open", open);
      navLinks.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () {
      setMenu(!toggle.classList.contains("open"));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !nav.contains(e.target)) setMenu(false);
    });
  }

  /* ============================================================
     4. SCROLL REVEAL
     ============================================================ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     5. CURRENT YEAR IN FOOTER
     ============================================================ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
