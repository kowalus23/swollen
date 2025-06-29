'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input/Input';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from '../login/LoginHero.module.scss';

const schema = z.object({
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
  confirmPassword: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła muszą być identyczne',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export function ChangePasswordHero() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    setError('');
    setSuccess(false);
    const { error } = await supabase.auth.updateUser({ password: formData.password });
    if (error) {
      setError(error.message || 'Wystąpił błąd podczas zmiany hasła.');
    } else {
      setSuccess(true);
      reset();
      setTimeout(() => {
        router.push('/logowanie');
      }, 2500);
    }
  };

  return (
    <div className={styles.loginWindow}>
      <Image className={styles.logo} src="/images/logo.svg" alt="Logo" width={800} height={400} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputCustomBorder} />
        <Input
          label="NOWE HASŁO"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          label="POWTÓRZ NOWE HASŁO"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
        {!success && (
          <div className={styles.successMessage}>Hasło zostało zmienione! Za chwilę nastąpi przekierowanie do logowania.</div>
        )}
        <Button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'ZMIENIAM...' : 'ZMIEŃ HASŁO'}
        </Button>
      </form>
    </div>
  );
} 