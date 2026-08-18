import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benjaminbrown.co"),
  title: "Benjamin Brown — Costa Mesa",
  description:
    "We are getting lost in the glamor of using AI, as if using it is the win. It isn’t. The why is the win. The how is the win. The result is the win.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Benjamin Brown — Costa Mesa",
    description:
      "No one tees off without looking at the flag. The why is the win. The how is the win. The result is the win.",
    type: "website",
    url: "https://benjaminbrown.co",
    siteName: "Benjamin Brown",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamin Brown — Costa Mesa",
    description:
      "No one tees off without looking at the flag. The why is the win. The how is the win. The result is the win.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e6" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

const themeFlashScript = `(function(){try{var s=localStorage.getItem('bb:theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||m);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
