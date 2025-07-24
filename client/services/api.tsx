// frontend/src/services/api.ts
import axios from 'axios';
import { FIREBASE_AUTH } from '../firebaseConfig';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// before every request, grab the latest ID token
api.interceptors.request.use(
  async (config) => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const token = await user.getIdToken(/* forceRefresh: */ false);
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
