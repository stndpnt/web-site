#!/usr/bin/env node
/* ============================================================================
   StandPoint — production build
   ----------------------------------------------------------------------------
   Copies ONLY the public website into dist/, so the production web root can
   never receive development files. Nothing is deleted from the repository and
   no site file is modified — this is a copy step, plus one generation step:
   the portfolio cards are baked into dist/portfolio.html from
   assets/js/portfolio-data.js, so the production HTML contains the real
   project cards and links before any JavaScript runs.

   Usage:
     node scripts/build-production.js            # build into dist/
     node scripts/build-production.js --check    # list what would be copied
     node scripts/build-production.js --out www  # different output folder

   Upload the CONTENTS of dist/ to the public web root.

   To add a new public page or asset folder, add it to INCLUDE below.
============================================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const { loadData } = require("./generate-portfolio-pages");
const { injectCards, orderedProjects } = require("./portfolio-cards");

/* Cover images of the first cards load eagerly; every other cover stays
   natively lazy so the page never requests hundreds of images at once. */
const EAGER_COVERS = 3;

const ROOT = path.resolve(__dirname, "..");

/* --- A. everything the live site needs -------------------------------------
   Verified against the markup: every entry here is referenced by a public
   page, its CSS/JS, or the portfolio data. */
const INCLUDE = [
  "index.html",          /* home */
  "portfolio.html",      /* portfolio listing */
  "black-point.html",    /* group stands */
  "privacy-policy.html", /* privacy policy */
  "faq",                 /* faq/index.html */
  "portfolio",             /* generated project pages, one per project */
  "assets",              /* css, js, images, video, logos, favicons */
  "robots.txt",
  "sitemap.xml",
  "image-slot.js",       /* referenced by black-point.html */
  ".nojekyll"            /* needed only on GitHub Pages — harmless elsewhere */
];

/* --- B. never uploaded ------------------------------------------------------
   Listed for documentation; the build simply never copies them. */
const EXCLUDE_DOC = [
  "scraps/", "screenshots/", "uploads/", "templates/", "scripts/",
  "Canvas.dc.html", "support.js", "StandPoint Site.html",
  "Black Point - Standalone.html", "index-standalone-src.html",
  "index-print.html", "package.json", "HOW-TO-ADD-PORTFOLIO-PROJECT.md",
  "tweaks-panel.jsx", /* authoring-only; public pages no longer load it */
  "DEPLOY.md", ".gitignore", ".image-slots.state.json", ".thumbnail",
  ".DS_Store", "dist/"
];

/* Files that must never be copied even from inside an included folder. */
const SKIP_NAMES = new Set([".DS_Store", "Thumbs.db", ".image-slots.state.json"]);

/* --- C. build-time HTML generation ----------------------------------------
   dist/portfolio.html gets the real portfolio cards baked in, generated from
   assets/js/portfolio-data.js (the single source of truth). The source
   portfolio.html stays a template: its #pfGrid holds only a build marker, and
   the browser renderer detects the baked cards and skips creating them. */
function prerenderPortfolio(outDir) {
  const file = path.join(outDir, "portfolio.html");
  if (!fs.existsSync(file)) return null;
  const data = loadData();
  const html = injectCards(fs.readFileSync(file, "utf8"), data, { eagerCount: EAGER_COVERS });
  fs.writeFileSync(file, html, "utf8");
  return orderedProjects(data).length;
}

function copyRecursive(src, dest, out) {
  const name = path.basename(src);
  if (SKIP_NAMES.has(name)) return;
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((f) => copyRecursive(path.join(src, f), path.join(dest, f), out));
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    out.files++;
    out.bytes += st.size;
  }
}

function main(argv) {
  const args = argv.slice(2);
  const outArg = args.indexOf("--out");
  const outDir = path.resolve(ROOT, outArg > -1 ? args[outArg + 1] : "dist");
  const check = args.includes("--check");

  const missing = INCLUDE.filter((p) => !fs.existsSync(path.join(ROOT, p)));
  if (missing.length) {
    console.log("WARNING: listed but not found: " + missing.join(", "));
  }

  if (check) {
    console.log("Would copy into " + path.relative(ROOT, outDir) + "/:");
    INCLUDE.filter((p) => !missing.includes(p)).forEach((p) => console.log("  " + p));
    console.log(
      "\nThen bake " + orderedProjects(loadData()).length +
        " portfolio cards into " + path.relative(ROOT, outDir) + "/portfolio.html"
    );
    console.log("\nNever copied:");
    EXCLUDE_DOC.forEach((p) => console.log("  " + p));
    return;
  }

  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
  const out = { files: 0, bytes: 0 };
  INCLUDE.filter((p) => !missing.includes(p)).forEach((p) =>
    copyRecursive(path.join(ROOT, p), path.join(outDir, p), out)
  );

  const cards = prerenderPortfolio(outDir);

  console.log(
    "Built " + path.relative(ROOT, outDir) + "/ — " + out.files + " file(s), " +
      (out.bytes / 1048576).toFixed(1) + " MB"
  );
  if (cards !== null) {
    console.log("Pre-rendered " + cards + " portfolio card(s) into portfolio.html");
  }
  console.log("Upload the CONTENTS of " + path.relative(ROOT, outDir) + "/ to the public web root.");
}

module.exports = { INCLUDE, EXCLUDE_DOC, prerenderPortfolio };

if (require.main === module) main(process.argv);
