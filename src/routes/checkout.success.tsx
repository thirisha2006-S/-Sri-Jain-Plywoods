import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | Sri Jain Plywood" },
      { name: "description", content: "Thank you for your order." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="container-x py-12 md:py-16 max-w-md">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl text-walnut">Thank you!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your order has been placed. We’ll confirm availability, final pricing and delivery to MGM
          Nagar, Kakkalur shortly.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-sm bg-walnut px-5 py-2.5 text-sm font-medium text-ivory hover:bg-charcoal"
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-2" /> Browse more products
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-walnut hover:bg-muted"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
