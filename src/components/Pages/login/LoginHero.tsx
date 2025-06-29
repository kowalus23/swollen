'use client';

import { Button } from '@/components/Button';
import { ButtonStripe } from '@/components/Button/ButtonStripe';
import Input from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
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

const resetSchema = z.object({
  email: z.string().email('Podaj poprawny e-mail'),
});

type FormData = z.infer<typeof schema>;
type ResetFormData = z.infer<typeof resetSchema>;

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

// Function to translate password reset error messages to Polish
const translateResetError = (errorCode: string, message: string): string => {
  switch (errorCode) {
    case 'user_not_found':
      return 'Nie znaleziono użytkownika z tym adresem e-mail';
    case 'too_many_requests':
      return 'Zbyt wiele prób resetowania hasła. Spróbuj ponownie później';
    case 'invalid_email':
      return 'Nieprawidłowy adres e-mail';
    default:
      return message || 'Wystąpił błąd podczas wysyłania linku do resetowania hasła';
  }
};

export default function LoginHero() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isResetting },
    reset: resetForm,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
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

  const onResetSubmit = async (resetData: ResetFormData) => {
    setResetError('');
    setResetSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(resetData.email, {
      redirectTo: `${window.location.origin}/change-password`,
    });

    if (error) {
      const translatedError = translateResetError(error.code || '', error.message);
      setResetError(translatedError);
    } else {
      setResetSuccess(true);
      resetForm();
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccess(false);
      }, 3000);
    }
  };

  const handleResetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResetModal(true);
    setResetError('');
    setResetSuccess(false);
  };

  const closeResetModal = () => {
    if (!isResetting) {
      setShowResetModal(false);
      setResetError('');
      setResetSuccess(false);
      resetForm();
    }
  };

  return (
    <>
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
          <Link href="/rejestracja" onClick={handleResetClick}>NIE PAMIĘTASZ HASŁA?</Link>
        </div>
        <div className={styles.footer}>
          <Link href="/">WRÓĆ DO STRONY GŁÓWNEJ</Link>
        </div>
      </div>

      <Modal
        isOpen={showResetModal}
        onClose={closeResetModal}
        title="Resetowanie hasła"
      >
        {!resetSuccess ? (
          <>
            <p className={styles.modalDescription}>
              Podaj swój adres e-mail, a wyślemy Ci link do resetowania hasła.
            </p>
            <form onSubmit={handleSubmitReset(onResetSubmit)} className={styles.resetForm}>
              <Input
                label="E-MAIL"
                type="email"
                {...registerReset('email')}
                error={resetErrors.email?.message}
              />
              {resetError && (
                <div className={styles.errorMessage}>
                  {resetError}
                </div>
              )}
              <div className={styles.modalButtons}>
                <Button
                  variant="outline"
                  onClick={closeResetModal}
                  disabled={isResetting}
                  className={styles.cancelButton}
                >
                  ANULUJ
                </Button>
                <Button
                  type="submit"
                  disabled={isResetting}
                  className={styles.resetButton}
                >
                  {isResetting ? 'WYSYŁANIE...' : 'WYŚLIJ LINK'}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <p>✅ Link do resetowania hasła został wysłany na podany adres e-mail.</p>
            <p>Sprawdź swoją skrzynkę i kliknij w link, aby ustawić nowe hasło.</p>
          </div>
        )}
      </Modal>
    </>
  );
} 