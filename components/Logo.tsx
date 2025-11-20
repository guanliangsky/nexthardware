"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-32 w-32 sm:h-40 sm:w-40",
    "2xl": "h-48 w-48 sm:h-60 sm:w-60 lg:h-72 lg:w-72",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl sm:text-3xl",
    "2xl": "text-3xl sm:text-4xl lg:text-5xl",
  };

  const imageSize = size === "sm" ? 24 : size === "md" ? 32 : size === "lg" ? 48 : size === "xl" ? 160 : 288;
  
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image - N in rounded square, cropped to remove white space */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0 overflow-hidden`}>
        <div className="absolute inset-[-15%] w-[130%] h-[130%]">
          <Image
            src="/nhlogo.png"
            alt="Next Hardware Logo"
            width={imageSize}
            height={imageSize}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>
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

