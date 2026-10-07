// PATH: src/services/mockAuthService.ts | VERSION: 2.1.0 | REQ-ID: AUTH-SVC-02
import { UserProfile, AuthProviderType } from '../types/auth';

const AUTH_STORAGE_KEY = 'luna_active_user_session_v2';

export const LOCAL_PROFILES: UserProfile[] = [
  {
    id: 'usr_local_primary',
    name: 'Profil Główny',
    email: '',
    avatarUrl: '',
    provider: 'guest',
    isAnonymous: false,
    createdAt: 1700000000000,
  },
  {
    id: 'usr_demo_tester',
    name: 'Profil Testowy (Demo)',
    email: 'tester@luna.local',
    avatarUrl: '',
    provider: 'google',
    isAnonymous: false,
    createdAt: 1700000000000,
  },
];

export function getActiveUser(): UserProfile {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UserProfile;
  } catch {}
  return LOCAL_PROFILES[0];
}

export function switchUserProfile(profileId: string): UserProfile {
  const found = LOCAL_PROFILES.find(p => p.id === profileId) || LOCAL_PROFILES[0];
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found));
  } catch {}
  return found;
}

export function createGuestSession(customName?: string): UserProfile {
  const profile: UserProfile = {
    id: 'usr_guest_' + Math.floor(Math.random() * 10000),
    name: customName || 'Gość (profil lokalny)',
    email: '',
    avatarUrl: '',
    provider: 'guest',
    isAnonymous: true,
    createdAt: Date.now(),
  };
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
  } catch {}
  return profile;
}
