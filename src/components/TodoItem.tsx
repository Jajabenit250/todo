import React from 'react';

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  handleCheckTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, handleCheckTodo, handleDeleteTodo }) => {
  return (
    <li key={todo.id} className={todo.done ? 'done' : ''}>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => handleCheckTodo(todo.id)}
        />
        <span>{todo.task}</span>
      </div>
      <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>
        X
      </button>
    </li>
  );
};

export default TodoItem;
