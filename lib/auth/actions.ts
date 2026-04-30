'use server';

import { redirect } from 'next/navigation';
import { getUserAccess } from '@/lib/auth/access';
import { createClient } from '@/lib/supabase/server';

export type LoginFormState = {
  errorMessage: string;
};

function getStringField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  return typeof value === 'string' ? value.trim() : '';
}

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = getStringField(formData, 'email');
  const password = getStringField(formData, 'password');

  if (!email || !password) {
    return {
      errorMessage: 'Debes ingresar tu correo y contrasena.',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      errorMessage: 'No fue posible iniciar sesion. Verifica tus credenciales.',
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      errorMessage: 'No fue posible iniciar sesion. Verifica tus credenciales.',
    };
  }

  const access = await getUserAccess(supabase, user);

  if (access.status === 'denied') {
    await supabase.auth.signOut();

    return {
      errorMessage: access.message,
    };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
