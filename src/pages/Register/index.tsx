import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from 'api/axiosClient';
import styles from './Register.module.scss';

export const Register = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  useEffect(() => {
    setEmailError(true);
    setPasswordError(true);
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    console.log(target);

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
      alert(err.response.data.message); // 예: '동일한 이메일이 이미 존재합니다.'
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={submitFormHandler}>
      <h1>회원가입</h1>
      <label className={styles.formLabel}>
        <input
          value={formInput.email}
          data-testid='email-input'
          onChange={inputChangeHandler}
        />
        <span>이메일</span>
        <p>{emailError && '@를 포함해주세요.'}</p>
      </label>
      <label className={styles.formLabel}>
        <input
          type='password'
          value={formInput.password}
          data-testid='password-input'
          onChange={inputChangeHandler}
        />
        <span>비밀번호</span>
        <p>{passwordError && '8자리 이상 입력해주세요.'}</p>
      </label>

      <button
        type='submit'
        disabled={
          !formInput.email.includes('@') || formInput.password.length < 8
        }
        className={`${styles.submitButton} ${
          (!formInput.email.includes('@') && styles.disabledButton) ||
          (formInput.password.length < 8 && styles.disabledButton)
        }`}
        data-testid='signup-button'
      >
        회원가입
      </button>
    </form>
  );
};
