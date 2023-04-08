import axios from 'axios';
import { BASE_URL } from './const';

const TOKEN = JSON.parse(localStorage.getItem('accessToken') || '');

const createTodo = async (todo: string) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/todos`,
      { todo },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return result;
  } catch (err) {
    console.log(err);
    throw new Error('Todo 생성 에러');
  }
};

const getTodos = async () => {
  try {
    const result = await axios.get(`${BASE_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return result;
  } catch (err) {
    console.log(err);
    throw new Error('Todo 가져오기 에러');
  }
};

const updateTodo = async (
  id: number,
  { todo, isCompleted }: { todo: string; isCompleted: boolean }
) => {
  try {
    const result = await axios.put(
      `${BASE_URL}/todos/:${id}`,
      { todo, isCompleted },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return result;
  } catch (err) {
    console.log(err);
    throw new Error('Todo 수정 에러');
  }
};

const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/todos/:${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Todo 삭제 에러');
  }
};

export const todoApi = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
