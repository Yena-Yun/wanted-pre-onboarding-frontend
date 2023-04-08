import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'hooks/auth/useAuth';

export const ProtectedLayout = () => {
  const outlet = useOutlet();
  const { token } = useAuth();

  if (!token) {
    // alert('로그인이 되지 않았습니다. 로그인 페이지로 이동합니다.');
    return <Navigate to='/signin' />;
  }

  return <div>{outlet}</div>;
};
