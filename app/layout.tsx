import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Hardware | Where AI Meets Atoms",
  description: "The global community for builders of the physical future. Established 2023. Join 1,200+ hardware engineers, founders, and makers building AI, AR, and robotics.",
  keywords: ["hardware", "AI", "AR", "robotics", "embedded systems", "Silicon Valley", "hardware community", "hardware engineering", "AI hardware", "robotics community"],
  authors: [{ name: "Next Hardware" }],
  creator: "Next Hardware",
  publisher: "Next Hardware",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexthardware.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Next Hardware | Where AI Meets Atoms",
    description: "The global community for builders of the physical future. Join 1,200+ hardware engineers, founders, and makers building AI, AR, and robotics.",
    url: "https://nexthardware.io",
    siteName: "Next Hardware",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Hardware - Where AI Meets Atoms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Hardware | Where AI Meets Atoms",
    description: "The global community for builders of the physical future. Join 1,200+ hardware engineers building AI, AR, and robotics.",
    images: ["/og-image.png"],
    creator: "@nexthardware",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <StructuredData />
        <Analytics />
        {children}
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.classList.add('js-loaded');`,
          }}
        />
      </body>
    </html>
  );
}

