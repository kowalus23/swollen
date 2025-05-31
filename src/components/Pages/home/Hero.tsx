import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HOME</h1>
      <p className={styles.description}>This is the home page.</p>
    </div>
  );
}
