import TodoItem from "../components/TodoItem";

export default function UncompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const uncompleted = todos.filter((t) => !t.completed);
  return (
    <ul>
      {uncompleted.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
