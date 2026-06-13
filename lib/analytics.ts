// Conversion tracking utilities for GA4

declare function gtag(...args: any[]): void;

export const trackConversion = (conversionType: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
      ...data,
    });
  }
};

export const trackCTAClick = (ctaName: string, ctaLink?: string) => {
  trackConversion('cta_click', {
    cta_name: ctaName,
    cta_link: ctaLink || 'direct',
  });
};

export const trackExternalLink = (url: string) => {
  trackConversion('external_link_click', {
    external_url: url,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
};

export const trackProjectView = (projectName: string, projectId?: string) => {
  trackConversion('project_view', {
    project_name: projectName,
    project_id: projectId || projectName.toLowerCase().replace(/\s+/g, '_'),
  });
};

export const trackScroll = (scrollDepth: number) => {
  trackConversion('scroll_depth', {
    depth_percentage: scrollDepth,
  });
};

// Auto-track unhandled rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: `Unhandled rejection: ${event.reason}`,
        fatal: false,
      });
    }
  });
}
