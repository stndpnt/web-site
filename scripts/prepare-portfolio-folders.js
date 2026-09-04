#!/usr/bin/env node
/* ============================================================================
   StandPoint — portfolio image-folder preparation
   ----------------------------------------------------------------------------
   Creates the image folder for every project declared in
   assets/js/portfolio-data.js, so the programmer only has to drop the actual
   NN.webp files into folders that already exist, and reports which projects
   are still waiting for images.

   Usage:
     node scripts/prepare-portfolio-folders.js            # create folders
     node scripts/prepare-portfolio-folders.js --check    # report only
     node scripts/prepare-portfolio-folders.js --list     # print expected paths
                                                          # of every image file

   Creates nothing else, deletes nothing, never touches existing images.
============================================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const { loadData } = require("./generate-portfolio-pages");

const ROOT = path.resolve(__dirname, "..");
const pad2 = (n) => String(n).padStart(2, "0");

function expectedFiles(p) {
  const ext = p.ext || "jpg";
  const out = [];
  for (let i = 1; i <= (parseInt(p.imageCount, 10) || 0); i++) {
    out.push(p.folder + "/" + pad2(i) + "." + ext);
  }
  return out;
}

function main(argv) {
  const args = argv.slice(2);
  const check = args.includes("--check");
  const list = args.includes("--list");
  const projects = loadData().portfolioProjects.filter((p) => p.folder);

  if (list) {
    projects.forEach((p) => expectedFiles(p).forEach((f) => console.log(f)));
    return;
  }

  let created = 0;
  const pending = [];
  projects.forEach((p) => {
    const dir = path.join(ROOT, p.folder);
    if (!fs.existsSync(dir)) {
      if (!check) fs.mkdirSync(dir, { recursive: true });
      created++;
    }
    const missing = expectedFiles(p).filter((f) => !fs.existsSync(path.join(ROOT, f)));
    if (missing.length) pending.push({ id: p.slug || p.id, folder: p.folder, missing: missing.length });
  });

  console.log(
    projects.length + " project folder(s) declared · " +
      (check ? created + " missing" : created + " created")
  );
  if (pending.length) {
    console.log("\nWaiting for image files (" + pending.length + " project(s)):");
    pending.forEach((r) => console.log("  " + r.folder + "  — " + r.missing + " file(s)"));
    console.log(
      "\nUpload the NN.webp files into the folders above, then run:\n" +
        "  npm run portfolio:check\n" +
        "  npm run portfolio:all\n" +
        "  npm run sitemap\n" +
        "  npm run build"
    );
  }
}

module.exports = { expectedFiles };

if (require.main === module) main(process.argv);
