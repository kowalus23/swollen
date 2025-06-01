import { news } from '@/resources/news.json';
import styles from './Hero.module.scss';
import NewsCard from './NewsCard';

export default function Hero() {
  const { title, description } = news;
  return (
    <section className={styles.container}>
      <div className={styles.gridBackground} />
      <div className={styles.content}>
        <h1 className={styles.title}>HOME</h1>
        <NewsCard />
      </div>
    </section>
  );
}
