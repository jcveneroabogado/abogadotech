'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/lib/auth/actions';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(async () => {
          await logoutAction();
        });
      }}
      disabled={isPending}
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 6,
        padding: '10px 14px',
        background: '#ffffff',
        cursor: isPending ? 'not-allowed' : 'pointer',
      }}
    >
      {isPending ? 'Saliendo...' : 'Cerrar sesión'}
    </button>
  );
}
