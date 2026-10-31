import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, WaButton } from "@/components/site/Bits";
import { ComparisonSection } from "@/components/site/Sections";
import { PRODUCTS } from "@/data/catalog";
import { productEnquiry } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/guides")({
  head: () => ({ meta: seo("Material Application Guides", "What plywood, BWR, BWP/marine, blockboard, MDF, HDF, laminates and doors are, where they're commonly used, and their limitations.") }),
  component: Guides,
});

const GUIDE_SLUGS = ["commercial-plywood", "bwr-plywood", "bwp-marine-plywood", "blockboards", "mdf-boards", "hdf-boards", "decorative-laminates", "acrylic-laminates", "veneers", "flush-doors", "decorative-doors"];

function Guides() {
  const items = GUIDE_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <>
      <PageHero eyebrow="Interior solutions" title="Find the Right Material for Every Space." intro="Plain-language guides to each material. Suitability always depends on the specific product's grade and the manufacturer's specification." image="/images/products/blockboard/blockboard.webp" />
      <nav aria-label="Guide index" className="sticky top-[72px] z-30 border-b bg-background/95 backdrop-blur">
        <div className="container-x flex gap-5 overflow-x-auto py-3 text-xs font-semibold uppercase tracking-wider">
          {items.map((p) => <a key={p.slug} href={`#${p.slug}`} className="shrink-0 text-muted-foreground hover:text-walnut">{p.name}</a>)}
        </div>
      </nav>
      <div className="container-x divide-y">
        {items.map((p, i) => (
          <article key={p.slug} id={p.slug} className="grid scroll-mt-32 gap-10 py-16 lg:grid-cols-2">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-soft" />
              {p.gallery[1] && <img src={p.gallery[1]} alt="" loading="lazy" className="mt-4 aspect-[16/7] w-full rounded-md object-cover" />}
            </div>
            <div>
              <p className="eyebrow">Material {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-4xl text-walnut">{p.name}</h2>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider">What it is</h3>
              <p className="mt-1 text-muted-foreground">{p.what}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div><h3 className="text-sm font-semibold uppercase tracking-wider">Commonly used for</h3><ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{p.uses.map((u) => <li key={u}>{u}</li>)}</ul></div>
                <div><h3 className="text-sm font-semibold uppercase tracking-wider">Key benefits</h3><ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{p.benefits.map((u) => <li key={u}>{u}</li>)}</ul></div>
              </div>
              <div className="mt-6 rounded-md border-l-2 border-gold bg-card p-4"><h3 className="text-sm font-semibold uppercase tracking-wider">Important limitations</h3><ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">{p.limitations.map((u) => <li key={u}>{u}</li>)}</ul></div>
              <p className="mt-4 text-sm"><strong>Available thicknesses:</strong> {p.thicknesses.length ? p.thicknesses.join(", ") : "please contact us to confirm current options."}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WaButton message={productEnquiry(p.name, "quote request")}>Request a Quote</WaButton>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="inline-flex h-12 items-center px-4 text-xs font-semibold uppercase tracking-wider text-walnut hover:text-gold">Product details →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ComparisonSection />
    </>
  );
}
