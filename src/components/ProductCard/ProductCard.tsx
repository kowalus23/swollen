import Image from 'next/image';
import { Product } from '../../hooks/useProducts';
import { Button } from '../Button';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <Button
          className={styles.button}
          onClick={() => console.log(product)}
        >
          WYBIERZ ROZMIAR I ZAMÓW
        </Button>
      </div>
    </div>
  );
} 