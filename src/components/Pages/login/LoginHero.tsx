'use client';

import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './LoginHero.module.scss';

const schema = z.object({
  email: z.string().email('Podaj poprawny e-mail'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

type FormData = z.infer<typeof schema>;

export default function LoginHero() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (fromData: FormData) => {
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: fromData.email,
      password: fromData.password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  };

  if (error) {
    console.log(error)
  }

  return (
    <div className={styles.loginWindow}>
      <h1 className={styles.title}>SWOLLEN KATZ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputCustomBorder} />
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
        <ButtonStripe type="submit" disabled={isSubmitting} className={styles.button}>
          WEJDŹ DO SYSTEMU
        </ButtonStripe>
      </form>
      <div className={styles.footer}>
        <Link href="/rejestracja">ZAREJESTRUJ SIĘ</Link>
        <Link href="/rejestracja">NIE PAMIĘTASZ HASŁA?</Link>
      </div>
    </div>
  );
} 