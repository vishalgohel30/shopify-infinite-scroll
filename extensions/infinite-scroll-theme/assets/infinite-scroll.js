/**
 * Shopify Infinite Scroll - Theme Integration
 * Enhances existing theme product grids with infinite scroll
 * Works with Dawn, Debut, Brooklyn, Prestige, and other popular themes
 */

class InfiniteScrollThemeEnhancer {
  constructor(settings = {}) {
    // User settings from theme editor
    this.settings = {
      autoScroll: settings.autoScroll !== false,
      showLoadMore: settings.showLoadMore || false,
      updateUrl: settings.updateUrl || false,
      loadMoreText: settings.loadMoreText || 'Load More Products',
      loadingText: settings.loadingText || 'Loading...',
      endMessage: settings.endMessage || 'No more products',
      showEndMessage: settings.showEndMessage !== false,
      ...settings
    };

    // State
    this.loading = false;
    this.hasMorePages = true;
    this.currentPage = 1;
    this.nextPageUrl = null;

    // DOM elements (will be detected)
    this.productGrid = null;
    this.pagination = null;
    this.facetsForm = null;

    // Initialize
    this.init();
  }

  init() {
    console.log('🔄 Infinite Scroll: Initializing...');

    // Detect theme structure
    if (!this.detectTheme()) {
      console.warn('⚠️ Infinite Scroll: Could not detect product grid. Theme may not be supported.');
      return;
    }

    console.log('✅ Infinite Scroll: Theme detected successfully');

    // Get initial next page URL
    this.nextPageUrl = this.getNextPageUrl();
    this.hasMorePages = !!this.nextPageUrl;

    if (!this.hasMorePages) {
      console.log('ℹ️ Infinite Scroll: No more pages to load');
      return;
    }

    // Hide default pagination
    this.hidePagination();

    // Create our controls
    this.createControls();

    // Optimize initial page images with lazy loading
    this.optimizeImages(this.productGrid);

    // Setup infinite scroll or load more button
    if (this.settings.autoScroll && !this.settings.showLoadMore) {
      this.setupIntersectionObserver();
      console.log('🔄 Auto-scroll enabled');
    } else if (this.settings.showLoadMore) {
      console.log('🔘 Load More button enabled');
    }

    // Listen for filter/sort changes
    this.setupFilterListener();

    console.log('✅ Infinite Scroll: Initialized successfully');
    console.log('Settings:', this.settings);
  }

  /**
   * Detect theme structure and find product grid
   * Supports: Dawn, Debut, Brooklyn, Prestige, Empire, and more
   */
  detectTheme() {
    // Common product grid selectors (in order of priority)
    const gridSelectors = [
      '#product-grid',                          // Dawn, Sense
      '.product-grid',                          // Many themes
      '#ProductGridContainer',                  // Debut
      '.collection-products',                   // Brooklyn
      '.product-list',                          // Prestige
      '[data-collection-products]',            // Various themes
      '.collection__products',                  // Empire
      '#CollectionProductGrid',                // Minimal
      '.grid--uniform',                         // Venture
      '[id*="product-grid"]',                  // Fallback: any ID with "product-grid"
      '[class*="product-grid"]',               // Fallback: any class with "product-grid"
      '.products-grid',                        // Generic
      '.products'                              // Generic fallback
    ];

    // Try each selector
    for (const selector of gridSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        this.productGrid = element;
        console.log(`✓ Found product grid: ${selector}`);
        break;
      }
    }

    if (!this.productGrid) {
      return false;
    }

    // Find pagination
    const paginationSelectors = [
      '.pagination',
      '[class*="pagination"]',
      '[id*="pagination"]',
      '.pagination-wrapper'
    ];

    for (const selector of paginationSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        this.pagination = element;
        console.log(`✓ Found pagination: ${selector}`);
        break;
      }
    }

    // Find facets form (for filter change detection)
    this.facetsForm = document.querySelector('form.facets') ||
                     document.querySelector('[id*="FacetFilters"]') ||
                     document.querySelector('[data-facets-form]');

    return true;
  }

  /**
   * Get next page URL from pagination
   */
  getNextPageUrl() {
    if (!this.pagination) {
      return null;
    }

    // Look for "next" link in various formats
    const nextLink =
      this.pagination.querySelector('a[rel="next"]') ||
      this.pagination.querySelector('.pagination__item--next a') ||
      this.pagination.querySelector('[aria-label*="Next"]') ||
      this.pagination.querySelector('.next a') ||
      this.pagination.querySelector('a[title*="Next"]') ||
      Array.from(this.pagination.querySelectorAll('a')).find(a =>
        a.textContent.toLowerCase().includes('next') ||
        a.textContent.includes('›') ||
        a.textContent.includes('→')
      );

    return nextLink ? nextLink.href : null;
  }

  /**
   * Hide default pagination
   */
  hidePagination() {
    if (this.pagination) {
      this.pagination.style.display = 'none';
    }
  }

  /**
   * Create infinite scroll controls (loader, button, end message)
   */
  createControls() {
    // Create container
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.className = 'infinite-scroll-controls';
    this.controlsContainer.style.cssText = `
      text-align: center;
      padding: 40px 20px;
      margin-top: 40px;
    `;

    // Create loader
    this.loader = document.createElement('div');
    this.loader.className = 'infinite-scroll-loader';
    this.loader.style.cssText = `
      display: none;
      align-items: center;
      justify-content: center;
      gap: 10px;
    `;
    // Only show text in loader if NOT using load more button (auto-scroll mode)
    const loaderText = this.settings.showLoadMore ? '' : '<span>Loading...</span>';

    this.loader.innerHTML = `
      <div class="spinner" style="
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0,0,0,0.1);
        border-left-color: #000;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      ${loaderText}
    `;

    // Add spinner animation
    if (!document.getElementById('infinite-scroll-spinner-style')) {
      const style = document.createElement('style');
      style.id = 'infinite-scroll-spinner-style';
      style.textContent = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Create load more button (if enabled)
    if (this.settings.showLoadMore) {
      this.loadMoreBtn = document.createElement('button');
      this.loadMoreBtn.type = 'button';
      this.loadMoreBtn.className = 'infinite-scroll-load-more button';
      this.loadMoreBtn.textContent = this.settings.loadMoreText;
      this.loadMoreBtn.style.cssText = `
        padding: 12px 24px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: opacity 0.2s;
      `;
      this.loadMoreBtn.addEventListener('click', () => this.loadMore());
      this.controlsContainer.appendChild(this.loadMoreBtn);
    }

    // Create end message
    if (this.settings.showEndMessage) {
      this.endMessage = document.createElement('div');
      this.endMessage.className = 'infinite-scroll-end-message';
      this.endMessage.textContent = this.settings.endMessage;
      this.endMessage.style.cssText = `
        display: none;
        font-size: 16px;
        color: #666;
      `;
      this.controlsContainer.appendChild(this.endMessage);
    }

    // Append controls after product grid
    this.productGrid.parentElement.appendChild(this.controlsContainer);
    this.controlsContainer.appendChild(this.loader);

    // Create sentinel for intersection observer - must be AFTER the grid
    this.sentinel = document.createElement('div');
    this.sentinel.className = 'infinite-scroll-sentinel';
    this.sentinel.setAttribute('aria-hidden', 'true');

    // Robust styling that works in flex/grid containers
    this.sentinel.style.cssText = `
      display: block !important;
      height: 20px !important;
      min-height: 20px !important;
      width: 100% !important;
      flex: 0 0 20px !important;
      grid-column: 1 / -1 !important;
      pointer-events: none !important;
      visibility: visible !important;
      opacity: 1 !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
    `;

    // Insert sentinel RIGHT AFTER the product grid
    console.log('📍 Product grid:', this.productGrid);
    console.log('📍 Product grid parent:', this.productGrid.parentElement);

    if (this.productGrid.nextSibling) {
      this.productGrid.parentElement.insertBefore(this.sentinel, this.productGrid.nextSibling);
      console.log('📍 Sentinel inserted before next sibling');
    } else {
      this.productGrid.parentElement.appendChild(this.sentinel);
      console.log('📍 Sentinel appended to parent');
    }

    // Debug: Check parent and sentinel styling
    setTimeout(() => {
      const parent = this.sentinel.parentElement;
      const parentStyle = window.getComputedStyle(parent);
      const sentinelStyle = window.getComputedStyle(this.sentinel);
      const rect = this.sentinel.getBoundingClientRect();
      const gridRect = this.productGrid.getBoundingClientRect();

      console.log('🔍 PARENT CONTAINER DEBUG:');
      console.log('  - Element:', parent);
      console.log('  - Display:', parentStyle.display);
      console.log('  - Position:', parentStyle.position);
      console.log('  - Flex-direction:', parentStyle.flexDirection);
      console.log('  - Grid-template:', parentStyle.gridTemplateColumns);
      console.log('  - Height:', parentStyle.height);

      console.log('🔍 PRODUCT GRID DEBUG:');
      console.log('  - Top:', gridRect.top, 'Bottom:', gridRect.bottom, 'Height:', gridRect.height);

      console.log('🔍 SENTINEL DEBUG:');
      console.log('  - Display:', sentinelStyle.display);
      console.log('  - Height:', sentinelStyle.height);
      console.log('  - Min-height:', sentinelStyle.minHeight);
      console.log('  - Width:', sentinelStyle.width);
      console.log('  - Visibility:', sentinelStyle.visibility);
      console.log('  - Position rect:', rect);
      console.log('  - In document:', document.contains(this.sentinel));
    }, 100);
  }

  /**
   * Setup Intersection Observer for auto-scroll
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '500px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('📍 Sentinel visible! Loading:', !this.loading, 'Has more:', this.hasMorePages);
          if (!this.loading && this.hasMorePages) {
            console.log('▶️ Triggering auto-scroll load...');
            this.loadMore();
          }
        }
      });
    }, options);

    this.observer.observe(this.sentinel);
    console.log('👁️ Intersection Observer setup with rootMargin: 500px');
  }

  /**
   * Load more products
   */
  async loadMore() {
    if (this.loading || !this.hasMorePages || !this.nextPageUrl) {
      return;
    }

    this.loading = true;
    this.showLoader();

    try {
      const response = await fetch(this.nextPageUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Find products in the fetched page
      const newProductGrid = this.findProductGrid(doc);

      if (!newProductGrid) {
        throw new Error('Could not find product grid in fetched page');
      }

      const newProducts = Array.from(newProductGrid.children);

      if (newProducts.length === 0) {
        this.hasMorePages = false;
        this.showEndMessage();
        console.log('ℹ️ No more products to load');
      } else {
        // Append new products to existing grid
        const appendedProducts = [];
        newProducts.forEach(product => {
          const clonedProduct = product.cloneNode(true);
          this.productGrid.appendChild(clonedProduct);
          appendedProducts.push(clonedProduct);
        });

        // Optimize images with lazy loading
        appendedProducts.forEach(product => {
          this.optimizeImages(product);
        });

        this.currentPage++;

        // Update URL (optional)
        if (this.settings.updateUrl) {
          this.updateUrl(this.nextPageUrl);
        }

        // Update product count (if exists in theme)
        this.updateProductCount(doc);

        // Get next page URL for subsequent loads
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        const tempPagination = tempContainer.querySelector('.pagination') ||
                              tempContainer.querySelector('[class*="pagination"]');

        if (tempPagination) {
          const tempInstance = Object.create(this);
          tempInstance.pagination = tempPagination;
          this.nextPageUrl = tempInstance.getNextPageUrl();
          this.hasMorePages = !!this.nextPageUrl;
        } else {
          this.hasMorePages = false;
        }

        if (!this.hasMorePages) {
          this.showEndMessage();
        }

        // Trigger custom event for analytics
        this.triggerLoadEvent(newProducts.length);

        console.log(`✓ Loaded ${newProducts.length} more products`);
      }

    } catch (error) {
      console.error('Error loading more products:', error);
      this.showError();
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  /**
   * Find product grid in parsed document (helper for loadMore)
   */
  findProductGrid(doc) {
    const selectors = [
      '#product-grid',
      '.product-grid',
      '#ProductGridContainer',
      '.collection-products',
      '.product-list',
      '[data-collection-products]'
    ];

    for (const selector of selectors) {
      const grid = doc.querySelector(selector);
      if (grid) return grid;
    }

    return null;
  }

  /**
   * Update product count display (if theme has one)
   */
  updateProductCount(doc) {
    const countSelectors = [
      '.product-count',
      '[data-product-count]',
      '.collection-product-count',
      '#ProductCount'
    ];

    for (const selector of countSelectors) {
      const oldCount = document.querySelector(selector);
      const newCount = doc.querySelector(selector);

      if (oldCount && newCount) {
        oldCount.innerHTML = newCount.innerHTML;
        break;
      }
    }
  }

  /**
   * Optimize images with lazy loading for better performance
   */
  optimizeImages(container) {
    const images = container.querySelectorAll('img');
    let optimizedCount = 0;

    images.forEach(img => {
      // Add native lazy loading if not already set
      if (!img.loading || img.loading === 'eager') {
        img.loading = 'lazy';
        optimizedCount++;
      }

      // Add decoding async for better performance
      if (!img.decoding || img.decoding === 'sync') {
        img.decoding = 'async';
      }

      // Handle responsive images (srcset)
      if (!img.srcset && img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }

      // Add fetchpriority low for images below the fold
      if (!img.fetchPriority) {
        img.fetchPriority = 'low';
      }
    });

    if (optimizedCount > 0) {
      console.log(`⚡ Optimized ${optimizedCount} images with lazy loading`);
    }
  }

  /**
   * Show loader
   */
  showLoader() {
    if (this.loader) {
      this.loader.style.display = 'flex';
    }
    if (this.loadMoreBtn) {
      this.loadMoreBtn.disabled = true;
      this.loadMoreBtn.textContent = 'Loading...';
    }
  }

  /**
   * Hide loader
   */
  hideLoader() {
    if (this.loader) {
      this.loader.style.display = 'none';
    }
    if (this.loadMoreBtn) {
      this.loadMoreBtn.disabled = false;
      this.loadMoreBtn.textContent = this.settings.loadMoreText;
    }
  }

  /**
   * Show end message
   */
  showEndMessage() {
    if (this.endMessage) {
      this.endMessage.style.display = 'block';
    }
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display = 'none';
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Show error message
   */
  showError() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.textContent = 'Error loading products. Try again.';
      setTimeout(() => {
        this.loadMoreBtn.textContent = this.settings.loadMoreText;
      }, 3000);
    }
  }

  /**
   * Update URL in browser
   */
  updateUrl(url) {
    if (window.history && window.history.pushState) {
      window.history.pushState({ page: this.currentPage }, '', url);
    }
  }

  /**
   * Listen for filter/sort changes and reload
   */
  setupFilterListener() {
    // Listen for facets form changes (Dawn theme)
    if (this.facetsForm) {
      this.facetsForm.addEventListener('change', () => {
        console.log('ℹ️ Filters changed, resetting infinite scroll...');
      });
    }

    // Listen for custom events from theme filters
    document.addEventListener('facets:updated', () => {
      console.log('ℹ️ Facets updated, reinitializing...');
      // Reinitialize after filter change
      setTimeout(() => {
        this.reinitialize();
      }, 500);
    });

    // Listen for sort dropdown changes
    const sortSelects = document.querySelectorAll('select[name="sort_by"]');
    sortSelects.forEach(select => {
      select.addEventListener('change', () => {
        console.log('ℹ️ Sort changed, resetting...');
      });
    });
  }

  /**
   * Reinitialize after filters/sort change
   */
  reinitialize() {
    // Reset state
    this.loading = false;
    this.hasMorePages = true;
    this.currentPage = 1;

    // Re-detect grid (it might have been replaced)
    this.detectTheme();

    // Get new next page URL
    this.nextPageUrl = this.getNextPageUrl();

    // Hide pagination again
    this.hidePagination();

    // Remove old controls
    if (this.controlsContainer) {
      this.controlsContainer.remove();
    }
    if (this.sentinel) {
      this.sentinel.remove();
    }

    // Recreate controls
    if (this.hasMorePages) {
      this.createControls();
      if (this.settings.autoScroll) {
        this.setupIntersectionObserver();
      }
    }
  }

  /**
   * Trigger custom event for analytics
   */
  triggerLoadEvent(count) {
    const event = new CustomEvent('infinitescroll:loaded', {
      detail: {
        page: this.currentPage,
        productsLoaded: count
      }
    });
    document.dispatchEvent(event);
  }
}

// Auto-initialize on collection pages
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInfiniteScroll);
} else {
  initInfiniteScroll();
}

function initInfiniteScroll() {
  // Check if we're on a collection page
  const isCollectionPage =
    document.body.classList.contains('template-collection') ||
    document.querySelector('[data-section-type="collection-template"]') ||
    window.location.pathname.includes('/collections/');

  if (!isCollectionPage) {
    return;
  }

  // Get settings from data attribute (set by Liquid)
  const settingsElement = document.querySelector('[data-infinite-scroll-settings]');
  let settings = {};

  if (settingsElement) {
    try {
      const settingsValue = settingsElement.getAttribute('data-infinite-scroll-settings');
      settings = settingsValue ? JSON.parse(settingsValue) : {};
    } catch (error) {
      console.error('Error parsing infinite scroll settings:', error);
    }
  }

  // Initialize
  window.infiniteScroll = new InfiniteScrollThemeEnhancer(settings);
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  if (window.infiniteScroll && window.infiniteScroll.settings.updateUrl) {
    window.location.reload();
  }
});
