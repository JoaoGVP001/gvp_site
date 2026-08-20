import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { notes, projects } from "../lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const pages = ["", "/sobre", "/projetos", "/notas", "/contato"];
  return [
    ...pages.map((path) => ({ url: `${origin}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })),
    ...projects.map((project) => ({ url: `${origin}/projetos/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...notes.map((note) => ({ url: `${origin}/notas/${note.slug}`, lastModified: new Date(`${note.date}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
