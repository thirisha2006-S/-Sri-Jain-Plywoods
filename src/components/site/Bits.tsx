import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ShoppingCart } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Product } from "@/data/catalog";
import { productEnquiry, waLink } from "@/data/site";

export function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-4xl leading-tight text-walnut md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-walnut text-ivory">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 overlay-hero" />
      <div className="container-x relative py-20 md:py-28">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="fade-up mt-4 max-w-3xl text-5xl leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <p className="fade-up mt-5 max-w-xl text-ivory/80">{intro}</p>}
      </div>
    </section>
  );
}

export function WaButton({
  message,
  children = "Enquire on WhatsApp",
  variant = "whatsapp" as const,
  className,
}: {
  message: string;
  children?: ReactNode;
  variant?: "whatsapp" | "walnut" | "gold" | "line";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size="xl" className={className}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4" /> {children}
      </a>
    </Button>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link
        to="/products/$slug"
        params={{ slug: p.slug }}
        className="block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={p.image}
          alt={p.alt}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="text-2xl text-walnut">{p.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.short}</p>
        </div>
        <AddToCartButton product={p} />
        <div className="mt-4 flex items-center justify-between gap-2">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-walnut hover:text-gold"
          >
            View Products <ArrowRight className="h-3 w-3" />
          </Link>
          <a
            href={waLink(productEnquiry(p.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${p.name} on WhatsApp`}
            className="rounded-full p-2 text-whatsapp hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CtaBand({
  title,
  text,
  message,
}: {
  title: string;
  text: string;
  message?: string;
}) {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          <p className="mt-2 text-ivory/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <WaButton message={message ?? productEnquiry("plywood and interior materials")} />
          <Button asChild variant="ghostLight" size="xl">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
