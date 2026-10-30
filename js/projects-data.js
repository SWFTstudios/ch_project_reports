// Project content for the Reports site: home page cards, the menu slider
// and the project detail page (project.html?id=...).
//
// Fields
//   summary   one plain sentence: what the project is
//   wins      "What got done": short, non-technical outcomes
//   advanced  "Advanced details": how it works, in understandable terms
//   thumb     screenshot in images/thumbs/ (a title tile is drawn when missing)
//   repo      name in config/repos.json, so the activity log can filter to it
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
    advanced: [
      { title: 'Why it matters', text: 'California\'s AB1200 law requires cookware brands to disclose certain chemicals, including PFAS. Buyers and retailers check this page, so it has to be accurate and easy to search.' },
      { title: 'How the content is organized', text: 'Instead of one long page, the information lives in four connected lists in Webflow\'s content system: products (209 in the new version), colorways (378), chemicals (36, each with its own page) and the original product list (275). Updating a product in one place updates it everywhere it appears.' },
      { title: 'Safe rollout', text: 'The new /ab1200 page and pop-up were built alongside the old one. The previous page is kept as a draft ("AB1200 Legacy"), so it can be restored in minutes if needed.' },
      { title: 'Search visibility', text: 'The /pfas page title and description were rewritten (Jul 29) so it shows up clearly when people search for Core Home and PFAS.' }
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
    advanced: [
      { title: 'Brand directory', text: 'Each brand is one entry in a Webflow content list with its summary, logo, images, links and contact email. There are 27 entries today (26 live, Fizz waiting as a draft). The Brands page and every brand detail page build themselves from that list.' },
      { title: 'Page updates', text: 'Home page refreshed Oct 26. New Ventures page published in April and updated in October. Collaborate and Innovation pages updated in July, and a rotating image strip for the home page was added in March.' }
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
    advanced: [
      { title: 'What you see', text: 'Pick a material tab, scroll a wheel of finishes, choose a graphic, and a 3D preview updates live. A specs card shows durability, cost and notes for the selected finish.' },
      { title: 'Where the data comes from', text: 'The factory\'s finish spreadsheet is imported by a script into a database, so new finishes can be added without editing code. A built-in copy of the catalog means the app still works if the database is offline.' },
      { title: 'How it runs', text: 'Hosted on Cloudflare (Pages for the site, Workers for the API, D1 database, R2 file storage, Access for sign-in). Every change merged on GitHub deploys automatically.' },
      { title: 'Documentation', text: 'A 13-chapter project book explains purpose, daily use, setup and roadmap for both non-technical and technical readers. UI design by Maria T and Jacinta Correia.' }
    ]
  },
  {
    id: 'brooklyn-steel',
    name: 'Brooklyn Steel Co.',
    type: 'shopify',
    typeLabel: 'Shopify store',
    period: 'Nov 2025 to Oct 2026',
    url: 'https://brooklynsteelco.com',
    thumb: 'images/thumbs/brooklyn-steel.webp',
    summary: 'Grew the store into espresso and coffee gear, then launched the Auto Pour Over.',
    wins: [
      'Launched the new store design and the PrecisionPour product (Oct 7)',
      'Added espresso machines, coffee blends, mugs and a full replacement parts range',
      'Added help pages: brew guides, care, registration and warranty'
    ],
    advanced: [
      { title: 'Store design', text: 'The live theme, "Inova Dark - Auto Pour Over Launch", was created Sep 25 and last edited Oct 8. It is built on the Inova Dark theme started in February, with working copies saved in April and June so changes could be tested safely.' },
      { title: 'Product catalog', text: 'Talos 20 created Nov 2025 and published Apr 2026. Four coffee blends added Mar 26. A Replacement Parts range was created Mar 17, with two more parts added Oct 14. Twenty legacy 2022 cookware products were archived between January and March to keep the catalog focused.' },
      { title: 'Customer help', text: 'Brew Guides, Maintenance & Care, Espresso Machines, Registration and Warranty pages were created February to April, plus five help blogs with 12 articles.' }
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
    thumb: 'images/thumbs/winslow-pantry.webp',
    summary: 'A new brand website in English, Spanish and French, built to be easy for everyone to use.',
    wins: [
      'Launched the full site in three languages',
      'Passed an accessibility audit so it works with screen readers and for color-blind visitors',
      'Inquiries go straight to the sales inbox without exposing email addresses'
    ],
    advanced: [
      { title: 'Three languages from one source', text: 'All the words on the site live in one file per language. Adding a new language means adding one file; anything not yet translated falls back to English.' },
      { title: 'Built for everyone', text: 'The site passes an automated WCAG 2.2 AA accessibility audit. Meaning is never shown by color alone, keyboard focus is always visible, and animation is turned off for visitors who prefer less motion.' },
      { title: 'Findable on search', text: 'Every page has its own title, description and share image in each language, plus a sitemap that tells search engines about all three language versions.' },
      { title: 'Protected email and style guide', text: 'Contact buttons send people to the sales inbox through the server, so the address never appears in the page code for spam bots to collect. The internal brand style guide is password protected.' }
    ]
  },
  {
    id: 'alder-meadow',
    name: 'Alder Meadow',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    repo: 'alder_meadow',
    url: 'https://alder-meadow.elombe.workers.dev',
    thumb: 'images/thumbs/alder-meadow.webp',
    summary: 'A new brand website with product pages and a store finder, built from the brand guide.',
    wins: [
      'Built the site, shop and a page for every product',
      'Added a "find a store near you" feature ready for retailers',
      'Created a private brand style guide for the team'
    ],
    advanced: [
      { title: 'Product pages that build themselves', text: 'Every product page is generated from one product list. Adding a product to the list creates its page, gallery, specs and care notes automatically.' },
      { title: 'Store finder', text: 'Retail locations come from a simple stores list. Until retailers are added it shows a friendly "coming soon" message, and each product can later get a Buy Online button.' },
      { title: 'Hosting and privacy', text: 'Served by a Cloudflare Worker. The internal style guide is hidden from search engines and behind a password.' }
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
    thumb: 'images/thumbs/people-of-spice.webp',
    summary: 'Launched the brand site, then gave it a full 2026 redesign.',
    wins: [
      'Redesigned the site with an interactive world-of-spice globe',
      'Made recipes and spices easy to browse and link together',
      'Connected the site forms so leads land in one place'
    ],
    advanced: [
      { title: '2026 redesign', text: 'A darker, richer look with an animated intro, an interactive World of Spice globe and a Spice Rack page. A "Meet the blends" dial lets visitors swipe through spices on the home page.' },
      { title: 'Recipes and spices linked', text: 'Spices and recipes are managed as content, so each spice links to the recipes that use it and every recipe links back to its spices.' },
      { title: 'Forms and analytics', text: 'Site forms send submissions to Airtable through Cloudflare, with automatic reply emails, and Google Analytics tracks visits. 61 updates since launch.' }
    ]
  },
  {
    id: 'pwrd',
    name: 'PWRD',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    repo: 'pwrd_website',
    url: 'https://pwrd-website.elombe.workers.dev',
    thumb: 'images/thumbs/pwrd.webp',
    summary: 'A product site for the glitter headphones and LED charger stand, which link to Walmart.',
    wins: [
      'Made the headphones look 3D, and on phones they move as you tilt',
      'Added a color remote so shoppers can try every LED color',
      'Added a shop, support FAQ and a waitlist sign-up'
    ],
    advanced: [
      { title: 'A 3D look from flat photos', text: 'The product photos are flat, so a depth map tells the browser which parts are closer. As you move the mouse or tilt your phone, the image shifts to look three-dimensional and the glitter sparkles.' },
      { title: 'Try every color', text: 'The LED stand page uses 17 real photos of the lit stand. A remote control blends between them so shoppers see each actual color, with the power cable removed from the photos.' },
      { title: 'Motion with care', text: 'A glitter intro, page transitions and scroll animations, all skipped automatically for visitors who prefer reduced motion.' },
      { title: 'Waitlist', text: 'Sign-ups are saved in a Cloudflare database and can be downloaded as a spreadsheet. 21 merged updates in October.' }
    ]
  },
  {
    id: 'fizz',
    name: 'Fizz',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'May to Oct 2026',
    repo: 'fizz_website',
    url: 'https://fizz-final.elombe.workers.dev',
    thumb: 'images/thumbs/fizz.webp',
    summary: 'Marketing site for portable sparkling water bottles, with a shop and an interactive explore page.',
    wins: [
      'Built and launched the site',
      'Tried and shipped several intro designs in October',
      'Added share images for social links'
    ],
    advanced: [
      { title: 'Rebuilt from Webflow', text: 'The site was rebuilt from the Webflow design into a fast static site served by a Cloudflare Worker ("fizz-final").' },
      { title: 'Interactive pages', text: 'Home page slider and scrolling animations, an Explore page that moves through 3D space as you scroll, smooth page-to-page transitions, and a shop carousel for bottles and flavors.' },
      { title: 'Iterations', text: 'Several intro variations (including dark and floating versions) were built and compared on their own Workers in October before the final choice.' }
    ]
  },
  {
    id: 'roam',
    name: 'Roam & Repeat',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Oct 2026',
    repo: 'roam-and-repeat',
    url: 'https://roamandrepeat.elombe.workers.dev',
    thumb: 'images/thumbs/roam.webp',
    summary: 'Rebuilt the travel brand\'s site to load far faster while keeping its look.',
    wins: [
      'Cut the page weight by about 96%, so it loads quickly on phones',
      'Kept the cloud animation, image reveals and photo gallery'
    ],
    advanced: [
      { title: 'Lighter and faster', text: 'The original Webflow site sent over 16 MB of files. The rebuild sends about 0.6 MB on a phone by resizing images to modern formats, self-hosting a trimmed font and removing heavy scripts.' },
      { title: 'Accessible', text: 'Keyboard-friendly navigation and gallery, and reduced motion respected.' }
    ]
  },
  {
    id: 'medici',
    name: 'Medici',
    type: 'sites',
    typeLabel: 'Brand site',
    period: 'Jun 2026',
    repo: 'medici-home',
    url: 'https://medici-home.elombe.workers.dev',
    summary: 'A Renaissance-inspired portfolio site for Medici home.',
    advanced: [
      { title: 'How it was built', text: 'Designed in Google Stitch, then turned into a site by scripts that generate the styles and pages. Served by a Cloudflare Worker (private repository).' }
    ]
  },
  {
    id: 'render-portal',
    name: 'Render Portal',
    type: 'tools',
    typeLabel: 'Internal tool',
    repo: 'core_render_portal',
    url: 'https://core-render-portal.vercel.app/',
    thumb: 'images/thumbs/render-portal.webp',
    summary: 'Lets teams request and track 3D product renders in one place.'
  },
  { id: 'manna', name: 'Manna Hydration', type: 'shopify', typeLabel: 'Shopify store', url: 'https://mannahydration.com/', repo: 'manna-hydration', thumb: 'images/thumbs/manna.webp', summary: 'Drinkware store. Dated change log coming once store access is connected.' },
  { id: 'tal', name: 'TAL Hydration', type: 'shopify', typeLabel: 'Shopify store', url: 'https://talhydration.com/', thumb: 'images/thumbs/tal.webp', summary: 'Water bottles and tumblers store. Dated change log coming once store access is connected.' },
  { id: 'thyme', name: 'Thyme & Table', type: 'shopify', typeLabel: 'Shopify store', url: 'https://shopthymeandtable.com/', repo: 'thyme-and-table', thumb: 'images/thumbs/thyme.webp', summary: 'Kitchen and home store. Dated change log coming once store access is connected.' },
  { id: 'hydragear', name: 'Hydragear Bottle', type: 'sites', typeLabel: 'Brand site', url: 'https://hydragearbottle.com', repo: 'hydragearbottle_website', summary: 'Insulated bottle brand site.' },
  { id: 'spice-st', name: 'Spice St Market', type: 'sites', typeLabel: 'Brand site', url: 'https://spicestmarket.com', repo: 'spice-st-market', summary: 'Curated spice packs for home cooks.' },
  { id: 'outlaw', name: 'Outlaw Spice', type: 'sites', typeLabel: 'Brand site', url: 'https://outlawspice.com', repo: 'outlaw_spice', summary: 'Bold BBQ and grilling seasonings.' },
  { id: 'grand-savonnerie', name: 'Grand Savonnerie', type: 'sites', typeLabel: 'Brand site', repo: 'grand-savonnerie', summary: 'Soap and bath brand site.' },
  { id: 'scribble', name: 'Scribble & Scribe', type: 'sites', typeLabel: 'Brand site', repo: 'scribble-and-scribe', summary: 'Stationery brand site.' }
];
