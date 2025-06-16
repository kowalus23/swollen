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
            ZOBACZ KOLEKCJĘ
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
      </div>
    </section>
  );
} 