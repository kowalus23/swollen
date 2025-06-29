import { ChangePasswordHero } from '@/components/Pages/change-password/ChangePasswordHero';
import styles from '../logowanie/page.module.scss';

export default function ChangePasswordPage() {
  return (
    <div className={styles.container}>
      <ChangePasswordHero />
    </div>
  );
} 