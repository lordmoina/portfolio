import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Share Tech Mono via Google Fonts — loaded as local to avoid blocking
const shareTechMono = Inter({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ricardo Mota",
  description:
    "Smart automations that connect systems, process data and work while you sleep. Specialized in AI integrations, e-commerce and CRM.",
  keywords: ["n8n", "automation", "AI", "less.tech", "HubSpot", "Shopify"],
  openGraph: {
    title: "Ricardo Mota",
    description: "I build flows that think.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${shareTechMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#080b12] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
