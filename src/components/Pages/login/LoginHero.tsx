'use client';

import { ButtonStripe } from '@/components/Button/ButtonStripe';
import { useRouter } from 'next/navigation';
import styles from './LoginHero.module.scss';

export default function LoginHero() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.loginWindow}>
      <h1 className={styles.title}>Logowanie</h1>
      <ButtonStripe
        onClick={handleClick}
      >
        WEJDŹ DO SYSTEMU
      </ButtonStripe>
    </div>
  );
} 