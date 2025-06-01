import LoginHero from '@/components/Pages/login/LoginHero';
import styles from './page.module.scss';

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginHero />
    </div>
  );
} 