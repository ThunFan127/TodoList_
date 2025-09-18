import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";
import AllPage from "./pages/AllPage";
import CompletedPage from "./pages/CompletedPage";
import UncompletedPage from "./pages/UncompletedPage";
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
                <TodoTabs />

                {/* Các page */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AllPage
                                todos={todos}
                                onToggle={toggleTodo}
                                onEdit={startEditTodo}
                                onDelete={confirmDelete}
                            />
                        }
                    />
                    <Route
                        path="/completed"
                        element={
                            <CompletedPage
                                todos={todos}
                                onToggle={toggleTodo}
                                onEdit={startEditTodo}
                                onDelete={confirmDelete}
                            />
                        }
                    />
                    <Route
                        path="/uncompleted"
                        element={
                            <UncompletedPage
                                todos={todos}
                                onToggle={toggleTodo}
                                onEdit={startEditTodo}
                                onDelete={confirmDelete}
                            />
                        }
                    />
                </Routes>

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
