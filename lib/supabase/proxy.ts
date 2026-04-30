import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSessionAccess } from '@/lib/auth/access';
import { supabaseEnv } from '@/lib/supabase/env';

const authRoutes = ['/login'];
const protectedRoutes = ['/dashboard', '/modulos'];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAuthPath(pathname: string) {
  return authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const sessionAccess = await getSessionAccess(supabase);

  if (sessionAccess.status === 'anonymous' && isProtectedPath(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.search = '';
    redirectUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (sessionAccess.status === 'denied') {
    await supabase.auth.signOut();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.search = '';
    redirectUrl.searchParams.set('reason', sessionAccess.reason);

    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(redirectUrl);
    }

    if (isAuthPath(pathname) && request.nextUrl.searchParams.get('reason') !== sessionAccess.reason) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (sessionAccess.status === 'allowed' && isAuthPath(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    redirectUrl.searchParams.delete('next');
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
