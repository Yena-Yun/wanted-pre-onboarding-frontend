import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoProps } from 'types/todoType';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { axiosTokenClient } from 'api/axiosClient';
import axios from 'axios';
import { EditModal } from './EditModal';
import styles from './Todo.module.scss';
import { BASE_URL } from 'api/const';

export const Todo = () => {
  const [value, setValue] = useState('');
  const [modifiedValue, setModifiedValue] = useState('');
  const [isUpdateId, setIsUpdateId] = useState<number>(0);
  const createInputRef = useRef<HTMLInputElement>(null);
  const modifyInputRef = useRef<HTMLInputElement>(null);

  const [storageTodos, setStorageTodos] = useLocalStorage('todos', []);
  const [storageToken, setStorageToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (storageTodos.length < 1) return;

    setStorageTodos(storageTodos);
  }, [storageTodos]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) return;

    // const { status, data } = await todoApi.createTodo(value);

    const newTodo = {
      todo: value,
      isCompleted: false,
    };

    // const result = await axiosTokenClient.post('/todos', { todo: value });

    const result = await axios.post(
      `${BASE_URL}/todos`,
      { todo: value },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storageToken}`,
        },
      }
    );

    console.log(result);

    // if (status === 201) {
    setStorageTodos((prev: TodoProps[]) => [...prev, newTodo]);
    // }

    setValue('');
  };

  const openUpdate = (id: number) => {
    setIsUpdateId(id);
  };

  const cancelUpdate = () => {
    setIsUpdateId(0);
    setModifiedValue('');
  };

  const updateTodo = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (isUpdateId === id) {
      setModifiedValue(e.currentTarget.value);
    }
  };

  const deleteTodo = async (id: number) => {
    setStorageTodos(storageTodos.filter((todo: TodoProps) => todo.id !== id));
    // await todoApi.deleteTodo(id);
  };

  const toggleComplete = async (id: number) => {
    const updateItem =
      storageTodos.find((prev: TodoProps) => prev.id === id) || null;

    if (!updateItem) {
      console.log('update할 아이템이 없습니다.');
      return;
    }

    const updateComplete = storageTodos.map((prev: TodoProps) =>
      prev.id === id
        ? {
            ...prev,
            isCompleted: !prev.isCompleted,
          }
        : prev
    );

    setStorageTodos(updateComplete);
  };

  const submitUpdate = async (id: number) => {
    if (modifiedValue.length < 1) {
      cancelUpdate();
      return;
    }

    const updatedTodo = {
      id,
      todo: modifiedValue,
      isCompleted: false,
    };

    setStorageTodos(
      storageTodos.map((prev: TodoProps) =>
        prev.id === id ? updatedTodo : prev
      )
    );

    const updateItem =
      storageTodos.find((prev: TodoProps) => prev.id === id) || null;

    if (!updateItem) {
      console.log('update할 아이템이 없습니다.');
      return;
    }

    setModifiedValue('');
    setIsUpdateId(0);
  };

  const inputAutoFocus = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  useEffect(() => {
    inputAutoFocus(modifyInputRef.current as HTMLInputElement);
  }, [isUpdateId]);

  useEffect(() => {
    inputAutoFocus(createInputRef.current as HTMLInputElement);
  }, [storageTodos]);

  return (
    <>
      {/* Todo 인풋 */}
      <form onSubmit={submitHandler}>
        <input
          value={value}
          data-testid='new-todo-input'
          ref={createInputRef}
          onChange={inputChangeHandler}
        />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>

      {/* Todo 리스트 */}
      <ul>
        {storageTodos.map(({ id, todo, isCompleted }: TodoProps) => (
          <li key={id} className={styles.todoItem}>
            <>
              <label>
                <input
                  type='checkbox'
                  checked={isCompleted}
                  onChange={() => toggleComplete(id)}
                />
                <span>{todo}</span>
              </label>
              <button
                data-testid='modify-button'
                onClick={() => openUpdate(id)}
              >
                수정
              </button>
              <button
                data-testid='delete-button'
                onClick={() => deleteTodo(id)}
              >
                삭제
              </button>
            </>
            {isUpdateId === id && (
              <EditModal
                todoProps={{ id, todo, isCompleted }}
                modifyInfo={{ modifyInputRef, modifiedValue }}
                updateTodo={updateTodo}
                actionFunc={{ submitUpdate, cancelUpdate }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
