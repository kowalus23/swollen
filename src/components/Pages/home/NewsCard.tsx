'use client';
import { useNews } from '@/hooks/useNews';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './NewsCard.module.scss';

export default function NewsCard() {
  const [position, setPosition] = useState<'fixed' | 'absolute'>('fixed');
  const cardRef = useRef<HTMLDivElement>(null);
  const { data: newsData, isLoading } = useNews();

  const isVisible = useMemo(() => {
    if (!newsData?.news) return false;

    const { isVisible, isVisibleFromDate, visibilityFromDate, visibilityToDate } = newsData.news;

    if (!isVisible) return false;

    if (!isVisibleFromDate) return true;

    const now = DateTime.now();
    const fromDate = DateTime.fromISO(visibilityFromDate);
    const toDate = DateTime.fromISO(visibilityToDate);

    return now >= fromDate && now <= toDate;
  }, [newsData]);

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

  if (isLoading || !isVisible || !newsData?.news) {
    return null;
  }

  const { title, description } = newsData.news;

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
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>
        <p>{description}</p>
      </div>
    </div>
  );
}