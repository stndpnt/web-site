#!/usr/bin/env node
/* ============================================================================
   StandPoint — portfolio project-page generator
   ----------------------------------------------------------------------------
   Reads the single source of truth (assets/js/portfolio-data.js), validates it
   against the image files on disk, and writes portfolio/<slug>/index.html from
   templates/portfolio-project.html.

   Usage:
     node scripts/generate-portfolio-pages.js --check
     node scripts/generate-portfolio-pages.js --project <id-or-slug>
     node scripts/generate-portfolio-pages.js --all
   Options:
     --out <dir>              write pages under <dir> instead of portfolio/
     --allow-missing-images   generate pages for projects whose .webp files are
                              not uploaded yet (missing files become notes
                              instead of errors; paths are still written)

   Nothing here writes to portfolio-data.js or to any image file.
============================================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "assets", "js", "portfolio-data.js");
const TEMPLATE_FILE = path.join(ROOT, "templates", "portfolio-project.html");
const OUT_ROOT = path.join(ROOT, "portfolio");
/* Absolute Open Graph URLs are required by Facebook/LinkedIn/Slack. Replace this
   placeholder with the real domain at deploy time (same token as sitemap.xml). */
const OG_ORIGIN = "https://PRODUCTION-DOMAIN";

/* ---------------------------------------------------------------- data load */
/* portfolio-data.js is a browser script (no module system). We evaluate it with
   a stub `window` so the very same file feeds both the site and this script —
   no second copy of the project list. */
function loadData() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const stubWindow = {};
  const fn = new Function(
    "window",
    src +
      "\nreturn { portfolioProjects, homepageCustomIds, homepageGroupBuildIds, portfolioPinnedIds };"
  );
  return fn(stubWindow);
}

/* ------------------------------------------------------------------ helpers */
const slugOf = (p) => p.slug || p.id;
const extOf = (p) => p.ext || "jpg";
const pad2 = (n) => String(n).padStart(2, "0");
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function imageNames(p) {
  const out = [];
  for (let i = 1; i <= p.imageCount; i++) out.push(pad2(i) + "." + extOf(p));
  return out;
}

/* --------------------------------------------------------------- validation */
/* Returns { errors: [], warnings: [] } for one project.
   opts.allowMissingImages downgrades "file/folder not on disk yet" to a note,
   so a batch of projects can be prepared before the images are uploaded. */
function validateProject(p, allProjects, opts) {
  const allowMissing = !!(opts && opts.allowMissingImages);
  const errors = [];
  const warnings = [];
  const imgIssue = (msg) => (allowMissing ? warnings : errors).push(msg);
  const label = p && (p.id || p.slug || "(project with no id)");

  if (!p.id && !p.slug) errors.push("missing both `id` and `slug`");
  if (!p.title || !String(p.title).trim()) errors.push("missing `title`");
  if (!p.folder) errors.push("missing `folder`");

  const slug = slugOf(p);
  if (slug) {
    if (!/^[a-z0-9\-]+$/.test(slug))
      errors.push("slug `" + slug + "` should be lowercase letters, digits and hyphens only");
    const clashes = allProjects.filter((q) => q !== p && slugOf(q) === slug);
    if (clashes.length) errors.push("slug `" + slug + "` is used by more than one project");
  }

  if (!Number.isInteger(p.imageCount) || p.imageCount < 1)
    errors.push("`imageCount` must be a whole number of at least 1 (found: " + p.imageCount + ")");

  if (p.folder) {
    const dir = path.join(ROOT, p.folder);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      imgIssue("image folder not found (images not uploaded yet?): " + p.folder);
    } else if (Number.isInteger(p.imageCount) && p.imageCount >= 1) {
      const missing = imageNames(p).filter((n) => !fs.existsSync(path.join(dir, n)));
      if (missing.length)
        imgIssue("missing image file(s) in " + p.folder + ": " + missing.join(", "));

      /* extra sequential files beyond imageCount = gap / stale imageCount */
      const onDisk = fs
        .readdirSync(dir)
        .filter((f) => new RegExp("^\\d{2}\\." + extOf(p) + "$", "i").test(f))
        .sort();
      const extra = onDisk.filter((f) => parseInt(f, 10) > p.imageCount);
      if (extra.length)
        warnings.push(
          p.folder +
            " has files beyond imageCount " +
            p.imageCount +
            " (never shown): " +
            extra.join(", ")
        );
    }
  }
  return { label, errors, warnings };
}

function validateAll(projects, opts) {
  return projects.map((p) => validateProject(p, projects, opts));
}

/* ----------------------------------------------------------------- rendering */
/* All copy below mirrors the existing hand-made pages exactly. Nothing is
   invented: absent fields simply drop out of the markup. */
function buildFields(p) {
  const isGroup = p.category === "group";
  const title = String(p.title || "").trim();
  const exhibition = String(p.exhibition || "").trim();
  const intro = String(p.description || "").trim(); /* optional — absent = no block */
  const slug = slugOf(p);
  const folder = p.folder.replace(/\/+$/, "");

  let pageTitle, description;
  if (isGroup) {
    pageTitle = title + " | Group Stand Construction | StandPoint";
    description = "Group stand construction for " + title + ", delivered by StandPoint.";
  } else if (exhibition) {
    pageTitle = title + " — " + exhibition + " Exhibition Stand | StandPoint";
    description =
      "Custom exhibition stand for " + title + " — " + exhibition +
      ", designed and built by StandPoint.";
  } else {
    pageTitle = title + " Exhibition Stand | StandPoint";
    description = "Custom exhibition stand for " + title + ", designed and built by StandPoint.";
  }

  const gallery = imageNames(p)
    .map(
      (name, i) =>
        '<button class="proj-thumb" type="button"><img src="../../' +
        folder + "/" + name +
        '" alt="' + esc(title) + " — photo " + (i + 1) +
        '" loading="' + (i < 2 ? "eager" : "lazy") + '"></button>'
    )
    .join("");

  return {
    PAGE_TITLE: esc(pageTitle),
    META_DESCRIPTION: esc(description),
    CANONICAL: "/portfolio/" + slug + "/",
    OG_IMAGE: OG_ORIGIN + "/" + folder + "/01." + extOf(p),
    CRUMB: esc(title),
    TAG: isGroup ? "Group Stand Construction" : "Custom Exhibition Stand",
    H1: esc(title),
    DESCRIPTION_BLOCK: intro
      ? '<section class="proj-intro"><div class="wrap"><div class="proj-desc">' +
        intro.split(/\n{2,}/).map((t) => "<p>" + esc(t.trim()) + "</p>").join("") +
        "</div></div></section>"
      : "",
    META_BLOCK: exhibition
      ? '<div class="proj-meta"><span>' + esc(exhibition) + "</span></div>"
      : "",
    GALLERY: gallery
  };
}

function renderPage(p, template) {
  const fields = buildFields(p);
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) => {
    if (!(key in fields)) throw new Error("Template placeholder {{" + key + "}} has no value");
    return fields[key];
  });
}

function writePage(p, template, outRoot) {
  const dir = path.join(outRoot, slugOf(p));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  fs.writeFileSync(file, renderPage(p, template), "utf8");
  return path.relative(ROOT, file);
}

/* ---------------------------------------------------------------------- CLI */
function report(res) {
  res.errors.forEach((e) => console.log("  ERROR  " + res.label + ": " + e));
  res.warnings.forEach((w) => console.log("  note   " + res.label + ": " + w));
}

function main(argv) {
  const args = argv.slice(2);
  const has = (f) => args.includes(f);
  const valueOf = (f) => (args.indexOf(f) > -1 ? args[args.indexOf(f) + 1] : null);

  const { portfolioProjects } = loadData();
  const outRoot = valueOf("--out") ? path.resolve(ROOT, valueOf("--out")) : OUT_ROOT;
  const opts = { allowMissingImages: has("--allow-missing-images") };

  if (has("--check")) {
    const results = validateAll(portfolioProjects, opts);
    results.forEach((r) => (r.errors.length || r.warnings.length) && report(r));
    const bad = results.filter((r) => r.errors.length);
    console.log(
      "\n" + portfolioProjects.length + " projects checked · " +
        bad.length + " with errors · " +
        results.reduce((n, r) => n + r.warnings.length, 0) + " notes"
    );
    process.exit(bad.length ? 1 : 0);
  }

  const template = fs.readFileSync(TEMPLATE_FILE, "utf8");

  if (has("--project")) {
    const key = valueOf("--project");
    const p = portfolioProjects.find((q) => q.id === key || slugOf(q) === key);
    if (!p) {
      console.log("ERROR: no project with id/slug `" + key + "` in portfolio-data.js");
      process.exit(1);
    }
    const res = validateProject(p, portfolioProjects, opts);
    if (res.errors.length) {
      report(res);
      console.log("\nNot generated — fix the errors above first.");
      process.exit(1);
    }
    res.warnings.forEach((w) => console.log("  note   " + res.label + ": " + w));
    console.log("Generated " + writePage(p, template, outRoot));
    process.exit(0);
  }

  if (has("--all")) {
    let ok = 0;
    const skipped = [];
    portfolioProjects.forEach((p) => {
      const res = validateProject(p, portfolioProjects, opts);
      if (res.errors.length) {
        report(res);
        skipped.push(res.label);
        return;
      }
      res.warnings.forEach((w) => console.log("  note   " + res.label + ": " + w));
      writePage(p, template, outRoot);
      ok++;
    });
    console.log("\nGenerated " + ok + " page(s) in " + path.relative(ROOT, outRoot) + "/");
    if (skipped.length) console.log("SKIPPED (see errors above): " + skipped.join(", "));
    process.exit(skipped.length ? 1 : 0);
  }

  console.log(
    "Usage:\n" +
      "  node scripts/generate-portfolio-pages.js --check\n" +
      "  node scripts/generate-portfolio-pages.js --project <id-or-slug>\n" +
      "  node scripts/generate-portfolio-pages.js --all\n" +
      "  (add  --out <dir>  to generate into a scratch folder instead,\n" +
      "   or  --allow-missing-images  while image folders are still pending)"
  );
  process.exit(1);
}

/* Exported so a future admin interface can reuse the same logic. */
module.exports = { loadData, validateProject, validateAll, buildFields, renderPage, writePage };

if (require.main === module) main(process.argv);
