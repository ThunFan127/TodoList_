import { useState, useEffect } from "react";

export default function TodoForm({ onAdd, todos, editId, editValue, setEditValue, onSaveEdit, onCancelEdit }) {
    const [task, setTask] = useState("");
    const [modal, setModal] = useState({ open: false, message: "" });

    useEffect(() => {
        if (editId) {
            setTask(editValue || "");
        } else {
            setTask("");
        }
    }, [editId, editValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = task.trim();
        if (!value) {
            setModal({ open: true, message: "Tên công việc không được phép để trống." });
            return;
        }
        if (todos.some((t) => t.text === value && (!editId || t.id !== editId))) {
            setModal({ open: true, message: "Tên công việc không được phép trùng!" });
            return;
        }
        if (editId) {
            onSaveEdit(value);
        } else {
            onAdd(value);
        }
        setTask("");
    };

    return (
        <>

            <form onSubmit={handleSubmit} className="todo-form">
                <div className={`input-wrapper${task ? ' filled' : ''}`}>
                    <input
                        type="text"
                        id="todo-input"
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                            if (editId) setEditValue(e.target.value);
                        }}
                        autoComplete="off"
                    />
                    <label htmlFor="todo-input" className={task ? 'shrink' : ''}>Nhập tên công việc</label>
                </div>
                {editId ? (
                    <>
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onCancelEdit}>Hủy</button>
                    </>
                ) : (
                    <button type="submit">Thêm</button>
                )}
            </form>

            {/* Modal cảnh báo */}
            {modal.open && (
                <div className="overlay">
                    <div className="modal-custom">
                        <div className="modal-header-custom">
                            <h5 style={{ fontSize: 18, fontWeight: 600, color: '#333', margin: 0 }}>Cảnh báo</h5>
                            <i className="close" onClick={() => setModal({ open: false, message: "" })} style={{ fontSize: 22, color: '#888' }}>×</i>
                        </div>
                        <div className="modal-body-custom" style={{ fontSize: 16, color: '#444', marginBottom: 8 }}>
                            {modal.message}
                        </div>
                        <div className="modal-footer-footer">
                            <button className="btn btn-light" style={{ minWidth: 80 }} onClick={() => setModal({ open: false, message: "" })}>ĐÓNG</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
