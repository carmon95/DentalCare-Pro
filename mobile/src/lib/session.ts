import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SESSION_KEY = 'dentalcare.mobile.session';

export type Session = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'DOCTOR' | 'ASSISTANT';
  };
};

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }

    return SecureStore.getItemAsync(key);
  },

  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }

    return SecureStore.setItemAsync(key, value);
  },

  removeItem: async (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }

    return SecureStore.deleteItemAsync(key);
  },
};


export const loadSession = async (): Promise<Session | null> => {
  const storedSession = await storage.getItem(SESSION_KEY);

  return storedSession
    ? (JSON.parse(storedSession) as Session)
    : null;
};


export const saveSession = (session: Session) =>
  storage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );


export const clearSession = () =>
  storage.removeItem(SESSION_KEY);