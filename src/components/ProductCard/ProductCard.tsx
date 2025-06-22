import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Product } from '../../hooks/useProducts';
import { Button } from '../Button';
import Input from '../Input';
import Modal from '../Modal/Modal';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

interface AddressForm {
  email: string;
  phone: string;
  postalCode: string;
  street: string;
  city: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressForm>({
    email: '',
    phone: '',
    postalCode: '',
    street: '',
    city: ''
  });

  const handleInputChange = (field: keyof AddressForm, value: string) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChangeEvent = (field: keyof AddressForm) => (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(field, e.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSize(null);
    setAddressForm({
      email: '',
      phone: '',
      postalCode: '',
      street: '',
      city: ''
    });
  };

  const isFormValid = () => {
    return selectedSize &&
      addressForm.email &&
      addressForm.phone &&
      addressForm.postalCode &&
      addressForm.street &&
      addressForm.city;
  };

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
        onClose={handleCloseModal}
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

            {/* Size Selection */}
            <div className={styles.sizeSection}>
              <h4>Wybierz rozmiar:</h4>
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
            </div>

            {/* Address Form - Only show after size is selected */}
            {selectedSize && (
              <div className={styles.addressSection}>
                <h4>Dane dostawy:</h4>
                <div className={styles.formGrid}>
                  <Input
                    type="email"
                    label="Email*"
                    value={addressForm.email}
                    onChange={handleInputChangeEvent('email')}
                    placeholder="Twój email"
                    required
                  />

                  <Input
                    type="tel"
                    label="Telefon*"
                    value={addressForm.phone}
                    onChange={handleInputChangeEvent('phone')}
                    placeholder="Twój numer telefonu"
                    required
                  />

                  <Input
                    type="text"
                    label="Kod pocztowy*"
                    value={addressForm.postalCode}
                    onChange={handleInputChangeEvent('postalCode')}
                    placeholder="00-000"
                    required
                  />

                  <Input
                    type="text"
                    label="Ulica i numer*"
                    value={addressForm.street}
                    onChange={handleInputChangeEvent('street')}
                    placeholder="Ulica i numer domu"
                    required
                  />

                  <Input
                    type="text"
                    label="Miasto*"
                    value={addressForm.city}
                    onChange={handleInputChangeEvent('city')}
                    placeholder="Miasto"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              className={styles.button}
              disabled={!isFormValid()}
              onClick={() => {
                // Handle order submission here
                console.log('Order submitted:', {
                  product: product.name,
                  size: selectedSize,
                  address: addressForm
                });
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