import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadataBase = new URL("https://ajay-pathak.com");
export const metadata: Metadata = {
  title: "Ajay Pathak — Frontend Engineer | React & Next.js Portfolio",
  applicationName: "Ajay Pathak Portfolio",
  description:
    "Ajay Pathak is a frontend engineer building high-performance React and Next.js applications, microfrontend systems, and developer-first UI products.",
  keywords: [
    "Ajay Pathak",
    "frontend engineer",
    "React developer",
    "Next.js portfolio",
    "microfrontends",
    "UI engineering",
    "React Native",
    "module federation",
    "TypeScript",
    "web performance",
  ],
  authors: [{ name: "Ajay Pathak", url: "https://ajay-pathak.com" }],
  creator: "Ajay Pathak",
  publisher: "Ajay Pathak",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_TOKEN || "",
  },
  alternates: {
    canonical: "/",
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Ajay Pathak — Frontend Engineer | React & Next.js Portfolio",
    description:
      "Frontend engineer building high-performance React and Next.js applications, microfrontend systems, and developer-first UI products.",
    url: "https://ajay-pathak.com/",
    siteName: "Ajay Pathak",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/cover.png",
        alt: "Ajay Pathak portfolio preview",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Pathak — Frontend Engineer",
    description:
      "Frontend engineer building high-performance React and Next.js applications, microfrontend systems, and developer-first UI products.",
    images: ["/cover.png"],
    creator: "@Pathkbndhu_navo",
    site: "@Pathkbndhu_navo",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ajay Pathak",
  },
  category: "technology",
};

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Ajay Pathak" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://ajay-pathak.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="prefetch" href="https://www.googletagmanager.com/gtag/js" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                  });
                `,
              }}
            />
            <Script
              id="web-vitals-ga4"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  if (typeof window !== 'undefined' && 'web-vital' in window) {
                    const vitals = window['web-vital'];
                    vitals.getCLS(metric => gtag('event', 'page_view', {metric_cls: metric.value}));
                    vitals.getFID(metric => gtag('event', 'page_view', {metric_fid: metric.value}));
                    vitals.getFCP(metric => gtag('event', 'page_view', {metric_fcp: metric.value}));
                    vitals.getLCP(metric => gtag('event', 'page_view', {metric_lcp: metric.value}));
                    vitals.getTTFB(metric => gtag('event', 'page_view', {metric_ttfb: metric.value}));
                  }
                  if (window.requestIdleCallback) {
                    requestIdleCallback(() => {
                      const perfData = window.performance.timing;
                      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                      if (pageLoadTime > 0) {
                        gtag('event', 'page_load_time', {
                          value: pageLoadTime,
                          event_category: 'performance',
                        });
                      }
                    });
                  }
                `,
              }}
            />
            <Script
              id="error-tracking-ga4"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.addEventListener('error', (event) => {
                    gtag('event', 'exception', {
                      description: event.message + ' ' + event.filename + ':' + event.lineno,
                      fatal: false,
                    });
                  });
                  window.addEventListener('unhandledrejection', (event) => {
                    gtag('event', 'exception', {
                      description: 'Unhandled Promise Rejection: ' + event.reason,
                      fatal: false,
                    });
                  });
                `,
              }}
            />
          </>
        )}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Ajay Pathak",
                url: "https://ajay-pathak.com",
                email: "engineering.ajaypathak@gmail.com",
                sameAs: [
                  "https://www.linkedin.com/in/ajay-pathak-developer/",
                  "https://github.com/ap221882",
                  "https://x.com/Pathkbndhu_navo",
                ],
                jobTitle: "Frontend Developer",
                description:
                  "Frontend engineer building high-performance React and Next.js applications, microfrontend systems, and developer-first UI products.",
                knowsAbout: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Microfrontends",
                  "Module Federation",
                  "Web Performance",
                  "UI Engineering",
                  "React Native",
                  "Web3",
                ],
                worksFor: {
                  "@type": "Organization",
                  name: "Freelance / Remote",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Ajay Pathak",
                url: "https://ajay-pathak.com",
                logo: "https://ajay-pathak.com/cover.png",
                description:
                  "Frontend engineer building high-performance React and Next.js applications",
                sameAs: [
                  "https://www.linkedin.com/in/ajay-pathak-developer/",
                  "https://github.com/ap221882",
                  "https://x.com/Pathkbndhu_navo",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Professional Inquiry",
                  email: "engineering.ajaypathak@gmail.com",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Ajay Pathak Portfolio",
                url: "https://ajay-pathak.com",
                author: {
                  "@type": "Person",
                  name: "Ajay Pathak",
                },
                sameAs: [
                  "https://www.linkedin.com/in/ajay-pathak-developer/",
                  "https://github.com/ap221882",
                  "https://x.com/Pathkbndhu_navo",
                ],
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://ajay-pathak.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://ajay-pathak.com",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Frontend Development & Consulting",
                provider: {
                  "@type": "Person",
                  name: "Ajay Pathak",
                  url: "https://ajay-pathak.com",
                },
                areaServed: "Worldwide",
                availableLanguage: "en",
                serviceType: [
                  "React Development",
                  "Next.js Development",
                  "Web Performance Optimization",
                  "Microfrontend Architecture",
                  "UI Engineering",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "SpecialtyArea",
                name: "Frontend Development",
                description:
                  "Expert in React, Next.js, TypeScript, and modern web technologies",
                keywords: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Microfrontends",
                  "Module Federation",
                  "Web Performance",
                  "UI Engineering",
                  "React Native",
                ],
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <div style={{ width: "100vw", height: "100%", position: "relative" }}>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            storageKey="theme"
            defaultTheme="dark"
          >
            <div className="flex h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
              <div className="relative mx-auto w-full flex-1">
                {/* <Header /> */}
                {children}
                {/* <Footer /> */}
              </div>
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
