"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;

      // Load Google Analytics script
      const script1 = document.createElement("script");
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script1.async = true;
      document.head.appendChild(script1);

      // Initialize Google Analytics
      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script2);

      // Track page views on route changes (Next.js)
      const handleRouteChange = () => {
        if (typeof (window as any).gtag !== "undefined") {
          (window as any).gtag("config", gaId, {
            page_path: window.location.pathname,
          });
        }
      };

      // Listen for Next.js route changes
      window.addEventListener("popstate", handleRouteChange);

      return () => {
        // Cleanup: Remove event listener
        window.removeEventListener("popstate", handleRouteChange);
        // Note: We don't remove scripts as they're needed for tracking
      };
    }
  }, []);

  return null;
}

