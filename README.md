# Next Hardware Official Website

A modern, futuristic website for Next Hardware - a global community focused on AI, AR, Robotics, and Smart Devices.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- A code editor (VS Code recommended)

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nexthardware/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Hero.tsx            # Hero section with particle background
│   ├── ParticleBackground.tsx  # Animated particle canvas
│   ├── ThreePillars.tsx    # Bento grid for focus areas
│   ├── Events.tsx          # Events section with Luma placeholder
│   ├── CommunityShowcase.tsx  # Grid of community projects
│   ├── Join.tsx            # Join community section
│   └── Footer.tsx          # Footer with social links
├── package.json
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Customization

### Update Social Links

Edit `components/Footer.tsx` and `components/Join.tsx` to add your actual social media URLs:
- Twitter/X
- GitHub
- Luma
- Discord

### Add Luma Calendar

Replace the placeholder in `components/Events.tsx` with your Luma calendar embed code or API integration.

### Update Community Showcase Images

Replace the placeholder images in `components/CommunityShowcase.tsx` with actual photos of your community's projects.

### Brand Colors

Colors are defined in `tailwind.config.ts`. The current palette:
- Primary: Electric Blue (#00D4FF)
- Secondary: Purple (#8B5CF6)
- Accent: Cyan (#06B6D4)
- Background: Deep Slate (#020617)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## 📊 Performance

The site is optimized for:
- Lighthouse score 95+
- Mobile responsiveness
- Fast loading times
- Smooth animations

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Inter (sans-serif), JetBrains Mono (monospace)

## 📝 Notes

- All placeholder content is marked with 💡 emoji comments
- Replace placeholder images with actual community photos
- Update social links and calendar integration
- Add analytics (Plausible or GA4) if needed

## 📄 License

© 2025 Next Hardware. Building in Public.

