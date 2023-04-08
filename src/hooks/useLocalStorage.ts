import { useState } from 'react';

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName) || null;

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));

        return defaultValue;
      }
    } catch (err) {
      console.log('로컬스토리지를 사용하는 도중 에러가 났습니다.');
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log('로컬스토리지 저장에 실패했습니다.');
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue] as [any, (prev: any) => void];
};
