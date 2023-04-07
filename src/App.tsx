import React from "react";
import useTodos from "./hooks/useTodos";
import TodoItem from "./components/TodoItem";
import "./styles/App.css";

const App: React.FC = () => {
  const {
    todos,
    isLoading,
    sortColumn,
    sortDirection,
    handleSort,
    handleComplete,
    handleDelete,
    handleAdd,
    newTodoTitle,
    setNewTodoTitle,
  } = useTodos();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form onSubmit={handleAdd}>
        <input
          name="Add a new todo"
          type="text"
          placeholder="Add a new todo..."
          value={newTodoTitle}
          onChange={handleTitleChange}
        />
        <button type="submit">Add Todo</button>
      </form>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID{" "}
                {sortColumn === "id" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("title")}>
                Title{" "}
                {sortColumn === "title" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => handleSort("completed")}>
                Status{" "}
                {sortColumn === "completed" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
