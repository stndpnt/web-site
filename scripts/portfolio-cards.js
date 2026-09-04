"use strict";
/* ============================================================================
   StandPoint — portfolio card markup (build-time)
   ----------------------------------------------------------------------------
   Produces exactly the same card markup that assets/js/portfolio-render.js
   creates in the browser, so the production build can bake the cards into
   dist/portfolio.html before any JavaScript runs.

   Single source of truth stays assets/js/portfolio-data.js. Nothing here
   contains project content.

   Used by scripts/build-production.js.
============================================================================ */

const MARKER = "<!-- BUILD:PORTFOLIO_CARDS -->";

const LABELS = { custom: "Custom Exhibition Stand", group: "Group Build Solution" };

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pad2 = (n) => String(n).padStart(2, "0");

/* 01.<ext> is always the cover and the first lightbox image. */
function imagesOf(p) {
  const n = Math.max(0, parseInt(p.imageCount, 10) || 0);
  const ext = p.ext || "jpg";
  const out = [];
  for (let i = 1; i <= n; i++) out.push(p.folder + "/" + pad2(i) + "." + ext);
  return out;
}

function projectUrl(p) {
  return "portfolio/" + (p.slug || p.id) + "/index.html";
}

const ZOOM =
  '<span class="pf-zoom" aria-hidden="true">' +
  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none">' +
  '<path d="M3 3h4M3 3v4M13 13H9M13 13V9M13 3H9M13 3v4M3 13h4M3 13V9" stroke="currentColor" stroke-width="1.4"/>' +
  "</svg></span>";

/* portfolio.html order: pinned ids first (in order), then every remaining
   project in data order — identical to portfolio-render.js. */
function orderedProjects(data) {
  const projects = data.portfolioProjects || [];
  const byId = {};
  projects.forEach((p) => { byId[p.id] = p; });
  const pinned = (data.portfolioPinnedIds || []).map((id) => byId[id]).filter(Boolean);
  const seen = {};
  pinned.forEach((p) => { seen[p.id] = true; });
  return pinned.concat(projects.filter((p) => !seen[p.id]));
}

/* One card. `eager` drops loading="lazy" for the few cards that are visible
   without scrolling; every other cover image stays natively lazy. */
function cardHtml(p, eager) {
  const cover = imagesOf(p)[0] || null;
  const imgTag = cover
    ? '<img src="' + esc(cover) + '" alt="' + esc(p.title) + ' — cover photo" loading="' +
      (eager ? "eager" : "lazy") + '" onerror="this.style.display=\'none\'">'
    : "";
  const event = p.exhibition ? '<p class="pf-event">' + esc(p.exhibition) + "</p>" : "";
  return (
    '<a class="pf-card" href="' + esc(projectUrl(p)) + '" data-cats="' +
      esc(p.category || "custom") + '" data-project="' + esc(p.id) + '">' +
      '<div class="pf-image">' +
        '<div class="pf-ph">Image coming soon</div>' + imgTag + ZOOM +
      "</div>" +
      '<div class="pf-caption">' +
        '<span class="pf-tag">' + esc(LABELS[p.category] || "") + "</span>" +
        '<h3 class="pf-name">' + esc(p.title) + "</h3>" +
        event +
      "</div>" +
    "</a>"
  );
}

function cardsHtml(data, opts) {
  const eagerCount = (opts && opts.eagerCount) || 0;
  return orderedProjects(data)
    .map((p, i) => cardHtml(p, i < eagerCount))
    .join("");
}

/* Replace the build marker inside #pfGrid with the real cards, and bake the
   project count into #pfCount so the no-JS page shows the right number (the
   renderer overwrites it per filter as before). Falls back to inserting before
   .pf-empty if the marker was removed by hand. */
function injectCards(html, data, opts) {
  const cards = cardsHtml(data, opts);
  const count = orderedProjects(data).length;
  html = html.replace(
    /(<span id="pfCount">)[^<]*(<\/span>)/,
    (m, a, b) => a + count + b
  );
  if (html.indexOf(MARKER) > -1) return html.split(MARKER).join(cards);
  const fallback = html.indexOf('<div class="pf-empty"');
  if (fallback > -1) return html.slice(0, fallback) + cards + html.slice(fallback);
  throw new Error(
    "portfolio.html has no " + MARKER + " marker and no .pf-empty element — cannot inject cards"
  );
}

module.exports = { MARKER, LABELS, orderedProjects, cardHtml, cardsHtml, injectCards, projectUrl };
