import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  handleCheckTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, handleCheckTodo, handleDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo: any) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleCheckTodo={handleCheckTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
