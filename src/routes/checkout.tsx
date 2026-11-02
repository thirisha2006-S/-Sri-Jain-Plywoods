import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/cart/CartProvider";
import { cartTotals, formatPrice } from "@/lib/cart";
import { waLink } from "@/data/site";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  prefill?: { name?: string; contact?: string; email?: string };
  notes?: Record<string, string>;
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayStatic {
  new (options: RazorpayOptions): { open: () => void; close: () => void };
}

declare global {
  interface Window {
    Razorpay?: RazorpayStatic;
  }
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Sri Jain Plywood" },
      {
        name: "description",
        content: "Complete your order — pay online or place the order via WhatsApp.",
      },
    ],
  }),
  component: CheckoutPage,
});

const RAZORPAY_KEY_ID = import.meta.env["VITE_RAZORPAY_KEY_ID"];

function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

function CheckoutPage() {
  const { items, clear } = useCart();
  const { count, subtotal } = cartTotals(items);
  const navigate = useNavigate({ from: "/checkout" });

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const waMessage = `Hello Sri Jain Plywood, I'd like to place an order:%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0AAddress: ${encodeURIComponent(form.address)}%0A%0AItems:%0A${items
    .map((i) => `${i.quantity}× ${i.product.name} (${i.product.priceUnit ?? "unit"})`)
    .join("%0A")}%0A%0ATotal: ₹${subtotal}%0APlease confirm availability and delivery details.`;

  const handleWhatsAppOrder = () => {
    if (!form.name || !form.phone) {
      setError("Please enter your name and phone number.");
      return;
    }
    window.open(waLink(waMessage), "_blank");
    navigate({ to: "/checkout/success" });
  };

  const handleRazorpayPay = async () => {
    if (!form.name || !form.phone) {
      setError("Please enter your name and phone number.");
      return;
    }
    if (!RAZORPAY_KEY_ID) {
      setError("Online payments are not configured yet. Please order via WhatsApp instead.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Razorpay failed to load");
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: subtotal * 100,
        currency: "INR",
        name: "Sri Jain Plywood",
        description: `Order for ${items.map((i) => i.product.name).join(", ")}`,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email,
        },
        notes: {
          address: form.address,
          items: items.map((i) => `${i.quantity}× ${i.product.name}`).join("; "),
        },
        handler: (response) => {
          clear();
          navigate({ to: "/checkout/success" });
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay!(options).open();
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Payment could not be initiated. Try WhatsApp order.",
      );
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl text-walnut">🛒</h1>
          <h2 className="mt-4 text-2xl text-walnut">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Add items before checking out.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-sm bg-walnut px-5 py-2.5 text-sm font-medium text-ivory hover:bg-charcoal"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-8 text-3xl text-walnut">Checkout</h2>

        {error && (
          <div className="mb-6 rounded bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="e.g. Arun Kumar"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Phone number</Label>
              <Input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="e.g. 9380713280"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email (optional)</Label>
            <Input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Delivery address</Label>
            <Input
              value={form.address}
              onChange={handleChange("address")}
              placeholder="MGM Nagar, Kakkalur, Tamil Nadu 602001"
              required
            />
          </div>

          <div className="mt-2 rounded-lg border bg-card p-5 shadow-soft">
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-muted-foreground">Items ({count})</span>
              <span className="font-medium">{count}</span>
            </div>
            {subtotal > 0 && (
              <div className="flex justify-between text-sm font-semibold mb-1">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Prices indicative — final amount confirmed before dispatch.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              type="button"
              onClick={handleRazorpayPay}
              disabled={loading || !RAZORPAY_KEY_ID}
              variant="walnut"
              size="xl"
              className="w-full"
            >
              {loading
                ? "Processing…"
                : RAZORPAY_KEY_ID
                  ? "Pay online (Razorpay)"
                  : "Online payments not configured"}
            </Button>
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppOrder}
              className="inline-flex items-center justify-center w-full rounded-sm border border-walnut/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-walnut hover:border-gold"
            >
              <Mail className="h-4 w-4 mr-2" /> Place order via WhatsApp
            </a>
          </div>

          {!RAZORPAY_KEY_ID && (
            <p className="mt-4 text-xs text-muted-foreground text-center">
              To enable online payments, set the {`VITE_RAZORPAY_KEY_ID`} environment variable with
              your Razorpay key.
            </p>
          )}

          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground text-center">
            Delivered to: MGM Nagar, Kakkalur, Tamil Nadu 602001
          </div>
        </form>
      </div>
    </div>
  );
}
