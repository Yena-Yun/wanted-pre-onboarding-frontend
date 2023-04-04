import { axiosClient } from 'api/axiosClient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export const Register = () => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError(true);
    setPasswordError(true);
  }, [formInput]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    if (formInput.email.includes('@')) {
      setEmailError(false);
    }

    if (formInput.password.length > 8) {
      setPasswordError(false);
    }

    if (target.dataset.testid === 'email-input') {
      setFormInput((prev) => ({ ...prev, email: target.value }));
    } else {
      setFormInput((prev) => ({ ...prev, password: target.value }));
    }
  };

  const validation = () => {
    if (formInput.email.includes('@') && formInput.password.length > 8) {
      alert('회원가입에 성공했습니다! 로그인을 진행해주세요');
      return true;
    } else {
      alert('회원가입에 실패했습니다');
      return false;
    }
  };

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosClient.post('/auth/signup', formInput);

      if (validation()) {
        navigate('/signin');
      }
    } catch (err: any) {
      console.log(
        err.response.data.statusCode + ' ' + err.response.data.message
      );
      alert(err.response.data.message); // 예: '동일한 이메일이 이미 존재합니다'
    }
  };

  return (
    <form className='register-form' onSubmit={submitFormHandler}>
      <label className='form-label'>
        <input
          value={formInput.email}
          className='email-input'
          onChange={inputChangeHandler}
          data-testid='email-input'
        />
        <span>이메일</span>
        <p>{emailError && '@를 포함해주세요.'}</p>
      </label>
      <label className='form-label'>
        <input
          value={formInput.password}
          onChange={inputChangeHandler}
          className='password-input'
          data-testid='password-input'
        />
        <span>비밀번호</span>
        <p>{passwordError && '8자리 이상 입력해주세요.'}</p>
      </label>

      <button
        type='submit'
        disabled={
          !formInput.email.includes('@') || formInput.password.length < 8
        }
        className={
          !formInput.email.includes('@') || formInput.password.length < 8
            ? 'disabled-button'
            : 'signup-button'
        }
        data-testid='signup-button'
      >
        회원가입
      </button>
    </form>
  );
};
