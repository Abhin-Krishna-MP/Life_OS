import axios from 'axios';

const api = axios.create({
  baseURL: 'https://life-os-n061.onrender.com/api/',
});

// Attach access token for protected routes
api.interceptors.request.use((config) => {
  const publicRoutes = ['register', 'token'];
  if (!publicRoutes.some((path) => config.url.includes(path))) {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Token refresh logic
async function refreshToken() {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return null;

  try {
    const res = await axios.post('https://life-os-n061.onrender.com/api/token/refresh/', { refresh });
    const newAccess = res.data.access;
    localStorage.setItem('access', newAccess);
    return newAccess;
  } catch (err) {
    console.error('Token refresh failed', err);
    return null;
  }
}

// Unified response interceptor without 500 redirect
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 🔁 Try refreshing token if unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } else {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/';
      }
    }

    // Optional: Log server errors without redirecting
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.statusText);
    }

    return Promise.reject(error);
  }
);

export default api;
