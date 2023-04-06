import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('ToDo List')).toBeInTheDocument();
  });

  it('renders the empty todo list', () => {
    render(<App />);
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });

  it('adds a new todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add ToDo');
    const addButton = screen.getByText('Add ToDo');

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    expect(screen.getByRole('list')).toHaveTextContent('Buy milk');
  });

  it('does not add a new todo if the input is empty', async () => {
    render(<App />);
    const addTodoButton = screen.getByRole('button', { name: 'Add ToDo' });
    const todoList = screen.getByRole('list');

    fireEvent.click(addTodoButton);

    expect(todoList.children.length).toBe(0);
  });

  it('marks a todo as done', () => {
    render(<App />);
    const input = screen.getByRole('checkbox', { name: 'Buy milk' });

    fireEvent.click(input);

    expect(input).toBeChecked();
  });

  it('deletes a todo', async () => {
    render(<App />);
    const addTodoButton = screen.getByRole('button', { name: 'Add ToDo' });
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    const todoList = screen.getByRole('list');

    fireEvent.click(addTodoButton);
    fireEvent.change(screen.getByPlaceholderText('Add ToDo'), {
      target: { value: 'Test todo' },
    });
    fireEvent.click(screen.getByText('Add ToDo'));

    await waitFor(() => expect(todoList.children.length).toBe(2));

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => expect(todoList.children.length).toBe(1));
  });
});
