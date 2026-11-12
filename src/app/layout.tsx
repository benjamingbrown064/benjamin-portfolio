import type { Metadata } from "next";

// The designed pages are served as complete HTML documents by route handlers (see src/lib/site.ts).
// This layout only wraps the few React-rendered routes, such as the not-found page.
export const metadata: Metadata = {
  metadataBase: new URL("https://benjaminbrown.co"),
  title: "Benjamin Brown®",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/site/fonts/fonts.css" />
        <link rel="stylesheet" href="/site/v5/site.css" />
        <link rel="stylesheet" href="/site/v11/theme.css" />
        <link rel="stylesheet" href="/site/v13/site.css" />
        <link rel="icon" href="/site/assets/bb-mark-v3.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
