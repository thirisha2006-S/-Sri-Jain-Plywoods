# Sri Jain Plywood website — setup guide

- Business details: edit `src/data/site.ts` (phone, address, opening hours, social links).
- Products: edit `src/data/catalog.ts`. Fill `thicknesses`, `sizes`, `brands` only with verified info. Set `stocked: false` to hide a category.
- Collections & visualizer: same file (`COLLECTIONS`, `SCENES`, `FINISHES`).
- Blog: `src/data/blog.ts`.
- Showroom photos: add WebP files to `public/images/showroom/` and set `src` in `src/routes/gallery.tsx`.
- Logos: `public/images/brand/` (SVG mark, light and dark horizontal logos).
