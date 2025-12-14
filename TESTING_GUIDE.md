# Testing Guide for Infinite Scroll Pro

This guide helps you test the app thoroughly before submitting to Shopify App Store.

---

## Pre-Submission Testing Checklist

### ✅ Phase 1: Development Store Testing

#### 1. Installation Testing

**Test the installation flow:**
```bash
npm run dev
# Follow CLI prompts to install on development store
```

**Verify:**
- [ ] App installs without errors
- [ ] Permissions requested are correct (write_themes only)
- [ ] App appears in Apps list
- [ ] No console errors during installation

---

#### 2. Theme Editor Integration

**Test adding the block:**
1. Go to Online Store → Themes → Customize
2. Navigate to a collection page
3. Add "Infinite Scroll" block

**Verify:**
- [ ] Block appears in the blocks list
- [ ] Block can be added to collection template
- [ ] Block settings panel loads correctly
- [ ] All settings are visible and functional
- [ ] Settings save correctly
- [ ] Block can be moved/repositioned
- [ ] Block can be deleted

---

#### 3. Core Functionality Testing

**Test on Collection Page:**

**A. Auto-Scroll Mode**
- [ ] Products load automatically when scrolling to bottom
- [ ] Loading spinner appears while loading
- [ ] New products appear smoothly
- [ ] No duplicate products
- [ ] URL updates with page number (if enabled)
- [ ] End message displays when all products loaded
- [ ] No console errors

**B. Manual Button Mode**
- [ ] "Load More" button appears
- [ ] Button text is customizable
- [ ] Button loads next page when clicked
- [ ] Button disappears when all products loaded
- [ ] Button styling matches settings

**C. Hybrid Mode (Both enabled)**
- [ ] Both auto-scroll and button work
- [ ] No conflicts between modes
- [ ] Smooth user experience

---

#### 4. Filter Integration Testing

**Test with theme filters:**
1. Apply price filter
2. Scroll to trigger infinite scroll
3. Change filter
4. Verify infinite scroll resets

**Verify:**
- [ ] Infinite scroll works with filtered results
- [ ] Changing filters resets infinite scroll
- [ ] Filter URLs work correctly
- [ ] No duplicate products after filter change
- [ ] Product count updates correctly

**Test different filter types:**
- [ ] Price range filters
- [ ] Size/Color variant filters
- [ ] Tag filters
- [ ] Vendor filters
- [ ] Product type filters

---

#### 5. Sorting Integration Testing

**Test with sorting options:**
1. Sort by: Price (Low to High)
2. Verify infinite scroll works
3. Change sort to: Best Selling
4. Verify infinite scroll resets

**Verify:**
- [ ] Infinite scroll works with sorted results
- [ ] Changing sort resets infinite scroll
- [ ] Products load in correct order
- [ ] No duplicate products

**Test sort options:**
- [ ] Best Selling
- [ ] Price: Low to High
- [ ] Price: High to Low
- [ ] A-Z
- [ ] Z-A
- [ ] Newest
- [ ] Oldest

---

#### 6. Mobile Responsiveness Testing

**Test on different devices:**

**Mobile (375x667 - iPhone SE)**
- [ ] Infinite scroll triggers correctly
- [ ] Loading spinner visible
- [ ] Products display correctly
- [ ] Button (if enabled) is tap-friendly
- [ ] No horizontal scrolling
- [ ] Text is readable

**Tablet (768x1024 - iPad)**
- [ ] Products display in grid correctly
- [ ] Infinite scroll works smoothly
- [ ] Filters work on tablet
- [ ] Touch interactions work

**Desktop (1920x1080)**
- [ ] Full desktop experience works
- [ ] Products load smoothly
- [ ] All features functional

---

#### 7. Browser Compatibility Testing

**Test on multiple browsers:**

**Chrome**
- [ ] Infinite scroll works
- [ ] No console errors
- [ ] Smooth scrolling

**Safari**
- [ ] Infinite scroll works
- [ ] No console errors
- [ ] iOS Safari tested (if possible)

**Firefox**
- [ ] Infinite scroll works
- [ ] No console errors

**Edge**
- [ ] Infinite scroll works
- [ ] No console errors

---

#### 8. Performance Testing

**Check performance:**
- [ ] Page load time acceptable (< 3 seconds)
- [ ] Infinite scroll doesn't slow down page
- [ ] Images load efficiently (lazy loading)
- [ ] No memory leaks (test with DevTools)
- [ ] Smooth scrolling (60fps)

**Test with many products:**
- [ ] Test collection with 100+ products
- [ ] Scroll through 5+ pages
- [ ] Verify no performance degradation
- [ ] Check memory usage stays reasonable

---

#### 9. Theme Compatibility Testing

**Test on different themes:**

**Dawn (Shopify default)**
- [ ] Infinite scroll works
- [ ] Styling matches theme
- [ ] No CSS conflicts

**Debut (popular free theme)**
- [ ] Infinite scroll works
- [ ] Auto-detects product grid
- [ ] No visual breaks

**One Premium Theme** (if available)
- [ ] Infinite scroll works
- [ ] Compatible with theme features
- [ ] No conflicts

---

#### 10. Customization Testing

**Test all settings:**

**Colors:**
- [ ] Button background color changes
- [ ] Button text color changes
- [ ] Loader color changes
- [ ] Custom colors save correctly

**Text:**
- [ ] Button text customization works
- [ ] Loading message customization works
- [ ] End message customization works
- [ ] Text displays correctly

**Behavior:**
- [ ] Enable/disable auto-scroll works
- [ ] Enable/disable button works
- [ ] Enable/disable URL updates works
- [ ] Enable/disable end message works

---

### ✅ Phase 2: Webhook Testing

#### 1. Webhook Server Health Check

```bash
curl https://your-webhook-url/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "Infinite Scroll Pro Webhooks",
  "timestamp": "2025-12-12T10:30:00.000Z"
}
```

**Verify:**
- [ ] Webhook server is running
- [ ] Health endpoint responds
- [ ] Response is correct JSON

---

#### 2. GDPR Webhooks Testing

**Test each webhook endpoint:**

**A. Test customers/data_request**
```bash
curl -X POST https://your-webhook-url/webhooks/customers/data_request \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Shop-Domain: test.myshopify.com" \
  -d '{"customer": {"id": 123, "email": "test@example.com"}}'
```

**Expected:** 200 status code

**B. Test customers/redact**
```bash
curl -X POST https://your-webhook-url/webhooks/customers/redact \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Shop-Domain: test.myshopify.com" \
  -d '{"customer": {"id": 123}}'
```

**Expected:** 200 status code

**C. Test shop/redact**
```bash
curl -X POST https://your-webhook-url/webhooks/shop/redact \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Shop-Domain: test.myshopify.com" \
  -d '{"shop_id": 123, "shop_domain": "test.myshopify.com"}'
```

**Expected:** 200 status code

**Verify:**
- [ ] All webhooks respond with 200
- [ ] Webhooks log properly
- [ ] No server errors

---

### ✅ Phase 3: Documentation Testing

#### 1. Merchant Guide Accuracy

**Follow MERCHANT_GUIDE.md:**
- [ ] Installation steps are accurate
- [ ] Screenshots (if any) are current
- [ ] Links work correctly
- [ ] Instructions are clear
- [ ] No outdated information

#### 2. Privacy Policy Accuracy

**Review PRIVACY_POLICY.md:**
- [ ] Contact information correct
- [ ] URLs work
- [ ] Partner ID added
- [ ] Accurately describes data practices
- [ ] Hosted on public HTTPS URL

---

### ✅ Phase 4: Edge Cases & Error Handling

#### 1. Empty Collections

**Test with:**
- [ ] Collection with 0 products
- [ ] Collection with exactly 1 page of products
- [ ] Collection with exactly 2 pages

**Verify:**
- [ ] No errors with empty collections
- [ ] Handles single page gracefully
- [ ] No infinite loading states

---

#### 2. Network Errors

**Test network conditions:**
- [ ] Slow 3G (throttle network in DevTools)
- [ ] Offline mode (what happens?)
- [ ] Failed API request (simulate 404)

**Verify:**
- [ ] Graceful error handling
- [ ] User sees appropriate message
- [ ] Can retry failed requests

---

#### 3. Rapid User Actions

**Test:**
- [ ] Rapid scrolling up and down
- [ ] Quick filter changes
- [ ] Clicking button multiple times rapidly
- [ ] Changing sort while loading

**Verify:**
- [ ] No duplicate products
- [ ] No race conditions
- [ ] Smooth user experience
- [ ] Proper state management

---

### ✅ Phase 5: Analytics & Events

#### 1. Custom Events Testing

**Test if custom events fire:**

```javascript
// In browser console
document.addEventListener('infinitescroll:loaded', (e) => {
  console.log('Page loaded:', e.detail.page);
  console.log('Products:', e.detail.productsLoaded);
});
```

**Verify:**
- [ ] Event fires when products load
- [ ] Event data is correct
- [ ] No errors in event handling

---

### ✅ Phase 6: Uninstallation Testing

#### 1. Clean Uninstall

**Test uninstall process:**
1. Remove Infinite Scroll block from theme
2. Save theme
3. Uninstall app from Apps page

**Verify:**
- [ ] Block can be removed cleanly
- [ ] No leftover code in theme
- [ ] Pagination returns to normal
- [ ] App uninstalls without errors
- [ ] Uninstall webhook fires (check logs)

---

### ✅ Phase 7: Security Testing

#### 1. XSS Prevention

**Test for XSS vulnerabilities:**
- [ ] Custom button text with HTML entities
- [ ] Custom messages with scripts
- [ ] URL parameters with malicious code

**Verify:**
- [ ] No script injection possible
- [ ] HTML entities are escaped
- [ ] Safe rendering of user input

---

#### 2. CSRF Protection

**Verify:**
- [ ] Webhook HMAC verification works
- [ ] Only Shopify can trigger webhooks
- [ ] Unauthorized requests rejected

---

### ✅ Phase 8: Accessibility Testing

#### 1. Screen Reader Testing

**Test with screen reader:**
- [ ] Loading state announced
- [ ] Button has proper aria-label
- [ ] End message is announced
- [ ] Keyboard navigation works

---

#### 2. Keyboard Navigation

**Test with keyboard only:**
- [ ] Tab to "Load More" button works
- [ ] Enter/Space activates button
- [ ] Focus indicators visible
- [ ] No keyboard traps

---

### ✅ Testing Record Template

**Copy this for your testing session:**

```
# Testing Session: [Date]
Tester: Vishal Gohel
Store: [Dev Store URL]
Theme: [Theme Name]

## Core Functionality
- [ ] Auto-scroll: PASS / FAIL
- [ ] Manual button: PASS / FAIL
- [ ] Filters: PASS / FAIL
- [ ] Sorting: PASS / FAIL

## Mobile Testing
- [ ] iPhone: PASS / FAIL
- [ ] Android: PASS / FAIL
- [ ] Tablet: PASS / FAIL

## Browser Testing
- [ ] Chrome: PASS / FAIL
- [ ] Safari: PASS / FAIL
- [ ] Firefox: PASS / FAIL

## Webhooks
- [ ] Server health: PASS / FAIL
- [ ] All endpoints: PASS / FAIL

## Issues Found:
1. [Issue description]
2. [Issue description]

## Notes:
[Any observations or concerns]
```

---

## Common Issues & Solutions

### Issue: Products not loading

**Possible causes:**
- Block not positioned correctly
- Collection has no pagination
- JavaScript errors

**Debug:**
```javascript
// In browser console
localStorage.setItem('debug', 'true');
// Reload page and check console
```

### Issue: Filters breaking

**Possible causes:**
- Theme uses custom filter implementation
- JavaScript conflicts

**Debug:**
- Check console for errors
- Test with theme's default filters first

### Issue: Webhooks failing

**Possible causes:**
- Incorrect webhook secret
- Server not deployed
- HMAC verification failing

**Debug:**
- Check webhook server logs
- Test with curl commands
- Verify environment variables

---

## Final Pre-Submission Checklist

```
☐ All core functionality tested
☐ Mobile responsiveness verified
☐ Multiple browsers tested
☐ Filters and sorting work
☐ Webhooks deployed and tested
☐ No console errors
☐ Performance acceptable
☐ Documentation accurate
☐ Privacy policy hosted
☐ Clean uninstall verified

Ready to submit: YES / NO
```

---

## For Shopify Review Team

When submitting, provide this information:

**Test Store:** [Your dev store URL]
**Test Account:** [Login credentials if needed]
**Theme Used:** [Theme name]

**Test Instructions:**
1. Go to [collection URL]
2. Scroll to bottom
3. Observe products loading automatically
4. Test filters and sorting
5. Check mobile view

**Known Limitations:**
- Works with themes that have standard pagination
- Requires modern browsers (IE11 not supported)

---

*Last Updated: December 12, 2025*

Good luck with testing! 🧪
