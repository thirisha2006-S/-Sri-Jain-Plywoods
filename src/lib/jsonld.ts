import { SITE } from "@/data/site";

// Only verified fields: name, phone, locality/postcode from the Google Maps listing.
export function localBusinessJsonLd() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: SITE.name,
      telephone: "+91-44-2766-5382",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kakkalur",
        addressRegion: "Tamil Nadu",
        postalCode: "602001",
        addressCountry: "IN",
      },
      hasMap: SITE.mapsShareUrl,
    }),
  };
}
