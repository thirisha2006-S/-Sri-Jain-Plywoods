import { Link } from "@tanstack/react-router";
import { Compass, Handshake, Layers, MessagesSquare, Store, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHead } from "./Bits";

const WHY = [
  {
    icon: Compass,
    t: "Product Guidance",
    d: "Help matching the right board, grade and finish to where it will be used.",
  },
  {
    icon: Layers,
    t: "Multiple Material Choices",
    d: "Plywood, boards, laminates, veneers, doors and fittings in one place.",
  },
  {
    icon: Wallet,
    t: "Solutions for Different Budgets",
    d: "Options across grades so you can balance cost and performance.",
  },
  {
    icon: Handshake,
    t: "Interior Application Support",
    d: "Practical advice for kitchens, wardrobes, panelling and offices.",
  },
  {
    icon: MessagesSquare,
    t: "Convenient Product Enquiries",
    d: "Ask on WhatsApp or call — share sizes, photos or drawings.",
  },
  { icon: Store, t: "Showroom Assistance", d: "Visit to compare samples and finishes in person." },
];

export function WhyChoose() {
  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Why Sri Jain Plywood" title="Guidance you can build on." center />
        <div className="mt-14 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-background p-8">
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
              <h3 className="mt-5 text-2xl text-walnut">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ROWS = [
  {
    m: "Plywood",
    type: "Board",
    what: "Cross-laminated wood veneers",
    uses: "Carcasses, wardrobes, beds, shelves",
    cost: "Moderate to higher, varies by grade",
    moisture: "Depends on grade (commercial, BWR, BWP)",
    finish: "Laminate, veneer, paint",
    ask: "Which grade and standard? Suitable for this room?",
  },
  {
    m: "MDF",
    type: "Board",
    what: "Fine wood fibres pressed with resin",
    uses: "Routed panels, painted shutters, decor",
    cost: "Often economical",
    moisture: "Standard MDF is moisture-sensitive",
    finish: "Paint, laminate, membrane",
    ask: "Is a moisture-resistant grade needed?",
  },
  {
    m: "HDF",
    type: "Board",
    what: "Higher-density fibreboard",
    uses: "Back panels, drawer bases, door skins",
    cost: "Economical for thin panels",
    moisture: "Varies by grade",
    finish: "Laminate, paint",
    ask: "What thickness and density for this part?",
  },
  {
    m: "Blockboard",
    type: "Board",
    what: "Softwood strip core with veneer faces",
    uses: "Long shelves, doors, partitions",
    cost: "Moderate",
    moisture: "Generally for dry interiors unless specified",
    finish: "Laminate, veneer",
    ask: "Is the span long enough to need it?",
  },
  {
    m: "Decorative laminates",
    type: "Surface finish",
    what: "Thin decorative sheet applied over a board",
    uses: "Shutters, cabinets, wall panels",
    cost: "Wide range by finish",
    moisture: "Protects the face; edges need banding",
    finish: "Matte, gloss, wood, stone, textured",
    ask: "Which base board and adhesive will be used?",
  },
];

export function ComparisonTable() {
  return (
    <div className="mt-12 overflow-x-auto rounded-md border bg-card shadow-soft">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-walnut text-ivory">
          <tr>
            {[
              "Material",
              "What it is",
              "Common uses",
              "Relative cost",
              "Moisture limitations",
              "Surface options",
              "Ask before buying",
            ].map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.m} className="border-t align-top">
              <th scope="row" className="px-4 py-4">
                <span className="font-display text-lg text-walnut">{r.m}</span>
                <br />
                <span className="text-xs uppercase tracking-wider text-gold">{r.type}</span>
              </th>
              <td className="px-4 py-4">{r.what}</td>
              <td className="px-4 py-4">{r.uses}</td>
              <td className="px-4 py-4">{r.cost}</td>
              <td className="px-4 py-4">{r.moisture}</td>
              <td className="px-4 py-4">{r.finish}</td>
              <td className="px-4 py-4 text-muted-foreground">{r.ask}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Material comparison"
          title="Plywood, MDF, HDF, blockboard & laminates."
          intro="Laminates are decorative surface materials. Plywood, MDF, HDF and blockboard are the boards they're applied to. Use this as a starting point — always confirm the specification of the actual product."
        />
        <ComparisonTable />
        <Button asChild variant="walnut" size="xl" className="mt-8">
          <Link to="/contact">Need Help Choosing? Contact Us.</Link>
        </Button>
      </div>
    </section>
  );
}
