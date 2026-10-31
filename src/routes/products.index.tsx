import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHero, ProductCard } from "@/components/site/Bits";
import { ALL_FINISHES, ALL_THICKNESSES, GROUPS, PRODUCTS, type Group } from "@/data/catalog";
import { seo } from "@/lib/seo";

type Search = { category?: Group | undefined; q?: string | undefined; finish?: string | undefined; thickness?: string | undefined; sort?: "az" | "za" | undefined };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: GROUPS.some((g) => g.id === s["category"]) ? (s["category"] as Group) : undefined,
    q: typeof s["q"] === "string" && s["q"] ? s["q"].slice(0, 60) : undefined,
    finish: typeof s["finish"] === "string" && s["finish"] ? s["finish"] : undefined,
    thickness: typeof s["thickness"] === "string" && s["thickness"] ? s["thickness"] : undefined,
    sort: s["sort"] === "za" ? "za" : s["sort"] === "az" ? "az" : undefined,
  }),
  head: () => ({ meta: seo("Product Catalogue", "Browse plywood, laminates, MDF, HDF, blockboard, doors, veneers and interior hardware. Contact Sri Jain Plywood for the latest prices.") }),
  component: Products,
});

const sel = "h-11 rounded-sm border bg-card px-3 text-sm";

function Products() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const set = (patch: Partial<Search>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const list = useMemo(() => {
    const q = s.q?.toLowerCase();
    const r = PRODUCTS.filter((p) =>
      (!s.category || p.group === s.category) &&
      (!q || `${p.name} ${p.short} ${p.uses.join(" ")}`.toLowerCase().includes(q)) &&
      (!s.finish || p.finishes.includes(s.finish)) &&
      (!s.thickness || p.thicknesses.includes(s.thickness)),
    );
    return [...r].sort((a, b) => (s.sort === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
  }, [s]);

  const active = GROUPS.find((g) => g.id === s.category);

  return (
    <>
      <PageHero eyebrow="Catalogue" title={active ? active.label : "Our Products"} intro="A catalogue of the materials we supply. Prices and availability change — contact us for the latest price." image="/images/products/laminates/decorative.webp" />
      <section className="container-x py-12 md:py-16">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          <button role="tab" aria-selected={!s.category} onClick={() => set({ category: undefined })} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${!s.category ? "border-walnut bg-walnut text-ivory" : "hover:border-gold"}`}>All</button>
          {GROUPS.map((g) => (
            <button key={g.id} role="tab" aria-selected={s.category === g.id} onClick={() => set({ category: g.id })} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${s.category === g.id ? "border-walnut bg-walnut text-ivory" : "hover:border-gold"}`}>{g.label}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <input type="search" aria-label="Search products by name" placeholder="Search products…" defaultValue={s.q ?? ""} maxLength={60} onChange={(e) => set({ q: e.target.value || undefined })} className={sel} />
          <select aria-label="Filter by finish" value={s.finish ?? ""} onChange={(e) => set({ finish: e.target.value || undefined })} className={sel}>
            <option value="">All finishes</option>
            {ALL_FINISHES.map((f) => <option key={f}>{f}</option>)}
          </select>
          <select aria-label="Filter by thickness" value={s.thickness ?? ""} onChange={(e) => set({ thickness: e.target.value || undefined })} disabled={!ALL_THICKNESSES.length} className={`${sel} disabled:opacity-60`}>
            <option value="">{ALL_THICKNESSES.length ? "All thicknesses" : "Thickness — ask us"}</option>
            {ALL_THICKNESSES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select aria-label="Sort" value={s.sort ?? "az"} onChange={(e) => set({ sort: e.target.value as "az" | "za" })} className={sel}>
            <option value="az">Name A–Z</option><option value="za">Name Z–A</option>
          </select>
        </div>
        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} product{list.length === 1 ? "" : "s"}</p>
        {list.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        ) : (
          <div className="mt-6 rounded-md border bg-card p-10 text-center">
            <p className="font-display text-2xl text-walnut">No matching products</p>
            <button onClick={() => navigate({ search: {} })} className="mt-4 text-sm font-semibold text-gold underline">Clear filters</button>
          </div>
        )}
      </section>
    </>
  );
}
