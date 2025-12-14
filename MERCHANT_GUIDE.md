# Infinite Scroll Pro - Merchant Installation Guide

Welcome! This guide will help you set up infinite scroll on your Shopify store in just a few minutes.

---

## What is Infinite Scroll?

Infinite scroll automatically loads more products as your customers scroll down your collection pages. Instead of clicking "Next Page," products appear seamlessly, creating a better shopping experience.

**Benefits:**
- 📈 Increase product discovery
- 🎯 Improve customer engagement
- 📱 Better mobile experience
- ⚡ Reduce bounce rates
- 🛒 Boost conversions

---

## Quick Start (60 Seconds)

### Step 1: Install the App

1. Go to the Shopify App Store
2. Search for "Infinite Scroll Pro"
3. Click **Add app**
4. Click **Install app** to approve permissions

✅ **Done!** The app is now installed.

---

### Step 2: Add to Your Theme

1. From your Shopify admin, go to **Online Store** → **Themes**
2. Click **Customize** on your current theme
3. Navigate to any **collection page** (e.g., "All Products")
4. In the left sidebar, find the **"Add block"** or **"Add section"** button
5. Look for **"Infinite Scroll"** in the list
6. Click it to add the block
7. Position it anywhere on the page (usually at the bottom of product grid)

✅ **Done!** Infinite scroll is now active.

---

### Step 3: Customize Settings (Optional)

Click on the **Infinite Scroll** block you just added to see customization options:

**Basic Settings:**
- ✅ Enable auto-scroll (products load automatically)
- ✅ Show "Load More" button (manual control option)
- ✅ Update URL with page numbers (for SEO)

**Appearance:**
- 🎨 Button background color
- 🎨 Button text color
- 🎨 Loading spinner color
- ✏️ Custom button text
- ✏️ Custom loading message
- ✏️ End-of-collection message

**Adjust settings to match your brand, then click Save.**

✅ **Done!** You're all set.

---

## Detailed Installation Steps

### Step-by-Step with Screenshots

#### 1. Access Theme Editor

From Shopify Admin:
1. Click **Online Store** (left sidebar)
2. Click **Themes**
3. Find your active theme (has "Current theme" badge)
4. Click **Customize** button

You're now in the theme editor.

#### 2. Navigate to a Collection Page

In the top dropdown:
- Select **Collections** → **Default collection**
- Or use the preview to navigate to any collection page

The URL should show something like: `/collections/all`

#### 3. Add the Infinite Scroll Block

**Method A: Add as Block (Most Common)**
1. Click on the **product grid section** (where products display)
2. In the left sidebar, click **Add block**
3. Scroll to find **Infinite Scroll**
4. Click to add it

**Method B: Add as Section (Some Themes)**
1. Click **Add section** at the bottom
2. Find **Apps** category
3. Select **Infinite Scroll**

#### 4. Position the Block

Drag the **Infinite Scroll** block to position it:
- **Recommended:** Below the product grid
- **Alternative:** After pagination

The position determines where the loading indicator appears.

#### 5. Configure Settings

Click the **Infinite Scroll** block to expand settings:

| Setting | Description | Recommended |
|---------|-------------|-------------|
| **Enable Auto Scroll** | Products load automatically while scrolling | ✅ ON |
| **Show Load More Button** | Display manual "Load More" button | ❌ OFF (unless you prefer manual) |
| **Update URL** | Add page numbers to URL | ✅ ON (for SEO) |
| **Button Text** | Custom text for Load More button | "Load More Products" |
| **Show End Message** | Display message when all products loaded | ✅ ON |
| **End Message Text** | Custom end-of-collection message | "You've viewed all products" |

**Color Customization:**
- Enable custom colors if you want to match your brand
- Pick colors using the color picker
- Preview changes in real-time

#### 6. Save and Test

1. Click **Save** (top right)
2. Visit your live collection page
3. Scroll to the bottom
4. Watch products load automatically!

---

## Common Configurations

### Configuration 1: Auto-Scroll Only (Recommended)
```
✅ Enable Auto Scroll: ON
❌ Show Load More Button: OFF
✅ Update URL: ON
✅ Show End Message: ON
```
**Best for:** Most stores, mobile-first experiences

### Configuration 2: Manual Load More Button
```
❌ Enable Auto Scroll: OFF
✅ Show Load More Button: ON
✅ Update URL: ON
✅ Show End Message: ON
```
**Best for:** Stores preferring user control

### Configuration 3: Hybrid (Auto + Button)
```
✅ Enable Auto Scroll: ON
✅ Show Load More Button: ON
✅ Update URL: ON
✅ Show End Message: ON
```
**Best for:** Giving users both options

---

## Testing Your Installation

### Test Checklist

Visit a collection page with many products and verify:

- [ ] Products load automatically when scrolling to bottom
- [ ] Loading spinner appears while loading
- [ ] New products appear smoothly
- [ ] URL updates with page number (if enabled)
- [ ] Filters still work correctly
- [ ] Sorting still works correctly
- [ ] "Load More" button appears (if enabled)
- [ ] End message displays when all products loaded
- [ ] Works on mobile devices
- [ ] Works on different browsers (Chrome, Safari, Firefox)

### Troubleshooting Tests

**If products don't load:**
1. Check that block is added to collection template
2. Verify block is positioned correctly
3. Ensure theme has pagination originally
4. Test on different collection pages

**If filters break:**
- Infinite scroll should automatically reset when filters change
- If not, try removing and re-adding the block

**If sorting breaks:**
- Similar to filters, should automatically work
- Try refreshing the page

---

## Customization Examples

### Example 1: Minimalist Setup
```
Enable Auto Scroll: ON
Show Load More Button: OFF
Show End Message: OFF
Custom Colors: Disabled
```
Clean, invisible infinite scroll.

### Example 2: Branded Experience
```
Enable Auto Scroll: ON
Show Load More Button: ON
Button Background: #FF6B6B (your brand color)
Button Text: #FFFFFF
Button Text: "Show Me More!"
End Message: "That's all we've got! Check back soon."
```
Matches your brand personality.

### Example 3: SEO-Optimized
```
Enable Auto Scroll: ON
Update URL: ON
Show End Message: ON
```
Best for SEO and analytics tracking.

---

## Frequently Asked Questions

### Installation Questions

**Q: Do I need to edit code?**
A: No! Everything is done through the theme editor. No coding required.

**Q: Will this work with my theme?**
A: Yes! The app automatically detects and works with any Shopify theme.

**Q: Can I use this on multiple collection pages?**
A: Yes! Add the block once, and it works on all collection pages. You can also customize per collection if needed.

**Q: What if I don't see the "Infinite Scroll" block?**
A: Make sure the app is installed. Go to Apps in your admin and verify "Infinite Scroll Pro" is listed.

### Functionality Questions

**Q: Will it work with my filters?**
A: Yes! The app automatically integrates with your theme's filters. When customers apply filters, infinite scroll resets and loads filtered results.

**Q: Does it work with product sorting?**
A: Yes! Sorting (by price, name, etc.) works seamlessly with infinite scroll.

**Q: Can I show both auto-scroll AND a button?**
A: Yes! Enable both settings. Products auto-load while scrolling, plus a button appears for manual control.

**Q: Will this slow down my store?**
A: No! The app uses efficient modern APIs and adds minimal code. It's designed for performance.

### Customization Questions

**Q: Can I change the button text?**
A: Yes! In the block settings, find "Load More Button Text" and enter your custom text.

**Q: Can I change the colors?**
A: Yes! Enable "Custom Colors" in settings and use the color pickers.

**Q: Can I hide the loading spinner?**
A: The spinner is automatic and very brief. It provides good user feedback during loading.

**Q: Can I limit how many times it loads?**
A: The app loads all products until the collection ends. This gives customers the best browsing experience.

### SEO & Analytics Questions

**Q: Will this hurt my SEO?**
A: No! With "Update URL" enabled, each load updates the URL with the page number. This is SEO-friendly.

**Q: Can I track infinite scroll with Google Analytics?**
A: Yes! The app fires custom events you can track. See developer documentation for details.

**Q: Do search engines see all products?**
A: Yes! Search engines crawl the standard paginated URLs. Infinite scroll is a customer experience enhancement.

### Troubleshooting Questions

**Q: Products aren't loading automatically. Why?**
A: Check these:
1. Is "Enable Auto Scroll" turned ON?
2. Is the block positioned correctly on the page?
3. Does the collection have multiple pages of products?
4. Try refreshing the page

**Q: The button doesn't appear. Why?**
A: Make sure "Show Load More Button" is turned ON in settings.

**Q: Filters stopped working. What happened?**
A: This is rare. Try:
1. Refresh the page
2. Remove the Infinite Scroll block
3. Re-add it
4. Save and test

**Q: It's not working on mobile. Help!**
A: The app is fully mobile-responsive. Try:
1. Clear your mobile browser cache
2. Test in incognito/private mode
3. Verify block is added to collection page

---

## Advanced Tips

### Tip 1: Different Settings Per Collection

You can add unique settings for specific collections:

1. In theme editor, use the dropdown to select a specific collection
2. Add the Infinite Scroll block
3. Configure settings for this collection only
4. Save

### Tip 2: A/B Testing

Test different configurations:

**Week 1:** Auto-scroll only
**Week 2:** Manual button only
**Week 3:** Hybrid approach

Track metrics:
- Average products viewed per session
- Time on collection pages
- Add-to-cart rate
- Bounce rate

### Tip 3: Mobile Optimization

For best mobile experience:
- Enable auto-scroll (eliminates tapping small pagination)
- Use concise button text if showing button
- Test on actual mobile devices

### Tip 4: Large Catalogs

If you have 500+ products:
- Auto-scroll is highly recommended
- Enable URL updates for user navigation
- Show end message so users know when done

---

## Getting Help

### Support Resources

**Email Support:** support@yourdomain.com
**Documentation:** https://yourdomain.com/docs
**Common Issues:** Check troubleshooting section above

### What to Include in Support Requests

1. Your store URL
2. Description of the issue
3. What you've already tried
4. Screenshots (if applicable)
5. Theme name

We typically respond within 24 hours.

---

## Best Practices

✅ **DO:**
- Test on your collection pages after installation
- Customize colors to match your brand
- Enable URL updates for better SEO
- Test on mobile devices
- Check that filters and sorting still work

❌ **DON'T:**
- Add multiple Infinite Scroll blocks to the same page
- Disable without testing first
- Forget to save after making changes
- Skip mobile testing

---

## Uninstalling

If you need to remove infinite scroll:

1. Go to **Online Store** → **Themes** → **Customize**
2. Navigate to a collection page
3. Click the **Infinite Scroll** block
4. Click the trash/delete icon
5. Click **Save**
6. Go to **Apps** in admin
7. Find "Infinite Scroll Pro"
8. Click **Delete**

Your theme will return to standard pagination.

---

## Privacy & Data

**What We DON'T Collect:**
- ❌ Customer personal information
- ❌ Shopping cart data
- ❌ Purchase history
- ❌ Browsing behavior

**What We DO Access:**
- ✅ Your theme configuration (the settings you choose)
- ✅ Collection page structure (to enable infinite scroll)

We're GDPR compliant and privacy-first. See our [Privacy Policy](https://yourdomain.com/privacy-policy) for details.

---

## Updates

The app updates automatically. You don't need to do anything to get new features and improvements.

---

## Thank You!

Thank you for choosing Infinite Scroll Pro! We're committed to helping you create the best shopping experience for your customers.

If you love the app, please leave a review in the Shopify App Store. Your feedback helps us improve!

**Questions? Contact us:** support@yourdomain.com

---

*Last Updated: December 12, 2025*
