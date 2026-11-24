// All content in this file comes from the WAS Sportswear product catalogue.
// Only the product lines, designs and options listed in the catalogue are included.

export type Product = {
  code: string; // e.g. "WAS-101"
  slug: string; // e.g. "was-101"
  name: string; // short colourway name
  image: string;
};

export type Category = {
  slug: string;
  number: string; // "01".."11"
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

export const categories: Category[] = [
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
