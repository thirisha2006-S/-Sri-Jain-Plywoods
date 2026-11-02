"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Product } from "@/data/catalog";
import type { Cart, CartItem } from "@/lib/cart";
import { cartTotals, loadCart, saveCart } from "@/lib/cart";

const CartContext = createContext<{
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    const cart: Cart = loadCart();
    setItems(cart.items);
    hydrated.current = true;
  }, []);

  const persist = useCallback((next: SetStateAction<CartItem[]>) => {
    setItems((prev) => {
      const resolved =
        typeof next === "function" ? (next as (prev: CartItem[]) => CartItem[])(prev) : next;
      saveCart({ items: resolved });
      return resolved;
    });
  }, []);

  const add = useCallback(
    (product: Product, qty = 1) => {
      persist((prev) => {
        const existing = prev.find((i) => i.product.slug === product.slug);
        if (existing) {
          return prev.map((i) =>
            i.product.slug === product.slug ? { ...i, quantity: i.quantity + qty } : i,
          );
        }
        return [...prev, { product, quantity: qty }];
      });
    },
    [persist],
  );

  const remove = useCallback(
    (slug: string) => {
      persist((prev) => prev.filter((i) => i.product.slug !== slug));
    },
    [persist],
  );

  const setQuantity = useCallback(
    (slug: string, qty: number) => {
      if (qty <= 0) {
        remove(slug);
        return;
      }
      persist((prev) => prev.map((i) => (i.product.slug === slug ? { ...i, quantity: qty } : i)));
    },
    [persist, remove],
  );

  const clear = useCallback(() => {
    persist([]);
  }, [persist]);

  const { count, subtotal } = cartTotals(items);

  if (!hydrated.current) return null;

  return (
    <CartContext.Provider value={{ items, add, remove, setQuantity, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
