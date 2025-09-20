import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:4000';

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});


// Request: attach token
instance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// Response: detect expired token and force logout
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response && error.response.status === 401) {
// token invalid -> remove token and reload app (logout)
      await SecureStore.deleteItemAsync('token');
// We can't import context here without cycle; user of api should handle 401 by calling logout
    }
    return Promise.reject(error);
  }
);


export default instance;