import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

http.interceptors.response.use(
  r => r,
  err => {
    if (err?.response?.status === 401) localStorage.removeItem('token');
    return Promise.reject(err);
  }
);
