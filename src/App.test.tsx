import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import useFetch from './hooks/useFetch';

jest.mock("./hooks/useFetch"); // Mock the module containing the useFetch hook

const mockedData = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: true },
  { id: 3, title: "Todo 3", completed: false },
  { id: 4, title: "Todo 4", completed: true },
  { id: 5, title: "Todo 5", completed: false },
  { id: 6, title: "Todo 6", completed: true },
  { id: 7, title: "Todo 7", completed: false },
  { id: 8, title: "Todo 8", completed: true },
  { id: 9, title: "Todo 9", completed: false },
  { id: 10, title: "Todo 10", completed: true },
];

const useFetchMock = useFetch as jest.Mock;

describe("App", () => {

  beforeEach(() => {
    useFetchMock.mockReturnValue({ data: mockedData, error: null });
  });

  test('renders todo app header', () => {
    render(<App />);

    const headerElement = screen.getByText(/Todo App/i);
    
    expect(headerElement).toBeInTheDocument();
  });

  test('gets all IDs from the table', () => {
    render(<App />);
  
    const tdElements = screen.queryAllByRole('cell')
    .filter(cell => cell.textContent?.match(/^[0-9]+$/));

    const ids = tdElements.map(td => Number(td.textContent));
  
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("renders todos after loading", async () => {
    render(<App />);

    const todoElement = await waitFor(() => screen.getByText("Todo 1"));

    expect(todoElement).toBeInTheDocument();
  });

  test("handles sorting by id", async () => {
    render(<App />);

    const sortByIdButton = await waitFor(() => screen.getByText(/ID/i));

    fireEvent.click(sortByIdButton);

    const firstRow = await waitFor(() =>
      screen.getByText("Todo 1").closest("tr")
    );

    expect(firstRow).toHaveTextContent("1");
  });

  test("handles sorting by title", async () => {
    render(<App />);

    const sortByTitleButton = await waitFor(() => screen.getByText(/Title/i));

    fireEvent.click(sortByTitleButton);

    const firstRow = await waitFor(() =>
      screen.getByText("Todo 1").closest("tr")
    );

    expect(firstRow).toHaveTextContent("Todo 1");
  });

  test("handles sorting by status", async () => {
    render(<App />);

    const sortByCompletedButton = await waitFor(() =>
      screen.getByText(/Status/i)
    );

    fireEvent.click(sortByCompletedButton);

    const firstRow = await waitFor(() =>
      screen.getByText("Todo 1").closest("tr")
    );

    expect(firstRow).toHaveTextContent("TODO");
  });

  test("handles completing a todo", async () => {
    render(<App />);

    const completeButton = screen.getAllByRole("button", { name: /TODO/i });
    fireEvent.click(completeButton[0]);

    const completedRow = await waitFor(() =>
      screen.getByText("Todo 1").closest("tr")
    );

    expect(completedRow).toHaveTextContent("✅");
  });

  test("handles deleting a todo", async () => {
    render(<App />);

    const deleteButton = screen.getAllByRole("button", { name: /❌/i });

    fireEvent.click(deleteButton[0]);

    const deletedRow = screen.queryByText("Todo 1");

    expect(deletedRow).not.toBeInTheDocument();
  });

  test("handles adding a new todo", async () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);

    const addButtonElement = screen.getByRole("button", { name: /Add Todo/i });

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    fireEvent.click(addButtonElement);

    // Wait for the loading to complete
    await waitFor(() => {
      const loadingElement = screen.queryByText("Loading...");
      expect(loadingElement).not.toBeInTheDocument();
    });

    const todoElement = screen.getByText("New Todo");
    
    expect(todoElement).toBeInTheDocument();
  });
});
