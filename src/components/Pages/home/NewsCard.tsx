'use client';
import { useNews } from '@/hooks/useNews';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import styles from './NewsCard.module.scss';

export default function NewsCard() {
  const { data: newsData, isLoading } = useNews();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading || !isVisible || !newsData?.news) {
    return null;
  }

  const { title, description } = newsData.news;

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
      onClick={handleClick}
    >
      <div className={styles.iconBox}>
        <span className={styles.icon}>!</span>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.body}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}