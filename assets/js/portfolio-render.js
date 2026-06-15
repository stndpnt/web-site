/* ============================================================================
   STANDPOINT — PORTFOLIO RENDERER
   Builds the portfolio grid + lightbox from assets/js/portfolio-data.js.
   Shared by index.html and portfolio.html. Do not edit project content here —
   edit portfolio-data.js instead. This file changes no styling or behaviour.

   Each page sets window.PORTFOLIO_PAGE before loading this file:
     index.html      -> "home"
     portfolio.html  -> "portfolio"
============================================================================ */

(function () {
  var PROJECTS = window.portfolioProjects || [];
  var PAGE     = window.PORTFOLIO_PAGE || "portfolio";
  var MAX_HOME = 6;

  var LABELS = { "custom": "Custom Exhibition Stand", "group-build": "Group Build Solution" };
  var FILTER = { "custom": "custom", "group-build": "group" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Resolve an image path through the standalone-bundle resource map when present
  // (window.__resources is injected only in the inlined offline build). Falls
  // through to the original relative path on the normal site.
  function resolve(src) {
    return (window.__resources && window.__resources[src]) || src;
  }

  // Build the ordered image path list for a project. 01.jpg = cover = first.
  function imagesOf(p) {
    var n = Math.max(0, parseInt(p.imageCount, 10) || 0);
    var out = [];
    for (var i = 1; i <= n; i++) {
      out.push(p.folder + "/" + (i < 10 ? "0" + i : "" + i) + ".jpg");
    }
    return out;
  }

  var byId = {};
  PROJECTS.forEach(function (p) { byId[p.id] = p; });
  function pick(ids) {
    return (ids || []).map(function (id) { return byId[id]; })
                      .filter(function (p) { return !!p; });
  }

  var ZOOM =
    '<span class="pf-zoom" aria-hidden="true">' +
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
    '<path d="M3 3h4M3 3v4M13 13H9M13 13V9M13 3H9M13 3v4M3 13h4M3 13V9" stroke="currentColor" stroke-width="1.4"/>' +
    '</svg></span>';

  // ---------- Decide which projects this page renders, and in what order ----------
  var list = [];
  if (PAGE === "home") {
    // Custom (max 6) then Group Builds (max 6), each in its configured order.
    list = pick(window.homepageCustomIds).slice(0, MAX_HOME)
           .concat(pick(window.homepageGroupBuildIds).slice(0, MAX_HOME));
  } else {
    // portfolio.html: pinned first (in order), then every remaining project.
    var pinned = pick(window.portfolioPinnedIds);
    var seen = {};
    pinned.forEach(function (p) { seen[p.id] = true; });
    var rest = PROJECTS.filter(function (p) { return !seen[p.id]; });
    list = pinned.concat(rest);
  }

  var grid  = document.getElementById("pfGrid");
  var empty = document.getElementById("pfEmpty");
  if (!grid) return;

  // ---------- Cards ----------
  var frag = document.createDocumentFragment();
  list.forEach(function (p) {
    var imgs  = imagesOf(p);
    var cover = imgs[0] || null;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pf-card";
    btn.dataset.cats = FILTER[p.category] || "custom";
    btn.dataset.project = p.id;

    var imgTag = cover
      ? '<img src="' + esc(resolve(cover)) + '" alt="' + esc(p.title) + ' — cover photo" loading="lazy" onerror="this.style.display=\'none\'">'
      : "";
    var event = p.exhibition
      ? '<p class="pf-event">' + esc(p.exhibition) + '</p>'
      : "";

    btn.innerHTML =
      '<div class="pf-image">' +
        '<div class="pf-ph">Image coming soon</div>' +
        imgTag + ZOOM +
      '</div>' +
      '<div class="pf-caption">' +
        '<span class="pf-tag">' + esc(LABELS[p.category] || "") + '</span>' +
        '<h3 class="pf-name">' + esc(p.title) + '</h3>' +
        event +
      '</div>';

    btn.addEventListener("click", function () { openLb(p, imgs); });
    frag.appendChild(btn);
  });
  if (empty) grid.insertBefore(frag, empty);
  else grid.appendChild(frag);

  // ---------- Filters ----------
  var filters = Array.prototype.slice.call(document.querySelectorAll(".pf-filter"));
  var countEl = document.getElementById("pfCount");
  var cards   = Array.prototype.slice.call(grid.querySelectorAll(".pf-card"));

  function applyFilter(f) {
    var vis = 0;
    cards.forEach(function (c) {
      var cats = (c.dataset.cats || "").split(/\s+/);
      var show = f === "all" || cats.indexOf(f) !== -1;
      c.classList.toggle("is-hidden", !show);
      if (show) vis++;
    });
    if (countEl) countEl.textContent = vis;
    if (empty) empty.classList.toggle("is-visible", vis === 0);
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      applyFilter(btn.dataset.filter);
    });
  });

  // Default filter = whichever button starts aria-pressed="true" in the markup.
  var def = (filters.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0]
            || filters[0]);
  applyFilter(def ? def.dataset.filter : "all");

  // ---------- Lightbox ----------
  var lb = document.getElementById("pfLightbox");
  if (!lb) return;
  var stage    = document.getElementById("lbStage");
  var lbName   = document.getElementById("lbName");
  var lbTag    = document.getElementById("lbTag");
  var lbSub    = document.getElementById("lbSub");
  var lbIdx    = document.getElementById("lbIdx");
  var lbTotal  = document.getElementById("lbTotal");
  var lbDots   = document.getElementById("lbDots");
  var btnPrev  = document.getElementById("lbPrev");
  var btnNext  = document.getElementById("lbNext");
  var btnClose = document.getElementById("lbClose");

  var curImgs = [], i = 0, count = 0;

  function buildFrames(p, imgs) {
    stage.querySelectorAll(".lb-frame").forEach(function (f) { f.remove(); });
    var src = (imgs && imgs.length) ? imgs : [null];
    src.forEach(function (s, idx) {
      var fr = document.createElement("div");
      fr.className = "lb-frame" + (idx === 0 ? " is-active" : "");
      fr.dataset.i = idx;
      fr.innerHTML =
        '<div class="lb-ph">Image coming soon</div>' +
        (s ? '<img src="' + esc(resolve(s)) + '" alt="' + esc(p.title) + ' — photo ' + (idx + 1) + '" loading="lazy" onerror="this.style.display=\'none\'">' : "");
      stage.appendChild(fr);
    });
    return src.length;
  }

  function showFrame() {
    if (i < 0) i = count - 1;
    if (i >= count) i = 0;
    stage.querySelectorAll(".lb-frame").forEach(function (fr) {
      fr.classList.toggle("is-active", Number(fr.dataset.i) === i);
    });
    lbIdx.textContent = String(i + 1).padStart(2, "0");
    lbTotal.textContent = String(count).padStart(2, "0");
    Array.prototype.slice.call(lbDots.children).forEach(function (d, idx) {
      d.classList.toggle("is-active", idx === i);
    });
  }

  function openLb(p, imgs) {
    curImgs = imgs; i = 0;
    lbTag.textContent  = LABELS[p.category] || "";
    lbName.textContent = p.title;
    lbSub.textContent  = p.exhibition || "";

    count = buildFrames(p, imgs);

    lbDots.innerHTML = "";
    for (var k = 0; k < count; k++) {
      (function (kk) {
        var d = document.createElement("button");
        d.className = "lb-dot";
        d.setAttribute("aria-label", "Go to photo " + (kk + 1));
        d.addEventListener("click", function () { i = kk; showFrame(); });
        lbDots.appendChild(d);
      })(k);
    }

    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    document.body.style.overflow = "hidden";
    showFrame();
  }

  function closeLb() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 250);
  }

  if (btnPrev)  btnPrev.addEventListener("click", function () { i--; showFrame(); });
  if (btnNext)  btnNext.addEventListener("click", function () { i++; showFrame(); });
  if (btnClose) btnClose.addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft")  { i--; showFrame(); }
    else if (e.key === "ArrowRight") { i++; showFrame(); }
  });
})();
