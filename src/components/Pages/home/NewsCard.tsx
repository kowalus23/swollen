import styles from './NewsCard.module.scss';

export default function NewsCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>AKTUALIZACJA</span>
        <span className={styles.iconBox}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="32" height="32" rx="2" stroke="#F6BA00" strokeWidth="2" fill="none" />
            <text x="50%" y="60%" textAnchor="middle" fill="#F6BA00" fontSize="28" fontWeight="bold" dy=".3em">!</text>
          </svg>
        </span>
      </div>
      <div className={styles.body}>
        <p>
          NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY! NOWA KOLEKCJA JUŻ W SPRZEDAŻY!
        </p>
      </div>
    </div>
  );
}