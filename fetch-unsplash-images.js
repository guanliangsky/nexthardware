#!/usr/bin/env node

/**
 * Unsplash Image URL Generator
 * Generates better Unsplash image URLs that match our content
 * 
 * Usage: node fetch-unsplash-images.js
 * 
 * Note: These are curated Unsplash image IDs that match hardware/tech themes
 */

const imageMap = {
  // Community Showcase - Hardware/Engineering focused
  showcase: {
    "edge-ai-robotics": {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&fit=crop",
      search: "PCB electronics circuit board",
      description: "PCB/electronics board"
    },
    "ar-glasses": {
      url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=80&fit=crop",
      search: "AR VR glasses technology",
      description: "AR/VR technology"
    },
    "hackathon": {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop",
      search: "team collaboration tech workspace",
      description: "Team collaboration"
    },
    "workshop": {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fit=crop",
      search: "tech workshop learning",
      description: "Tech workshop"
    }
  },
  
  // Profile Photos - Professional headshots
  profiles: {
    "sarah-chen": {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop&crop=face",
      search: "professional woman asian tech",
      description: "Professional headshot - Asian woman"
    },
    "michael-zhang": {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
      search: "professional man asian tech",
      description: "Professional headshot - Asian man"
    },
    "emily-rodriguez": {
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop&crop=face",
      search: "professional woman hispanic academic",
      description: "Professional headshot - Hispanic woman"
    },
    "alex-kim": {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face",
      search: "professional man asian entrepreneur",
      description: "Professional headshot - Asian man"
    },
    "jordan-lee": {
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face",
      search: "professional man asian engineer",
      description: "Professional headshot - Asian man"
    },
    "taylor-park": {
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=face",
      search: "professional man asian robotics",
      description: "Professional headshot - Asian man"
    },
    "casey-wong": {
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fit=crop&crop=face",
      search: "professional man asian tech",
      description: "Professional headshot - Asian man"
    },
    "priya-patel": {
      url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&crop=face",
      search: "professional woman south asian researcher",
      description: "Professional headshot - South Asian woman"
    }
  }
};

console.log("🖼️  Unsplash Image URLs for Next Hardware\n");
console.log("=".repeat(70));
console.log("\n📋 COMMUNITY SHOWCASE IMAGES\n");

Object.entries(imageMap.showcase).forEach(([key, data], index) => {
  console.log(`${index + 1}. ${key.replace(/-/g, ' ').toUpperCase()}`);
  console.log(`   URL: ${data.url}`);
  console.log(`   Search: ${data.search}`);
  console.log(`   Description: ${data.description}`);
  console.log("");
});

console.log("\n" + "=".repeat(70));
console.log("\n👤 PROFILE PHOTOS\n");

Object.entries(imageMap.profiles).forEach(([key, data], index) => {
  console.log(`${index + 1}. ${key.replace(/-/g, ' ').toUpperCase()}`);
  console.log(`   URL: ${data.url}`);
  console.log(`   Search: ${data.search}`);
  console.log(`   Description: ${data.description}`);
  console.log("");
});

console.log("=".repeat(70));
console.log("\n💡 These URLs are already optimized and ready to use!");
console.log("   They use Unsplash's CDN with proper sizing and quality parameters.");
console.log("\n✅ All images are already updated in components!");

