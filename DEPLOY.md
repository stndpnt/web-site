# Deployment — StandPoint website

The repository contains both the live website and working/authoring files.
**Never upload the repository root to the public web root.** Build first:

```bash
node scripts/build-production.js          # writes dist/
node scripts/build-production.js --check  # dry run: lists what is included
```

Then upload the **contents of `dist/`** to the public web root.

Before the first upload, replace the placeholder domain (see "Open items").

---

## A. Required for production

Uploaded by the build script:

| Path | Why |
|---|---|
| `index.html` | Home |
| `portfolio.html` | Portfolio listing |
| `black-point.html` | Group Stands / Black Point |
| `faq/` | FAQ page |
| `portfolio/` | 54 generated project pages |
| `assets/` | CSS, JS, images, `hero.mp4`, client logos, favicons |
| `robots.txt`, `sitemap.xml` | SEO |
| `image-slot.js` | Referenced by `black-point.html` |
| `.nojekyll` | Only needed on GitHub Pages; harmless elsewhere |

`assets/` is uploaded whole: `assets/css/` (4 stylesheets), `assets/js/`
(`portfolio-data.js`, `portfolio-render.js`, `project-page-render.js`,
`stand-request-modal.js`), `assets/portfolio/`, `assets/black-point/`,
`assets/logos/`, `assets/logo.png`, `assets/favicon*.png`, `assets/hero.mp4`,
`assets/brandex-nomination.jpg`, `assets/exhibitor-finalist.jpg`.

## B. Keep in the repository, never upload

| Path | What it is |
|---|---|
| `templates/portfolio-project.html` | Source template for the page generator — needed to add projects |
| `scripts/` | `generate-portfolio-pages.js`, `generate-sitemap.js`, `build-production.js` |
| `HOW-TO-ADD-PORTFOLIO-PROJECT.md` | Maintenance notes |
| `index-print.html` | Print/PDF copy of the homepage |
| `index-standalone-src.html` | Source for the offline single-file build |
| `StandPoint Site.html`, `Black Point - Standalone.html` | Self-contained offline bundles (for sending, not hosting) |
| `Canvas.dc.html` + `support.js` | Authoring canvas and its runtime (`support.js` is used only by this file) |
| `tweaks-panel.jsx` | Authoring tweaks panel — kept for reference; no public page loads it |
| `uploads/` | Original client material (photos, logos, video) before processing |
| `screenshots/` | Review screenshots |
| `scraps/` | Sketches and audit scratch files |
| `package.json` | Local tooling only — the site loads no npm packages |
| `.gitignore`, `DEPLOY.md` | Repository hygiene |

## C. Obsolete / safe to delete eventually

Not deleted — confirm first:

- `.DS_Store` files (macOS noise; now git-ignored)
- `.image-slots.state.json` — local image-slot drop state for the Black Point canvas
- `.thumbnail` — preview artefact
- `scraps/gen-test/` — output of a generator dry run
- `uploads/0008-788b6499.JPG`, `uploads/0008.png`, `uploads/pasted-*.png` — duplicates/paste artefacts of files already processed into `assets/`

## Open items

1. **Production domain.** `og:url` and `og:image` in the HTML (including
   `OG_ORIGIN` in `scripts/generate-portfolio-pages.js`), `sitemap.xml` and the
   `Sitemap:` line in `robots.txt` use `https://PRODUCTION-DOMAIN`. Replace it
   site-wide, or regenerate the sitemap with
   `node scripts/generate-sitemap.js --origin https://your-domain.com`.
2. ~~Missing brochure PDFs.~~ **Done.** Both presentations live in
   `assets/downloads/`: `StandPoint Presentation.pdf` (Custom Stands — linked from
   `index.html` and `portfolio.html`) and `BlackPoint Group Build.pdf` (Group Stands —
   linked from both CTAs on `black-point.html`). No brochure link points at `#`.
3. ~~Tweaks panel on live pages.~~ **Done.** The React + ReactDOM + Babel +
   `tweaks-panel.jsx` block and `#tweaks-root` were removed from `index.html`,
   `portfolio.html` and `black-point.html`. Its only production-relevant effect,
   `data-theme="dark"` on `<html>`, is now a static attribute. The public site
   loads no framework — only `assets/js/*.js` and `image-slot.js`.
