import RegisterHero from '@/components/Pages/register/RegisterHero';
import styles from './page.module.scss';

export default function Register() {
  return (
    <div className={styles.container}>
      <RegisterHero />
    </div>
  );
} 