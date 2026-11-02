import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { cartTotals, formatPrice } from "@/lib/cart";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Sri Jain Plywood" },
      { name: "description", content: "Review items in your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQuantity, clear } = useCart();
  const { count, subtotal } = cartTotals(items);
  const navigate = useNavigate({ from: "/cart" });

  const cartUrl = waLink(
    `Hello Sri Jain Plywood, I'd like to place an order for the following items:%0A%0A${items
      .map((i) => `${i.quantity}× ${i.product.name} (${i.product.priceUnit ?? "unit"})`)
      .join(
        "%0A",
      )}%0A%0ATotal: ₹${subtotal}%0APlease confirm availability and delivery to MGM Nagar, Kakkalur, Tamil Nadu 602001.`,
  );

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl text-walnut">🛒</h1>
          <h2 className="mt-4 text-2xl text-walnut">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse our products and add items to get started.
          </p>
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h2 className="mb-6 text-3xl text-walnut">Your cart ({count})</h2>
          <div className="space-y-4">
            {items.map((item) => {
              const p = item.product;
              const lineTotal = (p.price ?? 0) * item.quantity;
              return (
                <div key={p.slug} className="flex gap-4 border-b border-border pb-6 last:border-0">
                  <div className="aspect-[4/3] flex-shrink-0 overflow-hidden rounded-sm bg-muted w-32">
                    <img src={p.image} alt={p.alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="text-sm font-medium text-walnut hover:text-gold line-clamp-1"
                    >
                      {p.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{p.short}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {p.price != null ? `₹${p.price}` : "Price on request"}
                        {p.priceUnit != null && ` × ${item.quantity}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setQuantity(p.slug, item.quantity - 1)}
                          className="h-7 w-7 rounded border border-border hover:bg-muted"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        <span className="px-1.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(p.slug, item.quantity + 1)}
                          className="h-7 w-7 rounded border border-border hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <span className="h-3 w-3 text-[10px] font-bold">+</span>
                        </button>
                      </div>
                      <button
                        onClick={() => remove(p.slug)}
                        className="h-7 w-7 rounded border border-border text-destructive hover:bg-destructive/10"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {lineTotal > 0 && (
                      <p className="mt-1 text-xs font-semibold text-walnut">
                        Line total: ₹{lineTotal}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {subtotal > 0 && (
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={clear}
                className="text-sm font-medium text-destructive hover:underline"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
        <div className="lg:w-1/3 space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-soft">
            <h3 className="mb-4 text-lg font-semibold text-walnut">Order summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items ({count})</span>
                <span className="font-medium">{count}</span>
              </div>
              {subtotal > 0 && (
                <div className="flex justify-between text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span>Kakkalur, Tamil Nadu</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-base font-semibold text-walnut">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>
          <Button asChild variant="walnut" size="xl" className="w-full">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <a
            href={cartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full rounded-sm border border-walnut/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-walnut hover:border-gold"
          >
            Order via WhatsApp
          </a>
          <p className="text-xs text-muted-foreground text-center">
            Prices are indicative. We’ll confirm the final amount before payment.
          </p>
        </div>
      </div>
    </div>
  );
}
