import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { HomeSection, useHomeSectionStore } from '../../../store/homeSectionStore';
import ProductCard from '../../ProductCard/ProductCard';
import styles from './Shop.module.scss';

export default function Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useHomeSectionStore();
  const { data, isLoading, error } = useProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(HomeSection.SHOP);
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
    <section ref={sectionRef} id="sklep" className={styles.shopSection}>
      <div className={styles.shopGridBackground} />
      <div className={styles.shopTitle}>
        <Image className={styles.titleImage} src="/images/shop-title-image.png" alt="Sun" width={246} height={67} />
      </div>
      <div className={styles.products}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Błąd ładowania produktów</div>}
        {data?.products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className={styles.decorationImageContainer}>
          <Image className={styles.decorationImage} src="/images/face-image.png" alt="Sun" width={100} height={100} />
        </div>
      </div>
    </section>
  );
} 