import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.gridBackground} />
      <h1 className={styles.title}>HOME</h1>
    </div>
  );
}
