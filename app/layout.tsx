import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Prevent Google Translate from auto-detecting and injecting */}
        <meta name="google" content="notranslate" />
        <meta name="google-translate-customization" content="false" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Block Google Translate BEFORE anything else loads */}
        <Script
          id="block-google-translate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Block Google Translate immediately
              (function() {
                // Prevent Google Translate script from loading
                const originalAppendChild = Node.prototype.appendChild;
                Node.prototype.appendChild = function(child) {
                  if (child && child.src && child.src.includes('translate.google')) {
                    return child;
                  }
                  if (child && child.id && child.id.includes('google_translate')) {
                    return child;
                  }
                  return originalAppendChild.call(this, child);
                };
                
                // Block Google Translate API
                if (typeof window !== 'undefined') {
                  Object.defineProperty(window, 'google', {
                    value: window.google || {},
                    writable: false,
                    configurable: false
                  });
                  if (window.google) {
                    Object.defineProperty(window.google, 'translate', {
                      value: undefined,
                      writable: false,
                      configurable: false
                    });
                  }
                }
              })();
            `,
          }}
        />
        
        {/* Google Analytics - Added for Google verification */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <ErrorBoundary>
          <LanguageProvider>
            <StructuredData />
            <Analytics />
            {children}
            <CookieConsent />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.body.classList.add('js-loaded');
                  
                  // Aggressively prevent Google Translate widget injection
                  (function() {
                    // Remove Google Translate API completely
                    if (window.google && window.google.translate) {
                      try {
                        delete window.google.translate;
                      } catch(e) {}
                    }
                    
                    // Remove any Google Translate elements
                    function removeTranslateElements() {
                      // Remove iframes
                      document.querySelectorAll('iframe[src*="translate.google"]').forEach(el => {
                        el.remove();
                        el.parentElement?.remove();
                      });
                      
                      // Remove all Google Translate divs
                      document.querySelectorAll('div[id*="google_translate"]').forEach(el => {
                        el.remove();
                        el.parentElement?.remove();
                      });
                      
                      // Remove Google Translate classes
                      document.querySelectorAll('div[class*="goog-te"]').forEach(el => {
                        el.remove();
                        el.parentElement?.remove();
                      });
                      
                      // Remove select dropdowns
                      document.querySelectorAll('select[id*="google_translate"]').forEach(el => {
                        el.remove();
                        el.parentElement?.remove();
                      });
                      
                      // Remove any element with "Select Language" text
                      document.querySelectorAll('*').forEach(el => {
                        if (el.textContent && el.textContent.includes('Select Language')) {
                          el.remove();
                        }
                      });
                      
                      // Remove any element with google_translate in ID
                      document.querySelectorAll('*[id*="google_translate"]').forEach(el => {
                        el.remove();
                        el.parentElement?.remove();
                      });
                      
                      // Remove spans with "Select Language"
                      document.querySelectorAll('span').forEach(el => {
                        if (el.textContent && el.textContent.trim() === 'Select Language') {
                          el.remove();
                          el.parentElement?.remove();
                        }
                      });
                    }
                    
                    // Run immediately
                    if (document.body) {
                      removeTranslateElements();
                    } else {
                      document.addEventListener('DOMContentLoaded', removeTranslateElements);
                    }
                    
                    // Run on DOM changes
                    const observer = new MutationObserver(function(mutations) {
                      mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length) {
                          removeTranslateElements();
                        }
                      });
                    });
                    
                    if (document.body) {
                      observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['id', 'class']
                      });
                    }
                    
                    // Also run periodically as backup
                    setInterval(removeTranslateElements, 500);
                    
                    // Run on window load
                    window.addEventListener('load', removeTranslateElements);
                  })();
                `,
              }}
            />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

