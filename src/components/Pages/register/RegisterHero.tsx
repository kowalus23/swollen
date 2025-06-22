'use client';

import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import styles from './RegisterHero.module.scss';

const schema = z.object({
  name: z.string().min(1, 'Imię jest wymagane'),
  email: z.string().email('Podaj poprawny e-mail'),
  emailConfirm: z.string().email('Podaj poprawny e-mail'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
  passwordConfirm: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
  phone: z.string().optional(),
  somethingElse: z.string().optional(),
}).refine((data) => data.email === data.emailConfirm, {
  message: "E-maile nie są identyczne",
  path: ["emailConfirm"],
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Hasła nie są identyczne",
  path: ["passwordConfirm"],
});

type FormData = z.infer<typeof schema>;

// Function to translate Supabase error messages to Polish
const translateError = (errorCode: string, message: string): string => {
  switch (errorCode) {
    case 'user_already_registered':
      return 'Użytkownik z tym adresem e-mail już istnieje';
    case 'invalid_email':
      return 'Nieprawidłowy adres e-mail';
    case 'weak_password':
      return 'Hasło jest zbyt słabe';
    case 'too_many_requests':
      return 'Zbyt wiele prób rejestracji. Spróbuj ponownie później';
    default:
      return message || 'Wystąpił błąd podczas rejestracji';
  }
};

export default function RegisterHero() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          extra: formData.somethingElse,
        }
      }
    })

    if (error) {
      const translatedError = translateError(error.code || '', error.message);
      setError(translatedError);
    } else {
      toast.success('Konto zostało utworzone! Wiadomość aktywacyjna została wysłana na podany adres e-mail.', {
        duration: 8000,
      });
      router.push('/logowanie')
    }
  };

  return (
    <>
      <div className={styles.extraImage}>
        <Image className={styles.extraImageImage} src="/images/register-corner-image.png" alt="background" width={250} height={250} />
      </div>
      <div className={styles.loginWindow}>
        <Image className={styles.logo} src="/images/register-title.png" alt="Logo" width={640} height={80} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputCustomBorder} />
          <Input
            label="IMIĘ"
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="E-MAIL"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Powtórz e-mail"
            type="email"
            {...register('emailConfirm')}
            error={errors.emailConfirm?.message}
          />
          <div className={styles.inputRow}>
            <Input
              label="HASŁO"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              label="Powtórz hasło"
              type="password"
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message}
            />
          </div>

          <div className={styles.inputRow}>
            <Input
              label="Telefon"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Coś jeszcze ???"
              type="text"
              {...register('somethingElse')}
              error={errors.somethingElse?.message}
            />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <ButtonStripe type="submit" disabled={isSubmitting} className={styles.button}>
            ZAREJESTRUJ
          </ButtonStripe>
        </form>
        <div className={styles.footer}>
          <Link href="/logowanie">WRÓĆ DO LOGOWANIA</Link>
          <Link href="/">WRÓĆ DO STRONY GŁÓWNEJ</Link>
        </div>
      </div>
      {isSubmitting && <LoadingSpinner />}
    </>
  );
} 