import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
// import { todoApi } from 'api/todoApi';
import { TodoProps } from 'types/todoType';

interface TodoProp {
  children: ReactNode | ReactNode[];
}

interface TodoContextProp {
  isLoading: boolean;
  todos: TodoProps[];
  getTodos: () => Promise<void> | void;
}

const defaultValue = {
  isLoading: true,
  todos: [] as TodoProps[],
  getTodos: () => {},
};

const TodoContext = createContext<TodoContextProp>(defaultValue);

export const TodoProvider = ({ children }: TodoProp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const getTodos = async (): Promise<void> => {
    // const { data } = await todoApi.getTodos();

    // setTodos(data);
    setIsLoading(false);
  };

  const value = useMemo(
    () => ({
      isLoading,
      todos,
      getTodos,
    }),
    [isLoading, todos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => useContext(TodoContext);
