import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAPS_DIRECTIONS, MAPS_EMBED, SITE, TEL_HREF, DEFAULT_ENQUIRY } from "@/data/site";
import { SectionHead, WaButton } from "./Bits";

export function LocationSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHead eyebrow="Showroom" title="Visit Sri Jain Plywood." intro="See and feel materials in person, compare samples, and get guidance for your project." />
          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-gold" /><div><dt className="font-semibold">Location</dt><dd className="text-muted-foreground">{SITE.addressArea}<br /><span className="text-xs">As listed on Google Maps</span></dd></div></div>
            <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-gold" /><div><dt className="font-semibold">Phone</dt><dd><a href={TEL_HREF} className="text-walnut underline-offset-4 hover:underline">{SITE.phoneDisplay}</a></dd></div></div>
            {SITE.businessHours && <div><dt className="font-semibold">Hours</dt><dd>{SITE.businessHours}</dd></div>}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="walnut" size="xl"><a href={SITE.mapsShareUrl} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" /> Open in Google Maps</a></Button>
            <Button asChild variant="line" size="xl"><a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"><Navigation className="h-4 w-4" /> Get Directions</a></Button>
            <WaButton message={DEFAULT_ENQUIRY} />
          </div>
        </div>
        <div className="overflow-hidden rounded-md border shadow-soft lg:col-span-3">
          <iframe title="Map showing Sri Jain Plywood location" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[380px] w-full md:h-[480px]" />
        </div>
      </div>
    </section>
  );
}
