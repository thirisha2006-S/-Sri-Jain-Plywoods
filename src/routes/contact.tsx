import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { LocationSection } from "@/components/site/LocationSection";
import { SITE, TEL_HREF, waLink } from "@/data/site";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo(
      "Contact Us",
      `Call ${SITE.phoneDisplay}, WhatsApp or visit Sri Jain Plywood in ${SITE.addressArea}. Send a product enquiry online.`,
    ),
    scripts: [localBusinessJsonLd()],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        intro="Call, WhatsApp or send an enquiry — share sizes, photos or drawings and we'll help with options."
        image="/images/applications/kitchen/kitchen.webp"
      />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <Logo />
          <div className="space-y-3">
            <Button asChild variant="walnut" size="xl" className="w-full">
              <a href={TEL_HREF}>
                <Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="xl" className="w-full">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{SITE.addressArea}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "/images/products/laminates/decorative.webp",
              "/images/products/plywood/commercial.webp",
            ].map((s) => (
              <img
                key={s}
                src={s}
                alt=""
                loading="lazy"
                className="aspect-square rounded-sm object-cover"
              />
            ))}
          </div>
          <Link
            to="/gallery"
            className="text-xs font-semibold uppercase tracking-wider text-walnut hover:text-gold"
          >
            Showroom gallery →
          </Link>
        </aside>
        <div>
          <h2 className="mb-6 text-4xl text-walnut">Send an enquiry</h2>
          <EnquiryForm />
        </div>
      </section>
      <LocationSection />
    </>
  );
}
