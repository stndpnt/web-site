#!/usr/bin/env node
/* ============================================================================
   StandPoint — sitemap generator
   ----------------------------------------------------------------------------
   Builds sitemap.xml from the same source of truth the site uses
   (assets/js/portfolio-data.js), so new portfolio projects appear in the
   sitemap without editing dozens of URLs by hand.

   Usage:
     node scripts/generate-sitemap.js
     node scripts/generate-sitemap.js --origin https://your-domain.com
     node scripts/generate-sitemap.js --check    (list URLs, write nothing)

   A project is included only when its page folder actually exists on disk.
============================================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "assets", "js", "portfolio-data.js");
const OUT_FILE = path.join(ROOT, "sitemap.xml");
const DEFAULT_ORIGIN = "https://PRODUCTION-DOMAIN";

/* Static public pages. Add a new top-level page here when one is created. */
const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/portfolio.html", priority: "0.9", changefreq: "weekly" },
  { loc: "/black-point.html", priority: "0.8", changefreq: "monthly" },
  { loc: "/faq/", priority: "0.6", changefreq: "monthly" },
  { loc: "/privacy-policy.html", priority: "0.3", changefreq: "yearly" }
];

function loadProjects() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const fn = new Function("window", src + "\nreturn portfolioProjects;");
  return fn({});
}

const slugOf = (p) => p.slug || p.id;

function build(origin) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = STATIC_PAGES.slice();

  loadProjects().forEach((p) => {
    const slug = slugOf(p);
    if (!slug) return;
    const dir = path.join(ROOT, "portfolio", slug);
    if (!fs.existsSync(path.join(dir, "index.html"))) return; /* not generated yet */
    entries.push({ loc: "/portfolio/" + slug + "/", priority: "0.7", changefreq: "yearly" });
  });

  const body = entries
    .map(
      (e) =>
        "  <url>\n" +
        "    <loc>" + origin + e.loc + "</loc>\n" +
        "    <lastmod>" + today + "</lastmod>\n" +
        "    <changefreq>" + e.changefreq + "</changefreq>\n" +
        "    <priority>" + e.priority + "</priority>\n" +
        "  </url>"
    )
    .join("\n");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    "<!-- StandPoint sitemap. Regenerate with:  node scripts/generate-sitemap.js\n" +
    "     Replace " + DEFAULT_ORIGIN + " with the real domain at deploy time\n" +
    "     (or pass  --origin https://your-domain.com  to the generator). -->\n" +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    body +
    "\n</urlset>\n";

  return { xml, entries };
}

function main(argv) {
  const args = argv.slice(2);
  const originArg = args.indexOf("--origin");
  const origin = originArg > -1 ? args[originArg + 1].replace(/\/+$/, "") : DEFAULT_ORIGIN;
  const { xml, entries } = build(origin);

  if (args.includes("--check")) {
    entries.forEach((e) => console.log(origin + e.loc));
    console.log("\n" + entries.length + " URL(s) — nothing written");
    return;
  }

  fs.writeFileSync(OUT_FILE, xml, "utf8");
  console.log("Wrote " + path.relative(ROOT, OUT_FILE) + " with " + entries.length + " URL(s)");
  if (origin === DEFAULT_ORIGIN)
    console.log("NOTE: still using the " + DEFAULT_ORIGIN + " placeholder origin.");
}

module.exports = { build, loadProjects };

if (require.main === module) main(process.argv);
