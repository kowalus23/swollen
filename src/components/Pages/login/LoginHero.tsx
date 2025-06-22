'use client';

import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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

// Function to translate Supabase error messages to Polish
const translateError = (errorCode: string, message: string): string => {
  switch (errorCode) {
    case 'email_not_confirmed':
      return 'Konto musi być aktywowane, wiadomość aktywacyjna została wysłana na podany adres e-mail';
    case 'invalid_credentials':
      return 'Nieprawidłowy e-mail lub hasło';
    case 'user_not_found':
      return 'Użytkownik nie został znaleziony';
    case 'too_many_requests':
      return 'Zbyt wiele prób logowania. Spróbuj ponownie później';
    default:
      return message || 'Wystąpił błąd podczas logowania';
  }
};

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
      const translatedError = translateError(error.code || '', error.message);
      setError(translatedError);
    } else {
      router.push('/')
    }
  };

  return (
    <div className={styles.loginWindow}>
      <Image className={styles.logo} src="/images/logo.svg" alt="Logo" width={800} height={400} />
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
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        <ButtonStripe type="submit" disabled={isSubmitting} className={styles.button}>
          WEJDŹ DO SYSTEMU
        </ButtonStripe>
      </form>
      <div className={styles.links}>
        <Link href="/rejestracja">ZAREJESTRUJ SIĘ</Link>
        <Link href="/rejestracja">NIE PAMIĘTASZ HASŁA?</Link>
      </div>
      <div className={styles.footer}>
        <Link href="/">WRÓĆ DO STRONY GŁÓWNEJ</Link>
      </div>
    </div>
  );
} 