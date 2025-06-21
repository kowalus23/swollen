'use client';

import { supabase } from '@/lib/supabase';
import { HomeSection, useHomeSectionStore } from '@/store/homeSectionStore';
import { useUserStore } from '@/store/userStore';
import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { ArrowUpToLine, Calendar, List, Shirt } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNavigationStore } from '../../store/navigationStore';
import { Button } from '../Button';
import NewsCard from '../Pages/home/NewsCard';
import styles from './Navigation.module.scss';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  onClick?: () => void;
}

export const Navigation = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<HomeSection>(HomeSection.HERO);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { darkNavigation } = useNavigationStore();
  const { currentSection, setCurrentSection } = useHomeSectionStore();

  console.log(currentSection);


  const isLoginPage = pathname.includes('/logowanie');
  const isRegisterPage = pathname.includes('/rejestracja');

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 500px)').matches);
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);

    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);


  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Navigation items
  const navItems: NavItem[] = [
    {
      icon: <ArrowUpToLine size={24} />,
      label: 'Strona główna',
      id: 'top',
      onClick: () => {
        if (pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/');
        }
      }
    },
    {
      icon: <Shirt size={24} />,
      label: 'Sklep',
      id: 'sklep',
      onClick: () => {
        scrollToSection('sklep');
      }
    },
    {
      icon: <Calendar size={24} />,
      label: 'Events',
      id: 'events',
      onClick: () => {
        scrollToSection('events');
      }
    },
    {
      icon: <List size={24} />,
      label: 'Aktualności',
      id: 'aktualnosci',
      onClick: () => {
        scrollToSection('aktualnosci');
      }
    },
  ];

  return (
    <aside className={`${styles.navigation} ${isLoginPage || isRegisterPage ? styles.hidden : ''}`}>
      <div className={styles.navigationContainer}>
        <NewsCard />
        <div className={styles.container}>
          <div className={styles.navItems}>
            {navItems.map((item) => {
              const { refs, floatingStyles } = useFloating({
                placement: 'right',
                middleware: [offset(12), shift(), flip()],
              });
              const isActive = activeSection === item.id;
              const iconColor = hovered === item.id || isActive ? '#ffbf00' : darkNavigation ? '#000' : '#fff';
              return (
                <div key={item.id} className={styles.navItem}>
                  <button
                    ref={refs.setReference}
                    onClick={item.onClick}
                    onMouseEnter={() => {
                      if (isDesktop) {
                        setActiveTooltip(item.label);
                        setHovered(item.id);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isDesktop) {
                        setActiveTooltip(null);
                        setHovered(null);
                      }
                    }}
                    className={styles.button}
                    style={{ color: iconColor }}
                  >
                    {item.icon}
                  </button>
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
        <div className={styles.loginContainer}>
          {user?.email ? (
            <Button
              variant="outline"
              className={[styles.loginButton, darkNavigation && styles.darkNavigation].join(' ')}
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                router.push('/');
              }}
            >
              Wyloguj się
            </Button>
          ) : (
            <Button
              variant="outline"
              className={[styles.loginButton, darkNavigation && styles.darkNavigation].join(' ')}
              onClick={() => {
                router.push('/logowanie');
              }}
            >
              Wejdź do systemu
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}; 