import Image from 'next/image';
import styles from './Hero.module.scss';
import NewsCard from './NewsCard';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.gridBackground} />
      <div className={styles.content}>
        <Image className={styles.logo} src="/images/logo.svg" alt="Logo" width={555} height={281} style={{ marginBottom: 24 }} />
        <NewsCard />
      </div>
      <div className={styles.sunContainer}>
        <Image className={styles.sun} src="/images/striped_sun.svg" alt="Sun" width={100} height={100} />
      </div>
    </section>
  );
}
