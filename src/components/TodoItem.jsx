export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
            <div className="d-flex gap-3">
                <i className="fas fa-pen-to-square text-warning" onClick={() => onEdit(todo)} style={{ cursor: 'pointer', fontSize: 22 }} />
                <i className="far fa-trash-can text-danger" onClick={() => onDelete(todo.id)} style={{ cursor: 'pointer', fontSize: 22 }} />
            </div>
        </li>
    );
}
