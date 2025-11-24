#!/usr/bin/env node

/**
 * AI Image Generation Prompts Generator
 * Creates optimized prompts for generating all website images
 */

const prompts = {
  showcase: [
    {
      name: "Edge AI Robotics Controller",
      prompt: "Professional photograph of a custom PCB board for robotics control, ARM Cortex-M7 microcontroller visible, 6-axis IMU sensor, CAN bus interface, clean white background, technical hardware photography, studio lighting, high detail, 4K, sharp focus",
      file: "edge-ai-robotics-controller.jpg",
      aspectRatio: "4:3",
      size: "1200x900",
    },
    {
      name: "AR Glasses Prototype",
      prompt: "Modern AR glasses prototype on white background, micro-OLED displays visible, SLAM tracking sensors, custom optics, spatial computing hardware, professional product photography, clean minimalist style, high detail, studio lighting",
      file: "ar-glasses-prototype.jpg",
      aspectRatio: "4:3",
      size: "1200x900",
    },
    {
      name: "Hardware Hackathon Event",
      prompt: "Hardware hackathon event, engineers working on projects, PCBs and components on tables, collaborative atmosphere, modern tech workspace, diverse team, professional event photography, natural lighting, authentic, candid moments",
      file: "hackathon-2024.jpg",
      aspectRatio: "4:3",
      size: "1200x900",
    },
    {
      name: "Custom Silicon Workshop",
      prompt: "Technical workshop setting, ASIC design presentation, engineers learning chip design, RTL synthesis diagrams on screens, modern classroom, professional educational photography, clean and organized, tech industry",
      file: "silicon-workshop.jpg",
      aspectRatio: "4:3",
      size: "1200x900",
    },
  ],
  profiles: [
    { name: "Sarah Chen", file: "sarah-chen.jpg", description: "Female, Asian, VP of Engineering, confident, professional" },
    { name: "Michael Zhang", file: "michael-zhang.jpg", description: "Male, Asian, Principal Engineer, tech industry professional" },
    { name: "Emily Rodriguez", file: "emily-rodriguez.jpg", description: "Female, Hispanic, Research Director, academic professional" },
    { name: "Alex Kim", file: "alex-kim.jpg", description: "Male, Asian, Founder/CEO, entrepreneurial, confident" },
    { name: "Jordan Lee", file: "jordan-lee.jpg", description: "Male, Asian, Senior Hardware Engineer, technical professional" },
    { name: "Taylor Park", file: "taylor-park.jpg", description: "Male, Asian, Robotics Engineer, engineering professional" },
    { name: "Casey Wong", file: "casey-wong.jpg", description: "Male, Asian, Embedded Systems Architect, technical expert" },
    { name: "Priya Patel", file: "priya-patel.jpg", description: "Female, South Asian, AI Hardware Researcher, academic professional" },
  ],
};

function generateProfilePrompt(profile) {
  return `Professional headshot portrait, ${profile.description}, tech industry professional, confident expression, modern office background, professional photography, high quality, 8K, natural lighting, business casual attire, friendly but professional`;
}

console.log("🎨 AI Image Generation Prompts for Next Hardware\n");
console.log("=" .repeat(70));
console.log("\n📋 COMMUNITY SHOWCASE IMAGES (4 images)\n");

prompts.showcase.forEach((item, index) => {
  console.log(`${index + 1}. ${item.name}`);
  console.log(`   File: public/images/community/${item.file}`);
  console.log(`   Size: ${item.size} (${item.aspectRatio})`);
  console.log(`   Prompt: ${item.prompt}`);
  console.log("");
});

console.log("\n" + "=".repeat(70));
console.log("\n👤 PROFILE PHOTOS (8 images)\n");

prompts.profiles.forEach((profile, index) => {
  const prompt = generateProfilePrompt(profile);
  console.log(`${index + 1}. ${profile.name}`);
  console.log(`   File: public/images/profiles/${profile.file}`);
  console.log(`   Size: 400x400px (1:1)`);
  console.log(`   Prompt: ${prompt}`);
  console.log("");
});

console.log("=".repeat(70));
console.log("\n💡 TIPS:");
console.log("   • Use Midjourney or DALL-E 3 for best results");
console.log("   • Keep style consistent across all images");
console.log("   • Optimize images before uploading (compress, WebP)");
console.log("   • Place in public/images/ directory");
console.log("\n🚀 Ready to generate!");



