'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Handle both navigation and page refresh
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    // Handle initial load and refresh
    handleScroll();

    // Handle navigation
    window.addEventListener('popstate', handleScroll);

    return () => {
      window.removeEventListener('popstate', handleScroll);
    };
  }, [pathname]);

  return null;
}; 