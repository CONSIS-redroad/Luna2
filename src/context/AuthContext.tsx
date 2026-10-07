// PATH: src/context/AuthContext.tsx | VERSION: 2.1.0 | REQ-ID: AUTH-CTX-01
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { UserProfile } from '../types/auth';
import { getActiveUser, switchUserProfile, createGuestSession } from '../services/mockAuthService';

interface AuthContextValue {
  user: UserProfile;
  switchProfile: (id: string) => void;
  createGuest: (name?: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => getActiveUser());

  const handleSwitch = useCallback((id: string) => {
    const next = switchUserProfile(id);
    setUser(next);
  }, []);

  const handleGuest = useCallback((name?: string) => {
    const next = createGuestSession(name);
    setUser(next);
  }, []);

  const value = useMemo(() => ({
    user,
    switchProfile: handleSwitch,
    createGuest: handleGuest,
  }), [user, handleSwitch, handleGuest]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
