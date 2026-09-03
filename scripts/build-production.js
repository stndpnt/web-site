#!/usr/bin/env node
/* ============================================================================
   StandPoint — production build
   ----------------------------------------------------------------------------
   Copies ONLY the public website into dist/, so the production web root can
   never receive development files. Nothing is deleted from the repository and
   no site file is modified — this is a copy step.

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

const ROOT = path.resolve(__dirname, "..");

/* --- A. everything the live site needs -------------------------------------
   Verified against the markup: every entry here is referenced by a public
   page, its CSS/JS, or the portfolio data. */
const INCLUDE = [
  "index.html",          /* home */
  "portfolio.html",      /* portfolio listing */
  "black-point.html",    /* group stands */
  "faq",                 /* faq/index.html */
  "portfolio",           /* 54 generated project pages */
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
    console.log("\nNever copied:");
    EXCLUDE_DOC.forEach((p) => console.log("  " + p));
    return;
  }

  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
  const out = { files: 0, bytes: 0 };
  INCLUDE.filter((p) => !missing.includes(p)).forEach((p) =>
    copyRecursive(path.join(ROOT, p), path.join(outDir, p), out)
  );

  console.log(
    "Built " + path.relative(ROOT, outDir) + "/ — " + out.files + " file(s), " +
      (out.bytes / 1048576).toFixed(1) + " MB"
  );
  console.log("Upload the CONTENTS of " + path.relative(ROOT, outDir) + "/ to the public web root.");
}

module.exports = { INCLUDE, EXCLUDE_DOC };

if (require.main === module) main(process.argv);
