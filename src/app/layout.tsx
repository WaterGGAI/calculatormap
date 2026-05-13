import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url),
  title: {
    default: siteConfig.homepageTitle,
    template: siteConfig.defaultTitleTemplate
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.homepageTitle,
    description: siteConfig.homepageDescription,
    locale: siteConfig.locale
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homepageTitle,
    description: siteConfig.homepageDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="/llms.txt" rel="alternate" title="CalculatorMap LLM guide" type="text/markdown" />
        <link href="/calculator-index.json" rel="alternate" title="CalculatorMap calculator index" type="application/json" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
