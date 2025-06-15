import { useState } from 'react';
import styles from './Shop.module.scss';

export default function Shop() {

  const [products, setProducts] = useState<any[]>([]);


  return (
    <section className={styles.shopSection}>
      <div className={styles.shopGridBackground} />
      <h2 className={styles.title}>SKLEP</h2>
    </section>
  );
} 