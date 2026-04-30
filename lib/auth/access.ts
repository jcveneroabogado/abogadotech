import type { User } from '@supabase/supabase-js';
import type { createClient as createSupabaseServerClient } from '@/lib/supabase/server';
import type {
  AccessDeniedReason,
  AccessValidationResult,
  ProfileRecord,
  SessionAccessResult,
} from '@/lib/auth/types';

type ServerSupabaseClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

const EXPIRED_ACCESS_MESSAGE = 'Tu acceso ha expirado';

function isProfileRecord(value: unknown): value is ProfileRecord {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === 'string' &&
    typeof record.email === 'string' &&
    typeof record.is_active === 'boolean' &&
    (typeof record.trial_start_date === 'string' || record.trial_start_date === null) &&
    (typeof record.trial_end_date === 'string' || record.trial_end_date === null)
  );
}

function parseDate(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

export function getExpiredAccessMessage() {
  return EXPIRED_ACCESS_MESSAGE;
}

export function getDeniedLoginPath(reason: AccessDeniedReason = 'expired') {
  const searchParams = new URLSearchParams({ reason });
  return `/login?${searchParams.toString()}`;
}

export function validateProfileAccess(profile: ProfileRecord): AccessValidationResult {
  const trialEndDate = parseDate(profile.trial_end_date);

  if (!profile.is_active || !trialEndDate) {
    return {
      status: 'denied',
      reason: 'expired',
      message: EXPIRED_ACCESS_MESSAGE,
    };
  }

  if (Date.now() > trialEndDate.getTime()) {
    return {
      status: 'denied',
      reason: 'expired',
      message: EXPIRED_ACCESS_MESSAGE,
    };
  }

  return {
    status: 'allowed',
    profile,
  };
}

export async function getProfileByUserId(
  supabase: ServerSupabaseClient,
  userId: string,
): Promise<ProfileRecord | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, trial_start_date, trial_end_date, is_active')
    .eq('id', userId)
    .maybeSingle();

  if (error || !isProfileRecord(data)) {
    return null;
  }

  return data;
}

export async function getUserAccess(
  supabase: ServerSupabaseClient,
  user: User,
): Promise<SessionAccessResult> {
  const profile = await getProfileByUserId(supabase, user.id);

  if (!profile) {
    return {
      status: 'denied',
      user: {
        id: user.id,
        email: user.email ?? null,
      },
      reason: 'expired',
      message: EXPIRED_ACCESS_MESSAGE,
    };
  }

  const validation = validateProfileAccess(profile);

  if (validation.status === 'denied') {
    return {
      status: 'denied',
      user: {
        id: user.id,
        email: user.email ?? null,
      },
      reason: validation.reason,
      message: validation.message,
    };
  }

  return {
    status: 'allowed',
    user: {
      id: user.id,
      email: user.email ?? null,
    },
    profile: validation.profile,
  };
}

export async function getSessionAccess(
  supabase: ServerSupabaseClient,
): Promise<SessionAccessResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: 'anonymous',
    };
  }

  return getUserAccess(supabase, user);
}
