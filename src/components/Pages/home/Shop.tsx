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
      </div>
    </section>
  );
} 