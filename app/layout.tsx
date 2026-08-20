import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import "./globals.css";

async function requestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await requestOrigin();
  const title = "João Guilherme | Desenvolvedor";
  const description = "Projetos, estudos e experiências de João Guilherme em Ciência da Computação.";
  const socialImage = `${origin}/og.png`;

  return {
    title: { default: title, template: "%s | João Guilherme" },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, type: "website", locale: "pt_BR", images: [{ url: socialImage, width: 1200, height: 630, alt: "João Guilherme — curiosidade em código" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

const themeScript = `
  try {
    const saved = localStorage.getItem('jg-theme');
    const dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
