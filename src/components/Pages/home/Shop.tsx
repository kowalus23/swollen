import Image from 'next/image';
import { useProducts } from '../../../hooks/useProducts';
import ProductCard from '../../ProductCard/ProductCard';
import styles from './Shop.module.scss';

export default function Shop() {

  const { data, isLoading, error } = useProducts();

  return (
    <section id="sklep" className={styles.shopSection}>
      <div className={styles.shopGridBackground} />
      <h2 className={styles.title}>SKLEP</h2>
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