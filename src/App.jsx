import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";
import TodoListPage from "./pages/TodoListPage";
import ConfirmModal from "./components/ConfirmModal";

export default function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    // Sửa nhiệm vụ (dùng chung form)
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState("");

    // Modal xác nhận xóa
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Tab nội bộ
    const [currentTab, setCurrentTab] = useState("all");

    // Lưu todos vào localStorage khi thay đổi
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Thêm mới
    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    // Bắt đầu sửa
    const startEditTodo = (todo) => {
        setEditId(todo.id);
        setEditValue(todo.text);
    };

    // Lưu sửa
    const handleSaveEdit = (text) => {
        setTodos(todos.map(t => t.id === editId ? { ...t, text } : t));
        setEditId(null);
        setEditValue("");
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditValue("");
    };

    // Đánh dấu hoàn thành
    const toggleTodo = (id) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    // Hiển thị modal xác nhận xóa
    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    // Thực hiện xóa
    const handleDelete = () => {
        setTodos(todos.filter((t) => t.id !== deleteId));
        setShowModal(false);
        setDeleteId(null);
    };

    // Lọc todos theo tab
    let filteredTodos = todos;
    if (currentTab === "completed") {
        filteredTodos = todos.filter(t => t.completed);
    } else if (currentTab === "uncompleted") {
        filteredTodos = todos.filter(t => !t.completed);
    }

    return (
        <div className="gradient-custom">
            <div className="app">
                {/* Form nhập & sửa */}
                <TodoForm
                    onAdd={addTodo}
                    todos={todos}
                    editId={editId}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                />

                {/* Tabs điều hướng */}
                <TodoTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

                {/* Danh sách nhiệm vụ */}
                <TodoListPage
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onEdit={startEditTodo}
                    onDelete={confirmDelete}
                    filterType={currentTab}
                />

                {/* Modal xác nhận xóa */}
                <ConfirmModal
                    open={showModal}
                    title="Xác nhận"
                    message={
                        <span>Bạn chắc chắn muốn xóa công việc <b>{todos.find(t => t.id === deleteId)?.text}</b>?</span>
                    }
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleDelete}
                />
            </div>
        </div>
    );
}
