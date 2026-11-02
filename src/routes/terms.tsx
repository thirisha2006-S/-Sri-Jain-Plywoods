import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: seo(
      "Terms & Conditions",
      "Terms for using the Sri Jain Plywood website and product catalogue.",
    ),
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <div className="container-x max-w-3xl space-y-5 py-16 text-muted-foreground">
        <p>
          Product photographs on this website are illustrative and do not represent a specific
          brand, grade, thickness or certification.
        </p>
        <p>
          The catalogue is for information only and does not show live stock. Prices, specifications
          and availability are confirmed at the time of enquiry or purchase.
        </p>
        <p>
          Material guidance is general. Suitability for a particular use depends on the specific
          product, its manufacturer's specification and site conditions.
        </p>
      </div>
    </>
  ),
});
