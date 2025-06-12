import MapComponent from '../../Map/Map';
import styles from './Events.module.scss';

export default function Events() {
  return (
    <section className={styles.eventsSection}>
      <div className={styles.gridBackground} />
      <h1 className={styles.title}>EVENTS</h1>
      <div className={styles.mapContainer}>
        <MapComponent />
      </div>
    </section>
  );
}
