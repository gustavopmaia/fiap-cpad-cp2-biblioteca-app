import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const USERS_KEY = '@biblioteca:users';
const SESSION_KEY = '@biblioteca:session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY).then((data) => {
      if (data) setUser(JSON.parse(data));
      setIsLoading(false);
    });
  }, []);

  async function register(nome, email, senha) {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    if (users.find((u) => u.email === email)) {
      throw new Error('Email já cadastrado');
    }

    const newUser = { id: Date.now().toString(), nome, email, senha };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    const session = { id: newUser.id, nome: newUser.nome, email: newUser.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  }

  async function login(email, senha) {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    const found = users.find((u) => u.email === email && u.senha === senha);
    if (!found) throw new Error('Email ou senha inválidos');

    const session = { id: found.id, nome: found.nome, email: found.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  }

  async function logout() {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
