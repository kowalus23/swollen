'use client';

import { ArrowUpToLine, List, Shirt, Calendar } from 'lucide-react';
import { useFloating, offset, shift, flip } from '@floating-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  href?: string;
  onClick?: () => void;
}

export const Navigation = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Navigation items
  const navItems: NavItem[] = [
    {
      icon: <ArrowUpToLine size={32} />, label: 'Top', id: 'top',
      onClick: () => {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/');
        }
      }
    },
    { icon: <List size={32} />, label: 'Aktualności', id: 'aktualnosci', href: '/aktualnosci' },
    { icon: <Shirt size={32} />, label: 'Sklep', id: 'sklep', href: '/sklep' },
    { icon: <Calendar size={32} />, label: 'Events', id: 'events', href: '/events' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full z-50 flex flex-col justify-center items-center" style={{ width: 100 }}>
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        <div className="flex flex-col items-center justify-center space-y-10 w-full">
          {navItems.map((item) => {
            const { refs, floatingStyles } = useFloating({
              placement: 'right',
              middleware: [offset(12), shift(), flip()],
            });
            const isActive = (item.href && pathname === item.href) || (item.id === 'top' && pathname === '/');
            return (
              <div key={item.id} className="relative w-full flex justify-center w-fit">
                {item.href ? (
                  <Link
                    href={item.href}
                    ref={refs.setReference}
                    onMouseEnter={() => { setActiveTooltip(item.label); setHovered(item.id); }}
                    onMouseLeave={() => { setActiveTooltip(null); setHovered(null); }}
                    className="transition-colors w-fit"
                    style={{ color: hovered === item.id || isActive ? '#FFD600' : '#fff' }}
                  >
                    {item.icon}
                  </Link>
                ) : (
                  <button
                    ref={refs.setReference}
                    onClick={item.onClick}
                    onMouseEnter={() => { setActiveTooltip(item.label); setHovered(item.id); }}
                    onMouseLeave={() => { setActiveTooltip(null); setHovered(null); }}
                    className="transition-colors bg-transparent border-none outline-none"
                    style={{ color: hovered === item.id || isActive ? '#FFD600' : '#fff', cursor: 'pointer' }}
                  >
                    {item.icon}
                  </button>
                )}
                {activeTooltip === item.label && (
                  <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="bg-yellow-600 text-black px-3 py-1 rounded text-sm shadow-lg whitespace-nowrap absolute z-50"
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute right-0 top-0 h-full" style={{ width: 3, background: '#FFD600' }} />
      </div>
    </aside>
  );
}; 