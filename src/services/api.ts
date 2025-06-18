import axios from 'axios';

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