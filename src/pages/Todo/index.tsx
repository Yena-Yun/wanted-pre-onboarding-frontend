import { useRef } from 'react';
import { TodoItem } from 'smart-components/TodoItem/TodoItem';

export const Todo = () => {
  const newInputRef = useRef<HTMLInputElement>(null);

  const createNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInputRef?.current) {
      // console.log(newInputRef?.current?.value);
    }
  };

  return (
    <>
      <form onSubmit={createNewTodo}>
        <input ref={newInputRef} data-testid='new-todo-input' />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>

      <ul>
        <TodoItem />
      </ul>
    </>
  );
};
