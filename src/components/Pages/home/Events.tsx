import { Button } from '@/components/Button/Button';
import Image from 'next/image';

import { useEventData } from '@/hooks/useEventData';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useNavigationStore } from '../../../store/navigationStore';
import MapComponent from '../../Map/Map';
import styles from './Events.module.scss';

export default function Events() {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { setDarkNavigation } = useNavigationStore();
  const user = useUserStore((state) => state.user);
  const { eventData, isLoading, error } = useEventData();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                className={styles.registerButton} variant='outline'
                onClick={() => {
                  router.push('/logowanie');
                }}
              >
                ZALOGUJ SIĘ
              </Button>
            </div>
          ) : (
            <div className={styles.infoDetails}>
              <h3>{eventData?.title || 'DROP EVENT DETAILS'}</h3>
              <p>
                {eventData?.description || 'W okolicy centrum Warszawy, możesz znaleźć nasze naklejki QR, które otwierają nam stronę z informacjami o kolejnym dropie.'}
              </p>
            </div>
          )}
        </div>
        <div ref={mapContainerRef} className={styles.mapContainer}>
          <MapComponent
            center={eventData?.pin ? [eventData.pin.latitude, eventData.pin.longitude] : undefined}
            zoom={eventData?.pin?.startZoom}
            radius={eventData?.radiusInKm}
          />
        </div>

        <div className={styles.decorationImageContainer}>
          <Image className={styles.decorationImage} src="/images/arrow-up-image.png" alt="Sun" width={115} height={103} />
        </div>

        <div className={styles.decoration2ImageContainer}>
          <Image className={styles.decorationImage} src="/images/biceps-image.png" alt="Sun" width={150} height={170} />
        </div>

        <div className={styles.decoration3ImageContainer}>
          <Image className={styles.decorationImage} src="/images/progress-biceps-image.png" alt="Sun" width={353} height={26} />
        </div>

        <div className={styles.decoration4ImageContainer}>
          <Image className={styles.decorationImage} src="/images/progress-bar-image.png" alt="Sun" width={255} height={26} />
        </div>

      </div>
    </section>
  );
}
