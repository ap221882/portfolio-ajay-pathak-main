/**
 * Performance Optimization Hints
 * Automatically injected into all pages for better performance monitoring
 */

export const performanceHints = {
  // Critical resources to preload
  preload: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap',
      as: 'style',
      importance: 'high',
    },
  ],

  // Resources to prefetch (lower priority)
  prefetch: [
    {
      href: 'https://www.googletagmanager.com/gtag/js',
      as: 'script',
    },
    {
      href: 'https://cdn.jsdelivr.net',
      as: 'fetch',
    },
  ],

  // DNS prefetch for external services
  dnsPrefetch: [
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ],

  // Preconnect to critical origins
  preconnect: [
    {
      href: 'https://fonts.googleapis.com',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://www.googletagmanager.com',
    },
  ],
};

/**
 * Web Vitals thresholds for monitoring
 * Used by performance tracking script
 */
export const webVitalsThresholds = {
  LCP: 2500, // Largest Contentful Paint (good: <2.5s)
  FID: 100,  // First Input Delay (good: <100ms)
  CLS: 0.1,  // Cumulative Layout Shift (good: <0.1)
  TTFB: 600, // Time to First Byte (good: <600ms)
  FCP: 1800, // First Contentful Paint (good: <1.8s)
};

/**
 * Performance budgets for monitoring
 */
export const performanceBudgets = {
  maxPageLoadTime: 3000, // 3 seconds
  maxBundleSize: 500000, // 500KB
  maxImageSize: 100000,  // 100KB per image
};
