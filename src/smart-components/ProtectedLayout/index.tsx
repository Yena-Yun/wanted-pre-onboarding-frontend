import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const ProtectedLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [token] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (!token) {
      // alert('로그인이 되지 않았습니다. 로그인 페이지로 이동합니다.');
      navigate('/signin');
    }
  }, []);

  return <div>{outlet}</div>;
};
