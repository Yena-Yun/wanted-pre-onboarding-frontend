import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from 'api/axiosClient';
import { useAuth } from 'hooks/useAuth';
import styles from './Login.module.scss';

const EMAIL = 'email';
const PASSWORD = 'password';

export const Login = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const keyName = target.dataset.testid as typeof EMAIL | typeof PASSWORD;

    setFormInput((prev) => ({
      ...prev,
      [keyName.split('-')[0]]: target.value,
    }));
  };

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post('/auth/signin', formInput);

      login(data.access_token);
    } catch (err: any) {
      const errResponse = err.response.data;

      console.log(errResponse.statusCode + ' ' + errResponse.message);
      alert(errResponse.message); // 예: '해당 사용자가 존재하지 않습니다.'
    }
  };

  const { email, password } = formInput;

  return (
    <form className={styles.registerForm} onSubmit={submitFormHandler}>
      <h1>로그인</h1>
      <label className={styles.formLabel}>
        <input
          value={email}
          data-testid={`${EMAIL}-input`}
          onChange={inputChangeHandler}
        />
        <span>이메일</span>
      </label>
      <label className={styles.formLabel}>
        <input
          type={PASSWORD}
          value={password}
          data-testid={`${PASSWORD}-input`}
          onChange={inputChangeHandler}
        />
        <span>비밀번호</span>
      </label>

      <button
        type='submit'
        data-testid='signin-button'
        className={`${styles.submitButton} ${
          (!email.includes('@') && styles.disabledButton) ||
          (password.length < 8 && styles.disabledButton)
        }`}
        disabled={!email.includes('@') || password.length < 8}
      >
        로그인
      </button>

      <p className={styles.moveToSignup} onClick={() => navigate('/signup')}>
        회원가입하러 가기
      </p>
    </form>
  );
};
