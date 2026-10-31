// ─── Editable product catalogue ────────────────────────────────────────────
// Images are original generic material photography — they do NOT depict a
// specific brand, grade or certification. Fill `thicknesses`, `sizes` and
// `brands` only with details verified by Sri Jain Plywood. Set `stocked: false`
// to hide a category the shop does not carry.

export type Group =
  | "plywood" | "laminates" | "mdf-hdf" | "blockboard" | "doors" | "veneers" | "hardware" | "kitchen";

export const GROUPS: { id: Group; label: string }[] = [
  { id: "plywood", label: "Plywood" },
  { id: "laminates", label: "Laminates" },
  { id: "blockboard", label: "Blockboard" },
  { id: "mdf-hdf", label: "MDF & HDF" },
  { id: "doors", label: "Doors" },
  { id: "veneers", label: "Veneers" },
  { id: "hardware", label: "Interior Hardware" },
  { id: "kitchen", label: "Modular Kitchen" },
];

export type Product = {
  slug: string;
  name: string;
  group: Group;
  image: string;
  gallery: string[];
  alt: string;
  short: string;
  what: string;
  uses: string[];
  benefits: string[];
  limitations: string[];
  finishes: string[];
  thicknesses: string[]; // verified only
  sizes: string[]; // verified only
  brands: string[]; // verified only
  stocked: boolean;
};

const I = "/images";

const ALL: Product[] = [
  {
    slug: "commercial-plywood", name: "Commercial Plywood", group: "plywood",
    image: `${I}/products/plywood/commercial.webp`,
    gallery: [`${I}/products/plywood/commercial.webp`, `${I}/applications/wardrobe/wardrobe.webp`],
    alt: "Stack of plywood sheets showing natural veneer face and layered edges",
    short: "Versatile everyday plywood for dry interior furniture.",
    what: "Plywood made from thin wood veneers bonded in cross-grain layers, intended mainly for dry interior use.",
    uses: ["Wardrobes", "Shelving", "Beds and furniture carcasses", "Interior partitions"],
    benefits: ["Good strength for its weight", "Holds screws well", "Accepts laminates and veneers"],
    limitations: ["Not intended for wet or humid areas", "Performance varies by grade and manufacturer"],
    finishes: ["Natural veneer"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "bwr-plywood", name: "BWR Plywood", group: "plywood",
    image: `${I}/products/plywood/bwr.webp`,
    gallery: [`${I}/products/plywood/bwr.webp`, `${I}/applications/kitchen/kitchen.webp`],
    alt: "Plywood sheet with light natural veneer and visible cross-layer edge",
    short: "Plywood with improved moisture resistance for selected uses.",
    what: "Boiling Water Resistant (BWR) grade plywood uses resins intended to improve resistance to moisture compared with commercial plywood, as per the selected product's specification.",
    uses: ["Kitchen cabinet carcasses", "Bathroom vanities (not in direct water)", "Utility area furniture"],
    benefits: ["Better suited to humid interiors than commercial grade", "Suitable base for laminates"],
    limitations: ["Moisture resistant does not mean waterproof", "Edges should be sealed or edge-banded", "Check the manufacturer's specification for your use"],
    finishes: ["Natural veneer"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "bwp-marine-plywood", name: "BWP / Marine Plywood", group: "plywood",
    image: `${I}/products/plywood/marine.webp`,
    gallery: [`${I}/products/plywood/marine.webp`, `${I}/applications/kitchen/luxury.webp`],
    alt: "Thick plywood panel corner with dense layered edge and rich timber face",
    short: "Higher-performance plywood for demanding conditions.",
    what: "Boiling Water Proof (BWP) and marine-grade plywood are manufactured for more demanding moisture exposure, according to the specific product's standard and specification.",
    uses: ["Kitchen sink cabinets", "Wet-area furniture", "Applications needing higher bond durability"],
    benefits: ["Designed for higher moisture exposure than BWR", "Strong, stable panels"],
    limitations: ["Not every product suits permanently wet or outdoor use", "Verify the grade and exposure conditions before purchase", "Usually costs more than other grades"],
    finishes: ["Natural veneer"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "boiling-waterproof-plywood", name: "Boiling Waterproof Plywood", group: "plywood",
    image: `${I}/blog/workbench.webp`,
    gallery: [`${I}/blog/workbench.webp`, `${I}/products/plywood/marine.webp`],
    alt: "Plywood offcuts on a carpenter's workbench with laminate samples",
    short: "Waterproof-bonded plywood options — ask us for verified specifications.",
    what: "Plywood bonded with waterproof-grade resins, often sold as BWP grade. Exact performance depends on the manufacturer and standard.",
    uses: ["Kitchens and utility areas", "Bathroom furniture", "Moisture-prone interiors"],
    benefits: ["Bond designed for boiling water tests per its standard", "Durable base for laminates"],
    limitations: ["Surface and edges still need proper finishing", "Confirm the certification on the actual sheet"],
    finishes: ["Natural veneer"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "decorative-laminates", name: "Decorative Laminates", group: "laminates",
    image: `${I}/products/laminates/decorative.webp`,
    gallery: [`${I}/products/laminates/decorative.webp`, `${I}/applications/living-room/minimal.webp`],
    alt: "Fan of laminate samples in walnut, oak, white, beige, charcoal, marble and textured finishes",
    short: "Wood, solid, stone and textured surface finishes.",
    what: "Thin decorative surface sheets pressed onto boards like plywood or MDF. Laminates are a finish, not a board.",
    uses: ["Wardrobe shutters", "Cabinets", "Wall panelling", "Office furniture"],
    benefits: ["Wide choice of colours and textures", "Easy-to-clean surface", "Consistent appearance"],
    limitations: ["Needs a suitable base board and adhesive", "Edges need edge-banding", "Can chip if handled roughly during fixing"],
    finishes: ["Walnut", "Oak", "White", "Beige", "Charcoal", "Marble-effect", "Textured"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "acrylic-laminates", name: "Acrylic Laminates", group: "laminates",
    image: `${I}/products/laminates/acrylic.webp`,
    gallery: [`${I}/products/laminates/acrylic.webp`, `${I}/applications/kitchen/luxury.webp`],
    alt: "High-gloss acrylic panels in white, black, beige and champagne",
    short: "High-gloss, mirror-like finishes for contemporary interiors.",
    what: "Decorative sheets with an acrylic top layer that gives a deep, glossy look.",
    uses: ["Modular kitchen shutters", "Wardrobe shutters", "TV units"],
    benefits: ["Rich glossy appearance", "Seamless contemporary look"],
    limitations: ["Shows fingerprints and fine scratches", "Usually costs more than standard laminates"],
    finishes: ["Gloss white", "Gloss black", "Beige", "Champagne"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "mdf-boards", name: "MDF Boards", group: "mdf-hdf",
    image: `${I}/products/mdf-hdf/mdf.webp`,
    gallery: [`${I}/products/mdf-hdf/mdf.webp`, `${I}/applications/living-room/wall-panel.webp`],
    alt: "Stack of smooth medium-density fibreboard panels with uniform edges",
    short: "Smooth engineered board, ideal for routing and paint.",
    what: "Medium Density Fibreboard — wood fibres bonded with resin under heat and pressure into a uniform panel.",
    uses: ["Decorative wall panels", "CNC-routed designs", "Cabinet shutters", "Painted furniture"],
    benefits: ["Very smooth surface", "Machines cleanly", "Often more economical than plywood"],
    limitations: ["Standard MDF is sensitive to moisture", "Lower screw-holding at edges than plywood", "Heavier than plywood"],
    finishes: ["Plain", "Pre-laminated (ask)"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "hdf-boards", name: "HDF Boards", group: "mdf-hdf",
    image: `${I}/products/mdf-hdf/hdf.webp`,
    gallery: [`${I}/products/mdf-hdf/hdf.webp`, `${I}/applications/office/office.webp`],
    alt: "Thin dense dark brown high-density fibreboard sheets",
    short: "Denser, harder fibreboard for thin, strong panels.",
    what: "High Density Fibreboard — similar to MDF but compressed to a higher density.",
    uses: ["Drawer bottoms", "Back panels", "Door skins", "Panelling"],
    benefits: ["Hard, dense surface", "Good for thin panels"],
    limitations: ["Heavy", "Moisture sensitivity depends on the grade"],
    finishes: ["Plain"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "blockboards", name: "Blockboards", group: "blockboard",
    image: `${I}/products/blockboard/blockboard.webp`,
    gallery: [`${I}/products/blockboard/blockboard.webp`, `${I}/applications/living-room/minimal.webp`],
    alt: "Cutaway of a blockboard showing solid wood strip core between veneer layers",
    short: "Wood-strip core board for long spans and doors.",
    what: "A core of solid softwood strips sandwiched between plywood veneers.",
    uses: ["Long shelves", "Doors", "Partitions", "Tables and beds"],
    benefits: ["Resists sagging over long spans", "Lighter than plywood of similar thickness"],
    limitations: ["Gaps in the core can affect screw fixing", "Not intended for wet areas unless specified"],
    finishes: ["Natural veneer"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "flush-doors", name: "Flush Doors", group: "doors",
    image: `${I}/products/doors/flush.webp`,
    gallery: [`${I}/products/doors/flush.webp`],
    alt: "Plain teak-veneer flush door in a minimal modern hallway",
    short: "Clean, flat-faced doors for modern homes and offices.",
    what: "Doors with a flat face, typically a solid or block core covered with plywood or veneer skins.",
    uses: ["Bedroom doors", "Bathroom doors (grade dependent)", "Office cabins"],
    benefits: ["Simple, modern look", "Can be laminated, veneered or painted"],
    limitations: ["Construction and core vary — ask about the grade", "Wet-area use depends on the specification"],
    finishes: ["Veneer", "Laminate", "Paint-ready"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "decorative-doors", name: "Decorative Doors", group: "doors",
    image: `${I}/products/doors/decorative.webp`,
    gallery: [`${I}/products/doors/decorative.webp`],
    alt: "Carved wooden door with geometric grooves and brass handle in an Indian home",
    short: "Designer doors with grooves, mouldings and carved patterns.",
    what: "Doors with decorative surfaces — grooved, moulded, membrane or veneer designs.",
    uses: ["Main entrances (interior side)", "Pooja rooms", "Living spaces"],
    benefits: ["Statement design", "Contemporary and traditional styles"],
    limitations: ["Exterior exposure needs a suitable construction and finish", "Lead times may vary"],
    finishes: ["Teak tone", "Walnut tone", "Custom (ask)"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "veneers", name: "Veneers", group: "veneers",
    image: `${I}/products/veneers/veneers.webp`,
    gallery: [`${I}/products/veneers/veneers.webp`, `${I}/applications/living-room/wall-panel.webp`],
    alt: "Natural wood veneer sheets in oak, walnut, teak and rosewood tones",
    short: "Real wood sheets for a natural, premium surface.",
    what: "Thin slices of natural timber applied over boards for a genuine wood finish.",
    uses: ["Wall panelling", "Premium furniture", "Doors"],
    benefits: ["Authentic grain — every sheet is unique", "Can be polished to different sheens"],
    limitations: ["Needs skilled application and polishing", "Natural colour variation between sheets"],
    finishes: ["Oak", "Walnut", "Teak", "Rosewood tone"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "interior-hardware", name: "Interior Hardware", group: "hardware",
    image: `${I}/products/hardware/hardware.webp`,
    gallery: [`${I}/products/hardware/hardware.webp`],
    alt: "Cabinet hinges, brass handles, drawer channels and fittings on walnut wood",
    short: "Hinges, handles, channels and fittings — ask what's in stock.",
    what: "Fittings that make furniture work: hinges, drawer channels, handles, connectors.",
    uses: ["Wardrobes", "Kitchen cabinets", "Drawers"],
    benefits: ["Complete your project from one place"],
    limitations: ["Availability of specific models varies — please enquire"],
    finishes: ["Brushed gold", "Stainless", "Black"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
  {
    slug: "modular-kitchen-materials", name: "Modular Kitchen Materials", group: "kitchen",
    image: `${I}/applications/kitchen/kitchen.webp`,
    gallery: [`${I}/applications/kitchen/kitchen.webp`, `${I}/applications/kitchen/luxury.webp`],
    alt: "Modern modular kitchen with oak and beige laminate cabinets",
    short: "Boards, laminates and fittings to build your kitchen.",
    what: "A combination of suitable boards, surface finishes and hardware for modular kitchens.",
    uses: ["Base and wall cabinets", "Tall units", "Kitchen islands"],
    benefits: ["Guidance on matching board grade to each area", "Coordinated finishes"],
    limitations: ["Sink and hob areas need moisture- and heat-appropriate materials"],
    finishes: ["Matte", "Gloss acrylic", "Wood-grain", "Solid colours"], thicknesses: [], sizes: [], brands: [], stocked: true,
  },
];

export const PRODUCTS = ALL.filter((p) => p.stocked);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const ALL_FINISHES = Array.from(new Set(PRODUCTS.flatMap((p) => p.finishes))).sort();
export const ALL_THICKNESSES = Array.from(new Set(PRODUCTS.flatMap((p) => p.thicknesses)));

// ─── Collections (reference product slugs — edit freely) ───────────────────
export type Collection = { slug: string; name: string; description: string; image: string; products: string[] };
export const COLLECTIONS: Collection[] = [
  { slug: "modern-minimalist", name: "Modern Minimalist", description: "Matte whites and pale oak for calm, uncluttered rooms.", image: `${I}/applications/living-room/minimal.webp`, products: ["decorative-laminates", "mdf-boards", "commercial-plywood"] },
  { slug: "warm-walnut", name: "Warm Walnut", description: "Deep walnut tones, fluted panels and soft warm light.", image: `${I}/applications/living-room/wall-panel.webp`, products: ["veneers", "mdf-boards", "decorative-laminates"] },
  { slug: "natural-oak", name: "Natural Oak", description: "Honest oak grain for furniture that feels timeless.", image: `${I}/products/veneers/veneers.webp`, products: ["veneers", "blockboards", "commercial-plywood"] },
  { slug: "luxury-kitchen", name: "Luxury Kitchen Finishes", description: "Gloss acrylics, marble effects and brushed-gold fittings.", image: `${I}/applications/kitchen/luxury.webp`, products: ["acrylic-laminates", "bwp-marine-plywood", "interior-hardware", "modular-kitchen-materials"] },
  { slug: "contemporary-wardrobes", name: "Contemporary Wardrobes", description: "Full-height shutters with slim handles and rich grain.", image: `${I}/applications/wardrobe/wardrobe.webp`, products: ["commercial-plywood", "decorative-laminates", "interior-hardware"] },
  { slug: "timeless-doors", name: "Timeless Door Designs", description: "Flush and decorative doors for every threshold.", image: `${I}/products/doors/decorative.webp`, products: ["decorative-doors", "flush-doors", "veneers"] },
];

// ─── Visualizer ────────────────────────────────────────────────────────────
export const SCENES = [
  { id: "living", label: "Living room", image: `${I}/applications/living-room/minimal.webp` },
  { id: "wardrobe", label: "Bedroom wardrobe", image: `${I}/applications/wardrobe/wardrobe.webp` },
  { id: "kitchen", label: "Modular kitchen", image: `${I}/applications/kitchen/kitchen.webp` },
  { id: "office", label: "Office interior", image: `${I}/applications/office/office.webp` },
  { id: "wall", label: "Wall panel", image: `${I}/applications/living-room/wall-panel.webp` },
];

// Swatch textures are CSS approximations for previewing tone only.
const grain = (a: string, b: string) =>
  `repeating-linear-gradient(92deg, ${a} 0px, ${b} 3px, ${a} 7px, ${a} 11px), linear-gradient(180deg, ${a}, ${b})`;
export const FINISHES = [
  { id: "oak", label: "Natural oak", bg: grain("#c49a68", "#b28653") },
  { id: "walnut", label: "Walnut", bg: grain("#5a3a28", "#4a2f20") },
  { id: "teak", label: "Teak", bg: grain("#9a6331", "#87542a") },
  { id: "white", label: "Matte white", bg: "linear-gradient(135deg,#f4f2ee,#e8e5df)" },
  { id: "beige", label: "Beige", bg: "linear-gradient(135deg,#d9c8ae,#cbb999)" },
  { id: "charcoal", label: "Charcoal", bg: "linear-gradient(135deg,#3a3a3a,#2a2a2a)" },
  { id: "marble", label: "Marble-effect laminate", bg: "linear-gradient(120deg,transparent 40%,#9a9a9a22 45%,transparent 50%),linear-gradient(60deg,transparent 60%,#80808033 62%,transparent 66%),linear-gradient(135deg,#f3f1ed,#e4e1db)" },
  { id: "contemporary", label: "Contemporary wood texture", bg: grain("#8b6e57", "#a3846a") },
];
