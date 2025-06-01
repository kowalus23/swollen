'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './NewsCard.module.scss';

export default function NewsCard() {
  const [position, setPosition] = useState<'fixed' | 'absolute'>('fixed');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const heroHeight = 1080 - window.innerHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= heroHeight) {
        setPosition('absolute');
      } else {
        setPosition('fixed');
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={{
        position,
      }}
    >
      <div className={styles.iconBox}>
        <span className={styles.icon}>!</span>
      </div>
      <div className={styles.header}>
        <span className={styles.title}>AKTUALIZACJA</span>
      </div>
      <div className={styles.body}>
        <p>
          NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY!
        </p>
      </div>
    </div>
  );
}