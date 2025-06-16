import { Button } from '@/components/Button';
import { useNewCollection } from '@/hooks/useNewCollection';
import Image from 'next/image';
import styles from './PreviewItems.module.scss';

export default function PreviewItems() {
  const { data: newCollection, isLoading } = useNewCollection();

  if (isLoading || !newCollection) {
    return null;
  }

  return (
    <section id="aktualnosci" className={styles.previewItemsSection}>
      <div className={styles.previewItemsGridBackground} />
      <div className={styles.previewItemsBackground} />
      <div className={styles.previewItemsContainer}>
        <div className={styles.previewItemsImages}>
          <Image
            src={newCollection.previewImages[0]}
            alt={`New collection preview`}
            width={500}
            height={500}
            className={styles.image}
          />
        </div>
        <div className={styles.previewItemsContent}>
          <h2 className={styles.title}>NOWA KOLEKCJA</h2>
          <p className={styles.description}>
            {newCollection.description}
          </p>
          <p className={styles.additionalDescription}>
            {newCollection.additionalDescription}
          </p>
          <Button className={styles.button} variant='outline'>
            POWIADOM MNIE O PREMIERZE
          </Button>
        </div>
        <div className={styles.previewItemsImages}>
          <Image
            src={newCollection.previewImages[1]}
            alt={`New collection preview`}
            width={500}
            height={500}
            className={styles.image}
          />
        </div>

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