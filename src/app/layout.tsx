import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
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
  themeColor: "#8fb9d6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
