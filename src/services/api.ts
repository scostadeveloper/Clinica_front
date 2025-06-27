import axios from 'axios';
import { logger } from '@/utils/logger';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@EstheticPro:token');
  const user = localStorage.getItem('@EstheticPro:user');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (user) {
    const userData = JSON.parse(user);
    if (userData.unidade) {
      config.headers['x-unidade'] = userData.unidade;
    }
  }
  
  return config;
});

// Interceptor para log de respostas
api.interceptors.response.use(
  (response) => {
    logger.api(
      response.config.method?.toUpperCase() || 'GET',
      response.config.url || '',
      true
    );
    return response;
  },
  (error) => {
    logger.api(
      error.config?.method?.toUpperCase() || 'GET',
      error.config?.url || '',
      false
    );
    
    // Log específico para erros 401 (token inválido)
    if (error.response?.status === 401) {
      console.error('🔐 [AUTH ERROR] Token inválido ou expirado');
      console.error('🔐 [AUTH ERROR] Response:', error.response?.data);
    }
    
    // Log específico para erros 400 (validação)
    if (error.response?.status === 400) {
      console.error('🔍 [VALIDATION ERROR] Dados inválidos');
      console.error('🔍 [VALIDATION ERROR] Response:', error.response?.data);
    }
    
    logger.error('Erro na requisição API', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
); 