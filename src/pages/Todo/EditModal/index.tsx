import { RefObject } from 'react';
import { TodoProps } from 'types/todoType';

export const EditModal = ({
  todoProps,
  modifyInfo,
  updateTodo,
  actionFunc,
}: {
  todoProps: Omit<TodoProps, 'userId'>;
  modifyInfo: {
    modifyInputRef: RefObject<HTMLInputElement>;
    modifiedValue: string;
  };
  updateTodo: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  actionFunc: {
    submitUpdate: (id: number) => void;
    cancelUpdate: () => void;
  };
}) => {
  const { id, todo, isCompleted } = todoProps;
  const { modifyInputRef, modifiedValue } = modifyInfo;
  const { submitUpdate, cancelUpdate } = actionFunc;

  return (
    <li>
      <label>
        <input type='checkbox' checked={isCompleted} disabled />
        <input
          ref={modifyInputRef}
          value={modifiedValue.length < 1 ? todo : modifiedValue}
          data-testid='modify-input'
          onChange={(e) => updateTodo(e, id)}
        />
      </label>
      <button data-testid='submit-button' onClick={() => submitUpdate(id)}>
        제출
      </button>
      <button data-testid='cancel-button' onClick={cancelUpdate}>
        취소
      </button>
    </li>
  );
};
