import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from 'api/axiosClient';
import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    if (target.dataset.testid === 'email-login-input') {
      setFormInput((prev) => ({ ...prev, email: target.value }));
    } else {
      setFormInput((prev) => ({ ...prev, password: target.value }));
    }
  };

  const validation = () => {
    if (formInput.email.includes('@') && formInput.password.length > 8) {
      return true;
    }

    return false;
  };

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosClient.post('/auth/signin', formInput);

      if (validation()) {
        navigate('/todo');
      }
    } catch (err: any) {
      console.log(
        err.response.data.statusCode + ' ' + err.response.data.message
      );
      alert(err.response.data.message); // 예: '해당 사용자가 존재하지 않습니다.'
    }
  };

  return (
    <form className='register-form' onSubmit={submitFormHandler}>
      <h1>로그인</h1>
      <label className='form-label'>
        <input
          value={formInput.email}
          className='email-login-input'
          data-testid='email-login-input'
          onChange={inputChangeHandler}
        />
        <span>이메일</span>
      </label>
      <label className='form-label'>
        <input
          value={formInput.password}
          className='password-login-input'
          data-testid='password-login-input'
          onChange={inputChangeHandler}
        />
        <span>비밀번호</span>
      </label>

      <button
        type='submit'
        disabled={
          !formInput.email.includes('@') || formInput.password.length < 8
        }
        className={
          !formInput.email.includes('@') || formInput.password.length < 8
            ? 'disabled-button'
            : 'signin-button'
        }
        data-testid='signin-button'
      >
        로그인
      </button>

      <p className='move-to-signup' onClick={() => navigate('/signup')}>
        회원가입하러 가기
      </p>
    </form>
  );
};
