import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { HomeSection, useHomeSectionStore } from '../../../store/homeSectionStore';
import styles from './Hero.module.scss';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useHomeSectionStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(HomeSection.HERO);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [setCurrentSection]);

  return (
    <section ref={sectionRef} className={styles.container}>
      <div className={styles.gridBackground} />
      <div className={styles.content}>
        <Image className={styles.logo} src="/images/logo.svg" alt="Logo" width={800} height={400} style={{ marginBottom: 24 }} />
      </div>
      <div className={styles.sunContainer}>
        <Image className={styles.sun} src="/images/striped_sun.svg" alt="Sun" width={100} height={100} />
      </div>
    </section>
  );
}
