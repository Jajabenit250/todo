import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle';
import './styles/App.css';

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = React.useState('');

  const { value: isEditing, toggle: toggleEditing } = useToggle(false);

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo !== '') {
      const todo: Todo = {
        id: Date.now(),
        task: newTodo,
        done: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo: any) => todo.id !== id));
  };

  const handleCheckTodo = (id: number) => {
    const updatedTodos = todos.map((todo: any) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <main>
        <div className="new-todo">
          {isEditing ? (
            <input
              type="text"
              placeholder="Add ToDo"
              value={newTodo}
              onChange={handleNewTodoChange}
            />
          ) : null}
          <button onClick={toggleEditing}>
            {isEditing ? 'Cancel' : 'Add ToDo'}
          </button>
          {isEditing ? (
            <button onClick={handleAddTodo}>Save</button>
          ) : null}
        </div>
        <ul className="todo-list">
          {todos.map((todo: any) => (
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
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
