import { Button } from '@/components/Button';
import { useNewCollection } from '@/hooks/useNewCollection';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import styles from './PreviewItems.module.scss';

export default function PreviewItems() {
  const { data: newCollection, isLoading } = useNewCollection();
  const user = useUserStore((state) => state.user);

  if (isLoading || !newCollection || newCollection.hideSection) {
    return (
      <section id="aktualnosci" className={styles.previewItemsSection}>
        <div>Loading...</div>;
      </section>
    )
  }

  const shouldHideAdditionalDescription = () => {
    if (newCollection.hideAdditionalDescriptionAt && newCollection.hideAdditionalDescription) {
      const hideDate = new Date(newCollection.hideAdditionalDescriptionAt);
      return new Date() >= hideDate;
    }
    return false;
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
          <Button className={styles.button} variant='outline'>
            POWIADOM MNIE O PREMIERZE
          </Button>
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
    </section>
  );
} 