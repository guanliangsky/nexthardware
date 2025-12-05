# 🏢 Company Logo Setup Guide

## How to Add Company Logos

The Hero section now supports company logo images! Here's how to add them:

### 📁 File Location
Place logo files in: `/public/images/logos/`

### 📝 Naming Convention
Logo files should be named using the company name in lowercase with hyphens:
- `google.svg` or `google.png`
- `nvidia.svg` or `nvidia.png`
- `apple.svg` or `apple.png`
- `meta.svg` or `meta.png`
- etc.

**For multi-word companies:**
- "Boston Dynamics" → `boston-dynamics.svg`
- "Boston Dynamics" → `boston-dynamics.png`

### ✅ Supported Formats
- **SVG** (preferred) - Vector format, scales perfectly
- **PNG** (fallback) - Raster format, works well too

The system will:
1. Try to load `.svg` first
2. Fall back to `.png` if SVG doesn't exist
3. Show company name as text if neither exists

### 📋 Current Companies
The following companies are displayed:
- Google
- NVIDIA
- Apple
- Meta
- Microsoft
- Amazon
- Tesla
- Rokid
- Qualcomm
- Intel
- AMD
- Samsung
- Sony
- Stanford
- MIT
- Berkeley
- OpenAI
- Anthropic
- Boston Dynamics
- Waymo

### 🎨 Logo Requirements
- **Format:** SVG (preferred) or PNG
- **Style:** Monochrome/grayscale works best (logos will be displayed at 70% opacity)
- **Size:** Recommended 120px width, will be scaled to 32px height
- **Background:** Transparent preferred
- **Color:** Dark logos work best on white background

### 📦 Where to Get Logos
1. **Company websites** - Many have press/media kits with logos
2. **Simple Icons** - https://simpleicons.org/ (free, open source)
3. **Logo Search** - Search for "[Company] logo SVG" or "[Company] logo PNG"
4. **Brand Guidelines** - Check company brand guidelines for official logos

### ⚠️ Legal Note
- Ensure you have permission to use company logos
- Most companies allow logo use for "partners" or "customers" sections
- Check each company's brand guidelines for usage rights
- Logos are typically used for "community members from" or "partners" sections

### 🚀 Quick Start
1. Download or create logo files
2. Name them according to the convention above
3. Place them in `/public/images/logos/`
4. The site will automatically detect and display them!

### 💡 Example
```
/public/images/logos/
  ├── google.svg
  ├── nvidia.svg
  ├── apple.svg
  ├── meta.svg
  └── ...
```

Once you add the logo files, they will automatically appear on the homepage!


