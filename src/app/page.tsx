import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HOME</h1>
      <p className={styles.description}>This is the home page.</p>
    </div>
  );
}
