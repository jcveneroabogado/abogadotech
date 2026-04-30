'use client';

import { useActionState } from 'react';
import { loginAction, type LoginFormState } from '@/lib/auth/actions';

type LoginFormProps = {
  initialErrorMessage?: string;
};

export function LoginForm({ initialErrorMessage = '' }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, {
    errorMessage: initialErrorMessage,
  } satisfies LoginFormState);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          padding: 24,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Ingresar</h1>
        <p>Accede a Abogado Tech con tu correo y contrasena.</p>

        <form action={formAction} style={{ display: 'grid', gap: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              style={{
                border: '1px solid #9ca3af',
                borderRadius: 6,
                padding: '10px 12px',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: 8 }}>
            <span>Contrasena</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              minLength={6}
              style={{
                border: '1px solid #9ca3af',
                borderRadius: 6,
                padding: '10px 12px',
              }}
            />
          </label>

          {state.errorMessage ? (
            <p style={{ margin: 0, color: '#b91c1c' }}>{state.errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            style={{
              border: 'none',
              borderRadius: 6,
              padding: '12px 16px',
              background: '#111827',
              color: '#ffffff',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  );
}
