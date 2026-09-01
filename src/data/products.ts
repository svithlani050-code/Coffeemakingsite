export type CategoryId = "single-origin" | "blends" | "decaf";

export type Size = "250g" | "1kg";
export type Grind = "Whole bean" | "Filter" | "Espresso";

export interface Product {
  id: string;
  sku: string;
  name: string;
  origin: string;
  region: string;
  category: CategoryId;
  roast: 1 | 2 | 3 | 4 | 5;
  process: string;
  altitude: string;
  varietal: string;
  notes: string[];
  tagline: string;
  description: string;
  price: number; // per 250 g
  badge?: string;
  image: string;
  glow: string; // accent hex used for card ambience
}

export interface CartLine {
  key: string;
  productId: string;
  size: Size;
  grind: Grind;
  qty: number;
}

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All beans" },
  { id: "single-origin", label: "Single origin" },
  { id: "blends", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  "single-origin": "Single origin",
  blends: "Blend",
  decaf: "Decaf",
};

export const ROAST_LABEL = [
  "Light",
  "Light-medium",
  "Medium",
  "Medium-dark",
  "Dark",
];

export const GRINDS: Grind[] = ["Whole bean", "Filter", "Espresso"];
export const SIZES: Size[] = ["250g", "1kg"];

export const FREE_SHIPPING_AT = 40;
export const FLAT_SHIPPING = 6;

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const unitPrice = (product: Product, size: Size) =>
  size === "1kg" ? Math.round(product.price * 3.4 * 2) / 2 : product.price;

export const lineKey = (productId: string, size: Size, grind: Grind) =>
  `${productId}|${size}|${grind}`;

export const PRODUCTS: Product[] = [
  {
    id: "ethiopia-idido",
    sku: "EO-101",
    name: "Idido",
    origin: "Ethiopia",
    region: "Yirgacheffe, Gedeb",
    category: "single-origin",
    roast: 1,
    process: "Washed · 72 h ferment",
    altitude: "2,100 – 2,300 masl",
    varietal: "Heirloom cultivars",
    notes: ["Jasmine", "Bergamot", "White peach"],
    tagline: "Our most luminous cup of the season.",
    description:
      "Grown by 400 smallholders around the Idido washing station, this heirloom lot is tea-like and shimmering — jasmine lifts off the cup as it cools, leaving a long, honeyed finish.",
    price: 21,
    badge: "New crop",
    image:
      "https://image.qwenlm.ai/generated-images/65eaf904-691a-4f59-91bc-2323c767482b/_result.png",
    glow: "#e8a86b",
  },
  {
    id: "colombia-la-cima",
    sku: "EO-102",
    name: "La Cima",
    origin: "Colombia",
    region: "Huila, San Agustín",
    category: "single-origin",
    roast: 3,
    process: "Washed",
    altitude: "1,750 masl",
    varietal: "Pink Bourbon",
    notes: ["Panela", "Red apple", "Cacao nib"],
    tagline: "Sweet, structured, endlessly drinkable.",
    description:
      "From the Ordóñez family's third-generation farm, La Cima balances ripe apple acidity with raw-cane sweetness. A medium roast that behaves beautifully as a daily pour-over.",
    price: 19.5,
    image:
      "https://image.qwenlm.ai/generated-images/e8cbf3d8-d6f6-4295-95e8-6d331dd1f6e4/_result.png",
    glow: "#e0a055",
  },
  {
    id: "kenya-nyeri",
    sku: "EO-103",
    name: "Nyeri AA",
    origin: "Kenya",
    region: "Nyeri County",
    category: "single-origin",
    roast: 2,
    process: "Washed · double fermentation",
    altitude: "1,800 masl",
    varietal: "SL28 & SL34",
    notes: ["Blackcurrant", "Ruby grapefruit", "Demerara"],
    tagline: "Big, juicy, unmistakably Kenyan.",
    description:
      "An AA outturn from a cooperative auction lot we chased for two seasons. The double fermentation builds that signature blackcurrant syrup depth, sharpened by bright grapefruit acidity.",
    price: 23,
    badge: "Limited · 8 bags left",
    image:
      "https://image.qwenlm.ai/generated-images/e274b8ce-28c8-4902-82db-f26056681502/_result.png",
    glow: "#c96a5a",
  },
  {
    id: "hearth-blend",
    sku: "EO-201",
    name: "Hearth",
    origin: "Brazil + Guatemala",
    region: "Cerrado & Huehuetenango",
    category: "blends",
    roast: 4,
    process: "Natural + washed components",
    altitude: "1,150 – 1,900 masl",
    varietal: "Mundo Novo, Caturra",
    notes: ["Toasted hazelnut", "Milk chocolate", "Brown sugar"],
    tagline: "The comfort cup — our best seller.",
    description:
      "Built for milk and cold mornings: a natural Brazilian base for body, a washed Guatemalan top note for sweetness. Roasted a touch further to keep chocolate forward in every brew method.",
    price: 18,
    badge: "Best seller",
    image:
      "https://image.qwenlm.ai/generated-images/d3ca32bd-4969-4f58-aac3-61eadac5c21b/_result.png",
    glow: "#d99a4e",
  },
  {
    id: "night-shift",
    sku: "EO-202",
    name: "Night Shift",
    origin: "Brazil + Sumatra",
    region: "Mantiqueira & Kerinci",
    category: "blends",
    roast: 5,
    process: "Natural + wet-hulled",
    altitude: "1,100 – 1,400 masl",
    varietal: "Catuaí, Andung Sari",
    notes: ["Dark chocolate", "Molasses", "Smoked cedar"],
    tagline: "Espresso with the lights down low.",
    description:
      "Our darkest roast, engineered for the portafilter: heavy syrupy body, bittersweet chocolate and a whisper of cedar smoke. Pulls a tiger-striped shot that cuts through oat milk.",
    price: 18.5,
    image:
      "https://image.qwenlm.ai/generated-images/46998177-7886-4607-9fa9-29a784dd112d/_result.png",
    glow: "#b0764a",
  },
  {
    id: "moonrise-decaf",
    sku: "EO-301",
    name: "Moonrise",
    origin: "Colombia",
    region: "Cauca, Popayán",
    category: "decaf",
    roast: 3,
    process: "Sugarcane E.A. decaf",
    altitude: "1,700 masl",
    varietal: "Castillo, Colombia",
    notes: ["Wild honey", "Toasted almond", "Soft cocoa"],
    tagline: "All of the ritual, none of the buzz.",
    description:
      "Decaffeinated at source with sugarcane ethanol — the gentlest process we know — so the cup keeps its wild-honey sweetness and round almond body. Our baristas drink it after close.",
    price: 19,
    badge: "Staff pick",
    image:
      "https://image.qwenlm.ai/generated-images/6fa0e09a-42d6-4032-8837-4892164f1089/_result.png",
    glow: "#a4b078",
  },
];

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/e43d370d-1a80-4b90-97ec-16bca94c6c00/_result.png";

export const productById = (id: string) =>
  PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
