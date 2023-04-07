import { ItemProps } from "../types";

function TodoItem({
  id,
  title,
  completed,
  handleComplete,
  handleDelete,
}: ItemProps) {
  const handleToggle = () => {
    handleComplete(id);
  };

  const handleItemDelete = () => {
    handleDelete(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td style={{ textAlign: "left" }}>{title}</td>
      <td hidden={completed}>
        <button onClick={handleToggle}>TODO</button>
      </td>
      <td hidden={!completed}>
        <button>✅</button>
      </td>
      <td>
        <button onClick={handleItemDelete}>❌</button>
      </td>
    </tr>
  );
}

export default TodoItem;
