import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: seo("Privacy Policy", "How Sri Jain Plywood handles information shared through this website.") }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="container-x max-w-3xl space-y-5 py-16 text-muted-foreground">
        <p>This website does not store the details you type into the enquiry form. Submitting the form opens WhatsApp on your device with your message pre-filled; it is only sent if you choose to send it.</p>
        <p>Information you send us by WhatsApp or phone is used only to respond to your enquiry. We do not sell your information.</p>
        <p>The embedded Google Map is provided by Google and is subject to Google's privacy policy.</p>
        <p>For any questions, please contact us using the details on the Contact page.</p>
      </div>
    </>
  ),
});
