import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { oSContext } from './Context';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { fetchChallenges } = useContext(oSContext);

  const login = async (username, password) => {
    try {
      const res = await api.post('token/', { username, password });
      console.log("Login response:", res.data);

      // ✅ Store tokens
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      // ✅ Fetch user profile (token should now work)
      await fetchProfile();

      // ✅ Fetch challenges only after profile
      await fetchChallenges();

      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setUser(null);
      return false;
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get('profile/');
      setUser(res.data);
    } catch (error) {
      console.error('Profile fetch failed:', error);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    fetchProfile(); // Try fetching on load
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
