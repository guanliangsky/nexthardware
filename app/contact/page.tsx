"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with #contact anchor
    router.replace("/#contact");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-slate-600">Redirecting to contact section...</p>
      </div>
    </div>
  );
}
