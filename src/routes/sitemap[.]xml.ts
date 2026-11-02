import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/catalog";
import { POSTS } from "@/data/blog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/about",
          "/products",
          "/guides",
          "/collections",
          "/visualizer",
          "/gallery",
          "/blog",
          "/contact",
          "/privacy",
          "/terms",
          ...PRODUCTS.map((p) => `/products/${p.slug}`),
          ...POSTS.map((p) => `/blog/${p.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
