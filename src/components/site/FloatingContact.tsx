import { MapPin, MessageCircle, Phone } from "lucide-react";
import { MAPS_DIRECTIONS, TEL_HREF, waLink } from "@/data/site";

const base =
  "flex h-12 w-12 items-center justify-center rounded-full shadow-lift transition-transform hover:-translate-y-0.5";

export function FloatingContact() {
  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:bottom-6 md:right-6"
      aria-label="Quick contact"
    >
      <a
        href={MAPS_DIRECTIONS}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions"
        title="Get directions"
        className={`${base} bg-ivory text-walnut ring-1 ring-border`}
      >
        <MapPin className="h-5 w-5" />
      </a>
      <a
        href={TEL_HREF}
        aria-label="Call now"
        title="Call now"
        className={`${base} bg-walnut text-gold`}
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
        className={`${base} bg-whatsapp text-ivory`}
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
