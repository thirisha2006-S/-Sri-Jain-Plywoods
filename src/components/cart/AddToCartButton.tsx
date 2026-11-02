"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/cart";
import type { Product } from "@/data/catalog";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      {product.price == null ? (
        <p className="text-xs text-muted-foreground">Contact us for price</p>
      ) : (
        <span className="text-sm font-semibold text-walnut">
          {formatPrice(product.price)} {product.priceUnit ? `(${product.priceUnit})` : ""}
        </span>
      )}
      <Button
        onClick={handleAdd}
        disabled={product.price == null}
        variant={added ? "gold" : "walnut"}
        size="xl"
        className="flex-1 text-xs"
      >
        {added ? (
          <>
            <ShoppingCart className="h-3.5 w-3.5" /> Added
          </>
        ) : (
          <>
            <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
          </>
        )}
      </Button>
    </div>
  );
}
