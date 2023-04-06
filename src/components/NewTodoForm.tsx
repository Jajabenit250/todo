import React from 'react';

interface NewTodoFormProps {
  isEditing: boolean;
  newTodo: string;
  handleNewTodoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEditing: () => void;
  handleAddTodo: () => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  isEditing,
  newTodo,
  handleNewTodoChange,
  toggleEditing,
  handleAddTodo,
}) => {
  return (
    <div className="new-todo">
      {isEditing ? (
        <input
          type="text"
          placeholder="Add ToDo"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
      ) : null}
      <button onClick={toggleEditing}>{isEditing ? 'Cancel' : 'Add ToDo'}</button>
      {isEditing ? <button onClick={handleAddTodo}>Save</button> : null}
    </div>
  );
};

export default NewTodoForm;
