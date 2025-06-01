'use client';

import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './LoginHero.module.scss';

const schema = z.object({
  email: z.string().email('Podaj poprawny e-mail'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

type FormData = z.infer<typeof schema>;

export default function LoginHero() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle login logic here
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className={styles.loginWindow}>
      <h1 className={styles.title}>SWOLLEN KATZ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="E-MAIL"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="HASŁO"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <ButtonStripe type="submit" disabled={isSubmitting}>
          WEJDŹ DO SYSTEMU
        </ButtonStripe>
      </form>
    </div>
  );
} 