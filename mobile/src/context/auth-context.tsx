import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import { clearSession, loadSession, saveSession, Session } from '@/lib/session';

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession()
      .then(setSession)
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (username: string, password: string) => {
    const nextSession = await apiRequest<Session>('/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    await saveSession(nextSession);
    setSession(nextSession);
  };

  const signOut = async () => {
    await clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider.');
  return context;
}
