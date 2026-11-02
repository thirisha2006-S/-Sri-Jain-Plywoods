import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PageHero } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: seo(
      "Showroom Gallery",
      "Step inside Sri Jain Plywood — photographs of our shop, product racks and laminate displays.",
    ),
  }),
  component: Gallery,
});

// Replace `src: null` with real shop photos, e.g. "/images/showroom/exterior.webp".
// Only use genuine photographs of the Sri Jain Plywood shop here.
const PHOTOS: { title: string; src: string | null }[] = [
  { title: "Showroom exterior & signboard", src: null },
  { title: "Plywood stacks", src: null },
  { title: "Laminate display", src: null },
  { title: "Product racks", src: null },
  { title: "Showroom interior", src: null },
  { title: "Door display", src: null },
  { title: "Veneer samples", src: null },
  { title: "Material close-ups", src: null },
];

function Gallery() {
  const real = PHOTOS.filter((p): p is { title: string; src: string } => !!p.src);
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Step Inside Sri Jain Plywood."
        intro="Genuine photographs of our shop will appear here."
      />
      <section className="container-x py-16">
        {real.length === 0 && (
          <p className="mb-8 rounded-md border-l-2 border-gold bg-card p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Temporary placeholders.</strong> Real showroom
            photographs are being prepared and will replace these tiles.
          </p>
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PHOTOS.map((p, i) =>
            p.src ? (
              <button
                key={p.title}
                onClick={() => setIdx(real.findIndex((r) => r.src === p.src))}
                className={`overflow-hidden rounded-md ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ) : (
              <div
                key={p.title}
                className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-md border border-dashed border-oak/50 bg-muted text-center ${i % 5 === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}
              >
                <Camera className="h-6 w-6 text-oak" strokeWidth={1.25} />
                <span className="px-3 text-sm text-walnut">{p.title}</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  Photo coming soon
                </span>
              </div>
            ),
          )}
        </div>
        <Button asChild variant="walnut" size="xl" className="mt-10">
          <Link to="/contact">Visit Our Showroom</Link>
        </Button>
      </section>
      <Dialog open={idx !== null} onOpenChange={(o) => !o && setIdx(null)}>
        <DialogContent className="max-w-5xl bg-charcoal p-2">
          {idx !== null && real[idx] && (
            <>
              <DialogTitle className="sr-only">{real[idx].title}</DialogTitle>
              <img
                src={real[idx].src}
                alt={real[idx].title}
                className="max-h-[80vh] w-full object-contain"
              />
              <div className="flex items-center justify-between p-2 text-ivory">
                <button
                  aria-label="Previous"
                  onClick={() => setIdx((idx - 1 + real.length) % real.length)}
                >
                  <ChevronLeft />
                </button>
                <span className="text-sm">{real[idx].title}</span>
                <button aria-label="Next" onClick={() => setIdx((idx + 1) % real.length)}>
                  <ChevronRight />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
