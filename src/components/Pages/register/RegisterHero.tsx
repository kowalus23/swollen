'use client';

import { Button } from '@/components/Button';
import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './RegisterHero.module.scss';

const schema = z.object({
  email: z.string().email('Podaj poprawny e-mail'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

type FormData = z.infer<typeof schema>;

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
    <>
      <div className={styles.extraImage}>
        <Image className={styles.extraImageImage} src="/images/register-corner-image.png" alt="background" width={250} height={250} />
      </div>
      <div className={styles.loginWindow}>
        <div className={styles.backButton}>
          <Button variant='outline' className={styles.button} onClick={() => router.push('/')}>
            <ArrowLeft />
          </Button>
        </div>
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

          <ButtonStripe type="submit" disabled={isSubmitting} className={styles.button}>
            ZAREJESTRUJ
          </ButtonStripe>
        </form>
        <div className={styles.footer}>
          <Link href="/logowanie">WRÓĆ DO LOGOWANIA</Link>
        </div>
      </div>
    </>
  );
} 