# Shopify Infinite Scroll App

A **lightweight theme enhancer** that adds infinite scroll to any Shopify collection page. Works **with** your theme's existing product grid, filters, and sorting - not replacing them.

## ⭐ Key Advantages

### **vs Scroll Bee ($4.95/month):**
- ✅ **FREE forever** (self-hosted)
- ✅ **Better UX** - Native theme editor configuration (no separate dashboard)
- ✅ **Theme-agnostic** - Works with ANY Shopify theme automatically
- ✅ **Smarter** - Auto-detects theme structure, no manual setup
- ✅ **Complete control** - Full source code ownership

### **vs Custom Grid Approaches:**
- ✅ **Theme Integration** - Enhances existing grid, doesn't replace it
- ✅ **Auto Filter Support** - Works with theme's filters automatically
- ✅ **Auto Sort Support** - Works with theme's sorting automatically
- ✅ **No Conflicts** - Uses theme's styling, no CSS overwrites
- ✅ **Simpler Setup** - Just enable, no configuration needed

## 🎯 Features

### **Core Functionality:**
- 🔄 **Automatic Loading**: Products load as users scroll (Intersection Observer API)
- 🔘 **Manual Mode**: Optional "Load More" button for user control
- 🎨 **Theme Preservation**: Uses your theme's existing product cards and styling
- 🔍 **Filter Compatible**: Works seamlessly with theme's filters
- ⬆️⬇️ **Sort Compatible**: Works seamlessly with theme's sort dropdown
- 📊 **Product Count**: Auto-updates if your theme has product count display
- 🔗 **SEO Friendly**: Optional URL updates with browser history API
- ⚡ **High Performance**: Minimal JavaScript, no extra CSS files
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile

### **Theme Compatibility:**
Automatically detects and works with:
- ✅ Dawn (Shopify default)
- ✅ Debut
- ✅ Brooklyn
- ✅ Prestige
- ✅ Empire
- ✅ Venture
- ✅ Minimal
- ✅ Sense
- ✅ ...and most other themes!

## 📊 Comparison

| Feature | **This App** | Scroll Bee | Custom Grid Apps |
|---------|-------------|------------|------------------|
| **Cost** | FREE | $4.95/mo | Varies |
| **Setup** | 1-click enable | Install + configure | Complex |
| **Filters** | Auto-works ✅ | Manual setup | Manual setup |
| **Sorting** | Auto-works ✅ | Manual setup | Manual setup |
| **Product Count** | Auto-works ✅ | Unknown | Usually missing |
| **Theme Styling** | Preserved ✅ | May conflict | Often conflicts |
| **Configuration** | Theme editor ✅ | Separate dashboard | Various |
| **Source Code** | Full access ✅ | Proprietary | Varies |

## Prerequisites

Before you begin, ensure you have:

1. **Shopify Partner Account**: [Sign up here](https://partners.shopify.com/signup)
2. **Development Store**: Create one from your Partner dashboard
3. **Shopify CLI**: Install globally via npm

```bash
npm install -g @shopify/cli @shopify/app
```

4. **Node.js**: Version 18 or higher

## Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd shopify-infinite-scroll
npm install
```

### Step 2: Configure Your App

1. Open `shopify.app.toml`
2. Update the `dev_store_url` with your development store URL:

```toml
dev_store_url = "your-store.myshopify.com"
```

### Step 3: Start Development Server

```bash
npm run dev
```

This command will:
- Start the Shopify CLI development server
- Generate a `client_id` for your app
- Provide a URL to install the app on your development store
- Open a browser window for authentication

### Step 4: Install on Your Store

1. Follow the URL provided by the CLI
2. Log in to your Shopify Partner account
3. Select your development store
4. Click "Install app"

### Step 5: Add to Your Theme

1. Go to **Online Store > Themes** in your Shopify admin
2. Click **Customize** on your active theme
3. Navigate to any **Collection page**
4. Click **Add block** (usually in the left sidebar)
5. Under **Apps**, select **Infinite Scroll**
6. The app will automatically:
   - Find your theme's product grid
   - Hide the pagination
   - Add infinite scroll behavior
7. Configure optional settings (see below)
8. Click **Save**

**That's it!** Your theme's existing filters, sorting, and product display will all work automatically with infinite scroll.

## ⚙️ Configuration Options

All settings are available in the Shopify Theme Editor:

### **📖 How It Works**
- Info panel explaining the app automatically finds and enhances your theme's grid

### **Scroll Behavior**
- **Enable Auto Scroll** (default: ON)
  - Automatically load more products when scrolling to bottom
- **Show Load More Button** (default: OFF)
  - Display manual button instead of auto-scroll
  - Overrides auto-scroll if enabled

### **URL & SEO**
- **Update URL While Scrolling** (default: OFF)
  - Add page numbers to URL (e.g., `/collections/all?page=2`)
  - Good for SEO and bookmarking
  - Enables browser back/forward navigation

### **Button Text**
- **Load More Button Text** (default: "Load More Products")
  - Text for the load more button (if enabled)
- **Loading Text** (default: "Loading...")
  - Text shown while fetching new products

### **End Message**
- **Show End Message** (default: ON)
  - Display message when all products loaded
- **End Message Text** (default: "You've viewed all products")
  - Customize the end-of-collection message

### **Styling (Optional)**
- **Enable Custom Colors** (default: OFF)
  - Override default button/loader colors
- **Button Background Color** (default: #000000)
- **Button Text Color** (default: #ffffff)
- **Loader Color** (default: #000000)

**Note:** If custom styling is disabled, the app uses your theme's default button styles

## 📁 File Structure

```
shopify-infinite-scroll/
├── package.json                         # Dependencies and scripts
├── shopify.app.toml                     # App configuration
├── README.md                            # This file
├── MIGRATION-GUIDE.md                   # Migration guide (old → new approach)
└── extensions/
    └── infinite-scroll-theme/
        ├── shopify.extension.toml       # Extension config
        ├── assets/
        │   └── infinite-scroll.js       # Theme detection + scroll logic (580 lines)
        ├── blocks/
        │   └── infinite-scroll.liquid   # Settings only (180 lines)
        └── locales/
            └── en.default.json          # Translations
```

**Backup files** (old custom grid approach in `backups/` directory):
- `backups/infinite-scroll.liquid.backup` - Old custom grid HTML (473 lines)
- `backups/infinite-scroll.js.backup` - Old grid-specific JS (303 lines)
- `backups/infinite-scroll.css.backup` - Old CSS file (335 lines)

## 🔧 How It Works

### **1. Theme Detection (Automatic)**

On page load, the JavaScript automatically:

```javascript
// Step 1: Detect if we're on a collection page
✓ Check body class, URL, or data attributes

// Step 2: Find the product grid
✓ Try 13 different selectors (Dawn, Debut, Brooklyn, etc.)
✓ Falls back gracefully if theme is custom

// Step 3: Find pagination
✓ Locate "next page" link
✓ Hide default pagination

// Step 4: Setup infinite scroll
✓ Add Intersection Observer
✓ Create load more button (if enabled)
✓ Listen for filter/sort changes
```

### **2. Loading Products**

```javascript
// When user scrolls near bottom:
1. Fetch next page URL (includes all filters/sort params)
2. Parse HTML response
3. Extract products from theme's grid
4. Append to existing grid
5. Update product count (if theme has one)
6. Update URL (if enabled)
7. Find next "next page" link
8. Repeat until no more products
```

### **3. Filter & Sort Integration**

```javascript
// Filters/sorting work automatically because:
- Theme's filters update the URL
- Theme reloads the grid with filtered products
- Our JS detects the change and reinitializes
- Infinite scroll continues with new filter params

// Listen for filter updates:
✓ Facets form changes
✓ Sort dropdown changes
✓ Custom theme events ('facets:updated')
```

### **4. Technical Architecture**

| Technology | Purpose |
|-----------|---------|
| **Intersection Observer API** | Efficient scroll detection |
| **Fetch API** | AJAX product loading |
| **DOM Parser** | Extract products from HTML |
| **History API** | Update URL without reload (optional) |
| **Event System** | Analytics integration (`infinitescroll:loaded`) |
| **Theme Selectors** | Auto-detect grid/pagination |

### **5. Supported Themes**

The app detects these patterns (and more):

```javascript
Product Grids:
✓ #product-grid              (Dawn, Sense)
✓ #ProductGridContainer      (Debut)
✓ .collection-products       (Brooklyn)
✓ .product-list             (Prestige)
✓ .collection__products     (Empire)
✓ .grid--uniform            (Venture)
✓ ... and custom themes via fallbacks

Pagination:
✓ <a rel="next">            (Standard)
✓ .pagination__item--next   (Dawn)
✓ .next a                   (Generic)
✓ Links with "next", "›", "→"
```

## Deployment to Production

### Option 1: Deploy to Your Own Store

```bash
npm run deploy
```

This deploys the app extension to your connected Shopify store.

### Option 2: Submit to Shopify App Store

1. Complete all app requirements (privacy policy, support email, etc.)
2. Test thoroughly on multiple stores and themes
3. Run `shopify app deploy --production`
4. Submit for review through your Partner dashboard
5. Wait for Shopify's approval

### App Store Requirements

- App listing content (title, description, screenshots)
- Privacy policy URL
- Support contact information
- Pricing plan configuration
- App testing and quality assurance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Fallback**: Older browsers without Intersection Observer API can still use the manual "Load More" button.

## Performance Considerations

- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Efficient Detection**: Intersection Observer is more performant than scroll events
- **Minimal DOM Queries**: Caches element references
- **Debouncing**: Built-in protection against duplicate requests
- **Lightweight**: Minimal CSS and JavaScript footprint

## Troubleshooting

### App Not Showing in Theme Editor

- Ensure you've installed the app on your store
- Verify your theme is Online Store 2.0 compatible
- Check that the extension is enabled in the theme editor

### Products Not Loading

- Open browser console to check for errors
- Verify collection has more than one page of products
- Check that pagination is properly configured
- Ensure JavaScript is enabled in the browser

### Styling Conflicts

- The CSS is scoped to avoid conflicts
- Check for theme-specific overrides
- Use browser DevTools to inspect element styles

### CLI Issues

```bash
# Reset Shopify CLI
shopify logout
shopify login

# Clear cache
rm -rf node_modules
npm install
```

## Customization

### Modify Loader Style

Edit `extensions/infinite-scroll-theme/assets/infinite-scroll.css`:

```css
.infinite-scroll-spinner {
  /* Customize spinner appearance */
  border-color: your-color;
}
```

### Change Grid Layout

Modify the grid template in the CSS file:

```css
.infinite-scroll-products {
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
}
```

### Add Custom Events

Listen for infinite scroll events in your theme:

```javascript
document.addEventListener('infinitescroll:loaded', (event) => {
  console.log('Loaded', event.detail.productsLoaded, 'products');
  // Add analytics tracking here
});
```

## Analytics Integration

The app fires a custom event when products are loaded:

```javascript
// Google Analytics example
document.addEventListener('infinitescroll:loaded', (event) => {
  gtag('event', 'infinite_scroll', {
    'page': event.detail.page,
    'products_loaded': event.detail.productsLoaded
  });
});
```

## Testing Checklist

- [ ] Products load automatically when scrolling
- [ ] "Load More" button works correctly
- [ ] Loading indicator appears during fetch
- [ ] URL updates as pages load
- [ ] Browser back/forward buttons work
- [ ] Mobile responsive design
- [ ] Last page handled gracefully
- [ ] Error states display properly
- [ ] Works with different product counts
- [ ] Compatible with your theme's design

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review Shopify's [Theme App Extension documentation](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
3. Open an issue in this repository

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for commercial purposes.

## Acknowledgments

- Inspired by [Scroll Bee](https://apps.shopify.com/scroll-bee)
- Built with Shopify CLI and Theme App Extensions
- Uses modern web APIs (Intersection Observer, Fetch, History)

## Roadmap

Potential future enhancements:
- [ ] Support for search results pages
- [ ] Blog post infinite scroll
- [ ] Advanced filtering integration
- [ ] Loading placeholder skeletons
- [ ] Multiple language support
- [ ] Analytics dashboard
- [ ] A/B testing features
- [ ] Customizable animations

---

Made with ❤️ for Shopify merchants
