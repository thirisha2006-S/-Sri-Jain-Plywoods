import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { POSTS } from "@/data/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: seo(
      "Interior Ideas & Material Guides",
      "Practical articles on choosing plywood, MDF, BWR and BWP grades, laminates, doors, wood finishes and furniture care.",
    ),
  }),
  component: Blog,
});

function Blog() {
  const first = POSTS[0]!;
  const rest = POSTS.slice(1);
  return (
    <>
      <PageHero
        eyebrow="Interior ideas"
        title="Know your materials."
        intro="Useful, honest guides for planning your interiors."
      />
      <section className="container-x py-16">
        <Link
          to="/blog/$slug"
          params={{ slug: first.slug }}
          className="group grid gap-8 lg:grid-cols-2"
        >
          <img src={first.image} alt="" className="aspect-[16/10] w-full rounded-md object-cover" />
          <div className="self-center">
            <p className="eyebrow">Featured</p>
            <h2 className="mt-3 text-4xl text-walnut group-hover:text-oak">{first.title}</h2>
            <p className="mt-3 text-muted-foreground">{first.excerpt}</p>
          </div>
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-[16/10] overflow-hidden rounded-md">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-2xl text-walnut group-hover:text-oak">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
