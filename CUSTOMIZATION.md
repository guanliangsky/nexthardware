# Customization Guide

Quick reference for updating placeholder content in the Next Hardware website.

## 🔗 Social Links

### Footer Links
**File:** `components/Footer.tsx`

Update the `socialLinks` array (around line 5-10):
```typescript
const socialLinks = [
  { name: "Twitter/X", url: "YOUR_TWITTER_URL", icon: "𝕏" },
  { name: "GitHub", url: "YOUR_GITHUB_URL", icon: "⚡" },
  { name: "Luma", url: "YOUR_LUMA_URL", icon: "📅" },
  { name: "Discord", url: "YOUR_DISCORD_INVITE_URL", icon: "💬" },
];
```

### Join Section Links
**File:** `components/Join.tsx`

Update the href attributes in the buttons (around line 20-30):
```typescript
<a href="YOUR_LUMA_URL" ...>Join on Luma</a>
<a href="YOUR_DISCORD_INVITE_URL" ...>Join Discord</a>
```

## 📅 Luma Calendar Integration

**File:** `components/Events.tsx`

Replace the placeholder section (around line 15-35) with your Luma embed code:

```typescript
{/* Replace this entire div with your Luma embed */}
<iframe 
  src="YOUR_LUMA_CALENDAR_EMBED_URL"
  width="100%"
  height="600"
  frameBorder="0"
  style={{ border: 'none' }}
/>
```

Or use Luma's API to fetch events dynamically.

## 🖼️ Community Showcase Images

**File:** `components/CommunityShowcase.tsx`

Replace the `showcaseItems` array (around line 8-25) with your actual images:

```typescript
const showcaseItems = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Your project description",
    image: "/images/your-image-1.jpg", // Use local images in public folder
  },
  // ... add more items
];
```

**To use local images:**
1. Create a `public/images/` folder
2. Add your images there
3. Reference them as `/images/filename.jpg`

## 🎨 Brand Colors

**File:** `tailwind.config.ts`

Update the color palette in the `extend.colors` section if needed.

## 📝 Hero Section Content

**File:** `components/Hero.tsx`

- Update headline (line ~20)
- Update sub-headline (line ~28)
- Update social proof companies (line ~50)

## 🏢 Company Logos

**File:** `components/Hero.tsx`

Replace the text-based company names (around line 50) with actual logo images if you have them:

```typescript
<div className="flex flex-wrap justify-center items-center gap-8">
  <Image src="/logos/google.svg" alt="Google" width={100} height={40} />
  {/* ... more logos */}
</div>
```

## 📊 Analytics (Optional)

To add analytics, create `app/analytics.tsx`:

```typescript
// For Plausible
import PlausibleProvider from 'next-plausible'

// Or for Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google'
```

Then add to `app/layout.tsx`.

## ✅ Checklist

- [ ] Update all social media links
- [ ] Integrate Luma calendar
- [ ] Replace showcase images with real photos
- [ ] Update company logos in hero section
- [ ] Add analytics (optional)
- [ ] Test all links
- [ ] Update metadata in `app/layout.tsx` if needed
- [ ] Deploy to Vercel

