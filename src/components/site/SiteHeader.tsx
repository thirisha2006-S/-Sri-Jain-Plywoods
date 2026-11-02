import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart as Cart, ChevronDown, Menu, MessageCircle, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { GROUPS } from "@/data/catalog";
import { waLink } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";

const QUICK = [
  { label: "Plywood", group: "plywood" },
  { label: "Laminates", group: "laminates" },
  { label: "Blockboard", group: "blockboard" },
  { label: "MDF & HDF", group: "mdf-hdf" },
  { label: "Doors", group: "doors" },
] as const;

const linkCls =
  "text-[0.78rem] font-medium tracking-wide text-charcoal/80 hover:text-walnut transition-colors";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-soft" : ""}`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="Sri Jain Plywood home" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 whitespace-nowrap 2xl:flex">
          <Link
            to="/"
            className={linkCls}
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-walnut" }}
          >
            Home
          </Link>
          <Link to="/about" className={linkCls}>
            About Us
          </Link>
          <div className="group relative">
            <Link
              to="/products"
              search={{}}
              className={`${linkCls} flex items-center gap-1`}
              aria-haspopup="true"
            >
              Products <ChevronDown className="h-3 w-3" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border bg-card p-2 shadow-lift">
                {GROUPS.map((g) => (
                  <Link
                    key={g.id}
                    to="/products"
                    search={{ category: g.id }}
                    className="block rounded px-3 py-2 text-sm hover:bg-muted"
                  >
                    {g.label}
                  </Link>
                ))}
                <Link
                  to="/products"
                  search={{}}
                  className="mt-1 block border-t px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gold"
                >
                  All products →
                </Link>
              </div>
            </div>
          </div>
          {QUICK.map((c) => (
            <Link key={c.group} to="/products" search={{ category: c.group }} className={linkCls}>
              {c.label}
            </Link>
          ))}
          <Link to="/guides" className={linkCls}>
            Interior Solutions
          </Link>
          <Link to="/gallery" className={linkCls}>
            Gallery
          </Link>
          <Link to="/contact" className={linkCls}>
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            onClick={() => setSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label={`Cart (${count} items)`}
            onClick={() => setCartOpen(true)}
            className={`relative ${count > 0 ? "text-walnut" : ""}`}
          >
            <Link to="/cart">
              <Cart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-walnut text-[0.65rem] text-ivory font-bold ring-1 ring-background">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="walnut" size="sm" className="hidden sm:inline-flex">
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="2xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[80vh] overflow-y-auto border-t bg-background 2xl:hidden"
        >
          <div className="container-x grid gap-1 py-4">
            {(
              [
                ["/", "Home"],
                ["/about", "About Us"],
              ] as const
            ).map(([to, l]) => (
              <Link key={to} to={to} onClick={close} className="py-2.5 text-base">
                {l}
              </Link>
            ))}
            <Link to="/products" search={{}} onClick={close} className="py-2.5 text-base">
              All Products
            </Link>
            <div className="grid grid-cols-2 gap-x-4 border-l-2 border-gold/40 pl-4">
              {GROUPS.map((g) => (
                <Link
                  key={g.id}
                  to="/products"
                  search={{ category: g.id }}
                  onClick={close}
                  className="py-2 text-sm text-muted-foreground"
                >
                  {g.label}
                </Link>
              ))}
            </div>
            {(
              [
                ["/guides", "Interior Solutions"],
                ["/collections", "Collections"],
                ["/visualizer", "Visualizer"],
                ["/gallery", "Gallery"],
                ["/blog", "Blog"],
                ["/contact", "Contact Us"],
              ] as const
            ).map(([to, l]) => (
              <Link key={to} to={to} onClick={close} className="py-2.5 text-base">
                {l}
              </Link>
            ))}
            <Button asChild variant="whatsapp" className="mt-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </Button>
          </div>
        </nav>
      )}

      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent>
          <DialogTitle className="font-display text-2xl">Search products</DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(false);
              navigate({ to: "/products", search: { q: q.trim() || undefined } });
            }}
            className="flex gap-2"
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={60}
              placeholder="e.g. marine plywood, laminates"
              aria-label="Search term"
              className="h-11 flex-1 rounded-sm border bg-card px-3 text-sm"
            />
            <Button type="submit" variant="walnut" size="xl">
              Search
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
