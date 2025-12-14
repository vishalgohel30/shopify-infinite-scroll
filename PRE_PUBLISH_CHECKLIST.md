# Pre-Publishing Checklist for Shopify App Store

Use this checklist to ensure everything is ready before submitting your app to the Shopify App Store.

**Estimated Time to Complete:** 4-6 hours (if starting from current state)

---

## Phase 1: Technical Setup (2-3 hours)

### ☐ 1. Deploy GDPR Webhooks Server

**Priority:** 🔴 CRITICAL

**Location:** `/webhooks/` folder

**Steps:**
```bash
# Option A: Deploy to Vercel (Recommended - Free)
cd webhooks
npm install
npm install -g vercel
vercel --prod

# Option B: Deploy to Railway
railway login
railway init
railway up
railway variables set SHOPIFY_WEBHOOK_SECRET=your_secret

# Option C: Deploy to Heroku
heroku create infinite-scroll-webhooks
heroku config:set SHOPIFY_WEBHOOK_SECRET=your_secret
git push heroku main
```

**Get Your Webhook URL:** `https://your-project.vercel.app` (or similar)

**Test It:**
```bash
curl https://your-deployed-url/health
# Should return: {"status":"healthy",...}
```

**Estimated Time:** 30 minutes

---

### ☐ 2. Update Webhook URLs in Configuration

**Priority:** 🔴 CRITICAL

**File:** `shopify.app.toml`

**Find and Replace:**
```toml
# Line 33
uri = "https://YOUR_WEBHOOK_URL/webhooks/customers/data_request"
# Change to:
uri = "https://your-actual-url.vercel.app/webhooks/customers/data_request"

# Line 38
uri = "https://YOUR_WEBHOOK_URL/webhooks/customers/redact"
# Change to:
uri = "https://your-actual-url.vercel.app/webhooks/customers/redact"

# Line 43
uri = "https://YOUR_WEBHOOK_URL/webhooks/shop/redact"
# Change to:
uri = "https://your-actual-url.vercel.app/webhooks/shop/redact"

# Line 48
uri = "https://YOUR_WEBHOOK_URL/webhooks/app/uninstalled"
# Change to:
uri = "https://your-actual-url.vercel.app/webhooks/app/uninstalled"
```

**Verify:** All 4 webhook URLs are updated with your actual deployed URL.

**Estimated Time:** 5 minutes

---

### ☐ 3. Set Webhook Secret Environment Variable

**Priority:** 🔴 CRITICAL

**Where:** Your hosting platform (Vercel, Railway, Heroku)

**Variable Name:** `SHOPIFY_WEBHOOK_SECRET`

**How to Get the Secret:**
1. Go to Shopify Partner Dashboard
2. Select your app
3. Go to Configuration → Webhooks
4. Copy the webhook secret

**How to Set:**

**Vercel:**
```bash
vercel env add SHOPIFY_WEBHOOK_SECRET
# Enter the secret when prompted
```

**Railway:**
```bash
railway variables set SHOPIFY_WEBHOOK_SECRET=your_secret_here
```

**Heroku:**
```bash
heroku config:set SHOPIFY_WEBHOOK_SECRET=your_secret_here
```

**Estimated Time:** 5 minutes

---

### ☐ 4. Convert App Icon to PNG

**Priority:** 🔴 CRITICAL

**Source File:** `assets/app-icon.svg`

**Required Outputs:**
- `assets/app-icon-1200.png` (1200x1200px)
- `assets/app-icon-512.png` (512x512px)

**Method 1: Online Tool (Easiest)**
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `app-icon.svg`
3. Set dimensions to 1200x1200
4. Download as `app-icon-1200.png`
5. Repeat for 512x512

**Method 2: ImageMagick CLI**
```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

cd assets
magick convert -background none -size 1200x1200 app-icon.svg app-icon-1200.png
magick convert -background none -size 512x512 app-icon.svg app-icon-512.png
```

**Method 3: Figma/Design Tool**
1. Open `app-icon.svg` in Figma/Sketch/Illustrator
2. Export as PNG at 1200x1200px
3. Export as PNG at 512x512px

**Verify:** Both PNG files created, high quality, transparent background.

**Estimated Time:** 15 minutes

---

### ☐ 5. Host Privacy Policy

**Priority:** 🔴 CRITICAL

**Source File:** `PRIVACY_POLICY.md`

**First, Update Placeholders:**
Replace these in the file:
- `[YOUR_SUPPORT_EMAIL]` → your actual support email
- `[YOUR_WEBSITE]` → your actual website
- `[YOUR_SUPPORT_URL]` → your support page URL
- `[YOUR_COMPANY_NAME]` → your company name
- `[YOUR_SHOPIFY_PARTNER_ID]` → your partner ID

**Hosting Options:**

**Option A: GitHub Pages (Free)**
```bash
# Create new branch
git checkout -b gh-pages

# Copy privacy policy
cp PRIVACY_POLICY.md index.md

# Push
git add index.md
git commit -m "Add privacy policy"
git push origin gh-pages

# Access at: https://yourusername.github.io/shopify-infinite-scroll/
```

**Option B: Your Website**
- Upload to your existing website
- URL: `https://yourdomain.com/privacy-policy`

**Option C: Vercel Static Page**
```bash
# Create simple Next.js or static site
vercel --prod
```

**Get Privacy Policy URL:** `https://your-url/privacy-policy`

**Estimated Time:** 20 minutes

---

### ☐ 6. Update package.json Metadata

**Priority:** 🔴 CRITICAL

**File:** `package.json`

**Update These Fields:**
```json
{
  "author": {
    "name": "YOUR_NAME_OR_COMPANY",        // ← Change this
    "email": "support@yourdomain.com",      // ← Change this
    "url": "https://yourdomain.com"         // ← Change this
  },
  "homepage": "https://yourdomain.com/infinite-scroll-pro",  // ← Change this
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/shopify-infinite-scroll"  // ← Change this
  },
  "bugs": {
    "url": "https://yourdomain.com/support",     // ← Change this
    "email": "support@yourdomain.com"            // ← Change this
  }
}
```

**Verify:** All URLs and emails are real and working.

**Estimated Time:** 10 minutes

---

## Phase 2: Visual Assets (2-3 hours)

### ☐ 7. Create App Screenshots

**Priority:** 🔴 CRITICAL

**Reference:** See `SCREENSHOTS_GUIDE.md` for detailed instructions.

**Required:** 3-5 screenshots at 1280x720px or 1920x1080px

**Screenshot List:**
1. ☐ Hero shot - Collection page with infinite scroll active
2. ☐ Theme editor settings - Configuration interface
3. ☐ Mobile view - Responsive mobile experience
4. ☐ Filter integration - Working with filters
5. ☐ Load More button - Manual mode option

**Tools:**
- Browser DevTools for capturing
- Canva/Figma for annotations
- Mockuphone for device frames (optional)

**Quality Checklist:**
- [ ] Professional demo store (no test data)
- [ ] Real product names and images
- [ ] Clear annotations
- [ ] High resolution
- [ ] Correct dimensions
- [ ] PNG format
- [ ] Under 5MB each

**Estimated Time:** 2 hours

---

### ☐ 8. Verify Icon Quality

**Priority:** 🟡 IMPORTANT

**Files to Check:**
- `assets/app-icon-1200.png`
- `assets/app-icon-512.png`

**Quality Checks:**
- [ ] Sharp, not blurry
- [ ] Transparent background
- [ ] Looks good at small sizes (32x32px)
- [ ] Colors are correct
- [ ] No compression artifacts
- [ ] Recognizable and professional

**Estimated Time:** 10 minutes

---

## Phase 3: Content & Documentation (1-2 hours)

### ☐ 9. Prepare App Store Listing Content

**Priority:** 🔴 CRITICAL

**Reference:** `APP_STORE_LISTING.md`

**Copy this content to Shopify Partner Dashboard:**

**App Name:**
- Infinite Scroll Pro

**Tagline (100 chars):**
- "Automatically load products as customers scroll - works with any theme"

**Description:**
- Use the full description from `APP_STORE_LISTING.md`
- Adjust as needed for your brand

**Key Features (bullet points):**
- Copy from "Key Features" section
- 8 main features listed

**Pricing:**
- Free / $0 per month

**Support URLs:**
- Support email: your-email@domain.com
- Support URL: https://yourdomain.com/support
- Privacy policy: https://yourdomain.com/privacy-policy
- Homepage: https://yourdomain.com

**Estimated Time:** 30 minutes

---

### ☐ 10. Set Up Support Infrastructure

**Priority:** 🟡 IMPORTANT

**Required Elements:**

**A. Support Email**
- [ ] Create: support@yourdomain.com
- [ ] Set up email forwarding or inbox
- [ ] Test sending/receiving
- [ ] Prepare auto-reply (optional)

**B. Support Page**
- [ ] Create basic FAQ page
- [ ] Include common troubleshooting
- [ ] Add contact form or email
- [ ] Link to MERCHANT_GUIDE.md

**C. Documentation**
- [ ] Host MERCHANT_GUIDE.md somewhere accessible
- [ ] Consider using GitHub Pages, GitBook, or Notion
- [ ] Make sure it's publicly accessible

**Minimum Support Setup:**
- Working support email
- Basic FAQ (5-10 common questions)
- Link to installation guide

**Estimated Time:** 30 minutes

---

### ☐ 11. Update All Placeholder URLs

**Priority:** 🔴 CRITICAL

**Files to Update:**

**1. PRIVACY_POLICY.md**
- [ ] `[YOUR_SUPPORT_EMAIL]`
- [ ] `[YOUR_WEBSITE]`
- [ ] `[YOUR_SUPPORT_URL]`
- [ ] `[YOUR_COMPANY_NAME]`
- [ ] `[YOUR_SHOPIFY_PARTNER_ID]`

**2. MERCHANT_GUIDE.md**
- [ ] `support@yourdomain.com` (appears 4 times)
- [ ] `https://yourdomain.com` (appears 3 times)

**3. APP_STORE_LISTING.md**
- [ ] All `yourdomain.com` references
- [ ] All `support@yourdomain.com` references

**4. README.md**
- [ ] Update if it has any placeholder URLs

**Find & Replace:**
```bash
# Use your code editor's find & replace
Find: "yourdomain.com"
Replace: "youractualdomain.com"

Find: "support@yourdomain.com"
Replace: "support@youractualdomain.com"
```

**Estimated Time:** 15 minutes

---

## Phase 4: Testing (1 hour)

### ☐ 12. Test on Multiple Themes

**Priority:** 🟡 IMPORTANT

**Test Themes:**
- [ ] Dawn (Shopify default)
- [ ] Debut (popular free theme)
- [ ] One premium theme (if available)

**Test Items:**
- [ ] Infinite scroll loads products
- [ ] Filters work correctly
- [ ] Sorting works correctly
- [ ] Mobile responsive
- [ ] Load more button (if enabled)
- [ ] End message displays
- [ ] URL updates (if enabled)
- [ ] No console errors

**Estimated Time:** 30 minutes

---

### ☐ 13. Test Webhooks

**Priority:** 🟡 IMPORTANT

**Test Each Webhook:**

**1. Health Check**
```bash
curl https://your-webhook-url/health
# Should return: {"status":"healthy"}
```

**2. Test with Shopify (optional)**
- Trigger webhooks from Shopify Partner Dashboard
- Check your webhook server logs
- Verify 200 responses

**Webhook Checklist:**
- [ ] Server is running
- [ ] Health endpoint works
- [ ] HMAC verification configured
- [ ] Environment variable set
- [ ] Logs are working

**Estimated Time:** 15 minutes

---

### ☐ 14. Final Code Review

**Priority:** 🟡 IMPORTANT

**Review Checklist:**
- [ ] No console.log() in production code
- [ ] No TODO comments
- [ ] No test/debug code
- [ ] No hardcoded URLs
- [ ] No API keys in code
- [ ] All error handling in place
- [ ] Code is minified/optimized

**Files to Review:**
- `extensions/infinite-scroll-theme/assets/infinite-scroll.js`
- `extensions/infinite-scroll-theme/blocks/infinite-scroll.liquid`
- `webhooks/server.js`

**Estimated Time:** 15 minutes

---

## Phase 5: Shopify Partner Dashboard (30 minutes)

### ☐ 15. Create/Update App in Partner Dashboard

**Priority:** 🔴 CRITICAL

**Steps:**

**1. App Basic Info**
- [ ] App name: Infinite Scroll Pro
- [ ] App handle: infinite-scroll-pro (or auto-generated)
- [ ] Primary category: Store Design > Product Display
- [ ] Secondary category: Store Design > User Experience

**2. App Listing**
- [ ] Upload app icon (1200x1200px)
- [ ] Upload small icon (512x512px)
- [ ] Add tagline
- [ ] Add description
- [ ] Add key features
- [ ] Upload 5 screenshots (in order)
- [ ] Add support email
- [ ] Add support URL
- [ ] Add privacy policy URL
- [ ] Add homepage URL

**3. Pricing**
- [ ] Select "Free"
- [ ] Confirm no charges

**4. App Extensions**
- [ ] Verify theme extension is listed
- [ ] Check extension name: "Infinite Scroll"
- [ ] Verify extension is enabled

**5. App Distribution**
- [ ] Select "Public" distribution
- [ ] Choose "Shopify App Store"
- [ ] Accept terms and conditions

**Estimated Time:** 30 minutes

---

### ☐ 16. Test Installation on Development Store

**Priority:** 🔴 CRITICAL

**Steps:**
1. [ ] Install app on dev store from Partner Dashboard
2. [ ] Go through installation flow
3. [ ] Add block to theme
4. [ ] Configure settings
5. [ ] Test infinite scroll on collection page
6. [ ] Test filters and sorting
7. [ ] Test on mobile

**Verify:**
- [ ] Installation smooth
- [ ] Settings save correctly
- [ ] Infinite scroll works
- [ ] No errors in console
- [ ] Looks professional

**Estimated Time:** 20 minutes

---

## Phase 6: Submission (15 minutes)

### ☐ 17. Pre-Submission Final Checks

**Priority:** 🔴 CRITICAL

**Complete this checklist:**

**Technical:**
- [ ] Webhook server deployed and running
- [ ] Webhook URLs updated in shopify.app.toml
- [ ] Privacy policy hosted and accessible
- [ ] Support email working
- [ ] All placeholder text replaced

**Visual:**
- [ ] 5 screenshots uploaded
- [ ] Icons uploaded (1200px and 512px)
- [ ] All images high quality
- [ ] No test/dummy data in screenshots

**Content:**
- [ ] App description complete
- [ ] Key features listed
- [ ] FAQs added
- [ ] Support info accurate
- [ ] Pricing set to Free

**Functional:**
- [ ] App tested on dev store
- [ ] Infinite scroll works
- [ ] No console errors
- [ ] Mobile tested
- [ ] Filters/sorting work

**Legal:**
- [ ] Privacy policy complete and accurate
- [ ] GDPR webhooks functional
- [ ] App permissions correct (write_themes only)
- [ ] Terms accurate

**Estimated Time:** 15 minutes

---

### ☐ 18. Submit for Review

**Priority:** 🔴 CRITICAL

**Steps:**
1. Go to Shopify Partner Dashboard
2. Select your app
3. Go to "App Store Listing"
4. Click "Submit for Review"
5. Fill out submission form
6. Answer all questions honestly
7. Provide test account if requested
8. Click "Submit"

**What to Expect:**
- Review typically takes 3-5 business days
- Shopify may ask questions
- You might need to make changes
- Respond quickly to any feedback

**Estimated Time:** 5 minutes (plus waiting for approval)

---

## Phase 7: Post-Submission (Ongoing)

### ☐ 19. Monitor Review Status

**Priority:** 🟡 IMPORTANT

**Actions:**
- [ ] Check Partner Dashboard daily
- [ ] Respond to any Shopify questions within 24 hours
- [ ] Be prepared to make requested changes
- [ ] Keep webhook server running and monitored

---

### ☐ 20. Prepare for Launch

**Priority:** 🟢 NICE TO HAVE

**Marketing Prep:**
- [ ] Create social media posts
- [ ] Write blog post announcement
- [ ] Prepare email to existing users (if any)
- [ ] Set up analytics tracking

**Support Prep:**
- [ ] Monitor support email
- [ ] Prepare for merchant questions
- [ ] Have troubleshooting guide ready
- [ ] Set up app review monitoring

---

## Quick Reference: Time Estimates

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Phase 1: Technical Setup** | 1-6 | 2-3 hours | 🔴 Critical |
| **Phase 2: Visual Assets** | 7-8 | 2-3 hours | 🔴 Critical |
| **Phase 3: Content** | 9-11 | 1-2 hours | 🔴 Critical |
| **Phase 4: Testing** | 12-14 | 1 hour | 🟡 Important |
| **Phase 5: Dashboard** | 15-16 | 50 minutes | 🔴 Critical |
| **Phase 6: Submission** | 17-18 | 20 minutes | 🔴 Critical |
| **Total** | | **6-8 hours** | |

---

## Troubleshooting Common Issues

### Issue: Webhook Deployment Fails

**Solution:**
- Check server logs for errors
- Verify package.json in webhooks folder
- Ensure Node.js 18+ installed
- Try different platform (Vercel vs Railway)

### Issue: Icons Look Blurry

**Solution:**
- Re-export at higher quality
- Use PNG, not JPG
- Ensure transparent background
- Check dimensions are exact (1200x1200, 512x512)

### Issue: Screenshots Rejected

**Solution:**
- Remove test data
- Use real product names
- Ensure professional quality
- Check dimensions exactly match requirements
- Add more context/annotations

### Issue: App Rejected for Privacy Policy

**Solution:**
- Ensure policy is publicly accessible (HTTPS)
- Verify it covers all required sections
- Make sure it's accurate to your data practices
- Link must work from any browser

---

## Emergency Contacts

**Shopify Partner Support:**
- Partner Dashboard > Support
- https://partners.shopify.com/support

**Community:**
- Shopify Community Forums
- Reddit: r/shopify
- Twitter: @ShopifyDevs

---

## Final Pre-Submission Checklist

Print this and check off before submitting:

```
☐ Webhook server deployed and tested
☐ All webhook URLs updated
☐ Privacy policy hosted and linked
☐ App icons created (1200px, 512px)
☐ 5 screenshots created and uploaded
☐ All placeholder text replaced
☐ Support email set up and working
☐ App tested on development store
☐ No console errors
☐ Mobile testing complete
☐ App Store listing complete
☐ Pricing set to Free
☐ Privacy policy accurate
☐ Support documentation ready
☐ GDPR webhooks functional

Total Checks: ____ / 14

If all checked, you're ready to submit! 🚀
```

---

**Good luck with your submission!**

Once approved, don't forget to:
- Announce on social media
- Ask early users for reviews
- Monitor support requests
- Track app performance
- Iterate based on feedback

---

*Last Updated: December 12, 2025*
