// PATH: src/hooks/useFirebaseAuth.ts | VERSION: 1.2.0 | REQ-ID: FB-AUTH-01
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../services/firebase';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error("Google Auth failed:", e);
    }
  };

  const loginWithApple = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (e) {
      console.error("Apple Auth failed:", e);
    }
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.error("Guest Auth failed:", e);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, loginWithGoogle, loginWithApple, loginAsGuest, logout };
}
