'use client';

import { ButtonHTMLAttributes } from "react";
import styles from "./ButtonStripe.module.scss";

interface ButtonStripeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ButtonStripe = ({ className, children, ...props }: ButtonStripeProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...props}
    >
      <div className={styles.stripesOverlay}>
        <div className={styles.stripes} />
      </div>
      <div className={styles.leftLine} />
      <div className={styles.rightLine} />
      <span className={styles.text}>{children}</span>
    </button>
  );
}; 