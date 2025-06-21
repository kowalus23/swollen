import { Button } from '@/components/Button';
import { useNewCollection } from '@/hooks/useNewCollection';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { HomeSection, useHomeSectionStore } from '../../../store/homeSectionStore';
import styles from './PreviewItems.module.scss';

export default function PreviewItems() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useHomeSectionStore();
  const { data: newCollection, isLoading } = useNewCollection();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(HomeSection.PREVIEW_ITEMS);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [setCurrentSection]);

  if (isLoading || !newCollection || newCollection.hideSection) {
    return (
      <section ref={sectionRef} id="aktualnosci" className={styles.previewItemsSection}>
        {/* Section is hidden or loading */}
      </section>
    );
  }

  const shouldHideAdditionalDescription = () => {
    if (newCollection.hideAdditionalDescriptionAt && newCollection.hideAdditionalDescription) {
      const hideDate = new Date(newCollection.hideAdditionalDescriptionAt);
      return new Date() >= hideDate;
    }
    return false;
  };

  return (
    <section ref={sectionRef} id="aktualnosci" className={styles.previewItemsSection}>
      <div className={styles.previewItemsGridBackground} />
      <div className={styles.previewItemsBackground} />
      <div className={styles.previewItemsContainer}>
        {user?.email && (
          <div className={styles.previewItemsImages}>
            <Image
              src={newCollection.previewImages[0]}
              alt={`New collection preview`}
              width={500}
              height={500}
              className={styles.image}
            />
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
        {user?.email && (
          <div className={styles.previewItemsImages}>
            <Image
              src={newCollection.previewImages[1]}
              alt={`New collection preview`}
              width={500}
              height={500}
              className={styles.image}
            />
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