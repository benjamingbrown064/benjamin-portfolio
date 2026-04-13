// JSON-LD structured data components

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Benjamin Brown",
    url: "https://benjaminbrown.co",
    sameAs: [
      "https://linkedin.com/in/benjaminbrown",
      "https://x.com/benjaminbrown",
      "https://github.com/benjaminbrown",
    ],
    jobTitle: "Founder & Software Builder",
    worksFor: {
      "@type": "Organization",
      name: "One Beyond",
      url: "https://onebeyond.co",
    },
    description:
      "Benjamin Brown — founder behind One Beyond. 26+ products shipped across automotive, legal, compliance, and AI operations.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  category: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  category,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    author: {
      "@type": "Person",
      name: "Benjamin Brown",
      url: "https://benjaminbrown.co",
    },
    publisher: {
      "@type": "Organization",
      name: "One Beyond",
      url: "https://benjaminbrown.co",
    },
    keywords: category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
