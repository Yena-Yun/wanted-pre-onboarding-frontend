import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  children: ReactNode | ReactNode[];
}

const defaultValue = {
  token: '',
  login: (data: string) => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }: AuthProps) => {
  const navigate = useNavigate();
  const [token, getOrSetToken] = useLocalStorage('accessToken', '');

  const login = async (data: string) => {
    console.log(data);
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

export const useAuth = () => {
  return useContext(AuthContext);
};
