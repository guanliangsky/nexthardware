import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
  title: "Next Hardware | Silicon Valley Hardware Community | Where AI Meets Atoms",
  description: "Join the Silicon Valley hardware community for builders of the physical future. Free to join as members. AI • AR • Robotics • Silicon Valley tech community.",
  keywords: ["Silicon Valley hardware", "Silicon Valley tech community", "hardware community", "AI hardware", "AR", "robotics", "embedded systems", "Silicon Valley", "free hardware community", "hardware engineers Silicon Valley", "Palo Alto hardware"],
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
        <LanguageProvider>
          <Analytics />
          {children}
          <CookieConsent />
          <script
            dangerouslySetInnerHTML={{
              __html: `document.body.classList.add('js-loaded');`,
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}

