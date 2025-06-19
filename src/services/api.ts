import axios from 'axios';
import { logger } from '@/utils/logger';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@EstheticPro:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
    logger.error('Erro na requisição API', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
); 