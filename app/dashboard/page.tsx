import Link from 'next/link';
import { AppHeader } from '@/components/layout/app-header';
import { requireActiveSession } from '@/lib/auth/session';

export default async function DashboardPage() {
  const session = await requireActiveSession();

  return (
    <main>
      <AppHeader email={session.user.email ?? ''} />
      <section
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '32px 24px',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>
        <p>Bienvenido a Abogado Tech.</p>
        <p>Tu sesion esta activa y el sistema valida acceso con profiles.</p>
        <div
          style={{
            marginTop: 24,
            padding: 16,
            border: '1px solid #d1d5db',
            borderRadius: 6,
            background: '#ffffff',
            maxWidth: 420,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>Modulo disponible</h2>
          <p style={{ marginTop: 0 }}>Calculo de Pena</p>
          <Link
            href="/modulos/calculo-pena"
            style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '10px 14px',
              borderRadius: 6,
              background: '#111827',
              color: '#ffffff',
            }}
          >
            Abrir calculadora
          </Link>
        </div>
      </section>
    </main>
  );
}
