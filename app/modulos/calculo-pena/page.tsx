import { AppHeader } from '@/components/layout/app-header';
import { requireActiveSession } from '@/lib/auth/session';
import { PenaltyCalculatorForm } from '@/app/modulos/calculo-pena/components/penalty-calculator-form';

export default async function CalculoPenaPage() {
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
        <h1 style={{ marginTop: 0 }}>Calculo de Pena</h1>
        <p>Selecciona un delito, marca las condiciones aplicables y calcula la pena estimada.</p>
        <PenaltyCalculatorForm />
      </section>
    </main>
  );
}
