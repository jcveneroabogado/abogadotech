import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { getExpiredAccessMessage } from '@/lib/auth/access';
import { getSessionUser } from '@/lib/auth/session';

type LoginPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getSessionUser();
  const params = await searchParams;

  if (user) {
    redirect('/dashboard');
  }

  const initialErrorMessage =
    params.reason === 'expired' ? getExpiredAccessMessage() : '';

  return <LoginForm initialErrorMessage={initialErrorMessage} />;
}
