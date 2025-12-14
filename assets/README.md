# App Assets for Shopify App Store

This folder contains branding assets for your Shopify app listing.

---

## Current Files

- **app-icon.svg** - Vector source file (editable)

---

## Required PNG Conversions

Before publishing, you must convert the SVG to PNG in these sizes:

### 1. Large Icon (1200x1200px)
**Filename:** `app-icon-1200.png`
**Use:** Shopify App Store listing page
**Format:** PNG with transparent background

### 2. Small Icon (512x512px)
**Filename:** `app-icon-512.png`
**Use:** Shopify Admin interface
**Format:** PNG with transparent background

---

## Quick Conversion Guide

### Method 1: Online Converter (Easiest - 5 minutes)

1. Visit: https://cloudconvert.com/svg-to-png
2. Upload `app-icon.svg`
3. Set dimensions to **1200x1200**
4. Click "Convert"
5. Download as `app-icon-1200.png`
6. Repeat for **512x512** size

### Method 2: ImageMagick CLI (Fast - 2 minutes)

```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Navigate to assets folder
cd assets

# Convert to 1200x1200
magick convert -background none -size 1200x1200 app-icon.svg app-icon-1200.png

# Convert to 512x512
magick convert -background none -size 512x512 app-icon.svg app-icon-512.png
```

### Method 3: Figma/Design Tool (10 minutes)

1. Open Figma (or Sketch, Illustrator)
2. Import `app-icon.svg`
3. Select the icon
4. File → Export
5. Format: PNG
6. Size: 1200x1200px
7. Export as `app-icon-1200.png`
8. Repeat for 512x512px

---

## Icon Design

### Current Design
- **Style:** Infinity symbol + scroll indicator
- **Colors:**
  - Background: #5C6AC4 (Shopify purple)
  - Foreground: White (#FFFFFF)
- **Elements:**
  - Infinity loops (left & right)
  - Downward arrow (scroll indicator)
  - Dots (continuous scroll indication)

### Customizing the Icon

To change colors or design:

1. Open `app-icon.svg` in a text editor or vector tool
2. Find the `fill` attributes:
   - `fill="#5C6AC4"` - Background color
   - `fill="white"` - Icon elements
3. Replace with your brand colors
4. Save and re-export to PNG

**Example: Change to red background**
```xml
<!-- Find this line -->
<rect width="1200" height="1200" fill="#5C6AC4" rx="240"/>

<!-- Change to -->
<rect width="1200" height="1200" fill="#FF0000" rx="240"/>
```

---

## Quality Checklist

Before uploading to Shopify, verify:

### Technical Requirements
- [ ] Exact dimensions: 1200x1200px and 512x512px
- [ ] PNG format (not JPG)
- [ ] Transparent background (if applicable)
- [ ] File size under 5MB each
- [ ] High quality, no pixelation

### Visual Quality
- [ ] Icon is recognizable at small sizes (32x32px)
- [ ] Sufficient contrast between elements
- [ ] No blurriness or artifacts
- [ ] Professional appearance
- [ ] Matches your brand

### Testing
- [ ] View at 32x32px (smallest size merchants will see)
- [ ] View on white background
- [ ] View on dark background
- [ ] Check on retina/high-DPI displays

---

## Icon Specifications

| Size | Use Case | Required |
|------|----------|----------|
| **1200x1200px** | App Store listing | ✅ Yes |
| **512x512px** | Shopify Admin | ✅ Yes |
| **SVG** | Source file | ⭕ For editing |

---

## Where to Upload

Once you have the PNG files:

1. Go to **Shopify Partner Dashboard**
2. Select your app
3. Go to **App listing** → **Listing basics**
4. Upload **app-icon-1200.png** in "App icon" field
5. Upload **app-icon-512.png** in "Small icon" field
6. Save changes

---

## Common Issues & Solutions

### Issue: Icon looks blurry at small sizes

**Solution:**
- Simplify the design
- Increase line thickness
- Use bolder elements
- Test at 32x32px before finalizing

### Issue: PNG has white background instead of transparent

**Solution:**
- Ensure SVG has no background rectangle
- Use `-background none` in ImageMagick
- In design tools, delete background layer before export
- Export with "transparency" option enabled

### Issue: File size too large

**Solution:**
- Use PNG compression tools (TinyPNG, ImageOptim)
- Reduce color depth if possible
- Ensure no hidden layers in export

### Issue: Wrong dimensions

**Solution:**
- Double-check export settings
- Use exact dimensions (1200x1200, 512x512)
- Don't scale after export
- Re-export if dimensions are off

---

## Design Tips

### Good App Icon Characteristics:
- ✅ Simple and recognizable
- ✅ Works at small sizes
- ✅ Unique and memorable
- ✅ Reflects app functionality
- ✅ Professional appearance
- ✅ Consistent with brand

### What to Avoid:
- ❌ Too much detail
- ❌ Small text (becomes unreadable)
- ❌ Low contrast colors
- ❌ Generic clipart
- ❌ Pixelated or blurry
- ❌ Inconsistent with app purpose

---

## Need Help?

### Free Icon Testing Tools
- **App Icon Preview:** Test how icon looks at various sizes
- **Contrast Checker:** Verify color contrast ratios
- **PNG Compressor:** TinyPNG.com

### Professional Icon Design
If you want a custom icon designed:
- **Fiverr:** $50-$200 for app icon design
- **99designs:** Contest format, multiple options
- **Hire designer:** Custom work

### Feedback
Show your icon to:
- Colleagues or friends
- Shopify merchant community
- Design subreddits (r/design_critiques)

---

## Checklist: Before Publishing

```
☐ Created app-icon-1200.png (1200x1200px)
☐ Created app-icon-512.png (512x512px)
☐ Both files are PNG format
☐ Transparent background (if applicable)
☐ Tested icon at small sizes (32x32px)
☐ Icon looks professional
☐ Icon is recognizable
☐ File sizes under 5MB
☐ Ready to upload to Partner Dashboard
```

---

## Related Files

- `APP_STORE_LISTING.md` - Full app store content
- `SCREENSHOTS_GUIDE.md` - How to create screenshots
- `PRE_PUBLISH_CHECKLIST.md` - Complete publishing checklist

---

*Last Updated: December 12, 2025*
