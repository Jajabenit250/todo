import { useState, useEffect } from "react";
import { Todo } from "../types";
import useFetch from "./useFetch";

export type SortDirection = "asc" | "desc";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const { data } = useFetch<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setTodos(data.slice(0, 10));
    }
  }, [data]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodoTitle.trim()) {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle.trim(),
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoTitle("");
    }
  };

  useEffect(() => {
    if (sortColumn === "id") {
      setTodos((prevTodos) =>
        [...prevTodos].sort((a, b) =>
          sortDirection === "asc" ? a.id - b.id : b.id - a.id
        )
      );
    } else if (sortColumn === "title") {
      setTodos((prevTodos) =>
        [...prevTodos].sort((a, b) =>
          sortDirection === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        )
      );
    } else if (sortColumn === "completed") {
      setTodos((prevTodos) =>
        [...prevTodos].sort((a, b) =>
          sortDirection === "asc"
            ? Number(a.completed) - Number(b.completed)
            : Number(b.completed) - Number(a.completed)
        )
      );
    }
  }, [sortColumn, sortDirection]);

  return {
    todos,
    isLoading,
    sortColumn,
    sortDirection,
    newTodoTitle,
    handleSort,
    handleComplete,
    handleDelete,
    handleAdd,
    setNewTodoTitle,
  };
};

export default useTodos;
