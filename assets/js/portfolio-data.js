/* ============================================================================
   STANDPOINT — PORTFOLIO DATA
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO MANAGE THE PORTFOLIO.
   No coding knowledge required — just copy a block and change the text.

   ────────────────────────────────────────────────────────────────────────
   HOW TO ADD A NEW PROJECT
   ────────────────────────────────────────────────────────────────────────
   1) Create a folder for it (numbers are just for tidiness — they do NOT
      control the order on the website):

         assets/portfolio/custom/21-acme-some-expo/
         assets/portfolio/group-builds/08-acme-some-expo/

      Use lowercase Latin letters and hyphens instead of spaces.

   2) Put numbered images inside that folder:

         01.jpg   ← cover / preview image AND the first lightbox image
         02.jpg
         03.jpg
         ...

      Do NOT use cover.jpg. 01.jpg is always the cover.

   3) Add one block to the `portfolioProjects` list below:

         {
           id: "acme-some-expo",                 // unique, lowercase-with-hyphens
           title: "Acme",                        // shown on the card
           exhibition: "Some Expo",              // shown on the card
           category: "custom",                   // "custom" OR "group-build"
           folder: "assets/portfolio/custom/21-acme-some-expo",
           imageCount: 3                         // how many NN.jpg files are in the folder
         },

   That's it. The website builds the card and the lightbox automatically.

   ────────────────────────────────────────────────────────────────────────
   CONTROLLING THE ORDER (this is what the lists at the bottom do)
   ────────────────────────────────────────────────────────────────────────
   • homepageCustomIds     → the (max 6) Custom Stands shown on index.html
   • homepageGroupBuildIds → the (max 6) Group Builds shown on index.html
   • portfolioPinnedIds    → projects shown FIRST on portfolio.html

   The ORDER you list ids in those arrays is the order they appear.
   To feature a project on the homepage, just add its id to the right list —
   you never need to rename a folder.

   On portfolio.html: pinned projects come first, then every other project.
   If an image is missing, the card still renders with an "Image coming soon"
   placeholder — the layout never breaks.
============================================================================ */

const portfolioProjects = [

  /* ===========================  CUSTOM STANDS  =========================== */

  {
    id: "betinvest-ice-barcelona",
    title: "Betinvest",
    exhibition: "ICE Barcelona",
    category: "custom",
    folder: "assets/portfolio/custom/01-betinvest-ice-barcelona",
    imageCount: 10
  },

  /* The 5 projects below come from the ids you listed in homepageCustomIds.
     Titles/exhibitions were read straight from those ids — adjust the text if
     needed, then drop 01.jpg, 02.jpg … into each folder and set imageCount.
     Until images are added they show an "Image coming soon" placeholder. */
  {
    id: "makhno-isaloni-euroluce",
    title: "Makhno",
    exhibition: "iSaloni — Euroluce",
    category: "custom",
    folder: "assets/portfolio/custom/02-makhno-isaloni-euroluce",
    imageCount: 9
  },
  {
    id: "toshiba-standpoint",
    title: "Toshiba",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/03-toshiba-standpoint",
    imageCount: 4
  },
  {
    id: "standpoint-euroshop",
    title: "StandPoint",
    exhibition: "EuroShop",
    category: "custom",
    folder: "assets/portfolio/custom/04-standpoint-euroshop",
    imageCount: 7
  },
  {
    id: "fujairah-itb-berlin",
    title: "Fujairah",
    exhibition: "ITB Berlin",
    category: "custom",
    folder: "assets/portfolio/custom/05-fujairah-itb-berlin",
    imageCount: 4
  },
  {
    id: "klaxcar-automechanika-frankfurt-am-main",
    title: "Klaxcar",
    exhibition: "Automechanika Frankfurt am Main",
    category: "custom",
    folder: "assets/portfolio/custom/06-klaxcar-automechanika",
    imageCount: 5
  },
  {
    id: "auditorium-2-interior-mebel",
    title: "Auditorium 2",
    exhibition: "Interior Mebel",
    category: "custom",
    folder: "assets/portfolio/custom/07-auditorium-2-interior-mebel",
    imageCount: 21
  },
  {
    id: "ukroboronprom-eurosatory-paris",
    title: "UkrOboronProm",
    exhibition: "Eurosatory Paris",
    category: "custom",
    folder: "assets/portfolio/custom/08-ukroboronprom-eurosatory-paris",
    imageCount: 6
  },
  {
    id: "ste-eurosatory",
    title: "Spets Techno Export",
    exhibition: "Eurosatory",
    category: "custom",
    folder: "assets/portfolio/custom/09-ste-eurosatory",
    imageCount: 3
  },
  {
    id: "triel-tek",
    title: "Triel",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/10-triel-tek",
    imageCount: 1
  },
  {
    id: "swerige-rebuild-ukraine",
    title: "Sweden — Sverige",
    exhibition: "Rebuild Ukraine",
    category: "custom",
    folder: "assets/portfolio/custom/11-swerige-rebuild-ukraine",
    imageCount: 4
  },
  {
    id: "sklad-servise-promforum",
    title: "Sklad Service",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/12-sklad-servise-promforum",
    imageCount: 3
  },
  {
    id: "helios-promforum",
    title: "Helios Strategia",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/13-helios-promforum",
    imageCount: 3
  },
  {
    id: "machentech-promforum",
    title: "Machentech",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/14-machentech-promforum",
    imageCount: 9
  },
  {
    id: "dalgakiran-promforum",
    title: "Dalgakiran",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/15-dalgakiran-promforum",
    imageCount: 2
  },
  {
    id: "alista-promforum",
    title: "Alista",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/16-alista-promforum",
    imageCount: 4
  },
  {
    id: "interior-mebel-2013",
    title: "Interior Mebel",
    exhibition: "Interior Mebel 2013",
    category: "custom",
    folder: "assets/portfolio/custom/17-interior-mebel-2013",
    imageCount: 10
  },
  {
    id: "interior-mebel-2016",
    title: "Interior Mebel",
    exhibition: "Interior Mebel 2016",
    category: "custom",
    folder: "assets/portfolio/custom/18-interior-mebel-2016",
    imageCount: 11
  },

  /* ===========================  GROUP BUILDS  ===========================
     These six folders already contain real photos on disk. Rename the folders
     and update title/exhibition/id whenever you have the real project info. */
  {
    id: "group-build-01",
    title: "Group Build 01",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/01-group-build",
    imageCount: 3
  },
  {
    id: "group-build-02",
    title: "Group Build 02",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/02-group-build",
    imageCount: 3
  },
  {
    id: "group-build-03",
    title: "Group Build 03",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/03-group-build",
    imageCount: 1
  },
  {
    id: "group-build-04",
    title: "Group Build 04",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/04-group-build",
    imageCount: 3
  },
  {
    id: "group-build-05",
    title: "Group Build 05",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/05-group-build",
    imageCount: 1
  },
  {
    id: "group-build-06",
    title: "Group Build 06",
    exhibition: "",
    category: "group-build",
    folder: "assets/portfolio/group-builds/06-group-build",
    imageCount: 1
  }

];

/* ============================================================================
   HOMEPAGE — CUSTOM STANDS  (max 6, shown in this exact order on index.html)
   Add or reorder ids here. Only ids that exist in portfolioProjects appear.
============================================================================ */
const homepageCustomIds = [
  "betinvest-ice-barcelona",
  "makhno-isaloni-euroluce",
  "toshiba-standpoint",
  "standpoint-euroshop",
  "fujairah-itb-berlin",
  "klaxcar-automechanika-frankfurt-am-main"
];

/* ============================================================================
   HOMEPAGE — GROUP BUILDS  (max 6, shown in this exact order on index.html)
   Add Group Build ids here when you're ready to feature them on the homepage.
============================================================================ */
const homepageGroupBuildIds = [
  // e.g. "group-build-01", "group-build-02", ...
];

/* ============================================================================
   PORTFOLIO PAGE — PINNED FIRST  (portfolio.html shows these first, in order,
   then every remaining project automatically).
============================================================================ */
const portfolioPinnedIds = [
  "betinvest-ice-barcelona",
  "makhno-isaloni-euroluce",
  "toshiba-standpoint",
  "standpoint-euroshop",
  "fujairah-itb-berlin",
  "klaxcar-automechanika-frankfurt-am-main"
];

/* Expose to the page (do not edit). */
window.portfolioProjects     = portfolioProjects;
window.homepageCustomIds     = homepageCustomIds;
window.homepageGroupBuildIds = homepageGroupBuildIds;
window.portfolioPinnedIds    = portfolioPinnedIds;
