// Product data for the three WAS collections: Sportswear, Streetwear and Jackets.
// Sportswear content comes from the WAS product catalogue.

export type Product = {
  code: string; // e.g. "WAS-101"
  slug: string; // e.g. "was-101"
  name: string; // short colourway name
  image: string;
};

export type DepartmentSlug = "sportswear" | "streetwear" | "jackets";

export type Category = {
  slug: string;
  department: DepartmentSlug;
  number: string; // position within its department, "01".."11"
  title: string; // "Football Uniforms"
  item: string; // singular product type shown as a tag, e.g. "Football Uniform"
  short: string; // short label used in menus
  tagline: string;
  description: string[]; // bullet list from catalogue
  printSizes?: { label: string; metric: string; imperial: string }[];
  printNote?: string;
  products: Product[];
};

/** Customisation options printed on every catalogue page. */
export const customOptions = [
  { key: "colour", label: "Custom Colour & Design" },
  { key: "numbers", label: "Names & Numbers" },
  { key: "logo", label: "Your Team Logo" },
  { key: "sizes", label: "Youth & Adult Sizes" },
] as const;

function p(prefix: number, n: number, name: string): Product {
  const code = `WAS-${prefix}${String(n).padStart(2, "0")}`;
  const slug = code.toLowerCase();
  return { code, slug, name, image: `/products/${slug}.webp` };
}

const sportswear: Omit<Category, "department">[] = [
  {
    slug: "football-uniforms",
    number: "01",
    title: "Football Uniforms",
    item: "Football Uniform",
    short: "Football",
    tagline: "Match kits built for ninety minutes and then some.",
    description: [
      "Material: 100% Polyester interlock with micro-mesh side panels",
      "Full sublimation print: colours, names, numbers and crests will not crack, peel or fade",
      "Moisture-wicking fabric with good draping, elasticity and dimensional stability",
      "Breathable and quick-drying, athletic cut for free movement",
      "Matching shorts with elastic waistband and inner drawcord",
      "Custom team names, numbers and sponsor logos available",
      "Machine wash cold, do not tumble dry",
    ],
    products: [
      p(1, 1, "Gold Body / Black Raglan"),
      p(1, 2, "Black Pinstripe / Gold Sleeve"),
      p(1, 3, "White / Gold Sash"),
      p(1, 4, "Gold Chevron / Black Sleeve"),
    ],
  },
  {
    slug: "basketball-uniforms",
    number: "02",
    title: "Basketball Uniforms",
    item: "Basketball Uniform",
    short: "Basketball",
    tagline: "Lightweight mesh sets cut for the full range of motion.",
    description: [
      "Material: 100% Polyester mesh with dazzle trim",
      "Sublimated team names, numbers and graphics, no cracking or peeling",
      "Wide armholes and lightweight build for full range of motion",
      "Rib-knit trim around neck and armholes keeps its shape",
      'Shorts with 2.5" elastic waistband, inner drawcord and side panels',
      "Breathable and quick-drying, reversible option available",
      "Machine wash, do not tumble dry",
    ],
    products: [
      p(2, 1, "Black / Gold Side Panel"),
      p(2, 2, "Gold-to-Black Fade"),
      p(2, 3, "White / Gold & Black Trim"),
      p(2, 4, "Black Geo / Gold Trim"),
    ],
  },
  {
    slug: "baseball-uniforms",
    number: "03",
    title: "Baseball Uniforms",
    item: "Baseball Uniform",
    short: "Baseball",
    tagline: "Full-button jerseys and knicker pants with classic piping.",
    description: [
      "Material: 100% Polyester with stitched or sublimated tackle twill names and numbers",
      "Full-button front with contrast piping and rounded drop-tail hem",
      "Moisture-wicking, breathable and quick-drying fabric",
      "Athletic cut with tagless collar for clean comfort",
      "Knicker pants with belt loops, elastic cuff and side stripe",
      "Custom script, team logos and player names available",
      "Machine wash, do not tumble dry",
    ],
    products: [
      p(3, 1, "White Pinstripe / Black Raglan"),
      p(3, 2, "Black / Gold Raglan"),
      p(3, 3, "Gold / Black Raglan"),
      p(3, 4, "Grey / Black Raglan"),
    ],
  },
  {
    slug: "softball-uniforms",
    number: "04",
    title: "Softball Uniforms",
    item: "Softball Uniform",
    short: "Softball",
    tagline: "Stretch-knit henley jerseys with fastpitch pants.",
    description: [
      "Material: 90% Polyester / 10% Spandex stretch knit",
      "Men's athletic cut with short sleeves and two-button henley neck",
      "Sublimated designs, names and numbers that will not fade or crack",
      "Moisture-wicking, breathable and quick-drying",
      "Low-rise fastpitch pants with belt loops and contrast piping",
      "Made in team colours with custom logos and numbers",
      "Machine wash, hang dry",
    ],
    products: [
      p(4, 1, "Gold Henley / White Pant"),
      p(4, 2, "Black Henley / Gold Trim"),
      p(4, 3, "White / Gold Sleeve"),
      p(4, 4, "Gold / Black Side Panel"),
    ],
  },
  {
    slug: "american-football-uniforms",
    number: "05",
    title: "American Football Uniforms",
    item: "American Football Uniform",
    short: "American Football",
    tagline: "Pro-cut jerseys made to sit over shoulder pads.",
    description: [
      "Material: 100% Polyester pro-cut knit with stretch side panels",
      "Built to fit over shoulder pads with reinforced shoulder area",
      "Sublimated or tackle twill numbers on front, back and shoulders",
      "Moisture-wicking and quick-drying for game day",
      "Game pants with integrated pad pockets, belt loops and side stripes",
      "Any team colours, logos and player names",
      "Machine wash, do not tumble dry",
    ],
    products: [
      p(5, 1, "Black Jersey / Gold Pant"),
      p(5, 2, "Gold Jersey / White Pant"),
      p(5, 3, "White Jersey / Black Pant"),
      p(5, 4, "Black & Gold / Black Pant"),
    ],
  },
  {
    slug: "ice-hockey-uniforms",
    number: "06",
    title: "Ice Hockey Uniforms",
    item: "Ice Hockey Uniform",
    short: "Ice Hockey",
    tagline: "Oversized air-knit jerseys with lace-up collars.",
    description: [
      "Material: 100% Polyester air-knit with mesh underarm gussets",
      "Oversized cut to fit over pads, with lace-up V-neck collar",
      "Sublimated crests, stripes, names and numbers",
      "Durable fabric resists snags and keeps its shape",
      "Matching padded hockey pant shells with elastic waist",
      "Fight strap and custom shoulder patches on request",
      "Machine wash cold, hang dry",
    ],
    products: [
      p(6, 1, "Black / Gold Stripes"),
      p(6, 2, "Gold / Black Stripes"),
      p(6, 3, "White / Gold & Black Stripes"),
      p(6, 4, "Black / Gold Yoke"),
    ],
  },
  {
    slug: "volleyball-uniforms",
    number: "07",
    title: "Volleyball Uniforms",
    item: "Volleyball Uniform",
    short: "Volleyball",
    tagline: "Four-way stretch sets that move with every jump.",
    description: [
      "Material: 88% Polyester / 12% Spandex four-way stretch",
      "Men's athletic cut with short sleeves and V-neck",
      "Sublimated designs, names and numbers built into the fabric",
      "Lightweight, moisture-wicking and quick-drying",
      "Matching stretch shorts with wide comfort waistband",
      "Libero contrast jerseys available in any colourway",
      "Machine wash cold, hang dry",
    ],
    products: [
      p(7, 1, "Black / Gold Strike"),
      p(7, 2, "White / Gold Zigzag"),
      p(7, 3, "Gold / Black Brushstroke"),
      p(7, 4, "Black Wave / Gold Trim"),
    ],
  },
  {
    slug: "rugby-uniforms",
    number: "08",
    title: "Rugby Uniforms",
    item: "Rugby Uniform",
    short: "Rugby",
    tagline: "Heavyweight, tear-resistant kit for the contact game.",
    description: [
      "Material: 100% Polyester heavyweight knit, tear resistant",
      "Close-fitting cut that is harder to grip in the tackle",
      "Reinforced seams and woven collar with button placket",
      "Sublimated designs, names and numbers",
      "Shorts in durable twill with reinforced crotch and drawcord",
      "Custom club crests, sponsors and numbering",
      "Machine wash, do not tumble dry",
    ],
    products: [
      p(8, 1, "Black / Gold Hoops"),
      p(8, 2, "Gold Body / Black Sleeve"),
      p(8, 3, "White / Gold Chevron"),
      p(8, 4, "Black / Gold Side Panel"),
    ],
  },
  {
    slug: "sublimation-t-shirts",
    number: "09",
    title: "Sublimation T-Shirts",
    item: "Sublimation T-Shirt",
    short: "T-Shirts",
    tagline: "Seam-to-seam sublimated performance tees.",
    description: [
      "100% polyester performance jersey, full sublimation seam to seam",
      "Custom colours and custom designs, or send us your own artwork",
      "Crew or V-neck, regular or slim fit, machine wash cold",
    ],
    printSizes: [
      { label: "Front sponsor", metric: "28 cm W × 5 cm H", imperial: '11″ × 2″' },
      { label: "Chest logo", metric: "7.5 cm W × 8 cm H", imperial: '3″ × 3.2″' },
      { label: "Back name", metric: "28 cm W × 6 cm H", imperial: '11″ × 2.4″' },
      { label: "Back number", metric: "25 cm H × 15–34 cm W*", imperial: '10″ H' },
    ],
    printNote:
      "Adult sizes. *Width depends on number of digits. Youth sizes scaled down; adjustable on request.",
    products: [
      p(9, 1, "Black Body / Gold Sleeve"),
      p(9, 2, "Gold / Black Chevron Hem"),
      p(9, 3, "White / Gold Chest Band"),
      p(9, 4, "Black Geo / Gold V-Neck"),
    ],
  },
  {
    slug: "sublimation-tracksuits",
    number: "10",
    title: "Sublimation Tracksuits",
    item: "Sublimation Tracksuit",
    short: "Tracksuits",
    tagline: "Full-zip team tracksuits for travel and warm-up.",
    description: [
      "Material: 100% Polyester tricot or micro-peach knit",
      "Full-zip jacket with stand collar and zipped side pockets",
      "Sublimated panels, stripes and logos in any colourway",
      "Rib-knit cuffs and hem for a clean fit",
      "Tapered trousers with elastic waist, drawcord and ankle zips",
      "Team crests and initials on chest and thigh",
      "Machine wash cold, do not tumble dry",
    ],
    products: [
      p(10, 1, "Navy / Gold Sleeve Stripe"),
      p(10, 2, "Navy / Gold Chest Band"),
      p(10, 3, "Navy / Fine Piping"),
      p(10, 4, "Navy Chevron / Gold Rib"),
    ],
  },
  {
    slug: "sublimation-shorts",
    number: "11",
    title: "Sublimation Shorts",
    item: "Sublimation Shorts",
    short: "Shorts",
    tagline: "Mesh and micro-interlock shorts in any length.",
    description: [
      "Material: 100% Polyester mesh or micro-interlock",
      "Full sublimation print with no fading or peeling",
      "Wide elastic waistband with internal drawcord",
      "Side pockets on request, lined or unlined",
      "Lightweight, breathable and quick-drying",
      "Sizes from youth to adult, custom lengths",
      "Machine wash cold, hang dry",
    ],
    products: [
      p(11, 1, "Black / Gold Side Panel"),
      p(11, 2, "Gold / Black Side Panel"),
      p(11, 3, "White / Gold & Black Panel"),
      p(11, 4, "Black Geo / Gold Waistband"),
    ],
  },
];

// ---------------------------------------------------------------------------
// Streetwear and Jackets. Pictures are WAS design mockups; details are a starting
// point for the WAS team to adjust.
// ---------------------------------------------------------------------------

const streetwear: Omit<Category, "department">[] = [
  {
    slug: "caps-hats",
    number: "01",
    title: "Caps & Hats",
    item: "Headwear",
    short: "Caps & Hats",
    tagline: "Snapbacks, truckers, beanies and bucket hats with your logo.",
    description: [
      "Material: Cotton twill, nylon, mesh back or acrylic knit",
      "Snapback, trucker, dad cap, beanie and bucket hat styles",
      "Structured or unstructured crowns, flat or curved brims",
      "3D puff or flat embroidery, woven patches and rubber badges",
      "Custom undervisor colour, inner taping and labels",
    ],
    products: [
      p(12, 1, "Black Snapback / Gold Trucker"),
      p(12, 2, "Black Beanie / Cream Bucket Hat"),
    ],
  },
  {
    slug: "blank-apparel",
    number: "02",
    title: "Blank Apparel",
    item: "Blank Apparel",
    short: "Blank Apparel",
    tagline: "Plain hoodies, crewnecks and tees, ready for your own branding.",
    description: [
      "Material: Brushed cotton-polyester fleece and cotton jersey",
      "Hoodies, crewneck sweatshirts, joggers and t-shirts",
      "No logos or labels, ready for printing or embroidery",
      "Wide colour range, matched across the whole set",
      "Private neck labels and hang tags on request",
    ],
    products: [
      p(13, 1, "Crewnecks in Four Colours"),
      p(13, 2, "Heather Grey Hoodie"),
    ],
  },
  {
    slug: "accessories",
    number: "03",
    title: "Accessories",
    item: "Accessory",
    short: "Accessories",
    tagline: "Socks, gloves, sleeves, skull wraps and towels to finish the kit.",
    description: [
      "Material: Performance knit, spandex, terry cotton and synthetic leather",
      "Crew socks, arm sleeves, skull wraps, towels and gloves",
      "Knitted-in or sublimated colours and logos",
      "Grip palms on football gloves",
      "Matched to your team or brand colours",
    ],
    products: [
      p(14, 1, "Socks, Sleeve, Wrap & Towel"),
      p(14, 2, "Receiver Gloves & Crew Socks"),
    ],
  },
  {
    slug: "embroidered-hoodies",
    number: "04",
    title: "Embroidered Hoodies",
    item: "Embroidered Hoodie",
    short: "Embroidered",
    tagline: "Heavyweight hoodies with stitched logos and lettering.",
    description: [
      "Material: Heavyweight cotton-polyester brushed fleece",
      "Flat, 3D puff or appliqué embroidery",
      "Chest, sleeve, back and hood placements",
      "Ribbed cuffs and hem, lined hood with drawcords",
      "Pullover or zip-up styles",
    ],
    products: [
      p(15, 1, "Black / Gold Chest Logo"),
      p(15, 2, "Cream / Black Arch Lettering"),
    ],
  },
  {
    slug: "oversized-t-shirts",
    number: "05",
    title: "Oversized T-Shirts",
    item: "Oversized T-Shirt",
    short: "Oversized Tees",
    tagline: "Boxy, drop-shoulder tees with bold front and back prints.",
    description: [
      "Material: Heavyweight combed cotton jersey",
      "Boxy fit with dropped shoulders and a thick ribbed collar",
      "Screen print, puff print, DTG or embroidery",
      "Garment-dyed and washed finishes available",
      "Private neck labels and hang tags on request",
    ],
    products: [
      p(16, 1, "Black / Gold Wolf Back Print"),
      p(16, 2, "Off-White / Stubborn Back Print"),
    ],
  },
  {
    slug: "fleece-sweatsuits",
    number: "06",
    title: "Fleece Sweatsuits",
    item: "Fleece Sweatsuit",
    short: "Sweatsuits",
    tagline: "Matching hoodie or crewneck and jogger sets.",
    description: [
      "Material: Brushed cotton-polyester fleece",
      "Hoodie or crewneck top with matching joggers",
      "Tapered joggers with cuffs, drawcord and pockets",
      "Embroidered or printed logos on top and leg",
      "Colours matched across the whole set",
    ],
    products: [
      p(17, 1, "Black Hoodie & Jogger Set"),
      p(17, 2, "Grey Crewneck & Jogger Set"),
    ],
  },
  {
    slug: "puff-print-hoodies",
    number: "07",
    title: "Puff Print Hoodies",
    item: "Puff Print Hoodie",
    short: "Puff Print",
    tagline: "Raised 3D puff print graphics that stand off the fabric.",
    description: [
      "Material: Heavyweight cotton-polyester brushed fleece",
      "Raised 3D puff print in one or more colours",
      "Large chest, back and sleeve graphics",
      "Soft-hand finish that holds its shape after washing",
      "Pullover or zip-up styles",
    ],
    products: [
      p(18, 1, "Black / Gold Puff Lettering"),
      p(18, 2, "Sand / Black Puff Lettering"),
    ],
  },
  {
    slug: "chenille-hoodies",
    number: "08",
    title: "Chenille Hoodies",
    item: "Chenille Hoodie",
    short: "Chenille",
    tagline: "Hoodies with fuzzy chenille letters and patches.",
    description: [
      "Material: Heavyweight cotton-polyester brushed fleece",
      "Chenille letters, numbers and patches with felt borders",
      "Combined with embroidery for detail",
      "Chest, back and sleeve placements",
      "Pullover or zip-up styles",
    ],
    products: [
      p(19, 1, "Black / Gold Chenille Letter"),
      p(19, 2, "Cream / Chenille Patches"),
    ],
  },
  {
    slug: "varsity-hoodies",
    number: "09",
    title: "Varsity Hoodies",
    item: "Varsity Hoodie",
    short: "Varsity Hoodies",
    tagline: "College-style hoodies with contrast sleeves and striped trims.",
    description: [
      "Material: Heavyweight cotton-polyester brushed fleece",
      "Contrast sleeves and striped varsity rib trims",
      "Chenille letters, tackle twill and felt numbers",
      "Pullover or zip-up styles",
      "Team and brand colours on every panel",
    ],
    products: [
      p(20, 1, "Black / Gold Sleeve Zip Hoodie"),
      p(20, 2, "Grey / Arched Tackle Twill"),
    ],
  },
  {
    slug: "acid-wash-streetwear",
    number: "10",
    title: "Acid Wash Streetwear",
    item: "Acid Wash Apparel",
    short: "Acid Wash",
    tagline: "Vintage-washed hoodies, tees, joggers and shorts.",
    description: [
      "Material: Cotton fleece and cotton jersey, mineral washed",
      "Acid, stone and vintage wash finishes",
      "Every piece has a slightly different wash pattern",
      "Cracked prints, embroidery and puff print",
      "Hoodies, tees, joggers and shorts as sets",
    ],
    products: [
      p(21, 1, "Charcoal Zip Hoodie & Joggers"),
      p(21, 2, "Faded Black Tee & Shorts"),
    ],
  },
];

const jackets: Omit<Category, "department">[] = [
  {
    slug: "varsity-jackets",
    number: "01",
    title: "Varsity Jackets",
    item: "Varsity Jacket",
    short: "Varsity",
    tagline: "Wool and leather letterman jackets with chenille patches.",
    description: [
      "Material: Wool blend body with leather or PU sleeves",
      "Striped knit collar, cuffs and hem",
      "Snap-button front with welt pockets",
      "Chenille letters, embroidered patches and back lettering",
      "Quilted lining, with an inside pocket",
    ],
    products: [
      p(22, 1, "Black Wool / Gold Sleeves"),
      p(22, 2, "Cream Wool / Black Sleeves"),
    ],
  },
  {
    slug: "bomber-jackets",
    number: "02",
    title: "Bomber Jackets",
    item: "Bomber Jacket",
    short: "Bomber",
    tagline: "Flight and satin bombers with striped ribbed trims.",
    description: [
      "Material: Nylon or satin shell with padded or quilted lining",
      "MA-1 flight and satin bomber styles",
      "Ribbed collar, cuffs and hem with contrast stripes",
      "Sleeve utility pocket and zip front",
      "Embroidered logos, patches and back prints",
    ],
    products: [
      p(27, 1, "Matte Black MA-1 / Gold Stripes"),
      p(27, 2, "Navy Satin / Gold Trim"),
    ],
  },
  {
    slug: "windbreakers-outerwear",
    number: "03",
    title: "Windbreakers & Outerwear",
    item: "Windbreaker",
    short: "Windbreakers",
    tagline: "Lightweight shells and track jackets for training and travel.",
    description: [
      "Material: Lightweight nylon or polyester taffeta",
      "Half-zip anorak or full-zip track styles",
      "Mesh lining, elastic cuffs and adjustable hem",
      "Colour-block panels in team or brand colours",
      "Packable and wind-resistant",
    ],
    products: [
      p(24, 1, "Black / Gold Half-Zip Anorak"),
      p(24, 2, "Black Track Jacket / Gold Panels"),
    ],
  },
  {
    slug: "puffer-jackets",
    number: "04",
    title: "Puffer Jackets",
    item: "Puffer Jacket",
    short: "Puffer",
    tagline: "Quilted, insulated jackets for the cold months.",
    description: [
      "Material: Nylon shell with synthetic insulation",
      "Quilted baffles with a hood and stand-up collar",
      "Matte or colour-block finishes",
      "Zip hand pockets and inner pocket",
      "Embroidered or printed logos",
    ],
    products: [
      p(25, 1, "Matte Black / Gold Zip"),
      p(25, 2, "Black / Gold Colour Block"),
    ],
  },
  {
    slug: "coach-jackets",
    number: "05",
    title: "Coach Jackets",
    item: "Coach Jacket",
    short: "Coach",
    tagline: "Snap-front nylon jackets with big back prints.",
    description: [
      "Material: Water-resistant nylon with mesh or quilted lining",
      "Snap-button front and turn-down collar",
      "Drawcord hem and side pockets",
      "Large back prints and small chest logos",
      "Solid or colour-block styles",
    ],
    products: [
      p(26, 1, "Black / Gold Back Print"),
      p(26, 2, "Cream / Black Colour Block"),
    ],
  },
];

export type Department = {
  slug: DepartmentSlug;
  title: string;
  tagline: string;
  intro: string;
  image: string; // cover picture for tiles and the collection page
  sizes: string; // shown on product pages
  customNote: string; // completes "<code> is shown here in WAS colours. It can be made ..."
  options: { key: string; label: string }[];
};

export const departments: Department[] = [
  {
    slug: "sportswear",
    title: "Sportswear",
    tagline: "Sublimated team uniforms for eight sports, plus tracksuits, tees and shorts.",
    intro:
      "Team uniforms for football, basketball, baseball, softball, American football, ice hockey, volleyball and rugby, plus sublimation t-shirts, tracksuits and shorts.",
    image: "/products/was-801.webp",
    sizes: "Youth & Adult",
    customNote: "in your team colours with your own logo, sponsor, player names and numbers",
    options: [...customOptions],
  },
  {
    slug: "streetwear",
    title: "Streetwear",
    tagline: "Hoodies, sweatsuits, oversized tees, headwear and accessories.",
    intro:
      "Embroidered, puff print, chenille and varsity hoodies, sweatsuits, oversized tees, acid wash sets, blank apparel, caps and accessories for brands and teams.",
    image: "/products/was-1701.webp",
    sizes: "XS – 3XL",
    customNote: "in your colours and fabric, with your own logo, artwork and labels",
    options: [
      { key: "colour", label: "Custom Colours & Fabrics" },
      { key: "decoration", label: "Embroidery, Puff & Chenille" },
      { key: "logo", label: "Your Logo & Artwork" },
      { key: "label", label: "Private Label & Tags" },
    ],
  },
  {
    slug: "jackets",
    title: "Jackets",
    tagline: "Varsity, bomber, puffer and coach jackets, plus windbreakers.",
    intro:
      "Varsity jackets, bomber jackets, windbreakers, puffer jackets and coach jackets, all made to order with your colours, patches, embroidery and labels.",
    image: "/products/was-2201.webp",
    sizes: "Youth & Adult",
    customNote: "in your colours and materials, with your own patches, embroidery and labels",
    options: [
      { key: "colour", label: "Custom Colours & Materials" },
      { key: "patches", label: "Chenille Patches & Embroidery" },
      { key: "logo", label: "Your Logo & Artwork" },
      { key: "label", label: "Private Label & Tags" },
    ],
  },
];

export const categories: Category[] = [
  ...sportswear.map((c) => ({ ...c, department: "sportswear" as const })),
  ...streetwear.map((c) => ({ ...c, department: "streetwear" as const })),
  ...jackets.map((c) => ({ ...c, department: "jackets" as const })),
];

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function categoriesOf(department: DepartmentSlug) {
  return categories.filter((c) => c.department === department);
}

export function departmentOf(category: Category) {
  return departments.find((d) => d.slug === category.department)!;
}

export const allProducts = categories.flatMap((c) =>
  c.products.map((product) => ({ ...product, category: c })),
);

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(categorySlug: string, productSlug: string) {
  const category = getCategory(categorySlug);
  const product = category?.products.find((x) => x.slug === productSlug);
  return category && product ? { category, product } : undefined;
}

/** First bullet usually starts with "Material:" — pull the fabric out for cards. */
export function materialOf(category: Category) {
  const first = category.description[0];
  return first.replace(/^Material:\s*/i, "");
}
