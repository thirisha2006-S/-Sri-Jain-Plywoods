import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, SectionHead } from "@/components/site/Bits";
import { ComparisonSection, WhyChoose } from "@/components/site/Sections";
import { LocationSection } from "@/components/site/LocationSection";
import { COLLECTIONS, PRODUCTS, SCENES } from "@/data/catalog";
import { POSTS } from "@/data/blog";
import { seo } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/jsonld";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo(
      "Plywood, Laminates & Interior Materials in Kakkalur",
      "Explore commercial, BWR and marine plywood, decorative laminates, MDF, blockboard, doors and veneers at Sri Jain Plywood, Kakkalur, Tamil Nadu.",
    ),
    scripts: [localBusinessJsonLd()],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-charcoal text-ivory">
        <img
          src="/images/hero/hero.webp"
          alt="Contemporary Indian living room with oak cabinetry and walnut wall panels"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 overlay-hero" />
        <div className="container-x flex min-h-[88vh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-24">
          <p className="fade-up font-display text-4xl font-semibold tracking-[0.18em] text-gold md:text-6xl">
            SRI JAIN PLYWOOD
          </p>
          <span className="gold-rule fade-up mt-4 w-24" />
          <p className="eyebrow fade-up mt-4 max-w-md leading-loose">
            Your trusted plywood & interior materials destination
          </p>
          <h1
            className="fade-up mt-6 max-w-3xl text-6xl leading-[0.98] md:text-8xl"
            style={{ animationDelay: "0.1s" }}
          >
            Crafting Spaces.
            <br />
            <em className="text-gold">Building Trust.</em>
          </h1>
          <p
            className="fade-up mt-6 max-w-lg text-lg text-ivory/80"
            style={{ animationDelay: "0.2s" }}
          >
            Discover quality plywood, laminates, doors, and interior materials for beautiful spaces
            that last.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="gold" size="xl">
              <Link to="/products" search={{}}>
                Explore Our Collection
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/contact">Visit Our Showroom</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Shop by category"
              title="Materials for every part of your project."
            />
            <Link
              to="/products"
              search={{}}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-walnut hover:text-gold"
            >
              Full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-walnut py-20 text-ivory md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Application guides</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Find the Right Material for Every Space.</h2>
            <p className="mt-5 text-ivory/75">
              What each board is, where it's commonly used, its benefits and its honest limitations
              — so you can ask the right questions before you buy.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-8">
              <Link to="/guides">Read the material guides</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/images/products/blockboard/blockboard.webp",
              "/images/applications/kitchen/kitchen.webp",
              "/images/applications/wardrobe/wardrobe.webp",
              "/images/products/plywood/marine.webp",
            ].map((s, i) => (
              <img
                key={s}
                src={s}
                alt=""
                loading="lazy"
                className={`aspect-[4/5] w-full rounded-md object-cover ${i % 2 ? "mt-8" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Visualizer teaser */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Interactive"
            title="Visualize Your Space."
            intro="Pick a room and try finishes side by side before you visit the showroom."
            center
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
            {SCENES.map((s) => (
              <Link
                key={s.id}
                to="/visualizer"
                className="group relative aspect-[3/4] overflow-hidden rounded-md"
              >
                <img
                  src={s.image}
                  alt={s.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 overlay-card" />
                <span className="absolute bottom-4 left-4 font-display text-xl text-ivory">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-muted/60 py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Signature collections"
            title="Materials That Inspire Better Spaces."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.slice(0, 6).map((c, i) => (
              <Link
                key={c.slug}
                to="/collections"
                hash={c.slug}
                className={`group relative overflow-hidden rounded-md ${i === 0 ? "md:row-span-2" : ""}`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full min-h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 overlay-card" />
                <div className="absolute bottom-0 p-6 text-ivory">
                  <h3 className="text-3xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-ivory/75">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img
            src="/images/applications/living-room/wall-panel.webp"
            alt="Living room with fluted walnut wall panels"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-md object-cover shadow-lift"
          />
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="mt-3 text-4xl text-walnut md:text-5xl">
              Quality Materials. Trusted Guidance. Better Spaces.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Sri Jain Plywood helps homeowners, carpenters, contractors, architects and interior
              designers explore plywood and interior materials for furniture, renovation,
              construction and interior projects.
            </p>
            <Button asChild variant="line" size="xl" className="mt-8">
              <Link to="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </section>

      <WhyChoose />
      <ComparisonSection />

      {/* Showroom */}
      <section className="bg-charcoal py-20 text-ivory md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Showroom</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Step Inside Sri Jain Plywood.</h2>
            <p className="mt-3 max-w-lg text-ivory/70">
              Real photographs of our shop and displays — coming soon to the gallery.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/gallery">View gallery</Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/contact">Visit Our Showroom</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <SectionHead eyebrow="Interior ideas" title="Know your materials." />
            <Link
              to="/blog"
              className="hidden text-sm font-semibold uppercase tracking-wider text-walnut hover:text-gold md:inline"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {POSTS.slice(0, 3).map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[16/10] overflow-hidden rounded-md">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl text-walnut group-hover:text-oak">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />
    </>
  );
}
