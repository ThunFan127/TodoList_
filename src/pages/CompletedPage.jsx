import TodoItem from "../components/TodoItem";

export default function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const completed = todos.filter((t) => t.completed);
  return (
    <ul>
      {completed.map((todo) => (
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
