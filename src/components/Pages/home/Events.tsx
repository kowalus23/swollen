import { useEffect, useRef } from 'react';
import { useNavigationStore } from '../../../store/navigationStore';
import MapComponent from '../../Map/Map';
import styles from './Events.module.scss';

export default function Events() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { setDarkNavigation } = useNavigationStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 500) {
        if (mapContainerRef.current) {
          const rect = mapContainerRef.current.getBoundingClientRect();
          if (rect.top <= 30 && rect.bottom > 40) {
            setDarkNavigation(true);
          } else {
            setDarkNavigation(false);
          }
        }
      } else {
        setDarkNavigation(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setDarkNavigation]);

  return (
    <section id="events" className={styles.eventsSection}>
      <div className={styles.gridBackground} />
      <h1 className={styles.title}>EVENTS</h1>
      <div ref={mapContainerRef} className={styles.mapContainer}>
        <MapComponent />
      </div>
    </section>
  );
}
