import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/Bits";
import { WhyChoose } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo("About Us", "Sri Jain Plywood helps customers explore plywood and interior materials for furniture, renovation, construction and interior design projects.") }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About Sri Jain Plywood" title="Quality Materials. Trusted Guidance. Better Spaces." image="/images/applications/living-room/wall-panel.webp" />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p className="font-display text-3xl leading-snug text-walnut">We help you choose materials with confidence — whether you're building a single wardrobe or fitting out a whole home.</p>
          <p>Sri Jain Plywood supplies plywood, boards, laminates, veneers, doors and interior fittings for furniture, renovation, construction and interior design projects.</p>
          <p>We work with homeowners, carpenters, contractors, builders, architects and interior designers. Our focus is simple: explain the options clearly, including what each material is — and isn't — suited for, so the right product goes into the right place.</p>
        </div>
        <img src="/images/blog/workbench.webp" alt="Plywood offcuts and laminate samples on a carpenter's workbench" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-lift" />
      </section>
      <WhyChoose />
      <CtaBand title="Planning a project?" text="Tell us what you're building and we'll suggest suitable materials." />
    </>
  );
}
