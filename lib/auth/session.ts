import { redirect } from 'next/navigation';
import { getDeniedLoginPath, getSessionAccess as resolveSessionAccess } from '@/lib/auth/access';
import { createClient } from '@/lib/supabase/server';

export async function getSessionUser() {
  const supabase = await createClient();
  const sessionAccess = await resolveSessionAccess(supabase);

  if (sessionAccess.status !== 'allowed') {
    return null;
  }

  return sessionAccess.user;
}

export async function requireActiveSession() {
  const supabase = await createClient();
  const sessionAccess = await resolveSessionAccess(supabase);

  if (sessionAccess.status === 'anonymous') {
    redirect('/login');
  }

  if (sessionAccess.status === 'denied') {
    redirect(getDeniedLoginPath(sessionAccess.reason));
  }

  return sessionAccess;
}
