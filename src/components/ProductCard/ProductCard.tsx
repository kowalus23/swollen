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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSelectedSize(null);
      setSubmitStatus('idle');
      setErrorMessage('');
      setAddressForm({
        email: '',
        phone: '',
        postalCode: '',
        street: '',
        city: ''
      });
    }
  };

  const isFormValid = () => {
    return selectedSize &&
      addressForm.email &&
      addressForm.phone &&
      addressForm.postalCode &&
      addressForm.street &&
      addressForm.city;
  };

  const handleOrderSubmit = async () => {
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.name,
          productSize: selectedSize,
          addressCity: addressForm.city,
          addressPostalCode: addressForm.postalCode,
          addressStreet: addressForm.street,
          contactEmail: addressForm.email,
          contactPhone: addressForm.phone,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Close modal after 2 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Wystąpił błąd podczas składania zamówienia.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd.');
    } finally {
      setIsSubmitting(false);
    }
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />

                  <Input
                    type="tel"
                    label="Telefon*"
                    value={addressForm.phone}
                    onChange={handleInputChangeEvent('phone')}
                    placeholder="Twój numer telefonu"
                    required
                    disabled={isSubmitting}
                  />

                  <Input
                    type="text"
                    label="Kod pocztowy*"
                    value={addressForm.postalCode}
                    onChange={handleInputChangeEvent('postalCode')}
                    placeholder="00-000"
                    required
                    disabled={isSubmitting}
                  />

                  <Input
                    type="text"
                    label="Ulica i numer*"
                    value={addressForm.street}
                    onChange={handleInputChangeEvent('street')}
                    placeholder="Ulica i numer domu"
                    required
                    disabled={isSubmitting}
                  />

                  <Input
                    type="text"
                    label="Miasto*"
                    value={addressForm.city}
                    onChange={handleInputChangeEvent('city')}
                    placeholder="Miasto"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '1px solid #c3e6cb'
              }}>
                ✅ Zamówienie zostało złożone pomyślnie! Wysłaliśmy potwierdzenie na Twój email.
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '1px solid #f5c6cb'
              }}>
                ❌ {errorMessage}
              </div>
            )}

            <Button
              className={styles.button}
              disabled={!isFormValid() || isSubmitting}
              onClick={handleOrderSubmit}
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'SKŁADANIE ZAMÓWIENIA...' : 'ZAMÓW'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
} 