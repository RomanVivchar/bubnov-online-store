import { useEffect, useState } from 'react';
import { blink } from '@/lib/blink';
import type { BlinkUser } from '@blinkdotnew/sdk';

export interface UserProfile {
  id: string;
  userId: string;
  telegram?: string;
  bonuses: number;
  displayName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<BlinkUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      setUser(state.user);
      setLoading(state.isLoading);

      if (state.user) {
        // Fetch profile
        try {
          const profiles = await blink.db.profiles.list({
            where: { userId: state.user.id },
            limit: 1,
          });
          if (profiles.length > 0) {
            setProfile(profiles[0] as unknown as UserProfile);
          } else {
            // Create default profile
            const newProfile = await blink.db.profiles.create({
              userId: state.user.id,
              bonuses: 0,
              displayName: state.user.displayName || '',
            });
            setProfile(newProfile as unknown as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = (email: string, pass: string) => blink.auth.signInWithEmail(email, pass);
  const signup = (data: any) => blink.auth.signUp(data);
  const logout = () => blink.auth.signOut();

  return { user, loading, profile, login, signup, logout };
}
