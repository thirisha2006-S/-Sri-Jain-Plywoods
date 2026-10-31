import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Info } from "lucide-react";
import { ProductCard, WaButton } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { GROUPS, PRODUCTS, getProduct } from "@/data/catalog";
import { productEnquiry } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? seo(loaderData.name, `${loaderData.short} ${loaderData.what}`.slice(0, 155), "product") : [{ title: "Product not found | Sri Jain Plywood" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

const verifyNote = "Available on request — contact us";

function ProductPage() {
  const p = Route.useLoaderData();
  const [img, setImg] = useState(p.gallery[0]);
  const group = GROUPS.find((g) => g.id === p.group)!;
  const related = PRODUCTS.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <div className="container-x py-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-walnut">Home</Link> / <Link to="/products" search={{}} className="hover:text-walnut">Products</Link> /{" "}
        <Link to="/products" search={{ category: p.group }} className="hover:text-walnut">{group.label}</Link> / <span className="text-foreground">{p.name}</span>
      </div>
      <section className="container-x grid gap-10 pb-16 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted shadow-soft"><img src={img} alt={p.alt} className="h-full w-full object-cover" /></div>
          {p.gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.gallery.map((g) => (
                <button key={g} onClick={() => setImg(g)} aria-label="Show image" className={`h-20 w-28 overflow-hidden rounded-sm ring-2 ${g === img ? "ring-gold" : "ring-transparent"}`}><img src={g} alt="" className="h-full w-full object-cover" /></button>
              ))}
            </div>
          )}
          <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Illustrative photograph. It does not represent a specific brand, grade or certification.</p>
        </div>
        <div>
          <p className="eyebrow">{group.label}</p>
          <h1 className="mt-3 text-5xl text-walnut">{p.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.what}</p>
          <p className="mt-6 inline-block rounded-sm bg-muted px-4 py-2 text-sm font-semibold text-walnut">Contact us for the latest price.</p>

          <dl className="mt-8 grid gap-4 border-y py-6 text-sm sm:grid-cols-2">
            <div><dt className="font-semibold">Finishes</dt><dd className="text-muted-foreground">{p.finishes.join(", ")}</dd></div>
            <div><dt className="font-semibold">Thicknesses</dt><dd className="text-muted-foreground">{p.thicknesses.length ? p.thicknesses.join(", ") : verifyNote}</dd></div>
            <div><dt className="font-semibold">Sizes</dt><dd className="text-muted-foreground">{p.sizes.length ? p.sizes.join(", ") : verifyNote}</dd></div>
            <div><dt className="font-semibold">Brand / model</dt><dd className="text-muted-foreground">{p.brands.length ? p.brands.join(", ") : verifyNote}</dd></div>
          </dl>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div><h2 className="text-xl text-walnut">Common uses</h2><ul className="mt-2 space-y-1 text-sm">{p.uses.map((u) => <li key={u} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{u}</li>)}</ul></div>
            <div><h2 className="text-xl text-walnut">Benefits</h2><ul className="mt-2 space-y-1 text-sm">{p.benefits.map((u) => <li key={u} className="flex gap-2"><Check className="h-4 w-4 text-gold" />{u}</li>)}</ul></div>
          </div>
          <div className="mt-6 rounded-md border-l-2 border-gold bg-card p-4 text-sm"><h2 className="font-semibold">Good to know</h2><ul className="mt-1 list-disc pl-5 text-muted-foreground">{p.limitations.map((l) => <li key={l}>{l}</li>)}</ul></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <WaButton message={productEnquiry(p.name)} />
            <a href="#enquire" className="inline-flex h-12 items-center rounded-sm border border-walnut/30 px-7 text-xs font-semibold uppercase tracking-wide text-walnut hover:border-gold">Request a quote</a>
          </div>
        </div>
      </section>
      <section id="enquire" className="bg-muted/60 py-16">
        <div className="container-x max-w-4xl">
          <h2 className="mb-6 text-4xl text-walnut">Enquire about {p.name}</h2>
          <EnquiryForm defaultCategory={group.label} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="container-x py-16">
          <h2 className="text-3xl text-walnut">Related products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </>
  );
}
