import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benjaminbrown.co"),
  title: "Benjamin Brown® — Founder, Builder, Operator",
  description:
    "Benjamin Brown — founder, operator and full-stack builder behind five companies and twenty-six shipped products. I design, build and run the thing. No outsourced craft.",
  openGraph: {
    title: "Benjamin Brown® — Founder, Builder, Operator",
    description:
      "Design, build, and operate the thing. Five companies, twenty-six shipped products.",
    type: "website",
  },
};

const themeFlashScript = `(function(){try{var s=localStorage.getItem('bb:theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||m);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
