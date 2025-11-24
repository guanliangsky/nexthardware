# 🔄 How to Update Image Paths After Generating Images

Once you've generated images using AI, follow these steps to update the components:

---

## 📁 **Directory Structure**

Create these directories:
```
public/
  images/
    community/
      edge-ai-robotics-controller.jpg
      ar-glasses-prototype.jpg
      hackathon-2024.jpg
      silicon-workshop.jpg
    profiles/
      sarah-chen.jpg
      michael-zhang.jpg
      emily-rodriguez.jpg
      alex-kim.jpg
      jordan-lee.jpg
      taylor-park.jpg
      casey-wong.jpg
      priya-patel.jpg
      (add 6 more for member spotlights)
```

---

## 🔄 **Files to Update**

### **1. CommunityShowcase.tsx**
Replace Unsplash URLs with:
```typescript
image: "/images/community/edge-ai-robotics-controller.jpg"
image: "/images/community/ar-glasses-prototype.jpg"
image: "/images/community/hackathon-2024.jpg"
image: "/images/community/silicon-workshop.jpg"
```

### **2. Testimonials.tsx**
Replace Unsplash URLs with:
```typescript
image: "/images/profiles/sarah-chen.jpg"
image: "/images/profiles/michael-zhang.jpg"
// ... etc for all 8 testimonials
```

### **3. MemberSpotlights.tsx**
Replace Unsplash URLs with:
```typescript
image: "/images/profiles/sarah-chen.jpg"
// ... etc for all 6 members
```

### **4. Events.tsx**
Replace judge/mentor Unsplash URLs with:
```typescript
image: "/images/profiles/sarah-chen.jpg"  // for judges
image: "/images/profiles/alex-kim.jpg"    // for mentors
// ... etc
```

---

## ⚡ **Quick Update**

Once you have images, I can update all paths automatically! Just let me know when images are ready.

---

## 📝 **Image Optimization Tips**

1. **Compress:** Use ImageOptim, Squoosh, or TinyPNG
2. **Format:** Convert to WebP for better performance
3. **Sizes:**
   - Showcase: 1200x900px
   - Profiles: 400x400px
4. **Quality:** 85-90% for JPG, 80-85% for WebP

---

**Ready to update?** Just place images in `public/images/` and let me know!

