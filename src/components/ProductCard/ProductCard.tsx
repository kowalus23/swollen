import Image from 'next/image';
import { useState } from 'react';
import { Product } from '../../hooks/useProducts';
import { Button } from '../Button';
import Modal from '../Modal/Modal';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
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
            onClick={() => setIsModalOpen(true)}
          >
            WYBIERZ ROZMIAR I ZAMÓW
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSize(null);
        }}
        title={product.name}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalImage}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className={styles.image}
            />
          </div>
          <div className={styles.modalInfo}>
            <p className={styles.modalDescription}>{product.description}</p>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <Button
                  variant='outline'
                  key={size}
                  className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            <Button
              className={styles.button}
              disabled={!selectedSize}
              onClick={() => {
                // Handle order submission here
                console.log('Order submitted with size:', selectedSize);
              }}
            >
              ZAMÓW
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
} 