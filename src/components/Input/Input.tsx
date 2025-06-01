'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input ref={ref} className={`${styles.input} ${className || ''}`} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 