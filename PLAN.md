# Zola Registry Integration Plan

## Overview
Integrate a Zola wedding registry embed into the Next.js 14 wedding site while maintaining the luxury dark aesthetic.

**Registry URL:** https://www.zola.com/registry/saronandyonatan
**Registry Key:** `saronandyonatan`

---

## Tasks

### 1. Create Feature Branch
```bash
git checkout -b feature/zola-registry
```

---

### 2. Create Registry Page (`src/app/registry/page.tsx`)

Create a new page that:
- Uses the existing `Section` and `FadeIn` components
- Displays a serif "Registry" heading in `text-wedding-gold`
- Embeds the Zola widget using `next/script` with `strategy="afterInteractive"`
- Wraps the embed in a semi-transparent container with `backdrop-blur`

**Zola Embed Snippet:**
```html
<div class="zola-registry-embed" data-registry-key="saronandyonatan"></div>
<script async src="https://widget.zola.com/js/widget.js"></script>
```

**File: `src/app/registry/page.tsx`**
```tsx
'use client';

import Script from 'next/script';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';

export default function RegistryPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <Section className="py-20 px-4">
        {/* Back to home link */}
        <FadeIn className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-wedding-gold transition-colors font-serif text-sm"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </FadeIn>

        {/* Page heading */}
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wedding-gold text-center mb-4">
            Registry
          </h1>
          <p className="font-serif text-white/70 text-center max-w-xl mx-auto mb-12">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at Zola.
          </p>
        </FadeIn>

        {/* Zola Embed Container */}
        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-8">
            <div
              className="zola-registry-embed"
              data-registry-key="saronandyonatan"
            />
          </div>
        </FadeIn>
      </Section>

      {/* Zola Widget Script - loads after page is interactive */}
      <Script
        src="https://widget.zola.com/js/widget.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
```

---

### 3. Update FloatingNav (`src/components/FloatingNav.tsx`)

The current nav uses hash links (`#section`) for single-page scrolling. We need to:
- Add a "Registry" nav item that links to `/registry`
- Modify the click handler to allow external page links (not just hash scrolling)

**Changes:**
1. Add a `GiftIcon` SVG component
2. Add Registry to `NAV_ITEMS` with `href: '/registry'`
3. Update `handleClick` to detect page links vs hash links

**Updated NAV_ITEMS:**
```tsx
const NAV_ITEMS = [
  { label: 'Home', href: '#', icon: HomeIcon },
  { label: 'Story', href: '#story', icon: BookIcon },
  { label: 'Venue', href: '#venue', icon: MapPinIcon },
  { label: 'RSVP', href: '#rsvp', icon: EnvelopeIcon },
  { label: 'Registry', href: '/registry', icon: GiftIcon },
];
```

**Updated click handler:**
```tsx
const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Allow normal navigation for page links
  if (!href.startsWith('#')) {
    return; // Let the browser handle it normally
  }

  e.preventDefault();
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
```

**New GiftIcon component:**
```tsx
function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13" />
      <path d="M3 12h18" />
      <path d="M19 8c0-1.7-1.3-4-4-4-1.4 0-2.6 1.3-3 2.5C11.6 5.3 10.4 4 9 4c-2.7 0-4 2.3-4 4" />
    </svg>
  );
}
```

---

### 4. Add CSP Headers for Zola (`next.config.mjs`)

The Zola widget requires loading scripts and iframes from `*.zola.com`. Add security headers in `next.config.mjs`:

**Updated `next.config.mjs`:**
```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'foxezhxncpzzpbemdafa.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/registry',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.zola.com https://*.zola.com",
              "frame-src https://*.zola.com https://widget.zola.com",
              "style-src 'self' 'unsafe-inline' https://*.zola.com",
              "img-src 'self' data: https://*.zola.com https://*.cloudfront.net",
              "connect-src 'self' https://*.zola.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### 5. Update Middleware (Optional)

The current `middleware.ts` handles password protection. No CSP changes needed there since we're handling CSP in `next.config.mjs`. However, ensure `/registry` is accessible after login (it already will be since it's not in `excludedPaths`).

---

## File Summary

| File | Action |
|------|--------|
| `src/app/registry/page.tsx` | **Create** - New registry page |
| `src/components/FloatingNav.tsx` | **Edit** - Add Registry link + GiftIcon |
| `next.config.mjs` | **Edit** - Add CSP headers for Zola |

---

## Testing Checklist

- [ ] Registry page renders with gold heading
- [ ] Zola widget loads and displays registry items
- [ ] Back link navigates to home page
- [ ] FloatingNav shows Registry link
- [ ] Registry link works from home page
- [ ] No CSP errors in browser console
- [ ] Mobile responsive layout works
- [ ] Backdrop blur effect visible on embed container
