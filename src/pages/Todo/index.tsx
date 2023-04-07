import { useLocalStorage } from 'hooks/useLocalStorage';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuid4 } from 'uuid';

interface TodoProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const Todo = () => {
  const [value, setValue] = useState('');
  const [modifiedValue, setModifiedValue] = useState('');
  const [isUpdateId, setIsUpdateId] = useState('');
  const checkRef = useRef(null);
  const createInputRef = useRef<HTMLInputElement>(null);
  const modifyInputRef = useRef<HTMLInputElement>(null);

  const [storageTodos, setStorageTodos] = useLocalStorage('todos', []);

  const inputFocus = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  const openUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setIsUpdateId(id);
  };

  useEffect(() => {
    inputFocus(modifyInputRef.current as HTMLInputElement);
  }, [isUpdateId]);

  useEffect(() => {
    inputFocus(createInputRef.current as HTMLInputElement);
  }, [storageTodos]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStorageTodos((prev: TodoProps[]) => [
      ...prev,
      {
        id: uuid4(),
        title: value,
        isCompleted: false,
      },
    ]);

    setValue('');
  };

  useEffect(() => {
    if (storageTodos.length < 1) return;

    setStorageTodos(storageTodos);
  }, [storageTodos]);

  const submitUpdate = (id: string) => {
    const newTodo = {
      id,
      title: modifiedValue,
      isCompleted: false,
    };

    setStorageTodos(
      storageTodos.map((prev: TodoProps) => (prev.id === id ? newTodo : prev))
    );

    setIsUpdateId('');
  };

  const updateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedValue(e.currentTarget.value);
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
                  <input id={todo.id} type='checkbox' ref={checkRef} />
                  <span>{todo.title}</span>
                </label>
                <button
                  id={todo.id}
                  data-testid='modify-button'
                  onClick={(e) => openUpdate(e, todo.id)}
                >
                  수정
                </button>
                <button data-testid='delete-button'>삭제</button>
              </li>
            ) : (
              <li key={todo.id} id={todo.id}>
                <label>
                  <input id={todo.id} type='checkbox' ref={checkRef} />
                  <input
                    ref={modifyInputRef}
                    value={modifiedValue}
                    data-testid='modify-input'
                    onChange={(e) => updateTodo(e)}
                  />
                </label>
                <button
                  data-testid='submit-button'
                  onClick={() => submitUpdate(todo.id)}
                >
                  제출
                </button>
                <button data-testid='cancel-button'>취소</button>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </>
  );
};
