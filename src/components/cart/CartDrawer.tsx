"use client";

import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/cart";
import { waLink } from "@/data/site";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, setQuantity, subtotal, clear } = useCart();

  if (!open) return null;

  const cartUrl = waLink(
    `Hello Sri Jain Plywood, I'd like to place an order for the following items:%0A%0A${items
      .map((i) => `${i.quantity}× ${i.product.name} (${i.product.priceUnit ?? "unit"})`)
      .join(
        "%0A",
      )}%0A%0ATotal: ₹${subtotal}%0APlease confirm availability and delivery to MGM Nagar, Kakkalur, Tamil Nadu 602001.`,
  );

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-background shadow-xl flex flex-col h-full border-l border-border">
        <div className="flex items-center justify-between border-b p-5 bg-background">
          <h2 className="text-xl text-walnut font-semibold">Your cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 inline-flex items-center justify-center rounded-sm bg-walnut px-5 py-2 text-xs font-medium text-ivory hover:bg-charcoal"
              >
                Keep browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const p = item.product;
                const lineTotal = (p.price ?? 0) * item.quantity;
                return (
                  <div key={p.slug} className="flex gap-3">
                    <div className="aspect-[4/3] flex-shrink-0 overflow-hidden rounded-sm bg-muted">
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
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {p.price != null ? `₹${p.price} × ${item.quantity}` : "Price on request"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setQuantity(p.slug, item.quantity - 1)}
                            className="h-7 w-7 rounded border border-border hover:bg-muted"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-1.5 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(p.slug, item.quantity + 1)}
                            className="h-7 w-7 rounded border border-border hover:bg-muted"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
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
                        <p className="mt-1 text-xs font-semibold text-walnut">₹{lineTotal}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="border-t p-5 bg-background">
          {subtotal > 0 ? (
            <>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/checkout"
                  className="flex-1 inline-flex items-center justify-center rounded-sm bg-walnut px-4 py-3 text-xs font-medium text-ivory hover:bg-charcoal"
                >
                  Checkout
                </Link>
                <button
                  onClick={clear}
                  className="flex-1 inline-flex items-center justify-center rounded-sm border border-border px-4 py-3 text-xs font-medium text-destructive hover:bg-destructive/5"
                >
                  Clear
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Prices are indicative. We’ll confirm the final amount before payment.
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Add items to start shopping.</p>
          )}
          {items.length > 0 && (
            <div className="mt-4">
              <a
                href={cartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full rounded-sm border border-walnut/30 px-4 py-3 text-xs font-medium uppercase tracking-wider text-walnut hover:border-gold"
              >
                Or order via WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
