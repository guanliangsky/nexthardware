"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    // Plausible Analytics (Privacy-focused)
    // Uncomment and add your domain when ready:
    // if (typeof window !== "undefined") {
    //   const script = document.createElement("script");
    //   script.defer = true;
    //   script.dataset.domain = "nexthardware.io";
    //   script.src = "https://plausible.io/js/script.js";
    //   document.head.appendChild(script);
    // }

    // Google Analytics 4 (Alternative)
    // Uncomment when ready:
    // if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_GA_ID) {
    //   const script1 = document.createElement("script");
    //   script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    //   script1.async = true;
    //   document.head.appendChild(script1);
    //
    //   const script2 = document.createElement("script");
    //   script2.innerHTML = `
    //     window.dataLayer = window.dataLayer || [];
    //     function gtag(){dataLayer.push(arguments);}
    //     gtag('js', new Date());
    //     gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    //   `;
    //   document.head.appendChild(script2);
    // }
  }, []);

  return null;
}

