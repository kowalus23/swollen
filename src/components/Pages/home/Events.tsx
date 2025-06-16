import { Button } from '@/components/Button/Button';
import { useUserStore } from '@/store/userStore';
import { useEffect, useRef } from 'react';
import { useNavigationStore } from '../../../store/navigationStore';
import MapComponent from '../../Map/Map';
import styles from './Events.module.scss';

export default function Events() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { setDarkNavigation } = useNavigationStore();
  const user = useUserStore((state) => state.user);

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
      <div className={styles.content}>
        <div className={styles.info}>
          {!user?.email ? (
            <div className={styles.infoRegister}>
              <h3>REGISTER TO FOLLOW NEXT DROP</h3>
              <p>
                Aby móc zobaczyć informacje o kolejnym dropie, musisz się zarejestrować.
              </p>
              <Button
                className={styles.registerButton} variant='outline'>
                ZAREJESTRUJ SIĘ
              </Button>
            </div>
          ) : (
            <div className={styles.infoDetails}>
              <h3>DROP EVENT DETAILS</h3>
              <p>
                W okolicy centrum Warszawy, możesz znaleźć nasze naklejki QR, które otwierają nam stronę z informacjami o kolejnym dropie.
              </p>
            </div>
          )}
        </div>
        <div ref={mapContainerRef} className={styles.mapContainer}>
          <MapComponent />
        </div>
      </div>
    </section>
  );
}
