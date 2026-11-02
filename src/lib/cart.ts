import type { Product } from "@/data/catalog";

const STORAGE_KEY = "sjp_cart";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export function loadCart(): Cart {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as Cart;
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // storage unavailable — ignore
  }
}

export function cartTotals(items: CartItem[]) {
  let count = 0;
  let subtotal = 0;
  for (const item of items) {
    count += item.quantity;
    if (item.product.price != null) subtotal += item.product.price * item.quantity;
  }
  return { count, subtotal };
}

export function formatPrice(price: number | undefined | null): string {
  if (price == null) return "Price on request";
  return `₹${price}`;
}
