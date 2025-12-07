"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "inverted";
}

export default function Logo({ className = "", showText = true, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-32 sm:h-40",
    "2xl": "h-48 sm:h-60 lg:h-72",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl sm:text-3xl",
    "2xl": "text-3xl sm:text-4xl lg:text-5xl",
  };

  // Calculate width based on aspect ratio (922:284 ≈ 3.25:1)
  const height = size === "sm" ? 24 : size === "md" ? 32 : size === "lg" ? 48 : size === "xl" ? 160 : 288;
  const width = Math.round(height * 3.25);
  const imageSize = { width, height };
  
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image - full image display */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/images/u1.png"
          alt="Next Hardware Logo"
          width={imageSize.width}
          height={imageSize.height}
          className={`object-contain w-auto h-full ${variant === "inverted" ? "invert" : ""}`}
          priority
          unoptimized
        />
      </div>
      
      {/* Text - NEXT HARDWARE stacked */}
      {showText && (
        <div className={`flex flex-col leading-tight ${textSizeClasses[size]} font-bold text-slate-900`}>
          <span>NEXT</span>
          <span>HARDWARE</span>
        </div>
      )}
    </Link>
  );
}
