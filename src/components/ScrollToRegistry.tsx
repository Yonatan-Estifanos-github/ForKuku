'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrollToRegistry() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRedirected.current) {
            hasRedirected.current = true;
            router.push('/registry');
          }
        });
      },
      { threshold: 0.5 }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const scripture = document.getElementById('scripture');
      if (scripture) observer.observe(scripture);
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [router]);

  return null;
}
