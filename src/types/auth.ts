// PATH: src/types/auth.ts | VERSION: 1.3.0 | REQ-ID: AUTH-TYPES-01
export type AuthProviderType = 'google' | 'apple' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: AuthProviderType;
  isAnonymous: boolean;
  createdAt: number;
}
