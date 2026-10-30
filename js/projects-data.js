// Plain-language project summaries for the Reports page.
// Each project: what it is, what got done (short, non-technical), and
// details (technical notes shown behind the "More details" button).
// `repo` matches a name in config/repos.json so "See activity" can filter the log.
window.EOYR_PROJECTS = [
  {
    id: 'pfas',
    name: 'PFAS / AB1200 Compliance',
    type: 'tools',
    typeLabel: 'Compliance',
    period: 'Sep 2026',
    url: 'https://www.corehome.com/ab1200',
    summary: 'A clear, searchable place on corehome.com showing which products meet California\'s PFAS rules.',
    wins: [
      'Rebuilt the compliance page so retailers and customers can find answers quickly',
      'Organized roughly 900 product, color and chemical records so they are easy to keep up to date',
      'Kept the old version saved as a backup'
    ],
    details: [
      'New /ab1200 page and modal in Webflow; previous page kept as an "AB1200 Legacy" draft',
      'New CMS collections: AB1200 Version 2 (209 items), AB1200 Colorways (378), Chemicals (36, with its own detail page)',
      'Existing AB1200 Products collection (275 items) kept in sync',
      '/pfas page SEO title and description refreshed (Jul 29)'
    ]
  },
  {
    id: 'corehome',
    name: 'corehome.com',
    type: 'tools',
    typeLabel: 'Company site',
    period: 'All year',
    url: 'https://www.corehome.com/brands',
    summary: 'Kept the company website current as brands and pages changed.',
    wins: [
      'Kept all 27 brand listings up to date',
      'Refreshed the home page and launched a New Ventures page',
      'Updated the Collaborate and Innovation pages'
    ],
    details: [
      'Brands CMS: 27 entries (26 live, Fizz in draft); last updated Oct 26',
      'Home page refreshed Oct 26; New Ventures page published Apr, updated Oct',
      'Collaborate and Innovation pages updated Jul; Homescreen Marquee collection added Mar'
    ]
  },
  {
    id: 'finish-library',
    name: 'Finish Library',
    type: 'tools',
    typeLabel: 'Internal tool',
    period: 'May to Jun 2026',
    url: 'https://core-home-finish-library.pages.dev/',
    repo: 'core-home-finish-library',
    summary: 'One shared web app where design teams pick a material and finish and see it in 3D, replacing spreadsheets and slide decks.',
    wins: [
      'Product Development and Industrial Design now work from the same visual source',
      'Loaded 108 factory finishes across ceramic, glass, steel and plastic',
      'Wrote a plain-English guide so anyone can use and maintain it'
    ],
    details: [
      'Three.js 3D preview with light/dark themes, finish wheel, graphics shelf and specs card',
      'Factory v3 spreadsheet import for ceramic, glass and plastic finishes',
      'Cloudflare Pages, Workers, D1, R2 and Access; deploys automatically from GitHub',
      '13-chapter project book; design by Maria T and Jacinta Correia'
    ]
  },
  {
    id: 'brooklyn-steel',
    name: 'Brooklyn Steel Co.',
    type: 'shopify',
    typeLabel: 'Shopify store',
    period: 'Nov 2025 to Oct 2026',
    url: 'https://brooklynsteelco.com',
    summary: 'Grew the store into espresso and coffee gear, then launched the Auto Pour Over.',
    wins: [
      'Launched the new store design and the PrecisionPour product (Oct 7)',
      'Added espresso machines, coffee blends, mugs and a full replacement parts range',
      'Added help pages: brew guides, care, registration and warranty'
    ],
    details: [
      'Live theme "Inova Dark - Auto Pour Over Launch" created Sep 25, edited Oct 8',
      'Talos 20 created Nov 2025, published Apr 2026; four coffee blends added Mar 26',
      'Replacement Parts range created Mar 17 (two more parts Oct 14)',
      '20 legacy 2022 cookware products archived (Jan to Mar 2026)',
      'Five help blogs with 12 articles; full dated log on the Shopify page'
    ],
    link: { href: 'shopify-changes.html#brooklyn-steel', label: 'Dated change log' }
  },
  {
    id: 'winslow-pantry',
    name: 'Winslow Pantry',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    url: 'https://winslowpantry.shop',
    repo: 'winslow-pantry',
    summary: 'A new brand website in English, Spanish and French, built to be easy for everyone to use.',
    wins: [
      'Launched the full site in three languages',
      'Passed an accessibility audit so it works with screen readers and for color-blind visitors',
      'Inquiries go straight to the sales inbox without exposing email addresses'
    ],
    details: [
      'Static site on a Cloudflare Worker; copy lives in per-language JSON files',
      'SEO on every page, share images per page and language, sitemap with language alternates',
      'axe WCAG 2.2 AA audit passing; reduced-motion and forced-colors support',
      'Password-protected internal style guide; GSAP motion; cache-busted assets'
    ]
  },
  {
    id: 'alder-meadow',
    name: 'Alder Meadow',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    repo: 'alder_meadow',
    url: 'https://github.com/core-home-web/alder_meadow',
    summary: 'A new brand website with product pages and a store finder, built from the brand guide.',
    wins: [
      'Built the site, shop and a page for every product',
      'Added a "find a store near you" feature ready for retailers',
      'Created a private brand style guide for the team'
    ],
    details: [
      'Static site on the alder-meadow Cloudflare Worker',
      'Product pages generated from one products file',
      'Store finder driven by a stores list; style guide behind Basic Auth'
    ]
  },
  {
    id: 'people-of-spice',
    name: 'People of Spice',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Sep 2025 to Oct 2026',
    url: 'https://peopleofspice.com',
    repo: 'people_of_spice',
    summary: 'Launched the brand site, then gave it a full 2026 redesign.',
    wins: [
      'Redesigned the site with an interactive world-of-spice globe',
      'Made recipes and spices easy to browse and link together',
      'Connected the site forms so leads land in one place'
    ],
    details: [
      '2026 redesign: World of Spice globe, Spice Rack, spice and recipe CMS, GSAP intro',
      'Forms connected to Airtable through Cloudflare Pages Functions; Google Analytics added',
      'SEO titles and descriptions on every page; 61 commits'
    ]
  },
  {
    id: 'pwrd',
    name: 'PWRD',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    repo: 'pwrd_website',
    url: 'https://github.com/SWFTstudios/pwrd_website',
    summary: 'A product site for the glitter headphones and LED charger stand, which link to Walmart.',
    wins: [
      'Made the headphones look 3D, and on phones they move as you tilt',
      'Added a color remote so shoppers can try every LED color',
      'Added a shop, support FAQ and a waitlist sign-up'
    ],
    details: [
      'WebGL 2.5D depth hero with tilt and shake on phones',
      'Glitter intro, page transitions and scroll reveals; reduced-motion respected',
      'LED stand color remote, shop carousel, lightbox gallery, official logo and favicon',
      'Waitlist API on a Cloudflare Worker with D1; 21 merged pull requests'
    ]
  },
  {
    id: 'fizz',
    name: 'Fizz',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'May to Oct 2026',
    repo: 'fizz_website',
    url: 'https://github.com/SWFTstudios/fizz_website',
    summary: 'Brand website with an animated intro, shipped and refined over several rounds.',
    wins: [
      'Built and launched the site',
      'Tried and shipped several intro designs in October',
      'Added share images for social links'
    ],
    details: ['Cloudflare Workers: fizz-website, fizz-final, fizz-intro-dark, fizz-float-intro, fizz-seo-og']
  },
  {
    id: 'medici',
    name: 'Medici',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Jun 2026',
    repo: 'medici-home',
    summary: 'Brand website for Medici home textiles.',
    details: ['Cloudflare Worker medici-home (created Jun 2); private repository']
  },
  {
    id: 'render-portal',
    name: 'Render Portal',
    type: 'tools',
    typeLabel: 'Internal tool',
    repo: 'core_render_portal',
    url: 'https://core-render-portal.vercel.app/',
    summary: 'Lets teams request and track 3D product renders in one place.',
    details: ['Hosted on Vercel']
  },
  { id: 'manna', name: 'Manna Hydration', type: 'shopify', typeLabel: 'Shopify store', url: 'https://mannahydration.com/', repo: 'manna-hydration', summary: 'Drinkware store. Dated change log coming once store access is connected.' },
  { id: 'tal', name: 'TAL Hydration', type: 'shopify', typeLabel: 'Shopify store', url: 'https://talhydration.com/', summary: 'Water bottles and tumblers store. Dated change log coming once store access is connected.' },
  { id: 'thyme', name: 'Thyme & Table', type: 'shopify', typeLabel: 'Shopify store', url: 'https://shopthymeandtable.com/', repo: 'thyme-and-table', summary: 'Kitchen and home store. Dated change log coming once store access is connected.' },
  { id: 'hydragear', name: 'Hydragear Bottle', type: 'sites', typeLabel: 'Brand site', url: 'https://hydragearbottle.com', repo: 'hydragearbottle_website', summary: 'Insulated bottle brand site.' },
  { id: 'spice-st', name: 'Spice St Market', type: 'sites', typeLabel: 'Brand site', url: 'https://spicestmarket.com', repo: 'spice-st-market', summary: 'Curated spice packs for home cooks.' },
  { id: 'outlaw', name: 'Outlaw Spice', type: 'sites', typeLabel: 'Brand site', url: 'https://outlawspice.com', repo: 'outlaw_spice', summary: 'Bold BBQ and grilling seasonings.' },
  { id: 'roam', name: 'Roam & Repeat', type: 'sites', typeLabel: 'Brand site', repo: 'roam-and-repeat', summary: 'Travel lifestyle brand site.' },
  { id: 'grand-savonnerie', name: 'Grand Savonnerie', type: 'sites', typeLabel: 'Brand site', repo: 'grand-savonnerie', summary: 'Soap and bath brand site.' },
  { id: 'scribble', name: 'Scribble & Scribe', type: 'sites', typeLabel: 'Brand site', repo: 'scribble-and-scribe', summary: 'Stationery brand site.' }
];
