import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { GROUPS } from "@/data/catalog";
import { MAPS_DIRECTIONS, SITE, TEL_HREF, waLink } from "@/data/site";

const h = "eyebrow mb-4";
const a = "block py-1 text-sm text-ivory/70 hover:text-gold transition-colors";

export function SiteFooter() {
  return (
    <footer className="bg-walnut text-ivory">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
            Plywood, laminates, boards, doors and interior materials — with guidance to help you
            choose the right material for your space.
          </p>
          <div className="mt-6 space-y-1 text-sm">
            <a href={TEL_HREF} className={a}>
              Call {SITE.phoneDisplay}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={a}>
              WhatsApp enquiry
            </a>
            <a href={SITE.mapsShareUrl} target="_blank" rel="noopener noreferrer" className={a}>
              {SITE.addressArea}
            </a>
          </div>
        </div>
        <div>
          <p className={h}>Products</p>
          {GROUPS.map((g) => (
            <Link key={g.id} to="/products" search={{ category: g.id }} className={a}>
              {g.label}
            </Link>
          ))}
        </div>
        <div>
          <p className={h}>Interior Solutions</p>
          <Link to="/guides" className={a}>
            Material guides
          </Link>
          <Link to="/collections" className={a}>
            Collections
          </Link>
          <Link to="/visualizer" className={a}>
            Visualizer
          </Link>
          <Link to="/blog" className={a}>
            Interior ideas
          </Link>
        </div>
        <div>
          <p className={h}>Company</p>
          <Link to="/about" className={a}>
            About Us
          </Link>
          <Link to="/gallery" className={a}>
            Gallery
          </Link>
          <Link to="/contact" className={a}>
            Contact Us
          </Link>
          <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className={a}>
            Get directions
          </a>
          <Link to="/privacy" className={a}>
            Privacy Policy
          </Link>
          <Link to="/terms" className={a}>
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ivory/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Sri Jain Plywood. All rights reserved.</p>
          <p>
            Product images are illustrative. Specifications are confirmed at the time of enquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}
