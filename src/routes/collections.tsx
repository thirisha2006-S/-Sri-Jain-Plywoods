import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PageHero, WaButton } from "@/components/site/Bits";
import { COLLECTIONS, PRODUCTS, type Collection } from "@/data/catalog";
import { productEnquiry } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: seo(
      "Interior Collections",
      "Curated material collections — Modern Minimalist, Warm Walnut, Natural Oak, Luxury Kitchen, Contemporary Wardrobes and Timeless Doors.",
    ),
  }),
  component: Collections,
});

function Collections() {
  const [open, setOpen] = useState<Collection | null>(null);
  useEffect(() => {
    const h = window.location.hash.slice(1);
    const c = COLLECTIONS.find((x) => x.slug === h);
    if (c) setOpen(c);
  }, []);
  const items = open
    ? open.products
        .map((s) => PRODUCTS.find((p) => p.slug === s))
        .filter((p): p is NonNullable<typeof p> => !!p)
    : [];

  return (
    <>
      <PageHero
        eyebrow="Signature collections"
        title="Materials That Inspire Better Spaces."
        intro="Starting points for your interior palette. Tap a collection to see its materials."
        image="/images/applications/wardrobe/wardrobe.webp"
      />
      <section className="container-x grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => (
          <button
            key={c.slug}
            id={c.slug}
            onClick={() => setOpen(c)}
            className="group relative aspect-[4/5] overflow-hidden rounded-md text-left"
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 overlay-card" />
            <div className="absolute bottom-0 p-6 text-ivory">
              <h2 className="text-3xl">{c.name}</h2>
              <p className="mt-1 text-sm text-ivory/75">{c.description}</p>
              <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-gold">
                View materials →
              </span>
            </div>
          </button>
        ))}
      </section>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {open && (
            <>
              <img
                src={open.image}
                alt=""
                className="aspect-[16/8] w-full rounded-sm object-cover"
              />
              <DialogTitle className="font-display text-3xl text-walnut">{open.name}</DialogTitle>
              <DialogDescription>{open.description}</DialogDescription>
              <div className="grid gap-4 sm:grid-cols-3">
                {items.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group"
                  >
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="aspect-square w-full rounded-sm object-cover"
                    />
                    <p className="mt-2 font-display text-lg text-walnut group-hover:text-oak">
                      {p.name}
                    </p>
                  </Link>
                ))}
              </div>
              <WaButton
                message={productEnquiry(
                  `the ${open.name} collection`,
                  items.map((i) => i.name).join(", "),
                )}
              >
                Enquire about this collection
              </WaButton>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
