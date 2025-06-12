import styles from './PreviewItems.module.scss';

export default function PreviewItems() {
  return (
    <section className={styles.previewItemsSection}>
      <div className={styles.previewItemsGridBackground} />
      <h2 className={styles.title}>PODGLĄD PRODUKTÓW</h2>
    </section>
  );
} 