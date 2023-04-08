import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuid4 } from 'uuid';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface TodoProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const Todo = () => {
  const [value, setValue] = useState('');
  const [modifiedValue, setModifiedValue] = useState('');
  const [isUpdateId, setIsUpdateId] = useState('');
  const createInputRef = useRef<HTMLInputElement>(null);
  const modifyInputRef = useRef<HTMLInputElement>(null);

  const [storageTodos, setStorageTodos] = useLocalStorage('todos', []);

  useEffect(() => {
    if (storageTodos.length < 1) return;

    setStorageTodos(storageTodos);
  }, [storageTodos]);

  const inputFocus = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const openUpdate = (id: string) => {
    setIsUpdateId(id);
  };

  const cancelUpdate = () => {
    setIsUpdateId('');
    setModifiedValue('');
  };

  const toggleComplete = (id: string) => {
    const updatedComplete = storageTodos.map((prev: TodoProps) =>
      prev.id === id
        ? {
            ...prev,
            isCompleted: !prev.isCompleted,
          }
        : prev
    );

    setStorageTodos(updatedComplete);
  };

  useEffect(() => {
    inputFocus(modifyInputRef.current as HTMLInputElement);
  }, [isUpdateId]);

  useEffect(() => {
    inputFocus(createInputRef.current as HTMLInputElement);
  }, [storageTodos]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.length < 1) return;

    const newTodo = {
      id: uuid4().slice(0, 8),
      title: value,
      isCompleted: false,
    };

    setStorageTodos((prev: TodoProps[]) => [...prev, newTodo]);
    setValue('');
  };

  const submitUpdate = (id: string) => {
    if (modifiedValue.length < 1) {
      cancelUpdate();
      return;
    }

    const updatedTodo = {
      id,
      title: modifiedValue,
      isCompleted: false,
    };

    setStorageTodos(
      storageTodos.map((prev: TodoProps) =>
        prev.id === id ? updatedTodo : prev
      )
    );

    setModifiedValue('');
    setIsUpdateId('');
  };

  const updateTodo = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (isUpdateId === id) {
      setModifiedValue(e.currentTarget.value);
    }
  };

  const deleteTodo = (id: string) => {
    setStorageTodos(storageTodos.filter((todo: TodoProps) => todo.id !== id));
  };

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
        {storageTodos.map((todo: TodoProps) => (
          <Fragment key={todo.id}>
            {isUpdateId !== todo.id ? (
              <li key={todo.id} id={todo.id}>
                <label>
                  <input
                    id={todo.id}
                    type='checkbox'
                    checked={todo.isCompleted}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  id={todo.id}
                  data-testid='modify-button'
                  onClick={() => openUpdate(todo.id)}
                >
                  수정
                </button>
                <button
                  data-testid='delete-button'
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </li>
            ) : (
              <li key={todo.id} id={todo.id}>
                <label>
                  <input id={todo.id} type='checkbox' disabled />
                  <input
                    ref={modifyInputRef}
                    value={modifiedValue}
                    data-testid='modify-input'
                    onChange={(e) => updateTodo(e, todo.id)}
                  />
                </label>
                <button
                  data-testid='submit-button'
                  onClick={() => submitUpdate(todo.id)}
                >
                  제출
                </button>
                <button data-testid='cancel-button' onClick={cancelUpdate}>
                  취소
                </button>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </>
  );
};
