import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from 'hooks/auth/useAuth';

export const HomeLayout = () => {
  const outlet = useOutlet();
  const { token } = useAuth();

  if (token) {
    // alert('자동 로그인이 되었습니다! 투두 페이지로 이동합니다.');
    return <Navigate to='/todo' />;
  }

  return <div>{outlet}</div>;
};
