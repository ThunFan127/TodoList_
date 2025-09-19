import TodoItem from "../components/TodoItem";

export default function TodoListPage({ todos, onToggle, onEdit, onDelete, filterType }) {
  let filteredTodos = todos;
  if (filterType === "completed") {
    filteredTodos = todos.filter((t) => t.completed);
  } else if (filterType === "uncompleted") {
    filteredTodos = todos.filter((t) => !t.completed);
  }

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
