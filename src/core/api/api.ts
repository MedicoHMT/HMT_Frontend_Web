import axios from 'axios';
import { AuthStore } from '../store/authStore';
import { API_BASE_URL } from '../../config/constants';


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let queue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach(p => (error ? p.reject(error) : p.resolve(token as string)));
  queue = [];
};

api.interceptors.response.use(
  r => r,
  async (err) => {
    const original = err.config;
    if (!original) return Promise.reject(err);

    // Only attempt once per request
    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers['Authorization'] = `Bearer ${token}`;
          return axios(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          // Call refresh endpoint (sends HttpOnly cookie)
          const refreshResp = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, { withCredentials: true });
          const newAccess = refreshResp.data?.accessToken;
          if (!newAccess) throw new Error('no_access_token');

          // update memory and default header
          AuthStore.setAccessToken(newAccess);
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;

          processQueue(null, newAccess);
          original.headers['Authorization'] = `Bearer ${newAccess}`;
          resolve(axios(original));
        } catch (e) {
          processQueue(e, null);
          AuthStore.clear();
          reject(e);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(err);
  }
);

export default api;
