'use client';

import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './query-provider';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#000',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.9rem',
          },
          success: {
            style: {
              background: 'rgba(167, 146, 40, 0.95)',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#272207',
            }
          },
          error: {
            style: {
              background: 'rgba(220, 53, 69, 0.95)',
              color: '#fff',
            },
          },
        }}
      />
    </QueryProvider>
  );
} 