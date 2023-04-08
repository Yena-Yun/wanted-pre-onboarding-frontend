// import { todoApi } from 'api/todoApi';
import { useState } from 'react';
import { TodoProps } from 'types/todoType';

export const useGetTodo = (): [boolean, TodoProps[], () => Promise<void>] => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const getTodos = async () => {
    // const { data } = await todoApi.getTodos();

    // setTodos(data);
    setIsLoading(false);
  };

  return [isLoading, todos, getTodos];
};
