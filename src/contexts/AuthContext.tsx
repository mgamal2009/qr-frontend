import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import api from '../api/axios';
import {jwtDecode} from "jwt-decode";


interface User { id: string; email: string }
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}


const AuthContext = createContext<AuthContextValue>({} as any);
export function useAuth() { return useContext(AuthContext); }

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState<number | null>(null);


  useEffect(() => { (async () => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      try {
        const payload: any = jwtDecode(token);
        setUser({ id: payload.id, email: payload.email });
        scheduleAutoLogout(payload.exp);
      } catch (e) { await SecureStore.deleteItemAsync('token'); }
    }
    setLoading(false);
  })(); }, []);


  function scheduleAutoLogout(exp?: number) {
    if (!exp) return;
    const now = Math.floor(Date.now()/1000);
    const ms = (exp - now) * 1000;
    if (ms <= 0) {
      signOut();
      return;
    }
    if (logoutTimer) clearTimeout(logoutTimer);
    const id = setTimeout(() => signOut(), ms) as unknown as number;
    setLogoutTimer(id);
  }


  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      await SecureStore.setItemAsync('token', token, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
      setUser(user);
      const payload: any = jwtDecode(token);
      scheduleAutoLogout(payload.exp);
    } catch (e:any) { Alert.alert('Login failed', e?.response?.data?.error || e.message); }
    setLoading(false);
  }


  async function signUp(email: string, password: string) {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { email, password });
      const { token, user } = res.data;
      await SecureStore.setItemAsync('token', token, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
      setUser(user);
      const payload: any = jwtDecode(token);
      scheduleAutoLogout(payload.exp);
    } catch (e:any) { Alert.alert('Register failed', e?.response?.data?.error || e.message); }
    setLoading(false);
  }


  async function signOut() {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
  );
};