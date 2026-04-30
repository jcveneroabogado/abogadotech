import { SignOutButton } from '@/components/layout/sign-out-button';

type AppHeaderProps = {
  email: string;
};

export function AppHeader({ email }: AppHeaderProps) {
  return (
    <header
      style={{
        borderBottom: '1px solid #d1d5db',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div>
          <strong>Abogado Tech</strong>
          <p style={{ margin: '4px 0 0', color: '#4b5563' }}>{email}</p>
        </div>
        <SignOutButton />
      </div>
    </header>
  );
}
