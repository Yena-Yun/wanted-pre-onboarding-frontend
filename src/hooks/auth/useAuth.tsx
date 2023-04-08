import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';

interface AuthProp {
  children: ReactNode | ReactNode[];
}

const defaultValue = {
  token: '',
  login: (data: string) => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: AuthProp) => {
  const navigate = useNavigate();
  const [token, getOrSetToken] = useLocalStorage('accessToken', '');

  const login = async (data: string) => {
    getOrSetToken(data);
    navigate('/todo');
  };

  const logout = () => {
    getOrSetToken('');
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
