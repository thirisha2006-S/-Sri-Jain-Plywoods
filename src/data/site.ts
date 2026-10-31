// ─── Editable business information ─────────────────────────────────────────
// Only publish details the owner has verified. Leave fields null until then.
export const SITE = {
  name: "Sri Jain Plywood",
  tagline: "Plywood & Interior Materials",
  phoneDisplay: "044 2766 5382",
  phoneRaw: "04427665382",
  // Address as shown on the shop's Google Maps listing. Confirm the full street address with the owner.
  addressArea: "MGM Nagar, Kakkalur, Tamil Nadu 602001",
  mapsPlaceQuery: "Jain plywoods, MGM Nagar, Kakkalur, Tamil Nadu 602001",
  mapsShareUrl: "https://maps.app.goo.gl/k2yK6W5fWwuwHGUK9?g_st=awb",
  businessHours: null as string | null, // e.g. "Mon–Sat, 9:00 AM – 8:00 PM" once verified
  socials: [] as { label: string; href: string }[], // add only real profiles
};

/** Convert an Indian number (with trunk 0, spaces, +91 etc.) to WhatsApp's digits-only international form. */
export function toWhatsAppNumber(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("0091")) d = d.slice(4);
  else if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  d = d.replace(/^0+/, "");
  if (d.length !== 10) throw new Error(`Invalid Indian phone number: ${input}`);
  return `91${d}`;
}

export const WHATSAPP_NUMBER = toWhatsAppNumber(SITE.phoneRaw);
export const TEL_HREF = `tel:${SITE.phoneRaw}`;

export const DEFAULT_ENQUIRY =
  "Hello Sri Jain Plywood, I would like to enquire about plywood and interior materials for my project. Please share the available options and pricing.";

export function waLink(message: string = DEFAULT_ENQUIRY) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(name: string, extra?: string) {
  return `Hello Sri Jain Plywood, I would like to enquire about ${name}${extra ? ` (${extra})` : ""}. Please share the available options and pricing.`;
}

export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsPlaceQuery)}&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsPlaceQuery)}`;
