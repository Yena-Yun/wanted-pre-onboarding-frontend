import { useEffect } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useNavigate, useOutlet } from 'react-router-dom';

export const HomeLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [token] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (token) {
      // alert('자동 로그인이 되었습니다! 투두 페이지로 이동합니다.');
      navigate('/todo');
    }
  }, []);

  return <div>{outlet}</div>;
};
