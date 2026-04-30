export type ProfileRecord = {
  id: string;
  email: string;
  trial_start_date: string | null;
  trial_end_date: string | null;
  is_active: boolean;
};

export type AccessDeniedReason = 'expired';

export type AccessValidationResult =
  | {
      status: 'allowed';
      profile: ProfileRecord;
    }
  | {
      status: 'denied';
      reason: AccessDeniedReason;
      message: string;
    };

export type SessionAccessResult =
  | {
      status: 'anonymous';
    }
  | {
      status: 'allowed';
      user: {
        id: string;
        email: string | null;
      };
      profile: ProfileRecord;
    }
  | {
      status: 'denied';
      user: {
        id: string;
        email: string | null;
      };
      reason: AccessDeniedReason;
      message: string;
    };
