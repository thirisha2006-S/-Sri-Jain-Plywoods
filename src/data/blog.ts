export type Post = {
  slug: string; title: string; excerpt: string; image: string; related: string; body: { h?: string; p: string }[];
};
const I = "/images";
export const POSTS: Post[] = [
  {
    slug: "choose-plywood-for-wardrobes", title: "How to Choose Plywood for Wardrobes", related: "commercial-plywood",
    image: `${I}/applications/wardrobe/wardrobe.webp`,
    excerpt: "Grade, thickness and finish — what actually matters for a wardrobe that lasts.",
    body: [
      { p: "A wardrobe is mostly a dry-area piece of furniture, but the room it sits in matters. A bedroom next to a bathroom or against an external wall may see more humidity than you expect." },
      { h: "Start with the location", p: "For typical dry bedrooms, commercial-grade plywood is commonly used. If the wall is prone to dampness, ask about a moisture-resistant grade such as BWR, and keep a small gap between the carcass and the wall." },
      { h: "Thickness by part", p: "Carcass sides and shutters usually need thicker boards than back panels. Your carpenter will specify thicknesses based on span and load — confirm the exact options available with us." },
      { h: "Finish", p: "Laminates give a durable, easy-care surface; veneers give genuine wood character. Both need edge-banding for a clean, protected edge." },
      { h: "What to ask before buying", p: "Ask for the grade, the manufacturer's specification, sheet size, and whether the product is suitable for the room's conditions." },
    ],
  },
  {
    slug: "plywood-vs-mdf", title: "Plywood vs MDF: What Is the Difference?", related: "mdf-boards",
    image: `${I}/products/mdf-hdf/mdf.webp`,
    excerpt: "Two very different boards. Here's how to decide which suits your project.",
    body: [
      { p: "Plywood is made from thin wood veneers glued in alternating grain directions. MDF is made from fine wood fibres pressed with resin into a uniform board." },
      { h: "Where plywood shines", p: "Strength, screw-holding and structural parts such as carcasses and shelves. It is generally lighter than MDF of similar thickness." },
      { h: "Where MDF shines", p: "A very smooth surface for paint, and clean edges for CNC routing and decorative panels." },
      { h: "Moisture", p: "Standard MDF is sensitive to moisture. Plywood performance depends on grade. Neither should be assumed waterproof without checking the product specification." },
    ],
  },
  {
    slug: "understanding-bwr-bwp", title: "Understanding BWR and BWP Plywood", related: "bwr-plywood",
    image: `${I}/products/plywood/marine.webp`,
    excerpt: "Moisture resistant is not waterproof. A plain-language guide to plywood grades.",
    body: [
      { p: "BWR stands for Boiling Water Resistant and BWP for Boiling Water Proof. These names refer to the bonding resin and the tests the product is designed to pass under its standard." },
      { h: "BWR", p: "Often chosen for kitchens and humid interiors. It offers better moisture resistance than commercial grade, but it is not designed for constant water contact." },
      { h: "BWP / marine", p: "Designed for more demanding moisture exposure. Even so, not every product suits permanently wet or outdoor use — check the specification and exposure conditions." },
      { h: "Always verify", p: "Look for the grade and standard marked on the actual sheet and ask for the manufacturer's documentation." },
    ],
  },
  {
    slug: "laminates-for-modular-kitchens", title: "Choosing Laminates for Modular Kitchens", related: "acrylic-laminates",
    image: `${I}/applications/kitchen/luxury.webp`,
    excerpt: "Matte, gloss, wood or stone — pick a kitchen finish that fits how you cook.",
    body: [
      { p: "Kitchens see heat, steam, oil and frequent cleaning. The right laminate balances looks with everyday practicality." },
      { h: "Matte vs gloss", p: "Matte finishes hide fingerprints and fine scratches. High-gloss acrylic gives a dramatic look but shows marks more readily." },
      { h: "Base board", p: "The laminate is only the surface. The board beneath — especially near the sink — should be chosen for moisture conditions." },
      { h: "See samples in person", p: "Colours look different under shop lighting, daylight and your kitchen's lights. Bring a sample home before deciding." },
    ],
  },
  {
    slug: "select-door-materials", title: "How to Select Door Materials", related: "flush-doors",
    image: `${I}/products/doors/flush.webp`,
    excerpt: "Flush or decorative, veneer or laminate — choosing doors room by room.",
    body: [
      { p: "Doors take daily wear. The core construction and the face finish both affect how a door performs." },
      { h: "Flush doors", p: "Flat-faced and modern. They can be laminated, veneered or painted." },
      { h: "Decorative doors", p: "Grooves, mouldings and patterns create a statement entrance or pooja room door." },
      { h: "Bathrooms", p: "Ask specifically about suitability for wet areas — not every door is designed for them." },
    ],
  },
  {
    slug: "wood-finishes-modern-interiors", title: "Wood Finishes for Modern Interiors", related: "veneers",
    image: `${I}/products/veneers/veneers.webp`,
    excerpt: "Oak, walnut, teak — how wood tones shape the mood of a room.",
    body: [
      { p: "Light oak feels airy and Scandinavian; walnut feels warm and luxurious; teak brings a classic Indian warmth." },
      { h: "Veneer or laminate?", p: "Veneer is real wood with natural variation. Wood-grain laminates offer consistency and easy care." },
      { h: "Combine thoughtfully", p: "Pair one dominant wood tone with a neutral — matte white, beige or charcoal — for balance." },
    ],
  },
  {
    slug: "plywood-thickness-guide", title: "Plywood Thickness and Furniture Applications", related: "blockboards",
    image: `${I}/blog/workbench.webp`,
    excerpt: "Why thickness matters and how carpenters choose it.",
    body: [
      { p: "Thickness affects stiffness, screw-holding and weight. Thicker boards resist sagging over longer spans." },
      { h: "General principle", p: "Load-bearing parts like shelves and carcass sides use thicker boards; back panels and drawer bottoms use thinner ones." },
      { h: "Long spans", p: "Blockboard is often considered for long shelves because its strip core resists sagging." },
      { h: "Confirm availability", p: "Available thicknesses vary by product. Contact us to check what's currently available." },
    ],
  },
  {
    slug: "caring-for-wooden-furniture", title: "Caring for Wooden Furniture", related: "decorative-laminates",
    image: `${I}/applications/living-room/minimal.webp`,
    excerpt: "Simple habits that keep wardrobes, kitchens and panels looking new.",
    body: [
      { p: "Most care is about controlling moisture, heat and abrasion." },
      { h: "Daily care", p: "Wipe laminates with a soft damp cloth and mild soap. Avoid abrasive pads and harsh chemicals." },
      { h: "Moisture", p: "Wipe spills quickly, especially on edges. Keep furniture slightly away from damp walls." },
      { h: "Veneer", p: "Polished veneer benefits from occasional re-polishing by a professional." },
    ],
  },
];
export const getPost = (s: string) => POSTS.find((p) => p.slug === s);
