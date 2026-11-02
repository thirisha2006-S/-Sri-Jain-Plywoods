<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project rules

- All editable business info (phone, address, maps, hours, socials) lives in src/data/site.ts; products/collections/visualizer data in src/data/catalog.ts; articles in src/data/blog.ts — UI reads from these, never hardcode business facts in components.
- Enquiries go through WhatsApp prefilled links (no backend); never claim submissions are stored.
- Images live under public/images/<area>/ as WebP; showroom gallery must only use genuine shop photos (placeholders until supplied).
- Never publish unverified specs, brands, prices, stock, certifications or hours; leave fields empty so the UI shows "contact us".
