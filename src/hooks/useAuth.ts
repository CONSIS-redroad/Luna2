// PATH: src/hooks/useAuth.ts | VERSION: 2.1.0 | REQ-ID: AUTH-HOOK-02
import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { user, switchProfile, createGuest } = useAuthContext();
  return {
    user,
    switchProfile,
    createGuest,
    loginWithGoogle: () => switchProfile('usr_demo_tester'),
    loginAsGuest: () => createGuest(),
    logout: () => switchProfile('usr_local_primary'),
  };
}
