'use client';

import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { ArrowUpToLine, Calendar, List, Shirt } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Navigation.module.scss';

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
    <aside className={styles.navigation}>
      <div className={styles.navigationContainer}>
        <div className={styles.container}>
          <div className={styles.navItems}>
            {navItems.map((item) => {
              const { refs, floatingStyles } = useFloating({
                placement: 'right',
                middleware: [offset(12), shift(), flip()],
              });
              const isActive = (item.href && pathname === item.href) || (item.id === 'top' && pathname === '/');
              return (
                <div key={item.id} className={styles.navItem}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      ref={refs.setReference}
                      onMouseEnter={() => { setActiveTooltip(item.label); setHovered(item.id); }}
                      onMouseLeave={() => { setActiveTooltip(null); setHovered(null); }}
                      className={styles.link}
                      style={{ color: hovered === item.id || isActive ? '#ffbf00' : '#fff' }}
                    >
                      {item.icon}
                    </Link>
                  ) : (
                    <button
                      ref={refs.setReference}
                      onClick={item.onClick}
                      onMouseEnter={() => { setActiveTooltip(item.label); setHovered(item.id); }}
                      onMouseLeave={() => { setActiveTooltip(null); setHovered(null); }}
                      className={styles.button}
                      style={{ color: hovered === item.id || isActive ? '#ffbf00' : '#fff' }}
                    >
                      {item.icon}
                    </button>
                  )}
                  {activeTooltip === item.label && (
                    <div
                      ref={refs.setFloating}
                      style={floatingStyles}
                      className={styles.tooltip}
                    >
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.indicator} />
        </div>
      </div>
    </aside>
  );
}; 