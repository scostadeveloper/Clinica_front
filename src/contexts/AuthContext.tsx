import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { logger } from '@/utils/logger';

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  unidade: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (email: string, senha: string, unidade: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  logger.dev('AuthProvider montado');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('@EstheticPro:token');
    const user = localStorage.getItem('@EstheticPro:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(JSON.parse(user));
    }
  }, []);

  async function signIn(email: string, senha: string, unidade: string) {
    logger.auth('Iniciando processo de login', { email: email.replace(/@.*/, '@***'), unidade });
    try {
      const response = await api.post('/auth/login', { email, senha, unidade });
      const { token, user } = response.data;

      localStorage.setItem('@EstheticPro:token', token);
      localStorage.setItem('@EstheticPro:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(user);

      logger.success('Login realizado com sucesso');
      logger.api('POST', '/auth/login', true);
      router.push('/dashboard');
    } catch (error) {
      logger.error('Erro ao realizar login', error);
      logger.api('POST', '/auth/login', false);
      throw new Error('Erro ao realizar login');
    }
  }

  function signOut() {
    logger.auth('Realizando logout');
    localStorage.removeItem('@EstheticPro:token');
    localStorage.removeItem('@EstheticPro:user');
    setUser(null);
    logger.success('Logout realizado com sucesso');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}