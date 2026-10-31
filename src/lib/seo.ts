export function seo(title: string, description: string, type = "website") {
  const t = `${title} | Sri Jain Plywood`;
  return [
    { title: t },
    { name: "description", content: description },
    { property: "og:title", content: t },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t },
    { name: "twitter:description", content: description },
  ];
}
