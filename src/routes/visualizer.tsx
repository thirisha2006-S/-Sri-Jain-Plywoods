import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, WaButton } from "@/components/site/Bits";
import { FINISHES, SCENES } from "@/data/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/visualizer")({
  head: () => ({
    meta: seo(
      "Visualize Your Space",
      "Pair interior scenes with oak, walnut, teak, matte white, beige, charcoal and marble-effect finishes to plan your space.",
    ),
  }),
  component: Visualizer,
});

function Visualizer() {
  const [scene, setScene] = useState(SCENES[0]!);
  const [finish, setFinish] = useState(FINISHES[0]!);
  return (
    <>
      <PageHero
        eyebrow="Interactive tool"
        title="Visualize Your Space."
        intro="Choose a room, then compare finishes beside it. This is a mood-board style preview — see real samples in our showroom before you decide."
      />
      <section className="container-x py-12 md:py-16">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Room">
          {SCENES.map((s) => (
            <button
              key={s.id}
              role="radio"
              aria-checked={s.id === scene.id}
              onClick={() => setScene(s)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${s.id === scene.id ? "border-walnut bg-walnut text-ivory" : "hover:border-gold"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="relative overflow-hidden rounded-md shadow-lift">
            <img
              src={scene.image}
              alt={`${scene.label} reference scene`}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-sm bg-background/95 p-2 pr-4 shadow-soft">
              <span
                className="h-14 w-14 rounded-sm ring-1 ring-border"
                style={{ background: finish.bg }}
              />
              <span>
                <span className="eyebrow block">Selected finish</span>
                <span className="font-display text-xl text-walnut">{finish.label}</span>
              </span>
            </div>
          </div>
          <div className="rounded-md border bg-card p-6">
            <div
              className="h-40 rounded-sm ring-1 ring-border"
              style={{ background: finish.bg }}
              aria-hidden
            />
            <p className="mt-4 font-display text-2xl text-walnut">{finish.label}</p>
            <p className="text-sm text-muted-foreground">for your {scene.label.toLowerCase()}</p>
            <div className="mt-5 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Finish">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  role="radio"
                  aria-checked={f.id === finish.id}
                  aria-label={f.label}
                  title={f.label}
                  onClick={() => setFinish(f)}
                  className={`aspect-square rounded-sm ring-2 ring-offset-2 ${f.id === finish.id ? "ring-gold" : "ring-transparent"}`}
                  style={{ background: f.bg }}
                />
              ))}
            </div>
            <WaButton
              className="mt-6 w-full"
              message={`Hello Sri Jain Plywood, I'm interested in a ${finish.label} finish for my ${scene.label.toLowerCase()}. Please share available options and pricing.`}
            >
              Enquire About This Finish
            </WaButton>
            <p className="mt-3 text-xs text-muted-foreground">
              Swatches show approximate tone only. Actual colours, textures and availability vary by
              product.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
