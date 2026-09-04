# How to add a portfolio project

You only ever touch two things: an **image folder** and the file
`assets/js/portfolio-data.js`. The individual project page is then generated
for you. You never copy or edit an HTML page by hand.

---

## Adding one new project

### Step 1 — Prepare the images

Save the photos as **WebP**, named with two digits, starting at 01, **with no
gaps**:

```
01.webp
02.webp
03.webp
04.webp
```

`01.webp` is the cover image shown on the card. Do not use names like
`cover.webp`, `DSC_4636.webp`, or `1.webp`. If a number is missing (for example
01, 03, 04) the gallery breaks — the check in Step 5 will tell you.

### Step 2 — Create the project folder

Custom stands go in `assets/portfolio/custom/`, group stands in
`assets/portfolio/group-builds/`. Use lowercase Latin letters, digits and
hyphens only — no spaces, no capitals, no Cyrillic.

Example (a custom project):

```
assets/portfolio/custom/50-acme-some-expo/01.webp
assets/portfolio/custom/50-acme-some-expo/02.webp
assets/portfolio/custom/50-acme-some-expo/03.webp
```

The leading number (`50-`) is only for tidiness. It does not affect the order
on the website.

### Step 3 — Add the project to `portfolio-data.js`

Open `assets/js/portfolio-data.js`, copy an existing block, and paste it into
the `portfolioProjects` list:

```js
{
  id: "acme-some-expo",
  title: "Acme",
  exhibition: "Some Expo",
  category: "custom",
  folder: "assets/portfolio/custom/50-acme-some-expo",
  ext: "webp",
  imageCount: 3
},
```

What each field means:

| Field | Meaning |
| --- | --- |
| `id` | Unique name, lowercase-with-hyphens. It also becomes the page address: `portfolio/acme-some-expo/index.html`. Once the page is public, never change it. |
| `title` | The company or project name. Shown on the card and as the page heading. |
| `exhibition` | The show/event name, shown under the title. Leave as `""` if there isn't one. |
| `category` | `"custom"` for Custom Stands, `"group"` for Group Stands. This drives the portfolio filters. |
| `folder` | Path to the image folder you made in Step 2. It does **not** have to match the `id`. |
| `ext` | The image file type — `"webp"` for new projects. |
| `imageCount` | How many images are in the folder. With 3 images the site looks for `01.webp`, `02.webp`, `03.webp`. |

Optional: add `slug: "some-other-url"` if you want the page address to differ
from the `id`.

### Step 4 — Optional: homepage and pinned placement

At the bottom of `portfolio-data.js` there are three lists. Add the project's
`id` to whichever applies:

- `homepageCustomIds` — the Custom Stands shown on the homepage (max 6)
- `homepageGroupBuildIds` — the Group Stands shown on the homepage (max 6)
- `portfolioPinnedIds` — projects shown first on the Portfolio page

The order you list ids in is the order they appear. If you add none of these,
the project still appears on the Portfolio page, after the pinned ones.

### Step 5 — Validate

```bash
node scripts/generate-portfolio-pages.js --check
```

or

```bash
npm run portfolio:check
```

This changes nothing. It only reports problems: missing folder, missing images,
a numbering gap, a duplicate id, a missing title, a wrong `imageCount`. Fix
anything it reports before continuing.

### Step 6 — Generate the page

```bash
node scripts/generate-portfolio-pages.js --project acme-some-expo
```

or

```bash
npm run portfolio:project -- acme-some-expo
```

This creates `portfolio/acme-some-expo/index.html`. Nothing else is touched.

### Step 7 — Check the site

Open the site and confirm:

1. the card appears (homepage if you added it there, and on Portfolio);
2. clicking the card opens the individual project page;
3. every gallery image loads (no blank frames);
4. clicking an image opens the lightbox and the arrows move through all photos.

---

## If I do not want to use Terminal

You don't have to. If a developer or a coding assistant (Claude, Codex, etc.)
is maintaining the site, do Steps 1–4 (upload the images, add the project
block) and then ask:

> Run the portfolio validation and generate the page for `acme-some-expo`.
> Then verify that the card, individual page, gallery and lightbox work.

They run the two commands for you. The commands are just a shortcut — there is
no separate admin system to log into, and nothing breaks if you never open a
Terminal yourself.

---

## Adding many projects at once

1. Add all the image folders (Step 1 and 2 for each).
2. Add all the project blocks to `portfolio-data.js` (Step 3 for each).
3. Validate everything:

   ```bash
   node scripts/generate-portfolio-pages.js --check
   ```

4. Fix whatever it reports, then re-run the check until it is clean.
5. Generate all pages:

   ```bash
   node scripts/generate-portfolio-pages.js --all
   ```

   (or `npm run portfolio:all`)

6. Open 3–4 of the new pages and check the gallery and lightbox.

`--all` regenerates every project page from the data, so any manual edit
previously made directly inside `portfolio/<slug>/index.html` is replaced. If a
page needs a design change, change `templates/portfolio-project.html` instead —
that template is what every page is built from.

---

## Preparing projects before the images exist

When the project records are added first and the photos arrive later (as with
the 50–162 import batch), the workflow is:

1. Create every declared image folder:

   ```bash
   npm run portfolio:folders          # creates missing folders
   npm run portfolio:folders:check    # reports which are still empty
   ```

2. Generate the pages with the images still pending:

   ```bash
   npm run portfolio:all:pending      # --allow-missing-images
   ```

   Missing files are reported as notes instead of errors. The pages already
   point at the final image paths (`01.webp`, `02.webp`, …).

3. When the real `.webp` folders are uploaded, run the normal commands to
   confirm and refresh everything:

   ```bash
   npm run portfolio:check
   npm run portfolio:all
   npm run sitemap
   npm run build
   ```

Until the files land, cards and galleries show the standard "Image coming soon"
placeholder — the layout never breaks.

---

## Production build

```bash
npm run build
```

Copies the public site into `dist/` and bakes the portfolio cards straight into
`dist/portfolio.html`, generated from `portfolio-data.js`. Portfolio cards and
project links are therefore present in the production HTML before JavaScript
runs; JavaScript only filters them. Never edit cards in `portfolio.html` by
hand — its grid holds only the `<!-- BUILD:PORTFOLIO_CARDS -->` marker.
