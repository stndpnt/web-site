/* ============================================================================
   STANDPOINT — PORTFOLIO DATA
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO MANAGE THE PORTFOLIO.
   No coding knowledge required — just copy a block and change the text.

   Step-by-step, non-technical version: see HOW-TO-ADD-PORTFOLIO-PROJECT.md

   ────────────────────────────────────────────────────────────────────────
   HOW TO ADD A NEW PROJECT
   ────────────────────────────────────────────────────────────────────────
   1) Create a folder for it (numbers are just for tidiness — they do NOT
      control the order on the website):

         assets/portfolio/custom/50-acme-some-expo/
         assets/portfolio/group-builds/08-acme-some-expo/

      Use lowercase Latin letters and hyphens instead of spaces (no Cyrillic,
      no spaces, no capitals).

   2) Put numbered images inside that folder:

         01.webp   ← cover / preview image AND the first lightbox image
         02.webp
         03.webp
         ...

      Do NOT use cover.webp. 01.webp is always the cover.
      The numbers MUST be gapless: 01, 02, 03 … with nothing missing.
      A gap (e.g. 01, 03, 04) hides images and breaks the lightbox, and the
      validator below will refuse to generate the page.

   3) Add one block to the `portfolioProjects` list below:

         {
           id: "acme-some-expo",                 // unique, lowercase-with-hyphens; also the page URL
           title: "Acme",                        // shown on the card and as the H1
           exhibition: "Some Expo",              // shown on the card (leave "" if none)
           description: "One or two paragraphs.", // OPTIONAL — shown on the project page only.
                                                 // Omit it or use "" and nothing is rendered.
                                                 // Use \n\n between paragraphs.
           category: "custom",                   // "custom" OR "group"
           folder: "assets/portfolio/custom/50-acme-some-expo",
           ext: "webp",                          // image extension (defaults to "jpg")
           imageCount: 3                         // how many NN.<ext> files are in the folder
         },

   4) Generate the project page (the website's cards and lightbox update on
      their own; only the individual page needs generating):

         node scripts/generate-portfolio-pages.js --check
         node scripts/generate-portfolio-pages.js --project acme-some-expo

      or, equivalently:  npm run portfolio:check
                         npm run portfolio:project -- acme-some-expo
                         npm run portfolio:all      (regenerates every page)

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
    description: "A bold, open custom exhibition stand built around Betinvest’s black-and-yellow visual identity. The architecture combines a prominent circular overhead feature with illuminated branding, a distinctive backlit vertical screen and strong visibility from the main aisles. Interactive terminals and presentation screens support product demonstrations, while reception counters, informal bar seating, a private meeting space and a separate lounge create several levels of visitor engagement. Integrated lighting, graphic details and live greenery add depth to the otherwise highly graphic, technology-driven environment.",
    category: "custom",
    folder: "assets/portfolio/custom/01-betinvest-ice-barcelona",
    ext: "webp",
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
    description: "An atmospheric exhibition environment created around sculptural objects, lighting and texture rather than conventional corporate branding. A large overhead volume defines the central space, while suspended forms, low plinths, a deep-relief feature wall and a curved partition create an immersive gallery-like setting. The restrained earth-toned palette and low, warm lighting allow the exhibited pieces to become part of the architecture itself. A long communal table and informal seating add a functional layer without disrupting the installation-like character of the stand.",
    category: "custom",
    folder: "assets/portfolio/custom/02-makhno-isaloni-euroluce",
    ext: "webp",
    imageCount: 9
  },
  {
    id: "toshiba-standpoint",
    title: "Toshiba",
    exhibition: "",
    description: "A dynamic custom exhibition stand built around Toshiba’s strong red-and-white identity and large sweeping architectural curves. The open corner layout combines a prominent overhead branded fascia with sculptural ribbon-like forms that create a recognisable visual landmark in the hall. Dedicated equipment demonstration areas allow visitors to interact directly with medical technology, supported by presentation screens and informal meeting points. Curved counters, integrated lighting and partner branding complete a bright, structured environment focused on product demonstration and professional communication.",
    category: "custom",
    folder: "assets/portfolio/custom/03-toshiba",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "standpoint-euroshop",
    title: "StandPoint",
    exhibition: "EuroShop",
    description: "StandPoint’s EuroShop stand was conceived as a visual transformation in motion. From most angles, the central installation reads as an abstract composition of fragmented geometric forms. As visitors move along the stand, the elements gradually align until, from one precise viewpoint, they form a face — the StandPoint logo.\n\nThe concept makes the visitor’s movement part of the stand itself, turning perspective into an interactive visual experience. Black reflective surfaces, orange and yellow accents and fine linear lighting reinforce the fragmented geometry throughout the space.",
    category: "custom",
    folder: "assets/portfolio/custom/04-euroshop",
    ext: "webp",
    imageCount: 7
  },
  {
    id: "fujairah-itb-berlin",
    title: "Fujairah",
    exhibition: "ITB Berlin",
    description: "A two-level exhibition stand created for the presentation of Fujairah as a destination and investment location. The predominantly white architecture combines an upper deck, prominent destination branding and a large multi-screen presentation area with a series of illuminated information stations positioned along the open frontage. Decorative Arabic calligraphy introduces a distinctive regional identity throughout the space. The stand also includes a private conference room and a separate hospitality lounge, allowing public destination presentation and more formal business meetings to take place within one environment.",
    category: "custom",
    folder: "assets/portfolio/custom/05-fujairah-itb-berlin",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "klaxcar-automechanika-frankfurt-am-main",
    title: "Klaxcar",
    exhibition: "Automechanika Frankfurt am Main",
    description: "A two-level custom exhibition stand combining product presentation on the ground floor with quieter meeting and hospitality spaces above. The upper deck is defined by a distinctive curved edge and continuous glazing, giving the stand a softer architectural profile while preserving strong visibility across the hall. Klaxcar’s blue-and-white identity is reinforced through faceted graphics, illuminated product displays and branded plinths for individual automotive components. A large reception counter anchors the open frontage, while the upper level provides lounge seating and dedicated areas for business conversations.",
    category: "custom",
    folder: "assets/portfolio/custom/06-klaxcar-automechanika",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "auditorium-2-interior-mebel",
    title: "Auditorium 2",
    exhibition: "Interior Mebel",
    category: "custom",
    folder: "assets/portfolio/custom/07-auditorium-2-interior-mebel",
    ext: "webp",
    imageCount: 21
  },
  {
    id: "ukroboronprom-eurosatory-paris",
    title: "UkrOboronProm",
    exhibition: "Eurosatory Paris",
    category: "custom",
    folder: "assets/portfolio/custom/08-ukroboronprom-eurosatory-paris",
    ext: "webp",
    imageCount: 6
  },
  {
    id: "ste-eurosatory",
    title: "Spets Techno Export",
    exhibition: "Eurosatory",
    category: "custom",
    folder: "assets/portfolio/custom/09-ste-eurosatory",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "triel-tek",
    title: "Triel",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/10-triel-tek",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "swerige-rebuild-ukraine",
    title: "Sweden — Sverige",
    exhibition: "Rebuild Ukraine",
    category: "custom",
    folder: "assets/portfolio/custom/11-swerige-rebuild-ukraine",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "sklad-servise-promforum",
    title: "Sklad Service",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/12-sklad-servise-promforum",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "helios-promforum",
    title: "Helios Strategia",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/13-helios-promforum",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "machentech-promforum",
    title: "Machentech",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/14-machintech-promforum",
    ext: "webp",
    imageCount: 9
  },
  {
    id: "dalgakiran-promforum",
    title: "Dalgakiran",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/15-dalgakiran-promforum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "alista-promforum",
    title: "Alista",
    exhibition: "PromForum",
    category: "custom",
    folder: "assets/portfolio/custom/16-alista-promforum",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "interior-mebel-2013",
    title: "Interior Mebel",
    exhibition: "Interior Mebel 2013",
    category: "custom",
    folder: "assets/portfolio/custom/17-interior-mebel-2013",
    ext: "webp",
    imageCount: 10
  },
  {
    id: "interior-mebel-2016",
    title: "Interior Mebel",
    exhibition: "Interior Mebel 2016",
    category: "custom",
    folder: "assets/portfolio/custom/18-interior-mebel-2016",
    ext: "webp",
    imageCount: 11
  },
  {
    id: "eurovision-2017-standpoint",
    title: "Eurovision Song Contest",
    exhibition: "Kyiv 2017",
    category: "custom",
    folder: "assets/portfolio/custom/19-eurovision-2017",
    ext: "webp",
    imageCount: 17
  },
  {
    id: "tetmed-public-health-dental",
    title: "Tetmed",
    exhibition: "Public Health / Dental",
    category: "custom",
    folder: "assets/portfolio/custom/20-tetmed-public-health-dental",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "summands-intersharm",
    title: "Summands",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/21-summands-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "pastel-intersharm",
    title: "Pastel Cosmetics",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/22-pastel-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "multicolor-intersharm",
    title: "Multicolor",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/23-multicolor-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "malevich-intersharm",
    title: "Malevich",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/24-malevich-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "macro-intersharm",
    title: "macrO",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/25-macro-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "kvkv-intersharm",
    title: "krkr",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/26-kvkv-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "gemely-intersharm",
    title: "Gémely",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/27-gemely-intersharm",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "edlen-intersharm",
    title: "Edlen Professional",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/28-edlen-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "cef-lab-intersharm",
    title: "CEF Lab",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/29-cef-lab-intersharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "pounds-worldfood",
    title: "32 Pounds",
    exhibition: "WorldFood Ukraine",
    category: "custom",
    folder: "assets/portfolio/custom/30-pounds-worldfood",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "ksenko-public-health-dental",
    title: "\u041a\u0441\u0435\u043d\u043a\u043e",
    exhibition: "Public Health / Dental",
    category: "custom",
    folder: "assets/portfolio/custom/31-ksenko-public-health-dental",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "barilla-worldfood",
    title: "Barilla",
    exhibition: "WorldFood Ukraine",
    category: "custom",
    folder: "assets/portfolio/custom/32-barilla-worldfood",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "empirica-public-health-dental",
    title: "Empirica Medical Company",
    exhibition: "Public Health / Dental",
    category: "custom",
    folder: "assets/portfolio/custom/33-empirica-public-health-dental",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "flow-of-beauty-intersharm",
    title: "Flow of Beauty",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/34-flow-of-beauty-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "forvarmed-public-health-dental",
    title: "Forvardmed",
    exhibition: "Public Health / Dental",
    category: "custom",
    folder: "assets/portfolio/custom/35-forvarmed-public-health-dental",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "hadewe-intersharm",
    title: "Hadewe",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/36-hadewe-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "hedonic-intersharm",
    title: "Hedonic",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/37-hedonic-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "marvis-intersharm",
    title: "Marvis",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/38-marvis-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "nct-public-health-dental",
    title: "NCT",
    exhibition: "Public Health / Dental",
    category: "custom",
    folder: "assets/portfolio/custom/39-nct-public-health-dental",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "proraso-intersharm",
    title: "Proraso",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/40-proraso-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "smart-4-derma-intersharm",
    title: "Smart 4 Derma",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/41-smart-4-derma-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "acme-intersharm",
    title: "ACME",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/42-acme-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "you-are-cute-intersharm",
    title: "You Are Cute",
    exhibition: "Intersharm",
    category: "custom",
    folder: "assets/portfolio/custom/43-you-are-cute-intersharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "karcher-standpoint",
    title: "K\u00e4rcher",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/44-karcher",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "kinderclub-standpoint",
    title: "Kinder Club",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/45-kinderclub",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "kollerpool-standpoint",
    title: "Koller Pool",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/46-kollerpool",
    ext: "webp",
    imageCount: 10
  },
  {
    id: "korf-standpoint",
    title: "Korf",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/47-korf",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "greece-standpoint",
    title: "Greece",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/48-greece",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "georgia-standpoint",
    title: "Georgia",
    exhibition: "StandPoint",
    category: "custom",
    folder: "assets/portfolio/custom/49-georgia",
    ext: "webp",
    imageCount: 1
  },

  /* ===========================  GROUP BUILDS  ===========================
     These six folders already contain real photos on disk. Rename the folders
     and update title/exhibition/id whenever you have the real project info. */
  {
    id: "modular-brand-stands",
    title: "Modular Brand Stands",
    exhibition: "",
    description: "A Black Point group-build configuration designed for multiple exhibitors presented within one coordinated exhibition area. The shared modular framework creates visual consistency across the entire row of stands, while individual back-wall colours, graphics, counters and branding allow every participating company to remain clearly identifiable. Open frontages keep the area accessible and easy to navigate, while compact seating and presentation points can be adapted to each exhibitor’s needs. The result is a unified exhibition environment without making every stand look identical.",
    category: "group",
    folder: "assets/portfolio/group-builds/01-modular-brand-stands",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "showcase-stand",
    title: "Showcase Stand",
    exhibition: "",
    description: "A clean Black Point corner configuration designed for products that need structured display space rather than large-scale architecture. The neutral modular framework can be equipped with tall and low showcases, shelving, focused lighting and a compact meeting point while keeping the stand open and visually uncluttered. Branding can be applied to the wall panels and corner totems, including long company names and stand numbers. This configuration works particularly well for jewellery, accessories, technical products, samples and other exhibits that benefit from organised, illuminated display.",
    category: "group",
    folder: "assets/portfolio/group-builds/02-showcase-stand",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "retail-stand",
    title: "Retail Stand",
    exhibition: "",
    description: "A compact Black Point configuration combining product display, digital presentation and a one-to-one meeting area within a small corner stand. Glass showcases provide organised space for smaller products, while wall graphics, a presentation screen and branded display elements make the exhibitor clearly visible from the aisle. Floor colour and graphics can be adapted to the individual brand, allowing the same modular framework to take on a very different visual identity. It is a practical format for brands that need both display capacity and a professional space for direct conversations with visitors.",
    category: "group",
    folder: "assets/portfolio/group-builds/03-retail-stand",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "gaming-stand",
    title: "Gaming Stand",
    exhibition: "",
    description: "Black Point can also be configured for industries where equipment, screens and lighting become part of the stand experience. In this gaming-oriented setup, darker wall panels, glazed sections, illuminated counters and open demonstration areas support different types of gaming equipment and visitor interaction. The modular framework accommodates large powered displays, table-game areas, hospitality seating and branded graphics while maintaining a coherent structure across neighbouring exhibitors. Individual lighting and floor treatments allow each stand to develop its own atmosphere within the shared group-build system.",
    category: "group",
    folder: "assets/portfolio/group-builds/04-gaming-stand",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "presentation-area",
    title: "Presentation Area",
    exhibition: "",
    description: "A deliberately open Black Point configuration for exhibitors whose products need to occupy most of the stand floor. With minimal built-in elements, the modular framework provides branding, lighting and a clear stand boundary while leaving the central area free for product presentation. Wall graphics or repeated banners can be added without reducing usable floor space, and a small meeting point can be incorporated at the perimeter. This approach works particularly well for furniture, equipment and other physical products that need to be seen, tested or compared directly on the stand.",
    category: "group",
    folder: "assets/portfolio/group-builds/05-presentation-area",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "food-display-stand",
    title: "Food Display Stand",
    exhibition: "",
    description: "A Black Point corner configuration adapted for packaged food and consumer-product presentation. A projecting showcase creates a strong visual point at the aisle, while wall graphics, a presentation screen and additional product displays provide several ways to communicate the brand and range. A compact seated meeting area can be incorporated without taking significant space away from the display. The modular framework allows graphics, flooring and product furniture to be customised for the exhibitor while maintaining the consistent structure required for larger group-build exhibition areas.",
    category: "group",
    folder: "assets/portfolio/group-builds/06-food-display-stand",
    ext: "webp",
    imageCount: 1
  },

  /* ==================  CUSTOM STANDS — IMPORT BATCH 50–162  ==================
     113 projects imported from StandPoint_portfolio_manifest_50-162.xlsx and
     portfolio-webp-structure-from-50.txt (import numbers 50–162; the numeric
     prefix stays in the SOURCE FOLDER name only — public URLs use the plain
     slug, e.g. /portfolio/siemens/).

     `exhibition` is intentionally empty where the manifest gave none — nothing
     is invented and nothing is rendered for a blank value.

     Image folders are declared here before the .webp files are uploaded. Until
     the files land, cards and project pages show the normal "Image coming soon"
     placeholder; no layout breaks. Create the empty folders with:
         node scripts/prepare-portfolio-folders.js
  ========================================================================== */

  {
    id: "bergner",
    title: "Bergner",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/50-bergner",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "athlants",
    title: "Athlants",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/51-athlants",
    ext: "webp",
    imageCount: 10
  },
  {
    id: "siemens",
    title: "Siemens",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/52-siemens",
    ext: "webp",
    imageCount: 9
  },
  {
    id: "minenergo",
    title: "Minenergo",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/53-minenergo",
    ext: "webp",
    imageCount: 16
  },
  {
    id: "tece",
    title: "TECE",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/54-tece",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "spaland",
    title: "Spaland",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/55-spaland",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "spain",
    title: "Spain",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/56-spain",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "siragroup",
    title: "Sira Group",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/57-siragroup",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "tui",
    title: "TUI",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/58-tui",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "kraft-international-industrial-forum",
    title: "Kraft",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/59-kraft-international-industrial-forum",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "go-active-intercharm",
    title: "Go Active",
    exhibition: "InterCHARM",
    category: "custom",
    folder: "assets/portfolio/custom/60-go-active-intercharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "gross-aqua-therm",
    title: "Gross",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/61-gross-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "media-aqua-therm",
    title: "Media",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/62-media-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "smart4derma-intercharm-2025",
    title: "Smart4Derma",
    exhibition: "InterCHARM 2025",
    category: "custom",
    folder: "assets/portfolio/custom/63-smart4derma-intercharm-2025",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "schneider-tek",
    title: "Schneider",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/64-schneider-tek",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "helios-tek",
    title: "Helios",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/65-helios-tek",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "naftogas-tek",
    title: "Naftogas",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/66-naftogas-tek",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "buhler-worldfood",
    title: "Buhler",
    exhibition: "WorldFood",
    category: "custom",
    folder: "assets/portfolio/custom/67-buhler-worldfood",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "formula-probeauty",
    title: "Formula",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/68-formula-probeauty",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "aristo-probeauty",
    title: "Aristo",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/69-aristo-probeauty",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "gamma-probeauty",
    title: "Gamma",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/70-gamma-probeauty",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "nadel-probeauty",
    title: "Nadel",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/71-nadel-probeauty",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "skinon-probeauty",
    title: "SkinOn",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/72-skinon-probeauty",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "extract-probeauty",
    title: "Extract",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/73-extract-probeauty",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "btl-aesthetics-probeauty",
    title: "BTL Aesthetics",
    exhibition: "PRO BEAUTY EXPO",
    category: "custom",
    folder: "assets/portfolio/custom/74-btl-aesthetics-probeauty",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "proactive-skin-intercharm",
    title: "Proactive Skin",
    exhibition: "InterCHARM",
    category: "custom",
    folder: "assets/portfolio/custom/75-proactive-skin-intercharm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "itak-wf",
    title: "ITAK",
    exhibition: "WF",
    category: "custom",
    folder: "assets/portfolio/custom/76-itak-wf",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "spetsmash-tek",
    title: "Spetsmash",
    exhibition: "TEK",
    category: "custom",
    folder: "assets/portfolio/custom/77-spetsmash-tek",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "smc-international-industrial-forum",
    title: "SMC",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/78-smc-international-industrial-forum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "german-oilgasexpo",
    title: "German",
    exhibition: "Oil & Gas Expo",
    category: "custom",
    folder: "assets/portfolio/custom/79-german-oilgasexpo",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "ukroboronprom-arms-and-security",
    title: "Ukroboronprom",
    exhibition: "Arms and Security",
    category: "custom",
    folder: "assets/portfolio/custom/80-ukroboronprom-arms-and-security",
    ext: "webp",
    imageCount: 7
  },
  {
    id: "ukrinstal-aqua-therm",
    title: "Ukrinstal",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/81-ukrinstal-aqua-therm",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "termo-aqua-therm",
    title: "Termo",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/82-termo-aqua-therm",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "nova-aqua-therm",
    title: "Nova",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/83-nova-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "motoimpex-commutex",
    title: "Motoimpex",
    exhibition: "COMMUTEX",
    category: "custom",
    folder: "assets/portfolio/custom/84-motoimpex-commutex",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "lockheed-martin-arms-and-security",
    title: "Lockheed Martin",
    exhibition: "Arms and Security",
    category: "custom",
    folder: "assets/portfolio/custom/85-lockheed-martin-arms-and-security",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "kozaktools-international-industrial-forum",
    title: "Kozaktools",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/86-kozaktools-international-industrial-forum",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "kerui-oil-gas",
    title: "Kerui",
    exhibition: "Oil & Gas",
    category: "custom",
    folder: "assets/portfolio/custom/87-kerui-oil-gas",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "join-up-uitt",
    title: "Join UP",
    exhibition: "UITT",
    category: "custom",
    folder: "assets/portfolio/custom/88-join-up-uitt",
    ext: "webp",
    imageCount: 7
  },
  {
    id: "hispano-belux-cevisama",
    title: "Hispano Belux",
    exhibition: "Cevisama",
    category: "custom",
    folder: "assets/portfolio/custom/89-hispano-belux-cevisama",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "heiztechnik-aqua-therm",
    title: "Heiztechnik",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/90-heiztechnik-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "hakan-aqua-therm",
    title: "Hakan",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/91-hakan-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "graffiti-interbuild",
    title: "Graffiti",
    exhibition: "InterBuild",
    category: "custom",
    folder: "assets/portfolio/custom/92-graffiti-interbuild",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "germes-aqua-therm",
    title: "Germes",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/93-germes-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "demirdokum-aqua-therm",
    title: "Demirdokum",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/94-demirdokum-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "crocus-interbuild",
    title: "Crocus",
    exhibition: "InterBuild",
    category: "custom",
    folder: "assets/portfolio/custom/95-crocus-interbuild",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "convex-agritechnica",
    title: "Convex",
    exhibition: "Agritechnica",
    category: "custom",
    folder: "assets/portfolio/custom/96-convex-agritechnica",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "comap-aqua-therm",
    title: "Comap",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/97-comap-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "ceia-powtec",
    title: "CEIA",
    exhibition: "POWTECH",
    category: "custom",
    folder: "assets/portfolio/custom/98-ceia-powtec",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "carrello-babyexpo",
    title: "Carrello",
    exhibition: "Baby Expo",
    category: "custom",
    folder: "assets/portfolio/custom/99-carrello-babyexpo",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "berkeplastik-aquatherm",
    title: "Berke Plastik",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/100-berkeplastik-aquatherm",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "eldom-aqua-therm",
    title: "Eldom",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/101-eldom-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "marketlis-mtkt",
    title: "Marketlis",
    exhibition: "MTKT",
    category: "custom",
    folder: "assets/portfolio/custom/102-marketlis-mtkt",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "zorya-mashproekt-power-engineering-for-industry",
    title: "Zorya-Mashproekt",
    exhibition: "Power Engineering for Industry",
    category: "custom",
    folder: "assets/portfolio/custom/103-zorya-mashproekt-power-engineering-for-industry",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "varna-aqua-therm",
    title: "Varna",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/104-varna-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "varius-international-industrial-forum",
    title: "Varius",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/105-varius-international-industrial-forum",
    ext: "webp",
    imageCount: 6
  },
  {
    id: "ungs-oilgasexpo",
    title: "UNGS",
    exhibition: "Oil & Gas Expo",
    category: "custom",
    folder: "assets/portfolio/custom/106-ungs-oilgasexpo",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "ukrenergo-power-engineering-for-industry",
    title: "Ukrenergo",
    exhibition: "Power Engineering for Industry",
    category: "custom",
    folder: "assets/portfolio/custom/107-ukrenergo-power-engineering-for-industry",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "tabriz-inter-build-expo",
    title: "Tabriz",
    exhibition: "Inter Build Expo",
    category: "custom",
    folder: "assets/portfolio/custom/108-tabriz-inter-build-expo",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "stvol-arms-and-security",
    title: "Stvol",
    exhibition: "Arms and Security",
    category: "custom",
    folder: "assets/portfolio/custom/109-stvol-arms-and-security",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "smeg-interior-mebel",
    title: "SMEG",
    exhibition: "Interior Mebel",
    category: "custom",
    folder: "assets/portfolio/custom/110-smeg-interior-mebel",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "nova-vista-international-industry-of-optics",
    title: "Nova Vista",
    exhibition: "International Industry of Optics",
    category: "custom",
    folder: "assets/portfolio/custom/111-nova-vista-international-industry-of-optics",
    ext: "webp",
    imageCount: 8
  },
  {
    id: "new-style-budma-2022",
    title: "New Style",
    exhibition: "BUDMA 2022",
    category: "custom",
    folder: "assets/portfolio/custom/112-new-style-budma-2022",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "ministry-of-energy-and-coal-industry-of-ukraine-power-engineering-for-industry",
    title: "Ministry of Energy and Coal Industry of Ukraine",
    exhibition: "Power Engineering for Industry",
    category: "custom",
    folder: "assets/portfolio/custom/113-ministry-of-energy-and-coal-industry-of-ukraine-power-engineering-for-industry",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "mg-sia",
    title: "MG",
    exhibition: "SIA",
    category: "custom",
    folder: "assets/portfolio/custom/114-mg-sia",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "meibes-aqua-therm",
    title: "Meibes",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/115-meibes-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "maresto-forech",
    title: "Maresto",
    exhibition: "FORECH",
    category: "custom",
    folder: "assets/portfolio/custom/116-maresto-forech",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "lg-aqua-therm",
    title: "LG",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/117-lg-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "leitz-international-industrial-forum",
    title: "Leitz",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/118-leitz-international-industrial-forum",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "kuzny-arms-and-security",
    title: "Kuzny",
    exhibition: "Arms and Security",
    category: "custom",
    folder: "assets/portfolio/custom/119-kuzny-arms-and-security",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "kugel-international-industrial-forum",
    title: "Kugel",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/120-kugel-international-industrial-forum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "kompas-uitt",
    title: "Kompas",
    exhibition: "UITT",
    category: "custom",
    folder: "assets/portfolio/custom/121-kompas-uitt",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "koller-pool-aqua-therm",
    title: "Koller Pool",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/122-koller-pool-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "kaeser-international-industrial-forum",
    title: "Kaeser",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/123-kaeser-international-industrial-forum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "iscar-international-industrial-forum",
    title: "Iscar",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/124-iscar-international-industrial-forum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "ipst-international-dental-forum",
    title: "IPST",
    exhibition: "International Dental Forum",
    category: "custom",
    folder: "assets/portfolio/custom/125-ipst-international-dental-forum",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "india-uitt",
    title: "India",
    exhibition: "UITT",
    category: "custom",
    folder: "assets/portfolio/custom/126-india-uitt",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "grifre-fuel-and-energy-complex-of-ukraine",
    title: "Grifre",
    exhibition: "Fuel and Energy Complex of Ukraine",
    category: "custom",
    folder: "assets/portfolio/custom/127-grifre-fuel-and-energy-complex-of-ukraine",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "europan-electro-install",
    title: "Europan",
    exhibition: "Electro Install",
    category: "custom",
    folder: "assets/portfolio/custom/128-europan-electro-install",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "hosseven-aqua-therm",
    title: "Hosseven",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/129-hosseven-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "gsp-oil-gas-expo",
    title: "GSP",
    exhibition: "Oil & Gas Expo",
    category: "custom",
    folder: "assets/portfolio/custom/130-gsp-oil-gas-expo",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "great-britain-grain-technologies",
    title: "Great Britain",
    exhibition: "Grain Technologies",
    category: "custom",
    folder: "assets/portfolio/custom/131-great-britain-grain-technologies",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "formul-aqua-therm",
    title: "Formul",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/132-formul-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "fantacy-mood-leather-and-shoes",
    title: "FANTACY MOOD",
    exhibition: "Leather and Shoes",
    category: "custom",
    folder: "assets/portfolio/custom/133-fantacy-mood-leather-and-shoes",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "eurofresh-worldfood",
    title: "Eurofresh",
    exhibition: "WorldFood",
    category: "custom",
    folder: "assets/portfolio/custom/134-eurofresh-worldfood",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "estyle-leather-and-shoes",
    title: "Estyle",
    exhibition: "Leather and Shoes",
    category: "custom",
    folder: "assets/portfolio/custom/135-estyle-leather-and-shoes",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "ekoplastik-aqua-therm",
    title: "Ekoplastik",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/136-ekoplastik-aqua-therm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "ecobarry-anuga",
    title: "Ecobarry",
    exhibition: "Anuga",
    category: "custom",
    folder: "assets/portfolio/custom/137-ecobarry-anuga",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "durma-aqua-therm",
    title: "Durma",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/138-durma-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "dolya-arms-and-security",
    title: "Dolya",
    exhibition: "Arms and Security",
    category: "custom",
    folder: "assets/portfolio/custom/139-dolya-arms-and-security",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "dmk-intercharm",
    title: "DMK",
    exhibition: "InterCHARM",
    category: "custom",
    folder: "assets/portfolio/custom/140-dmk-intercharm",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "denimex-oilgasexpo",
    title: "Denimex",
    exhibition: "Oil & Gas Expo",
    category: "custom",
    folder: "assets/portfolio/custom/141-denimex-oilgasexpo",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "cryosystem-aqua-therm",
    title: "Cryosystem",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/142-cryosystem-aqua-therm",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "binzel-international-industrial-forum",
    title: "Binzel",
    exhibition: "International Industrial Forum",
    category: "custom",
    folder: "assets/portfolio/custom/143-binzel-international-industrial-forum",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "bausch-international-industrial-of-optics",
    title: "Bausch",
    exhibition: "International Industrial of Optics",
    category: "custom",
    folder: "assets/portfolio/custom/144-bausch-international-industrial-of-optics",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "b4g-gaming-industry",
    title: "B4G",
    exhibition: "Gaming Industry",
    category: "custom",
    folder: "assets/portfolio/custom/145-b4g-gaming-industry",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "ariston-aqua-therm",
    title: "Ariston",
    exhibition: "Aqua-Therm",
    category: "custom",
    folder: "assets/portfolio/custom/146-ariston-aqua-therm",
    ext: "webp",
    imageCount: 1
  },
  {
    id: "agrii-grain-technologies",
    title: "Agrii",
    exhibition: "Grain Technologies",
    category: "custom",
    folder: "assets/portfolio/custom/147-agrii-grain-technologies",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "advansys-gaming-industry",
    title: "Advansys",
    exhibition: "Gaming Industry",
    category: "custom",
    folder: "assets/portfolio/custom/148-advansys-gaming-industry",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "lainex",
    title: "Lainex",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/149-lainex",
    ext: "webp",
    imageCount: 4
  },
  {
    id: "aniplast",
    title: "Aniplast",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/150-aniplast",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "nestle",
    title: "Nestle",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/151-nestle",
    ext: "webp",
    imageCount: 9
  },
  {
    id: "hakan",
    title: "Hakan",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/152-hakan",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "fado",
    title: "Fado",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/153-fado",
    ext: "webp",
    imageCount: 7
  },
  {
    id: "euroestetgroup",
    title: "Euroestetgroup",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/154-euroestetgroup",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "egypt",
    title: "Egypt",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/155-egypt",
    ext: "webp",
    imageCount: 18
  },
  {
    id: "dubai",
    title: "Dubai",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/156-dubai",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "coral",
    title: "Coral",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/157-coral",
    ext: "webp",
    imageCount: 14
  },
  {
    id: "christina",
    title: "Christina",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/158-christina",
    ext: "webp",
    imageCount: 2
  },
  {
    id: "bigdutchman",
    title: "Big Dutchman",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/159-bigdutchman",
    ext: "webp",
    imageCount: 5
  },
  {
    id: "apimondia",
    title: "Apimondia",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/160-apimondia",
    ext: "webp",
    imageCount: 3
  },
  {
    id: "anex",
    title: "Anex",
    exhibition: "",
    category: "custom",
    folder: "assets/portfolio/custom/161-anex",
    ext: "webp",
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
  "modular-brand-stands",
  "showcase-stand",
  "retail-stand",
  "gaming-stand",
  "presentation-area",
  "food-display-stand"
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

/* ============================================================================
   INDIVIDUAL PROJECT URLS  (/portfolio/<slug>/)
   ----------------------------------------------------------------------------
   Every project gets its own permanent page at /portfolio/<slug>/. The slug
   defaults to the project's existing `id` (already unique + URL-safe), so
   nothing below needed to change for existing projects.

   To set a DIFFERENT, hand-picked URL for a project, add a `slug` field to
   its block above, e.g.  slug: "betinvest-ice-barcelona"  — once published,
   don't change it; the id/slug is what makes the URL permanent.

   The files portfolio/<slug>/index.html are GENERATED from this file by
   scripts/generate-portfolio-pages.js, using templates/portfolio-project.html.
   Don't edit them by hand — edit this file (or the template) and regenerate,
   otherwise your change is lost on the next run. */
function projectUrl(p) { return "portfolio/" + (p.slug || p.id) + "/index.html"; }
window.projectUrl = projectUrl;

/* Expose to the page (do not edit). */
window.portfolioProjects     = portfolioProjects;
window.homepageCustomIds     = homepageCustomIds;
window.homepageGroupBuildIds = homepageGroupBuildIds;
window.portfolioPinnedIds    = portfolioPinnedIds;
