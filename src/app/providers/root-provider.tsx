'use client';

import { type ReactNode } from 'react';
import { QueryProvider } from './query-provider';

interface RootProviderProps {
    children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
} 