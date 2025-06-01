import LoginHero from '@/components/Pages/login/LoginHero';
import styles from './page.module.scss';

export default function Login() {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className={styles.container}>
      <LoginHero />
    </div>
  );
} 