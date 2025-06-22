import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { useNewCollection } from '@/hooks/useNewCollection';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { useState } from 'react';
import styles from './PreviewItems.module.scss';

export default function PreviewItems() {
  const { data: newCollection, isLoading } = useNewCollection();
  const user = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (isLoading || !newCollection || newCollection.hideSection) {
    return (
      <section id="aktualnosci" className={styles.previewItemsSection}>
        <div>Loading...</div>;
      </section>
    )
  }

  const shouldHideAdditionalDescription = () => {
    if (newCollection.campaignStartAt) {
      const campaignStartDate = new Date(newCollection.campaignStartAt);
      return new Date() >= campaignStartDate;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/campaign-reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          campaignName: newCollection.campaingName,
          campaignStartAt: newCollection.campaignStartAt,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while subscribing.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setEmail('');
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section id="aktualnosci" className={styles.previewItemsSection}>
      <div className={styles.previewItemsGridBackground} />
      <div className={styles.previewItemsBackground} />
      <div className={styles.previewItemsContainer}>
        {user?.email ? (
          <div className={styles.previewItemsImages}>
            <Image
              src={newCollection.previewImages[0]}
              alt={`New collection preview`}
              width={500}
              height={500}
              className={styles.image}
            />
          </div>
        ) : (
          <div className={styles.previewItemsImages}>
            <p className={styles.previewItemsImagesText}>
              Zaloguj się, aby zobaczyć więcej
            </p>
          </div>
        )}
        <div className={styles.previewItemsContent}>
          <div className={styles.previewItemsTitle}>
            <Image className={styles.titleImage} src="/images/new-collection-title-image.png" alt="title" width={523} height={69} />
          </div>
          <p className={styles.description}>
            {newCollection.description}
          </p>
          {!shouldHideAdditionalDescription() && (
            <p className={styles.additionalDescription}>
              {newCollection.additionalDescription}
            </p>
          )}
          {!shouldHideAdditionalDescription() && (
            <Button
              className={styles.button}
              variant='outline'
              onClick={() => setIsModalOpen(true)}
            >
              POWIADOM MNIE O PREMIERZE
            </Button>
          )}
        </div>
        {user?.email ? (
          <div className={styles.previewItemsImages}>
            <Image
              src={newCollection.previewImages[1]}
              alt={`New collection preview`}
              width={500}
              height={500}
              className={styles.image}
            />
          </div>
        ) : (
          <div className={styles.previewItemsImages}>
            <p className={styles.previewItemsImagesText}>
              Zaloguj się, aby zobaczyć więcej
            </p>
          </div>
        )}

        <div className={styles.decorationImageContainer}>
          <Image className={styles.decorationImage} src="/images/fine-hand-image.png" alt="Sun" width={66} height={58} />
        </div>

        <div className={styles.decoration2ImageContainer}>
          <Image className={styles.decorationImage} src="/images/cat-image.png" alt="Sun" width={127} height={115} />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Powiadom mnie o premierze"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ margin: 0, color: '#666' }}>
            Wprowadź swój adres email, aby otrzymać powiadomienie o premierze nowej kolekcji.
          </p>

          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            placeholder="twoj@email.com"
            disabled={isSubmitting}
          />

          {submitStatus === 'success' && (
            <p style={{ color: 'green', margin: 0, fontSize: '14px' }}>
              Dziękujemy! Zostałeś dodany do listy powiadomień.
            </p>
          )}

          {submitStatus === 'error' && (
            <p style={{ color: 'red', margin: 0, fontSize: '14px' }}>
              {errorMessage}
            </p>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outline"
              onClick={handleModalClose}
              disabled={isSubmitting}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!email.trim()}
            >
              Wyślij
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
} 