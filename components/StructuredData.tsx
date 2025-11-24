"use client";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next Hardware",
    url: "https://nexthardware.io",
    logo: "https://nexthardware.io/icon.png",
    description: "The global community for builders of the physical future. Join 1,200+ hardware engineers, founders, and makers building AI, AR, and robotics.",
    foundingDate: "2023",
    sameAs: [
      "https://x.com/nexthardware",
      "https://github.com/nexthardware",
      "https://youtube.com/@nexthardware",
      "https://luma.com/NextHardware",
      "https://discord.gg/d5dTjjVD",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "General Inquiry",
      email: "hello@nexthardware.io",
      url: "https://nexthardware.io/contact",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Next Hardware",
    url: "https://nexthardware.io",
    description: "The global community for builders of the physical future. AI • AR • Robotics.",
    publisher: {
      "@type": "Organization",
      name: "Next Hardware",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}



