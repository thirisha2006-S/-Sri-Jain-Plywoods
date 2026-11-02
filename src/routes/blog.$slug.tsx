import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard, WaButton } from "@/components/site/Bits";
import { getPost, POSTS } from "@/data/blog";
import { getProduct } from "@/data/catalog";
import { productEnquiry } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo(loaderData.title, loaderData.excerpt, "article")
      : [{ title: "Article not found | Sri Jain Plywood" }, { name: "robots", content: "noindex" }],
  }),
  component: Article,
});

function Article() {
  const post = Route.useLoaderData();
  const product = getProduct(post.related);
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <article>
      <header className="container-x max-w-3xl pt-14">
        <Link to="/blog" className="eyebrow">
          ← Interior ideas
        </Link>
        <h1 className="mt-4 text-5xl leading-tight text-walnut md:text-6xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>
      <img
        src={post.image}
        alt=""
        className="container-x mt-10 aspect-[21/9] max-w-5xl rounded-md object-cover px-0"
      />
      <div className="container-x max-w-3xl py-12 text-lg leading-relaxed">
        {post.body.map((b, i) => (
          <div key={i} className="mt-6">
            {b.h && <h2 className="mb-2 text-3xl text-walnut">{b.h}</h2>}
            <p className="text-foreground/85">{b.p}</p>
          </div>
        ))}
        <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          General guidance only. Always confirm suitability against the specific product's
          specification.
        </p>
      </div>
      {product && (
        <section className="bg-muted/60 py-14">
          <div className="container-x grid items-center gap-8 md:grid-cols-[320px_1fr]">
            <ProductCard p={product} />
            <div>
              <p className="eyebrow">Related product</p>
              <h2 className="mt-2 text-4xl text-walnut">Planning with {product.name}?</h2>
              <p className="mt-3 text-muted-foreground">
                Ask us about current options and pricing.
              </p>
              <WaButton
                className="mt-6"
                message={productEnquiry(product.name, `read: ${post.title}`)}
              />
            </div>
          </div>
        </section>
      )}
      <section className="container-x grid gap-8 py-14 md:grid-cols-2">
        {more.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex gap-5"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="h-24 w-32 shrink-0 rounded-sm object-cover"
            />
            <div>
              <h3 className="text-xl text-walnut group-hover:text-oak">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </article>
  );
}
